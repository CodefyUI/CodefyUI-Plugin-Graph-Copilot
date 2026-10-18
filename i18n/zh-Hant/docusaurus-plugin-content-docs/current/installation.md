---
id: installation
title: 安裝
sidebar_label: 安裝
---

# 安裝

## 需求

**CodefyUI 1.3.0 或更新版本。** 該版本提供前端外掛擴充與 LLM 供應商代理（`/api/llm/chat`）。執行紀錄／重新追蹤及 reasoning 控制仍需對應的新版宿主能力；見[相容性邊界](./architecture.md#codefyui-契約邊界)。

若 `cdui --version` 顯示較舊版本，請先執行 `cdui update`。

## 安裝最新已合併版本

```bash
cdui plugin install CodefyUI/CodefyUI-Plugin-Graph-Copilot
```

使用上述正式 repository，**不要加上 `@tag`、`@branch` 或 `@commit` 後綴**，即可跟隨預設分支 `main`。Installer 先解析為 commit SHA，再下載該 commit 的 archive，其中包含已提交的 `frontend/index.js`；使用者不需自行 build UI。它不會選擇最新 GitHub release，也不會安裝尚未合併的 PR。

目前發布的插件版本為 **0.4.0**，包含可靠的被動離開／重新追蹤與證據優先工作台。現行宿主 catalog 也指向同一 repository，沒有固定 ref；較舊宿主可能尚未列出 Graph Copilot，因此明確指定 repository 的指令適用於支援的基礎版本。

安裝後重新整理 CodefyUI 分頁，從右下角的圖節點按鈕開啟 Graph Copilot。

## 更新既有安裝

```bash
cdui plugin update graph-copilot
```

完成後重新整理瀏覽器分頁。更新會比較已安裝 commit 與保存來源 ref 的 commit，而不只比較 manifest 版本號。**Repository 有新變更時，既有安裝不會自動升級。** 舊的 `treeleaves30760` 來源網址會轉向正式 repository，不需先解除安裝。

若原本刻意安裝 tag、commit 或其他分支，`update` 仍跟隨該保存的 ref。要切回最新已合併的 `main`：

```bash
cdui plugin install CodefyUI/CodefyUI-Plugin-Graph-Copilot --force
```

`--force` 會替換已安裝插件檔案；請先備份自己的本地修改。開發用 linked checkout 屬於不同流程，應更新該 checkout，不要強制替換。

CLI 更新後，若舊版宿主／瀏覽器仍顯示舊介面，請強制重新整理。新版宿主會讓插件資源重新驗證，也可重新啟用更新後的前端；但單純提高版本號不會刷新已開啟的分頁。

確認已安裝版本、來源與 commit：

```bash
cdui plugin info graph-copilot
```

## 下一步

在[供應商設定](./provider-setup.md)連接模型供應商。[設計檢視](./design-review.md)記錄了工作台變更與驗證邊界。
