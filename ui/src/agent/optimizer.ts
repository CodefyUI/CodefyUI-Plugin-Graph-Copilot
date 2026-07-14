import type { ExperimentSearchMetadata, GraphExperimentRequest } from './experiments';
import type {
  GraphOp,
  NodeDefinition,
  ParamDefinition,
  SerializedGraph,
  SerializedGraphNode,
} from '../types/codefyui';
import { isSensitiveKey } from './historyRedaction';

/** Version of the accepted optimizer request and emitted metadata. */
export const PARAMETER_OPTIMIZER_SCHEMA_VERSION = 1 as const;

/**
 * PRNG identity is part of the reproducibility contract. Changing the
 * algorithm or its draw order requires a new version string.
 */
export const PARAMETER_OPTIMIZER_PRNG_VERSION = 'mulberry32-v1' as const;

export const MAX_OPTIMIZER_BINDINGS = 4;
export const MAX_OPTIMIZER_DOMAIN_VALUES = 32;
export const MAX_OPTIMIZER_VARIANTS = 8;
export const MAX_OPTIMIZER_RUNS = 16;

export type OptimizerStrategy = 'grid' | 'seeded_random';
export type OptimizerScalar = number | boolean | string;
export type OptimizableParamType = 'int' | 'float' | 'bool' | 'select';

export interface ParameterOptimizerBindingInput {
  node_id: string;
  param: string;
  values: OptimizerScalar[];
}

export interface ParameterOptimizerInput {
  version?: 1;
  strategy: OptimizerStrategy;
  hypothesis: string;
  objective: {
    metric: string;
    direction: 'maximize' | 'minimize';
  };
  bindings: ParameterOptimizerBindingInput[];
  /** Required only for seeded_random. Counts changed candidates, not baseline. */
  candidate_count?: number;
  /** Required only for seeded_random. This controls planning, not graph RNG. */
  seed?: number;
  include_baseline?: boolean;
  repetitions?: number;
  concurrency?: number;
  apply_best?: boolean;
}

export interface CompiledOptimizerBinding {
  nodeId: string;
  nodeType: string;
  param: string;
  paramType: OptimizableParamType;
  baselineValue: OptimizerScalar;
  domain: OptimizerScalar[];
}

export interface CompiledOptimizerAssignmentValue {
  nodeId: string;
  param: string;
  value: OptimizerScalar;
}

export interface CompiledOptimizerAssignment {
  variantId: string;
  domainIndex: number;
  values: CompiledOptimizerAssignmentValue[];
}

export interface ParameterOptimizerMetadata extends ExperimentSearchMetadata {
  bindings: CompiledOptimizerBinding[];
  assignments: CompiledOptimizerAssignment[];
}

export interface CompiledParameterOptimizer {
  request: GraphExperimentRequest;
  metadata: ParameterOptimizerMetadata;
}

interface ResolvedBinding {
  node: SerializedGraphNode;
  definition: NodeDefinition;
  parameter: ParamDefinition & { param_type: OptimizableParamType };
  nodeId: string;
  paramName: string;
  baselineValue: OptimizerScalar;
  domain: OptimizerScalar[];
}

const TOP_LEVEL_KEYS = new Set([
  'version',
  'strategy',
  'hypothesis',
  'objective',
  'bindings',
  'candidate_count',
  'seed',
  'include_baseline',
  'repetitions',
  'concurrency',
  'apply_best',
]);
const OBJECTIVE_KEYS = new Set(['metric', 'direction']);
const BINDING_KEYS = new Set(['node_id', 'param', 'values']);
const OPTIMIZABLE_TYPES = new Set<OptimizableParamType>(['int', 'float', 'bool', 'select']);
const PLANNER_SEED_DESCRIPTION =
  'Planner-only seed: it deterministically selects parameter assignments and does not seed graph nodes or make graph executions reproducible.';

function plainObject(value: unknown, path: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${path} must be an object`);
  }
  return value as Record<string, unknown>;
}

function rejectUnknownKeys(
  value: Record<string, unknown>,
  allowed: ReadonlySet<string>,
  path: string,
): void {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) {
    throw new Error(`${path} contains unknown field(s): ${unknown.join(', ')}`);
  }
}

function requiredText(value: unknown, path: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${path} must be a non-empty string`);
  }
  return value.trim();
}

function optionalBoolean(value: unknown, fallback: boolean, path: string): boolean {
  if (value === undefined) return fallback;
  if (typeof value !== 'boolean') throw new Error(`${path} must be a boolean`);
  return value;
}

function boundedInteger(
  value: unknown,
  fallback: number,
  minimum: number,
  maximum: number,
  path: string,
): number {
  const candidate = value === undefined ? fallback : value;
  if (!Number.isInteger(candidate) || (candidate as number) < minimum || (candidate as number) > maximum) {
    throw new Error(`${path} must be an integer from ${minimum} to ${maximum}`);
  }
  return candidate as number;
}

function scalarKey(value: OptimizerScalar): string {
  if (typeof value === 'number') return `number:${Object.is(value, -0) ? '0' : String(value)}`;
  return `${typeof value}:${JSON.stringify(value)}`;
}

function validateDomainValue(parameter: ParamDefinition, value: unknown, path: string): OptimizerScalar {
  switch (parameter.param_type) {
    case 'int':
      if (typeof value !== 'number' || !Number.isFinite(value) || !Number.isInteger(value)) {
        throw new Error(`${path} must be a finite integer`);
      }
      break;
    case 'float':
      if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error(`${path} must be a finite number`);
      }
      break;
    case 'bool':
      if (typeof value !== 'boolean') throw new Error(`${path} must be a boolean`);
      break;
    case 'select':
      if (typeof value !== 'string') throw new Error(`${path} must be a string select option`);
      if (!Array.isArray(parameter.options) || !parameter.options.includes(value)) {
        throw new Error(`${path} must be one of: ${(parameter.options ?? []).join(', ')}`);
      }
      break;
    default:
      throw new Error(`${path} uses unsupported parameter type '${String(parameter.param_type)}'`);
  }

  if (typeof value === 'number') {
    if (typeof parameter.min_value === 'number' && value < parameter.min_value) {
      throw new Error(`${path} must be >= ${parameter.min_value}`);
    }
    if (typeof parameter.max_value === 'number' && value > parameter.max_value) {
      throw new Error(`${path} must be <= ${parameter.max_value}`);
    }
  }
  return value as OptimizerScalar;
}

function resolveNode(graph: SerializedGraph, nodeId: string, path: string): SerializedGraphNode {
  const matches = graph.nodes.filter((node) => node.id === nodeId);
  if (matches.length === 0) throw new Error(`${path} references missing node '${nodeId}'`);
  if (matches.length > 1) throw new Error(`${path} references ambiguous duplicate node id '${nodeId}'`);
  const node = matches[0];
  if (!node.type || node.type === 'note') {
    throw new Error(`${path} node '${nodeId}' has no optimizable node type`);
  }
  return node;
}

function resolveDefinition(
  definitions: NodeDefinition[],
  nodeType: string,
  path: string,
): NodeDefinition {
  const matches = definitions.filter((definition) => definition.node_name === nodeType);
  if (matches.length === 0) throw new Error(`${path} has no definition for node type '${nodeType}'`);
  if (matches.length > 1) throw new Error(`${path} found duplicate definitions for node type '${nodeType}'`);
  return matches[0];
}

function resolveBinding(
  raw: unknown,
  index: number,
  graph: SerializedGraph,
  definitions: NodeDefinition[],
): ResolvedBinding {
  const path = `optimizer.bindings[${index}]`;
  const value = plainObject(raw, path);
  rejectUnknownKeys(value, BINDING_KEYS, path);
  const nodeId = requiredText(value.node_id, `${path}.node_id`);
  const paramName = requiredText(value.param, `${path}.param`);
  const node = resolveNode(graph, nodeId, path);
  const definition = resolveDefinition(definitions, node.type!, path);
  const paramMatches = definition.params.filter((parameter) => parameter.name === paramName);
  if (paramMatches.length === 0) {
    throw new Error(`${path} references unknown parameter '${paramName}' on '${node.type}'`);
  }
  if (paramMatches.length > 1) {
    throw new Error(`${path} references ambiguous duplicate parameter '${paramName}' on '${node.type}'`);
  }
  const parameter = paramMatches[0];
  if (!OPTIMIZABLE_TYPES.has(parameter.param_type as OptimizableParamType)) {
    throw new Error(
      `${path} parameter '${nodeId}.${paramName}' has unsupported type '${String(parameter.param_type)}'; `
      + 'only int, float, bool, and select are allowed',
    );
  }
    if (isSensitiveKey(paramName)) {
    throw new Error(
      `${path} parameter '${nodeId}.${paramName}' has a credential-shaped name and cannot be optimized; `
      + 'this is refused even when the node schema declares an otherwise supported parameter type',
    );
  }
  if (!Array.isArray(value.values) || value.values.length === 0) {
    throw new Error(`${path}.values must be a non-empty explicit domain`);
  }
  if (value.values.length > MAX_OPTIMIZER_DOMAIN_VALUES) {
    throw new Error(`${path}.values supports at most ${MAX_OPTIMIZER_DOMAIN_VALUES} values`);
  }
  const domain = value.values.map((item, valueIndex) =>
    validateDomainValue(parameter, item, `${path}.values[${valueIndex}]`));
  const keys = domain.map(scalarKey);
  if (new Set(keys).size !== keys.length) {
    throw new Error(`${path}.values must contain unique scalar values`);
  }

  const params = node.data?.params;
  const hasCurrent = !!params && Object.prototype.hasOwnProperty.call(params, paramName);
  const baselineRaw = hasCurrent ? params![paramName] : parameter.default;
  const baselineValue = validateDomainValue(parameter, baselineRaw, `${path} baseline value`);

  return {
    node,
    definition,
    parameter: parameter as ResolvedBinding['parameter'],
    nodeId,
    paramName,
    baselineValue,
    domain,
  };
}

function assignmentAt(bindings: ResolvedBinding[], domainIndex: number): OptimizerScalar[] {
  const values = new Array<OptimizerScalar>(bindings.length);
  let remainder = domainIndex;
  for (let index = bindings.length - 1; index >= 0; index -= 1) {
    const domain = bindings[index].domain;
    values[index] = domain[remainder % domain.length];
    remainder = Math.floor(remainder / domain.length);
  }
  return values;
}

function baselineDomainIndex(bindings: ResolvedBinding[]): number | undefined {
  let index = 0;
  for (const binding of bindings) {
    const baselineKey = scalarKey(binding.baselineValue);
    const position = binding.domain.findIndex((value) => scalarKey(value) === baselineKey);
    if (position < 0) return undefined;
    index = index * binding.domain.length + position;
  }
  return index;
}

/** Mulberry32 with explicit uint32 arithmetic. Keep draw order stable. */
function createPlannerPrng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6D2B79F5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1) >>> 0;
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return (value ^ (value >>> 14)) >>> 0;
  };
}

/** Guaranteed-size sampling without replacement using a sparse Fisher-Yates map. */
function sampleUniqueRanks(total: number, count: number, seed: number): number[] {
  const nextUint32 = createPlannerPrng(seed);
  const swaps = new Map<number, number>();
  const selected: number[] = [];
  for (let drawIndex = 0; drawIndex < count; drawIndex += 1) {
    const remaining = total - drawIndex;
    const draw = nextUint32() % remaining;
    const chosen = swaps.get(draw) ?? draw;
    const lastPosition = remaining - 1;
    const lastValue = swaps.get(lastPosition) ?? lastPosition;
    if (draw !== lastPosition) swaps.set(draw, lastValue);
    else swaps.delete(draw);
    swaps.delete(lastPosition);
    selected.push(chosen);
  }
  return selected;
}

function operationsForAssignment(
  bindings: ResolvedBinding[],
  assignment: OptimizerScalar[],
): Extract<GraphOp, { op: 'set_params' }>[] {
  const nodeOrder: string[] = [];
  const grouped = new Map<string, Array<[string, OptimizerScalar]>>();
  bindings.forEach((binding, index) => {
    if (!grouped.has(binding.nodeId)) {
      grouped.set(binding.nodeId, []);
      nodeOrder.push(binding.nodeId);
    }
    grouped.get(binding.nodeId)!.push([binding.paramName, assignment[index]]);
  });
  return nodeOrder.map((nodeId) => ({
    op: 'set_params',
    node_id: nodeId,
    params: Object.fromEntries(grouped.get(nodeId)!),
  }));
}

function isBaselineAssignment(bindings: ResolvedBinding[], assignment: OptimizerScalar[]): boolean {
  return assignment.every((value, index) => scalarKey(value) === scalarKey(bindings[index].baselineValue));
}

function parseInput(value: unknown): {
  raw: Record<string, unknown>;
  strategy: OptimizerStrategy;
  hypothesis: string;
  objective: GraphExperimentRequest['objective'];
  repetitions: number;
  concurrency: number;
  includeBaseline: boolean;
  applyBest: boolean;
} {
  const raw = plainObject(value, 'optimizer');
  rejectUnknownKeys(raw, TOP_LEVEL_KEYS, 'optimizer');
  if (raw.version !== undefined && raw.version !== PARAMETER_OPTIMIZER_SCHEMA_VERSION) {
    throw new Error(`optimizer.version must be ${PARAMETER_OPTIMIZER_SCHEMA_VERSION}`);
  }
  if (raw.strategy !== 'grid' && raw.strategy !== 'seeded_random') {
    throw new Error('optimizer.strategy must be grid or seeded_random');
  }
  const hypothesis = requiredText(raw.hypothesis, 'optimizer.hypothesis');
  const objectiveRaw = plainObject(raw.objective, 'optimizer.objective');
  rejectUnknownKeys(objectiveRaw, OBJECTIVE_KEYS, 'optimizer.objective');
  const metric = requiredText(objectiveRaw.metric, 'optimizer.objective.metric');
  if (objectiveRaw.direction !== 'maximize' && objectiveRaw.direction !== 'minimize') {
    throw new Error('optimizer.objective.direction must be maximize or minimize');
  }
  return {
    raw,
    strategy: raw.strategy,
    hypothesis,
    objective: { metric, direction: objectiveRaw.direction },
    repetitions: boundedInteger(raw.repetitions, 1, 1, 5, 'optimizer.repetitions'),
    concurrency: boundedInteger(raw.concurrency, 1, 1, 2, 'optimizer.concurrency'),
    includeBaseline: optionalBoolean(raw.include_baseline, true, 'optimizer.include_baseline'),
    applyBest: optionalBoolean(raw.apply_best, false, 'optimizer.apply_best'),
  };
}

/**
 * Compile a strict optimizer request into the existing graph-experiment
 * contract. This function is pure: it never mutates the graph, definitions, or
 * caller input and never executes graph nodes.
 */
export function compileParameterOptimizer(
  input: unknown,
  graph: SerializedGraph,
  definitions: NodeDefinition[],
): CompiledParameterOptimizer {
  const parsed = parseInput(input);
  if (!Array.isArray(parsed.raw.bindings)
    || parsed.raw.bindings.length < 1
    || parsed.raw.bindings.length > MAX_OPTIMIZER_BINDINGS) {
    throw new Error(`optimizer.bindings must contain 1 to ${MAX_OPTIMIZER_BINDINGS} bindings`);
  }
  if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) {
    throw new Error('current graph must contain nodes and edges arrays');
  }
  if (!Array.isArray(definitions)) throw new Error('node definitions must be an array');

  const bindings = parsed.raw.bindings.map((binding, index) =>
    resolveBinding(binding, index, graph, definitions));
  const bindingKeys = bindings.map((binding) => `${binding.nodeId}\u0000${binding.paramName}`);
  if (new Set(bindingKeys).size !== bindingKeys.length) {
    throw new Error('optimizer.bindings must not repeat the same node parameter');
  }

  const totalDomainAssignments = bindings.reduce((product, binding) => product * binding.domain.length, 1);
  const baselineIndex = baselineDomainIndex(bindings);
  const candidateSlots = MAX_OPTIMIZER_VARIANTS - (parsed.includeBaseline ? 1 : 0);
  let domainIndices: number[];
  let plannerSeed: number | undefined;

  const eligibleAssignmentCount = totalDomainAssignments - (baselineIndex === undefined ? 0 : 1);

  if (parsed.strategy === 'grid') {
    if (parsed.raw.candidate_count !== undefined) {
      throw new Error('optimizer.candidate_count is only allowed for seeded_random');
    }
    if (parsed.raw.seed !== undefined) {
      throw new Error('optimizer.seed is only allowed for seeded_random');
    }
    if (eligibleAssignmentCount > candidateSlots) {
      throw new Error(
        `Grid Cartesian product has ${eligibleAssignmentCount} changed assignments but only ${candidateSlots} candidate slots are available; `
        + 'narrow the domains instead of truncating the grid',
      );
    }
    domainIndices = Array.from({ length: totalDomainAssignments }, (_, index) => index)
      .filter((index) => index !== baselineIndex);
  } else {
    const candidateCount = boundedInteger(
      parsed.raw.candidate_count,
      Number.NaN,
      1,
      candidateSlots,
      'optimizer.candidate_count',
    );
    if (!Number.isInteger(parsed.raw.seed)
      || (parsed.raw.seed as number) < 0
      || (parsed.raw.seed as number) > 0xFFFF_FFFF) {
      throw new Error('optimizer.seed is required for seeded_random and must be a uint32 integer');
    }
    plannerSeed = parsed.raw.seed as number;
    if (candidateCount > eligibleAssignmentCount) {
      throw new Error(
        `seeded_random requested ${candidateCount} unique changed assignments, but only ${eligibleAssignmentCount} are available`,
      );
    }
    const ranks = sampleUniqueRanks(eligibleAssignmentCount, candidateCount, plannerSeed);
    domainIndices = ranks.map((rank) =>
      baselineIndex !== undefined && rank >= baselineIndex ? rank + 1 : rank);
  }

  const compiledAssignments = domainIndices.map((domainIndex) => ({
    domainIndex,
    assignment: assignmentAt(bindings, domainIndex),
  })).filter(({ assignment }) => !isBaselineAssignment(bindings, assignment));
  if (compiledAssignments.length === 0) {
    throw new Error('optimizer search space contains no assignment different from the current graph baseline');
  }

  const baselineVariant = parsed.includeBaseline
    ? [{ id: 'baseline', label: 'Baseline', operations: [] as GraphOp[] }]
    : [];
  const prefix = parsed.strategy === 'grid' ? 'grid' : 'random';
  const candidateVariants = compiledAssignments.map(({ assignment }, index) => ({
    id: `optimizer-${prefix}-${String(index + 1).padStart(3, '0')}`,
    label: `${parsed.strategy === 'grid' ? 'Grid' : 'Random'} ${index + 1}: ${bindings
      .map((binding, bindingIndex) => `${binding.nodeId}.${binding.paramName}=${JSON.stringify(assignment[bindingIndex])}`)
      .join(', ')}`,
    operations: operationsForAssignment(bindings, assignment),
  }));
  const variants = [...baselineVariant, ...candidateVariants];
  if (variants.length > MAX_OPTIMIZER_VARIANTS) {
    throw new Error(`optimizer compiled ${variants.length} variants; maximum is ${MAX_OPTIMIZER_VARIANTS}`);
  }
  const totalExecutionCount = variants.length * parsed.repetitions;
  if (totalExecutionCount > MAX_OPTIMIZER_RUNS) {
    throw new Error(
      `optimizer compiled ${variants.length} variants x ${parsed.repetitions} repetitions = ${totalExecutionCount} executions; `
      + `maximum is ${MAX_OPTIMIZER_RUNS}`,
    );
  }

  const assignments: CompiledOptimizerAssignment[] = compiledAssignments.map(
    ({ domainIndex, assignment }, index) => ({
      variantId: candidateVariants[index].id,
      domainIndex,
      values: bindings.map((binding, bindingIndex) => ({
        nodeId: binding.nodeId,
        param: binding.paramName,
        value: assignment[bindingIndex],
      })),
    }),
  );

  const metadata: ParameterOptimizerMetadata = {
    schemaVersion: PARAMETER_OPTIMIZER_SCHEMA_VERSION,
    strategy: parsed.strategy,
    prngVersion: parsed.strategy === 'seeded_random' ? PARAMETER_OPTIMIZER_PRNG_VERSION : undefined,
    plannerSeed,
    seedDescription: PLANNER_SEED_DESCRIPTION,
    includesBaseline: parsed.includeBaseline,
    totalDomainAssignments,
    baselineAssignmentExcluded: baselineIndex !== undefined,
    generatedCandidateCount: candidateVariants.length,
    totalVariantCount: variants.length,
    totalExecutionCount,
    bindings: bindings.map((binding) => ({
      nodeId: binding.nodeId,
      nodeType: binding.node.type!,
      param: binding.paramName,
      paramType: binding.parameter.param_type,
      baselineValue: binding.baselineValue,
      domain: [...binding.domain],
    })),
    assignments,
  };
  const request: GraphExperimentRequest = {
    hypothesis: parsed.hypothesis,
    objective: parsed.objective,
    variants,
    repetitions: parsed.repetitions,
    concurrency: parsed.concurrency,
    apply_best: parsed.applyBest,
    search: metadata,
  };

  return {
    request,
    metadata,
  };
}
