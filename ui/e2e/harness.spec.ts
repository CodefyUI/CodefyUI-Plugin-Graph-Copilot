import { test, expect, readyPreview, openCopilot, send, snapshot, chatRequests } from './fixtures';

for (const entry of ['source', 'bundle'] as const) {
  test(`real ${entry} activate(api) mounts into the mock host widget stack`, async ({ page }) => {
    await readyPreview(page, `scenario=edit${entry === 'bundle' ? '&bundle=1' : ''}`);
    const button = page.getByRole('button', { name: 'Graph Copilot', exact: true });
    await expect(button).toBeVisible();
    await button.click();
    await expect(page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Message input', exact: true })).toBeEnabled();
    const state = await snapshot(page);
    expect(state.entry).toBe(entry);
    expect(state.widgets).toEqual(['copilot']);
    expect(state.graph.nodes).toHaveLength(3);
    expect(state.graph.edges).toHaveLength(2);
    expect(state.receipts).toEqual([]);
    expect(state.blocked).toEqual([]);
  });
}

for (const scenario of ['ask', 'edit', 'pending'] as const) {
  test(`production bundle completes the ${scenario} user flow with the real executor`, async ({ page }) => {
    await readyPreview(page, `scenario=${scenario}&bundle=1`);
    await openCopilot(page);
    const before = (await snapshot(page)).graph;
    if (scenario === 'ask') await page.getByRole('radio', { name: 'Ask', exact: true }).click();
    await send(page, scenario === 'edit' ? 'Add Normalize between Dataset and Preview, with scale 0.5.' : 'Explain my current graph.');
    if (scenario === 'pending') {
      await expect.poll(async () => (await snapshot(page)).pending[0]?.kind).toBe('stream');
      await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
    }
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
    const state = await snapshot(page);
    const conversation = state.conversations[0] as { messages: Array<{ runSummary?: import('../src/agent/types').RunSummary }> };
    const summary = conversation.messages.filter((turn) => turn.runSummary).at(-1)?.runSummary;
    expect(state.entry).toBe('bundle');
    expect(summary).toMatchObject({ status: scenario === 'pending' ? 'cancelled' : 'completed' });
    if (scenario === 'edit') {
      expect(state.receipts).toHaveLength(1);
      expect(state.graph.nodes).toHaveLength(4);
      expect(state.graph.edges).toHaveLength(3);
      expect(summary).toMatchObject({ mutation: 'applied', appliedOps: 6, validation: { status: 'valid' } });
    } else {
      expect(state.graph).toEqual(before);
      expect(state.receipts).toEqual([]);
      expect(summary).toMatchObject({ mutation: 'none', mutationAttempted: false });
      if (scenario === 'ask') expect(chatRequests(state)[0].tools).not.toContain('apply_graph_operations');
      else {
        expect(chatRequests(state)[0].status).toBe('aborted');
        expect(state.pending).toEqual([]);
      }
    }
  });
}

test('scenario picker and query parameters select deterministic fixtures', async ({ page }) => {
  await readyPreview(page, 'scenario=ask&manual=1');
  await page.getByText('Preview controls', { exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Scenario' })).toHaveValue('ask');
  await expect(page.getByRole('checkbox', { name: 'Step network responses' })).toBeChecked();
  await page.getByRole('combobox', { name: 'Scenario' }).selectOption('partial-error');
  await page.getByRole('button', { name: 'Reload scenario' }).click();
  await expect(page.getByRole('status', { name: 'Fixture status' })).toHaveText('Fixture ready.');
  expect((await snapshot(page)).scenario).toBe('partial-error');
  expect((await snapshot(page)).manual).toBe(true);
});

test('fixture graph has typed receipts, batch-local refs and live change notifications', async ({ page }) => {
  await readyPreview(page);
  const result = await page.evaluate(async () => {
    const modulePath = '/graph.ts';
    const { createSampleGraph, validateSampleGraph } = await import(/* @vite-ignore */ modulePath) as typeof import('../preview/graph');
    let changes = 0;
    let notifications = 0;
    const host = createSampleGraph(() => { changes++; });
    const unsubscribe = host.onGraphChanged(() => { notifications++; });
    const receipt = host.applyOperations([
      { op: 'add_node', node_type: 'Normalize', ref: 'normalized' },
      { op: 'connect', source: 'sample-dataset', source_handle: 'samples', target: 'normalized', target_handle: 'samples' },
      { op: 'set_params', node_id: 'normalized', params: { scale: 0.5 } },
      { op: 'add_node', node_type: 'MissingFromCatalog' },
    ]);
    const later = host.applyOperations([{ op: 'set_params', node_id: 'normalized', params: { scale: 1 } }]);
    unsubscribe();
    const second = host.applyOperations([{ op: 'set_params', node_id: receipt.refs.normalized, params: { scale: 1 } }]);
    return { receipt, later, second, changes, notifications, validation: validateSampleGraph(host.getGraph()) };
  });
  expect(result.receipt).toMatchObject({
    node_count: 4, edge_count: 3, refs: { normalized: 'mock-node-1' },
    results: [{ index: 0, ok: true, node_id: 'mock-node-1' }, { index: 1, ok: true }, { index: 2, ok: true }, { index: 3, ok: false }],
  });
  expect(result.later.results[0].ok).toBe(false);
  expect(result.second.results[0].ok).toBe(true);
  expect(result.notifications).toBe(1);
  expect(result.changes).toBe(3);
  expect(result.validation).toEqual({ valid: true, errors: [] });
});
