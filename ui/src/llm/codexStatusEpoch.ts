/**
 * Process-local generation shared by every Codex status reader.
 *
 * Login/logout actions invalidate responses that were already in flight, so
 * an older status snapshot cannot restore stale UI state after a newer action.
 */
let generation = 0;
let requestSequence = 0;
let pending: {
  generation: number;
  sequence: number;
  promise: Promise<unknown>;
} | null = null;

export function codexStatusGeneration(): number {
  return generation;
}

export function invalidateCodexStatusGeneration(): number {
  generation += 1;
  requestSequence += 1;
  pending = null;
  return generation;
}

export function isCurrentCodexStatusGeneration(candidate: number): boolean {
  return candidate === generation;
}

/**
 * Share one in-flight status read across CopilotApp and SettingsView. A newer
 * read or auth action supersedes older snapshots before callers may apply them.
 */
export async function coordinatedCodexStatus<T>(reader: () => Promise<T>): Promise<T | null> {
  const requestGeneration = generation;
  let request = pending;
  if (request === null || request.generation !== requestGeneration) {
    request = {
      generation: requestGeneration,
      sequence: ++requestSequence,
      promise: Promise.resolve().then(reader),
    };
    pending = request;
  }

  try {
    const result = await request.promise as T;
    return request.generation === generation && request.sequence === requestSequence
      ? result
      : null;
  } finally {
    if (pending === request) pending = null;
  }
}
