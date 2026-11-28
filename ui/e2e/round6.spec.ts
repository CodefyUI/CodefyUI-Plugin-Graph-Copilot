/** Round 6 against a mock CodefyUI 3.5.0 host (plugin API v7): the save,
 * write and read approval cards, the reasoning run bar, the corrected-ops
 * summary and a model error in the host's words. Screenshots at 1470x840
 * (13-inch) in English and Traditional Chinese go to the test output. */
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { capture, openCopilot, readyPreview, releaseResponse, snapshot } from './fixtures';
import { zhTW } from '../src/i18n/zh-TW';
import { en } from '../src/i18n/en';

test.use({ viewport: { width: 1470, height: 840 } });

const LANGS = ['en', 'zh-TW'] as const;
let current: 'en' | 'zh-TW' = 'en';
async function send(page: Page, text: string): Promise<void> {
  const words = current === 'en' ? en : { ...en, ...zhTW };
  await page.getByRole('combobox', { name: words['composer.aria'], exact: true }).fill(text);
  await page.getByRole('button', { name: words['composer.send'], exact: true }).click();
}
const t = (lang: string, en: string, zh: string) => (lang === 'en' ? en : zh);

for (const lang of LANGS) {
  const q = (scenario: string) => { current = lang; return `scenario=${scenario}&lang=${lang}&panelWidth=520`; };

  test(`[${lang}] save card: save as a new graph, then the tab is bound`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-save'));
    await openCopilot(page);
    await send(page, 'Save this graph as iris-mlp.');
    const card = page.getByRole('group', { name: t(lang, 'Save as iris-mlp?', '存成 iris-mlp？') });
    await expect(card).toBeVisible();
    await capture(page, testInfo, `r6-save-card-${lang}`);
    await card.getByRole('button', { name: t(lang, 'Save', '儲存'), exact: true }).click();
    await expect.poll(async () => (await snapshot(page)).savedGraphs).toEqual([{ name: 'iris-mlp', overwrite: false }]);
    await expect(page.getByText(t(lang, 'Completed', '已完成'), { exact: true }).last()).toBeVisible();
  });

  test(`[${lang}] save card: replacing a saved graph is the danger style`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-save-replace'));
    await openCopilot(page);
    await send(page, 'Save this over the train graph; I agree to replace it.');
    const card = page.getByRole('group', { name: t(lang, 'Replace the saved graph train?', '覆蓋已存的圖 train？') });
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/gcp-approval--danger/);
    await capture(page, testInfo, `r6-save-replace-card-${lang}`);
    await card.getByRole('button', { name: t(lang, 'Cancel', '取消'), exact: true }).click();
    expect((await snapshot(page)).savedGraphs).toEqual([]);
  });

  test(`[${lang}] write card: a new mods node shows its code and the trust warning`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-write-mods'));
    await openCopilot(page);
    await send(page, 'Add a Scale node to this project.');
    const card = page.getByRole('group', { name: t(lang, 'Create mods/nodes/scale.py?', '建立 mods/nodes/scale.py？') });
    await expect(card).toBeVisible();
    await expect(card).toContainText('class ScaleNode(BaseNode)');
    await expect(card).toContainText(t(lang, 'code that runs on your computer', '會在你電腦上執行的程式碼'));
    await capture(page, testInfo, `r6-write-mods-card-${lang}`);
    await card.getByRole('button', { name: t(lang, 'Create file', '建立檔案') }).click();
    await expect(page.getByText(t(lang, 'Completed', '已完成'), { exact: true }).last()).toBeVisible();
  });

  test(`[${lang}] write card: AGENTS.md shows a diff in the danger style`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-write-agents'));
    await openCopilot(page);
    await send(page, 'Add a rule to AGENTS.md: always seed runs with 7.');
    const card = page.getByRole('group', { name: t(lang, 'Change AGENTS.md?', '修改 AGENTS.md？') });
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/gcp-approval--danger/);
    await expect(card.locator('.gcp-diff-add')).toContainText('+ Always seed runs with 7.');
    await capture(page, testInfo, `r6-write-agents-card-${lang}`);
    await card.getByRole('button', { name: t(lang, 'Cancel', '取消'), exact: true }).click();
  });

  test(`[${lang}] read card: a data file names its size and the provider`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-read-data'));
    await openCopilot(page);
    await send(page, 'Show me the first rows of data/train.csv.');
    const card = page.getByRole('group', { name: t(lang, 'Send data/train.csv to the model provider?', '把 data/train.csv 送給模型供應商？') });
    await expect(card).toBeVisible();
    await expect(card).toContainText('openai (mock-graph-model)');
    await capture(page, testInfo, `r6-read-data-card-${lang}`);
    await card.getByRole('button', { name: t(lang, 'Read and send', '讀取並送出') }).click();
    await expect(page.getByText(t(lang, 'Completed', '已完成'), { exact: true }).last()).toBeVisible();
  });

  test(`[${lang}] run bar: reasoning with seconds, never the reasoning text`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-reasoning'));
    await openCopilot(page);
    await send(page, 'Which node should I add for normalization?');
    const runbar = page.getByRole('status', { name: t(lang, 'Agent activity', '代理動態') });
    await expect(runbar).toContainText(t(lang, 'Reasoning', '推理中'));
    await expect(page.getByText('mock hidden reasoning')).toHaveCount(0);
    await capture(page, testInfo, `r6-reasoning-runbar-${lang}`);
    await releaseResponse(page, '/api/llm/chat');
    await expect(page.getByText('Normalize', { exact: true }).last()).toBeVisible();
    await expect(page.getByText('mock hidden reasoning')).toHaveCount(0);
  });

  test(`[${lang}] summary: a failed connect fixed later reads as completed with a note`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-corrected'));
    await openCopilot(page);
    await send(page, 'Insert Normalize between Dataset and Preview.');
    const result = page.getByRole('status').filter({ hasText: t(lang, 'Completed', '已完成') }).last();
    await expect(result).toContainText(t(lang, '1 operation failed and was corrected later in this run', '1 個操作失敗後已在這一回合修正'));
    await capture(page, testInfo, `r6-corrected-summary-${lang}`);
  });

  test(`[${lang}] a model error shows the host's message`, async ({ page }, testInfo) => {
    await readyPreview(page, q('r6-model-error'));
    await openCopilot(page);
    await send(page, 'Explain the graph.');
    await expect(page.getByRole('alert').filter({ hasText: 'ReadTimeout: the endpoint sent no data for 600 seconds' }).first()).toBeVisible();
    await capture(page, testInfo, `r6-model-error-${lang}`);
  });
}

test('a 3.4.0 host (API v6) gets none of the round-6 tools; a v7 host gets their rules', async ({ page }) => {
  current = 'en';
  for (const [host, expected] of [['host=v6', false], ['host=v7', true]] as const) {
    await readyPreview(page, `${host}&scenario=ask&skillInstall=ok`);
    await openCopilot(page);
    await send(page, 'What can you do?');
    await expect.poll(async () => (await snapshot(page)).requests.find((request) => request.url === '/api/llm/chat')?.system ?? '').not.toBe('');
    const system = (await snapshot(page)).requests.find((request) => request.url === '/api/llm/chat')!.system!;
    expect(system.includes('list_data_files'), host).toBe(expected);
    expect((await snapshot(page)).hostVersion).toBe(host === 'host=v6' ? 6 : 7);
  }
});
