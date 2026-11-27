/** The v6 side dock (plan 02-agent 2D): the panel fits 300–720px widths, the
 * header folds into "More actions" when narrow, the toolbar badge follows the
 * agent state, and the host's language switches the panel's strings. */
import type { Page } from '@playwright/test';
import { test, expect, readyPreview, openCopilot, send, capture } from './fixtures';

const panel = (page: Page) => page.getByRole('region', { name: 'Copilot', exact: true });
const toggle = (page: Page) => page.getByRole('navigation', { name: 'Mock host toolbar' }).getByRole('button', { name: 'Copilot', exact: true });

async function expectFits(page: Page): Promise<void> {
  const overflow = await page.locator('.gcp-window').evaluate((element) => {
    const all = [element, ...element.querySelectorAll<HTMLElement>('.gcp-header, .gcp-composer, .gcp-composer-bar, .gcp-messages')];
    return all.filter((node) => node.scrollWidth > node.clientWidth + 1).map((node) => node.className);
  });
  expect(overflow).toEqual([]);
}

test.use({ viewport: { width: 1280, height: 800 } });

for (const width of [300, 400, 640, 720]) {
  for (const lang of ['en', 'zh-TW'] as const) {
    test(`side dock at ${width}px (${lang}) fits without sideways scrolling`, async ({ page }, testInfo) => {
      await readyPreview(page, `host=v6&scenario=edit&panelWidth=${width}&lang=${lang}`);
      await toggle(page).click();
      await expect(panel(page)).toBeVisible();
      const box = await panel(page).boundingBox();
      expect(Math.round(box!.width)).toBe(width);
      await expect(page.getByRole('heading', { name: lang === 'en' ? 'What should Copilot work on?' : '要請 Copilot 做什麼？' })).toBeVisible();
      const more = page.getByRole('button', { name: lang === 'en' ? 'More actions' : '更多操作', exact: true });
      if (width <= 320) {
        await expect(more).toBeVisible();
        await expect(page.getByRole('button', { name: lang === 'en' ? 'Settings' : '設定', exact: true })).toBeHidden();
        await more.click();
        const menu = page.getByRole('menu');
        await expect(menu.getByRole('menuitem')).toHaveCount(6);
        await page.keyboard.press('Escape');
        await expect(menu).toBeHidden();
        await expect(more).toBeFocused();
      } else {
        await expect(more).toBeHidden();
      }
      await expectFits(page);
      await capture(page, testInfo, `side-${width}-${lang}`);
    });
  }
}

test('the toolbar badge shows needs-you while an approval waits, even with the panel closed', async ({ page }, testInfo) => {
  await readyPreview(page, 'host=v6&scenario=clear');
  await openCopilot(page);
  await expect(toggle(page)).toHaveAttribute('data-badge', '');
  await send(page, 'Clear my graph and start over.');
  const card = page.getByRole('group', { name: 'Clear the current graph?', exact: true });
  await expect(card).toBeVisible();
  await expect(toggle(page)).toHaveAttribute('data-badge', 'attention');
  await expect(page.locator('.gcp-state')).toHaveText(/Needs you/);
  await capture(page, testInfo, 'side-approval');
  // Closing the side panel hides it but keeps the turn and its approval.
  await toggle(page).click();
  await expect(panel(page)).toBeHidden();
  await expect(toggle(page)).toHaveAttribute('data-badge', 'attention');
  await toggle(page).click();
  await expect(card).toBeVisible();
  await card.getByRole('button', { name: 'Keep graph', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeVisible();
  await expect(toggle(page)).toHaveAttribute('data-badge', '');
});

test('the host switching <html lang> re-renders the panel in the new language', async ({ page }) => {
  await readyPreview(page, 'host=v6&scenario=edit');
  await openCopilot(page);
  await expect(page.getByRole('combobox', { name: 'Message input', exact: true })).toBeVisible();
  await page.evaluate(() => { document.documentElement.lang = 'zh-TW'; });
  await expect(page.getByRole('combobox', { name: '訊息輸入', exact: true })).toBeVisible();
  await expect(page.getByText('Enter 送出 · Shift+Enter 換行 · / 叫出指令')).toBeVisible();
});

for (const lang of ['en', 'zh-TW'] as const) {
  test(`floating window on a host without the side dock (${lang})`, async ({ page }, testInfo) => {
    await readyPreview(page, `host=v5&scenario=edit&lang=${lang}`);
    await expect(toggle(page)).toHaveCount(0);
    await page.getByRole('button', { name: 'Graph Copilot', exact: true }).click();
    await expect(page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true })).toBeVisible();
    await expectFits(page);
    await capture(page, testInfo, `floating-${lang}`);
  });
}

test('light host tokens in the side dock, with an approval card', async ({ page }, testInfo) => {
  await readyPreview(page, 'host=v6&scenario=native-run&tokens=light');
  await openCopilot(page);
  await capture(page, testInfo, 'side-400-light-empty');
  await send(page, 'Run my current sample graph on CPU after I approve.');
  await expect(page.getByRole('group', { name: 'Run the current graph?', exact: true })).toBeVisible();
  await expectFits(page);
  await capture(page, testInfo, 'side-400-light-approval');
});

for (const view of ['chat', 'Skills', 'Settings'] as const) {
  test(`Tab through the ${view} view: every stop inside the panel shows a focus ring`, async ({ page }) => {
    await readyPreview(page, 'host=v6&scenario=edit');
    await openCopilot(page);
    if (view !== 'chat') await page.getByRole('button', { name: view, exact: true }).click();
    // Script focus shows no ring by design; start from it and measure real Tab stops.
    await page.getByRole('button', { name: 'New conversation', exact: true }).focus();
    const stops: Array<{ name: string; ring: boolean }> = [];
    for (let index = 0; index < 40; index++) {
      await page.keyboard.press('Tab');
      const focus = await page.evaluate(() => {
        const element = document.activeElement as HTMLElement | null;
        if (!element || !element.closest('.gcp-root')) return null;
        // A switch's visible ring is drawn on its track, next to the hidden input.
        const painted = element.matches('.gcp-switch input') ? element.nextElementSibling as HTMLElement : element;
        const style = getComputedStyle(painted);
        const composer = element.closest('.gcp-composer');
        const ring = (style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 1)
          || (style.boxShadow !== 'none' && style.boxShadow.includes('inset') === false)
          || (!!composer && getComputedStyle(composer).borderTopColor !== 'rgba(0, 0, 0, 0)' && element.tagName === 'TEXTAREA');
        return { name: element.getAttribute('aria-label') ?? element.textContent?.trim().slice(0, 40) ?? element.tagName, ring };
      });
      if (!focus) break;
      stops.push(focus);
    }
    expect(stops.length).toBeGreaterThan(5);
    expect(stops.filter((stop) => !stop.ring)).toEqual([]);
  });
}
