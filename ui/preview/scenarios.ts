import type { GraphOp } from '../src/types/codefyui';
import type { WireToolCall } from '../src/llm/client';

export type ScenarioId = 'ask' | 'edit' | 'partial-error' | 'http-error' | 'pending' | 'clear' | 'invalid-validation' | 'unavailable-validation' | 'seed' | 'native-run' | 'ask-run' | 'ask-experiments' | 'ask-optimizer' | 'ask-run-history';

export interface ChatReply {
  text: string;
  tools?: WireToolCall[];
  httpError?: number;
  // Starts a partial stream, then waits for an explicit release or AbortSignal.
  pending?: boolean;
}

export interface Scenario {
  id: ScenarioId;
  label: string;
  prompt: string;
  mode: 'ask' | 'edit';
  validation: 'actual' | 'invalid' | 'unavailable';
  replies: ChatReply[];
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

export const SCENARIOS: Scenario[] = [
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

export function scenarioById(value: string | null): Scenario {
  return SCENARIOS.find((scenario) => scenario.id === value) ?? SCENARIOS[1];
}

// For capped invalid-validation nudges in older bundles, repeat only text:
// never accidentally reapply a structural batch when a scripted plan ends.
export function replyAt(scenario: Scenario, index: number): ChatReply {
  return scenario.replies[index] ?? { text: scenario.replies.at(-1)!.text };
}
