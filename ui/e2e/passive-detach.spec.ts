import type { Page } from '@playwright/test';
import type { RunSummary } from '../src/agent/types';
import { MOCK_RUN_ID } from '../preview/execution';
import type { PreviewSnapshot } from '../preview/types';
import { test, expect, readyPreview, openCopilot, send, snapshot, capture, chatRequests } from './fixtures';

const approval = (page: Page) => page.getByRole('dialog', { name: 'Run the current graph?', exact: true });
const banner = (page: Page) => page.getByRole('status', { name: 'Background graph run', exact: true });
const workbench = (page: Page) => page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
const cancelRequests = (state: PreviewSnapshot) => state.requests.filter((request) => request.url.endsWith('/cancel'));

type SavedTurn = { role: string; content: string; tool_call_id?: string; toolOutcome?: string; runSummary?: RunSummary };
const savedTurns = (state: PreviewSnapshot) => (state.conversations[0] as { messages: SavedTurn[] }).messages;
const runReceipt = (state: PreviewSnapshot) => savedTurns(state).filter((turn) => turn.role === 'tool' && turn.tool_call_id === 'mock-run');

async function startHostRun(page: Page, options = ''): Promise<void> {
  await readyPreview(page, `scenario=native-run&serverOwned=1${options ? `&${options}` : ''}`);
  await openCopilot(page);
  await send(page, 'Run my current sample graph on CPU after I approve.');
  await expect(approval(page)).toBeVisible();
  expect((await snapshot(page)).executions).toEqual([]);
  await approval(page).getByRole('button', { name: 'Run graph', exact: true }).click();
  await expect.poll(async () => (await snapshot(page)).executions[0]?.status).toBe('running');
  if (options.includes('lateInitialId=1')) {
    await expect.poll(async () => (await snapshot(page)).executions[0]?.initialIdPending).toBe(true);
    expect((await snapshot(page)).activeRun).toBeNull();
  } else {
    await expect(workbench(page)).toContainText('epoch 1');
    await expect.poll(async () => (await snapshot(page)).activeRun).toMatchObject({ runId: MOCK_RUN_ID });
  }
}

async function detached(page: Page): Promise<PreviewSnapshot> {
  await expect.poll(async () => (await snapshot(page)).executions[0]?.socketState).toBe('closed');
  await expect.poll(async () => savedTurns(await snapshot(page)).filter((turn) => turn.runSummary).at(-1)?.runSummary?.reason).toBe('execution_detached');
  const state = await snapshot(page);
  expect(state.executions).toHaveLength(1);
  expect(state.executions[0]).toMatchObject({ status: 'running', socketState: 'closed', serverOwned: true });
  expect(state.executions[0].messages.map((message) => message.action)).toEqual(['execute']);
  expect(state.executionPending).toBe(1);
  expect(state.activeRun).toMatchObject({ runId: MOCK_RUN_ID });
  expect(cancelRequests(state)).toEqual([]);
  expect(chatRequests(state)).toHaveLength(2);
  expect(runReceipt(state)).toHaveLength(1);
  expect(runReceipt(state)[0].toolOutcome).toBe('unknown');
  expect(JSON.parse(runReceipt(state)[0].content)).toMatchObject({ status: 'detached', runId: MOCK_RUN_ID, run_continues: true, run_may_still_be_running: true });
  return state;
}

async function following(page: Page): Promise<void> {
  await expect(banner(page)).toContainText('Run in progress (reattached)');
  await expect(banner(page).getByRole('button', { name: 'Stop run', exact: true })).toBeEnabled();
  await expect.poll(async () => (await snapshot(page)).runEventPolls.length).toBe(1);
}

async function finishHostRun(page: Page): Promise<void> {
  expect(await page.evaluate(() => window.__graphCopilotPreview.releaseExecution())).toBe(true);
  await expect(banner(page)).toContainText('loss 0.2500');
  await expect.poll(async () => (await snapshot(page)).runEventPolls.length).toBe(1);
  expect(await page.evaluate(() => window.__graphCopilotPreview.releaseExecution())).toBe(true);
  await expect(banner(page)).toContainText('Run succeeded while you were away');
  await expect(banner(page)).toContainText('loss 0.2500');
  const state = await snapshot(page);
  expect(state.runEventPolls).toEqual([]);
  expect(state.executionPending).toBe(0);
  expect(state.executions[0].status).toBe('complete');
  expect(state.executions[0].messages.map((message) => message.action)).toEqual(['execute']);
  expect(cancelRequests(state)).toEqual([]);
  expect(chatRequests(state)).toHaveLength(2);
}

for (const navigation of ['Settings', 'Conversation history', 'Close panel', 'FAB'] as const) {
  test(`${navigation}${navigation === 'FAB' ? ' keyboard activation' : ''} detaches a server-owned run and returning follows it without resubmitting`, async ({ page }, testInfo) => {
    await startHostRun(page);
    const before = (await snapshot(page)).graph;
    if (navigation === 'FAB') {
      // The expanded workbench overlaps the host's FAB at this viewport; this
      // regression exercises its keyboard activation, not pointer hit-testing.
      const fab = page.getByRole('button', { name: 'Graph Copilot', exact: true });
      await fab.focus();
      await fab.press('Enter');
    } else await page.getByRole('button', { name: navigation, exact: true }).click();
    await detached(page);
    if (navigation === 'Close panel' || navigation === 'FAB') await openCopilot(page);
    else await page.getByRole('button', { name: navigation, exact: true }).click();
    await following(page);
    await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
    expect((await snapshot(page)).requests.filter((request) => request.url === '/api/auth/bootstrap')).toHaveLength(1);
    await finishHostRun(page);
    const state = await snapshot(page);
    expect(state.graph).toEqual(before);
    expect(state.receipts).toEqual([]);
    expect(runReceipt(state)).toHaveLength(1);
    if (navigation === 'Close panel') await capture(page, testInfo, 'passive-close-reattached-complete');
    await banner(page).getByRole('button', { name: 'Dismiss', exact: true }).click();
    await expect(banner(page)).toHaveCount(0);
    expect((await snapshot(page)).activeRun).toBeNull();
  });
}

test('fast reopen waits for a late initial run ID before mounting its reattach follower', async ({ page }, testInfo) => {
  await startHostRun(page, 'lateInitialId=1');
  await page.getByRole('button', { name: 'Close panel', exact: true }).click();
  await openCopilot(page);
  await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Message input', exact: true })).toBeDisabled();
  await expect(banner(page)).toHaveCount(0);
  let state = await snapshot(page);
  expect(state.activeRun).toBeNull();
  expect(state.executions[0]).toMatchObject({ status: 'running', socketState: 'open', initialIdPending: true });
  expect(state.executions[0].emittedEvents).toEqual([]);
  expect(state.runEventPolls).toEqual([]);
  expect(chatRequests(state)).toHaveLength(2);
  expect(cancelRequests(state)).toEqual([]);
  // The pending owner's socket, not a timer or a forged storage pointer, names
  // the run. busy must settle only after this identity is persisted.
  expect(await page.evaluate(() => window.__graphCopilotPreview.releaseExecution())).toBe(true);
  await detached(page);
  await following(page);
  state = await snapshot(page);
  expect(state.executions[0].initialIdPending).toBe(false);
  expect(state.executions).toHaveLength(1);
  expect(savedTurns(state).filter((turn) => turn.runSummary)).toHaveLength(1);
  await capture(page, testInfo, 'late-id-fast-reopen-reattached');
  await finishHostRun(page);
});

for (const unreadable of [false, true]) {
  test(`Dismiss preserves a ${unreadable ? 'history-unreadable' : 'live'} run reservation and blocks a real second proposal`, async ({ page }) => {
    await readyPreview(page, `scenario=native-run-reservation&serverOwned=1${unreadable ? '&runHistory=unreadable' : ''}`);
    await openCopilot(page);
    await send(page, 'Run my current sample graph on CPU after I approve.');
    await expect(approval(page)).toBeVisible();
    await approval(page).getByRole('button', { name: 'Run graph', exact: true }).click();
    await expect.poll(async () => (await snapshot(page)).activeRun).toMatchObject({ runId: MOCK_RUN_ID });
    await page.getByRole('button', { name: 'Close panel', exact: true }).click();
    const before = await detached(page);
    await openCopilot(page);
    if (unreadable) {
      await expect(banner(page)).toContainText('Run status unavailable');
      await expect(banner(page)).toContainText('Run status could not be confirmed. The run may still be active.');
      await expect(banner(page).getByRole('button', { name: 'Stop run', exact: true })).toBeEnabled();
    } else await following(page);
    await banner(page).getByRole('button', { name: 'Dismiss', exact: true }).click();
    await expect(banner(page)).toHaveCount(0);
    await expect.poll(async () => (await snapshot(page)).runEventPolls.length).toBe(0);
    let state = await snapshot(page);
    expect(state.activeRun).toEqual(before.activeRun);
    expect(state.executions[0].status).toBe('running');
    expect(cancelRequests(state)).toEqual([]);

    await send(page, 'Run the current graph a second time.');
    await expect.poll(async () => savedTurns(await snapshot(page)).some((turn) => turn.tool_call_id === 'mock-reservation-run')).toBe(true);
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
    await expect(approval(page)).toHaveCount(0);
    state = await snapshot(page);
    const refusal = savedTurns(state).find((turn) => turn.role === 'tool' && turn.tool_call_id === 'mock-reservation-run');
    expect(refusal?.toolOutcome).toBe('error');
    expect(JSON.parse(refusal!.content)).toMatchObject({ error: expect.stringMatching(unreadable ? /still reserved.*could not be read/ : /still running.*One run at a time/) });
    expect(state.activeRun).toEqual(before.activeRun);
    expect(state.executions).toHaveLength(1);
    expect(state.executions[0].messages.map((message) => message.action)).toEqual(['execute']);
    expect(state.graph).toEqual(before.graph);
    expect(state.receipts).toEqual([]);
    expect(cancelRequests(state)).toEqual([]);
    // Reopen can observe the same reservation after Dismiss; it never dispatches.
    await page.getByRole('button', { name: 'Close panel', exact: true }).click();
    await openCopilot(page);
    await expect(banner(page)).toContainText(unreadable ? 'Run status unavailable' : 'Run in progress (reattached)');
    expect((await snapshot(page)).activeRun).toEqual(before.activeRun);
    await banner(page).getByRole('button', { name: 'Stop run', exact: true }).click();
    await expect.poll(async () => (await snapshot(page)).executions[0]?.status).toBe('cancelled');
    expect(cancelRequests(await snapshot(page))).toHaveLength(1);
    if (unreadable) {
      // Successful POST acknowledges only the request. Without a readable run
      // row, the reservation still cannot be released or called completed.
      await expect(banner(page)).toContainText('Run status unavailable');
      await expect(banner(page).getByRole('button', { name: 'Cancellation requested…', exact: true })).toBeDisabled();
      expect((await snapshot(page)).activeRun).toEqual(before.activeRun);
    } else {
      await expect(banner(page)).toContainText('Run cancelled while you were away');
      expect((await snapshot(page)).activeRun).toBeNull();
    }
  });
}

test('bundled plugin passively closes and reattaches without a second host submission', async ({ page }) => {
  await startHostRun(page, 'bundle=1');
  expect((await snapshot(page)).entry).toBe('bundle');
  await page.getByRole('button', { name: 'Close panel', exact: true }).click();
  await detached(page);
  await openCopilot(page);
  await following(page);
  await finishHostRun(page);
  expect(runReceipt(await snapshot(page))).toHaveLength(1);
});

test('explicit Stop after fast reopen cancels the original run even before its first ID', async ({ page }) => {
  await startHostRun(page, 'lateInitialId=1');
  await page.getByRole('button', { name: 'Close panel', exact: true }).click();
  await openCopilot(page);
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
  const state = await snapshot(page);
  expect(state.executions).toHaveLength(1);
  expect(state.executions[0]).toMatchObject({ status: 'cancelled', socketState: 'closed', initialIdPending: false });
  expect(state.executions[0].messages.map((message) => message.action)).toEqual(['execute', 'cancel']);
  expect(state.executions[0].messages[1]).toEqual({ action: 'cancel' });
  expect(state.executionPending).toBe(0);
  expect(state.activeRun).toBeNull();
  expect(cancelRequests(state)).toEqual([]);
  expect(runReceipt(state)).toHaveLength(1);
  expect(runReceipt(state)[0].toolOutcome).toBe('cancelled');
  expect(JSON.parse(runReceipt(state)[0].content)).toMatchObject({ status: 'cancelled', runId: MOCK_RUN_ID, cancelConfirmed: true });
  expect(chatRequests(state)).toHaveLength(2);
  await expect(banner(page)).toHaveCount(0);
});

test('explicit Stop still sends native cancellation on a server-owned run', async ({ page }, testInfo) => {
  await startHostRun(page);
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
  await expect.poll(async () => savedTurns(await snapshot(page)).filter((turn) => turn.runSummary).at(-1)?.runSummary?.status).toBe('cancelled');
  const state = await snapshot(page);
  expect(state.executions).toHaveLength(1);
  expect(state.executions[0]).toMatchObject({ status: 'cancelled', socketState: 'closed' });
  expect(state.executions[0].messages).toHaveLength(2);
  expect(state.executions[0].messages[1]).toEqual({ action: 'cancel', run_id: MOCK_RUN_ID });
  expect(state.executions[0].emittedEvents).toContain('execution_stopped');
  expect(state.executionPending).toBe(0);
  expect(state.activeRun).toBeNull();
  expect(cancelRequests(state)).toEqual([]);
  expect(runReceipt(state)).toHaveLength(1);
  expect(runReceipt(state)[0].toolOutcome).toBe('cancelled');
  expect(JSON.parse(runReceipt(state)[0].content)).toMatchObject({ status: 'cancelled', runId: MOCK_RUN_ID, cancelConfirmed: true });
  expect(chatRequests(state)).toHaveLength(2);
  await expect(banner(page)).toHaveCount(0);
  await capture(page, testInfo, 'server-owned-explicit-stop');
});
