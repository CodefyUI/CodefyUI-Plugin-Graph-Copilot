import type { Page } from '@playwright/test';
import type { RunSummary } from '../src/agent/types';
import { MOCK_RUN_ID } from '../preview/execution';
import { test, expect, readyPreview, openCopilot, send, snapshot, capture, chatRequests } from './fixtures';

const workbench = (page: Page) => page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
const approval = (page: Page) => page.getByRole('dialog', { name: 'Run the current graph?', exact: true });

async function summary(page: Page): Promise<RunSummary | undefined> {
  const state = await snapshot(page);
  const conversation = state.conversations[0] as { messages?: Array<{ runSummary?: RunSummary }> } | undefined;
  return conversation?.messages?.filter((turn) => turn.runSummary).at(-1)?.runSummary;
}

async function terminal(page: Page, label: 'Completed' | 'Stopped' | 'Incomplete'): Promise<void> {
  await expect(workbench(page).getByRole('status').filter({ has: page.getByText(label, { exact: true }) }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
}

async function proposeRun(page: Page): Promise<void> {
  await readyPreview(page, 'scenario=native-run');
  await openCopilot(page);
  await send(page, 'Run my current sample graph on CPU after I approve.');
  await expect(approval(page)).toBeVisible();
  await expect(approval(page)).toContainText('3 nodes');
  await expect(approval(page)).toContainText('2 edges');
  await expect(approval(page)).toContainText('device cpu');
  await expect(approval(page).getByRole('button', { name: 'Cancel', exact: true })).toBeFocused();
  const state = await snapshot(page);
  expect(state.requests.some((request) => request.url === '/api/graph/validate' && request.status === 'complete')).toBe(true);
  expect(state.requests.filter((request) => request.url === '/api/auth/bootstrap')).toEqual([]);
  expect(state.executions).toEqual([]);
  expect(state.receipts).toEqual([]);
}

test('declining native run approval never authenticates or submits execution', async ({ page }, testInfo) => {
  await proposeRun(page);
  const before = (await snapshot(page)).graph;
  await capture(page, testInfo, 'native-run-approval');
  await approval(page).getByRole('button', { name: 'Cancel', exact: true }).click();
  await terminal(page, 'Stopped');
  const state = await snapshot(page);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toEqual([]);
  expect(state.executions).toEqual([]);
  expect(state.requests.filter((request) => request.url === '/api/auth/bootstrap')).toEqual([]);
  expect(await summary(page)).toMatchObject({ status: 'cancelled', reason: 'execution_declined', mutation: 'none', mutationAttempted: false, sideEffectAttempted: false });
});

test('Stop while native approval is open declines without execution side effects', async ({ page }) => {
  await proposeRun(page);
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await terminal(page, 'Stopped');
  await expect(approval(page)).toHaveCount(0);
  const state = await snapshot(page);
  expect(state.executions).toEqual([]);
  expect(state.requests.filter((request) => request.url === '/api/auth/bootstrap')).toEqual([]);
  expect(state.receipts).toEqual([]);
  expect(await summary(page)).toMatchObject({ status: 'cancelled', mutation: 'none', mutationAttempted: false, sideEffectAttempted: false });
});

test('approved native run reports deterministic progress and a receipt without canvas edits', async ({ page }, testInfo) => {
  await proposeRun(page);
  const before = (await snapshot(page)).graph;
  await approval(page).getByRole('button', { name: 'Run graph', exact: true }).click();
  await expect.poll(async () => (await snapshot(page)).executions[0]?.status).toBe('running');
  await expect(workbench(page)).toContainText('epoch 1');
  await expect(workbench(page)).toContainText('loss 0.7500');
  let state = await snapshot(page);
  expect(state.executions).toHaveLength(1);
  expect(state.executions[0].messages).toHaveLength(1);
  expect(state.executions[0].messages[0]).toMatchObject({ action: 'execute', nodes: before.nodes, edges: before.edges, device: 'cpu', record_outputs: false, weights_persistent: true });
  expect(state.requests.filter((request) => request.url === '/api/auth/bootstrap')).toHaveLength(1);
  await capture(page, testInfo, 'native-run-live-progress');

  // Explicit fixture events drive progress and terminal acknowledgement. The
  // real runner and UI remain in control; no sleeps, fake summaries or native WS.
  expect(await page.evaluate(() => window.__graphCopilotPreview.releaseExecution())).toBe(true);
  await expect(workbench(page)).toContainText('epoch 2');
  await expect(workbench(page)).toContainText('loss 0.2500');
  expect(await page.evaluate(() => window.__graphCopilotPreview.releaseExecution())).toBe(true);
  await terminal(page, 'Completed');
  state = await snapshot(page);
  expect(state.executions[0].status).toBe('complete');
  expect(state.executions[0].messages).toHaveLength(1);
  expect(state.executionPending).toBe(0);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toEqual([]);
  expect(await summary(page)).toMatchObject({ status: 'completed', mutation: 'none', mutationAttempted: false, sideEffectAttempted: true, hostRunId: MOCK_RUN_ID, validation: { status: 'valid' } });
  const conversation = state.conversations[0] as { messages: Array<{ role: string; tool_call_id?: string; content: string; toolOutcome?: string }> };
  const receipt = conversation.messages.find((turn) => turn.role === 'tool' && turn.tool_call_id === 'mock-run');
  expect(receipt?.toolOutcome).toBe('completed');
  expect(JSON.parse(receipt!.content)).toMatchObject({ status: 'complete', runId: MOCK_RUN_ID, completedNodes: 3, totalNodes: 3, metrics: { loss: 0.25 } });
  await capture(page, testInfo, 'native-run-complete');
});

test('Stop sends one native cancel and journals the explicit stopped acknowledgement', async ({ page }, testInfo) => {
  await proposeRun(page);
  const before = (await snapshot(page)).graph;
  await approval(page).getByRole('button', { name: 'Run graph', exact: true }).click();
  await expect.poll(async () => (await snapshot(page)).executions[0]?.runId).toBe(MOCK_RUN_ID);
  await expect(workbench(page)).toContainText('epoch 1');
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await terminal(page, 'Stopped');
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Continue from current graph', exact: true })).toBeVisible();
  const state = await snapshot(page);
  expect(state.executions).toHaveLength(1);
  expect(state.executions[0].messages.map((message) => message.action)).toEqual(['execute', 'cancel']);
  expect(state.executions[0].messages[1]).toEqual({ action: 'cancel', run_id: MOCK_RUN_ID });
  expect(state.executions[0].emittedEvents).toContain('execution_stopped');
  expect(state.executions[0].status).toBe('cancelled');
  expect(state.executionPending).toBe(0);
  expect(state.pending).toEqual([]);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toEqual([]);
  expect(chatRequests(state)).toHaveLength(2);
  expect(await summary(page)).toMatchObject({ status: 'cancelled', mutation: 'none', mutationAttempted: false, sideEffectAttempted: true, hostRunId: MOCK_RUN_ID });
  const conversation = state.conversations[0] as { messages: Array<{ role: string; tool_call_id?: string; content: string; toolOutcome?: string }> };
  const receipt = conversation.messages.find((turn) => turn.role === 'tool' && turn.tool_call_id === 'mock-run');
  expect(receipt?.toolOutcome).toBe('cancelled');
  expect(JSON.parse(receipt!.content)).toMatchObject({ status: 'cancelled', runId: MOCK_RUN_ID });
  await capture(page, testInfo, 'native-run-stopped');
});

for (const size of [
  { name: '375-short-native', width: 375, height: 520 },
  { name: '1440-short-native', width: 1440, height: 480 },
]) {
  test.describe(size.name, () => {
    test.use({ viewport: { width: size.width, height: size.height }, reducedMotion: 'reduce' });
    test('native approval and its Stop stay inside a short viewport', async ({ page }, testInfo) => {
      await proposeRun(page);
      await capture(page, testInfo, `${size.name}-approval`);
      const box = await approval(page).boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(size.width);
      expect(box!.y + box!.height).toBeLessThanOrEqual(size.height);
      // Outer modal bounds alone can pass while autofocus scrolls its title
      // behind a clipped ancestor. Keep identity/actions fixed and scroll only
      // the accessible details region to reach the real-side-effects warning.
      const details = approval(page).getByRole('region', { name: 'Execution approval details', exact: true });
      const stop = approval(page).getByRole('button', { name: 'Stop generation', exact: true });
      const fixedContent = [
        approval(page).getByRole('heading', { name: 'Run the current graph?', exact: true }),
        stop,
        approval(page).getByRole('button', { name: 'Cancel', exact: true }),
        approval(page).getByRole('button', { name: 'Run graph', exact: true }),
      ];
      await expect(details).toHaveJSProperty('scrollTop', 0);
      await expect(details.getByText('Execute the sample graph using the in-memory mock runner.', { exact: true })).toBeInViewport({ ratio: 1 });
      for (const element of fixedContent) await expect(element).toBeInViewport({ ratio: 1 });
      await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(1);
      await details.press('End');
      await expect.poll(async () => details.evaluate((element) => Math.abs(element.scrollHeight - element.clientHeight - element.scrollTop))).toBeLessThanOrEqual(1);
      const warning = details.getByText(/This executes your live graph with real side effects/);
      await expect(warning).toBeVisible();
      // The scroll maximum is rounded to CSS pixels; a padded card border can
      // intersect at 0.997 while every text line is fully visible. Measure the
      // warning text itself, without allowing any clipped approval copy.
      const detailsBox = await details.boundingBox();
      expect(detailsBox).not.toBeNull();
      const warningLines = await warning.evaluate((element) => {
        const range = document.createRange();
        range.selectNodeContents(element);
        return Array.from(range.getClientRects(), ({ x, y, width, height }) => ({ x, y, width, height }));
      });
      expect(warningLines.length).toBeGreaterThan(0);
      for (const line of warningLines) {
        expect(line.x).toBeGreaterThanOrEqual(detailsBox!.x);
        expect(line.y).toBeGreaterThanOrEqual(detailsBox!.y);
        expect(line.x + line.width).toBeLessThanOrEqual(detailsBox!.x + detailsBox!.width);
        expect(line.y + line.height).toBeLessThanOrEqual(detailsBox!.y + detailsBox!.height);
      }
      for (const element of fixedContent) await expect(element).toBeInViewport({ ratio: 1 });
      await capture(page, testInfo, `${size.name}-approval-details`);
      await stop.click();
      await terminal(page, 'Stopped');
      expect((await snapshot(page)).executions).toEqual([]);
    });
  });
}

for (const [scenario, tool] of [
  ['ask-run', 'run_graph'],
  ['ask-experiments', 'run_graph_experiments'],
  ['ask-optimizer', 'optimize_graph_parameters'],
] as const) {
  test(`Ask refuses injected ${tool} despite the model proposing it`, async ({ page }) => {
    await readyPreview(page, `scenario=${scenario}`);
    await openCopilot(page);
    await page.getByRole('radio', { name: 'Ask', exact: true }).click();
    const before = (await snapshot(page)).graph;
    await send(page, 'Explain only; do not execute or edit anything.');
    await terminal(page, 'Incomplete');
    const state = await snapshot(page);
    const requests = chatRequests(state);
    expect(requests).toHaveLength(1);
    for (const name of ['apply_graph_operations', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters']) expect(requests[0].tools).not.toContain(name);
    expect(requests[0].tools).toEqual(expect.arrayContaining(['get_current_graph', 'get_node_schemas', 'validate_graph', 'list_runs', 'get_run']));
    expect(state.requests.filter((request) => ['/api/graph/validate', '/api/system/devices', '/api/auth/bootstrap'].includes(request.url))).toEqual([]);
    expect(state.graph).toEqual(before);
    expect(state.receipts).toEqual([]);
    expect(state.executions).toEqual([]);
    await expect(approval(page)).toHaveCount(0);
    await expect(page.getByRole('dialog', { name: /^Run \d+ graph execution/ })).toHaveCount(0);
    expect(await summary(page)).toMatchObject({ mode: 'ask', status: 'incomplete', reason: 'ask_mutation_denied', mutation: 'none', mutationAttempted: false, sideEffectAttempted: false });
    const conversation = state.conversations[0] as { messages: Array<{ role: string; content: string; toolOutcome?: string }> };
    const denied = conversation.messages.find((turn) => turn.role === 'tool');
    expect(denied?.toolOutcome).toBe('error');
    expect(JSON.parse(denied!.content)).toEqual({ error: `Ask mode is read-only; ${tool} is not authorized.` });
  });
}

test('Ask can read exact host run metrics while all execution paths stay unused', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=ask-run-history');
  await openCopilot(page);
  await page.getByRole('radio', { name: 'Ask', exact: true }).click();
  const before = (await snapshot(page)).graph;
  await send(page, 'List the mock host’s previous run and report its exact loss.');
  await terminal(page, 'Completed');
  const state = await snapshot(page);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toEqual([]);
  expect(state.executions).toEqual([]);
  expect(state.requests.filter((request) => ['/api/graph/validate', '/api/system/devices', '/api/auth/bootstrap'].includes(request.url))).toEqual([]);
  expect(state.requests.map((request) => request.url)).toEqual(expect.arrayContaining(['/api/runs?limit=1', '/api/runs?limit=5', '/api/runs/mock-history-run', '/api/runs/mock-history-run/artifacts']));
  expect(chatRequests(state)).toHaveLength(3);
  const conversation = state.conversations[0] as { messages: Array<{ role: string; tool_call_id?: string; content: string }> };
  const run = conversation.messages.find((turn) => turn.role === 'tool' && turn.tool_call_id === 'mock-get-run');
  expect(JSON.parse(run!.content)).toMatchObject({ run: { run_id: 'mock-history-run', status: 'completed', final_metrics: { loss: 0.25 } }, artifacts: [] });
  expect(await summary(page)).toMatchObject({ mode: 'ask', status: 'completed', mutation: 'none', mutationAttempted: false, sideEffectAttempted: false });
  await capture(page, testInfo, 'ask-native-run-history');
});
