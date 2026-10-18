import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import type { PreviewSnapshot } from '../preview/types';

interface BrowserEvidence {
  console: Array<{ type: string; text: string }>;
  errors: string[];
  networkLeaks: string[];
}

export const test = base.extend<{ evidence: BrowserEvidence }>({
  evidence: [async ({ page, context, baseURL }, use, testInfo) => {
    const evidence: BrowserEvidence = { console: [], errors: [], networkLeaks: [] };
    const origin = new URL(baseURL!).origin;
    page.on('console', (message) => { evidence.console.push({ type: message.type(), text: message.text() }); });
    page.on('pageerror', (error) => { evidence.errors.push(error.message); });
    // Defense in depth: even a new product path cannot contact the real host or
    // a provider. Only Vite assets/documents on this test's own port are allowed.
    await context.route('**/*', async (route) => {
      const url = new URL(route.request().url());
      if (url.origin === origin && !url.pathname.startsWith('/api/')) await route.continue();
      else { evidence.networkLeaks.push(`${route.request().method()} ${url.origin}${url.pathname}`); await route.abort('blockedbyclient'); }
    });
    await use(evidence);
    await testInfo.attach('browser-console.json', { body: Buffer.from(JSON.stringify(evidence, null, 2)), contentType: 'application/json' });
    expect(evidence.networkLeaks, 'No provider or real-host network is allowed').toEqual([]);
    expect(evidence.errors, 'No uncaught browser errors').toEqual([]);
    expect(evidence.console.filter((message) => message.type === 'error'), 'No browser console errors').toEqual([]);
    if (await page.evaluate(() => Boolean(window.__graphCopilotPreview))) {
      expect((await snapshot(page)).blocked, 'No unexpected mock-host route or direct-network attempt').toEqual([]);
    }
  }, { auto: true }],
});

export { expect };

export function chatRequests(state: PreviewSnapshot) {
  return state.requests.filter((request) => request.url === '/api/llm/chat');
}

/** Known startup discovery is read-only. Do not let it hide graph validation,
 * native auth/execute requests, or an accidental model dispatch. */
export function actionRequests(state: PreviewSnapshot) {
  return state.requests.filter((request) =>
    request.url !== '/api/llm/models' && request.url !== '/api/llm/codex/status' && request.url !== '/api/runs?limit=1');
}

export async function snapshot(page: Page): Promise<PreviewSnapshot> {
  return page.evaluate(() => window.__graphCopilotPreview.snapshot());
}

export async function readyPreview(page: Page, query = ''): Promise<void> {
  // A reload replaces the in-memory ledger, so assert its network boundary
  // first rather than letting an earlier scenario's blocked attempt disappear.
  if (await page.evaluate(() => Boolean(window.__graphCopilotPreview))) {
    expect((await snapshot(page)).blocked, 'Previous scenario had no unexpected network attempts').toEqual([]);
  }
  await page.goto(`/${query ? `?${query}` : ''}`);
  // A pending SSE scenario intentionally never reaches networkidle. The actual
  // ready control and mounted FAB are the synchronization boundary instead.
  await expect(page.getByRole('status', { name: 'Fixture status' })).toHaveText('Fixture ready.');
}

export async function openCopilot(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Graph Copilot', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Graph Copilot agent workbench', exact: true })).toBeVisible();
}

export async function send(page: Page, text: string): Promise<void> {
  await page.getByRole('textbox', { name: 'Message input', exact: true }).fill(text);
  await page.getByRole('button', { name: 'Send message', exact: true }).click();
}

export async function releaseResponse(page: Page, expectedURL: string): Promise<void> {
  await expect.poll(async () => (await snapshot(page)).pending[0]?.url).toBe(expectedURL);
  // Use the real fixture control without opening overlay-host chrome or sleeps.
  await page.evaluate(() => window.__graphCopilotPreview.releaseNext());
}

export async function capture(page: Page, testInfo: TestInfo, name: string): Promise<void> {
  const path = testInfo.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: false, animations: 'disabled' });
  await testInfo.attach(name, { path, contentType: 'image/png' });
  await testInfo.attach(`${name}-fixture.json`, { body: Buffer.from(JSON.stringify(await snapshot(page), null, 2)), contentType: 'application/json' });
}
