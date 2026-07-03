/**
 * Tests for turnStages — grouping flat ChatTurn lists into display items and
 * humanizing tool-call stages.
 */

import { describe, it, expect } from 'vitest';
import type { ChatTurn } from '../state/conversations';
import { groupTurns, describeStage } from './turnStages';

const applyCall = (id = 'tc1', ops: unknown = [{ op: 'add_node', node_type: 'Conv2d' }, { op: 'add_node', node_type: 'ReLU' }, { op: 'connect', source: 'a', source_handle: 'y', target: 'b', target_handle: 'x' }]) => ({
  id,
  name: 'apply_graph_operations',
  arguments: { operations: ops } as Record<string, unknown>,
});

describe('groupTurns', () => {
  it('folds tool result turns into the requesting assistant turn stages', () => {
    const turns: ChatTurn[] = [
      { role: 'user', content: 'build it' },
      { role: 'assistant', content: 'Working on it', tool_calls: [applyCall('tc1')] },
      { role: 'tool', content: '{"results":[]}', tool_call_id: 'tc1' },
      { role: 'assistant', content: 'Done' },
    ];

    const items = groupTurns(turns);
    expect(items).toHaveLength(3); // user, assistant(with stage), assistant
    expect(items[0].turn.role).toBe('user');
    expect(items[1].stages).toHaveLength(1);
    expect(items[1].stages[0].call.id).toBe('tc1');
    expect(items[1].stages[0].result?.content).toBe('{"results":[]}');
    expect(items[2].stages).toHaveLength(0);
  });

  it('marks stages without a matching tool turn as pending (no result)', () => {
    const turns: ChatTurn[] = [
      { role: 'assistant', content: '', tool_calls: [applyCall('tc1'), applyCall('tc2')] },
      { role: 'tool', content: 'r1', tool_call_id: 'tc1' },
    ];
    const items = groupTurns(turns);
    expect(items[0].stages[0].result?.content).toBe('r1');
    expect(items[0].stages[1].result).toBeUndefined();
  });

  it('ignores orphan tool turns and keys items by source index', () => {
    const turns: ChatTurn[] = [
      { role: 'tool', content: 'orphan', tool_call_id: 'zzz' },
      { role: 'user', content: 'hi' },
      { role: 'assistant', content: 'hello' },
    ];
    const items = groupTurns(turns);
    expect(items).toHaveLength(2);
    expect(items[0].key).toBe(1);
    expect(items[1].key).toBe(2);
  });

  it('matches tool results to the nearest preceding assistant turn by call id', () => {
    const turns: ChatTurn[] = [
      { role: 'assistant', content: '', tool_calls: [applyCall('a')] },
      { role: 'tool', content: 'first', tool_call_id: 'a' },
      { role: 'assistant', content: '', tool_calls: [applyCall('a')] }, // same id reused later
      { role: 'tool', content: 'second', tool_call_id: 'a' },
    ];
    const items = groupTurns(turns);
    expect(items[0].stages[0].result?.content).toBe('first');
    expect(items[1].stages[0].result?.content).toBe('second');
  });
});

describe('describeStage', () => {
  it('apply_graph_operations (running): op-kind counts, running status', () => {
    const d = describeStage({ call: applyCall() });
    expect(d.status).toBe('running');
    expect(d.label).toBe('Edit graph');
    expect(d.summary).toContain('add_node ×2');
    expect(d.summary).toContain('connect ×1');
  });

  it('apply_graph_operations (all ok): ok status and graph size', () => {
    const result: ChatTurn = {
      role: 'tool',
      tool_call_id: 'tc1',
      content: JSON.stringify({
        results: [
          { index: 0, ok: true }, { index: 1, ok: true }, { index: 2, ok: true },
        ],
        refs: {},
        node_count: 5,
        edge_count: 4,
      }),
    };
    const d = describeStage({ call: applyCall(), result });
    expect(d.status).toBe('ok');
    expect(d.summary).toContain('add_node ×2');
    expect(d.summary).toContain('5 nodes');
    expect(d.summary).toContain('4 edges');
  });

  it('apply_graph_operations (partial failure): error status and failed count', () => {
    const result: ChatTurn = {
      role: 'tool',
      tool_call_id: 'tc1',
      content: JSON.stringify({
        results: [{ index: 0, ok: true }, { index: 1, ok: false, error: 'bad port' }, { index: 2, ok: true }],
        refs: {}, node_count: 2, edge_count: 1,
      }),
    };
    const d = describeStage({ call: applyCall(), result });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('1 failed');
    expect(d.detail).toContain('bad port');
  });

  it('apply_graph_operations (top-level error): error status with message', () => {
    const result: ChatTurn = { role: 'tool', tool_call_id: 'tc1', content: JSON.stringify({ error: 'operations must be an array' }) };
    const d = describeStage({ call: applyCall('tc1', 'oops'), result });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('operations must be an array');
  });

  it('validate_graph: valid and invalid results', () => {
    const call = { id: 'v1', name: 'validate_graph', arguments: {} };
    const ok = describeStage({ call, result: { role: 'tool', tool_call_id: 'v1', content: '{"valid":true,"errors":[]}' } });
    expect(ok.label).toBe('Validate graph');
    expect(ok.status).toBe('ok');
    expect(ok.summary).toMatch(/runnable/i);

    const bad = describeStage({
      call,
      result: { role: 'tool', tool_call_id: 'v1', content: '{"valid":false,"errors":["missing input x","bad param"]}' },
    });
    expect(bad.status).toBe('error');
    expect(bad.summary).toContain('2 issue');
    expect(bad.detail).toContain('missing input x');
  });

  it('get_current_graph: node/edge counts from snapshot', () => {
    const call = { id: 'g1', name: 'get_current_graph', arguments: {} };
    const d = describeStage({
      call,
      result: { role: 'tool', tool_call_id: 'g1', content: '{"nodes":[1,2,3],"edges":[1]}' },
    });
    expect(d.label).toBe('Read graph');
    expect(d.status).toBe('ok');
    expect(d.summary).toContain('3 nodes');
    expect(d.summary).toContain('1 edge');
  });

  it('get_node_schemas: lists requested types', () => {
    const call = { id: 's1', name: 'get_node_schemas', arguments: { node_types: ['Conv2d', 'ReLU'] } };
    const running = describeStage({ call });
    expect(running.label).toBe('Node schemas');
    expect(running.summary).toContain('Conv2d');
    const done = describeStage({ call, result: { role: 'tool', tool_call_id: 's1', content: 'Conv2d: in[...]' } });
    expect(done.status).toBe('ok');
  });

  it('research: question count', () => {
    const call = { id: 'r1', name: 'research', arguments: { questions: ['a', 'b', 'c'] } };
    const running = describeStage({ call });
    expect(running.label).toBe('Research');
    expect(running.summary).toContain('3');
    const done = describeStage({ call, result: { role: 'tool', tool_call_id: 'r1', content: '[1] Q: a\nA: x' } });
    expect(done.status).toBe('ok');
  });

  it('unknown tool: falls back to raw name and tolerates non-JSON content', () => {
    const call = { id: 'u1', name: 'mystery_tool', arguments: {} };
    const d = describeStage({ call, result: { role: 'tool', tool_call_id: 'u1', content: 'plain text' } });
    expect(d.label).toBe('mystery_tool');
    expect(d.status).toBe('ok');
    expect(d.detail).toContain('plain text');
  });

  it('malformed arguments never throw', () => {
    const d = describeStage({ call: { id: 'x', name: 'apply_graph_operations', arguments: {} } });
    expect(d.status).toBe('running');
    expect(d.label).toBe('Edit graph');
  });
});
