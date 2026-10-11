/**
 * runPointer — persists the id of the live run this panel is responsible
 * for, so a page reload can offer to reattach (#22). One pointer, plugin-
 * wide: run_graph enforces one live run at a time.
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';

const STORAGE_KEY = 'active_run';
type StorageApi = Pick<CodefyUIPluginAPI, 'storage'>;

export interface ActiveRunPointer {
  runId: string;
  reason: string;
  submittedAt: number;
  timeoutMinutes: number;
  device?: string;
}

export function readActiveRun(api: StorageApi): ActiveRunPointer | null {
  const raw = api.storage.get(STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ActiveRunPointer>;
    if (typeof parsed.runId !== 'string' || !parsed.runId) return null;
    return {
      runId: parsed.runId,
      reason: typeof parsed.reason === 'string' ? parsed.reason : '',
      submittedAt: typeof parsed.submittedAt === 'number' ? parsed.submittedAt : 0,
      timeoutMinutes: typeof parsed.timeoutMinutes === 'number' ? parsed.timeoutMinutes : 0,
      ...(typeof parsed.device === 'string' && parsed.device ? { device: parsed.device } : {}),
    };
  } catch {
    return null;
  }
}

export function writeActiveRun(api: StorageApi, pointer: ActiveRunPointer): void {
  try {
    api.storage.set(STORAGE_KEY, JSON.stringify(pointer));
  } catch {
    // Quota overflow only loses the reattach offer, never the run.
  }
}

/** Clear the pointer; with `runId`, only when it still points at that run
 * (so a stale cleanup cannot erase a newer run's pointer). */
export function clearActiveRun(api: StorageApi, runId?: string): void {
  if (runId) {
    const current = readActiveRun(api);
    if (current && current.runId !== runId) return;
  }
  api.storage.remove(STORAGE_KEY);
}
