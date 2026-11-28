import type { GraphOp } from '../../types/codefyui';
import { copy, observe } from '../chatBody';
import { RunExit } from '../runExit';
import {
  MAX_GRAPH_OPS, buildOpsSummary, guardOperations, isRecord, rememberAffectedNodes, repairScopeError, reviewReceipt,
  throwIfAborted,
} from '../toolGuards';
import type { ToolDefinition, ToolEnvironment } from './types';

/** A singleton `clear_graph` batch needs the user's approval. */
function isClear(input: Record<string, unknown>): boolean {
  const operations = input.operations;
  return Array.isArray(operations) && isRecord(operations[0]) && operations[0].op === 'clear_graph';
}

/** Distinct nodes a batch removes. */
export function removedNodeCount(input: Record<string, unknown>): number {
  const operations = Array.isArray(input.operations) ? input.operations : [];
  return new Set(operations.filter((op) => isRecord(op) && op.op === 'remove_node').map((op) => String((op as Record<string, unknown>).node_id))).size;
}

/** SEC7: emptying a graph node by node needs the same approval as clear_graph:
 * a batch removing at least 10 nodes, or at least 3 that are half the graph or more. */
export function isMassRemoval(removed: number, graphNodes: number): boolean {
  return removed >= 10 || (removed >= 3 && removed * 2 >= graphNodes);
}

/** R2: the threshold counts the whole turn, so splitting removals into small
 * batches does not avoid the card. Nodes this turn already removed plus this
 * batch's are measured against the graph size when the turn began. A batch
 * that removes nothing never needs the card; an approval covers one batch. */
export function needsRemovalApproval(removing: number, env: Pick<ToolEnvironment, 'api' | 'removals'>): boolean {
  if (removing === 0) return false;
  const base = env.removals?.startNodes ?? env.api.graph.getGraph().nodes.length;
  return isMassRemoval((env.removals?.removed ?? 0) + removing, base);
}

export const applyGraphOperationsTool: ToolDefinition = {
  name: 'apply_graph_operations',
  description:
    `Apply up to ${MAX_GRAPH_OPS} graph edits as ONE undo step. Read indexed receipts and refs; unknown effects must not be replayed. Each entry uses these EXACT fields:
- {"op":"add_node","node_type":"<exact catalog name>","ref":"<alias>","params":{...},"position":{"x":<num>,"y":<num>}} — ref/params/position optional. A ref is usable as source/target/node_id ONLY in this SAME batch. Later calls must use real node IDs from receipts/refs or get_current_graph.
- {"op":"connect","source":"<node id or ref>","source_handle":"<output port>","target":"<node id or ref>","target_handle":"<input port>"} — use exact schema ports; control-flow trigger edges use source_handle "trigger".
- {"op":"set_params","node_id":"<node id or ref>","params":{...}}
- {"op":"remove_node","node_id":"<node id or ref>"} — a batch removing 10 or more nodes, or 3 or more that are at least half the graph, needs the user's approval like clear_graph. Removals add up over the turn: splitting them into smaller batches does not avoid the approval.
- {"op":"remove_edge","source":"<node id or ref>","target":"<node id or ref>","source_handle":"<optional>","target_handle":"<optional>"}
- {"op":"clear_graph"} — singleton batch only, requires fresh user confirmation. Never bypass a refusal with node removal.
- {"op":"auto_layout"} — auto-positions nodes after structural changes.
Malformed batches are rejected in full before host dispatch. The host validates operation semantics; known failing operations are skipped and reported by index.`,
  input_schema: {
    type: 'object', properties: { operations: { type: 'array', minItems: 1, maxItems: MAX_GRAPH_OPS, items: { type: 'object' } } }, required: ['operations'],
  },
  group: 'graph',
  readOnly: false,
  // Reading the graph may throw; the gate then refuses the call (fails closed).
  approval: (input, env) => (isClear(input) || needsRemovalApproval(removedNodeCount(input), env)
    ? { kind: 'clear_graph' } : null),
  async execute(args, ctx) {
    const { api, signal, turn, callbacks } = ctx;
    const { summary } = turn;
    const guarded = guardOperations(args.operations);
    if (guarded.error !== undefined) { ctx.fail(guarded.error); return; }
    const operations: GraphOp[] = guarded.operations;
    if (turn.repairSnapshot !== undefined) {
      const graph = api.graph.getGraph();
      throwIfAborted(signal);
      const existing = new Set(graph.nodes.map((node: unknown) => isRecord(node) && typeof node.id === 'string' ? node.id : '').filter(Boolean));
      const violation = repairScopeError(operations, turn.affectedNodes, existing);
      if (violation) {
        ctx.fail(violation);
        throw new RunExit('incomplete', 'repair_scope', 'Validation repair would exceed the scope of current-run edits. No broader changes were applied.');
      }
    }
    let approvedClearSnapshot: string | undefined;
    const clearing = operations[0].op === 'clear_graph';
    const removing = clearing ? 0 : removedNodeCount({ operations });
    const graphNow = api.graph.getGraph();
    const removedBefore = ctx.removals?.removed ?? 0;
    if (clearing || needsRemovalApproval(removing, ctx)) {
      const before = turn.currentSnapshot();
      const graph = graphNow;
      if (!ctx.canApprove('clear_graph')) {
        ctx.record(JSON.stringify({ outcome: 'not_executed', error: 'clear_graph requires explicit user confirmation.' }), 'not_executed');
        throw new RunExit('incomplete', 'confirmation_unavailable', 'Clearing was not confirmed. The graph was not cleared.');
      }
      ctx.phase('awaiting_confirmation');
      throwIfAborted(signal);
      const approved = await ctx.approve({ kind: 'clear_graph', request: {
        runId: summary.id, toolCallId: ctx.call.id, nodeCount: graph.nodes.length, edgeCount: graph.edges.length,
        ...(clearing ? {} : { removeNodes: removing, ...(removedBefore > 0 ? { removedThisTurn: removedBefore } : {}) }),
      } });
      throwIfAborted(signal);
      if (approved !== true) {
        ctx.record(JSON.stringify({ outcome: 'cancelled', error: clearing
          ? 'The user declined clearing the graph. The run ended; do not bypass this decision.'
          : `The user declined removing ${removing} nodes. The run ended; do not remove them another way.` }), 'cancelled');
        throw new RunExit('cancelled', 'confirmation_declined', clearing
          ? 'Clearing was declined. No clear operation was dispatched.'
          : 'Removing the nodes was declined. Nothing was removed.');
      }
      if (turn.currentSnapshot() !== before) turn.stale('confirmation_stale');
      approvedClearSnapshot = before;
      ctx.phase('tools');
    }
    // No await or observer between this final snapshot/signal guard and write.
    throwIfAborted(signal);
    turn.assertRepairSnapshot();
    if (approvedClearSnapshot !== undefined && turn.currentSnapshot() !== approvedClearSnapshot) turn.stale('confirmation_stale');
    throwIfAborted(signal);
    ctx.assertApproved();
    summary.mutationAttempted = true;
    const priorMutation = summary.mutation;
    summary.mutation = 'unknown';
    ctx.record(JSON.stringify({ outcome: 'unknown', error: 'The mutation was dispatched; its receipt is not yet known.' }), 'unknown', false);
    let raw: unknown;
    try { raw = api.graph.applyOperations(operations); }
    catch (error) {
      ctx.record(JSON.stringify({ outcome: 'unknown', error: `applyOperations threw: ${String(error)}` }), 'unknown');
      throw new RunExit('failed', 'mutation_unknown', 'The host mutation threw. Changes may have occurred; do not retry this request.', 'The host mutation failed after dispatch; its effects are unknown.');
    }
    // Capture exact receipt in the journal BEFORE interpretation or any observer.
    let receipt: unknown;
    try {
      const content = JSON.stringify(raw);
      if (content === undefined) throw new Error('missing receipt');
      ctx.record(content, 'unknown');
      receipt = JSON.parse(content);
    } catch {
      ctx.record(JSON.stringify({ outcome: 'unknown', error: 'The host mutation receipt could not be serialized.' }), 'unknown');
      throw new RunExit('incomplete', 'receipt_unknown', 'The mutation receipt is unreadable; changes may have occurred. Do not retry.');
    }
    const review = reviewReceipt(receipt, operations.length);
    summary.appliedOps += review.applied;
    summary.failedOps += review.failed;
    summary.mutation = review.unknown ? 'unknown' : review.applied > 0 ? 'applied' : priorMutation;
    const opSummary = buildOpsSummary(operations, review);
    turn.addRoundOps(opSummary);
    if (review.unknown) {
      if (review.result) observe(() => callbacks.onOpsApplied(opSummary, copy(review.result!)));
      throw new RunExit('incomplete', 'receipt_unknown', 'The host returned missing or invalid indexed receipts. Changes may have occurred; do not retry.');
    }
    ctx.record(turn.rawReceipt()!, review.failed ? 'error' : 'completed');
    // P4: a failed operation kind counts as corrected only by a successful
    // operation of the same kind in a LATER batch (never by layout alone).
    const failedKinds = turn.failedOpKinds;
    if (failedKinds) {
      operations.forEach((op, index) => { if (review.byIndex[index]?.ok === true) failedKinds.delete(op.op); });
      operations.forEach((op, index) => { if (review.byIndex[index]?.ok === false) failedKinds.add(op.op); });
    }
    if (review.failed) ctx.markIssue();
    if (review.applied > 0) {
      rememberAffectedNodes(operations, review, turn.affectedNodes);
      if (ctx.removals) ctx.removals.removed += operations.filter((op, index) => op.op === 'remove_node' && review.byIndex[index]?.ok).length;
      // Invalidate older validation before UI; retain receipts even when the
      // host aborts synchronously during the successful mutation.
      summary.validation = { status: 'not_run', errors: [] };
      if (!signal?.aborted) {
        turn.lastMutationSnapshot = turn.currentSnapshot();
        if (turn.repairSnapshot !== undefined) turn.repairSnapshot = turn.lastMutationSnapshot;
      }
    }
    if (review.result) observe(() => callbacks.onOpsApplied(opSummary, copy(review.result!)));
  },
};
