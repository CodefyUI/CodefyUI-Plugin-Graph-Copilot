import type { RunStatus } from './types';

/** Ends a turn with a recorded status; thrown by the loop and by tools. */
export class RunExit extends Error {
  constructor(public status: RunStatus, public reason: string, public message: string, public reportError?: string) { super(message); }
}
