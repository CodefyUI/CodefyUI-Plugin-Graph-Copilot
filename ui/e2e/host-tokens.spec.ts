import { test, expect, readyPreview, openCopilot, send, capture } from './fixtures';

for (const width of [375, 1440]) {
  test.describe(`${width}px host-token override`, () => {
    test.use({ viewport: { width, height: width === 375 ? 812 : 900 }, reducedMotion: 'reduce' });
    test('test palette stays readable without claiming editor light-mode support', async ({ page }, testInfo) => {
      await readyPreview(page, 'scenario=edit&tokens=light');
      await openCopilot(page);
      const dialog = page.getByRole('dialog', { name: 'Graph Copilot', exact: true });
      const colors = await dialog.evaluate((element) => {
        const style = getComputedStyle(element);
        return { foreground: style.color, background: style.backgroundColor };
      });
      expect(colors).toEqual({ foreground: 'rgb(23, 32, 51)', background: 'rgb(248, 250, 252)' });
      await capture(page, testInfo, `${width}-test-light-token-welcome`);
      await send(page, 'Add Normalize between Dataset and Preview, with scale 0.5.');
      await expect(dialog.getByRole('status').filter({ has: page.getByText('Completed', { exact: true }) })).toBeVisible();
      await capture(page, testInfo, `${width}-test-light-token-validated`);
      await readyPreview(page, 'scenario=clear&tokens=light');
      await openCopilot(page);
      await send(page, 'Clear my graph and start over.');
      await expect(page.getByRole('group', { name: 'Confirm clearing the graph' })).toBeVisible();
      await capture(page, testInfo, `${width}-test-light-token-confirmation`);
      await page.getByRole('button', { name: 'Keep graph', exact: true }).click();
    });
  });
}
