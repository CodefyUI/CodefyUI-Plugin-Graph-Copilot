import type { CodefyUIPluginAPI } from '../types/codefyui';
import {
  StudyBundleError,
  encodeStudyBundle,
  parseStudyBundle,
  type StudyBundleV1,
} from './studyBundle';

/**
 * Content-addressed persistence for portable study bundles.
 *
 * The index is deliberately separate from the immutable bundle blobs. A save
 * writes the blob first and commits the index last, so an interrupted save can
 * leave at worst an unreferenced blob. Reading/importing never runs a graph or
 * calls any CodefyUI graph, HTTP, or execution API.
 */

export const STUDY_STORAGE_INDEX_KEY = 'graph-copilot.study-index.v1';
export const STUDY_STORAGE_BUNDLE_PREFIX = 'graph-copilot.study.sha256.';
export const STUDY_STORAGE_INDEX_FORMAT = 'codefyui.graph-copilot.study-index' as const;
export const STUDY_STORAGE_INDEX_VERSION = 1 as const;
export const STUDY_STORAGE_MAX_ENTRIES = 10;

const MAX_INDEX_BYTES = 512 * 1024;
const MAX_ID_LENGTH = 256;
const MAX_HYPOTHESIS_LENGTH = 32 * 1024;
const MAX_INDEX_COMMIT_ATTEMPTS = 4;
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const CANONICAL_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const STUDY_STORAGE_LOCK_NAME = 'graph-copilot.study-index.v1.lock';

type StudyStorageApi = Pick<CodefyUIPluginAPI, 'storage'>;
type UnknownRecord = Record<string, unknown>;

export interface StudyStorageIndexEntryV1 {
  readonly id: string;
  readonly digest: string;
  readonly createdAt: string;
  readonly hypothesis: string;
  readonly kind: 'portable';
}

export interface StudyStorageIndexV1 {
  readonly format: typeof STUDY_STORAGE_INDEX_FORMAT;
  readonly formatVersion: typeof STUDY_STORAGE_INDEX_VERSION;
  /** Newest studies first. Ties are ordered by id and then digest. */
  readonly entries: readonly StudyStorageIndexEntryV1[];
}

export type StudyStorageErrorCode =
  | 'LOCK_UNAVAILABLE'
  | 'INVALID_ID'
  | 'ID_CONFLICT'
  | 'BUNDLE_KEY_CONFLICT'
  | 'STUDY_NOT_FOUND'
  | 'BUNDLE_MISSING'
  | 'BUNDLE_TAMPERED'
  | 'INDEX_READ_FAILED'
  | 'BUNDLE_READ_FAILED'
  | 'BUNDLE_WRITE_FAILED'
  | 'INDEX_WRITE_FAILED';

export class StudyStorageError extends Error {
  readonly code: StudyStorageErrorCode;
  readonly causeValue?: unknown;

  constructor(code: StudyStorageErrorCode, message: string, causeValue?: unknown) {
    super(message);
    this.name = 'StudyStorageError';
    this.code = code;
    this.causeValue = causeValue;
  }
}

export interface SaveStudyBundleResult {
  readonly status: 'saved' | 'unchanged';
  readonly entry: StudyStorageIndexEntryV1;
  /** Digests whose now-unreferenced blobs could not be removed. */
  readonly cleanupFailures: readonly string[];
}

export interface RemoveStudyBundleResult {
  readonly removed: boolean;
  readonly entry?: StudyStorageIndexEntryV1;
  /** Digests whose now-unreferenced blobs could not be removed. */
  readonly cleanupFailures: readonly string[];
}

function isPlainRecord(value: unknown): value is UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasExactKeys(value: UnknownRecord, keys: readonly string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === keys.length && actual.every((key) => keys.includes(key));
}

function isCanonicalDate(value: unknown): value is string {
  return typeof value === 'string'
    && CANONICAL_DATE_PATTERN.test(value)
    && !Number.isNaN(Date.parse(value))
    && new Date(value).toISOString() === value;
}

function isValidId(value: unknown): value is string {
  return typeof value === 'string'
    && value.length > 0
    && value.length <= MAX_ID_LENGTH
    && value === value.trim()
    && !/[\u0000-\u001f\u007f]/.test(value);
}

function requireId(value: string): void {
  if (!isValidId(value)) {
    throw new StudyStorageError(
      'INVALID_ID',
      `Study id must be a non-empty, trimmed string of at most ${MAX_ID_LENGTH} characters`,
    );
  }
}

function parseIndexEntry(value: unknown): StudyStorageIndexEntryV1 | null {
  if (!isPlainRecord(value)) return null;
  if (!hasExactKeys(value, ['id', 'digest', 'createdAt', 'hypothesis', 'kind'])) return null;
  if (!isValidId(value.id)) return null;
  if (typeof value.digest !== 'string' || !SHA256_PATTERN.test(value.digest)) return null;
  if (!isCanonicalDate(value.createdAt)) return null;
  if (
    typeof value.hypothesis !== 'string'
    || !value.hypothesis.trim()
    || value.hypothesis.length > MAX_HYPOTHESIS_LENGTH
    || value.hypothesis.includes('\u0000')
  ) return null;
  if (value.kind !== 'portable') return null;
  return Object.freeze({
    id: value.id,
    digest: value.digest,
    createdAt: value.createdAt,
    hypothesis: value.hypothesis,
    kind: 'portable',
  });
}

function compareNewest(
  left: StudyStorageIndexEntryV1,
  right: StudyStorageIndexEntryV1,
): number {
  return right.createdAt.localeCompare(left.createdAt)
    || left.id.localeCompare(right.id)
    || left.digest.localeCompare(right.digest);
}

function compareOldest(
  left: StudyStorageIndexEntryV1,
  right: StudyStorageIndexEntryV1,
): number {
  return left.createdAt.localeCompare(right.createdAt)
    || left.id.localeCompare(right.id)
    || left.digest.localeCompare(right.digest);
}

function freezeIndex(entries: readonly StudyStorageIndexEntryV1[]): StudyStorageIndexV1 {
  return Object.freeze({
    format: STUDY_STORAGE_INDEX_FORMAT,
    formatVersion: STUDY_STORAGE_INDEX_VERSION,
    entries: Object.freeze([...entries].sort(compareNewest)),
  });
}

const EMPTY_INDEX = freezeIndex([]);

/**
 * Decode a strict, versioned index. An invalid root fails closed to an empty
 * index. Invalid or ambiguous individual entries are omitted rather than
 * trusted. This decoder never repairs storage as a read side effect.
 */
function decodeIndex(raw: string | null): StudyStorageIndexV1 {
  if (!raw || raw.length > MAX_INDEX_BYTES) return EMPTY_INDEX;
  let value: unknown;
  try {
    value = JSON.parse(raw) as unknown;
  } catch {
    return EMPTY_INDEX;
  }
  if (!isPlainRecord(value)) return EMPTY_INDEX;
  if (!hasExactKeys(value, ['format', 'formatVersion', 'entries'])) return EMPTY_INDEX;
  if (
    value.format !== STUDY_STORAGE_INDEX_FORMAT
    || value.formatVersion !== STUDY_STORAGE_INDEX_VERSION
    || !Array.isArray(value.entries)
  ) return EMPTY_INDEX;

  const candidates = value.entries
    .map(parseIndexEntry)
    .filter((entry): entry is StudyStorageIndexEntryV1 => entry !== null);

  // Duplicate ids or digests make lookup ambiguous. Exclude every member of
  // an ambiguous group instead of selecting one based on attacker-controlled
  // array order.
  const idCounts = new Map<string, number>();
  const digestCounts = new Map<string, number>();
  for (const entry of candidates) {
    idCounts.set(entry.id, (idCounts.get(entry.id) ?? 0) + 1);
    digestCounts.set(entry.digest, (digestCounts.get(entry.digest) ?? 0) + 1);
  }
  const unambiguous = candidates.filter((entry) => (
    idCounts.get(entry.id) === 1 && digestCounts.get(entry.digest) === 1
  ));
  return freezeIndex(unambiguous.sort(compareNewest).slice(0, STUDY_STORAGE_MAX_ENTRIES));
}

function encodeIndex(entries: readonly StudyStorageIndexEntryV1[]): string {
  return JSON.stringify({
    format: STUDY_STORAGE_INDEX_FORMAT,
    formatVersion: STUDY_STORAGE_INDEX_VERSION,
    entries: [...entries].sort(compareNewest),
  } satisfies StudyStorageIndexV1);
}

/**
 * Mutation must never treat decodeIndex's safe subset as the complete stored
 * index. Only bytes written by encodeIndex are authoritative for RMW; otherwise
 * preserving the unknown bytes and every possibly referenced blob is safer.
 */
function decodeIndexForMutation(raw: string | null): StudyStorageIndexV1 {
  if (raw === null) return EMPTY_INDEX;
  const decoded = decodeIndex(raw);
  if (raw !== encodeIndex(decoded.entries)) {
    throw new StudyStorageError(
      'INDEX_READ_FAILED',
      'Portable study index is malformed or non-canonical; mutation was aborted without changing storage',
    );
  }
  return decoded;
}

function readIndexRaw(api: StudyStorageApi): string | null {
  try {
    return api.storage.get(STUDY_STORAGE_INDEX_KEY);
  } catch (error) {
    throw new StudyStorageError('INDEX_READ_FAILED', 'Could not read the portable study index', error);
  }
}

function bestEffortRemove(api: StudyStorageApi, key: string): boolean {
  try {
    api.storage.remove(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * In-process serialization keeps calls in this module instance ordered while
 * Web Locks provide the cross-tab/window exclusion required for mutations.
 * Without Web Locks, mutation fails closed: a module-local queue and optimistic
 * verification cannot prevent a later writer in another tab from overwriting a
 * successfully verified commit or racing blob cleanup.
 */
const localLockQueues = new Map<string, Promise<void>>();

interface LockManagerLike {
  request<T>(
    name: string,
    options: { mode: 'exclusive' },
    callback: () => Promise<T>,
  ): Promise<T>;
}

function availableLockManager(): LockManagerLike | null {
  if (typeof navigator === 'undefined') return null;
  const candidate = (navigator as Navigator & { locks?: unknown }).locks;
  if (!candidate || typeof (candidate as { request?: unknown }).request !== 'function') return null;
  return candidate as LockManagerLike;
}

/**
 * Run a storage mutation only while holding a named cross-tab Web Lock.
 * Other browser-local RMW stores can reuse this helper with their own name;
 * read-only callers should not acquire a lock at all.
 */
export function withRequiredWebLock<T>(
  lockName: string,
  task: () => Promise<T>,
): Promise<T> {
  const locks = availableLockManager();
  if (locks === null) {
    return Promise.reject(new StudyStorageError(
      'LOCK_UNAVAILABLE',
      'Cross-tab storage mutations require browser Web Locks; this environment remains read-only',
    ));
  }
  const previous = localLockQueues.get(lockName) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => { release = resolve; });
  localLockQueues.set(lockName, current);
  return previous
    .catch(() => undefined)
    .then(() => locks.request(lockName, { mode: 'exclusive' }, task))
    .finally(() => {
      release();
      if (localLockQueues.get(lockName) === current) localLockQueues.delete(lockName);
    });
}

function withStudyIndexLock<T>(task: () => Promise<T>): Promise<T> {
  return withRequiredWebLock(STUDY_STORAGE_LOCK_NAME, task);
}

/**
 * Attempt one optimistic index commit. `false` means another writer won and
 * the caller should merge the new index and retry. A thrown storage write is
 * never repaired by restoring an old snapshot: the observed value may belong
 * to a newer unrelated writer.
 */
function commitIndexOptimistically(
  api: StudyStorageApi,
  expectedRaw: string | null,
  nextRaw: string,
): boolean {
  if (readIndexRaw(api) !== expectedRaw) return false;
  try {
    api.storage.set(STUDY_STORAGE_INDEX_KEY, nextRaw);
  } catch (error) {
    let observed: string | null | undefined;
    try {
      observed = api.storage.get(STUDY_STORAGE_INDEX_KEY);
    } catch {
      observed = undefined;
    }
    // Some storage wrappers can commit and then throw. Verified target bytes
    // are a successful commit; every other state is left untouched.
    if (observed === nextRaw) return true;
    throw new StudyStorageError(
      'INDEX_WRITE_FAILED',
      observed === expectedRaw
        ? 'Portable study index write failed before changing the index'
        : 'Portable study index write failed and the resulting index was left untouched to avoid overwriting a concurrent update',
      error,
    );
  }
  return readIndexRaw(api) === nextRaw;
}

function digestIsIndexed(api: StudyStorageApi, digest: string): boolean {
  try {
    const raw = readIndexRaw(api);
    const index = decodeIndex(raw);
    if (index.entries.some((entry) => entry.digest === digest)) return true;
    // Cleanup is allowed only from a canonical index whose complete meaning is
    // known. A malformed/ambiguous root decodes fail-closed for UI reads, but
    // must not be interpreted as proof that no writer references this blob.
    return raw !== null && raw !== encodeIndex(index.entries);
  } catch {
    // If index state cannot be established, preserving an immutable blob is
    // safer than deleting data that another writer may just have referenced.
    return true;
  }
}

function cleanupBlobIfUnreferenced(api: StudyStorageApi, digest: string): boolean {
  return digestIsIndexed(api, digest)
    ? true
    : bestEffortRemove(api, studyBundleStorageKey(digest));
}

export function studyBundleStorageKey(digest: string): string {
  if (!SHA256_PATTERN.test(digest)) {
    throw new StudyStorageError('BUNDLE_TAMPERED', 'Study digest is not a lowercase SHA-256 value');
  }
  return `${STUDY_STORAGE_BUNDLE_PREFIX}${digest}`;
}

/**
 * Data-only import preview. This function has no API parameter by design and
 * therefore cannot write storage, apply graph operations, or make requests.
 */
export async function parseStudyImport(text: string): Promise<StudyBundleV1> {
  return parseStudyBundle(text);
}

/** Read the safe subset of the current index without mutating it. */
export function loadStudyIndex(api: StudyStorageApi): StudyStorageIndexV1 {
  try {
    return decodeIndex(api.storage.get(STUDY_STORAGE_INDEX_KEY));
  } catch {
    return EMPTY_INDEX;
  }
}

/**
 * Persist an integrity-verified portable bundle under its content digest.
 * A repeated id+digest is an exact no-op. Reusing an id for different content
 * is rejected explicitly; callers must create and sign a new study id.
 */
export async function saveStudyBundle(
  api: StudyStorageApi,
  value: unknown,
): Promise<SaveStudyBundleResult> {
  const encoded = await encodeStudyBundle(value);
  const bundle = await parseStudyBundle(encoded);
  const entry = Object.freeze({
    id: bundle.payload.id,
    digest: bundle.integrity.contentSha256,
    createdAt: bundle.payload.createdAt,
    hypothesis: bundle.payload.spec.hypothesis,
    kind: 'portable' as const,
  });
  return withStudyIndexLock(async () => {
    const firstRaw = readIndexRaw(api);
    const firstIndex = decodeIndexForMutation(firstRaw);
    const firstSameId = firstIndex.entries.find((candidate) => candidate.id === entry.id);
    if (firstSameId && firstSameId.digest !== entry.digest) {
      throw new StudyStorageError(
        'ID_CONFLICT',
        `Study '${entry.id}' already exists with different content; fork it to a new id before saving`,
      );
    }

    const bundleKey = studyBundleStorageKey(entry.digest);
    let existingBlob: string | null;
    try {
      existingBlob = api.storage.get(bundleKey);
    } catch (error) {
      throw new StudyStorageError('BUNDLE_READ_FAILED', `Could not inspect study blob ${entry.digest}`, error);
    }
    if (existingBlob !== null && existingBlob !== encoded) {
      throw new StudyStorageError(
        'BUNDLE_KEY_CONFLICT',
        `Content-addressed study blob ${entry.digest} already contains different bytes`,
      );
    }
    if (firstSameId && existingBlob === encoded) {
      return Object.freeze({
        status: 'unchanged' as const,
        entry: firstSameId,
        cleanupFailures: Object.freeze([] as string[]),
      });
    }

    const createdBlob = existingBlob === null;
    if (createdBlob) {
      try {
        api.storage.set(bundleKey, encoded);
      } catch (error) {
        let observed: string | null | undefined;
        try {
          observed = api.storage.get(bundleKey);
        } catch {
          observed = undefined;
        }
        // A wrapper may commit and then throw. Exact canonical bytes are a
        // successful content-addressed write and must not be deleted.
        if (observed === encoded) {
          existingBlob = observed;
        } else {
          if (observed !== undefined) bestEffortRemove(api, bundleKey);
          throw new StudyStorageError(
            'BUNDLE_WRITE_FAILED',
            `Could not store portable study blob ${entry.digest}`,
            error,
          );
        }
      }
      if (existingBlob !== null && existingBlob !== encoded) {
        throw new StudyStorageError(
          'BUNDLE_KEY_CONFLICT',
          `Content-addressed study blob ${entry.digest} changed during the write`,
        );
      }
    }

    try {
      for (let attempt = 0; attempt < MAX_INDEX_COMMIT_ATTEMPTS; attempt += 1) {
        const previousRaw = readIndexRaw(api);
        const previousIndex = decodeIndexForMutation(previousRaw);
        const sameId = previousIndex.entries.find((candidate) => candidate.id === entry.id);
        if (sameId) {
          if (sameId.digest !== entry.digest) {
            throw new StudyStorageError(
              'ID_CONFLICT',
              `Study '${entry.id}' already exists with different content; fork it to a new id before saving`,
            );
          }
          // A valid index can outlive its blob if browser cleanup was
          // interrupted. The blob-first write above repairs it in place.
          return Object.freeze({
            status: createdBlob ? 'saved' as const : 'unchanged' as const,
            entry: sameId,
            cleanupFailures: Object.freeze([] as string[]),
          });
        }

        const allEntries = [...previousIndex.entries, entry];
        // Retain the newly saved study even if it is older than the current
        // archive; evict only from the previously indexed set.
        const evicted = [...previousIndex.entries]
          .sort(compareOldest)
          .slice(0, Math.max(0, allEntries.length - STUDY_STORAGE_MAX_ENTRIES));
        const evictedDigests = new Set(evicted.map((candidate) => candidate.digest));
        const nextEntries = allEntries
          .filter((candidate) => !evictedDigests.has(candidate.digest))
          .sort(compareNewest);
        const nextRaw = encodeIndex(nextEntries);

        if (!commitIndexOptimistically(api, previousRaw, nextRaw)) continue;

        // Cleanup begins only after a verified index commit. Re-read the index
        // before each removal so a later writer's reference is never removed.
        const cleanupFailures: string[] = [];
        for (const evictedEntry of evicted) {
          if (!cleanupBlobIfUnreferenced(api, evictedEntry.digest)) {
            cleanupFailures.push(evictedEntry.digest);
          }
        }
        return Object.freeze({
          status: 'saved' as const,
          entry,
          cleanupFailures: Object.freeze(cleanupFailures),
        });
      }
      throw new StudyStorageError(
        'INDEX_WRITE_FAILED',
        `Portable study index changed during ${MAX_INDEX_COMMIT_ATTEMPTS} consecutive commit attempts`,
      );
    } catch (error) {
      if (createdBlob) cleanupBlobIfUnreferenced(api, entry.digest);
      throw error;
    }
  });
}

/**
 * Load one indexed bundle and re-check both its schema and content digest.
 * Missing blobs and any non-canonical/tampered bytes are surfaced explicitly.
 */
export async function loadStudyBundle(
  api: StudyStorageApi,
  id: string,
): Promise<StudyBundleV1> {
  requireId(id);
  const index = decodeIndex(readIndexRaw(api));
  const entry = index.entries.find((candidate) => candidate.id === id);
  if (!entry) {
    throw new StudyStorageError('STUDY_NOT_FOUND', `Portable study '${id}' is not indexed`);
  }
  const key = studyBundleStorageKey(entry.digest);
  let raw: string | null;
  try {
    raw = api.storage.get(key);
  } catch (error) {
    throw new StudyStorageError('BUNDLE_READ_FAILED', `Could not read portable study '${id}'`, error);
  }
  if (raw === null) {
    throw new StudyStorageError('BUNDLE_MISSING', `Portable study '${id}' is indexed but its blob is missing`);
  }

  try {
    const bundle = await parseStudyBundle(raw);
    const canonical = await encodeStudyBundle(bundle);
    if (
      bundle.payload.id !== entry.id
      || bundle.integrity.contentSha256 !== entry.digest
      || canonical !== raw
    ) {
      throw new StudyStorageError(
        'BUNDLE_TAMPERED',
        `Portable study '${id}' does not match its content-addressed index entry`,
      );
    }
    return bundle;
  } catch (error) {
    if (error instanceof StudyStorageError) throw error;
    const detail = error instanceof StudyBundleError ? ` (${error.code})` : '';
    throw new StudyStorageError(
      'BUNDLE_TAMPERED',
      `Portable study '${id}' failed integrity verification${detail}`,
      error,
    );
  }
}

/** Remove an indexed study. The index is committed before blob cleanup. */
export async function removeStudyBundle(
  api: StudyStorageApi,
  id: string,
): Promise<RemoveStudyBundleResult> {
  requireId(id);
  return withStudyIndexLock(async () => {
    for (let attempt = 0; attempt < MAX_INDEX_COMMIT_ATTEMPTS; attempt += 1) {
      const previousRaw = readIndexRaw(api);
      const previousIndex = decodeIndexForMutation(previousRaw);
      const entry = previousIndex.entries.find((candidate) => candidate.id === id);
      if (!entry) {
        return Object.freeze({ removed: false, cleanupFailures: Object.freeze([]) });
      }
      const nextEntries = previousIndex.entries.filter((candidate) => candidate.id !== id);
      if (!commitIndexOptimistically(api, previousRaw, encodeIndex(nextEntries))) continue;

      const cleanupFailures: string[] = [];
      if (!cleanupBlobIfUnreferenced(api, entry.digest)) {
        cleanupFailures.push(entry.digest);
      }
      return Object.freeze({
        removed: true,
        entry,
        cleanupFailures: Object.freeze(cleanupFailures),
      });
    }
    throw new StudyStorageError(
      'INDEX_WRITE_FAILED',
      `Portable study index changed during ${MAX_INDEX_COMMIT_ATTEMPTS} consecutive remove attempts`,
    );
  });
}

/**
 * There is intentionally no `importAsFork` helper in storage v1. The payload
 * id is covered by bundle integrity, and the bundle codec exposes no safe API
 * to clone an imported payload with new lineage and re-sign it. Callers must
 * construct a fresh bundle through the normal study creation flow instead of
 * weakening or bypassing integrity.
 */
