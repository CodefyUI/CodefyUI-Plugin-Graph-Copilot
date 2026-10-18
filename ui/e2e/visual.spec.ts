import { test, expect, readyPreview, openCopilot, send, snapshot, capture } from './fixtures';

const sizes = [
  { name: '375-narrow', width: 375, height: 812, reducedMotion: 'no-preference' as const },
  { name: '768-tablet', width: 768, height: 1024, reducedMotion: 'no-preference' as const },
  { name: '1440-desktop', width: 1440, height: 900, reducedMotion: 'no-preference' as const },
  { name: '375-short', width: 375, height: 520, reducedMotion: 'no-preference' as const },
  { name: '1440-short', width: 1440, height: 480, reducedMotion: 'no-preference' as const },
  { name: '375-reduced-motion', width: 375, height: 812, reducedMotion: 'reduce' as const },
];

for (const size of sizes) {
  test.describe(size.name, () => {
    test.use({ viewport: { width: size.width, height: size.height }, reducedMotion: size.reducedMotion });

    test('welcome, validated edit, partial error and confirmation screenshots', async ({ page }, testInfo) => {
      await readyPreview(page, 'scenario=edit');
      await openCopilot(page);
      const dialog = page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
      await expect(page.getByRole('radio', { name: 'Edit', exact: true })).toBeChecked();
      await expect(page.getByRole('textbox', { name: 'Message input' })).toBeFocused();
      await capture(page, testInfo, `${size.name}-welcome`);
      await send(page, 'Add Normalize between Dataset and Preview, with scale 0.5.');
      await expect(dialog.getByRole('status').filter({ has: page.getByText('Completed', { exact: true }) })).toBeVisible();
      await expect(page.getByLabel('Graph counts', { exact: true })).toContainText('4 nodes, 3 edges');
      expect((await snapshot(page)).receipts).toHaveLength(1);
      await capture(page, testInfo, `${size.name}-validated-edit`);
      // Inspect real product layout, never override it in preview CSS.
      const box = await dialog.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(size.width);
      expect(box!.y + box!.height).toBeLessThanOrEqual(size.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

      await readyPreview(page, 'scenario=partial-error');
      await openCopilot(page);
      await send(page, 'Add a normalization step to my graph.');
      await expect(page.getByRole('button', { name: 'Continue from current graph', exact: true })).toBeVisible();
      await expect(page.getByLabel('Graph counts', { exact: true })).toContainText('4 nodes, 3 edges');
      await capture(page, testInfo, `${size.name}-partial-error`);

      await readyPreview(page, 'scenario=clear');
      await openCopilot(page);
      await send(page, 'Clear my graph and start over.');
      await expect(page.getByRole('dialog', { name: 'Clear the current graph?', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Keep graph', exact: true })).toBeFocused();
      expect((await snapshot(page)).receipts).toEqual([]);
      await capture(page, testInfo, `${size.name}-clear-confirmation`);
      await page.getByRole('button', { name: 'Keep graph', exact: true }).click();
    });
  });
}
