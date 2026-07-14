import { describe, expect, it } from 'vitest';
import type {
  NodeDefinition,
  ParamDefinition,
  SerializedGraph,
} from '../types/codefyui';
import {
  MAX_OPTIMIZER_DOMAIN_VALUES,
  PARAMETER_OPTIMIZER_PRNG_VERSION,
  PARAMETER_OPTIMIZER_SCHEMA_VERSION,
  compileParameterOptimizer,
} from './optimizer';

function parameter(
  name: string,
  param_type: ParamDefinition['param_type'],
  defaultValue: unknown,
  patch: Partial<ParamDefinition> = {},
): ParamDefinition {
  return {
    name,
    param_type,
    default: defaultValue,
    description: '',
    options: [],
    min_value: null,
    max_value: null,
    ...patch,
  };
}

const MODEL_DEFINITION: NodeDefinition = {
  node_name: 'Model',
  category: 'Tests',
  description: '',
  inputs: [],
  outputs: [],
  params: [
    parameter('depth', 'int', 2, { min_value: 1, max_value: 5 }),
    parameter('learning_rate', 'float', 0.1, { min_value: 0, max_value: 1 }),
    parameter('enabled', 'bool', true),
    parameter('mode', 'select', 'a', { options: ['a', 'b', 'c'] }),
    parameter('label', 'string', 'model'),
    parameter('token', 'secret', ''),
    parameter('weights', 'model_file', ''),
    parameter('image', 'image_file', ''),
    parameter('tensor', 'tensor_grid', []),
  ],
};

const BASE_GRAPH: SerializedGraph = {
  nodes: [
    {
      id: 'model-a',
      type: 'Model',
      position: { x: 0, y: 0 },
      data: {
        params: {
          depth: 2,
          learning_rate: 0.1,
          enabled: true,
          mode: 'a',
          label: 'model',
          token: 'secret',
        },
      },
    },
    {
      id: 'model-b',
      type: 'Model',
      position: { x: 100, y: 0 },
      data: { params: { depth: 3, learning_rate: 0.2, enabled: false, mode: 'c' } },
    },
    { id: 'note', type: 'note', position: { x: 0, y: 100 }, data: { params: {} } },
  ],
  edges: [],
};

function input(patch: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    version: 1,
    strategy: 'grid',
    hypothesis: 'A controlled parameter change improves accuracy.',
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    bindings: [{ node_id: 'model-a', param: 'depth', values: [2, 3] }],
    include_baseline: true,
    repetitions: 1,
    concurrency: 1,
    apply_best: false,
    ...patch,
  };
}

describe('compileParameterOptimizer grid strategy', () => {
  it('uses stable Cartesian order and groups exact set_params operations per node', () => {
    const result = compileParameterOptimizer(input({
      include_baseline: false,
      bindings: [
        { node_id: 'model-a', param: 'depth', values: [3, 4] },
        { node_id: 'model-a', param: 'enabled', values: [false, true] },
        { node_id: 'model-b', param: 'mode', values: ['a', 'b'] },
      ],
    }), BASE_GRAPH, [MODEL_DEFINITION]);

    expect(result.request.variants).toHaveLength(8);
    expect(result.request.variants[0]).toEqual({
      id: 'optimizer-grid-001',
      label: 'Grid 1: model-a.depth=3, model-a.enabled=false, model-b.mode="a"',
      operations: [
        { op: 'set_params', node_id: 'model-a', params: { depth: 3, enabled: false } },
        { op: 'set_params', node_id: 'model-b', params: { mode: 'a' } },
      ],
    });
    expect(result.metadata.assignments.map((assignment) =>
      assignment.values.map((value) => value.value))).toEqual([
      [3, false, 'a'],
      [3, false, 'b'],
      [3, true, 'a'],
      [3, true, 'b'],
      [4, false, 'a'],
      [4, false, 'b'],
      [4, true, 'a'],
      [4, true, 'b'],
    ]);
    expect(result.request.variants.flatMap((variant) => variant.operations)
      .every((operation) => operation.op === 'set_params')).toBe(true);
  });

  it('adds one baseline and removes the Cartesian assignment equal to the live graph', () => {
    const result = compileParameterOptimizer(input(), BASE_GRAPH, [MODEL_DEFINITION]);

    expect(result.request.variants).toEqual([
      { id: 'baseline', label: 'Baseline', operations: [] },
      {
        id: 'optimizer-grid-001',
        label: 'Grid 1: model-a.depth=3',
        operations: [{ op: 'set_params', node_id: 'model-a', params: { depth: 3 } }],
      },
    ]);
    expect(result.metadata).toMatchObject({
      schemaVersion: PARAMETER_OPTIMIZER_SCHEMA_VERSION,
      strategy: 'grid',
      includesBaseline: true,
      totalDomainAssignments: 2,
      baselineAssignmentExcluded: true,
      generatedCandidateCount: 1,
      totalVariantCount: 2,
      totalExecutionCount: 2,
    });
    expect(result.metadata.prngVersion).toBeUndefined();
    expect(result.metadata.plannerSeed).toBeUndefined();
  });

  it('rejects an oversized Cartesian product instead of truncating it', () => {
    expect(() => compileParameterOptimizer(input({
      bindings: [
        { node_id: 'model-a', param: 'depth', values: [2, 3] },
        { node_id: 'model-a', param: 'enabled', values: [false, true] },
        { node_id: 'model-b', param: 'mode', values: ['a', 'b'] },
      ],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/8 changed assignments but only 7 candidate slots.*instead of truncating/i);
  });

  it('uses all eight variant slots when the Cartesian product contains the explicit baseline', () => {
    const result = compileParameterOptimizer(input({
      bindings: [
        { node_id: 'model-a', param: 'depth', values: [2, 3] },
        { node_id: 'model-a', param: 'enabled', values: [false, true] },
        { node_id: 'model-a', param: 'mode', values: ['a', 'b'] },
      ],
    }), BASE_GRAPH, [MODEL_DEFINITION]);

    expect(result.request.variants).toHaveLength(8);
    expect(result.request.variants[0].id).toBe('baseline');
    expect(result.metadata.totalDomainAssignments).toBe(8);
    expect(result.metadata.generatedCandidateCount).toBe(7);
    expect(result.metadata.baselineAssignmentExcluded).toBe(true);
  });

  it('rejects random-only fields and a search space containing only the baseline', () => {
    expect(() => compileParameterOptimizer(input({ seed: 1 }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/seed is only allowed/i);
    expect(() => compileParameterOptimizer(input({ candidate_count: 1 }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/candidate_count is only allowed/i);
    expect(() => compileParameterOptimizer(input({
      include_baseline: false,
      bindings: [{ node_id: 'model-a', param: 'depth', values: [2] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/no assignment different from.*baseline/i);
  });
});

describe('compileParameterOptimizer seeded_random strategy', () => {
  const randomInput = () => input({
    strategy: 'seeded_random',
    seed: 123456789,
    candidate_count: 7,
    bindings: [
      { node_id: 'model-a', param: 'depth', values: [1, 2, 3, 4, 5] },
      { node_id: 'model-a', param: 'enabled', values: [false, true] },
    ],
  });

  it('is reproducible, versioned, unique, and excludes the baseline assignment', () => {
    const first = compileParameterOptimizer(randomInput(), BASE_GRAPH, [MODEL_DEFINITION]);
    const second = compileParameterOptimizer(randomInput(), BASE_GRAPH, [MODEL_DEFINITION]);

    expect(second).toEqual(first);
    expect(first.request.variants).toHaveLength(8);
    expect(first.metadata.assignments.map((assignment) => assignment.domainIndex)).toEqual([9, 8, 5, 7, 0, 6, 2]);
    expect(new Set(first.metadata.assignments.map((assignment) => assignment.domainIndex)).size).toBe(7);
    expect(first.metadata.assignments.map((assignment) => assignment.domainIndex)).not.toContain(3);
    expect(first.metadata).toMatchObject({
      prngVersion: PARAMETER_OPTIMIZER_PRNG_VERSION,
      plannerSeed: 123456789,
      generatedCandidateCount: 7,
      totalVariantCount: 8,
      totalExecutionCount: 8,
    });
    expect(first.metadata.seedDescription).toMatch(/planner-only.*does not seed graph nodes/i);
  });

  it('changes sampled assignments when the planner seed changes', () => {
    const first = compileParameterOptimizer(randomInput(), BASE_GRAPH, [MODEL_DEFINITION]);
    const second = compileParameterOptimizer({ ...randomInput(), seed: 987654321 }, BASE_GRAPH, [MODEL_DEFINITION]);
    expect(second.metadata.assignments.map((assignment) => assignment.domainIndex))
      .not.toEqual(first.metadata.assignments.map((assignment) => assignment.domainIndex));
  });

  it('rejects missing/invalid uint32 seeds and invalid candidate counts', () => {
    for (const seed of [undefined, -1, 1.5, 0x1_0000_0000, '1']) {
      expect(() => compileParameterOptimizer({ ...randomInput(), seed }, BASE_GRAPH, [MODEL_DEFINITION]))
        .toThrow(/seed.*uint32/i);
    }
    for (const candidate_count of [undefined, 0, 1.5, 8, '2']) {
      expect(() => compileParameterOptimizer(
        { ...randomInput(), candidate_count }, BASE_GRAPH, [MODEL_DEFINITION],
      )).toThrow(/candidate_count/i);
    }
  });

  it('fails explicitly when too few changed assignments exist', () => {
    expect(() => compileParameterOptimizer(input({
      strategy: 'seeded_random',
      seed: 0,
      candidate_count: 1,
      bindings: [{ node_id: 'model-a', param: 'enabled', values: [true] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/only 0 are available/i);

    expect(() => compileParameterOptimizer(input({
      strategy: 'seeded_random',
      seed: 0xFFFF_FFFF,
      candidate_count: 2,
      include_baseline: false,
      bindings: [{ node_id: 'model-a', param: 'enabled', values: [false, true] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/only 1 (?:is|are) available/i);
  });

  it('accepts the full uint32 seed range including zero', () => {
    for (const seed of [0, 0xFFFF_FFFF]) {
      const result = compileParameterOptimizer(input({
        strategy: 'seeded_random',
        seed,
        candidate_count: 1,
        bindings: [{ node_id: 'model-a', param: 'depth', values: [2, 3] }],
      }), BASE_GRAPH, [MODEL_DEFINITION]);
      expect(result.metadata.plannerSeed).toBe(seed);
    }
  });
});

describe('compileParameterOptimizer request validation', () => {
  it('strictly rejects malformed objects and unknown fields at every level', () => {
    for (const malformed of [null, [], 'grid']) {
      expect(() => compileParameterOptimizer(malformed, BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/must be an object/i);
    }
    expect(() => compileParameterOptimizer(input({ extra: true }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/unknown field.*extra/i);
    expect(() => compileParameterOptimizer(input({
      objective: { metric: 'x', direction: 'maximize', extra: true },
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/objective contains unknown field/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'depth', values: [2, 3], extra: true }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/bindings\[0\] contains unknown field/i);
  });

  it('validates schema version, strategy, hypothesis, and objective without coercion', () => {
    expect(() => compileParameterOptimizer(input({ version: 2 }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/version must be 1/i);
    expect(() => compileParameterOptimizer(input({ strategy: 'random' }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/grid or seeded_random/i);
    for (const hypothesis of ['', 3]) {
      expect(() => compileParameterOptimizer(input({ hypothesis }), BASE_GRAPH, [MODEL_DEFINITION]))
        .toThrow(/hypothesis.*non-empty string/i);
    }
    expect(() => compileParameterOptimizer(input({ objective: null }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/objective must be an object/i);
    expect(() => compileParameterOptimizer(input({ objective: { metric: '', direction: 'maximize' } }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/metric.*non-empty string/i);
    expect(() => compileParameterOptimizer(input({ objective: { metric: 'x', direction: 'up' } }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/direction must be maximize or minimize/i);
  });

  it('requires 1..4 unique node-parameter bindings', () => {
    expect(() => compileParameterOptimizer(input({ bindings: [] }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/1 to 4 bindings/i);
    expect(() => compileParameterOptimizer(input({
      bindings: Array.from({ length: 5 }, (_, index) => ({
        node_id: 'model-a', param: 'depth', values: [index + 1],
      })),
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/1 to 4 bindings/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [
        { node_id: 'model-a', param: 'depth', values: [2, 3] },
        { node_id: 'model-a', param: 'depth', values: [3, 4] },
      ],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/must not repeat/i);
  });

  it('requires an existing typed node and an unambiguous definition/parameter', () => {
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'missing', param: 'depth', values: [2, 3] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/missing node/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'note', param: 'depth', values: [2, 3] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/no optimizable node type/i);
    expect(() => compileParameterOptimizer(input(), {
      ...BASE_GRAPH,
      nodes: [BASE_GRAPH.nodes[0], { ...BASE_GRAPH.nodes[0] }],
    }, [MODEL_DEFINITION])).toThrow(/ambiguous duplicate node id/i);
    expect(() => compileParameterOptimizer(input(), BASE_GRAPH, [])).toThrow(/no definition/i);
    expect(() => compileParameterOptimizer(input(), BASE_GRAPH, [MODEL_DEFINITION, MODEL_DEFINITION]))
      .toThrow(/duplicate definitions/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'missing', values: [1] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/unknown parameter/i);
    expect(() => compileParameterOptimizer(input(), BASE_GRAPH, [{
      ...MODEL_DEFINITION,
      params: [...MODEL_DEFINITION.params, parameter('depth', 'int', 2)],
    }])).toThrow(/ambiguous duplicate parameter/i);
  });

  it.each(['string', 'secret', 'model_file', 'image_file', 'tensor_grid'] as const)(
    'rejects unsupported %s parameter bindings',
    (paramType) => {
      const name = {
        string: 'label', secret: 'token', model_file: 'weights', image_file: 'image', tensor_grid: 'tensor',
      }[paramType];
      expect(() => compileParameterOptimizer(input({
        bindings: [{ node_id: 'model-a', param: name, values: ['x'] }],
      }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/unsupported type/i);
    },
  );

  it.each(['api_key', 'serviceToken', 'client-secret', 'workspace credentials'])(
    'rejects credential-shaped %s bindings even when the schema declares a supported type',
    (name) => {
      const definition: NodeDefinition = {
        ...MODEL_DEFINITION,
        params: [
          ...MODEL_DEFINITION.params.filter((candidate) => candidate.name !== name),
          parameter(name, 'select', 'credential-a', { options: ['credential-a', 'credential-b'] }),
        ],
      };
      const graph: SerializedGraph = {
        ...BASE_GRAPH,
        nodes: BASE_GRAPH.nodes.map((node) => node.id !== 'model-a'
          ? node
          : {
            ...node,
            data: { ...node.data, params: { ...node.data?.params, [name]: 'credential-a' } },
          }),
      };

      expect(() => compileParameterOptimizer(input({
        bindings: [{ node_id: 'model-a', param: name, values: ['credential-a', 'credential-b'] }],
      }), graph, [definition])).toThrow(/credential-shaped name.*cannot be optimized/i);
    },
  );

  it('rejects unknown runtime parameter types', () => {
    const definition = {
      ...MODEL_DEFINITION,
      params: [parameter('mystery', 'mystery' as ParamDefinition['param_type'], 1)],
    };
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'mystery', values: [1] }],
    }), BASE_GRAPH, [definition])).toThrow(/unsupported type 'mystery'/i);
  });

  it('requires explicit, bounded, unique scalar domains', () => {
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'depth', values: [] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/non-empty explicit domain/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{
        node_id: 'model-a', param: 'depth',
        values: Array.from({ length: MAX_OPTIMIZER_DOMAIN_VALUES + 1 }, (_, index) => index + 1),
      }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/at most 32 values/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'depth', values: [2, 2] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/unique scalar values/i);
    expect(() => compileParameterOptimizer(input({
      bindings: [{ node_id: 'model-a', param: 'depth', values: [{ value: 2 }] }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/finite integer/i);
  });

  it('enforces integer/float/bool/select types, numeric bounds, and select options', () => {
    const cases = [
      { param: 'depth', values: [2.5], message: /finite integer/i },
      { param: 'depth', values: [6], message: /must be <= 5/i },
      { param: 'learning_rate', values: [Number.NaN], message: /finite number/i },
      { param: 'learning_rate', values: [-0.1], message: /must be >= 0/i },
      { param: 'enabled', values: [1], message: /must be a boolean/i },
      { param: 'mode', values: ['unknown'], message: /must be one of: a, b, c/i },
    ];
    for (const testCase of cases) {
      expect(() => compileParameterOptimizer(input({
        bindings: [{ node_id: 'model-a', param: testCase.param, values: testCase.values }],
      }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(testCase.message);
    }
  });

  it('refuses an invalid current baseline value instead of hiding it', () => {
    const graph = structuredClone(BASE_GRAPH);
    graph.nodes[0].data!.params!.depth = 99;
    expect(() => compileParameterOptimizer(input(), graph, [MODEL_DEFINITION]))
      .toThrow(/baseline value must be <= 5/i);
  });

  it('strictly validates repetitions, concurrency, baseline, and promotion flags', () => {
    for (const repetitions of [0, 6, 1.5, '1']) {
      expect(() => compileParameterOptimizer(input({ repetitions }), BASE_GRAPH, [MODEL_DEFINITION]))
        .toThrow(/repetitions.*integer from 1 to 5/i);
    }
    for (const concurrency of [0, 3, 1.5, '1']) {
      expect(() => compileParameterOptimizer(input({ concurrency }), BASE_GRAPH, [MODEL_DEFINITION]))
        .toThrow(/concurrency.*integer from 1 to 2/i);
    }
    expect(() => compileParameterOptimizer(input({ include_baseline: 1 }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/include_baseline must be a boolean/i);
    expect(() => compileParameterOptimizer(input({ apply_best: 'false' }), BASE_GRAPH, [MODEL_DEFINITION]))
      .toThrow(/apply_best must be a boolean/i);
  });

  it('enforces the 16-run budget after baseline deduplication', () => {
    const allowed = compileParameterOptimizer(input({
      include_baseline: false,
      repetitions: 2,
      bindings: [
        { node_id: 'model-a', param: 'depth', values: [1, 2, 3, 4] },
        { node_id: 'model-a', param: 'enabled', values: [false, true] },
      ],
    }), BASE_GRAPH, [MODEL_DEFINITION]);
    expect(allowed.request.variants).toHaveLength(7); // one unchanged assignment was removed
    expect(allowed.metadata.totalExecutionCount).toBe(14);

    expect(() => compileParameterOptimizer(input({
      include_baseline: false,
      repetitions: 3,
      bindings: [{
        node_id: 'model-a',
        param: 'learning_rate',
        values: [0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      }],
    }), BASE_GRAPH, [MODEL_DEFINITION])).toThrow(/6 variants x 3 repetitions = 18/);
  });

  it('preserves minimize/apply options and defaults optional execution fields', () => {
    const raw = {
      strategy: 'grid',
      hypothesis: 'Lower loss.',
      objective: { metric: 'Loss.loss', direction: 'minimize' },
      bindings: [{ node_id: 'model-a', param: 'learning_rate', values: [0.2] }],
      include_baseline: false,
      apply_best: true,
    };
    const result = compileParameterOptimizer(raw, BASE_GRAPH, [MODEL_DEFINITION]);
    expect(result.request).toMatchObject({
      hypothesis: 'Lower loss.',
      objective: { metric: 'Loss.loss', direction: 'minimize' },
      repetitions: 1,
      concurrency: 1,
      apply_best: true,
    });
  });

  it('does not mutate frozen caller input, graph, or definitions', () => {
    const raw = input({
      include_baseline: false,
      bindings: [{ node_id: 'model-a', param: 'mode', values: ['b', 'c'] }],
    });
    const beforeInput = JSON.stringify(raw);
    const beforeGraph = JSON.stringify(BASE_GRAPH);
    const beforeDefinitions = JSON.stringify([MODEL_DEFINITION]);
    compileParameterOptimizer(Object.freeze(raw), BASE_GRAPH, [MODEL_DEFINITION]);
    expect(JSON.stringify(raw)).toBe(beforeInput);
    expect(JSON.stringify(BASE_GRAPH)).toBe(beforeGraph);
    expect(JSON.stringify([MODEL_DEFINITION])).toBe(beforeDefinitions);
  });
});
