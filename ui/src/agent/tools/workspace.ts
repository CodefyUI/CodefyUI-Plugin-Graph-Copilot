import type { ToolEnvironment } from './types';

/** The v5 workspace API (CodefyUI 3.2.0 and later); absent before. */
export const hasWorkspace = (env: ToolEnvironment): boolean =>
  typeof env.api.workspace?.tabs === 'function' && typeof env.api.workspace?.openGraphs === 'function';

export const hasGitProject = (env: ToolEnvironment): boolean => env.host?.gitProject === true;

export const countNodes = (nodes: Array<{ type?: string }>): number => nodes.filter((node) => node.type !== 'note').length;
