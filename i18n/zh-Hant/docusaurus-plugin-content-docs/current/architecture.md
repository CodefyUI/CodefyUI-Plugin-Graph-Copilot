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
3. 模型可以讀取最新圖、在畫布套用已驗證的 GraphOps、研究大型節點目錄，或啟動隔離實驗。
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

實驗 runner 也會使用已存在於 1.3.0、但不屬於 JavaScript API object 的服務：

- `POST /api/graph/validate` 做權威驗證；
- `GET /api/auth/bootstrap` 取得 WebSocket session token；
- `/ws/execution` 執行 unsaved graph，帶唯一 `run_id`／`graph_id`、`record_outputs: false` 與 `weights_persistent: false`；
- 接收 `node_status`、`execution_complete` 與 execution error。

完整 tensor／artifact 不會被實驗 runner 保留；目前只收集事件中的 scalar numeric summary/progress。以上都是 CodefyUI core 現有服務，本外掛沒有註冊新 endpoint。

## 程式模組

| 路徑 | 職責 |
| --- | --- |
| `ui/src/components/` | 工作台、聊天、設定、歷史、實驗呈現、訊息與工具階段 |
| `ui/src/agent/loop.ts` | tool schema、多輪 agent loop、dispatch 與 turn callback |
| `ui/src/agent/prompt.ts` | 圖／實驗政策與研究證據規則 |
| `ui/src/agent/experiments.ts` | clone、mutate、validate、execute、measure、rank、選擇性 promotion 與摘要 |
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
