/**
 * Plugin-side mirror of CodefyUIPluginAPI v1.
 *
 * Field names are identical to the core definitions in:
 *   frontend/src/plugins/ops.ts  (GraphOp, OpResult)
 *   frontend/src/plugins/api.ts  (ApplyResult, CodefyUIPluginAPI)
 *   frontend/src/types/index.ts  (NodeDefinition, PortDefinition, ParamDefinition)
 *
 * No imports from core — this file must be self-contained.
 */

// ---------------------------------------------------------------------------
// Node catalog types (mirrors frontend/src/types/index.ts)
// ---------------------------------------------------------------------------

export interface PortDefinition {
  name: string;
  data_type: string;
  description: string;
  optional: boolean;
}

export interface ParamDefinition {
  name: string;
  param_type:
    | 'int' | 'float' | 'string' | 'bool'
    | 'select' | 'model_file' | 'image_file' | 'tensor_grid' | 'secret';
  default: unknown;
  description: string;
  options: string[];
  min_value: number | null;
  max_value: number | null;
  visible_when?: Record<string, unknown> | null;
}

export interface NodeDefinition {
  node_name: string;
  category: string;
  description: string;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  params: ParamDefinition[];
  /** Added by newer CodefyUI builds; absent on the 1.3.0 v1 host. */
  provider?: string;
}

// ---------------------------------------------------------------------------
// Graph operation types (mirrors frontend/src/plugins/ops.ts)
// ---------------------------------------------------------------------------

export type GraphOp =
  | { op: 'add_node'; node_type: string; ref?: string;
      params?: Record<string, unknown>; position?: { x: number; y: number } }
  | { op: 'connect'; source: string; source_handle: string;
      target: string; target_handle: string }
  | { op: 'set_params'; node_id: string; params: Record<string, unknown> }
  | { op: 'remove_node'; node_id: string }
  | { op: 'remove_edge'; source: string; target: string;
      source_handle?: string; target_handle?: string }
  | { op: 'clear_graph' }
  | { op: 'auto_layout' };

export interface OpResult {
  index: number;
  ok: boolean;
  error?: string;
  node_id?: string;
}

// ---------------------------------------------------------------------------
// API result types (mirrors frontend/src/plugins/api.ts)
// ---------------------------------------------------------------------------

export interface ApplyResult {
  results: OpResult[];
  refs: Record<string, string>;
  node_count: number;
  edge_count: number;
}

/**
 * Loose serialized graph shape. The actual type is derived from the store's
 * getSerializedGraph(); the intentionally loose optional fields tolerate
 * older hosts and malformed snapshots without importing React Flow types.
 */
export interface SerializedGraphNode {
  id: string;
  type?: string;
  position?: { x: number; y: number };
  data?: {
    params?: Record<string, unknown>;
    [key: string]: unknown;
  };
}

export interface SerializedGraphEdge {
  id: string;
  source?: string;
  target?: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: 'data' | 'trigger';
}

export interface SerializedGraph {
  nodes: SerializedGraphNode[];
  edges: SerializedGraphEdge[];
  presets?: unknown[];
  segmentGroups?: unknown;
  name?: string;
  description?: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Toast type (matches core's ToastType union)
// ---------------------------------------------------------------------------

export type ToastType = 'info' | 'success' | 'warning' | 'error';

// ---------------------------------------------------------------------------
// Main plugin API interface (mirrors frontend/src/plugins/api.ts)
// ---------------------------------------------------------------------------

export interface CodefyUIPluginAPI {
  /** v1 is CodefyUI 1.3.0; current main exposes v2 additively. */
  apiVersion: number;
  pluginId: string;
  ui: {
    addFloatingWidget(opts: { id: string }): HTMLElement;
    toast(message: string, type?: ToastType): void;
  };
  graph: {
    getGraph(): SerializedGraph;
    getNodeDefinitions(): NodeDefinition[];
    applyOperations(ops: GraphOp[]): ApplyResult;
    onGraphChanged(cb: () => void): () => void;
  };
  /** Available when apiVersion >= 2. Kept optional for 1.3.0 compatibility. */
  nodes?: {
    registerRenderer(nodeType: string, renderer: unknown): () => void;
  };
  http: {
    fetch(url: string, init?: RequestInit): Promise<Response>;
  };
  storage: {
    get(key: string): string | null;
    set(key: string, value: string): void;
    remove(key: string): void;
  };
}
