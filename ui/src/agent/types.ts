import type { ChatTurn } from '../state/conversations';

export type AgentMode = 'ask' | 'edit';
export type RunStatus = 'completed' | 'cancelled' | 'failed' | 'incomplete';
export type ToolOutcome = 'completed' | 'error' | 'cancelled' | 'not_executed' | 'unknown';
export type RunPhase = 'thinking' | 'tools' | 'validating' | 'awaiting_confirmation';

export interface ValidationReport {
  status: 'valid' | 'invalid' | 'unavailable' | 'not_run' | 'stale';
  errors: string[];
}

/** Local-only result metadata. Never sent as provider message content. */
export interface RunSummary {
  id: string;
  mode: AgentMode;
  status: RunStatus;
  reason?: string;
  message?: string;
  mutation: 'none' | 'applied' | 'unknown';
  mutationAttempted: boolean;
  /** Conservatively true before live/study runner dispatch, including external
   * execution and study persistence. Blocks automatic Retry independently of
   * whether the canvas changed. */
  sideEffectAttempted?: boolean;
  /** Host execution identity for history/reattach; separate from this turn id. */
  hostRunId?: string;
  appliedOps: number;
  failedOps: number;
  /** Failed operations a later edit in the same turn made good (the graph
   * validated afterwards). Absent when nothing was corrected. */
  correctedOps?: number;
  /** Host executions this turn dispatched; absent when none. */
  executions?: { runs: number; failedRuns: number; studies: number; runIds: string[] };
  /** R3: tool calls that found nothing or were refused before anything was
   * dispatched; they do not make the turn incomplete. */
  notedCalls?: number;
  /** Some dispatched execution has no known outcome (detached, stopped, lost). */
  executionUnknown?: boolean;
  validation: ValidationReport;
}

export interface TurnResult extends RunSummary {
  turns: ChatTurn[];
}

/** The full comparison snapshot stays inside the executor, not in UI state. */
export interface ClearGraphRequest {
  runId: string;
  toolCallId: string;
  nodeCount: number;
  edgeCount: number;
  /** Set by the loop's approval gate: which tab the action applies to. */
  target?: ApprovalTarget;
  /** A batch removing many nodes (SEC7) rather than clear_graph: how many. */
  removeNodes?: number;
  /** R2: nodes this turn already removed before this batch. */
  removedThisTurn?: number;
}

/** The graph an approval card's action applies to. The agent can open and
 * activate tabs without approval, so the card names the tab instead of
 * leaving the user to assume it is the one they were looking at. */
export interface ApprovalTarget {
  /** The active tab's title; null on a host without the workspace API. */
  tab: string | null;
  /** The saved graph or example the tab came from, when the host says. */
  graph: string | null;
  /** Copilot opened this tab during the current turn. */
  openedThisTurn: boolean;
}
