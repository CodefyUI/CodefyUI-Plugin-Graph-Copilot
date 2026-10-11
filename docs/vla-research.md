---
id: vla-research
title: VLA training, rollout video, and media outputs
sidebar_label: VLA & media
---

# VLA training, rollout video, and media outputs

With CodefyUI's VLA node set and video I/O (CodefyUI main, 2026-08), Graph Copilot can build, train, and evaluate a small vision-language-action policy end to end — and the run produces something you can watch: rollout clips play inline in the chat panel.

## The canonical chain

Ask for a VLA pipeline and the agent assembles the PushWorld family:

- `PushWorldEnv` — a language-conditioned 2D push benchmark (PushT's spirit, pure torch): an agent disc, colored pucks, colored ring targets, and an instruction like `push the red puck to the blue target`. With distractors present, pixels alone cannot identify the goal — the policy must read the text.
- `PushWorldDemos` — scripted-expert demonstrations as behavior-cloning samples. `demo_noise` is DART-style: the executed action is perturbed while the expert's stays the label, which is the recovery data closed-loop control needs (measured: 4% vs 24% closed-loop success without/with it, before any architecture change).
- `VLAModel` — a mini VLA shaped like the current literature: vision stem + byte-level instruction embedding → transformer trunk → chunked action expert. `head_type` switches the paradigm — `flow_matching` (pi0/SmolVLA family: noise the chunk, learn the velocity field, Euler-integrate at inference) or `regression` (direct MSE) — with everything else held fixed. The node emits its own mode-matched `loss_fn`, so a mismatched generic loss cannot silently train the wrong objective.
- The stock `DataLoader` + `TrainingLoop` — VLA batches are nested tuples `((image, tokens, actions), target)` and the training stack needed zero changes to carry them.
- `VLARollout` — closed-loop success rate over fresh episodes, receding-horizon execution (`execute_k`), and outcome-tinted rollout frames. `instruction_mode: swapped` is the language-grounding ablation: a policy that actually reads the instruction collapses when it lies (46% → 2% in the prototype).
- `VLAActionEval` — open-loop chunk MSE on the held-out split; low MSE beside low success rate is the compounding-error signature.
- `VideoWrite` — turns `PushWorldDemos.demo_video` or `VLARollout.frames` into an mp4 (ffmpeg binary on PATH) or gif (Pillow, zero dependencies) under the host's media directory, served inline by `/api/media`.

## Media in the panel

Run results now carry a `media` list. The model receives **references only** — `{node, port, kind, format, url, frames, bytes}` — never bytes, so clips cost no context. The panel plays every same-origin `/api/media/...` clip inline right under the run stage (mp4/webm in a `<video>`, gif as an animated image), and the references persist with the conversation, so reopening it replays the clip from the host.

Off-origin URLs in a tool result are refused at both parse sites (the wire normalizer and the stage renderer) — a crafted result cannot point the panel at another host.

## Research knobs

- `head_type` (flow matching vs regression) on identical data;
- `execute_k` — the receding horizon: measured 2 → 46%, 4 → 34%, full chunk 8 → 20% on one policy, so the open-loop compounding-error curve is a one-param study;
- `instruction_mode: swapped` — the language-grounding measurement;
- `vision_stem` (`conv` vs `patchify`) — and a caution about confounds: a controlled two-arm study at the 1,200-episode/45-epoch budget measured patchify AHEAD (0.85 vs 0.45 success) — see the [Early conv stems reproduction page](paper-early-convs) for the full story, including how the A/B corrected our own earlier attribution;
- `demo_noise`, `chunk`, `flow_steps`, `flow_time_dist` (uniform vs pi0-style beta), plus every optimizer/schedule knob the LLM wave already exposed.

Keep `chunk` equal between `PushWorldDemos` and `VLAModel`, and `image_size` equal between `PushWorldEnv` and `VLAModel`; `validate_graph` plus the first training batch catch mismatches loudly.

Studies run through the same machinery as the LLM wave: `run_graph_experiments` for A/Bs (head paradigm, stems), `optimize_graph_parameters` for sweeps (`execute_k`, `demo_noise`), `timeout_minutes` for per-run caps, and `success_rate` (maximize) as the headline metric.
