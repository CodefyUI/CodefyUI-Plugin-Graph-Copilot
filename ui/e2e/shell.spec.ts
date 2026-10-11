import { test, expect, readyPreview, openCopilot, capture } from './fixtures';

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
    test('shell screenshots, keyboard focus, draft and editable mock settings', async ({ page }, testInfo) => {
      await readyPreview(page, 'scenario=edit');
      const fab = page.getByRole('button', { name: 'Graph Copilot', exact: true });
      await expect(fab).toHaveAttribute('aria-expanded', 'false');
      await capture(page, testInfo, `${size.name}-host-widgets`);
      await openCopilot(page);
      await expect(fab).toHaveAttribute('aria-expanded', 'true');
      const dialog = page.getByRole('dialog', { name: 'Graph Copilot', exact: true });
      const composer = page.getByRole('textbox', { name: 'Message input', exact: true });
      await expect(composer).toBeFocused();
      await expect(page.getByRole('radio', { name: 'Edit', exact: true })).toBeChecked();
      await capture(page, testInfo, `${size.name}-welcome-shell`);
      const box = await dialog.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.y).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(size.width);
      expect(box!.y + box!.height).toBeLessThanOrEqual(size.height);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      if (size.reducedMotion === 'reduce') {
        const animation = await dialog.evaluate((element) => getComputedStyle(element).animationDuration);
        expect(animation.split(',').every((duration) => parseFloat(duration) <= 0.01)).toBe(true);
      }

      await composer.fill('Draft kept while I inspect settings.');
      await page.getByRole('button', { name: 'Settings', exact: true }).click();
      await expect(composer).toBeHidden();
      await expect(page.getByRole('combobox', { name: 'Model ID', exact: true })).toHaveValue('mock-graph-model');
      await expect(page.getByLabel('OpenAI API key', { exact: true })).toHaveValue('mock-key-not-a-real-credential');
      await page.getByRole('combobox', { name: 'Model ID', exact: true }).fill('mock-small-model');
      await page.getByLabel('OpenAI API key', { exact: true }).fill('another-mock-key');
      await page.getByRole('button', { name: 'Load available models from provider', exact: true }).click();
      await expect(page.getByRole('combobox', { name: 'Model ID', exact: true })).toBeVisible();
      await capture(page, testInfo, `${size.name}-settings`);
      await page.getByRole('button', { name: 'Settings', exact: true }).click();
      await expect(composer).toHaveValue('Draft kept while I inspect settings.');
      await composer.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(fab).toBeFocused();
      await fab.click();
      await expect(composer).toHaveValue('Draft kept while I inspect settings.');
      await expect(composer).toBeFocused();
    });
  });
}
