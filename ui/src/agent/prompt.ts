/**
 * System prompt builder for Graph Copilot.
 *
 * Produces a compact token-efficient context from the live node catalog and
 * current graph state, and assembles the full system prompt.
 */

import type { NodeDefinition, ParamDefinition, SerializedGraph } from '../types/codefyui';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum characters kept in the graph JSON snapshot before truncation. */
export const GRAPH_CHAR_LIMIT = 30_000;

// ---------------------------------------------------------------------------
// compactCatalog
// ---------------------------------------------------------------------------

/**
 * Render a single ParamDefinition to the compact format:
 *   name:type=default{constraint}
 * where constraint is:
 *   - {min..max} for numeric ranges (either side blank when null)
 *   - {a|b|c}    for select options
 * Omitted entirely when both sides are null (no constraint).
 */
function formatParam(p: ParamDefinition): string {
  // Render primitives with String(); non-primitives with JSON.stringify to avoid
  // "[object Object]". Cap the result at 60 chars to keep catalog lines readable.
  const rawDefault =
    p.default === null || p.default === undefined
      ? String(p.default)
      : typeof p.default === 'object'
      ? JSON.stringify(p.default)
      : String(p.default);
  const defaultStr = rawDefault.length > 60 ? rawDefault.slice(0, 60) + '...' : rawDefault;
  let constraint = '';

  if (p.param_type === 'select' && p.options.length > 0) {
    constraint = `{${p.options.join('|')}}`;
  } else if (p.param_type === 'int' || p.param_type === 'float') {
    const hasMin = p.min_value !== null;
    const hasMax = p.max_value !== null;
    if (hasMin || hasMax) {
      const lo = hasMin ? String(p.min_value) : '';
      const hi = hasMax ? String(p.max_value) : '';
      constraint = `{${lo}..${hi}}`;
    }
  }

  return `${p.name}:${p.param_type}=${defaultStr}${constraint}`;
}

/**
 * Build a compact one-line-per-node catalog string.
 *
 * Format:
 *   NodeName (Category): in[x:TYPE, ...] out[y:TYPE, ...] params[name:type=default{constraint}, ...]
 *
 * Sections (in[], out[], params[]) are omitted entirely when empty.
 */
export function compactCatalog(defs: NodeDefinition[]): string {
  return defs.map((def) => {
    const parts: string[] = [];

    if (def.inputs.length > 0) {
      const portList = def.inputs.map((p) => `${p.name}:${p.data_type}`).join(', ');
      parts.push(`in[${portList}]`);
    }
    if (def.outputs.length > 0) {
      const portList = def.outputs.map((p) => `${p.name}:${p.data_type}`).join(', ');
      parts.push(`out[${portList}]`);
    }
    if (def.params.length > 0) {
      const paramList = def.params.map(formatParam).join(', ');
      parts.push(`params[${paramList}]`);
    }

    const suffix = parts.length > 0 ? ' ' + parts.join(' ') : '';
    return `${def.node_name} (${def.category}):${suffix}`;
  }).join('\n');
}

// ---------------------------------------------------------------------------
// graphSnapshot
// ---------------------------------------------------------------------------

/**
 * Serialize the graph to a compact JSON string (nodes + edges only).
 * If the result exceeds GRAPH_CHAR_LIMIT, truncate and append a marker.
 */
export function graphSnapshot(graph: SerializedGraph): string {
  const payload = JSON.stringify({ nodes: graph.nodes, edges: graph.edges });
  if (payload.length <= GRAPH_CHAR_LIMIT) {
    return payload;
  }

  const kept = GRAPH_CHAR_LIMIT;
  const total = payload.length;
  return payload.slice(0, kept) + `\n[graph truncated - kept ${kept} of ${total} chars]`;
}

// ---------------------------------------------------------------------------
// buildSystemPrompt
// ---------------------------------------------------------------------------

/**
 * Assemble the full system prompt from the node catalog and current graph.
 */
export function buildSystemPrompt(defs: NodeDefinition[], graph: SerializedGraph): string {
  const catalog = compactCatalog(defs);
  const snapshot = graphSnapshot(graph);

  return `You are Graph Copilot inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and edit the user's graph by calling tools.

## Graph model
Nodes have a type from the catalog below, typed input/output ports, and configurable params. Edges connect an output handle to an input handle; the connected types must be compatible.

## Rules
- Use exact node-type names from the catalog.
- Connect every required input of nodes you add.
- Set params via set_params or add_node.params, respecting the declared types and ranges.
- Finish structural batches with one auto_layout op.
- Never use clear_graph unless the user explicitly asked to start over.
- If an op fails, read the error message and correct yourself before retrying.
- Prefer small batches over one enormous batch.
- Reply in the user's language.
- After applying changes, summarize what changed in one or two sentences.

## Available node types
${catalog}

## Current graph
${snapshot}`;
}
