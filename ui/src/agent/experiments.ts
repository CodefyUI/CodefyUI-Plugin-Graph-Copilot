import type {
  ApplyResult,
  CodefyUIPluginAPI,
  GraphOp,
  NodeDefinition,
  OpResult,
  ParamDefinition,
  SerializedGraph,
  SerializedGraphEdge,
  SerializedGraphNode,
} from '../types/codefyui';
import { GRAPH_COPILOT_PLUGIN_ID, GRAPH_COPILOT_PLUGIN_VERSION } from '../pluginMetadata';
import { compareToBaseline, studentTCI95 } from './experimentAnalysis';
import { redactToolResultForContext } from './historyRedaction';
import { createPortableStudyCapture } from './studyCapture';
import { saveStudyBundle, StudyStorageError, withRequiredWebLock } from './studyStorage';

export const EXPERIMENTS_STORAGE_KEY = 'experiment-sessions-v1';
export const EXPERIMENTS_CHANGED_EVENT = 'gcp:experiments-changed';
export const MAX_EXPERIMENT_VARIANTS = 8;
export const MAX_EXPERIMENT_RUNS = 16;
const MAX_STORED_EXPERIMENTS = 20;
const DEFAULT_RUN_TIMEOUT_MS = 10 * 60 * 1000;
const EXPERIMENTS_STORAGE_LOCK_NAME = 'graph-copilot.experiment-sessions-v1.lock';

export type ExperimentDirection = 'maximize' | 'minimize';
export type ExperimentStatus = 'completed' | 'partial' | 'failed';

export interface ExperimentObjective {
  /** Exact metric key (`node-id.port`), node-type alias (`Accuracy.accuracy`),
   * a unique suffix (`accuracy`), or `auto`. */
  metric: string;
  direction: ExperimentDirection;
}

export type ExperimentSearchScalar = number | boolean | string;

export interface ExperimentSearchMetadata {
  schemaVersion: 1;
  strategy: 'grid' | 'seeded_random';
  prngVersion?: 'mulberry32-v1';
  plannerSeed?: number;
  seedDescription: string;
  includesBaseline: boolean;
  totalDomainAssignments: number;
  baselineAssignmentExcluded: boolean;
  generatedCandidateCount: number;
  totalVariantCount: number;
  totalExecutionCount: number;
  bindings: Array<{
    nodeId: string;
    nodeType: string;
    param: string;
    paramType: 'int' | 'float' | 'bool' | 'select';
    baselineValue: ExperimentSearchScalar;
    domain: ExperimentSearchScalar[];
  }>;
  assignments: Array<{
    variantId: string;
    domainIndex: number;
    values: Array<{ nodeId: string; param: string; value: ExperimentSearchScalar }>;
  }>;
}

export interface ExperimentVariantInput {
  id?: string;
  label: string;
  /** Applied to an in-memory clone. The live canvas is not touched. */
  operations: GraphOp[];
}

export interface GraphExperimentRequest {
  hypothesis: string;
  objective: ExperimentObjective;
  variants: ExperimentVariantInput[];
  repetitions?: number;
  concurrency?: number;
  /** Promote the deterministic winner only if the live graph still matches
   * the baseline captured before the study. */
  apply_best?: boolean;
  /** Exact deterministic planner output. Generated internally by the bounded
   * optimizer; direct experiment calls omit it. */
  search?: ExperimentSearchMetadata;
}

export interface ExperimentRunRecord {
  /** One-based scheduled repetition index. */
  repetition: number;
  status: 'completed' | 'failed';
  durationMs: number;
  /** Canonical objective identity and value resolved for this exact run. */
  metricKey?: string;
  metricValue?: number;
  metricSource?: 'output_summary' | 'progress' | 'client';
  /** Scalar-only evidence captured from this run; tensors/artifacts are not retained. */
  observedMetrics: Record<string, number>;
  /** Canonical metric identity and collection source for every observed scalar.
   * Optional only for summaries written before portable study capture existed. */
  observedMetricIdentities?: Record<string, string>;
  observedMetricSources?: Record<string, 'output_summary' | 'progress' | 'client'>;
  error?: string;
}

export interface ConfidenceInterval {
  level: 0.95;
  lower: number;
  upper: number;
}

export interface BaselineComparison {
  baselineId: string;
  /** Candidate mean minus baseline mean, independent of objective direction. */
  meanDelta: number;
  /** Positive means the candidate improved in the requested direction. */
  objectiveImprovement: number;
  /** Small-sample corrected standardized difference; descriptive, not a test. */
  hedgesG?: number;
}

export interface ExperimentVariantResult {
  id: string;
  label: string;
  status: 'completed' | 'invalid' | 'failed';
  metricKey?: string;
  metricValues: number[];
  mean?: number;
  stddev?: number;
  confidenceInterval95?: ConfidenceInterval;
  baselineComparison?: BaselineComparison;
  runtimeMs: number;
  observedMetrics: Record<string, number>;
  /** Immutable scalar evidence for each attempted repetition. New studies
   * always populate this; it is optional for legacy browser summaries. */
  runs?: ExperimentRunRecord[];
  /** Reviewable, value-free diff summary. Parameter values may contain
   * secrets, so raw GraphOps are intentionally not persisted. */
  operationSummary?: string[];
  errors: string[];
}

export interface PaperIdea {
  title: string;
  evidence: string;
  nextStep: string;
}

export interface ExperimentInsights {
  summary: string[];
  warnings: string[];
  paperIdeas: PaperIdea[];
}

export interface ExperimentSession {
  id: string;
  createdAt: string;
  hypothesis: string;
  objective: ExperimentObjective;
  repetitions: number;
  status: ExperimentStatus;
  variants: ExperimentVariantResult[];
  baselineVariantId?: string;
  search?: ExperimentSearchMetadata;
  winnerId?: string;
  winnerLabel?: string;
  appliedVariantId?: string;
  applyConflict?: string;
  insights: ExperimentInsights;
}

/** Runtime-only fields are not persisted or returned as experiment evidence. */
export interface GraphExperimentResult extends ExperimentSession {
  applyResult?: ApplyResult;
  appliedOperations?: GraphOp[];
}

interface PreparedVariant {
  input: Required<Pick<ExperimentVariantInput, 'label' | 'operations'>> & { id: string };
  graph: SerializedGraph;
  preparationErrors: string[];
  validationErrors: string[];
}

interface RunObservation {
  metrics: Record<string, number>;
  metricIdentities: Record<string, string>;
  metricSources: Record<string, 'output_summary' | 'progress' | 'client'>;
  durationMs: number;
  error?: string;
}

/** Preserve the evidence collected before an isolated backend execution
 * failed. The coordinator unwraps this without retrying the candidate. */
class ExperimentExecutionError extends Error {
  readonly observation: Omit<RunObservation, 'error'>;

  constructor(error: Error, observation: Omit<RunObservation, 'error'>) {
    super(error.message);
    this.name = error.name;
    this.observation = observation;
  }
}

function clone<T>(value: T): T {
  if (value === undefined) return value;
  return JSON.parse(JSON.stringify(value)) as T;
}

function persistenceErrorDetail(error: unknown): string {
  const primary = String(error);
  return error instanceof StudyStorageError && error.causeValue !== undefined
    ? `${primary}: ${String(error.causeValue)}`
    : primary;
}

function newId(prefix: string): string {
  const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${prefix}-${suffix}`;
}

function finiteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function mean(values: number[]): number | undefined {
  if (values.length === 0) return undefined;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function stddev(values: number[]): number | undefined {
  if (values.length < 2) return undefined;
  const avg = mean(values)!;
  return Math.sqrt(values.reduce((sum, value) => sum + (value - avg) ** 2, 0) / (values.length - 1));
}

function graphFingerprint(graph: SerializedGraph): string {
  return JSON.stringify({
    nodes: graph.nodes,
    edges: graph.edges,
    presets: graph.presets ?? [],
  });
}

function executableGraph(graph: SerializedGraph): SerializedGraph {
  const nodes = graph.nodes.filter((node) => node.type !== 'note');
  const ids = new Set(nodes.map((node) => node.id));
  return {
    ...graph,
    nodes,
    edges: graph.edges.filter((edge) =>
      typeof edge.source === 'string'
      && typeof edge.target === 'string'
      && ids.has(edge.source)
      && ids.has(edge.target)),
  };
}

function defaultParams(def: NodeDefinition): Record<string, unknown> {
  return Object.fromEntries(def.params.map((param) => [param.name, clone(param.default)]));
}

function validateParamValue(param: ParamDefinition, value: unknown): string | undefined {
  if (param.param_type === 'int' && (typeof value !== 'number' || !Number.isInteger(value))) {
    return `Parameter '${param.name}' must be an integer`;
  }
  if (param.param_type === 'float' && (typeof value !== 'number' || Number.isNaN(value))) {
    return `Parameter '${param.name}' must be a number`;
  }
  if (param.param_type === 'bool' && typeof value !== 'boolean') {
    return `Parameter '${param.name}' must be a boolean`;
  }
  if (param.param_type === 'string' && typeof value !== 'string') {
    return `Parameter '${param.name}' must be a string`;
  }
  if (
    param.param_type === 'select'
    && (typeof value !== 'string' || !param.options.includes(value))
  ) {
    return `Parameter '${param.name}' must be one of: ${param.options.join(', ')}`;
  }
  if (
    (param.param_type === 'int' || param.param_type === 'float')
    && typeof value === 'number'
  ) {
    if (param.min_value !== null && value < param.min_value) {
      return `Parameter '${param.name}' must be >= ${param.min_value}`;
    }
    if (param.max_value !== null && value > param.max_value) {
      return `Parameter '${param.name}' must be <= ${param.max_value}`;
    }
  }
  return undefined;
}

function validateParams(definition: NodeDefinition, params: unknown): string | undefined {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    return 'params must be an object';
  }
  const byName = new Map(definition.params.map((param) => [param.name, param]));
  for (const [name, value] of Object.entries(params as Record<string, unknown>)) {
    const param = byName.get(name);
    if (!param) {
      return `Unknown parameter '${name}' for node type '${definition.node_name}'`;
    }
    const error = validateParamValue(param, value);
    if (error) return error;
  }
  return undefined;
}

function summarizeOperations(operations: GraphOp[]): string[] {
  return operations.map((operation) => {
    switch (operation.op) {
      case 'add_node':
        return `add ${operation.node_type}${operation.params ? ` (${Object.keys(operation.params).join(', ') || 'defaults'})` : ''}`;
      case 'set_params':
        return `set ${operation.node_id}: ${Object.keys(operation.params).join(', ') || 'no parameters'}`;
      case 'connect':
        return `connect ${operation.source}.${operation.source_handle} -> ${operation.target}.${operation.target_handle}`;
      case 'remove_node':
        return `remove node ${operation.node_id}`;
      case 'remove_edge':
        return `remove edge ${operation.source} -> ${operation.target}`;
      case 'clear_graph':
        return 'clear graph';
      case 'auto_layout':
        return 'auto layout';
    }
  });
}

/**
 * Apply CodefyUI GraphOps to a serialized clone without touching the canvas.
 * Server validation remains authoritative; this reducer's job is isolation.
 */
export function applyOperationsToClone(
  baseline: SerializedGraph,
  operations: GraphOp[],
  definitions: NodeDefinition[],
): { graph: SerializedGraph; results: OpResult[]; refs: Record<string, string> } {
  const graph = clone(baseline);
  const refs: Record<string, string> = {};
  const results: OpResult[] = [];
  const defs = new Map(definitions.map((def) => [def.node_name, def]));

  const resolve = (idOrRef: string): string | undefined => {
    const id = refs[idOrRef] ?? idOrRef;
    return graph.nodes.some((node) => node.id === id) ? id : undefined;
  };
  const fail = (index: number, error: string) => results.push({ index, ok: false, error });

  operations.forEach((operation, index) => {
    if (!operation || typeof operation !== 'object' || typeof (operation as { op?: unknown }).op !== 'string') {
      fail(index, 'Operation must be an object with an op field');
      return;
    }
    switch (operation.op) {
      case 'add_node': {
        const def = defs.get(operation.node_type);
        if (!def) {
          fail(index, `Unknown node type '${operation.node_type}'`);
          return;
        }
        if (operation.params !== undefined) {
          const paramsError = validateParams(def, operation.params);
          if (paramsError) {
            fail(index, `add_node: ${paramsError}`);
            return;
          }
        }
        const id = newId('candidate-node');
        const node: SerializedGraphNode = {
          id,
          type: operation.node_type,
          position: operation.position ?? {
            x: 160 + (graph.nodes.length % 4) * 240,
            y: 120 + Math.floor(graph.nodes.length / 4) * 160,
          },
          data: { params: { ...defaultParams(def), ...(operation.params ?? {}) } },
        };
        graph.nodes.push(node);
        if (operation.ref) refs[operation.ref] = id;
        results.push({ index, ok: true, node_id: id });
        return;
      }
      case 'set_params': {
        const id = resolve(operation.node_id);
        if (!id) {
          fail(index, `set_params: unknown node '${operation.node_id}'`);
          return;
        }
        const node = graph.nodes.find((candidate) => candidate.id === id)!;
        const definition = typeof node.type === 'string' ? defs.get(node.type) : undefined;
        if (!definition) {
          fail(index, `set_params: node '${operation.node_id}' has no known definition`);
          return;
        }
        const paramsError = validateParams(definition, operation.params);
        if (paramsError) {
          fail(index, `set_params: ${paramsError}`);
          return;
        }
        node.data = {
          ...(node.data ?? {}),
          params: { ...(node.data?.params ?? {}), ...clone(operation.params) },
        };
        results.push({ index, ok: true, node_id: id });
        return;
      }
      case 'connect': {
        const source = resolve(operation.source);
        const target = resolve(operation.target);
        if (!source || !target) {
          fail(index, `connect: unknown ${!source ? 'source' : 'target'} node`);
          return;
        }
        const trigger = operation.source_handle === 'trigger';
        const edge: SerializedGraphEdge = {
          id: newId('candidate-edge'),
          source,
          target,
          sourceHandle: operation.source_handle,
          targetHandle: trigger ? '__trigger' : operation.target_handle,
          ...(trigger ? { type: 'trigger' as const } : {}),
        };
        graph.edges.push(edge);
        results.push({ index, ok: true });
        return;
      }
      case 'remove_node': {
        const id = resolve(operation.node_id);
        if (!id) {
          fail(index, `remove_node: unknown node '${operation.node_id}'`);
          return;
        }
        graph.nodes = graph.nodes.filter((node) => node.id !== id);
        graph.edges = graph.edges.filter((edge) => edge.source !== id && edge.target !== id);
        results.push({ index, ok: true });
        return;
      }
      case 'remove_edge': {
        const source = resolve(operation.source);
        const target = resolve(operation.target);
        if (!source || !target) {
          fail(index, 'remove_edge: unknown source or target node');
          return;
        }
        const before = graph.edges.length;
        graph.edges = graph.edges.filter((edge) => !(
          edge.source === source
          && edge.target === target
          && (operation.source_handle === undefined || edge.sourceHandle === operation.source_handle)
          && (operation.target_handle === undefined || edge.targetHandle === operation.target_handle)
        ));
        if (before === graph.edges.length) fail(index, 'remove_edge: no matching edge');
        else results.push({ index, ok: true });
        return;
      }
      case 'clear_graph':
        graph.nodes = [];
        graph.edges = [];
        Object.keys(refs).forEach((key) => delete refs[key]);
        results.push({ index, ok: true });
        return;
      case 'auto_layout':
        graph.nodes.forEach((node, nodeIndex) => {
          node.position = {
            x: 120 + (nodeIndex % 4) * 260,
            y: 100 + Math.floor(nodeIndex / 4) * 180,
          };
        });
        results.push({ index, ok: true });
        return;
      default:
        fail(index, `Unknown operation '${(operation as { op?: string }).op ?? ''}'`);
    }
  });

  return { graph, results, refs };
}

async function validateCandidate(
  api: CodefyUIPluginAPI,
  graph: SerializedGraph,
  signal?: AbortSignal,
): Promise<string[]> {
  try {
    const candidate = executableGraph(graph);
    const response = await api.http.fetch('/api/graph/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        nodes: candidate.nodes,
        edges: candidate.edges,
        presets: candidate.presets ?? [],
      }),
    });
    if (!response.ok) return [`Validation request failed: HTTP ${response.status}`];
    const body = await response.json() as { valid?: unknown; errors?: unknown };
    const errors = Array.isArray(body.errors) ? body.errors.map(String) : [];
    if (body.valid !== true) {
      return errors.length > 0 ? errors : ['Graph validation returned an invalid or malformed result'];
    }
    return errors.length === 0
      ? []
      : ['Graph validation returned valid=true together with errors', ...errors];
  } catch (error) {
    if (signal?.aborted) throw new DOMException('Experiment cancelled', 'AbortError');
    return [`Validation request failed: ${String(error)}`];
  }
}

async function executionToken(api: CodefyUIPluginAPI, signal?: AbortSignal): Promise<string> {
  const response = await api.http.fetch('/api/auth/bootstrap', { signal });
  if (!response.ok) throw new Error(`Execution auth bootstrap failed: HTTP ${response.status}`);
  const body = await response.json() as { token?: unknown };
  if (typeof body.token !== 'string' || !body.token) {
    throw new Error('Execution auth bootstrap returned no token');
  }
  return body.token;
}

function executionUrl(token: string): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const url = new URL(`${protocol}//${window.location.host}/ws/execution`);
  url.searchParams.set('token', token);
  return url.toString();
}

function scrubExecutionCredential(message: string, token: string): string {
  let scrubbed = message;
  const representations = [...new Set([token, encodeURIComponent(token)])]
    .filter((value) => value.length > 0)
    .sort((left, right) => right.length - left.length);
  for (const value of representations) scrubbed = scrubbed.split(value).join('[REDACTED]');
  return scrubbed;
}

function collectSummaryMetrics(
  graph: SerializedGraph,
  nodeId: string,
  summary: unknown,
  metrics: Record<string, number>,
  identities: Record<string, string>,
  sources: Record<string, 'output_summary' | 'progress' | 'client'>,
): void {
  if (!summary || typeof summary !== 'object') return;
  const node = graph.nodes.find((item) => item.id === nodeId);
  const sameTypeCount = node
    ? graph.nodes.filter((item) => item.type === node.type).length
    : 0;
  for (const [port, raw] of Object.entries(summary as Record<string, unknown>)) {
    if (!raw || typeof raw !== 'object') continue;
    const value = finiteNumber((raw as Record<string, unknown>).value);
    if (value === undefined) continue;
    const nodeKey = `${nodeId}.${port}`;
    const canonicalKey = node?.type && sameTypeCount === 1 ? `${node.type}.${port}` : nodeKey;
    metrics[nodeKey] = value;
    identities[nodeKey] = canonicalKey;
    sources[nodeKey] = 'output_summary';
    if (node?.type && sameTypeCount === 1) {
      metrics[canonicalKey] = value;
      identities[canonicalKey] = canonicalKey;
      sources[canonicalKey] = 'output_summary';
    }
  }
}

function collectProgressMetrics(
  graph: SerializedGraph,
  nodeId: string,
  progress: unknown,
  metrics: Record<string, number>,
  identities: Record<string, string>,
  sources: Record<string, 'output_summary' | 'progress' | 'client'>,
): void {
  if (!progress || typeof progress !== 'object') return;
  const node = graph.nodes.find((item) => item.id === nodeId);
  const sameTypeCount = node
    ? graph.nodes.filter((item) => item.type === node.type).length
    : 0;
  for (const [name, raw] of Object.entries(progress as Record<string, unknown>)) {
    const value = finiteNumber(raw);
    if (value === undefined) continue;
    const nodeKey = `${nodeId}.progress.${name}`;
    const canonicalKey = node?.type && sameTypeCount === 1
      ? `${node.type}.progress.${name}`
      : nodeKey;
    metrics[nodeKey] = value;
    identities[nodeKey] = canonicalKey;
    sources[nodeKey] = 'progress';
    if (node?.type && sameTypeCount === 1) {
      metrics[canonicalKey] = value;
      identities[canonicalKey] = canonicalKey;
      sources[canonicalKey] = 'progress';
    }
  }
}

/** Execute one isolated serialized graph through CodefyUI's existing backend
 * execution socket. This is available in stable 1.3.0 and does not mutate or
 * save a graph in the editor. */
export function executeCandidateGraph(
  graph: SerializedGraph,
  token: string,
  signal?: AbortSignal,
  timeoutMs = DEFAULT_RUN_TIMEOUT_MS,
): Promise<RunObservation> {
  const candidate = executableGraph(graph);
  const startedAt = Date.now();
  return new Promise<RunObservation>((resolve, reject) => {
    const socket = new WebSocket(executionUrl(token));
    const metrics: Record<string, number> = {};
    const metricIdentities: Record<string, string> = {};
    const metricSources: Record<string, 'output_summary' | 'progress' | 'client'> = {};
    let settled = false;

    const finish = (error?: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close();
      }
      const durationMs = Date.now() - startedAt;
      metrics['system.runtime_ms'] = durationMs;
      metricIdentities['system.runtime_ms'] = 'system.runtime_ms';
      metricSources['system.runtime_ms'] = 'client';
      const observation = { metrics, metricIdentities, metricSources, durationMs };
      if (error) {
        // Cancellation is control flow, not experiment evidence. Preserve its
        // exact DOMException behavior so the coordinator still aborts the
        // whole study immediately.
        if (error instanceof DOMException && error.name === 'AbortError') reject(error);
        else reject(new ExperimentExecutionError(error, observation));
      } else resolve(observation);
    };
    const onAbort = () => finish(new DOMException('Experiment cancelled', 'AbortError'));
    const timer = setTimeout(
      () => finish(new Error(`Experiment run timed out after ${Math.round(timeoutMs / 1000)}s`)),
      timeoutMs,
    );

    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) {
      onAbort();
      return;
    }

    socket.onopen = () => {
      socket.send(JSON.stringify({
        action: 'execute',
        nodes: candidate.nodes,
        edges: candidate.edges,
        presets: candidate.presets ?? [],
        run_id: newId('gcp-experiment-run'),
        // Scalar summaries arrive on node_status regardless. Avoid retaining
        // full tensors for every candidate in CodefyUI's in-memory run store.
        record_outputs: false,
        graph_id: newId('gcp-experiment-graph'),
        weights_persistent: false,
      }));
    };
    socket.onmessage = (event) => {
      let message: Record<string, unknown>;
      try {
        message = JSON.parse(String(event.data)) as Record<string, unknown>;
      } catch {
        return;
      }
      const type = String(message.type ?? '');
      if (type === 'node_status') {
        const nodeId = String(message.node_id ?? '');
        collectSummaryMetrics(candidate, nodeId, message.output_summary, metrics, metricIdentities, metricSources);
        collectProgressMetrics(candidate, nodeId, message.progress, metrics, metricIdentities, metricSources);
      } else if (type === 'execution_complete') {
        finish();
      } else if (type === 'execution_error' || type === 'execution_stopped' || type === 'error') {
        finish(new Error(String(message.error ?? type)));
      }
    };
    socket.onerror = () => finish(new Error('Experiment execution WebSocket failed'));
    socket.onclose = () => {
      if (!settled) finish(new Error('Experiment execution WebSocket closed before completion'));
    };
  }).catch((error: unknown) => {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    if (error instanceof ExperimentExecutionError) {
      const safeError = new Error(scrubExecutionCredential(error.message, token));
      safeError.name = error.name;
      throw new ExperimentExecutionError(safeError, error.observation);
    }
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(scrubExecutionCredential(message, token));
  });
}

function normalizeMetric(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '');
}

export function resolveObjectiveMetric(
  metrics: Record<string, number>,
  objective: ExperimentObjective,
  identities: Record<string, string> = {},
): { key: string; value: number; observedKey: string } | undefined {
  const entries = Object.entries(metrics).filter(([, value]) => Number.isFinite(value));
  if (entries.length === 0) return undefined;
  const resolved = (entry: [string, number]) => ({
    key: identities[entry[0]] ?? entry[0],
    value: entry[1],
    observedKey: entry[0],
  });
  const oneIdentity = (matches: Array<[string, number]>) => {
    const canonical = new Set(matches.map(([key]) => identities[key] ?? key));
    return canonical.size === 1 && matches.length > 0 ? resolved(matches[0]) : undefined;
  };
  const selector = objective.metric.trim();
  const exact = entries.find(([key]) => key === selector)
    ?? entries.find(([key]) => key.toLowerCase() === selector.toLowerCase());
  if (exact) return resolved(exact);

  if (selector && selector.toLowerCase() !== 'auto') {
    const normalized = normalizeMetric(selector);
    const matches = entries.filter(([key]) => {
      const candidate = normalizeMetric(key);
      return candidate === normalized || candidate.endsWith(`.${normalized}`);
    });
    return oneIdentity(matches);
  }

  const preferred = objective.direction === 'maximize'
    ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i
    : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i;
  const preferredMatches = entries.filter(([key]) => preferred.test(key));
  if (preferredMatches.length > 0) return oneIdentity(preferredMatches);
  return objective.direction === 'minimize'
    ? oneIdentity(entries.filter(([key]) => /(^|\.)runtime_ms$/i.test(key)))
    : undefined;
}

async function mapLimit<T, R>(
  values: T[],
  limit: number,
  worker: (value: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, values.length) }, async () => {
    while (cursor < values.length) {
      const index = cursor++;
      results[index] = await worker(values[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

function aggregateObservedMetrics(observations: RunObservation[]): Record<string, number> {
  const values = new Map<string, number[]>();
  for (const observation of observations) {
    for (const [key, value] of Object.entries(observation.metrics)) {
      if (!values.has(key)) values.set(key, []);
      values.get(key)!.push(value);
    }
  }
  return Object.fromEntries(
    [...values.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 40)
      .map(([key, samples]) => [key, mean(samples)!]),
  );
}

function controlledFactor(request: GraphExperimentRequest): string | undefined {
  const baselineCount = request.variants.filter((variant) => variant.operations.length === 0).length;
  const changed = request.variants.filter((variant) => variant.operations.length > 0);
  if (baselineCount !== 1 || changed.length === 0) return undefined;
  let factor: string | undefined;
  for (const variant of changed) {
    if (variant.operations.length !== 1) return undefined;
    const operation = variant.operations[0];
    if (operation.op !== 'set_params') return undefined;
    const names = Object.keys(operation.params);
    if (names.length !== 1) return undefined;
    const candidate = `${operation.node_id}.${names[0]}`;
    if (factor && factor !== candidate) return undefined;
    factor = candidate;
  }
  return factor;
}

function buildInsights(
  request: GraphExperimentRequest,
  variants: ExperimentVariantResult[],
  winner?: ExperimentVariantResult,
  tied: ExperimentVariantResult[] = [],
): ExperimentInsights {
  const summary: string[] = [];
  const warnings: string[] = [];
  const paperIdeas: PaperIdea[] = [];
  const factor = controlledFactor(request);
  if (tied.length > 1) {
    summary.push(
      `No unique winner: ${tied.map((variant) => variant.label).join(', ')} tied at ${tied[0].mean!.toPrecision(6)}.`,
    );
    warnings.push('Automatic promotion was skipped because the top observed means were tied.');
  } else if (winner?.mean !== undefined) {
    summary.push(
      `${winner.label} has the top observed mean at ${winner.mean.toPrecision(6)} `
      + `(${request.objective.direction} ${winner.metricKey ?? request.objective.metric}).`,
    );
    if (winner.confidenceInterval95) {
      summary.push(
        `Its descriptive 95% Student-t interval is [`
        + `${winner.confidenceInterval95.lower.toPrecision(5)}, `
        + `${winner.confidenceInterval95.upper.toPrecision(5)}].`,
      );
    }
    if (winner.baselineComparison) {
      const effect = winner.baselineComparison.hedgesG === undefined
        ? ''
        : `; Hedges g=${winner.baselineComparison.hedgesG.toPrecision(4)}`;
      summary.push(
        `Versus baseline, the direction-adjusted mean change is `
        + `${winner.baselineComparison.objectiveImprovement.toPrecision(5)}${effect}.`,
      );
    }
    const ranked = variants
      .filter((variant) => variant.mean !== undefined)
      .sort((a, b) => request.objective.direction === 'maximize'
        ? b.mean! - a.mean!
        : a.mean! - b.mean!);
    if (ranked.length > 1) {
      const delta = Math.abs(ranked[0].mean! - ranked[1].mean!);
      summary.push(`The lead over the runner-up is ${delta.toPrecision(4)}.`);
    }
    if (factor) {
      paperIdeas.push({
        title: `Controlled parameter study: ${factor}`,
        evidence: `A one-factor pilot found the top observed mean for ${winner.label} across ${request.repetitions ?? 1} repeated execution(s).`,
        nextStep: 'Add an explicit seed schedule, report confidence intervals, and test on a held-out dataset.',
      });
    } else {
      paperIdeas.push({
        title: `Replication study for ${request.objective.metric}`,
        evidence: `${winner.label} has the top observed mean, but the variants are not proven to be a controlled one-factor ablation.`,
        nextStep: 'Create a baseline and one-factor variants, add controlled seeds, then repeat on held-out data.',
      });
    }
  } else if (tied.length === 0) {
    const incomparable = variants.some((variant) =>
      variant.errors.some((error) => error.includes('cross-candidate ranking was refused')));
    warnings.push(incomparable
      ? 'Candidates exposed different objective metric identities, so no cross-candidate ranking was valid.'
      : `No candidate exposed the requested numeric metric '${request.objective.metric}'.`);
  }
  if ((request.repetitions ?? 1) < 3) {
    warnings.push('This is a pilot comparison, not paper-grade evidence; use at least 3-5 controlled independent seeds.');
  } else {
    warnings.push('Repetitions reused each candidate graph. Treat them as independent seeds only when the graph contains an explicit seed schedule.');
  }
  if (variants.some((variant) => variant.confidenceInterval95 || variant.baselineComparison?.hedgesG !== undefined)) {
    warnings.push(
      'Confidence intervals and Hedges g are descriptive screening statistics here; no hypothesis test, multiple-comparison correction, or causal claim was performed.',
    );
  }
  const failed = variants.filter((variant) => variant.status !== 'completed');
  if (failed.length > 0) warnings.push(`${failed.length} candidate(s) were invalid or failed during execution.`);
  const unstable = variants.filter((variant) =>
    variant.mean !== undefined
    && variant.stddev !== undefined
    && Math.abs(variant.mean) > 0
    && variant.stddev / Math.abs(variant.mean) > 0.1);
  if (unstable.length > 0) {
    warnings.push(`High run-to-run variation detected for: ${unstable.map((item) => item.label).join(', ')}.`);
    paperIdeas.push({
      title: 'Sensitivity and stability analysis',
      evidence: 'At least one candidate has a coefficient of variation above 10% in this pilot.',
      nextStep: 'Increase repetitions and test whether initialization, data order, or hyperparameters explain the variance.',
    });
  }
  return { summary, warnings, paperIdeas };
}

function publicSession(result: GraphExperimentResult): ExperimentSession {
  const { applyResult: _applyResult, appliedOperations: _appliedOperations, ...session } = result;
  return session;
}

function parseStoredSession(value: unknown): ExperimentSession | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const session = value as Partial<ExperimentSession>;
  if (
    typeof session.id !== 'string'
    || typeof session.createdAt !== 'string'
    || typeof session.hypothesis !== 'string'
    || !session.objective
    || typeof session.objective.metric !== 'string'
    || !['maximize', 'minimize'].includes(session.objective.direction)
    || typeof session.repetitions !== 'number'
    || !Number.isInteger(session.repetitions)
    || !Array.isArray(session.variants)
  ) {
    return undefined;
  }
  const variants = session.variants.filter((variant): variant is ExperimentVariantResult => (
    !!variant
    && typeof variant === 'object'
    && typeof variant.id === 'string'
    && typeof variant.label === 'string'
    && ['completed', 'invalid', 'failed'].includes(variant.status)
    && Array.isArray(variant.metricValues)
    && variant.metricValues.every((item) => typeof item === 'number' && Number.isFinite(item))
    && (variant.metricKey === undefined || typeof variant.metricKey === 'string')
    && (variant.mean === undefined || (typeof variant.mean === 'number' && Number.isFinite(variant.mean)))
    && (variant.stddev === undefined || (typeof variant.stddev === 'number' && Number.isFinite(variant.stddev)))
    && (
      variant.confidenceInterval95 === undefined
      || (
        variant.confidenceInterval95.level === 0.95
        && typeof variant.confidenceInterval95.lower === 'number'
        && Number.isFinite(variant.confidenceInterval95.lower)
        && typeof variant.confidenceInterval95.upper === 'number'
        && Number.isFinite(variant.confidenceInterval95.upper)
      )
    )
    && (
      variant.baselineComparison === undefined
      || (
        typeof variant.baselineComparison.baselineId === 'string'
        && typeof variant.baselineComparison.meanDelta === 'number'
        && Number.isFinite(variant.baselineComparison.meanDelta)
        && typeof variant.baselineComparison.objectiveImprovement === 'number'
        && Number.isFinite(variant.baselineComparison.objectiveImprovement)
        && (
          variant.baselineComparison.hedgesG === undefined
          || (typeof variant.baselineComparison.hedgesG === 'number'
            && Number.isFinite(variant.baselineComparison.hedgesG))
        )
      )
    )
    && typeof variant.runtimeMs === 'number'
    && Number.isFinite(variant.runtimeMs)
    && !!variant.observedMetrics
    && typeof variant.observedMetrics === 'object'
    && Array.isArray(variant.errors)
    && variant.errors.every((item) => typeof item === 'string')
    && (
      variant.runs === undefined
      || (
        Array.isArray(variant.runs)
        && variant.runs.every((run) => (
          !!run
          && typeof run === 'object'
          && Number.isInteger(run.repetition)
          && run.repetition >= 1
          && ['completed', 'failed'].includes(run.status)
          && typeof run.durationMs === 'number'
          && Number.isFinite(run.durationMs)
          && (run.metricKey === undefined || typeof run.metricKey === 'string')
          && (run.metricValue === undefined
            || (typeof run.metricValue === 'number' && Number.isFinite(run.metricValue)))
          && (run.metricSource === undefined
            || ['output_summary', 'progress', 'client'].includes(run.metricSource))
          && !!run.observedMetrics
          && typeof run.observedMetrics === 'object'
          && Object.values(run.observedMetrics).every((metric) => (
            typeof metric === 'number' && Number.isFinite(metric)
          ))
          && (
            run.observedMetricIdentities === undefined
            || (
              !!run.observedMetricIdentities
              && typeof run.observedMetricIdentities === 'object'
              && Object.values(run.observedMetricIdentities).every((identity) => typeof identity === 'string')
              && Object.keys(run.observedMetricIdentities).every((key) => key in run.observedMetrics)
            )
          )
          && (
            run.observedMetricSources === undefined
            || (
              !!run.observedMetricSources
              && typeof run.observedMetricSources === 'object'
              && Object.values(run.observedMetricSources).every((source) => (
                ['output_summary', 'progress', 'client'].includes(source)
              ))
              && Object.keys(run.observedMetricSources).every((key) => key in run.observedMetrics)
            )
          )
          && (run.error === undefined || typeof run.error === 'string')
        ))
      )
    )
    && (
      variant.operationSummary === undefined
      || (Array.isArray(variant.operationSummary) && variant.operationSummary.every((item) => typeof item === 'string'))
    )
  ));
  const insights = session.insights && typeof session.insights === 'object'
    ? session.insights
    : { summary: [], warnings: [], paperIdeas: [] };
  return {
    ...session,
    status: ['completed', 'partial', 'failed'].includes(session.status ?? '')
      ? session.status as ExperimentStatus
      : 'failed',
    repetitions: session.repetitions!,
    objective: session.objective,
    variants,
    baselineVariantId: typeof session.baselineVariantId === 'string'
      ? session.baselineVariantId
      : undefined,
    search: isExperimentSearchMetadata(session.search) ? session.search : undefined,
    insights: {
      summary: Array.isArray(insights.summary) ? insights.summary.filter((item): item is string => typeof item === 'string') : [],
      warnings: Array.isArray(insights.warnings) ? insights.warnings.filter((item): item is string => typeof item === 'string') : [],
      paperIdeas: Array.isArray(insights.paperIdeas)
        ? insights.paperIdeas.filter((item): item is PaperIdea => (
          !!item
          && typeof item === 'object'
          && typeof item.title === 'string'
          && typeof item.evidence === 'string'
          && typeof item.nextStep === 'string'
        ))
        : [],
    },
  } as ExperimentSession;
}

export function loadExperimentSessions(api: CodefyUIPluginAPI): ExperimentSession[] {
  try {
    const raw = api.storage.get(EXPERIMENTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.map(parseStoredSession).filter((item): item is ExperimentSession => !!item)
      : [];
  } catch {
    return [];
  }
}

function loadExperimentSessionsForMutation(api: CodefyUIPluginAPI): ExperimentSession[] {
  let raw: string | null;
  try {
    raw = api.storage.get(EXPERIMENTS_STORAGE_KEY);
  } catch (error) {
    throw new Error(`Could not read the Experiment Lab archive before mutation: ${String(error)}`);
  }
  if (raw === null) return [];

  let value: unknown;
  try {
    value = JSON.parse(raw) as unknown;
  } catch (error) {
    throw new Error(`Experiment Lab archive is malformed and remains read-only: ${String(error)}`);
  }
  if (!Array.isArray(value)) {
    throw new Error('Experiment Lab archive is malformed and remains read-only: expected an array');
  }
  const sessions = value.map((item, index) => {
    const session = parseStoredSession(item);
    if (!session) {
      throw new Error(`Experiment Lab archive entry ${index} is invalid and cannot be safely rewritten`);
    }
    return session;
  });
  if (new Set(sessions.map((session) => session.id)).size !== sessions.length) {
    throw new Error('Experiment Lab archive contains duplicate study ids and cannot be safely rewritten');
  }
  if (raw !== JSON.stringify(sessions)) {
    throw new Error('Experiment Lab archive is non-canonical or contains lossy legacy data and remains read-only');
  }
  return sessions;
}

export interface SaveExperimentSessionOptions {
  rejectIfExists?: boolean;
}

export async function saveExperimentSession(
  api: CodefyUIPluginAPI,
  result: GraphExperimentResult,
  options: SaveExperimentSessionOptions = {},
): Promise<void> {
  await withRequiredWebLock(EXPERIMENTS_STORAGE_LOCK_NAME, async () => {
    const existing = loadExperimentSessionsForMutation(api);
    if (options.rejectIfExists && existing.some((item) => item.id === result.id)) {
      throw new Error(
        `A local Experiment Lab report already uses study id '${result.id}'; import was refused to avoid overwriting local evidence.`,
      );
    }
    const sessions = [publicSession(result), ...existing.filter((item) => item.id !== result.id)]
      .slice(0, MAX_STORED_EXPERIMENTS);
    api.storage.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify(sessions));
  });
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(EXPERIMENTS_CHANGED_EVENT));
}

function sanitizeExperimentResult(
  api: CodefyUIPluginAPI,
  request: GraphExperimentRequest,
  result: GraphExperimentResult,
  baseline: SerializedGraph,
  definitions: NodeDefinition[],
): GraphExperimentResult {
  const redacted = redactToolResultForContext(
    {
      id: `experiment-session:${result.id}`,
      name: 'run_graph_experiments',
      arguments: request as unknown as Record<string, unknown>,
    },
    JSON.stringify(result),
    api,
    [{ graph: baseline, definitions }],
  );
  return JSON.parse(redacted) as GraphExperimentResult;
}

function graphOpShapeError(value: unknown): string | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return 'operation must be an object';
  const operation = value as Record<string, unknown>;
  const text = (name: string) => typeof operation[name] === 'string' && operation[name] !== '';
  switch (operation.op) {
    case 'add_node':
      if (!text('node_type')) return 'add_node requires node_type';
      if (operation.ref !== undefined && typeof operation.ref !== 'string') return 'add_node ref must be a string';
      if (operation.params !== undefined && (!operation.params || typeof operation.params !== 'object' || Array.isArray(operation.params))) {
        return 'add_node params must be an object';
      }
      return undefined;
    case 'set_params':
      if (!text('node_id')) return 'set_params requires node_id';
      if (!operation.params || typeof operation.params !== 'object' || Array.isArray(operation.params)) {
        return 'set_params params must be an object';
      }
      return undefined;
    case 'connect':
      return text('source') && text('source_handle') && text('target') && typeof operation.target_handle === 'string'
        ? undefined
        : 'connect requires string source, source_handle, target, and target_handle';
    case 'remove_node':
      return text('node_id') ? undefined : 'remove_node requires node_id';
    case 'remove_edge':
      if (!text('source') || !text('target')) return 'remove_edge requires source and target';
      if (operation.source_handle !== undefined && typeof operation.source_handle !== 'string') return 'remove_edge source_handle must be a string';
      if (operation.target_handle !== undefined && typeof operation.target_handle !== 'string') return 'remove_edge target_handle must be a string';
      return undefined;
    case 'clear_graph':
    case 'auto_layout':
      return undefined;
    default:
      return `unknown operation '${String(operation.op ?? '')}'`;
  }
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: string[]): boolean {
  const keys = new Set(allowed);
  return Object.keys(value).every((key) => keys.has(key));
}

function isSearchScalar(value: unknown): value is ExperimentSearchScalar {
  return typeof value === 'boolean'
    || typeof value === 'string'
    || (typeof value === 'number' && Number.isFinite(value));
}

export function isExperimentSearchMetadata(value: unknown): value is ExperimentSearchMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const metadata = value as Record<string, unknown>;
  if (!hasOnlyKeys(metadata, [
    'schemaVersion', 'strategy', 'prngVersion', 'plannerSeed', 'seedDescription',
    'includesBaseline', 'totalDomainAssignments', 'baselineAssignmentExcluded',
    'generatedCandidateCount', 'totalVariantCount', 'totalExecutionCount',
    'bindings', 'assignments',
  ])) return false;
  if (
    metadata.schemaVersion !== 1
    || !['grid', 'seeded_random'].includes(String(metadata.strategy))
    || typeof metadata.seedDescription !== 'string'
    || typeof metadata.includesBaseline !== 'boolean'
    || typeof metadata.baselineAssignmentExcluded !== 'boolean'
  ) return false;
  for (const field of [
    'totalDomainAssignments', 'generatedCandidateCount', 'totalVariantCount', 'totalExecutionCount',
  ]) {
    if (!Number.isInteger(metadata[field]) || (metadata[field] as number) < 0) return false;
  }
  if (metadata.strategy === 'seeded_random') {
    if (
      metadata.prngVersion !== 'mulberry32-v1'
      || !Number.isInteger(metadata.plannerSeed)
      || (metadata.plannerSeed as number) < 0
      || (metadata.plannerSeed as number) > 0xFFFF_FFFF
    ) return false;
  } else if (metadata.prngVersion !== undefined || metadata.plannerSeed !== undefined) {
    return false;
  }
  if (!Array.isArray(metadata.bindings) || metadata.bindings.length < 1 || metadata.bindings.length > 4) {
    return false;
  }
  const bindingKeys: string[] = [];
  for (const item of metadata.bindings) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
    const binding = item as Record<string, unknown>;
    if (!hasOnlyKeys(binding, [
      'nodeId', 'nodeType', 'param', 'paramType', 'baselineValue', 'domain',
    ])) return false;
    if (
      typeof binding.nodeId !== 'string'
      || typeof binding.nodeType !== 'string'
      || typeof binding.param !== 'string'
      || !['int', 'float', 'bool', 'select'].includes(String(binding.paramType))
      || !isSearchScalar(binding.baselineValue)
      || !Array.isArray(binding.domain)
      || binding.domain.length < 1
      || binding.domain.length > 32
      || !binding.domain.every(isSearchScalar)
    ) return false;
    bindingKeys.push(`${binding.nodeId}\u0000${binding.param}`);
  }
  if (new Set(bindingKeys).size !== bindingKeys.length) return false;
  if (!Array.isArray(metadata.assignments) || metadata.assignments.length > 8) return false;
  const assignmentIds: string[] = [];
  for (const item of metadata.assignments) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return false;
    const assignment = item as Record<string, unknown>;
    if (!hasOnlyKeys(assignment, ['variantId', 'domainIndex', 'values'])) return false;
    if (
      typeof assignment.variantId !== 'string'
      || !Number.isInteger(assignment.domainIndex)
      || (assignment.domainIndex as number) < 0
      || !Array.isArray(assignment.values)
      || assignment.values.length !== metadata.bindings.length
    ) return false;
    assignmentIds.push(assignment.variantId);
    for (const itemValue of assignment.values) {
      if (!itemValue || typeof itemValue !== 'object' || Array.isArray(itemValue)) return false;
      const assignmentValue = itemValue as Record<string, unknown>;
      if (
        !hasOnlyKeys(assignmentValue, ['nodeId', 'param', 'value'])
        || typeof assignmentValue.nodeId !== 'string'
        || typeof assignmentValue.param !== 'string'
        || !isSearchScalar(assignmentValue.value)
      ) return false;
    }
  }
  return new Set(assignmentIds).size === assignmentIds.length
    && metadata.generatedCandidateCount === metadata.assignments.length;
}

function validateRequest(request: GraphExperimentRequest): { repetitions: number; concurrency: number } {
  if (!request || typeof request !== 'object') throw new Error('Experiment request must be an object');
  if (typeof request.hypothesis !== 'string' || !request.hypothesis.trim()) {
    throw new Error('Experiment requires a hypothesis');
  }
  if (
    !request.objective
    || typeof request.objective !== 'object'
    || typeof request.objective.metric !== 'string'
    || !request.objective.metric.trim()
  ) {
    throw new Error('Experiment requires an objective metric');
  }
  if (!['maximize', 'minimize'].includes(request.objective.direction)) {
    throw new Error('Experiment objective direction must be maximize or minimize');
  }
  if (!Array.isArray(request.variants) || request.variants.length === 0) {
    throw new Error('Experiment requires at least one variant');
  }
  if (request.variants.length > MAX_EXPERIMENT_VARIANTS) {
    throw new Error(`Experiment supports at most ${MAX_EXPERIMENT_VARIANTS} variants`);
  }
  const repetitions = request.repetitions ?? 1;
  if (!Number.isInteger(repetitions) || repetitions < 1 || repetitions > 5) {
    throw new Error('Experiment repetitions must be an integer from 1 to 5');
  }
  if (request.variants.length * repetitions > MAX_EXPERIMENT_RUNS) {
    throw new Error(`Experiment budget is capped at ${MAX_EXPERIMENT_RUNS} total runs`);
  }
  const concurrency = request.concurrency ?? 1;
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 2) {
    throw new Error('Experiment concurrency must be an integer from 1 to 2');
  }
  if (request.apply_best !== undefined && typeof request.apply_best !== 'boolean') {
    throw new Error('Experiment apply_best must be a boolean');
  }
  if (request.search !== undefined && !isExperimentSearchMetadata(request.search)) {
    throw new Error('Experiment search metadata is malformed');
  }
  const ids = request.variants.map((variant, index) => {
    if (!variant || typeof variant !== 'object') throw new Error('Every experiment variant must be an object');
    if (variant.id !== undefined && typeof variant.id !== 'string') {
      throw new Error('Experiment variant ids must be strings');
    }
    return variant.id?.trim() || `variant-${index + 1}`;
  });
  if (new Set(ids).size !== ids.length) throw new Error('Experiment variant ids must be unique');
  for (const variant of request.variants) {
    if (typeof variant.label !== 'string' || !variant.label.trim()) {
      throw new Error('Every experiment variant requires a label');
    }
    if (!Array.isArray(variant.operations)) throw new Error('Every experiment variant requires an operations array');
    variant.operations.forEach((operation, index) => {
      const error = graphOpShapeError(operation);
      if (error) throw new Error(`Invalid operation ${index} in variant '${variant.label}': ${error}`);
    });
  }
  if (request.search) {
    if (
      request.search.totalVariantCount !== request.variants.length
      || request.search.totalExecutionCount !== request.variants.length * repetitions
      || request.search.assignments.some((assignment) => !ids.includes(assignment.variantId))
    ) {
      throw new Error('Experiment search metadata does not match the compiled variants or run count');
    }
  }
  return { repetitions, concurrency };
}

/** Strict, shared accounting used by both the tool gate and the engine. */
export function getExperimentExecutionCount(request: GraphExperimentRequest): number {
  const { repetitions } = validateRequest(request);
  return request.variants.length * repetitions;
}

/**
 * End-to-end agent experiment loop: clone -> mutate -> validate -> execute ->
 * measure -> rank -> optionally promote. Candidate graphs stay off-canvas.
 */
async function runGraphExperimentsTracked(
  api: CodefyUIPluginAPI,
  request: GraphExperimentRequest,
  signal?: AbortSignal,
  hasLiveGraphChanged: () => boolean = () => false,
  stopGraphWatch: () => void = () => {},
): Promise<GraphExperimentResult> {
  const { repetitions, concurrency } = validateRequest(request);
  const studyStartedAt = new Date().toISOString();
  const baseline = clone(api.graph.getGraph());
  const baselineFingerprint = graphFingerprint(baseline);
  const definitions = api.graph.getNodeDefinitions();

  const prepared: PreparedVariant[] = request.variants.map((variant, index) => {
    const input = {
      id: variant.id?.trim() || `variant-${index + 1}`,
      label: variant.label.trim(),
      operations: variant.operations,
    };
    const applied = applyOperationsToClone(baseline, input.operations, definitions);
    return {
      input,
      graph: applied.graph,
      preparationErrors: applied.results.filter((result) => !result.ok).map((result) => result.error ?? 'operation failed'),
      validationErrors: [],
    };
  });

  await mapLimit(prepared, 2, async (variant) => {
    if (variant.preparationErrors.length === 0) {
      variant.validationErrors = await validateCandidate(api, variant.graph, signal);
    }
    return undefined;
  });

  const runnable = prepared.filter((variant) =>
    variant.preparationErrors.length === 0 && variant.validationErrors.length === 0);
  let token = '';
  if (runnable.length > 0) token = await executionToken(api, signal);

  // Repetitions are barriered: candidates within one repetition may run in
  // parallel, but the same variant can never have two repetitions in flight.
  // Reverse every second round to reduce simple warm-up/order drift.
  const observations: Array<{ variantId: string; repetition: number; observation: RunObservation }> = [];
  for (let repetition = 0; repetition < repetitions; repetition += 1) {
    const order = repetition % 2 === 0 ? runnable : [...runnable].reverse();
    const round = await mapLimit(order, concurrency, async (variant) => {
      try {
        return {
          variantId: variant.input.id,
          repetition: repetition + 1,
          observation: await executeCandidateGraph(variant.graph, token, signal),
        };
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') throw error;
        if (error instanceof ExperimentExecutionError) {
          return {
            variantId: variant.input.id,
            repetition: repetition + 1,
            observation: {
              ...error.observation,
              error: String(error),
            } satisfies RunObservation,
          };
        }
        return {
          variantId: variant.input.id,
          repetition: repetition + 1,
          observation: {
            metrics: {},
            metricIdentities: {},
            metricSources: {},
            durationMs: 0,
            error: String(error),
          } as RunObservation,
        };
      }
    });
    observations.push(...round);
  }

  const variants: ExperimentVariantResult[] = prepared.map((variant) => {
    const own = observations.filter((item) => item.variantId === variant.input.id);
    const successful = own.map((item) => item.observation).filter((item) => !item.error);
    const selected = successful
      .map((item) => resolveObjectiveMetric(item.metrics, request.objective, item.metricIdentities))
      .filter((item): item is { key: string; value: number; observedKey: string } => !!item);
    const errors = [
      ...variant.preparationErrors,
      ...variant.validationErrors,
      ...own.flatMap((item) => item.observation.error ? [item.observation.error] : []),
    ];
    const metricKeys = new Set(selected.map((item) => item.key));
    const fullyObserved = successful.length === repetitions
      && selected.length === repetitions
      && metricKeys.size === 1;
    if (
      variant.preparationErrors.length === 0
      && variant.validationErrors.length === 0
      && successful.length !== repetitions
    ) {
      errors.push(`Only ${successful.length}/${repetitions} repetitions completed successfully.`);
    }
    if (successful.length > 0 && selected.length !== successful.length) {
      errors.push(
        `Objective metric "${request.objective.metric}" was missing in ${successful.length - selected.length}/${successful.length} successful repetitions.`,
      );
    }
    if (metricKeys.size > 1) {
      errors.push(`Objective metric resolved to inconsistent keys across repetitions: ${[...metricKeys].join(', ')}.`);
    }
    const values = selected.map((item) => item.value);
    const interval = fullyObserved ? studentTCI95(values) : undefined;
    return {
      id: variant.input.id,
      label: variant.input.label,
      status: variant.preparationErrors.length > 0 || variant.validationErrors.length > 0
        ? 'invalid'
        : fullyObserved ? 'completed' : 'failed',
      metricKey: metricKeys.size === 1 ? selected[0]?.key : undefined,
      metricValues: values,
      mean: fullyObserved ? mean(values) : undefined,
      stddev: fullyObserved ? stddev(values) : undefined,
      confidenceInterval95: interval ? {
        level: 0.95,
        lower: interval.lower,
        upper: interval.upper,
      } : undefined,
      runtimeMs: mean(own.map((item) => item.observation.durationMs)) ?? 0,
      observedMetrics: aggregateObservedMetrics(own.map((item) => item.observation)),
      runs: own.map(({ repetition, observation }) => {
        const resolved = resolveObjectiveMetric(
          observation.metrics,
          request.objective,
          observation.metricIdentities,
        );
        return {
          repetition,
          status: observation.error ? 'failed' : 'completed',
          durationMs: observation.durationMs,
          metricKey: resolved?.key,
          metricValue: resolved?.value,
          metricSource: resolved ? observation.metricSources[resolved.observedKey] : undefined,
          observedMetrics: observation.metrics,
          observedMetricIdentities: observation.metricIdentities,
          observedMetricSources: observation.metricSources,
          ...(observation.error ? { error: observation.error } : {}),
        } satisfies ExperimentRunRecord;
      }),
      operationSummary: summarizeOperations(variant.input.operations),
      errors,
    };
  });

  const baselineInputs = prepared.filter((variant) => variant.input.operations.length === 0);
  if (baselineInputs.length === 1) {
    const baseline = variants.find((variant) => variant.id === baselineInputs[0].input.id);
    if (baseline?.status === 'completed') {
      for (const variant of variants) {
        if (variant.id === baseline.id || variant.status !== 'completed') continue;
        const comparison = compareToBaseline(
          variant.metricValues,
          baseline.metricValues,
          request.objective.direction,
        );
        if (!comparison) continue;
        variant.baselineComparison = {
          baselineId: baseline.id,
          meanDelta: comparison.rawDelta,
          objectiveImprovement: comparison.improvement,
          hedgesG: comparison.hedgesG,
        };
      }
    }
  }

  const candidateMetricKeys = new Set(
    variants
      .filter((variant) => variant.status === 'completed' && variant.metricKey)
      .map((variant) => normalizeMetric(variant.metricKey!)),
  );
  if (candidateMetricKeys.size > 1) {
    const keys = variants
      .filter((variant) => variant.status === 'completed' && variant.metricKey)
      .map((variant) => `${variant.label}: ${variant.metricKey}`)
      .join(', ');
    for (const variant of variants) {
      if (variant.status !== 'completed') continue;
      variant.status = 'failed';
      variant.metricValues = [];
      variant.mean = undefined;
      variant.stddev = undefined;
      variant.confidenceInterval95 = undefined;
      variant.baselineComparison = undefined;
      variant.errors.push(`Candidates resolved different objective metrics (${keys}); cross-candidate ranking was refused.`);
    }
  }

  const ranked = variants
    .filter((variant) => variant.status === 'completed' && variant.mean !== undefined)
    .sort((a, b) => {
      const score = request.objective.direction === 'maximize'
        ? b.mean! - a.mean!
        : a.mean! - b.mean!;
      return score || a.id.localeCompare(b.id);
    });
  const top = ranked[0];
  const tieTolerance = top
    ? Math.max(1, Math.abs(top.mean!)) * Number.EPSILON * 8
    : 0;
  const tied = top
    ? ranked.filter((variant) => Math.abs(variant.mean! - top.mean!) <= tieTolerance)
    : [];
  const winner = tied.length === 1 ? top : undefined;
  const session: GraphExperimentResult = {
    id: newId('experiment'),
    createdAt: studyStartedAt,
    hypothesis: request.hypothesis.trim(),
    objective: request.objective,
    repetitions,
    status: ranked.length === 0 ? 'failed'
      : variants.every((variant) => variant.status === 'completed') ? 'completed' : 'partial',
    variants,
    baselineVariantId: baselineInputs.length === 1 ? baselineInputs[0].input.id : undefined,
    search: request.search ? clone(request.search) : undefined,
    winnerId: winner?.id,
    winnerLabel: winner?.label,
    insights: buildInsights({ ...request, repetitions }, variants, winner, tied),
  };

  if (signal?.aborted) throw new DOMException('Experiment cancelled', 'AbortError');

  if (request.apply_best && winner) {
    const winnerInput = prepared.find((variant) => variant.input.id === winner.id)!.input;
    const graphChanged = hasLiveGraphChanged();
    const fingerprintChanged = graphFingerprint(api.graph.getGraph()) !== baselineFingerprint;
    // The remainder of promotion is synchronous. Stop before applyOperations
    // so its own node/edge writes cannot be mistaken for a user/tab change.
    stopGraphWatch();
    if (graphChanged || fingerprintChanged) {
      session.applyConflict = 'The live graph changed while experiments were running; winner was not applied.';
    } else if (winnerInput.operations.some((operation) => operation.op !== 'set_params')) {
      session.applyConflict = 'Automatic promotion supports parameter-only winners; this structural winner remains a proposal for review.';
    } else if (winnerInput.operations.length > 0) {
      if (signal?.aborted) throw new DOMException('Experiment cancelled', 'AbortError');
      const preflight = applyOperationsToClone(baseline, winnerInput.operations, definitions);
      if (preflight.results.some((result) => !result.ok)) {
        session.applyConflict = `Winner promotion failed parameter preflight: ${preflight.results
          .filter((result) => !result.ok)
          .map((result) => result.error)
          .join('; ')}`;
      } else {
        try {
          session.applyResult = api.graph.applyOperations(winnerInput.operations);
          session.appliedOperations = winnerInput.operations;
          if (session.applyResult.results.every((result) => result.ok)) {
            session.appliedVariantId = winner.id;
          } else {
            session.applyConflict = 'Winner promotion was only partially applied; the canvas may contain a partial parameter update. Inspect operation errors.';
          }
        } catch (error) {
          session.applyConflict = `Winner promotion threw unexpectedly; the canvas may contain a partial parameter update: ${String(error)}`;
        }
        if (session.applyConflict) {
          api.ui.toast(session.applyConflict, 'error');
        }
      }
    } else {
      session.appliedVariantId = winner.id;
    }
  }

  if (signal?.aborted) throw new DOMException('Experiment cancelled', 'AbortError');
  const completedAt = new Date().toISOString();
  try {
    const portable = await createPortableStudyCapture({
      session,
      request,
      baseline,
      definitions,
      pluginId: api.pluginId || GRAPH_COPILOT_PLUGIN_ID,
      pluginVersion: GRAPH_COPILOT_PLUGIN_VERSION,
      codefyuiApiVersion: api.apiVersion,
      completedAt,
      provenanceFacts: [
        {
          key: 'codefyui.api_version',
          status: 'observed',
          source: 'CodefyUIPluginAPI',
          collectedAt: completedAt,
          value: api.apiVersion,
        },
        {
          key: 'experiment.coordinator',
          status: 'observed',
          source: 'Graph Copilot browser runtime',
          collectedAt: completedAt,
          value: 'browser-local',
        },
        {
          key: 'experiment.runner_seed_schedule',
          status: 'unavailable',
          source: 'Graph Copilot does not assign graph-node RNG seeds',
        },
      ],
    });
    const stored = await saveStudyBundle(api, portable);
    if (stored.cleanupFailures.length > 0) {
      const warning = `Portable study was saved, but ${stored.cleanupFailures.length} unreferenced old blob(s) could not be cleaned up.`;
      session.insights.warnings.push(warning);
      try { api.ui.toast(warning, 'warning'); } catch { /* reporting must remain non-fatal */ }
    }
  } catch (error) {
    const warning = `Experiment completed, but its portable study bundle could not be captured or saved: ${persistenceErrorDetail(error)}`;
    session.insights.warnings.push(warning);
    try { api.ui.toast(warning, 'warning'); } catch { /* reporting must remain non-fatal */ }
  }

  let safeSession = sanitizeExperimentResult(api, request, session, baseline, definitions);
  try {
    await saveExperimentSession(api, safeSession);
  } catch (error) {
    const warning = `Experiment completed, but its local history could not be saved: ${String(error)}`;
    session.insights.warnings.push(warning);
    try { api.ui.toast(warning, 'warning'); } catch { /* reporting must remain non-fatal */ }
    safeSession = sanitizeExperimentResult(api, request, session, baseline, definitions);
  }
  return safeSession;
}

export async function runGraphExperiments(
  api: CodefyUIPluginAPI,
  request: GraphExperimentRequest,
  signal?: AbortSignal,
): Promise<GraphExperimentResult> {
  let liveGraphChanged = false;
  let unsubscribe: (() => void) | undefined;
  let watching = true;
  const stopGraphWatch = () => {
    if (!watching) return;
    watching = false;
    unsubscribe?.();
  };
  try {
    unsubscribe = api.graph.onGraphChanged(() => {
      if (watching) liveGraphChanged = true;
    });
  } catch {
    // Without a trustworthy active-tab revision, experiments may still run,
    // but automatic promotion must be conservatively refused.
    liveGraphChanged = true;
  }
  try {
    return await runGraphExperimentsTracked(
      api,
      request,
      signal,
      () => liveGraphChanged,
      stopGraphWatch,
    );
  } finally {
    stopGraphWatch();
  }
}
