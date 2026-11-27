/** `run_graph_experiments`: see `../runtimeTools.ts` for the execution contract. */
import { executeExperiment } from '../runtimeTools';
import type { ToolDefinition } from './types';

export const runGraphExperimentsTool: ToolDefinition = {
  name: 'run_graph_experiments',
  description:
    `Run a bounded experiment study on canvas-isolated clones of the current graph, then rank candidates by a numeric backend metric. A user-facing confirmation is required before execution because graph nodes retain their normal side effects (for example file writes, network calls, or paid API usage). Candidate edits never touch the live canvas while running. Each variant has a label and a GraphOp operations array using the same exact fields as apply_graph_operations. Include an empty-operations baseline when useful. The metric can be an exact "node-id.port", a unique suffix such as "accuracy", a unique "NodeType.port", or "auto". direction is "maximize" or "minimize". Use repetitions >=3 for variance estimates (max 16 executions across the entire agent turn); concurrency defaults to 1 and is capped at 2 to protect GPU memory. Set apply_best=true only when the user asked to optimize/apply the winner; automatic promotion is parameter-only and is refused if they changed the live graph mid-study. Structural winners remain review-only summaries. The result includes rankings, observed metrics, warnings, and evidence-grounded paper follow-ups.`,
  input_schema: {
    type: 'object',
    properties: {
      hypothesis: { type: 'string' },
      objective: {
        type: 'object',
        properties: {
          metric: { type: 'string' },
          direction: { type: 'string', enum: ['maximize', 'minimize'] },
        },
        required: ['metric', 'direction'],
      },
      variants: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            label: { type: 'string' },
            operations: { type: 'array', items: { type: 'object' } },
          },
          required: ['label', 'operations'],
        },
      },
      repetitions: { type: 'integer', minimum: 1, maximum: 5 },
      concurrency: { type: 'integer', minimum: 1, maximum: 2 },
      timeout_minutes: {
        type: 'integer', minimum: 1, maximum: 60,
        description: 'Per-run wall-clock cap in minutes (default 10). Raise for training-process studies whose single runs are longer, e.g. small-LM ablations.',
      },
      apply_best: { type: 'boolean' },
    },
    required: ['hypothesis', 'objective', 'variants'],
  },
  group: 'experiment',
  readOnly: false,
  approval: () => ({ kind: 'experiment' }),
  execute: (_input, ctx) => executeExperiment(ctx.call, ctx),
};
