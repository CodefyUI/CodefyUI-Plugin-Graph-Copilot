/** `run_graph`: see `../runtimeTools.ts` for the execution contract. */
import { executeRunGraph } from '../runtimeTools';
import type { ToolDefinition } from './types';

export const runGraphTool: ToolDefinition = {
  name: 'run_graph',
  description:
    `Execute the CURRENT canvas graph on the CodefyUI backend — the user's real run, with real side effects (file writes, network calls, GPU time). The editor shows the user an approval card before it starts; that card is the confirmation, so call this tool instead of asking in prose. Call this AFTER validate_graph reports "valid": true, when the user asked to run, train, or evaluate their graph. Node statuses and live training progress (loss, epochs) stream to the panel while it runs; long training runs are expected and fine — do not cancel or restart one without being asked. Returns the final status, per-node scalar/string outputs, last progress values, metric tails, any node errors, and a "media" list when the run produced renderable artifacts (VideoWrite clips, image previews) — each entry is a reference {node, port, kind, format, url?, frames?, bytes?}; the clip itself plays inline in the panel, and you should mention it and its url in your report. Use run_graph for "run it / train it"; use run_graph_experiments only for comparing variants.`,
  input_schema: {
    type: 'object',
    properties: {
      reason: {
        type: 'string',
        description: 'One short sentence shown in the user confirmation: what this run does and why.',
      },
      timeout_minutes: {
        type: 'integer',
        minimum: 1,
        maximum: 720,
        description: 'Optional wall-clock cap in minutes (default 360). Pick generously for training runs.',
      },
      device: {
        type: 'string',
        enum: ['cpu', 'cuda', 'mps'],
        description: 'Optional run-level compute device (what device="auto" nodes follow). Defaults to the host\'s preferred device — set this only when the user asked for a specific one.',
      },
    },
    required: ['reason'],
  },
  group: 'run',
  readOnly: false,
  approval: () => ({ kind: 'run_graph' }),
  execute: (_input, ctx) => executeRunGraph(ctx.call, ctx),
};
