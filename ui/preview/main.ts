import './host.css';
import type { CodefyUIPluginAPI } from '../src/types/codefyui';
import { createSampleGraph } from './graph';
import { createMockHttp } from './http';
import { createMockExecution } from './execution';
import { seededConversations } from './history';
import { LIGHT_HOST_TOKENS } from './hostTokens';
import { scenarioById, SCENARIOS } from './scenarios';
import type { PreviewSnapshot } from './types';

const params = new URLSearchParams(window.location.search);
const scenario = scenarioById(params.get('scenario'));
const manual = params.get('manual') === '1';
const bundle = params.get('bundle') === '1';
const lightTokens = params.get('tokens') === 'light';
if (lightTokens) {
  for (const [key, value] of Object.entries(LIGHT_HOST_TOKENS)) document.documentElement.style.setProperty(key, value);
}
const memory = new Map<string, string>([['settings', JSON.stringify({
  provider: 'openai',
  models: { openai: 'mock-graph-model' },
  apiKeys: { openai: 'mock-key-not-a-real-credential' },
  customBaseUrl: '',
})]]);
if (scenario.id === 'seed') memory.set('conversations', JSON.stringify(seededConversations()));
const widgets = new Map<string, HTMLElement>();
let ready = false;

const byId = <T extends HTMLElement>(id: string): T => {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing mock host element: ${id}`);
  return element as T;
};

const graph = createSampleGraph(render);
const execution = createMockExecution(scenario.id === 'native-run', window.location.origin, graph.getGraph, render, (reason) => http.recordBlocked(reason));
const http = createMockHttp(scenario, manual, graph.getGraph, render, execution.runRows);

function snapshot(): PreviewSnapshot {
  const graphState = graph.inspect();
  return {
    ready, scenario: scenario.id, entry: bundle ? 'bundle' : 'source', manual,
    ...graphState, ...http.inspect(), ...execution.inspect(),
    conversations: JSON.parse(memory.get('conversations') ?? '[]') as unknown[],
    widgets: [...widgets.keys()],
  };
}

function render(): void {
  const state = snapshot();
  byId('graph-counts').textContent = `${state.graph.nodes.length} nodes, ${state.graph.edges.length} edges. Revision ${state.revision}.`;
  byId('source-list').replaceChildren(...state.graph.nodes.map((node) => {
    const row = document.createElement('li');
    const name = document.createElement('strong');
    name.textContent = node.type;
    const source = document.createElement('code');
    source.textContent = ` ${node.id}`;
    const detail = document.createElement('div');
    const edges = state.graph.edges.filter((edge) => edge.source === node.id).map((edge) => `${edge.sourceHandle} → ${edge.target}.${edge.targetHandle}`);
    detail.textContent = `${JSON.stringify(node.data.params)}${edges.length ? `; ${edges.join('; ')}` : ''}`;
    row.append(name, source, detail);
    return row;
  }));
  if (!state.graph.nodes.length) {
    const empty = document.createElement('li');
    empty.textContent = 'No nodes in the sample graph.';
    byId('source-list').append(empty);
  }
  byId('operation-receipts').textContent = JSON.stringify(state.receipts, null, 2);
  byId<HTMLButtonElement>('release-response').disabled = state.pending.length === 0;
  byId<HTMLButtonElement>('release-execution').disabled = state.executionPending === 0;
  byId('execution-receipts').textContent = JSON.stringify(state.executions, null, 2);
  byId('network-state').textContent = `${state.requests.length} mock requests. ${state.pending.length} pending. ${state.requests.filter((request) => request.status === 'aborted').length} aborted. ${state.blocked.length} blocked.`;
  byId('fixture-state').textContent = ready ? 'Fixture ready.' : 'Loading plugin…';
}

const api: CodefyUIPluginAPI = {
  apiVersion: 1,
  pluginId: 'graph-copilot-preview',
  ui: {
    addFloatingWidget({ id }) {
      if (widgets.has(id)) throw new Error(`Mock host widget already exists: ${id}`);
      const container = document.createElement('div');
      container.dataset.widgetId = id;
      widgets.set(id, container);
      byId('plugin-widgets').append(container);
      return container;
    },
    toast(message) {
      const toast = byId('mock-toast');
      toast.textContent = `Mock host: ${message}`;
      toast.hidden = false;
    },
  },
  graph,
  http: { fetch: http.fetch },
  storage: {
    get: (key) => memory.get(key) ?? null,
    set(key, value) { memory.set(key, value); },
    remove(key) { memory.delete(key); },
  },
};

// Hard fail unexpected direct fetch/XHR/EventSource calls too. WebSocket is
// replaced with an in-memory mock, never forwarded. The only native network
// outside this mock is Vite's already initialized local HMR client.
const nativeFetch = window.fetch.bind(window);
const allowedOrigin = window.location.origin;
window.fetch = async (input, init) => {
  const raw = input instanceof Request ? input.url : String(input);
  const url = new URL(raw, allowedOrigin);
  // Used solely by Vite to reconnect to its own preview server. Never /api.
  if (url.origin === allowedOrigin && url.pathname === '/' && init?.headers && new Headers(init.headers).get('Accept') === 'text/x-vite-ping') return nativeFetch(input, init);
  const reason = `direct fetch ${url.origin === allowedOrigin ? url.pathname : url.origin}`;
  http.recordBlocked(reason);
  throw new Error(`Mock host blocked network: ${reason}`);
};
XMLHttpRequest.prototype.open = function (_method: string, url: string | URL) {
  const reason = `direct XMLHttpRequest ${String(url)}`;
  http.recordBlocked(reason);
  throw new Error(`Mock host blocked network: ${reason}`);
};
window.WebSocket = execution.WebSocket;
window.EventSource = new Proxy(window.EventSource, { construct() { http.recordBlocked('direct EventSource'); throw new Error('Mock host blocked direct EventSource'); } });
window.addEventListener('securitypolicyviolation', (event) => { http.recordBlocked(`CSP ${event.violatedDirective}`); });

window.__graphCopilotPreview = { snapshot, releaseNext: () => http.releaseNext(), releaseExecution: () => execution.releaseNext() };

const select = byId<HTMLSelectElement>('scenario-select');
select.replaceChildren(...SCENARIOS.map((candidate) => {
  const option = document.createElement('option');
  option.value = candidate.id;
  option.textContent = candidate.label;
  return option;
}));
select.value = scenario.id;
byId<HTMLInputElement>('manual-control').checked = manual;
byId('entry-label').textContent = `${bundle ? 'Existing frontend/index.js' : 'Development src/index.tsx'}${lightTokens ? ' (test light tokens)' : ''}`;
byId('suggested-prompt').textContent = `Use ${scenario.mode === 'ask' ? 'Ask' : 'Edit'} mode. Prompt: “${scenario.prompt}”`;
byId('scenario-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const next = new URLSearchParams(window.location.search);
  next.set('scenario', select.value);
  if (byId<HTMLInputElement>('manual-control').checked) next.set('manual', '1'); else next.delete('manual');
  window.location.search = next.toString();
});
byId('release-response').addEventListener('click', () => { http.releaseNext(); });
byId('release-execution').addEventListener('click', () => { execution.releaseNext(); });
render();

// Import the real plugin boundary, not individual components or a look-alike.
// ?bundle=1 uses the existing file; this harness never invokes a build.
try {
  const module = bundle
    ? await import(/* @vite-ignore */ __PREVIEW_BUNDLE_URL__)
    : await import('../src/index');
  if (typeof module.default !== 'function') throw new Error('Plugin entry has no default activate(api) function');
  module.default(api);
  ready = true;
  render();
} catch (error) {
  byId('fixture-state').textContent = `Fixture failed: ${(error as Error).message}`;
  byId('fixture-state').setAttribute('role', 'alert');
  console.error('Mock host activation failed', error);
}
