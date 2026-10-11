import type { ApplyResult, GraphOp, OpResult, SerializedGraph } from '../src/types/codefyui';
import { SAMPLE_CATALOG } from './catalog';

export interface SampleNode {
  id: string;
  type: string;
  data: { params: Record<string, unknown> };
  position: { x: number; y: number };
}

export interface SampleEdge {
  id: string;
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}

export interface SampleGraph extends SerializedGraph {
  nodes: SampleNode[];
  edges: SampleEdge[];
}

export interface GraphReceipt {
  operations: GraphOp[];
  result: ApplyResult;
}

export function initialGraph(): SampleGraph {
  return {
    nodes: [
      { id: 'sample-start', type: 'Start', data: { params: {} }, position: { x: 40, y: 80 } },
      { id: 'sample-dataset', type: 'Dataset', data: { params: { batch_size: 16 } }, position: { x: 240, y: 80 } },
      { id: 'sample-preview', type: 'Preview', data: { params: {} }, position: { x: 440, y: 80 } },
    ],
    edges: [
      { id: 'sample-edge-1', source: 'sample-start', sourceHandle: 'trigger', target: 'sample-dataset', targetHandle: 'trigger' },
      { id: 'sample-edge-2', source: 'sample-dataset', sourceHandle: 'samples', target: 'sample-preview', targetHandle: 'samples' },
    ],
  };
}

const clone = <T>(value: T): T => structuredClone(value);

function checkParams(type: string, values: Record<string, unknown>): void {
  const definition = SAMPLE_CATALOG.find((node) => node.node_name === type);
  if (!definition) throw new Error(`Unknown node type: ${type}`);
  for (const [name, value] of Object.entries(values)) {
    const param = definition.params.find((candidate) => candidate.name === name);
    if (!param) throw new Error(`Unknown parameter ${type}.${name}`);
    if (param.param_type === 'int' || param.param_type === 'float') {
      if (typeof value !== 'number' || !Number.isFinite(value)) throw new Error(`${name} must be a number`);
      if (param.param_type === 'int' && !Number.isInteger(value)) throw new Error(`${name} must be an integer`);
      if (param.min_value !== null && value < param.min_value) throw new Error(`${name} is below ${param.min_value}`);
      if (param.max_value !== null && value > param.max_value) throw new Error(`${name} is above ${param.max_value}`);
    }
  }
}

export function validateSampleGraph(graph: SampleGraph): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const node of graph.nodes) {
    const definition = SAMPLE_CATALOG.find((candidate) => candidate.node_name === node.type);
    if (!definition) { errors.push(`Unknown node type: ${node.type}`); continue; }
    for (const input of definition.inputs.filter((port) => !port.optional)) {
      if (!graph.edges.some((edge) => edge.target === node.id && edge.targetHandle === input.name)) {
        errors.push(`${node.id}.${input.name} is missing a required connection`);
      }
    }
    try { checkParams(node.type, node.data.params); } catch (error) { errors.push(String((error as Error).message)); }
  }
  for (const edge of graph.edges) {
    const source = graph.nodes.find((node) => node.id === edge.source);
    const target = graph.nodes.find((node) => node.id === edge.target);
    const output = SAMPLE_CATALOG.find((node) => node.node_name === source?.type)?.outputs.find((port) => port.name === edge.sourceHandle);
    const input = SAMPLE_CATALOG.find((node) => node.node_name === target?.type)?.inputs.find((port) => port.name === edge.targetHandle);
    if (!output || !input || output.data_type !== input.data_type) errors.push(`Invalid connection: ${edge.id}`);
  }
  return { valid: errors.length === 0, errors };
}

/** Stateful, per-operation v1 host. Refs are scoped to one batch, and failed
 * operations leave successful earlier operations in place, like the real API. */
export function createSampleGraph(onChange: () => void) {
  let graph = initialGraph();
  let nextNode = 1;
  let nextEdge = 3;
  let revision = 0;
  const subscribers = new Set<() => void>();
  const receipts: GraphReceipt[] = [];

  const getGraph = (): SampleGraph => clone(graph);
  const applyOperations = (operations: GraphOp[]): ApplyResult => {
    const refs: Record<string, string> = Object.create(null);
    const before = JSON.stringify(graph);
    const find = (id: string): SampleNode => {
      const realId = Object.hasOwn(refs, id) ? refs[id] : id;
      const node = graph.nodes.find((candidate) => candidate.id === realId);
      if (!node) throw new Error(`Node not found: ${id}`);
      return node;
    };
    const results: OpResult[] = operations.map((operation, index) => {
      try {
        if (!operation || typeof operation !== 'object') throw new Error('Operation must be an object');
        switch (operation.op) {
          case 'add_node': {
            const definition = SAMPLE_CATALOG.find((node) => node.node_name === operation.node_type);
            if (!definition) throw new Error(`Unknown node type: ${operation.node_type}`);
            if (operation.ref && Object.hasOwn(refs, operation.ref)) throw new Error(`Duplicate ref: ${operation.ref}`);
            const params = {
              ...Object.fromEntries(definition.params.map((param) => [param.name, clone(param.default)])),
              ...operation.params,
            };
            checkParams(definition.node_name, params);
            const id = `mock-node-${nextNode++}`;
            graph.nodes.push({ id, type: definition.node_name, data: { params }, position: clone(operation.position ?? { x: 40, y: 200 }) });
            if (operation.ref) refs[operation.ref] = id;
            return { index, ok: true, node_id: id };
          }
          case 'connect': {
            const source = find(operation.source);
            const target = find(operation.target);
            const output = SAMPLE_CATALOG.find((node) => node.node_name === source.type)!.outputs.find((port) => port.name === operation.source_handle);
            const input = SAMPLE_CATALOG.find((node) => node.node_name === target.type)!.inputs.find((port) => port.name === operation.target_handle);
            if (!output || !input) throw new Error('Unknown input/output handle');
            if (output.data_type !== input.data_type) throw new Error('Incompatible port types');
            if (graph.edges.some((edge) => edge.target === target.id && edge.targetHandle === input.name)) throw new Error('Input already connected');
            graph.edges.push({ id: `mock-edge-${nextEdge++}`, source: source.id, sourceHandle: output.name, target: target.id, targetHandle: input.name });
            break;
          }
          case 'set_params': {
            const node = find(operation.node_id);
            checkParams(node.type, operation.params);
            node.data.params = { ...node.data.params, ...clone(operation.params) };
            break;
          }
          case 'remove_node': {
            const node = find(operation.node_id);
            graph.nodes = graph.nodes.filter((candidate) => candidate.id !== node.id);
            graph.edges = graph.edges.filter((edge) => edge.source !== node.id && edge.target !== node.id);
            break;
          }
          case 'remove_edge': {
            const source = find(operation.source);
            const target = find(operation.target);
            const matches = (edge: SampleEdge) => edge.source === source.id && edge.target === target.id
              && (!operation.source_handle || edge.sourceHandle === operation.source_handle)
              && (!operation.target_handle || edge.targetHandle === operation.target_handle);
            if (!graph.edges.some(matches)) throw new Error('Edge not found');
            graph.edges = graph.edges.filter((edge) => !matches(edge));
            break;
          }
          case 'clear_graph':
            graph = { nodes: [], edges: [] };
            break;
          case 'auto_layout':
            graph.nodes.forEach((node, i) => { node.position = { x: 40 + (i % 3) * 200, y: 80 + Math.floor(i / 3) * 160 }; });
            break;
          default:
            throw new Error(`Unknown operation: ${String((operation as { op: unknown }).op)}`);
        }
        return { index, ok: true };
      } catch (error) {
        return { index, ok: false, error: (error as Error).message };
      }
    });
    const result: ApplyResult = { results, refs: { ...refs }, node_count: graph.nodes.length, edge_count: graph.edges.length };
    receipts.push(clone({ operations, result }));
    if (JSON.stringify(graph) !== before) {
      revision++;
      onChange();
      subscribers.forEach((callback) => callback());
    } else onChange();
    return clone(result);
  };

  return {
    getGraph,
    getNodeDefinitions: () => clone(SAMPLE_CATALOG),
    applyOperations,
    onGraphChanged(callback: () => void) { subscribers.add(callback); return () => { subscribers.delete(callback); }; },
    inspect: () => ({ graph: getGraph(), revision, receipts: clone(receipts) }),
  };
}
