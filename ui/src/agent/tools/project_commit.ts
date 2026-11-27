import { commitCandidates, commitIndex, isDotenvPath, partlyStaged, readStatus, stagePaths } from '../gitHost';
import { RunExit } from '../runExit';
import { throwIfAborted } from '../toolGuards';
import { hasGitProject } from './workspace';
import type { ToolDefinition } from './types';

const MAX_MESSAGE = 2_000;

export const projectCommitTool: ToolDefinition = {
  name: 'project_commit',
  description: 'Commit changed project files with a message, after the user approves a card that lists every file. Give the exact paths to commit (from project_status); without paths, every committable changed file is proposed. Dotenv and git-ignored files are never committable. Files the user already staged must be in the list, because git commits everything staged. A file with both staged and unstaged changes is refused. Does not push.',
  input_schema: {
    type: 'object',
    properties: {
      message: { type: 'string', description: 'The commit message: a short summary line, then details if needed.' },
      paths: { type: 'array', items: { type: 'string' }, maxItems: 200, description: 'Exact file paths to commit.' },
    },
    required: ['message'],
  },
  group: 'project',
  readOnly: false,
  approval: () => ({ kind: 'project_commit' }),
  available: hasGitProject,
  async execute(args, ctx) {
    const { api, signal } = ctx;
    const message = typeof args.message === 'string' ? args.message.trim() : '';
    if (!message) { ctx.fail('project_commit needs a commit "message".'); return; }
    if (message.length > MAX_MESSAGE) { ctx.fail(`The commit message is longer than ${MAX_MESSAGE} characters.`); return; }
    const read = await readStatus(api, signal);
    throwIfAborted(signal);
    if (!read.ok) { ctx.fail(`Git status could not be read: ${read.error.message}`); return; }
    const status = read.value;
    if (status.state !== 'ready') { ctx.fail(`The project is not a git repository the host can read (state: ${status.state}).`); return; }
    if (status.conflicted.length || status.mergeInProgress || status.rebaseInProgress) {
      ctx.fail('A merge, rebase or conflict is in progress. The user resolves that in the Source Control tab; nothing was committed.');
      return;
    }
    const candidates = commitCandidates(status);
    const byPath = new Map(candidates.map((candidate) => [candidate.path, candidate]));
    const requested = Array.isArray(args.paths)
      ? [...new Set(args.paths.filter((path): path is string => typeof path === 'string').map((path) => path.trim()).filter(Boolean))]
      : candidates.map((candidate) => candidate.path);
    const refused = requested.filter((path) => !byPath.has(path));
    if (refused.length) {
      ctx.fail(`These paths are not committable changes (unchanged, ignored, or a dotenv file): ${refused.slice(0, 20).join(', ')}. Nothing was committed.`);
      return;
    }
    if (!requested.length) { ctx.fail('There is nothing to commit.'); return; }
    // Staging adds a file's whole working copy, so a partly staged file would
    // commit changes the user deliberately left out (and the card cannot show).
    const partial = partlyStaged(status).filter((path) => requested.includes(path));
    if (partial.length) {
      ctx.fail(`Partly staged: ${partial.slice(0, 20).join(', ')}. The user stages the rest or discards it in the Source Control tab first; nothing was committed.`);
      return;
    }
    const stagedDotenv = status.staged.filter((file) => isDotenvPath(file.path));
    if (stagedDotenv.length) { ctx.fail('A dotenv file is staged. The user must unstage it in the Source Control tab; nothing was committed.'); return; }
    const unlisted = status.staged.filter((file) => !requested.includes(file.path));
    if (unlisted.length) {
      ctx.fail(`Already staged but not in this commit: ${unlisted.slice(0, 20).map((file) => file.path).join(', ')}. Include them, or the user unstages them; nothing was committed.`);
      return;
    }
    const files = requested.map((path) => byPath.get(path)!);
    if (!ctx.canApprove('project_commit')) { ctx.fail('Committing requires an interactive user approval, but this client did not provide one.'); return; }
    ctx.phase('awaiting_confirmation');
    throwIfAborted(signal);
    const approved = await ctx.approve({ kind: 'project_commit', request: { message, files } });
    throwIfAborted(signal);
    if (!approved) {
      ctx.record(JSON.stringify({ cancelled: true, error: 'The user did not approve this commit. Nothing was staged or committed.' }), 'cancelled');
      throw new RunExit('cancelled', 'commit_declined', 'The commit was not approved. Nothing was staged or committed.');
    }
    ctx.phase('tools');
    // The card showed exactly these files; refuse if the tree moved since.
    const again = await readStatus(api, signal);
    throwIfAborted(signal);
    const now = again.ok ? new Map(commitCandidates(again.value).map((candidate) => [candidate.path, candidate.status])) : null;
    const extraStaged = again.ok ? again.value.staged.filter((file) => !requested.includes(file.path)) : [];
    const partialNow = again.ok ? partlyStaged(again.value).filter((path) => requested.includes(path)) : [];
    if (!now || files.some((file) => now.get(file.path) !== file.status) || extraStaged.length || partialNow.length) {
      ctx.record(JSON.stringify({ cancelled: true, replan: true, error: 'The project changed while the approval was open. Nothing was committed; read project_status again.' }), 'cancelled');
      throw new RunExit('cancelled', 'commit_stale', 'The project changed while the commit approval was open. Nothing was committed.');
    }
    ctx.dispatched();
    const staged = await stagePaths(api, requested);
    if (!staged.ok) return { content: JSON.stringify({ error: `Staging failed: ${staged.error.message}. Some files may be staged; nothing was committed.` }), outcome: 'error' };
    const committed = await commitIndex(api, message);
    if (!committed.ok) return { content: JSON.stringify({ error: `The commit failed: ${committed.error.message}. The files stay staged.` }), outcome: 'error' };
    const detail = (committed.value.detail ?? {}) as Record<string, unknown>;
    return {
      content: JSON.stringify({ committed: true, commit: detail.short ?? committed.value.head ?? null, files: requested, pushed: false }),
      outcome: 'completed',
    };
  },
};
