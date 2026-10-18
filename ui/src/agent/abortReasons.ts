/** Identifies UI teardown; unlike explicit Stop, it must not cancel a server-owned run. */
export const PASSIVE_DETACH_REASON = Symbol('graph-copilot-passive-detach');

export function isPassiveDetach(signal?: AbortSignal): boolean {
  return signal?.aborted === true && signal.reason === PASSIVE_DETACH_REASON;
}
