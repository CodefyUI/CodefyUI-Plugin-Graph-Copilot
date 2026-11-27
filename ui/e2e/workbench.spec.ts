import type { Locator, Page } from '@playwright/test';
import { test, expect, readyPreview, openCopilot, send, snapshot, capture, actionRequests } from './fixtures';
import { expectControlContrast, expectKeyboardFocus } from './accessibility';

const workbench = (page: Page) => page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
const composer = (page: Page) => page.getByRole('combobox', { name: 'Message input', exact: true });

/** Approvals are inline cards (plan 02-agent 2D), not modals: the card takes
 * focus on its safe action, Tab reaches its verb, and nothing behind the panel
 * is made inert. The decision itself is enforced by the agent loop. */
async function expectInlineCardFocus(page: Page, card: Locator, safeAction: Locator, verb: Locator): Promise<void> {
  await expect(card).toBeVisible();
  expect(await card.evaluate((element) => element.tagName)).toBe('DIV');
  await expect(page.locator('dialog:modal')).toHaveCount(0);
  await expect(card).toBeInViewport({ ratio: 1 });
  await expect(safeAction).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(verb).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(safeAction).toBeFocused();
}

async function closeAndUseHost(page: Page): Promise<void> {
  await composer(page).press('Escape');
  await expect(workbench(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Graph Copilot', exact: true })).toBeFocused();
  await expect(page.locator('dialog:modal')).toHaveCount(0);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  const host = page.getByRole('button', { name: 'Mock canvas options', exact: true });
  await expect(host).toHaveAttribute('aria-pressed', 'false');
  await host.click();
  await expect(host).toHaveAttribute('aria-pressed', 'true');
}

for (const decision of [
  { scenario: 'clear', prompt: 'Clear my graph and start over.', title: 'Clear the current graph?', safe: 'Keep graph', verb: 'Clear graph' },
  { scenario: 'native-run', prompt: 'Run my current sample graph on CPU after I approve.', title: 'Run the current graph?', safe: 'Cancel', verb: 'Run graph' },
] as const) {
  test(`inline ${decision.scenario} approval takes keyboard focus and Escape cancels only the card`, async ({ page }, testInfo) => {
    await readyPreview(page, `scenario=${decision.scenario}`);
    await openCopilot(page);
    const before = (await snapshot(page)).graph;
    await send(page, decision.prompt);
    const dialog = page.getByRole('group', { name: decision.title, exact: true });
    const safe = dialog.getByRole('button', { name: decision.safe, exact: true });
    await expectInlineCardFocus(page, dialog, safe, dialog.getByRole('button', { name: decision.verb, exact: true }));
    await expectControlContrast(safe, `${decision.scenario} safe action`);
    await expectKeyboardFocus(page, safe, `${decision.scenario} safe action`);
    await capture(page, testInfo, `${decision.scenario}-inline-approval-keyboard`);
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(workbench(page)).toBeVisible();
    await expect(page.locator('dialog:modal')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
    await expect(composer(page)).toBeFocused();
    const state = await snapshot(page);
    expect(state.graph).toEqual(before);
    expect(state.receipts).toEqual([]);
    expect(state.executions).toEqual([]);
    expect(state.requests.some((request) => request.url === '/api/auth/bootstrap')).toBe(false);
    await closeAndUseHost(page);
  });
}

test('selected navigation is idempotent, reasoning uses a native select and the model opens settings', async ({ page }) => {
  await readyPreview(page, 'scenario=edit');
  await openCopilot(page);
  // The default fixture intentionally uses an unknown model. Select a real
  // built-in catalog identity through Settings, while the fake key and strict
  // HTTP mock still prevent any provider network or model dispatch.
  await page.getByRole('button', { name: 'Model settings', exact: true }).click();
  await page.getByRole('combobox', { name: 'Model ID', exact: true }).fill('gpt-5.6-sol');
  await page.getByRole('button', { name: 'Agent chat', exact: true }).click();
  await composer(page).fill('Keep this unsent draft while inspecting settings.');
  const effort = page.getByRole('combobox', { name: 'Reasoning effort', exact: true });
  await expect(effort).toBeVisible();
  expect(await effort.evaluate((element) => element.tagName)).toBe('SELECT');
  await effort.selectOption('high');
  await expect(effort).toHaveValue('high');
  await expectControlContrast(effort, 'selected high reasoning effort');
  await expectKeyboardFocus(page, effort, 'selected high reasoning effort');
  await effort.press('Escape');
  await expect(workbench(page)).toBeVisible();
  await expect(effort).toHaveValue('high');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Settings', exact: true })).toHaveAttribute('aria-current', 'page');
  await expectControlContrast(page.getByRole('button', { name: 'Settings', exact: true }), 'selected Settings navigation');
  await expectKeyboardFocus(page, page.getByRole('button', { name: 'Settings', exact: true }), 'selected Settings navigation');
  await expect(page.getByRole('combobox', { name: 'Model ID', exact: true })).toBeVisible();
  await expect(composer(page)).toBeHidden();
  await page.getByRole('button', { name: 'Agent chat', exact: true }).click();
  await expect(composer(page)).toHaveValue('Keep this unsent draft while inspecting settings.');
  await expect(effort).toHaveValue('high');
  await page.getByRole('button', { name: 'Model settings', exact: true }).click();
  await expect(page.getByRole('combobox', { name: 'Model ID', exact: true })).toBeVisible();
  expect(actionRequests(await snapshot(page))).toEqual([]);
});
