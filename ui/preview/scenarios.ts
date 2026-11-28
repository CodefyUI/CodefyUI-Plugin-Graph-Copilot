import type { GraphOp } from '../src/types/codefyui';
import type { WireToolCall } from '../src/llm/client';

export type ScenarioId = 'skills' | 'ask' | 'edit' | 'partial-error' | 'http-error' | 'pending' | 'clear' | 'invalid-validation' | 'unavailable-validation' | 'seed' | 'native-run' | 'native-run-reservation' | 'ask-run' | 'ask-experiments' | 'ask-optimizer' | 'ask-run-history' | 'setup-required' | 'empty-graph' | 'unavailable-context' | 'lab-evidence'
  | 'r6-save' | 'r6-save-replace' | 'r6-write-mods' | 'r6-write-agents' | 'r6-read-data' | 'r6-reasoning' | 'r6-corrected' | 'r6-model-error';

export interface ChatReply {
  text: string;
  tools?: WireToolCall[];
  httpError?: number;
  // Starts a partial stream, then waits for an explicit release or AbortSignal.
  pending?: boolean;
  /** Round 6: stream reasoning_delta frames before the text (a v7 host). */
  reasoning?: boolean;
  /** Round 6: answer with a stream error event carrying this message. */
  streamError?: string;
}

export interface Scenario {
  id: ScenarioId;
  label: string;
  prompt: string;
  mode: 'ask' | 'edit';
  validation: 'actual' | 'invalid' | 'unavailable';
  replies: ChatReply[];
  /** Needs a host with Agent Skills (apiVersion 6). */
  needsSkills?: boolean;
  /** The project's AGENTS.md, for a project-mode host. */
  instructions?: string;
  /** Round 6: a CodefyUI 3.5.0 host (plugin API v7, agent file endpoints). */
  needsV7?: boolean;
}

const tool = (id: string, name: string, args: Record<string, unknown> = {}): WireToolCall => ({ id, name, arguments: args });
const schemas = tool('mock-schemas', 'get_node_schemas', { node_types: ['Dataset', 'Normalize', 'Preview'] });

export const EDIT_OPERATIONS: GraphOp[] = [
  { op: 'add_node', node_type: 'Normalize', ref: 'normalized' },
  { op: 'remove_edge', source: 'sample-dataset', source_handle: 'samples', target: 'sample-preview', target_handle: 'samples' },
  { op: 'connect', source: 'sample-dataset', source_handle: 'samples', target: 'normalized', target_handle: 'samples' },
  { op: 'connect', source: 'normalized', source_handle: 'samples', target: 'sample-preview', target_handle: 'samples' },
  { op: 'set_params', node_id: 'normalized', params: { scale: 0.5 } },
  { op: 'auto_layout' },
];

const editReplies = (operations: GraphOp[] = EDIT_OPERATIONS): ChatReply[] => [
  { text: 'I’ll inspect the exact schemas before adding a normalization step.', tools: [schemas] },
  { text: 'I’ll insert Normalize between Dataset and Preview, then arrange the graph.', tools: [tool('mock-apply', 'apply_graph_operations', { operations })] },
  { text: 'The graph has changed. I’ll check its structure now.', tools: [tool('mock-validate', 'validate_graph')] },
  { text: 'Added **Normalize** with `scale: 0.5` between Dataset and Preview. The graph’s structure is validated; this does not execute the pipeline.' },
];

const R6 = { mode: 'edit' as const, validation: 'actual' as const, needsSkills: true, needsV7: true, instructions: 'Keep graphs small.' };

export const SCENARIOS: Scenario[] = [
  {
    ...R6, id: 'r6-save', label: 'Round 6: save the tab as a new graph',
    prompt: 'Save this graph as iris-mlp.',
    replies: [
      { text: 'I’ll save the active tab as **iris-mlp**.', tools: [tool('r6-save', 'save_graph', { name: 'iris-mlp' })] },
      { text: 'Saved the tab as **iris-mlp**; the tab is now bound to it.' },
    ],
  },
  {
    ...R6, id: 'r6-save-replace', label: 'Round 6: replace an existing saved graph',
    prompt: 'Save this over the train graph; I agree to replace it.',
    replies: [
      { text: 'You agreed to replace **train**, so I’ll save over it.', tools: [tool('r6-replace', 'save_graph', { name: 'train', overwrite: true })] },
      { text: 'Replaced **train** with this tab.' },
    ],
  },
  {
    ...R6, id: 'r6-write-mods', label: 'Round 6: write a project node into mods/nodes',
    prompt: 'Add a Scale node to this project.',
    replies: [
      { text: 'I’ll write the node file; it loads only after you trust the project’s mods.', tools: [tool('r6-write', 'project_write_file', {
        path: 'mods/nodes/scale.py',
        content: 'from app.core.node_base import BaseNode\n\n\nclass ScaleNode(BaseNode):\n    NODE_NAME = "Scale"\n    CATEGORY = "Project"\n\n    def execute(self, inputs, params):\n        return {"out": inputs["x"] * params.get("factor", 2.0)}\n',
      })] },
      { text: 'Wrote `mods/nodes/scale.py`. It is **not loaded yet**: agree to the trust prompt and press Reload Nodes.' },
    ],
  },
  {
    ...R6, id: 'r6-write-agents', label: 'Round 6: change AGENTS.md',
    prompt: 'Add a rule to AGENTS.md: always seed runs with 7.',
    replies: [
      { text: 'I’ll add the rule to AGENTS.md.', tools: [tool('r6-agents', 'project_write_file', { path: 'AGENTS.md', content: 'Keep graphs small.\nAlways seed runs with 7.\n' })] },
      { text: 'Added the seeding rule to AGENTS.md.' },
    ],
  },
  {
    ...R6, id: 'r6-read-data', label: 'Round 6: read a project data file',
    prompt: 'Show me the first rows of data/train.csv.',
    replies: [
      { text: 'Reading the rows sends them to the model provider, so I’ll ask first.', tools: [tool('r6-read', 'project_read_file', { path: 'data/train.csv' })] },
      { text: 'The file has columns `x` and `label`.' },
    ],
  },
  {
    ...R6, id: 'r6-reasoning', label: 'Round 6: a reasoning model (reasoning_delta)',
    prompt: 'Which node should I add for normalization?',
    replies: [{ text: 'Use **Normalize** between Dataset and Preview.', reasoning: true, pending: true }],
  },
  {
    ...R6, id: 'r6-corrected', label: 'Round 6: a failed connect corrected later',
    prompt: 'Insert Normalize between Dataset and Preview.',
    replies: [
      { text: 'I’ll add Normalize and wire it.', tools: [tool('r6-c1', 'apply_graph_operations', { operations: [
        { op: 'add_node', node_type: 'Normalize', ref: 'n' },
        { op: 'connect', source: 'sample-dataset', source_handle: 'out2', target: 'n', target_handle: 'samples' },
      ] satisfies GraphOp[] })] },
      { text: 'Dataset has no `out2`; I’ll use its `samples` output.', tools: [tool('r6-c2', 'apply_graph_operations', { operations: [
        { op: 'connect', source: 'sample-dataset', source_handle: 'samples', target: 'mock-node-1', target_handle: 'samples' },
      ] satisfies GraphOp[] })] },
      { text: 'Done: Normalize is connected to Dataset.' },
    ],
  },
  {
    ...R6, id: 'r6-model-error', label: 'Round 6: the model request fails with the host\'s message',
    prompt: 'Explain the graph.',
    replies: [{ text: '', streamError: 'upstream request failed: ReadTimeout: the endpoint sent no data for 600 seconds' }],
  },
  {
    id: 'skills', label: 'Skills: load and read a skill file (v6 host)', mode: 'edit', validation: 'actual', needsSkills: true,
    instructions: 'Seed every run with 7. The evaluation graph is called serve.',
    prompt: 'Use the build-graph skill to explain how ports connect.',
    replies: [
      { text: 'I’ll try the port reference first.', tools: [tool('mock-early-file', 'read_skill_file', { name: 'build-graph', path: 'references/ports.md' })] },
      { text: 'I need to load the skill first.', tools: [tool('mock-load-skill', 'load_skill', { name: 'build-graph' })] },
      { text: 'The skill points to its port reference.', tools: [tool('mock-read-file', 'read_skill_file', { name: 'build-graph', path: 'references/ports.md' })] },
      { text: 'Ports connect only to the same type, per the **build-graph** skill’s reference.' },
    ],
  },
  {
    id: 'setup-required', label: 'Provider setup required', mode: 'edit', validation: 'actual',
    prompt: 'Explain the current graph after I configure a provider.',
    replies: [{ text: 'The fake provider is configured. No external network is used in this preview.' }],
  },
  {
    id: 'empty-graph', label: 'Empty graph context', mode: 'edit', validation: 'actual',
    prompt: 'Build a small image classifier from this empty graph.',
    replies: [{ text: 'This fixture starts with an empty graph. Planning does not apply operations or execute nodes.' }],
  },
  {
    id: 'unavailable-context', label: 'Graph context unavailable', mode: 'edit', validation: 'actual',
    prompt: 'Help me reconnect to the current graph context.',
    replies: [{ text: 'The preview graph context is unavailable. No graph was read or executed.' }],
  },
  {
    id: 'lab-evidence', label: 'Saved Lab evidence (no execution)', mode: 'ask', validation: 'actual',
    prompt: 'Explain the saved study evidence without running another experiment.',
    replies: [{ text: 'This preview uses seeded study summaries only. No study execution was requested.' }],
  },
  {
    id: 'ask', label: 'Successful ask', mode: 'ask', validation: 'actual',
    prompt: 'Explain what my current graph does without changing it.',
    replies: [{ text: 'Your graph starts the sample pipeline, loads **Dataset** with a batch size of `16`, and sends its images to **Preview**. No graph changes were made.\n\n- Start sends the trigger.\n- Dataset supplies the sample images.\n- Preview shows the images; it does not train a model.' }],
  },
  {
    id: 'edit', label: 'Edit with schemas and validation', mode: 'edit', validation: 'actual',
    prompt: 'Add Normalize between Dataset and Preview, with scale 0.5.', replies: editReplies(),
  },
  {
    id: 'partial-error', label: 'Partial edit then HTTP error', mode: 'edit', validation: 'actual',
    prompt: 'Add a normalization step to my graph.',
    replies: [
      { text: 'I’ll inspect the schema for Normalize first.', tools: [schemas] },
      { text: 'I’ll add Normalize and connect Dataset to it.', tools: [tool('mock-partial-apply', 'apply_graph_operations', { operations: [
        { op: 'add_node', node_type: 'Normalize', ref: 'partial-normalized' },
        { op: 'connect', source: 'sample-dataset', source_handle: 'samples', target: 'partial-normalized', target_handle: 'samples' },
        { op: 'add_node', node_type: 'NotInSampleCatalog', ref: 'bad-node' },
      ] satisfies GraphOp[] })] },
      { text: 'Mock upstream unavailable after a partial graph edit.', httpError: 503 },
      { text: 'I’ll read the current graph instead of repeating the earlier edits.', tools: [tool('mock-current', 'get_current_graph')] },
      { text: 'The successful changes are still present. I checked the current graph and did not add another Normalize node.' },
    ],
  },
  {
    id: 'http-error', label: 'HTTP error before any edit', mode: 'edit', validation: 'actual',
    prompt: 'Describe my sample graph.',
    replies: [
      { text: 'Mock upstream unavailable before any graph operation.', httpError: 503 },
      { text: 'The sample graph connects Start to Dataset, then Dataset to Preview. No changes were made.' },
    ],
  },
  {
    id: 'pending', label: 'Long pending stream (Stop)', mode: 'edit', validation: 'actual',
    prompt: 'Inspect this graph while I test Stop.',
    replies: [{ text: 'I’m inspecting the sample graph. This mock stream stays pending until you release it or press Stop.', pending: true }],
  },
  {
    id: 'clear', label: 'Clear graph confirmation', mode: 'edit', validation: 'actual',
    prompt: 'Clear my graph and start over.',
    replies: [
      { text: 'I’ll clear the sample graph only after you confirm.', tools: [tool('mock-clear', 'apply_graph_operations', { operations: [{ op: 'clear_graph' }] satisfies GraphOp[] })] },
      { text: 'I’ll check the current graph after your decision.', tools: [tool('mock-after-clear', 'get_current_graph')] },
      { text: 'Your decision was respected. The current graph is shown in the mock host’s source list.' },
    ],
  },
  {
    id: 'invalid-validation', label: 'Invalid structure', mode: 'edit', validation: 'invalid',
    prompt: 'Add Normalize and check its graph structure.',
    replies: [
      ...editReplies(EDIT_OPERATIONS.filter((operation) => !(operation.op === 'connect' && operation.target === 'normalized'))).slice(0, 3),
      { text: 'The mock validator reports a required input problem. I cannot claim this graph is validated.' },
    ],
  },
  {
    id: 'seed', label: 'Saved history (legacy, success, interrupted)', mode: 'ask', validation: 'actual',
    prompt: 'Explain the sample graph without changing it.',
    replies: [{ text: 'The current sample graph connects Start to Dataset and Dataset to Preview. The saved conversation is context only; no previous operations were replayed.' }],
  },
  {
    id: 'native-run', label: 'Native run approval and cancellation (simulated)', mode: 'edit', validation: 'actual',
    prompt: 'Run my current sample graph on CPU after I approve.',
    replies: [
      { text: 'I’ll validate the current sample graph before proposing a run.', tools: [tool('mock-run-validate', 'validate_graph')] },
      { text: 'I’ll run the current graph only after your approval.', tools: [tool('mock-run', 'run_graph', { reason: 'Execute the sample graph using the in-memory mock runner.', timeout_minutes: 1, device: 'cpu' })] },
      { text: 'The simulated host reports a completed run. No real node execution, provider call, file write, or graph edit occurred.' },
    ],
  },
  {
    id: 'native-run-reservation', label: 'Detached host run blocks a second execution (simulated)', mode: 'edit', validation: 'actual',
    prompt: 'Run my current sample graph on CPU after I approve.',
    replies: [
      { text: 'I’ll validate the current sample graph before proposing a run.', tools: [tool('mock-run-validate', 'validate_graph')] },
      { text: 'I’ll run the current graph only after your approval.', tools: [tool('mock-run', 'run_graph', { reason: 'Execute the sample graph using the in-memory mock runner.', timeout_minutes: 1, device: 'cpu' })] },
      // After the first owner detaches, a second user turn must exercise the
      // real live-run guard, not merely receive a harmless scripted answer.
      { text: 'I’ll recheck the graph before proposing another execution.', tools: [tool('mock-reservation-validate', 'validate_graph')] },
      { text: 'This second proposal must be refused while the earlier host run is live or unconfirmed.', tools: [tool('mock-reservation-run', 'run_graph', { reason: 'Attempt a second run while the earlier run is reserved.', timeout_minutes: 1, device: 'cpu' })] },
      { text: 'The earlier host run remains reserved. No second execution was submitted.' },
    ],
  },
  {
    id: 'ask-run', label: 'Ask rejects a native run tool', mode: 'ask', validation: 'actual',
    prompt: 'Explain the graph, but do not run or edit it.',
    replies: [{ text: 'This scripted model attempts an unauthorized run so the real Ask guard can refuse it.', tools: [tool('mock-ask-run', 'run_graph', { reason: 'Must be refused in Ask mode.', device: 'cpu' })] }],
  },
  {
    id: 'ask-experiments', label: 'Ask rejects an experiment tool', mode: 'ask', validation: 'actual',
    prompt: 'Explain possible comparisons without executing a study.',
    replies: [{ text: 'This scripted model attempts an unauthorized study so the real Ask guard can refuse it.', tools: [tool('mock-ask-experiment', 'run_graph_experiments', {
      hypothesis: 'Must be refused in Ask mode.', objective: { metric: 'loss', direction: 'minimize' }, variants: [{ label: 'baseline', operations: [] }], repetitions: 1,
    })] }],
  },
  {
    id: 'ask-optimizer', label: 'Ask rejects an optimizer tool', mode: 'ask', validation: 'actual',
    prompt: 'Explain batch size options without searching or changing the graph.',
    replies: [{ text: 'This scripted model attempts an unauthorized optimizer so the real Ask guard can refuse it.', tools: [tool('mock-ask-optimizer', 'optimize_graph_parameters', {
      version: 1, strategy: 'grid', hypothesis: 'Must be refused in Ask mode.', objective: { metric: 'loss', direction: 'minimize' },
      bindings: [{ node_id: 'sample-dataset', param: 'batch_size', values: [8, 16] }], repetitions: 1,
    })] }],
  },
  {
    id: 'ask-run-history', label: 'Ask reads host run history without execution', mode: 'ask', validation: 'actual',
    prompt: 'List the mock host’s previous run and report its exact loss.',
    replies: [
      { text: 'I’ll inspect the mock host’s run history without executing anything.', tools: [tool('mock-list-runs', 'list_runs', { limit: 5 })] },
      { text: 'I’ll read the completed run and its recorded metrics.', tools: [tool('mock-get-run', 'get_run', { run_id: 'mock-history-run' })] },
      { text: 'The mock host’s previous run is **completed**, with recorded `loss: 0.25`. Reading this receipt did not execute or edit the graph.' },
    ],
  },
  {
    id: 'unavailable-validation', label: 'Validation unavailable', mode: 'edit', validation: 'unavailable',
    prompt: 'Add Normalize and check its graph structure.',
    replies: [
      ...editReplies().slice(0, 3),
      { text: 'The mock validation service is unavailable. The changes are present, but their structure has not been verified.' },
    ],
  },
];

export function isNativeRunScenario(scenario: Scenario): boolean {
  return scenario.id === 'native-run' || scenario.id === 'native-run-reservation';
}

export function scenarioById(value: string | null): Scenario {
  return SCENARIOS.find((scenario) => scenario.id === value) ?? SCENARIOS.find((scenario) => scenario.id === 'edit')!;
}

// For capped invalid-validation nudges in older bundles, repeat only text:
// never accidentally reapply a structural batch when a scripted plan ends.
export function replyAt(scenario: Scenario, index: number): ChatReply {
  return scenario.replies[index] ?? { text: scenario.replies.at(-1)!.text };
}
