---
id: architecture
title: 架構與 CodefyUI 相容性
sidebar_label: 架構
---

# 架構與 CodefyUI 相容性

Graph Copilot 是一個**運行在 CodefyUI 編輯器頁面中的 agent 工作台**。外掛負責聊天介面、模型／工具迴圈、候選圖隔離、實驗協調、排名與瀏覽器端歷史；CodefyUI 則負責即時畫布、節點定義、圖驗證、LLM 代理與圖執行。

:::important 目前的邊界
這個 repository 只提供前端進入點，沒有新增 Graph Copilot 專屬的 server process、route、database、worker、持久化 job queue 或背景 scheduler。關閉瀏覽器會中斷執行中的 agent 回合或實驗。現有 CodefyUI 後端會執行每一張候選圖，但不會持久化或恢復整個 Graph Copilot 研究。
:::

## 執行架構圖

```text
CodefyUI 編輯器頁面
┌──────────────────────────────────────────────────────────────┐
│ Graph Copilot 前端外掛                                      │
│                                                              │
│ 工作台 UI ──> agent 迴圈 ──> 本機工具                        │
│    │                │          ├─ 畫布 GraphOps              │
│    │                │          └─ 隔離實驗協調器             │
│    └── 命名空間化 storage <── 對話／摘要／study bundle       │
│                                                              │
│ CodefyUIPluginAPI: ui | graph | http | storage               │
└──────────────┬─────────────────────┬─────────────────────────┘
               │ authenticated HTTP  │ authenticated WebSocket
               v                     v
現有 CodefyUI 後端（不是本外掛提供）
┌──────────────────────────────────────────────────────────────┐
│ /api/llm/chat       provider proxy + SSE                     │
│ /api/graph/validate 候選圖權威驗證                           │
│ /api/auth/bootstrap session token                            │
│ /ws/execution       圖執行與 node-status 串流                │
└──────────────────────────────────────────────────────────────┘
```

因此瀏覽器是**協調器**，現有 CodefyUI 後端是**執行引擎**。候選圖可以在不儲存、也不載入畫布的情況下執行，但這仍不是 server-side agent job。

## Agent 回合

每則使用者訊息會啟動一個有上限的工具回合：

1. 從精簡節點目錄與依 schema 去敏的目前圖快照建立 system prompt。
2. 透過 CodefyUI `/api/llm/chat` 代理串流模型回覆。
3. 模型可以讀取最新圖、在畫布套用已驗證的 GraphOps、研究大型節點目錄、在使用者確認後執行 live canvas graph、列出並查詢 host 的執行歷史，或啟動隔離實驗。
4. Graph tool result 會先依 schema／fail-closed 規則去敏，再回傳給模型；provider 產生之 tool call 的原始 argument 只留在當次 active provider/tool execution path。
5. Graph-editing answer 嘗試結束時，runnability gate 最多允許兩個由 validation error 驅動的 corrective rounds。Live graph 若仍無效，該回合會回報 blocked／invalid，而不接受成功。
6. 完成的對話、精簡實驗摘要與經過 integrity check 的 portable bundle 會寫入外掛的 browser storage。

一般畫布修改呼叫同步的 `api.graph.applyOperations`，每批操作形成一個 undo snapshot。實驗則先修改 serialized clone；只有使用者明確要求、active-graph revision 與 fingerprint 都未改變，而且 winner 僅含通過 preflight 的 `set_params` 時，才會自動套回畫布。Structural winner 只會留下不含值的待審查摘要。見[實驗與研究](./experiments-and-research.md)。

## 已實作的實驗資料流

```text
取得 active graph snapshot
        ├─ 每個 variant 建立 clone 並在記憶體套用 GraphOps
        ├─ POST /api/graph/validate 驗證候選圖
        ├─ /ws/execution 執行有效候選圖
        │      └─ 收集 scalar output_summary、numeric progress 與 runtime
        ├─ 完整 repetitions 使用同一 metric key 才排名
        ├─ 選擇性套用 parameter-only winner（先檢查衝突）
        └─ 去敏，並以 SHA-256 檢查 canonicalized portable-study content
```

Graph 隔離只保證候選 GraphOps 不會改動畫布，並不是通用 sandbox。若節點會寫檔、呼叫外部服務或改動其他資源，執行候選圖時仍可能產生副作用。

## Live graph run（`run_graph`）

使用者要求 run／train／evaluate 時，agent 可以執行 **live canvas graph** — 與編輯器 Run 按鈕相同的真實執行，帶真實副作用：

1. 先通過 server-side validation；
2. 使用者在 approval card 確認（節點／邊數、node types、時間上限、副作用警告），並套用與實驗核准相同的 concurrent-edit guard；
3. 圖經 `/ws/execution` 執行；node status 與 live training progress（loss、epoch）串流到面板的狀態列，並依串流的 progress frame 即時繪出 loss sparkline；
4. tool 回傳精簡結果：final status、per-node scalar/string output summary、最後 progress 值、`metric` 序列尾值、log text tail 與 per-node error。

長時間訓練是預期情境：一次一個 run，預設 6 小時 wall-clock 上限（最高可調至 12 小時）。在目前的 host 上，切換 workbench 頁面或關閉 Graph Copilot 會等 host 回傳 run id 後被動中斷 live socket，不送出 `cancel`。已保存的 `active_run` 指標會讓 ChatView 再次掛載時，由既有的重新掛回卡片繼續追蹤 server-owned run。composer 的 Stop 與 timeout 仍是明確的取消要求。CodefyUI 1.3.0 沒有 server-owned run history；feature detection 失敗時保留舊版 close/cancel 行為，因為執行生命週期屬於該 socket。在現行 host 上，頁面重載後 run 也會繼續：只要 host 為某次 run 命名 id，外掛就會立刻把 `active_run` 指標寫入命名空間化 storage；頁面載入時，重新掛回卡片會透過 `GET /api/runs/{id}/events` long polling 追上該 run，從該筆 run 紀錄的最後一個 cursor 接續（events 會經過與 socket 串流相同的 `wireOutputs` 正規化器解析）。卡片上有即時狀態列、loss sparkline、僅供使用者手動操作的 Stop（`POST /api/runs/{id}/cancel`）與 Dismiss；若 run 在頁面關閉期間已經結束，卡片會改顯示其最終 `final_metrics`，並附上一鍵提示，讓 agent 透過 `get_run` 幫忙摘要結果。只要指標所指的 run 仍在進行中，`run_graph` 就會拒絕新的提交。agent 的 `list_runs` 與 `get_run` 工具讀取同一個 REST surface — 包含從編輯器自身 Run 按鈕啟動的 run。以上機制皆會偵測 `/api/runs` 是否存在；1.3.0 host（run 由 socket 持有）會回報此功能無法使用；追蹤中的 run 在背景分頁完成時，也可以選擇性地觸發瀏覽器通知（Settings → Notifications，預設開啟）。

## CodefyUI 契約邊界

最低支援版本為 CodefyUI **1.3.0**。下表區分已發佈的 stable 契約，以及本頁於 **2026-07-14** 檢查的 CodefyUI `main`（`4260585`）。Graph Copilot 仍以 1.3.0 子集為相容基準。

| Surface | CodefyUI 1.3.0，stable `apiVersion: 1` | CodefyUI current `main`，`apiVersion: 2` | 本外掛依賴 |
| --- | --- | --- | --- |
| Activation | default export function 接收 plugin API | 同一契約；另有 linked-plugin frontend hot reload | v1 |
| `api.ui` | `addFloatingWidget({id})`、`toast(...)` | 相同 | v1 |
| `api.graph` | `getGraph`、`getNodeDefinitions`、同步 `applyOperations`、`onGraphChanged` | 相同 | v1 |
| `api.http` | 帶 session 的 `fetch` | 相同 | v1 |
| `api.storage` | 命名空間化的 `get`、`set`、`remove` | 相同 | v1 |
| `api.nodes` | 不存在 | additive `registerRenderer` 自訂 node body API | 非必要 |

實驗 runner 與 live-run tool 也會使用已存在於 1.3.0、但不屬於 JavaScript API object 的服務：

- `POST /api/graph/validate` 做權威驗證；
- `GET /api/auth/bootstrap` 取得 WebSocket session token；
- `/ws/execution` 的 `action: "execute"` — 實驗送 unsaved candidate clone，帶 `record_outputs: false` 與 `weights_persistent: false`；live run 送 canvas graph，帶 `record_outputs: false`、`weights_persistent: true` 與明確的 run-level `device`（agent 指定，否則用 `GET /api/system/devices` 的 host 預設 — 不帶的話現行 host 會把 execute 預設成 CPU，`device='auto'` 的節點會跟著走）；
- 接收 `node_status`、`execution_complete` 與 execution error，較新 host 另有批次 `metric` 事件。

`node_status` 的 payload 形狀在兩代 host 間不同：1.3.0 把 per-port summary 放在 `output_summary`、training frame 放在 `progress`；現行 host 改用 typed `outputs` entry list（`progress`、`tensor_summary`、`text` 與 media kinds）。外掛以單一 parser（`ui/src/agent/wireOutputs.ts`）同時支援兩種形狀，實驗 metrics 與 run 結果在任一代 host 都能運作。

完整 tensor／artifact 不會被實驗 runner 保留；目前只收集事件中的 scalar numeric summary/progress。以上都是 CodefyUI core 現有服務，本外掛沒有註冊新 endpoint。

## 程式模組

| 路徑 | 職責 |
| --- | --- |
| `ui/src/components/` | 工作台、聊天、設定、歷史、實驗呈現、訊息與工具階段 |
| `ui/src/components/RunReattachBanner.tsx` | 重新掛回卡片：帶 Stop 的即時追蹤、離開期間已完成的結果、通知交接 |
| `ui/src/agent/loop.ts` | tool schema、多輪 agent loop、dispatch 與 turn callback |
| `ui/src/agent/prompt.ts` | 圖／實驗政策與研究證據規則 |
| `ui/src/agent/experiments.ts` | clone、mutate、validate、execute、measure、rank、選擇性 promotion 與摘要 |
| `ui/src/agent/runGraph.ts` | live canvas graph 經 `/ws/execution` 執行：progress 串流、cancel／timeout 處理與精簡 run 結果 |
| `ui/src/agent/runHistory.ts` | `/api/runs` 的 REST adapter：probe、list／get／artifacts、cancel，以及 cursor-replay 加上 long-poll 的 run follower |
| `ui/src/agent/runPointer.ts` | 可撐過頁面重載、驅動重新掛回的持久化 active-run 指標 |
| `ui/src/agent/wireOutputs.ts` | 跨 host 世代正規化 `node_status` payload（1.3.0 `output_summary`/`progress` 與現行 typed `outputs`） |
| `ui/src/agent/optimizer.ts` | strict complete-grid 與 versioned seeded-random parameter plan compiler |
| `ui/src/agent/experimentAnalysis.ts` | descriptive interval／effect size、formula-safe CSV 與 evidence-labeled Markdown |
| `ui/src/agent/studyBundle.ts` | portable schema、canonical JSON、SHA-256 create／verify |
| `ui/src/agent/studyCapture.ts` | runtime evidence、schema-guided SecretRef 與 provenance adapter |
| `ui/src/agent/studyStorage.ts` | content-addressed blob-first/index-last storage 與 zero-write preview |
| `ui/src/agent/studyImportProjection.ts` | verified bundle 到 read-only Experiment Lab session 的 pure projection |
| `ui/src/agent/studyMaterialize.ts` | 把 captured redacted GraphOps 套到 redacted baseline，並編碼 host-shaped graph JSON |
| `ui/src/llm/` | provider-neutral 串流 client |
| `ui/src/state/` | 設定、對話與附件狀態 |
| `frontend/index.js` | 安裝時使用、已 commit 的 ESM bundle |

## 持久化與失敗模式

- 對話、provider 設定與最多 20 筆精簡實驗摘要存在 browser storage；摘要清單 mutation 會使用 exclusive Web Lock，避免不同分頁互相覆寫。
- Active graph snapshot 與 graph tool result 在 provider 使用前會先 scrub：node schema 會遮蔽宣告的 secret、credential-shaped key 會遞迴 scrub、未知 schema／parameter fail-closed，並移除這些已知去敏值的 exact echo。
- Assistant tool call 在顯示／持久化前會先複製並依 schema 去敏；原始 argument 只留在 active provider/tool execution path，而 assistant text 中的已知 exact echo 也會在本機持久化或後續 provider round 重用前移除。這不會回頭隱藏已串流的 live reply。自由文字 user message 仍會原樣送出與儲存。
- 最多 10 個 portable bundles 會依 parsed、canonicalized semantic content 的 SHA-256 digest 做 content-addressed 保留；immutable blob 與 index mutation 都在 exclusive Web Lock 內完成，blob 先於 index commit，import 先驗證再 preview，只有明確確認才寫入，而 candidate derivation 不呼叫 graph／network API。
- 若 browser 不提供 Web Locks，既有 studies 仍可讀取，但摘要與 portable bundle mutation 會 fail closed，不會退回可能造成跨分頁 evidence loss 的 tab-local lock。
- active socket、候選圖、queued run、完整 tensor/artifact 與 checkpoint 都不耐久。
- Portable bundle 包含去敏 baseline、captured redacted variant GraphOps、scalar run evidence／source identity、producer／provenance facts 與 derived summary。Import 會從 raw run record 重新計算並 cross-check derived statistics。Digest 檢查 canonicalized semantic consistency，而不是 raw file formatting 或作者身分；imported evidence 仍未經 authentication。Bundle 也無法自行發現 dataset hash、environment/node-pack revision、graph-node seed、checkpoint 或 artifact。
- automatic promotion 僅支援 `set_params` variant；若實驗期間 live graph 改變也會被拒絕。

需要關閉瀏覽器或重啟機器後仍可繼續的 server-owned job/provenance 架構，請見 [Durable backend agent 契約](./backend-agent-contract.md)與 [Agent roadmap](./roadmap.md)。
