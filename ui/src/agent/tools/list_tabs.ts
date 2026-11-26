import { LIST_LIMIT } from '../untrusted';
import { countNodes, hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';

export const listTabsTool: ToolDefinition = {
  name: 'list_tabs',
  description: 'List the editor\'s open tabs in tab-bar order: each tab\'s id, title, node and edge counts, whether it is the active tab, read-only, or transient (not kept after a reload). The host does not report unsaved changes, so this cannot say whether a tab is saved.',
  input_schema: { type: 'object', properties: {} },
  group: 'workspace',
  readOnly: true,
  available: hasWorkspace,
  async execute(_input, ctx) {
    const workspace = ctx.api.workspace!;
    const tabs = workspace.tabs().slice(0, LIST_LIMIT).map((tab) => {
      const snapshot = workspace.snapshot(tab.tabId);
      const graph = 'graph' in snapshot ? snapshot.graph : null;
      return {
        tab_id: tab.tabId, title: tab.title, active: tab.active, read_only: tab.readOnly, transient: tab.transient,
        ...(graph ? { node_count: countNodes(graph.nodes), edge_count: graph.edges.length } : {}),
        ...(tab.source ? { opened_by: tab.source.pluginId } : {}),
      };
    });
    return { content: JSON.stringify({ tabs, unsaved_state: 'not reported by this host' }), outcome: 'completed' };
  },
};
