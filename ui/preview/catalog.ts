import type { NodeDefinition, ParamDefinition } from '../src/types/codefyui';

const batchSize: ParamDefinition = {
  name: 'batch_size', param_type: 'int', default: 16,
  description: 'Samples per batch.', options: [], min_value: 1, max_value: 128,
};

// Small but real v1 schemas; the agent must look up exact handles and params.
export const SAMPLE_CATALOG: NodeDefinition[] = [
  {
    node_name: 'Start', category: 'Control', description: 'Start the sample pipeline.',
    inputs: [], outputs: [{ name: 'trigger', data_type: 'TRIGGER', description: 'Start signal.', optional: false }],
    params: [],
  },
  {
    node_name: 'Dataset', category: 'Data', description: 'Load the in-memory sample image dataset.',
    inputs: [{ name: 'trigger', data_type: 'TRIGGER', description: 'Optional start signal.', optional: true }],
    outputs: [{ name: 'samples', data_type: 'TENSOR', description: 'Sample image tensor.', optional: false }],
    params: [batchSize],
  },
  {
    node_name: 'Normalize', category: 'Data', description: 'Normalize sample images before previewing.',
    inputs: [{ name: 'samples', data_type: 'TENSOR', description: 'Images to normalize.', optional: false }],
    outputs: [{ name: 'samples', data_type: 'TENSOR', description: 'Normalized images.', optional: false }],
    params: [{
      name: 'scale', param_type: 'float', default: 1,
      description: 'Sample intensity scale.', options: [], min_value: 0, max_value: 2,
    }],
  },
  {
    node_name: 'Preview', category: 'Output', description: 'Inspect sample images without running training.',
    inputs: [{ name: 'samples', data_type: 'TENSOR', description: 'Images to inspect.', optional: false }],
    outputs: [], params: [],
  },
];
