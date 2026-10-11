import { describe, expect, it, vi } from 'vitest';

import {
  coordinatedCodexStatus,
  invalidateCodexStatusGeneration,
  codexStatusGeneration,
  beginCodexLogout,
  finishCodexLogout,
} from './codexStatusEpoch';

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('Codex status coordination', () => {
  it('shares one in-flight snapshot across status owners', async () => {
    invalidateCodexStatusGeneration();
    const status = deferred<{ status: string }>();
    const reader = vi.fn(() => status.promise);

    const app = coordinatedCodexStatus(reader);
    const settings = coordinatedCodexStatus(reader);
    status.resolve({ status: 'logged_in' });

    await expect(app).resolves.toEqual({ status: 'logged_in' });
    await expect(settings).resolves.toEqual({ status: 'logged_in' });
    expect(reader).toHaveBeenCalledTimes(1);
  });

  it('drops an in-flight snapshot after an auth action invalidates it', async () => {
    invalidateCodexStatusGeneration();
    const status = deferred<{ status: string }>();
    const pendingRead = coordinatedCodexStatus(() => status.promise);

    invalidateCodexStatusGeneration();
    status.resolve({ status: 'logged_in' });

    await expect(pendingRead).resolves.toBeNull();
  });

  it('blocks all status owners while logout is pending, then permits fresh reads', async () => {
    invalidateCodexStatusGeneration();
    const epoch = beginCodexLogout();
    const reader = vi.fn(async () => ({ status: 'logged_in' }));

    await expect(coordinatedCodexStatus(reader)).resolves.toBeNull();
    await expect(coordinatedCodexStatus(reader)).resolves.toBeNull();
    expect(reader).not.toHaveBeenCalled();
    expect(codexStatusGeneration()).toBe(epoch);

    finishCodexLogout(epoch);
    expect(codexStatusGeneration()).toBeGreaterThan(epoch);
    await expect(coordinatedCodexStatus(reader)).resolves.toEqual({ status: 'logged_in' });
    expect(reader).toHaveBeenCalledOnce();
    const finished = codexStatusGeneration();
    finishCodexLogout(epoch);
    expect(codexStatusGeneration()).toBe(finished);
  });

  it('discards a pre-logout read even when the server resolves logged_in after logout starts', async () => {
    invalidateCodexStatusGeneration();
    const status = deferred<{ status: string }>();
    const pendingRead = coordinatedCodexStatus(() => status.promise);
    const epoch = beginCodexLogout();
    status.resolve({ status: 'logged_in' });
    await expect(pendingRead).resolves.toBeNull();
    finishCodexLogout(epoch);
  });

  it('lets a newer auth action supersede pending logout without its old completion revoking login', async () => {
    invalidateCodexStatusGeneration();
    const epoch = beginCodexLogout();
    const loginEpoch = invalidateCodexStatusGeneration();
    const status = deferred<{ status: string }>();
    const reader = vi.fn(() => status.promise);
    const first = coordinatedCodexStatus(reader);
    const second = coordinatedCodexStatus(reader);
    await Promise.resolve();

    finishCodexLogout(epoch);
    expect(codexStatusGeneration()).toBe(loginEpoch);
    status.resolve({ status: 'logged_in' });
    await expect(first).resolves.toEqual({ status: 'logged_in' });
    await expect(second).resolves.toEqual({ status: 'logged_in' });
    expect(reader).toHaveBeenCalledOnce();
  });

  it('does not let an older logout completion release the block for a newer logout', async () => {
    invalidateCodexStatusGeneration();
    const oldEpoch = beginCodexLogout();
    const latestEpoch = beginCodexLogout();
    const reader = vi.fn(async () => ({ status: 'logged_in' }));
    finishCodexLogout(oldEpoch);
    expect(codexStatusGeneration()).toBe(latestEpoch);
    await expect(coordinatedCodexStatus(reader)).resolves.toBeNull();
    expect(reader).not.toHaveBeenCalled();
    finishCodexLogout(latestEpoch);
    await expect(coordinatedCodexStatus(reader)).resolves.toEqual({ status: 'logged_in' });
  });
});
