/** The 2D panel pieces: tool rows, batching, the edit summary, the markdown
 * throttle, the agent state and the inline approval card. */
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import type { ChatTurn } from '../state/conversations';
import type { ToolStage } from './turnStages';
import { argSummary, firstLine, opsLine } from './turnStages';
import { MessageBubble, batchStages, useThrottledText } from './MessageBubble';
import { agentState, badgeFor } from './agentStatus';
import { ApprovalCard } from './ApprovalCard';

const stage = (name: string, id: string, result?: Partial<ChatTurn>, args: Record<string, unknown> = {}): ToolStage => ({
  call: { id, name, arguments: args },
  ...(result ? { result: { role: 'tool', tool_call_id: id, content: '{}', toolOutcome: 'completed', ...result } as ChatTurn } : {}),
} as ToolStage);

afterEach(() => vi.useRealTimers());

describe('tool rows', () => {
  it('summarises scalar arguments as k=v and names nested values', () => {
    expect(argSummary({ path: 'src/a.py', limit: 5, all: false, files: ['a', 'b'], opts: { x: 1 } }))
      .toBe('path=src/a.py limit=5 all=false files=[2] opts={…}');
    expect(argSummary({ text: 'x'.repeat(200) }).length).toBeLessThanOrEqual(90);
  });

  it('describes an edit in one line', () => {
    expect(opsLine({ operations: [{ op: 'add_node' }, { op: 'add_node' }, { op: 'add_node' }, { op: 'connect' },
      { op: 'connect' }, { op: 'connect' }, { op: 'connect' }, { op: 'set_params' }] })).toBe('+3 nodes · +4 edges · 1 param');
    expect(opsLine({})).toBe('');
  });

  it('shows only the first line of an error', () => {
    expect(firstLine('\n  Boom: bad input\nTraceback ...')).toBe('Boom: bad input');
    const turn: ChatTurn = { role: 'assistant', content: '', tool_calls: [] };
    render(<MessageBubble turn={turn} stages={[stage('project_diff', 'd1', { content: JSON.stringify({ error: 'Refused: .env\nmore detail' }), toolOutcome: 'error' })]} />);
    expect(screen.getByText('Refused: .env')).toBeInTheDocument();
    expect(screen.queryByText(/more detail/)).toBeNull();
  });

  it('marks each outcome with a glyph and the tool name in mono', () => {
    const turn: ChatTurn = { role: 'assistant', content: '', tool_calls: [] };
    const { container } = render(<MessageBubble turn={turn} stages={[stage('project_status', 's1', {})]} />);
    expect(container.querySelector('.gcp-stage-status')).toHaveTextContent('✓');
    expect(container.querySelector('code.gcp-stage-name')).toHaveTextContent('project_status');
  });

  it('folds three or more ordinary calls in a row, but never edits, runs or commits', () => {
    const reads = [stage('list_tabs', 'a', {}), stage('project_status', 'b', {}), stage('project_log', 'c', {})];
    const edit = stage('apply_graph_operations', 'e', {});
    const batched = batchStages([...reads, edit, reads[0], reads[1]]);
    expect(batched).toHaveLength(4);
    expect(Array.isArray(batched[0]) && batched[0]).toHaveLength(3);
    expect(batched[1]).toBe(edit);
    expect(Array.isArray(batched[2])).toBe(false);

    const turn: ChatTurn = { role: 'assistant', content: '', tool_calls: [] };
    render(<MessageBubble turn={turn} stages={reads} />);
    const batch = screen.getByRole('button', { name: /^3 tool calls/ });
    expect(batch).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(batch);
    expect(screen.getAllByRole('button', { name: /^(List tabs|Project status|Project log)/ })).toHaveLength(3);
  });
});

describe('markdown throttle', () => {
  it('re-renders live text at most every 80ms and always lands the last chunk', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000);
    const { result, rerender } = renderHook(({ text, live }) => useThrottledText(text, live), { initialProps: { text: 'a', live: true } });
    expect(result.current).toBe('a');
    rerender({ text: 'ab', live: true });
    expect(result.current).toBe('a');
    act(() => { vi.advanceTimersByTime(40); });
    rerender({ text: 'abc', live: true });
    expect(result.current).toBe('a');
    act(() => { vi.advanceTimersByTime(40); });
    expect(result.current).toBe('abc');
    rerender({ text: 'abcd', live: false });
    expect(result.current).toBe('abcd');
  });
});

describe('agent state', () => {
  it('orders needs you > done > working > idle and maps badges', () => {
    expect(agentState({ busy: true, needsApproval: true, providerMissing: false, unseenDone: true })).toBe('needs_you');
    expect(agentState({ busy: true, needsApproval: false, providerMissing: false, unseenDone: true })).toBe('done');
    expect(agentState({ busy: true, needsApproval: false, providerMissing: false, unseenDone: false })).toBe('working');
    expect(agentState({ busy: false, needsApproval: false, providerMissing: false, unseenDone: false })).toBe('idle');
    expect(agentState({ busy: false, needsApproval: false, providerMissing: true, unseenDone: false })).toBe('needs_you');
    expect([badgeFor('needs_you'), badgeFor('working'), badgeFor('done'), badgeFor('idle')]).toEqual(['attention', 'working', 'done', null]);
  });
});

describe('ApprovalCard', () => {
  it('sits in the flow as a labelled group, focuses Cancel, decides once, and cancels on Escape', () => {
    const onDecide = vi.fn();
    render(<ApprovalCard title="Commit 2 files?" confirmLabel="Commit 2 files" cancelLabel="Cancel" onDecide={onDecide}><p>body</p></ApprovalCard>);
    const card = screen.getByRole('group', { name: 'Commit 2 files?' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveFocus();
    fireEvent.keyDown(card, { key: 'Escape' });
    fireEvent.click(screen.getByRole('button', { name: 'Commit 2 files' }));
    expect(onDecide).toHaveBeenCalledTimes(1);
    expect(onDecide).toHaveBeenCalledWith(false);
  });

  it('uses the danger button for destructive actions and does not take focus while hidden', () => {
    render(<ApprovalCard danger active={false} title="Clear the current graph?" confirmLabel="Clear graph" cancelLabel="Keep graph" onDecide={() => {}}><p>x</p></ApprovalCard>);
    expect(screen.getByRole('button', { name: 'Clear graph' })).toHaveClass('gcp-danger-btn');
    expect(screen.getByRole('button', { name: 'Keep graph' })).not.toHaveFocus();
  });
});
