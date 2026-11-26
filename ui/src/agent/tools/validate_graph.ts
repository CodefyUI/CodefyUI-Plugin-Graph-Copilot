import { RunExit } from '../runExit';
import { throwIfAborted } from '../toolGuards';
import type { ToolDefinition } from './types';

export const validateGraphTool: ToolDefinition = {
  name: 'validate_graph',
  description: 'Read-only structural validation: checks unknown types, missing required inputs, and out-of-range params. Returns {valid, errors, status}; status valid/invalid/unavailable/stale. Validation does not execute the graph or prove runtime success. Never repair unavailable or stale results.',
  input_schema: { type: 'object', properties: {} },
  group: 'graph',
  readOnly: true,
  async execute(_input, ctx) {
    const { turn, signal } = ctx;
    ctx.phase('validating');
    throwIfAborted(signal);
    if (turn.lastMutationSnapshot !== undefined && turn.currentSnapshot() !== turn.lastMutationSnapshot) turn.stale();
    const report = await ctx.validate();
    throwIfAborted(signal);
    turn.summary.validation = { status: report.status, errors: report.errors };
    ctx.record(JSON.stringify(report), report.status === 'unavailable' || report.status === 'stale' ? 'error' : 'completed');
    if (report.status === 'stale' || (turn.lastMutationSnapshot !== undefined && turn.currentSnapshot() !== turn.lastMutationSnapshot)) turn.stale();
    if (report.status === 'invalid' && turn.summary.appliedOps > 0 && ctx.mode === 'edit') {
      // An explicit invalid tool result authorizes no broader repairs than an
      // automatic nudge, including later tools in this same assistant group.
      turn.repairSnapshot = turn.currentSnapshot();
    }
    if (report.status === 'unavailable') {
      ctx.markIssue();
      if (turn.summary.appliedOps > 0) throw new RunExit('incomplete', 'validation_unavailable', 'Structural validation is unavailable. No automatic repair was attempted.');
    }
    ctx.phase('tools');
  },
};
