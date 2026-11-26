/** Read-only structural validation of the live canvas (`POST /api/graph/validate`). */
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { redactToolResultForContext } from './historyRedaction';
import { awaitWithSignal, comparisonSnapshot, isAbortError, isRecord, throwIfAborted } from './toolGuards';
import type { ValidationReport } from './types';

export type CurrentGraphValidation = ValidationReport & { valid: boolean };

/**
 * Read-only POST /api/graph/validate. Optional signal is checked before reads,
 * dispatch, and after every await; cancellation rejects with AbortError. A full,
 * ephemeral before/after snapshot guards against validating an outdated graph.
 * HTTP/transport/malformed responses mean unavailable, never graph invalidity.
 */
export async function validateCurrentGraph(api: CodefyUIPluginAPI, signal?: AbortSignal): Promise<CurrentGraphValidation> {
  throwIfAborted(signal);
  let changed = false;
  let unsubscribe: (() => void) | undefined;
  try { unsubscribe = api.graph.onGraphChanged(() => { changed = true; }); }
  catch { return { valid: false, status: 'unavailable', errors: ['Structural validation could not safely monitor the active graph.'] }; }
  try {
    throwIfAborted(signal);
    const graph = api.graph.getGraph();
    const before = comparisonSnapshot(graph);
    const definitions = api.graph.getNodeDefinitions();
    const nodes = graph.nodes.filter((node) => node.type !== 'note');
    const ids = new Set(nodes.map((node) => node.id));
    const edges = graph.edges.filter((edge) => typeof edge.source === 'string' && typeof edge.target === 'string' && ids.has(edge.source) && ids.has(edge.target));
    const body = JSON.stringify({ nodes, edges, presets: graph.presets ?? [] });
    let report: CurrentGraphValidation;
    try {
      throwIfAborted(signal);
      const response = await awaitWithSignal(api.http.fetch('/api/graph/validate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body, signal,
      }), signal);
      throwIfAborted(signal);
      if (!response.ok) {
        report = { valid: false, status: 'unavailable', errors: [`validate request failed: HTTP ${response.status}`] };
      } else {
        const data: unknown = await awaitWithSignal(response.json(), signal);
        throwIfAborted(signal);
        if (!isRecord(data) || typeof data.valid !== 'boolean' || !Array.isArray(data.errors) ||
          !data.errors.every((error) => typeof error === 'string') || (data.valid && data.errors.length > 0)) {
          report = { valid: false, status: 'unavailable', errors: ['Malformed validation response.'] };
        } else {
          report = { valid: data.valid, status: data.valid ? 'valid' : 'invalid', errors: data.errors.length || data.valid ? data.errors as string[] : ['Graph validation failed without diagnostic details.'] };
        }
      }
    } catch (error) {
      throwIfAborted(signal);
      if (isAbortError(error)) throw error;
      report = { valid: false, status: 'unavailable', errors: ['The structural validation service is unavailable.'] };
    }
    throwIfAborted(signal);
    let stable = false;
    try { stable = !changed && comparisonSnapshot(api.graph.getGraph()) === before; } catch { /* unreadable means stale */ }
    if (!stable) report = { valid: false, status: 'stale', errors: ['The graph changed while validation was in flight.'] };
    const safe = redactToolResultForContext({ id: 'validation-gate', name: 'validate_graph', arguments: {} }, JSON.stringify(report), api, [{ graph, definitions }]);
    throwIfAborted(signal);
    return JSON.parse(safe) as CurrentGraphValidation;
  } finally {
    try { unsubscribe?.(); } catch { /* listener cleanup is best effort */ }
  }
}
