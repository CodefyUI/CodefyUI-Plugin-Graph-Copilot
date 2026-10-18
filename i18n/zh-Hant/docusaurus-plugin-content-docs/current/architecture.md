---
id: architecture
title: 架構與 CodefyUI 相容性
sidebar_label: 架構
---

# 架構與 CodefyUI 相容性

Graph Copilot 是**在 CodefyUI 編輯器頁面執行的 Agent 工作台**。外掛負責聊天 UI、模型／工具迴圈、候選圖隔離、實驗協調、排名與瀏覽器歷史；CodefyUI 是畫布、節點定義、驗證、LLM proxy 與圖執行的權威。

:::important 目前邊界
本 repo 只有前端進入點，沒有 Graph Copilot server process、route、database、worker、durable queue 或 scheduler。關閉／重整頁面會中斷瀏覽器 Agent 與研究協調器。已提交的 **server-owned 宿主執行**可能繼續並可重新追蹤；這不是接續 Agent turn 或整份實驗研究。
:::

## 執行架構圖

```text
CodefyUI 編輯器頁面
┌──────────────────────────────────────────────────────────────────┐
│ Graph Copilot 前端外掛                                            │
│                                                                  │
│ 工作台 UI ──> journal-first Agent loop ──> 本機工具                │
│     │                   │                  ├─ 畫布 GraphOps        │
│     │                   │                  ├─ 已核准即時執行      │
│     │                   │                  └─ 隔離研究            │
│     └── 命名空間儲存 <── 對話／摘要／study bundles／active-run 指標 │
│ CodefyUIPluginAPI: ui | graph | http | storage                     │
└───────────────┬──────────────────────┬───────────────────────────┘
                │ authenticated HTTP   │ authenticated WebSocket
                v                      v
CodefyUI 後端（既有 core service，不由本外掛提供）
┌──────────────────────────────────────────────────────────────────┐
│ /api/llm/chat       provider proxy + SSE                          │
│ /api/graph/validate 權威結構驗證                                  │
│ /api/auth/bootstrap session token bootstrap                      │
│ /ws/execution       圖執行 + node-status stream                   │
│ /api/runs           選用 server-owned history／events／cancel     │
└───────────────┬──────────────────────────────────────────────────┘
                v
          已安裝節點／運算裝置／資料／外部副作用
```

瀏覽器是**協調器**；CodefyUI 既有後端是**執行引擎**。候選可不儲存／不載入編輯器就執行，但圖隔離不是通用副作用 sandbox。

Vite library bundle 在 `ui/src/index.tsx` 預設匯出 `activate(api)`，建立懸浮 widget，於 React Strict Mode 渲染 `CopilotApp`。已 commit 的 `frontend/index.js` 讓使用者不需 Node.js 工具鏈。外掛不匯入 core internals，沒有獨立面板 Undo 或 transaction API。

## Agent turn 生命週期

`runTurn` 擁有 turn-local journal 並回傳權威 `TurnResult`；UI callback 觀察進度，不控制執行。

1. **受保護初始化** — 記錄身分與 Ask／Edit 模式（預設 Edit）、建立精簡目錄／schema-redacted 即時圖快照、組合附件、以完整 assistant／tool 群組選歷史。Prompt 快照可截短，清空／驗證安全比較另用完整快照。
2. **模型串流** — `/api/llm/chat` 使用對應模式工具。Ask 允許讀圖／schema／驗證／研究及宿主執行紀錄，但工具清單與執行層拒絕畫布修改及**所有執行工具**；Edit 保留即時執行／研究／optimizer，需互動核准。缺少／格式錯誤的終止 `done` 事件是失敗，不靜默完成。
3. **派送前寫 journal** — 記錄 assistant 工具群組，每個呼叫預留結果位置。工具循序執行，派送前／await 後檢查取消；research 可平行四個只看 index 的請求，已核准研究最多兩次 concurrent execution。研究候選不確立連接埠名稱。
4. **Observer 前記錄效果** — 格式錯誤／空白／過大畫布批次在宿主前拒絕；清空須 singleton、snapshot-bound 確認。同步 `applyOperations` 前標記 unknown，回傳後立即擷取精確 indexed 回執，再通知 observer。執行派送另記錄；候選隔離或 socket 失敗不確立零副作用。
5. **本次修改的驗證 gate** — 只有已套用畫布修改（含 promotion）觸發自動結尾驗證／修復。Unavailable 不推動修復；最多兩次提示在 16 工具輪次內修正已授權範圍。快照變更、未解決錯誤或上限耗盡都是 incomplete。
6. **只終止一次** — 保留部分文字／已擷取證據，把待執行呼叫結為 cancelled／not-executed、提交完整群組、回傳一次結果。Observer 失敗不能抹除回執或改寫結果。

圖工具結果與 provider 引數的顯示／歷史副本依 schema／fail-closed 規則遮蔽；原始引數只留在活動 provider／工具執行路徑。助手文字的已知 secret 精確回聲在保存／重用前移除，無法回溯隱藏已串流回覆；自由使用者文字照原樣傳送／儲存。

畫布修改是**每批一個宿主 undo snapshot**，不是整個 turn。實驗修改序列化 clone，只有明確要求、preflight 與衝突檢查通過的純參數 promotion 才觸及畫布；結構贏家維持審查提案。見[圖編輯](./graph-editing.md)與[實驗與研究](./experiments-and-research.md)。

### 修復範圍

`ui/src/agent/toolGuards.ts` 的 `rememberAffectedNodes`／`repairScopeError` 依**成功 indexed 回執**而非全部提議操作建立權限。新增、直接修改及成功連線修改的目標節點進入 affected 集合；只當 edge source 不授權修改／刪除該既有來源。

修復拒絕 `clear_graph`、無關既有節點的 `set_params`／`remove_node`、無關目標輸入的 `connect`／`remove_edge`，以及與無關 live ID 衝突的 ref。所需新節點／已宣告 ref 可供應受影響輸入；`auto_layout` 仍可重新排列整張畫布。越界批次在派送前拒絕並結為 incomplete，不是 transaction，也不保證移除／排版沒有間接影響。驗證仍檢查整張圖。

## 結果與安全復原

| 證據 | 意義 |
| --- | --- |
| Agent 狀態 | `completed`、`cancelled`、`failed` 或 `incomplete` |
| 結構驗證 | `valid`、`invalid`、`unavailable`、`not_run` 或 `stale`，含有上限的錯誤 |
| 畫布證據 | `none`、`applied` 或 `unknown`，另記 attempted flag 與成功／失敗操作數 |
| 執行證據 | `sideEffectAttempted` 保守記錄已核准 runner 派送；選填 `hostRunId` 識別即時執行。宿主回執另載狀態、指標／輸出與不確定結果；`RunSummary` 沒有 execution-status enum。 |

已嘗試畫布寫入或已核准 runner 派送即不安全重播，即使沒有回報成功。`sideEffectAttempted` 在核准及 graph／signal preflight 後、runner 內部 token／連線／候選驗證前設為 true，不證明宿主 execute frame 已送出或接受；也涵蓋後續研究保存／promotion。唯讀 turn 可 completed 且 `not_run`；**結構有效不是執行證明**。即時執行／研究紀錄確立各自狀態與精確觀察指標，不代表模型品質或創意成功。

Agent turn ID、工具 outcome 與摘要 metadata 是本機資料，不作為 provider 訊息內容；宿主 run ID 可出現在執行／讀取工具結果。完整安全快照是暫存 executor state。Journal 在 projection 前擷取精確畫布回執；儲存／provider 可見圖證據依 schema 遮蔽，不新增帶 secrets 的要求／附件副本。

### Stop 與 detach

Abort 防護涵蓋串流、驗證、研究、核准與每次新工具／寫入派送。**Stop 阻止新工作，不回滾先前效果**，不能中斷已開始的同步宿主寫入。目前擁有的即時執行收到宿主 cancel action 後清理 socket，外部節點效果不撤銷。取消時，選填 `RunGraphOutcome.cancelConfirmed` 在未提交或已觀察到終止 acknowledgment 時為 true；取消寬限期耗盡或 socket 未收到 acknowledgment 就關閉時為 false。未確認取消的本機 turn 仍為 `cancelled`，工具結果則為 `unknown`，保留 `active_run` 指標且不發送完成通知。

**重新追蹤的既有宿主執行**有不同生命週期。Detach／Dismiss 或 abort follower 只停止觀察；明確 **Stop run** 呼叫宿主取消端點。連線中斷不確立 server-owned run 停止；保留 active-run 指標可供檢查／追蹤，不重新提交。

Retry 要求**畫布修改與已核准執行 runner 都未派送**。它重用原始要求、附件與嘗試前歷史，讓使用者要求在可見／wire 歷史保留一次，先前嘗試結果仍在。已嘗試／未知效果後，**Continue from current graph** 新增讀取即時圖／宿主 run 證據的指令，不重播工具或重提交執行。拒絕清空後結束 turn，不改用逐節點刪除。

## 對話完整性與面板生命週期

Provider 脈絡有**軟性 20 則訊息預算**，以完整 assistant／tool-call／result 群組選取；最新群組可超限，不被拆開。Legacy 不完整群組盡可能留文字，孤立結果排除而不捏造回執，歷史 call ID 不能變成新派送。

`useAgentRun` 把 callback／儲存綁定擷取的 turn／對話。Settings、History、Experiment Lab 或關閉已開啟面板時，聊天仍 mounted。離開聊天會同步停止**瀏覽器 Agent turn**與待核准要求，保留 mounted session 草稿／附件。已提交的 server-owned 即時執行在取得 ID 後停止觀察而不取消；舊版 socket-owned 執行仍取消。分開的 observation／explicit-cancel signal，讓 Stop 即使在 passive detach 等待 ID 時也能要求取消。切換／新建對話等結束；晚到 callback 可儲存原對話，不覆寫另一個活動聊天。草稿不跨重整保存。Reattach banner 只在聊天活動且原 turn 已結束時 mounted，避免漏掉晚到 ID 或同時有兩個 owner 追蹤；unmount 只停止觀察，不取消宿主執行。

Enter／Send 共用 readiness、busy 與附件防護；同步 latch 防重複啟動，IME 組字不提交。起始／run-summary 提示只填 composer 供審查。錯誤持續可見、捲動提供 **Jump to latest**、面板 non-modal／受視窗限制、關閉還原焦點並尊重 reduced motion。樣式使用宿主 tokens／fallback，不是新 theme API 契約。

## 已實作實驗資料流

```text
擷取 active graph
        ├── 每個 variant 建立 clone，在記憶體套用 GraphOps
        ├── POST /api/graph/validate 驗證候選
        ├── 明確核准計畫、上限與副作用
        ├── /ws/execution 執行有效候選
        │       └── 收集 numeric output／progress evidence + runtime
        ├── 完整 repetitions 與單一 canonical objective identity
        ├── 衝突檢查後選擇性 promotion 純參數贏家
        └── 遮蔽 + SHA-256 檢查 canonical portable-study content
```

上限維持 8 variants、1–5 次重複、16 次執行、最多 2 次 concurrent execution、每次候選 10 分鐘。完整小 grid／版本化 seeded-random 沿用同一核准／預算。候選隔離不 sandbox 檔案／網路寫入，完全平手不以 runtime 打破。

Portable study 包含 redacted baseline、captured redacted GraphOps、scalar evidence、producer／provenance 與衍生統計。匯入在預覽前 cross-check raw／derived evidence 與 canonical semantic SHA-256，明確匯入不執行／promotion；內部一致性不是作者身分。下載圖 JSON 重新套用 redacted ops、未解析 secrets 留空，不是 exact prepared-execution replay。契約沒有真正標記候選分頁的 API。

## 即時圖執行（`run_graph`）

Edit 下 run／train／evaluate 要求可執行**即時畫布圖**並帶真實副作用：

1. 伺服器結構驗證通過；
2. 防圖變更的核准 dialog 審查數量、節點型別、時間上限與副作用；session bootstrap 後及送出 execute frame 前，再檢查已核准圖快照與身分；
3. `/ws/execution` 串流節點狀態、訓練進度／loss 與新版宿主指標；
4. 工具記錄宿主結果、逐節點 scalar／string 輸出、最終進度、指標／log 尾端、節點錯誤與支援的 media 參照／預覽。

同時只提交一次即時執行，預設上限 6 小時、可調至 12。研究是 unsaved clone，使用 `record_outputs: false`／`weights_persistent: false`；即時執行使用 `record_outputs: false`／`weights_persistent: true`。Device 由 Agent 指定或在可用時取 `GET /api/system/devices` 宿主預設；省略退回宿主行為，可能為 CPU。工具結果轉送 media 參照，不含完整 artifact bytes。

### 執行紀錄與重新追蹤

切換工作台頁面、關閉面板或 unmount 會停止瀏覽器 Agent 並拒絕未決核准。若已提交至 server-owned-run 宿主，這種被動離開只中斷觀察，不送出 `cancel`。Runner 最多等待五秒取得晚到的宿主 run ID，並保存 `active_run` 指標。重新開啟 Chat 會在原 owner 結束後依指標追蹤，不重新提交圖。若 ID 始終未到達，外掛保留獨立的「身分未確認提交」reservation 並請使用者檢查宿主；解除限制需明確確認宿主沒有活動執行，不能只 dismiss 警告。Detached execution 記錄為仍在執行或未知，不會假稱成功完成或已確認取消。

Composer 的 **Stop** 與 timeout 仍要求取消並等待原生清理證據。時間上限屬於連線中的瀏覽器 runner，不是耐久的宿主 deadline：detach 會清除本機 timer，因此離開追蹤後需透過宿主或 reattach 卡停止執行。CodefyUI 1.3.0 的 run 為 socket-owned，因此被動離開保留舊版取消行為。Server-owned host run 可跨 socket 關閉或頁面重整繼續，但瀏覽器 Agent 與 study coordinator 不會持續執行；重整後恢復追蹤的前提是 run ID 已保存。

提供 `/api/runs` 的宿主讓 `list_runs`／`get_run` 讀編輯器啟動的執行。Reattach 卡以 cursor／long polling 追蹤 `GET /api/runs/{id}/events`，沿用 `wireOutputs` 正規化器，顯示狀態／loss、人手 **Stop run**（`POST /api/runs/{id}/cancel`），或離開期間完成的 `final_metrics`。Dismiss 只隱藏卡片並停止追蹤，不清除活動執行的 reservation。摘要提示只填 composer，不自動送出。

活動中或狀態未確認的追蹤 run 都會阻止另一即時提交。未知連線錯誤、授權失敗與無法讀取的紀錄保留 pointer，不假定執行已停止；只有權威終態或執行不存在的證據才允許清除。介面會 feature-detect；沒有 `/api/runs` 回報 unavailable。**Settings → Behavior** 下的背景執行完成通知設定（預設開啟）在取得瀏覽器權限後，可通知隱藏分頁追蹤執行完成；detach 不發送完成通知。Reattach 是宿主 run recovery，不是 durable study 協調。

## CodefyUI 契約邊界

Manifest 宣告 **`requires_codefyui = ">=1.3.0"`**，是基礎安裝契約，不保證每個新版 run／catalog／model 能力都在 1.3.0 可用。下表保留 **2026-07-14** 檢查的歷史宿主快照（`4260585`），不是對今日宿主 `main` 的新驗證。

| Surface | CodefyUI 1.3.0／API v1 | 新版宿主附加能力 | 外掛依賴 |
| --- | --- | --- | --- |
| Activation | Default-export function 接收 API | Linked-plugin cleanup／hot reload | 基礎進入點契約 |
| `api.ui` | Floating widget、toast | 相同基礎 helpers | 必要 |
| `api.graph` | 圖／catalog 讀取、同步 apply、change subscription | 相同基礎 helpers | 必要 |
| `api.http` | Session-aware fetch | 額外後端 routes | 必要；feature-detect 能力 |
| `api.storage` | Namespaced get／set／remove | 相同 | 必要 |
| `api.nodes` | 無 | API v2 custom renderer registration | 選用、非必要 |
| Run history／events／cancel | 無 `/api/runs`、socket-owned runs | Server-owned run REST surface | 僅 run awareness／reattach 必要 |
| Rich model／effort metadata | 可能無 | Catalog 與轉送 `reasoning_effort` | 對應控制／模型必要 |

JavaScript 物件之外使用既有 `POST /api/graph/validate`、`GET /api/auth/bootstrap`、`/ws/execution` 與 feature-detected device／run／model surface。Graph Copilot 不註冊後端 routes。

`wireOutputs` 正規化 legacy `output_summary`／`progress` 與新版 typed `outputs`（`progress`、`tensor_summary`、`text`、media）；形狀 adapter 不代表所有宿主都支援每種 output。Rich catalog／protocol-dependent 模型需明確提供對應能力的宿主；尊重宣告需求，不虛構未發布版本。Provider／model 預設與 reasoning 協商另見[供應商設定](./provider-setup.md)。

### 證據連結

- [CodefyUI 1.3.0 plugin API](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/api.ts)
- [CodefyUI 1.3.0 GraphOps](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/frontend/src/plugins/ops.ts)
- [CodefyUI 1.3.0 execution WebSocket](https://github.com/CodefyUI/CodefyUI/blob/1.3.0/backend/app/api/ws_execution.py)
- [目前 plugin contract](https://github.com/CodefyUI/CodefyUI/blob/main/frontend/src/plugins/contract.ts)
- [目前 frontend-extension guide](https://github.com/CodefyUI/CodefyUI/blob/main/docs/docs/advanced/plugin-frontend-extensions.md)

## 程式模組

| 路徑 | 職責 |
| --- | --- |
| `ui/src/components/` | 工作台、mounted 聊天生命週期、Settings／History／Lab、階段與結果 |
| `ui/src/components/useAgentRun.ts` | 擷取 turn／conversation controller、核准與安全復原 |
| `ui/src/components/RunResult.tsx` | 獨立 Agent／畫布／驗證／執行證據 |
| `ui/src/components/RunReattachBanner.tsx` | 既有宿主 run 追蹤、Stop／detach、離開期間完成指標 |
| `ui/src/agent/loop.ts`、`types.ts`、`toolGuards.ts`、`history.ts` | Tool catalog、journal、結果契約、scope／receipt／cancel guards、完整歷史群組 |
| `ui/src/agent/prompt.ts`、`historyRedaction.ts` | 圖／實驗政策與 schema／fail-closed provider／display 遮蔽 |
| `ui/src/agent/experiments.ts` | Clone／validate／execute／measure／rank、promotion、本機摘要 |
| `ui/src/agent/runtimeTools.ts` | 已核准 live／study／optimizer 派送、宿主 run 讀取、效果 journal、取消／pointer 處理 |
| `ui/src/agent/runGraph.ts` | 即時執行、進度／media、取消／時間上限、精簡結果 |
| `ui/src/agent/runHistory.ts`、`runPointer.ts` | REST run adapter／cursor follower、跨重整指標 |
| `ui/src/agent/wireOutputs.ts` | Legacy／新版 node-status 正規化 |
| `ui/src/agent/optimizer.ts` | Strict complete-grid／版本化 seeded-random 計畫編譯 |
| `ui/src/agent/experimentAnalysis.ts` | 描述性區間／effect size、formula-safe CSV、evidence Markdown |
| `ui/src/agent/studyBundle.ts`、`studyCapture.ts` | Portable schema／canonical SHA-256、redacted provenance 擷取 |
| `ui/src/agent/studyStorage.ts` | Blob-first／index-last 儲存、zero-write 匯入預覽 |
| `ui/src/agent/studyImportProjection.ts`、`studyMaterialize.ts` | 唯讀 evidence projection、衍生宿主格式圖 JSON |
| `ui/src/llm/` | 串流／abort 清理、provider wrappers、catalog／effort 協商 |
| `ui/src/state/` | Settings、有上限對話、附件、選填 run metadata |
| `ui/src/types/codefyui.d.ts` | 自含基礎型別鏡像與選填宿主附加欄位 |
| `ui/preview/`、`ui/e2e/` | 僅開發的 fake-host／browser harness，不進正式 entry |
| `frontend/index.js` | 已 commit 的 ESM bundle，注入 CSS |

React 19、TypeScript、Vite library mode + CSS-injected-by-JS、Vitest／jsdom、僅開發用 Playwright，無狀態函式庫。Mock-browser 證據不是真宿主整合或 live-LLM 品質。見[開發](./development.md)。

## 持久化與失敗模式

- 最多 50 筆對話與 provider 設定是 namespaced browser-local 資料；草稿只在記憶體。
- 圖脈絡／引數遮蔽 declared secrets、憑證型欄位、未知 schema 參數與已知 secret 精確回聲，不是使用者自由文字的通用憑證偵測器。
- 保留最多 20 筆精簡研究摘要與 10 份 content-addressed portable bundle；exclusive Web Locks 保護跨分頁修改。無 locks 仍可讀既有證據，但寫入 fail closed。
- Immutable blob 在 index 更新前 commit。匯入先驗證／預覽，明確確認才寫；候選衍生不呼叫 graph／network API。
- Active-run 指標可跨頁面存在，但瀏覽器 sockets、候選協調、queued study work、完整 tensors／artifacts 與 checkpoints 不是 durable 外掛 jobs。研究刻意不記錄完整輸出。
- Capture／storage 失敗只警告，不重複已完成執行。Digest 不驗證作者，也不補足缺少的 dataset／environment／node-pack／seed／checkpoint provenance。
- Requested promotion 僅限 preflight 的 `set_params`，revision／fingerprint 變更即拒絕。

Durable Agent jobs 與完整 provenance 見[後端 Agent 契約](./backend-agent-contract.md)及 [Agent 路線圖](./roadmap.md)。
