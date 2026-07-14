---
id: backend-agent-contract
title: Durable backend agent 契約
sidebar_label: Backend agent 契約
---

# Durable backend agent 契約

Graph Copilot 目前由編輯器頁面協調。若 agent 必須在瀏覽器關閉後繼續工作，就需要 CodefyUI core 提供小而明確的擴充契約；由 plugin 自行啟動 thread 或任意掛載 FastAPI router，無法提供可靠持久化、一致授權與可強制的資源預算。

本頁全部內容都是**提案中的 additive contract**，不是 CodefyUI 1.3.0 或目前 `main` 已提供的 endpoint。

## 現況邊界

- Plugin discovery 只載入 frontend entry 與 node package，沒有 backend lifecycle／job handler。
- Frontend graph API 只作用於 active tab，沒有 tab identity、revision、建立 tab 或 atomic compare-and-swap edit。
- `/ws/execution` 的 task 只存在單一 socket 記憶體，socket 中斷時即取消。
- 現有持久化 run 屬於 published app；完整 execution output 只有小型 in-memory cache。

因此本 repo 會保留 bounded browser engine 作為相容路徑，但不能把它宣稱成 durable backend queue。

## 最小 core 擴充

Manifest 可新增 optional `[backend]`：

```toml
[backend]
entry = "backend/plugin.py"
api_version = 1
capabilities = ["agent.jobs.v1", "graph.execute.v1", "artifact.write.v1"]
```

Entry 必須是 `backend/` 下的相對 Python 路徑，拒絕 absolute path 與 `..`；安裝時必須明示會執行受信任 backend code。不支援此 table 的 host 繼續使用 frontend fallback，並回報 backend capability unavailable。

Backend 只註冊 versioned、typed job handler，不自行掛 router 或取得 database／scheduler。Core-owned context 僅提供取消檢查、atomic checkpoint、保存 immutable variant、budgeted `execute_graph`、durable event 與 quota-controlled artifact。`execute_graph` 是唯一 graph execution 路徑，啟動前由 core transactionally reserve budget。

## Core-owned job API

提案使用固定、plugin-scoped route：

```text
POST /api/plugins/{plugin_id}/jobs
GET  /api/plugins/{plugin_id}/jobs
GET  /api/plugins/{plugin_id}/jobs/{job_id}
POST /api/plugins/{plugin_id}/jobs/{job_id}/cancel
POST /api/plugins/{plugin_id}/jobs/{job_id}/resume
GET  /api/plugins/{plugin_id}/jobs/{job_id}/events?after={sequence}
GET  /api/plugins/{plugin_id}/jobs/{job_id}/variants/{variant_id}/graph
GET  /api/plugins/{plugin_id}/jobs/{job_id}/metrics
GET  /api/plugins/{plugin_id}/jobs/{job_id}/artifacts/{artifact_id}
```

Create 回傳 `202`，要求 idempotency key 與使用者核准過的 spec digest，並同時記錄 requested budget 與 server-capped effective budget。Event 必須持久化且 sequence 單調遞增；SSE 以 `Last-Event-ID` 或 `after` 重連。

```text
queued -> running
running -> succeeded | failed | cancel_requested | interrupted
cancel_requested -> cancelled
cancelled | interrupted | retryable failed -> queued（明確 resume）
```

每次 transition 增加 revision；cancel／resume 帶 `expected_revision`，競態回傳 `409`。

## 誠實的恢復與資源語意

- Resume 只從 repetition 或明確 checkpoint 邊界開始，不能從 node 執行中間恢復。
- 已完成 repetition 保留並跳過；中斷的 repetition 產生新 attempt。
- 執行語意是 at-least-once；若外部副作用完成後、結果落盤前 crash，副作用可能重複。
- 除非 policy 明確允許，不自動恢復 crash-interrupted graph。
- In-process node 尚未返回時維持 `cancel_requested`。真正 hard timeout／memory isolation 需要未來的 per-run worker process。
- Core 可嚴格限制 run／attempt 數、parallelism、artifact bytes 與 metric rows；目前 timeout 只能 cooperative。任意 filesystem／network side effect、精確 GPU memory 與第三方 API 費用目前無法強制。

Durable job 不使用 `auto`、`accuracy` 等 fuzzy metric；互動 planning 階段先解析為 exact node／port／path／aggregation／direction selector，再送到 job。

## 儲存、秘密資料與 workspace

Jobs、variants、attempts、scalar metrics、artifacts、ordered events 使用獨立資料表，不重用 app run table。Checkpoint 與 event 必須 atomic insert。Artifact 寫入 traversal-safe quota directory，採 temp-file-then-rename，SQLite 只存 SHA-256 metadata。

Graph、GraphOps、schema、error 與 provenance 全部通過 schema-aware secret scrubber；raw secret 不可進入 job JSON／SQLite。若未來允許 unattended LLM planning，必須另有 opaque server credential reference 以及 token／cost budget；現行 request-scoped LLM key 不足以支援 browser-independent resume。

Backend 只保存 candidate snapshot；連線中的瀏覽器才決定開哪些圖。Frontend API v3 需要：

- stable `tabId`、每次 graph mutation 遞增的 `revision` 與 `readOnly`；
- `openGraphs(...)` 批次建立並標示 agent variant；
- 指定 `tabId + expectedRevision` 的 GraphOps；
- `atomic: true` 時先 pure preflight，任何 op 失敗都不得 commit；
- graph／tabs／active-tab change event。

如此才能安全把 shortlisted candidates 開成真正可編輯 tabs，也能以 revision conflict 保護 winner promotion，而不依賴 private store 或 DOM hack。

## 實作順序與驗收

1. 新增專用 SQLite migration、artifact store、state machine、transactional budget accounting 與 recovery tests。
2. 新增固定 job service/routes 與 durable event replay。
3. 新增 backend handler registry、manifest validation、trust prompt、reload／disable 行為與狀態回報。
4. 新增 workspace tab revision、`openGraphs` 與 atomic tab-bound GraphOps。
5. 註冊 Graph Copilot checkpointed `(variant, repetition)` handler 與 exact metrics。
6. 新增 browser reattachment；只有啟用 unattended model planning 時才加入 credential references。

驗收必須證明：啟動 job 的瀏覽器關閉後仍能完成；CodefyUI restart 後可恢復；resume 不重複已完成 repetitions；effective budget 確實受控；保留 ordered audit trail；且能 materialize selected variants 而不覆寫使用者 active graph。
