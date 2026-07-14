---
id: graph-editing
title: Agent 如何編輯圖
sidebar_label: 圖編輯
---

# Agent 如何編輯圖

每則訊息，助手都會收到你已安裝節點型別的精簡**目錄**，加上依 schema 去敏的目前圖**快照**；宣告的 secret、credential-shaped field 與未知 schema／parameter 下的值不會原樣送出。它透過兩個工具編輯畫布。

實驗 variant 不會用這些工具直接改動畫布；它們會把同一套 GraphOps 套用到 in-memory clone，再提交 serialized graph 驗證與執行。詳見[實驗與研究](./experiments-and-research.md)。

## 兩個工具

- **`apply_graph_operations`** — 一批圖編輯，透過 CodefyUI 的外掛 API 套用並完整驗證。未知型別、連接埠不相容、參數超出範圍都會逐一被拒絕並回報給模型，讓它自我修正。**一批 = 一個復原步驟。**
- **`get_current_graph`** — 重新讀取畫布，所以你在對話中途手動做的編輯會被尊重。

## 操作

一批是一串操作，例如 `add_node`、`connect`、`set_params`、`remove_node`、`auto_layout`。助手被要求：

- 使用目錄中精確的節點型別名稱；
- 連接它新增節點的每個必填輸入；
- 依型別與範圍設定參數；
- 在結構性的一批結尾加上一個 `auto_layout`；
- 除非你明確要求重來，否則絕不清空圖。

## 自我修正

失敗的操作會被略過並回報；助手讀取每個操作的錯誤，在同一輪內重試（最多固定的工具回合數）。每個工具呼叫都會即時顯示成回覆下方的**階段列** — 執行中是轉圈，完成後變成 ✓ 或 ⚠ 並附上人性化摘要（例如 `add_node ×2 — 2 nodes · 1 edge`）；點一下即可展開完整結果。

Assistant 嘗試結束 graph-editing turn 時，runnability gate 會驗證 live graph。若無效，最多會進行 **2 個 corrective model rounds** 並附上 validation errors。兩次後仍無效時，Graph Copilot 會以明確的 blocked／invalid report 取代原本的完成訊息；絕不把 invalid graph 接受為成功完成。

## 復原

因為每一批都以單一復原步驟提交，**Ctrl+Z 一次就能還原整次 AI 編輯**。

若要 promotion parameter-only 實驗 winner，系統會先做參數 preflight，並同時檢查 active-graph revision 與 baseline fingerprint，再透過同一 API 套用 `set_params`。實驗期間若 live graph 已修改或切換，promotion 會被拒絕；structural winner 只顯示不含值的審查摘要，不會自動套用。

Verified portable study 也能把 candidate 的 captured、redacted GraphOps 重新套到 redacted baseline，產生 downloadable graph JSON。這與 promotion 明確分離：未解析 secret 會留空，下載不會呼叫 `applyOperations` 或改動畫布。Portable v1 不保留當初送去執行的 exact prepared graph，因此 schema default 或其他 execution-time preparation 可能不同；此下載並不是 replay artifact。
