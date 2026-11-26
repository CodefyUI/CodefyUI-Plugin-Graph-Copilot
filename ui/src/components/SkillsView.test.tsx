/** The Skills view: the four states, toggling, the detail with the same
 * Markdown limits, install results, and security 9: a host refusal is shown
 * as the host wrote it, never retried, and the refused controls go away. */
import React, { StrictMode } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { SkillsView } from './SkillsView';

const summary = (name: string, source: string, extra: Record<string, unknown> = {}) => ({
  id: `${source}/${name}`, name, description: `${name} does a thing.`, source, license: null, compatibility: null,
  metadata: {}, allowed_tools: [], enabled: true, valid: true, issues: [], shadowed_by: null, file_count: 1, has_scripts: false, ...extra,
});

const BUILTINS = [summary('build-graph', 'builtin'), summary('train-and-evaluate', 'builtin'), summary('run-experiments', 'builtin')];

type Route = (init?: RequestInit) => { status?: number; body: unknown };

function host(routes: Record<string, Route>) {
  const calls: Array<{ url: string; method: string; body?: unknown }> = [];
  const fetch = vi.fn(async (url: string, init?: RequestInit) => {
    const method = (init?.method ?? 'GET').toUpperCase();
    calls.push({ url, method, body: init?.body ? JSON.parse(String(init.body)) : undefined });
    const route = routes[`${method} ${url}`];
    const { status = 200, body } = route ? route(init) : { status: 404, body: { detail: 'Not Found' } };
    return { ok: status < 400, status, json: async () => body };
  });
  return { api: { http: { fetch } } as unknown as CodefyUIPluginAPI, calls };
}

beforeEach(() => vi.clearAllMocks());

describe('SkillsView', () => {
  it('acceptance 3: lists the three built-in skills, grouped, with a switch each', async () => {
    const { api } = host({ 'GET /api/skills': () => ({ body: BUILTINS }) });
    // StrictMode mounts twice, as the plugin entry does.
    render(<StrictMode><SkillsView api={api} /></StrictMode>);
    expect(screen.getByRole('status')).toHaveTextContent('Loading skills…');
    const group = await screen.findByRole('region', { name: 'Built-in' });
    expect(within(group).getAllByRole('switch')).toHaveLength(3);
    for (const skill of BUILTINS) expect(within(group).getByRole('switch', { name: `Use ${skill.name}` })).toBeChecked();
  });

  it('turning a skill off tells the host and the agent context', async () => {
    const onChanged = vi.fn();
    const { api, calls } = host({
      'GET /api/skills': () => ({ body: BUILTINS }),
      'PUT /api/skills/enabled': () => ({ body: { ...BUILTINS[0], enabled: false } }),
    });
    render(<SkillsView api={api} onChanged={onChanged} />);
    fireEvent.click(await screen.findByRole('switch', { name: 'Use build-graph' }));
    await waitFor(() => expect(screen.getByRole('switch', { name: 'Use build-graph' })).not.toBeChecked());
    expect(calls.find((call) => call.method === 'PUT')!.body).toEqual({ id: 'builtin/build-graph', enabled: false });
    expect(onChanged).toHaveBeenCalled();
  });

  it('explains what a skill is when there are none', async () => {
    const { api } = host({ 'GET /api/skills': () => ({ body: [] }) });
    render(<SkillsView api={api} />);
    expect(await screen.findByText('No skills yet')).toBeInTheDocument();
    expect(screen.getByText(/A skill is a folder with a SKILL\.md/)).toBeInTheDocument();
  });

  it('shows the host error and lets the user try again', async () => {
    let fail = true;
    const { api } = host({ 'GET /api/skills': () => (fail ? { status: 500, body: { detail: 'Skills root unreadable.' } } : { body: BUILTINS }) });
    render(<SkillsView api={api} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Skills could not be loaded: Skills root unreadable.');
    fail = false;
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByRole('region', { name: 'Built-in' })).toBeInTheDocument();
  });

  it('shows a skill with its problems, files, allowed tools as display only, and the same Markdown limits', async () => {
    const detail = {
      ...summary('lr-finder', 'user', { allowed_tools: ['Bash'], has_scripts: true, valid: false, issues: [{ level: 'error', code: 'unsafe_link', message: 'Links out.' }] }),
      body: '# Title\n<img src=x onerror=alert(1)>\n![tracker](https://evil.example/p.png?d=secret)\n[docs](https://example.com/docs)',
      files: [{ path: 'SKILL.md', kind: 'skill' }, { path: 'scripts/run.sh', kind: 'script' }],
    };
    const { api } = host({
      'GET /api/skills': () => ({ body: [summary('lr-finder', 'user')] }),
      'GET /api/skills/user/lr-finder': () => ({ body: detail }),
    });
    const { container } = render(<SkillsView api={api} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Show lr-finder' }));
    expect(await screen.findByText('Links out.')).toBeInTheDocument();
    expect(screen.getByText('scripts/run.sh')).toBeInTheDocument();
    expect(screen.getByText(/Allowed tools \(shown only; not enforced\)/)).toBeInTheDocument();
    expect(screen.getByText('Contains scripts. CodefyUI never runs them.')).toBeInTheDocument();
    expect(container.querySelector('img')).toBeNull();
    expect(screen.getByText('<img src=x onerror=alert(1)>')).toBeInTheDocument();
    const image = screen.getByRole('link', { name: '[image: tracker]' });
    expect(image).toHaveAttribute('title', 'https://evil.example/p.png?d=secret');
    expect(screen.getByRole('link', { name: 'docs' })).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('install shows every installed and skipped skill', async () => {
    const { api, calls } = host({
      'GET /api/skills': () => ({ body: BUILTINS }),
      'POST /api/skills/install': () => ({ body: {
        installed: [summary('kohaku-frontend', 'user'), summary('lr-finder', 'user')],
        skipped: [{ name: 'broken', code: 'no_frontmatter', message: 'SKILL.md has no frontmatter.' }],
      } }),
    });
    render(<SkillsView api={api} />);
    const field = await screen.findByRole('textbox', { name: 'Folder, archive or git URL' });
    fireEvent.change(field, { target: { value: 'https://github.com/o/r#skills' } });
    fireEvent.click(screen.getByRole('button', { name: 'Install' }));
    const result = await screen.findByText('Installed: kohaku-frontend, lr-finder');
    expect(result).toBeInTheDocument();
    expect(screen.getByText('Skipped broken: SKILL.md has no frontmatter.')).toBeInTheDocument();
    expect(calls.find((call) => call.method === 'POST')!.body).toEqual({ source: 'https://github.com/o/r#skills' });
  });

  it('install sends once while busy and shows the host message for a refusal', async () => {
    let release!: () => void;
    const { api, calls } = host({
      'GET /api/skills': () => ({ body: BUILTINS }),
      'POST /api/skills/install': () => ({ status: 409, body: { detail: { code: 'exists', message: 'lr-finder is already installed.' } } }),
    });
    const original = (api.http.fetch as ReturnType<typeof vi.fn>).getMockImplementation()!;
    (api.http.fetch as ReturnType<typeof vi.fn>).mockImplementation(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') await new Promise<void>((resolve) => { release = resolve; });
      return original(url, init);
    });
    render(<SkillsView api={api} />);
    const field = await screen.findByRole('textbox', { name: 'Folder, archive or git URL' });
    fireEvent.change(field, { target: { value: '/tmp/lr-finder' } });
    fireEvent.click(screen.getByRole('button', { name: 'Install' }));
    const busy = await screen.findByRole('button', { name: 'Installing…' });
    expect(busy).toBeDisabled();
    fireEvent.submit(busy.closest('form')!);
    release();
    expect(await screen.findByRole('alert')).toHaveTextContent('lr-finder is already installed.');
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
  });

  it('security 9: a 403 remote refusal is shown as written, not retried, and install and delete go away', async () => {
    const message = 'Installing and deleting skills is only allowed from the computer that runs the server. Set CODEFYUI_ALLOW_REMOTE_SKILL_INSTALL=1 to override.';
    const { api, calls } = host({
      'GET /api/skills': () => ({ body: [summary('mine', 'user')] }),
      'GET /api/skills/user/mine': () => ({ body: { ...summary('mine', 'user'), body: 'x', files: [] } }),
      'POST /api/skills/install': () => ({ status: 403, body: { detail: { code: 'remote_install_refused', message } } }),
    });
    render(<SkillsView api={api} />);
    fireEvent.change(await screen.findByRole('textbox', { name: 'Folder, archive or git URL' }), { target: { value: '/x' } });
    fireEvent.click(screen.getByRole('button', { name: 'Install' }));
    expect(await screen.findByRole('note')).toHaveTextContent(message);
    expect(screen.queryByRole('textbox', { name: 'Folder, archive or git URL' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Install' })).toBeNull();
    expect(calls.filter((call) => call.method === 'POST')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Show mine' }));
    await screen.findByRole('heading', { name: 'mine' });
    expect(screen.queryByRole('button', { name: 'Delete mine' })).toBeNull();
  });

  it('security 9: a refused delete shows the host message and does not retry', async () => {
    const { api, calls } = host({
      'GET /api/skills': () => ({ body: [summary('mine', 'user')] }),
      'GET /api/skills/user/mine': () => ({ body: { ...summary('mine', 'user'), body: 'x', files: [] } }),
      'DELETE /api/skills/user/mine': () => ({ status: 403, body: { detail: { code: 'remote_install_refused', message: 'Refused here.' } } }),
    });
    render(<SkillsView api={api} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Show mine' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Delete mine' }));
    const confirm = screen.getByRole('group', { name: 'Delete mine' });
    fireEvent.click(within(confirm).getByRole('button', { name: 'Delete mine' }));
    expect(await screen.findByText('Refused here.')).toBeInTheDocument();
    expect(calls.filter((call) => call.method === 'DELETE')).toHaveLength(1);
    expect(screen.queryByRole('button', { name: 'Delete mine' })).toBeNull();
  });
});
