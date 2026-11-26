/** `list_runs`: see `../runtimeTools.ts` for the execution contract. */
import { executeListRuns } from '../runtimeTools';
import type { ToolDefinition } from './types';

export const listRunsTool: ToolDefinition = {
  name: 'list_runs',
  description:
    'List recent graph runs on the CodefyUI host, newest first — INCLUDING runs the user started from the editor\'s own Run button. Each row: run_id, name, status (queued|running|succeeded|failed|cancelled|interrupted), queue_position (when queued), created_at, duration_s, error, and final_metrics (the last value of every metric series the run recorded, e.g. val_loss). Use this when asked what ran recently, whether something is still running, or which run to inspect; then use get_run for one run\'s detail. Requires a host with server-owned runs.',
  input_schema: {
    type: 'object',
    properties: {
      limit: { type: 'integer', minimum: 1, maximum: 20, description: 'Rows to return (default 10).' },
      active_only: { type: 'boolean', description: 'Only queued/running runs.' },
    },
  },
  group: 'run',
  readOnly: true,
  execute: (_input, ctx) => executeListRuns(ctx.call, ctx),
};
