/** The shape every agent tool has, and the context the loop hands it.
 *
 * Permissions are decided here and in the loop, never by text: whether a tool
 * is sent in Ask mode is its `readOnly` flag, and whether it needs the user's
 * approval is its `approval` declaration. Nothing a model, a skill or a
 * project file says can change either; the loop refuses a declared-approval
 * tool's side effects until the user pressed the approval card's button. */
import type { WireToolCall } from '../../llm/client';
import type { Settings } from '../../state/settings';
import type { CodefyUIPluginAPI } from '../../types/codefyui';
import type { CurrentGraphValidation } from '../validation';
import type { ExperimentRuntimeHooks } from '../experiments';
import type {
  AgentMode, ClearGraphRequest, RunPhase, RunSummary, ToolOutcome,
} from '../types';
import type { TurnCallbacks } from '../loop';
import type { ExperimentApprovalRequest, RunApprovalRequest } from '../runtimeTools';
import type { AgentContext } from '../hostContext';
import type { HostRef } from '../../state/conversations';

export type JsonSchema = Record<string, unknown>;

export type ToolGroup = 'graph' | 'run' | 'experiment' | 'workspace' | 'skill' | 'example' | 'project';

/** What a tool's approval card is about. The card's details are filled in at
 * the gate (`ToolContext.approve`), because some need host reads first. */
export type ApprovalKind = 'clear_graph' | 'run_graph' | 'experiment' | 'project_commit';

export interface ApprovalRequirement { kind: ApprovalKind }

export interface ProjectCommitApprovalRequest {
  message: string;
  /** Every path that will be staged and committed, exactly as sent to the host. */
  files: Array<{ path: string; status: string }>;
}

export type ApprovalRequest =
  | { kind: 'clear_graph'; request: ClearGraphRequest }
  | { kind: 'run_graph'; request: RunApprovalRequest }
  | { kind: 'experiment'; request: ExperimentApprovalRequest }
  | { kind: 'project_commit'; request: ProjectCommitApprovalRequest };

export interface ToolResult {
  content: string;
  outcome: ToolOutcome;
  /** Text CodefyUI can give again: stored as this reference only. */
  ref?: HostRef;
}

/** What `available` and `approval` may look at: the environment, not the turn. */
export interface ToolEnvironment {
  api: CodefyUIPluginAPI;
  settings: Settings;
  mode: AgentMode;
  /** Host features probed for this turn (absent when not probed). */
  host?: HostFeatures;
  /** The host's skills and what this conversation has loaded; absent when off. */
  skills?: SkillSession;
}

export interface SkillSession {
  context: AgentContext;
  /** Skills loaded anywhere in this conversation: their files may be read. */
  loaded: Set<string>;
  /** Skills whose body the model already has in this turn's context. */
  inContext: Set<string>;
  /** Skill files (`name\npath`) the model already has in this turn's context. */
  filesInContext: Set<string>;
}

export interface HostFeatures {
  /** `/api/skills` and `/api/agent/context` exist (CodefyUI with Agent Skills). */
  skills: boolean;
  /** The host is in project mode and the project is a git repository. */
  gitProject: boolean;
}

/** The loop's own bookkeeping for graph edits, shared with the graph tools. */
export interface TurnState {
  readonly summary: RunSummary;
  readonly affectedNodes: Set<string>;
  repairSnapshot: string | undefined;
  lastMutationSnapshot: string | undefined;
  currentSnapshot(): string;
  assertRepairSnapshot(): void;
  stale(reason?: string): never;
  /** The exact receipt last journaled for this call. */
  rawReceipt(): string | undefined;
  addRoundOps(text: string): void;
  /** Tabs this turn opened (open_graph, open_example); approval cards say so. */
  readonly openedTabs: Set<string>;
}

export interface ToolContext extends ToolEnvironment {
  call: WireToolCall;
  signal?: AbortSignal;
  /** Explicit host Stop, independent of passive browser-observation teardown. */
  cancelSignal?: AbortSignal;
  callbacks: TurnCallbacks;
  turn: TurnState;
  budget: { remaining: number };
  phase(value: RunPhase): void;
  /** Journal this call's receipt; `terminal: false` keeps it pending. */
  record(content: string, outcome: ToolOutcome, terminal?: boolean): void;
  /** Journal an error receipt and keep the call as an uncorrected issue. */
  fail(message: string): void;
  /** Keep the call as an uncorrected issue without changing its receipt. */
  markIssue(): void;
  validate(): Promise<CurrentGraphValidation>;
  /** Whether this client can show an approval card of this kind. */
  canApprove(kind: ApprovalKind): boolean;
  /** Show the approval card and wait for the user. True only for their approval. */
  approve(request: ApprovalRequest): Promise<boolean>;
  /** Throws unless the approval this call declared was granted. Call it
   * immediately before any side effect; `dispatched` calls it too. */
  assertApproved(): void;
  /** Side effects were dispatched: conservative metadata and a pending receipt. */
  dispatched(): void;
  hostRunStarted(id: string): void;
  promotionHooks: ExperimentRuntimeHooks;
}

export interface ToolDefinition<I = Record<string, unknown>> {
  name: string;
  description: string;
  input_schema: JsonSchema;
  group: ToolGroup;
  /** Sent, and allowed, in Ask mode. */
  readOnly: boolean;
  /** Whether this call needs the user's approval before its side effects. */
  approval?: (input: I, env: ToolEnvironment) => ApprovalRequirement | null;
  /** False keeps the tool out of the list sent to the model, and refuses it. */
  available?: (env: ToolEnvironment) => boolean;
  /** Returns the receipt, or nothing when the tool journaled it itself. */
  execute(input: I, ctx: ToolContext): Promise<ToolResult | void>;
}

/** The fields a provider sees. */
export interface WireTool { name: string; description: string; input_schema: JsonSchema }
