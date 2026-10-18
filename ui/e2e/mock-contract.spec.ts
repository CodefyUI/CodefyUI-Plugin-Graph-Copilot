import { test, expect, readyPreview, snapshot, actionRequests } from './fixtures';

test('strict mock rejects unexpected/provider URLs and serves only explicitly approved host routes', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const httpPath = '/http.ts';
    const graphPath = '/graph.ts';
    const scenariosPath = '/scenarios.ts';
    const { createMockHttp } = await import(/* @vite-ignore */ httpPath) as typeof import('../preview/http');
    const { initialGraph } = await import(/* @vite-ignore */ graphPath) as typeof import('../preview/graph');
    const { scenarioById } = await import(/* @vite-ignore */ scenariosPath) as typeof import('../preview/scenarios');
    const host = createMockHttp(scenarioById('ask'), false, initialGraph, () => {});
    const failures: string[] = [];
    for (const url of ['https://api.openai.com/v1/chat/completions', '/api/llm/codex/login', '/api/graph/validate?unexpected=1', '/api/runs?limit=51', '/api/runs?limit=1&unexpected=1', '/api/runs/real-run-id', '/api/runs/mock-history-run/cancel', '/api/auth/bootstrap', '/api/system/devices?unexpected=1']) {
      try { await host.fetch(url); } catch (error) { failures.push((error as Error).message); }
    }
    const models = await host.fetch('/api/llm/models', { method: 'POST', body: JSON.stringify({ provider: 'openai', api_key: 'mock-key' }) });
    const status = await host.fetch('/api/llm/codex/status');
    const validate = await host.fetch('/api/graph/validate', { method: 'POST', body: JSON.stringify(initialGraph()) });
    return { failures, blocked: host.inspect().blocked, models: await models.json(), status: await status.json(), validation: await validate.json() };
  });
  expect(result.failures).toHaveLength(9);
  expect(result.failures.every((message) => message.includes('Mock host blocked network'))).toBe(true);
  expect(result.blocked).toHaveLength(9);
  expect(result.models.models.map((model: { id: string }) => model.id)).toEqual(['mock-graph-model', 'mock-small-model']);
  expect(result.status).toEqual({ status: 'logged_out' });
  expect(result.validation).toEqual({ valid: true, errors: [] });
  // Isolated contract probes do not leak into the active plugin fixture.
  expect(actionRequests(await snapshot(page))).toEqual([]);
  expect((await snapshot(page)).blocked).toEqual([]);
});

test('server-owned events and cancellation accept only bounded exact fake-run routes', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const httpPath = '/http.ts';
    const executionPath = '/execution.ts';
    const graphPath = '/graph.ts';
    const scenariosPath = '/scenarios.ts';
    const { createMockHttp } = await import(/* @vite-ignore */ httpPath) as typeof import('../preview/http');
    const { createMockExecution, MOCK_EXECUTION_TOKEN } = await import(/* @vite-ignore */ executionPath) as typeof import('../preview/execution');
    const { initialGraph } = await import(/* @vite-ignore */ graphPath) as typeof import('../preview/graph');
    const { scenarioById } = await import(/* @vite-ignore */ scenariosPath) as typeof import('../preview/scenarios');
    const execution = createMockExecution(true, window.location.origin, initialGraph, () => {}, () => {}, { serverOwned: true });
    const host = createMockHttp(scenarioById('native-run'), false, initialGraph, () => {}, execution.runRows, { execution });
    const legacy = createMockHttp(scenarioById('native-run'), false, initialGraph, () => {});
    const ask = createMockHttp(scenarioById('ask'), false, initialGraph, () => {}, execution.runRows, { execution });
    const eventURL = '/api/runs/mock-native-run/events?cursor=0&wait=25&limit=500';
    const failures: string[] = [];
    const invalid: Array<[string, RequestInit?]> = [
      ['/api/runs/real-run-id/events?cursor=0&wait=25&limit=500'],
      ['/api/runs/mock-history-run/events?cursor=0&wait=25&limit=500'],
      [eventURL.replace('cursor=0', 'cursor=-1')],
      [eventURL.replace('cursor=0', 'cursor=00')],
      [eventURL.replace('cursor=0', 'cursor=1000000')],
      [eventURL.replace('wait=25', 'wait=26')],
      [eventURL.replace('limit=500', 'limit=501')],
      [eventURL.replace('limit=500', 'limit=0')],
      [eventURL.replace('&wait=25', '')],
      [`${eventURL}&unexpected=1`],
      [`${eventURL}&cursor=1`],
      [eventURL, { method: 'POST' }],
      [eventURL, { body: '{}' }],
      ['/api/runs/real-run-id/cancel', { method: 'POST' }],
      ['/api/runs/mock-history-run/cancel', { method: 'POST' }],
      ['/api/runs/mock-native-run/cancel'],
      ['/api/runs/mock-native-run/cancel?unexpected=1', { method: 'POST' }],
      ['/api/runs/mock-native-run/cancel', { method: 'POST', body: '{}' }],
    ];
    for (const [url, init] of invalid) {
      try { await host.fetch(url, init); } catch (error) { failures.push((error as Error).message); }
    }
    let scopedRejections = 0;
    for (const disabled of [legacy, ask]) {
      for (const [url, init] of [[eventURL, undefined], ['/api/runs/mock-native-run/cancel', { method: 'POST' }]] as const) {
        try { await disabled.fetch(url, init); } catch { scopedRejections++; }
      }
    }
    const legacyProbe = await legacy.fetch('/api/runs?limit=1');
    const currentProbe = await host.fetch('/api/runs?limit=1');
    const socket = new execution.WebSocket(`ws://${window.location.host}/ws/execution?token=${MOCK_EXECUTION_TOKEN}`);
    await new Promise<void>((resolve) => { socket.onopen = () => resolve(); });
    const graph = initialGraph();
    const firstEvent = new Promise<void>((resolve) => { socket.onmessage = () => resolve(); });
    socket.send(JSON.stringify({ action: 'execute', nodes: graph.nodes, edges: graph.edges, presets: [], device: 'cpu', record_outputs: false, weights_persistent: true }));
    await firstEvent;
    socket.close();
    const replay = await (await host.fetch(eventURL)).json();
    const waitingURL = `/api/runs/mock-native-run/events?cursor=${replay.cursor}&wait=25&limit=500`;
    const controller = new AbortController();
    const abortedPoll = host.fetch(waitingURL, { signal: controller.signal });
    const pollBeforeAbort = host.inspect().runEventPolls;
    controller.abort();
    let abortName = '';
    try { await abortedPoll; } catch (error) { abortName = (error as Error).name; }
    const waiting = host.fetch(waitingURL);
    const pollBeforeRelease = host.inspect().runEventPolls;
    execution.releaseNext();
    const progress = await (await waiting).json();
    const terminalPoll = host.fetch(`/api/runs/mock-native-run/events?cursor=${progress.cursor}&wait=25&limit=500`);
    const cancelled = await host.fetch('/api/runs/mock-native-run/cancel', { method: 'POST' });
    const terminal = await (await terminalPoll).json();
    const drained = await (await host.fetch(`/api/runs/mock-native-run/events?cursor=${terminal.cursor}&wait=25&limit=500`)).json();
    return {
      failures, blocked: host.inspect().blocked, scopedRejections, legacyProbe: legacyProbe.status, currentProbe: currentProbe.status,
      replay, pollBeforeAbort, abortName, pollBeforeRelease, progress, cancelStatus: cancelled.status, terminal, drained,
      host: host.inspect(), execution: execution.inspect(),
    };
  });
  expect(result.failures).toHaveLength(18);
  expect(result.failures.every((message) => message.includes('Mock host blocked network'))).toBe(true);
  expect(result.blocked).toHaveLength(18);
  expect(result.scopedRejections).toBe(4);
  expect(result.legacyProbe).toBe(404);
  expect(result.currentProbe).toBe(200);
  expect(result.replay).toMatchObject({ status: 'running', cursor: 1, events: [{ cursor: 1, type: 'node_status' }] });
  expect(result.pollBeforeAbort).toHaveLength(1);
  expect(result.abortName).toBe('AbortError');
  expect(result.pollBeforeRelease).toHaveLength(1);
  expect(result.progress).toMatchObject({ status: 'running', cursor: 2, events: [{ cursor: 2, payload: { progress: { epoch: 2, loss: 0.25 } } }] });
  expect(result.cancelStatus).toBe(200);
  expect(result.terminal).toMatchObject({ status: 'cancelled', events: [{ type: 'execution_stopped' }] });
  expect(result.drained).toMatchObject({ status: 'cancelled', events: [] });
  expect(result.host.runEventPolls).toEqual([]);
  expect(result.host.pending).toEqual([]);
  expect(result.host.requests.filter((request) => request.status === 'aborted')).toHaveLength(1);
  expect(result.execution.executions[0]).toMatchObject({ status: 'cancelled', socketState: 'closed' });
  expect(result.execution.executions[0].messages.map((message) => message.action)).toEqual(['execute']);
  expect(result.execution.executionPending).toBe(0);
});

test('manual response control and live stream honor abort without timers', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const httpPath = '/http.ts';
    const graphPath = '/graph.ts';
    const scenariosPath = '/scenarios.ts';
    const { createMockHttp } = await import(/* @vite-ignore */ httpPath) as typeof import('../preview/http');
    const { initialGraph } = await import(/* @vite-ignore */ graphPath) as typeof import('../preview/graph');
    const { scenarioById } = await import(/* @vite-ignore */ scenariosPath) as typeof import('../preview/scenarios');
    const body = JSON.stringify({ provider: 'openai', model: 'mock-graph-model', messages: [{ role: 'user', content: 'test' }] });
    const waiting = createMockHttp(scenarioById('ask'), true, initialGraph, () => {});
    const beforeRelease = new AbortController();
    const request = waiting.fetch('/api/llm/chat', { method: 'POST', body, signal: beforeRelease.signal });
    const pendingBefore = waiting.inspect().pending;
    beforeRelease.abort();
    let fetchError = '';
    try { await request; } catch (error) { fetchError = (error as Error).name; }

    const streaming = createMockHttp(scenarioById('pending'), false, initialGraph, () => {});
    const afterHeaders = new AbortController();
    const response = await streaming.fetch('/api/llm/chat', { method: 'POST', body, signal: afterHeaders.signal });
    const reader = response.body!.getReader();
    const delta = await reader.read();
    afterHeaders.abort();
    let readError = '';
    try { await reader.read(); } catch (error) { readError = (error as Error).name; }
    return { pendingBefore, fetchError, readError, delta: new TextDecoder().decode(delta.value), waiting: waiting.inspect(), streaming: streaming.inspect() };
  });
  expect(result.pendingBefore).toHaveLength(1);
  expect(result.fetchError).toBe('AbortError');
  expect(result.readError).toBe('AbortError');
  expect(result.delta).toContain('text_delta');
  expect(result.waiting.pending).toEqual([]);
  expect(result.streaming.pending).toEqual([]);
  expect(result.waiting.requests[0].status).toBe('aborted');
  expect(result.streaming.requests[0].status).toBe('aborted');
});
