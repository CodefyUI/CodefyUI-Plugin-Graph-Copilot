# Graph Copilot — agent workbench for CodefyUI

Graph Copilot is a frontend plugin that adds an AI workbench to the CodefyUI editor. It can construct and revise node graphs, run bounded experiments on isolated graph variants, rank measured metrics, safely promote a parameter-only winner, and help turn observations into testable research questions. **Edit** is the default mode; **Ask** provides executor-enforced read-only guidance.

[Documentation](https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/) · [Architecture](docs/architecture.md) · [Graph editing](docs/graph-editing.md) · [Experiments and research](docs/experiments-and-research.md) · [Backend agent contract](docs/backend-agent-contract.md) · [Roadmap](docs/roadmap.md)

## What it can do

- **Build and tune graphs by conversation.** The agent receives an installed-node catalog and schema-redacted active-graph snapshot, looks up exact schemas, applies typed GraphOps, and self-corrects from indexed per-operation receipts. **One operation batch is one host undo step**, not a whole agent turn. Automatic structural validation/repair follows actual current-turn canvas edits, with at most two repair nudges; unrelated existing nodes are outside repair authority, although `auto_layout` can reposition the canvas. Unresolved structure is incomplete, not a successful edit.
- **Ask or Edit.** Ask can read graphs/schemas, research, explicitly validate structure, and inspect supported host runs. Both the tool list and executor prohibit canvas writes and live/experimental execution in Ask. Edit permits those actions; clearing, live execution, and studies have separate approvals.
- **Run the live graph on request.** When asked to run, train, or evaluate, the agent validates the canvas graph, asks for explicit confirmation, executes through the host's `/ws/execution`, and streams node status and training progress (loss, epochs, a loss sparkline). One live run at a time has a default 6-hour browser-monitored cap, adjustable to 12; detaching stops local timeout monitoring, not the host run. Results retain host outputs, metric/log tails, node errors, and supported video references or small image previews.
- **Follow long host runs.** `list_runs` and `get_run` inspect editor-started and plugin runs with exact recorded metrics. On server-owned-run hosts, a reattach card can follow an existing run after reload or report its final metrics; it does not submit the run again or resume an entire study. Dismissing/hiding that existing-run follower stops observation only; explicit Stop run requests cancellation. Optional browser notifications announce tracked completion in a background tab. On CodefyUI 1.3.0, these run-history read surfaces report unavailable.
- **Run isolated candidate studies.** In-memory clones are validated, executed through `/ws/execution`, measured, and ranked without temporary canvas graphs. Isolation does not sandbox node file/network side effects.
- **Search parameters deterministically.** Complete small grids and versioned seeded-random plans compile safe existing-node parameter domains into reviewable `set_params` candidates under the same approval and 16-run budget.
- **Promote parameter winners safely.** Promotion happens only when requested, only for parameter-only variants, and only after graph-revision and baseline-fingerprint checks. Structural winners remain review proposals.
- **Support research exploration.** Per-run scalar evidence, sample spread, descriptive Student-t intervals, Hedges g versus a baseline, failures, CSV/research-brief exports, and evidence-linked follow-ups retain observations without treating a pilot as proof, significance, or novelty.
- **Carry studies safely.** Completed studies attempt to capture a secret-redacted baseline, redacted GraphOps, exact scalar evidence, producer/provenance facts, and derived results in a portable bundle. Experiment Lab verifies SHA-256 over parsed, canonicalized semantic content and cross-checks statistics before preview. Import requires an explicit click and never executes or applies data; integrity is not authorship.
- **Present explicit results.** Numbered model rounds, Markdown replies, expandable tool stages/durations, and a composer status bar distinguish completed, error, cancelled, not-executed, and unknown tool outcomes. Agent status (`completed`, `cancelled`, `failed`, `incomplete`), structure status (`valid`, `invalid`, `unavailable`, `not_run`, `stale`), and host execution evidence are independent. Structural validation is not execution proof.
- **Stop and recover without replay.** Stop retains partial text/receipts and prevents new dispatch; it does not undo earlier effects. Active live execution also receives native cancellation, not rollback of external writes. Retry requires that neither canvas mutation nor an approved execution runner was dispatched and keeps the original user request once. After attempted or unknown effects, use **Continue from current graph** and inspect any known host run before doing more.
- **Keep conversation context.** Browser-local history holds up to 50 conversations; provider context keeps whole tool-call/result groups and never replays them. Settings/History/Experiment Lab navigation or panel close stops the browser agent and rejects pending approvals while preserving its mounted draft and attachments. An already-submitted server-owned live run detaches after its ID is saved, without cancellation; reopening Chat follows it without resubmitting. Explicit Stop and legacy socket-owned runs retain cancellation semantics. Dismissing a follower does not release the live-run reservation.
- **Use five providers.** OpenAI API, OpenAI Codex through a ChatGPT account, OpenRouter, Claude API, and custom OpenAI-compatible endpoints such as Ollama, LM Studio, or vLLM.
- **Accept attachments.** Images, PDFs, text, and code can be added by picker, drag-and-drop, or paste. Text/PDFs are extracted into the prompt; images use multimodal content with vision-capable models. pdf.js loads from a CDN only when a PDF is attached.

The panel consumes CodefyUI design tokens to follow the editor theme. Starter prompts fill the composer for review rather than sending immediately; Enter obeys the same readiness/busy/attachment guards as Send and does not submit during IME composition.

## Current architecture boundary

Graph Copilot's **orchestrator runs in the browser**:

```text
Graph Copilot UI + agent loop (browser)
        ├─ CodefyUIPluginAPI: canvas GraphOps and namespaced storage
        ├─ /api/llm/chat: existing CodefyUI provider proxy
        ├─ /api/graph/validate: existing CodefyUI validation
        ├─ /ws/execution: existing CodefyUI graph execution
        └─ /api/runs: optional host history, events, and cancellation
```

This repository declares only `[frontend] entry = "frontend/index.js"`. It ships no Graph Copilot backend route, database, durable queue, worker, or scheduler. Closing/reloading the page interrupts the browser agent and study coordinator; an already-submitted **server-owned host run may continue**. Reattachment follows that run, not a persisted or resumed Graph Copilot experiment job.

The manifest's **CodefyUI 1.3.0+** requirement covers baseline frontend API helpers and backend endpoints. Additive API v2 renderers/hot reload remain optional; server-owned run history, rich model catalogs, and reasoning controls require corresponding newer-host capabilities. See the [compatibility table](docs/architecture.md#codefyui-contract-boundary).

## Editing and approval boundaries

The agent exposes ten tools, grouped by authority:

- **Ask / Edit reads:** `get_current_graph`, `get_node_schemas`, `validate_graph`, `research`, `list_runs`, `get_run`.
- **Edit-only canvas writes:** `apply_graph_operations` — non-empty batches of up to 100 operations, host per-operation validation, and indexed receipts.
- **Edit-only execution:** `run_graph`, `run_graph_experiments`, `optimize_graph_parameters` — separate human approval; candidate isolation does not make execution read-only.

`clear_graph` must be a singleton batch with one-time confirmation bound to the agent turn, tool call, and full untruncated graph snapshot. Mixed clear-plus-other batches are rejected without splitting. Graph changes invalidate approval, and declining ends the turn without a removal workaround.

Automatic finish-time validation/repair is triggered only by actual **current-turn canvas edits**, including an applied promotion. It checks the whole graph but does not authorize repairing unrelated existing nodes or treating validation-service failure as invalid structure. See [Graph editing](docs/graph-editing.md) for exact result, repair, and recovery contracts.

## Experiment loop

When the agent calls `run_graph_experiments`, it performs:

1. snapshot the active graph;
2. clone and apply GraphOps to each variant in memory;
3. validate each candidate with CodefyUI and mirror the host's parameter checks;
4. review candidate node types and schema-redacted parameters, execution/repetition counts, concurrency, promotion, and side effects; execute only after explicit approval;
5. collect scalar numeric output/progress metrics and observed runtime while leaving full output recording disabled;
6. rank only candidates whose scheduled repetitions all succeeded and resolved one common objective identity across the study;
7. retain exact ties instead of breaking them by runtime;
8. optionally promote a parameter-only winner after graph-revision and fingerprint checks;
9. retain a browser-local summary and content-addressed portable bundle; declared secrets, credential-shaped fields, and unknown-schema values become secret references. Capture/storage failure is a warning, never a reason to rerun completed execution.

Limits are 8 variants, 1–5 repetitions, 16 total executions, at most 2 concurrent executions, and a 10-minute timeout per candidate run. Studies use `record_outputs: false` and `weights_persistent: false`; live runs use `record_outputs: false` and `weights_persistent: true`.

The plugin contract does not expose tab creation or opening a serialized graph in a new tab. From verified portable evidence, Experiment Lab can derive downloadable host-shaped graph JSON by reapplying redacted GraphOps to the redacted baseline. Secrets are blank; schema defaults or execution preparation may differ because the exact prepared graph is not persisted. Downloading never changes the canvas or executes a graph and is **not exact execution replay**.

For study design, metric selection, portable evidence, reproducibility, and responsible claims, see [Experiments and research](docs/experiments-and-research.md). Durable jobs, checkpoint/resume, adaptive optimization, complete environment/artifact provenance, confirmatory analysis, and true read-only candidate tabs require the phased [CodefyUI core roadmap](docs/roadmap.md).

## Requirements and installation

- CodefyUI 1.3.0 or later for the baseline plugin contract.
- Rich model catalogs/reasoning controls need an updated host that exposes catalog metadata and accepts/forwards `reasoning_effort`; run awareness/reattachment needs server-owned runs and `/api/runs`. Use a host build documenting the relevant capabilities; this repository assigns no invented unreleased version number.
- A supported remote provider, ChatGPT Codex login, or OpenAI-compatible local endpoint.

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

Reload the CodefyUI browser tab. The Graph Copilot button appears in the editor.

## Provider setup and data handling

Open workbench Settings and configure a provider/model:

- **OpenAI, OpenRouter, or Claude:** enter an API key and select a model.
- **OpenAI Codex:** sign in with a ChatGPT account through the browser flow.
- **Custom:** enter an OpenAI-compatible base URL; a key is optional for local servers that do not require one.

With a compatible updated host, the catalog includes **GPT-5.6 Sol** (`gpt-5.6-sol`; OpenAI may expose the `gpt-5.6` alias), **Terra** (`gpt-5.6-terra`), and **Luna** (`gpt-5.6-luna`). Startup and Settings synchronize the active ready built-in provider and cache results for five minutes; startup also negotiates saved reasoning effort. Discovery omission/failure never silently changes the selected model. **Refresh** bypasses the cache. Custom endpoints are queried for discovery only after explicit Refresh, never automatically.

Codex discovery uses the protocol the host implements and auto-lists only compatible models. A model requiring a newer host/protocol still requires a CodefyUI update. OpenAI `/v1/models` supplies IDs, not reasoning metadata, so curated GPT-5.6 fallbacks supply that metadata.

OpenAI and Codex default to **GPT-5.6 Sol**; Anthropic retains **Claude Sonnet 4.6**. Reasoning-capable catalogs expose controls in the composer and Settings. Supported OpenAI efforts are `none`, `low`, `medium`, `high`, `xhigh`, and `max`; the Codex fallback offers `low` through `max`. Codex defaults to `max`, stored per provider and sent only after host capability negotiation. `ultra` is intentionally excluded because it is a product-level delegation mode, not a portable single-request effort. See [Provider setup](docs/provider-setup.md).

Provider settings/keys live in browser-local, namespaced storage. The local `/api/llm/chat` proxy forwards credentials per request; CodefyUI 1.3.0 is designed not to persist/log them server-side. Graph snapshots and graph-tool results redact declared secrets, credential-shaped fields, unknown schemas/parameters, and exact known secret echoes. Original provider tool arguments remain only in the active execution path; displayed/history copies are schema-redacted. Known secret echoes in assistant text are scrubbed before persistence/reuse, **not retroactively hidden from already-streamed replies**. Free-form user messages are sent/stored as written: this is not a generic credential detector, so do not paste credentials. Treat the browser profile and installed frontend plugins as trusted code because they run in the editor session.

## Development

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # 90% statements/lines, 85% functions, 80% branches
pnpm --dir ui build                   # type-check + bundle to frontend/index.js
pnpm --dir ui preview:dev             # http://127.0.0.1:4179/?scenario=edit
pnpm --dir ui test:e2e                # Playwright; separate server on port 4187
```

Use `&manual=1` to release mock chat/validation responses explicitly and `&bundle=1` to load the actual existing `frontend/index.js`. Mock-browser checks, real-host integration, and real-LLM tests are separate evidence; the harness needs no live credentials or provider calls. Browser setup and exact commands are in [Development](docs/development.md).

The built ESM bundle is **committed** because installation consumes a repository archive without an end-user Node.js toolchain. After changing `ui/`, rebuild and include the refreshed `frontend/`; CI checks freshness. Baseline compatibility remains 1.3.0+, with newer features negotiated separately.

Run the bilingual Docusaurus site from the repository root:

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm start
```

Root typechecking covers the docs site; UI typechecking/building is separate. Preview Traditional Chinese with `pnpm start -- --locale zh-Hant`.

## License

MIT

---

# Graph Copilot — CodefyUI 的 Agent 工作台（繁體中文）

Graph Copilot 是 CodefyUI 編輯器的前端 AI 工作台：建構與修改節點圖、在隔離候選圖上執行有上限的實驗、依量測指標排名、安全套用純參數贏家，並把觀察整理成可驗證的研究問題。預設為 **Edit**；**Ask** 由執行層強制唯讀。

[完整文件](https://treeleaves30760.github.io/CodefyUI-Plugin-Graph-Copilot/zh-Hant/) · [架構](i18n/zh-Hant/docusaurus-plugin-content-docs/current/architecture.md) · [圖編輯](i18n/zh-Hant/docusaurus-plugin-content-docs/current/graph-editing.md) · [實驗與研究](i18n/zh-Hant/docusaurus-plugin-content-docs/current/experiments-and-research.md) · [後端 Agent 契約](i18n/zh-Hant/docusaurus-plugin-content-docs/current/backend-agent-contract.md) · [路線圖](i18n/zh-Hant/docusaurus-plugin-content-docs/current/roadmap.md)

## 功能

- **對話建圖與調參。** Agent 取得已安裝節點目錄與依 schema 遮蔽敏感值的即時圖快照，查精確 schema、套用 GraphOps，並依 indexed 操作回執修正。**一批操作是一個宿主復原步驟**，不是整次 Agent turn。只有本次真正修改畫布才觸發自動結構驗證／修復，最多兩次修復提示；無關既有節點不在修復權限內，但 `auto_layout` 可重新排列畫布。未解決的結構問題會標為 incomplete。
- **Ask／Edit。** Ask 可讀圖／schema、研究、明確驗證結構，以及讀取受支援的宿主執行紀錄；工具清單與執行層都禁止畫布修改及即時／實驗執行。Edit 可要求這些操作；清空、即時執行與研究分別需要核准。
- **依要求執行即時圖。** run／train／evaluate 要求會先驗證畫布、取得明確確認，再透過 `/ws/execution` 執行，串流節點狀態、loss、epoch 與 loss sparkline。同時只能提交一次即時執行，瀏覽器監控的時間上限預設 6 小時、可調至 12；detach 停止本機 timeout 監控，不停止宿主 run。結果保留宿主輸出、指標／log 尾端、節點錯誤及支援的影片參照／小型圖片預覽。
- **追蹤長時間宿主執行。** `list_runs`／`get_run` 可查看編輯器或外掛啟動的執行與精確紀錄指標。具 server-owned runs 的宿主可在重整後重新追蹤既有執行或顯示最終結果；不重新提交，也不接續整份研究。隱藏／dismiss 既有執行追蹤只停止觀察，明確 Stop run 才要求取消。選用瀏覽器通知可提示背景分頁的完成事件；CodefyUI 1.3.0 的執行紀錄讀取介面會回報 unavailable。
- **隔離候選研究。** 在記憶體 clone 上驗證、透過 `/ws/execution` 執行、量測與排名，不建立暫存畫布圖。隔離圖不會 sandbox 節點的檔案／網路副作用。
- **確定性的參數搜尋。** 完整小型 grid 與版本化 seeded-random 計畫把安全的既有節點參數範圍編譯為可審查的 `set_params` 候選，沿用同一核准與 16 次執行預算。
- **安全套用參數贏家。** 只有明確要求、候選僅含參數變更，且通過圖 revision 與 baseline fingerprint 檢查才套用；結構贏家只保留為審查提案。
- **研究探索。** 逐次 scalar、樣本分散度、描述性 Student-t 區間、相對 baseline 的 Hedges g、失敗紀錄、CSV／研究摘要及證據連結保留觀察，不把 pilot 當成證明、顯著性或新穎性。
- **安全攜帶研究。** 完成研究會嘗試擷取遮蔽 secrets 的 baseline、GraphOps、精確 scalar、producer／provenance 與衍生結果。Experiment Lab 在預覽前檢查解析後 canonical semantic content 的 SHA-256 與統計一致性；匯入需明確點擊，不執行也不套用資料。完整性不等於作者驗證。
- **明確呈現結果。** 編號模型輪次、Markdown、可展開工具階段／耗時與狀態列區分完成、錯誤、取消、未執行及未知。Agent 狀態（`completed`／`cancelled`／`failed`／`incomplete`）、結構狀態（`valid`／`invalid`／`unavailable`／`not_run`／`stale`）與宿主執行證據互相獨立；結構驗證不是執行證明。
- **不重播的停止與復原。** Stop 保留部分文字／回執並阻止新派送，不撤銷先前效果。即時執行另收到原生取消要求，但不回滾外部寫入。只有畫布修改與已核准執行 runner 都未派送才提供 Retry，原始使用者要求只保留一次；已嘗試或副作用未知時使用 **Continue from current graph**，先檢查既有宿主執行再決定下一步。
- **保留對話脈絡。** 瀏覽器最多保存 50 筆對話；provider 脈絡保留完整工具呼叫／結果群組而不重播。開啟 Settings／History／Experiment Lab 或關閉面板會停止瀏覽器 Agent、拒絕未決核准，同時保留 mounted 草稿與附件。已提交的 server-owned 即時執行在保存 ID 後停止觀察而不取消；重開 Chat 只重新追蹤，不重送執行。明確 Stop 與舊版 socket-owned run 維持取消語意；Dismiss 追蹤卡不解除活動執行的 reservation。
- **五種供應商。** OpenAI API、ChatGPT 帳號 Codex、OpenRouter、Claude API，以及 Ollama／LM Studio／vLLM 等自訂 OpenAI 相容端點。
- **附件。** 可選檔、拖放或貼上圖片、PDF、文字與程式碼；文字／PDF 擷取入提示，圖片送給支援視覺的多模態模型。只有附加 PDF 才從 CDN 載入 pdf.js。

面板沿用 CodefyUI design tokens 與編輯器主題。起始提示只填入 composer 供審查，不直接送出；Enter 與 Send 共用 readiness／busy／附件防護，IME 組字時不提交。

## 目前架構邊界

Graph Copilot 的**協調器在瀏覽器執行**：

```text
Graph Copilot UI + agent loop（瀏覽器）
        ├─ CodefyUIPluginAPI：畫布 GraphOps 與命名空間儲存
        ├─ /api/llm/chat：既有 provider proxy
        ├─ /api/graph/validate：既有圖驗證
        ├─ /ws/execution：既有圖執行
        └─ /api/runs：選用的宿主紀錄、事件與取消介面
```

本 repo 只宣告 `[frontend] entry = "frontend/index.js"`，沒有 Graph Copilot 後端 route、database、durable queue、worker 或 scheduler。關閉／重整頁面會中斷瀏覽器 Agent 與研究協調器；**已提交的 server-owned 宿主執行可能繼續**。Reattach 是追蹤既有執行，不是恢復持久化的 Graph Copilot 研究工作。

Manifest 的 **CodefyUI 1.3.0+** 要求涵蓋基礎前端 API 與後端端點；API v2 renderer／hot reload 是選用能力，server-owned 執行紀錄、rich model catalog 與 reasoning 控制另需新版宿主能力。見[相容性表](i18n/zh-Hant/docusaurus-plugin-content-docs/current/architecture.md#codefyui-契約邊界)。

## 編輯與核准邊界

十個工具依權限分組：

- **Ask／Edit 唯讀：** `get_current_graph`、`get_node_schemas`、`validate_graph`、`research`、`list_runs`、`get_run`。
- **僅 Edit 畫布修改：** `apply_graph_operations`，每批 1–100 個操作，由宿主逐操作驗證並回傳 indexed 回執。
- **僅 Edit 執行：** `run_graph`、`run_graph_experiments`、`optimize_graph_parameters`，需另行人工核准；候選圖隔離不代表執行唯讀。

`clear_graph` 只能是 singleton batch；一次性確認綁定 turn、工具呼叫與完整未截短圖快照。清空混合其他操作會整批拒絕，不拆批；圖變更會讓核准失效，拒絕後結束 turn，不可改用逐節點刪除繞過。

只有**本次真正修改畫布**（含已套用 promotion）才觸發自動結尾驗證／修復。驗證檢查整張圖，但不授權修改無關既有節點，也不把驗證服務故障視為 invalid。精確結果、修復與復原契約見[圖編輯](i18n/zh-Hant/docusaurus-plugin-content-docs/current/graph-editing.md)。

## 實驗流程

`run_graph_experiments` 會：

1. 擷取即時圖快照；
2. 在記憶體 clone 上套用各 variant 的 GraphOps；
3. 由 CodefyUI 驗證並鏡像宿主參數檢查；
4. 審查節點型別、遮蔽敏感值的參數、執行／重複次數、concurrency、promotion 與副作用，明確核准後才執行；
5. 收集 scalar output／progress 指標與觀察到的 runtime，不記錄完整輸出；
6. 只排名所有預定重複皆成功、且整份研究使用同一 objective identity 的候選；
7. 保留完全平手，不用 runtime 打破平手；
8. 依圖 revision 與 fingerprint 防護選擇性套用純參數贏家；
9. 儲存本機摘要與 content-addressed portable bundle；declared secrets、憑證型欄位與未知 schema 值轉為 secret references。擷取／儲存失敗只警告，不重跑已完成執行。

上限為 8 個 variant、1–5 次重複、共 16 次執行、最多 2 個 concurrent execution、每次候選執行 10 分鐘。研究使用 `record_outputs: false`／`weights_persistent: false`；即時執行使用 `record_outputs: false`／`weights_persistent: true`。

目前契約沒有建立分頁或在新分頁開啟序列化圖的 API。Experiment Lab 可由已驗證 portable evidence，把 redacted GraphOps 套回 redacted baseline，產生可下載的宿主格式圖 JSON。Secret 為空白；未保存 exact prepared graph，所以 schema defaults 或執行準備可能不同。下載不改畫布、不執行，也**不是精確執行重播**。

研究設計、指標、portable evidence、重現性與負責任主張見[實驗與研究](i18n/zh-Hant/docusaurus-plugin-content-docs/current/experiments-and-research.md)。Durable jobs、checkpoint／resume、自適應搜尋、完整環境／artifact provenance、確認性分析與真正唯讀候選分頁，需分階段的 [CodefyUI core 路線圖](i18n/zh-Hant/docusaurus-plugin-content-docs/current/roadmap.md)。

## 需求與安裝

- 基礎外掛契約需要 CodefyUI 1.3.0 或更新版本。
- Rich catalog／reasoning 控制需提供 metadata 並接受／轉送 `reasoning_effort` 的新版宿主；執行紀錄／reattach 需 server-owned runs 與 `/api/runs`。請使用明確記載對應能力的宿主，不自行假定未發布版本號。
- 支援的遠端 provider、ChatGPT Codex 登入或 OpenAI 相容本機端點。

```bash
cdui plugin install treeleaves30760/CodefyUI-Plugin-Graph-Copilot
```

重整 CodefyUI 瀏覽器分頁後，即可看到 Graph Copilot 按鈕。

## 供應商與資料處理

在工作台 Settings 設定 provider／model：

- **OpenAI／OpenRouter／Claude：** 填 API key 並選模型。
- **OpenAI Codex：** 透過瀏覽器流程登入 ChatGPT 帳號。
- **Custom：** 填 OpenAI 相容 base URL；不要求金鑰的本機 server 可省略 key。

相容新版宿主的 catalog 包含 **GPT-5.6 Sol**（`gpt-5.6-sol`；OpenAI 也可能提供 `gpt-5.6` alias）、**Terra**（`gpt-5.6-terra`）與 **Luna**（`gpt-5.6-luna`）。啟動／Settings 會同步目前 ready 的內建 provider，快取 5 分鐘；啟動亦協商已儲存 reasoning effort。Discovery 遺漏／失敗不會默默換掉已選模型，**Refresh** 略過快取。Custom 只在明確 Refresh 後查模型，從不自動查詢。

Codex discovery 依宿主已實作協定只自動列出相容模型；要求新版宿主／協定的模型仍需更新 CodefyUI。OpenAI `/v1/models` 只提供 ID，GPT-5.6 curated fallback 補足 reasoning metadata。

OpenAI 與 Codex 預設 **GPT-5.6 Sol**，Anthropic 保留 **Claude Sonnet 4.6**。支援 reasoning 的 catalog 在 composer 與 Settings 提供控制；OpenAI 可用 `none`／`low`／`medium`／`high`／`xhigh`／`max`，Codex fallback 為 `low` 至 `max`。Codex 預設 `max`，依 provider 保存，只有宿主協商支援後才送出。`ultra` 是產品層級 delegation，不是可攜的單次 request effort，因此刻意排除。見[供應商設定](i18n/zh-Hant/docusaurus-plugin-content-docs/current/provider-setup.md)。

設定／keys 放在瀏覽器命名空間儲存，本機 `/api/llm/chat` proxy 逐 request 轉送；CodefyUI 1.3.0 設計為不在伺服器保存／記錄金鑰。圖快照與工具結果遮蔽 declared secrets、憑證型欄位、未知 schema／參數與已知 secret 的精確回聲。原始 provider 工具引數只留在目前執行路徑，顯示／歷史副本依 schema 遮蔽；助手文字的已知 secret 回聲在保存／重用前移除，**無法回溯隱藏已串流顯示的文字**。自由文字訊息仍照原樣傳送／儲存；這不是通用憑證偵測器，請勿貼上憑證。瀏覽器 profile 與前端外掛在編輯器 session 執行，必須視為可信程式碼。

## 開發

```bash
pnpm --dir ui install --frozen-lockfile
pnpm --dir ui test                    # Vitest
pnpm --dir ui test:coverage           # statements/lines 90%、functions 85%、branches 80%
pnpm --dir ui build                   # 型別檢查 + 打包到 frontend/index.js
pnpm --dir ui preview:dev             # http://127.0.0.1:4179/?scenario=edit
pnpm --dir ui test:e2e                # Playwright；獨立 server 使用 4187
```

`&manual=1` 明確釋出 mock chat／validation 回應，`&bundle=1` 載入現存實際 `frontend/index.js`。Mock-browser、真宿主整合與真 LLM 測試是不同證據；harness 不需真憑證、不呼叫真 provider。瀏覽器設定與精確指令見[開發文件](i18n/zh-Hant/docusaurus-plugin-content-docs/current/development.md)。

ESM bundle 會 **commit**，因為 repo archive 安裝不需使用者 Node.js 工具鏈。修改 `ui/` 後重建並納入更新 `frontend/`；CI 檢查 freshness。基礎相容性為 1.3.0+，新版功能另行協商。

根目錄啟動雙語 Docusaurus：

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm start
```

Root 型別檢查只涵蓋文件網站；UI 型別檢查／build 獨立執行。繁體中文預覽使用 `pnpm start -- --locale zh-Hant`。

## 授權

MIT
