/** R2: the mass-removal threshold adds up over the turn, so splitting the
 * removals into batches of 9 does not avoid the card. */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { runTurn } from '../loop';
import { SETTINGS, callbacks, fakeApi, scriptModel } from '../../test/agentHarness';

const graphOf = (count: number) => ({ nodes: Array.from({ length: count }, (_, index) => ({ id: `n${index}`, type: 'Conv2d' })), edges: [] });
const batch = (id: string, from: number, count: number) => ({
  id, name: 'apply_graph_operations',
  arguments: { operations: Array.from({ length: count }, (_, index) => ({ op: 'remove_node', node_id: `n${from + index}` })) },
});

beforeEach(() => { vi.clearAllMocks(); });

describe('R2: removals add up over the turn', () => {
  it('two batches of 9 on a 30-node graph: the first runs, the second shows a card with both counts', async () => {
    scriptModel([{ calls: [batch('b1', 0, 9)] }, { calls: [batch('b2', 9, 9)] }, { text: 'ok' }]);
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(30) });
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(api.graph.applyOperations).toHaveBeenCalledTimes(1);
    expect(confirmClearGraph).toHaveBeenCalledTimes(1);
    expect((confirmClearGraph.mock.calls[0] as unknown[])[0]).toMatchObject({ toolCallId: 'b2', removeNodes: 9, removedThisTurn: 9 });
    expect(result.status).toBe('cancelled');
  });

  it('an approval covers one batch: the next batch over the threshold asks again', async () => {
    scriptModel([{ calls: [batch('b1', 0, 9)] }, { calls: [batch('b2', 9, 2)] }, { calls: [batch('b3', 11, 1)] }, { text: 'ok' }]);
    const confirmClearGraph = vi.fn(async () => true);
    const api = fakeApi({ graph: graphOf(30) });
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(api.graph.applyOperations).toHaveBeenCalledTimes(3);
    expect(confirmClearGraph.mock.calls.map((args) => (args as unknown[])[0])).toEqual([
      expect.objectContaining({ toolCallId: 'b2', removeNodes: 2, removedThisTurn: 9 }),
      expect.objectContaining({ toolCallId: 'b3', removeNodes: 1, removedThisTurn: 11 }),
    ]);
  });

  it('half of the graph at the start of the turn counts too: 2 then 2 of 8 nodes', async () => {
    scriptModel([{ calls: [batch('b1', 0, 2)] }, { calls: [batch('b2', 2, 2)] }, { text: 'ok' }]);
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(8) });
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).toHaveBeenCalledTimes(1);
    expect((confirmClearGraph.mock.calls[0] as unknown[])[0]).toMatchObject({ toolCallId: 'b2', removeNodes: 2, removedThisTurn: 2 });
  });

  it('edits without removals never need the card, and a new turn starts from zero', async () => {
    scriptModel([{ calls: [batch('b1', 0, 9)] }, { calls: [{ id: 'p', name: 'apply_graph_operations', arguments: { operations: [{ op: 'set_params', node_id: 'n20', params: { a: 1 } }] } }] }, { text: 'ok' }]);
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(30) });
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).not.toHaveBeenCalled();
    scriptModel([{ calls: [batch('c1', 10, 9)] }, { text: 'ok' }]);
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'again', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).not.toHaveBeenCalled();
    expect(api.graph.applyOperations).toHaveBeenCalledTimes(3);
  });

  it('removals that the host reports as failed do not count', async () => {
    scriptModel([{ calls: [batch('b1', 0, 9)] }, { calls: [batch('b2', 9, 9)] }, { text: 'ok' }]);
    const confirmClearGraph = vi.fn(async () => false);
    const api = fakeApi({ graph: graphOf(30) });
    vi.mocked(api.graph.applyOperations).mockImplementationOnce((ops) => ({
      results: ops.map((_, index) => ({ index, ok: false, error: 'no such node' })), refs: {}, node_count: 30, edge_count: 0,
    }));
    await runTurn({ api, settings: SETTINGS, history: [], userText: 'tidy up', callbacks: callbacks(), confirmClearGraph });
    expect(confirmClearGraph).not.toHaveBeenCalled();
  });
});
