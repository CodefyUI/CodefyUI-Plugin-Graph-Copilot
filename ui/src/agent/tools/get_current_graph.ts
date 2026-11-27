import { graphSnapshot } from '../prompt';
import { throwIfAborted } from '../toolGuards';
import type { ToolDefinition } from './types';

export const getCurrentGraphTool: ToolDefinition = {
  name: 'get_current_graph',
  description: 'Read the current serialized graph; the user may have edited it manually.',
  input_schema: { type: 'object', properties: {} },
  group: 'graph',
  readOnly: true,
  async execute(_input, ctx) {
    const content = graphSnapshot(ctx.api.graph.getGraph(), ctx.api.graph.getNodeDefinitions());
    throwIfAborted(ctx.signal);
    ctx.record(content, 'completed');
  },
};
