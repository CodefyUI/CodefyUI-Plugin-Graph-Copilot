(function(){"use strict";try{if(typeof document<"u"){var r=document.createElement("style");r.appendChild(document.createTextNode(`.gcp-root{--gcp-canvas: var(--surface-canvas, #0f1319);--gcp-bg: var(--surface-app, #151a22);--gcp-panel: var(--surface-panel, #1c222c);--gcp-surface: var(--surface-raised, #242b37);--gcp-input-bg: var(--surface-input, #2c3441);--gcp-hover: var(--surface-hover, #353d4b);--gcp-active: var(--surface-active, #404959);--gcp-scrim: var(--surface-scrim, rgba(6, 9, 13, .72));--gcp-text: var(--text-primary, #f0f4f8);--gcp-dim: var(--text-secondary, #c6d0da);--gcp-muted: var(--text-muted, #aeb9c6);--gcp-disabled: var(--text-disabled, #6b7684);--gcp-accent-ink: var(--text-on-accent, #04212b);--gcp-border-soft: var(--border-subtle, #262e3a);--gcp-border: var(--border-base, #313a48);--gcp-border-strong: var(--border-strong, #6b7787);--gcp-focus: var(--border-focus, #22d3ee);--gcp-accent: var(--accent, #22d3ee);--gcp-accent-deep: var(--accent-deep, #06b6d4);--gcp-accent-dim: var(--accent-dim, #0e7490);--gcp-accent-wash: var(--accent-wash, rgba(34, 211, 238, .12));--gcp-accent-glow: var(--accent-glow, rgba(34, 211, 238, .45));--gcp-ok: var(--status-success, #5ec269);--gcp-danger: var(--status-error, #ff6b63);--gcp-warn: var(--status-warning, #ffc94d);--gcp-info: var(--status-info, #6aa9ff);--gcp-ok-wash: var(--success-wash, rgba(94, 194, 105, .14));--gcp-danger-wash: var(--danger-wash, rgba(255, 107, 99, .14));--gcp-warn-wash: var(--warning-wash, rgba(255, 201, 77, .14));--gcp-info-wash: var(--info-wash, rgba(106, 169, 255, .14));--gcp-wire: var(--wire, #5b6c82);--gcp-wire-active: var(--wire-active, #22d3ee);--gcp-fs-2xs: var(--fs-2xs, .6875rem);--gcp-fs-xs: var(--fs-xs, .75rem);--gcp-fs-sm: var(--fs-sm, .8125rem);--gcp-fs-md: var(--fs-md, .875rem);--gcp-fs-lg: var(--fs-lg, 1rem);--gcp-fs-xl: var(--fs-xl, 1.125rem);--gcp-lh-tight: var(--lh-tight, 1.25);--gcp-lh-snug: var(--lh-snug, 1.4);--gcp-lh: var(--lh-normal, 1.55);--gcp-r-xs: var(--radius-sm, 4px);--gcp-r-sm: var(--radius, 6px);--gcp-r: var(--radius-lg, 8px);--gcp-r-lg: var(--radius-xl, 12px);--gcp-r-pill: var(--radius-pill, 999px);--gcp-shadow-sm: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, .4));--gcp-shadow: var(--shadow, 0 4px 12px -2px rgba(0, 0, 0, .5));--gcp-shadow-lg: var(--shadow-lg, 0 12px 32px -8px rgba(0, 0, 0, .6));--gcp-shadow-pop: var(--shadow-popover, 0 16px 40px -12px rgba(0, 0, 0, .7));--gcp-edge-hi: var(--inner-highlight, inset 0 1px 0 rgba(255, 255, 255, .05));--gcp-t-fast: var(--transition-fast, .12s ease);--gcp-t: var(--transition, .18s ease);--gcp-ease: cubic-bezier(.22, 1, .36, 1);--gcp-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;position:relative;font-family:inherit;font-size:var(--gcp-fs-sm);line-height:var(--gcp-lh);color:var(--gcp-dim);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:6px;height:6px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:3px}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-border-strong)}.gcp-fab{width:48px;height:48px;border-radius:var(--gcp-r-lg);background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px #ffffff38,0 6px 14px -6px var(--gcp-accent-glow);transition:background var(--gcp-t-fast),transform var(--gcp-t-fast),box-shadow var(--gcp-t-fast);outline:none}.gcp-fab:hover{background:var(--gcp-accent);transform:translateY(-1px);box-shadow:inset 0 1px #ffffff38,0 8px 18px -6px var(--gcp-accent-glow)}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-window{position:fixed;bottom:16px;right:16px;width:min(448px,calc(100vw - 32px));height:min(690px,calc(100vh - 88px));min-height:420px;background:var(--gcp-panel);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow-pop),var(--gcp-edge-hi);overflow:hidden;isolation:isolate;animation:gcp-window-in .2s var(--gcp-ease) both;transition:width .26s var(--gcp-ease),height .26s var(--gcp-ease),border-radius .26s var(--gcp-ease)}.gcp-window--expanded{width:min(980px,calc(100vw - 32px));height:min(800px,calc(100vh - 32px))}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(8px) scale(.99)}to{opacity:1;transform:none}}.gcp-workbench-header{display:flex;flex-direction:column;flex-shrink:0;background:linear-gradient(180deg,var(--gcp-bg) 0%,var(--gcp-canvas) 100%);border-bottom:1px solid var(--gcp-border);box-shadow:var(--gcp-edge-hi);position:relative;z-index:3}.gcp-header-main{min-height:52px;display:flex;align-items:center;gap:12px;padding:8px 10px 6px 12px}.gcp-brand{display:flex;align-items:center;gap:9px;min-width:0;flex:1}.gcp-header-mark{width:28px;height:28px;border-radius:var(--gcp-r-sm);background:var(--gcp-accent-deep);box-shadow:inset 0 1px #ffffff38;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:14px;flex-shrink:0}.gcp-brand-copy{display:flex;flex-direction:column;min-width:0;line-height:var(--gcp-lh-tight)}.gcp-brand-copy strong{color:var(--gcp-text);font-size:var(--gcp-fs-sm);font-weight:600;letter-spacing:-.01em;white-space:nowrap}.gcp-brand-copy>span{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:600;margin-top:2px;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap}.gcp-header-actions{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:0}.gcp-icon-btn{width:28px;height:28px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background var(--gcp-t-fast),color var(--gcp-t-fast);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.94)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-wash)}.gcp-model-chip{display:inline-flex;align-items:center;gap:6px;height:26px;max-width:150px;min-width:0;padding:0 9px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-2xs);font-family:var(--gcp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast),border-color var(--gcp-t-fast);outline:none;flex-shrink:1}.gcp-model-chip:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-model-chip:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-model-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;background:var(--gcp-ok)}.gcp-label-btn{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px 0 8px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-xs);font-weight:600;font-family:inherit;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast),border-color var(--gcp-t-fast);outline:none;flex-shrink:0}.gcp-label-btn:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-label-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-wash);border-color:var(--gcp-accent-dim)}.gcp-label-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-context-bar{height:28px;display:flex;align-items:center;gap:8px;padding:0 13px;border-top:1px solid var(--gcp-border-soft);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-live-indicator{width:6px;height:6px;border-radius:50%;background:var(--gcp-disabled);flex-shrink:0}.gcp-live-indicator.online{background:var(--gcp-ok)}.gcp-context-name{color:var(--gcp-muted);font-weight:600}.gcp-context-stat{padding-left:8px;border-left:1px solid var(--gcp-border-soft)}.gcp-context-stat strong{color:var(--gcp-dim);font-weight:600;font-family:var(--gcp-mono)}.gcp-context-api{margin-left:auto;font-family:var(--gcp-mono)}.gcp-workbench-nav{display:flex;align-items:stretch;padding:0 6px}.gcp-nav-btn{flex:1;min-width:0;border:none;border-bottom:2px solid transparent;background:transparent;color:var(--gcp-muted);display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:7px 8px 6px;font-family:inherit;font-size:var(--gcp-fs-xs);font-weight:600;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;outline:none;transition:color var(--gcp-t-fast),border-color var(--gcp-t-fast),background var(--gcp-t-fast)}.gcp-nav-btn:hover{color:var(--gcp-dim)}.gcp-nav-btn.active{color:var(--gcp-text);border-bottom-color:var(--gcp-accent-deep)}.gcp-nav-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:-2px}.gcp-nav-btn svg{flex-shrink:0}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:320px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:44px;height:44px;border-radius:var(--gcp-r-lg);background:var(--gcp-accent-wash);border:1px solid var(--gcp-accent-dim);color:var(--gcp-accent);display:flex;align-items:center;justify-content:center;font-size:20px;animation:gcp-pop .36s var(--gcp-ease) both}.gcp-welcome-title{font-size:var(--gcp-fs-lg);font-weight:600;color:var(--gcp-text);letter-spacing:-.01em;animation:gcp-rise .36s var(--gcp-ease) 40ms both}.gcp-welcome-sub{font-size:var(--gcp-fs-sm);line-height:var(--gcp-lh);color:var(--gcp-muted);animation:gcp-rise .36s var(--gcp-ease) 80ms both}.gcp-welcome-history{margin-top:6px;display:inline-flex;align-items:center;gap:7px;padding:6px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-xs);font-weight:500;font-family:inherit;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast);outline:none;animation:gcp-rise .36s var(--gcp-ease) .14s both}.gcp-welcome-history:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-welcome-history:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-welcome-suggestions{display:flex;flex-direction:column;gap:6px;width:100%;margin-top:4px;animation:gcp-rise .36s var(--gcp-ease) .11s both}.gcp-suggestion{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:var(--gcp-fs-xs);font-family:inherit;line-height:var(--gcp-lh-snug);text-align:left;cursor:pointer;transition:color var(--gcp-t-fast),background var(--gcp-t-fast),border-color var(--gcp-t-fast);outline:none}.gcp-suggestion:hover{color:var(--gcp-accent);border-color:var(--gcp-accent-dim);background:var(--gcp-accent-wash)}.gcp-suggestion:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}@keyframes gcp-pop{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:none}}@keyframes gcp-rise{0%{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .24s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}.gcp-bubble{max-width:88%;padding:8px 11px;border-radius:var(--gcp-r);line-height:var(--gcp-lh);word-break:break-word;white-space:pre-wrap;font-size:var(--gcp-fs-sm)}.gcp-msg-row.user .gcp-bubble{background:var(--gcp-accent-wash);border:1px solid var(--gcp-accent-dim);color:var(--gcp-text);border-bottom-right-radius:var(--gcp-r-xs)}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);border-bottom-left-radius:var(--gcp-r-xs)}.gcp-bubble pre{background:var(--gcp-canvas);border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r-sm);padding:9px 10px;overflow-x:auto;font-size:var(--gcp-fs-xs);font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble pre:last-child{margin-bottom:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:var(--gcp-fs-xs)}.gcp-bubble :not(pre)>code{background:var(--gcp-input-bg);border:1px solid var(--gcp-border-soft);padding:1px 5px;border-radius:var(--gcp-r-xs);font-size:var(--gcp-fs-2xs);color:var(--gcp-text)}.gcp-bubble .gcp-md-p{margin:0 0 8px}.gcp-bubble .gcp-md-p:last-child{margin-bottom:0}.gcp-md-h1,.gcp-md-h2,.gcp-md-h3{font-weight:600;color:var(--gcp-text);margin:10px 0 6px;line-height:var(--gcp-lh-snug)}.gcp-md-h1{font-size:var(--gcp-fs-md)}.gcp-md-h2{font-size:var(--gcp-fs-sm)}.gcp-md-h3{font-size:var(--gcp-fs-sm);color:var(--gcp-muted)}.gcp-md-h1:first-child,.gcp-md-h2:first-child,.gcp-md-h3:first-child{margin-top:0}.gcp-md-list{margin:2px 0 8px;padding-left:18px}.gcp-md-list:last-child{margin-bottom:0}.gcp-md-list li{margin:3px 0}.gcp-md-list li::marker{color:var(--gcp-muted)}.gcp-md-hr{border:none;border-top:1px solid var(--gcp-border-soft);margin:10px 0}.gcp-bubble a{color:var(--gcp-accent);text-decoration:underline;text-underline-offset:2px;text-decoration-color:var(--gcp-accent-dim)}.gcp-bubble a:hover{text-decoration-color:var(--gcp-accent)}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:88%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:4px 8px;border-radius:var(--gcp-r-xs);background:var(--gcp-input-bg);border:1px solid var(--gcp-border-soft);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:var(--gcp-r-pill);background:var(--gcp-accent-wash);border:1px solid var(--gcp-accent-dim);color:var(--gcp-accent);font-size:var(--gcp-fs-2xs);line-height:1.5;font-variant-numeric:tabular-nums}.gcp-step-tag{display:inline-flex;align-items:center;gap:6px;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);font-weight:600;letter-spacing:.08em;text-transform:uppercase}.gcp-step-tag-dot{width:6px;height:6px;border-radius:50%;background:var(--gcp-wire);flex-shrink:0}.gcp-stages{position:relative;display:flex;flex-direction:column;gap:2px;width:88%;padding-left:2px}.gcp-stages:before{content:"";position:absolute;left:10px;top:12px;bottom:12px;width:2px;border-radius:1px;background:var(--gcp-border)}.gcp-stage{position:relative;border-radius:var(--gcp-r-sm);overflow:hidden;animation:gcp-rise .2s var(--gcp-ease) both}.gcp-stage-head{display:flex;align-items:center;gap:8px;width:100%;min-height:28px;padding:4px 7px 4px 0;background:transparent;border:none;border-radius:var(--gcp-r-sm);color:var(--gcp-muted);font-family:inherit;font-size:var(--gcp-fs-xs);text-align:left;cursor:pointer;outline:none;transition:background var(--gcp-t-fast)}.gcp-stage-head:not(:disabled):hover{background:var(--gcp-hover)}.gcp-stage-head:disabled{cursor:default}.gcp-stage-head:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:-2px}.gcp-stage-status{position:relative;z-index:1;width:18px;height:18px;margin-left:2px;border-radius:50%;background:var(--gcp-panel);border:1px solid var(--gcp-border);display:flex;align-items:center;justify-content:center;flex-shrink:0}.gcp-stage.ok .gcp-stage-status{color:var(--gcp-ok);background:var(--gcp-ok-wash);border-color:transparent}.gcp-stage.error .gcp-stage-status{color:var(--gcp-danger);background:var(--gcp-danger-wash);border-color:transparent}.gcp-stage.running .gcp-stage-status{color:var(--gcp-accent);background:var(--gcp-accent-wash);border-color:var(--gcp-accent-dim);box-shadow:0 0 6px var(--gcp-accent-glow)}.gcp-stage-spinner{width:10px;height:10px;border-radius:50%;border:2px solid transparent;border-top-color:var(--gcp-accent);border-right-color:var(--gcp-accent);animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-stage-label{font-weight:600;font-size:var(--gcp-fs-xs);color:var(--gcp-dim);white-space:nowrap;flex-shrink:0;line-height:var(--gcp-lh-tight)}.gcp-stage.running .gcp-stage-label{color:var(--gcp-text)}.gcp-stage-summary{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-stage.error .gcp-stage-summary{color:var(--gcp-danger)}.gcp-stage-time{flex-shrink:0;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-stage-chevron{color:var(--gcp-muted);flex-shrink:0;transition:transform var(--gcp-t-fast)}.gcp-stage-chevron.open{transform:rotate(90deg)}.gcp-stage-media{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 4px 28px}.gcp-stage-clip{max-width:100%;max-height:220px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r-sm);background:var(--gcp-canvas)}.gcp-stage-detail{margin:2px 0 4px 28px;padding:8px 10px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r-sm);background:var(--gcp-canvas);color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);line-height:1.55;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-word}.gcp-thinking{display:flex;align-items:center;gap:8px;padding:2px 2px 6px;font-size:var(--gcp-fs-sm);animation:gcp-rise .2s var(--gcp-ease) both}.gcp-thinking-orb{color:var(--gcp-accent);font-size:var(--gcp-fs-sm);animation:gcp-orb-pulse 1.5s ease-in-out infinite}.gcp-thinking-text{background:linear-gradient(90deg,var(--gcp-muted) 25%,var(--gcp-accent) 50%,var(--gcp-muted) 75%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gcp-shimmer 1.8s linear infinite}.gcp-thinking-time{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-family:var(--gcp-mono);font-variant-numeric:tabular-nums}@keyframes gcp-orb-pulse{0%,to{opacity:.45;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}@keyframes gcp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.gcp-error-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:var(--gcp-r);border:1px solid var(--gcp-danger);background:var(--gcp-danger-wash);animation:gcp-rise .2s var(--gcp-ease) both}.gcp-error-icon{color:var(--gcp-danger);margin-top:1px;flex-shrink:0;display:flex}.gcp-error-body{flex:1;min-width:0}.gcp-error-title{font-size:var(--gcp-fs-xs);font-weight:600;color:var(--gcp-danger)}.gcp-error-text{font-size:var(--gcp-fs-xs);color:var(--gcp-dim);margin-top:2px;word-break:break-word;line-height:var(--gcp-lh-snug)}.gcp-retry-btn{padding:5px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:var(--gcp-fs-xs);font-weight:600;font-family:inherit;cursor:pointer;transition:background var(--gcp-t-fast);align-self:center;flex-shrink:0}.gcp-retry-btn:hover{background:var(--gcp-danger-wash)}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-reattach{display:flex;align-items:flex-start;gap:10px;margin:10px 12px 0;padding:10px 12px;border-radius:var(--gcp-r);border:1px solid var(--gcp-border);background:var(--gcp-surface);animation:gcp-rise .2s var(--gcp-ease) both}.gcp-reattach-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}.gcp-reattach-title{font-weight:600;font-size:12.5px}.gcp-reattach-detail{font-size:12px;opacity:.85;overflow-wrap:anywhere}.gcp-reattach-reason{opacity:.7}.gcp-reattach-actions{display:flex;flex-direction:column;gap:6px;flex-shrink:0}.gcp-reattach-btn{padding:5px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-xs);font-weight:600;font-family:inherit;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast),border-color var(--gcp-t-fast);flex-shrink:0}.gcp-reattach-btn:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-reattach-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-reattach-btn:disabled{opacity:.5;cursor:not-allowed;color:var(--gcp-disabled);border-color:var(--gcp-border-soft)}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:var(--gcp-scrim);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:24px 32px;border:1.5px dashed var(--gcp-accent-dim);border-radius:var(--gcp-r);color:var(--gcp-accent);font-size:var(--gcp-fs-sm);background:var(--gcp-accent-wash)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 9px;border-top:1px solid var(--gcp-border);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:var(--gcp-bg)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .18s var(--gcp-ease) both}.gcp-chip.error{border-color:var(--gcp-danger);background:var(--gcp-danger-wash)}.gcp-chip-thumb{width:30px;height:30px;border-radius:var(--gcp-r-xs);object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:var(--gcp-r-xs);flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-canvas);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:var(--gcp-fs-xs);color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:var(--gcp-fs-2xs);color:var(--gcp-muted)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:12px;height:12px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}.gcp-chip-remove{width:18px;height:18px;border-radius:var(--gcp-r-xs);border:none;background:transparent;color:var(--gcp-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background var(--gcp-t-fast),color var(--gcp-t-fast);outline:none}.gcp-chip-remove:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:34px;height:34px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color var(--gcp-t-fast),background var(--gcp-t-fast);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-text);background:var(--gcp-hover)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-input-bg);border:1px solid var(--gcp-border-strong);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:var(--gcp-fs-sm);padding:8px 10px;outline:none;line-height:var(--gcp-lh-snug);min-height:34px;max-height:110px;overflow-y:auto;transition:border-color var(--gcp-t-fast),box-shadow var(--gcp-t-fast)}.gcp-textarea::placeholder{color:var(--gcp-disabled)}.gcp-textarea:focus{border-color:var(--gcp-focus);box-shadow:var(--focus-ring, 0 0 0 2px var(--gcp-panel), 0 0 0 4px var(--gcp-focus))}.gcp-textarea:disabled{opacity:.5;cursor:not-allowed}.gcp-send-btn{width:34px;height:34px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:inset 0 1px #ffffff38,0 6px 14px -6px var(--gcp-accent-glow);transition:background var(--gcp-t-fast),transform var(--gcp-t-fast),box-shadow var(--gcp-t-fast);outline:none}.gcp-send-btn:hover:not(:disabled){background:var(--gcp-accent)}.gcp-send-btn:active:not(:disabled){transform:scale(.94)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-input-bg);color:var(--gcp-disabled);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-stop-btn{width:34px;height:34px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background var(--gcp-t-fast),transform var(--gcp-t-fast);outline:none}.gcp-stop-btn:hover{background:var(--gcp-danger-wash)}.gcp-stop-btn:active{transform:scale(.94)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-composer-bar{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:22px}.gcp-composer-context{display:flex;align-items:center;gap:6px;min-width:0}.gcp-context-chip{display:inline-flex;align-items:center;gap:6px;height:22px;max-width:230px;padding:0 7px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:transparent;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);cursor:pointer;outline:none;transition:background var(--gcp-t-fast),color var(--gcp-t-fast),border-color var(--gcp-t-fast)}.gcp-context-chip:hover,.gcp-context-chip.open{background:var(--gcp-hover);color:var(--gcp-dim);border-color:var(--gcp-border)}.gcp-context-chip:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-context-chip svg{flex-shrink:0;color:var(--gcp-accent)}.gcp-context-chip-model{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.gcp-context-chip-effort{flex-shrink:0;padding:1px 6px;border-radius:var(--gcp-r-pill);background:var(--gcp-accent-wash);color:var(--gcp-accent);font-weight:600}.gcp-effort{position:relative;min-width:0}.gcp-menu-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:25;background:transparent;border:none;cursor:default;padding:0}.gcp-effort-menu{position:absolute;bottom:calc(100% + 8px);left:0;z-index:30;min-width:250px;max-width:300px;padding:4px;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r);box-shadow:var(--gcp-shadow-pop);animation:gcp-rise .14s var(--gcp-ease) both}.gcp-effort-menu-title{padding:6px 8px 4px;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.05em;text-transform:uppercase}.gcp-effort-item{display:flex;align-items:baseline;gap:8px;width:100%;padding:6px 8px;background:transparent;border:none;border-radius:var(--gcp-r-sm);color:var(--gcp-dim);font-family:inherit;font-size:var(--gcp-fs-xs);text-align:left;cursor:pointer;outline:none;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-effort-item:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-effort-item:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:-2px}.gcp-effort-item.selected{background:var(--gcp-accent-wash)}.gcp-effort-item.selected .gcp-effort-item-name{color:var(--gcp-accent)}.gcp-effort-item-name{font-family:var(--gcp-mono);font-weight:600;white-space:nowrap;flex-shrink:0}.gcp-effort-item-desc{flex:1;min-width:0;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-effort-item-check{margin-left:auto;flex-shrink:0;width:12px;color:var(--gcp-accent);display:inline-flex}.gcp-effort-menu-divider{height:1px;margin:4px 0;background:var(--gcp-border)}.gcp-runbar{display:flex;align-items:center;gap:7px;min-width:0;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-runbar-pulse{width:7px;height:7px;border-radius:50%;background:var(--gcp-accent);flex-shrink:0;animation:gcp-runbar-pulse 1.4s ease-in-out infinite}@keyframes gcp-runbar-pulse{0%,to{opacity:.4;box-shadow:0 0 0 0 var(--gcp-accent-wash)}50%{opacity:1;box-shadow:0 0 6px 0 var(--gcp-accent-glow)}}.gcp-runbar-phase{color:var(--gcp-dim);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.gcp-run-sparkline{flex:none;color:var(--gcp-accent);opacity:.9}.gcp-runbar-step{flex-shrink:0;padding:1px 6px;border-radius:var(--gcp-r-pill);border:1px solid var(--gcp-border);background:var(--gcp-input-bg);font-family:var(--gcp-mono)}.gcp-runbar-time{flex-shrink:0;font-family:var(--gcp-mono)}.gcp-composer-hint{font-size:var(--gcp-fs-2xs);color:var(--gcp-disabled);white-space:nowrap;-webkit-user-select:none;user-select:none}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:var(--gcp-scrim);display:flex;align-items:center;justify-content:center;gap:10px}.gcp-not-ready-label{font-size:var(--gcp-fs-xs);color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 14px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);font-size:var(--gcp-fs-xs);font-weight:700;font-family:inherit;cursor:pointer;box-shadow:inset 0 1px #ffffff38;transition:background var(--gcp-t-fast);outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:var(--gcp-accent)}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:8px 12px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);font-size:var(--gcp-fs-sm);font-weight:700;font-family:inherit;cursor:pointer;box-shadow:inset 0 1px #ffffff38;transition:background var(--gcp-t-fast);outline:none}.gcp-new-btn:hover{background:var(--gcp-accent)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:2px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background var(--gcp-t-fast);border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-hover)}.gcp-history-item.active{background:var(--gcp-accent-wash);border-color:var(--gcp-accent-dim)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:2px;border-radius:2px;background:var(--gcp-accent-deep)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:var(--gcp-fs-sm);color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:var(--gcp-fs-2xs);color:var(--gcp-muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:24px;height:24px;border-radius:var(--gcp-r-xs);border:none;background:transparent;color:var(--gcp-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:var(--gcp-fs-sm);flex-shrink:0;transition:color var(--gcp-t-fast),background var(--gcp-t-fast),opacity var(--gcp-t-fast);outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:var(--gcp-danger-wash)}.gcp-history-delete.confirm{color:var(--gcp-danger);background:var(--gcp-danger-wash);opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-muted);font-size:var(--gcp-fs-sm)}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:var(--gcp-fs-2xs);font-weight:700;color:var(--gcp-muted);text-transform:uppercase;letter-spacing:.05em}.gcp-select,.gcp-input{width:100%;padding:7px 10px;border-radius:var(--gcp-r-xs);border:1px solid var(--gcp-border-strong);background:var(--gcp-input-bg);color:var(--gcp-text);font-size:var(--gcp-fs-sm);font-family:inherit;outline:none;transition:border-color var(--gcp-t-fast),box-shadow var(--gcp-t-fast)}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23aeb9c6' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-focus);box-shadow:var(--focus-ring, 0 0 0 2px var(--gcp-panel), 0 0 0 4px var(--gcp-focus))}.gcp-input::placeholder{color:var(--gcp-disabled)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:7px 11px;border-radius:var(--gcp-r-xs);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-xs);font-weight:600;font-family:inherit;cursor:pointer;white-space:nowrap;transition:background var(--gcp-t-fast),color var(--gcp-t-fast);outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){background:var(--gcp-hover);color:var(--gcp-text)}.gcp-load-btn:disabled{opacity:.45;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:7px 10px;border-radius:var(--gcp-r-xs);border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim);font-size:var(--gcp-fs-2xs);font-weight:600;font-family:inherit;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast);outline:none;flex-shrink:0}.gcp-show-btn:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:var(--gcp-fs-xs);color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-ok)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:6px 13px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);font-size:var(--gcp-fs-xs);font-weight:700;font-family:inherit;cursor:pointer;box-shadow:inset 0 1px #ffffff38;transition:background var(--gcp-t-fast);outline:none}.gcp-codex-btn:hover{background:var(--gcp-accent)}.gcp-codex-btn.danger{border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);box-shadow:none}.gcp-codex-btn.danger:hover{background:var(--gcp-danger-wash)}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.45;cursor:not-allowed}.gcp-field-hint{font-size:var(--gcp-fs-2xs);color:var(--gcp-muted);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:var(--gcp-fs-2xs);color:var(--gcp-muted);line-height:var(--gcp-lh);padding-top:6px;border-top:1px solid var(--gcp-border-soft)}.gcp-window--expanded .gcp-msg-row,.gcp-window--expanded .gcp-thinking,.gcp-window--expanded .gcp-error-row{width:min(100%,760px);margin-left:auto;margin-right:auto}.gcp-window--expanded .gcp-messages{padding:24px clamp(22px,8vw,92px) 12px}.gcp-window--expanded .gcp-input-area{padding-left:clamp(22px,9vw,108px);padding-right:clamp(22px,9vw,108px)}.gcp-window--expanded .gcp-settings,.gcp-window--expanded .gcp-history{width:min(100%,760px);margin:0 auto}.gcp-lab{position:relative;flex:1;min-height:0;overflow-y:auto;padding:18px;background:var(--gcp-panel)}.gcp-lab-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:16px}.gcp-eyebrow{display:block;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.08em;line-height:var(--gcp-lh-snug);text-transform:uppercase}.gcp-lab-heading h1{margin:2px 0 4px;color:var(--gcp-text);font-size:var(--gcp-fs-xl);font-weight:600;line-height:var(--gcp-lh-tight);letter-spacing:-.01em}.gcp-lab-heading p{margin:0;max-width:560px;color:var(--gcp-muted);font-size:var(--gcp-fs-xs);line-height:var(--gcp-lh)}.gcp-lab-count{flex-shrink:0;padding:3px 9px;border:1px solid var(--gcp-border);border-radius:var(--gcp-r-pill);background:var(--gcp-input-bg);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-lab-heading-actions{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:7px}.gcp-lab-heading-actions>button{min-height:28px;padding:5px 10px;border:1px solid var(--gcp-border-strong);border-radius:var(--gcp-r-sm);background:transparent;color:var(--gcp-dim);font-family:inherit;font-size:var(--gcp-fs-2xs);font-weight:600;line-height:1;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-lab-heading-actions>button:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-lab-heading-actions>button:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-lab-portable-message{margin:-7px 0 13px;padding:8px 10px;border:1px solid var(--gcp-ok);border-radius:var(--gcp-r-sm);background:var(--gcp-ok-wash);color:var(--gcp-ok);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-lab-portable-message.error{border-color:var(--gcp-danger);background:var(--gcp-danger-wash);color:var(--gcp-danger)}.gcp-lab-empty{min-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px 20px;border:1px dashed var(--gcp-border);border-radius:var(--gcp-r-lg);background:var(--gcp-canvas)}.gcp-lab-empty-mark{width:52px;height:52px;border:1px solid var(--gcp-accent-dim);border-radius:var(--gcp-r-lg);display:grid;place-items:center;color:var(--gcp-accent);background:var(--gcp-accent-wash)}.gcp-lab-empty h2{margin:15px 0 6px;font-size:var(--gcp-fs-lg);font-weight:600;color:var(--gcp-text)}.gcp-lab-empty p{max-width:470px;margin:0;color:var(--gcp-muted);font-size:var(--gcp-fs-xs);line-height:var(--gcp-lh)}.gcp-lab-example{max-width:510px;margin-top:16px;padding:10px 12px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh);text-align:left}.gcp-lab-layout{display:flex;flex-direction:column;gap:13px}.gcp-lab-studies{display:flex;gap:8px;overflow-x:auto;padding:1px 1px 5px;scrollbar-width:thin}.gcp-study-card{width:220px;min-width:220px;display:flex;flex-direction:column;align-items:stretch;gap:7px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r);background:var(--gcp-surface);color:var(--gcp-text);font-family:inherit;text-align:left;cursor:pointer;outline:none;transition:border-color var(--gcp-t-fast),background var(--gcp-t-fast)}.gcp-study-card:hover{border-color:var(--gcp-border);background:var(--gcp-hover)}.gcp-study-card.active{border-color:var(--gcp-accent-dim);background:var(--gcp-accent-wash)}.gcp-study-card:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-study-card-top{display:flex;justify-content:space-between;align-items:center;gap:8px}.gcp-study-card time{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-family:var(--gcp-mono)}.gcp-study-card>strong{display:-webkit-box;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:32px;font-size:var(--gcp-fs-xs);font-weight:600;line-height:var(--gcp-lh-snug)}.gcp-study-card-meta{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-lab-badge{display:inline-flex;align-items:center;width:fit-content;min-height:18px;padding:2px 7px;border:1px solid var(--gcp-border);border-radius:var(--gcp-r-pill);color:var(--gcp-muted);background:var(--gcp-input-bg);font-size:var(--gcp-fs-2xs);font-weight:700;line-height:1;letter-spacing:.04em;text-transform:uppercase}.gcp-lab-badge.completed{color:var(--gcp-ok);border-color:var(--gcp-ok);background:var(--gcp-ok-wash)}.gcp-lab-badge.partial,.gcp-lab-badge.invalid{color:var(--gcp-warn);border-color:var(--gcp-warn);background:var(--gcp-warn-wash)}.gcp-lab-badge.failed{color:var(--gcp-danger);border-color:var(--gcp-danger);background:var(--gcp-danger-wash)}.gcp-lab-report{min-width:0;padding:16px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r-lg);background:var(--gcp-surface);box-shadow:var(--gcp-edge-hi)}.gcp-lab-report-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.gcp-lab-report-head h2{margin:4px 0 0;color:var(--gcp-text);font-size:var(--gcp-fs-lg);font-weight:600;line-height:var(--gcp-lh-snug);letter-spacing:-.01em}.gcp-lab-export-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}.gcp-lab-export-actions button{min-height:26px;padding:4px 9px;border:1px solid var(--gcp-border-strong);border-radius:var(--gcp-r-sm);background:transparent;color:var(--gcp-dim);font-family:inherit;font-size:var(--gcp-fs-2xs);font-weight:600;line-height:1;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-lab-export-actions button:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-lab-export-actions button:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-lab-export-actions button:disabled{opacity:.45;cursor:not-allowed}.gcp-lab-export-actions button:disabled:hover{background:transparent;color:var(--gcp-dim)}.gcp-lab-integrity{margin:7px 0 0;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-lab-summary-grid{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}.gcp-lab-summary-card{min-width:0;display:flex;align-items:center;gap:11px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r);background:var(--gcp-canvas)}.gcp-lab-summary-card.winner{border-color:var(--gcp-accent-dim);background:var(--gcp-accent-wash)}.gcp-lab-card-icon{width:30px;height:30px;border-radius:var(--gcp-r-sm);display:grid;place-items:center;flex-shrink:0;font-size:14px}.gcp-lab-card-icon.objective{color:var(--gcp-info);background:var(--gcp-info-wash)}.gcp-lab-card-icon.winner{color:var(--gcp-accent);background:var(--gcp-accent-wash)}.gcp-lab-summary-card>div{min-width:0;display:flex;flex-direction:column;gap:2px}.gcp-lab-summary-card h3{margin:0;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.06em;text-transform:uppercase}.gcp-lab-summary-card strong{color:var(--gcp-text);font-size:var(--gcp-fs-xs);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-lab-summary-card div>span{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs)}.gcp-lab-search-plan{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:3px 10px;margin-top:8px;padding:10px 11px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r-sm);background:var(--gcp-info-wash)}.gcp-lab-search-plan .gcp-eyebrow{grid-column:1 / -1;color:var(--gcp-info)}.gcp-lab-search-plan strong{color:var(--gcp-text);font-size:var(--gcp-fs-xs)}.gcp-lab-search-plan>span:not(.gcp-eyebrow){color:var(--gcp-dim);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-lab-search-plan small{grid-column:1 / -1;color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-lab-section{margin-top:18px}.gcp-lab-section-title{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:8px}.gcp-lab-section-title h3{margin:0;color:var(--gcp-text);font-size:var(--gcp-fs-sm);font-weight:600}.gcp-lab-section-title>span{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs)}.gcp-lab-findings{margin:0;padding:10px 12px 10px 27px;border-radius:var(--gcp-r-sm);background:var(--gcp-canvas);color:var(--gcp-dim);font-size:var(--gcp-fs-xs);line-height:var(--gcp-lh)}.gcp-lab-findings li+li{margin-top:5px}.gcp-lab-findings li::marker{color:var(--gcp-accent)}.gcp-leaderboard-wrap{overflow-x:auto;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r);background:var(--gcp-canvas)}.gcp-leaderboard{width:100%;min-width:650px;border-collapse:collapse;font-size:var(--gcp-fs-xs);font-variant-numeric:tabular-nums}.gcp-leaderboard th{padding:8px 9px;border-bottom:1px solid var(--gcp-border);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.06em;text-align:left;text-transform:uppercase;white-space:nowrap}.gcp-leaderboard td{padding:9px;border-bottom:1px solid var(--gcp-border-soft);color:var(--gcp-dim);vertical-align:middle}.gcp-leaderboard tbody tr:last-child td{border-bottom:none}.gcp-leaderboard tbody tr.winner{background:var(--gcp-accent-wash)}.gcp-rank{display:inline-grid;place-items:center;width:21px;height:21px;border-radius:var(--gcp-r-xs);background:var(--gcp-input-bg);color:var(--gcp-muted);font-family:var(--gcp-mono)}.gcp-leaderboard tr.winner .gcp-rank{color:var(--gcp-accent);background:var(--gcp-accent-wash)}.gcp-candidate-name{display:flex;align-items:center;flex-wrap:wrap;gap:5px;min-width:140px}.gcp-candidate-name strong{color:var(--gcp-text);font-size:var(--gcp-fs-xs)}.gcp-winner-tag{padding:2px 5px;border-radius:var(--gcp-r-xs);background:var(--gcp-accent-wash);color:var(--gcp-accent);font-size:var(--gcp-fs-2xs);font-weight:700;text-transform:uppercase}.gcp-candidate-operations{display:block;max-width:240px;margin-top:3px;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-candidate-error{display:block;max-width:210px;margin-top:3px;color:var(--gcp-danger);font-size:var(--gcp-fs-2xs);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-metric-value{color:var(--gcp-text)!important;font-family:var(--gcp-mono)}.gcp-metric-detail{display:block;margin-top:3px;color:var(--gcp-muted);font-family:inherit;font-size:var(--gcp-fs-2xs);font-weight:500;line-height:var(--gcp-lh-snug);white-space:nowrap}.gcp-candidate-download{min-height:25px;padding:4px 8px;border:1px solid var(--gcp-border-strong);border-radius:var(--gcp-r-xs);background:transparent;color:var(--gcp-dim);font-family:inherit;font-size:var(--gcp-fs-2xs);font-weight:600;line-height:1;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-candidate-download:hover:not(:disabled){background:var(--gcp-hover);color:var(--gcp-text)}.gcp-candidate-download:disabled{opacity:.4;cursor:not-allowed}.gcp-study-import-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:8;display:grid;place-items:center;padding:20px;background:var(--gcp-scrim)}.gcp-study-import-dialog{width:min(100%,520px);max-height:calc(100% - 12px);overflow-y:auto;padding:18px;border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);background:var(--gcp-surface);box-shadow:var(--gcp-shadow-lg)}.gcp-study-import-dialog h2{margin:4px 0 7px;color:var(--gcp-text);font-size:var(--gcp-fs-lg);font-weight:600}.gcp-study-import-dialog>p{margin:0;color:var(--gcp-dim);font-size:var(--gcp-fs-xs);line-height:var(--gcp-lh)}.gcp-study-import-dialog dl{margin:14px 0;display:grid;gap:7px}.gcp-study-import-dialog dl>div{display:grid;grid-template-columns:105px minmax(0,1fr);gap:10px}.gcp-study-import-dialog dt{color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-weight:700;text-transform:uppercase;letter-spacing:.04em}.gcp-study-import-dialog dd{min-width:0;margin:0;color:var(--gcp-text);font-size:var(--gcp-fs-xs);overflow-wrap:anywhere}.gcp-study-import-dialog code{color:var(--gcp-accent);font-family:var(--gcp-mono);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-study-import-safety{padding:9px 10px;border:1px solid var(--gcp-accent-dim);border-radius:var(--gcp-r-sm);background:var(--gcp-accent-wash)}.gcp-study-import-dialog .gcp-lab-portable-message{margin:10px 0 0}.gcp-study-import-actions{display:flex;justify-content:flex-end;gap:7px;margin-top:15px}.gcp-study-import-actions button{min-height:30px;padding:6px 12px;border:1px solid var(--gcp-border-strong);border-radius:var(--gcp-r-sm);background:transparent;color:var(--gcp-dim);font-family:inherit;font-size:var(--gcp-fs-xs);font-weight:600;line-height:1;cursor:pointer;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-study-import-actions button:hover:not(:disabled){background:var(--gcp-hover);color:var(--gcp-text)}.gcp-study-import-actions button.primary{border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);font-weight:700;box-shadow:inset 0 1px #ffffff38}.gcp-study-import-actions button.primary:hover:not(:disabled){background:var(--gcp-accent);color:var(--gcp-accent-ink)}.gcp-study-import-actions button:disabled{opacity:.5;cursor:not-allowed}.gcp-lab-warnings{display:flex;flex-direction:column;gap:5px}.gcp-lab-warnings p{position:relative;margin:0;padding:8px 10px 8px 27px;border:1px solid var(--gcp-warn);border-radius:var(--gcp-r-sm);background:var(--gcp-warn-wash);color:var(--gcp-warn);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-lab-warnings p:before{content:"!";position:absolute;left:10px;top:8px;color:var(--gcp-warn);font-weight:800}.gcp-paper-grid{display:grid;grid-template-columns:1fr;gap:8px}.gcp-paper-card{position:relative;padding:12px;border:1px solid var(--gcp-border-soft);border-radius:var(--gcp-r);background:var(--gcp-canvas);overflow:hidden}.gcp-paper-index{position:absolute;right:9px;top:7px;color:var(--gcp-border-soft);font-family:var(--gcp-mono);font-size:24px;font-weight:700}.gcp-paper-card h4{position:relative;margin:0 28px 9px 0;color:var(--gcp-text);font-size:var(--gcp-fs-xs);font-weight:600;line-height:var(--gcp-lh-snug)}.gcp-paper-card dl{margin:0;display:flex;flex-direction:column;gap:7px}.gcp-paper-card dl>div{display:grid;grid-template-columns:58px 1fr;gap:7px}.gcp-paper-card dt{color:var(--gcp-accent-dim);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.05em;text-transform:uppercase}.gcp-paper-card dd{margin:0;color:var(--gcp-dim);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh)}.gcp-window--expanded .gcp-lab{padding:24px}.gcp-window--expanded .gcp-lab-layout{display:grid;grid-template-columns:220px minmax(0,1fr);align-items:start}.gcp-window--expanded .gcp-lab-studies{position:sticky;top:0;max-height:590px;flex-direction:column;overflow-x:hidden;overflow-y:auto;padding:1px 5px 1px 1px}.gcp-window--expanded .gcp-study-card{width:100%;min-width:0}.gcp-window--expanded .gcp-lab-summary-grid,.gcp-window--expanded .gcp-paper-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:720px),(max-height:560px){.gcp-window,.gcp-window--expanded{top:8px;right:8px;bottom:8px;left:8px;width:auto;height:auto;min-height:0;border-radius:var(--gcp-r-lg)}.gcp-window--expanded .gcp-lab-layout{display:flex}.gcp-window--expanded .gcp-lab-studies{position:static;max-height:none;flex-direction:row;overflow-x:auto;overflow-y:hidden}.gcp-window--expanded .gcp-study-card{width:220px;min-width:220px}.gcp-window--expanded .gcp-messages{padding:16px 14px 8px}.gcp-window--expanded .gcp-input-area{padding:10px 12px 9px}}@media(max-width:430px){.gcp-header-main{padding-left:10px;gap:7px}.gcp-brand-copy>span{display:none}.gcp-header-actions .gcp-model-chip{max-width:116px}.gcp-context-bar{padding:0 11px;gap:6px}.gcp-context-name{display:none}.gcp-context-stat{padding-left:6px}.gcp-workbench-nav{padding:0 4px}.gcp-nav-btn{gap:5px;padding:7px 4px 6px;font-size:var(--gcp-fs-2xs)}.gcp-composer-hint{display:none}.gcp-lab{padding:14px 11px}.gcp-lab-report{padding:12px 10px}.gcp-lab-heading p{display:none}.gcp-lab-heading{align-items:center;margin-bottom:13px}}.gcp-experiment-approval-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:40;display:grid;place-items:center;padding:18px;background:var(--gcp-scrim)}.gcp-experiment-approval{width:min(420px,100%);padding:18px;border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);background:var(--gcp-surface);box-shadow:var(--gcp-shadow-pop)}.gcp-experiment-approval-kicker{margin-bottom:6px;color:var(--gcp-accent);font-size:var(--gcp-fs-2xs);font-weight:700;letter-spacing:.08em;text-transform:uppercase}.gcp-experiment-approval-title{color:var(--gcp-text);font-size:var(--gcp-fs-xl);font-weight:600;line-height:var(--gcp-lh-snug)}.gcp-experiment-approval-hypothesis{margin-top:10px;color:var(--gcp-text);font-size:var(--gcp-fs-sm);line-height:var(--gcp-lh)}.gcp-experiment-approval-facts{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.gcp-experiment-approval-facts span{padding:3px 8px;border-radius:var(--gcp-r-pill);border:1px solid var(--gcp-border);background:var(--gcp-input-bg);color:var(--gcp-muted);font-size:var(--gcp-fs-2xs);font-variant-numeric:tabular-nums}.gcp-experiment-approval-candidates{display:grid;gap:6px;max-height:124px;margin-top:12px;overflow-y:auto}.gcp-experiment-approval-candidates>div,.gcp-experiment-approval-nodes{display:grid;grid-template-columns:minmax(72px,.35fr) minmax(0,1fr);gap:8px;padding:7px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-canvas);font-size:var(--gcp-fs-2xs);line-height:var(--gcp-lh-snug)}.gcp-experiment-approval-candidates strong,.gcp-experiment-approval-nodes strong{color:var(--gcp-text)}.gcp-experiment-approval-candidates span,.gcp-experiment-approval-nodes span{min-width:0;overflow-wrap:anywhere;color:var(--gcp-muted);font-family:var(--gcp-mono)}.gcp-experiment-approval-nodes{margin-top:6px}.gcp-experiment-approval-warning{margin-top:14px;padding:10px 11px;border:1px solid var(--gcp-warn);border-radius:var(--gcp-r-sm);background:var(--gcp-warn-wash);color:var(--gcp-dim);font-size:var(--gcp-fs-xs);line-height:var(--gcp-lh-snug)}.gcp-experiment-approval-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}.gcp-approval-secondary,.gcp-approval-primary{min-height:32px;padding:0 13px;border-radius:var(--gcp-r-sm);font-family:inherit;font-size:var(--gcp-fs-xs);font-weight:700;cursor:pointer;outline:none;transition:background var(--gcp-t-fast),color var(--gcp-t-fast)}.gcp-approval-secondary{border:1px solid var(--gcp-border-strong);background:transparent;color:var(--gcp-dim)}.gcp-approval-secondary:hover{background:var(--gcp-hover);color:var(--gcp-text)}.gcp-approval-secondary:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}.gcp-approval-primary{border:none;background:var(--gcp-accent-deep);color:var(--gcp-accent-ink);box-shadow:inset 0 1px #ffffff38}.gcp-approval-primary:hover{background:var(--gcp-accent)}.gcp-approval-primary:focus-visible{outline:2px solid var(--gcp-focus);outline-offset:2px}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(r)}}catch(a){console.error("vite-plugin-css-injected-by-js",a)}})();
var u0 = Object.defineProperty;
var d0 = (a, i, s) => i in a ? u0(a, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[i] = s;
var on = (a, i, s) => d0(a, typeof i != "symbol" ? i + "" : i, s);
function f0(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Uu = { exports: {} }, Wr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ch;
function p0() {
  if (Ch) return Wr;
  Ch = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function s(o, c, d) {
    var f = null;
    if (d !== void 0 && (f = "" + d), c.key !== void 0 && (f = "" + c.key), "key" in c) {
      d = {};
      for (var y in c)
        y !== "key" && (d[y] = c[y]);
    } else d = c;
    return c = d.ref, {
      $$typeof: a,
      type: o,
      key: f,
      ref: c !== void 0 ? c : null,
      props: d
    };
  }
  return Wr.Fragment = i, Wr.jsx = s, Wr.jsxs = s, Wr;
}
var Dh;
function m0() {
  return Dh || (Dh = 1, Uu.exports = p0()), Uu.exports;
}
var g = m0(), Vu = { exports: {} }, _e = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rh;
function h0() {
  if (Rh) return _e;
  Rh = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), f = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), S = Symbol.iterator;
  function A(x) {
    return x === null || typeof x != "object" ? null : (x = S && x[S] || x["@@iterator"], typeof x == "function" ? x : null);
  }
  var O = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, E = Object.assign, L = {};
  function R(x, U, F) {
    this.props = x, this.context = U, this.refs = L, this.updater = F || O;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(x, U) {
    if (typeof x != "object" && typeof x != "function" && x != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, x, U, "setState");
  }, R.prototype.forceUpdate = function(x) {
    this.updater.enqueueForceUpdate(this, x, "forceUpdate");
  };
  function j() {
  }
  j.prototype = R.prototype;
  function q(x, U, F) {
    this.props = x, this.context = U, this.refs = L, this.updater = F || O;
  }
  var Z = q.prototype = new j();
  Z.constructor = q, E(Z, R.prototype), Z.isPureReactComponent = !0;
  var Y = Array.isArray;
  function K() {
  }
  var V = { H: null, A: null, T: null, S: null }, de = Object.prototype.hasOwnProperty;
  function ce(x, U, F) {
    var W = F.ref;
    return {
      $$typeof: a,
      type: x,
      key: U,
      ref: W !== void 0 ? W : null,
      props: F
    };
  }
  function X(x, U) {
    return ce(x.type, U, x.props);
  }
  function Q(x) {
    return typeof x == "object" && x !== null && x.$$typeof === a;
  }
  function oe(x) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + x.replace(/[=:]/g, function(F) {
      return U[F];
    });
  }
  var fe = /\/+/g;
  function ae(x, U) {
    return typeof x == "object" && x !== null && x.key != null ? oe("" + x.key) : U.toString(36);
  }
  function ve(x) {
    switch (x.status) {
      case "fulfilled":
        return x.value;
      case "rejected":
        throw x.reason;
      default:
        switch (typeof x.status == "string" ? x.then(K, K) : (x.status = "pending", x.then(
          function(U) {
            x.status === "pending" && (x.status = "fulfilled", x.value = U);
          },
          function(U) {
            x.status === "pending" && (x.status = "rejected", x.reason = U);
          }
        )), x.status) {
          case "fulfilled":
            return x.value;
          case "rejected":
            throw x.reason;
        }
    }
    throw x;
  }
  function M(x, U, F, W, se) {
    var pe = typeof x;
    (pe === "undefined" || pe === "boolean") && (x = null);
    var ue = !1;
    if (x === null) ue = !0;
    else
      switch (pe) {
        case "bigint":
        case "string":
        case "number":
          ue = !0;
          break;
        case "object":
          switch (x.$$typeof) {
            case a:
            case i:
              ue = !0;
              break;
            case b:
              return ue = x._init, M(
                ue(x._payload),
                U,
                F,
                W,
                se
              );
          }
      }
    if (ue)
      return se = se(x), ue = W === "" ? "." + ae(x, 0) : W, Y(se) ? (F = "", ue != null && (F = ue.replace(fe, "$&/") + "/"), M(se, U, F, "", function(vn) {
        return vn;
      })) : se != null && (Q(se) && (se = X(
        se,
        F + (se.key == null || x && x.key === se.key ? "" : ("" + se.key).replace(
          fe,
          "$&/"
        ) + "/") + ue
      )), U.push(se)), 1;
    ue = 0;
    var We = W === "" ? "." : W + ":";
    if (Y(x))
      for (var we = 0; we < x.length; we++)
        W = x[we], pe = We + ae(W, we), ue += M(
          W,
          U,
          F,
          pe,
          se
        );
    else if (we = A(x), typeof we == "function")
      for (x = we.call(x), we = 0; !(W = x.next()).done; )
        W = W.value, pe = We + ae(W, we++), ue += M(
          W,
          U,
          F,
          pe,
          se
        );
    else if (pe === "object") {
      if (typeof x.then == "function")
        return M(
          ve(x),
          U,
          F,
          W,
          se
        );
      throw U = String(x), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ue;
  }
  function J(x, U, F) {
    if (x == null) return x;
    var W = [], se = 0;
    return M(x, W, "", "", function(pe) {
      return U.call(F, pe, se++);
    }), W;
  }
  function T(x) {
    if (x._status === -1) {
      var U = x._result;
      U = U(), U.then(
        function(F) {
          (x._status === 0 || x._status === -1) && (x._status = 1, x._result = F);
        },
        function(F) {
          (x._status === 0 || x._status === -1) && (x._status = 2, x._result = F);
        }
      ), x._status === -1 && (x._status = 0, x._result = U);
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var ie = typeof reportError == "function" ? reportError : function(x) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof x == "object" && x !== null && typeof x.message == "string" ? String(x.message) : String(x),
        error: x
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", x);
      return;
    }
    console.error(x);
  }, ee = {
    map: J,
    forEach: function(x, U, F) {
      J(
        x,
        function() {
          U.apply(this, arguments);
        },
        F
      );
    },
    count: function(x) {
      var U = 0;
      return J(x, function() {
        U++;
      }), U;
    },
    toArray: function(x) {
      return J(x, function(U) {
        return U;
      }) || [];
    },
    only: function(x) {
      if (!Q(x))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return x;
    }
  };
  return _e.Activity = v, _e.Children = ee, _e.Component = R, _e.Fragment = s, _e.Profiler = c, _e.PureComponent = q, _e.StrictMode = o, _e.Suspense = p, _e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, _e.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(x) {
      return V.H.useMemoCache(x);
    }
  }, _e.cache = function(x) {
    return function() {
      return x.apply(null, arguments);
    };
  }, _e.cacheSignal = function() {
    return null;
  }, _e.cloneElement = function(x, U, F) {
    if (x == null)
      throw Error(
        "The argument must be a React element, but you passed " + x + "."
      );
    var W = E({}, x.props), se = x.key;
    if (U != null)
      for (pe in U.key !== void 0 && (se = "" + U.key), U)
        !de.call(U, pe) || pe === "key" || pe === "__self" || pe === "__source" || pe === "ref" && U.ref === void 0 || (W[pe] = U[pe]);
    var pe = arguments.length - 2;
    if (pe === 1) W.children = F;
    else if (1 < pe) {
      for (var ue = Array(pe), We = 0; We < pe; We++)
        ue[We] = arguments[We + 2];
      W.children = ue;
    }
    return ce(x.type, se, W);
  }, _e.createContext = function(x) {
    return x = {
      $$typeof: f,
      _currentValue: x,
      _currentValue2: x,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, x.Provider = x, x.Consumer = {
      $$typeof: d,
      _context: x
    }, x;
  }, _e.createElement = function(x, U, F) {
    var W, se = {}, pe = null;
    if (U != null)
      for (W in U.key !== void 0 && (pe = "" + U.key), U)
        de.call(U, W) && W !== "key" && W !== "__self" && W !== "__source" && (se[W] = U[W]);
    var ue = arguments.length - 2;
    if (ue === 1) se.children = F;
    else if (1 < ue) {
      for (var We = Array(ue), we = 0; we < ue; we++)
        We[we] = arguments[we + 2];
      se.children = We;
    }
    if (x && x.defaultProps)
      for (W in ue = x.defaultProps, ue)
        se[W] === void 0 && (se[W] = ue[W]);
    return ce(x, pe, se);
  }, _e.createRef = function() {
    return { current: null };
  }, _e.forwardRef = function(x) {
    return { $$typeof: y, render: x };
  }, _e.isValidElement = Q, _e.lazy = function(x) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: x },
      _init: T
    };
  }, _e.memo = function(x, U) {
    return {
      $$typeof: h,
      type: x,
      compare: U === void 0 ? null : U
    };
  }, _e.startTransition = function(x) {
    var U = V.T, F = {};
    V.T = F;
    try {
      var W = x(), se = V.S;
      se !== null && se(F, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then(K, ie);
    } catch (pe) {
      ie(pe);
    } finally {
      U !== null && F.types !== null && (U.types = F.types), V.T = U;
    }
  }, _e.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, _e.use = function(x) {
    return V.H.use(x);
  }, _e.useActionState = function(x, U, F) {
    return V.H.useActionState(x, U, F);
  }, _e.useCallback = function(x, U) {
    return V.H.useCallback(x, U);
  }, _e.useContext = function(x) {
    return V.H.useContext(x);
  }, _e.useDebugValue = function() {
  }, _e.useDeferredValue = function(x, U) {
    return V.H.useDeferredValue(x, U);
  }, _e.useEffect = function(x, U) {
    return V.H.useEffect(x, U);
  }, _e.useEffectEvent = function(x) {
    return V.H.useEffectEvent(x);
  }, _e.useId = function() {
    return V.H.useId();
  }, _e.useImperativeHandle = function(x, U, F) {
    return V.H.useImperativeHandle(x, U, F);
  }, _e.useInsertionEffect = function(x, U) {
    return V.H.useInsertionEffect(x, U);
  }, _e.useLayoutEffect = function(x, U) {
    return V.H.useLayoutEffect(x, U);
  }, _e.useMemo = function(x, U) {
    return V.H.useMemo(x, U);
  }, _e.useOptimistic = function(x, U) {
    return V.H.useOptimistic(x, U);
  }, _e.useReducer = function(x, U, F) {
    return V.H.useReducer(x, U, F);
  }, _e.useRef = function(x) {
    return V.H.useRef(x);
  }, _e.useState = function(x) {
    return V.H.useState(x);
  }, _e.useSyncExternalStore = function(x, U, F) {
    return V.H.useSyncExternalStore(
      x,
      U,
      F
    );
  }, _e.useTransition = function() {
    return V.H.useTransition();
  }, _e.version = "19.2.7", _e;
}
var zh;
function Sd() {
  return zh || (zh = 1, Vu.exports = h0()), Vu.exports;
}
var P = Sd();
const g0 = /* @__PURE__ */ f0(P);
var Bu = { exports: {} }, Pr = {}, ku = { exports: {} }, Hu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lh;
function y0() {
  return Lh || (Lh = 1, (function(a) {
    function i(M, J) {
      var T = M.length;
      M.push(J);
      e: for (; 0 < T; ) {
        var ie = T - 1 >>> 1, ee = M[ie];
        if (0 < c(ee, J))
          M[ie] = J, M[T] = ee, T = ie;
        else break e;
      }
    }
    function s(M) {
      return M.length === 0 ? null : M[0];
    }
    function o(M) {
      if (M.length === 0) return null;
      var J = M[0], T = M.pop();
      if (T !== J) {
        M[0] = T;
        e: for (var ie = 0, ee = M.length, x = ee >>> 1; ie < x; ) {
          var U = 2 * (ie + 1) - 1, F = M[U], W = U + 1, se = M[W];
          if (0 > c(F, T))
            W < ee && 0 > c(se, F) ? (M[ie] = se, M[W] = T, ie = W) : (M[ie] = F, M[U] = T, ie = U);
          else if (W < ee && 0 > c(se, T))
            M[ie] = se, M[W] = T, ie = W;
          else break e;
        }
      }
      return J;
    }
    function c(M, J) {
      var T = M.sortIndex - J.sortIndex;
      return T !== 0 ? T : M.id - J.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var f = Date, y = f.now();
      a.unstable_now = function() {
        return f.now() - y;
      };
    }
    var p = [], h = [], b = 1, v = null, S = 3, A = !1, O = !1, E = !1, L = !1, R = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, q = typeof setImmediate < "u" ? setImmediate : null;
    function Z(M) {
      for (var J = s(h); J !== null; ) {
        if (J.callback === null) o(h);
        else if (J.startTime <= M)
          o(h), J.sortIndex = J.expirationTime, i(p, J);
        else break;
        J = s(h);
      }
    }
    function Y(M) {
      if (E = !1, Z(M), !O)
        if (s(p) !== null)
          O = !0, K || (K = !0, oe());
        else {
          var J = s(h);
          J !== null && ve(Y, J.startTime - M);
        }
    }
    var K = !1, V = -1, de = 5, ce = -1;
    function X() {
      return L ? !0 : !(a.unstable_now() - ce < de);
    }
    function Q() {
      if (L = !1, K) {
        var M = a.unstable_now();
        ce = M;
        var J = !0;
        try {
          e: {
            O = !1, E && (E = !1, j(V), V = -1), A = !0;
            var T = S;
            try {
              t: {
                for (Z(M), v = s(p); v !== null && !(v.expirationTime > M && X()); ) {
                  var ie = v.callback;
                  if (typeof ie == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var ee = ie(
                      v.expirationTime <= M
                    );
                    if (M = a.unstable_now(), typeof ee == "function") {
                      v.callback = ee, Z(M), J = !0;
                      break t;
                    }
                    v === s(p) && o(p), Z(M);
                  } else o(p);
                  v = s(p);
                }
                if (v !== null) J = !0;
                else {
                  var x = s(h);
                  x !== null && ve(
                    Y,
                    x.startTime - M
                  ), J = !1;
                }
              }
              break e;
            } finally {
              v = null, S = T, A = !1;
            }
            J = void 0;
          }
        } finally {
          J ? oe() : K = !1;
        }
      }
    }
    var oe;
    if (typeof q == "function")
      oe = function() {
        q(Q);
      };
    else if (typeof MessageChannel < "u") {
      var fe = new MessageChannel(), ae = fe.port2;
      fe.port1.onmessage = Q, oe = function() {
        ae.postMessage(null);
      };
    } else
      oe = function() {
        R(Q, 0);
      };
    function ve(M, J) {
      V = R(function() {
        M(a.unstable_now());
      }, J);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(M) {
      M.callback = null;
    }, a.unstable_forceFrameRate = function(M) {
      0 > M || 125 < M ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : de = 0 < M ? Math.floor(1e3 / M) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, a.unstable_next = function(M) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = S;
      }
      var T = S;
      S = J;
      try {
        return M();
      } finally {
        S = T;
      }
    }, a.unstable_requestPaint = function() {
      L = !0;
    }, a.unstable_runWithPriority = function(M, J) {
      switch (M) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          M = 3;
      }
      var T = S;
      S = M;
      try {
        return J();
      } finally {
        S = T;
      }
    }, a.unstable_scheduleCallback = function(M, J, T) {
      var ie = a.unstable_now();
      switch (typeof T == "object" && T !== null ? (T = T.delay, T = typeof T == "number" && 0 < T ? ie + T : ie) : T = ie, M) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return ee = T + ee, M = {
        id: b++,
        callback: J,
        priorityLevel: M,
        startTime: T,
        expirationTime: ee,
        sortIndex: -1
      }, T > ie ? (M.sortIndex = T, i(h, M), s(p) === null && M === s(h) && (E ? (j(V), V = -1) : E = !0, ve(Y, T - ie))) : (M.sortIndex = ee, i(p, M), O || A || (O = !0, K || (K = !0, oe()))), M;
    }, a.unstable_shouldYield = X, a.unstable_wrapCallback = function(M) {
      var J = S;
      return function() {
        var T = S;
        S = J;
        try {
          return M.apply(this, arguments);
        } finally {
          S = T;
        }
      };
    };
  })(Hu)), Hu;
}
var Uh;
function v0() {
  return Uh || (Uh = 1, ku.exports = y0()), ku.exports;
}
var Iu = { exports: {} }, xt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vh;
function b0() {
  if (Vh) return xt;
  Vh = 1;
  var a = Sd();
  function i(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var o = {
    d: {
      f: s,
      r: function() {
        throw Error(i(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, c = Symbol.for("react.portal");
  function d(p, h, b) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: h,
      implementation: b
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return xt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, xt.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(i(299));
    return d(p, h, null, b);
  }, xt.flushSync = function(p) {
    var h = f.T, b = o.p;
    try {
      if (f.T = null, o.p = 2, p) return p();
    } finally {
      f.T = h, o.p = b, o.d.f();
    }
  }, xt.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, o.d.C(p, h));
  }, xt.prefetchDNS = function(p) {
    typeof p == "string" && o.d.D(p);
  }, xt.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var b = h.as, v = y(b, h.crossOrigin), S = typeof h.integrity == "string" ? h.integrity : void 0, A = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? o.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: v,
          integrity: S,
          fetchPriority: A
        }
      ) : b === "script" && o.d.X(p, {
        crossOrigin: v,
        integrity: S,
        fetchPriority: A,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, xt.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = y(
            h.as,
            h.crossOrigin
          );
          o.d.M(p, {
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && o.d.M(p);
  }, xt.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, v = y(b, h.crossOrigin);
      o.d.L(p, b, {
        crossOrigin: v,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0,
        type: typeof h.type == "string" ? h.type : void 0,
        fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
        referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
        imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
        imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
        media: typeof h.media == "string" ? h.media : void 0
      });
    }
  }, xt.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var b = y(h.as, h.crossOrigin);
        o.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else o.d.m(p);
  }, xt.requestFormReset = function(p) {
    o.d.r(p);
  }, xt.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, xt.useFormState = function(p, h, b) {
    return f.H.useFormState(p, h, b);
  }, xt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, xt.version = "19.2.7", xt;
}
var Bh;
function S0() {
  if (Bh) return Iu.exports;
  Bh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), Iu.exports = b0(), Iu.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kh;
function _0() {
  if (kh) return Pr;
  kh = 1;
  var a = v0(), i = Sd(), s = S0();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function d(e) {
    var t = e, n = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do
        t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
      while (e);
    }
    return t.tag === 3 ? n : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (d(e) !== e)
      throw Error(o(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var n = e, r = t; ; ) {
      var l = n.return;
      if (l === null) break;
      var u = l.alternate;
      if (u === null) {
        if (r = l.return, r !== null) {
          n = r;
          continue;
        }
        break;
      }
      if (l.child === u.child) {
        for (u = l.child; u; ) {
          if (u === n) return p(l), e;
          if (u === r) return p(l), t;
          u = u.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== r.return) n = l, r = u;
      else {
        for (var m = !1, _ = l.child; _; ) {
          if (_ === n) {
            m = !0, n = l, r = u;
            break;
          }
          if (_ === r) {
            m = !0, r = l, n = u;
            break;
          }
          _ = _.sibling;
        }
        if (!m) {
          for (_ = u.child; _; ) {
            if (_ === n) {
              m = !0, n = u, r = l;
              break;
            }
            if (_ === r) {
              m = !0, r = u, n = l;
              break;
            }
            _ = _.sibling;
          }
          if (!m) throw Error(o(189));
        }
      }
      if (n.alternate !== r) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = b(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, S = Symbol.for("react.element"), A = Symbol.for("react.transitional.element"), O = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), L = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), q = Symbol.for("react.context"), Z = Symbol.for("react.forward_ref"), Y = Symbol.for("react.suspense"), K = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), de = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), X = Symbol.for("react.memo_cache_sentinel"), Q = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != "object" ? null : (e = Q && e[Q] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var fe = Symbol.for("react.client.reference");
  function ae(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === fe ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case E:
        return "Fragment";
      case R:
        return "Profiler";
      case L:
        return "StrictMode";
      case Y:
        return "Suspense";
      case K:
        return "SuspenseList";
      case ce:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case O:
          return "Portal";
        case q:
          return e.displayName || "Context";
        case j:
          return (e._context.displayName || "Context") + ".Consumer";
        case Z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
          return t = e.displayName || null, t !== null ? t : ae(e.type) || "Memo";
        case de:
          t = e._payload, e = e._init;
          try {
            return ae(e(t));
          } catch {
          }
      }
    return null;
  }
  var ve = Array.isArray, M = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ie = [], ee = -1;
  function x(e) {
    return { current: e };
  }
  function U(e) {
    0 > ee || (e.current = ie[ee], ie[ee] = null, ee--);
  }
  function F(e, t) {
    ee++, ie[ee] = e.current, e.current = t;
  }
  var W = x(null), se = x(null), pe = x(null), ue = x(null);
  function We(e, t) {
    switch (F(pe, t), F(se, e), F(W, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? th(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = th(t), e = nh(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    U(W), F(W, e);
  }
  function we() {
    U(W), U(se), U(pe);
  }
  function vn(e) {
    e.memoizedState !== null && F(ue, e);
    var t = W.current, n = nh(t, e.type);
    t !== n && (F(se, e), F(W, n));
  }
  function cn(e) {
    se.current === e && (U(W), U(se)), ue.current === e && (U(ue), Jr._currentValue = T);
  }
  var aa, te;
  function ge(e) {
    if (aa === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        aa = t && t[1] || "", te = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + aa + e + te;
  }
  var Ke = !1;
  function rt(e, t) {
    if (!e || Ke) return "";
    Ke = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var G = function() {
                throw Error();
              };
              if (Object.defineProperty(G.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(G, []);
                } catch (B) {
                  var z = B;
                }
                Reflect.construct(e, [], G);
              } else {
                try {
                  G.call();
                } catch (B) {
                  z = B;
                }
                e.call(G.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                z = B;
              }
              (G = e()) && typeof G.catch == "function" && G.catch(function() {
              });
            }
          } catch (B) {
            if (B && z && typeof B.stack == "string")
              return [B.stack, z.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var l = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      l && l.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = r.DetermineComponentFrameRoot(), m = u[0], _ = u[1];
      if (m && _) {
        var N = m.split(`
`), D = _.split(`
`);
        for (l = r = 0; r < N.length && !N[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; l < D.length && !D[l].includes(
          "DetermineComponentFrameRoot"
        ); )
          l++;
        if (r === N.length || l === D.length)
          for (r = N.length - 1, l = D.length - 1; 1 <= r && 0 <= l && N[r] !== D[l]; )
            l--;
        for (; 1 <= r && 0 <= l; r--, l--)
          if (N[r] !== D[l]) {
            if (r !== 1 || l !== 1)
              do
                if (r--, l--, 0 > l || N[r] !== D[l]) {
                  var H = `
` + N[r].replace(" at new ", " at ");
                  return e.displayName && H.includes("<anonymous>") && (H = H.replace("<anonymous>", e.displayName)), H;
                }
              while (1 <= r && 0 <= l);
            break;
          }
      }
    } finally {
      Ke = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? ge(n) : "";
  }
  function At(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ge(e.type);
      case 16:
        return ge("Lazy");
      case 13:
        return e.child !== t && t !== null ? ge("Suspense Fallback") : ge("Suspense");
      case 19:
        return ge("SuspenseList");
      case 0:
      case 15:
        return rt(e.type, !1);
      case 11:
        return rt(e.type.render, !1);
      case 1:
        return rt(e.type, !0);
      case 31:
        return ge("Activity");
      default:
        return "";
    }
  }
  function Et(e) {
    try {
      var t = "", n = null;
      do
        t += At(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var Tt = Object.prototype.hasOwnProperty, un = a.unstable_scheduleCallback, Pe = a.unstable_cancelCallback, fi = a.unstable_shouldYield, ia = a.unstable_requestPaint, Nt = a.unstable_now, wl = a.unstable_getCurrentPriorityLevel, $s = a.unstable_ImmediatePriority, or = a.unstable_UserBlockingPriority, ka = a.unstable_NormalPriority, jl = a.unstable_LowPriority, Ms = a.unstable_IdlePriority, pi = a.log, Ts = a.unstable_setDisableYieldValue, Mn = null, gt = null;
  function Tn(e) {
    if (typeof pi == "function" && Ts(e), gt && typeof gt.setStrictMode == "function")
      try {
        gt.setStrictMode(Mn, e);
      } catch {
      }
  }
  var wt = Math.clz32 ? Math.clz32 : ra, Os = Math.log, $l = Math.LN2;
  function ra(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Os(e) / $l | 0) | 0;
  }
  var sa = 256, jt = 262144, mi = 4194304;
  function bn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Xt(e, t, n) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var l = 0, u = e.suspendedLanes, m = e.pingedLanes;
    e = e.warmLanes;
    var _ = r & 134217727;
    return _ !== 0 ? (r = _ & ~u, r !== 0 ? l = bn(r) : (m &= _, m !== 0 ? l = bn(m) : n || (n = _ & ~e, n !== 0 && (l = bn(n))))) : (_ = r & ~u, _ !== 0 ? l = bn(_) : m !== 0 ? l = bn(m) : n || (n = r & ~e, n !== 0 && (l = bn(n)))), l === 0 ? 0 : t !== 0 && t !== l && (t & u) === 0 && (u = l & -l, n = t & -t, u >= n || u === 32 && (n & 4194048) !== 0) ? t : l;
  }
  function oa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Cs(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function lr() {
    var e = mi;
    return mi <<= 1, (mi & 62914560) === 0 && (mi = 4194304), e;
  }
  function hi(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function la(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function k(e, t, n, r, l, u) {
    var m = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var _ = e.entanglements, N = e.expirationTimes, D = e.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var H = 31 - wt(n), G = 1 << H;
      _[H] = 0, N[H] = -1;
      var z = D[H];
      if (z !== null)
        for (D[H] = null, H = 0; H < z.length; H++) {
          var B = z[H];
          B !== null && (B.lane &= -536870913);
        }
      n &= ~G;
    }
    r !== 0 && be(e, r, 0), u !== 0 && l === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(m & ~t));
  }
  function be(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var r = 31 - wt(t);
    e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
  }
  function yt(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var r = 31 - wt(n), l = 1 << r;
      l & t | e[r] & t && (e[r] |= t), n &= ~l;
    }
  }
  function Ha(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Ue(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Ue(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Sn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Vt() {
    var e = J.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Nh(e.type));
  }
  function Jt(e, t) {
    var n = J.p;
    try {
      return J.p = e, t();
    } finally {
      J.p = n;
    }
  }
  var dn = Math.random().toString(36).slice(2), xe = "__reactFiber$" + dn, Xe = "__reactProps$" + dn, Qt = "__reactContainer$" + dn, Ia = "__reactEvents$" + dn, Py = "__reactListeners$" + dn, ev = "__reactHandles$" + dn, Hd = "__reactResources$" + dn, cr = "__reactMarker$" + dn;
  function Ml(e) {
    delete e[xe], delete e[Xe], delete e[Ia], delete e[Py], delete e[ev];
  }
  function gi(e) {
    var t = e[xe];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Qt] || n[xe]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = ch(e); e !== null; ) {
            if (n = e[xe]) return n;
            e = ch(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function yi(e) {
    if (e = e[xe] || e[Qt]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function ur(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function vi(e) {
    var t = e[Hd];
    return t || (t = e[Hd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ft(e) {
    e[cr] = !0;
  }
  var Id = /* @__PURE__ */ new Set(), Gd = {};
  function Ga(e, t) {
    bi(e, t), bi(e + "Capture", t);
  }
  function bi(e, t) {
    for (Gd[e] = t, e = 0; e < t.length; e++)
      Id.add(t[e]);
  }
  var tv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), qd = {}, Kd = {};
  function nv(e) {
    return Tt.call(Kd, e) ? !0 : Tt.call(qd, e) ? !1 : tv.test(e) ? Kd[e] = !0 : (qd[e] = !0, !1);
  }
  function Ds(e, t, n) {
    if (nv(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var r = t.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function Rs(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + n);
    }
  }
  function On(e, t, n, r) {
    if (r === null) e.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + r);
    }
  }
  function Zt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Yd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function av(e, t, n) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var l = r.get, u = r.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return l.call(this);
        },
        set: function(m) {
          n = "" + m, u.call(this, m);
        }
      }), Object.defineProperty(e, t, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(m) {
          n = "" + m;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Tl(e) {
    if (!e._valueTracker) {
      var t = Yd(e) ? "checked" : "value";
      e._valueTracker = av(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function Xd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), r = "";
    return e && (r = Yd(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
  }
  function zs(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var iv = /[\n"\\]/g;
  function Ft(e) {
    return e.replace(
      iv,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ol(e, t, n, r, l, u, m, _) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Zt(t)) : e.value !== "" + Zt(t) && (e.value = "" + Zt(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? Cl(e, m, Zt(t)) : n != null ? Cl(e, m, Zt(n)) : r != null && e.removeAttribute("value"), l == null && u != null && (e.defaultChecked = !!u), l != null && (e.checked = l && typeof l != "function" && typeof l != "symbol"), _ != null && typeof _ != "function" && typeof _ != "symbol" && typeof _ != "boolean" ? e.name = "" + Zt(_) : e.removeAttribute("name");
  }
  function Jd(e, t, n, r, l, u, m, _) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || t != null)) {
        Tl(e);
        return;
      }
      n = n != null ? "" + Zt(n) : "", t = t != null ? "" + Zt(t) : n, _ || t === e.value || (e.value = t), e.defaultValue = t;
    }
    r = r ?? l, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = _ ? e.checked : !!r, e.defaultChecked = !!r, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), Tl(e);
  }
  function Cl(e, t, n) {
    t === "number" && zs(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Si(e, t, n, r) {
    if (e = e.options, t) {
      t = {};
      for (var l = 0; l < n.length; l++)
        t["$" + n[l]] = !0;
      for (n = 0; n < e.length; n++)
        l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Zt(n), t = null, l = 0; l < e.length; l++) {
        if (e[l].value === n) {
          e[l].selected = !0, r && (e[l].defaultSelected = !0);
          return;
        }
        t !== null || e[l].disabled || (t = e[l]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Qd(e, t, n) {
    if (t != null && (t = "" + Zt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Zt(n) : "";
  }
  function Zd(e, t, n, r) {
    if (t == null) {
      if (r != null) {
        if (n != null) throw Error(o(92));
        if (ve(r)) {
          if (1 < r.length) throw Error(o(93));
          r = r[0];
        }
        n = r;
      }
      n == null && (n = ""), t = n;
    }
    n = Zt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Tl(e);
  }
  function _i(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var rv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Fd(e, t, n) {
    var r = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || rv.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Wd(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var r in n)
        !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var l in t)
        r = t[l], t.hasOwnProperty(l) && n[l] !== r && Fd(e, l, r);
    } else
      for (var u in t)
        t.hasOwnProperty(u) && Fd(e, u, t[u]);
  }
  function Dl(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var sv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ov = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ls(e) {
    return ov.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Cn() {
  }
  var Rl = null;
  function zl(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ei = null, xi = null;
  function Pd(e) {
    var t = yi(e);
    if (t && (e = t.stateNode)) {
      var n = e[Xe] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Ol(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Ft(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var r = n[t];
              if (r !== e && r.form === e.form) {
                var l = r[Xe] || null;
                if (!l) throw Error(o(90));
                Ol(
                  r,
                  l.value,
                  l.defaultValue,
                  l.defaultValue,
                  l.checked,
                  l.defaultChecked,
                  l.type,
                  l.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              r = n[t], r.form === e.form && Xd(r);
          }
          break e;
        case "textarea":
          Qd(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Si(e, !!n.multiple, t, !1);
      }
    }
  }
  var Ll = !1;
  function ef(e, t, n) {
    if (Ll) return e(t, n);
    Ll = !0;
    try {
      var r = e(t);
      return r;
    } finally {
      if (Ll = !1, (Ei !== null || xi !== null) && (Ao(), Ei && (t = Ei, e = xi, xi = Ei = null, Pd(t), e)))
        for (t = 0; t < e.length; t++) Pd(e[t]);
    }
  }
  function dr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = n[Xe] || null;
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        o(231, t, typeof n)
      );
    return n;
  }
  var Dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ul = !1;
  if (Dn)
    try {
      var fr = {};
      Object.defineProperty(fr, "passive", {
        get: function() {
          Ul = !0;
        }
      }), window.addEventListener("test", fr, fr), window.removeEventListener("test", fr, fr);
    } catch {
      Ul = !1;
    }
  var ca = null, Vl = null, Us = null;
  function tf() {
    if (Us) return Us;
    var e, t = Vl, n = t.length, r, l = "value" in ca ? ca.value : ca.textContent, u = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++) ;
    var m = n - e;
    for (r = 1; r <= m && t[n - r] === l[u - r]; r++) ;
    return Us = l.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Vs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Bs() {
    return !0;
  }
  function nf() {
    return !1;
  }
  function Ot(e) {
    function t(n, r, l, u, m) {
      this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = u, this.target = m, this.currentTarget = null;
      for (var _ in e)
        e.hasOwnProperty(_) && (n = e[_], this[_] = n ? n(u) : u[_]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Bs : nf, this.isPropagationStopped = nf, this;
    }
    return v(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Bs);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Bs);
      },
      persist: function() {
      },
      isPersistent: Bs
    }), t;
  }
  var qa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ks = Ot(qa), pr = v({}, qa, { view: 0, detail: 0 }), lv = Ot(pr), Bl, kl, mr, Hs = v({}, pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Il,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== mr && (mr && e.type === "mousemove" ? (Bl = e.screenX - mr.screenX, kl = e.screenY - mr.screenY) : kl = Bl = 0, mr = e), Bl);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : kl;
    }
  }), af = Ot(Hs), cv = v({}, Hs, { dataTransfer: 0 }), uv = Ot(cv), dv = v({}, pr, { relatedTarget: 0 }), Hl = Ot(dv), fv = v({}, qa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pv = Ot(fv), mv = v({}, qa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), hv = Ot(mv), gv = v({}, qa, { data: 0 }), rf = Ot(gv), yv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, vv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, bv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Sv(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = bv[e]) ? !!t[e] : !1;
  }
  function Il() {
    return Sv;
  }
  var _v = v({}, pr, {
    key: function(e) {
      if (e.key) {
        var t = yv[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Vs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? vv[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Il,
    charCode: function(e) {
      return e.type === "keypress" ? Vs(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Vs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Ev = Ot(_v), xv = v({}, Hs, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), sf = Ot(xv), Av = v({}, pr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Il
  }), Nv = Ot(Av), wv = v({}, qa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), jv = Ot(wv), $v = v({}, Hs, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Mv = Ot($v), Tv = v({}, qa, {
    newState: 0,
    oldState: 0
  }), Ov = Ot(Tv), Cv = [9, 13, 27, 32], Gl = Dn && "CompositionEvent" in window, hr = null;
  Dn && "documentMode" in document && (hr = document.documentMode);
  var Dv = Dn && "TextEvent" in window && !hr, of = Dn && (!Gl || hr && 8 < hr && 11 >= hr), lf = " ", cf = !1;
  function uf(e, t) {
    switch (e) {
      case "keyup":
        return Cv.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function df(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ai = !1;
  function Rv(e, t) {
    switch (e) {
      case "compositionend":
        return df(t);
      case "keypress":
        return t.which !== 32 ? null : (cf = !0, lf);
      case "textInput":
        return e = t.data, e === lf && cf ? null : e;
      default:
        return null;
    }
  }
  function zv(e, t) {
    if (Ai)
      return e === "compositionend" || !Gl && uf(e, t) ? (e = tf(), Us = Vl = ca = null, Ai = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return of && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Lv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ff(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Lv[e.type] : t === "textarea";
  }
  function pf(e, t, n, r) {
    Ei ? xi ? xi.push(r) : xi = [r] : Ei = r, t = Oo(t, "onChange"), 0 < t.length && (n = new ks(
      "onChange",
      "change",
      null,
      n,
      r
    ), e.push({ event: n, listeners: t }));
  }
  var gr = null, yr = null;
  function Uv(e) {
    Qm(e, 0);
  }
  function Is(e) {
    var t = ur(e);
    if (Xd(t)) return e;
  }
  function mf(e, t) {
    if (e === "change") return t;
  }
  var hf = !1;
  if (Dn) {
    var ql;
    if (Dn) {
      var Kl = "oninput" in document;
      if (!Kl) {
        var gf = document.createElement("div");
        gf.setAttribute("oninput", "return;"), Kl = typeof gf.oninput == "function";
      }
      ql = Kl;
    } else ql = !1;
    hf = ql && (!document.documentMode || 9 < document.documentMode);
  }
  function yf() {
    gr && (gr.detachEvent("onpropertychange", vf), yr = gr = null);
  }
  function vf(e) {
    if (e.propertyName === "value" && Is(yr)) {
      var t = [];
      pf(
        t,
        yr,
        e,
        zl(e)
      ), ef(Uv, t);
    }
  }
  function Vv(e, t, n) {
    e === "focusin" ? (yf(), gr = t, yr = n, gr.attachEvent("onpropertychange", vf)) : e === "focusout" && yf();
  }
  function Bv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Is(yr);
  }
  function kv(e, t) {
    if (e === "click") return Is(t);
  }
  function Hv(e, t) {
    if (e === "input" || e === "change")
      return Is(t);
  }
  function Iv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Bt = typeof Object.is == "function" ? Object.is : Iv;
  function vr(e, t) {
    if (Bt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
      var l = n[r];
      if (!Tt.call(t, l) || !Bt(e[l], t[l]))
        return !1;
    }
    return !0;
  }
  function bf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Sf(e, t) {
    var n = bf(e);
    e = 0;
    for (var r; n; ) {
      if (n.nodeType === 3) {
        if (r = e + n.textContent.length, e <= t && r >= t)
          return { node: n, offset: t - e };
        e = r;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = bf(n);
    }
  }
  function _f(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? _f(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ef(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = zs(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = zs(e.document);
    }
    return t;
  }
  function Yl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Gv = Dn && "documentMode" in document && 11 >= document.documentMode, Ni = null, Xl = null, br = null, Jl = !1;
  function xf(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jl || Ni == null || Ni !== zs(r) || (r = Ni, "selectionStart" in r && Yl(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), br && vr(br, r) || (br = r, r = Oo(Xl, "onSelect"), 0 < r.length && (t = new ks(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: r }), t.target = Ni)));
  }
  function Ka(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var wi = {
    animationend: Ka("Animation", "AnimationEnd"),
    animationiteration: Ka("Animation", "AnimationIteration"),
    animationstart: Ka("Animation", "AnimationStart"),
    transitionrun: Ka("Transition", "TransitionRun"),
    transitionstart: Ka("Transition", "TransitionStart"),
    transitioncancel: Ka("Transition", "TransitionCancel"),
    transitionend: Ka("Transition", "TransitionEnd")
  }, Ql = {}, Af = {};
  Dn && (Af = document.createElement("div").style, "AnimationEvent" in window || (delete wi.animationend.animation, delete wi.animationiteration.animation, delete wi.animationstart.animation), "TransitionEvent" in window || delete wi.transitionend.transition);
  function Ya(e) {
    if (Ql[e]) return Ql[e];
    if (!wi[e]) return e;
    var t = wi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Af)
        return Ql[e] = t[n];
    return e;
  }
  var Nf = Ya("animationend"), wf = Ya("animationiteration"), jf = Ya("animationstart"), qv = Ya("transitionrun"), Kv = Ya("transitionstart"), Yv = Ya("transitioncancel"), $f = Ya("transitionend"), Mf = /* @__PURE__ */ new Map(), Zl = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Zl.push("scrollEnd");
  function fn(e, t) {
    Mf.set(e, t), Ga(t, [e]);
  }
  var Gs = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, Wt = [], ji = 0, Fl = 0;
  function qs() {
    for (var e = ji, t = Fl = ji = 0; t < e; ) {
      var n = Wt[t];
      Wt[t++] = null;
      var r = Wt[t];
      Wt[t++] = null;
      var l = Wt[t];
      Wt[t++] = null;
      var u = Wt[t];
      if (Wt[t++] = null, r !== null && l !== null) {
        var m = r.pending;
        m === null ? l.next = l : (l.next = m.next, m.next = l), r.pending = l;
      }
      u !== 0 && Tf(n, l, u);
    }
  }
  function Ks(e, t, n, r) {
    Wt[ji++] = e, Wt[ji++] = t, Wt[ji++] = n, Wt[ji++] = r, Fl |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Wl(e, t, n, r) {
    return Ks(e, t, n, r), Ys(e);
  }
  function Xa(e, t) {
    return Ks(e, null, null, t), Ys(e);
  }
  function Tf(e, t, n) {
    e.lanes |= n;
    var r = e.alternate;
    r !== null && (r.lanes |= n);
    for (var l = !1, u = e.return; u !== null; )
      u.childLanes |= n, r = u.alternate, r !== null && (r.childLanes |= n), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (l = !0)), e = u, u = u.return;
    return e.tag === 3 ? (u = e.stateNode, l && t !== null && (l = 31 - wt(n), e = u.hiddenUpdates, r = e[l], r === null ? e[l] = [t] : r.push(t), t.lane = n | 536870912), u) : null;
  }
  function Ys(e) {
    if (50 < Hr)
      throw Hr = 0, ou = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var $i = {};
  function Xv(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function kt(e, t, n, r) {
    return new Xv(e, t, n, r);
  }
  function Pl(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Rn(e, t) {
    var n = e.alternate;
    return n === null ? (n = kt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Of(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Xs(e, t, n, r, l, u) {
    var m = 0;
    if (r = e, typeof e == "function") Pl(e) && (m = 1);
    else if (typeof e == "string")
      m = Wb(
        e,
        n,
        W.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ce:
          return e = kt(31, n, t, l), e.elementType = ce, e.lanes = u, e;
        case E:
          return Ja(n.children, l, u, t);
        case L:
          m = 8, l |= 24;
          break;
        case R:
          return e = kt(12, n, t, l | 2), e.elementType = R, e.lanes = u, e;
        case Y:
          return e = kt(13, n, t, l), e.elementType = Y, e.lanes = u, e;
        case K:
          return e = kt(19, n, t, l), e.elementType = K, e.lanes = u, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case q:
                m = 10;
                break e;
              case j:
                m = 9;
                break e;
              case Z:
                m = 11;
                break e;
              case V:
                m = 14;
                break e;
              case de:
                m = 16, r = null;
                break e;
            }
          m = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return t = kt(m, n, t, l), t.elementType = e, t.type = r, t.lanes = u, t;
  }
  function Ja(e, t, n, r) {
    return e = kt(7, e, r, t), e.lanes = n, e;
  }
  function ec(e, t, n) {
    return e = kt(6, e, null, t), e.lanes = n, e;
  }
  function Cf(e) {
    var t = kt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function tc(e, t, n) {
    return t = kt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var Df = /* @__PURE__ */ new WeakMap();
  function Pt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = Df.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Et(t)
      }, Df.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Et(t)
    };
  }
  var Mi = [], Ti = 0, Js = null, Sr = 0, en = [], tn = 0, ua = null, _n = 1, En = "";
  function zn(e, t) {
    Mi[Ti++] = Sr, Mi[Ti++] = Js, Js = e, Sr = t;
  }
  function Rf(e, t, n) {
    en[tn++] = _n, en[tn++] = En, en[tn++] = ua, ua = e;
    var r = _n;
    e = En;
    var l = 32 - wt(r) - 1;
    r &= ~(1 << l), n += 1;
    var u = 32 - wt(t) + l;
    if (30 < u) {
      var m = l - l % 5;
      u = (r & (1 << m) - 1).toString(32), r >>= m, l -= m, _n = 1 << 32 - wt(t) + l | n << l | r, En = u + e;
    } else
      _n = 1 << u | n << l | r, En = e;
  }
  function nc(e) {
    e.return !== null && (zn(e, 1), Rf(e, 1, 0));
  }
  function ac(e) {
    for (; e === Js; )
      Js = Mi[--Ti], Mi[Ti] = null, Sr = Mi[--Ti], Mi[Ti] = null;
    for (; e === ua; )
      ua = en[--tn], en[tn] = null, En = en[--tn], en[tn] = null, _n = en[--tn], en[tn] = null;
  }
  function zf(e, t) {
    en[tn++] = _n, en[tn++] = En, en[tn++] = ua, _n = t.id, En = t.overflow, ua = e;
  }
  var vt = null, Je = null, Oe = !1, da = null, nn = !1, ic = Error(o(519));
  function fa(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw _r(Pt(t, e)), ic;
  }
  function Lf(e) {
    var t = e.stateNode, n = e.type, r = e.memoizedProps;
    switch (t[xe] = e, t[Xe] = r, n) {
      case "dialog":
        $e("cancel", t), $e("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        $e("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Gr.length; n++)
          $e(Gr[n], t);
        break;
      case "source":
        $e("error", t);
        break;
      case "img":
      case "image":
      case "link":
        $e("error", t), $e("load", t);
        break;
      case "details":
        $e("toggle", t);
        break;
      case "input":
        $e("invalid", t), Jd(
          t,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        );
        break;
      case "select":
        $e("invalid", t);
        break;
      case "textarea":
        $e("invalid", t), Zd(t, r.value, r.defaultValue, r.children);
    }
    n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || r.suppressHydrationWarning === !0 || Pm(t.textContent, n) ? (r.popover != null && ($e("beforetoggle", t), $e("toggle", t)), r.onScroll != null && $e("scroll", t), r.onScrollEnd != null && $e("scrollend", t), r.onClick != null && (t.onclick = Cn), t = !0) : t = !1, t || fa(e, !0);
  }
  function Uf(e) {
    for (vt = e.return; vt; )
      switch (vt.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          vt = vt.return;
      }
  }
  function Oi(e) {
    if (e !== vt) return !1;
    if (!Oe) return Uf(e), Oe = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Eu(e.type, e.memoizedProps)), n = !n), n && Je && fa(e), Uf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Je = lh(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      Je = lh(e);
    } else
      t === 27 ? (t = Je, wa(e.type) ? (e = ju, ju = null, Je = e) : Je = t) : Je = vt ? rn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Qa() {
    Je = vt = null, Oe = !1;
  }
  function rc() {
    var e = da;
    return e !== null && (zt === null ? zt = e : zt.push.apply(
      zt,
      e
    ), da = null), e;
  }
  function _r(e) {
    da === null ? da = [e] : da.push(e);
  }
  var sc = x(null), Za = null, Ln = null;
  function pa(e, t, n) {
    F(sc, t._currentValue), t._currentValue = n;
  }
  function Un(e) {
    e._currentValue = sc.current, U(sc);
  }
  function oc(e, t, n) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function lc(e, t, n, r) {
    var l = e.child;
    for (l !== null && (l.return = e); l !== null; ) {
      var u = l.dependencies;
      if (u !== null) {
        var m = l.child;
        u = u.firstContext;
        e: for (; u !== null; ) {
          var _ = u;
          u = l;
          for (var N = 0; N < t.length; N++)
            if (_.context === t[N]) {
              u.lanes |= n, _ = u.alternate, _ !== null && (_.lanes |= n), oc(
                u.return,
                n,
                e
              ), r || (m = null);
              break e;
            }
          u = _.next;
        }
      } else if (l.tag === 18) {
        if (m = l.return, m === null) throw Error(o(341));
        m.lanes |= n, u = m.alternate, u !== null && (u.lanes |= n), oc(m, n, e), m = null;
      } else m = l.child;
      if (m !== null) m.return = l;
      else
        for (m = l; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (l = m.sibling, l !== null) {
            l.return = m.return, m = l;
            break;
          }
          m = m.return;
        }
      l = m;
    }
  }
  function Ci(e, t, n, r) {
    e = null;
    for (var l = t, u = !1; l !== null; ) {
      if (!u) {
        if ((l.flags & 524288) !== 0) u = !0;
        else if ((l.flags & 262144) !== 0) break;
      }
      if (l.tag === 10) {
        var m = l.alternate;
        if (m === null) throw Error(o(387));
        if (m = m.memoizedProps, m !== null) {
          var _ = l.type;
          Bt(l.pendingProps.value, m.value) || (e !== null ? e.push(_) : e = [_]);
        }
      } else if (l === ue.current) {
        if (m = l.alternate, m === null) throw Error(o(387));
        m.memoizedState.memoizedState !== l.memoizedState.memoizedState && (e !== null ? e.push(Jr) : e = [Jr]);
      }
      l = l.return;
    }
    e !== null && lc(
      t,
      e,
      n,
      r
    ), t.flags |= 262144;
  }
  function Qs(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Bt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Fa(e) {
    Za = e, Ln = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function bt(e) {
    return Vf(Za, e);
  }
  function Zs(e, t) {
    return Za === null && Fa(e), Vf(e, t);
  }
  function Vf(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Ln === null) {
      if (e === null) throw Error(o(308));
      Ln = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ln = Ln.next = t;
    return n;
  }
  var Jv = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Qv = a.unstable_scheduleCallback, Zv = a.unstable_NormalPriority, st = {
    $$typeof: q,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function cc() {
    return {
      controller: new Jv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Er(e) {
    e.refCount--, e.refCount === 0 && Qv(Zv, function() {
      e.controller.abort();
    });
  }
  var xr = null, uc = 0, Di = 0, Ri = null;
  function Fv(e, t) {
    if (xr === null) {
      var n = xr = [];
      uc = 0, Di = pu(), Ri = {
        status: "pending",
        value: void 0,
        then: function(r) {
          n.push(r);
        }
      };
    }
    return uc++, t.then(Bf, Bf), t;
  }
  function Bf() {
    if (--uc === 0 && xr !== null) {
      Ri !== null && (Ri.status = "fulfilled");
      var e = xr;
      xr = null, Di = 0, Ri = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function Wv(e, t) {
    var n = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(l) {
        n.push(l);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = t;
        for (var l = 0; l < n.length; l++) (0, n[l])(t);
      },
      function(l) {
        for (r.status = "rejected", r.reason = l, l = 0; l < n.length; l++)
          (0, n[l])(void 0);
      }
    ), r;
  }
  var kf = M.S;
  M.S = function(e, t) {
    xm = Nt(), typeof t == "object" && t !== null && typeof t.then == "function" && Fv(e, t), kf !== null && kf(e, t);
  };
  var Wa = x(null);
  function dc() {
    var e = Wa.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function Fs(e, t) {
    t === null ? F(Wa, Wa.current) : F(Wa, t.pool);
  }
  function Hf() {
    var e = dc();
    return e === null ? null : { parent: st._currentValue, pool: e };
  }
  var zi = Error(o(460)), fc = Error(o(474)), Ws = Error(o(542)), Ps = { then: function() {
  } };
  function If(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Gf(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Cn, Cn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, Kf(e), e;
      default:
        if (typeof t.status == "string") t.then(Cn, Cn);
        else {
          if (e = Ye, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(r) {
              if (t.status === "pending") {
                var l = t;
                l.status = "fulfilled", l.value = r;
              }
            },
            function(r) {
              if (t.status === "pending") {
                var l = t;
                l.status = "rejected", l.reason = r;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, Kf(e), e;
        }
        throw ei = t, zi;
    }
  }
  function Pa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ei = n, zi) : n;
    }
  }
  var ei = null;
  function qf() {
    if (ei === null) throw Error(o(459));
    var e = ei;
    return ei = null, e;
  }
  function Kf(e) {
    if (e === zi || e === Ws)
      throw Error(o(483));
  }
  var Li = null, Ar = 0;
  function eo(e) {
    var t = Ar;
    return Ar += 1, Li === null && (Li = []), Gf(Li, e, t);
  }
  function Nr(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function to(e, t) {
    throw t.$$typeof === S ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Yf(e) {
    function t($, w) {
      if (e) {
        var C = $.deletions;
        C === null ? ($.deletions = [w], $.flags |= 16) : C.push(w);
      }
    }
    function n($, w) {
      if (!e) return null;
      for (; w !== null; )
        t($, w), w = w.sibling;
      return null;
    }
    function r($) {
      for (var w = /* @__PURE__ */ new Map(); $ !== null; )
        $.key !== null ? w.set($.key, $) : w.set($.index, $), $ = $.sibling;
      return w;
    }
    function l($, w) {
      return $ = Rn($, w), $.index = 0, $.sibling = null, $;
    }
    function u($, w, C) {
      return $.index = C, e ? (C = $.alternate, C !== null ? (C = C.index, C < w ? ($.flags |= 67108866, w) : C) : ($.flags |= 67108866, w)) : ($.flags |= 1048576, w);
    }
    function m($) {
      return e && $.alternate === null && ($.flags |= 67108866), $;
    }
    function _($, w, C, I) {
      return w === null || w.tag !== 6 ? (w = ec(C, $.mode, I), w.return = $, w) : (w = l(w, C), w.return = $, w);
    }
    function N($, w, C, I) {
      var me = C.type;
      return me === E ? H(
        $,
        w,
        C.props.children,
        I,
        C.key
      ) : w !== null && (w.elementType === me || typeof me == "object" && me !== null && me.$$typeof === de && Pa(me) === w.type) ? (w = l(w, C.props), Nr(w, C), w.return = $, w) : (w = Xs(
        C.type,
        C.key,
        C.props,
        null,
        $.mode,
        I
      ), Nr(w, C), w.return = $, w);
    }
    function D($, w, C, I) {
      return w === null || w.tag !== 4 || w.stateNode.containerInfo !== C.containerInfo || w.stateNode.implementation !== C.implementation ? (w = tc(C, $.mode, I), w.return = $, w) : (w = l(w, C.children || []), w.return = $, w);
    }
    function H($, w, C, I, me) {
      return w === null || w.tag !== 7 ? (w = Ja(
        C,
        $.mode,
        I,
        me
      ), w.return = $, w) : (w = l(w, C), w.return = $, w);
    }
    function G($, w, C) {
      if (typeof w == "string" && w !== "" || typeof w == "number" || typeof w == "bigint")
        return w = ec(
          "" + w,
          $.mode,
          C
        ), w.return = $, w;
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case A:
            return C = Xs(
              w.type,
              w.key,
              w.props,
              null,
              $.mode,
              C
            ), Nr(C, w), C.return = $, C;
          case O:
            return w = tc(
              w,
              $.mode,
              C
            ), w.return = $, w;
          case de:
            return w = Pa(w), G($, w, C);
        }
        if (ve(w) || oe(w))
          return w = Ja(
            w,
            $.mode,
            C,
            null
          ), w.return = $, w;
        if (typeof w.then == "function")
          return G($, eo(w), C);
        if (w.$$typeof === q)
          return G(
            $,
            Zs($, w),
            C
          );
        to($, w);
      }
      return null;
    }
    function z($, w, C, I) {
      var me = w !== null ? w.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return me !== null ? null : _($, w, "" + C, I);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case A:
            return C.key === me ? N($, w, C, I) : null;
          case O:
            return C.key === me ? D($, w, C, I) : null;
          case de:
            return C = Pa(C), z($, w, C, I);
        }
        if (ve(C) || oe(C))
          return me !== null ? null : H($, w, C, I, null);
        if (typeof C.then == "function")
          return z(
            $,
            w,
            eo(C),
            I
          );
        if (C.$$typeof === q)
          return z(
            $,
            w,
            Zs($, C),
            I
          );
        to($, C);
      }
      return null;
    }
    function B($, w, C, I, me) {
      if (typeof I == "string" && I !== "" || typeof I == "number" || typeof I == "bigint")
        return $ = $.get(C) || null, _(w, $, "" + I, me);
      if (typeof I == "object" && I !== null) {
        switch (I.$$typeof) {
          case A:
            return $ = $.get(
              I.key === null ? C : I.key
            ) || null, N(w, $, I, me);
          case O:
            return $ = $.get(
              I.key === null ? C : I.key
            ) || null, D(w, $, I, me);
          case de:
            return I = Pa(I), B(
              $,
              w,
              C,
              I,
              me
            );
        }
        if (ve(I) || oe(I))
          return $ = $.get(C) || null, H(w, $, I, me, null);
        if (typeof I.then == "function")
          return B(
            $,
            w,
            C,
            eo(I),
            me
          );
        if (I.$$typeof === q)
          return B(
            $,
            w,
            C,
            Zs(w, I),
            me
          );
        to(w, I);
      }
      return null;
    }
    function re($, w, C, I) {
      for (var me = null, Re = null, le = w, Ne = w = 0, Te = null; le !== null && Ne < C.length; Ne++) {
        le.index > Ne ? (Te = le, le = null) : Te = le.sibling;
        var ze = z(
          $,
          le,
          C[Ne],
          I
        );
        if (ze === null) {
          le === null && (le = Te);
          break;
        }
        e && le && ze.alternate === null && t($, le), w = u(ze, w, Ne), Re === null ? me = ze : Re.sibling = ze, Re = ze, le = Te;
      }
      if (Ne === C.length)
        return n($, le), Oe && zn($, Ne), me;
      if (le === null) {
        for (; Ne < C.length; Ne++)
          le = G($, C[Ne], I), le !== null && (w = u(
            le,
            w,
            Ne
          ), Re === null ? me = le : Re.sibling = le, Re = le);
        return Oe && zn($, Ne), me;
      }
      for (le = r(le); Ne < C.length; Ne++)
        Te = B(
          le,
          $,
          Ne,
          C[Ne],
          I
        ), Te !== null && (e && Te.alternate !== null && le.delete(
          Te.key === null ? Ne : Te.key
        ), w = u(
          Te,
          w,
          Ne
        ), Re === null ? me = Te : Re.sibling = Te, Re = Te);
      return e && le.forEach(function(Oa) {
        return t($, Oa);
      }), Oe && zn($, Ne), me;
    }
    function he($, w, C, I) {
      if (C == null) throw Error(o(151));
      for (var me = null, Re = null, le = w, Ne = w = 0, Te = null, ze = C.next(); le !== null && !ze.done; Ne++, ze = C.next()) {
        le.index > Ne ? (Te = le, le = null) : Te = le.sibling;
        var Oa = z($, le, ze.value, I);
        if (Oa === null) {
          le === null && (le = Te);
          break;
        }
        e && le && Oa.alternate === null && t($, le), w = u(Oa, w, Ne), Re === null ? me = Oa : Re.sibling = Oa, Re = Oa, le = Te;
      }
      if (ze.done)
        return n($, le), Oe && zn($, Ne), me;
      if (le === null) {
        for (; !ze.done; Ne++, ze = C.next())
          ze = G($, ze.value, I), ze !== null && (w = u(ze, w, Ne), Re === null ? me = ze : Re.sibling = ze, Re = ze);
        return Oe && zn($, Ne), me;
      }
      for (le = r(le); !ze.done; Ne++, ze = C.next())
        ze = B(le, $, Ne, ze.value, I), ze !== null && (e && ze.alternate !== null && le.delete(ze.key === null ? Ne : ze.key), w = u(ze, w, Ne), Re === null ? me = ze : Re.sibling = ze, Re = ze);
      return e && le.forEach(function(c0) {
        return t($, c0);
      }), Oe && zn($, Ne), me;
    }
    function Ge($, w, C, I) {
      if (typeof C == "object" && C !== null && C.type === E && C.key === null && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case A:
            e: {
              for (var me = C.key; w !== null; ) {
                if (w.key === me) {
                  if (me = C.type, me === E) {
                    if (w.tag === 7) {
                      n(
                        $,
                        w.sibling
                      ), I = l(
                        w,
                        C.props.children
                      ), I.return = $, $ = I;
                      break e;
                    }
                  } else if (w.elementType === me || typeof me == "object" && me !== null && me.$$typeof === de && Pa(me) === w.type) {
                    n(
                      $,
                      w.sibling
                    ), I = l(w, C.props), Nr(I, C), I.return = $, $ = I;
                    break e;
                  }
                  n($, w);
                  break;
                } else t($, w);
                w = w.sibling;
              }
              C.type === E ? (I = Ja(
                C.props.children,
                $.mode,
                I,
                C.key
              ), I.return = $, $ = I) : (I = Xs(
                C.type,
                C.key,
                C.props,
                null,
                $.mode,
                I
              ), Nr(I, C), I.return = $, $ = I);
            }
            return m($);
          case O:
            e: {
              for (me = C.key; w !== null; ) {
                if (w.key === me)
                  if (w.tag === 4 && w.stateNode.containerInfo === C.containerInfo && w.stateNode.implementation === C.implementation) {
                    n(
                      $,
                      w.sibling
                    ), I = l(w, C.children || []), I.return = $, $ = I;
                    break e;
                  } else {
                    n($, w);
                    break;
                  }
                else t($, w);
                w = w.sibling;
              }
              I = tc(C, $.mode, I), I.return = $, $ = I;
            }
            return m($);
          case de:
            return C = Pa(C), Ge(
              $,
              w,
              C,
              I
            );
        }
        if (ve(C))
          return re(
            $,
            w,
            C,
            I
          );
        if (oe(C)) {
          if (me = oe(C), typeof me != "function") throw Error(o(150));
          return C = me.call(C), he(
            $,
            w,
            C,
            I
          );
        }
        if (typeof C.then == "function")
          return Ge(
            $,
            w,
            eo(C),
            I
          );
        if (C.$$typeof === q)
          return Ge(
            $,
            w,
            Zs($, C),
            I
          );
        to($, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint" ? (C = "" + C, w !== null && w.tag === 6 ? (n($, w.sibling), I = l(w, C), I.return = $, $ = I) : (n($, w), I = ec(C, $.mode, I), I.return = $, $ = I), m($)) : n($, w);
    }
    return function($, w, C, I) {
      try {
        Ar = 0;
        var me = Ge(
          $,
          w,
          C,
          I
        );
        return Li = null, me;
      } catch (le) {
        if (le === zi || le === Ws) throw le;
        var Re = kt(29, le, null, $.mode);
        return Re.lanes = I, Re.return = $, Re;
      } finally {
      }
    };
  }
  var ti = Yf(!0), Xf = Yf(!1), ma = !1;
  function pc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function mc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ha(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ga(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (Le & 2) !== 0) {
      var l = r.pending;
      return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, t = Ys(e), Tf(e, null, n), t;
    }
    return Ks(e, r, t, n), Ys(e);
  }
  function wr(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, yt(e, n);
    }
  }
  function hc(e, t) {
    var n = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
      var l = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? l = u = m : u = u.next = m, n = n.next;
        } while (n !== null);
        u === null ? l = u = t : u = u.next = t;
      } else l = u = t;
      n = {
        baseState: r.baseState,
        firstBaseUpdate: l,
        lastBaseUpdate: u,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var gc = !1;
  function jr() {
    if (gc) {
      var e = Ri;
      if (e !== null) throw e;
    }
  }
  function $r(e, t, n, r) {
    gc = !1;
    var l = e.updateQueue;
    ma = !1;
    var u = l.firstBaseUpdate, m = l.lastBaseUpdate, _ = l.shared.pending;
    if (_ !== null) {
      l.shared.pending = null;
      var N = _, D = N.next;
      N.next = null, m === null ? u = D : m.next = D, m = N;
      var H = e.alternate;
      H !== null && (H = H.updateQueue, _ = H.lastBaseUpdate, _ !== m && (_ === null ? H.firstBaseUpdate = D : _.next = D, H.lastBaseUpdate = N));
    }
    if (u !== null) {
      var G = l.baseState;
      m = 0, H = D = N = null, _ = u;
      do {
        var z = _.lane & -536870913, B = z !== _.lane;
        if (B ? (Me & z) === z : (r & z) === z) {
          z !== 0 && z === Di && (gc = !0), H !== null && (H = H.next = {
            lane: 0,
            tag: _.tag,
            payload: _.payload,
            callback: null,
            next: null
          });
          e: {
            var re = e, he = _;
            z = t;
            var Ge = n;
            switch (he.tag) {
              case 1:
                if (re = he.payload, typeof re == "function") {
                  G = re.call(Ge, G, z);
                  break e;
                }
                G = re;
                break e;
              case 3:
                re.flags = re.flags & -65537 | 128;
              case 0:
                if (re = he.payload, z = typeof re == "function" ? re.call(Ge, G, z) : re, z == null) break e;
                G = v({}, G, z);
                break e;
              case 2:
                ma = !0;
            }
          }
          z = _.callback, z !== null && (e.flags |= 64, B && (e.flags |= 8192), B = l.callbacks, B === null ? l.callbacks = [z] : B.push(z));
        } else
          B = {
            lane: z,
            tag: _.tag,
            payload: _.payload,
            callback: _.callback,
            next: null
          }, H === null ? (D = H = B, N = G) : H = H.next = B, m |= z;
        if (_ = _.next, _ === null) {
          if (_ = l.shared.pending, _ === null)
            break;
          B = _, _ = B.next, B.next = null, l.lastBaseUpdate = B, l.shared.pending = null;
        }
      } while (!0);
      H === null && (N = G), l.baseState = N, l.firstBaseUpdate = D, l.lastBaseUpdate = H, u === null && (l.shared.lanes = 0), _a |= m, e.lanes = m, e.memoizedState = G;
    }
  }
  function Jf(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function Qf(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Jf(n[e], t);
  }
  var Ui = x(null), no = x(0);
  function Zf(e, t) {
    e = Yn, F(no, e), F(Ui, t), Yn = e | t.baseLanes;
  }
  function yc() {
    F(no, Yn), F(Ui, Ui.current);
  }
  function vc() {
    Yn = no.current, U(Ui), U(no);
  }
  var Ht = x(null), an = null;
  function ya(e) {
    var t = e.alternate;
    F(at, at.current & 1), F(Ht, e), an === null && (t === null || Ui.current !== null || t.memoizedState !== null) && (an = e);
  }
  function bc(e) {
    F(at, at.current), F(Ht, e), an === null && (an = e);
  }
  function Ff(e) {
    e.tag === 22 ? (F(at, at.current), F(Ht, e), an === null && (an = e)) : va();
  }
  function va() {
    F(at, at.current), F(Ht, Ht.current);
  }
  function It(e) {
    U(Ht), an === e && (an = null), U(at);
  }
  var at = x(0);
  function ao(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Nu(n) || wu(n)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Vn = 0, Ae = null, He = null, ot = null, io = !1, Vi = !1, ni = !1, ro = 0, Mr = 0, Bi = null, Pv = 0;
  function et() {
    throw Error(o(321));
  }
  function Sc(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Bt(e[n], t[n])) return !1;
    return !0;
  }
  function _c(e, t, n, r, l, u) {
    return Vn = u, Ae = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, M.H = e === null || e.memoizedState === null ? Rp : Lc, ni = !1, u = n(r, l), ni = !1, Vi && (u = Pf(
      t,
      n,
      r,
      l
    )), Wf(e), u;
  }
  function Wf(e) {
    M.H = Cr;
    var t = He !== null && He.next !== null;
    if (Vn = 0, ot = He = Ae = null, io = !1, Mr = 0, Bi = null, t) throw Error(o(300));
    e === null || lt || (e = e.dependencies, e !== null && Qs(e) && (lt = !0));
  }
  function Pf(e, t, n, r) {
    Ae = e;
    var l = 0;
    do {
      if (Vi && (Bi = null), Mr = 0, Vi = !1, 25 <= l) throw Error(o(301));
      if (l += 1, ot = He = null, e.updateQueue != null) {
        var u = e.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      M.H = zp, u = t(n, r);
    } while (Vi);
    return u;
  }
  function eb() {
    var e = M.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Tr(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (Ae.flags |= 1024), t;
  }
  function Ec() {
    var e = ro !== 0;
    return ro = 0, e;
  }
  function xc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Ac(e) {
    if (io) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      io = !1;
    }
    Vn = 0, ot = He = Ae = null, Vi = !1, Mr = ro = 0, Bi = null;
  }
  function $t() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ot === null ? Ae.memoizedState = ot = e : ot = ot.next = e, ot;
  }
  function it() {
    if (He === null) {
      var e = Ae.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = He.next;
    var t = ot === null ? Ae.memoizedState : ot.next;
    if (t !== null)
      ot = t, He = e;
    else {
      if (e === null)
        throw Ae.alternate === null ? Error(o(467)) : Error(o(310));
      He = e, e = {
        memoizedState: He.memoizedState,
        baseState: He.baseState,
        baseQueue: He.baseQueue,
        queue: He.queue,
        next: null
      }, ot === null ? Ae.memoizedState = ot = e : ot = ot.next = e;
    }
    return ot;
  }
  function so() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Tr(e) {
    var t = Mr;
    return Mr += 1, Bi === null && (Bi = []), e = Gf(Bi, e, t), t = Ae, (ot === null ? t.memoizedState : ot.next) === null && (t = t.alternate, M.H = t === null || t.memoizedState === null ? Rp : Lc), e;
  }
  function oo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Tr(e);
      if (e.$$typeof === q) return bt(e);
    }
    throw Error(o(438, String(e)));
  }
  function Nc(e) {
    var t = null, n = Ae.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var r = Ae.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
        data: r.data.map(function(l) {
          return l.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = so(), Ae.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), r = 0; r < e; r++)
        n[r] = X;
    return t.index++, n;
  }
  function Bn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function lo(e) {
    var t = it();
    return wc(t, He, e);
  }
  function wc(e, t, n) {
    var r = e.queue;
    if (r === null) throw Error(o(311));
    r.lastRenderedReducer = n;
    var l = e.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var m = l.next;
        l.next = u.next, u.next = m;
      }
      t.baseQueue = l = u, r.pending = null;
    }
    if (u = e.baseState, l === null) e.memoizedState = u;
    else {
      t = l.next;
      var _ = m = null, N = null, D = t, H = !1;
      do {
        var G = D.lane & -536870913;
        if (G !== D.lane ? (Me & G) === G : (Vn & G) === G) {
          var z = D.revertLane;
          if (z === 0)
            N !== null && (N = N.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null
            }), G === Di && (H = !0);
          else if ((Vn & z) === z) {
            D = D.next, z === Di && (H = !0);
            continue;
          } else
            G = {
              lane: 0,
              revertLane: D.revertLane,
              gesture: null,
              action: D.action,
              hasEagerState: D.hasEagerState,
              eagerState: D.eagerState,
              next: null
            }, N === null ? (_ = N = G, m = u) : N = N.next = G, Ae.lanes |= z, _a |= z;
          G = D.action, ni && n(u, G), u = D.hasEagerState ? D.eagerState : n(u, G);
        } else
          z = {
            lane: G,
            revertLane: D.revertLane,
            gesture: D.gesture,
            action: D.action,
            hasEagerState: D.hasEagerState,
            eagerState: D.eagerState,
            next: null
          }, N === null ? (_ = N = z, m = u) : N = N.next = z, Ae.lanes |= G, _a |= G;
        D = D.next;
      } while (D !== null && D !== t);
      if (N === null ? m = u : N.next = _, !Bt(u, e.memoizedState) && (lt = !0, H && (n = Ri, n !== null)))
        throw n;
      e.memoizedState = u, e.baseState = m, e.baseQueue = N, r.lastRenderedState = u;
    }
    return l === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function jc(e) {
    var t = it(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch, l = n.pending, u = t.memoizedState;
    if (l !== null) {
      n.pending = null;
      var m = l = l.next;
      do
        u = e(u, m.action), m = m.next;
      while (m !== l);
      Bt(u, t.memoizedState) || (lt = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
    }
    return [u, r];
  }
  function ep(e, t, n) {
    var r = Ae, l = it(), u = Oe;
    if (u) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var m = !Bt(
      (He || l).memoizedState,
      n
    );
    if (m && (l.memoizedState = n, lt = !0), l = l.queue, Tc(ap.bind(null, r, l, e), [
      e
    ]), l.getSnapshot !== t || m || ot !== null && ot.memoizedState.tag & 1) {
      if (r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        np.bind(
          null,
          r,
          l,
          n,
          t
        ),
        null
      ), Ye === null) throw Error(o(349));
      u || (Vn & 127) !== 0 || tp(r, t, n);
    }
    return n;
  }
  function tp(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Ae.updateQueue, t === null ? (t = so(), Ae.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function np(e, t, n, r) {
    t.value = n, t.getSnapshot = r, ip(t) && rp(e);
  }
  function ap(e, t, n) {
    return n(function() {
      ip(t) && rp(e);
    });
  }
  function ip(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Bt(e, n);
    } catch {
      return !0;
    }
  }
  function rp(e) {
    var t = Xa(e, 2);
    t !== null && Lt(t, e, 2);
  }
  function $c(e) {
    var t = $t();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ni) {
        Tn(!0);
        try {
          n();
        } finally {
          Tn(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bn,
      lastRenderedState: e
    }, t;
  }
  function sp(e, t, n, r) {
    return e.baseState = n, wc(
      e,
      He,
      typeof r == "function" ? r : Bn
    );
  }
  function tb(e, t, n, r, l) {
    if (fo(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var u = {
        payload: l,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          u.listeners.push(m);
        }
      };
      M.T !== null ? n(!0) : u.isTransition = !1, r(u), n = t.pending, n === null ? (u.next = t.pending = u, op(t, u)) : (u.next = n.next, t.pending = n.next = u);
    }
  }
  function op(e, t) {
    var n = t.action, r = t.payload, l = e.state;
    if (t.isTransition) {
      var u = M.T, m = {};
      M.T = m;
      try {
        var _ = n(l, r), N = M.S;
        N !== null && N(m, _), lp(e, t, _);
      } catch (D) {
        Mc(e, t, D);
      } finally {
        u !== null && m.types !== null && (u.types = m.types), M.T = u;
      }
    } else
      try {
        u = n(l, r), lp(e, t, u);
      } catch (D) {
        Mc(e, t, D);
      }
  }
  function lp(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(r) {
        cp(e, t, r);
      },
      function(r) {
        return Mc(e, t, r);
      }
    ) : cp(e, t, n);
  }
  function cp(e, t, n) {
    t.status = "fulfilled", t.value = n, up(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, op(e, n)));
  }
  function Mc(e, t, n) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        t.status = "rejected", t.reason = n, up(t), t = t.next;
      while (t !== r);
    }
    e.action = null;
  }
  function up(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function dp(e, t) {
    return t;
  }
  function fp(e, t) {
    if (Oe) {
      var n = Ye.formState;
      if (n !== null) {
        e: {
          var r = Ae;
          if (Oe) {
            if (Je) {
              t: {
                for (var l = Je, u = nn; l.nodeType !== 8; ) {
                  if (!u) {
                    l = null;
                    break t;
                  }
                  if (l = rn(
                    l.nextSibling
                  ), l === null) {
                    l = null;
                    break t;
                  }
                }
                u = l.data, l = u === "F!" || u === "F" ? l : null;
              }
              if (l) {
                Je = rn(
                  l.nextSibling
                ), r = l.data === "F!";
                break e;
              }
            }
            fa(r);
          }
          r = !1;
        }
        r && (t = n[0]);
      }
    }
    return n = $t(), n.memoizedState = n.baseState = t, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: dp,
      lastRenderedState: t
    }, n.queue = r, n = Op.bind(
      null,
      Ae,
      r
    ), r.dispatch = n, r = $c(!1), u = zc.bind(
      null,
      Ae,
      !1,
      r.queue
    ), r = $t(), l = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = l, n = tb.bind(
      null,
      Ae,
      l,
      u,
      n
    ), l.dispatch = n, r.memoizedState = e, [t, n, !1];
  }
  function pp(e) {
    var t = it();
    return mp(t, He, e);
  }
  function mp(e, t, n) {
    if (t = wc(
      e,
      t,
      dp
    )[0], e = lo(Bn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var r = Tr(t);
      } catch (m) {
        throw m === zi ? Ws : m;
      }
    else r = t;
    t = it();
    var l = t.queue, u = l.dispatch;
    return n !== t.memoizedState && (Ae.flags |= 2048, ki(
      9,
      { destroy: void 0 },
      nb.bind(null, l, n),
      null
    )), [r, u, e];
  }
  function nb(e, t) {
    e.action = t;
  }
  function hp(e) {
    var t = it(), n = He;
    if (n !== null)
      return mp(t, n, e);
    it(), t = t.memoizedState, n = it();
    var r = n.queue.dispatch;
    return n.memoizedState = e, [t, r, !1];
  }
  function ki(e, t, n, r) {
    return e = { tag: e, create: n, deps: r, inst: t, next: null }, t = Ae.updateQueue, t === null && (t = so(), Ae.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
  }
  function gp() {
    return it().memoizedState;
  }
  function co(e, t, n, r) {
    var l = $t();
    Ae.flags |= e, l.memoizedState = ki(
      1 | t,
      { destroy: void 0 },
      n,
      r === void 0 ? null : r
    );
  }
  function uo(e, t, n, r) {
    var l = it();
    r = r === void 0 ? null : r;
    var u = l.memoizedState.inst;
    He !== null && r !== null && Sc(r, He.memoizedState.deps) ? l.memoizedState = ki(t, u, n, r) : (Ae.flags |= e, l.memoizedState = ki(
      1 | t,
      u,
      n,
      r
    ));
  }
  function yp(e, t) {
    co(8390656, 8, e, t);
  }
  function Tc(e, t) {
    uo(2048, 8, e, t);
  }
  function ab(e) {
    Ae.flags |= 4;
    var t = Ae.updateQueue;
    if (t === null)
      t = so(), Ae.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function vp(e) {
    var t = it().memoizedState;
    return ab({ ref: t, nextImpl: e }), function() {
      if ((Le & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function bp(e, t) {
    return uo(4, 2, e, t);
  }
  function Sp(e, t) {
    return uo(4, 4, e, t);
  }
  function _p(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Ep(e, t, n) {
    n = n != null ? n.concat([e]) : null, uo(4, 4, _p.bind(null, t, e), n);
  }
  function Oc() {
  }
  function xp(e, t) {
    var n = it();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return t !== null && Sc(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
  }
  function Ap(e, t) {
    var n = it();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    if (t !== null && Sc(t, r[1]))
      return r[0];
    if (r = e(), ni) {
      Tn(!0);
      try {
        e();
      } finally {
        Tn(!1);
      }
    }
    return n.memoizedState = [r, t], r;
  }
  function Cc(e, t, n) {
    return n === void 0 || (Vn & 1073741824) !== 0 && (Me & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Nm(), Ae.lanes |= e, _a |= e, n);
  }
  function Np(e, t, n, r) {
    return Bt(n, t) ? n : Ui.current !== null ? (e = Cc(e, n, r), Bt(e, t) || (lt = !0), e) : (Vn & 42) === 0 || (Vn & 1073741824) !== 0 && (Me & 261930) === 0 ? (lt = !0, e.memoizedState = n) : (e = Nm(), Ae.lanes |= e, _a |= e, t);
  }
  function wp(e, t, n, r, l) {
    var u = J.p;
    J.p = u !== 0 && 8 > u ? u : 8;
    var m = M.T, _ = {};
    M.T = _, zc(e, !1, t, n);
    try {
      var N = l(), D = M.S;
      if (D !== null && D(_, N), N !== null && typeof N == "object" && typeof N.then == "function") {
        var H = Wv(
          N,
          r
        );
        Or(
          e,
          t,
          H,
          Kt(e)
        );
      } else
        Or(
          e,
          t,
          r,
          Kt(e)
        );
    } catch (G) {
      Or(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: G },
        Kt()
      );
    } finally {
      J.p = u, m !== null && _.types !== null && (m.types = _.types), M.T = m;
    }
  }
  function ib() {
  }
  function Dc(e, t, n, r) {
    if (e.tag !== 5) throw Error(o(476));
    var l = jp(e).queue;
    wp(
      e,
      l,
      t,
      T,
      n === null ? ib : function() {
        return $p(e), n(r);
      }
    );
  }
  function jp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: T,
      baseState: T,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: T
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function $p(e) {
    var t = jp(e);
    t.next === null && (t = e.alternate.memoizedState), Or(
      e,
      t.next.queue,
      {},
      Kt()
    );
  }
  function Rc() {
    return bt(Jr);
  }
  function Mp() {
    return it().memoizedState;
  }
  function Tp() {
    return it().memoizedState;
  }
  function rb(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Kt();
          e = ha(n);
          var r = ga(t, e, n);
          r !== null && (Lt(r, t, n), wr(r, t, n)), t = { cache: cc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function sb(e, t, n) {
    var r = Kt();
    n = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fo(e) ? Cp(t, n) : (n = Wl(e, t, n, r), n !== null && (Lt(n, e, r), Dp(n, t, r)));
  }
  function Op(e, t, n) {
    var r = Kt();
    Or(e, t, n, r);
  }
  function Or(e, t, n, r) {
    var l = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (fo(e)) Cp(t, l);
    else {
      var u = e.alternate;
      if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null))
        try {
          var m = t.lastRenderedState, _ = u(m, n);
          if (l.hasEagerState = !0, l.eagerState = _, Bt(_, m))
            return Ks(e, t, l, 0), Ye === null && qs(), !1;
        } catch {
        } finally {
        }
      if (n = Wl(e, t, l, r), n !== null)
        return Lt(n, e, r), Dp(n, t, r), !0;
    }
    return !1;
  }
  function zc(e, t, n, r) {
    if (r = {
      lane: 2,
      revertLane: pu(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, fo(e)) {
      if (t) throw Error(o(479));
    } else
      t = Wl(
        e,
        n,
        r,
        2
      ), t !== null && Lt(t, e, 2);
  }
  function fo(e) {
    var t = e.alternate;
    return e === Ae || t !== null && t === Ae;
  }
  function Cp(e, t) {
    Vi = io = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Dp(e, t, n) {
    if ((n & 4194048) !== 0) {
      var r = t.lanes;
      r &= e.pendingLanes, n |= r, t.lanes = n, yt(e, n);
    }
  }
  var Cr = {
    readContext: bt,
    use: oo,
    useCallback: et,
    useContext: et,
    useEffect: et,
    useImperativeHandle: et,
    useLayoutEffect: et,
    useInsertionEffect: et,
    useMemo: et,
    useReducer: et,
    useRef: et,
    useState: et,
    useDebugValue: et,
    useDeferredValue: et,
    useTransition: et,
    useSyncExternalStore: et,
    useId: et,
    useHostTransitionStatus: et,
    useFormState: et,
    useActionState: et,
    useOptimistic: et,
    useMemoCache: et,
    useCacheRefresh: et
  };
  Cr.useEffectEvent = et;
  var Rp = {
    readContext: bt,
    use: oo,
    useCallback: function(e, t) {
      return $t().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: bt,
    useEffect: yp,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, co(
        4194308,
        4,
        _p.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return co(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      co(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = $t();
      t = t === void 0 ? null : t;
      var r = e();
      if (ni) {
        Tn(!0);
        try {
          e();
        } finally {
          Tn(!1);
        }
      }
      return n.memoizedState = [r, t], r;
    },
    useReducer: function(e, t, n) {
      var r = $t();
      if (n !== void 0) {
        var l = n(t);
        if (ni) {
          Tn(!0);
          try {
            n(t);
          } finally {
            Tn(!1);
          }
        }
      } else l = t;
      return r.memoizedState = r.baseState = l, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      }, r.queue = e, e = e.dispatch = sb.bind(
        null,
        Ae,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var t = $t();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = $c(e);
      var t = e.queue, n = Op.bind(null, Ae, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var n = $t();
      return Cc(n, e, t);
    },
    useTransition: function() {
      var e = $c(!1);
      return e = wp.bind(
        null,
        Ae,
        e.queue,
        !0,
        !1
      ), $t().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var r = Ae, l = $t();
      if (Oe) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), Ye === null)
          throw Error(o(349));
        (Me & 127) !== 0 || tp(r, t, n);
      }
      l.memoizedState = n;
      var u = { value: n, getSnapshot: t };
      return l.queue = u, yp(ap.bind(null, r, u, e), [
        e
      ]), r.flags |= 2048, ki(
        9,
        { destroy: void 0 },
        np.bind(
          null,
          r,
          u,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = $t(), t = Ye.identifierPrefix;
      if (Oe) {
        var n = En, r = _n;
        n = (r & ~(1 << 32 - wt(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = ro++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Pv++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Rc,
    useFormState: fp,
    useActionState: fp,
    useOptimistic: function(e) {
      var t = $t();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = zc.bind(
        null,
        Ae,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Nc,
    useCacheRefresh: function() {
      return $t().memoizedState = rb.bind(
        null,
        Ae
      );
    },
    useEffectEvent: function(e) {
      var t = $t(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Le & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Lc = {
    readContext: bt,
    use: oo,
    useCallback: xp,
    useContext: bt,
    useEffect: Tc,
    useImperativeHandle: Ep,
    useInsertionEffect: bp,
    useLayoutEffect: Sp,
    useMemo: Ap,
    useReducer: lo,
    useRef: gp,
    useState: function() {
      return lo(Bn);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var n = it();
      return Np(
        n,
        He.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = lo(Bn)[0], t = it().memoizedState;
      return [
        typeof e == "boolean" ? e : Tr(e),
        t
      ];
    },
    useSyncExternalStore: ep,
    useId: Mp,
    useHostTransitionStatus: Rc,
    useFormState: pp,
    useActionState: pp,
    useOptimistic: function(e, t) {
      var n = it();
      return sp(n, He, e, t);
    },
    useMemoCache: Nc,
    useCacheRefresh: Tp
  };
  Lc.useEffectEvent = vp;
  var zp = {
    readContext: bt,
    use: oo,
    useCallback: xp,
    useContext: bt,
    useEffect: Tc,
    useImperativeHandle: Ep,
    useInsertionEffect: bp,
    useLayoutEffect: Sp,
    useMemo: Ap,
    useReducer: jc,
    useRef: gp,
    useState: function() {
      return jc(Bn);
    },
    useDebugValue: Oc,
    useDeferredValue: function(e, t) {
      var n = it();
      return He === null ? Cc(n, e, t) : Np(
        n,
        He.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = jc(Bn)[0], t = it().memoizedState;
      return [
        typeof e == "boolean" ? e : Tr(e),
        t
      ];
    },
    useSyncExternalStore: ep,
    useId: Mp,
    useHostTransitionStatus: Rc,
    useFormState: hp,
    useActionState: hp,
    useOptimistic: function(e, t) {
      var n = it();
      return He !== null ? sp(n, He, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Nc,
    useCacheRefresh: Tp
  };
  zp.useEffectEvent = vp;
  function Uc(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : v({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Vc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var r = Kt(), l = ha(r);
      l.payload = t, n != null && (l.callback = n), t = ga(e, l, r), t !== null && (Lt(t, e, r), wr(t, e, r));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var r = Kt(), l = ha(r);
      l.tag = 1, l.payload = t, n != null && (l.callback = n), t = ga(e, l, r), t !== null && (Lt(t, e, r), wr(t, e, r));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Kt(), r = ha(n);
      r.tag = 2, t != null && (r.callback = t), t = ga(e, r, n), t !== null && (Lt(t, e, n), wr(t, e, n));
    }
  };
  function Lp(e, t, n, r, l, u, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, m) : t.prototype && t.prototype.isPureReactComponent ? !vr(n, r) || !vr(l, u) : !0;
  }
  function Up(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vc.enqueueReplaceState(t, t.state, null);
  }
  function ai(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var r in t)
        r !== "ref" && (n[r] = t[r]);
    }
    if (e = e.defaultProps) {
      n === t && (n = v({}, n));
      for (var l in e)
        n[l] === void 0 && (n[l] = e[l]);
    }
    return n;
  }
  function Vp(e) {
    Gs(e);
  }
  function Bp(e) {
    console.error(e);
  }
  function kp(e) {
    Gs(e);
  }
  function po(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Hp(e, t, n) {
    try {
      var r = e.onCaughtError;
      r(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function Bc(e, t, n) {
    return n = ha(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      po(e, t);
    }, n;
  }
  function Ip(e) {
    return e = ha(e), e.tag = 3, e;
  }
  function Gp(e, t, n, r) {
    var l = n.type.getDerivedStateFromError;
    if (typeof l == "function") {
      var u = r.value;
      e.payload = function() {
        return l(u);
      }, e.callback = function() {
        Hp(t, n, r);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      Hp(t, n, r), typeof l != "function" && (Ea === null ? Ea = /* @__PURE__ */ new Set([this]) : Ea.add(this));
      var _ = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: _ !== null ? _ : ""
      });
    });
  }
  function ob(e, t, n, r, l) {
    if (n.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (t = n.alternate, t !== null && Ci(
        t,
        n,
        l,
        !0
      ), n = Ht.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return an === null ? No() : n.alternate === null && tt === 0 && (tt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = l, r === Ps ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), uu(e, r, l)), !1;
          case 22:
            return n.flags |= 65536, r === Ps ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), uu(e, r, l)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return uu(e, r, l), No(), !1;
    }
    if (Oe)
      return t = Ht.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = l, r !== ic && (e = Error(o(422), { cause: r }), _r(Pt(e, n)))) : (r !== ic && (t = Error(o(423), {
        cause: r
      }), _r(
        Pt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, l &= -l, e.lanes |= l, r = Pt(r, n), l = Bc(
        e.stateNode,
        r,
        l
      ), hc(e, l), tt !== 4 && (tt = 2)), !1;
    var u = Error(o(520), { cause: r });
    if (u = Pt(u, n), kr === null ? kr = [u] : kr.push(u), tt !== 4 && (tt = 2), t === null) return !0;
    r = Pt(r, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = l & -l, n.lanes |= e, e = Bc(n.stateNode, r, e), hc(n, e), !1;
        case 1:
          if (t = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ea === null || !Ea.has(u))))
            return n.flags |= 65536, l &= -l, n.lanes |= l, l = Ip(l), Gp(
              l,
              e,
              n,
              r
            ), hc(n, l), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var kc = Error(o(461)), lt = !1;
  function St(e, t, n, r) {
    t.child = e === null ? Xf(t, null, n, r) : ti(
      t,
      e.child,
      n,
      r
    );
  }
  function qp(e, t, n, r, l) {
    n = n.render;
    var u = t.ref;
    if ("ref" in r) {
      var m = {};
      for (var _ in r)
        _ !== "ref" && (m[_] = r[_]);
    } else m = r;
    return Fa(t), r = _c(
      e,
      t,
      n,
      m,
      u,
      l
    ), _ = Ec(), e !== null && !lt ? (xc(e, t, l), kn(e, t, l)) : (Oe && _ && nc(t), t.flags |= 1, St(e, t, r, l), t.child);
  }
  function Kp(e, t, n, r, l) {
    if (e === null) {
      var u = n.type;
      return typeof u == "function" && !Pl(u) && u.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = u, Yp(
        e,
        t,
        u,
        r,
        l
      )) : (e = Xs(
        n.type,
        null,
        r,
        t,
        t.mode,
        l
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (u = e.child, !Jc(e, l)) {
      var m = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : vr, n(m, r) && e.ref === t.ref)
        return kn(e, t, l);
    }
    return t.flags |= 1, e = Rn(u, r), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Yp(e, t, n, r, l) {
    if (e !== null) {
      var u = e.memoizedProps;
      if (vr(u, r) && e.ref === t.ref)
        if (lt = !1, t.pendingProps = r = u, Jc(e, l))
          (e.flags & 131072) !== 0 && (lt = !0);
        else
          return t.lanes = e.lanes, kn(e, t, l);
    }
    return Hc(
      e,
      t,
      n,
      r,
      l
    );
  }
  function Xp(e, t, n, r) {
    var l = r.children, u = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, e !== null) {
          for (r = t.child = e.child, l = 0; r !== null; )
            l = l | r.lanes | r.childLanes, r = r.sibling;
          r = l & ~u;
        } else r = 0, t.child = null;
        return Jp(
          e,
          t,
          u,
          n,
          r
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Fs(
          t,
          u !== null ? u.cachePool : null
        ), u !== null ? Zf(t, u) : yc(), Ff(t);
      else
        return r = t.lanes = 536870912, Jp(
          e,
          t,
          u !== null ? u.baseLanes | n : n,
          n,
          r
        );
    } else
      u !== null ? (Fs(t, u.cachePool), Zf(t, u), va(), t.memoizedState = null) : (e !== null && Fs(t, null), yc(), va());
    return St(e, t, l, n), t.child;
  }
  function Dr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Jp(e, t, n, r, l) {
    var u = dc();
    return u = u === null ? null : { parent: st._currentValue, pool: u }, t.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, e !== null && Fs(t, null), yc(), Ff(t), e !== null && Ci(e, t, r, !0), t.childLanes = l, null;
  }
  function mo(e, t) {
    return t = go(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Qp(e, t, n) {
    return ti(t, e.child, null, n), e = mo(t, t.pendingProps), e.flags |= 2, It(t), t.memoizedState = null, e;
  }
  function lb(e, t, n) {
    var r = t.pendingProps, l = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Oe) {
        if (r.mode === "hidden")
          return e = mo(t, r), t.lanes = 536870912, Dr(null, e);
        if (bc(t), (e = Je) ? (e = oh(
          e,
          nn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ua !== null ? { id: _n, overflow: En } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Cf(e), n.return = t, t.child = n, vt = t, Je = null)) : e = null, e === null) throw fa(t);
        return t.lanes = 536870912, null;
      }
      return mo(t, r);
    }
    var u = e.memoizedState;
    if (u !== null) {
      var m = u.dehydrated;
      if (bc(t), l)
        if (t.flags & 256)
          t.flags &= -257, t = Qp(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (lt || Ci(e, t, n, !1), l = (n & e.childLanes) !== 0, lt || l) {
        if (r = Ye, r !== null && (m = Ha(r, n), m !== 0 && m !== u.retryLane))
          throw u.retryLane = m, Xa(e, m), Lt(r, e, m), kc;
        No(), t = Qp(
          e,
          t,
          n
        );
      } else
        e = u.treeContext, Je = rn(m.nextSibling), vt = t, Oe = !0, da = null, nn = !1, e !== null && zf(t, e), t = mo(t, r), t.flags |= 4096;
      return t;
    }
    return e = Rn(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ho(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Hc(e, t, n, r, l) {
    return Fa(t), n = _c(
      e,
      t,
      n,
      r,
      void 0,
      l
    ), r = Ec(), e !== null && !lt ? (xc(e, t, l), kn(e, t, l)) : (Oe && r && nc(t), t.flags |= 1, St(e, t, n, l), t.child);
  }
  function Zp(e, t, n, r, l, u) {
    return Fa(t), t.updateQueue = null, n = Pf(
      t,
      r,
      n,
      l
    ), Wf(e), r = Ec(), e !== null && !lt ? (xc(e, t, u), kn(e, t, u)) : (Oe && r && nc(t), t.flags |= 1, St(e, t, n, u), t.child);
  }
  function Fp(e, t, n, r, l) {
    if (Fa(t), t.stateNode === null) {
      var u = $i, m = n.contextType;
      typeof m == "object" && m !== null && (u = bt(m)), u = new n(r, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Vc, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = r, u.state = t.memoizedState, u.refs = {}, pc(t), m = n.contextType, u.context = typeof m == "object" && m !== null ? bt(m) : $i, u.state = t.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (Uc(
        t,
        n,
        m,
        r
      ), u.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (m = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), m !== u.state && Vc.enqueueReplaceState(u, u.state, null), $r(t, r, u, l), jr(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
    } else if (e === null) {
      u = t.stateNode;
      var _ = t.memoizedProps, N = ai(n, _);
      u.props = N;
      var D = u.context, H = n.contextType;
      m = $i, typeof H == "object" && H !== null && (m = bt(H));
      var G = n.getDerivedStateFromProps;
      H = typeof G == "function" || typeof u.getSnapshotBeforeUpdate == "function", _ = t.pendingProps !== _, H || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (_ || D !== m) && Up(
        t,
        u,
        r,
        m
      ), ma = !1;
      var z = t.memoizedState;
      u.state = z, $r(t, r, u, l), jr(), D = t.memoizedState, _ || z !== D || ma ? (typeof G == "function" && (Uc(
        t,
        n,
        G,
        r
      ), D = t.memoizedState), (N = ma || Lp(
        t,
        n,
        N,
        r,
        z,
        D,
        m
      )) ? (H || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = D), u.props = r, u.state = D, u.context = m, r = N) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
    } else {
      u = t.stateNode, mc(e, t), m = t.memoizedProps, H = ai(n, m), u.props = H, G = t.pendingProps, z = u.context, D = n.contextType, N = $i, typeof D == "object" && D !== null && (N = bt(D)), _ = n.getDerivedStateFromProps, (D = typeof _ == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (m !== G || z !== N) && Up(
        t,
        u,
        r,
        N
      ), ma = !1, z = t.memoizedState, u.state = z, $r(t, r, u, l), jr();
      var B = t.memoizedState;
      m !== G || z !== B || ma || e !== null && e.dependencies !== null && Qs(e.dependencies) ? (typeof _ == "function" && (Uc(
        t,
        n,
        _,
        r
      ), B = t.memoizedState), (H = ma || Lp(
        t,
        n,
        H,
        r,
        z,
        B,
        N
      ) || e !== null && e.dependencies !== null && Qs(e.dependencies)) ? (D || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(r, B, N), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        r,
        B,
        N
      )), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = B), u.props = r, u.state = B, u.context = N, r = H) : (typeof u.componentDidUpdate != "function" || m === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), r = !1);
    }
    return u = r, ho(e, t), r = (t.flags & 128) !== 0, u || r ? (u = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && r ? (t.child = ti(
      t,
      e.child,
      null,
      l
    ), t.child = ti(
      t,
      null,
      n,
      l
    )) : St(e, t, n, l), t.memoizedState = u.state, e = t.child) : e = kn(
      e,
      t,
      l
    ), e;
  }
  function Wp(e, t, n, r) {
    return Qa(), t.flags |= 256, St(e, t, n, r), t.child;
  }
  var Ic = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Gc(e) {
    return { baseLanes: e, cachePool: Hf() };
  }
  function qc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= qt), e;
  }
  function Pp(e, t, n) {
    var r = t.pendingProps, l = !1, u = (t.flags & 128) !== 0, m;
    if ((m = u) || (m = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0), m && (l = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Oe) {
        if (l ? ya(t) : va(), (e = Je) ? (e = oh(
          e,
          nn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: ua !== null ? { id: _n, overflow: En } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Cf(e), n.return = t, t.child = n, vt = t, Je = null)) : e = null, e === null) throw fa(t);
        return wu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var _ = r.children;
      return r = r.fallback, l ? (va(), l = t.mode, _ = go(
        { mode: "hidden", children: _ },
        l
      ), r = Ja(
        r,
        l,
        n,
        null
      ), _.return = t, r.return = t, _.sibling = r, t.child = _, r = t.child, r.memoizedState = Gc(n), r.childLanes = qc(
        e,
        m,
        n
      ), t.memoizedState = Ic, Dr(null, r)) : (ya(t), Kc(t, _));
    }
    var N = e.memoizedState;
    if (N !== null && (_ = N.dehydrated, _ !== null)) {
      if (u)
        t.flags & 256 ? (ya(t), t.flags &= -257, t = Yc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (va(), t.child = e.child, t.flags |= 128, t = null) : (va(), _ = r.fallback, l = t.mode, r = go(
          { mode: "visible", children: r.children },
          l
        ), _ = Ja(
          _,
          l,
          n,
          null
        ), _.flags |= 2, r.return = t, _.return = t, r.sibling = _, t.child = r, ti(
          t,
          e.child,
          null,
          n
        ), r = t.child, r.memoizedState = Gc(n), r.childLanes = qc(
          e,
          m,
          n
        ), t.memoizedState = Ic, t = Dr(null, r));
      else if (ya(t), wu(_)) {
        if (m = _.nextSibling && _.nextSibling.dataset, m) var D = m.dgst;
        m = D, r = Error(o(419)), r.stack = "", r.digest = m, _r({ value: r, source: null, stack: null }), t = Yc(
          e,
          t,
          n
        );
      } else if (lt || Ci(e, t, n, !1), m = (n & e.childLanes) !== 0, lt || m) {
        if (m = Ye, m !== null && (r = Ha(m, n), r !== 0 && r !== N.retryLane))
          throw N.retryLane = r, Xa(e, r), Lt(m, e, r), kc;
        Nu(_) || No(), t = Yc(
          e,
          t,
          n
        );
      } else
        Nu(_) ? (t.flags |= 192, t.child = e.child, t = null) : (e = N.treeContext, Je = rn(
          _.nextSibling
        ), vt = t, Oe = !0, da = null, nn = !1, e !== null && zf(t, e), t = Kc(
          t,
          r.children
        ), t.flags |= 4096);
      return t;
    }
    return l ? (va(), _ = r.fallback, l = t.mode, N = e.child, D = N.sibling, r = Rn(N, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = N.subtreeFlags & 65011712, D !== null ? _ = Rn(
      D,
      _
    ) : (_ = Ja(
      _,
      l,
      n,
      null
    ), _.flags |= 2), _.return = t, r.return = t, r.sibling = _, t.child = r, Dr(null, r), r = t.child, _ = e.child.memoizedState, _ === null ? _ = Gc(n) : (l = _.cachePool, l !== null ? (N = st._currentValue, l = l.parent !== N ? { parent: N, pool: N } : l) : l = Hf(), _ = {
      baseLanes: _.baseLanes | n,
      cachePool: l
    }), r.memoizedState = _, r.childLanes = qc(
      e,
      m,
      n
    ), t.memoizedState = Ic, Dr(e.child, r)) : (ya(t), n = e.child, e = n.sibling, n = Rn(n, {
      mode: "visible",
      children: r.children
    }), n.return = t, n.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function Kc(e, t) {
    return t = go(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function go(e, t) {
    return e = kt(22, e, null, t), e.lanes = 0, e;
  }
  function Yc(e, t, n) {
    return ti(t, e.child, null, n), e = Kc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function em(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), oc(e.return, t, n);
  }
  function Xc(e, t, n, r, l, u) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: n,
      tailMode: l,
      treeForkCount: u
    } : (m.isBackwards = t, m.rendering = null, m.renderingStartTime = 0, m.last = r, m.tail = n, m.tailMode = l, m.treeForkCount = u);
  }
  function tm(e, t, n) {
    var r = t.pendingProps, l = r.revealOrder, u = r.tail;
    r = r.children;
    var m = at.current, _ = (m & 2) !== 0;
    if (_ ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, F(at, m), St(e, t, r, n), r = Oe ? Sr : 0, !_ && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && em(e, n, t);
        else if (e.tag === 19)
          em(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          e = n.alternate, e !== null && ao(e) === null && (l = n), n = n.sibling;
        n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Xc(
          t,
          !1,
          l,
          n,
          u,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (e = l.alternate, e !== null && ao(e) === null) {
            t.child = l;
            break;
          }
          e = l.sibling, l.sibling = n, n = l, l = e;
        }
        Xc(
          t,
          !0,
          n,
          null,
          u,
          r
        );
        break;
      case "together":
        Xc(
          t,
          !1,
          null,
          null,
          void 0,
          r
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function kn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), _a |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Ci(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(o(153));
    if (t.child !== null) {
      for (e = t.child, n = Rn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Rn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Jc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Qs(e)));
  }
  function cb(e, t, n) {
    switch (t.tag) {
      case 3:
        We(t, t.stateNode.containerInfo), pa(t, st, e.memoizedState.cache), Qa();
        break;
      case 27:
      case 5:
        vn(t);
        break;
      case 4:
        We(t, t.stateNode.containerInfo);
        break;
      case 10:
        pa(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, bc(t), null;
        break;
      case 13:
        var r = t.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (ya(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Pp(e, t, n) : (ya(t), e = kn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        ya(t);
        break;
      case 19:
        var l = (e.flags & 128) !== 0;
        if (r = (n & t.childLanes) !== 0, r || (Ci(
          e,
          t,
          n,
          !1
        ), r = (n & t.childLanes) !== 0), l) {
          if (r)
            return tm(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), F(at, at.current), r) break;
        return null;
      case 22:
        return t.lanes = 0, Xp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        pa(t, st, e.memoizedState.cache);
    }
    return kn(e, t, n);
  }
  function nm(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        lt = !0;
      else {
        if (!Jc(e, n) && (t.flags & 128) === 0)
          return lt = !1, cb(
            e,
            t,
            n
          );
        lt = (e.flags & 131072) !== 0;
      }
    else
      lt = !1, Oe && (t.flags & 1048576) !== 0 && Rf(t, Sr, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var r = t.pendingProps;
          if (e = Pa(t.elementType), t.type = e, typeof e == "function")
            Pl(e) ? (r = ai(e, r), t.tag = 1, t = Fp(
              null,
              t,
              e,
              r,
              n
            )) : (t.tag = 0, t = Hc(
              null,
              t,
              e,
              r,
              n
            ));
          else {
            if (e != null) {
              var l = e.$$typeof;
              if (l === Z) {
                t.tag = 11, t = qp(
                  null,
                  t,
                  e,
                  r,
                  n
                );
                break e;
              } else if (l === V) {
                t.tag = 14, t = Kp(
                  null,
                  t,
                  e,
                  r,
                  n
                );
                break e;
              }
            }
            throw t = ae(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return Hc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return r = t.type, l = ai(
          r,
          t.pendingProps
        ), Fp(
          e,
          t,
          r,
          l,
          n
        );
      case 3:
        e: {
          if (We(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          r = t.pendingProps;
          var u = t.memoizedState;
          l = u.element, mc(e, t), $r(t, r, null, n);
          var m = t.memoizedState;
          if (r = m.cache, pa(t, st, r), r !== u.cache && lc(
            t,
            [st],
            n,
            !0
          ), jr(), r = m.element, u.isDehydrated)
            if (u = {
              element: r,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
              t = Wp(
                e,
                t,
                r,
                n
              );
              break e;
            } else if (r !== l) {
              l = Pt(
                Error(o(424)),
                t
              ), _r(l), t = Wp(
                e,
                t,
                r,
                n
              );
              break e;
            } else {
              switch (e = t.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Je = rn(e.firstChild), vt = t, Oe = !0, da = null, nn = !0, n = Xf(
                t,
                null,
                r,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Qa(), r === l) {
              t = kn(
                e,
                t,
                n
              );
              break e;
            }
            St(e, t, r, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return ho(e, t), e === null ? (n = ph(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Oe || (n = t.type, e = t.pendingProps, r = Co(
          pe.current
        ).createElement(n), r[xe] = t, r[Xe] = e, _t(r, n, e), ft(r), t.stateNode = r) : t.memoizedState = ph(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return vn(t), e === null && Oe && (r = t.stateNode = uh(
          t.type,
          t.pendingProps,
          pe.current
        ), vt = t, nn = !0, l = Je, wa(t.type) ? (ju = l, Je = rn(r.firstChild)) : Je = l), St(
          e,
          t,
          t.pendingProps.children,
          n
        ), ho(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Oe && ((l = r = Je) && (r = Bb(
          r,
          t.type,
          t.pendingProps,
          nn
        ), r !== null ? (t.stateNode = r, vt = t, Je = rn(r.firstChild), nn = !1, l = !0) : l = !1), l || fa(t)), vn(t), l = t.type, u = t.pendingProps, m = e !== null ? e.memoizedProps : null, r = u.children, Eu(l, u) ? r = null : m !== null && Eu(l, m) && (t.flags |= 32), t.memoizedState !== null && (l = _c(
          e,
          t,
          eb,
          null,
          null,
          n
        ), Jr._currentValue = l), ho(e, t), St(e, t, r, n), t.child;
      case 6:
        return e === null && Oe && ((e = n = Je) && (n = kb(
          n,
          t.pendingProps,
          nn
        ), n !== null ? (t.stateNode = n, vt = t, Je = null, e = !0) : e = !1), e || fa(t)), null;
      case 13:
        return Pp(e, t, n);
      case 4:
        return We(
          t,
          t.stateNode.containerInfo
        ), r = t.pendingProps, e === null ? t.child = ti(
          t,
          null,
          r,
          n
        ) : St(e, t, r, n), t.child;
      case 11:
        return qp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return St(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return St(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return St(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return r = t.pendingProps, pa(t, t.type, r.value), St(e, t, r.children, n), t.child;
      case 9:
        return l = t.type._context, r = t.pendingProps.children, Fa(t), l = bt(l), r = r(l), t.flags |= 1, St(e, t, r, n), t.child;
      case 14:
        return Kp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Yp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return tm(e, t, n);
      case 31:
        return lb(e, t, n);
      case 22:
        return Xp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Fa(t), r = bt(st), e === null ? (l = dc(), l === null && (l = Ye, u = cc(), l.pooledCache = u, u.refCount++, u !== null && (l.pooledCacheLanes |= n), l = u), t.memoizedState = { parent: r, cache: l }, pc(t), pa(t, st, l)) : ((e.lanes & n) !== 0 && (mc(e, t), $r(t, null, null, n), jr()), l = e.memoizedState, u = t.memoizedState, l.parent !== r ? (l = { parent: r, cache: r }, t.memoizedState = l, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = l), pa(t, st, r)) : (r = u.cache, pa(t, st, r), r !== l.cache && lc(
          t,
          [st],
          n,
          !0
        ))), St(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Hn(e) {
    e.flags |= 4;
  }
  function Qc(e, t, n, r, l) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (l & 335544128) === l)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Mm()) e.flags |= 8192;
        else
          throw ei = Ps, fc;
    } else e.flags &= -16777217;
  }
  function am(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !vh(t))
      if (Mm()) e.flags |= 8192;
      else
        throw ei = Ps, fc;
  }
  function yo(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? lr() : 536870912, e.lanes |= t, qi |= t);
  }
  function Rr(e, t) {
    if (!Oe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function Qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
    if (t)
      for (var l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 65011712, r |= l.flags & 65011712, l.return = e, l = l.sibling;
    else
      for (l = e.child; l !== null; )
        n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t;
  }
  function ub(e, t, n) {
    var r = t.pendingProps;
    switch (ac(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qe(t), null;
      case 1:
        return Qe(t), null;
      case 3:
        return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Un(st), we(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Oi(t) ? Hn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, rc())), Qe(t), null;
      case 26:
        var l = t.type, u = t.memoizedState;
        return e === null ? (Hn(t), u !== null ? (Qe(t), am(t, u)) : (Qe(t), Qc(
          t,
          l,
          null,
          r,
          n
        ))) : u ? u !== e.memoizedState ? (Hn(t), Qe(t), am(t, u)) : (Qe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== r && Hn(t), Qe(t), Qc(
          t,
          l,
          e,
          r,
          n
        )), null;
      case 27:
        if (cn(t), n = pe.current, l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && Hn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Qe(t), null;
          }
          e = W.current, Oi(t) ? Lf(t) : (e = uh(l, r, n), t.stateNode = e, Hn(t));
        }
        return Qe(t), null;
      case 5:
        if (cn(t), l = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== r && Hn(t);
        else {
          if (!r) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Qe(t), null;
          }
          if (u = W.current, Oi(t))
            Lf(t);
          else {
            var m = Co(
              pe.current
            );
            switch (u) {
              case 1:
                u = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  l
                );
                break;
              case 2:
                u = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  l
                );
                break;
              default:
                switch (l) {
                  case "svg":
                    u = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      l
                    );
                    break;
                  case "math":
                    u = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l
                    );
                    break;
                  case "script":
                    u = m.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof r.is == "string" ? m.createElement("select", {
                      is: r.is
                    }) : m.createElement("select"), r.multiple ? u.multiple = !0 : r.size && (u.size = r.size);
                    break;
                  default:
                    u = typeof r.is == "string" ? m.createElement(l, { is: r.is }) : m.createElement(l);
                }
            }
            u[xe] = t, u[Xe] = r;
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                u.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t)
                  break e;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            t.stateNode = u;
            e: switch (_t(u, l, r), l) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
            r && Hn(t);
          }
        }
        return Qe(t), Qc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== r && Hn(t);
        else {
          if (typeof r != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = pe.current, Oi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, r = null, l = vt, l !== null)
              switch (l.tag) {
                case 27:
                case 5:
                  r = l.memoizedProps;
              }
            e[xe] = t, e = !!(e.nodeValue === n || r !== null && r.suppressHydrationWarning === !0 || Pm(e.nodeValue, n)), e || fa(t, !0);
          } else
            e = Co(e).createTextNode(
              r
            ), e[xe] = t, t.stateNode = e;
        }
        return Qe(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (r = Oi(t), n !== null) {
            if (e === null) {
              if (!r) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[xe] = t;
            } else
              Qa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Qe(t), e = !1;
          } else
            n = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Qe(t), null;
      case 13:
        if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (l = Oi(t), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!l) throw Error(o(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(o(317));
              l[xe] = t;
            } else
              Qa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Qe(t), l = !1;
          } else
            l = rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), l = !0;
          if (!l)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return It(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, l = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (l = r.alternate.memoizedState.cachePool.pool), u = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (u = r.memoizedState.cachePool.pool), u !== l && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), yo(t, t.updateQueue), Qe(t), null);
      case 4:
        return we(), e === null && yu(t.stateNode.containerInfo), Qe(t), null;
      case 10:
        return Un(t.type), Qe(t), null;
      case 19:
        if (U(at), r = t.memoizedState, r === null) return Qe(t), null;
        if (l = (t.flags & 128) !== 0, u = r.rendering, u === null)
          if (l) Rr(r, !1);
          else {
            if (tt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (u = ao(e), u !== null) {
                  for (t.flags |= 128, Rr(r, !1), e = u.updateQueue, t.updateQueue = e, yo(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Of(n, e), n = n.sibling;
                  return F(
                    at,
                    at.current & 1 | 2
                  ), Oe && zn(t, r.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Nt() > Eo && (t.flags |= 128, l = !0, Rr(r, !1), t.lanes = 4194304);
          }
        else {
          if (!l)
            if (e = ao(u), e !== null) {
              if (t.flags |= 128, l = !0, e = e.updateQueue, t.updateQueue = e, yo(t, e), Rr(r, !0), r.tail === null && r.tailMode === "hidden" && !u.alternate && !Oe)
                return Qe(t), null;
            } else
              2 * Nt() - r.renderingStartTime > Eo && n !== 536870912 && (t.flags |= 128, l = !0, Rr(r, !1), t.lanes = 4194304);
          r.isBackwards ? (u.sibling = t.child, t.child = u) : (e = r.last, e !== null ? e.sibling = u : t.child = u, r.last = u);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Nt(), e.sibling = null, n = at.current, F(
          at,
          l ? n & 1 | 2 : n & 1
        ), Oe && zn(t, r.treeForkCount), e) : (Qe(t), null);
      case 22:
      case 23:
        return It(t), vc(), r = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (t.flags |= 8192) : r && (t.flags |= 8192), r ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Qe(t), n = t.updateQueue, n !== null && yo(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && U(Wa), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Un(st), Qe(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function db(e, t) {
    switch (ac(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return Un(st), we(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return cn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (It(t), t.alternate === null)
            throw Error(o(340));
          Qa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (It(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Qa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return U(at), null;
      case 4:
        return we(), null;
      case 10:
        return Un(t.type), null;
      case 22:
      case 23:
        return It(t), vc(), e !== null && U(Wa), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return Un(st), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function im(e, t) {
    switch (ac(t), t.tag) {
      case 3:
        Un(st), we();
        break;
      case 26:
      case 27:
      case 5:
        cn(t);
        break;
      case 4:
        we();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        U(at);
        break;
      case 10:
        Un(t.type);
        break;
      case 22:
      case 23:
        It(t), vc(), e !== null && U(Wa);
        break;
      case 24:
        Un(st);
    }
  }
  function zr(e, t) {
    try {
      var n = t.updateQueue, r = n !== null ? n.lastEffect : null;
      if (r !== null) {
        var l = r.next;
        n = l;
        do {
          if ((n.tag & e) === e) {
            r = void 0;
            var u = n.create, m = n.inst;
            r = u(), m.destroy = r;
          }
          n = n.next;
        } while (n !== l);
      }
    } catch (_) {
      Be(t, t.return, _);
    }
  }
  function ba(e, t, n) {
    try {
      var r = t.updateQueue, l = r !== null ? r.lastEffect : null;
      if (l !== null) {
        var u = l.next;
        r = u;
        do {
          if ((r.tag & e) === e) {
            var m = r.inst, _ = m.destroy;
            if (_ !== void 0) {
              m.destroy = void 0, l = t;
              var N = n, D = _;
              try {
                D();
              } catch (H) {
                Be(
                  l,
                  N,
                  H
                );
              }
            }
          }
          r = r.next;
        } while (r !== u);
      }
    } catch (H) {
      Be(t, t.return, H);
    }
  }
  function rm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        Qf(t, n);
      } catch (r) {
        Be(e, e.return, r);
      }
    }
  }
  function sm(e, t, n) {
    n.props = ai(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (r) {
      Be(e, t, r);
    }
  }
  function Lr(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
      }
    } catch (l) {
      Be(e, t, l);
    }
  }
  function xn(e, t) {
    var n = e.ref, r = e.refCleanup;
    if (n !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (l) {
          Be(e, t, l);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (l) {
          Be(e, t, l);
        }
      else n.current = null;
  }
  function om(e) {
    var t = e.type, n = e.memoizedProps, r = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && r.focus();
          break e;
        case "img":
          n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
      }
    } catch (l) {
      Be(e, e.return, l);
    }
  }
  function Zc(e, t, n) {
    try {
      var r = e.stateNode;
      Db(r, e.type, n, t), r[Xe] = t;
    } catch (l) {
      Be(e, e.return, l);
    }
  }
  function lm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && wa(e.type) || e.tag === 4;
  }
  function Fc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || lm(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && wa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Wc(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Cn));
    else if (r !== 4 && (r === 27 && wa(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Wc(e, t, n), e = e.sibling; e !== null; )
        Wc(e, t, n), e = e.sibling;
  }
  function vo(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (r === 27 && wa(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (vo(e, t, n), e = e.sibling; e !== null; )
        vo(e, t, n), e = e.sibling;
  }
  function cm(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var r = e.type, l = t.attributes; l.length; )
        t.removeAttributeNode(l[0]);
      _t(t, r, n), t[xe] = e, t[Xe] = n;
    } catch (u) {
      Be(e, e.return, u);
    }
  }
  var In = !1, ct = !1, Pc = !1, um = typeof WeakSet == "function" ? WeakSet : Set, pt = null;
  function fb(e, t) {
    if (e = e.containerInfo, Su = Bo, e = Ef(e), Yl(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var r = n.getSelection && n.getSelection();
          if (r && r.rangeCount !== 0) {
            n = r.anchorNode;
            var l = r.anchorOffset, u = r.focusNode;
            r = r.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break e;
            }
            var m = 0, _ = -1, N = -1, D = 0, H = 0, G = e, z = null;
            t: for (; ; ) {
              for (var B; G !== n || l !== 0 && G.nodeType !== 3 || (_ = m + l), G !== u || r !== 0 && G.nodeType !== 3 || (N = m + r), G.nodeType === 3 && (m += G.nodeValue.length), (B = G.firstChild) !== null; )
                z = G, G = B;
              for (; ; ) {
                if (G === e) break t;
                if (z === n && ++D === l && (_ = m), z === u && ++H === r && (N = m), (B = G.nextSibling) !== null) break;
                G = z, z = G.parentNode;
              }
              G = B;
            }
            n = _ === -1 || N === -1 ? null : { start: _, end: N };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (_u = { focusedElem: e, selectionRange: n }, Bo = !1, pt = t; pt !== null; )
      if (t = pt, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, pt = e;
      else
        for (; pt !== null; ) {
          switch (t = pt, u = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  l = e[n], l.ref.impl = l.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && u !== null) {
                e = void 0, n = t, l = u.memoizedProps, u = u.memoizedState, r = n.stateNode;
                try {
                  var re = ai(
                    n.type,
                    l
                  );
                  e = r.getSnapshotBeforeUpdate(
                    re,
                    u
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (he) {
                  Be(
                    n,
                    n.return,
                    he
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Au(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Au(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, pt = e;
            break;
          }
          pt = t.return;
        }
  }
  function dm(e, t, n) {
    var r = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        qn(e, n), r & 4 && zr(5, n);
        break;
      case 1:
        if (qn(e, n), r & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              Be(n, n.return, m);
            }
          else {
            var l = ai(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                l,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              Be(
                n,
                n.return,
                m
              );
            }
          }
        r & 64 && rm(n), r & 512 && Lr(n, n.return);
        break;
      case 3:
        if (qn(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            Qf(e, t);
          } catch (m) {
            Be(n, n.return, m);
          }
        }
        break;
      case 27:
        t === null && r & 4 && cm(n);
      case 26:
      case 5:
        qn(e, n), t === null && r & 4 && om(n), r & 512 && Lr(n, n.return);
        break;
      case 12:
        qn(e, n);
        break;
      case 31:
        qn(e, n), r & 4 && mm(e, n);
        break;
      case 13:
        qn(e, n), r & 4 && hm(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _b.bind(
          null,
          n
        ), Hb(e, n))));
        break;
      case 22:
        if (r = n.memoizedState !== null || In, !r) {
          t = t !== null && t.memoizedState !== null || ct, l = In;
          var u = ct;
          In = r, (ct = t) && !u ? Kn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : qn(e, n), In = l, ct = u;
        }
        break;
      case 30:
        break;
      default:
        qn(e, n);
    }
  }
  function fm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, fm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Ml(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Fe = null, Ct = !1;
  function Gn(e, t, n) {
    for (n = n.child; n !== null; )
      pm(e, t, n), n = n.sibling;
  }
  function pm(e, t, n) {
    if (gt && typeof gt.onCommitFiberUnmount == "function")
      try {
        gt.onCommitFiberUnmount(Mn, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        ct || xn(n, t), Gn(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        ct || xn(n, t);
        var r = Fe, l = Ct;
        wa(n.type) && (Fe = n.stateNode, Ct = !1), Gn(
          e,
          t,
          n
        ), Kr(n.stateNode), Fe = r, Ct = l;
        break;
      case 5:
        ct || xn(n, t);
      case 6:
        if (r = Fe, l = Ct, Fe = null, Gn(
          e,
          t,
          n
        ), Fe = r, Ct = l, Fe !== null)
          if (Ct)
            try {
              (Fe.nodeType === 9 ? Fe.body : Fe.nodeName === "HTML" ? Fe.ownerDocument.body : Fe).removeChild(n.stateNode);
            } catch (u) {
              Be(
                n,
                t,
                u
              );
            }
          else
            try {
              Fe.removeChild(n.stateNode);
            } catch (u) {
              Be(
                n,
                t,
                u
              );
            }
        break;
      case 18:
        Fe !== null && (Ct ? (e = Fe, rh(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Wi(e)) : rh(Fe, n.stateNode));
        break;
      case 4:
        r = Fe, l = Ct, Fe = n.stateNode.containerInfo, Ct = !0, Gn(
          e,
          t,
          n
        ), Fe = r, Ct = l;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ba(2, n, t), ct || ba(4, n, t), Gn(
          e,
          t,
          n
        );
        break;
      case 1:
        ct || (xn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && sm(
          n,
          t,
          r
        )), Gn(
          e,
          t,
          n
        );
        break;
      case 21:
        Gn(
          e,
          t,
          n
        );
        break;
      case 22:
        ct = (r = ct) || n.memoizedState !== null, Gn(
          e,
          t,
          n
        ), ct = r;
        break;
      default:
        Gn(
          e,
          t,
          n
        );
    }
  }
  function mm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Wi(e);
      } catch (n) {
        Be(t, t.return, n);
      }
    }
  }
  function hm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Wi(e);
      } catch (n) {
        Be(t, t.return, n);
      }
  }
  function pb(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new um()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new um()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function bo(e, t) {
    var n = pb(e);
    t.forEach(function(r) {
      if (!n.has(r)) {
        n.add(r);
        var l = Eb.bind(null, e, r);
        r.then(l, l);
      }
    });
  }
  function Dt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var r = 0; r < n.length; r++) {
        var l = n[r], u = e, m = t, _ = m;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (wa(_.type)) {
                Fe = _.stateNode, Ct = !1;
                break e;
              }
              break;
            case 5:
              Fe = _.stateNode, Ct = !1;
              break e;
            case 3:
            case 4:
              Fe = _.stateNode.containerInfo, Ct = !0;
              break e;
          }
          _ = _.return;
        }
        if (Fe === null) throw Error(o(160));
        pm(u, m, l), Fe = null, Ct = !1, u = l.alternate, u !== null && (u.return = null), l.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        gm(t, e), t = t.sibling;
  }
  var pn = null;
  function gm(e, t) {
    var n = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Dt(t, e), Rt(e), r & 4 && (ba(3, e, e.return), zr(3, e), ba(5, e, e.return));
        break;
      case 1:
        Dt(t, e), Rt(e), r & 512 && (ct || n === null || xn(n, n.return)), r & 64 && In && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
        break;
      case 26:
        var l = pn;
        if (Dt(t, e), Rt(e), r & 512 && (ct || n === null || xn(n, n.return)), r & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (r = e.memoizedState, n === null)
            if (r === null)
              if (e.stateNode === null) {
                e: {
                  r = e.type, n = e.memoizedProps, l = l.ownerDocument || l;
                  t: switch (r) {
                    case "title":
                      u = l.getElementsByTagName("title")[0], (!u || u[cr] || u[xe] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = l.createElement(r), l.head.insertBefore(
                        u,
                        l.querySelector("head > title")
                      )), _t(u, r, n), u[xe] = e, ft(u), r = u;
                      break e;
                    case "link":
                      var m = gh(
                        "link",
                        "href",
                        l
                      ).get(r + (n.href || ""));
                      if (m) {
                        for (var _ = 0; _ < m.length; _++)
                          if (u = m[_], u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            m.splice(_, 1);
                            break t;
                          }
                      }
                      u = l.createElement(r), _t(u, r, n), l.head.appendChild(u);
                      break;
                    case "meta":
                      if (m = gh(
                        "meta",
                        "content",
                        l
                      ).get(r + (n.content || ""))) {
                        for (_ = 0; _ < m.length; _++)
                          if (u = m[_], u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            m.splice(_, 1);
                            break t;
                          }
                      }
                      u = l.createElement(r), _t(u, r, n), l.head.appendChild(u);
                      break;
                    default:
                      throw Error(o(468, r));
                  }
                  u[xe] = e, ft(u), r = u;
                }
                e.stateNode = r;
              } else
                yh(
                  l,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = hh(
                l,
                r,
                e.memoizedProps
              );
          else
            u !== r ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, r === null ? yh(
              l,
              e.type,
              e.stateNode
            ) : hh(
              l,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Zc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Dt(t, e), Rt(e), r & 512 && (ct || n === null || xn(n, n.return)), n !== null && r & 4 && Zc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Dt(t, e), Rt(e), r & 512 && (ct || n === null || xn(n, n.return)), e.flags & 32) {
          l = e.stateNode;
          try {
            _i(l, "");
          } catch (re) {
            Be(e, e.return, re);
          }
        }
        r & 4 && e.stateNode != null && (l = e.memoizedProps, Zc(
          e,
          l,
          n !== null ? n.memoizedProps : l
        )), r & 1024 && (Pc = !0);
        break;
      case 6:
        if (Dt(t, e), Rt(e), r & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          r = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = r;
          } catch (re) {
            Be(e, e.return, re);
          }
        }
        break;
      case 3:
        if (zo = null, l = pn, pn = Do(t.containerInfo), Dt(t, e), pn = l, Rt(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Wi(t.containerInfo);
          } catch (re) {
            Be(e, e.return, re);
          }
        Pc && (Pc = !1, ym(e));
        break;
      case 4:
        r = pn, pn = Do(
          e.stateNode.containerInfo
        ), Dt(t, e), Rt(e), pn = r;
        break;
      case 12:
        Dt(t, e), Rt(e);
        break;
      case 31:
        Dt(t, e), Rt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bo(e, r)));
        break;
      case 13:
        Dt(t, e), Rt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (_o = Nt()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bo(e, r)));
        break;
      case 22:
        l = e.memoizedState !== null;
        var N = n !== null && n.memoizedState !== null, D = In, H = ct;
        if (In = D || l, ct = H || N, Dt(t, e), ct = H, In = D, Rt(e), r & 8192)
          e: for (t = e.stateNode, t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (n === null || N || In || ct || ii(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                N = n = t;
                try {
                  if (u = N.stateNode, l)
                    m = u.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    _ = N.stateNode;
                    var G = N.memoizedProps.style, z = G != null && G.hasOwnProperty("display") ? G.display : null;
                    _.style.display = z == null || typeof z == "boolean" ? "" : ("" + z).trim();
                  }
                } catch (re) {
                  Be(N, N.return, re);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                N = t;
                try {
                  N.stateNode.nodeValue = l ? "" : N.memoizedProps;
                } catch (re) {
                  Be(N, N.return, re);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                N = t;
                try {
                  var B = N.stateNode;
                  l ? sh(B, !0) : sh(N.stateNode, !1);
                } catch (re) {
                  Be(N, N.return, re);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              n === t && (n = null), t = t.return;
            }
            n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
          }
        r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, bo(e, n))));
        break;
      case 19:
        Dt(t, e), Rt(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, bo(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Dt(t, e), Rt(e);
    }
  }
  function Rt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, r = e.return; r !== null; ) {
          if (lm(r)) {
            n = r;
            break;
          }
          r = r.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var l = n.stateNode, u = Fc(e);
            vo(e, u, l);
            break;
          case 5:
            var m = n.stateNode;
            n.flags & 32 && (_i(m, ""), n.flags &= -33);
            var _ = Fc(e);
            vo(e, _, m);
            break;
          case 3:
          case 4:
            var N = n.stateNode.containerInfo, D = Fc(e);
            Wc(
              e,
              D,
              N
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (H) {
        Be(e, e.return, H);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function ym(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        ym(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function qn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        dm(e, t.alternate, t), t = t.sibling;
  }
  function ii(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ba(4, t, t.return), ii(t);
          break;
        case 1:
          xn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && sm(
            t,
            t.return,
            n
          ), ii(t);
          break;
        case 27:
          Kr(t.stateNode);
        case 26:
        case 5:
          xn(t, t.return), ii(t);
          break;
        case 22:
          t.memoizedState === null && ii(t);
          break;
        case 30:
          ii(t);
          break;
        default:
          ii(t);
      }
      e = e.sibling;
    }
  }
  function Kn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var r = t.alternate, l = e, u = t, m = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          Kn(
            l,
            u,
            n
          ), zr(4, u);
          break;
        case 1:
          if (Kn(
            l,
            u,
            n
          ), r = u, l = r.stateNode, typeof l.componentDidMount == "function")
            try {
              l.componentDidMount();
            } catch (D) {
              Be(r, r.return, D);
            }
          if (r = u, l = r.updateQueue, l !== null) {
            var _ = r.stateNode;
            try {
              var N = l.shared.hiddenCallbacks;
              if (N !== null)
                for (l.shared.hiddenCallbacks = null, l = 0; l < N.length; l++)
                  Jf(N[l], _);
            } catch (D) {
              Be(r, r.return, D);
            }
          }
          n && m & 64 && rm(u), Lr(u, u.return);
          break;
        case 27:
          cm(u);
        case 26:
        case 5:
          Kn(
            l,
            u,
            n
          ), n && r === null && m & 4 && om(u), Lr(u, u.return);
          break;
        case 12:
          Kn(
            l,
            u,
            n
          );
          break;
        case 31:
          Kn(
            l,
            u,
            n
          ), n && m & 4 && mm(l, u);
          break;
        case 13:
          Kn(
            l,
            u,
            n
          ), n && m & 4 && hm(l, u);
          break;
        case 22:
          u.memoizedState === null && Kn(
            l,
            u,
            n
          ), Lr(u, u.return);
          break;
        case 30:
          break;
        default:
          Kn(
            l,
            u,
            n
          );
      }
      t = t.sibling;
    }
  }
  function eu(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Er(n));
  }
  function tu(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Er(e));
  }
  function mn(e, t, n, r) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        vm(
          e,
          t,
          n,
          r
        ), t = t.sibling;
  }
  function vm(e, t, n, r) {
    var l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        mn(
          e,
          t,
          n,
          r
        ), l & 2048 && zr(9, t);
        break;
      case 1:
        mn(
          e,
          t,
          n,
          r
        );
        break;
      case 3:
        mn(
          e,
          t,
          n,
          r
        ), l & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Er(e)));
        break;
      case 12:
        if (l & 2048) {
          mn(
            e,
            t,
            n,
            r
          ), e = t.stateNode;
          try {
            var u = t.memoizedProps, m = u.id, _ = u.onPostCommit;
            typeof _ == "function" && _(
              m,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (N) {
            Be(t, t.return, N);
          }
        } else
          mn(
            e,
            t,
            n,
            r
          );
        break;
      case 31:
        mn(
          e,
          t,
          n,
          r
        );
        break;
      case 13:
        mn(
          e,
          t,
          n,
          r
        );
        break;
      case 23:
        break;
      case 22:
        u = t.stateNode, m = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? mn(
          e,
          t,
          n,
          r
        ) : Ur(e, t) : u._visibility & 2 ? mn(
          e,
          t,
          n,
          r
        ) : (u._visibility |= 2, Hi(
          e,
          t,
          n,
          r,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), l & 2048 && eu(m, t);
        break;
      case 24:
        mn(
          e,
          t,
          n,
          r
        ), l & 2048 && tu(t.alternate, t);
        break;
      default:
        mn(
          e,
          t,
          n,
          r
        );
    }
  }
  function Hi(e, t, n, r, l) {
    for (l = l && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var u = e, m = t, _ = n, N = r, D = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Hi(
            u,
            m,
            _,
            N,
            l
          ), zr(8, m);
          break;
        case 23:
          break;
        case 22:
          var H = m.stateNode;
          m.memoizedState !== null ? H._visibility & 2 ? Hi(
            u,
            m,
            _,
            N,
            l
          ) : Ur(
            u,
            m
          ) : (H._visibility |= 2, Hi(
            u,
            m,
            _,
            N,
            l
          )), l && D & 2048 && eu(
            m.alternate,
            m
          );
          break;
        case 24:
          Hi(
            u,
            m,
            _,
            N,
            l
          ), l && D & 2048 && tu(m.alternate, m);
          break;
        default:
          Hi(
            u,
            m,
            _,
            N,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Ur(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, r = t, l = r.flags;
        switch (r.tag) {
          case 22:
            Ur(n, r), l & 2048 && eu(
              r.alternate,
              r
            );
            break;
          case 24:
            Ur(n, r), l & 2048 && tu(r.alternate, r);
            break;
          default:
            Ur(n, r);
        }
        t = t.sibling;
      }
  }
  var Vr = 8192;
  function Ii(e, t, n) {
    if (e.subtreeFlags & Vr)
      for (e = e.child; e !== null; )
        bm(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function bm(e, t, n) {
    switch (e.tag) {
      case 26:
        Ii(
          e,
          t,
          n
        ), e.flags & Vr && e.memoizedState !== null && Pb(
          n,
          pn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ii(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var r = pn;
        pn = Do(e.stateNode.containerInfo), Ii(
          e,
          t,
          n
        ), pn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Vr, Vr = 16777216, Ii(
          e,
          t,
          n
        ), Vr = r) : Ii(
          e,
          t,
          n
        ));
        break;
      default:
        Ii(
          e,
          t,
          n
        );
    }
  }
  function Sm(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function Br(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          pt = r, Em(
            r,
            e
          );
        }
      Sm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        _m(e), e = e.sibling;
  }
  function _m(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Br(e), e.flags & 2048 && ba(9, e, e.return);
        break;
      case 3:
        Br(e);
        break;
      case 12:
        Br(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, So(e)) : Br(e);
        break;
      default:
        Br(e);
    }
  }
  function So(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          pt = r, Em(
            r,
            e
          );
        }
      Sm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ba(8, t, t.return), So(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, So(t));
          break;
        default:
          So(t);
      }
      e = e.sibling;
    }
  }
  function Em(e, t) {
    for (; pt !== null; ) {
      var n = pt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ba(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var r = n.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          Er(n.memoizedState.cache);
      }
      if (r = n.child, r !== null) r.return = n, pt = r;
      else
        e: for (n = e; pt !== null; ) {
          r = pt;
          var l = r.sibling, u = r.return;
          if (fm(r), r === n) {
            pt = null;
            break e;
          }
          if (l !== null) {
            l.return = u, pt = l;
            break e;
          }
          pt = u;
        }
    }
  }
  var mb = {
    getCacheForType: function(e) {
      var t = bt(st), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return bt(st).controller.signal;
    }
  }, hb = typeof WeakMap == "function" ? WeakMap : Map, Le = 0, Ye = null, je = null, Me = 0, Ve = 0, Gt = null, Sa = !1, Gi = !1, nu = !1, Yn = 0, tt = 0, _a = 0, ri = 0, au = 0, qt = 0, qi = 0, kr = null, zt = null, iu = !1, _o = 0, xm = 0, Eo = 1 / 0, xo = null, Ea = null, dt = 0, xa = null, Ki = null, Xn = 0, ru = 0, su = null, Am = null, Hr = 0, ou = null;
  function Kt() {
    return (Le & 2) !== 0 && Me !== 0 ? Me & -Me : M.T !== null ? pu() : Vt();
  }
  function Nm() {
    if (qt === 0)
      if ((Me & 536870912) === 0 || Oe) {
        var e = jt;
        jt <<= 1, (jt & 3932160) === 0 && (jt = 262144), qt = e;
      } else qt = 536870912;
    return e = Ht.current, e !== null && (e.flags |= 32), qt;
  }
  function Lt(e, t, n) {
    (e === Ye && (Ve === 2 || Ve === 9) || e.cancelPendingCommit !== null) && (Yi(e, 0), Aa(
      e,
      Me,
      qt,
      !1
    )), la(e, n), ((Le & 2) === 0 || e !== Ye) && (e === Ye && ((Le & 2) === 0 && (ri |= n), tt === 4 && Aa(
      e,
      Me,
      qt,
      !1
    )), An(e));
  }
  function wm(e, t, n) {
    if ((Le & 6) !== 0) throw Error(o(327));
    var r = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || oa(e, t), l = r ? vb(e, t) : cu(e, t, !0), u = r;
    do {
      if (l === 0) {
        Gi && !r && Aa(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, u && !gb(n)) {
          l = cu(e, t, !1), u = !1;
          continue;
        }
        if (l === 2) {
          if (u = t, e.errorRecoveryDisabledLanes & u)
            var m = 0;
          else
            m = e.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            t = m;
            e: {
              var _ = e;
              l = kr;
              var N = _.current.memoizedState.isDehydrated;
              if (N && (Yi(_, m).flags |= 256), m = cu(
                _,
                m,
                !1
              ), m !== 2) {
                if (nu && !N) {
                  _.errorRecoveryDisabledLanes |= u, ri |= u, l = 4;
                  break e;
                }
                u = zt, zt = l, u !== null && (zt === null ? zt = u : zt.push.apply(
                  zt,
                  u
                ));
              }
              l = m;
            }
            if (u = !1, l !== 2) continue;
          }
        }
        if (l === 1) {
          Yi(e, 0), Aa(e, t, 0, !0);
          break;
        }
        e: {
          switch (r = e, u = l, u) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Aa(
                r,
                t,
                qt,
                !Sa
              );
              break e;
            case 2:
              zt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (l = _o + 300 - Nt(), 10 < l)) {
            if (Aa(
              r,
              t,
              qt,
              !Sa
            ), Xt(r, 0, !0) !== 0) break e;
            Xn = t, r.timeoutHandle = ah(
              jm.bind(
                null,
                r,
                n,
                zt,
                xo,
                iu,
                t,
                qt,
                ri,
                qi,
                Sa,
                u,
                "Throttled",
                -0,
                0
              ),
              l
            );
            break e;
          }
          jm(
            r,
            n,
            zt,
            xo,
            iu,
            t,
            qt,
            ri,
            qi,
            Sa,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    An(e);
  }
  function jm(e, t, n, r, l, u, m, _, N, D, H, G, z, B) {
    if (e.timeoutHandle = -1, G = t.subtreeFlags, G & 8192 || (G & 16785408) === 16785408) {
      G = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Cn
      }, bm(
        t,
        u,
        G
      );
      var re = (u & 62914560) === u ? _o - Nt() : (u & 4194048) === u ? xm - Nt() : 0;
      if (re = e0(
        G,
        re
      ), re !== null) {
        Xn = u, e.cancelPendingCommit = re(
          zm.bind(
            null,
            e,
            t,
            u,
            n,
            r,
            l,
            m,
            _,
            N,
            H,
            G,
            null,
            z,
            B
          )
        ), Aa(e, u, m, !D);
        return;
      }
    }
    zm(
      e,
      t,
      u,
      n,
      r,
      l,
      m,
      _,
      N
    );
  }
  function gb(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var r = 0; r < n.length; r++) {
          var l = n[r], u = l.getSnapshot;
          l = l.value;
          try {
            if (!Bt(u(), l)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Aa(e, t, n, r) {
    t &= ~au, t &= ~ri, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
    for (var l = t; 0 < l; ) {
      var u = 31 - wt(l), m = 1 << u;
      r[u] = -1, l &= ~m;
    }
    n !== 0 && be(e, n, t);
  }
  function Ao() {
    return (Le & 6) === 0 ? (Ir(0), !1) : !0;
  }
  function lu() {
    if (je !== null) {
      if (Ve === 0)
        var e = je.return;
      else
        e = je, Ln = Za = null, Ac(e), Li = null, Ar = 0, e = je;
      for (; e !== null; )
        im(e.alternate, e), e = e.return;
      je = null;
    }
  }
  function Yi(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Lb(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Xn = 0, lu(), Ye = e, je = n = Rn(e.current, null), Me = t, Ve = 0, Gt = null, Sa = !1, Gi = oa(e, t), nu = !1, qi = qt = au = ri = _a = tt = 0, zt = kr = null, iu = !1, (t & 8) !== 0 && (t |= t & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= t; 0 < r; ) {
        var l = 31 - wt(r), u = 1 << l;
        t |= e[l], r &= ~u;
      }
    return Yn = t, qs(), n;
  }
  function $m(e, t) {
    Ae = null, M.H = Cr, t === zi || t === Ws ? (t = qf(), Ve = 3) : t === fc ? (t = qf(), Ve = 4) : Ve = t === kc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, je === null && (tt = 1, po(
      e,
      Pt(t, e.current)
    ));
  }
  function Mm() {
    var e = Ht.current;
    return e === null ? !0 : (Me & 4194048) === Me ? an === null : (Me & 62914560) === Me || (Me & 536870912) !== 0 ? e === an : !1;
  }
  function Tm() {
    var e = M.H;
    return M.H = Cr, e === null ? Cr : e;
  }
  function Om() {
    var e = M.A;
    return M.A = mb, e;
  }
  function No() {
    tt = 4, Sa || (Me & 4194048) !== Me && Ht.current !== null || (Gi = !0), (_a & 134217727) === 0 && (ri & 134217727) === 0 || Ye === null || Aa(
      Ye,
      Me,
      qt,
      !1
    );
  }
  function cu(e, t, n) {
    var r = Le;
    Le |= 2;
    var l = Tm(), u = Om();
    (Ye !== e || Me !== t) && (xo = null, Yi(e, t)), t = !1;
    var m = tt;
    e: do
      try {
        if (Ve !== 0 && je !== null) {
          var _ = je, N = Gt;
          switch (Ve) {
            case 8:
              lu(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Ht.current === null && (t = !0);
              var D = Ve;
              if (Ve = 0, Gt = null, Xi(e, _, N, D), n && Gi) {
                m = 0;
                break e;
              }
              break;
            default:
              D = Ve, Ve = 0, Gt = null, Xi(e, _, N, D);
          }
        }
        yb(), m = tt;
        break;
      } catch (H) {
        $m(e, H);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ln = Za = null, Le = r, M.H = l, M.A = u, je === null && (Ye = null, Me = 0, qs()), m;
  }
  function yb() {
    for (; je !== null; ) Cm(je);
  }
  function vb(e, t) {
    var n = Le;
    Le |= 2;
    var r = Tm(), l = Om();
    Ye !== e || Me !== t ? (xo = null, Eo = Nt() + 500, Yi(e, t)) : Gi = oa(
      e,
      t
    );
    e: do
      try {
        if (Ve !== 0 && je !== null) {
          t = je;
          var u = Gt;
          t: switch (Ve) {
            case 1:
              Ve = 0, Gt = null, Xi(e, t, u, 1);
              break;
            case 2:
            case 9:
              if (If(u)) {
                Ve = 0, Gt = null, Dm(t);
                break;
              }
              t = function() {
                Ve !== 2 && Ve !== 9 || Ye !== e || (Ve = 7), An(e);
              }, u.then(t, t);
              break e;
            case 3:
              Ve = 7;
              break e;
            case 4:
              Ve = 5;
              break e;
            case 7:
              If(u) ? (Ve = 0, Gt = null, Dm(t)) : (Ve = 0, Gt = null, Xi(e, t, u, 7));
              break;
            case 5:
              var m = null;
              switch (je.tag) {
                case 26:
                  m = je.memoizedState;
                case 5:
                case 27:
                  var _ = je;
                  if (m ? vh(m) : _.stateNode.complete) {
                    Ve = 0, Gt = null;
                    var N = _.sibling;
                    if (N !== null) je = N;
                    else {
                      var D = _.return;
                      D !== null ? (je = D, wo(D)) : je = null;
                    }
                    break t;
                  }
              }
              Ve = 0, Gt = null, Xi(e, t, u, 5);
              break;
            case 6:
              Ve = 0, Gt = null, Xi(e, t, u, 6);
              break;
            case 8:
              lu(), tt = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        bb();
        break;
      } catch (H) {
        $m(e, H);
      }
    while (!0);
    return Ln = Za = null, M.H = r, M.A = l, Le = n, je !== null ? 0 : (Ye = null, Me = 0, qs(), tt);
  }
  function bb() {
    for (; je !== null && !fi(); )
      Cm(je);
  }
  function Cm(e) {
    var t = nm(e.alternate, e, Yn);
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : je = t;
  }
  function Dm(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Zp(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Me
        );
        break;
      case 11:
        t = Zp(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Me
        );
        break;
      case 5:
        Ac(t);
      default:
        im(n, t), t = je = Of(t, Yn), t = nm(n, t, Yn);
    }
    e.memoizedProps = e.pendingProps, t === null ? wo(e) : je = t;
  }
  function Xi(e, t, n, r) {
    Ln = Za = null, Ac(t), Li = null, Ar = 0;
    var l = t.return;
    try {
      if (ob(
        e,
        l,
        t,
        n,
        Me
      )) {
        tt = 1, po(
          e,
          Pt(n, e.current)
        ), je = null;
        return;
      }
    } catch (u) {
      if (l !== null) throw je = l, u;
      tt = 1, po(
        e,
        Pt(n, e.current)
      ), je = null;
      return;
    }
    t.flags & 32768 ? (Oe || r === 1 ? e = !0 : Gi || (Me & 536870912) !== 0 ? e = !1 : (Sa = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ht.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Rm(t, e)) : wo(t);
  }
  function wo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Rm(
          t,
          Sa
        );
        return;
      }
      e = t.return;
      var n = ub(
        t.alternate,
        t,
        Yn
      );
      if (n !== null) {
        je = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        je = t;
        return;
      }
      je = t = e;
    } while (t !== null);
    tt === 0 && (tt = 5);
  }
  function Rm(e, t) {
    do {
      var n = db(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, je = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        je = e;
        return;
      }
      je = e = n;
    } while (e !== null);
    tt = 6, je = null;
  }
  function zm(e, t, n, r, l, u, m, _, N) {
    e.cancelPendingCommit = null;
    do
      jo();
    while (dt !== 0);
    if ((Le & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (u = t.lanes | t.childLanes, u |= Fl, k(
        e,
        n,
        u,
        m,
        _,
        N
      ), e === Ye && (je = Ye = null, Me = 0), Ki = t, xa = e, Xn = n, ru = u, su = l, Am = r, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, xb(ka, function() {
        return km(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || r) {
        r = M.T, M.T = null, l = J.p, J.p = 2, m = Le, Le |= 4;
        try {
          fb(e, t, n);
        } finally {
          Le = m, J.p = l, M.T = r;
        }
      }
      dt = 1, Lm(), Um(), Vm();
    }
  }
  function Lm() {
    if (dt === 1) {
      dt = 0;
      var e = xa, t = Ki, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = M.T, M.T = null;
        var r = J.p;
        J.p = 2;
        var l = Le;
        Le |= 4;
        try {
          gm(t, e);
          var u = _u, m = Ef(e.containerInfo), _ = u.focusedElem, N = u.selectionRange;
          if (m !== _ && _ && _.ownerDocument && _f(
            _.ownerDocument.documentElement,
            _
          )) {
            if (N !== null && Yl(_)) {
              var D = N.start, H = N.end;
              if (H === void 0 && (H = D), "selectionStart" in _)
                _.selectionStart = D, _.selectionEnd = Math.min(
                  H,
                  _.value.length
                );
              else {
                var G = _.ownerDocument || document, z = G && G.defaultView || window;
                if (z.getSelection) {
                  var B = z.getSelection(), re = _.textContent.length, he = Math.min(N.start, re), Ge = N.end === void 0 ? he : Math.min(N.end, re);
                  !B.extend && he > Ge && (m = Ge, Ge = he, he = m);
                  var $ = Sf(
                    _,
                    he
                  ), w = Sf(
                    _,
                    Ge
                  );
                  if ($ && w && (B.rangeCount !== 1 || B.anchorNode !== $.node || B.anchorOffset !== $.offset || B.focusNode !== w.node || B.focusOffset !== w.offset)) {
                    var C = G.createRange();
                    C.setStart($.node, $.offset), B.removeAllRanges(), he > Ge ? (B.addRange(C), B.extend(w.node, w.offset)) : (C.setEnd(w.node, w.offset), B.addRange(C));
                  }
                }
              }
            }
            for (G = [], B = _; B = B.parentNode; )
              B.nodeType === 1 && G.push({
                element: B,
                left: B.scrollLeft,
                top: B.scrollTop
              });
            for (typeof _.focus == "function" && _.focus(), _ = 0; _ < G.length; _++) {
              var I = G[_];
              I.element.scrollLeft = I.left, I.element.scrollTop = I.top;
            }
          }
          Bo = !!Su, _u = Su = null;
        } finally {
          Le = l, J.p = r, M.T = n;
        }
      }
      e.current = t, dt = 2;
    }
  }
  function Um() {
    if (dt === 2) {
      dt = 0;
      var e = xa, t = Ki, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = M.T, M.T = null;
        var r = J.p;
        J.p = 2;
        var l = Le;
        Le |= 4;
        try {
          dm(e, t.alternate, t);
        } finally {
          Le = l, J.p = r, M.T = n;
        }
      }
      dt = 3;
    }
  }
  function Vm() {
    if (dt === 4 || dt === 3) {
      dt = 0, ia();
      var e = xa, t = Ki, n = Xn, r = Am;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? dt = 5 : (dt = 0, Ki = xa = null, Bm(e, e.pendingLanes));
      var l = e.pendingLanes;
      if (l === 0 && (Ea = null), Sn(n), t = t.stateNode, gt && typeof gt.onCommitFiberRoot == "function")
        try {
          gt.onCommitFiberRoot(
            Mn,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        t = M.T, l = J.p, J.p = 2, M.T = null;
        try {
          for (var u = e.onRecoverableError, m = 0; m < r.length; m++) {
            var _ = r[m];
            u(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          M.T = t, J.p = l;
        }
      }
      (Xn & 3) !== 0 && jo(), An(e), l = e.pendingLanes, (n & 261930) !== 0 && (l & 42) !== 0 ? e === ou ? Hr++ : (Hr = 0, ou = e) : Hr = 0, Ir(0);
    }
  }
  function Bm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Er(t)));
  }
  function jo() {
    return Lm(), Um(), Vm(), km();
  }
  function km() {
    if (dt !== 5) return !1;
    var e = xa, t = ru;
    ru = 0;
    var n = Sn(Xn), r = M.T, l = J.p;
    try {
      J.p = 32 > n ? 32 : n, M.T = null, n = su, su = null;
      var u = xa, m = Xn;
      if (dt = 0, Ki = xa = null, Xn = 0, (Le & 6) !== 0) throw Error(o(331));
      var _ = Le;
      if (Le |= 4, _m(u.current), vm(
        u,
        u.current,
        m,
        n
      ), Le = _, Ir(0, !1), gt && typeof gt.onPostCommitFiberRoot == "function")
        try {
          gt.onPostCommitFiberRoot(Mn, u);
        } catch {
        }
      return !0;
    } finally {
      J.p = l, M.T = r, Bm(e, t);
    }
  }
  function Hm(e, t, n) {
    t = Pt(n, t), t = Bc(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (la(e, 2), An(e));
  }
  function Be(e, t, n) {
    if (e.tag === 3)
      Hm(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Hm(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var r = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ea === null || !Ea.has(r))) {
            e = Pt(n, e), n = Ip(2), r = ga(t, n, 2), r !== null && (Gp(
              n,
              r,
              t,
              e
            ), la(r, 2), An(r));
            break;
          }
        }
        t = t.return;
      }
  }
  function uu(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new hb();
      var l = /* @__PURE__ */ new Set();
      r.set(t, l);
    } else
      l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
    l.has(n) || (nu = !0, l.add(n), e = Sb.bind(null, e, t, n), t.then(e, e));
  }
  function Sb(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ye === e && (Me & n) === n && (tt === 4 || tt === 3 && (Me & 62914560) === Me && 300 > Nt() - _o ? (Le & 2) === 0 && Yi(e, 0) : au |= n, qi === Me && (qi = 0)), An(e);
  }
  function Im(e, t) {
    t === 0 && (t = lr()), e = Xa(e, t), e !== null && (la(e, t), An(e));
  }
  function _b(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), Im(e, n);
  }
  function Eb(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    r !== null && r.delete(t), Im(e, n);
  }
  function xb(e, t) {
    return un(e, t);
  }
  var $o = null, Ji = null, du = !1, Mo = !1, fu = !1, Na = 0;
  function An(e) {
    e !== Ji && e.next === null && (Ji === null ? $o = Ji = e : Ji = Ji.next = e), Mo = !0, du || (du = !0, Nb());
  }
  function Ir(e, t) {
    if (!fu && Mo) {
      fu = !0;
      do
        for (var n = !1, r = $o; r !== null; ) {
          if (e !== 0) {
            var l = r.pendingLanes;
            if (l === 0) var u = 0;
            else {
              var m = r.suspendedLanes, _ = r.pingedLanes;
              u = (1 << 31 - wt(42 | e) + 1) - 1, u &= l & ~(m & ~_), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, Ym(r, u));
          } else
            u = Me, u = Xt(
              r,
              r === Ye ? u : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (u & 3) === 0 || oa(r, u) || (n = !0, Ym(r, u));
          r = r.next;
        }
      while (n);
      fu = !1;
    }
  }
  function Ab() {
    Gm();
  }
  function Gm() {
    Mo = du = !1;
    var e = 0;
    Na !== 0 && zb() && (e = Na);
    for (var t = Nt(), n = null, r = $o; r !== null; ) {
      var l = r.next, u = qm(r, t);
      u === 0 ? (r.next = null, n === null ? $o = l : n.next = l, l === null && (Ji = n)) : (n = r, (e !== 0 || (u & 3) !== 0) && (Mo = !0)), r = l;
    }
    dt !== 0 && dt !== 5 || Ir(e), Na !== 0 && (Na = 0);
  }
  function qm(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u; ) {
      var m = 31 - wt(u), _ = 1 << m, N = l[m];
      N === -1 ? ((_ & n) === 0 || (_ & r) !== 0) && (l[m] = Cs(_, t)) : N <= t && (e.expiredLanes |= _), u &= ~_;
    }
    if (t = Ye, n = Me, n = Xt(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, n === 0 || e === t && (Ve === 2 || Ve === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Pe(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || oa(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (r !== null && Pe(r), Sn(n)) {
        case 2:
        case 8:
          n = or;
          break;
        case 32:
          n = ka;
          break;
        case 268435456:
          n = Ms;
          break;
        default:
          n = ka;
      }
      return r = Km.bind(null, e), n = un(n, r), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return r !== null && r !== null && Pe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Km(e, t) {
    if (dt !== 0 && dt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (jo() && e.callbackNode !== n)
      return null;
    var r = Me;
    return r = Xt(
      e,
      e === Ye ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (wm(e, r, t), qm(e, Nt()), e.callbackNode != null && e.callbackNode === n ? Km.bind(null, e) : null);
  }
  function Ym(e, t) {
    if (jo()) return null;
    wm(e, t, !0);
  }
  function Nb() {
    Ub(function() {
      (Le & 6) !== 0 ? un(
        $s,
        Ab
      ) : Gm();
    });
  }
  function pu() {
    if (Na === 0) {
      var e = Di;
      e === 0 && (e = sa, sa <<= 1, (sa & 261888) === 0 && (sa = 256)), Na = e;
    }
    return Na;
  }
  function Xm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ls("" + e);
  }
  function Jm(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function wb(e, t, n, r, l) {
    if (t === "submit" && n && n.stateNode === l) {
      var u = Xm(
        (l[Xe] || null).action
      ), m = r.submitter;
      m && (t = (t = m[Xe] || null) ? Xm(t.formAction) : m.getAttribute("formAction"), t !== null && (u = t, m = null));
      var _ = new ks(
        "action",
        "action",
        null,
        r,
        l
      );
      e.push({
        event: _,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (Na !== 0) {
                  var N = m ? Jm(l, m) : new FormData(l);
                  Dc(
                    n,
                    {
                      pending: !0,
                      data: N,
                      method: l.method,
                      action: u
                    },
                    null,
                    N
                  );
                }
              } else
                typeof u == "function" && (_.preventDefault(), N = m ? Jm(l, m) : new FormData(l), Dc(
                  n,
                  {
                    pending: !0,
                    data: N,
                    method: l.method,
                    action: u
                  },
                  u,
                  N
                ));
            },
            currentTarget: l
          }
        ]
      });
    }
  }
  for (var mu = 0; mu < Zl.length; mu++) {
    var hu = Zl[mu], jb = hu.toLowerCase(), $b = hu[0].toUpperCase() + hu.slice(1);
    fn(
      jb,
      "on" + $b
    );
  }
  fn(Nf, "onAnimationEnd"), fn(wf, "onAnimationIteration"), fn(jf, "onAnimationStart"), fn("dblclick", "onDoubleClick"), fn("focusin", "onFocus"), fn("focusout", "onBlur"), fn(qv, "onTransitionRun"), fn(Kv, "onTransitionStart"), fn(Yv, "onTransitionCancel"), fn($f, "onTransitionEnd"), bi("onMouseEnter", ["mouseout", "mouseover"]), bi("onMouseLeave", ["mouseout", "mouseover"]), bi("onPointerEnter", ["pointerout", "pointerover"]), bi("onPointerLeave", ["pointerout", "pointerover"]), Ga(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ga(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ga("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ga(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ga(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ga(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Gr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Mb = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gr)
  );
  function Qm(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var r = e[n], l = r.event;
      r = r.listeners;
      e: {
        var u = void 0;
        if (t)
          for (var m = r.length - 1; 0 <= m; m--) {
            var _ = r[m], N = _.instance, D = _.currentTarget;
            if (_ = _.listener, N !== u && l.isPropagationStopped())
              break e;
            u = _, l.currentTarget = D;
            try {
              u(l);
            } catch (H) {
              Gs(H);
            }
            l.currentTarget = null, u = N;
          }
        else
          for (m = 0; m < r.length; m++) {
            if (_ = r[m], N = _.instance, D = _.currentTarget, _ = _.listener, N !== u && l.isPropagationStopped())
              break e;
            u = _, l.currentTarget = D;
            try {
              u(l);
            } catch (H) {
              Gs(H);
            }
            l.currentTarget = null, u = N;
          }
      }
    }
  }
  function $e(e, t) {
    var n = t[Ia];
    n === void 0 && (n = t[Ia] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    n.has(r) || (Zm(t, e, 2, !1), n.add(r));
  }
  function gu(e, t, n) {
    var r = 0;
    t && (r |= 4), Zm(
      n,
      e,
      r,
      t
    );
  }
  var To = "_reactListening" + Math.random().toString(36).slice(2);
  function yu(e) {
    if (!e[To]) {
      e[To] = !0, Id.forEach(function(n) {
        n !== "selectionchange" && (Mb.has(n) || gu(n, !1, e), gu(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[To] || (t[To] = !0, gu("selectionchange", !1, t));
    }
  }
  function Zm(e, t, n, r) {
    switch (Nh(t)) {
      case 2:
        var l = a0;
        break;
      case 8:
        l = i0;
        break;
      default:
        l = Cu;
    }
    n = l.bind(
      null,
      t,
      n,
      e
    ), l = void 0, !Ul || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
      passive: l
    }) : e.addEventListener(t, n, !1);
  }
  function vu(e, t, n, r, l) {
    var u = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
      e: for (; ; ) {
        if (r === null) return;
        var m = r.tag;
        if (m === 3 || m === 4) {
          var _ = r.stateNode.containerInfo;
          if (_ === l) break;
          if (m === 4)
            for (m = r.return; m !== null; ) {
              var N = m.tag;
              if ((N === 3 || N === 4) && m.stateNode.containerInfo === l)
                return;
              m = m.return;
            }
          for (; _ !== null; ) {
            if (m = gi(_), m === null) return;
            if (N = m.tag, N === 5 || N === 6 || N === 26 || N === 27) {
              r = u = m;
              continue e;
            }
            _ = _.parentNode;
          }
        }
        r = r.return;
      }
    ef(function() {
      var D = u, H = zl(n), G = [];
      e: {
        var z = Mf.get(e);
        if (z !== void 0) {
          var B = ks, re = e;
          switch (e) {
            case "keypress":
              if (Vs(n) === 0) break e;
            case "keydown":
            case "keyup":
              B = Ev;
              break;
            case "focusin":
              re = "focus", B = Hl;
              break;
            case "focusout":
              re = "blur", B = Hl;
              break;
            case "beforeblur":
            case "afterblur":
              B = Hl;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              B = af;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              B = uv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              B = Nv;
              break;
            case Nf:
            case wf:
            case jf:
              B = pv;
              break;
            case $f:
              B = jv;
              break;
            case "scroll":
            case "scrollend":
              B = lv;
              break;
            case "wheel":
              B = Mv;
              break;
            case "copy":
            case "cut":
            case "paste":
              B = hv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              B = sf;
              break;
            case "toggle":
            case "beforetoggle":
              B = Ov;
          }
          var he = (t & 4) !== 0, Ge = !he && (e === "scroll" || e === "scrollend"), $ = he ? z !== null ? z + "Capture" : null : z;
          he = [];
          for (var w = D, C; w !== null; ) {
            var I = w;
            if (C = I.stateNode, I = I.tag, I !== 5 && I !== 26 && I !== 27 || C === null || $ === null || (I = dr(w, $), I != null && he.push(
              qr(w, I, C)
            )), Ge) break;
            w = w.return;
          }
          0 < he.length && (z = new B(
            z,
            re,
            null,
            n,
            H
          ), G.push({ event: z, listeners: he }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (z = e === "mouseover" || e === "pointerover", B = e === "mouseout" || e === "pointerout", z && n !== Rl && (re = n.relatedTarget || n.fromElement) && (gi(re) || re[Qt]))
            break e;
          if ((B || z) && (z = H.window === H ? H : (z = H.ownerDocument) ? z.defaultView || z.parentWindow : window, B ? (re = n.relatedTarget || n.toElement, B = D, re = re ? gi(re) : null, re !== null && (Ge = d(re), he = re.tag, re !== Ge || he !== 5 && he !== 27 && he !== 6) && (re = null)) : (B = null, re = D), B !== re)) {
            if (he = af, I = "onMouseLeave", $ = "onMouseEnter", w = "mouse", (e === "pointerout" || e === "pointerover") && (he = sf, I = "onPointerLeave", $ = "onPointerEnter", w = "pointer"), Ge = B == null ? z : ur(B), C = re == null ? z : ur(re), z = new he(
              I,
              w + "leave",
              B,
              n,
              H
            ), z.target = Ge, z.relatedTarget = C, I = null, gi(H) === D && (he = new he(
              $,
              w + "enter",
              re,
              n,
              H
            ), he.target = C, he.relatedTarget = Ge, I = he), Ge = I, B && re)
              t: {
                for (he = Tb, $ = B, w = re, C = 0, I = $; I; I = he(I))
                  C++;
                I = 0;
                for (var me = w; me; me = he(me))
                  I++;
                for (; 0 < C - I; )
                  $ = he($), C--;
                for (; 0 < I - C; )
                  w = he(w), I--;
                for (; C--; ) {
                  if ($ === w || w !== null && $ === w.alternate) {
                    he = $;
                    break t;
                  }
                  $ = he($), w = he(w);
                }
                he = null;
              }
            else he = null;
            B !== null && Fm(
              G,
              z,
              B,
              he,
              !1
            ), re !== null && Ge !== null && Fm(
              G,
              Ge,
              re,
              he,
              !0
            );
          }
        }
        e: {
          if (z = D ? ur(D) : window, B = z.nodeName && z.nodeName.toLowerCase(), B === "select" || B === "input" && z.type === "file")
            var Re = mf;
          else if (ff(z))
            if (hf)
              Re = Hv;
            else {
              Re = Bv;
              var le = Vv;
            }
          else
            B = z.nodeName, !B || B.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? D && Dl(D.elementType) && (Re = mf) : Re = kv;
          if (Re && (Re = Re(e, D))) {
            pf(
              G,
              Re,
              n,
              H
            );
            break e;
          }
          le && le(e, z, D), e === "focusout" && D && z.type === "number" && D.memoizedProps.value != null && Cl(z, "number", z.value);
        }
        switch (le = D ? ur(D) : window, e) {
          case "focusin":
            (ff(le) || le.contentEditable === "true") && (Ni = le, Xl = D, br = null);
            break;
          case "focusout":
            br = Xl = Ni = null;
            break;
          case "mousedown":
            Jl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jl = !1, xf(G, n, H);
            break;
          case "selectionchange":
            if (Gv) break;
          case "keydown":
          case "keyup":
            xf(G, n, H);
        }
        var Ne;
        if (Gl)
          e: {
            switch (e) {
              case "compositionstart":
                var Te = "onCompositionStart";
                break e;
              case "compositionend":
                Te = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Te = "onCompositionUpdate";
                break e;
            }
            Te = void 0;
          }
        else
          Ai ? uf(e, n) && (Te = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (Te = "onCompositionStart");
        Te && (of && n.locale !== "ko" && (Ai || Te !== "onCompositionStart" ? Te === "onCompositionEnd" && Ai && (Ne = tf()) : (ca = H, Vl = "value" in ca ? ca.value : ca.textContent, Ai = !0)), le = Oo(D, Te), 0 < le.length && (Te = new rf(
          Te,
          e,
          null,
          n,
          H
        ), G.push({ event: Te, listeners: le }), Ne ? Te.data = Ne : (Ne = df(n), Ne !== null && (Te.data = Ne)))), (Ne = Dv ? Rv(e, n) : zv(e, n)) && (Te = Oo(D, "onBeforeInput"), 0 < Te.length && (le = new rf(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          H
        ), G.push({
          event: le,
          listeners: Te
        }), le.data = Ne)), wb(
          G,
          e,
          D,
          n,
          H
        );
      }
      Qm(G, t);
    });
  }
  function qr(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Oo(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
      var l = e, u = l.stateNode;
      if (l = l.tag, l !== 5 && l !== 26 && l !== 27 || u === null || (l = dr(e, n), l != null && r.unshift(
        qr(e, l, u)
      ), l = dr(e, t), l != null && r.push(
        qr(e, l, u)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function Tb(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Fm(e, t, n, r, l) {
    for (var u = t._reactName, m = []; n !== null && n !== r; ) {
      var _ = n, N = _.alternate, D = _.stateNode;
      if (_ = _.tag, N !== null && N === r) break;
      _ !== 5 && _ !== 26 && _ !== 27 || D === null || (N = D, l ? (D = dr(n, u), D != null && m.unshift(
        qr(n, D, N)
      )) : l || (D = dr(n, u), D != null && m.push(
        qr(n, D, N)
      ))), n = n.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var Ob = /\r\n?/g, Cb = /\u0000|\uFFFD/g;
  function Wm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Ob, `
`).replace(Cb, "");
  }
  function Pm(e, t) {
    return t = Wm(t), Wm(e) === t;
  }
  function Ie(e, t, n, r, l, u) {
    switch (n) {
      case "children":
        typeof r == "string" ? t === "body" || t === "textarea" && r === "" || _i(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && _i(e, "" + r);
        break;
      case "className":
        Rs(e, "class", r);
        break;
      case "tabIndex":
        Rs(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Rs(e, n, r);
        break;
      case "style":
        Wd(e, r, u);
        break;
      case "data":
        if (t !== "object") {
          Rs(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(n);
          break;
        }
        r = Ls("" + r), e.setAttribute(n, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (n === "formAction" ? (t !== "input" && Ie(e, t, "name", l.name, l, null), Ie(
            e,
            t,
            "formEncType",
            l.formEncType,
            l,
            null
          ), Ie(
            e,
            t,
            "formMethod",
            l.formMethod,
            l,
            null
          ), Ie(
            e,
            t,
            "formTarget",
            l.formTarget,
            l,
            null
          )) : (Ie(e, t, "encType", l.encType, l, null), Ie(e, t, "method", l.method, l, null), Ie(e, t, "target", l.target, l, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(n);
          break;
        }
        r = Ls("" + r), e.setAttribute(n, r);
        break;
      case "onClick":
        r != null && (e.onclick = Cn);
        break;
      case "onScroll":
        r != null && $e("scroll", e);
        break;
      case "onScrollEnd":
        r != null && $e("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (n = r.__html, n != null) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Ls("" + r), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        r === !0 ? e.setAttribute(n, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
        break;
      case "popover":
        $e("beforetoggle", e), $e("toggle", e), Ds(e, "popover", r);
        break;
      case "xlinkActuate":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        On(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        On(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        On(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        On(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Ds(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = sv.get(n) || n, Ds(e, n, r));
    }
  }
  function bu(e, t, n, r, l, u) {
    switch (n) {
      case "style":
        Wd(e, r, u);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(o(61));
          if (n = r.__html, n != null) {
            if (l.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof r == "string" ? _i(e, r) : (typeof r == "number" || typeof r == "bigint") && _i(e, "" + r);
        break;
      case "onScroll":
        r != null && $e("scroll", e);
        break;
      case "onScrollEnd":
        r != null && $e("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Cn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Gd.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (l = n.endsWith("Capture"), t = n.slice(2, l ? n.length - 7 : void 0), u = e[Xe] || null, u = u != null ? u[n] : null, typeof u == "function" && e.removeEventListener(t, u, l), typeof r == "function")) {
              typeof u != "function" && u !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, l);
              break e;
            }
            n in e ? e[n] = r : r === !0 ? e.setAttribute(n, "") : Ds(e, n, r);
          }
    }
  }
  function _t(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        $e("error", e), $e("load", e);
        var r = !1, l = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var m = n[u];
            if (m != null)
              switch (u) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  l = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Ie(e, t, u, m, n, null);
              }
          }
        l && Ie(e, t, "srcSet", n.srcSet, n, null), r && Ie(e, t, "src", n.src, n, null);
        return;
      case "input":
        $e("invalid", e);
        var _ = u = m = l = null, N = null, D = null;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var H = n[r];
            if (H != null)
              switch (r) {
                case "name":
                  l = H;
                  break;
                case "type":
                  m = H;
                  break;
                case "checked":
                  N = H;
                  break;
                case "defaultChecked":
                  D = H;
                  break;
                case "value":
                  u = H;
                  break;
                case "defaultValue":
                  _ = H;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (H != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Ie(e, t, r, H, n, null);
              }
          }
        Jd(
          e,
          u,
          _,
          N,
          D,
          m,
          l,
          !1
        );
        return;
      case "select":
        $e("invalid", e), r = m = u = null;
        for (l in n)
          if (n.hasOwnProperty(l) && (_ = n[l], _ != null))
            switch (l) {
              case "value":
                u = _;
                break;
              case "defaultValue":
                m = _;
                break;
              case "multiple":
                r = _;
              default:
                Ie(e, t, l, _, n, null);
            }
        t = u, n = m, e.multiple = !!r, t != null ? Si(e, !!r, t, !1) : n != null && Si(e, !!r, n, !0);
        return;
      case "textarea":
        $e("invalid", e), u = l = r = null;
        for (m in n)
          if (n.hasOwnProperty(m) && (_ = n[m], _ != null))
            switch (m) {
              case "value":
                r = _;
                break;
              case "defaultValue":
                l = _;
                break;
              case "children":
                u = _;
                break;
              case "dangerouslySetInnerHTML":
                if (_ != null) throw Error(o(91));
                break;
              default:
                Ie(e, t, m, _, n, null);
            }
        Zd(e, r, l, u);
        return;
      case "option":
        for (N in n)
          if (n.hasOwnProperty(N) && (r = n[N], r != null))
            switch (N) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Ie(e, t, N, r, n, null);
            }
        return;
      case "dialog":
        $e("beforetoggle", e), $e("toggle", e), $e("cancel", e), $e("close", e);
        break;
      case "iframe":
      case "object":
        $e("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Gr.length; r++)
          $e(Gr[r], e);
        break;
      case "image":
        $e("error", e), $e("load", e);
        break;
      case "details":
        $e("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        $e("error", e), $e("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (D in n)
          if (n.hasOwnProperty(D) && (r = n[D], r != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Ie(e, t, D, r, n, null);
            }
        return;
      default:
        if (Dl(t)) {
          for (H in n)
            n.hasOwnProperty(H) && (r = n[H], r !== void 0 && bu(
              e,
              t,
              H,
              r,
              n,
              void 0
            ));
          return;
        }
    }
    for (_ in n)
      n.hasOwnProperty(_) && (r = n[_], r != null && Ie(e, t, _, r, n, null));
  }
  function Db(e, t, n, r) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var l = null, u = null, m = null, _ = null, N = null, D = null, H = null;
        for (B in n) {
          var G = n[B];
          if (n.hasOwnProperty(B) && G != null)
            switch (B) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                N = G;
              default:
                r.hasOwnProperty(B) || Ie(e, t, B, null, r, G);
            }
        }
        for (var z in r) {
          var B = r[z];
          if (G = n[z], r.hasOwnProperty(z) && (B != null || G != null))
            switch (z) {
              case "type":
                u = B;
                break;
              case "name":
                l = B;
                break;
              case "checked":
                D = B;
                break;
              case "defaultChecked":
                H = B;
                break;
              case "value":
                m = B;
                break;
              case "defaultValue":
                _ = B;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (B != null)
                  throw Error(o(137, t));
                break;
              default:
                B !== G && Ie(
                  e,
                  t,
                  z,
                  B,
                  r,
                  G
                );
            }
        }
        Ol(
          e,
          m,
          _,
          N,
          D,
          H,
          u,
          l
        );
        return;
      case "select":
        B = m = _ = z = null;
        for (u in n)
          if (N = n[u], n.hasOwnProperty(u) && N != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                B = N;
              default:
                r.hasOwnProperty(u) || Ie(
                  e,
                  t,
                  u,
                  null,
                  r,
                  N
                );
            }
        for (l in r)
          if (u = r[l], N = n[l], r.hasOwnProperty(l) && (u != null || N != null))
            switch (l) {
              case "value":
                z = u;
                break;
              case "defaultValue":
                _ = u;
                break;
              case "multiple":
                m = u;
              default:
                u !== N && Ie(
                  e,
                  t,
                  l,
                  u,
                  r,
                  N
                );
            }
        t = _, n = m, r = B, z != null ? Si(e, !!n, z, !1) : !!r != !!n && (t != null ? Si(e, !!n, t, !0) : Si(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        B = z = null;
        for (_ in n)
          if (l = n[_], n.hasOwnProperty(_) && l != null && !r.hasOwnProperty(_))
            switch (_) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ie(e, t, _, null, r, l);
            }
        for (m in r)
          if (l = r[m], u = n[m], r.hasOwnProperty(m) && (l != null || u != null))
            switch (m) {
              case "value":
                z = l;
                break;
              case "defaultValue":
                B = l;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (l != null) throw Error(o(91));
                break;
              default:
                l !== u && Ie(e, t, m, l, r, u);
            }
        Qd(e, z, B);
        return;
      case "option":
        for (var re in n)
          if (z = n[re], n.hasOwnProperty(re) && z != null && !r.hasOwnProperty(re))
            switch (re) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ie(
                  e,
                  t,
                  re,
                  null,
                  r,
                  z
                );
            }
        for (N in r)
          if (z = r[N], B = n[N], r.hasOwnProperty(N) && z !== B && (z != null || B != null))
            switch (N) {
              case "selected":
                e.selected = z && typeof z != "function" && typeof z != "symbol";
                break;
              default:
                Ie(
                  e,
                  t,
                  N,
                  z,
                  r,
                  B
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var he in n)
          z = n[he], n.hasOwnProperty(he) && z != null && !r.hasOwnProperty(he) && Ie(e, t, he, null, r, z);
        for (D in r)
          if (z = r[D], B = n[D], r.hasOwnProperty(D) && z !== B && (z != null || B != null))
            switch (D) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, t));
                break;
              default:
                Ie(
                  e,
                  t,
                  D,
                  z,
                  r,
                  B
                );
            }
        return;
      default:
        if (Dl(t)) {
          for (var Ge in n)
            z = n[Ge], n.hasOwnProperty(Ge) && z !== void 0 && !r.hasOwnProperty(Ge) && bu(
              e,
              t,
              Ge,
              void 0,
              r,
              z
            );
          for (H in r)
            z = r[H], B = n[H], !r.hasOwnProperty(H) || z === B || z === void 0 && B === void 0 || bu(
              e,
              t,
              H,
              z,
              r,
              B
            );
          return;
        }
    }
    for (var $ in n)
      z = n[$], n.hasOwnProperty($) && z != null && !r.hasOwnProperty($) && Ie(e, t, $, null, r, z);
    for (G in r)
      z = r[G], B = n[G], !r.hasOwnProperty(G) || z === B || z == null && B == null || Ie(e, t, G, z, r, B);
  }
  function eh(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function Rb() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
        var l = n[r], u = l.transferSize, m = l.initiatorType, _ = l.duration;
        if (u && _ && eh(m)) {
          for (m = 0, _ = l.responseEnd, r += 1; r < n.length; r++) {
            var N = n[r], D = N.startTime;
            if (D > _) break;
            var H = N.transferSize, G = N.initiatorType;
            H && eh(G) && (N = N.responseEnd, m += H * (N < _ ? 1 : (_ - D) / (N - D)));
          }
          if (--r, t += 8 * (u + m) / (l.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Su = null, _u = null;
  function Co(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function th(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function nh(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Eu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var xu = null;
  function zb() {
    var e = window.event;
    return e && e.type === "popstate" ? e === xu ? !1 : (xu = e, !0) : (xu = null, !1);
  }
  var ah = typeof setTimeout == "function" ? setTimeout : void 0, Lb = typeof clearTimeout == "function" ? clearTimeout : void 0, ih = typeof Promise == "function" ? Promise : void 0, Ub = typeof queueMicrotask == "function" ? queueMicrotask : typeof ih < "u" ? function(e) {
    return ih.resolve(null).then(e).catch(Vb);
  } : ah;
  function Vb(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function wa(e) {
    return e === "head";
  }
  function rh(e, t) {
    var n = t, r = 0;
    do {
      var l = n.nextSibling;
      if (e.removeChild(n), l && l.nodeType === 8)
        if (n = l.data, n === "/$" || n === "/&") {
          if (r === 0) {
            e.removeChild(l), Wi(t);
            return;
          }
          r--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          r++;
        else if (n === "html")
          Kr(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Kr(n);
          for (var u = n.firstChild; u; ) {
            var m = u.nextSibling, _ = u.nodeName;
            u[cr] || _ === "SCRIPT" || _ === "STYLE" || _ === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = m;
          }
        } else
          n === "body" && Kr(e.ownerDocument.body);
      n = l;
    } while (n);
    Wi(t);
  }
  function sh(e, t) {
    var n = e;
    e = 0;
    do {
      var r = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8)
        if (n = r.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = r;
    } while (n);
  }
  function Au(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Au(n), Ml(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function Bb(e, t, n, r) {
    for (; e.nodeType === 1; ) {
      var l = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[cr])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (u !== l.rel || e.getAttribute("href") !== (l.href == null || l.href === "" ? null : l.href) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin) || e.getAttribute("title") !== (l.title == null ? null : l.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (u = e.getAttribute("src"), (u !== (l.src == null ? null : l.src) || e.getAttribute("type") !== (l.type == null ? null : l.type) || e.getAttribute("crossorigin") !== (l.crossOrigin == null ? null : l.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var u = l.name == null ? null : "" + l.name;
        if (l.type === "hidden" && e.getAttribute("name") === u)
          return e;
      } else return e;
      if (e = rn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function kb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = rn(e.nextSibling), e === null)) return null;
    return e;
  }
  function oh(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = rn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Nu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function wu(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Hb(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var r = function() {
        t(), n.removeEventListener("DOMContentLoaded", r);
      };
      n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function rn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var ju = null;
  function lh(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return rn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function ch(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function uh(e, t, n) {
    switch (t = Co(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(o(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(o(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function Kr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Ml(e);
  }
  var sn = /* @__PURE__ */ new Map(), dh = /* @__PURE__ */ new Set();
  function Do(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Jn = J.d;
  J.d = {
    f: Ib,
    r: Gb,
    D: qb,
    C: Kb,
    L: Yb,
    m: Xb,
    X: Qb,
    S: Jb,
    M: Zb
  };
  function Ib() {
    var e = Jn.f(), t = Ao();
    return e || t;
  }
  function Gb(e) {
    var t = yi(e);
    t !== null && t.tag === 5 && t.type === "form" ? $p(t) : Jn.r(e);
  }
  var Qi = typeof document > "u" ? null : document;
  function fh(e, t, n) {
    var r = Qi;
    if (r && typeof t == "string" && t) {
      var l = Ft(t);
      l = 'link[rel="' + e + '"][href="' + l + '"]', typeof n == "string" && (l += '[crossorigin="' + n + '"]'), dh.has(l) || (dh.add(l), e = { rel: e, crossOrigin: n, href: t }, r.querySelector(l) === null && (t = r.createElement("link"), _t(t, "link", e), ft(t), r.head.appendChild(t)));
    }
  }
  function qb(e) {
    Jn.D(e), fh("dns-prefetch", e, null);
  }
  function Kb(e, t) {
    Jn.C(e, t), fh("preconnect", e, t);
  }
  function Yb(e, t, n) {
    Jn.L(e, t, n);
    var r = Qi;
    if (r && e && t) {
      var l = 'link[rel="preload"][as="' + Ft(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (l += '[imagesrcset="' + Ft(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (l += '[imagesizes="' + Ft(
        n.imageSizes
      ) + '"]')) : l += '[href="' + Ft(e) + '"]';
      var u = l;
      switch (t) {
        case "style":
          u = Zi(e);
          break;
        case "script":
          u = Fi(e);
      }
      sn.has(u) || (e = v(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), sn.set(u, e), r.querySelector(l) !== null || t === "style" && r.querySelector(Yr(u)) || t === "script" && r.querySelector(Xr(u)) || (t = r.createElement("link"), _t(t, "link", e), ft(t), r.head.appendChild(t)));
    }
  }
  function Xb(e, t) {
    Jn.m(e, t);
    var n = Qi;
    if (n && e) {
      var r = t && typeof t.as == "string" ? t.as : "script", l = 'link[rel="modulepreload"][as="' + Ft(r) + '"][href="' + Ft(e) + '"]', u = l;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Fi(e);
      }
      if (!sn.has(u) && (e = v({ rel: "modulepreload", href: e }, t), sn.set(u, e), n.querySelector(l) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Xr(u)))
              return;
        }
        r = n.createElement("link"), _t(r, "link", e), ft(r), n.head.appendChild(r);
      }
    }
  }
  function Jb(e, t, n) {
    Jn.S(e, t, n);
    var r = Qi;
    if (r && e) {
      var l = vi(r).hoistableStyles, u = Zi(e);
      t = t || "default";
      var m = l.get(u);
      if (!m) {
        var _ = { loading: 0, preload: null };
        if (m = r.querySelector(
          Yr(u)
        ))
          _.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = sn.get(u)) && $u(e, n);
          var N = m = r.createElement("link");
          ft(N), _t(N, "link", e), N._p = new Promise(function(D, H) {
            N.onload = D, N.onerror = H;
          }), N.addEventListener("load", function() {
            _.loading |= 1;
          }), N.addEventListener("error", function() {
            _.loading |= 2;
          }), _.loading |= 4, Ro(m, t, r);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: _
        }, l.set(u, m);
      }
    }
  }
  function Qb(e, t) {
    Jn.X(e, t);
    var n = Qi;
    if (n && e) {
      var r = vi(n).hoistableScripts, l = Fi(e), u = r.get(l);
      u || (u = n.querySelector(Xr(l)), u || (e = v({ src: e, async: !0 }, t), (t = sn.get(l)) && Mu(e, t), u = n.createElement("script"), ft(u), _t(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(l, u));
    }
  }
  function Zb(e, t) {
    Jn.M(e, t);
    var n = Qi;
    if (n && e) {
      var r = vi(n).hoistableScripts, l = Fi(e), u = r.get(l);
      u || (u = n.querySelector(Xr(l)), u || (e = v({ src: e, async: !0, type: "module" }, t), (t = sn.get(l)) && Mu(e, t), u = n.createElement("script"), ft(u), _t(u, "link", e), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, r.set(l, u));
    }
  }
  function ph(e, t, n, r) {
    var l = (l = pe.current) ? Do(l) : null;
    if (!l) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Zi(n.href), n = vi(
          l
        ).hoistableStyles, r = n.get(t), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Zi(n.href);
          var u = vi(
            l
          ).hoistableStyles, m = u.get(e);
          if (m || (l = l.ownerDocument || l, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(e, m), (u = l.querySelector(
            Yr(e)
          )) && !u._p && (m.instance = u, m.state.loading = 5), sn.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, sn.set(e, n), u || Fb(
            l,
            e,
            n,
            m.state
          ))), t && r === null)
            throw Error(o(528, ""));
          return m;
        }
        if (t && r !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Fi(n), n = vi(
          l
        ).hoistableScripts, r = n.get(t), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Zi(e) {
    return 'href="' + Ft(e) + '"';
  }
  function Yr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function mh(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Fb(e, t, n, r) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
      return r.loading |= 1;
    }), t.addEventListener("error", function() {
      return r.loading |= 2;
    }), _t(t, "link", n), ft(t), e.head.appendChild(t));
  }
  function Fi(e) {
    return '[src="' + Ft(e) + '"]';
  }
  function Xr(e) {
    return "script[async]" + e;
  }
  function hh(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + Ft(n.href) + '"]'
          );
          if (r)
            return t.instance = r, ft(r), r;
          var l = v({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), ft(r), _t(r, "style", l), Ro(r, n.precedence, e), t.instance = r;
        case "stylesheet":
          l = Zi(n.href);
          var u = e.querySelector(
            Yr(l)
          );
          if (u)
            return t.state.loading |= 4, t.instance = u, ft(u), u;
          r = mh(n), (l = sn.get(l)) && $u(r, l), u = (e.ownerDocument || e).createElement("link"), ft(u);
          var m = u;
          return m._p = new Promise(function(_, N) {
            m.onload = _, m.onerror = N;
          }), _t(u, "link", r), t.state.loading |= 4, Ro(u, n.precedence, e), t.instance = u;
        case "script":
          return u = Fi(n.src), (l = e.querySelector(
            Xr(u)
          )) ? (t.instance = l, ft(l), l) : (r = n, (l = sn.get(u)) && (r = v({}, n), Mu(r, l)), e = e.ownerDocument || e, l = e.createElement("script"), ft(l), _t(l, "link", r), e.head.appendChild(l), t.instance = l);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (r = t.instance, t.state.loading |= 4, Ro(r, n.precedence, e));
    return t.instance;
  }
  function Ro(e, t, n) {
    for (var r = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), l = r.length ? r[r.length - 1] : null, u = l, m = 0; m < r.length; m++) {
      var _ = r[m];
      if (_.dataset.precedence === t) u = _;
      else if (u !== l) break;
    }
    u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function $u(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Mu(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var zo = null;
  function gh(e, t, n) {
    if (zo === null) {
      var r = /* @__PURE__ */ new Map(), l = zo = /* @__PURE__ */ new Map();
      l.set(n, r);
    } else
      l = zo, r = l.get(n), r || (r = /* @__PURE__ */ new Map(), l.set(n, r));
    if (r.has(e)) return r;
    for (r.set(e, null), n = n.getElementsByTagName(e), l = 0; l < n.length; l++) {
      var u = n[l];
      if (!(u[cr] || u[xe] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = u.getAttribute(t) || "";
        m = e + m;
        var _ = r.get(m);
        _ ? _.push(u) : r.set(m, [u]);
      }
    }
    return r;
  }
  function yh(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function Wb(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        switch (t.rel) {
          case "stylesheet":
            return e = t.disabled, typeof t.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function vh(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Pb(e, t, n, r) {
    if (n.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var l = Zi(r.href), u = t.querySelector(
          Yr(l)
        );
        if (u) {
          t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Lo.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = u, ft(u);
          return;
        }
        u = t.ownerDocument || t, r = mh(r), (l = sn.get(l)) && $u(r, l), u = u.createElement("link"), ft(u);
        var m = u;
        m._p = new Promise(function(_, N) {
          m.onload = _, m.onerror = N;
        }), _t(u, "link", r), n.instance = u;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Lo.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Tu = 0;
  function e0(e, t) {
    return e.stylesheets && e.count === 0 && Vo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var r = setTimeout(function() {
        if (e.stylesheets && Vo(e, e.stylesheets), e.unsuspend) {
          var u = e.unsuspend;
          e.unsuspend = null, u();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Tu === 0 && (Tu = 62500 * Rb());
      var l = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Vo(e, e.stylesheets), e.unsuspend)) {
            var u = e.unsuspend;
            e.unsuspend = null, u();
          }
        },
        (e.imgBytes > Tu ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(l);
      };
    } : null;
  }
  function Lo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Vo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Uo = null;
  function Vo(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Uo = /* @__PURE__ */ new Map(), t.forEach(t0, e), Uo = null, Lo.call(e));
  }
  function t0(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Uo.get(e);
      if (n) var r = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Uo.set(e, n);
        for (var l = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < l.length; u++) {
          var m = l[u];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), r = m);
        }
        r && n.set(null, r);
      }
      l = t.instance, m = l.getAttribute("data-precedence"), u = n.get(m) || r, u === r && n.set(null, l), n.set(m, l), this.count++, r = Lo.bind(this), l.addEventListener("load", r), l.addEventListener("error", r), u ? u.parentNode.insertBefore(l, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(l, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Jr = {
    $$typeof: q,
    Provider: null,
    Consumer: null,
    _currentValue: T,
    _currentValue2: T,
    _threadCount: 0
  };
  function n0(e, t, n, r, l, u, m, _, N) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = hi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = hi(0), this.hiddenUpdates = hi(null), this.identifierPrefix = r, this.onUncaughtError = l, this.onCaughtError = u, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = N, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function bh(e, t, n, r, l, u, m, _, N, D, H, G) {
    return e = new n0(
      e,
      t,
      n,
      m,
      N,
      D,
      H,
      G,
      _
    ), t = 1, u === !0 && (t |= 24), u = kt(3, null, null, t), e.current = u, u.stateNode = e, t = cc(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: t
    }, pc(u), e;
  }
  function Sh(e) {
    return e ? (e = $i, e) : $i;
  }
  function _h(e, t, n, r, l, u) {
    l = Sh(l), r.context === null ? r.context = l : r.pendingContext = l, r = ha(t), r.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (r.callback = u), n = ga(e, r, t), n !== null && (Lt(n, e, t), wr(n, e, t));
  }
  function Eh(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Ou(e, t) {
    Eh(e, t), (e = e.alternate) && Eh(e, t);
  }
  function xh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xa(e, 67108864);
      t !== null && Lt(t, e, 67108864), Ou(e, 67108864);
    }
  }
  function Ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Kt();
      t = Ue(t);
      var n = Xa(e, t);
      n !== null && Lt(n, e, t), Ou(e, t);
    }
  }
  var Bo = !0;
  function a0(e, t, n, r) {
    var l = M.T;
    M.T = null;
    var u = J.p;
    try {
      J.p = 2, Cu(e, t, n, r);
    } finally {
      J.p = u, M.T = l;
    }
  }
  function i0(e, t, n, r) {
    var l = M.T;
    M.T = null;
    var u = J.p;
    try {
      J.p = 8, Cu(e, t, n, r);
    } finally {
      J.p = u, M.T = l;
    }
  }
  function Cu(e, t, n, r) {
    if (Bo) {
      var l = Du(r);
      if (l === null)
        vu(
          e,
          t,
          r,
          ko,
          n
        ), wh(e, r);
      else if (s0(
        l,
        e,
        t,
        n,
        r
      ))
        r.stopPropagation();
      else if (wh(e, r), t & 4 && -1 < r0.indexOf(e)) {
        for (; l !== null; ) {
          var u = yi(l);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var m = bn(u.pendingLanes);
                  if (m !== 0) {
                    var _ = u;
                    for (_.pendingLanes |= 2, _.entangledLanes |= 2; m; ) {
                      var N = 1 << 31 - wt(m);
                      _.entanglements[1] |= N, m &= ~N;
                    }
                    An(u), (Le & 6) === 0 && (Eo = Nt() + 500, Ir(0));
                  }
                }
                break;
              case 31:
              case 13:
                _ = Xa(u, 2), _ !== null && Lt(_, u, 2), Ao(), Ou(u, 2);
            }
          if (u = Du(r), u === null && vu(
            e,
            t,
            r,
            ko,
            n
          ), u === l) break;
          l = u;
        }
        l !== null && r.stopPropagation();
      } else
        vu(
          e,
          t,
          r,
          null,
          n
        );
    }
  }
  function Du(e) {
    return e = zl(e), Ru(e);
  }
  var ko = null;
  function Ru(e) {
    if (ko = null, e = gi(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = y(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ko = e, null;
  }
  function Nh(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (wl()) {
          case $s:
            return 2;
          case or:
            return 8;
          case ka:
          case jl:
            return 32;
          case Ms:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var zu = !1, ja = null, $a = null, Ma = null, Qr = /* @__PURE__ */ new Map(), Zr = /* @__PURE__ */ new Map(), Ta = [], r0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function wh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ja = null;
        break;
      case "dragenter":
      case "dragleave":
        $a = null;
        break;
      case "mouseover":
      case "mouseout":
        Ma = null;
        break;
      case "pointerover":
      case "pointerout":
        Qr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Zr.delete(t.pointerId);
    }
  }
  function Fr(e, t, n, r, l, u) {
    return e === null || e.nativeEvent !== u ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: r,
      nativeEvent: u,
      targetContainers: [l]
    }, t !== null && (t = yi(t), t !== null && xh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
  }
  function s0(e, t, n, r, l) {
    switch (t) {
      case "focusin":
        return ja = Fr(
          ja,
          e,
          t,
          n,
          r,
          l
        ), !0;
      case "dragenter":
        return $a = Fr(
          $a,
          e,
          t,
          n,
          r,
          l
        ), !0;
      case "mouseover":
        return Ma = Fr(
          Ma,
          e,
          t,
          n,
          r,
          l
        ), !0;
      case "pointerover":
        var u = l.pointerId;
        return Qr.set(
          u,
          Fr(
            Qr.get(u) || null,
            e,
            t,
            n,
            r,
            l
          )
        ), !0;
      case "gotpointercapture":
        return u = l.pointerId, Zr.set(
          u,
          Fr(
            Zr.get(u) || null,
            e,
            t,
            n,
            r,
            l
          )
        ), !0;
    }
    return !1;
  }
  function jh(e) {
    var t = gi(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = f(n), t !== null) {
            e.blockedOn = t, Jt(e.priority, function() {
              Ah(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = y(n), t !== null) {
            e.blockedOn = t, Jt(e.priority, function() {
              Ah(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ho(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Du(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var r = new n.constructor(
          n.type,
          n
        );
        Rl = r, n.target.dispatchEvent(r), Rl = null;
      } else
        return t = yi(n), t !== null && xh(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function $h(e, t, n) {
    Ho(e) && n.delete(t);
  }
  function o0() {
    zu = !1, ja !== null && Ho(ja) && (ja = null), $a !== null && Ho($a) && ($a = null), Ma !== null && Ho(Ma) && (Ma = null), Qr.forEach($h), Zr.forEach($h);
  }
  function Io(e, t) {
    e.blockedOn === t && (e.blockedOn = null, zu || (zu = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      o0
    )));
  }
  var Go = null;
  function Mh(e) {
    Go !== e && (Go = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Go === e && (Go = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], r = e[t + 1], l = e[t + 2];
          if (typeof r != "function") {
            if (Ru(r || n) === null)
              continue;
            break;
          }
          var u = yi(n);
          u !== null && (e.splice(t, 3), t -= 3, Dc(
            u,
            {
              pending: !0,
              data: l,
              method: n.method,
              action: r
            },
            r,
            l
          ));
        }
      }
    ));
  }
  function Wi(e) {
    function t(N) {
      return Io(N, e);
    }
    ja !== null && Io(ja, e), $a !== null && Io($a, e), Ma !== null && Io(Ma, e), Qr.forEach(t), Zr.forEach(t);
    for (var n = 0; n < Ta.length; n++) {
      var r = Ta[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Ta.length && (n = Ta[0], n.blockedOn === null); )
      jh(n), n.blockedOn === null && Ta.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (r = 0; r < n.length; r += 3) {
        var l = n[r], u = n[r + 1], m = l[Xe] || null;
        if (typeof u == "function")
          m || Mh(n);
        else if (m) {
          var _ = null;
          if (u && u.hasAttribute("formAction")) {
            if (l = u, m = u[Xe] || null)
              _ = m.formAction;
            else if (Ru(l) !== null) continue;
          } else _ = m.action;
          typeof _ == "function" ? n[r + 1] = _ : (n.splice(r, 3), r -= 3), Mh(n);
        }
      }
  }
  function Th() {
    function e(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(m) {
            return l = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      l !== null && (l(), l = null), r || setTimeout(n, 20);
    }
    function n() {
      if (!r && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var r = !1, l = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), l !== null && (l(), l = null);
      };
    }
  }
  function Lu(e) {
    this._internalRoot = e;
  }
  qo.prototype.render = Lu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var n = t.current, r = Kt();
    _h(n, r, e, t, null, null);
  }, qo.prototype.unmount = Lu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      _h(e.current, 2, null, e, null, null), Ao(), t[Qt] = null;
    }
  };
  function qo(e) {
    this._internalRoot = e;
  }
  qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = Vt();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ta.length && t !== 0 && t < Ta[n].priority; n++) ;
      Ta.splice(n, 0, e), n === 0 && jh(e);
    }
  };
  var Oh = i.version;
  if (Oh !== "19.2.7")
    throw Error(
      o(
        527,
        Oh,
        "19.2.7"
      )
    );
  J.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var l0 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: M,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ko.isDisabled && Ko.supportsFiber)
      try {
        Mn = Ko.inject(
          l0
        ), gt = Ko;
      } catch {
      }
  }
  return Pr.createRoot = function(e, t) {
    if (!c(e)) throw Error(o(299));
    var n = !1, r = "", l = Vp, u = Bp, m = kp;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (l = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = bh(
      e,
      1,
      !1,
      null,
      null,
      n,
      r,
      null,
      l,
      u,
      m,
      Th
    ), e[Qt] = t.current, yu(e), new Lu(t);
  }, Pr.hydrateRoot = function(e, t, n) {
    if (!c(e)) throw Error(o(299));
    var r = !1, l = "", u = Vp, m = Bp, _ = kp, N = null;
    return n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (_ = n.onRecoverableError), n.formState !== void 0 && (N = n.formState)), t = bh(
      e,
      1,
      !0,
      t,
      n ?? null,
      r,
      l,
      N,
      u,
      m,
      _,
      Th
    ), t.context = Sh(null), n = t.current, r = Kt(), r = Ue(r), l = ha(r), l.callback = null, ga(n, l, r), n = r, t.current.lanes = n, la(t, n), An(t), e[Qt] = t.current, yu(e), new qo(t);
  }, Pr.version = "19.2.7", Pr;
}
var Hh;
function E0() {
  if (Hh) return Bu.exports;
  Hh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), Bu.exports = _0(), Bu.exports;
}
var x0 = E0();
const A0 = ["none", "low", "medium", "high", "xhigh", "max"], N0 = ["low", "medium", "high", "xhigh", "max"], w0 = [
  {
    id: "gpt-5.6-sol",
    label: "GPT-5.6 Sol",
    description: "Frontier model for complex professional work",
    codexDefault: "max"
  },
  {
    id: "gpt-5.6-terra",
    label: "GPT-5.6 Terra",
    description: "Balances intelligence and cost",
    codexDefault: "medium"
  },
  {
    id: "gpt-5.6-luna",
    label: "GPT-5.6 Luna",
    description: "Optimized for cost-sensitive workloads",
    codexDefault: "medium"
  }
], j0 = 300 * 1e3, $0 = 500, Ih = 256, M0 = 160, T0 = 500, O0 = 300, C0 = /[\u0000-\u001f\u007f]/, ds = /* @__PURE__ */ new Map();
function _d(a) {
  return typeof a == "string" && a !== "ultra" && /^[a-z][a-z0-9_-]{0,63}$/.test(a);
}
function rl(a, i) {
  if (typeof a != "string" || C0.test(a)) return;
  const s = a.trim();
  if (s !== "")
    return s.slice(0, i);
}
function D0(a) {
  const i = rl(a, Ih + 1);
  return i && i.length <= Ih ? i : void 0;
}
function R0(a) {
  if (!Array.isArray(a)) return;
  const i = /* @__PURE__ */ new Map();
  for (const s of a) {
    const o = typeof s == "string" ? s : s && typeof s == "object" ? s.effort : void 0;
    if (!_d(o) || i.has(o)) continue;
    const c = { effort: o };
    if (s && typeof s == "object") {
      const d = s.description, f = rl(d, O0);
      f && (c.description = f);
    }
    i.set(o, c);
  }
  return i.size > 0 ? Array.from(i.values()) : void 0;
}
function Ed(a) {
  var i;
  return {
    ...a,
    reasoningEfforts: (i = a.reasoningEfforts) == null ? void 0 : i.map((s) => ({ ...s }))
  };
}
function z0(a) {
  return {
    models: a.models.map(Ed),
    capabilities: { ...a.capabilities },
    ...a.source ? { source: a.source } : {}
  };
}
function qg(a) {
  if (!Array.isArray(a)) return [];
  const i = /* @__PURE__ */ new Set(), s = [];
  for (const o of a) {
    if (s.length >= $0) break;
    const c = typeof o == "string" ? { id: o } : o ?? {}, d = D0(c.id);
    if (!d || i.has(d)) continue;
    i.add(d);
    const f = [c.label, c.display_name, c.name].map((v) => rl(v, M0)).find(Boolean), y = {
      id: d,
      label: f ?? d
    }, p = rl(c.description, T0);
    p && (y.description = p);
    const h = c.defaultReasoningEffort ?? c.default_reasoning_effort ?? c.default_reasoning_level;
    _d(h) && (y.defaultReasoningEffort = h);
    const b = R0(
      c.reasoningEfforts ?? c.supported_reasoning_efforts ?? c.supported_reasoning_levels ?? c.reasoning_efforts
    );
    b && (y.reasoningEfforts = b), s.push(y);
  }
  return s;
}
function L0(a) {
  return a.filter((i) => i !== "ultra").map((i) => ({ effort: i }));
}
function Kg(a) {
  if (a !== "openai" && a !== "openai-codex") return [];
  const i = a === "openai" ? A0 : N0;
  return w0.map((s) => ({
    id: s.id,
    label: s.label,
    description: s.description,
    defaultReasoningEffort: a === "openai" ? "medium" : s.codexDefault,
    reasoningEfforts: L0(i)
  }));
}
function Pu(a, i) {
  const s = Kg(a), o = s.find((c) => c.id === i);
  if (o) return o;
  if (i === "gpt-5.6") {
    const c = s.find((d) => d.id === "gpt-5.6-sol");
    if (c) return { ...Ed(c), id: i, label: "GPT-5.6 (Sol alias)" };
  }
}
function Yg(a, i, s) {
  const o = [], c = /* @__PURE__ */ new Map(), d = (y) => {
    var b;
    const p = c.get(y.id);
    if (p === void 0) {
      c.set(y.id, o.length), o.push(Ed(y));
      return;
    }
    const h = o[p];
    o[p] = {
      ...h,
      ...y,
      label: y.label === y.id && h.label !== h.id ? h.label : y.label,
      defaultReasoningEffort: y.defaultReasoningEffort ?? h.defaultReasoningEffort,
      reasoningEfforts: (b = y.reasoningEfforts) != null && b.length ? y.reasoningEfforts.map((v) => ({ ...v })) : h.reasoningEfforts
    };
  };
  Kg(a).forEach(d), i.forEach((y) => {
    const p = Pu(a, y.id);
    p && d(p), d(y);
  });
  const f = s == null ? void 0 : s.trim();
  return f && !c.has(f) && d(Pu(a, f) ?? { id: f, label: f }), o;
}
function sl(a, i, s = []) {
  var d;
  const o = Pu(a, i), c = s.find((f) => f.id === i);
  return c ? o ? {
    ...o,
    ...c,
    label: c.label === c.id ? o.label : c.label,
    defaultReasoningEffort: c.defaultReasoningEffort ?? o.defaultReasoningEffort,
    reasoningEfforts: (d = c.reasoningEfforts) != null && d.length ? c.reasoningEfforts : o.reasoningEfforts
  } : c : o;
}
function U0(a) {
  let i = 2166136261;
  for (let s = 0; s < a.length; s += 1)
    i ^= a.charCodeAt(s), i = Math.imul(i, 16777619);
  return `${a.length}-${(i >>> 0).toString(36)}`;
}
function el(a, i, s) {
  return `${a}:${U0(i ?? "")}:${(s == null ? void 0 : s.trim()) ?? ""}`;
}
function Xg(a, i = Date.now()) {
  const s = ds.get(a);
  return s ? s.expiresAt <= i ? (ds.delete(a), null) : z0(s.result) : null;
}
function Jg(a, i, s = Date.now()) {
  ds.set(a, {
    expiresAt: s + j0,
    result: {
      models: qg(i.models),
      capabilities: {
        reasoningEffort: i.capabilities.reasoningEffort === !0,
        richModelCatalog: i.capabilities.richModelCatalog === !0
      },
      ...i.source ? { source: i.source } : {}
    }
  });
}
function as(a) {
  const i = `${a}:`;
  for (const s of ds.keys())
    s.startsWith(i) && ds.delete(s);
}
const Qn = {
  provider: "openai",
  models: {
    openai: "gpt-5.6-sol",
    "openai-codex": "gpt-5.6-sol",
    openrouter: "",
    anthropic: "claude-sonnet-4-6",
    custom: ""
  },
  apiKeys: {},
  // Codex ships pinned to GPT-5.6 Sol at max effort. The value is still sent
  // only after the host confirms reasoning-effort support for the model.
  reasoningEfforts: { "openai-codex": "max" },
  providerCapabilities: {},
  customBaseUrl: "",
  notifyOnRunCompletion: !0
}, Qg = "settings";
function V0(a, i) {
  const s = {
    ...a.reasoningEfforts
  };
  for (const [o, c] of Object.entries(i.reasoningEfforts ?? {}))
    _d(c) && (s[o] = c);
  return {
    provider: i.provider ?? a.provider,
    models: { ...a.models, ...i.models },
    apiKeys: { ...a.apiKeys, ...i.apiKeys },
    reasoningEfforts: s,
    // A host upgrade/downgrade must be negotiated again each browser session.
    providerCapabilities: {},
    customBaseUrl: i.customBaseUrl !== void 0 ? i.customBaseUrl : a.customBaseUrl,
    notifyOnRunCompletion: i.notifyOnRunCompletion !== void 0 ? i.notifyOnRunCompletion : a.notifyOnRunCompletion
  };
}
function B0(a) {
  const i = a.storage.get(Qg);
  if (!i) return {
    ...Qn,
    models: { ...Qn.models },
    apiKeys: {},
    reasoningEfforts: { ...Qn.reasoningEfforts },
    providerCapabilities: { ...Qn.providerCapabilities }
  };
  try {
    const s = JSON.parse(i);
    return V0(Qn, s);
  } catch {
    return {
      ...Qn,
      models: { ...Qn.models },
      apiKeys: {},
      reasoningEfforts: { ...Qn.reasoningEfforts },
      providerCapabilities: { ...Qn.providerCapabilities }
    };
  }
}
function k0(a, i) {
  const { providerCapabilities: s, ...o } = i;
  a.storage.set(Qg, JSON.stringify(o));
}
function ol(a) {
  var s, o;
  const i = (s = a.providerCapabilities) == null ? void 0 : s[a.provider];
  if (!((i == null ? void 0 : i.reasoningEffort) !== !0 || i.reasoningModel !== a.models[a.provider]))
    return (o = a.reasoningEfforts) == null ? void 0 : o[a.provider];
}
function Zg(a, i, s) {
  var d;
  const o = { ...a.reasoningEfforts };
  s === "" ? delete o[i] : o[i] = s;
  const c = (d = a.providerCapabilities) == null ? void 0 : d[i];
  return {
    ...a,
    reasoningEfforts: o,
    ...c ? {
      providerCapabilities: {
        ...a.providerCapabilities,
        [i]: {
          reasoningEffort: c.reasoningEffort,
          richModelCatalog: c.richModelCatalog,
          ...s ? { reasoningModel: a.models[i] ?? "" } : {}
        }
      }
    } : {}
  };
}
function ed(a, i, s, o, c) {
  var O, E;
  const d = (O = a.providerCapabilities) == null ? void 0 : O[i], f = { ...a.reasoningEfforts }, y = f[i], p = a.models[i] ?? "", h = s.find((L) => L.id === p), b = sl(
    i,
    p,
    Yg(i, s, p)
  ), v = !!((E = b == null ? void 0 : b.reasoningEfforts) != null && E.some(
    (L) => L.effort === y
  )), S = o.reasoningEffort && o.richModelCatalog && !!h && c !== "fallback" && c !== "stale" && !!y && !v;
  S && delete f[i];
  const A = !S && o.reasoningEffort && y && v ? p : void 0;
  return ((d == null ? void 0 : d.reasoningEffort) ?? !1) === o.reasoningEffort && ((d == null ? void 0 : d.richModelCatalog) ?? !1) === o.richModelCatalog && (d == null ? void 0 : d.reasoningModel) === A && !S ? a : {
    ...a,
    reasoningEfforts: f,
    providerCapabilities: {
      ...a.providerCapabilities,
      [i]: {
        reasoningEffort: o.reasoningEffort,
        richModelCatalog: o.richModelCatalog,
        ...A ? { reasoningModel: A } : {}
      }
    }
  };
}
function H0(a, i) {
  switch (a.provider) {
    case "openai":
      return !!a.apiKeys.openai;
    case "openrouter":
      return !!a.apiKeys.openrouter;
    case "anthropic":
      return !!a.apiKeys.anthropic;
    case "openai-codex":
      return i;
    case "custom":
      return !!a.customBaseUrl;
    default:
      return !1;
  }
}
const Gh = 50, Fg = "conversations";
function xd(a) {
  const i = a.storage.get(Fg);
  if (!i) return [];
  try {
    return JSON.parse(i);
  } catch {
    return [];
  }
}
function qh(a) {
  return a.messages.some((i) => {
    var s;
    return (s = i.attachments) == null ? void 0 : s.some((o) => o.dataUrl);
  }) ? {
    ...a,
    messages: a.messages.map(
      (i) => i.attachments ? {
        ...i,
        attachments: i.attachments.map(
          (s) => s.dataUrl ? { ...s, dataUrl: void 0 } : s
        )
      } : i
    )
  } : a;
}
function Yo(a, i) {
  try {
    return a.storage.set(Fg, JSON.stringify(i)), !0;
  } catch {
    return !1;
  }
}
function Wg(a, i) {
  if (Yo(a, i)) return;
  const s = [...i];
  for (; s.length > 1; )
    if (s.pop(), Yo(a, s)) return;
  Yo(a, i.map(qh)) || Yo(a, i.slice(0, 1).map(qh));
}
function td(a) {
  return xd(a).sort((i, s) => s.updatedAt - i.updatedAt);
}
function Kh(a, i) {
  const s = xd(a), o = s.findIndex((c) => c.id === i.id);
  o >= 0 ? s[o] = i : s.push(i), s.sort((c, d) => d.updatedAt - c.updatedAt), s.length > Gh && s.splice(Gh), Wg(a, s);
}
function I0(a, i) {
  const s = xd(a).filter((o) => o.id !== i);
  Wg(a, s);
}
function Yh(a, i, s) {
  const o = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: o,
    updatedAt: o,
    provider: a,
    model: i,
    ...s ? { reasoningEffort: s } : {},
    messages: []
  };
}
function G0(a) {
  return a.slice(0, 40);
}
function q0() {
  return /* @__PURE__ */ g.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ g.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function K0({ onClick: a }) {
  return /* @__PURE__ */ g.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: a,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ g.jsx(q0, {})
    }
  );
}
const Xh = 8 * 1024 * 1024, Jh = 2 * 1024 * 1024, Qh = 20 * 1024 * 1024, Y0 = /* @__PURE__ */ new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "bmp",
  "svg",
  "avif",
  "ico"
]);
function Pg(a) {
  const i = a.lastIndexOf(".");
  return i >= 0 ? a.slice(i + 1).toLowerCase() : "";
}
function ey(a) {
  const i = (a.type || "").toLowerCase();
  if (i.startsWith("image/")) return "image";
  if (i === "application/pdf") return "pdf";
  if (i.startsWith("text/")) return "text";
  const s = Pg(a.name);
  return s === "pdf" ? "pdf" : Y0.has(s) ? "image" : "text";
}
function os(a) {
  return a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${(a / 1024).toFixed(1)} KB` : `${(a / (1024 * 1024)).toFixed(1)} MB`;
}
const X0 = {
  py: "python",
  ts: "ts",
  tsx: "tsx",
  js: "js",
  jsx: "jsx",
  json: "json",
  md: "markdown",
  html: "html",
  css: "css",
  scss: "scss",
  sh: "bash",
  bash: "bash",
  yml: "yaml",
  yaml: "yaml",
  toml: "toml",
  sql: "sql",
  go: "go",
  rs: "rust",
  java: "java",
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  cs: "csharp",
  rb: "ruby",
  php: "php",
  kt: "kotlin",
  swift: "swift",
  xml: "xml",
  csv: "csv",
  txt: ""
};
function J0(a) {
  return X0[Pg(a)] ?? "";
}
function Q0(a) {
  return new Promise((i, s) => {
    const o = new FileReader();
    o.onload = () => i(o.result), o.onerror = () => s(o.error ?? new Error("FileReader failed")), o.readAsDataURL(a);
  });
}
const Z0 = "4.10.38", Zh = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${Z0}/build`;
let Gu = null;
function F0() {
  return Gu || (Gu = import(`${Zh}/pdf.mjs`).then((i) => {
    const s = i.default ?? i;
    return s.GlobalWorkerOptions.workerSrc = `${Zh}/pdf.worker.mjs`, s;
  })), Gu;
}
async function W0(a) {
  const i = await F0(), s = await a.arrayBuffer(), o = await i.getDocument({ data: s }).promise, c = [];
  for (let d = 1; d <= o.numPages; d++) {
    const p = (await (await o.getPage(d)).getTextContent()).items.map((h) => typeof (h == null ? void 0 : h.str) == "string" ? h.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    p && c.push(p);
  }
  return c.join(`

`).trim();
}
async function P0(a, i = {}) {
  const s = ey(a), o = {
    id: crypto.randomUUID(),
    kind: s,
    name: a.name,
    size: a.size,
    mime: a.type || ""
  };
  if (s === "image") {
    if (a.size > Xh)
      throw new Error(`Image "${a.name}" is too large (max ${os(Xh)})`);
    const d = await (i.readDataUrl ?? Q0)(a);
    return { ...o, dataUrl: d };
  }
  if (s === "pdf") {
    if (a.size > Qh)
      throw new Error(`PDF "${a.name}" is too large (max ${os(Qh)})`);
    let d;
    try {
      d = await (i.loadPdfText ?? W0)(a);
    } catch (f) {
      const y = (f == null ? void 0 : f.message) ?? String(f);
      throw new Error(`Could not read PDF "${a.name}": ${y}`);
    }
    return { ...o, text: d };
  }
  if (a.size > Jh)
    throw new Error(`Text file "${a.name}" is too large (max ${os(Jh)})`);
  const c = await (i.readText ?? ((d) => d.text()))(a);
  return { ...o, text: c };
}
const eS = /* @__PURE__ */ new Set([
  "openai",
  "openai-codex",
  "openrouter",
  "anthropic",
  "custom"
]);
function ty(a, i, s) {
  const o = i ?? [], c = [];
  a.trim() && c.push(a);
  for (const y of o)
    if ((y.kind === "text" || y.kind === "pdf") && y.text) {
      const p = y.kind === "pdf" ? "" : J0(y.name);
      c.push(`Attached file "${y.name}":
\`\`\`${p}
${y.text}
\`\`\``);
    }
  const d = c.join(`

`), f = o.filter((y) => y.kind === "image" && y.dataUrl);
  if (f.length > 0 && eS.has(s))
    return [
      { type: "text", text: d || "(see attached image)" },
      ...f.map((p) => ({ type: "image_url", image_url: { url: p.dataUrl } }))
    ];
  if (f.length > 0) {
    const y = f.map((p) => `[image attached (not sent to this provider): ${p.name}]`).join(`
`);
    return [d, y].filter(Boolean).join(`

`);
  }
  return d;
}
function Fh(a, i) {
  const s = a.split(`
`);
  for (const o of s) {
    if (!o.startsWith("data: ")) continue;
    const c = o.slice(6).trim();
    if (!c || c === "[DONE]") continue;
    let d;
    try {
      d = JSON.parse(c);
    } catch {
      continue;
    }
    const f = d.type;
    if (f === "text_delta")
      i.onText(d.text ?? "");
    else if (f === "done") {
      const y = {
        message: d.message,
        stop_reason: d.stop_reason,
        usage: d.usage ?? {}
      };
      i.onDone(y);
    } else if (f === "error")
      return i.onError(d.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function ny(a, i, s, o) {
  let c;
  try {
    c = await a.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(i),
      signal: o
    });
  } catch (p) {
    s.onError(`Network error: ${String(p)}`);
    return;
  }
  if (!c.ok) {
    let p = "";
    try {
      p = await c.text(), p.length > 200 && (p = p.slice(0, 200) + "...");
    } catch {
    }
    s.onError(`HTTP ${c.status}: ${p}`);
    return;
  }
  const d = c.body.getReader(), f = new TextDecoder();
  let y = "";
  try {
    for (; ; ) {
      const { done: p, value: h } = await d.read();
      if (p) break;
      y += f.decode(h, { stream: !0 }).replace(/\r\n/g, `
`);
      const b = y.split(`

`);
      y = b.pop() ?? "";
      for (const v of b) {
        if (!v.trim()) continue;
        if (Fh(v, s)) {
          d.cancel().catch(() => {
          });
          return;
        }
      }
    }
    y.trim() && Fh(y, s);
  } catch (p) {
    (p == null ? void 0 : p.name) !== "AbortError" && s.onError(`Stream read error: ${String(p)}`);
  } finally {
    d.releaseLock();
  }
}
async function ay(a, i, s, o) {
  var p, h;
  const c = await a.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: i, api_key: s, base_url: o })
  });
  if (!c.ok) {
    let b = "";
    try {
      b = await c.text(), b.length > 200 && (b = b.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${c.status}: ${b}`);
  }
  const d = await c.json(), f = d && typeof d == "object" ? d : {}, y = ["live", "cache", "stale", "fallback"].includes(String(f.source)) ? f.source : void 0;
  return {
    models: qg(f.models),
    capabilities: {
      reasoningEffort: ((p = f.capabilities) == null ? void 0 : p.reasoning_effort) === !0,
      richModelCatalog: ((h = f.capabilities) == null ? void 0 : h.rich_model_catalog) === !0
    },
    ...y ? { source: y } : {}
  };
}
async function tS(a) {
  return (await (await a.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function nd(a) {
  return await (await a.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function nS(a) {
  await a.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const Ua = "[REDACTED]";
function nt(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function aS(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function Ba(a) {
  const i = aS(a);
  return [
    "secret",
    "secrets",
    "token",
    "password",
    "credential",
    "credentials",
    "authorization",
    "api_key",
    "private_key",
    "access_key",
    "client_secret",
    "access_token",
    "refresh_token",
    "auth_token",
    "bearer_token"
  ].some((s) => i === s || i.endsWith(`_${s}`));
}
function Pn(a) {
  return Array.isArray(a) ? a.map(Pn) : nt(a) ? Object.fromEntries(
    Object.entries(a).map(([i, s]) => [
      i,
      Ba(i) ? Ua : Pn(s)
    ])
  ) : a;
}
function $n(a, i) {
  typeof a == "string" ? a.length > 0 && i.add(a) : Array.isArray(a) ? a.forEach((s) => $n(s, i)) : nt(a) && Object.values(a).forEach((s) => $n(s, i));
}
function ll(a, i) {
  if (Array.isArray(a))
    a.forEach((s) => ll(s, i));
  else if (nt(a))
    for (const [s, o] of Object.entries(a))
      Ba(s) ? $n(o, i) : ll(o, i);
}
function Wh(a, i, s, o) {
  if (!Array.isArray(a)) return;
  const c = /* @__PURE__ */ new Map();
  for (const d of a) {
    if (!nt(d)) continue;
    let f;
    if (d.op === "add_node")
      f = typeof d.node_type == "string" ? d.node_type : void 0, typeof d.ref == "string" && f && c.set(d.ref, f);
    else if (d.op === "set_params") {
      const h = typeof d.node_id == "string" ? d.node_id : void 0;
      f = h ? c.get(h) ?? s.get(h) : void 0;
    } else
      continue;
    if (!nt(d.params)) continue;
    const y = f ? i.get(f) : void 0, p = y ? new Map(y.params.map((h) => [h.name, h])) : void 0;
    for (const [h, b] of Object.entries(d.params)) {
      const v = p == null ? void 0 : p.get(h);
      (!v || v.param_type === "secret" || Ba(h)) && $n(b, o);
    }
  }
}
function iS(a, i, s, o) {
  if (Array.isArray(a))
    for (const c of a) {
      if (!nt(c)) continue;
      const d = typeof c.node_id == "string" ? c.node_id : void 0, f = typeof c.param == "string" ? c.param : void 0, y = d ? s.get(d) : void 0, p = y ? i.get(y) : void 0, h = p == null ? void 0 : p.params.find((b) => b.name === f);
      (!h || h.param_type === "secret" || f && Ba(f)) && $n(c.values, o);
    }
}
function iy(a, i) {
  for (const s of a.values())
    for (const o of s.params)
      (o.param_type === "secret" || Ba(o.name)) && ($n(o.default, i), $n(o.options, i));
}
function fs(a, i, s) {
  const o = /* @__PURE__ */ new Set();
  if (iy(i, o), ll(a.arguments, o), a.name === "apply_graph_operations")
    Wh(a.arguments.operations, i, s, o);
  else if (a.name === "run_graph_experiments") {
    if (Array.isArray(a.arguments.variants))
      for (const c of a.arguments.variants)
        nt(c) && Wh(c.operations, i, s, o);
    a.arguments.search !== void 0 && $n(a.arguments.search, o);
  } else a.name === "optimize_graph_parameters" && iS(
    a.arguments.bindings,
    i,
    s,
    o
  );
  return o;
}
function cl(a, i, s) {
  var o;
  iy(i, s), ll(a, s), $n(a.presets, s);
  for (const c of a.nodes) {
    const d = (o = c.data) == null ? void 0 : o.params;
    if (!nt(d)) continue;
    const f = typeof c.type == "string" ? i.get(c.type) : void 0, y = f ? new Map(f.params.map((p) => [p.name, p])) : void 0;
    for (const [p, h] of Object.entries(d)) {
      const b = y == null ? void 0 : y.get(p);
      (!b || b.param_type === "secret" || Ba(p)) && $n(h, s);
    }
  }
}
function Va(a, i) {
  if (typeof a == "string") {
    let s = a;
    for (const o of [...i].sort((c, d) => d.length - c.length))
      s = s.split(o).join(Ua);
    return s;
  }
  return Array.isArray(a) ? a.map((s) => Va(s, i)) : nt(a) ? Object.fromEntries(
    Object.entries(a).map(([s, o]) => [s, Va(o, i)])
  ) : a;
}
function tr(a) {
  return new Map(a.map((i) => [i.node_name, i]));
}
function ps(a) {
  return new Map(
    a.filter((i) => typeof i.type == "string").map((i) => [i.id, i.type])
  );
}
function rS(a, i) {
  const s = tr(i), o = /* @__PURE__ */ new Set();
  cl(a, s, o);
  const c = Pn(a);
  if (!nt(c)) return { ...a, nodes: [], edges: [] };
  const d = Array.isArray(c.nodes) ? c.nodes : [];
  a.nodes.forEach((y, p) => {
    const h = d[p];
    !nt(h) || !nt(h.data) || y.data && Object.prototype.hasOwnProperty.call(y.data, "params") && (h.data.params = ad(
      y.data.params,
      typeof y.type == "string" ? y.type : void 0,
      s
    ));
  });
  const f = Va(c, o);
  return nt(f) ? f : { nodes: [], edges: [] };
}
function _l(a, i, s, o = []) {
  let c = [], d = { nodes: [] };
  try {
    c = s.graph.getNodeDefinitions();
  } catch {
  }
  try {
    const h = s.graph.getGraph();
    d = { nodes: h.nodes, presets: h.presets };
  } catch {
  }
  const f = tr(c), y = ps(d.nodes), p = fs(a, f, y);
  cl(d, f, p);
  for (const h of o) {
    const b = tr(h.definitions), v = ps(h.graph.nodes);
    for (const S of fs(a, b, v))
      p.add(S);
    cl(h.graph, b, p);
  }
  try {
    const h = JSON.parse(i);
    if (Array.isArray(h) || nt(h))
      return JSON.stringify(Va(Pn(h), p));
  } catch {
  }
  return Va(i, p);
}
function ad(a, i, s) {
  const o = Pn(a);
  if (!nt(o)) return o;
  const c = i ? s.get(i) : void 0, d = c ? new Map(c.params.map((f) => [f.name, f])) : void 0;
  for (const f of Object.keys(o)) {
    const y = d == null ? void 0 : d.get(f);
    (!y || y.param_type === "secret") && (o[f] = Ua);
  }
  return o;
}
function Ph(a, i, s) {
  const o = Pn(a);
  if (!Array.isArray(o)) return o;
  const c = /* @__PURE__ */ new Map();
  for (const d of o)
    if (nt(d)) {
      if (d.op === "add_node") {
        const f = typeof d.node_type == "string" ? d.node_type : void 0;
        typeof d.ref == "string" && f && c.set(d.ref, f), "params" in d && (d.params = ad(d.params, f, i));
      } else if (d.op === "set_params") {
        const f = typeof d.node_id == "string" ? d.node_id : void 0, y = f ? c.get(f) ?? s.get(f) : void 0;
        d.params = ad(d.params, y, i);
      }
    }
  return o;
}
function sS(a, i, s) {
  const o = Pn(a);
  if (!Array.isArray(o)) return o;
  for (const c of o) {
    if (!nt(c)) continue;
    const d = typeof c.node_id == "string" ? c.node_id : void 0, f = typeof c.param == "string" ? c.param : void 0, y = d ? s.get(d) : void 0, p = y ? i.get(y) : void 0, h = p == null ? void 0 : p.params.find((b) => b.name === f);
    (!h || h.param_type === "secret") && (c.values = Array.isArray(c.values) ? c.values.map(() => Ua) : Ua);
  }
  return o;
}
function ry(a, i) {
  let s = [], o = [];
  try {
    s = i.graph.getNodeDefinitions();
  } catch {
  }
  try {
    o = i.graph.getGraph().nodes;
  } catch {
  }
  const c = tr(s), d = ps(o), f = Pn(a.arguments), y = nt(f) ? f : {};
  if (a.name === "apply_graph_operations")
    y.operations = Ph(a.arguments.operations, c, d);
  else if (a.name === "run_graph_experiments") {
    const b = a.arguments.variants;
    Array.isArray(y.variants) && Array.isArray(b) && y.variants.forEach((v, S) => {
      nt(v) && nt(b[S]) && (v.operations = Ph(
        b[S].operations,
        c,
        d
      ));
    }), a.arguments.search !== void 0 && (y.search = Ua);
  } else a.name === "optimize_graph_parameters" && (y.bindings = sS(
    a.arguments.bindings,
    c,
    d
  ));
  const p = fs(a, c, d), h = Va(y, p);
  return {
    id: a.id,
    name: a.name,
    arguments: nt(h) ? h : {}
  };
}
function sy(a, i) {
  let s = [], o = [];
  try {
    s = i.graph.getNodeDefinitions();
  } catch {
  }
  try {
    o = i.graph.getGraph().nodes;
  } catch {
  }
  const c = tr(s), d = ps(o), f = /* @__PURE__ */ new Set();
  for (const y of a)
    for (const p of fs(y, c, d))
      f.add(p);
  return a.map((y) => {
    const p = ry(y, i), h = Va(p.arguments, f);
    return {
      ...p,
      arguments: nt(h) ? h : {}
    };
  });
}
function id(a, i, s) {
  let o = [], c = { nodes: [], edges: [] };
  try {
    o = s.graph.getNodeDefinitions();
  } catch {
  }
  try {
    c = s.graph.getGraph();
  } catch {
  }
  const d = tr(o), f = ps(c.nodes), y = /* @__PURE__ */ new Set();
  cl(c, d, y);
  for (const p of i)
    for (const h of fs(p, d, f))
      y.add(h);
  return Va(a, y);
}
const Xo = 3e4;
function oS(a) {
  const i = a.param_type === "secret" || Ba(a.name), s = i ? Ua : Pn(a.default), o = s == null ? String(s) : typeof s == "object" ? JSON.stringify(s) : String(s), c = o.length > 60 ? o.slice(0, 60) + "..." : o;
  let d = "";
  if (a.param_type === "select" && a.options.length > 0)
    d = i ? `{${Ua}}` : `{${a.options.join("|")}}`;
  else if (a.param_type === "int" || a.param_type === "float") {
    const f = a.min_value !== null, y = a.max_value !== null;
    if (f || y) {
      const p = f ? String(a.min_value) : "", h = y ? String(a.max_value) : "";
      d = `{${p}..${h}}`;
    }
  }
  return `${a.name}:${a.param_type}=${c}${d}`;
}
function lS(a) {
  return a.map((i) => {
    const s = [];
    if (i.inputs.length > 0) {
      const c = i.inputs.map((d) => `${d.name}:${d.data_type}`).join(", ");
      s.push(`in[${c}]`);
    }
    if (i.outputs.length > 0) {
      const c = i.outputs.map((d) => `${d.name}:${d.data_type}`).join(", ");
      s.push(`out[${c}]`);
    }
    if (i.params.length > 0) {
      const c = i.params.map(oS).join(", ");
      s.push(`params[${c}]`);
    }
    const o = s.length > 0 ? " " + s.join(" ") : "";
    return `${i.node_name}:${o} [category: ${i.category}]`;
  }).join(`
`);
}
function oy(a) {
  return a.map((i) => {
    const s = (i.description || "").replace(/\s+/g, " ").trim(), o = s.length > 100 ? s.slice(0, 100) + "..." : s;
    return `${i.node_name} [${i.category}]${o ? " - " + o : ""}`;
  }).join(`
`);
}
function ly(a, i = []) {
  const s = rS(a, i), o = JSON.stringify({ nodes: s.nodes, edges: s.edges });
  if (o.length <= Xo)
    return o;
  const c = [], d = [], f = {
    originalNodes: s.nodes.length,
    includedNodes: 0,
    originalEdges: s.edges.length,
    includedEdges: 0,
    originalChars: o.length,
    limit: Xo
  }, y = () => JSON.stringify({ nodes: c, edges: d, _truncated: f });
  for (const h of s.nodes)
    if (c.push(h), f.includedNodes = c.length, y().length > Xo) {
      c.pop(), f.includedNodes = c.length;
      break;
    }
  const p = new Set(c.map((h) => String(h.id ?? "")));
  for (const h of s.edges)
    if (!(!p.has(String(h.source ?? "")) || !p.has(String(h.target ?? ""))) && (d.push(h), f.includedEdges = d.length, y().length > Xo)) {
      d.pop(), f.includedEdges = d.length;
      break;
    }
  return y();
}
function cS(a, i) {
  const s = oy(a), o = ly(i, a);
  return `You are Graph Copilot, the agent embedded in CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and repair graphs on the user's canvas through typed GraphOps, run canvas-isolated experiments when explicitly authorized, optimize against measured metrics, and turn observations into testable research hypotheses.

## Operating principles
- You are an agent. Keep working, across as many tool rounds as needed, until the request is fully handled; only then reply. Never end with a half-built graph unless you are truly blocked, and then say exactly what is missing and why.
- Ground every claim in tool results from this conversation. Never invent node types, port names, param values, or experiment numbers.
- Bias to action. Canvas edits are reversible (one batch = one undo step), so plan briefly and build instead of asking permission. Ask first only when the request is ambiguous in a way that changes what you would build, or before destructive or costly actions (clear_graph, executing experiments).
- When a tool result contradicts your assumption, the tool result wins — re-plan from it.
- Values shown as [REDACTED] are secrets deliberately hidden from you. Never guess, fabricate, echo, or overwrite them unless the user supplies a new value in chat.

## How to build (follow in order)
1. Plan — 1-2 sentences naming the nodes you intend and the data/control flow between them. For a COMPLEX build (roughly 8+ nodes or several subsystems), first call research with 2-4 independent sub-questions (e.g. data pipeline / model / training loop) and fold the answers into the plan.
2. Look up schemas — call get_node_schemas for every node type you plan to touch. Port and param names must come from schemas or the current graph, never from memory.
3. Build — apply_graph_operations in small batches (add_node with a "ref", connect, set_params), ending each structural batch with one auto_layout. Prefer several small batches over one enormous batch.
4. Verify — call validate_graph, fix every reported error with more operations, and validate again. Repeat until it reports "valid": true.
5. Run — ONLY when the user asked to run, train, or evaluate: call run_graph (the user confirms it first). It executes the live canvas graph on the backend and streams node statuses and training progress into the panel. Long training runs are normal — wait for the result; never cancel or restart one on your own.
6. Report — summarize what changed in 1-2 sentences, in the user's language. After a run, report the returned metrics exactly (final loss, eval scalars, generated text), plus failures if any. When the result carries media entries (clips from VideoWrite, rollout videos), say so and name the url — the panel plays the clip inline right under the run stage.

## Recovering from errors
- Failing ops are skipped and reported per index; the other ops in the batch DID apply. Re-send only corrected versions of the failed ops — re-sending the whole batch duplicates nodes.
- Read each error message and fix its cause: a wrong port name (re-check schemas), a wrong node id (use the "refs" map or "node_id" from the previous result, or get_current_graph), or an out-of-range param.
- "ref" aliases exist only inside their own batch. In later batches, use real node ids.
- After two failed attempts at the same fix, step back: re-read the current graph, question the plan, and try a different construction rather than repeating the same edit.

## Completion contract
A build/edit request is done only when every REQUIRED input is connected, params respect their declared types and ranges, and validate_graph returned "valid": true for the current revision. If you cannot get there, state plainly that the graph is not runnable yet and list the remaining errors — never present an unvalidated graph as success.

## Experiments and research
When the user asks to test, compare, optimize, ablate, or explore research ideas:
1. Before proposing runs, state a falsifiable hypothesis, ONE numeric metric, and its direction (maximize or minimize). Never invent or extrapolate a measured result.
2. Pick the right tool: run_graph_experiments for explicit comparisons and structural ablations; optimize_graph_parameters for searches over existing int/float/bool/select params, as a complete small grid or a uint32-seeded random plan (the seed makes planning repeatable; it does NOT seed graph execution). Never optimize secret/file/tensor/unknown params.
3. Design for evidence: include an explicit baseline plus focused variants, change one factor at a time, and use at least 3 repetitions when the user wants reliable evidence — otherwise label the result a pilot. Repetitions reuse the same candidate graph; do not call them independent seeds unless the graph itself randomizes or exposes a seed schedule. Include seed controls and held-out evaluation when the graph exposes them.
4. Respect cost and consent: both tools share one UI confirmation and a 16-execution budget per turn, and a chat instruction alone is never consent. Candidate graphs are canvas-isolated but NOT side-effect-free — nodes may write files, call networks, or spend API/GPU budget. State the planned run count before the confirmation appears.
5. Set apply_best=true only when the user explicitly asked to optimize or apply the winner. Promotion is parameter-only and refuses if the live graph changed mid-study; structural winners stay proposals for review.
6. Report faithfully: the unique winner or the exact tie, effect sizes as measured, failures and variance limits, and the next experiment a stronger claim would need. Experiment output is evidence, not proof — no novelty or significance claims without enough independent runs and an appropriate test.
7. Training-process research (LR / architecture / data sensitivity of LM training): scale the pipeline to the study, not the other way around — a small CausalLMModel (d_model 128-384, 2-6 layers) over a capped LMTokenizedDataset (max_tokens a few million, matching max_steps) trains in minutes per run. Set timeout_minutes on the study to fit one run (per-run cap, up to 60). Vary exactly one knob per variant (an lr sweep via optimize_graph_parameters; an architecture or data A/B via run_graph_experiments; seed replication by varying CausalLMModel.seed). Rank on PerplexityEvaluate.val_loss (minimize) over a fixed held-out token set, and read training dynamics from the metric series (train_loss_batch, lr) the runs record.
8. VLA (vision-language-action) research runs on the PushWorld family and follows one canonical chain: Start -> PushWorldEnv -> PushWorldDemos -> DataLoader -> TrainingLoop, with VLAModel supplying BOTH the model and the loss_fn (they are mode-matched by construction — never wire a generic loss to a VLA head), then VLARollout (env + trained model) for closed-loop success_rate and VLAActionEval (holdout) for open-loop MSE, and VideoWrite on PushWorldDemos.demo_video or VLARollout.frames so the run produces a playable clip. Keep chunk equal between PushWorldDemos and VLAModel, image_size equal between PushWorldEnv and VLAModel, and keep demo_noise on (its default) — it is the recovery data closed-loop control needs. The head paradigm (head_type: flow_matching vs regression), execute_k (receding horizon), instruction_mode=swapped (the language-grounding ablation), and vision_stem are the sanctioned research knobs; success_rate is the headline metric, and the swapped-vs-normal gap is the language-grounding evidence.

## Graph model
Each node has a type (the bare name from the index), typed input/output ports, and params. Edges connect an output handle to an input handle; the connected data types must be compatible. Some pipelines need a control-flow trigger from a Start node (connect with source_handle "trigger").

## Rules
- Use the exact node-type name from the index — the bare name only (e.g. Dataset), never the trailing "[category: ...]" tag.
- run_graph executes the user's real graph with real side effects (files, network, GPU). Use it for "run it / train it" requests after validation passes; use run_graph_experiments for comparisons. One run at a time.
- Connect every REQUIRED input of nodes you add; validate_graph reports the ones you missed.
- Never use clear_graph unless the user explicitly asked to start over.
- Do not remove or rewire nodes the user built unless the request requires it — and say so when you do.
- list_runs / get_run read the host's run history — including runs started from the editor's own Run button. Use them when asked about past or ongoing runs; report their numbers exactly. They are server truth, not memory.

## Style
- Reply in the user's language.
- Match the shape of the request: a question gets a direct answer; a build gets a brief plan, the work, and a 1-2 sentence summary of what changed. No filler openers, no restating the request.
- Use \`code\` for node types, ports, and params; keep paragraphs and lists short; skip headings unless the reply is genuinely long.
- Present measured numbers exactly as reported, with the metric name and direction.

## Node catalog index (NodeName [Category] - description). Call get_node_schemas for exact ports/params.
${s}

## Current graph
${o}`;
}
const uS = "graph-copilot", dS = "0.3.0";
function ul(a) {
  if (a.length === 0 || a.some((c) => !Number.isFinite(c)))
    return;
  let i = 0, s = 0;
  if (a.forEach((c, d) => {
    const f = d + 1, y = c - i;
    i += y / f;
    const p = c - i;
    s += y * p;
  }), !Number.isFinite(i) || !Number.isFinite(s))
    return;
  const o = a.length < 2 ? 0 : s / (a.length - 1);
  if (Number.isFinite(o))
    return { mean: i, variance: Math.max(0, o) };
}
function ea(a) {
  var i;
  return (i = ul(a)) == null ? void 0 : i.mean;
}
function El(a) {
  if (a.length < 2) return;
  const i = ul(a);
  if (!i) return;
  const s = Math.sqrt(i.variance);
  return Number.isFinite(s) ? s : void 0;
}
function tl(a) {
  const i = [
    676.5203681218851,
    -1259.1392167224028,
    771.3234287776531,
    -176.6150291621406,
    12.507343278686905,
    -0.13857109526572012,
    9984369578019572e-21,
    15056327351493116e-23
  ];
  if (a < 0.5)
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * a)) - tl(1 - a);
  let s = 0.9999999999998099;
  const o = a - 1;
  i.forEach((d, f) => {
    s += d / (o + f + 1);
  });
  const c = o + i.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (o + 0.5) * Math.log(c) - c + Math.log(s);
}
function eg(a, i, s) {
  const f = a + i, y = a + 1, p = a - 1;
  let h = 1, b = 1 - f * s / y;
  Math.abs(b) < 1e-300 && (b = 1e-300), b = 1 / b;
  let v = b;
  for (let S = 1; S <= 200; S += 1) {
    const A = 2 * S;
    let O = S * (i - S) * s / ((p + A) * (a + A));
    b = 1 + O * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + O / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b, v *= b * h, O = -((a + S) * (f + S) * s) / ((a + A) * (y + A)), b = 1 + O * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + O / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b;
    const E = b * h;
    if (v *= E, Math.abs(E - 1) <= 3e-14) break;
  }
  return v;
}
function fS(a, i, s) {
  if (a <= 0) return 0;
  if (a >= 1) return 1;
  const o = Math.exp(
    tl(i + s) - tl(i) - tl(s) + i * Math.log(a) + s * Math.log1p(-a)
  );
  return a < (i + 1) / (i + s + 2) ? o * eg(i, s, a) / i : 1 - o * eg(s, i, 1 - a) / s;
}
function tg(a, i) {
  if (a === 0) return 0.5;
  const s = i / (i + a * a), o = 0.5 * fS(
    s,
    i / 2,
    0.5
  );
  return a > 0 ? 1 - o : o;
}
function pS(a) {
  if (!Number.isInteger(a) || a < 1) return;
  const i = 0.975;
  let s = 0, o = 1;
  for (; tg(o, a) < i && o < 1e6; ) o *= 2;
  if (!(o >= 1e6)) {
    for (let c = 0; c < 100; c += 1) {
      const d = (s + o) / 2;
      tg(d, a) < i ? s = d : o = d;
    }
    return (s + o) / 2;
  }
}
function cy(a) {
  if (a.length < 2) return;
  const i = ea(a), s = El(a), o = a.length - 1, c = pS(o);
  if (i === void 0 || s === void 0 || c === void 0)
    return;
  const d = c * s / Math.sqrt(a.length), f = i - d, y = i + d;
  if ([d, f, y].every(Number.isFinite))
    return {
      confidenceLevel: 0.95,
      degreesOfFreedom: o,
      mean: i,
      margin: d,
      lower: f,
      upper: y
    };
}
const Ad = cy;
function mS(a, i) {
  if (a.length < 2 || i.length < 2) return;
  const s = ul(a), o = ul(i);
  if (!s || !o) return;
  const c = a.length + i.length - 2, d = ((a.length - 1) * s.variance + (i.length - 1) * o.variance) / c;
  if (!Number.isFinite(d) || d <= 0) return;
  const f = (s.mean - o.mean) / Math.sqrt(d), y = 1 - 3 / (4 * c - 1), p = f * y;
  return Number.isFinite(p) ? p : void 0;
}
function ms(a, i, s) {
  const o = ea(a), c = ea(i);
  if (o === void 0 || c === void 0) return;
  const d = o - c, f = s === "maximize" ? d : -d;
  if (!Number.isFinite(d) || !Number.isFinite(f)) return;
  const y = mS(a, i);
  return {
    baselineMean: c,
    candidateMean: o,
    rawDelta: d,
    improvement: f,
    hedgesG: y,
    directionAdjustedHedgesG: y === void 0 ? void 0 : s === "maximize" ? y : -y
  };
}
const hS = [
  "study_id",
  "created_at",
  "hypothesis",
  "objective_metric",
  "direction",
  "variant_id",
  "variant_label",
  "repetition",
  "status",
  "metric_key",
  "metric_value",
  "runtime_ms",
  "seed",
  "error"
];
function Jo(a) {
  return a !== void 0 && Number.isFinite(a) ? String(a) : "";
}
function gS(a) {
  return /^[\t\r\n ]*[=+\-@]/.test(a) ? `'${a}` : a;
}
function yS(a) {
  const i = gS(a);
  return /[",\r\n]/.test(i) ? `"${i.replace(/"/g, '""')}"` : i;
}
function vS(a) {
  const i = [hS.slice()];
  return a.runs.forEach((s) => {
    i.push([
      a.id,
      a.createdAt,
      a.hypothesis,
      a.objective.metric,
      a.objective.direction,
      s.variantId,
      s.variantLabel,
      Jo(s.repetition),
      s.status,
      s.metricKey ?? "",
      Jo(s.metricValue),
      Jo(s.runtimeMs),
      s.seed === void 0 ? "" : typeof s.seed == "number" ? Jo(s.seed) : s.seed,
      s.error ?? ""
    ]);
  }), i.map((s) => s.map(yS).join(",")).join(`\r
`);
}
function Ca(a) {
  return Object.is(a, -0) || a === 0 ? "0" : Number(a.toPrecision(6)).toString();
}
function Nn(a) {
  return a.replace(/[\r\n]+/g, " ").replace(/`/g, "'").trim();
}
function bS(a) {
  const i = /* @__PURE__ */ new Map();
  return a.runs.forEach((s) => {
    let o = i.get(s.variantId);
    o || (o = {
      id: s.variantId,
      label: s.variantLabel || s.variantId,
      usableValues: [],
      unusableRuns: 0
    }, i.set(s.variantId, o)), s.status === "completed" && Number.isFinite(s.metricValue) ? o.usableValues.push(s.metricValue) : o.unusableRuns += 1;
  }), [...i.values()];
}
function SS(a) {
  var y;
  const i = bS(a), s = i.find((p) => p.id === a.baselineVariantId), o = [], c = [
    `# Research report: ${Nn(a.id)}`,
    "",
    "## Study question",
    "",
    `- Hypothesis under test: ${Nn(a.hypothesis)}`,
    `- Objective: ${a.objective.direction} \`${Nn(a.objective.metric)}\`.`,
    `- Recorded evidence: ${a.runs.length} run(s) across ${i.length} variant(s).`,
    "",
    "## Observations",
    ""
  ];
  i.length === 0 && (c.push("- **[Observation]** No run records were available."), o.push("No run records were available for analysis.")), i.forEach((p) => {
    const h = ea(p.usableValues), b = El(p.usableValues), v = cy(p.usableValues), S = [`n=${p.usableValues.length}`];
    if (h !== void 0 && S.push(`mean=${Ca(h)}`), b !== void 0 && S.push(`sample SD=${Ca(b)}`), v ? S.push(`95% Student-t CI=[${Ca(v.lower)}, ${Ca(v.upper)}]`) : S.push("95% Student-t CI=unavailable"), s && p.id !== s.id) {
      const A = ms(
        p.usableValues,
        s.usableValues,
        a.objective.direction
      );
      A && (S.push(`raw delta vs ${Nn(s.label)}=${Ca(A.rawDelta)}`), S.push(`direction-adjusted improvement=${Ca(A.improvement)}`), A.hedgesG !== void 0 && S.push(`Hedges g=${Ca(A.hedgesG)}`));
    }
    c.push(`- **[Observation] ${Nn(p.label)}:** ${S.join("; ")}.`), p.usableValues.length < 2 && o.push(
      `${p.label} has fewer than two finite completed observations; variability and a confidence interval are unavailable.`
    ), p.unusableRuns > 0 && o.push(
      `${p.label} has ${p.unusableRuns} run(s) excluded because they failed, were incomplete, or had a non-finite objective value.`
    );
  }), a.baselineVariantId && !s && o.push(`Baseline variant '${a.baselineVariantId}' was not present in the run records.`);
  const d = s ? i.filter((p) => p.id !== s.id).map((p) => ({
    variant: p,
    comparison: ms(
      p.usableValues,
      s.usableValues,
      a.objective.direction
    )
  })).filter((p) => p.comparison !== void 0).sort((p, h) => h.comparison.improvement - p.comparison.improvement) : [];
  c.push(
    "",
    "## Claims and interpretation",
    "",
    "- **[Claim status]** The hypothesis remains a claim under test. These descriptive observations alone do not establish causality, robustness, or external validity."
  ), d[0] ? c.push(
    `- **[Candidate claim]** ${Nn(d[0].variant.label)} had the strongest observed direction-adjusted change versus the baseline (${Ca(d[0].comparison.improvement)}); confirm it with a pre-registered, independently replicated study before treating it as a conclusion.`
  ) : c.push("- **[Candidate claim]** No baseline comparison had enough finite evidence to nominate a directional result.");
  const f = [...a.warnings ?? [], ...o];
  return c.push("", "## Warnings", ""), f.length === 0 ? c.push("- None recorded.") : f.forEach((p) => c.push(`- **[Warning]** ${Nn(p)}`)), c.push("", "## Paper leads", ""), (y = a.paperLeads) != null && y.length ? a.paperLeads.forEach((p) => {
    c.push(
      `- **[Paper lead] ${Nn(p.title)}** — Evidence: ${Nn(p.evidence)} Next study: ${Nn(p.nextStep)}`
    );
  }) : c.push("- None recorded."), c.join(`
`);
}
const Nd = "codefyui.graph-copilot.study", dl = 1, rd = "plugin-canonical-v1", fl = 5 * 1024 * 1024, ng = 64, ag = 1e5, ig = 64 * 1024, is = 1e4, hs = 8, _S = 16, ES = 5e3, xS = 1e4, sd = 1e3, wd = 512, AS = 40, NS = 256, Qo = 1e3, qe = 512, Mt = 32 * 1024;
class hn extends Error {
  constructor(s, o) {
    super(o);
    on(this, "code");
    this.name = "StudyBundleError", this.code = s;
  }
}
function ne(a, i, s) {
  throw new hn(a, `${i}: ${s}`);
}
function uy(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const i = Object.getPrototypeOf(a);
  return i === Object.prototype || i === null;
}
function od(a, i, s, o) {
  if (s > ng && ne("LIMIT_EXCEEDED", i, `maximum depth is ${ng}`), o.values += 1, o.values > ag && ne("LIMIT_EXCEEDED", i, `maximum value count is ${ag}`), a === null) return "null";
  if (typeof a == "boolean") return a ? "true" : "false";
  if (typeof a == "number")
    return Number.isFinite(a) || ne("INVALID_VALUE", i, "numbers must be finite"), JSON.stringify(a);
  if (typeof a == "string")
    return a.length > ig && ne(
      "LIMIT_EXCEEDED",
      i,
      `maximum string length is ${ig}`
    ), JSON.stringify(a);
  (typeof a != "object" || a === void 0) && ne("INVALID_VALUE", i, `unsupported JSON value ${typeof a}`), o.stack.has(a) && ne("INVALID_VALUE", i, "cyclic values are not allowed"), o.stack.add(a);
  try {
    if (Array.isArray(a)) {
      a.length > is && ne(
        "LIMIT_EXCEEDED",
        i,
        `maximum collection size is ${is}`
      );
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || ne("INVALID_VALUE", `${i}/${d}`, "sparse arrays are not allowed");
      return `[${a.map((d, f) => od(
        d,
        `${i}/${f}`,
        s + 1,
        o
      )).join(",")}]`;
    }
    uy(a) || ne("INVALID_VALUE", i, "objects must be plain JSON objects");
    const c = Object.keys(a).sort();
    return c.length > is && ne(
      "LIMIT_EXCEEDED",
      i,
      `maximum collection size is ${is}`
    ), `{${c.map((d) => (d.length > qe && ne("LIMIT_EXCEEDED", i, `object key exceeds ${qe} characters`), `${JSON.stringify(d)}:${od(
      a[d],
      `${i}/${xl(d)}`,
      s + 1,
      o
    )}`)).join(",")}}`;
  } finally {
    o.stack.delete(a);
  }
}
function nr(a) {
  return od(a, "$", 0, { values: 0, stack: /* @__PURE__ */ new WeakSet() });
}
function wS(a) {
  return new TextEncoder().encode(a).byteLength;
}
function jd(a) {
  const i = wS(a);
  if (i > fl)
    throw new hn(
      "BUNDLE_TOO_LARGE",
      `Study bundle is ${i} bytes; maximum is ${fl}`
    );
}
async function dy(a) {
  var o;
  const i = (o = globalThis.crypto) == null ? void 0 : o.subtle;
  if (!i)
    throw new hn(
      "CRYPTO_UNAVAILABLE",
      "Web Crypto SHA-256 is unavailable in this environment"
    );
  const s = await i.digest("SHA-256", new TextEncoder().encode(a));
  return [...new Uint8Array(s)].map((c) => c.toString(16).padStart(2, "0")).join("");
}
function Se(a, i) {
  return uy(a) || ne("INVALID_BUNDLE", i, "expected an object"), a;
}
function De(a, i, s, o) {
  const c = new Set(i);
  for (const d of Object.keys(a))
    c.has(d) || ne("INVALID_BUNDLE", `${o}/${xl(d)}`, "unknown property");
  for (const d of s)
    Object.prototype.hasOwnProperty.call(a, d) || ne("INVALID_BUNDLE", o, `missing required property '${d}'`);
}
function Ze(a, i, s = is) {
  return Array.isArray(a) || ne("INVALID_BUNDLE", i, "expected an array"), a.length > s && ne("LIMIT_EXCEEDED", i, `maximum item count is ${s}`), a;
}
function Ee(a, i, s = qe, o = !1) {
  return typeof a != "string" && ne("INVALID_BUNDLE", i, "expected a string"), (!o && !a.trim() || a.length > s) && ne(
    a.length > s ? "LIMIT_EXCEEDED" : "INVALID_BUNDLE",
    i,
    a.length > s ? `maximum length is ${s}` : "must not be empty"
  ), /\u0000/.test(a) && ne("INVALID_BUNDLE", i, "NUL characters are not allowed"), a;
}
function mt(a, i) {
  return (typeof a != "number" || !Number.isFinite(a)) && ne("INVALID_BUNDLE", i, "expected a finite number"), a;
}
function gs(a, i, s, o) {
  const c = mt(a, i);
  return (!Number.isInteger(c) || c < s || c > o) && ne("INVALID_BUNDLE", i, `expected an integer from ${s} to ${o}`), c;
}
function fy(a, i) {
  return typeof a != "boolean" && ne("INVALID_BUNDLE", i, "expected a boolean"), a;
}
function ta(a, i, s) {
  return (typeof a != "string" || !i.includes(a)) && ne("INVALID_BUNDLE", s, `expected one of: ${i.join(", ")}`), a;
}
function ys(a, i) {
  const s = Ee(a, i, 64);
  return (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(s) || Number.isNaN(Date.parse(s)) || new Date(s).toISOString() !== s) && ne("INVALID_BUNDLE", i, "expected a canonical ISO-8601 UTC timestamp"), s;
}
function ke(a, i) {
  const s = Ee(a, i, 256);
  return (s !== s.trim() || /[\u0000-\u001f\u007f]/.test(s)) && ne("INVALID_BUNDLE", i, "id must be trimmed and contain no control characters"), s;
}
function gn(a, i, s) {
  new Set(a).size !== a.length && ne("INVALID_BUNDLE", i, `${s} must be unique`);
}
function ye(a, i) {
  return Object.prototype.hasOwnProperty.call(a, i);
}
function xl(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function ci(a, i) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((o, c) => ci(o, `${i}/${c}`));
    return;
  }
  const s = Se(a, i);
  if (ye(s, "$gcpSecretRef")) {
    De(s, ["$gcpSecretRef"], ["$gcpSecretRef"], i), ke(s.$gcpSecretRef, `${i}/$gcpSecretRef`);
    return;
  }
  for (const [o, c] of Object.entries(s))
    ci(c, `${i}/${xl(o)}`);
}
function py(a, i) {
  const s = Se(a, i);
  De(s, ["x", "y"], ["x", "y"], i), mt(s.x, `${i}/x`), mt(s.y, `${i}/y`);
}
function jS(a, i) {
  const s = Se(a, i);
  De(
    s,
    ["nodes", "edges", "presets", "segmentGroups", "name", "description"],
    ["nodes", "edges"],
    i
  );
  const o = Ze(s.nodes, `${i}/nodes`, ES), c = [];
  o.forEach((p, h) => {
    const b = `${i}/nodes/${h}`, v = Se(p, b);
    De(v, ["id", "type", "position", "data"], ["id", "type", "position", "data"], b), c.push(ke(v.id, `${b}/id`)), Ee(v.type, `${b}/type`, qe), py(v.position, `${b}/position`);
    const S = Se(v.data, `${b}/data`);
    ci(S, `${b}/data`);
  }), gn(c, `${i}/nodes`, "node ids");
  const d = new Set(c), f = Ze(s.edges, `${i}/edges`, xS), y = [];
  f.forEach((p, h) => {
    const b = `${i}/edges/${h}`, v = Se(p, b);
    De(
      v,
      ["id", "source", "target", "sourceHandle", "targetHandle", "type"],
      ["id", "source", "target", "sourceHandle", "targetHandle"],
      b
    ), y.push(ke(v.id, `${b}/id`));
    const S = ke(v.source, `${b}/source`), A = ke(v.target, `${b}/target`);
    d.has(S) || ne("INVALID_BUNDLE", `${b}/source`, "unknown source node"), d.has(A) || ne("INVALID_BUNDLE", `${b}/target`, "unknown target node"), Ee(v.sourceHandle, `${b}/sourceHandle`, qe, !0), Ee(v.targetHandle, `${b}/targetHandle`, qe, !0), ye(v, "type") && ta(v.type, ["data", "trigger"], `${b}/type`);
  }), gn(y, `${i}/edges`, "edge ids"), ye(s, "presets") && Ze(s.presets, `${i}/presets`).forEach((h, b) => ci(h, `${i}/presets/${b}`)), ye(s, "segmentGroups") && ci(s.segmentGroups, `${i}/segmentGroups`), ye(s, "name") && Ee(s.name, `${i}/name`, qe, !0), ye(s, "description") && Ee(s.description, `${i}/description`, Mt, !0);
}
function rg(a, i) {
  const s = Se(a, i);
  ci(s, i);
}
function $S(a, i) {
  const s = Se(a, i);
  switch (ta(
    s.op,
    ["add_node", "connect", "set_params", "remove_node", "remove_edge", "clear_graph", "auto_layout"],
    `${i}/op`
  )) {
    case "add_node":
      De(s, ["op", "node_type", "ref", "params", "position"], ["op", "node_type"], i), Ee(s.node_type, `${i}/node_type`, qe), ye(s, "ref") && ke(s.ref, `${i}/ref`), ye(s, "params") && rg(s.params, `${i}/params`), ye(s, "position") && py(s.position, `${i}/position`);
      return;
    case "connect":
      De(
        s,
        ["op", "source", "source_handle", "target", "target_handle"],
        ["op", "source", "source_handle", "target", "target_handle"],
        i
      ), ke(s.source, `${i}/source`), Ee(s.source_handle, `${i}/source_handle`, qe, !0), ke(s.target, `${i}/target`), Ee(s.target_handle, `${i}/target_handle`, qe, !0);
      return;
    case "set_params":
      De(s, ["op", "node_id", "params"], ["op", "node_id", "params"], i), ke(s.node_id, `${i}/node_id`), rg(s.params, `${i}/params`);
      return;
    case "remove_node":
      De(s, ["op", "node_id"], ["op", "node_id"], i), ke(s.node_id, `${i}/node_id`);
      return;
    case "remove_edge":
      De(
        s,
        ["op", "source", "target", "source_handle", "target_handle"],
        ["op", "source", "target"],
        i
      ), ke(s.source, `${i}/source`), ke(s.target, `${i}/target`), ye(s, "source_handle") && Ee(s.source_handle, `${i}/source_handle`, qe, !0), ye(s, "target_handle") && Ee(s.target_handle, `${i}/target_handle`, qe, !0);
      return;
    case "clear_graph":
    case "auto_layout":
      De(s, ["op"], ["op"], i);
  }
}
function MS(a, i) {
  const s = Se(a, i);
  De(
    s,
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    i
  ), ke(s.pluginId, `${i}/pluginId`), Ee(s.pluginVersion, `${i}/pluginVersion`, 128), gs(s.codefyuiApiVersion, `${i}/codefyuiApiVersion`, 1, 1e3);
}
function TS(a, i) {
  const s = Se(a, i);
  De(s, ["facts"], ["facts"], i);
  const o = Ze(s.facts, `${i}/facts`, NS), c = [];
  o.forEach((d, f) => {
    const y = `${i}/facts/${f}`, p = Se(d, y);
    De(p, ["key", "status", "source", "collectedAt", "value"], ["key", "status", "source"], y), c.push(Ee(p.key, `${y}/key`, qe));
    const h = ta(
      p.status,
      ["observed", "declared", "unavailable"],
      `${y}/status`
    );
    Ee(p.source, `${y}/source`, qe), ye(p, "collectedAt") && ys(p.collectedAt, `${y}/collectedAt`);
    const b = ye(p, "value");
    if (h === "unavailable" && b && ne("INVALID_BUNDLE", `${y}/value`, "unavailable facts must not contain a value"), h !== "unavailable" && !b && ne("INVALID_BUNDLE", y, `${h} facts require a value`), b) {
      ci(p.value, `${y}/value`);
      const v = /* @__PURE__ */ new Map();
      vs(p.value, `${y}/value`, v), v.size > 0 && ne(
        "INVALID_BUNDLE",
        `${y}/value`,
        "SecretRefs are allowed only in the replayable study spec"
      );
    }
  }), gn(c, `${i}/facts`, "provenance fact keys");
}
function OS(a, i) {
  const s = Se(a, i);
  De(
    s,
    [
      "hypothesis",
      "baseline",
      "objective",
      "repetitions",
      "concurrency",
      "applyBestRequested",
      "variants"
    ],
    [
      "hypothesis",
      "baseline",
      "objective",
      "repetitions",
      "concurrency",
      "applyBestRequested",
      "variants"
    ],
    i
  ), Ee(s.hypothesis, `${i}/hypothesis`, Mt), jS(s.baseline, `${i}/baseline`);
  const o = Se(s.objective, `${i}/objective`);
  De(o, ["metric", "direction"], ["metric", "direction"], `${i}/objective`), Ee(o.metric, `${i}/objective/metric`, qe), ta(o.direction, ["maximize", "minimize"], `${i}/objective/direction`), gs(s.repetitions, `${i}/repetitions`, 1, 5), gs(s.concurrency, `${i}/concurrency`, 1, 2), fy(s.applyBestRequested, `${i}/applyBestRequested`);
  const c = Ze(s.variants, `${i}/variants`, hs);
  c.length === 0 && ne("INVALID_BUNDLE", `${i}/variants`, "at least one variant is required");
  const d = [];
  c.forEach((f, y) => {
    const p = `${i}/variants/${y}`, h = Se(f, p);
    De(h, ["id", "label", "operations"], ["id", "label", "operations"], p), d.push(ke(h.id, `${p}/id`)), Ee(h.label, `${p}/label`, qe), Ze(
      h.operations,
      `${p}/operations`,
      sd
    ).forEach((v, S) => {
      $S(v, `${p}/operations/${S}`);
    });
  }), gn(d, `${i}/variants`, "variant ids");
}
function CS(a, i) {
  const s = Se(a, i);
  De(s, ["phase", "code", "message"], ["phase", "code", "message"], i), ta(s.phase, ["prepare", "validate", "execute", "metric", "cancel"], `${i}/phase`), Ee(s.code, `${i}/code`, qe), Ee(s.message, `${i}/message`, Mt);
}
function DS(a, i, s) {
  const o = Ze(a, s, _S), c = Se(i.spec, "/payload/spec"), d = Ze(c.variants, "/payload/spec/variants", hs), f = new Set(d.map((b, v) => ke(
    Se(b, `/payload/spec/variants/${v}`).id,
    `/payload/spec/variants/${v}/id`
  ))), y = gs(c.repetitions, "/payload/spec/repetitions", 1, 5), p = [], h = [];
  o.forEach((b, v) => {
    const S = `${s}/${v}`, A = Se(b, S);
    De(
      A,
      [
        "runKey",
        "runId",
        "graphId",
        "variantId",
        "repetition",
        "status",
        "startedAt",
        "completedAt",
        "durationMs",
        "metrics",
        "error"
      ],
      ["runKey", "variantId", "repetition", "status", "durationMs", "metrics"],
      S
    );
    const O = ke(A.runKey, `${S}/runKey`);
    p.push(O), ye(A, "runId") && ke(A.runId, `${S}/runId`), ye(A, "graphId") && ke(A.graphId, `${S}/graphId`);
    const E = ke(A.variantId, `${S}/variantId`);
    f.has(E) || ne("INVALID_BUNDLE", `${S}/variantId`, "unknown variant id");
    const L = gs(A.repetition, `${S}/repetition`, 1, y);
    h.push(`${E}\0${L}`);
    const R = ta(
      A.status,
      ["completed", "failed", "cancelled"],
      `${S}/status`
    );
    ye(A, "startedAt") && ys(A.startedAt, `${S}/startedAt`), ye(A, "completedAt") && ys(A.completedAt, `${S}/completedAt`), ye(A, "startedAt") && ye(A, "completedAt") && Date.parse(A.completedAt) < Date.parse(A.startedAt) && ne("INVALID_BUNDLE", `${S}/completedAt`, "must not be before startedAt"), mt(A.durationMs, `${S}/durationMs`) < 0 && ne("INVALID_BUNDLE", `${S}/durationMs`, "must be non-negative");
    const q = Ze(A.metrics, `${S}/metrics`, wd), Z = [];
    q.forEach((Y, K) => {
      const V = `${S}/metrics/${K}`, de = Se(Y, V);
      De(
        de,
        ["observedKey", "canonicalKey", "value", "source"],
        ["observedKey", "canonicalKey", "value", "source"],
        V
      ), Z.push(Ee(de.observedKey, `${V}/observedKey`, qe)), Ee(de.canonicalKey, `${V}/canonicalKey`, qe), mt(de.value, `${V}/value`), ta(de.source, ["output_summary", "progress", "client"], `${V}/source`);
    }), gn(Z, `${S}/metrics`, "observed metric keys"), ye(A, "error") && CS(A.error, `${S}/error`), R === "completed" && ye(A, "error") && ne("INVALID_BUNDLE", `${S}/error`, "completed runs must not contain an error"), R !== "completed" && !ye(A, "error") && ne("INVALID_BUNDLE", S, `${R} runs require an error`);
  }), gn(p, s, "run keys"), gn(h, s, "variant/repetition slots");
}
function RS(a, i) {
  const s = Se(a, i);
  De(s, ["title", "evidence", "nextStep"], ["title", "evidence", "nextStep"], i), Ee(s.title, `${i}/title`, Mt), Ee(s.evidence, `${i}/evidence`, Mt), Ee(s.nextStep, `${i}/nextStep`, Mt);
}
function zS(a, i) {
  const s = Se(a, i);
  if (De(
    s,
    [
      "id",
      "label",
      "status",
      "metricKey",
      "metricValues",
      "mean",
      "stddev",
      "confidenceInterval95",
      "baselineComparison",
      "runtimeMs",
      "observedMetrics",
      "operationSummary",
      "errors"
    ],
    ["id", "label", "status", "metricValues", "runtimeMs", "observedMetrics", "errors"],
    i
  ), ke(s.id, `${i}/id`), Ee(s.label, `${i}/label`, qe), ta(s.status, ["completed", "invalid", "failed"], `${i}/status`), ye(s, "metricKey") && Ee(s.metricKey, `${i}/metricKey`, qe), Ze(s.metricValues, `${i}/metricValues`, 5).forEach((f, y) => {
    mt(f, `${i}/metricValues/${y}`);
  }), ye(s, "mean") && mt(s.mean, `${i}/mean`), ye(s, "stddev") && mt(s.stddev, `${i}/stddev`) < 0 && ne("INVALID_BUNDLE", `${i}/stddev`, "must be non-negative"), ye(s, "confidenceInterval95")) {
    const f = Se(s.confidenceInterval95, `${i}/confidenceInterval95`);
    De(
      f,
      ["level", "lower", "upper"],
      ["level", "lower", "upper"],
      `${i}/confidenceInterval95`
    ), f.level !== 0.95 && ne("INVALID_BUNDLE", `${i}/confidenceInterval95/level`, "must be 0.95");
    const y = mt(f.lower, `${i}/confidenceInterval95/lower`), p = mt(f.upper, `${i}/confidenceInterval95/upper`);
    y > p && ne("INVALID_BUNDLE", `${i}/confidenceInterval95`, "lower must not exceed upper");
  }
  if (ye(s, "baselineComparison")) {
    const f = Se(s.baselineComparison, `${i}/baselineComparison`);
    De(
      f,
      ["baselineId", "meanDelta", "objectiveImprovement", "hedgesG"],
      ["baselineId", "meanDelta", "objectiveImprovement"],
      `${i}/baselineComparison`
    ), ke(f.baselineId, `${i}/baselineComparison/baselineId`), mt(f.meanDelta, `${i}/baselineComparison/meanDelta`), mt(
      f.objectiveImprovement,
      `${i}/baselineComparison/objectiveImprovement`
    ), ye(f, "hedgesG") && mt(f.hedgesG, `${i}/baselineComparison/hedgesG`);
  }
  mt(s.runtimeMs, `${i}/runtimeMs`) < 0 && ne("INVALID_BUNDLE", `${i}/runtimeMs`, "must be non-negative");
  const c = Ze(s.observedMetrics, `${i}/observedMetrics`, wd), d = [];
  c.forEach((f, y) => {
    const p = `${i}/observedMetrics/${y}`, h = Se(f, p);
    De(h, ["key", "value"], ["key", "value"], p), d.push(Ee(h.key, `${p}/key`, qe)), mt(h.value, `${p}/value`);
  }), gn(d, `${i}/observedMetrics`, "derived metric keys"), ye(s, "operationSummary") && Ze(s.operationSummary, `${i}/operationSummary`, sd).forEach((f, y) => Ee(f, `${i}/operationSummary/${y}`, Mt)), Ze(s.errors, `${i}/errors`, sd).forEach((f, y) => Ee(f, `${i}/errors/${y}`, Mt));
}
function pl(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function my(a, i) {
  return Object.is(a, i) || a === i ? !0 : Math.abs(a - i) <= Number.EPSILON * 32 * Math.max(1, Math.abs(a), Math.abs(i));
}
function za(a, i, s, o) {
  const c = ye(a, i);
  if (s === void 0) {
    c && ne("INVALID_BUNDLE", `${o}/${i}`, "is not supported by the raw run evidence");
    return;
  }
  c || ne("INVALID_BUNDLE", o, `${i} is required by the raw run evidence`);
  const d = mt(a[i], `${o}/${i}`);
  my(d, s) || ne("INVALID_BUNDLE", `${o}/${i}`, `does not match raw run evidence (expected ${s})`);
}
function LS(a, i, s) {
  const o = a.metrics.filter((d) => d.canonicalKey === i);
  if (o.length < 2) return;
  const c = o[0].value;
  o.some((d) => d.value !== c) && ne(
    "INVALID_BUNDLE",
    `${s}/metrics`,
    `conflicting duplicate samples resolve to objective identity '${i}'`
  );
}
function hy(a, i, s) {
  const o = [...a.metrics];
  if (o.length === 0) return;
  const c = (b) => (LS(a, b.canonicalKey, s), { key: b.canonicalKey, value: b.value }), d = (b) => new Set(b.map((S) => S.canonicalKey)).size === 1 && b.length > 0 ? c(b[0]) : void 0, f = i.metric.trim(), y = o.find((b) => b.observedKey === f) ?? o.find((b) => b.observedKey.toLowerCase() === f.toLowerCase());
  if (y) return c(y);
  if (f && f.toLowerCase() !== "auto") {
    const b = pl(f);
    return d(o.filter((v) => {
      const S = pl(v.observedKey);
      return S === b || S.endsWith(`.${b}`);
    }));
  }
  const p = i.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = o.filter((b) => p.test(b.observedKey));
  return h.length > 0 ? d(h) : i.direction === "minimize" ? d(o.filter((b) => /(^|\.)runtime_ms$/i.test(b.observedKey))) : void 0;
}
function US(a, i, s) {
  const o = Ze(a.metricValues, `${s}/metricValues`, 5).map((c, d) => mt(c, `${s}/metricValues/${d}`));
  (o.length !== i.length || o.some((c, d) => c !== i[d])) && ne("INVALID_BUNDLE", `${s}/metricValues`, "does not match completed raw run evidence");
}
function gy(a) {
  const i = /* @__PURE__ */ new Map();
  for (const s of a)
    for (const o of s.metrics) {
      const c = i.get(o.observedKey) ?? [];
      c.push(o.value), i.set(o.observedKey, c);
    }
  return [...i.entries()].sort(([s], [o]) => s.localeCompare(o)).slice(0, AS).map(([s, o]) => ({ key: s, value: ea(o) }));
}
function VS(a, i, s) {
  const o = Ze(
    a.observedMetrics,
    `${s}/observedMetrics`,
    wd
  ).map((c, d) => {
    const f = Se(c, `${s}/observedMetrics/${d}`);
    return {
      key: Ee(f.key, `${s}/observedMetrics/${d}/key`, qe),
      value: mt(f.value, `${s}/observedMetrics/${d}/value`)
    };
  });
  (o.length !== i.length || o.some((c, d) => c.key !== i[d].key || !my(c.value, i[d].value))) && ne("INVALID_BUNDLE", `${s}/observedMetrics`, "does not match raw run evidence");
}
function BS(a, i, s, o) {
  const c = s ? Ad(i) : void 0;
  if (!c) {
    ye(a, "confidenceInterval95") && ne(
      "INVALID_BUNDLE",
      `${o}/confidenceInterval95`,
      "is not supported by the raw run evidence"
    );
    return;
  }
  ye(a, "confidenceInterval95") || ne("INVALID_BUNDLE", o, "confidenceInterval95 is required by the raw run evidence");
  const d = Se(a.confidenceInterval95, `${o}/confidenceInterval95`);
  za(d, "lower", c.lower, `${o}/confidenceInterval95`), za(d, "upper", c.upper, `${o}/confidenceInterval95`);
}
function kS(a, i, s, o) {
  if (!i) {
    ye(a, "baselineComparison") && ne("INVALID_BUNDLE", `${o}/baselineComparison`, "is not supported by the raw run evidence");
    return;
  }
  ye(a, "baselineComparison") || ne("INVALID_BUNDLE", o, "baselineComparison is required by the raw run evidence");
  const c = Se(a.baselineComparison, `${o}/baselineComparison`);
  c.baselineId !== s && ne("INVALID_BUNDLE", `${o}/baselineComparison/baselineId`, "does not match the evidence baseline"), za(c, "meanDelta", i.rawDelta, `${o}/baselineComparison`), za(
    c,
    "objectiveImprovement",
    i.improvement,
    `${o}/baselineComparison`
  ), za(c, "hedgesG", i.hedgesG, `${o}/baselineComparison`);
}
function HS(a, i, s) {
  const o = i.spec, c = i.runs, f = a.variants.map((E, L) => {
    var ve;
    const R = `${s}/variants/${L}`, j = Se(E, R), q = j.id, Z = j.label, Y = c.filter((M) => M.variantId === q).sort((M, J) => M.repetition - J.repetition || M.runKey.localeCompare(J.runKey)), K = Y.filter((M) => M.status === "completed"), V = K.map((M) => hy(M, o.objective, `/payload/runs/${c.indexOf(M)}`)).filter((M) => M !== void 0), de = new Set(V.map((M) => M.key)), ce = V.map((M) => M.value), X = de.size === 1 ? (ve = V[0]) == null ? void 0 : ve.key : void 0, Q = K.length === o.repetitions && V.length === o.repetitions && de.size === 1, oe = j.status;
    oe === "invalid" && Y.length > 0 && ne("INVALID_BUNDLE", `${R}/status`, "invalid variants must not contain execution runs");
    const fe = oe === "invalid" ? "invalid" : Q ? "completed" : "failed";
    X === void 0 ? ye(j, "metricKey") && ne("INVALID_BUNDLE", `${R}/metricKey`, "is not supported by the raw run evidence") : j.metricKey !== X && ne(
      "INVALID_BUNDLE",
      `${R}/metricKey`,
      `does not match raw run identity '${X}'`
    );
    const ae = ea(Y.map((M) => M.durationMs)) ?? 0;
    return za(j, "runtimeMs", ae, R), VS(j, gy(Y), R), {
      record: j,
      id: q,
      label: Z,
      values: ce,
      ...X === void 0 ? {} : { metricKey: X },
      fullyObserved: Q,
      preRankingStatus: fe,
      finalStatus: fe,
      ...Q ? { mean: ea(ce) } : {}
    };
  });
  new Set(
    f.filter((E) => E.preRankingStatus === "completed" && E.metricKey).map((E) => pl(E.metricKey))
  ).size > 1 && f.forEach((E) => {
    E.preRankingStatus === "completed" && (E.finalStatus = "failed");
  }), f.forEach((E, L) => {
    const R = `${s}/variants/${L}`;
    E.record.status !== E.finalStatus && ne(
      "INVALID_BUNDLE",
      `${R}/status`,
      `does not match raw run evidence (expected ${E.finalStatus})`
    );
    const j = E.preRankingStatus === "completed" && E.finalStatus === "failed";
    US(
      E.record,
      j ? [] : E.values,
      R
    ), BS(
      E.record,
      E.values,
      E.finalStatus === "completed",
      R
    );
    const q = E.finalStatus === "completed" ? E.mean : void 0;
    za(E.record, "mean", q, R), za(
      E.record,
      "stddev",
      E.finalStatus === "completed" ? El(E.values) : void 0,
      R
    );
  });
  const p = ye(a, "baselineVariantId") ? a.baselineVariantId : void 0;
  if (p !== void 0) {
    const E = o.variants.filter((R) => R.operations.length === 0);
    (E.length !== 1 || E[0].id !== p) && ne(
      "INVALID_BUNDLE",
      `${s}/baselineVariantId`,
      "must identify the single zero-operation baseline from the study spec"
    );
    const L = f.find((R) => R.id === p);
    f.forEach((R, j) => {
      const q = R.id !== p && L.finalStatus === "completed" && R.finalStatus === "completed" ? ms(R.values, L.values, o.objective.direction) : void 0;
      kS(
        R.record,
        q,
        p,
        `${s}/variants/${j}`
      );
    });
  }
  const h = f.filter((E) => E.finalStatus === "completed" && E.mean !== void 0).sort((E, L) => (o.objective.direction === "maximize" ? L.mean - E.mean : E.mean - L.mean) || E.id.localeCompare(L.id)), b = h[0], v = b ? Math.max(1, Math.abs(b.mean)) * Number.EPSILON * 8 : 0, A = (b ? h.filter((E) => Math.abs(E.mean - b.mean) <= v) : []).length === 1 ? b : void 0;
  A ? (a.winnerId !== A.id || a.winnerLabel !== A.label) && ne(
    "INVALID_BUNDLE",
    `${s}/winnerId`,
    `does not match the raw-run winner '${A.id}'`
  ) : (ye(a, "winnerId") || ye(a, "winnerLabel")) && ne("INVALID_BUNDLE", `${s}/winnerId`, "no unique winner is supported by the raw run evidence");
  const O = h.length === 0 ? "failed" : f.every((E) => E.finalStatus === "completed") ? "completed" : "partial";
  a.status !== O && ne(
    "INVALID_BUNDLE",
    `${s}/status`,
    `does not match raw run evidence (expected ${O})`
  );
}
function IS(a, i, s) {
  const o = Se(a, s);
  De(
    o,
    [
      "status",
      "variants",
      "baselineVariantId",
      "winnerId",
      "winnerLabel",
      "appliedVariantId",
      "applyConflict",
      "insights"
    ],
    ["status", "variants", "insights"],
    s
  ), ta(o.status, ["completed", "partial", "failed"], `${s}/status`);
  const c = Ze(o.variants, `${s}/variants`, hs), d = [], f = /* @__PURE__ */ new Map();
  c.forEach((v, S) => {
    zS(v, `${s}/variants/${S}`);
    const A = Se(v, `${s}/variants/${S}`), O = ke(A.id, `${s}/variants/${S}/id`);
    d.push(O), f.set(O, Ee(A.label, `${s}/variants/${S}/label`, qe));
  }), gn(d, `${s}/variants`, "derived variant ids");
  const y = Se(i.spec, "/payload/spec"), p = /* @__PURE__ */ new Map(), h = Ze(y.variants, "/payload/spec/variants", hs).map((v, S) => {
    const A = Se(v, `/payload/spec/variants/${S}`), O = ke(A.id, `/payload/spec/variants/${S}/id`);
    return p.set(
      O,
      Ee(A.label, `/payload/spec/variants/${S}/label`, qe)
    ), O;
  });
  (d.length !== h.length || d.some((v) => !h.includes(v))) && ne("INVALID_BUNDLE", `${s}/variants`, "must match spec variant ids exactly");
  for (const v of d)
    f.get(v) !== p.get(v) && ne("INVALID_BUNDLE", `${s}/variants`, `label for variant '${v}' does not match the spec`);
  if (ye(o, "baselineVariantId")) {
    const v = ke(o.baselineVariantId, `${s}/baselineVariantId`);
    f.has(v) || ne("INVALID_BUNDLE", `${s}/baselineVariantId`, "unknown baseline variant"), c.forEach((S, A) => {
      const O = Se(S, `${s}/variants/${A}`);
      if (!ye(O, "baselineComparison")) return;
      Se(
        O.baselineComparison,
        `${s}/variants/${A}/baselineComparison`
      ).baselineId !== v && ne(
        "INVALID_BUNDLE",
        `${s}/variants/${A}/baselineComparison/baselineId`,
        "must match derived baselineVariantId"
      );
    });
  } else c.some((v) => ye(Se(v, s), "baselineComparison")) && ne("INVALID_BUNDLE", `${s}/variants`, "baselineComparison requires baselineVariantId");
  if (ye(o, "winnerId")) {
    const v = ke(o.winnerId, `${s}/winnerId`);
    f.has(v) || ne("INVALID_BUNDLE", `${s}/winnerId`, "unknown winner variant"), ye(o, "winnerLabel") && Ee(o.winnerLabel, `${s}/winnerLabel`, qe) !== f.get(v) && ne("INVALID_BUNDLE", `${s}/winnerLabel`, "does not match the winner variant label");
  } else ye(o, "winnerLabel") && ne("INVALID_BUNDLE", `${s}/winnerLabel`, "winnerLabel requires winnerId");
  if (ye(o, "appliedVariantId")) {
    const v = ke(o.appliedVariantId, `${s}/appliedVariantId`);
    f.has(v) || ne("INVALID_BUNDLE", `${s}/appliedVariantId`, "unknown applied variant");
  }
  ye(o, "applyConflict") && Ee(o.applyConflict, `${s}/applyConflict`, Mt);
  const b = Se(o.insights, `${s}/insights`);
  De(b, ["summary", "warnings", "paperIdeas"], ["summary", "warnings", "paperIdeas"], `${s}/insights`), Ze(b.summary, `${s}/insights/summary`, 1e3).forEach((v, S) => Ee(v, `${s}/insights/summary/${S}`, Mt)), Ze(b.warnings, `${s}/insights/warnings`, 1e3).forEach((v, S) => Ee(v, `${s}/insights/warnings/${S}`, Mt)), Ze(b.paperIdeas, `${s}/insights/paperIdeas`, 1e3).forEach((v, S) => RS(v, `${s}/insights/paperIdeas/${S}`)), HS(o, i, s);
}
function sg(a) {
  return a.startsWith("/") && !/~(?:[^01]|$)/.test(a);
}
function vs(a, i, s) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((c, d) => vs(c, `${i}/${d}`, s));
    return;
  }
  const o = Se(a, i);
  if (ye(o, "$gcpSecretRef")) {
    De(o, ["$gcpSecretRef"], ["$gcpSecretRef"], i);
    const c = ke(o.$gcpSecretRef, `${i}/$gcpSecretRef`), d = s.get(c) ?? [];
    d.push(i), s.set(c, d);
    return;
  }
  for (const [c, d] of Object.entries(o))
    vs(d, `${i}/${xl(c)}`, s);
}
function GS(a, i, s) {
  const o = Se(a, s);
  De(
    o,
    ["policy", "secretRequirements", "textRedactions"],
    ["policy", "secretRequirements", "textRedactions"],
    s
  ), o.policy !== "explicit-secret-ref-v1" && ne("INVALID_BUNDLE", `${s}/policy`, "expected 'explicit-secret-ref-v1'");
  const c = Ze(
    o.secretRequirements,
    `${s}/secretRequirements`,
    Qo
  ), d = [], f = /* @__PURE__ */ new Map();
  c.forEach((A, O) => {
    const E = `${s}/secretRequirements/${O}`, L = Se(A, E);
    De(
      L,
      ["id", "locations", "reason", "requiredAtReplay", "nodeType", "parameter"],
      ["id", "locations", "reason", "requiredAtReplay"],
      E
    );
    const R = ke(L.id, `${E}/id`);
    d.push(R);
    const j = Ze(L.locations, `${E}/locations`, Qo).map((q, Z) => {
      const Y = Ee(
        q,
        `${E}/locations/${Z}`,
        Mt
      );
      return sg(Y) || ne("INVALID_BUNDLE", `${E}/locations/${Z}`, "expected a valid JSON Pointer"), Y;
    });
    j.length === 0 && ne("INVALID_BUNDLE", `${E}/locations`, "at least one location is required"), gn(j, `${E}/locations`, "secret locations"), f.set(R, [...j].sort()), Ee(L.reason, `${E}/reason`, Mt), fy(L.requiredAtReplay, `${E}/requiredAtReplay`), ye(L, "nodeType") && Ee(L.nodeType, `${E}/nodeType`, qe), ye(L, "parameter") && Ee(L.parameter, `${E}/parameter`, qe);
  }), gn(d, `${s}/secretRequirements`, "secret requirement ids"), Ze(
    o.textRedactions,
    `${s}/textRedactions`,
    Qo
  ).forEach((A, O) => {
    const E = `${s}/textRedactions/${O}`, L = Se(A, E);
    De(L, ["locations", "reason"], ["locations", "reason"], E);
    const R = Ze(L.locations, `${E}/locations`, Qo);
    R.length === 0 && ne("INVALID_BUNDLE", `${E}/locations`, "at least one location is required"), R.forEach((j, q) => {
      const Z = Ee(j, `${E}/locations/${q}`, Mt);
      sg(Z) || ne("INVALID_BUNDLE", `${E}/locations/${q}`, "expected a valid JSON Pointer");
    }), Ee(L.reason, `${E}/reason`, Mt);
  });
  const p = /* @__PURE__ */ new Map(), h = Se(i.spec, "/payload/spec");
  vs(h.baseline, "/spec/baseline", p), Ze(h.variants, "/payload/spec/variants", hs).forEach((A, O) => {
    const E = Se(A, `/payload/spec/variants/${O}`);
    vs(E.operations, `/spec/variants/${O}/operations`, p);
  });
  const v = [...p.keys()].sort(), S = [...f.keys()].sort();
  (v.length !== S.length || v.some((A, O) => A !== S[O])) && ne(
    "INVALID_BUNDLE",
    `${s}/secretRequirements`,
    `must declare exactly the SecretRefs used by the spec (used: ${v.join(", ") || "none"})`
  );
  for (const A of v) {
    const O = [...p.get(A)].sort(), E = f.get(A);
    (O.length !== E.length || O.some((L, R) => L !== E[R])) && ne(
      "INVALID_BUNDLE",
      `${s}/secretRequirements`,
      `locations for SecretRef '${A}' do not match the spec`
    );
  }
}
function qS(a, i) {
  const s = Se(a, i);
  De(
    s,
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    i
  ), ke(s.id, `${i}/id`);
  const o = ys(s.createdAt, `${i}/createdAt`), c = ys(s.completedAt, `${i}/completedAt`);
  return Date.parse(c) < Date.parse(o) && ne("INVALID_BUNDLE", `${i}/completedAt`, "must not be before createdAt"), MS(s.producer, `${i}/producer`), TS(s.provenance, `${i}/provenance`), OS(s.spec, `${i}/spec`), DS(s.runs, s, `${i}/runs`), IS(s.derived, s, `${i}/derived`), GS(s.redactionReport, s, `${i}/redactionReport`), s;
}
function KS(a, i) {
  const s = Se(a, i);
  De(
    s,
    ["algorithm", "canonicalization", "contentSha256"],
    ["algorithm", "canonicalization", "contentSha256"],
    i
  ), s.algorithm !== "SHA-256" && ne("INVALID_BUNDLE", `${i}/algorithm`, "expected 'SHA-256'"), s.canonicalization !== rd && ne("INVALID_BUNDLE", `${i}/canonicalization`, `expected '${rd}'`);
  const o = Ee(s.contentSha256, `${i}/contentSha256`, 64);
  return /^[a-f0-9]{64}$/.test(o) || ne("INVALID_BUNDLE", `${i}/contentSha256`, "expected 64 lowercase hexadecimal characters"), s;
}
function YS(a) {
  nr(a);
  const i = Se(a, "/");
  if (i.format !== Nd)
    throw new hn(
      "UNSUPPORTED_FORMAT",
      `Unsupported study bundle format '${String(i.format ?? "")}'`
    );
  if (typeof i.formatVersion != "number" || !Number.isInteger(i.formatVersion))
    throw new hn("UNSUPPORTED_VERSION", "Study bundle formatVersion must be an integer");
  if (i.formatVersion > dl)
    throw new hn(
      "FUTURE_VERSION",
      `Study bundle version ${i.formatVersion} requires a newer Graph Copilot`
    );
  if (i.formatVersion !== dl)
    throw new hn(
      "UNSUPPORTED_VERSION",
      `Study bundle version ${i.formatVersion} is not supported`
    );
  De(i, ["format", "formatVersion", "payload", "integrity"], ["format", "formatVersion", "payload", "integrity"], "/");
  const s = qS(i.payload, "/payload"), o = KS(i.integrity, "/integrity");
  return { root: i, payload: s, integrity: o };
}
function yy(a) {
  return {
    format: Nd,
    formatVersion: dl,
    payload: a
  };
}
function vy(a, i = /* @__PURE__ */ new WeakSet()) {
  if (!a || typeof a != "object" || i.has(a)) return a;
  i.add(a);
  for (const s of Object.values(a)) vy(s, i);
  return Object.freeze(a);
}
function by(a) {
  return JSON.parse(nr(a));
}
function qu(a, i) {
  return a === void 0 ? {} : { [i]: a };
}
function XS(a, i, s) {
  const o = a.variants.map((v) => {
    var de;
    const S = s.filter((ce) => ce.variantId === v.id).sort((ce, X) => ce.repetition - X.repetition || ce.runKey.localeCompare(X.runKey)), A = S.filter((ce) => ce.status === "completed"), O = A.map((ce) => hy(ce, i.objective, `/payload/runs/${s.indexOf(ce)}`)).filter((ce) => ce !== void 0), E = new Set(O.map((ce) => ce.key)), L = O.map((ce) => ce.value), R = E.size === 1 ? (de = O[0]) == null ? void 0 : de.key : void 0, j = A.length === i.repetitions && O.length === i.repetitions && E.size === 1, q = v.status === "invalid" ? "invalid" : j ? "completed" : "failed", Z = j ? Ad(L) : void 0, Y = j ? ea(L) : void 0, K = j ? El(L) : void 0, V = {
      id: v.id,
      label: v.label,
      status: q,
      ...R === void 0 ? {} : { metricKey: R },
      metricValues: L,
      ...Y === void 0 ? {} : { mean: Y },
      ...K === void 0 ? {} : { stddev: K },
      ...Z === void 0 ? {} : {
        confidenceInterval95: {
          level: 0.95,
          lower: Z.lower,
          upper: Z.upper
        }
      },
      runtimeMs: ea(S.map((ce) => ce.durationMs)) ?? 0,
      observedMetrics: gy(S),
      ...v.operationSummary === void 0 ? {} : { operationSummary: [...v.operationSummary] },
      errors: [...v.errors]
    };
    return {
      id: v.id,
      label: v.label,
      values: L,
      ...R === void 0 ? {} : { metricKey: R },
      preRankingStatus: q,
      result: V
    };
  });
  if (new Set(
    o.filter((v) => v.preRankingStatus === "completed" && v.metricKey).map((v) => pl(v.metricKey))
  ).size > 1 && o.forEach((v) => {
    if (v.preRankingStatus !== "completed") return;
    const {
      mean: S,
      stddev: A,
      confidenceInterval95: O,
      baselineComparison: E,
      ...L
    } = v.result;
    v.result = { ...L, status: "failed", metricValues: [] };
  }), a.baselineVariantId !== void 0) {
    const v = o.find((S) => S.id === a.baselineVariantId);
    (v == null ? void 0 : v.result.status) === "completed" && o.forEach((S) => {
      if (S.id === v.id || S.result.status !== "completed") return;
      const A = ms(S.values, v.values, i.objective.direction);
      A && (S.result = {
        ...S.result,
        baselineComparison: {
          baselineId: v.id,
          meanDelta: A.rawDelta,
          objectiveImprovement: A.improvement,
          ...A.hedgesG === void 0 ? {} : { hedgesG: A.hedgesG }
        }
      });
    });
  }
  const d = o.filter((v) => v.result.status === "completed" && v.result.mean !== void 0).sort((v, S) => (i.objective.direction === "maximize" ? S.result.mean - v.result.mean : v.result.mean - S.result.mean) || v.id.localeCompare(S.id)), f = d[0], y = f ? Math.max(1, Math.abs(f.result.mean)) * Number.EPSILON * 8 : 0, h = (f ? d.filter((v) => Math.abs(v.result.mean - f.result.mean) <= y) : []).length === 1 ? f : void 0;
  return {
    status: d.length === 0 ? "failed" : o.every((v) => v.result.status === "completed") ? "completed" : "partial",
    variants: o.map((v) => v.result),
    ...qu(a.baselineVariantId, "baselineVariantId"),
    ...h === void 0 ? {} : { winnerId: h.id, winnerLabel: h.label },
    ...qu(a.appliedVariantId, "appliedVariantId"),
    ...qu(a.applyConflict, "applyConflict"),
    insights: {
      summary: [...a.insights.summary],
      warnings: [...a.insights.warnings],
      paperIdeas: a.insights.paperIdeas.map((v) => ({ ...v }))
    }
  };
}
async function $d(a) {
  const { payload: i, integrity: s } = YS(a), o = await dy(nr(yy(i)));
  if (o !== s.contentSha256)
    throw new hn(
      "INTEGRITY_MISMATCH",
      `Study bundle integrity mismatch: expected ${o}, received ${s.contentSha256}`
    );
  const c = by(a);
  return jd(nr(c)), vy(c);
}
async function JS(a) {
  const i = {
    hypothesis: a.session.hypothesis,
    baseline: a.baseline,
    objective: { ...a.session.objective },
    repetitions: a.session.repetitions,
    concurrency: a.concurrency ?? 1,
    applyBestRequested: a.applyBestRequested ?? !1,
    variants: a.variants
  }, s = {
    id: a.session.id,
    createdAt: a.session.createdAt,
    completedAt: a.completedAt,
    producer: a.producer,
    provenance: a.provenance,
    spec: i,
    runs: a.runs,
    derived: XS(a.session, i, a.runs),
    redactionReport: a.redactionReport
  }, o = by(s), c = await dy(nr(yy(o)));
  return $d({
    format: Nd,
    formatVersion: dl,
    payload: o,
    integrity: {
      algorithm: "SHA-256",
      canonicalization: rd,
      contentSha256: c
    }
  });
}
async function Md(a) {
  const i = await $d(a), s = nr(i);
  return jd(s), s;
}
async function Td(a) {
  if (typeof a != "string")
    throw new hn("INVALID_JSON", "Study bundle input must be text");
  jd(a);
  let i;
  try {
    i = JSON.parse(a);
  } catch (s) {
    throw new hn("INVALID_JSON", `Study bundle is not valid JSON: ${String(s)}`);
  }
  return $d(i);
}
const QS = "graph-copilot", ZS = "[REDACTED]", FS = "Exact echoes of values removed by capture redaction were removed from text. Arbitrary unrelated secrets in ordinary strings cannot be detected.", WS = "A credential-shaped field outside the replayable graph spec was removed.";
class PS extends Error {
  constructor(s, o) {
    super(`${s}: ${o}`);
    on(this, "path");
    this.name = "StudyCaptureError", this.path = s;
  }
}
function Ce(a, i) {
  throw new PS(a, i);
}
function sr(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const i = Object.getPrototypeOf(a);
  return i === Object.prototype || i === null;
}
function jn(a, i) {
  return sr(a) || Ce(i, "expected a plain object"), a;
}
function Ut(a, i, s = !1) {
  return (typeof a != "string" || !s && a.length === 0) && Ce(i, s ? "expected a string" : "expected a non-empty string"), a;
}
function ar(a, i) {
  return (typeof a != "number" || !Number.isFinite(a)) && Ce(i, "expected a finite number"), a;
}
function js(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function e_(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function di(a) {
  const i = e_(a);
  return [
    "secret",
    "secrets",
    "token",
    "password",
    "credential",
    "credentials",
    "authorization",
    "api_key",
    "private_key",
    "access_key",
    "client_secret",
    "access_token",
    "refresh_token",
    "auth_token",
    "bearer_token"
  ].some((s) => i === s || i.endsWith(`_${s}`));
}
function ir(a, i, s = /* @__PURE__ */ new WeakSet()) {
  if (typeof a == "string") {
    a.length > 0 && i.add(a);
    return;
  }
  if (Array.isArray(a)) {
    if (s.has(a)) return;
    s.add(a), a.forEach((o) => ir(o, i, s)), s.delete(a);
    return;
  }
  if (sr(a)) {
    if (s.has(a)) return;
    s.add(a), Object.values(a).forEach((o) => ir(o, i, s)), s.delete(a);
  }
}
function li(a, i, s = /* @__PURE__ */ new WeakSet()) {
  if (Array.isArray(a)) {
    if (s.has(a)) return;
    s.add(a), a.forEach((o) => li(o, i, s)), s.delete(a);
    return;
  }
  if (sr(a) && !s.has(a)) {
    s.add(a);
    for (const [o, c] of Object.entries(a))
      di(o) ? ir(c, i) : li(c, i, s);
    s.delete(a);
  }
}
function t_(a) {
  const i = /* @__PURE__ */ new Map();
  return a.forEach((s, o) => {
    const c = Ut(s == null ? void 0 : s.node_name, `definitions[${o}].node_name`);
    i.has(c) && Ce(`definitions[${o}].node_name`, `duplicate node definition '${c}'`);
    const d = /* @__PURE__ */ new Set();
    Array.isArray(s.params) || Ce(`definitions[${o}].params`, "expected an array"), s.params.forEach((f, y) => {
      const p = Ut(
        f == null ? void 0 : f.name,
        `definitions[${o}].params[${y}].name`
      );
      d.has(p) && Ce(
        `definitions[${o}].params[${y}].name`,
        `duplicate parameter definition '${p}'`
      ), d.add(p);
    }), i.set(c, s);
  }), i;
}
function Sy(a) {
  const i = /* @__PURE__ */ new Map();
  return a.forEach((s) => {
    typeof (s == null ? void 0 : s.id) == "string" && typeof s.type == "string" && i.set(s.id, s.type);
  }), i;
}
function n_(a, i, s) {
  if (a.op === "add_node") {
    const o = typeof a.node_type == "string" ? a.node_type : void 0;
    return o && typeof a.ref == "string" && s.set(a.ref, o), o;
  }
  if (a.op === "set_params") {
    const o = typeof a.node_id == "string" ? a.node_id : void 0;
    return o ? s.get(o) ?? i.get(o) : void 0;
  }
  a.op === "remove_node" && typeof a.node_id == "string" ? (s.delete(a.node_id), i.delete(a.node_id)) : a.op === "clear_graph" && (i.clear(), s.clear());
}
function og(a, i, s, o) {
  if (li(a, o), !sr(a)) return;
  const c = i ? s.get(i) : void 0, d = _y(c);
  for (const [f, y] of Object.entries(a)) {
    const p = d == null ? void 0 : d.get(f);
    (!c || !p || p.param_type === "secret" || di(f)) && ir(y, o);
  }
}
function a_(a, i) {
  var f;
  const s = /* @__PURE__ */ new Set(), { baseline: o, request: c } = a;
  for (const y of i.values())
    for (const p of y.params)
      li(p.default, s), (p.param_type === "secret" || di(p.name)) && ir(p.default, s);
  li(o, s), li(c, s), li(a.provenanceFacts, s);
  for (const y of Array.isArray(o.nodes) ? o.nodes : [])
    og((f = y.data) == null ? void 0 : f.params, y.type, i, s);
  Array.isArray(o.presets) && o.presets.forEach((y) => ir(y, s));
  const d = Sy(Array.isArray(o.nodes) ? o.nodes : []);
  for (const y of Array.isArray(c.variants) ? c.variants : []) {
    const p = new Map(d), h = /* @__PURE__ */ new Map();
    for (const b of Array.isArray(y == null ? void 0 : y.operations) ? y.operations : []) {
      if (!sr(b)) continue;
      const v = n_(b, p, h);
      (b.op === "add_node" || b.op === "set_params") && og(b.params, v, i, s);
    }
  }
  return s;
}
function i_(a) {
  const s = [ZS, "<removed>", "***", "�"].find((o) => [...a].every((c) => !o.includes(c)));
  if (s) return s;
  for (let o = 57344; o <= 63743; o += 1) {
    const c = String.fromCodePoint(o);
    if ([...a].every((d) => !c.includes(d))) return c;
  }
  return "";
}
class r_ {
  constructor() {
    on(this, "byReason", /* @__PURE__ */ new Map());
  }
  record(i, s) {
    const o = this.byReason.get(s) ?? /* @__PURE__ */ new Set();
    o.add(i), this.byReason.set(s, o);
  }
  report() {
    return [...this.byReason.entries()].map(([i, s]) => ({
      locations: [...s].sort(),
      reason: i
    }));
  }
}
class s_ {
  constructor(i, s) {
    on(this, "ordered");
    on(this, "replacement");
    this.redactions = s, this.ordered = [...i].sort((o, c) => c.length - o.length), this.replacement = i_(i);
  }
  text(i, s) {
    let o = i;
    for (const c of this.ordered) o = o.split(c).join(this.replacement);
    return o !== i && this.redactions.record(s, FS), o;
  }
  semantic(i, s) {
    return this.ordered.some((o) => i.includes(o)) && Ce(s, "a redacted value appears in a semantic identity and cannot be safely rewritten"), i;
  }
}
function o_(a) {
  return a.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180) || "secret";
}
function l_(a) {
  if (a === null) return "null";
  if (typeof a == "string") return `string:${a}`;
  if (typeof a == "number" && Number.isFinite(a)) return `number:${String(a)}`;
  if (typeof a == "boolean") return `boolean:${String(a)}`;
}
class c_ {
  constructor() {
    on(this, "identities", /* @__PURE__ */ new Map());
    on(this, "requirements", /* @__PURE__ */ new Map());
    on(this, "usedIds", /* @__PURE__ */ new Set());
  }
  ref(i) {
    const s = l_(i.rawValue), o = this.identities.get(i.identity) ?? [];
    let c = s === void 0 ? void 0 : o.find((d) => d.signature === s);
    if (!c) {
      const d = o_(i.suggestedId);
      let f = d, y = 2;
      for (; this.usedIds.has(f); )
        f = `${d}-${y}`, y += 1;
      this.usedIds.add(f), c = { signature: s, id: f }, o.push(c), this.identities.set(i.identity, o), this.requirements.set(f, {
        requirement: {
          id: f,
          reason: i.reason,
          requiredAtReplay: !0,
          ...i.nodeType === void 0 ? {} : { nodeType: i.nodeType },
          ...i.parameter === void 0 ? {} : { parameter: i.parameter }
        },
        locations: /* @__PURE__ */ new Set()
      });
    }
    return this.requirements.get(c.id).locations.add(i.location), { $gcpSecretRef: c.id };
  }
  report() {
    return [...this.requirements.values()].map(({ requirement: i, locations: s }) => ({
      ...i,
      locations: [...s].sort()
    }));
  }
}
function bs(a, i, s) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return ar(a, i);
  if (typeof a == "string") return s.scrubber.text(a, i);
  if (Array.isArray(a)) {
    s.stack.has(a) && Ce(i, "cyclic values are not portable"), s.stack.add(a);
    try {
      const c = [];
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || Ce(`${i}/${d}`, "sparse arrays are not portable"), c.push(bs(a[d], `${i}/${d}`, s));
      return c;
    } finally {
      s.stack.delete(a);
    }
  }
  const o = jn(a, i);
  s.stack.has(o) && Ce(i, "cyclic values are not portable"), s.stack.add(o);
  try {
    Object.prototype.hasOwnProperty.call(o, "$gcpSecretRef") && Ce(i, "raw host data may not contain the reserved '$gcpSecretRef' key");
    const c = /* @__PURE__ */ Object.create(null);
    for (const [d, f] of Object.entries(o)) {
      const y = `${i}/${js(d)}`;
      c[d] = di(d) ? s.secrets.ref({
        identity: `credential:${i}:${d}`,
        suggestedId: `${d}-${i}`,
        rawValue: f,
        location: y,
        reason: `Credential-shaped key '${d}' was redacted recursively.`,
        parameter: d
      }) : bs(f, y, s);
    }
    return c;
  } finally {
    s.stack.delete(o);
  }
}
function ml(a, i, s, o, c = /* @__PURE__ */ new WeakSet()) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return ar(a, i);
  if (typeof a == "string") return s.text(a, i);
  if (Array.isArray(a)) {
    c.has(a) && Ce(i, "cyclic values are not portable"), c.add(a);
    try {
      const f = [];
      for (let y = 0; y < a.length; y += 1)
        Object.prototype.hasOwnProperty.call(a, y) || Ce(`${i}/${y}`, "sparse arrays are not portable"), f.push(ml(a[y], `${i}/${y}`, s, o, c));
      return f;
    } finally {
      c.delete(a);
    }
  }
  const d = jn(a, i);
  c.has(d) && Ce(i, "cyclic values are not portable"), c.add(d);
  try {
    Object.prototype.hasOwnProperty.call(d, "$gcpSecretRef") && Ce(i, "provenance may not contain the reserved '$gcpSecretRef' key");
    const f = /* @__PURE__ */ Object.create(null);
    for (const [y, p] of Object.entries(d)) {
      const h = `${i}/${js(y)}`;
      di(y) ? (f[y] = s.replacement, o.record(h, WS)) : f[y] = ml(p, h, s, o, c);
    }
    return f;
  } finally {
    c.delete(d);
  }
}
function _y(a) {
  return a ? new Map(a.params.map((i) => [i.name, i])) : void 0;
}
function ld(a, i, s, o, c, d, f) {
  const y = jn(a, c), p = i ? d.get(i) : void 0, h = _y(p), b = /* @__PURE__ */ Object.create(null);
  for (const [v, S] of Object.entries(y)) {
    const A = `${c}/${js(v)}`, O = h == null ? void 0 : h.get(v);
    let E;
    p ? O ? O.param_type === "secret" ? E = `${i}.${v} is declared as a secret parameter.` : di(v) && (E = `Credential-shaped parameter '${v}' was redacted recursively.`) : E = `Parameter '${v}' is absent from the captured '${i}' schema and was redacted fail-closed.` : E = i ? `Node type '${i}' has no captured schema; parameter '${v}' was redacted fail-closed.` : `The node type is unresolved; parameter '${v}' was redacted fail-closed.`, b[v] = E ? f.secrets.ref({
      identity: `${s}:param:${v}`,
      suggestedId: `${o}-${v}`,
      rawValue: S,
      location: A,
      reason: E,
      ...i === void 0 ? {} : { nodeType: i },
      parameter: v
    }) : bs(S, A, f);
  }
  return b;
}
function u_(a, i, s) {
  sr(a) || Ce("baseline", "expected a plain serialized graph"), Array.isArray(a.nodes) || Ce("baseline.nodes", "expected an array"), Array.isArray(a.edges) || Ce("baseline.edges", "expected an array");
  const o = a.nodes.map((f, y) => {
    const p = `/spec/baseline/nodes/${y}`, h = jn(f, `baseline.nodes[${y}]`), b = s.scrubber.semantic(Ut(h.id, `${p}/id`), `${p}/id`), v = s.scrubber.semantic(Ut(h.type, `${p}/type`), `${p}/type`);
    let S = { x: 0, y: 0 };
    if (h.position !== void 0) {
      const E = jn(h.position, `${p}/position`);
      S = {
        x: ar(E.x, `${p}/position/x`),
        y: ar(E.y, `${p}/position/y`)
      };
    }
    const A = h.data === void 0 ? {} : jn(h.data, `${p}/data`), O = /* @__PURE__ */ Object.create(null);
    for (const [E, L] of Object.entries(A)) {
      const R = `${p}/data/${js(E)}`;
      E === "params" ? O.params = ld(
        L,
        v,
        `node:${b}`,
        b,
        R,
        i,
        s
      ) : di(E) ? O[E] = s.secrets.ref({
        identity: `node:${b}:credential:${E}`,
        suggestedId: `${b}-${E}`,
        rawValue: L,
        location: R,
        reason: `Credential-shaped key '${E}' was redacted recursively.`,
        nodeType: v,
        parameter: E
      }) : O[E] = bs(L, R, s);
    }
    return { id: b, type: v, position: S, data: O };
  }), c = a.edges.map((f, y) => {
    const p = `/spec/baseline/edges/${y}`, h = jn(f, `baseline.edges[${y}]`), b = h.type;
    b !== void 0 && b !== "data" && b !== "trigger" && Ce(`${p}/type`, "expected 'data' or 'trigger'");
    const v = b === "data" || b === "trigger" ? b : void 0;
    return {
      id: s.scrubber.semantic(Ut(h.id, `${p}/id`), `${p}/id`),
      source: s.scrubber.semantic(Ut(h.source, `${p}/source`), `${p}/source`),
      target: s.scrubber.semantic(Ut(h.target, `${p}/target`), `${p}/target`),
      sourceHandle: s.scrubber.semantic(
        Ut(h.sourceHandle, `${p}/sourceHandle`, !0),
        `${p}/sourceHandle`
      ),
      targetHandle: s.scrubber.semantic(
        Ut(h.targetHandle, `${p}/targetHandle`, !0),
        `${p}/targetHandle`
      ),
      ...v === void 0 ? {} : { type: v }
    };
  });
  return {
    nodes: o,
    edges: c,
    ...a.presets === void 0 ? {} : {
      presets: (Array.isArray(a.presets) || Ce("/spec/baseline/presets", "expected an array"), a.presets.map((f, y) => s.secrets.ref({
        identity: `preset:${y}`,
        suggestedId: `preset-${y + 1}`,
        rawValue: f,
        location: `/spec/baseline/presets/${y}`,
        reason: "Preset schema is unavailable; the entire preset was redacted fail-closed."
      })))
    },
    ...a.segmentGroups === void 0 ? {} : { segmentGroups: bs(a.segmentGroups, "/spec/baseline/segmentGroups", s) },
    ...a.name === void 0 ? {} : { name: s.scrubber.text(Ut(a.name, "/spec/baseline/name", !0), "/spec/baseline/name") },
    ...a.description === void 0 ? {} : {
      description: s.scrubber.text(
        Ut(a.description, "/spec/baseline/description", !0),
        "/spec/baseline/description"
      )
    }
  };
}
function ln(a, i, s, o = !1) {
  return s.semantic(Ut(a, i, o), i);
}
function d_(a, i, s, o, c, d) {
  Array.isArray(a) || Ce(`request.variants[${s}].operations`, "expected an array");
  const f = new Map(o), y = /* @__PURE__ */ new Map();
  return a.map((p, h) => {
    const b = `/spec/variants/${s}/operations/${h}`, v = jn(p, `request.variants[${s}].operations[${h}]`);
    switch (v.op) {
      case "add_node": {
        const S = ln(v.node_type, `${b}/node_type`, d.scrubber), A = v.ref === void 0 ? void 0 : ln(v.ref, `${b}/ref`, d.scrubber);
        A !== void 0 && y.set(A, S);
        const O = c.get(S), E = /* @__PURE__ */ Object.create(null);
        for (const q of (O == null ? void 0 : O.params) ?? [])
          q.default !== void 0 && (E[q.name] = q.default);
        if (v.params !== void 0)
          for (const [q, Z] of Object.entries(jn(v.params, `${b}/params`)))
            E[q] = Z;
        const R = Object.keys(E).length > 0 ? ld(
          E,
          S,
          A === void 0 ? `variant:${i}:operation:${h}` : `variant:${i}:ref:${A}`,
          A ?? `${i}-node-${h + 1}`,
          `${b}/params`,
          c,
          d
        ) : void 0, j = v.position === void 0 ? void 0 : (() => {
          const q = jn(v.position, `${b}/position`);
          return {
            x: ar(q.x, `${b}/position/x`),
            y: ar(q.y, `${b}/position/y`)
          };
        })();
        return {
          op: "add_node",
          node_type: S,
          ...A === void 0 ? {} : { ref: A },
          ...R === void 0 ? {} : { params: R },
          ...j === void 0 ? {} : { position: j }
        };
      }
      case "set_params": {
        const S = ln(v.node_id, `${b}/node_id`, d.scrubber), A = y.get(S) ?? f.get(S), O = y.has(S) ? `variant:${i}:ref:${S}` : `node:${S}`;
        return {
          op: "set_params",
          node_id: S,
          params: ld(
            v.params,
            A,
            O,
            S,
            `${b}/params`,
            c,
            d
          )
        };
      }
      case "connect":
        return {
          op: "connect",
          source: ln(v.source, `${b}/source`, d.scrubber),
          source_handle: ln(
            v.source_handle,
            `${b}/source_handle`,
            d.scrubber,
            !0
          ),
          target: ln(v.target, `${b}/target`, d.scrubber),
          target_handle: ln(
            v.target_handle,
            `${b}/target_handle`,
            d.scrubber,
            !0
          )
        };
      case "remove_node": {
        const S = ln(v.node_id, `${b}/node_id`, d.scrubber);
        return y.delete(S), f.delete(S), { op: "remove_node", node_id: S };
      }
      case "remove_edge":
        return {
          op: "remove_edge",
          source: ln(v.source, `${b}/source`, d.scrubber),
          target: ln(v.target, `${b}/target`, d.scrubber),
          ...v.source_handle === void 0 ? {} : {
            source_handle: ln(
              v.source_handle,
              `${b}/source_handle`,
              d.scrubber,
              !0
            )
          },
          ...v.target_handle === void 0 ? {} : {
            target_handle: ln(
              v.target_handle,
              `${b}/target_handle`,
              d.scrubber,
              !0
            )
          }
        };
      case "clear_graph":
        return f.clear(), y.clear(), { op: "clear_graph" };
      case "auto_layout":
        return { op: "auto_layout" };
      default:
        return Ce(`${b}/op`, `unsupported graph operation '${String(v.op)}'`);
    }
  });
}
function f_(a, i) {
  var s;
  return ((s = a.id) == null ? void 0 : s.trim()) || `variant-${i + 1}`;
}
function p_(a) {
  Array.isArray(a.request.variants) || Ce("request.variants", "expected an array"), Array.isArray(a.session.variants) || Ce("session.variants", "expected an array"), (a.request.repetitions ?? 1) !== a.session.repetitions && Ce("request.repetitions", "does not match the completed session"), (a.request.objective.metric !== a.session.objective.metric || a.request.objective.direction !== a.session.objective.direction) && Ce("request.objective", "does not match the completed session"), a.request.hypothesis.trim() !== a.session.hypothesis && Ce("request.hypothesis", "does not match the completed session"), a.request.variants.length !== a.session.variants.length && Ce("request.variants", "does not match the completed session variant count"), a.request.variants.forEach((s, o) => {
    const c = a.session.variants[o];
    f_(s, o) !== (c == null ? void 0 : c.id) && Ce(`request.variants[${o}].id`, "does not match the completed session variant id"), s.label.trim() !== c.label && Ce(`request.variants[${o}].label`, "does not match the completed session variant label");
  });
}
function m_(a, i, s) {
  return {
    ...a,
    id: s.semantic(a.id, `/derived/variants/${i}/id`),
    label: s.text(a.label, `/derived/variants/${i}/label`),
    ...a.metricKey === void 0 ? {} : { metricKey: s.semantic(a.metricKey, `/derived/variants/${i}/metricKey`) },
    metricValues: [...a.metricValues],
    observedMetrics: Object.fromEntries(Object.entries(a.observedMetrics).map(([o, c]) => [
      s.semantic(o, `/derived/variants/${i}/observedMetrics/${js(o)}`),
      c
    ])),
    ...a.runs === void 0 ? {} : {
      runs: a.runs.map((o) => ({
        ...o,
        observedMetrics: { ...o.observedMetrics }
      }))
    },
    ...a.operationSummary === void 0 ? {} : {
      operationSummary: a.operationSummary.map((o, c) => s.text(o, `/derived/variants/${i}/operationSummary/${c}`))
    },
    errors: a.errors.map((o, c) => s.text(o, `/derived/variants/${i}/errors/${c}`))
  };
}
function h_(a, i) {
  const s = a.variants.map((c, d) => m_(c, d, i)), o = new Map(s.map((c) => [c.id, c]));
  return {
    ...a,
    id: i.semantic(a.id, "/id"),
    hypothesis: i.text(a.hypothesis, "/spec/hypothesis"),
    objective: {
      ...a.objective,
      metric: i.semantic(a.objective.metric, "/spec/objective/metric")
    },
    variants: s,
    ...a.search === void 0 ? {} : { search: a.search },
    ...a.winnerLabel === void 0 ? {} : {
      winnerLabel: (() => {
        const c = i.text(a.winnerLabel, "/derived/winnerLabel");
        return a.winnerId && o.has(a.winnerId) ? o.get(a.winnerId).label : c;
      })()
    },
    ...a.applyConflict === void 0 ? {} : { applyConflict: i.text(a.applyConflict, "/derived/applyConflict") },
    insights: {
      summary: a.insights.summary.map((c, d) => i.text(c, `/derived/insights/summary/${d}`)),
      warnings: a.insights.warnings.map((c, d) => i.text(c, `/derived/insights/warnings/${d}`)),
      paperIdeas: a.insights.paperIdeas.map((c, d) => ({
        title: i.text(c.title, `/derived/insights/paperIdeas/${d}/title`),
        evidence: i.text(c.evidence, `/derived/insights/paperIdeas/${d}/evidence`),
        nextStep: i.text(c.nextStep, `/derived/insights/paperIdeas/${d}/nextStep`)
      }))
    }
  };
}
function g_(a, i, s) {
  if (!(a.metricKey === void 0 && a.metricValue === void 0))
    return (typeof a.metricKey != "string" || a.metricKey.length === 0 || typeof a.metricValue != "number" || !Number.isFinite(a.metricValue)) && Ce("session.variants[].runs[].metric", "metricKey and finite metricValue must be provided together"), {
      // Older run records retained only the canonical identity. Calling that
      // stored identity the observed key is explicit client-side evidence, not
      // a guessed node/port identity.
      observedKey: i.semantic(a.metricKey, `${s}/observedKey`),
      canonicalKey: i.semantic(a.metricKey, `${s}/canonicalKey`),
      value: a.metricValue,
      source: a.metricSource ?? "client"
    };
}
function y_(a, i) {
  const s = [], o = /* @__PURE__ */ new Set();
  return a.variants.forEach((c, d) => {
    var f;
    (f = c.runs) == null || f.forEach((y, p) => {
      var E, L;
      const h = `${c.id}\0${y.repetition}`;
      o.has(h) && Ce(`session.variants[${d}].runs[${p}]`, "duplicate variant/repetition run slot"), o.add(h);
      const b = [], v = /* @__PURE__ */ new Set(), S = g_(y, i, `/runs/${s.length}/metrics/0`);
      S && (v.add(S.observedKey), b.push(S));
      for (const [R, j] of Object.entries(y.observedMetrics)) {
        if (!Number.isFinite(j)) continue;
        const q = ((E = y.observedMetricIdentities) == null ? void 0 : E[R]) ?? (R === "system.runtime_ms" ? "system.runtime_ms" : void 0), Z = ((L = y.observedMetricSources) == null ? void 0 : L[R]) ?? (R === "system.runtime_ms" ? "client" : void 0);
        if (!q || !Z) continue;
        const Y = `/runs/${s.length}/metrics/${b.length}`, K = i.semantic(R, `${Y}/observedKey`), V = i.semantic(q, `${Y}/canonicalKey`);
        v.has(K) || (v.add(K), b.push({ observedKey: K, canonicalKey: V, value: j, source: Z }));
      }
      const A = Number.isFinite(y.observedMetrics["system.runtime_ms"]) ? y.observedMetrics["system.runtime_ms"] : y.durationMs;
      Number.isFinite(A) && !v.has("system.runtime_ms") && b.push({
        observedKey: "system.runtime_ms",
        canonicalKey: "system.runtime_ms",
        value: A,
        source: "client"
      });
      const O = `/runs/${s.length}/error/message`;
      s.push({
        runKey: `${c.id}:rep:${y.repetition}`,
        variantId: c.id,
        repetition: y.repetition,
        status: y.status,
        durationMs: y.durationMs,
        metrics: b,
        ...y.status === "failed" ? {
          error: {
            phase: "execute",
            code: "EXPERIMENT_RUN_FAILED",
            message: i.text(
              y.error ?? "No error message was recorded by the experiment runtime.",
              O
            )
          }
        } : {}
      });
    });
  }), s;
}
function v_(a, i, s) {
  const o = (a.provenanceFacts ?? []).map((c, d) => {
    const f = `/provenance/facts/${d}`;
    return {
      key: i.text(Ut(c.key, `${f}/key`), `${f}/key`),
      status: c.status,
      source: i.text(Ut(c.source, `${f}/source`), `${f}/source`),
      ...c.collectedAt === void 0 ? {} : { collectedAt: c.collectedAt },
      ...c.value === void 0 ? {} : { value: ml(c.value, `${f}/value`, i, s) }
    };
  });
  return a.request.search !== void 0 && (o.some((c) => c.key === "optimizer.plan") && Ce("provenanceFacts", "'optimizer.plan' is reserved for the captured experiment request"), o.push({
    key: "optimizer.plan",
    status: "observed",
    source: "graph-experiment request",
    value: ml(
      a.request.search,
      `/provenance/facts/${o.length}/value`,
      i,
      s
    )
  })), o.some((c) => c.key === "redaction.arbitrary_string_secret_detection") && Ce(
    "provenanceFacts",
    "'redaction.arbitrary_string_secret_detection' is reserved for the capture limitation"
  ), o.push({
    key: "redaction.arbitrary_string_secret_detection",
    status: "unavailable",
    source: "schema-guided capture cannot detect arbitrary secrets embedded in ordinary strings"
  }), o;
}
async function b_(a) {
  p_(a);
  const i = t_(a.definitions), s = a_(a, i), o = new r_(), c = new s_(s, o), d = new c_(), f = { secrets: d, scrubber: c, stack: /* @__PURE__ */ new WeakSet() }, y = u_(a.baseline, i, f), p = Sy(a.baseline.nodes), h = h_(a.session, c), b = a.request.variants.map((O, E) => ({
    id: h.variants[E].id,
    label: c.text(a.session.variants[E].label, `/spec/variants/${E}/label`),
    operations: d_(
      O.operations,
      h.variants[E].id,
      E,
      p,
      i,
      f
    )
  }));
  if (h.variants.forEach((O, E) => {
    O.label = b[E].label;
  }), h.winnerId !== void 0) {
    const O = h.variants.find((E) => E.id === h.winnerId);
    O && (h.winnerLabel = O.label);
  }
  const v = y_(a.session, c), S = v_(a, c, o), A = {
    policy: "explicit-secret-ref-v1",
    secretRequirements: d.report(),
    textRedactions: o.report()
  };
  return JS({
    session: h,
    completedAt: a.completedAt,
    producer: {
      pluginId: a.pluginId ?? QS,
      pluginVersion: a.pluginVersion,
      codefyuiApiVersion: a.codefyuiApiVersion
    },
    provenance: { facts: S },
    baseline: y,
    variants: b,
    runs: v,
    redactionReport: A,
    concurrency: a.request.concurrency ?? 1,
    applyBestRequested: a.request.apply_best ?? !1
  });
}
const hl = "graph-copilot.study-index.v1", S_ = "graph-copilot.study.sha256.", Od = "codefyui.graph-copilot.study-index", Cd = 1, Ey = 10, __ = 512 * 1024, xy = 256, E_ = 32 * 1024, lg = 4, Ay = /^[a-f0-9]{64}$/, x_ = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, A_ = "graph-copilot.study-index.v1.lock";
class ut extends Error {
  constructor(s, o, c) {
    super(o);
    on(this, "code");
    on(this, "causeValue");
    this.name = "StudyStorageError", this.code = s, this.causeValue = c;
  }
}
function Ny(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const i = Object.getPrototypeOf(a);
  return i === Object.prototype || i === null;
}
function wy(a, i) {
  const s = Object.keys(a);
  return s.length === i.length && s.every((o) => i.includes(o));
}
function N_(a) {
  return typeof a == "string" && x_.test(a) && !Number.isNaN(Date.parse(a)) && new Date(a).toISOString() === a;
}
function jy(a) {
  return typeof a == "string" && a.length > 0 && a.length <= xy && a === a.trim() && !/[\u0000-\u001f\u007f]/.test(a);
}
function w_(a) {
  if (!jy(a))
    throw new ut(
      "INVALID_ID",
      `Study id must be a non-empty, trimmed string of at most ${xy} characters`
    );
}
function j_(a) {
  return !Ny(a) || !wy(a, ["id", "digest", "createdAt", "hypothesis", "kind"]) || !jy(a.id) || typeof a.digest != "string" || !Ay.test(a.digest) || !N_(a.createdAt) || typeof a.hypothesis != "string" || !a.hypothesis.trim() || a.hypothesis.length > E_ || a.hypothesis.includes("\0") || a.kind !== "portable" ? null : Object.freeze({
    id: a.id,
    digest: a.digest,
    createdAt: a.createdAt,
    hypothesis: a.hypothesis,
    kind: "portable"
  });
}
function Al(a, i) {
  return i.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(i.id) || a.digest.localeCompare(i.digest);
}
function $_(a, i) {
  return a.createdAt.localeCompare(i.createdAt) || a.id.localeCompare(i.id) || a.digest.localeCompare(i.digest);
}
function $y(a) {
  return Object.freeze({
    format: Od,
    formatVersion: Cd,
    entries: Object.freeze([...a].sort(Al))
  });
}
const si = $y([]);
function Nl(a) {
  if (!a || a.length > __) return si;
  let i;
  try {
    i = JSON.parse(a);
  } catch {
    return si;
  }
  if (!Ny(i) || !wy(i, ["format", "formatVersion", "entries"]) || i.format !== Od || i.formatVersion !== Cd || !Array.isArray(i.entries)) return si;
  const s = i.entries.map(j_).filter((f) => f !== null), o = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const f of s)
    o.set(f.id, (o.get(f.id) ?? 0) + 1), c.set(f.digest, (c.get(f.digest) ?? 0) + 1);
  const d = s.filter((f) => o.get(f.id) === 1 && c.get(f.digest) === 1);
  return $y(d.sort(Al).slice(0, Ey));
}
function Dd(a) {
  return JSON.stringify({
    format: Od,
    formatVersion: Cd,
    entries: [...a].sort(Al)
  });
}
function cg(a) {
  if (a === null) return si;
  const i = Nl(a);
  if (a !== Dd(i.entries))
    throw new ut(
      "INDEX_READ_FAILED",
      "Portable study index is malformed or non-canonical; mutation was aborted without changing storage"
    );
  return i;
}
function rr(a) {
  try {
    return a.storage.get(hl);
  } catch (i) {
    throw new ut("INDEX_READ_FAILED", "Could not read the portable study index", i);
  }
}
function My(a, i) {
  try {
    return a.storage.remove(i), !0;
  } catch {
    return !1;
  }
}
const Zo = /* @__PURE__ */ new Map();
function M_() {
  if (typeof navigator > "u") return null;
  const a = navigator.locks;
  return !a || typeof a.request != "function" ? null : a;
}
function Ty(a, i) {
  const s = M_();
  if (s === null)
    return Promise.reject(new ut(
      "LOCK_UNAVAILABLE",
      "Cross-tab storage mutations require browser Web Locks; this environment remains read-only"
    ));
  const o = Zo.get(a) ?? Promise.resolve();
  let c;
  const d = new Promise((f) => {
    c = f;
  });
  return Zo.set(a, d), o.catch(() => {
  }).then(() => s.request(a, { mode: "exclusive" }, i)).finally(() => {
    c(), Zo.get(a) === d && Zo.delete(a);
  });
}
function T_(a) {
  return Ty(A_, a);
}
function O_(a, i, s) {
  if (rr(a) !== i) return !1;
  try {
    a.storage.set(hl, s);
  } catch (o) {
    let c;
    try {
      c = a.storage.get(hl);
    } catch {
      c = void 0;
    }
    if (c === s) return !0;
    throw new ut(
      "INDEX_WRITE_FAILED",
      c === i ? "Portable study index write failed before changing the index" : "Portable study index write failed and the resulting index was left untouched to avoid overwriting a concurrent update",
      o
    );
  }
  return rr(a) === s;
}
function C_(a, i) {
  try {
    const s = rr(a), o = Nl(s);
    return o.entries.some((c) => c.digest === i) ? !0 : s !== null && s !== Dd(o.entries);
  } catch {
    return !0;
  }
}
function ug(a, i) {
  return C_(a, i) ? !0 : My(a, Rd(i));
}
function Rd(a) {
  if (!Ay.test(a))
    throw new ut("BUNDLE_TAMPERED", "Study digest is not a lowercase SHA-256 value");
  return `${S_}${a}`;
}
async function D_(a) {
  return Td(a);
}
function R_(a) {
  try {
    return Nl(a.storage.get(hl));
  } catch {
    return si;
  }
}
async function Oy(a, i) {
  const s = await Md(i), o = await Td(s), c = Object.freeze({
    id: o.payload.id,
    digest: o.integrity.contentSha256,
    createdAt: o.payload.createdAt,
    hypothesis: o.payload.spec.hypothesis,
    kind: "portable"
  });
  return T_(async () => {
    const d = rr(a), y = cg(d).entries.find((v) => v.id === c.id);
    if (y && y.digest !== c.digest)
      throw new ut(
        "ID_CONFLICT",
        `Study '${c.id}' already exists with different content; fork it to a new id before saving`
      );
    const p = Rd(c.digest);
    let h;
    try {
      h = a.storage.get(p);
    } catch (v) {
      throw new ut("BUNDLE_READ_FAILED", `Could not inspect study blob ${c.digest}`, v);
    }
    if (h !== null && h !== s)
      throw new ut(
        "BUNDLE_KEY_CONFLICT",
        `Content-addressed study blob ${c.digest} already contains different bytes`
      );
    if (y && h === s)
      return Object.freeze({
        status: "unchanged",
        entry: y,
        cleanupFailures: Object.freeze([])
      });
    const b = h === null;
    if (b) {
      try {
        a.storage.set(p, s);
      } catch (v) {
        let S;
        try {
          S = a.storage.get(p);
        } catch {
          S = void 0;
        }
        if (S === s)
          h = S;
        else
          throw S !== void 0 && My(a, p), new ut(
            "BUNDLE_WRITE_FAILED",
            `Could not store portable study blob ${c.digest}`,
            v
          );
      }
      if (h !== null && h !== s)
        throw new ut(
          "BUNDLE_KEY_CONFLICT",
          `Content-addressed study blob ${c.digest} changed during the write`
        );
    }
    try {
      for (let v = 0; v < lg; v += 1) {
        const S = rr(a), A = cg(S), O = A.entries.find((Y) => Y.id === c.id);
        if (O) {
          if (O.digest !== c.digest)
            throw new ut(
              "ID_CONFLICT",
              `Study '${c.id}' already exists with different content; fork it to a new id before saving`
            );
          return Object.freeze({
            status: b ? "saved" : "unchanged",
            entry: O,
            cleanupFailures: Object.freeze([])
          });
        }
        const E = [...A.entries, c], L = [...A.entries].sort($_).slice(0, Math.max(0, E.length - Ey)), R = new Set(L.map((Y) => Y.digest)), j = E.filter((Y) => !R.has(Y.digest)).sort(Al), q = Dd(j);
        if (!O_(a, S, q)) continue;
        const Z = [];
        for (const Y of L)
          ug(a, Y.digest) || Z.push(Y.digest);
        return Object.freeze({
          status: "saved",
          entry: c,
          cleanupFailures: Object.freeze(Z)
        });
      }
      throw new ut(
        "INDEX_WRITE_FAILED",
        `Portable study index changed during ${lg} consecutive commit attempts`
      );
    } catch (v) {
      throw b && ug(a, c.digest), v;
    }
  });
}
async function dg(a, i) {
  w_(i);
  const o = Nl(rr(a)).entries.find((f) => f.id === i);
  if (!o)
    throw new ut("STUDY_NOT_FOUND", `Portable study '${i}' is not indexed`);
  const c = Rd(o.digest);
  let d;
  try {
    d = a.storage.get(c);
  } catch (f) {
    throw new ut("BUNDLE_READ_FAILED", `Could not read portable study '${i}'`, f);
  }
  if (d === null)
    throw new ut("BUNDLE_MISSING", `Portable study '${i}' is indexed but its blob is missing`);
  try {
    const f = await Td(d), y = await Md(f);
    if (f.payload.id !== o.id || f.integrity.contentSha256 !== o.digest || y !== d)
      throw new ut(
        "BUNDLE_TAMPERED",
        `Portable study '${i}' does not match its content-addressed index entry`
      );
    return f;
  } catch (f) {
    if (f instanceof ut) throw f;
    const y = f instanceof hn ? ` (${f.code})` : "";
    throw new ut(
      "BUNDLE_TAMPERED",
      `Portable study '${i}' failed integrity verification${y}`,
      f
    );
  }
}
const z_ = 96e3;
function Ss(a) {
  if (typeof a == "number" && Number.isFinite(a)) return a;
  if (typeof a == "boolean") return a ? 1 : 0;
}
const L_ = ["loss", "train_loss", "val_loss"];
function Cy(a) {
  if (a)
    for (const i of L_) {
      const s = a[i];
      if (typeof s == "number" && Number.isFinite(s)) return s;
    }
}
function Da(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : null;
}
function fg(a, i, s) {
  const o = Da(s);
  if (!o) return;
  if ((typeof o.type == "string" ? o.type : "") === "model") {
    const y = Ss(o.trainable ?? o.params);
    y !== void 0 && (a.modelParams[i] = y);
    return;
  }
  const d = o.value, f = Ss(d);
  if (f !== void 0) {
    a.scalars[i] = f;
    return;
  }
  typeof d == "string" && d.length > 0 && (a.strings[i] = d.slice(0, 200));
}
function zd(a) {
  const i = {
    scalars: {},
    strings: {},
    modelParams: {},
    progress: null,
    texts: [],
    media: []
  }, s = Da(a.output_summary);
  if (s)
    for (const [d, f] of Object.entries(s))
      fg(i, d, f);
  const o = Da(a.progress);
  o && (i.progress = o);
  const c = Array.isArray(a.outputs) ? a.outputs : [];
  for (const d of c) {
    const f = Da(d);
    if (!f) continue;
    const y = typeof f.output_kind == "string" ? f.output_kind : "";
    if (y === "progress") {
      const p = Da(f.progress);
      p && (i.progress = p);
    } else if (y === "tensor_summary") {
      const p = Da(f.tensor_summary);
      if (p)
        for (const [h, b] of Object.entries(p))
          fg(i, h, b);
    } else if (y === "text")
      typeof f.text == "string" && f.text.length > 0 && i.texts.push(f.text);
    else if (y === "image") {
      const p = Da(f.image), h = p && typeof p.data == "string" ? p.data : "";
      h && h.length <= z_ && i.media.push({
        kind: "image",
        data: h,
        format: p && typeof p.format == "string" ? p.format : "png",
        ...typeof f.port == "string" && f.port ? { port: f.port } : {}
      });
    } else if (y === "video") {
      const p = Da(f.video), h = p && typeof p.url == "string" ? p.url : "";
      if (h && h.startsWith("/")) {
        const b = {
          kind: "video",
          url: h,
          format: p && typeof p.format == "string" ? p.format : "mp4",
          ...typeof f.port == "string" && f.port ? { port: f.port } : {}
        };
        for (const v of ["fps", "frames", "width", "height", "bytes"]) {
          const S = Ss(p == null ? void 0 : p[v]);
          S !== void 0 && (b[v] = S);
        }
        i.media.push(b);
      }
    }
  }
  return i;
}
const Ld = "experiment-sessions-v1", cd = "gcp:experiments-changed", pg = 8, gl = 16, U_ = 20, Dy = 600 * 1e3, V_ = "graph-copilot.experiment-sessions-v1.lock";
function Ry(a) {
  const i = a.timeout_minutes;
  return typeof i != "number" || !Number.isFinite(i) ? Dy : Math.min(60, Math.max(1, Math.round(i))) * 60 * 1e3;
}
class nl extends Error {
  constructor(s, o) {
    super(s.message);
    on(this, "observation");
    this.name = s.name, this.observation = o;
  }
}
function _s(a) {
  return a === void 0 ? a : JSON.parse(JSON.stringify(a));
}
function B_(a) {
  const i = String(a);
  return a instanceof ut && a.causeValue !== void 0 ? `${i}: ${String(a.causeValue)}` : i;
}
function Es(a) {
  const i = typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${a}-${i}`;
}
function k_(a) {
  return typeof a == "number" && Number.isFinite(a) ? a : void 0;
}
function yl(a) {
  if (a.length !== 0)
    return a.reduce((i, s) => i + s, 0) / a.length;
}
function H_(a) {
  if (a.length < 2) return;
  const i = yl(a);
  return Math.sqrt(a.reduce((s, o) => s + (o - i) ** 2, 0) / (a.length - 1));
}
function mg(a) {
  return JSON.stringify({
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets ?? []
  });
}
function Ud(a) {
  const i = a.nodes.filter((o) => o.type !== "note"), s = new Set(i.map((o) => o.id));
  return {
    ...a,
    nodes: i,
    edges: a.edges.filter((o) => typeof o.source == "string" && typeof o.target == "string" && s.has(o.source) && s.has(o.target))
  };
}
function I_(a) {
  return Object.fromEntries(a.params.map((i) => [i.name, _s(i.default)]));
}
function G_(a, i) {
  if (a.param_type === "int" && (typeof i != "number" || !Number.isInteger(i)))
    return `Parameter '${a.name}' must be an integer`;
  if (a.param_type === "float" && (typeof i != "number" || Number.isNaN(i)))
    return `Parameter '${a.name}' must be a number`;
  if (a.param_type === "bool" && typeof i != "boolean")
    return `Parameter '${a.name}' must be a boolean`;
  if (a.param_type === "string" && typeof i != "string")
    return `Parameter '${a.name}' must be a string`;
  if (a.param_type === "select" && (typeof i != "string" || !a.options.includes(i)))
    return `Parameter '${a.name}' must be one of: ${a.options.join(", ")}`;
  if ((a.param_type === "int" || a.param_type === "float") && typeof i == "number") {
    if (a.min_value !== null && i < a.min_value)
      return `Parameter '${a.name}' must be >= ${a.min_value}`;
    if (a.max_value !== null && i > a.max_value)
      return `Parameter '${a.name}' must be <= ${a.max_value}`;
  }
}
function hg(a, i) {
  if (!i || typeof i != "object" || Array.isArray(i))
    return "params must be an object";
  const s = new Map(a.params.map((o) => [o.name, o]));
  for (const [o, c] of Object.entries(i)) {
    const d = s.get(o);
    if (!d)
      return `Unknown parameter '${o}' for node type '${a.node_name}'`;
    const f = G_(d, c);
    if (f) return f;
  }
}
function q_(a) {
  return a.map((i) => {
    switch (i.op) {
      case "add_node":
        return `add ${i.node_type}${i.params ? ` (${Object.keys(i.params).join(", ") || "defaults"})` : ""}`;
      case "set_params":
        return `set ${i.node_id}: ${Object.keys(i.params).join(", ") || "no parameters"}`;
      case "connect":
        return `connect ${i.source}.${i.source_handle} -> ${i.target}.${i.target_handle}`;
      case "remove_node":
        return `remove node ${i.node_id}`;
      case "remove_edge":
        return `remove edge ${i.source} -> ${i.target}`;
      case "clear_graph":
        return "clear graph";
      case "auto_layout":
        return "auto layout";
    }
  });
}
function gg(a, i, s) {
  const o = _s(a), c = {}, d = [], f = new Map(s.map((h) => [h.node_name, h])), y = (h) => {
    const b = c[h] ?? h;
    return o.nodes.some((v) => v.id === b) ? b : void 0;
  }, p = (h, b) => d.push({ index: h, ok: !1, error: b });
  return i.forEach((h, b) => {
    var v;
    if (!h || typeof h != "object" || typeof h.op != "string") {
      p(b, "Operation must be an object with an op field");
      return;
    }
    switch (h.op) {
      case "add_node": {
        const S = f.get(h.node_type);
        if (!S) {
          p(b, `Unknown node type '${h.node_type}'`);
          return;
        }
        if (h.params !== void 0) {
          const E = hg(S, h.params);
          if (E) {
            p(b, `add_node: ${E}`);
            return;
          }
        }
        const A = Es("candidate-node"), O = {
          id: A,
          type: h.node_type,
          position: h.position ?? {
            x: 160 + o.nodes.length % 4 * 240,
            y: 120 + Math.floor(o.nodes.length / 4) * 160
          },
          data: { params: { ...I_(S), ...h.params ?? {} } }
        };
        o.nodes.push(O), h.ref && (c[h.ref] = A), d.push({ index: b, ok: !0, node_id: A });
        return;
      }
      case "set_params": {
        const S = y(h.node_id);
        if (!S) {
          p(b, `set_params: unknown node '${h.node_id}'`);
          return;
        }
        const A = o.nodes.find((L) => L.id === S), O = typeof A.type == "string" ? f.get(A.type) : void 0;
        if (!O) {
          p(b, `set_params: node '${h.node_id}' has no known definition`);
          return;
        }
        const E = hg(O, h.params);
        if (E) {
          p(b, `set_params: ${E}`);
          return;
        }
        A.data = {
          ...A.data ?? {},
          params: { ...((v = A.data) == null ? void 0 : v.params) ?? {}, ..._s(h.params) }
        }, d.push({ index: b, ok: !0, node_id: S });
        return;
      }
      case "connect": {
        const S = y(h.source), A = y(h.target);
        if (!S || !A) {
          p(b, `connect: unknown ${S ? "target" : "source"} node`);
          return;
        }
        const O = h.source_handle === "trigger", E = {
          id: Es("candidate-edge"),
          source: S,
          target: A,
          sourceHandle: h.source_handle,
          targetHandle: O ? "__trigger" : h.target_handle,
          ...O ? { type: "trigger" } : {}
        };
        o.edges.push(E), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_node": {
        const S = y(h.node_id);
        if (!S) {
          p(b, `remove_node: unknown node '${h.node_id}'`);
          return;
        }
        o.nodes = o.nodes.filter((A) => A.id !== S), o.edges = o.edges.filter((A) => A.source !== S && A.target !== S), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_edge": {
        const S = y(h.source), A = y(h.target);
        if (!S || !A) {
          p(b, "remove_edge: unknown source or target node");
          return;
        }
        const O = o.edges.length;
        o.edges = o.edges.filter((E) => !(E.source === S && E.target === A && (h.source_handle === void 0 || E.sourceHandle === h.source_handle) && (h.target_handle === void 0 || E.targetHandle === h.target_handle))), O === o.edges.length ? p(b, "remove_edge: no matching edge") : d.push({ index: b, ok: !0 });
        return;
      }
      case "clear_graph":
        o.nodes = [], o.edges = [], Object.keys(c).forEach((S) => delete c[S]), d.push({ index: b, ok: !0 });
        return;
      case "auto_layout":
        o.nodes.forEach((S, A) => {
          S.position = {
            x: 120 + A % 4 * 260,
            y: 100 + Math.floor(A / 4) * 180
          };
        }), d.push({ index: b, ok: !0 });
        return;
      default:
        p(b, `Unknown operation '${h.op ?? ""}'`);
    }
  }), { graph: o, results: d, refs: c };
}
async function K_(a, i, s) {
  try {
    const o = Ud(i), c = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: s,
      body: JSON.stringify({
        nodes: o.nodes,
        edges: o.edges,
        presets: o.presets ?? []
      })
    });
    if (!c.ok) return [`Validation request failed: HTTP ${c.status}`];
    const d = await c.json(), f = Array.isArray(d.errors) ? d.errors.map(String) : [];
    return d.valid !== !0 ? f.length > 0 ? f : ["Graph validation returned an invalid or malformed result"] : f.length === 0 ? [] : ["Graph validation returned valid=true together with errors", ...f];
  } catch (o) {
    if (s != null && s.aborted) throw new DOMException("Experiment cancelled", "AbortError");
    return [`Validation request failed: ${String(o)}`];
  }
}
async function zy(a, i) {
  const s = await a.http.fetch("/api/auth/bootstrap", { signal: i });
  if (!s.ok) throw new Error(`Execution auth bootstrap failed: HTTP ${s.status}`);
  const o = await s.json();
  if (typeof o.token != "string" || !o.token)
    throw new Error("Execution auth bootstrap returned no token");
  return o.token;
}
function Ly(a) {
  const i = window.location.protocol === "https:" ? "wss:" : "ws:", s = new URL(`${i}//${window.location.host}/ws/execution`);
  return s.searchParams.set("token", a), s.toString();
}
function vl(a, i) {
  let s = a;
  const o = [.../* @__PURE__ */ new Set([i, encodeURIComponent(i)])].filter((c) => c.length > 0).sort((c, d) => d.length - c.length);
  for (const c of o) s = s.split(c).join("[REDACTED]");
  return s;
}
function Y_(a, i, s, o, c, d) {
  const f = a.nodes.find((p) => p.id === i), y = f ? a.nodes.filter((p) => p.type === f.type).length : 0;
  for (const [p, h] of Object.entries(s)) {
    const b = `${i}.${p}`, v = f != null && f.type && y === 1 ? `${f.type}.${p}` : b;
    o[b] = h, c[b] = v, d[b] = "output_summary", f != null && f.type && y === 1 && (o[v] = h, c[v] = v, d[v] = "output_summary");
  }
}
function X_(a, i, s, o, c, d) {
  if (!s || typeof s != "object") return;
  const f = a.nodes.find((p) => p.id === i), y = f ? a.nodes.filter((p) => p.type === f.type).length : 0;
  for (const [p, h] of Object.entries(s)) {
    const b = k_(h);
    if (b === void 0) continue;
    const v = `${i}.progress.${p}`, S = f != null && f.type && y === 1 ? `${f.type}.progress.${p}` : v;
    o[v] = b, c[v] = S, d[v] = "progress", f != null && f.type && y === 1 && (o[S] = b, c[S] = S, d[S] = "progress");
  }
}
function J_(a, i, s, o = Dy) {
  const c = Ud(a), d = Date.now();
  return new Promise((f, y) => {
    const p = new WebSocket(Ly(i)), h = {}, b = {}, v = {};
    let S = !1;
    const A = (L) => {
      if (S) return;
      S = !0, clearTimeout(E), s == null || s.removeEventListener("abort", O), (p.readyState === WebSocket.OPEN || p.readyState === WebSocket.CONNECTING) && p.close();
      const R = Date.now() - d;
      h["system.runtime_ms"] = R, b["system.runtime_ms"] = "system.runtime_ms", v["system.runtime_ms"] = "client";
      const j = { metrics: h, metricIdentities: b, metricSources: v, durationMs: R };
      L ? L instanceof DOMException && L.name === "AbortError" ? y(L) : y(new nl(L, j)) : f(j);
    }, O = () => A(new DOMException("Experiment cancelled", "AbortError")), E = setTimeout(
      () => A(new Error(`Experiment run timed out after ${Math.round(o / 1e3)}s`)),
      o
    );
    if (s == null || s.addEventListener("abort", O, { once: !0 }), s != null && s.aborted) {
      O();
      return;
    }
    p.onopen = () => {
      p.send(JSON.stringify({
        action: "execute",
        nodes: c.nodes,
        edges: c.edges,
        presets: c.presets ?? [],
        run_id: Es("gcp-experiment-run"),
        // Scalar summaries arrive on node_status regardless. Avoid retaining
        // full tensors for every candidate in CodefyUI's in-memory run store.
        record_outputs: !1,
        graph_id: Es("gcp-experiment-graph"),
        weights_persistent: !1
      }));
    }, p.onmessage = (L) => {
      let R;
      try {
        R = JSON.parse(String(L.data));
      } catch {
        return;
      }
      const j = String(R.type ?? "");
      if (j === "node_status") {
        const q = String(R.node_id ?? ""), Z = zd(R);
        Y_(c, q, Z.scalars, h, b, v), Z.progress && X_(c, q, Z.progress, h, b, v);
      } else j === "execution_complete" ? A() : (j === "execution_error" || j === "execution_stopped" || j === "error") && A(new Error(String(R.error ?? j)));
    }, p.onerror = () => A(new Error("Experiment execution WebSocket failed")), p.onclose = () => {
      S || A(new Error("Experiment execution WebSocket closed before completion"));
    };
  }).catch((f) => {
    if (f instanceof DOMException && f.name === "AbortError") throw f;
    if (f instanceof nl) {
      const p = new Error(vl(f.message, i));
      throw p.name = f.name, new nl(p, f.observation);
    }
    const y = f instanceof Error ? f.message : String(f);
    throw new Error(vl(y, i));
  });
}
function ud(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function yg(a, i, s = {}) {
  const o = Object.entries(a).filter(([, b]) => Number.isFinite(b));
  if (o.length === 0) return;
  const c = (b) => ({
    key: s[b[0]] ?? b[0],
    value: b[1],
    observedKey: b[0]
  }), d = (b) => new Set(b.map(([S]) => s[S] ?? S)).size === 1 && b.length > 0 ? c(b[0]) : void 0, f = i.metric.trim(), y = o.find(([b]) => b === f) ?? o.find(([b]) => b.toLowerCase() === f.toLowerCase());
  if (y) return c(y);
  if (f && f.toLowerCase() !== "auto") {
    const b = ud(f), v = o.filter(([S]) => {
      const A = ud(S);
      return A === b || A.endsWith(`.${b}`);
    });
    return d(v);
  }
  const p = i.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = o.filter(([b]) => p.test(b));
  return h.length > 0 ? d(h) : i.direction === "minimize" ? d(o.filter(([b]) => /(^|\.)runtime_ms$/i.test(b))) : void 0;
}
async function vg(a, i, s) {
  const o = new Array(a.length);
  let c = 0;
  const d = Array.from({ length: Math.min(i, a.length) }, async () => {
    for (; c < a.length; ) {
      const f = c++;
      o[f] = await s(a[f], f);
    }
  });
  return await Promise.all(d), o;
}
function Q_(a) {
  const i = /* @__PURE__ */ new Map();
  for (const s of a)
    for (const [o, c] of Object.entries(s.metrics))
      i.has(o) || i.set(o, []), i.get(o).push(c);
  return Object.fromEntries(
    [...i.entries()].sort(([s], [o]) => s.localeCompare(o)).slice(0, 40).map(([s, o]) => [s, yl(o)])
  );
}
function Z_(a) {
  const i = a.variants.filter((c) => c.operations.length === 0).length, s = a.variants.filter((c) => c.operations.length > 0);
  if (i !== 1 || s.length === 0) return;
  let o;
  for (const c of s) {
    if (c.operations.length !== 1) return;
    const d = c.operations[0];
    if (d.op !== "set_params") return;
    const f = Object.keys(d.params);
    if (f.length !== 1) return;
    const y = `${d.node_id}.${f[0]}`;
    if (o && o !== y) return;
    o = y;
  }
  return o;
}
function F_(a, i, s, o = []) {
  const c = [], d = [], f = [], y = Z_(a);
  if (o.length > 1)
    c.push(
      `No unique winner: ${o.map((b) => b.label).join(", ")} tied at ${o[0].mean.toPrecision(6)}.`
    ), d.push("Automatic promotion was skipped because the top observed means were tied.");
  else if ((s == null ? void 0 : s.mean) !== void 0) {
    if (c.push(
      `${s.label} has the top observed mean at ${s.mean.toPrecision(6)} (${a.objective.direction} ${s.metricKey ?? a.objective.metric}).`
    ), s.confidenceInterval95 && c.push(
      `Its descriptive 95% Student-t interval is [${s.confidenceInterval95.lower.toPrecision(5)}, ${s.confidenceInterval95.upper.toPrecision(5)}].`
    ), s.baselineComparison) {
      const v = s.baselineComparison.hedgesG === void 0 ? "" : `; Hedges g=${s.baselineComparison.hedgesG.toPrecision(4)}`;
      c.push(
        `Versus baseline, the direction-adjusted mean change is ${s.baselineComparison.objectiveImprovement.toPrecision(5)}${v}.`
      );
    }
    const b = i.filter((v) => v.mean !== void 0).sort((v, S) => a.objective.direction === "maximize" ? S.mean - v.mean : v.mean - S.mean);
    if (b.length > 1) {
      const v = Math.abs(b[0].mean - b[1].mean);
      c.push(`The lead over the runner-up is ${v.toPrecision(4)}.`);
    }
    y ? f.push({
      title: `Controlled parameter study: ${y}`,
      evidence: `A one-factor pilot found the top observed mean for ${s.label} across ${a.repetitions ?? 1} repeated execution(s).`,
      nextStep: "Add an explicit seed schedule, report confidence intervals, and test on a held-out dataset."
    }) : f.push({
      title: `Replication study for ${a.objective.metric}`,
      evidence: `${s.label} has the top observed mean, but the variants are not proven to be a controlled one-factor ablation.`,
      nextStep: "Create a baseline and one-factor variants, add controlled seeds, then repeat on held-out data."
    });
  } else if (o.length === 0) {
    const b = i.some((v) => v.errors.some((S) => S.includes("cross-candidate ranking was refused")));
    d.push(b ? "Candidates exposed different objective metric identities, so no cross-candidate ranking was valid." : `No candidate exposed the requested numeric metric '${a.objective.metric}'.`);
  }
  (a.repetitions ?? 1) < 3 ? d.push("This is a pilot comparison, not paper-grade evidence; use at least 3-5 controlled independent seeds.") : d.push("Repetitions reused each candidate graph. Treat them as independent seeds only when the graph contains an explicit seed schedule."), i.some((b) => {
    var v;
    return b.confidenceInterval95 || ((v = b.baselineComparison) == null ? void 0 : v.hedgesG) !== void 0;
  }) && d.push(
    "Confidence intervals and Hedges g are descriptive screening statistics here; no hypothesis test, multiple-comparison correction, or causal claim was performed."
  );
  const p = i.filter((b) => b.status !== "completed");
  p.length > 0 && d.push(`${p.length} candidate(s) were invalid or failed during execution.`);
  const h = i.filter((b) => b.mean !== void 0 && b.stddev !== void 0 && Math.abs(b.mean) > 0 && b.stddev / Math.abs(b.mean) > 0.1);
  return h.length > 0 && (d.push(`High run-to-run variation detected for: ${h.map((b) => b.label).join(", ")}.`), f.push({
    title: "Sensitivity and stability analysis",
    evidence: "At least one candidate has a coefficient of variation above 10% in this pilot.",
    nextStep: "Increase repetitions and test whether initialization, data order, or hyperparameters explain the variance."
  })), { summary: c, warnings: d, paperIdeas: f };
}
function W_(a) {
  const { applyResult: i, appliedOperations: s, ...o } = a;
  return o;
}
function Uy(a) {
  if (!a || typeof a != "object") return;
  const i = a;
  if (typeof i.id != "string" || typeof i.createdAt != "string" || typeof i.hypothesis != "string" || !i.objective || typeof i.objective.metric != "string" || !["maximize", "minimize"].includes(i.objective.direction) || typeof i.repetitions != "number" || !Number.isInteger(i.repetitions) || !Array.isArray(i.variants))
    return;
  const s = i.variants.filter((c) => !!c && typeof c == "object" && typeof c.id == "string" && typeof c.label == "string" && ["completed", "invalid", "failed"].includes(c.status) && Array.isArray(c.metricValues) && c.metricValues.every((d) => typeof d == "number" && Number.isFinite(d)) && (c.metricKey === void 0 || typeof c.metricKey == "string") && (c.mean === void 0 || typeof c.mean == "number" && Number.isFinite(c.mean)) && (c.stddev === void 0 || typeof c.stddev == "number" && Number.isFinite(c.stddev)) && (c.confidenceInterval95 === void 0 || c.confidenceInterval95.level === 0.95 && typeof c.confidenceInterval95.lower == "number" && Number.isFinite(c.confidenceInterval95.lower) && typeof c.confidenceInterval95.upper == "number" && Number.isFinite(c.confidenceInterval95.upper)) && (c.baselineComparison === void 0 || typeof c.baselineComparison.baselineId == "string" && typeof c.baselineComparison.meanDelta == "number" && Number.isFinite(c.baselineComparison.meanDelta) && typeof c.baselineComparison.objectiveImprovement == "number" && Number.isFinite(c.baselineComparison.objectiveImprovement) && (c.baselineComparison.hedgesG === void 0 || typeof c.baselineComparison.hedgesG == "number" && Number.isFinite(c.baselineComparison.hedgesG))) && typeof c.runtimeMs == "number" && Number.isFinite(c.runtimeMs) && !!c.observedMetrics && typeof c.observedMetrics == "object" && Array.isArray(c.errors) && c.errors.every((d) => typeof d == "string") && (c.runs === void 0 || Array.isArray(c.runs) && c.runs.every((d) => !!d && typeof d == "object" && Number.isInteger(d.repetition) && d.repetition >= 1 && ["completed", "failed"].includes(d.status) && typeof d.durationMs == "number" && Number.isFinite(d.durationMs) && (d.metricKey === void 0 || typeof d.metricKey == "string") && (d.metricValue === void 0 || typeof d.metricValue == "number" && Number.isFinite(d.metricValue)) && (d.metricSource === void 0 || ["output_summary", "progress", "client"].includes(d.metricSource)) && !!d.observedMetrics && typeof d.observedMetrics == "object" && Object.values(d.observedMetrics).every((f) => typeof f == "number" && Number.isFinite(f)) && (d.observedMetricIdentities === void 0 || !!d.observedMetricIdentities && typeof d.observedMetricIdentities == "object" && Object.values(d.observedMetricIdentities).every((f) => typeof f == "string") && Object.keys(d.observedMetricIdentities).every((f) => f in d.observedMetrics)) && (d.observedMetricSources === void 0 || !!d.observedMetricSources && typeof d.observedMetricSources == "object" && Object.values(d.observedMetricSources).every((f) => ["output_summary", "progress", "client"].includes(f)) && Object.keys(d.observedMetricSources).every((f) => f in d.observedMetrics)) && (d.error === void 0 || typeof d.error == "string"))) && (c.operationSummary === void 0 || Array.isArray(c.operationSummary) && c.operationSummary.every((d) => typeof d == "string"))), o = i.insights && typeof i.insights == "object" ? i.insights : { summary: [], warnings: [], paperIdeas: [] };
  return {
    ...i,
    status: ["completed", "partial", "failed"].includes(i.status ?? "") ? i.status : "failed",
    repetitions: i.repetitions,
    objective: i.objective,
    variants: s,
    baselineVariantId: typeof i.baselineVariantId == "string" ? i.baselineVariantId : void 0,
    search: Vd(i.search) ? i.search : void 0,
    insights: {
      summary: Array.isArray(o.summary) ? o.summary.filter((c) => typeof c == "string") : [],
      warnings: Array.isArray(o.warnings) ? o.warnings.filter((c) => typeof c == "string") : [],
      paperIdeas: Array.isArray(o.paperIdeas) ? o.paperIdeas.filter((c) => !!c && typeof c == "object" && typeof c.title == "string" && typeof c.evidence == "string" && typeof c.nextStep == "string") : []
    }
  };
}
function Vy(a) {
  try {
    const i = a.storage.get(Ld);
    if (!i) return [];
    const s = JSON.parse(i);
    return Array.isArray(s) ? s.map(Uy).filter((o) => !!o) : [];
  } catch {
    return [];
  }
}
function P_(a) {
  let i;
  try {
    i = a.storage.get(Ld);
  } catch (c) {
    throw new Error(`Could not read the Experiment Lab archive before mutation: ${String(c)}`);
  }
  if (i === null) return [];
  let s;
  try {
    s = JSON.parse(i);
  } catch (c) {
    throw new Error(`Experiment Lab archive is malformed and remains read-only: ${String(c)}`);
  }
  if (!Array.isArray(s))
    throw new Error("Experiment Lab archive is malformed and remains read-only: expected an array");
  const o = s.map((c, d) => {
    const f = Uy(c);
    if (!f)
      throw new Error(`Experiment Lab archive entry ${d} is invalid and cannot be safely rewritten`);
    return f;
  });
  if (new Set(o.map((c) => c.id)).size !== o.length)
    throw new Error("Experiment Lab archive contains duplicate study ids and cannot be safely rewritten");
  if (i !== JSON.stringify(o))
    throw new Error("Experiment Lab archive is non-canonical or contains lossy legacy data and remains read-only");
  return o;
}
async function By(a, i, s = {}) {
  await Ty(V_, async () => {
    const o = P_(a);
    if (s.rejectIfExists && o.some((d) => d.id === i.id))
      throw new Error(
        `A local Experiment Lab report already uses study id '${i.id}'; import was refused to avoid overwriting local evidence.`
      );
    const c = [W_(i), ...o.filter((d) => d.id !== i.id)].slice(0, U_);
    a.storage.set(Ld, JSON.stringify(c));
  }), typeof window < "u" && window.dispatchEvent(new Event(cd));
}
function bg(a, i, s, o, c) {
  const d = _l(
    {
      id: `experiment-session:${s.id}`,
      name: "run_graph_experiments",
      arguments: i
    },
    JSON.stringify(s),
    a,
    [{ graph: o, definitions: c }]
  );
  return JSON.parse(d);
}
function e1(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return "operation must be an object";
  const i = a, s = (o) => typeof i[o] == "string" && i[o] !== "";
  switch (i.op) {
    case "add_node":
      return s("node_type") ? i.ref !== void 0 && typeof i.ref != "string" ? "add_node ref must be a string" : i.params !== void 0 && (!i.params || typeof i.params != "object" || Array.isArray(i.params)) ? "add_node params must be an object" : void 0 : "add_node requires node_type";
    case "set_params":
      return s("node_id") ? !i.params || typeof i.params != "object" || Array.isArray(i.params) ? "set_params params must be an object" : void 0 : "set_params requires node_id";
    case "connect":
      return s("source") && s("source_handle") && s("target") && typeof i.target_handle == "string" ? void 0 : "connect requires string source, source_handle, target, and target_handle";
    case "remove_node":
      return s("node_id") ? void 0 : "remove_node requires node_id";
    case "remove_edge":
      return !s("source") || !s("target") ? "remove_edge requires source and target" : i.source_handle !== void 0 && typeof i.source_handle != "string" ? "remove_edge source_handle must be a string" : i.target_handle !== void 0 && typeof i.target_handle != "string" ? "remove_edge target_handle must be a string" : void 0;
    case "clear_graph":
    case "auto_layout":
      return;
    default:
      return `unknown operation '${String(i.op ?? "")}'`;
  }
}
function Fo(a, i) {
  const s = new Set(i);
  return Object.keys(a).every((o) => s.has(o));
}
function Ku(a) {
  return typeof a == "boolean" || typeof a == "string" || typeof a == "number" && Number.isFinite(a);
}
function Vd(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const i = a;
  if (!Fo(i, [
    "schemaVersion",
    "strategy",
    "prngVersion",
    "plannerSeed",
    "seedDescription",
    "includesBaseline",
    "totalDomainAssignments",
    "baselineAssignmentExcluded",
    "generatedCandidateCount",
    "totalVariantCount",
    "totalExecutionCount",
    "bindings",
    "assignments"
  ]) || i.schemaVersion !== 1 || !["grid", "seeded_random"].includes(String(i.strategy)) || typeof i.seedDescription != "string" || typeof i.includesBaseline != "boolean" || typeof i.baselineAssignmentExcluded != "boolean") return !1;
  for (const c of [
    "totalDomainAssignments",
    "generatedCandidateCount",
    "totalVariantCount",
    "totalExecutionCount"
  ])
    if (!Number.isInteger(i[c]) || i[c] < 0) return !1;
  if (i.strategy === "seeded_random") {
    if (i.prngVersion !== "mulberry32-v1" || !Number.isInteger(i.plannerSeed) || i.plannerSeed < 0 || i.plannerSeed > 4294967295) return !1;
  } else if (i.prngVersion !== void 0 || i.plannerSeed !== void 0)
    return !1;
  if (!Array.isArray(i.bindings) || i.bindings.length < 1 || i.bindings.length > 4)
    return !1;
  const s = [];
  for (const c of i.bindings) {
    if (!c || typeof c != "object" || Array.isArray(c)) return !1;
    const d = c;
    if (!Fo(d, [
      "nodeId",
      "nodeType",
      "param",
      "paramType",
      "baselineValue",
      "domain"
    ]) || typeof d.nodeId != "string" || typeof d.nodeType != "string" || typeof d.param != "string" || !["int", "float", "bool", "select"].includes(String(d.paramType)) || !Ku(d.baselineValue) || !Array.isArray(d.domain) || d.domain.length < 1 || d.domain.length > 32 || !d.domain.every(Ku)) return !1;
    s.push(`${d.nodeId}\0${d.param}`);
  }
  if (new Set(s).size !== s.length || !Array.isArray(i.assignments) || i.assignments.length > 8) return !1;
  const o = [];
  for (const c of i.assignments) {
    if (!c || typeof c != "object" || Array.isArray(c)) return !1;
    const d = c;
    if (!Fo(d, ["variantId", "domainIndex", "values"]) || typeof d.variantId != "string" || !Number.isInteger(d.domainIndex) || d.domainIndex < 0 || !Array.isArray(d.values) || d.values.length !== i.bindings.length) return !1;
    o.push(d.variantId);
    for (const f of d.values) {
      if (!f || typeof f != "object" || Array.isArray(f)) return !1;
      const y = f;
      if (!Fo(y, ["nodeId", "param", "value"]) || typeof y.nodeId != "string" || typeof y.param != "string" || !Ku(y.value)) return !1;
    }
  }
  return new Set(o).size === o.length && i.generatedCandidateCount === i.assignments.length;
}
function ky(a) {
  if (!a || typeof a != "object") throw new Error("Experiment request must be an object");
  if (typeof a.hypothesis != "string" || !a.hypothesis.trim())
    throw new Error("Experiment requires a hypothesis");
  if (!a.objective || typeof a.objective != "object" || typeof a.objective.metric != "string" || !a.objective.metric.trim())
    throw new Error("Experiment requires an objective metric");
  if (!["maximize", "minimize"].includes(a.objective.direction))
    throw new Error("Experiment objective direction must be maximize or minimize");
  if (!Array.isArray(a.variants) || a.variants.length === 0)
    throw new Error("Experiment requires at least one variant");
  if (a.variants.length > pg)
    throw new Error(`Experiment supports at most ${pg} variants`);
  const i = a.repetitions ?? 1;
  if (!Number.isInteger(i) || i < 1 || i > 5)
    throw new Error("Experiment repetitions must be an integer from 1 to 5");
  if (a.variants.length * i > gl)
    throw new Error(`Experiment budget is capped at ${gl} total runs`);
  const s = a.concurrency ?? 1;
  if (!Number.isInteger(s) || s < 1 || s > 2)
    throw new Error("Experiment concurrency must be an integer from 1 to 2");
  if (a.apply_best !== void 0 && typeof a.apply_best != "boolean")
    throw new Error("Experiment apply_best must be a boolean");
  if (a.search !== void 0 && !Vd(a.search))
    throw new Error("Experiment search metadata is malformed");
  const o = a.variants.map((c, d) => {
    var f;
    if (!c || typeof c != "object") throw new Error("Every experiment variant must be an object");
    if (c.id !== void 0 && typeof c.id != "string")
      throw new Error("Experiment variant ids must be strings");
    return ((f = c.id) == null ? void 0 : f.trim()) || `variant-${d + 1}`;
  });
  if (new Set(o).size !== o.length) throw new Error("Experiment variant ids must be unique");
  for (const c of a.variants) {
    if (typeof c.label != "string" || !c.label.trim())
      throw new Error("Every experiment variant requires a label");
    if (!Array.isArray(c.operations)) throw new Error("Every experiment variant requires an operations array");
    c.operations.forEach((d, f) => {
      const y = e1(d);
      if (y) throw new Error(`Invalid operation ${f} in variant '${c.label}': ${y}`);
    });
  }
  if (a.search && (a.search.totalVariantCount !== a.variants.length || a.search.totalExecutionCount !== a.variants.length * i || a.search.assignments.some((c) => !o.includes(c.variantId))))
    throw new Error("Experiment search metadata does not match the compiled variants or run count");
  return { repetitions: i, concurrency: s };
}
function t1(a) {
  const { repetitions: i } = ky(a);
  return a.variants.length * i;
}
async function n1(a, i, s, o = () => !1, c = () => {
}) {
  const { repetitions: d, concurrency: f } = ky(i), y = (/* @__PURE__ */ new Date()).toISOString(), p = _s(a.graph.getGraph()), h = mg(p), b = a.graph.getNodeDefinitions(), v = i.variants.map((X, Q) => {
    var ae;
    const oe = {
      id: ((ae = X.id) == null ? void 0 : ae.trim()) || `variant-${Q + 1}`,
      label: X.label.trim(),
      operations: X.operations
    }, fe = gg(p, oe.operations, b);
    return {
      input: oe,
      graph: fe.graph,
      preparationErrors: fe.results.filter((ve) => !ve.ok).map((ve) => ve.error ?? "operation failed"),
      validationErrors: []
    };
  });
  await vg(v, 2, async (X) => {
    X.preparationErrors.length === 0 && (X.validationErrors = await K_(a, X.graph, s));
  });
  const S = v.filter((X) => X.preparationErrors.length === 0 && X.validationErrors.length === 0);
  let A = "";
  S.length > 0 && (A = await zy(a, s));
  const O = [];
  for (let X = 0; X < d; X += 1) {
    const Q = X % 2 === 0 ? S : [...S].reverse(), oe = await vg(Q, f, async (fe) => {
      try {
        return {
          variantId: fe.input.id,
          repetition: X + 1,
          observation: await J_(
            fe.graph,
            A,
            s,
            Ry(i)
          )
        };
      } catch (ae) {
        if (ae instanceof DOMException && ae.name === "AbortError") throw ae;
        return ae instanceof nl ? {
          variantId: fe.input.id,
          repetition: X + 1,
          observation: {
            ...ae.observation,
            error: String(ae)
          }
        } : {
          variantId: fe.input.id,
          repetition: X + 1,
          observation: {
            metrics: {},
            metricIdentities: {},
            metricSources: {},
            durationMs: 0,
            error: String(ae)
          }
        };
      }
    });
    O.push(...oe);
  }
  const E = v.map((X) => {
    var ie;
    const Q = O.filter((ee) => ee.variantId === X.input.id), oe = Q.map((ee) => ee.observation).filter((ee) => !ee.error), fe = oe.map((ee) => yg(ee.metrics, i.objective, ee.metricIdentities)).filter((ee) => !!ee), ae = [
      ...X.preparationErrors,
      ...X.validationErrors,
      ...Q.flatMap((ee) => ee.observation.error ? [ee.observation.error] : [])
    ], ve = new Set(fe.map((ee) => ee.key)), M = oe.length === d && fe.length === d && ve.size === 1;
    X.preparationErrors.length === 0 && X.validationErrors.length === 0 && oe.length !== d && ae.push(`Only ${oe.length}/${d} repetitions completed successfully.`), oe.length > 0 && fe.length !== oe.length && ae.push(
      `Objective metric "${i.objective.metric}" was missing in ${oe.length - fe.length}/${oe.length} successful repetitions.`
    ), ve.size > 1 && ae.push(`Objective metric resolved to inconsistent keys across repetitions: ${[...ve].join(", ")}.`);
    const J = fe.map((ee) => ee.value), T = M ? Ad(J) : void 0;
    return {
      id: X.input.id,
      label: X.input.label,
      status: X.preparationErrors.length > 0 || X.validationErrors.length > 0 ? "invalid" : M ? "completed" : "failed",
      metricKey: ve.size === 1 ? (ie = fe[0]) == null ? void 0 : ie.key : void 0,
      metricValues: J,
      mean: M ? yl(J) : void 0,
      stddev: M ? H_(J) : void 0,
      confidenceInterval95: T ? {
        level: 0.95,
        lower: T.lower,
        upper: T.upper
      } : void 0,
      runtimeMs: yl(Q.map((ee) => ee.observation.durationMs)) ?? 0,
      observedMetrics: Q_(Q.map((ee) => ee.observation)),
      runs: Q.map(({ repetition: ee, observation: x }) => {
        const U = yg(
          x.metrics,
          i.objective,
          x.metricIdentities
        );
        return {
          repetition: ee,
          status: x.error ? "failed" : "completed",
          durationMs: x.durationMs,
          metricKey: U == null ? void 0 : U.key,
          metricValue: U == null ? void 0 : U.value,
          metricSource: U ? x.metricSources[U.observedKey] : void 0,
          observedMetrics: x.metrics,
          observedMetricIdentities: x.metricIdentities,
          observedMetricSources: x.metricSources,
          ...x.error ? { error: x.error } : {}
        };
      }),
      operationSummary: q_(X.input.operations),
      errors: ae
    };
  }), L = v.filter((X) => X.input.operations.length === 0);
  if (L.length === 1) {
    const X = E.find((Q) => Q.id === L[0].input.id);
    if ((X == null ? void 0 : X.status) === "completed")
      for (const Q of E) {
        if (Q.id === X.id || Q.status !== "completed") continue;
        const oe = ms(
          Q.metricValues,
          X.metricValues,
          i.objective.direction
        );
        oe && (Q.baselineComparison = {
          baselineId: X.id,
          meanDelta: oe.rawDelta,
          objectiveImprovement: oe.improvement,
          hedgesG: oe.hedgesG
        });
      }
  }
  if (new Set(
    E.filter((X) => X.status === "completed" && X.metricKey).map((X) => ud(X.metricKey))
  ).size > 1) {
    const X = E.filter((Q) => Q.status === "completed" && Q.metricKey).map((Q) => `${Q.label}: ${Q.metricKey}`).join(", ");
    for (const Q of E)
      Q.status === "completed" && (Q.status = "failed", Q.metricValues = [], Q.mean = void 0, Q.stddev = void 0, Q.confidenceInterval95 = void 0, Q.baselineComparison = void 0, Q.errors.push(`Candidates resolved different objective metrics (${X}); cross-candidate ranking was refused.`));
  }
  const j = E.filter((X) => X.status === "completed" && X.mean !== void 0).sort((X, Q) => (i.objective.direction === "maximize" ? Q.mean - X.mean : X.mean - Q.mean) || X.id.localeCompare(Q.id)), q = j[0], Z = q ? Math.max(1, Math.abs(q.mean)) * Number.EPSILON * 8 : 0, Y = q ? j.filter((X) => Math.abs(X.mean - q.mean) <= Z) : [], K = Y.length === 1 ? q : void 0, V = {
    id: Es("experiment"),
    createdAt: y,
    hypothesis: i.hypothesis.trim(),
    objective: i.objective,
    repetitions: d,
    status: j.length === 0 ? "failed" : E.every((X) => X.status === "completed") ? "completed" : "partial",
    variants: E,
    baselineVariantId: L.length === 1 ? L[0].input.id : void 0,
    search: i.search ? _s(i.search) : void 0,
    winnerId: K == null ? void 0 : K.id,
    winnerLabel: K == null ? void 0 : K.label,
    insights: F_({ ...i, repetitions: d }, E, K, Y)
  };
  if (s != null && s.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  if (i.apply_best && K) {
    const X = v.find((fe) => fe.input.id === K.id).input, Q = o(), oe = mg(a.graph.getGraph()) !== h;
    if (c(), Q || oe)
      V.applyConflict = "The live graph changed while experiments were running; winner was not applied.";
    else if (X.operations.some((fe) => fe.op !== "set_params"))
      V.applyConflict = "Automatic promotion supports parameter-only winners; this structural winner remains a proposal for review.";
    else if (X.operations.length > 0) {
      if (s != null && s.aborted) throw new DOMException("Experiment cancelled", "AbortError");
      const fe = gg(p, X.operations, b);
      if (fe.results.some((ae) => !ae.ok))
        V.applyConflict = `Winner promotion failed parameter preflight: ${fe.results.filter((ae) => !ae.ok).map((ae) => ae.error).join("; ")}`;
      else {
        try {
          V.applyResult = a.graph.applyOperations(X.operations), V.appliedOperations = X.operations, V.applyResult.results.every((ae) => ae.ok) ? V.appliedVariantId = K.id : V.applyConflict = "Winner promotion was only partially applied; the canvas may contain a partial parameter update. Inspect operation errors.";
        } catch (ae) {
          V.applyConflict = `Winner promotion threw unexpectedly; the canvas may contain a partial parameter update: ${String(ae)}`;
        }
        V.applyConflict && a.ui.toast(V.applyConflict, "error");
      }
    } else
      V.appliedVariantId = K.id;
  }
  if (s != null && s.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  const de = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const X = await b_({
      session: V,
      request: i,
      baseline: p,
      definitions: b,
      pluginId: a.pluginId || uS,
      pluginVersion: dS,
      codefyuiApiVersion: a.apiVersion,
      completedAt: de,
      provenanceFacts: [
        {
          key: "codefyui.api_version",
          status: "observed",
          source: "CodefyUIPluginAPI",
          collectedAt: de,
          value: a.apiVersion
        },
        {
          key: "experiment.coordinator",
          status: "observed",
          source: "Graph Copilot browser runtime",
          collectedAt: de,
          value: "browser-local"
        },
        {
          key: "experiment.runner_seed_schedule",
          status: "unavailable",
          source: "Graph Copilot does not assign graph-node RNG seeds"
        }
      ]
    }), Q = await Oy(a, X);
    if (Q.cleanupFailures.length > 0) {
      const oe = `Portable study was saved, but ${Q.cleanupFailures.length} unreferenced old blob(s) could not be cleaned up.`;
      V.insights.warnings.push(oe);
      try {
        a.ui.toast(oe, "warning");
      } catch {
      }
    }
  } catch (X) {
    const Q = `Experiment completed, but its portable study bundle could not be captured or saved: ${B_(X)}`;
    V.insights.warnings.push(Q);
    try {
      a.ui.toast(Q, "warning");
    } catch {
    }
  }
  let ce = bg(a, i, V, p, b);
  try {
    await By(a, ce);
  } catch (X) {
    const Q = `Experiment completed, but its local history could not be saved: ${String(X)}`;
    V.insights.warnings.push(Q);
    try {
      a.ui.toast(Q, "warning");
    } catch {
    }
    ce = bg(a, i, V, p, b);
  }
  return ce;
}
async function a1(a, i, s) {
  let o = !1, c, d = !0;
  const f = () => {
    d && (d = !1, c == null || c());
  };
  try {
    c = a.graph.onGraphChanged(() => {
      d && (o = !0);
    });
  } catch {
    o = !0;
  }
  try {
    return await n1(
      a,
      i,
      s,
      () => o,
      f
    );
  } finally {
    f();
  }
}
const dd = 1, i1 = "mulberry32-v1", Sg = 4, _g = 32, Yu = 8, Eg = 16, r1 = /* @__PURE__ */ new Set([
  "version",
  "strategy",
  "hypothesis",
  "objective",
  "bindings",
  "candidate_count",
  "seed",
  "include_baseline",
  "repetitions",
  "concurrency",
  "timeout_minutes",
  "apply_best"
]), s1 = /* @__PURE__ */ new Set(["metric", "direction"]), o1 = /* @__PURE__ */ new Set(["node_id", "param", "values"]), l1 = /* @__PURE__ */ new Set(["int", "float", "bool", "select"]), c1 = "Planner-only seed: it deterministically selects parameter assignments and does not seed graph nodes or make graph executions reproducible.";
function fd(a, i) {
  if (!a || typeof a != "object" || Array.isArray(a))
    throw new Error(`${i} must be an object`);
  return a;
}
function pd(a, i, s) {
  const o = Object.keys(a).filter((c) => !i.has(c));
  if (o.length > 0)
    throw new Error(`${s} contains unknown field(s): ${o.join(", ")}`);
}
function bl(a, i) {
  if (typeof a != "string" || !a.trim())
    throw new Error(`${i} must be a non-empty string`);
  return a.trim();
}
function xg(a, i, s) {
  if (a === void 0) return i;
  if (typeof a != "boolean") throw new Error(`${s} must be a boolean`);
  return a;
}
function al(a, i, s, o, c) {
  const d = a === void 0 ? i : a;
  if (!Number.isInteger(d) || d < s || d > o)
    throw new Error(`${c} must be an integer from ${s} to ${o}`);
  return d;
}
function xs(a) {
  return typeof a == "number" ? `number:${Object.is(a, -0) ? "0" : String(a)}` : `${typeof a}:${JSON.stringify(a)}`;
}
function Ag(a, i, s) {
  switch (a.param_type) {
    case "int":
      if (typeof i != "number" || !Number.isFinite(i) || !Number.isInteger(i))
        throw new Error(`${s} must be a finite integer`);
      break;
    case "float":
      if (typeof i != "number" || !Number.isFinite(i))
        throw new Error(`${s} must be a finite number`);
      break;
    case "bool":
      if (typeof i != "boolean") throw new Error(`${s} must be a boolean`);
      break;
    case "select":
      if (typeof i != "string") throw new Error(`${s} must be a string select option`);
      if (!Array.isArray(a.options) || !a.options.includes(i))
        throw new Error(`${s} must be one of: ${(a.options ?? []).join(", ")}`);
      break;
    default:
      throw new Error(`${s} uses unsupported parameter type '${String(a.param_type)}'`);
  }
  if (typeof i == "number") {
    if (typeof a.min_value == "number" && i < a.min_value)
      throw new Error(`${s} must be >= ${a.min_value}`);
    if (typeof a.max_value == "number" && i > a.max_value)
      throw new Error(`${s} must be <= ${a.max_value}`);
  }
  return i;
}
function u1(a, i, s) {
  const o = a.nodes.filter((d) => d.id === i);
  if (o.length === 0) throw new Error(`${s} references missing node '${i}'`);
  if (o.length > 1) throw new Error(`${s} references ambiguous duplicate node id '${i}'`);
  const c = o[0];
  if (!c.type || c.type === "note")
    throw new Error(`${s} node '${i}' has no optimizable node type`);
  return c;
}
function d1(a, i, s) {
  const o = a.filter((c) => c.node_name === i);
  if (o.length === 0) throw new Error(`${s} has no definition for node type '${i}'`);
  if (o.length > 1) throw new Error(`${s} found duplicate definitions for node type '${i}'`);
  return o[0];
}
function f1(a, i, s, o) {
  var j;
  const c = `optimizer.bindings[${i}]`, d = fd(a, c);
  pd(d, o1, c);
  const f = bl(d.node_id, `${c}.node_id`), y = bl(d.param, `${c}.param`), p = u1(s, f, c), h = d1(o, p.type, c), b = h.params.filter((q) => q.name === y);
  if (b.length === 0)
    throw new Error(`${c} references unknown parameter '${y}' on '${p.type}'`);
  if (b.length > 1)
    throw new Error(`${c} references ambiguous duplicate parameter '${y}' on '${p.type}'`);
  const v = b[0];
  if (!l1.has(v.param_type))
    throw new Error(
      `${c} parameter '${f}.${y}' has unsupported type '${String(v.param_type)}'; only int, float, bool, and select are allowed`
    );
  if (Ba(y))
    throw new Error(
      `${c} parameter '${f}.${y}' has a credential-shaped name and cannot be optimized; this is refused even when the node schema declares an otherwise supported parameter type`
    );
  if (!Array.isArray(d.values) || d.values.length === 0)
    throw new Error(`${c}.values must be a non-empty explicit domain`);
  if (d.values.length > _g)
    throw new Error(`${c}.values supports at most ${_g} values`);
  const S = d.values.map((q, Z) => Ag(v, q, `${c}.values[${Z}]`)), A = S.map(xs);
  if (new Set(A).size !== A.length)
    throw new Error(`${c}.values must contain unique scalar values`);
  const O = (j = p.data) == null ? void 0 : j.params, L = !!O && Object.prototype.hasOwnProperty.call(O, y) ? O[y] : v.default, R = Ag(v, L, `${c} baseline value`);
  return {
    node: p,
    definition: h,
    parameter: v,
    nodeId: f,
    paramName: y,
    baselineValue: R,
    domain: S
  };
}
function p1(a, i) {
  const s = new Array(a.length);
  let o = i;
  for (let c = a.length - 1; c >= 0; c -= 1) {
    const d = a[c].domain;
    s[c] = d[o % d.length], o = Math.floor(o / d.length);
  }
  return s;
}
function m1(a) {
  let i = 0;
  for (const s of a) {
    const o = xs(s.baselineValue), c = s.domain.findIndex((d) => xs(d) === o);
    if (c < 0) return;
    i = i * s.domain.length + c;
  }
  return i;
}
function h1(a) {
  let i = a >>> 0;
  return () => {
    i = i + 1831565813 >>> 0;
    let s = i;
    return s = Math.imul(s ^ s >>> 15, s | 1) >>> 0, s ^= s + Math.imul(s ^ s >>> 7, s | 61), (s ^ s >>> 14) >>> 0;
  };
}
function g1(a, i, s) {
  const o = h1(s), c = /* @__PURE__ */ new Map(), d = [];
  for (let f = 0; f < i; f += 1) {
    const y = a - f, p = o() % y, h = c.get(p) ?? p, b = y - 1, v = c.get(b) ?? b;
    p !== b ? c.set(p, v) : c.delete(p), c.delete(b), d.push(h);
  }
  return d;
}
function y1(a, i) {
  const s = [], o = /* @__PURE__ */ new Map();
  return a.forEach((c, d) => {
    o.has(c.nodeId) || (o.set(c.nodeId, []), s.push(c.nodeId)), o.get(c.nodeId).push([c.paramName, i[d]]);
  }), s.map((c) => ({
    op: "set_params",
    node_id: c,
    params: Object.fromEntries(o.get(c))
  }));
}
function v1(a, i) {
  return i.every((s, o) => xs(s) === xs(a[o].baselineValue));
}
function b1(a) {
  const i = fd(a, "optimizer");
  if (pd(i, r1, "optimizer"), i.version !== void 0 && i.version !== dd)
    throw new Error(`optimizer.version must be ${dd}`);
  if (i.strategy !== "grid" && i.strategy !== "seeded_random")
    throw new Error("optimizer.strategy must be grid or seeded_random");
  const s = bl(i.hypothesis, "optimizer.hypothesis"), o = fd(i.objective, "optimizer.objective");
  pd(o, s1, "optimizer.objective");
  const c = bl(o.metric, "optimizer.objective.metric");
  if (o.direction !== "maximize" && o.direction !== "minimize")
    throw new Error("optimizer.objective.direction must be maximize or minimize");
  return {
    raw: i,
    strategy: i.strategy,
    hypothesis: s,
    objective: { metric: c, direction: o.direction },
    repetitions: al(i.repetitions, 1, 1, 5, "optimizer.repetitions"),
    concurrency: al(i.concurrency, 1, 1, 2, "optimizer.concurrency"),
    timeoutMinutes: i.timeout_minutes === void 0 ? void 0 : al(i.timeout_minutes, 10, 1, 60, "optimizer.timeout_minutes"),
    includeBaseline: xg(i.include_baseline, !0, "optimizer.include_baseline"),
    applyBest: xg(i.apply_best, !1, "optimizer.apply_best")
  };
}
function S1(a, i, s) {
  const o = b1(a);
  if (!Array.isArray(o.raw.bindings) || o.raw.bindings.length < 1 || o.raw.bindings.length > Sg)
    throw new Error(`optimizer.bindings must contain 1 to ${Sg} bindings`);
  if (!i || !Array.isArray(i.nodes) || !Array.isArray(i.edges))
    throw new Error("current graph must contain nodes and edges arrays");
  if (!Array.isArray(s)) throw new Error("node definitions must be an array");
  const c = o.raw.bindings.map((Y, K) => f1(Y, K, i, s)), d = c.map((Y) => `${Y.nodeId}\0${Y.paramName}`);
  if (new Set(d).size !== d.length)
    throw new Error("optimizer.bindings must not repeat the same node parameter");
  const f = c.reduce((Y, K) => Y * K.domain.length, 1), y = m1(c), p = Yu - (o.includeBaseline ? 1 : 0);
  let h, b;
  const v = f - (y === void 0 ? 0 : 1);
  if (o.strategy === "grid") {
    if (o.raw.candidate_count !== void 0)
      throw new Error("optimizer.candidate_count is only allowed for seeded_random");
    if (o.raw.seed !== void 0)
      throw new Error("optimizer.seed is only allowed for seeded_random");
    if (v > p)
      throw new Error(
        `Grid Cartesian product has ${v} changed assignments but only ${p} candidate slots are available; narrow the domains instead of truncating the grid`
      );
    h = Array.from({ length: f }, (Y, K) => K).filter((Y) => Y !== y);
  } else {
    const Y = al(
      o.raw.candidate_count,
      Number.NaN,
      1,
      p,
      "optimizer.candidate_count"
    );
    if (!Number.isInteger(o.raw.seed) || o.raw.seed < 0 || o.raw.seed > 4294967295)
      throw new Error("optimizer.seed is required for seeded_random and must be a uint32 integer");
    if (b = o.raw.seed, Y > v)
      throw new Error(
        `seeded_random requested ${Y} unique changed assignments, but only ${v} are available`
      );
    h = g1(v, Y, b).map((V) => y !== void 0 && V >= y ? V + 1 : V);
  }
  const S = h.map((Y) => ({
    domainIndex: Y,
    assignment: p1(c, Y)
  })).filter(({ assignment: Y }) => !v1(c, Y));
  if (S.length === 0)
    throw new Error("optimizer search space contains no assignment different from the current graph baseline");
  const A = o.includeBaseline ? [{ id: "baseline", label: "Baseline", operations: [] }] : [], O = o.strategy === "grid" ? "grid" : "random", E = S.map(({ assignment: Y }, K) => ({
    id: `optimizer-${O}-${String(K + 1).padStart(3, "0")}`,
    label: `${o.strategy === "grid" ? "Grid" : "Random"} ${K + 1}: ${c.map((V, de) => `${V.nodeId}.${V.paramName}=${JSON.stringify(Y[de])}`).join(", ")}`,
    operations: y1(c, Y)
  })), L = [...A, ...E];
  if (L.length > Yu)
    throw new Error(`optimizer compiled ${L.length} variants; maximum is ${Yu}`);
  const R = L.length * o.repetitions;
  if (R > Eg)
    throw new Error(
      `optimizer compiled ${L.length} variants x ${o.repetitions} repetitions = ${R} executions; maximum is ${Eg}`
    );
  const j = S.map(
    ({ domainIndex: Y, assignment: K }, V) => ({
      variantId: E[V].id,
      domainIndex: Y,
      values: c.map((de, ce) => ({
        nodeId: de.nodeId,
        param: de.paramName,
        value: K[ce]
      }))
    })
  ), q = {
    schemaVersion: dd,
    strategy: o.strategy,
    prngVersion: o.strategy === "seeded_random" ? i1 : void 0,
    plannerSeed: b,
    seedDescription: c1,
    includesBaseline: o.includeBaseline,
    totalDomainAssignments: f,
    baselineAssignmentExcluded: y !== void 0,
    generatedCandidateCount: E.length,
    totalVariantCount: L.length,
    totalExecutionCount: R,
    bindings: c.map((Y) => ({
      nodeId: Y.nodeId,
      nodeType: Y.node.type,
      param: Y.paramName,
      paramType: Y.parameter.param_type,
      baselineValue: Y.baselineValue,
      domain: [...Y.domain]
    })),
    assignments: j
  };
  return {
    request: {
      hypothesis: o.hypothesis,
      objective: o.objective,
      variants: L,
      repetitions: o.repetitions,
      concurrency: o.concurrency,
      ...o.timeoutMinutes !== void 0 ? { timeout_minutes: o.timeoutMinutes } : {},
      apply_best: o.applyBest,
      search: q
    },
    metadata: q
  };
}
const Hy = Symbol("graph-copilot-passive-detach");
function _1(a) {
  return (a == null ? void 0 : a.aborted) === !0 && a.reason === Hy;
}
const E1 = 360, x1 = 720, A1 = 5e3, Ng = 60, N1 = 8;
async function Iy(a, i) {
  try {
    const s = await a.http.fetch("/api/system/devices", { signal: i });
    if (!s.ok) return;
    const o = await s.json();
    return typeof o.default == "string" && o.default ? o.default : void 0;
  } catch {
    return;
  }
}
function w1(a) {
  if (a.phase === "connecting") return "Starting graph run…";
  if (a.phase === "cancelling") return "Cancelling run…";
  const i = [
    `Running graph ${a.completedNodes}/${a.totalNodes}`
  ];
  a.nodeType && i.push(a.nodeType);
  const s = a.progress ?? {}, o = [], c = (d) => Number.isInteger(d) ? String(d) : d.toFixed(4);
  for (const d of ["epoch", "step", "loss", "val_loss"]) {
    const f = s[d];
    typeof f == "number" && Number.isFinite(f) && o.push(`${d} ${c(f)}`);
  }
  if (o.length === 0)
    for (const [d, f] of Object.entries(s)) {
      if (o.length >= 2) break;
      d !== "event" && typeof f == "number" && Number.isFinite(f) && o.push(`${d} ${c(f)}`);
    }
  return i.push(...o), i.join(" · ");
}
function j1(a) {
  const i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  for (const o of a.nodes) {
    const c = typeof o.type == "string" ? o.type : "";
    c && (i.set(o.id, c), s.set(c, (s.get(c) ?? 0) + 1));
  }
  return (o) => {
    const c = i.get(o);
    return c && s.get(c) === 1 ? c : o;
  };
}
function Xu(a) {
  const i = Object.keys(a);
  if (i.length <= Ng) return a;
  const s = {};
  for (const o of i.slice(0, Ng)) s[o] = a[o];
  return s;
}
const Gy = /* @__PURE__ */ new Set([
  "completed",
  "cached",
  "error",
  "interrupted"
]);
async function $1(a, i) {
  const { signal: s, timeoutMs: o, onProgress: c } = i, d = Ud(a.graph.getGraph()), f = j1(d), y = d.nodes.length, p = Date.now(), h = () => ({
    status: "cancelled",
    durationMs: Date.now() - p,
    nodeErrors: {},
    completedNodes: 0,
    totalNodes: y,
    outputs: {},
    finalProgress: {},
    metrics: {},
    textTail: "",
    media: []
  });
  if (s != null && s.aborted) return h();
  let b, v;
  try {
    b = i.device ?? await Iy(a, s), v = await zy(a, s);
  } catch (S) {
    if (s != null && s.aborted) return h();
    throw S;
  }
  return s != null && s.aborted ? h() : new Promise((S) => {
    const A = new WebSocket(Ly(v)), O = {}, E = {}, L = {}, R = {}, j = /* @__PURE__ */ new Set(), q = [], Z = [];
    let Y, K = !1, V = !1, de = !1, ce, X = !1;
    const Q = (J, T) => {
      if (K) return;
      K = !0, window.clearTimeout(M), ce !== void 0 && window.clearTimeout(ce), s == null || s.removeEventListener("abort", ve), (A.readyState === WebSocket.OPEN || A.readyState === WebSocket.CONNECTING) && A.close();
      const ie = q.join(`
`).slice(-1500);
      S({
        status: J,
        durationMs: Date.now() - p,
        runId: Y,
        ...T ? { error: vl(T, v) } : {},
        nodeErrors: R,
        completedNodes: j.size,
        totalNodes: y,
        outputs: Xu(O),
        finalProgress: Xu(E),
        metrics: Xu(L),
        textTail: ie,
        media: Z
      });
    }, oe = (J) => {
      if (!K && !V) {
        if (V = !0, !X) {
          fe = J, Q(J);
          return;
        }
        c == null || c({
          phase: "cancelling",
          elapsedMs: Date.now() - p,
          completedNodes: j.size,
          totalNodes: y
        });
        try {
          A.readyState === WebSocket.OPEN && A.send(JSON.stringify(
            Y ? { action: "cancel", run_id: Y } : { action: "cancel" }
          ));
        } catch {
        }
        ce = window.setTimeout(
          () => Q(J, J === "timeout" ? `Run timed out after ${Math.round(o / 6e4)} minutes and was cancelled.` : void 0),
          A1
        ), fe = J;
      }
    };
    let fe = "cancelled";
    const ae = () => {
      if (!K) {
        if (!i.serverOwnedRuns || !X) {
          oe("cancelled");
          return;
        }
        de = !0, Y !== void 0 && Q("detached");
      }
    }, ve = () => {
      _1(s) ? ae() : oe("cancelled");
    }, M = window.setTimeout(() => oe("timeout"), o);
    if (s == null || s.addEventListener("abort", ve, { once: !0 }), s != null && s.aborted) {
      Q("cancelled");
      return;
    }
    c == null || c({
      phase: "connecting",
      elapsedMs: 0,
      completedNodes: 0,
      totalNodes: y
    }), A.onopen = () => {
      K || V || (A.send(JSON.stringify({
        action: "execute",
        nodes: d.nodes,
        edges: d.edges,
        presets: d.presets ?? [],
        record_outputs: !1,
        weights_persistent: !0,
        ...b ? { device: b } : {}
      })), X = !0);
    }, A.onmessage = (J) => {
      var ee;
      if (K) return;
      let T;
      try {
        T = JSON.parse(String(J.data));
      } catch {
        return;
      }
      const ie = String(T.type ?? "");
      if (typeof T.run_id == "string" && T.run_id && (Y === void 0 && ((ee = i.onRunId) == null || ee.call(i, T.run_id)), Y = T.run_id, de)) {
        Q("detached");
        return;
      }
      if (T.rejected === !0) {
        Q("error", String(T.error ?? "The host rejected the run request."));
        return;
      }
      if (ie === "node_status") {
        const x = String(T.node_id ?? ""), U = String(T.status ?? ""), F = f(x), W = zd(T);
        Gy.has(U) && j.add(x), U === "error" && (R[F] = vl(
          String(T.error ?? "node failed"),
          v
        ));
        for (const [se, pe] of Object.entries(W.scalars))
          O[`${F}.${se}`] = pe;
        for (const [se, pe] of Object.entries(W.strings))
          O[`${F}.${se}`] = pe;
        for (const [se, pe] of Object.entries(W.modelParams))
          O[`${F}.${se}.params`] = pe;
        for (const se of W.texts) q.push(se);
        for (const se of W.media) {
          if (Z.length >= N1) break;
          Z.push({ node: F, ...se });
        }
        if (W.progress)
          for (const [se, pe] of Object.entries(W.progress)) {
            const ue = Ss(pe);
            ue !== void 0 ? E[`${F}.${se}`] = ue : typeof pe == "string" && pe.length <= 80 && (E[`${F}.${se}`] = pe);
          }
        c == null || c({
          phase: "running",
          nodeType: F,
          nodeStatus: U,
          ...W.progress ? { progress: W.progress } : {},
          elapsedMs: Date.now() - p,
          completedNodes: j.size,
          totalNodes: y
        });
      } else if (ie === "metric") {
        const x = Array.isArray(T.points) ? T.points : [];
        for (const U of x) {
          if (!U || typeof U != "object") continue;
          const F = U, W = typeof F.name == "string" ? F.name : "", se = Ss(F.value);
          W && se !== void 0 && (L[W] = se);
        }
      } else ie === "execution_complete" ? Q("complete") : ie === "execution_stopped" ? Q(fe, V ? void 0 : `Run stopped by the host (${String(T.reason ?? "stopped")}).`) : (ie === "execution_error" || ie === "error") && Q("error", String(T.error ?? ie));
    }, A.onerror = () => Q("error", "Execution WebSocket failed."), A.onclose = () => {
      K || Q(
        V ? fe : "error",
        V ? void 0 : "Execution WebSocket closed before the run completed."
      );
    };
  });
}
const M1 = /* @__PURE__ */ new Set(["queued", "running"]);
function ls(a) {
  return a !== "" && !M1.has(a);
}
let wg = !1;
async function rs(a, i) {
  if (wg) return !0;
  try {
    return (await a.http.fetch("/api/runs?limit=1", { signal: i })).ok ? (wg = !0, !0) : !1;
  } catch {
    return !1;
  }
}
function La(a) {
  return a && typeof a == "object" && !Array.isArray(a) ? a : null;
}
function wn(a) {
  return typeof a == "string" ? a : null;
}
function il(a) {
  return typeof a == "number" && Number.isFinite(a) ? a : null;
}
function qy(a) {
  const i = La(a);
  if (!i) return null;
  const s = wn(i.id), o = wn(i.status);
  if (!s || !o) return null;
  const c = wn(i.started_at), d = wn(i.finished_at);
  let f = null;
  if (c && d) {
    const h = Date.parse(c), b = Date.parse(d);
    if (Number.isFinite(h) && Number.isFinite(b)) {
      const v = Math.round((b - h) / 1e3);
      v >= 0 && (f = v);
    }
  }
  const y = La(i.final_metrics), p = {};
  if (y)
    for (const [h, b] of Object.entries(y)) {
      const v = il(b);
      v !== null && (p[h] = v);
    }
  return {
    runId: s,
    name: wn(i.name),
    status: o,
    active: i.active === !0,
    queuePosition: il(i.queue_position),
    createdAt: wn(i.created_at),
    startedAt: c,
    finishedAt: d,
    error: wn(i.error),
    finalMetrics: p,
    lastCursor: il(i.last_cursor),
    durationS: f
  };
}
async function T1(a, i) {
  let s = (i == null ? void 0 : i.limit) ?? 10;
  s < 1 && (s = 1), s > 50 && (s = 50);
  const o = `/api/runs?limit=${s}`, c = await a.http.fetch(o, { signal: i == null ? void 0 : i.signal });
  if (!c.ok)
    throw new Error(`run list failed: HTTP ${c.status}`);
  let d;
  try {
    d = await c.json();
  } catch {
    throw new Error(`run list failed: HTTP ${c.status}`);
  }
  const f = La(d);
  if (!f) throw new Error(`run list failed: HTTP ${c.status}`);
  const y = Array.isArray(f.runs) ? f.runs : [], p = [];
  for (const b of y) {
    const v = qy(b);
    v && p.push(v);
  }
  const h = il(f.total);
  return {
    runs: p,
    total: h !== null ? h : p.length
  };
}
async function cs(a, i, s) {
  const o = `/api/runs/${encodeURIComponent(i)}`, c = await a.http.fetch(o, { signal: s });
  if (c.status === 404) return null;
  if (!c.ok)
    throw new Error(`fetch run failed: HTTP ${c.status}`);
  let d;
  try {
    d = await c.json();
  } catch {
    throw new Error(`fetch run failed: HTTP ${c.status}`);
  }
  return qy(d);
}
async function O1(a, i, s) {
  try {
    const o = `/api/runs/${encodeURIComponent(i)}/artifacts`, c = await a.http.fetch(o, { signal: s });
    if (!c.ok) return [];
    let d;
    try {
      d = await c.json();
    } catch {
      return [];
    }
    const f = La(d);
    if (!f) return [];
    const y = Array.isArray(f.artifacts) ? f.artifacts : [], p = [];
    for (const h of y) {
      const b = La(h);
      if (!b) continue;
      const v = wn(b.kind), S = wn(b.path);
      !v || !S || p.push({
        kind: v,
        path: S,
        createdAt: wn(b.created_at)
      });
    }
    return p;
  } catch {
    return [];
  }
}
async function C1(a, i) {
  try {
    const s = `/api/runs/${encodeURIComponent(i)}/cancel`;
    return (await a.http.fetch(s, { method: "POST" })).ok;
  } catch {
    return !1;
  }
}
function D1(a, i) {
  return new Promise((s) => {
    const o = setTimeout(c, a);
    function c() {
      i == null || i.removeEventListener("abort", c), clearTimeout(o), s();
    }
    i == null || i.addEventListener("abort", c, { once: !0 });
  });
}
async function R1(a, i) {
  const { runId: s, onUpdate: o, signal: c } = i, d = i.waitS ?? 25, f = i.retryDelayMs ?? 1e3;
  let y = i.fromCursor ?? 0, p = "", h = 0;
  const b = /* @__PURE__ */ new Set();
  for (; ; ) {
    if (c != null && c.aborted) return { status: p, row: null, aborted: !0 };
    let S;
    try {
      const O = await a.http.fetch(
        `/api/runs/${encodeURIComponent(s)}/events?cursor=${y}&wait=${d}&limit=500`,
        { signal: c }
      );
      if (O.status === 404) return { status: p, row: null, aborted: !1 };
      if (!O.ok) throw new Error(`HTTP ${O.status}`);
      S = La(await O.json()) ?? {}, h = 0;
    } catch {
      if (c != null && c.aborted) return { status: p, row: null, aborted: !0 };
      h += 1, o == null || o({ runStatus: p, completedNodes: b.size, connectionLost: !0 }), await D1(Math.min(f * 2 ** Math.min(h - 1, 3), 8 * f), c);
      continue;
    }
    typeof S.status == "string" && S.status && (p = S.status);
    const A = Array.isArray(S.events) ? S.events : [];
    for (const O of A) {
      const E = La(O);
      if (!E || E.type !== "node_status") continue;
      const L = La(E.payload) ?? {}, R = typeof L.node_id == "string" ? L.node_id : "", j = typeof L.status == "string" ? L.status : "";
      R && Gy.has(j) && b.add(R);
      const q = zd(L), Z = Cy(q.progress);
      o == null || o({
        runStatus: p,
        ...R ? { nodeId: R } : {},
        ...j ? { nodeStatus: j } : {},
        progress: q.progress,
        ...Z !== void 0 ? { lossPoint: Z } : {},
        completedNodes: b.size,
        connectionLost: !1
      });
    }
    if (typeof S.cursor == "number" && (y = S.cursor), ls(p) && A.length === 0) break;
  }
  let v = null;
  try {
    v = await cs(a, s, c);
  } catch {
    v = null;
  }
  return c != null && c.aborted ? { status: p, row: null, aborted: !0 } : { status: (v == null ? void 0 : v.status) ?? p, row: v, aborted: !1 };
}
const Bd = "active_run";
function kd(a) {
  const i = a.storage.get(Bd);
  if (!i) return null;
  try {
    const s = JSON.parse(i);
    return typeof s.runId != "string" || !s.runId ? null : {
      runId: s.runId,
      reason: typeof s.reason == "string" ? s.reason : "",
      submittedAt: typeof s.submittedAt == "number" ? s.submittedAt : 0,
      timeoutMinutes: typeof s.timeoutMinutes == "number" ? s.timeoutMinutes : 0,
      ...typeof s.device == "string" && s.device ? { device: s.device } : {}
    };
  } catch {
    return null;
  }
}
function z1(a, i) {
  try {
    a.storage.set(Bd, JSON.stringify(i));
  } catch {
  }
}
function oi(a, i) {
  if (i) {
    const s = kd(a);
    if (s && s.runId !== i) return;
  }
  a.storage.remove(Bd);
}
const jg = 16, $g = 2, L1 = [
  {
    name: "apply_graph_operations",
    description: `Apply a batch of graph edits to the canvas as ONE undo step. Failing operations are skipped and reported per-index (with an error message) so you can self-correct and retry.
Each entry in "operations" is one GraphOp object; use these EXACT field names:
- {"op":"add_node","node_type":"<exact catalog name>","ref":"<alias>","params":{...},"position":{"x":<num>,"y":<num>}} — ref/params/position optional. "ref" is a temporary alias usable as source/target/node_id ONLY within this SAME batch. In a LATER apply_graph_operations call refs are gone — use the real node id from the previous result (the "refs" map or each op's "node_id"), or call get_current_graph.
- {"op":"connect","source":"<node id or ref>","source_handle":"<output port name>","target":"<node id or ref>","target_handle":"<input port name>"} — handle names are the port names from the catalog out[...] / in[...]. For control-flow trigger edges use source_handle "trigger".
- {"op":"set_params","node_id":"<node id or ref>","params":{...}}
- {"op":"remove_node","node_id":"<node id or ref>"}
- {"op":"remove_edge","source":"<node id or ref>","target":"<node id or ref>","source_handle":"<optional>","target_handle":"<optional>"}
- {"op":"clear_graph"} — wipes the whole graph; only when the user asks to start over.
- {"op":"auto_layout"} — auto-positions all nodes; run once after a structural batch.`,
    input_schema: {
      type: "object",
      properties: {
        operations: {
          type: "array",
          items: { type: "object" }
          // GraphOp union documented in the tool description above
        }
      },
      required: ["operations"]
    }
  },
  {
    name: "get_current_graph",
    description: "Read the current serialized graph (the user may have edited it manually).",
    input_schema: { type: "object", properties: {} }
  },
  {
    name: "get_node_schemas",
    description: 'Get the exact input/output ports and params for specific node types. Call this before adding/connecting those nodes so you use correct port and param names (the catalog index lists names only). Returns one detail line per node: "Name: in[port:TYPE, ...] out[...] params[name:type=default{range}, ...] [category: X]".',
    input_schema: {
      type: "object",
      properties: {
        node_types: { type: "array", items: { type: "string" } }
      },
      required: ["node_types"]
    }
  },
  {
    name: "validate_graph",
    description: 'Validate the current graph on the server: checks for unknown node types, MISSING REQUIRED INPUT connections, and out-of-range params. Returns {"valid": boolean, "errors": string[]}. Call this after building and fix every error until valid is true — this is what makes the graph actually runnable.',
    input_schema: { type: "object", properties: {} }
  },
  {
    name: "run_graph",
    description: `Execute the CURRENT canvas graph on the CodefyUI backend — the user's real run, with real side effects (file writes, network calls, GPU time). A user-facing confirmation is required before it starts. Call this AFTER validate_graph reports "valid": true, when the user asked to run, train, or evaluate their graph. Node statuses and live training progress (loss, epochs) stream to the panel while it runs; long training runs are expected and fine — do not cancel or restart one without being asked. Returns the final status, per-node scalar/string outputs, last progress values, metric tails, any node errors, and a "media" list when the run produced renderable artifacts (VideoWrite clips, image previews) — each entry is a reference {node, port, kind, format, url?, frames?, bytes?}; the clip itself plays inline in the panel, and you should mention it and its url in your report. Use run_graph for "run it / train it"; use run_graph_experiments only for comparing variants.`,
    input_schema: {
      type: "object",
      properties: {
        reason: {
          type: "string",
          description: "One short sentence shown in the user confirmation: what this run does and why."
        },
        timeout_minutes: {
          type: "integer",
          minimum: 1,
          maximum: 720,
          description: "Optional wall-clock cap in minutes (default 360). Pick generously for training runs."
        },
        device: {
          type: "string",
          enum: ["cpu", "cuda", "mps"],
          description: `Optional run-level compute device (what device="auto" nodes follow). Defaults to the host's preferred device — set this only when the user asked for a specific one.`
        }
      },
      required: ["reason"]
    }
  },
  {
    name: "research",
    description: 'For COMPLEX graphs only: research several independent sub-tasks IN PARALLEL using focused lightweight sub-agents (each sees just the node index, not this whole conversation, so it stays token-cheap). Returns a concise answer per question. Example: ["which nodes build the data pipeline for MNIST?", "which nodes build a CNN classifier?", "which nodes form the training loop?"]. Use the answers to plan, then build with apply_graph_operations.',
    input_schema: {
      type: "object",
      properties: {
        questions: { type: "array", items: { type: "string" } }
      },
      required: ["questions"]
    }
  },
  {
    name: "run_graph_experiments",
    description: 'Run a bounded experiment study on canvas-isolated clones of the current graph, then rank candidates by a numeric backend metric. A user-facing confirmation is required before execution because graph nodes retain their normal side effects (for example file writes, network calls, or paid API usage). Candidate edits never touch the live canvas while running. Each variant has a label and a GraphOp operations array using the same exact fields as apply_graph_operations. Include an empty-operations baseline when useful. The metric can be an exact "node-id.port", a unique suffix such as "accuracy", a unique "NodeType.port", or "auto". direction is "maximize" or "minimize". Use repetitions >=3 for variance estimates (max 16 executions across the entire agent turn); concurrency defaults to 1 and is capped at 2 to protect GPU memory. Set apply_best=true only when the user asked to optimize/apply the winner; automatic promotion is parameter-only and is refused if they changed the live graph mid-study. Structural winners remain review-only summaries. The result includes rankings, observed metrics, warnings, and evidence-grounded paper follow-ups.',
    input_schema: {
      type: "object",
      properties: {
        hypothesis: { type: "string" },
        objective: {
          type: "object",
          properties: {
            metric: { type: "string" },
            direction: { type: "string", enum: ["maximize", "minimize"] }
          },
          required: ["metric", "direction"]
        },
        variants: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              label: { type: "string" },
              operations: { type: "array", items: { type: "object" } }
            },
            required: ["label", "operations"]
          }
        },
        repetitions: { type: "integer", minimum: 1, maximum: 5 },
        concurrency: { type: "integer", minimum: 1, maximum: 2 },
        timeout_minutes: {
          type: "integer",
          minimum: 1,
          maximum: 60,
          description: "Per-run wall-clock cap in minutes (default 10). Raise for training-process studies whose single runs are longer, e.g. small-LM ablations."
        },
        apply_best: { type: "boolean" }
      },
      required: ["hypothesis", "objective", "variants"]
    }
  },
  {
    name: "optimize_graph_parameters",
    description: 'Compile and run a transparent, bounded parameter search on the current graph. Use this instead of manually inventing variants when the user asks to optimize existing numeric, boolean, or select parameters. Only existing-node int/float/bool/select parameters are accepted; secret, string, file, tensor, preset, and unknown parameters are refused. "grid" evaluates the complete Cartesian product and refuses to truncate it. "seeded_random" requires candidate_count and a uint32 seed; that seed makes candidate PLANNING repeatable but does NOT seed graph-node execution. Values must be explicit schema-valid domains. The compiler creates only set_params variants, optionally includes the current graph as baseline, and delegates to the same confirmation, 16-execution turn budget, isolated runner, and guarded promotion path as run_graph_experiments.',
    input_schema: {
      type: "object",
      properties: {
        version: { type: "integer", enum: [1] },
        strategy: { type: "string", enum: ["grid", "seeded_random"] },
        hypothesis: { type: "string" },
        objective: {
          type: "object",
          properties: {
            metric: { type: "string" },
            direction: { type: "string", enum: ["maximize", "minimize"] }
          },
          required: ["metric", "direction"]
        },
        bindings: {
          type: "array",
          minItems: 1,
          maxItems: 4,
          items: {
            type: "object",
            properties: {
              node_id: { type: "string" },
              param: { type: "string" },
              values: { type: "array", minItems: 1, maxItems: 32, items: {} }
            },
            required: ["node_id", "param", "values"]
          }
        },
        candidate_count: { type: "integer", minimum: 1, maximum: 8 },
        seed: { type: "integer", minimum: 0, maximum: 4294967295 },
        include_baseline: { type: "boolean" },
        repetitions: { type: "integer", minimum: 1, maximum: 5 },
        concurrency: { type: "integer", minimum: 1, maximum: 2 },
        timeout_minutes: {
          type: "integer",
          minimum: 1,
          maximum: 60,
          description: "Per-run wall-clock cap in minutes (default 10). Raise for parameter searches over real training runs."
        },
        apply_best: { type: "boolean" }
      },
      required: ["strategy", "hypothesis", "objective", "bindings"]
    }
  },
  {
    name: "list_runs",
    description: "List recent graph runs on the CodefyUI host, newest first — INCLUDING runs the user started from the editor's own Run button. Each row: run_id, name, status (queued|running|succeeded|failed|cancelled|interrupted), queue_position (when queued), created_at, duration_s, error, and final_metrics (the last value of every metric series the run recorded, e.g. val_loss). Use this when asked what ran recently, whether something is still running, or which run to inspect; then use get_run for one run's detail. Requires a host with server-owned runs.",
    input_schema: {
      type: "object",
      properties: {
        limit: { type: "integer", minimum: 1, maximum: 20, description: "Rows to return (default 10)." },
        active_only: { type: "boolean", description: "Only queued/running runs." }
      }
    }
  },
  {
    name: "get_run",
    description: `Fetch one run's server-side record by run_id: status, timing, error, final_metrics, and recorded artifacts (checkpoints etc.). This is the ground truth for "how did that run go" — report its numbers exactly; never reconstruct them from memory. Works for editor-started runs too.`,
    input_schema: {
      type: "object",
      properties: { run_id: { type: "string" } },
      required: ["run_id"]
    }
  }
];
function Sl(a) {
  const i = a.graph.getGraph();
  return JSON.stringify({ nodes: i.nodes, edges: i.edges, presets: i.presets ?? [] });
}
function Mg(a) {
  const i = a.graph.getGraph(), s = i.nodes.filter((c) => c.type !== "note").map((c) => {
    var d;
    return {
      id: c.id,
      type: c.type ?? "",
      params: ((d = c.data) == null ? void 0 : d.params) ?? {}
    };
  }).sort((c, d) => c.id.localeCompare(d.id)), o = i.edges.map((c) => ({
    source: c.source ?? "",
    sourceHandle: c.sourceHandle ?? "",
    target: c.target ?? "",
    targetHandle: c.targetHandle ?? "",
    type: c.type ?? ""
  })).sort((c, d) => JSON.stringify(c).localeCompare(JSON.stringify(d)));
  return JSON.stringify({ nodes: s, edges: o, presets: i.presets ?? [] });
}
function U1(a) {
  if (typeof a == "string") return JSON.stringify(a);
  const i = JSON.stringify(a);
  return i === void 0 ? String(a) : i.length > 180 ? `${i.slice(0, 177)}...` : i;
}
function Tg(a) {
  if (!a) return "";
  const i = Object.entries(a).map(([s, o]) => `${s}=${U1(o)}`);
  return i.length > 0 ? i.join(", ") : "no parameters";
}
function V1(a) {
  switch (a.op) {
    case "add_node": {
      const i = Tg(a.params);
      return `add ${a.node_type}${i ? ` with ${i}` : ""}`;
    }
    case "set_params":
      return `set ${a.node_id}: ${Tg(a.params)}`;
    case "connect":
      return `connect ${a.source}.${a.source_handle} -> ${a.target}.${a.target_handle}`;
    case "remove_node":
      return `remove node ${a.node_id}`;
    case "remove_edge":
      return `remove edge ${a.source} -> ${a.target}`;
    case "clear_graph":
      return "clear graph";
    case "auto_layout":
      return "auto layout";
  }
}
function Ju(a, i) {
  const s = a.role === "user" && a.attachments && a.attachments.length > 0 ? ty(a.content, a.attachments, i) : a.content, o = { role: a.role, content: s };
  return a.tool_calls && (o.tool_calls = a.tool_calls), a.tool_call_id && (o.tool_call_id = a.tool_call_id), o;
}
function Og(a, i) {
  const s = /* @__PURE__ */ new Map();
  a.forEach((c, d) => {
    const f = c.op, y = i[d], p = y ? y.ok : !1;
    s.has(f) || s.set(f, { ok: 0, fail: 0 });
    const h = s.get(f);
    p ? h.ok++ : h.fail++;
  });
  const o = [];
  for (const [c, d] of s) {
    const f = d.ok + d.fail;
    d.fail === 0 ? o.push(`${c} x${f} ok`) : d.ok === 0 ? o.push(`${c} x${f} FAILED`) : o.push(`${c} x${f} (${d.ok} ok, ${d.fail} FAILED)`);
  }
  return o.join(", ");
}
function B1(a, i, s, o, c) {
  const f = { role: "system", content: cS(
    a.graph.getNodeDefinitions(),
    a.graph.getGraph()
  ) }, y = i.slice(-20), p = i.flatMap((S) => S.tool_calls ?? []), h = new Map(p.map((S) => [S.id, S])), b = y.map((S) => {
    if (S.role === "user") return Ju(S, c);
    if (S.role === "tool") {
      const A = S.tool_call_id ? h.get(S.tool_call_id) : void 0, O = _l(
        A ?? { id: S.tool_call_id ?? "legacy", name: "legacy_tool", arguments: {} },
        S.content,
        a
      );
      return Ju({ ...S, content: O }, c);
    }
    return Ju({
      ...S,
      content: id(S.content, p, a),
      ...S.tool_calls ? { tool_calls: sy(S.tool_calls, a) } : {}
    }, c);
  }), v = {
    role: "user",
    content: ty(s, o, c)
  };
  return [f, ...b, v];
}
function Ky(a, i, s = L1, o = 8192) {
  const c = a.provider, d = a.models[c] ?? "", f = {
    provider: c,
    model: d,
    messages: i,
    tools: s,
    max_tokens: o
  };
  if (c !== "openai-codex") {
    const p = c === "openai" ? a.apiKeys.openai : c === "openrouter" ? a.apiKeys.openrouter : c === "anthropic" ? a.apiKeys.anthropic : c === "custom" ? a.apiKeys.custom : void 0;
    p && (f.api_key = p);
  }
  c === "custom" && a.customBaseUrl && (f.base_url = a.customBaseUrl);
  const y = ol(a);
  return y && (f.reasoning_effort = y), f;
}
async function md(a) {
  const i = (f) => {
    const y = _l(
      { name: "validate_graph", arguments: {} },
      JSON.stringify(f),
      a
    );
    try {
      const p = JSON.parse(y);
      let h = p.valid === !0;
      const b = Array.isArray(p.errors) ? p.errors.filter((v) => typeof v == "string") : [];
      return h && b.length > 0 && (h = !1), !h && b.length === 0 && b.push("Graph validation failed without diagnostic details."), { valid: h, errors: b };
    } catch {
      return { valid: !1, errors: ["Graph validation returned an unreadable result."] };
    }
  }, s = a.graph.getGraph(), o = s.nodes.filter((f) => f.type !== "note"), c = new Set(o.map((f) => f.id)), d = s.edges.filter((f) => typeof f.source == "string" && typeof f.target == "string" && c.has(f.source) && c.has(f.target));
  try {
    const f = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: o, edges: d, presets: s.presets ?? [] })
    });
    if (!f.ok)
      return i({ valid: !1, errors: [`validate request failed: HTTP ${f.status}`] });
    const y = await f.json();
    return i({
      valid: y.valid === !0,
      errors: Array.isArray(y.errors) ? y.errors.filter((p) => typeof p == "string") : []
    });
  } catch (f) {
    return i({ valid: !1, errors: [`validate request error: ${String(f)}`] });
  }
}
async function k1(a) {
  let i = !1, s;
  try {
    s = a.graph.onGraphChanged(() => {
      i = !0;
    });
  } catch {
    return {
      valid: !1,
      errors: ["Graph validation could not safely monitor the active graph for concurrent changes."]
    };
  }
  let o;
  try {
    o = Sl(a);
  } catch {
    try {
      s();
    } catch {
    }
    return {
      valid: !1,
      errors: ["Graph validation could not capture the active graph revision."]
    };
  }
  const c = await md(a);
  let d;
  try {
    d = Sl(a);
  } catch {
  }
  const f = i || d === void 0 || d !== o;
  try {
    s();
  } catch {
  }
  return f ? {
    valid: !1,
    errors: [
      "The active graph changed while validation was in flight. Re-read the current graph and validate that revision before finishing."
    ]
  } : c;
}
async function H1(a, i, s, o, c) {
  const f = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Answer ONE sub-question about building a node graph, using ONLY node types that appear in the index below (exact names; if nothing in the index fits, say so instead of inventing a type). Answer with: (1) the node types needed, (2) a one-line wiring plan (which output feeds which input), (3) any params worth setting. CONCISE — no preamble, no code blocks.

## Node index
` + o },
    { role: "user", content: s }
  ];
  let y = "";
  try {
    await ny(
      a,
      Ky(i, f, [], 1024),
      {
        onText: (p) => {
          y += p;
        },
        onDone: (p) => {
          !y && p.message.content && (y = p.message.content);
        },
        onError: (p) => {
          y += `
(research error: ${p})`;
        }
      },
      c
    );
  } catch (p) {
    return `(research failed: ${String(p)})`;
  }
  return y.trim() || "(no answer)";
}
let Qu = !1;
async function Yy(a, i, s, o, c, d, f, y = !1) {
  var b;
  const { name: p, arguments: h } = a;
  if (p === "apply_graph_operations") {
    const v = h.operations;
    if (!Array.isArray(v))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let S;
    try {
      S = i.graph.applyOperations(v);
    } catch (O) {
      return JSON.stringify({ error: `applyOperations threw: ${String(O)}` });
    }
    const A = Og(v, S.results);
    return c.push(A), o.onOpsApplied(A, S), JSON.stringify({
      results: S.results,
      refs: S.refs,
      node_count: S.node_count,
      edge_count: S.edge_count
    });
  }
  if (p === "get_node_schemas") {
    const S = (Array.isArray(h.node_types) ? h.node_types : []).map((j) => String(j)), A = i.graph.getNodeDefinitions(), O = new Map(A.map((j) => [j.node_name, j])), E = S.map((j) => O.get(j)).filter((j) => !!j), L = S.filter((j) => !O.has(j));
    let R = E.length > 0 ? lS(E) : "(no matching node types)";
    return L.length > 0 && (R += `
(unknown node types, not in catalog: ${L.join(", ")})`), R;
  }
  if (p === "validate_graph")
    return JSON.stringify(await md(i));
  if (p === "run_graph") {
    if (Qu)
      return JSON.stringify({
        error: "A live graph run is already in progress. Wait for it to finish or cancel it before starting another."
      });
    const v = kd(i);
    if (v) {
      if (await rs(i, f)) {
        let K = null;
        try {
          K = await cs(i, v.runId, f);
        } catch {
          K = null;
        }
        if (K && !ls(K.status))
          return JSON.stringify({
            error: `Run ${v.runId} is still ${K.status} on the host${v.reason ? ` (${v.reason})` : ""}. One run at a time: wait for it, or the user can stop it from the reattach card (reopen or reload the panel to see it).`
          });
      }
      oi(i, v.runId);
    }
    const S = typeof h.reason == "string" && h.reason.trim() ? h.reason.trim().slice(0, 300) : "Run the current graph.", A = typeof h.timeout_minutes == "number" && Number.isFinite(h.timeout_minutes) ? Math.round(h.timeout_minutes) : E1, O = Math.min(Math.max(A, 1), x1), L = (typeof h.device == "string" && ["cpu", "cuda", "mps"].includes(h.device) ? h.device : void 0) ?? await Iy(i, f);
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Run cancelled before execution." });
    const R = await md(i);
    if (!R.valid)
      return JSON.stringify({
        error: "The current graph is not runnable — fix these validation errors, then call run_graph again.",
        errors: R.errors
      });
    if (!o.onRunApproval)
      return JSON.stringify({
        error: "Running the live graph requires an interactive user confirmation, but this client did not provide one."
      });
    let j;
    try {
      j = Mg(i);
    } catch (K) {
      return JSON.stringify({ error: `Cannot capture the graph before approval: ${String(K)}` });
    }
    let q;
    try {
      const K = i.graph.getGraph();
      q = await o.onRunApproval({
        reason: S,
        nodeCount: K.nodes.filter((V) => V.type !== "note").length,
        edgeCount: K.edges.length,
        nodeTypes: [...new Set(
          K.nodes.map((V) => V.type).filter((V) => !!V && V !== "note")
        )],
        timeoutMinutes: O,
        device: L ?? "host default"
      });
    } catch (K) {
      return f != null && f.aborted ? JSON.stringify({ cancelled: !0, error: "Run cancelled before execution." }) : JSON.stringify({ error: `Run approval failed: ${String(K)}` });
    }
    if (!q)
      return JSON.stringify({ cancelled: !0, error: "The run was not approved by the user." });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Run cancelled before execution." });
    let Z;
    try {
      Z = Mg(i) !== j;
    } catch (K) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(K)}` });
    }
    if (Z)
      return JSON.stringify({
        cancelled: !0,
        replan: !0,
        error: "The graph changed while the run approval was open. Re-read the graph, re-validate, and propose the run again."
      });
    const Y = await rs(i, f);
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Run cancelled before execution." });
    Qu = !0;
    try {
      const K = await $1(i, {
        signal: f,
        timeoutMs: O * 6e4,
        serverOwnedRuns: Y,
        ...L ? { device: L } : {},
        onProgress: o.onRunProgress,
        onRunId: (fe) => z1(i, {
          runId: fe,
          reason: S,
          submittedAt: Date.now(),
          timeoutMinutes: O,
          ...L ? { device: L } : {}
        })
      });
      if (K.status === "detached")
        return JSON.stringify({
          status: "detached",
          run_id: K.runId,
          run_continues: !0
        });
      let V = !1;
      if (K.runId) {
        if (K.status === "error" && await rs(i, f)) {
          let fe = null;
          try {
            fe = await cs(i, K.runId, f);
          } catch {
            fe = null;
          }
          V = fe !== null && !ls(fe.status);
        }
        V || oi(i, K.runId);
      }
      V || (b = o.onRunFinished) == null || b.call(o, K);
      const { durationMs: de, textTail: ce, media: X, ...Q } = K, oe = (X ?? []).map(({ data: fe, ...ae }) => ({
        ...ae,
        ...fe ? { inline_preview: !0 } : {}
      }));
      return JSON.stringify({
        ...Q,
        ...L ? { device: L } : {},
        duration_s: Math.round(de / 1e3),
        ...ce ? { text_tail: ce } : {},
        ...oe.length ? { media: oe } : {},
        ...V ? { run_may_still_be_running: !0 } : {}
      });
    } catch (K) {
      return JSON.stringify({ error: `Run failed: ${String(K)}` });
    } finally {
      Qu = !1;
    }
  }
  if ((p === "list_runs" || p === "get_run") && !await rs(i, f))
    return JSON.stringify({
      error: "Run history is unavailable: this CodefyUI host does not expose /api/runs (server-owned runs). Only results returned in this conversation are known."
    });
  if (p === "list_runs") {
    const v = typeof h.limit == "number" && Number.isFinite(h.limit) ? Math.round(h.limit) : 10;
    try {
      const { runs: S, total: A } = await T1(i, {
        limit: Math.min(Math.max(v, 1), 20),
        signal: f
      }), O = h.active_only === !0 ? S.filter((E) => !ls(E.status)) : S;
      return JSON.stringify({
        total: A,
        runs: O.map((E) => ({
          run_id: E.runId,
          ...E.name ? { name: E.name } : {},
          status: E.status,
          active: E.active,
          ...E.queuePosition !== null ? { queue_position: E.queuePosition } : {},
          ...E.createdAt ? { created_at: E.createdAt } : {},
          ...E.durationS !== null ? { duration_s: E.durationS } : {},
          ...E.error ? { error: E.error } : {},
          ...Object.keys(E.finalMetrics).length ? { final_metrics: E.finalMetrics } : {}
        }))
      });
    } catch (S) {
      return JSON.stringify({ error: `Could not list runs: ${String(S)}` });
    }
  }
  if (p === "get_run") {
    const v = typeof h.run_id == "string" ? h.run_id.trim() : "";
    if (!v) return JSON.stringify({ error: 'get_run requires a non-empty "run_id".' });
    try {
      const S = await cs(i, v, f);
      if (!S) return JSON.stringify({ error: `run '${v}' not found on this host.` });
      const A = await O1(i, v, f);
      return JSON.stringify({
        run: {
          run_id: S.runId,
          ...S.name ? { name: S.name } : {},
          status: S.status,
          active: S.active,
          ...S.createdAt ? { created_at: S.createdAt } : {},
          ...S.startedAt ? { started_at: S.startedAt } : {},
          ...S.finishedAt ? { finished_at: S.finishedAt } : {},
          ...S.durationS !== null ? { duration_s: S.durationS } : {},
          ...S.error ? { error: S.error } : {},
          final_metrics: S.finalMetrics
        },
        artifacts: A.map((O) => ({
          kind: O.kind,
          path: O.path,
          ...O.createdAt ? { created_at: O.createdAt } : {}
        }))
      });
    } catch (S) {
      return JSON.stringify({ error: `Could not fetch run '${v}': ${String(S)}` });
    }
  }
  if (p === "research") {
    const S = (Array.isArray(h.questions) ? h.questions : []).map((E) => String(E)).filter((E) => E.trim()).slice(0, 4);
    if (S.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const A = oy(i.graph.getNodeDefinitions()), O = await Promise.all(
      S.map((E) => H1(i, s, E, A, f))
    );
    return S.map((E, L) => `[${L + 1}] Q: ${E}
A: ${O[L]}`).join(`

`);
  }
  if (p === "optimize_graph_parameters") {
    let v;
    try {
      v = S1(
        h,
        i.graph.getGraph(),
        i.graph.getNodeDefinitions()
      );
    } catch (A) {
      return JSON.stringify({ error: String(A) });
    }
    const S = await Yy(
      {
        id: a.id,
        name: "run_graph_experiments",
        arguments: v.request
      },
      i,
      s,
      o,
      c,
      d,
      f,
      !0
    );
    try {
      const A = JSON.parse(S);
      return JSON.stringify({ ...A, optimizer: v.metadata });
    } catch {
      return S;
    }
  }
  if (p === "run_graph_experiments") {
    if (h.search !== void 0 && !y)
      return JSON.stringify({
        error: "search metadata is internal optimizer provenance; call optimize_graph_parameters instead"
      });
    let v;
    try {
      v = t1(h);
    } catch (j) {
      return JSON.stringify({ error: String(j) });
    }
    if (v > d.remaining)
      return JSON.stringify({
        error: `Experiment turn budget exceeded: ${v} requested, ${d.remaining} of ${gl} executions remain.`
      });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    if (!o.onExperimentApproval)
      return JSON.stringify({
        error: "Experiment execution requires an interactive user confirmation, but this client did not provide one."
      });
    const S = h;
    let A = !1, O;
    try {
      O = i.graph.onGraphChanged(() => {
        A = !0;
      });
    } catch (j) {
      return JSON.stringify({ error: `Cannot safely watch the graph during approval: ${String(j)}` });
    }
    let E;
    try {
      E = Sl(i);
    } catch (j) {
      return O(), JSON.stringify({ error: `Cannot capture the graph before approval: ${String(j)}` });
    }
    let L;
    try {
      try {
        const j = y ? {
          ...a,
          arguments: Object.fromEntries(
            Object.entries(a.arguments).filter(([Z]) => Z !== "search")
          )
        } : a, q = ry(j, i).arguments;
        L = await o.onExperimentApproval({
          hypothesis: q.hypothesis,
          variantCount: S.variants.length,
          repetitions: S.repetitions ?? 1,
          executionCount: v,
          concurrency: S.concurrency ?? 1,
          runTimeoutMinutes: Math.round(Ry(S) / 6e4),
          applyBest: S.apply_best ?? !1,
          variants: q.variants.map((Z) => ({
            label: Z.label,
            operations: Z.operations.map(V1)
          })),
          nodeTypes: [.../* @__PURE__ */ new Set([
            ...i.graph.getGraph().nodes.map((Z) => Z.type).filter((Z) => !!Z && Z !== "note"),
            ...S.variants.flatMap((Z) => Z.operations.filter((Y) => Y.op === "add_node").map((Y) => Y.node_type))
          ])]
        });
      } catch (j) {
        return f != null && f.aborted ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." }) : JSON.stringify({ error: `Experiment approval failed: ${String(j)}` });
      }
    } finally {
      O();
    }
    if (!L)
      return JSON.stringify({ cancelled: !0, error: "Experiment execution was not approved by the user." });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    let R;
    try {
      R = Sl(i) !== E;
    } catch (j) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(j)}` });
    }
    if (A || R)
      return JSON.stringify({
        cancelled: !0,
        replan: !0,
        error: "The active graph changed while execution approval was open. Re-read the graph and propose the study again."
      });
    d.remaining -= v;
    try {
      const j = await a1(
        i,
        h,
        f
      );
      if (j.applyResult && j.appliedOperations) {
        const K = `promote experiment winner: ${Og(
          j.appliedOperations,
          j.applyResult.results
        )}`;
        c.push(K), o.onOpsApplied(K, j.applyResult);
      }
      const { applyResult: q, appliedOperations: Z, ...Y } = j;
      return JSON.stringify(Y);
    } catch (j) {
      return f != null && f.aborted || j instanceof DOMException && j.name === "AbortError" ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled." }) : JSON.stringify({ error: String(j) });
    }
  }
  return p === "get_current_graph" ? ly(i.graph.getGraph(), i.graph.getNodeDefinitions()) : JSON.stringify({ error: `Unknown tool: ${p}` });
}
async function I1(a) {
  const { api: i, settings: s, history: o, userText: c, attachments: d, callbacks: f, signal: y } = a, p = [], h = B1(
    i,
    o,
    c,
    d,
    s.provider
  );
  let b = 0, v = 0, S = !1;
  const A = [], O = { remaining: gl }, E = (R) => {
    var j;
    p.push(R), (j = f.onTurnAppended) == null || j.call(f, R);
  }, L = (R) => {
    const j = id(R, A, i);
    j.trim() && E({ role: "assistant", content: j });
  };
  try {
    for (; ; ) {
      let R = "", j = null, q = null;
      if (await ny(
        i,
        Ky(s, h),
        {
          onText(ae) {
            R += ae, f.onTextDelta(ae);
          },
          onDone(ae) {
            j = ae;
          },
          onError(ae) {
            q = ae;
          }
        },
        y
      ), q !== null) {
        L(R), f.onTurnsCommitted(p), f.onError(q), f.onFinished();
        return;
      }
      if (!j) {
        L(R), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
      const Z = j, Y = Z.message.tool_calls ?? [], K = Z.message.content || R, V = id(
        K,
        [...A, ...Y],
        i
      );
      if (Z.stop_reason === "end" || Y.length === 0) {
        const ae = i.graph.getGraph();
        if (S && Array.isArray(ae.nodes) && ae.nodes.length > 0) {
          const ve = await k1(i);
          if (!ve.valid) {
            if (v >= $g) {
              V.trim() && E({ role: "assistant", content: V }), E({
                role: "assistant",
                content: `I could not complete a runnable graph after ${$g} correction attempts. The current graph still fails CodefyUI validation:
` + ve.errors.map((M) => `- ${M}`).join(`
`)
              }), f.onTurnsCommitted(p), f.onFinished();
              return;
            }
            v++, V.trim() && E({ role: "assistant", content: V }), h.push({ role: "assistant", content: V }), h.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + ve.errors.map((M) => `- ${M}`).join(`
`)
            });
            continue;
          }
        }
        E({ role: "assistant", content: V }), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
      b++;
      const de = sy(Y, i);
      A.push(...Y);
      const ce = {
        role: "assistant",
        content: V,
        tool_calls: de
      }, X = p.length;
      E(ce);
      const Q = [], oe = [];
      for (const ae of Y) {
        const ve = Q.length, M = Date.now(), J = await Yy(
          ae,
          i,
          s,
          f,
          Q,
          O,
          y
        );
        Q.length > ve && (S = !0);
        const T = _l(ae, J, i);
        if (E({
          role: "tool",
          content: T,
          tool_call_id: ae.id,
          durationMs: Date.now() - M
        }), oe.push({
          role: "tool",
          content: T,
          tool_call_id: ae.id
        }), y != null && y.aborted) {
          f.onTurnsCommitted(p), f.onFinished();
          return;
        }
      }
      Q.length > 0 && (p[X] = { ...ce, opsSummary: Q.join("; ") });
      const fe = {
        role: "assistant",
        content: V,
        tool_calls: Y
      };
      if (h.push(fe), h.push(...oe), b >= jg) {
        E({
          role: "assistant",
          content: `(stopped after ${jg} tool rounds)`
        }), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
    }
  } catch (R) {
    f.onTurnsCommitted(p), f.onError(String(R)), f.onFinished();
  }
}
const hd = 120;
function G1(a, i) {
  const s = Cy(i.progress);
  if (s === void 0) return a;
  const o = [...a, s];
  return o.length > hd ? o.slice(o.length - hd) : o;
}
function q1(a, i, s) {
  if (a.length < 2) return "";
  const o = Math.min(...a), d = Math.max(...a) - o, f = i / (a.length - 1), y = 1.5, p = s - y * 2;
  return a.map((h, b) => {
    const v = b * f, S = d === 0 ? s / 2 : y + (1 - (h - o) / d) * p;
    return `${v.toFixed(1)},${S.toFixed(1)}`;
  }).join(" ");
}
function Xy({ series: a }) {
  const o = q1(a, 96, 20);
  if (!o) return null;
  const c = a[a.length - 1];
  return /* @__PURE__ */ g.jsx(
    "svg",
    {
      className: "gcp-run-sparkline",
      viewBox: "0 0 96 20",
      width: 96,
      height: 20,
      role: "img",
      "aria-label": `Training loss trend, latest ${c.toFixed(4)}`,
      children: /* @__PURE__ */ g.jsx(
        "polyline",
        {
          points: o,
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      )
    }
  );
}
function K1(a) {
  const i = [];
  let s = 0;
  return a.forEach((o, c) => {
    if (o.role === "tool") {
      for (let f = i.length - 1; f >= 0; f--) {
        const y = i[f].stages.find(
          (p) => p.call.id === o.tool_call_id && !p.result
        );
        if (y) {
          y.result = o;
          return;
        }
      }
      return;
    }
    o.role === "user" && (s = 0);
    const d = (o.tool_calls ?? []).map((f) => ({ call: f }));
    i.push({
      key: c,
      turn: o,
      stages: d,
      ...d.length > 0 ? { step: ++s } : {}
    });
  }), i;
}
function Jy(a) {
  if (!Number.isFinite(a) || a < 0) return "";
  if (a < 1e4) return `${Math.max(a / 1e3, 0.1).toFixed(1)}s`;
  const i = Math.round(a / 1e3);
  if (i < 60) return `${i}s`;
  const s = Math.floor(i / 60), o = i % 60;
  return `${s}m ${String(o).padStart(2, "0")}s`;
}
function Y1(a) {
  const i = Array.isArray(a.media) ? a.media : [], s = [];
  for (const o of i) {
    if (!o || typeof o != "object") continue;
    const c = o, d = typeof c.url == "string" ? c.url : "";
    c.kind !== "video" || !d.startsWith("/") || s.push({
      kind: "video",
      url: d,
      format: typeof c.format == "string" ? c.format : "mp4",
      ...typeof c.node == "string" && c.node ? { node: c.node } : {}
    });
  }
  return s;
}
const yn = {
  apply_graph_operations: "Edit graph",
  get_current_graph: "Read graph",
  get_node_schemas: "Node schemas",
  validate_graph: "Validate graph",
  research: "Research",
  run_graph: "Run graph",
  run_graph_experiments: "Experiment study",
  optimize_graph_parameters: "Parameter search",
  list_runs: "Reading run history",
  get_run: "Reading run details"
};
function na(a) {
  try {
    const i = JSON.parse(a);
    return i && typeof i == "object" && !Array.isArray(i) ? i : null;
  } catch {
    return null;
  }
}
function X1(a) {
  const i = Array.isArray(a.operations) ? a.operations : [], s = /* @__PURE__ */ new Map();
  for (const o of i) {
    const c = o && typeof o == "object" ? String(o.op ?? "?") : "?";
    s.set(c, (s.get(c) ?? 0) + 1);
  }
  return [...s].map(([o, c]) => `${o} ×${c}`).join(", ");
}
function Yt(a, i) {
  return a.length > i ? a.slice(0, i - 1) + "…" : a;
}
function ht(a) {
  try {
    return Yt(JSON.stringify(JSON.parse(a), null, 2), 4e3);
  } catch {
    return Yt(a, 4e3);
  }
}
function ui(a, i) {
  return `${a} ${i}${a === 1 ? "" : "s"}`;
}
function J1(a, i) {
  const s = yn.apply_graph_operations, o = X1(a);
  if (!i)
    return { label: s, summary: o || "applying operations", status: "running" };
  const c = na(i.content);
  if (!c)
    return { label: s, summary: o, status: "ok", detail: ht(i.content) };
  if (typeof c.error == "string")
    return { label: s, summary: Yt(c.error, 120), status: "error", detail: ht(i.content) };
  const f = (Array.isArray(c.results) ? c.results : []).filter((b) => !b.ok).length, y = typeof c.node_count == "number" ? c.node_count : null, p = typeof c.edge_count == "number" ? c.edge_count : null, h = [];
  return o && h.push(o), f > 0 && h.push(`${f} failed`), y !== null && p !== null && h.push(`${ui(y, "node")} · ${ui(p, "edge")}`), {
    label: s,
    summary: h.join(" — ") || "applied",
    status: f > 0 ? "error" : "ok",
    detail: ht(i.content)
  };
}
function Q1(a) {
  const i = yn.validate_graph;
  if (!a) return { label: i, summary: "checking…", status: "running" };
  const s = na(a.content), o = Array.isArray(s == null ? void 0 : s.errors) ? s.errors.map(String) : [];
  return s != null && s.valid ? { label: i, summary: "graph is runnable", status: "ok" } : {
    label: i,
    summary: o.length > 0 ? ui(o.length, "issue") : "not runnable",
    status: "error",
    detail: o.length > 0 ? o.map((c) => `• ${c}`).join(`
`) : ht(a.content)
  };
}
function Z1(a) {
  const i = yn.get_current_graph;
  if (!a) return { label: i, summary: "reading…", status: "running" };
  const s = na(a.content), o = Array.isArray(s == null ? void 0 : s.nodes) ? s.nodes.length : null, c = Array.isArray(s == null ? void 0 : s.edges) ? s.edges.length : null;
  return {
    label: i,
    summary: o !== null && c !== null ? `${ui(o, "node")} · ${ui(c, "edge")}` : "snapshot",
    status: "ok",
    detail: ht(a.content)
  };
}
function F1(a, i) {
  const s = yn.get_node_schemas, o = Array.isArray(a.node_types) ? a.node_types.map(String) : [], c = o.length > 0 ? Yt(o.join(", "), 90) : "node types";
  return i ? { label: s, summary: c, status: "ok", detail: Yt(i.content, 4e3) } : { label: s, summary: c, status: "running" };
}
function W1(a, i) {
  const s = yn.research, o = Array.isArray(a.questions) ? a.questions.length : 0, c = o > 0 ? `${ui(o, "question")} in parallel` : "researching";
  return i ? { label: s, summary: c, status: "ok", detail: Yt(i.content, 4e3) } : { label: s, summary: c, status: "running" };
}
function P1(a, i) {
  const s = yn.run_graph_experiments, o = Array.isArray(a.variants) ? a.variants.length : 0, c = typeof a.repetitions == "number" ? a.repetitions : 1, d = o > 0 ? `${o} candidates · ${o * c} runs` : "preparing study";
  if (!i) return { label: s, summary: d, status: "running" };
  const f = na(i.content);
  if (!f || typeof f.error == "string")
    return {
      label: s,
      summary: typeof (f == null ? void 0 : f.error) == "string" ? Yt(f.error, 120) : "study failed",
      status: "error",
      detail: ht(i.content)
    };
  const y = typeof f.winnerLabel == "string" ? f.winnerLabel : null, p = typeof f.appliedVariantId == "string";
  return {
    label: s,
    summary: y ? `${y} ranked first${p ? " · applied" : ""}` : "no rankable metric",
    status: y ? "ok" : "error",
    detail: ht(i.content)
  };
}
function eE(a, i) {
  const s = yn.optimize_graph_parameters, o = Array.isArray(a.bindings) ? a.bindings.length : 0, c = a.strategy === "seeded_random" ? "seeded random" : "grid", d = typeof a.repetitions == "number" ? a.repetitions : 1, f = a.strategy === "seeded_random" && typeof a.candidate_count == "number" ? a.candidate_count + (a.include_baseline === !1 ? 0 : 1) : void 0, y = f ? `${c} · ${o} params · ${f * d} runs` : `${c} · ${o} ${o === 1 ? "parameter" : "parameters"}`;
  if (!i) return { label: s, summary: y, status: "running" };
  const p = na(i.content);
  if (!p || typeof p.error == "string")
    return {
      label: s,
      summary: typeof (p == null ? void 0 : p.error) == "string" ? Yt(p.error, 120) : "search failed",
      status: "error",
      detail: ht(i.content)
    };
  const h = typeof p.winnerLabel == "string" ? p.winnerLabel : null, b = typeof p.appliedVariantId == "string";
  return {
    label: s,
    summary: h ? `${h} ranked first${b ? " · applied" : ""}` : "no rankable metric",
    status: h ? "ok" : "error",
    detail: ht(i.content)
  };
}
function tE(a, i) {
  const s = yn.run_graph, o = typeof a.reason == "string" ? Yt(a.reason, 90) : "";
  if (!i) return { label: s, summary: o || "executing…", status: "running" };
  const c = na(i.content);
  if (!c)
    return { label: s, summary: "done", status: "ok", detail: ht(i.content) };
  if (typeof c.status != "string") {
    const p = typeof c.error == "string" ? c.error : "run not started";
    return { label: s, summary: Yt(p, 120), status: "error", detail: ht(i.content) };
  }
  const d = c.status, f = [d];
  typeof c.completedNodes == "number" && typeof c.totalNodes == "number" && f.push(`${c.completedNodes}/${c.totalNodes} nodes`), typeof c.duration_s == "number" && f.push(Jy(c.duration_s * 1e3));
  const y = Y1(c);
  return y.length && f.push(`${y.length} clip${y.length > 1 ? "s" : ""}`), {
    label: s,
    summary: f.join(" · "),
    status: d === "complete" ? "ok" : "error",
    detail: ht(i.content),
    ...y.length ? { media: y } : {}
  };
}
function nE(a, i) {
  const s = yn.list_runs, o = a.active_only === !0 ? "active runs" : "recent runs";
  if (!i) return { label: s, summary: o, status: "running" };
  const c = na(i.content);
  if (!c || typeof c.error == "string")
    return {
      label: s,
      summary: typeof (c == null ? void 0 : c.error) == "string" ? Yt(c.error, 120) : "could not list runs",
      status: "error",
      detail: ht(i.content)
    };
  const d = Array.isArray(c.runs) ? c.runs : [];
  return { label: s, summary: ui(d.length, "run"), status: "ok", detail: ht(i.content) };
}
function aE(a, i) {
  const s = yn.get_run, o = typeof a.run_id == "string" ? a.run_id : "";
  if (!i) return { label: s, summary: o || "run", status: "running" };
  const c = na(i.content);
  if (!c || typeof c.error == "string")
    return {
      label: s,
      summary: typeof (c == null ? void 0 : c.error) == "string" ? Yt(c.error, 120) : "could not fetch run",
      status: "error",
      detail: ht(i.content)
    };
  const d = c.run && typeof c.run == "object" ? c.run : {}, f = typeof d.status == "string" ? d.status : "unknown";
  return { label: s, summary: f, status: "ok", detail: ht(i.content) };
}
function iE(a, i) {
  const s = yn[a.name] ?? a.name;
  if (!i) return { label: s, summary: "running…", status: "running" };
  const o = na(i.content);
  return o && typeof o.error == "string" ? { label: s, summary: Yt(o.error, 120), status: "error", detail: ht(i.content) } : { label: s, summary: "done", status: "ok", detail: ht(i.content) };
}
function Qy(a) {
  const { call: i, result: s } = a, o = i.arguments ?? {};
  switch (i.name) {
    case "apply_graph_operations":
      return J1(o, s);
    case "validate_graph":
      return Q1(s);
    case "get_current_graph":
      return Z1(s);
    case "get_node_schemas":
      return F1(o, s);
    case "research":
      return W1(o, s);
    case "run_graph":
      return tE(o, s);
    case "run_graph_experiments":
      return P1(o, s);
    case "optimize_graph_parameters":
      return eE(o, s);
    case "list_runs":
      return nE(o, s);
    case "get_run":
      return aE(o, s);
    default:
      return iE(i, s);
  }
}
const rE = /`([^`\n]+)`/, sE = /\[([^\]\n]+)\]\(([^)\s]+)\)/, oE = /\*\*([^\n]+?)\*\*/, lE = /(^|[\s(])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?=[\s).,!?:;]|$)/;
function cE(a) {
  let i = null;
  const s = (y) => {
    y && (i === null || y.index < i.index) && (i = y);
  }, o = rE.exec(a);
  o && s({
    index: o.index,
    length: o[0].length,
    node: (y) => /* @__PURE__ */ g.jsx("code", { children: o[1] }, y)
  });
  const c = sE.exec(a);
  if (c) {
    const y = c[2];
    s({
      index: c.index,
      length: c[0].length,
      node: (p) => /^https?:\/\//i.test(y) ? /* @__PURE__ */ g.jsx("a", { href: y, target: "_blank", rel: "noopener noreferrer", children: c[1] }, p) : c[0]
    });
  }
  const d = oE.exec(a);
  d && s({
    index: d.index,
    length: d[0].length,
    node: (y) => /* @__PURE__ */ g.jsx("strong", { children: us(d[1]) }, y)
  });
  const f = lE.exec(a);
  return f && s({
    index: f.index,
    length: f[0].length,
    prefix: f[1],
    node: (y) => /* @__PURE__ */ g.jsx("em", { children: us(f[2]) }, y)
  }), i;
}
function us(a) {
  const i = [];
  let s = a, o = 0;
  for (; s.length > 0; ) {
    const c = cE(s);
    if (!c) {
      i.push(s);
      break;
    }
    const d = s.slice(0, c.index) + (c.prefix ?? "");
    d && i.push(d), i.push(c.node(o++)), s = s.slice(c.index + c.length);
  }
  return i;
}
const uE = /^(#{1,3})\s+(.*)$/, dE = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/, fE = /^\s*[-*]\s+(.*)$/, pE = /^\s*\d+[.)]\s+(.*)$/;
function Cg(a, i) {
  const s = a.split(`
`), o = [];
  let c = [], d = null, f = 0;
  const y = () => {
    c.length !== 0 && (o.push(
      /* @__PURE__ */ g.jsx("p", { className: "gcp-md-p", children: us(c.join(`
`)) }, `${i}-p${f++}`)
    ), c = []);
  }, p = () => {
    if (!d) return;
    const h = d.items.map((b, v) => /* @__PURE__ */ g.jsx("li", { children: us(b) }, v));
    o.push(
      d.ordered ? /* @__PURE__ */ g.jsx("ol", { className: "gcp-md-list", children: h }, `${i}-l${f++}`) : /* @__PURE__ */ g.jsx("ul", { className: "gcp-md-list", children: h }, `${i}-l${f++}`)
    ), d = null;
  };
  for (const h of s) {
    const b = uE.exec(h);
    if (b) {
      y(), p(), o.push(
        /* @__PURE__ */ g.jsx("div", { className: `gcp-md-h${b[1].length}`, children: us(b[2]) }, `${i}-h${f++}`)
      );
      continue;
    }
    if (dE.test(h)) {
      y(), p(), o.push(/* @__PURE__ */ g.jsx("hr", { className: "gcp-md-hr" }, `${i}-r${f++}`));
      continue;
    }
    const v = fE.exec(h), S = v ? null : pE.exec(h);
    if (v || S) {
      y();
      const A = !!S;
      (!d || d.ordered !== A) && (p(), d = { ordered: A, items: [] }), d.items.push((v ?? S)[1]);
      continue;
    }
    if (h.trim() === "") {
      y(), p();
      continue;
    }
    p(), c.push(h);
  }
  return y(), p(), o;
}
const Zu = /```[^\n]*\n?([\s\S]*?)(?:```|$)/g;
function mE({ text: a }) {
  const i = [];
  let s = 0, o = 0;
  Zu.lastIndex = 0;
  for (let c = Zu.exec(a); c !== null && (c.index > s && i.push(...Cg(a.slice(s, c.index), `s${o++}`)), i.push(
    /* @__PURE__ */ g.jsx("pre", { children: /* @__PURE__ */ g.jsx("code", { children: c[1] }) }, `c${o++}`)
  ), s = c.index + c[0].length, c[0].length !== 0); c = Zu.exec(a))
    ;
  return s < a.length && i.push(...Cg(a.slice(s), `s${o++}`)), /* @__PURE__ */ g.jsx(g.Fragment, { children: i });
}
function hE({ kind: a }) {
  return /* @__PURE__ */ g.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    a === "pdf" ? /* @__PURE__ */ g.jsx("path", { d: "M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ g.jsx("path", { d: "M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function gE() {
  return /* @__PURE__ */ g.jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function yE() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M12 5v9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "19", r: "1.7", fill: "currentColor" })
  ] });
}
function vE({ open: a }) {
  return /* @__PURE__ */ g.jsx(
    "svg",
    {
      className: `gcp-stage-chevron${a ? " open" : ""}`,
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ g.jsx("path", { d: "M9 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}
function bE(a) {
  const i = a.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), s = [];
  return i.forEach((o, c) => {
    if (o.startsWith("```")) {
      const d = o.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      s.push(/* @__PURE__ */ g.jsx("pre", { children: /* @__PURE__ */ g.jsx("code", { children: d }) }, c));
    } else o && s.push(/* @__PURE__ */ g.jsx("span", { children: o }, c));
  }), s;
}
function SE({ stage: a }) {
  var f;
  const [i, s] = P.useState(!1), o = Qy(a), c = !!o.detail, d = (f = a.result) == null ? void 0 : f.durationMs;
  return /* @__PURE__ */ g.jsxs("div", { className: `gcp-stage ${o.status}`, children: [
    /* @__PURE__ */ g.jsxs(
      "button",
      {
        type: "button",
        className: "gcp-stage-head",
        onClick: () => c && s((y) => !y),
        "aria-expanded": c ? i : void 0,
        "aria-label": `${o.label}${o.summary ? `: ${o.summary}` : ""}`,
        disabled: !c,
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "gcp-stage-status", "aria-hidden": "true", children: o.status === "running" ? /* @__PURE__ */ g.jsx("span", { className: "gcp-stage-spinner" }) : o.status === "ok" ? /* @__PURE__ */ g.jsx(gE, {}) : /* @__PURE__ */ g.jsx(yE, {}) }),
          /* @__PURE__ */ g.jsx("span", { className: "gcp-stage-label", children: o.label }),
          o.summary && /* @__PURE__ */ g.jsx("span", { className: "gcp-stage-summary", children: o.summary }),
          typeof d == "number" && /* @__PURE__ */ g.jsx("span", { className: "gcp-stage-time", children: Jy(d) }),
          c && /* @__PURE__ */ g.jsx(vE, { open: i })
        ]
      }
    ),
    o.media && o.media.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gcp-stage-media", children: o.media.map((y) => (
      // #310: same-origin /api/media references, host-served with a
      // real Content-Type. A gif is an animated image — browsers
      // refuse it as a <video> source.
      y.format === "gif" ? /* @__PURE__ */ g.jsx(
        "img",
        {
          className: "gcp-stage-clip",
          src: y.url,
          alt: y.node ? `${y.node} output clip` : "run output clip"
        },
        y.url
      ) : /* @__PURE__ */ g.jsx(
        "video",
        {
          className: "gcp-stage-clip",
          src: y.url,
          controls: !0,
          loop: !0,
          preload: "metadata"
        },
        y.url
      )
    )) }),
    i && o.detail && /* @__PURE__ */ g.jsx("pre", { className: "gcp-stage-detail", children: o.detail })
  ] });
}
function Dg({
  turn: a,
  stages: i = [],
  step: s,
  streaming: o = !1,
  streamingText: c
}) {
  if (a.role === "tool") return null;
  const d = a.role === "user", f = o && c !== void 0 ? c : a.content, y = f.trim().length > 0, p = a.attachments ?? [], h = !d && i.length > 0;
  return /* @__PURE__ */ g.jsxs("div", { className: `gcp-msg-row ${d ? "user" : "assistant"}${h ? " step" : ""}`, children: [
    p.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gcp-bubble-attachments", children: p.map(
      (b, v) => b.kind === "image" && b.dataUrl ? /* @__PURE__ */ g.jsx("img", { className: "gcp-att-image", src: b.dataUrl, alt: b.name, title: b.name }, v) : /* @__PURE__ */ g.jsxs("span", { className: "gcp-att-file", title: b.name, children: [
        /* @__PURE__ */ g.jsx(hE, { kind: b.kind }),
        /* @__PURE__ */ g.jsx("span", { className: "gcp-att-file-name", children: b.name })
      ] }, v)
    ) }),
    h && typeof s == "number" && /* @__PURE__ */ g.jsxs("div", { className: "gcp-step-tag", children: [
      /* @__PURE__ */ g.jsx("span", { className: "gcp-step-tag-dot", "aria-hidden": "true" }),
      "Step ",
      s
    ] }),
    (y || o && i.length === 0) && /* @__PURE__ */ g.jsxs("div", { className: "gcp-bubble", children: [
      d ? bE(f) : /* @__PURE__ */ g.jsx(mE, { text: f }),
      o && /* @__PURE__ */ g.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    i.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gcp-stages", children: i.map((b, v) => /* @__PURE__ */ g.jsx(SE, { stage: b }, `${b.call.id}-${v}`)) }),
    !d && a.opsSummary && i.length === 0 && /* @__PURE__ */ g.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ g.jsxs("span", { children: [
      "Applied: ",
      a.opsSummary
    ] }) })
  ] });
}
function Zy(a) {
  return a.notifyOnRunCompletion !== !1 && typeof Notification < "u";
}
function _E(a) {
  Zy(a) && Notification.permission === "default" && Notification.requestPermission();
}
function Fy(a, i) {
  if (!Zy(a) || Notification.permission !== "granted" || typeof document > "u" || !document.hidden) return;
  const s = [i.detail, i.runId ? `run ${i.runId.slice(0, 8)}` : ""].filter(Boolean).join(" · ");
  try {
    const o = new Notification(`Graph run ${i.status}`, s ? { body: s } : void 0);
    o.onclick = () => {
      try {
        window.focus();
      } catch {
      }
      o.close();
    };
  } catch {
  }
}
function Rg(a) {
  const i = [];
  for (const [s, o] of Object.entries(a.finalMetrics).slice(0, 3))
    i.push(`${s} ${Number.isInteger(o) ? o : o.toFixed(4)}`);
  return a.durationS !== null && i.push(a.durationS < 90 ? `${a.durationS}s` : `${Math.round(a.durationS / 60)} min`), i.join(" · ");
}
function EE({ api: a, settings: i, onAskAgent: s }) {
  const [o, c] = P.useState({ kind: "hidden" }), [d, f] = P.useState(!1), y = P.useRef(null), p = P.useRef(i);
  p.current = i, P.useEffect(() => {
    const S = kd(a);
    if (!S) {
      c({ kind: "hidden" });
      return;
    }
    const A = new AbortController();
    return y.current = A, (async () => {
      try {
        const O = await rs(a, A.signal);
        if (A.signal.aborted) return;
        if (!O) {
          oi(a, S.runId), c({ kind: "hidden" });
          return;
        }
        const E = await cs(a, S.runId, A.signal);
        if (A.signal.aborted) return;
        if (!E) {
          oi(a, S.runId), c({ kind: "hidden" });
          return;
        }
        if (ls(E.status)) {
          c({ kind: "finished", runId: S.runId, reason: S.reason, row: E });
          return;
        }
        c({
          kind: "live",
          runId: S.runId,
          reason: S.reason,
          statusText: E.status || "running",
          lossSeries: [],
          connectionLost: !1
        });
        const L = await R1(a, {
          runId: S.runId,
          // Resume at the row's last cursor: replaying a long run's whole
          // event log would hammer the host for state the row already
          // summarizes.
          fromCursor: E.lastCursor ?? 0,
          signal: A.signal,
          onUpdate: (R) => {
            c((j) => {
              if (j.kind !== "live") return j;
              const q = R.lossPoint !== void 0 ? [...j.lossSeries, R.lossPoint].slice(-hd) : j.lossSeries, Z = [R.runStatus || "running"];
              return R.nodeId && R.nodeStatus && Z.push(`${R.nodeId} ${R.nodeStatus}`), R.lossPoint !== void 0 && Z.push(`loss ${R.lossPoint.toFixed(4)}`), R.completedNodes > 0 && Z.push(`${R.completedNodes} nodes done`), {
                ...j,
                lossSeries: q,
                statusText: Z.join(" · "),
                connectionLost: R.connectionLost
              };
            });
          }
        });
        if (L.aborted) return;
        if (!L.row) {
          oi(a, S.runId), c({ kind: "hidden" });
          return;
        }
        c({ kind: "finished", runId: S.runId, reason: S.reason, row: L.row }), Fy(p.current, {
          runId: S.runId,
          status: L.row.status,
          detail: Rg(L.row)
        });
      } catch {
        A.signal.aborted || c({ kind: "hidden" });
      }
    })(), () => {
      A.abort();
    };
  }, [a]);
  const h = () => {
    o.kind === "live" && (f(!0), C1(a, o.runId).then((S) => {
      S || f(!1);
    }));
  }, b = () => {
    var S;
    o.kind !== "hidden" && (o.kind === "live" && ((S = y.current) == null || S.abort()), oi(a, o.runId), c({ kind: "hidden" }));
  }, v = () => {
    o.kind === "finished" && (s(`Summarize run ${o.runId} with get_run and report its metrics exactly.`), oi(a, o.runId), c({ kind: "hidden" }));
  };
  return o.kind === "hidden" ? null : /* @__PURE__ */ g.jsxs("div", { className: "gcp-reattach", role: "status", "aria-label": "Background graph run", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "gcp-reattach-body", children: [
      /* @__PURE__ */ g.jsx("div", { className: "gcp-reattach-title", children: o.kind === "live" ? "Run in progress (reattached)" : `Run ${o.row.status} while you were away` }),
      /* @__PURE__ */ g.jsxs("div", { className: "gcp-reattach-detail", children: [
        o.kind === "live" ? `${o.connectionLost ? "Connection lost — retrying… · " : ""}${o.statusText}` : Rg(o.row) || o.row.error || "No recorded metrics.",
        o.reason ? /* @__PURE__ */ g.jsxs("span", { className: "gcp-reattach-reason", children: [
          " — ",
          o.reason
        ] }) : null
      ] }),
      o.kind === "live" && o.lossSeries.length >= 2 && /* @__PURE__ */ g.jsx(Xy, { series: o.lossSeries })
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "gcp-reattach-actions", children: [
      o.kind === "live" && /* @__PURE__ */ g.jsx(
        "button",
        {
          className: "gcp-reattach-btn gcp-reattach-stop",
          disabled: d,
          onClick: h,
          children: d ? "Stopping…" : "Stop run"
        }
      ),
      o.kind === "finished" && /* @__PURE__ */ g.jsx("button", { className: "gcp-reattach-btn", onClick: v, children: "Ask the agent to summarize" }),
      /* @__PURE__ */ g.jsx(
        "button",
        {
          className: "gcp-reattach-btn gcp-reattach-dismiss",
          onClick: b,
          ...o.kind === "live" ? { title: "Stop watching. The run keeps running on the host." } : {},
          children: "Dismiss"
        }
      )
    ] })
  ] });
}
function xE() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M22 2L11 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M22 2L15 22L11 13L2 9L22 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function AE() {
  return /* @__PURE__ */ g.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function zg() {
  return /* @__PURE__ */ g.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx(
    "path",
    {
      d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }
  ) });
}
function NE({ kind: a }) {
  return a === "pdf" ? /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) : /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M14 2v6h6M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function wE() {
  return /* @__PURE__ */ g.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }) });
}
function jE() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ g.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function $E() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ g.jsx("path", { d: "M12 7.5v5.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "16.5", r: "1.2", fill: "currentColor" })
  ] });
}
function ME() {
  return /* @__PURE__ */ g.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M13 2L4 14h6l-1 8 9-12h-6l1-8z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Lg() {
  return /* @__PURE__ */ g.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
const TE = [
  "Build a small CNN image classifier",
  "Explain what my current graph does",
  "Improve my current graph"
];
function OE({
  api: a,
  settings: i,
  codexLoggedIn: s,
  conversation: o,
  onConversationChange: c,
  onSettingsChange: d,
  onOpenSettings: f,
  onOpenHistory: y
}) {
  var lr, hi, la;
  const [p, h] = P.useState(""), [b, v] = P.useState(!1), [S, A] = P.useState(!1), [O, E] = P.useState(""), [L, R] = P.useState([]), [j, q] = P.useState(0), [Z, Y] = P.useState(null), [K, V] = P.useState(""), [de, ce] = P.useState([]), [X, Q] = P.useState([]), [oe, fe] = P.useState(!1), [ae, ve] = P.useState(null), [M, J] = P.useState(null), [T, ie] = P.useState(null), [ee, x] = P.useState([]), U = P.useRef(null), F = P.useRef(!0), W = P.useRef(null), se = P.useRef(null), pe = P.useRef(null), ue = P.useRef(null), We = P.useRef(0), we = H0(i, s), vn = X.some((k) => k.status === "loading"), cn = X.filter((k) => k.status === "ready" && k.att).map((k) => k.att), aa = we && !b && !vn && (p.trim().length > 0 || cn.length > 0);
  P.useEffect(() => () => {
    var k, be;
    (k = ue.current) == null || k.call(ue, !1), ue.current = null, (be = pe.current) == null || be.abort(Hy);
  }, []), P.useEffect(() => {
    if (!b) {
      q(0);
      return;
    }
    const k = Date.now(), be = window.setInterval(() => {
      q(Math.floor((Date.now() - k) / 1e3));
    }, 1e3);
    return () => window.clearInterval(be);
  }, [b]);
  const te = P.useCallback(() => {
    const k = U.current;
    k && (F.current = k.scrollHeight - k.scrollTop - k.clientHeight < 80);
  }, []);
  P.useEffect(() => {
    const k = U.current;
    k && F.current && (k.scrollTop = k.scrollHeight);
  }, [o.messages, L, O, X.length, b]);
  const ge = P.useCallback(() => {
    const k = W.current;
    k && (k.style.height = "auto", k.style.height = Math.min(k.scrollHeight, 110) + "px");
  }, []);
  P.useEffect(() => {
    ge();
  }, [p, ge]);
  const Ke = P.useCallback(
    (k) => {
      if (!(!we || b))
        for (const be of Array.from(k)) {
          const yt = crypto.randomUUID(), Ha = ey(be);
          Q((Ue) => [
            ...Ue,
            { id: yt, name: be.name, kind: Ha, size: be.size, status: "loading" }
          ]), P0(be).then((Ue) => {
            Q(
              (Sn) => Sn.map((Vt) => Vt.id === yt ? { ...Vt, status: "ready", att: Ue } : Vt)
            );
          }).catch((Ue) => {
            const Sn = (Ue == null ? void 0 : Ue.message) ?? String(Ue);
            Q(
              (Vt) => Vt.map((Jt) => Jt.id === yt ? { ...Jt, status: "error", error: Sn } : Jt)
            );
          });
        }
    },
    [we, b]
  ), rt = (k) => {
    Q((be) => be.filter((yt) => yt.id !== k));
  }, At = (k) => {
    k.target.files && k.target.files.length > 0 && Ke(k.target.files), k.target.value = "";
  }, Et = (k) => {
    var yt;
    const be = (yt = k.clipboardData) == null ? void 0 : yt.files;
    be && be.length > 0 && (Ke(be), k.preventDefault());
  }, Tt = (k) => {
    !we || b || Array.from(k.dataTransfer.types).includes("Files") && (k.preventDefault(), We.current += 1, fe(!0));
  }, un = (k) => {
    !we || b || Array.from(k.dataTransfer.types).includes("Files") && k.preventDefault();
  }, Pe = () => {
    We.current -= 1, We.current <= 0 && (We.current = 0, fe(!1));
  }, fi = (k) => {
    We.current = 0, fe(!1), !(!we || b) && k.dataTransfer.files && k.dataTransfer.files.length > 0 && (k.preventDefault(), Ke(k.dataTransfer.files));
  }, ia = P.useCallback(
    async (k, be) => {
      var dn;
      const yt = k.trim();
      if (!yt && be.length === 0 || b || !we) return;
      Y(null), V(yt), ce(be), h(""), Q([]), v(!0), E(""), R([]), F.current = !0;
      const Ha = { role: "user", content: yt };
      be.length > 0 && (Ha.attachments = be);
      let Ue = { ...o };
      Ue.title || (Ue.title = G0(yt || ((dn = be[0]) == null ? void 0 : dn.name) || "Attachment")), Ue.provider = i.provider, Ue.model = i.models[i.provider] ?? "";
      const Sn = ol(i);
      Sn ? Ue.reasoningEffort = Sn : delete Ue.reasoningEffort, Ue.messages = [...Ue.messages, Ha], Ue.updatedAt = Date.now(), c(Ue), Kh(a, Ue);
      const Vt = new AbortController();
      pe.current = Vt;
      let Jt = "";
      await I1({
        api: a,
        settings: i,
        history: Ue.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: yt,
        attachments: be.length > 0 ? be : void 0,
        callbacks: {
          onTextDelta(xe) {
            Jt += xe, E(Jt);
          },
          onTurnAppended(xe) {
            xe.role !== "tool" ? (Jt = "", E("")) : (ie(null), x([])), R((Xe) => [...Xe, xe]);
          },
          onOpsApplied() {
          },
          onExperimentApproval(xe) {
            var Xe;
            return Vt.signal.aborted ? Promise.resolve(!1) : ((Xe = ue.current) == null || Xe.call(ue, !1), new Promise((Qt) => {
              ue.current = Qt, ve(xe);
            }));
          },
          onRunApproval(xe) {
            var Xe;
            return Vt.signal.aborted ? Promise.resolve(!1) : ((Xe = ue.current) == null || Xe.call(ue, !1), new Promise((Qt) => {
              ue.current = Qt, J(xe);
            }));
          },
          onRunProgress(xe) {
            ie(w1(xe)), xe.phase === "connecting" ? x([]) : x((Xe) => G1(Xe, xe));
          },
          onRunFinished(xe) {
            const Xe = [
              ...Object.entries(xe.metrics).slice(0, 2).map(([Qt, Ia]) => `${Qt} ${Number.isInteger(Ia) ? Ia : Ia.toFixed(4)}`),
              `${Math.max(1, Math.round(xe.durationMs / 6e4))} min`
            ].join(" · ");
            Fy(i, { runId: xe.runId, status: xe.status, detail: Xe });
          },
          onTurnsCommitted(xe) {
            E(""), Jt = "", R([]), Ue = { ...Ue, messages: [...Ue.messages, ...xe], updatedAt: Date.now() }, c(Ue), Kh(a, Ue);
          },
          onError(xe) {
            Y(xe), E(""), Jt = "";
          },
          onFinished() {
            var xe;
            (xe = ue.current) == null || xe.call(ue, !1), ue.current = null, ve(null), J(null), ie(null), x([]), v(!1), pe.current = null;
          }
        },
        signal: Vt.signal
      });
    },
    [a, b, o, c, we, i]
  ), Nt = () => ia(p, cn), wl = (k) => {
    k.key === "Enter" && !k.shiftKey && (k.preventDefault(), ia(p, cn));
  }, $s = () => {
    var k, be;
    (k = ue.current) == null || k.call(ue, !1), ue.current = null, ve(null), J(null), (be = pe.current) == null || be.abort();
  }, or = (k) => {
    const be = ue.current;
    ue.current = null, ve(null), be == null || be(k);
  }, ka = (k) => {
    k && _E(i);
    const be = ue.current;
    ue.current = null, J(null), be == null || be(k);
  }, jl = () => ia(K, de), Ms = L.length > 0 ? [...o.messages, ...L] : o.messages, pi = K1(Ms), Ts = pi.length === 0 && !b, Mn = pi[pi.length - 1], gt = Mn == null ? void 0 : Mn.stages.find((k) => !k.result), wt = b && O === "" && !!!gt && !ae && !M, Os = L.filter(
    (k) => {
      var be;
      return k.role === "assistant" && (((be = k.tool_calls) == null ? void 0 : be.length) ?? 0) > 0;
    }
  ).length, $l = ae || M ? "Waiting for approval" : T || (O !== "" ? "Writing reply" : gt ? Qy(gt).label : "Thinking"), ra = i.provider, sa = i.models[ra] ?? "", jt = sl(ra, sa), mi = ((hi = (lr = i.providerCapabilities) == null ? void 0 : lr[ra]) == null ? void 0 : hi.reasoningEffort) === !0, bn = d && mi ? (jt == null ? void 0 : jt.reasoningEfforts) ?? [] : [], Xt = ((la = i.reasoningEfforts) == null ? void 0 : la[ra]) ?? "", oa = (k) => {
    A(!1), d == null || d(Zg(i, ra, k));
  }, Cs = Ts ? td(a).filter((k) => k.id !== o.id).length : 0;
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: `gcp-chat${oe ? " gcp-dragging" : ""}`,
      onDragEnter: Tt,
      onDragOver: un,
      onDragLeave: Pe,
      onDrop: fi,
      children: [
        /* @__PURE__ */ g.jsx(
          EE,
          {
            api: a,
            settings: i,
            onAskAgent: (k) => {
              var be;
              h(k), (be = W.current) == null || be.focus();
            }
          }
        ),
        /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: "gcp-messages",
            role: "log",
            "aria-live": "polite",
            "aria-label": "Conversation",
            ref: U,
            onScroll: te,
            children: [
              Ts && /* @__PURE__ */ g.jsxs("div", { className: "gcp-welcome", children: [
                /* @__PURE__ */ g.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ g.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
                /* @__PURE__ */ g.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." }),
                we && /* @__PURE__ */ g.jsx("div", { className: "gcp-welcome-suggestions", "aria-label": "Suggested prompts", children: TE.map((k) => /* @__PURE__ */ g.jsx("button", { className: "gcp-suggestion", onClick: () => ia(k, []), children: k }, k)) }),
                Cs > 0 && /* @__PURE__ */ g.jsxs(
                  "button",
                  {
                    className: "gcp-welcome-history",
                    onClick: y,
                    "aria-label": "View previous conversations",
                    children: [
                      /* @__PURE__ */ g.jsx(jE, {}),
                      "Previous conversations (",
                      Cs,
                      ")"
                    ]
                  }
                )
              ] }),
              pi.map((k) => /* @__PURE__ */ g.jsx(
                Dg,
                {
                  turn: k.turn,
                  stages: k.stages,
                  step: k.step
                },
                k.key
              )),
              b && O !== "" && /* @__PURE__ */ g.jsx(
                Dg,
                {
                  turn: { role: "assistant", content: "" },
                  streaming: !0,
                  streamingText: O
                }
              ),
              wt && /* @__PURE__ */ g.jsxs("div", { className: "gcp-thinking", role: "status", "aria-label": "Waiting for the assistant", children: [
                /* @__PURE__ */ g.jsx("span", { className: "gcp-thinking-orb", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ g.jsx("span", { className: "gcp-thinking-text", children: "Thinking" }),
                j >= 3 && /* @__PURE__ */ g.jsxs("span", { className: "gcp-thinking-time", children: [
                  j,
                  "s"
                ] })
              ] }),
              Z && !b && /* @__PURE__ */ g.jsxs("div", { className: "gcp-error-row", role: "alert", children: [
                /* @__PURE__ */ g.jsx("span", { className: "gcp-error-icon", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx($E, {}) }),
                /* @__PURE__ */ g.jsxs("div", { className: "gcp-error-body", children: [
                  /* @__PURE__ */ g.jsx("div", { className: "gcp-error-title", children: "Request failed" }),
                  /* @__PURE__ */ g.jsx("div", { className: "gcp-error-text", children: Z })
                ] }),
                /* @__PURE__ */ g.jsx("button", { className: "gcp-retry-btn", onClick: jl, "aria-label": "Retry", children: "Retry" })
              ] })
            ]
          }
        ),
        oe && /* @__PURE__ */ g.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ g.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ g.jsx(zg, {}),
          /* @__PURE__ */ g.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        S && /* @__PURE__ */ g.jsx(
          "button",
          {
            className: "gcp-menu-backdrop",
            "aria-label": "Close menu",
            onClick: () => A(!1)
          }
        ),
        ae && /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-backdrop", children: /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: "gcp-experiment-approval",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "gcp-experiment-approval-title",
            children: [
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-kicker", children: "Execution approval" }),
              /* @__PURE__ */ g.jsxs("div", { id: "gcp-experiment-approval-title", className: "gcp-experiment-approval-title", children: [
                "Run ",
                ae.executionCount,
                " graph execution",
                ae.executionCount === 1 ? "" : "s",
                "?"
              ] }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-hypothesis", children: ae.hypothesis }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-facts", children: [
                /* @__PURE__ */ g.jsxs("span", { children: [
                  ae.variantCount,
                  " variants"
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  ae.repetitions,
                  " repetitions"
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  "concurrency ",
                  ae.concurrency
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  "per-run cap ",
                  ae.runTimeoutMinutes,
                  " min"
                ] }),
                ae.applyBest && /* @__PURE__ */ g.jsx("span", { children: "parameter winner may be applied" })
              ] }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-warning", children: "Review the candidate settings below. Credential values are schema-redacted." }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-candidates", "aria-label": "Candidate changes", children: ae.variants.map((k, be) => /* @__PURE__ */ g.jsxs("div", { children: [
                /* @__PURE__ */ g.jsx("strong", { children: k.label }),
                /* @__PURE__ */ g.jsx("span", { children: k.operations.length > 0 ? k.operations.join(" · ") : "baseline — no changes" })
              ] }, `${be}-${k.label}`)) }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-nodes", children: [
                /* @__PURE__ */ g.jsx("strong", { children: "Nodes that may execute" }),
                /* @__PURE__ */ g.jsx("span", { children: ae.nodeTypes.length > 0 ? ae.nodeTypes.join(", ") : "No typed nodes detected" })
              ] }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-warning", children: "Candidate edits stay off-canvas, but nodes may write files, call networks, use GPU time, or incur API costs." }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-actions", children: [
                /* @__PURE__ */ g.jsx("button", { className: "gcp-approval-secondary", onClick: () => or(!1), autoFocus: !0, children: "Cancel" }),
                /* @__PURE__ */ g.jsx("button", { className: "gcp-approval-primary", onClick: () => or(!0), children: "Approve and run" })
              ] })
            ]
          }
        ) }),
        M && /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-backdrop", children: /* @__PURE__ */ g.jsxs(
          "div",
          {
            className: "gcp-experiment-approval",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "gcp-run-approval-title",
            children: [
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-kicker", children: "Execution approval" }),
              /* @__PURE__ */ g.jsx("div", { id: "gcp-run-approval-title", className: "gcp-experiment-approval-title", children: "Run the current graph?" }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-hypothesis", children: M.reason }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-facts", children: [
                /* @__PURE__ */ g.jsxs("span", { children: [
                  M.nodeCount,
                  " node",
                  M.nodeCount === 1 ? "" : "s"
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  M.edgeCount,
                  " edge",
                  M.edgeCount === 1 ? "" : "s"
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  "device ",
                  M.device
                ] }),
                /* @__PURE__ */ g.jsxs("span", { children: [
                  "time cap ",
                  M.timeoutMinutes,
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-nodes", children: [
                /* @__PURE__ */ g.jsx("strong", { children: "Nodes that will execute" }),
                /* @__PURE__ */ g.jsx("span", { children: M.nodeTypes.length > 0 ? M.nodeTypes.join(", ") : "No typed nodes detected" })
              ] }),
              /* @__PURE__ */ g.jsx("div", { className: "gcp-experiment-approval-warning", children: "This executes your live graph with real side effects — file writes, network calls, GPU time. Training runs can take a long time; progress streams into this panel and Stop cancels the run." }),
              /* @__PURE__ */ g.jsxs("div", { className: "gcp-experiment-approval-actions", children: [
                /* @__PURE__ */ g.jsx("button", { className: "gcp-approval-secondary", onClick: () => ka(!1), autoFocus: !0, children: "Cancel" }),
                /* @__PURE__ */ g.jsx("button", { className: "gcp-approval-primary", onClick: () => ka(!0), children: "Run graph" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ g.jsxs("div", { className: "gcp-input-area", children: [
          X.length > 0 && /* @__PURE__ */ g.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: X.map((k) => {
            var be;
            return /* @__PURE__ */ g.jsxs(
              "div",
              {
                className: `gcp-chip ${k.kind === "image" ? "image" : "file"} ${k.status}`,
                title: k.status === "error" ? k.error : `${k.name} · ${os(k.size)}`,
                children: [
                  k.kind === "image" && ((be = k.att) != null && be.dataUrl) ? /* @__PURE__ */ g.jsx("img", { className: "gcp-chip-thumb", src: k.att.dataUrl, alt: k.name }) : /* @__PURE__ */ g.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ g.jsx(NE, { kind: k.kind }) }),
                  /* @__PURE__ */ g.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ g.jsx("span", { className: "gcp-chip-name", children: k.name }),
                    /* @__PURE__ */ g.jsx("span", { className: "gcp-chip-size", children: k.status === "loading" ? "reading…" : k.status === "error" ? "failed" : os(k.size) })
                  ] }),
                  k.status === "loading" && /* @__PURE__ */ g.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ g.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => rt(k.id),
                      "aria-label": `Remove ${k.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ g.jsx(wE, {})
                    }
                  )
                ]
              },
              k.id
            );
          }) }),
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ g.jsx(
              "input",
              {
                ref: se,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: At,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ g.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var k;
                  return (k = se.current) == null ? void 0 : k.click();
                },
                disabled: !we || b,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ g.jsx(zg, {})
              }
            ),
            /* @__PURE__ */ g.jsx(
              "textarea",
              {
                ref: W,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: p,
                onChange: (k) => h(k.target.value),
                onKeyDown: wl,
                onPaste: Et,
                disabled: b || !we,
                "aria-label": "Message input",
                "aria-disabled": we ? void 0 : "true"
              }
            ),
            b ? /* @__PURE__ */ g.jsx("button", { className: "gcp-stop-btn", onClick: $s, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ g.jsx(AE, {}) }) : /* @__PURE__ */ g.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: Nt,
                disabled: !aa,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ g.jsx(xE, {})
              }
            )
          ] }),
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-composer-bar", children: [
            /* @__PURE__ */ g.jsx("div", { className: "gcp-composer-context", children: bn.length > 0 ? /* @__PURE__ */ g.jsxs(
              "div",
              {
                className: "gcp-effort",
                onKeyDown: (k) => {
                  k.key === "Escape" && A(!1);
                },
                children: [
                  /* @__PURE__ */ g.jsxs(
                    "button",
                    {
                      className: `gcp-context-chip${S ? " open" : ""}`,
                      onClick: () => A((k) => !k),
                      "aria-haspopup": "menu",
                      "aria-expanded": S,
                      "aria-label": "Model and reasoning effort",
                      title: "Adjust reasoning effort",
                      children: [
                        /* @__PURE__ */ g.jsx(ME, {}),
                        /* @__PURE__ */ g.jsx("span", { className: "gcp-context-chip-model", children: sa || "model" }),
                        /* @__PURE__ */ g.jsx("span", { className: "gcp-context-chip-effort", children: Xt || (jt == null ? void 0 : jt.defaultReasoningEffort) || "auto" })
                      ]
                    }
                  ),
                  S && /* @__PURE__ */ g.jsxs("div", { className: "gcp-effort-menu", role: "menu", "aria-label": "Reasoning effort", children: [
                    /* @__PURE__ */ g.jsx("div", { className: "gcp-effort-menu-title", children: "Reasoning effort" }),
                    bn.map((k) => /* @__PURE__ */ g.jsxs(
                      "button",
                      {
                        role: "menuitemradio",
                        "aria-checked": Xt === k.effort,
                        className: `gcp-effort-item${Xt === k.effort ? " selected" : ""}`,
                        onClick: () => oa(k.effort),
                        children: [
                          /* @__PURE__ */ g.jsx("span", { className: "gcp-effort-item-name", children: k.effort }),
                          k.description && /* @__PURE__ */ g.jsx("span", { className: "gcp-effort-item-desc", children: k.description }),
                          /* @__PURE__ */ g.jsx("span", { className: "gcp-effort-item-check", "aria-hidden": "true", children: Xt === k.effort && /* @__PURE__ */ g.jsx(Lg, {}) })
                        ]
                      },
                      k.effort
                    )),
                    /* @__PURE__ */ g.jsxs(
                      "button",
                      {
                        role: "menuitemradio",
                        "aria-checked": Xt === "",
                        className: `gcp-effort-item${Xt === "" ? " selected" : ""}`,
                        onClick: () => oa(""),
                        children: [
                          /* @__PURE__ */ g.jsxs("span", { className: "gcp-effort-item-name", children: [
                            "model default",
                            jt != null && jt.defaultReasoningEffort ? ` (${jt.defaultReasoningEffort})` : ""
                          ] }),
                          /* @__PURE__ */ g.jsx("span", { className: "gcp-effort-item-check", "aria-hidden": "true", children: Xt === "" && /* @__PURE__ */ g.jsx(Lg, {}) })
                        ]
                      }
                    ),
                    /* @__PURE__ */ g.jsx("div", { className: "gcp-effort-menu-divider", role: "separator" }),
                    /* @__PURE__ */ g.jsx(
                      "button",
                      {
                        role: "menuitem",
                        className: "gcp-effort-item",
                        onClick: () => {
                          A(!1), f();
                        },
                        children: /* @__PURE__ */ g.jsx("span", { className: "gcp-effort-item-name", children: "Change model…" })
                      }
                    )
                  ] })
                ]
              }
            ) : /* @__PURE__ */ g.jsx(
              "button",
              {
                className: "gcp-context-chip",
                onClick: f,
                "aria-label": "Model settings",
                title: `Provider: ${ra} — open settings`,
                children: /* @__PURE__ */ g.jsx("span", { className: "gcp-context-chip-model", children: sa || "set up model" })
              }
            ) }),
            b ? /* @__PURE__ */ g.jsxs("div", { className: "gcp-runbar", role: "status", "aria-label": "Agent activity", children: [
              /* @__PURE__ */ g.jsx("span", { className: "gcp-runbar-pulse", "aria-hidden": "true" }),
              /* @__PURE__ */ g.jsxs("span", { className: "gcp-runbar-phase", children: [
                $l,
                "…"
              ] }),
              ee.length >= 2 && /* @__PURE__ */ g.jsx(Xy, { series: ee }),
              Os > 0 && /* @__PURE__ */ g.jsxs("span", { className: "gcp-runbar-step", children: [
                "step ",
                Os
              ] }),
              j >= 1 && /* @__PURE__ */ g.jsxs("span", { className: "gcp-runbar-time", children: [
                j,
                "s"
              ] })
            ] }) : /* @__PURE__ */ g.jsx("div", { className: "gcp-composer-hint", "aria-hidden": "true", children: "Enter ↵ send · Shift+Enter newline" })
          ] }),
          !we && !b && /* @__PURE__ */ g.jsxs("div", { className: "gcp-not-ready-overlay", children: [
            /* @__PURE__ */ g.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
            /* @__PURE__ */ g.jsx(
              "button",
              {
                className: "gcp-cta-btn",
                onClick: f,
                "aria-label": "Open settings to configure a provider",
                children: "Settings"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
const CE = "Imported portable-study content passed SHA-256 integrity checking, which detects content changes but does not authenticate its author or evidence source. It is read-only and was not executed in this browser session.";
function As(a, i) {
  return a < i ? -1 : a > i ? 1 : 0;
}
function DE(a) {
  return Object.fromEntries(
    a.map((i) => [i.observedKey, i.value]).sort(([i], [s]) => As(i, s))
  );
}
function RE(a) {
  return Object.fromEntries(
    a.map((i) => [i.observedKey, i.canonicalKey]).sort(([i], [s]) => As(i, s))
  );
}
function zE(a) {
  return Object.fromEntries(
    a.map((i) => [i.observedKey, i.source]).sort(([i], [s]) => As(i, s))
  );
}
function LE(a, i) {
  if (i.metricKey !== void 0)
    return a.metrics.find((s) => s.canonicalKey === i.metricKey);
}
function UE(a, i) {
  const s = LE(a, i), o = a.status === "completed" ? void 0 : a.status === "cancelled" ? `Imported run was cancelled [${a.error.phase}/${a.error.code}]: ${a.error.message}` : `Imported run failed [${a.error.phase}/${a.error.code}]: ${a.error.message}`;
  return {
    repetition: a.repetition,
    // ExperimentSession has no cancelled run state. Preserve the distinction
    // in the error text while ensuring cancelled evidence never appears as a
    // successful observation.
    status: a.status === "completed" ? "completed" : "failed",
    durationMs: a.durationMs,
    ...s === void 0 ? {} : {
      metricKey: s.canonicalKey,
      metricValue: s.value,
      metricSource: s.source
    },
    observedMetrics: DE(a.metrics),
    ...a.metrics.length === 0 ? {} : {
      observedMetricIdentities: RE(a.metrics),
      observedMetricSources: zE(a.metrics)
    },
    ...o === void 0 ? {} : { error: o }
  };
}
function VE(a, i) {
  const s = i.filter((o) => o.variantId === a.id).sort((o, c) => o.repetition - c.repetition || As(o.runKey, c.runKey)).map((o) => UE(o, a));
  return {
    id: a.id,
    label: a.label,
    status: a.status,
    ...a.metricKey === void 0 ? {} : { metricKey: a.metricKey },
    metricValues: [...a.metricValues],
    ...a.mean === void 0 ? {} : { mean: a.mean },
    ...a.stddev === void 0 ? {} : { stddev: a.stddev },
    ...a.confidenceInterval95 === void 0 ? {} : { confidenceInterval95: { ...a.confidenceInterval95 } },
    ...a.baselineComparison === void 0 ? {} : { baselineComparison: { ...a.baselineComparison } },
    runtimeMs: a.runtimeMs,
    observedMetrics: Object.fromEntries(
      a.observedMetrics.map(({ key: o, value: c }) => [o, c]).sort(([o], [c]) => As(o, c))
    ),
    // Always supply an array, including an empty one. Omitting it would make
    // legacy export code synthesize attempts from aggregate metricValues.
    runs: s,
    ...a.operationSummary === void 0 ? {} : { operationSummary: [...a.operationSummary] },
    errors: [...a.errors]
  };
}
function BE(a) {
  return {
    title: a.title,
    evidence: a.evidence,
    nextStep: a.nextStep
  };
}
function kE(a) {
  const i = a.payload.provenance.facts.find((s) => s.key === "optimizer.plan" && s.status === "observed");
  if (!(!i || !Vd(i.value)))
    return JSON.parse(JSON.stringify(i.value));
}
function HE(a) {
  const { payload: i } = a, { derived: s, spec: o } = i, c = kE(a);
  return {
    id: i.id,
    createdAt: i.createdAt,
    hypothesis: o.hypothesis,
    objective: { ...o.objective },
    repetitions: o.repetitions,
    status: s.status,
    variants: s.variants.map((d) => VE(d, i.runs)),
    ...c === void 0 ? {} : { search: c },
    ...s.baselineVariantId === void 0 ? {} : { baselineVariantId: s.baselineVariantId },
    ...s.winnerId === void 0 ? {} : { winnerId: s.winnerId },
    ...s.winnerLabel === void 0 ? {} : { winnerLabel: s.winnerLabel },
    ...s.appliedVariantId === void 0 ? {} : { appliedVariantId: s.appliedVariantId },
    ...s.applyConflict === void 0 ? {} : { applyConflict: s.applyConflict },
    insights: {
      summary: [...s.insights.summary],
      warnings: [...s.insights.warnings, CE],
      paperIdeas: s.insights.paperIdeas.map(BE)
    }
  };
}
function Ra(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function IE(a, i) {
  return Object.prototype.hasOwnProperty.call(a, i);
}
function Wy(a) {
  return Ra(a) && typeof a.$gcpSecretRef == "string";
}
function Ns(a, i) {
  if (Wy(a)) {
    const s = a.$gcpSecretRef;
    return IE(i.bindings, s) && typeof i.bindings[s] == "string" ? (i.resolved.add(s), i.bindings[s]) : (i.missing.add(s), "");
  }
  if (Array.isArray(a))
    return a.map((s) => Ns(s, i));
  if (Ra(a)) {
    const s = /* @__PURE__ */ Object.create(null);
    for (const [o, c] of Object.entries(a))
      s[o] = Ns(c, i);
    return s;
  }
  return a;
}
function gd(a, i) {
  return Ns(a, i);
}
function GE(a, i) {
  return {
    name: a.name ?? "",
    description: a.description ?? "",
    nodes: a.nodes.map((s) => ({
      id: s.id,
      type: s.type,
      position: { x: s.position.x, y: s.position.y },
      data: gd(s.data, i)
    })),
    edges: a.edges.map((s) => ({
      id: s.id,
      source: s.source,
      target: s.target,
      sourceHandle: s.sourceHandle,
      targetHandle: s.targetHandle,
      ...s.type === void 0 ? {} : { type: s.type }
    })),
    presets: a.presets === void 0 ? [] : Ns(a.presets, i),
    segmentGroups: a.segmentGroups === void 0 ? [] : Ns(a.segmentGroups, i)
  };
}
function Ug(a, i) {
  return a.nodes.some((s) => s.id === i);
}
function Pi(a, i, s) {
  const o = i[s];
  return o !== void 0 && Ug(a, o) ? o : Ug(a, s) ? s : null;
}
function qE(a) {
  return encodeURIComponent(a);
}
function KE(a, i) {
  let s = a, o = 1;
  for (; i.has(s); )
    s = `${a}~${o}`, o += 1;
  return i.add(s), s;
}
function Vg(a, i, s, o) {
  return KE(
    `graph-copilot:${qE(a)}:${i}:${s}`,
    o
  );
}
function Wn(a, i) {
  return { code: "INVALID_OPERATION", operationIndex: a, message: i };
}
function Zn(a, i, s) {
  const o = a[i];
  return typeof o == "string" ? o : Wn(s, `${i} must be a string`);
}
function Fn(a) {
  return typeof a != "string";
}
function YE(a, i, s, o, c, d, f) {
  if (!Ra(i) || typeof i.op != "string")
    return Wn(s, "operation must be an object with an op string");
  switch (i.op) {
    case "add_node": {
      const y = Zn(i, "node_type", s);
      if (Fn(y)) return y;
      if (i.ref !== void 0 && typeof i.ref != "string")
        return Wn(s, "ref must be a string when provided");
      if (i.params !== void 0 && !Ra(i.params))
        return Wn(s, "params must be an object when provided");
      if (i.position !== void 0 && (!Ra(i.position) || typeof i.position.x != "number" || !Number.isFinite(i.position.x) || typeof i.position.y != "number" || !Number.isFinite(i.position.y)))
        return Wn(s, "position must contain finite x and y numbers");
      const p = Vg(o, "node", s, d), h = a.nodes.length, b = {
        x: 160 + h % 4 * 240,
        y: 120 + Math.floor(h / 4) * 160
      }, v = i.position;
      return a.nodes.push({
        id: p,
        type: y,
        position: v === void 0 ? b : { x: v.x, y: v.y },
        data: {
          params: i.params === void 0 ? {} : gd(i.params, f)
        }
      }), typeof i.ref == "string" && (c[i.ref] = p), null;
    }
    case "connect": {
      const y = Zn(i, "source", s), p = Zn(i, "target", s), h = Zn(i, "source_handle", s), b = Zn(i, "target_handle", s);
      if (Fn(y)) return y;
      if (Fn(p)) return p;
      if (Fn(h)) return h;
      if (Fn(b)) return b;
      const v = Pi(a, c, y), S = Pi(a, c, p);
      if (v === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: s,
          message: `connect: unknown source node '${y}'`
        };
      if (S === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: s,
          message: `connect: unknown target node '${p}'`
        };
      const A = h === "trigger", O = A ? "__trigger" : b;
      return a.edges.some((E) => E.source === v && E.target === S && E.sourceHandle === h && E.targetHandle === O) ? {
        code: "DUPLICATE_EDGE",
        operationIndex: s,
        message: "connect: edge already exists"
      } : (a.edges.push({
        id: Vg(o, "edge", s, d),
        source: v,
        target: S,
        sourceHandle: h,
        targetHandle: O,
        type: A ? "trigger" : "data"
      }), null);
    }
    case "set_params": {
      const y = Zn(i, "node_id", s);
      if (Fn(y)) return y;
      if (!Ra(i.params))
        return Wn(s, "params must be an object");
      const p = Pi(a, c, y);
      if (p === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: s,
          message: `set_params: unknown node '${y}'`
        };
      const h = a.nodes.find((v) => v.id === p), b = Ra(h.data.params) ? h.data.params : {};
      return h.data = {
        ...h.data,
        params: {
          ...b,
          ...gd(i.params, f)
        }
      }, null;
    }
    case "remove_node": {
      const y = Zn(i, "node_id", s);
      if (Fn(y)) return y;
      const p = Pi(a, c, y);
      return p === null ? {
        code: "UNKNOWN_NODE",
        operationIndex: s,
        message: `remove_node: unknown node '${y}'`
      } : (a.nodes = a.nodes.filter((h) => h.id !== p), a.edges = a.edges.filter((h) => h.source !== p && h.target !== p), null);
    }
    case "remove_edge": {
      const y = Zn(i, "source", s), p = Zn(i, "target", s);
      if (Fn(y)) return y;
      if (Fn(p)) return p;
      if (i.source_handle !== void 0 && typeof i.source_handle != "string")
        return Wn(s, "source_handle must be a string when provided");
      if (i.target_handle !== void 0 && typeof i.target_handle != "string")
        return Wn(s, "target_handle must be a string when provided");
      const h = Pi(a, c, y), b = Pi(a, c, p);
      if (h === null || b === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: s,
          message: "remove_edge: unknown source or target node"
        };
      const v = new Set(a.edges.filter((S) => S.source === h && S.target === b && (i.source_handle === void 0 || S.sourceHandle === i.source_handle) && (i.target_handle === void 0 || S.targetHandle === i.target_handle)).map((S) => S.id));
      return v.size === 0 ? {
        code: "UNKNOWN_EDGE",
        operationIndex: s,
        message: "remove_edge: no matching edge"
      } : (a.edges = a.edges.filter((S) => !v.has(S.id)), null);
    }
    case "clear_graph":
      a.nodes = [], a.edges = [];
      for (const y of Object.keys(c)) delete c[y];
      return null;
    case "auto_layout":
      return a.nodes.forEach((y, p) => {
        y.position = {
          x: 120 + p % 4 * 260,
          y: 100 + Math.floor(p / 4) * 180
        };
      }), null;
    default:
      return Wn(s, `unknown operation '${i.op}'`);
  }
}
function Bg(a, i, s) {
  return {
    status: "error",
    variantId: a,
    variantLabel: s,
    graph: null,
    refs: {},
    missingSecretRefs: [],
    errors: [i],
    fidelity: "portable-operation-replay",
    fidelityWarnings: [],
    sensitive: !1
  };
}
function XE(a, i, s = {}) {
  const o = a.payload.spec.variants.find((v) => v.id === i);
  if (o === void 0)
    return Bg(i, {
      code: "VARIANT_NOT_FOUND",
      message: `Unknown study variant '${i}'`
    });
  const c = {
    bindings: s,
    missing: /* @__PURE__ */ new Set(),
    resolved: /* @__PURE__ */ new Set()
  }, d = GE(a.payload.spec.baseline, c), f = {}, y = /* @__PURE__ */ new Set([
    ...d.nodes.map((v) => v.id),
    ...d.edges.map((v) => v.id)
  ]);
  for (let v = 0; v < o.operations.length; v += 1) {
    const S = YE(
      d,
      o.operations[v],
      v,
      o.id,
      f,
      y,
      c
    );
    if (S !== null) return Bg(i, S, o.label);
  }
  const p = [...c.missing].sort(), h = o.operations.some((v) => v.op === "add_node"), b = h ? [
    "Portable study v1 does not include node-definition defaults. Added nodes contain only parameters recorded in the operation, so defaults used by the original runtime may be missing.",
    "Generated node and edge ids are deterministic portable ids and may differ from ids used by the original experiment execution."
  ] : [];
  return {
    status: p.length === 0 ? "ready" : "blocked",
    variantId: i,
    variantLabel: o.label,
    graph: d,
    refs: { ...f },
    missingSecretRefs: p,
    errors: [],
    fidelity: h ? "approximate-node-defaults" : "portable-operation-replay",
    fidelityWarnings: b,
    sensitive: c.resolved.size > 0
  };
}
function yd(a) {
  return Wy(a) ? !0 : Array.isArray(a) ? a.some(yd) : Ra(a) && Object.values(a).some(yd);
}
function JE(a) {
  const i = {
    name: a.name,
    description: a.description,
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets,
    segmentGroups: a.segmentGroups
  };
  if (yd(i))
    throw new Error("Candidate graph still contains an unresolved SecretRef");
  return JSON.stringify(i, null, 2);
}
function Fu(a) {
  try {
    return Vy(a);
  } catch {
    return [];
  }
}
function QE(a) {
  const i = new Date(a);
  return Number.isNaN(i.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(i);
}
function er(a) {
  if (a === void 0 || !Number.isFinite(a)) return "—";
  const i = Math.abs(a);
  return i !== 0 && (i >= 1e5 || i < 1e-4) ? a.toExponential(3) : new Intl.NumberFormat(void 0, { maximumSignificantDigits: 6 }).format(a);
}
function kg(a) {
  return a === void 0 || !Number.isFinite(a) ? "—" : `${a > 0 ? "+" : ""}${er(a)}`;
}
function ZE(a) {
  return !Number.isFinite(a) || a < 0 ? "—" : a < 1e3 ? `${Math.round(a)} ms` : `${(a / 1e3).toFixed(a < 1e4 ? 1 : 0)} s`;
}
function FE(a) {
  return [...a.variants ?? []].sort((i, s) => i.mean === void 0 ? s.mean === void 0 ? 0 : 1 : s.mean === void 0 ? -1 : a.objective.direction === "maximize" ? s.mean - i.mean : i.mean - s.mean);
}
function Hg(a) {
  var s, o;
  const i = [];
  return a.variants.forEach((c) => {
    if (c.runs) {
      i.push(...c.runs.map((d) => ({
        variantId: c.id,
        variantLabel: c.label,
        repetition: d.repetition,
        status: d.status,
        metricKey: d.metricKey,
        metricValue: d.metricValue,
        runtimeMs: d.durationMs,
        error: d.error
      })));
      return;
    }
    i.push(...c.metricValues.map((d, f) => ({
      variantId: c.id,
      variantLabel: c.label,
      repetition: f + 1,
      status: "completed",
      metricKey: c.metricKey,
      metricValue: d
    })));
  }), {
    id: a.id,
    createdAt: a.createdAt,
    hypothesis: a.hypothesis,
    objective: a.objective,
    baselineVariantId: a.baselineVariantId,
    warnings: ((s = a.insights) == null ? void 0 : s.warnings) ?? [],
    paperLeads: ((o = a.insights) == null ? void 0 : o.paperIdeas) ?? [],
    runs: i
  };
}
function Wo(a, i, s) {
  const o = URL.createObjectURL(new Blob([s], { type: `${i};charset=utf-8` })), c = document.createElement("a");
  c.href = o, c.download = a, c.style.display = "none", document.body.appendChild(c), c.click(), c.remove(), URL.revokeObjectURL(o);
}
function es(a) {
  return a.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "graph-copilot-study";
}
function Wu({ status: a }) {
  return /* @__PURE__ */ g.jsx("span", { className: `gcp-lab-badge ${a}`, children: a });
}
function WE() {
  return /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-empty", children: [
    /* @__PURE__ */ g.jsx("div", { className: "gcp-lab-empty-mark", "aria-hidden": "true", children: /* @__PURE__ */ g.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", children: [
      /* @__PURE__ */ g.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ g.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" })
    ] }) }),
    /* @__PURE__ */ g.jsx("h2", { children: "No experiment studies yet" }),
    /* @__PURE__ */ g.jsx("p", { children: "Ask the agent to compare graph variants against a numeric objective. Completed studies, ranked candidates, and research leads will appear here." }),
    /* @__PURE__ */ g.jsx("div", { className: "gcp-lab-example", children: "“Compare three learning-rate variants, maximize validation accuracy, and run each three times.”" })
  ] });
}
function PE({ api: a }) {
  var ce, X, Q, oe, fe, ae, ve, M, J;
  const [i, s] = P.useState(() => Fu(a)), [o, c] = P.useState(() => {
    var T;
    return ((T = Fu(a)[0]) == null ? void 0 : T.id) ?? null;
  }), [d, f] = P.useState(null), [y, p] = P.useState(!1), [h, b] = P.useState(null), [v, S] = P.useState(null), [A, O] = P.useState(null), [E, L] = P.useState(!1), R = P.useRef(null);
  P.useEffect(() => {
    const T = () => {
      const ie = Fu(a);
      s(ie), c((ee) => {
        var x;
        return ee && ie.some((U) => U.id === ee) ? ee : ((x = ie[0]) == null ? void 0 : x.id) ?? null;
      });
    };
    return window.addEventListener(cd, T), () => window.removeEventListener(cd, T);
  }, [a]);
  const j = i.find((T) => T.id === o) ?? i[0], q = j && (d == null ? void 0 : d.payload.id) === j.id ? d : null, Z = P.useMemo(() => j ? FE(j) : [], [j]);
  P.useEffect(() => {
    let T = !0;
    return f(null), p(!1), j ? R_(a).entries.some((ee) => ee.id === j.id) ? (p(!0), dg(a, j.id).then((ee) => {
      T && f(ee);
    }).catch((ee) => {
      T && b(`Portable study could not be verified: ${String(ee)}`);
    }).finally(() => {
      T && p(!1);
    }), () => {
      T = !1;
    }) : () => {
      T = !1;
    } : () => {
      T = !1;
    };
  }, [a, j == null ? void 0 : j.id]);
  const Y = async (T) => {
    var ee;
    const ie = (ee = T.currentTarget.files) == null ? void 0 : ee[0];
    if (T.currentTarget.value = "", !!ie) {
      O(null), b(null);
      try {
        if (typeof ie.size == "number" && ie.size > fl)
          throw new Error(`Portable study exceeds the ${fl} byte import limit`);
        const x = await D_(await ie.text());
        S(x);
      } catch (x) {
        S(null), O(`Import rejected before storage: ${String(x)}`);
      }
    }
  }, K = async () => {
    if (!v) return;
    L(!0), O(null);
    let T = !1;
    try {
      if (Vy(a).some((x) => x.id === v.payload.id))
        throw new Error(
          `A local Experiment Lab report already uses study id '${v.payload.id}'; import was refused to avoid overwriting local evidence.`
        );
      const ie = HE(v), ee = await Oy(a, v);
      T = !0, await By(a, ie, { rejectIfExists: !0 }), c(ie.id), f(v), S(null), b(ee.status === "unchanged" ? "This content-integrity-checked portable study was already stored; its read-only report was added." : "Portable study imported for read-only review. SHA-256 checks content changes only; it does not authenticate authorship. No graph was executed or applied.");
    } catch (ie) {
      O(T ? `The content-integrity-checked bundle was stored, but its read-only Lab report could not be saved. Retry the import: ${String(ie)}` : `Portable study was not imported: ${String(ie)}`);
    } finally {
      L(!1);
    }
  }, V = async () => {
    if (j)
      try {
        const T = q ?? await dg(a, j.id);
        f(T), Wo(
          `${es(j.id)}-portable-study.json`,
          "application/json",
          await Md(T)
        ), b("Portable study content integrity checked before export; SHA-256 does not authenticate authorship.");
      } catch (T) {
        b(`Portable study export failed: ${String(T)}`);
      }
  }, de = (T, ie) => {
    var ee;
    if (q)
      try {
        const x = XE(q, T);
        if (x.status === "error" || !x.graph)
          throw new Error(((ee = x.errors[0]) == null ? void 0 : ee.message) ?? "Candidate could not be reconstructed");
        Wo(
          `${es(q.payload.id)}-${es(ie)}-graph.json`,
          "application/json",
          JE(x.graph)
        );
        const U = x.status === "blocked" ? `Candidate graph downloaded with ${x.missingSecretRefs.length} unresolved secret value(s) left blank.` : "Candidate graph materialized from the content-integrity-checked portable operation record and downloaded.";
        b(x.fidelityWarnings.length === 0 ? U : `${U} Fidelity warning: ${x.fidelityWarnings.join(" ")}`);
      } catch (x) {
        b(`Candidate graph export failed: ${String(x)}`);
      }
  };
  return /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab", "aria-labelledby": "gcp-lab-title", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-heading", children: [
      /* @__PURE__ */ g.jsxs("div", { children: [
        /* @__PURE__ */ g.jsx("span", { className: "gcp-eyebrow", children: "Autonomous evaluation" }),
        /* @__PURE__ */ g.jsx("h1", { id: "gcp-lab-title", children: "Experiment Lab" }),
        /* @__PURE__ */ g.jsx("p", { children: "Compare isolated graph candidates and turn results into defensible research directions." })
      ] }),
      /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-heading-actions", children: [
        /* @__PURE__ */ g.jsxs("span", { className: "gcp-lab-count", "aria-label": `${i.length} experiment studies`, children: [
          i.length,
          " ",
          i.length === 1 ? "study" : "studies"
        ] }),
        /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => {
          var T;
          return (T = R.current) == null ? void 0 : T.click();
        }, children: "Import portable study" }),
        /* @__PURE__ */ g.jsx(
          "input",
          {
            ref: R,
            type: "file",
            accept: "application/json,.json",
            "aria-label": "Choose portable study file",
            hidden: !0,
            onChange: (T) => {
              Y(T);
            }
          }
        )
      ] })
    ] }),
    A && !v && /* @__PURE__ */ g.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: A }),
    h && /* @__PURE__ */ g.jsx("p", { className: "gcp-lab-portable-message", role: "status", children: h }),
    i.length === 0 || !j ? /* @__PURE__ */ g.jsx(WE, {}) : /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-layout", children: [
      /* @__PURE__ */ g.jsx("aside", { className: "gcp-lab-studies", "aria-label": "Experiment studies", children: i.map((T) => {
        var ie, ee, x;
        return /* @__PURE__ */ g.jsxs(
          "button",
          {
            className: `gcp-study-card${T.id === j.id ? " active" : ""}`,
            onClick: () => {
              b(null), c(T.id);
            },
            "aria-pressed": T.id === j.id,
            children: [
              /* @__PURE__ */ g.jsxs("span", { className: "gcp-study-card-top", children: [
                /* @__PURE__ */ g.jsx(Wu, { status: T.status }),
                /* @__PURE__ */ g.jsx("time", { dateTime: T.createdAt, children: QE(T.createdAt) })
              ] }),
              /* @__PURE__ */ g.jsx("strong", { children: T.hypothesis || "Untitled study" }),
              /* @__PURE__ */ g.jsxs("span", { className: "gcp-study-card-meta", children: [
                ((ie = T.objective) == null ? void 0 : ie.direction) === "minimize" ? "↓" : "↑",
                " ",
                ((ee = T.objective) == null ? void 0 : ee.metric) || "metric",
                /* @__PURE__ */ g.jsx("span", { "aria-hidden": "true", children: " · " }),
                ((x = T.variants) == null ? void 0 : x.length) ?? 0,
                " candidates"
              ] })
            ]
          },
          T.id
        );
      }) }),
      /* @__PURE__ */ g.jsxs("article", { className: "gcp-lab-report", "aria-label": `Experiment report: ${j.hypothesis}`, children: [
        /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-report-head", children: [
          /* @__PURE__ */ g.jsxs("div", { children: [
            /* @__PURE__ */ g.jsx("span", { className: "gcp-eyebrow", children: "Study hypothesis" }),
            /* @__PURE__ */ g.jsx("h2", { children: j.hypothesis })
          ] }),
          /* @__PURE__ */ g.jsx(Wu, { status: j.status })
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-export-actions", "aria-label": "Export study evidence", children: [
          /* @__PURE__ */ g.jsx(
            "button",
            {
              type: "button",
              onClick: () => Wo(
                `${es(j.id)}-runs.csv`,
                "text/csv",
                vS(Hg(j))
              ),
              children: "Export runs CSV"
            }
          ),
          /* @__PURE__ */ g.jsx(
            "button",
            {
              type: "button",
              onClick: () => Wo(
                `${es(j.id)}-research.md`,
                "text/markdown",
                SS(Hg(j))
              ),
              children: "Export research brief"
            }
          ),
          /* @__PURE__ */ g.jsx(
            "button",
            {
              type: "button",
              disabled: !q || y,
              title: q ? "Export the SHA-256 content-integrity-checked baseline, variants, provenance, and run records" : "No portable bundle is available for this legacy summary",
              onClick: () => {
                V();
              },
              children: y ? "Verifying portable study…" : "Export portable study"
            }
          )
        ] }),
        q && /* @__PURE__ */ g.jsxs("p", { className: "gcp-lab-integrity", children: [
          "Content integrity checked · SHA-256 ",
          q.integrity.contentSha256.slice(0, 12),
          "… · authorship unverified"
        ] }),
        /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-summary-grid", children: [
          /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-summary-card", "aria-labelledby": "gcp-study-objective", children: [
            /* @__PURE__ */ g.jsx("span", { className: "gcp-lab-card-icon objective", "aria-hidden": "true", children: "◎" }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("h3", { id: "gcp-study-objective", children: "Study objective" }),
              /* @__PURE__ */ g.jsxs("strong", { children: [
                j.objective.direction === "maximize" ? "Maximize" : "Minimize",
                " ",
                j.objective.metric
              ] }),
              /* @__PURE__ */ g.jsxs("span", { children: [
                j.repetitions,
                " ",
                j.repetitions === 1 ? "run" : "runs",
                " per candidate"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-summary-card winner", "aria-labelledby": "gcp-study-winner", children: [
            /* @__PURE__ */ g.jsx("span", { className: "gcp-lab-card-icon winner", "aria-hidden": "true", children: "★" }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("h3", { id: "gcp-study-winner", children: "Winning candidate" }),
              /* @__PURE__ */ g.jsx("strong", { children: j.winnerLabel ?? "No winner resolved" }),
              /* @__PURE__ */ g.jsx("span", { children: j.winnerId ? `${er((ce = j.variants.find((T) => T.id === j.winnerId)) == null ? void 0 : ce.mean)} mean score` : "Check warnings for missing evidence" })
            ] })
          ] })
        ] }),
        j.search && /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-search-plan", "aria-label": "Deterministic parameter search plan", children: [
          /* @__PURE__ */ g.jsx("span", { className: "gcp-eyebrow", children: "Reproducible planner" }),
          /* @__PURE__ */ g.jsx("strong", { children: j.search.strategy === "grid" ? "Complete grid" : "Seeded random" }),
          /* @__PURE__ */ g.jsxs("span", { children: [
            j.search.generatedCandidateCount,
            " generated candidates · ",
            " ",
            j.search.totalDomainAssignments,
            " domain assignments · ",
            " ",
            j.search.totalExecutionCount,
            " executions",
            j.search.plannerSeed === void 0 ? "" : ` · planner seed ${j.search.plannerSeed} (${j.search.prngVersion})`
          ] }),
          /* @__PURE__ */ g.jsx("small", { children: j.search.seedDescription })
        ] }),
        ((Q = (X = j.insights) == null ? void 0 : X.summary) == null ? void 0 : Q.length) > 0 && /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-findings", children: [
          /* @__PURE__ */ g.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ g.jsx("h3", { id: "gcp-study-findings", children: "Key findings" }) }),
          /* @__PURE__ */ g.jsx("ul", { className: "gcp-lab-findings", children: j.insights.summary.map((T, ie) => /* @__PURE__ */ g.jsx("li", { children: T }, `${ie}-${T}`)) })
        ] }),
        /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-candidate-leaderboard", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ g.jsx("h3", { id: "gcp-candidate-leaderboard", children: "Candidate leaderboard" }),
            /* @__PURE__ */ g.jsx("span", { children: j.objective.direction === "maximize" ? "Higher is better" : "Lower is better" })
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "gcp-leaderboard-wrap", children: /* @__PURE__ */ g.jsxs("table", { className: "gcp-leaderboard", children: [
            /* @__PURE__ */ g.jsx("thead", { children: /* @__PURE__ */ g.jsxs("tr", { children: [
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Rank" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Candidate" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Mean" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Variation" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Runs" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Runtime" }),
              /* @__PURE__ */ g.jsx("th", { scope: "col", children: "Graph" })
            ] }) }),
            /* @__PURE__ */ g.jsx("tbody", { children: Z.map((T, ie) => {
              var x, U;
              const ee = T.id === j.winnerId;
              return /* @__PURE__ */ g.jsxs("tr", { className: ee ? "winner" : void 0, children: [
                /* @__PURE__ */ g.jsx("td", { children: /* @__PURE__ */ g.jsx("span", { className: "gcp-rank", children: T.mean === void 0 ? "—" : ie + 1 }) }),
                /* @__PURE__ */ g.jsxs("td", { children: [
                  /* @__PURE__ */ g.jsxs("span", { className: "gcp-candidate-name", children: [
                    /* @__PURE__ */ g.jsx("strong", { children: T.label }),
                    ee && /* @__PURE__ */ g.jsx("span", { className: "gcp-winner-tag", children: "Winner" }),
                    T.status !== "completed" && /* @__PURE__ */ g.jsx(Wu, { status: T.status })
                  ] }),
                  T.operationSummary && T.operationSummary.length > 0 && /* @__PURE__ */ g.jsx("span", { className: "gcp-candidate-operations", children: T.operationSummary.join(" · ") }),
                  ((x = T.errors) == null ? void 0 : x.length) > 0 && /* @__PURE__ */ g.jsx("span", { className: "gcp-candidate-error", children: T.errors[0] })
                ] }),
                /* @__PURE__ */ g.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ g.jsx("span", { children: er(T.mean) }),
                  T.baselineComparison && /* @__PURE__ */ g.jsxs("small", { className: "gcp-metric-detail", children: [
                    "improvement ",
                    kg(T.baselineComparison.objectiveImprovement),
                    T.baselineComparison.hedgesG === void 0 ? "" : ` · g ${kg(T.baselineComparison.hedgesG)}`
                  ] })
                ] }),
                /* @__PURE__ */ g.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ g.jsx("span", { children: T.stddev === void 0 ? "—" : `± ${er(T.stddev)}` }),
                  T.confidenceInterval95 && /* @__PURE__ */ g.jsxs("small", { className: "gcp-metric-detail", children: [
                    "95% CI [",
                    er(T.confidenceInterval95.lower),
                    ", ",
                    er(T.confidenceInterval95.upper),
                    "]"
                  ] })
                ] }),
                /* @__PURE__ */ g.jsx("td", { children: ((U = T.metricValues) == null ? void 0 : U.length) ?? 0 }),
                /* @__PURE__ */ g.jsx("td", { children: ZE(T.runtimeMs) }),
                /* @__PURE__ */ g.jsx("td", { children: /* @__PURE__ */ g.jsx(
                  "button",
                  {
                    type: "button",
                    className: "gcp-candidate-download",
                    disabled: !q,
                    title: q ? "Materialize a graph JSON without changing the canvas; recorded fidelity warnings will be shown" : "This legacy summary has no portable candidate specification",
                    onClick: () => de(T.id, T.label),
                    children: "Download"
                  }
                ) })
              ] }, T.id);
            }) })
          ] }) })
        ] }),
        (((fe = (oe = j.insights) == null ? void 0 : oe.warnings) == null ? void 0 : fe.length) > 0 || j.applyConflict) && /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-warnings", children: [
          /* @__PURE__ */ g.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ g.jsx("h3", { id: "gcp-study-warnings", children: "Evidence warnings" }) }),
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-warnings", children: [
            j.applyConflict && /* @__PURE__ */ g.jsx("p", { role: "alert", children: j.applyConflict }),
            (ve = (ae = j.insights) == null ? void 0 : ae.warnings) == null ? void 0 : ve.map((T, ie) => /* @__PURE__ */ g.jsx("p", { role: "alert", children: T }, `${ie}-${T}`))
          ] })
        ] }),
        ((J = (M = j.insights) == null ? void 0 : M.paperIdeas) == null ? void 0 : J.length) > 0 && /* @__PURE__ */ g.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-paper-ideas", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ g.jsx("h3", { id: "gcp-paper-ideas", children: "Paper ideas" }),
            /* @__PURE__ */ g.jsx("span", { children: "Research leads, not final claims" })
          ] }),
          /* @__PURE__ */ g.jsx("div", { className: "gcp-paper-grid", children: j.insights.paperIdeas.map((T, ie) => /* @__PURE__ */ g.jsxs("article", { className: "gcp-paper-card", children: [
            /* @__PURE__ */ g.jsxs("span", { className: "gcp-paper-index", children: [
              "0",
              ie + 1
            ] }),
            /* @__PURE__ */ g.jsx("h4", { children: T.title }),
            /* @__PURE__ */ g.jsxs("dl", { children: [
              /* @__PURE__ */ g.jsxs("div", { children: [
                /* @__PURE__ */ g.jsx("dt", { children: "Evidence" }),
                /* @__PURE__ */ g.jsx("dd", { children: T.evidence })
              ] }),
              /* @__PURE__ */ g.jsxs("div", { children: [
                /* @__PURE__ */ g.jsx("dt", { children: "Next step" }),
                /* @__PURE__ */ g.jsx("dd", { children: T.nextStep })
              ] })
            ] })
          ] }, `${ie}-${T.title}`)) })
        ] })
      ] })
    ] }),
    v && /* @__PURE__ */ g.jsx("div", { className: "gcp-study-import-backdrop", children: /* @__PURE__ */ g.jsxs(
      "section",
      {
        className: "gcp-study-import-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gcp-study-import-title",
        children: [
          /* @__PURE__ */ g.jsx("span", { className: "gcp-eyebrow", children: "Content-integrity check passed · authorship unverified" }),
          /* @__PURE__ */ g.jsx("h2", { id: "gcp-study-import-title", children: "Import portable study?" }),
          /* @__PURE__ */ g.jsx("p", { children: v.payload.spec.hypothesis }),
          /* @__PURE__ */ g.jsxs("dl", { children: [
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("dt", { children: "Study ID" }),
              /* @__PURE__ */ g.jsx("dd", { children: v.payload.id })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("dt", { children: "Candidates" }),
              /* @__PURE__ */ g.jsx("dd", { children: v.payload.spec.variants.length })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("dt", { children: "Run records" }),
              /* @__PURE__ */ g.jsx("dd", { children: v.payload.runs.length })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("dt", { children: "Secrets required" }),
              /* @__PURE__ */ g.jsx("dd", { children: v.payload.redactionReport.secretRequirements.length })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { children: [
              /* @__PURE__ */ g.jsx("dt", { children: "SHA-256" }),
              /* @__PURE__ */ g.jsx("dd", { children: /* @__PURE__ */ g.jsx("code", { children: v.integrity.contentSha256 }) })
            ] })
          ] }),
          /* @__PURE__ */ g.jsx("p", { className: "gcp-study-import-safety", children: "SHA-256 detects content changes only; it does not authenticate the author or evidence source. Import stores the bundle for read-only review and does not execute, replay, apply, or open any graph." }),
          A && /* @__PURE__ */ g.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: A }),
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-study-import-actions", children: [
            /* @__PURE__ */ g.jsx("button", { type: "button", onClick: () => S(null), disabled: E, children: "Cancel" }),
            /* @__PURE__ */ g.jsx("button", { type: "button", className: "primary", onClick: () => {
              K();
            }, disabled: E, children: E ? "Importing…" : "Import read-only" })
          ] })
        ]
      }
    ) })
  ] });
}
function ex(a) {
  const i = Date.now() - a, s = Math.floor(i / 1e3);
  if (s < 60) return "just now";
  const o = Math.floor(s / 60);
  if (o < 60) return `${o}m ago`;
  const c = Math.floor(o / 60);
  if (c < 24) return `${c}h ago`;
  const d = Math.floor(c / 24);
  return d < 7 ? `${d}d ago` : `${Math.floor(d / 7)}w ago`;
}
function tx({ api: a, activeId: i, onResume: s, onNew: o }) {
  const [c, d] = P.useState(
    () => td(a)
  ), [f, y] = P.useState(null), p = (b, v) => {
    b.stopPropagation(), f === v ? (I0(a, v), d(td(a)), f === v && y(null)) : y(v);
  }, h = () => {
    y(null);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ g.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ g.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: o,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    c.length === 0 ? /* @__PURE__ */ g.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ g.jsx("div", { className: "gcp-history-list", onClick: h, children: c.map((b) => /* @__PURE__ */ g.jsxs(
      "div",
      {
        className: `gcp-history-item${b.id === i ? " active" : ""}`,
        onClick: () => s(b),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${b.title || "(untitled)"}`,
        onKeyDown: (v) => {
          (v.key === "Enter" || v.key === " ") && (v.preventDefault(), s(b));
        },
        children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ g.jsx("div", { className: "gcp-history-title", children: b.title || "(untitled)" }),
            /* @__PURE__ */ g.jsxs("div", { className: "gcp-history-meta", children: [
              ex(b.updatedAt),
              " · ",
              b.provider,
              "/",
              b.model || "—",
              b.reasoningEffort ? ` · ${b.reasoningEffort} effort` : ""
            ] })
          ] }),
          /* @__PURE__ */ g.jsx(
            "button",
            {
              className: `gcp-history-delete${f === b.id ? " confirm" : ""}`,
              onClick: (v) => p(v, b.id),
              "aria-label": f === b.id ? `Confirm delete "${b.title || "untitled"}"` : `Delete "${b.title || "untitled"}"`,
              title: f === b.id ? "Click again to confirm" : "Delete",
              children: "✕"
            }
          )
        ]
      },
      b.id
    )) })
  ] });
}
let ws = 0, vd = 0, ss = null;
function ts() {
  return ws += 1, vd += 1, ss = null, ws;
}
function Po(a) {
  return a === ws;
}
async function bd(a) {
  const i = ws;
  let s = ss;
  (s === null || s.generation !== i) && (s = {
    generation: i,
    sequence: ++vd,
    promise: Promise.resolve().then(a)
  }, ss = s);
  try {
    const o = await s.promise;
    return s.generation === ws && s.sequence === vd ? o : null;
  } finally {
    ss === s && (ss = null);
  }
}
const Ig = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, nx = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], ax = 2e3, ix = 300 * 1e3, ns = {
  reasoningEffort: !1,
  richModelCatalog: !1
};
function rx({
  value: a,
  onBlur: i,
  placeholder: s,
  "aria-label": o
}) {
  const [c, d] = P.useState(!1), [f, y] = P.useState(a);
  return P.useEffect(() => {
    y(a);
  }, [a]), /* @__PURE__ */ g.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ g.jsx(
      "input",
      {
        type: c ? "text" : "password",
        className: "gcp-input",
        value: f,
        onChange: (p) => y(p.target.value),
        onBlur: () => i(f),
        placeholder: s ?? "API key",
        "aria-label": o,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ g.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => d((p) => !p),
        "aria-label": c ? "Hide key" : "Show key",
        title: c ? "Hide" : "Show",
        children: c ? "Hide" : "Show"
      }
    )
  ] });
}
function sx({
  api: a,
  settings: i,
  codexLoggedIn: s,
  codexEmail: o,
  onCodexStatusChange: c,
  onChange: d
}) {
  var vn, cn, aa;
  const f = i.provider, y = f === "openai" ? i.apiKeys.openai : f === "openrouter" ? i.apiKeys.openrouter : f === "anthropic" ? i.apiKeys.anthropic : f === "custom" ? i.apiKeys.custom : void 0, p = f === "custom" ? i.customBaseUrl : void 0, h = el(
    f,
    f === "openai-codex" ? o ?? (s ? "active-codex-session" : "") : y,
    p
  ), [b, v] = P.useState({ provider: f, identity: h, models: [] }), [S, A] = P.useState(!1), [O, E] = P.useState(null), L = P.useRef(0), R = P.useRef(i), j = P.useRef(d), q = P.useRef(c), Z = P.useRef(s), Y = P.useRef(o), K = P.useRef(s), [V, de] = P.useState(null), [ce, X] = P.useState(!1), Q = P.useRef(null), oe = P.useRef(0);
  R.current = i, j.current = d, q.current = c, Z.current = s, Y.current = o;
  const fe = i.models[f] ?? "", ae = Yg(
    f,
    b.provider === f && b.identity === h ? b.models : [],
    fe
  ), ve = sl(f, fe, ae), J = ((cn = (vn = i.providerCapabilities) == null ? void 0 : vn[f]) == null ? void 0 : cn.reasoningEffort) === !0 ? (ve == null ? void 0 : ve.reasoningEfforts) ?? [] : [];
  P.useEffect(() => () => {
    Q.current !== null && (clearInterval(Q.current), Q.current = null);
  }, []), P.useEffect(() => {
    let te = !0;
    return f === "openai-codex" && bd(() => nd(a)).then((ge) => {
      if (te && ge !== null) {
        const Ke = ge.status === "logged_in", rt = Ke ? ge.email ?? null : null;
        (Ke !== Z.current || rt !== Y.current) && (as("openai-codex"), W("openai-codex", [], ns)), q.current(Ke, rt);
      }
    }).catch(() => {
    }), () => {
      te = !1;
    };
  }, [a, f]), P.useEffect(() => {
    K.current && !s && as("openai-codex"), K.current = s;
  }, [s]);
  function T(te) {
    const ge = { ...R.current, ...te };
    R.current = ge, j.current(ge);
  }
  function ie(te) {
    var Pe, fi;
    const ge = R.current, Ke = { ...ge.reasoningEfforts }, rt = Ke[f], At = sl(f, te, ae), Et = !!((Pe = At == null ? void 0 : At.reasoningEfforts) != null && Pe.some(
      (ia) => ia.effort === rt
    ));
    rt && (At != null && At.reasoningEfforts) && !Et && delete Ke[f];
    const Tt = (fi = ge.providerCapabilities) == null ? void 0 : fi[f], un = Tt ? {
      reasoningEffort: Tt.reasoningEffort,
      richModelCatalog: Tt.richModelCatalog,
      ...rt && Et ? { reasoningModel: te } : {}
    } : void 0;
    T({
      models: { ...ge.models, [f]: te },
      reasoningEfforts: Ke,
      ...un ? {
        providerCapabilities: {
          ...ge.providerCapabilities,
          [f]: un
        }
      } : {}
    });
  }
  function ee(te) {
    const ge = Zg(
      R.current,
      f,
      te
    );
    R.current = ge, j.current(ge);
  }
  function x(te, ge) {
    const Ke = R.current, rt = { ...Ke.providerCapabilities };
    delete rt[te], T({
      apiKeys: { ...Ke.apiKeys, [te]: ge },
      providerCapabilities: rt
    });
  }
  function U(te) {
    return te === "openai" ? R.current.apiKeys.openai : te === "openrouter" ? R.current.apiKeys.openrouter : te === "anthropic" ? R.current.apiKeys.anthropic : te === "custom" ? R.current.apiKeys.custom : void 0;
  }
  function F(te) {
    return el(
      te,
      te === "openai-codex" ? Y.current ?? (Z.current ? "active-codex-session" : "") : U(te),
      te === "custom" ? R.current.customBaseUrl : void 0
    );
  }
  function W(te, ge, Ke, rt) {
    const At = R.current, Et = ed(
      At,
      te,
      ge,
      Ke,
      rt
    );
    Et !== At && (R.current = Et, j.current(Et));
  }
  async function se(te, ge = f) {
    const Ke = U(ge), rt = ge === "custom" ? R.current.customBaseUrl : void 0, At = ge === "openai-codex" ? Z.current : ge === "custom" ? !!rt : !!Ke, Et = F(ge), Tt = ++L.current;
    if (!At) {
      A(!1), E(null), v({ provider: ge, identity: Et, models: [] }), W(ge, [], ns);
      return;
    }
    const un = Et;
    if (!te) {
      const Pe = Xg(un);
      if (Pe) {
        if (L.current !== Tt) return;
        v({ provider: ge, identity: Et, models: Pe.models }), W(
          ge,
          Pe.models,
          Pe.capabilities,
          Pe.source
        ), E(null), A(!1);
        return;
      }
    }
    A(!0), E(null);
    try {
      const Pe = await ay(
        a,
        ge,
        Ke,
        rt
      );
      if (L.current !== Tt) return;
      Jg(un, Pe), v({ provider: ge, identity: Et, models: Pe.models }), W(
        ge,
        Pe.models,
        Pe.capabilities,
        Pe.source
      );
    } catch (Pe) {
      if (L.current !== Tt) return;
      E(String(Pe));
    } finally {
      L.current === Tt && A(!1);
    }
  }
  P.useEffect(() => {
    if (++L.current, A(!1), E(null), v(
      (te) => te.provider === f && te.identity === h ? te : { provider: f, identity: h, models: [] }
    ), f === "custom") {
      W(f, [], ns);
      return;
    }
    return se(!1, f), () => {
      ++L.current;
    };
  }, [a, f, y, p, s, o]);
  function pe() {
    se(!0);
  }
  async function ue() {
    const te = ts();
    try {
      const ge = await tS(a);
      if (!Po(te)) return;
      window.open(ge, "_blank"), X(!0), oe.current = Date.now(), Q.current = setInterval(async () => {
        try {
          const Ke = await bd(() => nd(a));
          Ke !== null && Po(te) && Ke.status === "logged_in" && (ts(), as("openai-codex"), W("openai-codex", [], ns), q.current(!0, Ke.email ?? null), X(!1), Q.current !== null && (clearInterval(Q.current), Q.current = null));
        } catch {
        }
        if (Date.now() - oe.current > ix) {
          if (!Po(te)) return;
          ts(), X(!1), Q.current !== null && (clearInterval(Q.current), Q.current = null);
        }
      }, ax);
    } catch (ge) {
      de(String(ge));
    }
  }
  async function We() {
    const te = ts();
    X(!1), Q.current !== null && (clearInterval(Q.current), Q.current = null);
    try {
      if (await nS(a), !Po(te)) return;
      ts(), as("openai-codex"), ++L.current, v({
        provider: "openai-codex",
        identity: el("openai-codex"),
        models: []
      }), E(null), W("openai-codex", [], ns), q.current(!1, null);
    } catch (ge) {
      de(String(ge));
    }
  }
  const we = "gcp-model-datalist";
  return /* @__PURE__ */ g.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ g.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ g.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: f,
          onChange: (te) => T({ provider: te.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(Ig).map((te) => /* @__PURE__ */ g.jsx("option", { value: te, children: Ig[te] }, te))
        }
      )
    ] }),
    /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ g.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ g.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ g.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: we,
            value: i.models[f] ?? "",
            onChange: (te) => ie(te.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ g.jsx("datalist", { id: we, children: ae.map((te) => /* @__PURE__ */ g.jsx("option", { value: te.id, label: te.label }, te.id)) }),
        /* @__PURE__ */ g.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: pe,
            disabled: S,
            "aria-label": "Load available models from provider",
            title: "Refresh model list",
            children: S ? "Refreshing..." : "Refresh"
          }
        )
      ] }),
      O && /* @__PURE__ */ g.jsx("span", { className: "gcp-field-hint error", role: "alert", children: O })
    ] }),
    J.length > 0 && /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ g.jsx("label", { className: "gcp-label", htmlFor: "gcp-reasoning-effort", children: "Reasoning effort" }),
      /* @__PURE__ */ g.jsxs(
        "select",
        {
          id: "gcp-reasoning-effort",
          className: "gcp-select",
          value: ((aa = i.reasoningEfforts) == null ? void 0 : aa[f]) ?? "",
          onChange: (te) => ee(te.target.value),
          "aria-label": "Reasoning effort",
          children: [
            /* @__PURE__ */ g.jsxs("option", { value: "", children: [
              "Model default",
              ve != null && ve.defaultReasoningEffort ? ` (${ve.defaultReasoningEffort})` : ""
            ] }),
            J.map((te) => /* @__PURE__ */ g.jsx(
              "option",
              {
                value: te.effort,
                title: te.description,
                children: te.effort
              },
              te.effort
            ))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ g.jsx("div", { className: "gcp-field", children: /* @__PURE__ */ g.jsxs("label", { children: [
      /* @__PURE__ */ g.jsx(
        "input",
        {
          type: "checkbox",
          checked: i.notifyOnRunCompletion !== !1,
          onChange: (te) => d({ ...i, notifyOnRunCompletion: te.target.checked }),
          "aria-label": "Notify when a graph run finishes while this tab is in the background"
        }
      ),
      "Notify when a graph run finishes while this tab is in the background"
    ] }) }),
    f !== "openai-codex" && nx.filter((te) => te === f || f === "custom" && te === "custom").map(
      (te) => te === f ? /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ g.jsx("label", { className: "gcp-label", children: te === "openai" ? "OpenAI API Key" : te === "anthropic" ? "Anthropic API Key" : te === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ g.jsx(
          rx,
          {
            value: i.apiKeys[te] ?? "",
            onBlur: (ge) => x(te, ge),
            placeholder: te === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": te === "openai" ? "OpenAI API key" : te === "anthropic" ? "Anthropic API key" : te === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, te) : null
    ),
    f === "custom" && /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ g.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ g.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: i.customBaseUrl,
          onChange: (te) => T({ customBaseUrl: te.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    f === "openai-codex" && /* @__PURE__ */ g.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ g.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ g.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ g.jsx(
          "div",
          {
            className: `gcp-codex-status${s ? " signed-in" : ce ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: s ? `Signed in${o ? ` as ${o}` : ""}` : ce ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ g.jsxs("div", { className: "gcp-codex-btns", children: [
          !s && /* @__PURE__ */ g.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: ue,
              disabled: ce,
              "aria-label": "Sign in with ChatGPT Codex",
              children: ce ? "Waiting..." : "Sign in"
            }
          ),
          s && /* @__PURE__ */ g.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: We,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        V && /* @__PURE__ */ g.jsx("span", { className: "gcp-field-hint error", role: "alert", children: V })
      ] })
    ] }),
    /* @__PURE__ */ g.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function ox() {
  return /* @__PURE__ */ g.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M20 15a3 3 0 0 1-3 3H8l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function lx() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ g.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function cx() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ g.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ux() {
  return /* @__PURE__ */ g.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ g.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ g.jsx("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function dx({ expanded: a }) {
  return a ? /* @__PURE__ */ g.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ g.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function fx() {
  return /* @__PURE__ */ g.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ g.jsx("path", { d: "m6 6 12 12M18 6 6 18", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }) });
}
function Gg(a) {
  var i, s;
  try {
    const o = (s = (i = a.graph) == null ? void 0 : i.getGraph) == null ? void 0 : s.call(i);
    return o ? {
      nodes: Array.isArray(o.nodes) ? o.nodes.length : 0,
      edges: Array.isArray(o.edges) ? o.edges.length : 0,
      available: !0
    } : { nodes: 0, edges: 0, available: !1 };
  } catch {
    return { nodes: 0, edges: 0, available: !1 };
  }
}
function px({
  api: a,
  settings: i,
  codexLoggedIn: s,
  codexEmail: o,
  conversation: c,
  onConversationChange: d,
  onSettingsChange: f,
  onCodexStatusChange: y,
  onNewConversation: p,
  onResumeConversation: h,
  onClose: b
}) {
  const [v, S] = P.useState("chat"), [A, O] = P.useState("compact"), [E, L] = P.useState(() => Gg(a));
  P.useEffect(() => {
    var de, ce;
    const V = () => L(Gg(a));
    V();
    try {
      return (ce = (de = a.graph) == null ? void 0 : de.onGraphChanged) == null ? void 0 : ce.call(de, V);
    } catch {
      return;
    }
  }, [a]);
  const R = (V) => {
    h(V), S("chat");
  }, j = () => {
    p(), S("chat");
  }, q = (V) => {
    S((de) => de === V && V !== "chat" ? "chat" : V);
  }, Z = i.models[i.provider] ?? "", Y = Number.isFinite(a.apiVersion) ? `API v${a.apiVersion}` : "API legacy", K = [
    { id: "chat", label: "Chat", ariaLabel: "Agent chat", icon: /* @__PURE__ */ g.jsx(ox, {}) },
    { id: "experiments", label: "Lab", ariaLabel: "Experiments lab", icon: /* @__PURE__ */ g.jsx(lx, {}) },
    { id: "history", label: "History", ariaLabel: "Conversation history", icon: /* @__PURE__ */ g.jsx(cx, {}) },
    { id: "settings", label: "Settings", ariaLabel: "Settings", icon: /* @__PURE__ */ g.jsx(ux, {}) }
  ];
  return /* @__PURE__ */ g.jsxs(
    "div",
    {
      className: `gcp-window gcp-window--${A}`,
      role: "dialog",
      "aria-label": "Graph Copilot agent workbench",
      "data-panel-mode": A,
      children: [
        /* @__PURE__ */ g.jsxs("header", { className: "gcp-workbench-header", children: [
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-header-main", children: [
            /* @__PURE__ */ g.jsxs("div", { className: "gcp-brand", children: [
              /* @__PURE__ */ g.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
              /* @__PURE__ */ g.jsxs("span", { className: "gcp-brand-copy", children: [
                /* @__PURE__ */ g.jsx("strong", { children: "Graph Copilot" }),
                /* @__PURE__ */ g.jsx("span", { children: "Agent workbench" })
              ] })
            ] }),
            /* @__PURE__ */ g.jsxs("div", { className: "gcp-header-actions", children: [
              /* @__PURE__ */ g.jsxs(
                "button",
                {
                  className: "gcp-model-chip",
                  onClick: () => S("settings"),
                  "aria-label": "Active model — open settings",
                  title: `Provider: ${i.provider}${Z ? ` · ${Z}` : ""} — click to change`,
                  children: [
                    /* @__PURE__ */ g.jsx("span", { className: "gcp-model-dot", "aria-hidden": "true" }),
                    Z || "Set up model"
                  ]
                }
              ),
              /* @__PURE__ */ g.jsx(
                "button",
                {
                  className: "gcp-icon-btn",
                  onClick: () => O((V) => V === "compact" ? "expanded" : "compact"),
                  "aria-label": A === "compact" ? "Expand panel" : "Use compact panel",
                  title: A === "compact" ? "Expand workspace" : "Compact workspace",
                  children: /* @__PURE__ */ g.jsx(dx, { expanded: A === "expanded" })
                }
              ),
              /* @__PURE__ */ g.jsx("button", { className: "gcp-icon-btn", onClick: b, "aria-label": "Close panel", title: "Close", children: /* @__PURE__ */ g.jsx(fx, {}) })
            ] })
          ] }),
          /* @__PURE__ */ g.jsxs("div", { className: "gcp-context-bar", "aria-label": "Current graph context", children: [
            /* @__PURE__ */ g.jsx("span", { className: `gcp-live-indicator${E.available ? " online" : ""}`, "aria-hidden": "true" }),
            /* @__PURE__ */ g.jsx("span", { className: "gcp-context-name", children: "Current graph" }),
            /* @__PURE__ */ g.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ g.jsx("strong", { children: E.nodes }),
              " nodes"
            ] }),
            /* @__PURE__ */ g.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ g.jsx("strong", { children: E.edges }),
              " edges"
            ] }),
            /* @__PURE__ */ g.jsx("span", { className: "gcp-context-api", children: Y })
          ] }),
          /* @__PURE__ */ g.jsx("nav", { className: "gcp-workbench-nav", "aria-label": "Agent workbench views", children: K.map((V) => /* @__PURE__ */ g.jsxs(
            "button",
            {
              className: `gcp-nav-btn${v === V.id ? " active" : ""}`,
              onClick: () => q(V.id),
              "aria-label": V.ariaLabel,
              "aria-current": v === V.id ? "page" : void 0,
              children: [
                V.icon,
                /* @__PURE__ */ g.jsx("span", { children: V.label })
              ]
            },
            V.id
          )) })
        ] }),
        /* @__PURE__ */ g.jsxs("main", { className: "gcp-view", children: [
          v === "chat" && /* @__PURE__ */ g.jsx(
            OE,
            {
              api: a,
              settings: i,
              codexLoggedIn: s,
              conversation: c,
              onConversationChange: d,
              onSettingsChange: f,
              onOpenSettings: () => S("settings"),
              onOpenHistory: () => S("history")
            }
          ),
          v === "experiments" && /* @__PURE__ */ g.jsx(PE, { api: a }),
          v === "history" && /* @__PURE__ */ g.jsx(tx, { api: a, activeId: c.id, onResume: R, onNew: j }),
          v === "settings" && /* @__PURE__ */ g.jsx(
            sx,
            {
              api: a,
              settings: i,
              codexLoggedIn: s,
              codexEmail: o,
              onCodexStatusChange: y,
              onChange: f
            }
          )
        ] })
      ]
    }
  );
}
function mx({ api: a }) {
  const [i, s] = P.useState(!1), [o, c] = P.useState(() => B0(a)), [d, f] = P.useState(!1), [y, p] = P.useState(null), [h, b] = P.useState(
    () => Yh(
      o.provider,
      o.models[o.provider] ?? "",
      ol(o)
    )
  );
  P.useEffect(() => {
    k0(a, o);
  }, [a, o]), P.useEffect(() => {
    if (o.provider !== "openai-codex") return;
    let E = !1;
    return bd(() => nd(a)).then((L) => {
      if (E || L === null) return;
      const R = L.status === "logged_in", j = R ? L.email ?? null : null;
      (R !== d || j !== y) && c((q) => ed(
        q,
        "openai-codex",
        [],
        { reasoningEffort: !1, richModelCatalog: !1 }
      )), R || as("openai-codex"), f(R), p(j);
    }).catch(() => {
    }), () => {
      E = !0;
    };
  }, [a, o.provider]), P.useEffect(() => {
    const E = o.provider;
    if (E === "custom") return;
    const L = E === "openai" ? o.apiKeys.openai : E === "openrouter" ? o.apiKeys.openrouter : E === "anthropic" ? o.apiKeys.anthropic : void 0;
    if (!(E === "openai-codex" ? d : !!L)) return;
    const j = el(
      E,
      E === "openai-codex" ? y ?? "active-codex-session" : L
    );
    let q = !1;
    const Z = (K) => {
      q || c((V) => {
        if (V.provider !== E) return V;
        const de = E === "openai" ? V.apiKeys.openai : E === "openrouter" ? V.apiKeys.openrouter : E === "anthropic" ? V.apiKeys.anthropic : void 0;
        return E !== "openai-codex" && de !== L ? V : ed(
          V,
          E,
          K.models,
          K.capabilities,
          K.source
        );
      });
    }, Y = Xg(j);
    return Y ? (Z(Y), () => {
      q = !0;
    }) : (ay(a, E, L).then((K) => {
      q || (Jg(j, K), Z(K));
    }).catch(() => {
    }), () => {
      q = !0;
    });
  }, [
    a,
    o.provider,
    o.apiKeys.openai,
    o.apiKeys.openrouter,
    o.apiKeys.anthropic,
    d,
    y
  ]);
  const v = (E) => {
    c(E);
  }, S = (E, L) => {
    f(E), p(L);
  }, A = () => {
    b(
      Yh(
        o.provider,
        o.models[o.provider] ?? "",
        ol(o)
      )
    );
  }, O = (E) => {
    b(E);
  };
  return /* @__PURE__ */ g.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ g.jsx(K0, { onClick: () => s((E) => !E) }),
    i && /* @__PURE__ */ g.jsx(
      px,
      {
        api: a,
        settings: o,
        codexLoggedIn: d,
        codexEmail: y,
        conversation: h,
        onConversationChange: b,
        onSettingsChange: v,
        onCodexStatusChange: S,
        onNewConversation: A,
        onResumeConversation: O,
        onClose: () => s(!1)
      }
    )
  ] });
}
function gx(a) {
  const i = a.ui.addFloatingWidget({ id: "copilot" });
  x0.createRoot(i).render(
    /* @__PURE__ */ g.jsx(g0.StrictMode, { children: /* @__PURE__ */ g.jsx(mx, { api: a }) })
  );
}
export {
  gx as default
};
