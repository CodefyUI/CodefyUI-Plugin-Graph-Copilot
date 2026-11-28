import { LIST_LIMIT } from '../untrusted';
import { countNodes, hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';

export const listTabsTool: ToolDefinition = {
  name: 'list_tabs',
  description: 'List the editor\'s open tabs in tab-bar order: each tab\'s id, title, node and edge counts, whether it is the active tab, read-only, or transient (not kept after a reload). On CodefyUI 3.5.0 and later each tab also has "unsaved" (the tab bar\'s unsaved marker) and "saved_graph" (the saved graph it is bound to, or null). Older hosts do not report these.',
  input_schema: { type: 'object', properties: {} },
  group: 'workspace',
  readOnly: true,
  available: hasWorkspace,
  async execute(_input, ctx) {
    const workspace = ctx.api.workspace!;
    const all = workspace.tabs();
    const reported = all.some((tab) => typeof tab.unsaved === 'boolean');
    const tabs = all.slice(0, LIST_LIMIT).map((tab) => {
      const snapshot = workspace.snapshot(tab.tabId);
      const graph = 'graph' in snapshot ? snapshot.graph : null;
      return {
        tab_id: tab.tabId, title: tab.title, active: tab.active, read_only: tab.readOnly, transient: tab.transient,
        ...(graph ? { node_count: countNodes(graph.nodes), edge_count: graph.edges.length } : {}),
        ...(tab.source ? { opened_by: tab.source.pluginId } : {}),
        ...(typeof tab.unsaved === 'boolean' ? { unsaved: tab.unsaved } : {}),
        ...(tab.savedGraph !== undefined ? { saved_graph: tab.savedGraph ? { name: tab.savedGraph.name, file: tab.savedGraph.file } : null } : {}),
      };
    });
    return { content: JSON.stringify(reported ? { tabs } : { tabs, unsaved_state: 'not reported by this host' }), outcome: 'completed' };
  },
};
