import { hostError } from '../hostContext';
import { awaitWithSignal, isRecord, throwIfAborted } from '../toolGuards';
import { hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';
import { pathSegment } from '../urlPath';
import { AGENT_API_VERSION } from '../projectFiles';

export const openGraphTool: ToolDefinition = {
  name: 'open_graph',
  description: 'Open a saved graph, by its name as the host lists it, in an editor tab. On CodefyUI 3.5.0 and later (API v7) the tab is bound to the saved graph, exactly as when the user opens it from the Graphs panel: an already open tab is switched to, and save_graph saves it in place. On older hosts the new tab is a copy (saving it is a Save As), and if a tab with that title is already open nothing is opened and the tab is named instead.',
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
    const workspace = api.workspace!;
    if ((api.apiVersion ?? 0) >= AGENT_API_VERSION && typeof workspace.openSavedGraph === 'function') {
      let opened;
      try { opened = await awaitWithSignal(workspace.openSavedGraph(name, { activate: true }), signal); }
      catch (error) { throwIfAborted(signal); ctx.fail(`The editor did not open "${name}": ${String(error)}`); return; }
      throwIfAborted(signal);
      if (!opened.ok) { ctx.fail(`Graph "${name}" could not be opened (${opened.code}): ${opened.message}`); return; }
      if (!opened.alreadyOpen) ctx.turn.openedTabs.add(opened.tabId);
      return { content: JSON.stringify({ opened: !opened.alreadyOpen, already_open: opened.alreadyOpen, tab_id: opened.tabId, title: name, bound_to_saved_graph: true, active: true }), outcome: 'completed' };
    }
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
