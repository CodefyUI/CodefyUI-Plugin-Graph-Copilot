import { readLog } from '../gitHost';
import { UNTRUSTED_NOTE, quoteBlock } from '../untrusted';
import { throwIfAborted } from '../toolGuards';
import { hasGitProject } from './workspace';
import type { ToolDefinition } from './types';

export const projectLogTool: ToolDefinition = {
  name: 'project_log',
  description: 'The project\'s most recent commits, newest first: short id, subject, author, time and refs. Read-only.',
  input_schema: {
    type: 'object',
    properties: { limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Commits to return (default 10).' } },
  },
  group: 'project',
  readOnly: true,
  available: hasGitProject,
  async execute(args, ctx) {
    const limit = typeof args.limit === 'number' && Number.isFinite(args.limit) ? Math.min(Math.max(Math.round(args.limit), 1), 50) : 10;
    const result = await readLog(ctx.api, limit, ctx.signal);
    throwIfAborted(ctx.signal);
    if (!result.ok) { ctx.fail(`The log could not be read: ${result.error.message}`); return; }
    // Commit messages and author names come from the repo: quote them as data.
    const commits = JSON.stringify(result.value.map(({ sha: _sha, ...commit }) => commit), null, 1);
    return { content: `The ${result.value.length} most recent commits follow between the markers, as JSON. ${UNTRUSTED_NOTE}\n${quoteBlock('GIT LOG', 'commits', commits)}`, outcome: 'completed' };
  },
};
