import { hostError } from '../hostContext';
import { awaitWithSignal, isRecord, throwIfAborted } from '../toolGuards';
import { hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';

export const openExampleTool: ToolDefinition = {
  name: 'open_example',
  description: 'Open an example graph, by the path search_examples returned, in a new editor tab. The current canvas is not changed (inserting an example into it is not available). The tab is a copy the user can edit and save.',
  input_schema: {
    type: 'object',
    properties: { path: { type: 'string', description: 'The example path from search_examples.' } },
    required: ['path'],
  },
  group: 'example',
  readOnly: false,
  available: hasWorkspace,
  async execute(args, ctx) {
    const { api, signal } = ctx;
    const path = typeof args.path === 'string' ? args.path.trim() : '';
    if (!path) { ctx.fail('open_example needs the example "path" from search_examples.'); return; }
    // The host checks the path; it is passed as a query parameter.
    const response = await awaitWithSignal(api.http.fetch(`/api/examples/load?${new URLSearchParams({ path }).toString()}`, { signal }), signal);
    throwIfAborted(signal);
    if (!response.ok) { ctx.fail(`Example "${path}" could not be loaded: ${(await hostError(response)).message}`); return; }
    const graph: unknown = await awaitWithSignal(response.json(), signal);
    if (!isRecord(graph) || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) { ctx.fail(`Example "${path}" is not a graph document.`); return; }
    const title = typeof graph.name === 'string' && graph.name.trim() ? graph.name.trim() : path.split('/').at(-1)!;
    const [result] = api.workspace!.openGraphs([{
      title, graph: graph as never, persist: true, source: { kind: 'copilot-example', pluginId: api.pluginId, example: path },
    }], { activate: 'first' });
    if (!result || 'error' in result) { ctx.fail(`The editor did not open "${title}": ${result ? result.error : 'no answer'}`); return; }
    return { content: JSON.stringify({ opened: true, tab_id: result.tabId, title, example: path }), outcome: 'completed' };
  },
};
