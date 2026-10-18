import { describe, expect, it, vi } from 'vitest';
import {
  clearActiveRun, clearUnidentifiedRun, readActiveRun, readActiveRunStrict, readUnidentifiedRun, readUnidentifiedRunStrict, writeActiveRun, writeUnidentifiedRun,
} from './runPointer';

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

  it('distinguishes unreadable persisted storage from an absent reservation and never clears it blindly', () => {
    const api = storageApi();
    const unknown = { submissionId: 'unknown-stored', reason: 'train', submittedAt: 123, timeoutMinutes: 360 };
    writeActiveRun(api, POINTER);
    writeUnidentifiedRun(api, unknown);
    const read = vi.spyOn(api.storage, 'get').mockImplementation(() => { throw new Error('storage unavailable'); });
    const remove = vi.spyOn(api.storage, 'remove');
    expect(() => readActiveRunStrict(api)).toThrow('storage unavailable');
    expect(() => readUnidentifiedRunStrict(api)).toThrow('storage unavailable');
    expect(readActiveRun(api)).toBeNull(); // UI compatibility; never used to authorize execution.
    expect(readUnidentifiedRun(api)).toBeNull();
    clearActiveRun(api, POINTER.runId);
    expect(clearUnidentifiedRun(api, unknown.submissionId)).toBe(false);
    expect(remove).not.toHaveBeenCalled();
    read.mockRestore();
    expect(readActiveRunStrict(api)).toEqual(POINTER);
    expect(readUnidentifiedRunStrict(api)).toEqual(unknown);
  });

  it('strictly rejects cold unreadable or corrupt storage while tolerant readers remain safe', () => {
    const api = storageApi();
    vi.spyOn(api.storage, 'get').mockImplementation(() => { throw new Error('storage unavailable'); });
    expect(() => readActiveRunStrict(api)).toThrow();
    expect(() => readUnidentifiedRunStrict(api)).toThrow();
    expect(readActiveRun(api)).toBeNull();
    expect(readUnidentifiedRun(api)).toBeNull();
    const corrupt = storageApi();
    corrupt.storage.set('active_run', 'bad json');
    corrupt.storage.set('unidentified_live_run', '{}');
    expect(() => readActiveRunStrict(corrupt)).toThrow();
    expect(() => readUnidentifiedRunStrict(corrupt)).toThrow();
  });

  it('retains known ownership on the same page when storage quota fails', () => {
    const api = storageApi();
    vi.spyOn(api.storage, 'set').mockImplementation(() => { throw new Error('quota'); });
    writeActiveRun(api, POINTER);
    expect(readActiveRun(api)).toEqual(POINTER);
    clearActiveRun(api, 'other');
    expect(readActiveRun(api)).toEqual(POINTER);
    clearActiveRun(api, POINTER.runId);
    expect(readActiveRun(api)).toBeNull();
  });

  it('persists unidentified submissions separately and releases only the matching recovery token', () => {
    const api = storageApi();
    const unknown = { submissionId: 'submission-1', reason: 'train', submittedAt: 456, timeoutMinutes: 360, device: 'cuda' };
    writeUnidentifiedRun(api, unknown);
    expect(readUnidentifiedRun(api)).toEqual(unknown);
    expect(readActiveRun(api)).toBeNull();
    expect(api.storage.get('unidentified_live_run')).not.toContain('runId');
    expect(clearUnidentifiedRun(api, 'stale-submission')).toBe(false);
    expect(readUnidentifiedRun(api)).toEqual(unknown);
    writeUnidentifiedRun(api, { ...unknown, submissionId: 'submission-2' });
    expect(clearUnidentifiedRun(api, 'submission-1')).toBe(false);
    expect(clearUnidentifiedRun(api, 'submission-2')).toBe(true);
    expect(readUnidentifiedRun(api)).toBeNull();
  });

  it('keeps an in-memory unknown reservation and user release when storage is unavailable', () => {
    const api = storageApi();
    const unknown = { submissionId: 'submission-quota', reason: 'train', submittedAt: 789, timeoutMinutes: 360 };
    vi.spyOn(api.storage, 'get').mockImplementation(() => { throw new Error('storage unavailable'); });
    vi.spyOn(api.storage, 'set').mockImplementation(() => { throw new Error('quota'); });
    vi.spyOn(api.storage, 'remove').mockImplementation(() => { throw new Error('storage unavailable'); });
    expect(readUnidentifiedRun(api)).toBeNull();
    writeUnidentifiedRun(api, unknown);
    expect(readUnidentifiedRun(api)).toEqual(unknown);
    expect(readUnidentifiedRun(storageApi())).toBeNull();
    expect(clearUnidentifiedRun(api, unknown.submissionId)).toBe(true);
    expect(readUnidentifiedRun(api)).toBeNull();
  });

  it('does not resurrect a known pointer when storage removal fails', () => {
    const api = storageApi();
    writeActiveRun(api, POINTER);
    vi.spyOn(api.storage, 'remove').mockImplementation(() => { throw new Error('storage unavailable'); });
    clearActiveRun(api, POINTER.runId);
    expect(readActiveRun(api)).toBeNull();
  });

  it('rejects malformed unknown records without fabricating a host identity', () => {
    const api = storageApi();
    for (const raw of ['bad json', '{}', '{"runId":"not-a-recovery-token"}', '{"submissionId":"x","submittedAt":"bad"}']) {
      api.storage.set('unidentified_live_run', raw);
      expect(readUnidentifiedRun(api)).toBeNull();
    }
  });
});
