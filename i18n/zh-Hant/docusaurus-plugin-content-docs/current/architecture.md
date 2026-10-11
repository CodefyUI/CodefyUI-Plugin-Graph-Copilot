---
id: architecture
title: 架構
sidebar_label: 架構
---

# 架構

Graph Copilot 是 `ui/` 裡的一個 **Vite 函式庫模式 React app**，建置成單一、被 commit 的 ESM 檔 `frontend/index.js`。終端使用者透過 GitHub tarball 安裝、不需 Node 工具鏈，所以建置出的 bundle 是刻意被 git 追蹤的。相容性仍是 **CodefyUI 1.3.0+ 與外掛 API v1**；可靠性改動不要求新宿主 API，也不改供應商／模型預設值。

## 外掛進入點與邊界

bundle 預設匯出 `activate(api)`（`ui/src/index.tsx:7`）。一切都透過 `CodefyUIPluginAPI` 物件抵達 CodefyUI — 圖操作、已驗證的 fetch、命名空間化的儲存 — 不從 core 匯入任何東西。進入點建立懸浮 widget，並在 React Strict Mode 裡渲染 `CopilotApp`。

`ui/src/types/codefyui.d.ts:99` 的 v1 型別鏡像提供同步 `graph.applyOperations`、圖／目錄讀取、圖變更訂閱、HTTP fetch、儲存與 UI helper。它**沒有面板 Undo、transaction、rollback 或圖執行 API**。一個操作批次是宿主的一個復原步驟，不是原子 transaction，也不是整次執行的一個復原步驟。

## Agent 迴圈

`runTurn` 擁有本次執行的 journal，並回傳權威的 `TurnResult`；UI callback 只觀察進度，不控制執行。

1. **在受保護的執行內初始化** — 記錄執行 ID 與 Ask／Edit 模式（預設 Edit），建立精簡目錄／即時圖提示、組合附件，並以完整工具群組選取歷史視窗。提示中的圖可被截斷；安全比較另用完整快照。
2. **透過 `/api/llm/chat` 串流** — Edit 提供五個工具：`apply_graph_operations`、`get_current_graph`、`get_node_schemas`、`validate_graph`、`research`。Ask 不提供修改工具，執行層也會拒絕它。缺少或格式錯誤的終止 `done` 事件算失敗，不會靜默當作完成。
3. **派送前先寫 journal** — 加入 assistant 的工具呼叫群組，為每個呼叫預留一個結果位置。循序執行工具，在派送前與 await 後檢查取消。只有 research 會平行送出最多四個只看 index 的子 agent 請求；實際連接埠與參數仍以 schema 為依據。
4. **保護寫入並記錄回執** — 格式錯誤、空白或過大的操作批次在宿主前拒絕。`clear_graph` 只允許 singleton，且須取得綁定執行、呼叫及完整快照的一次性核准。在同步寫入前將副作用標為 unknown，回傳後立刻記錄原始回執，再依 `OpResult.index` 解讀並通知 observer。缺少／重複／無法讀取的回執絕不代表成功。
5. **依本次修改完成檢查** — 只有本次真正修改圖才啟動自動驗證／修復 gate。兩種模式都可明確呼叫唯讀的 `validate_graph`。驗證的 HTTP／傳輸／格式錯誤算 unavailable，不是結構 invalid，也不觸發修復。最多兩次提示只要求修復本次已授權修改，工具回合上限為 16。執行層強制落實下述修復範圍。快照改變會使驗證或待確認清空失效；stale 結果與上限耗盡都是 incomplete。
6. **只終止一次** — 保留部分文字與已記錄回執，將未執行位置補成 cancelled／not-executed，提交完整群組並回傳一次終止結果。Observer 例外不能抹除回執或改變結果。

使用者可見的工具與接續契約，詳見[它如何編輯圖](./graph-editing.md)。

### 修復範圍

`ui/src/agent/toolGuards.ts:142` 的 `rememberAffectedNodes` 與 `repairScopeError` 依**成功的 indexed 回執**建立修復權限，不是依所有提出的操作。新增節點 ID、直接修改的節點，以及成功連線修改的目標會進入 affected 集合；只作為邊來源，不會授權編輯或刪除該既有來源節點。

無效驗證進入修復模式後，執行層拒絕 `clear_graph`、對無關既有節點的 `set_params`／`remove_node`，以及目標不在 affected 集合的 `connect`／`remove_edge`。新節點可提供缺少的輸入，批次中已先宣告的 ref 也可使用；與無關既有 ID 衝突的 ref 會被拒絕。`auto_layout` 仍可用，可能重新排列整個畫布。越界修復批次在派送宿主前拒絕並以 incomplete 結束；這不是完整圖 transaction，也不保證移除節點／排版沒有間接影響。

## 結果是證據，不是執行聲明

`RunSummary`（`ui/src/agent/types.ts:14`）保留各自獨立的維度：

| 維度 | 值／意義 |
| --- | --- |
| 執行狀態 | `completed`、`cancelled`、`failed`、`incomplete` |
| 結構驗證 | `valid`、`invalid`、`unavailable`、`not_run`、`stale`，另附有界錯誤細節 |
| 修改證據 | `none`、`applied`、`unknown`，另記 `mutationAttempted` 與成功／失敗操作數 |

只要嘗試宿主寫入，就不宜重播，即使沒有操作回報成功。宿主呼叫拋錯仍可能有副作用。完成的唯讀回答可以是 `not_run`；`valid` 只表示特定快照通過結構檢查，**不是 pipeline 執行成功**。

本機執行 ID、工具 outcome 與摘要 metadata 不會作為訊息內容送給供應商。完整比較快照只存在執行層的暫存狀態，不持久化到摘要，也不另外複製附件／請求。原始工具回執仍保留於對話的 tool 訊息。

## 取消與安全接續

同一個 AbortSignal 傳到模型串流、驗證、research 與清空確認。取消防護位於請求前、工具之間、await 後及同步修改前。Stop 只阻止**新的派送**；不會中斷已開始的宿主寫入，也不回滾先前批次。

- **Retry** 僅限從未派送宿主修改的情況。它重用原始要求／附件與嘗試前的歷史，讓使用者要求在可見與 wire 歷史各保留一次。新嘗試不會刪除先前結果。
- **Continue from current graph** 是已嘗試或副作用未知的修改之後的接續方式。它加入一則明確接續指令，重新讀圖，保留現有回執，而不是重播舊工具呼叫。
- 拒絕清空會結束執行，不會再給模型機會繞過決定。快照改變、Stop、導覽及關閉會使待核准要求失效或取消。

這是有防護的執行，不是宿主修改的 exactly-once 派送保證或 transaction rollback。

## 對話完整性與面板生命週期

送給供應商的視窗使用**軟性 20 則訊息上限**，以完整 assistant／tool-call／result 群組選取。最新群組可以超過上限，而不是被切斷。舊版不完整群組會盡可能保留 assistant 文字；孤立 tool 結果不進入供應商脈絡，不捏造回執，也不改寫已儲存歷史。歷史工具呼叫 ID 不接受為新的執行要求。

`useAgentRun` 擁有執行與原對話 ID；`ChatWindow` 在 Settings／History 隱藏而不 unmount 聊天，`CopilotApp` 也在關閉已開啟面板時保持 mounted。離開聊天或關閉會停止執行並取消確認，但保留該對話在 mounted 工作階段中的草稿與待送附件。切換／新增對話須等執行結束。晚到結果可儲存回原對話，不能覆寫另一個活動聊天。草稿不會在瀏覽器重新整理後保留。

Enter 與 Send 共用設定就緒／busy／附件防護；同步 latch 防止重複開始，IME 組字不送出。起手提示填入輸入框，附件錯誤持續可見，固定閱讀位置的捲動提供 **Jump to latest**，不強迫讀者往下。面板是 non-modal，關閉時還原焦點、適應視窗且尊重 reduced motion。宿主 token 的 fallback 不代表新的 light／dark API 契約。

## 模組

| 區域 | 職責 |
| --- | --- |
| `ui/src/llm/` | SSE 解析、取消／reader 清理、模型清單與 Codex 登入端點封裝 |
| `ui/src/agent/` | 提示建立、journal-first 迴圈、結果型別、歷史群組、操作／回執防護 |
| `ui/src/state/` | 供應商設定、有上限的對話儲存（50 筆）、向後相容的選填執行 metadata、附件 |
| `ui/src/components/` | FAB／視窗生命週期、`useAgentRun`、輸入框、階段列、`RunResult`、歷史、設定 |
| `ui/preview/`、`ui/e2e/` | 僅開發用的 mock-host 瀏覽器 harness 與 Playwright 檢查，不在正式函式庫進入點中 |

## 技術堆疊與驗證邊界

React 19、TypeScript、Vite 6（函式庫模式 + CSS-injected-by-JS）、Vitest + jsdom，以及僅開發用的 Playwright。沒有狀態函式庫 — 元件狀態加上簡單儲存 helper。

Mock-browser 檢查以假的宿主 API 與固定 SSE 驅動真實外掛進入點，**不是真實 CodefyUI 宿主驗證，也不是真實 LLM 品質測試**。可重跑指令與各層證據的範圍見[開發](./development.md)。
