import type {
  ExperimentSession,
  ExperimentStatus,
  ExperimentVariantResult,
  PaperIdea,
} from './experiments';
import {
  compareToBaseline,
  sampleMean,
  sampleStddev,
  studentTCI95,
} from './experimentAnalysis';

/**
 * Portable Graph Copilot study bundles.
 *
 * `plugin-canonical-v1` is deliberately a plugin-local canonical JSON format:
 * object keys are recursively sorted with JavaScript's ordinary string order,
 * arrays retain their order, and only finite JSON values are accepted. It is
 * deterministic for this plugin, but it is NOT advertised as RFC 8785/JCS.
 *
 * Secret safety is explicit rather than magical. Callers must replace secret
 * parameter values with `SecretRef` objects before creating a bundle. The
 * codec proves that every such reference has one declared requirement at the
 * exact locations recorded in the redaction report. No generic codec can
 * reliably identify a raw credential hidden in an arbitrary ordinary string.
 */

export const STUDY_BUNDLE_FORMAT = 'codefyui.graph-copilot.study' as const;
export const STUDY_BUNDLE_VERSION = 1 as const;
export const STUDY_CANONICALIZATION = 'plugin-canonical-v1' as const;
export const STUDY_BUNDLE_MAX_BYTES = 5 * 1024 * 1024;
export const STUDY_BUNDLE_MAX_DEPTH = 64;
export const STUDY_BUNDLE_MAX_VALUES = 100_000;
export const STUDY_BUNDLE_MAX_STRING_LENGTH = 64 * 1024;
export const STUDY_BUNDLE_MAX_COLLECTION_ITEMS = 10_000;
export const STUDY_BUNDLE_MAX_VARIANTS = 8;
export const STUDY_BUNDLE_MAX_RUNS = 16;

const MAX_GRAPH_NODES = 5_000;
const MAX_GRAPH_EDGES = 10_000;
const MAX_OPERATIONS_PER_VARIANT = 1_000;
const MAX_METRICS_PER_RUN = 512;
const MAX_DERIVED_OBSERVED_METRICS = 40;
const MAX_PROVENANCE_FACTS = 256;
const MAX_REDACTION_RECORDS = 1_000;
const MAX_SHORT_TEXT = 512;
const MAX_LONG_TEXT = 32 * 1024;

export type PortableJsonPrimitive = null | boolean | number | string;

export interface SecretRef {
  readonly $gcpSecretRef: string;
}

export type PortableJsonValue =
  | PortableJsonPrimitive
  | SecretRef
  | readonly PortableJsonValue[]
  | { readonly [key: string]: PortableJsonValue };

export interface PortableGraphNodeV1 {
  readonly id: string;
  readonly type: string;
  readonly position: { readonly x: number; readonly y: number };
  readonly data: { readonly [key: string]: PortableJsonValue };
}

export interface PortableGraphEdgeV1 {
  readonly id: string;
  readonly source: string;
  readonly target: string;
  readonly sourceHandle: string;
  readonly targetHandle: string;
  readonly type?: 'data' | 'trigger';
}

export interface PortableGraphV1 {
  readonly nodes: readonly PortableGraphNodeV1[];
  readonly edges: readonly PortableGraphEdgeV1[];
  readonly presets?: readonly PortableJsonValue[];
  readonly segmentGroups?: PortableJsonValue;
  readonly name?: string;
  readonly description?: string;
}

export type PortableGraphOpV1 =
  | {
      readonly op: 'add_node';
      readonly node_type: string;
      readonly ref?: string;
      readonly params?: { readonly [key: string]: PortableJsonValue };
      readonly position?: { readonly x: number; readonly y: number };
    }
  | {
      readonly op: 'connect';
      readonly source: string;
      readonly source_handle: string;
      readonly target: string;
      readonly target_handle: string;
    }
  | {
      readonly op: 'set_params';
      readonly node_id: string;
      readonly params: { readonly [key: string]: PortableJsonValue };
    }
  | { readonly op: 'remove_node'; readonly node_id: string }
  | {
      readonly op: 'remove_edge';
      readonly source: string;
      readonly target: string;
      readonly source_handle?: string;
      readonly target_handle?: string;
    }
  | { readonly op: 'clear_graph' }
  | { readonly op: 'auto_layout' };

export interface StudyProducerV1 {
  readonly pluginId: string;
  readonly pluginVersion: string;
  readonly codefyuiApiVersion: number;
}

export type ProvenanceFactStatus = 'observed' | 'declared' | 'unavailable';

export interface ProvenanceFactV1 {
  readonly key: string;
  readonly status: ProvenanceFactStatus;
  readonly source: string;
  readonly collectedAt?: string;
  readonly value?: PortableJsonValue;
}

export interface StudyProvenanceV1 {
  readonly facts: readonly ProvenanceFactV1[];
}

export interface StudyVariantSpecV1 {
  readonly id: string;
  readonly label: string;
  readonly operations: readonly PortableGraphOpV1[];
}

export interface StudySpecV1 {
  readonly hypothesis: string;
  readonly baseline: PortableGraphV1;
  readonly objective: {
    readonly metric: string;
    readonly direction: 'maximize' | 'minimize';
  };
  readonly repetitions: number;
  readonly concurrency: number;
  readonly applyBestRequested: boolean;
  readonly variants: readonly StudyVariantSpecV1[];
}

export type StudyMetricSourceV1 = 'output_summary' | 'progress' | 'client';

export interface StudyMetricSampleV1 {
  readonly observedKey: string;
  readonly canonicalKey: string;
  readonly value: number;
  readonly source: StudyMetricSourceV1;
}

export type StudyRunStatusV1 = 'completed' | 'failed' | 'cancelled';

export interface StudyRunErrorV1 {
  readonly phase: 'prepare' | 'validate' | 'execute' | 'metric' | 'cancel';
  readonly code: string;
  readonly message: string;
}

export interface StudyRunRecordV1 {
  readonly runKey: string;
  readonly runId?: string;
  readonly graphId?: string;
  readonly variantId: string;
  /** One-based repetition number. */
  readonly repetition: number;
  readonly status: StudyRunStatusV1;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly durationMs: number;
  readonly metrics: readonly StudyMetricSampleV1[];
  readonly error?: StudyRunErrorV1;
}

export interface DerivedStudyVariantV1 {
  readonly id: string;
  readonly label: string;
  readonly status: 'completed' | 'invalid' | 'failed';
  readonly metricKey?: string;
  readonly metricValues: readonly number[];
  readonly mean?: number;
  readonly stddev?: number;
  readonly confidenceInterval95?: {
    readonly level: 0.95;
    readonly lower: number;
    readonly upper: number;
  };
  readonly baselineComparison?: {
    readonly baselineId: string;
    readonly meanDelta: number;
    readonly objectiveImprovement: number;
    readonly hedgesG?: number;
  };
  readonly runtimeMs: number;
  readonly observedMetrics: readonly { readonly key: string; readonly value: number }[];
  readonly operationSummary?: readonly string[];
  readonly errors: readonly string[];
}

export interface DerivedStudySummaryV1 {
  readonly status: ExperimentStatus;
  readonly variants: readonly DerivedStudyVariantV1[];
  readonly baselineVariantId?: string;
  readonly winnerId?: string;
  readonly winnerLabel?: string;
  readonly appliedVariantId?: string;
  readonly applyConflict?: string;
  readonly insights: {
    readonly summary: readonly string[];
    readonly warnings: readonly string[];
    readonly paperIdeas: readonly PaperIdea[];
  };
}

export interface StudySecretRequirementV1 {
  readonly id: string;
  /** Exact JSON Pointers rooted at `/spec`. */
  readonly locations: readonly string[];
  readonly reason: string;
  readonly requiredAtReplay: boolean;
  readonly nodeType?: string;
  readonly parameter?: string;
}

export interface StudyTextRedactionV1 {
  readonly locations: readonly string[];
  readonly reason: string;
}

export interface StudyRedactionReportV1 {
  readonly policy: 'explicit-secret-ref-v1';
  readonly secretRequirements: readonly StudySecretRequirementV1[];
  readonly textRedactions: readonly StudyTextRedactionV1[];
}

export interface StudyBundlePayloadV1 {
  readonly id: string;
  readonly createdAt: string;
  readonly completedAt: string;
  readonly producer: StudyProducerV1;
  readonly provenance: StudyProvenanceV1;
  readonly spec: StudySpecV1;
  readonly runs: readonly StudyRunRecordV1[];
  readonly derived: DerivedStudySummaryV1;
  readonly redactionReport: StudyRedactionReportV1;
}

export interface StudyBundleIntegrityV1 {
  readonly algorithm: 'SHA-256';
  readonly canonicalization: typeof STUDY_CANONICALIZATION;
  readonly contentSha256: string;
}

export interface StudyBundleV1 {
  readonly format: typeof STUDY_BUNDLE_FORMAT;
  readonly formatVersion: typeof STUDY_BUNDLE_VERSION;
  readonly payload: StudyBundlePayloadV1;
  readonly integrity: StudyBundleIntegrityV1;
}

export interface CreateStudyBundleInput {
  readonly session: ExperimentSession;
  readonly completedAt: string;
  readonly producer: StudyProducerV1;
  readonly provenance: StudyProvenanceV1;
  readonly baseline: PortableGraphV1;
  readonly variants: readonly StudyVariantSpecV1[];
  readonly runs: readonly StudyRunRecordV1[];
  readonly redactionReport: StudyRedactionReportV1;
  readonly concurrency?: number;
  readonly applyBestRequested?: boolean;
}

export type StudyBundleErrorCode =
  | 'INVALID_JSON'
  | 'BUNDLE_TOO_LARGE'
  | 'INVALID_VALUE'
  | 'LIMIT_EXCEEDED'
  | 'INVALID_BUNDLE'
  | 'UNSUPPORTED_FORMAT'
  | 'UNSUPPORTED_VERSION'
  | 'FUTURE_VERSION'
  | 'INTEGRITY_MISMATCH'
  | 'CRYPTO_UNAVAILABLE';

export class StudyBundleError extends Error {
  readonly code: StudyBundleErrorCode;

  constructor(code: StudyBundleErrorCode, message: string) {
    super(message);
    this.name = 'StudyBundleError';
    this.code = code;
  }
}

type UnknownRecord = Record<string, unknown>;

interface WalkState {
  values: number;
  readonly stack: WeakSet<object>;
}

function fail(
  code: StudyBundleErrorCode,
  path: string,
  message: string,
): never {
  throw new StudyBundleError(code, `${path}: ${message}`);
}

function isPlainRecord(value: unknown): value is UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function canonicalize(
  value: unknown,
  path: string,
  depth: number,
  state: WalkState,
): string {
  if (depth > STUDY_BUNDLE_MAX_DEPTH) {
    fail('LIMIT_EXCEEDED', path, `maximum depth is ${STUDY_BUNDLE_MAX_DEPTH}`);
  }
  state.values += 1;
  if (state.values > STUDY_BUNDLE_MAX_VALUES) {
    fail('LIMIT_EXCEEDED', path, `maximum value count is ${STUDY_BUNDLE_MAX_VALUES}`);
  }

  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('INVALID_VALUE', path, 'numbers must be finite');
    return JSON.stringify(value);
  }
  if (typeof value === 'string') {
    if (value.length > STUDY_BUNDLE_MAX_STRING_LENGTH) {
      fail(
        'LIMIT_EXCEEDED',
        path,
        `maximum string length is ${STUDY_BUNDLE_MAX_STRING_LENGTH}`,
      );
    }
    return JSON.stringify(value);
  }
  if (typeof value !== 'object' || value === undefined) {
    fail('INVALID_VALUE', path, `unsupported JSON value ${typeof value}`);
  }
  if (state.stack.has(value)) fail('INVALID_VALUE', path, 'cyclic values are not allowed');
  state.stack.add(value);
  try {
    if (Array.isArray(value)) {
      if (value.length > STUDY_BUNDLE_MAX_COLLECTION_ITEMS) {
        fail(
          'LIMIT_EXCEEDED',
          path,
          `maximum collection size is ${STUDY_BUNDLE_MAX_COLLECTION_ITEMS}`,
        );
      }
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) {
          fail('INVALID_VALUE', `${path}/${index}`, 'sparse arrays are not allowed');
        }
      }
      return `[${value.map((item, index) => canonicalize(
        item,
        `${path}/${index}`,
        depth + 1,
        state,
      )).join(',')}]`;
    }
    if (!isPlainRecord(value)) fail('INVALID_VALUE', path, 'objects must be plain JSON objects');
    const keys = Object.keys(value).sort();
    if (keys.length > STUDY_BUNDLE_MAX_COLLECTION_ITEMS) {
      fail(
        'LIMIT_EXCEEDED',
        path,
        `maximum collection size is ${STUDY_BUNDLE_MAX_COLLECTION_ITEMS}`,
      );
    }
    return `{${keys.map((key) => {
      if (key.length > MAX_SHORT_TEXT) {
        fail('LIMIT_EXCEEDED', path, `object key exceeds ${MAX_SHORT_TEXT} characters`);
      }
      return `${JSON.stringify(key)}:${canonicalize(
        value[key],
        `${path}/${escapePointer(key)}`,
        depth + 1,
        state,
      )}`;
    }).join(',')}}`;
  } finally {
    state.stack.delete(value);
  }
}

/** Deterministic plugin-local JSON; see the module comment for its limits. */
export function canonicalStudyJson(value: unknown): string {
  return canonicalize(value, '$', 0, { values: 0, stack: new WeakSet() });
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

function enforceEncodedSize(value: string): void {
  const bytes = byteLength(value);
  if (bytes > STUDY_BUNDLE_MAX_BYTES) {
    throw new StudyBundleError(
      'BUNDLE_TOO_LARGE',
      `Study bundle is ${bytes} bytes; maximum is ${STUDY_BUNDLE_MAX_BYTES}`,
    );
  }
}

async function sha256(value: string): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new StudyBundleError(
      'CRYPTO_UNAVAILABLE',
      'Web Crypto SHA-256 is unavailable in this environment',
    );
  }
  const digest = await subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)]
    .map((part) => part.toString(16).padStart(2, '0'))
    .join('');
}

function expectRecord(value: unknown, path: string): UnknownRecord {
  if (!isPlainRecord(value)) fail('INVALID_BUNDLE', path, 'expected an object');
  return value;
}

function expectKeys(
  value: UnknownRecord,
  allowed: readonly string[],
  required: readonly string[],
  path: string,
): void {
  const allowedSet = new Set(allowed);
  for (const key of Object.keys(value)) {
    if (!allowedSet.has(key)) fail('INVALID_BUNDLE', `${path}/${escapePointer(key)}`, 'unknown property');
  }
  for (const key of required) {
    if (!Object.prototype.hasOwnProperty.call(value, key)) {
      fail('INVALID_BUNDLE', path, `missing required property '${key}'`);
    }
  }
}

function expectArray(value: unknown, path: string, max = STUDY_BUNDLE_MAX_COLLECTION_ITEMS): unknown[] {
  if (!Array.isArray(value)) fail('INVALID_BUNDLE', path, 'expected an array');
  if (value.length > max) fail('LIMIT_EXCEEDED', path, `maximum item count is ${max}`);
  return value;
}

function expectString(
  value: unknown,
  path: string,
  max = MAX_SHORT_TEXT,
  allowEmpty = false,
): string {
  if (typeof value !== 'string') fail('INVALID_BUNDLE', path, 'expected a string');
  if ((!allowEmpty && !value.trim()) || value.length > max) {
    fail(
      value.length > max ? 'LIMIT_EXCEEDED' : 'INVALID_BUNDLE',
      path,
      value.length > max ? `maximum length is ${max}` : 'must not be empty',
    );
  }
  if (/\u0000/.test(value)) fail('INVALID_BUNDLE', path, 'NUL characters are not allowed');
  return value;
}

function expectFiniteNumber(value: unknown, path: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    fail('INVALID_BUNDLE', path, 'expected a finite number');
  }
  return value;
}

function expectInteger(value: unknown, path: string, min: number, max: number): number {
  const number = expectFiniteNumber(value, path);
  if (!Number.isInteger(number) || number < min || number > max) {
    fail('INVALID_BUNDLE', path, `expected an integer from ${min} to ${max}`);
  }
  return number;
}

function expectBoolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') fail('INVALID_BUNDLE', path, 'expected a boolean');
  return value;
}

function expectEnum<T extends string>(
  value: unknown,
  choices: readonly T[],
  path: string,
): T {
  if (typeof value !== 'string' || !choices.includes(value as T)) {
    fail('INVALID_BUNDLE', path, `expected one of: ${choices.join(', ')}`);
  }
  return value as T;
}

function expectIsoDate(value: unknown, path: string): string {
  const text = expectString(value, path, 64);
  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(text)
    || Number.isNaN(Date.parse(text))
    || new Date(text).toISOString() !== text
  ) {
    fail('INVALID_BUNDLE', path, 'expected a canonical ISO-8601 UTC timestamp');
  }
  return text;
}

function expectId(value: unknown, path: string): string {
  const text = expectString(value, path, 256);
  if (text !== text.trim() || /[\u0000-\u001f\u007f]/.test(text)) {
    fail('INVALID_BUNDLE', path, 'id must be trimmed and contain no control characters');
  }
  return text;
}

function ensureUnique(values: readonly string[], path: string, label: string): void {
  if (new Set(values).size !== values.length) {
    fail('INVALID_BUNDLE', path, `${label} must be unique`);
  }
}

function hasOwn(value: UnknownRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function escapePointer(value: string): string {
  return value.replace(/~/g, '~0').replace(/\//g, '~1');
}

function validatePortableValue(value: unknown, path: string): void {
  // canonicalStudyJson performs the finite/depth/count/plain-object checks.
  // This pass adds the exact shape rule for explicit secret references.
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => validatePortableValue(item, `${path}/${index}`));
    return;
  }
  const record = expectRecord(value, path);
  if (hasOwn(record, '$gcpSecretRef')) {
    expectKeys(record, ['$gcpSecretRef'], ['$gcpSecretRef'], path);
    expectId(record.$gcpSecretRef, `${path}/$gcpSecretRef`);
    return;
  }
  for (const [key, item] of Object.entries(record)) {
    validatePortableValue(item, `${path}/${escapePointer(key)}`);
  }
}

function validatePosition(value: unknown, path: string): void {
  const record = expectRecord(value, path);
  expectKeys(record, ['x', 'y'], ['x', 'y'], path);
  expectFiniteNumber(record.x, `${path}/x`);
  expectFiniteNumber(record.y, `${path}/y`);
}

function validateGraph(value: unknown, path: string): void {
  const graph = expectRecord(value, path);
  expectKeys(
    graph,
    ['nodes', 'edges', 'presets', 'segmentGroups', 'name', 'description'],
    ['nodes', 'edges'],
    path,
  );
  const nodes = expectArray(graph.nodes, `${path}/nodes`, MAX_GRAPH_NODES);
  const nodeIds: string[] = [];
  nodes.forEach((item, index) => {
    const nodePath = `${path}/nodes/${index}`;
    const node = expectRecord(item, nodePath);
    expectKeys(node, ['id', 'type', 'position', 'data'], ['id', 'type', 'position', 'data'], nodePath);
    nodeIds.push(expectId(node.id, `${nodePath}/id`));
    expectString(node.type, `${nodePath}/type`, MAX_SHORT_TEXT);
    validatePosition(node.position, `${nodePath}/position`);
    const data = expectRecord(node.data, `${nodePath}/data`);
    validatePortableValue(data, `${nodePath}/data`);
  });
  ensureUnique(nodeIds, `${path}/nodes`, 'node ids');
  const knownNodes = new Set(nodeIds);

  const edges = expectArray(graph.edges, `${path}/edges`, MAX_GRAPH_EDGES);
  const edgeIds: string[] = [];
  edges.forEach((item, index) => {
    const edgePath = `${path}/edges/${index}`;
    const edge = expectRecord(item, edgePath);
    expectKeys(
      edge,
      ['id', 'source', 'target', 'sourceHandle', 'targetHandle', 'type'],
      ['id', 'source', 'target', 'sourceHandle', 'targetHandle'],
      edgePath,
    );
    edgeIds.push(expectId(edge.id, `${edgePath}/id`));
    const source = expectId(edge.source, `${edgePath}/source`);
    const target = expectId(edge.target, `${edgePath}/target`);
    if (!knownNodes.has(source)) fail('INVALID_BUNDLE', `${edgePath}/source`, 'unknown source node');
    if (!knownNodes.has(target)) fail('INVALID_BUNDLE', `${edgePath}/target`, 'unknown target node');
    expectString(edge.sourceHandle, `${edgePath}/sourceHandle`, MAX_SHORT_TEXT, true);
    expectString(edge.targetHandle, `${edgePath}/targetHandle`, MAX_SHORT_TEXT, true);
    if (hasOwn(edge, 'type')) expectEnum(edge.type, ['data', 'trigger'] as const, `${edgePath}/type`);
  });
  ensureUnique(edgeIds, `${path}/edges`, 'edge ids');

  if (hasOwn(graph, 'presets')) {
    const presets = expectArray(graph.presets, `${path}/presets`);
    presets.forEach((item, index) => validatePortableValue(item, `${path}/presets/${index}`));
  }
  if (hasOwn(graph, 'segmentGroups')) {
    validatePortableValue(graph.segmentGroups, `${path}/segmentGroups`);
  }
  if (hasOwn(graph, 'name')) expectString(graph.name, `${path}/name`, MAX_SHORT_TEXT, true);
  if (hasOwn(graph, 'description')) expectString(graph.description, `${path}/description`, MAX_LONG_TEXT, true);
}

function validateParams(value: unknown, path: string): void {
  const params = expectRecord(value, path);
  validatePortableValue(params, path);
}

function validateOperation(value: unknown, path: string): void {
  const operation = expectRecord(value, path);
  const op = expectEnum(
    operation.op,
    ['add_node', 'connect', 'set_params', 'remove_node', 'remove_edge', 'clear_graph', 'auto_layout'] as const,
    `${path}/op`,
  );
  switch (op) {
    case 'add_node':
      expectKeys(operation, ['op', 'node_type', 'ref', 'params', 'position'], ['op', 'node_type'], path);
      expectString(operation.node_type, `${path}/node_type`, MAX_SHORT_TEXT);
      if (hasOwn(operation, 'ref')) expectId(operation.ref, `${path}/ref`);
      if (hasOwn(operation, 'params')) validateParams(operation.params, `${path}/params`);
      if (hasOwn(operation, 'position')) validatePosition(operation.position, `${path}/position`);
      return;
    case 'connect':
      expectKeys(
        operation,
        ['op', 'source', 'source_handle', 'target', 'target_handle'],
        ['op', 'source', 'source_handle', 'target', 'target_handle'],
        path,
      );
      expectId(operation.source, `${path}/source`);
      expectString(operation.source_handle, `${path}/source_handle`, MAX_SHORT_TEXT, true);
      expectId(operation.target, `${path}/target`);
      expectString(operation.target_handle, `${path}/target_handle`, MAX_SHORT_TEXT, true);
      return;
    case 'set_params':
      expectKeys(operation, ['op', 'node_id', 'params'], ['op', 'node_id', 'params'], path);
      expectId(operation.node_id, `${path}/node_id`);
      validateParams(operation.params, `${path}/params`);
      return;
    case 'remove_node':
      expectKeys(operation, ['op', 'node_id'], ['op', 'node_id'], path);
      expectId(operation.node_id, `${path}/node_id`);
      return;
    case 'remove_edge':
      expectKeys(
        operation,
        ['op', 'source', 'target', 'source_handle', 'target_handle'],
        ['op', 'source', 'target'],
        path,
      );
      expectId(operation.source, `${path}/source`);
      expectId(operation.target, `${path}/target`);
      if (hasOwn(operation, 'source_handle')) {
        expectString(operation.source_handle, `${path}/source_handle`, MAX_SHORT_TEXT, true);
      }
      if (hasOwn(operation, 'target_handle')) {
        expectString(operation.target_handle, `${path}/target_handle`, MAX_SHORT_TEXT, true);
      }
      return;
    case 'clear_graph':
    case 'auto_layout':
      expectKeys(operation, ['op'], ['op'], path);
  }
}

function validateProducer(value: unknown, path: string): void {
  const producer = expectRecord(value, path);
  expectKeys(
    producer,
    ['pluginId', 'pluginVersion', 'codefyuiApiVersion'],
    ['pluginId', 'pluginVersion', 'codefyuiApiVersion'],
    path,
  );
  expectId(producer.pluginId, `${path}/pluginId`);
  expectString(producer.pluginVersion, `${path}/pluginVersion`, 128);
  expectInteger(producer.codefyuiApiVersion, `${path}/codefyuiApiVersion`, 1, 1_000);
}

function validateProvenance(value: unknown, path: string): void {
  const provenance = expectRecord(value, path);
  expectKeys(provenance, ['facts'], ['facts'], path);
  const facts = expectArray(provenance.facts, `${path}/facts`, MAX_PROVENANCE_FACTS);
  const keys: string[] = [];
  facts.forEach((item, index) => {
    const factPath = `${path}/facts/${index}`;
    const fact = expectRecord(item, factPath);
    expectKeys(fact, ['key', 'status', 'source', 'collectedAt', 'value'], ['key', 'status', 'source'], factPath);
    keys.push(expectString(fact.key, `${factPath}/key`, MAX_SHORT_TEXT));
    const status = expectEnum(
      fact.status,
      ['observed', 'declared', 'unavailable'] as const,
      `${factPath}/status`,
    );
    expectString(fact.source, `${factPath}/source`, MAX_SHORT_TEXT);
    if (hasOwn(fact, 'collectedAt')) expectIsoDate(fact.collectedAt, `${factPath}/collectedAt`);
    const hasValue = hasOwn(fact, 'value');
    if (status === 'unavailable' && hasValue) {
      fail('INVALID_BUNDLE', `${factPath}/value`, 'unavailable facts must not contain a value');
    }
    if (status !== 'unavailable' && !hasValue) {
      fail('INVALID_BUNDLE', factPath, `${status} facts require a value`);
    }
    if (hasValue) {
      validatePortableValue(fact.value, `${factPath}/value`);
      const secretRefs = new Map<string, string[]>();
      collectSecretRefs(fact.value, `${factPath}/value`, secretRefs);
      if (secretRefs.size > 0) {
        fail(
          'INVALID_BUNDLE',
          `${factPath}/value`,
          'SecretRefs are allowed only in the replayable study spec',
        );
      }
    }
  });
  ensureUnique(keys, `${path}/facts`, 'provenance fact keys');
}

function validateSpec(value: unknown, path: string): void {
  const spec = expectRecord(value, path);
  expectKeys(
    spec,
    [
      'hypothesis', 'baseline', 'objective', 'repetitions', 'concurrency',
      'applyBestRequested', 'variants',
    ],
    [
      'hypothesis', 'baseline', 'objective', 'repetitions', 'concurrency',
      'applyBestRequested', 'variants',
    ],
    path,
  );
  expectString(spec.hypothesis, `${path}/hypothesis`, MAX_LONG_TEXT);
  validateGraph(spec.baseline, `${path}/baseline`);
  const objective = expectRecord(spec.objective, `${path}/objective`);
  expectKeys(objective, ['metric', 'direction'], ['metric', 'direction'], `${path}/objective`);
  expectString(objective.metric, `${path}/objective/metric`, MAX_SHORT_TEXT);
  expectEnum(objective.direction, ['maximize', 'minimize'] as const, `${path}/objective/direction`);
  expectInteger(spec.repetitions, `${path}/repetitions`, 1, 5);
  expectInteger(spec.concurrency, `${path}/concurrency`, 1, 2);
  expectBoolean(spec.applyBestRequested, `${path}/applyBestRequested`);
  const variants = expectArray(spec.variants, `${path}/variants`, STUDY_BUNDLE_MAX_VARIANTS);
  if (variants.length === 0) fail('INVALID_BUNDLE', `${path}/variants`, 'at least one variant is required');
  const ids: string[] = [];
  variants.forEach((item, index) => {
    const variantPath = `${path}/variants/${index}`;
    const variant = expectRecord(item, variantPath);
    expectKeys(variant, ['id', 'label', 'operations'], ['id', 'label', 'operations'], variantPath);
    ids.push(expectId(variant.id, `${variantPath}/id`));
    expectString(variant.label, `${variantPath}/label`, MAX_SHORT_TEXT);
    const operations = expectArray(
      variant.operations,
      `${variantPath}/operations`,
      MAX_OPERATIONS_PER_VARIANT,
    );
    operations.forEach((operation, opIndex) => {
      validateOperation(operation, `${variantPath}/operations/${opIndex}`);
    });
  });
  ensureUnique(ids, `${path}/variants`, 'variant ids');
}

function validateRunError(value: unknown, path: string): void {
  const error = expectRecord(value, path);
  expectKeys(error, ['phase', 'code', 'message'], ['phase', 'code', 'message'], path);
  expectEnum(error.phase, ['prepare', 'validate', 'execute', 'metric', 'cancel'] as const, `${path}/phase`);
  expectString(error.code, `${path}/code`, MAX_SHORT_TEXT);
  expectString(error.message, `${path}/message`, MAX_LONG_TEXT);
}

function validateRuns(value: unknown, payload: UnknownRecord, path: string): void {
  const runs = expectArray(value, path, STUDY_BUNDLE_MAX_RUNS);
  const spec = expectRecord(payload.spec, '/payload/spec');
  const variants = expectArray(spec.variants, '/payload/spec/variants', STUDY_BUNDLE_MAX_VARIANTS);
  const variantIds = new Set(variants.map((item, index) => expectId(
    expectRecord(item, `/payload/spec/variants/${index}`).id,
    `/payload/spec/variants/${index}/id`,
  )));
  const repetitions = expectInteger(spec.repetitions, '/payload/spec/repetitions', 1, 5);
  const runKeys: string[] = [];
  const slots: string[] = [];
  runs.forEach((item, index) => {
    const runPath = `${path}/${index}`;
    const run = expectRecord(item, runPath);
    expectKeys(
      run,
      [
        'runKey', 'runId', 'graphId', 'variantId', 'repetition', 'status',
        'startedAt', 'completedAt', 'durationMs', 'metrics', 'error',
      ],
      ['runKey', 'variantId', 'repetition', 'status', 'durationMs', 'metrics'],
      runPath,
    );
    const runKey = expectId(run.runKey, `${runPath}/runKey`);
    runKeys.push(runKey);
    if (hasOwn(run, 'runId')) expectId(run.runId, `${runPath}/runId`);
    if (hasOwn(run, 'graphId')) expectId(run.graphId, `${runPath}/graphId`);
    const variantId = expectId(run.variantId, `${runPath}/variantId`);
    if (!variantIds.has(variantId)) fail('INVALID_BUNDLE', `${runPath}/variantId`, 'unknown variant id');
    const repetition = expectInteger(run.repetition, `${runPath}/repetition`, 1, repetitions);
    slots.push(`${variantId}\u0000${repetition}`);
    const status = expectEnum(
      run.status,
      ['completed', 'failed', 'cancelled'] as const,
      `${runPath}/status`,
    );
    if (hasOwn(run, 'startedAt')) expectIsoDate(run.startedAt, `${runPath}/startedAt`);
    if (hasOwn(run, 'completedAt')) expectIsoDate(run.completedAt, `${runPath}/completedAt`);
    if (hasOwn(run, 'startedAt') && hasOwn(run, 'completedAt')) {
      if (Date.parse(run.completedAt as string) < Date.parse(run.startedAt as string)) {
        fail('INVALID_BUNDLE', `${runPath}/completedAt`, 'must not be before startedAt');
      }
    }
    const duration = expectFiniteNumber(run.durationMs, `${runPath}/durationMs`);
    if (duration < 0) fail('INVALID_BUNDLE', `${runPath}/durationMs`, 'must be non-negative');
    const metrics = expectArray(run.metrics, `${runPath}/metrics`, MAX_METRICS_PER_RUN);
    const observedKeys: string[] = [];
    metrics.forEach((metricItem, metricIndex) => {
      const metricPath = `${runPath}/metrics/${metricIndex}`;
      const metric = expectRecord(metricItem, metricPath);
      expectKeys(
        metric,
        ['observedKey', 'canonicalKey', 'value', 'source'],
        ['observedKey', 'canonicalKey', 'value', 'source'],
        metricPath,
      );
      observedKeys.push(expectString(metric.observedKey, `${metricPath}/observedKey`, MAX_SHORT_TEXT));
      expectString(metric.canonicalKey, `${metricPath}/canonicalKey`, MAX_SHORT_TEXT);
      expectFiniteNumber(metric.value, `${metricPath}/value`);
      expectEnum(metric.source, ['output_summary', 'progress', 'client'] as const, `${metricPath}/source`);
    });
    ensureUnique(observedKeys, `${runPath}/metrics`, 'observed metric keys');
    if (hasOwn(run, 'error')) validateRunError(run.error, `${runPath}/error`);
    if (status === 'completed' && hasOwn(run, 'error')) {
      fail('INVALID_BUNDLE', `${runPath}/error`, 'completed runs must not contain an error');
    }
    if (status !== 'completed' && !hasOwn(run, 'error')) {
      fail('INVALID_BUNDLE', runPath, `${status} runs require an error`);
    }
  });
  ensureUnique(runKeys, path, 'run keys');
  ensureUnique(slots, path, 'variant/repetition slots');
}

function validatePaperIdea(value: unknown, path: string): void {
  const idea = expectRecord(value, path);
  expectKeys(idea, ['title', 'evidence', 'nextStep'], ['title', 'evidence', 'nextStep'], path);
  expectString(idea.title, `${path}/title`, MAX_LONG_TEXT);
  expectString(idea.evidence, `${path}/evidence`, MAX_LONG_TEXT);
  expectString(idea.nextStep, `${path}/nextStep`, MAX_LONG_TEXT);
}

function validateDerivedVariant(value: unknown, path: string): void {
  const variant = expectRecord(value, path);
  expectKeys(
    variant,
    [
      'id', 'label', 'status', 'metricKey', 'metricValues', 'mean', 'stddev',
      'confidenceInterval95', 'baselineComparison', 'runtimeMs', 'observedMetrics',
      'operationSummary', 'errors',
    ],
    ['id', 'label', 'status', 'metricValues', 'runtimeMs', 'observedMetrics', 'errors'],
    path,
  );
  expectId(variant.id, `${path}/id`);
  expectString(variant.label, `${path}/label`, MAX_SHORT_TEXT);
  expectEnum(variant.status, ['completed', 'invalid', 'failed'] as const, `${path}/status`);
  if (hasOwn(variant, 'metricKey')) expectString(variant.metricKey, `${path}/metricKey`, MAX_SHORT_TEXT);
  expectArray(variant.metricValues, `${path}/metricValues`, 5).forEach((item, index) => {
    expectFiniteNumber(item, `${path}/metricValues/${index}`);
  });
  if (hasOwn(variant, 'mean')) expectFiniteNumber(variant.mean, `${path}/mean`);
  if (hasOwn(variant, 'stddev')) {
    const spread = expectFiniteNumber(variant.stddev, `${path}/stddev`);
    if (spread < 0) fail('INVALID_BUNDLE', `${path}/stddev`, 'must be non-negative');
  }
  if (hasOwn(variant, 'confidenceInterval95')) {
    const interval = expectRecord(variant.confidenceInterval95, `${path}/confidenceInterval95`);
    expectKeys(
      interval,
      ['level', 'lower', 'upper'],
      ['level', 'lower', 'upper'],
      `${path}/confidenceInterval95`,
    );
    if (interval.level !== 0.95) {
      fail('INVALID_BUNDLE', `${path}/confidenceInterval95/level`, 'must be 0.95');
    }
    const lower = expectFiniteNumber(interval.lower, `${path}/confidenceInterval95/lower`);
    const upper = expectFiniteNumber(interval.upper, `${path}/confidenceInterval95/upper`);
    if (lower > upper) {
      fail('INVALID_BUNDLE', `${path}/confidenceInterval95`, 'lower must not exceed upper');
    }
  }
  if (hasOwn(variant, 'baselineComparison')) {
    const comparison = expectRecord(variant.baselineComparison, `${path}/baselineComparison`);
    expectKeys(
      comparison,
      ['baselineId', 'meanDelta', 'objectiveImprovement', 'hedgesG'],
      ['baselineId', 'meanDelta', 'objectiveImprovement'],
      `${path}/baselineComparison`,
    );
    expectId(comparison.baselineId, `${path}/baselineComparison/baselineId`);
    expectFiniteNumber(comparison.meanDelta, `${path}/baselineComparison/meanDelta`);
    expectFiniteNumber(
      comparison.objectiveImprovement,
      `${path}/baselineComparison/objectiveImprovement`,
    );
    if (hasOwn(comparison, 'hedgesG')) {
      expectFiniteNumber(comparison.hedgesG, `${path}/baselineComparison/hedgesG`);
    }
  }
  const runtime = expectFiniteNumber(variant.runtimeMs, `${path}/runtimeMs`);
  if (runtime < 0) fail('INVALID_BUNDLE', `${path}/runtimeMs`, 'must be non-negative');
  const metrics = expectArray(variant.observedMetrics, `${path}/observedMetrics`, MAX_METRICS_PER_RUN);
  const metricKeys: string[] = [];
  metrics.forEach((item, index) => {
    const metricPath = `${path}/observedMetrics/${index}`;
    const metric = expectRecord(item, metricPath);
    expectKeys(metric, ['key', 'value'], ['key', 'value'], metricPath);
    metricKeys.push(expectString(metric.key, `${metricPath}/key`, MAX_SHORT_TEXT));
    expectFiniteNumber(metric.value, `${metricPath}/value`);
  });
  ensureUnique(metricKeys, `${path}/observedMetrics`, 'derived metric keys');
  if (hasOwn(variant, 'operationSummary')) {
    expectArray(variant.operationSummary, `${path}/operationSummary`, MAX_OPERATIONS_PER_VARIANT)
      .forEach((item, index) => expectString(item, `${path}/operationSummary/${index}`, MAX_LONG_TEXT));
  }
  expectArray(variant.errors, `${path}/errors`, MAX_OPERATIONS_PER_VARIANT)
    .forEach((item, index) => expectString(item, `${path}/errors/${index}`, MAX_LONG_TEXT));
}

interface RecomputedVariantEvidence {
  readonly record: UnknownRecord;
  readonly id: string;
  readonly label: string;
  readonly values: number[];
  readonly metricKey?: string;
  readonly fullyObserved: boolean;
  readonly preRankingStatus: 'completed' | 'invalid' | 'failed';
  finalStatus: 'completed' | 'invalid' | 'failed';
  readonly mean?: number;
}

function normalizeMetricSelector(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '');
}

function evidenceNumbersEqual(left: number, right: number): boolean {
  if (Object.is(left, right) || left === right) return true;
  return Math.abs(left - right)
    <= Number.EPSILON * 32 * Math.max(1, Math.abs(left), Math.abs(right));
}

function requireEvidenceNumber(
  record: UnknownRecord,
  key: string,
  expected: number | undefined,
  path: string,
): void {
  const present = hasOwn(record, key);
  if (expected === undefined) {
    if (present) fail('INVALID_BUNDLE', `${path}/${key}`, 'is not supported by the raw run evidence');
    return;
  }
  if (!present) fail('INVALID_BUNDLE', path, `${key} is required by the raw run evidence`);
  const actual = expectFiniteNumber(record[key], `${path}/${key}`);
  if (!evidenceNumbersEqual(actual, expected)) {
    fail('INVALID_BUNDLE', `${path}/${key}`, `does not match raw run evidence (expected ${expected})`);
  }
}

function assertCanonicalObjectiveSamplesAgree(
  run: StudyRunRecordV1,
  canonicalKey: string,
  path: string,
): void {
  const samples = run.metrics.filter((metric) => metric.canonicalKey === canonicalKey);
  if (samples.length < 2) return;
  const first = samples[0].value;
  if (samples.some((sample) => sample.value !== first)) {
    fail(
      'INVALID_BUNDLE',
      `${path}/metrics`,
      `conflicting duplicate samples resolve to objective identity '${canonicalKey}'`,
    );
  }
}

function resolveRawObjectiveMetric(
  run: StudyRunRecordV1,
  objective: StudySpecV1['objective'],
  path: string,
): { key: string; value: number } | undefined {
  const entries = [...run.metrics];
  if (entries.length === 0) return undefined;
  const resolved = (sample: StudyMetricSampleV1) => {
    assertCanonicalObjectiveSamplesAgree(run, sample.canonicalKey, path);
    return { key: sample.canonicalKey, value: sample.value };
  };
  const oneIdentity = (matches: StudyMetricSampleV1[]) => {
    const canonical = new Set(matches.map((sample) => sample.canonicalKey));
    return canonical.size === 1 && matches.length > 0 ? resolved(matches[0]) : undefined;
  };
  const selector = objective.metric.trim();
  const exact = entries.find((sample) => sample.observedKey === selector)
    ?? entries.find((sample) => sample.observedKey.toLowerCase() === selector.toLowerCase());
  if (exact) return resolved(exact);

  if (selector && selector.toLowerCase() !== 'auto') {
    const normalized = normalizeMetricSelector(selector);
    return oneIdentity(entries.filter((sample) => {
      const candidate = normalizeMetricSelector(sample.observedKey);
      return candidate === normalized || candidate.endsWith(`.${normalized}`);
    }));
  }

  const preferred = objective.direction === 'maximize'
    ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i
    : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i;
  const preferredMatches = entries.filter((sample) => preferred.test(sample.observedKey));
  if (preferredMatches.length > 0) return oneIdentity(preferredMatches);
  return objective.direction === 'minimize'
    ? oneIdentity(entries.filter((sample) => /(^|\.)runtime_ms$/i.test(sample.observedKey)))
    : undefined;
}

function validateMetricValues(
  record: UnknownRecord,
  expected: readonly number[],
  path: string,
): void {
  const actual = expectArray(record.metricValues, `${path}/metricValues`, 5)
    .map((value, index) => expectFiniteNumber(value, `${path}/metricValues/${index}`));
  if (
    actual.length !== expected.length
    || actual.some((value, index) => value !== expected[index])
  ) {
    fail('INVALID_BUNDLE', `${path}/metricValues`, 'does not match completed raw run evidence');
  }
}

function aggregateRawObservedMetrics(
  runs: readonly StudyRunRecordV1[],
): Array<{ key: string; value: number }> {
  const values = new Map<string, number[]>();
  for (const run of runs) {
    for (const metric of run.metrics) {
      const samples = values.get(metric.observedKey) ?? [];
      samples.push(metric.value);
      values.set(metric.observedKey, samples);
    }
  }
  return [...values.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .slice(0, MAX_DERIVED_OBSERVED_METRICS)
    .map(([key, samples]) => ({ key, value: sampleMean(samples)! }));
}

function validateObservedMetrics(
  record: UnknownRecord,
  expected: readonly { key: string; value: number }[],
  path: string,
): void {
  const actual = expectArray(
    record.observedMetrics,
    `${path}/observedMetrics`,
    MAX_METRICS_PER_RUN,
  ).map((value, index) => {
    const metric = expectRecord(value, `${path}/observedMetrics/${index}`);
    return {
      key: expectString(metric.key, `${path}/observedMetrics/${index}/key`, MAX_SHORT_TEXT),
      value: expectFiniteNumber(metric.value, `${path}/observedMetrics/${index}/value`),
    };
  });
  if (
    actual.length !== expected.length
    || actual.some((metric, index) => (
      metric.key !== expected[index].key
      || !evidenceNumbersEqual(metric.value, expected[index].value)
    ))
  ) {
    fail('INVALID_BUNDLE', `${path}/observedMetrics`, 'does not match raw run evidence');
  }
}

function validateConfidenceInterval(
  record: UnknownRecord,
  values: readonly number[],
  fullyObserved: boolean,
  path: string,
): void {
  const expected = fullyObserved ? studentTCI95(values) : undefined;
  if (!expected) {
    if (hasOwn(record, 'confidenceInterval95')) {
      fail(
        'INVALID_BUNDLE',
        `${path}/confidenceInterval95`,
        'is not supported by the raw run evidence',
      );
    }
    return;
  }
  if (!hasOwn(record, 'confidenceInterval95')) {
    fail('INVALID_BUNDLE', path, 'confidenceInterval95 is required by the raw run evidence');
  }
  const interval = expectRecord(record.confidenceInterval95, `${path}/confidenceInterval95`);
  requireEvidenceNumber(interval, 'lower', expected.lower, `${path}/confidenceInterval95`);
  requireEvidenceNumber(interval, 'upper', expected.upper, `${path}/confidenceInterval95`);
}

function validateBaselineComparison(
  record: UnknownRecord,
  expected: ReturnType<typeof compareToBaseline>,
  baselineId: string,
  path: string,
): void {
  if (!expected) {
    if (hasOwn(record, 'baselineComparison')) {
      fail('INVALID_BUNDLE', `${path}/baselineComparison`, 'is not supported by the raw run evidence');
    }
    return;
  }
  if (!hasOwn(record, 'baselineComparison')) {
    fail('INVALID_BUNDLE', path, 'baselineComparison is required by the raw run evidence');
  }
  const comparison = expectRecord(record.baselineComparison, `${path}/baselineComparison`);
  if (comparison.baselineId !== baselineId) {
    fail('INVALID_BUNDLE', `${path}/baselineComparison/baselineId`, 'does not match the evidence baseline');
  }
  requireEvidenceNumber(comparison, 'meanDelta', expected.rawDelta, `${path}/baselineComparison`);
  requireEvidenceNumber(
    comparison,
    'objectiveImprovement',
    expected.improvement,
    `${path}/baselineComparison`,
  );
  requireEvidenceNumber(comparison, 'hedgesG', expected.hedgesG, `${path}/baselineComparison`);
}

/**
 * SHA-256 only proves that bytes match the included digest. Derived numerical
 * claims therefore have to be reproducible from the raw run records before an
 * imported bundle can be treated as internally consistent evidence.
 */
function validateDerivedEvidenceConsistency(
  derivedValue: UnknownRecord,
  payloadValue: UnknownRecord,
  path: string,
): void {
  const spec = payloadValue.spec as StudySpecV1;
  const runs = payloadValue.runs as readonly StudyRunRecordV1[];
  const derivedVariants = derivedValue.variants as unknown[];
  const recomputed = derivedVariants.map((value, index): RecomputedVariantEvidence => {
    const variantPath = `${path}/variants/${index}`;
    const record = expectRecord(value, variantPath);
    const id = record.id as string;
    const label = record.label as string;
    const ownRuns = runs
      .filter((run) => run.variantId === id)
      .sort((left, right) => left.repetition - right.repetition || left.runKey.localeCompare(right.runKey));
    const completed = ownRuns.filter((run) => run.status === 'completed');
    const selected = completed
      .map((run) => resolveRawObjectiveMetric(run, spec.objective, `/payload/runs/${runs.indexOf(run)}`))
      .filter((item): item is { key: string; value: number } => item !== undefined);
    const metricKeys = new Set(selected.map((item) => item.key));
    const values = selected.map((item) => item.value);
    const metricKey = metricKeys.size === 1 ? selected[0]?.key : undefined;
    const fullyObserved = completed.length === spec.repetitions
      && selected.length === spec.repetitions
      && metricKeys.size === 1;
    const declaredStatus = record.status as RecomputedVariantEvidence['finalStatus'];
    if (declaredStatus === 'invalid' && ownRuns.length > 0) {
      fail('INVALID_BUNDLE', `${variantPath}/status`, 'invalid variants must not contain execution runs');
    }
    const preRankingStatus = declaredStatus === 'invalid'
      ? 'invalid'
      : fullyObserved ? 'completed' : 'failed';

    if (metricKey === undefined) {
      if (hasOwn(record, 'metricKey')) {
        fail('INVALID_BUNDLE', `${variantPath}/metricKey`, 'is not supported by the raw run evidence');
      }
    } else if (record.metricKey !== metricKey) {
      fail(
        'INVALID_BUNDLE',
        `${variantPath}/metricKey`,
        `does not match raw run identity '${metricKey}'`,
      );
    }
    const runtime = sampleMean(ownRuns.map((run) => run.durationMs)) ?? 0;
    requireEvidenceNumber(record, 'runtimeMs', runtime, variantPath);
    validateObservedMetrics(record, aggregateRawObservedMetrics(ownRuns), variantPath);

    return {
      record,
      id,
      label,
      values,
      ...(metricKey === undefined ? {} : { metricKey }),
      fullyObserved,
      preRankingStatus,
      finalStatus: preRankingStatus,
      ...(fullyObserved ? { mean: sampleMean(values) } : {}),
    };
  });

  const candidateMetricKeys = new Set(
    recomputed
      .filter((variant) => variant.preRankingStatus === 'completed' && variant.metricKey)
      .map((variant) => normalizeMetricSelector(variant.metricKey!)),
  );
  if (candidateMetricKeys.size > 1) {
    recomputed.forEach((variant) => {
      if (variant.preRankingStatus === 'completed') variant.finalStatus = 'failed';
    });
  }

  recomputed.forEach((variant, index) => {
    const variantPath = `${path}/variants/${index}`;
    if (variant.record.status !== variant.finalStatus) {
      fail(
        'INVALID_BUNDLE',
        `${variantPath}/status`,
        `does not match raw run evidence (expected ${variant.finalStatus})`,
      );
    }
    const crossCandidateMismatch = variant.preRankingStatus === 'completed'
      && variant.finalStatus === 'failed';
    validateMetricValues(
      variant.record,
      crossCandidateMismatch ? [] : variant.values,
      variantPath,
    );
    validateConfidenceInterval(
      variant.record,
      variant.values,
      variant.finalStatus === 'completed',
      variantPath,
    );
    const finalMean = variant.finalStatus === 'completed' ? variant.mean : undefined;
    requireEvidenceNumber(variant.record, 'mean', finalMean, variantPath);
    requireEvidenceNumber(
      variant.record,
      'stddev',
      variant.finalStatus === 'completed' ? sampleStddev(variant.values) : undefined,
      variantPath,
    );
  });

  const baselineId = hasOwn(derivedValue, 'baselineVariantId')
    ? derivedValue.baselineVariantId as string
    : undefined;
  if (baselineId !== undefined) {
    const specBaselines = spec.variants.filter((variant) => variant.operations.length === 0);
    if (specBaselines.length !== 1 || specBaselines[0].id !== baselineId) {
      fail(
        'INVALID_BUNDLE',
        `${path}/baselineVariantId`,
        'must identify the single zero-operation baseline from the study spec',
      );
    }
    const baseline = recomputed.find((variant) => variant.id === baselineId)!;
    recomputed.forEach((variant, index) => {
      const expected = variant.id !== baselineId
        && baseline.finalStatus === 'completed'
        && variant.finalStatus === 'completed'
        ? compareToBaseline(variant.values, baseline.values, spec.objective.direction)
        : undefined;
      validateBaselineComparison(
        variant.record,
        expected,
        baselineId,
        `${path}/variants/${index}`,
      );
    });
  }

  const ranked = recomputed
    .filter((variant) => variant.finalStatus === 'completed' && variant.mean !== undefined)
    .sort((left, right) => {
      const score = spec.objective.direction === 'maximize'
        ? right.mean! - left.mean!
        : left.mean! - right.mean!;
      return score || left.id.localeCompare(right.id);
    });
  const top = ranked[0];
  const tieTolerance = top
    ? Math.max(1, Math.abs(top.mean!)) * Number.EPSILON * 8
    : 0;
  const tied = top
    ? ranked.filter((variant) => Math.abs(variant.mean! - top.mean!) <= tieTolerance)
    : [];
  const winner = tied.length === 1 ? top : undefined;
  if (!winner) {
    if (hasOwn(derivedValue, 'winnerId') || hasOwn(derivedValue, 'winnerLabel')) {
      fail('INVALID_BUNDLE', `${path}/winnerId`, 'no unique winner is supported by the raw run evidence');
    }
  } else if (derivedValue.winnerId !== winner.id || derivedValue.winnerLabel !== winner.label) {
    fail(
      'INVALID_BUNDLE',
      `${path}/winnerId`,
      `does not match the raw-run winner '${winner.id}'`,
    );
  }

  const expectedStatus: ExperimentStatus = ranked.length === 0
    ? 'failed'
    : recomputed.every((variant) => variant.finalStatus === 'completed') ? 'completed' : 'partial';
  if (derivedValue.status !== expectedStatus) {
    fail(
      'INVALID_BUNDLE',
      `${path}/status`,
      `does not match raw run evidence (expected ${expectedStatus})`,
    );
  }
}

function validateDerived(value: unknown, payload: UnknownRecord, path: string): void {
  const derived = expectRecord(value, path);
  expectKeys(
    derived,
    [
      'status', 'variants', 'baselineVariantId', 'winnerId', 'winnerLabel',
      'appliedVariantId', 'applyConflict', 'insights',
    ],
    ['status', 'variants', 'insights'],
    path,
  );
  expectEnum(derived.status, ['completed', 'partial', 'failed'] as const, `${path}/status`);
  const variants = expectArray(derived.variants, `${path}/variants`, STUDY_BUNDLE_MAX_VARIANTS);
  const ids: string[] = [];
  const labels = new Map<string, string>();
  variants.forEach((item, index) => {
    validateDerivedVariant(item, `${path}/variants/${index}`);
    const record = expectRecord(item, `${path}/variants/${index}`);
    const id = expectId(record.id, `${path}/variants/${index}/id`);
    ids.push(id);
    labels.set(id, expectString(record.label, `${path}/variants/${index}/label`, MAX_SHORT_TEXT));
  });
  ensureUnique(ids, `${path}/variants`, 'derived variant ids');
  const spec = expectRecord(payload.spec, '/payload/spec');
  const specLabels = new Map<string, string>();
  const specIds = expectArray(spec.variants, '/payload/spec/variants', STUDY_BUNDLE_MAX_VARIANTS)
    .map((item, index) => {
      const specVariant = expectRecord(item, `/payload/spec/variants/${index}`);
      const id = expectId(specVariant.id, `/payload/spec/variants/${index}/id`);
      specLabels.set(
        id,
        expectString(specVariant.label, `/payload/spec/variants/${index}/label`, MAX_SHORT_TEXT),
      );
      return id;
    });
  if (ids.length !== specIds.length || ids.some((id) => !specIds.includes(id))) {
    fail('INVALID_BUNDLE', `${path}/variants`, 'must match spec variant ids exactly');
  }
  for (const id of ids) {
    if (labels.get(id) !== specLabels.get(id)) {
      fail('INVALID_BUNDLE', `${path}/variants`, `label for variant '${id}' does not match the spec`);
    }
  }
  if (hasOwn(derived, 'baselineVariantId')) {
    const baselineId = expectId(derived.baselineVariantId, `${path}/baselineVariantId`);
    if (!labels.has(baselineId)) {
      fail('INVALID_BUNDLE', `${path}/baselineVariantId`, 'unknown baseline variant');
    }
    variants.forEach((item, index) => {
      const candidate = expectRecord(item, `${path}/variants/${index}`);
      if (!hasOwn(candidate, 'baselineComparison')) return;
      const comparison = expectRecord(
        candidate.baselineComparison,
        `${path}/variants/${index}/baselineComparison`,
      );
      if (comparison.baselineId !== baselineId) {
        fail(
          'INVALID_BUNDLE',
          `${path}/variants/${index}/baselineComparison/baselineId`,
          'must match derived baselineVariantId',
        );
      }
    });
  } else if (variants.some((item) => hasOwn(expectRecord(item, path), 'baselineComparison'))) {
    fail('INVALID_BUNDLE', `${path}/variants`, 'baselineComparison requires baselineVariantId');
  }
  if (hasOwn(derived, 'winnerId')) {
    const winnerId = expectId(derived.winnerId, `${path}/winnerId`);
    if (!labels.has(winnerId)) fail('INVALID_BUNDLE', `${path}/winnerId`, 'unknown winner variant');
    if (hasOwn(derived, 'winnerLabel')) {
      const winnerLabel = expectString(derived.winnerLabel, `${path}/winnerLabel`, MAX_SHORT_TEXT);
      if (winnerLabel !== labels.get(winnerId)) {
        fail('INVALID_BUNDLE', `${path}/winnerLabel`, 'does not match the winner variant label');
      }
    }
  } else if (hasOwn(derived, 'winnerLabel')) {
    fail('INVALID_BUNDLE', `${path}/winnerLabel`, 'winnerLabel requires winnerId');
  }
  if (hasOwn(derived, 'appliedVariantId')) {
    const applied = expectId(derived.appliedVariantId, `${path}/appliedVariantId`);
    if (!labels.has(applied)) fail('INVALID_BUNDLE', `${path}/appliedVariantId`, 'unknown applied variant');
  }
  if (hasOwn(derived, 'applyConflict')) {
    expectString(derived.applyConflict, `${path}/applyConflict`, MAX_LONG_TEXT);
  }
  const insights = expectRecord(derived.insights, `${path}/insights`);
  expectKeys(insights, ['summary', 'warnings', 'paperIdeas'], ['summary', 'warnings', 'paperIdeas'], `${path}/insights`);
  expectArray(insights.summary, `${path}/insights/summary`, 1_000)
    .forEach((item, index) => expectString(item, `${path}/insights/summary/${index}`, MAX_LONG_TEXT));
  expectArray(insights.warnings, `${path}/insights/warnings`, 1_000)
    .forEach((item, index) => expectString(item, `${path}/insights/warnings/${index}`, MAX_LONG_TEXT));
  expectArray(insights.paperIdeas, `${path}/insights/paperIdeas`, 1_000)
    .forEach((item, index) => validatePaperIdea(item, `${path}/insights/paperIdeas/${index}`));
  validateDerivedEvidenceConsistency(derived, payload, path);
}

function isJsonPointer(value: string): boolean {
  return value.startsWith('/') && !/~(?:[^01]|$)/.test(value);
}

function collectSecretRefs(
  value: unknown,
  path: string,
  refs: Map<string, string[]>,
): void {
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectSecretRefs(item, `${path}/${index}`, refs));
    return;
  }
  const record = expectRecord(value, path);
  if (hasOwn(record, '$gcpSecretRef')) {
    expectKeys(record, ['$gcpSecretRef'], ['$gcpSecretRef'], path);
    const id = expectId(record.$gcpSecretRef, `${path}/$gcpSecretRef`);
    const locations = refs.get(id) ?? [];
    locations.push(path);
    refs.set(id, locations);
    return;
  }
  for (const [key, child] of Object.entries(record)) {
    collectSecretRefs(child, `${path}/${escapePointer(key)}`, refs);
  }
}

function validateRedactionReport(value: unknown, payload: UnknownRecord, path: string): void {
  const report = expectRecord(value, path);
  expectKeys(
    report,
    ['policy', 'secretRequirements', 'textRedactions'],
    ['policy', 'secretRequirements', 'textRedactions'],
    path,
  );
  if (report.policy !== 'explicit-secret-ref-v1') {
    fail('INVALID_BUNDLE', `${path}/policy`, "expected 'explicit-secret-ref-v1'");
  }
  const requirements = expectArray(
    report.secretRequirements,
    `${path}/secretRequirements`,
    MAX_REDACTION_RECORDS,
  );
  const ids: string[] = [];
  const declaredLocations = new Map<string, string[]>();
  requirements.forEach((item, index) => {
    const requirementPath = `${path}/secretRequirements/${index}`;
    const requirement = expectRecord(item, requirementPath);
    expectKeys(
      requirement,
      ['id', 'locations', 'reason', 'requiredAtReplay', 'nodeType', 'parameter'],
      ['id', 'locations', 'reason', 'requiredAtReplay'],
      requirementPath,
    );
    const id = expectId(requirement.id, `${requirementPath}/id`);
    ids.push(id);
    const locations = expectArray(requirement.locations, `${requirementPath}/locations`, MAX_REDACTION_RECORDS)
      .map((location, locationIndex) => {
        const pointer = expectString(
          location,
          `${requirementPath}/locations/${locationIndex}`,
          MAX_LONG_TEXT,
        );
        if (!isJsonPointer(pointer)) {
          fail('INVALID_BUNDLE', `${requirementPath}/locations/${locationIndex}`, 'expected a valid JSON Pointer');
        }
        return pointer;
      });
    if (locations.length === 0) {
      fail('INVALID_BUNDLE', `${requirementPath}/locations`, 'at least one location is required');
    }
    ensureUnique(locations, `${requirementPath}/locations`, 'secret locations');
    declaredLocations.set(id, [...locations].sort());
    expectString(requirement.reason, `${requirementPath}/reason`, MAX_LONG_TEXT);
    expectBoolean(requirement.requiredAtReplay, `${requirementPath}/requiredAtReplay`);
    if (hasOwn(requirement, 'nodeType')) {
      expectString(requirement.nodeType, `${requirementPath}/nodeType`, MAX_SHORT_TEXT);
    }
    if (hasOwn(requirement, 'parameter')) {
      expectString(requirement.parameter, `${requirementPath}/parameter`, MAX_SHORT_TEXT);
    }
  });
  ensureUnique(ids, `${path}/secretRequirements`, 'secret requirement ids');

  const textRedactions = expectArray(
    report.textRedactions,
    `${path}/textRedactions`,
    MAX_REDACTION_RECORDS,
  );
  textRedactions.forEach((item, index) => {
    const redactionPath = `${path}/textRedactions/${index}`;
    const redaction = expectRecord(item, redactionPath);
    expectKeys(redaction, ['locations', 'reason'], ['locations', 'reason'], redactionPath);
    const locations = expectArray(redaction.locations, `${redactionPath}/locations`, MAX_REDACTION_RECORDS);
    if (locations.length === 0) {
      fail('INVALID_BUNDLE', `${redactionPath}/locations`, 'at least one location is required');
    }
    locations.forEach((location, locationIndex) => {
      const pointer = expectString(location, `${redactionPath}/locations/${locationIndex}`, MAX_LONG_TEXT);
      if (!isJsonPointer(pointer)) {
        fail('INVALID_BUNDLE', `${redactionPath}/locations/${locationIndex}`, 'expected a valid JSON Pointer');
      }
    });
    expectString(redaction.reason, `${redactionPath}/reason`, MAX_LONG_TEXT);
  });

  const actualRefs = new Map<string, string[]>();
  const spec = expectRecord(payload.spec, '/payload/spec');
  collectSecretRefs(spec.baseline, '/spec/baseline', actualRefs);
  const variants = expectArray(spec.variants, '/payload/spec/variants', STUDY_BUNDLE_MAX_VARIANTS);
  variants.forEach((item, index) => {
    const variant = expectRecord(item, `/payload/spec/variants/${index}`);
    collectSecretRefs(variant.operations, `/spec/variants/${index}/operations`, actualRefs);
  });

  const actualIds = [...actualRefs.keys()].sort();
  const requirementIds = [...declaredLocations.keys()].sort();
  if (
    actualIds.length !== requirementIds.length
    || actualIds.some((id, index) => id !== requirementIds[index])
  ) {
    fail(
      'INVALID_BUNDLE',
      `${path}/secretRequirements`,
      `must declare exactly the SecretRefs used by the spec (used: ${actualIds.join(', ') || 'none'})`,
    );
  }
  for (const id of actualIds) {
    const actual = [...actualRefs.get(id)!].sort();
    const declared = declaredLocations.get(id)!;
    if (actual.length !== declared.length || actual.some((item, index) => item !== declared[index])) {
      fail(
        'INVALID_BUNDLE',
        `${path}/secretRequirements`,
        `locations for SecretRef '${id}' do not match the spec`,
      );
    }
  }
}

function validatePayload(value: unknown, path: string): UnknownRecord {
  const payload = expectRecord(value, path);
  expectKeys(
    payload,
    ['id', 'createdAt', 'completedAt', 'producer', 'provenance', 'spec', 'runs', 'derived', 'redactionReport'],
    ['id', 'createdAt', 'completedAt', 'producer', 'provenance', 'spec', 'runs', 'derived', 'redactionReport'],
    path,
  );
  expectId(payload.id, `${path}/id`);
  const createdAt = expectIsoDate(payload.createdAt, `${path}/createdAt`);
  const completedAt = expectIsoDate(payload.completedAt, `${path}/completedAt`);
  if (Date.parse(completedAt) < Date.parse(createdAt)) {
    fail('INVALID_BUNDLE', `${path}/completedAt`, 'must not be before createdAt');
  }
  validateProducer(payload.producer, `${path}/producer`);
  validateProvenance(payload.provenance, `${path}/provenance`);
  validateSpec(payload.spec, `${path}/spec`);
  validateRuns(payload.runs, payload, `${path}/runs`);
  validateDerived(payload.derived, payload, `${path}/derived`);
  validateRedactionReport(payload.redactionReport, payload, `${path}/redactionReport`);
  return payload;
}

function validateIntegrity(value: unknown, path: string): StudyBundleIntegrityV1 {
  const integrity = expectRecord(value, path);
  expectKeys(
    integrity,
    ['algorithm', 'canonicalization', 'contentSha256'],
    ['algorithm', 'canonicalization', 'contentSha256'],
    path,
  );
  if (integrity.algorithm !== 'SHA-256') fail('INVALID_BUNDLE', `${path}/algorithm`, "expected 'SHA-256'");
  if (integrity.canonicalization !== STUDY_CANONICALIZATION) {
    fail('INVALID_BUNDLE', `${path}/canonicalization`, `expected '${STUDY_CANONICALIZATION}'`);
  }
  const digest = expectString(integrity.contentSha256, `${path}/contentSha256`, 64);
  if (!/^[a-f0-9]{64}$/.test(digest)) {
    fail('INVALID_BUNDLE', `${path}/contentSha256`, 'expected 64 lowercase hexadecimal characters');
  }
  return integrity as unknown as StudyBundleIntegrityV1;
}

function validateRoot(value: unknown): { root: UnknownRecord; payload: UnknownRecord; integrity: StudyBundleIntegrityV1 } {
  // Run the generic JSON/value limits before schema-specific access.
  canonicalStudyJson(value);
  const root = expectRecord(value, '/');
  if (root.format !== STUDY_BUNDLE_FORMAT) {
    throw new StudyBundleError(
      'UNSUPPORTED_FORMAT',
      `Unsupported study bundle format '${String(root.format ?? '')}'`,
    );
  }
  if (typeof root.formatVersion !== 'number' || !Number.isInteger(root.formatVersion)) {
    throw new StudyBundleError('UNSUPPORTED_VERSION', 'Study bundle formatVersion must be an integer');
  }
  if (root.formatVersion > STUDY_BUNDLE_VERSION) {
    throw new StudyBundleError(
      'FUTURE_VERSION',
      `Study bundle version ${root.formatVersion} requires a newer Graph Copilot`,
    );
  }
  if (root.formatVersion !== STUDY_BUNDLE_VERSION) {
    throw new StudyBundleError(
      'UNSUPPORTED_VERSION',
      `Study bundle version ${root.formatVersion} is not supported`,
    );
  }
  expectKeys(root, ['format', 'formatVersion', 'payload', 'integrity'], ['format', 'formatVersion', 'payload', 'integrity'], '/');
  const payload = validatePayload(root.payload, '/payload');
  const integrity = validateIntegrity(root.integrity, '/integrity');
  return { root, payload, integrity };
}

function unsignedContent(payload: unknown): unknown {
  return {
    format: STUDY_BUNDLE_FORMAT,
    formatVersion: STUDY_BUNDLE_VERSION,
    payload,
  };
}

function deepFreeze<T>(value: T, seen = new WeakSet<object>()): T {
  if (!value || typeof value !== 'object' || seen.has(value as object)) return value;
  seen.add(value as object);
  for (const child of Object.values(value as UnknownRecord)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalStudyJson(value)) as T;
}

function optionalString(value: string | undefined, key: string): Record<string, string> {
  return value === undefined ? {} : { [key]: value };
}

function canonicalDerivedSummary(
  session: ExperimentSession,
  spec: StudySpecV1,
  runs: readonly StudyRunRecordV1[],
): DerivedStudySummaryV1 {
  const working = session.variants.map((variant) => {
    const ownRuns = runs
      .filter((run) => run.variantId === variant.id)
      .sort((left, right) => left.repetition - right.repetition || left.runKey.localeCompare(right.runKey));
    const completed = ownRuns.filter((run) => run.status === 'completed');
    const selected = completed
      .map((run) => resolveRawObjectiveMetric(run, spec.objective, `/payload/runs/${runs.indexOf(run)}`))
      .filter((item): item is { key: string; value: number } => item !== undefined);
    const metricKeys = new Set(selected.map((item) => item.key));
    const values = selected.map((item) => item.value);
    const metricKey = metricKeys.size === 1 ? selected[0]?.key : undefined;
    const fullyObserved = completed.length === spec.repetitions
      && selected.length === spec.repetitions
      && metricKeys.size === 1;
    const preRankingStatus: DerivedStudyVariantV1['status'] = variant.status === 'invalid'
      ? 'invalid'
      : fullyObserved ? 'completed' : 'failed';
    const interval = fullyObserved ? studentTCI95(values) : undefined;
    const average = fullyObserved ? sampleMean(values) : undefined;
    const spread = fullyObserved ? sampleStddev(values) : undefined;
    const result: DerivedStudyVariantV1 = {
      id: variant.id,
      label: variant.label,
      status: preRankingStatus,
      ...(metricKey === undefined ? {} : { metricKey }),
      metricValues: values,
      ...(average === undefined ? {} : { mean: average }),
      ...(spread === undefined ? {} : { stddev: spread }),
      ...(interval === undefined
        ? {}
        : {
          confidenceInterval95: {
            level: 0.95,
            lower: interval.lower,
            upper: interval.upper,
          },
        }),
      runtimeMs: sampleMean(ownRuns.map((run) => run.durationMs)) ?? 0,
      observedMetrics: aggregateRawObservedMetrics(ownRuns),
      ...(variant.operationSummary === undefined
        ? {}
        : { operationSummary: [...variant.operationSummary] }),
      errors: [...variant.errors],
    };
    return {
      id: variant.id,
      label: variant.label,
      values,
      ...(metricKey === undefined ? {} : { metricKey }),
      preRankingStatus,
      result,
    };
  });

  const candidateMetricKeys = new Set(
    working
      .filter((variant) => variant.preRankingStatus === 'completed' && variant.metricKey)
      .map((variant) => normalizeMetricSelector(variant.metricKey!)),
  );
  if (candidateMetricKeys.size > 1) {
    working.forEach((variant) => {
      if (variant.preRankingStatus !== 'completed') return;
      const {
        mean: _mean,
        stddev: _stddev,
        confidenceInterval95: _confidenceInterval95,
        baselineComparison: _baselineComparison,
        ...withoutRankedStatistics
      } = variant.result;
      variant.result = { ...withoutRankedStatistics, status: 'failed', metricValues: [] };
    });
  }

  if (session.baselineVariantId !== undefined) {
    const baseline = working.find((variant) => variant.id === session.baselineVariantId);
    if (baseline?.result.status === 'completed') {
      working.forEach((variant) => {
        if (variant.id === baseline.id || variant.result.status !== 'completed') return;
        const comparison = compareToBaseline(variant.values, baseline.values, spec.objective.direction);
        if (!comparison) return;
        variant.result = {
          ...variant.result,
          baselineComparison: {
            baselineId: baseline.id,
            meanDelta: comparison.rawDelta,
            objectiveImprovement: comparison.improvement,
            ...(comparison.hedgesG === undefined ? {} : { hedgesG: comparison.hedgesG }),
          },
        };
      });
    }
  }

  const ranked = working
    .filter((variant) => variant.result.status === 'completed' && variant.result.mean !== undefined)
    .sort((left, right) => {
      const score = spec.objective.direction === 'maximize'
        ? right.result.mean! - left.result.mean!
        : left.result.mean! - right.result.mean!;
      return score || left.id.localeCompare(right.id);
    });
  const top = ranked[0];
  const tieTolerance = top
    ? Math.max(1, Math.abs(top.result.mean!)) * Number.EPSILON * 8
    : 0;
  const tied = top
    ? ranked.filter((variant) => Math.abs(variant.result.mean! - top.result.mean!) <= tieTolerance)
    : [];
  const winner = tied.length === 1 ? top : undefined;
  const status: ExperimentStatus = ranked.length === 0
    ? 'failed'
    : working.every((variant) => variant.result.status === 'completed') ? 'completed' : 'partial';
  return {
    status,
    variants: working.map((variant) => variant.result),
    ...optionalString(session.baselineVariantId, 'baselineVariantId'),
    ...(winner === undefined ? {} : { winnerId: winner.id, winnerLabel: winner.label }),
    ...optionalString(session.appliedVariantId, 'appliedVariantId'),
    ...optionalString(session.applyConflict, 'applyConflict'),
    insights: {
      summary: [...session.insights.summary],
      warnings: [...session.insights.warnings],
      paperIdeas: session.insights.paperIdeas.map((idea) => ({ ...idea })),
    },
  };
}

/**
 * Validate integrity and return an immutable, canonical clone. This function
 * is data-only: it has no CodefyUI API parameter and cannot execute or apply a
 * graph.
 */
export async function verifyStudyBundle(value: unknown): Promise<StudyBundleV1> {
  const { payload, integrity } = validateRoot(value);
  const expected = await sha256(canonicalStudyJson(unsignedContent(payload)));
  if (expected !== integrity.contentSha256) {
    throw new StudyBundleError(
      'INTEGRITY_MISMATCH',
      `Study bundle integrity mismatch: expected ${expected}, received ${integrity.contentSha256}`,
    );
  }
  const cloned = canonicalClone(value) as StudyBundleV1;
  enforceEncodedSize(canonicalStudyJson(cloned));
  return deepFreeze(cloned);
}

/** Build a fully validated immutable portable bundle from a finished session. */
export async function createStudyBundle(input: CreateStudyBundleInput): Promise<StudyBundleV1> {
  const spec: StudySpecV1 = {
    hypothesis: input.session.hypothesis,
    baseline: input.baseline,
    objective: { ...input.session.objective },
    repetitions: input.session.repetitions,
    concurrency: input.concurrency ?? 1,
    applyBestRequested: input.applyBestRequested ?? false,
    variants: input.variants,
  };
  const payload: StudyBundlePayloadV1 = {
    id: input.session.id,
    createdAt: input.session.createdAt,
    completedAt: input.completedAt,
    producer: input.producer,
    provenance: input.provenance,
    spec,
    runs: input.runs,
    derived: canonicalDerivedSummary(input.session, spec, input.runs),
    redactionReport: input.redactionReport,
  };
  // Clone before hashing so later mutations of caller-owned values cannot
  // change the bundle behind its digest.
  const immutablePayload = canonicalClone(payload);
  const contentSha256 = await sha256(canonicalStudyJson(unsignedContent(immutablePayload)));
  return verifyStudyBundle({
    format: STUDY_BUNDLE_FORMAT,
    formatVersion: STUDY_BUNDLE_VERSION,
    payload: immutablePayload,
    integrity: {
      algorithm: 'SHA-256',
      canonicalization: STUDY_CANONICALIZATION,
      contentSha256,
    },
  });
}

/** Encode only after re-validating integrity; output is deterministic JSON. */
export async function encodeStudyBundle(value: unknown): Promise<string> {
  const bundle = await verifyStudyBundle(value);
  const encoded = canonicalStudyJson(bundle);
  enforceEncodedSize(encoded);
  return encoded;
}

/**
 * Parse untrusted JSON into immutable data. Parsing never runs a graph, calls
 * a URL, writes storage, or applies operations; execution authority belongs to
 * a separate, explicit approval flow.
 */
export async function parseStudyBundle(text: string): Promise<StudyBundleV1> {
  if (typeof text !== 'string') {
    throw new StudyBundleError('INVALID_JSON', 'Study bundle input must be text');
  }
  enforceEncodedSize(text);
  let parsed: unknown;
  try {
    parsed = JSON.parse(text) as unknown;
  } catch (error) {
    throw new StudyBundleError('INVALID_JSON', `Study bundle is not valid JSON: ${String(error)}`);
  }
  return verifyStudyBundle(parsed);
}
