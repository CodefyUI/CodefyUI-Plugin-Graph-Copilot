/**
 * turnStages — display grouping for the staged conversation view.
 *
 * The agent loop persists a flat turn list (user / assistant / tool). For a
 * Claude-Code-style staged display, tool result turns fold into the assistant
 * turn that requested them: each tool call becomes a "stage" whose status is
 * derived from the presence and content of its result turn. The same grouping
 * renders both the live (in-progress) run and committed history, so the layout
 * never reflows when a run finishes.
 */

import type { ChatTurn } from '../state/conversations';
import type { WireToolCall } from '../llm/client';

// ---------------------------------------------------------------------------
// Grouping
// ---------------------------------------------------------------------------

export interface ToolStage {
  call: WireToolCall;
  /** The matching tool-result turn; undefined while the tool is running. */
  result?: ChatTurn;
}

export interface DisplayItem {
  /** Index of the turn in the source list (stable key across re-renders). */
  key: number;
  turn: ChatTurn;
  /** Tool stages under an assistant turn ([] for user turns / plain replies). */
  stages: ToolStage[];
}

/** Group a flat turn list for display. Tool turns attach to the nearest
 *  preceding assistant stage with a matching call id that has no result yet;
 *  orphan tool turns are dropped (they were never rendered standalone). */
export function groupTurns(turns: ChatTurn[]): DisplayItem[] {
  const items: DisplayItem[] = [];

  turns.forEach((turn, i) => {
    if (turn.role === 'tool') {
      for (let j = items.length - 1; j >= 0; j--) {
        const stage = items[j].stages.find(
          (s) => s.call.id === turn.tool_call_id && !s.result,
        );
        if (stage) {
          stage.result = turn;
          return;
        }
      }
      return; // orphan tool turn
    }

    items.push({
      key: i,
      turn,
      stages: (turn.tool_calls ?? []).map((call) => ({ call })),
    });
  });

  return items;
}

// ---------------------------------------------------------------------------
// Stage description (humanized labels / summaries / status)
// ---------------------------------------------------------------------------

export type StageStatus = 'running' | 'ok' | 'error';

export interface StageDescription {
  label: string;
  summary: string;
  status: StageStatus;
  /** Expandable detail text (result payload, errors, ...). */
  detail?: string;
}

const LABELS: Record<string, string> = {
  apply_graph_operations: 'Edit graph',
  get_current_graph: 'Read graph',
  get_node_schemas: 'Node schemas',
  validate_graph: 'Validate graph',
  research: 'Research',
};

function parseJson(text: string): Record<string, unknown> | null {
  try {
    const v = JSON.parse(text) as unknown;
    return v && typeof v === 'object' && !Array.isArray(v)
      ? (v as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

/** "add_node ×2, connect ×1" from the call's operations argument. */
function opKindCounts(args: Record<string, unknown>): string {
  const ops = Array.isArray(args.operations) ? (args.operations as unknown[]) : [];
  const counts = new Map<string, number>();
  for (const raw of ops) {
    const kind = raw && typeof raw === 'object' ? String((raw as Record<string, unknown>).op ?? '?') : '?';
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  return [...counts].map(([kind, n]) => `${kind} ×${n}`).join(', ');
}

function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

/** Pretty-print JSON detail when possible; fall back to the raw text. */
function prettyDetail(content: string): string {
  try {
    return truncate(JSON.stringify(JSON.parse(content), null, 2), 4000);
  } catch {
    return truncate(content, 4000);
  }
}

function plural(n: number, unit: string): string {
  return `${n} ${unit}${n === 1 ? '' : 's'}`;
}

function describeApply(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.apply_graph_operations;
  const kinds = opKindCounts(args);

  if (!result) {
    return { label, summary: kinds || 'applying operations', status: 'running' };
  }

  const parsed = parseJson(result.content);
  if (!parsed) {
    return { label, summary: kinds, status: 'ok', detail: prettyDetail(result.content) };
  }
  if (typeof parsed.error === 'string') {
    return { label, summary: truncate(parsed.error, 120), status: 'error', detail: prettyDetail(result.content) };
  }

  const results = Array.isArray(parsed.results) ? (parsed.results as Array<Record<string, unknown>>) : [];
  const failed = results.filter((r) => !r.ok).length;
  const nodeCount = typeof parsed.node_count === 'number' ? parsed.node_count : null;
  const edgeCount = typeof parsed.edge_count === 'number' ? parsed.edge_count : null;

  const parts: string[] = [];
  if (kinds) parts.push(kinds);
  if (failed > 0) parts.push(`${failed} failed`);
  if (nodeCount !== null && edgeCount !== null) {
    parts.push(`${plural(nodeCount, 'node')} · ${plural(edgeCount, 'edge')}`);
  }

  return {
    label,
    summary: parts.join(' — ') || 'applied',
    status: failed > 0 ? 'error' : 'ok',
    detail: prettyDetail(result.content),
  };
}

function describeValidate(result?: ChatTurn): StageDescription {
  const label = LABELS.validate_graph;
  if (!result) return { label, summary: 'checking…', status: 'running' };

  const parsed = parseJson(result.content);
  const errors = Array.isArray(parsed?.errors) ? (parsed!.errors as unknown[]).map(String) : [];
  if (parsed?.valid) {
    return { label, summary: 'graph is runnable', status: 'ok' };
  }
  return {
    label,
    summary: errors.length > 0 ? plural(errors.length, 'issue') : 'not runnable',
    status: 'error',
    detail: errors.length > 0 ? errors.map((e) => `• ${e}`).join('\n') : prettyDetail(result.content),
  };
}

function describeReadGraph(result?: ChatTurn): StageDescription {
  const label = LABELS.get_current_graph;
  if (!result) return { label, summary: 'reading…', status: 'running' };

  const parsed = parseJson(result.content);
  const nodes = Array.isArray(parsed?.nodes) ? (parsed!.nodes as unknown[]).length : null;
  const edges = Array.isArray(parsed?.edges) ? (parsed!.edges as unknown[]).length : null;
  return {
    label,
    summary: nodes !== null && edges !== null ? `${plural(nodes, 'node')} · ${plural(edges, 'edge')}` : 'snapshot',
    status: 'ok',
    detail: prettyDetail(result.content),
  };
}

function describeSchemas(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.get_node_schemas;
  const types = Array.isArray(args.node_types) ? (args.node_types as unknown[]).map(String) : [];
  const summary = types.length > 0 ? truncate(types.join(', '), 90) : 'node types';
  if (!result) return { label, summary, status: 'running' };
  return { label, summary, status: 'ok', detail: truncate(result.content, 4000) };
}

function describeResearch(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.research;
  const n = Array.isArray(args.questions) ? (args.questions as unknown[]).length : 0;
  const summary = n > 0 ? `${plural(n, 'question')} in parallel` : 'researching';
  if (!result) return { label, summary, status: 'running' };
  return { label, summary, status: 'ok', detail: truncate(result.content, 4000) };
}

function describeGeneric(call: WireToolCall, result?: ChatTurn): StageDescription {
  const label = LABELS[call.name] ?? call.name;
  if (!result) return { label, summary: 'running…', status: 'running' };
  const parsed = parseJson(result.content);
  if (parsed && typeof parsed.error === 'string') {
    return { label, summary: truncate(parsed.error, 120), status: 'error', detail: prettyDetail(result.content) };
  }
  return { label, summary: 'done', status: 'ok', detail: prettyDetail(result.content) };
}

/** Humanize one tool stage for display. Never throws on malformed data. */
export function describeStage(stage: ToolStage): StageDescription {
  const { call, result } = stage;
  const args = (call.arguments ?? {}) as Record<string, unknown>;

  switch (call.name) {
    case 'apply_graph_operations':
      return describeApply(args, result);
    case 'validate_graph':
      return describeValidate(result);
    case 'get_current_graph':
      return describeReadGraph(result);
    case 'get_node_schemas':
      return describeSchemas(args, result);
    case 'research':
      return describeResearch(args, result);
    default:
      return describeGeneric(call, result);
  }
}
