import { compactCatalog } from '../prompt';
import { throwIfAborted } from '../toolGuards';
import type { ToolDefinition } from './types';

export const getNodeSchemasTool: ToolDefinition = {
  name: 'get_node_schemas',
  description: 'Get exact ports, required/optional inputs, and params for catalog node types. Always look up schemas before wiring; the catalog index and research candidates are not port evidence.',
  input_schema: { type: 'object', properties: { node_types: { type: 'array', items: { type: 'string' } } }, required: ['node_types'] },
  group: 'graph',
  readOnly: true,
  async execute(args, ctx) {
    if (!Array.isArray(args.node_types) || !args.node_types.length ||
      !args.node_types.every((name) => typeof name === 'string' && !!name.trim())) {
      ctx.fail('node_types must be a non-empty array of exact catalog names.'); return;
    }
    const names = args.node_types as string[];
    const definitions = ctx.api.graph.getNodeDefinitions();
    throwIfAborted(ctx.signal);
    const byName = new Map(definitions.map((definition) => [definition.node_name, definition]));
    const found = names.map((name) => byName.get(name)).filter((definition): definition is NonNullable<typeof definition> => !!definition);
    const missing = names.filter((name) => !byName.has(name));
    let content = found.length ? compactCatalog(found) : '(no matching node types)';
    if (missing.length) content += `\n(unknown node types, not in catalog: ${missing.join(', ')})`;
    // An error outcome keeps the call as an uncorrected issue.
    return { content, outcome: missing.length ? 'error' : 'completed' };
  },
};
