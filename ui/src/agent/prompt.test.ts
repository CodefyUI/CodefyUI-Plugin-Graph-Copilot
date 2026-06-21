/**
 * Tests for ui/src/agent/prompt.ts
 *
 * Covers: catalog line format (params with range/options, node with no ports),
 * truncation marker, and system prompt containing catalog + snapshot + the
 * never-clear rule.
 */

import { describe, it, expect } from 'vitest';
import {
  GRAPH_CHAR_LIMIT,
  compactCatalog,
  graphSnapshot,
  buildSystemPrompt,
} from './prompt';
import type { NodeDefinition, SerializedGraph } from '../types/codefyui';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeNode(overrides: Partial<NodeDefinition> = {}): NodeDefinition {
  return {
    node_name: 'Conv2d',
    category: 'Layer',
    description: 'A 2D convolution layer',
    inputs: [{ name: 'x', data_type: 'TENSOR', description: '', optional: false }],
    outputs: [{ name: 'y', data_type: 'TENSOR', description: '', optional: false }],
    params: [],
    ...overrides,
  };
}

function makeSmallGraph(): SerializedGraph {
  return {
    nodes: [{ id: 'n1', type: 'Conv2d', position: { x: 0, y: 0 }, data: {} }],
    edges: [{ id: 'e1', source: 'n1', target: 'n2' }],
  };
}

// ---------------------------------------------------------------------------
// compactCatalog
// ---------------------------------------------------------------------------

describe('compactCatalog', () => {
  it('formats a basic node with in/out ports and no params', () => {
    const defs = [makeNode()];
    const result = compactCatalog(defs);
    expect(result).toBe('Conv2d: in[x:TENSOR] out[y:TENSOR] [category: Layer]');
  });

  it('omits in[] section when inputs is empty', () => {
    const defs = [makeNode({ inputs: [], outputs: [{ name: 'y', data_type: 'TENSOR', description: '', optional: false }] })];
    const result = compactCatalog(defs);
    expect(result).toContain('out[y:TENSOR]');
    expect(result).not.toContain('in[');
  });

  it('omits out[] section when outputs is empty', () => {
    const defs = [makeNode({ outputs: [], inputs: [{ name: 'x', data_type: 'TENSOR', description: '', optional: false }] })];
    const result = compactCatalog(defs);
    expect(result).toContain('in[x:TENSOR]');
    expect(result).not.toContain('out[');
  });

  it('omits params[] section when params is empty', () => {
    const defs = [makeNode()];
    const result = compactCatalog(defs);
    expect(result).not.toContain('params[');
  });

  it('formats a node with no ports or params', () => {
    const defs = [makeNode({ inputs: [], outputs: [], params: [] })];
    const result = compactCatalog(defs);
    expect(result).toBe('Conv2d: [category: Layer]');
  });

  it('formats integer param with both min and max', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'out_channels', param_type: 'int', default: 32, description: '',
        options: [], min_value: 1, max_value: 512,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('out_channels:int=32{1..512}');
  });

  it('formats integer param with only min (max is null)', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'out_channels', param_type: 'int', default: 32, description: '',
        options: [], min_value: 1, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('out_channels:int=32{1..}');
  });

  it('formats float param with only max (min is null)', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'lr', param_type: 'float', default: 0.001, description: '',
        options: [], min_value: null, max_value: 1.0,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('lr:float=0.001{..1}');
  });

  it('omits range braces when both min and max are null', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'stride', param_type: 'int', default: 1, description: '',
        options: [], min_value: null, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('stride:int=1');
    expect(result).not.toContain('{');
  });

  it('formats select param with piped options', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'mode', param_type: 'select', default: 'a', description: '',
        options: ['a', 'b', 'c'], min_value: null, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('mode:select=a{a|b|c}');
  });

  it('formats multiple params joined by comma', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [
        { name: 'out_channels', param_type: 'int', default: 32, description: '', options: [], min_value: 1, max_value: null },
        { name: 'mode', param_type: 'select', default: 'a', description: '', options: ['a', 'b'], min_value: null, max_value: null },
      ],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('params[out_channels:int=32{1..}, mode:select=a{a|b}]');
  });

  it('formats a full Conv2d-like node line', () => {
    const defs = [makeNode({
      params: [
        { name: 'out_channels', param_type: 'int', default: 32, description: '', options: [], min_value: 1, max_value: null },
        { name: 'mode', param_type: 'select', default: 'a', description: '', options: ['a', 'b'], min_value: null, max_value: null },
      ],
    })];
    const result = compactCatalog(defs);
    expect(result).toBe('Conv2d: in[x:TENSOR] out[y:TENSOR] params[out_channels:int=32{1..}, mode:select=a{a|b}] [category: Layer]');
  });

  it('outputs one line per node, joined by newlines', () => {
    const defs = [
      makeNode({ node_name: 'Conv2d' }),
      makeNode({ node_name: 'ReLU', inputs: [], outputs: [], params: [] }),
    ];
    const result = compactCatalog(defs);
    const lines = result.split('\n');
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^Conv2d/);
    expect(lines[1]).toMatch(/^ReLU/);
  });

  it('formats string default unquoted', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'activation', param_type: 'string', default: 'relu', description: '',
        options: [], min_value: null, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).toContain('activation:string=relu');
    // no quotes around relu
    expect(result).not.toContain('"relu"');
  });

  it('formats object default as JSON, not [object Object]', () => {
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'cfg', param_type: 'string', default: { key: 'val' } as unknown as string, description: '',
        options: [], min_value: null, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    expect(result).not.toContain('[object Object]');
    expect(result).toContain('{"key":"val"}');
  });

  it('caps long default at 60 chars with trailing ellipsis', () => {
    const longDefault = 'a'.repeat(80);
    const defs = [makeNode({
      inputs: [], outputs: [],
      params: [{
        name: 'pad', param_type: 'string', default: longDefault, description: '',
        options: [], min_value: null, max_value: null,
      }],
    })];
    const result = compactCatalog(defs);
    // Should not contain the full 80-char string
    expect(result).not.toContain(longDefault);
    // Should end with ...
    expect(result).toMatch(/=a{60}\.\.\./);
  });
});

// ---------------------------------------------------------------------------
// graphSnapshot
// ---------------------------------------------------------------------------

describe('graphSnapshot', () => {
  it('serializes nodes and edges only (ignores presets and segmentGroups)', () => {
    const graph: SerializedGraph = {
      nodes: [{ id: 'n1' }],
      edges: [{ id: 'e1' }],
      presets: [{ ignored: true }],
      segmentGroups: { also: 'ignored' },
    };
    const result = graphSnapshot(graph);
    const parsed = JSON.parse(result);
    expect(parsed.nodes).toEqual([{ id: 'n1' }]);
    expect(parsed.edges).toEqual([{ id: 'e1' }]);
    expect(parsed).not.toHaveProperty('presets');
    expect(parsed).not.toHaveProperty('segmentGroups');
  });

  it('returns a JSON string for a normal small graph', () => {
    const result = graphSnapshot(makeSmallGraph());
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it('truncates long graphs and appends truncation marker', () => {
    // Build a graph that exceeds GRAPH_CHAR_LIMIT
    const nodes = Array.from({ length: 1000 }, (_, i) => ({
      id: `n${i}`,
      type: 'Conv2d',
      data: { params: { out_channels: 64, comment: 'x'.repeat(100) } },
    }));
    const graph: SerializedGraph = { nodes, edges: [] };
    const result = graphSnapshot(graph);
    expect(result.length).toBeLessThanOrEqual(GRAPH_CHAR_LIMIT + 200); // allow marker overhead
    expect(result).toContain('[graph truncated');
    expect(result).toContain('kept');
    expect(result).toContain('of');
    expect(result).toContain('chars]');
  });

  it('does not truncate a graph under the limit', () => {
    const result = graphSnapshot(makeSmallGraph());
    expect(result).not.toContain('[graph truncated');
  });
});

// ---------------------------------------------------------------------------
// buildSystemPrompt
// ---------------------------------------------------------------------------

describe('buildSystemPrompt', () => {
  const defs = [makeNode()];
  const graph = makeSmallGraph();

  it('contains the node-index section header', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('## Node catalog index');
  });

  it('mentions the get_node_schemas and validate_graph workflow', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('get_node_schemas');
    expect(prompt).toContain('validate_graph');
  });

  it('contains the graph section header', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('## Current graph');
  });

  it('contains the compact node index (name [category], no ports/params)', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('Conv2d [Layer]');
    // Token reduction: full ports/params are fetched on demand via
    // get_node_schemas, NOT embedded in the per-round system prompt.
    expect(prompt).not.toContain('in[x:TENSOR] out[y:TENSOR]');
  });

  it('contains the graph snapshot content', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('"nodes"');
    expect(prompt).toContain('"edges"');
  });

  it('contains the never-clear rule', () => {
    const prompt = buildSystemPrompt(defs, graph);
    // The rule says never clear_graph unless user explicitly asked to start over
    expect(prompt.toLowerCase()).toMatch(/never.*clear_graph|clear_graph.*never/);
  });

  it('contains identity statement about Graph Copilot', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('Graph Copilot');
    expect(prompt).toContain('CodefyUI');
  });

  it('contains auto_layout rule', () => {
    const prompt = buildSystemPrompt(defs, graph);
    expect(prompt).toContain('auto_layout');
  });
});
