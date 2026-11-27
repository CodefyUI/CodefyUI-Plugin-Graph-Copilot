import { hostError } from '../hostContext';
import { awaitWithSignal, isRecord, throwIfAborted } from '../toolGuards';
import { hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';
import { pathSegment } from '../urlPath';

export const openGraphTool: ToolDefinition = {
  name: 'open_graph',
  description: 'Open a saved graph, by its name as the host lists it, in a new editor tab. If a tab with that title is already open, nothing is opened and the tab is named instead (the editor cannot switch tabs for you; tell the user which tab). The new tab is a copy of the saved file: saving it is a Save As.',
  input_schema: {
    type: 'object',
    properties: { name: { type: 'string', description: 'The saved graph\'s name.' } },
    required: ['name'],
  },
  group: 'workspace',
  readOnly: false,
  available: hasWorkspace,
  async execute(args, ctx) {
    const { api, signal } = ctx;
    const name = typeof args.name === 'string' ? args.name.trim() : '';
    if (!name) { ctx.fail('open_graph needs the saved graph\'s "name".'); return; }
    const open = api.workspace!.tabs().find((tab) => tab.title === name);
    if (open) {
      return { content: JSON.stringify({ already_open: true, tab_id: open.tabId, title: open.title, active: open.active }), outcome: 'completed' };
    }
    let segment: string;
    try { segment = pathSegment(name); } catch { ctx.fail(`"${name.slice(0, 80)}" is not a saved graph name (no "/", "\\", "..", "?" or "#").`); return; }
    const response = await awaitWithSignal(api.http.fetch(`/api/graph/load/${segment}`, { signal }), signal);
    throwIfAborted(signal);
    if (!response.ok) { ctx.fail(`Graph "${name}" could not be loaded: ${(await hostError(response)).message}`); return; }
    const graph: unknown = await awaitWithSignal(response.json(), signal);
    if (!isRecord(graph) || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) { ctx.fail(`Graph "${name}" is not a graph document.`); return; }
    const [result] = api.workspace!.openGraphs([{
      title: name, graph: graph as never, persist: true, source: { kind: 'copilot-open-graph', pluginId: api.pluginId },
    }], { activate: 'first' });
    if (!result || 'error' in result) { ctx.fail(`The editor did not open "${name}": ${result ? result.error : 'no answer'}`); return; }
    ctx.turn.openedTabs.add(result.tabId);
    return { content: JSON.stringify({ opened: true, tab_id: result.tabId, title: name }), outcome: 'completed' };
  },
};
