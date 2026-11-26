import { commitCandidates, isDotenvPath, readStatus } from '../gitHost';
import { LIST_LIMIT } from '../untrusted';
import { throwIfAborted } from '../toolGuards';
import { hasGitProject } from './workspace';
import type { ToolDefinition } from './types';

export const projectStatusTool: ToolDefinition = {
  name: 'project_status',
  description: 'Summarize the project\'s git status: branch, upstream ahead/behind, and the changed files by group (staged, changed, new, conflicted). Dotenv files are counted but not named. Read-only.',
  input_schema: { type: 'object', properties: {} },
  group: 'project',
  readOnly: true,
  available: hasGitProject,
  async execute(_input, ctx) {
    const result = await readStatus(ctx.api, ctx.signal);
    throwIfAborted(ctx.signal);
    if (!result.ok) { ctx.fail(`Git status could not be read: ${result.error.message}`); return; }
    const status = result.value;
    if (status.state !== 'ready') { ctx.fail(`The project is not a git repository the host can read (state: ${status.state}).`); return; }
    const all = [...status.staged, ...status.unstaged, ...status.untracked, ...status.conflicted];
    const hidden = all.filter((file) => isDotenvPath(file.path)).length;
    const names = (entries: typeof all) => entries.filter((file) => !isDotenvPath(file.path)).slice(0, LIST_LIMIT).map((file) => `${file.path} (${file.kind})`);
    const summary = {
      branch: status.branch, detached: status.detached, head: status.head?.slice(0, 12) ?? null,
      upstream: status.upstream, ahead: status.ahead, behind: status.behind,
      has_uncommitted_changes: all.length > 0,
      counts: { staged: status.staged.length, changed: status.unstaged.length, new: status.untracked.length, conflicted: status.conflicted.length },
      staged: names(status.staged), changed: names(status.unstaged), new: names(status.untracked), conflicted: names(status.conflicted),
      committable: commitCandidates(status).length,
      ...(hidden ? { dotenv_files_not_listed: hidden } : {}),
      ...(status.mergeInProgress ? { merge_in_progress: true } : {}),
      ...(status.rebaseInProgress ? { rebase_in_progress: true } : {}),
    };
    return { content: JSON.stringify(summary), outcome: 'completed' };
  },
};
