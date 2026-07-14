import type { WireToolCall } from '../llm/client';
import type {
  CodefyUIPluginAPI,
  NodeDefinition,
  SerializedGraph,
  SerializedGraphNode,
} from '../types/codefyui';

export const REDACTED_VALUE = '[REDACTED]';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizedKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

export function isSensitiveKey(key: string): boolean {
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
  ].some((name) => normalized === name || normalized.endsWith(`_${name}`));
}

/** Clone model-supplied JSON while redacting credential-shaped fields. */
export function redactSensitiveFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactSensitiveFields);
  if (!isRecord(value)) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [
      key,
      isSensitiveKey(key) ? REDACTED_VALUE : redactSensitiveFields(item),
    ]),
  );
}

function collectStringLeaves(value: unknown, output: Set<string>): void {
  if (typeof value === 'string') {
    if (value.length > 0) output.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => collectStringLeaves(item, output));
  } else if (isRecord(value)) {
    Object.values(value).forEach((item) => collectStringLeaves(item, output));
  }
}

function collectSensitiveFieldValues(value: unknown, output: Set<string>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectSensitiveFieldValues(item, output));
  } else if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) {
      if (isSensitiveKey(key)) collectStringLeaves(item, output);
      else collectSensitiveFieldValues(item, output);
    }
  }
}

function collectOperationSecretValues(
  value: unknown,
  definitions: Map<string, NodeDefinition>,
  liveNodeTypes: Map<string, string>,
  output: Set<string>,
): void {
  if (!Array.isArray(value)) return;
  const refTypes = new Map<string, string>();
  for (const item of value) {
    if (!isRecord(item)) continue;
    let nodeType: string | undefined;
    if (item.op === 'add_node') {
      nodeType = typeof item.node_type === 'string' ? item.node_type : undefined;
      if (typeof item.ref === 'string' && nodeType) refTypes.set(item.ref, nodeType);
    } else if (item.op === 'set_params') {
      const nodeId = typeof item.node_id === 'string' ? item.node_id : undefined;
      nodeType = nodeId ? (refTypes.get(nodeId) ?? liveNodeTypes.get(nodeId)) : undefined;
    } else {
      continue;
    }
    if (!isRecord(item.params)) continue;
    const definition = nodeType ? definitions.get(nodeType) : undefined;
    const paramsByName = definition
      ? new Map(definition.params.map((param) => [param.name, param]))
      : undefined;
    for (const [name, paramValue] of Object.entries(item.params)) {
      const param = paramsByName?.get(name);
      if (!param || param.param_type === 'secret' || isSensitiveKey(name)) {
        collectStringLeaves(paramValue, output);
      }
    }
  }
}

function collectSearchSpaceRedactedValues(
  value: unknown,
  definitions: Map<string, NodeDefinition>,
  liveNodeTypes: Map<string, string>,
  output: Set<string>,
): void {
  if (!Array.isArray(value)) return;
  for (const item of value) {
    if (!isRecord(item)) continue;
    const nodeId = typeof item.node_id === 'string' ? item.node_id : undefined;
    const paramName = typeof item.param === 'string' ? item.param : undefined;
    const nodeType = nodeId ? liveNodeTypes.get(nodeId) : undefined;
    const definition = nodeType ? definitions.get(nodeType) : undefined;
    const param = definition?.params.find((candidate) => candidate.name === paramName);
    if (!param || param.param_type === 'secret' || (paramName && isSensitiveKey(paramName))) {
      collectStringLeaves(item.values, output);
    }
  }
}

function collectDefinitionRedactedValues(
  definitions: Map<string, NodeDefinition>,
  output: Set<string>,
): void {
  for (const definition of definitions.values()) {
    for (const param of definition.params) {
      if (param.param_type === 'secret' || isSensitiveKey(param.name)) {
        collectStringLeaves(param.default, output);
        collectStringLeaves(param.options, output);
      }
    }
  }
}

function collectKnownSecretValues(
  toolCall: WireToolCall,
  definitions: Map<string, NodeDefinition>,
  liveNodeTypes: Map<string, string>,
): Set<string> {
  const output = new Set<string>();
  collectDefinitionRedactedValues(definitions, output);
  collectSensitiveFieldValues(toolCall.arguments, output);
  if (toolCall.name === 'apply_graph_operations') {
    collectOperationSecretValues(toolCall.arguments.operations, definitions, liveNodeTypes, output);
  } else if (toolCall.name === 'run_graph_experiments') {
    if (Array.isArray(toolCall.arguments.variants)) {
      for (const variant of toolCall.arguments.variants) {
        if (isRecord(variant)) {
          collectOperationSecretValues(variant.operations, definitions, liveNodeTypes, output);
        }
      }
    }
    // `search` is private optimizer provenance and is rejected on this public
    // tool. Any caller-supplied value therefore fails closed in history.
    if (toolCall.arguments.search !== undefined) {
      collectStringLeaves(toolCall.arguments.search, output);
    }
  } else if (toolCall.name === 'optimize_graph_parameters') {
    collectSearchSpaceRedactedValues(
      toolCall.arguments.bindings,
      definitions,
      liveNodeTypes,
      output,
    );
  }
  return output;
}

function collectGraphRedactedValues(
  graph: { nodes: SerializedGraphNode[]; presets?: unknown[] },
  definitions: Map<string, NodeDefinition>,
  output: Set<string>,
): void {
  collectDefinitionRedactedValues(definitions, output);
  collectSensitiveFieldValues(graph, output);
  // Preset schemas are not exposed through the plugin contract. Treat every
  // preset string as sensitive for exact-echo scrubbing, while continuing to
  // omit presets themselves from model graph snapshots.
  collectStringLeaves(graph.presets, output);
  for (const node of graph.nodes) {
    const params = node.data?.params;
    if (!isRecord(params)) continue;
    const definition = typeof node.type === 'string' ? definitions.get(node.type) : undefined;
    const byName = definition
      ? new Map(definition.params.map((param) => [param.name, param]))
      : undefined;
    for (const [name, value] of Object.entries(params)) {
      const param = byName?.get(name);
      if (!param || param.param_type === 'secret' || isSensitiveKey(name)) {
        collectStringLeaves(value, output);
      }
    }
  }
}

function scrubKnownSecretStrings(value: unknown, secrets: Set<string>): unknown {
  if (typeof value === 'string') {
    let scrubbed = value;
    // Longest first prevents a short token from hiding part of a longer one.
    for (const secret of [...secrets].sort((left, right) => right.length - left.length)) {
      scrubbed = scrubbed.split(secret).join(REDACTED_VALUE);
    }
    return scrubbed;
  }
  if (Array.isArray(value)) return value.map((item) => scrubKnownSecretStrings(item, secrets));
  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, scrubKnownSecretStrings(item, secrets)]),
    );
  }
  return value;
}

function definitionMap(definitions: NodeDefinition[]): Map<string, NodeDefinition> {
  return new Map(definitions.map((definition) => [definition.node_name, definition]));
}

function liveNodeTypeMap(nodes: SerializedGraphNode[]): Map<string, string> {
  return new Map(
    nodes
      .filter((node): node is SerializedGraphNode & { type: string } => typeof node.type === 'string')
      .map((node) => [node.id, node.type]),
  );
}

/**
 * Return a graph snapshot that is safe to send to a model or persist as a tool
 * result. Declared secrets, credential-shaped fields, and every parameter
 * whose schema is unavailable fail closed. Exact echoes of those redacted
 * strings elsewhere in the graph are scrubbed as well.
 */
export function redactGraphForContext(
  graph: SerializedGraph,
  definitions: NodeDefinition[],
): SerializedGraph {
  const definitionsByType = definitionMap(definitions);
  const knownSecrets = new Set<string>();
  collectGraphRedactedValues(graph, definitionsByType, knownSecrets);
  const cloned = redactSensitiveFields(graph);
  if (!isRecord(cloned)) return { ...graph, nodes: [], edges: [] };

  const clonedNodes = Array.isArray(cloned.nodes) ? cloned.nodes : [];
  graph.nodes.forEach((rawNode, index) => {
    const clonedNode = clonedNodes[index];
    if (!isRecord(clonedNode) || !isRecord(clonedNode.data)) return;
    if (rawNode.data && Object.prototype.hasOwnProperty.call(rawNode.data, 'params')) {
      clonedNode.data.params = redactParams(
        rawNode.data.params,
        typeof rawNode.type === 'string' ? rawNode.type : undefined,
        definitionsByType,
      );
    }
  });

  const scrubbed = scrubKnownSecretStrings(cloned, knownSecrets);
  return (isRecord(scrubbed) ? scrubbed : { nodes: [], edges: [] }) as unknown as SerializedGraph;
}

/** Redact a tool result before it is returned to the model or local history. */
export function redactToolResultForContext(
  toolCall: WireToolCall,
  result: string,
  api: CodefyUIPluginAPI,
  additionalContexts: ReadonlyArray<{
    graph: SerializedGraph;
    definitions: NodeDefinition[];
  }> = [],
): string {
  let definitions: NodeDefinition[] = [];
  let graph: Pick<SerializedGraph, 'nodes' | 'presets'> = { nodes: [] };
  try { definitions = api.graph.getNodeDefinitions(); } catch { /* fail closed below */ }
  try {
    const liveGraph = api.graph.getGraph();
    graph = { nodes: liveGraph.nodes, presets: liveGraph.presets };
  } catch { /* no graph echoes to collect */ }
  const definitionsByType = definitionMap(definitions);
  const liveTypes = liveNodeTypeMap(graph.nodes);
  const secrets = collectKnownSecretValues(toolCall, definitionsByType, liveTypes);
  collectGraphRedactedValues(graph, definitionsByType, secrets);
  for (const context of additionalContexts) {
    const contextDefinitions = definitionMap(context.definitions);
    const contextTypes = liveNodeTypeMap(context.graph.nodes);
    for (const secret of collectKnownSecretValues(toolCall, contextDefinitions, contextTypes)) {
      secrets.add(secret);
    }
    collectGraphRedactedValues(context.graph, contextDefinitions, secrets);
  }

  try {
    const parsed = JSON.parse(result) as unknown;
    if (Array.isArray(parsed) || isRecord(parsed)) {
      return JSON.stringify(scrubKnownSecretStrings(redactSensitiveFields(parsed), secrets));
    }
  } catch {
    // Plain-text tool results are scrubbed below without changing formatting.
  }
  return scrubKnownSecretStrings(result, secrets) as string;
}

/**
 * Redact params using CodefyUI's node schema. Unknown nodes and unknown params
 * fail closed because a plugin must not guess that an unrecognized field is
 * safe to persist.
 */
function redactParams(
  params: unknown,
  nodeType: string | undefined,
  definitions: Map<string, NodeDefinition>,
): unknown {
  const cloned = redactSensitiveFields(params);
  if (!isRecord(cloned)) return cloned;

  const definition = nodeType ? definitions.get(nodeType) : undefined;
  const paramsByName = definition
    ? new Map(definition.params.map((param) => [param.name, param]))
    : undefined;

  for (const name of Object.keys(cloned)) {
    const param = paramsByName?.get(name);
    if (!param || param.param_type === 'secret') cloned[name] = REDACTED_VALUE;
  }
  return cloned;
}

function redactOperations(
  value: unknown,
  definitions: Map<string, NodeDefinition>,
  liveNodeTypes: Map<string, string>,
): unknown {
  const cloned = redactSensitiveFields(value);
  if (!Array.isArray(cloned)) return cloned;

  // Refs exist only inside one GraphOp batch. Tracking their node types lets a
  // later set_params operation use the schema of an earlier add_node.
  const refTypes = new Map<string, string>();
  for (const item of cloned) {
    if (!isRecord(item)) continue;
    if (item.op === 'add_node') {
      const nodeType = typeof item.node_type === 'string' ? item.node_type : undefined;
      if (typeof item.ref === 'string' && nodeType) refTypes.set(item.ref, nodeType);
      if ('params' in item) item.params = redactParams(item.params, nodeType, definitions);
    } else if (item.op === 'set_params') {
      const nodeId = typeof item.node_id === 'string' ? item.node_id : undefined;
      const nodeType = nodeId ? (refTypes.get(nodeId) ?? liveNodeTypes.get(nodeId)) : undefined;
      item.params = redactParams(item.params, nodeType, definitions);
    }
  }
  return cloned;
}

function redactSearchSpace(
  value: unknown,
  definitions: Map<string, NodeDefinition>,
  liveNodeTypes: Map<string, string>,
): unknown {
  const cloned = redactSensitiveFields(value);
  if (!Array.isArray(cloned)) return cloned;

  for (const item of cloned) {
    if (!isRecord(item)) continue;
    const nodeId = typeof item.node_id === 'string' ? item.node_id : undefined;
    const paramName = typeof item.param === 'string' ? item.param : undefined;
    const nodeType = nodeId ? liveNodeTypes.get(nodeId) : undefined;
    const definition = nodeType ? definitions.get(nodeType) : undefined;
    const param = definition?.params.find((candidate) => candidate.name === paramName);
    if (!param || param.param_type === 'secret') {
      item.values = Array.isArray(item.values)
        ? item.values.map(() => REDACTED_VALUE)
        : REDACTED_VALUE;
    }
  }
  return cloned;
}

/**
 * Return the copy of a tool call that is safe to render and persist. The raw
 * call remains untouched for execution and for the provider's current
 * tool-call/result protocol round trip.
 */
export function redactToolCallForHistory(
  toolCall: WireToolCall,
  api: CodefyUIPluginAPI,
): WireToolCall {
  let definitions: NodeDefinition[] = [];
  let nodes: SerializedGraphNode[] = [];
  try {
    definitions = api.graph.getNodeDefinitions();
  } catch {
    // Empty definitions make every parameter fail closed below.
  }
  try {
    nodes = api.graph.getGraph().nodes;
  } catch {
    // Empty node metadata makes set_params fail closed below.
  }

  const definitionsByType = definitionMap(definitions);
  const liveTypes = liveNodeTypeMap(nodes);
  const cloned = redactSensitiveFields(toolCall.arguments);
  const args = isRecord(cloned) ? cloned : {};

  if (toolCall.name === 'apply_graph_operations') {
    args.operations = redactOperations(toolCall.arguments.operations, definitionsByType, liveTypes);
  } else if (toolCall.name === 'run_graph_experiments') {
    const rawVariants = toolCall.arguments.variants;
    if (Array.isArray(args.variants) && Array.isArray(rawVariants)) {
      args.variants.forEach((variant, index) => {
        if (isRecord(variant) && isRecord(rawVariants[index])) {
          variant.operations = redactOperations(
            rawVariants[index].operations,
            definitionsByType,
            liveTypes,
          );
        }
      });
    }
    if (toolCall.arguments.search !== undefined) args.search = REDACTED_VALUE;
  } else if (toolCall.name === 'optimize_graph_parameters') {
    args.bindings = redactSearchSpace(
      toolCall.arguments.bindings,
      definitionsByType,
      liveTypes,
    );
  }

  const knownSecrets = collectKnownSecretValues(toolCall, definitionsByType, liveTypes);
  const scrubbed = scrubKnownSecretStrings(args, knownSecrets);
  return {
    id: toolCall.id,
    name: toolCall.name,
    arguments: isRecord(scrubbed) ? scrubbed : {},
  };
}

export function redactToolCallsForHistory(
  toolCalls: WireToolCall[],
  api: CodefyUIPluginAPI,
): WireToolCall[] {
  let definitions: NodeDefinition[] = [];
  let nodes: SerializedGraphNode[] = [];
  try { definitions = api.graph.getNodeDefinitions(); } catch { /* fail closed below */ }
  try { nodes = api.graph.getGraph().nodes; } catch { /* unknown node types fail closed */ }
  const definitionsByType = definitionMap(definitions);
  const liveTypes = liveNodeTypeMap(nodes);
  const batchSecrets = new Set<string>();
  for (const toolCall of toolCalls) {
    for (const secret of collectKnownSecretValues(toolCall, definitionsByType, liveTypes)) {
      batchSecrets.add(secret);
    }
  }

  return toolCalls.map((toolCall) => {
    const redacted = redactToolCallForHistory(toolCall, api);
    const argumentsForHistory = scrubKnownSecretStrings(redacted.arguments, batchSecrets);
    return {
      ...redacted,
      arguments: isRecord(argumentsForHistory) ? argumentsForHistory : {},
    };
  });
}

/**
 * Scrub assistant prose before it enters local history. The provider may have
 * seen raw arguments during the active tool protocol, so later prose must not
 * be allowed to persist exact echoes of values the schema redactor removed.
 */
export function redactAssistantTextForHistory(
  text: string,
  toolCallsSeenThisTurn: readonly WireToolCall[],
  api: CodefyUIPluginAPI,
): string {
  let definitions: NodeDefinition[] = [];
  let graph: SerializedGraph = { nodes: [], edges: [] };
  try { definitions = api.graph.getNodeDefinitions(); } catch { /* fail closed below */ }
  try { graph = api.graph.getGraph(); } catch { /* no live-graph echoes to collect */ }
  const definitionsByType = definitionMap(definitions);
  const liveTypes = liveNodeTypeMap(graph.nodes);
  const secrets = new Set<string>();
  collectGraphRedactedValues(graph, definitionsByType, secrets);
  for (const toolCall of toolCallsSeenThisTurn) {
    for (const secret of collectKnownSecretValues(toolCall, definitionsByType, liveTypes)) {
      secrets.add(secret);
    }
  }
  return scrubKnownSecretStrings(text, secrets) as string;
}
