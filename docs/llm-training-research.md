---
id: llm-training-research
title: LLM training and research
sidebar_label: LLM training & research
---

# LLM training and research

With CodefyUI's LLM node set (CodefyUI main, 2026-08), Graph Copilot can build, run, and study real language-model pretraining — as a graph of typed nodes, not a script.

## Train a language model from one prompt

Ask for a training pipeline and the agent assembles it from the real nodes — `LMTokenizer` (tiktoken), `TextCorpusDataset` (HF Hub or local text), `LMTokenizedDataset` (EOS-joined, packed next-token blocks, disk-cached), `CausalLMModel` (trainable GPT-style decoder; defaults are a ~204M-parameter shape and it reports its exact `param_count`), `LMCrossEntropyLoss`, the existing `TrainingLoop` (bf16, gradient accumulation, clipping, `max_steps`), `CheckpointSaver`, `PerplexityEvaluate`, and `TextGenerate` — then validates and, on your confirmation, executes it with `run_graph`. Loss streams into the panel as a live sparkline while it trains.

Reference acceptance run (RTX 4080, 16 GB): 203.7M parameters, 1,500 optimizer steps over ~100M TinyStories tokens in 61 minutes — val_loss 2.954, perplexity 19.17 over 2M held-out tokens, a 2.44 GB resumable checkpoint, and a coherent generated sample. CodefyUI ships the smaller `TrainCausalLM-TinyStories` example graph in its gallery.

Two knobs matter for honest runs:

- **Device.** `run_graph` submits an explicit run-level device (your request, or the host default from `/api/system/devices`); nodes with `device: auto` follow it. The approval card states which device will run.
- **Budgets.** `LMTokenizedDataset.max_tokens` and `TrainingLoop.max_steps` bound a run; packed tokens are cached on disk, so reruns and studies skip retokenization.

## Study the training process

The customization surface is designed for research on training dynamics, and the experiment machinery turns it into controlled studies:

- **What you can vary today:** every `CausalLMModel` shape knob (width, depth, heads, positions learned/sinusoidal/RoPE, LayerNorm/RMSNorm, activation, tied embeddings, init std, seed), optimizer family and hyperparameters, schedule, sequence length, token budgets, label smoothing.
- **How to vary it:** `optimize_graph_parameters` sweeps existing int/float/bool/select params as a complete grid or a seeded random plan; `run_graph_experiments` compares structural variants. Both run canvas-isolated clones, require one confirmation, rank on a numeric metric, and report descriptive intervals plus a portable, integrity-checked study bundle.
- **Study-scale runs:** size the pipeline to the question — a `d_model 256 / 4-layer` model over a few million packed tokens trains in seconds per run on a consumer GPU. `timeout_minutes` (per run, up to 60) covers studies whose single runs outgrow the 10-minute default; the approval card shows the per-run cap.
- **Metric of record:** wire `PerplexityEvaluate` on a fixed held-out token set and rank on its `val_loss` (minimize). Training dynamics live in the recorded metric series (`train_loss_batch`, `lr`).

Worked example — learning-rate sensitivity of early pretraining (one prompt, four isolated runs, ~12 s each): AdamW `3e-4` won at val_loss 4.049 (ppl 57.3), `1e-3` 4.159, `3e-3` 4.336 (degraded, not divergent), `1e-4` 4.819 (under-trained) — the expected U-shape, measured rather than assumed.

## Where this is heading

Tracked on the CodefyUI side (epic #292): per-optimizer-step scheduler stepping with warmup families (#297), training telemetry — gradient norms, update ratios, mid-epoch validation curves, step-milestone checkpoints (#298), architecture knobs GQA/qk-norm/bias (#299), and weighted corpus mixing (#300). Each widens what a chat-driven study can measure.
