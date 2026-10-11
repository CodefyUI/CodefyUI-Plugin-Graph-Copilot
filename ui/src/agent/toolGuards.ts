import type { ApplyResult, GraphOp, OpResult, SerializedGraph } from '../types/codefyui';

export const MAX_GRAPH_OPS = 100;

export function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new DOMException('The run was cancelled.', 'AbortError');
}

export function isAbortError(error: unknown): boolean {
  return !!error && typeof error === 'object' && 'name' in error && error.name === 'AbortError';
}

/** Settle promptly on Stop even if a host callback ignores its supplied signal.
 * Both promise branches stay observed, so late failures cannot become unhandled. */
export async function awaitWithSignal<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) {
    // Call sites may already have started a fetch/confirmation promise which
    // synchronously aborted its signal. Consume that input's late rejection.
    void promise.catch(() => {});
    throwIfAborted(signal);
  }
  const value = await new Promise<T>((resolve, reject) => {
    const cleanup = () => signal.removeEventListener('abort', abort);
    const abort = () => { cleanup(); reject(new DOMException('The run was cancelled.', 'AbortError')); };
    signal.addEventListener('abort', abort, { once: true });
    promise.then(
      (result) => { cleanup(); resolve(result); },
      (error: unknown) => { cleanup(); reject(error); },
    );
    if (signal.aborted) abort();
  });
  throwIfAborted(signal);
  return value;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}
const text = (value: unknown): value is string => typeof value === 'string' && !!value.trim();
const optionalText = (object: Record<string, unknown>, key: string) => object[key] === undefined || text(object[key]);

/** Shape/field checks only. The host remains authoritative for node types,
 * port compatibility, reference resolution, and parameter semantics. */
export function guardOperations(value: unknown): { operations: GraphOp[]; error?: never } | { error: string; operations?: never } {
  if (!Array.isArray(value) || !value.length || value.length > MAX_GRAPH_OPS) {
    return { error: `operations must be a non-empty array of at most ${MAX_GRAPH_OPS} GraphOp objects` };
  }
  for (let index = 0; index < value.length; index++) {
    const op: unknown = value[index];
    let valid = false;
    if (isRecord(op)) {
      switch (op.op) {
        case 'add_node':
          valid = text(op.node_type) && optionalText(op, 'ref') &&
            (op.params === undefined || isRecord(op.params)) &&
            (op.position === undefined || (isRecord(op.position) &&
              typeof op.position.x === 'number' && Number.isFinite(op.position.x) &&
              typeof op.position.y === 'number' && Number.isFinite(op.position.y)));
          break;
        case 'connect':
          valid = text(op.source) && text(op.target) && text(op.source_handle) && text(op.target_handle);
          break;
        case 'set_params':
          valid = text(op.node_id) && isRecord(op.params);
          break;
        case 'remove_node':
          valid = text(op.node_id);
          break;
        case 'remove_edge':
          valid = text(op.source) && text(op.target) && optionalText(op, 'source_handle') && optionalText(op, 'target_handle');
          break;
        case 'clear_graph':
        case 'auto_layout':
          valid = true;
      }
    }
    if (!valid) return { error: `Invalid GraphOp at index ${index}: use the documented op and required fields` };
  }
  const operations = value as GraphOp[];
  if (operations.some((op) => op.op === 'clear_graph') && operations.length !== 1) {
    return { error: 'clear_graph must be the only operation in its batch; mixed batches are rejected without changes' };
  }
  return { operations };
}

/** Untruncated and full, including presets/segment groups. Never put this
 * comparison snapshot in provider context, UI state, or RunSummary metadata. */
export function comparisonSnapshot(graph: SerializedGraph): string {
  if (!isRecord(graph) || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
    throw new Error('The host returned an invalid graph snapshot.');
  }
  return JSON.stringify(graph);
}

export interface ReceiptReview {
  result?: ApplyResult;
  byIndex: Array<OpResult | undefined>;
  applied: number;
  failed: number;
  unknown: boolean;
}

/** Indexed receipts, not result-array positions, determine counts and chips.
 * Missing, duplicate, out-of-range and malformed entries can never mean success. */
export function reviewReceipt(receipt: unknown, count: number): ReceiptReview {
  const byIndex: Array<OpResult | undefined> = Array.from({ length: count });
  const review: ReceiptReview = { byIndex, applied: 0, failed: 0, unknown: true };
  if (!isRecord(receipt) || !Array.isArray(receipt.results)) return review;
  const metadataValid = isRecord(receipt.refs) && Object.values(receipt.refs).every((id) => typeof id === 'string') &&
    Number.isInteger(receipt.node_count) && Number(receipt.node_count) >= 0 &&
    Number.isInteger(receipt.edge_count) && Number(receipt.edge_count) >= 0;
  let malformed = !metadataValid;
  const seen = new Set<number>();
  const duplicates = new Set<number>();
  for (const entry of receipt.results) {
    if (!isRecord(entry) || !Number.isInteger(entry.index) || Number(entry.index) < 0 || Number(entry.index) >= count) {
      malformed = true;
      continue;
    }
    const index = entry.index as number;
    if (seen.has(index)) { duplicates.add(index); malformed = true; }
    seen.add(index);
    if (typeof entry.ok !== 'boolean' || (entry.error !== undefined && typeof entry.error !== 'string') ||
      (entry.node_id !== undefined && typeof entry.node_id !== 'string')) {
      malformed = true;
      continue;
    }
    byIndex[index] = entry as unknown as OpResult;
  }
  duplicates.forEach((index) => { byIndex[index] = undefined; });
  review.applied = byIndex.filter((entry) => entry?.ok === true).length;
  review.failed = byIndex.filter((entry) => entry?.ok === false).length;
  review.unknown = malformed || byIndex.some((entry) => entry === undefined);
  // Callbacks receive the exact receipt only if its outer shape is usable.
  if (metadataValid) review.result = receipt as unknown as ApplyResult;
  return review;
}

/** Successful operations establish a narrow repair surface, never blanket
 * permission to modify unrelated pre-existing graph content. */
export function repairScopeError(
  operations: GraphOp[], affected: ReadonlySet<string>, existing: ReadonlySet<string>,
): string | undefined {
  const aliases = new Set<string>();
  const inScope = (id: string) => affected.has(id) || aliases.has(id);
  for (const op of operations) {
    if (op.op === 'add_node' && op.ref) {
      // A skipped add would make the host resolve a colliding alias back to an
      // unrelated live node. Future aliases cannot authorize earlier edits.
      if (existing.has(op.ref) && !affected.has(op.ref)) return 'Repair refs cannot alias unrelated existing node IDs.';
      aliases.add(op.ref);
    }
    if (op.op === 'clear_graph') return 'Automatic validation repair cannot clear the graph.';
    if ((op.op === 'remove_node' || op.op === 'set_params') && !inScope(op.node_id)) {
      return 'Automatic validation repair cannot change unrelated existing nodes.';
    }
    if ((op.op === 'connect' || op.op === 'remove_edge') && !inScope(op.target)) {
      return 'Automatic validation repair can only change inputs of current-run affected nodes.';
    }
  }
  return undefined;
}

export function rememberAffectedNodes(operations: GraphOp[], review: ReceiptReview, affected: Set<string>): void {
  operations.forEach((op, index) => {
    const receipt = review.byIndex[index];
    if (!receipt?.ok) return;
    if (op.op === 'add_node') {
      const id = receipt.node_id ?? (op.ref ? review.result?.refs[op.ref] : undefined);
      if (id) affected.add(id);
    } else if (op.op === 'set_params' || op.op === 'remove_node') {
      affected.add(review.result?.refs[op.node_id] ?? op.node_id);
    } else if (op.op === 'connect' || op.op === 'remove_edge') {
      // Wiring an existing source into a new input must not grant permission to
      // edit or delete that otherwise unrelated source during later repairs.
      affected.add(review.result?.refs[op.target] ?? op.target);
    }
  });
}

export function buildOpsSummary(ops: GraphOp[], review: ReceiptReview): string {
  const groups = new Map<string, { ok: number; fail: number; unknown: number }>();
  ops.forEach((op, index) => {
    const counts = groups.get(op.op) ?? { ok: 0, fail: 0, unknown: 0 };
    const result = review.byIndex[index];
    if (!result) counts.unknown++;
    else if (result.ok) counts.ok++;
    else counts.fail++;
    groups.set(op.op, counts);
  });
  const summary = Array.from(groups, ([op, counts]) => {
    const total = counts.ok + counts.fail + counts.unknown;
    const outcomes = [counts.ok && `${counts.ok} ok`, counts.fail && `${counts.fail} FAILED`, counts.unknown && `${counts.unknown} UNKNOWN`].filter(Boolean);
    if (outcomes.length === 1) return `${op} x${total} ${counts.unknown ? 'UNKNOWN' : counts.fail ? 'FAILED' : 'ok'}`;
    return `${op} x${total} (${outcomes.join(', ')})`;
  }).join(', ');
  return review.unknown && !summary.includes('UNKNOWN') ? `${summary}; receipt UNKNOWN` : summary;
}
