---
id: paper-reproductions
title: Paper reproductions on the canvas
sidebar_label: Overview
---

# Paper reproductions on the canvas

The strongest argument that a research tool works is not a feature list — it
is taking a published result, rebuilding the method from the paper, running
it, and getting the effect the authors reported. This section documents
exactly that exercise, end to end, with Graph Copilot doing the reading and
the building.

## The protocol

Every page in this section followed the same five steps, unedited:

1. **Attach the paper.** The actual PDF (or full text) goes into the chat as
   an attachment — the agent reads the primary source, not a summary.
2. **The agent states the claim.** Before building anything it must name the
   paper's core, falsifiable claim and the evidence design it will scale
   down.
3. **The agent builds the method as a graph.** First-class nodes only — the
   method has to exist as typed, inspectable structure, not a script blob.
4. **One approval, isolated runs.** The study executes through
   `run_graph_experiments` / `optimize_graph_parameters`: canvas-isolated
   candidates, one variant differing per arm, a single ranked metric named
   in advance.
5. **Numbers verbatim, verdict honest.** Results are reported exactly as
   measured, including the runs that did not go the paper's way — a
   reproduction section that only ever says yes proves nothing.

## Why small-scale reproductions are meaningful

These are deliberately miniature: minutes of consumer-GPU time, not the
paper's original budget. A mini-reproduction cannot confirm a paper's exact
numbers; what it CAN do is test whether the paper's *mechanism* survives
transplantation — does the conv stem still fix ViT optimization at 3M
parameters? does the IsoFLOP valley still exist at TinyStories scale? The
pages state precisely which claim was scaled down and which was left
untested.

## The reproductions

| paper | venue | canvas instantiation | verdict |
| --- | --- | --- | --- |
| Early Convolutions Help Transformers See Better (Xiao et al.) | NeurIPS 2021 | `VLAModel.vision_stem` conv vs patchify, same everything else | **Not reproduced — opposite direction** (patchify 0.85 vs conv 0.45); the controlled A/B also exposed a confound in our own earlier attribution |
| Training Compute-Optimal LLMs — Chinchilla (Hoffmann et al.) | NeurIPS 2022 | IsoFLOP profile: 3 (size, tokens) pairs at fixed compute on TinyStories, twice (the agent self-proposed the 10x budget) | **Headline claim reproduced at both budgets** — d384 at 10x compute matched d128 at 1x; interior valley outside the swept range, cause diagnosed (embedding-dominated regime) |
| Flow Matching for Generative Modeling (Lipman et al.) | ICLR 2023 **Spotlight** | `VLAModel.head_type` flow_matching (OT path, Euler sampling) vs regression | **Faithful and stable, not competitive at this micro-budget** (0.00 vs 0.50); few-step sampling claim untestable at zero competence — fixed-checkpoint ODE-step sweep queued |
