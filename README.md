# Graph Copilot — AI chat assistant for CodefyUI

Chat with an AI to **generate, tune, and improve the node graph** on your CodefyUI canvas. Installing this plugin adds a floating assistant button at the bottom-right of the editor; clicking it opens a chat window where you can describe the pipeline you want, ask for parameter changes, or request improvements — the assistant edits the canvas directly through tool calls, and every AI edit is a single undo step (Ctrl+Z reverts it).

## Features

- **Build graphs by conversation** — the assistant knows your installed node catalog (types, ports, parameter schemas) and the live graph, applies batched operations (`add_node`, `connect`, `set_params`, `remove_node`, `auto_layout`, ...), and self-corrects from per-operation validation errors.
- **Conversation history** — past chats are listed in the panel; click one to continue where you left off (capped at 50, stored in your browser).
- **Five providers** — set per-provider models and keys in the panel's Settings view:
  - **OpenAI API** (your API key)
  - **OpenAI Codex (ChatGPT account)** — sign in with your ChatGPT subscription, no API key
  - **OpenRouter** (your API key)
  - **Claude API** (your Anthropic API key)
  - **Custom (OpenAI-compatible)** — any base URL: Ollama, LM Studio, vLLM, ...
- **Streaming replies** with applied-operations chips, stop button, and retry on errors.

## Requirements

CodefyUI with **plugin frontend extensions** and the **LLM provider proxy** — both land via [CodefyUI PR #55](https://github.com/treeleaves30760/CodefyUI/pull/55) and [PR #56](https://github.com/treeleaves30760/CodefyUI/pull/56). Once those ship in a tagged CodefyUI release, this section will pin the minimum version.

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

The assistant gets a compact catalog of your installed node types plus a snapshot of the current graph on every message. It edits through two tools:

- `apply_graph_operations` — a batch of ops applied through CodefyUI's plugin API with full validation (unknown types, port mismatches, parameter ranges are rejected per-op and reported back to the model so it can fix itself). One batch = one undo step.
- `get_current_graph` — re-reads the canvas, so manual edits you make mid-conversation are respected.

## Development

```bash
cd ui
pnpm install
pnpm test          # vitest
pnpm build         # type-check + bundle to ../frontend/index.js
```

`frontend/index.js` (the built ESM bundle) is **committed** — end users install via GitHub tarball with no Node toolchain, so CI fails if the dist is stale. After changing `ui/`, run `pnpm build` and commit the refreshed `frontend/`.

Design/plan docs: `docs/plans/`. Built from the [CodefyUI-Plugin-Official](https://github.com/treeleaves30760/CodefyUI-Plugin-Official) template.

## License

MIT

---

# Graph Copilot — CodefyUI 的 AI 聊天助手（繁體中文）

跟 AI 對話來**生成、調整、改進**你畫布上的節點圖。安裝後編輯器右下角會多一顆懸浮按鈕，點開就是聊天視窗：描述你要的 pipeline、要求改參數、或請它改進現有的圖 — 助手會直接透過工具呼叫編輯畫布，每一輪 AI 編輯都是一個復原步驟（Ctrl+Z 一次撤銷）。

## 安裝

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

安裝後重新整理 CodefyUI 分頁。需要包含 [PR #55](https://github.com/treeleaves30760/CodefyUI/pull/55) 與 [PR #56](https://github.com/treeleaves30760/CodefyUI/pull/56) 的 CodefyUI 版本。

## 供應商設定

聊天面板 → 齒輪圖示：支援 OpenAI API（填 key）、**OpenAI Codex（ChatGPT 帳號登入，吃訂閱額度）**、OpenRouter、Claude API、自訂 OpenAI 相容端點（Ollama / LM Studio / vLLM）。

API key 存在**你瀏覽器的 localStorage**，只會送到你本機的 CodefyUI 後端、再轉發給你選的供應商；伺服器端不落地、不記 log。Codex 登入沿用開源 Codex CLI 的公開 OAuth client id（OpenAI 條款灰色地帶，與其他第三方工具同款做法），請自行斟酌使用。

## 對話紀錄

面板內建歷史清單（上限 50 筆，存在瀏覽器），點選即可接續先前的對話。
