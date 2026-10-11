# Graph Copilot — AI chat assistant for CodefyUI

Chat with an AI to **generate, tune, and improve the node graph** on your CodefyUI canvas. Installing this plugin adds a floating assistant button at the bottom-right of the editor; clicking it opens a chat window where you can describe a pipeline, ask for parameter changes, or request read-only guidance. **Edit** is the default mode; each applied operation batch is one CodefyUI undo step (Ctrl+Z), not necessarily the whole agent run.

Full documentation: <https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/>

## Features

- **Build graphs by conversation** — the assistant knows your installed node catalog (types, ports, parameter schemas) and live graph, applies batched operations (`add_node`, `connect`, `set_params`, `remove_node`, `auto_layout`, ...), and corrects known per-operation errors within bounded tool rounds.
- **Ask or Edit** — Edit (default) can change the canvas; Ask is executor-enforced read-only, even if a model attempts a mutation. Clearing requires a separate, snapshot-bound confirmation.
- **Attach files** — add **images, PDFs, text, or code** to a message (attachment button, drag-and-drop, or paste). Text and PDFs are extracted and inlined into the prompt; images are sent as multimodal content to vision-capable models (OpenAI / Claude / OpenRouter). pdf.js is loaded on-demand from a CDN only when you attach a PDF.
- **Conversation history** — past chats are listed in the panel (capped at 50, stored in your browser). Tool-call/result groups stay intact in model context and are never replayed. Opening Settings/History or closing stops the run but preserves the mounted chat's current draft and attachments until you change conversations or reload.
- **Five providers** — set per-provider models and keys in the panel's Settings view:
  - **OpenAI API** (your API key)
  - **OpenAI Codex (ChatGPT account)** — sign in with your ChatGPT subscription, no API key
  - **OpenRouter** (your API key)
  - **Claude API** (your Anthropic API key)
  - **Custom (OpenAI-compatible)** — any base URL: Ollama, LM Studio, vLLM, ...
- **Staged streaming and explicit results** — markdown replies and expandable tool stages distinguish completed, error, cancelled, not-executed, and unknown outcomes. Each run ends as `completed`, `cancelled`, `failed`, or `incomplete`, separately from structural validation (`valid`, `invalid`, `unavailable`, `not_run`, `stale`). Structure validation is not proof that the pipeline executed.
- **Safe stopping and recovery** — Stop keeps partial text/receipts and prevents new dispatch; it does not undo prior changes. Retry is offered only if no host mutation was dispatched, preserving the original user request once. After attempted or unknown mutations, use **Continue from current graph** rather than replaying edits.

## Requirements

**CodefyUI 1.3.0 or later** — that release ships the two features this plugin is built on: plugin frontend extensions (the JS bundle this plugin loads) and the LLM provider proxy (`/api/llm/chat`). If `cdui --version` reports an older version, run `cdui update` first.

## Install

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

Reload the CodefyUI browser tab afterwards. The teal assistant button appears at the bottom-right, above the minimap.

## Provider setup

Open the chat panel → gear icon:

- **OpenAI / OpenRouter / Claude**: paste an API key, pick a model (the "Load list" button fetches your account's model list).
- **OpenAI Codex (ChatGPT)**: click "Sign in", approve in the browser tab that opens, return to CodefyUI. Uses your ChatGPT plan quota via the same flow as the open-source Codex CLI. Note: that flow reuses the Codex CLI's public OAuth client id, which is a gray area under OpenAI's terms — the same approach other third-party tools take; use at your own discretion.
- **Custom**: set a base URL such as `http://127.0.0.1:11434/v1` (Ollama). A key is optional.

### Where your keys live

API keys are stored in **your browser's localStorage** (namespaced per plugin) and sent **only to your local CodefyUI backend**, which forwards them per-request to the provider you selected. They are never persisted or logged server-side, and never sent anywhere else.

## How it edits the graph

The assistant gets a compact catalog plus a current graph snapshot on every message. Its five tools are:

- `apply_graph_operations` — Edit-only batches, guarded before dispatch and validated per-operation by the host; indexed receipts retain real node IDs/refs. One batch = one host undo step.
- `get_current_graph` — re-read the live canvas.
- `get_node_schemas` — exact ports, required/optional inputs, and parameter schemas.
- `validate_graph` — read-only structural checks, not execution.
- `research` — up to four parallel index-only sub-questions; candidate node types still need schema lookup before wiring.

`clear_graph` must be a singleton batch with one-time confirmation bound to the run, tool call, and full graph snapshot. Mixed clear-plus-other batches are rejected; graph changes invalidate approval, and declining ends the run without a removal workaround.

Automatic validation/repair is triggered only by actual **current-run edits**, with repairs limited to those authorized edits. It does not repair unrelated faults, Ask answers, or validation-service failures. See [the editing guide](docs/graph-editing.md) and [architecture](docs/architecture.md) for result and recovery details.

## Development

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # 90% statements/lines, 85% functions, 80% branches
pnpm --dir ui build                   # type-check + bundle to frontend/index.js
pnpm --dir ui preview:dev             # mock host at http://127.0.0.1:4179/?scenario=edit
pnpm --dir ui test:e2e                # Playwright; separate server on port 4187
```

For explicit mock-response steps use `&manual=1`; for the actual existing `frontend/index.js` use `&bundle=1`. Mock-browser checks, real-host integration, and real-LLM tests are separate evidence; this harness needs no live credentials and makes no live provider calls. See [Development](docs/development.md) for browser setup and exact commands.

`frontend/index.js` (the built ESM bundle) is **committed** — end users install via GitHub tarball with no Node toolchain, so CI fails if the dist is stale. After changing `ui/`, run `pnpm --dir ui build` and include the refreshed `frontend/` in the change. Compatibility remains CodefyUI 1.3.0+ / plugin API v1; provider/model defaults are unchanged.

Documentation site: <https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/> — source in `docs/` (Docusaurus, bilingual). Run it locally with `pnpm install --frozen-lockfile && pnpm start` at the repo root.

Built from the [CodefyUI-Plugin-Official](https://github.com/treeleaves30760/CodefyUI-Plugin-Official) template.

## License

MIT

---

# Graph Copilot — CodefyUI 的 AI 聊天助手（繁體中文）

跟 AI 對話來**生成、調整、改進**你畫布上的節點圖。安裝後編輯器右下角會多一顆懸浮按鈕，點開就是聊天視窗：描述 pipeline、要求改參數，或取得唯讀建議。預設 **Edit** 模式可修改畫布；每一批操作是 CodefyUI 的一個復原步驟（Ctrl+Z），不一定等於整次 Agent 執行。

完整文件：<https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/>

## 安裝

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

安裝後重新整理 CodefyUI 分頁。需要 **CodefyUI 1.3.0 或更新版本**（該版本內建本外掛所依賴的前端擴充與 LLM 代理）；若版本較舊請先執行 `cdui update`。

## 供應商設定

聊天面板 → 齒輪圖示：支援 OpenAI API、OpenAI Codex（ChatGPT 帳號）、OpenRouter、Claude API 與自訂 OpenAI 相容端點。

- **OpenAI／OpenRouter／Claude**：填 API key 並選模型；**Load list** 讀取帳號可用模型。
- **OpenAI Codex（ChatGPT）**：按 **Sign in**，在開啟的分頁核准後回到 CodefyUI，使用 ChatGPT 訂閱額度。
- **Custom**：設定 base URL，例如 `http://127.0.0.1:11434/v1`（Ollama）；key 可省略，也可用 LM Studio／vLLM 等端點。

API key 存在**你瀏覽器的 localStorage**，只會送到你本機的 CodefyUI 後端、再轉發給你選的供應商；伺服器端不落地、不記 log。Codex 登入沿用開源 Codex CLI 的公開 OAuth client id（OpenAI 條款灰色地帶，與其他第三方工具同款做法），請自行斟酌使用。

## 功能與安全結果

- **Ask／Edit** — Edit（預設）可以改圖；Ask 由執行層強制唯讀，即使模型嘗試修改也會拒絕。工具模式在每次執行中固定。
- **分階段串流** — Markdown 回覆與可展開工具列區分完成、錯誤、已取消、未執行與未知；部分文字與回執會保留。
- **分開呈現狀態** — 執行結果為 `completed`／`cancelled`／`failed`／`incomplete`；結構驗證另分 `valid`／`invalid`／`unavailable`／`not_run`／`stale`。結構通過不表示 pipeline 真正執行成功。
- **停止與接續** — Stop 阻止新派送，不撤銷先前修改。只有宿主修改從未派送才提供 Retry，原始使用者要求只保留一次；已嘗試或副作用未知時使用 **Continue from current graph**，不要重播編輯。

## 附加檔案

可以把**圖片、PDF、文字檔或程式碼**加進訊息裡（附件按鈕、拖放、或直接貼上）。文字檔與 PDF 會被擷取成文字併入提示；圖片則以多模態內容送給支援視覺的模型（OpenAI / Claude / OpenRouter）。PDF 解析用的 pdf.js 只有在你真的附加 PDF 時才從 CDN 即時載入，不會增加外掛體積。

## 對話紀錄

面板內建歷史清單（上限 50 筆，存在瀏覽器），點選即可接續先前的對話。模型脈絡保留完整工具呼叫／結果群組，不重播舊工具。開啟 Settings／History 或關閉面板會停止執行，但聊天仍保持 mounted，保留目前草稿與附件，直到切換對話或重新整理。

## 它如何編輯圖

每則訊息都帶入精簡節點目錄與目前圖快照，使用五個工具：

- `apply_graph_operations` — 僅 Edit 可用；派送前先防護，再由宿主逐操作驗證。Indexed 回執保留真實節點 ID／refs；一批為一個宿主復原步驟。
- `get_current_graph` — 重新讀取即時畫布。
- `get_node_schemas` — 精確連接埠、必填／選填輸入與參數 schema。
- `validate_graph` — 唯讀結構檢查，不執行圖。
- `research` — 最多四個平行、只看 index 的子題；候選節點在連線前仍須查 schema。

`clear_graph` 只允許 singleton batch，需一次性確認並綁定執行、工具呼叫與完整圖快照。清空混合其他操作的批次會被拒絕；圖改變時核准失效，拒絕則結束執行，不能改用逐節點刪除繞過。

只有**本次執行真正修改圖**才觸發自動驗證／修復，修復僅限已授權的本次修改，不處理無關問題、Ask 回答或驗證服務故障。詳細契約見[編輯指南](i18n/zh-Hant/docusaurus-plugin-content-docs/current/graph-editing.md)與[架構](i18n/zh-Hant/docusaurus-plugin-content-docs/current/architecture.md)。

## 開發

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # statements/lines 90%、functions 85%、branches 80%
pnpm --dir ui build                   # 型別檢查 + 打包到 frontend/index.js
pnpm --dir ui preview:dev             # mock host：http://127.0.0.1:4179/?scenario=edit
pnpm --dir ui test:e2e                # Playwright；獨立 server 使用 4187
```

`&manual=1` 讓 mock 回應逐步明確釋出；`&bundle=1` 載入現存的實際 `frontend/index.js`。Mock-browser、真宿主整合與真 LLM 測試是不同證據；harness 不需真實憑證，也不呼叫真實供應商。瀏覽器設定與完整指令見[開發文件](i18n/zh-Hant/docusaurus-plugin-content-docs/current/development.md)。

`frontend/index.js` 會被 commit，因為 GitHub tarball 安裝不需 Node；修改 `ui/` 後執行 `pnpm --dir ui build`，並納入更新 bundle，避免 CI 判定過期。相容性維持 CodefyUI 1.3.0+／外掛 API v1，供應商／模型預設值不變。

雙語 Docusaurus 文件在 repo 根目錄：`pnpm install --frozen-lockfile && pnpm start`，繁體中文預覽用 `pnpm start -- --locale zh-Hant`。本專案基於 [CodefyUI-Plugin-Official](https://github.com/treeleaves30760/CodefyUI-Plugin-Official) 範本，採 MIT 授權。
