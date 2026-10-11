import type { GraphReceipt, SampleGraph } from './graph';
import type { MockRequest, PendingResponse } from './http';
import type { ScenarioId } from './scenarios';

export interface PreviewSnapshot {
  ready: boolean;
  scenario: ScenarioId;
  entry: 'source' | 'bundle';
  manual: boolean;
  graph: SampleGraph;
  revision: number;
  receipts: GraphReceipt[];
  requests: MockRequest[];
  pending: PendingResponse[];
  blocked: string[];
  conversations: unknown[];
  widgets: string[];
}

export interface PreviewControl {
  snapshot(): PreviewSnapshot;
  releaseNext(): boolean;
}

declare global {
  const __PREVIEW_BUNDLE_URL__: string;
  interface Window { __graphCopilotPreview: PreviewControl }
}
