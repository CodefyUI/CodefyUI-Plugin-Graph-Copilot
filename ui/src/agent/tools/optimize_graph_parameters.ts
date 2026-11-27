/** `optimize_graph_parameters`: see `../runtimeTools.ts` for the execution contract. */
import { executeOptimizer } from '../runtimeTools';
import type { ToolDefinition } from './types';

export const optimizeGraphParametersTool: ToolDefinition = {
  name: 'optimize_graph_parameters',
  description:
    `Compile and run a transparent, bounded parameter search on the current graph. Use this instead of manually inventing variants when the user asks to optimize existing numeric, boolean, or select parameters. Only existing-node int/float/bool/select parameters are accepted; secret, string, file, tensor, preset, and unknown parameters are refused. "grid" evaluates the complete Cartesian product and refuses to truncate it. "seeded_random" requires candidate_count and a uint32 seed; that seed makes candidate PLANNING repeatable but does NOT seed graph-node execution. Values must be explicit schema-valid domains. The compiler creates only set_params variants, optionally includes the current graph as baseline, and delegates to the same confirmation, 16-execution turn budget, isolated runner, and guarded promotion path as run_graph_experiments.`,
  input_schema: {
    type: 'object',
    properties: {
      version: { type: 'integer', enum: [1] },
      strategy: { type: 'string', enum: ['grid', 'seeded_random'] },
      hypothesis: { type: 'string' },
      objective: {
        type: 'object',
        properties: {
          metric: { type: 'string' },
          direction: { type: 'string', enum: ['maximize', 'minimize'] },
        },
        required: ['metric', 'direction'],
      },
      bindings: {
        type: 'array',
        minItems: 1,
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            node_id: { type: 'string' },
            param: { type: 'string' },
            values: { type: 'array', minItems: 1, maxItems: 32, items: {} },
          },
          required: ['node_id', 'param', 'values'],
        },
      },
      candidate_count: { type: 'integer', minimum: 1, maximum: 8 },
      seed: { type: 'integer', minimum: 0, maximum: 4294967295 },
      include_baseline: { type: 'boolean' },
      repetitions: { type: 'integer', minimum: 1, maximum: 5 },
      concurrency: { type: 'integer', minimum: 1, maximum: 2 },
      timeout_minutes: {
        type: 'integer', minimum: 1, maximum: 60,
        description: 'Per-run wall-clock cap in minutes (default 10). Raise for parameter searches over real training runs.',
      },
      apply_best: { type: 'boolean' },
    },
    required: ['strategy', 'hypothesis', 'objective', 'bindings'],
  },
  group: 'experiment',
  readOnly: false,
  approval: () => ({ kind: 'experiment' }),
  execute: (_input, ctx) => executeOptimizer(ctx.call, ctx),
};
