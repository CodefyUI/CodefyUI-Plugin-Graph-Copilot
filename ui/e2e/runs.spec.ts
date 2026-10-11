import type { RunSummary } from '../src/agent/types';
import { test, expect, readyPreview, openCopilot, send, snapshot, releaseResponse, capture, chatRequests, actionRequests } from './fixtures';
import type { Page } from '@playwright/test';

async function latestSummary(page: Page): Promise<RunSummary | undefined> {
  const state = await snapshot(page);
  const conversation = state.conversations[0] as { messages?: Array<{ runSummary?: RunSummary }> } | undefined;
  return conversation?.messages?.filter((turn) => turn.runSummary).at(-1)?.runSummary;
}

async function terminal(page: Page, label: 'Completed' | 'Failed' | 'Stopped' | 'Incomplete'): Promise<void> {
  const dialog = page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
  await expect(dialog.getByRole('status').filter({ has: page.getByText(label, { exact: true }) }).last()).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
}

async function finishSteppedEdit(page: Page): Promise<void> {
  await releaseResponse(page, '/api/llm/chat'); // schema lookup
  await releaseResponse(page, '/api/llm/chat'); // graph mutation
  await expect(page.getByLabel('Graph counts', { exact: true })).toContainText('4 nodes, 3 edges');
  await releaseResponse(page, '/api/llm/chat'); // validate tool
  await releaseResponse(page, '/api/graph/validate');
  await expect(page.getByRole('button', { name: /Structure validated/ })).toBeVisible();
  await releaseResponse(page, '/api/llm/chat'); // final answer
  // Some executors recheck at end; wait on pending/status, not a timed pause.
  await expect.poll(async () => {
    const state = await snapshot(page);
    return state.pending[0]?.url ?? (await latestSummary(page))?.status;
  }).toMatch(/^(\/api\/graph\/validate|completed)$/);
  if ((await snapshot(page)).pending[0]?.url === '/api/graph/validate') await releaseResponse(page, '/api/graph/validate');
  await terminal(page, 'Completed');
}

test('Edit is the default; a starter fills the composer without dispatching', async ({ page }) => {
  await readyPreview(page, 'scenario=edit&manual=1');
  await openCopilot(page);
  await expect(page.getByRole('radiogroup', { name: 'Agent mode' })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Edit', exact: true })).toBeChecked();
  await expect(page.getByRole('radio', { name: 'Ask', exact: true })).not.toBeChecked();
  await page.getByRole('button', { name: 'Build a small CNN image classifier', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Message input' })).toHaveValue('Build a small CNN image classifier');
  expect(actionRequests(await snapshot(page))).toEqual([]);
  expect((await snapshot(page)).receipts).toEqual([]);
});

test('Ask returns read-only guidance and leaves the sample graph unchanged', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=ask');
  await openCopilot(page);
  await page.getByRole('radio', { name: 'Ask', exact: true }).click();
  const before = (await snapshot(page)).graph;
  await send(page, 'Explain what my current graph does without changing it.');
  await terminal(page, 'Completed');
  const state = await snapshot(page);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toEqual([]);
  expect(state.requests.filter((request) => request.url === '/api/graph/validate')).toEqual([]);
  expect(chatRequests(state)[0].tools).not.toContain('apply_graph_operations');
  await expect(page.getByRole('log', { name: 'Conversation' }).getByText('No graph changes', { exact: true })).toBeVisible();
  expect(await latestSummary(page)).toMatchObject({ mode: 'ask', status: 'completed', mutation: 'none', mutationAttempted: false });
  await capture(page, testInfo, 'ask-read-only');
});

test('Edit surfaces real stages, applies typed refs once and validates the changed structure', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=edit&manual=1');
  await openCopilot(page);
  await send(page, 'Add Normalize between Dataset and Preview, with scale 0.5.');
  await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Ask', exact: true })).toBeDisabled();
  await finishSteppedEdit(page);
  const state = await snapshot(page);
  expect(state.receipts).toHaveLength(1);
  expect(state.receipts[0].result.refs.normalized).toBe('mock-node-1');
  expect(state.receipts[0].result.results.every((receipt) => receipt.ok)).toBe(true);
  expect(state.graph.nodes.find((node) => node.id === 'mock-node-1')).toMatchObject({ type: 'Normalize', data: { params: { scale: 0.5 } } });
  expect(state.graph.edges).toContainEqual(expect.objectContaining({ source: 'sample-dataset', target: 'mock-node-1' }));
  expect(state.graph.edges).toContainEqual(expect.objectContaining({ source: 'mock-node-1', target: 'sample-preview' }));
  expect(state.requests.filter((request) => request.url === '/api/llm/chat')).toHaveLength(4);
  expect(state.requests.filter((request) => request.url === '/api/llm/chat')[1].toolResultIds).toContain('mock-schemas');
  expect(await latestSummary(page)).toMatchObject({ status: 'completed', mutation: 'applied', appliedOps: 6, failedOps: 0, validation: { status: 'valid' } });
  await capture(page, testInfo, 'edit-structure-validated');
});

test('a pre-mutation HTTP error offers safe Retry without duplicating the user turn', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=http-error');
  await openCopilot(page);
  await send(page, 'Describe my sample graph.');
  await terminal(page, 'Failed');
  await expect(page.getByRole('alert')).toContainText('HTTP 503');
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue from current graph', exact: true })).toHaveCount(0);
  expect((await snapshot(page)).receipts).toEqual([]);
  await capture(page, testInfo, 'safe-retry');
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await terminal(page, 'Completed');
  const state = await snapshot(page);
  const conversation = state.conversations[0] as { messages: Array<{ role: string; content: string }> };
  expect(conversation.messages.filter((turn) => turn.role === 'user' && turn.content === 'Describe my sample graph.')).toHaveLength(1);
  expect(state.graph.nodes).toHaveLength(3);
  expect(state.receipts).toEqual([]);
});

test('partial edits remain visible after HTTP failure; Continue rereads instead of replaying', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=partial-error');
  await openCopilot(page);
  await send(page, 'Add a normalization step to my graph.');
  await terminal(page, 'Failed');
  await expect(page.getByLabel('Graph counts', { exact: true })).toContainText('4 nodes, 3 edges');
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Continue from current graph', exact: true })).toBeVisible();
  const before = await snapshot(page);
  expect(before.receipts).toHaveLength(1);
  expect(before.receipts[0].result.results.map((receipt) => receipt.ok)).toEqual([true, true, false]);
  expect(await latestSummary(page)).toMatchObject({ status: 'failed', mutationAttempted: true, appliedOps: 2, failedOps: 1 });
  await capture(page, testInfo, 'partial-edit-http-error');
  await page.getByRole('button', { name: 'Continue from current graph', exact: true }).click();
  await terminal(page, 'Completed');
  const after = await snapshot(page);
  expect(after.graph).toEqual(before.graph);
  expect(after.receipts).toHaveLength(1);
  expect(after.requests.filter((request) => request.url === '/api/llm/chat').at(-1)?.toolResultIds).toContain('mock-current');
  expect(after.graph.nodes.filter((node) => node.type === 'Normalize')).toHaveLength(1);
});

test('Stop cancels a genuinely pending stream through AbortSignal without graph changes', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=pending');
  await openCopilot(page);
  await send(page, 'Inspect this graph while I test Stop.');
  await expect.poll(async () => (await snapshot(page)).pending[0]?.kind).toBe('stream');
  await expect(page.getByRole('log', { name: 'Conversation' })).toContainText('This mock stream stays pending');
  await capture(page, testInfo, 'long-pending');
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await terminal(page, 'Stopped');
  const state = await snapshot(page);
  expect(state.pending).toEqual([]);
  expect(chatRequests(state)[0].status).toBe('aborted');
  expect(state.receipts).toEqual([]);
  expect(state.graph.nodes).toHaveLength(3);
  expect(await latestSummary(page)).toMatchObject({ status: 'cancelled', mutation: 'none' });
});

for (const decision of ['Keep graph', 'Clear graph'] as const) {
  test(`clear_graph does not dispatch before explicit ${decision} confirmation`, async ({ page }, testInfo) => {
    await readyPreview(page, 'scenario=clear');
    await openCopilot(page);
    await send(page, 'Clear my graph and start over.');
    const confirmation = page.getByRole('group', { name: 'Confirm clearing the graph' });
    await expect(confirmation).toBeVisible();
    await expect(confirmation).toContainText('3 nodes and 2 edges');
    const before = await snapshot(page);
    expect(before.receipts).toEqual([]);
    expect(before.graph.nodes).toHaveLength(3);
    await capture(page, testInfo, `clear-confirmation-${decision === 'Keep graph' ? 'keep' : 'clear'}`);
    await page.getByRole('button', { name: decision, exact: true }).click();
    await expect(confirmation).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
    const state = await snapshot(page);
    if (decision === 'Keep graph') {
      expect(state.graph).toEqual(before.graph);
      expect(state.receipts).toEqual([]);
    } else {
      expect(state.graph.nodes).toEqual([]);
      expect(state.graph.edges).toEqual([]);
      expect(state.receipts).toHaveLength(1);
      await expect(page.getByLabel('Graph counts', { exact: true })).toContainText('0 nodes, 0 edges');
    }
  });
}

for (const scenario of ['invalid-validation', 'unavailable-validation'] as const) {
  test(`${scenario} stays Incomplete and never claims Structure validated`, async ({ page }, testInfo) => {
    await readyPreview(page, `scenario=${scenario}`);
    await openCopilot(page);
    await send(page, 'Add Normalize and check its graph structure.');
    await terminal(page, 'Incomplete');
    await expect(page.getByRole('log', { name: 'Conversation' }).getByText('Structure validated', { exact: true })).toHaveCount(0);
    const expectedLabel = scenario === 'invalid-validation' ? 'Structure has issues' : 'Validation unavailable';
    await expect(page.getByRole('status').filter({ hasText: 'Incomplete' }).getByText(expectedLabel, { exact: true })).toBeVisible();
    const state = await snapshot(page);
    expect(state.receipts).toHaveLength(1);
    expect(state.graph.nodes).toHaveLength(4);
    expect(await latestSummary(page)).toMatchObject({ status: 'incomplete', validation: { status: scenario === 'invalid-validation' ? 'invalid' : 'unavailable' } });
    await capture(page, testInfo, scenario);
  });
}
