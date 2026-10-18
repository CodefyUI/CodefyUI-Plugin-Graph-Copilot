/**
 * runPointer — persists the id of the live run this panel is responsible
 * for, so a page reload can offer to reattach (#22). One pointer, plugin-
 * wide: run_graph enforces one live run at a time.
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';

const STORAGE_KEY = 'active_run';
const UNIDENTIFIED_STORAGE_KEY = 'unidentified_live_run';
type StorageApi = Pick<CodefyUIPluginAPI, 'storage'>;
// Storage can fail (quota/private mode). Retain same-page ownership instead of
// silently permitting a duplicate submission. Null is a local clear tombstone.
const activeFallback = new WeakMap<StorageApi['storage'], ActiveRunPointer | null>();
const unidentifiedFallback = new WeakMap<StorageApi['storage'], UnidentifiedRunPointer | null>();

export interface ActiveRunPointer {
  runId: string;
  reason: string;
  submittedAt: number;
  timeoutMinutes: number;
  device?: string;
}

/** A known submission with no host identity. submissionId is a local recovery
 * token, never a host run id; no cancel/lookup may be sent with it. */
export interface UnidentifiedRunPointer {
  submissionId: string;
  reason: string;
  submittedAt: number;
  timeoutMinutes: number;
  device?: string;
}

export function readActiveRun(api: StorageApi): ActiveRunPointer | null {
  try { return readActiveRunStrict(api); } catch { return null; }
}

/** Safety-sensitive read: unreadable storage is not an absent reservation.
 * UI callers may use the tolerant reader above; dispatch must use this one. */
export function readActiveRunStrict(api: StorageApi): ActiveRunPointer | null {
  if (activeFallback.has(api.storage)) return activeFallback.get(api.storage) ?? null;
  const raw = api.storage.get(STORAGE_KEY);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as Partial<ActiveRunPointer> | null;
  if (!parsed || typeof parsed.runId !== 'string' || !parsed.runId) throw new Error('Stored active run is unreadable.');
  return {
    runId: parsed.runId,
    reason: typeof parsed.reason === 'string' ? parsed.reason : '',
    submittedAt: typeof parsed.submittedAt === 'number' ? parsed.submittedAt : 0,
    timeoutMinutes: typeof parsed.timeoutMinutes === 'number' ? parsed.timeoutMinutes : 0,
    ...(typeof parsed.device === 'string' && parsed.device ? { device: parsed.device } : {}),
  };
}

export function writeActiveRun(api: StorageApi, pointer: ActiveRunPointer): void {
  try {
    api.storage.set(STORAGE_KEY, JSON.stringify(pointer));
    activeFallback.delete(api.storage);
  } catch {
    activeFallback.set(api.storage, { ...pointer });
  }
}

/** Clear the pointer; with `runId`, only when it still points at that run
 * (so a stale cleanup cannot erase a newer run's pointer). */
export function clearActiveRun(api: StorageApi, runId?: string): void {
  if (runId) {
    try {
      const current = readActiveRunStrict(api);
      if (current && current.runId !== runId) return;
    } catch { return; /* cannot establish which reservation would be removed */ }
  }
  try {
    api.storage.remove(STORAGE_KEY);
    activeFallback.delete(api.storage);
  } catch {
    activeFallback.set(api.storage, null);
  }
}

/** Read unknown-submission evidence independently of the reattach pointer. */
export function readUnidentifiedRun(api: StorageApi): UnidentifiedRunPointer | null {
  try { return readUnidentifiedRunStrict(api); } catch { return null; }
}

/** Dispatch must fail closed when unknown-submission storage cannot be read. */
export function readUnidentifiedRunStrict(api: StorageApi): UnidentifiedRunPointer | null {
  if (unidentifiedFallback.has(api.storage)) return unidentifiedFallback.get(api.storage) ?? null;
  const raw = api.storage.get(UNIDENTIFIED_STORAGE_KEY);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as Partial<UnidentifiedRunPointer> | null;
  if (!parsed || typeof parsed.submissionId !== 'string' || !parsed.submissionId ||
    typeof parsed.submittedAt !== 'number' || !Number.isFinite(parsed.submittedAt)) throw new Error('Stored unidentified run is unreadable.');
  return {
    submissionId: parsed.submissionId,
    reason: typeof parsed.reason === 'string' ? parsed.reason : '',
    submittedAt: parsed.submittedAt,
    timeoutMinutes: typeof parsed.timeoutMinutes === 'number' && Number.isFinite(parsed.timeoutMinutes) ? parsed.timeoutMinutes : 0,
    ...(typeof parsed.device === 'string' && parsed.device ? { device: parsed.device } : {}),
  };
}

/** Preserve a submitted run with unknown identity; never invent a host id. */
export function writeUnidentifiedRun(api: StorageApi, pointer: UnidentifiedRunPointer): void {
  try {
    api.storage.set(UNIDENTIFIED_STORAGE_KEY, JSON.stringify(pointer));
    unidentifiedFallback.delete(api.storage);
  } catch {
    unidentifiedFallback.set(api.storage, { ...pointer });
  }
}

/** Release only this reservation after authoritative reconciliation or an
 * explicit user attestation that they inspected the host and no run is active.
 * Dismiss/navigation must never call this. False means the reservation changed. */
export function clearUnidentifiedRun(api: StorageApi, submissionId: string): boolean {
  let current: UnidentifiedRunPointer | null;
  try { current = readUnidentifiedRunStrict(api); } catch { return false; }
  if (!current || current.submissionId !== submissionId) return false;
  try {
    api.storage.remove(UNIDENTIFIED_STORAGE_KEY);
    unidentifiedFallback.delete(api.storage);
  } catch {
    unidentifiedFallback.set(api.storage, null);
  }
  return true;
}
