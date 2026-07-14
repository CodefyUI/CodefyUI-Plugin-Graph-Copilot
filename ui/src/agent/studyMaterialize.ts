import type {
  PortableGraphOpV1,
  PortableGraphV1,
  PortableJsonValue,
  StudyBundleV1,
} from './studyBundle';

/**
 * Secret values supplied by the user for one in-memory replay/materialization.
 * The bindings object itself is not retained on the result, but every resolved
 * value is embedded in the returned graph. A result whose `sensitive` flag is
 * true (and any JSON encoded from its graph) must therefore be handled as
 * credential-bearing data.
 */
export type CandidateSecretBindings = Readonly<Record<string, string>>;

export interface MaterializedCandidateNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export interface MaterializedCandidateEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
  type?: 'data' | 'trigger';
}

/** A graph-shaped payload accepted by CodefyUI graph import/save paths. */
export interface MaterializedCandidateGraph {
  name: string;
  description: string;
  nodes: MaterializedCandidateNode[];
  edges: MaterializedCandidateEdge[];
  presets: unknown[];
  segmentGroups: unknown;
}

export type CandidateMaterializationStatus = 'ready' | 'blocked' | 'error';

/**
 * Portable study v1 records GraphOps, not the node-definition catalog used by
 * the original run. Consequently an add_node can be reconstructed only from
 * its recorded params; schema defaults that the runtime injected are unknown.
 */
export type CandidateMaterializationFidelity =
  | 'portable-operation-replay'
  | 'approximate-node-defaults';

export type CandidateMaterializationErrorCode =
  | 'VARIANT_NOT_FOUND'
  | 'INVALID_OPERATION'
  | 'UNKNOWN_NODE'
  | 'UNKNOWN_EDGE'
  | 'DUPLICATE_EDGE';

export interface CandidateMaterializationError {
  readonly code: CandidateMaterializationErrorCode;
  readonly message: string;
  readonly operationIndex?: number;
}

export interface CandidateMaterializationResult {
  /**
   * `ready` has no unresolved secrets, `blocked` is safe to preview but lacks
   * secrets, and `error` is atomic. Read `fidelity` separately: ready does not
   * imply byte-for-byte equivalence to the graph used by the original run.
   */
  readonly status: CandidateMaterializationStatus;
  readonly variantId: string;
  readonly variantLabel?: string;
  readonly graph: MaterializedCandidateGraph | null;
  readonly refs: Readonly<Record<string, string>>;
  readonly missingSecretRefs: readonly string[];
  readonly errors: readonly CandidateMaterializationError[];
  /** Whether this graph omits runtime-only information such as node defaults. */
  readonly fidelity: CandidateMaterializationFidelity;
  /** Human-readable limitations that must accompany export/replay claims. */
  readonly fidelityWarnings: readonly string[];
  /** True when supplied secret bindings were resolved into the returned graph. */
  readonly sensitive: boolean;
}

interface SecretResolutionState {
  readonly bindings: CandidateSecretBindings;
  readonly missing: Set<string>;
  readonly resolved: Set<string>;
}

interface MutableGraph {
  name: string;
  description: string;
  nodes: MaterializedCandidateNode[];
  edges: MaterializedCandidateEdge[];
  presets: unknown[];
  segmentGroups: unknown;
}

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function hasOwn(value: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(value, key);
}

function isSecretRef(value: unknown): value is { $gcpSecretRef: string } {
  return isRecord(value) && typeof value.$gcpSecretRef === 'string';
}

function materializeValue(value: PortableJsonValue | unknown, state: SecretResolutionState): unknown {
  if (isSecretRef(value)) {
    const id = value.$gcpSecretRef;
    if (hasOwn(state.bindings, id) && typeof state.bindings[id] === 'string') {
      state.resolved.add(id);
      return state.bindings[id];
    }
    state.missing.add(id);
    // Secret parameters are strings in CodefyUI. An empty string is the only
    // useful fail-closed preview value and never exposes the reference id.
    return '';
  }
  if (Array.isArray(value)) {
    return value.map((item) => materializeValue(item, state));
  }
  if (isRecord(value)) {
    const cloned: UnknownRecord = Object.create(null) as UnknownRecord;
    for (const [key, item] of Object.entries(value)) {
      cloned[key] = materializeValue(item, state);
    }
    return cloned;
  }
  return value;
}

function materializeRecord(value: UnknownRecord, state: SecretResolutionState): UnknownRecord {
  return materializeValue(value, state) as UnknownRecord;
}

function cloneBaseline(
  baseline: PortableGraphV1,
  state: SecretResolutionState,
): MutableGraph {
  return {
    name: baseline.name ?? '',
    description: baseline.description ?? '',
    nodes: baseline.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: { x: node.position.x, y: node.position.y },
      data: materializeRecord(node.data as UnknownRecord, state),
    })),
    edges: baseline.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
      ...(edge.type === undefined ? {} : { type: edge.type }),
    })),
    presets: baseline.presets === undefined
      ? []
      : materializeValue(baseline.presets, state) as unknown[],
    segmentGroups: baseline.segmentGroups === undefined
      ? []
      : materializeValue(baseline.segmentGroups, state),
  };
}

function graphHasNode(graph: MutableGraph, id: string): boolean {
  return graph.nodes.some((node) => node.id === id);
}

function resolveNodeId(graph: MutableGraph, refs: Readonly<Record<string, string>>, idOrRef: string): string | null {
  const viaRef = refs[idOrRef];
  if (viaRef !== undefined && graphHasNode(graph, viaRef)) return viaRef;
  return graphHasNode(graph, idOrRef) ? idOrRef : null;
}

function encodedVariantId(variantId: string): string {
  // encodeURIComponent is one-to-one for strings (including a literal '%'),
  // unlike slugification, so two distinct variant ids cannot share a stem.
  return encodeURIComponent(variantId);
}

function allocateId(base: string, reservedIds: Set<string>): string {
  let candidate = base;
  let suffix = 1;
  while (reservedIds.has(candidate)) {
    candidate = `${base}~${suffix}`;
    suffix += 1;
  }
  reservedIds.add(candidate);
  return candidate;
}

function deterministicId(
  variantId: string,
  kind: 'node' | 'edge',
  operationIndex: number,
  reservedIds: Set<string>,
): string {
  return allocateId(
    `graph-copilot:${encodedVariantId(variantId)}:${kind}:${operationIndex}`,
    reservedIds,
  );
}

function invalidOperation(operationIndex: number, message: string): CandidateMaterializationError {
  return { code: 'INVALID_OPERATION', operationIndex, message };
}

function requireString(
  record: UnknownRecord,
  key: string,
  operationIndex: number,
): string | CandidateMaterializationError {
  const value = record[key];
  return typeof value === 'string'
    ? value
    : invalidOperation(operationIndex, `${key} must be a string`);
}

function isError(value: string | CandidateMaterializationError): value is CandidateMaterializationError {
  return typeof value !== 'string';
}

function applyOperation(
  graph: MutableGraph,
  operation: PortableGraphOpV1 | unknown,
  operationIndex: number,
  variantId: string,
  refs: Record<string, string>,
  reservedIds: Set<string>,
  secrets: SecretResolutionState,
): CandidateMaterializationError | null {
  if (!isRecord(operation) || typeof operation.op !== 'string') {
    return invalidOperation(operationIndex, 'operation must be an object with an op string');
  }

  switch (operation.op) {
    case 'add_node': {
      const nodeType = requireString(operation, 'node_type', operationIndex);
      if (isError(nodeType)) return nodeType;
      if (operation.ref !== undefined && typeof operation.ref !== 'string') {
        return invalidOperation(operationIndex, 'ref must be a string when provided');
      }
      if (operation.params !== undefined && !isRecord(operation.params)) {
        return invalidOperation(operationIndex, 'params must be an object when provided');
      }
      if (operation.position !== undefined) {
        if (
          !isRecord(operation.position)
          || typeof operation.position.x !== 'number'
          || !Number.isFinite(operation.position.x)
          || typeof operation.position.y !== 'number'
          || !Number.isFinite(operation.position.y)
        ) {
          return invalidOperation(operationIndex, 'position must contain finite x and y numbers');
        }
      }

      const id = deterministicId(variantId, 'node', operationIndex, reservedIds);
      // Match applyOperationsToClone: placement is based on the graph's
      // current node count, including removals/clears and earlier additions.
      const currentNodeCount = graph.nodes.length;
      const fallbackPosition = {
        x: 160 + (currentNodeCount % 4) * 240,
        y: 120 + Math.floor(currentNodeCount / 4) * 160,
      };
      const position = operation.position as { x: number; y: number } | undefined;
      graph.nodes.push({
        id,
        type: nodeType,
        position: position === undefined
          ? fallbackPosition
          : { x: position.x, y: position.y },
        data: {
          params: operation.params === undefined
            ? {}
            : materializeRecord(operation.params, secrets),
        },
      });
      if (typeof operation.ref === 'string') refs[operation.ref] = id;
      return null;
    }

    case 'connect': {
      const sourceRef = requireString(operation, 'source', operationIndex);
      const targetRef = requireString(operation, 'target', operationIndex);
      const sourceHandle = requireString(operation, 'source_handle', operationIndex);
      const targetHandle = requireString(operation, 'target_handle', operationIndex);
      if (isError(sourceRef)) return sourceRef;
      if (isError(targetRef)) return targetRef;
      if (isError(sourceHandle)) return sourceHandle;
      if (isError(targetHandle)) return targetHandle;
      const source = resolveNodeId(graph, refs, sourceRef);
      const target = resolveNodeId(graph, refs, targetRef);
      if (source === null) {
        return {
          code: 'UNKNOWN_NODE',
          operationIndex,
          message: `connect: unknown source node '${sourceRef}'`,
        };
      }
      if (target === null) {
        return {
          code: 'UNKNOWN_NODE',
          operationIndex,
          message: `connect: unknown target node '${targetRef}'`,
        };
      }
      const isTrigger = sourceHandle === 'trigger';
      const normalizedTargetHandle = isTrigger ? '__trigger' : targetHandle;
      if (graph.edges.some((edge) => (
        edge.source === source
        && edge.target === target
        && edge.sourceHandle === sourceHandle
        && edge.targetHandle === normalizedTargetHandle
      ))) {
        return {
          code: 'DUPLICATE_EDGE',
          operationIndex,
          message: 'connect: edge already exists',
        };
      }
      graph.edges.push({
        id: deterministicId(variantId, 'edge', operationIndex, reservedIds),
        source,
        target,
        sourceHandle,
        targetHandle: normalizedTargetHandle,
        type: isTrigger ? 'trigger' : 'data',
      });
      return null;
    }

    case 'set_params': {
      const nodeRef = requireString(operation, 'node_id', operationIndex);
      if (isError(nodeRef)) return nodeRef;
      if (!isRecord(operation.params)) {
        return invalidOperation(operationIndex, 'params must be an object');
      }
      const id = resolveNodeId(graph, refs, nodeRef);
      if (id === null) {
        return {
          code: 'UNKNOWN_NODE',
          operationIndex,
          message: `set_params: unknown node '${nodeRef}'`,
        };
      }
      const node = graph.nodes.find((candidate) => candidate.id === id)!;
      const existingParams = isRecord(node.data.params) ? node.data.params : {};
      node.data = {
        ...node.data,
        params: {
          ...existingParams,
          ...materializeRecord(operation.params, secrets),
        },
      };
      return null;
    }

    case 'remove_node': {
      const nodeRef = requireString(operation, 'node_id', operationIndex);
      if (isError(nodeRef)) return nodeRef;
      const id = resolveNodeId(graph, refs, nodeRef);
      if (id === null) {
        return {
          code: 'UNKNOWN_NODE',
          operationIndex,
          message: `remove_node: unknown node '${nodeRef}'`,
        };
      }
      graph.nodes = graph.nodes.filter((node) => node.id !== id);
      graph.edges = graph.edges.filter((edge) => edge.source !== id && edge.target !== id);
      return null;
    }

    case 'remove_edge': {
      const sourceRef = requireString(operation, 'source', operationIndex);
      const targetRef = requireString(operation, 'target', operationIndex);
      if (isError(sourceRef)) return sourceRef;
      if (isError(targetRef)) return targetRef;
      if (operation.source_handle !== undefined && typeof operation.source_handle !== 'string') {
        return invalidOperation(operationIndex, 'source_handle must be a string when provided');
      }
      if (operation.target_handle !== undefined && typeof operation.target_handle !== 'string') {
        return invalidOperation(operationIndex, 'target_handle must be a string when provided');
      }
      const source = resolveNodeId(graph, refs, sourceRef);
      const target = resolveNodeId(graph, refs, targetRef);
      if (source === null || target === null) {
        return {
          code: 'UNKNOWN_NODE',
          operationIndex,
          message: 'remove_edge: unknown source or target node',
        };
      }
      const matchingIds = new Set(graph.edges.filter((edge) => (
        edge.source === source
        && edge.target === target
        && (operation.source_handle === undefined || edge.sourceHandle === operation.source_handle)
        && (operation.target_handle === undefined || edge.targetHandle === operation.target_handle)
      )).map((edge) => edge.id));
      if (matchingIds.size === 0) {
        return {
          code: 'UNKNOWN_EDGE',
          operationIndex,
          message: 'remove_edge: no matching edge',
        };
      }
      graph.edges = graph.edges.filter((edge) => !matchingIds.has(edge.id));
      return null;
    }

    case 'clear_graph':
      graph.nodes = [];
      graph.edges = [];
      for (const ref of Object.keys(refs)) delete refs[ref];
      return null;

    case 'auto_layout':
      graph.nodes.forEach((node, index) => {
        node.position = {
          x: 120 + (index % 4) * 260,
          y: 100 + Math.floor(index / 4) * 180,
        };
      });
      return null;

    default:
      return invalidOperation(operationIndex, `unknown operation '${operation.op}'`);
  }
}

function errorResult(
  variantId: string,
  error: CandidateMaterializationError,
  variantLabel?: string,
): CandidateMaterializationResult {
  return {
    status: 'error',
    variantId,
    variantLabel,
    graph: null,
    refs: {},
    missingSecretRefs: [],
    errors: [error],
    fidelity: 'portable-operation-replay',
    fidelityWarnings: [],
    sensitive: false,
  };
}

/**
 * Materialize one portable candidate without invoking CodefyUI, storage,
 * network, or browser APIs. The caller is responsible for passing a previously
 * verified StudyBundleV1 and for presenting the returned fidelity warnings.
 */
export function materializeStudyCandidate(
  bundle: StudyBundleV1,
  variantId: string,
  secretBindings: CandidateSecretBindings = {},
): CandidateMaterializationResult {
  const variant = bundle.payload.spec.variants.find((candidate) => candidate.id === variantId);
  if (variant === undefined) {
    return errorResult(variantId, {
      code: 'VARIANT_NOT_FOUND',
      message: `Unknown study variant '${variantId}'`,
    });
  }

  const secrets: SecretResolutionState = {
    bindings: secretBindings,
    missing: new Set<string>(),
    resolved: new Set<string>(),
  };
  const graph = cloneBaseline(bundle.payload.spec.baseline, secrets);
  const refs: Record<string, string> = {};
  // Reserve both namespaces. React Flow normally separates node/edge ids, but
  // a single namespace also makes exported graphs robust to stricter loaders.
  const reservedIds = new Set<string>([
    ...graph.nodes.map((node) => node.id),
    ...graph.edges.map((edge) => edge.id),
  ]);

  for (let index = 0; index < variant.operations.length; index += 1) {
    const error = applyOperation(
      graph,
      variant.operations[index],
      index,
      variant.id,
      refs,
      reservedIds,
      secrets,
    );
    if (error !== null) return errorResult(variantId, error, variant.label);
  }

  const missingSecretRefs = [...secrets.missing].sort();
  const hasAddedNodes = variant.operations.some((operation) => operation.op === 'add_node');
  const fidelityWarnings = hasAddedNodes
    ? [
        'Portable study v1 does not include node-definition defaults. Added nodes contain only parameters recorded in the operation, so defaults used by the original runtime may be missing.',
        'Generated node and edge ids are deterministic portable ids and may differ from ids used by the original experiment execution.',
      ]
    : [];
  return {
    status: missingSecretRefs.length === 0 ? 'ready' : 'blocked',
    variantId,
    variantLabel: variant.label,
    graph,
    refs: { ...refs },
    missingSecretRefs,
    errors: [],
    fidelity: hasAddedNodes ? 'approximate-node-defaults' : 'portable-operation-replay',
    fidelityWarnings,
    sensitive: secrets.resolved.size > 0,
  };
}

function containsSecretRef(value: unknown): boolean {
  if (isSecretRef(value)) return true;
  if (Array.isArray(value)) return value.some(containsSecretRef);
  return isRecord(value) && Object.values(value).some(containsSecretRef);
}

/**
 * Encode only the host graph payload. Study provenance, run data, integrity,
 * redaction reports, and SecretRef objects can never enter this JSON. Resolved
 * secret bindings are ordinary strings in the graph and ARE retained here;
 * callers must treat output from a `sensitive` materialization as sensitive.
 */
export function encodeCandidateGraphJson(graph: MaterializedCandidateGraph): string {
  const hostGraph: MaterializedCandidateGraph = {
    name: graph.name,
    description: graph.description,
    nodes: graph.nodes,
    edges: graph.edges,
    presets: graph.presets,
    segmentGroups: graph.segmentGroups,
  };
  if (containsSecretRef(hostGraph)) {
    throw new Error('Candidate graph still contains an unresolved SecretRef');
  }
  return JSON.stringify(hostGraph, null, 2);
}
