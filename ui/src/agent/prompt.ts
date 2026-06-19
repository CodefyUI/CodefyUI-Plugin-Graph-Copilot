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
 *   NodeName: in[x:TYPE, ...] out[y:TYPE, ...] params[name:type=default{constraint}, ...] [category: Category]
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
    // Lead with the bare node-type name + colon so the model never mistakes
    // the category for part of the type. (Real codex bug: it emitted
    // node_type "Dataset (Data)" from the old "Name (Category):" format.)
    return `${def.node_name}:${suffix} [category: ${def.category}]`;
  }).join('\n');
}

// ---------------------------------------------------------------------------
// compactIndex
// ---------------------------------------------------------------------------

/**
 * Token-efficient one-line-per-node INDEX: name, category and a short
 * description only (no ports/params). The agent calls get_node_schemas to pull
 * exact ports/params on demand, keeping the per-round system prompt small.
 *
 * Format:  NodeName [Category] - short description
 */
export function compactIndex(defs: NodeDefinition[]): string {
  return defs.map((def) => {
    const desc = (def.description || '').replace(/\s+/g, ' ').trim();
    const shortDesc = desc.length > 100 ? desc.slice(0, 100) + '...' : desc;
    return `${def.node_name} [${def.category}]${shortDesc ? ' - ' + shortDesc : ''}`;
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
  const index = compactIndex(defs);
  const snapshot = graphSnapshot(graph);

  return `You are Graph Copilot inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and edit the user's graph by calling tools, and you make sure the result actually RUNS.

## Workflow (follow in order)
1. Plan - state in 1-2 sentences the nodes and connections you intend.
2. Look up schemas - call get_node_schemas for the node types you plan to use, to get their exact input/output ports and params. Do NOT guess port or param names.
3. Build - call apply_graph_operations in small batches (add_node with a "ref", connect, set_params), ending a structural batch with one auto_layout.
4. Validate - call validate_graph. If it returns errors (e.g. a missing required input), fix them with more operations and validate again. Only finish once validate_graph reports "valid": true.
5. Summarize what you built in 1-2 sentences, in the user's language.

## Graph model
Each node has a type (the bare name from the index), typed input/output ports, and params. Edges connect an output handle to an input handle; the connected data types must be compatible. Some pipelines need a control-flow trigger from a Start node (connect with source_handle "trigger").

## Rules
- Use the exact node-type name from the index - the bare name only (e.g. Dataset), not the "[Category]" tag.
- Always get_node_schemas before connecting, so you use real port names.
- For a COMPLEX graph, you may first call research with a few independent sub-questions (e.g. data pipeline / model / training loop) to plan the parts in parallel.
- Connect every REQUIRED input; validate_graph reports the ones you missed.
- Prefer several small batches over one enormous batch.
- Never use clear_graph unless the user asks to start over.

## Node catalog index (NodeName [Category] - description). Call get_node_schemas for exact ports/params.
${index}

## Current graph
${snapshot}`;
}
