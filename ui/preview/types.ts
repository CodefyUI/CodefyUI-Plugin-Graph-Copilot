import type { GraphReceipt, SampleGraph } from './graph';
import type { MockRequest, PendingResponse } from './http';
import type { MockExecution } from './execution';
import type { ScenarioId } from './scenarios';

export interface PreviewSnapshot {
  ready: boolean;
  scenario: ScenarioId;
  entry: 'source' | 'bundle';
  manual: boolean;
  serverOwned: boolean;
  lateInitialId: boolean;
  unreadableRunHistory: boolean;
  hostVersion: number;
  /** Round 6: what the v7 saveGraph mock wrote. */
  savedGraphs?: Array<{ name: string; overwrite: boolean }>;
  skills: Array<{ id: string; enabled: boolean }> | null;
  graph: SampleGraph;
  revision: number;
  receipts: GraphReceipt[];
  requests: MockRequest[];
  pending: PendingResponse[];
  runEventPolls: PendingResponse[];
  blocked: string[];
  executions: MockExecution[];
  executionPending: number;
  activeRun: unknown;
  conversations: unknown[];
  experimentSessions: unknown[];
  widgets: string[];
  panels: Array<{ id: string; open: boolean; badge: string | null }>;
  tabs: Array<{ title: string }>;
}

export interface PreviewControl {
  snapshot(): PreviewSnapshot;
  releaseNext(): boolean;
  releaseExecution(): boolean;
}

declare global {
  const __PREVIEW_BUNDLE_URL__: string;
  interface Window { __graphCopilotPreview: PreviewControl }
}
