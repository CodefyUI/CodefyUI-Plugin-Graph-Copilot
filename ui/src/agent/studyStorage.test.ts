import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ExperimentSession } from './experiments';
import {
  createStudyBundle,
  encodeStudyBundle,
  type CreateStudyBundleInput,
  type StudyBundleV1,
} from './studyBundle';
import {
  STUDY_STORAGE_BUNDLE_PREFIX,
  STUDY_STORAGE_INDEX_FORMAT,
  STUDY_STORAGE_INDEX_KEY,
  STUDY_STORAGE_INDEX_VERSION,
  STUDY_STORAGE_MAX_ENTRIES,
  StudyStorageError,
  loadStudyBundle,
  loadStudyIndex,
  parseStudyImport,
  removeStudyBundle,
  saveStudyBundle,
  studyBundleStorageKey,
} from './studyStorage';

type SetBehavior = (key: string, value: string) => void;

function fakeStorage() {
  const values = new Map<string, string>();
  const events: string[] = [];
  let setBehavior: SetBehavior | undefined;
  const storage = {
    get: vi.fn((key: string) => values.get(key) ?? null),
    set: vi.fn((key: string, value: string) => {
      events.push(`set:${key}`);
      if (setBehavior) setBehavior(key, value);
      else values.set(key, value);
    }),
    remove: vi.fn((key: string) => {
      events.push(`remove:${key}`);
      values.delete(key);
    }),
  };
  return {
    api: { storage },
    storage,
    values,
    events,
    setBehavior(behavior: SetBehavior | undefined) {
      setBehavior = behavior;
    },
  };
}

function timestamp(offsetSeconds: number): string {
  return new Date(Date.UTC(2026, 6, 14, 1, 0, offsetSeconds)).toISOString();
}

function bundleInput(
  id: string,
  offsetSeconds: number,
  hypothesis = `Hypothesis for ${id}`,
): CreateStudyBundleInput {
  const createdAt = timestamp(offsetSeconds);
  const completedAt = timestamp(offsetSeconds + 1);
  const session: ExperimentSession = {
    id,
    createdAt,
    hypothesis,
    objective: { metric: 'score', direction: 'maximize' },
    repetitions: 1,
    status: 'completed',
    winnerId: 'baseline',
    winnerLabel: 'Baseline',
    variants: [{
      id: 'baseline',
      label: 'Baseline',
      status: 'completed',
      metricKey: 'score',
      metricValues: [offsetSeconds + 1],
      mean: offsetSeconds + 1,
      runtimeMs: 10,
      observedMetrics: { score: offsetSeconds + 1 },
      operationSummary: [],
      errors: [],
    }],
    insights: { summary: [], warnings: [], paperIdeas: [] },
  };
  return {
    session,
    completedAt,
    producer: {
      pluginId: 'graph-copilot',
      pluginVersion: '0.2.0',
      codefyuiApiVersion: 2,
    },
    provenance: { facts: [] },
    baseline: { nodes: [], edges: [] },
    variants: [{ id: 'baseline', label: 'Baseline', operations: [] }],
    runs: [{
      runKey: 'baseline:1',
      variantId: 'baseline',
      repetition: 1,
      status: 'completed',
      startedAt: createdAt,
      completedAt,
      durationMs: 10,
      metrics: [{
        observedKey: 'score',
        canonicalKey: 'score',
        value: offsetSeconds + 1,
        source: 'output_summary',
      }],
    }],
    redactionReport: {
      policy: 'explicit-secret-ref-v1',
      secretRequirements: [],
      textRedactions: [],
    },
  };
}

async function makeBundle(
  id = 'study-1',
  offsetSeconds = 0,
  hypothesis?: string,
): Promise<StudyBundleV1> {
  return createStudyBundle(bundleInput(id, offsetSeconds, hypothesis));
}

function entryFor(bundle: StudyBundleV1) {
  return {
    id: bundle.payload.id,
    digest: bundle.integrity.contentSha256,
    createdAt: bundle.payload.createdAt,
    hypothesis: bundle.payload.spec.hypothesis,
    kind: 'portable' as const,
  };
}

function indexBytes(entries: readonly ReturnType<typeof entryFor>[]): string {
  return JSON.stringify({
    format: STUDY_STORAGE_INDEX_FORMAT,
    formatVersion: STUDY_STORAGE_INDEX_VERSION,
    entries,
  });
}

function installWebLocks() {
  let tail: Promise<void> = Promise.resolve();
  const request = vi.fn(<T>(
    _name: string,
    _options: { mode: 'exclusive' },
    callback: () => Promise<T>,
  ): Promise<T> => {
    const result = tail.then(callback);
    tail = result.then(() => undefined, () => undefined);
    return result;
  });
  vi.stubGlobal('navigator', { locks: { request } });
  return request;
}

beforeEach(() => {
  installWebLocks();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('portable study import preview', () => {
  it('parses and verifies data with zero storage, apply, or network side effects', async () => {
    const encoded = await encodeStudyBundle(await makeBundle());
    const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
    const storageRemove = vi.spyOn(Storage.prototype, 'removeItem');
    const applyOperations = vi.fn();
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const preview = await parseStudyImport(encoded);

    expect(preview.payload.id).toBe('study-1');
    expect(storageWrite).not.toHaveBeenCalled();
    expect(storageRemove).not.toHaveBeenCalled();
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});

describe('content-addressed study persistence', () => {
  it('fails mutations closed without Web Locks while verified reads remain available', async () => {
    const state = fakeStorage();
    const existing = await makeBundle('read-only-existing');
    await saveStudyBundle(state.api, existing);
    const before = new Map(state.values);
    state.storage.set.mockClear();
    state.storage.remove.mockClear();
    vi.stubGlobal('navigator', {});

    expect(loadStudyIndex(state.api).entries.map((entry) => entry.id)).toEqual(['read-only-existing']);
    await expect(loadStudyBundle(state.api, existing.payload.id)).resolves.toStrictEqual(existing);
    await expect(saveStudyBundle(state.api, await makeBundle('must-not-save', 1))).rejects.toMatchObject({
      code: 'LOCK_UNAVAILABLE',
    });
    await expect(removeStudyBundle(state.api, existing.payload.id)).rejects.toMatchObject({
      code: 'LOCK_UNAVAILABLE',
    });

    expect(state.values).toEqual(before);
    expect(state.storage.set).not.toHaveBeenCalled();
    expect(state.storage.remove).not.toHaveBeenCalled();
  });

  it('preserves a malformed index root and performs no save or remove writes', async () => {
    const state = fakeStorage();
    state.values.set(STUDY_STORAGE_INDEX_KEY, '{"partial":');
    const before = new Map(state.values);

    await expect(saveStudyBundle(state.api, await makeBundle('must-not-save'))).rejects.toMatchObject({
      code: 'INDEX_READ_FAILED',
    });
    await expect(removeStudyBundle(state.api, 'not-indexed')).rejects.toMatchObject({
      code: 'INDEX_READ_FAILED',
    });

    expect(loadStudyIndex(state.api).entries).toEqual([]);
    expect(state.values).toEqual(before);
    expect(state.storage.set).not.toHaveBeenCalled();
    expect(state.storage.remove).not.toHaveBeenCalled();
  });

  it('keeps tolerant mixed-entry reads but preserves every byte during mutation attempts', async () => {
    const state = fakeStorage();
    const existing = await makeBundle('mixed-valid');
    await saveStudyBundle(state.api, existing);
    const valid = loadStudyIndex(state.api).entries[0];
    const mixedRaw = JSON.stringify({
      format: STUDY_STORAGE_INDEX_FORMAT,
      formatVersion: STUDY_STORAGE_INDEX_VERSION,
      entries: [valid, { ...valid, id: 'invalid-entry', kind: 'executable' }, null],
    });
    state.values.set(STUDY_STORAGE_INDEX_KEY, mixedRaw);
    const before = new Map(state.values);
    state.storage.set.mockClear();
    state.storage.remove.mockClear();

    expect(loadStudyIndex(state.api).entries).toEqual([valid]);
    await expect(loadStudyBundle(state.api, existing.payload.id)).resolves.toStrictEqual(existing);
    await expect(saveStudyBundle(state.api, await makeBundle('must-not-join-mixed', 1)))
      .rejects.toMatchObject({ code: 'INDEX_READ_FAILED' });
    await expect(removeStudyBundle(state.api, existing.payload.id))
      .rejects.toMatchObject({ code: 'INDEX_READ_FAILED' });

    expect(state.values).toEqual(before);
    expect(state.values.get(STUDY_STORAGE_INDEX_KEY)).toBe(mixedRaw);
    expect(state.storage.set).not.toHaveBeenCalled();
    expect(state.storage.remove).not.toHaveBeenCalled();
  });

  it('writes the immutable blob first, commits the versioned index last, and is idempotent', async () => {
    const state = fakeStorage();
    const bundle = await makeBundle();

    const first = await saveStudyBundle(state.api, bundle);
    expect(first.status).toBe('saved');
    expect(state.events).toEqual([
      `set:${studyBundleStorageKey(bundle.integrity.contentSha256)}`,
      `set:${STUDY_STORAGE_INDEX_KEY}`,
    ]);
    expect(loadStudyIndex(state.api)).toMatchObject({
      format: STUDY_STORAGE_INDEX_FORMAT,
      formatVersion: STUDY_STORAGE_INDEX_VERSION,
      entries: [{
        id: 'study-1',
        digest: bundle.integrity.contentSha256,
        hypothesis: 'Hypothesis for study-1',
        kind: 'portable',
      }],
    });

    state.storage.set.mockClear();
    state.storage.remove.mockClear();
    state.events.length = 0;
    const second = await saveStudyBundle(state.api, bundle);
    expect(second.status).toBe('unchanged');
    expect(state.storage.set).not.toHaveBeenCalled();
    expect(state.storage.remove).not.toHaveBeenCalled();
  });

  it('repairs a missing blob for the exact indexed digest without rewriting the index', async () => {
    const state = fakeStorage();
    const bundle = await makeBundle('repairable');
    await saveStudyBundle(state.api, bundle);
    const key = studyBundleStorageKey(bundle.integrity.contentSha256);
    const indexBefore = state.values.get(STUDY_STORAGE_INDEX_KEY);
    state.values.delete(key);
    state.storage.set.mockClear();
    state.events.length = 0;

    const repaired = await saveStudyBundle(state.api, bundle);

    expect(repaired.status).toBe('saved');
    expect(state.events).toEqual([`set:${key}`]);
    expect(state.values.get(STUDY_STORAGE_INDEX_KEY)).toBe(indexBefore);
    await expect(loadStudyBundle(state.api, bundle.payload.id)).resolves.toStrictEqual(bundle);
  });

  it('rejects same-id different-content conflicts before writing and requires a fork', async () => {
    const state = fakeStorage();
    await saveStudyBundle(state.api, await makeBundle('stable-id', 0, 'first'));
    const previous = new Map(state.values);
    state.storage.set.mockClear();
    state.storage.remove.mockClear();

    await expect(saveStudyBundle(
      state.api,
      await makeBundle('stable-id', 0, 'different signed content'),
    )).rejects.toMatchObject({
      code: 'ID_CONFLICT',
      message: expect.stringContaining('fork it to a new id'),
    });
    expect(state.values).toEqual(previous);
    expect(state.storage.set).not.toHaveBeenCalled();
    expect(state.storage.remove).not.toHaveBeenCalled();
  });

  it('never restores an old index over a newer value observed after a failed write', async () => {
    const state = fakeStorage();
    const existing = await makeBundle('existing', 0);
    await saveStudyBundle(state.api, existing);
    const concurrent = await makeBundle('concurrent', 4);
    state.values.set(
      studyBundleStorageKey(concurrent.integrity.contentSha256),
      await encodeStudyBundle(concurrent),
    );
    const concurrentIndex = indexBytes([entryFor(concurrent), entryFor(existing)]);
    const incoming = await makeBundle('incoming', 2);
    const incomingKey = studyBundleStorageKey(incoming.integrity.contentSha256);
    let failIndexOnce = true;
    state.setBehavior((key, value) => {
      if (key === STUDY_STORAGE_INDEX_KEY && failIndexOnce) {
        failIndexOnce = false;
        // Simulate a different tab committing after this save's read but
        // before its storage wrapper reports a failure.
        state.values.set(key, concurrentIndex);
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      }
      state.values.set(key, value);
    });

    await expect(saveStudyBundle(state.api, incoming)).rejects.toMatchObject({
      code: 'INDEX_WRITE_FAILED',
    });
    expect(state.values.get(STUDY_STORAGE_INDEX_KEY)).toBe(concurrentIndex);
    expect(state.values.has(incomingKey)).toBe(false);
    expect(loadStudyIndex(state.api).entries.map((entry) => entry.id))
      .toEqual(['concurrent', 'existing']);
  });

  it('preserves an immutable blob when a failed write leaves an ambiguous index', async () => {
    const state = fakeStorage();
    const incoming = await makeBundle('ambiguous-index', 0);
    const incomingKey = studyBundleStorageKey(incoming.integrity.contentSha256);
    state.setBehavior((key, value) => {
      if (key === STUDY_STORAGE_INDEX_KEY) {
        state.values.set(key, '{"partial":');
        throw new Error('partial index write');
      }
      state.values.set(key, value);
    });

    await expect(saveStudyBundle(state.api, incoming)).rejects.toMatchObject({
      code: 'INDEX_WRITE_FAILED',
    });
    expect(state.values.get(STUDY_STORAGE_INDEX_KEY)).toBe('{"partial":');
    expect(state.values.get(incomingKey)).toBe(await encodeStudyBundle(incoming));
  });

  it('merges and retries when verification observes a concurrent index commit', async () => {
    const state = fakeStorage();
    const existing = await makeBundle('existing', 0);
    await saveStudyBundle(state.api, existing);
    const concurrent = await makeBundle('concurrent', 4);
    state.values.set(
      studyBundleStorageKey(concurrent.integrity.contentSha256),
      await encodeStudyBundle(concurrent),
    );
    const concurrentIndex = indexBytes([entryFor(concurrent), entryFor(existing)]);
    const incoming = await makeBundle('incoming', 2);
    let replaceFirstCommit = true;
    state.setBehavior((key, value) => {
      if (key === STUDY_STORAGE_INDEX_KEY && replaceFirstCommit) {
        replaceFirstCommit = false;
        state.values.set(key, concurrentIndex);
        return;
      }
      state.values.set(key, value);
    });

    await expect(saveStudyBundle(state.api, incoming)).resolves.toMatchObject({ status: 'saved' });
    expect(loadStudyIndex(state.api).entries.map((entry) => entry.id))
      .toEqual(['concurrent', 'incoming', 'existing']);
    expect(state.events.filter((event) => event === `set:${STUDY_STORAGE_INDEX_KEY}`))
      .toHaveLength(3); // initial save plus the lost attempt and verified retry
  });

  it('serializes overlapping saves and uses Web Locks when available', async () => {
    const state = fakeStorage();
    const request = vi.fn(async <T>(
      _name: string,
      _options: { mode: 'exclusive' },
      callback: () => Promise<T>,
    ) => callback());
    vi.stubGlobal('navigator', { locks: { request } });
    const first = await makeBundle('first', 1);
    const second = await makeBundle('second', 2);

    await Promise.all([
      saveStudyBundle(state.api, first),
      saveStudyBundle(state.api, second),
    ]);

    expect(loadStudyIndex(state.api).entries.map((entry) => entry.id)).toEqual(['second', 'first']);
    expect(request).toHaveBeenCalledTimes(2);
    expect(request).toHaveBeenNthCalledWith(
      1,
      'graph-copilot.study-index.v1.lock',
      { mode: 'exclusive' },
      expect.any(Function),
    );
  });

  it('rolls back a quota/partial blob write without touching the index', async () => {
    const state = fakeStorage();
    const incoming = await makeBundle('quota', 0);
    const incomingKey = studyBundleStorageKey(incoming.integrity.contentSha256);
    let failBlobOnce = true;
    state.setBehavior((key, value) => {
      if (key.startsWith(STUDY_STORAGE_BUNDLE_PREFIX) && failBlobOnce) {
        failBlobOnce = false;
        state.values.set(key, value.slice(0, 20));
        throw new DOMException('Quota exceeded', 'QuotaExceededError');
      }
      state.values.set(key, value);
    });

    await expect(saveStudyBundle(state.api, incoming)).rejects.toMatchObject({
      code: 'BUNDLE_WRITE_FAILED',
    });
    expect(state.values.has(incomingKey)).toBe(false);
    expect(state.values.has(STUDY_STORAGE_INDEX_KEY)).toBe(false);
  });

  it('accepts exact blob or index bytes when a storage wrapper commits and then throws', async () => {
    const blobState = fakeStorage();
    const blobBundle = await makeBundle('blob-committed', 0);
    let throwAfterBlobCommit = true;
    blobState.setBehavior((key, value) => {
      blobState.values.set(key, value);
      if (key.startsWith(STUDY_STORAGE_BUNDLE_PREFIX) && throwAfterBlobCommit) {
        throwAfterBlobCommit = false;
        throw new Error('wrapper failed after commit');
      }
    });
    await expect(saveStudyBundle(blobState.api, blobBundle)).resolves.toMatchObject({ status: 'saved' });
    await expect(loadStudyBundle(blobState.api, 'blob-committed')).resolves.toStrictEqual(blobBundle);

    const indexState = fakeStorage();
    const indexBundle = await makeBundle('index-committed', 1);
    let throwAfterIndexCommit = true;
    indexState.setBehavior((key, value) => {
      indexState.values.set(key, value);
      if (key === STUDY_STORAGE_INDEX_KEY && throwAfterIndexCommit) {
        throwAfterIndexCommit = false;
        throw new Error('wrapper failed after commit');
      }
    });
    await expect(saveStudyBundle(indexState.api, indexBundle)).resolves.toMatchObject({ status: 'saved' });
    await expect(loadStudyBundle(indexState.api, 'index-committed')).resolves.toStrictEqual(indexBundle);
  });

  it('loads only verified canonical bytes and surfaces missing or tampered blobs', async () => {
    const state = fakeStorage();
    const bundle = await makeBundle('verified');
    await saveStudyBundle(state.api, bundle);
    await expect(loadStudyBundle(state.api, 'verified')).resolves.toMatchObject({
      payload: { id: 'verified' },
    });

    const key = studyBundleStorageKey(bundle.integrity.contentSha256);
    const tampered = JSON.parse(state.values.get(key)!) as Record<string, any>;
    tampered.payload.spec.hypothesis = 'tampered';
    state.values.set(key, JSON.stringify(tampered));
    await expect(loadStudyBundle(state.api, 'verified')).rejects.toMatchObject({
      code: 'BUNDLE_TAMPERED',
    });

    state.values.delete(key);
    await expect(loadStudyBundle(state.api, 'verified')).rejects.toMatchObject({
      code: 'BUNDLE_MISSING',
    });
  });

  it('removes the index entry before best-effort blob cleanup', async () => {
    const state = fakeStorage();
    const bundle = await makeBundle('remove-me');
    await saveStudyBundle(state.api, bundle);
    const key = studyBundleStorageKey(bundle.integrity.contentSha256);
    state.events.length = 0;

    await expect(removeStudyBundle(state.api, 'remove-me')).resolves.toMatchObject({
      removed: true,
      cleanupFailures: [],
    });
    expect(state.events).toEqual([
      `set:${STUDY_STORAGE_INDEX_KEY}`,
      `remove:${key}`,
    ]);
    expect(loadStudyIndex(state.api).entries).toEqual([]);
    expect(state.values.has(key)).toBe(false);
    await expect(removeStudyBundle(state.api, 'remove-me')).resolves.toMatchObject({ removed: false });
  });

  it('caps the index at ten and deterministically evicts and cleans the oldest study', async () => {
    const state = fakeStorage();
    const bundles: StudyBundleV1[] = [];
    for (let index = 0; index <= STUDY_STORAGE_MAX_ENTRIES; index += 1) {
      const bundle = await makeBundle(`study-${index.toString().padStart(2, '0')}`, index);
      bundles.push(bundle);
      await saveStudyBundle(state.api, bundle);
    }

    const index = loadStudyIndex(state.api);
    expect(index.entries).toHaveLength(STUDY_STORAGE_MAX_ENTRIES);
    expect(index.entries.map((entry) => entry.id)).toEqual([
      'study-10', 'study-09', 'study-08', 'study-07', 'study-06',
      'study-05', 'study-04', 'study-03', 'study-02', 'study-01',
    ]);
    expect(state.values.has(studyBundleStorageKey(bundles[0].integrity.contentSha256))).toBe(false);
    expect(state.values.has(studyBundleStorageKey(bundles[1].integrity.contentSha256))).toBe(true);
    expect(state.events.slice(-3)).toEqual([
      `set:${studyBundleStorageKey(bundles[10].integrity.contentSha256)}`,
      `set:${STUDY_STORAGE_INDEX_KEY}`,
      `remove:${studyBundleStorageKey(bundles[0].integrity.contentSha256)}`,
    ]);
  });

  it('fails closed on corrupt roots and excludes corrupt or ambiguous entries', async () => {
    const state = fakeStorage();
    const bundle = await makeBundle('valid');
    await saveStudyBundle(state.api, bundle);
    const valid = loadStudyIndex(state.api).entries[0];

    state.values.set(STUDY_STORAGE_INDEX_KEY, JSON.stringify({
      format: STUDY_STORAGE_INDEX_FORMAT,
      formatVersion: STUDY_STORAGE_INDEX_VERSION,
      entries: [valid, { ...valid, kind: 'executable', id: 'bad' }, null],
    }));
    expect(loadStudyIndex(state.api).entries).toEqual([valid]);

    state.values.set(STUDY_STORAGE_INDEX_KEY, JSON.stringify({
      format: STUDY_STORAGE_INDEX_FORMAT,
      formatVersion: STUDY_STORAGE_INDEX_VERSION,
      entries: [valid, { ...valid }],
    }));
    expect(loadStudyIndex(state.api).entries).toEqual([]);

    state.values.set(STUDY_STORAGE_INDEX_KEY, '{not-json');
    expect(loadStudyIndex(state.api).entries).toEqual([]);
  });

  it('uses typed errors for invalid identifiers and missing index entries', async () => {
    const state = fakeStorage();
    await expect(loadStudyBundle(state.api, ' missing ')).rejects.toBeInstanceOf(StudyStorageError);
    await expect(loadStudyBundle(state.api, 'not-here')).rejects.toMatchObject({
      code: 'STUDY_NOT_FOUND',
    });
  });
});
