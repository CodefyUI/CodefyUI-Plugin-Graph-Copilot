import type { Page } from '@playwright/test';
import { test, expect, readyPreview, openCopilot, snapshot, capture, actionRequests } from './fixtures';
import { expectControlContrast, expectKeyboardFocus } from './accessibility';

const workbench = (page: Page) => page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true });
const composer = (page: Page) => page.getByRole('textbox', { name: 'Message input', exact: true });

const environments = [
  { name: 'dark-narrow', width: 375, height: 812, light: false, reducedMotion: 'no-preference' as const, forcedColors: 'none' as const },
  { name: 'light-wide', width: 1440, height: 900, light: true, reducedMotion: 'no-preference' as const, forcedColors: 'none' as const },
  { name: 'dark-wide-reduced', width: 1440, height: 900, light: false, reducedMotion: 'reduce' as const, forcedColors: 'none' as const },
  { name: 'light-narrow-reduced', width: 375, height: 812, light: true, reducedMotion: 'reduce' as const, forcedColors: 'none' as const },
  { name: 'forced-colors-narrow', width: 375, height: 812, light: false, reducedMotion: 'reduce' as const, forcedColors: 'active' as const },
];

async function expectContained(page: Page, width: number, height: number): Promise<void> {
  const box = await workbench(page).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

for (const environment of environments) {
  test.describe(environment.name, () => {
    test.use({ viewport: { width: environment.width, height: environment.height }, reducedMotion: environment.reducedMotion, forcedColors: environment.forcedColors });

    test('setup, empty/unavailable graph and saved Lab evidence stay truthful and usable', async ({ page }, testInfo) => {
      const palette = environment.light ? '&tokens=light' : '';
      await readyPreview(page, `scenario=setup-required${palette}`);
      await openCopilot(page);
      const setup = page.getByRole('button', { name: 'Open settings to configure a provider', exact: true });
      await expect(setup).toBeVisible();
      await expect(setup).toBeFocused();
      await expect(composer(page)).toBeDisabled();
      await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeDisabled();
      await expectControlContrast(setup, `${environment.name} setup CTA`);
      await expectKeyboardFocus(page, setup, `${environment.name} setup CTA`);
      await expectContained(page, environment.width, environment.height);
      await capture(page, testInfo, `${environment.name}-setup-required`);
      await setup.click();
      await expect(page.getByRole('button', { name: 'Settings', exact: true })).toHaveAttribute('aria-current', 'page');
      await expect(page.getByLabel('OpenAI API key', { exact: true })).toHaveValue('');
      expect(actionRequests(await snapshot(page))).toEqual([]);
      await page.getByLabel('OpenAI API key', { exact: true }).fill('mock-configured-key');
      await page.getByRole('button', { name: 'Agent chat', exact: true }).click();
      await expect(composer(page)).toBeEnabled();
      await expect(composer(page)).toBeFocused();
      expect(actionRequests(await snapshot(page))).toEqual([]);

      await readyPreview(page, `scenario=empty-graph${palette}`);
      await openCopilot(page);
      await expect(page.getByLabel('Current graph context', { exact: true })).toContainText('0 nodes');
      await expect(page.getByRole('button', { name: 'Build an image classifier', exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Build an image classifier', exact: true }).click();
      await expect(composer(page)).toHaveValue('Build a small CNN image classifier');
      await expect(composer(page)).toBeFocused();
      expect((await snapshot(page)).graph.nodes).toEqual([]);
      expect(actionRequests(await snapshot(page))).toEqual([]);
      await capture(page, testInfo, `${environment.name}-empty-graph`);

      await readyPreview(page, `scenario=unavailable-context${palette}`);
      await openCopilot(page);
      const unavailable = page.getByLabel('Current graph context', { exact: true });
      await expect(unavailable).toHaveText('Graph unavailable');
      await expect(unavailable).not.toContainText('0 nodes');
      expect(actionRequests(await snapshot(page))).toEqual([]);
      expect((await snapshot(page)).receipts).toEqual([]);
      await capture(page, testInfo, `${environment.name}-unavailable-context`);

      await readyPreview(page, `scenario=lab-evidence${palette}`);
      await openCopilot(page);
      const labNavigation = page.getByRole('button', { name: 'Experiments lab', exact: true });
      await labNavigation.click();
      await expect(labNavigation).toHaveAttribute('aria-current', 'page');
      await expect(page.getByRole('heading', { name: 'Experiment lab', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Study objective', exact: true })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Observed result', exact: true })).toBeVisible();
      const evidence = page.getByRole('table', { name: 'Candidate evidence', exact: true });
      await expect(evidence).toHaveCount(1);
      await expect(evidence.getByRole('columnheader', { name: 'Candidate', exact: true })).toBeVisible();
      await expect(evidence.getByRole('row').filter({ hasText: 'LR 0.001' })).toContainText('0.91');
      const failed = evidence.getByRole('row').filter({ hasText: 'LR 0.01' });
      await expect(failed).toContainText(/failed/i);
      await expect(failed).toContainText('0/3 objective values');
      await expect(failed.getByRole('button', { name: 'Download graph for LR 0.01', exact: true })).toBeDisabled();
      await expect(failed).not.toContainText('0.0000');
      await expect(evidence.locator('thead')).not.toHaveCSS('display', 'none');
      await expectControlContrast(labNavigation, `${environment.name} selected Lab nav`);
      await expectKeyboardFocus(page, labNavigation, `${environment.name} selected Lab nav`);
      await expectContained(page, environment.width, environment.height);
      await capture(page, testInfo, `${environment.name}-lab-evidence`);
      const errors = failed.getByText('Errors (2)', { exact: true });
      await errors.scrollIntoViewIfNeeded();
      await errors.click();
      await expect(failed).toContainText('Run 1 failed: validation accuracy was unavailable after execution.');
      await expect(failed).toContainText('Run 2 failed: expected Accuracy.accuracy but the output contained loss only.');
      await capture(page, testInfo, `${environment.name}-lab-candidate-errors`);
      expect((await snapshot(page)).experimentSessions).toHaveLength(1);
      expect((await snapshot(page)).executions).toEqual([]);
      expect((await snapshot(page)).receipts).toEqual([]);
      expect(actionRequests(await snapshot(page))).toEqual([]);
    });
  });
}
