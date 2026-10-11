import { test, expect, readyPreview, openCopilot, send, snapshot, capture, chatRequests, actionRequests } from './fixtures';

test('seeded legacy/success/interrupted history resumes without network, edits or live spinners', async ({ page }, testInfo) => {
  await readyPreview(page, 'scenario=seed');
  await openCopilot(page);
  await expect(page.getByRole('button', { name: 'View previous conversations', exact: true })).toContainText('3');
  await page.getByRole('button', { name: 'Conversation history', exact: true }).click();
  await capture(page, testInfo, 'seed-history');
  await page.getByRole('button', { name: 'Resume conversation: Legacy sample explanation', exact: true }).click();
  await expect(page.getByRole('log', { name: 'Conversation' })).toContainText('This legacy conversation has no run receipt');
  expect(actionRequests(await snapshot(page))).toEqual([]);
  expect((await snapshot(page)).receipts).toEqual([]);

  await page.getByRole('button', { name: 'Conversation history', exact: true }).click();
  await page.getByRole('button', { name: 'Resume conversation: Previously validated sample', exact: true }).click();
  await expect(page.getByRole('log', { name: 'Conversation' }).getByText('Completed', { exact: true })).toBeVisible();
  await expect(page.getByRole('log', { name: 'Conversation' }).getByText('Structure validated', { exact: true })).toHaveCount(2);
  await capture(page, testInfo, 'seed-completed');

  await page.getByRole('button', { name: 'Conversation history', exact: true }).click();
  await page.getByRole('button', { name: 'Resume conversation: Interrupted schema lookup', exact: true }).click();
  const interrupted = page.getByRole('button', { name: /Interrupted — no result recorded/ });
  await expect(interrupted).toBeVisible();
  await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
  // Missing legacy result is a terminal uncertainty, not a perpetual busy row.
  await expect(page.getByRole('log', { name: 'Conversation' }).locator('[aria-busy="true"]')).toHaveCount(0);
  expect(actionRequests(await snapshot(page))).toEqual([]);
  await capture(page, testInfo, 'seed-interrupted');
  await page.getByRole('radio', { name: 'Ask', exact: true }).click();
  await send(page, 'Explain the sample graph without changing it.');
  await expect(page.getByRole('log', { name: 'Conversation' }).getByText('Completed', { exact: true })).toBeVisible();
  const after = await snapshot(page);
  expect(after.receipts).toEqual([]);
  expect(chatRequests(after)[0].toolResultIds).not.toContain('mock-seed-unresolved');
  expect(after.graph.nodes).toHaveLength(3);
});

test('seed history deletion requires explicit confirmation, Escape cancels, focus stays useful', async ({ page }) => {
  await readyPreview(page, 'scenario=seed');
  await openCopilot(page);
  await page.getByRole('button', { name: 'Conversation history', exact: true }).click();
  const deleteLegacy = page.getByRole('button', { name: 'Delete "Legacy sample explanation"', exact: true });
  await deleteLegacy.click();
  await expect(page.getByRole('button', { name: 'Confirm delete "Legacy sample explanation"', exact: true })).toBeVisible();
  expect((await snapshot(page)).conversations).toHaveLength(3);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true })).toBeVisible();
  await expect(deleteLegacy).toBeFocused();
  expect((await snapshot(page)).conversations).toHaveLength(3);
  await deleteLegacy.click();
  await page.getByRole('button', { name: 'Confirm delete "Legacy sample explanation"', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Resume conversation: Legacy sample explanation', exact: true })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Resume conversation: Previously validated sample', exact: true })).toBeFocused();
  expect((await snapshot(page)).conversations).toHaveLength(2);
});
