import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  encodeCandidateGraphJson,
  materializeStudyCandidate,
  type MaterializedCandidateGraph,
} from './studyMaterialize';
import type {
  PortableGraphOpV1,
  PortableGraphV1,
  StudyBundleV1,
} from './studyBundle';

function baseline(): PortableGraphV1 {
  return {
    name: 'Portable graph',
    description: 'Candidate source',
    nodes: [
      {
        id: 'source',
        type: 'Source',
        position: { x: 5, y: 6 },
        data: { params: { value: 1 } },
      },
      {
        id: 'sink',
        type: 'Sink',
        position: { x: 25, y: 26 },
        data: { params: { label: 'original' } },
      },
    ],
    edges: [{
      id: 'baseline-edge',
      source: 'source',
      target: 'sink',
      sourceHandle: 'out',
      targetHandle: 'in',
      type: 'data',
    }],
    presets: [{ preset_name: 'kept' }],
    segmentGroups: [{ id: 'segment-1' }],
  };
}

function study(
  operations: readonly PortableGraphOpV1[],
  graph: PortableGraphV1 = baseline(),
  variantId = 'candidate/a',
): StudyBundleV1 {
  return {
    format: 'codefyui.graph-copilot.study',
    formatVersion: 1,
    payload: {
      id: 'study-materialize',
      createdAt: '2026-07-15T00:00:00.000Z',
      completedAt: '2026-07-15T00:01:00.000Z',
      producer: {
        pluginId: 'graph-copilot',
        pluginVersion: '0.2.0',
        codefyuiApiVersion: 2,
      },
      provenance: { facts: [] },
      spec: {
        hypothesis: 'Materialization is deterministic.',
        baseline: graph,
        objective: { metric: 'metric', direction: 'maximize' },
        repetitions: 1,
        concurrency: 1,
        applyBestRequested: false,
        variants: [{ id: variantId, label: 'Candidate A', operations }],
      },
      runs: [],
      derived: {
        status: 'completed',
        variants: [],
        insights: { summary: [], warnings: [], paperIdeas: [] },
      },
      redactionReport: {
        policy: 'explicit-secret-ref-v1',
        secretRequirements: [],
        textRedactions: [],
      },
    },
    integrity: {
      algorithm: 'SHA-256',
      canonicalization: 'plugin-canonical-v1',
      contentSha256: '0'.repeat(64),
    },
  };
}

function expectGraph(result: ReturnType<typeof materializeStudyCandidate>): MaterializedCandidateGraph {
  expect(result.status).not.toBe('error');
  expect(result.graph).not.toBeNull();
  return result.graph!;
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('study candidate materialization', () => {
  it('supports add, refs, connect, set, remove edge/node, and auto layout', () => {
    const result = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'Transform', ref: 'new-node', params: { scale: 2 } },
      { op: 'connect', source: 'source', source_handle: 'out', target: 'new-node', target_handle: 'input' },
      { op: 'set_params', node_id: 'new-node', params: { scale: 3, enabled: true } },
      { op: 'remove_edge', source: 'source', target: 'new-node' },
      { op: 'connect', source: 'new-node', source_handle: 'out', target: 'sink', target_handle: 'in2' },
      { op: 'remove_node', node_id: 'source' },
      { op: 'auto_layout' },
    ]), 'candidate/a');

    expect(result.status).toBe('ready');
    const graph = expectGraph(result);
    const newId = result.refs['new-node'];
    expect(newId).toContain('candidate%2Fa:node:0');
    expect(graph.nodes.map((node) => node.id)).toEqual(['sink', newId]);
    expect(graph.nodes[1]).toMatchObject({
      id: newId,
      position: { x: 380, y: 100 },
      data: { params: { scale: 3, enabled: true } },
    });
    expect(graph.nodes[0].position).toEqual({ x: 120, y: 100 });
    expect(graph.edges).toEqual([expect.objectContaining({
      source: newId,
      target: 'sink',
      sourceHandle: 'out',
      targetHandle: 'in2',
    })]);
  });

  it('supports clear_graph, clears old refs, and can rebuild afterwards', () => {
    const result = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'Temporary', ref: 'old' },
      { op: 'clear_graph' },
      { op: 'add_node', node_type: 'Replacement', ref: 'replacement', position: { x: 9, y: 8 } },
      { op: 'auto_layout' },
    ]), 'candidate/a');
    const graph = expectGraph(result);
    expect(graph.nodes).toHaveLength(1);
    expect(graph.nodes[0]).toMatchObject({
      id: result.refs.replacement,
      type: 'Replacement',
      position: { x: 120, y: 100 },
    });
    expect(graph.edges).toEqual([]);
    expect(result.refs).not.toHaveProperty('old');
  });

  it('matches runtime fallback placement using the current node count', () => {
    const result = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'Third', ref: 'third' },
      { op: 'remove_node', node_id: 'source' },
      { op: 'add_node', node_type: 'Replacement', ref: 'replacement' },
      { op: 'clear_graph' },
      { op: 'add_node', node_type: 'AfterClear', ref: 'after-clear' },
    ]), 'candidate/a');

    const graph = expectGraph(result);
    expect(graph.nodes).toEqual([expect.objectContaining({
      id: result.refs['after-clear'],
      position: { x: 160, y: 120 },
    })]);

    const withoutClear = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'Third', ref: 'third' },
      { op: 'remove_node', node_id: 'source' },
      { op: 'add_node', node_type: 'Replacement', ref: 'replacement' },
    ]), 'candidate/a');
    const placed = expectGraph(withoutClear);
    expect(placed.nodes.find((node) => node.id === withoutClear.refs.third)?.position)
      .toEqual({ x: 640, y: 120 });
    expect(placed.nodes.find((node) => node.id === withoutClear.refs.replacement)?.position)
      .toEqual({ x: 640, y: 120 });
  });

  it('reports that add_node replay is approximate because v1 omits schema defaults', () => {
    const approximate = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'UsesDefaults', ref: 'added', params: { explicit: 1 } },
    ]), 'candidate/a');

    expect(approximate.fidelity).toBe('approximate-node-defaults');
    expect(approximate.fidelityWarnings).toEqual([
      expect.stringContaining('does not include node-definition defaults'),
      expect.stringContaining('deterministic portable ids'),
    ]);
    expect(expectGraph(approximate).nodes.at(-1)?.data.params).toEqual({ explicit: 1 });

    const operationOnly = materializeStudyCandidate(study([
      { op: 'set_params', node_id: 'source', params: { value: 2 } },
    ]), 'candidate/a');
    expect(operationOnly.fidelity).toBe('portable-operation-replay');
    expect(operationOnly.fidelityWarnings).toEqual([]);
  });

  it('is deterministic, collision-safe, and maps refs to deterministic ids', () => {
    const collidingBaseline: PortableGraphV1 = {
      ...baseline(),
      nodes: [
        ...baseline().nodes,
        {
          id: 'graph-copilot:candidate%2Fa:node:0',
          type: 'Collision',
          position: { x: 0, y: 0 },
          data: { params: {} },
        },
      ],
    };
    const input = study([
      { op: 'add_node', node_type: 'Added', ref: 'added' },
      { op: 'connect', source: 'added', source_handle: 'trigger', target: 'sink', target_handle: 'ignored' },
    ], collidingBaseline);

    const first = materializeStudyCandidate(input, 'candidate/a');
    const second = materializeStudyCandidate(input, 'candidate/a');
    expect(first).toEqual(second);
    expect(first.refs.added).toBe('graph-copilot:candidate%2Fa:node:0~1');
    const graph = expectGraph(first);
    expect(graph.edges.at(-1)).toMatchObject({
      id: 'graph-copilot:candidate%2Fa:edge:1',
      source: first.refs.added,
      sourceHandle: 'trigger',
      targetHandle: '__trigger',
      type: 'trigger',
    });
    expect(encodeCandidateGraphJson(graph)).toBe(encodeCandidateGraphJson(expectGraph(second)));
  });

  it('replaces unresolved secrets with blanks and returns a blocked, secret-free preview', () => {
    const secretGraph: PortableGraphV1 = {
      ...baseline(),
      nodes: baseline().nodes.map((node, index) => index === 0
        ? {
            ...node,
            data: { params: { api_key: { $gcpSecretRef: 'source-api-key' } } },
          }
        : node),
    };
    const input = study([{
      op: 'set_params',
      node_id: 'sink',
      params: { token: { $gcpSecretRef: 'sink-token' } },
    }], secretGraph);

    const result = materializeStudyCandidate(input, 'candidate/a');
    expect(result.status).toBe('blocked');
    expect(result.sensitive).toBe(false);
    expect(result.missingSecretRefs).toEqual(['sink-token', 'source-api-key']);
    const graph = expectGraph(result);
    expect(graph.nodes[0].data.params).toEqual({ api_key: '' });
    expect(graph.nodes[1].data.params).toEqual({ label: 'original', token: '' });
    const encoded = encodeCandidateGraphJson(graph);
    const bytes = new TextEncoder().encode(encoded);
    const decoded = new TextDecoder().decode(bytes);
    expect(decoded).not.toContain('$gcpSecretRef');
    expect(decoded).not.toContain('source-api-key');
    expect(decoded).not.toContain('sink-token');
    expect(decoded).not.toContain('formatVersion');
    expect(Object.keys(JSON.parse(decoded))).toEqual([
      'name', 'description', 'nodes', 'edges', 'presets', 'segmentGroups',
    ]);
  });

  it('uses provided secret bindings ephemerally without mutating bundle or bindings', () => {
    const secretGraph: PortableGraphV1 = {
      ...baseline(),
      nodes: baseline().nodes.map((node, index) => index === 0
        ? { ...node, data: { params: { api_key: { $gcpSecretRef: 'api-key' } } } }
        : node),
    };
    const input = study([], secretGraph);
    const before = JSON.stringify(input);
    const bindings = Object.freeze({ 'api-key': 'ephemeral-secret' });
    const result = materializeStudyCandidate(input, 'candidate/a', bindings);

    expect(result.status).toBe('ready');
    expect(result.sensitive).toBe(true);
    expect(result.missingSecretRefs).toEqual([]);
    expect(expectGraph(result).nodes[0].data.params).toEqual({ api_key: 'ephemeral-secret' });
    expect(result).not.toHaveProperty('secretBindings');
    expect(bindings['api-key']).toBe('ephemeral-secret');
    expect(JSON.stringify(input)).toBe(before);
    expect((input.payload.spec.baseline.nodes[0].data.params as any).api_key).toEqual({
      $gcpSecretRef: 'api-key',
    });
    expect(encodeCandidateGraphJson(expectGraph(result))).toContain('ephemeral-secret');
  });

  it('returns atomic errors for missing variants, nodes, edges, and malformed operations', () => {
    const missingVariant = materializeStudyCandidate(study([]), 'absent');
    expect(missingVariant).toMatchObject({ status: 'error', graph: null, refs: {} });
    expect(missingVariant.errors[0].code).toBe('VARIANT_NOT_FOUND');

    const unknownNode = materializeStudyCandidate(study([
      { op: 'add_node', node_type: 'Valid', ref: 'valid' },
      { op: 'set_params', node_id: 'ghost', params: { value: 1 } },
    ]), 'candidate/a');
    expect(unknownNode).toMatchObject({ status: 'error', graph: null, refs: {} });
    expect(unknownNode.errors[0]).toMatchObject({ code: 'UNKNOWN_NODE', operationIndex: 1 });

    const unknownEdge = materializeStudyCandidate(study([{
      op: 'remove_edge', source: 'sink', target: 'source',
    }]), 'candidate/a');
    expect(unknownEdge.errors[0].code).toBe('UNKNOWN_EDGE');

    const malformed = study([{ op: 'auto_layout' }]);
    (malformed.payload.spec.variants[0].operations as unknown as unknown[])[0] = {
      op: 'connect', source: 'source', target: 'sink', source_handle: 42, target_handle: 'in',
    };
    const malformedResult = materializeStudyCandidate(malformed, 'candidate/a');
    expect(malformedResult).toMatchObject({ status: 'error', graph: null });
    expect(malformedResult.errors[0].code).toBe('INVALID_OPERATION');
  });

  it('does not mutate the baseline or perform network, storage, DOM, or graph effects', () => {
    const fetchSpy = vi.fn();
    const webSocketSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    vi.stubGlobal('WebSocket', webSocketSpy);
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    const appendSpy = vi.spyOn(Node.prototype, 'appendChild');
    const graphApplySpy = vi.fn();
    vi.stubGlobal('CodefyUI', { graph: { applyOperations: graphApplySpy } });
    const input = study([{ op: 'set_params', node_id: 'source', params: { value: 99 } }]);
    const before = JSON.stringify(input.payload.spec.baseline);

    const result = materializeStudyCandidate(input, 'candidate/a');
    expect(result.status).toBe('ready');
    expect(JSON.stringify(input.payload.spec.baseline)).toBe(before);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(webSocketSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
    expect(appendSpy).not.toHaveBeenCalled();
    expect(graphApplySpy).not.toHaveBeenCalled();
  });

  it('refuses to encode an accidentally reintroduced SecretRef object', () => {
    const graph = expectGraph(materializeStudyCandidate(study([]), 'candidate/a'));
    graph.nodes[0].data.params = { api_key: { $gcpSecretRef: 'must-not-leak' } };
    expect(() => encodeCandidateGraphJson(graph)).toThrow('unresolved SecretRef');
  });
});
