/** U1: with <html lang="zh-TW"> no English interface sentence is left. The
 * scan walks the panel's visible text and its aria-label/title/placeholder
 * attributes, skipping content that is data rather than interface (chat
 * text, code, tool names, the raw error from the provider, conversation
 * titles). What remains may contain ASCII only as whitelisted names. */
import type { Page } from '@playwright/test';
import { test, expect, readyPreview, openCopilot, capture } from './fixtures';

const panel = (page: Page) => page.getByRole('region', { name: 'Copilot', exact: true });

/** Names that stay as written in any language. */
const WHITELIST = [
  'Copilot', 'CodefyUI', 'Enter', 'Shift', 'Esc', 'Escape', 'Tab', 'Ctrl', 'Cmd', 'Alt',
  'OpenAI', 'OpenRouter', 'Anthropic', 'Codex', 'ChatGPT', 'Claude', 'API', 'URL', 'JSON', 'CSV', 'PDF', 'SHA-256',
  'Hedges g', 'loss', 'token', 'tokens', 'git', 'AGENTS.md', 'SKILL.md', 'Agent Skills', 'agent', 'Skills', 'Lab',
  'Edit', 'Ask', 'low', 'medium', 'high', 'xhigh', 'minimal', 'none', 'sk-...', 'Base URL', 'mock', 'Mock',
];
const WORDS = /[A-Za-z][A-Za-z'’-]+(?:\s+[A-Za-z][A-Za-z'’-]+)+/g;

async function englishSentences(page: Page): Promise<string[]> {
  const chunks = await panel(page).evaluate((root) => {
    // Data, not interface: chat text, code and identifiers, raw errors, user titles, model names.
    const SKIP = '.gcp-bubble, code, pre, kbd, .gcp-stage-name, .gcp-stage-args, .gcp-stage-detail, .gcp-run-result-error, '
      + '.gcp-error-text, .gcp-history-title, .gcp-model-name, option, select, .gcp-skill-body, .gcp-md, [data-user-content], .gcp-step-tag ~ .gcp-bubble';
    const out: string[] = [];
    // User and model data marked in the components, also when it is quoted inside a label.
    const data = [...root.querySelectorAll('[data-user-content]')].map((el) => el.textContent?.trim() ?? '').filter(Boolean)
      .sort((a, b) => b.length - a.length);
    const strip = (text: string) => data.reduce((rest, value) => rest.split(value).join(' '), text);
    const visible = (el: Element) => {
      const style = getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && (el as HTMLElement).offsetParent !== null;
    };
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || parent.closest(SKIP) || !visible(parent)) continue;
      const text = node.textContent?.trim();
      if (text) out.push(strip(text));
    }
    for (const el of root.querySelectorAll('[aria-label], [title], [placeholder], [alt]')) {
      if (el.closest(SKIP)) continue;
      for (const name of ['aria-label', 'title', 'placeholder', 'alt']) {
        const value = el.getAttribute(name)?.trim();
        if (value) out.push(strip(value));
      }
    }
    return out;
  });
  const found = new Set<string>();
  for (const chunk of chunks) {
    let text = chunk;
    // Identifiers: tool names, model ids, file paths, node ids, run ids.
    text = text.replace(/\S*[_/\\.:@#]\S*/g, ' ').replace(/\b[a-z]+(-[a-z0-9]+)+\b/g, ' ').replace(/\b\w*\d\w*\b/g, ' ');
    for (const name of [...WHITELIST].sort((a, b) => b.length - a.length)) text = text.split(name).join(' ');
    for (const match of text.matchAll(WORDS)) found.add(`${match[0]}  ⟵  ${chunk}`);
  }
  return [...found];
}

async function expectChinese(page: Page, where: string): Promise<void> {
  expect(await englishSentences(page), `English interface text in ${where}`).toEqual([]);
}

async function sendZh(page: Page, text: string): Promise<void> {
  await page.getByRole('combobox', { name: '訊息輸入', exact: true }).fill(text);
  await page.getByRole('button', { name: '送出訊息', exact: true }).click();
}

async function view(page: Page, name: string): Promise<void> {
  const nav = panel(page).getByRole('navigation', { name: 'Copilot 頁面' });
  const more = panel(page).getByRole('button', { name: '更多操作', exact: true });
  const target = nav.getByRole('button', { name, exact: true });
  if (!(await target.isVisible()) && await more.isVisible()) await more.click();
  await panel(page).getByRole('button', { name, exact: true }).first().click();
}

test.use({ viewport: { width: 1440, height: 900 } });

test('U1: zh-TW failure, Stop-free retry block and every view are Chinese', async ({ page }, testInfo) => {
  await readyPreview(page, 'host=v6&scenario=http-error&lang=zh-TW&panelWidth=560');
  await openCopilot(page);
  await expectChinese(page, 'empty chat');
  await sendZh(page, '描述我的範例圖。');
  await expect(panel(page).locator('.gcp-run-result.failed')).toBeVisible();
  await expect(panel(page).getByRole('button', { name: '重試', exact: true })).toBeVisible();
  await capture(page, testInfo, 'zh-failure');
  await expectChinese(page, 'failed run');

  for (const [name, where] of [['實驗室', 'Lab'], ['對話紀錄', 'History'], ['設定', 'Settings'], ['技能', 'Skills'], ['代理對話', 'Chat']] as const) {
    await view(page, name);
    await page.waitForTimeout(300);
    await capture(page, testInfo, `zh-${where.toLowerCase()}`);
    await expectChinese(page, where);
  }
});

test('U1: zh-TW approval card, declined result and saved Lab evidence are Chinese', async ({ page }, testInfo) => {
  await readyPreview(page, 'host=v6&scenario=clear&lang=zh-TW&panelWidth=560');
  await openCopilot(page);
  await sendZh(page, '清空我的圖，重新開始。');
  await expect(panel(page).getByRole('button', { name: '清空圖', exact: true })).toBeVisible();
  await expect(panel(page).locator('.gcp-stage.waiting')).toContainText('等待你核准');
  await capture(page, testInfo, 'zh-approval');
  await expectChinese(page, 'approval card');
  await panel(page).getByRole('button', { name: '保留圖', exact: true }).click();
  await expect(panel(page).locator('.gcp-run-result')).toBeVisible();
  await expect(panel(page).locator('.gcp-stage.not_executed')).toContainText('未執行');
  await capture(page, testInfo, 'zh-declined');
  await expectChinese(page, 'declined clear');

  await readyPreview(page, 'host=v6&scenario=lab-evidence&lang=zh-TW&panelWidth=560');
  await openCopilot(page);
  await view(page, '實驗室');
  await page.waitForTimeout(300);
  await capture(page, testInfo, 'zh-lab-evidence');
  await expectChinese(page, 'Lab with saved evidence');
});
