import type { Locator, Page } from '@playwright/test';
import { test, expect, readyPreview, openCopilot, send, snapshot, capture, actionRequests } from './fixtures';
import { expectControlContrast, expectKeyboardFocus } from './accessibility';

const workbench = (page: Page) => page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
const composer = (page: Page) => page.getByRole('textbox', { name: 'Message input', exact: true });

async function expectNativeFocusCycle(page: Page, dialog: Locator, safeAction: Locator): Promise<void> {
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate((element) => element.tagName)).toBe('DIALOG');
  expect(await dialog.evaluate((element) => element.matches(':modal'))).toBe(true);
  await expect(page.locator('dialog:modal')).toHaveCount(1);
  await expect(safeAction).toBeFocused();
  // Native modal inertness must reject programmatic focus on a real host
  // sibling as well as keyboard traversal; never fake an inert attribute.
  await page.locator('[aria-label="Mock canvas options"]').evaluate((element) => (element as HTMLButtonElement).focus());
  expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
  const tabStops = await dialog.evaluate((element) => Array.from(element.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex="0"]')).filter((node) => node.getClientRects().length).length);
  expect(tabStops).toBeGreaterThanOrEqual(3);
  const sequence: Array<{ key: string; inside: boolean; documentFocused: boolean; tag: string; name: string }> = [];
  for (const key of ['Tab', 'Shift+Tab'] as const) {
    // Native modal navigation may visit browser chrome, represented by BODY
    // while document.hasFocus() is false. It must never focus host/app siblings.
    for (let index = 0; index < tabStops + 1; index++) {
      await page.keyboard.press(key);
      const focus = await dialog.evaluate((element) => ({
        inside: element.contains(document.activeElement), documentFocused: document.hasFocus(),
        tag: document.activeElement?.tagName ?? '',
        name: document.activeElement?.getAttribute('aria-label') ?? document.activeElement?.textContent?.trim().slice(0, 80) ?? '',
      }));
      sequence.push({ key, ...focus });
      expect(focus.inside || (focus.tag === 'BODY' && !focus.documentFocused), `${key} has no focus on a background control: ${JSON.stringify(focus)}`).toBe(true);
      if (!focus.inside) {
        await page.keyboard.press(key);
        expect(await dialog.evaluate((element) => element.contains(document.activeElement)), `${key} returns from browser chrome to the native decision`).toBe(true);
      }
    }
  }
  await test.info().attach('native-dialog-focus-sequence.json', { body: JSON.stringify(sequence, null, 2), contentType: 'application/json' });
  expect(sequence.some((focus) => focus.inside && focus.key === 'Tab')).toBe(true);
  expect(sequence.some((focus) => focus.inside && focus.key === 'Shift+Tab')).toBe(true);
  await safeAction.focus();
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
  { scenario: 'clear', prompt: 'Clear my graph and start over.', title: 'Clear the current graph?', safe: 'Keep graph' },
  { scenario: 'native-run', prompt: 'Run my current sample graph on CPU after I approve.', title: 'Run the current graph?', safe: 'Cancel' },
] as const) {
  test(`native ${decision.scenario} dialog contains keyboard focus and Escape cancels only its top layer`, async ({ page }, testInfo) => {
    await readyPreview(page, `scenario=${decision.scenario}`);
    await openCopilot(page);
    const before = (await snapshot(page)).graph;
    await send(page, decision.prompt);
    const dialog = page.getByRole('dialog', { name: decision.title, exact: true });
    const safe = dialog.getByRole('button', { name: decision.safe, exact: true });
    await expectNativeFocusCycle(page, dialog, safe);
    await expectControlContrast(safe, `${decision.scenario} safe action`);
    await expectKeyboardFocus(page, safe, `${decision.scenario} safe action`);
    await capture(page, testInfo, `${decision.scenario}-native-dialog-keyboard`);
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
