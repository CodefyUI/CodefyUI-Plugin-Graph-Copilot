/** P7 `save_graph`: save the active tab through the editor's own save path
 * (`workspace.saveGraph`, API v7), after the user approves a card. */
import { RunExit } from '../runExit';
import { awaitWithSignal, isRecord, throwIfAborted } from '../toolGuards';
import { AGENT_API_VERSION } from '../projectFiles';
import type { ToolDefinition, ToolEnvironment } from './types';

export const hasSaveGraph = (env: ToolEnvironment): boolean =>
  (env.api.apiVersion ?? 0) >= AGENT_API_VERSION && typeof env.api.workspace?.saveGraph === 'function';

/** The saved graph another name already uses, from `GET /api/graph/list`;
 * undefined when the list cannot be read (the host still refuses an overwrite). */
async function existingGraph(ctx: Parameters<ToolDefinition['execute']>[1], name: string, boundFile: string | null): Promise<string | null | undefined> {
  try {
    const response = await awaitWithSignal(ctx.api.http.fetch('/api/graph/list', ctx.signal ? { signal: ctx.signal } : undefined), ctx.signal);
    if (!response.ok) return undefined;
    const data: unknown = await awaitWithSignal(response.json(), ctx.signal);
    const rows = Array.isArray(data) ? data : isRecord(data) && Array.isArray(data.graphs) ? data.graphs : null;
    if (!rows) return undefined;
    const hit = rows.filter(isRecord).find((row) => (row.name === name || row.file === name) && row.file !== boundFile);
    return hit ? String(hit.name ?? hit.file) : null;
  } catch (error) {
    throwIfAborted(ctx.signal);
    return undefined;
  }
}

export const saveGraphTool: ToolDefinition = {
  name: 'save_graph',
  description: 'Save the ACTIVE editor tab as a saved graph, the way the editor\'s Save does, after the user approves a card. Without "name" a tab that is bound to a saved graph is saved in place; with a "name" that differs, it is saved under that name and the tab is bound to it (Save As). A tab that is not bound needs a name. Replacing another saved graph needs overwrite: true and its own warning card; ask the user first. After saving, project_status shows the change and project_commit can commit it.',
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'The saved graph\'s name. Leave out to save a bound tab in place.' },
      overwrite: { type: 'boolean', description: 'Replace a different saved graph with this name. Only when the user agreed.' },
    },
  },
  group: 'workspace',
  readOnly: false,
  available: hasSaveGraph,
  approval: () => ({ kind: 'save_graph' }),
  async execute(args, ctx) {
    const { api, signal } = ctx;
    const workspace = api.workspace!;
    const active = workspace.tabs().find((tab) => tab.active);
    if (!active) { ctx.fail('No tab is active, so there is nothing to save.'); return; }
    if (active.readOnly) { ctx.fail(`The tab "${active.title}" is read-only and cannot be saved.`); return; }
    const bound = active.savedGraph ?? null;
    const requested = typeof args.name === 'string' ? args.name.trim() : '';
    const name = requested || bound?.name || '';
    if (!name) { ctx.fail('This tab is not bound to a saved graph, so saving needs a "name". Ask the user what to call it.'); return; }
    const inPlace = !!bound && name === bound.name;
    let overwrites: string | null = null;
    if (!inPlace) {
      const existing = await existingGraph(ctx, name, bound?.file ?? null);
      throwIfAborted(signal);
      if (existing) {
        if (args.overwrite !== true) {
          ctx.fail(`A saved graph named "${existing}" already exists. Ask the user whether to replace it; only then call save_graph again with overwrite: true. Nothing was saved.`);
          return;
        }
        overwrites = existing;
      }
    }
    if (!ctx.canApprove('save_graph')) { ctx.fail('Saving requires an interactive user approval, but this client did not provide one.'); return; }
    ctx.phase('awaiting_confirmation');
    throwIfAborted(signal);
    const approved = await ctx.approve({ kind: 'save_graph', request: { action: 'save_graph', name, inPlace, overwrites, tab: active.title } });
    throwIfAborted(signal);
    if (!approved) {
      ctx.record(JSON.stringify({ cancelled: true, error: 'The user did not approve saving. Nothing was saved.' }), 'cancelled');
      throw new RunExit('cancelled', 'save_declined', 'Saving was not approved. Nothing was saved.');
    }
    ctx.phase('tools');
    const now = workspace.tabs().find((tab) => tab.active);
    if (!now || now.tabId !== active.tabId) {
      ctx.record(JSON.stringify({ cancelled: true, replan: true, error: 'The active tab changed while the approval was open. Nothing was saved.' }), 'cancelled');
      throw new RunExit('cancelled', 'save_stale', 'The active tab changed while the save card was open. Nothing was saved.');
    }
    ctx.dispatched();
    let result;
    try {
      result = await workspace.saveGraph!({ tabId: active.tabId, ...(inPlace ? {} : { name }), ...(overwrites ? { overwrite: true } : {}) });
    } catch (error) {
      return { content: JSON.stringify({ error: `The editor's save failed: ${String(error)}` }), outcome: 'error' };
    }
    if (!result.ok) {
      // The editor's own words; no retry under another name.
      return { content: JSON.stringify({ error: result.message, code: result.code, saved: false }), outcome: 'error' };
    }
    return {
      content: JSON.stringify({
        saved: true, name: result.name, file: result.file, created: result.created, tab_id: result.tabId,
        ...(overwrites ? { replaced: overwrites } : {}),
        note: 'Saved. In a git project, project_status now lists the file; commit it with project_commit only if the user asked.',
      }),
      outcome: 'completed',
    };
  },
};
