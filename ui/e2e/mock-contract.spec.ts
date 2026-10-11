import { test, expect, readyPreview, snapshot } from './fixtures';

test('strict mock rejects unexpected/provider URLs and serves only the four approved routes', async ({ page }) => {
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
    for (const url of ['https://api.openai.com/v1/chat/completions', '/api/llm/codex/login', '/api/graph/validate?unexpected=1']) {
      try { await host.fetch(url); } catch (error) { failures.push((error as Error).message); }
    }
    const models = await host.fetch('/api/llm/models', { method: 'POST', body: JSON.stringify({ provider: 'openai', api_key: 'mock-key' }) });
    const status = await host.fetch('/api/llm/codex/status');
    const validate = await host.fetch('/api/graph/validate', { method: 'POST', body: JSON.stringify(initialGraph()) });
    return { failures, blocked: host.inspect().blocked, models: await models.json(), status: await status.json(), validation: await validate.json() };
  });
  expect(result.failures).toHaveLength(3);
  expect(result.failures.every((message) => message.includes('Mock host blocked network'))).toBe(true);
  expect(result.blocked).toHaveLength(3);
  expect(result.models.models.map((model: { id: string }) => model.id)).toEqual(['mock-graph-model', 'mock-small-model']);
  expect(result.status).toEqual({ status: 'logged_out' });
  expect(result.validation).toEqual({ valid: true, errors: [] });
  // Isolated contract probes do not leak into the active plugin fixture.
  expect((await snapshot(page)).requests).toEqual([]);
  expect((await snapshot(page)).blocked).toEqual([]);
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
