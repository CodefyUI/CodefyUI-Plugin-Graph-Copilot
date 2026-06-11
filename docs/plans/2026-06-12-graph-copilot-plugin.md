# Graph Copilot Plugin Implementation Plan (Part C)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** The `graph-copilot` CodefyUI plugin: a floating AI-assistant button that opens a chat window which generates/edits the canvas graph through `/api/llm/chat` tool-calling, with conversation history and multi-provider settings.

**Architecture:** Vite lib-mode React app in `ui/`, built to a single committed ESM file `frontend/index.js` (end users install via GitHub tarball with no Node). The bundle default-exports `activate(api)`; everything reaches CodefyUI through the `CodefyUIPluginAPI` object (graph ops, authenticated fetch, namespaced storage) — no imports from core. The agent loop: fresh system prompt per user message (compact node catalog + live graph snapshot), two tools (`apply_graph_operations`, `get_current_graph`), max 8 tool rounds, per-op errors fed back for self-correction.

**Tech Stack:** React 19, TypeScript, Vite 6 (lib mode + css-injected-by-js), vitest + jsdom. No state library — component state + plain storage helpers.

**Dependencies on CodefyUI core:** PR #55 (plugin frontend extensions) + PR #56 (LLM proxy). Spec: CodefyUI repo `docs/superpowers/specs/2026-06-11-graph-copilot-design.md` Part C.

**Working directory:** `D:\Github\CodefyUI-Plugin-Graph-Copilot` (own git repo, branch `main` until first push, then feature branches).

---

### Task 1: repo skeleton + manifest

**Files:** `cdui.plugin.toml`, `.gitignore`, `README.md` (skeleton), `LICENSE` (already copied from template).

- [ ] `cdui.plugin.toml`:

```toml
[plugin]
id              = "graph-copilot"
name            = "Graph Copilot — AI chat assistant"
version         = "0.1.0"
description     = "Chat with an AI to generate, tune, and improve the node graph. Adds a floating assistant button, conversation history, and multi-provider LLM settings (OpenAI / ChatGPT Codex / OpenRouter / Claude / custom OpenAI-compatible)."
schema_version  = 1
requires_codefyui = ">=0.2.0"
authors         = ["treeleaves30760"]
license         = "MIT"
homepage        = "https://github.com/treeleaves30760/CodefyUI-Plugin-Graph-Copilot"

[frontend]
entry = "frontend/index.js"
```

(`requires_codefyui` stays at the template floor until core tags a release containing PRs #55/#56; README carries the real constraint.)

- [ ] `.gitignore`: `node_modules/`, `ui/dist/`, `*.local`, `.DS_Store`. NOTE: `frontend/` is COMMITTED (build artifact, deliberately tracked).
- [ ] README skeleton: name, one-paragraph pitch, "Requires CodefyUI with plugin frontend extensions + LLM proxy (PRs #55/#56)", install command `cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot`, dev workflow (`cd ui && pnpm install && pnpm build`), security note (API keys live in your browser's localStorage and ride to the local backend per request; never sent anywhere except the provider you choose).
- [ ] Commit: `chore: repo skeleton, manifest, license`

### Task 2: ui/ scaffold (Vite lib mode + types + vitest)

**Files:** `ui/package.json`, `ui/vite.config.ts`, `ui/tsconfig.json`, `ui/src/types/codefyui.d.ts`, `ui/src/test/setup.ts`.

- [ ] `ui/package.json` — deps: react ^19, react-dom ^19; dev: typescript ~5.8, vite ^6, @vitejs/plugin-react, vite-plugin-css-injected-by-js, vitest ^3, jsdom, @types/react, @types/react-dom. Scripts: `dev: vite build --watch`, `build: tsc -b && vite build`, `test: vitest run`.
- [ ] `ui/vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: resolve(__dirname, '../frontend'),
    emptyOutDir: true,
    rollupOptions: { output: { inlineDynamicImports: true } },
    cssCodeSplit: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
  },
});
```

- [ ] `ui/src/types/codefyui.d.ts` — the plugin-side mirror of CodefyUIPluginAPI v1 (GraphOp union, OpResult, ApplyResult, NodeDefinition/PortDefinition/ParamDefinition, SerializedGraph loose shape, the API interface). Copy the shapes from CodefyUI `frontend/src/plugins/{ops,api}.ts` — keep field names identical.
- [ ] Smoke test that the scaffold compiles: a trivial `ui/src/index.tsx` exporting `export default function activate() {}` + `pnpm build` produces `frontend/index.js`.
- [ ] Commit: `chore(ui): vite lib-mode scaffold building to committed frontend/ dist`

### Task 3: LLM client (SSE consumer + endpoint wrappers)

**Files:** `ui/src/llm/client.ts`, test `ui/src/llm/client.test.ts`.

Contract (mirrors PR #56 wire format):

```ts
export type Provider = 'openai' | 'openai-codex' | 'openrouter' | 'anthropic' | 'custom';

export interface WireToolCall { id: string; name: string; arguments: Record<string, unknown> }
export interface WireMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: WireToolCall[];
  tool_call_id?: string;
}
export interface DoneEvent {
  message: { role: 'assistant'; content: string; tool_calls: WireToolCall[] };
  stop_reason: 'tool_use' | 'end';
  usage: Record<string, number>;
}
export interface StreamHandlers {
  onText(text: string): void;
  onDone(done: DoneEvent): void;
  onError(message: string): void;
}

export async function streamChat(api, body: ChatBody, handlers: StreamHandlers, signal?: AbortSignal): Promise<void>
export async function fetchModels(api, provider, apiKey?, baseUrl?): Promise<string[]>
export async function codexLogin(api): Promise<string /* auth_url */>
export async function codexStatus(api): Promise<{ status: string; email?: string }>
export async function codexLogout(api): Promise<void>
```

`streamChat`: POST `/api/llm/chat` via `api.http.fetch`; non-OK → `onError` with status + body snippet; otherwise read `res.body.getReader()`, decode chunks, split on `\n\n`, parse `data: ` JSON lines, dispatch `text_delta`→onText, `done`→onDone, `error`→onError (terminal — stop reading). Handle multi-event chunks and events split across chunks (buffer carry-over).

Tests (vitest, fake `api.http.fetch` returning a `Response` with a `ReadableStream` body): text deltas dispatched in order; done parsed with tool_calls; error event terminal; split-across-chunks event reassembled; HTTP 400 surfaces as onError.

- [ ] Commit: `feat(llm-client): SSE chat stream consumer + endpoint wrappers`

### Task 4: settings + conversation persistence

**Files:** `ui/src/state/settings.ts`, `ui/src/state/conversations.ts`, tests for both.

```ts
// settings.ts
export interface Settings {
  provider: Provider;
  models: Partial<Record<Provider, string>>;   // last-used model per provider
  apiKeys: Partial<Record<'openai' | 'openrouter' | 'anthropic' | 'custom', string>>;
  customBaseUrl: string;
}
export const DEFAULT_SETTINGS: Settings = {
  provider: 'openai',
  models: { 'openai': 'gpt-5.2', 'openai-codex': 'gpt-5.5', 'openrouter': '', 'anthropic': 'claude-sonnet-4-6', 'custom': '' },
  apiKeys: {}, customBaseUrl: '',
};
export function loadSettings(api): Settings   // storage key 'settings', merge over defaults
export function saveSettings(api, s: Settings): void
export function providerReady(s: Settings, codexLoggedIn: boolean): boolean
// key providers need apiKeys[provider]; custom needs customBaseUrl; openai-codex needs codexLoggedIn
```

```ts
// conversations.ts
export interface ChatTurn {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: WireToolCall[];
  tool_call_id?: string;
  opsSummary?: string;        // human-readable per-assistant-turn applied-ops chip
}
export interface Conversation {
  id: string; title: string; createdAt: number; updatedAt: number;
  provider: Provider; model: string; messages: ChatTurn[];
}
export const MAX_CONVERSATIONS = 50;
export function listConversations(api): Conversation[]          // newest first
export function saveConversation(api, c: Conversation): void    // upsert; trim to cap (oldest dropped)
export function deleteConversation(api, id: string): void
export function newConversation(provider, model): Conversation  // id = crypto.randomUUID(), title ''
export function titleFrom(text: string): string                 // first user msg, 40 chars
```

Storage key `conversations` (the api.storage layer namespaces it). Tests with an in-memory fake `api.storage`: roundtrip, cap-trim order, upsert updates `updatedAt`, delete, corrupt-JSON tolerance (returns []).

- [ ] Commit: `feat(state): settings + capped conversation persistence`

### Task 5: prompt builder

**Files:** `ui/src/agent/prompt.ts`, test.

```ts
export const GRAPH_CHAR_LIMIT = 30_000;
export function compactCatalog(defs: NodeDefinition[]): string
// One line per node:
//   Conv2d (Layer): in[x:TENSOR] out[y:TENSOR] params[out_channels:int=32{1..}, mode:select=a{a|b}]
// ranges only when min/max non-null; select options piped; no description (keeps tokens low).
export function graphSnapshot(graph: SerializedGraph): string
// JSON.stringify({nodes, edges}) of the serialized graph; if longer than
// GRAPH_CHAR_LIMIT, truncate and append "\n[graph truncated - N of M chars]".
export function buildSystemPrompt(defs: NodeDefinition[], graph: SerializedGraph): string
```

System prompt content (verbatim base, single template literal):

- Identity: "You are Graph Copilot inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and edit the user's graph by calling tools."
- Graph model: nodes have a type from the catalog, ports (typed inputs/outputs), and params; edges connect an output handle to an input handle; types must be compatible.
- Rules: use exact node-type names from the catalog; connect every required input of nodes you add; set params via `set_params` or `add_node.params` respecting types/ranges; finish structural batches with one `auto_layout` op; never `clear_graph` unless the user explicitly asked to start over; if an op fails, read the error and correct yourself; prefer small batches; reply in the user's language; after applying changes, summarize what changed in one or two sentences.
- Then `## Available node types` + catalog, `## Current graph` + snapshot.

Tests: catalog line format (params with range/options, node with no ports), truncation marker, prompt contains catalog + snapshot + the never-clear rule.

- [ ] Commit: `feat(agent): system prompt builder with compact catalog + graph snapshot`

### Task 6: agent tool loop

**Files:** `ui/src/agent/loop.ts`, test.

```ts
export const MAX_TOOL_ROUNDS = 8;
export const TOOLS = [
  {
    name: 'apply_graph_operations',
    description: 'Apply a batch of graph edits to the canvas. Failing operations are skipped and reported; the batch is one undo step.',
    input_schema: {
      type: 'object',
      properties: {
        operations: {
          type: 'array',
          items: { type: 'object' },  // GraphOp union documented in description
        },
      },
      required: ['operations'],
    },
  },
  {
    name: 'get_current_graph',
    description: 'Read the current serialized graph (the user may have edited it manually).',
    input_schema: { type: 'object', properties: {} },
  },
];

export interface TurnCallbacks {
  onTextDelta(t: string): void;
  onOpsApplied(summary: string, result: ApplyResult): void;
  onTurnsCommitted(turns: ChatTurn[]): void;  // assistant + tool turns to persist
  onError(message: string): void;
  onFinished(): void;
}

export async function runTurn(opts: {
  api: CodefyUIPluginAPI;
  settings: Settings;
  history: ChatTurn[];           // prior conversation turns (no system)
  userText: string;
  callbacks: TurnCallbacks;
  signal?: AbortSignal;
}): Promise<void>
```

Behavior:
1. Build wire messages: `[{role:'system', content: buildSystemPrompt(api.graph.getNodeDefinitions(), api.graph.getGraph())}, ...windowed(history), {role:'user', content:userText}]`. Window = last 20 turns.
2. Loop up to MAX_TOOL_ROUNDS: `streamChat` with TOOLS; text deltas → onTextDelta.
3. On done with `stop_reason === 'tool_use'`: for each tool_call execute locally:
   - `apply_graph_operations`: validate `arguments.operations` is an array (else tool result = error text); `api.graph.applyOperations(ops)`; summary like `add_node x2 ok, connect x1 ok, set_params x1 FAILED`; onOpsApplied(summary, result); tool result content = JSON of `{results, refs, node_count, edge_count}`.
   - `get_current_graph`: tool result content = `graphSnapshot(api.graph.getGraph())`.
   Append assistant turn (content + tool_calls) and tool turns to the wire messages AND collect as ChatTurns; continue loop.
4. On done with `stop_reason === 'end'`: commit collected turns + final assistant turn via onTurnsCommitted; onFinished.
5. On error event: onError (turns so far still committed so the conversation is not lost).
6. Round 9 would-be: stop, append a synthetic assistant note "(stopped after 8 tool rounds)" and finish.

Tests (mock `streamChat` via vi.mock, fake api): single text-only turn; tool round (assistant tool_use → ops applied → followup end turn) asserting wire messages contain tool result with refs JSON; invalid arguments (operations not array) → error tool result, loop continues; cap at 8 rounds; stream error mid-loop commits prior turns.

- [ ] Commit: `feat(agent): tool loop with per-op error feedback and round cap`

### Task 7: UI components — shell, FAB, chat view

**Files:** `ui/src/index.tsx`, `ui/src/components/CopilotApp.tsx`, `Fab.tsx`, `ChatWindow.tsx`, `ChatView.tsx`, `MessageBubble.tsx`, `ui/src/styles.css`. Test: light render tests for ChatView states.

Visual language ("Crafted dark"): surfaces `#1e1e1e`/`#16191f`, border `#2a2f3a`, text `#e5e7eb`, dim text `#9ca3af`, accent `#06b6d4`, accent-ink `#0b1220`, radius 12px panel / 8px controls, font inherits app. All classes prefixed `gcp-`. No pictographic emoji; inline SVG icons (chat bubble, gear, clock-history, close ✕, send arrow).

- `index.tsx`: `export default function activate(api) { const el = api.ui.addFloatingWidget({ id: 'copilot' }); createRoot(el).render(<CopilotApp api={api} />); }`
- `CopilotApp`: state `open`; renders `<Fab>` always + `<ChatWindow>` when open. Panel positioned `absolute` relative to a `position:relative` wrapper so it anchors above the FAB (`bottom: 60px; right: 0`).
- `Fab`: 48px circle, accent bg, chat-bubble SVG, `aria-label="Graph Copilot"`, hover brightness + slight scale, active scale .95.
- `ChatWindow`: 420px wide, `height: min(600px, 70vh)`, flex column. Header: title "Graph Copilot", right-side icon buttons History / Settings / Close with `title` tooltips; view state `'chat' | 'history' | 'settings'`.
- `ChatView` props: `api, settings, conversation, onConversationChange, onOpenSettings`. Renders:
  - message list (auto-scroll to bottom on new content; `ref` + `scrollTop = scrollHeight`)
  - `MessageBubble`: user = right-aligned, `background: rgba(6,182,212,.15)`; assistant = left, `#262b36`; supports fenced code blocks (split on ``` into `<pre>` blocks) and preserves newlines; tool turns are NOT rendered as bubbles — an assistant turn's `opsSummary` renders as a chip row under the bubble (`Applied: <summary>`)
  - streaming: current assistant text grows in place with a blinking caret span while `busy`
  - error state: red-tinted bubble with the message + "Retry" button (re-sends the last user text)
  - input: textarea (1-5 rows autosize), Enter sends / Shift+Enter newline, Send icon-button; whole input row disabled with overlay CTA "Configure a provider in Settings" when `!providerReady(...)` (button opens settings view)
  - busy state: input disabled, Stop button (AbortController to cancel the stream)
- Wiring `runTurn`: on send → append user turn to conversation, save, call `runTurn`; callbacks update a local `streamingText` + append committed turns to the conversation + save; title set via `titleFrom` on first user message.

- [ ] Commit: `feat(ui): FAB + chat window shell + streaming chat view`

### Task 8: UI components — history + settings views

**Files:** `ui/src/components/HistoryView.tsx`, `SettingsView.tsx` (+ styles additions). Tests: settings providerReady gating + history list render with fake storage.

- `HistoryView` props `api, activeId, onResume(conv), onNew()`: "New chat" button on top; list of conversations (title or "(untitled)", relative time like "3h ago", `provider/model` dim suffix); click → resume; per-row ✕ delete button (confirm via two-click: first click turns the ✕ red, second deletes).
- `SettingsView` props `api, settings, onChange(s)`:
  - Provider select: OpenAI API / OpenAI Codex (ChatGPT) / OpenRouter / Claude API / Custom (OpenAI-compatible).
  - Model row: text input bound to `settings.models[provider]` + "Load list" button → `fetchModels` fills a `<datalist>`; errors show inline dim text.
  - Key rows (shown for openai/openrouter/anthropic/custom-with-key-optional): `<input type="password">` with show/hide toggle, saved on blur.
  - Custom: base URL text input (placeholder `http://127.0.0.1:11434/v1`).
  - Codex row (shown when provider = openai-codex): status line (Signed in as `<email>` / Not signed in / Sign-in pending...) + button Sign in → `codexLogin`, `window.open(auth_url, '_blank')`, poll `codexStatus` every 2s for up to 5 min; Sign out → `codexLogout`.
  - Footnote: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider."

- [ ] Commit: `feat(ui): history + settings views (providers, keys, codex sign-in)`

### Task 9: build dist + commit + local verify

- [ ] `cd ui && pnpm build` → `frontend/index.js` (single ESM file, CSS injected). Verify: `node -e "import('file:///.../frontend/index.js').then(m => console.log(typeof m.default))"` prints `function` (React bundled, no bare imports).
- [ ] `git add frontend/ && git commit -m "build: frontend dist v0.1.0"`

### Task 10: CI — tests + dist freshness

**Files:** `.github/workflows/ci.yml`

```yaml
name: ci
on:
  push: { branches: [main] }
  pull_request:
jobs:
  test-and-dist:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm, cache-dependency-path: ui/pnpm-lock.yaml }
      - run: pnpm install --frozen-lockfile
        working-directory: ui
      - run: pnpm test
        working-directory: ui
      - run: pnpm build
        working-directory: ui
      - name: dist freshness
        run: git diff --exit-code -- frontend/ || (echo "frontend/ dist is stale - run 'pnpm build' in ui/ and commit" && exit 1)
```

- [ ] Commit: `ci: vitest + build + committed-dist freshness gate`

### Task 11: README + push + GitHub repo

- [ ] Full README (EN body + a 繁體中文 section): what it does, screenshot placeholder, requirements (CodefyUI with PRs #55/#56 until a tagged release), install, provider setup incl. Codex sign-in note + ToS-gray-area disclosure, dev workflow, how the agent edits the graph (ops + single undo step), privacy/key handling.
- [ ] `gh repo create treeleaves30760/CodefyUI-Plugin-Graph-Copilot --public --source . --push --description "AI chat assistant plugin for CodefyUI - generate and edit node graphs by conversation"`
- [ ] Integration e2e happens in the CodefyUI worktree afterwards (Part of Task #4): real `cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot` against the dev server, Chrome run-through with the custom provider against the mock OpenAI server, undo check, history resume, settings persistence.
