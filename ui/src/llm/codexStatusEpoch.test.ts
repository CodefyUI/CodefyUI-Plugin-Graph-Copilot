import { describe, expect, it, vi } from 'vitest';

import {
  coordinatedCodexStatus,
  invalidateCodexStatusGeneration,
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
});
