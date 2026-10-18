import { test, expect, readyPreview, openCopilot, send, capture } from './fixtures';

for (const width of [375, 1440]) {
  test.describe(`${width}px host-token override`, () => {
    test.use({ viewport: { width, height: width === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
    test('test palette stays readable without claiming editor light-mode support', async ({ page }, testInfo) => {
      await readyPreview(page, 'scenario=edit&tokens=light');
      await openCopilot(page);
      const dialog = page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
      const colors = await dialog.evaluate((element) => {
        const style = getComputedStyle(element);
        return { foreground: style.color, background: style.backgroundColor };
      });
      expect(colors).toEqual({ foreground: 'rgb(71, 85, 105)', background: 'rgb(255, 255, 255)' });
      const composer = page.getByRole('textbox', { name: 'Message input', exact: true });
      const composerColors = await composer.evaluate((element) => {
        const style = getComputedStyle(element);
        return { foreground: style.color, background: style.backgroundColor };
      });
      // The textarea is transparent inside one composed dock; audit the
      // actually painted parent surface rather than inventing a filled input.
      expect(composerColors).toEqual({ foreground: 'rgb(23, 32, 51)', background: 'rgba(0, 0, 0, 0)' });
      const dock = dialog.locator('.gcp-input-row');
      await expect(dock).toBeVisible();
      await expect(dock).toHaveCSS('background-color', 'rgb(248, 250, 252)');
      await expect(page.getByText('What should change?', { exact: true })).toHaveCSS('color', 'rgb(23, 32, 51)');
      await composer.focus();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(composer).toBeFocused();
      expect(await composer.evaluate((element) => element.matches(':focus-visible'))).toBe(true);
      await expect(dock).toHaveCSS('outline-style', 'solid');
      await expect(dock).toHaveCSS('outline-width', '2px');
      await expect(dock).toHaveCSS('outline-color', 'rgb(14, 116, 144)');
      await capture(page, testInfo, `${width}-test-light-token-welcome`);
      await send(page, 'Add Normalize between Dataset and Preview, with scale 0.5.');
      await expect(dialog.getByRole('status').filter({ has: page.getByText('Completed', { exact: true }) })).toBeVisible();
      await capture(page, testInfo, `${width}-test-light-token-validated`);
      await readyPreview(page, 'scenario=clear&tokens=light');
      await openCopilot(page);
      await send(page, 'Clear my graph and start over.');
      await expect(page.getByRole('dialog', { name: 'Clear the current graph?', exact: true })).toBeVisible();
      await capture(page, testInfo, `${width}-test-light-token-confirmation`);
      await page.getByRole('button', { name: 'Keep graph', exact: true }).click();
    });
  });
}
