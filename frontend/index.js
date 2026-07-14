(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #14171d;--gcp-bg-deep: #0e1116;--gcp-surface: #1a1f27;--gcp-surface-2: #212732;--gcp-surface-hi: rgba(255, 255, 255, .055);--gcp-border: #2a313d;--gcp-border-soft: rgba(255, 255, 255, .07);--gcp-edge-hi: rgba(255, 255, 255, .06);--gcp-text: #e8eaf0;--gcp-dim: #9aa4b4;--gcp-faint: #6b7484;--gcp-accent: #2dd4d8;--gcp-accent-bright: #5ee7ea;--gcp-accent-deep: #0c98a6;--gcp-accent-ink: #04161a;--gcp-accent-soft: rgba(45, 212, 216, .12);--gcp-accent-line: rgba(45, 212, 216, .28);--gcp-grad: linear-gradient(135deg, #46e0e2 0%, #1ab6bf 55%, #0c98a6 100%);--gcp-danger: #f87171;--gcp-warn: #fbbf24;--gcp-ok: #34d399;--gcp-r-lg: 16px;--gcp-r: 11px;--gcp-r-sm: 8px;--gcp-shadow: 0 24px 56px -16px rgba(0, 0, 0, .7), 0 6px 16px rgba(0, 0, 0, .38);--gcp-shadow-sm: 0 4px 14px rgba(0, 0, 0, .35);--gcp-glow: 0 10px 30px -6px rgba(20, 182, 191, .5);--gcp-mono: "Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;--gcp-ease: cubic-bezier(.22, 1, .36, 1);position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:8px;height:8px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:8px;border:2px solid transparent;background-clip:padding-box}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-faint);background-clip:padding-box}.gcp-fab{width:52px;height:52px;border-radius:50%;background:var(--gcp-grad);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--gcp-glow),inset 0 1px #ffffff59;transition:transform .18s var(--gcp-ease),box-shadow .18s var(--gcp-ease),filter .18s var(--gcp-ease);outline:none;animation:gcp-fab-glow 4.5s ease-in-out infinite}.gcp-fab:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50%;background:radial-gradient(closest-side,rgba(45,212,216,.35),transparent 70%);opacity:0;transition:opacity .2s ease;pointer-events:none}.gcp-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.05)}.gcp-fab:hover:after{opacity:1}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:4px}@keyframes gcp-fab-glow{0%,to{box-shadow:0 10px 30px -6px #14b6bf73,inset 0 1px #ffffff59}50%{box-shadow:0 14px 38px -4px #14b6bf9e,inset 0 1px #ffffff59}}.gcp-window{position:fixed;bottom:16px;right:16px;width:432px;height:min(620px,calc(100vh - 96px));background:radial-gradient(120% 60% at 50% -10%,rgba(45,212,216,.06),transparent 60%),var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow);overflow:hidden;animation:gcp-window-in .28s var(--gcp-ease) both}.gcp-window:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;border-top:1px solid var(--gcp-edge-hi);pointer-events:none}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}.gcp-header{display:flex;align-items:center;padding:11px 12px;border-bottom:1px solid var(--gcp-border-soft);gap:8px;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent),var(--gcp-bg-deep);flex-shrink:0;position:relative;z-index:1}.gcp-header-title{flex:1;font-weight:600;font-size:13px;letter-spacing:.01em;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.gcp-header-mark{width:18px;height:18px;border-radius:6px;background:var(--gcp-grad);box-shadow:0 2px 8px #14b6bf73,inset 0 1px #fff6;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:11px;flex-shrink:0}.gcp-icon-btn{width:30px;height:30px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s ease,color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.92)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft)}.gcp-model-chip{height:26px;max-width:148px;min-width:0;padding:0 10px;border-radius:999px;border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:var(--gcp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;transition:color .14s ease,border-color .14s ease,background .14s ease;outline:none;flex-shrink:1}.gcp-model-chip:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-model-chip:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-label-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px 0 9px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-weight:550;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-label-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-2);border-color:var(--gcp-border)}.gcp-label-btn:active{transform:scale(.96)}.gcp-label-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-label-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:46px;height:46px;border-radius:14px;background:var(--gcp-grad);color:var(--gcp-accent-ink);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--gcp-glow),inset 0 1px #fff6;animation:gcp-pop .46s var(--gcp-ease) both}.gcp-welcome-title{font-size:15px;font-weight:650;color:var(--gcp-text);letter-spacing:.01em;animation:gcp-rise .46s var(--gcp-ease) 60ms both}.gcp-welcome-sub{font-size:12.5px;line-height:1.6;color:var(--gcp-dim);animation:gcp-rise .46s var(--gcp-ease) .12s both}.gcp-welcome-history{margin-top:6px;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease;outline:none;animation:gcp-rise .46s var(--gcp-ease) .18s both}.gcp-welcome-history:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-welcome-history:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-welcome-suggestions{display:flex;flex-direction:column;gap:6px;width:100%;margin-top:4px;animation:gcp-rise .46s var(--gcp-ease) .15s both}.gcp-suggestion{padding:8px 12px;border-radius:10px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;text-align:left;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-suggestion:hover{color:var(--gcp-text);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft);transform:translateY(-1px)}.gcp-suggestion:active{transform:none}.gcp-suggestion:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}@keyframes gcp-pop{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .3s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}@keyframes gcp-rise{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.gcp-bubble{max-width:86%;padding:9px 12px;border-radius:var(--gcp-r);line-height:1.55;word-break:break-word;white-space:pre-wrap;font-size:13px;box-shadow:var(--gcp-shadow-sm)}.gcp-msg-row.user .gcp-bubble{background:linear-gradient(180deg,#2dd4d829,#2dd4d81a);border:1px solid var(--gcp-accent-line);color:var(--gcp-text);border-bottom-right-radius:4px}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-text);border-bottom-left-radius:4px;box-shadow:var(--gcp-shadow-sm),inset 0 1px 0 var(--gcp-edge-hi)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);padding:10px 11px;overflow-x:auto;font-size:12px;font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble pre:last-child{margin-bottom:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:12px}.gcp-bubble :not(pre)>code{background:#ffffff12;border:1px solid var(--gcp-border-soft);padding:1px 5px;border-radius:5px;font-size:11.5px}.gcp-bubble .gcp-md-p{margin:0 0 8px}.gcp-bubble .gcp-md-p:last-child{margin-bottom:0}.gcp-md-h1,.gcp-md-h2,.gcp-md-h3{font-weight:700;color:var(--gcp-text);letter-spacing:.01em;margin:10px 0 6px;line-height:1.35}.gcp-md-h1{font-size:14.5px}.gcp-md-h2{font-size:13.5px}.gcp-md-h3{font-size:13px;color:var(--gcp-dim)}.gcp-md-h1:first-child,.gcp-md-h2:first-child,.gcp-md-h3:first-child{margin-top:0}.gcp-md-list{margin:2px 0 8px;padding-left:18px}.gcp-md-list:last-child{margin-bottom:0}.gcp-md-list li{margin:3px 0}.gcp-md-list li::marker{color:var(--gcp-faint)}.gcp-md-hr{border:none;border-top:1px solid var(--gcp-border-soft);margin:10px 0}.gcp-bubble a{color:var(--gcp-accent-bright);text-decoration:underline;text-underline-offset:2px;text-decoration-color:var(--gcp-accent-line)}.gcp-bubble a:hover{text-decoration-color:var(--gcp-accent-bright)}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:86%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block;box-shadow:var(--gcp-shadow-sm)}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);font-size:11.5px;max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:var(--gcp-accent-soft);border:1px solid var(--gcp-accent-line);color:var(--gcp-accent-bright);font-size:11px;line-height:1.5;font-variant-numeric:tabular-nums}.gcp-stages{display:flex;flex-direction:column;gap:4px;width:86%}.gcp-stage{border:1px solid var(--gcp-border-soft);border-radius:9px;background:linear-gradient(180deg,rgba(255,255,255,.015),transparent),var(--gcp-surface);overflow:hidden;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-stage.running{border-color:var(--gcp-accent-line);background:linear-gradient(180deg,rgba(45,212,216,.05),transparent),var(--gcp-surface)}.gcp-stage.error{border-color:#f8717159}.gcp-stage-head{display:flex;align-items:center;gap:8px;width:100%;padding:6px 9px;background:transparent;border:none;color:var(--gcp-dim);font-family:inherit;font-size:12px;text-align:left;cursor:pointer;outline:none;transition:background .13s ease}.gcp-stage-head:not(:disabled):hover{background:var(--gcp-surface-hi)}.gcp-stage-head:disabled{cursor:default}.gcp-stage-head:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:-2px}.gcp-stage-status{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}.gcp-stage.ok .gcp-stage-status{color:var(--gcp-ok);background:#34d39921}.gcp-stage.error .gcp-stage-status{color:var(--gcp-danger);background:#f8717121}.gcp-stage.running .gcp-stage-status{color:var(--gcp-accent)}.gcp-stage-spinner{width:11px;height:11px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);animation:gcp-spin .7s linear infinite}.gcp-stage-label{font-weight:620;font-size:12px;color:var(--gcp-text);white-space:nowrap;flex-shrink:0}.gcp-stage-summary{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}.gcp-stage.error .gcp-stage-summary{color:var(--gcp-danger)}.gcp-stage-chevron{color:var(--gcp-faint);flex-shrink:0;transition:transform .16s var(--gcp-ease)}.gcp-stage-chevron.open{transform:rotate(90deg)}.gcp-stage-detail{margin:0;padding:8px 10px;border-top:1px solid var(--gcp-border-soft);background:var(--gcp-bg-deep);color:var(--gcp-dim);font-family:var(--gcp-mono);font-size:11px;line-height:1.55;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-word}.gcp-thinking{display:flex;align-items:center;gap:8px;padding:2px 2px 6px;font-size:12.5px;animation:gcp-rise .24s var(--gcp-ease) both}.gcp-thinking-orb{color:var(--gcp-accent);font-size:13px;animation:gcp-orb-pulse 1.5s ease-in-out infinite}.gcp-thinking-text{background:linear-gradient(90deg,var(--gcp-dim) 25%,var(--gcp-accent-bright) 50%,var(--gcp-dim) 75%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gcp-shimmer 1.8s linear infinite}.gcp-thinking-time{color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}@keyframes gcp-orb-pulse{0%,to{opacity:.45;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}@keyframes gcp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.gcp-error-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:var(--gcp-r);border:1px solid rgba(248,113,113,.32);background:#f8717112;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-error-icon{color:var(--gcp-danger);margin-top:1px;flex-shrink:0;display:flex}.gcp-error-body{flex:1;min-width:0}.gcp-error-title{font-size:12px;font-weight:650;color:var(--gcp-danger)}.gcp-error-text{font-size:12px;color:var(--gcp-dim);margin-top:2px;word-break:break-word;line-height:1.5}.gcp-retry-btn{padding:5px 13px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;align-self:center;flex-shrink:0}.gcp-retry-btn:hover{background:#f871711f}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:#0e1116c7;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:26px 34px;border:1.5px dashed var(--gcp-accent-line);border-radius:var(--gcp-r);color:var(--gcp-accent-bright);font-size:13px;background:var(--gcp-accent-soft)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 12px;border-top:1px solid var(--gcp-border-soft);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.12)),var(--gcp-bg-deep)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .22s var(--gcp-ease) both}.gcp-chip.error{border-color:#f8717180;background:#f8717114}.gcp-chip-thumb{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-bg-deep);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:12px;color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:10.5px;color:var(--gcp-faint)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:13px;height:13px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-chip-remove{width:18px;height:18px;border-radius:5px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s ease,color .13s ease;outline:none}.gcp-chip-remove:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .14s ease,border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-accent);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-attach-btn:active:not(:disabled){transform:scale(.93)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:13px;padding:8px 11px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .14s ease,box-shadow .14s ease}.gcp-textarea::placeholder{color:var(--gcp-faint)}.gcp-textarea:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-textarea:disabled{opacity:.55;cursor:not-allowed}.gcp-send-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-grad);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px #14b6bf66,inset 0 1px #ffffff4d;transition:filter .14s ease,transform .14s var(--gcp-ease),box-shadow .14s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.08);box-shadow:0 6px 18px #14b6bf8c,inset 0 1px #ffffff4d}.gcp-send-btn:active:not(:disabled){transform:scale(.93)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-surface-2);color:var(--gcp-faint);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:2px}.gcp-stop-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-stop-btn:hover{background:#f871711f}.gcp-stop-btn:active{transform:scale(.93)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-input-hint{font-size:10.5px;color:var(--gcp-faint);text-align:center;letter-spacing:.015em;-webkit-user-select:none;user-select:none;line-height:1.4}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#0e1116db;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 15px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#2dd4d833}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:9px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:13px;font-weight:550;font-family:inherit;cursor:pointer;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-new-btn:hover{background:#2dd4d82e}.gcp-new-btn:active{transform:scale(.99)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:3px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background .14s ease,box-shadow .14s ease;border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-surface-hi)}.gcp-history-item.active{background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--gcp-grad)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:11px;color:var(--gcp-faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:26px;height:26px;border-radius:6px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .13s ease,background .13s ease,opacity .13s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711f}.gcp-history-delete.confirm{color:var(--gcp-danger);background:#f8717124;opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-faint);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:11px;font-weight:650;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.06em}.gcp-select,.gcp-input{width:100%;padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .14s ease,box-shadow .14s ease}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa4b4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:8px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:7px 14px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none}.gcp-codex-btn:hover{background:#2dd4d82e}.gcp-codex-btn.danger{border-color:#f8717180;background:transparent;color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711f}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-faint);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-faint);line-height:1.6;padding-top:6px;border-top:1px solid var(--gcp-border-soft)}.gcp-window{width:min(448px,calc(100vw - 32px));height:min(690px,calc(100vh - 88px));min-height:420px;isolation:isolate;transition:width .26s var(--gcp-ease),height .26s var(--gcp-ease),border-radius .26s var(--gcp-ease)}.gcp-window--expanded{width:min(980px,calc(100vw - 32px));height:min(800px,calc(100vh - 32px))}.gcp-workbench-header{display:flex;flex-direction:column;flex-shrink:0;background:radial-gradient(70% 120% at 5% 0%,rgba(45,212,216,.08),transparent 70%),var(--gcp-bg-deep);border-bottom:1px solid var(--gcp-border-soft);position:relative;z-index:3}.gcp-header-main{min-height:58px;display:flex;align-items:center;gap:12px;padding:9px 10px 7px 13px}.gcp-brand{display:flex;align-items:center;gap:9px;min-width:0;flex:1}.gcp-brand .gcp-header-mark{width:30px;height:30px;border-radius:9px;font-size:15px}.gcp-brand-copy{display:flex;flex-direction:column;min-width:0;line-height:1.15}.gcp-brand-copy strong{color:var(--gcp-text);font-size:13px;font-weight:680;letter-spacing:-.01em;white-space:nowrap}.gcp-brand-copy>span{color:var(--gcp-faint);font-size:10.5px;margin-top:3px;letter-spacing:.025em;white-space:nowrap}.gcp-header-actions{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:0}.gcp-header-actions .gcp-model-chip{display:inline-flex;align-items:center;gap:6px;height:28px;max-width:148px;padding:0 9px;background:#ffffff09}.gcp-model-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;background:var(--gcp-ok);box-shadow:0 0 0 3px #34d3991a}.gcp-context-bar{height:31px;display:flex;align-items:center;gap:8px;padding:0 14px;border-top:1px solid rgba(255,255,255,.035);color:var(--gcp-faint);font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-live-indicator{width:6px;height:6px;border-radius:50%;background:var(--gcp-faint);box-shadow:0 0 0 3px #6b74841a}.gcp-live-indicator.online{background:var(--gcp-ok);box-shadow:0 0 0 3px #34d3991a}.gcp-context-name{color:var(--gcp-dim);font-weight:580}.gcp-context-stat{padding-left:8px;border-left:1px solid var(--gcp-border-soft)}.gcp-context-stat strong{color:var(--gcp-text);font-weight:620}.gcp-context-api{margin-left:auto;font-family:var(--gcp-mono);font-size:10px}.gcp-workbench-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding:5px 7px 7px}.gcp-nav-btn{height:34px;min-width:0;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--gcp-faint);display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:0 9px;font-family:inherit;font-size:11.5px;font-weight:560;cursor:pointer;outline:none;transition:color .14s ease,background .14s ease,border-color .14s ease}.gcp-nav-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-hi)}.gcp-nav-btn.active{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line);box-shadow:inset 0 1px #ffffff0a}.gcp-nav-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-nav-btn svg{flex-shrink:0}.gcp-window--expanded .gcp-msg-row,.gcp-window--expanded .gcp-thinking,.gcp-window--expanded .gcp-error-row{width:min(100%,760px);margin-left:auto;margin-right:auto}.gcp-window--expanded .gcp-messages{padding:24px clamp(22px,8vw,92px) 12px}.gcp-window--expanded .gcp-input-area{padding-left:clamp(22px,9vw,108px);padding-right:clamp(22px,9vw,108px)}.gcp-window--expanded .gcp-settings,.gcp-window--expanded .gcp-history{width:min(100%,760px);margin:0 auto}.gcp-lab{position:relative;flex:1;min-height:0;overflow-y:auto;padding:18px;background:radial-gradient(80% 46% at 80% 0%,rgba(45,212,216,.045),transparent 70%),var(--gcp-bg)}.gcp-lab-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:17px}.gcp-eyebrow{display:block;color:var(--gcp-accent);font-size:9.5px;font-weight:700;letter-spacing:.12em;line-height:1.4;text-transform:uppercase}.gcp-lab-heading h1{margin:2px 0 4px;color:var(--gcp-text);font-size:18px;line-height:1.25;letter-spacing:-.025em}.gcp-lab-heading p{margin:0;max-width:560px;color:var(--gcp-dim);font-size:11.5px;line-height:1.55}.gcp-lab-count{flex-shrink:0;padding:5px 9px;border:1px solid var(--gcp-border-soft);border-radius:999px;background:var(--gcp-surface);color:var(--gcp-dim);font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-lab-heading-actions{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:7px}.gcp-lab-heading-actions>button{min-height:29px;padding:6px 10px;border:1px solid var(--gcp-accent-line);border-radius:8px;background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font:650 9.5px/1 var(--gcp-font);cursor:pointer}.gcp-lab-heading-actions>button:hover{border-color:var(--gcp-accent);color:var(--gcp-text)}.gcp-lab-heading-actions>button:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-lab-portable-message{margin:-7px 0 13px;padding:8px 10px;border:1px solid rgba(52,211,153,.22);border-radius:8px;background:#34d39911;color:var(--gcp-ok);font-size:10px;line-height:1.45}.gcp-lab-portable-message.error{border-color:#f871713d;background:#f8717112;color:var(--gcp-danger)}.gcp-lab-empty{min-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px 20px;border:1px dashed var(--gcp-border);border-radius:14px;background:#ffffff04}.gcp-lab-empty-mark{width:54px;height:54px;border:1px solid var(--gcp-accent-line);border-radius:16px;display:grid;place-items:center;color:var(--gcp-accent-bright);background:var(--gcp-accent-soft);box-shadow:0 14px 32px -18px #2dd4d8a6}.gcp-lab-empty h2{margin:15px 0 6px;font-size:15px;color:var(--gcp-text)}.gcp-lab-empty p{max-width:470px;margin:0;color:var(--gcp-dim);font-size:12px;line-height:1.6}.gcp-lab-example{max-width:510px;margin-top:17px;padding:10px 12px;border-radius:9px;background:var(--gcp-bg-deep);border:1px solid var(--gcp-border-soft);color:var(--gcp-faint);font-size:11px;line-height:1.55;text-align:left}.gcp-lab-layout{display:flex;flex-direction:column;gap:13px}.gcp-lab-studies{display:flex;gap:8px;overflow-x:auto;padding:1px 1px 5px;scrollbar-width:thin}.gcp-study-card{width:220px;min-width:220px;display:flex;flex-direction:column;align-items:stretch;gap:7px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:11px;background:var(--gcp-surface);color:var(--gcp-text);font-family:inherit;text-align:left;cursor:pointer;outline:none;transition:border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease)}.gcp-study-card:hover{border-color:var(--gcp-border);background:var(--gcp-surface-2);transform:translateY(-1px)}.gcp-study-card.active{border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-study-card:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-study-card-top{display:flex;justify-content:space-between;align-items:center;gap:8px}.gcp-study-card time{color:var(--gcp-faint);font-size:9.5px}.gcp-study-card>strong{display:-webkit-box;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:32px;font-size:11.5px;font-weight:620;line-height:1.4}.gcp-study-card-meta{color:var(--gcp-faint);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-lab-badge{display:inline-flex;align-items:center;width:fit-content;min-height:19px;padding:2px 7px;border:1px solid var(--gcp-border);border-radius:999px;color:var(--gcp-dim);background:#ffffff09;font-size:9px;font-weight:700;line-height:1;letter-spacing:.04em;text-transform:uppercase}.gcp-lab-badge.completed{color:var(--gcp-ok);border-color:#34d39940;background:#34d39914}.gcp-lab-badge.partial,.gcp-lab-badge.invalid{color:var(--gcp-warn);border-color:#fbbf2442;background:#fbbf2414}.gcp-lab-badge.failed{color:var(--gcp-danger);border-color:#f8717142;background:#f8717114}.gcp-lab-report{min-width:0;padding:16px;border:1px solid var(--gcp-border-soft);border-radius:13px;background:#1a1f27c7;box-shadow:inset 0 1px 0 var(--gcp-edge-hi)}.gcp-lab-report-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.gcp-lab-report-head h2{margin:4px 0 0;color:var(--gcp-text);font-size:15px;line-height:1.4;letter-spacing:-.015em}.gcp-lab-export-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}.gcp-lab-export-actions button{min-height:28px;padding:5px 9px;border:1px solid var(--gcp-border);border-radius:7px;background:var(--gcp-surface);color:var(--gcp-dim);font:600 9px/1 var(--gcp-font);cursor:pointer}.gcp-lab-export-actions button:hover{border-color:var(--gcp-accent);color:var(--gcp-text);background:var(--gcp-accent-soft)}.gcp-lab-export-actions button:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-lab-export-actions button:disabled{opacity:.45;cursor:not-allowed}.gcp-lab-export-actions button:disabled:hover{border-color:var(--gcp-border);color:var(--gcp-dim);background:var(--gcp-surface)}.gcp-lab-integrity{margin:7px 0 0;color:var(--gcp-muted);font:500 8.5px/1.4 var(--gcp-mono)}.gcp-lab-summary-grid{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}.gcp-lab-summary-card{min-width:0;display:flex;align-items:center;gap:11px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep)}.gcp-lab-summary-card.winner{border-color:var(--gcp-accent-line);background:linear-gradient(135deg,var(--gcp-accent-soft),transparent 75%),var(--gcp-bg-deep)}.gcp-lab-card-icon{width:31px;height:31px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;font-size:15px}.gcp-lab-card-icon.objective{color:#a5b4fc;background:#818cf81f}.gcp-lab-card-icon.winner{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft)}.gcp-lab-summary-card>div{min-width:0;display:flex;flex-direction:column;gap:2px}.gcp-lab-summary-card h3{margin:0;color:var(--gcp-faint);font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.gcp-lab-summary-card strong{color:var(--gcp-text);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-lab-summary-card div>span{color:var(--gcp-faint);font-size:9.5px}.gcp-lab-search-plan{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:3px 10px;margin-top:8px;padding:10px 11px;border:1px solid rgba(129,140,248,.2);border-radius:9px;background:#818cf80e}.gcp-lab-search-plan .gcp-eyebrow{grid-column:1 / -1;color:#a5b4fc}.gcp-lab-search-plan strong{color:var(--gcp-text);font-size:10.5px}.gcp-lab-search-plan>span:not(.gcp-eyebrow){color:var(--gcp-dim);font-size:9.5px;line-height:1.4}.gcp-lab-search-plan small{grid-column:1 / -1;color:var(--gcp-faint);font-size:8.5px;line-height:1.4}.gcp-lab-section{margin-top:18px}.gcp-lab-section-title{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:8px}.gcp-lab-section-title h3{margin:0;color:var(--gcp-text);font-size:11.5px;font-weight:650}.gcp-lab-section-title>span{color:var(--gcp-faint);font-size:9.5px}.gcp-lab-findings{margin:0;padding:10px 12px 10px 27px;border-radius:9px;background:var(--gcp-bg-deep);color:var(--gcp-dim);font-size:10.5px;line-height:1.55}.gcp-lab-findings li+li{margin-top:5px}.gcp-lab-findings li::marker{color:var(--gcp-accent)}.gcp-leaderboard-wrap{overflow-x:auto;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep)}.gcp-leaderboard{width:100%;min-width:650px;border-collapse:collapse;font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-leaderboard th{padding:8px 9px;border-bottom:1px solid var(--gcp-border);color:var(--gcp-faint);font-size:8.5px;font-weight:700;letter-spacing:.075em;text-align:left;text-transform:uppercase;white-space:nowrap}.gcp-leaderboard td{padding:9px;border-bottom:1px solid var(--gcp-border-soft);color:var(--gcp-dim);vertical-align:middle}.gcp-leaderboard tbody tr:last-child td{border-bottom:none}.gcp-leaderboard tbody tr.winner{background:#2dd4d80e}.gcp-rank{display:inline-grid;place-items:center;width:21px;height:21px;border-radius:6px;background:var(--gcp-surface);color:var(--gcp-dim)}.gcp-leaderboard tr.winner .gcp-rank{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft)}.gcp-candidate-name{display:flex;align-items:center;flex-wrap:wrap;gap:5px;min-width:140px}.gcp-candidate-name strong{color:var(--gcp-text);font-size:10.5px}.gcp-winner-tag{padding:2px 5px;border-radius:4px;background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:8px;font-weight:700;text-transform:uppercase}.gcp-candidate-operations{display:block;max-width:240px;margin-top:3px;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:8.5px;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-candidate-error{display:block;max-width:210px;margin-top:3px;color:var(--gcp-danger);font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-metric-value{color:var(--gcp-text)!important;font-family:var(--gcp-mono)}.gcp-metric-detail{display:block;margin-top:3px;color:var(--gcp-muted);font-family:var(--gcp-font);font-size:8.5px;font-weight:500;line-height:1.3;white-space:nowrap}.gcp-candidate-download{min-height:25px;padding:4px 7px;border:1px solid var(--gcp-border);border-radius:6px;background:var(--gcp-surface);color:var(--gcp-dim);font:600 8.5px/1 var(--gcp-font);cursor:pointer}.gcp-candidate-download:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-text)}.gcp-candidate-download:disabled{opacity:.4;cursor:not-allowed}.gcp-study-import-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:8;display:grid;place-items:center;padding:20px;background:#05080cc2;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.gcp-study-import-dialog{width:min(100%,520px);max-height:calc(100% - 12px);overflow-y:auto;padding:18px;border:1px solid var(--gcp-border);border-radius:13px;background:var(--gcp-bg-raised);box-shadow:var(--gcp-shadow-lg)}.gcp-study-import-dialog h2{margin:4px 0 7px;color:var(--gcp-text);font-size:15px}.gcp-study-import-dialog>p{margin:0;color:var(--gcp-dim);font-size:10.5px;line-height:1.55}.gcp-study-import-dialog dl{margin:14px 0;display:grid;gap:7px}.gcp-study-import-dialog dl>div{display:grid;grid-template-columns:105px minmax(0,1fr);gap:10px}.gcp-study-import-dialog dt{color:var(--gcp-faint);font-size:9px;font-weight:700;text-transform:uppercase}.gcp-study-import-dialog dd{min-width:0;margin:0;color:var(--gcp-text);font-size:10px;overflow-wrap:anywhere}.gcp-study-import-dialog code{color:var(--gcp-accent-bright);font:8.5px/1.4 var(--gcp-mono)}.gcp-study-import-safety{padding:9px 10px;border:1px solid var(--gcp-accent-line);border-radius:8px;background:var(--gcp-accent-soft)}.gcp-study-import-dialog .gcp-lab-portable-message{margin:10px 0 0}.gcp-study-import-actions{display:flex;justify-content:flex-end;gap:7px;margin-top:15px}.gcp-study-import-actions button{min-height:30px;padding:6px 11px;border:1px solid var(--gcp-border);border-radius:7px;background:var(--gcp-surface);color:var(--gcp-dim);font:650 9.5px/1 var(--gcp-font);cursor:pointer}.gcp-study-import-actions button.primary{border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright)}.gcp-study-import-actions button:disabled{opacity:.5;cursor:not-allowed}.gcp-lab-warnings{display:flex;flex-direction:column;gap:5px}.gcp-lab-warnings p{position:relative;margin:0;padding:8px 10px 8px 27px;border:1px solid rgba(251,191,36,.17);border-radius:8px;background:#fbbf240e;color:#d8c28c;font-size:10px;line-height:1.5}.gcp-lab-warnings p:before{content:"!";position:absolute;left:10px;top:8px;color:var(--gcp-warn);font-weight:800}.gcp-paper-grid{display:grid;grid-template-columns:1fr;gap:8px}.gcp-paper-card{position:relative;padding:12px;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep);overflow:hidden}.gcp-paper-index{position:absolute;right:9px;top:7px;color:#ffffff0d;font-family:var(--gcp-mono);font-size:25px;font-weight:800}.gcp-paper-card h4{position:relative;margin:0 28px 9px 0;color:var(--gcp-text);font-size:11px;line-height:1.4}.gcp-paper-card dl{margin:0;display:flex;flex-direction:column;gap:7px}.gcp-paper-card dl>div{display:grid;grid-template-columns:52px 1fr;gap:7px}.gcp-paper-card dt{color:var(--gcp-accent);font-size:8.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}.gcp-paper-card dd{margin:0;color:var(--gcp-dim);font-size:9.5px;line-height:1.5}.gcp-window--expanded .gcp-lab{padding:24px}.gcp-window--expanded .gcp-lab-layout{display:grid;grid-template-columns:220px minmax(0,1fr);align-items:start}.gcp-window--expanded .gcp-lab-studies{position:sticky;top:0;max-height:590px;flex-direction:column;overflow-x:hidden;overflow-y:auto;padding:1px 5px 1px 1px}.gcp-window--expanded .gcp-study-card{width:100%;min-width:0}.gcp-window--expanded .gcp-lab-summary-grid,.gcp-window--expanded .gcp-paper-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:720px),(max-height:560px){.gcp-window,.gcp-window--expanded{top:8px;right:8px;bottom:8px;left:8px;width:auto;height:auto;min-height:0;border-radius:13px}.gcp-window--expanded .gcp-lab-layout{display:flex}.gcp-window--expanded .gcp-lab-studies{position:static;max-height:none;flex-direction:row;overflow-x:auto;overflow-y:hidden}.gcp-window--expanded .gcp-study-card{width:220px;min-width:220px}.gcp-window--expanded .gcp-messages{padding:16px 14px 8px}.gcp-window--expanded .gcp-input-area{padding:10px 12px 12px}}@media(max-width:430px){.gcp-header-main{padding-left:10px;gap:7px}.gcp-brand-copy>span{display:none}.gcp-header-actions .gcp-model-chip{max-width:116px}.gcp-context-bar{padding:0 11px;gap:6px}.gcp-context-name{display:none}.gcp-context-stat{padding-left:6px}.gcp-workbench-nav{gap:2px;padding-left:5px;padding-right:5px}.gcp-nav-btn{gap:5px;padding:0 5px;font-size:10.5px}.gcp-lab{padding:14px 11px}.gcp-lab-report{padding:12px 10px}.gcp-lab-heading p{display:none}.gcp-lab-heading{align-items:center;margin-bottom:13px}}.gcp-experiment-approval-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:40;display:grid;place-items:center;padding:18px;background:color-mix(in srgb,var(--gcp-bg, #0f1117) 72%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.gcp-experiment-approval{width:min(420px,100%);padding:20px;border:1px solid color-mix(in srgb,var(--gcp-accent, #7c8cff) 32%,var(--gcp-border, #2c3340));border-radius:16px;background:var(--gcp-surface, #171a22);box-shadow:0 24px 70px #0000006b}.gcp-experiment-approval-kicker{margin-bottom:6px;color:var(--gcp-accent, #8b9aff);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.gcp-experiment-approval-title{color:var(--gcp-text, #f4f6fb);font-size:18px;font-weight:700;line-height:1.3}.gcp-experiment-approval-hypothesis{margin-top:10px;color:var(--gcp-text, #f4f6fb);font-size:13px;line-height:1.5}.gcp-experiment-approval-facts{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.gcp-experiment-approval-facts span{padding:4px 7px;border-radius:999px;background:var(--gcp-surface-2, #222631);color:var(--gcp-muted, #a8b0bf);font-size:11px}.gcp-experiment-approval-candidates{display:grid;gap:6px;max-height:124px;margin-top:12px;overflow-y:auto}.gcp-experiment-approval-candidates>div,.gcp-experiment-approval-nodes{display:grid;grid-template-columns:minmax(72px,.35fr) minmax(0,1fr);gap:8px;padding:7px 9px;border-radius:8px;background:var(--gcp-surface-2, #222631);font-size:10.5px;line-height:1.4}.gcp-experiment-approval-candidates strong,.gcp-experiment-approval-nodes strong{color:var(--gcp-text, #f4f6fb)}.gcp-experiment-approval-candidates span,.gcp-experiment-approval-nodes span{min-width:0;overflow-wrap:anywhere;color:var(--gcp-muted, #a8b0bf);font-family:var(--gcp-mono, ui-monospace, monospace)}.gcp-experiment-approval-nodes{margin-top:6px}.gcp-experiment-approval-warning{margin-top:14px;padding:10px 11px;border:1px solid color-mix(in srgb,#f5b942 32%,transparent);border-radius:10px;background:color-mix(in srgb,#f5b942 8%,transparent);color:var(--gcp-muted, #bac1cf);font-size:12px;line-height:1.45}.gcp-experiment-approval-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}.gcp-approval-secondary,.gcp-approval-primary{min-height:34px;padding:0 13px;border-radius:9px;font:inherit;font-size:12px;font-weight:650;cursor:pointer}.gcp-approval-secondary{border:1px solid var(--gcp-border, #343b49);background:transparent;color:var(--gcp-text, #f4f6fb)}.gcp-approval-primary{border:1px solid transparent;background:var(--gcp-accent, #7c8cff);color:#fff}.gcp-approval-secondary:hover,.gcp-approval-primary:hover{filter:brightness(1.08)}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
var rb = Object.defineProperty;
var lb = (a, r, l) => r in a ? rb(a, r, { enumerable: !0, configurable: !0, writable: !0, value: l }) : a[r] = l;
var Qt = (a, r, l) => lb(a, typeof r != "symbol" ? r + "" : r, l);
function sb(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var ru = { exports: {} }, Or = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kp;
function ob() {
  if (kp) return Or;
  kp = 1;
  var a = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function l(o, u, d) {
    var f = null;
    if (d !== void 0 && (f = "" + d), u.key !== void 0 && (f = "" + u.key), "key" in u) {
      d = {};
      for (var v in u)
        v !== "key" && (d[v] = u[v]);
    } else d = u;
    return u = d.ref, {
      $$typeof: a,
      type: o,
      key: f,
      ref: u !== void 0 ? u : null,
      props: d
    };
  }
  return Or.Fragment = r, Or.jsx = l, Or.jsxs = l, Or;
}
var Qp;
function cb() {
  return Qp || (Qp = 1, ru.exports = ob()), ru.exports;
}
var y = cb(), lu = { exports: {} }, pe = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zp;
function ub() {
  if (Zp) return pe;
  Zp = 1;
  var a = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), f = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), _ = Symbol.iterator;
  function j(E) {
    return E === null || typeof E != "object" ? null : (E = _ && E[_] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var R = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, x = Object.assign, I = {};
  function M(E, V, W) {
    this.props = E, this.context = V, this.refs = I, this.updater = W || R;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(E, V) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, V, "setState");
  }, M.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function L() {
  }
  L.prototype = M.prototype;
  function Y(E, V, W) {
    this.props = E, this.context = V, this.refs = I, this.updater = W || R;
  }
  var ie = Y.prototype = new L();
  ie.constructor = Y, x(ie, M.prototype), ie.isPureReactComponent = !0;
  var Z = Array.isArray;
  function ae() {
  }
  var G = { H: null, A: null, T: null, S: null }, se = Object.prototype.hasOwnProperty;
  function ce(E, V, W) {
    var te = W.ref;
    return {
      $$typeof: a,
      type: E,
      key: V,
      ref: te !== void 0 ? te : null,
      props: W
    };
  }
  function U(E, V) {
    return ce(E.type, V, E.props);
  }
  function k(E) {
    return typeof E == "object" && E !== null && E.$$typeof === a;
  }
  function oe(E) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(W) {
      return V[W];
    });
  }
  var ge = /\/+/g;
  function re(E, V) {
    return typeof E == "object" && E !== null && E.key != null ? oe("" + E.key) : V.toString(36);
  }
  function Ne(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(ae, ae) : (E.status = "pending", E.then(
          function(V) {
            E.status === "pending" && (E.status = "fulfilled", E.value = V);
          },
          function(V) {
            E.status === "pending" && (E.status = "rejected", E.reason = V);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function D(E, V, W, te, fe) {
    var ve = typeof E;
    (ve === "undefined" || ve === "boolean") && (E = null);
    var Te = !1;
    if (E === null) Te = !0;
    else
      switch (ve) {
        case "bigint":
        case "string":
        case "number":
          Te = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case a:
            case r:
              Te = !0;
              break;
            case b:
              return Te = E._init, D(
                Te(E._payload),
                V,
                W,
                te,
                fe
              );
          }
      }
    if (Te)
      return fe = fe(E), Te = te === "" ? "." + re(E, 0) : te, Z(fe) ? (W = "", Te != null && (W = Te.replace(ge, "$&/") + "/"), D(fe, V, W, "", function(pa) {
        return pa;
      })) : fe != null && (k(fe) && (fe = U(
        fe,
        W + (fe.key == null || E && E.key === fe.key ? "" : ("" + fe.key).replace(
          ge,
          "$&/"
        ) + "/") + Te
      )), V.push(fe)), 1;
    Te = 0;
    var ut = te === "" ? "." : te + ":";
    if (Z(E))
      for (var Xe = 0; Xe < E.length; Xe++)
        te = E[Xe], ve = ut + re(te, Xe), Te += D(
          te,
          V,
          W,
          ve,
          fe
        );
    else if (Xe = j(E), typeof Xe == "function")
      for (E = Xe.call(E), Xe = 0; !(te = E.next()).done; )
        te = te.value, ve = ut + re(te, Xe++), Te += D(
          te,
          V,
          W,
          ve,
          fe
        );
    else if (ve === "object") {
      if (typeof E.then == "function")
        return D(
          Ne(E),
          V,
          W,
          te,
          fe
        );
      throw V = String(E), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Te;
  }
  function X(E, V, W) {
    if (E == null) return E;
    var te = [], fe = 0;
    return D(E, te, "", "", function(ve) {
      return V.call(W, ve, fe++);
    }), te;
  }
  function O(E) {
    if (E._status === -1) {
      var V = E._result;
      V = V(), V.then(
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = W);
        },
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = W);
        }
      ), E._status === -1 && (E._status = 0, E._result = V);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var F = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, Q = {
    map: X,
    forEach: function(E, V, W) {
      X(
        E,
        function() {
          V.apply(this, arguments);
        },
        W
      );
    },
    count: function(E) {
      var V = 0;
      return X(E, function() {
        V++;
      }), V;
    },
    toArray: function(E) {
      return X(E, function(V) {
        return V;
      }) || [];
    },
    only: function(E) {
      if (!k(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return pe.Activity = g, pe.Children = Q, pe.Component = M, pe.Fragment = l, pe.Profiler = u, pe.PureComponent = Y, pe.StrictMode = o, pe.Suspense = p, pe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, pe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return G.H.useMemoCache(E);
    }
  }, pe.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, pe.cacheSignal = function() {
    return null;
  }, pe.cloneElement = function(E, V, W) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var te = x({}, E.props), fe = E.key;
    if (V != null)
      for (ve in V.key !== void 0 && (fe = "" + V.key), V)
        !se.call(V, ve) || ve === "key" || ve === "__self" || ve === "__source" || ve === "ref" && V.ref === void 0 || (te[ve] = V[ve]);
    var ve = arguments.length - 2;
    if (ve === 1) te.children = W;
    else if (1 < ve) {
      for (var Te = Array(ve), ut = 0; ut < ve; ut++)
        Te[ut] = arguments[ut + 2];
      te.children = Te;
    }
    return ce(E.type, fe, te);
  }, pe.createContext = function(E) {
    return E = {
      $$typeof: f,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: d,
      _context: E
    }, E;
  }, pe.createElement = function(E, V, W) {
    var te, fe = {}, ve = null;
    if (V != null)
      for (te in V.key !== void 0 && (ve = "" + V.key), V)
        se.call(V, te) && te !== "key" && te !== "__self" && te !== "__source" && (fe[te] = V[te]);
    var Te = arguments.length - 2;
    if (Te === 1) fe.children = W;
    else if (1 < Te) {
      for (var ut = Array(Te), Xe = 0; Xe < Te; Xe++)
        ut[Xe] = arguments[Xe + 2];
      fe.children = ut;
    }
    if (E && E.defaultProps)
      for (te in Te = E.defaultProps, Te)
        fe[te] === void 0 && (fe[te] = Te[te]);
    return ce(E, ve, fe);
  }, pe.createRef = function() {
    return { current: null };
  }, pe.forwardRef = function(E) {
    return { $$typeof: v, render: E };
  }, pe.isValidElement = k, pe.lazy = function(E) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: E },
      _init: O
    };
  }, pe.memo = function(E, V) {
    return {
      $$typeof: h,
      type: E,
      compare: V === void 0 ? null : V
    };
  }, pe.startTransition = function(E) {
    var V = G.T, W = {};
    G.T = W;
    try {
      var te = E(), fe = G.S;
      fe !== null && fe(W, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(ae, F);
    } catch (ve) {
      F(ve);
    } finally {
      V !== null && W.types !== null && (V.types = W.types), G.T = V;
    }
  }, pe.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, pe.use = function(E) {
    return G.H.use(E);
  }, pe.useActionState = function(E, V, W) {
    return G.H.useActionState(E, V, W);
  }, pe.useCallback = function(E, V) {
    return G.H.useCallback(E, V);
  }, pe.useContext = function(E) {
    return G.H.useContext(E);
  }, pe.useDebugValue = function() {
  }, pe.useDeferredValue = function(E, V) {
    return G.H.useDeferredValue(E, V);
  }, pe.useEffect = function(E, V) {
    return G.H.useEffect(E, V);
  }, pe.useEffectEvent = function(E) {
    return G.H.useEffectEvent(E);
  }, pe.useId = function() {
    return G.H.useId();
  }, pe.useImperativeHandle = function(E, V, W) {
    return G.H.useImperativeHandle(E, V, W);
  }, pe.useInsertionEffect = function(E, V) {
    return G.H.useInsertionEffect(E, V);
  }, pe.useLayoutEffect = function(E, V) {
    return G.H.useLayoutEffect(E, V);
  }, pe.useMemo = function(E, V) {
    return G.H.useMemo(E, V);
  }, pe.useOptimistic = function(E, V) {
    return G.H.useOptimistic(E, V);
  }, pe.useReducer = function(E, V, W) {
    return G.H.useReducer(E, V, W);
  }, pe.useRef = function(E) {
    return G.H.useRef(E);
  }, pe.useState = function(E) {
    return G.H.useState(E);
  }, pe.useSyncExternalStore = function(E, V, W) {
    return G.H.useSyncExternalStore(
      E,
      V,
      W
    );
  }, pe.useTransition = function() {
    return G.H.useTransition();
  }, pe.version = "19.2.7", pe;
}
var Jp;
function Ru() {
  return Jp || (Jp = 1, lu.exports = ub()), lu.exports;
}
var ee = Ru();
const db = /* @__PURE__ */ sb(ee);
var su = { exports: {} }, Mr = {}, ou = { exports: {} }, cu = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wp;
function fb() {
  return Wp || (Wp = 1, (function(a) {
    function r(D, X) {
      var O = D.length;
      D.push(X);
      e: for (; 0 < O; ) {
        var F = O - 1 >>> 1, Q = D[F];
        if (0 < u(Q, X))
          D[F] = X, D[O] = Q, O = F;
        else break e;
      }
    }
    function l(D) {
      return D.length === 0 ? null : D[0];
    }
    function o(D) {
      if (D.length === 0) return null;
      var X = D[0], O = D.pop();
      if (O !== X) {
        D[0] = O;
        e: for (var F = 0, Q = D.length, E = Q >>> 1; F < E; ) {
          var V = 2 * (F + 1) - 1, W = D[V], te = V + 1, fe = D[te];
          if (0 > u(W, O))
            te < Q && 0 > u(fe, W) ? (D[F] = fe, D[te] = O, F = te) : (D[F] = W, D[V] = O, F = V);
          else if (te < Q && 0 > u(fe, O))
            D[F] = fe, D[te] = O, F = te;
          else break e;
        }
      }
      return X;
    }
    function u(D, X) {
      var O = D.sortIndex - X.sortIndex;
      return O !== 0 ? O : D.id - X.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      a.unstable_now = function() {
        return d.now();
      };
    } else {
      var f = Date, v = f.now();
      a.unstable_now = function() {
        return f.now() - v;
      };
    }
    var p = [], h = [], b = 1, g = null, _ = 3, j = !1, R = !1, x = !1, I = !1, M = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    function ie(D) {
      for (var X = l(h); X !== null; ) {
        if (X.callback === null) o(h);
        else if (X.startTime <= D)
          o(h), X.sortIndex = X.expirationTime, r(p, X);
        else break;
        X = l(h);
      }
    }
    function Z(D) {
      if (x = !1, ie(D), !R)
        if (l(p) !== null)
          R = !0, ae || (ae = !0, oe());
        else {
          var X = l(h);
          X !== null && Ne(Z, X.startTime - D);
        }
    }
    var ae = !1, G = -1, se = 5, ce = -1;
    function U() {
      return I ? !0 : !(a.unstable_now() - ce < se);
    }
    function k() {
      if (I = !1, ae) {
        var D = a.unstable_now();
        ce = D;
        var X = !0;
        try {
          e: {
            R = !1, x && (x = !1, L(G), G = -1), j = !0;
            var O = _;
            try {
              t: {
                for (ie(D), g = l(p); g !== null && !(g.expirationTime > D && U()); ) {
                  var F = g.callback;
                  if (typeof F == "function") {
                    g.callback = null, _ = g.priorityLevel;
                    var Q = F(
                      g.expirationTime <= D
                    );
                    if (D = a.unstable_now(), typeof Q == "function") {
                      g.callback = Q, ie(D), X = !0;
                      break t;
                    }
                    g === l(p) && o(p), ie(D);
                  } else o(p);
                  g = l(p);
                }
                if (g !== null) X = !0;
                else {
                  var E = l(h);
                  E !== null && Ne(
                    Z,
                    E.startTime - D
                  ), X = !1;
                }
              }
              break e;
            } finally {
              g = null, _ = O, j = !1;
            }
            X = void 0;
          }
        } finally {
          X ? oe() : ae = !1;
        }
      }
    }
    var oe;
    if (typeof Y == "function")
      oe = function() {
        Y(k);
      };
    else if (typeof MessageChannel < "u") {
      var ge = new MessageChannel(), re = ge.port2;
      ge.port1.onmessage = k, oe = function() {
        re.postMessage(null);
      };
    } else
      oe = function() {
        M(k, 0);
      };
    function Ne(D, X) {
      G = M(function() {
        D(a.unstable_now());
      }, X);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(D) {
      D.callback = null;
    }, a.unstable_forceFrameRate = function(D) {
      0 > D || 125 < D ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : se = 0 < D ? Math.floor(1e3 / D) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return _;
    }, a.unstable_next = function(D) {
      switch (_) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = _;
      }
      var O = _;
      _ = X;
      try {
        return D();
      } finally {
        _ = O;
      }
    }, a.unstable_requestPaint = function() {
      I = !0;
    }, a.unstable_runWithPriority = function(D, X) {
      switch (D) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          D = 3;
      }
      var O = _;
      _ = D;
      try {
        return X();
      } finally {
        _ = O;
      }
    }, a.unstable_scheduleCallback = function(D, X, O) {
      var F = a.unstable_now();
      switch (typeof O == "object" && O !== null ? (O = O.delay, O = typeof O == "number" && 0 < O ? F + O : F) : O = F, D) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return Q = O + Q, D = {
        id: b++,
        callback: X,
        priorityLevel: D,
        startTime: O,
        expirationTime: Q,
        sortIndex: -1
      }, O > F ? (D.sortIndex = O, r(h, D), l(p) === null && D === l(h) && (x ? (L(G), G = -1) : x = !0, Ne(Z, O - F))) : (D.sortIndex = Q, r(p, D), R || j || (R = !0, ae || (ae = !0, oe()))), D;
    }, a.unstable_shouldYield = U, a.unstable_wrapCallback = function(D) {
      var X = _;
      return function() {
        var O = _;
        _ = X;
        try {
          return D.apply(this, arguments);
        } finally {
          _ = O;
        }
      };
    };
  })(cu)), cu;
}
var Fp;
function mb() {
  return Fp || (Fp = 1, ou.exports = fb()), ou.exports;
}
var uu = { exports: {} }, vt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pp;
function pb() {
  if (Pp) return vt;
  Pp = 1;
  var a = Ru();
  function r(p) {
    var h = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + p + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var o = {
    d: {
      f: l,
      r: function() {
        throw Error(r(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, u = Symbol.for("react.portal");
  function d(p, h, b) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: g == null ? null : "" + g,
      children: p,
      containerInfo: h,
      implementation: b
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(p, h) {
    if (p === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return vt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, vt.createPortal = function(p, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(r(299));
    return d(p, h, null, b);
  }, vt.flushSync = function(p) {
    var h = f.T, b = o.p;
    try {
      if (f.T = null, o.p = 2, p) return p();
    } finally {
      f.T = h, o.p = b, o.d.f();
    }
  }, vt.preconnect = function(p, h) {
    typeof p == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, o.d.C(p, h));
  }, vt.prefetchDNS = function(p) {
    typeof p == "string" && o.d.D(p);
  }, vt.preinit = function(p, h) {
    if (typeof p == "string" && h && typeof h.as == "string") {
      var b = h.as, g = v(b, h.crossOrigin), _ = typeof h.integrity == "string" ? h.integrity : void 0, j = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? o.d.S(
        p,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: g,
          integrity: _,
          fetchPriority: j
        }
      ) : b === "script" && o.d.X(p, {
        crossOrigin: g,
        integrity: _,
        fetchPriority: j,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, vt.preinitModule = function(p, h) {
    if (typeof p == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = v(
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
  }, vt.preload = function(p, h) {
    if (typeof p == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, g = v(b, h.crossOrigin);
      o.d.L(p, b, {
        crossOrigin: g,
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
  }, vt.preloadModule = function(p, h) {
    if (typeof p == "string")
      if (h) {
        var b = v(h.as, h.crossOrigin);
        o.d.m(p, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else o.d.m(p);
  }, vt.requestFormReset = function(p) {
    o.d.r(p);
  }, vt.unstable_batchedUpdates = function(p, h) {
    return p(h);
  }, vt.useFormState = function(p, h, b) {
    return f.H.useFormState(p, h, b);
  }, vt.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, vt.version = "19.2.7", vt;
}
var eh;
function hb() {
  if (eh) return uu.exports;
  eh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (r) {
        console.error(r);
      }
  }
  return a(), uu.exports = pb(), uu.exports;
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
var th;
function yb() {
  if (th) return Mr;
  th = 1;
  var a = mb(), r = Ru(), l = hb();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u(e) {
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
  function v(e) {
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
    for (var n = e, i = t; ; ) {
      var s = n.return;
      if (s === null) break;
      var c = s.alternate;
      if (c === null) {
        if (i = s.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (s.child === c.child) {
        for (c = s.child; c; ) {
          if (c === n) return p(s), e;
          if (c === i) return p(s), t;
          c = c.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== i.return) n = s, i = c;
      else {
        for (var m = !1, S = s.child; S; ) {
          if (S === n) {
            m = !0, n = s, i = c;
            break;
          }
          if (S === i) {
            m = !0, i = s, n = c;
            break;
          }
          S = S.sibling;
        }
        if (!m) {
          for (S = c.child; S; ) {
            if (S === n) {
              m = !0, n = c, i = s;
              break;
            }
            if (S === i) {
              m = !0, i = c, n = s;
              break;
            }
            S = S.sibling;
          }
          if (!m) throw Error(o(189));
        }
      }
      if (n.alternate !== i) throw Error(o(190));
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
  var g = Object.assign, _ = Symbol.for("react.element"), j = Symbol.for("react.transitional.element"), R = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), L = Symbol.for("react.consumer"), Y = Symbol.for("react.context"), ie = Symbol.for("react.forward_ref"), Z = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), G = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), U = Symbol.for("react.memo_cache_sentinel"), k = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != "object" ? null : (e = k && e[k] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ge = Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ge ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case x:
        return "Fragment";
      case M:
        return "Profiler";
      case I:
        return "StrictMode";
      case Z:
        return "Suspense";
      case ae:
        return "SuspenseList";
      case ce:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case R:
          return "Portal";
        case Y:
          return e.displayName || "Context";
        case L:
          return (e._context.displayName || "Context") + ".Consumer";
        case ie:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case G:
          return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
        case se:
          t = e._payload, e = e._init;
          try {
            return re(e(t));
          } catch {
          }
      }
    return null;
  }
  var Ne = Array.isArray, D = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, O = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, F = [], Q = -1;
  function E(e) {
    return { current: e };
  }
  function V(e) {
    0 > Q || (e.current = F[Q], F[Q] = null, Q--);
  }
  function W(e, t) {
    Q++, F[Q] = e.current, e.current = t;
  }
  var te = E(null), fe = E(null), ve = E(null), Te = E(null);
  function ut(e, t) {
    switch (W(ve, t), W(fe, e), W(te, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? yp(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = yp(t), e = gp(t, e);
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
    V(te), W(te, e);
  }
  function Xe() {
    V(te), V(fe), V(ve);
  }
  function pa(e) {
    e.memoizedState !== null && W(Te, e);
    var t = te.current, n = gp(t, e.type);
    t !== n && (W(fe, e), W(te, n));
  }
  function Va(e) {
    fe.current === e && (V(te), V(fe)), Te.current === e && (V(Te), wr._currentValue = O);
  }
  var Ci, Fr;
  function Lt(e) {
    if (Ci === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ci = t && t[1] || "", Fr = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ci + e + Fr;
  }
  var zi = !1;
  function Ri(e, t) {
    if (!e || zi) return "";
    zi = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var q = function() {
                throw Error();
              };
              if (Object.defineProperty(q.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(q, []);
                } catch (z) {
                  var C = z;
                }
                Reflect.construct(e, [], q);
              } else {
                try {
                  q.call();
                } catch (z) {
                  C = z;
                }
                e.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (z) {
                C = z;
              }
              (q = e()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (z) {
            if (z && C && typeof z.stack == "string")
              return [z.stack, C.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = i.DetermineComponentFrameRoot(), m = c[0], S = c[1];
      if (m && S) {
        var A = m.split(`
`), T = S.split(`
`);
        for (s = i = 0; i < A.length && !A[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; s < T.length && !T[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (i === A.length || s === T.length)
          for (i = A.length - 1, s = T.length - 1; 1 <= i && 0 <= s && A[i] !== T[s]; )
            s--;
        for (; 1 <= i && 0 <= s; i--, s--)
          if (A[i] !== T[s]) {
            if (i !== 1 || s !== 1)
              do
                if (i--, s--, 0 > s || A[i] !== T[s]) {
                  var B = `
` + A[i].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= i && 0 <= s);
            break;
          }
      }
    } finally {
      zi = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? Lt(n) : "";
  }
  function Is(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Lt(e.type);
      case 16:
        return Lt("Lazy");
      case 13:
        return e.child !== t && t !== null ? Lt("Suspense Fallback") : Lt("Suspense");
      case 19:
        return Lt("SuspenseList");
      case 0:
      case 15:
        return Ri(e.type, !1);
      case 11:
        return Ri(e.type.render, !1);
      case 1:
        return Ri(e.type, !0);
      case 31:
        return Lt("Activity");
      default:
        return "";
    }
  }
  function Ui(e) {
    try {
      var t = "", n = null;
      do
        t += Is(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Li = Object.prototype.hasOwnProperty, Vi = a.unstable_scheduleCallback, Un = a.unstable_cancelCallback, Pr = a.unstable_shouldYield, el = a.unstable_requestPaint, bt = a.unstable_now, Ks = a.unstable_getCurrentPriorityLevel, Bi = a.unstable_ImmediatePriority, K = a.unstable_UserBlockingPriority, Se = a.unstable_NormalPriority, gt = a.unstable_LowPriority, ha = a.unstable_IdlePriority, Ge = a.log, un = a.unstable_setDisableYieldValue, dt = null, Pe = null;
  function ke(e) {
    if (typeof Ge == "function" && un(e), Pe && typeof Pe.setStrictMode == "function")
      try {
        Pe.setStrictMode(dt, e);
      } catch {
      }
  }
  var lt = Math.clz32 ? Math.clz32 : Yy, Ys = Math.log, Ky = Math.LN2;
  function Yy(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ys(e) / Ky | 0) | 0;
  }
  var tl = 256, nl = 262144, al = 4194304;
  function ya(e) {
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
  function il(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var s = 0, c = e.suspendedLanes, m = e.pingedLanes;
    e = e.warmLanes;
    var S = i & 134217727;
    return S !== 0 ? (i = S & ~c, i !== 0 ? s = ya(i) : (m &= S, m !== 0 ? s = ya(m) : n || (n = S & ~e, n !== 0 && (s = ya(n))))) : (S = i & ~c, S !== 0 ? s = ya(S) : m !== 0 ? s = ya(m) : n || (n = i & ~e, n !== 0 && (s = ya(n)))), s === 0 ? 0 : t !== 0 && t !== s && (t & c) === 0 && (c = s & -s, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : s;
  }
  function Hi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Xy(e, t) {
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
  function Ju() {
    var e = al;
    return al <<= 1, (al & 62914560) === 0 && (al = 4194304), e;
  }
  function Xs(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Gi(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ky(e, t, n, i, s, c) {
    var m = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var S = e.entanglements, A = e.expirationTimes, T = e.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var B = 31 - lt(n), q = 1 << B;
      S[B] = 0, A[B] = -1;
      var C = T[B];
      if (C !== null)
        for (T[B] = null, B = 0; B < C.length; B++) {
          var z = C[B];
          z !== null && (z.lane &= -536870913);
        }
      n &= ~q;
    }
    i !== 0 && Wu(e, i, 0), c !== 0 && s === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(m & ~t));
  }
  function Wu(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - lt(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 261930;
  }
  function Fu(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var i = 31 - lt(n), s = 1 << i;
      s & t | e[i] & t && (e[i] |= t), n &= ~s;
    }
  }
  function Pu(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : ks(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function ks(e) {
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
  function Qs(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ed() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Hp(e.type));
  }
  function td(e, t) {
    var n = X.p;
    try {
      return X.p = e, t();
    } finally {
      X.p = n;
    }
  }
  var Ln = Math.random().toString(36).slice(2), ft = "__reactFiber$" + Ln, Et = "__reactProps$" + Ln, Ba = "__reactContainer$" + Ln, Zs = "__reactEvents$" + Ln, Qy = "__reactListeners$" + Ln, Zy = "__reactHandles$" + Ln, nd = "__reactResources$" + Ln, qi = "__reactMarker$" + Ln;
  function Js(e) {
    delete e[ft], delete e[Et], delete e[Zs], delete e[Qy], delete e[Zy];
  }
  function Ha(e) {
    var t = e[ft];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Ba] || n[ft]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = xp(e); e !== null; ) {
            if (n = e[ft]) return n;
            e = xp(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Ga(e) {
    if (e = e[ft] || e[Ba]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ii(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function qa(e) {
    var t = e[nd];
    return t || (t = e[nd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function st(e) {
    e[qi] = !0;
  }
  var ad = /* @__PURE__ */ new Set(), id = {};
  function ga(e, t) {
    Ia(e, t), Ia(e + "Capture", t);
  }
  function Ia(e, t) {
    for (id[e] = t, e = 0; e < t.length; e++)
      ad.add(t[e]);
  }
  var Jy = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), rd = {}, ld = {};
  function Wy(e) {
    return Li.call(ld, e) ? !0 : Li.call(rd, e) ? !1 : Jy.test(e) ? ld[e] = !0 : (rd[e] = !0, !1);
  }
  function rl(e, t, n) {
    if (Wy(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + n);
      }
  }
  function ll(e, t, n) {
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
  function dn(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, "" + i);
    }
  }
  function Vt(e) {
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
  function sd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Fy(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var s = i.get, c = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(m) {
          n = "" + m, c.call(this, m);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
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
  function Ws(e) {
    if (!e._valueTracker) {
      var t = sd(e) ? "checked" : "value";
      e._valueTracker = Fy(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function od(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), i = "";
    return e && (i = sd(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
  }
  function sl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Py = /[\n"\\]/g;
  function Bt(e) {
    return e.replace(
      Py,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fs(e, t, n, i, s, c, m, S) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Vt(t)) : e.value !== "" + Vt(t) && (e.value = "" + Vt(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? Ps(e, m, Vt(t)) : n != null ? Ps(e, m, Vt(n)) : i != null && e.removeAttribute("value"), s == null && c != null && (e.defaultChecked = !!c), s != null && (e.checked = s && typeof s != "function" && typeof s != "symbol"), S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.name = "" + Vt(S) : e.removeAttribute("name");
  }
  function cd(e, t, n, i, s, c, m, S) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        Ws(e);
        return;
      }
      n = n != null ? "" + Vt(n) : "", t = t != null ? "" + Vt(t) : n, S || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? s, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = S ? e.checked : !!i, e.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), Ws(e);
  }
  function Ps(e, t, n) {
    t === "number" && sl(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function Ka(e, t, n, i) {
    if (e = e.options, t) {
      t = {};
      for (var s = 0; s < n.length; s++)
        t["$" + n[s]] = !0;
      for (n = 0; n < e.length; n++)
        s = t.hasOwnProperty("$" + e[n].value), e[n].selected !== s && (e[n].selected = s), s && i && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Vt(n), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === n) {
          e[s].selected = !0, i && (e[s].defaultSelected = !0);
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ud(e, t, n) {
    if (t != null && (t = "" + Vt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Vt(n) : "";
  }
  function dd(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(o(92));
        if (Ne(i)) {
          if (1 < i.length) throw Error(o(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), t = n;
    }
    n = Vt(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i), Ws(e);
  }
  function Ya(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var eg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function fd(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || eg.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function md(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(o(62));
    if (e = e.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var s in t)
        i = t[s], t.hasOwnProperty(s) && n[s] !== i && fd(e, s, i);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && fd(e, c, t[c]);
  }
  function eo(e) {
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
  var tg = /* @__PURE__ */ new Map([
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
  ]), ng = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function ol(e) {
    return ng.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function fn() {
  }
  var to = null;
  function no(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Xa = null, ka = null;
  function pd(e) {
    var t = Ga(e);
    if (t && (e = t.stateNode)) {
      var n = e[Et] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Fs(
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
              'input[name="' + Bt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var s = i[Et] || null;
                if (!s) throw Error(o(90));
                Fs(
                  i,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              i = n[t], i.form === e.form && od(i);
          }
          break e;
        case "textarea":
          ud(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && Ka(e, !!n.multiple, t, !1);
      }
    }
  }
  var ao = !1;
  function hd(e, t, n) {
    if (ao) return e(t, n);
    ao = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (ao = !1, (Xa !== null || ka !== null) && (Zl(), Xa && (t = Xa, e = ka, ka = Xa = null, pd(t), e)))
        for (t = 0; t < e.length; t++) pd(e[t]);
    }
  }
  function Ki(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[Et] || null;
    if (i === null) return null;
    n = i[t];
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
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
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
  var mn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), io = !1;
  if (mn)
    try {
      var Yi = {};
      Object.defineProperty(Yi, "passive", {
        get: function() {
          io = !0;
        }
      }), window.addEventListener("test", Yi, Yi), window.removeEventListener("test", Yi, Yi);
    } catch {
      io = !1;
    }
  var Vn = null, ro = null, cl = null;
  function yd() {
    if (cl) return cl;
    var e, t = ro, n = t.length, i, s = "value" in Vn ? Vn.value : Vn.textContent, c = s.length;
    for (e = 0; e < n && t[e] === s[e]; e++) ;
    var m = n - e;
    for (i = 1; i <= m && t[n - i] === s[c - i]; i++) ;
    return cl = s.slice(e, 1 < i ? 1 - i : void 0);
  }
  function ul(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function dl() {
    return !0;
  }
  function gd() {
    return !1;
  }
  function At(e) {
    function t(n, i, s, c, m) {
      this._reactName = n, this._targetInst = s, this.type = i, this.nativeEvent = c, this.target = m, this.currentTarget = null;
      for (var S in e)
        e.hasOwnProperty(S) && (n = e[S], this[S] = n ? n(c) : c[S]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? dl : gd, this.isPropagationStopped = gd, this;
    }
    return g(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = dl);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = dl);
      },
      persist: function() {
      },
      isPersistent: dl
    }), t;
  }
  var va = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, fl = At(va), Xi = g({}, va, { view: 0, detail: 0 }), ag = At(Xi), lo, so, ki, ml = g({}, Xi, {
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
    getModifierState: co,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== ki && (ki && e.type === "mousemove" ? (lo = e.screenX - ki.screenX, so = e.screenY - ki.screenY) : so = lo = 0, ki = e), lo);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : so;
    }
  }), vd = At(ml), ig = g({}, ml, { dataTransfer: 0 }), rg = At(ig), lg = g({}, Xi, { relatedTarget: 0 }), oo = At(lg), sg = g({}, va, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), og = At(sg), cg = g({}, va, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ug = At(cg), dg = g({}, va, { data: 0 }), bd = At(dg), fg = {
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
  }, mg = {
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
  }, pg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function hg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = pg[e]) ? !!t[e] : !1;
  }
  function co() {
    return hg;
  }
  var yg = g({}, Xi, {
    key: function(e) {
      if (e.key) {
        var t = fg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = ul(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: co,
    charCode: function(e) {
      return e.type === "keypress" ? ul(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? ul(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), gg = At(yg), vg = g({}, ml, {
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
  }), Sd = At(vg), bg = g({}, Xi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: co
  }), Sg = At(bg), _g = g({}, va, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Eg = At(_g), Ag = g({}, ml, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xg = At(Ag), Ng = g({}, va, {
    newState: 0,
    oldState: 0
  }), jg = At(Ng), wg = [9, 13, 27, 32], uo = mn && "CompositionEvent" in window, Qi = null;
  mn && "documentMode" in document && (Qi = document.documentMode);
  var $g = mn && "TextEvent" in window && !Qi, _d = mn && (!uo || Qi && 8 < Qi && 11 >= Qi), Ed = " ", Ad = !1;
  function xd(e, t) {
    switch (e) {
      case "keyup":
        return wg.indexOf(t.keyCode) !== -1;
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
  function Nd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Qa = !1;
  function Tg(e, t) {
    switch (e) {
      case "compositionend":
        return Nd(t);
      case "keypress":
        return t.which !== 32 ? null : (Ad = !0, Ed);
      case "textInput":
        return e = t.data, e === Ed && Ad ? null : e;
      default:
        return null;
    }
  }
  function Dg(e, t) {
    if (Qa)
      return e === "compositionend" || !uo && xd(e, t) ? (e = yd(), cl = ro = Vn = null, Qa = !1, e) : null;
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
        return _d && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Og = {
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
  function jd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Og[e.type] : t === "textarea";
  }
  function wd(e, t, n, i) {
    Xa ? ka ? ka.push(i) : ka = [i] : Xa = i, t = ns(t, "onChange"), 0 < t.length && (n = new fl(
      "onChange",
      "change",
      null,
      n,
      i
    ), e.push({ event: n, listeners: t }));
  }
  var Zi = null, Ji = null;
  function Mg(e) {
    up(e, 0);
  }
  function pl(e) {
    var t = Ii(e);
    if (od(t)) return e;
  }
  function $d(e, t) {
    if (e === "change") return t;
  }
  var Td = !1;
  if (mn) {
    var fo;
    if (mn) {
      var mo = "oninput" in document;
      if (!mo) {
        var Dd = document.createElement("div");
        Dd.setAttribute("oninput", "return;"), mo = typeof Dd.oninput == "function";
      }
      fo = mo;
    } else fo = !1;
    Td = fo && (!document.documentMode || 9 < document.documentMode);
  }
  function Od() {
    Zi && (Zi.detachEvent("onpropertychange", Md), Ji = Zi = null);
  }
  function Md(e) {
    if (e.propertyName === "value" && pl(Ji)) {
      var t = [];
      wd(
        t,
        Ji,
        e,
        no(e)
      ), hd(Mg, t);
    }
  }
  function Cg(e, t, n) {
    e === "focusin" ? (Od(), Zi = t, Ji = n, Zi.attachEvent("onpropertychange", Md)) : e === "focusout" && Od();
  }
  function zg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return pl(Ji);
  }
  function Rg(e, t) {
    if (e === "click") return pl(t);
  }
  function Ug(e, t) {
    if (e === "input" || e === "change")
      return pl(t);
  }
  function Lg(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Dt = typeof Object.is == "function" ? Object.is : Lg;
  function Wi(e, t) {
    if (Dt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var s = n[i];
      if (!Li.call(t, s) || !Dt(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  function Cd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zd(e, t) {
    var n = Cd(e);
    e = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = e + n.textContent.length, e <= t && i >= t)
          return { node: n, offset: t - e };
        e = i;
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
      n = Cd(n);
    }
  }
  function Rd(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Ud(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = sl(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = sl(e.document);
    }
    return t;
  }
  function po(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var Vg = mn && "documentMode" in document && 11 >= document.documentMode, Za = null, ho = null, Fi = null, yo = !1;
  function Ld(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    yo || Za == null || Za !== sl(i) || (i = Za, "selectionStart" in i && po(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Fi && Wi(Fi, i) || (Fi = i, i = ns(ho, "onSelect"), 0 < i.length && (t = new fl(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: i }), t.target = Za)));
  }
  function ba(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Ja = {
    animationend: ba("Animation", "AnimationEnd"),
    animationiteration: ba("Animation", "AnimationIteration"),
    animationstart: ba("Animation", "AnimationStart"),
    transitionrun: ba("Transition", "TransitionRun"),
    transitionstart: ba("Transition", "TransitionStart"),
    transitioncancel: ba("Transition", "TransitionCancel"),
    transitionend: ba("Transition", "TransitionEnd")
  }, go = {}, Vd = {};
  mn && (Vd = document.createElement("div").style, "AnimationEvent" in window || (delete Ja.animationend.animation, delete Ja.animationiteration.animation, delete Ja.animationstart.animation), "TransitionEvent" in window || delete Ja.transitionend.transition);
  function Sa(e) {
    if (go[e]) return go[e];
    if (!Ja[e]) return e;
    var t = Ja[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Vd)
        return go[e] = t[n];
    return e;
  }
  var Bd = Sa("animationend"), Hd = Sa("animationiteration"), Gd = Sa("animationstart"), Bg = Sa("transitionrun"), Hg = Sa("transitionstart"), Gg = Sa("transitioncancel"), qd = Sa("transitionend"), Id = /* @__PURE__ */ new Map(), vo = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vo.push("scrollEnd");
  function Jt(e, t) {
    Id.set(e, t), ga(t, [e]);
  }
  var hl = typeof reportError == "function" ? reportError : function(e) {
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
  }, Ht = [], Wa = 0, bo = 0;
  function yl() {
    for (var e = Wa, t = bo = Wa = 0; t < e; ) {
      var n = Ht[t];
      Ht[t++] = null;
      var i = Ht[t];
      Ht[t++] = null;
      var s = Ht[t];
      Ht[t++] = null;
      var c = Ht[t];
      if (Ht[t++] = null, i !== null && s !== null) {
        var m = i.pending;
        m === null ? s.next = s : (s.next = m.next, m.next = s), i.pending = s;
      }
      c !== 0 && Kd(n, s, c);
    }
  }
  function gl(e, t, n, i) {
    Ht[Wa++] = e, Ht[Wa++] = t, Ht[Wa++] = n, Ht[Wa++] = i, bo |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function So(e, t, n, i) {
    return gl(e, t, n, i), vl(e);
  }
  function _a(e, t) {
    return gl(e, null, null, t), vl(e);
  }
  function Kd(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var s = !1, c = e.return; c !== null; )
      c.childLanes |= n, i = c.alternate, i !== null && (i.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (s = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, s && t !== null && (s = 31 - lt(n), e = c.hiddenUpdates, i = e[s], i === null ? e[s] = [t] : i.push(t), t.lane = n | 536870912), c) : null;
  }
  function vl(e) {
    if (50 < Sr)
      throw Sr = 0, Tc = null, Error(o(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Fa = {};
  function qg(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ot(e, t, n, i) {
    return new qg(e, t, n, i);
  }
  function _o(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function pn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Ot(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Yd(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function bl(e, t, n, i, s, c) {
    var m = 0;
    if (i = e, typeof e == "function") _o(e) && (m = 1);
    else if (typeof e == "string")
      m = kv(
        e,
        n,
        te.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ce:
          return e = Ot(31, n, t, s), e.elementType = ce, e.lanes = c, e;
        case x:
          return Ea(n.children, s, c, t);
        case I:
          m = 8, s |= 24;
          break;
        case M:
          return e = Ot(12, n, t, s | 2), e.elementType = M, e.lanes = c, e;
        case Z:
          return e = Ot(13, n, t, s), e.elementType = Z, e.lanes = c, e;
        case ae:
          return e = Ot(19, n, t, s), e.elementType = ae, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Y:
                m = 10;
                break e;
              case L:
                m = 9;
                break e;
              case ie:
                m = 11;
                break e;
              case G:
                m = 14;
                break e;
              case se:
                m = 16, i = null;
                break e;
            }
          m = 29, n = Error(
            o(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = Ot(m, n, t, s), t.elementType = e, t.type = i, t.lanes = c, t;
  }
  function Ea(e, t, n, i) {
    return e = Ot(7, e, i, t), e.lanes = n, e;
  }
  function Eo(e, t, n) {
    return e = Ot(6, e, null, t), e.lanes = n, e;
  }
  function Xd(e) {
    var t = Ot(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function Ao(e, t, n) {
    return t = Ot(
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
  var kd = /* @__PURE__ */ new WeakMap();
  function Gt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = kd.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: Ui(t)
      }, kd.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: Ui(t)
    };
  }
  var Pa = [], ei = 0, Sl = null, Pi = 0, qt = [], It = 0, Bn = null, nn = 1, an = "";
  function hn(e, t) {
    Pa[ei++] = Pi, Pa[ei++] = Sl, Sl = e, Pi = t;
  }
  function Qd(e, t, n) {
    qt[It++] = nn, qt[It++] = an, qt[It++] = Bn, Bn = e;
    var i = nn;
    e = an;
    var s = 32 - lt(i) - 1;
    i &= ~(1 << s), n += 1;
    var c = 32 - lt(t) + s;
    if (30 < c) {
      var m = s - s % 5;
      c = (i & (1 << m) - 1).toString(32), i >>= m, s -= m, nn = 1 << 32 - lt(t) + s | n << s | i, an = c + e;
    } else
      nn = 1 << c | n << s | i, an = e;
  }
  function xo(e) {
    e.return !== null && (hn(e, 1), Qd(e, 1, 0));
  }
  function No(e) {
    for (; e === Sl; )
      Sl = Pa[--ei], Pa[ei] = null, Pi = Pa[--ei], Pa[ei] = null;
    for (; e === Bn; )
      Bn = qt[--It], qt[It] = null, an = qt[--It], qt[It] = null, nn = qt[--It], qt[It] = null;
  }
  function Zd(e, t) {
    qt[It++] = nn, qt[It++] = an, qt[It++] = Bn, nn = t.id, an = t.overflow, Bn = e;
  }
  var mt = null, qe = null, je = !1, Hn = null, Kt = !1, jo = Error(o(519));
  function Gn(e) {
    var t = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw er(Gt(t, e)), jo;
  }
  function Jd(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[ft] = e, t[Et] = i, n) {
      case "dialog":
        Ee("cancel", t), Ee("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ee("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Er.length; n++)
          Ee(Er[n], t);
        break;
      case "source":
        Ee("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ee("error", t), Ee("load", t);
        break;
      case "details":
        Ee("toggle", t);
        break;
      case "input":
        Ee("invalid", t), cd(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        Ee("invalid", t);
        break;
      case "textarea":
        Ee("invalid", t), dd(t, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || pp(t.textContent, n) ? (i.popover != null && (Ee("beforetoggle", t), Ee("toggle", t)), i.onScroll != null && Ee("scroll", t), i.onScrollEnd != null && Ee("scrollend", t), i.onClick != null && (t.onclick = fn), t = !0) : t = !1, t || Gn(e, !0);
  }
  function Wd(e) {
    for (mt = e.return; mt; )
      switch (mt.tag) {
        case 5:
        case 31:
        case 13:
          Kt = !1;
          return;
        case 27:
        case 3:
          Kt = !0;
          return;
        default:
          mt = mt.return;
      }
  }
  function ti(e) {
    if (e !== mt) return !1;
    if (!je) return Wd(e), je = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Kc(e.type, e.memoizedProps)), n = !n), n && qe && Gn(e), Wd(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      qe = Ap(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(317));
      qe = Ap(e);
    } else
      t === 27 ? (t = qe, ta(e.type) ? (e = Zc, Zc = null, qe = e) : qe = t) : qe = mt ? Xt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Aa() {
    qe = mt = null, je = !1;
  }
  function wo() {
    var e = Hn;
    return e !== null && (wt === null ? wt = e : wt.push.apply(
      wt,
      e
    ), Hn = null), e;
  }
  function er(e) {
    Hn === null ? Hn = [e] : Hn.push(e);
  }
  var $o = E(null), xa = null, yn = null;
  function qn(e, t, n) {
    W($o, t._currentValue), t._currentValue = n;
  }
  function gn(e) {
    e._currentValue = $o.current, V($o);
  }
  function To(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Do(e, t, n, i) {
    var s = e.child;
    for (s !== null && (s.return = e); s !== null; ) {
      var c = s.dependencies;
      if (c !== null) {
        var m = s.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var S = c;
          c = s;
          for (var A = 0; A < t.length; A++)
            if (S.context === t[A]) {
              c.lanes |= n, S = c.alternate, S !== null && (S.lanes |= n), To(
                c.return,
                n,
                e
              ), i || (m = null);
              break e;
            }
          c = S.next;
        }
      } else if (s.tag === 18) {
        if (m = s.return, m === null) throw Error(o(341));
        m.lanes |= n, c = m.alternate, c !== null && (c.lanes |= n), To(m, n, e), m = null;
      } else m = s.child;
      if (m !== null) m.return = s;
      else
        for (m = s; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (s = m.sibling, s !== null) {
            s.return = m.return, m = s;
            break;
          }
          m = m.return;
        }
      s = m;
    }
  }
  function ni(e, t, n, i) {
    e = null;
    for (var s = t, c = !1; s !== null; ) {
      if (!c) {
        if ((s.flags & 524288) !== 0) c = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var m = s.alternate;
        if (m === null) throw Error(o(387));
        if (m = m.memoizedProps, m !== null) {
          var S = s.type;
          Dt(s.pendingProps.value, m.value) || (e !== null ? e.push(S) : e = [S]);
        }
      } else if (s === Te.current) {
        if (m = s.alternate, m === null) throw Error(o(387));
        m.memoizedState.memoizedState !== s.memoizedState.memoizedState && (e !== null ? e.push(wr) : e = [wr]);
      }
      s = s.return;
    }
    e !== null && Do(
      t,
      e,
      n,
      i
    ), t.flags |= 262144;
  }
  function _l(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Dt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Na(e) {
    xa = e, yn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function pt(e) {
    return Fd(xa, e);
  }
  function El(e, t) {
    return xa === null && Na(e), Fd(e, t);
  }
  function Fd(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, yn === null) {
      if (e === null) throw Error(o(308));
      yn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else yn = yn.next = t;
    return n;
  }
  var Ig = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, Kg = a.unstable_scheduleCallback, Yg = a.unstable_NormalPriority, et = {
    $$typeof: Y,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Oo() {
    return {
      controller: new Ig(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function tr(e) {
    e.refCount--, e.refCount === 0 && Kg(Yg, function() {
      e.controller.abort();
    });
  }
  var nr = null, Mo = 0, ai = 0, ii = null;
  function Xg(e, t) {
    if (nr === null) {
      var n = nr = [];
      Mo = 0, ai = Rc(), ii = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return Mo++, t.then(Pd, Pd), t;
  }
  function Pd() {
    if (--Mo === 0 && nr !== null) {
      ii !== null && (ii.status = "fulfilled");
      var e = nr;
      nr = null, ai = 0, ii = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function kg(e, t) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var s = 0; s < n.length; s++) (0, n[s])(t);
      },
      function(s) {
        for (i.status = "rejected", i.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), i;
  }
  var ef = D.S;
  D.S = function(e, t) {
    Vm = bt(), typeof t == "object" && t !== null && typeof t.then == "function" && Xg(e, t), ef !== null && ef(e, t);
  };
  var ja = E(null);
  function Co() {
    var e = ja.current;
    return e !== null ? e : He.pooledCache;
  }
  function Al(e, t) {
    t === null ? W(ja, ja.current) : W(ja, t.pool);
  }
  function tf() {
    var e = Co();
    return e === null ? null : { parent: et._currentValue, pool: e };
  }
  var ri = Error(o(460)), zo = Error(o(474)), xl = Error(o(542)), Nl = { then: function() {
  } };
  function nf(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function af(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(fn, fn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, lf(e), e;
      default:
        if (typeof t.status == "string") t.then(fn, fn);
        else {
          if (e = He, e !== null && 100 < e.shellSuspendCounter)
            throw Error(o(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var s = t;
                s.status = "fulfilled", s.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var s = t;
                s.status = "rejected", s.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, lf(e), e;
        }
        throw $a = t, ri;
    }
  }
  function wa(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? ($a = n, ri) : n;
    }
  }
  var $a = null;
  function rf() {
    if ($a === null) throw Error(o(459));
    var e = $a;
    return $a = null, e;
  }
  function lf(e) {
    if (e === ri || e === xl)
      throw Error(o(483));
  }
  var li = null, ar = 0;
  function jl(e) {
    var t = ar;
    return ar += 1, li === null && (li = []), af(li, e, t);
  }
  function ir(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function wl(e, t) {
    throw t.$$typeof === _ ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(
      o(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function sf(e) {
    function t(w, N) {
      if (e) {
        var $ = w.deletions;
        $ === null ? (w.deletions = [N], w.flags |= 16) : $.push(N);
      }
    }
    function n(w, N) {
      if (!e) return null;
      for (; N !== null; )
        t(w, N), N = N.sibling;
      return null;
    }
    function i(w) {
      for (var N = /* @__PURE__ */ new Map(); w !== null; )
        w.key !== null ? N.set(w.key, w) : N.set(w.index, w), w = w.sibling;
      return N;
    }
    function s(w, N) {
      return w = pn(w, N), w.index = 0, w.sibling = null, w;
    }
    function c(w, N, $) {
      return w.index = $, e ? ($ = w.alternate, $ !== null ? ($ = $.index, $ < N ? (w.flags |= 67108866, N) : $) : (w.flags |= 67108866, N)) : (w.flags |= 1048576, N);
    }
    function m(w) {
      return e && w.alternate === null && (w.flags |= 67108866), w;
    }
    function S(w, N, $, H) {
      return N === null || N.tag !== 6 ? (N = Eo($, w.mode, H), N.return = w, N) : (N = s(N, $), N.return = w, N);
    }
    function A(w, N, $, H) {
      var le = $.type;
      return le === x ? B(
        w,
        N,
        $.props.children,
        H,
        $.key
      ) : N !== null && (N.elementType === le || typeof le == "object" && le !== null && le.$$typeof === se && wa(le) === N.type) ? (N = s(N, $.props), ir(N, $), N.return = w, N) : (N = bl(
        $.type,
        $.key,
        $.props,
        null,
        w.mode,
        H
      ), ir(N, $), N.return = w, N);
    }
    function T(w, N, $, H) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== $.containerInfo || N.stateNode.implementation !== $.implementation ? (N = Ao($, w.mode, H), N.return = w, N) : (N = s(N, $.children || []), N.return = w, N);
    }
    function B(w, N, $, H, le) {
      return N === null || N.tag !== 7 ? (N = Ea(
        $,
        w.mode,
        H,
        le
      ), N.return = w, N) : (N = s(N, $), N.return = w, N);
    }
    function q(w, N, $) {
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return N = Eo(
          "" + N,
          w.mode,
          $
        ), N.return = w, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case j:
            return $ = bl(
              N.type,
              N.key,
              N.props,
              null,
              w.mode,
              $
            ), ir($, N), $.return = w, $;
          case R:
            return N = Ao(
              N,
              w.mode,
              $
            ), N.return = w, N;
          case se:
            return N = wa(N), q(w, N, $);
        }
        if (Ne(N) || oe(N))
          return N = Ea(
            N,
            w.mode,
            $,
            null
          ), N.return = w, N;
        if (typeof N.then == "function")
          return q(w, jl(N), $);
        if (N.$$typeof === Y)
          return q(
            w,
            El(w, N),
            $
          );
        wl(w, N);
      }
      return null;
    }
    function C(w, N, $, H) {
      var le = N !== null ? N.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return le !== null ? null : S(w, N, "" + $, H);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case j:
            return $.key === le ? A(w, N, $, H) : null;
          case R:
            return $.key === le ? T(w, N, $, H) : null;
          case se:
            return $ = wa($), C(w, N, $, H);
        }
        if (Ne($) || oe($))
          return le !== null ? null : B(w, N, $, H, null);
        if (typeof $.then == "function")
          return C(
            w,
            N,
            jl($),
            H
          );
        if ($.$$typeof === Y)
          return C(
            w,
            N,
            El(w, $),
            H
          );
        wl(w, $);
      }
      return null;
    }
    function z(w, N, $, H, le) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return w = w.get($) || null, S(N, w, "" + H, le);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case j:
            return w = w.get(
              H.key === null ? $ : H.key
            ) || null, A(N, w, H, le);
          case R:
            return w = w.get(
              H.key === null ? $ : H.key
            ) || null, T(N, w, H, le);
          case se:
            return H = wa(H), z(
              w,
              N,
              $,
              H,
              le
            );
        }
        if (Ne(H) || oe(H))
          return w = w.get($) || null, B(N, w, H, le, null);
        if (typeof H.then == "function")
          return z(
            w,
            N,
            $,
            jl(H),
            le
          );
        if (H.$$typeof === Y)
          return z(
            w,
            N,
            $,
            El(N, H),
            le
          );
        wl(N, H);
      }
      return null;
    }
    function P(w, N, $, H) {
      for (var le = null, De = null, ne = N, be = N = 0, xe = null; ne !== null && be < $.length; be++) {
        ne.index > be ? (xe = ne, ne = null) : xe = ne.sibling;
        var Oe = C(
          w,
          ne,
          $[be],
          H
        );
        if (Oe === null) {
          ne === null && (ne = xe);
          break;
        }
        e && ne && Oe.alternate === null && t(w, ne), N = c(Oe, N, be), De === null ? le = Oe : De.sibling = Oe, De = Oe, ne = xe;
      }
      if (be === $.length)
        return n(w, ne), je && hn(w, be), le;
      if (ne === null) {
        for (; be < $.length; be++)
          ne = q(w, $[be], H), ne !== null && (N = c(
            ne,
            N,
            be
          ), De === null ? le = ne : De.sibling = ne, De = ne);
        return je && hn(w, be), le;
      }
      for (ne = i(ne); be < $.length; be++)
        xe = z(
          ne,
          w,
          be,
          $[be],
          H
        ), xe !== null && (e && xe.alternate !== null && ne.delete(
          xe.key === null ? be : xe.key
        ), N = c(
          xe,
          N,
          be
        ), De === null ? le = xe : De.sibling = xe, De = xe);
      return e && ne.forEach(function(la) {
        return t(w, la);
      }), je && hn(w, be), le;
    }
    function ue(w, N, $, H) {
      if ($ == null) throw Error(o(151));
      for (var le = null, De = null, ne = N, be = N = 0, xe = null, Oe = $.next(); ne !== null && !Oe.done; be++, Oe = $.next()) {
        ne.index > be ? (xe = ne, ne = null) : xe = ne.sibling;
        var la = C(w, ne, Oe.value, H);
        if (la === null) {
          ne === null && (ne = xe);
          break;
        }
        e && ne && la.alternate === null && t(w, ne), N = c(la, N, be), De === null ? le = la : De.sibling = la, De = la, ne = xe;
      }
      if (Oe.done)
        return n(w, ne), je && hn(w, be), le;
      if (ne === null) {
        for (; !Oe.done; be++, Oe = $.next())
          Oe = q(w, Oe.value, H), Oe !== null && (N = c(Oe, N, be), De === null ? le = Oe : De.sibling = Oe, De = Oe);
        return je && hn(w, be), le;
      }
      for (ne = i(ne); !Oe.done; be++, Oe = $.next())
        Oe = z(ne, w, be, Oe.value, H), Oe !== null && (e && Oe.alternate !== null && ne.delete(Oe.key === null ? be : Oe.key), N = c(Oe, N, be), De === null ? le = Oe : De.sibling = Oe, De = Oe);
      return e && ne.forEach(function(ib) {
        return t(w, ib);
      }), je && hn(w, be), le;
    }
    function Ve(w, N, $, H) {
      if (typeof $ == "object" && $ !== null && $.type === x && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case j:
            e: {
              for (var le = $.key; N !== null; ) {
                if (N.key === le) {
                  if (le = $.type, le === x) {
                    if (N.tag === 7) {
                      n(
                        w,
                        N.sibling
                      ), H = s(
                        N,
                        $.props.children
                      ), H.return = w, w = H;
                      break e;
                    }
                  } else if (N.elementType === le || typeof le == "object" && le !== null && le.$$typeof === se && wa(le) === N.type) {
                    n(
                      w,
                      N.sibling
                    ), H = s(N, $.props), ir(H, $), H.return = w, w = H;
                    break e;
                  }
                  n(w, N);
                  break;
                } else t(w, N);
                N = N.sibling;
              }
              $.type === x ? (H = Ea(
                $.props.children,
                w.mode,
                H,
                $.key
              ), H.return = w, w = H) : (H = bl(
                $.type,
                $.key,
                $.props,
                null,
                w.mode,
                H
              ), ir(H, $), H.return = w, w = H);
            }
            return m(w);
          case R:
            e: {
              for (le = $.key; N !== null; ) {
                if (N.key === le)
                  if (N.tag === 4 && N.stateNode.containerInfo === $.containerInfo && N.stateNode.implementation === $.implementation) {
                    n(
                      w,
                      N.sibling
                    ), H = s(N, $.children || []), H.return = w, w = H;
                    break e;
                  } else {
                    n(w, N);
                    break;
                  }
                else t(w, N);
                N = N.sibling;
              }
              H = Ao($, w.mode, H), H.return = w, w = H;
            }
            return m(w);
          case se:
            return $ = wa($), Ve(
              w,
              N,
              $,
              H
            );
        }
        if (Ne($))
          return P(
            w,
            N,
            $,
            H
          );
        if (oe($)) {
          if (le = oe($), typeof le != "function") throw Error(o(150));
          return $ = le.call($), ue(
            w,
            N,
            $,
            H
          );
        }
        if (typeof $.then == "function")
          return Ve(
            w,
            N,
            jl($),
            H
          );
        if ($.$$typeof === Y)
          return Ve(
            w,
            N,
            El(w, $),
            H
          );
        wl(w, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint" ? ($ = "" + $, N !== null && N.tag === 6 ? (n(w, N.sibling), H = s(N, $), H.return = w, w = H) : (n(w, N), H = Eo($, w.mode, H), H.return = w, w = H), m(w)) : n(w, N);
    }
    return function(w, N, $, H) {
      try {
        ar = 0;
        var le = Ve(
          w,
          N,
          $,
          H
        );
        return li = null, le;
      } catch (ne) {
        if (ne === ri || ne === xl) throw ne;
        var De = Ot(29, ne, null, w.mode);
        return De.lanes = H, De.return = w, De;
      } finally {
      }
    };
  }
  var Ta = sf(!0), of = sf(!1), In = !1;
  function Ro(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Uo(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Kn(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Yn(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Me & 2) !== 0) {
      var s = i.pending;
      return s === null ? t.next = t : (t.next = s.next, s.next = t), i.pending = t, t = vl(e), Kd(e, null, n), t;
    }
    return gl(e, i, t, n), vl(e);
  }
  function rr(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Fu(e, n);
    }
  }
  function Lo(e, t) {
    var n = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var s = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? s = c = m : c = c.next = m, n = n.next;
        } while (n !== null);
        c === null ? s = c = t : c = c.next = t;
      } else s = c = t;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Vo = !1;
  function lr() {
    if (Vo) {
      var e = ii;
      if (e !== null) throw e;
    }
  }
  function sr(e, t, n, i) {
    Vo = !1;
    var s = e.updateQueue;
    In = !1;
    var c = s.firstBaseUpdate, m = s.lastBaseUpdate, S = s.shared.pending;
    if (S !== null) {
      s.shared.pending = null;
      var A = S, T = A.next;
      A.next = null, m === null ? c = T : m.next = T, m = A;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, S = B.lastBaseUpdate, S !== m && (S === null ? B.firstBaseUpdate = T : S.next = T, B.lastBaseUpdate = A));
    }
    if (c !== null) {
      var q = s.baseState;
      m = 0, B = T = A = null, S = c;
      do {
        var C = S.lane & -536870913, z = C !== S.lane;
        if (z ? (Ae & C) === C : (i & C) === C) {
          C !== 0 && C === ai && (Vo = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: S.tag,
            payload: S.payload,
            callback: null,
            next: null
          });
          e: {
            var P = e, ue = S;
            C = t;
            var Ve = n;
            switch (ue.tag) {
              case 1:
                if (P = ue.payload, typeof P == "function") {
                  q = P.call(Ve, q, C);
                  break e;
                }
                q = P;
                break e;
              case 3:
                P.flags = P.flags & -65537 | 128;
              case 0:
                if (P = ue.payload, C = typeof P == "function" ? P.call(Ve, q, C) : P, C == null) break e;
                q = g({}, q, C);
                break e;
              case 2:
                In = !0;
            }
          }
          C = S.callback, C !== null && (e.flags |= 64, z && (e.flags |= 8192), z = s.callbacks, z === null ? s.callbacks = [C] : z.push(C));
        } else
          z = {
            lane: C,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null
          }, B === null ? (T = B = z, A = q) : B = B.next = z, m |= C;
        if (S = S.next, S === null) {
          if (S = s.shared.pending, S === null)
            break;
          z = S, S = z.next, z.next = null, s.lastBaseUpdate = z, s.shared.pending = null;
        }
      } while (!0);
      B === null && (A = q), s.baseState = A, s.firstBaseUpdate = T, s.lastBaseUpdate = B, c === null && (s.shared.lanes = 0), Jn |= m, e.lanes = m, e.memoizedState = q;
    }
  }
  function cf(e, t) {
    if (typeof e != "function")
      throw Error(o(191, e));
    e.call(t);
  }
  function uf(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        cf(n[e], t);
  }
  var si = E(null), $l = E(0);
  function df(e, t) {
    e = jn, W($l, e), W(si, t), jn = e | t.baseLanes;
  }
  function Bo() {
    W($l, jn), W(si, si.current);
  }
  function Ho() {
    jn = $l.current, V(si), V($l);
  }
  var Mt = E(null), Yt = null;
  function Xn(e) {
    var t = e.alternate;
    W(We, We.current & 1), W(Mt, e), Yt === null && (t === null || si.current !== null || t.memoizedState !== null) && (Yt = e);
  }
  function Go(e) {
    W(We, We.current), W(Mt, e), Yt === null && (Yt = e);
  }
  function ff(e) {
    e.tag === 22 ? (W(We, We.current), W(Mt, e), Yt === null && (Yt = e)) : kn();
  }
  function kn() {
    W(We, We.current), W(Mt, Mt.current);
  }
  function Ct(e) {
    V(Mt), Yt === e && (Yt = null), V(We);
  }
  var We = E(0);
  function Tl(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || kc(n) || Qc(n)))
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
  var vn = 0, ye = null, Ue = null, tt = null, Dl = !1, oi = !1, Da = !1, Ol = 0, or = 0, ci = null, Qg = 0;
  function Qe() {
    throw Error(o(321));
  }
  function qo(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Dt(e[n], t[n])) return !1;
    return !0;
  }
  function Io(e, t, n, i, s, c) {
    return vn = c, ye = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? Zf : ic, Da = !1, c = n(i, s), Da = !1, oi && (c = pf(
      t,
      n,
      i,
      s
    )), mf(e), c;
  }
  function mf(e) {
    D.H = dr;
    var t = Ue !== null && Ue.next !== null;
    if (vn = 0, tt = Ue = ye = null, Dl = !1, or = 0, ci = null, t) throw Error(o(300));
    e === null || nt || (e = e.dependencies, e !== null && _l(e) && (nt = !0));
  }
  function pf(e, t, n, i) {
    ye = e;
    var s = 0;
    do {
      if (oi && (ci = null), or = 0, oi = !1, 25 <= s) throw Error(o(301));
      if (s += 1, tt = Ue = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      D.H = Jf, c = t(n, i);
    } while (oi);
    return c;
  }
  function Zg() {
    var e = D.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? cr(t) : t, e = e.useState()[0], (Ue !== null ? Ue.memoizedState : null) !== e && (ye.flags |= 1024), t;
  }
  function Ko() {
    var e = Ol !== 0;
    return Ol = 0, e;
  }
  function Yo(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Xo(e) {
    if (Dl) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Dl = !1;
    }
    vn = 0, tt = Ue = ye = null, oi = !1, or = Ol = 0, ci = null;
  }
  function St() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return tt === null ? ye.memoizedState = tt = e : tt = tt.next = e, tt;
  }
  function Fe() {
    if (Ue === null) {
      var e = ye.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ue.next;
    var t = tt === null ? ye.memoizedState : tt.next;
    if (t !== null)
      tt = t, Ue = e;
    else {
      if (e === null)
        throw ye.alternate === null ? Error(o(467)) : Error(o(310));
      Ue = e, e = {
        memoizedState: Ue.memoizedState,
        baseState: Ue.baseState,
        baseQueue: Ue.baseQueue,
        queue: Ue.queue,
        next: null
      }, tt === null ? ye.memoizedState = tt = e : tt = tt.next = e;
    }
    return tt;
  }
  function Ml() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function cr(e) {
    var t = or;
    return or += 1, ci === null && (ci = []), e = af(ci, e, t), t = ye, (tt === null ? t.memoizedState : tt.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? Zf : ic), e;
  }
  function Cl(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return cr(e);
      if (e.$$typeof === Y) return pt(e);
    }
    throw Error(o(438, String(e)));
  }
  function ko(e) {
    var t = null, n = ye.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = ye.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Ml(), ye.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
        n[i] = U;
    return t.index++, n;
  }
  function bn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function zl(e) {
    var t = Fe();
    return Qo(t, Ue, e);
  }
  function Qo(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(o(311));
    i.lastRenderedReducer = n;
    var s = e.baseQueue, c = i.pending;
    if (c !== null) {
      if (s !== null) {
        var m = s.next;
        s.next = c.next, c.next = m;
      }
      t.baseQueue = s = c, i.pending = null;
    }
    if (c = e.baseState, s === null) e.memoizedState = c;
    else {
      t = s.next;
      var S = m = null, A = null, T = t, B = !1;
      do {
        var q = T.lane & -536870913;
        if (q !== T.lane ? (Ae & q) === q : (vn & q) === q) {
          var C = T.revertLane;
          if (C === 0)
            A !== null && (A = A.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), q === ai && (B = !0);
          else if ((vn & C) === C) {
            T = T.next, C === ai && (B = !0);
            continue;
          } else
            q = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, A === null ? (S = A = q, m = c) : A = A.next = q, ye.lanes |= C, Jn |= C;
          q = T.action, Da && n(c, q), c = T.hasEagerState ? T.eagerState : n(c, q);
        } else
          C = {
            lane: q,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, A === null ? (S = A = C, m = c) : A = A.next = C, ye.lanes |= q, Jn |= q;
        T = T.next;
      } while (T !== null && T !== t);
      if (A === null ? m = c : A.next = S, !Dt(c, e.memoizedState) && (nt = !0, B && (n = ii, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = m, e.baseQueue = A, i.lastRenderedState = c;
    }
    return s === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Zo(e) {
    var t = Fe(), n = t.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, s = n.pending, c = t.memoizedState;
    if (s !== null) {
      n.pending = null;
      var m = s = s.next;
      do
        c = e(c, m.action), m = m.next;
      while (m !== s);
      Dt(c, t.memoizedState) || (nt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, i];
  }
  function hf(e, t, n) {
    var i = ye, s = Fe(), c = je;
    if (c) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = t();
    var m = !Dt(
      (Ue || s).memoizedState,
      n
    );
    if (m && (s.memoizedState = n, nt = !0), s = s.queue, Fo(vf.bind(null, i, s, e), [
      e
    ]), s.getSnapshot !== t || m || tt !== null && tt.memoizedState.tag & 1) {
      if (i.flags |= 2048, ui(
        9,
        { destroy: void 0 },
        gf.bind(
          null,
          i,
          s,
          n,
          t
        ),
        null
      ), He === null) throw Error(o(349));
      c || (vn & 127) !== 0 || yf(i, t, n);
    }
    return n;
  }
  function yf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = ye.updateQueue, t === null ? (t = Ml(), ye.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function gf(e, t, n, i) {
    t.value = n, t.getSnapshot = i, bf(t) && Sf(e);
  }
  function vf(e, t, n) {
    return n(function() {
      bf(t) && Sf(e);
    });
  }
  function bf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Dt(e, n);
    } catch {
      return !0;
    }
  }
  function Sf(e) {
    var t = _a(e, 2);
    t !== null && $t(t, e, 2);
  }
  function Jo(e) {
    var t = St();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Da) {
        ke(!0);
        try {
          n();
        } finally {
          ke(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bn,
      lastRenderedState: e
    }, t;
  }
  function _f(e, t, n, i) {
    return e.baseState = n, Qo(
      e,
      Ue,
      typeof i == "function" ? i : bn
    );
  }
  function Jg(e, t, n, i, s) {
    if (Ll(e)) throw Error(o(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: s,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          c.listeners.push(m);
        }
      };
      D.T !== null ? n(!0) : c.isTransition = !1, i(c), n = t.pending, n === null ? (c.next = t.pending = c, Ef(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function Ef(e, t) {
    var n = t.action, i = t.payload, s = e.state;
    if (t.isTransition) {
      var c = D.T, m = {};
      D.T = m;
      try {
        var S = n(s, i), A = D.S;
        A !== null && A(m, S), Af(e, t, S);
      } catch (T) {
        Wo(e, t, T);
      } finally {
        c !== null && m.types !== null && (c.types = m.types), D.T = c;
      }
    } else
      try {
        c = n(s, i), Af(e, t, c);
      } catch (T) {
        Wo(e, t, T);
      }
  }
  function Af(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        xf(e, t, i);
      },
      function(i) {
        return Wo(e, t, i);
      }
    ) : xf(e, t, n);
  }
  function xf(e, t, n) {
    t.status = "fulfilled", t.value = n, Nf(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ef(e, n)));
  }
  function Wo(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, Nf(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Nf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function jf(e, t) {
    return t;
  }
  function wf(e, t) {
    if (je) {
      var n = He.formState;
      if (n !== null) {
        e: {
          var i = ye;
          if (je) {
            if (qe) {
              t: {
                for (var s = qe, c = Kt; s.nodeType !== 8; ) {
                  if (!c) {
                    s = null;
                    break t;
                  }
                  if (s = Xt(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break t;
                  }
                }
                c = s.data, s = c === "F!" || c === "F" ? s : null;
              }
              if (s) {
                qe = Xt(
                  s.nextSibling
                ), i = s.data === "F!";
                break e;
              }
            }
            Gn(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return n = St(), n.memoizedState = n.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jf,
      lastRenderedState: t
    }, n.queue = i, n = Xf.bind(
      null,
      ye,
      i
    ), i.dispatch = n, i = Jo(!1), c = ac.bind(
      null,
      ye,
      !1,
      i.queue
    ), i = St(), s = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = s, n = Jg.bind(
      null,
      ye,
      s,
      c,
      n
    ), s.dispatch = n, i.memoizedState = e, [t, n, !1];
  }
  function $f(e) {
    var t = Fe();
    return Tf(t, Ue, e);
  }
  function Tf(e, t, n) {
    if (t = Qo(
      e,
      t,
      jf
    )[0], e = zl(bn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = cr(t);
      } catch (m) {
        throw m === ri ? xl : m;
      }
    else i = t;
    t = Fe();
    var s = t.queue, c = s.dispatch;
    return n !== t.memoizedState && (ye.flags |= 2048, ui(
      9,
      { destroy: void 0 },
      Wg.bind(null, s, n),
      null
    )), [i, c, e];
  }
  function Wg(e, t) {
    e.action = t;
  }
  function Df(e) {
    var t = Fe(), n = Ue;
    if (n !== null)
      return Tf(t, n, e);
    Fe(), t = t.memoizedState, n = Fe();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, !1];
  }
  function ui(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = ye.updateQueue, t === null && (t = Ml(), ye.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Of() {
    return Fe().memoizedState;
  }
  function Rl(e, t, n, i) {
    var s = St();
    ye.flags |= e, s.memoizedState = ui(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function Ul(e, t, n, i) {
    var s = Fe();
    i = i === void 0 ? null : i;
    var c = s.memoizedState.inst;
    Ue !== null && i !== null && qo(i, Ue.memoizedState.deps) ? s.memoizedState = ui(t, c, n, i) : (ye.flags |= e, s.memoizedState = ui(
      1 | t,
      c,
      n,
      i
    ));
  }
  function Mf(e, t) {
    Rl(8390656, 8, e, t);
  }
  function Fo(e, t) {
    Ul(2048, 8, e, t);
  }
  function Fg(e) {
    ye.flags |= 4;
    var t = ye.updateQueue;
    if (t === null)
      t = Ml(), ye.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Cf(e) {
    var t = Fe().memoizedState;
    return Fg({ ref: t, nextImpl: e }), function() {
      if ((Me & 2) !== 0) throw Error(o(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function zf(e, t) {
    return Ul(4, 2, e, t);
  }
  function Rf(e, t) {
    return Ul(4, 4, e, t);
  }
  function Uf(e, t) {
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
  function Lf(e, t, n) {
    n = n != null ? n.concat([e]) : null, Ul(4, 4, Uf.bind(null, t, e), n);
  }
  function Po() {
  }
  function Vf(e, t) {
    var n = Fe();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && qo(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function Bf(e, t) {
    var n = Fe();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && qo(t, i[1]))
      return i[0];
    if (i = e(), Da) {
      ke(!0);
      try {
        e();
      } finally {
        ke(!1);
      }
    }
    return n.memoizedState = [i, t], i;
  }
  function ec(e, t, n) {
    return n === void 0 || (vn & 1073741824) !== 0 && (Ae & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = Hm(), ye.lanes |= e, Jn |= e, n);
  }
  function Hf(e, t, n, i) {
    return Dt(n, t) ? n : si.current !== null ? (e = ec(e, n, i), Dt(e, t) || (nt = !0), e) : (vn & 42) === 0 || (vn & 1073741824) !== 0 && (Ae & 261930) === 0 ? (nt = !0, e.memoizedState = n) : (e = Hm(), ye.lanes |= e, Jn |= e, t);
  }
  function Gf(e, t, n, i, s) {
    var c = X.p;
    X.p = c !== 0 && 8 > c ? c : 8;
    var m = D.T, S = {};
    D.T = S, ac(e, !1, t, n);
    try {
      var A = s(), T = D.S;
      if (T !== null && T(S, A), A !== null && typeof A == "object" && typeof A.then == "function") {
        var B = kg(
          A,
          i
        );
        ur(
          e,
          t,
          B,
          Ut(e)
        );
      } else
        ur(
          e,
          t,
          i,
          Ut(e)
        );
    } catch (q) {
      ur(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: q },
        Ut()
      );
    } finally {
      X.p = c, m !== null && S.types !== null && (m.types = S.types), D.T = m;
    }
  }
  function Pg() {
  }
  function tc(e, t, n, i) {
    if (e.tag !== 5) throw Error(o(476));
    var s = qf(e).queue;
    Gf(
      e,
      s,
      t,
      O,
      n === null ? Pg : function() {
        return If(e), n(i);
      }
    );
  }
  function qf(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: O,
      baseState: O,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: bn,
        lastRenderedState: O
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
        lastRenderedReducer: bn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function If(e) {
    var t = qf(e);
    t.next === null && (t = e.alternate.memoizedState), ur(
      e,
      t.next.queue,
      {},
      Ut()
    );
  }
  function nc() {
    return pt(wr);
  }
  function Kf() {
    return Fe().memoizedState;
  }
  function Yf() {
    return Fe().memoizedState;
  }
  function ev(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = Ut();
          e = Kn(n);
          var i = Yn(t, e, n);
          i !== null && ($t(i, t, n), rr(i, t, n)), t = { cache: Oo() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function tv(e, t, n) {
    var i = Ut();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ll(e) ? kf(t, n) : (n = So(e, t, n, i), n !== null && ($t(n, e, i), Qf(n, t, i)));
  }
  function Xf(e, t, n) {
    var i = Ut();
    ur(e, t, n, i);
  }
  function ur(e, t, n, i) {
    var s = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ll(e)) kf(t, s);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var m = t.lastRenderedState, S = c(m, n);
          if (s.hasEagerState = !0, s.eagerState = S, Dt(S, m))
            return gl(e, t, s, 0), He === null && yl(), !1;
        } catch {
        } finally {
        }
      if (n = So(e, t, s, i), n !== null)
        return $t(n, e, i), Qf(n, t, i), !0;
    }
    return !1;
  }
  function ac(e, t, n, i) {
    if (i = {
      lane: 2,
      revertLane: Rc(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ll(e)) {
      if (t) throw Error(o(479));
    } else
      t = So(
        e,
        n,
        i,
        2
      ), t !== null && $t(t, e, 2);
  }
  function Ll(e) {
    var t = e.alternate;
    return e === ye || t !== null && t === ye;
  }
  function kf(e, t) {
    oi = Dl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Qf(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Fu(e, n);
    }
  }
  var dr = {
    readContext: pt,
    use: Cl,
    useCallback: Qe,
    useContext: Qe,
    useEffect: Qe,
    useImperativeHandle: Qe,
    useLayoutEffect: Qe,
    useInsertionEffect: Qe,
    useMemo: Qe,
    useReducer: Qe,
    useRef: Qe,
    useState: Qe,
    useDebugValue: Qe,
    useDeferredValue: Qe,
    useTransition: Qe,
    useSyncExternalStore: Qe,
    useId: Qe,
    useHostTransitionStatus: Qe,
    useFormState: Qe,
    useActionState: Qe,
    useOptimistic: Qe,
    useMemoCache: Qe,
    useCacheRefresh: Qe
  };
  dr.useEffectEvent = Qe;
  var Zf = {
    readContext: pt,
    use: Cl,
    useCallback: function(e, t) {
      return St().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: pt,
    useEffect: Mf,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Rl(
        4194308,
        4,
        Uf.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Rl(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Rl(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = St();
      t = t === void 0 ? null : t;
      var i = e();
      if (Da) {
        ke(!0);
        try {
          e();
        } finally {
          ke(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, n) {
      var i = St();
      if (n !== void 0) {
        var s = n(t);
        if (Da) {
          ke(!0);
          try {
            n(t);
          } finally {
            ke(!1);
          }
        }
      } else s = t;
      return i.memoizedState = i.baseState = s, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: s
      }, i.queue = e, e = e.dispatch = tv.bind(
        null,
        ye,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = St();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Jo(e);
      var t = e.queue, n = Xf.bind(null, ye, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Po,
    useDeferredValue: function(e, t) {
      var n = St();
      return ec(n, e, t);
    },
    useTransition: function() {
      var e = Jo(!1);
      return e = Gf.bind(
        null,
        ye,
        e.queue,
        !0,
        !1
      ), St().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var i = ye, s = St();
      if (je) {
        if (n === void 0)
          throw Error(o(407));
        n = n();
      } else {
        if (n = t(), He === null)
          throw Error(o(349));
        (Ae & 127) !== 0 || yf(i, t, n);
      }
      s.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return s.queue = c, Mf(vf.bind(null, i, c, e), [
        e
      ]), i.flags |= 2048, ui(
        9,
        { destroy: void 0 },
        gf.bind(
          null,
          i,
          c,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = St(), t = He.identifierPrefix;
      if (je) {
        var n = an, i = nn;
        n = (i & ~(1 << 32 - lt(i) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Ol++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Qg++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: nc,
    useFormState: wf,
    useActionState: wf,
    useOptimistic: function(e) {
      var t = St();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = ac.bind(
        null,
        ye,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: ko,
    useCacheRefresh: function() {
      return St().memoizedState = ev.bind(
        null,
        ye
      );
    },
    useEffectEvent: function(e) {
      var t = St(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Me & 2) !== 0)
          throw Error(o(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, ic = {
    readContext: pt,
    use: Cl,
    useCallback: Vf,
    useContext: pt,
    useEffect: Fo,
    useImperativeHandle: Lf,
    useInsertionEffect: zf,
    useLayoutEffect: Rf,
    useMemo: Bf,
    useReducer: zl,
    useRef: Of,
    useState: function() {
      return zl(bn);
    },
    useDebugValue: Po,
    useDeferredValue: function(e, t) {
      var n = Fe();
      return Hf(
        n,
        Ue.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = zl(bn)[0], t = Fe().memoizedState;
      return [
        typeof e == "boolean" ? e : cr(e),
        t
      ];
    },
    useSyncExternalStore: hf,
    useId: Kf,
    useHostTransitionStatus: nc,
    useFormState: $f,
    useActionState: $f,
    useOptimistic: function(e, t) {
      var n = Fe();
      return _f(n, Ue, e, t);
    },
    useMemoCache: ko,
    useCacheRefresh: Yf
  };
  ic.useEffectEvent = Cf;
  var Jf = {
    readContext: pt,
    use: Cl,
    useCallback: Vf,
    useContext: pt,
    useEffect: Fo,
    useImperativeHandle: Lf,
    useInsertionEffect: zf,
    useLayoutEffect: Rf,
    useMemo: Bf,
    useReducer: Zo,
    useRef: Of,
    useState: function() {
      return Zo(bn);
    },
    useDebugValue: Po,
    useDeferredValue: function(e, t) {
      var n = Fe();
      return Ue === null ? ec(n, e, t) : Hf(
        n,
        Ue.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Zo(bn)[0], t = Fe().memoizedState;
      return [
        typeof e == "boolean" ? e : cr(e),
        t
      ];
    },
    useSyncExternalStore: hf,
    useId: Kf,
    useHostTransitionStatus: nc,
    useFormState: Df,
    useActionState: Df,
    useOptimistic: function(e, t) {
      var n = Fe();
      return Ue !== null ? _f(n, Ue, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: ko,
    useCacheRefresh: Yf
  };
  Jf.useEffectEvent = Cf;
  function rc(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : g({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var lc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var i = Ut(), s = Kn(i);
      s.payload = t, n != null && (s.callback = n), t = Yn(e, s, i), t !== null && ($t(t, e, i), rr(t, e, i));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var i = Ut(), s = Kn(i);
      s.tag = 1, s.payload = t, n != null && (s.callback = n), t = Yn(e, s, i), t !== null && ($t(t, e, i), rr(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = Ut(), i = Kn(n);
      i.tag = 2, t != null && (i.callback = t), t = Yn(e, i, n), t !== null && ($t(t, e, n), rr(t, e, n));
    }
  };
  function Wf(e, t, n, i, s, c, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, m) : t.prototype && t.prototype.isPureReactComponent ? !Wi(n, i) || !Wi(s, c) : !0;
  }
  function Ff(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && lc.enqueueReplaceState(t, t.state, null);
  }
  function Oa(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t)
        i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = g({}, n));
      for (var s in e)
        n[s] === void 0 && (n[s] = e[s]);
    }
    return n;
  }
  function Pf(e) {
    hl(e);
  }
  function em(e) {
    console.error(e);
  }
  function tm(e) {
    hl(e);
  }
  function Vl(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function nm(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function sc(e, t, n) {
    return n = Kn(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Vl(e, t);
    }, n;
  }
  function am(e) {
    return e = Kn(e), e.tag = 3, e;
  }
  function im(e, t, n, i) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var c = i.value;
      e.payload = function() {
        return s(c);
      }, e.callback = function() {
        nm(t, n, i);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      nm(t, n, i), typeof s != "function" && (Wn === null ? Wn = /* @__PURE__ */ new Set([this]) : Wn.add(this));
      var S = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: S !== null ? S : ""
      });
    });
  }
  function nv(e, t, n, i, s) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = n.alternate, t !== null && ni(
        t,
        n,
        s,
        !0
      ), n = Mt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Yt === null ? Jl() : n.alternate === null && Ze === 0 && (Ze = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, i === Nl ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Mc(e, i, s)), !1;
          case 22:
            return n.flags |= 65536, i === Nl ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Mc(e, i, s)), !1;
        }
        throw Error(o(435, n.tag));
      }
      return Mc(e, i, s), Jl(), !1;
    }
    if (je)
      return t = Mt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = s, i !== jo && (e = Error(o(422), { cause: i }), er(Gt(e, n)))) : (i !== jo && (t = Error(o(423), {
        cause: i
      }), er(
        Gt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, s &= -s, e.lanes |= s, i = Gt(i, n), s = sc(
        e.stateNode,
        i,
        s
      ), Lo(e, s), Ze !== 4 && (Ze = 2)), !1;
    var c = Error(o(520), { cause: i });
    if (c = Gt(c, n), br === null ? br = [c] : br.push(c), Ze !== 4 && (Ze = 2), t === null) return !0;
    i = Gt(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = s & -s, n.lanes |= e, e = sc(n.stateNode, i, e), Lo(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (Wn === null || !Wn.has(c))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = am(s), im(
              s,
              e,
              n,
              i
            ), Lo(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var oc = Error(o(461)), nt = !1;
  function ht(e, t, n, i) {
    t.child = e === null ? of(t, null, n, i) : Ta(
      t,
      e.child,
      n,
      i
    );
  }
  function rm(e, t, n, i, s) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var m = {};
      for (var S in i)
        S !== "ref" && (m[S] = i[S]);
    } else m = i;
    return Na(t), i = Io(
      e,
      t,
      n,
      m,
      c,
      s
    ), S = Ko(), e !== null && !nt ? (Yo(e, t, s), Sn(e, t, s)) : (je && S && xo(t), t.flags |= 1, ht(e, t, i, s), t.child);
  }
  function lm(e, t, n, i, s) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !_o(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, sm(
        e,
        t,
        c,
        i,
        s
      )) : (e = bl(
        n.type,
        null,
        i,
        t,
        t.mode,
        s
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !yc(e, s)) {
      var m = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Wi, n(m, i) && e.ref === t.ref)
        return Sn(e, t, s);
    }
    return t.flags |= 1, e = pn(c, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function sm(e, t, n, i, s) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (Wi(c, i) && e.ref === t.ref)
        if (nt = !1, t.pendingProps = i = c, yc(e, s))
          (e.flags & 131072) !== 0 && (nt = !0);
        else
          return t.lanes = e.lanes, Sn(e, t, s);
    }
    return cc(
      e,
      t,
      n,
      i,
      s
    );
  }
  function om(e, t, n, i) {
    var s = i.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (i = t.child = e.child, s = 0; i !== null; )
            s = s | i.lanes | i.childLanes, i = i.sibling;
          i = s & ~c;
        } else i = 0, t.child = null;
        return cm(
          e,
          t,
          c,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Al(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? df(t, c) : Bo(), ff(t);
      else
        return i = t.lanes = 536870912, cm(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          i
        );
    } else
      c !== null ? (Al(t, c.cachePool), df(t, c), kn(), t.memoizedState = null) : (e !== null && Al(t, null), Bo(), kn());
    return ht(e, t, s, n), t.child;
  }
  function fr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function cm(e, t, n, i, s) {
    var c = Co();
    return c = c === null ? null : { parent: et._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && Al(t, null), Bo(), ff(t), e !== null && ni(e, t, i, !0), t.childLanes = s, null;
  }
  function Bl(e, t) {
    return t = Gl(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function um(e, t, n) {
    return Ta(t, e.child, null, n), e = Bl(t, t.pendingProps), e.flags |= 2, Ct(t), t.memoizedState = null, e;
  }
  function av(e, t, n) {
    var i = t.pendingProps, s = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (je) {
        if (i.mode === "hidden")
          return e = Bl(t, i), t.lanes = 536870912, fr(null, e);
        if (Go(t), (e = qe) ? (e = Ep(
          e,
          Kt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Bn !== null ? { id: nn, overflow: an } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Xd(e), n.return = t, t.child = n, mt = t, qe = null)) : e = null, e === null) throw Gn(t);
        return t.lanes = 536870912, null;
      }
      return Bl(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if (Go(t), s)
        if (t.flags & 256)
          t.flags &= -257, t = um(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(o(558));
      else if (nt || ni(e, t, n, !1), s = (n & e.childLanes) !== 0, nt || s) {
        if (i = He, i !== null && (m = Pu(i, n), m !== 0 && m !== c.retryLane))
          throw c.retryLane = m, _a(e, m), $t(i, e, m), oc;
        Jl(), t = um(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, qe = Xt(m.nextSibling), mt = t, je = !0, Hn = null, Kt = !1, e !== null && Zd(t, e), t = Bl(t, i), t.flags |= 4096;
      return t;
    }
    return e = pn(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Hl(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(o(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function cc(e, t, n, i, s) {
    return Na(t), n = Io(
      e,
      t,
      n,
      i,
      void 0,
      s
    ), i = Ko(), e !== null && !nt ? (Yo(e, t, s), Sn(e, t, s)) : (je && i && xo(t), t.flags |= 1, ht(e, t, n, s), t.child);
  }
  function dm(e, t, n, i, s, c) {
    return Na(t), t.updateQueue = null, n = pf(
      t,
      i,
      n,
      s
    ), mf(e), i = Ko(), e !== null && !nt ? (Yo(e, t, c), Sn(e, t, c)) : (je && i && xo(t), t.flags |= 1, ht(e, t, n, c), t.child);
  }
  function fm(e, t, n, i, s) {
    if (Na(t), t.stateNode === null) {
      var c = Fa, m = n.contextType;
      typeof m == "object" && m !== null && (c = pt(m)), c = new n(i, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = lc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = i, c.state = t.memoizedState, c.refs = {}, Ro(t), m = n.contextType, c.context = typeof m == "object" && m !== null ? pt(m) : Fa, c.state = t.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (rc(
        t,
        n,
        m,
        i
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (m = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), m !== c.state && lc.enqueueReplaceState(c, c.state, null), sr(t, i, c, s), lr(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      c = t.stateNode;
      var S = t.memoizedProps, A = Oa(n, S);
      c.props = A;
      var T = c.context, B = n.contextType;
      m = Fa, typeof B == "object" && B !== null && (m = pt(B));
      var q = n.getDerivedStateFromProps;
      B = typeof q == "function" || typeof c.getSnapshotBeforeUpdate == "function", S = t.pendingProps !== S, B || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (S || T !== m) && Ff(
        t,
        c,
        i,
        m
      ), In = !1;
      var C = t.memoizedState;
      c.state = C, sr(t, i, c, s), lr(), T = t.memoizedState, S || C !== T || In ? (typeof q == "function" && (rc(
        t,
        n,
        q,
        i
      ), T = t.memoizedState), (A = In || Wf(
        t,
        n,
        A,
        i,
        C,
        T,
        m
      )) ? (B || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = T), c.props = i, c.state = T, c.context = m, i = A) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      c = t.stateNode, Uo(e, t), m = t.memoizedProps, B = Oa(n, m), c.props = B, q = t.pendingProps, C = c.context, T = n.contextType, A = Fa, typeof T == "object" && T !== null && (A = pt(T)), S = n.getDerivedStateFromProps, (T = typeof S == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m !== q || C !== A) && Ff(
        t,
        c,
        i,
        A
      ), In = !1, C = t.memoizedState, c.state = C, sr(t, i, c, s), lr();
      var z = t.memoizedState;
      m !== q || C !== z || In || e !== null && e.dependencies !== null && _l(e.dependencies) ? (typeof S == "function" && (rc(
        t,
        n,
        S,
        i
      ), z = t.memoizedState), (B = In || Wf(
        t,
        n,
        B,
        i,
        C,
        z,
        A
      ) || e !== null && e.dependencies !== null && _l(e.dependencies)) ? (T || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, z, A), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        i,
        z,
        A
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = z), c.props = i, c.state = z, c.context = A, i = B) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return c = i, Hl(e, t), i = (t.flags & 128) !== 0, c || i ? (c = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && i ? (t.child = Ta(
      t,
      e.child,
      null,
      s
    ), t.child = Ta(
      t,
      null,
      n,
      s
    )) : ht(e, t, n, s), t.memoizedState = c.state, e = t.child) : e = Sn(
      e,
      t,
      s
    ), e;
  }
  function mm(e, t, n, i) {
    return Aa(), t.flags |= 256, ht(e, t, n, i), t.child;
  }
  var uc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(e) {
    return { baseLanes: e, cachePool: tf() };
  }
  function fc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Rt), e;
  }
  function pm(e, t, n) {
    var i = t.pendingProps, s = !1, c = (t.flags & 128) !== 0, m;
    if ((m = c) || (m = e !== null && e.memoizedState === null ? !1 : (We.current & 2) !== 0), m && (s = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (je) {
        if (s ? Xn(t) : kn(), (e = qe) ? (e = Ep(
          e,
          Kt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Bn !== null ? { id: nn, overflow: an } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Xd(e), n.return = t, t.child = n, mt = t, qe = null)) : e = null, e === null) throw Gn(t);
        return Qc(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var S = i.children;
      return i = i.fallback, s ? (kn(), s = t.mode, S = Gl(
        { mode: "hidden", children: S },
        s
      ), i = Ea(
        i,
        s,
        n,
        null
      ), S.return = t, i.return = t, S.sibling = i, t.child = S, i = t.child, i.memoizedState = dc(n), i.childLanes = fc(
        e,
        m,
        n
      ), t.memoizedState = uc, fr(null, i)) : (Xn(t), mc(t, S));
    }
    var A = e.memoizedState;
    if (A !== null && (S = A.dehydrated, S !== null)) {
      if (c)
        t.flags & 256 ? (Xn(t), t.flags &= -257, t = pc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (kn(), t.child = e.child, t.flags |= 128, t = null) : (kn(), S = i.fallback, s = t.mode, i = Gl(
          { mode: "visible", children: i.children },
          s
        ), S = Ea(
          S,
          s,
          n,
          null
        ), S.flags |= 2, i.return = t, S.return = t, i.sibling = S, t.child = i, Ta(
          t,
          e.child,
          null,
          n
        ), i = t.child, i.memoizedState = dc(n), i.childLanes = fc(
          e,
          m,
          n
        ), t.memoizedState = uc, t = fr(null, i));
      else if (Xn(t), Qc(S)) {
        if (m = S.nextSibling && S.nextSibling.dataset, m) var T = m.dgst;
        m = T, i = Error(o(419)), i.stack = "", i.digest = m, er({ value: i, source: null, stack: null }), t = pc(
          e,
          t,
          n
        );
      } else if (nt || ni(e, t, n, !1), m = (n & e.childLanes) !== 0, nt || m) {
        if (m = He, m !== null && (i = Pu(m, n), i !== 0 && i !== A.retryLane))
          throw A.retryLane = i, _a(e, i), $t(m, e, i), oc;
        kc(S) || Jl(), t = pc(
          e,
          t,
          n
        );
      } else
        kc(S) ? (t.flags |= 192, t.child = e.child, t = null) : (e = A.treeContext, qe = Xt(
          S.nextSibling
        ), mt = t, je = !0, Hn = null, Kt = !1, e !== null && Zd(t, e), t = mc(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return s ? (kn(), S = i.fallback, s = t.mode, A = e.child, T = A.sibling, i = pn(A, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = A.subtreeFlags & 65011712, T !== null ? S = pn(
      T,
      S
    ) : (S = Ea(
      S,
      s,
      n,
      null
    ), S.flags |= 2), S.return = t, i.return = t, i.sibling = S, t.child = i, fr(null, i), i = t.child, S = e.child.memoizedState, S === null ? S = dc(n) : (s = S.cachePool, s !== null ? (A = et._currentValue, s = s.parent !== A ? { parent: A, pool: A } : s) : s = tf(), S = {
      baseLanes: S.baseLanes | n,
      cachePool: s
    }), i.memoizedState = S, i.childLanes = fc(
      e,
      m,
      n
    ), t.memoizedState = uc, fr(e.child, i)) : (Xn(t), n = e.child, e = n.sibling, n = pn(n, {
      mode: "visible",
      children: i.children
    }), n.return = t, n.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function mc(e, t) {
    return t = Gl(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Gl(e, t) {
    return e = Ot(22, e, null, t), e.lanes = 0, e;
  }
  function pc(e, t, n) {
    return Ta(t, e.child, null, n), e = mc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function hm(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), To(e.return, t, n);
  }
  function hc(e, t, n, i, s, c) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: s,
      treeForkCount: c
    } : (m.isBackwards = t, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = n, m.tailMode = s, m.treeForkCount = c);
  }
  function ym(e, t, n) {
    var i = t.pendingProps, s = i.revealOrder, c = i.tail;
    i = i.children;
    var m = We.current, S = (m & 2) !== 0;
    if (S ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, W(We, m), ht(e, t, i, n), i = je ? Pi : 0, !S && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && hm(e, n, t);
        else if (e.tag === 19)
          hm(e, n, t);
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
    switch (s) {
      case "forwards":
        for (n = t.child, s = null; n !== null; )
          e = n.alternate, e !== null && Tl(e) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = t.child, t.child = null) : (s = n.sibling, n.sibling = null), hc(
          t,
          !1,
          s,
          n,
          c,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = t.child, t.child = null; s !== null; ) {
          if (e = s.alternate, e !== null && Tl(e) === null) {
            t.child = s;
            break;
          }
          e = s.sibling, s.sibling = n, n = s, s = e;
        }
        hc(
          t,
          !0,
          n,
          null,
          c,
          i
        );
        break;
      case "together":
        hc(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Sn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Jn |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (ni(
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
      for (e = t.child, n = pn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = pn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function yc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && _l(e)));
  }
  function iv(e, t, n) {
    switch (t.tag) {
      case 3:
        ut(t, t.stateNode.containerInfo), qn(t, et, e.memoizedState.cache), Aa();
        break;
      case 27:
      case 5:
        pa(t);
        break;
      case 4:
        ut(t, t.stateNode.containerInfo);
        break;
      case 10:
        qn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Go(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (Xn(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? pm(e, t, n) : (Xn(t), e = Sn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        Xn(t);
        break;
      case 19:
        var s = (e.flags & 128) !== 0;
        if (i = (n & t.childLanes) !== 0, i || (ni(
          e,
          t,
          n,
          !1
        ), i = (n & t.childLanes) !== 0), s) {
          if (i)
            return ym(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (s = t.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), W(We, We.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, om(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        qn(t, et, e.memoizedState.cache);
    }
    return Sn(e, t, n);
  }
  function gm(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        nt = !0;
      else {
        if (!yc(e, n) && (t.flags & 128) === 0)
          return nt = !1, iv(
            e,
            t,
            n
          );
        nt = (e.flags & 131072) !== 0;
      }
    else
      nt = !1, je && (t.flags & 1048576) !== 0 && Qd(t, Pi, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = wa(t.elementType), t.type = e, typeof e == "function")
            _o(e) ? (i = Oa(e, i), t.tag = 1, t = fm(
              null,
              t,
              e,
              i,
              n
            )) : (t.tag = 0, t = cc(
              null,
              t,
              e,
              i,
              n
            ));
          else {
            if (e != null) {
              var s = e.$$typeof;
              if (s === ie) {
                t.tag = 11, t = rm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (s === G) {
                t.tag = 14, t = lm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              }
            }
            throw t = re(e) || e, Error(o(306, t, ""));
          }
        }
        return t;
      case 0:
        return cc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return i = t.type, s = Oa(
          i,
          t.pendingProps
        ), fm(
          e,
          t,
          i,
          s,
          n
        );
      case 3:
        e: {
          if (ut(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(o(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          s = c.element, Uo(e, t), sr(t, i, null, n);
          var m = t.memoizedState;
          if (i = m.cache, qn(t, et, i), i !== c.cache && Do(
            t,
            [et],
            n,
            !0
          ), lr(), i = m.element, c.isDehydrated)
            if (c = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = mm(
                e,
                t,
                i,
                n
              );
              break e;
            } else if (i !== s) {
              s = Gt(
                Error(o(424)),
                t
              ), er(s), t = mm(
                e,
                t,
                i,
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
              for (qe = Xt(e.firstChild), mt = t, je = !0, Hn = null, Kt = !0, n = of(
                t,
                null,
                i,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (Aa(), i === s) {
              t = Sn(
                e,
                t,
                n
              );
              break e;
            }
            ht(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Hl(e, t), e === null ? (n = $p(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : je || (n = t.type, e = t.pendingProps, i = as(
          ve.current
        ).createElement(n), i[ft] = t, i[Et] = e, yt(i, n, e), st(i), t.stateNode = i) : t.memoizedState = $p(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return pa(t), e === null && je && (i = t.stateNode = Np(
          t.type,
          t.pendingProps,
          ve.current
        ), mt = t, Kt = !0, s = qe, ta(t.type) ? (Zc = s, qe = Xt(i.firstChild)) : qe = s), ht(
          e,
          t,
          t.pendingProps.children,
          n
        ), Hl(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && je && ((s = i = qe) && (i = zv(
          i,
          t.type,
          t.pendingProps,
          Kt
        ), i !== null ? (t.stateNode = i, mt = t, qe = Xt(i.firstChild), Kt = !1, s = !0) : s = !1), s || Gn(t)), pa(t), s = t.type, c = t.pendingProps, m = e !== null ? e.memoizedProps : null, i = c.children, Kc(s, c) ? i = null : m !== null && Kc(s, m) && (t.flags |= 32), t.memoizedState !== null && (s = Io(
          e,
          t,
          Zg,
          null,
          null,
          n
        ), wr._currentValue = s), Hl(e, t), ht(e, t, i, n), t.child;
      case 6:
        return e === null && je && ((e = n = qe) && (n = Rv(
          n,
          t.pendingProps,
          Kt
        ), n !== null ? (t.stateNode = n, mt = t, qe = null, e = !0) : e = !1), e || Gn(t)), null;
      case 13:
        return pm(e, t, n);
      case 4:
        return ut(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Ta(
          t,
          null,
          i,
          n
        ) : ht(e, t, i, n), t.child;
      case 11:
        return rm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return ht(
          e,
          t,
          t.pendingProps,
          n
        ), t.child;
      case 8:
        return ht(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return ht(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return i = t.pendingProps, qn(t, t.type, i.value), ht(e, t, i.children, n), t.child;
      case 9:
        return s = t.type._context, i = t.pendingProps.children, Na(t), s = pt(s), i = i(s), t.flags |= 1, ht(e, t, i, n), t.child;
      case 14:
        return lm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return sm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return ym(e, t, n);
      case 31:
        return av(e, t, n);
      case 22:
        return om(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Na(t), i = pt(et), e === null ? (s = Co(), s === null && (s = He, c = Oo(), s.pooledCache = c, c.refCount++, c !== null && (s.pooledCacheLanes |= n), s = c), t.memoizedState = { parent: i, cache: s }, Ro(t), qn(t, et, s)) : ((e.lanes & n) !== 0 && (Uo(e, t), sr(t, null, null, n), lr()), s = e.memoizedState, c = t.memoizedState, s.parent !== i ? (s = { parent: i, cache: i }, t.memoizedState = s, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = s), qn(t, et, i)) : (i = c.cache, qn(t, et, i), i !== s.cache && Do(
          t,
          [et],
          n,
          !0
        ))), ht(
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
  function _n(e) {
    e.flags |= 4;
  }
  function gc(e, t, n, i, s) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (s & 335544128) === s)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (Km()) e.flags |= 8192;
        else
          throw $a = Nl, zo;
    } else e.flags &= -16777217;
  }
  function vm(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Cp(t))
      if (Km()) e.flags |= 8192;
      else
        throw $a = Nl, zo;
  }
  function ql(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ju() : 536870912, e.lanes |= t, pi |= t);
  }
  function mr(e, t) {
    if (!je)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = e.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
      }
  }
  function Ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t)
      for (var s = e.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags & 65011712, i |= s.flags & 65011712, s.return = e, s = s.sibling;
    else
      for (s = e.child; s !== null; )
        n |= s.lanes | s.childLanes, i |= s.subtreeFlags, i |= s.flags, s.return = e, s = s.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function rv(e, t, n) {
    var i = t.pendingProps;
    switch (No(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ie(t), null;
      case 1:
        return Ie(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), gn(et), Xe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ti(t) ? _n(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, wo())), Ie(t), null;
      case 26:
        var s = t.type, c = t.memoizedState;
        return e === null ? (_n(t), c !== null ? (Ie(t), vm(t, c)) : (Ie(t), gc(
          t,
          s,
          null,
          i,
          n
        ))) : c ? c !== e.memoizedState ? (_n(t), Ie(t), vm(t, c)) : (Ie(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && _n(t), Ie(t), gc(
          t,
          s,
          e,
          i,
          n
        )), null;
      case 27:
        if (Va(t), n = ve.current, s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Ie(t), null;
          }
          e = te.current, ti(t) ? Jd(t) : (e = Np(s, i, n), t.stateNode = e, _n(t));
        }
        return Ie(t), null;
      case 5:
        if (Va(t), s = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(o(166));
            return Ie(t), null;
          }
          if (c = te.current, ti(t))
            Jd(t);
          else {
            var m = as(
              ve.current
            );
            switch (c) {
              case 1:
                c = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                c = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    c = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    c = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    c = m.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? c.multiple = !0 : i.size && (c.size = i.size);
                    break;
                  default:
                    c = typeof i.is == "string" ? m.createElement(s, { is: i.is }) : m.createElement(s);
                }
            }
            c[ft] = t, c[Et] = i;
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                c.appendChild(m.stateNode);
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
            t.stateNode = c;
            e: switch (yt(c, s, i), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && _n(t);
          }
        }
        return Ie(t), gc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && _n(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(o(166));
          if (e = ve.current, ti(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, s = mt, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  i = s.memoizedProps;
              }
            e[ft] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || pp(e.nodeValue, n)), e || Gn(t, !0);
          } else
            e = as(e).createTextNode(
              i
            ), e[ft] = t, t.stateNode = e;
        }
        return Ie(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = ti(t), n !== null) {
            if (e === null) {
              if (!i) throw Error(o(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(o(557));
              e[ft] = t;
            } else
              Aa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), e = !1;
          } else
            n = wo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(o(558));
        }
        return Ie(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (s = ti(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!s) throw Error(o(318));
              if (s = t.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(o(317));
              s[ft] = t;
            } else
              Aa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ie(t), s = !1;
          } else
            s = wo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return t.flags & 256 ? (Ct(t), t) : (Ct(t), null);
        }
        return Ct(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, s = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (s = i.alternate.memoizedState.cachePool.pool), c = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (c = i.memoizedState.cachePool.pool), c !== s && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ql(t, t.updateQueue), Ie(t), null);
      case 4:
        return Xe(), e === null && Bc(t.stateNode.containerInfo), Ie(t), null;
      case 10:
        return gn(t.type), Ie(t), null;
      case 19:
        if (V(We), i = t.memoizedState, i === null) return Ie(t), null;
        if (s = (t.flags & 128) !== 0, c = i.rendering, c === null)
          if (s) mr(i, !1);
          else {
            if (Ze !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Tl(e), c !== null) {
                  for (t.flags |= 128, mr(i, !1), e = c.updateQueue, t.updateQueue = e, ql(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Yd(n, e), n = n.sibling;
                  return W(
                    We,
                    We.current & 1 | 2
                  ), je && hn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && bt() > kl && (t.flags |= 128, s = !0, mr(i, !1), t.lanes = 4194304);
          }
        else {
          if (!s)
            if (e = Tl(c), e !== null) {
              if (t.flags |= 128, s = !0, e = e.updateQueue, t.updateQueue = e, ql(t, e), mr(i, !0), i.tail === null && i.tailMode === "hidden" && !c.alternate && !je)
                return Ie(t), null;
            } else
              2 * bt() - i.renderingStartTime > kl && n !== 536870912 && (t.flags |= 128, s = !0, mr(i, !1), t.lanes = 4194304);
          i.isBackwards ? (c.sibling = t.child, t.child = c) : (e = i.last, e !== null ? e.sibling = c : t.child = c, i.last = c);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = bt(), e.sibling = null, n = We.current, W(
          We,
          s ? n & 1 | 2 : n & 1
        ), je && hn(t, i.treeForkCount), e) : (Ie(t), null);
      case 22:
      case 23:
        return Ct(t), Ho(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ie(t), n = t.updateQueue, n !== null && ql(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && V(ja), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), gn(et), Ie(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function lv(e, t) {
    switch (No(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return gn(et), Xe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Va(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ct(t), t.alternate === null)
            throw Error(o(340));
          Aa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ct(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(o(340));
          Aa();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return V(We), null;
      case 4:
        return Xe(), null;
      case 10:
        return gn(t.type), null;
      case 22:
      case 23:
        return Ct(t), Ho(), e !== null && V(ja), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return gn(et), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function bm(e, t) {
    switch (No(t), t.tag) {
      case 3:
        gn(et), Xe();
        break;
      case 26:
      case 27:
      case 5:
        Va(t);
        break;
      case 4:
        Xe();
        break;
      case 31:
        t.memoizedState !== null && Ct(t);
        break;
      case 13:
        Ct(t);
        break;
      case 19:
        V(We);
        break;
      case 10:
        gn(t.type);
        break;
      case 22:
      case 23:
        Ct(t), Ho(), e !== null && V(ja);
        break;
      case 24:
        gn(et);
    }
  }
  function pr(e, t) {
    try {
      var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var s = i.next;
        n = s;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var c = n.create, m = n.inst;
            i = c(), m.destroy = i;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (S) {
      ze(t, t.return, S);
    }
  }
  function Qn(e, t, n) {
    try {
      var i = t.updateQueue, s = i !== null ? i.lastEffect : null;
      if (s !== null) {
        var c = s.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var m = i.inst, S = m.destroy;
            if (S !== void 0) {
              m.destroy = void 0, s = t;
              var A = n, T = S;
              try {
                T();
              } catch (B) {
                ze(
                  s,
                  A,
                  B
                );
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (B) {
      ze(t, t.return, B);
    }
  }
  function Sm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        uf(t, n);
      } catch (i) {
        ze(e, e.return, i);
      }
    }
  }
  function _m(e, t, n) {
    n.props = Oa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      ze(e, t, i);
    }
  }
  function hr(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(i) : n.current = i;
      }
    } catch (s) {
      ze(e, t, s);
    }
  }
  function rn(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (s) {
          ze(e, t, s);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          ze(e, t, s);
        }
      else n.current = null;
  }
  function Em(e) {
    var t = e.type, n = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (s) {
      ze(e, e.return, s);
    }
  }
  function vc(e, t, n) {
    try {
      var i = e.stateNode;
      $v(i, e.type, n, t), i[Et] = t;
    } catch (s) {
      ze(e, e.return, s);
    }
  }
  function Am(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ta(e.type) || e.tag === 4;
  }
  function bc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Am(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ta(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Sc(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = fn));
    else if (i !== 4 && (i === 27 && ta(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Sc(e, t, n), e = e.sibling; e !== null; )
        Sc(e, t, n), e = e.sibling;
  }
  function Il(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (i !== 4 && (i === 27 && ta(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (Il(e, t, n), e = e.sibling; e !== null; )
        Il(e, t, n), e = e.sibling;
  }
  function xm(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, s = t.attributes; s.length; )
        t.removeAttributeNode(s[0]);
      yt(t, i, n), t[ft] = e, t[Et] = n;
    } catch (c) {
      ze(e, e.return, c);
    }
  }
  var En = !1, at = !1, _c = !1, Nm = typeof WeakSet == "function" ? WeakSet : Set, ot = null;
  function sv(e, t) {
    if (e = e.containerInfo, qc = us, e = Ud(e), po(e)) {
      if ("selectionStart" in e)
        var n = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          n = (n = e.ownerDocument) && n.defaultView || window;
          var i = n.getSelection && n.getSelection();
          if (i && i.rangeCount !== 0) {
            n = i.anchorNode;
            var s = i.anchorOffset, c = i.focusNode;
            i = i.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break e;
            }
            var m = 0, S = -1, A = -1, T = 0, B = 0, q = e, C = null;
            t: for (; ; ) {
              for (var z; q !== n || s !== 0 && q.nodeType !== 3 || (S = m + s), q !== c || i !== 0 && q.nodeType !== 3 || (A = m + i), q.nodeType === 3 && (m += q.nodeValue.length), (z = q.firstChild) !== null; )
                C = q, q = z;
              for (; ; ) {
                if (q === e) break t;
                if (C === n && ++T === s && (S = m), C === c && ++B === i && (A = m), (z = q.nextSibling) !== null) break;
                q = C, C = q.parentNode;
              }
              q = z;
            }
            n = S === -1 || A === -1 ? null : { start: S, end: A };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Ic = { focusedElem: e, selectionRange: n }, us = !1, ot = t; ot !== null; )
      if (t = ot, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ot = e;
      else
        for (; ot !== null; ) {
          switch (t = ot, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  s = e[n], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, n = t, s = c.memoizedProps, c = c.memoizedState, i = n.stateNode;
                try {
                  var P = Oa(
                    n.type,
                    s
                  );
                  e = i.getSnapshotBeforeUpdate(
                    P,
                    c
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (ue) {
                  ze(
                    n,
                    n.return,
                    ue
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  Xc(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Xc(e);
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
            e.return = t.return, ot = e;
            break;
          }
          ot = t.return;
        }
  }
  function jm(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xn(e, n), i & 4 && pr(5, n);
        break;
      case 1:
        if (xn(e, n), i & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              ze(n, n.return, m);
            }
          else {
            var s = Oa(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                s,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              ze(
                n,
                n.return,
                m
              );
            }
          }
        i & 64 && Sm(n), i & 512 && hr(n, n.return);
        break;
      case 3:
        if (xn(e, n), i & 64 && (e = n.updateQueue, e !== null)) {
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
            uf(e, t);
          } catch (m) {
            ze(n, n.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && xm(n);
      case 26:
      case 5:
        xn(e, n), t === null && i & 4 && Em(n), i & 512 && hr(n, n.return);
        break;
      case 12:
        xn(e, n);
        break;
      case 31:
        xn(e, n), i & 4 && Tm(e, n);
        break;
      case 13:
        xn(e, n), i & 4 && Dm(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = yv.bind(
          null,
          n
        ), Uv(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || En, !i) {
          t = t !== null && t.memoizedState !== null || at, s = En;
          var c = at;
          En = i, (at = t) && !c ? Nn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : xn(e, n), En = s, at = c;
        }
        break;
      case 30:
        break;
      default:
        xn(e, n);
    }
  }
  function wm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, wm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Js(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ye = null, xt = !1;
  function An(e, t, n) {
    for (n = n.child; n !== null; )
      $m(e, t, n), n = n.sibling;
  }
  function $m(e, t, n) {
    if (Pe && typeof Pe.onCommitFiberUnmount == "function")
      try {
        Pe.onCommitFiberUnmount(dt, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        at || rn(n, t), An(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        at || rn(n, t);
        var i = Ye, s = xt;
        ta(n.type) && (Ye = n.stateNode, xt = !1), An(
          e,
          t,
          n
        ), xr(n.stateNode), Ye = i, xt = s;
        break;
      case 5:
        at || rn(n, t);
      case 6:
        if (i = Ye, s = xt, Ye = null, An(
          e,
          t,
          n
        ), Ye = i, xt = s, Ye !== null)
          if (xt)
            try {
              (Ye.nodeType === 9 ? Ye.body : Ye.nodeName === "HTML" ? Ye.ownerDocument.body : Ye).removeChild(n.stateNode);
            } catch (c) {
              ze(
                n,
                t,
                c
              );
            }
          else
            try {
              Ye.removeChild(n.stateNode);
            } catch (c) {
              ze(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        Ye !== null && (xt ? (e = Ye, Sp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Ei(e)) : Sp(Ye, n.stateNode));
        break;
      case 4:
        i = Ye, s = xt, Ye = n.stateNode.containerInfo, xt = !0, An(
          e,
          t,
          n
        ), Ye = i, xt = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Qn(2, n, t), at || Qn(4, n, t), An(
          e,
          t,
          n
        );
        break;
      case 1:
        at || (rn(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && _m(
          n,
          t,
          i
        )), An(
          e,
          t,
          n
        );
        break;
      case 21:
        An(
          e,
          t,
          n
        );
        break;
      case 22:
        at = (i = at) || n.memoizedState !== null, An(
          e,
          t,
          n
        ), at = i;
        break;
      default:
        An(
          e,
          t,
          n
        );
    }
  }
  function Tm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ei(e);
      } catch (n) {
        ze(t, t.return, n);
      }
    }
  }
  function Dm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ei(e);
      } catch (n) {
        ze(t, t.return, n);
      }
  }
  function ov(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Nm()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Nm()), t;
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Kl(e, t) {
    var n = ov(e);
    t.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var s = gv.bind(null, e, i);
        i.then(s, s);
      }
    });
  }
  function Nt(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var s = n[i], c = e, m = t, S = m;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (ta(S.type)) {
                Ye = S.stateNode, xt = !1;
                break e;
              }
              break;
            case 5:
              Ye = S.stateNode, xt = !1;
              break e;
            case 3:
            case 4:
              Ye = S.stateNode.containerInfo, xt = !0;
              break e;
          }
          S = S.return;
        }
        if (Ye === null) throw Error(o(160));
        $m(c, m, s), Ye = null, xt = !1, c = s.alternate, c !== null && (c.return = null), s.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Om(t, e), t = t.sibling;
  }
  var Wt = null;
  function Om(e, t) {
    var n = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Nt(t, e), jt(e), i & 4 && (Qn(3, e, e.return), pr(3, e), Qn(5, e, e.return));
        break;
      case 1:
        Nt(t, e), jt(e), i & 512 && (at || n === null || rn(n, n.return)), i & 64 && En && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? i : n.concat(i))));
        break;
      case 26:
        var s = Wt;
        if (Nt(t, e), jt(e), i & 512 && (at || n === null || rn(n, n.return)), i & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (i = e.memoizedState, n === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, n = e.memoizedProps, s = s.ownerDocument || s;
                  t: switch (i) {
                    case "title":
                      c = s.getElementsByTagName("title")[0], (!c || c[qi] || c[ft] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = s.createElement(i), s.head.insertBefore(
                        c,
                        s.querySelector("head > title")
                      )), yt(c, i, n), c[ft] = e, st(c), i = c;
                      break e;
                    case "link":
                      var m = Op(
                        "link",
                        "href",
                        s
                      ).get(i + (n.href || ""));
                      if (m) {
                        for (var S = 0; S < m.length; S++)
                          if (c = m[S], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            m.splice(S, 1);
                            break t;
                          }
                      }
                      c = s.createElement(i), yt(c, i, n), s.head.appendChild(c);
                      break;
                    case "meta":
                      if (m = Op(
                        "meta",
                        "content",
                        s
                      ).get(i + (n.content || ""))) {
                        for (S = 0; S < m.length; S++)
                          if (c = m[S], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            m.splice(S, 1);
                            break t;
                          }
                      }
                      c = s.createElement(i), yt(c, i, n), s.head.appendChild(c);
                      break;
                    default:
                      throw Error(o(468, i));
                  }
                  c[ft] = e, st(c), i = c;
                }
                e.stateNode = i;
              } else
                Mp(
                  s,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Dp(
                s,
                i,
                e.memoizedProps
              );
          else
            c !== i ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, i === null ? Mp(
              s,
              e.type,
              e.stateNode
            ) : Dp(
              s,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && vc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Nt(t, e), jt(e), i & 512 && (at || n === null || rn(n, n.return)), n !== null && i & 4 && vc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Nt(t, e), jt(e), i & 512 && (at || n === null || rn(n, n.return)), e.flags & 32) {
          s = e.stateNode;
          try {
            Ya(s, "");
          } catch (P) {
            ze(e, e.return, P);
          }
        }
        i & 4 && e.stateNode != null && (s = e.memoizedProps, vc(
          e,
          s,
          n !== null ? n.memoizedProps : s
        )), i & 1024 && (_c = !0);
        break;
      case 6:
        if (Nt(t, e), jt(e), i & 4) {
          if (e.stateNode === null)
            throw Error(o(162));
          i = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = i;
          } catch (P) {
            ze(e, e.return, P);
          }
        }
        break;
      case 3:
        if (ls = null, s = Wt, Wt = is(t.containerInfo), Nt(t, e), Wt = s, jt(e), i & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            Ei(t.containerInfo);
          } catch (P) {
            ze(e, e.return, P);
          }
        _c && (_c = !1, Mm(e));
        break;
      case 4:
        i = Wt, Wt = is(
          e.stateNode.containerInfo
        ), Nt(t, e), jt(e), Wt = i;
        break;
      case 12:
        Nt(t, e), jt(e);
        break;
      case 31:
        Nt(t, e), jt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Kl(e, i)));
        break;
      case 13:
        Nt(t, e), jt(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Xl = bt()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Kl(e, i)));
        break;
      case 22:
        s = e.memoizedState !== null;
        var A = n !== null && n.memoizedState !== null, T = En, B = at;
        if (En = T || s, at = B || A, Nt(t, e), at = B, En = T, jt(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, s && (n === null || A || En || at || Ma(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                A = n = t;
                try {
                  if (c = A.stateNode, s)
                    m = c.style, typeof m.setProperty == "function" ? m.setProperty("display", "none", "important") : m.display = "none";
                  else {
                    S = A.stateNode;
                    var q = A.memoizedProps.style, C = q != null && q.hasOwnProperty("display") ? q.display : null;
                    S.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (P) {
                  ze(A, A.return, P);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                A = t;
                try {
                  A.stateNode.nodeValue = s ? "" : A.memoizedProps;
                } catch (P) {
                  ze(A, A.return, P);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                A = t;
                try {
                  var z = A.stateNode;
                  s ? _p(z, !0) : _p(A.stateNode, !1);
                } catch (P) {
                  ze(A, A.return, P);
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
        i & 4 && (i = e.updateQueue, i !== null && (n = i.retryQueue, n !== null && (i.retryQueue = null, Kl(e, n))));
        break;
      case 19:
        Nt(t, e), jt(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Kl(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Nt(t, e), jt(e);
    }
  }
  function jt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (Am(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, c = bc(e);
            Il(e, c, s);
            break;
          case 5:
            var m = n.stateNode;
            n.flags & 32 && (Ya(m, ""), n.flags &= -33);
            var S = bc(e);
            Il(e, S, m);
            break;
          case 3:
          case 4:
            var A = n.stateNode.containerInfo, T = bc(e);
            Sc(
              e,
              T,
              A
            );
            break;
          default:
            throw Error(o(161));
        }
      } catch (B) {
        ze(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Mm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Mm(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function xn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        jm(e, t.alternate, t), t = t.sibling;
  }
  function Ma(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Qn(4, t, t.return), Ma(t);
          break;
        case 1:
          rn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && _m(
            t,
            t.return,
            n
          ), Ma(t);
          break;
        case 27:
          xr(t.stateNode);
        case 26:
        case 5:
          rn(t, t.return), Ma(t);
          break;
        case 22:
          t.memoizedState === null && Ma(t);
          break;
        case 30:
          Ma(t);
          break;
        default:
          Ma(t);
      }
      e = e.sibling;
    }
  }
  function Nn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, s = e, c = t, m = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Nn(
            s,
            c,
            n
          ), pr(4, c);
          break;
        case 1:
          if (Nn(
            s,
            c,
            n
          ), i = c, s = i.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (T) {
              ze(i, i.return, T);
            }
          if (i = c, s = i.updateQueue, s !== null) {
            var S = i.stateNode;
            try {
              var A = s.shared.hiddenCallbacks;
              if (A !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < A.length; s++)
                  cf(A[s], S);
            } catch (T) {
              ze(i, i.return, T);
            }
          }
          n && m & 64 && Sm(c), hr(c, c.return);
          break;
        case 27:
          xm(c);
        case 26:
        case 5:
          Nn(
            s,
            c,
            n
          ), n && i === null && m & 4 && Em(c), hr(c, c.return);
          break;
        case 12:
          Nn(
            s,
            c,
            n
          );
          break;
        case 31:
          Nn(
            s,
            c,
            n
          ), n && m & 4 && Tm(s, c);
          break;
        case 13:
          Nn(
            s,
            c,
            n
          ), n && m & 4 && Dm(s, c);
          break;
        case 22:
          c.memoizedState === null && Nn(
            s,
            c,
            n
          ), hr(c, c.return);
          break;
        case 30:
          break;
        default:
          Nn(
            s,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Ec(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && tr(n));
  }
  function Ac(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && tr(e));
  }
  function Ft(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Cm(
          e,
          t,
          n,
          i
        ), t = t.sibling;
  }
  function Cm(e, t, n, i) {
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ft(
          e,
          t,
          n,
          i
        ), s & 2048 && pr(9, t);
        break;
      case 1:
        Ft(
          e,
          t,
          n,
          i
        );
        break;
      case 3:
        Ft(
          e,
          t,
          n,
          i
        ), s & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && tr(e)));
        break;
      case 12:
        if (s & 2048) {
          Ft(
            e,
            t,
            n,
            i
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, m = c.id, S = c.onPostCommit;
            typeof S == "function" && S(
              m,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (A) {
            ze(t, t.return, A);
          }
        } else
          Ft(
            e,
            t,
            n,
            i
          );
        break;
      case 31:
        Ft(
          e,
          t,
          n,
          i
        );
        break;
      case 13:
        Ft(
          e,
          t,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, m = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? Ft(
          e,
          t,
          n,
          i
        ) : yr(e, t) : c._visibility & 2 ? Ft(
          e,
          t,
          n,
          i
        ) : (c._visibility |= 2, di(
          e,
          t,
          n,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Ec(m, t);
        break;
      case 24:
        Ft(
          e,
          t,
          n,
          i
        ), s & 2048 && Ac(t.alternate, t);
        break;
      default:
        Ft(
          e,
          t,
          n,
          i
        );
    }
  }
  function di(e, t, n, i, s) {
    for (s = s && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, m = t, S = n, A = i, T = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          di(
            c,
            m,
            S,
            A,
            s
          ), pr(8, m);
          break;
        case 23:
          break;
        case 22:
          var B = m.stateNode;
          m.memoizedState !== null ? B._visibility & 2 ? di(
            c,
            m,
            S,
            A,
            s
          ) : yr(
            c,
            m
          ) : (B._visibility |= 2, di(
            c,
            m,
            S,
            A,
            s
          )), s && T & 2048 && Ec(
            m.alternate,
            m
          );
          break;
        case 24:
          di(
            c,
            m,
            S,
            A,
            s
          ), s && T & 2048 && Ac(m.alternate, m);
          break;
        default:
          di(
            c,
            m,
            S,
            A,
            s
          );
      }
      t = t.sibling;
    }
  }
  function yr(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, i = t, s = i.flags;
        switch (i.tag) {
          case 22:
            yr(n, i), s & 2048 && Ec(
              i.alternate,
              i
            );
            break;
          case 24:
            yr(n, i), s & 2048 && Ac(i.alternate, i);
            break;
          default:
            yr(n, i);
        }
        t = t.sibling;
      }
  }
  var gr = 8192;
  function fi(e, t, n) {
    if (e.subtreeFlags & gr)
      for (e = e.child; e !== null; )
        zm(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function zm(e, t, n) {
    switch (e.tag) {
      case 26:
        fi(
          e,
          t,
          n
        ), e.flags & gr && e.memoizedState !== null && Qv(
          n,
          Wt,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        fi(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var i = Wt;
        Wt = is(e.stateNode.containerInfo), fi(
          e,
          t,
          n
        ), Wt = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = gr, gr = 16777216, fi(
          e,
          t,
          n
        ), gr = i) : fi(
          e,
          t,
          n
        ));
        break;
      default:
        fi(
          e,
          t,
          n
        );
    }
  }
  function Rm(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function vr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ot = i, Lm(
            i,
            e
          );
        }
      Rm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Um(e), e = e.sibling;
  }
  function Um(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        vr(e), e.flags & 2048 && Qn(9, e, e.return);
        break;
      case 3:
        vr(e);
        break;
      case 12:
        vr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Yl(e)) : vr(e);
        break;
      default:
        vr(e);
    }
  }
  function Yl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ot = i, Lm(
            i,
            e
          );
        }
      Rm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          Qn(8, t, t.return), Yl(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Yl(t));
          break;
        default:
          Yl(t);
      }
      e = e.sibling;
    }
  }
  function Lm(e, t) {
    for (; ot !== null; ) {
      var n = ot;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Qn(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          tr(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, ot = i;
      else
        e: for (n = e; ot !== null; ) {
          i = ot;
          var s = i.sibling, c = i.return;
          if (wm(i), i === n) {
            ot = null;
            break e;
          }
          if (s !== null) {
            s.return = c, ot = s;
            break e;
          }
          ot = c;
        }
    }
  }
  var cv = {
    getCacheForType: function(e) {
      var t = pt(et), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return pt(et).controller.signal;
    }
  }, uv = typeof WeakMap == "function" ? WeakMap : Map, Me = 0, He = null, _e = null, Ae = 0, Ce = 0, zt = null, Zn = !1, mi = !1, xc = !1, jn = 0, Ze = 0, Jn = 0, Ca = 0, Nc = 0, Rt = 0, pi = 0, br = null, wt = null, jc = !1, Xl = 0, Vm = 0, kl = 1 / 0, Ql = null, Wn = null, rt = 0, Fn = null, hi = null, wn = 0, wc = 0, $c = null, Bm = null, Sr = 0, Tc = null;
  function Ut() {
    return (Me & 2) !== 0 && Ae !== 0 ? Ae & -Ae : D.T !== null ? Rc() : ed();
  }
  function Hm() {
    if (Rt === 0)
      if ((Ae & 536870912) === 0 || je) {
        var e = nl;
        nl <<= 1, (nl & 3932160) === 0 && (nl = 262144), Rt = e;
      } else Rt = 536870912;
    return e = Mt.current, e !== null && (e.flags |= 32), Rt;
  }
  function $t(e, t, n) {
    (e === He && (Ce === 2 || Ce === 9) || e.cancelPendingCommit !== null) && (yi(e, 0), Pn(
      e,
      Ae,
      Rt,
      !1
    )), Gi(e, n), ((Me & 2) === 0 || e !== He) && (e === He && ((Me & 2) === 0 && (Ca |= n), Ze === 4 && Pn(
      e,
      Ae,
      Rt,
      !1
    )), ln(e));
  }
  function Gm(e, t, n) {
    if ((Me & 6) !== 0) throw Error(o(327));
    var i = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Hi(e, t), s = i ? mv(e, t) : Oc(e, t, !0), c = i;
    do {
      if (s === 0) {
        mi && !i && Pn(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !dv(n)) {
          s = Oc(e, t, !1), c = !1;
          continue;
        }
        if (s === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var m = 0;
          else
            m = e.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            t = m;
            e: {
              var S = e;
              s = br;
              var A = S.current.memoizedState.isDehydrated;
              if (A && (yi(S, m).flags |= 256), m = Oc(
                S,
                m,
                !1
              ), m !== 2) {
                if (xc && !A) {
                  S.errorRecoveryDisabledLanes |= c, Ca |= c, s = 4;
                  break e;
                }
                c = wt, wt = s, c !== null && (wt === null ? wt = c : wt.push.apply(
                  wt,
                  c
                ));
              }
              s = m;
            }
            if (c = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          yi(e, 0), Pn(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, c = s, c) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              Pn(
                i,
                t,
                Rt,
                !Zn
              );
              break e;
            case 2:
              wt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && (s = Xl + 300 - bt(), 10 < s)) {
            if (Pn(
              i,
              t,
              Rt,
              !Zn
            ), il(i, 0, !0) !== 0) break e;
            wn = t, i.timeoutHandle = vp(
              qm.bind(
                null,
                i,
                n,
                wt,
                Ql,
                jc,
                t,
                Rt,
                Ca,
                pi,
                Zn,
                c,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break e;
          }
          qm(
            i,
            n,
            wt,
            Ql,
            jc,
            t,
            Rt,
            Ca,
            pi,
            Zn,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    ln(e);
  }
  function qm(e, t, n, i, s, c, m, S, A, T, B, q, C, z) {
    if (e.timeoutHandle = -1, q = t.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: fn
      }, zm(
        t,
        c,
        q
      );
      var P = (c & 62914560) === c ? Xl - bt() : (c & 4194048) === c ? Vm - bt() : 0;
      if (P = Zv(
        q,
        P
      ), P !== null) {
        wn = c, e.cancelPendingCommit = P(
          Jm.bind(
            null,
            e,
            t,
            c,
            n,
            i,
            s,
            m,
            S,
            A,
            B,
            q,
            null,
            C,
            z
          )
        ), Pn(e, c, m, !T);
        return;
      }
    }
    Jm(
      e,
      t,
      c,
      n,
      i,
      s,
      m,
      S,
      A
    );
  }
  function dv(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var s = n[i], c = s.getSnapshot;
          s = s.value;
          try {
            if (!Dt(c(), s)) return !1;
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
  function Pn(e, t, n, i) {
    t &= ~Nc, t &= ~Ca, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var s = t; 0 < s; ) {
      var c = 31 - lt(s), m = 1 << c;
      i[c] = -1, s &= ~m;
    }
    n !== 0 && Wu(e, n, t);
  }
  function Zl() {
    return (Me & 6) === 0 ? (_r(0), !1) : !0;
  }
  function Dc() {
    if (_e !== null) {
      if (Ce === 0)
        var e = _e.return;
      else
        e = _e, yn = xa = null, Xo(e), li = null, ar = 0, e = _e;
      for (; e !== null; )
        bm(e.alternate, e), e = e.return;
      _e = null;
    }
  }
  function yi(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, Ov(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), wn = 0, Dc(), He = e, _e = n = pn(e.current, null), Ae = t, Ce = 0, zt = null, Zn = !1, mi = Hi(e, t), xc = !1, pi = Rt = Nc = Ca = Jn = Ze = 0, wt = br = null, jc = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var s = 31 - lt(i), c = 1 << s;
        t |= e[s], i &= ~c;
      }
    return jn = t, yl(), n;
  }
  function Im(e, t) {
    ye = null, D.H = dr, t === ri || t === xl ? (t = rf(), Ce = 3) : t === zo ? (t = rf(), Ce = 4) : Ce = t === oc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, zt = t, _e === null && (Ze = 1, Vl(
      e,
      Gt(t, e.current)
    ));
  }
  function Km() {
    var e = Mt.current;
    return e === null ? !0 : (Ae & 4194048) === Ae ? Yt === null : (Ae & 62914560) === Ae || (Ae & 536870912) !== 0 ? e === Yt : !1;
  }
  function Ym() {
    var e = D.H;
    return D.H = dr, e === null ? dr : e;
  }
  function Xm() {
    var e = D.A;
    return D.A = cv, e;
  }
  function Jl() {
    Ze = 4, Zn || (Ae & 4194048) !== Ae && Mt.current !== null || (mi = !0), (Jn & 134217727) === 0 && (Ca & 134217727) === 0 || He === null || Pn(
      He,
      Ae,
      Rt,
      !1
    );
  }
  function Oc(e, t, n) {
    var i = Me;
    Me |= 2;
    var s = Ym(), c = Xm();
    (He !== e || Ae !== t) && (Ql = null, yi(e, t)), t = !1;
    var m = Ze;
    e: do
      try {
        if (Ce !== 0 && _e !== null) {
          var S = _e, A = zt;
          switch (Ce) {
            case 8:
              Dc(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Mt.current === null && (t = !0);
              var T = Ce;
              if (Ce = 0, zt = null, gi(e, S, A, T), n && mi) {
                m = 0;
                break e;
              }
              break;
            default:
              T = Ce, Ce = 0, zt = null, gi(e, S, A, T);
          }
        }
        fv(), m = Ze;
        break;
      } catch (B) {
        Im(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, yn = xa = null, Me = i, D.H = s, D.A = c, _e === null && (He = null, Ae = 0, yl()), m;
  }
  function fv() {
    for (; _e !== null; ) km(_e);
  }
  function mv(e, t) {
    var n = Me;
    Me |= 2;
    var i = Ym(), s = Xm();
    He !== e || Ae !== t ? (Ql = null, kl = bt() + 500, yi(e, t)) : mi = Hi(
      e,
      t
    );
    e: do
      try {
        if (Ce !== 0 && _e !== null) {
          t = _e;
          var c = zt;
          t: switch (Ce) {
            case 1:
              Ce = 0, zt = null, gi(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (nf(c)) {
                Ce = 0, zt = null, Qm(t);
                break;
              }
              t = function() {
                Ce !== 2 && Ce !== 9 || He !== e || (Ce = 7), ln(e);
              }, c.then(t, t);
              break e;
            case 3:
              Ce = 7;
              break e;
            case 4:
              Ce = 5;
              break e;
            case 7:
              nf(c) ? (Ce = 0, zt = null, Qm(t)) : (Ce = 0, zt = null, gi(e, t, c, 7));
              break;
            case 5:
              var m = null;
              switch (_e.tag) {
                case 26:
                  m = _e.memoizedState;
                case 5:
                case 27:
                  var S = _e;
                  if (m ? Cp(m) : S.stateNode.complete) {
                    Ce = 0, zt = null;
                    var A = S.sibling;
                    if (A !== null) _e = A;
                    else {
                      var T = S.return;
                      T !== null ? (_e = T, Wl(T)) : _e = null;
                    }
                    break t;
                  }
              }
              Ce = 0, zt = null, gi(e, t, c, 5);
              break;
            case 6:
              Ce = 0, zt = null, gi(e, t, c, 6);
              break;
            case 8:
              Dc(), Ze = 6;
              break e;
            default:
              throw Error(o(462));
          }
        }
        pv();
        break;
      } catch (B) {
        Im(e, B);
      }
    while (!0);
    return yn = xa = null, D.H = i, D.A = s, Me = n, _e !== null ? 0 : (He = null, Ae = 0, yl(), Ze);
  }
  function pv() {
    for (; _e !== null && !Pr(); )
      km(_e);
  }
  function km(e) {
    var t = gm(e.alternate, e, jn);
    e.memoizedProps = e.pendingProps, t === null ? Wl(e) : _e = t;
  }
  function Qm(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = dm(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Ae
        );
        break;
      case 11:
        t = dm(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Ae
        );
        break;
      case 5:
        Xo(t);
      default:
        bm(n, t), t = _e = Yd(t, jn), t = gm(n, t, jn);
    }
    e.memoizedProps = e.pendingProps, t === null ? Wl(e) : _e = t;
  }
  function gi(e, t, n, i) {
    yn = xa = null, Xo(t), li = null, ar = 0;
    var s = t.return;
    try {
      if (nv(
        e,
        s,
        t,
        n,
        Ae
      )) {
        Ze = 1, Vl(
          e,
          Gt(n, e.current)
        ), _e = null;
        return;
      }
    } catch (c) {
      if (s !== null) throw _e = s, c;
      Ze = 1, Vl(
        e,
        Gt(n, e.current)
      ), _e = null;
      return;
    }
    t.flags & 32768 ? (je || i === 1 ? e = !0 : mi || (Ae & 536870912) !== 0 ? e = !1 : (Zn = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Mt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Zm(t, e)) : Wl(t);
  }
  function Wl(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        Zm(
          t,
          Zn
        );
        return;
      }
      e = t.return;
      var n = rv(
        t.alternate,
        t,
        jn
      );
      if (n !== null) {
        _e = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        _e = t;
        return;
      }
      _e = t = e;
    } while (t !== null);
    Ze === 0 && (Ze = 5);
  }
  function Zm(e, t) {
    do {
      var n = lv(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, _e = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        _e = e;
        return;
      }
      _e = e = n;
    } while (e !== null);
    Ze = 6, _e = null;
  }
  function Jm(e, t, n, i, s, c, m, S, A) {
    e.cancelPendingCommit = null;
    do
      Fl();
    while (rt !== 0);
    if ((Me & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (c = t.lanes | t.childLanes, c |= bo, ky(
        e,
        n,
        c,
        m,
        S,
        A
      ), e === He && (_e = He = null, Ae = 0), hi = t, Fn = e, wn = n, wc = c, $c = s, Bm = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vv(Se, function() {
        return tp(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = D.T, D.T = null, s = X.p, X.p = 2, m = Me, Me |= 4;
        try {
          sv(e, t, n);
        } finally {
          Me = m, X.p = s, D.T = i;
        }
      }
      rt = 1, Wm(), Fm(), Pm();
    }
  }
  function Wm() {
    if (rt === 1) {
      rt = 0;
      var e = Fn, t = hi, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = D.T, D.T = null;
        var i = X.p;
        X.p = 2;
        var s = Me;
        Me |= 4;
        try {
          Om(t, e);
          var c = Ic, m = Ud(e.containerInfo), S = c.focusedElem, A = c.selectionRange;
          if (m !== S && S && S.ownerDocument && Rd(
            S.ownerDocument.documentElement,
            S
          )) {
            if (A !== null && po(S)) {
              var T = A.start, B = A.end;
              if (B === void 0 && (B = T), "selectionStart" in S)
                S.selectionStart = T, S.selectionEnd = Math.min(
                  B,
                  S.value.length
                );
              else {
                var q = S.ownerDocument || document, C = q && q.defaultView || window;
                if (C.getSelection) {
                  var z = C.getSelection(), P = S.textContent.length, ue = Math.min(A.start, P), Ve = A.end === void 0 ? ue : Math.min(A.end, P);
                  !z.extend && ue > Ve && (m = Ve, Ve = ue, ue = m);
                  var w = zd(
                    S,
                    ue
                  ), N = zd(
                    S,
                    Ve
                  );
                  if (w && N && (z.rangeCount !== 1 || z.anchorNode !== w.node || z.anchorOffset !== w.offset || z.focusNode !== N.node || z.focusOffset !== N.offset)) {
                    var $ = q.createRange();
                    $.setStart(w.node, w.offset), z.removeAllRanges(), ue > Ve ? (z.addRange($), z.extend(N.node, N.offset)) : ($.setEnd(N.node, N.offset), z.addRange($));
                  }
                }
              }
            }
            for (q = [], z = S; z = z.parentNode; )
              z.nodeType === 1 && q.push({
                element: z,
                left: z.scrollLeft,
                top: z.scrollTop
              });
            for (typeof S.focus == "function" && S.focus(), S = 0; S < q.length; S++) {
              var H = q[S];
              H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
            }
          }
          us = !!qc, Ic = qc = null;
        } finally {
          Me = s, X.p = i, D.T = n;
        }
      }
      e.current = t, rt = 2;
    }
  }
  function Fm() {
    if (rt === 2) {
      rt = 0;
      var e = Fn, t = hi, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = D.T, D.T = null;
        var i = X.p;
        X.p = 2;
        var s = Me;
        Me |= 4;
        try {
          jm(e, t.alternate, t);
        } finally {
          Me = s, X.p = i, D.T = n;
        }
      }
      rt = 3;
    }
  }
  function Pm() {
    if (rt === 4 || rt === 3) {
      rt = 0, el();
      var e = Fn, t = hi, n = wn, i = Bm;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? rt = 5 : (rt = 0, hi = Fn = null, ep(e, e.pendingLanes));
      var s = e.pendingLanes;
      if (s === 0 && (Wn = null), Qs(n), t = t.stateNode, Pe && typeof Pe.onCommitFiberRoot == "function")
        try {
          Pe.onCommitFiberRoot(
            dt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = D.T, s = X.p, X.p = 2, D.T = null;
        try {
          for (var c = e.onRecoverableError, m = 0; m < i.length; m++) {
            var S = i[m];
            c(S.value, {
              componentStack: S.stack
            });
          }
        } finally {
          D.T = t, X.p = s;
        }
      }
      (wn & 3) !== 0 && Fl(), ln(e), s = e.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? e === Tc ? Sr++ : (Sr = 0, Tc = e) : Sr = 0, _r(0);
    }
  }
  function ep(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, tr(t)));
  }
  function Fl() {
    return Wm(), Fm(), Pm(), tp();
  }
  function tp() {
    if (rt !== 5) return !1;
    var e = Fn, t = wc;
    wc = 0;
    var n = Qs(wn), i = D.T, s = X.p;
    try {
      X.p = 32 > n ? 32 : n, D.T = null, n = $c, $c = null;
      var c = Fn, m = wn;
      if (rt = 0, hi = Fn = null, wn = 0, (Me & 6) !== 0) throw Error(o(331));
      var S = Me;
      if (Me |= 4, Um(c.current), Cm(
        c,
        c.current,
        m,
        n
      ), Me = S, _r(0, !1), Pe && typeof Pe.onPostCommitFiberRoot == "function")
        try {
          Pe.onPostCommitFiberRoot(dt, c);
        } catch {
        }
      return !0;
    } finally {
      X.p = s, D.T = i, ep(e, t);
    }
  }
  function np(e, t, n) {
    t = Gt(n, t), t = sc(e.stateNode, t, 2), e = Yn(e, t, 2), e !== null && (Gi(e, 2), ln(e));
  }
  function ze(e, t, n) {
    if (e.tag === 3)
      np(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          np(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Wn === null || !Wn.has(i))) {
            e = Gt(n, e), n = am(2), i = Yn(t, n, 2), i !== null && (im(
              n,
              i,
              t,
              e
            ), Gi(i, 2), ln(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function Mc(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new uv();
      var s = /* @__PURE__ */ new Set();
      i.set(t, s);
    } else
      s = i.get(t), s === void 0 && (s = /* @__PURE__ */ new Set(), i.set(t, s));
    s.has(n) || (xc = !0, s.add(n), e = hv.bind(null, e, t, n), t.then(e, e));
  }
  function hv(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, He === e && (Ae & n) === n && (Ze === 4 || Ze === 3 && (Ae & 62914560) === Ae && 300 > bt() - Xl ? (Me & 2) === 0 && yi(e, 0) : Nc |= n, pi === Ae && (pi = 0)), ln(e);
  }
  function ap(e, t) {
    t === 0 && (t = Ju()), e = _a(e, t), e !== null && (Gi(e, t), ln(e));
  }
  function yv(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), ap(e, n);
  }
  function gv(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, s = e.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    i !== null && i.delete(t), ap(e, n);
  }
  function vv(e, t) {
    return Vi(e, t);
  }
  var Pl = null, vi = null, Cc = !1, es = !1, zc = !1, ea = 0;
  function ln(e) {
    e !== vi && e.next === null && (vi === null ? Pl = vi = e : vi = vi.next = e), es = !0, Cc || (Cc = !0, Sv());
  }
  function _r(e, t) {
    if (!zc && es) {
      zc = !0;
      do
        for (var n = !1, i = Pl; i !== null; ) {
          if (e !== 0) {
            var s = i.pendingLanes;
            if (s === 0) var c = 0;
            else {
              var m = i.suspendedLanes, S = i.pingedLanes;
              c = (1 << 31 - lt(42 | e) + 1) - 1, c &= s & ~(m & ~S), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, sp(i, c));
          } else
            c = Ae, c = il(
              i,
              i === He ? c : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (c & 3) === 0 || Hi(i, c) || (n = !0, sp(i, c));
          i = i.next;
        }
      while (n);
      zc = !1;
    }
  }
  function bv() {
    ip();
  }
  function ip() {
    es = Cc = !1;
    var e = 0;
    ea !== 0 && Dv() && (e = ea);
    for (var t = bt(), n = null, i = Pl; i !== null; ) {
      var s = i.next, c = rp(i, t);
      c === 0 ? (i.next = null, n === null ? Pl = s : n.next = s, s === null && (vi = n)) : (n = i, (e !== 0 || (c & 3) !== 0) && (es = !0)), i = s;
    }
    rt !== 0 && rt !== 5 || _r(e), ea !== 0 && (ea = 0);
  }
  function rp(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, s = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var m = 31 - lt(c), S = 1 << m, A = s[m];
      A === -1 ? ((S & n) === 0 || (S & i) !== 0) && (s[m] = Xy(S, t)) : A <= t && (e.expiredLanes |= S), c &= ~S;
    }
    if (t = He, n = Ae, n = il(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, n === 0 || e === t && (Ce === 2 || Ce === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && Un(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Hi(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (i !== null && Un(i), Qs(n)) {
        case 2:
        case 8:
          n = K;
          break;
        case 32:
          n = Se;
          break;
        case 268435456:
          n = ha;
          break;
        default:
          n = Se;
      }
      return i = lp.bind(null, e), n = Vi(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && Un(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function lp(e, t) {
    if (rt !== 0 && rt !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Fl() && e.callbackNode !== n)
      return null;
    var i = Ae;
    return i = il(
      e,
      e === He ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (Gm(e, i, t), rp(e, bt()), e.callbackNode != null && e.callbackNode === n ? lp.bind(null, e) : null);
  }
  function sp(e, t) {
    if (Fl()) return null;
    Gm(e, t, !0);
  }
  function Sv() {
    Mv(function() {
      (Me & 6) !== 0 ? Vi(
        Bi,
        bv
      ) : ip();
    });
  }
  function Rc() {
    if (ea === 0) {
      var e = ai;
      e === 0 && (e = tl, tl <<= 1, (tl & 261888) === 0 && (tl = 256)), ea = e;
    }
    return ea;
  }
  function op(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ol("" + e);
  }
  function cp(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function _v(e, t, n, i, s) {
    if (t === "submit" && n && n.stateNode === s) {
      var c = op(
        (s[Et] || null).action
      ), m = i.submitter;
      m && (t = (t = m[Et] || null) ? op(t.formAction) : m.getAttribute("formAction"), t !== null && (c = t, m = null));
      var S = new fl(
        "action",
        "action",
        null,
        i,
        s
      );
      e.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (ea !== 0) {
                  var A = m ? cp(s, m) : new FormData(s);
                  tc(
                    n,
                    {
                      pending: !0,
                      data: A,
                      method: s.method,
                      action: c
                    },
                    null,
                    A
                  );
                }
              } else
                typeof c == "function" && (S.preventDefault(), A = m ? cp(s, m) : new FormData(s), tc(
                  n,
                  {
                    pending: !0,
                    data: A,
                    method: s.method,
                    action: c
                  },
                  c,
                  A
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var Uc = 0; Uc < vo.length; Uc++) {
    var Lc = vo[Uc], Ev = Lc.toLowerCase(), Av = Lc[0].toUpperCase() + Lc.slice(1);
    Jt(
      Ev,
      "on" + Av
    );
  }
  Jt(Bd, "onAnimationEnd"), Jt(Hd, "onAnimationIteration"), Jt(Gd, "onAnimationStart"), Jt("dblclick", "onDoubleClick"), Jt("focusin", "onFocus"), Jt("focusout", "onBlur"), Jt(Bg, "onTransitionRun"), Jt(Hg, "onTransitionStart"), Jt(Gg, "onTransitionCancel"), Jt(qd, "onTransitionEnd"), Ia("onMouseEnter", ["mouseout", "mouseover"]), Ia("onMouseLeave", ["mouseout", "mouseover"]), Ia("onPointerEnter", ["pointerout", "pointerover"]), Ia("onPointerLeave", ["pointerout", "pointerover"]), ga(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ga(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ga("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ga(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ga(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ga(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Er = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), xv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Er)
  );
  function up(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], s = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var S = i[m], A = S.instance, T = S.currentTarget;
            if (S = S.listener, A !== c && s.isPropagationStopped())
              break e;
            c = S, s.currentTarget = T;
            try {
              c(s);
            } catch (B) {
              hl(B);
            }
            s.currentTarget = null, c = A;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (S = i[m], A = S.instance, T = S.currentTarget, S = S.listener, A !== c && s.isPropagationStopped())
              break e;
            c = S, s.currentTarget = T;
            try {
              c(s);
            } catch (B) {
              hl(B);
            }
            s.currentTarget = null, c = A;
          }
      }
    }
  }
  function Ee(e, t) {
    var n = t[Zs];
    n === void 0 && (n = t[Zs] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (dp(t, e, 2, !1), n.add(i));
  }
  function Vc(e, t, n) {
    var i = 0;
    t && (i |= 4), dp(
      n,
      e,
      i,
      t
    );
  }
  var ts = "_reactListening" + Math.random().toString(36).slice(2);
  function Bc(e) {
    if (!e[ts]) {
      e[ts] = !0, ad.forEach(function(n) {
        n !== "selectionchange" && (xv.has(n) || Vc(n, !1, e), Vc(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ts] || (t[ts] = !0, Vc("selectionchange", !1, t));
    }
  }
  function dp(e, t, n, i) {
    switch (Hp(t)) {
      case 2:
        var s = Fv;
        break;
      case 8:
        s = Pv;
        break;
      default:
        s = eu;
    }
    n = s.bind(
      null,
      t,
      n,
      e
    ), s = void 0, !io || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (s = !0), i ? s !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: s
    }) : e.addEventListener(t, n, !0) : s !== void 0 ? e.addEventListener(t, n, {
      passive: s
    }) : e.addEventListener(t, n, !1);
  }
  function Hc(e, t, n, i, s) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var S = i.stateNode.containerInfo;
          if (S === s) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var A = m.tag;
              if ((A === 3 || A === 4) && m.stateNode.containerInfo === s)
                return;
              m = m.return;
            }
          for (; S !== null; ) {
            if (m = Ha(S), m === null) return;
            if (A = m.tag, A === 5 || A === 6 || A === 26 || A === 27) {
              i = c = m;
              continue e;
            }
            S = S.parentNode;
          }
        }
        i = i.return;
      }
    hd(function() {
      var T = c, B = no(n), q = [];
      e: {
        var C = Id.get(e);
        if (C !== void 0) {
          var z = fl, P = e;
          switch (e) {
            case "keypress":
              if (ul(n) === 0) break e;
            case "keydown":
            case "keyup":
              z = gg;
              break;
            case "focusin":
              P = "focus", z = oo;
              break;
            case "focusout":
              P = "blur", z = oo;
              break;
            case "beforeblur":
            case "afterblur":
              z = oo;
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
              z = vd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              z = rg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              z = Sg;
              break;
            case Bd:
            case Hd:
            case Gd:
              z = og;
              break;
            case qd:
              z = Eg;
              break;
            case "scroll":
            case "scrollend":
              z = ag;
              break;
            case "wheel":
              z = xg;
              break;
            case "copy":
            case "cut":
            case "paste":
              z = ug;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              z = Sd;
              break;
            case "toggle":
            case "beforetoggle":
              z = jg;
          }
          var ue = (t & 4) !== 0, Ve = !ue && (e === "scroll" || e === "scrollend"), w = ue ? C !== null ? C + "Capture" : null : C;
          ue = [];
          for (var N = T, $; N !== null; ) {
            var H = N;
            if ($ = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || $ === null || w === null || (H = Ki(N, w), H != null && ue.push(
              Ar(N, H, $)
            )), Ve) break;
            N = N.return;
          }
          0 < ue.length && (C = new z(
            C,
            P,
            null,
            n,
            B
          ), q.push({ event: C, listeners: ue }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (C = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", C && n !== to && (P = n.relatedTarget || n.fromElement) && (Ha(P) || P[Ba]))
            break e;
          if ((z || C) && (C = B.window === B ? B : (C = B.ownerDocument) ? C.defaultView || C.parentWindow : window, z ? (P = n.relatedTarget || n.toElement, z = T, P = P ? Ha(P) : null, P !== null && (Ve = d(P), ue = P.tag, P !== Ve || ue !== 5 && ue !== 27 && ue !== 6) && (P = null)) : (z = null, P = T), z !== P)) {
            if (ue = vd, H = "onMouseLeave", w = "onMouseEnter", N = "mouse", (e === "pointerout" || e === "pointerover") && (ue = Sd, H = "onPointerLeave", w = "onPointerEnter", N = "pointer"), Ve = z == null ? C : Ii(z), $ = P == null ? C : Ii(P), C = new ue(
              H,
              N + "leave",
              z,
              n,
              B
            ), C.target = Ve, C.relatedTarget = $, H = null, Ha(B) === T && (ue = new ue(
              w,
              N + "enter",
              P,
              n,
              B
            ), ue.target = $, ue.relatedTarget = Ve, H = ue), Ve = H, z && P)
              t: {
                for (ue = Nv, w = z, N = P, $ = 0, H = w; H; H = ue(H))
                  $++;
                H = 0;
                for (var le = N; le; le = ue(le))
                  H++;
                for (; 0 < $ - H; )
                  w = ue(w), $--;
                for (; 0 < H - $; )
                  N = ue(N), H--;
                for (; $--; ) {
                  if (w === N || N !== null && w === N.alternate) {
                    ue = w;
                    break t;
                  }
                  w = ue(w), N = ue(N);
                }
                ue = null;
              }
            else ue = null;
            z !== null && fp(
              q,
              C,
              z,
              ue,
              !1
            ), P !== null && Ve !== null && fp(
              q,
              Ve,
              P,
              ue,
              !0
            );
          }
        }
        e: {
          if (C = T ? Ii(T) : window, z = C.nodeName && C.nodeName.toLowerCase(), z === "select" || z === "input" && C.type === "file")
            var De = $d;
          else if (jd(C))
            if (Td)
              De = Ug;
            else {
              De = zg;
              var ne = Cg;
            }
          else
            z = C.nodeName, !z || z.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? T && eo(T.elementType) && (De = $d) : De = Rg;
          if (De && (De = De(e, T))) {
            wd(
              q,
              De,
              n,
              B
            );
            break e;
          }
          ne && ne(e, C, T), e === "focusout" && T && C.type === "number" && T.memoizedProps.value != null && Ps(C, "number", C.value);
        }
        switch (ne = T ? Ii(T) : window, e) {
          case "focusin":
            (jd(ne) || ne.contentEditable === "true") && (Za = ne, ho = T, Fi = null);
            break;
          case "focusout":
            Fi = ho = Za = null;
            break;
          case "mousedown":
            yo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yo = !1, Ld(q, n, B);
            break;
          case "selectionchange":
            if (Vg) break;
          case "keydown":
          case "keyup":
            Ld(q, n, B);
        }
        var be;
        if (uo)
          e: {
            switch (e) {
              case "compositionstart":
                var xe = "onCompositionStart";
                break e;
              case "compositionend":
                xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                xe = "onCompositionUpdate";
                break e;
            }
            xe = void 0;
          }
        else
          Qa ? xd(e, n) && (xe = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (xe = "onCompositionStart");
        xe && (_d && n.locale !== "ko" && (Qa || xe !== "onCompositionStart" ? xe === "onCompositionEnd" && Qa && (be = yd()) : (Vn = B, ro = "value" in Vn ? Vn.value : Vn.textContent, Qa = !0)), ne = ns(T, xe), 0 < ne.length && (xe = new bd(
          xe,
          e,
          null,
          n,
          B
        ), q.push({ event: xe, listeners: ne }), be ? xe.data = be : (be = Nd(n), be !== null && (xe.data = be)))), (be = $g ? Tg(e, n) : Dg(e, n)) && (xe = ns(T, "onBeforeInput"), 0 < xe.length && (ne = new bd(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          B
        ), q.push({
          event: ne,
          listeners: xe
        }), ne.data = be)), _v(
          q,
          e,
          T,
          n,
          B
        );
      }
      up(q, t);
    });
  }
  function Ar(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function ns(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var s = e, c = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || c === null || (s = Ki(e, n), s != null && i.unshift(
        Ar(e, s, c)
      ), s = Ki(e, t), s != null && i.push(
        Ar(e, s, c)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function Nv(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function fp(e, t, n, i, s) {
    for (var c = t._reactName, m = []; n !== null && n !== i; ) {
      var S = n, A = S.alternate, T = S.stateNode;
      if (S = S.tag, A !== null && A === i) break;
      S !== 5 && S !== 26 && S !== 27 || T === null || (A = T, s ? (T = Ki(n, c), T != null && m.unshift(
        Ar(n, T, A)
      )) : s || (T = Ki(n, c), T != null && m.push(
        Ar(n, T, A)
      ))), n = n.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var jv = /\r\n?/g, wv = /\u0000|\uFFFD/g;
  function mp(e) {
    return (typeof e == "string" ? e : "" + e).replace(jv, `
`).replace(wv, "");
  }
  function pp(e, t) {
    return t = mp(t), mp(e) === t;
  }
  function Le(e, t, n, i, s, c) {
    switch (n) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || Ya(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && Ya(e, "" + i);
        break;
      case "className":
        ll(e, "class", i);
        break;
      case "tabIndex":
        ll(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ll(e, n, i);
        break;
      case "style":
        md(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          ll(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = ol("" + i), e.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (n === "formAction" ? (t !== "input" && Le(e, t, "name", s.name, s, null), Le(
            e,
            t,
            "formEncType",
            s.formEncType,
            s,
            null
          ), Le(
            e,
            t,
            "formMethod",
            s.formMethod,
            s,
            null
          ), Le(
            e,
            t,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (Le(e, t, "encType", s.encType, s, null), Le(e, t, "method", s.method, s, null), Le(e, t, "target", s.target, s, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = ol("" + i), e.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (e.onclick = fn);
        break;
      case "onScroll":
        i != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ee("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
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
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = ol("" + i), e.setAttributeNS(
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
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "" + i) : e.removeAttribute(n);
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
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(n) : e.setAttribute(n, i);
        break;
      case "popover":
        Ee("beforetoggle", e), Ee("toggle", e), rl(e, "popover", i);
        break;
      case "xlinkActuate":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        dn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        dn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        rl(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = tg.get(n) || n, rl(e, n, i));
    }
  }
  function Gc(e, t, n, i, s, c) {
    switch (n) {
      case "style":
        md(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(o(61));
          if (n = i.__html, n != null) {
            if (s.children != null) throw Error(o(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string" ? Ya(e, i) : (typeof i == "number" || typeof i == "bigint") && Ya(e, "" + i);
        break;
      case "onScroll":
        i != null && Ee("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ee("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = fn);
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
        if (!id.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), t = n.slice(2, s ? n.length - 7 : void 0), c = e[Et] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, s), typeof i == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, i, s);
              break e;
            }
            n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : rl(e, n, i);
          }
    }
  }
  function yt(e, t, n) {
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
        Ee("error", e), Ee("load", e);
        var i = !1, s = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var m = n[c];
            if (m != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  Le(e, t, c, m, n, null);
              }
          }
        s && Le(e, t, "srcSet", n.srcSet, n, null), i && Le(e, t, "src", n.src, n, null);
        return;
      case "input":
        Ee("invalid", e);
        var S = c = m = s = null, A = null, T = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var B = n[i];
            if (B != null)
              switch (i) {
                case "name":
                  s = B;
                  break;
                case "type":
                  m = B;
                  break;
                case "checked":
                  A = B;
                  break;
                case "defaultChecked":
                  T = B;
                  break;
                case "value":
                  c = B;
                  break;
                case "defaultValue":
                  S = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(o(137, t));
                  break;
                default:
                  Le(e, t, i, B, n, null);
              }
          }
        cd(
          e,
          c,
          S,
          A,
          T,
          m,
          s,
          !1
        );
        return;
      case "select":
        Ee("invalid", e), i = m = c = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (S = n[s], S != null))
            switch (s) {
              case "value":
                c = S;
                break;
              case "defaultValue":
                m = S;
                break;
              case "multiple":
                i = S;
              default:
                Le(e, t, s, S, n, null);
            }
        t = c, n = m, e.multiple = !!i, t != null ? Ka(e, !!i, t, !1) : n != null && Ka(e, !!i, n, !0);
        return;
      case "textarea":
        Ee("invalid", e), c = s = i = null;
        for (m in n)
          if (n.hasOwnProperty(m) && (S = n[m], S != null))
            switch (m) {
              case "value":
                i = S;
                break;
              case "defaultValue":
                s = S;
                break;
              case "children":
                c = S;
                break;
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(o(91));
                break;
              default:
                Le(e, t, m, S, n, null);
            }
        dd(e, i, s, c);
        return;
      case "option":
        for (A in n)
          if (n.hasOwnProperty(A) && (i = n[A], i != null))
            switch (A) {
              case "selected":
                e.selected = i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                Le(e, t, A, i, n, null);
            }
        return;
      case "dialog":
        Ee("beforetoggle", e), Ee("toggle", e), Ee("cancel", e), Ee("close", e);
        break;
      case "iframe":
      case "object":
        Ee("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Er.length; i++)
          Ee(Er[i], e);
        break;
      case "image":
        Ee("error", e), Ee("load", e);
        break;
      case "details":
        Ee("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ee("error", e), Ee("load", e);
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
        for (T in n)
          if (n.hasOwnProperty(T) && (i = n[T], i != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                Le(e, t, T, i, n, null);
            }
        return;
      default:
        if (eo(t)) {
          for (B in n)
            n.hasOwnProperty(B) && (i = n[B], i !== void 0 && Gc(
              e,
              t,
              B,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (S in n)
      n.hasOwnProperty(S) && (i = n[S], i != null && Le(e, t, S, i, n, null));
  }
  function $v(e, t, n, i) {
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
        var s = null, c = null, m = null, S = null, A = null, T = null, B = null;
        for (z in n) {
          var q = n[z];
          if (n.hasOwnProperty(z) && q != null)
            switch (z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                A = q;
              default:
                i.hasOwnProperty(z) || Le(e, t, z, null, i, q);
            }
        }
        for (var C in i) {
          var z = i[C];
          if (q = n[C], i.hasOwnProperty(C) && (z != null || q != null))
            switch (C) {
              case "type":
                c = z;
                break;
              case "name":
                s = z;
                break;
              case "checked":
                T = z;
                break;
              case "defaultChecked":
                B = z;
                break;
              case "value":
                m = z;
                break;
              case "defaultValue":
                S = z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(o(137, t));
                break;
              default:
                z !== q && Le(
                  e,
                  t,
                  C,
                  z,
                  i,
                  q
                );
            }
        }
        Fs(
          e,
          m,
          S,
          A,
          T,
          B,
          c,
          s
        );
        return;
      case "select":
        z = m = S = C = null;
        for (c in n)
          if (A = n[c], n.hasOwnProperty(c) && A != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                z = A;
              default:
                i.hasOwnProperty(c) || Le(
                  e,
                  t,
                  c,
                  null,
                  i,
                  A
                );
            }
        for (s in i)
          if (c = i[s], A = n[s], i.hasOwnProperty(s) && (c != null || A != null))
            switch (s) {
              case "value":
                C = c;
                break;
              case "defaultValue":
                S = c;
                break;
              case "multiple":
                m = c;
              default:
                c !== A && Le(
                  e,
                  t,
                  s,
                  c,
                  i,
                  A
                );
            }
        t = S, n = m, i = z, C != null ? Ka(e, !!n, C, !1) : !!i != !!n && (t != null ? Ka(e, !!n, t, !0) : Ka(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        z = C = null;
        for (S in n)
          if (s = n[S], n.hasOwnProperty(S) && s != null && !i.hasOwnProperty(S))
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                Le(e, t, S, null, i, s);
            }
        for (m in i)
          if (s = i[m], c = n[m], i.hasOwnProperty(m) && (s != null || c != null))
            switch (m) {
              case "value":
                C = s;
                break;
              case "defaultValue":
                z = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(o(91));
                break;
              default:
                s !== c && Le(e, t, m, s, i, c);
            }
        ud(e, C, z);
        return;
      case "option":
        for (var P in n)
          if (C = n[P], n.hasOwnProperty(P) && C != null && !i.hasOwnProperty(P))
            switch (P) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Le(
                  e,
                  t,
                  P,
                  null,
                  i,
                  C
                );
            }
        for (A in i)
          if (C = i[A], z = n[A], i.hasOwnProperty(A) && C !== z && (C != null || z != null))
            switch (A) {
              case "selected":
                e.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Le(
                  e,
                  t,
                  A,
                  C,
                  i,
                  z
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
        for (var ue in n)
          C = n[ue], n.hasOwnProperty(ue) && C != null && !i.hasOwnProperty(ue) && Le(e, t, ue, null, i, C);
        for (T in i)
          if (C = i[T], z = n[T], i.hasOwnProperty(T) && C !== z && (C != null || z != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(o(137, t));
                break;
              default:
                Le(
                  e,
                  t,
                  T,
                  C,
                  i,
                  z
                );
            }
        return;
      default:
        if (eo(t)) {
          for (var Ve in n)
            C = n[Ve], n.hasOwnProperty(Ve) && C !== void 0 && !i.hasOwnProperty(Ve) && Gc(
              e,
              t,
              Ve,
              void 0,
              i,
              C
            );
          for (B in i)
            C = i[B], z = n[B], !i.hasOwnProperty(B) || C === z || C === void 0 && z === void 0 || Gc(
              e,
              t,
              B,
              C,
              i,
              z
            );
          return;
        }
    }
    for (var w in n)
      C = n[w], n.hasOwnProperty(w) && C != null && !i.hasOwnProperty(w) && Le(e, t, w, null, i, C);
    for (q in i)
      C = i[q], z = n[q], !i.hasOwnProperty(q) || C === z || C == null && z == null || Le(e, t, q, C, i, z);
  }
  function hp(e) {
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
  function Tv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var s = n[i], c = s.transferSize, m = s.initiatorType, S = s.duration;
        if (c && S && hp(m)) {
          for (m = 0, S = s.responseEnd, i += 1; i < n.length; i++) {
            var A = n[i], T = A.startTime;
            if (T > S) break;
            var B = A.transferSize, q = A.initiatorType;
            B && hp(q) && (A = A.responseEnd, m += B * (A < S ? 1 : (S - T) / (A - T)));
          }
          if (--i, t += 8 * (c + m) / (s.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var qc = null, Ic = null;
  function as(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function yp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function gp(e, t) {
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
  function Kc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Yc = null;
  function Dv() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Yc ? !1 : (Yc = e, !0) : (Yc = null, !1);
  }
  var vp = typeof setTimeout == "function" ? setTimeout : void 0, Ov = typeof clearTimeout == "function" ? clearTimeout : void 0, bp = typeof Promise == "function" ? Promise : void 0, Mv = typeof queueMicrotask == "function" ? queueMicrotask : typeof bp < "u" ? function(e) {
    return bp.resolve(null).then(e).catch(Cv);
  } : vp;
  function Cv(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ta(e) {
    return e === "head";
  }
  function Sp(e, t) {
    var n = t, i = 0;
    do {
      var s = n.nextSibling;
      if (e.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (i === 0) {
            e.removeChild(s), Ei(t);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          xr(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, xr(n);
          for (var c = n.firstChild; c; ) {
            var m = c.nextSibling, S = c.nodeName;
            c[qi] || S === "SCRIPT" || S === "STYLE" || S === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = m;
          }
        } else
          n === "body" && xr(e.ownerDocument.body);
      n = s;
    } while (n);
    Ei(t);
  }
  function _p(e, t) {
    var n = e;
    e = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = i;
    } while (n);
  }
  function Xc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Xc(n), Js(n);
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
  function zv(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var s = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[qi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== s.rel || e.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || e.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (s.src == null ? null : s.src) || e.getAttribute("type") !== (s.type == null ? null : s.type) || e.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Xt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function Rv(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Xt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Ep(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Xt(e.nextSibling), e === null)) return null;
    return e;
  }
  function kc(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Qc(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function Uv(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function Xt(e) {
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
  var Zc = null;
  function Ap(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Xt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function xp(e) {
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
  function Np(e, t, n) {
    switch (t = as(n), e) {
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
  function xr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Js(e);
  }
  var kt = /* @__PURE__ */ new Map(), jp = /* @__PURE__ */ new Set();
  function is(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var $n = X.d;
  X.d = {
    f: Lv,
    r: Vv,
    D: Bv,
    C: Hv,
    L: Gv,
    m: qv,
    X: Kv,
    S: Iv,
    M: Yv
  };
  function Lv() {
    var e = $n.f(), t = Zl();
    return e || t;
  }
  function Vv(e) {
    var t = Ga(e);
    t !== null && t.tag === 5 && t.type === "form" ? If(t) : $n.r(e);
  }
  var bi = typeof document > "u" ? null : document;
  function wp(e, t, n) {
    var i = bi;
    if (i && typeof t == "string" && t) {
      var s = Bt(t);
      s = 'link[rel="' + e + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), jp.has(s) || (jp.add(s), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(s) === null && (t = i.createElement("link"), yt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function Bv(e) {
    $n.D(e), wp("dns-prefetch", e, null);
  }
  function Hv(e, t) {
    $n.C(e, t), wp("preconnect", e, t);
  }
  function Gv(e, t, n) {
    $n.L(e, t, n);
    var i = bi;
    if (i && e && t) {
      var s = 'link[rel="preload"][as="' + Bt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + Bt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + Bt(
        n.imageSizes
      ) + '"]')) : s += '[href="' + Bt(e) + '"]';
      var c = s;
      switch (t) {
        case "style":
          c = Si(e);
          break;
        case "script":
          c = _i(e);
      }
      kt.has(c) || (e = g(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), kt.set(c, e), i.querySelector(s) !== null || t === "style" && i.querySelector(Nr(c)) || t === "script" && i.querySelector(jr(c)) || (t = i.createElement("link"), yt(t, "link", e), st(t), i.head.appendChild(t)));
    }
  }
  function qv(e, t) {
    $n.m(e, t);
    var n = bi;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", s = 'link[rel="modulepreload"][as="' + Bt(i) + '"][href="' + Bt(e) + '"]', c = s;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = _i(e);
      }
      if (!kt.has(c) && (e = g({ rel: "modulepreload", href: e }, t), kt.set(c, e), n.querySelector(s) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(jr(c)))
              return;
        }
        i = n.createElement("link"), yt(i, "link", e), st(i), n.head.appendChild(i);
      }
    }
  }
  function Iv(e, t, n) {
    $n.S(e, t, n);
    var i = bi;
    if (i && e) {
      var s = qa(i).hoistableStyles, c = Si(e);
      t = t || "default";
      var m = s.get(c);
      if (!m) {
        var S = { loading: 0, preload: null };
        if (m = i.querySelector(
          Nr(c)
        ))
          S.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = kt.get(c)) && Jc(e, n);
          var A = m = i.createElement("link");
          st(A), yt(A, "link", e), A._p = new Promise(function(T, B) {
            A.onload = T, A.onerror = B;
          }), A.addEventListener("load", function() {
            S.loading |= 1;
          }), A.addEventListener("error", function() {
            S.loading |= 2;
          }), S.loading |= 4, rs(m, t, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: S
        }, s.set(c, m);
      }
    }
  }
  function Kv(e, t) {
    $n.X(e, t);
    var n = bi;
    if (n && e) {
      var i = qa(n).hoistableScripts, s = _i(e), c = i.get(s);
      c || (c = n.querySelector(jr(s)), c || (e = g({ src: e, async: !0 }, t), (t = kt.get(s)) && Wc(e, t), c = n.createElement("script"), st(c), yt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(s, c));
    }
  }
  function Yv(e, t) {
    $n.M(e, t);
    var n = bi;
    if (n && e) {
      var i = qa(n).hoistableScripts, s = _i(e), c = i.get(s);
      c || (c = n.querySelector(jr(s)), c || (e = g({ src: e, async: !0, type: "module" }, t), (t = kt.get(s)) && Wc(e, t), c = n.createElement("script"), st(c), yt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(s, c));
    }
  }
  function $p(e, t, n, i) {
    var s = (s = ve.current) ? is(s) : null;
    if (!s) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Si(n.href), n = qa(
          s
        ).hoistableStyles, i = n.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Si(n.href);
          var c = qa(
            s
          ).hoistableStyles, m = c.get(e);
          if (m || (s = s.ownerDocument || s, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, m), (c = s.querySelector(
            Nr(e)
          )) && !c._p && (m.instance = c, m.state.loading = 5), kt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, kt.set(e, n), c || Xv(
            s,
            e,
            n,
            m.state
          ))), t && i === null)
            throw Error(o(528, ""));
          return m;
        }
        if (t && i !== null)
          throw Error(o(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = _i(n), n = qa(
          s
        ).hoistableScripts, i = n.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(o(444, e));
    }
  }
  function Si(e) {
    return 'href="' + Bt(e) + '"';
  }
  function Nr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Tp(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function Xv(e, t, n, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), yt(t, "link", n), st(t), e.head.appendChild(t));
  }
  function _i(e) {
    return '[src="' + Bt(e) + '"]';
  }
  function jr(e) {
    return "script[async]" + e;
  }
  function Dp(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Bt(n.href) + '"]'
          );
          if (i)
            return t.instance = i, st(i), i;
          var s = g({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), st(i), yt(i, "style", s), rs(i, n.precedence, e), t.instance = i;
        case "stylesheet":
          s = Si(n.href);
          var c = e.querySelector(
            Nr(s)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, st(c), c;
          i = Tp(n), (s = kt.get(s)) && Jc(i, s), c = (e.ownerDocument || e).createElement("link"), st(c);
          var m = c;
          return m._p = new Promise(function(S, A) {
            m.onload = S, m.onerror = A;
          }), yt(c, "link", i), t.state.loading |= 4, rs(c, n.precedence, e), t.instance = c;
        case "script":
          return c = _i(n.src), (s = e.querySelector(
            jr(c)
          )) ? (t.instance = s, st(s), s) : (i = n, (s = kt.get(c)) && (i = g({}, n), Wc(i, s)), e = e.ownerDocument || e, s = e.createElement("script"), st(s), yt(s, "link", i), e.head.appendChild(s), t.instance = s);
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, rs(i, n.precedence, e));
    return t.instance;
  }
  function rs(e, t, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = i.length ? i[i.length - 1] : null, c = s, m = 0; m < i.length; m++) {
      var S = i[m];
      if (S.dataset.precedence === t) c = S;
      else if (c !== s) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Jc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Wc(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ls = null;
  function Op(e, t, n) {
    if (ls === null) {
      var i = /* @__PURE__ */ new Map(), s = ls = /* @__PURE__ */ new Map();
      s.set(n, i);
    } else
      s = ls, i = s.get(n), i || (i = /* @__PURE__ */ new Map(), s.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), s = 0; s < n.length; s++) {
      var c = n[s];
      if (!(c[qi] || c[ft] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = c.getAttribute(t) || "";
        m = e + m;
        var S = i.get(m);
        S ? S.push(c) : i.set(m, [c]);
      }
    }
    return i;
  }
  function Mp(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function kv(e, t, n) {
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
  function Cp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function Qv(e, t, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = Si(i.href), c = t.querySelector(
          Nr(s)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ss.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, st(c);
          return;
        }
        c = t.ownerDocument || t, i = Tp(i), (s = kt.get(s)) && Jc(i, s), c = c.createElement("link"), st(c);
        var m = c;
        m._p = new Promise(function(S, A) {
          m.onload = S, m.onerror = A;
        }), yt(c, "link", i), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = ss.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Fc = 0;
  function Zv(e, t) {
    return e.stylesheets && e.count === 0 && cs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (e.stylesheets && cs(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Fc === 0 && (Fc = 62500 * Tv());
      var s = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && cs(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > Fc ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(s);
      };
    } : null;
  }
  function ss() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) cs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var os = null;
  function cs(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, os = /* @__PURE__ */ new Map(), t.forEach(Jv, e), os = null, ss.call(e));
  }
  function Jv(e, t) {
    if (!(t.state.loading & 4)) {
      var n = os.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), os.set(e, n);
        for (var s = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < s.length; c++) {
          var m = s[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), i = m);
        }
        i && n.set(null, i);
      }
      s = t.instance, m = s.getAttribute("data-precedence"), c = n.get(m) || i, c === i && n.set(null, s), n.set(m, s), this.count++, i = ss.bind(this), s.addEventListener("load", i), s.addEventListener("error", i), c ? c.parentNode.insertBefore(s, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(s, e.firstChild)), t.state.loading |= 4;
    }
  }
  var wr = {
    $$typeof: Y,
    Provider: null,
    Consumer: null,
    _currentValue: O,
    _currentValue2: O,
    _threadCount: 0
  };
  function Wv(e, t, n, i, s, c, m, S, A) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Xs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xs(0), this.hiddenUpdates = Xs(null), this.identifierPrefix = i, this.onUncaughtError = s, this.onCaughtError = c, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = A, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function zp(e, t, n, i, s, c, m, S, A, T, B, q) {
    return e = new Wv(
      e,
      t,
      n,
      m,
      A,
      T,
      B,
      q,
      S
    ), t = 1, c === !0 && (t |= 24), c = Ot(3, null, null, t), e.current = c, c.stateNode = e, t = Oo(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: t
    }, Ro(c), e;
  }
  function Rp(e) {
    return e ? (e = Fa, e) : Fa;
  }
  function Up(e, t, n, i, s, c) {
    s = Rp(s), i.context === null ? i.context = s : i.pendingContext = s, i = Kn(t), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = Yn(e, i, t), n !== null && ($t(n, e, t), rr(n, e, t));
  }
  function Lp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Pc(e, t) {
    Lp(e, t), (e = e.alternate) && Lp(e, t);
  }
  function Vp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = _a(e, 67108864);
      t !== null && $t(t, e, 67108864), Pc(e, 67108864);
    }
  }
  function Bp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ut();
      t = ks(t);
      var n = _a(e, t);
      n !== null && $t(n, e, t), Pc(e, t);
    }
  }
  var us = !0;
  function Fv(e, t, n, i) {
    var s = D.T;
    D.T = null;
    var c = X.p;
    try {
      X.p = 2, eu(e, t, n, i);
    } finally {
      X.p = c, D.T = s;
    }
  }
  function Pv(e, t, n, i) {
    var s = D.T;
    D.T = null;
    var c = X.p;
    try {
      X.p = 8, eu(e, t, n, i);
    } finally {
      X.p = c, D.T = s;
    }
  }
  function eu(e, t, n, i) {
    if (us) {
      var s = tu(i);
      if (s === null)
        Hc(
          e,
          t,
          i,
          ds,
          n
        ), Gp(e, i);
      else if (tb(
        s,
        e,
        t,
        n,
        i
      ))
        i.stopPropagation();
      else if (Gp(e, i), t & 4 && -1 < eb.indexOf(e)) {
        for (; s !== null; ) {
          var c = Ga(s);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var m = ya(c.pendingLanes);
                  if (m !== 0) {
                    var S = c;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; m; ) {
                      var A = 1 << 31 - lt(m);
                      S.entanglements[1] |= A, m &= ~A;
                    }
                    ln(c), (Me & 6) === 0 && (kl = bt() + 500, _r(0));
                  }
                }
                break;
              case 31:
              case 13:
                S = _a(c, 2), S !== null && $t(S, c, 2), Zl(), Pc(c, 2);
            }
          if (c = tu(i), c === null && Hc(
            e,
            t,
            i,
            ds,
            n
          ), c === s) break;
          s = c;
        }
        s !== null && i.stopPropagation();
      } else
        Hc(
          e,
          t,
          i,
          null,
          n
        );
    }
  }
  function tu(e) {
    return e = no(e), nu(e);
  }
  var ds = null;
  function nu(e) {
    if (ds = null, e = Ha(e), e !== null) {
      var t = d(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = v(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ds = e, null;
  }
  function Hp(e) {
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
        switch (Ks()) {
          case Bi:
            return 2;
          case K:
            return 8;
          case Se:
          case gt:
            return 32;
          case ha:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var au = !1, na = null, aa = null, ia = null, $r = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), ra = [], eb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Gp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        na = null;
        break;
      case "dragenter":
      case "dragleave":
        aa = null;
        break;
      case "mouseover":
      case "mouseout":
        ia = null;
        break;
      case "pointerover":
      case "pointerout":
        $r.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tr.delete(t.pointerId);
    }
  }
  function Dr(e, t, n, i, s, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: c,
      targetContainers: [s]
    }, t !== null && (t = Ga(t), t !== null && Vp(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, s !== null && t.indexOf(s) === -1 && t.push(s), e);
  }
  function tb(e, t, n, i, s) {
    switch (t) {
      case "focusin":
        return na = Dr(
          na,
          e,
          t,
          n,
          i,
          s
        ), !0;
      case "dragenter":
        return aa = Dr(
          aa,
          e,
          t,
          n,
          i,
          s
        ), !0;
      case "mouseover":
        return ia = Dr(
          ia,
          e,
          t,
          n,
          i,
          s
        ), !0;
      case "pointerover":
        var c = s.pointerId;
        return $r.set(
          c,
          Dr(
            $r.get(c) || null,
            e,
            t,
            n,
            i,
            s
          )
        ), !0;
      case "gotpointercapture":
        return c = s.pointerId, Tr.set(
          c,
          Dr(
            Tr.get(c) || null,
            e,
            t,
            n,
            i,
            s
          )
        ), !0;
    }
    return !1;
  }
  function qp(e) {
    var t = Ha(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = f(n), t !== null) {
            e.blockedOn = t, td(e.priority, function() {
              Bp(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = v(n), t !== null) {
            e.blockedOn = t, td(e.priority, function() {
              Bp(n);
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
  function fs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = tu(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        to = i, n.target.dispatchEvent(i), to = null;
      } else
        return t = Ga(n), t !== null && Vp(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function Ip(e, t, n) {
    fs(e) && n.delete(t);
  }
  function nb() {
    au = !1, na !== null && fs(na) && (na = null), aa !== null && fs(aa) && (aa = null), ia !== null && fs(ia) && (ia = null), $r.forEach(Ip), Tr.forEach(Ip);
  }
  function ms(e, t) {
    e.blockedOn === t && (e.blockedOn = null, au || (au = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      nb
    )));
  }
  var ps = null;
  function Kp(e) {
    ps !== e && (ps = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ps === e && (ps = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], i = e[t + 1], s = e[t + 2];
          if (typeof i != "function") {
            if (nu(i || n) === null)
              continue;
            break;
          }
          var c = Ga(n);
          c !== null && (e.splice(t, 3), t -= 3, tc(
            c,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: i
            },
            i,
            s
          ));
        }
      }
    ));
  }
  function Ei(e) {
    function t(A) {
      return ms(A, e);
    }
    na !== null && ms(na, e), aa !== null && ms(aa, e), ia !== null && ms(ia, e), $r.forEach(t), Tr.forEach(t);
    for (var n = 0; n < ra.length; n++) {
      var i = ra[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < ra.length && (n = ra[0], n.blockedOn === null); )
      qp(n), n.blockedOn === null && ra.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var s = n[i], c = n[i + 1], m = s[Et] || null;
        if (typeof c == "function")
          m || Kp(n);
        else if (m) {
          var S = null;
          if (c && c.hasAttribute("formAction")) {
            if (s = c, m = c[Et] || null)
              S = m.formAction;
            else if (nu(s) !== null) continue;
          } else S = m.action;
          typeof S == "function" ? n[i + 1] = S : (n.splice(i, 3), i -= 3), Kp(n);
        }
      }
  }
  function Yp() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(m) {
            return s = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      s !== null && (s(), s = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, s = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), s !== null && (s(), s = null);
      };
    }
  }
  function iu(e) {
    this._internalRoot = e;
  }
  hs.prototype.render = iu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(o(409));
    var n = t.current, i = Ut();
    Up(n, i, e, t, null, null);
  }, hs.prototype.unmount = iu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      Up(e.current, 2, null, e, null, null), Zl(), t[Ba] = null;
    }
  };
  function hs(e) {
    this._internalRoot = e;
  }
  hs.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = ed();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ra.length && t !== 0 && t < ra[n].priority; n++) ;
      ra.splice(n, 0, e), n === 0 && qp(e);
    }
  };
  var Xp = r.version;
  if (Xp !== "19.2.7")
    throw Error(
      o(
        527,
        Xp,
        "19.2.7"
      )
    );
  X.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var ab = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ys = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ys.isDisabled && ys.supportsFiber)
      try {
        dt = ys.inject(
          ab
        ), Pe = ys;
      } catch {
      }
  }
  return Mr.createRoot = function(e, t) {
    if (!u(e)) throw Error(o(299));
    var n = !1, i = "", s = Pf, c = em, m = tm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (s = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = zp(
      e,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      s,
      c,
      m,
      Yp
    ), e[Ba] = t.current, Bc(e), new iu(t);
  }, Mr.hydrateRoot = function(e, t, n) {
    if (!u(e)) throw Error(o(299));
    var i = !1, s = "", c = Pf, m = em, S = tm, A = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (S = n.onRecoverableError), n.formState !== void 0 && (A = n.formState)), t = zp(
      e,
      1,
      !0,
      t,
      n ?? null,
      i,
      s,
      A,
      c,
      m,
      S,
      Yp
    ), t.context = Rp(null), n = t.current, i = Ut(), i = ks(i), s = Kn(i), s.callback = null, Yn(n, s, i), n = i, t.current.lanes = n, Gi(t, n), ln(t), e[Ba] = t.current, Bc(e), new hs(t);
  }, Mr.version = "19.2.7", Mr;
}
var nh;
function gb() {
  if (nh) return su.exports;
  nh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (r) {
        console.error(r);
      }
  }
  return a(), su.exports = yb(), su.exports;
}
var vb = gb();
const Cr = {
  provider: "openai",
  models: {
    openai: "gpt-5.2",
    "openai-codex": "gpt-5.5",
    openrouter: "",
    anthropic: "claude-sonnet-4-6",
    custom: ""
  },
  apiKeys: {},
  customBaseUrl: ""
}, Ph = "settings";
function bb(a, r) {
  return {
    provider: r.provider ?? a.provider,
    models: { ...a.models, ...r.models },
    apiKeys: { ...a.apiKeys, ...r.apiKeys },
    customBaseUrl: r.customBaseUrl !== void 0 ? r.customBaseUrl : a.customBaseUrl
  };
}
function Sb(a) {
  const r = a.storage.get(Ph);
  if (!r) return { ...Cr, models: { ...Cr.models }, apiKeys: {} };
  try {
    const l = JSON.parse(r);
    return bb(Cr, l);
  } catch {
    return { ...Cr, models: { ...Cr.models }, apiKeys: {} };
  }
}
function _b(a, r) {
  a.storage.set(Ph, JSON.stringify(r));
}
function Eb(a, r) {
  switch (a.provider) {
    case "openai":
      return !!a.apiKeys.openai;
    case "openrouter":
      return !!a.apiKeys.openrouter;
    case "anthropic":
      return !!a.apiKeys.anthropic;
    case "openai-codex":
      return r;
    case "custom":
      return !!a.customBaseUrl;
    default:
      return !1;
  }
}
const ah = 50, ey = "conversations";
function Uu(a) {
  const r = a.storage.get(ey);
  if (!r) return [];
  try {
    return JSON.parse(r);
  } catch {
    return [];
  }
}
function ih(a) {
  return a.messages.some((r) => {
    var l;
    return (l = r.attachments) == null ? void 0 : l.some((o) => o.dataUrl);
  }) ? {
    ...a,
    messages: a.messages.map(
      (r) => r.attachments ? {
        ...r,
        attachments: r.attachments.map(
          (l) => l.dataUrl ? { ...l, dataUrl: void 0 } : l
        )
      } : r
    )
  } : a;
}
function gs(a, r) {
  try {
    return a.storage.set(ey, JSON.stringify(r)), !0;
  } catch {
    return !1;
  }
}
function ty(a, r) {
  if (gs(a, r)) return;
  const l = [...r];
  for (; l.length > 1; )
    if (l.pop(), gs(a, l)) return;
  gs(a, r.map(ih)) || gs(a, r.slice(0, 1).map(ih));
}
function bu(a) {
  return Uu(a).sort((r, l) => l.updatedAt - r.updatedAt);
}
function rh(a, r) {
  const l = Uu(a), o = l.findIndex((u) => u.id === r.id);
  o >= 0 ? l[o] = r : l.push(r), l.sort((u, d) => d.updatedAt - u.updatedAt), l.length > ah && l.splice(ah), ty(a, l);
}
function Ab(a, r) {
  const l = Uu(a).filter((o) => o.id !== r);
  ty(a, l);
}
function lh(a, r) {
  const l = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: l,
    updatedAt: l,
    provider: a,
    model: r,
    messages: []
  };
}
function xb(a) {
  return a.slice(0, 40);
}
function Nb() {
  return /* @__PURE__ */ y.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ y.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function jb({ onClick: a }) {
  return /* @__PURE__ */ y.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: a,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ y.jsx(Nb, {})
    }
  );
}
const sh = 8 * 1024 * 1024, oh = 2 * 1024 * 1024, ch = 20 * 1024 * 1024, wb = /* @__PURE__ */ new Set([
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
function ny(a) {
  const r = a.lastIndexOf(".");
  return r >= 0 ? a.slice(r + 1).toLowerCase() : "";
}
function ay(a) {
  const r = (a.type || "").toLowerCase();
  if (r.startsWith("image/")) return "image";
  if (r === "application/pdf") return "pdf";
  if (r.startsWith("text/")) return "text";
  const l = ny(a.name);
  return l === "pdf" ? "pdf" : wb.has(l) ? "image" : "text";
}
function Ur(a) {
  return a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${(a / 1024).toFixed(1)} KB` : `${(a / (1024 * 1024)).toFixed(1)} MB`;
}
const $b = {
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
function Tb(a) {
  return $b[ny(a)] ?? "";
}
function Db(a) {
  return new Promise((r, l) => {
    const o = new FileReader();
    o.onload = () => r(o.result), o.onerror = () => l(o.error ?? new Error("FileReader failed")), o.readAsDataURL(a);
  });
}
const Ob = "4.10.38", uh = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${Ob}/build`;
let du = null;
function Mb() {
  return du || (du = import(`${uh}/pdf.mjs`).then((r) => {
    const l = r.default ?? r;
    return l.GlobalWorkerOptions.workerSrc = `${uh}/pdf.worker.mjs`, l;
  })), du;
}
async function Cb(a) {
  const r = await Mb(), l = await a.arrayBuffer(), o = await r.getDocument({ data: l }).promise, u = [];
  for (let d = 1; d <= o.numPages; d++) {
    const p = (await (await o.getPage(d)).getTextContent()).items.map((h) => typeof (h == null ? void 0 : h.str) == "string" ? h.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    p && u.push(p);
  }
  return u.join(`

`).trim();
}
async function zb(a, r = {}) {
  const l = ay(a), o = {
    id: crypto.randomUUID(),
    kind: l,
    name: a.name,
    size: a.size,
    mime: a.type || ""
  };
  if (l === "image") {
    if (a.size > sh)
      throw new Error(`Image "${a.name}" is too large (max ${Ur(sh)})`);
    const d = await (r.readDataUrl ?? Db)(a);
    return { ...o, dataUrl: d };
  }
  if (l === "pdf") {
    if (a.size > ch)
      throw new Error(`PDF "${a.name}" is too large (max ${Ur(ch)})`);
    let d;
    try {
      d = await (r.loadPdfText ?? Cb)(a);
    } catch (f) {
      const v = (f == null ? void 0 : f.message) ?? String(f);
      throw new Error(`Could not read PDF "${a.name}": ${v}`);
    }
    return { ...o, text: d };
  }
  if (a.size > oh)
    throw new Error(`Text file "${a.name}" is too large (max ${Ur(oh)})`);
  const u = await (r.readText ?? ((d) => d.text()))(a);
  return { ...o, text: u };
}
const Rb = /* @__PURE__ */ new Set([
  "openai",
  "openai-codex",
  "openrouter",
  "anthropic",
  "custom"
]);
function iy(a, r, l) {
  const o = r ?? [], u = [];
  a.trim() && u.push(a);
  for (const v of o)
    if ((v.kind === "text" || v.kind === "pdf") && v.text) {
      const p = v.kind === "pdf" ? "" : Tb(v.name);
      u.push(`Attached file "${v.name}":
\`\`\`${p}
${v.text}
\`\`\``);
    }
  const d = u.join(`

`), f = o.filter((v) => v.kind === "image" && v.dataUrl);
  if (f.length > 0 && Rb.has(l))
    return [
      { type: "text", text: d || "(see attached image)" },
      ...f.map((p) => ({ type: "image_url", image_url: { url: p.dataUrl } }))
    ];
  if (f.length > 0) {
    const v = f.map((p) => `[image attached (not sent to this provider): ${p.name}]`).join(`
`);
    return [d, v].filter(Boolean).join(`

`);
  }
  return d;
}
function dh(a, r) {
  const l = a.split(`
`);
  for (const o of l) {
    if (!o.startsWith("data: ")) continue;
    const u = o.slice(6).trim();
    if (!u || u === "[DONE]") continue;
    let d;
    try {
      d = JSON.parse(u);
    } catch {
      continue;
    }
    const f = d.type;
    if (f === "text_delta")
      r.onText(d.text ?? "");
    else if (f === "done") {
      const v = {
        message: d.message,
        stop_reason: d.stop_reason,
        usage: d.usage ?? {}
      };
      r.onDone(v);
    } else if (f === "error")
      return r.onError(d.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function ry(a, r, l, o) {
  let u;
  try {
    u = await a.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r),
      signal: o
    });
  } catch (p) {
    l.onError(`Network error: ${String(p)}`);
    return;
  }
  if (!u.ok) {
    let p = "";
    try {
      p = await u.text(), p.length > 200 && (p = p.slice(0, 200) + "...");
    } catch {
    }
    l.onError(`HTTP ${u.status}: ${p}`);
    return;
  }
  const d = u.body.getReader(), f = new TextDecoder();
  let v = "";
  try {
    for (; ; ) {
      const { done: p, value: h } = await d.read();
      if (p) break;
      v += f.decode(h, { stream: !0 }).replace(/\r\n/g, `
`);
      const b = v.split(`

`);
      v = b.pop() ?? "";
      for (const g of b) {
        if (!g.trim()) continue;
        if (dh(g, l)) {
          d.cancel().catch(() => {
          });
          return;
        }
      }
    }
    v.trim() && dh(v, l);
  } catch (p) {
    (p == null ? void 0 : p.name) !== "AbortError" && l.onError(`Stream read error: ${String(p)}`);
  } finally {
    d.releaseLock();
  }
}
async function Ub(a, r, l, o) {
  const u = await a.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: r, api_key: l, base_url: o })
  });
  if (!u.ok) {
    let f = "";
    try {
      f = await u.text(), f.length > 200 && (f = f.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${u.status}: ${f}`);
  }
  return (await u.json()).models.map((f) => f.id);
}
async function Lb(a) {
  return (await (await a.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function Su(a) {
  return await (await a.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function Vb(a) {
  await a.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const ua = "[REDACTED]";
function Je(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function Bb(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function fa(a) {
  const r = Bb(a);
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
  ].some((l) => r === l || r.endsWith(`_${l}`));
}
function Mn(a) {
  return Array.isArray(a) ? a.map(Mn) : Je(a) ? Object.fromEntries(
    Object.entries(a).map(([r, l]) => [
      r,
      fa(r) ? ua : Mn(l)
    ])
  ) : a;
}
function cn(a, r) {
  typeof a == "string" ? a.length > 0 && r.add(a) : Array.isArray(a) ? a.forEach((l) => cn(l, r)) : Je(a) && Object.values(a).forEach((l) => cn(l, r));
}
function js(a, r) {
  if (Array.isArray(a))
    a.forEach((l) => js(l, r));
  else if (Je(a))
    for (const [l, o] of Object.entries(a))
      fa(l) ? cn(o, r) : js(o, r);
}
function fh(a, r, l, o) {
  if (!Array.isArray(a)) return;
  const u = /* @__PURE__ */ new Map();
  for (const d of a) {
    if (!Je(d)) continue;
    let f;
    if (d.op === "add_node")
      f = typeof d.node_type == "string" ? d.node_type : void 0, typeof d.ref == "string" && f && u.set(d.ref, f);
    else if (d.op === "set_params") {
      const h = typeof d.node_id == "string" ? d.node_id : void 0;
      f = h ? u.get(h) ?? l.get(h) : void 0;
    } else
      continue;
    if (!Je(d.params)) continue;
    const v = f ? r.get(f) : void 0, p = v ? new Map(v.params.map((h) => [h.name, h])) : void 0;
    for (const [h, b] of Object.entries(d.params)) {
      const g = p == null ? void 0 : p.get(h);
      (!g || g.param_type === "secret" || fa(h)) && cn(b, o);
    }
  }
}
function Hb(a, r, l, o) {
  if (Array.isArray(a))
    for (const u of a) {
      if (!Je(u)) continue;
      const d = typeof u.node_id == "string" ? u.node_id : void 0, f = typeof u.param == "string" ? u.param : void 0, v = d ? l.get(d) : void 0, p = v ? r.get(v) : void 0, h = p == null ? void 0 : p.params.find((b) => b.name === f);
      (!h || h.param_type === "secret" || f && fa(f)) && cn(u.values, o);
    }
}
function ly(a, r) {
  for (const l of a.values())
    for (const o of l.params)
      (o.param_type === "secret" || fa(o.name)) && (cn(o.default, r), cn(o.options, r));
}
function Vr(a, r, l) {
  const o = /* @__PURE__ */ new Set();
  if (ly(r, o), js(a.arguments, o), a.name === "apply_graph_operations")
    fh(a.arguments.operations, r, l, o);
  else if (a.name === "run_graph_experiments") {
    if (Array.isArray(a.arguments.variants))
      for (const u of a.arguments.variants)
        Je(u) && fh(u.operations, r, l, o);
    a.arguments.search !== void 0 && cn(a.arguments.search, o);
  } else a.name === "optimize_graph_parameters" && Hb(
    a.arguments.bindings,
    r,
    l,
    o
  );
  return o;
}
function ws(a, r, l) {
  var o;
  ly(r, l), js(a, l), cn(a.presets, l);
  for (const u of a.nodes) {
    const d = (o = u.data) == null ? void 0 : o.params;
    if (!Je(d)) continue;
    const f = typeof u.type == "string" ? r.get(u.type) : void 0, v = f ? new Map(f.params.map((p) => [p.name, p])) : void 0;
    for (const [p, h] of Object.entries(d)) {
      const b = v == null ? void 0 : v.get(p);
      (!b || b.param_type === "secret" || fa(p)) && cn(h, l);
    }
  }
}
function da(a, r) {
  if (typeof a == "string") {
    let l = a;
    for (const o of [...r].sort((u, d) => d.length - u.length))
      l = l.split(o).join(ua);
    return l;
  }
  return Array.isArray(a) ? a.map((l) => da(l, r)) : Je(a) ? Object.fromEntries(
    Object.entries(a).map(([l, o]) => [l, da(o, r)])
  ) : a;
}
function Ni(a) {
  return new Map(a.map((r) => [r.node_name, r]));
}
function Br(a) {
  return new Map(
    a.filter((r) => typeof r.type == "string").map((r) => [r.id, r.type])
  );
}
function Gb(a, r) {
  const l = Ni(r), o = /* @__PURE__ */ new Set();
  ws(a, l, o);
  const u = Mn(a);
  if (!Je(u)) return { ...a, nodes: [], edges: [] };
  const d = Array.isArray(u.nodes) ? u.nodes : [];
  a.nodes.forEach((v, p) => {
    const h = d[p];
    !Je(h) || !Je(h.data) || v.data && Object.prototype.hasOwnProperty.call(v.data, "params") && (h.data.params = _u(
      v.data.params,
      typeof v.type == "string" ? v.type : void 0,
      l
    ));
  });
  const f = da(u, o);
  return Je(f) ? f : { nodes: [], edges: [] };
}
function Vs(a, r, l, o = []) {
  let u = [], d = { nodes: [] };
  try {
    u = l.graph.getNodeDefinitions();
  } catch {
  }
  try {
    const h = l.graph.getGraph();
    d = { nodes: h.nodes, presets: h.presets };
  } catch {
  }
  const f = Ni(u), v = Br(d.nodes), p = Vr(a, f, v);
  ws(d, f, p);
  for (const h of o) {
    const b = Ni(h.definitions), g = Br(h.graph.nodes);
    for (const _ of Vr(a, b, g))
      p.add(_);
    ws(h.graph, b, p);
  }
  try {
    const h = JSON.parse(r);
    if (Array.isArray(h) || Je(h))
      return JSON.stringify(da(Mn(h), p));
  } catch {
  }
  return da(r, p);
}
function _u(a, r, l) {
  const o = Mn(a);
  if (!Je(o)) return o;
  const u = r ? l.get(r) : void 0, d = u ? new Map(u.params.map((f) => [f.name, f])) : void 0;
  for (const f of Object.keys(o)) {
    const v = d == null ? void 0 : d.get(f);
    (!v || v.param_type === "secret") && (o[f] = ua);
  }
  return o;
}
function mh(a, r, l) {
  const o = Mn(a);
  if (!Array.isArray(o)) return o;
  const u = /* @__PURE__ */ new Map();
  for (const d of o)
    if (Je(d)) {
      if (d.op === "add_node") {
        const f = typeof d.node_type == "string" ? d.node_type : void 0;
        typeof d.ref == "string" && f && u.set(d.ref, f), "params" in d && (d.params = _u(d.params, f, r));
      } else if (d.op === "set_params") {
        const f = typeof d.node_id == "string" ? d.node_id : void 0, v = f ? u.get(f) ?? l.get(f) : void 0;
        d.params = _u(d.params, v, r);
      }
    }
  return o;
}
function qb(a, r, l) {
  const o = Mn(a);
  if (!Array.isArray(o)) return o;
  for (const u of o) {
    if (!Je(u)) continue;
    const d = typeof u.node_id == "string" ? u.node_id : void 0, f = typeof u.param == "string" ? u.param : void 0, v = d ? l.get(d) : void 0, p = v ? r.get(v) : void 0, h = p == null ? void 0 : p.params.find((b) => b.name === f);
    (!h || h.param_type === "secret") && (u.values = Array.isArray(u.values) ? u.values.map(() => ua) : ua);
  }
  return o;
}
function sy(a, r) {
  let l = [], o = [];
  try {
    l = r.graph.getNodeDefinitions();
  } catch {
  }
  try {
    o = r.graph.getGraph().nodes;
  } catch {
  }
  const u = Ni(l), d = Br(o), f = Mn(a.arguments), v = Je(f) ? f : {};
  if (a.name === "apply_graph_operations")
    v.operations = mh(a.arguments.operations, u, d);
  else if (a.name === "run_graph_experiments") {
    const b = a.arguments.variants;
    Array.isArray(v.variants) && Array.isArray(b) && v.variants.forEach((g, _) => {
      Je(g) && Je(b[_]) && (g.operations = mh(
        b[_].operations,
        u,
        d
      ));
    }), a.arguments.search !== void 0 && (v.search = ua);
  } else a.name === "optimize_graph_parameters" && (v.bindings = qb(
    a.arguments.bindings,
    u,
    d
  ));
  const p = Vr(a, u, d), h = da(v, p);
  return {
    id: a.id,
    name: a.name,
    arguments: Je(h) ? h : {}
  };
}
function oy(a, r) {
  let l = [], o = [];
  try {
    l = r.graph.getNodeDefinitions();
  } catch {
  }
  try {
    o = r.graph.getGraph().nodes;
  } catch {
  }
  const u = Ni(l), d = Br(o), f = /* @__PURE__ */ new Set();
  for (const v of a)
    for (const p of Vr(v, u, d))
      f.add(p);
  return a.map((v) => {
    const p = sy(v, r), h = da(p.arguments, f);
    return {
      ...p,
      arguments: Je(h) ? h : {}
    };
  });
}
function Eu(a, r, l) {
  let o = [], u = { nodes: [], edges: [] };
  try {
    o = l.graph.getNodeDefinitions();
  } catch {
  }
  try {
    u = l.graph.getGraph();
  } catch {
  }
  const d = Ni(o), f = Br(u.nodes), v = /* @__PURE__ */ new Set();
  ws(u, d, v);
  for (const p of r)
    for (const h of Vr(p, d, f))
      v.add(h);
  return da(a, v);
}
const vs = 3e4;
function Ib(a) {
  const r = a.param_type === "secret" || fa(a.name), l = r ? ua : Mn(a.default), o = l == null ? String(l) : typeof l == "object" ? JSON.stringify(l) : String(l), u = o.length > 60 ? o.slice(0, 60) + "..." : o;
  let d = "";
  if (a.param_type === "select" && a.options.length > 0)
    d = r ? `{${ua}}` : `{${a.options.join("|")}}`;
  else if (a.param_type === "int" || a.param_type === "float") {
    const f = a.min_value !== null, v = a.max_value !== null;
    if (f || v) {
      const p = f ? String(a.min_value) : "", h = v ? String(a.max_value) : "";
      d = `{${p}..${h}}`;
    }
  }
  return `${a.name}:${a.param_type}=${u}${d}`;
}
function Kb(a) {
  return a.map((r) => {
    const l = [];
    if (r.inputs.length > 0) {
      const u = r.inputs.map((d) => `${d.name}:${d.data_type}`).join(", ");
      l.push(`in[${u}]`);
    }
    if (r.outputs.length > 0) {
      const u = r.outputs.map((d) => `${d.name}:${d.data_type}`).join(", ");
      l.push(`out[${u}]`);
    }
    if (r.params.length > 0) {
      const u = r.params.map(Ib).join(", ");
      l.push(`params[${u}]`);
    }
    const o = l.length > 0 ? " " + l.join(" ") : "";
    return `${r.node_name}:${o} [category: ${r.category}]`;
  }).join(`
`);
}
function cy(a) {
  return a.map((r) => {
    const l = (r.description || "").replace(/\s+/g, " ").trim(), o = l.length > 100 ? l.slice(0, 100) + "..." : l;
    return `${r.node_name} [${r.category}]${o ? " - " + o : ""}`;
  }).join(`
`);
}
function uy(a, r = []) {
  const l = Gb(a, r), o = JSON.stringify({ nodes: l.nodes, edges: l.edges });
  if (o.length <= vs)
    return o;
  const u = [], d = [], f = {
    originalNodes: l.nodes.length,
    includedNodes: 0,
    originalEdges: l.edges.length,
    includedEdges: 0,
    originalChars: o.length,
    limit: vs
  }, v = () => JSON.stringify({ nodes: u, edges: d, _truncated: f });
  for (const h of l.nodes)
    if (u.push(h), f.includedNodes = u.length, v().length > vs) {
      u.pop(), f.includedNodes = u.length;
      break;
    }
  const p = new Set(u.map((h) => String(h.id ?? "")));
  for (const h of l.edges)
    if (!(!p.has(String(h.source ?? "")) || !p.has(String(h.target ?? ""))) && (d.push(h), f.includedEdges = d.length, v().length > vs)) {
      d.pop(), f.includedEdges = d.length;
      break;
    }
  return v();
}
function Yb(a, r) {
  const l = cy(a), o = uy(r, a);
  return `You are Graph Copilot, an agent inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You can build graphs, run canvas-isolated candidate experiments when explicitly authorized, optimize against measured metrics, and turn observations into testable research hypotheses.

## Workflow (follow in order)
1. Plan - state in 1-2 sentences the nodes and connections you intend.
2. Look up schemas - call get_node_schemas for the node types you plan to use, to get their exact input/output ports and params. Do NOT guess port or param names.
3. Build - call apply_graph_operations in small batches (add_node with a "ref", connect, set_params), ending a structural batch with one auto_layout.
4. Validate - call validate_graph. If it returns errors (e.g. a missing required input), fix them with more operations and validate again. Only finish once validate_graph reports "valid": true.
5. Summarize what you built in 1-2 sentences, in the user's language.

## Experiment and research workflow
When the user asks to test, compare, optimize, ablate, or find research ideas:
1. State a falsifiable hypothesis, a NUMERIC metric, and whether to maximize or minimize it. Never invent a measured result.
2. For an explicit comparison or structural ablation, call run_graph_experiments with focused variants. For optimization over existing int/float/bool/select params, prefer optimize_graph_parameters: use a complete small grid or a uint32-seeded random plan, and remember its planner seed does NOT seed graph execution. Never optimize secret/file/tensor/unknown params.
3. State the planned run count and remember that graph nodes execute normally and may write files, call networks, or incur API costs. Both experiment tools use the same UI confirmation and shared 16-execution turn budget; a chat instruction alone is not consent. Candidate GraphOps are canvas-isolated, not side-effect-free.
4. Include an explicit baseline plus focused variants. Use at least 3 repetitions when the user wants reliable evidence; otherwise label the result a pilot.
5. Set apply_best=true only when the user explicitly asked to optimize or apply the winner. Automatic promotion supports parameter-only winners; structural winners stay proposals for review. For comparison or research-only requests, leave it false.
6. Report the unique winner or an explicit tie, effect size visible in the results, failures, variance limitations, and the next experiment needed before making a paper claim. Repetitions reuse the same candidate graph unless its nodes randomize internally; never call them independent seeds without an explicit seed schedule in the graph.

## Graph model
Each node has a type (the bare name from the index), typed input/output ports, and params. Edges connect an output handle to an input handle; the connected data types must be compatible. Some pipelines need a control-flow trigger from a Start node (connect with source_handle "trigger").

## Rules
- Use the exact node-type name from the index — the bare name only (e.g. Dataset), never the trailing "[category: ...]" tag.
- Always get_node_schemas before connecting, so you use real port names.
- For a COMPLEX graph, you may first call research with a few independent sub-questions (e.g. data pipeline / model / training loop) to plan the parts in parallel.
- Connect every REQUIRED input of nodes you add; validate_graph reports the ones you missed.
- Set params via set_params or add_node.params, respecting the declared types and ranges.
- Finish structural batches with one auto_layout op.
- Prefer several small batches over one enormous batch.
- If an op fails, read the error message and correct yourself before retrying.
- Never use clear_graph unless the user explicitly asked to start over.
- Prefer a small controlled ablation over changing many factors at once. Include seed controls and held-out evaluation when the graph exposes them.
- Treat experiment outputs as evidence, not proof. Do not claim novelty or statistical significance without enough independent runs and an appropriate test.
- Reply in the user's language, and after applying changes summarize what changed in one or two sentences.

## Node catalog index (NodeName [Category] - description). Call get_node_schemas for exact ports/params.
${l}

## Current graph
${o}`;
}
const Xb = "graph-copilot", kb = "0.3.0";
function $s(a) {
  if (a.length === 0 || a.some((u) => !Number.isFinite(u)))
    return;
  let r = 0, l = 0;
  if (a.forEach((u, d) => {
    const f = d + 1, v = u - r;
    r += v / f;
    const p = u - r;
    l += v * p;
  }), !Number.isFinite(r) || !Number.isFinite(l))
    return;
  const o = a.length < 2 ? 0 : l / (a.length - 1);
  if (Number.isFinite(o))
    return { mean: r, variance: Math.max(0, o) };
}
function Cn(a) {
  var r;
  return (r = $s(a)) == null ? void 0 : r.mean;
}
function Bs(a) {
  if (a.length < 2) return;
  const r = $s(a);
  if (!r) return;
  const l = Math.sqrt(r.variance);
  return Number.isFinite(l) ? l : void 0;
}
function xs(a) {
  const r = [
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
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * a)) - xs(1 - a);
  let l = 0.9999999999998099;
  const o = a - 1;
  r.forEach((d, f) => {
    l += d / (o + f + 1);
  });
  const u = o + r.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (o + 0.5) * Math.log(u) - u + Math.log(l);
}
function ph(a, r, l) {
  const f = a + r, v = a + 1, p = a - 1;
  let h = 1, b = 1 - f * l / v;
  Math.abs(b) < 1e-300 && (b = 1e-300), b = 1 / b;
  let g = b;
  for (let _ = 1; _ <= 200; _ += 1) {
    const j = 2 * _;
    let R = _ * (r - _) * l / ((p + j) * (a + j));
    b = 1 + R * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + R / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b, g *= b * h, R = -((a + _) * (f + _) * l) / ((a + j) * (v + j)), b = 1 + R * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + R / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b;
    const x = b * h;
    if (g *= x, Math.abs(x - 1) <= 3e-14) break;
  }
  return g;
}
function Qb(a, r, l) {
  if (a <= 0) return 0;
  if (a >= 1) return 1;
  const o = Math.exp(
    xs(r + l) - xs(r) - xs(l) + r * Math.log(a) + l * Math.log1p(-a)
  );
  return a < (r + 1) / (r + l + 2) ? o * ph(r, l, a) / r : 1 - o * ph(l, r, 1 - a) / l;
}
function hh(a, r) {
  if (a === 0) return 0.5;
  const l = r / (r + a * a), o = 0.5 * Qb(
    l,
    r / 2,
    0.5
  );
  return a > 0 ? 1 - o : o;
}
function Zb(a) {
  if (!Number.isInteger(a) || a < 1) return;
  const r = 0.975;
  let l = 0, o = 1;
  for (; hh(o, a) < r && o < 1e6; ) o *= 2;
  if (!(o >= 1e6)) {
    for (let u = 0; u < 100; u += 1) {
      const d = (l + o) / 2;
      hh(d, a) < r ? l = d : o = d;
    }
    return (l + o) / 2;
  }
}
function dy(a) {
  if (a.length < 2) return;
  const r = Cn(a), l = Bs(a), o = a.length - 1, u = Zb(o);
  if (r === void 0 || l === void 0 || u === void 0)
    return;
  const d = u * l / Math.sqrt(a.length), f = r - d, v = r + d;
  if ([d, f, v].every(Number.isFinite))
    return {
      confidenceLevel: 0.95,
      degreesOfFreedom: o,
      mean: r,
      margin: d,
      lower: f,
      upper: v
    };
}
const Lu = dy;
function Jb(a, r) {
  if (a.length < 2 || r.length < 2) return;
  const l = $s(a), o = $s(r);
  if (!l || !o) return;
  const u = a.length + r.length - 2, d = ((a.length - 1) * l.variance + (r.length - 1) * o.variance) / u;
  if (!Number.isFinite(d) || d <= 0) return;
  const f = (l.mean - o.mean) / Math.sqrt(d), v = 1 - 3 / (4 * u - 1), p = f * v;
  return Number.isFinite(p) ? p : void 0;
}
function Hr(a, r, l) {
  const o = Cn(a), u = Cn(r);
  if (o === void 0 || u === void 0) return;
  const d = o - u, f = l === "maximize" ? d : -d;
  if (!Number.isFinite(d) || !Number.isFinite(f)) return;
  const v = Jb(a, r);
  return {
    baselineMean: u,
    candidateMean: o,
    rawDelta: d,
    improvement: f,
    hedgesG: v,
    directionAdjustedHedgesG: v === void 0 ? void 0 : l === "maximize" ? v : -v
  };
}
const Wb = [
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
function bs(a) {
  return a !== void 0 && Number.isFinite(a) ? String(a) : "";
}
function Fb(a) {
  return /^[\t\r\n ]*[=+\-@]/.test(a) ? `'${a}` : a;
}
function Pb(a) {
  const r = Fb(a);
  return /[",\r\n]/.test(r) ? `"${r.replace(/"/g, '""')}"` : r;
}
function e0(a) {
  const r = [Wb.slice()];
  return a.runs.forEach((l) => {
    r.push([
      a.id,
      a.createdAt,
      a.hypothesis,
      a.objective.metric,
      a.objective.direction,
      l.variantId,
      l.variantLabel,
      bs(l.repetition),
      l.status,
      l.metricKey ?? "",
      bs(l.metricValue),
      bs(l.runtimeMs),
      l.seed === void 0 ? "" : typeof l.seed == "number" ? bs(l.seed) : l.seed,
      l.error ?? ""
    ]);
  }), r.map((l) => l.map(Pb).join(",")).join(`\r
`);
}
function sa(a) {
  return Object.is(a, -0) || a === 0 ? "0" : Number(a.toPrecision(6)).toString();
}
function sn(a) {
  return a.replace(/[\r\n]+/g, " ").replace(/`/g, "'").trim();
}
function t0(a) {
  const r = /* @__PURE__ */ new Map();
  return a.runs.forEach((l) => {
    let o = r.get(l.variantId);
    o || (o = {
      id: l.variantId,
      label: l.variantLabel || l.variantId,
      usableValues: [],
      unusableRuns: 0
    }, r.set(l.variantId, o)), l.status === "completed" && Number.isFinite(l.metricValue) ? o.usableValues.push(l.metricValue) : o.unusableRuns += 1;
  }), [...r.values()];
}
function n0(a) {
  var v;
  const r = t0(a), l = r.find((p) => p.id === a.baselineVariantId), o = [], u = [
    `# Research report: ${sn(a.id)}`,
    "",
    "## Study question",
    "",
    `- Hypothesis under test: ${sn(a.hypothesis)}`,
    `- Objective: ${a.objective.direction} \`${sn(a.objective.metric)}\`.`,
    `- Recorded evidence: ${a.runs.length} run(s) across ${r.length} variant(s).`,
    "",
    "## Observations",
    ""
  ];
  r.length === 0 && (u.push("- **[Observation]** No run records were available."), o.push("No run records were available for analysis.")), r.forEach((p) => {
    const h = Cn(p.usableValues), b = Bs(p.usableValues), g = dy(p.usableValues), _ = [`n=${p.usableValues.length}`];
    if (h !== void 0 && _.push(`mean=${sa(h)}`), b !== void 0 && _.push(`sample SD=${sa(b)}`), g ? _.push(`95% Student-t CI=[${sa(g.lower)}, ${sa(g.upper)}]`) : _.push("95% Student-t CI=unavailable"), l && p.id !== l.id) {
      const j = Hr(
        p.usableValues,
        l.usableValues,
        a.objective.direction
      );
      j && (_.push(`raw delta vs ${sn(l.label)}=${sa(j.rawDelta)}`), _.push(`direction-adjusted improvement=${sa(j.improvement)}`), j.hedgesG !== void 0 && _.push(`Hedges g=${sa(j.hedgesG)}`));
    }
    u.push(`- **[Observation] ${sn(p.label)}:** ${_.join("; ")}.`), p.usableValues.length < 2 && o.push(
      `${p.label} has fewer than two finite completed observations; variability and a confidence interval are unavailable.`
    ), p.unusableRuns > 0 && o.push(
      `${p.label} has ${p.unusableRuns} run(s) excluded because they failed, were incomplete, or had a non-finite objective value.`
    );
  }), a.baselineVariantId && !l && o.push(`Baseline variant '${a.baselineVariantId}' was not present in the run records.`);
  const d = l ? r.filter((p) => p.id !== l.id).map((p) => ({
    variant: p,
    comparison: Hr(
      p.usableValues,
      l.usableValues,
      a.objective.direction
    )
  })).filter((p) => p.comparison !== void 0).sort((p, h) => h.comparison.improvement - p.comparison.improvement) : [];
  u.push(
    "",
    "## Claims and interpretation",
    "",
    "- **[Claim status]** The hypothesis remains a claim under test. These descriptive observations alone do not establish causality, robustness, or external validity."
  ), d[0] ? u.push(
    `- **[Candidate claim]** ${sn(d[0].variant.label)} had the strongest observed direction-adjusted change versus the baseline (${sa(d[0].comparison.improvement)}); confirm it with a pre-registered, independently replicated study before treating it as a conclusion.`
  ) : u.push("- **[Candidate claim]** No baseline comparison had enough finite evidence to nominate a directional result.");
  const f = [...a.warnings ?? [], ...o];
  return u.push("", "## Warnings", ""), f.length === 0 ? u.push("- None recorded.") : f.forEach((p) => u.push(`- **[Warning]** ${sn(p)}`)), u.push("", "## Paper leads", ""), (v = a.paperLeads) != null && v.length ? a.paperLeads.forEach((p) => {
    u.push(
      `- **[Paper lead] ${sn(p.title)}** — Evidence: ${sn(p.evidence)} Next study: ${sn(p.nextStep)}`
    );
  }) : u.push("- None recorded."), u.join(`
`);
}
const Vu = "codefyui.graph-copilot.study", Ts = 1, Au = "plugin-canonical-v1", Ds = 5 * 1024 * 1024, yh = 64, gh = 1e5, vh = 64 * 1024, Rr = 1e4, Gr = 8, a0 = 16, i0 = 5e3, r0 = 1e4, xu = 1e3, Bu = 512, l0 = 40, s0 = 256, Ss = 1e3, Be = 512, _t = 32 * 1024;
class Pt extends Error {
  constructor(l, o) {
    super(o);
    Qt(this, "code");
    this.name = "StudyBundleError", this.code = l;
  }
}
function J(a, r, l) {
  throw new Pt(a, `${r}: ${l}`);
}
function fy(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function Nu(a, r, l, o) {
  if (l > yh && J("LIMIT_EXCEEDED", r, `maximum depth is ${yh}`), o.values += 1, o.values > gh && J("LIMIT_EXCEEDED", r, `maximum value count is ${gh}`), a === null) return "null";
  if (typeof a == "boolean") return a ? "true" : "false";
  if (typeof a == "number")
    return Number.isFinite(a) || J("INVALID_VALUE", r, "numbers must be finite"), JSON.stringify(a);
  if (typeof a == "string")
    return a.length > vh && J(
      "LIMIT_EXCEEDED",
      r,
      `maximum string length is ${vh}`
    ), JSON.stringify(a);
  (typeof a != "object" || a === void 0) && J("INVALID_VALUE", r, `unsupported JSON value ${typeof a}`), o.stack.has(a) && J("INVALID_VALUE", r, "cyclic values are not allowed"), o.stack.add(a);
  try {
    if (Array.isArray(a)) {
      a.length > Rr && J(
        "LIMIT_EXCEEDED",
        r,
        `maximum collection size is ${Rr}`
      );
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || J("INVALID_VALUE", `${r}/${d}`, "sparse arrays are not allowed");
      return `[${a.map((d, f) => Nu(
        d,
        `${r}/${f}`,
        l + 1,
        o
      )).join(",")}]`;
    }
    fy(a) || J("INVALID_VALUE", r, "objects must be plain JSON objects");
    const u = Object.keys(a).sort();
    return u.length > Rr && J(
      "LIMIT_EXCEEDED",
      r,
      `maximum collection size is ${Rr}`
    ), `{${u.map((d) => (d.length > Be && J("LIMIT_EXCEEDED", r, `object key exceeds ${Be} characters`), `${JSON.stringify(d)}:${Nu(
      a[d],
      `${r}/${Hs(d)}`,
      l + 1,
      o
    )}`)).join(",")}}`;
  } finally {
    o.stack.delete(a);
  }
}
function ji(a) {
  return Nu(a, "$", 0, { values: 0, stack: /* @__PURE__ */ new WeakSet() });
}
function o0(a) {
  return new TextEncoder().encode(a).byteLength;
}
function Hu(a) {
  const r = o0(a);
  if (r > Ds)
    throw new Pt(
      "BUNDLE_TOO_LARGE",
      `Study bundle is ${r} bytes; maximum is ${Ds}`
    );
}
async function my(a) {
  var o;
  const r = (o = globalThis.crypto) == null ? void 0 : o.subtle;
  if (!r)
    throw new Pt(
      "CRYPTO_UNAVAILABLE",
      "Web Crypto SHA-256 is unavailable in this environment"
    );
  const l = await r.digest("SHA-256", new TextEncoder().encode(a));
  return [...new Uint8Array(l)].map((u) => u.toString(16).padStart(2, "0")).join("");
}
function me(a, r) {
  return fy(a) || J("INVALID_BUNDLE", r, "expected an object"), a;
}
function $e(a, r, l, o) {
  const u = new Set(r);
  for (const d of Object.keys(a))
    u.has(d) || J("INVALID_BUNDLE", `${o}/${Hs(d)}`, "unknown property");
  for (const d of l)
    Object.prototype.hasOwnProperty.call(a, d) || J("INVALID_BUNDLE", o, `missing required property '${d}'`);
}
function Ke(a, r, l = Rr) {
  return Array.isArray(a) || J("INVALID_BUNDLE", r, "expected an array"), a.length > l && J("LIMIT_EXCEEDED", r, `maximum item count is ${l}`), a;
}
function he(a, r, l = Be, o = !1) {
  return typeof a != "string" && J("INVALID_BUNDLE", r, "expected a string"), (!o && !a.trim() || a.length > l) && J(
    a.length > l ? "LIMIT_EXCEEDED" : "INVALID_BUNDLE",
    r,
    a.length > l ? `maximum length is ${l}` : "must not be empty"
  ), /\u0000/.test(a) && J("INVALID_BUNDLE", r, "NUL characters are not allowed"), a;
}
function ct(a, r) {
  return (typeof a != "number" || !Number.isFinite(a)) && J("INVALID_BUNDLE", r, "expected a finite number"), a;
}
function qr(a, r, l, o) {
  const u = ct(a, r);
  return (!Number.isInteger(u) || u < l || u > o) && J("INVALID_BUNDLE", r, `expected an integer from ${l} to ${o}`), u;
}
function py(a, r) {
  return typeof a != "boolean" && J("INVALID_BUNDLE", r, "expected a boolean"), a;
}
function zn(a, r, l) {
  return (typeof a != "string" || !r.includes(a)) && J("INVALID_BUNDLE", l, `expected one of: ${r.join(", ")}`), a;
}
function Ir(a, r) {
  const l = he(a, r, 64);
  return (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(l) || Number.isNaN(Date.parse(l)) || new Date(l).toISOString() !== l) && J("INVALID_BUNDLE", r, "expected a canonical ISO-8601 UTC timestamp"), l;
}
function Re(a, r) {
  const l = he(a, r, 256);
  return (l !== l.trim() || /[\u0000-\u001f\u007f]/.test(l)) && J("INVALID_BUNDLE", r, "id must be trimmed and contain no control characters"), l;
}
function en(a, r, l) {
  new Set(a).size !== a.length && J("INVALID_BUNDLE", r, `${l} must be unique`);
}
function de(a, r) {
  return Object.prototype.hasOwnProperty.call(a, r);
}
function Hs(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Ua(a, r) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((o, u) => Ua(o, `${r}/${u}`));
    return;
  }
  const l = me(a, r);
  if (de(l, "$gcpSecretRef")) {
    $e(l, ["$gcpSecretRef"], ["$gcpSecretRef"], r), Re(l.$gcpSecretRef, `${r}/$gcpSecretRef`);
    return;
  }
  for (const [o, u] of Object.entries(l))
    Ua(u, `${r}/${Hs(o)}`);
}
function hy(a, r) {
  const l = me(a, r);
  $e(l, ["x", "y"], ["x", "y"], r), ct(l.x, `${r}/x`), ct(l.y, `${r}/y`);
}
function c0(a, r) {
  const l = me(a, r);
  $e(
    l,
    ["nodes", "edges", "presets", "segmentGroups", "name", "description"],
    ["nodes", "edges"],
    r
  );
  const o = Ke(l.nodes, `${r}/nodes`, i0), u = [];
  o.forEach((p, h) => {
    const b = `${r}/nodes/${h}`, g = me(p, b);
    $e(g, ["id", "type", "position", "data"], ["id", "type", "position", "data"], b), u.push(Re(g.id, `${b}/id`)), he(g.type, `${b}/type`, Be), hy(g.position, `${b}/position`);
    const _ = me(g.data, `${b}/data`);
    Ua(_, `${b}/data`);
  }), en(u, `${r}/nodes`, "node ids");
  const d = new Set(u), f = Ke(l.edges, `${r}/edges`, r0), v = [];
  f.forEach((p, h) => {
    const b = `${r}/edges/${h}`, g = me(p, b);
    $e(
      g,
      ["id", "source", "target", "sourceHandle", "targetHandle", "type"],
      ["id", "source", "target", "sourceHandle", "targetHandle"],
      b
    ), v.push(Re(g.id, `${b}/id`));
    const _ = Re(g.source, `${b}/source`), j = Re(g.target, `${b}/target`);
    d.has(_) || J("INVALID_BUNDLE", `${b}/source`, "unknown source node"), d.has(j) || J("INVALID_BUNDLE", `${b}/target`, "unknown target node"), he(g.sourceHandle, `${b}/sourceHandle`, Be, !0), he(g.targetHandle, `${b}/targetHandle`, Be, !0), de(g, "type") && zn(g.type, ["data", "trigger"], `${b}/type`);
  }), en(v, `${r}/edges`, "edge ids"), de(l, "presets") && Ke(l.presets, `${r}/presets`).forEach((h, b) => Ua(h, `${r}/presets/${b}`)), de(l, "segmentGroups") && Ua(l.segmentGroups, `${r}/segmentGroups`), de(l, "name") && he(l.name, `${r}/name`, Be, !0), de(l, "description") && he(l.description, `${r}/description`, _t, !0);
}
function bh(a, r) {
  const l = me(a, r);
  Ua(l, r);
}
function u0(a, r) {
  const l = me(a, r);
  switch (zn(
    l.op,
    ["add_node", "connect", "set_params", "remove_node", "remove_edge", "clear_graph", "auto_layout"],
    `${r}/op`
  )) {
    case "add_node":
      $e(l, ["op", "node_type", "ref", "params", "position"], ["op", "node_type"], r), he(l.node_type, `${r}/node_type`, Be), de(l, "ref") && Re(l.ref, `${r}/ref`), de(l, "params") && bh(l.params, `${r}/params`), de(l, "position") && hy(l.position, `${r}/position`);
      return;
    case "connect":
      $e(
        l,
        ["op", "source", "source_handle", "target", "target_handle"],
        ["op", "source", "source_handle", "target", "target_handle"],
        r
      ), Re(l.source, `${r}/source`), he(l.source_handle, `${r}/source_handle`, Be, !0), Re(l.target, `${r}/target`), he(l.target_handle, `${r}/target_handle`, Be, !0);
      return;
    case "set_params":
      $e(l, ["op", "node_id", "params"], ["op", "node_id", "params"], r), Re(l.node_id, `${r}/node_id`), bh(l.params, `${r}/params`);
      return;
    case "remove_node":
      $e(l, ["op", "node_id"], ["op", "node_id"], r), Re(l.node_id, `${r}/node_id`);
      return;
    case "remove_edge":
      $e(
        l,
        ["op", "source", "target", "source_handle", "target_handle"],
        ["op", "source", "target"],
        r
      ), Re(l.source, `${r}/source`), Re(l.target, `${r}/target`), de(l, "source_handle") && he(l.source_handle, `${r}/source_handle`, Be, !0), de(l, "target_handle") && he(l.target_handle, `${r}/target_handle`, Be, !0);
      return;
    case "clear_graph":
    case "auto_layout":
      $e(l, ["op"], ["op"], r);
  }
}
function d0(a, r) {
  const l = me(a, r);
  $e(
    l,
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    r
  ), Re(l.pluginId, `${r}/pluginId`), he(l.pluginVersion, `${r}/pluginVersion`, 128), qr(l.codefyuiApiVersion, `${r}/codefyuiApiVersion`, 1, 1e3);
}
function f0(a, r) {
  const l = me(a, r);
  $e(l, ["facts"], ["facts"], r);
  const o = Ke(l.facts, `${r}/facts`, s0), u = [];
  o.forEach((d, f) => {
    const v = `${r}/facts/${f}`, p = me(d, v);
    $e(p, ["key", "status", "source", "collectedAt", "value"], ["key", "status", "source"], v), u.push(he(p.key, `${v}/key`, Be));
    const h = zn(
      p.status,
      ["observed", "declared", "unavailable"],
      `${v}/status`
    );
    he(p.source, `${v}/source`, Be), de(p, "collectedAt") && Ir(p.collectedAt, `${v}/collectedAt`);
    const b = de(p, "value");
    if (h === "unavailable" && b && J("INVALID_BUNDLE", `${v}/value`, "unavailable facts must not contain a value"), h !== "unavailable" && !b && J("INVALID_BUNDLE", v, `${h} facts require a value`), b) {
      Ua(p.value, `${v}/value`);
      const g = /* @__PURE__ */ new Map();
      Kr(p.value, `${v}/value`, g), g.size > 0 && J(
        "INVALID_BUNDLE",
        `${v}/value`,
        "SecretRefs are allowed only in the replayable study spec"
      );
    }
  }), en(u, `${r}/facts`, "provenance fact keys");
}
function m0(a, r) {
  const l = me(a, r);
  $e(
    l,
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
    r
  ), he(l.hypothesis, `${r}/hypothesis`, _t), c0(l.baseline, `${r}/baseline`);
  const o = me(l.objective, `${r}/objective`);
  $e(o, ["metric", "direction"], ["metric", "direction"], `${r}/objective`), he(o.metric, `${r}/objective/metric`, Be), zn(o.direction, ["maximize", "minimize"], `${r}/objective/direction`), qr(l.repetitions, `${r}/repetitions`, 1, 5), qr(l.concurrency, `${r}/concurrency`, 1, 2), py(l.applyBestRequested, `${r}/applyBestRequested`);
  const u = Ke(l.variants, `${r}/variants`, Gr);
  u.length === 0 && J("INVALID_BUNDLE", `${r}/variants`, "at least one variant is required");
  const d = [];
  u.forEach((f, v) => {
    const p = `${r}/variants/${v}`, h = me(f, p);
    $e(h, ["id", "label", "operations"], ["id", "label", "operations"], p), d.push(Re(h.id, `${p}/id`)), he(h.label, `${p}/label`, Be), Ke(
      h.operations,
      `${p}/operations`,
      xu
    ).forEach((g, _) => {
      u0(g, `${p}/operations/${_}`);
    });
  }), en(d, `${r}/variants`, "variant ids");
}
function p0(a, r) {
  const l = me(a, r);
  $e(l, ["phase", "code", "message"], ["phase", "code", "message"], r), zn(l.phase, ["prepare", "validate", "execute", "metric", "cancel"], `${r}/phase`), he(l.code, `${r}/code`, Be), he(l.message, `${r}/message`, _t);
}
function h0(a, r, l) {
  const o = Ke(a, l, a0), u = me(r.spec, "/payload/spec"), d = Ke(u.variants, "/payload/spec/variants", Gr), f = new Set(d.map((b, g) => Re(
    me(b, `/payload/spec/variants/${g}`).id,
    `/payload/spec/variants/${g}/id`
  ))), v = qr(u.repetitions, "/payload/spec/repetitions", 1, 5), p = [], h = [];
  o.forEach((b, g) => {
    const _ = `${l}/${g}`, j = me(b, _);
    $e(
      j,
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
      _
    );
    const R = Re(j.runKey, `${_}/runKey`);
    p.push(R), de(j, "runId") && Re(j.runId, `${_}/runId`), de(j, "graphId") && Re(j.graphId, `${_}/graphId`);
    const x = Re(j.variantId, `${_}/variantId`);
    f.has(x) || J("INVALID_BUNDLE", `${_}/variantId`, "unknown variant id");
    const I = qr(j.repetition, `${_}/repetition`, 1, v);
    h.push(`${x}\0${I}`);
    const M = zn(
      j.status,
      ["completed", "failed", "cancelled"],
      `${_}/status`
    );
    de(j, "startedAt") && Ir(j.startedAt, `${_}/startedAt`), de(j, "completedAt") && Ir(j.completedAt, `${_}/completedAt`), de(j, "startedAt") && de(j, "completedAt") && Date.parse(j.completedAt) < Date.parse(j.startedAt) && J("INVALID_BUNDLE", `${_}/completedAt`, "must not be before startedAt"), ct(j.durationMs, `${_}/durationMs`) < 0 && J("INVALID_BUNDLE", `${_}/durationMs`, "must be non-negative");
    const Y = Ke(j.metrics, `${_}/metrics`, Bu), ie = [];
    Y.forEach((Z, ae) => {
      const G = `${_}/metrics/${ae}`, se = me(Z, G);
      $e(
        se,
        ["observedKey", "canonicalKey", "value", "source"],
        ["observedKey", "canonicalKey", "value", "source"],
        G
      ), ie.push(he(se.observedKey, `${G}/observedKey`, Be)), he(se.canonicalKey, `${G}/canonicalKey`, Be), ct(se.value, `${G}/value`), zn(se.source, ["output_summary", "progress", "client"], `${G}/source`);
    }), en(ie, `${_}/metrics`, "observed metric keys"), de(j, "error") && p0(j.error, `${_}/error`), M === "completed" && de(j, "error") && J("INVALID_BUNDLE", `${_}/error`, "completed runs must not contain an error"), M !== "completed" && !de(j, "error") && J("INVALID_BUNDLE", _, `${M} runs require an error`);
  }), en(p, l, "run keys"), en(h, l, "variant/repetition slots");
}
function y0(a, r) {
  const l = me(a, r);
  $e(l, ["title", "evidence", "nextStep"], ["title", "evidence", "nextStep"], r), he(l.title, `${r}/title`, _t), he(l.evidence, `${r}/evidence`, _t), he(l.nextStep, `${r}/nextStep`, _t);
}
function g0(a, r) {
  const l = me(a, r);
  if ($e(
    l,
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
    r
  ), Re(l.id, `${r}/id`), he(l.label, `${r}/label`, Be), zn(l.status, ["completed", "invalid", "failed"], `${r}/status`), de(l, "metricKey") && he(l.metricKey, `${r}/metricKey`, Be), Ke(l.metricValues, `${r}/metricValues`, 5).forEach((f, v) => {
    ct(f, `${r}/metricValues/${v}`);
  }), de(l, "mean") && ct(l.mean, `${r}/mean`), de(l, "stddev") && ct(l.stddev, `${r}/stddev`) < 0 && J("INVALID_BUNDLE", `${r}/stddev`, "must be non-negative"), de(l, "confidenceInterval95")) {
    const f = me(l.confidenceInterval95, `${r}/confidenceInterval95`);
    $e(
      f,
      ["level", "lower", "upper"],
      ["level", "lower", "upper"],
      `${r}/confidenceInterval95`
    ), f.level !== 0.95 && J("INVALID_BUNDLE", `${r}/confidenceInterval95/level`, "must be 0.95");
    const v = ct(f.lower, `${r}/confidenceInterval95/lower`), p = ct(f.upper, `${r}/confidenceInterval95/upper`);
    v > p && J("INVALID_BUNDLE", `${r}/confidenceInterval95`, "lower must not exceed upper");
  }
  if (de(l, "baselineComparison")) {
    const f = me(l.baselineComparison, `${r}/baselineComparison`);
    $e(
      f,
      ["baselineId", "meanDelta", "objectiveImprovement", "hedgesG"],
      ["baselineId", "meanDelta", "objectiveImprovement"],
      `${r}/baselineComparison`
    ), Re(f.baselineId, `${r}/baselineComparison/baselineId`), ct(f.meanDelta, `${r}/baselineComparison/meanDelta`), ct(
      f.objectiveImprovement,
      `${r}/baselineComparison/objectiveImprovement`
    ), de(f, "hedgesG") && ct(f.hedgesG, `${r}/baselineComparison/hedgesG`);
  }
  ct(l.runtimeMs, `${r}/runtimeMs`) < 0 && J("INVALID_BUNDLE", `${r}/runtimeMs`, "must be non-negative");
  const u = Ke(l.observedMetrics, `${r}/observedMetrics`, Bu), d = [];
  u.forEach((f, v) => {
    const p = `${r}/observedMetrics/${v}`, h = me(f, p);
    $e(h, ["key", "value"], ["key", "value"], p), d.push(he(h.key, `${p}/key`, Be)), ct(h.value, `${p}/value`);
  }), en(d, `${r}/observedMetrics`, "derived metric keys"), de(l, "operationSummary") && Ke(l.operationSummary, `${r}/operationSummary`, xu).forEach((f, v) => he(f, `${r}/operationSummary/${v}`, _t)), Ke(l.errors, `${r}/errors`, xu).forEach((f, v) => he(f, `${r}/errors/${v}`, _t));
}
function Os(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function yy(a, r) {
  return Object.is(a, r) || a === r ? !0 : Math.abs(a - r) <= Number.EPSILON * 32 * Math.max(1, Math.abs(a), Math.abs(r));
}
function ca(a, r, l, o) {
  const u = de(a, r);
  if (l === void 0) {
    u && J("INVALID_BUNDLE", `${o}/${r}`, "is not supported by the raw run evidence");
    return;
  }
  u || J("INVALID_BUNDLE", o, `${r} is required by the raw run evidence`);
  const d = ct(a[r], `${o}/${r}`);
  yy(d, l) || J("INVALID_BUNDLE", `${o}/${r}`, `does not match raw run evidence (expected ${l})`);
}
function v0(a, r, l) {
  const o = a.metrics.filter((d) => d.canonicalKey === r);
  if (o.length < 2) return;
  const u = o[0].value;
  o.some((d) => d.value !== u) && J(
    "INVALID_BUNDLE",
    `${l}/metrics`,
    `conflicting duplicate samples resolve to objective identity '${r}'`
  );
}
function gy(a, r, l) {
  const o = [...a.metrics];
  if (o.length === 0) return;
  const u = (b) => (v0(a, b.canonicalKey, l), { key: b.canonicalKey, value: b.value }), d = (b) => new Set(b.map((_) => _.canonicalKey)).size === 1 && b.length > 0 ? u(b[0]) : void 0, f = r.metric.trim(), v = o.find((b) => b.observedKey === f) ?? o.find((b) => b.observedKey.toLowerCase() === f.toLowerCase());
  if (v) return u(v);
  if (f && f.toLowerCase() !== "auto") {
    const b = Os(f);
    return d(o.filter((g) => {
      const _ = Os(g.observedKey);
      return _ === b || _.endsWith(`.${b}`);
    }));
  }
  const p = r.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = o.filter((b) => p.test(b.observedKey));
  return h.length > 0 ? d(h) : r.direction === "minimize" ? d(o.filter((b) => /(^|\.)runtime_ms$/i.test(b.observedKey))) : void 0;
}
function b0(a, r, l) {
  const o = Ke(a.metricValues, `${l}/metricValues`, 5).map((u, d) => ct(u, `${l}/metricValues/${d}`));
  (o.length !== r.length || o.some((u, d) => u !== r[d])) && J("INVALID_BUNDLE", `${l}/metricValues`, "does not match completed raw run evidence");
}
function vy(a) {
  const r = /* @__PURE__ */ new Map();
  for (const l of a)
    for (const o of l.metrics) {
      const u = r.get(o.observedKey) ?? [];
      u.push(o.value), r.set(o.observedKey, u);
    }
  return [...r.entries()].sort(([l], [o]) => l.localeCompare(o)).slice(0, l0).map(([l, o]) => ({ key: l, value: Cn(o) }));
}
function S0(a, r, l) {
  const o = Ke(
    a.observedMetrics,
    `${l}/observedMetrics`,
    Bu
  ).map((u, d) => {
    const f = me(u, `${l}/observedMetrics/${d}`);
    return {
      key: he(f.key, `${l}/observedMetrics/${d}/key`, Be),
      value: ct(f.value, `${l}/observedMetrics/${d}/value`)
    };
  });
  (o.length !== r.length || o.some((u, d) => u.key !== r[d].key || !yy(u.value, r[d].value))) && J("INVALID_BUNDLE", `${l}/observedMetrics`, "does not match raw run evidence");
}
function _0(a, r, l, o) {
  const u = l ? Lu(r) : void 0;
  if (!u) {
    de(a, "confidenceInterval95") && J(
      "INVALID_BUNDLE",
      `${o}/confidenceInterval95`,
      "is not supported by the raw run evidence"
    );
    return;
  }
  de(a, "confidenceInterval95") || J("INVALID_BUNDLE", o, "confidenceInterval95 is required by the raw run evidence");
  const d = me(a.confidenceInterval95, `${o}/confidenceInterval95`);
  ca(d, "lower", u.lower, `${o}/confidenceInterval95`), ca(d, "upper", u.upper, `${o}/confidenceInterval95`);
}
function E0(a, r, l, o) {
  if (!r) {
    de(a, "baselineComparison") && J("INVALID_BUNDLE", `${o}/baselineComparison`, "is not supported by the raw run evidence");
    return;
  }
  de(a, "baselineComparison") || J("INVALID_BUNDLE", o, "baselineComparison is required by the raw run evidence");
  const u = me(a.baselineComparison, `${o}/baselineComparison`);
  u.baselineId !== l && J("INVALID_BUNDLE", `${o}/baselineComparison/baselineId`, "does not match the evidence baseline"), ca(u, "meanDelta", r.rawDelta, `${o}/baselineComparison`), ca(
    u,
    "objectiveImprovement",
    r.improvement,
    `${o}/baselineComparison`
  ), ca(u, "hedgesG", r.hedgesG, `${o}/baselineComparison`);
}
function A0(a, r, l) {
  const o = r.spec, u = r.runs, f = a.variants.map((x, I) => {
    var Ne;
    const M = `${l}/variants/${I}`, L = me(x, M), Y = L.id, ie = L.label, Z = u.filter((D) => D.variantId === Y).sort((D, X) => D.repetition - X.repetition || D.runKey.localeCompare(X.runKey)), ae = Z.filter((D) => D.status === "completed"), G = ae.map((D) => gy(D, o.objective, `/payload/runs/${u.indexOf(D)}`)).filter((D) => D !== void 0), se = new Set(G.map((D) => D.key)), ce = G.map((D) => D.value), U = se.size === 1 ? (Ne = G[0]) == null ? void 0 : Ne.key : void 0, k = ae.length === o.repetitions && G.length === o.repetitions && se.size === 1, oe = L.status;
    oe === "invalid" && Z.length > 0 && J("INVALID_BUNDLE", `${M}/status`, "invalid variants must not contain execution runs");
    const ge = oe === "invalid" ? "invalid" : k ? "completed" : "failed";
    U === void 0 ? de(L, "metricKey") && J("INVALID_BUNDLE", `${M}/metricKey`, "is not supported by the raw run evidence") : L.metricKey !== U && J(
      "INVALID_BUNDLE",
      `${M}/metricKey`,
      `does not match raw run identity '${U}'`
    );
    const re = Cn(Z.map((D) => D.durationMs)) ?? 0;
    return ca(L, "runtimeMs", re, M), S0(L, vy(Z), M), {
      record: L,
      id: Y,
      label: ie,
      values: ce,
      ...U === void 0 ? {} : { metricKey: U },
      fullyObserved: k,
      preRankingStatus: ge,
      finalStatus: ge,
      ...k ? { mean: Cn(ce) } : {}
    };
  });
  new Set(
    f.filter((x) => x.preRankingStatus === "completed" && x.metricKey).map((x) => Os(x.metricKey))
  ).size > 1 && f.forEach((x) => {
    x.preRankingStatus === "completed" && (x.finalStatus = "failed");
  }), f.forEach((x, I) => {
    const M = `${l}/variants/${I}`;
    x.record.status !== x.finalStatus && J(
      "INVALID_BUNDLE",
      `${M}/status`,
      `does not match raw run evidence (expected ${x.finalStatus})`
    );
    const L = x.preRankingStatus === "completed" && x.finalStatus === "failed";
    b0(
      x.record,
      L ? [] : x.values,
      M
    ), _0(
      x.record,
      x.values,
      x.finalStatus === "completed",
      M
    );
    const Y = x.finalStatus === "completed" ? x.mean : void 0;
    ca(x.record, "mean", Y, M), ca(
      x.record,
      "stddev",
      x.finalStatus === "completed" ? Bs(x.values) : void 0,
      M
    );
  });
  const p = de(a, "baselineVariantId") ? a.baselineVariantId : void 0;
  if (p !== void 0) {
    const x = o.variants.filter((M) => M.operations.length === 0);
    (x.length !== 1 || x[0].id !== p) && J(
      "INVALID_BUNDLE",
      `${l}/baselineVariantId`,
      "must identify the single zero-operation baseline from the study spec"
    );
    const I = f.find((M) => M.id === p);
    f.forEach((M, L) => {
      const Y = M.id !== p && I.finalStatus === "completed" && M.finalStatus === "completed" ? Hr(M.values, I.values, o.objective.direction) : void 0;
      E0(
        M.record,
        Y,
        p,
        `${l}/variants/${L}`
      );
    });
  }
  const h = f.filter((x) => x.finalStatus === "completed" && x.mean !== void 0).sort((x, I) => (o.objective.direction === "maximize" ? I.mean - x.mean : x.mean - I.mean) || x.id.localeCompare(I.id)), b = h[0], g = b ? Math.max(1, Math.abs(b.mean)) * Number.EPSILON * 8 : 0, j = (b ? h.filter((x) => Math.abs(x.mean - b.mean) <= g) : []).length === 1 ? b : void 0;
  j ? (a.winnerId !== j.id || a.winnerLabel !== j.label) && J(
    "INVALID_BUNDLE",
    `${l}/winnerId`,
    `does not match the raw-run winner '${j.id}'`
  ) : (de(a, "winnerId") || de(a, "winnerLabel")) && J("INVALID_BUNDLE", `${l}/winnerId`, "no unique winner is supported by the raw run evidence");
  const R = h.length === 0 ? "failed" : f.every((x) => x.finalStatus === "completed") ? "completed" : "partial";
  a.status !== R && J(
    "INVALID_BUNDLE",
    `${l}/status`,
    `does not match raw run evidence (expected ${R})`
  );
}
function x0(a, r, l) {
  const o = me(a, l);
  $e(
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
    l
  ), zn(o.status, ["completed", "partial", "failed"], `${l}/status`);
  const u = Ke(o.variants, `${l}/variants`, Gr), d = [], f = /* @__PURE__ */ new Map();
  u.forEach((g, _) => {
    g0(g, `${l}/variants/${_}`);
    const j = me(g, `${l}/variants/${_}`), R = Re(j.id, `${l}/variants/${_}/id`);
    d.push(R), f.set(R, he(j.label, `${l}/variants/${_}/label`, Be));
  }), en(d, `${l}/variants`, "derived variant ids");
  const v = me(r.spec, "/payload/spec"), p = /* @__PURE__ */ new Map(), h = Ke(v.variants, "/payload/spec/variants", Gr).map((g, _) => {
    const j = me(g, `/payload/spec/variants/${_}`), R = Re(j.id, `/payload/spec/variants/${_}/id`);
    return p.set(
      R,
      he(j.label, `/payload/spec/variants/${_}/label`, Be)
    ), R;
  });
  (d.length !== h.length || d.some((g) => !h.includes(g))) && J("INVALID_BUNDLE", `${l}/variants`, "must match spec variant ids exactly");
  for (const g of d)
    f.get(g) !== p.get(g) && J("INVALID_BUNDLE", `${l}/variants`, `label for variant '${g}' does not match the spec`);
  if (de(o, "baselineVariantId")) {
    const g = Re(o.baselineVariantId, `${l}/baselineVariantId`);
    f.has(g) || J("INVALID_BUNDLE", `${l}/baselineVariantId`, "unknown baseline variant"), u.forEach((_, j) => {
      const R = me(_, `${l}/variants/${j}`);
      if (!de(R, "baselineComparison")) return;
      me(
        R.baselineComparison,
        `${l}/variants/${j}/baselineComparison`
      ).baselineId !== g && J(
        "INVALID_BUNDLE",
        `${l}/variants/${j}/baselineComparison/baselineId`,
        "must match derived baselineVariantId"
      );
    });
  } else u.some((g) => de(me(g, l), "baselineComparison")) && J("INVALID_BUNDLE", `${l}/variants`, "baselineComparison requires baselineVariantId");
  if (de(o, "winnerId")) {
    const g = Re(o.winnerId, `${l}/winnerId`);
    f.has(g) || J("INVALID_BUNDLE", `${l}/winnerId`, "unknown winner variant"), de(o, "winnerLabel") && he(o.winnerLabel, `${l}/winnerLabel`, Be) !== f.get(g) && J("INVALID_BUNDLE", `${l}/winnerLabel`, "does not match the winner variant label");
  } else de(o, "winnerLabel") && J("INVALID_BUNDLE", `${l}/winnerLabel`, "winnerLabel requires winnerId");
  if (de(o, "appliedVariantId")) {
    const g = Re(o.appliedVariantId, `${l}/appliedVariantId`);
    f.has(g) || J("INVALID_BUNDLE", `${l}/appliedVariantId`, "unknown applied variant");
  }
  de(o, "applyConflict") && he(o.applyConflict, `${l}/applyConflict`, _t);
  const b = me(o.insights, `${l}/insights`);
  $e(b, ["summary", "warnings", "paperIdeas"], ["summary", "warnings", "paperIdeas"], `${l}/insights`), Ke(b.summary, `${l}/insights/summary`, 1e3).forEach((g, _) => he(g, `${l}/insights/summary/${_}`, _t)), Ke(b.warnings, `${l}/insights/warnings`, 1e3).forEach((g, _) => he(g, `${l}/insights/warnings/${_}`, _t)), Ke(b.paperIdeas, `${l}/insights/paperIdeas`, 1e3).forEach((g, _) => y0(g, `${l}/insights/paperIdeas/${_}`)), A0(o, r, l);
}
function Sh(a) {
  return a.startsWith("/") && !/~(?:[^01]|$)/.test(a);
}
function Kr(a, r, l) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((u, d) => Kr(u, `${r}/${d}`, l));
    return;
  }
  const o = me(a, r);
  if (de(o, "$gcpSecretRef")) {
    $e(o, ["$gcpSecretRef"], ["$gcpSecretRef"], r);
    const u = Re(o.$gcpSecretRef, `${r}/$gcpSecretRef`), d = l.get(u) ?? [];
    d.push(r), l.set(u, d);
    return;
  }
  for (const [u, d] of Object.entries(o))
    Kr(d, `${r}/${Hs(u)}`, l);
}
function N0(a, r, l) {
  const o = me(a, l);
  $e(
    o,
    ["policy", "secretRequirements", "textRedactions"],
    ["policy", "secretRequirements", "textRedactions"],
    l
  ), o.policy !== "explicit-secret-ref-v1" && J("INVALID_BUNDLE", `${l}/policy`, "expected 'explicit-secret-ref-v1'");
  const u = Ke(
    o.secretRequirements,
    `${l}/secretRequirements`,
    Ss
  ), d = [], f = /* @__PURE__ */ new Map();
  u.forEach((j, R) => {
    const x = `${l}/secretRequirements/${R}`, I = me(j, x);
    $e(
      I,
      ["id", "locations", "reason", "requiredAtReplay", "nodeType", "parameter"],
      ["id", "locations", "reason", "requiredAtReplay"],
      x
    );
    const M = Re(I.id, `${x}/id`);
    d.push(M);
    const L = Ke(I.locations, `${x}/locations`, Ss).map((Y, ie) => {
      const Z = he(
        Y,
        `${x}/locations/${ie}`,
        _t
      );
      return Sh(Z) || J("INVALID_BUNDLE", `${x}/locations/${ie}`, "expected a valid JSON Pointer"), Z;
    });
    L.length === 0 && J("INVALID_BUNDLE", `${x}/locations`, "at least one location is required"), en(L, `${x}/locations`, "secret locations"), f.set(M, [...L].sort()), he(I.reason, `${x}/reason`, _t), py(I.requiredAtReplay, `${x}/requiredAtReplay`), de(I, "nodeType") && he(I.nodeType, `${x}/nodeType`, Be), de(I, "parameter") && he(I.parameter, `${x}/parameter`, Be);
  }), en(d, `${l}/secretRequirements`, "secret requirement ids"), Ke(
    o.textRedactions,
    `${l}/textRedactions`,
    Ss
  ).forEach((j, R) => {
    const x = `${l}/textRedactions/${R}`, I = me(j, x);
    $e(I, ["locations", "reason"], ["locations", "reason"], x);
    const M = Ke(I.locations, `${x}/locations`, Ss);
    M.length === 0 && J("INVALID_BUNDLE", `${x}/locations`, "at least one location is required"), M.forEach((L, Y) => {
      const ie = he(L, `${x}/locations/${Y}`, _t);
      Sh(ie) || J("INVALID_BUNDLE", `${x}/locations/${Y}`, "expected a valid JSON Pointer");
    }), he(I.reason, `${x}/reason`, _t);
  });
  const p = /* @__PURE__ */ new Map(), h = me(r.spec, "/payload/spec");
  Kr(h.baseline, "/spec/baseline", p), Ke(h.variants, "/payload/spec/variants", Gr).forEach((j, R) => {
    const x = me(j, `/payload/spec/variants/${R}`);
    Kr(x.operations, `/spec/variants/${R}/operations`, p);
  });
  const g = [...p.keys()].sort(), _ = [...f.keys()].sort();
  (g.length !== _.length || g.some((j, R) => j !== _[R])) && J(
    "INVALID_BUNDLE",
    `${l}/secretRequirements`,
    `must declare exactly the SecretRefs used by the spec (used: ${g.join(", ") || "none"})`
  );
  for (const j of g) {
    const R = [...p.get(j)].sort(), x = f.get(j);
    (R.length !== x.length || R.some((I, M) => I !== x[M])) && J(
      "INVALID_BUNDLE",
      `${l}/secretRequirements`,
      `locations for SecretRef '${j}' do not match the spec`
    );
  }
}
function j0(a, r) {
  const l = me(a, r);
  $e(
    l,
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    r
  ), Re(l.id, `${r}/id`);
  const o = Ir(l.createdAt, `${r}/createdAt`), u = Ir(l.completedAt, `${r}/completedAt`);
  return Date.parse(u) < Date.parse(o) && J("INVALID_BUNDLE", `${r}/completedAt`, "must not be before createdAt"), d0(l.producer, `${r}/producer`), f0(l.provenance, `${r}/provenance`), m0(l.spec, `${r}/spec`), h0(l.runs, l, `${r}/runs`), x0(l.derived, l, `${r}/derived`), N0(l.redactionReport, l, `${r}/redactionReport`), l;
}
function w0(a, r) {
  const l = me(a, r);
  $e(
    l,
    ["algorithm", "canonicalization", "contentSha256"],
    ["algorithm", "canonicalization", "contentSha256"],
    r
  ), l.algorithm !== "SHA-256" && J("INVALID_BUNDLE", `${r}/algorithm`, "expected 'SHA-256'"), l.canonicalization !== Au && J("INVALID_BUNDLE", `${r}/canonicalization`, `expected '${Au}'`);
  const o = he(l.contentSha256, `${r}/contentSha256`, 64);
  return /^[a-f0-9]{64}$/.test(o) || J("INVALID_BUNDLE", `${r}/contentSha256`, "expected 64 lowercase hexadecimal characters"), l;
}
function $0(a) {
  ji(a);
  const r = me(a, "/");
  if (r.format !== Vu)
    throw new Pt(
      "UNSUPPORTED_FORMAT",
      `Unsupported study bundle format '${String(r.format ?? "")}'`
    );
  if (typeof r.formatVersion != "number" || !Number.isInteger(r.formatVersion))
    throw new Pt("UNSUPPORTED_VERSION", "Study bundle formatVersion must be an integer");
  if (r.formatVersion > Ts)
    throw new Pt(
      "FUTURE_VERSION",
      `Study bundle version ${r.formatVersion} requires a newer Graph Copilot`
    );
  if (r.formatVersion !== Ts)
    throw new Pt(
      "UNSUPPORTED_VERSION",
      `Study bundle version ${r.formatVersion} is not supported`
    );
  $e(r, ["format", "formatVersion", "payload", "integrity"], ["format", "formatVersion", "payload", "integrity"], "/");
  const l = j0(r.payload, "/payload"), o = w0(r.integrity, "/integrity");
  return { root: r, payload: l, integrity: o };
}
function by(a) {
  return {
    format: Vu,
    formatVersion: Ts,
    payload: a
  };
}
function Sy(a, r = /* @__PURE__ */ new WeakSet()) {
  if (!a || typeof a != "object" || r.has(a)) return a;
  r.add(a);
  for (const l of Object.values(a)) Sy(l, r);
  return Object.freeze(a);
}
function _y(a) {
  return JSON.parse(ji(a));
}
function fu(a, r) {
  return a === void 0 ? {} : { [r]: a };
}
function T0(a, r, l) {
  const o = a.variants.map((g) => {
    var se;
    const _ = l.filter((ce) => ce.variantId === g.id).sort((ce, U) => ce.repetition - U.repetition || ce.runKey.localeCompare(U.runKey)), j = _.filter((ce) => ce.status === "completed"), R = j.map((ce) => gy(ce, r.objective, `/payload/runs/${l.indexOf(ce)}`)).filter((ce) => ce !== void 0), x = new Set(R.map((ce) => ce.key)), I = R.map((ce) => ce.value), M = x.size === 1 ? (se = R[0]) == null ? void 0 : se.key : void 0, L = j.length === r.repetitions && R.length === r.repetitions && x.size === 1, Y = g.status === "invalid" ? "invalid" : L ? "completed" : "failed", ie = L ? Lu(I) : void 0, Z = L ? Cn(I) : void 0, ae = L ? Bs(I) : void 0, G = {
      id: g.id,
      label: g.label,
      status: Y,
      ...M === void 0 ? {} : { metricKey: M },
      metricValues: I,
      ...Z === void 0 ? {} : { mean: Z },
      ...ae === void 0 ? {} : { stddev: ae },
      ...ie === void 0 ? {} : {
        confidenceInterval95: {
          level: 0.95,
          lower: ie.lower,
          upper: ie.upper
        }
      },
      runtimeMs: Cn(_.map((ce) => ce.durationMs)) ?? 0,
      observedMetrics: vy(_),
      ...g.operationSummary === void 0 ? {} : { operationSummary: [...g.operationSummary] },
      errors: [...g.errors]
    };
    return {
      id: g.id,
      label: g.label,
      values: I,
      ...M === void 0 ? {} : { metricKey: M },
      preRankingStatus: Y,
      result: G
    };
  });
  if (new Set(
    o.filter((g) => g.preRankingStatus === "completed" && g.metricKey).map((g) => Os(g.metricKey))
  ).size > 1 && o.forEach((g) => {
    if (g.preRankingStatus !== "completed") return;
    const {
      mean: _,
      stddev: j,
      confidenceInterval95: R,
      baselineComparison: x,
      ...I
    } = g.result;
    g.result = { ...I, status: "failed", metricValues: [] };
  }), a.baselineVariantId !== void 0) {
    const g = o.find((_) => _.id === a.baselineVariantId);
    (g == null ? void 0 : g.result.status) === "completed" && o.forEach((_) => {
      if (_.id === g.id || _.result.status !== "completed") return;
      const j = Hr(_.values, g.values, r.objective.direction);
      j && (_.result = {
        ..._.result,
        baselineComparison: {
          baselineId: g.id,
          meanDelta: j.rawDelta,
          objectiveImprovement: j.improvement,
          ...j.hedgesG === void 0 ? {} : { hedgesG: j.hedgesG }
        }
      });
    });
  }
  const d = o.filter((g) => g.result.status === "completed" && g.result.mean !== void 0).sort((g, _) => (r.objective.direction === "maximize" ? _.result.mean - g.result.mean : g.result.mean - _.result.mean) || g.id.localeCompare(_.id)), f = d[0], v = f ? Math.max(1, Math.abs(f.result.mean)) * Number.EPSILON * 8 : 0, h = (f ? d.filter((g) => Math.abs(g.result.mean - f.result.mean) <= v) : []).length === 1 ? f : void 0;
  return {
    status: d.length === 0 ? "failed" : o.every((g) => g.result.status === "completed") ? "completed" : "partial",
    variants: o.map((g) => g.result),
    ...fu(a.baselineVariantId, "baselineVariantId"),
    ...h === void 0 ? {} : { winnerId: h.id, winnerLabel: h.label },
    ...fu(a.appliedVariantId, "appliedVariantId"),
    ...fu(a.applyConflict, "applyConflict"),
    insights: {
      summary: [...a.insights.summary],
      warnings: [...a.insights.warnings],
      paperIdeas: a.insights.paperIdeas.map((g) => ({ ...g }))
    }
  };
}
async function Gu(a) {
  const { payload: r, integrity: l } = $0(a), o = await my(ji(by(r)));
  if (o !== l.contentSha256)
    throw new Pt(
      "INTEGRITY_MISMATCH",
      `Study bundle integrity mismatch: expected ${o}, received ${l.contentSha256}`
    );
  const u = _y(a);
  return Hu(ji(u)), Sy(u);
}
async function D0(a) {
  const r = {
    hypothesis: a.session.hypothesis,
    baseline: a.baseline,
    objective: { ...a.session.objective },
    repetitions: a.session.repetitions,
    concurrency: a.concurrency ?? 1,
    applyBestRequested: a.applyBestRequested ?? !1,
    variants: a.variants
  }, l = {
    id: a.session.id,
    createdAt: a.session.createdAt,
    completedAt: a.completedAt,
    producer: a.producer,
    provenance: a.provenance,
    spec: r,
    runs: a.runs,
    derived: T0(a.session, r, a.runs),
    redactionReport: a.redactionReport
  }, o = _y(l), u = await my(ji(by(o)));
  return Gu({
    format: Vu,
    formatVersion: Ts,
    payload: o,
    integrity: {
      algorithm: "SHA-256",
      canonicalization: Au,
      contentSha256: u
    }
  });
}
async function qu(a) {
  const r = await Gu(a), l = ji(r);
  return Hu(l), l;
}
async function Iu(a) {
  if (typeof a != "string")
    throw new Pt("INVALID_JSON", "Study bundle input must be text");
  Hu(a);
  let r;
  try {
    r = JSON.parse(a);
  } catch (l) {
    throw new Pt("INVALID_JSON", `Study bundle is not valid JSON: ${String(l)}`);
  }
  return Gu(r);
}
const O0 = "graph-copilot", M0 = "[REDACTED]", C0 = "Exact echoes of values removed by capture redaction were removed from text. Arbitrary unrelated secrets in ordinary strings cannot be detected.", z0 = "A credential-shaped field outside the replayable graph spec was removed.";
class R0 extends Error {
  constructor(l, o) {
    super(`${l}: ${o}`);
    Qt(this, "path");
    this.name = "StudyCaptureError", this.path = l;
  }
}
function we(a, r) {
  throw new R0(a, r);
}
function Oi(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function on(a, r) {
  return Oi(a) || we(r, "expected a plain object"), a;
}
function Tt(a, r, l = !1) {
  return (typeof a != "string" || !l && a.length === 0) && we(r, l ? "expected a string" : "expected a non-empty string"), a;
}
function wi(a, r) {
  return (typeof a != "number" || !Number.isFinite(a)) && we(r, "expected a finite number"), a;
}
function Wr(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function U0(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function La(a) {
  const r = U0(a);
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
  ].some((l) => r === l || r.endsWith(`_${l}`));
}
function $i(a, r, l = /* @__PURE__ */ new WeakSet()) {
  if (typeof a == "string") {
    a.length > 0 && r.add(a);
    return;
  }
  if (Array.isArray(a)) {
    if (l.has(a)) return;
    l.add(a), a.forEach((o) => $i(o, r, l)), l.delete(a);
    return;
  }
  if (Oi(a)) {
    if (l.has(a)) return;
    l.add(a), Object.values(a).forEach((o) => $i(o, r, l)), l.delete(a);
  }
}
function Ra(a, r, l = /* @__PURE__ */ new WeakSet()) {
  if (Array.isArray(a)) {
    if (l.has(a)) return;
    l.add(a), a.forEach((o) => Ra(o, r, l)), l.delete(a);
    return;
  }
  if (Oi(a) && !l.has(a)) {
    l.add(a);
    for (const [o, u] of Object.entries(a))
      La(o) ? $i(u, r) : Ra(u, r, l);
    l.delete(a);
  }
}
function L0(a) {
  const r = /* @__PURE__ */ new Map();
  return a.forEach((l, o) => {
    const u = Tt(l == null ? void 0 : l.node_name, `definitions[${o}].node_name`);
    r.has(u) && we(`definitions[${o}].node_name`, `duplicate node definition '${u}'`);
    const d = /* @__PURE__ */ new Set();
    Array.isArray(l.params) || we(`definitions[${o}].params`, "expected an array"), l.params.forEach((f, v) => {
      const p = Tt(
        f == null ? void 0 : f.name,
        `definitions[${o}].params[${v}].name`
      );
      d.has(p) && we(
        `definitions[${o}].params[${v}].name`,
        `duplicate parameter definition '${p}'`
      ), d.add(p);
    }), r.set(u, l);
  }), r;
}
function Ey(a) {
  const r = /* @__PURE__ */ new Map();
  return a.forEach((l) => {
    typeof (l == null ? void 0 : l.id) == "string" && typeof l.type == "string" && r.set(l.id, l.type);
  }), r;
}
function V0(a, r, l) {
  if (a.op === "add_node") {
    const o = typeof a.node_type == "string" ? a.node_type : void 0;
    return o && typeof a.ref == "string" && l.set(a.ref, o), o;
  }
  if (a.op === "set_params") {
    const o = typeof a.node_id == "string" ? a.node_id : void 0;
    return o ? l.get(o) ?? r.get(o) : void 0;
  }
  a.op === "remove_node" && typeof a.node_id == "string" ? (l.delete(a.node_id), r.delete(a.node_id)) : a.op === "clear_graph" && (r.clear(), l.clear());
}
function _h(a, r, l, o) {
  if (Ra(a, o), !Oi(a)) return;
  const u = r ? l.get(r) : void 0, d = Ay(u);
  for (const [f, v] of Object.entries(a)) {
    const p = d == null ? void 0 : d.get(f);
    (!u || !p || p.param_type === "secret" || La(f)) && $i(v, o);
  }
}
function B0(a, r) {
  var f;
  const l = /* @__PURE__ */ new Set(), { baseline: o, request: u } = a;
  for (const v of r.values())
    for (const p of v.params)
      Ra(p.default, l), (p.param_type === "secret" || La(p.name)) && $i(p.default, l);
  Ra(o, l), Ra(u, l), Ra(a.provenanceFacts, l);
  for (const v of Array.isArray(o.nodes) ? o.nodes : [])
    _h((f = v.data) == null ? void 0 : f.params, v.type, r, l);
  Array.isArray(o.presets) && o.presets.forEach((v) => $i(v, l));
  const d = Ey(Array.isArray(o.nodes) ? o.nodes : []);
  for (const v of Array.isArray(u.variants) ? u.variants : []) {
    const p = new Map(d), h = /* @__PURE__ */ new Map();
    for (const b of Array.isArray(v == null ? void 0 : v.operations) ? v.operations : []) {
      if (!Oi(b)) continue;
      const g = V0(b, p, h);
      (b.op === "add_node" || b.op === "set_params") && _h(b.params, g, r, l);
    }
  }
  return l;
}
function H0(a) {
  const l = [M0, "<removed>", "***", "�"].find((o) => [...a].every((u) => !o.includes(u)));
  if (l) return l;
  for (let o = 57344; o <= 63743; o += 1) {
    const u = String.fromCodePoint(o);
    if ([...a].every((d) => !u.includes(d))) return u;
  }
  return "";
}
class G0 {
  constructor() {
    Qt(this, "byReason", /* @__PURE__ */ new Map());
  }
  record(r, l) {
    const o = this.byReason.get(l) ?? /* @__PURE__ */ new Set();
    o.add(r), this.byReason.set(l, o);
  }
  report() {
    return [...this.byReason.entries()].map(([r, l]) => ({
      locations: [...l].sort(),
      reason: r
    }));
  }
}
class q0 {
  constructor(r, l) {
    Qt(this, "ordered");
    Qt(this, "replacement");
    this.redactions = l, this.ordered = [...r].sort((o, u) => u.length - o.length), this.replacement = H0(r);
  }
  text(r, l) {
    let o = r;
    for (const u of this.ordered) o = o.split(u).join(this.replacement);
    return o !== r && this.redactions.record(l, C0), o;
  }
  semantic(r, l) {
    return this.ordered.some((o) => r.includes(o)) && we(l, "a redacted value appears in a semantic identity and cannot be safely rewritten"), r;
  }
}
function I0(a) {
  return a.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180) || "secret";
}
function K0(a) {
  if (a === null) return "null";
  if (typeof a == "string") return `string:${a}`;
  if (typeof a == "number" && Number.isFinite(a)) return `number:${String(a)}`;
  if (typeof a == "boolean") return `boolean:${String(a)}`;
}
class Y0 {
  constructor() {
    Qt(this, "identities", /* @__PURE__ */ new Map());
    Qt(this, "requirements", /* @__PURE__ */ new Map());
    Qt(this, "usedIds", /* @__PURE__ */ new Set());
  }
  ref(r) {
    const l = K0(r.rawValue), o = this.identities.get(r.identity) ?? [];
    let u = l === void 0 ? void 0 : o.find((d) => d.signature === l);
    if (!u) {
      const d = I0(r.suggestedId);
      let f = d, v = 2;
      for (; this.usedIds.has(f); )
        f = `${d}-${v}`, v += 1;
      this.usedIds.add(f), u = { signature: l, id: f }, o.push(u), this.identities.set(r.identity, o), this.requirements.set(f, {
        requirement: {
          id: f,
          reason: r.reason,
          requiredAtReplay: !0,
          ...r.nodeType === void 0 ? {} : { nodeType: r.nodeType },
          ...r.parameter === void 0 ? {} : { parameter: r.parameter }
        },
        locations: /* @__PURE__ */ new Set()
      });
    }
    return this.requirements.get(u.id).locations.add(r.location), { $gcpSecretRef: u.id };
  }
  report() {
    return [...this.requirements.values()].map(({ requirement: r, locations: l }) => ({
      ...r,
      locations: [...l].sort()
    }));
  }
}
function Yr(a, r, l) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return wi(a, r);
  if (typeof a == "string") return l.scrubber.text(a, r);
  if (Array.isArray(a)) {
    l.stack.has(a) && we(r, "cyclic values are not portable"), l.stack.add(a);
    try {
      const u = [];
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || we(`${r}/${d}`, "sparse arrays are not portable"), u.push(Yr(a[d], `${r}/${d}`, l));
      return u;
    } finally {
      l.stack.delete(a);
    }
  }
  const o = on(a, r);
  l.stack.has(o) && we(r, "cyclic values are not portable"), l.stack.add(o);
  try {
    Object.prototype.hasOwnProperty.call(o, "$gcpSecretRef") && we(r, "raw host data may not contain the reserved '$gcpSecretRef' key");
    const u = /* @__PURE__ */ Object.create(null);
    for (const [d, f] of Object.entries(o)) {
      const v = `${r}/${Wr(d)}`;
      u[d] = La(d) ? l.secrets.ref({
        identity: `credential:${r}:${d}`,
        suggestedId: `${d}-${r}`,
        rawValue: f,
        location: v,
        reason: `Credential-shaped key '${d}' was redacted recursively.`,
        parameter: d
      }) : Yr(f, v, l);
    }
    return u;
  } finally {
    l.stack.delete(o);
  }
}
function Ms(a, r, l, o, u = /* @__PURE__ */ new WeakSet()) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return wi(a, r);
  if (typeof a == "string") return l.text(a, r);
  if (Array.isArray(a)) {
    u.has(a) && we(r, "cyclic values are not portable"), u.add(a);
    try {
      const f = [];
      for (let v = 0; v < a.length; v += 1)
        Object.prototype.hasOwnProperty.call(a, v) || we(`${r}/${v}`, "sparse arrays are not portable"), f.push(Ms(a[v], `${r}/${v}`, l, o, u));
      return f;
    } finally {
      u.delete(a);
    }
  }
  const d = on(a, r);
  u.has(d) && we(r, "cyclic values are not portable"), u.add(d);
  try {
    Object.prototype.hasOwnProperty.call(d, "$gcpSecretRef") && we(r, "provenance may not contain the reserved '$gcpSecretRef' key");
    const f = /* @__PURE__ */ Object.create(null);
    for (const [v, p] of Object.entries(d)) {
      const h = `${r}/${Wr(v)}`;
      La(v) ? (f[v] = l.replacement, o.record(h, z0)) : f[v] = Ms(p, h, l, o, u);
    }
    return f;
  } finally {
    u.delete(d);
  }
}
function Ay(a) {
  return a ? new Map(a.params.map((r) => [r.name, r])) : void 0;
}
function ju(a, r, l, o, u, d, f) {
  const v = on(a, u), p = r ? d.get(r) : void 0, h = Ay(p), b = /* @__PURE__ */ Object.create(null);
  for (const [g, _] of Object.entries(v)) {
    const j = `${u}/${Wr(g)}`, R = h == null ? void 0 : h.get(g);
    let x;
    p ? R ? R.param_type === "secret" ? x = `${r}.${g} is declared as a secret parameter.` : La(g) && (x = `Credential-shaped parameter '${g}' was redacted recursively.`) : x = `Parameter '${g}' is absent from the captured '${r}' schema and was redacted fail-closed.` : x = r ? `Node type '${r}' has no captured schema; parameter '${g}' was redacted fail-closed.` : `The node type is unresolved; parameter '${g}' was redacted fail-closed.`, b[g] = x ? f.secrets.ref({
      identity: `${l}:param:${g}`,
      suggestedId: `${o}-${g}`,
      rawValue: _,
      location: j,
      reason: x,
      ...r === void 0 ? {} : { nodeType: r },
      parameter: g
    }) : Yr(_, j, f);
  }
  return b;
}
function X0(a, r, l) {
  Oi(a) || we("baseline", "expected a plain serialized graph"), Array.isArray(a.nodes) || we("baseline.nodes", "expected an array"), Array.isArray(a.edges) || we("baseline.edges", "expected an array");
  const o = a.nodes.map((f, v) => {
    const p = `/spec/baseline/nodes/${v}`, h = on(f, `baseline.nodes[${v}]`), b = l.scrubber.semantic(Tt(h.id, `${p}/id`), `${p}/id`), g = l.scrubber.semantic(Tt(h.type, `${p}/type`), `${p}/type`);
    let _ = { x: 0, y: 0 };
    if (h.position !== void 0) {
      const x = on(h.position, `${p}/position`);
      _ = {
        x: wi(x.x, `${p}/position/x`),
        y: wi(x.y, `${p}/position/y`)
      };
    }
    const j = h.data === void 0 ? {} : on(h.data, `${p}/data`), R = /* @__PURE__ */ Object.create(null);
    for (const [x, I] of Object.entries(j)) {
      const M = `${p}/data/${Wr(x)}`;
      x === "params" ? R.params = ju(
        I,
        g,
        `node:${b}`,
        b,
        M,
        r,
        l
      ) : La(x) ? R[x] = l.secrets.ref({
        identity: `node:${b}:credential:${x}`,
        suggestedId: `${b}-${x}`,
        rawValue: I,
        location: M,
        reason: `Credential-shaped key '${x}' was redacted recursively.`,
        nodeType: g,
        parameter: x
      }) : R[x] = Yr(I, M, l);
    }
    return { id: b, type: g, position: _, data: R };
  }), u = a.edges.map((f, v) => {
    const p = `/spec/baseline/edges/${v}`, h = on(f, `baseline.edges[${v}]`), b = h.type;
    b !== void 0 && b !== "data" && b !== "trigger" && we(`${p}/type`, "expected 'data' or 'trigger'");
    const g = b === "data" || b === "trigger" ? b : void 0;
    return {
      id: l.scrubber.semantic(Tt(h.id, `${p}/id`), `${p}/id`),
      source: l.scrubber.semantic(Tt(h.source, `${p}/source`), `${p}/source`),
      target: l.scrubber.semantic(Tt(h.target, `${p}/target`), `${p}/target`),
      sourceHandle: l.scrubber.semantic(
        Tt(h.sourceHandle, `${p}/sourceHandle`, !0),
        `${p}/sourceHandle`
      ),
      targetHandle: l.scrubber.semantic(
        Tt(h.targetHandle, `${p}/targetHandle`, !0),
        `${p}/targetHandle`
      ),
      ...g === void 0 ? {} : { type: g }
    };
  });
  return {
    nodes: o,
    edges: u,
    ...a.presets === void 0 ? {} : {
      presets: (Array.isArray(a.presets) || we("/spec/baseline/presets", "expected an array"), a.presets.map((f, v) => l.secrets.ref({
        identity: `preset:${v}`,
        suggestedId: `preset-${v + 1}`,
        rawValue: f,
        location: `/spec/baseline/presets/${v}`,
        reason: "Preset schema is unavailable; the entire preset was redacted fail-closed."
      })))
    },
    ...a.segmentGroups === void 0 ? {} : { segmentGroups: Yr(a.segmentGroups, "/spec/baseline/segmentGroups", l) },
    ...a.name === void 0 ? {} : { name: l.scrubber.text(Tt(a.name, "/spec/baseline/name", !0), "/spec/baseline/name") },
    ...a.description === void 0 ? {} : {
      description: l.scrubber.text(
        Tt(a.description, "/spec/baseline/description", !0),
        "/spec/baseline/description"
      )
    }
  };
}
function Zt(a, r, l, o = !1) {
  return l.semantic(Tt(a, r, o), r);
}
function k0(a, r, l, o, u, d) {
  Array.isArray(a) || we(`request.variants[${l}].operations`, "expected an array");
  const f = new Map(o), v = /* @__PURE__ */ new Map();
  return a.map((p, h) => {
    const b = `/spec/variants/${l}/operations/${h}`, g = on(p, `request.variants[${l}].operations[${h}]`);
    switch (g.op) {
      case "add_node": {
        const _ = Zt(g.node_type, `${b}/node_type`, d.scrubber), j = g.ref === void 0 ? void 0 : Zt(g.ref, `${b}/ref`, d.scrubber);
        j !== void 0 && v.set(j, _);
        const R = u.get(_), x = /* @__PURE__ */ Object.create(null);
        for (const Y of (R == null ? void 0 : R.params) ?? [])
          Y.default !== void 0 && (x[Y.name] = Y.default);
        if (g.params !== void 0)
          for (const [Y, ie] of Object.entries(on(g.params, `${b}/params`)))
            x[Y] = ie;
        const M = Object.keys(x).length > 0 ? ju(
          x,
          _,
          j === void 0 ? `variant:${r}:operation:${h}` : `variant:${r}:ref:${j}`,
          j ?? `${r}-node-${h + 1}`,
          `${b}/params`,
          u,
          d
        ) : void 0, L = g.position === void 0 ? void 0 : (() => {
          const Y = on(g.position, `${b}/position`);
          return {
            x: wi(Y.x, `${b}/position/x`),
            y: wi(Y.y, `${b}/position/y`)
          };
        })();
        return {
          op: "add_node",
          node_type: _,
          ...j === void 0 ? {} : { ref: j },
          ...M === void 0 ? {} : { params: M },
          ...L === void 0 ? {} : { position: L }
        };
      }
      case "set_params": {
        const _ = Zt(g.node_id, `${b}/node_id`, d.scrubber), j = v.get(_) ?? f.get(_), R = v.has(_) ? `variant:${r}:ref:${_}` : `node:${_}`;
        return {
          op: "set_params",
          node_id: _,
          params: ju(
            g.params,
            j,
            R,
            _,
            `${b}/params`,
            u,
            d
          )
        };
      }
      case "connect":
        return {
          op: "connect",
          source: Zt(g.source, `${b}/source`, d.scrubber),
          source_handle: Zt(
            g.source_handle,
            `${b}/source_handle`,
            d.scrubber,
            !0
          ),
          target: Zt(g.target, `${b}/target`, d.scrubber),
          target_handle: Zt(
            g.target_handle,
            `${b}/target_handle`,
            d.scrubber,
            !0
          )
        };
      case "remove_node": {
        const _ = Zt(g.node_id, `${b}/node_id`, d.scrubber);
        return v.delete(_), f.delete(_), { op: "remove_node", node_id: _ };
      }
      case "remove_edge":
        return {
          op: "remove_edge",
          source: Zt(g.source, `${b}/source`, d.scrubber),
          target: Zt(g.target, `${b}/target`, d.scrubber),
          ...g.source_handle === void 0 ? {} : {
            source_handle: Zt(
              g.source_handle,
              `${b}/source_handle`,
              d.scrubber,
              !0
            )
          },
          ...g.target_handle === void 0 ? {} : {
            target_handle: Zt(
              g.target_handle,
              `${b}/target_handle`,
              d.scrubber,
              !0
            )
          }
        };
      case "clear_graph":
        return f.clear(), v.clear(), { op: "clear_graph" };
      case "auto_layout":
        return { op: "auto_layout" };
      default:
        return we(`${b}/op`, `unsupported graph operation '${String(g.op)}'`);
    }
  });
}
function Q0(a, r) {
  var l;
  return ((l = a.id) == null ? void 0 : l.trim()) || `variant-${r + 1}`;
}
function Z0(a) {
  Array.isArray(a.request.variants) || we("request.variants", "expected an array"), Array.isArray(a.session.variants) || we("session.variants", "expected an array"), (a.request.repetitions ?? 1) !== a.session.repetitions && we("request.repetitions", "does not match the completed session"), (a.request.objective.metric !== a.session.objective.metric || a.request.objective.direction !== a.session.objective.direction) && we("request.objective", "does not match the completed session"), a.request.hypothesis.trim() !== a.session.hypothesis && we("request.hypothesis", "does not match the completed session"), a.request.variants.length !== a.session.variants.length && we("request.variants", "does not match the completed session variant count"), a.request.variants.forEach((l, o) => {
    const u = a.session.variants[o];
    Q0(l, o) !== (u == null ? void 0 : u.id) && we(`request.variants[${o}].id`, "does not match the completed session variant id"), l.label.trim() !== u.label && we(`request.variants[${o}].label`, "does not match the completed session variant label");
  });
}
function J0(a, r, l) {
  return {
    ...a,
    id: l.semantic(a.id, `/derived/variants/${r}/id`),
    label: l.text(a.label, `/derived/variants/${r}/label`),
    ...a.metricKey === void 0 ? {} : { metricKey: l.semantic(a.metricKey, `/derived/variants/${r}/metricKey`) },
    metricValues: [...a.metricValues],
    observedMetrics: Object.fromEntries(Object.entries(a.observedMetrics).map(([o, u]) => [
      l.semantic(o, `/derived/variants/${r}/observedMetrics/${Wr(o)}`),
      u
    ])),
    ...a.runs === void 0 ? {} : {
      runs: a.runs.map((o) => ({
        ...o,
        observedMetrics: { ...o.observedMetrics }
      }))
    },
    ...a.operationSummary === void 0 ? {} : {
      operationSummary: a.operationSummary.map((o, u) => l.text(o, `/derived/variants/${r}/operationSummary/${u}`))
    },
    errors: a.errors.map((o, u) => l.text(o, `/derived/variants/${r}/errors/${u}`))
  };
}
function W0(a, r) {
  const l = a.variants.map((u, d) => J0(u, d, r)), o = new Map(l.map((u) => [u.id, u]));
  return {
    ...a,
    id: r.semantic(a.id, "/id"),
    hypothesis: r.text(a.hypothesis, "/spec/hypothesis"),
    objective: {
      ...a.objective,
      metric: r.semantic(a.objective.metric, "/spec/objective/metric")
    },
    variants: l,
    ...a.search === void 0 ? {} : { search: a.search },
    ...a.winnerLabel === void 0 ? {} : {
      winnerLabel: (() => {
        const u = r.text(a.winnerLabel, "/derived/winnerLabel");
        return a.winnerId && o.has(a.winnerId) ? o.get(a.winnerId).label : u;
      })()
    },
    ...a.applyConflict === void 0 ? {} : { applyConflict: r.text(a.applyConflict, "/derived/applyConflict") },
    insights: {
      summary: a.insights.summary.map((u, d) => r.text(u, `/derived/insights/summary/${d}`)),
      warnings: a.insights.warnings.map((u, d) => r.text(u, `/derived/insights/warnings/${d}`)),
      paperIdeas: a.insights.paperIdeas.map((u, d) => ({
        title: r.text(u.title, `/derived/insights/paperIdeas/${d}/title`),
        evidence: r.text(u.evidence, `/derived/insights/paperIdeas/${d}/evidence`),
        nextStep: r.text(u.nextStep, `/derived/insights/paperIdeas/${d}/nextStep`)
      }))
    }
  };
}
function F0(a, r, l) {
  if (!(a.metricKey === void 0 && a.metricValue === void 0))
    return (typeof a.metricKey != "string" || a.metricKey.length === 0 || typeof a.metricValue != "number" || !Number.isFinite(a.metricValue)) && we("session.variants[].runs[].metric", "metricKey and finite metricValue must be provided together"), {
      // Older run records retained only the canonical identity. Calling that
      // stored identity the observed key is explicit client-side evidence, not
      // a guessed node/port identity.
      observedKey: r.semantic(a.metricKey, `${l}/observedKey`),
      canonicalKey: r.semantic(a.metricKey, `${l}/canonicalKey`),
      value: a.metricValue,
      source: a.metricSource ?? "client"
    };
}
function P0(a, r) {
  const l = [], o = /* @__PURE__ */ new Set();
  return a.variants.forEach((u, d) => {
    var f;
    (f = u.runs) == null || f.forEach((v, p) => {
      var x, I;
      const h = `${u.id}\0${v.repetition}`;
      o.has(h) && we(`session.variants[${d}].runs[${p}]`, "duplicate variant/repetition run slot"), o.add(h);
      const b = [], g = /* @__PURE__ */ new Set(), _ = F0(v, r, `/runs/${l.length}/metrics/0`);
      _ && (g.add(_.observedKey), b.push(_));
      for (const [M, L] of Object.entries(v.observedMetrics)) {
        if (!Number.isFinite(L)) continue;
        const Y = ((x = v.observedMetricIdentities) == null ? void 0 : x[M]) ?? (M === "system.runtime_ms" ? "system.runtime_ms" : void 0), ie = ((I = v.observedMetricSources) == null ? void 0 : I[M]) ?? (M === "system.runtime_ms" ? "client" : void 0);
        if (!Y || !ie) continue;
        const Z = `/runs/${l.length}/metrics/${b.length}`, ae = r.semantic(M, `${Z}/observedKey`), G = r.semantic(Y, `${Z}/canonicalKey`);
        g.has(ae) || (g.add(ae), b.push({ observedKey: ae, canonicalKey: G, value: L, source: ie }));
      }
      const j = Number.isFinite(v.observedMetrics["system.runtime_ms"]) ? v.observedMetrics["system.runtime_ms"] : v.durationMs;
      Number.isFinite(j) && !g.has("system.runtime_ms") && b.push({
        observedKey: "system.runtime_ms",
        canonicalKey: "system.runtime_ms",
        value: j,
        source: "client"
      });
      const R = `/runs/${l.length}/error/message`;
      l.push({
        runKey: `${u.id}:rep:${v.repetition}`,
        variantId: u.id,
        repetition: v.repetition,
        status: v.status,
        durationMs: v.durationMs,
        metrics: b,
        ...v.status === "failed" ? {
          error: {
            phase: "execute",
            code: "EXPERIMENT_RUN_FAILED",
            message: r.text(
              v.error ?? "No error message was recorded by the experiment runtime.",
              R
            )
          }
        } : {}
      });
    });
  }), l;
}
function e1(a, r, l) {
  const o = (a.provenanceFacts ?? []).map((u, d) => {
    const f = `/provenance/facts/${d}`;
    return {
      key: r.text(Tt(u.key, `${f}/key`), `${f}/key`),
      status: u.status,
      source: r.text(Tt(u.source, `${f}/source`), `${f}/source`),
      ...u.collectedAt === void 0 ? {} : { collectedAt: u.collectedAt },
      ...u.value === void 0 ? {} : { value: Ms(u.value, `${f}/value`, r, l) }
    };
  });
  return a.request.search !== void 0 && (o.some((u) => u.key === "optimizer.plan") && we("provenanceFacts", "'optimizer.plan' is reserved for the captured experiment request"), o.push({
    key: "optimizer.plan",
    status: "observed",
    source: "graph-experiment request",
    value: Ms(
      a.request.search,
      `/provenance/facts/${o.length}/value`,
      r,
      l
    )
  })), o.some((u) => u.key === "redaction.arbitrary_string_secret_detection") && we(
    "provenanceFacts",
    "'redaction.arbitrary_string_secret_detection' is reserved for the capture limitation"
  ), o.push({
    key: "redaction.arbitrary_string_secret_detection",
    status: "unavailable",
    source: "schema-guided capture cannot detect arbitrary secrets embedded in ordinary strings"
  }), o;
}
async function t1(a) {
  Z0(a);
  const r = L0(a.definitions), l = B0(a, r), o = new G0(), u = new q0(l, o), d = new Y0(), f = { secrets: d, scrubber: u, stack: /* @__PURE__ */ new WeakSet() }, v = X0(a.baseline, r, f), p = Ey(a.baseline.nodes), h = W0(a.session, u), b = a.request.variants.map((R, x) => ({
    id: h.variants[x].id,
    label: u.text(a.session.variants[x].label, `/spec/variants/${x}/label`),
    operations: k0(
      R.operations,
      h.variants[x].id,
      x,
      p,
      r,
      f
    )
  }));
  if (h.variants.forEach((R, x) => {
    R.label = b[x].label;
  }), h.winnerId !== void 0) {
    const R = h.variants.find((x) => x.id === h.winnerId);
    R && (h.winnerLabel = R.label);
  }
  const g = P0(a.session, u), _ = e1(a, u, o), j = {
    policy: "explicit-secret-ref-v1",
    secretRequirements: d.report(),
    textRedactions: o.report()
  };
  return D0({
    session: h,
    completedAt: a.completedAt,
    producer: {
      pluginId: a.pluginId ?? O0,
      pluginVersion: a.pluginVersion,
      codefyuiApiVersion: a.codefyuiApiVersion
    },
    provenance: { facts: _ },
    baseline: v,
    variants: b,
    runs: g,
    redactionReport: j,
    concurrency: a.request.concurrency ?? 1,
    applyBestRequested: a.request.apply_best ?? !1
  });
}
const Cs = "graph-copilot.study-index.v1", n1 = "graph-copilot.study.sha256.", Ku = "codefyui.graph-copilot.study-index", Yu = 1, xy = 10, a1 = 512 * 1024, Ny = 256, i1 = 32 * 1024, Eh = 4, jy = /^[a-f0-9]{64}$/, r1 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, l1 = "graph-copilot.study-index.v1.lock";
class it extends Error {
  constructor(l, o, u) {
    super(o);
    Qt(this, "code");
    Qt(this, "causeValue");
    this.name = "StudyStorageError", this.code = l, this.causeValue = u;
  }
}
function wy(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function $y(a, r) {
  const l = Object.keys(a);
  return l.length === r.length && l.every((o) => r.includes(o));
}
function s1(a) {
  return typeof a == "string" && r1.test(a) && !Number.isNaN(Date.parse(a)) && new Date(a).toISOString() === a;
}
function Ty(a) {
  return typeof a == "string" && a.length > 0 && a.length <= Ny && a === a.trim() && !/[\u0000-\u001f\u007f]/.test(a);
}
function o1(a) {
  if (!Ty(a))
    throw new it(
      "INVALID_ID",
      `Study id must be a non-empty, trimmed string of at most ${Ny} characters`
    );
}
function c1(a) {
  return !wy(a) || !$y(a, ["id", "digest", "createdAt", "hypothesis", "kind"]) || !Ty(a.id) || typeof a.digest != "string" || !jy.test(a.digest) || !s1(a.createdAt) || typeof a.hypothesis != "string" || !a.hypothesis.trim() || a.hypothesis.length > i1 || a.hypothesis.includes("\0") || a.kind !== "portable" ? null : Object.freeze({
    id: a.id,
    digest: a.digest,
    createdAt: a.createdAt,
    hypothesis: a.hypothesis,
    kind: "portable"
  });
}
function Gs(a, r) {
  return r.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(r.id) || a.digest.localeCompare(r.digest);
}
function u1(a, r) {
  return a.createdAt.localeCompare(r.createdAt) || a.id.localeCompare(r.id) || a.digest.localeCompare(r.digest);
}
function Dy(a) {
  return Object.freeze({
    format: Ku,
    formatVersion: Yu,
    entries: Object.freeze([...a].sort(Gs))
  });
}
const za = Dy([]);
function qs(a) {
  if (!a || a.length > a1) return za;
  let r;
  try {
    r = JSON.parse(a);
  } catch {
    return za;
  }
  if (!wy(r) || !$y(r, ["format", "formatVersion", "entries"]) || r.format !== Ku || r.formatVersion !== Yu || !Array.isArray(r.entries)) return za;
  const l = r.entries.map(c1).filter((f) => f !== null), o = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const f of l)
    o.set(f.id, (o.get(f.id) ?? 0) + 1), u.set(f.digest, (u.get(f.digest) ?? 0) + 1);
  const d = l.filter((f) => o.get(f.id) === 1 && u.get(f.digest) === 1);
  return Dy(d.sort(Gs).slice(0, xy));
}
function Xu(a) {
  return JSON.stringify({
    format: Ku,
    formatVersion: Yu,
    entries: [...a].sort(Gs)
  });
}
function Ah(a) {
  if (a === null) return za;
  const r = qs(a);
  if (a !== Xu(r.entries))
    throw new it(
      "INDEX_READ_FAILED",
      "Portable study index is malformed or non-canonical; mutation was aborted without changing storage"
    );
  return r;
}
function Ti(a) {
  try {
    return a.storage.get(Cs);
  } catch (r) {
    throw new it("INDEX_READ_FAILED", "Could not read the portable study index", r);
  }
}
function Oy(a, r) {
  try {
    return a.storage.remove(r), !0;
  } catch {
    return !1;
  }
}
const _s = /* @__PURE__ */ new Map();
function d1() {
  if (typeof navigator > "u") return null;
  const a = navigator.locks;
  return !a || typeof a.request != "function" ? null : a;
}
function My(a, r) {
  const l = d1();
  if (l === null)
    return Promise.reject(new it(
      "LOCK_UNAVAILABLE",
      "Cross-tab storage mutations require browser Web Locks; this environment remains read-only"
    ));
  const o = _s.get(a) ?? Promise.resolve();
  let u;
  const d = new Promise((f) => {
    u = f;
  });
  return _s.set(a, d), o.catch(() => {
  }).then(() => l.request(a, { mode: "exclusive" }, r)).finally(() => {
    u(), _s.get(a) === d && _s.delete(a);
  });
}
function f1(a) {
  return My(l1, a);
}
function m1(a, r, l) {
  if (Ti(a) !== r) return !1;
  try {
    a.storage.set(Cs, l);
  } catch (o) {
    let u;
    try {
      u = a.storage.get(Cs);
    } catch {
      u = void 0;
    }
    if (u === l) return !0;
    throw new it(
      "INDEX_WRITE_FAILED",
      u === r ? "Portable study index write failed before changing the index" : "Portable study index write failed and the resulting index was left untouched to avoid overwriting a concurrent update",
      o
    );
  }
  return Ti(a) === l;
}
function p1(a, r) {
  try {
    const l = Ti(a), o = qs(l);
    return o.entries.some((u) => u.digest === r) ? !0 : l !== null && l !== Xu(o.entries);
  } catch {
    return !0;
  }
}
function xh(a, r) {
  return p1(a, r) ? !0 : Oy(a, ku(r));
}
function ku(a) {
  if (!jy.test(a))
    throw new it("BUNDLE_TAMPERED", "Study digest is not a lowercase SHA-256 value");
  return `${n1}${a}`;
}
async function h1(a) {
  return Iu(a);
}
function y1(a) {
  try {
    return qs(a.storage.get(Cs));
  } catch {
    return za;
  }
}
async function Cy(a, r) {
  const l = await qu(r), o = await Iu(l), u = Object.freeze({
    id: o.payload.id,
    digest: o.integrity.contentSha256,
    createdAt: o.payload.createdAt,
    hypothesis: o.payload.spec.hypothesis,
    kind: "portable"
  });
  return f1(async () => {
    const d = Ti(a), v = Ah(d).entries.find((g) => g.id === u.id);
    if (v && v.digest !== u.digest)
      throw new it(
        "ID_CONFLICT",
        `Study '${u.id}' already exists with different content; fork it to a new id before saving`
      );
    const p = ku(u.digest);
    let h;
    try {
      h = a.storage.get(p);
    } catch (g) {
      throw new it("BUNDLE_READ_FAILED", `Could not inspect study blob ${u.digest}`, g);
    }
    if (h !== null && h !== l)
      throw new it(
        "BUNDLE_KEY_CONFLICT",
        `Content-addressed study blob ${u.digest} already contains different bytes`
      );
    if (v && h === l)
      return Object.freeze({
        status: "unchanged",
        entry: v,
        cleanupFailures: Object.freeze([])
      });
    const b = h === null;
    if (b) {
      try {
        a.storage.set(p, l);
      } catch (g) {
        let _;
        try {
          _ = a.storage.get(p);
        } catch {
          _ = void 0;
        }
        if (_ === l)
          h = _;
        else
          throw _ !== void 0 && Oy(a, p), new it(
            "BUNDLE_WRITE_FAILED",
            `Could not store portable study blob ${u.digest}`,
            g
          );
      }
      if (h !== null && h !== l)
        throw new it(
          "BUNDLE_KEY_CONFLICT",
          `Content-addressed study blob ${u.digest} changed during the write`
        );
    }
    try {
      for (let g = 0; g < Eh; g += 1) {
        const _ = Ti(a), j = Ah(_), R = j.entries.find((Z) => Z.id === u.id);
        if (R) {
          if (R.digest !== u.digest)
            throw new it(
              "ID_CONFLICT",
              `Study '${u.id}' already exists with different content; fork it to a new id before saving`
            );
          return Object.freeze({
            status: b ? "saved" : "unchanged",
            entry: R,
            cleanupFailures: Object.freeze([])
          });
        }
        const x = [...j.entries, u], I = [...j.entries].sort(u1).slice(0, Math.max(0, x.length - xy)), M = new Set(I.map((Z) => Z.digest)), L = x.filter((Z) => !M.has(Z.digest)).sort(Gs), Y = Xu(L);
        if (!m1(a, _, Y)) continue;
        const ie = [];
        for (const Z of I)
          xh(a, Z.digest) || ie.push(Z.digest);
        return Object.freeze({
          status: "saved",
          entry: u,
          cleanupFailures: Object.freeze(ie)
        });
      }
      throw new it(
        "INDEX_WRITE_FAILED",
        `Portable study index changed during ${Eh} consecutive commit attempts`
      );
    } catch (g) {
      throw b && xh(a, u.digest), g;
    }
  });
}
async function Nh(a, r) {
  o1(r);
  const o = qs(Ti(a)).entries.find((f) => f.id === r);
  if (!o)
    throw new it("STUDY_NOT_FOUND", `Portable study '${r}' is not indexed`);
  const u = ku(o.digest);
  let d;
  try {
    d = a.storage.get(u);
  } catch (f) {
    throw new it("BUNDLE_READ_FAILED", `Could not read portable study '${r}'`, f);
  }
  if (d === null)
    throw new it("BUNDLE_MISSING", `Portable study '${r}' is indexed but its blob is missing`);
  try {
    const f = await Iu(d), v = await qu(f);
    if (f.payload.id !== o.id || f.integrity.contentSha256 !== o.digest || v !== d)
      throw new it(
        "BUNDLE_TAMPERED",
        `Portable study '${r}' does not match its content-addressed index entry`
      );
    return f;
  } catch (f) {
    if (f instanceof it) throw f;
    const v = f instanceof Pt ? ` (${f.code})` : "";
    throw new it(
      "BUNDLE_TAMPERED",
      `Portable study '${r}' failed integrity verification${v}`,
      f
    );
  }
}
const Qu = "experiment-sessions-v1", wu = "gcp:experiments-changed", jh = 8, zs = 16, g1 = 20, v1 = 600 * 1e3, b1 = "graph-copilot.experiment-sessions-v1.lock";
class Ns extends Error {
  constructor(l, o) {
    super(l.message);
    Qt(this, "observation");
    this.name = l.name, this.observation = o;
  }
}
function Xr(a) {
  return a === void 0 ? a : JSON.parse(JSON.stringify(a));
}
function S1(a) {
  const r = String(a);
  return a instanceof it && a.causeValue !== void 0 ? `${r}: ${String(a.causeValue)}` : r;
}
function kr(a) {
  const r = typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${a}-${r}`;
}
function zy(a) {
  return typeof a == "number" && Number.isFinite(a) ? a : void 0;
}
function Rs(a) {
  if (a.length !== 0)
    return a.reduce((r, l) => r + l, 0) / a.length;
}
function _1(a) {
  if (a.length < 2) return;
  const r = Rs(a);
  return Math.sqrt(a.reduce((l, o) => l + (o - r) ** 2, 0) / (a.length - 1));
}
function wh(a) {
  return JSON.stringify({
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets ?? []
  });
}
function Ry(a) {
  const r = a.nodes.filter((o) => o.type !== "note"), l = new Set(r.map((o) => o.id));
  return {
    ...a,
    nodes: r,
    edges: a.edges.filter((o) => typeof o.source == "string" && typeof o.target == "string" && l.has(o.source) && l.has(o.target))
  };
}
function E1(a) {
  return Object.fromEntries(a.params.map((r) => [r.name, Xr(r.default)]));
}
function A1(a, r) {
  if (a.param_type === "int" && (typeof r != "number" || !Number.isInteger(r)))
    return `Parameter '${a.name}' must be an integer`;
  if (a.param_type === "float" && (typeof r != "number" || Number.isNaN(r)))
    return `Parameter '${a.name}' must be a number`;
  if (a.param_type === "bool" && typeof r != "boolean")
    return `Parameter '${a.name}' must be a boolean`;
  if (a.param_type === "string" && typeof r != "string")
    return `Parameter '${a.name}' must be a string`;
  if (a.param_type === "select" && (typeof r != "string" || !a.options.includes(r)))
    return `Parameter '${a.name}' must be one of: ${a.options.join(", ")}`;
  if ((a.param_type === "int" || a.param_type === "float") && typeof r == "number") {
    if (a.min_value !== null && r < a.min_value)
      return `Parameter '${a.name}' must be >= ${a.min_value}`;
    if (a.max_value !== null && r > a.max_value)
      return `Parameter '${a.name}' must be <= ${a.max_value}`;
  }
}
function $h(a, r) {
  if (!r || typeof r != "object" || Array.isArray(r))
    return "params must be an object";
  const l = new Map(a.params.map((o) => [o.name, o]));
  for (const [o, u] of Object.entries(r)) {
    const d = l.get(o);
    if (!d)
      return `Unknown parameter '${o}' for node type '${a.node_name}'`;
    const f = A1(d, u);
    if (f) return f;
  }
}
function x1(a) {
  return a.map((r) => {
    switch (r.op) {
      case "add_node":
        return `add ${r.node_type}${r.params ? ` (${Object.keys(r.params).join(", ") || "defaults"})` : ""}`;
      case "set_params":
        return `set ${r.node_id}: ${Object.keys(r.params).join(", ") || "no parameters"}`;
      case "connect":
        return `connect ${r.source}.${r.source_handle} -> ${r.target}.${r.target_handle}`;
      case "remove_node":
        return `remove node ${r.node_id}`;
      case "remove_edge":
        return `remove edge ${r.source} -> ${r.target}`;
      case "clear_graph":
        return "clear graph";
      case "auto_layout":
        return "auto layout";
    }
  });
}
function Th(a, r, l) {
  const o = Xr(a), u = {}, d = [], f = new Map(l.map((h) => [h.node_name, h])), v = (h) => {
    const b = u[h] ?? h;
    return o.nodes.some((g) => g.id === b) ? b : void 0;
  }, p = (h, b) => d.push({ index: h, ok: !1, error: b });
  return r.forEach((h, b) => {
    var g;
    if (!h || typeof h != "object" || typeof h.op != "string") {
      p(b, "Operation must be an object with an op field");
      return;
    }
    switch (h.op) {
      case "add_node": {
        const _ = f.get(h.node_type);
        if (!_) {
          p(b, `Unknown node type '${h.node_type}'`);
          return;
        }
        if (h.params !== void 0) {
          const x = $h(_, h.params);
          if (x) {
            p(b, `add_node: ${x}`);
            return;
          }
        }
        const j = kr("candidate-node"), R = {
          id: j,
          type: h.node_type,
          position: h.position ?? {
            x: 160 + o.nodes.length % 4 * 240,
            y: 120 + Math.floor(o.nodes.length / 4) * 160
          },
          data: { params: { ...E1(_), ...h.params ?? {} } }
        };
        o.nodes.push(R), h.ref && (u[h.ref] = j), d.push({ index: b, ok: !0, node_id: j });
        return;
      }
      case "set_params": {
        const _ = v(h.node_id);
        if (!_) {
          p(b, `set_params: unknown node '${h.node_id}'`);
          return;
        }
        const j = o.nodes.find((I) => I.id === _), R = typeof j.type == "string" ? f.get(j.type) : void 0;
        if (!R) {
          p(b, `set_params: node '${h.node_id}' has no known definition`);
          return;
        }
        const x = $h(R, h.params);
        if (x) {
          p(b, `set_params: ${x}`);
          return;
        }
        j.data = {
          ...j.data ?? {},
          params: { ...((g = j.data) == null ? void 0 : g.params) ?? {}, ...Xr(h.params) }
        }, d.push({ index: b, ok: !0, node_id: _ });
        return;
      }
      case "connect": {
        const _ = v(h.source), j = v(h.target);
        if (!_ || !j) {
          p(b, `connect: unknown ${_ ? "target" : "source"} node`);
          return;
        }
        const R = h.source_handle === "trigger", x = {
          id: kr("candidate-edge"),
          source: _,
          target: j,
          sourceHandle: h.source_handle,
          targetHandle: R ? "__trigger" : h.target_handle,
          ...R ? { type: "trigger" } : {}
        };
        o.edges.push(x), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_node": {
        const _ = v(h.node_id);
        if (!_) {
          p(b, `remove_node: unknown node '${h.node_id}'`);
          return;
        }
        o.nodes = o.nodes.filter((j) => j.id !== _), o.edges = o.edges.filter((j) => j.source !== _ && j.target !== _), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_edge": {
        const _ = v(h.source), j = v(h.target);
        if (!_ || !j) {
          p(b, "remove_edge: unknown source or target node");
          return;
        }
        const R = o.edges.length;
        o.edges = o.edges.filter((x) => !(x.source === _ && x.target === j && (h.source_handle === void 0 || x.sourceHandle === h.source_handle) && (h.target_handle === void 0 || x.targetHandle === h.target_handle))), R === o.edges.length ? p(b, "remove_edge: no matching edge") : d.push({ index: b, ok: !0 });
        return;
      }
      case "clear_graph":
        o.nodes = [], o.edges = [], Object.keys(u).forEach((_) => delete u[_]), d.push({ index: b, ok: !0 });
        return;
      case "auto_layout":
        o.nodes.forEach((_, j) => {
          _.position = {
            x: 120 + j % 4 * 260,
            y: 100 + Math.floor(j / 4) * 180
          };
        }), d.push({ index: b, ok: !0 });
        return;
      default:
        p(b, `Unknown operation '${h.op ?? ""}'`);
    }
  }), { graph: o, results: d, refs: u };
}
async function N1(a, r, l) {
  try {
    const o = Ry(r), u = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: l,
      body: JSON.stringify({
        nodes: o.nodes,
        edges: o.edges,
        presets: o.presets ?? []
      })
    });
    if (!u.ok) return [`Validation request failed: HTTP ${u.status}`];
    const d = await u.json(), f = Array.isArray(d.errors) ? d.errors.map(String) : [];
    return d.valid !== !0 ? f.length > 0 ? f : ["Graph validation returned an invalid or malformed result"] : f.length === 0 ? [] : ["Graph validation returned valid=true together with errors", ...f];
  } catch (o) {
    if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
    return [`Validation request failed: ${String(o)}`];
  }
}
async function j1(a, r) {
  const l = await a.http.fetch("/api/auth/bootstrap", { signal: r });
  if (!l.ok) throw new Error(`Execution auth bootstrap failed: HTTP ${l.status}`);
  const o = await l.json();
  if (typeof o.token != "string" || !o.token)
    throw new Error("Execution auth bootstrap returned no token");
  return o.token;
}
function w1(a) {
  const r = window.location.protocol === "https:" ? "wss:" : "ws:", l = new URL(`${r}//${window.location.host}/ws/execution`);
  return l.searchParams.set("token", a), l.toString();
}
function Dh(a, r) {
  let l = a;
  const o = [.../* @__PURE__ */ new Set([r, encodeURIComponent(r)])].filter((u) => u.length > 0).sort((u, d) => d.length - u.length);
  for (const u of o) l = l.split(u).join("[REDACTED]");
  return l;
}
function $1(a, r, l, o, u, d) {
  if (!l || typeof l != "object") return;
  const f = a.nodes.find((p) => p.id === r), v = f ? a.nodes.filter((p) => p.type === f.type).length : 0;
  for (const [p, h] of Object.entries(l)) {
    if (!h || typeof h != "object") continue;
    const b = zy(h.value);
    if (b === void 0) continue;
    const g = `${r}.${p}`, _ = f != null && f.type && v === 1 ? `${f.type}.${p}` : g;
    o[g] = b, u[g] = _, d[g] = "output_summary", f != null && f.type && v === 1 && (o[_] = b, u[_] = _, d[_] = "output_summary");
  }
}
function T1(a, r, l, o, u, d) {
  if (!l || typeof l != "object") return;
  const f = a.nodes.find((p) => p.id === r), v = f ? a.nodes.filter((p) => p.type === f.type).length : 0;
  for (const [p, h] of Object.entries(l)) {
    const b = zy(h);
    if (b === void 0) continue;
    const g = `${r}.progress.${p}`, _ = f != null && f.type && v === 1 ? `${f.type}.progress.${p}` : g;
    o[g] = b, u[g] = _, d[g] = "progress", f != null && f.type && v === 1 && (o[_] = b, u[_] = _, d[_] = "progress");
  }
}
function D1(a, r, l, o = v1) {
  const u = Ry(a), d = Date.now();
  return new Promise((f, v) => {
    const p = new WebSocket(w1(r)), h = {}, b = {}, g = {};
    let _ = !1;
    const j = (I) => {
      if (_) return;
      _ = !0, clearTimeout(x), l == null || l.removeEventListener("abort", R), (p.readyState === WebSocket.OPEN || p.readyState === WebSocket.CONNECTING) && p.close();
      const M = Date.now() - d;
      h["system.runtime_ms"] = M, b["system.runtime_ms"] = "system.runtime_ms", g["system.runtime_ms"] = "client";
      const L = { metrics: h, metricIdentities: b, metricSources: g, durationMs: M };
      I ? I instanceof DOMException && I.name === "AbortError" ? v(I) : v(new Ns(I, L)) : f(L);
    }, R = () => j(new DOMException("Experiment cancelled", "AbortError")), x = setTimeout(
      () => j(new Error(`Experiment run timed out after ${Math.round(o / 1e3)}s`)),
      o
    );
    if (l == null || l.addEventListener("abort", R, { once: !0 }), l != null && l.aborted) {
      R();
      return;
    }
    p.onopen = () => {
      p.send(JSON.stringify({
        action: "execute",
        nodes: u.nodes,
        edges: u.edges,
        presets: u.presets ?? [],
        run_id: kr("gcp-experiment-run"),
        // Scalar summaries arrive on node_status regardless. Avoid retaining
        // full tensors for every candidate in CodefyUI's in-memory run store.
        record_outputs: !1,
        graph_id: kr("gcp-experiment-graph"),
        weights_persistent: !1
      }));
    }, p.onmessage = (I) => {
      let M;
      try {
        M = JSON.parse(String(I.data));
      } catch {
        return;
      }
      const L = String(M.type ?? "");
      if (L === "node_status") {
        const Y = String(M.node_id ?? "");
        $1(u, Y, M.output_summary, h, b, g), T1(u, Y, M.progress, h, b, g);
      } else L === "execution_complete" ? j() : (L === "execution_error" || L === "execution_stopped" || L === "error") && j(new Error(String(M.error ?? L)));
    }, p.onerror = () => j(new Error("Experiment execution WebSocket failed")), p.onclose = () => {
      _ || j(new Error("Experiment execution WebSocket closed before completion"));
    };
  }).catch((f) => {
    if (f instanceof DOMException && f.name === "AbortError") throw f;
    if (f instanceof Ns) {
      const p = new Error(Dh(f.message, r));
      throw p.name = f.name, new Ns(p, f.observation);
    }
    const v = f instanceof Error ? f.message : String(f);
    throw new Error(Dh(v, r));
  });
}
function $u(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function Oh(a, r, l = {}) {
  const o = Object.entries(a).filter(([, b]) => Number.isFinite(b));
  if (o.length === 0) return;
  const u = (b) => ({
    key: l[b[0]] ?? b[0],
    value: b[1],
    observedKey: b[0]
  }), d = (b) => new Set(b.map(([_]) => l[_] ?? _)).size === 1 && b.length > 0 ? u(b[0]) : void 0, f = r.metric.trim(), v = o.find(([b]) => b === f) ?? o.find(([b]) => b.toLowerCase() === f.toLowerCase());
  if (v) return u(v);
  if (f && f.toLowerCase() !== "auto") {
    const b = $u(f), g = o.filter(([_]) => {
      const j = $u(_);
      return j === b || j.endsWith(`.${b}`);
    });
    return d(g);
  }
  const p = r.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = o.filter(([b]) => p.test(b));
  return h.length > 0 ? d(h) : r.direction === "minimize" ? d(o.filter(([b]) => /(^|\.)runtime_ms$/i.test(b))) : void 0;
}
async function Mh(a, r, l) {
  const o = new Array(a.length);
  let u = 0;
  const d = Array.from({ length: Math.min(r, a.length) }, async () => {
    for (; u < a.length; ) {
      const f = u++;
      o[f] = await l(a[f], f);
    }
  });
  return await Promise.all(d), o;
}
function O1(a) {
  const r = /* @__PURE__ */ new Map();
  for (const l of a)
    for (const [o, u] of Object.entries(l.metrics))
      r.has(o) || r.set(o, []), r.get(o).push(u);
  return Object.fromEntries(
    [...r.entries()].sort(([l], [o]) => l.localeCompare(o)).slice(0, 40).map(([l, o]) => [l, Rs(o)])
  );
}
function M1(a) {
  const r = a.variants.filter((u) => u.operations.length === 0).length, l = a.variants.filter((u) => u.operations.length > 0);
  if (r !== 1 || l.length === 0) return;
  let o;
  for (const u of l) {
    if (u.operations.length !== 1) return;
    const d = u.operations[0];
    if (d.op !== "set_params") return;
    const f = Object.keys(d.params);
    if (f.length !== 1) return;
    const v = `${d.node_id}.${f[0]}`;
    if (o && o !== v) return;
    o = v;
  }
  return o;
}
function C1(a, r, l, o = []) {
  const u = [], d = [], f = [], v = M1(a);
  if (o.length > 1)
    u.push(
      `No unique winner: ${o.map((b) => b.label).join(", ")} tied at ${o[0].mean.toPrecision(6)}.`
    ), d.push("Automatic promotion was skipped because the top observed means were tied.");
  else if ((l == null ? void 0 : l.mean) !== void 0) {
    if (u.push(
      `${l.label} has the top observed mean at ${l.mean.toPrecision(6)} (${a.objective.direction} ${l.metricKey ?? a.objective.metric}).`
    ), l.confidenceInterval95 && u.push(
      `Its descriptive 95% Student-t interval is [${l.confidenceInterval95.lower.toPrecision(5)}, ${l.confidenceInterval95.upper.toPrecision(5)}].`
    ), l.baselineComparison) {
      const g = l.baselineComparison.hedgesG === void 0 ? "" : `; Hedges g=${l.baselineComparison.hedgesG.toPrecision(4)}`;
      u.push(
        `Versus baseline, the direction-adjusted mean change is ${l.baselineComparison.objectiveImprovement.toPrecision(5)}${g}.`
      );
    }
    const b = r.filter((g) => g.mean !== void 0).sort((g, _) => a.objective.direction === "maximize" ? _.mean - g.mean : g.mean - _.mean);
    if (b.length > 1) {
      const g = Math.abs(b[0].mean - b[1].mean);
      u.push(`The lead over the runner-up is ${g.toPrecision(4)}.`);
    }
    v ? f.push({
      title: `Controlled parameter study: ${v}`,
      evidence: `A one-factor pilot found the top observed mean for ${l.label} across ${a.repetitions ?? 1} repeated execution(s).`,
      nextStep: "Add an explicit seed schedule, report confidence intervals, and test on a held-out dataset."
    }) : f.push({
      title: `Replication study for ${a.objective.metric}`,
      evidence: `${l.label} has the top observed mean, but the variants are not proven to be a controlled one-factor ablation.`,
      nextStep: "Create a baseline and one-factor variants, add controlled seeds, then repeat on held-out data."
    });
  } else if (o.length === 0) {
    const b = r.some((g) => g.errors.some((_) => _.includes("cross-candidate ranking was refused")));
    d.push(b ? "Candidates exposed different objective metric identities, so no cross-candidate ranking was valid." : `No candidate exposed the requested numeric metric '${a.objective.metric}'.`);
  }
  (a.repetitions ?? 1) < 3 ? d.push("This is a pilot comparison, not paper-grade evidence; use at least 3-5 controlled independent seeds.") : d.push("Repetitions reused each candidate graph. Treat them as independent seeds only when the graph contains an explicit seed schedule."), r.some((b) => {
    var g;
    return b.confidenceInterval95 || ((g = b.baselineComparison) == null ? void 0 : g.hedgesG) !== void 0;
  }) && d.push(
    "Confidence intervals and Hedges g are descriptive screening statistics here; no hypothesis test, multiple-comparison correction, or causal claim was performed."
  );
  const p = r.filter((b) => b.status !== "completed");
  p.length > 0 && d.push(`${p.length} candidate(s) were invalid or failed during execution.`);
  const h = r.filter((b) => b.mean !== void 0 && b.stddev !== void 0 && Math.abs(b.mean) > 0 && b.stddev / Math.abs(b.mean) > 0.1);
  return h.length > 0 && (d.push(`High run-to-run variation detected for: ${h.map((b) => b.label).join(", ")}.`), f.push({
    title: "Sensitivity and stability analysis",
    evidence: "At least one candidate has a coefficient of variation above 10% in this pilot.",
    nextStep: "Increase repetitions and test whether initialization, data order, or hyperparameters explain the variance."
  })), { summary: u, warnings: d, paperIdeas: f };
}
function z1(a) {
  const { applyResult: r, appliedOperations: l, ...o } = a;
  return o;
}
function Uy(a) {
  if (!a || typeof a != "object") return;
  const r = a;
  if (typeof r.id != "string" || typeof r.createdAt != "string" || typeof r.hypothesis != "string" || !r.objective || typeof r.objective.metric != "string" || !["maximize", "minimize"].includes(r.objective.direction) || typeof r.repetitions != "number" || !Number.isInteger(r.repetitions) || !Array.isArray(r.variants))
    return;
  const l = r.variants.filter((u) => !!u && typeof u == "object" && typeof u.id == "string" && typeof u.label == "string" && ["completed", "invalid", "failed"].includes(u.status) && Array.isArray(u.metricValues) && u.metricValues.every((d) => typeof d == "number" && Number.isFinite(d)) && (u.metricKey === void 0 || typeof u.metricKey == "string") && (u.mean === void 0 || typeof u.mean == "number" && Number.isFinite(u.mean)) && (u.stddev === void 0 || typeof u.stddev == "number" && Number.isFinite(u.stddev)) && (u.confidenceInterval95 === void 0 || u.confidenceInterval95.level === 0.95 && typeof u.confidenceInterval95.lower == "number" && Number.isFinite(u.confidenceInterval95.lower) && typeof u.confidenceInterval95.upper == "number" && Number.isFinite(u.confidenceInterval95.upper)) && (u.baselineComparison === void 0 || typeof u.baselineComparison.baselineId == "string" && typeof u.baselineComparison.meanDelta == "number" && Number.isFinite(u.baselineComparison.meanDelta) && typeof u.baselineComparison.objectiveImprovement == "number" && Number.isFinite(u.baselineComparison.objectiveImprovement) && (u.baselineComparison.hedgesG === void 0 || typeof u.baselineComparison.hedgesG == "number" && Number.isFinite(u.baselineComparison.hedgesG))) && typeof u.runtimeMs == "number" && Number.isFinite(u.runtimeMs) && !!u.observedMetrics && typeof u.observedMetrics == "object" && Array.isArray(u.errors) && u.errors.every((d) => typeof d == "string") && (u.runs === void 0 || Array.isArray(u.runs) && u.runs.every((d) => !!d && typeof d == "object" && Number.isInteger(d.repetition) && d.repetition >= 1 && ["completed", "failed"].includes(d.status) && typeof d.durationMs == "number" && Number.isFinite(d.durationMs) && (d.metricKey === void 0 || typeof d.metricKey == "string") && (d.metricValue === void 0 || typeof d.metricValue == "number" && Number.isFinite(d.metricValue)) && (d.metricSource === void 0 || ["output_summary", "progress", "client"].includes(d.metricSource)) && !!d.observedMetrics && typeof d.observedMetrics == "object" && Object.values(d.observedMetrics).every((f) => typeof f == "number" && Number.isFinite(f)) && (d.observedMetricIdentities === void 0 || !!d.observedMetricIdentities && typeof d.observedMetricIdentities == "object" && Object.values(d.observedMetricIdentities).every((f) => typeof f == "string") && Object.keys(d.observedMetricIdentities).every((f) => f in d.observedMetrics)) && (d.observedMetricSources === void 0 || !!d.observedMetricSources && typeof d.observedMetricSources == "object" && Object.values(d.observedMetricSources).every((f) => ["output_summary", "progress", "client"].includes(f)) && Object.keys(d.observedMetricSources).every((f) => f in d.observedMetrics)) && (d.error === void 0 || typeof d.error == "string"))) && (u.operationSummary === void 0 || Array.isArray(u.operationSummary) && u.operationSummary.every((d) => typeof d == "string"))), o = r.insights && typeof r.insights == "object" ? r.insights : { summary: [], warnings: [], paperIdeas: [] };
  return {
    ...r,
    status: ["completed", "partial", "failed"].includes(r.status ?? "") ? r.status : "failed",
    repetitions: r.repetitions,
    objective: r.objective,
    variants: l,
    baselineVariantId: typeof r.baselineVariantId == "string" ? r.baselineVariantId : void 0,
    search: Zu(r.search) ? r.search : void 0,
    insights: {
      summary: Array.isArray(o.summary) ? o.summary.filter((u) => typeof u == "string") : [],
      warnings: Array.isArray(o.warnings) ? o.warnings.filter((u) => typeof u == "string") : [],
      paperIdeas: Array.isArray(o.paperIdeas) ? o.paperIdeas.filter((u) => !!u && typeof u == "object" && typeof u.title == "string" && typeof u.evidence == "string" && typeof u.nextStep == "string") : []
    }
  };
}
function Ly(a) {
  try {
    const r = a.storage.get(Qu);
    if (!r) return [];
    const l = JSON.parse(r);
    return Array.isArray(l) ? l.map(Uy).filter((o) => !!o) : [];
  } catch {
    return [];
  }
}
function R1(a) {
  let r;
  try {
    r = a.storage.get(Qu);
  } catch (u) {
    throw new Error(`Could not read the Experiment Lab archive before mutation: ${String(u)}`);
  }
  if (r === null) return [];
  let l;
  try {
    l = JSON.parse(r);
  } catch (u) {
    throw new Error(`Experiment Lab archive is malformed and remains read-only: ${String(u)}`);
  }
  if (!Array.isArray(l))
    throw new Error("Experiment Lab archive is malformed and remains read-only: expected an array");
  const o = l.map((u, d) => {
    const f = Uy(u);
    if (!f)
      throw new Error(`Experiment Lab archive entry ${d} is invalid and cannot be safely rewritten`);
    return f;
  });
  if (new Set(o.map((u) => u.id)).size !== o.length)
    throw new Error("Experiment Lab archive contains duplicate study ids and cannot be safely rewritten");
  if (r !== JSON.stringify(o))
    throw new Error("Experiment Lab archive is non-canonical or contains lossy legacy data and remains read-only");
  return o;
}
async function Vy(a, r, l = {}) {
  await My(b1, async () => {
    const o = R1(a);
    if (l.rejectIfExists && o.some((d) => d.id === r.id))
      throw new Error(
        `A local Experiment Lab report already uses study id '${r.id}'; import was refused to avoid overwriting local evidence.`
      );
    const u = [z1(r), ...o.filter((d) => d.id !== r.id)].slice(0, g1);
    a.storage.set(Qu, JSON.stringify(u));
  }), typeof window < "u" && window.dispatchEvent(new Event(wu));
}
function Ch(a, r, l, o, u) {
  const d = Vs(
    {
      id: `experiment-session:${l.id}`,
      name: "run_graph_experiments",
      arguments: r
    },
    JSON.stringify(l),
    a,
    [{ graph: o, definitions: u }]
  );
  return JSON.parse(d);
}
function U1(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return "operation must be an object";
  const r = a, l = (o) => typeof r[o] == "string" && r[o] !== "";
  switch (r.op) {
    case "add_node":
      return l("node_type") ? r.ref !== void 0 && typeof r.ref != "string" ? "add_node ref must be a string" : r.params !== void 0 && (!r.params || typeof r.params != "object" || Array.isArray(r.params)) ? "add_node params must be an object" : void 0 : "add_node requires node_type";
    case "set_params":
      return l("node_id") ? !r.params || typeof r.params != "object" || Array.isArray(r.params) ? "set_params params must be an object" : void 0 : "set_params requires node_id";
    case "connect":
      return l("source") && l("source_handle") && l("target") && typeof r.target_handle == "string" ? void 0 : "connect requires string source, source_handle, target, and target_handle";
    case "remove_node":
      return l("node_id") ? void 0 : "remove_node requires node_id";
    case "remove_edge":
      return !l("source") || !l("target") ? "remove_edge requires source and target" : r.source_handle !== void 0 && typeof r.source_handle != "string" ? "remove_edge source_handle must be a string" : r.target_handle !== void 0 && typeof r.target_handle != "string" ? "remove_edge target_handle must be a string" : void 0;
    case "clear_graph":
    case "auto_layout":
      return;
    default:
      return `unknown operation '${String(r.op ?? "")}'`;
  }
}
function Es(a, r) {
  const l = new Set(r);
  return Object.keys(a).every((o) => l.has(o));
}
function mu(a) {
  return typeof a == "boolean" || typeof a == "string" || typeof a == "number" && Number.isFinite(a);
}
function Zu(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = a;
  if (!Es(r, [
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
  ]) || r.schemaVersion !== 1 || !["grid", "seeded_random"].includes(String(r.strategy)) || typeof r.seedDescription != "string" || typeof r.includesBaseline != "boolean" || typeof r.baselineAssignmentExcluded != "boolean") return !1;
  for (const u of [
    "totalDomainAssignments",
    "generatedCandidateCount",
    "totalVariantCount",
    "totalExecutionCount"
  ])
    if (!Number.isInteger(r[u]) || r[u] < 0) return !1;
  if (r.strategy === "seeded_random") {
    if (r.prngVersion !== "mulberry32-v1" || !Number.isInteger(r.plannerSeed) || r.plannerSeed < 0 || r.plannerSeed > 4294967295) return !1;
  } else if (r.prngVersion !== void 0 || r.plannerSeed !== void 0)
    return !1;
  if (!Array.isArray(r.bindings) || r.bindings.length < 1 || r.bindings.length > 4)
    return !1;
  const l = [];
  for (const u of r.bindings) {
    if (!u || typeof u != "object" || Array.isArray(u)) return !1;
    const d = u;
    if (!Es(d, [
      "nodeId",
      "nodeType",
      "param",
      "paramType",
      "baselineValue",
      "domain"
    ]) || typeof d.nodeId != "string" || typeof d.nodeType != "string" || typeof d.param != "string" || !["int", "float", "bool", "select"].includes(String(d.paramType)) || !mu(d.baselineValue) || !Array.isArray(d.domain) || d.domain.length < 1 || d.domain.length > 32 || !d.domain.every(mu)) return !1;
    l.push(`${d.nodeId}\0${d.param}`);
  }
  if (new Set(l).size !== l.length || !Array.isArray(r.assignments) || r.assignments.length > 8) return !1;
  const o = [];
  for (const u of r.assignments) {
    if (!u || typeof u != "object" || Array.isArray(u)) return !1;
    const d = u;
    if (!Es(d, ["variantId", "domainIndex", "values"]) || typeof d.variantId != "string" || !Number.isInteger(d.domainIndex) || d.domainIndex < 0 || !Array.isArray(d.values) || d.values.length !== r.bindings.length) return !1;
    o.push(d.variantId);
    for (const f of d.values) {
      if (!f || typeof f != "object" || Array.isArray(f)) return !1;
      const v = f;
      if (!Es(v, ["nodeId", "param", "value"]) || typeof v.nodeId != "string" || typeof v.param != "string" || !mu(v.value)) return !1;
    }
  }
  return new Set(o).size === o.length && r.generatedCandidateCount === r.assignments.length;
}
function By(a) {
  if (!a || typeof a != "object") throw new Error("Experiment request must be an object");
  if (typeof a.hypothesis != "string" || !a.hypothesis.trim())
    throw new Error("Experiment requires a hypothesis");
  if (!a.objective || typeof a.objective != "object" || typeof a.objective.metric != "string" || !a.objective.metric.trim())
    throw new Error("Experiment requires an objective metric");
  if (!["maximize", "minimize"].includes(a.objective.direction))
    throw new Error("Experiment objective direction must be maximize or minimize");
  if (!Array.isArray(a.variants) || a.variants.length === 0)
    throw new Error("Experiment requires at least one variant");
  if (a.variants.length > jh)
    throw new Error(`Experiment supports at most ${jh} variants`);
  const r = a.repetitions ?? 1;
  if (!Number.isInteger(r) || r < 1 || r > 5)
    throw new Error("Experiment repetitions must be an integer from 1 to 5");
  if (a.variants.length * r > zs)
    throw new Error(`Experiment budget is capped at ${zs} total runs`);
  const l = a.concurrency ?? 1;
  if (!Number.isInteger(l) || l < 1 || l > 2)
    throw new Error("Experiment concurrency must be an integer from 1 to 2");
  if (a.apply_best !== void 0 && typeof a.apply_best != "boolean")
    throw new Error("Experiment apply_best must be a boolean");
  if (a.search !== void 0 && !Zu(a.search))
    throw new Error("Experiment search metadata is malformed");
  const o = a.variants.map((u, d) => {
    var f;
    if (!u || typeof u != "object") throw new Error("Every experiment variant must be an object");
    if (u.id !== void 0 && typeof u.id != "string")
      throw new Error("Experiment variant ids must be strings");
    return ((f = u.id) == null ? void 0 : f.trim()) || `variant-${d + 1}`;
  });
  if (new Set(o).size !== o.length) throw new Error("Experiment variant ids must be unique");
  for (const u of a.variants) {
    if (typeof u.label != "string" || !u.label.trim())
      throw new Error("Every experiment variant requires a label");
    if (!Array.isArray(u.operations)) throw new Error("Every experiment variant requires an operations array");
    u.operations.forEach((d, f) => {
      const v = U1(d);
      if (v) throw new Error(`Invalid operation ${f} in variant '${u.label}': ${v}`);
    });
  }
  if (a.search && (a.search.totalVariantCount !== a.variants.length || a.search.totalExecutionCount !== a.variants.length * r || a.search.assignments.some((u) => !o.includes(u.variantId))))
    throw new Error("Experiment search metadata does not match the compiled variants or run count");
  return { repetitions: r, concurrency: l };
}
function L1(a) {
  const { repetitions: r } = By(a);
  return a.variants.length * r;
}
async function V1(a, r, l, o = () => !1, u = () => {
}) {
  const { repetitions: d, concurrency: f } = By(r), v = (/* @__PURE__ */ new Date()).toISOString(), p = Xr(a.graph.getGraph()), h = wh(p), b = a.graph.getNodeDefinitions(), g = r.variants.map((U, k) => {
    var re;
    const oe = {
      id: ((re = U.id) == null ? void 0 : re.trim()) || `variant-${k + 1}`,
      label: U.label.trim(),
      operations: U.operations
    }, ge = Th(p, oe.operations, b);
    return {
      input: oe,
      graph: ge.graph,
      preparationErrors: ge.results.filter((Ne) => !Ne.ok).map((Ne) => Ne.error ?? "operation failed"),
      validationErrors: []
    };
  });
  await Mh(g, 2, async (U) => {
    U.preparationErrors.length === 0 && (U.validationErrors = await N1(a, U.graph, l));
  });
  const _ = g.filter((U) => U.preparationErrors.length === 0 && U.validationErrors.length === 0);
  let j = "";
  _.length > 0 && (j = await j1(a, l));
  const R = [];
  for (let U = 0; U < d; U += 1) {
    const k = U % 2 === 0 ? _ : [..._].reverse(), oe = await Mh(k, f, async (ge) => {
      try {
        return {
          variantId: ge.input.id,
          repetition: U + 1,
          observation: await D1(ge.graph, j, l)
        };
      } catch (re) {
        if (re instanceof DOMException && re.name === "AbortError") throw re;
        return re instanceof Ns ? {
          variantId: ge.input.id,
          repetition: U + 1,
          observation: {
            ...re.observation,
            error: String(re)
          }
        } : {
          variantId: ge.input.id,
          repetition: U + 1,
          observation: {
            metrics: {},
            metricIdentities: {},
            metricSources: {},
            durationMs: 0,
            error: String(re)
          }
        };
      }
    });
    R.push(...oe);
  }
  const x = g.map((U) => {
    var F;
    const k = R.filter((Q) => Q.variantId === U.input.id), oe = k.map((Q) => Q.observation).filter((Q) => !Q.error), ge = oe.map((Q) => Oh(Q.metrics, r.objective, Q.metricIdentities)).filter((Q) => !!Q), re = [
      ...U.preparationErrors,
      ...U.validationErrors,
      ...k.flatMap((Q) => Q.observation.error ? [Q.observation.error] : [])
    ], Ne = new Set(ge.map((Q) => Q.key)), D = oe.length === d && ge.length === d && Ne.size === 1;
    U.preparationErrors.length === 0 && U.validationErrors.length === 0 && oe.length !== d && re.push(`Only ${oe.length}/${d} repetitions completed successfully.`), oe.length > 0 && ge.length !== oe.length && re.push(
      `Objective metric "${r.objective.metric}" was missing in ${oe.length - ge.length}/${oe.length} successful repetitions.`
    ), Ne.size > 1 && re.push(`Objective metric resolved to inconsistent keys across repetitions: ${[...Ne].join(", ")}.`);
    const X = ge.map((Q) => Q.value), O = D ? Lu(X) : void 0;
    return {
      id: U.input.id,
      label: U.input.label,
      status: U.preparationErrors.length > 0 || U.validationErrors.length > 0 ? "invalid" : D ? "completed" : "failed",
      metricKey: Ne.size === 1 ? (F = ge[0]) == null ? void 0 : F.key : void 0,
      metricValues: X,
      mean: D ? Rs(X) : void 0,
      stddev: D ? _1(X) : void 0,
      confidenceInterval95: O ? {
        level: 0.95,
        lower: O.lower,
        upper: O.upper
      } : void 0,
      runtimeMs: Rs(k.map((Q) => Q.observation.durationMs)) ?? 0,
      observedMetrics: O1(k.map((Q) => Q.observation)),
      runs: k.map(({ repetition: Q, observation: E }) => {
        const V = Oh(
          E.metrics,
          r.objective,
          E.metricIdentities
        );
        return {
          repetition: Q,
          status: E.error ? "failed" : "completed",
          durationMs: E.durationMs,
          metricKey: V == null ? void 0 : V.key,
          metricValue: V == null ? void 0 : V.value,
          metricSource: V ? E.metricSources[V.observedKey] : void 0,
          observedMetrics: E.metrics,
          observedMetricIdentities: E.metricIdentities,
          observedMetricSources: E.metricSources,
          ...E.error ? { error: E.error } : {}
        };
      }),
      operationSummary: x1(U.input.operations),
      errors: re
    };
  }), I = g.filter((U) => U.input.operations.length === 0);
  if (I.length === 1) {
    const U = x.find((k) => k.id === I[0].input.id);
    if ((U == null ? void 0 : U.status) === "completed")
      for (const k of x) {
        if (k.id === U.id || k.status !== "completed") continue;
        const oe = Hr(
          k.metricValues,
          U.metricValues,
          r.objective.direction
        );
        oe && (k.baselineComparison = {
          baselineId: U.id,
          meanDelta: oe.rawDelta,
          objectiveImprovement: oe.improvement,
          hedgesG: oe.hedgesG
        });
      }
  }
  if (new Set(
    x.filter((U) => U.status === "completed" && U.metricKey).map((U) => $u(U.metricKey))
  ).size > 1) {
    const U = x.filter((k) => k.status === "completed" && k.metricKey).map((k) => `${k.label}: ${k.metricKey}`).join(", ");
    for (const k of x)
      k.status === "completed" && (k.status = "failed", k.metricValues = [], k.mean = void 0, k.stddev = void 0, k.confidenceInterval95 = void 0, k.baselineComparison = void 0, k.errors.push(`Candidates resolved different objective metrics (${U}); cross-candidate ranking was refused.`));
  }
  const L = x.filter((U) => U.status === "completed" && U.mean !== void 0).sort((U, k) => (r.objective.direction === "maximize" ? k.mean - U.mean : U.mean - k.mean) || U.id.localeCompare(k.id)), Y = L[0], ie = Y ? Math.max(1, Math.abs(Y.mean)) * Number.EPSILON * 8 : 0, Z = Y ? L.filter((U) => Math.abs(U.mean - Y.mean) <= ie) : [], ae = Z.length === 1 ? Y : void 0, G = {
    id: kr("experiment"),
    createdAt: v,
    hypothesis: r.hypothesis.trim(),
    objective: r.objective,
    repetitions: d,
    status: L.length === 0 ? "failed" : x.every((U) => U.status === "completed") ? "completed" : "partial",
    variants: x,
    baselineVariantId: I.length === 1 ? I[0].input.id : void 0,
    search: r.search ? Xr(r.search) : void 0,
    winnerId: ae == null ? void 0 : ae.id,
    winnerLabel: ae == null ? void 0 : ae.label,
    insights: C1({ ...r, repetitions: d }, x, ae, Z)
  };
  if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  if (r.apply_best && ae) {
    const U = g.find((ge) => ge.input.id === ae.id).input, k = o(), oe = wh(a.graph.getGraph()) !== h;
    if (u(), k || oe)
      G.applyConflict = "The live graph changed while experiments were running; winner was not applied.";
    else if (U.operations.some((ge) => ge.op !== "set_params"))
      G.applyConflict = "Automatic promotion supports parameter-only winners; this structural winner remains a proposal for review.";
    else if (U.operations.length > 0) {
      if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
      const ge = Th(p, U.operations, b);
      if (ge.results.some((re) => !re.ok))
        G.applyConflict = `Winner promotion failed parameter preflight: ${ge.results.filter((re) => !re.ok).map((re) => re.error).join("; ")}`;
      else {
        try {
          G.applyResult = a.graph.applyOperations(U.operations), G.appliedOperations = U.operations, G.applyResult.results.every((re) => re.ok) ? G.appliedVariantId = ae.id : G.applyConflict = "Winner promotion was only partially applied; the canvas may contain a partial parameter update. Inspect operation errors.";
        } catch (re) {
          G.applyConflict = `Winner promotion threw unexpectedly; the canvas may contain a partial parameter update: ${String(re)}`;
        }
        G.applyConflict && a.ui.toast(G.applyConflict, "error");
      }
    } else
      G.appliedVariantId = ae.id;
  }
  if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  const se = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const U = await t1({
      session: G,
      request: r,
      baseline: p,
      definitions: b,
      pluginId: a.pluginId || Xb,
      pluginVersion: kb,
      codefyuiApiVersion: a.apiVersion,
      completedAt: se,
      provenanceFacts: [
        {
          key: "codefyui.api_version",
          status: "observed",
          source: "CodefyUIPluginAPI",
          collectedAt: se,
          value: a.apiVersion
        },
        {
          key: "experiment.coordinator",
          status: "observed",
          source: "Graph Copilot browser runtime",
          collectedAt: se,
          value: "browser-local"
        },
        {
          key: "experiment.runner_seed_schedule",
          status: "unavailable",
          source: "Graph Copilot does not assign graph-node RNG seeds"
        }
      ]
    }), k = await Cy(a, U);
    if (k.cleanupFailures.length > 0) {
      const oe = `Portable study was saved, but ${k.cleanupFailures.length} unreferenced old blob(s) could not be cleaned up.`;
      G.insights.warnings.push(oe);
      try {
        a.ui.toast(oe, "warning");
      } catch {
      }
    }
  } catch (U) {
    const k = `Experiment completed, but its portable study bundle could not be captured or saved: ${S1(U)}`;
    G.insights.warnings.push(k);
    try {
      a.ui.toast(k, "warning");
    } catch {
    }
  }
  let ce = Ch(a, r, G, p, b);
  try {
    await Vy(a, ce);
  } catch (U) {
    const k = `Experiment completed, but its local history could not be saved: ${String(U)}`;
    G.insights.warnings.push(k);
    try {
      a.ui.toast(k, "warning");
    } catch {
    }
    ce = Ch(a, r, G, p, b);
  }
  return ce;
}
async function B1(a, r, l) {
  let o = !1, u, d = !0;
  const f = () => {
    d && (d = !1, u == null || u());
  };
  try {
    u = a.graph.onGraphChanged(() => {
      d && (o = !0);
    });
  } catch {
    o = !0;
  }
  try {
    return await V1(
      a,
      r,
      l,
      () => o,
      f
    );
  } finally {
    f();
  }
}
const Tu = 1, H1 = "mulberry32-v1", zh = 4, Rh = 32, pu = 8, Uh = 16, G1 = /* @__PURE__ */ new Set([
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
  "apply_best"
]), q1 = /* @__PURE__ */ new Set(["metric", "direction"]), I1 = /* @__PURE__ */ new Set(["node_id", "param", "values"]), K1 = /* @__PURE__ */ new Set(["int", "float", "bool", "select"]), Y1 = "Planner-only seed: it deterministically selects parameter assignments and does not seed graph nodes or make graph executions reproducible.";
function Du(a, r) {
  if (!a || typeof a != "object" || Array.isArray(a))
    throw new Error(`${r} must be an object`);
  return a;
}
function Ou(a, r, l) {
  const o = Object.keys(a).filter((u) => !r.has(u));
  if (o.length > 0)
    throw new Error(`${l} contains unknown field(s): ${o.join(", ")}`);
}
function Us(a, r) {
  if (typeof a != "string" || !a.trim())
    throw new Error(`${r} must be a non-empty string`);
  return a.trim();
}
function Lh(a, r, l) {
  if (a === void 0) return r;
  if (typeof a != "boolean") throw new Error(`${l} must be a boolean`);
  return a;
}
function Mu(a, r, l, o, u) {
  const d = a === void 0 ? r : a;
  if (!Number.isInteger(d) || d < l || d > o)
    throw new Error(`${u} must be an integer from ${l} to ${o}`);
  return d;
}
function Qr(a) {
  return typeof a == "number" ? `number:${Object.is(a, -0) ? "0" : String(a)}` : `${typeof a}:${JSON.stringify(a)}`;
}
function Vh(a, r, l) {
  switch (a.param_type) {
    case "int":
      if (typeof r != "number" || !Number.isFinite(r) || !Number.isInteger(r))
        throw new Error(`${l} must be a finite integer`);
      break;
    case "float":
      if (typeof r != "number" || !Number.isFinite(r))
        throw new Error(`${l} must be a finite number`);
      break;
    case "bool":
      if (typeof r != "boolean") throw new Error(`${l} must be a boolean`);
      break;
    case "select":
      if (typeof r != "string") throw new Error(`${l} must be a string select option`);
      if (!Array.isArray(a.options) || !a.options.includes(r))
        throw new Error(`${l} must be one of: ${(a.options ?? []).join(", ")}`);
      break;
    default:
      throw new Error(`${l} uses unsupported parameter type '${String(a.param_type)}'`);
  }
  if (typeof r == "number") {
    if (typeof a.min_value == "number" && r < a.min_value)
      throw new Error(`${l} must be >= ${a.min_value}`);
    if (typeof a.max_value == "number" && r > a.max_value)
      throw new Error(`${l} must be <= ${a.max_value}`);
  }
  return r;
}
function X1(a, r, l) {
  const o = a.nodes.filter((d) => d.id === r);
  if (o.length === 0) throw new Error(`${l} references missing node '${r}'`);
  if (o.length > 1) throw new Error(`${l} references ambiguous duplicate node id '${r}'`);
  const u = o[0];
  if (!u.type || u.type === "note")
    throw new Error(`${l} node '${r}' has no optimizable node type`);
  return u;
}
function k1(a, r, l) {
  const o = a.filter((u) => u.node_name === r);
  if (o.length === 0) throw new Error(`${l} has no definition for node type '${r}'`);
  if (o.length > 1) throw new Error(`${l} found duplicate definitions for node type '${r}'`);
  return o[0];
}
function Q1(a, r, l, o) {
  var L;
  const u = `optimizer.bindings[${r}]`, d = Du(a, u);
  Ou(d, I1, u);
  const f = Us(d.node_id, `${u}.node_id`), v = Us(d.param, `${u}.param`), p = X1(l, f, u), h = k1(o, p.type, u), b = h.params.filter((Y) => Y.name === v);
  if (b.length === 0)
    throw new Error(`${u} references unknown parameter '${v}' on '${p.type}'`);
  if (b.length > 1)
    throw new Error(`${u} references ambiguous duplicate parameter '${v}' on '${p.type}'`);
  const g = b[0];
  if (!K1.has(g.param_type))
    throw new Error(
      `${u} parameter '${f}.${v}' has unsupported type '${String(g.param_type)}'; only int, float, bool, and select are allowed`
    );
  if (fa(v))
    throw new Error(
      `${u} parameter '${f}.${v}' has a credential-shaped name and cannot be optimized; this is refused even when the node schema declares an otherwise supported parameter type`
    );
  if (!Array.isArray(d.values) || d.values.length === 0)
    throw new Error(`${u}.values must be a non-empty explicit domain`);
  if (d.values.length > Rh)
    throw new Error(`${u}.values supports at most ${Rh} values`);
  const _ = d.values.map((Y, ie) => Vh(g, Y, `${u}.values[${ie}]`)), j = _.map(Qr);
  if (new Set(j).size !== j.length)
    throw new Error(`${u}.values must contain unique scalar values`);
  const R = (L = p.data) == null ? void 0 : L.params, I = !!R && Object.prototype.hasOwnProperty.call(R, v) ? R[v] : g.default, M = Vh(g, I, `${u} baseline value`);
  return {
    node: p,
    definition: h,
    parameter: g,
    nodeId: f,
    paramName: v,
    baselineValue: M,
    domain: _
  };
}
function Z1(a, r) {
  const l = new Array(a.length);
  let o = r;
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const d = a[u].domain;
    l[u] = d[o % d.length], o = Math.floor(o / d.length);
  }
  return l;
}
function J1(a) {
  let r = 0;
  for (const l of a) {
    const o = Qr(l.baselineValue), u = l.domain.findIndex((d) => Qr(d) === o);
    if (u < 0) return;
    r = r * l.domain.length + u;
  }
  return r;
}
function W1(a) {
  let r = a >>> 0;
  return () => {
    r = r + 1831565813 >>> 0;
    let l = r;
    return l = Math.imul(l ^ l >>> 15, l | 1) >>> 0, l ^= l + Math.imul(l ^ l >>> 7, l | 61), (l ^ l >>> 14) >>> 0;
  };
}
function F1(a, r, l) {
  const o = W1(l), u = /* @__PURE__ */ new Map(), d = [];
  for (let f = 0; f < r; f += 1) {
    const v = a - f, p = o() % v, h = u.get(p) ?? p, b = v - 1, g = u.get(b) ?? b;
    p !== b ? u.set(p, g) : u.delete(p), u.delete(b), d.push(h);
  }
  return d;
}
function P1(a, r) {
  const l = [], o = /* @__PURE__ */ new Map();
  return a.forEach((u, d) => {
    o.has(u.nodeId) || (o.set(u.nodeId, []), l.push(u.nodeId)), o.get(u.nodeId).push([u.paramName, r[d]]);
  }), l.map((u) => ({
    op: "set_params",
    node_id: u,
    params: Object.fromEntries(o.get(u))
  }));
}
function eS(a, r) {
  return r.every((l, o) => Qr(l) === Qr(a[o].baselineValue));
}
function tS(a) {
  const r = Du(a, "optimizer");
  if (Ou(r, G1, "optimizer"), r.version !== void 0 && r.version !== Tu)
    throw new Error(`optimizer.version must be ${Tu}`);
  if (r.strategy !== "grid" && r.strategy !== "seeded_random")
    throw new Error("optimizer.strategy must be grid or seeded_random");
  const l = Us(r.hypothesis, "optimizer.hypothesis"), o = Du(r.objective, "optimizer.objective");
  Ou(o, q1, "optimizer.objective");
  const u = Us(o.metric, "optimizer.objective.metric");
  if (o.direction !== "maximize" && o.direction !== "minimize")
    throw new Error("optimizer.objective.direction must be maximize or minimize");
  return {
    raw: r,
    strategy: r.strategy,
    hypothesis: l,
    objective: { metric: u, direction: o.direction },
    repetitions: Mu(r.repetitions, 1, 1, 5, "optimizer.repetitions"),
    concurrency: Mu(r.concurrency, 1, 1, 2, "optimizer.concurrency"),
    includeBaseline: Lh(r.include_baseline, !0, "optimizer.include_baseline"),
    applyBest: Lh(r.apply_best, !1, "optimizer.apply_best")
  };
}
function nS(a, r, l) {
  const o = tS(a);
  if (!Array.isArray(o.raw.bindings) || o.raw.bindings.length < 1 || o.raw.bindings.length > zh)
    throw new Error(`optimizer.bindings must contain 1 to ${zh} bindings`);
  if (!r || !Array.isArray(r.nodes) || !Array.isArray(r.edges))
    throw new Error("current graph must contain nodes and edges arrays");
  if (!Array.isArray(l)) throw new Error("node definitions must be an array");
  const u = o.raw.bindings.map((Z, ae) => Q1(Z, ae, r, l)), d = u.map((Z) => `${Z.nodeId}\0${Z.paramName}`);
  if (new Set(d).size !== d.length)
    throw new Error("optimizer.bindings must not repeat the same node parameter");
  const f = u.reduce((Z, ae) => Z * ae.domain.length, 1), v = J1(u), p = pu - (o.includeBaseline ? 1 : 0);
  let h, b;
  const g = f - (v === void 0 ? 0 : 1);
  if (o.strategy === "grid") {
    if (o.raw.candidate_count !== void 0)
      throw new Error("optimizer.candidate_count is only allowed for seeded_random");
    if (o.raw.seed !== void 0)
      throw new Error("optimizer.seed is only allowed for seeded_random");
    if (g > p)
      throw new Error(
        `Grid Cartesian product has ${g} changed assignments but only ${p} candidate slots are available; narrow the domains instead of truncating the grid`
      );
    h = Array.from({ length: f }, (Z, ae) => ae).filter((Z) => Z !== v);
  } else {
    const Z = Mu(
      o.raw.candidate_count,
      Number.NaN,
      1,
      p,
      "optimizer.candidate_count"
    );
    if (!Number.isInteger(o.raw.seed) || o.raw.seed < 0 || o.raw.seed > 4294967295)
      throw new Error("optimizer.seed is required for seeded_random and must be a uint32 integer");
    if (b = o.raw.seed, Z > g)
      throw new Error(
        `seeded_random requested ${Z} unique changed assignments, but only ${g} are available`
      );
    h = F1(g, Z, b).map((G) => v !== void 0 && G >= v ? G + 1 : G);
  }
  const _ = h.map((Z) => ({
    domainIndex: Z,
    assignment: Z1(u, Z)
  })).filter(({ assignment: Z }) => !eS(u, Z));
  if (_.length === 0)
    throw new Error("optimizer search space contains no assignment different from the current graph baseline");
  const j = o.includeBaseline ? [{ id: "baseline", label: "Baseline", operations: [] }] : [], R = o.strategy === "grid" ? "grid" : "random", x = _.map(({ assignment: Z }, ae) => ({
    id: `optimizer-${R}-${String(ae + 1).padStart(3, "0")}`,
    label: `${o.strategy === "grid" ? "Grid" : "Random"} ${ae + 1}: ${u.map((G, se) => `${G.nodeId}.${G.paramName}=${JSON.stringify(Z[se])}`).join(", ")}`,
    operations: P1(u, Z)
  })), I = [...j, ...x];
  if (I.length > pu)
    throw new Error(`optimizer compiled ${I.length} variants; maximum is ${pu}`);
  const M = I.length * o.repetitions;
  if (M > Uh)
    throw new Error(
      `optimizer compiled ${I.length} variants x ${o.repetitions} repetitions = ${M} executions; maximum is ${Uh}`
    );
  const L = _.map(
    ({ domainIndex: Z, assignment: ae }, G) => ({
      variantId: x[G].id,
      domainIndex: Z,
      values: u.map((se, ce) => ({
        nodeId: se.nodeId,
        param: se.paramName,
        value: ae[ce]
      }))
    })
  ), Y = {
    schemaVersion: Tu,
    strategy: o.strategy,
    prngVersion: o.strategy === "seeded_random" ? H1 : void 0,
    plannerSeed: b,
    seedDescription: Y1,
    includesBaseline: o.includeBaseline,
    totalDomainAssignments: f,
    baselineAssignmentExcluded: v !== void 0,
    generatedCandidateCount: x.length,
    totalVariantCount: I.length,
    totalExecutionCount: M,
    bindings: u.map((Z) => ({
      nodeId: Z.nodeId,
      nodeType: Z.node.type,
      param: Z.paramName,
      paramType: Z.parameter.param_type,
      baselineValue: Z.baselineValue,
      domain: [...Z.domain]
    })),
    assignments: L
  };
  return {
    request: {
      hypothesis: o.hypothesis,
      objective: o.objective,
      variants: I,
      repetitions: o.repetitions,
      concurrency: o.concurrency,
      apply_best: o.applyBest,
      search: Y
    },
    metadata: Y
  };
}
const Bh = 16, Hh = 2, aS = [
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
        apply_best: { type: "boolean" }
      },
      required: ["strategy", "hypothesis", "objective", "bindings"]
    }
  }
];
function Ls(a) {
  const r = a.graph.getGraph();
  return JSON.stringify({ nodes: r.nodes, edges: r.edges, presets: r.presets ?? [] });
}
function iS(a) {
  if (typeof a == "string") return JSON.stringify(a);
  const r = JSON.stringify(a);
  return r === void 0 ? String(a) : r.length > 180 ? `${r.slice(0, 177)}...` : r;
}
function Gh(a) {
  if (!a) return "";
  const r = Object.entries(a).map(([l, o]) => `${l}=${iS(o)}`);
  return r.length > 0 ? r.join(", ") : "no parameters";
}
function rS(a) {
  switch (a.op) {
    case "add_node": {
      const r = Gh(a.params);
      return `add ${a.node_type}${r ? ` with ${r}` : ""}`;
    }
    case "set_params":
      return `set ${a.node_id}: ${Gh(a.params)}`;
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
function hu(a, r) {
  const l = a.role === "user" && a.attachments && a.attachments.length > 0 ? iy(a.content, a.attachments, r) : a.content, o = { role: a.role, content: l };
  return a.tool_calls && (o.tool_calls = a.tool_calls), a.tool_call_id && (o.tool_call_id = a.tool_call_id), o;
}
function qh(a, r) {
  const l = /* @__PURE__ */ new Map();
  a.forEach((u, d) => {
    const f = u.op, v = r[d], p = v ? v.ok : !1;
    l.has(f) || l.set(f, { ok: 0, fail: 0 });
    const h = l.get(f);
    p ? h.ok++ : h.fail++;
  });
  const o = [];
  for (const [u, d] of l) {
    const f = d.ok + d.fail;
    d.fail === 0 ? o.push(`${u} x${f} ok`) : d.ok === 0 ? o.push(`${u} x${f} FAILED`) : o.push(`${u} x${f} (${d.ok} ok, ${d.fail} FAILED)`);
  }
  return o.join(", ");
}
function lS(a, r, l, o, u) {
  const f = { role: "system", content: Yb(
    a.graph.getNodeDefinitions(),
    a.graph.getGraph()
  ) }, v = r.slice(-20), p = r.flatMap((_) => _.tool_calls ?? []), h = new Map(p.map((_) => [_.id, _])), b = v.map((_) => {
    if (_.role === "user") return hu(_, u);
    if (_.role === "tool") {
      const j = _.tool_call_id ? h.get(_.tool_call_id) : void 0, R = Vs(
        j ?? { id: _.tool_call_id ?? "legacy", name: "legacy_tool", arguments: {} },
        _.content,
        a
      );
      return hu({ ..._, content: R }, u);
    }
    return hu({
      ..._,
      content: Eu(_.content, p, a),
      ..._.tool_calls ? { tool_calls: oy(_.tool_calls, a) } : {}
    }, u);
  }), g = {
    role: "user",
    content: iy(l, o, u)
  };
  return [f, ...b, g];
}
function Hy(a, r, l = aS, o = 8192) {
  const u = a.provider, d = a.models[u] ?? "", f = {
    provider: u,
    model: d,
    messages: r,
    tools: l,
    max_tokens: o
  };
  if (u !== "openai-codex") {
    const v = u === "openai" ? a.apiKeys.openai : u === "openrouter" ? a.apiKeys.openrouter : u === "anthropic" ? a.apiKeys.anthropic : u === "custom" ? a.apiKeys.custom : void 0;
    v && (f.api_key = v);
  }
  return u === "custom" && a.customBaseUrl && (f.base_url = a.customBaseUrl), f;
}
async function Gy(a) {
  const r = (f) => {
    const v = Vs(
      { name: "validate_graph", arguments: {} },
      JSON.stringify(f),
      a
    );
    try {
      const p = JSON.parse(v);
      let h = p.valid === !0;
      const b = Array.isArray(p.errors) ? p.errors.filter((g) => typeof g == "string") : [];
      return h && b.length > 0 && (h = !1), !h && b.length === 0 && b.push("Graph validation failed without diagnostic details."), { valid: h, errors: b };
    } catch {
      return { valid: !1, errors: ["Graph validation returned an unreadable result."] };
    }
  }, l = a.graph.getGraph(), o = l.nodes.filter((f) => f.type !== "note"), u = new Set(o.map((f) => f.id)), d = l.edges.filter((f) => typeof f.source == "string" && typeof f.target == "string" && u.has(f.source) && u.has(f.target));
  try {
    const f = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: o, edges: d, presets: l.presets ?? [] })
    });
    if (!f.ok)
      return r({ valid: !1, errors: [`validate request failed: HTTP ${f.status}`] });
    const v = await f.json();
    return r({
      valid: v.valid === !0,
      errors: Array.isArray(v.errors) ? v.errors.filter((p) => typeof p == "string") : []
    });
  } catch (f) {
    return r({ valid: !1, errors: [`validate request error: ${String(f)}`] });
  }
}
async function sS(a) {
  let r = !1, l;
  try {
    l = a.graph.onGraphChanged(() => {
      r = !0;
    });
  } catch {
    return {
      valid: !1,
      errors: ["Graph validation could not safely monitor the active graph for concurrent changes."]
    };
  }
  let o;
  try {
    o = Ls(a);
  } catch {
    try {
      l();
    } catch {
    }
    return {
      valid: !1,
      errors: ["Graph validation could not capture the active graph revision."]
    };
  }
  const u = await Gy(a);
  let d;
  try {
    d = Ls(a);
  } catch {
  }
  const f = r || d === void 0 || d !== o;
  try {
    l();
  } catch {
  }
  return f ? {
    valid: !1,
    errors: [
      "The active graph changed while validation was in flight. Re-read the current graph and validate that revision before finishing."
    ]
  } : u;
}
async function oS(a, r, l, o, u) {
  const f = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + o },
    { role: "user", content: l }
  ];
  let v = "";
  try {
    await ry(
      a,
      Hy(r, f, [], 1024),
      {
        onText: (p) => {
          v += p;
        },
        onDone: (p) => {
          !v && p.message.content && (v = p.message.content);
        },
        onError: (p) => {
          v += `
(research error: ${p})`;
        }
      },
      u
    );
  } catch (p) {
    return `(research failed: ${String(p)})`;
  }
  return v.trim() || "(no answer)";
}
async function qy(a, r, l, o, u, d, f, v = !1) {
  const { name: p, arguments: h } = a;
  if (p === "apply_graph_operations") {
    const b = h.operations;
    if (!Array.isArray(b))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let g;
    try {
      g = r.graph.applyOperations(b);
    } catch (j) {
      return JSON.stringify({ error: `applyOperations threw: ${String(j)}` });
    }
    const _ = qh(b, g.results);
    return u.push(_), o.onOpsApplied(_, g), JSON.stringify({
      results: g.results,
      refs: g.refs,
      node_count: g.node_count,
      edge_count: g.edge_count
    });
  }
  if (p === "get_node_schemas") {
    const g = (Array.isArray(h.node_types) ? h.node_types : []).map((M) => String(M)), _ = r.graph.getNodeDefinitions(), j = new Map(_.map((M) => [M.node_name, M])), R = g.map((M) => j.get(M)).filter((M) => !!M), x = g.filter((M) => !j.has(M));
    let I = R.length > 0 ? Kb(R) : "(no matching node types)";
    return x.length > 0 && (I += `
(unknown node types, not in catalog: ${x.join(", ")})`), I;
  }
  if (p === "validate_graph")
    return JSON.stringify(await Gy(r));
  if (p === "research") {
    const g = (Array.isArray(h.questions) ? h.questions : []).map((R) => String(R)).filter((R) => R.trim()).slice(0, 4);
    if (g.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const _ = cy(r.graph.getNodeDefinitions()), j = await Promise.all(
      g.map((R) => oS(r, l, R, _, f))
    );
    return g.map((R, x) => `[${x + 1}] Q: ${R}
A: ${j[x]}`).join(`

`);
  }
  if (p === "optimize_graph_parameters") {
    let b;
    try {
      b = nS(
        h,
        r.graph.getGraph(),
        r.graph.getNodeDefinitions()
      );
    } catch (_) {
      return JSON.stringify({ error: String(_) });
    }
    const g = await qy(
      {
        id: a.id,
        name: "run_graph_experiments",
        arguments: b.request
      },
      r,
      l,
      o,
      u,
      d,
      f,
      !0
    );
    try {
      const _ = JSON.parse(g);
      return JSON.stringify({ ..._, optimizer: b.metadata });
    } catch {
      return g;
    }
  }
  if (p === "run_graph_experiments") {
    if (h.search !== void 0 && !v)
      return JSON.stringify({
        error: "search metadata is internal optimizer provenance; call optimize_graph_parameters instead"
      });
    let b;
    try {
      b = L1(h);
    } catch (M) {
      return JSON.stringify({ error: String(M) });
    }
    if (b > d.remaining)
      return JSON.stringify({
        error: `Experiment turn budget exceeded: ${b} requested, ${d.remaining} of ${zs} executions remain.`
      });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    if (!o.onExperimentApproval)
      return JSON.stringify({
        error: "Experiment execution requires an interactive user confirmation, but this client did not provide one."
      });
    const g = h;
    let _ = !1, j;
    try {
      j = r.graph.onGraphChanged(() => {
        _ = !0;
      });
    } catch (M) {
      return JSON.stringify({ error: `Cannot safely watch the graph during approval: ${String(M)}` });
    }
    let R;
    try {
      R = Ls(r);
    } catch (M) {
      return j(), JSON.stringify({ error: `Cannot capture the graph before approval: ${String(M)}` });
    }
    let x;
    try {
      try {
        const M = v ? {
          ...a,
          arguments: Object.fromEntries(
            Object.entries(a.arguments).filter(([Y]) => Y !== "search")
          )
        } : a, L = sy(M, r).arguments;
        x = await o.onExperimentApproval({
          hypothesis: L.hypothesis,
          variantCount: g.variants.length,
          repetitions: g.repetitions ?? 1,
          executionCount: b,
          concurrency: g.concurrency ?? 1,
          applyBest: g.apply_best ?? !1,
          variants: L.variants.map((Y) => ({
            label: Y.label,
            operations: Y.operations.map(rS)
          })),
          nodeTypes: [.../* @__PURE__ */ new Set([
            ...r.graph.getGraph().nodes.map((Y) => Y.type).filter((Y) => !!Y && Y !== "note"),
            ...g.variants.flatMap((Y) => Y.operations.filter((ie) => ie.op === "add_node").map((ie) => ie.node_type))
          ])]
        });
      } catch (M) {
        return f != null && f.aborted ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." }) : JSON.stringify({ error: `Experiment approval failed: ${String(M)}` });
      }
    } finally {
      j();
    }
    if (!x)
      return JSON.stringify({ cancelled: !0, error: "Experiment execution was not approved by the user." });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    let I;
    try {
      I = Ls(r) !== R;
    } catch (M) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(M)}` });
    }
    if (_ || I)
      return JSON.stringify({
        cancelled: !0,
        replan: !0,
        error: "The active graph changed while execution approval was open. Re-read the graph and propose the study again."
      });
    d.remaining -= b;
    try {
      const M = await B1(
        r,
        h,
        f
      );
      if (M.applyResult && M.appliedOperations) {
        const Z = `promote experiment winner: ${qh(
          M.appliedOperations,
          M.applyResult.results
        )}`;
        u.push(Z), o.onOpsApplied(Z, M.applyResult);
      }
      const { applyResult: L, appliedOperations: Y, ...ie } = M;
      return JSON.stringify(ie);
    } catch (M) {
      return f != null && f.aborted || M instanceof DOMException && M.name === "AbortError" ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled." }) : JSON.stringify({ error: String(M) });
    }
  }
  return p === "get_current_graph" ? uy(r.graph.getGraph(), r.graph.getNodeDefinitions()) : JSON.stringify({ error: `Unknown tool: ${p}` });
}
async function cS(a) {
  const { api: r, settings: l, history: o, userText: u, attachments: d, callbacks: f, signal: v } = a, p = [], h = lS(
    r,
    o,
    u,
    d,
    l.provider
  );
  let b = 0, g = 0, _ = !1;
  const j = [], R = { remaining: zs }, x = (M) => {
    var L;
    p.push(M), (L = f.onTurnAppended) == null || L.call(f, M);
  }, I = (M) => {
    const L = Eu(M, j, r);
    L.trim() && x({ role: "assistant", content: L });
  };
  try {
    for (; ; ) {
      let M = "", L = null, Y = null;
      if (await ry(
        r,
        Hy(l, h),
        {
          onText(re) {
            M += re, f.onTextDelta(re);
          },
          onDone(re) {
            L = re;
          },
          onError(re) {
            Y = re;
          }
        },
        v
      ), Y !== null) {
        I(M), f.onTurnsCommitted(p), f.onError(Y), f.onFinished();
        return;
      }
      if (!L) {
        I(M), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
      const ie = L, Z = ie.message.tool_calls ?? [], ae = ie.message.content || M, G = Eu(
        ae,
        [...j, ...Z],
        r
      );
      if (ie.stop_reason === "end" || Z.length === 0) {
        const re = r.graph.getGraph();
        if (_ && Array.isArray(re.nodes) && re.nodes.length > 0) {
          const Ne = await sS(r);
          if (!Ne.valid) {
            if (g >= Hh) {
              G.trim() && x({ role: "assistant", content: G }), x({
                role: "assistant",
                content: `I could not complete a runnable graph after ${Hh} correction attempts. The current graph still fails CodefyUI validation:
` + Ne.errors.map((D) => `- ${D}`).join(`
`)
              }), f.onTurnsCommitted(p), f.onFinished();
              return;
            }
            g++, G.trim() && x({ role: "assistant", content: G }), h.push({ role: "assistant", content: G }), h.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + Ne.errors.map((D) => `- ${D}`).join(`
`)
            });
            continue;
          }
        }
        x({ role: "assistant", content: G }), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
      b++;
      const se = oy(Z, r);
      j.push(...Z);
      const ce = {
        role: "assistant",
        content: G,
        tool_calls: se
      }, U = p.length;
      x(ce);
      const k = [], oe = [];
      for (const re of Z) {
        const Ne = k.length, D = await qy(
          re,
          r,
          l,
          f,
          k,
          R,
          v
        );
        k.length > Ne && (_ = !0);
        const X = Vs(re, D, r);
        if (x({
          role: "tool",
          content: X,
          tool_call_id: re.id
        }), oe.push({
          role: "tool",
          content: X,
          tool_call_id: re.id
        }), v != null && v.aborted) {
          f.onTurnsCommitted(p), f.onFinished();
          return;
        }
      }
      k.length > 0 && (p[U] = { ...ce, opsSummary: k.join("; ") });
      const ge = {
        role: "assistant",
        content: G,
        tool_calls: Z
      };
      if (h.push(ge), h.push(...oe), b >= Bh) {
        x({
          role: "assistant",
          content: `(stopped after ${Bh} tool rounds)`
        }), f.onTurnsCommitted(p), f.onFinished();
        return;
      }
    }
  } catch (M) {
    f.onTurnsCommitted(p), f.onError(String(M)), f.onFinished();
  }
}
function uS(a) {
  const r = [];
  return a.forEach((l, o) => {
    if (l.role === "tool") {
      for (let u = r.length - 1; u >= 0; u--) {
        const d = r[u].stages.find(
          (f) => f.call.id === l.tool_call_id && !f.result
        );
        if (d) {
          d.result = l;
          return;
        }
      }
      return;
    }
    r.push({
      key: o,
      turn: l,
      stages: (l.tool_calls ?? []).map((u) => ({ call: u }))
    });
  }), r;
}
const ma = {
  apply_graph_operations: "Edit graph",
  get_current_graph: "Read graph",
  get_node_schemas: "Node schemas",
  validate_graph: "Validate graph",
  research: "Research",
  run_graph_experiments: "Experiment study",
  optimize_graph_parameters: "Parameter search"
};
function Mi(a) {
  try {
    const r = JSON.parse(a);
    return r && typeof r == "object" && !Array.isArray(r) ? r : null;
  } catch {
    return null;
  }
}
function dS(a) {
  const r = Array.isArray(a.operations) ? a.operations : [], l = /* @__PURE__ */ new Map();
  for (const o of r) {
    const u = o && typeof o == "object" ? String(o.op ?? "?") : "?";
    l.set(u, (l.get(u) ?? 0) + 1);
  }
  return [...l].map(([o, u]) => `${o} ×${u}`).join(", ");
}
function Rn(a, r) {
  return a.length > r ? a.slice(0, r - 1) + "…" : a;
}
function tn(a) {
  try {
    return Rn(JSON.stringify(JSON.parse(a), null, 2), 4e3);
  } catch {
    return Rn(a, 4e3);
  }
}
function Di(a, r) {
  return `${a} ${r}${a === 1 ? "" : "s"}`;
}
function fS(a, r) {
  const l = ma.apply_graph_operations, o = dS(a);
  if (!r)
    return { label: l, summary: o || "applying operations", status: "running" };
  const u = Mi(r.content);
  if (!u)
    return { label: l, summary: o, status: "ok", detail: tn(r.content) };
  if (typeof u.error == "string")
    return { label: l, summary: Rn(u.error, 120), status: "error", detail: tn(r.content) };
  const f = (Array.isArray(u.results) ? u.results : []).filter((b) => !b.ok).length, v = typeof u.node_count == "number" ? u.node_count : null, p = typeof u.edge_count == "number" ? u.edge_count : null, h = [];
  return o && h.push(o), f > 0 && h.push(`${f} failed`), v !== null && p !== null && h.push(`${Di(v, "node")} · ${Di(p, "edge")}`), {
    label: l,
    summary: h.join(" — ") || "applied",
    status: f > 0 ? "error" : "ok",
    detail: tn(r.content)
  };
}
function mS(a) {
  const r = ma.validate_graph;
  if (!a) return { label: r, summary: "checking…", status: "running" };
  const l = Mi(a.content), o = Array.isArray(l == null ? void 0 : l.errors) ? l.errors.map(String) : [];
  return l != null && l.valid ? { label: r, summary: "graph is runnable", status: "ok" } : {
    label: r,
    summary: o.length > 0 ? Di(o.length, "issue") : "not runnable",
    status: "error",
    detail: o.length > 0 ? o.map((u) => `• ${u}`).join(`
`) : tn(a.content)
  };
}
function pS(a) {
  const r = ma.get_current_graph;
  if (!a) return { label: r, summary: "reading…", status: "running" };
  const l = Mi(a.content), o = Array.isArray(l == null ? void 0 : l.nodes) ? l.nodes.length : null, u = Array.isArray(l == null ? void 0 : l.edges) ? l.edges.length : null;
  return {
    label: r,
    summary: o !== null && u !== null ? `${Di(o, "node")} · ${Di(u, "edge")}` : "snapshot",
    status: "ok",
    detail: tn(a.content)
  };
}
function hS(a, r) {
  const l = ma.get_node_schemas, o = Array.isArray(a.node_types) ? a.node_types.map(String) : [], u = o.length > 0 ? Rn(o.join(", "), 90) : "node types";
  return r ? { label: l, summary: u, status: "ok", detail: Rn(r.content, 4e3) } : { label: l, summary: u, status: "running" };
}
function yS(a, r) {
  const l = ma.research, o = Array.isArray(a.questions) ? a.questions.length : 0, u = o > 0 ? `${Di(o, "question")} in parallel` : "researching";
  return r ? { label: l, summary: u, status: "ok", detail: Rn(r.content, 4e3) } : { label: l, summary: u, status: "running" };
}
function gS(a, r) {
  const l = ma.run_graph_experiments, o = Array.isArray(a.variants) ? a.variants.length : 0, u = typeof a.repetitions == "number" ? a.repetitions : 1, d = o > 0 ? `${o} candidates · ${o * u} runs` : "preparing study";
  if (!r) return { label: l, summary: d, status: "running" };
  const f = Mi(r.content);
  if (!f || typeof f.error == "string")
    return {
      label: l,
      summary: typeof (f == null ? void 0 : f.error) == "string" ? Rn(f.error, 120) : "study failed",
      status: "error",
      detail: tn(r.content)
    };
  const v = typeof f.winnerLabel == "string" ? f.winnerLabel : null, p = typeof f.appliedVariantId == "string";
  return {
    label: l,
    summary: v ? `${v} ranked first${p ? " · applied" : ""}` : "no rankable metric",
    status: v ? "ok" : "error",
    detail: tn(r.content)
  };
}
function vS(a, r) {
  const l = ma.optimize_graph_parameters, o = Array.isArray(a.bindings) ? a.bindings.length : 0, u = a.strategy === "seeded_random" ? "seeded random" : "grid", d = typeof a.repetitions == "number" ? a.repetitions : 1, f = a.strategy === "seeded_random" && typeof a.candidate_count == "number" ? a.candidate_count + (a.include_baseline === !1 ? 0 : 1) : void 0, v = f ? `${u} · ${o} params · ${f * d} runs` : `${u} · ${o} ${o === 1 ? "parameter" : "parameters"}`;
  if (!r) return { label: l, summary: v, status: "running" };
  const p = Mi(r.content);
  if (!p || typeof p.error == "string")
    return {
      label: l,
      summary: typeof (p == null ? void 0 : p.error) == "string" ? Rn(p.error, 120) : "search failed",
      status: "error",
      detail: tn(r.content)
    };
  const h = typeof p.winnerLabel == "string" ? p.winnerLabel : null, b = typeof p.appliedVariantId == "string";
  return {
    label: l,
    summary: h ? `${h} ranked first${b ? " · applied" : ""}` : "no rankable metric",
    status: h ? "ok" : "error",
    detail: tn(r.content)
  };
}
function bS(a, r) {
  const l = ma[a.name] ?? a.name;
  if (!r) return { label: l, summary: "running…", status: "running" };
  const o = Mi(r.content);
  return o && typeof o.error == "string" ? { label: l, summary: Rn(o.error, 120), status: "error", detail: tn(r.content) } : { label: l, summary: "done", status: "ok", detail: tn(r.content) };
}
function SS(a) {
  const { call: r, result: l } = a, o = r.arguments ?? {};
  switch (r.name) {
    case "apply_graph_operations":
      return fS(o, l);
    case "validate_graph":
      return mS(l);
    case "get_current_graph":
      return pS(l);
    case "get_node_schemas":
      return hS(o, l);
    case "research":
      return yS(o, l);
    case "run_graph_experiments":
      return gS(o, l);
    case "optimize_graph_parameters":
      return vS(o, l);
    default:
      return bS(r, l);
  }
}
const _S = /`([^`\n]+)`/, ES = /\[([^\]\n]+)\]\(([^)\s]+)\)/, AS = /\*\*([^\n]+?)\*\*/, xS = /(^|[\s(])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?=[\s).,!?:;]|$)/;
function NS(a) {
  let r = null;
  const l = (v) => {
    v && (r === null || v.index < r.index) && (r = v);
  }, o = _S.exec(a);
  o && l({
    index: o.index,
    length: o[0].length,
    node: (v) => /* @__PURE__ */ y.jsx("code", { children: o[1] }, v)
  });
  const u = ES.exec(a);
  if (u) {
    const v = u[2];
    l({
      index: u.index,
      length: u[0].length,
      node: (p) => /^https?:\/\//i.test(v) ? /* @__PURE__ */ y.jsx("a", { href: v, target: "_blank", rel: "noopener noreferrer", children: u[1] }, p) : u[0]
    });
  }
  const d = AS.exec(a);
  d && l({
    index: d.index,
    length: d[0].length,
    node: (v) => /* @__PURE__ */ y.jsx("strong", { children: Lr(d[1]) }, v)
  });
  const f = xS.exec(a);
  return f && l({
    index: f.index,
    length: f[0].length,
    prefix: f[1],
    node: (v) => /* @__PURE__ */ y.jsx("em", { children: Lr(f[2]) }, v)
  }), r;
}
function Lr(a) {
  const r = [];
  let l = a, o = 0;
  for (; l.length > 0; ) {
    const u = NS(l);
    if (!u) {
      r.push(l);
      break;
    }
    const d = l.slice(0, u.index) + (u.prefix ?? "");
    d && r.push(d), r.push(u.node(o++)), l = l.slice(u.index + u.length);
  }
  return r;
}
const jS = /^(#{1,3})\s+(.*)$/, wS = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/, $S = /^\s*[-*]\s+(.*)$/, TS = /^\s*\d+[.)]\s+(.*)$/;
function Ih(a, r) {
  const l = a.split(`
`), o = [];
  let u = [], d = null, f = 0;
  const v = () => {
    u.length !== 0 && (o.push(
      /* @__PURE__ */ y.jsx("p", { className: "gcp-md-p", children: Lr(u.join(`
`)) }, `${r}-p${f++}`)
    ), u = []);
  }, p = () => {
    if (!d) return;
    const h = d.items.map((b, g) => /* @__PURE__ */ y.jsx("li", { children: Lr(b) }, g));
    o.push(
      d.ordered ? /* @__PURE__ */ y.jsx("ol", { className: "gcp-md-list", children: h }, `${r}-l${f++}`) : /* @__PURE__ */ y.jsx("ul", { className: "gcp-md-list", children: h }, `${r}-l${f++}`)
    ), d = null;
  };
  for (const h of l) {
    const b = jS.exec(h);
    if (b) {
      v(), p(), o.push(
        /* @__PURE__ */ y.jsx("div", { className: `gcp-md-h${b[1].length}`, children: Lr(b[2]) }, `${r}-h${f++}`)
      );
      continue;
    }
    if (wS.test(h)) {
      v(), p(), o.push(/* @__PURE__ */ y.jsx("hr", { className: "gcp-md-hr" }, `${r}-r${f++}`));
      continue;
    }
    const g = $S.exec(h), _ = g ? null : TS.exec(h);
    if (g || _) {
      v();
      const j = !!_;
      (!d || d.ordered !== j) && (p(), d = { ordered: j, items: [] }), d.items.push((g ?? _)[1]);
      continue;
    }
    if (h.trim() === "") {
      v(), p();
      continue;
    }
    p(), u.push(h);
  }
  return v(), p(), o;
}
const yu = /```[^\n]*\n?([\s\S]*?)(?:```|$)/g;
function DS({ text: a }) {
  const r = [];
  let l = 0, o = 0;
  yu.lastIndex = 0;
  for (let u = yu.exec(a); u !== null && (u.index > l && r.push(...Ih(a.slice(l, u.index), `s${o++}`)), r.push(
    /* @__PURE__ */ y.jsx("pre", { children: /* @__PURE__ */ y.jsx("code", { children: u[1] }) }, `c${o++}`)
  ), l = u.index + u[0].length, u[0].length !== 0); u = yu.exec(a))
    ;
  return l < a.length && r.push(...Ih(a.slice(l), `s${o++}`)), /* @__PURE__ */ y.jsx(y.Fragment, { children: r });
}
function OS({ kind: a }) {
  return /* @__PURE__ */ y.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    a === "pdf" ? /* @__PURE__ */ y.jsx("path", { d: "M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ y.jsx("path", { d: "M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function MS() {
  return /* @__PURE__ */ y.jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function CS() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M12 5v9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "19", r: "1.7", fill: "currentColor" })
  ] });
}
function zS({ open: a }) {
  return /* @__PURE__ */ y.jsx(
    "svg",
    {
      className: `gcp-stage-chevron${a ? " open" : ""}`,
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ y.jsx("path", { d: "M9 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}
function RS(a) {
  const r = a.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), l = [];
  return r.forEach((o, u) => {
    if (o.startsWith("```")) {
      const d = o.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      l.push(/* @__PURE__ */ y.jsx("pre", { children: /* @__PURE__ */ y.jsx("code", { children: d }) }, u));
    } else o && l.push(/* @__PURE__ */ y.jsx("span", { children: o }, u));
  }), l;
}
function US({ stage: a }) {
  const [r, l] = ee.useState(!1), o = SS(a), u = !!o.detail;
  return /* @__PURE__ */ y.jsxs("div", { className: `gcp-stage ${o.status}`, children: [
    /* @__PURE__ */ y.jsxs(
      "button",
      {
        type: "button",
        className: "gcp-stage-head",
        onClick: () => u && l((d) => !d),
        "aria-expanded": u ? r : void 0,
        "aria-label": `${o.label}${o.summary ? `: ${o.summary}` : ""}`,
        disabled: !u,
        children: [
          /* @__PURE__ */ y.jsx("span", { className: "gcp-stage-status", "aria-hidden": "true", children: o.status === "running" ? /* @__PURE__ */ y.jsx("span", { className: "gcp-stage-spinner" }) : o.status === "ok" ? /* @__PURE__ */ y.jsx(MS, {}) : /* @__PURE__ */ y.jsx(CS, {}) }),
          /* @__PURE__ */ y.jsx("span", { className: "gcp-stage-label", children: o.label }),
          o.summary && /* @__PURE__ */ y.jsx("span", { className: "gcp-stage-summary", children: o.summary }),
          u && /* @__PURE__ */ y.jsx(zS, { open: r })
        ]
      }
    ),
    r && o.detail && /* @__PURE__ */ y.jsx("pre", { className: "gcp-stage-detail", children: o.detail })
  ] });
}
function Kh({
  turn: a,
  stages: r = [],
  streaming: l = !1,
  streamingText: o
}) {
  if (a.role === "tool") return null;
  const u = a.role === "user", d = l && o !== void 0 ? o : a.content, f = d.trim().length > 0, v = a.attachments ?? [];
  return /* @__PURE__ */ y.jsxs("div", { className: `gcp-msg-row ${u ? "user" : "assistant"}`, children: [
    v.length > 0 && /* @__PURE__ */ y.jsx("div", { className: "gcp-bubble-attachments", children: v.map(
      (p, h) => p.kind === "image" && p.dataUrl ? /* @__PURE__ */ y.jsx("img", { className: "gcp-att-image", src: p.dataUrl, alt: p.name, title: p.name }, h) : /* @__PURE__ */ y.jsxs("span", { className: "gcp-att-file", title: p.name, children: [
        /* @__PURE__ */ y.jsx(OS, { kind: p.kind }),
        /* @__PURE__ */ y.jsx("span", { className: "gcp-att-file-name", children: p.name })
      ] }, h)
    ) }),
    (f || l && r.length === 0) && /* @__PURE__ */ y.jsxs("div", { className: "gcp-bubble", children: [
      u ? RS(d) : /* @__PURE__ */ y.jsx(DS, { text: d }),
      l && /* @__PURE__ */ y.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    r.length > 0 && /* @__PURE__ */ y.jsx("div", { className: "gcp-stages", children: r.map((p, h) => /* @__PURE__ */ y.jsx(US, { stage: p }, `${p.call.id}-${h}`)) }),
    !u && a.opsSummary && r.length === 0 && /* @__PURE__ */ y.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ y.jsxs("span", { children: [
      "Applied: ",
      a.opsSummary
    ] }) })
  ] });
}
function LS() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M22 2L11 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M22 2L15 22L11 13L2 9L22 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function VS() {
  return /* @__PURE__ */ y.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function Yh() {
  return /* @__PURE__ */ y.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx(
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
function BS({ kind: a }) {
  return a === "pdf" ? /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) : /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M14 2v6h6M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function HS() {
  return /* @__PURE__ */ y.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }) });
}
function GS() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ y.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function qS() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ y.jsx("path", { d: "M12 7.5v5.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "16.5", r: "1.2", fill: "currentColor" })
  ] });
}
const IS = [
  "Build a small CNN image classifier",
  "Explain what my current graph does",
  "Improve my current graph"
];
function KS({
  api: a,
  settings: r,
  codexLoggedIn: l,
  conversation: o,
  onConversationChange: u,
  onOpenSettings: d,
  onOpenHistory: f
}) {
  const [v, p] = ee.useState(""), [h, b] = ee.useState(!1), [g, _] = ee.useState(""), [j, R] = ee.useState([]), [x, I] = ee.useState(0), [M, L] = ee.useState(null), [Y, ie] = ee.useState(""), [Z, ae] = ee.useState([]), [G, se] = ee.useState([]), [ce, U] = ee.useState(!1), [k, oe] = ee.useState(null), ge = ee.useRef(null), re = ee.useRef(!0), Ne = ee.useRef(null), D = ee.useRef(null), X = ee.useRef(null), O = ee.useRef(null), F = ee.useRef(0), Q = Eb(r, l), E = G.some((K) => K.status === "loading"), V = G.filter((K) => K.status === "ready" && K.att).map((K) => K.att), W = Q && !h && !E && (v.trim().length > 0 || V.length > 0);
  ee.useEffect(() => () => {
    var K, Se;
    (K = O.current) == null || K.call(O, !1), O.current = null, (Se = X.current) == null || Se.abort();
  }, []), ee.useEffect(() => {
    if (!h) {
      I(0);
      return;
    }
    const K = Date.now(), Se = window.setInterval(() => {
      I(Math.floor((Date.now() - K) / 1e3));
    }, 1e3);
    return () => window.clearInterval(Se);
  }, [h]);
  const te = ee.useCallback(() => {
    const K = ge.current;
    K && (re.current = K.scrollHeight - K.scrollTop - K.clientHeight < 80);
  }, []);
  ee.useEffect(() => {
    const K = ge.current;
    K && re.current && (K.scrollTop = K.scrollHeight);
  }, [o.messages, j, g, G.length, h]);
  const fe = ee.useCallback(() => {
    const K = Ne.current;
    K && (K.style.height = "auto", K.style.height = Math.min(K.scrollHeight, 110) + "px");
  }, []);
  ee.useEffect(() => {
    fe();
  }, [v, fe]);
  const ve = ee.useCallback(
    (K) => {
      if (!(!Q || h))
        for (const Se of Array.from(K)) {
          const gt = crypto.randomUUID(), ha = ay(Se);
          se((Ge) => [
            ...Ge,
            { id: gt, name: Se.name, kind: ha, size: Se.size, status: "loading" }
          ]), zb(Se).then((Ge) => {
            se(
              (un) => un.map((dt) => dt.id === gt ? { ...dt, status: "ready", att: Ge } : dt)
            );
          }).catch((Ge) => {
            const un = (Ge == null ? void 0 : Ge.message) ?? String(Ge);
            se(
              (dt) => dt.map((Pe) => Pe.id === gt ? { ...Pe, status: "error", error: un } : Pe)
            );
          });
        }
    },
    [Q, h]
  ), Te = (K) => {
    se((Se) => Se.filter((gt) => gt.id !== K));
  }, ut = (K) => {
    K.target.files && K.target.files.length > 0 && ve(K.target.files), K.target.value = "";
  }, Xe = (K) => {
    var gt;
    const Se = (gt = K.clipboardData) == null ? void 0 : gt.files;
    Se && Se.length > 0 && (ve(Se), K.preventDefault());
  }, pa = (K) => {
    !Q || h || Array.from(K.dataTransfer.types).includes("Files") && (K.preventDefault(), F.current += 1, U(!0));
  }, Va = (K) => {
    !Q || h || Array.from(K.dataTransfer.types).includes("Files") && K.preventDefault();
  }, Ci = () => {
    F.current -= 1, F.current <= 0 && (F.current = 0, U(!1));
  }, Fr = (K) => {
    F.current = 0, U(!1), !(!Q || h) && K.dataTransfer.files && K.dataTransfer.files.length > 0 && (K.preventDefault(), ve(K.dataTransfer.files));
  }, Lt = ee.useCallback(
    async (K, Se) => {
      var Pe;
      const gt = K.trim();
      if (!gt && Se.length === 0 || h || !Q) return;
      L(null), ie(gt), ae(Se), p(""), se([]), b(!0), _(""), R([]), re.current = !0;
      const ha = { role: "user", content: gt };
      Se.length > 0 && (ha.attachments = Se);
      let Ge = { ...o };
      Ge.title || (Ge.title = xb(gt || ((Pe = Se[0]) == null ? void 0 : Pe.name) || "Attachment")), Ge.provider = r.provider, Ge.model = r.models[r.provider] ?? "", Ge.messages = [...Ge.messages, ha], Ge.updatedAt = Date.now(), u(Ge), rh(a, Ge);
      const un = new AbortController();
      X.current = un;
      let dt = "";
      await cS({
        api: a,
        settings: r,
        history: Ge.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: gt,
        attachments: Se.length > 0 ? Se : void 0,
        callbacks: {
          onTextDelta(ke) {
            dt += ke, _(dt);
          },
          onTurnAppended(ke) {
            ke.role !== "tool" && (dt = "", _("")), R((lt) => [...lt, ke]);
          },
          onOpsApplied() {
          },
          onExperimentApproval(ke) {
            var lt;
            return un.signal.aborted ? Promise.resolve(!1) : ((lt = O.current) == null || lt.call(O, !1), new Promise((Ys) => {
              O.current = Ys, oe(ke);
            }));
          },
          onTurnsCommitted(ke) {
            _(""), dt = "", R([]), Ge = { ...Ge, messages: [...Ge.messages, ...ke], updatedAt: Date.now() }, u(Ge), rh(a, Ge);
          },
          onError(ke) {
            L(ke), _(""), dt = "";
          },
          onFinished() {
            var ke;
            (ke = O.current) == null || ke.call(O, !1), O.current = null, oe(null), b(!1), X.current = null;
          }
        },
        signal: un.signal
      });
    },
    [a, h, o, u, Q, r]
  ), zi = () => Lt(v, V), Ri = (K) => {
    K.key === "Enter" && !K.shiftKey && (K.preventDefault(), Lt(v, V));
  }, Is = () => {
    var K, Se;
    (K = O.current) == null || K.call(O, !1), O.current = null, oe(null), (Se = X.current) == null || Se.abort();
  }, Ui = (K) => {
    const Se = O.current;
    O.current = null, oe(null), Se == null || Se(K);
  }, Li = () => Lt(Y, Z), Vi = j.length > 0 ? [...o.messages, ...j] : o.messages, Un = uS(Vi), Pr = Un.length === 0 && !h, el = Un[Un.length - 1], bt = !!el && el.stages.some((K) => !K.result), Ks = h && g === "" && !bt && !k, Bi = Pr ? bu(a).filter((K) => K.id !== o.id).length : 0;
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: `gcp-chat${ce ? " gcp-dragging" : ""}`,
      onDragEnter: pa,
      onDragOver: Va,
      onDragLeave: Ci,
      onDrop: Fr,
      children: [
        /* @__PURE__ */ y.jsxs(
          "div",
          {
            className: "gcp-messages",
            role: "log",
            "aria-live": "polite",
            "aria-label": "Conversation",
            ref: ge,
            onScroll: te,
            children: [
              Pr && /* @__PURE__ */ y.jsxs("div", { className: "gcp-welcome", children: [
                /* @__PURE__ */ y.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ y.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
                /* @__PURE__ */ y.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." }),
                Q && /* @__PURE__ */ y.jsx("div", { className: "gcp-welcome-suggestions", "aria-label": "Suggested prompts", children: IS.map((K) => /* @__PURE__ */ y.jsx("button", { className: "gcp-suggestion", onClick: () => Lt(K, []), children: K }, K)) }),
                Bi > 0 && /* @__PURE__ */ y.jsxs(
                  "button",
                  {
                    className: "gcp-welcome-history",
                    onClick: f,
                    "aria-label": "View previous conversations",
                    children: [
                      /* @__PURE__ */ y.jsx(GS, {}),
                      "Previous conversations (",
                      Bi,
                      ")"
                    ]
                  }
                )
              ] }),
              Un.map((K) => /* @__PURE__ */ y.jsx(Kh, { turn: K.turn, stages: K.stages }, K.key)),
              h && g !== "" && /* @__PURE__ */ y.jsx(
                Kh,
                {
                  turn: { role: "assistant", content: "" },
                  streaming: !0,
                  streamingText: g
                }
              ),
              Ks && /* @__PURE__ */ y.jsxs("div", { className: "gcp-thinking", role: "status", "aria-label": "Waiting for the assistant", children: [
                /* @__PURE__ */ y.jsx("span", { className: "gcp-thinking-orb", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ y.jsx("span", { className: "gcp-thinking-text", children: "Thinking" }),
                x >= 3 && /* @__PURE__ */ y.jsxs("span", { className: "gcp-thinking-time", children: [
                  x,
                  "s"
                ] })
              ] }),
              M && !h && /* @__PURE__ */ y.jsxs("div", { className: "gcp-error-row", role: "alert", children: [
                /* @__PURE__ */ y.jsx("span", { className: "gcp-error-icon", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx(qS, {}) }),
                /* @__PURE__ */ y.jsxs("div", { className: "gcp-error-body", children: [
                  /* @__PURE__ */ y.jsx("div", { className: "gcp-error-title", children: "Request failed" }),
                  /* @__PURE__ */ y.jsx("div", { className: "gcp-error-text", children: M })
                ] }),
                /* @__PURE__ */ y.jsx("button", { className: "gcp-retry-btn", onClick: Li, "aria-label": "Retry", children: "Retry" })
              ] })
            ]
          }
        ),
        ce && /* @__PURE__ */ y.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ y.jsx(Yh, {}),
          /* @__PURE__ */ y.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        k && /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-backdrop", children: /* @__PURE__ */ y.jsxs(
          "div",
          {
            className: "gcp-experiment-approval",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "gcp-experiment-approval-title",
            children: [
              /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-kicker", children: "Execution approval" }),
              /* @__PURE__ */ y.jsxs("div", { id: "gcp-experiment-approval-title", className: "gcp-experiment-approval-title", children: [
                "Run ",
                k.executionCount,
                " graph execution",
                k.executionCount === 1 ? "" : "s",
                "?"
              ] }),
              /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-hypothesis", children: k.hypothesis }),
              /* @__PURE__ */ y.jsxs("div", { className: "gcp-experiment-approval-facts", children: [
                /* @__PURE__ */ y.jsxs("span", { children: [
                  k.variantCount,
                  " variants"
                ] }),
                /* @__PURE__ */ y.jsxs("span", { children: [
                  k.repetitions,
                  " repetitions"
                ] }),
                /* @__PURE__ */ y.jsxs("span", { children: [
                  "concurrency ",
                  k.concurrency
                ] }),
                k.applyBest && /* @__PURE__ */ y.jsx("span", { children: "parameter winner may be applied" })
              ] }),
              /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-warning", children: "Review the candidate settings below. Credential values are schema-redacted." }),
              /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-candidates", "aria-label": "Candidate changes", children: k.variants.map((K, Se) => /* @__PURE__ */ y.jsxs("div", { children: [
                /* @__PURE__ */ y.jsx("strong", { children: K.label }),
                /* @__PURE__ */ y.jsx("span", { children: K.operations.length > 0 ? K.operations.join(" · ") : "baseline — no changes" })
              ] }, `${Se}-${K.label}`)) }),
              /* @__PURE__ */ y.jsxs("div", { className: "gcp-experiment-approval-nodes", children: [
                /* @__PURE__ */ y.jsx("strong", { children: "Nodes that may execute" }),
                /* @__PURE__ */ y.jsx("span", { children: k.nodeTypes.length > 0 ? k.nodeTypes.join(", ") : "No typed nodes detected" })
              ] }),
              /* @__PURE__ */ y.jsx("div", { className: "gcp-experiment-approval-warning", children: "Candidate edits stay off-canvas, but nodes may write files, call networks, use GPU time, or incur API costs." }),
              /* @__PURE__ */ y.jsxs("div", { className: "gcp-experiment-approval-actions", children: [
                /* @__PURE__ */ y.jsx("button", { className: "gcp-approval-secondary", onClick: () => Ui(!1), autoFocus: !0, children: "Cancel" }),
                /* @__PURE__ */ y.jsx("button", { className: "gcp-approval-primary", onClick: () => Ui(!0), children: "Approve and run" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ y.jsxs("div", { className: "gcp-input-area", children: [
          G.length > 0 && /* @__PURE__ */ y.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: G.map((K) => {
            var Se;
            return /* @__PURE__ */ y.jsxs(
              "div",
              {
                className: `gcp-chip ${K.kind === "image" ? "image" : "file"} ${K.status}`,
                title: K.status === "error" ? K.error : `${K.name} · ${Ur(K.size)}`,
                children: [
                  K.kind === "image" && ((Se = K.att) != null && Se.dataUrl) ? /* @__PURE__ */ y.jsx("img", { className: "gcp-chip-thumb", src: K.att.dataUrl, alt: K.name }) : /* @__PURE__ */ y.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ y.jsx(BS, { kind: K.kind }) }),
                  /* @__PURE__ */ y.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ y.jsx("span", { className: "gcp-chip-name", children: K.name }),
                    /* @__PURE__ */ y.jsx("span", { className: "gcp-chip-size", children: K.status === "loading" ? "reading…" : K.status === "error" ? "failed" : Ur(K.size) })
                  ] }),
                  K.status === "loading" && /* @__PURE__ */ y.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ y.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => Te(K.id),
                      "aria-label": `Remove ${K.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ y.jsx(HS, {})
                    }
                  )
                ]
              },
              K.id
            );
          }) }),
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ y.jsx(
              "input",
              {
                ref: D,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: ut,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ y.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var K;
                  return (K = D.current) == null ? void 0 : K.click();
                },
                disabled: !Q || h,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ y.jsx(Yh, {})
              }
            ),
            /* @__PURE__ */ y.jsx(
              "textarea",
              {
                ref: Ne,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: v,
                onChange: (K) => p(K.target.value),
                onKeyDown: Ri,
                onPaste: Xe,
                disabled: h || !Q,
                "aria-label": "Message input",
                "aria-disabled": Q ? void 0 : "true"
              }
            ),
            h ? /* @__PURE__ */ y.jsx("button", { className: "gcp-stop-btn", onClick: Is, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ y.jsx(VS, {}) }) : /* @__PURE__ */ y.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: zi,
                disabled: !W,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ y.jsx(LS, {})
              }
            )
          ] }),
          /* @__PURE__ */ y.jsx("div", { className: "gcp-input-hint", "aria-hidden": "true", children: h ? "Generating — use the stop button to interrupt" : "Enter to send · Shift+Enter for a new line" }),
          !Q && !h && /* @__PURE__ */ y.jsxs("div", { className: "gcp-not-ready-overlay", children: [
            /* @__PURE__ */ y.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
            /* @__PURE__ */ y.jsx(
              "button",
              {
                className: "gcp-cta-btn",
                onClick: d,
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
const YS = "Imported portable-study content passed SHA-256 integrity checking, which detects content changes but does not authenticate its author or evidence source. It is read-only and was not executed in this browser session.";
function Zr(a, r) {
  return a < r ? -1 : a > r ? 1 : 0;
}
function XS(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.value]).sort(([r], [l]) => Zr(r, l))
  );
}
function kS(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.canonicalKey]).sort(([r], [l]) => Zr(r, l))
  );
}
function QS(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.source]).sort(([r], [l]) => Zr(r, l))
  );
}
function ZS(a, r) {
  if (r.metricKey !== void 0)
    return a.metrics.find((l) => l.canonicalKey === r.metricKey);
}
function JS(a, r) {
  const l = ZS(a, r), o = a.status === "completed" ? void 0 : a.status === "cancelled" ? `Imported run was cancelled [${a.error.phase}/${a.error.code}]: ${a.error.message}` : `Imported run failed [${a.error.phase}/${a.error.code}]: ${a.error.message}`;
  return {
    repetition: a.repetition,
    // ExperimentSession has no cancelled run state. Preserve the distinction
    // in the error text while ensuring cancelled evidence never appears as a
    // successful observation.
    status: a.status === "completed" ? "completed" : "failed",
    durationMs: a.durationMs,
    ...l === void 0 ? {} : {
      metricKey: l.canonicalKey,
      metricValue: l.value,
      metricSource: l.source
    },
    observedMetrics: XS(a.metrics),
    ...a.metrics.length === 0 ? {} : {
      observedMetricIdentities: kS(a.metrics),
      observedMetricSources: QS(a.metrics)
    },
    ...o === void 0 ? {} : { error: o }
  };
}
function WS(a, r) {
  const l = r.filter((o) => o.variantId === a.id).sort((o, u) => o.repetition - u.repetition || Zr(o.runKey, u.runKey)).map((o) => JS(o, a));
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
      a.observedMetrics.map(({ key: o, value: u }) => [o, u]).sort(([o], [u]) => Zr(o, u))
    ),
    // Always supply an array, including an empty one. Omitting it would make
    // legacy export code synthesize attempts from aggregate metricValues.
    runs: l,
    ...a.operationSummary === void 0 ? {} : { operationSummary: [...a.operationSummary] },
    errors: [...a.errors]
  };
}
function FS(a) {
  return {
    title: a.title,
    evidence: a.evidence,
    nextStep: a.nextStep
  };
}
function PS(a) {
  const r = a.payload.provenance.facts.find((l) => l.key === "optimizer.plan" && l.status === "observed");
  if (!(!r || !Zu(r.value)))
    return JSON.parse(JSON.stringify(r.value));
}
function e_(a) {
  const { payload: r } = a, { derived: l, spec: o } = r, u = PS(a);
  return {
    id: r.id,
    createdAt: r.createdAt,
    hypothesis: o.hypothesis,
    objective: { ...o.objective },
    repetitions: o.repetitions,
    status: l.status,
    variants: l.variants.map((d) => WS(d, r.runs)),
    ...u === void 0 ? {} : { search: u },
    ...l.baselineVariantId === void 0 ? {} : { baselineVariantId: l.baselineVariantId },
    ...l.winnerId === void 0 ? {} : { winnerId: l.winnerId },
    ...l.winnerLabel === void 0 ? {} : { winnerLabel: l.winnerLabel },
    ...l.appliedVariantId === void 0 ? {} : { appliedVariantId: l.appliedVariantId },
    ...l.applyConflict === void 0 ? {} : { applyConflict: l.applyConflict },
    insights: {
      summary: [...l.insights.summary],
      warnings: [...l.insights.warnings, YS],
      paperIdeas: l.insights.paperIdeas.map(FS)
    }
  };
}
function oa(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function t_(a, r) {
  return Object.prototype.hasOwnProperty.call(a, r);
}
function Iy(a) {
  return oa(a) && typeof a.$gcpSecretRef == "string";
}
function Jr(a, r) {
  if (Iy(a)) {
    const l = a.$gcpSecretRef;
    return t_(r.bindings, l) && typeof r.bindings[l] == "string" ? (r.resolved.add(l), r.bindings[l]) : (r.missing.add(l), "");
  }
  if (Array.isArray(a))
    return a.map((l) => Jr(l, r));
  if (oa(a)) {
    const l = /* @__PURE__ */ Object.create(null);
    for (const [o, u] of Object.entries(a))
      l[o] = Jr(u, r);
    return l;
  }
  return a;
}
function Cu(a, r) {
  return Jr(a, r);
}
function n_(a, r) {
  return {
    name: a.name ?? "",
    description: a.description ?? "",
    nodes: a.nodes.map((l) => ({
      id: l.id,
      type: l.type,
      position: { x: l.position.x, y: l.position.y },
      data: Cu(l.data, r)
    })),
    edges: a.edges.map((l) => ({
      id: l.id,
      source: l.source,
      target: l.target,
      sourceHandle: l.sourceHandle,
      targetHandle: l.targetHandle,
      ...l.type === void 0 ? {} : { type: l.type }
    })),
    presets: a.presets === void 0 ? [] : Jr(a.presets, r),
    segmentGroups: a.segmentGroups === void 0 ? [] : Jr(a.segmentGroups, r)
  };
}
function Xh(a, r) {
  return a.nodes.some((l) => l.id === r);
}
function Ai(a, r, l) {
  const o = r[l];
  return o !== void 0 && Xh(a, o) ? o : Xh(a, l) ? l : null;
}
function a_(a) {
  return encodeURIComponent(a);
}
function i_(a, r) {
  let l = a, o = 1;
  for (; r.has(l); )
    l = `${a}~${o}`, o += 1;
  return r.add(l), l;
}
function kh(a, r, l, o) {
  return i_(
    `graph-copilot:${a_(a)}:${r}:${l}`,
    o
  );
}
function On(a, r) {
  return { code: "INVALID_OPERATION", operationIndex: a, message: r };
}
function Tn(a, r, l) {
  const o = a[r];
  return typeof o == "string" ? o : On(l, `${r} must be a string`);
}
function Dn(a) {
  return typeof a != "string";
}
function r_(a, r, l, o, u, d, f) {
  if (!oa(r) || typeof r.op != "string")
    return On(l, "operation must be an object with an op string");
  switch (r.op) {
    case "add_node": {
      const v = Tn(r, "node_type", l);
      if (Dn(v)) return v;
      if (r.ref !== void 0 && typeof r.ref != "string")
        return On(l, "ref must be a string when provided");
      if (r.params !== void 0 && !oa(r.params))
        return On(l, "params must be an object when provided");
      if (r.position !== void 0 && (!oa(r.position) || typeof r.position.x != "number" || !Number.isFinite(r.position.x) || typeof r.position.y != "number" || !Number.isFinite(r.position.y)))
        return On(l, "position must contain finite x and y numbers");
      const p = kh(o, "node", l, d), h = a.nodes.length, b = {
        x: 160 + h % 4 * 240,
        y: 120 + Math.floor(h / 4) * 160
      }, g = r.position;
      return a.nodes.push({
        id: p,
        type: v,
        position: g === void 0 ? b : { x: g.x, y: g.y },
        data: {
          params: r.params === void 0 ? {} : Cu(r.params, f)
        }
      }), typeof r.ref == "string" && (u[r.ref] = p), null;
    }
    case "connect": {
      const v = Tn(r, "source", l), p = Tn(r, "target", l), h = Tn(r, "source_handle", l), b = Tn(r, "target_handle", l);
      if (Dn(v)) return v;
      if (Dn(p)) return p;
      if (Dn(h)) return h;
      if (Dn(b)) return b;
      const g = Ai(a, u, v), _ = Ai(a, u, p);
      if (g === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `connect: unknown source node '${v}'`
        };
      if (_ === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `connect: unknown target node '${p}'`
        };
      const j = h === "trigger", R = j ? "__trigger" : b;
      return a.edges.some((x) => x.source === g && x.target === _ && x.sourceHandle === h && x.targetHandle === R) ? {
        code: "DUPLICATE_EDGE",
        operationIndex: l,
        message: "connect: edge already exists"
      } : (a.edges.push({
        id: kh(o, "edge", l, d),
        source: g,
        target: _,
        sourceHandle: h,
        targetHandle: R,
        type: j ? "trigger" : "data"
      }), null);
    }
    case "set_params": {
      const v = Tn(r, "node_id", l);
      if (Dn(v)) return v;
      if (!oa(r.params))
        return On(l, "params must be an object");
      const p = Ai(a, u, v);
      if (p === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `set_params: unknown node '${v}'`
        };
      const h = a.nodes.find((g) => g.id === p), b = oa(h.data.params) ? h.data.params : {};
      return h.data = {
        ...h.data,
        params: {
          ...b,
          ...Cu(r.params, f)
        }
      }, null;
    }
    case "remove_node": {
      const v = Tn(r, "node_id", l);
      if (Dn(v)) return v;
      const p = Ai(a, u, v);
      return p === null ? {
        code: "UNKNOWN_NODE",
        operationIndex: l,
        message: `remove_node: unknown node '${v}'`
      } : (a.nodes = a.nodes.filter((h) => h.id !== p), a.edges = a.edges.filter((h) => h.source !== p && h.target !== p), null);
    }
    case "remove_edge": {
      const v = Tn(r, "source", l), p = Tn(r, "target", l);
      if (Dn(v)) return v;
      if (Dn(p)) return p;
      if (r.source_handle !== void 0 && typeof r.source_handle != "string")
        return On(l, "source_handle must be a string when provided");
      if (r.target_handle !== void 0 && typeof r.target_handle != "string")
        return On(l, "target_handle must be a string when provided");
      const h = Ai(a, u, v), b = Ai(a, u, p);
      if (h === null || b === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: "remove_edge: unknown source or target node"
        };
      const g = new Set(a.edges.filter((_) => _.source === h && _.target === b && (r.source_handle === void 0 || _.sourceHandle === r.source_handle) && (r.target_handle === void 0 || _.targetHandle === r.target_handle)).map((_) => _.id));
      return g.size === 0 ? {
        code: "UNKNOWN_EDGE",
        operationIndex: l,
        message: "remove_edge: no matching edge"
      } : (a.edges = a.edges.filter((_) => !g.has(_.id)), null);
    }
    case "clear_graph":
      a.nodes = [], a.edges = [];
      for (const v of Object.keys(u)) delete u[v];
      return null;
    case "auto_layout":
      return a.nodes.forEach((v, p) => {
        v.position = {
          x: 120 + p % 4 * 260,
          y: 100 + Math.floor(p / 4) * 180
        };
      }), null;
    default:
      return On(l, `unknown operation '${r.op}'`);
  }
}
function Qh(a, r, l) {
  return {
    status: "error",
    variantId: a,
    variantLabel: l,
    graph: null,
    refs: {},
    missingSecretRefs: [],
    errors: [r],
    fidelity: "portable-operation-replay",
    fidelityWarnings: [],
    sensitive: !1
  };
}
function l_(a, r, l = {}) {
  const o = a.payload.spec.variants.find((g) => g.id === r);
  if (o === void 0)
    return Qh(r, {
      code: "VARIANT_NOT_FOUND",
      message: `Unknown study variant '${r}'`
    });
  const u = {
    bindings: l,
    missing: /* @__PURE__ */ new Set(),
    resolved: /* @__PURE__ */ new Set()
  }, d = n_(a.payload.spec.baseline, u), f = {}, v = /* @__PURE__ */ new Set([
    ...d.nodes.map((g) => g.id),
    ...d.edges.map((g) => g.id)
  ]);
  for (let g = 0; g < o.operations.length; g += 1) {
    const _ = r_(
      d,
      o.operations[g],
      g,
      o.id,
      f,
      v,
      u
    );
    if (_ !== null) return Qh(r, _, o.label);
  }
  const p = [...u.missing].sort(), h = o.operations.some((g) => g.op === "add_node"), b = h ? [
    "Portable study v1 does not include node-definition defaults. Added nodes contain only parameters recorded in the operation, so defaults used by the original runtime may be missing.",
    "Generated node and edge ids are deterministic portable ids and may differ from ids used by the original experiment execution."
  ] : [];
  return {
    status: p.length === 0 ? "ready" : "blocked",
    variantId: r,
    variantLabel: o.label,
    graph: d,
    refs: { ...f },
    missingSecretRefs: p,
    errors: [],
    fidelity: h ? "approximate-node-defaults" : "portable-operation-replay",
    fidelityWarnings: b,
    sensitive: u.resolved.size > 0
  };
}
function zu(a) {
  return Iy(a) ? !0 : Array.isArray(a) ? a.some(zu) : oa(a) && Object.values(a).some(zu);
}
function s_(a) {
  const r = {
    name: a.name,
    description: a.description,
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets,
    segmentGroups: a.segmentGroups
  };
  if (zu(r))
    throw new Error("Candidate graph still contains an unresolved SecretRef");
  return JSON.stringify(r, null, 2);
}
function gu(a) {
  try {
    return Ly(a);
  } catch {
    return [];
  }
}
function o_(a) {
  const r = new Date(a);
  return Number.isNaN(r.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(r);
}
function xi(a) {
  if (a === void 0 || !Number.isFinite(a)) return "—";
  const r = Math.abs(a);
  return r !== 0 && (r >= 1e5 || r < 1e-4) ? a.toExponential(3) : new Intl.NumberFormat(void 0, { maximumSignificantDigits: 6 }).format(a);
}
function Zh(a) {
  return a === void 0 || !Number.isFinite(a) ? "—" : `${a > 0 ? "+" : ""}${xi(a)}`;
}
function c_(a) {
  return !Number.isFinite(a) || a < 0 ? "—" : a < 1e3 ? `${Math.round(a)} ms` : `${(a / 1e3).toFixed(a < 1e4 ? 1 : 0)} s`;
}
function u_(a) {
  return [...a.variants ?? []].sort((r, l) => r.mean === void 0 ? l.mean === void 0 ? 0 : 1 : l.mean === void 0 ? -1 : a.objective.direction === "maximize" ? l.mean - r.mean : r.mean - l.mean);
}
function Jh(a) {
  var l, o;
  const r = [];
  return a.variants.forEach((u) => {
    if (u.runs) {
      r.push(...u.runs.map((d) => ({
        variantId: u.id,
        variantLabel: u.label,
        repetition: d.repetition,
        status: d.status,
        metricKey: d.metricKey,
        metricValue: d.metricValue,
        runtimeMs: d.durationMs,
        error: d.error
      })));
      return;
    }
    r.push(...u.metricValues.map((d, f) => ({
      variantId: u.id,
      variantLabel: u.label,
      repetition: f + 1,
      status: "completed",
      metricKey: u.metricKey,
      metricValue: d
    })));
  }), {
    id: a.id,
    createdAt: a.createdAt,
    hypothesis: a.hypothesis,
    objective: a.objective,
    baselineVariantId: a.baselineVariantId,
    warnings: ((l = a.insights) == null ? void 0 : l.warnings) ?? [],
    paperLeads: ((o = a.insights) == null ? void 0 : o.paperIdeas) ?? [],
    runs: r
  };
}
function As(a, r, l) {
  const o = URL.createObjectURL(new Blob([l], { type: `${r};charset=utf-8` })), u = document.createElement("a");
  u.href = o, u.download = a, u.style.display = "none", document.body.appendChild(u), u.click(), u.remove(), URL.revokeObjectURL(o);
}
function zr(a) {
  return a.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "graph-copilot-study";
}
function vu({ status: a }) {
  return /* @__PURE__ */ y.jsx("span", { className: `gcp-lab-badge ${a}`, children: a });
}
function d_() {
  return /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-empty", children: [
    /* @__PURE__ */ y.jsx("div", { className: "gcp-lab-empty-mark", "aria-hidden": "true", children: /* @__PURE__ */ y.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", children: [
      /* @__PURE__ */ y.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ y.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" })
    ] }) }),
    /* @__PURE__ */ y.jsx("h2", { children: "No experiment studies yet" }),
    /* @__PURE__ */ y.jsx("p", { children: "Ask the agent to compare graph variants against a numeric objective. Completed studies, ranked candidates, and research leads will appear here." }),
    /* @__PURE__ */ y.jsx("div", { className: "gcp-lab-example", children: "“Compare three learning-rate variants, maximize validation accuracy, and run each three times.”" })
  ] });
}
function f_({ api: a }) {
  var ce, U, k, oe, ge, re, Ne, D, X;
  const [r, l] = ee.useState(() => gu(a)), [o, u] = ee.useState(() => {
    var O;
    return ((O = gu(a)[0]) == null ? void 0 : O.id) ?? null;
  }), [d, f] = ee.useState(null), [v, p] = ee.useState(!1), [h, b] = ee.useState(null), [g, _] = ee.useState(null), [j, R] = ee.useState(null), [x, I] = ee.useState(!1), M = ee.useRef(null);
  ee.useEffect(() => {
    const O = () => {
      const F = gu(a);
      l(F), u((Q) => {
        var E;
        return Q && F.some((V) => V.id === Q) ? Q : ((E = F[0]) == null ? void 0 : E.id) ?? null;
      });
    };
    return window.addEventListener(wu, O), () => window.removeEventListener(wu, O);
  }, [a]);
  const L = r.find((O) => O.id === o) ?? r[0], Y = L && (d == null ? void 0 : d.payload.id) === L.id ? d : null, ie = ee.useMemo(() => L ? u_(L) : [], [L]);
  ee.useEffect(() => {
    let O = !0;
    return f(null), p(!1), L ? y1(a).entries.some((Q) => Q.id === L.id) ? (p(!0), Nh(a, L.id).then((Q) => {
      O && f(Q);
    }).catch((Q) => {
      O && b(`Portable study could not be verified: ${String(Q)}`);
    }).finally(() => {
      O && p(!1);
    }), () => {
      O = !1;
    }) : () => {
      O = !1;
    } : () => {
      O = !1;
    };
  }, [a, L == null ? void 0 : L.id]);
  const Z = async (O) => {
    var Q;
    const F = (Q = O.currentTarget.files) == null ? void 0 : Q[0];
    if (O.currentTarget.value = "", !!F) {
      R(null), b(null);
      try {
        if (typeof F.size == "number" && F.size > Ds)
          throw new Error(`Portable study exceeds the ${Ds} byte import limit`);
        const E = await h1(await F.text());
        _(E);
      } catch (E) {
        _(null), R(`Import rejected before storage: ${String(E)}`);
      }
    }
  }, ae = async () => {
    if (!g) return;
    I(!0), R(null);
    let O = !1;
    try {
      if (Ly(a).some((E) => E.id === g.payload.id))
        throw new Error(
          `A local Experiment Lab report already uses study id '${g.payload.id}'; import was refused to avoid overwriting local evidence.`
        );
      const F = e_(g), Q = await Cy(a, g);
      O = !0, await Vy(a, F, { rejectIfExists: !0 }), u(F.id), f(g), _(null), b(Q.status === "unchanged" ? "This content-integrity-checked portable study was already stored; its read-only report was added." : "Portable study imported for read-only review. SHA-256 checks content changes only; it does not authenticate authorship. No graph was executed or applied.");
    } catch (F) {
      R(O ? `The content-integrity-checked bundle was stored, but its read-only Lab report could not be saved. Retry the import: ${String(F)}` : `Portable study was not imported: ${String(F)}`);
    } finally {
      I(!1);
    }
  }, G = async () => {
    if (L)
      try {
        const O = Y ?? await Nh(a, L.id);
        f(O), As(
          `${zr(L.id)}-portable-study.json`,
          "application/json",
          await qu(O)
        ), b("Portable study content integrity checked before export; SHA-256 does not authenticate authorship.");
      } catch (O) {
        b(`Portable study export failed: ${String(O)}`);
      }
  }, se = (O, F) => {
    var Q;
    if (Y)
      try {
        const E = l_(Y, O);
        if (E.status === "error" || !E.graph)
          throw new Error(((Q = E.errors[0]) == null ? void 0 : Q.message) ?? "Candidate could not be reconstructed");
        As(
          `${zr(Y.payload.id)}-${zr(F)}-graph.json`,
          "application/json",
          s_(E.graph)
        );
        const V = E.status === "blocked" ? `Candidate graph downloaded with ${E.missingSecretRefs.length} unresolved secret value(s) left blank.` : "Candidate graph materialized from the content-integrity-checked portable operation record and downloaded.";
        b(E.fidelityWarnings.length === 0 ? V : `${V} Fidelity warning: ${E.fidelityWarnings.join(" ")}`);
      } catch (E) {
        b(`Candidate graph export failed: ${String(E)}`);
      }
  };
  return /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab", "aria-labelledby": "gcp-lab-title", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-heading", children: [
      /* @__PURE__ */ y.jsxs("div", { children: [
        /* @__PURE__ */ y.jsx("span", { className: "gcp-eyebrow", children: "Autonomous evaluation" }),
        /* @__PURE__ */ y.jsx("h1", { id: "gcp-lab-title", children: "Experiment Lab" }),
        /* @__PURE__ */ y.jsx("p", { children: "Compare isolated graph candidates and turn results into defensible research directions." })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-heading-actions", children: [
        /* @__PURE__ */ y.jsxs("span", { className: "gcp-lab-count", "aria-label": `${r.length} experiment studies`, children: [
          r.length,
          " ",
          r.length === 1 ? "study" : "studies"
        ] }),
        /* @__PURE__ */ y.jsx("button", { type: "button", onClick: () => {
          var O;
          return (O = M.current) == null ? void 0 : O.click();
        }, children: "Import portable study" }),
        /* @__PURE__ */ y.jsx(
          "input",
          {
            ref: M,
            type: "file",
            accept: "application/json,.json",
            "aria-label": "Choose portable study file",
            hidden: !0,
            onChange: (O) => {
              Z(O);
            }
          }
        )
      ] })
    ] }),
    j && !g && /* @__PURE__ */ y.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: j }),
    h && /* @__PURE__ */ y.jsx("p", { className: "gcp-lab-portable-message", role: "status", children: h }),
    r.length === 0 || !L ? /* @__PURE__ */ y.jsx(d_, {}) : /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-layout", children: [
      /* @__PURE__ */ y.jsx("aside", { className: "gcp-lab-studies", "aria-label": "Experiment studies", children: r.map((O) => {
        var F, Q, E;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            className: `gcp-study-card${O.id === L.id ? " active" : ""}`,
            onClick: () => {
              b(null), u(O.id);
            },
            "aria-pressed": O.id === L.id,
            children: [
              /* @__PURE__ */ y.jsxs("span", { className: "gcp-study-card-top", children: [
                /* @__PURE__ */ y.jsx(vu, { status: O.status }),
                /* @__PURE__ */ y.jsx("time", { dateTime: O.createdAt, children: o_(O.createdAt) })
              ] }),
              /* @__PURE__ */ y.jsx("strong", { children: O.hypothesis || "Untitled study" }),
              /* @__PURE__ */ y.jsxs("span", { className: "gcp-study-card-meta", children: [
                ((F = O.objective) == null ? void 0 : F.direction) === "minimize" ? "↓" : "↑",
                " ",
                ((Q = O.objective) == null ? void 0 : Q.metric) || "metric",
                /* @__PURE__ */ y.jsx("span", { "aria-hidden": "true", children: " · " }),
                ((E = O.variants) == null ? void 0 : E.length) ?? 0,
                " candidates"
              ] })
            ]
          },
          O.id
        );
      }) }),
      /* @__PURE__ */ y.jsxs("article", { className: "gcp-lab-report", "aria-label": `Experiment report: ${L.hypothesis}`, children: [
        /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-report-head", children: [
          /* @__PURE__ */ y.jsxs("div", { children: [
            /* @__PURE__ */ y.jsx("span", { className: "gcp-eyebrow", children: "Study hypothesis" }),
            /* @__PURE__ */ y.jsx("h2", { children: L.hypothesis })
          ] }),
          /* @__PURE__ */ y.jsx(vu, { status: L.status })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-export-actions", "aria-label": "Export study evidence", children: [
          /* @__PURE__ */ y.jsx(
            "button",
            {
              type: "button",
              onClick: () => As(
                `${zr(L.id)}-runs.csv`,
                "text/csv",
                e0(Jh(L))
              ),
              children: "Export runs CSV"
            }
          ),
          /* @__PURE__ */ y.jsx(
            "button",
            {
              type: "button",
              onClick: () => As(
                `${zr(L.id)}-research.md`,
                "text/markdown",
                n0(Jh(L))
              ),
              children: "Export research brief"
            }
          ),
          /* @__PURE__ */ y.jsx(
            "button",
            {
              type: "button",
              disabled: !Y || v,
              title: Y ? "Export the SHA-256 content-integrity-checked baseline, variants, provenance, and run records" : "No portable bundle is available for this legacy summary",
              onClick: () => {
                G();
              },
              children: v ? "Verifying portable study…" : "Export portable study"
            }
          )
        ] }),
        Y && /* @__PURE__ */ y.jsxs("p", { className: "gcp-lab-integrity", children: [
          "Content integrity checked · SHA-256 ",
          Y.integrity.contentSha256.slice(0, 12),
          "… · authorship unverified"
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-summary-grid", children: [
          /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-summary-card", "aria-labelledby": "gcp-study-objective", children: [
            /* @__PURE__ */ y.jsx("span", { className: "gcp-lab-card-icon objective", "aria-hidden": "true", children: "◎" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h3", { id: "gcp-study-objective", children: "Study objective" }),
              /* @__PURE__ */ y.jsxs("strong", { children: [
                L.objective.direction === "maximize" ? "Maximize" : "Minimize",
                " ",
                L.objective.metric
              ] }),
              /* @__PURE__ */ y.jsxs("span", { children: [
                L.repetitions,
                " ",
                L.repetitions === 1 ? "run" : "runs",
                " per candidate"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-summary-card winner", "aria-labelledby": "gcp-study-winner", children: [
            /* @__PURE__ */ y.jsx("span", { className: "gcp-lab-card-icon winner", "aria-hidden": "true", children: "★" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h3", { id: "gcp-study-winner", children: "Winning candidate" }),
              /* @__PURE__ */ y.jsx("strong", { children: L.winnerLabel ?? "No winner resolved" }),
              /* @__PURE__ */ y.jsx("span", { children: L.winnerId ? `${xi((ce = L.variants.find((O) => O.id === L.winnerId)) == null ? void 0 : ce.mean)} mean score` : "Check warnings for missing evidence" })
            ] })
          ] })
        ] }),
        L.search && /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-search-plan", "aria-label": "Deterministic parameter search plan", children: [
          /* @__PURE__ */ y.jsx("span", { className: "gcp-eyebrow", children: "Reproducible planner" }),
          /* @__PURE__ */ y.jsx("strong", { children: L.search.strategy === "grid" ? "Complete grid" : "Seeded random" }),
          /* @__PURE__ */ y.jsxs("span", { children: [
            L.search.generatedCandidateCount,
            " generated candidates · ",
            " ",
            L.search.totalDomainAssignments,
            " domain assignments · ",
            " ",
            L.search.totalExecutionCount,
            " executions",
            L.search.plannerSeed === void 0 ? "" : ` · planner seed ${L.search.plannerSeed} (${L.search.prngVersion})`
          ] }),
          /* @__PURE__ */ y.jsx("small", { children: L.search.seedDescription })
        ] }),
        ((k = (U = L.insights) == null ? void 0 : U.summary) == null ? void 0 : k.length) > 0 && /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-findings", children: [
          /* @__PURE__ */ y.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ y.jsx("h3", { id: "gcp-study-findings", children: "Key findings" }) }),
          /* @__PURE__ */ y.jsx("ul", { className: "gcp-lab-findings", children: L.insights.summary.map((O, F) => /* @__PURE__ */ y.jsx("li", { children: O }, `${F}-${O}`)) })
        ] }),
        /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-candidate-leaderboard", children: [
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ y.jsx("h3", { id: "gcp-candidate-leaderboard", children: "Candidate leaderboard" }),
            /* @__PURE__ */ y.jsx("span", { children: L.objective.direction === "maximize" ? "Higher is better" : "Lower is better" })
          ] }),
          /* @__PURE__ */ y.jsx("div", { className: "gcp-leaderboard-wrap", children: /* @__PURE__ */ y.jsxs("table", { className: "gcp-leaderboard", children: [
            /* @__PURE__ */ y.jsx("thead", { children: /* @__PURE__ */ y.jsxs("tr", { children: [
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Rank" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Candidate" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Mean" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Variation" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Runs" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Runtime" }),
              /* @__PURE__ */ y.jsx("th", { scope: "col", children: "Graph" })
            ] }) }),
            /* @__PURE__ */ y.jsx("tbody", { children: ie.map((O, F) => {
              var E, V;
              const Q = O.id === L.winnerId;
              return /* @__PURE__ */ y.jsxs("tr", { className: Q ? "winner" : void 0, children: [
                /* @__PURE__ */ y.jsx("td", { children: /* @__PURE__ */ y.jsx("span", { className: "gcp-rank", children: O.mean === void 0 ? "—" : F + 1 }) }),
                /* @__PURE__ */ y.jsxs("td", { children: [
                  /* @__PURE__ */ y.jsxs("span", { className: "gcp-candidate-name", children: [
                    /* @__PURE__ */ y.jsx("strong", { children: O.label }),
                    Q && /* @__PURE__ */ y.jsx("span", { className: "gcp-winner-tag", children: "Winner" }),
                    O.status !== "completed" && /* @__PURE__ */ y.jsx(vu, { status: O.status })
                  ] }),
                  O.operationSummary && O.operationSummary.length > 0 && /* @__PURE__ */ y.jsx("span", { className: "gcp-candidate-operations", children: O.operationSummary.join(" · ") }),
                  ((E = O.errors) == null ? void 0 : E.length) > 0 && /* @__PURE__ */ y.jsx("span", { className: "gcp-candidate-error", children: O.errors[0] })
                ] }),
                /* @__PURE__ */ y.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ y.jsx("span", { children: xi(O.mean) }),
                  O.baselineComparison && /* @__PURE__ */ y.jsxs("small", { className: "gcp-metric-detail", children: [
                    "improvement ",
                    Zh(O.baselineComparison.objectiveImprovement),
                    O.baselineComparison.hedgesG === void 0 ? "" : ` · g ${Zh(O.baselineComparison.hedgesG)}`
                  ] })
                ] }),
                /* @__PURE__ */ y.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ y.jsx("span", { children: O.stddev === void 0 ? "—" : `± ${xi(O.stddev)}` }),
                  O.confidenceInterval95 && /* @__PURE__ */ y.jsxs("small", { className: "gcp-metric-detail", children: [
                    "95% CI [",
                    xi(O.confidenceInterval95.lower),
                    ", ",
                    xi(O.confidenceInterval95.upper),
                    "]"
                  ] })
                ] }),
                /* @__PURE__ */ y.jsx("td", { children: ((V = O.metricValues) == null ? void 0 : V.length) ?? 0 }),
                /* @__PURE__ */ y.jsx("td", { children: c_(O.runtimeMs) }),
                /* @__PURE__ */ y.jsx("td", { children: /* @__PURE__ */ y.jsx(
                  "button",
                  {
                    type: "button",
                    className: "gcp-candidate-download",
                    disabled: !Y,
                    title: Y ? "Materialize a graph JSON without changing the canvas; recorded fidelity warnings will be shown" : "This legacy summary has no portable candidate specification",
                    onClick: () => se(O.id, O.label),
                    children: "Download"
                  }
                ) })
              ] }, O.id);
            }) })
          ] }) })
        ] }),
        (((ge = (oe = L.insights) == null ? void 0 : oe.warnings) == null ? void 0 : ge.length) > 0 || L.applyConflict) && /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-warnings", children: [
          /* @__PURE__ */ y.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ y.jsx("h3", { id: "gcp-study-warnings", children: "Evidence warnings" }) }),
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-warnings", children: [
            L.applyConflict && /* @__PURE__ */ y.jsx("p", { role: "alert", children: L.applyConflict }),
            (Ne = (re = L.insights) == null ? void 0 : re.warnings) == null ? void 0 : Ne.map((O, F) => /* @__PURE__ */ y.jsx("p", { role: "alert", children: O }, `${F}-${O}`))
          ] })
        ] }),
        ((X = (D = L.insights) == null ? void 0 : D.paperIdeas) == null ? void 0 : X.length) > 0 && /* @__PURE__ */ y.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-paper-ideas", children: [
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ y.jsx("h3", { id: "gcp-paper-ideas", children: "Paper ideas" }),
            /* @__PURE__ */ y.jsx("span", { children: "Research leads, not final claims" })
          ] }),
          /* @__PURE__ */ y.jsx("div", { className: "gcp-paper-grid", children: L.insights.paperIdeas.map((O, F) => /* @__PURE__ */ y.jsxs("article", { className: "gcp-paper-card", children: [
            /* @__PURE__ */ y.jsxs("span", { className: "gcp-paper-index", children: [
              "0",
              F + 1
            ] }),
            /* @__PURE__ */ y.jsx("h4", { children: O.title }),
            /* @__PURE__ */ y.jsxs("dl", { children: [
              /* @__PURE__ */ y.jsxs("div", { children: [
                /* @__PURE__ */ y.jsx("dt", { children: "Evidence" }),
                /* @__PURE__ */ y.jsx("dd", { children: O.evidence })
              ] }),
              /* @__PURE__ */ y.jsxs("div", { children: [
                /* @__PURE__ */ y.jsx("dt", { children: "Next step" }),
                /* @__PURE__ */ y.jsx("dd", { children: O.nextStep })
              ] })
            ] })
          ] }, `${F}-${O.title}`)) })
        ] })
      ] })
    ] }),
    g && /* @__PURE__ */ y.jsx("div", { className: "gcp-study-import-backdrop", children: /* @__PURE__ */ y.jsxs(
      "section",
      {
        className: "gcp-study-import-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gcp-study-import-title",
        children: [
          /* @__PURE__ */ y.jsx("span", { className: "gcp-eyebrow", children: "Content-integrity check passed · authorship unverified" }),
          /* @__PURE__ */ y.jsx("h2", { id: "gcp-study-import-title", children: "Import portable study?" }),
          /* @__PURE__ */ y.jsx("p", { children: g.payload.spec.hypothesis }),
          /* @__PURE__ */ y.jsxs("dl", { children: [
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("dt", { children: "Study ID" }),
              /* @__PURE__ */ y.jsx("dd", { children: g.payload.id })
            ] }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("dt", { children: "Candidates" }),
              /* @__PURE__ */ y.jsx("dd", { children: g.payload.spec.variants.length })
            ] }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("dt", { children: "Run records" }),
              /* @__PURE__ */ y.jsx("dd", { children: g.payload.runs.length })
            ] }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("dt", { children: "Secrets required" }),
              /* @__PURE__ */ y.jsx("dd", { children: g.payload.redactionReport.secretRequirements.length })
            ] }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("dt", { children: "SHA-256" }),
              /* @__PURE__ */ y.jsx("dd", { children: /* @__PURE__ */ y.jsx("code", { children: g.integrity.contentSha256 }) })
            ] })
          ] }),
          /* @__PURE__ */ y.jsx("p", { className: "gcp-study-import-safety", children: "SHA-256 detects content changes only; it does not authenticate the author or evidence source. Import stores the bundle for read-only review and does not execute, replay, apply, or open any graph." }),
          j && /* @__PURE__ */ y.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: j }),
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-study-import-actions", children: [
            /* @__PURE__ */ y.jsx("button", { type: "button", onClick: () => _(null), disabled: x, children: "Cancel" }),
            /* @__PURE__ */ y.jsx("button", { type: "button", className: "primary", onClick: () => {
              ae();
            }, disabled: x, children: x ? "Importing…" : "Import read-only" })
          ] })
        ]
      }
    ) })
  ] });
}
function m_(a) {
  const r = Date.now() - a, l = Math.floor(r / 1e3);
  if (l < 60) return "just now";
  const o = Math.floor(l / 60);
  if (o < 60) return `${o}m ago`;
  const u = Math.floor(o / 60);
  if (u < 24) return `${u}h ago`;
  const d = Math.floor(u / 24);
  return d < 7 ? `${d}d ago` : `${Math.floor(d / 7)}w ago`;
}
function p_({ api: a, activeId: r, onResume: l, onNew: o }) {
  const [u, d] = ee.useState(
    () => bu(a)
  ), [f, v] = ee.useState(null), p = (b, g) => {
    b.stopPropagation(), f === g ? (Ab(a, g), d(bu(a)), f === g && v(null)) : v(g);
  }, h = () => {
    v(null);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ y.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ y.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: o,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    u.length === 0 ? /* @__PURE__ */ y.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ y.jsx("div", { className: "gcp-history-list", onClick: h, children: u.map((b) => /* @__PURE__ */ y.jsxs(
      "div",
      {
        className: `gcp-history-item${b.id === r ? " active" : ""}`,
        onClick: () => l(b),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${b.title || "(untitled)"}`,
        onKeyDown: (g) => {
          (g.key === "Enter" || g.key === " ") && (g.preventDefault(), l(b));
        },
        children: [
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ y.jsx("div", { className: "gcp-history-title", children: b.title || "(untitled)" }),
            /* @__PURE__ */ y.jsxs("div", { className: "gcp-history-meta", children: [
              m_(b.updatedAt),
              " · ",
              b.provider,
              "/",
              b.model || "—"
            ] })
          ] }),
          /* @__PURE__ */ y.jsx(
            "button",
            {
              className: `gcp-history-delete${f === b.id ? " confirm" : ""}`,
              onClick: (g) => p(g, b.id),
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
const Wh = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, h_ = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], y_ = 2e3, g_ = 300 * 1e3;
function v_({
  value: a,
  onBlur: r,
  placeholder: l,
  "aria-label": o
}) {
  const [u, d] = ee.useState(!1), [f, v] = ee.useState(a);
  return ee.useEffect(() => {
    v(a);
  }, [a]), /* @__PURE__ */ y.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ y.jsx(
      "input",
      {
        type: u ? "text" : "password",
        className: "gcp-input",
        value: f,
        onChange: (p) => v(p.target.value),
        onBlur: () => r(f),
        placeholder: l ?? "API key",
        "aria-label": o,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ y.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => d((p) => !p),
        "aria-label": u ? "Hide key" : "Show key",
        title: u ? "Hide" : "Show",
        children: u ? "Hide" : "Show"
      }
    )
  ] });
}
function b_({
  api: a,
  settings: r,
  codexLoggedIn: l,
  codexEmail: o,
  onCodexStatusChange: u,
  onChange: d
}) {
  const f = r.provider, [v, p] = ee.useState([]), [h, b] = ee.useState(!1), [g, _] = ee.useState(null), [j, R] = ee.useState(null), [x, I] = ee.useState(!1), M = ee.useRef(null), L = ee.useRef(0);
  ee.useEffect(() => () => {
    M.current !== null && (clearInterval(M.current), M.current = null);
  }, []), ee.useEffect(() => {
    f === "openai-codex" && Su(a).then((U) => {
      U.status === "logged_in" && u(!0, U.email ?? null);
    }).catch(() => {
    });
  }, []);
  function Y(U) {
    d({ ...r, ...U });
  }
  function ie(U) {
    Y({ models: { ...r.models, [f]: U } });
  }
  function Z(U, k) {
    Y({ apiKeys: { ...r.apiKeys, [U]: k } });
  }
  async function ae() {
    b(!0), _(null);
    try {
      const U = f === "openai" ? r.apiKeys.openai : f === "openrouter" ? r.apiKeys.openrouter : f === "anthropic" ? r.apiKeys.anthropic : f === "custom" ? r.apiKeys.custom : void 0, k = await Ub(
        a,
        f,
        U,
        f === "custom" ? r.customBaseUrl : void 0
      );
      p(k);
    } catch (U) {
      _(String(U));
    } finally {
      b(!1);
    }
  }
  async function G() {
    try {
      const U = await Lb(a);
      window.open(U, "_blank"), I(!0), L.current = Date.now(), M.current = setInterval(async () => {
        try {
          const k = await Su(a);
          k.status === "logged_in" && (u(!0, k.email ?? null), I(!1), M.current !== null && (clearInterval(M.current), M.current = null));
        } catch {
        }
        Date.now() - L.current > g_ && (I(!1), M.current !== null && (clearInterval(M.current), M.current = null));
      }, y_);
    } catch (U) {
      R(String(U));
    }
  }
  async function se() {
    try {
      await Vb(a), u(!1, null), I(!1), M.current !== null && (clearInterval(M.current), M.current = null);
    } catch (U) {
      R(String(U));
    }
  }
  const ce = "gcp-model-datalist";
  return /* @__PURE__ */ y.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ y.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ y.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: f,
          onChange: (U) => Y({ provider: U.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(Wh).map((U) => /* @__PURE__ */ y.jsx("option", { value: U, children: Wh[U] }, U))
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ y.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ y.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ y.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: ce,
            value: r.models[f] ?? "",
            onChange: (U) => ie(U.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ y.jsx("datalist", { id: ce, children: v.map((U) => /* @__PURE__ */ y.jsx("option", { value: U }, U)) }),
        /* @__PURE__ */ y.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: ae,
            disabled: h,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: h ? "Loading..." : "Load list"
          }
        )
      ] }),
      g && /* @__PURE__ */ y.jsx("span", { className: "gcp-field-hint error", role: "alert", children: g })
    ] }),
    f !== "openai-codex" && h_.filter((U) => U === f || f === "custom" && U === "custom").map(
      (U) => U === f ? /* @__PURE__ */ y.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ y.jsx("label", { className: "gcp-label", children: U === "openai" ? "OpenAI API Key" : U === "anthropic" ? "Anthropic API Key" : U === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ y.jsx(
          v_,
          {
            value: r.apiKeys[U] ?? "",
            onBlur: (k) => Z(U, k),
            placeholder: U === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": U === "openai" ? "OpenAI API key" : U === "anthropic" ? "Anthropic API key" : U === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, U) : null
    ),
    f === "custom" && /* @__PURE__ */ y.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ y.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ y.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: r.customBaseUrl,
          onChange: (U) => Y({ customBaseUrl: U.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    f === "openai-codex" && /* @__PURE__ */ y.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ y.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ y.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ y.jsx(
          "div",
          {
            className: `gcp-codex-status${l ? " signed-in" : x ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: l ? `Signed in${o ? ` as ${o}` : ""}` : x ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ y.jsxs("div", { className: "gcp-codex-btns", children: [
          !l && /* @__PURE__ */ y.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: G,
              disabled: x,
              "aria-label": "Sign in with ChatGPT Codex",
              children: x ? "Waiting..." : "Sign in"
            }
          ),
          l && /* @__PURE__ */ y.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: se,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        j && /* @__PURE__ */ y.jsx("span", { className: "gcp-field-hint error", role: "alert", children: j })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function S_() {
  return /* @__PURE__ */ y.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M20 15a3 3 0 0 1-3 3H8l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function __() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ y.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function E_() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ y.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function A_() {
  return /* @__PURE__ */ y.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ y.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ y.jsx("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function x_({ expanded: a }) {
  return a ? /* @__PURE__ */ y.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ y.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function N_() {
  return /* @__PURE__ */ y.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx("path", { d: "m6 6 12 12M18 6 6 18", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }) });
}
function Fh(a) {
  var r, l;
  try {
    const o = (l = (r = a.graph) == null ? void 0 : r.getGraph) == null ? void 0 : l.call(r);
    return o ? {
      nodes: Array.isArray(o.nodes) ? o.nodes.length : 0,
      edges: Array.isArray(o.edges) ? o.edges.length : 0,
      available: !0
    } : { nodes: 0, edges: 0, available: !1 };
  } catch {
    return { nodes: 0, edges: 0, available: !1 };
  }
}
function j_({
  api: a,
  settings: r,
  codexLoggedIn: l,
  codexEmail: o,
  conversation: u,
  onConversationChange: d,
  onSettingsChange: f,
  onCodexStatusChange: v,
  onNewConversation: p,
  onResumeConversation: h,
  onClose: b
}) {
  const [g, _] = ee.useState("chat"), [j, R] = ee.useState("compact"), [x, I] = ee.useState(() => Fh(a));
  ee.useEffect(() => {
    var se, ce;
    const G = () => I(Fh(a));
    G();
    try {
      return (ce = (se = a.graph) == null ? void 0 : se.onGraphChanged) == null ? void 0 : ce.call(se, G);
    } catch {
      return;
    }
  }, [a]);
  const M = (G) => {
    h(G), _("chat");
  }, L = () => {
    p(), _("chat");
  }, Y = (G) => {
    _((se) => se === G && G !== "chat" ? "chat" : G);
  }, ie = r.models[r.provider] ?? "", Z = Number.isFinite(a.apiVersion) ? `API v${a.apiVersion}` : "API legacy", ae = [
    { id: "chat", label: "Chat", ariaLabel: "Agent chat", icon: /* @__PURE__ */ y.jsx(S_, {}) },
    { id: "experiments", label: "Lab", ariaLabel: "Experiments lab", icon: /* @__PURE__ */ y.jsx(__, {}) },
    { id: "history", label: "History", ariaLabel: "Conversation history", icon: /* @__PURE__ */ y.jsx(E_, {}) },
    { id: "settings", label: "Settings", ariaLabel: "Settings", icon: /* @__PURE__ */ y.jsx(A_, {}) }
  ];
  return /* @__PURE__ */ y.jsxs(
    "div",
    {
      className: `gcp-window gcp-window--${j}`,
      role: "dialog",
      "aria-label": "Graph Copilot agent workbench",
      "data-panel-mode": j,
      children: [
        /* @__PURE__ */ y.jsxs("header", { className: "gcp-workbench-header", children: [
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-header-main", children: [
            /* @__PURE__ */ y.jsxs("div", { className: "gcp-brand", children: [
              /* @__PURE__ */ y.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
              /* @__PURE__ */ y.jsxs("span", { className: "gcp-brand-copy", children: [
                /* @__PURE__ */ y.jsx("strong", { children: "Graph Copilot" }),
                /* @__PURE__ */ y.jsx("span", { children: "Agent workbench" })
              ] })
            ] }),
            /* @__PURE__ */ y.jsxs("div", { className: "gcp-header-actions", children: [
              /* @__PURE__ */ y.jsxs(
                "button",
                {
                  className: "gcp-model-chip",
                  onClick: () => _("settings"),
                  "aria-label": "Active model — open settings",
                  title: `Provider: ${r.provider}${ie ? ` · ${ie}` : ""} — click to change`,
                  children: [
                    /* @__PURE__ */ y.jsx("span", { className: "gcp-model-dot", "aria-hidden": "true" }),
                    ie || "Set up model"
                  ]
                }
              ),
              /* @__PURE__ */ y.jsx(
                "button",
                {
                  className: "gcp-icon-btn",
                  onClick: () => R((G) => G === "compact" ? "expanded" : "compact"),
                  "aria-label": j === "compact" ? "Expand panel" : "Use compact panel",
                  title: j === "compact" ? "Expand workspace" : "Compact workspace",
                  children: /* @__PURE__ */ y.jsx(x_, { expanded: j === "expanded" })
                }
              ),
              /* @__PURE__ */ y.jsx("button", { className: "gcp-icon-btn", onClick: b, "aria-label": "Close panel", title: "Close", children: /* @__PURE__ */ y.jsx(N_, {}) })
            ] })
          ] }),
          /* @__PURE__ */ y.jsxs("div", { className: "gcp-context-bar", "aria-label": "Current graph context", children: [
            /* @__PURE__ */ y.jsx("span", { className: `gcp-live-indicator${x.available ? " online" : ""}`, "aria-hidden": "true" }),
            /* @__PURE__ */ y.jsx("span", { className: "gcp-context-name", children: "Current graph" }),
            /* @__PURE__ */ y.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ y.jsx("strong", { children: x.nodes }),
              " nodes"
            ] }),
            /* @__PURE__ */ y.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ y.jsx("strong", { children: x.edges }),
              " edges"
            ] }),
            /* @__PURE__ */ y.jsx("span", { className: "gcp-context-api", children: Z })
          ] }),
          /* @__PURE__ */ y.jsx("nav", { className: "gcp-workbench-nav", "aria-label": "Agent workbench views", children: ae.map((G) => /* @__PURE__ */ y.jsxs(
            "button",
            {
              className: `gcp-nav-btn${g === G.id ? " active" : ""}`,
              onClick: () => Y(G.id),
              "aria-label": G.ariaLabel,
              "aria-current": g === G.id ? "page" : void 0,
              children: [
                G.icon,
                /* @__PURE__ */ y.jsx("span", { children: G.label })
              ]
            },
            G.id
          )) })
        ] }),
        /* @__PURE__ */ y.jsxs("main", { className: "gcp-view", children: [
          g === "chat" && /* @__PURE__ */ y.jsx(
            KS,
            {
              api: a,
              settings: r,
              codexLoggedIn: l,
              conversation: u,
              onConversationChange: d,
              onOpenSettings: () => _("settings"),
              onOpenHistory: () => _("history")
            }
          ),
          g === "experiments" && /* @__PURE__ */ y.jsx(f_, { api: a }),
          g === "history" && /* @__PURE__ */ y.jsx(p_, { api: a, activeId: u.id, onResume: M, onNew: L }),
          g === "settings" && /* @__PURE__ */ y.jsx(
            b_,
            {
              api: a,
              settings: r,
              codexLoggedIn: l,
              codexEmail: o,
              onCodexStatusChange: v,
              onChange: f
            }
          )
        ] })
      ]
    }
  );
}
function w_({ api: a }) {
  const [r, l] = ee.useState(!1), [o, u] = ee.useState(() => Sb(a)), [d, f] = ee.useState(!1), [v, p] = ee.useState(null), [h, b] = ee.useState(
    () => lh(o.provider, o.models[o.provider] ?? "")
  );
  ee.useEffect(() => {
    _b(a, o);
  }, [a, o]), ee.useEffect(() => {
    if (o.provider !== "openai-codex") return;
    let x = !1;
    return Su(a).then((I) => {
      !x && I.status === "logged_in" && (f(!0), p(I.email ?? null));
    }).catch(() => {
    }), () => {
      x = !0;
    };
  }, [a, o.provider]);
  const g = (x) => {
    u(x);
  }, _ = (x, I) => {
    f(x), p(I);
  }, j = () => {
    b(
      lh(
        o.provider,
        o.models[o.provider] ?? ""
      )
    );
  }, R = (x) => {
    b(x);
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ y.jsx(jb, { onClick: () => l((x) => !x) }),
    r && /* @__PURE__ */ y.jsx(
      j_,
      {
        api: a,
        settings: o,
        codexLoggedIn: d,
        codexEmail: v,
        conversation: h,
        onConversationChange: b,
        onSettingsChange: g,
        onCodexStatusChange: _,
        onNewConversation: j,
        onResumeConversation: R,
        onClose: () => l(!1)
      }
    )
  ] });
}
function T_(a) {
  const r = a.ui.addFloatingWidget({ id: "copilot" });
  vb.createRoot(r).render(
    /* @__PURE__ */ y.jsx(db.StrictMode, { children: /* @__PURE__ */ y.jsx(w_, { api: a }) })
  );
}
export {
  T_ as default
};
