/** Display grouping and human-readable receipts for live runs and saved history. */
import type { ChatTurn } from '../state/conversations';
import type { WireToolCall } from '../llm/client';

export interface ToolStage {
  call: WireToolCall;
  /** Missing receipts are running only with an explicit active-run context. */
  result?: ChatTurn;
}

export interface DisplayItem {
  /** Source index stays stable while receipts are appended. */
  key: number;
  turn: ChatTurn;
  stages: ToolStage[];
}

/** Fold receipts into the nearest matching call. Orphan receipts stay hidden. */
export function groupTurns(turns: ChatTurn[]): DisplayItem[] {
  const items: DisplayItem[] = [];
  turns.forEach((turn, i) => {
    if (turn.role === 'tool') {
      for (let j = items.length - 1; j >= 0; j--) {
        const item = items[j];
        if ((turn.runId || item.turn.runId) && turn.runId !== item.turn.runId) continue;
        const stage = item.stages.find((s) => s.call.id === turn.tool_call_id && !s.result);
        if (stage) {
          stage.result = turn;
          return;
        }
      }
      return;
    }
    items.push({
      key: i,
      turn,
      stages: (turn.tool_calls ?? []).map((call) => ({ call })),
    });
  });
  return items;
}

export type StageStatus =
  | 'running' | 'ok' | 'error' | 'cancelled' | 'not_executed'
  | 'unknown' | 'interrupted' | 'unavailable' | 'stale';

export interface StageDescription {
  label: string;
  summary: string;
  status: StageStatus;
  detail?: string;
}

const LABELS: Record<string, string> = {
  apply_graph_operations: 'Edit graph',
  get_current_graph: 'Read graph',
  get_node_schemas: 'Node schemas',
  validate_graph: 'Validate graph',
  research: 'Research',
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null;
}

function parseJson(text: string): Record<string, unknown> | null {
  try { return asRecord(JSON.parse(text)); } catch { return null; }
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

function prettyDetail(content: string): string {
  try { return truncate(JSON.stringify(JSON.parse(content), null, 2), 4000); }
  catch { return truncate(content, 4000); }
}

function plural(n: number, unit: string): string {
  return `${n} ${unit}${n === 1 ? '' : 's'}`;
}

function opKindCounts(args: Record<string, unknown>): string {
  const counts = new Map<string, number>();
  for (const raw of Array.isArray(args.operations) ? args.operations : []) {
    const kind = String(asRecord(raw)?.op ?? '?');
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  return [...counts].map(([kind, n]) => `${kind} ×${n}`).join(', ');
}

function unknownResult(label: string, detail: string, summary = 'Outcome unknown'): StageDescription {
  return { label, summary, status: 'unknown', detail };
}

/** Never infer a successful batch from its length or receipt order. */
function describeApply(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.apply_graph_operations;
  const kinds = opKindCounts(args);
  if (!result) return { label, summary: kinds || 'applying operations', status: 'running' };

  const detail = prettyDetail(result.content);
  const parsed = parseJson(result.content);
  const expected = Array.isArray(args.operations) ? args.operations.length : 0;
  const receipts = parsed?.results;
  const uncertain = () => unknownResult(label, detail, 'Outcome unknown — invalid or missing operation receipts');
  if (expected === 0 || !Array.isArray(receipts) || receipts.length !== expected) return uncertain();

  const seen = new Set<number>();
  let applied = 0;
  let failed = 0;
  for (const raw of receipts) {
    const receipt = asRecord(raw);
    const index = receipt?.index;
    if (typeof index !== 'number' || !Number.isInteger(index) || index < 0 || index >= expected
      || seen.has(index) || typeof receipt?.ok !== 'boolean') return uncertain();
    seen.add(index);
    if (receipt.ok) applied++; else failed++;
  }

  const parts = [kinds, `${applied} applied`].filter(Boolean);
  if (failed > 0) parts.push(`${failed} failed`);
  const nodes = parsed?.node_count;
  const edges = parsed?.edge_count;
  if (typeof nodes === 'number' && Number.isInteger(nodes) && nodes >= 0
    && typeof edges === 'number' && Number.isInteger(edges) && edges >= 0) {
    parts.push(`${plural(nodes, 'node')} · ${plural(edges, 'edge')}`);
  }
  return { label, summary: parts.join(' — '), status: failed > 0 ? 'error' : 'ok', detail };
}

function describeValidate(result?: ChatTurn): StageDescription {
  const label = LABELS.validate_graph;
  if (!result) return { label, summary: 'checking…', status: 'running' };
  const parsed = parseJson(result.content);
  const detail = prettyDetail(result.content);
  switch (parsed?.status) {
    case 'unavailable': return { label, summary: 'Validation unavailable', status: 'unavailable', detail };
    case 'stale': return { label, summary: 'Validation out of date', status: 'stale', detail };
    case 'not_run': return { label, summary: 'Validation not run', status: 'not_executed', detail };
  }
  const errors = Array.isArray(parsed?.errors) && parsed.errors.every((e) => typeof e === 'string')
    ? parsed.errors as string[] : null;
  if (!errors || (parsed?.status === 'invalid' && parsed.valid === true)
    || (parsed?.status === 'valid' && parsed.valid === false)) {
    return unknownResult(label, detail, 'Validation outcome unknown');
  }
  if (parsed?.valid === true || parsed?.status === 'valid') {
    if (errors.length > 0) return unknownResult(label, detail, 'Validation outcome unknown');
    return { label, summary: 'Structure validated', status: 'ok' };
  }
  if (parsed?.valid === false || parsed?.status === 'invalid') {
    return {
      label, summary: errors.length > 0 ? plural(errors.length, 'issue') : 'Structure has issues', status: 'error',
      detail: errors.length > 0 ? truncate(errors.map((e) => `• ${e}`).join('\n'), 4000) : detail,
    };
  }
  return unknownResult(label, detail, 'Validation outcome unknown');
}

function describeReadGraph(result?: ChatTurn): StageDescription {
  const label = LABELS.get_current_graph;
  if (!result) return { label, summary: 'reading…', status: 'running' };
  const parsed = parseJson(result.content);
  const detail = prettyDetail(result.content);
  if (!Array.isArray(parsed?.nodes) || !Array.isArray(parsed?.edges)) return unknownResult(label, detail);
  return { label, summary: `${plural(parsed.nodes.length, 'node')} · ${plural(parsed.edges.length, 'edge')}`, status: 'ok', detail };
}

function describeSchemas(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.get_node_schemas;
  const types = Array.isArray(args.node_types) ? args.node_types.map(String) : [];
  const summary = types.length > 0 ? truncate(types.join(', '), 90) : 'node types';
  if (!result) return { label, summary, status: 'running' };
  const detail = truncate(result.content, 4000);
  return result.content.trim() ? { label, summary, status: 'ok', detail } : unknownResult(label, detail);
}

function describeResearch(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.research;
  const n = Array.isArray(args.questions) ? args.questions.length : 0;
  const summary = n > 0 ? `${plural(n, 'question')} in parallel` : 'researching';
  if (!result) return { label, summary, status: 'running' };
  const detail = truncate(result.content, 4000);
  return result.content.trim() ? { label, summary, status: 'ok', detail } : unknownResult(label, detail);
}

/** Local terminal metadata takes precedence over the tool payload's appearance. */
export function describeStage(stage: ToolStage, active = false): StageDescription {
  const { call, result } = stage;
  const label = LABELS[call.name] ?? call.name;
  if (!result && !active) return { label, summary: 'Interrupted — no result recorded', status: 'interrupted' };
  if (result) {
    const detail = prettyDetail(result.content);
    const error = parseJson(result.content)?.error;
    switch (result.toolOutcome) {
      case 'cancelled': return { label, summary: 'Stopped', status: 'cancelled', detail };
      case 'not_executed': return { label, summary: 'Not executed', status: 'not_executed', detail };
      case 'unknown': return unknownResult(label, detail);
      case 'error': return { label, summary: typeof error === 'string' ? truncate(error, 120) : 'Tool failed', status: 'error', detail };
    }
    if (typeof error === 'string') return { label, summary: truncate(error, 120), status: 'error', detail };
  }
  const args = asRecord(call.arguments) ?? {};
  switch (call.name) {
    case 'apply_graph_operations': return describeApply(args, result);
    case 'validate_graph': return describeValidate(result);
    case 'get_current_graph': return describeReadGraph(result);
    case 'get_node_schemas': return describeSchemas(args, result);
    case 'research': return describeResearch(args, result);
    default:
      if (!result) return { label, summary: 'running…', status: 'running' };
      return result.content.trim()
        ? { label, summary: 'done', status: 'ok', detail: prettyDetail(result.content) }
        : unknownResult(label, prettyDetail(result.content));
  }
}
