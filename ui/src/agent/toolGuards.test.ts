import { describe, expect, it, vi } from 'vitest';
import type { GraphOp } from '../types/codefyui';
import { MAX_GRAPH_OPS, awaitWithSignal, comparisonSnapshot, guardOperations, repairScopeError, rememberAffectedNodes, reviewReceipt } from './toolGuards';

describe('tool guards', () => {
  it('supports every documented GraphOp shape while leaving semantic validation to the host', () => {
    const operations: GraphOp[] = [
      { op: 'add_node', node_type: 'Test', ref: 'fresh', params: {}, position: { x: 0, y: -1 } },
      { op: 'connect', source: 'old', source_handle: 'out', target: 'fresh', target_handle: 'in' },
      { op: 'set_params', node_id: 'fresh', params: {} }, { op: 'remove_node', node_id: 'old' },
      { op: 'remove_edge', source: 'old', target: 'fresh' }, { op: 'auto_layout' },
    ];
    expect(guardOperations(operations)).toEqual({ operations });
    expect(guardOperations(Array.from({ length: MAX_GRAPH_OPS + 1 }, () => ({ op: 'auto_layout' })))).toHaveProperty('error');
    expect(guardOperations([{ op: 'clear_graph' }])).toHaveProperty('operations');
  });

  it('repairs allow existing outputs to feed only current-run inputs, with ordered noncolliding refs', () => {
    const affected = new Set(['new']); const existing = new Set(['old', 'new']);
    expect(repairScopeError([{ op: 'add_node', node_type: 'Support', ref: 'support' },
      { op: 'connect', source: 'old', source_handle: 'out', target: 'support', target_handle: 'in' },
      { op: 'set_params', node_id: 'support', params: {} }], affected, existing)).toBeUndefined();
    expect(repairScopeError([{ op: 'set_params', node_id: 'future', params: {} },
      { op: 'add_node', node_type: 'Support', ref: 'future' }], affected, existing)).toBeDefined();
    expect(repairScopeError([{ op: 'clear_graph' }], affected, existing)).toBeDefined();
    expect(repairScopeError([{ op: 'remove_edge', source: 'new', target: 'old' }], affected, existing)).toBeDefined();
  });

  it('receipt coverage includes outer metadata validity and unique finite indexes', () => {
    expect(reviewReceipt(undefined, 1).unknown).toBe(true);
    expect(reviewReceipt({ results: [{ index: 0, ok: true }], refs: [], node_count: 1, edge_count: 0 }, 1).unknown).toBe(true);
    expect(reviewReceipt({ results: [{ index: 0, ok: true }], refs: {}, node_count: -1, edge_count: 0 }, 1).unknown).toBe(true);
    expect(reviewReceipt({ results: [{ index: 0, ok: true, error: 5 }], refs: {}, node_count: 1, edge_count: 0 }, 1).unknown).toBe(true);
    expect(reviewReceipt({ results: [{ index: 0, ok: true }, { index: 0, ok: true }], refs: {}, node_count: 1, edge_count: 0 }, 1).applied).toBe(0);
  });

  it('successful receipts establish IDs without promoting unrelated source nodes', () => {
    const affected = new Set<string>();
    const ops: GraphOp[] = [{ op: 'add_node', node_type: 'Test', ref: 'alias' },
      { op: 'set_params', node_id: 'alias', params: {} },
      { op: 'connect', source: 'unrelated', source_handle: 'out', target: 'alias', target_handle: 'in' },
      { op: 'remove_node', node_id: 'skipped' }];
    const receipt = reviewReceipt({ results: [{ index: 0, ok: true, node_id: 'actual' }, { index: 1, ok: true }, { index: 2, ok: true }, { index: 3, ok: false }], refs: { alias: 'actual' }, node_count: 1, edge_count: 1 }, 4);
    rememberAffectedNodes(ops, receipt, affected);
    expect(affected).toEqual(new Set(['actual']));
  });

  it('comparison uses full snapshot and rejects unsupported graph shape', () => {
    expect(comparisonSnapshot({ nodes: [], edges: [], presets: ['private'] })).toContain('presets');
    expect(() => comparisonSnapshot({ nodes: undefined, edges: [] } as any)).toThrow();
  });

  it('already started rejected promises remain observed if they synchronously abort', async () => {
    const controller = new AbortController();
    const rejected = Promise.reject(new Error('late transport rejection'));
    const caught = vi.spyOn(rejected, 'catch');
    controller.abort();
    await expect(awaitWithSignal(rejected, controller.signal)).rejects.toMatchObject({ name: 'AbortError' });
    expect(caught).toHaveBeenCalledTimes(1);
  });
});
