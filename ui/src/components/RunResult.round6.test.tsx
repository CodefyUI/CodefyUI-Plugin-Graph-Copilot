/** P4: the turn summary says what was corrected and what ran; the caution
 * about repeating host actions is only for outcomes that are not known. */
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { RunSummary } from '../agent/types';
import { RunResult } from './RunResult';
import { describeStage } from './turnStages';

function summary(overrides: Partial<RunSummary> = {}): RunSummary {
  return {
    id: 'run', mode: 'edit', status: 'completed', mutation: 'none', mutationAttempted: false,
    appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] }, ...overrides,
  };
}

afterEach(() => { document.documentElement.lang = 'en'; });

describe('RunResult after round 6', () => {
  it('a corrected failure reads as completed with a note, not as an open failure', () => {
    const { container } = render(<RunResult summary={summary({
      mutation: 'applied', mutationAttempted: true, appliedOps: 6, failedOps: 1, correctedOps: 1, validation: { status: 'valid', errors: [] },
    })} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('1 operation failed and was corrected later in this run')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/1 operation failed ·|not corrected/);
  });

  it('a successful run says what ran instead of the caution', () => {
    const { container } = render(<RunResult summary={summary({
      sideEffectAttempted: true, hostRunId: 'run-7', executionUnknown: false, executions: { runs: 1, failedRuns: 0, studies: 0, runIds: ['run-7'] },
    })} />);
    expect(screen.getByText('Ran the graph once')).toBeInTheDocument();
    expect(screen.getByText('Host run: run-7')).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/host action was attempted/i);
  });

  it('lists several runs, how many failed, and studies', () => {
    render(<RunResult summary={summary({
      status: 'incomplete', reason: 'execution_failed', sideEffectAttempted: true, hostRunId: 'b', executionUnknown: false,
      executions: { runs: 2, failedRuns: 1, studies: 1, runIds: ['a', 'b'] },
    })} />);
    expect(screen.getByText('Ran the graph 2 times (1 of them failed) · Ran 1 study')).toBeInTheDocument();
    expect(screen.getByText('Host runs: a, b')).toBeInTheDocument();
    expect(screen.getByText(/error went back to Copilot/)).toBeInTheDocument();
  });

  it('keeps the caution when an outcome is unknown, and for summaries saved before 0.6.0', () => {
    const { unmount } = render(<RunResult summary={summary({
      status: 'incomplete', reason: 'execution_unknown', sideEffectAttempted: true, executionUnknown: true,
      executions: { runs: 1, failedRuns: 0, studies: 0, runIds: [] },
    })} />);
    expect(screen.getByText(/host action was attempted/i)).toBeInTheDocument();
    unmount();
    render(<RunResult summary={summary({ sideEffectAttempted: true })} />);
    expect(screen.getByText(/host action was attempted/i)).toBeInTheDocument();
  });

  it('has zh-TW text for the new lines', () => {
    document.documentElement.lang = 'zh-TW';
    render(<RunResult summary={summary({
      mutation: 'applied', mutationAttempted: true, appliedOps: 2, failedOps: 1, correctedOps: 1,
      sideEffectAttempted: true, executionUnknown: false, executions: { runs: 1, failedRuns: 0, studies: 0, runIds: ['r'] },
    })} />);
    expect(screen.getByText('1 個操作失敗後已在這一回合修正')).toBeInTheDocument();
    expect(screen.getByText('執行了 1 次')).toBeInTheDocument();
  });
});

describe('a truncated tool error is whole when expanded', () => {
  it('puts the full error first in the detail', () => {
    const long = `CSVReader: file not found at /project/data/samples/digits.csv. Looked in: ${'x/'.repeat(80)}end-of-message`;
    const content = JSON.stringify({ status: 'error', error: long, outputs: { big: 'y'.repeat(5000) } });
    const d = describeStage({ call: { id: 'r', name: 'run_graph', arguments: {} }, result: { role: 'tool', content, toolOutcome: 'error' } });
    expect(d.summary.length).toBeLessThanOrEqual(120);
    expect(d.detail?.startsWith(long)).toBe(true);
    expect(d.detail).toContain('end-of-message');
  });
  it('leaves a short error as it was', () => {
    const content = JSON.stringify({ error: 'short' });
    const d = describeStage({ call: { id: 'r', name: 'list_runs', arguments: {} }, result: { role: 'tool', content, toolOutcome: 'error' } });
    expect(d.detail?.startsWith('{')).toBe(true);
  });
});

describe('R2 (B): a partly failed batch says how many failed and the first error', () => {
  const ops = Array.from({ length: 12 }, (_, index) => (index === 7
    ? { op: 'connect', source: 'py', source_handle: 'out2', target: 'b', target_handle: 'x' }
    : { op: 'add_node', node_type: 'Test' }));
  const receipt = JSON.stringify({
    results: ops.map((_, index) => (index === 7 ? { index, ok: false, error: "PythonScript has no output 'out2'; outputs: out1" } : { index, ok: true })),
    refs: {}, node_count: 11, edge_count: 0,
  });
  const stage = { call: { id: 'a', name: 'apply_graph_operations', arguments: { operations: ops } }, result: { role: 'tool' as const, content: receipt, toolOutcome: 'error' as const } };
  it('in English', () => {
    const d = describeStage(stage);
    expect(d.status).toBe('error');
    expect(d.summary).toBe("1 of 12 operations failed: connect: PythonScript has no output 'out2'; outputs: out1");
  });
  it('in Traditional Chinese', () => {
    document.documentElement.lang = 'zh-TW';
    expect(describeStage(stage).summary).toBe("12 個操作中有 1 個失敗：connect: PythonScript has no output 'out2'; outputs: out1");
  });
  it('a refused batch with an error message keeps that message', () => {
    const d = describeStage({ ...stage, result: { ...stage.result, content: JSON.stringify({ error: 'Malformed batch' }) } });
    expect(d.summary).toBe('Malformed batch');
  });
});
