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
  appliedOps: number;
  failedOps: number;
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
}
