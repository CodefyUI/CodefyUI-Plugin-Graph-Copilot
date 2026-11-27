/** `get_run`: see `../runtimeTools.ts` for the execution contract. */
import { executeGetRun } from '../runtimeTools';
import type { ToolDefinition } from './types';

export const getRunTool: ToolDefinition = {
  name: 'get_run',
  description:
    'Fetch one run\'s server-side record by run_id: status, timing, error, final_metrics, and recorded artifacts (checkpoints etc.). This is the ground truth for "how did that run go" — report its numbers exactly; never reconstruct them from memory. Works for editor-started runs too.',
  input_schema: {
    type: 'object',
    properties: { run_id: { type: 'string' } },
    required: ['run_id'],
  },
  group: 'run',
  readOnly: true,
  execute: (_input, ctx) => executeGetRun(ctx.call, ctx),
};
