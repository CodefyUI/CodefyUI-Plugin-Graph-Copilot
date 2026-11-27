/** Agent Skills against the mock host: a v6 host with skills, and a v5
 * (CodefyUI 3.2.0) host where the feature is silently off. */
import { chatRequests, expect, openCopilot, readyPreview, send, snapshot, test } from './fixtures';

test('acceptance 4: load_skill then read_skill_file; reading before loading is refused', async ({ page }) => {
  await readyPreview(page, 'scenario=skills');
  await openCopilot(page);
  await send(page, 'Use the build-graph skill to explain how ports connect.');
  await expect(page.getByText('Ports connect only to the same type')).toBeVisible();
  const state = await snapshot(page);
  const urls = state.requests.map((request) => request.url);
  // The early read never reached the host; the later one did, after the load.
  const fileReads = urls.filter((url) => url.startsWith('/api/skills/file'));
  expect(fileReads).toEqual(['/api/skills/file?id=builtin%2Fbuild-graph&path=references%2Fports.md']);
  expect(urls.indexOf('/api/skills/builtin/build-graph')).toBeLessThan(urls.indexOf(fileReads[0]));
  const chats = chatRequests(state);
  expect(chats[0].tools).toEqual(expect.arrayContaining(['load_skill', 'read_skill_file']));
  const results = chats.at(-1)!.toolResults!;
  expect(results[0]).toContain('Call load_skill first');
  expect(results[1]).toContain('<<<BEGIN SKILL build-graph>>>');
  expect(results[2]).toContain('connect only to the same type');
});

test('acceptance 6: AGENTS.md and the skills list are in the system prompt', async ({ page }) => {
  await readyPreview(page, 'scenario=skills');
  await openCopilot(page);
  await send(page, 'Hello');
  await expect(page.getByText('Ports connect only to the same type')).toBeVisible();
  const system = chatRequests(await snapshot(page))[0].system!;
  expect(system).toContain('## Project instructions');
  expect(system).toContain('Seed every run with 7.');
  expect(system).toContain('- build-graph: Build or edit a CodefyUI graph');
});

test('acceptance 3: the Skills view lists the built-ins; one turned off leaves the next prompt', async ({ page }) => {
  await readyPreview(page, 'host=v6&scenario=ask');
  await openCopilot(page);
  await page.getByRole('button', { name: 'Skills', exact: true }).click();
  const builtins = page.getByRole('region', { name: 'Built-in' });
  await expect(builtins.getByRole('switch')).toHaveCount(3);
  await builtins.getByRole('switch', { name: 'Use run-experiments' }).click();
  await expect(builtins.getByRole('switch', { name: 'Use run-experiments' })).not.toBeChecked();
  await page.getByRole('button', { name: 'Agent chat' }).click();
  await send(page, 'Explain what my current graph does without changing it.');
  await expect(page.getByText('No graph changes were made.')).toBeVisible();
  const system = chatRequests(await snapshot(page))[0].system!;
  expect(system).toContain('- build-graph:');
  expect(system).not.toContain('run-experiments');
});

test('acceptance 5: the slash menu works from the keyboard with combobox ARIA', async ({ page }) => {
  await readyPreview(page, 'host=v6&scenario=ask');
  await openCopilot(page);
  const input = page.getByRole('combobox', { name: 'Message input', exact: true });
  await input.fill('/');
  const listbox = page.getByRole('listbox', { name: 'Commands and skills' });
  await expect(listbox).toBeVisible();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(input).toHaveAttribute('aria-controls', (await listbox.getAttribute('id'))!);
  const options = listbox.getByRole('option');
  await expect(options.first()).toHaveAttribute('aria-selected', 'true');
  await input.press('ArrowDown');
  await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(input).toHaveAttribute('aria-activedescendant', (await options.nth(1).getAttribute('id'))!);
  await input.press('Escape');
  await expect(listbox).toBeHidden();
  // Escape closed only the menu: the docked panel (a v6 host) stays open.
  await expect(page.getByRole('region', { name: 'Copilot', exact: true })).toBeVisible();
  await input.fill('/build');
  await input.press('Enter');
  await expect(page.getByRole('list', { name: 'Skills in this conversation' })).toContainText('/build-graph');
  await input.fill('/skil');
  await input.press('Enter');
  await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible();
});

test('security 9: a server that refuses installs shows its message and hides install', async ({ page }) => {
  await readyPreview(page, 'host=v6&scenario=ask&skillInstall=refused');
  await openCopilot(page);
  await page.getByRole('button', { name: 'Skills', exact: true }).click();
  await page.getByRole('textbox', { name: 'Folder, archive or git URL' }).fill('https://github.com/o/r');
  await page.getByRole('button', { name: 'Install' }).click();
  await expect(page.getByRole('note')).toContainText('only allowed from the computer that runs the server');
  await expect(page.getByRole('button', { name: 'Install' })).toHaveCount(0);
  const installs = (await snapshot(page)).requests.filter((request) => request.url === '/api/skills/install');
  expect(installs).toHaveLength(1);
});

test('a CodefyUI 3.2.0 host (no skills endpoints): no Skills view, no skill tools, no prompt sections', async ({ page }) => {
  await readyPreview(page, 'host=v5&scenario=ask');
  await openCopilot(page);
  await expect(page.getByRole('button', { name: 'Conversation history' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Skills', exact: true })).toHaveCount(0);
  await send(page, 'Explain what my current graph does without changing it.');
  await expect(page.getByText('No graph changes were made.')).toBeVisible();
  const state = await snapshot(page);
  const chat = chatRequests(state)[0];
  expect(chat.tools).not.toContain('load_skill');
  expect(chat.system).not.toContain('## Available skills');
  expect(state.requests.filter((request) => request.url.startsWith('/api/skills'))).toEqual([]);
});
