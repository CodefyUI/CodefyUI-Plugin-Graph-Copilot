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
  /** 1-based agent step number among tool-calling rounds, reset at each user
   *  turn — labels each round of a multi-round run. Absent on plain replies. */
  step?: number;
}

/** Fold receipts into the nearest matching call. Orphan receipts stay hidden. */
export function groupTurns(turns: ChatTurn[]): DisplayItem[] {
  const items: DisplayItem[] = [];
  let stepInRun = 0;
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

    if (turn.role === 'user') stepInRun = 0;
    const stages = (turn.tool_calls ?? []).map((call): ToolStage => ({ call }));
    items.push({
      key: i,
      turn,
      stages,
      ...(stages.length > 0 ? { step: ++stepInRun } : {}),
    });
  });
  return items;
}

/** Compact human duration for stage rows: "0.4s", "12s", "2m 05s". */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '';
  if (ms < 10_000) return `${Math.max(ms / 1000, 0.1).toFixed(1)}s`;
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
}

export type StageStatus =
  | 'running' | 'ok' | 'error' | 'cancelled' | 'not_executed'
  | 'unknown' | 'interrupted' | 'unavailable' | 'stale';

export interface StageDescription {
  label: string;
  summary: string;
  status: StageStatus;
  detail?: string;
  /** Playable artifacts a run produced (#310) — rendered without expanding.
   * Only same-origin references survive parsing, so a crafted tool result
   * cannot point the panel at another host. */
  media?: StageMedia[];
}

export interface StageMedia {
  kind: 'video';
  /** Same-origin URL under /api/media, host-served with a real mime. */
  url: string;
  format: string;
  node?: string;
}

/** Only host media endpoints may be embedded; a leading slash alone is unsafe. */
function isMediaUrl(url: string): boolean {
  if (!url.startsWith('/api/media/') || url.length > 2048 || /[\\\u0000- \u007f]/.test(url)) return false;
  try {
    const parsed = new URL(url, 'https://codefyui.invalid');
    const path = decodeURIComponent(parsed.pathname);
    return parsed.origin === 'https://codefyui.invalid' && path.startsWith('/api/media/')
      && !path.includes('\\') && !path.split('/').some((part) => part === '.' || part === '..');
  } catch { return false; }
}

/** Extract bounded renderable, same-origin media references from a run result. */
function stageMedia(parsed: Record<string, unknown>): StageMedia[] {
  const raw = Array.isArray(parsed.media) ? parsed.media : [];
  const items: StageMedia[] = [];
  for (const entry of raw) {
    const item = asRecord(entry);
    if (!item) continue;
    const url = typeof item.url === 'string' ? item.url : '';
    if (item.kind !== 'video' || !isMediaUrl(url)) continue;
    items.push({
      kind: 'video',
      url,
      format: typeof item.format === 'string' ? item.format : 'mp4',
      ...(typeof item.node === 'string' && item.node ? { node: truncate(item.node, 160) } : {}),
    });
    if (items.length >= 24) break;
  }
  return items;
}

const LABELS: Record<string, string> = {
  apply_graph_operations: 'Edit graph',
  get_current_graph: 'Read graph',
  get_node_schemas: 'Node schemas',
  validate_graph: 'Validate graph',
  research: 'Research',
  run_graph: 'Run graph',
  run_graph_experiments: 'Experiment study',
  optimize_graph_parameters: 'Parameter search',
  list_runs: 'Reading run history',
  get_run: 'Reading run details',
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

function describeExperiment(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.run_graph_experiments;
  const variants = Array.isArray(args.variants) ? args.variants.length : 0;
  const repetitions = typeof args.repetitions === 'number' ? args.repetitions : 1;
  const planned = variants > 0 ? `${variants} candidates · ${variants * repetitions} runs` : 'preparing study';
  if (!result) return { label, summary: planned, status: 'running' };
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : 'study failed',
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }
  const winner = typeof parsed.winnerLabel === 'string' ? parsed.winnerLabel : null;
  const applied = typeof parsed.appliedVariantId === 'string';
  return {
    label,
    summary: winner ? `${winner} ranked first${applied ? ' · applied' : ''}` : 'no rankable metric',
    status: winner ? 'ok' : 'error',
    detail: prettyDetail(result.content),
  };
}

function describeOptimizer(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.optimize_graph_parameters;
  const bindings = Array.isArray(args.bindings) ? args.bindings.length : 0;
  const strategy = args.strategy === 'seeded_random' ? 'seeded random' : 'grid';
  const repetitions = typeof args.repetitions === 'number' ? args.repetitions : 1;
  const candidateCount = args.strategy === 'seeded_random' && typeof args.candidate_count === 'number'
    ? args.candidate_count + (args.include_baseline === false ? 0 : 1)
    : undefined;
  const planned = candidateCount
    ? `${strategy} · ${bindings} params · ${candidateCount * repetitions} runs`
    : `${strategy} · ${bindings} ${bindings === 1 ? 'parameter' : 'parameters'}`;
  if (!result) return { label, summary: planned, status: 'running' };
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : 'search failed',
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }
  const winner = typeof parsed.winnerLabel === 'string' ? parsed.winnerLabel : null;
  const applied = typeof parsed.appliedVariantId === 'string';
  return {
    label,
    summary: winner ? `${winner} ranked first${applied ? ' · applied' : ''}` : 'no rankable metric',
    status: winner ? 'ok' : 'error',
    detail: prettyDetail(result.content),
  };
}

function describeRunGraph(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.run_graph;
  const reason = typeof args.reason === 'string' ? truncate(args.reason, 90) : '';
  if (!result) return { label, summary: reason || 'executing…', status: 'running' };
  const detail = prettyDetail(result.content);
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.status !== 'string') return unknownResult(label, detail, 'Run outcome unknown');
  const runStatus = parsed.status;
  if (runStatus === 'detached') return unknownResult(label, detail, 'Detached — host run may still be running');
  let status: StageStatus;
  switch (runStatus) {
    case 'complete': status = 'ok'; break;
    case 'cancelled':
    case 'stopped': status = 'cancelled'; break;
    case 'not_executed': status = 'not_executed'; break;
    case 'error':
    case 'timeout': status = 'error'; break;
    default: return unknownResult(label, detail, `Run outcome unknown — ${truncate(runStatus, 90)}`);
  }
  const parts: string[] = [status === 'cancelled' ? 'Stopped' : status === 'not_executed' ? 'Not executed' : runStatus];
  const completed = parsed.completedNodes;
  const total = parsed.totalNodes;
  if (typeof completed === 'number' && Number.isInteger(completed) && completed >= 0
    && typeof total === 'number' && Number.isInteger(total) && total >= completed) {
    parts.push(`${completed}/${total} nodes`);
  }
  if (typeof parsed.duration_s === 'number' && Number.isFinite(parsed.duration_s) && parsed.duration_s >= 0) {
    parts.push(formatDuration(parsed.duration_s * 1000));
  }
  const media = stageMedia(parsed);
  if (media.length) parts.push(`${media.length} clip${media.length > 1 ? 's' : ''}`);
  return { label, summary: parts.join(' · '), status, detail, ...(media.length ? { media } : {}) };
}

function describeListRuns(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.list_runs;
  const summary = args.active_only === true ? 'active runs' : 'recent runs';
  if (!result) return { label, summary, status: 'running' };

  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : 'could not list runs',
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }

  if (!Array.isArray(parsed.runs)) return unknownResult(label, prettyDetail(result.content), 'Run history outcome unknown');
  return { label, summary: plural(parsed.runs.length, 'run'), status: 'ok', detail: prettyDetail(result.content) };
}

function describeGetRun(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = LABELS.get_run;
  const runId = typeof args.run_id === 'string' ? args.run_id : '';
  if (!result) return { label, summary: runId || 'run', status: 'running' };

  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : 'could not fetch run',
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }

  const run = asRecord(parsed.run);
  if (!run || typeof run.status !== 'string' || !run.status.trim()) {
    return unknownResult(label, prettyDetail(result.content), 'Run details outcome unknown');
  }
  // A successfully fetched failed run is a read receipt, not a new execution.
  return { label, summary: truncate(run.status, 120), status: 'ok', detail: prettyDetail(result.content) };
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
      case 'unknown': return unknownResult(label, detail,
        call.name === 'run_graph' && parseJson(result.content)?.status === 'detached'
          ? 'Detached — host run may still be running' : 'Outcome unknown');
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
    case 'run_graph': return describeRunGraph(args, result);
    case 'run_graph_experiments': return describeExperiment(args, result);
    case 'optimize_graph_parameters': return describeOptimizer(args, result);
    case 'list_runs': return describeListRuns(args, result);
    case 'get_run': return describeGetRun(args, result);
    default:
      if (!result) return { label, summary: 'running…', status: 'running' };
      return result.content.trim()
        ? { label, summary: 'done', status: 'ok', detail: prettyDetail(result.content) }
        : unknownResult(label, prettyDetail(result.content));
  }
}
