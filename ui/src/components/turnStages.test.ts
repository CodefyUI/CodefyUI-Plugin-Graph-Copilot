/**
 * Tests for turnStages — grouping flat ChatTurn lists into display items and
 * humanizing tool-call stages.
 */

import { describe, it, expect } from 'vitest';
import type { ChatTurn } from '../state/conversations';
import { groupTurns, describeStage, formatDuration } from './turnStages';

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

  it('does not match a receipt from a different run to an older call with the same id', () => {
    const items = groupTurns([
      { role: 'assistant', content: '', runId: 'old', tool_calls: [applyCall('same')] },
      { role: 'tool', content: 'wrong run', runId: 'new', tool_call_id: 'same' },
    ]);
    expect(items[0].stages[0].result).toBeUndefined();
  });

  it('keeps run-scoped receipts separate from legacy pending calls', () => {
    const items = groupTurns([
      { role: 'assistant', content: '', tool_calls: [applyCall('same')] },
      { role: 'tool', content: 'new receipt', runId: 'new', tool_call_id: 'same' },
      { role: 'assistant', content: '', runId: 'new', tool_calls: [applyCall('other')] },
      { role: 'tool', content: 'legacy receipt', tool_call_id: 'other' },
    ]);
    expect(items[0].stages[0].result).toBeUndefined();
    expect(items[1].stages[0].result).toBeUndefined();
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

  it('numbers tool-calling rounds as steps, resetting at each user turn', () => {
    const turns: ChatTurn[] = [
      { role: 'user', content: 'build it' },
      { role: 'assistant', content: 'plan', tool_calls: [applyCall('a')] },
      { role: 'tool', content: 'r', tool_call_id: 'a' },
      { role: 'assistant', content: 'more', tool_calls: [applyCall('b')] },
      { role: 'tool', content: 'r', tool_call_id: 'b' },
      { role: 'assistant', content: 'done' }, // plain reply: no step
      { role: 'user', content: 'again' },
      { role: 'assistant', content: '', tool_calls: [applyCall('c')] },
    ];
    const items = groupTurns(turns);
    expect(items[0].step).toBeUndefined(); // user
    expect(items[1].step).toBe(1);
    expect(items[2].step).toBe(2);
    expect(items[3].step).toBeUndefined(); // final reply
    expect(items[4].step).toBeUndefined(); // user
    expect(items[5].step).toBe(1); // counter reset
  });
});

describe('formatDuration', () => {
  it('formats sub-10s durations with one decimal', () => {
    expect(formatDuration(437)).toBe('0.4s');
    expect(formatDuration(9_940)).toBe('9.9s');
  });

  it('clamps tiny durations instead of showing 0.0s', () => {
    expect(formatDuration(12)).toBe('0.1s');
  });

  it('formats seconds and minutes', () => {
    expect(formatDuration(42_000)).toBe('42s');
    expect(formatDuration(125_000)).toBe('2m 05s');
  });

  it('returns empty for invalid input', () => {
    expect(formatDuration(-5)).toBe('');
    expect(formatDuration(Number.NaN)).toBe('');
  });
});

describe('describeStage', () => {
  it.each(['apply_graph_operations', 'validate_graph', 'get_current_graph', 'get_node_schemas', 'research', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'list_runs', 'get_run', 'mystery_tool'])('treats an old missing %s receipt as interrupted, not running', (name) => {
    const stage = { call: { id: 'old', name, arguments: {} } };
    expect(describeStage(stage).status).toBe('interrupted');
    expect(describeStage(stage).summary).toMatch(/interrupted/i);
    expect(describeStage(stage, true).status).toBe('running');
  });

  it.each([
    ['cancelled', 'cancelled', /stopped/i],
    ['not_executed', 'not_executed', /not executed/i],
    ['unknown', 'unknown', /unknown/i],
    ['error', 'error', /failed/i],
  ] as const)('honors local outcome %s before formatting a successful-looking payload', (toolOutcome, status, text) => {
    for (const name of ['apply_graph_operations', 'validate_graph', 'get_current_graph', 'get_node_schemas', 'research', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'list_runs', 'get_run', 'other']) {
      const d = describeStage({
        call: { ...applyCall(), name },
        result: { role: 'tool', content: '{"valid":true,"results":[{"index":0,"ok":true}]}', toolOutcome },
      }, true);
      expect(d.status).toBe(status);
      expect(d.summary).toMatch(text);
      expect(d.detail).toContain('valid');
    }
  });

  it.each(['validate_graph', 'get_current_graph', 'get_node_schemas', 'research'])('shows top-level errors for %s instead of success', (name) => {
    const d = describeStage({
      call: { id: 'error', name, arguments: {} },
      result: { role: 'tool', content: '{"error":"service is unavailable"}' },
    });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('service is unavailable');
  });

  it.each([
    'not JSON',
    '',
    '[]',
    '{}',
    '{"results":[]}',
    '{"results":[{"index":0,"ok":true}]}',
    '{"results":[{"index":0,"ok":true},{"index":0,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[{"index":0,"ok":true},{"index":1,"ok":true},{"index":3,"ok":true}]}',
    '{"results":[{"index":-1,"ok":true},{"index":1,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[{"index":0.5,"ok":true},{"index":1,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[{"index":"0","ok":true},{"index":1,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[{"ok":true},{"index":1,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[{"index":0,"ok":"true"},{"index":1,"ok":true},{"index":2,"ok":true}]}',
    '{"results":[null,{"index":1,"ok":true},{"index":2,"ok":true}]}',
  ])('does not mark invalid or incomplete apply receipts successful: %s', (content) => {
    const d = describeStage({ call: applyCall(), result: { role: 'tool', content, toolOutcome: 'completed' } });
    expect(d.status).toBe('unknown');
    expect(d.summary).toMatch(/unknown/i);
  });

  it('uses operation indices rather than receipt order and preserves refs in details', () => {
    const d = describeStage({
      call: applyCall(),
      result: { role: 'tool', content: JSON.stringify({
        results: [{ index: 2, ok: true }, { index: 0, ok: true }, { index: 1, ok: false }],
        refs: { conv: 'node-id' },
      }) },
    });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('2 applied');
    expect(d.summary).toContain('1 failed');
    expect(d.detail).toContain('node-id');
  });

  it('does not call an empty operations batch applied', () => {
    const d = describeStage({ call: applyCall('empty', []), result: { role: 'tool', content: '{"results":[]}' } });
    expect(d.status).toBe('unknown');
  });

  it.each(['unavailable', 'stale', 'not_run'] as const)('keeps validation state %s distinct from a valid graph', (status) => {
    const d = describeStage({
      call: { id: 'v', name: 'validate_graph', arguments: {} },
      result: { role: 'tool', content: JSON.stringify({ status, valid: true, errors: ['context'] }) },
    });
    expect(d.status).toBe(status === 'not_run' ? 'not_executed' : status);
    expect(d.summary).not.toMatch(/validated|runnable/i);
    expect(d.detail).toContain('context');
  });

  it.each(['{"status":"invalid","valid":true,"errors":[]}', '{"status":"valid","valid":false,"errors":[]}'])('does not accept contradictory validation claims: %s', (content) => {
    const d = describeStage({ call: { id: 'v', name: 'validate_graph', arguments: {} }, result: { role: 'tool', content } });
    expect(d.status).toBe('unknown');
    expect(d.summary).not.toBe('Structure validated');
  });

  it.each(['{}', 'null', 'malformed', '{"valid":"true"}'])('does not infer validation success from %s', (content) => {
    const d = describeStage({ call: { id: 'v', name: 'validate_graph', arguments: {} }, result: { role: 'tool', content } });
    expect(d.status).toBe('unknown');
  });

  it('does not infer a graph snapshot from an unreadable receipt', () => {
    const d = describeStage({ call: { id: 'g', name: 'get_current_graph', arguments: {} }, result: { role: 'tool', content: 'no snapshot' } });
    expect(d.status).toBe('unknown');
  });

  it('tolerates null operation entries and very large detail text', () => {
    const d = describeStage({
      call: applyCall('x', [null, {}]),
      result: { role: 'tool', content: 'x'.repeat(6000) },
    });
    expect(d.status).toBe('unknown');
    expect(d.detail!.length).toBeLessThanOrEqual(4000);
  });

  it('apply_graph_operations (running): op-kind counts, running status', () => {
    const d = describeStage({ call: applyCall() }, true);
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
    expect(ok.summary).toBe('Structure validated');
    expect(ok.summary).not.toMatch(/runnable/i);

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
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Node schemas');
    expect(running.summary).toContain('Conv2d');
    const done = describeStage({ call, result: { role: 'tool', tool_call_id: 's1', content: 'Conv2d: in[...]' } });
    expect(done.status).toBe('ok');
  });

  it('research: question count', () => {
    const call = { id: 'r1', name: 'research', arguments: { questions: ['a', 'b', 'c'] } };
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Research');
    expect(running.summary).toContain('3');
    const done = describeStage({ call, result: { role: 'tool', tool_call_id: 'r1', content: '[1] Q: a\nA: x' } });
    expect(done.status).toBe('ok');
  });

  it('run_graph_experiments: shows planned runs, winner, apply state, and failures', () => {
    const call = {
      id: 'e1',
      name: 'run_graph_experiments',
      arguments: { variants: [{}, {}, {}], repetitions: 2 },
    };
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Experiment study');
    expect(running.summary).toContain('3 candidates');
    expect(running.summary).toContain('6 runs');

    const done = describeStage({
      call,
      result: {
        role: 'tool', tool_call_id: 'e1',
        content: JSON.stringify({ winnerLabel: 'Wide model', appliedVariantId: 'wide' }),
      },
    });
    expect(done.status).toBe('ok');
    expect(done.summary).toContain('Wide model');
    expect(done.summary).toContain('applied');

    const noMetric = describeStage({
      call,
      result: { role: 'tool', tool_call_id: 'e1', content: JSON.stringify({ variants: [] }) },
    });
    expect(noMetric.status).toBe('error');
    expect(noMetric.summary).toContain('no rankable metric');

    const failed = describeStage({
      call,
      result: { role: 'tool', tool_call_id: 'e1', content: JSON.stringify({ error: 'budget exceeded' }) },
    });
    expect(failed.status).toBe('error');
    expect(failed.summary).toContain('budget exceeded');
  });

  it('optimize_graph_parameters: shows bounded plan, winner, and compiler errors', () => {
    const call = {
      id: 'o1',
      name: 'optimize_graph_parameters',
      arguments: {
        strategy: 'seeded_random',
        candidate_count: 3,
        repetitions: 2,
        bindings: [{ node_id: 'model', param: 'quality', values: [1, 2, 3, 4] }],
      },
    };
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Parameter search');
    expect(running.summary).toContain('8 runs');

    const done = describeStage({
      call,
      result: {
        role: 'tool',
        tool_call_id: 'o1',
        content: JSON.stringify({ winnerLabel: 'Random 2: model.quality=3' }),
      },
    });
    expect(done.status).toBe('ok');
    expect(done.summary).toContain('Random 2');

    const failed = describeStage({
      call,
      result: { role: 'tool', tool_call_id: 'o1', content: JSON.stringify({ error: 'secret params are unsupported' }) },
    });
    expect(failed.status).toBe('error');
    expect(failed.summary).toContain('secret params');
  });

  it('list_runs: shows a running caption based on active_only, then a run count', () => {
    const call = { id: 'l1', name: 'list_runs', arguments: {} };
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Reading run history');
    expect(running.summary).toBe('recent runs');

    const activeOnlyRunning = describeStage({
      call: { id: 'l2', name: 'list_runs', arguments: { active_only: true } },
    }, true);
    expect(activeOnlyRunning.summary).toBe('active runs');

    const done = describeStage({
      call,
      result: {
        role: 'tool', tool_call_id: 'l1',
        content: JSON.stringify({ total: 5, runs: [{ run_id: 'r1' }, { run_id: 'r2' }] }),
      },
    });
    expect(done.status).toBe('ok');
    expect(done.summary).toBe('2 runs');

    const failed = describeStage({
      call,
      result: {
        role: 'tool', tool_call_id: 'l1',
        content: JSON.stringify({ error: 'Run history is unavailable: this CodefyUI host does not expose /api/runs' }),
      },
    });
    expect(failed.status).toBe('error');
    expect(failed.summary).toContain('Run history is unavailable');
  });

  it('get_run: shows the requested run id while running, then its fetched status', () => {
    const call = { id: 'g1', name: 'get_run', arguments: { run_id: 'run-42' } };
    const running = describeStage({ call }, true);
    expect(running.label).toBe('Reading run details');
    expect(running.summary).toBe('run-42');

    const done = describeStage({
      call,
      result: {
        role: 'tool', tool_call_id: 'g1',
        content: JSON.stringify({ run: { run_id: 'run-42', status: 'succeeded' }, artifacts: [] }),
      },
    });
    expect(done.status).toBe('ok');
    expect(done.summary).toBe('succeeded');

    const failed = describeStage({
      call,
      result: {
        role: 'tool', tool_call_id: 'g1',
        content: JSON.stringify({ error: "run 'run-42' not found on this host." }),
      },
    });
    expect(failed.status).toBe('error');
    expect(failed.summary).toContain('not found');
  });

  it.each(['list_runs', 'get_run'])('does not claim malformed %s history was read successfully', (name) => {
    for (const content of ['{}', '{"runs":"missing","run":[]}', 'not JSON']) {
      const d = describeStage({ call: { id: 'history', name, arguments: {} }, result: { role: 'tool', content } });
      expect(d.status).not.toBe('ok');
    }
  });

  it('unknown tool: falls back to raw name and tolerates non-JSON content', () => {
    const call = { id: 'u1', name: 'mystery_tool', arguments: {} };
    const d = describeStage({ call, result: { role: 'tool', tool_call_id: 'u1', content: 'plain text' } });
    expect(d.label).toBe('mystery_tool');
    expect(d.status).toBe('ok');
    expect(d.detail).toContain('plain text');
  });

  it('malformed arguments never throw', () => {
    const d = describeStage({ call: { id: 'x', name: 'apply_graph_operations', arguments: {} } }, true);
    expect(d.status).toBe('running');
    expect(d.label).toBe('Edit graph');
  });
});

describe('describeStage run_graph', () => {
  const call = (args: Record<string, unknown> = { reason: 'Train the 200M model' }) => ({
    id: 'run-call',
    name: 'run_graph',
    arguments: args,
  });

  it('shows the reason while the run streams', () => {
    const d = describeStage({ call: call() }, true);
    expect(d.label).toBe('Run graph');
    expect(d.status).toBe('running');
    expect(d.summary).toBe('Train the 200M model');
  });

  it.each(['not JSON', '', 'null', '{}', '{"status":"unexpected"}'])('does not infer execution success from an unreadable run receipt: %s', (content) => {
    const d = describeStage({ call: call(), result: { role: 'tool', content } });
    expect(d.status).not.toBe('ok');
  });

  it.each(['cancelled', 'stopped'])('shows legacy %s execution as stopped, not an error or success', (status) => {
    const d = describeStage({ call: call(), result: { role: 'tool', content: JSON.stringify({ status }) } });
    expect(d.status).toBe('cancelled');
    expect(d.summary).toMatch(/stopped/i);
  });

  it.each(['//evil.example/clip.mp4', '/\\\\evil.example/clip.mp4', '/api/media/../../outside.mp4', '/api/media/%2e%2e/outside.mp4', '/api/other/clip.mp4'])('never renders unapproved media references: %s', (url) => {
    const d = describeStage({ call: call(), result: {
      role: 'tool', content: JSON.stringify({ status: 'complete', media: [{ kind: 'video', url, format: 'mp4' }] }),
    } });
    expect(d.media).toBeUndefined();
  });

  it('retains valid same-origin artifacts and ignores malformed entries', () => {
    const d = describeStage({ call: call(), result: {
      role: 'tool', content: JSON.stringify({ status: 'complete', media: [null, [], {}, { kind: 'video', url: '/api/media/clip.mp4?download=1', node: 'Writer' }] }),
    } });
    expect(d.media).toEqual([{ kind: 'video', url: '/api/media/clip.mp4?download=1', format: 'mp4', node: 'Writer' }]);
  });

  it('summarizes a completed run with node counts and duration', () => {
    const result = {
      role: 'tool' as const,
      tool_call_id: 'run-call',
      content: JSON.stringify({
        status: 'complete', completedNodes: 5, totalNodes: 5, duration_s: 65,
      }),
    };
    const d = describeStage({ call: call(), result });
    expect(d.status).toBe('ok');
    expect(d.summary).toBe('complete · 5/5 nodes · 1m 05s');
  });

  it('marks a non-complete run status as error', () => {
    const result = {
      role: 'tool' as const,
      tool_call_id: 'run-call',
      content: JSON.stringify({
        status: 'timeout', completedNodes: 2, totalNodes: 5, duration_s: 600,
      }),
    };
    const d = describeStage({ call: call(), result });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('timeout');
  });

  it('marks pre-execution refusals as errors with the message', () => {
    const result = {
      role: 'tool' as const,
      tool_call_id: 'run-call',
      content: JSON.stringify({ cancelled: true, error: 'The run was not approved by the user.' }),
    };
    const d = describeStage({ call: call(), result });
    expect(d.status).toBe('error');
    expect(d.summary).toContain('not approved');
  });
});
