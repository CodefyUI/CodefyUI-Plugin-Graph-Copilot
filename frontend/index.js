(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #14171d;--gcp-bg-deep: #0e1116;--gcp-surface: #1a1f27;--gcp-surface-2: #212732;--gcp-surface-hi: rgba(255, 255, 255, .055);--gcp-border: #2a313d;--gcp-border-soft: rgba(255, 255, 255, .07);--gcp-edge-hi: rgba(255, 255, 255, .06);--gcp-text: #e8eaf0;--gcp-dim: #9aa4b4;--gcp-faint: #6b7484;--gcp-accent: #2dd4d8;--gcp-accent-bright: #5ee7ea;--gcp-accent-deep: #0c98a6;--gcp-accent-ink: #04161a;--gcp-accent-soft: rgba(45, 212, 216, .12);--gcp-accent-line: rgba(45, 212, 216, .28);--gcp-grad: linear-gradient(135deg, #46e0e2 0%, #1ab6bf 55%, #0c98a6 100%);--gcp-danger: #f87171;--gcp-warn: #fbbf24;--gcp-ok: #34d399;--gcp-r-lg: 16px;--gcp-r: 11px;--gcp-r-sm: 8px;--gcp-shadow: 0 24px 56px -16px rgba(0, 0, 0, .7), 0 6px 16px rgba(0, 0, 0, .38);--gcp-shadow-sm: 0 4px 14px rgba(0, 0, 0, .35);--gcp-glow: 0 10px 30px -6px rgba(20, 182, 191, .5);--gcp-mono: "Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;--gcp-ease: cubic-bezier(.22, 1, .36, 1);position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:8px;height:8px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:8px;border:2px solid transparent;background-clip:padding-box}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-faint);background-clip:padding-box}.gcp-fab{width:52px;height:52px;border-radius:50%;background:var(--gcp-grad);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--gcp-glow),inset 0 1px #ffffff59;transition:transform .18s var(--gcp-ease),box-shadow .18s var(--gcp-ease),filter .18s var(--gcp-ease);outline:none;animation:gcp-fab-glow 4.5s ease-in-out infinite}.gcp-fab:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50%;background:radial-gradient(closest-side,rgba(45,212,216,.35),transparent 70%);opacity:0;transition:opacity .2s ease;pointer-events:none}.gcp-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.05)}.gcp-fab:hover:after{opacity:1}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:4px}@keyframes gcp-fab-glow{0%,to{box-shadow:0 10px 30px -6px #14b6bf73,inset 0 1px #ffffff59}50%{box-shadow:0 14px 38px -4px #14b6bf9e,inset 0 1px #ffffff59}}.gcp-window{position:fixed;bottom:16px;right:16px;width:432px;height:min(620px,calc(100vh - 96px));background:radial-gradient(120% 60% at 50% -10%,rgba(45,212,216,.06),transparent 60%),var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow);overflow:hidden;animation:gcp-window-in .28s var(--gcp-ease) both}.gcp-window:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;border-top:1px solid var(--gcp-edge-hi);pointer-events:none}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}.gcp-header{display:flex;align-items:center;padding:11px 12px;border-bottom:1px solid var(--gcp-border-soft);gap:8px;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent),var(--gcp-bg-deep);flex-shrink:0;position:relative;z-index:1}.gcp-header-title{flex:1;font-weight:600;font-size:13px;letter-spacing:.01em;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.gcp-header-mark{width:18px;height:18px;border-radius:6px;background:var(--gcp-grad);box-shadow:0 2px 8px #14b6bf73,inset 0 1px #fff6;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:11px;flex-shrink:0}.gcp-icon-btn{width:30px;height:30px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s ease,color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.92)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft)}.gcp-model-chip{height:26px;max-width:148px;min-width:0;padding:0 10px;border-radius:999px;border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:var(--gcp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;transition:color .14s ease,border-color .14s ease,background .14s ease;outline:none;flex-shrink:1}.gcp-model-chip:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-model-chip:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-label-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px 0 9px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-weight:550;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-label-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-2);border-color:var(--gcp-border)}.gcp-label-btn:active{transform:scale(.96)}.gcp-label-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-label-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:46px;height:46px;border-radius:14px;background:var(--gcp-grad);color:var(--gcp-accent-ink);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--gcp-glow),inset 0 1px #fff6;animation:gcp-pop .46s var(--gcp-ease) both}.gcp-welcome-title{font-size:15px;font-weight:650;color:var(--gcp-text);letter-spacing:.01em;animation:gcp-rise .46s var(--gcp-ease) 60ms both}.gcp-welcome-sub{font-size:12.5px;line-height:1.6;color:var(--gcp-dim);animation:gcp-rise .46s var(--gcp-ease) .12s both}.gcp-welcome-history{margin-top:6px;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease;outline:none;animation:gcp-rise .46s var(--gcp-ease) .18s both}.gcp-welcome-history:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-welcome-history:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-welcome-suggestions{display:flex;flex-direction:column;gap:6px;width:100%;margin-top:4px;animation:gcp-rise .46s var(--gcp-ease) .15s both}.gcp-suggestion{padding:8px 12px;border-radius:10px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;text-align:left;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-suggestion:hover{color:var(--gcp-text);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft);transform:translateY(-1px)}.gcp-suggestion:active{transform:none}.gcp-suggestion:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}@keyframes gcp-pop{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .3s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}@keyframes gcp-rise{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.gcp-bubble{max-width:86%;padding:9px 12px;border-radius:var(--gcp-r);line-height:1.55;word-break:break-word;white-space:pre-wrap;font-size:13px;box-shadow:var(--gcp-shadow-sm)}.gcp-msg-row.user .gcp-bubble{background:linear-gradient(180deg,#2dd4d829,#2dd4d81a);border:1px solid var(--gcp-accent-line);color:var(--gcp-text);border-bottom-right-radius:4px}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-text);border-bottom-left-radius:4px;box-shadow:var(--gcp-shadow-sm),inset 0 1px 0 var(--gcp-edge-hi)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);padding:10px 11px;overflow-x:auto;font-size:12px;font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble pre:last-child{margin-bottom:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:12px}.gcp-bubble :not(pre)>code{background:#ffffff12;border:1px solid var(--gcp-border-soft);padding:1px 5px;border-radius:5px;font-size:11.5px}.gcp-bubble .gcp-md-p{margin:0 0 8px}.gcp-bubble .gcp-md-p:last-child{margin-bottom:0}.gcp-md-h1,.gcp-md-h2,.gcp-md-h3{font-weight:700;color:var(--gcp-text);letter-spacing:.01em;margin:10px 0 6px;line-height:1.35}.gcp-md-h1{font-size:14.5px}.gcp-md-h2{font-size:13.5px}.gcp-md-h3{font-size:13px;color:var(--gcp-dim)}.gcp-md-h1:first-child,.gcp-md-h2:first-child,.gcp-md-h3:first-child{margin-top:0}.gcp-md-list{margin:2px 0 8px;padding-left:18px}.gcp-md-list:last-child{margin-bottom:0}.gcp-md-list li{margin:3px 0}.gcp-md-list li::marker{color:var(--gcp-faint)}.gcp-md-hr{border:none;border-top:1px solid var(--gcp-border-soft);margin:10px 0}.gcp-bubble a{color:var(--gcp-accent-bright);text-decoration:underline;text-underline-offset:2px;text-decoration-color:var(--gcp-accent-line)}.gcp-bubble a:hover{text-decoration-color:var(--gcp-accent-bright)}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:86%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block;box-shadow:var(--gcp-shadow-sm)}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);font-size:11.5px;max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:var(--gcp-accent-soft);border:1px solid var(--gcp-accent-line);color:var(--gcp-accent-bright);font-size:11px;line-height:1.5;font-variant-numeric:tabular-nums}.gcp-stages{display:flex;flex-direction:column;gap:4px;width:86%}.gcp-stage{border:1px solid var(--gcp-border-soft);border-radius:9px;background:linear-gradient(180deg,rgba(255,255,255,.015),transparent),var(--gcp-surface);overflow:hidden;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-stage.running{border-color:var(--gcp-accent-line);background:linear-gradient(180deg,rgba(45,212,216,.05),transparent),var(--gcp-surface)}.gcp-stage.error{border-color:#f8717159}.gcp-stage-head{display:flex;align-items:center;gap:8px;width:100%;padding:6px 9px;background:transparent;border:none;color:var(--gcp-dim);font-family:inherit;font-size:12px;text-align:left;cursor:pointer;outline:none;transition:background .13s ease}.gcp-stage-head:not(:disabled):hover{background:var(--gcp-surface-hi)}.gcp-stage-head:disabled{cursor:default}.gcp-stage-head:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:-2px}.gcp-stage-status{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}.gcp-stage.ok .gcp-stage-status{color:var(--gcp-ok);background:#34d39921}.gcp-stage.error .gcp-stage-status{color:var(--gcp-danger);background:#f8717121}.gcp-stage.running .gcp-stage-status{color:var(--gcp-accent)}.gcp-stage-spinner{width:11px;height:11px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);animation:gcp-spin .7s linear infinite}.gcp-stage-label{font-weight:620;font-size:12px;color:var(--gcp-text);white-space:nowrap;flex-shrink:0}.gcp-stage-summary{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}.gcp-stage.error .gcp-stage-summary{color:var(--gcp-danger)}.gcp-stage-chevron{color:var(--gcp-faint);flex-shrink:0;transition:transform .16s var(--gcp-ease)}.gcp-stage-chevron.open{transform:rotate(90deg)}.gcp-stage-detail{margin:0;padding:8px 10px;border-top:1px solid var(--gcp-border-soft);background:var(--gcp-bg-deep);color:var(--gcp-dim);font-family:var(--gcp-mono);font-size:11px;line-height:1.55;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-word}.gcp-thinking{display:flex;align-items:center;gap:8px;padding:2px 2px 6px;font-size:12.5px;animation:gcp-rise .24s var(--gcp-ease) both}.gcp-thinking-orb{color:var(--gcp-accent);font-size:13px;animation:gcp-orb-pulse 1.5s ease-in-out infinite}.gcp-thinking-text{background:linear-gradient(90deg,var(--gcp-dim) 25%,var(--gcp-accent-bright) 50%,var(--gcp-dim) 75%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gcp-shimmer 1.8s linear infinite}.gcp-thinking-time{color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}@keyframes gcp-orb-pulse{0%,to{opacity:.45;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}@keyframes gcp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.gcp-error-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:var(--gcp-r);border:1px solid rgba(248,113,113,.32);background:#f8717112;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-error-icon{color:var(--gcp-danger);margin-top:1px;flex-shrink:0;display:flex}.gcp-error-body{flex:1;min-width:0}.gcp-error-title{font-size:12px;font-weight:650;color:var(--gcp-danger)}.gcp-error-text{font-size:12px;color:var(--gcp-dim);margin-top:2px;word-break:break-word;line-height:1.5}.gcp-retry-btn{padding:5px 13px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;align-self:center;flex-shrink:0}.gcp-retry-btn:hover{background:#f871711f}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:#0e1116c7;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:26px 34px;border:1.5px dashed var(--gcp-accent-line);border-radius:var(--gcp-r);color:var(--gcp-accent-bright);font-size:13px;background:var(--gcp-accent-soft)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 12px;border-top:1px solid var(--gcp-border-soft);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.12)),var(--gcp-bg-deep)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .22s var(--gcp-ease) both}.gcp-chip.error{border-color:#f8717180;background:#f8717114}.gcp-chip-thumb{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-bg-deep);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:12px;color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:10.5px;color:var(--gcp-faint)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:13px;height:13px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-chip-remove{width:18px;height:18px;border-radius:5px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s ease,color .13s ease;outline:none}.gcp-chip-remove:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .14s ease,border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-accent);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-attach-btn:active:not(:disabled){transform:scale(.93)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:13px;padding:8px 11px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .14s ease,box-shadow .14s ease}.gcp-textarea::placeholder{color:var(--gcp-faint)}.gcp-textarea:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-textarea:disabled{opacity:.55;cursor:not-allowed}.gcp-send-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-grad);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px #14b6bf66,inset 0 1px #ffffff4d;transition:filter .14s ease,transform .14s var(--gcp-ease),box-shadow .14s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.08);box-shadow:0 6px 18px #14b6bf8c,inset 0 1px #ffffff4d}.gcp-send-btn:active:not(:disabled){transform:scale(.93)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-surface-2);color:var(--gcp-faint);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:2px}.gcp-stop-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-stop-btn:hover{background:#f871711f}.gcp-stop-btn:active{transform:scale(.93)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-input-hint{font-size:10.5px;color:var(--gcp-faint);text-align:center;letter-spacing:.015em;-webkit-user-select:none;user-select:none;line-height:1.4}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#0e1116db;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 15px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#2dd4d833}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:9px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:13px;font-weight:550;font-family:inherit;cursor:pointer;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-new-btn:hover{background:#2dd4d82e}.gcp-new-btn:active{transform:scale(.99)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:3px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background .14s ease,box-shadow .14s ease;border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-surface-hi)}.gcp-history-item.active{background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--gcp-grad)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:11px;color:var(--gcp-faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:26px;height:26px;border-radius:6px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .13s ease,background .13s ease,opacity .13s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711f}.gcp-history-delete.confirm{color:var(--gcp-danger);background:#f8717124;opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-faint);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:11px;font-weight:650;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.06em}.gcp-select,.gcp-input{width:100%;padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .14s ease,box-shadow .14s ease}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa4b4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:8px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:7px 14px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none}.gcp-codex-btn:hover{background:#2dd4d82e}.gcp-codex-btn.danger{border-color:#f8717180;background:transparent;color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711f}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-faint);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-faint);line-height:1.6;padding-top:6px;border-top:1px solid var(--gcp-border-soft)}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function Uy(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var xf = { exports: {} }, Xn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hd;
function Ry() {
  if (Hd) return Xn;
  Hd = 1;
  var f = Symbol.for("react.transitional.element"), o = Symbol.for("react.fragment");
  function d(s, v, O) {
    var T = null;
    if (O !== void 0 && (T = "" + O), v.key !== void 0 && (T = "" + v.key), "key" in v) {
      O = {};
      for (var D in v)
        D !== "key" && (O[D] = v[D]);
    } else O = v;
    return v = O.ref, {
      $$typeof: f,
      type: s,
      key: T,
      ref: v !== void 0 ? v : null,
      props: O
    };
  }
  return Xn.Fragment = o, Xn.jsx = d, Xn.jsxs = d, Xn;
}
var Bd;
function Hy() {
  return Bd || (Bd = 1, xf.exports = Ry()), xf.exports;
}
var m = Hy(), Of = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qd;
function By() {
  if (qd) return $;
  qd = 1;
  var f = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), v = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), T = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), q = Symbol.iterator;
  function nt(y) {
    return y === null || typeof y != "object" ? null : (y = q && y[q] || y["@@iterator"], typeof y == "function" ? y : null);
  }
  var F = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, Q = Object.assign, ht = {};
  function P(y, N, B) {
    this.props = y, this.context = N, this.refs = ht, this.updater = B || F;
  }
  P.prototype.isReactComponent = {}, P.prototype.setState = function(y, N) {
    if (typeof y != "object" && typeof y != "function" && y != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, y, N, "setState");
  }, P.prototype.forceUpdate = function(y) {
    this.updater.enqueueForceUpdate(this, y, "forceUpdate");
  };
  function Ut() {
  }
  Ut.prototype = P.prototype;
  function mt(y, N, B) {
    this.props = y, this.context = N, this.refs = ht, this.updater = B || F;
  }
  var Lt = mt.prototype = new Ut();
  Lt.constructor = mt, Q(Lt, P.prototype), Lt.isPureReactComponent = !0;
  var Ft = Array.isArray;
  function Nt() {
  }
  var J = { H: null, A: null, T: null, S: null }, Ot = Object.prototype.hasOwnProperty;
  function yt(y, N, B) {
    var L = B.ref;
    return {
      $$typeof: f,
      type: y,
      key: N,
      ref: L !== void 0 ? L : null,
      props: B
    };
  }
  function G(y, N) {
    return yt(y.type, N, y.props);
  }
  function At(y) {
    return typeof y == "object" && y !== null && y.$$typeof === f;
  }
  function Qt(y) {
    var N = { "=": "=0", ":": "=2" };
    return "$" + y.replace(/[=:]/g, function(B) {
      return N[B];
    });
  }
  var Rl = /\/+/g;
  function Sl(y, N) {
    return typeof y == "object" && y !== null && y.key != null ? Qt("" + y.key) : N.toString(36);
  }
  function It(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (typeof y.status == "string" ? y.then(Nt, Nt) : (y.status = "pending", y.then(
          function(N) {
            y.status === "pending" && (y.status = "fulfilled", y.value = N);
          },
          function(N) {
            y.status === "pending" && (y.status = "rejected", y.reason = N);
          }
        )), y.status) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function z(y, N, B, L, k) {
    var tt = typeof y;
    (tt === "undefined" || tt === "boolean") && (y = null);
    var st = !1;
    if (y === null) st = !0;
    else
      switch (tt) {
        case "bigint":
        case "string":
        case "number":
          st = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case f:
            case o:
              st = !0;
              break;
            case H:
              return st = y._init, z(
                st(y._payload),
                N,
                B,
                L,
                k
              );
          }
      }
    if (st)
      return k = k(y), st = L === "" ? "." + Sl(y, 0) : L, Ft(k) ? (B = "", st != null && (B = st.replace(Rl, "$&/") + "/"), z(k, N, B, "", function(Ce) {
        return Ce;
      })) : k != null && (At(k) && (k = G(
        k,
        B + (k.key == null || y && y.key === k.key ? "" : ("" + k.key).replace(
          Rl,
          "$&/"
        ) + "/") + st
      )), N.push(k)), 1;
    st = 0;
    var Kt = L === "" ? "." : L + ":";
    if (Ft(y))
      for (var Mt = 0; Mt < y.length; Mt++)
        L = y[Mt], tt = Kt + Sl(L, Mt), st += z(
          L,
          N,
          B,
          tt,
          k
        );
    else if (Mt = nt(y), typeof Mt == "function")
      for (y = Mt.call(y), Mt = 0; !(L = y.next()).done; )
        L = L.value, tt = Kt + Sl(L, Mt++), st += z(
          L,
          N,
          B,
          tt,
          k
        );
    else if (tt === "object") {
      if (typeof y.then == "function")
        return z(
          It(y),
          N,
          B,
          L,
          k
        );
      throw N = String(y), Error(
        "Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(y).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return st;
  }
  function R(y, N, B) {
    if (y == null) return y;
    var L = [], k = 0;
    return z(y, L, "", "", function(tt) {
      return N.call(B, tt, k++);
    }), L;
  }
  function K(y) {
    if (y._status === -1) {
      var N = y._result;
      N = N(), N.then(
        function(B) {
          (y._status === 0 || y._status === -1) && (y._status = 1, y._result = B);
        },
        function(B) {
          (y._status === 0 || y._status === -1) && (y._status = 2, y._result = B);
        }
      ), y._status === -1 && (y._status = 0, y._result = N);
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var ft = typeof reportError == "function" ? reportError : function(y) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var N = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof y == "object" && y !== null && typeof y.message == "string" ? String(y.message) : String(y),
        error: y
      });
      if (!window.dispatchEvent(N)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", y);
      return;
    }
    console.error(y);
  }, gt = {
    map: R,
    forEach: function(y, N, B) {
      R(
        y,
        function() {
          N.apply(this, arguments);
        },
        B
      );
    },
    count: function(y) {
      var N = 0;
      return R(y, function() {
        N++;
      }), N;
    },
    toArray: function(y) {
      return R(y, function(N) {
        return N;
      }) || [];
    },
    only: function(y) {
      if (!At(y))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return y;
    }
  };
  return $.Activity = U, $.Children = gt, $.Component = P, $.Fragment = d, $.Profiler = v, $.PureComponent = mt, $.StrictMode = s, $.Suspense = E, $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = J, $.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(y) {
      return J.H.useMemoCache(y);
    }
  }, $.cache = function(y) {
    return function() {
      return y.apply(null, arguments);
    };
  }, $.cacheSignal = function() {
    return null;
  }, $.cloneElement = function(y, N, B) {
    if (y == null)
      throw Error(
        "The argument must be a React element, but you passed " + y + "."
      );
    var L = Q({}, y.props), k = y.key;
    if (N != null)
      for (tt in N.key !== void 0 && (k = "" + N.key), N)
        !Ot.call(N, tt) || tt === "key" || tt === "__self" || tt === "__source" || tt === "ref" && N.ref === void 0 || (L[tt] = N[tt]);
    var tt = arguments.length - 2;
    if (tt === 1) L.children = B;
    else if (1 < tt) {
      for (var st = Array(tt), Kt = 0; Kt < tt; Kt++)
        st[Kt] = arguments[Kt + 2];
      L.children = st;
    }
    return yt(y.type, k, L);
  }, $.createContext = function(y) {
    return y = {
      $$typeof: T,
      _currentValue: y,
      _currentValue2: y,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, y.Provider = y, y.Consumer = {
      $$typeof: O,
      _context: y
    }, y;
  }, $.createElement = function(y, N, B) {
    var L, k = {}, tt = null;
    if (N != null)
      for (L in N.key !== void 0 && (tt = "" + N.key), N)
        Ot.call(N, L) && L !== "key" && L !== "__self" && L !== "__source" && (k[L] = N[L]);
    var st = arguments.length - 2;
    if (st === 1) k.children = B;
    else if (1 < st) {
      for (var Kt = Array(st), Mt = 0; Mt < st; Mt++)
        Kt[Mt] = arguments[Mt + 2];
      k.children = Kt;
    }
    if (y && y.defaultProps)
      for (L in st = y.defaultProps, st)
        k[L] === void 0 && (k[L] = st[L]);
    return yt(y, tt, k);
  }, $.createRef = function() {
    return { current: null };
  }, $.forwardRef = function(y) {
    return { $$typeof: D, render: y };
  }, $.isValidElement = At, $.lazy = function(y) {
    return {
      $$typeof: H,
      _payload: { _status: -1, _result: y },
      _init: K
    };
  }, $.memo = function(y, N) {
    return {
      $$typeof: g,
      type: y,
      compare: N === void 0 ? null : N
    };
  }, $.startTransition = function(y) {
    var N = J.T, B = {};
    J.T = B;
    try {
      var L = y(), k = J.S;
      k !== null && k(B, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(Nt, ft);
    } catch (tt) {
      ft(tt);
    } finally {
      N !== null && B.types !== null && (N.types = B.types), J.T = N;
    }
  }, $.unstable_useCacheRefresh = function() {
    return J.H.useCacheRefresh();
  }, $.use = function(y) {
    return J.H.use(y);
  }, $.useActionState = function(y, N, B) {
    return J.H.useActionState(y, N, B);
  }, $.useCallback = function(y, N) {
    return J.H.useCallback(y, N);
  }, $.useContext = function(y) {
    return J.H.useContext(y);
  }, $.useDebugValue = function() {
  }, $.useDeferredValue = function(y, N) {
    return J.H.useDeferredValue(y, N);
  }, $.useEffect = function(y, N) {
    return J.H.useEffect(y, N);
  }, $.useEffectEvent = function(y) {
    return J.H.useEffectEvent(y);
  }, $.useId = function() {
    return J.H.useId();
  }, $.useImperativeHandle = function(y, N, B) {
    return J.H.useImperativeHandle(y, N, B);
  }, $.useInsertionEffect = function(y, N) {
    return J.H.useInsertionEffect(y, N);
  }, $.useLayoutEffect = function(y, N) {
    return J.H.useLayoutEffect(y, N);
  }, $.useMemo = function(y, N) {
    return J.H.useMemo(y, N);
  }, $.useOptimistic = function(y, N) {
    return J.H.useOptimistic(y, N);
  }, $.useReducer = function(y, N, B) {
    return J.H.useReducer(y, N, B);
  }, $.useRef = function(y) {
    return J.H.useRef(y);
  }, $.useState = function(y) {
    return J.H.useState(y);
  }, $.useSyncExternalStore = function(y, N, B) {
    return J.H.useSyncExternalStore(
      y,
      N,
      B
    );
  }, $.useTransition = function() {
    return J.H.useTransition();
  }, $.version = "19.2.7", $;
}
var Yd;
function Bf() {
  return Yd || (Yd = 1, Of.exports = By()), Of.exports;
}
var w = Bf();
const qy = /* @__PURE__ */ Uy(w);
var jf = { exports: {} }, Qn = {}, Mf = { exports: {} }, Nf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gd;
function Yy() {
  return Gd || (Gd = 1, (function(f) {
    function o(z, R) {
      var K = z.length;
      z.push(R);
      t: for (; 0 < K; ) {
        var ft = K - 1 >>> 1, gt = z[ft];
        if (0 < v(gt, R))
          z[ft] = R, z[K] = gt, K = ft;
        else break t;
      }
    }
    function d(z) {
      return z.length === 0 ? null : z[0];
    }
    function s(z) {
      if (z.length === 0) return null;
      var R = z[0], K = z.pop();
      if (K !== R) {
        z[0] = K;
        t: for (var ft = 0, gt = z.length, y = gt >>> 1; ft < y; ) {
          var N = 2 * (ft + 1) - 1, B = z[N], L = N + 1, k = z[L];
          if (0 > v(B, K))
            L < gt && 0 > v(k, B) ? (z[ft] = k, z[L] = K, ft = L) : (z[ft] = B, z[N] = K, ft = N);
          else if (L < gt && 0 > v(k, K))
            z[ft] = k, z[L] = K, ft = L;
          else break t;
        }
      }
      return R;
    }
    function v(z, R) {
      var K = z.sortIndex - R.sortIndex;
      return K !== 0 ? K : z.id - R.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var O = performance;
      f.unstable_now = function() {
        return O.now();
      };
    } else {
      var T = Date, D = T.now();
      f.unstable_now = function() {
        return T.now() - D;
      };
    }
    var E = [], g = [], H = 1, U = null, q = 3, nt = !1, F = !1, Q = !1, ht = !1, P = typeof setTimeout == "function" ? setTimeout : null, Ut = typeof clearTimeout == "function" ? clearTimeout : null, mt = typeof setImmediate < "u" ? setImmediate : null;
    function Lt(z) {
      for (var R = d(g); R !== null; ) {
        if (R.callback === null) s(g);
        else if (R.startTime <= z)
          s(g), R.sortIndex = R.expirationTime, o(E, R);
        else break;
        R = d(g);
      }
    }
    function Ft(z) {
      if (Q = !1, Lt(z), !F)
        if (d(E) !== null)
          F = !0, Nt || (Nt = !0, Qt());
        else {
          var R = d(g);
          R !== null && It(Ft, R.startTime - z);
        }
    }
    var Nt = !1, J = -1, Ot = 5, yt = -1;
    function G() {
      return ht ? !0 : !(f.unstable_now() - yt < Ot);
    }
    function At() {
      if (ht = !1, Nt) {
        var z = f.unstable_now();
        yt = z;
        var R = !0;
        try {
          t: {
            F = !1, Q && (Q = !1, Ut(J), J = -1), nt = !0;
            var K = q;
            try {
              l: {
                for (Lt(z), U = d(E); U !== null && !(U.expirationTime > z && G()); ) {
                  var ft = U.callback;
                  if (typeof ft == "function") {
                    U.callback = null, q = U.priorityLevel;
                    var gt = ft(
                      U.expirationTime <= z
                    );
                    if (z = f.unstable_now(), typeof gt == "function") {
                      U.callback = gt, Lt(z), R = !0;
                      break l;
                    }
                    U === d(E) && s(E), Lt(z);
                  } else s(E);
                  U = d(E);
                }
                if (U !== null) R = !0;
                else {
                  var y = d(g);
                  y !== null && It(
                    Ft,
                    y.startTime - z
                  ), R = !1;
                }
              }
              break t;
            } finally {
              U = null, q = K, nt = !1;
            }
            R = void 0;
          }
        } finally {
          R ? Qt() : Nt = !1;
        }
      }
    }
    var Qt;
    if (typeof mt == "function")
      Qt = function() {
        mt(At);
      };
    else if (typeof MessageChannel < "u") {
      var Rl = new MessageChannel(), Sl = Rl.port2;
      Rl.port1.onmessage = At, Qt = function() {
        Sl.postMessage(null);
      };
    } else
      Qt = function() {
        P(At, 0);
      };
    function It(z, R) {
      J = P(function() {
        z(f.unstable_now());
      }, R);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, f.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Ot = 0 < z ? Math.floor(1e3 / z) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return q;
    }, f.unstable_next = function(z) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = q;
      }
      var K = q;
      q = R;
      try {
        return z();
      } finally {
        q = K;
      }
    }, f.unstable_requestPaint = function() {
      ht = !0;
    }, f.unstable_runWithPriority = function(z, R) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var K = q;
      q = z;
      try {
        return R();
      } finally {
        q = K;
      }
    }, f.unstable_scheduleCallback = function(z, R, K) {
      var ft = f.unstable_now();
      switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ft + K : ft) : K = ft, z) {
        case 1:
          var gt = -1;
          break;
        case 2:
          gt = 250;
          break;
        case 5:
          gt = 1073741823;
          break;
        case 4:
          gt = 1e4;
          break;
        default:
          gt = 5e3;
      }
      return gt = K + gt, z = {
        id: H++,
        callback: R,
        priorityLevel: z,
        startTime: K,
        expirationTime: gt,
        sortIndex: -1
      }, K > ft ? (z.sortIndex = K, o(g, z), d(E) === null && z === d(g) && (Q ? (Ut(J), J = -1) : Q = !0, It(Ft, K - ft))) : (z.sortIndex = gt, o(E, z), F || nt || (F = !0, Nt || (Nt = !0, Qt()))), z;
    }, f.unstable_shouldYield = G, f.unstable_wrapCallback = function(z) {
      var R = q;
      return function() {
        var K = q;
        q = R;
        try {
          return z.apply(this, arguments);
        } finally {
          q = K;
        }
      };
    };
  })(Nf)), Nf;
}
var Ld;
function Gy() {
  return Ld || (Ld = 1, Mf.exports = Yy()), Mf.exports;
}
var Df = { exports: {} }, tl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xd;
function Ly() {
  if (Xd) return tl;
  Xd = 1;
  var f = Bf();
  function o(E) {
    var g = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var H = 2; H < arguments.length; H++)
        g += "&args[]=" + encodeURIComponent(arguments[H]);
    }
    return "Minified React error #" + E + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function d() {
  }
  var s = {
    d: {
      f: d,
      r: function() {
        throw Error(o(522));
      },
      D: d,
      C: d,
      L: d,
      m: d,
      X: d,
      S: d,
      M: d
    },
    p: 0,
    findDOMNode: null
  }, v = Symbol.for("react.portal");
  function O(E, g, H) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: v,
      key: U == null ? null : "" + U,
      children: E,
      containerInfo: g,
      implementation: H
    };
  }
  var T = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function D(E, g) {
    if (E === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return tl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, tl.createPortal = function(E, g) {
    var H = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(o(299));
    return O(E, g, null, H);
  }, tl.flushSync = function(E) {
    var g = T.T, H = s.p;
    try {
      if (T.T = null, s.p = 2, E) return E();
    } finally {
      T.T = g, s.p = H, s.d.f();
    }
  }, tl.preconnect = function(E, g) {
    typeof E == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, s.d.C(E, g));
  }, tl.prefetchDNS = function(E) {
    typeof E == "string" && s.d.D(E);
  }, tl.preinit = function(E, g) {
    if (typeof E == "string" && g && typeof g.as == "string") {
      var H = g.as, U = D(H, g.crossOrigin), q = typeof g.integrity == "string" ? g.integrity : void 0, nt = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      H === "style" ? s.d.S(
        E,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: U,
          integrity: q,
          fetchPriority: nt
        }
      ) : H === "script" && s.d.X(E, {
        crossOrigin: U,
        integrity: q,
        fetchPriority: nt,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, tl.preinitModule = function(E, g) {
    if (typeof E == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var H = D(
            g.as,
            g.crossOrigin
          );
          s.d.M(E, {
            crossOrigin: H,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0
          });
        }
      } else g == null && s.d.M(E);
  }, tl.preload = function(E, g) {
    if (typeof E == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var H = g.as, U = D(H, g.crossOrigin);
      s.d.L(E, H, {
        crossOrigin: U,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, tl.preloadModule = function(E, g) {
    if (typeof E == "string")
      if (g) {
        var H = D(g.as, g.crossOrigin);
        s.d.m(E, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: H,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0
        });
      } else s.d.m(E);
  }, tl.requestFormReset = function(E) {
    s.d.r(E);
  }, tl.unstable_batchedUpdates = function(E, g) {
    return E(g);
  }, tl.useFormState = function(E, g, H) {
    return T.H.useFormState(E, g, H);
  }, tl.useFormStatus = function() {
    return T.H.useHostTransitionStatus();
  }, tl.version = "19.2.7", tl;
}
var Qd;
function Xy() {
  if (Qd) return Df.exports;
  Qd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return f(), Df.exports = Ly(), Df.exports;
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
var Zd;
function Qy() {
  if (Zd) return Qn;
  Zd = 1;
  var f = Gy(), o = Bf(), d = Xy();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function v(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function O(t) {
    var l = t, e = t;
    if (t.alternate) for (; l.return; ) l = l.return;
    else {
      t = l;
      do
        l = t, (l.flags & 4098) !== 0 && (e = l.return), t = l.return;
      while (t);
    }
    return l.tag === 3 ? e : null;
  }
  function T(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function D(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function E(t) {
    if (O(t) !== t)
      throw Error(s(188));
  }
  function g(t) {
    var l = t.alternate;
    if (!l) {
      if (l = O(t), l === null) throw Error(s(188));
      return l !== t ? null : t;
    }
    for (var e = t, a = l; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (a = n.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return E(n), t;
          if (u === a) return E(n), l;
          u = u.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = n, a = u;
      else {
        for (var i = !1, c = n.child; c; ) {
          if (c === e) {
            i = !0, e = n, a = u;
            break;
          }
          if (c === a) {
            i = !0, a = n, e = u;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = u.child; c; ) {
            if (c === e) {
              i = !0, e = u, a = n;
              break;
            }
            if (c === a) {
              i = !0, a = u, e = n;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? t : l;
  }
  function H(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = H(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var U = Object.assign, q = Symbol.for("react.element"), nt = Symbol.for("react.transitional.element"), F = Symbol.for("react.portal"), Q = Symbol.for("react.fragment"), ht = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), Ut = Symbol.for("react.consumer"), mt = Symbol.for("react.context"), Lt = Symbol.for("react.forward_ref"), Ft = Symbol.for("react.suspense"), Nt = Symbol.for("react.suspense_list"), J = Symbol.for("react.memo"), Ot = Symbol.for("react.lazy"), yt = Symbol.for("react.activity"), G = Symbol.for("react.memo_cache_sentinel"), At = Symbol.iterator;
  function Qt(t) {
    return t === null || typeof t != "object" ? null : (t = At && t[At] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Rl = Symbol.for("react.client.reference");
  function Sl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Rl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case Q:
        return "Fragment";
      case P:
        return "Profiler";
      case ht:
        return "StrictMode";
      case Ft:
        return "Suspense";
      case Nt:
        return "SuspenseList";
      case yt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case F:
          return "Portal";
        case mt:
          return t.displayName || "Context";
        case Ut:
          return (t._context.displayName || "Context") + ".Consumer";
        case Lt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case J:
          return l = t.displayName || null, l !== null ? l : Sl(t.type) || "Memo";
        case Ot:
          l = t._payload, t = t._init;
          try {
            return Sl(t(l));
          } catch {
          }
      }
    return null;
  }
  var It = Array.isArray, z = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ft = [], gt = -1;
  function y(t) {
    return { current: t };
  }
  function N(t) {
    0 > gt || (t.current = ft[gt], ft[gt] = null, gt--);
  }
  function B(t, l) {
    gt++, ft[gt] = t.current, t.current = l;
  }
  var L = y(null), k = y(null), tt = y(null), st = y(null);
  function Kt(t, l) {
    switch (B(tt, l), B(k, t), B(L, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? nd(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = nd(l), t = ud(l, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    N(L), B(L, t);
  }
  function Mt() {
    N(L), N(k), N(tt);
  }
  function Ce(t) {
    t.memoizedState !== null && B(st, t);
    var l = L.current, e = ud(l, t.type);
    l !== e && (B(k, t), B(L, e));
  }
  function Ll(t) {
    k.current === t && (N(L), N(k)), st.current === t && (N(st), qn._currentValue = K);
  }
  var Qa, wn;
  function Xl(t) {
    if (Qa === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Qa = l && l[1] || "", wn = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qa + t + wn;
  }
  var Za = !1;
  function Va(t, l) {
    if (!t || Za) return "";
    Za = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var M = function() {
                throw Error();
              };
              if (Object.defineProperty(M.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(M, []);
                } catch (A) {
                  var _ = A;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (A) {
                  _ = A;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (A) {
                _ = A;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (A) {
            if (A && _ && typeof A.stack == "string")
              return [A.stack, _.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      n && n.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = a.DetermineComponentFrameRoot(), i = u[0], c = u[1];
      if (i && c) {
        var r = i.split(`
`), b = c.split(`
`);
        for (n = a = 0; a < r.length && !r[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < b.length && !b[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === r.length || n === b.length)
          for (a = r.length - 1, n = b.length - 1; 1 <= a && 0 <= n && r[a] !== b[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== b[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || r[a] !== b[n]) {
                  var x = `
` + r[a].replace(" at new ", " at ");
                  return t.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", t.displayName)), x;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      Za = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Xl(e) : "";
  }
  function ta(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Xl(t.type);
      case 16:
        return Xl("Lazy");
      case 13:
        return t.child !== l && l !== null ? Xl("Suspense Fallback") : Xl("Suspense");
      case 19:
        return Xl("SuspenseList");
      case 0:
      case 15:
        return Va(t.type, !1);
      case 11:
        return Va(t.type.render, !1);
      case 1:
        return Va(t.type, !0);
      case 31:
        return Xl("Activity");
      default:
        return "";
    }
  }
  function Ka(t) {
    try {
      var l = "", e = null;
      do
        l += ta(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var la = Object.prototype.hasOwnProperty, wa = f.unstable_scheduleCallback, Ja = f.unstable_cancelCallback, Jn = f.unstable_shouldYield, C = f.unstable_requestPaint, lt = f.unstable_now, Pt = f.unstable_getCurrentPriorityLevel, Ue = f.unstable_ImmediatePriority, Et = f.unstable_UserBlockingPriority, Nl = f.unstable_NormalPriority, sl = f.unstable_LowPriority, Ql = f.unstable_IdlePriority, Hl = f.log, di = f.unstable_setDisableYieldValue, ka = null, ol = null;
  function ce(t) {
    if (typeof Hl == "function" && di(t), ol && typeof ol.setStrictMode == "function")
      try {
        ol.setStrictMode(ka, t);
      } catch {
      }
  }
  var rl = Math.clz32 ? Math.clz32 : Sh, vh = Math.log, ph = Math.LN2;
  function Sh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (vh(t) / ph | 0) | 0;
  }
  var kn = 256, $n = 262144, Wn = 4194304;
  function Re(t) {
    var l = t & 42;
    if (l !== 0) return l;
    switch (t & -t) {
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
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
        return t;
    }
  }
  function Fn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~u, a !== 0 ? n = Re(a) : (i &= c, i !== 0 ? n = Re(i) : e || (e = c & ~t, e !== 0 && (n = Re(e))))) : (c = a & ~u, c !== 0 ? n = Re(c) : i !== 0 ? n = Re(i) : e || (e = a & ~t, e !== 0 && (n = Re(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function $a(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function bh(t, l) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return l + 250;
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
        return l + 5e3;
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
  function Yf() {
    var t = Wn;
    return Wn <<= 1, (Wn & 62914560) === 0 && (Wn = 4194304), t;
  }
  function hi(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Wa(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function _h(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, r = t.expirationTimes, b = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var x = 31 - rl(e), M = 1 << x;
      c[x] = 0, r[x] = -1;
      var _ = b[x];
      if (_ !== null)
        for (b[x] = null, x = 0; x < _.length; x++) {
          var A = _[x];
          A !== null && (A.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && Gf(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function Gf(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - rl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Lf(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - rl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Xf(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : mi(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function mi(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function yi(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Qf() {
    var t = R.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : jd(t.type));
  }
  function Zf(t, l) {
    var e = R.p;
    try {
      return R.p = t, l();
    } finally {
      R.p = e;
    }
  }
  var fe = Math.random().toString(36).slice(2), wt = "__reactFiber$" + fe, el = "__reactProps$" + fe, ea = "__reactContainer$" + fe, gi = "__reactEvents$" + fe, Eh = "__reactListeners$" + fe, Th = "__reactHandles$" + fe, Vf = "__reactResources$" + fe, Fa = "__reactMarker$" + fe;
  function vi(t) {
    delete t[wt], delete t[el], delete t[gi], delete t[Eh], delete t[Th];
  }
  function aa(t) {
    var l = t[wt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[ea] || e[wt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = dd(t); t !== null; ) {
            if (e = t[wt]) return e;
            t = dd(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function na(t) {
    if (t = t[wt] || t[ea]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Ia(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ua(t) {
    var l = t[Vf];
    return l || (l = t[Vf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Zt(t) {
    t[Fa] = !0;
  }
  var Kf = /* @__PURE__ */ new Set(), wf = {};
  function He(t, l) {
    ia(t, l), ia(t + "Capture", l);
  }
  function ia(t, l) {
    for (wf[t] = l, t = 0; t < l.length; t++)
      Kf.add(l[t]);
  }
  var Ah = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Jf = {}, kf = {};
  function zh(t) {
    return la.call(kf, t) ? !0 : la.call(Jf, t) ? !1 : Ah.test(t) ? kf[t] = !0 : (Jf[t] = !0, !1);
  }
  function In(t, l, e) {
    if (zh(l))
      if (e === null) t.removeAttribute(l);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(l);
            return;
          case "boolean":
            var a = l.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(l);
              return;
            }
        }
        t.setAttribute(l, "" + e);
      }
  }
  function Pn(t, l, e) {
    if (e === null) t.removeAttribute(l);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttribute(l, "" + e);
    }
  }
  function Zl(t, l, e, a) {
    if (a === null) t.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttributeNS(l, e, "" + a);
    }
  }
  function bl(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function $f(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function xh(t, l, e) {
    var a = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      l
    );
    if (!t.hasOwnProperty(l) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var n = a.get, u = a.set;
      return Object.defineProperty(t, l, {
        configurable: !0,
        get: function() {
          return n.call(this);
        },
        set: function(i) {
          e = "" + i, u.call(this, i);
        }
      }), Object.defineProperty(t, l, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[l];
        }
      };
    }
  }
  function pi(t) {
    if (!t._valueTracker) {
      var l = $f(t) ? "checked" : "value";
      t._valueTracker = xh(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Wf(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = $f(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function tu(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Oh = /[\n"\\]/g;
  function _l(t) {
    return t.replace(
      Oh,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Si(t, l, e, a, n, u, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + bl(l)) : t.value !== "" + bl(l) && (t.value = "" + bl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? bi(t, i, bl(l)) : e != null ? bi(t, i, bl(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + bl(c) : t.removeAttribute("name");
  }
  function Ff(t, l, e, a, n, u, i, c) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        pi(t);
        return;
      }
      e = e != null ? "" + bl(e) : "", l = l != null ? "" + bl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), pi(t);
  }
  function bi(t, l, e) {
    l === "number" && tu(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function ca(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + bl(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function If(t, l, e) {
    if (l != null && (l = "" + bl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + bl(e) : "";
  }
  function Pf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (It(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = bl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), pi(t);
  }
  function fa(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var jh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ts(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || jh.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function ls(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && ts(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && ts(t, u, l[u]);
  }
  function _i(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
  var Mh = /* @__PURE__ */ new Map([
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
  ]), Nh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function lu(t) {
    return Nh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Vl() {
  }
  var Ei = null;
  function Ti(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var sa = null, oa = null;
  function es(t) {
    var l = na(t);
    if (l && (t = l.stateNode)) {
      var e = t[el] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (Si(
            t,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), l = e.name, e.type === "radio" && l != null) {
            for (e = t; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + _l(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[el] || null;
                if (!n) throw Error(s(90));
                Si(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name
                );
              }
            }
            for (l = 0; l < e.length; l++)
              a = e[l], a.form === t.form && Wf(a);
          }
          break t;
        case "textarea":
          If(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && ca(t, !!e.multiple, l, !1);
      }
    }
  }
  var Ai = !1;
  function as(t, l, e) {
    if (Ai) return t(l, e);
    Ai = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (Ai = !1, (sa !== null || oa !== null) && (Qu(), sa && (l = sa, t = oa, oa = sa = null, es(l), t)))
        for (l = 0; l < t.length; l++) es(t[l]);
    }
  }
  function Pa(t, l) {
    var e = t.stateNode;
    if (e === null) return null;
    var a = e[el] || null;
    if (a === null) return null;
    e = a[l];
    t: switch (l) {
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
        (a = !a.disabled) || (t = t.type, a = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !a;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (e && typeof e != "function")
      throw Error(
        s(231, l, typeof e)
      );
    return e;
  }
  var Kl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zi = !1;
  if (Kl)
    try {
      var tn = {};
      Object.defineProperty(tn, "passive", {
        get: function() {
          zi = !0;
        }
      }), window.addEventListener("test", tn, tn), window.removeEventListener("test", tn, tn);
    } catch {
      zi = !1;
    }
  var se = null, xi = null, eu = null;
  function ns() {
    if (eu) return eu;
    var t, l = xi, e = l.length, a, n = "value" in se ? se.value : se.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return eu = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function au(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function nu() {
    return !0;
  }
  function us() {
    return !1;
  }
  function al(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(u) : u[c]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? nu : us, this.isPropagationStopped = us, this;
    }
    return U(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = nu);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = nu);
      },
      persist: function() {
      },
      isPersistent: nu
    }), l;
  }
  var Be = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, uu = al(Be), ln = U({}, Be, { view: 0, detail: 0 }), Dh = al(ln), Oi, ji, en, iu = U({}, ln, {
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
    getModifierState: Ni,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== en && (en && t.type === "mousemove" ? (Oi = t.screenX - en.screenX, ji = t.screenY - en.screenY) : ji = Oi = 0, en = t), Oi);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ji;
    }
  }), is = al(iu), Ch = U({}, iu, { dataTransfer: 0 }), Uh = al(Ch), Rh = U({}, ln, { relatedTarget: 0 }), Mi = al(Rh), Hh = U({}, Be, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Bh = al(Hh), qh = U({}, Be, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Yh = al(qh), Gh = U({}, Be, { data: 0 }), cs = al(Gh), Lh = {
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
  }, Xh = {
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
  }, Qh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Zh(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Qh[t]) ? !!l[t] : !1;
  }
  function Ni() {
    return Zh;
  }
  var Vh = U({}, ln, {
    key: function(t) {
      if (t.key) {
        var l = Lh[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = au(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Xh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ni,
    charCode: function(t) {
      return t.type === "keypress" ? au(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? au(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Kh = al(Vh), wh = U({}, iu, {
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
  }), fs = al(wh), Jh = U({}, ln, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ni
  }), kh = al(Jh), $h = U({}, Be, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Wh = al($h), Fh = U({}, iu, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ih = al(Fh), Ph = U({}, Be, {
    newState: 0,
    oldState: 0
  }), tm = al(Ph), lm = [9, 13, 27, 32], Di = Kl && "CompositionEvent" in window, an = null;
  Kl && "documentMode" in document && (an = document.documentMode);
  var em = Kl && "TextEvent" in window && !an, ss = Kl && (!Di || an && 8 < an && 11 >= an), os = " ", rs = !1;
  function ds(t, l) {
    switch (t) {
      case "keyup":
        return lm.indexOf(l.keyCode) !== -1;
      case "keydown":
        return l.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hs(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ra = !1;
  function am(t, l) {
    switch (t) {
      case "compositionend":
        return hs(l);
      case "keypress":
        return l.which !== 32 ? null : (rs = !0, os);
      case "textInput":
        return t = l.data, t === os && rs ? null : t;
      default:
        return null;
    }
  }
  function nm(t, l) {
    if (ra)
      return t === "compositionend" || !Di && ds(t, l) ? (t = ns(), eu = xi = se = null, ra = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(l.ctrlKey || l.altKey || l.metaKey) || l.ctrlKey && l.altKey) {
          if (l.char && 1 < l.char.length)
            return l.char;
          if (l.which) return String.fromCharCode(l.which);
        }
        return null;
      case "compositionend":
        return ss && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var um = {
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
  function ms(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!um[t.type] : l === "textarea";
  }
  function ys(t, l, e, a) {
    sa ? oa ? oa.push(a) : oa = [a] : sa = a, l = $u(l, "onChange"), 0 < l.length && (e = new uu(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var nn = null, un = null;
  function im(t) {
    Ir(t, 0);
  }
  function cu(t) {
    var l = Ia(t);
    if (Wf(l)) return t;
  }
  function gs(t, l) {
    if (t === "change") return l;
  }
  var vs = !1;
  if (Kl) {
    var Ci;
    if (Kl) {
      var Ui = "oninput" in document;
      if (!Ui) {
        var ps = document.createElement("div");
        ps.setAttribute("oninput", "return;"), Ui = typeof ps.oninput == "function";
      }
      Ci = Ui;
    } else Ci = !1;
    vs = Ci && (!document.documentMode || 9 < document.documentMode);
  }
  function Ss() {
    nn && (nn.detachEvent("onpropertychange", bs), un = nn = null);
  }
  function bs(t) {
    if (t.propertyName === "value" && cu(un)) {
      var l = [];
      ys(
        l,
        un,
        t,
        Ti(t)
      ), as(im, l);
    }
  }
  function cm(t, l, e) {
    t === "focusin" ? (Ss(), nn = l, un = e, nn.attachEvent("onpropertychange", bs)) : t === "focusout" && Ss();
  }
  function fm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return cu(un);
  }
  function sm(t, l) {
    if (t === "click") return cu(l);
  }
  function om(t, l) {
    if (t === "input" || t === "change")
      return cu(l);
  }
  function rm(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var dl = typeof Object.is == "function" ? Object.is : rm;
  function cn(t, l) {
    if (dl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!la.call(l, n) || !dl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function _s(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Es(t, l) {
    var e = _s(t);
    t = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = t + e.textContent.length, t <= l && a >= l)
          return { node: e, offset: l - t };
        t = a;
      }
      t: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break t;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = _s(e);
    }
  }
  function Ts(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? Ts(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function As(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = tu(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = tu(t.document);
    }
    return l;
  }
  function Ri(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var dm = Kl && "documentMode" in document && 11 >= document.documentMode, da = null, Hi = null, fn = null, Bi = !1;
  function zs(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Bi || da == null || da !== tu(a) || (a = da, "selectionStart" in a && Ri(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), fn && cn(fn, a) || (fn = a, a = $u(Hi, "onSelect"), 0 < a.length && (l = new uu(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = da)));
  }
  function qe(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var ha = {
    animationend: qe("Animation", "AnimationEnd"),
    animationiteration: qe("Animation", "AnimationIteration"),
    animationstart: qe("Animation", "AnimationStart"),
    transitionrun: qe("Transition", "TransitionRun"),
    transitionstart: qe("Transition", "TransitionStart"),
    transitioncancel: qe("Transition", "TransitionCancel"),
    transitionend: qe("Transition", "TransitionEnd")
  }, qi = {}, xs = {};
  Kl && (xs = document.createElement("div").style, "AnimationEvent" in window || (delete ha.animationend.animation, delete ha.animationiteration.animation, delete ha.animationstart.animation), "TransitionEvent" in window || delete ha.transitionend.transition);
  function Ye(t) {
    if (qi[t]) return qi[t];
    if (!ha[t]) return t;
    var l = ha[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in xs)
        return qi[t] = l[e];
    return t;
  }
  var Os = Ye("animationend"), js = Ye("animationiteration"), Ms = Ye("animationstart"), hm = Ye("transitionrun"), mm = Ye("transitionstart"), ym = Ye("transitioncancel"), Ns = Ye("transitionend"), Ds = /* @__PURE__ */ new Map(), Yi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Yi.push("scrollEnd");
  function Dl(t, l) {
    Ds.set(t, l), He(l, [t]);
  }
  var fu = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var l = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(l)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, El = [], ma = 0, Gi = 0;
  function su() {
    for (var t = ma, l = Gi = ma = 0; l < t; ) {
      var e = El[l];
      El[l++] = null;
      var a = El[l];
      El[l++] = null;
      var n = El[l];
      El[l++] = null;
      var u = El[l];
      if (El[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && Cs(e, n, u);
    }
  }
  function ou(t, l, e, a) {
    El[ma++] = t, El[ma++] = l, El[ma++] = e, El[ma++] = a, Gi |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function Li(t, l, e, a) {
    return ou(t, l, e, a), ru(t);
  }
  function Ge(t, l) {
    return ou(t, null, null, l), ru(t);
  }
  function Cs(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - rl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function ru(t) {
    if (50 < Nn)
      throw Nn = 0, $c = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ya = {};
  function gm(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function hl(t, l, e, a) {
    return new gm(t, l, e, a);
  }
  function Xi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function wl(t, l) {
    var e = t.alternate;
    return e === null ? (e = hl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Us(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function du(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") Xi(t) && (i = 1);
    else if (typeof t == "string")
      i = _y(
        t,
        e,
        L.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case yt:
          return t = hl(31, e, l, n), t.elementType = yt, t.lanes = u, t;
        case Q:
          return Le(e.children, n, u, l);
        case ht:
          i = 8, n |= 24;
          break;
        case P:
          return t = hl(12, e, l, n | 2), t.elementType = P, t.lanes = u, t;
        case Ft:
          return t = hl(13, e, l, n), t.elementType = Ft, t.lanes = u, t;
        case Nt:
          return t = hl(19, e, l, n), t.elementType = Nt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case mt:
                i = 10;
                break t;
              case Ut:
                i = 9;
                break t;
              case Lt:
                i = 11;
                break t;
              case J:
                i = 14;
                break t;
              case Ot:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = hl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Le(t, l, e, a) {
    return t = hl(7, t, a, l), t.lanes = e, t;
  }
  function Qi(t, l, e) {
    return t = hl(6, t, null, l), t.lanes = e, t;
  }
  function Rs(t) {
    var l = hl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Zi(t, l, e) {
    return l = hl(
      4,
      t.children !== null ? t.children : [],
      t.key,
      l
    ), l.lanes = e, l.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, l;
  }
  var Hs = /* @__PURE__ */ new WeakMap();
  function Tl(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = Hs.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ka(l)
      }, Hs.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ka(l)
    };
  }
  var ga = [], va = 0, hu = null, sn = 0, Al = [], zl = 0, oe = null, Bl = 1, ql = "";
  function Jl(t, l) {
    ga[va++] = sn, ga[va++] = hu, hu = t, sn = l;
  }
  function Bs(t, l, e) {
    Al[zl++] = Bl, Al[zl++] = ql, Al[zl++] = oe, oe = t;
    var a = Bl;
    t = ql;
    var n = 32 - rl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - rl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Bl = 1 << 32 - rl(l) + n | e << n | a, ql = u + t;
    } else
      Bl = 1 << u | e << n | a, ql = t;
  }
  function Vi(t) {
    t.return !== null && (Jl(t, 1), Bs(t, 1, 0));
  }
  function Ki(t) {
    for (; t === hu; )
      hu = ga[--va], ga[va] = null, sn = ga[--va], ga[va] = null;
    for (; t === oe; )
      oe = Al[--zl], Al[zl] = null, ql = Al[--zl], Al[zl] = null, Bl = Al[--zl], Al[zl] = null;
  }
  function qs(t, l) {
    Al[zl++] = Bl, Al[zl++] = ql, Al[zl++] = oe, Bl = l.id, ql = l.overflow, oe = t;
  }
  var Jt = null, zt = null, ct = !1, re = null, xl = !1, wi = Error(s(519));
  function de(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw on(Tl(l, t)), wi;
  }
  function Ys(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[wt] = t, l[el] = a, e) {
      case "dialog":
        at("cancel", l), at("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        at("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Cn.length; e++)
          at(Cn[e], l);
        break;
      case "source":
        at("error", l);
        break;
      case "img":
      case "image":
      case "link":
        at("error", l), at("load", l);
        break;
      case "details":
        at("toggle", l);
        break;
      case "input":
        at("invalid", l), Ff(
          l,
          a.value,
          a.defaultValue,
          a.checked,
          a.defaultChecked,
          a.type,
          a.name,
          !0
        );
        break;
      case "select":
        at("invalid", l);
        break;
      case "textarea":
        at("invalid", l), Pf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || ed(l.textContent, e) ? (a.popover != null && (at("beforetoggle", l), at("toggle", l)), a.onScroll != null && at("scroll", l), a.onScrollEnd != null && at("scrollend", l), a.onClick != null && (l.onclick = Vl), l = !0) : l = !1, l || de(t, !0);
  }
  function Gs(t) {
    for (Jt = t.return; Jt; )
      switch (Jt.tag) {
        case 5:
        case 31:
        case 13:
          xl = !1;
          return;
        case 27:
        case 3:
          xl = !0;
          return;
        default:
          Jt = Jt.return;
      }
  }
  function pa(t) {
    if (t !== Jt) return !1;
    if (!ct) return Gs(t), ct = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || rf(t.type, t.memoizedProps)), e = !e), e && zt && de(t), Gs(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = rd(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = rd(t);
    } else
      l === 27 ? (l = zt, xe(t.type) ? (t = gf, gf = null, zt = t) : zt = l) : zt = Jt ? jl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Xe() {
    zt = Jt = null, ct = !1;
  }
  function Ji() {
    var t = re;
    return t !== null && (cl === null ? cl = t : cl.push.apply(
      cl,
      t
    ), re = null), t;
  }
  function on(t) {
    re === null ? re = [t] : re.push(t);
  }
  var ki = y(null), Qe = null, kl = null;
  function he(t, l, e) {
    B(ki, l._currentValue), l._currentValue = e;
  }
  function $l(t) {
    t._currentValue = ki.current, N(ki);
  }
  function $i(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Wi(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var c = u;
          u = n;
          for (var r = 0; r < l.length; r++)
            if (c.context === l[r]) {
              u.lanes |= e, c = u.alternate, c !== null && (c.lanes |= e), $i(
                u.return,
                e,
                t
              ), a || (i = null);
              break t;
            }
          u = c.next;
        }
      } else if (n.tag === 18) {
        if (i = n.return, i === null) throw Error(s(341));
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), $i(i, e, t), i = null;
      } else i = n.child;
      if (i !== null) i.return = n;
      else
        for (i = n; i !== null; ) {
          if (i === t) {
            i = null;
            break;
          }
          if (n = i.sibling, n !== null) {
            n.return = i.return, i = n;
            break;
          }
          i = i.return;
        }
      n = i;
    }
  }
  function Sa(t, l, e, a) {
    t = null;
    for (var n = l, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var i = n.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var c = n.type;
          dl(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (n === st.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(qn) : t = [qn]);
      }
      n = n.return;
    }
    t !== null && Wi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function mu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!dl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ze(t) {
    Qe = t, kl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function kt(t) {
    return Ls(Qe, t);
  }
  function yu(t, l) {
    return Qe === null && Ze(t), Ls(t, l);
  }
  function Ls(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, kl === null) {
      if (t === null) throw Error(s(308));
      kl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else kl = kl.next = l;
    return e;
  }
  var vm = typeof AbortController < "u" ? AbortController : function() {
    var t = [], l = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        t.push(a);
      }
    };
    this.abort = function() {
      l.aborted = !0, t.forEach(function(e) {
        return e();
      });
    };
  }, pm = f.unstable_scheduleCallback, Sm = f.unstable_NormalPriority, Bt = {
    $$typeof: mt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Fi() {
    return {
      controller: new vm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function rn(t) {
    t.refCount--, t.refCount === 0 && pm(Sm, function() {
      t.controller.abort();
    });
  }
  var dn = null, Ii = 0, ba = 0, _a = null;
  function bm(t, l) {
    if (dn === null) {
      var e = dn = [];
      Ii = 0, ba = lf(), _a = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return Ii++, l.then(Xs, Xs), l;
  }
  function Xs() {
    if (--Ii === 0 && dn !== null) {
      _a !== null && (_a.status = "fulfilled");
      var t = dn;
      dn = null, ba = 0, _a = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function _m(t, l) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(n) {
        e.push(n);
      }
    };
    return t.then(
      function() {
        a.status = "fulfilled", a.value = l;
        for (var n = 0; n < e.length; n++) (0, e[n])(l);
      },
      function(n) {
        for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
          (0, e[n])(void 0);
      }
    ), a;
  }
  var Qs = z.S;
  z.S = function(t, l) {
    xr = lt(), typeof l == "object" && l !== null && typeof l.then == "function" && bm(t, l), Qs !== null && Qs(t, l);
  };
  var Ve = y(null);
  function Pi() {
    var t = Ve.current;
    return t !== null ? t : Tt.pooledCache;
  }
  function gu(t, l) {
    l === null ? B(Ve, Ve.current) : B(Ve, l.pool);
  }
  function Zs() {
    var t = Pi();
    return t === null ? null : { parent: Bt._currentValue, pool: t };
  }
  var Ea = Error(s(460)), tc = Error(s(474)), vu = Error(s(542)), pu = { then: function() {
  } };
  function Vs(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Ks(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Vl, Vl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Js(t), t;
      default:
        if (typeof l.status == "string") l.then(Vl, Vl);
        else {
          if (t = Tt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = l, t.status = "pending", t.then(
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "fulfilled", n.value = a;
              }
            },
            function(a) {
              if (l.status === "pending") {
                var n = l;
                n.status = "rejected", n.reason = a;
              }
            }
          );
        }
        switch (l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw t = l.reason, Js(t), t;
        }
        throw we = l, Ea;
    }
  }
  function Ke(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (we = e, Ea) : e;
    }
  }
  var we = null;
  function ws() {
    if (we === null) throw Error(s(459));
    var t = we;
    return we = null, t;
  }
  function Js(t) {
    if (t === Ea || t === vu)
      throw Error(s(483));
  }
  var Ta = null, hn = 0;
  function Su(t) {
    var l = hn;
    return hn += 1, Ta === null && (Ta = []), Ks(Ta, t, l);
  }
  function mn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function bu(t, l) {
    throw l.$$typeof === q ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function ks(t) {
    function l(p, h) {
      if (t) {
        var S = p.deletions;
        S === null ? (p.deletions = [h], p.flags |= 16) : S.push(h);
      }
    }
    function e(p, h) {
      if (!t) return null;
      for (; h !== null; )
        l(p, h), h = h.sibling;
      return null;
    }
    function a(p) {
      for (var h = /* @__PURE__ */ new Map(); p !== null; )
        p.key !== null ? h.set(p.key, p) : h.set(p.index, p), p = p.sibling;
      return h;
    }
    function n(p, h) {
      return p = wl(p, h), p.index = 0, p.sibling = null, p;
    }
    function u(p, h, S) {
      return p.index = S, t ? (S = p.alternate, S !== null ? (S = S.index, S < h ? (p.flags |= 67108866, h) : S) : (p.flags |= 67108866, h)) : (p.flags |= 1048576, h);
    }
    function i(p) {
      return t && p.alternate === null && (p.flags |= 67108866), p;
    }
    function c(p, h, S, j) {
      return h === null || h.tag !== 6 ? (h = Qi(S, p.mode, j), h.return = p, h) : (h = n(h, S), h.return = p, h);
    }
    function r(p, h, S, j) {
      var Z = S.type;
      return Z === Q ? x(
        p,
        h,
        S.props.children,
        j,
        S.key
      ) : h !== null && (h.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Ot && Ke(Z) === h.type) ? (h = n(h, S.props), mn(h, S), h.return = p, h) : (h = du(
        S.type,
        S.key,
        S.props,
        null,
        p.mode,
        j
      ), mn(h, S), h.return = p, h);
    }
    function b(p, h, S, j) {
      return h === null || h.tag !== 4 || h.stateNode.containerInfo !== S.containerInfo || h.stateNode.implementation !== S.implementation ? (h = Zi(S, p.mode, j), h.return = p, h) : (h = n(h, S.children || []), h.return = p, h);
    }
    function x(p, h, S, j, Z) {
      return h === null || h.tag !== 7 ? (h = Le(
        S,
        p.mode,
        j,
        Z
      ), h.return = p, h) : (h = n(h, S), h.return = p, h);
    }
    function M(p, h, S) {
      if (typeof h == "string" && h !== "" || typeof h == "number" || typeof h == "bigint")
        return h = Qi(
          "" + h,
          p.mode,
          S
        ), h.return = p, h;
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case nt:
            return S = du(
              h.type,
              h.key,
              h.props,
              null,
              p.mode,
              S
            ), mn(S, h), S.return = p, S;
          case F:
            return h = Zi(
              h,
              p.mode,
              S
            ), h.return = p, h;
          case Ot:
            return h = Ke(h), M(p, h, S);
        }
        if (It(h) || Qt(h))
          return h = Le(
            h,
            p.mode,
            S,
            null
          ), h.return = p, h;
        if (typeof h.then == "function")
          return M(p, Su(h), S);
        if (h.$$typeof === mt)
          return M(
            p,
            yu(p, h),
            S
          );
        bu(p, h);
      }
      return null;
    }
    function _(p, h, S, j) {
      var Z = h !== null ? h.key : null;
      if (typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint")
        return Z !== null ? null : c(p, h, "" + S, j);
      if (typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case nt:
            return S.key === Z ? r(p, h, S, j) : null;
          case F:
            return S.key === Z ? b(p, h, S, j) : null;
          case Ot:
            return S = Ke(S), _(p, h, S, j);
        }
        if (It(S) || Qt(S))
          return Z !== null ? null : x(p, h, S, j, null);
        if (typeof S.then == "function")
          return _(
            p,
            h,
            Su(S),
            j
          );
        if (S.$$typeof === mt)
          return _(
            p,
            h,
            yu(p, S),
            j
          );
        bu(p, S);
      }
      return null;
    }
    function A(p, h, S, j, Z) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return p = p.get(S) || null, c(h, p, "" + j, Z);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case nt:
            return p = p.get(
              j.key === null ? S : j.key
            ) || null, r(h, p, j, Z);
          case F:
            return p = p.get(
              j.key === null ? S : j.key
            ) || null, b(h, p, j, Z);
          case Ot:
            return j = Ke(j), A(
              p,
              h,
              S,
              j,
              Z
            );
        }
        if (It(j) || Qt(j))
          return p = p.get(S) || null, x(h, p, j, Z, null);
        if (typeof j.then == "function")
          return A(
            p,
            h,
            S,
            Su(j),
            Z
          );
        if (j.$$typeof === mt)
          return A(
            p,
            h,
            S,
            yu(h, j),
            Z
          );
        bu(h, j);
      }
      return null;
    }
    function Y(p, h, S, j) {
      for (var Z = null, ot = null, X = h, I = h = 0, it = null; X !== null && I < S.length; I++) {
        X.index > I ? (it = X, X = null) : it = X.sibling;
        var rt = _(
          p,
          X,
          S[I],
          j
        );
        if (rt === null) {
          X === null && (X = it);
          break;
        }
        t && X && rt.alternate === null && l(p, X), h = u(rt, h, I), ot === null ? Z = rt : ot.sibling = rt, ot = rt, X = it;
      }
      if (I === S.length)
        return e(p, X), ct && Jl(p, I), Z;
      if (X === null) {
        for (; I < S.length; I++)
          X = M(p, S[I], j), X !== null && (h = u(
            X,
            h,
            I
          ), ot === null ? Z = X : ot.sibling = X, ot = X);
        return ct && Jl(p, I), Z;
      }
      for (X = a(X); I < S.length; I++)
        it = A(
          X,
          p,
          I,
          S[I],
          j
        ), it !== null && (t && it.alternate !== null && X.delete(
          it.key === null ? I : it.key
        ), h = u(
          it,
          h,
          I
        ), ot === null ? Z = it : ot.sibling = it, ot = it);
      return t && X.forEach(function(De) {
        return l(p, De);
      }), ct && Jl(p, I), Z;
    }
    function V(p, h, S, j) {
      if (S == null) throw Error(s(151));
      for (var Z = null, ot = null, X = h, I = h = 0, it = null, rt = S.next(); X !== null && !rt.done; I++, rt = S.next()) {
        X.index > I ? (it = X, X = null) : it = X.sibling;
        var De = _(p, X, rt.value, j);
        if (De === null) {
          X === null && (X = it);
          break;
        }
        t && X && De.alternate === null && l(p, X), h = u(De, h, I), ot === null ? Z = De : ot.sibling = De, ot = De, X = it;
      }
      if (rt.done)
        return e(p, X), ct && Jl(p, I), Z;
      if (X === null) {
        for (; !rt.done; I++, rt = S.next())
          rt = M(p, rt.value, j), rt !== null && (h = u(rt, h, I), ot === null ? Z = rt : ot.sibling = rt, ot = rt);
        return ct && Jl(p, I), Z;
      }
      for (X = a(X); !rt.done; I++, rt = S.next())
        rt = A(X, p, I, rt.value, j), rt !== null && (t && rt.alternate !== null && X.delete(rt.key === null ? I : rt.key), h = u(rt, h, I), ot === null ? Z = rt : ot.sibling = rt, ot = rt);
      return t && X.forEach(function(Cy) {
        return l(p, Cy);
      }), ct && Jl(p, I), Z;
    }
    function _t(p, h, S, j) {
      if (typeof S == "object" && S !== null && S.type === Q && S.key === null && (S = S.props.children), typeof S == "object" && S !== null) {
        switch (S.$$typeof) {
          case nt:
            t: {
              for (var Z = S.key; h !== null; ) {
                if (h.key === Z) {
                  if (Z = S.type, Z === Q) {
                    if (h.tag === 7) {
                      e(
                        p,
                        h.sibling
                      ), j = n(
                        h,
                        S.props.children
                      ), j.return = p, p = j;
                      break t;
                    }
                  } else if (h.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Ot && Ke(Z) === h.type) {
                    e(
                      p,
                      h.sibling
                    ), j = n(h, S.props), mn(j, S), j.return = p, p = j;
                    break t;
                  }
                  e(p, h);
                  break;
                } else l(p, h);
                h = h.sibling;
              }
              S.type === Q ? (j = Le(
                S.props.children,
                p.mode,
                j,
                S.key
              ), j.return = p, p = j) : (j = du(
                S.type,
                S.key,
                S.props,
                null,
                p.mode,
                j
              ), mn(j, S), j.return = p, p = j);
            }
            return i(p);
          case F:
            t: {
              for (Z = S.key; h !== null; ) {
                if (h.key === Z)
                  if (h.tag === 4 && h.stateNode.containerInfo === S.containerInfo && h.stateNode.implementation === S.implementation) {
                    e(
                      p,
                      h.sibling
                    ), j = n(h, S.children || []), j.return = p, p = j;
                    break t;
                  } else {
                    e(p, h);
                    break;
                  }
                else l(p, h);
                h = h.sibling;
              }
              j = Zi(S, p.mode, j), j.return = p, p = j;
            }
            return i(p);
          case Ot:
            return S = Ke(S), _t(
              p,
              h,
              S,
              j
            );
        }
        if (It(S))
          return Y(
            p,
            h,
            S,
            j
          );
        if (Qt(S)) {
          if (Z = Qt(S), typeof Z != "function") throw Error(s(150));
          return S = Z.call(S), V(
            p,
            h,
            S,
            j
          );
        }
        if (typeof S.then == "function")
          return _t(
            p,
            h,
            Su(S),
            j
          );
        if (S.$$typeof === mt)
          return _t(
            p,
            h,
            yu(p, S),
            j
          );
        bu(p, S);
      }
      return typeof S == "string" && S !== "" || typeof S == "number" || typeof S == "bigint" ? (S = "" + S, h !== null && h.tag === 6 ? (e(p, h.sibling), j = n(h, S), j.return = p, p = j) : (e(p, h), j = Qi(S, p.mode, j), j.return = p, p = j), i(p)) : e(p, h);
    }
    return function(p, h, S, j) {
      try {
        hn = 0;
        var Z = _t(
          p,
          h,
          S,
          j
        );
        return Ta = null, Z;
      } catch (X) {
        if (X === Ea || X === vu) throw X;
        var ot = hl(29, X, null, p.mode);
        return ot.lanes = j, ot.return = p, ot;
      } finally {
      }
    };
  }
  var Je = ks(!0), $s = ks(!1), me = !1;
  function lc(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ec(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ye(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ge(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (dt & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = ru(t), Cs(t, null, e), l;
    }
    return ou(t, a, l, e), ru(t);
  }
  function yn(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Lf(t, e);
    }
  }
  function ac(t, l) {
    var e = t.updateQueue, a = t.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var n = null, u = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          u === null ? n = u = i : u = u.next = i, e = e.next;
        } while (e !== null);
        u === null ? n = u = l : u = u.next = l;
      } else n = u = l;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks
      }, t.updateQueue = e;
      return;
    }
    t = e.lastBaseUpdate, t === null ? e.firstBaseUpdate = l : t.next = l, e.lastBaseUpdate = l;
  }
  var nc = !1;
  function gn() {
    if (nc) {
      var t = _a;
      if (t !== null) throw t;
    }
  }
  function vn(t, l, e, a) {
    nc = !1;
    var n = t.updateQueue;
    me = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var r = c, b = r.next;
      r.next = null, i === null ? u = b : i.next = b, i = r;
      var x = t.alternate;
      x !== null && (x = x.updateQueue, c = x.lastBaseUpdate, c !== i && (c === null ? x.firstBaseUpdate = b : c.next = b, x.lastBaseUpdate = r));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, x = b = r = null, c = u;
      do {
        var _ = c.lane & -536870913, A = _ !== c.lane;
        if (A ? (ut & _) === _ : (a & _) === _) {
          _ !== 0 && _ === ba && (nc = !0), x !== null && (x = x.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, V = c;
            _ = l;
            var _t = e;
            switch (V.tag) {
              case 1:
                if (Y = V.payload, typeof Y == "function") {
                  M = Y.call(_t, M, _);
                  break t;
                }
                M = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = V.payload, _ = typeof Y == "function" ? Y.call(_t, M, _) : Y, _ == null) break t;
                M = U({}, M, _);
                break t;
              case 2:
                me = !0;
            }
          }
          _ = c.callback, _ !== null && (t.flags |= 64, A && (t.flags |= 8192), A = n.callbacks, A === null ? n.callbacks = [_] : A.push(_));
        } else
          A = {
            lane: _,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, x === null ? (b = x = A, r = M) : x = x.next = A, i |= _;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null)
            break;
          A = c, c = A.next, A.next = null, n.lastBaseUpdate = A, n.shared.pending = null;
        }
      } while (!0);
      x === null && (r = M), n.baseState = r, n.firstBaseUpdate = b, n.lastBaseUpdate = x, u === null && (n.shared.lanes = 0), _e |= i, t.lanes = i, t.memoizedState = M;
    }
  }
  function Ws(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function Fs(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Ws(e[t], l);
  }
  var Aa = y(null), _u = y(0);
  function Is(t, l) {
    t = ne, B(_u, t), B(Aa, l), ne = t | l.baseLanes;
  }
  function uc() {
    B(_u, ne), B(Aa, Aa.current);
  }
  function ic() {
    ne = _u.current, N(Aa), N(_u);
  }
  var ml = y(null), Ol = null;
  function ve(t) {
    var l = t.alternate;
    B(Rt, Rt.current & 1), B(ml, t), Ol === null && (l === null || Aa.current !== null || l.memoizedState !== null) && (Ol = t);
  }
  function cc(t) {
    B(Rt, Rt.current), B(ml, t), Ol === null && (Ol = t);
  }
  function Ps(t) {
    t.tag === 22 ? (B(Rt, Rt.current), B(ml, t), Ol === null && (Ol = t)) : pe();
  }
  function pe() {
    B(Rt, Rt.current), B(ml, ml.current);
  }
  function yl(t) {
    N(ml), Ol === t && (Ol = null), N(Rt);
  }
  var Rt = y(0);
  function Eu(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || mf(e) || yf(e)))
          return l;
      } else if (l.tag === 19 && (l.memoizedProps.revealOrder === "forwards" || l.memoizedProps.revealOrder === "backwards" || l.memoizedProps.revealOrder === "unstable_legacy-backwards" || l.memoizedProps.revealOrder === "together")) {
        if ((l.flags & 128) !== 0) return l;
      } else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === t) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === t) return null;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
    return null;
  }
  var Wl = 0, W = null, St = null, qt = null, Tu = !1, za = !1, ke = !1, Au = 0, pn = 0, xa = null, Em = 0;
  function Dt() {
    throw Error(s(321));
  }
  function fc(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!dl(t[e], l[e])) return !1;
    return !0;
  }
  function sc(t, l, e, a, n, u) {
    return Wl = u, W = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, z.H = t === null || t.memoizedState === null ? qo : Ac, ke = !1, u = e(a, n), ke = !1, za && (u = lo(
      l,
      e,
      a,
      n
    )), to(t), u;
  }
  function to(t) {
    z.H = _n;
    var l = St !== null && St.next !== null;
    if (Wl = 0, qt = St = W = null, Tu = !1, pn = 0, xa = null, l) throw Error(s(300));
    t === null || Yt || (t = t.dependencies, t !== null && mu(t) && (Yt = !0));
  }
  function lo(t, l, e, a) {
    W = t;
    var n = 0;
    do {
      if (za && (xa = null), pn = 0, za = !1, 25 <= n) throw Error(s(301));
      if (n += 1, qt = St = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      z.H = Yo, u = l(e, a);
    } while (za);
    return u;
  }
  function Tm() {
    var t = z.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? Sn(l) : l, t = t.useState()[0], (St !== null ? St.memoizedState : null) !== t && (W.flags |= 1024), l;
  }
  function oc() {
    var t = Au !== 0;
    return Au = 0, t;
  }
  function rc(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function dc(t) {
    if (Tu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      Tu = !1;
    }
    Wl = 0, qt = St = W = null, za = !1, pn = Au = 0, xa = null;
  }
  function ll() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return qt === null ? W.memoizedState = qt = t : qt = qt.next = t, qt;
  }
  function Ht() {
    if (St === null) {
      var t = W.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = St.next;
    var l = qt === null ? W.memoizedState : qt.next;
    if (l !== null)
      qt = l, St = t;
    else {
      if (t === null)
        throw W.alternate === null ? Error(s(467)) : Error(s(310));
      St = t, t = {
        memoizedState: St.memoizedState,
        baseState: St.baseState,
        baseQueue: St.baseQueue,
        queue: St.queue,
        next: null
      }, qt === null ? W.memoizedState = qt = t : qt = qt.next = t;
    }
    return qt;
  }
  function zu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sn(t) {
    var l = pn;
    return pn += 1, xa === null && (xa = []), t = Ks(xa, t, l), l = W, (qt === null ? l.memoizedState : qt.next) === null && (l = l.alternate, z.H = l === null || l.memoizedState === null ? qo : Ac), t;
  }
  function xu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Sn(t);
      if (t.$$typeof === mt) return kt(t);
    }
    throw Error(s(438, String(t)));
  }
  function hc(t) {
    var l = null, e = W.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = W.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = zu(), W.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = G;
    return l.index++, e;
  }
  function Fl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function Ou(t) {
    var l = Ht();
    return mc(l, St, t);
  }
  function mc(t, l, e) {
    var a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var n = t.baseQueue, u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var i = n.next;
        n.next = u.next, u.next = i;
      }
      l.baseQueue = n = u, a.pending = null;
    }
    if (u = t.baseState, n === null) t.memoizedState = u;
    else {
      l = n.next;
      var c = i = null, r = null, b = l, x = !1;
      do {
        var M = b.lane & -536870913;
        if (M !== b.lane ? (ut & M) === M : (Wl & M) === M) {
          var _ = b.revertLane;
          if (_ === 0)
            r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }), M === ba && (x = !0);
          else if ((Wl & _) === _) {
            b = b.next, _ === ba && (x = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: b.revertLane,
              gesture: null,
              action: b.action,
              hasEagerState: b.hasEagerState,
              eagerState: b.eagerState,
              next: null
            }, r === null ? (c = r = M, i = u) : r = r.next = M, W.lanes |= _, _e |= _;
          M = b.action, ke && e(u, M), u = b.hasEagerState ? b.eagerState : e(u, M);
        } else
          _ = {
            lane: M,
            revertLane: b.revertLane,
            gesture: b.gesture,
            action: b.action,
            hasEagerState: b.hasEagerState,
            eagerState: b.eagerState,
            next: null
          }, r === null ? (c = r = _, i = u) : r = r.next = _, W.lanes |= M, _e |= M;
        b = b.next;
      } while (b !== null && b !== l);
      if (r === null ? i = u : r.next = c, !dl(u, t.memoizedState) && (Yt = !0, x && (e = _a, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = r, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function yc(t) {
    var l = Ht(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      dl(u, l.memoizedState) || (Yt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function eo(t, l, e) {
    var a = W, n = Ht(), u = ct;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !dl(
      (St || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Yt = !0), n = n.queue, pc(uo.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || qt !== null && qt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Oa(
        9,
        { destroy: void 0 },
        no.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Tt === null) throw Error(s(349));
      u || (Wl & 127) !== 0 || ao(a, l, e);
    }
    return e;
  }
  function ao(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = W.updateQueue, l === null ? (l = zu(), W.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function no(t, l, e, a) {
    l.value = e, l.getSnapshot = a, io(l) && co(t);
  }
  function uo(t, l, e) {
    return e(function() {
      io(l) && co(t);
    });
  }
  function io(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !dl(t, e);
    } catch {
      return !0;
    }
  }
  function co(t) {
    var l = Ge(t, 2);
    l !== null && fl(l, t, 2);
  }
  function gc(t) {
    var l = ll();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), ke) {
        ce(!0);
        try {
          e();
        } finally {
          ce(!1);
        }
      }
    }
    return l.memoizedState = l.baseState = t, l.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Fl,
      lastRenderedState: t
    }, l;
  }
  function fo(t, l, e, a) {
    return t.baseState = e, mc(
      t,
      St,
      typeof a == "function" ? a : Fl
    );
  }
  function Am(t, l, e, a, n) {
    if (Nu(t)) throw Error(s(485));
    if (t = l.action, t !== null) {
      var u = {
        payload: n,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          u.listeners.push(i);
        }
      };
      z.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, so(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function so(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = z.T, i = {};
      z.T = i;
      try {
        var c = e(n, a), r = z.S;
        r !== null && r(i, c), oo(t, l, c);
      } catch (b) {
        vc(t, l, b);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), z.T = u;
      }
    } else
      try {
        u = e(n, a), oo(t, l, u);
      } catch (b) {
        vc(t, l, b);
      }
  }
  function oo(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        ro(t, l, a);
      },
      function(a) {
        return vc(t, l, a);
      }
    ) : ro(t, l, e);
  }
  function ro(t, l, e) {
    l.status = "fulfilled", l.value = e, ho(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, so(t, e)));
  }
  function vc(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, ho(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function ho(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function mo(t, l) {
    return l;
  }
  function yo(t, l) {
    if (ct) {
      var e = Tt.formState;
      if (e !== null) {
        t: {
          var a = W;
          if (ct) {
            if (zt) {
              l: {
                for (var n = zt, u = xl; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = jl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                zt = jl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            de(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = ll(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: mo,
      lastRenderedState: l
    }, e.queue = a, e = Ro.bind(
      null,
      W,
      a
    ), a.dispatch = e, a = gc(!1), u = Tc.bind(
      null,
      W,
      !1,
      a.queue
    ), a = ll(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = Am.bind(
      null,
      W,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function go(t) {
    var l = Ht();
    return vo(l, St, t);
  }
  function vo(t, l, e) {
    if (l = mc(
      t,
      l,
      mo
    )[0], t = Ou(Fl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = Sn(l);
      } catch (i) {
        throw i === Ea ? vu : i;
      }
    else a = l;
    l = Ht();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (W.flags |= 2048, Oa(
      9,
      { destroy: void 0 },
      zm.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function zm(t, l) {
    t.action = l;
  }
  function po(t) {
    var l = Ht(), e = St;
    if (e !== null)
      return vo(l, e, t);
    Ht(), l = l.memoizedState, e = Ht();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Oa(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = W.updateQueue, l === null && (l = zu(), W.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function So() {
    return Ht().memoizedState;
  }
  function ju(t, l, e, a) {
    var n = ll();
    W.flags |= t, n.memoizedState = Oa(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function Mu(t, l, e, a) {
    var n = Ht();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    St !== null && a !== null && fc(a, St.memoizedState.deps) ? n.memoizedState = Oa(l, u, e, a) : (W.flags |= t, n.memoizedState = Oa(
      1 | l,
      u,
      e,
      a
    ));
  }
  function bo(t, l) {
    ju(8390656, 8, t, l);
  }
  function pc(t, l) {
    Mu(2048, 8, t, l);
  }
  function xm(t) {
    W.flags |= 4;
    var l = W.updateQueue;
    if (l === null)
      l = zu(), W.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function _o(t) {
    var l = Ht().memoizedState;
    return xm({ ref: l, nextImpl: t }), function() {
      if ((dt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function Eo(t, l) {
    return Mu(4, 2, t, l);
  }
  function To(t, l) {
    return Mu(4, 4, t, l);
  }
  function Ao(t, l) {
    if (typeof l == "function") {
      t = t();
      var e = l(t);
      return function() {
        typeof e == "function" ? e() : l(null);
      };
    }
    if (l != null)
      return t = t(), l.current = t, function() {
        l.current = null;
      };
  }
  function zo(t, l, e) {
    e = e != null ? e.concat([t]) : null, Mu(4, 4, Ao.bind(null, l, t), e);
  }
  function Sc() {
  }
  function xo(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && fc(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function Oo(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && fc(l, a[1]))
      return a[0];
    if (a = t(), ke) {
      ce(!0);
      try {
        t();
      } finally {
        ce(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function bc(t, l, e) {
    return e === void 0 || (Wl & 1073741824) !== 0 && (ut & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = jr(), W.lanes |= t, _e |= t, e);
  }
  function jo(t, l, e, a) {
    return dl(e, l) ? e : Aa.current !== null ? (t = bc(t, e, a), dl(t, l) || (Yt = !0), t) : (Wl & 42) === 0 || (Wl & 1073741824) !== 0 && (ut & 261930) === 0 ? (Yt = !0, t.memoizedState = e) : (t = jr(), W.lanes |= t, _e |= t, l);
  }
  function Mo(t, l, e, a, n) {
    var u = R.p;
    R.p = u !== 0 && 8 > u ? u : 8;
    var i = z.T, c = {};
    z.T = c, Tc(t, !1, l, e);
    try {
      var r = n(), b = z.S;
      if (b !== null && b(c, r), r !== null && typeof r == "object" && typeof r.then == "function") {
        var x = _m(
          r,
          a
        );
        bn(
          t,
          l,
          x,
          pl(t)
        );
      } else
        bn(
          t,
          l,
          a,
          pl(t)
        );
    } catch (M) {
      bn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: M },
        pl()
      );
    } finally {
      R.p = u, i !== null && c.types !== null && (i.types = c.types), z.T = i;
    }
  }
  function Om() {
  }
  function _c(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = No(t).queue;
    Mo(
      t,
      n,
      l,
      K,
      e === null ? Om : function() {
        return Do(t), e(a);
      }
    );
  }
  function No(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: K,
      baseState: K,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fl,
        lastRenderedState: K
      },
      next: null
    };
    var e = {};
    return l.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fl,
        lastRenderedState: e
      },
      next: null
    }, t.memoizedState = l, t = t.alternate, t !== null && (t.memoizedState = l), l;
  }
  function Do(t) {
    var l = No(t);
    l.next === null && (l = t.alternate.memoizedState), bn(
      t,
      l.next.queue,
      {},
      pl()
    );
  }
  function Ec() {
    return kt(qn);
  }
  function Co() {
    return Ht().memoizedState;
  }
  function Uo() {
    return Ht().memoizedState;
  }
  function jm(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = pl();
          t = ye(e);
          var a = ge(l, t, e);
          a !== null && (fl(a, l, e), yn(a, l, e)), l = { cache: Fi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Mm(t, l, e) {
    var a = pl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Nu(t) ? Ho(l, e) : (e = Li(t, l, e, a), e !== null && (fl(e, t, a), Bo(e, l, a)));
  }
  function Ro(t, l, e) {
    var a = pl();
    bn(t, l, e, a);
  }
  function bn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Nu(t)) Ho(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, c = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = c, dl(c, i))
            return ou(t, l, n, 0), Tt === null && su(), !1;
        } catch {
        } finally {
        }
      if (e = Li(t, l, n, a), e !== null)
        return fl(e, t, a), Bo(e, l, a), !0;
    }
    return !1;
  }
  function Tc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: lf(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Nu(t)) {
      if (l) throw Error(s(479));
    } else
      l = Li(
        t,
        e,
        a,
        2
      ), l !== null && fl(l, t, 2);
  }
  function Nu(t) {
    var l = t.alternate;
    return t === W || l !== null && l === W;
  }
  function Ho(t, l) {
    za = Tu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Bo(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Lf(t, e);
    }
  }
  var _n = {
    readContext: kt,
    use: xu,
    useCallback: Dt,
    useContext: Dt,
    useEffect: Dt,
    useImperativeHandle: Dt,
    useLayoutEffect: Dt,
    useInsertionEffect: Dt,
    useMemo: Dt,
    useReducer: Dt,
    useRef: Dt,
    useState: Dt,
    useDebugValue: Dt,
    useDeferredValue: Dt,
    useTransition: Dt,
    useSyncExternalStore: Dt,
    useId: Dt,
    useHostTransitionStatus: Dt,
    useFormState: Dt,
    useActionState: Dt,
    useOptimistic: Dt,
    useMemoCache: Dt,
    useCacheRefresh: Dt
  };
  _n.useEffectEvent = Dt;
  var qo = {
    readContext: kt,
    use: xu,
    useCallback: function(t, l) {
      return ll().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: kt,
    useEffect: bo,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, ju(
        4194308,
        4,
        Ao.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return ju(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      ju(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = ll();
      l = l === void 0 ? null : l;
      var a = t();
      if (ke) {
        ce(!0);
        try {
          t();
        } finally {
          ce(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = ll();
      if (e !== void 0) {
        var n = e(l);
        if (ke) {
          ce(!0);
          try {
            e(l);
          } finally {
            ce(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Mm.bind(
        null,
        W,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = ll();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = gc(t);
      var l = t.queue, e = Ro.bind(null, W, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: Sc,
    useDeferredValue: function(t, l) {
      var e = ll();
      return bc(e, t, l);
    },
    useTransition: function() {
      var t = gc(!1);
      return t = Mo.bind(
        null,
        W,
        t.queue,
        !0,
        !1
      ), ll().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = W, n = ll();
      if (ct) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), Tt === null)
          throw Error(s(349));
        (ut & 127) !== 0 || ao(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, bo(uo.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Oa(
        9,
        { destroy: void 0 },
        no.bind(
          null,
          a,
          u,
          e,
          l
        ),
        null
      ), e;
    },
    useId: function() {
      var t = ll(), l = Tt.identifierPrefix;
      if (ct) {
        var e = ql, a = Bl;
        e = (a & ~(1 << 32 - rl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = Au++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = Em++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: Ec,
    useFormState: yo,
    useActionState: yo,
    useOptimistic: function(t) {
      var l = ll();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = Tc.bind(
        null,
        W,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: hc,
    useCacheRefresh: function() {
      return ll().memoizedState = jm.bind(
        null,
        W
      );
    },
    useEffectEvent: function(t) {
      var l = ll(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((dt & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, Ac = {
    readContext: kt,
    use: xu,
    useCallback: xo,
    useContext: kt,
    useEffect: pc,
    useImperativeHandle: zo,
    useInsertionEffect: Eo,
    useLayoutEffect: To,
    useMemo: Oo,
    useReducer: Ou,
    useRef: So,
    useState: function() {
      return Ou(Fl);
    },
    useDebugValue: Sc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return jo(
        e,
        St.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = Ou(Fl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Sn(t),
        l
      ];
    },
    useSyncExternalStore: eo,
    useId: Co,
    useHostTransitionStatus: Ec,
    useFormState: go,
    useActionState: go,
    useOptimistic: function(t, l) {
      var e = Ht();
      return fo(e, St, t, l);
    },
    useMemoCache: hc,
    useCacheRefresh: Uo
  };
  Ac.useEffectEvent = _o;
  var Yo = {
    readContext: kt,
    use: xu,
    useCallback: xo,
    useContext: kt,
    useEffect: pc,
    useImperativeHandle: zo,
    useInsertionEffect: Eo,
    useLayoutEffect: To,
    useMemo: Oo,
    useReducer: yc,
    useRef: So,
    useState: function() {
      return yc(Fl);
    },
    useDebugValue: Sc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return St === null ? bc(e, t, l) : jo(
        e,
        St.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = yc(Fl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : Sn(t),
        l
      ];
    },
    useSyncExternalStore: eo,
    useId: Co,
    useHostTransitionStatus: Ec,
    useFormState: po,
    useActionState: po,
    useOptimistic: function(t, l) {
      var e = Ht();
      return St !== null ? fo(e, St, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: hc,
    useCacheRefresh: Uo
  };
  Yo.useEffectEvent = _o;
  function zc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : U({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var xc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = pl(), n = ye(a);
      n.payload = l, e != null && (n.callback = e), l = ge(t, n, a), l !== null && (fl(l, t, a), yn(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = pl(), n = ye(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = ge(t, n, a), l !== null && (fl(l, t, a), yn(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = pl(), a = ye(e);
      a.tag = 2, l != null && (a.callback = l), l = ge(t, a, e), l !== null && (fl(l, t, e), yn(l, t, e));
    }
  };
  function Go(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !cn(e, a) || !cn(n, u) : !0;
  }
  function Lo(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && xc.enqueueReplaceState(l, l.state, null);
  }
  function $e(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = U({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function Xo(t) {
    fu(t);
  }
  function Qo(t) {
    console.error(t);
  }
  function Zo(t) {
    fu(t);
  }
  function Du(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Vo(t, l, e) {
    try {
      var a = t.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: l.tag === 1 ? l.stateNode : null
      });
    } catch (n) {
      setTimeout(function() {
        throw n;
      });
    }
  }
  function Oc(t, l, e) {
    return e = ye(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      Du(t, l);
    }, e;
  }
  function Ko(t) {
    return t = ye(t), t.tag = 3, t;
  }
  function wo(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        Vo(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      Vo(l, e, a), typeof n != "function" && (Ee === null ? Ee = /* @__PURE__ */ new Set([this]) : Ee.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Nm(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && Sa(
        l,
        e,
        n,
        !0
      ), e = ml.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Ol === null ? Zu() : e.alternate === null && Ct === 0 && (Ct = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === pu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), Ic(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === pu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), Ic(t, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return Ic(t, a, n), Zu(), !1;
    }
    if (ct)
      return l = ml.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== wi && (t = Error(s(422), { cause: a }), on(Tl(t, e)))) : (a !== wi && (l = Error(s(423), {
        cause: a
      }), on(
        Tl(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Tl(a, e), n = Oc(
        t.stateNode,
        a,
        n
      ), ac(t, n), Ct !== 4 && (Ct = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Tl(u, e), Mn === null ? Mn = [u] : Mn.push(u), Ct !== 4 && (Ct = 2), l === null) return !0;
    a = Tl(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = Oc(e.stateNode, a, t), ac(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ee === null || !Ee.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Ko(n), wo(
              n,
              t,
              e,
              a
            ), ac(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var jc = Error(s(461)), Yt = !1;
  function $t(t, l, e, a) {
    l.child = t === null ? $s(l, null, e, a) : Je(
      l,
      t.child,
      e,
      a
    );
  }
  function Jo(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Ze(l), a = sc(
      t,
      l,
      e,
      i,
      u,
      n
    ), c = oc(), t !== null && !Yt ? (rc(t, l, n), Il(t, l, n)) : (ct && c && Vi(l), l.flags |= 1, $t(t, l, a, n), l.child);
  }
  function ko(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Xi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, $o(
        t,
        l,
        u,
        a,
        n
      )) : (t = du(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !Bc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : cn, e(i, a) && t.ref === l.ref)
        return Il(t, l, n);
    }
    return l.flags |= 1, t = wl(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function $o(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (cn(u, a) && t.ref === l.ref)
        if (Yt = !1, l.pendingProps = a = u, Bc(t, n))
          (t.flags & 131072) !== 0 && (Yt = !0);
        else
          return l.lanes = t.lanes, Il(t, l, n);
    }
    return Mc(
      t,
      l,
      e,
      a,
      n
    );
  }
  function Wo(t, l, e, a) {
    var n = a.children, u = t !== null ? t.memoizedState : null;
    if (t === null && l.stateNode === null && (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((l.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | e : e, t !== null) {
          for (a = l.child = t.child, n = 0; a !== null; )
            n = n | a.lanes | a.childLanes, a = a.sibling;
          a = n & ~u;
        } else a = 0, l.child = null;
        return Fo(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && gu(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Is(l, u) : uc(), Ps(l);
      else
        return a = l.lanes = 536870912, Fo(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (gu(l, u.cachePool), Is(l, u), pe(), l.memoizedState = null) : (t !== null && gu(l, null), uc(), pe());
    return $t(t, l, n, e), l.child;
  }
  function En(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Fo(t, l, e, a, n) {
    var u = Pi();
    return u = u === null ? null : { parent: Bt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && gu(l, null), uc(), Ps(l), t !== null && Sa(t, l, a, !0), l.childLanes = n, null;
  }
  function Cu(t, l) {
    return l = Ru(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Io(t, l, e) {
    return Je(l, t.child, null, e), t = Cu(l, l.pendingProps), t.flags |= 2, yl(l), l.memoizedState = null, t;
  }
  function Dm(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (ct) {
        if (a.mode === "hidden")
          return t = Cu(l, a), l.lanes = 536870912, En(null, t);
        if (cc(l), (t = zt) ? (t = od(
          t,
          xl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: oe !== null ? { id: Bl, overflow: ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Rs(t), e.return = l, l.child = e, Jt = l, zt = null)) : t = null, t === null) throw de(l);
        return l.lanes = 536870912, null;
      }
      return Cu(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (cc(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Io(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Yt || Sa(t, l, e, !1), n = (e & t.childLanes) !== 0, Yt || n) {
        if (a = Tt, a !== null && (i = Xf(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Ge(t, i), fl(a, t, i), jc;
        Zu(), l = Io(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, zt = jl(i.nextSibling), Jt = l, ct = !0, re = null, xl = !1, t !== null && qs(l, t), l = Cu(l, a), l.flags |= 4096;
      return l;
    }
    return t = wl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Uu(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function Mc(t, l, e, a, n) {
    return Ze(l), e = sc(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = oc(), t !== null && !Yt ? (rc(t, l, n), Il(t, l, n)) : (ct && a && Vi(l), l.flags |= 1, $t(t, l, e, n), l.child);
  }
  function Po(t, l, e, a, n, u) {
    return Ze(l), l.updateQueue = null, e = lo(
      l,
      a,
      e,
      n
    ), to(t), a = oc(), t !== null && !Yt ? (rc(t, l, u), Il(t, l, u)) : (ct && a && Vi(l), l.flags |= 1, $t(t, l, e, u), l.child);
  }
  function tr(t, l, e, a, n) {
    if (Ze(l), l.stateNode === null) {
      var u = ya, i = e.contextType;
      typeof i == "object" && i !== null && (u = kt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = xc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, lc(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? kt(i) : ya, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (zc(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && xc.enqueueReplaceState(u, u.state, null), vn(l, a, u, n), gn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var c = l.memoizedProps, r = $e(e, c);
      u.props = r;
      var b = u.context, x = e.contextType;
      i = ya, typeof x == "object" && x !== null && (i = kt(x));
      var M = e.getDerivedStateFromProps;
      x = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, x || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || b !== i) && Lo(
        l,
        u,
        a,
        i
      ), me = !1;
      var _ = l.memoizedState;
      u.state = _, vn(l, a, u, n), gn(), b = l.memoizedState, c || _ !== b || me ? (typeof M == "function" && (zc(
        l,
        e,
        M,
        a
      ), b = l.memoizedState), (r = me || Go(
        l,
        e,
        r,
        a,
        _,
        b,
        i
      )) ? (x || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = b), u.props = a, u.state = b, u.context = i, a = r) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, ec(t, l), i = l.memoizedProps, x = $e(e, i), u.props = x, M = l.pendingProps, _ = u.context, b = e.contextType, r = ya, typeof b == "object" && b !== null && (r = kt(b)), c = e.getDerivedStateFromProps, (b = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || _ !== r) && Lo(
        l,
        u,
        a,
        r
      ), me = !1, _ = l.memoizedState, u.state = _, vn(l, a, u, n), gn();
      var A = l.memoizedState;
      i !== M || _ !== A || me || t !== null && t.dependencies !== null && mu(t.dependencies) ? (typeof c == "function" && (zc(
        l,
        e,
        c,
        a
      ), A = l.memoizedState), (x = me || Go(
        l,
        e,
        x,
        a,
        _,
        A,
        r
      ) || t !== null && t.dependencies !== null && mu(t.dependencies)) ? (b || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, A, r), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        A,
        r
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = A), u.props = a, u.state = A, u.context = r, a = x) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && _ === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, Uu(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Je(
      l,
      t.child,
      null,
      n
    ), l.child = Je(
      l,
      null,
      e,
      n
    )) : $t(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Il(
      t,
      l,
      n
    ), t;
  }
  function lr(t, l, e, a) {
    return Xe(), l.flags |= 256, $t(t, l, e, a), l.child;
  }
  var Nc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Dc(t) {
    return { baseLanes: t, cachePool: Zs() };
  }
  function Cc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= vl), t;
  }
  function er(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Rt.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (ct) {
        if (n ? ve(l) : pe(), (t = zt) ? (t = od(
          t,
          xl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: oe !== null ? { id: Bl, overflow: ql } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Rs(t), e.return = l, l.child = e, Jt = l, zt = null)) : t = null, t === null) throw de(l);
        return yf(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, n ? (pe(), n = l.mode, c = Ru(
        { mode: "hidden", children: c },
        n
      ), a = Le(
        a,
        n,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = Dc(e), a.childLanes = Cc(
        t,
        i,
        e
      ), l.memoizedState = Nc, En(null, a)) : (ve(l), Uc(l, c));
    }
    var r = t.memoizedState;
    if (r !== null && (c = r.dehydrated, c !== null)) {
      if (u)
        l.flags & 256 ? (ve(l), l.flags &= -257, l = Rc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (pe(), l.child = t.child, l.flags |= 128, l = null) : (pe(), c = a.fallback, n = l.mode, a = Ru(
          { mode: "visible", children: a.children },
          n
        ), c = Le(
          c,
          n,
          e,
          null
        ), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, Je(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = Dc(e), a.childLanes = Cc(
          t,
          i,
          e
        ), l.memoizedState = Nc, l = En(null, a));
      else if (ve(l), yf(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var b = i.dgst;
        i = b, a = Error(s(419)), a.stack = "", a.digest = i, on({ value: a, source: null, stack: null }), l = Rc(
          t,
          l,
          e
        );
      } else if (Yt || Sa(t, l, e, !1), i = (e & t.childLanes) !== 0, Yt || i) {
        if (i = Tt, i !== null && (a = Xf(i, e), a !== 0 && a !== r.retryLane))
          throw r.retryLane = a, Ge(t, a), fl(i, t, a), jc;
        mf(c) || Zu(), l = Rc(
          t,
          l,
          e
        );
      } else
        mf(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = r.treeContext, zt = jl(
          c.nextSibling
        ), Jt = l, ct = !0, re = null, xl = !1, t !== null && qs(l, t), l = Uc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (pe(), c = a.fallback, n = l.mode, r = t.child, b = r.sibling, a = wl(r, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = r.subtreeFlags & 65011712, b !== null ? c = wl(
      b,
      c
    ) : (c = Le(
      c,
      n,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, En(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = Dc(e) : (n = c.cachePool, n !== null ? (r = Bt._currentValue, n = n.parent !== r ? { parent: r, pool: r } : n) : n = Zs(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: n
    }), a.memoizedState = c, a.childLanes = Cc(
      t,
      i,
      e
    ), l.memoizedState = Nc, En(t.child, a)) : (ve(l), e = t.child, t = e.sibling, e = wl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function Uc(t, l) {
    return l = Ru(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Ru(t, l) {
    return t = hl(22, t, null, l), t.lanes = 0, t;
  }
  function Rc(t, l, e) {
    return Je(l, t.child, null, e), t = Uc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function ar(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), $i(t.return, l, e);
  }
  function Hc(t, l, e, a, n, u) {
    var i = t.memoizedState;
    i === null ? t.memoizedState = {
      isBackwards: l,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: n,
      treeForkCount: u
    } : (i.isBackwards = l, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = n, i.treeForkCount = u);
  }
  function nr(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Rt.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, B(Rt, i), $t(t, l, a, e), a = ct ? sn : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && ar(t, e, l);
        else if (t.tag === 19)
          ar(t, e, l);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === l) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (n) {
      case "forwards":
        for (e = l.child, n = null; e !== null; )
          t = e.alternate, t !== null && Eu(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), Hc(
          l,
          !1,
          n,
          e,
          u,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, n = l.child, l.child = null; n !== null; ) {
          if (t = n.alternate, t !== null && Eu(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        Hc(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        Hc(
          l,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        l.memoizedState = null;
    }
    return l.child;
  }
  function Il(t, l, e) {
    if (t !== null && (l.dependencies = t.dependencies), _e |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (Sa(
          t,
          l,
          e,
          !1
        ), (e & l.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && l.child !== t.child)
      throw Error(s(153));
    if (l.child !== null) {
      for (t = l.child, e = wl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = wl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Bc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && mu(t)));
  }
  function Cm(t, l, e) {
    switch (l.tag) {
      case 3:
        Kt(l, l.stateNode.containerInfo), he(l, Bt, t.memoizedState.cache), Xe();
        break;
      case 27:
      case 5:
        Ce(l);
        break;
      case 4:
        Kt(l, l.stateNode.containerInfo);
        break;
      case 10:
        he(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, cc(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ve(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? er(t, l, e) : (ve(l), t = Il(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        ve(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (Sa(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return nr(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), B(Rt, Rt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Wo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        he(l, Bt, t.memoizedState.cache);
    }
    return Il(t, l, e);
  }
  function ur(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Yt = !0;
      else {
        if (!Bc(t, e) && (l.flags & 128) === 0)
          return Yt = !1, Cm(
            t,
            l,
            e
          );
        Yt = (t.flags & 131072) !== 0;
      }
    else
      Yt = !1, ct && (l.flags & 1048576) !== 0 && Bs(l, sn, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ke(l.elementType), l.type = t, typeof t == "function")
            Xi(t) ? (a = $e(t, a), l.tag = 1, l = tr(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = Mc(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Lt) {
                l.tag = 11, l = Jo(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === J) {
                l.tag = 14, l = ko(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Sl(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return Mc(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 1:
        return a = l.type, n = $e(
          a,
          l.pendingProps
        ), tr(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Kt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, ec(t, l), vn(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, he(l, Bt, a), a !== u.cache && Wi(
            l,
            [Bt],
            e,
            !0
          ), gn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = lr(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = Tl(
                Error(s(424)),
                l
              ), on(n), l = lr(
                t,
                l,
                a,
                e
              );
              break t;
            } else {
              switch (t = l.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (zt = jl(t.firstChild), Jt = l, ct = !0, re = null, xl = !0, e = $s(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Xe(), a === n) {
              l = Il(
                t,
                l,
                e
              );
              break t;
            }
            $t(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return Uu(t, l), t === null ? (e = gd(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : ct || (e = l.type, t = l.pendingProps, a = Wu(
          tt.current
        ).createElement(e), a[wt] = l, a[el] = t, Wt(a, e, t), Zt(a), l.stateNode = a) : l.memoizedState = gd(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ce(l), t === null && ct && (a = l.stateNode = hd(
          l.type,
          l.pendingProps,
          tt.current
        ), Jt = l, xl = !0, n = zt, xe(l.type) ? (gf = n, zt = jl(a.firstChild)) : zt = n), $t(
          t,
          l,
          l.pendingProps.children,
          e
        ), Uu(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && ct && ((n = a = zt) && (a = fy(
          a,
          l.type,
          l.pendingProps,
          xl
        ), a !== null ? (l.stateNode = a, Jt = l, zt = jl(a.firstChild), xl = !1, n = !0) : n = !1), n || de(l)), Ce(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, rf(n, u) ? a = null : i !== null && rf(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = sc(
          t,
          l,
          Tm,
          null,
          null,
          e
        ), qn._currentValue = n), Uu(t, l), $t(t, l, a, e), l.child;
      case 6:
        return t === null && ct && ((t = e = zt) && (e = sy(
          e,
          l.pendingProps,
          xl
        ), e !== null ? (l.stateNode = e, Jt = l, zt = null, t = !0) : t = !1), t || de(l)), null;
      case 13:
        return er(t, l, e);
      case 4:
        return Kt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Je(
          l,
          null,
          a,
          e
        ) : $t(t, l, a, e), l.child;
      case 11:
        return Jo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return $t(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return $t(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return $t(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, he(l, l.type, a.value), $t(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Ze(l), n = kt(n), a = a(n), l.flags |= 1, $t(t, l, a, e), l.child;
      case 14:
        return ko(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return $o(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return nr(t, l, e);
      case 31:
        return Dm(t, l, e);
      case 22:
        return Wo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ze(l), a = kt(Bt), t === null ? (n = Pi(), n === null && (n = Tt, u = Fi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, lc(l), he(l, Bt, n)) : ((t.lanes & e) !== 0 && (ec(t, l), vn(l, null, null, e), gn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), he(l, Bt, a)) : (a = u.cache, he(l, Bt, a), a !== n.cache && Wi(
          l,
          [Bt],
          e,
          !0
        ))), $t(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 29:
        throw l.pendingProps;
    }
    throw Error(s(156, l.tag));
  }
  function Pl(t) {
    t.flags |= 4;
  }
  function qc(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Cr()) t.flags |= 8192;
        else
          throw we = pu, tc;
    } else t.flags &= -16777217;
  }
  function ir(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !_d(l))
      if (Cr()) t.flags |= 8192;
      else
        throw we = pu, tc;
  }
  function Hu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Yf() : 536870912, t.lanes |= l, Da |= l);
  }
  function Tn(t, l) {
    if (!ct)
      switch (t.tailMode) {
        case "hidden":
          l = t.tail;
          for (var e = null; l !== null; )
            l.alternate !== null && (e = l), l = l.sibling;
          e === null ? t.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = t.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? l || t.tail === null ? t.tail = null : t.tail.sibling = null : a.sibling = null;
      }
  }
  function xt(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function Um(t, l, e) {
    var a = l.pendingProps;
    switch (Ki(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return xt(l), null;
      case 1:
        return xt(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), $l(Bt), Mt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (pa(l) ? Pl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Ji())), xt(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Pl(l), u !== null ? (xt(l), ir(l, u)) : (xt(l), qc(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Pl(l), xt(l), ir(l, u)) : (xt(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Pl(l), xt(l), qc(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (Ll(l), e = tt.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return xt(l), null;
          }
          t = L.current, pa(l) ? Ys(l) : (t = hd(n, a, e), l.stateNode = t, Pl(l));
        }
        return xt(l), null;
      case 5:
        if (Ll(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return xt(l), null;
          }
          if (u = L.current, pa(l))
            Ys(l);
          else {
            var i = Wu(
              tt.current
            );
            switch (u) {
              case 1:
                u = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  n
                );
                break;
              case 2:
                u = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  n
                );
                break;
              default:
                switch (n) {
                  case "svg":
                    u = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      n
                    );
                    break;
                  case "math":
                    u = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n
                    );
                    break;
                  case "script":
                    u = i.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                    break;
                  default:
                    u = typeof a.is == "string" ? i.createElement(n, { is: a.is }) : i.createElement(n);
                }
            }
            u[wt] = l, u[el] = a;
            t: for (i = l.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                u.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === l) break t;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === l)
                  break t;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            l.stateNode = u;
            t: switch (Wt(u, n, a), n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Pl(l);
          }
        }
        return xt(l), qc(
          l,
          l.type,
          t === null ? null : t.memoizedProps,
          l.pendingProps,
          e
        ), null;
      case 6:
        if (t && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (typeof a != "string" && l.stateNode === null)
            throw Error(s(166));
          if (t = tt.current, pa(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = Jt, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[wt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || ed(t.nodeValue, e)), t || de(l, !0);
          } else
            t = Wu(t).createTextNode(
              a
            ), t[wt] = l, l.stateNode = t;
        }
        return xt(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = pa(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[wt] = l;
            } else
              Xe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            xt(l), t = !1;
          } else
            e = Ji(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (yl(l), l) : (yl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return xt(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = pa(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[wt] = l;
            } else
              Xe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            xt(l), n = !1;
          } else
            n = Ji(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (yl(l), l) : (yl(l), null);
        }
        return yl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Hu(l, l.updateQueue), xt(l), null);
      case 4:
        return Mt(), t === null && uf(l.stateNode.containerInfo), xt(l), null;
      case 10:
        return $l(l.type), xt(l), null;
      case 19:
        if (N(Rt), a = l.memoizedState, a === null) return xt(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) Tn(a, !1);
          else {
            if (Ct !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = Eu(t), u !== null) {
                  for (l.flags |= 128, Tn(a, !1), t = u.updateQueue, l.updateQueue = t, Hu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Us(e, t), e = e.sibling;
                  return B(
                    Rt,
                    Rt.current & 1 | 2
                  ), ct && Jl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && lt() > Lu && (l.flags |= 128, n = !0, Tn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = Eu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, Hu(l, t), Tn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !ct)
                return xt(l), null;
            } else
              2 * lt() - a.renderingStartTime > Lu && e !== 536870912 && (l.flags |= 128, n = !0, Tn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = lt(), t.sibling = null, e = Rt.current, B(
          Rt,
          n ? e & 1 | 2 : e & 1
        ), ct && Jl(l, a.treeForkCount), t) : (xt(l), null);
      case 22:
      case 23:
        return yl(l), ic(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (xt(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : xt(l), e = l.updateQueue, e !== null && Hu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && N(Ve), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), $l(Bt), xt(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function Rm(t, l) {
    switch (Ki(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return $l(Bt), Mt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Ll(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (yl(l), l.alternate === null)
            throw Error(s(340));
          Xe();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (yl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          Xe();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return N(Rt), null;
      case 4:
        return Mt(), null;
      case 10:
        return $l(l.type), null;
      case 22:
      case 23:
        return yl(l), ic(), t !== null && N(Ve), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return $l(Bt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function cr(t, l) {
    switch (Ki(l), l.tag) {
      case 3:
        $l(Bt), Mt();
        break;
      case 26:
      case 27:
      case 5:
        Ll(l);
        break;
      case 4:
        Mt();
        break;
      case 31:
        l.memoizedState !== null && yl(l);
        break;
      case 13:
        yl(l);
        break;
      case 19:
        N(Rt);
        break;
      case 10:
        $l(l.type);
        break;
      case 22:
      case 23:
        yl(l), ic(), t !== null && N(Ve);
        break;
      case 24:
        $l(Bt);
    }
  }
  function An(t, l) {
    try {
      var e = l.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & t) === t) {
            a = void 0;
            var u = e.create, i = e.inst;
            a = u(), i.destroy = a;
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (c) {
      pt(l, l.return, c);
    }
  }
  function Se(t, l, e) {
    try {
      var a = l.updateQueue, n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & t) === t) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, n = l;
              var r = e, b = c;
              try {
                b();
              } catch (x) {
                pt(
                  n,
                  r,
                  x
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (x) {
      pt(l, l.return, x);
    }
  }
  function fr(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Fs(l, e);
      } catch (a) {
        pt(t, t.return, a);
      }
    }
  }
  function sr(t, l, e) {
    e.props = $e(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      pt(t, l, a);
    }
  }
  function zn(t, l) {
    try {
      var e = t.ref;
      if (e !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof e == "function" ? t.refCleanup = e(a) : e.current = a;
      }
    } catch (n) {
      pt(t, l, n);
    }
  }
  function Yl(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          pt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          pt(t, l, n);
        }
      else e.current = null;
  }
  function or(t) {
    var l = t.type, e = t.memoizedProps, a = t.stateNode;
    try {
      t: switch (l) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break t;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      pt(t, t.return, n);
    }
  }
  function Yc(t, l, e) {
    try {
      var a = t.stateNode;
      ey(a, t.type, e, l), a[el] = l;
    } catch (n) {
      pt(t, t.return, n);
    }
  }
  function rr(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && xe(t.type) || t.tag === 4;
  }
  function Gc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || rr(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && xe(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Lc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Vl));
    else if (a !== 4 && (a === 27 && xe(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (Lc(t, l, e), t = t.sibling; t !== null; )
        Lc(t, l, e), t = t.sibling;
  }
  function Bu(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && xe(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Bu(t, l, e), t = t.sibling; t !== null; )
        Bu(t, l, e), t = t.sibling;
  }
  function dr(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      Wt(l, a, e), l[wt] = t, l[el] = e;
    } catch (u) {
      pt(t, t.return, u);
    }
  }
  var te = !1, Gt = !1, Xc = !1, hr = typeof WeakSet == "function" ? WeakSet : Set, Vt = null;
  function Hm(t, l) {
    if (t = t.containerInfo, sf = ai, t = As(t), Ri(t)) {
      if ("selectionStart" in t)
        var e = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          e = (e = t.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var n = a.anchorOffset, u = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, u.nodeType;
            } catch {
              e = null;
              break t;
            }
            var i = 0, c = -1, r = -1, b = 0, x = 0, M = t, _ = null;
            l: for (; ; ) {
              for (var A; M !== e || n !== 0 && M.nodeType !== 3 || (c = i + n), M !== u || a !== 0 && M.nodeType !== 3 || (r = i + a), M.nodeType === 3 && (i += M.nodeValue.length), (A = M.firstChild) !== null; )
                _ = M, M = A;
              for (; ; ) {
                if (M === t) break l;
                if (_ === e && ++b === n && (c = i), _ === u && ++x === a && (r = i), (A = M.nextSibling) !== null) break;
                M = _, _ = M.parentNode;
              }
              M = A;
            }
            e = c === -1 || r === -1 ? null : { start: c, end: r };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (of = { focusedElem: t, selectionRange: e }, ai = !1, Vt = l; Vt !== null; )
      if (l = Vt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Vt = t;
      else
        for (; Vt !== null; ) {
          switch (l = Vt, u = l.alternate, t = l.flags, l.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = l.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (e = 0; e < t.length; e++)
                  n = t[e], n.ref.impl = n.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, e = l, n = u.memoizedProps, u = u.memoizedState, a = e.stateNode;
                try {
                  var Y = $e(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    Y,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (V) {
                  pt(
                    e,
                    e.return,
                    V
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  hf(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      hf(t);
                      break;
                    default:
                      t.textContent = "";
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
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (t = l.sibling, t !== null) {
            t.return = l.return, Vt = t;
            break;
          }
          Vt = l.return;
        }
  }
  function mr(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ee(t, e), a & 4 && An(5, e);
        break;
      case 1:
        if (ee(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              pt(e, e.return, i);
            }
          else {
            var n = $e(
              e.type,
              l.memoizedProps
            );
            l = l.memoizedState;
            try {
              t.componentDidUpdate(
                n,
                l,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              pt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && fr(e), a & 512 && zn(e, e.return);
        break;
      case 3:
        if (ee(t, e), a & 64 && (t = e.updateQueue, t !== null)) {
          if (l = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                l = e.child.stateNode;
                break;
              case 1:
                l = e.child.stateNode;
            }
          try {
            Fs(t, l);
          } catch (i) {
            pt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && dr(e);
      case 26:
      case 5:
        ee(t, e), l === null && a & 4 && or(e), a & 512 && zn(e, e.return);
        break;
      case 12:
        ee(t, e);
        break;
      case 31:
        ee(t, e), a & 4 && vr(t, e);
        break;
      case 13:
        ee(t, e), a & 4 && pr(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Vm.bind(
          null,
          e
        ), oy(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || te, !a) {
          l = l !== null && l.memoizedState !== null || Gt, n = te;
          var u = Gt;
          te = a, (Gt = l) && !u ? ae(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : ee(t, e), te = n, Gt = u;
        }
        break;
      case 30:
        break;
      default:
        ee(t, e);
    }
  }
  function yr(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, yr(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && vi(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var jt = null, nl = !1;
  function le(t, l, e) {
    for (e = e.child; e !== null; )
      gr(t, l, e), e = e.sibling;
  }
  function gr(t, l, e) {
    if (ol && typeof ol.onCommitFiberUnmount == "function")
      try {
        ol.onCommitFiberUnmount(ka, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Gt || Yl(e, l), le(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Gt || Yl(e, l);
        var a = jt, n = nl;
        xe(e.type) && (jt = e.stateNode, nl = !1), le(
          t,
          l,
          e
        ), Rn(e.stateNode), jt = a, nl = n;
        break;
      case 5:
        Gt || Yl(e, l);
      case 6:
        if (a = jt, n = nl, jt = null, le(
          t,
          l,
          e
        ), jt = a, nl = n, jt !== null)
          if (nl)
            try {
              (jt.nodeType === 9 ? jt.body : jt.nodeName === "HTML" ? jt.ownerDocument.body : jt).removeChild(e.stateNode);
            } catch (u) {
              pt(
                e,
                l,
                u
              );
            }
          else
            try {
              jt.removeChild(e.stateNode);
            } catch (u) {
              pt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        jt !== null && (nl ? (t = jt, fd(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ga(t)) : fd(jt, e.stateNode));
        break;
      case 4:
        a = jt, n = nl, jt = e.stateNode.containerInfo, nl = !0, le(
          t,
          l,
          e
        ), jt = a, nl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Se(2, e, l), Gt || Se(4, e, l), le(
          t,
          l,
          e
        );
        break;
      case 1:
        Gt || (Yl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && sr(
          e,
          l,
          a
        )), le(
          t,
          l,
          e
        );
        break;
      case 21:
        le(
          t,
          l,
          e
        );
        break;
      case 22:
        Gt = (a = Gt) || e.memoizedState !== null, le(
          t,
          l,
          e
        ), Gt = a;
        break;
      default:
        le(
          t,
          l,
          e
        );
    }
  }
  function vr(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ga(t);
      } catch (e) {
        pt(l, l.return, e);
      }
    }
  }
  function pr(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ga(t);
      } catch (e) {
        pt(l, l.return, e);
      }
  }
  function Bm(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new hr()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new hr()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function qu(t, l) {
    var e = Bm(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = Km.bind(null, t, a);
        a.then(n, n);
      }
    });
  }
  function ul(t, l) {
    var e = l.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a], u = t, i = l, c = i;
        t: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (xe(c.type)) {
                jt = c.stateNode, nl = !1;
                break t;
              }
              break;
            case 5:
              jt = c.stateNode, nl = !1;
              break t;
            case 3:
            case 4:
              jt = c.stateNode.containerInfo, nl = !0;
              break t;
          }
          c = c.return;
        }
        if (jt === null) throw Error(s(160));
        gr(u, i, n), jt = null, nl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        Sr(l, t), l = l.sibling;
  }
  var Cl = null;
  function Sr(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(l, t), il(t), a & 4 && (Se(3, t, t.return), An(3, t), Se(5, t, t.return));
        break;
      case 1:
        ul(l, t), il(t), a & 512 && (Gt || e === null || Yl(e, e.return)), a & 64 && te && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Cl;
        if (ul(l, t), il(t), a & 512 && (Gt || e === null || Yl(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Fa] || u[wt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Wt(u, a, e), u[wt] = t, Zt(u), a = u;
                      break t;
                    case "link":
                      var i = Sd(
                        "link",
                        "href",
                        n
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (u = i[c], u.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && u.getAttribute("rel") === (e.rel == null ? null : e.rel) && u.getAttribute("title") === (e.title == null ? null : e.title) && u.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Wt(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = Sd(
                        "meta",
                        "content",
                        n
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (u = i[c], u.getAttribute("content") === (e.content == null ? null : "" + e.content) && u.getAttribute("name") === (e.name == null ? null : e.name) && u.getAttribute("property") === (e.property == null ? null : e.property) && u.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && u.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break l;
                          }
                      }
                      u = n.createElement(a), Wt(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[wt] = t, Zt(u), a = u;
                }
                t.stateNode = a;
              } else
                bd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = pd(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? bd(
              n,
              t.type,
              t.stateNode
            ) : pd(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && Yc(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ul(l, t), il(t), a & 512 && (Gt || e === null || Yl(e, e.return)), e !== null && a & 4 && Yc(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ul(l, t), il(t), a & 512 && (Gt || e === null || Yl(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            fa(n, "");
          } catch (Y) {
            pt(t, t.return, Y);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, Yc(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (Xc = !0);
        break;
      case 6:
        if (ul(l, t), il(t), a & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (Y) {
            pt(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (Pu = null, n = Cl, Cl = Fu(l.containerInfo), ul(l, t), Cl = n, il(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ga(l.containerInfo);
          } catch (Y) {
            pt(t, t.return, Y);
          }
        Xc && (Xc = !1, br(t));
        break;
      case 4:
        a = Cl, Cl = Fu(
          t.stateNode.containerInfo
        ), ul(l, t), il(t), Cl = a;
        break;
      case 12:
        ul(l, t), il(t);
        break;
      case 31:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 13:
        ul(l, t), il(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Gu = lt()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var r = e !== null && e.memoizedState !== null, b = te, x = Gt;
        if (te = b || n, Gt = x || r, ul(l, t), Gt = x, te = b, il(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || r || te || Gt || We(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                r = e = l;
                try {
                  if (u = r.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = r.stateNode;
                    var M = r.memoizedProps.style, _ = M != null && M.hasOwnProperty("display") ? M.display : null;
                    c.style.display = _ == null || typeof _ == "boolean" ? "" : ("" + _).trim();
                  }
                } catch (Y) {
                  pt(r, r.return, Y);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                r = l;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (Y) {
                  pt(r, r.return, Y);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                r = l;
                try {
                  var A = r.stateNode;
                  n ? sd(A, !0) : sd(r.stateNode, !1);
                } catch (Y) {
                  pt(r, r.return, Y);
                }
              }
            } else if ((l.tag !== 22 && l.tag !== 23 || l.memoizedState === null || l === t) && l.child !== null) {
              l.child.return = l, l = l.child;
              continue;
            }
            if (l === t) break t;
            for (; l.sibling === null; ) {
              if (l.return === null || l.return === t) break t;
              e === l && (e = null), l = l.return;
            }
            e === l && (e = null), l.sibling.return = l.return, l = l.sibling;
          }
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, qu(t, e))));
        break;
      case 19:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, qu(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ul(l, t), il(t);
    }
  }
  function il(t) {
    var l = t.flags;
    if (l & 2) {
      try {
        for (var e, a = t.return; a !== null; ) {
          if (rr(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Gc(t);
            Bu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (fa(i, ""), e.flags &= -33);
            var c = Gc(t);
            Bu(t, c, i);
            break;
          case 3:
          case 4:
            var r = e.stateNode.containerInfo, b = Gc(t);
            Lc(
              t,
              b,
              r
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (x) {
        pt(t, t.return, x);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function br(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        br(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function ee(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        mr(t, l.alternate, l), l = l.sibling;
  }
  function We(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Se(4, l, l.return), We(l);
          break;
        case 1:
          Yl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && sr(
            l,
            l.return,
            e
          ), We(l);
          break;
        case 27:
          Rn(l.stateNode);
        case 26:
        case 5:
          Yl(l, l.return), We(l);
          break;
        case 22:
          l.memoizedState === null && We(l);
          break;
        case 30:
          We(l);
          break;
        default:
          We(l);
      }
      t = t.sibling;
    }
  }
  function ae(t, l, e) {
    for (e = e && (l.subtreeFlags & 8772) !== 0, l = l.child; l !== null; ) {
      var a = l.alternate, n = t, u = l, i = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ae(
            n,
            u,
            e
          ), An(4, u);
          break;
        case 1:
          if (ae(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (b) {
              pt(a, a.return, b);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Ws(r[n], c);
            } catch (b) {
              pt(a, a.return, b);
            }
          }
          e && i & 64 && fr(u), zn(u, u.return);
          break;
        case 27:
          dr(u);
        case 26:
        case 5:
          ae(
            n,
            u,
            e
          ), e && a === null && i & 4 && or(u), zn(u, u.return);
          break;
        case 12:
          ae(
            n,
            u,
            e
          );
          break;
        case 31:
          ae(
            n,
            u,
            e
          ), e && i & 4 && vr(n, u);
          break;
        case 13:
          ae(
            n,
            u,
            e
          ), e && i & 4 && pr(n, u);
          break;
        case 22:
          u.memoizedState === null && ae(
            n,
            u,
            e
          ), zn(u, u.return);
          break;
        case 30:
          break;
        default:
          ae(
            n,
            u,
            e
          );
      }
      l = l.sibling;
    }
  }
  function Qc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && rn(e));
  }
  function Zc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && rn(t));
  }
  function Ul(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        _r(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function _r(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ul(
          t,
          l,
          e,
          a
        ), n & 2048 && An(9, l);
        break;
      case 1:
        Ul(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Ul(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && rn(t)));
        break;
      case 12:
        if (n & 2048) {
          Ul(
            t,
            l,
            e,
            a
          ), t = l.stateNode;
          try {
            var u = l.memoizedProps, i = u.id, c = u.onPostCommit;
            typeof c == "function" && c(
              i,
              l.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (r) {
            pt(l, l.return, r);
          }
        } else
          Ul(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Ul(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Ul(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Ul(
          t,
          l,
          e,
          a
        ) : xn(t, l) : u._visibility & 2 ? Ul(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, ja(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Qc(i, l);
        break;
      case 24:
        Ul(
          t,
          l,
          e,
          a
        ), n & 2048 && Zc(l.alternate, l);
        break;
      default:
        Ul(
          t,
          l,
          e,
          a
        );
    }
  }
  function ja(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, c = e, r = a, b = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ja(
            u,
            i,
            c,
            r,
            n
          ), An(8, i);
          break;
        case 23:
          break;
        case 22:
          var x = i.stateNode;
          i.memoizedState !== null ? x._visibility & 2 ? ja(
            u,
            i,
            c,
            r,
            n
          ) : xn(
            u,
            i
          ) : (x._visibility |= 2, ja(
            u,
            i,
            c,
            r,
            n
          )), n && b & 2048 && Qc(
            i.alternate,
            i
          );
          break;
        case 24:
          ja(
            u,
            i,
            c,
            r,
            n
          ), n && b & 2048 && Zc(i.alternate, i);
          break;
        default:
          ja(
            u,
            i,
            c,
            r,
            n
          );
      }
      l = l.sibling;
    }
  }
  function xn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            xn(e, a), n & 2048 && Qc(
              a.alternate,
              a
            );
            break;
          case 24:
            xn(e, a), n & 2048 && Zc(a.alternate, a);
            break;
          default:
            xn(e, a);
        }
        l = l.sibling;
      }
  }
  var On = 8192;
  function Ma(t, l, e) {
    if (t.subtreeFlags & On)
      for (t = t.child; t !== null; )
        Er(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function Er(t, l, e) {
    switch (t.tag) {
      case 26:
        Ma(
          t,
          l,
          e
        ), t.flags & On && t.memoizedState !== null && Ey(
          e,
          Cl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ma(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Cl;
        Cl = Fu(t.stateNode.containerInfo), Ma(
          t,
          l,
          e
        ), Cl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = On, On = 16777216, Ma(
          t,
          l,
          e
        ), On = a) : Ma(
          t,
          l,
          e
        ));
        break;
      default:
        Ma(
          t,
          l,
          e
        );
    }
  }
  function Tr(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function jn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Vt = a, zr(
            a,
            t
          );
        }
      Tr(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Ar(t), t = t.sibling;
  }
  function Ar(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        jn(t), t.flags & 2048 && Se(9, t, t.return);
        break;
      case 3:
        jn(t);
        break;
      case 12:
        jn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, Yu(t)) : jn(t);
        break;
      default:
        jn(t);
    }
  }
  function Yu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Vt = a, zr(
            a,
            t
          );
        }
      Tr(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Se(8, l, l.return), Yu(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, Yu(l));
          break;
        default:
          Yu(l);
      }
      t = t.sibling;
    }
  }
  function zr(t, l) {
    for (; Vt !== null; ) {
      var e = Vt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Se(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          rn(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Vt = a;
      else
        t: for (e = t; Vt !== null; ) {
          a = Vt;
          var n = a.sibling, u = a.return;
          if (yr(a), a === e) {
            Vt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Vt = n;
            break t;
          }
          Vt = u;
        }
    }
  }
  var qm = {
    getCacheForType: function(t) {
      var l = kt(Bt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return kt(Bt).controller.signal;
    }
  }, Ym = typeof WeakMap == "function" ? WeakMap : Map, dt = 0, Tt = null, et = null, ut = 0, vt = 0, gl = null, be = !1, Na = !1, Vc = !1, ne = 0, Ct = 0, _e = 0, Fe = 0, Kc = 0, vl = 0, Da = 0, Mn = null, cl = null, wc = !1, Gu = 0, xr = 0, Lu = 1 / 0, Xu = null, Ee = null, Xt = 0, Te = null, Ca = null, ue = 0, Jc = 0, kc = null, Or = null, Nn = 0, $c = null;
  function pl() {
    return (dt & 2) !== 0 && ut !== 0 ? ut & -ut : z.T !== null ? lf() : Qf();
  }
  function jr() {
    if (vl === 0)
      if ((ut & 536870912) === 0 || ct) {
        var t = $n;
        $n <<= 1, ($n & 3932160) === 0 && ($n = 262144), vl = t;
      } else vl = 536870912;
    return t = ml.current, t !== null && (t.flags |= 32), vl;
  }
  function fl(t, l, e) {
    (t === Tt && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null) && (Ua(t, 0), Ae(
      t,
      ut,
      vl,
      !1
    )), Wa(t, e), ((dt & 2) === 0 || t !== Tt) && (t === Tt && ((dt & 2) === 0 && (Fe |= e), Ct === 4 && Ae(
      t,
      ut,
      vl,
      !1
    )), Gl(t));
  }
  function Mr(t, l, e) {
    if ((dt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || $a(t, l), n = a ? Xm(t, l) : Fc(t, l, !0), u = a;
    do {
      if (n === 0) {
        Na && !a && Ae(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !Gm(e)) {
          n = Fc(t, l, !1), u = !1;
          continue;
        }
        if (n === 2) {
          if (u = l, t.errorRecoveryDisabledLanes & u)
            var i = 0;
          else
            i = t.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            l = i;
            t: {
              var c = t;
              n = Mn;
              var r = c.current.memoizedState.isDehydrated;
              if (r && (Ua(c, i).flags |= 256), i = Fc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Vc && !r) {
                  c.errorRecoveryDisabledLanes |= u, Fe |= u, n = 4;
                  break t;
                }
                u = cl, cl = n, u !== null && (cl === null ? cl = u : cl.push.apply(
                  cl,
                  u
                ));
              }
              n = i;
            }
            if (u = !1, n !== 2) continue;
          }
        }
        if (n === 1) {
          Ua(t, 0), Ae(t, l, 0, !0);
          break;
        }
        t: {
          switch (a = t, u = n, u) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((l & 4194048) !== l) break;
            case 6:
              Ae(
                a,
                l,
                vl,
                !be
              );
              break t;
            case 2:
              cl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((l & 62914560) === l && (n = Gu + 300 - lt(), 10 < n)) {
            if (Ae(
              a,
              l,
              vl,
              !be
            ), Fn(a, 0, !0) !== 0) break t;
            ue = l, a.timeoutHandle = id(
              Nr.bind(
                null,
                a,
                e,
                cl,
                Xu,
                wc,
                l,
                vl,
                Fe,
                Da,
                be,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          Nr(
            a,
            e,
            cl,
            Xu,
            wc,
            l,
            vl,
            Fe,
            Da,
            be,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Gl(t);
  }
  function Nr(t, l, e, a, n, u, i, c, r, b, x, M, _, A) {
    if (t.timeoutHandle = -1, M = l.subtreeFlags, M & 8192 || (M & 16785408) === 16785408) {
      M = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Vl
      }, Er(
        l,
        u,
        M
      );
      var Y = (u & 62914560) === u ? Gu - lt() : (u & 4194048) === u ? xr - lt() : 0;
      if (Y = Ty(
        M,
        Y
      ), Y !== null) {
        ue = u, t.cancelPendingCommit = Y(
          Yr.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            c,
            r,
            x,
            M,
            null,
            _,
            A
          )
        ), Ae(t, u, i, !b);
        return;
      }
    }
    Yr(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      c,
      r
    );
  }
  function Gm(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!dl(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = l.child, l.subtreeFlags & 16384 && e !== null)
        e.return = l, l = e;
      else {
        if (l === t) break;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) return !0;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }
    return !0;
  }
  function Ae(t, l, e, a) {
    l &= ~Kc, l &= ~Fe, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - rl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && Gf(t, e, l);
  }
  function Qu() {
    return (dt & 6) === 0 ? (Dn(0), !1) : !0;
  }
  function Wc() {
    if (et !== null) {
      if (vt === 0)
        var t = et.return;
      else
        t = et, kl = Qe = null, dc(t), Ta = null, hn = 0, t = et;
      for (; t !== null; )
        cr(t.alternate, t), t = t.return;
      et = null;
    }
  }
  function Ua(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, uy(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ue = 0, Wc(), Tt = t, et = e = wl(t.current, null), ut = l, vt = 0, gl = null, be = !1, Na = $a(t, l), Vc = !1, Da = vl = Kc = Fe = _e = Ct = 0, cl = Mn = null, wc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - rl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return ne = l, su(), e;
  }
  function Dr(t, l) {
    W = null, z.H = _n, l === Ea || l === vu ? (l = ws(), vt = 3) : l === tc ? (l = ws(), vt = 4) : vt = l === jc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, gl = l, et === null && (Ct = 1, Du(
      t,
      Tl(l, t.current)
    ));
  }
  function Cr() {
    var t = ml.current;
    return t === null ? !0 : (ut & 4194048) === ut ? Ol === null : (ut & 62914560) === ut || (ut & 536870912) !== 0 ? t === Ol : !1;
  }
  function Ur() {
    var t = z.H;
    return z.H = _n, t === null ? _n : t;
  }
  function Rr() {
    var t = z.A;
    return z.A = qm, t;
  }
  function Zu() {
    Ct = 4, be || (ut & 4194048) !== ut && ml.current !== null || (Na = !0), (_e & 134217727) === 0 && (Fe & 134217727) === 0 || Tt === null || Ae(
      Tt,
      ut,
      vl,
      !1
    );
  }
  function Fc(t, l, e) {
    var a = dt;
    dt |= 2;
    var n = Ur(), u = Rr();
    (Tt !== t || ut !== l) && (Xu = null, Ua(t, l)), l = !1;
    var i = Ct;
    t: do
      try {
        if (vt !== 0 && et !== null) {
          var c = et, r = gl;
          switch (vt) {
            case 8:
              Wc(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ml.current === null && (l = !0);
              var b = vt;
              if (vt = 0, gl = null, Ra(t, c, r, b), e && Na) {
                i = 0;
                break t;
              }
              break;
            default:
              b = vt, vt = 0, gl = null, Ra(t, c, r, b);
          }
        }
        Lm(), i = Ct;
        break;
      } catch (x) {
        Dr(t, x);
      }
    while (!0);
    return l && t.shellSuspendCounter++, kl = Qe = null, dt = a, z.H = n, z.A = u, et === null && (Tt = null, ut = 0, su()), i;
  }
  function Lm() {
    for (; et !== null; ) Hr(et);
  }
  function Xm(t, l) {
    var e = dt;
    dt |= 2;
    var a = Ur(), n = Rr();
    Tt !== t || ut !== l ? (Xu = null, Lu = lt() + 500, Ua(t, l)) : Na = $a(
      t,
      l
    );
    t: do
      try {
        if (vt !== 0 && et !== null) {
          l = et;
          var u = gl;
          l: switch (vt) {
            case 1:
              vt = 0, gl = null, Ra(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (Vs(u)) {
                vt = 0, gl = null, Br(l);
                break;
              }
              l = function() {
                vt !== 2 && vt !== 9 || Tt !== t || (vt = 7), Gl(t);
              }, u.then(l, l);
              break t;
            case 3:
              vt = 7;
              break t;
            case 4:
              vt = 5;
              break t;
            case 7:
              Vs(u) ? (vt = 0, gl = null, Br(l)) : (vt = 0, gl = null, Ra(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (et.tag) {
                case 26:
                  i = et.memoizedState;
                case 5:
                case 27:
                  var c = et;
                  if (i ? _d(i) : c.stateNode.complete) {
                    vt = 0, gl = null;
                    var r = c.sibling;
                    if (r !== null) et = r;
                    else {
                      var b = c.return;
                      b !== null ? (et = b, Vu(b)) : et = null;
                    }
                    break l;
                  }
              }
              vt = 0, gl = null, Ra(t, l, u, 5);
              break;
            case 6:
              vt = 0, gl = null, Ra(t, l, u, 6);
              break;
            case 8:
              Wc(), Ct = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Qm();
        break;
      } catch (x) {
        Dr(t, x);
      }
    while (!0);
    return kl = Qe = null, z.H = a, z.A = n, dt = e, et !== null ? 0 : (Tt = null, ut = 0, su(), Ct);
  }
  function Qm() {
    for (; et !== null && !Jn(); )
      Hr(et);
  }
  function Hr(t) {
    var l = ur(t.alternate, t, ne);
    t.memoizedProps = t.pendingProps, l === null ? Vu(t) : et = l;
  }
  function Br(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Po(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          ut
        );
        break;
      case 11:
        l = Po(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          ut
        );
        break;
      case 5:
        dc(l);
      default:
        cr(e, l), l = et = Us(l, ne), l = ur(e, l, ne);
    }
    t.memoizedProps = t.pendingProps, l === null ? Vu(t) : et = l;
  }
  function Ra(t, l, e, a) {
    kl = Qe = null, dc(l), Ta = null, hn = 0;
    var n = l.return;
    try {
      if (Nm(
        t,
        n,
        l,
        e,
        ut
      )) {
        Ct = 1, Du(
          t,
          Tl(e, t.current)
        ), et = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw et = n, u;
      Ct = 1, Du(
        t,
        Tl(e, t.current)
      ), et = null;
      return;
    }
    l.flags & 32768 ? (ct || a === 1 ? t = !0 : Na || (ut & 536870912) !== 0 ? t = !1 : (be = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ml.current, a !== null && a.tag === 13 && (a.flags |= 16384))), qr(l, t)) : Vu(l);
  }
  function Vu(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        qr(
          l,
          be
        );
        return;
      }
      t = l.return;
      var e = Um(
        l.alternate,
        l,
        ne
      );
      if (e !== null) {
        et = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        et = l;
        return;
      }
      et = l = t;
    } while (l !== null);
    Ct === 0 && (Ct = 5);
  }
  function qr(t, l) {
    do {
      var e = Rm(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, et = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        et = t;
        return;
      }
      et = t = e;
    } while (t !== null);
    Ct = 6, et = null;
  }
  function Yr(t, l, e, a, n, u, i, c, r) {
    t.cancelPendingCommit = null;
    do
      Ku();
    while (Xt !== 0);
    if ((dt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (u = l.lanes | l.childLanes, u |= Gi, _h(
        t,
        e,
        u,
        i,
        c,
        r
      ), t === Tt && (et = Tt = null, ut = 0), Ca = l, Te = t, ue = e, Jc = u, kc = n, Or = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, wm(Nl, function() {
        return Zr(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = z.T, z.T = null, n = R.p, R.p = 2, i = dt, dt |= 4;
        try {
          Hm(t, l, e);
        } finally {
          dt = i, R.p = n, z.T = a;
        }
      }
      Xt = 1, Gr(), Lr(), Xr();
    }
  }
  function Gr() {
    if (Xt === 1) {
      Xt = 0;
      var t = Te, l = Ca, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = z.T, z.T = null;
        var a = R.p;
        R.p = 2;
        var n = dt;
        dt |= 4;
        try {
          Sr(l, t);
          var u = of, i = As(t.containerInfo), c = u.focusedElem, r = u.selectionRange;
          if (i !== c && c && c.ownerDocument && Ts(
            c.ownerDocument.documentElement,
            c
          )) {
            if (r !== null && Ri(c)) {
              var b = r.start, x = r.end;
              if (x === void 0 && (x = b), "selectionStart" in c)
                c.selectionStart = b, c.selectionEnd = Math.min(
                  x,
                  c.value.length
                );
              else {
                var M = c.ownerDocument || document, _ = M && M.defaultView || window;
                if (_.getSelection) {
                  var A = _.getSelection(), Y = c.textContent.length, V = Math.min(r.start, Y), _t = r.end === void 0 ? V : Math.min(r.end, Y);
                  !A.extend && V > _t && (i = _t, _t = V, V = i);
                  var p = Es(
                    c,
                    V
                  ), h = Es(
                    c,
                    _t
                  );
                  if (p && h && (A.rangeCount !== 1 || A.anchorNode !== p.node || A.anchorOffset !== p.offset || A.focusNode !== h.node || A.focusOffset !== h.offset)) {
                    var S = M.createRange();
                    S.setStart(p.node, p.offset), A.removeAllRanges(), V > _t ? (A.addRange(S), A.extend(h.node, h.offset)) : (S.setEnd(h.node, h.offset), A.addRange(S));
                  }
                }
              }
            }
            for (M = [], A = c; A = A.parentNode; )
              A.nodeType === 1 && M.push({
                element: A,
                left: A.scrollLeft,
                top: A.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < M.length; c++) {
              var j = M[c];
              j.element.scrollLeft = j.left, j.element.scrollTop = j.top;
            }
          }
          ai = !!sf, of = sf = null;
        } finally {
          dt = n, R.p = a, z.T = e;
        }
      }
      t.current = l, Xt = 2;
    }
  }
  function Lr() {
    if (Xt === 2) {
      Xt = 0;
      var t = Te, l = Ca, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = z.T, z.T = null;
        var a = R.p;
        R.p = 2;
        var n = dt;
        dt |= 4;
        try {
          mr(t, l.alternate, l);
        } finally {
          dt = n, R.p = a, z.T = e;
        }
      }
      Xt = 3;
    }
  }
  function Xr() {
    if (Xt === 4 || Xt === 3) {
      Xt = 0, C();
      var t = Te, l = Ca, e = ue, a = Or;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Xt = 5 : (Xt = 0, Ca = Te = null, Qr(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Ee = null), yi(e), l = l.stateNode, ol && typeof ol.onCommitFiberRoot == "function")
        try {
          ol.onCommitFiberRoot(
            ka,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = z.T, n = R.p, R.p = 2, z.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            u(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          z.T = l, R.p = n;
        }
      }
      (ue & 3) !== 0 && Ku(), Gl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === $c ? Nn++ : (Nn = 0, $c = t) : Nn = 0, Dn(0);
    }
  }
  function Qr(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, rn(l)));
  }
  function Ku() {
    return Gr(), Lr(), Xr(), Zr();
  }
  function Zr() {
    if (Xt !== 5) return !1;
    var t = Te, l = Jc;
    Jc = 0;
    var e = yi(ue), a = z.T, n = R.p;
    try {
      R.p = 32 > e ? 32 : e, z.T = null, e = kc, kc = null;
      var u = Te, i = ue;
      if (Xt = 0, Ca = Te = null, ue = 0, (dt & 6) !== 0) throw Error(s(331));
      var c = dt;
      if (dt |= 4, Ar(u.current), _r(
        u,
        u.current,
        i,
        e
      ), dt = c, Dn(0, !1), ol && typeof ol.onPostCommitFiberRoot == "function")
        try {
          ol.onPostCommitFiberRoot(ka, u);
        } catch {
        }
      return !0;
    } finally {
      R.p = n, z.T = a, Qr(t, l);
    }
  }
  function Vr(t, l, e) {
    l = Tl(e, l), l = Oc(t.stateNode, l, 2), t = ge(t, l, 2), t !== null && (Wa(t, 2), Gl(t));
  }
  function pt(t, l, e) {
    if (t.tag === 3)
      Vr(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          Vr(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ee === null || !Ee.has(a))) {
            t = Tl(e, t), e = Ko(2), a = ge(l, e, 2), a !== null && (wo(
              e,
              a,
              l,
              t
            ), Wa(a, 2), Gl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function Ic(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new Ym();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (Vc = !0, n.add(e), t = Zm.bind(null, t, l, e), l.then(t, t));
  }
  function Zm(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Tt === t && (ut & e) === e && (Ct === 4 || Ct === 3 && (ut & 62914560) === ut && 300 > lt() - Gu ? (dt & 2) === 0 && Ua(t, 0) : Kc |= e, Da === ut && (Da = 0)), Gl(t);
  }
  function Kr(t, l) {
    l === 0 && (l = Yf()), t = Ge(t, l), t !== null && (Wa(t, l), Gl(t));
  }
  function Vm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Kr(t, e);
  }
  function Km(t, l) {
    var e = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode, n = t.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(l), Kr(t, e);
  }
  function wm(t, l) {
    return wa(t, l);
  }
  var wu = null, Ha = null, Pc = !1, Ju = !1, tf = !1, ze = 0;
  function Gl(t) {
    t !== Ha && t.next === null && (Ha === null ? wu = Ha = t : Ha = Ha.next = t), Ju = !0, Pc || (Pc = !0, km());
  }
  function Dn(t, l) {
    if (!tf && Ju) {
      tf = !0;
      do
        for (var e = !1, a = wu; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              u = (1 << 31 - rl(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, $r(a, u));
          } else
            u = ut, u = Fn(
              a,
              a === Tt ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || $a(a, u) || (e = !0, $r(a, u));
          a = a.next;
        }
      while (e);
      tf = !1;
    }
  }
  function Jm() {
    wr();
  }
  function wr() {
    Ju = Pc = !1;
    var t = 0;
    ze !== 0 && ny() && (t = ze);
    for (var l = lt(), e = null, a = wu; a !== null; ) {
      var n = a.next, u = Jr(a, l);
      u === 0 ? (a.next = null, e === null ? wu = n : e.next = n, n === null && (Ha = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Ju = !0)), a = n;
    }
    Xt !== 0 && Xt !== 5 || Dn(t), ze !== 0 && (ze = 0);
  }
  function Jr(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - rl(u), c = 1 << i, r = n[i];
      r === -1 ? ((c & e) === 0 || (c & a) !== 0) && (n[i] = bh(c, l)) : r <= l && (t.expiredLanes |= c), u &= ~c;
    }
    if (l = Tt, e = ut, e = Fn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Ja(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || $a(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Ja(a), yi(e)) {
        case 2:
        case 8:
          e = Et;
          break;
        case 32:
          e = Nl;
          break;
        case 268435456:
          e = Ql;
          break;
        default:
          e = Nl;
      }
      return a = kr.bind(null, t), e = wa(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Ja(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function kr(t, l) {
    if (Xt !== 0 && Xt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Ku() && t.callbackNode !== e)
      return null;
    var a = ut;
    return a = Fn(
      t,
      t === Tt ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (Mr(t, a, l), Jr(t, lt()), t.callbackNode != null && t.callbackNode === e ? kr.bind(null, t) : null);
  }
  function $r(t, l) {
    if (Ku()) return null;
    Mr(t, l, !0);
  }
  function km() {
    iy(function() {
      (dt & 6) !== 0 ? wa(
        Ue,
        Jm
      ) : wr();
    });
  }
  function lf() {
    if (ze === 0) {
      var t = ba;
      t === 0 && (t = kn, kn <<= 1, (kn & 261888) === 0 && (kn = 256)), ze = t;
    }
    return ze;
  }
  function Wr(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : lu("" + t);
  }
  function Fr(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function $m(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Wr(
        (n[el] || null).action
      ), i = a.submitter;
      i && (l = (l = i[el] || null) ? Wr(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var c = new uu(
        "action",
        "action",
        null,
        a,
        n
      );
      t.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ze !== 0) {
                  var r = i ? Fr(n, i) : new FormData(n);
                  _c(
                    e,
                    {
                      pending: !0,
                      data: r,
                      method: n.method,
                      action: u
                    },
                    null,
                    r
                  );
                }
              } else
                typeof u == "function" && (c.preventDefault(), r = i ? Fr(n, i) : new FormData(n), _c(
                  e,
                  {
                    pending: !0,
                    data: r,
                    method: n.method,
                    action: u
                  },
                  u,
                  r
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var ef = 0; ef < Yi.length; ef++) {
    var af = Yi[ef], Wm = af.toLowerCase(), Fm = af[0].toUpperCase() + af.slice(1);
    Dl(
      Wm,
      "on" + Fm
    );
  }
  Dl(Os, "onAnimationEnd"), Dl(js, "onAnimationIteration"), Dl(Ms, "onAnimationStart"), Dl("dblclick", "onDoubleClick"), Dl("focusin", "onFocus"), Dl("focusout", "onBlur"), Dl(hm, "onTransitionRun"), Dl(mm, "onTransitionStart"), Dl(ym, "onTransitionCancel"), Dl(Ns, "onTransitionEnd"), ia("onMouseEnter", ["mouseout", "mouseover"]), ia("onMouseLeave", ["mouseout", "mouseover"]), ia("onPointerEnter", ["pointerout", "pointerover"]), ia("onPointerLeave", ["pointerout", "pointerover"]), He(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), He(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), He("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), He(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), He(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), He(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Cn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Im = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cn)
  );
  function Ir(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], r = c.instance, b = c.currentTarget;
            if (c = c.listener, r !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = b;
            try {
              u(n);
            } catch (x) {
              fu(x);
            }
            n.currentTarget = null, u = r;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], r = c.instance, b = c.currentTarget, c = c.listener, r !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = b;
            try {
              u(n);
            } catch (x) {
              fu(x);
            }
            n.currentTarget = null, u = r;
          }
      }
    }
  }
  function at(t, l) {
    var e = l[gi];
    e === void 0 && (e = l[gi] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Pr(l, t, 2, !1), e.add(a));
  }
  function nf(t, l, e) {
    var a = 0;
    l && (a |= 4), Pr(
      e,
      t,
      a,
      l
    );
  }
  var ku = "_reactListening" + Math.random().toString(36).slice(2);
  function uf(t) {
    if (!t[ku]) {
      t[ku] = !0, Kf.forEach(function(e) {
        e !== "selectionchange" && (Im.has(e) || nf(e, !1, t), nf(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[ku] || (l[ku] = !0, nf("selectionchange", !1, l));
    }
  }
  function Pr(t, l, e, a) {
    switch (jd(l)) {
      case 2:
        var n = xy;
        break;
      case 8:
        n = Oy;
        break;
      default:
        n = _f;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !zi || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function cf(t, l, e, a, n) {
    var u = a;
    if ((l & 1) === 0 && (l & 2) === 0 && a !== null)
      t: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === n) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var r = i.tag;
              if ((r === 3 || r === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = aa(c), i === null) return;
            if (r = i.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              a = u = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    as(function() {
      var b = u, x = Ti(e), M = [];
      t: {
        var _ = Ds.get(t);
        if (_ !== void 0) {
          var A = uu, Y = t;
          switch (t) {
            case "keypress":
              if (au(e) === 0) break t;
            case "keydown":
            case "keyup":
              A = Kh;
              break;
            case "focusin":
              Y = "focus", A = Mi;
              break;
            case "focusout":
              Y = "blur", A = Mi;
              break;
            case "beforeblur":
            case "afterblur":
              A = Mi;
              break;
            case "click":
              if (e.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              A = is;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              A = Uh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              A = kh;
              break;
            case Os:
            case js:
            case Ms:
              A = Bh;
              break;
            case Ns:
              A = Wh;
              break;
            case "scroll":
            case "scrollend":
              A = Dh;
              break;
            case "wheel":
              A = Ih;
              break;
            case "copy":
            case "cut":
            case "paste":
              A = Yh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              A = fs;
              break;
            case "toggle":
            case "beforetoggle":
              A = tm;
          }
          var V = (l & 4) !== 0, _t = !V && (t === "scroll" || t === "scrollend"), p = V ? _ !== null ? _ + "Capture" : null : _;
          V = [];
          for (var h = b, S; h !== null; ) {
            var j = h;
            if (S = j.stateNode, j = j.tag, j !== 5 && j !== 26 && j !== 27 || S === null || p === null || (j = Pa(h, p), j != null && V.push(
              Un(h, j, S)
            )), _t) break;
            h = h.return;
          }
          0 < V.length && (_ = new A(
            _,
            Y,
            null,
            e,
            x
          ), M.push({ event: _, listeners: V }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (_ = t === "mouseover" || t === "pointerover", A = t === "mouseout" || t === "pointerout", _ && e !== Ei && (Y = e.relatedTarget || e.fromElement) && (aa(Y) || Y[ea]))
            break t;
          if ((A || _) && (_ = x.window === x ? x : (_ = x.ownerDocument) ? _.defaultView || _.parentWindow : window, A ? (Y = e.relatedTarget || e.toElement, A = b, Y = Y ? aa(Y) : null, Y !== null && (_t = O(Y), V = Y.tag, Y !== _t || V !== 5 && V !== 27 && V !== 6) && (Y = null)) : (A = null, Y = b), A !== Y)) {
            if (V = is, j = "onMouseLeave", p = "onMouseEnter", h = "mouse", (t === "pointerout" || t === "pointerover") && (V = fs, j = "onPointerLeave", p = "onPointerEnter", h = "pointer"), _t = A == null ? _ : Ia(A), S = Y == null ? _ : Ia(Y), _ = new V(
              j,
              h + "leave",
              A,
              e,
              x
            ), _.target = _t, _.relatedTarget = S, j = null, aa(x) === b && (V = new V(
              p,
              h + "enter",
              Y,
              e,
              x
            ), V.target = S, V.relatedTarget = _t, j = V), _t = j, A && Y)
              l: {
                for (V = Pm, p = A, h = Y, S = 0, j = p; j; j = V(j))
                  S++;
                j = 0;
                for (var Z = h; Z; Z = V(Z))
                  j++;
                for (; 0 < S - j; )
                  p = V(p), S--;
                for (; 0 < j - S; )
                  h = V(h), j--;
                for (; S--; ) {
                  if (p === h || h !== null && p === h.alternate) {
                    V = p;
                    break l;
                  }
                  p = V(p), h = V(h);
                }
                V = null;
              }
            else V = null;
            A !== null && td(
              M,
              _,
              A,
              V,
              !1
            ), Y !== null && _t !== null && td(
              M,
              _t,
              Y,
              V,
              !0
            );
          }
        }
        t: {
          if (_ = b ? Ia(b) : window, A = _.nodeName && _.nodeName.toLowerCase(), A === "select" || A === "input" && _.type === "file")
            var ot = gs;
          else if (ms(_))
            if (vs)
              ot = om;
            else {
              ot = fm;
              var X = cm;
            }
          else
            A = _.nodeName, !A || A.toLowerCase() !== "input" || _.type !== "checkbox" && _.type !== "radio" ? b && _i(b.elementType) && (ot = gs) : ot = sm;
          if (ot && (ot = ot(t, b))) {
            ys(
              M,
              ot,
              e,
              x
            );
            break t;
          }
          X && X(t, _, b), t === "focusout" && b && _.type === "number" && b.memoizedProps.value != null && bi(_, "number", _.value);
        }
        switch (X = b ? Ia(b) : window, t) {
          case "focusin":
            (ms(X) || X.contentEditable === "true") && (da = X, Hi = b, fn = null);
            break;
          case "focusout":
            fn = Hi = da = null;
            break;
          case "mousedown":
            Bi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Bi = !1, zs(M, e, x);
            break;
          case "selectionchange":
            if (dm) break;
          case "keydown":
          case "keyup":
            zs(M, e, x);
        }
        var I;
        if (Di)
          t: {
            switch (t) {
              case "compositionstart":
                var it = "onCompositionStart";
                break t;
              case "compositionend":
                it = "onCompositionEnd";
                break t;
              case "compositionupdate":
                it = "onCompositionUpdate";
                break t;
            }
            it = void 0;
          }
        else
          ra ? ds(t, e) && (it = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (it = "onCompositionStart");
        it && (ss && e.locale !== "ko" && (ra || it !== "onCompositionStart" ? it === "onCompositionEnd" && ra && (I = ns()) : (se = x, xi = "value" in se ? se.value : se.textContent, ra = !0)), X = $u(b, it), 0 < X.length && (it = new cs(
          it,
          t,
          null,
          e,
          x
        ), M.push({ event: it, listeners: X }), I ? it.data = I : (I = hs(e), I !== null && (it.data = I)))), (I = em ? am(t, e) : nm(t, e)) && (it = $u(b, "onBeforeInput"), 0 < it.length && (X = new cs(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          x
        ), M.push({
          event: X,
          listeners: it
        }), X.data = I)), $m(
          M,
          t,
          b,
          e,
          x
        );
      }
      Ir(M, l);
    });
  }
  function Un(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function $u(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Pa(t, e), n != null && a.unshift(
        Un(t, n, u)
      ), n = Pa(t, l), n != null && a.push(
        Un(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Pm(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function td(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, r = c.alternate, b = c.stateNode;
      if (c = c.tag, r !== null && r === a) break;
      c !== 5 && c !== 26 && c !== 27 || b === null || (r = b, n ? (b = Pa(e, u), b != null && i.unshift(
        Un(e, b, r)
      )) : n || (b = Pa(e, u), b != null && i.push(
        Un(e, b, r)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var ty = /\r\n?/g, ly = /\u0000|\uFFFD/g;
  function ld(t) {
    return (typeof t == "string" ? t : "" + t).replace(ty, `
`).replace(ly, "");
  }
  function ed(t, l) {
    return l = ld(l), ld(t) === l;
  }
  function bt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || fa(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && fa(t, "" + a);
        break;
      case "className":
        Pn(t, "class", a);
        break;
      case "tabIndex":
        Pn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Pn(t, e, a);
        break;
      case "style":
        ls(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Pn(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (l !== "a" || e !== "href")) {
          t.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = lu("" + a), t.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (e === "formAction" ? (l !== "input" && bt(t, l, "name", n.name, n, null), bt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), bt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), bt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (bt(t, l, "encType", n.encType, n, null), bt(t, l, "method", n.method, n, null), bt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = lu("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Vl);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
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
        if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        e = lu("" + a), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          e
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
        a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "" + a) : t.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, "") : t.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? t.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? t.setAttribute(e, a) : t.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? t.removeAttribute(e) : t.setAttribute(e, a);
        break;
      case "popover":
        at("beforetoggle", t), at("toggle", t), In(t, "popover", a);
        break;
      case "xlinkActuate":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Zl(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Zl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Zl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Zl(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        In(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Mh.get(e) || e, In(t, e, a));
    }
  }
  function ff(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        ls(t, a, u);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (n.children != null) throw Error(s(60));
            t.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? fa(t, a) : (typeof a == "number" || typeof a == "bigint") && fa(t, "" + a);
        break;
      case "onScroll":
        a != null && at("scroll", t);
        break;
      case "onScrollEnd":
        a != null && at("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = Vl);
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
        if (!wf.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[el] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : In(t, e, a);
          }
    }
  }
  function Wt(t, l, e) {
    switch (l) {
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
        at("error", t), at("load", t);
        var a = !1, n = !1, u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var i = e[u];
            if (i != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, l));
                default:
                  bt(t, l, u, i, e, null);
              }
          }
        n && bt(t, l, "srcSet", e.srcSet, e, null), a && bt(t, l, "src", e.src, e, null);
        return;
      case "input":
        at("invalid", t);
        var c = u = i = n = null, r = null, b = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var x = e[a];
            if (x != null)
              switch (a) {
                case "name":
                  n = x;
                  break;
                case "type":
                  i = x;
                  break;
                case "checked":
                  r = x;
                  break;
                case "defaultChecked":
                  b = x;
                  break;
                case "value":
                  u = x;
                  break;
                case "defaultValue":
                  c = x;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(s(137, l));
                  break;
                default:
                  bt(t, l, a, x, e, null);
              }
          }
        Ff(
          t,
          u,
          c,
          r,
          b,
          i,
          n,
          !1
        );
        return;
      case "select":
        at("invalid", t), a = i = u = null;
        for (n in e)
          if (e.hasOwnProperty(n) && (c = e[n], c != null))
            switch (n) {
              case "value":
                u = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                bt(t, l, n, c, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? ca(t, !!a, l, !1) : e != null && ca(t, !!a, e, !0);
        return;
      case "textarea":
        at("invalid", t), u = n = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                n = c;
                break;
              case "children":
                u = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                bt(t, l, i, c, e, null);
            }
        Pf(t, a, n, u);
        return;
      case "option":
        for (r in e)
          if (e.hasOwnProperty(r) && (a = e[r], a != null))
            switch (r) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                bt(t, l, r, a, e, null);
            }
        return;
      case "dialog":
        at("beforetoggle", t), at("toggle", t), at("cancel", t), at("close", t);
        break;
      case "iframe":
      case "object":
        at("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Cn.length; a++)
          at(Cn[a], t);
        break;
      case "image":
        at("error", t), at("load", t);
        break;
      case "details":
        at("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        at("error", t), at("load", t);
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
        for (b in e)
          if (e.hasOwnProperty(b) && (a = e[b], a != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                bt(t, l, b, a, e, null);
            }
        return;
      default:
        if (_i(l)) {
          for (x in e)
            e.hasOwnProperty(x) && (a = e[x], a !== void 0 && ff(
              t,
              l,
              x,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && bt(t, l, c, a, e, null));
  }
  function ey(t, l, e, a) {
    switch (l) {
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
        var n = null, u = null, i = null, c = null, r = null, b = null, x = null;
        for (A in e) {
          var M = e[A];
          if (e.hasOwnProperty(A) && M != null)
            switch (A) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = M;
              default:
                a.hasOwnProperty(A) || bt(t, l, A, null, a, M);
            }
        }
        for (var _ in a) {
          var A = a[_];
          if (M = e[_], a.hasOwnProperty(_) && (A != null || M != null))
            switch (_) {
              case "type":
                u = A;
                break;
              case "name":
                n = A;
                break;
              case "checked":
                b = A;
                break;
              case "defaultChecked":
                x = A;
                break;
              case "value":
                i = A;
                break;
              case "defaultValue":
                c = A;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (A != null)
                  throw Error(s(137, l));
                break;
              default:
                A !== M && bt(
                  t,
                  l,
                  _,
                  A,
                  a,
                  M
                );
            }
        }
        Si(
          t,
          i,
          c,
          r,
          b,
          x,
          u,
          n
        );
        return;
      case "select":
        A = i = c = _ = null;
        for (u in e)
          if (r = e[u], e.hasOwnProperty(u) && r != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                A = r;
              default:
                a.hasOwnProperty(u) || bt(
                  t,
                  l,
                  u,
                  null,
                  a,
                  r
                );
            }
        for (n in a)
          if (u = a[n], r = e[n], a.hasOwnProperty(n) && (u != null || r != null))
            switch (n) {
              case "value":
                _ = u;
                break;
              case "defaultValue":
                c = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== r && bt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  r
                );
            }
        l = c, e = i, a = A, _ != null ? ca(t, !!e, _, !1) : !!a != !!e && (l != null ? ca(t, !!e, l, !0) : ca(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        A = _ = null;
        for (c in e)
          if (n = e[c], e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                bt(t, l, c, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                _ = n;
                break;
              case "defaultValue":
                A = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && bt(t, l, i, n, a, u);
            }
        If(t, _, A);
        return;
      case "option":
        for (var Y in e)
          if (_ = e[Y], e.hasOwnProperty(Y) && _ != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                bt(
                  t,
                  l,
                  Y,
                  null,
                  a,
                  _
                );
            }
        for (r in a)
          if (_ = a[r], A = e[r], a.hasOwnProperty(r) && _ !== A && (_ != null || A != null))
            switch (r) {
              case "selected":
                t.selected = _ && typeof _ != "function" && typeof _ != "symbol";
                break;
              default:
                bt(
                  t,
                  l,
                  r,
                  _,
                  a,
                  A
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
        for (var V in e)
          _ = e[V], e.hasOwnProperty(V) && _ != null && !a.hasOwnProperty(V) && bt(t, l, V, null, a, _);
        for (b in a)
          if (_ = a[b], A = e[b], a.hasOwnProperty(b) && _ !== A && (_ != null || A != null))
            switch (b) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (_ != null)
                  throw Error(s(137, l));
                break;
              default:
                bt(
                  t,
                  l,
                  b,
                  _,
                  a,
                  A
                );
            }
        return;
      default:
        if (_i(l)) {
          for (var _t in e)
            _ = e[_t], e.hasOwnProperty(_t) && _ !== void 0 && !a.hasOwnProperty(_t) && ff(
              t,
              l,
              _t,
              void 0,
              a,
              _
            );
          for (x in a)
            _ = a[x], A = e[x], !a.hasOwnProperty(x) || _ === A || _ === void 0 && A === void 0 || ff(
              t,
              l,
              x,
              _,
              a,
              A
            );
          return;
        }
    }
    for (var p in e)
      _ = e[p], e.hasOwnProperty(p) && _ != null && !a.hasOwnProperty(p) && bt(t, l, p, null, a, _);
    for (M in a)
      _ = a[M], A = e[M], !a.hasOwnProperty(M) || _ === A || _ == null && A == null || bt(t, l, M, _, a, A);
  }
  function ad(t) {
    switch (t) {
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
  function ay() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
        if (u && c && ad(i)) {
          for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
            var r = e[a], b = r.startTime;
            if (b > c) break;
            var x = r.transferSize, M = r.initiatorType;
            x && ad(M) && (r = r.responseEnd, i += x * (r < c ? 1 : (c - b) / (r - b)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var sf = null, of = null;
  function Wu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function nd(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ud(t, l) {
    if (t === 0)
      switch (l) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && l === "foreignObject" ? 0 : t;
  }
  function rf(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var df = null;
  function ny() {
    var t = window.event;
    return t && t.type === "popstate" ? t === df ? !1 : (df = t, !0) : (df = null, !1);
  }
  var id = typeof setTimeout == "function" ? setTimeout : void 0, uy = typeof clearTimeout == "function" ? clearTimeout : void 0, cd = typeof Promise == "function" ? Promise : void 0, iy = typeof queueMicrotask == "function" ? queueMicrotask : typeof cd < "u" ? function(t) {
    return cd.resolve(null).then(t).catch(cy);
  } : id;
  function cy(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function xe(t) {
    return t === "head";
  }
  function fd(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Ga(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Rn(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, Rn(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, c = u.nodeName;
            u[Fa] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && Rn(t.ownerDocument.body);
      e = n;
    } while (e);
    Ga(l);
  }
  function sd(t, l) {
    var e = t;
    t = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? l ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (l ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (t === 0) break;
          t--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || t++;
      e = a;
    } while (e);
  }
  function hf(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          hf(e), vi(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(e);
    }
  }
  function fy(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Fa])
          switch (l) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== n.rel || t.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || t.getAttribute("title") !== (n.title == null ? null : n.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (n.src == null ? null : n.src) || t.getAttribute("type") !== (n.type == null ? null : n.type) || t.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (l === "input" && t.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = jl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function sy(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = jl(t.nextSibling), t === null)) return null;
    return t;
  }
  function od(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = jl(t.nextSibling), t === null)) return null;
    return t;
  }
  function mf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function yf(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function oy(t, l) {
    var e = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = l;
    else if (t.data !== "$?" || e.readyState !== "loading")
      l();
    else {
      var a = function() {
        l(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), t._reactRetry = a;
    }
  }
  function jl(t) {
    for (; t != null; t = t.nextSibling) {
      var l = t.nodeType;
      if (l === 1 || l === 3) break;
      if (l === 8) {
        if (l = t.data, l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&" || l === "F!" || l === "F")
          break;
        if (l === "/$" || l === "/&") return null;
      }
    }
    return t;
  }
  var gf = null;
  function rd(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return jl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function dd(t) {
    t = t.previousSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (l === 0) return t;
          l--;
        } else e !== "/$" && e !== "/&" || l++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function hd(t, l, e) {
    switch (l = Wu(e), t) {
      case "html":
        if (t = l.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = l.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = l.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function Rn(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    vi(t);
  }
  var Ml = /* @__PURE__ */ new Map(), md = /* @__PURE__ */ new Set();
  function Fu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ie = R.d;
  R.d = {
    f: ry,
    r: dy,
    D: hy,
    C: my,
    L: yy,
    m: gy,
    X: py,
    S: vy,
    M: Sy
  };
  function ry() {
    var t = ie.f(), l = Qu();
    return t || l;
  }
  function dy(t) {
    var l = na(t);
    l !== null && l.tag === 5 && l.type === "form" ? Do(l) : ie.r(t);
  }
  var Ba = typeof document > "u" ? null : document;
  function yd(t, l, e) {
    var a = Ba;
    if (a && typeof l == "string" && l) {
      var n = _l(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), md.has(n) || (md.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), Wt(l, "link", t), Zt(l), a.head.appendChild(l)));
    }
  }
  function hy(t) {
    ie.D(t), yd("dns-prefetch", t, null);
  }
  function my(t, l) {
    ie.C(t, l), yd("preconnect", t, l);
  }
  function yy(t, l, e) {
    ie.L(t, l, e);
    var a = Ba;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + _l(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + _l(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + _l(
        e.imageSizes
      ) + '"]')) : n += '[href="' + _l(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = qa(t);
          break;
        case "script":
          u = Ya(t);
      }
      Ml.has(u) || (t = U(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), Ml.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(Hn(u)) || l === "script" && a.querySelector(Bn(u)) || (l = a.createElement("link"), Wt(l, "link", t), Zt(l), a.head.appendChild(l)));
    }
  }
  function gy(t, l) {
    ie.m(t, l);
    var e = Ba;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + _l(a) + '"][href="' + _l(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ya(t);
      }
      if (!Ml.has(u) && (t = U({ rel: "modulepreload", href: t }, l), Ml.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(Bn(u)))
              return;
        }
        a = e.createElement("link"), Wt(a, "link", t), Zt(a), e.head.appendChild(a);
      }
    }
  }
  function vy(t, l, e) {
    ie.S(t, l, e);
    var a = Ba;
    if (a && t) {
      var n = ua(a).hoistableStyles, u = qa(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          Hn(u)
        ))
          c.loading = 5;
        else {
          t = U(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = Ml.get(u)) && vf(t, e);
          var r = i = a.createElement("link");
          Zt(r), Wt(r, "link", t), r._p = new Promise(function(b, x) {
            r.onload = b, r.onerror = x;
          }), r.addEventListener("load", function() {
            c.loading |= 1;
          }), r.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Iu(i, l, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, n.set(u, i);
      }
    }
  }
  function py(t, l) {
    ie.X(t, l);
    var e = Ba;
    if (e && t) {
      var a = ua(e).hoistableScripts, n = Ya(t), u = a.get(n);
      u || (u = e.querySelector(Bn(n)), u || (t = U({ src: t, async: !0 }, l), (l = Ml.get(n)) && pf(t, l), u = e.createElement("script"), Zt(u), Wt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function Sy(t, l) {
    ie.M(t, l);
    var e = Ba;
    if (e && t) {
      var a = ua(e).hoistableScripts, n = Ya(t), u = a.get(n);
      u || (u = e.querySelector(Bn(n)), u || (t = U({ src: t, async: !0, type: "module" }, l), (l = Ml.get(n)) && pf(t, l), u = e.createElement("script"), Zt(u), Wt(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function gd(t, l, e, a) {
    var n = (n = tt.current) ? Fu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = qa(e.href), e = ua(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = qa(e.href);
          var u = ua(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            Hn(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), Ml.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, Ml.set(t, e), u || by(
            n,
            t,
            e,
            i.state
          ))), l && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (l && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Ya(e), e = ua(
          n
        ).hoistableScripts, a = e.get(l), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function qa(t) {
    return 'href="' + _l(t) + '"';
  }
  function Hn(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function vd(t) {
    return U({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function by(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), Wt(l, "link", e), Zt(l), t.head.appendChild(l));
  }
  function Ya(t) {
    return '[src="' + _l(t) + '"]';
  }
  function Bn(t) {
    return "script[async]" + t;
  }
  function pd(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + _l(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Zt(a), a;
          var n = U({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Zt(a), Wt(a, "style", n), Iu(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = qa(e.href);
          var u = t.querySelector(
            Hn(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Zt(u), u;
          a = vd(e), (n = Ml.get(n)) && vf(a, n), u = (t.ownerDocument || t).createElement("link"), Zt(u);
          var i = u;
          return i._p = new Promise(function(c, r) {
            i.onload = c, i.onerror = r;
          }), Wt(u, "link", a), l.state.loading |= 4, Iu(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Ya(e.src), (n = t.querySelector(
            Bn(u)
          )) ? (l.instance = n, Zt(n), n) : (a = e, (n = Ml.get(u)) && (a = U({}, e), pf(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Zt(n), Wt(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Iu(a, e.precedence, t));
    return l.instance;
  }
  function Iu(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) u = c;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function vf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function pf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Pu = null;
  function Sd(t, l, e) {
    if (Pu === null) {
      var a = /* @__PURE__ */ new Map(), n = Pu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Pu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Fa] || u[wt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function bd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function _y(t, l, e) {
    if (e === 1 || l.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof l.precedence != "string" || typeof l.href != "string" || l.href === "")
          break;
        return !0;
      case "link":
        if (typeof l.rel != "string" || typeof l.href != "string" || l.href === "" || l.onLoad || l.onError)
          break;
        switch (l.rel) {
          case "stylesheet":
            return t = l.disabled, typeof l.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (l.async && typeof l.async != "function" && typeof l.async != "symbol" && !l.onLoad && !l.onError && l.src && typeof l.src == "string")
          return !0;
    }
    return !1;
  }
  function _d(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Ey(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = qa(a.href), u = l.querySelector(
          Hn(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = ti.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Zt(u);
          return;
        }
        u = l.ownerDocument || l, a = vd(a), (n = Ml.get(n)) && vf(a, n), u = u.createElement("link"), Zt(u);
        var i = u;
        i._p = new Promise(function(c, r) {
          i.onload = c, i.onerror = r;
        }), Wt(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = ti.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var Sf = 0;
  function Ty(t, l) {
    return t.stylesheets && t.count === 0 && ei(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && ei(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && Sf === 0 && (Sf = 62500 * ay());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && ei(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Sf ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function ti() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) ei(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var li = null;
  function ei(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, li = /* @__PURE__ */ new Map(), l.forEach(Ay, t), li = null, ti.call(t));
  }
  function Ay(t, l) {
    if (!(l.state.loading & 4)) {
      var e = li.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), li.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = ti.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var qn = {
    $$typeof: mt,
    Provider: null,
    Consumer: null,
    _currentValue: K,
    _currentValue2: K,
    _threadCount: 0
  };
  function zy(t, l, e, a, n, u, i, c, r) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = hi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = hi(0), this.hiddenUpdates = hi(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Ed(t, l, e, a, n, u, i, c, r, b, x, M) {
    return t = new zy(
      t,
      l,
      e,
      i,
      r,
      b,
      x,
      M,
      c
    ), l = 1, u === !0 && (l |= 24), u = hl(3, null, null, l), t.current = u, u.stateNode = t, l = Fi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, lc(u), t;
  }
  function Td(t) {
    return t ? (t = ya, t) : ya;
  }
  function Ad(t, l, e, a, n, u) {
    n = Td(n), a.context === null ? a.context = n : a.pendingContext = n, a = ye(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = ge(t, a, l), e !== null && (fl(e, t, l), yn(e, t, l));
  }
  function zd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function bf(t, l) {
    zd(t, l), (t = t.alternate) && zd(t, l);
  }
  function xd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ge(t, 67108864);
      l !== null && fl(l, t, 67108864), bf(t, 67108864);
    }
  }
  function Od(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = pl();
      l = mi(l);
      var e = Ge(t, l);
      e !== null && fl(e, t, l), bf(t, l);
    }
  }
  var ai = !0;
  function xy(t, l, e, a) {
    var n = z.T;
    z.T = null;
    var u = R.p;
    try {
      R.p = 2, _f(t, l, e, a);
    } finally {
      R.p = u, z.T = n;
    }
  }
  function Oy(t, l, e, a) {
    var n = z.T;
    z.T = null;
    var u = R.p;
    try {
      R.p = 8, _f(t, l, e, a);
    } finally {
      R.p = u, z.T = n;
    }
  }
  function _f(t, l, e, a) {
    if (ai) {
      var n = Ef(a);
      if (n === null)
        cf(
          t,
          l,
          a,
          ni,
          e
        ), Md(t, a);
      else if (My(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (Md(t, a), l & 4 && -1 < jy.indexOf(t)) {
        for (; n !== null; ) {
          var u = na(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Re(u.pendingLanes);
                  if (i !== 0) {
                    var c = u;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var r = 1 << 31 - rl(i);
                      c.entanglements[1] |= r, i &= ~r;
                    }
                    Gl(u), (dt & 6) === 0 && (Lu = lt() + 500, Dn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ge(u, 2), c !== null && fl(c, u, 2), Qu(), bf(u, 2);
            }
          if (u = Ef(a), u === null && cf(
            t,
            l,
            a,
            ni,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        cf(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function Ef(t) {
    return t = Ti(t), Tf(t);
  }
  var ni = null;
  function Tf(t) {
    if (ni = null, t = aa(t), t !== null) {
      var l = O(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = T(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = D(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return ni = t, null;
  }
  function jd(t) {
    switch (t) {
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
        switch (Pt()) {
          case Ue:
            return 2;
          case Et:
            return 8;
          case Nl:
          case sl:
            return 32;
          case Ql:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Af = !1, Oe = null, je = null, Me = null, Yn = /* @__PURE__ */ new Map(), Gn = /* @__PURE__ */ new Map(), Ne = [], jy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Md(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Oe = null;
        break;
      case "dragenter":
      case "dragleave":
        je = null;
        break;
      case "mouseover":
      case "mouseout":
        Me = null;
        break;
      case "pointerover":
      case "pointerout":
        Yn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gn.delete(l.pointerId);
    }
  }
  function Ln(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = na(l), l !== null && xd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function My(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return Oe = Ln(
          Oe,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return je = Ln(
          je,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Me = Ln(
          Me,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Yn.set(
          u,
          Ln(
            Yn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Gn.set(
          u,
          Ln(
            Gn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
    }
    return !1;
  }
  function Nd(t) {
    var l = aa(t.target);
    if (l !== null) {
      var e = O(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = T(e), l !== null) {
            t.blockedOn = l, Zf(t.priority, function() {
              Od(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = D(e), l !== null) {
            t.blockedOn = l, Zf(t.priority, function() {
              Od(e);
            });
            return;
          }
        } else if (l === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function ui(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = Ef(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        Ei = a, e.target.dispatchEvent(a), Ei = null;
      } else
        return l = na(e), l !== null && xd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function Dd(t, l, e) {
    ui(t) && e.delete(l);
  }
  function Ny() {
    Af = !1, Oe !== null && ui(Oe) && (Oe = null), je !== null && ui(je) && (je = null), Me !== null && ui(Me) && (Me = null), Yn.forEach(Dd), Gn.forEach(Dd);
  }
  function ii(t, l) {
    t.blockedOn === l && (t.blockedOn = null, Af || (Af = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Ny
    )));
  }
  var ci = null;
  function Cd(t) {
    ci !== t && (ci = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        ci === t && (ci = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (Tf(a || e) === null)
              continue;
            break;
          }
          var u = na(e);
          u !== null && (t.splice(l, 3), l -= 3, _c(
            u,
            {
              pending: !0,
              data: n,
              method: e.method,
              action: a
            },
            a,
            n
          ));
        }
      }
    ));
  }
  function Ga(t) {
    function l(r) {
      return ii(r, t);
    }
    Oe !== null && ii(Oe, t), je !== null && ii(je, t), Me !== null && ii(Me, t), Yn.forEach(l), Gn.forEach(l);
    for (var e = 0; e < Ne.length; e++) {
      var a = Ne[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < Ne.length && (e = Ne[0], e.blockedOn === null); )
      Nd(e), e.blockedOn === null && Ne.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[el] || null;
        if (typeof u == "function")
          i || Cd(e);
        else if (i) {
          var c = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[el] || null)
              c = i.formAction;
            else if (Tf(n) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), Cd(e);
        }
      }
  }
  function Ud() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(i) {
            return n = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function l() {
      n !== null && (n(), n = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, n = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", l), navigation.addEventListener("navigateerror", l), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", l), navigation.removeEventListener("navigateerror", l), n !== null && (n(), n = null);
      };
    }
  }
  function zf(t) {
    this._internalRoot = t;
  }
  fi.prototype.render = zf.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = pl();
    Ad(e, a, t, l, null, null);
  }, fi.prototype.unmount = zf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      Ad(t.current, 2, null, t, null, null), Qu(), l[ea] = null;
    }
  };
  function fi(t) {
    this._internalRoot = t;
  }
  fi.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Qf();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < Ne.length && l !== 0 && l < Ne[e].priority; e++) ;
      Ne.splice(e, 0, t), e === 0 && Nd(t);
    }
  };
  var Rd = o.version;
  if (Rd !== "19.2.7")
    throw Error(
      s(
        527,
        Rd,
        "19.2.7"
      )
    );
  R.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = g(l), t = t !== null ? H(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Dy = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var si = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!si.isDisabled && si.supportsFiber)
      try {
        ka = si.inject(
          Dy
        ), ol = si;
      } catch {
      }
  }
  return Qn.createRoot = function(t, l) {
    if (!v(t)) throw Error(s(299));
    var e = !1, a = "", n = Xo, u = Qo, i = Zo;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = Ed(
      t,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      n,
      u,
      i,
      Ud
    ), t[ea] = l.current, uf(t), new zf(l);
  }, Qn.hydrateRoot = function(t, l, e) {
    if (!v(t)) throw Error(s(299));
    var a = !1, n = "", u = Xo, i = Qo, c = Zo, r = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (r = e.formState)), l = Ed(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      r,
      u,
      i,
      c,
      Ud
    ), l.context = Td(null), e = l.current, a = pl(), a = mi(a), n = ye(a), n.callback = null, ge(e, n, a), e = a, l.current.lanes = e, Wa(l, e), Gl(l), t[ea] = l.current, uf(t), new fi(l);
  }, Qn.version = "19.2.7", Qn;
}
var Vd;
function Zy() {
  if (Vd) return jf.exports;
  Vd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (o) {
        console.error(o);
      }
  }
  return f(), jf.exports = Qy(), jf.exports;
}
var Vy = Zy();
const Zn = {
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
}, ih = "settings";
function Ky(f, o) {
  return {
    provider: o.provider ?? f.provider,
    models: { ...f.models, ...o.models },
    apiKeys: { ...f.apiKeys, ...o.apiKeys },
    customBaseUrl: o.customBaseUrl !== void 0 ? o.customBaseUrl : f.customBaseUrl
  };
}
function wy(f) {
  const o = f.storage.get(ih);
  if (!o) return { ...Zn, models: { ...Zn.models }, apiKeys: {} };
  try {
    const d = JSON.parse(o);
    return Ky(Zn, d);
  } catch {
    return { ...Zn, models: { ...Zn.models }, apiKeys: {} };
  }
}
function Jy(f, o) {
  f.storage.set(ih, JSON.stringify(o));
}
function ky(f, o) {
  switch (f.provider) {
    case "openai":
      return !!f.apiKeys.openai;
    case "openrouter":
      return !!f.apiKeys.openrouter;
    case "anthropic":
      return !!f.apiKeys.anthropic;
    case "openai-codex":
      return o;
    case "custom":
      return !!f.customBaseUrl;
    default:
      return !1;
  }
}
const Kd = 50, ch = "conversations";
function qf(f) {
  const o = f.storage.get(ch);
  if (!o) return [];
  try {
    return JSON.parse(o);
  } catch {
    return [];
  }
}
function wd(f) {
  return f.messages.some((o) => {
    var d;
    return (d = o.attachments) == null ? void 0 : d.some((s) => s.dataUrl);
  }) ? {
    ...f,
    messages: f.messages.map(
      (o) => o.attachments ? {
        ...o,
        attachments: o.attachments.map(
          (d) => d.dataUrl ? { ...d, dataUrl: void 0 } : d
        )
      } : o
    )
  } : f;
}
function oi(f, o) {
  try {
    return f.storage.set(ch, JSON.stringify(o)), !0;
  } catch {
    return !1;
  }
}
function fh(f, o) {
  if (oi(f, o)) return;
  const d = [...o];
  for (; d.length > 1; )
    if (d.pop(), oi(f, d)) return;
  oi(f, o.map(wd)) || oi(f, o.slice(0, 1).map(wd));
}
function Rf(f) {
  return qf(f).sort((o, d) => d.updatedAt - o.updatedAt);
}
function Jd(f, o) {
  const d = qf(f), s = d.findIndex((v) => v.id === o.id);
  s >= 0 ? d[s] = o : d.push(o), d.sort((v, O) => O.updatedAt - v.updatedAt), d.length > Kd && d.splice(Kd), fh(f, d);
}
function $y(f, o) {
  const d = qf(f).filter((s) => s.id !== o);
  fh(f, d);
}
function kd(f, o) {
  const d = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: d,
    updatedAt: d,
    provider: f,
    model: o,
    messages: []
  };
}
function Wy(f) {
  return f.slice(0, 40);
}
function Fy() {
  return /* @__PURE__ */ m.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function Iy({ onClick: f }) {
  return /* @__PURE__ */ m.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: f,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ m.jsx(Fy, {})
    }
  );
}
const $d = 8 * 1024 * 1024, Wd = 2 * 1024 * 1024, Fd = 20 * 1024 * 1024, Py = /* @__PURE__ */ new Set([
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
function sh(f) {
  const o = f.lastIndexOf(".");
  return o >= 0 ? f.slice(o + 1).toLowerCase() : "";
}
function oh(f) {
  const o = (f.type || "").toLowerCase();
  if (o.startsWith("image/")) return "image";
  if (o === "application/pdf") return "pdf";
  if (o.startsWith("text/")) return "text";
  const d = sh(f.name);
  return d === "pdf" ? "pdf" : Py.has(d) ? "image" : "text";
}
function Vn(f) {
  return f < 1024 ? `${f} B` : f < 1024 * 1024 ? `${(f / 1024).toFixed(1)} KB` : `${(f / (1024 * 1024)).toFixed(1)} MB`;
}
const tg = {
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
function lg(f) {
  return tg[sh(f)] ?? "";
}
function eg(f) {
  return new Promise((o, d) => {
    const s = new FileReader();
    s.onload = () => o(s.result), s.onerror = () => d(s.error ?? new Error("FileReader failed")), s.readAsDataURL(f);
  });
}
const ag = "4.10.38", Id = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${ag}/build`;
let Cf = null;
function ng() {
  return Cf || (Cf = import(`${Id}/pdf.mjs`).then((o) => {
    const d = o.default ?? o;
    return d.GlobalWorkerOptions.workerSrc = `${Id}/pdf.worker.mjs`, d;
  })), Cf;
}
async function ug(f) {
  const o = await ng(), d = await f.arrayBuffer(), s = await o.getDocument({ data: d }).promise, v = [];
  for (let O = 1; O <= s.numPages; O++) {
    const E = (await (await s.getPage(O)).getTextContent()).items.map((g) => typeof (g == null ? void 0 : g.str) == "string" ? g.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    E && v.push(E);
  }
  return v.join(`

`).trim();
}
async function ig(f, o = {}) {
  const d = oh(f), s = {
    id: crypto.randomUUID(),
    kind: d,
    name: f.name,
    size: f.size,
    mime: f.type || ""
  };
  if (d === "image") {
    if (f.size > $d)
      throw new Error(`Image "${f.name}" is too large (max ${Vn($d)})`);
    const O = await (o.readDataUrl ?? eg)(f);
    return { ...s, dataUrl: O };
  }
  if (d === "pdf") {
    if (f.size > Fd)
      throw new Error(`PDF "${f.name}" is too large (max ${Vn(Fd)})`);
    let O;
    try {
      O = await (o.loadPdfText ?? ug)(f);
    } catch (T) {
      const D = (T == null ? void 0 : T.message) ?? String(T);
      throw new Error(`Could not read PDF "${f.name}": ${D}`);
    }
    return { ...s, text: O };
  }
  if (f.size > Wd)
    throw new Error(`Text file "${f.name}" is too large (max ${Vn(Wd)})`);
  const v = await (o.readText ?? ((O) => O.text()))(f);
  return { ...s, text: v };
}
const cg = /* @__PURE__ */ new Set([
  "openai",
  "openai-codex",
  "openrouter",
  "anthropic",
  "custom"
]);
function rh(f, o, d) {
  const s = o ?? [], v = [];
  f.trim() && v.push(f);
  for (const D of s)
    if ((D.kind === "text" || D.kind === "pdf") && D.text) {
      const E = D.kind === "pdf" ? "" : lg(D.name);
      v.push(`Attached file "${D.name}":
\`\`\`${E}
${D.text}
\`\`\``);
    }
  const O = v.join(`

`), T = s.filter((D) => D.kind === "image" && D.dataUrl);
  if (T.length > 0 && cg.has(d))
    return [
      { type: "text", text: O || "(see attached image)" },
      ...T.map((E) => ({ type: "image_url", image_url: { url: E.dataUrl } }))
    ];
  if (T.length > 0) {
    const D = T.map((E) => `[image attached (not sent to this provider): ${E.name}]`).join(`
`);
    return [O, D].filter(Boolean).join(`

`);
  }
  return O;
}
function Pd(f, o) {
  const d = f.split(`
`);
  for (const s of d) {
    if (!s.startsWith("data: ")) continue;
    const v = s.slice(6).trim();
    if (!v || v === "[DONE]") continue;
    let O;
    try {
      O = JSON.parse(v);
    } catch {
      continue;
    }
    const T = O.type;
    if (T === "text_delta")
      o.onText(O.text ?? "");
    else if (T === "done") {
      const D = {
        message: O.message,
        stop_reason: O.stop_reason,
        usage: O.usage ?? {}
      };
      o.onDone(D);
    } else if (T === "error")
      return o.onError(O.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function dh(f, o, d, s) {
  let v;
  try {
    v = await f.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(o),
      signal: s
    });
  } catch (E) {
    d.onError(`Network error: ${String(E)}`);
    return;
  }
  if (!v.ok) {
    let E = "";
    try {
      E = await v.text(), E.length > 200 && (E = E.slice(0, 200) + "...");
    } catch {
    }
    d.onError(`HTTP ${v.status}: ${E}`);
    return;
  }
  const O = v.body.getReader(), T = new TextDecoder();
  let D = "";
  try {
    for (; ; ) {
      const { done: E, value: g } = await O.read();
      if (E) break;
      D += T.decode(g, { stream: !0 }).replace(/\r\n/g, `
`);
      const H = D.split(`

`);
      D = H.pop() ?? "";
      for (const U of H) {
        if (!U.trim()) continue;
        if (Pd(U, d)) {
          O.cancel().catch(() => {
          });
          return;
        }
      }
    }
    D.trim() && Pd(D, d);
  } catch (E) {
    (E == null ? void 0 : E.name) !== "AbortError" && d.onError(`Stream read error: ${String(E)}`);
  } finally {
    O.releaseLock();
  }
}
async function fg(f, o, d, s) {
  const v = await f.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: o, api_key: d, base_url: s })
  });
  if (!v.ok) {
    let T = "";
    try {
      T = await v.text(), T.length > 200 && (T = T.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${v.status}: ${T}`);
  }
  return (await v.json()).models.map((T) => T.id);
}
async function sg(f) {
  return (await (await f.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function Hf(f) {
  return await (await f.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function og(f) {
  await f.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const th = 3e4;
function rg(f) {
  const o = f.default === null || f.default === void 0 ? String(f.default) : typeof f.default == "object" ? JSON.stringify(f.default) : String(f.default), d = o.length > 60 ? o.slice(0, 60) + "..." : o;
  let s = "";
  if (f.param_type === "select" && f.options.length > 0)
    s = `{${f.options.join("|")}}`;
  else if (f.param_type === "int" || f.param_type === "float") {
    const v = f.min_value !== null, O = f.max_value !== null;
    if (v || O) {
      const T = v ? String(f.min_value) : "", D = O ? String(f.max_value) : "";
      s = `{${T}..${D}}`;
    }
  }
  return `${f.name}:${f.param_type}=${d}${s}`;
}
function dg(f) {
  return f.map((o) => {
    const d = [];
    if (o.inputs.length > 0) {
      const v = o.inputs.map((O) => `${O.name}:${O.data_type}`).join(", ");
      d.push(`in[${v}]`);
    }
    if (o.outputs.length > 0) {
      const v = o.outputs.map((O) => `${O.name}:${O.data_type}`).join(", ");
      d.push(`out[${v}]`);
    }
    if (o.params.length > 0) {
      const v = o.params.map(rg).join(", ");
      d.push(`params[${v}]`);
    }
    const s = d.length > 0 ? " " + d.join(" ") : "";
    return `${o.node_name}:${s} [category: ${o.category}]`;
  }).join(`
`);
}
function hh(f) {
  return f.map((o) => {
    const d = (o.description || "").replace(/\s+/g, " ").trim(), s = d.length > 100 ? d.slice(0, 100) + "..." : d;
    return `${o.node_name} [${o.category}]${s ? " - " + s : ""}`;
  }).join(`
`);
}
function mh(f) {
  const o = JSON.stringify({ nodes: f.nodes, edges: f.edges });
  if (o.length <= th)
    return o;
  const d = th, s = o.length;
  return o.slice(0, d) + `
[graph truncated - kept ${d} of ${s} chars]`;
}
function hg(f, o) {
  const d = hh(f), s = mh(o);
  return `You are Graph Copilot inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and edit the user's graph by calling tools, and you make sure the result actually RUNS.

## Workflow (follow in order)
1. Plan - state in 1-2 sentences the nodes and connections you intend.
2. Look up schemas - call get_node_schemas for the node types you plan to use, to get their exact input/output ports and params. Do NOT guess port or param names.
3. Build - call apply_graph_operations in small batches (add_node with a "ref", connect, set_params), ending a structural batch with one auto_layout.
4. Validate - call validate_graph. If it returns errors (e.g. a missing required input), fix them with more operations and validate again. Only finish once validate_graph reports "valid": true.
5. Summarize what you built in 1-2 sentences, in the user's language.

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
- Reply in the user's language, and after applying changes summarize what changed in one or two sentences.

## Node catalog index (NodeName [Category] - description). Call get_node_schemas for exact ports/params.
${d}

## Current graph
${s}`;
}
const lh = 16, mg = 2, yg = [
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
  }
];
function gg(f, o) {
  const d = f.role === "user" && f.attachments && f.attachments.length > 0 ? rh(f.content, f.attachments, o) : f.content, s = { role: f.role, content: d };
  return f.tool_calls && (s.tool_calls = f.tool_calls), f.tool_call_id && (s.tool_call_id = f.tool_call_id), s;
}
function vg(f, o) {
  const d = /* @__PURE__ */ new Map();
  f.forEach((v, O) => {
    const T = v.op, D = o[O], E = D ? D.ok : !1;
    d.has(T) || d.set(T, { ok: 0, fail: 0 });
    const g = d.get(T);
    E ? g.ok++ : g.fail++;
  });
  const s = [];
  for (const [v, O] of d) {
    const T = O.ok + O.fail;
    O.fail === 0 ? s.push(`${v} x${T} ok`) : O.ok === 0 ? s.push(`${v} x${T} FAILED`) : s.push(`${v} x${T} (${O.ok} ok, ${O.fail} FAILED)`);
  }
  return s.join(", ");
}
function pg(f, o, d, s, v) {
  const T = { role: "system", content: hg(
    f.graph.getNodeDefinitions(),
    f.graph.getGraph()
  ) }, D = o.slice(-20).map((g) => gg(g, v)), E = {
    role: "user",
    content: rh(d, s, v)
  };
  return [T, ...D, E];
}
function yh(f, o, d = yg, s = 8192) {
  const v = f.provider, O = f.models[v] ?? "", T = {
    provider: v,
    model: O,
    messages: o,
    tools: d,
    max_tokens: s
  };
  if (v !== "openai-codex") {
    const D = v === "openai" ? f.apiKeys.openai : v === "openrouter" ? f.apiKeys.openrouter : v === "anthropic" ? f.apiKeys.anthropic : v === "custom" ? f.apiKeys.custom : void 0;
    D && (T.api_key = D);
  }
  return v === "custom" && f.customBaseUrl && (T.base_url = f.customBaseUrl), T;
}
async function gh(f) {
  const o = f.graph.getGraph();
  try {
    const d = await f.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: o.nodes, edges: o.edges })
    });
    if (!d.ok)
      return { valid: !1, errors: [`validate request failed: HTTP ${d.status}`] };
    const s = await d.json();
    return { valid: !!s.valid, errors: Array.isArray(s.errors) ? s.errors : [] };
  } catch (d) {
    return { valid: !1, errors: [`validate request error: ${String(d)}`] };
  }
}
async function Sg(f, o, d, s, v) {
  const T = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + s },
    { role: "user", content: d }
  ];
  let D = "";
  try {
    await dh(
      f,
      yh(o, T, [], 1024),
      {
        onText: (E) => {
          D += E;
        },
        onDone: (E) => {
          !D && E.message.content && (D = E.message.content);
        },
        onError: (E) => {
          D += `
(research error: ${E})`;
        }
      },
      v
    );
  } catch (E) {
    return `(research failed: ${String(E)})`;
  }
  return D.trim() || "(no answer)";
}
async function bg(f, o, d, s, v, O) {
  const { name: T, arguments: D } = f;
  if (T === "apply_graph_operations") {
    const E = D.operations;
    if (!Array.isArray(E))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let g;
    try {
      g = o.graph.applyOperations(E);
    } catch (U) {
      return JSON.stringify({ error: `applyOperations threw: ${String(U)}` });
    }
    const H = vg(E, g.results);
    return v.push(H), s.onOpsApplied(H, g), JSON.stringify({
      results: g.results,
      refs: g.refs,
      node_count: g.node_count,
      edge_count: g.edge_count
    });
  }
  if (T === "get_node_schemas") {
    const g = (Array.isArray(D.node_types) ? D.node_types : []).map((Q) => String(Q)), H = o.graph.getNodeDefinitions(), U = new Map(H.map((Q) => [Q.node_name, Q])), q = g.map((Q) => U.get(Q)).filter((Q) => !!Q), nt = g.filter((Q) => !U.has(Q));
    let F = q.length > 0 ? dg(q) : "(no matching node types)";
    return nt.length > 0 && (F += `
(unknown node types, not in catalog: ${nt.join(", ")})`), F;
  }
  if (T === "validate_graph")
    return JSON.stringify(await gh(o));
  if (T === "research") {
    const g = (Array.isArray(D.questions) ? D.questions : []).map((q) => String(q)).filter((q) => q.trim()).slice(0, 4);
    if (g.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const H = hh(o.graph.getNodeDefinitions()), U = await Promise.all(
      g.map((q) => Sg(o, d, q, H, O))
    );
    return g.map((q, nt) => `[${nt + 1}] Q: ${q}
A: ${U[nt]}`).join(`

`);
  }
  return T === "get_current_graph" ? mh(o.graph.getGraph()) : JSON.stringify({ error: `Unknown tool: ${T}` });
}
async function _g(f) {
  const { api: o, settings: d, history: s, userText: v, attachments: O, callbacks: T, signal: D } = f, E = [], g = pg(
    o,
    s,
    v,
    O,
    d.provider
  );
  let H = 0, U = 0;
  const q = (F) => {
    var Q;
    E.push(F), (Q = T.onTurnAppended) == null || Q.call(T, F);
  }, nt = (F) => {
    F.trim() && q({ role: "assistant", content: F });
  };
  try {
    for (; ; ) {
      let F = "", Q = null, ht = null;
      if (await dh(
        o,
        yh(d, g),
        {
          onText(yt) {
            F += yt, T.onTextDelta(yt);
          },
          onDone(yt) {
            Q = yt;
          },
          onError(yt) {
            ht = yt;
          }
        },
        D
      ), ht !== null) {
        nt(F), T.onTurnsCommitted(E), T.onError(ht), T.onFinished();
        return;
      }
      if (!Q) {
        nt(F), T.onTurnsCommitted(E), T.onFinished();
        return;
      }
      const P = Q, Ut = P.message.tool_calls ?? [], mt = P.message.content || F;
      if (P.stop_reason === "end" || Ut.length === 0) {
        const yt = o.graph.getGraph();
        if (U < mg && Array.isArray(yt.nodes) && yt.nodes.length > 0) {
          const G = await gh(o);
          if (!G.valid && G.errors.length > 0) {
            U++, mt.trim() && q({ role: "assistant", content: mt }), g.push({ role: "assistant", content: mt }), g.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + G.errors.map((At) => `- ${At}`).join(`
`)
            });
            continue;
          }
        }
        q({ role: "assistant", content: mt }), T.onTurnsCommitted(E), T.onFinished();
        return;
      }
      H++;
      const Lt = {
        role: "assistant",
        content: mt,
        tool_calls: Ut
      }, Ft = E.length;
      q(Lt);
      const Nt = [], J = [];
      for (const yt of Ut) {
        const G = await bg(yt, o, d, T, Nt, D);
        q({
          role: "tool",
          content: G,
          tool_call_id: yt.id
        }), J.push({
          role: "tool",
          content: G,
          tool_call_id: yt.id
        });
      }
      Nt.length > 0 && (E[Ft] = { ...Lt, opsSummary: Nt.join("; ") });
      const Ot = {
        role: "assistant",
        content: mt,
        tool_calls: Ut
      };
      if (g.push(Ot), g.push(...J), H >= lh) {
        q({
          role: "assistant",
          content: `(stopped after ${lh} tool rounds)`
        }), T.onTurnsCommitted(E), T.onFinished();
        return;
      }
    }
  } catch (F) {
    T.onTurnsCommitted(E), T.onError(String(F)), T.onFinished();
  }
}
function Eg(f) {
  const o = [];
  return f.forEach((d, s) => {
    if (d.role === "tool") {
      for (let v = o.length - 1; v >= 0; v--) {
        const O = o[v].stages.find(
          (T) => T.call.id === d.tool_call_id && !T.result
        );
        if (O) {
          O.result = d;
          return;
        }
      }
      return;
    }
    o.push({
      key: s,
      turn: d,
      stages: (d.tool_calls ?? []).map((v) => ({ call: v }))
    });
  }), o;
}
const Xa = {
  apply_graph_operations: "Edit graph",
  get_current_graph: "Read graph",
  get_node_schemas: "Node schemas",
  validate_graph: "Validate graph",
  research: "Research"
};
function ri(f) {
  try {
    const o = JSON.parse(f);
    return o && typeof o == "object" && !Array.isArray(o) ? o : null;
  } catch {
    return null;
  }
}
function Tg(f) {
  const o = Array.isArray(f.operations) ? f.operations : [], d = /* @__PURE__ */ new Map();
  for (const s of o) {
    const v = s && typeof s == "object" ? String(s.op ?? "?") : "?";
    d.set(v, (d.get(v) ?? 0) + 1);
  }
  return [...d].map(([s, v]) => `${s} ×${v}`).join(", ");
}
function Pe(f, o) {
  return f.length > o ? f.slice(0, o - 1) + "…" : f;
}
function Ie(f) {
  try {
    return Pe(JSON.stringify(JSON.parse(f), null, 2), 4e3);
  } catch {
    return Pe(f, 4e3);
  }
}
function La(f, o) {
  return `${f} ${o}${f === 1 ? "" : "s"}`;
}
function Ag(f, o) {
  const d = Xa.apply_graph_operations, s = Tg(f);
  if (!o)
    return { label: d, summary: s || "applying operations", status: "running" };
  const v = ri(o.content);
  if (!v)
    return { label: d, summary: s, status: "ok", detail: Ie(o.content) };
  if (typeof v.error == "string")
    return { label: d, summary: Pe(v.error, 120), status: "error", detail: Ie(o.content) };
  const T = (Array.isArray(v.results) ? v.results : []).filter((H) => !H.ok).length, D = typeof v.node_count == "number" ? v.node_count : null, E = typeof v.edge_count == "number" ? v.edge_count : null, g = [];
  return s && g.push(s), T > 0 && g.push(`${T} failed`), D !== null && E !== null && g.push(`${La(D, "node")} · ${La(E, "edge")}`), {
    label: d,
    summary: g.join(" — ") || "applied",
    status: T > 0 ? "error" : "ok",
    detail: Ie(o.content)
  };
}
function zg(f) {
  const o = Xa.validate_graph;
  if (!f) return { label: o, summary: "checking…", status: "running" };
  const d = ri(f.content), s = Array.isArray(d == null ? void 0 : d.errors) ? d.errors.map(String) : [];
  return d != null && d.valid ? { label: o, summary: "graph is runnable", status: "ok" } : {
    label: o,
    summary: s.length > 0 ? La(s.length, "issue") : "not runnable",
    status: "error",
    detail: s.length > 0 ? s.map((v) => `• ${v}`).join(`
`) : Ie(f.content)
  };
}
function xg(f) {
  const o = Xa.get_current_graph;
  if (!f) return { label: o, summary: "reading…", status: "running" };
  const d = ri(f.content), s = Array.isArray(d == null ? void 0 : d.nodes) ? d.nodes.length : null, v = Array.isArray(d == null ? void 0 : d.edges) ? d.edges.length : null;
  return {
    label: o,
    summary: s !== null && v !== null ? `${La(s, "node")} · ${La(v, "edge")}` : "snapshot",
    status: "ok",
    detail: Ie(f.content)
  };
}
function Og(f, o) {
  const d = Xa.get_node_schemas, s = Array.isArray(f.node_types) ? f.node_types.map(String) : [], v = s.length > 0 ? Pe(s.join(", "), 90) : "node types";
  return o ? { label: d, summary: v, status: "ok", detail: Pe(o.content, 4e3) } : { label: d, summary: v, status: "running" };
}
function jg(f, o) {
  const d = Xa.research, s = Array.isArray(f.questions) ? f.questions.length : 0, v = s > 0 ? `${La(s, "question")} in parallel` : "researching";
  return o ? { label: d, summary: v, status: "ok", detail: Pe(o.content, 4e3) } : { label: d, summary: v, status: "running" };
}
function Mg(f, o) {
  const d = Xa[f.name] ?? f.name;
  if (!o) return { label: d, summary: "running…", status: "running" };
  const s = ri(o.content);
  return s && typeof s.error == "string" ? { label: d, summary: Pe(s.error, 120), status: "error", detail: Ie(o.content) } : { label: d, summary: "done", status: "ok", detail: Ie(o.content) };
}
function Ng(f) {
  const { call: o, result: d } = f, s = o.arguments ?? {};
  switch (o.name) {
    case "apply_graph_operations":
      return Ag(s, d);
    case "validate_graph":
      return zg(d);
    case "get_current_graph":
      return xg(d);
    case "get_node_schemas":
      return Og(s, d);
    case "research":
      return jg(s, d);
    default:
      return Mg(o, d);
  }
}
const Dg = /`([^`\n]+)`/, Cg = /\[([^\]\n]+)\]\(([^)\s]+)\)/, Ug = /\*\*([^\n]+?)\*\*/, Rg = /(^|[\s(])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?=[\s).,!?:;]|$)/;
function Hg(f) {
  let o = null;
  const d = (D) => {
    D && (o === null || D.index < o.index) && (o = D);
  }, s = Dg.exec(f);
  s && d({
    index: s.index,
    length: s[0].length,
    node: (D) => /* @__PURE__ */ m.jsx("code", { children: s[1] }, D)
  });
  const v = Cg.exec(f);
  if (v) {
    const D = v[2];
    d({
      index: v.index,
      length: v[0].length,
      node: (E) => /^https?:\/\//i.test(D) ? /* @__PURE__ */ m.jsx("a", { href: D, target: "_blank", rel: "noopener noreferrer", children: v[1] }, E) : v[0]
    });
  }
  const O = Ug.exec(f);
  O && d({
    index: O.index,
    length: O[0].length,
    node: (D) => /* @__PURE__ */ m.jsx("strong", { children: Kn(O[1]) }, D)
  });
  const T = Rg.exec(f);
  return T && d({
    index: T.index,
    length: T[0].length,
    prefix: T[1],
    node: (D) => /* @__PURE__ */ m.jsx("em", { children: Kn(T[2]) }, D)
  }), o;
}
function Kn(f) {
  const o = [];
  let d = f, s = 0;
  for (; d.length > 0; ) {
    const v = Hg(d);
    if (!v) {
      o.push(d);
      break;
    }
    const O = d.slice(0, v.index) + (v.prefix ?? "");
    O && o.push(O), o.push(v.node(s++)), d = d.slice(v.index + v.length);
  }
  return o;
}
const Bg = /^(#{1,3})\s+(.*)$/, qg = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/, Yg = /^\s*[-*]\s+(.*)$/, Gg = /^\s*\d+[.)]\s+(.*)$/;
function eh(f, o) {
  const d = f.split(`
`), s = [];
  let v = [], O = null, T = 0;
  const D = () => {
    v.length !== 0 && (s.push(
      /* @__PURE__ */ m.jsx("p", { className: "gcp-md-p", children: Kn(v.join(`
`)) }, `${o}-p${T++}`)
    ), v = []);
  }, E = () => {
    if (!O) return;
    const g = O.items.map((H, U) => /* @__PURE__ */ m.jsx("li", { children: Kn(H) }, U));
    s.push(
      O.ordered ? /* @__PURE__ */ m.jsx("ol", { className: "gcp-md-list", children: g }, `${o}-l${T++}`) : /* @__PURE__ */ m.jsx("ul", { className: "gcp-md-list", children: g }, `${o}-l${T++}`)
    ), O = null;
  };
  for (const g of d) {
    const H = Bg.exec(g);
    if (H) {
      D(), E(), s.push(
        /* @__PURE__ */ m.jsx("div", { className: `gcp-md-h${H[1].length}`, children: Kn(H[2]) }, `${o}-h${T++}`)
      );
      continue;
    }
    if (qg.test(g)) {
      D(), E(), s.push(/* @__PURE__ */ m.jsx("hr", { className: "gcp-md-hr" }, `${o}-r${T++}`));
      continue;
    }
    const U = Yg.exec(g), q = U ? null : Gg.exec(g);
    if (U || q) {
      D();
      const nt = !!q;
      (!O || O.ordered !== nt) && (E(), O = { ordered: nt, items: [] }), O.items.push((U ?? q)[1]);
      continue;
    }
    if (g.trim() === "") {
      D(), E();
      continue;
    }
    E(), v.push(g);
  }
  return D(), E(), s;
}
const Uf = /```[^\n]*\n?([\s\S]*?)(?:```|$)/g;
function Lg({ text: f }) {
  const o = [];
  let d = 0, s = 0;
  Uf.lastIndex = 0;
  for (let v = Uf.exec(f); v !== null && (v.index > d && o.push(...eh(f.slice(d, v.index), `s${s++}`)), o.push(
    /* @__PURE__ */ m.jsx("pre", { children: /* @__PURE__ */ m.jsx("code", { children: v[1] }) }, `c${s++}`)
  ), d = v.index + v[0].length, v[0].length !== 0); v = Uf.exec(f))
    ;
  return d < f.length && o.push(...eh(f.slice(d), `s${s++}`)), /* @__PURE__ */ m.jsx(m.Fragment, { children: o });
}
function Xg({ kind: f }) {
  return /* @__PURE__ */ m.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ m.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    f === "pdf" ? /* @__PURE__ */ m.jsx("path", { d: "M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ m.jsx("path", { d: "M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function Qg() {
  return /* @__PURE__ */ m.jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function Zg() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("path", { d: "M12 5v9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "19", r: "1.7", fill: "currentColor" })
  ] });
}
function Vg({ open: f }) {
  return /* @__PURE__ */ m.jsx(
    "svg",
    {
      className: `gcp-stage-chevron${f ? " open" : ""}`,
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx("path", { d: "M9 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}
function Kg(f) {
  const o = f.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), d = [];
  return o.forEach((s, v) => {
    if (s.startsWith("```")) {
      const O = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      d.push(/* @__PURE__ */ m.jsx("pre", { children: /* @__PURE__ */ m.jsx("code", { children: O }) }, v));
    } else s && d.push(/* @__PURE__ */ m.jsx("span", { children: s }, v));
  }), d;
}
function wg({ stage: f }) {
  const [o, d] = w.useState(!1), s = Ng(f), v = !!s.detail;
  return /* @__PURE__ */ m.jsxs("div", { className: `gcp-stage ${s.status}`, children: [
    /* @__PURE__ */ m.jsxs(
      "button",
      {
        type: "button",
        className: "gcp-stage-head",
        onClick: () => v && d((O) => !O),
        "aria-expanded": v ? o : void 0,
        "aria-label": `${s.label}${s.summary ? `: ${s.summary}` : ""}`,
        disabled: !v,
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "gcp-stage-status", "aria-hidden": "true", children: s.status === "running" ? /* @__PURE__ */ m.jsx("span", { className: "gcp-stage-spinner" }) : s.status === "ok" ? /* @__PURE__ */ m.jsx(Qg, {}) : /* @__PURE__ */ m.jsx(Zg, {}) }),
          /* @__PURE__ */ m.jsx("span", { className: "gcp-stage-label", children: s.label }),
          s.summary && /* @__PURE__ */ m.jsx("span", { className: "gcp-stage-summary", children: s.summary }),
          v && /* @__PURE__ */ m.jsx(Vg, { open: o })
        ]
      }
    ),
    o && s.detail && /* @__PURE__ */ m.jsx("pre", { className: "gcp-stage-detail", children: s.detail })
  ] });
}
function ah({
  turn: f,
  stages: o = [],
  streaming: d = !1,
  streamingText: s
}) {
  if (f.role === "tool") return null;
  const v = f.role === "user", O = d && s !== void 0 ? s : f.content, T = O.trim().length > 0, D = f.attachments ?? [];
  return /* @__PURE__ */ m.jsxs("div", { className: `gcp-msg-row ${v ? "user" : "assistant"}`, children: [
    D.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "gcp-bubble-attachments", children: D.map(
      (E, g) => E.kind === "image" && E.dataUrl ? /* @__PURE__ */ m.jsx("img", { className: "gcp-att-image", src: E.dataUrl, alt: E.name, title: E.name }, g) : /* @__PURE__ */ m.jsxs("span", { className: "gcp-att-file", title: E.name, children: [
        /* @__PURE__ */ m.jsx(Xg, { kind: E.kind }),
        /* @__PURE__ */ m.jsx("span", { className: "gcp-att-file-name", children: E.name })
      ] }, g)
    ) }),
    (T || d && o.length === 0) && /* @__PURE__ */ m.jsxs("div", { className: "gcp-bubble", children: [
      v ? Kg(O) : /* @__PURE__ */ m.jsx(Lg, { text: O }),
      d && /* @__PURE__ */ m.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    o.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "gcp-stages", children: o.map((E, g) => /* @__PURE__ */ m.jsx(wg, { stage: E }, `${E.call.id}-${g}`)) }),
    !v && f.opsSummary && o.length === 0 && /* @__PURE__ */ m.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ m.jsxs("span", { children: [
      "Applied: ",
      f.opsSummary
    ] }) })
  ] });
}
function Jg() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("path", { d: "M22 2L11 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ m.jsx("path", { d: "M22 2L15 22L11 13L2 9L22 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function kg() {
  return /* @__PURE__ */ m.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function nh() {
  return /* @__PURE__ */ m.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(
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
function $g({ kind: f }) {
  return f === "pdf" ? /* @__PURE__ */ m.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ m.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ m.jsx("path", { d: "M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) : /* @__PURE__ */ m.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ m.jsx("path", { d: "M14 2v6h6M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Wg() {
  return /* @__PURE__ */ m.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }) });
}
function Fg() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ m.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function Ig() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ m.jsx("path", { d: "M12 7.5v5.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "16.5", r: "1.2", fill: "currentColor" })
  ] });
}
const Pg = [
  "Build a small CNN image classifier",
  "Explain what my current graph does",
  "Improve my current graph"
];
function t0({
  api: f,
  settings: o,
  codexLoggedIn: d,
  conversation: s,
  onConversationChange: v,
  onOpenSettings: O,
  onOpenHistory: T
}) {
  const [D, E] = w.useState(""), [g, H] = w.useState(!1), [U, q] = w.useState(""), [nt, F] = w.useState([]), [Q, ht] = w.useState(0), [P, Ut] = w.useState(null), [mt, Lt] = w.useState(""), [Ft, Nt] = w.useState([]), [J, Ot] = w.useState([]), [yt, G] = w.useState(!1), At = w.useRef(null), Qt = w.useRef(!0), Rl = w.useRef(null), Sl = w.useRef(null), It = w.useRef(null), z = w.useRef(0), R = ky(o, d), K = J.some((C) => C.status === "loading"), ft = J.filter((C) => C.status === "ready" && C.att).map((C) => C.att), gt = R && !g && !K && (D.trim().length > 0 || ft.length > 0);
  w.useEffect(() => () => {
    var C;
    (C = It.current) == null || C.abort();
  }, []), w.useEffect(() => {
    if (!g) {
      ht(0);
      return;
    }
    const C = Date.now(), lt = window.setInterval(() => {
      ht(Math.floor((Date.now() - C) / 1e3));
    }, 1e3);
    return () => window.clearInterval(lt);
  }, [g]);
  const y = w.useCallback(() => {
    const C = At.current;
    C && (Qt.current = C.scrollHeight - C.scrollTop - C.clientHeight < 80);
  }, []);
  w.useEffect(() => {
    const C = At.current;
    C && Qt.current && (C.scrollTop = C.scrollHeight);
  }, [s.messages, nt, U, J.length, g]);
  const N = w.useCallback(() => {
    const C = Rl.current;
    C && (C.style.height = "auto", C.style.height = Math.min(C.scrollHeight, 110) + "px");
  }, []);
  w.useEffect(() => {
    N();
  }, [D, N]);
  const B = w.useCallback(
    (C) => {
      if (!(!R || g))
        for (const lt of Array.from(C)) {
          const Pt = crypto.randomUUID(), Ue = oh(lt);
          Ot((Et) => [
            ...Et,
            { id: Pt, name: lt.name, kind: Ue, size: lt.size, status: "loading" }
          ]), ig(lt).then((Et) => {
            Ot(
              (Nl) => Nl.map((sl) => sl.id === Pt ? { ...sl, status: "ready", att: Et } : sl)
            );
          }).catch((Et) => {
            const Nl = (Et == null ? void 0 : Et.message) ?? String(Et);
            Ot(
              (sl) => sl.map((Ql) => Ql.id === Pt ? { ...Ql, status: "error", error: Nl } : Ql)
            );
          });
        }
    },
    [R, g]
  ), L = (C) => {
    Ot((lt) => lt.filter((Pt) => Pt.id !== C));
  }, k = (C) => {
    C.target.files && C.target.files.length > 0 && B(C.target.files), C.target.value = "";
  }, tt = (C) => {
    var Pt;
    const lt = (Pt = C.clipboardData) == null ? void 0 : Pt.files;
    lt && lt.length > 0 && (B(lt), C.preventDefault());
  }, st = (C) => {
    !R || g || Array.from(C.dataTransfer.types).includes("Files") && (C.preventDefault(), z.current += 1, G(!0));
  }, Kt = (C) => {
    !R || g || Array.from(C.dataTransfer.types).includes("Files") && C.preventDefault();
  }, Mt = () => {
    z.current -= 1, z.current <= 0 && (z.current = 0, G(!1));
  }, Ce = (C) => {
    z.current = 0, G(!1), !(!R || g) && C.dataTransfer.files && C.dataTransfer.files.length > 0 && (C.preventDefault(), B(C.dataTransfer.files));
  }, Ll = w.useCallback(
    async (C, lt) => {
      var Ql;
      const Pt = C.trim();
      if (!Pt && lt.length === 0 || g || !R) return;
      Ut(null), Lt(Pt), Nt(lt), E(""), Ot([]), H(!0), q(""), F([]), Qt.current = !0;
      const Ue = { role: "user", content: Pt };
      lt.length > 0 && (Ue.attachments = lt);
      let Et = { ...s };
      Et.title || (Et.title = Wy(Pt || ((Ql = lt[0]) == null ? void 0 : Ql.name) || "Attachment")), Et.provider = o.provider, Et.model = o.models[o.provider] ?? "", Et.messages = [...Et.messages, Ue], Et.updatedAt = Date.now(), v(Et), Jd(f, Et);
      const Nl = new AbortController();
      It.current = Nl;
      let sl = "";
      await _g({
        api: f,
        settings: o,
        history: Et.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: Pt,
        attachments: lt.length > 0 ? lt : void 0,
        callbacks: {
          onTextDelta(Hl) {
            sl += Hl, q(sl);
          },
          onTurnAppended(Hl) {
            Hl.role !== "tool" && (sl = "", q("")), F((di) => [...di, Hl]);
          },
          onOpsApplied() {
          },
          onTurnsCommitted(Hl) {
            q(""), sl = "", F([]), Et = { ...Et, messages: [...Et.messages, ...Hl], updatedAt: Date.now() }, v(Et), Jd(f, Et);
          },
          onError(Hl) {
            Ut(Hl), q(""), sl = "";
          },
          onFinished() {
            H(!1), It.current = null;
          }
        },
        signal: Nl.signal
      });
    },
    [f, g, s, v, R, o]
  ), Qa = () => Ll(D, ft), wn = (C) => {
    C.key === "Enter" && !C.shiftKey && (C.preventDefault(), Ll(D, ft));
  }, Xl = () => {
    var C;
    return (C = It.current) == null ? void 0 : C.abort();
  }, Za = () => Ll(mt, Ft), Va = nt.length > 0 ? [...s.messages, ...nt] : s.messages, ta = Eg(Va), Ka = ta.length === 0 && !g, la = ta[ta.length - 1], wa = !!la && la.stages.some((C) => !C.result), Ja = g && U === "" && !wa, Jn = Ka ? Rf(f).filter((C) => C.id !== s.id).length : 0;
  return /* @__PURE__ */ m.jsxs(
    "div",
    {
      className: `gcp-chat${yt ? " gcp-dragging" : ""}`,
      onDragEnter: st,
      onDragOver: Kt,
      onDragLeave: Mt,
      onDrop: Ce,
      children: [
        /* @__PURE__ */ m.jsxs(
          "div",
          {
            className: "gcp-messages",
            role: "log",
            "aria-live": "polite",
            "aria-label": "Conversation",
            ref: At,
            onScroll: y,
            children: [
              Ka && /* @__PURE__ */ m.jsxs("div", { className: "gcp-welcome", children: [
                /* @__PURE__ */ m.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ m.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
                /* @__PURE__ */ m.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." }),
                R && /* @__PURE__ */ m.jsx("div", { className: "gcp-welcome-suggestions", "aria-label": "Suggested prompts", children: Pg.map((C) => /* @__PURE__ */ m.jsx("button", { className: "gcp-suggestion", onClick: () => Ll(C, []), children: C }, C)) }),
                Jn > 0 && /* @__PURE__ */ m.jsxs(
                  "button",
                  {
                    className: "gcp-welcome-history",
                    onClick: T,
                    "aria-label": "View previous conversations",
                    children: [
                      /* @__PURE__ */ m.jsx(Fg, {}),
                      "Previous conversations (",
                      Jn,
                      ")"
                    ]
                  }
                )
              ] }),
              ta.map((C) => /* @__PURE__ */ m.jsx(ah, { turn: C.turn, stages: C.stages }, C.key)),
              g && U !== "" && /* @__PURE__ */ m.jsx(
                ah,
                {
                  turn: { role: "assistant", content: "" },
                  streaming: !0,
                  streamingText: U
                }
              ),
              Ja && /* @__PURE__ */ m.jsxs("div", { className: "gcp-thinking", role: "status", "aria-label": "Waiting for the assistant", children: [
                /* @__PURE__ */ m.jsx("span", { className: "gcp-thinking-orb", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ m.jsx("span", { className: "gcp-thinking-text", children: "Thinking" }),
                Q >= 3 && /* @__PURE__ */ m.jsxs("span", { className: "gcp-thinking-time", children: [
                  Q,
                  "s"
                ] })
              ] }),
              P && !g && /* @__PURE__ */ m.jsxs("div", { className: "gcp-error-row", role: "alert", children: [
                /* @__PURE__ */ m.jsx("span", { className: "gcp-error-icon", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(Ig, {}) }),
                /* @__PURE__ */ m.jsxs("div", { className: "gcp-error-body", children: [
                  /* @__PURE__ */ m.jsx("div", { className: "gcp-error-title", children: "Request failed" }),
                  /* @__PURE__ */ m.jsx("div", { className: "gcp-error-text", children: P })
                ] }),
                /* @__PURE__ */ m.jsx("button", { className: "gcp-retry-btn", onClick: Za, "aria-label": "Retry", children: "Retry" })
              ] })
            ]
          }
        ),
        yt && /* @__PURE__ */ m.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ m.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ m.jsx(nh, {}),
          /* @__PURE__ */ m.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        /* @__PURE__ */ m.jsxs("div", { className: "gcp-input-area", children: [
          J.length > 0 && /* @__PURE__ */ m.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: J.map((C) => {
            var lt;
            return /* @__PURE__ */ m.jsxs(
              "div",
              {
                className: `gcp-chip ${C.kind === "image" ? "image" : "file"} ${C.status}`,
                title: C.status === "error" ? C.error : `${C.name} · ${Vn(C.size)}`,
                children: [
                  C.kind === "image" && ((lt = C.att) != null && lt.dataUrl) ? /* @__PURE__ */ m.jsx("img", { className: "gcp-chip-thumb", src: C.att.dataUrl, alt: C.name }) : /* @__PURE__ */ m.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ m.jsx($g, { kind: C.kind }) }),
                  /* @__PURE__ */ m.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ m.jsx("span", { className: "gcp-chip-name", children: C.name }),
                    /* @__PURE__ */ m.jsx("span", { className: "gcp-chip-size", children: C.status === "loading" ? "reading…" : C.status === "error" ? "failed" : Vn(C.size) })
                  ] }),
                  C.status === "loading" && /* @__PURE__ */ m.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ m.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => L(C.id),
                      "aria-label": `Remove ${C.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ m.jsx(Wg, {})
                    }
                  )
                ]
              },
              C.id
            );
          }) }),
          /* @__PURE__ */ m.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ m.jsx(
              "input",
              {
                ref: Sl,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: k,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var C;
                  return (C = Sl.current) == null ? void 0 : C.click();
                },
                disabled: !R || g,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ m.jsx(nh, {})
              }
            ),
            /* @__PURE__ */ m.jsx(
              "textarea",
              {
                ref: Rl,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: D,
                onChange: (C) => E(C.target.value),
                onKeyDown: wn,
                onPaste: tt,
                disabled: g || !R,
                "aria-label": "Message input",
                "aria-disabled": R ? void 0 : "true"
              }
            ),
            g ? /* @__PURE__ */ m.jsx("button", { className: "gcp-stop-btn", onClick: Xl, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ m.jsx(kg, {}) }) : /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: Qa,
                disabled: !gt,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ m.jsx(Jg, {})
              }
            )
          ] }),
          /* @__PURE__ */ m.jsx("div", { className: "gcp-input-hint", "aria-hidden": "true", children: g ? "Generating — use the stop button to interrupt" : "Enter to send · Shift+Enter for a new line" }),
          !R && !g && /* @__PURE__ */ m.jsxs("div", { className: "gcp-not-ready-overlay", children: [
            /* @__PURE__ */ m.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                className: "gcp-cta-btn",
                onClick: O,
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
function l0(f) {
  const o = Date.now() - f, d = Math.floor(o / 1e3);
  if (d < 60) return "just now";
  const s = Math.floor(d / 60);
  if (s < 60) return `${s}m ago`;
  const v = Math.floor(s / 60);
  if (v < 24) return `${v}h ago`;
  const O = Math.floor(v / 24);
  return O < 7 ? `${O}d ago` : `${Math.floor(O / 7)}w ago`;
}
function e0({ api: f, activeId: o, onResume: d, onNew: s }) {
  const [v, O] = w.useState(
    () => Rf(f)
  ), [T, D] = w.useState(null), E = (H, U) => {
    H.stopPropagation(), T === U ? ($y(f, U), O(Rf(f)), T === U && D(null)) : D(U);
  }, g = () => {
    D(null);
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ m.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ m.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: s,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    v.length === 0 ? /* @__PURE__ */ m.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ m.jsx("div", { className: "gcp-history-list", onClick: g, children: v.map((H) => /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: `gcp-history-item${H.id === o ? " active" : ""}`,
        onClick: () => d(H),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${H.title || "(untitled)"}`,
        onKeyDown: (U) => {
          (U.key === "Enter" || U.key === " ") && (U.preventDefault(), d(H));
        },
        children: [
          /* @__PURE__ */ m.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ m.jsx("div", { className: "gcp-history-title", children: H.title || "(untitled)" }),
            /* @__PURE__ */ m.jsxs("div", { className: "gcp-history-meta", children: [
              l0(H.updatedAt),
              " · ",
              H.provider,
              "/",
              H.model || "—"
            ] })
          ] }),
          /* @__PURE__ */ m.jsx(
            "button",
            {
              className: `gcp-history-delete${T === H.id ? " confirm" : ""}`,
              onClick: (U) => E(U, H.id),
              "aria-label": T === H.id ? `Confirm delete "${H.title || "untitled"}"` : `Delete "${H.title || "untitled"}"`,
              title: T === H.id ? "Click again to confirm" : "Delete",
              children: "✕"
            }
          )
        ]
      },
      H.id
    )) })
  ] });
}
const uh = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, a0 = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], n0 = 2e3, u0 = 300 * 1e3;
function i0({
  value: f,
  onBlur: o,
  placeholder: d,
  "aria-label": s
}) {
  const [v, O] = w.useState(!1), [T, D] = w.useState(f);
  return w.useEffect(() => {
    D(f);
  }, [f]), /* @__PURE__ */ m.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ m.jsx(
      "input",
      {
        type: v ? "text" : "password",
        className: "gcp-input",
        value: T,
        onChange: (E) => D(E.target.value),
        onBlur: () => o(T),
        placeholder: d ?? "API key",
        "aria-label": s,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ m.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => O((E) => !E),
        "aria-label": v ? "Hide key" : "Show key",
        title: v ? "Hide" : "Show",
        children: v ? "Hide" : "Show"
      }
    )
  ] });
}
function c0({
  api: f,
  settings: o,
  codexLoggedIn: d,
  codexEmail: s,
  onCodexStatusChange: v,
  onChange: O
}) {
  const T = o.provider, [D, E] = w.useState([]), [g, H] = w.useState(!1), [U, q] = w.useState(null), [nt, F] = w.useState(null), [Q, ht] = w.useState(!1), P = w.useRef(null), Ut = w.useRef(0);
  w.useEffect(() => () => {
    P.current !== null && (clearInterval(P.current), P.current = null);
  }, []), w.useEffect(() => {
    T === "openai-codex" && Hf(f).then((G) => {
      G.status === "logged_in" && v(!0, G.email ?? null);
    }).catch(() => {
    });
  }, []);
  function mt(G) {
    O({ ...o, ...G });
  }
  function Lt(G) {
    mt({ models: { ...o.models, [T]: G } });
  }
  function Ft(G, At) {
    mt({ apiKeys: { ...o.apiKeys, [G]: At } });
  }
  async function Nt() {
    H(!0), q(null);
    try {
      const G = T === "openai" ? o.apiKeys.openai : T === "openrouter" ? o.apiKeys.openrouter : T === "anthropic" ? o.apiKeys.anthropic : T === "custom" ? o.apiKeys.custom : void 0, At = await fg(
        f,
        T,
        G,
        T === "custom" ? o.customBaseUrl : void 0
      );
      E(At);
    } catch (G) {
      q(String(G));
    } finally {
      H(!1);
    }
  }
  async function J() {
    try {
      const G = await sg(f);
      window.open(G, "_blank"), ht(!0), Ut.current = Date.now(), P.current = setInterval(async () => {
        try {
          const At = await Hf(f);
          At.status === "logged_in" && (v(!0, At.email ?? null), ht(!1), P.current !== null && (clearInterval(P.current), P.current = null));
        } catch {
        }
        Date.now() - Ut.current > u0 && (ht(!1), P.current !== null && (clearInterval(P.current), P.current = null));
      }, n0);
    } catch (G) {
      F(String(G));
    }
  }
  async function Ot() {
    try {
      await og(f), v(!1, null), ht(!1), P.current !== null && (clearInterval(P.current), P.current = null);
    } catch (G) {
      F(String(G));
    }
  }
  const yt = "gcp-model-datalist";
  return /* @__PURE__ */ m.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ m.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ m.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: T,
          onChange: (G) => mt({ provider: G.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(uh).map((G) => /* @__PURE__ */ m.jsx("option", { value: G, children: uh[G] }, G))
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ m.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ m.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ m.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: yt,
            value: o.models[T] ?? "",
            onChange: (G) => Lt(G.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ m.jsx("datalist", { id: yt, children: D.map((G) => /* @__PURE__ */ m.jsx("option", { value: G }, G)) }),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: Nt,
            disabled: g,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: g ? "Loading..." : "Load list"
          }
        )
      ] }),
      U && /* @__PURE__ */ m.jsx("span", { className: "gcp-field-hint error", role: "alert", children: U })
    ] }),
    T !== "openai-codex" && a0.filter((G) => G === T || T === "custom" && G === "custom").map(
      (G) => G === T ? /* @__PURE__ */ m.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ m.jsx("label", { className: "gcp-label", children: G === "openai" ? "OpenAI API Key" : G === "anthropic" ? "Anthropic API Key" : G === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ m.jsx(
          i0,
          {
            value: o.apiKeys[G] ?? "",
            onBlur: (At) => Ft(G, At),
            placeholder: G === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": G === "openai" ? "OpenAI API key" : G === "anthropic" ? "Anthropic API key" : G === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, G) : null
    ),
    T === "custom" && /* @__PURE__ */ m.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ m.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: o.customBaseUrl,
          onChange: (G) => mt({ customBaseUrl: G.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    T === "openai-codex" && /* @__PURE__ */ m.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ m.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ m.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ m.jsx(
          "div",
          {
            className: `gcp-codex-status${d ? " signed-in" : Q ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: d ? `Signed in${s ? ` as ${s}` : ""}` : Q ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ m.jsxs("div", { className: "gcp-codex-btns", children: [
          !d && /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: J,
              disabled: Q,
              "aria-label": "Sign in with ChatGPT Codex",
              children: Q ? "Waiting..." : "Sign in"
            }
          ),
          d && /* @__PURE__ */ m.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: Ot,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        nt && /* @__PURE__ */ m.jsx("span", { className: "gcp-field-hint error", role: "alert", children: nt })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function f0() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ m.jsx(
      "path",
      {
        d: "M12 7v5l3 3",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function s0() {
  return /* @__PURE__ */ m.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ m.jsx(
      "path",
      {
        d: "M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round"
      }
    )
  ] });
}
function o0({
  api: f,
  settings: o,
  codexLoggedIn: d,
  codexEmail: s,
  conversation: v,
  onConversationChange: O,
  onSettingsChange: T,
  onCodexStatusChange: D,
  onNewConversation: E,
  onResumeConversation: g,
  onClose: H
}) {
  const [U, q] = w.useState("chat"), nt = (P) => {
    g(P), q("chat");
  }, F = () => {
    E(), q("chat");
  }, Q = (P) => {
    q((Ut) => Ut === P ? "chat" : P);
  }, ht = o.models[o.provider] ?? "";
  return /* @__PURE__ */ m.jsxs("div", { className: "gcp-window", role: "dialog", "aria-label": "Graph Copilot", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "gcp-header", children: [
      /* @__PURE__ */ m.jsxs("span", { className: "gcp-header-title", children: [
        /* @__PURE__ */ m.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
        "Graph Copilot"
      ] }),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "gcp-model-chip",
          onClick: () => q("settings"),
          "aria-label": "Active model — open settings",
          title: `Provider: ${o.provider}${ht ? ` · ${ht}` : ""} — click to change`,
          children: ht || "Set up model"
        }
      ),
      /* @__PURE__ */ m.jsxs(
        "button",
        {
          className: `gcp-label-btn${U === "history" ? " active" : ""}`,
          onClick: () => Q("history"),
          "aria-label": "Conversation history",
          title: "Previous conversations",
          children: [
            /* @__PURE__ */ m.jsx(f0, {}),
            /* @__PURE__ */ m.jsx("span", { children: "History" })
          ]
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: `gcp-icon-btn${U === "settings" ? " active" : ""}`,
          onClick: () => Q("settings"),
          "aria-label": "Settings",
          title: "Settings",
          children: /* @__PURE__ */ m.jsx(s0, {})
        }
      ),
      /* @__PURE__ */ m.jsx(
        "button",
        {
          className: "gcp-icon-btn",
          onClick: H,
          "aria-label": "Close panel",
          title: "Close",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "gcp-view", children: [
      U === "chat" && /* @__PURE__ */ m.jsx(
        t0,
        {
          api: f,
          settings: o,
          codexLoggedIn: d,
          conversation: v,
          onConversationChange: O,
          onOpenSettings: () => q("settings"),
          onOpenHistory: () => q("history")
        }
      ),
      U === "history" && /* @__PURE__ */ m.jsx(
        e0,
        {
          api: f,
          activeId: v.id,
          onResume: nt,
          onNew: F
        }
      ),
      U === "settings" && /* @__PURE__ */ m.jsx(
        c0,
        {
          api: f,
          settings: o,
          codexLoggedIn: d,
          codexEmail: s,
          onCodexStatusChange: D,
          onChange: T
        }
      )
    ] })
  ] });
}
function r0({ api: f }) {
  const [o, d] = w.useState(!1), [s, v] = w.useState(() => wy(f)), [O, T] = w.useState(!1), [D, E] = w.useState(null), [g, H] = w.useState(
    () => kd(s.provider, s.models[s.provider] ?? "")
  );
  w.useEffect(() => {
    Jy(f, s);
  }, [f, s]), w.useEffect(() => {
    if (s.provider !== "openai-codex") return;
    let Q = !1;
    return Hf(f).then((ht) => {
      !Q && ht.status === "logged_in" && (T(!0), E(ht.email ?? null));
    }).catch(() => {
    }), () => {
      Q = !0;
    };
  }, [f, s.provider]);
  const U = (Q) => {
    v(Q);
  }, q = (Q, ht) => {
    T(Q), E(ht);
  }, nt = () => {
    H(
      kd(
        s.provider,
        s.models[s.provider] ?? ""
      )
    );
  }, F = (Q) => {
    H(Q);
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ m.jsx(Iy, { onClick: () => d((Q) => !Q) }),
    o && /* @__PURE__ */ m.jsx(
      o0,
      {
        api: f,
        settings: s,
        codexLoggedIn: O,
        codexEmail: D,
        conversation: g,
        onConversationChange: H,
        onSettingsChange: U,
        onCodexStatusChange: q,
        onNewConversation: nt,
        onResumeConversation: F,
        onClose: () => d(!1)
      }
    )
  ] });
}
function d0(f) {
  const o = f.ui.addFloatingWidget({ id: "copilot" });
  Vy.createRoot(o).render(
    /* @__PURE__ */ m.jsx(qy.StrictMode, { children: /* @__PURE__ */ m.jsx(r0, { api: f }) })
  );
}
export {
  d0 as default
};
