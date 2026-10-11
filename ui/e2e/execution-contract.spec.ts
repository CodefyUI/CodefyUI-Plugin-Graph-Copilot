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
