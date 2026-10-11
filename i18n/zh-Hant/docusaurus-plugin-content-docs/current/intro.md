---
id: intro
title: 介紹
slug: /
sidebar_label: 介紹
---

# Graph Copilot Agent 工作台

**Graph Copilot** 是 [CodefyUI](https://github.com/CodefyUI/CodefyUI) 的 Agent 工作台：建構與編輯圖、在隔離候選上執行有上限的實驗、依數值排名、選擇性套用純參數贏家，並把觀察整理成可驗證的研究後續問題。

安裝後，編輯器右下角會出現懸浮助手按鈕。工作台呈現目前模型與圖脈絡、聊天／工具進度、Experiment Lab、歷史與設定。預設 **Edit**；**Ask** 由執行層強制唯讀，不能啟動執行。每批已套用 GraphOps 是**一個宿主復原步驟**（Ctrl+Z），不是整次 Agent turn。Stop 不撤銷先前修改或節點的外部副作用。

:::important 目前「Agent」的範圍
規劃與研究協調在瀏覽器執行。CodefyUI 既有後端驗證並執行提交的圖；本外掛沒有 durable Agent server 或背景 job queue。研究期間請保持頁面開啟。Server-owned 宿主執行可能在重整後繼續並可重新追蹤，但 reattach 不接續瀏覽器 Agent 或整份研究。見[架構與 CodefyUI 相容性](./architecture.md)。
:::

## 功能

- **對話建圖** — 使用已安裝節點目錄、依 schema 遮蔽敏感值的即時圖、精確 schema 查詢及批次操作（`add_node`、`connect`、`set_params`、`remove_node`、`auto_layout` 等）。Indexed 回執支援有上限的修正；自動驗證／修復只跟隨本次真正修改，不處理無關既有問題。
- **執行即時圖** — 先結構驗證及另行核准，再由宿主執行。追蹤節點／訓練進度、loss、精簡輸出、支援的 media 與精確紀錄指標；結構通過本身不是執行證明。
- **追蹤宿主執行** — 受支援宿主以 `list_runs`／`get_run` 提供編輯器與外掛執行紀錄、重整 reattach 及選用完成通知。Dismiss／隱藏既有執行 follower 只停止觀察，明確 Stop run 才要求取消。
- **隔離實驗** — 記憶體 clone 經 CodefyUI WebSocket engine 驗證／執行後量測、排名，不建立暫存畫布圖；隔離不會 sandbox 檔案／網路副作用。
- **有上限的參數搜尋** — 完整 grid 與版本化 seeded-random 計畫把明確安全的參數範圍轉成確定性、可審查候選，沿用同一核准與執行預算。
- **安全 promotion** — 明確要求的純參數贏家只有通過圖 revision 與 baseline fingerprint 檢查才套用；結構贏家維持審查提案。
- **研究證據** — 逐次 scalar、描述性區間、baseline effect size、失敗、CSV 與附證據標籤 Markdown 保留觀察，不把 pilot 當成證明。
- **攜帶 portable studies** — 匯入檢查 canonical semantic content 與 raw／derived evidence，先預覽、再明確點擊，不執行也不套用資料。衍生候選圖 JSON 重新套用 redacted GraphOps，不改畫布，但不是精確執行重播。
- **附件** — 加入圖片、PDF、文字或程式碼；文字／PDF 擷取進提示，圖片以多模態內容送給支援視覺的模型。見[附加檔案](./attachments.md)。
- **保留對話脈絡** — 瀏覽器最多保存 50 筆對話與完整工具呼叫／結果群組。開啟 Settings／History／Lab 或關閉面板會停止目前 turn，但保留 mounted 草稿／附件；草稿不跨重整保存。見[對話紀錄](./conversation-history.md)。
- **選擇供應商** — OpenAI API、OpenAI Codex（ChatGPT 帳號）、OpenRouter、Claude API 或自訂 OpenAI 相容端點，catalog／reasoning 控制需協商宿主能力。見[供應商設定](./provider-setup.md)。
- **階段式進度與安全復原** — 編號輪次、Markdown、即時工具階段／耗時及狀態列區分 Agent、結構與執行證據。Stop 保留部分文字／回執、阻止新派送，不回滾。只有畫布修改**及已核准執行 runner 都未派送**才提供 Retry，原始要求保留一次；已嘗試或副作用未知時用 **Continue from current graph**，不重播。見[圖編輯](./graph-editing.md)。

## 下一步

- [安裝](./installation.md) — 需求與安裝方式。
- [供應商設定](./provider-setup.md) — 連接模型供應商。
- [它如何編輯圖](./graph-editing.md) — 權限、核准、結果、復原／接續。
- [實驗與研究](./experiments-and-research.md) — 隔離執行、指標、重現性與負責任主張。
- [後端 Agent 契約](./backend-agent-contract.md) — 目前前端／後端責任。
- [Agent 路線圖](./roadmap.md) — 持久化伺服器工作與搜尋的分階段演進。
