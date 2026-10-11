import { describe, expect, it } from 'vitest';
import { clearActiveRun, readActiveRun, writeActiveRun } from './runPointer';

function storageApi() {
  const store = new Map<string, string>();
  return {
    storage: {
      get: (k: string) => store.get(k) ?? null,
      set: (k: string, v: string) => { store.set(k, v); },
      remove: (k: string) => { store.delete(k); },
    },
  };
}

const POINTER = { runId: 'r1', reason: 'train it', submittedAt: 123, timeoutMinutes: 360, device: 'cuda' };

describe('runPointer', () => {
  it('round-trips a pointer', () => {
    const api = storageApi();
    writeActiveRun(api, POINTER);
    expect(readActiveRun(api)).toEqual(POINTER);
  });
  it('returns null for missing or corrupt JSON', () => {
    const api = storageApi();
    expect(readActiveRun(api)).toBeNull();
    api.storage.set('active_run', '{not json');
    expect(readActiveRun(api)).toBeNull();
    api.storage.set('active_run', JSON.stringify({ reason: 'no id' }));
    expect(readActiveRun(api)).toBeNull();
  });
  it('clearActiveRun with a runId guard only clears a matching pointer', () => {
    const api = storageApi();
    writeActiveRun(api, POINTER);
    clearActiveRun(api, 'other-run');
    expect(readActiveRun(api)).not.toBeNull();
    clearActiveRun(api, 'r1');
    expect(readActiveRun(api)).toBeNull();
    writeActiveRun(api, POINTER);
    clearActiveRun(api); // unconditional
    expect(readActiveRun(api)).toBeNull();
  });
});
