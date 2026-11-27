/**
 * U4: a tool row says what has actually happened. Waiting on an approval card
 * is "Waiting for your approval", a declined card is "Not executed", and only
 * a completed call uses the past tense. Checked for every approval tool.
 */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import type { ChatTurn } from '../state/conversations';
import type { ToolStage } from './turnStages';
import { describeStage } from './turnStages';
import { MessageBubble } from './MessageBubble';

const PAST = /\b(cleared|removed|applied|committed|ran|ranked first|complete)\b/i;

interface Case {
  name: string;
  args: Record<string, unknown>;
  declined: string;
  stale?: string;
  completed: string;
}

const CASES: Case[] = [
  {
    name: 'apply clear',
    args: { operations: [{ op: 'clear_graph' }] },
    declined: JSON.stringify({ outcome: 'cancelled', error: 'The user declined clearing the graph. The run ended; do not bypass this decision.' }),
    completed: JSON.stringify({ valid: true, results: [{ index: 0, ok: true }] }),
  },
  {
    name: 'apply mass removal',
    args: { operations: Array.from({ length: 12 }, (_, i) => ({ op: 'remove_node', node_id: `n${i}` })) },
    declined: JSON.stringify({ outcome: 'cancelled', error: 'The user declined removing 12 nodes. The run ended; do not remove them another way.' }),
    completed: JSON.stringify({ valid: true, results: Array.from({ length: 12 }, (_, index) => ({ index, ok: true })) }),
  },
  {
    name: 'run_graph',
    args: { reason: 'smoke test' },
    declined: JSON.stringify({ cancelled: true, error: 'The run was not approved by the user.' }),
    stale: JSON.stringify({ cancelled: true, replan: true, error: 'The graph changed during execution bootstrap or connection; re-read, re-validate, and request approval again.' }),
    completed: JSON.stringify({ status: 'complete', completedNodes: 3, totalNodes: 3 }),
  },
  {
    name: 'run_graph_experiments',
    args: { variants: [{ id: 'a' }, { id: 'b' }], repetitions: 1 },
    declined: JSON.stringify({ cancelled: true, error: 'Experiment execution was not approved by the user.' }),
    stale: JSON.stringify({ cancelled: true, replan: true, error: 'The active graph changed while execution approval was open. Re-read the graph and propose the study again.' }),
    completed: JSON.stringify({ winnerLabel: 'a', appliedVariantId: 'a' }),
  },
  {
    name: 'optimize_graph_parameters',
    args: { strategy: 'grid', bindings: [{ node: 'n', param: 'lr' }] },
    declined: JSON.stringify({ cancelled: true, error: 'Experiment execution was not approved by the user.' }),
    completed: JSON.stringify({ winnerLabel: 'lr=0.1' }),
  },
  {
    name: 'project_commit',
    args: { message: 'docs', paths: ['README.md'] },
    declined: JSON.stringify({ cancelled: true, error: 'The user did not approve this commit. Nothing was staged or committed.' }),
    stale: JSON.stringify({ cancelled: true, replan: true, error: 'The project changed while the approval was open. Nothing was committed; read project_status again.' }),
    completed: JSON.stringify({ committed: true, commit: 'abc1234', files: ['README.md'], pushed: false }),
  },
];

const toolName = (c: Case) => c.name.startsWith('apply') ? 'apply_graph_operations' : c.name;
const stageOf = (c: Case, result?: ChatTurn): ToolStage => ({ call: { id: 'c1', name: toolName(c), arguments: c.args }, result });
const tool = (content: string, toolOutcome: ChatTurn['toolOutcome']): ChatTurn => ({ role: 'tool', tool_call_id: 'c1', content, toolOutcome });

function rowText(stage: ToolStage, awaiting: boolean): string {
  const turn: ChatTurn = { role: 'assistant', content: '', tool_calls: [stage.call] };
  const { container, unmount } = render(<MessageBubble turn={turn} stages={[stage]} active awaiting={awaiting} />);
  const text = [...container.querySelectorAll('.gcp-stage-summary, .gcp-stage-ops')].map((n) => n.textContent).join(' | ');
  unmount();
  return text;
}

describe('U4: tool rows use the tense of what happened', () => {
  for (const c of CASES) {
    it(`${c.name}: waiting for approval says so and claims no effect`, () => {
      const d = describeStage(stageOf(c), true, true);
      expect(d.status).toBe('waiting');
      expect(d.summary).toBe('Waiting for your approval');
      const text = rowText(stageOf(c), true);
      expect(text).toContain('Waiting for your approval');
      expect(text).not.toMatch(PAST);
    });

    it(`${c.name}: a declined card is "Not executed"`, () => {
      const stage = stageOf(c, tool(c.declined, 'cancelled'));
      const d = describeStage(stage, false);
      expect(d.status).toBe('not_executed');
      expect(d.summary).toBe('Not executed: you declined it');
      expect(rowText(stage, false)).not.toMatch(PAST);
    });

    if (c.stale) {
      it(`${c.name}: an approval that went out of date is "Not executed"`, () => {
        const d = describeStage(stageOf(c, tool(c.stale!, 'cancelled')), false);
        expect(d.status).toBe('not_executed');
        expect(d.summary).toMatch(/^Not executed/);
      });
    }

    it(`${c.name}: only a completed call is described in the past tense`, () => {
      const stage = stageOf(c, tool(c.completed, 'completed'));
      expect(describeStage(stage, false).status).toBe('ok');
      expect(rowText(stage, false)).toMatch(PAST);
    });
  }

  it('a running tool that does not need approval is not marked as waiting', () => {
    const d = describeStage({ call: { id: 'g', name: 'get_current_graph', arguments: {} } }, true, true);
    expect(d.status).toBe('running');
  });

  it('a user Stop is still "Stopped", not "Not executed"', () => {
    const d = describeStage(stageOf(CASES[2], tool(JSON.stringify({ cancelled: true, error: 'Stopped by the user.' }), 'cancelled')), false);
    expect(d.status).toBe('cancelled');
    expect(d.summary).toBe('Stopped');
  });
});
