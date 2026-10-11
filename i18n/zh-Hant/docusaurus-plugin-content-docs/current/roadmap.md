---
id: roadmap
title: Agent roadmap
sidebar_label: Agent roadmap
---

# Agent roadmap

長期目標是讓 agent 能規劃圖修改、執行受控研究、在預算內改善設計，並協助研究者把量測轉成可辯護的問題。目前的 browser implementation 已是可用的 vertical slice，但**持久化 backend agent 尚不存在**。

## Phase 0 — browser agent 與隔離 pilot

**狀態：已在本 repository 實作。**

- 專業工作台、聊天、設定、歷史、graph context 與 tool stages。
- 經 CodefyUI LLM proxy 的多輪 model/tool loop。
- 已驗證的 canvas GraphOps。
- active graph snapshot 的隔離候選圖。
- CodefyUI validation 與 WebSocket execution。
- scalar metrics、repetitions、descriptive aggregation、ranking 與 failure retention。
- live-graph conflict check 後的 optional parameter-only promotion；structural winner 保留為 proposal。
- browser-local 對話與實驗摘要。
- portable study、schema-guided SecretRef、canonicalized semantic content 的 SHA-256 check、raw／derived evidence cross-check、preview-first read-only import，以及 data-only candidate graph derivation。

本階段適合頁面保持開啟時的有上限 pilot comparison。

## Phase 1 — reproducibility envelope 與 portable studies

**主要由 Graph Copilot 負責，CodefyUI 提供少量穩定 metadata hook。**

**目前已完成 browser slice：**portable format v1 會記錄去敏 immutable baseline、captured redacted variant GraphOps、objective／repetitions／concurrency／promotion intent、逐次 scalar identity／source／error、derived statistics、producer／provenance facts 與 explicit redaction report。系統會對 parsed、canonicalized semantic content 驗證 SHA-256，並以 raw run record cross-check derived statistics；另有 content-addressed local retention、zero-write preview、explicit read-only import，以及把 captured operations 重新套回 baseline 來產生 candidate JSON。Candidate download 並非 exact prepared execution graph：unresolved secret 會留空，schema default 也可能不同。此格式不認證作者、不會自動執行 imported study，也不宣稱已有完整 environment envelope。

接下來完成完整 reproducibility envelope 與 safe replay path：

- 為已實作的 immutable baseline／per-variant GraphOps format 保留 migration 與 compatibility tests；
- 由 CodefyUI core 提供 API，把選定候選具名開成新的 editor tab；目前 v1／v2 plugin graph contract 都不能建立或切換 tab；
- explicit seed/repetition mapping，以及比現有 scalar canonical key/source 更完整的 metric/artifact schema；
- dataset/split identity 與 hash；
- CodefyUI、plugin、node-pack、packages、device/driver fingerprint；
- 超出現有 scalar values、sources、errors、durations 的 per-run timestamp／execution identity 與 artifact reference；
- promotion 前後 graph revision；
- replay-time secret binding、需要時的 author authentication，以及 portable v1 之後的 schema migration。

目前 slice 已能只靠 internally consistent scalar run records 重新計算並 cross-check 顯示摘要，不需模型重解 prose；這些 records 仍未經 authentication。完整驗收仍需在乾淨環境 replay、明確解析 dependency／secret、找出不可重現輸入，並在沒有 hidden browser state 下重建排名。

## Phase 2 — CodefyUI core 的 durable jobs

**需要擴充 CodefyUI core；frontend-only manifest 無法提供。**

新增 server-owned job service 與明確 public API。下列是設計概念，不是目前存在的 endpoints：

- 建立、查詢、暫停、恢復、取消與 retry experiment job；
- 以 cursor replay durable event stream；
- bounded worker lease、checkpoint、metrics、logs 與 provenance；
- per-user compute/concurrency/storage/time budgets；
- idempotency key，避免 retry 重複執行；
- 使用 atomic graph-revision precondition promotion winner。

CodefyUI core 必須提供 plugin service route、migration、worker 與 lifecycle 的正式 capability model 或其他 extension point。任意 browser call 或 Python node discovery 不能取代這些 lifecycle。

提案中的 manifest entry、typed handler/context、job state machine、budget、persistence、exact metric selector、event replay 與 frontend workspace API，詳見 [Durable backend agent 契約](./backend-agent-contract.md)。

驗收應證明：瀏覽器關閉後 study 仍完成；CodefyUI restart 後可恢復；不重跑已完成 repetitions；所有 decision 有 audit trail。

## Phase 3 — budgeted optimization agent

**依賴 Phase 2。**

**目前已完成 browser slice：**針對 1–4 個既有安全參數做完整 bounded grid 或 versioned seeded-random planning，編譯成 exact `set_params` candidates，並沿用現有核准與 16-run budget。Durable／adaptive optimization 仍依賴 Phase 2。

- 從 node param schema 產生 typed search space；
- transparent grid/random baseline，以及合適情況下的 Bayesian/evolutionary search；
- early stopping 與 resource allocation；
- single/multi-objective 與 Pareto front；
- memory、latency、model size、minimum quality constraints；
- duplicate detection、safe cache reuse、hard budgets 與 human approval gate。

LLM 可以提出 hypothesis 與 search space；deterministic service 應負責 scheduling、accounting、ranking 與 replay。

## Phase 4 — research analysis workbench

**依賴可重現、可持久化的結果。**

**目前已完成 descriptive slice：**immutable per-run scalar records、95% Student-t interval、相對單一 explicit baseline 的 Hedges g、formula-safe CSV export，以及標示 evidence／claim 邊界的 Markdown research brief。Confirmatory 與 cross-study analysis 仍屬後續工作。

- confidence interval、effect size、equivalence 與 multiple-comparison controls；
- power/sensitivity analysis 與 sample-size 建議；
- data slice、error、robustness、interaction analysis；
- leakage、confounding 與 metric mismatch checks；
- provenance-linked tables/plots 與 notebook/data exports；
- 帶明確 citation 與 novelty caveat 的 optional literature connector；
- preregistered hypothesis 與 holdout protection。

產生的「paper idea」必須連結到實際 observation，並標示缺少的證據。Novelty 需要文獻回顧，不能由模型推測。

## 跨階段要求

- **Safety**：候選圖與 active graph 隔離；昂貴執行與 promotion 有明確 policy；promotion 檢查 exact revision 並可 undo。
- **Reproducibility**：每次 run 有 immutable inputs、code/environment identity、seed、metric schema 與 provenance。
- **Governance**：scheduler 控制 concurrency/GPU memory；使用者可設 hard budget 並 cancel；partial failure 不可從排名中悄悄消失。
- **Honest claims**：pilot observation、statistical evidence、robustness、novelty 必須分開陳述。

## 為何必須修改 CodefyUI core

已發佈的 plugin API 是 browser API：UI container、graph access、authenticated fetch 與 browser storage。CodefyUI `main` 的 v2 增加 custom node renderer，但沒有 plugin-owned durable service lifecycle。`/ws/execution` 只執行一張提交的圖並串流單次 socket session，不是 experiment queue。

因此 durable agent 必須與 CodefyUI core 一起設計，不能藏在 frontend bundle 裡。在正式 extension 出現前，Graph Copilot 應被準確描述為「由瀏覽器協調、使用 CodefyUI 現有後端執行引擎的 agent」。
