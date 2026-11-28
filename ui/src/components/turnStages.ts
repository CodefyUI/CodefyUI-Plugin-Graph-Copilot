/** Display grouping and human-readable receipts for live runs and saved history. */
import type { ChatTurn } from '../state/conversations';
import type { WireToolCall } from '../llm/client';
import { currentLocale, translate } from '../i18n';
import { en, type MessageKey } from '../i18n/en';

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
  | 'running' | 'waiting' | 'ok' | 'error' | 'cancelled' | 'not_executed'
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

const tr = (key: MessageKey, vars?: Record<string, string | number>) => translate(currentLocale(), key, vars);

/** A tool's row label in the panel's language; unknown tools show their name. */
export function toolLabel(name: string): string {
  const key = `tool.${name}` as MessageKey;
  return key in en ? tr(key) : name;
}

/** "3 nodes" / "3 個節點". */
function units(count: number, unit: 'node' | 'edge' | 'param' | 'issue' | 'question' | 'run' | 'clip' | 'candidate' | 'file'): string {
  return tr(`unit.${unit}.${count === 1 ? 'one' : 'many'}` as MessageKey, { count });
}

/** `key=value` pairs of a call's scalar arguments, for the mono line under a
 * tool row. Long values are cut; nested values are named, not printed. */
export function argSummary(args: unknown, max = 90): string {
  const record = asRecord(args);
  if (!record) return '';
  const parts = Object.entries(record).map(([key, value]) => {
    if (typeof value === 'string') return `${key}=${truncate(value.replace(/\s+/g, ' '), 32)}`;
    if (typeof value === 'number' || typeof value === 'boolean') return `${key}=${value}`;
    if (Array.isArray(value)) return `${key}=[${value.length}]`;
    return value === null || value === undefined ? '' : `${key}={…}`;
  }).filter(Boolean);
  return truncate(parts.join(' '), max);
}

/** What an edit did, in one line: "+3 nodes · 4 edges · 1 param". */
export function opsLine(args: unknown): string {
  const ops = asRecord(args)?.operations;
  if (!Array.isArray(ops)) return '';
  const count = (name: string) => ops.filter((op) => asRecord(op)?.op === name).length;
  const parts: string[] = [];
  if (count('clear_graph')) parts.push(tr('stage.ops.cleared'));
  if (count('add_node')) parts.push(`+${units(count('add_node'), 'node')}`);
  if (count('remove_node')) parts.push(`−${units(count('remove_node'), 'node')}`);
  if (count('connect')) parts.push(`+${units(count('connect'), 'edge')}`);
  if (count('remove_edge')) parts.push(`−${units(count('remove_edge'), 'edge')}`);
  if (count('set_params')) parts.push(units(count('set_params'), 'param'));
  return parts.join(' · ');
}

/** P4: the row shows the error's first line; expanding it shows the whole
 * error first, then the receipt (which may be cut at 4000 characters). */
function errorDetail(error: unknown, detail: string): string {
  if (typeof error !== 'string' || !error.trim()) return detail;
  // A short one-line error is already whole in the row's summary.
  if (error.length <= 120 && !error.includes('\n')) return detail;
  return `${truncate(error, 4000)}\n\n${detail}`;
}

/** First line of an error, so a row stays one line tall. */
export function firstLine(text: string): string {
  return text.split(/\r?\n/).find((line) => line.trim())?.trim() ?? '';
}

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


function opKindCounts(args: Record<string, unknown>): string {
  const counts = new Map<string, number>();
  for (const raw of Array.isArray(args.operations) ? args.operations : []) {
    const kind = String(asRecord(raw)?.op ?? '?');
    counts.set(kind, (counts.get(kind) ?? 0) + 1);
  }
  return [...counts].map(([kind, n]) => `${kind} ×${n}`).join(', ');
}

function unknownResult(label: string, detail: string, summary = tr('stage.unknown')): StageDescription {
  return { label, summary, status: 'unknown', detail };
}

/** Never infer a successful batch from its length or receipt order. */
function describeApply(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('apply_graph_operations');
  const kinds = opKindCounts(args);
  if (!result) return { label, summary: kinds || tr('stage.applying'), status: 'running' };

  const detail = prettyDetail(result.content);
  const parsed = parseJson(result.content);
  const expected = Array.isArray(args.operations) ? args.operations.length : 0;
  const receipts = parsed?.results;
  const uncertain = () => unknownResult(label, detail, tr('stage.receiptsUnknown'));
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

  const parts = [kinds, tr('stage.applied', { count: applied })].filter(Boolean);
  if (failed > 0) parts.push(tr('stage.failedOps', { count: failed }));
  const nodes = parsed?.node_count;
  const edges = parsed?.edge_count;
  if (typeof nodes === 'number' && Number.isInteger(nodes) && nodes >= 0
    && typeof edges === 'number' && Number.isInteger(edges) && edges >= 0) {
    parts.push(`${units(nodes, 'node')} · ${units(edges, 'edge')}`);
  }
  return { label, summary: parts.join(' — '), status: failed > 0 ? 'error' : 'ok', detail };
}

function describeValidate(result?: ChatTurn): StageDescription {
  const label = toolLabel('validate_graph');
  if (!result) return { label, summary: tr('stage.checking'), status: 'running' };
  const parsed = parseJson(result.content);
  const detail = prettyDetail(result.content);
  switch (parsed?.status) {
    case 'unavailable': return { label, summary: tr('stage.validation.unavailable'), status: 'unavailable', detail };
    case 'stale': return { label, summary: tr('stage.validation.stale'), status: 'stale', detail };
    case 'not_run': return { label, summary: tr('stage.validation.notRun'), status: 'not_executed', detail };
  }
  const errors = Array.isArray(parsed?.errors) && parsed.errors.every((e) => typeof e === 'string')
    ? parsed.errors as string[] : null;
  if (!errors || (parsed?.status === 'invalid' && parsed.valid === true)
    || (parsed?.status === 'valid' && parsed.valid === false)) {
    return unknownResult(label, detail, tr('stage.validation.unknown'));
  }
  if (parsed?.valid === true || parsed?.status === 'valid') {
    if (errors.length > 0) return unknownResult(label, detail, tr('stage.validation.unknown'));
    return { label, summary: tr('stage.validation.ok'), status: 'ok' };
  }
  if (parsed?.valid === false || parsed?.status === 'invalid') {
    return {
      label, summary: errors.length > 0 ? units(errors.length, 'issue') : tr('stage.validation.issues'), status: 'error',
      detail: errors.length > 0 ? truncate(errors.map((e) => `• ${e}`).join('\n'), 4000) : detail,
    };
  }
  return unknownResult(label, detail, tr('stage.validation.unknown'));
}

function describeReadGraph(result?: ChatTurn): StageDescription {
  const label = toolLabel('get_current_graph');
  if (!result) return { label, summary: tr('stage.reading'), status: 'running' };
  const parsed = parseJson(result.content);
  const detail = prettyDetail(result.content);
  if (!Array.isArray(parsed?.nodes) || !Array.isArray(parsed?.edges)) return unknownResult(label, detail);
  return { label, summary: `${units(parsed.nodes.length, 'node')} · ${units(parsed.edges.length, 'edge')}`, status: 'ok', detail };
}

function describeSchemas(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('get_node_schemas');
  const types = Array.isArray(args.node_types) ? args.node_types.map(String) : [];
  const summary = types.length > 0 ? truncate(types.join(', '), 90) : tr('stage.nodeTypes');
  if (!result) return { label, summary, status: 'running' };
  const detail = truncate(result.content, 4000);
  return result.content.trim() ? { label, summary, status: 'ok', detail } : unknownResult(label, detail);
}

function describeResearch(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('research');
  const n = Array.isArray(args.questions) ? args.questions.length : 0;
  const summary = n > 0 ? tr('stage.research.parallel', { questions: units(n, 'question') }) : tr('stage.research');
  if (!result) return { label, summary, status: 'running' };
  const detail = truncate(result.content, 4000);
  return result.content.trim() ? { label, summary, status: 'ok', detail } : unknownResult(label, detail);
}

function describeExperiment(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('run_graph_experiments');
  const variants = Array.isArray(args.variants) ? args.variants.length : 0;
  const repetitions = typeof args.repetitions === 'number' ? args.repetitions : 1;
  const planned = variants > 0 ? `${units(variants, 'candidate')} · ${units(variants * repetitions, 'run')}` : tr('stage.study.preparing');
  if (!result) return { label, summary: planned, status: 'running' };
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : tr('stage.study.failed'),
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }
  const winner = typeof parsed.winnerLabel === 'string' ? parsed.winnerLabel : null;
  const applied = typeof parsed.appliedVariantId === 'string';
  return {
    label,
    summary: winner ? tr(applied ? 'stage.study.winnerApplied' : 'stage.study.winner', { winner }) : tr('stage.study.noMetric'),
    status: winner ? 'ok' : 'error',
    detail: prettyDetail(result.content),
  };
}

function describeOptimizer(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('optimize_graph_parameters');
  const bindings = Array.isArray(args.bindings) ? args.bindings.length : 0;
  const strategy = args.strategy === 'seeded_random' ? tr('stage.search.seeded') : tr('stage.search.grid');
  const repetitions = typeof args.repetitions === 'number' ? args.repetitions : 1;
  const candidateCount = args.strategy === 'seeded_random' && typeof args.candidate_count === 'number'
    ? args.candidate_count + (args.include_baseline === false ? 0 : 1)
    : undefined;
  const planned = candidateCount
    ? `${strategy} · ${units(bindings, 'param')} · ${units(candidateCount * repetitions, 'run')}`
    : `${strategy} · ${units(bindings, 'param')}`;
  if (!result) return { label, summary: planned, status: 'running' };
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : tr('stage.search.failed'),
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }
  const winner = typeof parsed.winnerLabel === 'string' ? parsed.winnerLabel : null;
  const applied = typeof parsed.appliedVariantId === 'string';
  return {
    label,
    summary: winner ? tr(applied ? 'stage.study.winnerApplied' : 'stage.study.winner', { winner }) : tr('stage.study.noMetric'),
    status: winner ? 'ok' : 'error',
    detail: prettyDetail(result.content),
  };
}

function describeRunGraph(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('run_graph');
  const reason = typeof args.reason === 'string' ? truncate(args.reason, 90) : '';
  if (!result) return { label, summary: reason || tr('stage.executing'), status: 'running' };
  const detail = prettyDetail(result.content);
  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.status !== 'string') return unknownResult(label, detail, tr('stage.run.unknown'));
  const runStatus = parsed.status;
  if (runStatus === 'detached') return unknownResult(label, detail, tr('stage.run.detached'));
  let status: StageStatus;
  switch (runStatus) {
    case 'complete': status = 'ok'; break;
    case 'cancelled':
    case 'stopped': status = 'cancelled'; break;
    case 'not_executed': status = 'not_executed'; break;
    case 'error':
    case 'timeout': status = 'error'; break;
    default: return unknownResult(label, detail, tr('stage.run.unknownStatus', { status: truncate(runStatus, 90) }));
  }
  const parts: string[] = [status === 'cancelled' ? tr('stage.stopped') : status === 'not_executed' ? tr('stage.notExecuted') : status === 'ok' ? tr('stage.run.complete') : runStatus];
  const completed = parsed.completedNodes;
  const total = parsed.totalNodes;
  if (typeof completed === 'number' && Number.isInteger(completed) && completed >= 0
    && typeof total === 'number' && Number.isInteger(total) && total >= completed) {
    parts.push(tr('stage.run.nodes', { completed, total }));
  }
  if (typeof parsed.duration_s === 'number' && Number.isFinite(parsed.duration_s) && parsed.duration_s >= 0) {
    parts.push(formatDuration(parsed.duration_s * 1000));
  }
  const media = stageMedia(parsed);
  if (media.length) parts.push(units(media.length, 'clip'));
  return { label, summary: parts.join(' · '), status, detail, ...(media.length ? { media } : {}) };
}

function describeListRuns(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('list_runs');
  const summary = args.active_only === true ? tr('stage.runs.active') : tr('stage.runs.recent');
  if (!result) return { label, summary, status: 'running' };

  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : tr('stage.runs.failed'),
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }

  if (!Array.isArray(parsed.runs)) return unknownResult(label, prettyDetail(result.content), tr('stage.runs.unknown'));
  return { label, summary: units(parsed.runs.length, 'run'), status: 'ok', detail: prettyDetail(result.content) };
}

function describeGetRun(args: Record<string, unknown>, result?: ChatTurn): StageDescription {
  const label = toolLabel('get_run');
  const runId = typeof args.run_id === 'string' ? args.run_id : '';
  if (!result) return { label, summary: runId || tr('stage.run'), status: 'running' };

  const parsed = parseJson(result.content);
  if (!parsed || typeof parsed.error === 'string') {
    return {
      label,
      summary: typeof parsed?.error === 'string' ? truncate(parsed.error, 120) : tr('stage.run.fetchFailed'),
      status: 'error',
      detail: prettyDetail(result.content),
    };
  }

  const run = asRecord(parsed.run);
  if (!run || typeof run.status !== 'string' || !run.status.trim()) {
    return unknownResult(label, prettyDetail(result.content), tr('stage.run.detailsUnknown'));
  }
  // A successfully fetched failed run is a read receipt, not a new execution.
  return { label, summary: truncate(run.status, 120), status: 'ok', detail: prettyDetail(result.content) };
}

function describeCommit(result?: ChatTurn): StageDescription {
  const label = toolLabel('project_commit');
  if (!result) return { label, summary: tr('stage.running'), status: 'running' };
  const parsed = parseJson(result.content);
  if (parsed?.committed !== true) return unknownResult(label, prettyDetail(result.content));
  const files = Array.isArray(parsed.files) ? parsed.files.length : 0;
  const commit = typeof parsed.commit === 'string' ? parsed.commit : '';
  return { label, summary: [tr('stage.commit.done', { files: units(files, 'file') }), commit].filter(Boolean).join(' · '), status: 'ok', detail: prettyDetail(result.content) };
}

/** Tools that can stop at an approval card (clear and mass removal go through apply_graph_operations). */
export const APPROVAL_TOOLS = new Set(['apply_graph_operations', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'project_commit']);

/** Local terminal metadata takes precedence over the tool payload's appearance. */
export function describeStage(stage: ToolStage, active = false, awaiting = false): StageDescription {
  const { call, result } = stage;
  const label = toolLabel(call.name);
  // U4: a call waiting on an approval card has done nothing yet.
  if (!result && active && awaiting && APPROVAL_TOOLS.has(call.name)) return { label, summary: tr('stage.waiting'), status: 'waiting' };
  if (!result && !active) return { label, summary: tr('stage.interrupted'), status: 'interrupted' };
  if (result) {
    const detail = prettyDetail(result.content);
    const error = parseJson(result.content)?.error;
    switch (result.toolOutcome) {
      case 'cancelled':
        // A declined or outdated approval is "not executed", not a Stop.
        if (parseJson(result.content)?.replan === true || (typeof error === 'string' && /changed while|approval is stale/i.test(error))) return { label, summary: tr('stage.approvalStale'), status: 'not_executed', detail };
        if (typeof error === 'string' && /declined|not approved|did not approve/i.test(error)) return { label, summary: tr('stage.declined'), status: 'not_executed', detail };
        return { label, summary: tr('stage.stopped'), status: 'cancelled', detail };
      case 'not_executed': return { label, summary: tr('stage.notExecuted'), status: 'not_executed', detail };
      case 'unknown': return unknownResult(label, detail,
        call.name === 'run_graph' && parseJson(result.content)?.status === 'detached'
          ? tr('stage.run.detached') : tr('stage.unknown'));
      case 'error': return { label, summary: typeof error === 'string' ? truncate(firstLine(error), 120) : tr('stage.toolFailed'), status: 'error', detail: errorDetail(error, detail) };
    }
    if (typeof error === 'string') return { label, summary: truncate(firstLine(error), 120), status: 'error', detail: errorDetail(error, detail) };
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
    case 'project_commit': return describeCommit(result);
    default:
      if (!result) return { label, summary: tr('stage.running'), status: 'running' };
      return result.content.trim()
        ? { label, summary: tr('stage.done'), status: 'ok', detail: prettyDetail(result.content) }
        : unknownResult(label, prettyDetail(result.content));
  }
}
