import type {
  GraphOp,
  NodeDefinition,
  SerializedGraph,
  SerializedGraphNode,
} from '../types/codefyui';
import type {
  ExperimentRunRecord,
  ExperimentSession,
  ExperimentVariantResult,
  GraphExperimentRequest,
} from './experiments';
import {
  createStudyBundle,
  type PortableGraphOpV1,
  type PortableGraphV1,
  type PortableJsonValue,
  type ProvenanceFactV1,
  type SecretRef,
  type StudyBundleV1,
  type StudyRedactionReportV1,
  type StudyRunRecordV1,
  type StudySecretRequirementV1,
  type StudyTextRedactionV1,
  type StudyVariantSpecV1,
} from './studyBundle';

const DEFAULT_PLUGIN_ID = 'graph-copilot';
const DEFAULT_TEXT_REPLACEMENT = '[REDACTED]';
const EXACT_ECHO_REASON =
  'Exact echoes of values removed by capture redaction were removed from text. Arbitrary unrelated secrets in ordinary strings cannot be detected.';
const NON_SPEC_CREDENTIAL_REASON =
  'A credential-shaped field outside the replayable graph spec was removed.';

type UnknownRecord = Record<string, unknown>;

export interface CreatePortableStudyCaptureInput {
  readonly session: ExperimentSession;
  /** The original, runtime-only request is required because persisted sessions
   * intentionally omit raw GraphOps. */
  readonly request: GraphExperimentRequest;
  /** Immutable snapshot captured before any candidate was prepared. */
  readonly baseline: SerializedGraph;
  readonly definitions: readonly NodeDefinition[];
  readonly pluginVersion: string;
  readonly codefyuiApiVersion: number;
  readonly completedAt: string;
  readonly pluginId?: string;
  /** Only facts actually supplied by the caller are copied. No release,
   * hardware, seed, or environment values are guessed. */
  readonly provenanceFacts?: readonly ProvenanceFactV1[];
}

export class StudyCaptureError extends Error {
  readonly path: string;

  constructor(path: string, message: string) {
    super(`${path}: ${message}`);
    this.name = 'StudyCaptureError';
    this.path = path;
  }
}

function fail(path: string, message: string): never {
  throw new StudyCaptureError(path, message);
}

function isRecord(value: unknown): value is UnknownRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function record(value: unknown, path: string): UnknownRecord {
  if (!isRecord(value)) fail(path, 'expected a plain object');
  return value;
}

function requiredString(value: unknown, path: string, allowEmpty = false): string {
  if (typeof value !== 'string' || (!allowEmpty && value.length === 0)) {
    fail(path, allowEmpty ? 'expected a string' : 'expected a non-empty string');
  }
  return value;
}

function finiteNumber(value: unknown, path: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    fail(path, 'expected a finite number');
  }
  return value;
}

function escapePointer(value: string): string {
  return value.replace(/~/g, '~0').replace(/\//g, '~1');
}

function normalizedKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

function isSensitiveKey(key: string): boolean {
  const normalized = normalizedKey(key);
  return [
    'secret',
    'secrets',
    'token',
    'password',
    'credential',
    'credentials',
    'authorization',
    'api_key',
    'private_key',
    'access_key',
    'client_secret',
    'access_token',
    'refresh_token',
    'auth_token',
    'bearer_token',
  ].some((candidate) => normalized === candidate || normalized.endsWith(`_${candidate}`));
}

function collectStringLeaves(
  value: unknown,
  output: Set<string>,
  stack = new WeakSet<object>(),
): void {
  if (typeof value === 'string') {
    if (value.length > 0) output.add(value);
    return;
  }
  if (Array.isArray(value)) {
    if (stack.has(value)) return;
    stack.add(value);
    value.forEach((item) => collectStringLeaves(item, output, stack));
    stack.delete(value);
    return;
  }
  if (isRecord(value)) {
    if (stack.has(value)) return;
    stack.add(value);
    Object.values(value).forEach((item) => collectStringLeaves(item, output, stack));
    stack.delete(value);
  }
}

function collectSensitiveFieldValues(
  value: unknown,
  output: Set<string>,
  stack = new WeakSet<object>(),
): void {
  if (Array.isArray(value)) {
    if (stack.has(value)) return;
    stack.add(value);
    value.forEach((item) => collectSensitiveFieldValues(item, output, stack));
    stack.delete(value);
    return;
  }
  if (!isRecord(value)) return;
  if (stack.has(value)) return;
  stack.add(value);
  for (const [key, item] of Object.entries(value)) {
    if (isSensitiveKey(key)) collectStringLeaves(item, output);
    else collectSensitiveFieldValues(item, output, stack);
  }
  stack.delete(value);
}

function definitionIndex(definitions: readonly NodeDefinition[]): Map<string, NodeDefinition> {
  const output = new Map<string, NodeDefinition>();
  definitions.forEach((definition, index) => {
    const name = requiredString(definition?.node_name, `definitions[${index}].node_name`);
    if (output.has(name)) fail(`definitions[${index}].node_name`, `duplicate node definition '${name}'`);
    const parameterNames = new Set<string>();
    if (!Array.isArray(definition.params)) fail(`definitions[${index}].params`, 'expected an array');
    definition.params.forEach((parameter, parameterIndex) => {
      const parameterName = requiredString(
        parameter?.name,
        `definitions[${index}].params[${parameterIndex}].name`,
      );
      if (parameterNames.has(parameterName)) {
        fail(
          `definitions[${index}].params[${parameterIndex}].name`,
          `duplicate parameter definition '${parameterName}'`,
        );
      }
      parameterNames.add(parameterName);
    });
    output.set(name, definition);
  });
  return output;
}

function baselineTypes(nodes: readonly SerializedGraphNode[]): Map<string, string> {
  const output = new Map<string, string>();
  nodes.forEach((node) => {
    if (typeof node?.id === 'string' && typeof node.type === 'string') output.set(node.id, node.type);
  });
  return output;
}

function updateTypeContext(
  operation: UnknownRecord,
  liveTypes: Map<string, string>,
  refTypes: Map<string, string>,
): string | undefined {
  if (operation.op === 'add_node') {
    const nodeType = typeof operation.node_type === 'string' ? operation.node_type : undefined;
    if (nodeType && typeof operation.ref === 'string') refTypes.set(operation.ref, nodeType);
    return nodeType;
  }
  if (operation.op === 'set_params') {
    const nodeId = typeof operation.node_id === 'string' ? operation.node_id : undefined;
    return nodeId ? (refTypes.get(nodeId) ?? liveTypes.get(nodeId)) : undefined;
  }
  if (operation.op === 'remove_node' && typeof operation.node_id === 'string') {
    refTypes.delete(operation.node_id);
    liveTypes.delete(operation.node_id);
  } else if (operation.op === 'clear_graph') {
    liveTypes.clear();
    refTypes.clear();
  }
  return undefined;
}

function collectRedactedParamValues(
  params: unknown,
  nodeType: string | undefined,
  definitions: Map<string, NodeDefinition>,
  output: Set<string>,
): void {
  collectSensitiveFieldValues(params, output);
  if (!isRecord(params)) return;
  const definition = nodeType ? definitions.get(nodeType) : undefined;
  const knownParameters = parameterMap(definition);
  for (const [name, value] of Object.entries(params)) {
    const parameter = knownParameters?.get(name);
    if (!definition || !parameter || parameter.param_type === 'secret' || isSensitiveKey(name)) {
      collectStringLeaves(value, output);
    }
  }
}

function collectAllCaptureRedactedValues(
  input: CreatePortableStudyCaptureInput,
  definitions: Map<string, NodeDefinition>,
): Set<string> {
  const output = new Set<string>();
  const { baseline, request } = input;

  for (const definition of definitions.values()) {
    for (const parameter of definition.params) {
      collectSensitiveFieldValues(parameter.default, output);
      if (parameter.param_type === 'secret' || isSensitiveKey(parameter.name)) {
        collectStringLeaves(parameter.default, output);
      }
    }
  }

  // Credential-shaped keys are replaced recursively in graphs, operations,
  // optimizer provenance, and caller-supplied provenance facts.
  collectSensitiveFieldValues(baseline, output);
  collectSensitiveFieldValues(request, output);
  collectSensitiveFieldValues(input.provenanceFacts, output);

  for (const node of Array.isArray(baseline.nodes) ? baseline.nodes : []) {
    collectRedactedParamValues(node.data?.params, node.type, definitions, output);
  }
  // Preset schemas are not available to plugins, so capture replaces every
  // preset wholesale and must also scrub exact echoes of every string within.
  if (Array.isArray(baseline.presets)) {
    baseline.presets.forEach((preset) => collectStringLeaves(preset, output));
  }

  const initialTypes = baselineTypes(Array.isArray(baseline.nodes) ? baseline.nodes : []);
  for (const variant of Array.isArray(request.variants) ? request.variants : []) {
    const liveTypes = new Map(initialTypes);
    const refTypes = new Map<string, string>();
    for (const rawOperation of Array.isArray(variant?.operations) ? variant.operations : []) {
      if (!isRecord(rawOperation)) continue;
      const nodeType = updateTypeContext(rawOperation, liveTypes, refTypes);
      if (rawOperation.op === 'add_node' || rawOperation.op === 'set_params') {
        collectRedactedParamValues(rawOperation.params, nodeType, definitions, output);
      }
    }
  }
  return output;
}

function chooseReplacement(secrets: ReadonlySet<string>): string {
  const candidates = [DEFAULT_TEXT_REPLACEMENT, '<removed>', '***', '\uFFFD'];
  const usable = candidates.find((candidate) => (
    [...secrets].every((secret) => !candidate.includes(secret))
  ));
  if (usable) return usable;
  for (let codePoint = 0xe000; codePoint <= 0xf8ff; codePoint += 1) {
    const candidate = String.fromCodePoint(codePoint);
    if ([...secrets].every((secret) => !candidate.includes(secret))) return candidate;
  }
  return '';
}

class TextRedactions {
  private readonly byReason = new Map<string, Set<string>>();

  record(path: string, reason: string): void {
    const locations = this.byReason.get(reason) ?? new Set<string>();
    locations.add(path);
    this.byReason.set(reason, locations);
  }

  report(): StudyTextRedactionV1[] {
    return [...this.byReason.entries()].map(([reason, locations]) => ({
      locations: [...locations].sort(),
      reason,
    }));
  }
}

class KnownSecretScrubber {
  private readonly ordered: readonly string[];
  readonly replacement: string;

  constructor(
    secrets: ReadonlySet<string>,
    private readonly redactions: TextRedactions,
  ) {
    this.ordered = [...secrets].sort((left, right) => right.length - left.length);
    this.replacement = chooseReplacement(secrets);
  }

  text(value: string, path: string): string {
    let output = value;
    for (const secret of this.ordered) output = output.split(secret).join(this.replacement);
    if (output !== value) this.redactions.record(path, EXACT_ECHO_REASON);
    return output;
  }

  semantic(value: string, path: string): string {
    if (this.ordered.some((secret) => value.includes(secret))) {
      fail(path, 'a redacted value appears in a semantic identity and cannot be safely rewritten');
    }
    return value;
  }
}

interface RequirementDraft {
  readonly requirement: Omit<StudySecretRequirementV1, 'locations'>;
  readonly locations: Set<string>;
}

function slug(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 180) || 'secret';
}

function valueSignature(value: unknown): string | undefined {
  if (value === null) return 'null';
  if (typeof value === 'string') return `string:${value}`;
  if (typeof value === 'number' && Number.isFinite(value)) return `number:${String(value)}`;
  if (typeof value === 'boolean') return `boolean:${String(value)}`;
  return undefined;
}

class SecretRegistry {
  private readonly identities = new Map<string, Array<{ signature?: string; id: string }>>();
  private readonly requirements = new Map<string, RequirementDraft>();
  private readonly usedIds = new Set<string>();

  ref(input: {
    readonly identity: string;
    readonly suggestedId: string;
    readonly rawValue: unknown;
    readonly location: string;
    readonly reason: string;
    readonly nodeType?: string;
    readonly parameter?: string;
  }): SecretRef {
    const signature = valueSignature(input.rawValue);
    const previous = this.identities.get(input.identity) ?? [];
    let match = signature === undefined
      ? undefined
      : previous.find((candidate) => candidate.signature === signature);
    if (!match) {
      const base = slug(input.suggestedId);
      let id = base;
      let suffix = 2;
      while (this.usedIds.has(id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }
      this.usedIds.add(id);
      match = { signature, id };
      previous.push(match);
      this.identities.set(input.identity, previous);
      this.requirements.set(id, {
        requirement: {
          id,
          reason: input.reason,
          requiredAtReplay: true,
          ...(input.nodeType === undefined ? {} : { nodeType: input.nodeType }),
          ...(input.parameter === undefined ? {} : { parameter: input.parameter }),
        },
        locations: new Set<string>(),
      });
    }
    this.requirements.get(match.id)!.locations.add(input.location);
    return { $gcpSecretRef: match.id };
  }

  report(): StudySecretRequirementV1[] {
    return [...this.requirements.values()].map(({ requirement, locations }) => ({
      ...requirement,
      locations: [...locations].sort(),
    }));
  }
}

interface NormalizeContext {
  readonly secrets: SecretRegistry;
  readonly scrubber: KnownSecretScrubber;
  readonly stack: WeakSet<object>;
}

function normalizePortableValue(
  value: unknown,
  path: string,
  context: NormalizeContext,
): PortableJsonValue {
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number') return finiteNumber(value, path);
  if (typeof value === 'string') return context.scrubber.text(value, path);
  if (Array.isArray(value)) {
    if (context.stack.has(value)) fail(path, 'cyclic values are not portable');
    context.stack.add(value);
    try {
      const output: PortableJsonValue[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) fail(`${path}/${index}`, 'sparse arrays are not portable');
        output.push(normalizePortableValue(value[index], `${path}/${index}`, context));
      }
      return output;
    } finally {
      context.stack.delete(value);
    }
  }
  const source = record(value, path);
  if (context.stack.has(source)) fail(path, 'cyclic values are not portable');
  context.stack.add(source);
  try {
    if (Object.prototype.hasOwnProperty.call(source, '$gcpSecretRef')) {
      fail(path, "raw host data may not contain the reserved '$gcpSecretRef' key");
    }
    const output = Object.create(null) as Record<string, PortableJsonValue>;
    for (const [key, item] of Object.entries(source)) {
      const itemPath = `${path}/${escapePointer(key)}`;
      output[key] = isSensitiveKey(key)
        ? context.secrets.ref({
          identity: `credential:${path}:${key}`,
          suggestedId: `${key}-${path}`,
          rawValue: item,
          location: itemPath,
          reason: `Credential-shaped key '${key}' was redacted recursively.`,
          parameter: key,
        })
        : normalizePortableValue(item, itemPath, context);
    }
    return output;
  } finally {
    context.stack.delete(source);
  }
}

function normalizeNonSpecValue(
  value: unknown,
  path: string,
  scrubber: KnownSecretScrubber,
  redactions: TextRedactions,
  stack = new WeakSet<object>(),
): PortableJsonValue {
  if (value === null || typeof value === 'boolean') return value;
  if (typeof value === 'number') return finiteNumber(value, path);
  if (typeof value === 'string') return scrubber.text(value, path);
  if (Array.isArray(value)) {
    if (stack.has(value)) fail(path, 'cyclic values are not portable');
    stack.add(value);
    try {
      const output: PortableJsonValue[] = [];
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.prototype.hasOwnProperty.call(value, index)) fail(`${path}/${index}`, 'sparse arrays are not portable');
        output.push(normalizeNonSpecValue(value[index], `${path}/${index}`, scrubber, redactions, stack));
      }
      return output;
    } finally {
      stack.delete(value);
    }
  }
  const source = record(value, path);
  if (stack.has(source)) fail(path, 'cyclic values are not portable');
  stack.add(source);
  try {
    if (Object.prototype.hasOwnProperty.call(source, '$gcpSecretRef')) {
      fail(path, "provenance may not contain the reserved '$gcpSecretRef' key");
    }
    const output = Object.create(null) as Record<string, PortableJsonValue>;
    for (const [key, item] of Object.entries(source)) {
      const itemPath = `${path}/${escapePointer(key)}`;
      if (isSensitiveKey(key)) {
        output[key] = scrubber.replacement;
        redactions.record(itemPath, NON_SPEC_CREDENTIAL_REASON);
      } else {
        output[key] = normalizeNonSpecValue(item, itemPath, scrubber, redactions, stack);
      }
    }
    return output;
  } finally {
    stack.delete(source);
  }
}

function parameterMap(definition: NodeDefinition | undefined): Map<string, NodeDefinition['params'][number]> | undefined {
  return definition
    ? new Map(definition.params.map((parameter) => [parameter.name, parameter]))
    : undefined;
}

function normalizeParams(
  value: unknown,
  nodeType: string | undefined,
  entityIdentity: string,
  entityLabel: string,
  path: string,
  definitions: Map<string, NodeDefinition>,
  context: NormalizeContext,
): Record<string, PortableJsonValue> {
  const source = record(value, path);
  const definition = nodeType ? definitions.get(nodeType) : undefined;
  const knownParameters = parameterMap(definition);
  const output = Object.create(null) as Record<string, PortableJsonValue>;
  for (const [name, item] of Object.entries(source)) {
    const itemPath = `${path}/${escapePointer(name)}`;
    const parameter = knownParameters?.get(name);
    let reason: string | undefined;
    if (!definition) {
      reason = nodeType
        ? `Node type '${nodeType}' has no captured schema; parameter '${name}' was redacted fail-closed.`
        : `The node type is unresolved; parameter '${name}' was redacted fail-closed.`;
    } else if (!parameter) {
      reason = `Parameter '${name}' is absent from the captured '${nodeType}' schema and was redacted fail-closed.`;
    } else if (parameter.param_type === 'secret') {
      reason = `${nodeType}.${name} is declared as a secret parameter.`;
    } else if (isSensitiveKey(name)) {
      reason = `Credential-shaped parameter '${name}' was redacted recursively.`;
    }

    output[name] = reason
      ? context.secrets.ref({
        identity: `${entityIdentity}:param:${name}`,
        suggestedId: `${entityLabel}-${name}`,
        rawValue: item,
        location: itemPath,
        reason,
        ...(nodeType === undefined ? {} : { nodeType }),
        parameter: name,
      })
      : normalizePortableValue(item, itemPath, context);
  }
  return output;
}

function normalizeGraph(
  graph: SerializedGraph,
  definitions: Map<string, NodeDefinition>,
  context: NormalizeContext,
): PortableGraphV1 {
  if (!isRecord(graph)) fail('baseline', 'expected a plain serialized graph');
  if (!Array.isArray(graph.nodes)) fail('baseline.nodes', 'expected an array');
  if (!Array.isArray(graph.edges)) fail('baseline.edges', 'expected an array');
  const nodes = graph.nodes.map((rawNode, index) => {
    const path = `/spec/baseline/nodes/${index}`;
    const node = record(rawNode, `baseline.nodes[${index}]`);
    const id = context.scrubber.semantic(requiredString(node.id, `${path}/id`), `${path}/id`);
    const type = context.scrubber.semantic(requiredString(node.type, `${path}/type`), `${path}/type`);
    let position = { x: 0, y: 0 };
    if (node.position !== undefined) {
      const sourcePosition = record(node.position, `${path}/position`);
      position = {
        x: finiteNumber(sourcePosition.x, `${path}/position/x`),
        y: finiteNumber(sourcePosition.y, `${path}/position/y`),
      };
    }
    const rawData = node.data === undefined ? {} : record(node.data, `${path}/data`);
    const data = Object.create(null) as Record<string, PortableJsonValue>;
    for (const [key, item] of Object.entries(rawData)) {
      const itemPath = `${path}/data/${escapePointer(key)}`;
      if (key === 'params') {
        data.params = normalizeParams(
          item,
          type,
          `node:${id}`,
          id,
          itemPath,
          definitions,
          context,
        );
      } else if (isSensitiveKey(key)) {
        data[key] = context.secrets.ref({
          identity: `node:${id}:credential:${key}`,
          suggestedId: `${id}-${key}`,
          rawValue: item,
          location: itemPath,
          reason: `Credential-shaped key '${key}' was redacted recursively.`,
          nodeType: type,
          parameter: key,
        });
      } else {
        data[key] = normalizePortableValue(item, itemPath, context);
      }
    }
    return { id, type, position, data };
  });

  const edges = graph.edges.map((rawEdge, index) => {
    const path = `/spec/baseline/edges/${index}`;
    const edge = record(rawEdge, `baseline.edges[${index}]`);
    const rawType = edge.type;
    if (rawType !== undefined && rawType !== 'data' && rawType !== 'trigger') {
      fail(`${path}/type`, "expected 'data' or 'trigger'");
    }
    const type: 'data' | 'trigger' | undefined = rawType === 'data' || rawType === 'trigger'
      ? rawType
      : undefined;
    return {
      id: context.scrubber.semantic(requiredString(edge.id, `${path}/id`), `${path}/id`),
      source: context.scrubber.semantic(requiredString(edge.source, `${path}/source`), `${path}/source`),
      target: context.scrubber.semantic(requiredString(edge.target, `${path}/target`), `${path}/target`),
      sourceHandle: context.scrubber.semantic(
        requiredString(edge.sourceHandle, `${path}/sourceHandle`, true),
        `${path}/sourceHandle`,
      ),
      targetHandle: context.scrubber.semantic(
        requiredString(edge.targetHandle, `${path}/targetHandle`, true),
        `${path}/targetHandle`,
      ),
      ...(type === undefined ? {} : { type }),
    };
  });

  const output: PortableGraphV1 = {
    nodes,
    edges,
    ...(graph.presets === undefined
      ? {}
      : {
        presets: (() => {
          if (!Array.isArray(graph.presets)) fail('/spec/baseline/presets', 'expected an array');
          return graph.presets.map((preset, index) => context.secrets.ref({
            identity: `preset:${index}`,
            suggestedId: `preset-${index + 1}`,
            rawValue: preset,
            location: `/spec/baseline/presets/${index}`,
            reason: 'Preset schema is unavailable; the entire preset was redacted fail-closed.',
          }));
        })(),
      }),
    ...(graph.segmentGroups === undefined
      ? {}
      : { segmentGroups: normalizePortableValue(graph.segmentGroups, '/spec/baseline/segmentGroups', context) }),
    ...(graph.name === undefined
      ? {}
      : { name: context.scrubber.text(requiredString(graph.name, '/spec/baseline/name', true), '/spec/baseline/name') }),
    ...(graph.description === undefined
      ? {}
      : {
        description: context.scrubber.text(
          requiredString(graph.description, '/spec/baseline/description', true),
          '/spec/baseline/description',
        ),
      }),
  };
  return output;
}

function operationString(
  value: unknown,
  path: string,
  scrubber: KnownSecretScrubber,
  allowEmpty = false,
): string {
  return scrubber.semantic(requiredString(value, path, allowEmpty), path);
}

function normalizeOperations(
  operations: readonly GraphOp[],
  variantId: string,
  variantIndex: number,
  initialTypes: Map<string, string>,
  definitions: Map<string, NodeDefinition>,
  context: NormalizeContext,
): PortableGraphOpV1[] {
  if (!Array.isArray(operations)) fail(`request.variants[${variantIndex}].operations`, 'expected an array');
  const liveTypes = new Map(initialTypes);
  const refTypes = new Map<string, string>();
  return operations.map((rawOperation, operationIndex) => {
    const pointer = `/spec/variants/${variantIndex}/operations/${operationIndex}`;
    const operation = record(rawOperation, `request.variants[${variantIndex}].operations[${operationIndex}]`);
    switch (operation.op) {
      case 'add_node': {
        const nodeType = operationString(operation.node_type, `${pointer}/node_type`, context.scrubber);
        const ref = operation.ref === undefined
          ? undefined
          : operationString(operation.ref, `${pointer}/ref`, context.scrubber);
        if (ref !== undefined) refTypes.set(ref, nodeType);
        const definition = definitions.get(nodeType);
        // The runtime clone expands every node-schema default before applying
        // explicit add_node params. Persist that prepared parameter envelope so
        // a downloaded candidate matches the graph that was actually executed.
        const preparedParams = Object.create(null) as Record<string, unknown>;
        for (const parameter of definition?.params ?? []) {
          if (parameter.default !== undefined) preparedParams[parameter.name] = parameter.default;
        }
        if (operation.params !== undefined) {
          for (const [name, value] of Object.entries(record(operation.params, `${pointer}/params`))) {
            preparedParams[name] = value;
          }
        }
        const hasPreparedParams = Object.keys(preparedParams).length > 0;
        const params = !hasPreparedParams
          ? undefined
          : normalizeParams(
            preparedParams,
            nodeType,
            ref === undefined
              ? `variant:${variantId}:operation:${operationIndex}`
              : `variant:${variantId}:ref:${ref}`,
            ref ?? `${variantId}-node-${operationIndex + 1}`,
            `${pointer}/params`,
            definitions,
            context,
          );
        const position = operation.position === undefined
          ? undefined
          : (() => {
            const rawPosition = record(operation.position, `${pointer}/position`);
            return {
              x: finiteNumber(rawPosition.x, `${pointer}/position/x`),
              y: finiteNumber(rawPosition.y, `${pointer}/position/y`),
            };
          })();
        return {
          op: 'add_node',
          node_type: nodeType,
          ...(ref === undefined ? {} : { ref }),
          ...(params === undefined ? {} : { params }),
          ...(position === undefined ? {} : { position }),
        };
      }
      case 'set_params': {
        const nodeId = operationString(operation.node_id, `${pointer}/node_id`, context.scrubber);
        const nodeType = refTypes.get(nodeId) ?? liveTypes.get(nodeId);
        const entityIdentity = refTypes.has(nodeId)
          ? `variant:${variantId}:ref:${nodeId}`
          : `node:${nodeId}`;
        return {
          op: 'set_params',
          node_id: nodeId,
          params: normalizeParams(
            operation.params,
            nodeType,
            entityIdentity,
            nodeId,
            `${pointer}/params`,
            definitions,
            context,
          ),
        };
      }
      case 'connect':
        return {
          op: 'connect',
          source: operationString(operation.source, `${pointer}/source`, context.scrubber),
          source_handle: operationString(
            operation.source_handle,
            `${pointer}/source_handle`,
            context.scrubber,
            true,
          ),
          target: operationString(operation.target, `${pointer}/target`, context.scrubber),
          target_handle: operationString(
            operation.target_handle,
            `${pointer}/target_handle`,
            context.scrubber,
            true,
          ),
        };
      case 'remove_node': {
        const nodeId = operationString(operation.node_id, `${pointer}/node_id`, context.scrubber);
        refTypes.delete(nodeId);
        liveTypes.delete(nodeId);
        return { op: 'remove_node', node_id: nodeId };
      }
      case 'remove_edge':
        return {
          op: 'remove_edge',
          source: operationString(operation.source, `${pointer}/source`, context.scrubber),
          target: operationString(operation.target, `${pointer}/target`, context.scrubber),
          ...(operation.source_handle === undefined
            ? {}
            : {
              source_handle: operationString(
                operation.source_handle,
                `${pointer}/source_handle`,
                context.scrubber,
                true,
              ),
            }),
          ...(operation.target_handle === undefined
            ? {}
            : {
              target_handle: operationString(
                operation.target_handle,
                `${pointer}/target_handle`,
                context.scrubber,
                true,
              ),
            }),
        };
      case 'clear_graph':
        liveTypes.clear();
        refTypes.clear();
        return { op: 'clear_graph' };
      case 'auto_layout':
        return { op: 'auto_layout' };
      default:
        return fail(`${pointer}/op`, `unsupported graph operation '${String(operation.op)}'`);
    }
  });
}

function requestVariantId(variant: GraphExperimentRequest['variants'][number], index: number): string {
  return variant.id?.trim() || `variant-${index + 1}`;
}

function assertCaptureCorrespondence(input: CreatePortableStudyCaptureInput): void {
  if (!Array.isArray(input.request.variants)) fail('request.variants', 'expected an array');
  if (!Array.isArray(input.session.variants)) fail('session.variants', 'expected an array');
  const repetitions = input.request.repetitions ?? 1;
  if (repetitions !== input.session.repetitions) {
    fail('request.repetitions', 'does not match the completed session');
  }
  if (
    input.request.objective.metric !== input.session.objective.metric
    || input.request.objective.direction !== input.session.objective.direction
  ) {
    fail('request.objective', 'does not match the completed session');
  }
  if (input.request.hypothesis.trim() !== input.session.hypothesis) {
    fail('request.hypothesis', 'does not match the completed session');
  }
  if (input.request.variants.length !== input.session.variants.length) {
    fail('request.variants', 'does not match the completed session variant count');
  }
  input.request.variants.forEach((variant, index) => {
    const result = input.session.variants[index];
    if (requestVariantId(variant, index) !== result?.id) {
      fail(`request.variants[${index}].id`, 'does not match the completed session variant id');
    }
    if (variant.label.trim() !== result.label) {
      fail(`request.variants[${index}].label`, 'does not match the completed session variant label');
    }
  });
}

function scrubVariantResult(
  variant: ExperimentVariantResult,
  index: number,
  scrubber: KnownSecretScrubber,
): ExperimentVariantResult {
  return {
    ...variant,
    id: scrubber.semantic(variant.id, `/derived/variants/${index}/id`),
    label: scrubber.text(variant.label, `/derived/variants/${index}/label`),
    ...(variant.metricKey === undefined
      ? {}
      : { metricKey: scrubber.semantic(variant.metricKey, `/derived/variants/${index}/metricKey`) }),
    metricValues: [...variant.metricValues],
    observedMetrics: Object.fromEntries(Object.entries(variant.observedMetrics).map(([key, value]) => [
      scrubber.semantic(key, `/derived/variants/${index}/observedMetrics/${escapePointer(key)}`),
      value,
    ])),
    ...(variant.runs === undefined
      ? {}
      : {
        runs: variant.runs.map((run) => ({
          ...run,
          observedMetrics: { ...run.observedMetrics },
        })),
      }),
    ...(variant.operationSummary === undefined
      ? {}
      : {
        operationSummary: variant.operationSummary.map((summary, summaryIndex) => (
          scrubber.text(summary, `/derived/variants/${index}/operationSummary/${summaryIndex}`)
        )),
      }),
    errors: variant.errors.map((error, errorIndex) => (
      scrubber.text(error, `/derived/variants/${index}/errors/${errorIndex}`)
    )),
  };
}

function scrubSession(session: ExperimentSession, scrubber: KnownSecretScrubber): ExperimentSession {
  const variants = session.variants.map((variant, index) => scrubVariantResult(variant, index, scrubber));
  const byId = new Map(variants.map((variant) => [variant.id, variant]));
  return {
    ...session,
    id: scrubber.semantic(session.id, '/id'),
    hypothesis: scrubber.text(session.hypothesis, '/spec/hypothesis'),
    objective: {
      ...session.objective,
      metric: scrubber.semantic(session.objective.metric, '/spec/objective/metric'),
    },
    variants,
    ...(session.search === undefined ? {} : { search: session.search }),
    ...(session.winnerLabel === undefined
      ? {}
      : {
        winnerLabel: (() => {
          const scrubbed = scrubber.text(session.winnerLabel!, '/derived/winnerLabel');
          return session.winnerId && byId.has(session.winnerId)
            ? byId.get(session.winnerId)!.label
            : scrubbed;
        })(),
      }),
    ...(session.applyConflict === undefined
      ? {}
      : { applyConflict: scrubber.text(session.applyConflict, '/derived/applyConflict') }),
    insights: {
      summary: session.insights.summary.map((summary, index) => (
        scrubber.text(summary, `/derived/insights/summary/${index}`)
      )),
      warnings: session.insights.warnings.map((warning, index) => (
        scrubber.text(warning, `/derived/insights/warnings/${index}`)
      )),
      paperIdeas: session.insights.paperIdeas.map((idea, index) => ({
        title: scrubber.text(idea.title, `/derived/insights/paperIdeas/${index}/title`),
        evidence: scrubber.text(idea.evidence, `/derived/insights/paperIdeas/${index}/evidence`),
        nextStep: scrubber.text(idea.nextStep, `/derived/insights/paperIdeas/${index}/nextStep`),
      })),
    },
  };
}

function objectiveMetric(
  run: ExperimentRunRecord,
  scrubber: KnownSecretScrubber,
  path: string,
): StudyRunRecordV1['metrics'][number] | undefined {
  if (run.metricKey === undefined && run.metricValue === undefined) return undefined;
  if (
    typeof run.metricKey !== 'string'
    || run.metricKey.length === 0
    || typeof run.metricValue !== 'number'
    || !Number.isFinite(run.metricValue)
  ) {
    fail('session.variants[].runs[].metric', 'metricKey and finite metricValue must be provided together');
  }
  return {
    // Older run records retained only the canonical identity. Calling that
    // stored identity the observed key is explicit client-side evidence, not
    // a guessed node/port identity.
    observedKey: scrubber.semantic(run.metricKey, `${path}/observedKey`),
    canonicalKey: scrubber.semantic(run.metricKey, `${path}/canonicalKey`),
    value: run.metricValue,
    source: run.metricSource ?? 'client',
  };
}

function convertRuns(
  session: ExperimentSession,
  scrubber: KnownSecretScrubber,
): StudyRunRecordV1[] {
  const output: StudyRunRecordV1[] = [];
  const slots = new Set<string>();
  session.variants.forEach((variant, variantIndex) => {
    variant.runs?.forEach((run, runIndex) => {
      const slot = `${variant.id}\u0000${run.repetition}`;
      if (slots.has(slot)) {
        fail(`session.variants[${variantIndex}].runs[${runIndex}]`, 'duplicate variant/repetition run slot');
      }
      slots.add(slot);
      const metrics: StudyRunRecordV1['metrics'][number][] = [];
      const observedKeys = new Set<string>();
      const metric = objectiveMetric(run, scrubber, `/runs/${output.length}/metrics/0`);
      if (metric) {
        observedKeys.add(metric.observedKey);
        metrics.push(metric);
      }
      for (const [rawObservedKey, value] of Object.entries(run.observedMetrics)) {
        if (!Number.isFinite(value)) continue;
        const rawCanonicalKey = run.observedMetricIdentities?.[rawObservedKey]
          ?? (rawObservedKey === 'system.runtime_ms' ? 'system.runtime_ms' : undefined);
        const source = run.observedMetricSources?.[rawObservedKey]
          ?? (rawObservedKey === 'system.runtime_ms' ? 'client' : undefined);
        // Legacy summaries did not retain identity/source for non-objective
        // observations. Omitting those is more honest than inventing them.
        if (!rawCanonicalKey || !source) continue;
        const metricPath = `/runs/${output.length}/metrics/${metrics.length}`;
        const observedKey = scrubber.semantic(rawObservedKey, `${metricPath}/observedKey`);
        const canonicalKey = scrubber.semantic(rawCanonicalKey, `${metricPath}/canonicalKey`);
        if (observedKeys.has(observedKey)) continue;
        observedKeys.add(observedKey);
        metrics.push({ observedKey, canonicalKey, value, source });
      }
      const runtimeValue = Number.isFinite(run.observedMetrics['system.runtime_ms'])
        ? run.observedMetrics['system.runtime_ms']
        : run.durationMs;
      if (
        Number.isFinite(runtimeValue)
        && !observedKeys.has('system.runtime_ms')
      ) {
        metrics.push({
          observedKey: 'system.runtime_ms',
          canonicalKey: 'system.runtime_ms',
          value: runtimeValue,
          source: 'client',
        });
      }
      const errorPath = `/runs/${output.length}/error/message`;
      output.push({
        runKey: `${variant.id}:rep:${run.repetition}`,
        variantId: variant.id,
        repetition: run.repetition,
        status: run.status,
        durationMs: run.durationMs,
        metrics,
        ...(run.status === 'failed'
          ? {
            error: {
              phase: 'execute',
              code: 'EXPERIMENT_RUN_FAILED',
              message: scrubber.text(
                run.error ?? 'No error message was recorded by the experiment runtime.',
                errorPath,
              ),
            },
          }
          : {}),
      });
    });
  });
  return output;
}

function cloneProvenanceFacts(
  input: CreatePortableStudyCaptureInput,
  scrubber: KnownSecretScrubber,
  redactions: TextRedactions,
): ProvenanceFactV1[] {
  const facts = (input.provenanceFacts ?? []).map((fact, index): ProvenanceFactV1 => {
    const path = `/provenance/facts/${index}`;
    return {
      key: scrubber.text(requiredString(fact.key, `${path}/key`), `${path}/key`),
      status: fact.status,
      source: scrubber.text(requiredString(fact.source, `${path}/source`), `${path}/source`),
      ...(fact.collectedAt === undefined ? {} : { collectedAt: fact.collectedAt }),
      ...(fact.value === undefined
        ? {}
        : { value: normalizeNonSpecValue(fact.value, `${path}/value`, scrubber, redactions) }),
    };
  });
  if (input.request.search !== undefined) {
    if (facts.some((fact) => fact.key === 'optimizer.plan')) {
      fail('provenanceFacts', "'optimizer.plan' is reserved for the captured experiment request");
    }
    facts.push({
      key: 'optimizer.plan',
      status: 'observed',
      source: 'graph-experiment request',
      value: normalizeNonSpecValue(
        input.request.search,
        `/provenance/facts/${facts.length}/value`,
        scrubber,
        redactions,
      ),
    });
  }
  if (facts.some((fact) => fact.key === 'redaction.arbitrary_string_secret_detection')) {
    fail(
      'provenanceFacts',
      "'redaction.arbitrary_string_secret_detection' is reserved for the capture limitation",
    );
  }
  facts.push({
    key: 'redaction.arbitrary_string_secret_detection',
    status: 'unavailable',
    source: 'schema-guided capture cannot detect arbitrary secrets embedded in ordinary strings',
  });
  return facts;
}

/**
 * Convert runtime experiment evidence into a portable, integrity-checked
 * StudyBundleV1. This function is data-only: it never executes or applies a
 * graph, and it never mutates the captured session, request, or baseline.
 *
 * Redaction is intentionally bounded. Declared secret parameters, unknown
 * parameters/schemas, presets, and credential-shaped keys fail closed. Exact
 * echoes of every string removed by those rules are scrubbed from human-readable
 * evidence. An arbitrary secret hidden in an otherwise ordinary string cannot
 * be recognized without a schema and is recorded as an explicit unavailable
 * provenance capability.
 */
export async function createPortableStudyCapture(
  input: CreatePortableStudyCaptureInput,
): Promise<StudyBundleV1> {
  assertCaptureCorrespondence(input);
  const definitions = definitionIndex(input.definitions);
  const knownSecrets = collectAllCaptureRedactedValues(input, definitions);
  const textRedactions = new TextRedactions();
  const scrubber = new KnownSecretScrubber(knownSecrets, textRedactions);
  const secretRegistry = new SecretRegistry();
  const context: NormalizeContext = { secrets: secretRegistry, scrubber, stack: new WeakSet<object>() };
  const baseline = normalizeGraph(input.baseline, definitions, context);
  const initialTypes = baselineTypes(input.baseline.nodes);
  const sanitizedSession = scrubSession(input.session, scrubber);
  const variants: StudyVariantSpecV1[] = input.request.variants.map((variant, index) => ({
    id: sanitizedSession.variants[index].id,
    label: scrubber.text(input.session.variants[index].label, `/spec/variants/${index}/label`),
    operations: normalizeOperations(
      variant.operations,
      sanitizedSession.variants[index].id,
      index,
      initialTypes,
      definitions,
      context,
    ),
  }));
  // createStudyBundle requires spec and derived labels to match exactly.
  sanitizedSession.variants.forEach((variant, index) => {
    variant.label = variants[index].label;
  });
  if (sanitizedSession.winnerId !== undefined) {
    const winner = sanitizedSession.variants.find((variant) => variant.id === sanitizedSession.winnerId);
    if (winner) sanitizedSession.winnerLabel = winner.label;
  }
  const runs = convertRuns(input.session, scrubber);
  const provenanceFacts = cloneProvenanceFacts(input, scrubber, textRedactions);
  const redactionReport: StudyRedactionReportV1 = {
    policy: 'explicit-secret-ref-v1',
    secretRequirements: secretRegistry.report(),
    textRedactions: textRedactions.report(),
  };
  return createStudyBundle({
    session: sanitizedSession,
    completedAt: input.completedAt,
    producer: {
      pluginId: input.pluginId ?? DEFAULT_PLUGIN_ID,
      pluginVersion: input.pluginVersion,
      codefyuiApiVersion: input.codefyuiApiVersion,
    },
    provenance: { facts: provenanceFacts },
    baseline,
    variants,
    runs,
    redactionReport,
    concurrency: input.request.concurrency ?? 1,
    applyBestRequested: input.request.apply_best ?? false,
  });
}
