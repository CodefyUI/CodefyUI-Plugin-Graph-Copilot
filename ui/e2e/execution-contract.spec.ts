import { test, expect, readyPreview } from './fixtures';

test('execution mock rejects every non-fixture socket, duplicate submission and mismatched graph', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const executionPath = '/execution.ts';
    const graphPath = '/graph.ts';
    const { createMockExecution, MOCK_EXECUTION_TOKEN } = await import(/* @vite-ignore */ executionPath) as typeof import('../preview/execution');
    const { initialGraph } = await import(/* @vite-ignore */ graphPath) as typeof import('../preview/graph');
    const blocked: string[] = [];
    const record = (reason: string) => { blocked.push(reason); };
    const host = createMockExecution(true, window.location.origin, initialGraph, () => {}, record);
    const local = `ws://${window.location.host}/ws/execution?token=${MOCK_EXECUTION_TOKEN}`;
    let rejected = 0;
    for (const url of [
      'wss://api.openai.com/ws/execution',
      local.replace('/ws/execution', '/ws/other'),
      local.replace(MOCK_EXECUTION_TOKEN, 'wrong-token'),
      `${local}&unexpected=1`,
    ]) {
      try { new host.WebSocket(url); } catch { rejected++; }
    }
    const disabled = createMockExecution(false, window.location.origin, initialGraph, () => {}, record);
    try { new disabled.WebSocket(local); } catch { rejected++; }

    const socket = new host.WebSocket(local);
    await new Promise<void>((resolve) => { socket.onopen = () => resolve(); });
    const graph = initialGraph();
    const submit = { action: 'execute', nodes: graph.nodes, edges: graph.edges, presets: [], device: 'cpu', record_outputs: false, weights_persistent: true };
    try { socket.send(JSON.stringify({ ...submit, nodes: [] })); } catch { rejected++; }
    socket.close();

    const clean = createMockExecution(true, window.location.origin, initialGraph, () => {}, record);
    const second = new clean.WebSocket(local);
    await new Promise<void>((resolve) => { second.onopen = () => resolve(); });
    second.send(JSON.stringify(submit));
    try { second.send(JSON.stringify(submit)); } catch { rejected++; }
    second.close();
    return { rejected, blocked, host: host.inspect(), clean: clean.inspect() };
  });
  expect(result.rejected).toBe(7);
  expect(result.blocked).toHaveLength(7);
  expect(result.host.executions).toHaveLength(1);
  expect(result.host.executions[0].messages).toEqual([]);
  expect(result.clean.executions).toHaveLength(1);
  expect(result.clean.executions[0].messages).toHaveLength(1);
  expect(result.clean.executionPending).toBe(0);
});

test('server-owned fixture journals host progress after socket close while legacy close ends its run', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const executionPath = '/execution.ts';
    const graphPath = '/graph.ts';
    const { createMockExecution, MOCK_EXECUTION_TOKEN, MOCK_RUN_ID } = await import(/* @vite-ignore */ executionPath) as typeof import('../preview/execution');
    const { initialGraph } = await import(/* @vite-ignore */ graphPath) as typeof import('../preview/graph');
    const local = `ws://${window.location.host}/ws/execution?token=${MOCK_EXECUTION_TOKEN}`;
    const graph = initialGraph();
    const submit = JSON.stringify({ action: 'execute', nodes: graph.nodes, edges: graph.edges, presets: [], device: 'cpu', record_outputs: false, weights_persistent: true });
    const blocked: string[] = [];
    const open = async (host: ReturnType<typeof createMockExecution>) => {
      const socket = new host.WebSocket(local);
      await new Promise<void>((resolve) => { socket.onopen = () => resolve(); });
      const firstEvent = new Promise<void>((resolve) => { socket.onmessage = () => resolve(); });
      socket.send(submit);
      await firstEvent;
      return socket;
    };
    const legacy = createMockExecution(true, window.location.origin, initialGraph, () => {}, (reason) => blocked.push(reason));
    const legacySocket = await open(legacy);
    legacySocket.close();
    const legacyCanRelease = legacy.releaseNext();

    const owned = createMockExecution(true, window.location.origin, initialGraph, () => {}, (reason) => blocked.push(reason), { serverOwned: true });
    const socket = await open(owned);
    socket.close();
    const detached = owned.inspect();
    const firstRelease = owned.releaseNext();
    const progress = owned.runEvents(MOCK_RUN_ID, 1, 500);
    const secondRelease = owned.releaseNext();
    const finalPage = owned.runEvents(MOCK_RUN_ID, 2, 500);
    const drained = owned.runEvents(MOCK_RUN_ID, finalPage!.cursor, 500);
    return { blocked, legacy: legacy.inspect(), legacyCanRelease, detached, firstRelease, secondRelease, progress, finalPage, drained, complete: owned.inspect() };
  });
  expect(result.blocked).toEqual([]);
  expect(result.legacyCanRelease).toBe(false);
  expect(result.legacy.executions[0]).toMatchObject({ status: 'closed', socketState: 'closed', serverOwned: false });
  expect(result.detached.executions[0]).toMatchObject({ status: 'running', socketState: 'closed', serverOwned: true });
  expect(result.detached.executionPending).toBe(1);
  expect(result.firstRelease).toBe(true);
  expect(result.secondRelease).toBe(true);
  expect(result.progress).toMatchObject({ status: 'running', cursor: 2, events: [{ cursor: 2, type: 'node_status', payload: { progress: { epoch: 2, loss: 0.25 } } }] });
  expect(result.finalPage?.status).toBe('succeeded');
  expect(result.finalPage?.events.at(-1)?.type).toBe('execution_complete');
  expect(result.drained).toMatchObject({ status: 'succeeded', events: [] });
  expect(result.complete.executions[0].status).toBe('complete');
  expect(result.complete.executions[0].emittedEvents).toEqual(['node_status']);
  expect(result.complete.executions[0].events).toHaveLength(7);
  expect(result.complete.executionPending).toBe(0);
});
