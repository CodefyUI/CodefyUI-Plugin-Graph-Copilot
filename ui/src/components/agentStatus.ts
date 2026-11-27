/** The agent's state as the panel header and the toolbar badge show it.
 * Priority: needs you > done > working > idle. */
import type { PluginPanelBadge } from '../types/codefyui';

export type AgentState = 'needs_you' | 'done' | 'working' | 'idle';

/** What the conversation view reports up to the window. */
export interface AgentActivity {
  busy: boolean;
  /** An approval card is waiting for the user. */
  needsApproval: boolean;
  /** The conversation is scrolled to its end (the user can see the result). */
  atBottom: boolean;
  /** Increments each time a turn ends. */
  finishedRun: number;
}

export function agentState(input: { busy: boolean; needsApproval: boolean; providerMissing: boolean; unseenDone: boolean }): AgentState {
  if (input.needsApproval || input.providerMissing) return 'needs_you';
  if (input.unseenDone) return 'done';
  if (input.busy) return 'working';
  return 'idle';
}

export function badgeFor(state: AgentState): PluginPanelBadge | null {
  return state === 'needs_you' ? 'attention' : state === 'working' ? 'working' : state === 'done' ? 'done' : null;
}
