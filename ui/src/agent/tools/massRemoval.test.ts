/** SEC7: emptying a graph with many remove_node operations needs the same
 * approval as clear_graph: 10 or more nodes in one batch, or 3 or more that
 * are at least half of the graph. */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { runTurn } from '../loop';
import { isMassRemoval } from './apply_graph_operations';
import { SETTINGS, callbacks, fakeApi, scriptModel } from '../../test/agentHarness';

const graphOf = (count: number) => ({ nodes: Array.from({ length: count }, (_, index) => ({ id: `n${index}`, type: 'Conv2d' })), edges: [] });
const removing = (count: number) => ({ operations: Array.from({ length: count }, (_, index) => ({ op: 'remove_node', node_id: `n${index}` })) });
const call = (args: Record<string, unknown>) => [{ calls: [{ id: 'c1', name: 'apply_graph_operations', arguments: args }] }, { text: 'ok' }];

beforeEach(() => { vi.clearAllMocks(); });

describe('SEC7: removing many nodes needs approval', () => {
  it('the threshold: 10 or more, or 3 or more that are half the graph', () => {
    expect(isMassRemoval(10, 100)).toBe(true);
    expect(isMassRemoval(9, 100)).toBe(false);
    expect(isMassRemoval(3, 6)).toBe(true);
    expect(isMassRemoval(3, 7)).toBe(false);
    expect(isMassRemoval(2, 2)).toBe(false);
  });

  it('10 removals on a 12-node graph show a card with the count; declining removes nothing', async () => {
    scriptModel(call(removing(10)));
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(12) });
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).toHaveBeenCalledTimes(1);
    expect((confirmClearGraph.mock.calls[0] as unknown[])[0]).toMatchObject({ removeNodes: 10, nodeCount: 12 });
    expect(api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.status).toBe('cancelled');
    expect(result.turns.find((turn) => turn.role === 'tool')!.content).toContain('declined removing 10 nodes');
  });

  it('3 of a 5-node graph need approval; approving applies the batch', async () => {
    scriptModel(call(removing(3)));
    const confirmClearGraph = vi.fn(async () => true);
    const api = fakeApi({ graph: graphOf(5) });
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).toHaveBeenCalledTimes(1);
    expect(api.graph.applyOperations).toHaveBeenCalledTimes(1);
  });

  it('without a way to ask the user, a mass removal is not executed', async () => {
    scriptModel(call(removing(10)));
    const api = fakeApi({ graph: graphOf(10) });
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks() });
    expect(api.graph.applyOperations).not.toHaveBeenCalled();
    expect(result.turns.find((turn) => turn.role === 'tool')!.toolOutcome).toBe('not_executed');
  });

  it('small removals stay as they were: 2 of 3 nodes, 9 of 30 nodes', async () => {
    for (const [remove, size] of [[2, 3], [9, 30]]) {
      scriptModel(call(removing(remove)));
      const confirmClearGraph = vi.fn(async () => false);
      const api = fakeApi({ graph: graphOf(size) });
      await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), confirmClearGraph });
      expect(confirmClearGraph).not.toHaveBeenCalled();
      expect(api.graph.applyOperations).toHaveBeenCalledTimes(1);
    }
  });

  it('a removal batch mixed with other edits still counts its removals', async () => {
    scriptModel(call({ operations: [...removing(10).operations, { op: 'add_node', node_type: 'Conv2d' }] }));
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(40) });
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).toHaveBeenCalledTimes(1);
    expect(api.graph.applyOperations).not.toHaveBeenCalled();
  });
});
