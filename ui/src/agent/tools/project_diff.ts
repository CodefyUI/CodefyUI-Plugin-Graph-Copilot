import { isDotenvPath, readDiff } from '../gitHost';
import { DIFF_LIMIT, UNTRUSTED_NOTE, oneLine, quoteBlock, truncateText } from '../untrusted';
import { throwIfAborted } from '../toolGuards';
import { hasGitProject } from './workspace';
import type { ToolDefinition } from './types';

export const projectDiffTool: ToolDefinition = {
  name: 'project_diff',
  description: 'The patch for one changed file in the project: its uncommitted working-tree changes, or with staged=true what is staged. Cut at 32 KB. Read-only.',
  input_schema: {
    type: 'object',
    properties: {
      path: { type: 'string', description: 'The file path as project_status lists it.' },
      staged: { type: 'boolean', description: 'Diff the staged version instead of the working tree.' },
    },
    required: ['path'],
  },
  group: 'project',
  readOnly: true,
  available: hasGitProject,
  async execute(args, ctx) {
    const path = typeof args.path === 'string' ? args.path.trim() : '';
    if (!path) { ctx.fail('project_diff needs a file "path".'); return; }
    if (isDotenvPath(path)) { ctx.fail('Dotenv files hold secrets and are never read.'); return; }
    const result = await readDiff(ctx.api, path, args.staged === true ? 'index' : 'worktree', ctx.signal);
    throwIfAborted(ctx.signal);
    if (!result.ok) { ctx.fail(`The diff of "${path}" could not be read: ${result.error.message}`); return; }
    if (result.value.binary) return { content: JSON.stringify({ path, binary: true }), outcome: 'completed' };
    const cut = truncateText(result.value.patch, DIFF_LIMIT);
    const hostCut = result.value.truncated && !cut.truncated ? '\n[truncated by the host]' : '';
    // The patch is the repo's text, possibly someone else's: quote it as data.
    return { content: `The patch of "${oneLine(path)}" follows between the markers. ${UNTRUSTED_NOTE}\n${quoteBlock('PATCH', path, cut.text + hostCut)}`, outcome: 'completed' };
  },
};
