---
id: graph-editing
title: Agent 如何編輯圖
sidebar_label: 圖編輯
---

# Agent 如何編輯圖

每則訊息，助手會收到已安裝節點型別的精簡**目錄**與依 schema 遮蔽敏感值的目前圖**快照**。Declared secrets、憑證型欄位及未知 schema／參數下的值不會原樣傳送。連線前必須查精確 schema；目錄名稱與研究建議本身不是連接埠證據。

實驗 variant 在**記憶體 clone** 套用相同 GraphOps，不直接改畫布；執行仍可能造成真實檔案、網路或其他節點副作用。見[實驗與研究](./experiments-and-research.md)。

## Ask 或 Edit

| 模式 | 可做的事 |
| --- | --- |
| **Ask** | 讀圖與 schema、研究候選、明確驗證結構，以及在受支援宿主查看執行紀錄。不能改畫布、啟動即時／實驗執行或自動修圖。 |
| **Edit**（預設） | 使用唯讀工具、套用畫布操作批次，以及另行取得人工核准後要求即時執行或有上限的研究。 |

模式在每次 Agent turn 中固定。Ask 的**唯讀由執行層強制落實**：模型工具清單排除畫布修改與執行工具，即使模型仍呼叫，也會在派送時拒絕。隔離候選圖不代表執行唯讀。

## 工具能力

| 工具 | 用途 | 模式 |
| --- | --- | --- |
| `get_current_graph` | 重讀畫布，包含對話期間的手動修改。 | Ask／Edit |
| `get_node_schemas` | 以 `node_types` 查精確節點型別，包括連接埠、必填／選填輸入、參數型別／預設值／範圍。 | Ask／Edit |
| `validate_graph` | 要求伺服器**結構驗證**，不執行圖。 | Ask／Edit |
| `research` | 平行研究最多四個獨立 `questions`。只看 index 的子 Agent 提供候選型別；連線前仍須精確 schema。 | Ask／Edit |
| `list_runs` | 在提供 run history 的宿主讀近期執行，包含編輯器啟動的執行。 | Ask／Edit |
| `get_run` | 讀單次宿主執行的狀態、紀錄指標及可用 artifact metadata，不重新啟動。 | Ask／Edit |
| `apply_graph_operations` | 套用非空、最多 100 個畫布操作的批次。**一批 = 一個宿主復原步驟。** | 僅 Edit |
| `run_graph` | 驗證並取得核准後執行即時圖，串流進度與精簡輸出。 | 僅 Edit |
| `run_graph_experiments` | 核准、執行、量測及排名隔離候選；promotion 另有限制。 | 僅 Edit |
| `optimize_graph_parameters` | 編譯有上限的確定性參數搜尋，沿用研究核准／預算。 | 僅 Edit |

`list_runs`／`get_run` 偵測宿主 `/api/runs` 能力。CodefyUI 1.3.0 等未提供介面的宿主回報 unavailable，不代表沒有執行。即時執行、研究、模型目錄與 reasoning 控制各有宿主能力要求；見[架構與 CodefyUI 相容性](./architecture.md)。

## 操作與回執

畫布操作包括 `add_node`、`connect`、`set_params`、`remove_node`、`remove_edge`、`clear_graph` 與 `auto_layout`。助手被要求：

- 使用精確節點型別與 schema 連接埠名稱；
- 連接新增節點的全部必填輸入；
- 遵守參數型別與範圍；
- 結構批次以一個 `auto_layout` 結尾；
- 除非你明確要求重來並確認，否則不可清空。

格式錯誤、空白或過大批次在**宿主派送前整批拒絕**。合法格式的批次由 CodefyUI 驗證語義：未知型別、連接埠不相容、參數超出範圍逐操作拒絕。已知失敗操作略過並回報模型，成功操作仍保留；不是全有或全無的 transaction。

結果依 **`OpResult.index`** 配對，不依陣列位置。缺少、重複或不可讀回執表示**副作用未知**，不可假定成功。`add_node` ref 只在同批是暫時 alias；後續批次使用回執 `refs` 或 `get_current_graph` 的真實 ID。顯示／儲存圖脈絡與工具引數依 schema 遮蔽；原始 provider 引數只留在目前工具執行路徑。

## 確認清空

`clear_graph` 必須是批次的**唯一操作**。清空混合新增／連線／排版會拒絕且不修改，不默默拆批。

- 一次性確認綁定 **Agent turn、工具呼叫與完整未截短圖快照**。
- 派送前再檢查核准。確認期間圖變更會使核准失效，turn 以 incomplete 結束，需新確認。
- **Keep graph** 拒絕清空並結束 turn；不得改用逐節點移除繞過。
- Stop、離開聊天到 Settings／History／Experiment Lab，或關閉面板會取消待核准要求。

即時執行／研究核准與清空確認分開。核准卡審查圖／候選、上限與副作用；核准一項不代表授權另一項。即時執行在 session bootstrap 後及提交前，再檢查已核准圖快照與身分；過期核准不能授權另一張圖。

## 閱讀進度與結果

每個模型輪次為編號訊息，含可展開**工具階段**、耗時及 composer 狀態列。只有活動工具轉圈；終止結果區分完成、錯誤、取消、未執行及未知。停止／失敗保留部分文字與回執。即時執行另可顯示節點進度、loss sparkline、影片參照與小型圖片預覽。

**Agent turn 結果**、**結構驗證**與**宿主執行結果**是不同證據：

| Agent 狀態 | 意義 |
| --- | --- |
| `completed` | Agent 完成有上限的流程，無未解決工具錯誤；本身不證明 pipeline 執行成功。 |
| `cancelled` | Turn 停止，含拒絕清空。UI 顯示 **Stopped**；先前效果仍保留。 |
| `failed` | Request、串流、初始化或宿主錯誤結束 turn。復原前查看畫布與執行證據。 |
| `incomplete` | 無法確立完成，例如上限耗盡、回執／驗證 unavailable 或 stale。 |

| 結構狀態 | 意義 |
| --- | --- |
| `valid` | 受檢圖快照通過結構驗證。 |
| `invalid` | 驗證器回報結構問題。 |
| `unavailable` | 無法取得驗證，含傳輸、HTTP 或錯誤回應格式；不證明圖無效。 |
| `not_run` | 沒有目前驗證結果；唯讀回答可不經驗證而完成。 |
| `stale` | 圖相對受保護快照已變，舊結果不能描述目前圖。 |

> **結構驗證通過不是執行證明。** 驗證檢查未知型別、缺必填輸入與參數範圍，不跑圖。`run_graph`／研究回執另報宿主狀態、指標、輸出與節點錯誤；工具結束不等於提交的圖成功。

## 有上限的驗證與修復

只有**目前 Agent turn 真正修改畫布**（含已套用 promotion）才觸發自動結尾驗證／修復。Ask／唯讀回答不修既有錯誤；明確 `validate_graph` 仍唯讀。驗證檢查整張目前圖，不只編輯節點。

成功 indexed 回執建立受影響節點的修復權限。執行層拒絕清空、改參數／移除無關既有節點，或改動無關目標輸入連線。所需新節點／既有輸出可供應受影響輸入；一般 `auto_layout` 可重新排列畫布，因此不保證零間接影響。

Invalid 最多觸發兩次修復提示，工具最多 16 輪。Unavailable 不觸發修復。最後檢查須描述最後修改快照；並行圖變更使結果 stale／incomplete。上限耗盡、越界修復或未解決問題都是 incomplete，不是成功。

## Stop、接續與復原

- **Stop 阻止新派送**，不能中斷已開始的同步畫布修改，也不撤銷先前變更。待執行呼叫收到 cancelled／not-executed，不會永久執行中。
- 活動即時執行另收到宿主取消要求並清理串流。寬限期耗盡或 socket 未收到終止 acknowledgment 就關閉時，本機 turn 仍為 `cancelled`，工具結果為 `unknown`；保留宿主 run 指標且不發送完成通知。取消不回滾節點檔案／網路副作用；連線中斷或本機 Stopped 標籤不證明 server-owned run 已停止。
- 提供 **Retry** 時，**畫布修改與已核准執行 runner 都必須未派送**。Runner 派送是保守證據，可早於宿主 execute frame；token／連線失敗仍不能重播。Retry 重用原始要求／附件，可見／provider 歷史不重複使用者要求，先前嘗試仍保留。已拒絕清空不重試。
- 任何已嘗試或未知的畫布變更**或執行**後，使用 **Continue from current graph**，不重播要求。先重讀圖、查看已知宿主執行，再決定剩餘工作；不自動重提交已派送執行。
- **CodefyUI Undo（Ctrl+Z）** 復原已套用畫布批次，一個 turn 可含多個復原步驟。面板無 transaction、自動回滾或獨立 Undo API；畫布 Undo 不能撤銷執行的外部副作用。

## 實驗與可攜候選

明確要求的純參數贏家需 preflight，通過 active-graph revision 與 baseline fingerprint 後才以 `applyOperations` 套用。研究期間圖修改或切換會拒絕 promotion；結構贏家是不含值的審查提案，不自動套用。

Verified portable study 可把 captured redacted GraphOps 套回 redacted baseline，衍生可下載圖 JSON。未解析 secrets 留空；下載不改畫布、不執行。Portable v1 未保留 exact prepared execution graph，schema defaults／執行準備可能不同，**不是精確重播 artifact**。見[實驗與研究](./experiments-and-research.md)。

## 保留位置與重新追蹤

開啟 Settings／History／Experiment Lab 或關閉面板會停止**目前 Agent turn**，但聊天保持 mounted，保留該對話的草稿與待送附件。這是記憶體面板 session 便利性，不跨重整保存草稿。等結束後才切換／建立對話；晚到 callback 可儲存原對話，不能覆寫另一個活動聊天。

Server-owned 宿主的已提交執行可能跨重整或連線中斷繼續。Reattach 卡追蹤既有執行，不重新提交。**Detach／Dismiss 或隱藏既有 follower 只停止觀察；明確 Stop run 才要求取消。** 離開期間完成的卡片顯示紀錄指標，可填入 `get_run` 摘要提示；重新追蹤不接續瀏覽器 Agent 或整份研究。

已儲存工具呼叫是脈絡，不是重播命令。Provider 歷史保留完整 assistant／tool-call／result 群組，排除孤立 legacy 結果；見[架構](./architecture.md)。

起始與 reattach 摘要提示只填 composer 供審查，不自動送出。Enter 共用 Send 的 readiness／busy／附件防護；Shift+Enter 換行，IME 組字不提交。附件錯誤保留至移除；向上捲動暫停自動跟隨，**Jump to latest** 恢復。
