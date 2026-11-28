/** The built-in tools, in the order they are offered to the model. */
import { applyGraphOperationsTool } from './apply_graph_operations';
import { getCurrentGraphTool } from './get_current_graph';
import { getNodeSchemasTool } from './get_node_schemas';
import { validateGraphTool } from './validate_graph';
import { runGraphTool } from './run_graph';
import { researchTool } from './research';
import { runGraphExperimentsTool } from './run_graph_experiments';
import { optimizeGraphParametersTool } from './optimize_graph_parameters';
import { listRunsTool } from './list_runs';
import { getRunTool } from './get_run';
import { loadSkillTool } from './load_skill';
import { readSkillFileTool } from './read_skill_file';
import { listTabsTool } from './list_tabs';
import { openGraphTool } from './open_graph';
import { searchExamplesTool } from './search_examples';
import { openExampleTool } from './open_example';
import { projectStatusTool } from './project_status';
import { projectDiffTool } from './project_diff';
import { projectCommitTool } from './project_commit';
import { projectLogTool } from './project_log';
import { saveGraphTool } from './save_graph';
import { listDataFilesTool, projectListFilesTool, projectReadFileTool, projectWriteFileTool } from './project_files';
import { createToolRegistry } from './registry';
import type { ToolDefinition } from './types';

export const BUILTIN_TOOLS: ToolDefinition[] = [
  applyGraphOperationsTool,
  getCurrentGraphTool,
  getNodeSchemasTool,
  validateGraphTool,
  runGraphTool,
  researchTool,
  runGraphExperimentsTool,
  optimizeGraphParametersTool,
  listRunsTool,
  getRunTool,
  loadSkillTool,
  readSkillFileTool,
  listTabsTool,
  openGraphTool,
  searchExamplesTool,
  openExampleTool,
  projectStatusTool,
  projectDiffTool,
  projectCommitTool,
  projectLogTool,
  saveGraphTool,
  listDataFilesTool,
  projectListFilesTool,
  projectReadFileTool,
  projectWriteFileTool,
];

/** The registry the loop uses. */
export const toolRegistry = createToolRegistry(BUILTIN_TOOLS);

export { createToolRegistry, toWire } from './registry';
export type { ToolRegistry } from './registry';
export type * from './types';
