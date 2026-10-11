import type { PreviewSnapshot } from '../preview/types';
import { test, expect, readyPreview, openCopilot, send, snapshot, releaseResponse } from './fixtures';

const requestCount = (state: PreviewSnapshot) => state.requests.filter((request) => request.url === '/api/llm/chat').length;

for (const navigation of ['Close panel', 'Settings', 'Conversation history'] as const) {
  test(`${navigation} stops a pending run without dropping the draft or applying edits`, async ({ page }) => {
    await readyPreview(page, 'scenario=pending');
    await openCopilot(page);
    await send(page, 'Inspect this graph while I test Stop.');
    await expect.poll(async () => (await snapshot(page)).pending[0]?.kind).toBe('stream');
    await page.getByRole('button', { name: navigation, exact: true }).click();
    await expect.poll(async () => (await snapshot(page)).requests[0].status).toBe('aborted');
    expect((await snapshot(page)).receipts).toEqual([]);
    if (navigation === 'Close panel') await openCopilot(page);
    else await page.getByRole('button', { name: navigation, exact: true }).click();
    await expect(page.getByRole('textbox', { name: 'Message input', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stop generation', exact: true })).toHaveCount(0);
    expect(requestCount(await snapshot(page))).toBe(1);
  });
}

test('Stop while validating preserves real applied edits and cancels validation', async ({ page }) => {
  await readyPreview(page, 'scenario=edit&manual=1');
  await openCopilot(page);
  await send(page, 'Add Normalize between Dataset and Preview, with scale 0.5.');
  await releaseResponse(page, '/api/llm/chat');
  await releaseResponse(page, '/api/llm/chat');
  await releaseResponse(page, '/api/llm/chat');
  await expect.poll(async () => (await snapshot(page)).pending[0]?.url).toBe('/api/graph/validate');
  const before = (await snapshot(page)).graph;
  await page.getByRole('button', { name: 'Stop generation', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Continue from current graph', exact: true })).toBeVisible();
  const state = await snapshot(page);
  expect(state.graph).toEqual(before);
  expect(state.receipts).toHaveLength(1);
  expect(state.pending).toEqual([]);
  expect(state.requests.find((request) => request.url === '/api/graph/validate')?.status).toBe('aborted');
  await expect(page.getByRole('log', { name: 'Conversation' })).toContainText('Applied changes are not undone by Stop');
});

test('failed attachments block Send until removed, and multi-line keyboard input stays local', async ({ page }) => {
  await readyPreview(page, 'scenario=ask');
  await openCopilot(page);
  await page.getByRole('radio', { name: 'Ask', exact: true }).click();
  const composer = page.getByRole('textbox', { name: 'Message input', exact: true });
  await composer.fill('Explain the sample graph.');
  await composer.press('Shift+Enter');
  await expect(composer).toHaveValue('Explain the sample graph.\n');
  expect((await snapshot(page)).requests).toEqual([]);
  // Exceeding the text-file bound fails intake deterministically; no PDF/CDN.
  // The browser file input is intentionally hidden and has no accessible role.
  await page.locator('input[type="file"]').setInputFiles({ name: 'too-large.txt', mimeType: 'text/plain', buffer: Buffer.alloc(2 * 1024 * 1024 + 1) });
  await expect(page.getByRole('button', { name: 'Remove too-large.txt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Remove too-large.txt', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled();
  expect((await snapshot(page)).requests).toEqual([]);
});
