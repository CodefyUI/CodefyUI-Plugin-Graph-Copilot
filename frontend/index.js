(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #14171d;--gcp-bg-deep: #0e1116;--gcp-surface: #1a1f27;--gcp-surface-2: #212732;--gcp-surface-hi: rgba(255, 255, 255, .055);--gcp-border: #2a313d;--gcp-border-soft: rgba(255, 255, 255, .07);--gcp-edge-hi: rgba(255, 255, 255, .06);--gcp-text: #e8eaf0;--gcp-dim: #9aa4b4;--gcp-faint: #6b7484;--gcp-accent: #2dd4d8;--gcp-accent-bright: #5ee7ea;--gcp-accent-deep: #0c98a6;--gcp-accent-ink: #04161a;--gcp-accent-soft: rgba(45, 212, 216, .12);--gcp-accent-line: rgba(45, 212, 216, .28);--gcp-grad: linear-gradient(135deg, #46e0e2 0%, #1ab6bf 55%, #0c98a6 100%);--gcp-danger: #f87171;--gcp-warn: #fbbf24;--gcp-ok: #34d399;--gcp-r-lg: 16px;--gcp-r: 11px;--gcp-r-sm: 8px;--gcp-shadow: 0 24px 56px -16px rgba(0, 0, 0, .7), 0 6px 16px rgba(0, 0, 0, .38);--gcp-shadow-sm: 0 4px 14px rgba(0, 0, 0, .35);--gcp-glow: 0 10px 30px -6px rgba(20, 182, 191, .5);--gcp-mono: "Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;--gcp-ease: cubic-bezier(.22, 1, .36, 1);position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:8px;height:8px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:8px;border:2px solid transparent;background-clip:padding-box}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-faint);background-clip:padding-box}.gcp-fab{width:52px;height:52px;border-radius:50%;background:var(--gcp-grad);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--gcp-glow),inset 0 1px #ffffff59;transition:transform .18s var(--gcp-ease),box-shadow .18s var(--gcp-ease),filter .18s var(--gcp-ease);outline:none;animation:gcp-fab-glow 4.5s ease-in-out infinite}.gcp-fab:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50%;background:radial-gradient(closest-side,rgba(45,212,216,.35),transparent 70%);opacity:0;transition:opacity .2s ease;pointer-events:none}.gcp-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.05)}.gcp-fab:hover:after{opacity:1}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:4px}@keyframes gcp-fab-glow{0%,to{box-shadow:0 10px 30px -6px #14b6bf73,inset 0 1px #ffffff59}50%{box-shadow:0 14px 38px -4px #14b6bf9e,inset 0 1px #ffffff59}}.gcp-window{position:fixed;bottom:16px;right:16px;width:432px;height:min(620px,calc(100vh - 96px));background:radial-gradient(120% 60% at 50% -10%,rgba(45,212,216,.06),transparent 60%),var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow);overflow:hidden;animation:gcp-window-in .28s var(--gcp-ease) both}.gcp-window:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;border-top:1px solid var(--gcp-edge-hi);pointer-events:none}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}.gcp-header{display:flex;align-items:center;padding:11px 12px;border-bottom:1px solid var(--gcp-border-soft);gap:8px;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent),var(--gcp-bg-deep);flex-shrink:0;position:relative;z-index:1}.gcp-header-title{flex:1;font-weight:600;font-size:13px;letter-spacing:.01em;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.gcp-header-mark{width:18px;height:18px;border-radius:6px;background:var(--gcp-grad);box-shadow:0 2px 8px #14b6bf73,inset 0 1px #fff6;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:11px;flex-shrink:0}.gcp-icon-btn{width:30px;height:30px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s ease,color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.92)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft)}.gcp-model-chip{height:26px;max-width:148px;min-width:0;padding:0 10px;border-radius:999px;border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:var(--gcp-mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer;transition:color .14s ease,border-color .14s ease,background .14s ease;outline:none;flex-shrink:1}.gcp-model-chip:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-model-chip:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-label-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px 0 9px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-weight:550;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-label-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-2);border-color:var(--gcp-border)}.gcp-label-btn:active{transform:scale(.96)}.gcp-label-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-label-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:46px;height:46px;border-radius:14px;background:var(--gcp-grad);color:var(--gcp-accent-ink);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--gcp-glow),inset 0 1px #fff6;animation:gcp-pop .46s var(--gcp-ease) both}.gcp-welcome-title{font-size:15px;font-weight:650;color:var(--gcp-text);letter-spacing:.01em;animation:gcp-rise .46s var(--gcp-ease) 60ms both}.gcp-welcome-sub{font-size:12.5px;line-height:1.6;color:var(--gcp-dim);animation:gcp-rise .46s var(--gcp-ease) .12s both}.gcp-welcome-history{margin-top:6px;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease;outline:none;animation:gcp-rise .46s var(--gcp-ease) .18s both}.gcp-welcome-history:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-welcome-history:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-welcome-suggestions{display:flex;flex-direction:column;gap:6px;width:100%;margin-top:4px;animation:gcp-rise .46s var(--gcp-ease) .15s both}.gcp-suggestion{padding:8px 12px;border-radius:10px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;text-align:left;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-suggestion:hover{color:var(--gcp-text);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft);transform:translateY(-1px)}.gcp-suggestion:active{transform:none}.gcp-suggestion:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}@keyframes gcp-pop{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .3s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}@keyframes gcp-rise{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.gcp-bubble{max-width:86%;padding:9px 12px;border-radius:var(--gcp-r);line-height:1.55;word-break:break-word;white-space:pre-wrap;font-size:13px;box-shadow:var(--gcp-shadow-sm)}.gcp-msg-row.user .gcp-bubble{background:linear-gradient(180deg,#2dd4d829,#2dd4d81a);border:1px solid var(--gcp-accent-line);color:var(--gcp-text);border-bottom-right-radius:4px}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-text);border-bottom-left-radius:4px;box-shadow:var(--gcp-shadow-sm),inset 0 1px 0 var(--gcp-edge-hi)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);padding:10px 11px;overflow-x:auto;font-size:12px;font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble pre:last-child{margin-bottom:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:12px}.gcp-bubble :not(pre)>code{background:#ffffff12;border:1px solid var(--gcp-border-soft);padding:1px 5px;border-radius:5px;font-size:11.5px}.gcp-bubble .gcp-md-p{margin:0 0 8px}.gcp-bubble .gcp-md-p:last-child{margin-bottom:0}.gcp-md-h1,.gcp-md-h2,.gcp-md-h3{font-weight:700;color:var(--gcp-text);letter-spacing:.01em;margin:10px 0 6px;line-height:1.35}.gcp-md-h1{font-size:14.5px}.gcp-md-h2{font-size:13.5px}.gcp-md-h3{font-size:13px;color:var(--gcp-dim)}.gcp-md-h1:first-child,.gcp-md-h2:first-child,.gcp-md-h3:first-child{margin-top:0}.gcp-md-list{margin:2px 0 8px;padding-left:18px}.gcp-md-list:last-child{margin-bottom:0}.gcp-md-list li{margin:3px 0}.gcp-md-list li::marker{color:var(--gcp-faint)}.gcp-md-hr{border:none;border-top:1px solid var(--gcp-border-soft);margin:10px 0}.gcp-bubble a{color:var(--gcp-accent-bright);text-decoration:underline;text-underline-offset:2px;text-decoration-color:var(--gcp-accent-line)}.gcp-bubble a:hover{text-decoration-color:var(--gcp-accent-bright)}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:86%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block;box-shadow:var(--gcp-shadow-sm)}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);font-size:11.5px;max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:var(--gcp-accent-soft);border:1px solid var(--gcp-accent-line);color:var(--gcp-accent-bright);font-size:11px;line-height:1.5;font-variant-numeric:tabular-nums}.gcp-stages{display:flex;flex-direction:column;gap:4px;width:86%}.gcp-stage{border:1px solid var(--gcp-border-soft);border-radius:9px;background:linear-gradient(180deg,rgba(255,255,255,.015),transparent),var(--gcp-surface);overflow:hidden;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-stage.running{border-color:var(--gcp-accent-line);background:linear-gradient(180deg,rgba(45,212,216,.05),transparent),var(--gcp-surface)}.gcp-stage.error{border-color:#f8717159}.gcp-stage-head{display:flex;align-items:center;gap:8px;width:100%;padding:6px 9px;background:transparent;border:none;color:var(--gcp-dim);font-family:inherit;font-size:12px;text-align:left;cursor:pointer;outline:none;transition:background .13s ease}.gcp-stage-head:not(:disabled):hover{background:var(--gcp-surface-hi)}.gcp-stage-head:disabled{cursor:default}.gcp-stage-head:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:-2px}.gcp-stage-status{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}.gcp-stage.ok .gcp-stage-status{color:var(--gcp-ok);background:#34d39921}.gcp-stage.error .gcp-stage-status{color:var(--gcp-danger);background:#f8717121}.gcp-stage.running .gcp-stage-status{color:var(--gcp-accent)}.gcp-stage-spinner{width:11px;height:11px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);animation:gcp-spin .7s linear infinite}.gcp-stage-label{font-weight:620;font-size:12px;color:var(--gcp-text);white-space:nowrap;flex-shrink:0}.gcp-stage-summary{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}.gcp-stage.error .gcp-stage-summary{color:var(--gcp-danger)}.gcp-stage-chevron{color:var(--gcp-faint);flex-shrink:0;transition:transform .16s var(--gcp-ease)}.gcp-stage-chevron.open{transform:rotate(90deg)}.gcp-stage-detail{margin:0;padding:8px 10px;border-top:1px solid var(--gcp-border-soft);background:var(--gcp-bg-deep);color:var(--gcp-dim);font-family:var(--gcp-mono);font-size:11px;line-height:1.55;max-height:180px;overflow:auto;white-space:pre-wrap;word-break:break-word}.gcp-thinking{display:flex;align-items:center;gap:8px;padding:2px 2px 6px;font-size:12.5px;animation:gcp-rise .24s var(--gcp-ease) both}.gcp-thinking-orb{color:var(--gcp-accent);font-size:13px;animation:gcp-orb-pulse 1.5s ease-in-out infinite}.gcp-thinking-text{background:linear-gradient(90deg,var(--gcp-dim) 25%,var(--gcp-accent-bright) 50%,var(--gcp-dim) 75%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:gcp-shimmer 1.8s linear infinite}.gcp-thinking-time{color:var(--gcp-faint);font-size:11.5px;font-variant-numeric:tabular-nums}@keyframes gcp-orb-pulse{0%,to{opacity:.45;transform:scale(.92)}50%{opacity:1;transform:scale(1.06)}}@keyframes gcp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}.gcp-error-row{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:var(--gcp-r);border:1px solid rgba(248,113,113,.32);background:#f8717112;animation:gcp-rise .26s var(--gcp-ease) both}.gcp-error-icon{color:var(--gcp-danger);margin-top:1px;flex-shrink:0;display:flex}.gcp-error-body{flex:1;min-width:0}.gcp-error-title{font-size:12px;font-weight:650;color:var(--gcp-danger)}.gcp-error-text{font-size:12px;color:var(--gcp-dim);margin-top:2px;word-break:break-word;line-height:1.5}.gcp-retry-btn{padding:5px 13px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;align-self:center;flex-shrink:0}.gcp-retry-btn:hover{background:#f871711f}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:#0e1116c7;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:26px 34px;border:1.5px dashed var(--gcp-accent-line);border-radius:var(--gcp-r);color:var(--gcp-accent-bright);font-size:13px;background:var(--gcp-accent-soft)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 12px;border-top:1px solid var(--gcp-border-soft);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.12)),var(--gcp-bg-deep)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .22s var(--gcp-ease) both}.gcp-chip.error{border-color:#f8717180;background:#f8717114}.gcp-chip-thumb{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-bg-deep);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:12px;color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:10.5px;color:var(--gcp-faint)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:13px;height:13px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-chip-remove{width:18px;height:18px;border-radius:5px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s ease,color .13s ease;outline:none}.gcp-chip-remove:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .14s ease,border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-accent);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-attach-btn:active:not(:disabled){transform:scale(.93)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:13px;padding:8px 11px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .14s ease,box-shadow .14s ease}.gcp-textarea::placeholder{color:var(--gcp-faint)}.gcp-textarea:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-textarea:disabled{opacity:.55;cursor:not-allowed}.gcp-send-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-grad);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px #14b6bf66,inset 0 1px #ffffff4d;transition:filter .14s ease,transform .14s var(--gcp-ease),box-shadow .14s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.08);box-shadow:0 6px 18px #14b6bf8c,inset 0 1px #ffffff4d}.gcp-send-btn:active:not(:disabled){transform:scale(.93)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-surface-2);color:var(--gcp-faint);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:2px}.gcp-stop-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-stop-btn:hover{background:#f871711f}.gcp-stop-btn:active{transform:scale(.93)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-input-hint{font-size:10.5px;color:var(--gcp-faint);text-align:center;letter-spacing:.015em;-webkit-user-select:none;user-select:none;line-height:1.4}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#0e1116db;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 15px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#2dd4d833}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:9px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:13px;font-weight:550;font-family:inherit;cursor:pointer;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-new-btn:hover{background:#2dd4d82e}.gcp-new-btn:active{transform:scale(.99)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:3px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background .14s ease,box-shadow .14s ease;border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-surface-hi)}.gcp-history-item.active{background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--gcp-grad)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:11px;color:var(--gcp-faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:26px;height:26px;border-radius:6px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .13s ease,background .13s ease,opacity .13s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711f}.gcp-history-delete.confirm{color:var(--gcp-danger);background:#f8717124;opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-faint);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:11px;font-weight:650;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.06em}.gcp-select,.gcp-input{width:100%;padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .14s ease,box-shadow .14s ease}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa4b4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:8px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:7px 14px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none}.gcp-codex-btn:hover{background:#2dd4d82e}.gcp-codex-btn.danger{border-color:#f8717180;background:transparent;color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711f}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-faint);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-faint);line-height:1.6;padding-top:6px;border-top:1px solid var(--gcp-border-soft)}.gcp-window{width:min(448px,calc(100vw - 32px));height:min(690px,calc(100vh - 88px));min-height:420px;isolation:isolate;transition:width .26s var(--gcp-ease),height .26s var(--gcp-ease),border-radius .26s var(--gcp-ease)}.gcp-window--expanded{width:min(980px,calc(100vw - 32px));height:min(800px,calc(100vh - 32px))}.gcp-workbench-header{display:flex;flex-direction:column;flex-shrink:0;background:radial-gradient(70% 120% at 5% 0%,rgba(45,212,216,.08),transparent 70%),var(--gcp-bg-deep);border-bottom:1px solid var(--gcp-border-soft);position:relative;z-index:3}.gcp-header-main{min-height:58px;display:flex;align-items:center;gap:12px;padding:9px 10px 7px 13px}.gcp-brand{display:flex;align-items:center;gap:9px;min-width:0;flex:1}.gcp-brand .gcp-header-mark{width:30px;height:30px;border-radius:9px;font-size:15px}.gcp-brand-copy{display:flex;flex-direction:column;min-width:0;line-height:1.15}.gcp-brand-copy strong{color:var(--gcp-text);font-size:13px;font-weight:680;letter-spacing:-.01em;white-space:nowrap}.gcp-brand-copy>span{color:var(--gcp-faint);font-size:10.5px;margin-top:3px;letter-spacing:.025em;white-space:nowrap}.gcp-header-actions{display:flex;align-items:center;justify-content:flex-end;gap:4px;min-width:0}.gcp-header-actions .gcp-model-chip{display:inline-flex;align-items:center;gap:6px;height:28px;max-width:148px;padding:0 9px;background:#ffffff09}.gcp-model-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;background:var(--gcp-ok);box-shadow:0 0 0 3px #34d3991a}.gcp-context-bar{height:31px;display:flex;align-items:center;gap:8px;padding:0 14px;border-top:1px solid rgba(255,255,255,.035);color:var(--gcp-faint);font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-live-indicator{width:6px;height:6px;border-radius:50%;background:var(--gcp-faint);box-shadow:0 0 0 3px #6b74841a}.gcp-live-indicator.online{background:var(--gcp-ok);box-shadow:0 0 0 3px #34d3991a}.gcp-context-name{color:var(--gcp-dim);font-weight:580}.gcp-context-stat{padding-left:8px;border-left:1px solid var(--gcp-border-soft)}.gcp-context-stat strong{color:var(--gcp-text);font-weight:620}.gcp-context-api{margin-left:auto;font-family:var(--gcp-mono);font-size:10px}.gcp-workbench-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;padding:5px 7px 7px}.gcp-nav-btn{height:34px;min-width:0;border:1px solid transparent;border-radius:8px;background:transparent;color:var(--gcp-faint);display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:0 9px;font-family:inherit;font-size:11.5px;font-weight:560;cursor:pointer;outline:none;transition:color .14s ease,background .14s ease,border-color .14s ease}.gcp-nav-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-hi)}.gcp-nav-btn.active{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line);box-shadow:inset 0 1px #ffffff0a}.gcp-nav-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-nav-btn svg{flex-shrink:0}.gcp-window--expanded .gcp-msg-row,.gcp-window--expanded .gcp-thinking,.gcp-window--expanded .gcp-error-row{width:min(100%,760px);margin-left:auto;margin-right:auto}.gcp-window--expanded .gcp-messages{padding:24px clamp(22px,8vw,92px) 12px}.gcp-window--expanded .gcp-input-area{padding-left:clamp(22px,9vw,108px);padding-right:clamp(22px,9vw,108px)}.gcp-window--expanded .gcp-settings,.gcp-window--expanded .gcp-history{width:min(100%,760px);margin:0 auto}.gcp-lab{position:relative;flex:1;min-height:0;overflow-y:auto;padding:18px;background:radial-gradient(80% 46% at 80% 0%,rgba(45,212,216,.045),transparent 70%),var(--gcp-bg)}.gcp-lab-heading{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:17px}.gcp-eyebrow{display:block;color:var(--gcp-accent);font-size:9.5px;font-weight:700;letter-spacing:.12em;line-height:1.4;text-transform:uppercase}.gcp-lab-heading h1{margin:2px 0 4px;color:var(--gcp-text);font-size:18px;line-height:1.25;letter-spacing:-.025em}.gcp-lab-heading p{margin:0;max-width:560px;color:var(--gcp-dim);font-size:11.5px;line-height:1.55}.gcp-lab-count{flex-shrink:0;padding:5px 9px;border:1px solid var(--gcp-border-soft);border-radius:999px;background:var(--gcp-surface);color:var(--gcp-dim);font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-lab-heading-actions{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:7px}.gcp-lab-heading-actions>button{min-height:29px;padding:6px 10px;border:1px solid var(--gcp-accent-line);border-radius:8px;background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font:650 9.5px/1 var(--gcp-font);cursor:pointer}.gcp-lab-heading-actions>button:hover{border-color:var(--gcp-accent);color:var(--gcp-text)}.gcp-lab-heading-actions>button:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-lab-portable-message{margin:-7px 0 13px;padding:8px 10px;border:1px solid rgba(52,211,153,.22);border-radius:8px;background:#34d39911;color:var(--gcp-ok);font-size:10px;line-height:1.45}.gcp-lab-portable-message.error{border-color:#f871713d;background:#f8717112;color:var(--gcp-danger)}.gcp-lab-empty{min-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px 20px;border:1px dashed var(--gcp-border);border-radius:14px;background:#ffffff04}.gcp-lab-empty-mark{width:54px;height:54px;border:1px solid var(--gcp-accent-line);border-radius:16px;display:grid;place-items:center;color:var(--gcp-accent-bright);background:var(--gcp-accent-soft);box-shadow:0 14px 32px -18px #2dd4d8a6}.gcp-lab-empty h2{margin:15px 0 6px;font-size:15px;color:var(--gcp-text)}.gcp-lab-empty p{max-width:470px;margin:0;color:var(--gcp-dim);font-size:12px;line-height:1.6}.gcp-lab-example{max-width:510px;margin-top:17px;padding:10px 12px;border-radius:9px;background:var(--gcp-bg-deep);border:1px solid var(--gcp-border-soft);color:var(--gcp-faint);font-size:11px;line-height:1.55;text-align:left}.gcp-lab-layout{display:flex;flex-direction:column;gap:13px}.gcp-lab-studies{display:flex;gap:8px;overflow-x:auto;padding:1px 1px 5px;scrollbar-width:thin}.gcp-study-card{width:220px;min-width:220px;display:flex;flex-direction:column;align-items:stretch;gap:7px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:11px;background:var(--gcp-surface);color:var(--gcp-text);font-family:inherit;text-align:left;cursor:pointer;outline:none;transition:border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease)}.gcp-study-card:hover{border-color:var(--gcp-border);background:var(--gcp-surface-2);transform:translateY(-1px)}.gcp-study-card.active{border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-study-card:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-study-card-top{display:flex;justify-content:space-between;align-items:center;gap:8px}.gcp-study-card time{color:var(--gcp-faint);font-size:9.5px}.gcp-study-card>strong{display:-webkit-box;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical;min-height:32px;font-size:11.5px;font-weight:620;line-height:1.4}.gcp-study-card-meta{color:var(--gcp-faint);font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-lab-badge{display:inline-flex;align-items:center;width:fit-content;min-height:19px;padding:2px 7px;border:1px solid var(--gcp-border);border-radius:999px;color:var(--gcp-dim);background:#ffffff09;font-size:9px;font-weight:700;line-height:1;letter-spacing:.04em;text-transform:uppercase}.gcp-lab-badge.completed{color:var(--gcp-ok);border-color:#34d39940;background:#34d39914}.gcp-lab-badge.partial,.gcp-lab-badge.invalid{color:var(--gcp-warn);border-color:#fbbf2442;background:#fbbf2414}.gcp-lab-badge.failed{color:var(--gcp-danger);border-color:#f8717142;background:#f8717114}.gcp-lab-report{min-width:0;padding:16px;border:1px solid var(--gcp-border-soft);border-radius:13px;background:#1a1f27c7;box-shadow:inset 0 1px 0 var(--gcp-edge-hi)}.gcp-lab-report-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}.gcp-lab-report-head h2{margin:4px 0 0;color:var(--gcp-text);font-size:15px;line-height:1.4;letter-spacing:-.015em}.gcp-lab-export-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}.gcp-lab-export-actions button{min-height:28px;padding:5px 9px;border:1px solid var(--gcp-border);border-radius:7px;background:var(--gcp-surface);color:var(--gcp-dim);font:600 9px/1 var(--gcp-font);cursor:pointer}.gcp-lab-export-actions button:hover{border-color:var(--gcp-accent);color:var(--gcp-text);background:var(--gcp-accent-soft)}.gcp-lab-export-actions button:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-lab-export-actions button:disabled{opacity:.45;cursor:not-allowed}.gcp-lab-export-actions button:disabled:hover{border-color:var(--gcp-border);color:var(--gcp-dim);background:var(--gcp-surface)}.gcp-lab-integrity{margin:7px 0 0;color:var(--gcp-muted);font:500 8.5px/1.4 var(--gcp-mono)}.gcp-lab-summary-grid{display:grid;grid-template-columns:1fr;gap:8px;margin-top:14px}.gcp-lab-summary-card{min-width:0;display:flex;align-items:center;gap:11px;padding:11px;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep)}.gcp-lab-summary-card.winner{border-color:var(--gcp-accent-line);background:linear-gradient(135deg,var(--gcp-accent-soft),transparent 75%),var(--gcp-bg-deep)}.gcp-lab-card-icon{width:31px;height:31px;border-radius:9px;display:grid;place-items:center;flex-shrink:0;font-size:15px}.gcp-lab-card-icon.objective{color:#a5b4fc;background:#818cf81f}.gcp-lab-card-icon.winner{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft)}.gcp-lab-summary-card>div{min-width:0;display:flex;flex-direction:column;gap:2px}.gcp-lab-summary-card h3{margin:0;color:var(--gcp-faint);font-size:9px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.gcp-lab-summary-card strong{color:var(--gcp-text);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-lab-summary-card div>span{color:var(--gcp-faint);font-size:9.5px}.gcp-lab-search-plan{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:baseline;gap:3px 10px;margin-top:8px;padding:10px 11px;border:1px solid rgba(129,140,248,.2);border-radius:9px;background:#818cf80e}.gcp-lab-search-plan .gcp-eyebrow{grid-column:1 / -1;color:#a5b4fc}.gcp-lab-search-plan strong{color:var(--gcp-text);font-size:10.5px}.gcp-lab-search-plan>span:not(.gcp-eyebrow){color:var(--gcp-dim);font-size:9.5px;line-height:1.4}.gcp-lab-search-plan small{grid-column:1 / -1;color:var(--gcp-faint);font-size:8.5px;line-height:1.4}.gcp-lab-section{margin-top:18px}.gcp-lab-section-title{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:8px}.gcp-lab-section-title h3{margin:0;color:var(--gcp-text);font-size:11.5px;font-weight:650}.gcp-lab-section-title>span{color:var(--gcp-faint);font-size:9.5px}.gcp-lab-findings{margin:0;padding:10px 12px 10px 27px;border-radius:9px;background:var(--gcp-bg-deep);color:var(--gcp-dim);font-size:10.5px;line-height:1.55}.gcp-lab-findings li+li{margin-top:5px}.gcp-lab-findings li::marker{color:var(--gcp-accent)}.gcp-leaderboard-wrap{overflow-x:auto;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep)}.gcp-leaderboard{width:100%;min-width:650px;border-collapse:collapse;font-size:10.5px;font-variant-numeric:tabular-nums}.gcp-leaderboard th{padding:8px 9px;border-bottom:1px solid var(--gcp-border);color:var(--gcp-faint);font-size:8.5px;font-weight:700;letter-spacing:.075em;text-align:left;text-transform:uppercase;white-space:nowrap}.gcp-leaderboard td{padding:9px;border-bottom:1px solid var(--gcp-border-soft);color:var(--gcp-dim);vertical-align:middle}.gcp-leaderboard tbody tr:last-child td{border-bottom:none}.gcp-leaderboard tbody tr.winner{background:#2dd4d80e}.gcp-rank{display:inline-grid;place-items:center;width:21px;height:21px;border-radius:6px;background:var(--gcp-surface);color:var(--gcp-dim)}.gcp-leaderboard tr.winner .gcp-rank{color:var(--gcp-accent-bright);background:var(--gcp-accent-soft)}.gcp-candidate-name{display:flex;align-items:center;flex-wrap:wrap;gap:5px;min-width:140px}.gcp-candidate-name strong{color:var(--gcp-text);font-size:10.5px}.gcp-winner-tag{padding:2px 5px;border-radius:4px;background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:8px;font-weight:700;text-transform:uppercase}.gcp-candidate-operations{display:block;max-width:240px;margin-top:3px;color:var(--gcp-muted);font-family:var(--gcp-mono);font-size:8.5px;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-candidate-error{display:block;max-width:210px;margin-top:3px;color:var(--gcp-danger);font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-metric-value{color:var(--gcp-text)!important;font-family:var(--gcp-mono)}.gcp-metric-detail{display:block;margin-top:3px;color:var(--gcp-muted);font-family:var(--gcp-font);font-size:8.5px;font-weight:500;line-height:1.3;white-space:nowrap}.gcp-candidate-download{min-height:25px;padding:4px 7px;border:1px solid var(--gcp-border);border-radius:6px;background:var(--gcp-surface);color:var(--gcp-dim);font:600 8.5px/1 var(--gcp-font);cursor:pointer}.gcp-candidate-download:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-text)}.gcp-candidate-download:disabled{opacity:.4;cursor:not-allowed}.gcp-study-import-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:8;display:grid;place-items:center;padding:20px;background:#05080cc2;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px)}.gcp-study-import-dialog{width:min(100%,520px);max-height:calc(100% - 12px);overflow-y:auto;padding:18px;border:1px solid var(--gcp-border);border-radius:13px;background:var(--gcp-bg-raised);box-shadow:var(--gcp-shadow-lg)}.gcp-study-import-dialog h2{margin:4px 0 7px;color:var(--gcp-text);font-size:15px}.gcp-study-import-dialog>p{margin:0;color:var(--gcp-dim);font-size:10.5px;line-height:1.55}.gcp-study-import-dialog dl{margin:14px 0;display:grid;gap:7px}.gcp-study-import-dialog dl>div{display:grid;grid-template-columns:105px minmax(0,1fr);gap:10px}.gcp-study-import-dialog dt{color:var(--gcp-faint);font-size:9px;font-weight:700;text-transform:uppercase}.gcp-study-import-dialog dd{min-width:0;margin:0;color:var(--gcp-text);font-size:10px;overflow-wrap:anywhere}.gcp-study-import-dialog code{color:var(--gcp-accent-bright);font:8.5px/1.4 var(--gcp-mono)}.gcp-study-import-safety{padding:9px 10px;border:1px solid var(--gcp-accent-line);border-radius:8px;background:var(--gcp-accent-soft)}.gcp-study-import-dialog .gcp-lab-portable-message{margin:10px 0 0}.gcp-study-import-actions{display:flex;justify-content:flex-end;gap:7px;margin-top:15px}.gcp-study-import-actions button{min-height:30px;padding:6px 11px;border:1px solid var(--gcp-border);border-radius:7px;background:var(--gcp-surface);color:var(--gcp-dim);font:650 9.5px/1 var(--gcp-font);cursor:pointer}.gcp-study-import-actions button.primary{border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright)}.gcp-study-import-actions button:disabled{opacity:.5;cursor:not-allowed}.gcp-lab-warnings{display:flex;flex-direction:column;gap:5px}.gcp-lab-warnings p{position:relative;margin:0;padding:8px 10px 8px 27px;border:1px solid rgba(251,191,36,.17);border-radius:8px;background:#fbbf240e;color:#d8c28c;font-size:10px;line-height:1.5}.gcp-lab-warnings p:before{content:"!";position:absolute;left:10px;top:8px;color:var(--gcp-warn);font-weight:800}.gcp-paper-grid{display:grid;grid-template-columns:1fr;gap:8px}.gcp-paper-card{position:relative;padding:12px;border:1px solid var(--gcp-border-soft);border-radius:10px;background:var(--gcp-bg-deep);overflow:hidden}.gcp-paper-index{position:absolute;right:9px;top:7px;color:#ffffff0d;font-family:var(--gcp-mono);font-size:25px;font-weight:800}.gcp-paper-card h4{position:relative;margin:0 28px 9px 0;color:var(--gcp-text);font-size:11px;line-height:1.4}.gcp-paper-card dl{margin:0;display:flex;flex-direction:column;gap:7px}.gcp-paper-card dl>div{display:grid;grid-template-columns:52px 1fr;gap:7px}.gcp-paper-card dt{color:var(--gcp-accent);font-size:8.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}.gcp-paper-card dd{margin:0;color:var(--gcp-dim);font-size:9.5px;line-height:1.5}.gcp-window--expanded .gcp-lab{padding:24px}.gcp-window--expanded .gcp-lab-layout{display:grid;grid-template-columns:220px minmax(0,1fr);align-items:start}.gcp-window--expanded .gcp-lab-studies{position:sticky;top:0;max-height:590px;flex-direction:column;overflow-x:hidden;overflow-y:auto;padding:1px 5px 1px 1px}.gcp-window--expanded .gcp-study-card{width:100%;min-width:0}.gcp-window--expanded .gcp-lab-summary-grid,.gcp-window--expanded .gcp-paper-grid{grid-template-columns:repeat(2,minmax(0,1fr))}@media(max-width:720px),(max-height:560px){.gcp-window,.gcp-window--expanded{top:8px;right:8px;bottom:8px;left:8px;width:auto;height:auto;min-height:0;border-radius:13px}.gcp-window--expanded .gcp-lab-layout{display:flex}.gcp-window--expanded .gcp-lab-studies{position:static;max-height:none;flex-direction:row;overflow-x:auto;overflow-y:hidden}.gcp-window--expanded .gcp-study-card{width:220px;min-width:220px}.gcp-window--expanded .gcp-messages{padding:16px 14px 8px}.gcp-window--expanded .gcp-input-area{padding:10px 12px 12px}}@media(max-width:430px){.gcp-header-main{padding-left:10px;gap:7px}.gcp-brand-copy>span{display:none}.gcp-header-actions .gcp-model-chip{max-width:116px}.gcp-context-bar{padding:0 11px;gap:6px}.gcp-context-name{display:none}.gcp-context-stat{padding-left:6px}.gcp-workbench-nav{gap:2px;padding-left:5px;padding-right:5px}.gcp-nav-btn{gap:5px;padding:0 5px;font-size:10.5px}.gcp-lab{padding:14px 11px}.gcp-lab-report{padding:12px 10px}.gcp-lab-heading p{display:none}.gcp-lab-heading{align-items:center;margin-bottom:13px}}.gcp-experiment-approval-backdrop{position:absolute;top:0;right:0;bottom:0;left:0;z-index:40;display:grid;place-items:center;padding:18px;background:color-mix(in srgb,var(--gcp-bg, #0f1117) 72%,transparent);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.gcp-experiment-approval{width:min(420px,100%);padding:20px;border:1px solid color-mix(in srgb,var(--gcp-accent, #7c8cff) 32%,var(--gcp-border, #2c3340));border-radius:16px;background:var(--gcp-surface, #171a22);box-shadow:0 24px 70px #0000006b}.gcp-experiment-approval-kicker{margin-bottom:6px;color:var(--gcp-accent, #8b9aff);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.gcp-experiment-approval-title{color:var(--gcp-text, #f4f6fb);font-size:18px;font-weight:700;line-height:1.3}.gcp-experiment-approval-hypothesis{margin-top:10px;color:var(--gcp-text, #f4f6fb);font-size:13px;line-height:1.5}.gcp-experiment-approval-facts{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.gcp-experiment-approval-facts span{padding:4px 7px;border-radius:999px;background:var(--gcp-surface-2, #222631);color:var(--gcp-muted, #a8b0bf);font-size:11px}.gcp-experiment-approval-candidates{display:grid;gap:6px;max-height:124px;margin-top:12px;overflow-y:auto}.gcp-experiment-approval-candidates>div,.gcp-experiment-approval-nodes{display:grid;grid-template-columns:minmax(72px,.35fr) minmax(0,1fr);gap:8px;padding:7px 9px;border-radius:8px;background:var(--gcp-surface-2, #222631);font-size:10.5px;line-height:1.4}.gcp-experiment-approval-candidates strong,.gcp-experiment-approval-nodes strong{color:var(--gcp-text, #f4f6fb)}.gcp-experiment-approval-candidates span,.gcp-experiment-approval-nodes span{min-width:0;overflow-wrap:anywhere;color:var(--gcp-muted, #a8b0bf);font-family:var(--gcp-mono, ui-monospace, monospace)}.gcp-experiment-approval-nodes{margin-top:6px}.gcp-experiment-approval-warning{margin-top:14px;padding:10px 11px;border:1px solid color-mix(in srgb,#f5b942 32%,transparent);border-radius:10px;background:color-mix(in srgb,#f5b942 8%,transparent);color:var(--gcp-muted, #bac1cf);font-size:12px;line-height:1.45}.gcp-experiment-approval-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}.gcp-approval-secondary,.gcp-approval-primary{min-height:34px;padding:0 13px;border-radius:9px;font:inherit;font-size:12px;font-weight:650;cursor:pointer}.gcp-approval-secondary{border:1px solid var(--gcp-border, #343b49);background:transparent;color:var(--gcp-text, #f4f6fb)}.gcp-approval-primary{border:1px solid transparent;background:var(--gcp-accent, #7c8cff);color:#fff}.gcp-approval-secondary:hover,.gcp-approval-primary:hover{filter:brightness(1.08)}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
var Tb = Object.defineProperty;
var Mb = (a, r, l) => r in a ? Tb(a, r, { enumerable: !0, configurable: !0, writable: !0, value: l }) : a[r] = l;
var en = (a, r, l) => Mb(a, typeof r != "symbol" ? r + "" : r, l);
function Db(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var yu = { exports: {} }, Lr = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dh;
function Ob() {
  if (dh) return Lr;
  dh = 1;
  var a = Symbol.for("react.transitional.element"), r = Symbol.for("react.fragment");
  function l(s, u, d) {
    var f = null;
    if (d !== void 0 && (f = "" + d), u.key !== void 0 && (f = "" + u.key), "key" in u) {
      d = {};
      for (var y in u)
        y !== "key" && (d[y] = u[y]);
    } else d = u;
    return u = d.ref, {
      $$typeof: a,
      type: s,
      key: f,
      ref: u !== void 0 ? u : null,
      props: d
    };
  }
  return Lr.Fragment = r, Lr.jsx = l, Lr.jsxs = l, Lr;
}
var fh;
function Cb() {
  return fh || (fh = 1, yu.exports = Ob()), yu.exports;
}
var v = Cb(), gu = { exports: {} }, ge = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ph;
function zb() {
  if (ph) return ge;
  ph = 1;
  var a = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), d = Symbol.for("react.consumer"), f = Symbol.for("react.context"), y = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), g = Symbol.for("react.activity"), _ = Symbol.iterator;
  function N(E) {
    return E === null || typeof E != "object" ? null : (E = _ && E[_] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var z = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, A = Object.assign, H = {};
  function T(E, L, W) {
    this.props = E, this.context = L, this.refs = H, this.updater = W || z;
  }
  T.prototype.isReactComponent = {}, T.prototype.setState = function(E, L) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, L, "setState");
  }, T.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function R() {
  }
  R.prototype = T.prototype;
  function I(E, L, W) {
    this.props = E, this.context = L, this.refs = H, this.updater = W || z;
  }
  var ae = I.prototype = new R();
  ae.constructor = I, A(ae, T.prototype), ae.isPureReactComponent = !0;
  var Q = Array.isArray;
  function ne() {
  }
  var V = { H: null, A: null, T: null, S: null }, se = Object.prototype.hasOwnProperty;
  function ue(E, L, W) {
    var ee = W.ref;
    return {
      $$typeof: a,
      type: E,
      key: L,
      ref: ee !== void 0 ? ee : null,
      props: W
    };
  }
  function Y(E, L) {
    return ue(E.type, L, E.props);
  }
  function X(E) {
    return typeof E == "object" && E !== null && E.$$typeof === a;
  }
  function oe(E) {
    var L = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(W) {
      return L[W];
    });
  }
  var ye = /\/+/g;
  function re(E, L) {
    return typeof E == "object" && E !== null && E.key != null ? oe("" + E.key) : L.toString(36);
  }
  function be(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(ne, ne) : (E.status = "pending", E.then(
          function(L) {
            E.status === "pending" && (E.status = "fulfilled", E.value = L);
          },
          function(L) {
            E.status === "pending" && (E.status = "rejected", E.reason = L);
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
  function D(E, L, W, ee, me) {
    var Se = typeof E;
    (Se === "undefined" || Se === "boolean") && (E = null);
    var Te = !1;
    if (E === null) Te = !0;
    else
      switch (Se) {
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
                L,
                W,
                ee,
                me
              );
          }
      }
    if (Te)
      return me = me(E), Te = ee === "" ? "." + re(E, 0) : ee, Q(me) ? (W = "", Te != null && (W = Te.replace(ye, "$&/") + "/"), D(me, L, W, "", function(dn) {
        return dn;
      })) : me != null && (X(me) && (me = Y(
        me,
        W + (me.key == null || E && E.key === me.key ? "" : ("" + me.key).replace(
          ye,
          "$&/"
        ) + "/") + Te
      )), L.push(me)), 1;
    Te = 0;
    var dt = ee === "" ? "." : ee + ":";
    if (Q(E))
      for (var Xe = 0; Xe < E.length; Xe++)
        ee = E[Xe], Se = dt + re(ee, Xe), Te += D(
          ee,
          L,
          W,
          Se,
          me
        );
    else if (Xe = N(E), typeof Xe == "function")
      for (E = Xe.call(E), Xe = 0; !(ee = E.next()).done; )
        ee = ee.value, Se = dt + re(ee, Xe++), Te += D(
          ee,
          L,
          W,
          Se,
          me
        );
    else if (Se === "object") {
      if (typeof E.then == "function")
        return D(
          be(E),
          L,
          W,
          ee,
          me
        );
      throw L = String(E), Error(
        "Objects are not valid as a React child (found: " + (L === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : L) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Te;
  }
  function k(E, L, W) {
    if (E == null) return E;
    var ee = [], me = 0;
    return D(E, ee, "", "", function(Se) {
      return L.call(W, Se, me++);
    }), ee;
  }
  function $(E) {
    if (E._status === -1) {
      var L = E._result;
      L = L(), L.then(
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = W);
        },
        function(W) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = W);
        }
      ), E._status === -1 && (E._status = 0, E._result = L);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var te = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var L = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(L)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  }, Z = {
    map: k,
    forEach: function(E, L, W) {
      k(
        E,
        function() {
          L.apply(this, arguments);
        },
        W
      );
    },
    count: function(E) {
      var L = 0;
      return k(E, function() {
        L++;
      }), L;
    },
    toArray: function(E) {
      return k(E, function(L) {
        return L;
      }) || [];
    },
    only: function(E) {
      if (!X(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return ge.Activity = g, ge.Children = Z, ge.Component = T, ge.Fragment = l, ge.Profiler = u, ge.PureComponent = I, ge.StrictMode = s, ge.Suspense = m, ge.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V, ge.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return V.H.useMemoCache(E);
    }
  }, ge.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, ge.cacheSignal = function() {
    return null;
  }, ge.cloneElement = function(E, L, W) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var ee = A({}, E.props), me = E.key;
    if (L != null)
      for (Se in L.key !== void 0 && (me = "" + L.key), L)
        !se.call(L, Se) || Se === "key" || Se === "__self" || Se === "__source" || Se === "ref" && L.ref === void 0 || (ee[Se] = L[Se]);
    var Se = arguments.length - 2;
    if (Se === 1) ee.children = W;
    else if (1 < Se) {
      for (var Te = Array(Se), dt = 0; dt < Se; dt++)
        Te[dt] = arguments[dt + 2];
      ee.children = Te;
    }
    return ue(E.type, me, ee);
  }, ge.createContext = function(E) {
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
  }, ge.createElement = function(E, L, W) {
    var ee, me = {}, Se = null;
    if (L != null)
      for (ee in L.key !== void 0 && (Se = "" + L.key), L)
        se.call(L, ee) && ee !== "key" && ee !== "__self" && ee !== "__source" && (me[ee] = L[ee]);
    var Te = arguments.length - 2;
    if (Te === 1) me.children = W;
    else if (1 < Te) {
      for (var dt = Array(Te), Xe = 0; Xe < Te; Xe++)
        dt[Xe] = arguments[Xe + 2];
      me.children = dt;
    }
    if (E && E.defaultProps)
      for (ee in Te = E.defaultProps, Te)
        me[ee] === void 0 && (me[ee] = Te[ee]);
    return ue(E, Se, me);
  }, ge.createRef = function() {
    return { current: null };
  }, ge.forwardRef = function(E) {
    return { $$typeof: y, render: E };
  }, ge.isValidElement = X, ge.lazy = function(E) {
    return {
      $$typeof: b,
      _payload: { _status: -1, _result: E },
      _init: $
    };
  }, ge.memo = function(E, L) {
    return {
      $$typeof: h,
      type: E,
      compare: L === void 0 ? null : L
    };
  }, ge.startTransition = function(E) {
    var L = V.T, W = {};
    V.T = W;
    try {
      var ee = E(), me = V.S;
      me !== null && me(W, ee), typeof ee == "object" && ee !== null && typeof ee.then == "function" && ee.then(ne, te);
    } catch (Se) {
      te(Se);
    } finally {
      L !== null && W.types !== null && (L.types = W.types), V.T = L;
    }
  }, ge.unstable_useCacheRefresh = function() {
    return V.H.useCacheRefresh();
  }, ge.use = function(E) {
    return V.H.use(E);
  }, ge.useActionState = function(E, L, W) {
    return V.H.useActionState(E, L, W);
  }, ge.useCallback = function(E, L) {
    return V.H.useCallback(E, L);
  }, ge.useContext = function(E) {
    return V.H.useContext(E);
  }, ge.useDebugValue = function() {
  }, ge.useDeferredValue = function(E, L) {
    return V.H.useDeferredValue(E, L);
  }, ge.useEffect = function(E, L) {
    return V.H.useEffect(E, L);
  }, ge.useEffectEvent = function(E) {
    return V.H.useEffectEvent(E);
  }, ge.useId = function() {
    return V.H.useId();
  }, ge.useImperativeHandle = function(E, L, W) {
    return V.H.useImperativeHandle(E, L, W);
  }, ge.useInsertionEffect = function(E, L) {
    return V.H.useInsertionEffect(E, L);
  }, ge.useLayoutEffect = function(E, L) {
    return V.H.useLayoutEffect(E, L);
  }, ge.useMemo = function(E, L) {
    return V.H.useMemo(E, L);
  }, ge.useOptimistic = function(E, L) {
    return V.H.useOptimistic(E, L);
  }, ge.useReducer = function(E, L, W) {
    return V.H.useReducer(E, L, W);
  }, ge.useRef = function(E) {
    return V.H.useRef(E);
  }, ge.useState = function(E) {
    return V.H.useState(E);
  }, ge.useSyncExternalStore = function(E, L, W) {
    return V.H.useSyncExternalStore(
      E,
      L,
      W
    );
  }, ge.useTransition = function() {
    return V.H.useTransition();
  }, ge.version = "19.2.7", ge;
}
var mh;
function Fu() {
  return mh || (mh = 1, gu.exports = zb()), gu.exports;
}
var P = Fu();
const Rb = /* @__PURE__ */ Db(P);
var vu = { exports: {} }, Vr = {}, bu = { exports: {} }, Su = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hh;
function Ub() {
  return hh || (hh = 1, (function(a) {
    function r(D, k) {
      var $ = D.length;
      D.push(k);
      e: for (; 0 < $; ) {
        var te = $ - 1 >>> 1, Z = D[te];
        if (0 < u(Z, k))
          D[te] = k, D[$] = Z, $ = te;
        else break e;
      }
    }
    function l(D) {
      return D.length === 0 ? null : D[0];
    }
    function s(D) {
      if (D.length === 0) return null;
      var k = D[0], $ = D.pop();
      if ($ !== k) {
        D[0] = $;
        e: for (var te = 0, Z = D.length, E = Z >>> 1; te < E; ) {
          var L = 2 * (te + 1) - 1, W = D[L], ee = L + 1, me = D[ee];
          if (0 > u(W, $))
            ee < Z && 0 > u(me, W) ? (D[te] = me, D[ee] = $, te = ee) : (D[te] = W, D[L] = $, te = L);
          else if (ee < Z && 0 > u(me, $))
            D[te] = me, D[ee] = $, te = ee;
          else break e;
        }
      }
      return k;
    }
    function u(D, k) {
      var $ = D.sortIndex - k.sortIndex;
      return $ !== 0 ? $ : D.id - k.id;
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
    var m = [], h = [], b = 1, g = null, _ = 3, N = !1, z = !1, A = !1, H = !1, T = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
    function ae(D) {
      for (var k = l(h); k !== null; ) {
        if (k.callback === null) s(h);
        else if (k.startTime <= D)
          s(h), k.sortIndex = k.expirationTime, r(m, k);
        else break;
        k = l(h);
      }
    }
    function Q(D) {
      if (A = !1, ae(D), !z)
        if (l(m) !== null)
          z = !0, ne || (ne = !0, oe());
        else {
          var k = l(h);
          k !== null && be(Q, k.startTime - D);
        }
    }
    var ne = !1, V = -1, se = 5, ue = -1;
    function Y() {
      return H ? !0 : !(a.unstable_now() - ue < se);
    }
    function X() {
      if (H = !1, ne) {
        var D = a.unstable_now();
        ue = D;
        var k = !0;
        try {
          e: {
            z = !1, A && (A = !1, R(V), V = -1), N = !0;
            var $ = _;
            try {
              t: {
                for (ae(D), g = l(m); g !== null && !(g.expirationTime > D && Y()); ) {
                  var te = g.callback;
                  if (typeof te == "function") {
                    g.callback = null, _ = g.priorityLevel;
                    var Z = te(
                      g.expirationTime <= D
                    );
                    if (D = a.unstable_now(), typeof Z == "function") {
                      g.callback = Z, ae(D), k = !0;
                      break t;
                    }
                    g === l(m) && s(m), ae(D);
                  } else s(m);
                  g = l(m);
                }
                if (g !== null) k = !0;
                else {
                  var E = l(h);
                  E !== null && be(
                    Q,
                    E.startTime - D
                  ), k = !1;
                }
              }
              break e;
            } finally {
              g = null, _ = $, N = !1;
            }
            k = void 0;
          }
        } finally {
          k ? oe() : ne = !1;
        }
      }
    }
    var oe;
    if (typeof I == "function")
      oe = function() {
        I(X);
      };
    else if (typeof MessageChannel < "u") {
      var ye = new MessageChannel(), re = ye.port2;
      ye.port1.onmessage = X, oe = function() {
        re.postMessage(null);
      };
    } else
      oe = function() {
        T(X, 0);
      };
    function be(D, k) {
      V = T(function() {
        D(a.unstable_now());
      }, k);
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
          var k = 3;
          break;
        default:
          k = _;
      }
      var $ = _;
      _ = k;
      try {
        return D();
      } finally {
        _ = $;
      }
    }, a.unstable_requestPaint = function() {
      H = !0;
    }, a.unstable_runWithPriority = function(D, k) {
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
      var $ = _;
      _ = D;
      try {
        return k();
      } finally {
        _ = $;
      }
    }, a.unstable_scheduleCallback = function(D, k, $) {
      var te = a.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? te + $ : te) : $ = te, D) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = $ + Z, D = {
        id: b++,
        callback: k,
        priorityLevel: D,
        startTime: $,
        expirationTime: Z,
        sortIndex: -1
      }, $ > te ? (D.sortIndex = $, r(h, D), l(m) === null && D === l(h) && (A ? (R(V), V = -1) : A = !0, be(Q, $ - te))) : (D.sortIndex = Z, r(m, D), z || N || (z = !0, ne || (ne = !0, oe()))), D;
    }, a.unstable_shouldYield = Y, a.unstable_wrapCallback = function(D) {
      var k = _;
      return function() {
        var $ = _;
        _ = k;
        try {
          return D.apply(this, arguments);
        } finally {
          _ = $;
        }
      };
    };
  })(Su)), Su;
}
var yh;
function Lb() {
  return yh || (yh = 1, bu.exports = Ub()), bu.exports;
}
var _u = { exports: {} }, At = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gh;
function Vb() {
  if (gh) return At;
  gh = 1;
  var a = Fu();
  function r(m) {
    var h = "https://react.dev/errors/" + m;
    if (1 < arguments.length) {
      h += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        h += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return "Minified React error #" + m + "; visit " + h + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var s = {
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
  function d(m, h, b) {
    var g = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: g == null ? null : "" + g,
      children: m,
      containerInfo: h,
      implementation: b
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function y(m, h) {
    if (m === "font") return "";
    if (typeof h == "string")
      return h === "use-credentials" ? h : "";
  }
  return At.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, At.createPortal = function(m, h) {
    var b = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
      throw Error(r(299));
    return d(m, h, null, b);
  }, At.flushSync = function(m) {
    var h = f.T, b = s.p;
    try {
      if (f.T = null, s.p = 2, m) return m();
    } finally {
      f.T = h, s.p = b, s.d.f();
    }
  }, At.preconnect = function(m, h) {
    typeof m == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, s.d.C(m, h));
  }, At.prefetchDNS = function(m) {
    typeof m == "string" && s.d.D(m);
  }, At.preinit = function(m, h) {
    if (typeof m == "string" && h && typeof h.as == "string") {
      var b = h.as, g = y(b, h.crossOrigin), _ = typeof h.integrity == "string" ? h.integrity : void 0, N = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
      b === "style" ? s.d.S(
        m,
        typeof h.precedence == "string" ? h.precedence : void 0,
        {
          crossOrigin: g,
          integrity: _,
          fetchPriority: N
        }
      ) : b === "script" && s.d.X(m, {
        crossOrigin: g,
        integrity: _,
        fetchPriority: N,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      });
    }
  }, At.preinitModule = function(m, h) {
    if (typeof m == "string")
      if (typeof h == "object" && h !== null) {
        if (h.as == null || h.as === "script") {
          var b = y(
            h.as,
            h.crossOrigin
          );
          s.d.M(m, {
            crossOrigin: b,
            integrity: typeof h.integrity == "string" ? h.integrity : void 0,
            nonce: typeof h.nonce == "string" ? h.nonce : void 0
          });
        }
      } else h == null && s.d.M(m);
  }, At.preload = function(m, h) {
    if (typeof m == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
      var b = h.as, g = y(b, h.crossOrigin);
      s.d.L(m, b, {
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
  }, At.preloadModule = function(m, h) {
    if (typeof m == "string")
      if (h) {
        var b = y(h.as, h.crossOrigin);
        s.d.m(m, {
          as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
          crossOrigin: b,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0
        });
      } else s.d.m(m);
  }, At.requestFormReset = function(m) {
    s.d.r(m);
  }, At.unstable_batchedUpdates = function(m, h) {
    return m(h);
  }, At.useFormState = function(m, h, b) {
    return f.H.useFormState(m, h, b);
  }, At.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, At.version = "19.2.7", At;
}
var vh;
function Bb() {
  if (vh) return _u.exports;
  vh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (r) {
        console.error(r);
      }
  }
  return a(), _u.exports = Vb(), _u.exports;
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
var bh;
function Hb() {
  if (bh) return Vr;
  bh = 1;
  var a = Lb(), r = Fu(), l = Bb();
  function s(e) {
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
  function y(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function m(e) {
    if (d(e) !== e)
      throw Error(s(188));
  }
  function h(e) {
    var t = e.alternate;
    if (!t) {
      if (t = d(e), t === null) throw Error(s(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var c = o.alternate;
      if (c === null) {
        if (i = o.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (o.child === c.child) {
        for (c = o.child; c; ) {
          if (c === n) return m(o), e;
          if (c === i) return m(o), t;
          c = c.sibling;
        }
        throw Error(s(188));
      }
      if (n.return !== i.return) n = o, i = c;
      else {
        for (var p = !1, S = o.child; S; ) {
          if (S === n) {
            p = !0, n = o, i = c;
            break;
          }
          if (S === i) {
            p = !0, i = o, n = c;
            break;
          }
          S = S.sibling;
        }
        if (!p) {
          for (S = c.child; S; ) {
            if (S === n) {
              p = !0, n = c, i = o;
              break;
            }
            if (S === i) {
              p = !0, i = c, n = o;
              break;
            }
            S = S.sibling;
          }
          if (!p) throw Error(s(189));
        }
      }
      if (n.alternate !== i) throw Error(s(190));
    }
    if (n.tag !== 3) throw Error(s(188));
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
  var g = Object.assign, _ = Symbol.for("react.element"), N = Symbol.for("react.transitional.element"), z = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), H = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), I = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), Q = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), se = Symbol.for("react.lazy"), ue = Symbol.for("react.activity"), Y = Symbol.for("react.memo_cache_sentinel"), X = Symbol.iterator;
  function oe(e) {
    return e === null || typeof e != "object" ? null : (e = X && e[X] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var ye = Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === ye ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case A:
        return "Fragment";
      case T:
        return "Profiler";
      case H:
        return "StrictMode";
      case Q:
        return "Suspense";
      case ne:
        return "SuspenseList";
      case ue:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case z:
          return "Portal";
        case I:
          return e.displayName || "Context";
        case R:
          return (e._context.displayName || "Context") + ".Consumer";
        case ae:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case V:
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
  var be = Array.isArray, D = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, te = [], Z = -1;
  function E(e) {
    return { current: e };
  }
  function L(e) {
    0 > Z || (e.current = te[Z], te[Z] = null, Z--);
  }
  function W(e, t) {
    Z++, te[Z] = e.current, e.current = t;
  }
  var ee = E(null), me = E(null), Se = E(null), Te = E(null);
  function dt(e, t) {
    switch (W(Se, t), W(me, e), W(ee, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? zm(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = zm(t), e = Rm(t, e);
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
    L(ee), W(ee, e);
  }
  function Xe() {
    L(ee), L(me), L(Se);
  }
  function dn(e) {
    e.memoizedState !== null && W(Te, e);
    var t = ee.current, n = Rm(t, e.type);
    t !== n && (W(me, e), W(ee, n));
  }
  function bn(e) {
    me.current === e && (L(ee), L(me)), Te.current === e && (L(Te), Cr._currentValue = $);
  }
  var Xn, J;
  function de(e) {
    if (Xn === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Xn = t && t[1] || "", J = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Xn + e + J;
  }
  var Re = !1;
  function Fe(e, t) {
    if (!e || Re) return "";
    Re = !0;
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
                } catch (U) {
                  var C = U;
                }
                Reflect.construct(e, [], q);
              } else {
                try {
                  q.call();
                } catch (U) {
                  C = U;
                }
                e.call(q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (U) {
                C = U;
              }
              (q = e()) && typeof q.catch == "function" && q.catch(function() {
              });
            }
          } catch (U) {
            if (U && C && typeof U.stack == "string")
              return [U.stack, C.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      o && o.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = i.DetermineComponentFrameRoot(), p = c[0], S = c[1];
      if (p && S) {
        var x = p.split(`
`), O = S.split(`
`);
        for (o = i = 0; i < x.length && !x[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; o < O.length && !O[o].includes(
          "DetermineComponentFrameRoot"
        ); )
          o++;
        if (i === x.length || o === O.length)
          for (i = x.length - 1, o = O.length - 1; 1 <= i && 0 <= o && x[i] !== O[o]; )
            o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (x[i] !== O[o]) {
            if (i !== 1 || o !== 1)
              do
                if (i--, o--, 0 > o || x[i] !== O[o]) {
                  var B = `
` + x[i].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      Re = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? de(n) : "";
  }
  function pt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return de(e.type);
      case 16:
        return de("Lazy");
      case 13:
        return e.child !== t && t !== null ? de("Suspense Fallback") : de("Suspense");
      case 19:
        return de("SuspenseList");
      case 0:
      case 15:
        return Fe(e.type, !1);
      case 11:
        return Fe(e.type.render, !1);
      case 1:
        return Fe(e.type, !0);
      case 31:
        return de("Activity");
      default:
        return "";
    }
  }
  function rt(e) {
    try {
      var t = "", n = null;
      do
        t += pt(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var $t = Object.prototype.hasOwnProperty, nn = a.unstable_scheduleCallback, ke = a.unstable_cancelCallback, Na = a.unstable_shouldYield, Za = a.unstable_requestPaint, xt = a.unstable_now, to = a.unstable_getCurrentPriorityLevel, Yi = a.unstable_ImmediatePriority, K = a.unstable_UserBlockingPriority, Ae = a.unstable_NormalPriority, Et = a.unstable_LowPriority, ja = a.unstable_IdlePriority, Be = a.log, kn = a.unstable_setDisableYieldValue, Nt = null, Pe = null;
  function an(e) {
    if (typeof Be == "function" && kn(e), Pe && typeof Pe.setStrictMode == "function")
      try {
        Pe.setStrictMode(Nt, e);
      } catch {
      }
  }
  var Ke = Math.clz32 ? Math.clz32 : hg, Ja = Math.log, no = Math.LN2;
  function hg(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Ja(e) / no | 0) | 0;
  }
  var cl = 256, ul = 262144, dl = 4194304;
  function wa(e) {
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
  function fl(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0, c = e.suspendedLanes, p = e.pingedLanes;
    e = e.warmLanes;
    var S = i & 134217727;
    return S !== 0 ? (i = S & ~c, i !== 0 ? o = wa(i) : (p &= S, p !== 0 ? o = wa(p) : n || (n = S & ~e, n !== 0 && (o = wa(n))))) : (S = i & ~c, S !== 0 ? o = wa(S) : p !== 0 ? o = wa(p) : n || (n = i & ~e, n !== 0 && (o = wa(n)))), o === 0 ? 0 : t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : o;
  }
  function Xi(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function yg(e, t) {
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
  function md() {
    var e = dl;
    return dl <<= 1, (dl & 62914560) === 0 && (dl = 4194304), e;
  }
  function ao(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function ki(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function gg(e, t, n, i, o, c) {
    var p = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var S = e.entanglements, x = e.expirationTimes, O = e.hiddenUpdates;
    for (n = p & ~n; 0 < n; ) {
      var B = 31 - Ke(n), q = 1 << B;
      S[B] = 0, x[B] = -1;
      var C = O[B];
      if (C !== null)
        for (O[B] = null, B = 0; B < C.length; B++) {
          var U = C[B];
          U !== null && (U.lane &= -536870913);
        }
      n &= ~q;
    }
    i !== 0 && hd(e, i, 0), c !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(p & ~t));
  }
  function hd(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Ke(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 261930;
  }
  function yd(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var i = 31 - Ke(n), o = 1 << i;
      o & t | e[i] & t && (e[i] |= t), n &= ~o;
    }
  }
  function gd(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : io(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function io(e) {
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
  function ro(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function vd() {
    var e = k.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : ih(e.type));
  }
  function bd(e, t) {
    var n = k.p;
    try {
      return k.p = e, t();
    } finally {
      k.p = n;
    }
  }
  var Qn = Math.random().toString(36).slice(2), gt = "__reactFiber$" + Qn, Tt = "__reactProps$" + Qn, Fa = "__reactContainer$" + Qn, lo = "__reactEvents$" + Qn, vg = "__reactListeners$" + Qn, bg = "__reactHandles$" + Qn, Sd = "__reactResources$" + Qn, Qi = "__reactMarker$" + Qn;
  function so(e) {
    delete e[gt], delete e[Tt], delete e[lo], delete e[vg], delete e[bg];
  }
  function Wa(e) {
    var t = e[gt];
    if (t) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Fa] || n[gt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = qm(e); e !== null; ) {
            if (n = e[gt]) return n;
            e = qm(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function Pa(e) {
    if (e = e[gt] || e[Fa]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Zi(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(s(33));
  }
  function ei(e) {
    var t = e[Sd];
    return t || (t = e[Sd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function mt(e) {
    e[Qi] = !0;
  }
  var _d = /* @__PURE__ */ new Set(), Ed = {};
  function $a(e, t) {
    ti(e, t), ti(e + "Capture", t);
  }
  function ti(e, t) {
    for (Ed[e] = t, e = 0; e < t.length; e++)
      _d.add(t[e]);
  }
  var Sg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ad = {}, xd = {};
  function _g(e) {
    return $t.call(xd, e) ? !0 : $t.call(Ad, e) ? !1 : Sg.test(e) ? xd[e] = !0 : (Ad[e] = !0, !1);
  }
  function pl(e, t, n) {
    if (_g(t))
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
  function ml(e, t, n) {
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
  function Sn(e, t, n, i) {
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
  function Kt(e) {
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
  function Nd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Eg(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var o = i.get, c = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return o.call(this);
        },
        set: function(p) {
          n = "" + p, c.call(this, p);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(p) {
          n = "" + p;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function oo(e) {
    if (!e._valueTracker) {
      var t = Nd(e) ? "checked" : "value";
      e._valueTracker = Eg(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function jd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), i = "";
    return e && (i = Nd(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
  }
  function hl(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Ag = /[\n"\\]/g;
  function Yt(e) {
    return e.replace(
      Ag,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function co(e, t, n, i, o, c, p, S) {
    e.name = "", p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.type = p : e.removeAttribute("type"), t != null ? p === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : p !== "submit" && p !== "reset" || e.removeAttribute("value"), t != null ? uo(e, p, Kt(t)) : n != null ? uo(e, p, Kt(n)) : i != null && e.removeAttribute("value"), o == null && c != null && (e.defaultChecked = !!c), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.name = "" + Kt(S) : e.removeAttribute("name");
  }
  function wd(e, t, n, i, o, c, p, S) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        oo(e);
        return;
      }
      n = n != null ? "" + Kt(n) : "", t = t != null ? "" + Kt(t) : n, S || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = S ? e.checked : !!i, e.defaultChecked = !!i, p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (e.name = p), oo(e);
  }
  function uo(e, t, n) {
    t === "number" && hl(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
  }
  function ni(e, t, n, i) {
    if (e = e.options, t) {
      t = {};
      for (var o = 0; o < n.length; o++)
        t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Kt(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          e[o].selected = !0, i && (e[o].defaultSelected = !0);
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function $d(e, t, n) {
    if (t != null && (t = "" + Kt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Kt(n) : "";
  }
  function Td(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(s(92));
        if (be(i)) {
          if (1 < i.length) throw Error(s(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), t = n;
    }
    n = Kt(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i), oo(e);
  }
  function ai(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var xg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Md(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || xg.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Dd(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (e = e.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "");
      for (var o in t)
        i = t[o], t.hasOwnProperty(o) && n[o] !== i && Md(e, o, i);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Md(e, c, t[c]);
  }
  function fo(e) {
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
  var Ng = /* @__PURE__ */ new Map([
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
  ]), jg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yl(e) {
    return jg.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function _n() {
  }
  var po = null;
  function mo(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var ii = null, ri = null;
  function Od(e) {
    var t = Pa(e);
    if (t && (e = t.stateNode)) {
      var n = e[Tt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (co(
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
              'input[name="' + Yt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var o = i[Tt] || null;
                if (!o) throw Error(s(90));
                co(
                  i,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              i = n[t], i.form === e.form && jd(i);
          }
          break e;
        case "textarea":
          $d(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && ni(e, !!n.multiple, t, !1);
      }
    }
  }
  var ho = !1;
  function Cd(e, t, n) {
    if (ho) return e(t, n);
    ho = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (ho = !1, (ii !== null || ri !== null) && (as(), ii && (t = ii, e = ri, ri = ii = null, Od(t), e)))
        for (t = 0; t < e.length; t++) Od(e[t]);
    }
  }
  function Ji(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[Tt] || null;
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
        s(231, t, typeof n)
      );
    return n;
  }
  var En = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), yo = !1;
  if (En)
    try {
      var Fi = {};
      Object.defineProperty(Fi, "passive", {
        get: function() {
          yo = !0;
        }
      }), window.addEventListener("test", Fi, Fi), window.removeEventListener("test", Fi, Fi);
    } catch {
      yo = !1;
    }
  var Zn = null, go = null, gl = null;
  function zd() {
    if (gl) return gl;
    var e, t = go, n = t.length, i, o = "value" in Zn ? Zn.value : Zn.textContent, c = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++) ;
    var p = n - e;
    for (i = 1; i <= p && t[n - i] === o[c - i]; i++) ;
    return gl = o.slice(e, 1 < i ? 1 - i : void 0);
  }
  function vl(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function bl() {
    return !0;
  }
  function Rd() {
    return !1;
  }
  function Mt(e) {
    function t(n, i, o, c, p) {
      this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = c, this.target = p, this.currentTarget = null;
      for (var S in e)
        e.hasOwnProperty(S) && (n = e[S], this[S] = n ? n(c) : c[S]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? bl : Rd, this.isPropagationStopped = Rd, this;
    }
    return g(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = bl);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = bl);
      },
      persist: function() {
      },
      isPersistent: bl
    }), t;
  }
  var Ta = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Sl = Mt(Ta), Wi = g({}, Ta, { view: 0, detail: 0 }), wg = Mt(Wi), vo, bo, Pi, _l = g({}, Wi, {
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
    getModifierState: _o,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Pi && (Pi && e.type === "mousemove" ? (vo = e.screenX - Pi.screenX, bo = e.screenY - Pi.screenY) : bo = vo = 0, Pi = e), vo);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : bo;
    }
  }), Ud = Mt(_l), $g = g({}, _l, { dataTransfer: 0 }), Tg = Mt($g), Mg = g({}, Wi, { relatedTarget: 0 }), So = Mt(Mg), Dg = g({}, Ta, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Og = Mt(Dg), Cg = g({}, Ta, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), zg = Mt(Cg), Rg = g({}, Ta, { data: 0 }), Ld = Mt(Rg), Ug = {
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
  }, Lg = {
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
  }, Vg = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Bg(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = Vg[e]) ? !!t[e] : !1;
  }
  function _o() {
    return Bg;
  }
  var Hg = g({}, Wi, {
    key: function(e) {
      if (e.key) {
        var t = Ug[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = vl(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Lg[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: _o,
    charCode: function(e) {
      return e.type === "keypress" ? vl(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? vl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), Gg = Mt(Hg), qg = g({}, _l, {
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
  }), Vd = Mt(qg), Ig = g({}, Wi, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _o
  }), Kg = Mt(Ig), Yg = g({}, Ta, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Xg = Mt(Yg), kg = g({}, _l, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Qg = Mt(kg), Zg = g({}, Ta, {
    newState: 0,
    oldState: 0
  }), Jg = Mt(Zg), Fg = [9, 13, 27, 32], Eo = En && "CompositionEvent" in window, er = null;
  En && "documentMode" in document && (er = document.documentMode);
  var Wg = En && "TextEvent" in window && !er, Bd = En && (!Eo || er && 8 < er && 11 >= er), Hd = " ", Gd = !1;
  function qd(e, t) {
    switch (e) {
      case "keyup":
        return Fg.indexOf(t.keyCode) !== -1;
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
  function Id(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var li = !1;
  function Pg(e, t) {
    switch (e) {
      case "compositionend":
        return Id(t);
      case "keypress":
        return t.which !== 32 ? null : (Gd = !0, Hd);
      case "textInput":
        return e = t.data, e === Hd && Gd ? null : e;
      default:
        return null;
    }
  }
  function ev(e, t) {
    if (li)
      return e === "compositionend" || !Eo && qd(e, t) ? (e = zd(), gl = go = Zn = null, li = !1, e) : null;
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
        return Bd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var tv = {
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
  function Kd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!tv[e.type] : t === "textarea";
  }
  function Yd(e, t, n, i) {
    ii ? ri ? ri.push(i) : ri = [i] : ii = i, t = us(t, "onChange"), 0 < t.length && (n = new Sl(
      "onChange",
      "change",
      null,
      n,
      i
    ), e.push({ event: n, listeners: t }));
  }
  var tr = null, nr = null;
  function nv(e) {
    $m(e, 0);
  }
  function El(e) {
    var t = Zi(e);
    if (jd(t)) return e;
  }
  function Xd(e, t) {
    if (e === "change") return t;
  }
  var kd = !1;
  if (En) {
    var Ao;
    if (En) {
      var xo = "oninput" in document;
      if (!xo) {
        var Qd = document.createElement("div");
        Qd.setAttribute("oninput", "return;"), xo = typeof Qd.oninput == "function";
      }
      Ao = xo;
    } else Ao = !1;
    kd = Ao && (!document.documentMode || 9 < document.documentMode);
  }
  function Zd() {
    tr && (tr.detachEvent("onpropertychange", Jd), nr = tr = null);
  }
  function Jd(e) {
    if (e.propertyName === "value" && El(nr)) {
      var t = [];
      Yd(
        t,
        nr,
        e,
        mo(e)
      ), Cd(nv, t);
    }
  }
  function av(e, t, n) {
    e === "focusin" ? (Zd(), tr = t, nr = n, tr.attachEvent("onpropertychange", Jd)) : e === "focusout" && Zd();
  }
  function iv(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return El(nr);
  }
  function rv(e, t) {
    if (e === "click") return El(t);
  }
  function lv(e, t) {
    if (e === "input" || e === "change")
      return El(t);
  }
  function sv(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Lt = typeof Object.is == "function" ? Object.is : sv;
  function ar(e, t) {
    if (Lt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var o = n[i];
      if (!$t.call(t, o) || !Lt(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  function Fd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Wd(e, t) {
    var n = Fd(e);
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
      n = Fd(n);
    }
  }
  function Pd(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Pd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ef(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = hl(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = hl(e.document);
    }
    return t;
  }
  function No(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var ov = En && "documentMode" in document && 11 >= document.documentMode, si = null, jo = null, ir = null, wo = !1;
  function tf(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    wo || si == null || si !== hl(i) || (i = si, "selectionStart" in i && No(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), ir && ar(ir, i) || (ir = i, i = us(jo, "onSelect"), 0 < i.length && (t = new Sl(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: i }), t.target = si)));
  }
  function Ma(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var oi = {
    animationend: Ma("Animation", "AnimationEnd"),
    animationiteration: Ma("Animation", "AnimationIteration"),
    animationstart: Ma("Animation", "AnimationStart"),
    transitionrun: Ma("Transition", "TransitionRun"),
    transitionstart: Ma("Transition", "TransitionStart"),
    transitioncancel: Ma("Transition", "TransitionCancel"),
    transitionend: Ma("Transition", "TransitionEnd")
  }, $o = {}, nf = {};
  En && (nf = document.createElement("div").style, "AnimationEvent" in window || (delete oi.animationend.animation, delete oi.animationiteration.animation, delete oi.animationstart.animation), "TransitionEvent" in window || delete oi.transitionend.transition);
  function Da(e) {
    if ($o[e]) return $o[e];
    if (!oi[e]) return e;
    var t = oi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in nf)
        return $o[e] = t[n];
    return e;
  }
  var af = Da("animationend"), rf = Da("animationiteration"), lf = Da("animationstart"), cv = Da("transitionrun"), uv = Da("transitionstart"), dv = Da("transitioncancel"), sf = Da("transitionend"), of = /* @__PURE__ */ new Map(), To = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  To.push("scrollEnd");
  function rn(e, t) {
    of.set(e, t), $a(t, [e]);
  }
  var Al = typeof reportError == "function" ? reportError : function(e) {
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
  }, Xt = [], ci = 0, Mo = 0;
  function xl() {
    for (var e = ci, t = Mo = ci = 0; t < e; ) {
      var n = Xt[t];
      Xt[t++] = null;
      var i = Xt[t];
      Xt[t++] = null;
      var o = Xt[t];
      Xt[t++] = null;
      var c = Xt[t];
      if (Xt[t++] = null, i !== null && o !== null) {
        var p = i.pending;
        p === null ? o.next = o : (o.next = p.next, p.next = o), i.pending = o;
      }
      c !== 0 && cf(n, o, c);
    }
  }
  function Nl(e, t, n, i) {
    Xt[ci++] = e, Xt[ci++] = t, Xt[ci++] = n, Xt[ci++] = i, Mo |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Do(e, t, n, i) {
    return Nl(e, t, n, i), jl(e);
  }
  function Oa(e, t) {
    return Nl(e, null, null, t), jl(e);
  }
  function cf(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var o = !1, c = e.return; c !== null; )
      c.childLanes |= n, i = c.alternate, i !== null && (i.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (o = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, o && t !== null && (o = 31 - Ke(n), e = c.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = n | 536870912), c) : null;
  }
  function jl(e) {
    if (50 < jr)
      throw jr = 0, Hc = null, Error(s(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ui = {};
  function fv(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Vt(e, t, n, i) {
    return new fv(e, t, n, i);
  }
  function Oo(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function An(e, t) {
    var n = e.alternate;
    return n === null ? (n = Vt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function uf(e, t) {
    e.flags &= 65011714;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function wl(e, t, n, i, o, c) {
    var p = 0;
    if (i = e, typeof e == "function") Oo(e) && (p = 1);
    else if (typeof e == "string")
      p = gb(
        e,
        n,
        ee.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (e) {
        case ue:
          return e = Vt(31, n, t, o), e.elementType = ue, e.lanes = c, e;
        case A:
          return Ca(n.children, o, c, t);
        case H:
          p = 8, o |= 24;
          break;
        case T:
          return e = Vt(12, n, t, o | 2), e.elementType = T, e.lanes = c, e;
        case Q:
          return e = Vt(13, n, t, o), e.elementType = Q, e.lanes = c, e;
        case ne:
          return e = Vt(19, n, t, o), e.elementType = ne, e.lanes = c, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case I:
                p = 10;
                break e;
              case R:
                p = 9;
                break e;
              case ae:
                p = 11;
                break e;
              case V:
                p = 14;
                break e;
              case se:
                p = 16, i = null;
                break e;
            }
          p = 29, n = Error(
            s(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = Vt(p, n, t, o), t.elementType = e, t.type = i, t.lanes = c, t;
  }
  function Ca(e, t, n, i) {
    return e = Vt(7, e, i, t), e.lanes = n, e;
  }
  function Co(e, t, n) {
    return e = Vt(6, e, null, t), e.lanes = n, e;
  }
  function df(e) {
    var t = Vt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function zo(e, t, n) {
    return t = Vt(
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
  var ff = /* @__PURE__ */ new WeakMap();
  function kt(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = ff.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: rt(t)
      }, ff.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: rt(t)
    };
  }
  var di = [], fi = 0, $l = null, rr = 0, Qt = [], Zt = 0, Jn = null, fn = 1, pn = "";
  function xn(e, t) {
    di[fi++] = rr, di[fi++] = $l, $l = e, rr = t;
  }
  function pf(e, t, n) {
    Qt[Zt++] = fn, Qt[Zt++] = pn, Qt[Zt++] = Jn, Jn = e;
    var i = fn;
    e = pn;
    var o = 32 - Ke(i) - 1;
    i &= ~(1 << o), n += 1;
    var c = 32 - Ke(t) + o;
    if (30 < c) {
      var p = o - o % 5;
      c = (i & (1 << p) - 1).toString(32), i >>= p, o -= p, fn = 1 << 32 - Ke(t) + o | n << o | i, pn = c + e;
    } else
      fn = 1 << c | n << o | i, pn = e;
  }
  function Ro(e) {
    e.return !== null && (xn(e, 1), pf(e, 1, 0));
  }
  function Uo(e) {
    for (; e === $l; )
      $l = di[--fi], di[fi] = null, rr = di[--fi], di[fi] = null;
    for (; e === Jn; )
      Jn = Qt[--Zt], Qt[Zt] = null, pn = Qt[--Zt], Qt[Zt] = null, fn = Qt[--Zt], Qt[Zt] = null;
  }
  function mf(e, t) {
    Qt[Zt++] = fn, Qt[Zt++] = pn, Qt[Zt++] = Jn, fn = t.id, pn = t.overflow, Jn = e;
  }
  var vt = null, Qe = null, $e = !1, Fn = null, Jt = !1, Lo = Error(s(519));
  function Wn(e) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw lr(kt(t, e)), Lo;
  }
  function hf(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[gt] = e, t[Tt] = i, n) {
      case "dialog":
        Ne("cancel", t), Ne("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ne("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < $r.length; n++)
          Ne($r[n], t);
        break;
      case "source":
        Ne("error", t);
        break;
      case "img":
      case "image":
      case "link":
        Ne("error", t), Ne("load", t);
        break;
      case "details":
        Ne("toggle", t);
        break;
      case "input":
        Ne("invalid", t), wd(
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
        Ne("invalid", t);
        break;
      case "textarea":
        Ne("invalid", t), Td(t, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || Om(t.textContent, n) ? (i.popover != null && (Ne("beforetoggle", t), Ne("toggle", t)), i.onScroll != null && Ne("scroll", t), i.onScrollEnd != null && Ne("scrollend", t), i.onClick != null && (t.onclick = _n), t = !0) : t = !1, t || Wn(e, !0);
  }
  function yf(e) {
    for (vt = e.return; vt; )
      switch (vt.tag) {
        case 5:
        case 31:
        case 13:
          Jt = !1;
          return;
        case 27:
        case 3:
          Jt = !0;
          return;
        default:
          vt = vt.return;
      }
  }
  function pi(e) {
    if (e !== vt) return !1;
    if (!$e) return yf(e), $e = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || tu(e.type, e.memoizedProps)), n = !n), n && Qe && Wn(e), yf(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      Qe = Gm(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
      Qe = Gm(e);
    } else
      t === 27 ? (t = Qe, fa(e.type) ? (e = lu, lu = null, Qe = e) : Qe = t) : Qe = vt ? Wt(e.stateNode.nextSibling) : null;
    return !0;
  }
  function za() {
    Qe = vt = null, $e = !1;
  }
  function Vo() {
    var e = Fn;
    return e !== null && (zt === null ? zt = e : zt.push.apply(
      zt,
      e
    ), Fn = null), e;
  }
  function lr(e) {
    Fn === null ? Fn = [e] : Fn.push(e);
  }
  var Bo = E(null), Ra = null, Nn = null;
  function Pn(e, t, n) {
    W(Bo, t._currentValue), t._currentValue = n;
  }
  function jn(e) {
    e._currentValue = Bo.current, L(Bo);
  }
  function Ho(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Go(e, t, n, i) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var c = o.dependencies;
      if (c !== null) {
        var p = o.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var S = c;
          c = o;
          for (var x = 0; x < t.length; x++)
            if (S.context === t[x]) {
              c.lanes |= n, S = c.alternate, S !== null && (S.lanes |= n), Ho(
                c.return,
                n,
                e
              ), i || (p = null);
              break e;
            }
          c = S.next;
        }
      } else if (o.tag === 18) {
        if (p = o.return, p === null) throw Error(s(341));
        p.lanes |= n, c = p.alternate, c !== null && (c.lanes |= n), Ho(p, n, e), p = null;
      } else p = o.child;
      if (p !== null) p.return = o;
      else
        for (p = o; p !== null; ) {
          if (p === e) {
            p = null;
            break;
          }
          if (o = p.sibling, o !== null) {
            o.return = p.return, p = o;
            break;
          }
          p = p.return;
        }
      o = p;
    }
  }
  function mi(e, t, n, i) {
    e = null;
    for (var o = t, c = !1; o !== null; ) {
      if (!c) {
        if ((o.flags & 524288) !== 0) c = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var p = o.alternate;
        if (p === null) throw Error(s(387));
        if (p = p.memoizedProps, p !== null) {
          var S = o.type;
          Lt(o.pendingProps.value, p.value) || (e !== null ? e.push(S) : e = [S]);
        }
      } else if (o === Te.current) {
        if (p = o.alternate, p === null) throw Error(s(387));
        p.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Cr) : e = [Cr]);
      }
      o = o.return;
    }
    e !== null && Go(
      t,
      e,
      n,
      i
    ), t.flags |= 262144;
  }
  function Tl(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Lt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ua(e) {
    Ra = e, Nn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function bt(e) {
    return gf(Ra, e);
  }
  function Ml(e, t) {
    return Ra === null && Ua(e), gf(e, t);
  }
  function gf(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Nn === null) {
      if (e === null) throw Error(s(308));
      Nn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Nn = Nn.next = t;
    return n;
  }
  var pv = typeof AbortController < "u" ? AbortController : function() {
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
  }, mv = a.unstable_scheduleCallback, hv = a.unstable_NormalPriority, lt = {
    $$typeof: I,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function qo() {
    return {
      controller: new pv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function sr(e) {
    e.refCount--, e.refCount === 0 && mv(hv, function() {
      e.controller.abort();
    });
  }
  var or = null, Io = 0, hi = 0, yi = null;
  function yv(e, t) {
    if (or === null) {
      var n = or = [];
      Io = 0, hi = Xc(), yi = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return Io++, t.then(vf, vf), t;
  }
  function vf() {
    if (--Io === 0 && or !== null) {
      yi !== null && (yi.status = "fulfilled");
      var e = or;
      or = null, hi = 0, yi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function gv(e, t) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(o) {
        n.push(o);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var o = 0; o < n.length; o++) (0, n[o])(t);
      },
      function(o) {
        for (i.status = "rejected", i.reason = o, o = 0; o < n.length; o++)
          (0, n[o])(void 0);
      }
    ), i;
  }
  var bf = D.S;
  D.S = function(e, t) {
    nm = xt(), typeof t == "object" && t !== null && typeof t.then == "function" && yv(e, t), bf !== null && bf(e, t);
  };
  var La = E(null);
  function Ko() {
    var e = La.current;
    return e !== null ? e : Ye.pooledCache;
  }
  function Dl(e, t) {
    t === null ? W(La, La.current) : W(La, t.pool);
  }
  function Sf() {
    var e = Ko();
    return e === null ? null : { parent: lt._currentValue, pool: e };
  }
  var gi = Error(s(460)), Yo = Error(s(474)), Ol = Error(s(542)), Cl = { then: function() {
  } };
  function _f(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Ef(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(_n, _n), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, xf(e), e;
      default:
        if (typeof t.status == "string") t.then(_n, _n);
        else {
          if (e = Ye, e !== null && 100 < e.shellSuspendCounter)
            throw Error(s(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "fulfilled", o.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "rejected", o.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, xf(e), e;
        }
        throw Ba = t, gi;
    }
  }
  function Va(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Ba = n, gi) : n;
    }
  }
  var Ba = null;
  function Af() {
    if (Ba === null) throw Error(s(459));
    var e = Ba;
    return Ba = null, e;
  }
  function xf(e) {
    if (e === gi || e === Ol)
      throw Error(s(483));
  }
  var vi = null, cr = 0;
  function zl(e) {
    var t = cr;
    return cr += 1, vi === null && (vi = []), Ef(vi, e, t);
  }
  function ur(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function Rl(e, t) {
    throw t.$$typeof === _ ? Error(s(525)) : (e = Object.prototype.toString.call(t), Error(
      s(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function Nf(e) {
    function t(w, j) {
      if (e) {
        var M = w.deletions;
        M === null ? (w.deletions = [j], w.flags |= 16) : M.push(j);
      }
    }
    function n(w, j) {
      if (!e) return null;
      for (; j !== null; )
        t(w, j), j = j.sibling;
      return null;
    }
    function i(w) {
      for (var j = /* @__PURE__ */ new Map(); w !== null; )
        w.key !== null ? j.set(w.key, w) : j.set(w.index, w), w = w.sibling;
      return j;
    }
    function o(w, j) {
      return w = An(w, j), w.index = 0, w.sibling = null, w;
    }
    function c(w, j, M) {
      return w.index = M, e ? (M = w.alternate, M !== null ? (M = M.index, M < j ? (w.flags |= 67108866, j) : M) : (w.flags |= 67108866, j)) : (w.flags |= 1048576, j);
    }
    function p(w) {
      return e && w.alternate === null && (w.flags |= 67108866), w;
    }
    function S(w, j, M, G) {
      return j === null || j.tag !== 6 ? (j = Co(M, w.mode, G), j.return = w, j) : (j = o(j, M), j.return = w, j);
    }
    function x(w, j, M, G) {
      var ce = M.type;
      return ce === A ? B(
        w,
        j,
        M.props.children,
        G,
        M.key
      ) : j !== null && (j.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === se && Va(ce) === j.type) ? (j = o(j, M.props), ur(j, M), j.return = w, j) : (j = wl(
        M.type,
        M.key,
        M.props,
        null,
        w.mode,
        G
      ), ur(j, M), j.return = w, j);
    }
    function O(w, j, M, G) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== M.containerInfo || j.stateNode.implementation !== M.implementation ? (j = zo(M, w.mode, G), j.return = w, j) : (j = o(j, M.children || []), j.return = w, j);
    }
    function B(w, j, M, G, ce) {
      return j === null || j.tag !== 7 ? (j = Ca(
        M,
        w.mode,
        G,
        ce
      ), j.return = w, j) : (j = o(j, M), j.return = w, j);
    }
    function q(w, j, M) {
      if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
        return j = Co(
          "" + j,
          w.mode,
          M
        ), j.return = w, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case N:
            return M = wl(
              j.type,
              j.key,
              j.props,
              null,
              w.mode,
              M
            ), ur(M, j), M.return = w, M;
          case z:
            return j = zo(
              j,
              w.mode,
              M
            ), j.return = w, j;
          case se:
            return j = Va(j), q(w, j, M);
        }
        if (be(j) || oe(j))
          return j = Ca(
            j,
            w.mode,
            M,
            null
          ), j.return = w, j;
        if (typeof j.then == "function")
          return q(w, zl(j), M);
        if (j.$$typeof === I)
          return q(
            w,
            Ml(w, j),
            M
          );
        Rl(w, j);
      }
      return null;
    }
    function C(w, j, M, G) {
      var ce = j !== null ? j.key : null;
      if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
        return ce !== null ? null : S(w, j, "" + M, G);
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case N:
            return M.key === ce ? x(w, j, M, G) : null;
          case z:
            return M.key === ce ? O(w, j, M, G) : null;
          case se:
            return M = Va(M), C(w, j, M, G);
        }
        if (be(M) || oe(M))
          return ce !== null ? null : B(w, j, M, G, null);
        if (typeof M.then == "function")
          return C(
            w,
            j,
            zl(M),
            G
          );
        if (M.$$typeof === I)
          return C(
            w,
            j,
            Ml(w, M),
            G
          );
        Rl(w, M);
      }
      return null;
    }
    function U(w, j, M, G, ce) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return w = w.get(M) || null, S(j, w, "" + G, ce);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case N:
            return w = w.get(
              G.key === null ? M : G.key
            ) || null, x(j, w, G, ce);
          case z:
            return w = w.get(
              G.key === null ? M : G.key
            ) || null, O(j, w, G, ce);
          case se:
            return G = Va(G), U(
              w,
              j,
              M,
              G,
              ce
            );
        }
        if (be(G) || oe(G))
          return w = w.get(M) || null, B(j, w, G, ce, null);
        if (typeof G.then == "function")
          return U(
            w,
            j,
            M,
            zl(G),
            ce
          );
        if (G.$$typeof === I)
          return U(
            w,
            j,
            M,
            Ml(j, G),
            ce
          );
        Rl(j, G);
      }
      return null;
    }
    function ie(w, j, M, G) {
      for (var ce = null, Oe = null, le = j, Ee = j = 0, we = null; le !== null && Ee < M.length; Ee++) {
        le.index > Ee ? (we = le, le = null) : we = le.sibling;
        var Ce = C(
          w,
          le,
          M[Ee],
          G
        );
        if (Ce === null) {
          le === null && (le = we);
          break;
        }
        e && le && Ce.alternate === null && t(w, le), j = c(Ce, j, Ee), Oe === null ? ce = Ce : Oe.sibling = Ce, Oe = Ce, le = we;
      }
      if (Ee === M.length)
        return n(w, le), $e && xn(w, Ee), ce;
      if (le === null) {
        for (; Ee < M.length; Ee++)
          le = q(w, M[Ee], G), le !== null && (j = c(
            le,
            j,
            Ee
          ), Oe === null ? ce = le : Oe.sibling = le, Oe = le);
        return $e && xn(w, Ee), ce;
      }
      for (le = i(le); Ee < M.length; Ee++)
        we = U(
          le,
          w,
          Ee,
          M[Ee],
          G
        ), we !== null && (e && we.alternate !== null && le.delete(
          we.key === null ? Ee : we.key
        ), j = c(
          we,
          j,
          Ee
        ), Oe === null ? ce = we : Oe.sibling = we, Oe = we);
      return e && le.forEach(function(ga) {
        return t(w, ga);
      }), $e && xn(w, Ee), ce;
    }
    function fe(w, j, M, G) {
      if (M == null) throw Error(s(151));
      for (var ce = null, Oe = null, le = j, Ee = j = 0, we = null, Ce = M.next(); le !== null && !Ce.done; Ee++, Ce = M.next()) {
        le.index > Ee ? (we = le, le = null) : we = le.sibling;
        var ga = C(w, le, Ce.value, G);
        if (ga === null) {
          le === null && (le = we);
          break;
        }
        e && le && ga.alternate === null && t(w, le), j = c(ga, j, Ee), Oe === null ? ce = ga : Oe.sibling = ga, Oe = ga, le = we;
      }
      if (Ce.done)
        return n(w, le), $e && xn(w, Ee), ce;
      if (le === null) {
        for (; !Ce.done; Ee++, Ce = M.next())
          Ce = q(w, Ce.value, G), Ce !== null && (j = c(Ce, j, Ee), Oe === null ? ce = Ce : Oe.sibling = Ce, Oe = Ce);
        return $e && xn(w, Ee), ce;
      }
      for (le = i(le); !Ce.done; Ee++, Ce = M.next())
        Ce = U(le, w, Ee, Ce.value, G), Ce !== null && (e && Ce.alternate !== null && le.delete(Ce.key === null ? Ee : Ce.key), j = c(Ce, j, Ee), Oe === null ? ce = Ce : Oe.sibling = Ce, Oe = Ce);
      return e && le.forEach(function($b) {
        return t(w, $b);
      }), $e && xn(w, Ee), ce;
    }
    function qe(w, j, M, G) {
      if (typeof M == "object" && M !== null && M.type === A && M.key === null && (M = M.props.children), typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case N:
            e: {
              for (var ce = M.key; j !== null; ) {
                if (j.key === ce) {
                  if (ce = M.type, ce === A) {
                    if (j.tag === 7) {
                      n(
                        w,
                        j.sibling
                      ), G = o(
                        j,
                        M.props.children
                      ), G.return = w, w = G;
                      break e;
                    }
                  } else if (j.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === se && Va(ce) === j.type) {
                    n(
                      w,
                      j.sibling
                    ), G = o(j, M.props), ur(G, M), G.return = w, w = G;
                    break e;
                  }
                  n(w, j);
                  break;
                } else t(w, j);
                j = j.sibling;
              }
              M.type === A ? (G = Ca(
                M.props.children,
                w.mode,
                G,
                M.key
              ), G.return = w, w = G) : (G = wl(
                M.type,
                M.key,
                M.props,
                null,
                w.mode,
                G
              ), ur(G, M), G.return = w, w = G);
            }
            return p(w);
          case z:
            e: {
              for (ce = M.key; j !== null; ) {
                if (j.key === ce)
                  if (j.tag === 4 && j.stateNode.containerInfo === M.containerInfo && j.stateNode.implementation === M.implementation) {
                    n(
                      w,
                      j.sibling
                    ), G = o(j, M.children || []), G.return = w, w = G;
                    break e;
                  } else {
                    n(w, j);
                    break;
                  }
                else t(w, j);
                j = j.sibling;
              }
              G = zo(M, w.mode, G), G.return = w, w = G;
            }
            return p(w);
          case se:
            return M = Va(M), qe(
              w,
              j,
              M,
              G
            );
        }
        if (be(M))
          return ie(
            w,
            j,
            M,
            G
          );
        if (oe(M)) {
          if (ce = oe(M), typeof ce != "function") throw Error(s(150));
          return M = ce.call(M), fe(
            w,
            j,
            M,
            G
          );
        }
        if (typeof M.then == "function")
          return qe(
            w,
            j,
            zl(M),
            G
          );
        if (M.$$typeof === I)
          return qe(
            w,
            j,
            Ml(w, M),
            G
          );
        Rl(w, M);
      }
      return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (M = "" + M, j !== null && j.tag === 6 ? (n(w, j.sibling), G = o(j, M), G.return = w, w = G) : (n(w, j), G = Co(M, w.mode, G), G.return = w, w = G), p(w)) : n(w, j);
    }
    return function(w, j, M, G) {
      try {
        cr = 0;
        var ce = qe(
          w,
          j,
          M,
          G
        );
        return vi = null, ce;
      } catch (le) {
        if (le === gi || le === Ol) throw le;
        var Oe = Vt(29, le, null, w.mode);
        return Oe.lanes = G, Oe.return = w, Oe;
      } finally {
      }
    };
  }
  var Ha = Nf(!0), jf = Nf(!1), ea = !1;
  function Xo(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function ko(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ta(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function na(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (ze & 2) !== 0) {
      var o = i.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = jl(e), cf(e, null, n), t;
    }
    return Nl(e, i, t, n), jl(e);
  }
  function dr(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, yd(e, n);
    }
  }
  function Qo(e, t) {
    var n = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var o = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var p = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? o = c = p : c = c.next = p, n = n.next;
        } while (n !== null);
        c === null ? o = c = t : c = c.next = t;
      } else o = c = t;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Zo = !1;
  function fr() {
    if (Zo) {
      var e = yi;
      if (e !== null) throw e;
    }
  }
  function pr(e, t, n, i) {
    Zo = !1;
    var o = e.updateQueue;
    ea = !1;
    var c = o.firstBaseUpdate, p = o.lastBaseUpdate, S = o.shared.pending;
    if (S !== null) {
      o.shared.pending = null;
      var x = S, O = x.next;
      x.next = null, p === null ? c = O : p.next = O, p = x;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, S = B.lastBaseUpdate, S !== p && (S === null ? B.firstBaseUpdate = O : S.next = O, B.lastBaseUpdate = x));
    }
    if (c !== null) {
      var q = o.baseState;
      p = 0, B = O = x = null, S = c;
      do {
        var C = S.lane & -536870913, U = C !== S.lane;
        if (U ? (je & C) === C : (i & C) === C) {
          C !== 0 && C === hi && (Zo = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: S.tag,
            payload: S.payload,
            callback: null,
            next: null
          });
          e: {
            var ie = e, fe = S;
            C = t;
            var qe = n;
            switch (fe.tag) {
              case 1:
                if (ie = fe.payload, typeof ie == "function") {
                  q = ie.call(qe, q, C);
                  break e;
                }
                q = ie;
                break e;
              case 3:
                ie.flags = ie.flags & -65537 | 128;
              case 0:
                if (ie = fe.payload, C = typeof ie == "function" ? ie.call(qe, q, C) : ie, C == null) break e;
                q = g({}, q, C);
                break e;
              case 2:
                ea = !0;
            }
          }
          C = S.callback, C !== null && (e.flags |= 64, U && (e.flags |= 8192), U = o.callbacks, U === null ? o.callbacks = [C] : U.push(C));
        } else
          U = {
            lane: C,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null
          }, B === null ? (O = B = U, x = q) : B = B.next = U, p |= C;
        if (S = S.next, S === null) {
          if (S = o.shared.pending, S === null)
            break;
          U = S, S = U.next, U.next = null, o.lastBaseUpdate = U, o.shared.pending = null;
        }
      } while (!0);
      B === null && (x = q), o.baseState = x, o.firstBaseUpdate = O, o.lastBaseUpdate = B, c === null && (o.shared.lanes = 0), sa |= p, e.lanes = p, e.memoizedState = q;
    }
  }
  function wf(e, t) {
    if (typeof e != "function")
      throw Error(s(191, e));
    e.call(t);
  }
  function $f(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        wf(n[e], t);
  }
  var bi = E(null), Ul = E(0);
  function Tf(e, t) {
    e = Rn, W(Ul, e), W(bi, t), Rn = e | t.baseLanes;
  }
  function Jo() {
    W(Ul, Rn), W(bi, bi.current);
  }
  function Fo() {
    Rn = Ul.current, L(bi), L(Ul);
  }
  var Bt = E(null), Ft = null;
  function aa(e) {
    var t = e.alternate;
    W(at, at.current & 1), W(Bt, e), Ft === null && (t === null || bi.current !== null || t.memoizedState !== null) && (Ft = e);
  }
  function Wo(e) {
    W(at, at.current), W(Bt, e), Ft === null && (Ft = e);
  }
  function Mf(e) {
    e.tag === 22 ? (W(at, at.current), W(Bt, e), Ft === null && (Ft = e)) : ia();
  }
  function ia() {
    W(at, at.current), W(Bt, Bt.current);
  }
  function Ht(e) {
    L(Bt), Ft === e && (Ft = null), L(at);
  }
  var at = E(0);
  function Ll(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || iu(n) || ru(n)))
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
  var wn = 0, _e = null, He = null, st = null, Vl = !1, Si = !1, Ga = !1, Bl = 0, mr = 0, _i = null, vv = 0;
  function et() {
    throw Error(s(321));
  }
  function Po(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Lt(e[n], t[n])) return !1;
    return !0;
  }
  function ec(e, t, n, i, o, c) {
    return wn = c, _e = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, D.H = e === null || e.memoizedState === null ? pp : hc, Ga = !1, c = n(i, o), Ga = !1, Si && (c = Of(
      t,
      n,
      i,
      o
    )), Df(e), c;
  }
  function Df(e) {
    D.H = gr;
    var t = He !== null && He.next !== null;
    if (wn = 0, st = He = _e = null, Vl = !1, mr = 0, _i = null, t) throw Error(s(300));
    e === null || ot || (e = e.dependencies, e !== null && Tl(e) && (ot = !0));
  }
  function Of(e, t, n, i) {
    _e = e;
    var o = 0;
    do {
      if (Si && (_i = null), mr = 0, Si = !1, 25 <= o) throw Error(s(301));
      if (o += 1, st = He = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      D.H = mp, c = t(n, i);
    } while (Si);
    return c;
  }
  function bv() {
    var e = D.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? hr(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (_e.flags |= 1024), t;
  }
  function tc() {
    var e = Bl !== 0;
    return Bl = 0, e;
  }
  function nc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function ac(e) {
    if (Vl) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Vl = !1;
    }
    wn = 0, st = He = _e = null, Si = !1, mr = Bl = 0, _i = null;
  }
  function jt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return st === null ? _e.memoizedState = st = e : st = st.next = e, st;
  }
  function it() {
    if (He === null) {
      var e = _e.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = He.next;
    var t = st === null ? _e.memoizedState : st.next;
    if (t !== null)
      st = t, He = e;
    else {
      if (e === null)
        throw _e.alternate === null ? Error(s(467)) : Error(s(310));
      He = e, e = {
        memoizedState: He.memoizedState,
        baseState: He.baseState,
        baseQueue: He.baseQueue,
        queue: He.queue,
        next: null
      }, st === null ? _e.memoizedState = st = e : st = st.next = e;
    }
    return st;
  }
  function Hl() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function hr(e) {
    var t = mr;
    return mr += 1, _i === null && (_i = []), e = Ef(_i, e, t), t = _e, (st === null ? t.memoizedState : st.next) === null && (t = t.alternate, D.H = t === null || t.memoizedState === null ? pp : hc), e;
  }
  function Gl(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return hr(e);
      if (e.$$typeof === I) return bt(e);
    }
    throw Error(s(438, String(e)));
  }
  function ic(e) {
    var t = null, n = _e.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = _e.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(o) {
          return o.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = Hl(), _e.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
        n[i] = Y;
    return t.index++, n;
  }
  function $n(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ql(e) {
    var t = it();
    return rc(t, He, e);
  }
  function rc(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = n;
    var o = e.baseQueue, c = i.pending;
    if (c !== null) {
      if (o !== null) {
        var p = o.next;
        o.next = c.next, c.next = p;
      }
      t.baseQueue = o = c, i.pending = null;
    }
    if (c = e.baseState, o === null) e.memoizedState = c;
    else {
      t = o.next;
      var S = p = null, x = null, O = t, B = !1;
      do {
        var q = O.lane & -536870913;
        if (q !== O.lane ? (je & q) === q : (wn & q) === q) {
          var C = O.revertLane;
          if (C === 0)
            x !== null && (x = x.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }), q === hi && (B = !0);
          else if ((wn & C) === C) {
            O = O.next, C === hi && (B = !0);
            continue;
          } else
            q = {
              lane: 0,
              revertLane: O.revertLane,
              gesture: null,
              action: O.action,
              hasEagerState: O.hasEagerState,
              eagerState: O.eagerState,
              next: null
            }, x === null ? (S = x = q, p = c) : x = x.next = q, _e.lanes |= C, sa |= C;
          q = O.action, Ga && n(c, q), c = O.hasEagerState ? O.eagerState : n(c, q);
        } else
          C = {
            lane: q,
            revertLane: O.revertLane,
            gesture: O.gesture,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          }, x === null ? (S = x = C, p = c) : x = x.next = C, _e.lanes |= q, sa |= q;
        O = O.next;
      } while (O !== null && O !== t);
      if (x === null ? p = c : x.next = S, !Lt(c, e.memoizedState) && (ot = !0, B && (n = yi, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = p, e.baseQueue = x, i.lastRenderedState = c;
    }
    return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function lc(e) {
    var t = it(), n = t.queue;
    if (n === null) throw Error(s(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, o = n.pending, c = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var p = o = o.next;
      do
        c = e(c, p.action), p = p.next;
      while (p !== o);
      Lt(c, t.memoizedState) || (ot = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, i];
  }
  function Cf(e, t, n) {
    var i = _e, o = it(), c = $e;
    if (c) {
      if (n === void 0) throw Error(s(407));
      n = n();
    } else n = t();
    var p = !Lt(
      (He || o).memoizedState,
      n
    );
    if (p && (o.memoizedState = n, ot = !0), o = o.queue, cc(Uf.bind(null, i, o, e), [
      e
    ]), o.getSnapshot !== t || p || st !== null && st.memoizedState.tag & 1) {
      if (i.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        Rf.bind(
          null,
          i,
          o,
          n,
          t
        ),
        null
      ), Ye === null) throw Error(s(349));
      c || (wn & 127) !== 0 || zf(i, t, n);
    }
    return n;
  }
  function zf(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = _e.updateQueue, t === null ? (t = Hl(), _e.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Rf(e, t, n, i) {
    t.value = n, t.getSnapshot = i, Lf(t) && Vf(e);
  }
  function Uf(e, t, n) {
    return n(function() {
      Lf(t) && Vf(e);
    });
  }
  function Lf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Lt(e, n);
    } catch {
      return !0;
    }
  }
  function Vf(e) {
    var t = Oa(e, 2);
    t !== null && Rt(t, e, 2);
  }
  function sc(e) {
    var t = jt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Ga) {
        an(!0);
        try {
          n();
        } finally {
          an(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $n,
      lastRenderedState: e
    }, t;
  }
  function Bf(e, t, n, i) {
    return e.baseState = n, rc(
      e,
      He,
      typeof i == "function" ? i : $n
    );
  }
  function Sv(e, t, n, i, o) {
    if (Yl(e)) throw Error(s(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(p) {
          c.listeners.push(p);
        }
      };
      D.T !== null ? n(!0) : c.isTransition = !1, i(c), n = t.pending, n === null ? (c.next = t.pending = c, Hf(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function Hf(e, t) {
    var n = t.action, i = t.payload, o = e.state;
    if (t.isTransition) {
      var c = D.T, p = {};
      D.T = p;
      try {
        var S = n(o, i), x = D.S;
        x !== null && x(p, S), Gf(e, t, S);
      } catch (O) {
        oc(e, t, O);
      } finally {
        c !== null && p.types !== null && (c.types = p.types), D.T = c;
      }
    } else
      try {
        c = n(o, i), Gf(e, t, c);
      } catch (O) {
        oc(e, t, O);
      }
  }
  function Gf(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        qf(e, t, i);
      },
      function(i) {
        return oc(e, t, i);
      }
    ) : qf(e, t, n);
  }
  function qf(e, t, n) {
    t.status = "fulfilled", t.value = n, If(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Hf(e, n)));
  }
  function oc(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, If(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function If(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Kf(e, t) {
    return t;
  }
  function Yf(e, t) {
    if ($e) {
      var n = Ye.formState;
      if (n !== null) {
        e: {
          var i = _e;
          if ($e) {
            if (Qe) {
              t: {
                for (var o = Qe, c = Jt; o.nodeType !== 8; ) {
                  if (!c) {
                    o = null;
                    break t;
                  }
                  if (o = Wt(
                    o.nextSibling
                  ), o === null) {
                    o = null;
                    break t;
                  }
                }
                c = o.data, o = c === "F!" || c === "F" ? o : null;
              }
              if (o) {
                Qe = Wt(
                  o.nextSibling
                ), i = o.data === "F!";
                break e;
              }
            }
            Wn(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return n = jt(), n.memoizedState = n.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Kf,
      lastRenderedState: t
    }, n.queue = i, n = up.bind(
      null,
      _e,
      i
    ), i.dispatch = n, i = sc(!1), c = mc.bind(
      null,
      _e,
      !1,
      i.queue
    ), i = jt(), o = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = o, n = Sv.bind(
      null,
      _e,
      o,
      c,
      n
    ), o.dispatch = n, i.memoizedState = e, [t, n, !1];
  }
  function Xf(e) {
    var t = it();
    return kf(t, He, e);
  }
  function kf(e, t, n) {
    if (t = rc(
      e,
      t,
      Kf
    )[0], e = ql($n)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = hr(t);
      } catch (p) {
        throw p === gi ? Ol : p;
      }
    else i = t;
    t = it();
    var o = t.queue, c = o.dispatch;
    return n !== t.memoizedState && (_e.flags |= 2048, Ei(
      9,
      { destroy: void 0 },
      _v.bind(null, o, n),
      null
    )), [i, c, e];
  }
  function _v(e, t) {
    e.action = t;
  }
  function Qf(e) {
    var t = it(), n = He;
    if (n !== null)
      return kf(t, n, e);
    it(), t = t.memoizedState, n = it();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, !1];
  }
  function Ei(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = _e.updateQueue, t === null && (t = Hl(), _e.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Zf() {
    return it().memoizedState;
  }
  function Il(e, t, n, i) {
    var o = jt();
    _e.flags |= e, o.memoizedState = Ei(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function Kl(e, t, n, i) {
    var o = it();
    i = i === void 0 ? null : i;
    var c = o.memoizedState.inst;
    He !== null && i !== null && Po(i, He.memoizedState.deps) ? o.memoizedState = Ei(t, c, n, i) : (_e.flags |= e, o.memoizedState = Ei(
      1 | t,
      c,
      n,
      i
    ));
  }
  function Jf(e, t) {
    Il(8390656, 8, e, t);
  }
  function cc(e, t) {
    Kl(2048, 8, e, t);
  }
  function Ev(e) {
    _e.flags |= 4;
    var t = _e.updateQueue;
    if (t === null)
      t = Hl(), _e.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Ff(e) {
    var t = it().memoizedState;
    return Ev({ ref: t, nextImpl: e }), function() {
      if ((ze & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Wf(e, t) {
    return Kl(4, 2, e, t);
  }
  function Pf(e, t) {
    return Kl(4, 4, e, t);
  }
  function ep(e, t) {
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
  function tp(e, t, n) {
    n = n != null ? n.concat([e]) : null, Kl(4, 4, ep.bind(null, t, e), n);
  }
  function uc() {
  }
  function np(e, t) {
    var n = it();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && Po(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function ap(e, t) {
    var n = it();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && Po(t, i[1]))
      return i[0];
    if (i = e(), Ga) {
      an(!0);
      try {
        e();
      } finally {
        an(!1);
      }
    }
    return n.memoizedState = [i, t], i;
  }
  function dc(e, t, n) {
    return n === void 0 || (wn & 1073741824) !== 0 && (je & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = im(), _e.lanes |= e, sa |= e, n);
  }
  function ip(e, t, n, i) {
    return Lt(n, t) ? n : bi.current !== null ? (e = dc(e, n, i), Lt(e, t) || (ot = !0), e) : (wn & 42) === 0 || (wn & 1073741824) !== 0 && (je & 261930) === 0 ? (ot = !0, e.memoizedState = n) : (e = im(), _e.lanes |= e, sa |= e, t);
  }
  function rp(e, t, n, i, o) {
    var c = k.p;
    k.p = c !== 0 && 8 > c ? c : 8;
    var p = D.T, S = {};
    D.T = S, mc(e, !1, t, n);
    try {
      var x = o(), O = D.S;
      if (O !== null && O(S, x), x !== null && typeof x == "object" && typeof x.then == "function") {
        var B = gv(
          x,
          i
        );
        yr(
          e,
          t,
          B,
          It(e)
        );
      } else
        yr(
          e,
          t,
          i,
          It(e)
        );
    } catch (q) {
      yr(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: q },
        It()
      );
    } finally {
      k.p = c, p !== null && S.types !== null && (p.types = S.types), D.T = p;
    }
  }
  function Av() {
  }
  function fc(e, t, n, i) {
    if (e.tag !== 5) throw Error(s(476));
    var o = lp(e).queue;
    rp(
      e,
      o,
      t,
      $,
      n === null ? Av : function() {
        return sp(e), n(i);
      }
    );
  }
  function lp(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $n,
        lastRenderedState: $
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
        lastRenderedReducer: $n,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function sp(e) {
    var t = lp(e);
    t.next === null && (t = e.alternate.memoizedState), yr(
      e,
      t.next.queue,
      {},
      It()
    );
  }
  function pc() {
    return bt(Cr);
  }
  function op() {
    return it().memoizedState;
  }
  function cp() {
    return it().memoizedState;
  }
  function xv(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = It();
          e = ta(n);
          var i = na(t, e, n);
          i !== null && (Rt(i, t, n), dr(i, t, n)), t = { cache: qo() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function Nv(e, t, n) {
    var i = It();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yl(e) ? dp(t, n) : (n = Do(e, t, n, i), n !== null && (Rt(n, e, i), fp(n, t, i)));
  }
  function up(e, t, n) {
    var i = It();
    yr(e, t, n, i);
  }
  function yr(e, t, n, i) {
    var o = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Yl(e)) dp(t, o);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var p = t.lastRenderedState, S = c(p, n);
          if (o.hasEagerState = !0, o.eagerState = S, Lt(S, p))
            return Nl(e, t, o, 0), Ye === null && xl(), !1;
        } catch {
        } finally {
        }
      if (n = Do(e, t, o, i), n !== null)
        return Rt(n, e, i), fp(n, t, i), !0;
    }
    return !1;
  }
  function mc(e, t, n, i) {
    if (i = {
      lane: 2,
      revertLane: Xc(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Yl(e)) {
      if (t) throw Error(s(479));
    } else
      t = Do(
        e,
        n,
        i,
        2
      ), t !== null && Rt(t, e, 2);
  }
  function Yl(e) {
    var t = e.alternate;
    return e === _e || t !== null && t === _e;
  }
  function dp(e, t) {
    Si = Vl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function fp(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, yd(e, n);
    }
  }
  var gr = {
    readContext: bt,
    use: Gl,
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
  gr.useEffectEvent = et;
  var pp = {
    readContext: bt,
    use: Gl,
    useCallback: function(e, t) {
      return jt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: bt,
    useEffect: Jf,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Il(
        4194308,
        4,
        ep.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Il(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Il(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = jt();
      t = t === void 0 ? null : t;
      var i = e();
      if (Ga) {
        an(!0);
        try {
          e();
        } finally {
          an(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, n) {
      var i = jt();
      if (n !== void 0) {
        var o = n(t);
        if (Ga) {
          an(!0);
          try {
            n(t);
          } finally {
            an(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = Nv.bind(
        null,
        _e,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = jt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = sc(e);
      var t = e.queue, n = up.bind(null, _e, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: uc,
    useDeferredValue: function(e, t) {
      var n = jt();
      return dc(n, e, t);
    },
    useTransition: function() {
      var e = sc(!1);
      return e = rp.bind(
        null,
        _e,
        e.queue,
        !0,
        !1
      ), jt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var i = _e, o = jt();
      if ($e) {
        if (n === void 0)
          throw Error(s(407));
        n = n();
      } else {
        if (n = t(), Ye === null)
          throw Error(s(349));
        (je & 127) !== 0 || zf(i, t, n);
      }
      o.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return o.queue = c, Jf(Uf.bind(null, i, c, e), [
        e
      ]), i.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        Rf.bind(
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
      var e = jt(), t = Ye.identifierPrefix;
      if ($e) {
        var n = pn, i = fn;
        n = (i & ~(1 << 32 - Ke(i) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Bl++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = vv++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: pc,
    useFormState: Yf,
    useActionState: Yf,
    useOptimistic: function(e) {
      var t = jt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = mc.bind(
        null,
        _e,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: ic,
    useCacheRefresh: function() {
      return jt().memoizedState = xv.bind(
        null,
        _e
      );
    },
    useEffectEvent: function(e) {
      var t = jt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((ze & 2) !== 0)
          throw Error(s(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, hc = {
    readContext: bt,
    use: Gl,
    useCallback: np,
    useContext: bt,
    useEffect: cc,
    useImperativeHandle: tp,
    useInsertionEffect: Wf,
    useLayoutEffect: Pf,
    useMemo: ap,
    useReducer: ql,
    useRef: Zf,
    useState: function() {
      return ql($n);
    },
    useDebugValue: uc,
    useDeferredValue: function(e, t) {
      var n = it();
      return ip(
        n,
        He.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ql($n)[0], t = it().memoizedState;
      return [
        typeof e == "boolean" ? e : hr(e),
        t
      ];
    },
    useSyncExternalStore: Cf,
    useId: op,
    useHostTransitionStatus: pc,
    useFormState: Xf,
    useActionState: Xf,
    useOptimistic: function(e, t) {
      var n = it();
      return Bf(n, He, e, t);
    },
    useMemoCache: ic,
    useCacheRefresh: cp
  };
  hc.useEffectEvent = Ff;
  var mp = {
    readContext: bt,
    use: Gl,
    useCallback: np,
    useContext: bt,
    useEffect: cc,
    useImperativeHandle: tp,
    useInsertionEffect: Wf,
    useLayoutEffect: Pf,
    useMemo: ap,
    useReducer: lc,
    useRef: Zf,
    useState: function() {
      return lc($n);
    },
    useDebugValue: uc,
    useDeferredValue: function(e, t) {
      var n = it();
      return He === null ? dc(n, e, t) : ip(
        n,
        He.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = lc($n)[0], t = it().memoizedState;
      return [
        typeof e == "boolean" ? e : hr(e),
        t
      ];
    },
    useSyncExternalStore: Cf,
    useId: op,
    useHostTransitionStatus: pc,
    useFormState: Qf,
    useActionState: Qf,
    useOptimistic: function(e, t) {
      var n = it();
      return He !== null ? Bf(n, He, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: ic,
    useCacheRefresh: cp
  };
  mp.useEffectEvent = Ff;
  function yc(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : g({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var gc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var i = It(), o = ta(i);
      o.payload = t, n != null && (o.callback = n), t = na(e, o, i), t !== null && (Rt(t, e, i), dr(t, e, i));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var i = It(), o = ta(i);
      o.tag = 1, o.payload = t, n != null && (o.callback = n), t = na(e, o, i), t !== null && (Rt(t, e, i), dr(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = It(), i = ta(n);
      i.tag = 2, t != null && (i.callback = t), t = na(e, i, n), t !== null && (Rt(t, e, n), dr(t, e, n));
    }
  };
  function hp(e, t, n, i, o, c, p) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, p) : t.prototype && t.prototype.isPureReactComponent ? !ar(n, i) || !ar(o, c) : !0;
  }
  function yp(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && gc.enqueueReplaceState(t, t.state, null);
  }
  function qa(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t)
        i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = g({}, n));
      for (var o in e)
        n[o] === void 0 && (n[o] = e[o]);
    }
    return n;
  }
  function gp(e) {
    Al(e);
  }
  function vp(e) {
    console.error(e);
  }
  function bp(e) {
    Al(e);
  }
  function Xl(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Sp(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function vc(e, t, n) {
    return n = ta(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Xl(e, t);
    }, n;
  }
  function _p(e) {
    return e = ta(e), e.tag = 3, e;
  }
  function Ep(e, t, n, i) {
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = i.value;
      e.payload = function() {
        return o(c);
      }, e.callback = function() {
        Sp(t, n, i);
      };
    }
    var p = n.stateNode;
    p !== null && typeof p.componentDidCatch == "function" && (e.callback = function() {
      Sp(t, n, i), typeof o != "function" && (oa === null ? oa = /* @__PURE__ */ new Set([this]) : oa.add(this));
      var S = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: S !== null ? S : ""
      });
    });
  }
  function jv(e, t, n, i, o) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = n.alternate, t !== null && mi(
        t,
        n,
        o,
        !0
      ), n = Bt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Ft === null ? is() : n.alternate === null && tt === 0 && (tt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = o, i === Cl ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Ic(e, i, o)), !1;
          case 22:
            return n.flags |= 65536, i === Cl ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Ic(e, i, o)), !1;
        }
        throw Error(s(435, n.tag));
      }
      return Ic(e, i, o), is(), !1;
    }
    if ($e)
      return t = Bt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Lo && (e = Error(s(422), { cause: i }), lr(kt(e, n)))) : (i !== Lo && (t = Error(s(423), {
        cause: i
      }), lr(
        kt(t, n)
      )), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = kt(i, n), o = vc(
        e.stateNode,
        i,
        o
      ), Qo(e, o), tt !== 4 && (tt = 2)), !1;
    var c = Error(s(520), { cause: i });
    if (c = kt(c, n), Nr === null ? Nr = [c] : Nr.push(c), tt !== 4 && (tt = 2), t === null) return !0;
    i = kt(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = o & -o, n.lanes |= e, e = vc(n.stateNode, i, e), Qo(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (oa === null || !oa.has(c))))
            return n.flags |= 65536, o &= -o, n.lanes |= o, o = _p(o), Ep(
              o,
              e,
              n,
              i
            ), Qo(n, o), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var bc = Error(s(461)), ot = !1;
  function St(e, t, n, i) {
    t.child = e === null ? jf(t, null, n, i) : Ha(
      t,
      e.child,
      n,
      i
    );
  }
  function Ap(e, t, n, i, o) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var p = {};
      for (var S in i)
        S !== "ref" && (p[S] = i[S]);
    } else p = i;
    return Ua(t), i = ec(
      e,
      t,
      n,
      p,
      c,
      o
    ), S = tc(), e !== null && !ot ? (nc(e, t, o), Tn(e, t, o)) : ($e && S && Ro(t), t.flags |= 1, St(e, t, i, o), t.child);
  }
  function xp(e, t, n, i, o) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !Oo(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, Np(
        e,
        t,
        c,
        i,
        o
      )) : (e = wl(
        n.type,
        null,
        i,
        t,
        t.mode,
        o
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !wc(e, o)) {
      var p = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : ar, n(p, i) && e.ref === t.ref)
        return Tn(e, t, o);
    }
    return t.flags |= 1, e = An(c, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function Np(e, t, n, i, o) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (ar(c, i) && e.ref === t.ref)
        if (ot = !1, t.pendingProps = i = c, wc(e, o))
          (e.flags & 131072) !== 0 && (ot = !0);
        else
          return t.lanes = e.lanes, Tn(e, t, o);
    }
    return Sc(
      e,
      t,
      n,
      i,
      o
    );
  }
  function jp(e, t, n, i) {
    var o = i.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (i = t.child = e.child, o = 0; i !== null; )
            o = o | i.lanes | i.childLanes, i = i.sibling;
          i = o & ~c;
        } else i = 0, t.child = null;
        return wp(
          e,
          t,
          c,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Dl(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Tf(t, c) : Jo(), Mf(t);
      else
        return i = t.lanes = 536870912, wp(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          i
        );
    } else
      c !== null ? (Dl(t, c.cachePool), Tf(t, c), ia(), t.memoizedState = null) : (e !== null && Dl(t, null), Jo(), ia());
    return St(e, t, o, n), t.child;
  }
  function vr(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function wp(e, t, n, i, o) {
    var c = Ko();
    return c = c === null ? null : { parent: lt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && Dl(t, null), Jo(), Mf(t), e !== null && mi(e, t, i, !0), t.childLanes = o, null;
  }
  function kl(e, t) {
    return t = Zl(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function $p(e, t, n) {
    return Ha(t, e.child, null, n), e = kl(t, t.pendingProps), e.flags |= 2, Ht(t), t.memoizedState = null, e;
  }
  function wv(e, t, n) {
    var i = t.pendingProps, o = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if ($e) {
        if (i.mode === "hidden")
          return e = kl(t, i), t.lanes = 536870912, vr(null, e);
        if (Wo(t), (e = Qe) ? (e = Hm(
          e,
          Jt
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Jn !== null ? { id: fn, overflow: pn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = df(e), n.return = t, t.child = n, vt = t, Qe = null)) : e = null, e === null) throw Wn(t);
        return t.lanes = 536870912, null;
      }
      return kl(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var p = c.dehydrated;
      if (Wo(t), o)
        if (t.flags & 256)
          t.flags &= -257, t = $p(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (ot || mi(e, t, n, !1), o = (n & e.childLanes) !== 0, ot || o) {
        if (i = Ye, i !== null && (p = gd(i, n), p !== 0 && p !== c.retryLane))
          throw c.retryLane = p, Oa(e, p), Rt(i, e, p), bc;
        is(), t = $p(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, Qe = Wt(p.nextSibling), vt = t, $e = !0, Fn = null, Jt = !1, e !== null && mf(t, e), t = kl(t, i), t.flags |= 4096;
      return t;
    }
    return e = An(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Ql(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(s(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Sc(e, t, n, i, o) {
    return Ua(t), n = ec(
      e,
      t,
      n,
      i,
      void 0,
      o
    ), i = tc(), e !== null && !ot ? (nc(e, t, o), Tn(e, t, o)) : ($e && i && Ro(t), t.flags |= 1, St(e, t, n, o), t.child);
  }
  function Tp(e, t, n, i, o, c) {
    return Ua(t), t.updateQueue = null, n = Of(
      t,
      i,
      n,
      o
    ), Df(e), i = tc(), e !== null && !ot ? (nc(e, t, c), Tn(e, t, c)) : ($e && i && Ro(t), t.flags |= 1, St(e, t, n, c), t.child);
  }
  function Mp(e, t, n, i, o) {
    if (Ua(t), t.stateNode === null) {
      var c = ui, p = n.contextType;
      typeof p == "object" && p !== null && (c = bt(p)), c = new n(i, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = gc, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = i, c.state = t.memoizedState, c.refs = {}, Xo(t), p = n.contextType, c.context = typeof p == "object" && p !== null ? bt(p) : ui, c.state = t.memoizedState, p = n.getDerivedStateFromProps, typeof p == "function" && (yc(
        t,
        n,
        p,
        i
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (p = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), p !== c.state && gc.enqueueReplaceState(c, c.state, null), pr(t, i, c, o), fr(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      c = t.stateNode;
      var S = t.memoizedProps, x = qa(n, S);
      c.props = x;
      var O = c.context, B = n.contextType;
      p = ui, typeof B == "object" && B !== null && (p = bt(B));
      var q = n.getDerivedStateFromProps;
      B = typeof q == "function" || typeof c.getSnapshotBeforeUpdate == "function", S = t.pendingProps !== S, B || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (S || O !== p) && yp(
        t,
        c,
        i,
        p
      ), ea = !1;
      var C = t.memoizedState;
      c.state = C, pr(t, i, c, o), fr(), O = t.memoizedState, S || C !== O || ea ? (typeof q == "function" && (yc(
        t,
        n,
        q,
        i
      ), O = t.memoizedState), (x = ea || hp(
        t,
        n,
        x,
        i,
        C,
        O,
        p
      )) ? (B || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = O), c.props = i, c.state = O, c.context = p, i = x) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      c = t.stateNode, ko(e, t), p = t.memoizedProps, B = qa(n, p), c.props = B, q = t.pendingProps, C = c.context, O = n.contextType, x = ui, typeof O == "object" && O !== null && (x = bt(O)), S = n.getDerivedStateFromProps, (O = typeof S == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (p !== q || C !== x) && yp(
        t,
        c,
        i,
        x
      ), ea = !1, C = t.memoizedState, c.state = C, pr(t, i, c, o), fr();
      var U = t.memoizedState;
      p !== q || C !== U || ea || e !== null && e.dependencies !== null && Tl(e.dependencies) ? (typeof S == "function" && (yc(
        t,
        n,
        S,
        i
      ), U = t.memoizedState), (B = ea || hp(
        t,
        n,
        B,
        i,
        C,
        U,
        x
      ) || e !== null && e.dependencies !== null && Tl(e.dependencies)) ? (O || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, U, x), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        i,
        U,
        x
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = U), c.props = i, c.state = U, c.context = x, i = B) : (typeof c.componentDidUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || p === e.memoizedProps && C === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return c = i, Ql(e, t), i = (t.flags & 128) !== 0, c || i ? (c = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && i ? (t.child = Ha(
      t,
      e.child,
      null,
      o
    ), t.child = Ha(
      t,
      null,
      n,
      o
    )) : St(e, t, n, o), t.memoizedState = c.state, e = t.child) : e = Tn(
      e,
      t,
      o
    ), e;
  }
  function Dp(e, t, n, i) {
    return za(), t.flags |= 256, St(e, t, n, i), t.child;
  }
  var _c = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Ec(e) {
    return { baseLanes: e, cachePool: Sf() };
  }
  function Ac(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= qt), e;
  }
  function Op(e, t, n) {
    var i = t.pendingProps, o = !1, c = (t.flags & 128) !== 0, p;
    if ((p = c) || (p = e !== null && e.memoizedState === null ? !1 : (at.current & 2) !== 0), p && (o = !0, t.flags &= -129), p = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if ($e) {
        if (o ? aa(t) : ia(), (e = Qe) ? (e = Hm(
          e,
          Jt
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Jn !== null ? { id: fn, overflow: pn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = df(e), n.return = t, t.child = n, vt = t, Qe = null)) : e = null, e === null) throw Wn(t);
        return ru(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var S = i.children;
      return i = i.fallback, o ? (ia(), o = t.mode, S = Zl(
        { mode: "hidden", children: S },
        o
      ), i = Ca(
        i,
        o,
        n,
        null
      ), S.return = t, i.return = t, S.sibling = i, t.child = S, i = t.child, i.memoizedState = Ec(n), i.childLanes = Ac(
        e,
        p,
        n
      ), t.memoizedState = _c, vr(null, i)) : (aa(t), xc(t, S));
    }
    var x = e.memoizedState;
    if (x !== null && (S = x.dehydrated, S !== null)) {
      if (c)
        t.flags & 256 ? (aa(t), t.flags &= -257, t = Nc(
          e,
          t,
          n
        )) : t.memoizedState !== null ? (ia(), t.child = e.child, t.flags |= 128, t = null) : (ia(), S = i.fallback, o = t.mode, i = Zl(
          { mode: "visible", children: i.children },
          o
        ), S = Ca(
          S,
          o,
          n,
          null
        ), S.flags |= 2, i.return = t, S.return = t, i.sibling = S, t.child = i, Ha(
          t,
          e.child,
          null,
          n
        ), i = t.child, i.memoizedState = Ec(n), i.childLanes = Ac(
          e,
          p,
          n
        ), t.memoizedState = _c, t = vr(null, i));
      else if (aa(t), ru(S)) {
        if (p = S.nextSibling && S.nextSibling.dataset, p) var O = p.dgst;
        p = O, i = Error(s(419)), i.stack = "", i.digest = p, lr({ value: i, source: null, stack: null }), t = Nc(
          e,
          t,
          n
        );
      } else if (ot || mi(e, t, n, !1), p = (n & e.childLanes) !== 0, ot || p) {
        if (p = Ye, p !== null && (i = gd(p, n), i !== 0 && i !== x.retryLane))
          throw x.retryLane = i, Oa(e, i), Rt(p, e, i), bc;
        iu(S) || is(), t = Nc(
          e,
          t,
          n
        );
      } else
        iu(S) ? (t.flags |= 192, t.child = e.child, t = null) : (e = x.treeContext, Qe = Wt(
          S.nextSibling
        ), vt = t, $e = !0, Fn = null, Jt = !1, e !== null && mf(t, e), t = xc(
          t,
          i.children
        ), t.flags |= 4096);
      return t;
    }
    return o ? (ia(), S = i.fallback, o = t.mode, x = e.child, O = x.sibling, i = An(x, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = x.subtreeFlags & 65011712, O !== null ? S = An(
      O,
      S
    ) : (S = Ca(
      S,
      o,
      n,
      null
    ), S.flags |= 2), S.return = t, i.return = t, i.sibling = S, t.child = i, vr(null, i), i = t.child, S = e.child.memoizedState, S === null ? S = Ec(n) : (o = S.cachePool, o !== null ? (x = lt._currentValue, o = o.parent !== x ? { parent: x, pool: x } : o) : o = Sf(), S = {
      baseLanes: S.baseLanes | n,
      cachePool: o
    }), i.memoizedState = S, i.childLanes = Ac(
      e,
      p,
      n
    ), t.memoizedState = _c, vr(e.child, i)) : (aa(t), n = e.child, e = n.sibling, n = An(n, {
      mode: "visible",
      children: i.children
    }), n.return = t, n.sibling = null, e !== null && (p = t.deletions, p === null ? (t.deletions = [e], t.flags |= 16) : p.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function xc(e, t) {
    return t = Zl(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Zl(e, t) {
    return e = Vt(22, e, null, t), e.lanes = 0, e;
  }
  function Nc(e, t, n) {
    return Ha(t, e.child, null, n), e = xc(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function Cp(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), Ho(e.return, t, n);
  }
  function jc(e, t, n, i, o, c) {
    var p = e.memoizedState;
    p === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: o,
      treeForkCount: c
    } : (p.isBackwards = t, p.rendering = null, p.renderingStartTime = 0, p.last = i, p.tail = n, p.tailMode = o, p.treeForkCount = c);
  }
  function zp(e, t, n) {
    var i = t.pendingProps, o = i.revealOrder, c = i.tail;
    i = i.children;
    var p = at.current, S = (p & 2) !== 0;
    if (S ? (p = p & 1 | 2, t.flags |= 128) : p &= 1, W(at, p), St(e, t, i, n), i = $e ? rr : 0, !S && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Cp(e, n, t);
        else if (e.tag === 19)
          Cp(e, n, t);
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
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          e = n.alternate, e !== null && Ll(e) === null && (o = n), n = n.sibling;
        n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), jc(
          t,
          !1,
          o,
          n,
          c,
          i
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (e = o.alternate, e !== null && Ll(e) === null) {
            t.child = o;
            break;
          }
          e = o.sibling, o.sibling = n, n = o, o = e;
        }
        jc(
          t,
          !0,
          n,
          null,
          c,
          i
        );
        break;
      case "together":
        jc(
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
  function Tn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), sa |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (mi(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (e = t.child, n = An(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = An(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function wc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Tl(e)));
  }
  function $v(e, t, n) {
    switch (t.tag) {
      case 3:
        dt(t, t.stateNode.containerInfo), Pn(t, lt, e.memoizedState.cache), za();
        break;
      case 27:
      case 5:
        dn(t);
        break;
      case 4:
        dt(t, t.stateNode.containerInfo);
        break;
      case 10:
        Pn(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Wo(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null)
          return i.dehydrated !== null ? (aa(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Op(e, t, n) : (aa(t), e = Tn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        aa(t);
        break;
      case 19:
        var o = (e.flags & 128) !== 0;
        if (i = (n & t.childLanes) !== 0, i || (mi(
          e,
          t,
          n,
          !1
        ), i = (n & t.childLanes) !== 0), o) {
          if (i)
            return zp(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), W(at, at.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, jp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Pn(t, lt, e.memoizedState.cache);
    }
    return Tn(e, t, n);
  }
  function Rp(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        ot = !0;
      else {
        if (!wc(e, n) && (t.flags & 128) === 0)
          return ot = !1, $v(
            e,
            t,
            n
          );
        ot = (e.flags & 131072) !== 0;
      }
    else
      ot = !1, $e && (t.flags & 1048576) !== 0 && pf(t, rr, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Va(t.elementType), t.type = e, typeof e == "function")
            Oo(e) ? (i = qa(e, i), t.tag = 1, t = Mp(
              null,
              t,
              e,
              i,
              n
            )) : (t.tag = 0, t = Sc(
              null,
              t,
              e,
              i,
              n
            ));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === ae) {
                t.tag = 11, t = Ap(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (o === V) {
                t.tag = 14, t = xp(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              }
            }
            throw t = re(e) || e, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return Sc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return i = t.type, o = qa(
          i,
          t.pendingProps
        ), Mp(
          e,
          t,
          i,
          o,
          n
        );
      case 3:
        e: {
          if (dt(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(s(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          o = c.element, ko(e, t), pr(t, i, null, n);
          var p = t.memoizedState;
          if (i = p.cache, Pn(t, lt, i), i !== c.cache && Go(
            t,
            [lt],
            n,
            !0
          ), fr(), i = p.element, c.isDehydrated)
            if (c = {
              element: i,
              isDehydrated: !1,
              cache: p.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Dp(
                e,
                t,
                i,
                n
              );
              break e;
            } else if (i !== o) {
              o = kt(
                Error(s(424)),
                t
              ), lr(o), t = Dp(
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
              for (Qe = Wt(e.firstChild), vt = t, $e = !0, Fn = null, Jt = !0, n = jf(
                t,
                null,
                i,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (za(), i === o) {
              t = Tn(
                e,
                t,
                n
              );
              break e;
            }
            St(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Ql(e, t), e === null ? (n = Xm(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : $e || (n = t.type, e = t.pendingProps, i = ds(
          Se.current
        ).createElement(n), i[gt] = t, i[Tt] = e, _t(i, n, e), mt(i), t.stateNode = i) : t.memoizedState = Xm(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return dn(t), e === null && $e && (i = t.stateNode = Im(
          t.type,
          t.pendingProps,
          Se.current
        ), vt = t, Jt = !0, o = Qe, fa(t.type) ? (lu = o, Qe = Wt(i.firstChild)) : Qe = o), St(
          e,
          t,
          t.pendingProps.children,
          n
        ), Ql(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && $e && ((o = i = Qe) && (i = ib(
          i,
          t.type,
          t.pendingProps,
          Jt
        ), i !== null ? (t.stateNode = i, vt = t, Qe = Wt(i.firstChild), Jt = !1, o = !0) : o = !1), o || Wn(t)), dn(t), o = t.type, c = t.pendingProps, p = e !== null ? e.memoizedProps : null, i = c.children, tu(o, c) ? i = null : p !== null && tu(o, p) && (t.flags |= 32), t.memoizedState !== null && (o = ec(
          e,
          t,
          bv,
          null,
          null,
          n
        ), Cr._currentValue = o), Ql(e, t), St(e, t, i, n), t.child;
      case 6:
        return e === null && $e && ((e = n = Qe) && (n = rb(
          n,
          t.pendingProps,
          Jt
        ), n !== null ? (t.stateNode = n, vt = t, Qe = null, e = !0) : e = !1), e || Wn(t)), null;
      case 13:
        return Op(e, t, n);
      case 4:
        return dt(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Ha(
          t,
          null,
          i,
          n
        ) : St(e, t, i, n), t.child;
      case 11:
        return Ap(
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
        return i = t.pendingProps, Pn(t, t.type, i.value), St(e, t, i.children, n), t.child;
      case 9:
        return o = t.type._context, i = t.pendingProps.children, Ua(t), o = bt(o), i = i(o), t.flags |= 1, St(e, t, i, n), t.child;
      case 14:
        return xp(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return Np(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return zp(e, t, n);
      case 31:
        return wv(e, t, n);
      case 22:
        return jp(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Ua(t), i = bt(lt), e === null ? (o = Ko(), o === null && (o = Ye, c = qo(), o.pooledCache = c, c.refCount++, c !== null && (o.pooledCacheLanes |= n), o = c), t.memoizedState = { parent: i, cache: o }, Xo(t), Pn(t, lt, o)) : ((e.lanes & n) !== 0 && (ko(e, t), pr(t, null, null, n), fr()), o = e.memoizedState, c = t.memoizedState, o.parent !== i ? (o = { parent: i, cache: i }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Pn(t, lt, i)) : (i = c.cache, Pn(t, lt, i), i !== o.cache && Go(
          t,
          [lt],
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
    throw Error(s(156, t.tag));
  }
  function Mn(e) {
    e.flags |= 4;
  }
  function $c(e, t, n, i, o) {
    if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
      if (e.flags |= 16777216, (o & 335544128) === o)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (om()) e.flags |= 8192;
        else
          throw Ba = Cl, Yo;
    } else e.flags &= -16777217;
  }
  function Up(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Fm(t))
      if (om()) e.flags |= 8192;
      else
        throw Ba = Cl, Yo;
  }
  function Jl(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? md() : 536870912, e.lanes |= t, ji |= t);
  }
  function br(e, t) {
    if (!$e)
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
  function Ze(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t)
      for (var o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function Tv(e, t, n) {
    var i = t.pendingProps;
    switch (Uo(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ze(t), null;
      case 1:
        return Ze(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), jn(lt), Xe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (pi(t) ? Mn(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Vo())), Ze(t), null;
      case 26:
        var o = t.type, c = t.memoizedState;
        return e === null ? (Mn(t), c !== null ? (Ze(t), Up(t, c)) : (Ze(t), $c(
          t,
          o,
          null,
          i,
          n
        ))) : c ? c !== e.memoizedState ? (Mn(t), Ze(t), Up(t, c)) : (Ze(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && Mn(t), Ze(t), $c(
          t,
          o,
          e,
          i,
          n
        )), null;
      case 27:
        if (bn(t), n = Se.current, o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Mn(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Ze(t), null;
          }
          e = ee.current, pi(t) ? hf(t) : (e = Im(o, i, n), t.stateNode = e, Mn(t));
        }
        return Ze(t), null;
      case 5:
        if (bn(t), o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && Mn(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Ze(t), null;
          }
          if (c = ee.current, pi(t))
            hf(t);
          else {
            var p = ds(
              Se.current
            );
            switch (c) {
              case 1:
                c = p.createElementNS(
                  "http://www.w3.org/2000/svg",
                  o
                );
                break;
              case 2:
                c = p.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  o
                );
                break;
              default:
                switch (o) {
                  case "svg":
                    c = p.createElementNS(
                      "http://www.w3.org/2000/svg",
                      o
                    );
                    break;
                  case "math":
                    c = p.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o
                    );
                    break;
                  case "script":
                    c = p.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof i.is == "string" ? p.createElement("select", {
                      is: i.is
                    }) : p.createElement("select"), i.multiple ? c.multiple = !0 : i.size && (c.size = i.size);
                    break;
                  default:
                    c = typeof i.is == "string" ? p.createElement(o, { is: i.is }) : p.createElement(o);
                }
            }
            c[gt] = t, c[Tt] = i;
            e: for (p = t.child; p !== null; ) {
              if (p.tag === 5 || p.tag === 6)
                c.appendChild(p.stateNode);
              else if (p.tag !== 4 && p.tag !== 27 && p.child !== null) {
                p.child.return = p, p = p.child;
                continue;
              }
              if (p === t) break e;
              for (; p.sibling === null; ) {
                if (p.return === null || p.return === t)
                  break e;
                p = p.return;
              }
              p.sibling.return = p.return, p = p.sibling;
            }
            t.stateNode = c;
            e: switch (_t(c, o, i), o) {
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
            i && Mn(t);
          }
        }
        return Ze(t), $c(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && Mn(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(s(166));
          if (e = Se.current, pi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, o = vt, o !== null)
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            e[gt] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || Om(e.nodeValue, n)), e || Wn(t, !0);
          } else
            e = ds(e).createTextNode(
              i
            ), e[gt] = t, t.stateNode = e;
        }
        return Ze(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = pi(t), n !== null) {
            if (e === null) {
              if (!i) throw Error(s(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(557));
              e[gt] = t;
            } else
              za(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), e = !1;
          } else
            n = Vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (Ht(t), t) : (Ht(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ze(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (o = pi(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(s(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(s(317));
              o[gt] = t;
            } else
              za(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Ze(t), o = !1;
          } else
            o = Vo(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
          if (!o)
            return t.flags & 256 ? (Ht(t), t) : (Ht(t), null);
        }
        return Ht(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), c = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (c = i.memoizedState.cachePool.pool), c !== o && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Jl(t, t.updateQueue), Ze(t), null);
      case 4:
        return Xe(), e === null && Jc(t.stateNode.containerInfo), Ze(t), null;
      case 10:
        return jn(t.type), Ze(t), null;
      case 19:
        if (L(at), i = t.memoizedState, i === null) return Ze(t), null;
        if (o = (t.flags & 128) !== 0, c = i.rendering, c === null)
          if (o) br(i, !1);
          else {
            if (tt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = Ll(e), c !== null) {
                  for (t.flags |= 128, br(i, !1), e = c.updateQueue, t.updateQueue = e, Jl(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    uf(n, e), n = n.sibling;
                  return W(
                    at,
                    at.current & 1 | 2
                  ), $e && xn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && xt() > ts && (t.flags |= 128, o = !0, br(i, !1), t.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = Ll(c), e !== null) {
              if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, Jl(t, e), br(i, !0), i.tail === null && i.tailMode === "hidden" && !c.alternate && !$e)
                return Ze(t), null;
            } else
              2 * xt() - i.renderingStartTime > ts && n !== 536870912 && (t.flags |= 128, o = !0, br(i, !1), t.lanes = 4194304);
          i.isBackwards ? (c.sibling = t.child, t.child = c) : (e = i.last, e !== null ? e.sibling = c : t.child = c, i.last = c);
        }
        return i.tail !== null ? (e = i.tail, i.rendering = e, i.tail = e.sibling, i.renderingStartTime = xt(), e.sibling = null, n = at.current, W(
          at,
          o ? n & 1 | 2 : n & 1
        ), $e && xn(t, i.treeForkCount), e) : (Ze(t), null);
      case 22:
      case 23:
        return Ht(t), Fo(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Ze(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ze(t), n = t.updateQueue, n !== null && Jl(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && L(La), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), jn(lt), Ze(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function Mv(e, t) {
    switch (Uo(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return jn(lt), Xe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return bn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (Ht(t), t.alternate === null)
            throw Error(s(340));
          za();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (Ht(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          za();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return L(at), null;
      case 4:
        return Xe(), null;
      case 10:
        return jn(t.type), null;
      case 22:
      case 23:
        return Ht(t), Fo(), e !== null && L(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return jn(lt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Lp(e, t) {
    switch (Uo(t), t.tag) {
      case 3:
        jn(lt), Xe();
        break;
      case 26:
      case 27:
      case 5:
        bn(t);
        break;
      case 4:
        Xe();
        break;
      case 31:
        t.memoizedState !== null && Ht(t);
        break;
      case 13:
        Ht(t);
        break;
      case 19:
        L(at);
        break;
      case 10:
        jn(t.type);
        break;
      case 22:
      case 23:
        Ht(t), Fo(), e !== null && L(La);
        break;
      case 24:
        jn(lt);
    }
  }
  function Sr(e, t) {
    try {
      var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var c = n.create, p = n.inst;
            i = c(), p.destroy = i;
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (S) {
      Le(t, t.return, S);
    }
  }
  function ra(e, t, n) {
    try {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var p = i.inst, S = p.destroy;
            if (S !== void 0) {
              p.destroy = void 0, o = t;
              var x = n, O = S;
              try {
                O();
              } catch (B) {
                Le(
                  o,
                  x,
                  B
                );
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (B) {
      Le(t, t.return, B);
    }
  }
  function Vp(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        $f(t, n);
      } catch (i) {
        Le(e, e.return, i);
      }
    }
  }
  function Bp(e, t, n) {
    n.props = qa(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Le(e, t, i);
    }
  }
  function _r(e, t) {
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
    } catch (o) {
      Le(e, t, o);
    }
  }
  function mn(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (o) {
          Le(e, t, o);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (o) {
          Le(e, t, o);
        }
      else n.current = null;
  }
  function Hp(e) {
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
    } catch (o) {
      Le(e, e.return, o);
    }
  }
  function Tc(e, t, n) {
    try {
      var i = e.stateNode;
      Wv(i, e.type, n, t), i[Tt] = t;
    } catch (o) {
      Le(e, e.return, o);
    }
  }
  function Gp(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && fa(e.type) || e.tag === 4;
  }
  function Mc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Gp(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && fa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Dc(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = _n));
    else if (i !== 4 && (i === 27 && fa(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
      for (Dc(e, t, n), e = e.sibling; e !== null; )
        Dc(e, t, n), e = e.sibling;
  }
  function Fl(e, t, n) {
    var i = e.tag;
    if (i === 5 || i === 6)
      e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (i !== 4 && (i === 27 && fa(e.type) && (n = e.stateNode), e = e.child, e !== null))
      for (Fl(e, t, n), e = e.sibling; e !== null; )
        Fl(e, t, n), e = e.sibling;
  }
  function qp(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      _t(t, i, n), t[gt] = e, t[Tt] = n;
    } catch (c) {
      Le(e, e.return, c);
    }
  }
  var Dn = !1, ct = !1, Oc = !1, Ip = typeof WeakSet == "function" ? WeakSet : Set, ht = null;
  function Dv(e, t) {
    if (e = e.containerInfo, Pc = vs, e = ef(e), No(e)) {
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
            var o = i.anchorOffset, c = i.focusNode;
            i = i.focusOffset;
            try {
              n.nodeType, c.nodeType;
            } catch {
              n = null;
              break e;
            }
            var p = 0, S = -1, x = -1, O = 0, B = 0, q = e, C = null;
            t: for (; ; ) {
              for (var U; q !== n || o !== 0 && q.nodeType !== 3 || (S = p + o), q !== c || i !== 0 && q.nodeType !== 3 || (x = p + i), q.nodeType === 3 && (p += q.nodeValue.length), (U = q.firstChild) !== null; )
                C = q, q = U;
              for (; ; ) {
                if (q === e) break t;
                if (C === n && ++O === o && (S = p), C === c && ++B === i && (x = p), (U = q.nextSibling) !== null) break;
                q = C, C = q.parentNode;
              }
              q = U;
            }
            n = S === -1 || x === -1 ? null : { start: S, end: x };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (eu = { focusedElem: e, selectionRange: n }, vs = !1, ht = t; ht !== null; )
      if (t = ht, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = t, ht = e;
      else
        for (; ht !== null; ) {
          switch (t = ht, c = t.alternate, e = t.flags, t.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (n = 0; n < e.length; n++)
                  o = e[n], o.ref.impl = o.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && c !== null) {
                e = void 0, n = t, o = c.memoizedProps, c = c.memoizedState, i = n.stateNode;
                try {
                  var ie = qa(
                    n.type,
                    o
                  );
                  e = i.getSnapshotBeforeUpdate(
                    ie,
                    c
                  ), i.__reactInternalSnapshotBeforeUpdate = e;
                } catch (fe) {
                  Le(
                    n,
                    n.return,
                    fe
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9)
                  au(e);
                else if (n === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      au(e);
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
              if ((e & 1024) !== 0) throw Error(s(163));
          }
          if (e = t.sibling, e !== null) {
            e.return = t.return, ht = e;
            break;
          }
          ht = t.return;
        }
  }
  function Kp(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Cn(e, n), i & 4 && Sr(5, n);
        break;
      case 1:
        if (Cn(e, n), i & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (p) {
              Le(n, n.return, p);
            }
          else {
            var o = qa(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (p) {
              Le(
                n,
                n.return,
                p
              );
            }
          }
        i & 64 && Vp(n), i & 512 && _r(n, n.return);
        break;
      case 3:
        if (Cn(e, n), i & 64 && (e = n.updateQueue, e !== null)) {
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
            $f(e, t);
          } catch (p) {
            Le(n, n.return, p);
          }
        }
        break;
      case 27:
        t === null && i & 4 && qp(n);
      case 26:
      case 5:
        Cn(e, n), t === null && i & 4 && Hp(n), i & 512 && _r(n, n.return);
        break;
      case 12:
        Cn(e, n);
        break;
      case 31:
        Cn(e, n), i & 4 && kp(e, n);
        break;
      case 13:
        Cn(e, n), i & 4 && Qp(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Hv.bind(
          null,
          n
        ), lb(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || Dn, !i) {
          t = t !== null && t.memoizedState !== null || ct, o = Dn;
          var c = ct;
          Dn = i, (ct = t) && !c ? zn(
            e,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : Cn(e, n), Dn = o, ct = c;
        }
        break;
      case 30:
        break;
      default:
        Cn(e, n);
    }
  }
  function Yp(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Yp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && so(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var We = null, Dt = !1;
  function On(e, t, n) {
    for (n = n.child; n !== null; )
      Xp(e, t, n), n = n.sibling;
  }
  function Xp(e, t, n) {
    if (Pe && typeof Pe.onCommitFiberUnmount == "function")
      try {
        Pe.onCommitFiberUnmount(Nt, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        ct || mn(n, t), On(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        ct || mn(n, t);
        var i = We, o = Dt;
        fa(n.type) && (We = n.stateNode, Dt = !1), On(
          e,
          t,
          n
        ), Mr(n.stateNode), We = i, Dt = o;
        break;
      case 5:
        ct || mn(n, t);
      case 6:
        if (i = We, o = Dt, We = null, On(
          e,
          t,
          n
        ), We = i, Dt = o, We !== null)
          if (Dt)
            try {
              (We.nodeType === 9 ? We.body : We.nodeName === "HTML" ? We.ownerDocument.body : We).removeChild(n.stateNode);
            } catch (c) {
              Le(
                n,
                t,
                c
              );
            }
          else
            try {
              We.removeChild(n.stateNode);
            } catch (c) {
              Le(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        We !== null && (Dt ? (e = We, Vm(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), zi(e)) : Vm(We, n.stateNode));
        break;
      case 4:
        i = We, o = Dt, We = n.stateNode.containerInfo, Dt = !0, On(
          e,
          t,
          n
        ), We = i, Dt = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ra(2, n, t), ct || ra(4, n, t), On(
          e,
          t,
          n
        );
        break;
      case 1:
        ct || (mn(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && Bp(
          n,
          t,
          i
        )), On(
          e,
          t,
          n
        );
        break;
      case 21:
        On(
          e,
          t,
          n
        );
        break;
      case 22:
        ct = (i = ct) || n.memoizedState !== null, On(
          e,
          t,
          n
        ), ct = i;
        break;
      default:
        On(
          e,
          t,
          n
        );
    }
  }
  function kp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        zi(e);
      } catch (n) {
        Le(t, t.return, n);
      }
    }
  }
  function Qp(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        zi(e);
      } catch (n) {
        Le(t, t.return, n);
      }
  }
  function Ov(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Ip()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ip()), t;
      default:
        throw Error(s(435, e.tag));
    }
  }
  function Wl(e, t) {
    var n = Ov(e);
    t.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var o = Gv.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Ot(e, t) {
    var n = t.deletions;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var o = n[i], c = e, p = t, S = p;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 27:
              if (fa(S.type)) {
                We = S.stateNode, Dt = !1;
                break e;
              }
              break;
            case 5:
              We = S.stateNode, Dt = !1;
              break e;
            case 3:
            case 4:
              We = S.stateNode.containerInfo, Dt = !0;
              break e;
          }
          S = S.return;
        }
        if (We === null) throw Error(s(160));
        Xp(c, p, o), We = null, Dt = !1, c = o.alternate, c !== null && (c.return = null), o.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Zp(t, e), t = t.sibling;
  }
  var ln = null;
  function Zp(e, t) {
    var n = e.alternate, i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ot(t, e), Ct(e), i & 4 && (ra(3, e, e.return), Sr(3, e), ra(5, e, e.return));
        break;
      case 1:
        Ot(t, e), Ct(e), i & 512 && (ct || n === null || mn(n, n.return)), i & 64 && Dn && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? i : n.concat(i))));
        break;
      case 26:
        var o = ln;
        if (Ot(t, e), Ct(e), i & 512 && (ct || n === null || mn(n, n.return)), i & 4) {
          var c = n !== null ? n.memoizedState : null;
          if (i = e.memoizedState, n === null)
            if (i === null)
              if (e.stateNode === null) {
                e: {
                  i = e.type, n = e.memoizedProps, o = o.ownerDocument || o;
                  t: switch (i) {
                    case "title":
                      c = o.getElementsByTagName("title")[0], (!c || c[Qi] || c[gt] || c.namespaceURI === "http://www.w3.org/2000/svg" || c.hasAttribute("itemprop")) && (c = o.createElement(i), o.head.insertBefore(
                        c,
                        o.querySelector("head > title")
                      )), _t(c, i, n), c[gt] = e, mt(c), i = c;
                      break e;
                    case "link":
                      var p = Zm(
                        "link",
                        "href",
                        o
                      ).get(i + (n.href || ""));
                      if (p) {
                        for (var S = 0; S < p.length; S++)
                          if (c = p[S], c.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && c.getAttribute("rel") === (n.rel == null ? null : n.rel) && c.getAttribute("title") === (n.title == null ? null : n.title) && c.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            p.splice(S, 1);
                            break t;
                          }
                      }
                      c = o.createElement(i), _t(c, i, n), o.head.appendChild(c);
                      break;
                    case "meta":
                      if (p = Zm(
                        "meta",
                        "content",
                        o
                      ).get(i + (n.content || ""))) {
                        for (S = 0; S < p.length; S++)
                          if (c = p[S], c.getAttribute("content") === (n.content == null ? null : "" + n.content) && c.getAttribute("name") === (n.name == null ? null : n.name) && c.getAttribute("property") === (n.property == null ? null : n.property) && c.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && c.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            p.splice(S, 1);
                            break t;
                          }
                      }
                      c = o.createElement(i), _t(c, i, n), o.head.appendChild(c);
                      break;
                    default:
                      throw Error(s(468, i));
                  }
                  c[gt] = e, mt(c), i = c;
                }
                e.stateNode = i;
              } else
                Jm(
                  o,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Qm(
                o,
                i,
                e.memoizedProps
              );
          else
            c !== i ? (c === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : c.count--, i === null ? Jm(
              o,
              e.type,
              e.stateNode
            ) : Qm(
              o,
              i,
              e.memoizedProps
            )) : i === null && e.stateNode !== null && Tc(
              e,
              e.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        Ot(t, e), Ct(e), i & 512 && (ct || n === null || mn(n, n.return)), n !== null && i & 4 && Tc(
          e,
          e.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (Ot(t, e), Ct(e), i & 512 && (ct || n === null || mn(n, n.return)), e.flags & 32) {
          o = e.stateNode;
          try {
            ai(o, "");
          } catch (ie) {
            Le(e, e.return, ie);
          }
        }
        i & 4 && e.stateNode != null && (o = e.memoizedProps, Tc(
          e,
          o,
          n !== null ? n.memoizedProps : o
        )), i & 1024 && (Oc = !0);
        break;
      case 6:
        if (Ot(t, e), Ct(e), i & 4) {
          if (e.stateNode === null)
            throw Error(s(162));
          i = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = i;
          } catch (ie) {
            Le(e, e.return, ie);
          }
        }
        break;
      case 3:
        if (ms = null, o = ln, ln = fs(t.containerInfo), Ot(t, e), ln = o, Ct(e), i & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            zi(t.containerInfo);
          } catch (ie) {
            Le(e, e.return, ie);
          }
        Oc && (Oc = !1, Jp(e));
        break;
      case 4:
        i = ln, ln = fs(
          e.stateNode.containerInfo
        ), Ot(t, e), Ct(e), ln = i;
        break;
      case 12:
        Ot(t, e), Ct(e);
        break;
      case 31:
        Ot(t, e), Ct(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Wl(e, i)));
        break;
      case 13:
        Ot(t, e), Ct(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (es = xt()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Wl(e, i)));
        break;
      case 22:
        o = e.memoizedState !== null;
        var x = n !== null && n.memoizedState !== null, O = Dn, B = ct;
        if (Dn = O || o, ct = B || x, Ot(t, e), ct = B, Dn = O, Ct(e), i & 8192)
          e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, o && (n === null || x || Dn || ct || Ia(e)), n = null, t = e; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (n === null) {
                x = n = t;
                try {
                  if (c = x.stateNode, o)
                    p = c.style, typeof p.setProperty == "function" ? p.setProperty("display", "none", "important") : p.display = "none";
                  else {
                    S = x.stateNode;
                    var q = x.memoizedProps.style, C = q != null && q.hasOwnProperty("display") ? q.display : null;
                    S.style.display = C == null || typeof C == "boolean" ? "" : ("" + C).trim();
                  }
                } catch (ie) {
                  Le(x, x.return, ie);
                }
              }
            } else if (t.tag === 6) {
              if (n === null) {
                x = t;
                try {
                  x.stateNode.nodeValue = o ? "" : x.memoizedProps;
                } catch (ie) {
                  Le(x, x.return, ie);
                }
              }
            } else if (t.tag === 18) {
              if (n === null) {
                x = t;
                try {
                  var U = x.stateNode;
                  o ? Bm(U, !0) : Bm(x.stateNode, !1);
                } catch (ie) {
                  Le(x, x.return, ie);
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
        i & 4 && (i = e.updateQueue, i !== null && (n = i.retryQueue, n !== null && (i.retryQueue = null, Wl(e, n))));
        break;
      case 19:
        Ot(t, e), Ct(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Wl(e, i)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ot(t, e), Ct(e);
    }
  }
  function Ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (Gp(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        if (n == null) throw Error(s(160));
        switch (n.tag) {
          case 27:
            var o = n.stateNode, c = Mc(e);
            Fl(e, c, o);
            break;
          case 5:
            var p = n.stateNode;
            n.flags & 32 && (ai(p, ""), n.flags &= -33);
            var S = Mc(e);
            Fl(e, S, p);
            break;
          case 3:
          case 4:
            var x = n.stateNode.containerInfo, O = Mc(e);
            Dc(
              e,
              O,
              x
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (B) {
        Le(e, e.return, B);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Jp(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Jp(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
      }
  }
  function Cn(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Kp(e, t.alternate, t), t = t.sibling;
  }
  function Ia(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ra(4, t, t.return), Ia(t);
          break;
        case 1:
          mn(t, t.return);
          var n = t.stateNode;
          typeof n.componentWillUnmount == "function" && Bp(
            t,
            t.return,
            n
          ), Ia(t);
          break;
        case 27:
          Mr(t.stateNode);
        case 26:
        case 5:
          mn(t, t.return), Ia(t);
          break;
        case 22:
          t.memoizedState === null && Ia(t);
          break;
        case 30:
          Ia(t);
          break;
        default:
          Ia(t);
      }
      e = e.sibling;
    }
  }
  function zn(e, t, n) {
    for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var i = t.alternate, o = e, c = t, p = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          zn(
            o,
            c,
            n
          ), Sr(4, c);
          break;
        case 1:
          if (zn(
            o,
            c,
            n
          ), i = c, o = i.stateNode, typeof o.componentDidMount == "function")
            try {
              o.componentDidMount();
            } catch (O) {
              Le(i, i.return, O);
            }
          if (i = c, o = i.updateQueue, o !== null) {
            var S = i.stateNode;
            try {
              var x = o.shared.hiddenCallbacks;
              if (x !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < x.length; o++)
                  wf(x[o], S);
            } catch (O) {
              Le(i, i.return, O);
            }
          }
          n && p & 64 && Vp(c), _r(c, c.return);
          break;
        case 27:
          qp(c);
        case 26:
        case 5:
          zn(
            o,
            c,
            n
          ), n && i === null && p & 4 && Hp(c), _r(c, c.return);
          break;
        case 12:
          zn(
            o,
            c,
            n
          );
          break;
        case 31:
          zn(
            o,
            c,
            n
          ), n && p & 4 && kp(o, c);
          break;
        case 13:
          zn(
            o,
            c,
            n
          ), n && p & 4 && Qp(o, c);
          break;
        case 22:
          c.memoizedState === null && zn(
            o,
            c,
            n
          ), _r(c, c.return);
          break;
        case 30:
          break;
        default:
          zn(
            o,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Cc(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sr(n));
  }
  function zc(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sr(e));
  }
  function sn(e, t, n, i) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fp(
          e,
          t,
          n,
          i
        ), t = t.sibling;
  }
  function Fp(e, t, n, i) {
    var o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        sn(
          e,
          t,
          n,
          i
        ), o & 2048 && Sr(9, t);
        break;
      case 1:
        sn(
          e,
          t,
          n,
          i
        );
        break;
      case 3:
        sn(
          e,
          t,
          n,
          i
        ), o & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sr(e)));
        break;
      case 12:
        if (o & 2048) {
          sn(
            e,
            t,
            n,
            i
          ), e = t.stateNode;
          try {
            var c = t.memoizedProps, p = c.id, S = c.onPostCommit;
            typeof S == "function" && S(
              p,
              t.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (x) {
            Le(t, t.return, x);
          }
        } else
          sn(
            e,
            t,
            n,
            i
          );
        break;
      case 31:
        sn(
          e,
          t,
          n,
          i
        );
        break;
      case 13:
        sn(
          e,
          t,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        c = t.stateNode, p = t.alternate, t.memoizedState !== null ? c._visibility & 2 ? sn(
          e,
          t,
          n,
          i
        ) : Er(e, t) : c._visibility & 2 ? sn(
          e,
          t,
          n,
          i
        ) : (c._visibility |= 2, Ai(
          e,
          t,
          n,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), o & 2048 && Cc(p, t);
        break;
      case 24:
        sn(
          e,
          t,
          n,
          i
        ), o & 2048 && zc(t.alternate, t);
        break;
      default:
        sn(
          e,
          t,
          n,
          i
        );
    }
  }
  function Ai(e, t, n, i, o) {
    for (o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, p = t, S = n, x = i, O = p.flags;
      switch (p.tag) {
        case 0:
        case 11:
        case 15:
          Ai(
            c,
            p,
            S,
            x,
            o
          ), Sr(8, p);
          break;
        case 23:
          break;
        case 22:
          var B = p.stateNode;
          p.memoizedState !== null ? B._visibility & 2 ? Ai(
            c,
            p,
            S,
            x,
            o
          ) : Er(
            c,
            p
          ) : (B._visibility |= 2, Ai(
            c,
            p,
            S,
            x,
            o
          )), o && O & 2048 && Cc(
            p.alternate,
            p
          );
          break;
        case 24:
          Ai(
            c,
            p,
            S,
            x,
            o
          ), o && O & 2048 && zc(p.alternate, p);
          break;
        default:
          Ai(
            c,
            p,
            S,
            x,
            o
          );
      }
      t = t.sibling;
    }
  }
  function Er(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, i = t, o = i.flags;
        switch (i.tag) {
          case 22:
            Er(n, i), o & 2048 && Cc(
              i.alternate,
              i
            );
            break;
          case 24:
            Er(n, i), o & 2048 && zc(i.alternate, i);
            break;
          default:
            Er(n, i);
        }
        t = t.sibling;
      }
  }
  var Ar = 8192;
  function xi(e, t, n) {
    if (e.subtreeFlags & Ar)
      for (e = e.child; e !== null; )
        Wp(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Wp(e, t, n) {
    switch (e.tag) {
      case 26:
        xi(
          e,
          t,
          n
        ), e.flags & Ar && e.memoizedState !== null && vb(
          n,
          ln,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        xi(
          e,
          t,
          n
        );
        break;
      case 3:
      case 4:
        var i = ln;
        ln = fs(e.stateNode.containerInfo), xi(
          e,
          t,
          n
        ), ln = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = Ar, Ar = 16777216, xi(
          e,
          t,
          n
        ), Ar = i) : xi(
          e,
          t,
          n
        ));
        break;
      default:
        xi(
          e,
          t,
          n
        );
    }
  }
  function Pp(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function xr(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ht = i, tm(
            i,
            e
          );
        }
      Pp(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        em(e), e = e.sibling;
  }
  function em(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        xr(e), e.flags & 2048 && ra(9, e, e.return);
        break;
      case 3:
        xr(e);
        break;
      case 12:
        xr(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Pl(e)) : xr(e);
        break;
      default:
        xr(e);
    }
  }
  function Pl(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ht = i, tm(
            i,
            e
          );
        }
      Pp(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, t, t.return), Pl(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Pl(t));
          break;
        default:
          Pl(t);
      }
      e = e.sibling;
    }
  }
  function tm(e, t) {
    for (; ht !== null; ) {
      var n = ht;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ra(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          sr(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, ht = i;
      else
        e: for (n = e; ht !== null; ) {
          i = ht;
          var o = i.sibling, c = i.return;
          if (Yp(i), i === n) {
            ht = null;
            break e;
          }
          if (o !== null) {
            o.return = c, ht = o;
            break e;
          }
          ht = c;
        }
    }
  }
  var Cv = {
    getCacheForType: function(e) {
      var t = bt(lt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return bt(lt).controller.signal;
    }
  }, zv = typeof WeakMap == "function" ? WeakMap : Map, ze = 0, Ye = null, xe = null, je = 0, Ue = 0, Gt = null, la = !1, Ni = !1, Rc = !1, Rn = 0, tt = 0, sa = 0, Ka = 0, Uc = 0, qt = 0, ji = 0, Nr = null, zt = null, Lc = !1, es = 0, nm = 0, ts = 1 / 0, ns = null, oa = null, ft = 0, ca = null, wi = null, Un = 0, Vc = 0, Bc = null, am = null, jr = 0, Hc = null;
  function It() {
    return (ze & 2) !== 0 && je !== 0 ? je & -je : D.T !== null ? Xc() : vd();
  }
  function im() {
    if (qt === 0)
      if ((je & 536870912) === 0 || $e) {
        var e = ul;
        ul <<= 1, (ul & 3932160) === 0 && (ul = 262144), qt = e;
      } else qt = 536870912;
    return e = Bt.current, e !== null && (e.flags |= 32), qt;
  }
  function Rt(e, t, n) {
    (e === Ye && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null) && ($i(e, 0), ua(
      e,
      je,
      qt,
      !1
    )), ki(e, n), ((ze & 2) === 0 || e !== Ye) && (e === Ye && ((ze & 2) === 0 && (Ka |= n), tt === 4 && ua(
      e,
      je,
      qt,
      !1
    )), hn(e));
  }
  function rm(e, t, n) {
    if ((ze & 6) !== 0) throw Error(s(327));
    var i = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Xi(e, t), o = i ? Lv(e, t) : qc(e, t, !0), c = i;
    do {
      if (o === 0) {
        Ni && !i && ua(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !Rv(n)) {
          o = qc(e, t, !1), c = !1;
          continue;
        }
        if (o === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var p = 0;
          else
            p = e.pendingLanes & -536870913, p = p !== 0 ? p : p & 536870912 ? 536870912 : 0;
          if (p !== 0) {
            t = p;
            e: {
              var S = e;
              o = Nr;
              var x = S.current.memoizedState.isDehydrated;
              if (x && ($i(S, p).flags |= 256), p = qc(
                S,
                p,
                !1
              ), p !== 2) {
                if (Rc && !x) {
                  S.errorRecoveryDisabledLanes |= c, Ka |= c, o = 4;
                  break e;
                }
                c = zt, zt = o, c !== null && (zt === null ? zt = c : zt.push.apply(
                  zt,
                  c
                ));
              }
              o = p;
            }
            if (c = !1, o !== 2) continue;
          }
        }
        if (o === 1) {
          $i(e, 0), ua(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, c = o, c) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ua(
                i,
                t,
                qt,
                !la
              );
              break e;
            case 2:
              zt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (o = es + 300 - xt(), 10 < o)) {
            if (ua(
              i,
              t,
              qt,
              !la
            ), fl(i, 0, !0) !== 0) break e;
            Un = t, i.timeoutHandle = Um(
              lm.bind(
                null,
                i,
                n,
                zt,
                ns,
                Lc,
                t,
                qt,
                Ka,
                ji,
                la,
                c,
                "Throttled",
                -0,
                0
              ),
              o
            );
            break e;
          }
          lm(
            i,
            n,
            zt,
            ns,
            Lc,
            t,
            qt,
            Ka,
            ji,
            la,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    hn(e);
  }
  function lm(e, t, n, i, o, c, p, S, x, O, B, q, C, U) {
    if (e.timeoutHandle = -1, q = t.subtreeFlags, q & 8192 || (q & 16785408) === 16785408) {
      q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: _n
      }, Wp(
        t,
        c,
        q
      );
      var ie = (c & 62914560) === c ? es - xt() : (c & 4194048) === c ? nm - xt() : 0;
      if (ie = bb(
        q,
        ie
      ), ie !== null) {
        Un = c, e.cancelPendingCommit = ie(
          mm.bind(
            null,
            e,
            t,
            c,
            n,
            i,
            o,
            p,
            S,
            x,
            B,
            q,
            null,
            C,
            U
          )
        ), ua(e, c, p, !O);
        return;
      }
    }
    mm(
      e,
      t,
      c,
      n,
      i,
      o,
      p,
      S,
      x
    );
  }
  function Rv(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var o = n[i], c = o.getSnapshot;
          o = o.value;
          try {
            if (!Lt(c(), o)) return !1;
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
  function ua(e, t, n, i) {
    t &= ~Uc, t &= ~Ka, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var o = t; 0 < o; ) {
      var c = 31 - Ke(o), p = 1 << c;
      i[c] = -1, o &= ~p;
    }
    n !== 0 && hd(e, n, t);
  }
  function as() {
    return (ze & 6) === 0 ? (wr(0), !1) : !0;
  }
  function Gc() {
    if (xe !== null) {
      if (Ue === 0)
        var e = xe.return;
      else
        e = xe, Nn = Ra = null, ac(e), vi = null, cr = 0, e = xe;
      for (; e !== null; )
        Lp(e.alternate, e), e = e.return;
      xe = null;
    }
  }
  function $i(e, t) {
    var n = e.timeoutHandle;
    n !== -1 && (e.timeoutHandle = -1, tb(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Un = 0, Gc(), Ye = e, xe = n = An(e.current, null), je = t, Ue = 0, Gt = null, la = !1, Ni = Xi(e, t), Rc = !1, ji = qt = Uc = Ka = sa = tt = 0, zt = Nr = null, Lc = !1, (t & 8) !== 0 && (t |= t & 32);
    var i = e.entangledLanes;
    if (i !== 0)
      for (e = e.entanglements, i &= t; 0 < i; ) {
        var o = 31 - Ke(i), c = 1 << o;
        t |= e[o], i &= ~c;
      }
    return Rn = t, xl(), n;
  }
  function sm(e, t) {
    _e = null, D.H = gr, t === gi || t === Ol ? (t = Af(), Ue = 3) : t === Yo ? (t = Af(), Ue = 4) : Ue = t === bc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Gt = t, xe === null && (tt = 1, Xl(
      e,
      kt(t, e.current)
    ));
  }
  function om() {
    var e = Bt.current;
    return e === null ? !0 : (je & 4194048) === je ? Ft === null : (je & 62914560) === je || (je & 536870912) !== 0 ? e === Ft : !1;
  }
  function cm() {
    var e = D.H;
    return D.H = gr, e === null ? gr : e;
  }
  function um() {
    var e = D.A;
    return D.A = Cv, e;
  }
  function is() {
    tt = 4, la || (je & 4194048) !== je && Bt.current !== null || (Ni = !0), (sa & 134217727) === 0 && (Ka & 134217727) === 0 || Ye === null || ua(
      Ye,
      je,
      qt,
      !1
    );
  }
  function qc(e, t, n) {
    var i = ze;
    ze |= 2;
    var o = cm(), c = um();
    (Ye !== e || je !== t) && (ns = null, $i(e, t)), t = !1;
    var p = tt;
    e: do
      try {
        if (Ue !== 0 && xe !== null) {
          var S = xe, x = Gt;
          switch (Ue) {
            case 8:
              Gc(), p = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Bt.current === null && (t = !0);
              var O = Ue;
              if (Ue = 0, Gt = null, Ti(e, S, x, O), n && Ni) {
                p = 0;
                break e;
              }
              break;
            default:
              O = Ue, Ue = 0, Gt = null, Ti(e, S, x, O);
          }
        }
        Uv(), p = tt;
        break;
      } catch (B) {
        sm(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Nn = Ra = null, ze = i, D.H = o, D.A = c, xe === null && (Ye = null, je = 0, xl()), p;
  }
  function Uv() {
    for (; xe !== null; ) dm(xe);
  }
  function Lv(e, t) {
    var n = ze;
    ze |= 2;
    var i = cm(), o = um();
    Ye !== e || je !== t ? (ns = null, ts = xt() + 500, $i(e, t)) : Ni = Xi(
      e,
      t
    );
    e: do
      try {
        if (Ue !== 0 && xe !== null) {
          t = xe;
          var c = Gt;
          t: switch (Ue) {
            case 1:
              Ue = 0, Gt = null, Ti(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (_f(c)) {
                Ue = 0, Gt = null, fm(t);
                break;
              }
              t = function() {
                Ue !== 2 && Ue !== 9 || Ye !== e || (Ue = 7), hn(e);
              }, c.then(t, t);
              break e;
            case 3:
              Ue = 7;
              break e;
            case 4:
              Ue = 5;
              break e;
            case 7:
              _f(c) ? (Ue = 0, Gt = null, fm(t)) : (Ue = 0, Gt = null, Ti(e, t, c, 7));
              break;
            case 5:
              var p = null;
              switch (xe.tag) {
                case 26:
                  p = xe.memoizedState;
                case 5:
                case 27:
                  var S = xe;
                  if (p ? Fm(p) : S.stateNode.complete) {
                    Ue = 0, Gt = null;
                    var x = S.sibling;
                    if (x !== null) xe = x;
                    else {
                      var O = S.return;
                      O !== null ? (xe = O, rs(O)) : xe = null;
                    }
                    break t;
                  }
              }
              Ue = 0, Gt = null, Ti(e, t, c, 5);
              break;
            case 6:
              Ue = 0, Gt = null, Ti(e, t, c, 6);
              break;
            case 8:
              Gc(), tt = 6;
              break e;
            default:
              throw Error(s(462));
          }
        }
        Vv();
        break;
      } catch (B) {
        sm(e, B);
      }
    while (!0);
    return Nn = Ra = null, D.H = i, D.A = o, ze = n, xe !== null ? 0 : (Ye = null, je = 0, xl(), tt);
  }
  function Vv() {
    for (; xe !== null && !Na(); )
      dm(xe);
  }
  function dm(e) {
    var t = Rp(e.alternate, e, Rn);
    e.memoizedProps = e.pendingProps, t === null ? rs(e) : xe = t;
  }
  function fm(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Tp(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          je
        );
        break;
      case 11:
        t = Tp(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          je
        );
        break;
      case 5:
        ac(t);
      default:
        Lp(n, t), t = xe = uf(t, Rn), t = Rp(n, t, Rn);
    }
    e.memoizedProps = e.pendingProps, t === null ? rs(e) : xe = t;
  }
  function Ti(e, t, n, i) {
    Nn = Ra = null, ac(t), vi = null, cr = 0;
    var o = t.return;
    try {
      if (jv(
        e,
        o,
        t,
        n,
        je
      )) {
        tt = 1, Xl(
          e,
          kt(n, e.current)
        ), xe = null;
        return;
      }
    } catch (c) {
      if (o !== null) throw xe = o, c;
      tt = 1, Xl(
        e,
        kt(n, e.current)
      ), xe = null;
      return;
    }
    t.flags & 32768 ? ($e || i === 1 ? e = !0 : Ni || (je & 536870912) !== 0 ? e = !1 : (la = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Bt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), pm(t, e)) : rs(t);
  }
  function rs(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        pm(
          t,
          la
        );
        return;
      }
      e = t.return;
      var n = Tv(
        t.alternate,
        t,
        Rn
      );
      if (n !== null) {
        xe = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        xe = t;
        return;
      }
      xe = t = e;
    } while (t !== null);
    tt === 0 && (tt = 5);
  }
  function pm(e, t) {
    do {
      var n = Mv(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, xe = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        xe = e;
        return;
      }
      xe = e = n;
    } while (e !== null);
    tt = 6, xe = null;
  }
  function mm(e, t, n, i, o, c, p, S, x) {
    e.cancelPendingCommit = null;
    do
      ls();
    while (ft !== 0);
    if ((ze & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === e.current) throw Error(s(177));
      if (c = t.lanes | t.childLanes, c |= Mo, gg(
        e,
        n,
        c,
        p,
        S,
        x
      ), e === Ye && (xe = Ye = null, je = 0), wi = t, ca = e, Un = n, Vc = c, Bc = o, am = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, qv(Ae, function() {
        return bm(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
        i = D.T, D.T = null, o = k.p, k.p = 2, p = ze, ze |= 4;
        try {
          Dv(e, t, n);
        } finally {
          ze = p, k.p = o, D.T = i;
        }
      }
      ft = 1, hm(), ym(), gm();
    }
  }
  function hm() {
    if (ft === 1) {
      ft = 0;
      var e = ca, t = wi, n = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || n) {
        n = D.T, D.T = null;
        var i = k.p;
        k.p = 2;
        var o = ze;
        ze |= 4;
        try {
          Zp(t, e);
          var c = eu, p = ef(e.containerInfo), S = c.focusedElem, x = c.selectionRange;
          if (p !== S && S && S.ownerDocument && Pd(
            S.ownerDocument.documentElement,
            S
          )) {
            if (x !== null && No(S)) {
              var O = x.start, B = x.end;
              if (B === void 0 && (B = O), "selectionStart" in S)
                S.selectionStart = O, S.selectionEnd = Math.min(
                  B,
                  S.value.length
                );
              else {
                var q = S.ownerDocument || document, C = q && q.defaultView || window;
                if (C.getSelection) {
                  var U = C.getSelection(), ie = S.textContent.length, fe = Math.min(x.start, ie), qe = x.end === void 0 ? fe : Math.min(x.end, ie);
                  !U.extend && fe > qe && (p = qe, qe = fe, fe = p);
                  var w = Wd(
                    S,
                    fe
                  ), j = Wd(
                    S,
                    qe
                  );
                  if (w && j && (U.rangeCount !== 1 || U.anchorNode !== w.node || U.anchorOffset !== w.offset || U.focusNode !== j.node || U.focusOffset !== j.offset)) {
                    var M = q.createRange();
                    M.setStart(w.node, w.offset), U.removeAllRanges(), fe > qe ? (U.addRange(M), U.extend(j.node, j.offset)) : (M.setEnd(j.node, j.offset), U.addRange(M));
                  }
                }
              }
            }
            for (q = [], U = S; U = U.parentNode; )
              U.nodeType === 1 && q.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof S.focus == "function" && S.focus(), S = 0; S < q.length; S++) {
              var G = q[S];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          vs = !!Pc, eu = Pc = null;
        } finally {
          ze = o, k.p = i, D.T = n;
        }
      }
      e.current = t, ft = 2;
    }
  }
  function ym() {
    if (ft === 2) {
      ft = 0;
      var e = ca, t = wi, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = D.T, D.T = null;
        var i = k.p;
        k.p = 2;
        var o = ze;
        ze |= 4;
        try {
          Kp(e, t.alternate, t);
        } finally {
          ze = o, k.p = i, D.T = n;
        }
      }
      ft = 3;
    }
  }
  function gm() {
    if (ft === 4 || ft === 3) {
      ft = 0, Za();
      var e = ca, t = wi, n = Un, i = am;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? ft = 5 : (ft = 0, wi = ca = null, vm(e, e.pendingLanes));
      var o = e.pendingLanes;
      if (o === 0 && (oa = null), ro(n), t = t.stateNode, Pe && typeof Pe.onCommitFiberRoot == "function")
        try {
          Pe.onCommitFiberRoot(
            Nt,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (i !== null) {
        t = D.T, o = k.p, k.p = 2, D.T = null;
        try {
          for (var c = e.onRecoverableError, p = 0; p < i.length; p++) {
            var S = i[p];
            c(S.value, {
              componentStack: S.stack
            });
          }
        } finally {
          D.T = t, k.p = o;
        }
      }
      (Un & 3) !== 0 && ls(), hn(e), o = e.pendingLanes, (n & 261930) !== 0 && (o & 42) !== 0 ? e === Hc ? jr++ : (jr = 0, Hc = e) : jr = 0, wr(0);
    }
  }
  function vm(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sr(t)));
  }
  function ls() {
    return hm(), ym(), gm(), bm();
  }
  function bm() {
    if (ft !== 5) return !1;
    var e = ca, t = Vc;
    Vc = 0;
    var n = ro(Un), i = D.T, o = k.p;
    try {
      k.p = 32 > n ? 32 : n, D.T = null, n = Bc, Bc = null;
      var c = ca, p = Un;
      if (ft = 0, wi = ca = null, Un = 0, (ze & 6) !== 0) throw Error(s(331));
      var S = ze;
      if (ze |= 4, em(c.current), Fp(
        c,
        c.current,
        p,
        n
      ), ze = S, wr(0, !1), Pe && typeof Pe.onPostCommitFiberRoot == "function")
        try {
          Pe.onPostCommitFiberRoot(Nt, c);
        } catch {
        }
      return !0;
    } finally {
      k.p = o, D.T = i, vm(e, t);
    }
  }
  function Sm(e, t, n) {
    t = kt(n, t), t = vc(e.stateNode, t, 2), e = na(e, t, 2), e !== null && (ki(e, 2), hn(e));
  }
  function Le(e, t, n) {
    if (e.tag === 3)
      Sm(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Sm(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (oa === null || !oa.has(i))) {
            e = kt(n, e), n = _p(2), i = na(t, n, 2), i !== null && (Ep(
              n,
              i,
              t,
              e
            ), ki(i, 2), hn(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function Ic(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new zv();
      var o = /* @__PURE__ */ new Set();
      i.set(t, o);
    } else
      o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
    o.has(n) || (Rc = !0, o.add(n), e = Bv.bind(null, e, t, n), t.then(e, e));
  }
  function Bv(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ye === e && (je & n) === n && (tt === 4 || tt === 3 && (je & 62914560) === je && 300 > xt() - es ? (ze & 2) === 0 && $i(e, 0) : Uc |= n, ji === je && (ji = 0)), hn(e);
  }
  function _m(e, t) {
    t === 0 && (t = md()), e = Oa(e, t), e !== null && (ki(e, t), hn(e));
  }
  function Hv(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), _m(e, n);
  }
  function Gv(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    i !== null && i.delete(t), _m(e, n);
  }
  function qv(e, t) {
    return nn(e, t);
  }
  var ss = null, Mi = null, Kc = !1, os = !1, Yc = !1, da = 0;
  function hn(e) {
    e !== Mi && e.next === null && (Mi === null ? ss = Mi = e : Mi = Mi.next = e), os = !0, Kc || (Kc = !0, Kv());
  }
  function wr(e, t) {
    if (!Yc && os) {
      Yc = !0;
      do
        for (var n = !1, i = ss; i !== null; ) {
          if (e !== 0) {
            var o = i.pendingLanes;
            if (o === 0) var c = 0;
            else {
              var p = i.suspendedLanes, S = i.pingedLanes;
              c = (1 << 31 - Ke(42 | e) + 1) - 1, c &= o & ~(p & ~S), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, Nm(i, c));
          } else
            c = je, c = fl(
              i,
              i === Ye ? c : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (c & 3) === 0 || Xi(i, c) || (n = !0, Nm(i, c));
          i = i.next;
        }
      while (n);
      Yc = !1;
    }
  }
  function Iv() {
    Em();
  }
  function Em() {
    os = Kc = !1;
    var e = 0;
    da !== 0 && eb() && (e = da);
    for (var t = xt(), n = null, i = ss; i !== null; ) {
      var o = i.next, c = Am(i, t);
      c === 0 ? (i.next = null, n === null ? ss = o : n.next = o, o === null && (Mi = n)) : (n = i, (e !== 0 || (c & 3) !== 0) && (os = !0)), i = o;
    }
    ft !== 0 && ft !== 5 || wr(e), da !== 0 && (da = 0);
  }
  function Am(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var p = 31 - Ke(c), S = 1 << p, x = o[p];
      x === -1 ? ((S & n) === 0 || (S & i) !== 0) && (o[p] = yg(S, t)) : x <= t && (e.expiredLanes |= S), c &= ~S;
    }
    if (t = Ye, n = je, n = fl(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, n === 0 || e === t && (Ue === 2 || Ue === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && ke(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || Xi(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (i !== null && ke(i), ro(n)) {
        case 2:
        case 8:
          n = K;
          break;
        case 32:
          n = Ae;
          break;
        case 268435456:
          n = ja;
          break;
        default:
          n = Ae;
      }
      return i = xm.bind(null, e), n = nn(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && ke(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function xm(e, t) {
    if (ft !== 0 && ft !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (ls() && e.callbackNode !== n)
      return null;
    var i = je;
    return i = fl(
      e,
      e === Ye ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (rm(e, i, t), Am(e, xt()), e.callbackNode != null && e.callbackNode === n ? xm.bind(null, e) : null);
  }
  function Nm(e, t) {
    if (ls()) return null;
    rm(e, t, !0);
  }
  function Kv() {
    nb(function() {
      (ze & 6) !== 0 ? nn(
        Yi,
        Iv
      ) : Em();
    });
  }
  function Xc() {
    if (da === 0) {
      var e = hi;
      e === 0 && (e = cl, cl <<= 1, (cl & 261888) === 0 && (cl = 256)), da = e;
    }
    return da;
  }
  function jm(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : yl("" + e);
  }
  function wm(e, t) {
    var n = t.ownerDocument.createElement("input");
    return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
  }
  function Yv(e, t, n, i, o) {
    if (t === "submit" && n && n.stateNode === o) {
      var c = jm(
        (o[Tt] || null).action
      ), p = i.submitter;
      p && (t = (t = p[Tt] || null) ? jm(t.formAction) : p.getAttribute("formAction"), t !== null && (c = t, p = null));
      var S = new Sl(
        "action",
        "action",
        null,
        i,
        o
      );
      e.push({
        event: S,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (da !== 0) {
                  var x = p ? wm(o, p) : new FormData(o);
                  fc(
                    n,
                    {
                      pending: !0,
                      data: x,
                      method: o.method,
                      action: c
                    },
                    null,
                    x
                  );
                }
              } else
                typeof c == "function" && (S.preventDefault(), x = p ? wm(o, p) : new FormData(o), fc(
                  n,
                  {
                    pending: !0,
                    data: x,
                    method: o.method,
                    action: c
                  },
                  c,
                  x
                ));
            },
            currentTarget: o
          }
        ]
      });
    }
  }
  for (var kc = 0; kc < To.length; kc++) {
    var Qc = To[kc], Xv = Qc.toLowerCase(), kv = Qc[0].toUpperCase() + Qc.slice(1);
    rn(
      Xv,
      "on" + kv
    );
  }
  rn(af, "onAnimationEnd"), rn(rf, "onAnimationIteration"), rn(lf, "onAnimationStart"), rn("dblclick", "onDoubleClick"), rn("focusin", "onFocus"), rn("focusout", "onBlur"), rn(cv, "onTransitionRun"), rn(uv, "onTransitionStart"), rn(dv, "onTransitionCancel"), rn(sf, "onTransitionEnd"), ti("onMouseEnter", ["mouseout", "mouseover"]), ti("onMouseLeave", ["mouseout", "mouseover"]), ti("onPointerEnter", ["pointerout", "pointerover"]), ti("onPointerLeave", ["pointerout", "pointerover"]), $a(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), $a(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), $a("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), $a(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), $a(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), $a(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var $r = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Qv = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat($r)
  );
  function $m(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], o = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var p = i.length - 1; 0 <= p; p--) {
            var S = i[p], x = S.instance, O = S.currentTarget;
            if (S = S.listener, x !== c && o.isPropagationStopped())
              break e;
            c = S, o.currentTarget = O;
            try {
              c(o);
            } catch (B) {
              Al(B);
            }
            o.currentTarget = null, c = x;
          }
        else
          for (p = 0; p < i.length; p++) {
            if (S = i[p], x = S.instance, O = S.currentTarget, S = S.listener, x !== c && o.isPropagationStopped())
              break e;
            c = S, o.currentTarget = O;
            try {
              c(o);
            } catch (B) {
              Al(B);
            }
            o.currentTarget = null, c = x;
          }
      }
    }
  }
  function Ne(e, t) {
    var n = t[lo];
    n === void 0 && (n = t[lo] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (Tm(t, e, 2, !1), n.add(i));
  }
  function Zc(e, t, n) {
    var i = 0;
    t && (i |= 4), Tm(
      n,
      e,
      i,
      t
    );
  }
  var cs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jc(e) {
    if (!e[cs]) {
      e[cs] = !0, _d.forEach(function(n) {
        n !== "selectionchange" && (Qv.has(n) || Zc(n, !1, e), Zc(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[cs] || (t[cs] = !0, Zc("selectionchange", !1, t));
    }
  }
  function Tm(e, t, n, i) {
    switch (ih(t)) {
      case 2:
        var o = Eb;
        break;
      case 8:
        o = Ab;
        break;
      default:
        o = du;
    }
    n = o.bind(
      null,
      t,
      n,
      e
    ), o = void 0, !yo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: o
    }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
      passive: o
    }) : e.addEventListener(t, n, !1);
  }
  function Fc(e, t, n, i, o) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var p = i.tag;
        if (p === 3 || p === 4) {
          var S = i.stateNode.containerInfo;
          if (S === o) break;
          if (p === 4)
            for (p = i.return; p !== null; ) {
              var x = p.tag;
              if ((x === 3 || x === 4) && p.stateNode.containerInfo === o)
                return;
              p = p.return;
            }
          for (; S !== null; ) {
            if (p = Wa(S), p === null) return;
            if (x = p.tag, x === 5 || x === 6 || x === 26 || x === 27) {
              i = c = p;
              continue e;
            }
            S = S.parentNode;
          }
        }
        i = i.return;
      }
    Cd(function() {
      var O = c, B = mo(n), q = [];
      e: {
        var C = of.get(e);
        if (C !== void 0) {
          var U = Sl, ie = e;
          switch (e) {
            case "keypress":
              if (vl(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = Gg;
              break;
            case "focusin":
              ie = "focus", U = So;
              break;
            case "focusout":
              ie = "blur", U = So;
              break;
            case "beforeblur":
            case "afterblur":
              U = So;
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
              U = Ud;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = Tg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = Kg;
              break;
            case af:
            case rf:
            case lf:
              U = Og;
              break;
            case sf:
              U = Xg;
              break;
            case "scroll":
            case "scrollend":
              U = wg;
              break;
            case "wheel":
              U = Qg;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = zg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Vd;
              break;
            case "toggle":
            case "beforetoggle":
              U = Jg;
          }
          var fe = (t & 4) !== 0, qe = !fe && (e === "scroll" || e === "scrollend"), w = fe ? C !== null ? C + "Capture" : null : C;
          fe = [];
          for (var j = O, M; j !== null; ) {
            var G = j;
            if (M = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || M === null || w === null || (G = Ji(j, w), G != null && fe.push(
              Tr(j, G, M)
            )), qe) break;
            j = j.return;
          }
          0 < fe.length && (C = new U(
            C,
            ie,
            null,
            n,
            B
          ), q.push({ event: C, listeners: fe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (C = e === "mouseover" || e === "pointerover", U = e === "mouseout" || e === "pointerout", C && n !== po && (ie = n.relatedTarget || n.fromElement) && (Wa(ie) || ie[Fa]))
            break e;
          if ((U || C) && (C = B.window === B ? B : (C = B.ownerDocument) ? C.defaultView || C.parentWindow : window, U ? (ie = n.relatedTarget || n.toElement, U = O, ie = ie ? Wa(ie) : null, ie !== null && (qe = d(ie), fe = ie.tag, ie !== qe || fe !== 5 && fe !== 27 && fe !== 6) && (ie = null)) : (U = null, ie = O), U !== ie)) {
            if (fe = Ud, G = "onMouseLeave", w = "onMouseEnter", j = "mouse", (e === "pointerout" || e === "pointerover") && (fe = Vd, G = "onPointerLeave", w = "onPointerEnter", j = "pointer"), qe = U == null ? C : Zi(U), M = ie == null ? C : Zi(ie), C = new fe(
              G,
              j + "leave",
              U,
              n,
              B
            ), C.target = qe, C.relatedTarget = M, G = null, Wa(B) === O && (fe = new fe(
              w,
              j + "enter",
              ie,
              n,
              B
            ), fe.target = M, fe.relatedTarget = qe, G = fe), qe = G, U && ie)
              t: {
                for (fe = Zv, w = U, j = ie, M = 0, G = w; G; G = fe(G))
                  M++;
                G = 0;
                for (var ce = j; ce; ce = fe(ce))
                  G++;
                for (; 0 < M - G; )
                  w = fe(w), M--;
                for (; 0 < G - M; )
                  j = fe(j), G--;
                for (; M--; ) {
                  if (w === j || j !== null && w === j.alternate) {
                    fe = w;
                    break t;
                  }
                  w = fe(w), j = fe(j);
                }
                fe = null;
              }
            else fe = null;
            U !== null && Mm(
              q,
              C,
              U,
              fe,
              !1
            ), ie !== null && qe !== null && Mm(
              q,
              qe,
              ie,
              fe,
              !0
            );
          }
        }
        e: {
          if (C = O ? Zi(O) : window, U = C.nodeName && C.nodeName.toLowerCase(), U === "select" || U === "input" && C.type === "file")
            var Oe = Xd;
          else if (Kd(C))
            if (kd)
              Oe = lv;
            else {
              Oe = iv;
              var le = av;
            }
          else
            U = C.nodeName, !U || U.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? O && fo(O.elementType) && (Oe = Xd) : Oe = rv;
          if (Oe && (Oe = Oe(e, O))) {
            Yd(
              q,
              Oe,
              n,
              B
            );
            break e;
          }
          le && le(e, C, O), e === "focusout" && O && C.type === "number" && O.memoizedProps.value != null && uo(C, "number", C.value);
        }
        switch (le = O ? Zi(O) : window, e) {
          case "focusin":
            (Kd(le) || le.contentEditable === "true") && (si = le, jo = O, ir = null);
            break;
          case "focusout":
            ir = jo = si = null;
            break;
          case "mousedown":
            wo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            wo = !1, tf(q, n, B);
            break;
          case "selectionchange":
            if (ov) break;
          case "keydown":
          case "keyup":
            tf(q, n, B);
        }
        var Ee;
        if (Eo)
          e: {
            switch (e) {
              case "compositionstart":
                var we = "onCompositionStart";
                break e;
              case "compositionend":
                we = "onCompositionEnd";
                break e;
              case "compositionupdate":
                we = "onCompositionUpdate";
                break e;
            }
            we = void 0;
          }
        else
          li ? qd(e, n) && (we = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (we = "onCompositionStart");
        we && (Bd && n.locale !== "ko" && (li || we !== "onCompositionStart" ? we === "onCompositionEnd" && li && (Ee = zd()) : (Zn = B, go = "value" in Zn ? Zn.value : Zn.textContent, li = !0)), le = us(O, we), 0 < le.length && (we = new Ld(
          we,
          e,
          null,
          n,
          B
        ), q.push({ event: we, listeners: le }), Ee ? we.data = Ee : (Ee = Id(n), Ee !== null && (we.data = Ee)))), (Ee = Wg ? Pg(e, n) : ev(e, n)) && (we = us(O, "onBeforeInput"), 0 < we.length && (le = new Ld(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          B
        ), q.push({
          event: le,
          listeners: we
        }), le.data = Ee)), Yv(
          q,
          e,
          O,
          n,
          B
        );
      }
      $m(q, t);
    });
  }
  function Tr(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function us(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var o = e, c = o.stateNode;
      if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || c === null || (o = Ji(e, n), o != null && i.unshift(
        Tr(e, o, c)
      ), o = Ji(e, t), o != null && i.push(
        Tr(e, o, c)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function Zv(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Mm(e, t, n, i, o) {
    for (var c = t._reactName, p = []; n !== null && n !== i; ) {
      var S = n, x = S.alternate, O = S.stateNode;
      if (S = S.tag, x !== null && x === i) break;
      S !== 5 && S !== 26 && S !== 27 || O === null || (x = O, o ? (O = Ji(n, c), O != null && p.unshift(
        Tr(n, O, x)
      )) : o || (O = Ji(n, c), O != null && p.push(
        Tr(n, O, x)
      ))), n = n.return;
    }
    p.length !== 0 && e.push({ event: t, listeners: p });
  }
  var Jv = /\r\n?/g, Fv = /\u0000|\uFFFD/g;
  function Dm(e) {
    return (typeof e == "string" ? e : "" + e).replace(Jv, `
`).replace(Fv, "");
  }
  function Om(e, t) {
    return t = Dm(t), Dm(e) === t;
  }
  function Ge(e, t, n, i, o, c) {
    switch (n) {
      case "children":
        typeof i == "string" ? t === "body" || t === "textarea" && i === "" || ai(e, i) : (typeof i == "number" || typeof i == "bigint") && t !== "body" && ai(e, "" + i);
        break;
      case "className":
        ml(e, "class", i);
        break;
      case "tabIndex":
        ml(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ml(e, n, i);
        break;
      case "style":
        Dd(e, i, c);
        break;
      case "data":
        if (t !== "object") {
          ml(e, "data", i);
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
        i = yl("" + i), e.setAttribute(n, i);
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
          typeof c == "function" && (n === "formAction" ? (t !== "input" && Ge(e, t, "name", o.name, o, null), Ge(
            e,
            t,
            "formEncType",
            o.formEncType,
            o,
            null
          ), Ge(
            e,
            t,
            "formMethod",
            o.formMethod,
            o,
            null
          ), Ge(
            e,
            t,
            "formTarget",
            o.formTarget,
            o,
            null
          )) : (Ge(e, t, "encType", o.encType, o, null), Ge(e, t, "method", o.method, o, null), Ge(e, t, "target", o.target, o, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = yl("" + i), e.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (e.onclick = _n);
        break;
      case "onScroll":
        i != null && Ne("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ne("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(s(61));
          if (n = i.__html, n != null) {
            if (o.children != null) throw Error(s(60));
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
        n = yl("" + i), e.setAttributeNS(
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
        Ne("beforetoggle", e), Ne("toggle", e), pl(e, "popover", i);
        break;
      case "xlinkActuate":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Sn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Sn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        pl(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Ng.get(n) || n, pl(e, n, i));
    }
  }
  function Wc(e, t, n, i, o, c) {
    switch (n) {
      case "style":
        Dd(e, i, c);
        break;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(s(61));
          if (n = i.__html, n != null) {
            if (o.children != null) throw Error(s(60));
            e.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof i == "string" ? ai(e, i) : (typeof i == "number" || typeof i == "bigint") && ai(e, "" + i);
        break;
      case "onScroll":
        i != null && Ne("scroll", e);
        break;
      case "onScrollEnd":
        i != null && Ne("scrollend", e);
        break;
      case "onClick":
        i != null && (e.onclick = _n);
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
        if (!Ed.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (o = n.endsWith("Capture"), t = n.slice(2, o ? n.length - 7 : void 0), c = e[Tt] || null, c = c != null ? c[n] : null, typeof c == "function" && e.removeEventListener(t, c, o), typeof i == "function")) {
              typeof c != "function" && c !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, i, o);
              break e;
            }
            n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : pl(e, n, i);
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
        Ne("error", e), Ne("load", e);
        var i = !1, o = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var p = n[c];
            if (p != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  o = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  Ge(e, t, c, p, n, null);
              }
          }
        o && Ge(e, t, "srcSet", n.srcSet, n, null), i && Ge(e, t, "src", n.src, n, null);
        return;
      case "input":
        Ne("invalid", e);
        var S = c = p = o = null, x = null, O = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var B = n[i];
            if (B != null)
              switch (i) {
                case "name":
                  o = B;
                  break;
                case "type":
                  p = B;
                  break;
                case "checked":
                  x = B;
                  break;
                case "defaultChecked":
                  O = B;
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
                    throw Error(s(137, t));
                  break;
                default:
                  Ge(e, t, i, B, n, null);
              }
          }
        wd(
          e,
          c,
          S,
          x,
          O,
          p,
          o,
          !1
        );
        return;
      case "select":
        Ne("invalid", e), i = p = c = null;
        for (o in n)
          if (n.hasOwnProperty(o) && (S = n[o], S != null))
            switch (o) {
              case "value":
                c = S;
                break;
              case "defaultValue":
                p = S;
                break;
              case "multiple":
                i = S;
              default:
                Ge(e, t, o, S, n, null);
            }
        t = c, n = p, e.multiple = !!i, t != null ? ni(e, !!i, t, !1) : n != null && ni(e, !!i, n, !0);
        return;
      case "textarea":
        Ne("invalid", e), c = o = i = null;
        for (p in n)
          if (n.hasOwnProperty(p) && (S = n[p], S != null))
            switch (p) {
              case "value":
                i = S;
                break;
              case "defaultValue":
                o = S;
                break;
              case "children":
                c = S;
                break;
              case "dangerouslySetInnerHTML":
                if (S != null) throw Error(s(91));
                break;
              default:
                Ge(e, t, p, S, n, null);
            }
        Td(e, i, o, c);
        return;
      case "option":
        for (x in n)
          if (n.hasOwnProperty(x) && (i = n[x], i != null))
            switch (x) {
              case "selected":
                e.selected = i && typeof i != "function" && typeof i != "symbol";
                break;
              default:
                Ge(e, t, x, i, n, null);
            }
        return;
      case "dialog":
        Ne("beforetoggle", e), Ne("toggle", e), Ne("cancel", e), Ne("close", e);
        break;
      case "iframe":
      case "object":
        Ne("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < $r.length; i++)
          Ne($r[i], e);
        break;
      case "image":
        Ne("error", e), Ne("load", e);
        break;
      case "details":
        Ne("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ne("error", e), Ne("load", e);
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
        for (O in n)
          if (n.hasOwnProperty(O) && (i = n[O], i != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                Ge(e, t, O, i, n, null);
            }
        return;
      default:
        if (fo(t)) {
          for (B in n)
            n.hasOwnProperty(B) && (i = n[B], i !== void 0 && Wc(
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
      n.hasOwnProperty(S) && (i = n[S], i != null && Ge(e, t, S, i, n, null));
  }
  function Wv(e, t, n, i) {
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
        var o = null, c = null, p = null, S = null, x = null, O = null, B = null;
        for (U in n) {
          var q = n[U];
          if (n.hasOwnProperty(U) && q != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = q;
              default:
                i.hasOwnProperty(U) || Ge(e, t, U, null, i, q);
            }
        }
        for (var C in i) {
          var U = i[C];
          if (q = n[C], i.hasOwnProperty(C) && (U != null || q != null))
            switch (C) {
              case "type":
                c = U;
                break;
              case "name":
                o = U;
                break;
              case "checked":
                O = U;
                break;
              case "defaultChecked":
                B = U;
                break;
              case "value":
                p = U;
                break;
              case "defaultValue":
                S = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(s(137, t));
                break;
              default:
                U !== q && Ge(
                  e,
                  t,
                  C,
                  U,
                  i,
                  q
                );
            }
        }
        co(
          e,
          p,
          S,
          x,
          O,
          B,
          c,
          o
        );
        return;
      case "select":
        U = p = S = C = null;
        for (c in n)
          if (x = n[c], n.hasOwnProperty(c) && x != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                U = x;
              default:
                i.hasOwnProperty(c) || Ge(
                  e,
                  t,
                  c,
                  null,
                  i,
                  x
                );
            }
        for (o in i)
          if (c = i[o], x = n[o], i.hasOwnProperty(o) && (c != null || x != null))
            switch (o) {
              case "value":
                C = c;
                break;
              case "defaultValue":
                S = c;
                break;
              case "multiple":
                p = c;
              default:
                c !== x && Ge(
                  e,
                  t,
                  o,
                  c,
                  i,
                  x
                );
            }
        t = S, n = p, i = U, C != null ? ni(e, !!n, C, !1) : !!i != !!n && (t != null ? ni(e, !!n, t, !0) : ni(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        U = C = null;
        for (S in n)
          if (o = n[S], n.hasOwnProperty(S) && o != null && !i.hasOwnProperty(S))
            switch (S) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ge(e, t, S, null, i, o);
            }
        for (p in i)
          if (o = i[p], c = n[p], i.hasOwnProperty(p) && (o != null || c != null))
            switch (p) {
              case "value":
                C = o;
                break;
              case "defaultValue":
                U = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(s(91));
                break;
              default:
                o !== c && Ge(e, t, p, o, i, c);
            }
        $d(e, C, U);
        return;
      case "option":
        for (var ie in n)
          if (C = n[ie], n.hasOwnProperty(ie) && C != null && !i.hasOwnProperty(ie))
            switch (ie) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ge(
                  e,
                  t,
                  ie,
                  null,
                  i,
                  C
                );
            }
        for (x in i)
          if (C = i[x], U = n[x], i.hasOwnProperty(x) && C !== U && (C != null || U != null))
            switch (x) {
              case "selected":
                e.selected = C && typeof C != "function" && typeof C != "symbol";
                break;
              default:
                Ge(
                  e,
                  t,
                  x,
                  C,
                  i,
                  U
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
        for (var fe in n)
          C = n[fe], n.hasOwnProperty(fe) && C != null && !i.hasOwnProperty(fe) && Ge(e, t, fe, null, i, C);
        for (O in i)
          if (C = i[O], U = n[O], i.hasOwnProperty(O) && C !== U && (C != null || U != null))
            switch (O) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(s(137, t));
                break;
              default:
                Ge(
                  e,
                  t,
                  O,
                  C,
                  i,
                  U
                );
            }
        return;
      default:
        if (fo(t)) {
          for (var qe in n)
            C = n[qe], n.hasOwnProperty(qe) && C !== void 0 && !i.hasOwnProperty(qe) && Wc(
              e,
              t,
              qe,
              void 0,
              i,
              C
            );
          for (B in i)
            C = i[B], U = n[B], !i.hasOwnProperty(B) || C === U || C === void 0 && U === void 0 || Wc(
              e,
              t,
              B,
              C,
              i,
              U
            );
          return;
        }
    }
    for (var w in n)
      C = n[w], n.hasOwnProperty(w) && C != null && !i.hasOwnProperty(w) && Ge(e, t, w, null, i, C);
    for (q in i)
      C = i[q], U = n[q], !i.hasOwnProperty(q) || C === U || C == null && U == null || Ge(e, t, q, C, i, U);
  }
  function Cm(e) {
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
  function Pv() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var o = n[i], c = o.transferSize, p = o.initiatorType, S = o.duration;
        if (c && S && Cm(p)) {
          for (p = 0, S = o.responseEnd, i += 1; i < n.length; i++) {
            var x = n[i], O = x.startTime;
            if (O > S) break;
            var B = x.transferSize, q = x.initiatorType;
            B && Cm(q) && (x = x.responseEnd, p += B * (x < S ? 1 : (S - O) / (x - O)));
          }
          if (--i, t += 8 * (c + p) / (o.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Pc = null, eu = null;
  function ds(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function zm(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Rm(e, t) {
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
  function tu(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var nu = null;
  function eb() {
    var e = window.event;
    return e && e.type === "popstate" ? e === nu ? !1 : (nu = e, !0) : (nu = null, !1);
  }
  var Um = typeof setTimeout == "function" ? setTimeout : void 0, tb = typeof clearTimeout == "function" ? clearTimeout : void 0, Lm = typeof Promise == "function" ? Promise : void 0, nb = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lm < "u" ? function(e) {
    return Lm.resolve(null).then(e).catch(ab);
  } : Um;
  function ab(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function fa(e) {
    return e === "head";
  }
  function Vm(e, t) {
    var n = t, i = 0;
    do {
      var o = n.nextSibling;
      if (e.removeChild(n), o && o.nodeType === 8)
        if (n = o.data, n === "/$" || n === "/&") {
          if (i === 0) {
            e.removeChild(o), zi(t);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          Mr(e.ownerDocument.documentElement);
        else if (n === "head") {
          n = e.ownerDocument.head, Mr(n);
          for (var c = n.firstChild; c; ) {
            var p = c.nextSibling, S = c.nodeName;
            c[Qi] || S === "SCRIPT" || S === "STYLE" || S === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = p;
          }
        } else
          n === "body" && Mr(e.ownerDocument.body);
      n = o;
    } while (n);
    zi(t);
  }
  function Bm(e, t) {
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
  function au(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          au(n), so(n);
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
  function ib(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var o = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Qi])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Wt(e.nextSibling), e === null) break;
    }
    return null;
  }
  function rb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Wt(e.nextSibling), e === null)) return null;
    return e;
  }
  function Hm(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Wt(e.nextSibling), e === null)) return null;
    return e;
  }
  function iu(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function ru(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function lb(e, t) {
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
  function Wt(e) {
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
  var lu = null;
  function Gm(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Wt(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function qm(e) {
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
  function Im(e, t, n) {
    switch (t = ds(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(s(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(s(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(s(454));
        return e;
      default:
        throw Error(s(451));
    }
  }
  function Mr(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    so(e);
  }
  var Pt = /* @__PURE__ */ new Map(), Km = /* @__PURE__ */ new Set();
  function fs(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ln = k.d;
  k.d = {
    f: sb,
    r: ob,
    D: cb,
    C: ub,
    L: db,
    m: fb,
    X: mb,
    S: pb,
    M: hb
  };
  function sb() {
    var e = Ln.f(), t = as();
    return e || t;
  }
  function ob(e) {
    var t = Pa(e);
    t !== null && t.tag === 5 && t.type === "form" ? sp(t) : Ln.r(e);
  }
  var Di = typeof document > "u" ? null : document;
  function Ym(e, t, n) {
    var i = Di;
    if (i && typeof t == "string" && t) {
      var o = Yt(t);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof n == "string" && (o += '[crossorigin="' + n + '"]'), Km.has(o) || (Km.add(o), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), _t(t, "link", e), mt(t), i.head.appendChild(t)));
    }
  }
  function cb(e) {
    Ln.D(e), Ym("dns-prefetch", e, null);
  }
  function ub(e, t) {
    Ln.C(e, t), Ym("preconnect", e, t);
  }
  function db(e, t, n) {
    Ln.L(e, t, n);
    var i = Di;
    if (i && e && t) {
      var o = 'link[rel="preload"][as="' + Yt(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (o += '[imagesrcset="' + Yt(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (o += '[imagesizes="' + Yt(
        n.imageSizes
      ) + '"]')) : o += '[href="' + Yt(e) + '"]';
      var c = o;
      switch (t) {
        case "style":
          c = Oi(e);
          break;
        case "script":
          c = Ci(e);
      }
      Pt.has(c) || (e = g(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), Pt.set(c, e), i.querySelector(o) !== null || t === "style" && i.querySelector(Dr(c)) || t === "script" && i.querySelector(Or(c)) || (t = i.createElement("link"), _t(t, "link", e), mt(t), i.head.appendChild(t)));
    }
  }
  function fb(e, t) {
    Ln.m(e, t);
    var n = Di;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + Yt(i) + '"][href="' + Yt(e) + '"]', c = o;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Ci(e);
      }
      if (!Pt.has(c) && (e = g({ rel: "modulepreload", href: e }, t), Pt.set(c, e), n.querySelector(o) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Or(c)))
              return;
        }
        i = n.createElement("link"), _t(i, "link", e), mt(i), n.head.appendChild(i);
      }
    }
  }
  function pb(e, t, n) {
    Ln.S(e, t, n);
    var i = Di;
    if (i && e) {
      var o = ei(i).hoistableStyles, c = Oi(e);
      t = t || "default";
      var p = o.get(c);
      if (!p) {
        var S = { loading: 0, preload: null };
        if (p = i.querySelector(
          Dr(c)
        ))
          S.loading = 5;
        else {
          e = g(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = Pt.get(c)) && su(e, n);
          var x = p = i.createElement("link");
          mt(x), _t(x, "link", e), x._p = new Promise(function(O, B) {
            x.onload = O, x.onerror = B;
          }), x.addEventListener("load", function() {
            S.loading |= 1;
          }), x.addEventListener("error", function() {
            S.loading |= 2;
          }), S.loading |= 4, ps(p, t, i);
        }
        p = {
          type: "stylesheet",
          instance: p,
          count: 1,
          state: S
        }, o.set(c, p);
      }
    }
  }
  function mb(e, t) {
    Ln.X(e, t);
    var n = Di;
    if (n && e) {
      var i = ei(n).hoistableScripts, o = Ci(e), c = i.get(o);
      c || (c = n.querySelector(Or(o)), c || (e = g({ src: e, async: !0 }, t), (t = Pt.get(o)) && ou(e, t), c = n.createElement("script"), mt(c), _t(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function hb(e, t) {
    Ln.M(e, t);
    var n = Di;
    if (n && e) {
      var i = ei(n).hoistableScripts, o = Ci(e), c = i.get(o);
      c || (c = n.querySelector(Or(o)), c || (e = g({ src: e, async: !0, type: "module" }, t), (t = Pt.get(o)) && ou(e, t), c = n.createElement("script"), mt(c), _t(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function Xm(e, t, n, i) {
    var o = (o = Se.current) ? fs(o) : null;
    if (!o) throw Error(s(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Oi(n.href), n = ei(
          o
        ).hoistableStyles, i = n.get(t), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Oi(n.href);
          var c = ei(
            o
          ).hoistableStyles, p = c.get(e);
          if (p || (o = o.ownerDocument || o, p = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, p), (c = o.querySelector(
            Dr(e)
          )) && !c._p && (p.instance = c, p.state.loading = 5), Pt.has(e) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Pt.set(e, n), c || yb(
            o,
            e,
            n,
            p.state
          ))), t && i === null)
            throw Error(s(528, ""));
          return p;
        }
        if (t && i !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ci(n), n = ei(
          o
        ).hoistableScripts, i = n.get(t), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(t, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, e));
    }
  }
  function Oi(e) {
    return 'href="' + Yt(e) + '"';
  }
  function Dr(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function km(e) {
    return g({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function yb(e, t, n, i) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? i.loading = 1 : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    }), _t(t, "link", n), mt(t), e.head.appendChild(t));
  }
  function Ci(e) {
    return '[src="' + Yt(e) + '"]';
  }
  function Or(e) {
    return "script[async]" + e;
  }
  function Qm(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + Yt(n.href) + '"]'
          );
          if (i)
            return t.instance = i, mt(i), i;
          var o = g({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), mt(i), _t(i, "style", o), ps(i, n.precedence, e), t.instance = i;
        case "stylesheet":
          o = Oi(n.href);
          var c = e.querySelector(
            Dr(o)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, mt(c), c;
          i = km(n), (o = Pt.get(o)) && su(i, o), c = (e.ownerDocument || e).createElement("link"), mt(c);
          var p = c;
          return p._p = new Promise(function(S, x) {
            p.onload = S, p.onerror = x;
          }), _t(c, "link", i), t.state.loading |= 4, ps(c, n.precedence, e), t.instance = c;
        case "script":
          return c = Ci(n.src), (o = e.querySelector(
            Or(c)
          )) ? (t.instance = o, mt(o), o) : (i = n, (o = Pt.get(c)) && (i = g({}, n), ou(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), mt(o), _t(o, "link", i), e.head.appendChild(o), t.instance = o);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, ps(i, n.precedence, e));
    return t.instance;
  }
  function ps(e, t, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), o = i.length ? i[i.length - 1] : null, c = o, p = 0; p < i.length; p++) {
      var S = i[p];
      if (S.dataset.precedence === t) c = S;
      else if (c !== o) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function su(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function ou(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ms = null;
  function Zm(e, t, n) {
    if (ms === null) {
      var i = /* @__PURE__ */ new Map(), o = ms = /* @__PURE__ */ new Map();
      o.set(n, i);
    } else
      o = ms, i = o.get(n), i || (i = /* @__PURE__ */ new Map(), o.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), o = 0; o < n.length; o++) {
      var c = n[o];
      if (!(c[Qi] || c[gt] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var p = c.getAttribute(t) || "";
        p = e + p;
        var S = i.get(p);
        S ? S.push(c) : i.set(p, [c]);
      }
    }
    return i;
  }
  function Jm(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function gb(e, t, n) {
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
  function Fm(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function vb(e, t, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var o = Oi(i.href), c = t.querySelector(
          Dr(o)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = hs.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, mt(c);
          return;
        }
        c = t.ownerDocument || t, i = km(i), (o = Pt.get(o)) && su(i, o), c = c.createElement("link"), mt(c);
        var p = c;
        p._p = new Promise(function(S, x) {
          p.onload = S, p.onerror = x;
        }), _t(c, "link", i), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = hs.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var cu = 0;
  function bb(e, t) {
    return e.stylesheets && e.count === 0 && gs(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (e.stylesheets && gs(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && cu === 0 && (cu = 62500 * Pv());
      var o = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && gs(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > cu ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(o);
      };
    } : null;
  }
  function hs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) gs(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var ys = null;
  function gs(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, ys = /* @__PURE__ */ new Map(), t.forEach(Sb, e), ys = null, hs.call(e));
  }
  function Sb(e, t) {
    if (!(t.state.loading & 4)) {
      var n = ys.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), ys.set(e, n);
        for (var o = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < o.length; c++) {
          var p = o[c];
          (p.nodeName === "LINK" || p.getAttribute("media") !== "not all") && (n.set(p.dataset.precedence, p), i = p);
        }
        i && n.set(null, i);
      }
      o = t.instance, p = o.getAttribute("data-precedence"), c = n.get(p) || i, c === i && n.set(null, o), n.set(p, o), this.count++, i = hs.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), c ? c.parentNode.insertBefore(o, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Cr = {
    $$typeof: I,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function _b(e, t, n, i, o, c, p, S, x) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ao(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ao(0), this.hiddenUpdates = ao(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = c, this.onRecoverableError = p, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Wm(e, t, n, i, o, c, p, S, x, O, B, q) {
    return e = new _b(
      e,
      t,
      n,
      p,
      x,
      O,
      B,
      q,
      S
    ), t = 1, c === !0 && (t |= 24), c = Vt(3, null, null, t), e.current = c, c.stateNode = e, t = qo(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: t
    }, Xo(c), e;
  }
  function Pm(e) {
    return e ? (e = ui, e) : ui;
  }
  function eh(e, t, n, i, o, c) {
    o = Pm(o), i.context === null ? i.context = o : i.pendingContext = o, i = ta(t), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = na(e, i, t), n !== null && (Rt(n, e, t), dr(n, e, t));
  }
  function th(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function uu(e, t) {
    th(e, t), (e = e.alternate) && th(e, t);
  }
  function nh(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Oa(e, 67108864);
      t !== null && Rt(t, e, 67108864), uu(e, 67108864);
    }
  }
  function ah(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = It();
      t = io(t);
      var n = Oa(e, t);
      n !== null && Rt(n, e, t), uu(e, t);
    }
  }
  var vs = !0;
  function Eb(e, t, n, i) {
    var o = D.T;
    D.T = null;
    var c = k.p;
    try {
      k.p = 2, du(e, t, n, i);
    } finally {
      k.p = c, D.T = o;
    }
  }
  function Ab(e, t, n, i) {
    var o = D.T;
    D.T = null;
    var c = k.p;
    try {
      k.p = 8, du(e, t, n, i);
    } finally {
      k.p = c, D.T = o;
    }
  }
  function du(e, t, n, i) {
    if (vs) {
      var o = fu(i);
      if (o === null)
        Fc(
          e,
          t,
          i,
          bs,
          n
        ), rh(e, i);
      else if (Nb(
        o,
        e,
        t,
        n,
        i
      ))
        i.stopPropagation();
      else if (rh(e, i), t & 4 && -1 < xb.indexOf(e)) {
        for (; o !== null; ) {
          var c = Pa(o);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var p = wa(c.pendingLanes);
                  if (p !== 0) {
                    var S = c;
                    for (S.pendingLanes |= 2, S.entangledLanes |= 2; p; ) {
                      var x = 1 << 31 - Ke(p);
                      S.entanglements[1] |= x, p &= ~x;
                    }
                    hn(c), (ze & 6) === 0 && (ts = xt() + 500, wr(0));
                  }
                }
                break;
              case 31:
              case 13:
                S = Oa(c, 2), S !== null && Rt(S, c, 2), as(), uu(c, 2);
            }
          if (c = fu(i), c === null && Fc(
            e,
            t,
            i,
            bs,
            n
          ), c === o) break;
          o = c;
        }
        o !== null && i.stopPropagation();
      } else
        Fc(
          e,
          t,
          i,
          null,
          n
        );
    }
  }
  function fu(e) {
    return e = mo(e), pu(e);
  }
  var bs = null;
  function pu(e) {
    if (bs = null, e = Wa(e), e !== null) {
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
    return bs = e, null;
  }
  function ih(e) {
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
        switch (to()) {
          case Yi:
            return 2;
          case K:
            return 8;
          case Ae:
          case Et:
            return 32;
          case ja:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var mu = !1, pa = null, ma = null, ha = null, zr = /* @__PURE__ */ new Map(), Rr = /* @__PURE__ */ new Map(), ya = [], xb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function rh(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        pa = null;
        break;
      case "dragenter":
      case "dragleave":
        ma = null;
        break;
      case "mouseover":
      case "mouseout":
        ha = null;
        break;
      case "pointerover":
      case "pointerout":
        zr.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rr.delete(t.pointerId);
    }
  }
  function Ur(e, t, n, i, o, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: c,
      targetContainers: [o]
    }, t !== null && (t = Pa(t), t !== null && nh(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function Nb(e, t, n, i, o) {
    switch (t) {
      case "focusin":
        return pa = Ur(
          pa,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "dragenter":
        return ma = Ur(
          ma,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "mouseover":
        return ha = Ur(
          ha,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "pointerover":
        var c = o.pointerId;
        return zr.set(
          c,
          Ur(
            zr.get(c) || null,
            e,
            t,
            n,
            i,
            o
          )
        ), !0;
      case "gotpointercapture":
        return c = o.pointerId, Rr.set(
          c,
          Ur(
            Rr.get(c) || null,
            e,
            t,
            n,
            i,
            o
          )
        ), !0;
    }
    return !1;
  }
  function lh(e) {
    var t = Wa(e.target);
    if (t !== null) {
      var n = d(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = f(n), t !== null) {
            e.blockedOn = t, bd(e.priority, function() {
              ah(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = y(n), t !== null) {
            e.blockedOn = t, bd(e.priority, function() {
              ah(n);
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
  function Ss(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = fu(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        po = i, n.target.dispatchEvent(i), po = null;
      } else
        return t = Pa(n), t !== null && nh(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function sh(e, t, n) {
    Ss(e) && n.delete(t);
  }
  function jb() {
    mu = !1, pa !== null && Ss(pa) && (pa = null), ma !== null && Ss(ma) && (ma = null), ha !== null && Ss(ha) && (ha = null), zr.forEach(sh), Rr.forEach(sh);
  }
  function _s(e, t) {
    e.blockedOn === t && (e.blockedOn = null, mu || (mu = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      jb
    )));
  }
  var Es = null;
  function oh(e) {
    Es !== e && (Es = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Es === e && (Es = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], i = e[t + 1], o = e[t + 2];
          if (typeof i != "function") {
            if (pu(i || n) === null)
              continue;
            break;
          }
          var c = Pa(n);
          c !== null && (e.splice(t, 3), t -= 3, fc(
            c,
            {
              pending: !0,
              data: o,
              method: n.method,
              action: i
            },
            i,
            o
          ));
        }
      }
    ));
  }
  function zi(e) {
    function t(x) {
      return _s(x, e);
    }
    pa !== null && _s(pa, e), ma !== null && _s(ma, e), ha !== null && _s(ha, e), zr.forEach(t), Rr.forEach(t);
    for (var n = 0; n < ya.length; n++) {
      var i = ya[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < ya.length && (n = ya[0], n.blockedOn === null); )
      lh(n), n.blockedOn === null && ya.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var o = n[i], c = n[i + 1], p = o[Tt] || null;
        if (typeof c == "function")
          p || oh(n);
        else if (p) {
          var S = null;
          if (c && c.hasAttribute("formAction")) {
            if (o = c, p = c[Tt] || null)
              S = p.formAction;
            else if (pu(o) !== null) continue;
          } else S = p.action;
          typeof S == "function" ? n[i + 1] = S : (n.splice(i, 3), i -= 3), oh(n);
        }
      }
  }
  function ch() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(p) {
            return o = p;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      o !== null && (o(), o = null), i || setTimeout(n, 20);
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
      var i = !1, o = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), o !== null && (o(), o = null);
      };
    }
  }
  function hu(e) {
    this._internalRoot = e;
  }
  As.prototype.render = hu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var n = t.current, i = It();
    eh(n, i, e, t, null, null);
  }, As.prototype.unmount = hu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      eh(e.current, 2, null, e, null, null), as(), t[Fa] = null;
    }
  };
  function As(e) {
    this._internalRoot = e;
  }
  As.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = vd();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < ya.length && t !== 0 && t < ya[n].priority; n++) ;
      ya.splice(n, 0, e), n === 0 && lh(e);
    }
  };
  var uh = r.version;
  if (uh !== "19.2.7")
    throw Error(
      s(
        527,
        uh,
        "19.2.7"
      )
    );
  k.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(s(188)) : (e = Object.keys(e).join(","), Error(s(268, e)));
    return e = h(t), e = e !== null ? b(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var wb = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: D,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xs.isDisabled && xs.supportsFiber)
      try {
        Nt = xs.inject(
          wb
        ), Pe = xs;
      } catch {
      }
  }
  return Vr.createRoot = function(e, t) {
    if (!u(e)) throw Error(s(299));
    var n = !1, i = "", o = gp, c = vp, p = bp;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (p = t.onRecoverableError)), t = Wm(
      e,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      o,
      c,
      p,
      ch
    ), e[Fa] = t.current, Jc(e), new hu(t);
  }, Vr.hydrateRoot = function(e, t, n) {
    if (!u(e)) throw Error(s(299));
    var i = !1, o = "", c = gp, p = vp, S = bp, x = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (p = n.onCaughtError), n.onRecoverableError !== void 0 && (S = n.onRecoverableError), n.formState !== void 0 && (x = n.formState)), t = Wm(
      e,
      1,
      !0,
      t,
      n ?? null,
      i,
      o,
      x,
      c,
      p,
      S,
      ch
    ), t.context = Pm(null), n = t.current, i = It(), i = io(i), o = ta(i), o.callback = null, na(n, o, i), n = i, t.current.lanes = n, ki(t, n), hn(t), e[Fa] = t.current, Jc(e), new As(t);
  }, Vr.version = "19.2.7", Vr;
}
var Sh;
function Gb() {
  if (Sh) return vu.exports;
  Sh = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (r) {
        console.error(r);
      }
  }
  return a(), vu.exports = Hb(), vu.exports;
}
var qb = Gb();
const Ib = ["none", "low", "medium", "high", "xhigh", "max"], Kb = ["low", "medium", "high", "xhigh", "max"], Yb = [
  {
    id: "gpt-5.6-sol",
    label: "GPT-5.6 Sol",
    description: "Frontier model for complex professional work",
    codexDefault: "low"
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
], Xb = 300 * 1e3, kb = 500, _h = 256, Qb = 160, Zb = 500, Jb = 300, Fb = /[\u0000-\u001f\u007f]/, kr = /* @__PURE__ */ new Map();
function Wu(a) {
  return typeof a == "string" && a !== "ultra" && /^[a-z][a-z0-9_-]{0,63}$/.test(a);
}
function Us(a, r) {
  if (typeof a != "string" || Fb.test(a)) return;
  const l = a.trim();
  if (l !== "")
    return l.slice(0, r);
}
function Wb(a) {
  const r = Us(a, _h + 1);
  return r && r.length <= _h ? r : void 0;
}
function Pb(a) {
  if (!Array.isArray(a)) return;
  const r = /* @__PURE__ */ new Map();
  for (const l of a) {
    const s = typeof l == "string" ? l : l && typeof l == "object" ? l.effort : void 0;
    if (!Wu(s) || r.has(s)) continue;
    const u = { effort: s };
    if (l && typeof l == "object") {
      const d = l.description, f = Us(d, Jb);
      f && (u.description = f);
    }
    r.set(s, u);
  }
  return r.size > 0 ? Array.from(r.values()) : void 0;
}
function Pu(a) {
  var r;
  return {
    ...a,
    reasoningEfforts: (r = a.reasoningEfforts) == null ? void 0 : r.map((l) => ({ ...l }))
  };
}
function e0(a) {
  return {
    models: a.models.map(Pu),
    capabilities: { ...a.capabilities },
    ...a.source ? { source: a.source } : {}
  };
}
function vy(a) {
  if (!Array.isArray(a)) return [];
  const r = /* @__PURE__ */ new Set(), l = [];
  for (const s of a) {
    if (l.length >= kb) break;
    const u = typeof s == "string" ? { id: s } : s ?? {}, d = Wb(u.id);
    if (!d || r.has(d)) continue;
    r.add(d);
    const f = [u.label, u.display_name, u.name].map((g) => Us(g, Qb)).find(Boolean), y = {
      id: d,
      label: f ?? d
    }, m = Us(u.description, Zb);
    m && (y.description = m);
    const h = u.defaultReasoningEffort ?? u.default_reasoning_effort ?? u.default_reasoning_level;
    Wu(h) && (y.defaultReasoningEffort = h);
    const b = Pb(
      u.reasoningEfforts ?? u.supported_reasoning_efforts ?? u.supported_reasoning_levels ?? u.reasoning_efforts
    );
    b && (y.reasoningEfforts = b), l.push(y);
  }
  return l;
}
function t0(a) {
  return a.filter((r) => r !== "ultra").map((r) => ({ effort: r }));
}
function by(a) {
  if (a !== "openai" && a !== "openai-codex") return [];
  const r = a === "openai" ? Ib : Kb;
  return Yb.map((l) => ({
    id: l.id,
    label: l.label,
    description: l.description,
    defaultReasoningEffort: a === "openai" ? "medium" : l.codexDefault,
    reasoningEfforts: t0(r)
  }));
}
function Mu(a, r) {
  const l = by(a), s = l.find((u) => u.id === r);
  if (s) return s;
  if (r === "gpt-5.6") {
    const u = l.find((d) => d.id === "gpt-5.6-sol");
    if (u) return { ...Pu(u), id: r, label: "GPT-5.6 (Sol alias)" };
  }
}
function Sy(a, r, l) {
  const s = [], u = /* @__PURE__ */ new Map(), d = (y) => {
    var b;
    const m = u.get(y.id);
    if (m === void 0) {
      u.set(y.id, s.length), s.push(Pu(y));
      return;
    }
    const h = s[m];
    s[m] = {
      ...h,
      ...y,
      label: y.label === y.id && h.label !== h.id ? h.label : y.label,
      defaultReasoningEffort: y.defaultReasoningEffort ?? h.defaultReasoningEffort,
      reasoningEfforts: (b = y.reasoningEfforts) != null && b.length ? y.reasoningEfforts.map((g) => ({ ...g })) : h.reasoningEfforts
    };
  };
  by(a).forEach(d), r.forEach((y) => {
    const m = Mu(a, y.id);
    m && d(m), d(y);
  });
  const f = l == null ? void 0 : l.trim();
  return f && !u.has(f) && d(Mu(a, f) ?? { id: f, label: f }), s;
}
function Du(a, r, l = []) {
  var d;
  const s = Mu(a, r), u = l.find((f) => f.id === r);
  return u ? s ? {
    ...s,
    ...u,
    label: u.label === u.id ? s.label : u.label,
    defaultReasoningEffort: u.defaultReasoningEffort ?? s.defaultReasoningEffort,
    reasoningEfforts: (d = u.reasoningEfforts) != null && d.length ? u.reasoningEfforts : s.reasoningEfforts
  } : u : s;
}
function n0(a) {
  let r = 2166136261;
  for (let l = 0; l < a.length; l += 1)
    r ^= a.charCodeAt(l), r = Math.imul(r, 16777619);
  return `${a.length}-${(r >>> 0).toString(36)}`;
}
function Cs(a, r, l) {
  return `${a}:${n0(r ?? "")}:${(l == null ? void 0 : l.trim()) ?? ""}`;
}
function _y(a, r = Date.now()) {
  const l = kr.get(a);
  return l ? l.expiresAt <= r ? (kr.delete(a), null) : e0(l.result) : null;
}
function Ey(a, r, l = Date.now()) {
  kr.set(a, {
    expiresAt: l + Xb,
    result: {
      models: vy(r.models),
      capabilities: {
        reasoningEffort: r.capabilities.reasoningEffort === !0,
        richModelCatalog: r.capabilities.richModelCatalog === !0
      },
      ...r.source ? { source: r.source } : {}
    }
  });
}
function qr(a) {
  const r = `${a}:`;
  for (const l of kr.keys())
    l.startsWith(r) && kr.delete(l);
}
const Vn = {
  provider: "openai",
  models: {
    openai: "gpt-5.6-sol",
    "openai-codex": "gpt-5.6-sol",
    openrouter: "",
    anthropic: "claude-sonnet-4-6",
    custom: ""
  },
  apiKeys: {},
  reasoningEfforts: {},
  providerCapabilities: {},
  customBaseUrl: ""
}, Ay = "settings";
function a0(a, r) {
  const l = {
    ...a.reasoningEfforts
  };
  for (const [s, u] of Object.entries(r.reasoningEfforts ?? {}))
    Wu(u) && (l[s] = u);
  return {
    provider: r.provider ?? a.provider,
    models: { ...a.models, ...r.models },
    apiKeys: { ...a.apiKeys, ...r.apiKeys },
    reasoningEfforts: l,
    // A host upgrade/downgrade must be negotiated again each browser session.
    providerCapabilities: {},
    customBaseUrl: r.customBaseUrl !== void 0 ? r.customBaseUrl : a.customBaseUrl
  };
}
function i0(a) {
  const r = a.storage.get(Ay);
  if (!r) return {
    ...Vn,
    models: { ...Vn.models },
    apiKeys: {},
    reasoningEfforts: { ...Vn.reasoningEfforts },
    providerCapabilities: { ...Vn.providerCapabilities }
  };
  try {
    const l = JSON.parse(r);
    return a0(Vn, l);
  } catch {
    return {
      ...Vn,
      models: { ...Vn.models },
      apiKeys: {},
      reasoningEfforts: { ...Vn.reasoningEfforts },
      providerCapabilities: { ...Vn.providerCapabilities }
    };
  }
}
function r0(a, r) {
  const { providerCapabilities: l, ...s } = r;
  a.storage.set(Ay, JSON.stringify(s));
}
function Ls(a) {
  var l, s;
  const r = (l = a.providerCapabilities) == null ? void 0 : l[a.provider];
  if (!((r == null ? void 0 : r.reasoningEffort) !== !0 || r.reasoningModel !== a.models[a.provider]))
    return (s = a.reasoningEfforts) == null ? void 0 : s[a.provider];
}
function Ou(a, r, l, s, u) {
  var z, A;
  const d = (z = a.providerCapabilities) == null ? void 0 : z[r], f = { ...a.reasoningEfforts }, y = f[r], m = a.models[r] ?? "", h = l.find((H) => H.id === m), b = Du(
    r,
    m,
    Sy(r, l, m)
  ), g = !!((A = b == null ? void 0 : b.reasoningEfforts) != null && A.some(
    (H) => H.effort === y
  )), _ = s.reasoningEffort && s.richModelCatalog && !!h && u !== "fallback" && u !== "stale" && !!y && !g;
  _ && delete f[r];
  const N = !_ && s.reasoningEffort && y && g ? m : void 0;
  return ((d == null ? void 0 : d.reasoningEffort) ?? !1) === s.reasoningEffort && ((d == null ? void 0 : d.richModelCatalog) ?? !1) === s.richModelCatalog && (d == null ? void 0 : d.reasoningModel) === N && !_ ? a : {
    ...a,
    reasoningEfforts: f,
    providerCapabilities: {
      ...a.providerCapabilities,
      [r]: {
        reasoningEffort: s.reasoningEffort,
        richModelCatalog: s.richModelCatalog,
        ...N ? { reasoningModel: N } : {}
      }
    }
  };
}
function l0(a, r) {
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
const Eh = 50, xy = "conversations";
function ed(a) {
  const r = a.storage.get(xy);
  if (!r) return [];
  try {
    return JSON.parse(r);
  } catch {
    return [];
  }
}
function Ah(a) {
  return a.messages.some((r) => {
    var l;
    return (l = r.attachments) == null ? void 0 : l.some((s) => s.dataUrl);
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
function Ns(a, r) {
  try {
    return a.storage.set(xy, JSON.stringify(r)), !0;
  } catch {
    return !1;
  }
}
function Ny(a, r) {
  if (Ns(a, r)) return;
  const l = [...r];
  for (; l.length > 1; )
    if (l.pop(), Ns(a, l)) return;
  Ns(a, r.map(Ah)) || Ns(a, r.slice(0, 1).map(Ah));
}
function Cu(a) {
  return ed(a).sort((r, l) => l.updatedAt - r.updatedAt);
}
function xh(a, r) {
  const l = ed(a), s = l.findIndex((u) => u.id === r.id);
  s >= 0 ? l[s] = r : l.push(r), l.sort((u, d) => d.updatedAt - u.updatedAt), l.length > Eh && l.splice(Eh), Ny(a, l);
}
function s0(a, r) {
  const l = ed(a).filter((s) => s.id !== r);
  Ny(a, l);
}
function Nh(a, r, l) {
  const s = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: s,
    updatedAt: s,
    provider: a,
    model: r,
    ...l ? { reasoningEffort: l } : {},
    messages: []
  };
}
function o0(a) {
  return a.slice(0, 40);
}
function c0() {
  return /* @__PURE__ */ v.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ v.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function u0({ onClick: a }) {
  return /* @__PURE__ */ v.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: a,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ v.jsx(c0, {})
    }
  );
}
const jh = 8 * 1024 * 1024, wh = 2 * 1024 * 1024, $h = 20 * 1024 * 1024, d0 = /* @__PURE__ */ new Set([
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
function jy(a) {
  const r = a.lastIndexOf(".");
  return r >= 0 ? a.slice(r + 1).toLowerCase() : "";
}
function wy(a) {
  const r = (a.type || "").toLowerCase();
  if (r.startsWith("image/")) return "image";
  if (r === "application/pdf") return "pdf";
  if (r.startsWith("text/")) return "text";
  const l = jy(a.name);
  return l === "pdf" ? "pdf" : d0.has(l) ? "image" : "text";
}
function Yr(a) {
  return a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${(a / 1024).toFixed(1)} KB` : `${(a / (1024 * 1024)).toFixed(1)} MB`;
}
const f0 = {
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
function p0(a) {
  return f0[jy(a)] ?? "";
}
function m0(a) {
  return new Promise((r, l) => {
    const s = new FileReader();
    s.onload = () => r(s.result), s.onerror = () => l(s.error ?? new Error("FileReader failed")), s.readAsDataURL(a);
  });
}
const h0 = "4.10.38", Th = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${h0}/build`;
let Eu = null;
function y0() {
  return Eu || (Eu = import(`${Th}/pdf.mjs`).then((r) => {
    const l = r.default ?? r;
    return l.GlobalWorkerOptions.workerSrc = `${Th}/pdf.worker.mjs`, l;
  })), Eu;
}
async function g0(a) {
  const r = await y0(), l = await a.arrayBuffer(), s = await r.getDocument({ data: l }).promise, u = [];
  for (let d = 1; d <= s.numPages; d++) {
    const m = (await (await s.getPage(d)).getTextContent()).items.map((h) => typeof (h == null ? void 0 : h.str) == "string" ? h.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    m && u.push(m);
  }
  return u.join(`

`).trim();
}
async function v0(a, r = {}) {
  const l = wy(a), s = {
    id: crypto.randomUUID(),
    kind: l,
    name: a.name,
    size: a.size,
    mime: a.type || ""
  };
  if (l === "image") {
    if (a.size > jh)
      throw new Error(`Image "${a.name}" is too large (max ${Yr(jh)})`);
    const d = await (r.readDataUrl ?? m0)(a);
    return { ...s, dataUrl: d };
  }
  if (l === "pdf") {
    if (a.size > $h)
      throw new Error(`PDF "${a.name}" is too large (max ${Yr($h)})`);
    let d;
    try {
      d = await (r.loadPdfText ?? g0)(a);
    } catch (f) {
      const y = (f == null ? void 0 : f.message) ?? String(f);
      throw new Error(`Could not read PDF "${a.name}": ${y}`);
    }
    return { ...s, text: d };
  }
  if (a.size > wh)
    throw new Error(`Text file "${a.name}" is too large (max ${Yr(wh)})`);
  const u = await (r.readText ?? ((d) => d.text()))(a);
  return { ...s, text: u };
}
const b0 = /* @__PURE__ */ new Set([
  "openai",
  "openai-codex",
  "openrouter",
  "anthropic",
  "custom"
]);
function $y(a, r, l) {
  const s = r ?? [], u = [];
  a.trim() && u.push(a);
  for (const y of s)
    if ((y.kind === "text" || y.kind === "pdf") && y.text) {
      const m = y.kind === "pdf" ? "" : p0(y.name);
      u.push(`Attached file "${y.name}":
\`\`\`${m}
${y.text}
\`\`\``);
    }
  const d = u.join(`

`), f = s.filter((y) => y.kind === "image" && y.dataUrl);
  if (f.length > 0 && b0.has(l))
    return [
      { type: "text", text: d || "(see attached image)" },
      ...f.map((m) => ({ type: "image_url", image_url: { url: m.dataUrl } }))
    ];
  if (f.length > 0) {
    const y = f.map((m) => `[image attached (not sent to this provider): ${m.name}]`).join(`
`);
    return [d, y].filter(Boolean).join(`

`);
  }
  return d;
}
function Mh(a, r) {
  const l = a.split(`
`);
  for (const s of l) {
    if (!s.startsWith("data: ")) continue;
    const u = s.slice(6).trim();
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
      const y = {
        message: d.message,
        stop_reason: d.stop_reason,
        usage: d.usage ?? {}
      };
      r.onDone(y);
    } else if (f === "error")
      return r.onError(d.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function Ty(a, r, l, s) {
  let u;
  try {
    u = await a.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(r),
      signal: s
    });
  } catch (m) {
    l.onError(`Network error: ${String(m)}`);
    return;
  }
  if (!u.ok) {
    let m = "";
    try {
      m = await u.text(), m.length > 200 && (m = m.slice(0, 200) + "...");
    } catch {
    }
    l.onError(`HTTP ${u.status}: ${m}`);
    return;
  }
  const d = u.body.getReader(), f = new TextDecoder();
  let y = "";
  try {
    for (; ; ) {
      const { done: m, value: h } = await d.read();
      if (m) break;
      y += f.decode(h, { stream: !0 }).replace(/\r\n/g, `
`);
      const b = y.split(`

`);
      y = b.pop() ?? "";
      for (const g of b) {
        if (!g.trim()) continue;
        if (Mh(g, l)) {
          d.cancel().catch(() => {
          });
          return;
        }
      }
    }
    y.trim() && Mh(y, l);
  } catch (m) {
    (m == null ? void 0 : m.name) !== "AbortError" && l.onError(`Stream read error: ${String(m)}`);
  } finally {
    d.releaseLock();
  }
}
async function My(a, r, l, s) {
  var m, h;
  const u = await a.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: r, api_key: l, base_url: s })
  });
  if (!u.ok) {
    let b = "";
    try {
      b = await u.text(), b.length > 200 && (b = b.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${u.status}: ${b}`);
  }
  const d = await u.json(), f = d && typeof d == "object" ? d : {}, y = ["live", "cache", "stale", "fallback"].includes(String(f.source)) ? f.source : void 0;
  return {
    models: vy(f.models),
    capabilities: {
      reasoningEffort: ((m = f.capabilities) == null ? void 0 : m.reasoning_effort) === !0,
      richModelCatalog: ((h = f.capabilities) == null ? void 0 : h.rich_model_catalog) === !0
    },
    ...y ? { source: y } : {}
  };
}
async function S0(a) {
  return (await (await a.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function zu(a) {
  return await (await a.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function _0(a) {
  await a.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const _a = "[REDACTED]";
function nt(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
function E0(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function Aa(a) {
  const r = E0(a);
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
function qn(a) {
  return Array.isArray(a) ? a.map(qn) : nt(a) ? Object.fromEntries(
    Object.entries(a).map(([r, l]) => [
      r,
      Aa(r) ? _a : qn(l)
    ])
  ) : a;
}
function vn(a, r) {
  typeof a == "string" ? a.length > 0 && r.add(a) : Array.isArray(a) ? a.forEach((l) => vn(l, r)) : nt(a) && Object.values(a).forEach((l) => vn(l, r));
}
function Vs(a, r) {
  if (Array.isArray(a))
    a.forEach((l) => Vs(l, r));
  else if (nt(a))
    for (const [l, s] of Object.entries(a))
      Aa(l) ? vn(s, r) : Vs(s, r);
}
function Dh(a, r, l, s) {
  if (!Array.isArray(a)) return;
  const u = /* @__PURE__ */ new Map();
  for (const d of a) {
    if (!nt(d)) continue;
    let f;
    if (d.op === "add_node")
      f = typeof d.node_type == "string" ? d.node_type : void 0, typeof d.ref == "string" && f && u.set(d.ref, f);
    else if (d.op === "set_params") {
      const h = typeof d.node_id == "string" ? d.node_id : void 0;
      f = h ? u.get(h) ?? l.get(h) : void 0;
    } else
      continue;
    if (!nt(d.params)) continue;
    const y = f ? r.get(f) : void 0, m = y ? new Map(y.params.map((h) => [h.name, h])) : void 0;
    for (const [h, b] of Object.entries(d.params)) {
      const g = m == null ? void 0 : m.get(h);
      (!g || g.param_type === "secret" || Aa(h)) && vn(b, s);
    }
  }
}
function A0(a, r, l, s) {
  if (Array.isArray(a))
    for (const u of a) {
      if (!nt(u)) continue;
      const d = typeof u.node_id == "string" ? u.node_id : void 0, f = typeof u.param == "string" ? u.param : void 0, y = d ? l.get(d) : void 0, m = y ? r.get(y) : void 0, h = m == null ? void 0 : m.params.find((b) => b.name === f);
      (!h || h.param_type === "secret" || f && Aa(f)) && vn(u.values, s);
    }
}
function Dy(a, r) {
  for (const l of a.values())
    for (const s of l.params)
      (s.param_type === "secret" || Aa(s.name)) && (vn(s.default, r), vn(s.options, r));
}
function Qr(a, r, l) {
  const s = /* @__PURE__ */ new Set();
  if (Dy(r, s), Vs(a.arguments, s), a.name === "apply_graph_operations")
    Dh(a.arguments.operations, r, l, s);
  else if (a.name === "run_graph_experiments") {
    if (Array.isArray(a.arguments.variants))
      for (const u of a.arguments.variants)
        nt(u) && Dh(u.operations, r, l, s);
    a.arguments.search !== void 0 && vn(a.arguments.search, s);
  } else a.name === "optimize_graph_parameters" && A0(
    a.arguments.bindings,
    r,
    l,
    s
  );
  return s;
}
function Bs(a, r, l) {
  var s;
  Dy(r, l), Vs(a, l), vn(a.presets, l);
  for (const u of a.nodes) {
    const d = (s = u.data) == null ? void 0 : s.params;
    if (!nt(d)) continue;
    const f = typeof u.type == "string" ? r.get(u.type) : void 0, y = f ? new Map(f.params.map((m) => [m.name, m])) : void 0;
    for (const [m, h] of Object.entries(d)) {
      const b = y == null ? void 0 : y.get(m);
      (!b || b.param_type === "secret" || Aa(m)) && vn(h, l);
    }
  }
}
function Ea(a, r) {
  if (typeof a == "string") {
    let l = a;
    for (const s of [...r].sort((u, d) => d.length - u.length))
      l = l.split(s).join(_a);
    return l;
  }
  return Array.isArray(a) ? a.map((l) => Ea(l, r)) : nt(a) ? Object.fromEntries(
    Object.entries(a).map(([l, s]) => [l, Ea(s, r)])
  ) : a;
}
function Li(a) {
  return new Map(a.map((r) => [r.node_name, r]));
}
function Zr(a) {
  return new Map(
    a.filter((r) => typeof r.type == "string").map((r) => [r.id, r.type])
  );
}
function x0(a, r) {
  const l = Li(r), s = /* @__PURE__ */ new Set();
  Bs(a, l, s);
  const u = qn(a);
  if (!nt(u)) return { ...a, nodes: [], edges: [] };
  const d = Array.isArray(u.nodes) ? u.nodes : [];
  a.nodes.forEach((y, m) => {
    const h = d[m];
    !nt(h) || !nt(h.data) || y.data && Object.prototype.hasOwnProperty.call(y.data, "params") && (h.data.params = Ru(
      y.data.params,
      typeof y.type == "string" ? y.type : void 0,
      l
    ));
  });
  const f = Ea(u, s);
  return nt(f) ? f : { nodes: [], edges: [] };
}
function Js(a, r, l, s = []) {
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
  const f = Li(u), y = Zr(d.nodes), m = Qr(a, f, y);
  Bs(d, f, m);
  for (const h of s) {
    const b = Li(h.definitions), g = Zr(h.graph.nodes);
    for (const _ of Qr(a, b, g))
      m.add(_);
    Bs(h.graph, b, m);
  }
  try {
    const h = JSON.parse(r);
    if (Array.isArray(h) || nt(h))
      return JSON.stringify(Ea(qn(h), m));
  } catch {
  }
  return Ea(r, m);
}
function Ru(a, r, l) {
  const s = qn(a);
  if (!nt(s)) return s;
  const u = r ? l.get(r) : void 0, d = u ? new Map(u.params.map((f) => [f.name, f])) : void 0;
  for (const f of Object.keys(s)) {
    const y = d == null ? void 0 : d.get(f);
    (!y || y.param_type === "secret") && (s[f] = _a);
  }
  return s;
}
function Oh(a, r, l) {
  const s = qn(a);
  if (!Array.isArray(s)) return s;
  const u = /* @__PURE__ */ new Map();
  for (const d of s)
    if (nt(d)) {
      if (d.op === "add_node") {
        const f = typeof d.node_type == "string" ? d.node_type : void 0;
        typeof d.ref == "string" && f && u.set(d.ref, f), "params" in d && (d.params = Ru(d.params, f, r));
      } else if (d.op === "set_params") {
        const f = typeof d.node_id == "string" ? d.node_id : void 0, y = f ? u.get(f) ?? l.get(f) : void 0;
        d.params = Ru(d.params, y, r);
      }
    }
  return s;
}
function N0(a, r, l) {
  const s = qn(a);
  if (!Array.isArray(s)) return s;
  for (const u of s) {
    if (!nt(u)) continue;
    const d = typeof u.node_id == "string" ? u.node_id : void 0, f = typeof u.param == "string" ? u.param : void 0, y = d ? l.get(d) : void 0, m = y ? r.get(y) : void 0, h = m == null ? void 0 : m.params.find((b) => b.name === f);
    (!h || h.param_type === "secret") && (u.values = Array.isArray(u.values) ? u.values.map(() => _a) : _a);
  }
  return s;
}
function Oy(a, r) {
  let l = [], s = [];
  try {
    l = r.graph.getNodeDefinitions();
  } catch {
  }
  try {
    s = r.graph.getGraph().nodes;
  } catch {
  }
  const u = Li(l), d = Zr(s), f = qn(a.arguments), y = nt(f) ? f : {};
  if (a.name === "apply_graph_operations")
    y.operations = Oh(a.arguments.operations, u, d);
  else if (a.name === "run_graph_experiments") {
    const b = a.arguments.variants;
    Array.isArray(y.variants) && Array.isArray(b) && y.variants.forEach((g, _) => {
      nt(g) && nt(b[_]) && (g.operations = Oh(
        b[_].operations,
        u,
        d
      ));
    }), a.arguments.search !== void 0 && (y.search = _a);
  } else a.name === "optimize_graph_parameters" && (y.bindings = N0(
    a.arguments.bindings,
    u,
    d
  ));
  const m = Qr(a, u, d), h = Ea(y, m);
  return {
    id: a.id,
    name: a.name,
    arguments: nt(h) ? h : {}
  };
}
function Cy(a, r) {
  let l = [], s = [];
  try {
    l = r.graph.getNodeDefinitions();
  } catch {
  }
  try {
    s = r.graph.getGraph().nodes;
  } catch {
  }
  const u = Li(l), d = Zr(s), f = /* @__PURE__ */ new Set();
  for (const y of a)
    for (const m of Qr(y, u, d))
      f.add(m);
  return a.map((y) => {
    const m = Oy(y, r), h = Ea(m.arguments, f);
    return {
      ...m,
      arguments: nt(h) ? h : {}
    };
  });
}
function Uu(a, r, l) {
  let s = [], u = { nodes: [], edges: [] };
  try {
    s = l.graph.getNodeDefinitions();
  } catch {
  }
  try {
    u = l.graph.getGraph();
  } catch {
  }
  const d = Li(s), f = Zr(u.nodes), y = /* @__PURE__ */ new Set();
  Bs(u, d, y);
  for (const m of r)
    for (const h of Qr(m, d, f))
      y.add(h);
  return Ea(a, y);
}
const js = 3e4;
function j0(a) {
  const r = a.param_type === "secret" || Aa(a.name), l = r ? _a : qn(a.default), s = l == null ? String(l) : typeof l == "object" ? JSON.stringify(l) : String(l), u = s.length > 60 ? s.slice(0, 60) + "..." : s;
  let d = "";
  if (a.param_type === "select" && a.options.length > 0)
    d = r ? `{${_a}}` : `{${a.options.join("|")}}`;
  else if (a.param_type === "int" || a.param_type === "float") {
    const f = a.min_value !== null, y = a.max_value !== null;
    if (f || y) {
      const m = f ? String(a.min_value) : "", h = y ? String(a.max_value) : "";
      d = `{${m}..${h}}`;
    }
  }
  return `${a.name}:${a.param_type}=${u}${d}`;
}
function w0(a) {
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
      const u = r.params.map(j0).join(", ");
      l.push(`params[${u}]`);
    }
    const s = l.length > 0 ? " " + l.join(" ") : "";
    return `${r.node_name}:${s} [category: ${r.category}]`;
  }).join(`
`);
}
function zy(a) {
  return a.map((r) => {
    const l = (r.description || "").replace(/\s+/g, " ").trim(), s = l.length > 100 ? l.slice(0, 100) + "..." : l;
    return `${r.node_name} [${r.category}]${s ? " - " + s : ""}`;
  }).join(`
`);
}
function Ry(a, r = []) {
  const l = x0(a, r), s = JSON.stringify({ nodes: l.nodes, edges: l.edges });
  if (s.length <= js)
    return s;
  const u = [], d = [], f = {
    originalNodes: l.nodes.length,
    includedNodes: 0,
    originalEdges: l.edges.length,
    includedEdges: 0,
    originalChars: s.length,
    limit: js
  }, y = () => JSON.stringify({ nodes: u, edges: d, _truncated: f });
  for (const h of l.nodes)
    if (u.push(h), f.includedNodes = u.length, y().length > js) {
      u.pop(), f.includedNodes = u.length;
      break;
    }
  const m = new Set(u.map((h) => String(h.id ?? "")));
  for (const h of l.edges)
    if (!(!m.has(String(h.source ?? "")) || !m.has(String(h.target ?? ""))) && (d.push(h), f.includedEdges = d.length, y().length > js)) {
      d.pop(), f.includedEdges = d.length;
      break;
    }
  return y();
}
function $0(a, r) {
  const l = zy(a), s = Ry(r, a);
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
${s}`;
}
const T0 = "graph-copilot", M0 = "0.3.0";
function Hs(a) {
  if (a.length === 0 || a.some((u) => !Number.isFinite(u)))
    return;
  let r = 0, l = 0;
  if (a.forEach((u, d) => {
    const f = d + 1, y = u - r;
    r += y / f;
    const m = u - r;
    l += y * m;
  }), !Number.isFinite(r) || !Number.isFinite(l))
    return;
  const s = a.length < 2 ? 0 : l / (a.length - 1);
  if (Number.isFinite(s))
    return { mean: r, variance: Math.max(0, s) };
}
function In(a) {
  var r;
  return (r = Hs(a)) == null ? void 0 : r.mean;
}
function Fs(a) {
  if (a.length < 2) return;
  const r = Hs(a);
  if (!r) return;
  const l = Math.sqrt(r.variance);
  return Number.isFinite(l) ? l : void 0;
}
function zs(a) {
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
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * a)) - zs(1 - a);
  let l = 0.9999999999998099;
  const s = a - 1;
  r.forEach((d, f) => {
    l += d / (s + f + 1);
  });
  const u = s + r.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (s + 0.5) * Math.log(u) - u + Math.log(l);
}
function Ch(a, r, l) {
  const f = a + r, y = a + 1, m = a - 1;
  let h = 1, b = 1 - f * l / y;
  Math.abs(b) < 1e-300 && (b = 1e-300), b = 1 / b;
  let g = b;
  for (let _ = 1; _ <= 200; _ += 1) {
    const N = 2 * _;
    let z = _ * (r - _) * l / ((m + N) * (a + N));
    b = 1 + z * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + z / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b, g *= b * h, z = -((a + _) * (f + _) * l) / ((a + N) * (y + N)), b = 1 + z * b, Math.abs(b) < 1e-300 && (b = 1e-300), h = 1 + z / h, Math.abs(h) < 1e-300 && (h = 1e-300), b = 1 / b;
    const A = b * h;
    if (g *= A, Math.abs(A - 1) <= 3e-14) break;
  }
  return g;
}
function D0(a, r, l) {
  if (a <= 0) return 0;
  if (a >= 1) return 1;
  const s = Math.exp(
    zs(r + l) - zs(r) - zs(l) + r * Math.log(a) + l * Math.log1p(-a)
  );
  return a < (r + 1) / (r + l + 2) ? s * Ch(r, l, a) / r : 1 - s * Ch(l, r, 1 - a) / l;
}
function zh(a, r) {
  if (a === 0) return 0.5;
  const l = r / (r + a * a), s = 0.5 * D0(
    l,
    r / 2,
    0.5
  );
  return a > 0 ? 1 - s : s;
}
function O0(a) {
  if (!Number.isInteger(a) || a < 1) return;
  const r = 0.975;
  let l = 0, s = 1;
  for (; zh(s, a) < r && s < 1e6; ) s *= 2;
  if (!(s >= 1e6)) {
    for (let u = 0; u < 100; u += 1) {
      const d = (l + s) / 2;
      zh(d, a) < r ? l = d : s = d;
    }
    return (l + s) / 2;
  }
}
function Uy(a) {
  if (a.length < 2) return;
  const r = In(a), l = Fs(a), s = a.length - 1, u = O0(s);
  if (r === void 0 || l === void 0 || u === void 0)
    return;
  const d = u * l / Math.sqrt(a.length), f = r - d, y = r + d;
  if ([d, f, y].every(Number.isFinite))
    return {
      confidenceLevel: 0.95,
      degreesOfFreedom: s,
      mean: r,
      margin: d,
      lower: f,
      upper: y
    };
}
const td = Uy;
function C0(a, r) {
  if (a.length < 2 || r.length < 2) return;
  const l = Hs(a), s = Hs(r);
  if (!l || !s) return;
  const u = a.length + r.length - 2, d = ((a.length - 1) * l.variance + (r.length - 1) * s.variance) / u;
  if (!Number.isFinite(d) || d <= 0) return;
  const f = (l.mean - s.mean) / Math.sqrt(d), y = 1 - 3 / (4 * u - 1), m = f * y;
  return Number.isFinite(m) ? m : void 0;
}
function Jr(a, r, l) {
  const s = In(a), u = In(r);
  if (s === void 0 || u === void 0) return;
  const d = s - u, f = l === "maximize" ? d : -d;
  if (!Number.isFinite(d) || !Number.isFinite(f)) return;
  const y = C0(a, r);
  return {
    baselineMean: u,
    candidateMean: s,
    rawDelta: d,
    improvement: f,
    hedgesG: y,
    directionAdjustedHedgesG: y === void 0 ? void 0 : l === "maximize" ? y : -y
  };
}
const z0 = [
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
function ws(a) {
  return a !== void 0 && Number.isFinite(a) ? String(a) : "";
}
function R0(a) {
  return /^[\t\r\n ]*[=+\-@]/.test(a) ? `'${a}` : a;
}
function U0(a) {
  const r = R0(a);
  return /[",\r\n]/.test(r) ? `"${r.replace(/"/g, '""')}"` : r;
}
function L0(a) {
  const r = [z0.slice()];
  return a.runs.forEach((l) => {
    r.push([
      a.id,
      a.createdAt,
      a.hypothesis,
      a.objective.metric,
      a.objective.direction,
      l.variantId,
      l.variantLabel,
      ws(l.repetition),
      l.status,
      l.metricKey ?? "",
      ws(l.metricValue),
      ws(l.runtimeMs),
      l.seed === void 0 ? "" : typeof l.seed == "number" ? ws(l.seed) : l.seed,
      l.error ?? ""
    ]);
  }), r.map((l) => l.map(U0).join(",")).join(`\r
`);
}
function va(a) {
  return Object.is(a, -0) || a === 0 ? "0" : Number(a.toPrecision(6)).toString();
}
function yn(a) {
  return a.replace(/[\r\n]+/g, " ").replace(/`/g, "'").trim();
}
function V0(a) {
  const r = /* @__PURE__ */ new Map();
  return a.runs.forEach((l) => {
    let s = r.get(l.variantId);
    s || (s = {
      id: l.variantId,
      label: l.variantLabel || l.variantId,
      usableValues: [],
      unusableRuns: 0
    }, r.set(l.variantId, s)), l.status === "completed" && Number.isFinite(l.metricValue) ? s.usableValues.push(l.metricValue) : s.unusableRuns += 1;
  }), [...r.values()];
}
function B0(a) {
  var y;
  const r = V0(a), l = r.find((m) => m.id === a.baselineVariantId), s = [], u = [
    `# Research report: ${yn(a.id)}`,
    "",
    "## Study question",
    "",
    `- Hypothesis under test: ${yn(a.hypothesis)}`,
    `- Objective: ${a.objective.direction} \`${yn(a.objective.metric)}\`.`,
    `- Recorded evidence: ${a.runs.length} run(s) across ${r.length} variant(s).`,
    "",
    "## Observations",
    ""
  ];
  r.length === 0 && (u.push("- **[Observation]** No run records were available."), s.push("No run records were available for analysis.")), r.forEach((m) => {
    const h = In(m.usableValues), b = Fs(m.usableValues), g = Uy(m.usableValues), _ = [`n=${m.usableValues.length}`];
    if (h !== void 0 && _.push(`mean=${va(h)}`), b !== void 0 && _.push(`sample SD=${va(b)}`), g ? _.push(`95% Student-t CI=[${va(g.lower)}, ${va(g.upper)}]`) : _.push("95% Student-t CI=unavailable"), l && m.id !== l.id) {
      const N = Jr(
        m.usableValues,
        l.usableValues,
        a.objective.direction
      );
      N && (_.push(`raw delta vs ${yn(l.label)}=${va(N.rawDelta)}`), _.push(`direction-adjusted improvement=${va(N.improvement)}`), N.hedgesG !== void 0 && _.push(`Hedges g=${va(N.hedgesG)}`));
    }
    u.push(`- **[Observation] ${yn(m.label)}:** ${_.join("; ")}.`), m.usableValues.length < 2 && s.push(
      `${m.label} has fewer than two finite completed observations; variability and a confidence interval are unavailable.`
    ), m.unusableRuns > 0 && s.push(
      `${m.label} has ${m.unusableRuns} run(s) excluded because they failed, were incomplete, or had a non-finite objective value.`
    );
  }), a.baselineVariantId && !l && s.push(`Baseline variant '${a.baselineVariantId}' was not present in the run records.`);
  const d = l ? r.filter((m) => m.id !== l.id).map((m) => ({
    variant: m,
    comparison: Jr(
      m.usableValues,
      l.usableValues,
      a.objective.direction
    )
  })).filter((m) => m.comparison !== void 0).sort((m, h) => h.comparison.improvement - m.comparison.improvement) : [];
  u.push(
    "",
    "## Claims and interpretation",
    "",
    "- **[Claim status]** The hypothesis remains a claim under test. These descriptive observations alone do not establish causality, robustness, or external validity."
  ), d[0] ? u.push(
    `- **[Candidate claim]** ${yn(d[0].variant.label)} had the strongest observed direction-adjusted change versus the baseline (${va(d[0].comparison.improvement)}); confirm it with a pre-registered, independently replicated study before treating it as a conclusion.`
  ) : u.push("- **[Candidate claim]** No baseline comparison had enough finite evidence to nominate a directional result.");
  const f = [...a.warnings ?? [], ...s];
  return u.push("", "## Warnings", ""), f.length === 0 ? u.push("- None recorded.") : f.forEach((m) => u.push(`- **[Warning]** ${yn(m)}`)), u.push("", "## Paper leads", ""), (y = a.paperLeads) != null && y.length ? a.paperLeads.forEach((m) => {
    u.push(
      `- **[Paper lead] ${yn(m.title)}** — Evidence: ${yn(m.evidence)} Next study: ${yn(m.nextStep)}`
    );
  }) : u.push("- None recorded."), u.join(`
`);
}
const nd = "codefyui.graph-copilot.study", Gs = 1, Lu = "plugin-canonical-v1", qs = 5 * 1024 * 1024, Rh = 64, Uh = 1e5, Lh = 64 * 1024, Ir = 1e4, Fr = 8, H0 = 16, G0 = 5e3, q0 = 1e4, Vu = 1e3, ad = 512, I0 = 40, K0 = 256, $s = 1e3, Ie = 512, wt = 32 * 1024;
class on extends Error {
  constructor(l, s) {
    super(s);
    en(this, "code");
    this.name = "StudyBundleError", this.code = l;
  }
}
function F(a, r, l) {
  throw new on(a, `${r}: ${l}`);
}
function Ly(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function Bu(a, r, l, s) {
  if (l > Rh && F("LIMIT_EXCEEDED", r, `maximum depth is ${Rh}`), s.values += 1, s.values > Uh && F("LIMIT_EXCEEDED", r, `maximum value count is ${Uh}`), a === null) return "null";
  if (typeof a == "boolean") return a ? "true" : "false";
  if (typeof a == "number")
    return Number.isFinite(a) || F("INVALID_VALUE", r, "numbers must be finite"), JSON.stringify(a);
  if (typeof a == "string")
    return a.length > Lh && F(
      "LIMIT_EXCEEDED",
      r,
      `maximum string length is ${Lh}`
    ), JSON.stringify(a);
  (typeof a != "object" || a === void 0) && F("INVALID_VALUE", r, `unsupported JSON value ${typeof a}`), s.stack.has(a) && F("INVALID_VALUE", r, "cyclic values are not allowed"), s.stack.add(a);
  try {
    if (Array.isArray(a)) {
      a.length > Ir && F(
        "LIMIT_EXCEEDED",
        r,
        `maximum collection size is ${Ir}`
      );
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || F("INVALID_VALUE", `${r}/${d}`, "sparse arrays are not allowed");
      return `[${a.map((d, f) => Bu(
        d,
        `${r}/${f}`,
        l + 1,
        s
      )).join(",")}]`;
    }
    Ly(a) || F("INVALID_VALUE", r, "objects must be plain JSON objects");
    const u = Object.keys(a).sort();
    return u.length > Ir && F(
      "LIMIT_EXCEEDED",
      r,
      `maximum collection size is ${Ir}`
    ), `{${u.map((d) => (d.length > Ie && F("LIMIT_EXCEEDED", r, `object key exceeds ${Ie} characters`), `${JSON.stringify(d)}:${Bu(
      a[d],
      `${r}/${Ws(d)}`,
      l + 1,
      s
    )}`)).join(",")}}`;
  } finally {
    s.stack.delete(a);
  }
}
function Vi(a) {
  return Bu(a, "$", 0, { values: 0, stack: /* @__PURE__ */ new WeakSet() });
}
function Y0(a) {
  return new TextEncoder().encode(a).byteLength;
}
function id(a) {
  const r = Y0(a);
  if (r > qs)
    throw new on(
      "BUNDLE_TOO_LARGE",
      `Study bundle is ${r} bytes; maximum is ${qs}`
    );
}
async function Vy(a) {
  var s;
  const r = (s = globalThis.crypto) == null ? void 0 : s.subtle;
  if (!r)
    throw new on(
      "CRYPTO_UNAVAILABLE",
      "Web Crypto SHA-256 is unavailable in this environment"
    );
  const l = await r.digest("SHA-256", new TextEncoder().encode(a));
  return [...new Uint8Array(l)].map((u) => u.toString(16).padStart(2, "0")).join("");
}
function he(a, r) {
  return Ly(a) || F("INVALID_BUNDLE", r, "expected an object"), a;
}
function De(a, r, l, s) {
  const u = new Set(r);
  for (const d of Object.keys(a))
    u.has(d) || F("INVALID_BUNDLE", `${s}/${Ws(d)}`, "unknown property");
  for (const d of l)
    Object.prototype.hasOwnProperty.call(a, d) || F("INVALID_BUNDLE", s, `missing required property '${d}'`);
}
function Je(a, r, l = Ir) {
  return Array.isArray(a) || F("INVALID_BUNDLE", r, "expected an array"), a.length > l && F("LIMIT_EXCEEDED", r, `maximum item count is ${l}`), a;
}
function ve(a, r, l = Ie, s = !1) {
  return typeof a != "string" && F("INVALID_BUNDLE", r, "expected a string"), (!s && !a.trim() || a.length > l) && F(
    a.length > l ? "LIMIT_EXCEEDED" : "INVALID_BUNDLE",
    r,
    a.length > l ? `maximum length is ${l}` : "must not be empty"
  ), /\u0000/.test(a) && F("INVALID_BUNDLE", r, "NUL characters are not allowed"), a;
}
function yt(a, r) {
  return (typeof a != "number" || !Number.isFinite(a)) && F("INVALID_BUNDLE", r, "expected a finite number"), a;
}
function Wr(a, r, l, s) {
  const u = yt(a, r);
  return (!Number.isInteger(u) || u < l || u > s) && F("INVALID_BUNDLE", r, `expected an integer from ${l} to ${s}`), u;
}
function By(a, r) {
  return typeof a != "boolean" && F("INVALID_BUNDLE", r, "expected a boolean"), a;
}
function Kn(a, r, l) {
  return (typeof a != "string" || !r.includes(a)) && F("INVALID_BUNDLE", l, `expected one of: ${r.join(", ")}`), a;
}
function Pr(a, r) {
  const l = ve(a, r, 64);
  return (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(l) || Number.isNaN(Date.parse(l)) || new Date(l).toISOString() !== l) && F("INVALID_BUNDLE", r, "expected a canonical ISO-8601 UTC timestamp"), l;
}
function Ve(a, r) {
  const l = ve(a, r, 256);
  return (l !== l.trim() || /[\u0000-\u001f\u007f]/.test(l)) && F("INVALID_BUNDLE", r, "id must be trimmed and contain no control characters"), l;
}
function cn(a, r, l) {
  new Set(a).size !== a.length && F("INVALID_BUNDLE", r, `${l} must be unique`);
}
function pe(a, r) {
  return Object.prototype.hasOwnProperty.call(a, r);
}
function Ws(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function ka(a, r) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((s, u) => ka(s, `${r}/${u}`));
    return;
  }
  const l = he(a, r);
  if (pe(l, "$gcpSecretRef")) {
    De(l, ["$gcpSecretRef"], ["$gcpSecretRef"], r), Ve(l.$gcpSecretRef, `${r}/$gcpSecretRef`);
    return;
  }
  for (const [s, u] of Object.entries(l))
    ka(u, `${r}/${Ws(s)}`);
}
function Hy(a, r) {
  const l = he(a, r);
  De(l, ["x", "y"], ["x", "y"], r), yt(l.x, `${r}/x`), yt(l.y, `${r}/y`);
}
function X0(a, r) {
  const l = he(a, r);
  De(
    l,
    ["nodes", "edges", "presets", "segmentGroups", "name", "description"],
    ["nodes", "edges"],
    r
  );
  const s = Je(l.nodes, `${r}/nodes`, G0), u = [];
  s.forEach((m, h) => {
    const b = `${r}/nodes/${h}`, g = he(m, b);
    De(g, ["id", "type", "position", "data"], ["id", "type", "position", "data"], b), u.push(Ve(g.id, `${b}/id`)), ve(g.type, `${b}/type`, Ie), Hy(g.position, `${b}/position`);
    const _ = he(g.data, `${b}/data`);
    ka(_, `${b}/data`);
  }), cn(u, `${r}/nodes`, "node ids");
  const d = new Set(u), f = Je(l.edges, `${r}/edges`, q0), y = [];
  f.forEach((m, h) => {
    const b = `${r}/edges/${h}`, g = he(m, b);
    De(
      g,
      ["id", "source", "target", "sourceHandle", "targetHandle", "type"],
      ["id", "source", "target", "sourceHandle", "targetHandle"],
      b
    ), y.push(Ve(g.id, `${b}/id`));
    const _ = Ve(g.source, `${b}/source`), N = Ve(g.target, `${b}/target`);
    d.has(_) || F("INVALID_BUNDLE", `${b}/source`, "unknown source node"), d.has(N) || F("INVALID_BUNDLE", `${b}/target`, "unknown target node"), ve(g.sourceHandle, `${b}/sourceHandle`, Ie, !0), ve(g.targetHandle, `${b}/targetHandle`, Ie, !0), pe(g, "type") && Kn(g.type, ["data", "trigger"], `${b}/type`);
  }), cn(y, `${r}/edges`, "edge ids"), pe(l, "presets") && Je(l.presets, `${r}/presets`).forEach((h, b) => ka(h, `${r}/presets/${b}`)), pe(l, "segmentGroups") && ka(l.segmentGroups, `${r}/segmentGroups`), pe(l, "name") && ve(l.name, `${r}/name`, Ie, !0), pe(l, "description") && ve(l.description, `${r}/description`, wt, !0);
}
function Vh(a, r) {
  const l = he(a, r);
  ka(l, r);
}
function k0(a, r) {
  const l = he(a, r);
  switch (Kn(
    l.op,
    ["add_node", "connect", "set_params", "remove_node", "remove_edge", "clear_graph", "auto_layout"],
    `${r}/op`
  )) {
    case "add_node":
      De(l, ["op", "node_type", "ref", "params", "position"], ["op", "node_type"], r), ve(l.node_type, `${r}/node_type`, Ie), pe(l, "ref") && Ve(l.ref, `${r}/ref`), pe(l, "params") && Vh(l.params, `${r}/params`), pe(l, "position") && Hy(l.position, `${r}/position`);
      return;
    case "connect":
      De(
        l,
        ["op", "source", "source_handle", "target", "target_handle"],
        ["op", "source", "source_handle", "target", "target_handle"],
        r
      ), Ve(l.source, `${r}/source`), ve(l.source_handle, `${r}/source_handle`, Ie, !0), Ve(l.target, `${r}/target`), ve(l.target_handle, `${r}/target_handle`, Ie, !0);
      return;
    case "set_params":
      De(l, ["op", "node_id", "params"], ["op", "node_id", "params"], r), Ve(l.node_id, `${r}/node_id`), Vh(l.params, `${r}/params`);
      return;
    case "remove_node":
      De(l, ["op", "node_id"], ["op", "node_id"], r), Ve(l.node_id, `${r}/node_id`);
      return;
    case "remove_edge":
      De(
        l,
        ["op", "source", "target", "source_handle", "target_handle"],
        ["op", "source", "target"],
        r
      ), Ve(l.source, `${r}/source`), Ve(l.target, `${r}/target`), pe(l, "source_handle") && ve(l.source_handle, `${r}/source_handle`, Ie, !0), pe(l, "target_handle") && ve(l.target_handle, `${r}/target_handle`, Ie, !0);
      return;
    case "clear_graph":
    case "auto_layout":
      De(l, ["op"], ["op"], r);
  }
}
function Q0(a, r) {
  const l = he(a, r);
  De(
    l,
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    ["pluginId", "pluginVersion", "codefyuiApiVersion"],
    r
  ), Ve(l.pluginId, `${r}/pluginId`), ve(l.pluginVersion, `${r}/pluginVersion`, 128), Wr(l.codefyuiApiVersion, `${r}/codefyuiApiVersion`, 1, 1e3);
}
function Z0(a, r) {
  const l = he(a, r);
  De(l, ["facts"], ["facts"], r);
  const s = Je(l.facts, `${r}/facts`, K0), u = [];
  s.forEach((d, f) => {
    const y = `${r}/facts/${f}`, m = he(d, y);
    De(m, ["key", "status", "source", "collectedAt", "value"], ["key", "status", "source"], y), u.push(ve(m.key, `${y}/key`, Ie));
    const h = Kn(
      m.status,
      ["observed", "declared", "unavailable"],
      `${y}/status`
    );
    ve(m.source, `${y}/source`, Ie), pe(m, "collectedAt") && Pr(m.collectedAt, `${y}/collectedAt`);
    const b = pe(m, "value");
    if (h === "unavailable" && b && F("INVALID_BUNDLE", `${y}/value`, "unavailable facts must not contain a value"), h !== "unavailable" && !b && F("INVALID_BUNDLE", y, `${h} facts require a value`), b) {
      ka(m.value, `${y}/value`);
      const g = /* @__PURE__ */ new Map();
      el(m.value, `${y}/value`, g), g.size > 0 && F(
        "INVALID_BUNDLE",
        `${y}/value`,
        "SecretRefs are allowed only in the replayable study spec"
      );
    }
  }), cn(u, `${r}/facts`, "provenance fact keys");
}
function J0(a, r) {
  const l = he(a, r);
  De(
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
  ), ve(l.hypothesis, `${r}/hypothesis`, wt), X0(l.baseline, `${r}/baseline`);
  const s = he(l.objective, `${r}/objective`);
  De(s, ["metric", "direction"], ["metric", "direction"], `${r}/objective`), ve(s.metric, `${r}/objective/metric`, Ie), Kn(s.direction, ["maximize", "minimize"], `${r}/objective/direction`), Wr(l.repetitions, `${r}/repetitions`, 1, 5), Wr(l.concurrency, `${r}/concurrency`, 1, 2), By(l.applyBestRequested, `${r}/applyBestRequested`);
  const u = Je(l.variants, `${r}/variants`, Fr);
  u.length === 0 && F("INVALID_BUNDLE", `${r}/variants`, "at least one variant is required");
  const d = [];
  u.forEach((f, y) => {
    const m = `${r}/variants/${y}`, h = he(f, m);
    De(h, ["id", "label", "operations"], ["id", "label", "operations"], m), d.push(Ve(h.id, `${m}/id`)), ve(h.label, `${m}/label`, Ie), Je(
      h.operations,
      `${m}/operations`,
      Vu
    ).forEach((g, _) => {
      k0(g, `${m}/operations/${_}`);
    });
  }), cn(d, `${r}/variants`, "variant ids");
}
function F0(a, r) {
  const l = he(a, r);
  De(l, ["phase", "code", "message"], ["phase", "code", "message"], r), Kn(l.phase, ["prepare", "validate", "execute", "metric", "cancel"], `${r}/phase`), ve(l.code, `${r}/code`, Ie), ve(l.message, `${r}/message`, wt);
}
function W0(a, r, l) {
  const s = Je(a, l, H0), u = he(r.spec, "/payload/spec"), d = Je(u.variants, "/payload/spec/variants", Fr), f = new Set(d.map((b, g) => Ve(
    he(b, `/payload/spec/variants/${g}`).id,
    `/payload/spec/variants/${g}/id`
  ))), y = Wr(u.repetitions, "/payload/spec/repetitions", 1, 5), m = [], h = [];
  s.forEach((b, g) => {
    const _ = `${l}/${g}`, N = he(b, _);
    De(
      N,
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
    const z = Ve(N.runKey, `${_}/runKey`);
    m.push(z), pe(N, "runId") && Ve(N.runId, `${_}/runId`), pe(N, "graphId") && Ve(N.graphId, `${_}/graphId`);
    const A = Ve(N.variantId, `${_}/variantId`);
    f.has(A) || F("INVALID_BUNDLE", `${_}/variantId`, "unknown variant id");
    const H = Wr(N.repetition, `${_}/repetition`, 1, y);
    h.push(`${A}\0${H}`);
    const T = Kn(
      N.status,
      ["completed", "failed", "cancelled"],
      `${_}/status`
    );
    pe(N, "startedAt") && Pr(N.startedAt, `${_}/startedAt`), pe(N, "completedAt") && Pr(N.completedAt, `${_}/completedAt`), pe(N, "startedAt") && pe(N, "completedAt") && Date.parse(N.completedAt) < Date.parse(N.startedAt) && F("INVALID_BUNDLE", `${_}/completedAt`, "must not be before startedAt"), yt(N.durationMs, `${_}/durationMs`) < 0 && F("INVALID_BUNDLE", `${_}/durationMs`, "must be non-negative");
    const I = Je(N.metrics, `${_}/metrics`, ad), ae = [];
    I.forEach((Q, ne) => {
      const V = `${_}/metrics/${ne}`, se = he(Q, V);
      De(
        se,
        ["observedKey", "canonicalKey", "value", "source"],
        ["observedKey", "canonicalKey", "value", "source"],
        V
      ), ae.push(ve(se.observedKey, `${V}/observedKey`, Ie)), ve(se.canonicalKey, `${V}/canonicalKey`, Ie), yt(se.value, `${V}/value`), Kn(se.source, ["output_summary", "progress", "client"], `${V}/source`);
    }), cn(ae, `${_}/metrics`, "observed metric keys"), pe(N, "error") && F0(N.error, `${_}/error`), T === "completed" && pe(N, "error") && F("INVALID_BUNDLE", `${_}/error`, "completed runs must not contain an error"), T !== "completed" && !pe(N, "error") && F("INVALID_BUNDLE", _, `${T} runs require an error`);
  }), cn(m, l, "run keys"), cn(h, l, "variant/repetition slots");
}
function P0(a, r) {
  const l = he(a, r);
  De(l, ["title", "evidence", "nextStep"], ["title", "evidence", "nextStep"], r), ve(l.title, `${r}/title`, wt), ve(l.evidence, `${r}/evidence`, wt), ve(l.nextStep, `${r}/nextStep`, wt);
}
function e1(a, r) {
  const l = he(a, r);
  if (De(
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
  ), Ve(l.id, `${r}/id`), ve(l.label, `${r}/label`, Ie), Kn(l.status, ["completed", "invalid", "failed"], `${r}/status`), pe(l, "metricKey") && ve(l.metricKey, `${r}/metricKey`, Ie), Je(l.metricValues, `${r}/metricValues`, 5).forEach((f, y) => {
    yt(f, `${r}/metricValues/${y}`);
  }), pe(l, "mean") && yt(l.mean, `${r}/mean`), pe(l, "stddev") && yt(l.stddev, `${r}/stddev`) < 0 && F("INVALID_BUNDLE", `${r}/stddev`, "must be non-negative"), pe(l, "confidenceInterval95")) {
    const f = he(l.confidenceInterval95, `${r}/confidenceInterval95`);
    De(
      f,
      ["level", "lower", "upper"],
      ["level", "lower", "upper"],
      `${r}/confidenceInterval95`
    ), f.level !== 0.95 && F("INVALID_BUNDLE", `${r}/confidenceInterval95/level`, "must be 0.95");
    const y = yt(f.lower, `${r}/confidenceInterval95/lower`), m = yt(f.upper, `${r}/confidenceInterval95/upper`);
    y > m && F("INVALID_BUNDLE", `${r}/confidenceInterval95`, "lower must not exceed upper");
  }
  if (pe(l, "baselineComparison")) {
    const f = he(l.baselineComparison, `${r}/baselineComparison`);
    De(
      f,
      ["baselineId", "meanDelta", "objectiveImprovement", "hedgesG"],
      ["baselineId", "meanDelta", "objectiveImprovement"],
      `${r}/baselineComparison`
    ), Ve(f.baselineId, `${r}/baselineComparison/baselineId`), yt(f.meanDelta, `${r}/baselineComparison/meanDelta`), yt(
      f.objectiveImprovement,
      `${r}/baselineComparison/objectiveImprovement`
    ), pe(f, "hedgesG") && yt(f.hedgesG, `${r}/baselineComparison/hedgesG`);
  }
  yt(l.runtimeMs, `${r}/runtimeMs`) < 0 && F("INVALID_BUNDLE", `${r}/runtimeMs`, "must be non-negative");
  const u = Je(l.observedMetrics, `${r}/observedMetrics`, ad), d = [];
  u.forEach((f, y) => {
    const m = `${r}/observedMetrics/${y}`, h = he(f, m);
    De(h, ["key", "value"], ["key", "value"], m), d.push(ve(h.key, `${m}/key`, Ie)), yt(h.value, `${m}/value`);
  }), cn(d, `${r}/observedMetrics`, "derived metric keys"), pe(l, "operationSummary") && Je(l.operationSummary, `${r}/operationSummary`, Vu).forEach((f, y) => ve(f, `${r}/operationSummary/${y}`, wt)), Je(l.errors, `${r}/errors`, Vu).forEach((f, y) => ve(f, `${r}/errors/${y}`, wt));
}
function Is(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function Gy(a, r) {
  return Object.is(a, r) || a === r ? !0 : Math.abs(a - r) <= Number.EPSILON * 32 * Math.max(1, Math.abs(a), Math.abs(r));
}
function Sa(a, r, l, s) {
  const u = pe(a, r);
  if (l === void 0) {
    u && F("INVALID_BUNDLE", `${s}/${r}`, "is not supported by the raw run evidence");
    return;
  }
  u || F("INVALID_BUNDLE", s, `${r} is required by the raw run evidence`);
  const d = yt(a[r], `${s}/${r}`);
  Gy(d, l) || F("INVALID_BUNDLE", `${s}/${r}`, `does not match raw run evidence (expected ${l})`);
}
function t1(a, r, l) {
  const s = a.metrics.filter((d) => d.canonicalKey === r);
  if (s.length < 2) return;
  const u = s[0].value;
  s.some((d) => d.value !== u) && F(
    "INVALID_BUNDLE",
    `${l}/metrics`,
    `conflicting duplicate samples resolve to objective identity '${r}'`
  );
}
function qy(a, r, l) {
  const s = [...a.metrics];
  if (s.length === 0) return;
  const u = (b) => (t1(a, b.canonicalKey, l), { key: b.canonicalKey, value: b.value }), d = (b) => new Set(b.map((_) => _.canonicalKey)).size === 1 && b.length > 0 ? u(b[0]) : void 0, f = r.metric.trim(), y = s.find((b) => b.observedKey === f) ?? s.find((b) => b.observedKey.toLowerCase() === f.toLowerCase());
  if (y) return u(y);
  if (f && f.toLowerCase() !== "auto") {
    const b = Is(f);
    return d(s.filter((g) => {
      const _ = Is(g.observedKey);
      return _ === b || _.endsWith(`.${b}`);
    }));
  }
  const m = r.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = s.filter((b) => m.test(b.observedKey));
  return h.length > 0 ? d(h) : r.direction === "minimize" ? d(s.filter((b) => /(^|\.)runtime_ms$/i.test(b.observedKey))) : void 0;
}
function n1(a, r, l) {
  const s = Je(a.metricValues, `${l}/metricValues`, 5).map((u, d) => yt(u, `${l}/metricValues/${d}`));
  (s.length !== r.length || s.some((u, d) => u !== r[d])) && F("INVALID_BUNDLE", `${l}/metricValues`, "does not match completed raw run evidence");
}
function Iy(a) {
  const r = /* @__PURE__ */ new Map();
  for (const l of a)
    for (const s of l.metrics) {
      const u = r.get(s.observedKey) ?? [];
      u.push(s.value), r.set(s.observedKey, u);
    }
  return [...r.entries()].sort(([l], [s]) => l.localeCompare(s)).slice(0, I0).map(([l, s]) => ({ key: l, value: In(s) }));
}
function a1(a, r, l) {
  const s = Je(
    a.observedMetrics,
    `${l}/observedMetrics`,
    ad
  ).map((u, d) => {
    const f = he(u, `${l}/observedMetrics/${d}`);
    return {
      key: ve(f.key, `${l}/observedMetrics/${d}/key`, Ie),
      value: yt(f.value, `${l}/observedMetrics/${d}/value`)
    };
  });
  (s.length !== r.length || s.some((u, d) => u.key !== r[d].key || !Gy(u.value, r[d].value))) && F("INVALID_BUNDLE", `${l}/observedMetrics`, "does not match raw run evidence");
}
function i1(a, r, l, s) {
  const u = l ? td(r) : void 0;
  if (!u) {
    pe(a, "confidenceInterval95") && F(
      "INVALID_BUNDLE",
      `${s}/confidenceInterval95`,
      "is not supported by the raw run evidence"
    );
    return;
  }
  pe(a, "confidenceInterval95") || F("INVALID_BUNDLE", s, "confidenceInterval95 is required by the raw run evidence");
  const d = he(a.confidenceInterval95, `${s}/confidenceInterval95`);
  Sa(d, "lower", u.lower, `${s}/confidenceInterval95`), Sa(d, "upper", u.upper, `${s}/confidenceInterval95`);
}
function r1(a, r, l, s) {
  if (!r) {
    pe(a, "baselineComparison") && F("INVALID_BUNDLE", `${s}/baselineComparison`, "is not supported by the raw run evidence");
    return;
  }
  pe(a, "baselineComparison") || F("INVALID_BUNDLE", s, "baselineComparison is required by the raw run evidence");
  const u = he(a.baselineComparison, `${s}/baselineComparison`);
  u.baselineId !== l && F("INVALID_BUNDLE", `${s}/baselineComparison/baselineId`, "does not match the evidence baseline"), Sa(u, "meanDelta", r.rawDelta, `${s}/baselineComparison`), Sa(
    u,
    "objectiveImprovement",
    r.improvement,
    `${s}/baselineComparison`
  ), Sa(u, "hedgesG", r.hedgesG, `${s}/baselineComparison`);
}
function l1(a, r, l) {
  const s = r.spec, u = r.runs, f = a.variants.map((A, H) => {
    var be;
    const T = `${l}/variants/${H}`, R = he(A, T), I = R.id, ae = R.label, Q = u.filter((D) => D.variantId === I).sort((D, k) => D.repetition - k.repetition || D.runKey.localeCompare(k.runKey)), ne = Q.filter((D) => D.status === "completed"), V = ne.map((D) => qy(D, s.objective, `/payload/runs/${u.indexOf(D)}`)).filter((D) => D !== void 0), se = new Set(V.map((D) => D.key)), ue = V.map((D) => D.value), Y = se.size === 1 ? (be = V[0]) == null ? void 0 : be.key : void 0, X = ne.length === s.repetitions && V.length === s.repetitions && se.size === 1, oe = R.status;
    oe === "invalid" && Q.length > 0 && F("INVALID_BUNDLE", `${T}/status`, "invalid variants must not contain execution runs");
    const ye = oe === "invalid" ? "invalid" : X ? "completed" : "failed";
    Y === void 0 ? pe(R, "metricKey") && F("INVALID_BUNDLE", `${T}/metricKey`, "is not supported by the raw run evidence") : R.metricKey !== Y && F(
      "INVALID_BUNDLE",
      `${T}/metricKey`,
      `does not match raw run identity '${Y}'`
    );
    const re = In(Q.map((D) => D.durationMs)) ?? 0;
    return Sa(R, "runtimeMs", re, T), a1(R, Iy(Q), T), {
      record: R,
      id: I,
      label: ae,
      values: ue,
      ...Y === void 0 ? {} : { metricKey: Y },
      fullyObserved: X,
      preRankingStatus: ye,
      finalStatus: ye,
      ...X ? { mean: In(ue) } : {}
    };
  });
  new Set(
    f.filter((A) => A.preRankingStatus === "completed" && A.metricKey).map((A) => Is(A.metricKey))
  ).size > 1 && f.forEach((A) => {
    A.preRankingStatus === "completed" && (A.finalStatus = "failed");
  }), f.forEach((A, H) => {
    const T = `${l}/variants/${H}`;
    A.record.status !== A.finalStatus && F(
      "INVALID_BUNDLE",
      `${T}/status`,
      `does not match raw run evidence (expected ${A.finalStatus})`
    );
    const R = A.preRankingStatus === "completed" && A.finalStatus === "failed";
    n1(
      A.record,
      R ? [] : A.values,
      T
    ), i1(
      A.record,
      A.values,
      A.finalStatus === "completed",
      T
    );
    const I = A.finalStatus === "completed" ? A.mean : void 0;
    Sa(A.record, "mean", I, T), Sa(
      A.record,
      "stddev",
      A.finalStatus === "completed" ? Fs(A.values) : void 0,
      T
    );
  });
  const m = pe(a, "baselineVariantId") ? a.baselineVariantId : void 0;
  if (m !== void 0) {
    const A = s.variants.filter((T) => T.operations.length === 0);
    (A.length !== 1 || A[0].id !== m) && F(
      "INVALID_BUNDLE",
      `${l}/baselineVariantId`,
      "must identify the single zero-operation baseline from the study spec"
    );
    const H = f.find((T) => T.id === m);
    f.forEach((T, R) => {
      const I = T.id !== m && H.finalStatus === "completed" && T.finalStatus === "completed" ? Jr(T.values, H.values, s.objective.direction) : void 0;
      r1(
        T.record,
        I,
        m,
        `${l}/variants/${R}`
      );
    });
  }
  const h = f.filter((A) => A.finalStatus === "completed" && A.mean !== void 0).sort((A, H) => (s.objective.direction === "maximize" ? H.mean - A.mean : A.mean - H.mean) || A.id.localeCompare(H.id)), b = h[0], g = b ? Math.max(1, Math.abs(b.mean)) * Number.EPSILON * 8 : 0, N = (b ? h.filter((A) => Math.abs(A.mean - b.mean) <= g) : []).length === 1 ? b : void 0;
  N ? (a.winnerId !== N.id || a.winnerLabel !== N.label) && F(
    "INVALID_BUNDLE",
    `${l}/winnerId`,
    `does not match the raw-run winner '${N.id}'`
  ) : (pe(a, "winnerId") || pe(a, "winnerLabel")) && F("INVALID_BUNDLE", `${l}/winnerId`, "no unique winner is supported by the raw run evidence");
  const z = h.length === 0 ? "failed" : f.every((A) => A.finalStatus === "completed") ? "completed" : "partial";
  a.status !== z && F(
    "INVALID_BUNDLE",
    `${l}/status`,
    `does not match raw run evidence (expected ${z})`
  );
}
function s1(a, r, l) {
  const s = he(a, l);
  De(
    s,
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
  ), Kn(s.status, ["completed", "partial", "failed"], `${l}/status`);
  const u = Je(s.variants, `${l}/variants`, Fr), d = [], f = /* @__PURE__ */ new Map();
  u.forEach((g, _) => {
    e1(g, `${l}/variants/${_}`);
    const N = he(g, `${l}/variants/${_}`), z = Ve(N.id, `${l}/variants/${_}/id`);
    d.push(z), f.set(z, ve(N.label, `${l}/variants/${_}/label`, Ie));
  }), cn(d, `${l}/variants`, "derived variant ids");
  const y = he(r.spec, "/payload/spec"), m = /* @__PURE__ */ new Map(), h = Je(y.variants, "/payload/spec/variants", Fr).map((g, _) => {
    const N = he(g, `/payload/spec/variants/${_}`), z = Ve(N.id, `/payload/spec/variants/${_}/id`);
    return m.set(
      z,
      ve(N.label, `/payload/spec/variants/${_}/label`, Ie)
    ), z;
  });
  (d.length !== h.length || d.some((g) => !h.includes(g))) && F("INVALID_BUNDLE", `${l}/variants`, "must match spec variant ids exactly");
  for (const g of d)
    f.get(g) !== m.get(g) && F("INVALID_BUNDLE", `${l}/variants`, `label for variant '${g}' does not match the spec`);
  if (pe(s, "baselineVariantId")) {
    const g = Ve(s.baselineVariantId, `${l}/baselineVariantId`);
    f.has(g) || F("INVALID_BUNDLE", `${l}/baselineVariantId`, "unknown baseline variant"), u.forEach((_, N) => {
      const z = he(_, `${l}/variants/${N}`);
      if (!pe(z, "baselineComparison")) return;
      he(
        z.baselineComparison,
        `${l}/variants/${N}/baselineComparison`
      ).baselineId !== g && F(
        "INVALID_BUNDLE",
        `${l}/variants/${N}/baselineComparison/baselineId`,
        "must match derived baselineVariantId"
      );
    });
  } else u.some((g) => pe(he(g, l), "baselineComparison")) && F("INVALID_BUNDLE", `${l}/variants`, "baselineComparison requires baselineVariantId");
  if (pe(s, "winnerId")) {
    const g = Ve(s.winnerId, `${l}/winnerId`);
    f.has(g) || F("INVALID_BUNDLE", `${l}/winnerId`, "unknown winner variant"), pe(s, "winnerLabel") && ve(s.winnerLabel, `${l}/winnerLabel`, Ie) !== f.get(g) && F("INVALID_BUNDLE", `${l}/winnerLabel`, "does not match the winner variant label");
  } else pe(s, "winnerLabel") && F("INVALID_BUNDLE", `${l}/winnerLabel`, "winnerLabel requires winnerId");
  if (pe(s, "appliedVariantId")) {
    const g = Ve(s.appliedVariantId, `${l}/appliedVariantId`);
    f.has(g) || F("INVALID_BUNDLE", `${l}/appliedVariantId`, "unknown applied variant");
  }
  pe(s, "applyConflict") && ve(s.applyConflict, `${l}/applyConflict`, wt);
  const b = he(s.insights, `${l}/insights`);
  De(b, ["summary", "warnings", "paperIdeas"], ["summary", "warnings", "paperIdeas"], `${l}/insights`), Je(b.summary, `${l}/insights/summary`, 1e3).forEach((g, _) => ve(g, `${l}/insights/summary/${_}`, wt)), Je(b.warnings, `${l}/insights/warnings`, 1e3).forEach((g, _) => ve(g, `${l}/insights/warnings/${_}`, wt)), Je(b.paperIdeas, `${l}/insights/paperIdeas`, 1e3).forEach((g, _) => P0(g, `${l}/insights/paperIdeas/${_}`)), l1(s, r, l);
}
function Bh(a) {
  return a.startsWith("/") && !/~(?:[^01]|$)/.test(a);
}
function el(a, r, l) {
  if (!a || typeof a != "object") return;
  if (Array.isArray(a)) {
    a.forEach((u, d) => el(u, `${r}/${d}`, l));
    return;
  }
  const s = he(a, r);
  if (pe(s, "$gcpSecretRef")) {
    De(s, ["$gcpSecretRef"], ["$gcpSecretRef"], r);
    const u = Ve(s.$gcpSecretRef, `${r}/$gcpSecretRef`), d = l.get(u) ?? [];
    d.push(r), l.set(u, d);
    return;
  }
  for (const [u, d] of Object.entries(s))
    el(d, `${r}/${Ws(u)}`, l);
}
function o1(a, r, l) {
  const s = he(a, l);
  De(
    s,
    ["policy", "secretRequirements", "textRedactions"],
    ["policy", "secretRequirements", "textRedactions"],
    l
  ), s.policy !== "explicit-secret-ref-v1" && F("INVALID_BUNDLE", `${l}/policy`, "expected 'explicit-secret-ref-v1'");
  const u = Je(
    s.secretRequirements,
    `${l}/secretRequirements`,
    $s
  ), d = [], f = /* @__PURE__ */ new Map();
  u.forEach((N, z) => {
    const A = `${l}/secretRequirements/${z}`, H = he(N, A);
    De(
      H,
      ["id", "locations", "reason", "requiredAtReplay", "nodeType", "parameter"],
      ["id", "locations", "reason", "requiredAtReplay"],
      A
    );
    const T = Ve(H.id, `${A}/id`);
    d.push(T);
    const R = Je(H.locations, `${A}/locations`, $s).map((I, ae) => {
      const Q = ve(
        I,
        `${A}/locations/${ae}`,
        wt
      );
      return Bh(Q) || F("INVALID_BUNDLE", `${A}/locations/${ae}`, "expected a valid JSON Pointer"), Q;
    });
    R.length === 0 && F("INVALID_BUNDLE", `${A}/locations`, "at least one location is required"), cn(R, `${A}/locations`, "secret locations"), f.set(T, [...R].sort()), ve(H.reason, `${A}/reason`, wt), By(H.requiredAtReplay, `${A}/requiredAtReplay`), pe(H, "nodeType") && ve(H.nodeType, `${A}/nodeType`, Ie), pe(H, "parameter") && ve(H.parameter, `${A}/parameter`, Ie);
  }), cn(d, `${l}/secretRequirements`, "secret requirement ids"), Je(
    s.textRedactions,
    `${l}/textRedactions`,
    $s
  ).forEach((N, z) => {
    const A = `${l}/textRedactions/${z}`, H = he(N, A);
    De(H, ["locations", "reason"], ["locations", "reason"], A);
    const T = Je(H.locations, `${A}/locations`, $s);
    T.length === 0 && F("INVALID_BUNDLE", `${A}/locations`, "at least one location is required"), T.forEach((R, I) => {
      const ae = ve(R, `${A}/locations/${I}`, wt);
      Bh(ae) || F("INVALID_BUNDLE", `${A}/locations/${I}`, "expected a valid JSON Pointer");
    }), ve(H.reason, `${A}/reason`, wt);
  });
  const m = /* @__PURE__ */ new Map(), h = he(r.spec, "/payload/spec");
  el(h.baseline, "/spec/baseline", m), Je(h.variants, "/payload/spec/variants", Fr).forEach((N, z) => {
    const A = he(N, `/payload/spec/variants/${z}`);
    el(A.operations, `/spec/variants/${z}/operations`, m);
  });
  const g = [...m.keys()].sort(), _ = [...f.keys()].sort();
  (g.length !== _.length || g.some((N, z) => N !== _[z])) && F(
    "INVALID_BUNDLE",
    `${l}/secretRequirements`,
    `must declare exactly the SecretRefs used by the spec (used: ${g.join(", ") || "none"})`
  );
  for (const N of g) {
    const z = [...m.get(N)].sort(), A = f.get(N);
    (z.length !== A.length || z.some((H, T) => H !== A[T])) && F(
      "INVALID_BUNDLE",
      `${l}/secretRequirements`,
      `locations for SecretRef '${N}' do not match the spec`
    );
  }
}
function c1(a, r) {
  const l = he(a, r);
  De(
    l,
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    ["id", "createdAt", "completedAt", "producer", "provenance", "spec", "runs", "derived", "redactionReport"],
    r
  ), Ve(l.id, `${r}/id`);
  const s = Pr(l.createdAt, `${r}/createdAt`), u = Pr(l.completedAt, `${r}/completedAt`);
  return Date.parse(u) < Date.parse(s) && F("INVALID_BUNDLE", `${r}/completedAt`, "must not be before createdAt"), Q0(l.producer, `${r}/producer`), Z0(l.provenance, `${r}/provenance`), J0(l.spec, `${r}/spec`), W0(l.runs, l, `${r}/runs`), s1(l.derived, l, `${r}/derived`), o1(l.redactionReport, l, `${r}/redactionReport`), l;
}
function u1(a, r) {
  const l = he(a, r);
  De(
    l,
    ["algorithm", "canonicalization", "contentSha256"],
    ["algorithm", "canonicalization", "contentSha256"],
    r
  ), l.algorithm !== "SHA-256" && F("INVALID_BUNDLE", `${r}/algorithm`, "expected 'SHA-256'"), l.canonicalization !== Lu && F("INVALID_BUNDLE", `${r}/canonicalization`, `expected '${Lu}'`);
  const s = ve(l.contentSha256, `${r}/contentSha256`, 64);
  return /^[a-f0-9]{64}$/.test(s) || F("INVALID_BUNDLE", `${r}/contentSha256`, "expected 64 lowercase hexadecimal characters"), l;
}
function d1(a) {
  Vi(a);
  const r = he(a, "/");
  if (r.format !== nd)
    throw new on(
      "UNSUPPORTED_FORMAT",
      `Unsupported study bundle format '${String(r.format ?? "")}'`
    );
  if (typeof r.formatVersion != "number" || !Number.isInteger(r.formatVersion))
    throw new on("UNSUPPORTED_VERSION", "Study bundle formatVersion must be an integer");
  if (r.formatVersion > Gs)
    throw new on(
      "FUTURE_VERSION",
      `Study bundle version ${r.formatVersion} requires a newer Graph Copilot`
    );
  if (r.formatVersion !== Gs)
    throw new on(
      "UNSUPPORTED_VERSION",
      `Study bundle version ${r.formatVersion} is not supported`
    );
  De(r, ["format", "formatVersion", "payload", "integrity"], ["format", "formatVersion", "payload", "integrity"], "/");
  const l = c1(r.payload, "/payload"), s = u1(r.integrity, "/integrity");
  return { root: r, payload: l, integrity: s };
}
function Ky(a) {
  return {
    format: nd,
    formatVersion: Gs,
    payload: a
  };
}
function Yy(a, r = /* @__PURE__ */ new WeakSet()) {
  if (!a || typeof a != "object" || r.has(a)) return a;
  r.add(a);
  for (const l of Object.values(a)) Yy(l, r);
  return Object.freeze(a);
}
function Xy(a) {
  return JSON.parse(Vi(a));
}
function Au(a, r) {
  return a === void 0 ? {} : { [r]: a };
}
function f1(a, r, l) {
  const s = a.variants.map((g) => {
    var se;
    const _ = l.filter((ue) => ue.variantId === g.id).sort((ue, Y) => ue.repetition - Y.repetition || ue.runKey.localeCompare(Y.runKey)), N = _.filter((ue) => ue.status === "completed"), z = N.map((ue) => qy(ue, r.objective, `/payload/runs/${l.indexOf(ue)}`)).filter((ue) => ue !== void 0), A = new Set(z.map((ue) => ue.key)), H = z.map((ue) => ue.value), T = A.size === 1 ? (se = z[0]) == null ? void 0 : se.key : void 0, R = N.length === r.repetitions && z.length === r.repetitions && A.size === 1, I = g.status === "invalid" ? "invalid" : R ? "completed" : "failed", ae = R ? td(H) : void 0, Q = R ? In(H) : void 0, ne = R ? Fs(H) : void 0, V = {
      id: g.id,
      label: g.label,
      status: I,
      ...T === void 0 ? {} : { metricKey: T },
      metricValues: H,
      ...Q === void 0 ? {} : { mean: Q },
      ...ne === void 0 ? {} : { stddev: ne },
      ...ae === void 0 ? {} : {
        confidenceInterval95: {
          level: 0.95,
          lower: ae.lower,
          upper: ae.upper
        }
      },
      runtimeMs: In(_.map((ue) => ue.durationMs)) ?? 0,
      observedMetrics: Iy(_),
      ...g.operationSummary === void 0 ? {} : { operationSummary: [...g.operationSummary] },
      errors: [...g.errors]
    };
    return {
      id: g.id,
      label: g.label,
      values: H,
      ...T === void 0 ? {} : { metricKey: T },
      preRankingStatus: I,
      result: V
    };
  });
  if (new Set(
    s.filter((g) => g.preRankingStatus === "completed" && g.metricKey).map((g) => Is(g.metricKey))
  ).size > 1 && s.forEach((g) => {
    if (g.preRankingStatus !== "completed") return;
    const {
      mean: _,
      stddev: N,
      confidenceInterval95: z,
      baselineComparison: A,
      ...H
    } = g.result;
    g.result = { ...H, status: "failed", metricValues: [] };
  }), a.baselineVariantId !== void 0) {
    const g = s.find((_) => _.id === a.baselineVariantId);
    (g == null ? void 0 : g.result.status) === "completed" && s.forEach((_) => {
      if (_.id === g.id || _.result.status !== "completed") return;
      const N = Jr(_.values, g.values, r.objective.direction);
      N && (_.result = {
        ..._.result,
        baselineComparison: {
          baselineId: g.id,
          meanDelta: N.rawDelta,
          objectiveImprovement: N.improvement,
          ...N.hedgesG === void 0 ? {} : { hedgesG: N.hedgesG }
        }
      });
    });
  }
  const d = s.filter((g) => g.result.status === "completed" && g.result.mean !== void 0).sort((g, _) => (r.objective.direction === "maximize" ? _.result.mean - g.result.mean : g.result.mean - _.result.mean) || g.id.localeCompare(_.id)), f = d[0], y = f ? Math.max(1, Math.abs(f.result.mean)) * Number.EPSILON * 8 : 0, h = (f ? d.filter((g) => Math.abs(g.result.mean - f.result.mean) <= y) : []).length === 1 ? f : void 0;
  return {
    status: d.length === 0 ? "failed" : s.every((g) => g.result.status === "completed") ? "completed" : "partial",
    variants: s.map((g) => g.result),
    ...Au(a.baselineVariantId, "baselineVariantId"),
    ...h === void 0 ? {} : { winnerId: h.id, winnerLabel: h.label },
    ...Au(a.appliedVariantId, "appliedVariantId"),
    ...Au(a.applyConflict, "applyConflict"),
    insights: {
      summary: [...a.insights.summary],
      warnings: [...a.insights.warnings],
      paperIdeas: a.insights.paperIdeas.map((g) => ({ ...g }))
    }
  };
}
async function rd(a) {
  const { payload: r, integrity: l } = d1(a), s = await Vy(Vi(Ky(r)));
  if (s !== l.contentSha256)
    throw new on(
      "INTEGRITY_MISMATCH",
      `Study bundle integrity mismatch: expected ${s}, received ${l.contentSha256}`
    );
  const u = Xy(a);
  return id(Vi(u)), Yy(u);
}
async function p1(a) {
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
    derived: f1(a.session, r, a.runs),
    redactionReport: a.redactionReport
  }, s = Xy(l), u = await Vy(Vi(Ky(s)));
  return rd({
    format: nd,
    formatVersion: Gs,
    payload: s,
    integrity: {
      algorithm: "SHA-256",
      canonicalization: Lu,
      contentSha256: u
    }
  });
}
async function ld(a) {
  const r = await rd(a), l = Vi(r);
  return id(l), l;
}
async function sd(a) {
  if (typeof a != "string")
    throw new on("INVALID_JSON", "Study bundle input must be text");
  id(a);
  let r;
  try {
    r = JSON.parse(a);
  } catch (l) {
    throw new on("INVALID_JSON", `Study bundle is not valid JSON: ${String(l)}`);
  }
  return rd(r);
}
const m1 = "graph-copilot", h1 = "[REDACTED]", y1 = "Exact echoes of values removed by capture redaction were removed from text. Arbitrary unrelated secrets in ordinary strings cannot be detected.", g1 = "A credential-shaped field outside the replayable graph spec was removed.";
class v1 extends Error {
  constructor(l, s) {
    super(`${l}: ${s}`);
    en(this, "path");
    this.name = "StudyCaptureError", this.path = l;
  }
}
function Me(a, r) {
  throw new v1(a, r);
}
function Ii(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function gn(a, r) {
  return Ii(a) || Me(r, "expected a plain object"), a;
}
function Ut(a, r, l = !1) {
  return (typeof a != "string" || !l && a.length === 0) && Me(r, l ? "expected a string" : "expected a non-empty string"), a;
}
function Bi(a, r) {
  return (typeof a != "number" || !Number.isFinite(a)) && Me(r, "expected a finite number"), a;
}
function ol(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function b1(a) {
  return a.replace(/([a-z0-9])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}
function Qa(a) {
  const r = b1(a);
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
function Hi(a, r, l = /* @__PURE__ */ new WeakSet()) {
  if (typeof a == "string") {
    a.length > 0 && r.add(a);
    return;
  }
  if (Array.isArray(a)) {
    if (l.has(a)) return;
    l.add(a), a.forEach((s) => Hi(s, r, l)), l.delete(a);
    return;
  }
  if (Ii(a)) {
    if (l.has(a)) return;
    l.add(a), Object.values(a).forEach((s) => Hi(s, r, l)), l.delete(a);
  }
}
function Xa(a, r, l = /* @__PURE__ */ new WeakSet()) {
  if (Array.isArray(a)) {
    if (l.has(a)) return;
    l.add(a), a.forEach((s) => Xa(s, r, l)), l.delete(a);
    return;
  }
  if (Ii(a) && !l.has(a)) {
    l.add(a);
    for (const [s, u] of Object.entries(a))
      Qa(s) ? Hi(u, r) : Xa(u, r, l);
    l.delete(a);
  }
}
function S1(a) {
  const r = /* @__PURE__ */ new Map();
  return a.forEach((l, s) => {
    const u = Ut(l == null ? void 0 : l.node_name, `definitions[${s}].node_name`);
    r.has(u) && Me(`definitions[${s}].node_name`, `duplicate node definition '${u}'`);
    const d = /* @__PURE__ */ new Set();
    Array.isArray(l.params) || Me(`definitions[${s}].params`, "expected an array"), l.params.forEach((f, y) => {
      const m = Ut(
        f == null ? void 0 : f.name,
        `definitions[${s}].params[${y}].name`
      );
      d.has(m) && Me(
        `definitions[${s}].params[${y}].name`,
        `duplicate parameter definition '${m}'`
      ), d.add(m);
    }), r.set(u, l);
  }), r;
}
function ky(a) {
  const r = /* @__PURE__ */ new Map();
  return a.forEach((l) => {
    typeof (l == null ? void 0 : l.id) == "string" && typeof l.type == "string" && r.set(l.id, l.type);
  }), r;
}
function _1(a, r, l) {
  if (a.op === "add_node") {
    const s = typeof a.node_type == "string" ? a.node_type : void 0;
    return s && typeof a.ref == "string" && l.set(a.ref, s), s;
  }
  if (a.op === "set_params") {
    const s = typeof a.node_id == "string" ? a.node_id : void 0;
    return s ? l.get(s) ?? r.get(s) : void 0;
  }
  a.op === "remove_node" && typeof a.node_id == "string" ? (l.delete(a.node_id), r.delete(a.node_id)) : a.op === "clear_graph" && (r.clear(), l.clear());
}
function Hh(a, r, l, s) {
  if (Xa(a, s), !Ii(a)) return;
  const u = r ? l.get(r) : void 0, d = Qy(u);
  for (const [f, y] of Object.entries(a)) {
    const m = d == null ? void 0 : d.get(f);
    (!u || !m || m.param_type === "secret" || Qa(f)) && Hi(y, s);
  }
}
function E1(a, r) {
  var f;
  const l = /* @__PURE__ */ new Set(), { baseline: s, request: u } = a;
  for (const y of r.values())
    for (const m of y.params)
      Xa(m.default, l), (m.param_type === "secret" || Qa(m.name)) && Hi(m.default, l);
  Xa(s, l), Xa(u, l), Xa(a.provenanceFacts, l);
  for (const y of Array.isArray(s.nodes) ? s.nodes : [])
    Hh((f = y.data) == null ? void 0 : f.params, y.type, r, l);
  Array.isArray(s.presets) && s.presets.forEach((y) => Hi(y, l));
  const d = ky(Array.isArray(s.nodes) ? s.nodes : []);
  for (const y of Array.isArray(u.variants) ? u.variants : []) {
    const m = new Map(d), h = /* @__PURE__ */ new Map();
    for (const b of Array.isArray(y == null ? void 0 : y.operations) ? y.operations : []) {
      if (!Ii(b)) continue;
      const g = _1(b, m, h);
      (b.op === "add_node" || b.op === "set_params") && Hh(b.params, g, r, l);
    }
  }
  return l;
}
function A1(a) {
  const l = [h1, "<removed>", "***", "�"].find((s) => [...a].every((u) => !s.includes(u)));
  if (l) return l;
  for (let s = 57344; s <= 63743; s += 1) {
    const u = String.fromCodePoint(s);
    if ([...a].every((d) => !u.includes(d))) return u;
  }
  return "";
}
class x1 {
  constructor() {
    en(this, "byReason", /* @__PURE__ */ new Map());
  }
  record(r, l) {
    const s = this.byReason.get(l) ?? /* @__PURE__ */ new Set();
    s.add(r), this.byReason.set(l, s);
  }
  report() {
    return [...this.byReason.entries()].map(([r, l]) => ({
      locations: [...l].sort(),
      reason: r
    }));
  }
}
class N1 {
  constructor(r, l) {
    en(this, "ordered");
    en(this, "replacement");
    this.redactions = l, this.ordered = [...r].sort((s, u) => u.length - s.length), this.replacement = A1(r);
  }
  text(r, l) {
    let s = r;
    for (const u of this.ordered) s = s.split(u).join(this.replacement);
    return s !== r && this.redactions.record(l, y1), s;
  }
  semantic(r, l) {
    return this.ordered.some((s) => r.includes(s)) && Me(l, "a redacted value appears in a semantic identity and cannot be safely rewritten"), r;
  }
}
function j1(a) {
  return a.normalize("NFKD").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 180) || "secret";
}
function w1(a) {
  if (a === null) return "null";
  if (typeof a == "string") return `string:${a}`;
  if (typeof a == "number" && Number.isFinite(a)) return `number:${String(a)}`;
  if (typeof a == "boolean") return `boolean:${String(a)}`;
}
class $1 {
  constructor() {
    en(this, "identities", /* @__PURE__ */ new Map());
    en(this, "requirements", /* @__PURE__ */ new Map());
    en(this, "usedIds", /* @__PURE__ */ new Set());
  }
  ref(r) {
    const l = w1(r.rawValue), s = this.identities.get(r.identity) ?? [];
    let u = l === void 0 ? void 0 : s.find((d) => d.signature === l);
    if (!u) {
      const d = j1(r.suggestedId);
      let f = d, y = 2;
      for (; this.usedIds.has(f); )
        f = `${d}-${y}`, y += 1;
      this.usedIds.add(f), u = { signature: l, id: f }, s.push(u), this.identities.set(r.identity, s), this.requirements.set(f, {
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
function tl(a, r, l) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return Bi(a, r);
  if (typeof a == "string") return l.scrubber.text(a, r);
  if (Array.isArray(a)) {
    l.stack.has(a) && Me(r, "cyclic values are not portable"), l.stack.add(a);
    try {
      const u = [];
      for (let d = 0; d < a.length; d += 1)
        Object.prototype.hasOwnProperty.call(a, d) || Me(`${r}/${d}`, "sparse arrays are not portable"), u.push(tl(a[d], `${r}/${d}`, l));
      return u;
    } finally {
      l.stack.delete(a);
    }
  }
  const s = gn(a, r);
  l.stack.has(s) && Me(r, "cyclic values are not portable"), l.stack.add(s);
  try {
    Object.prototype.hasOwnProperty.call(s, "$gcpSecretRef") && Me(r, "raw host data may not contain the reserved '$gcpSecretRef' key");
    const u = /* @__PURE__ */ Object.create(null);
    for (const [d, f] of Object.entries(s)) {
      const y = `${r}/${ol(d)}`;
      u[d] = Qa(d) ? l.secrets.ref({
        identity: `credential:${r}:${d}`,
        suggestedId: `${d}-${r}`,
        rawValue: f,
        location: y,
        reason: `Credential-shaped key '${d}' was redacted recursively.`,
        parameter: d
      }) : tl(f, y, l);
    }
    return u;
  } finally {
    l.stack.delete(s);
  }
}
function Ks(a, r, l, s, u = /* @__PURE__ */ new WeakSet()) {
  if (a === null || typeof a == "boolean") return a;
  if (typeof a == "number") return Bi(a, r);
  if (typeof a == "string") return l.text(a, r);
  if (Array.isArray(a)) {
    u.has(a) && Me(r, "cyclic values are not portable"), u.add(a);
    try {
      const f = [];
      for (let y = 0; y < a.length; y += 1)
        Object.prototype.hasOwnProperty.call(a, y) || Me(`${r}/${y}`, "sparse arrays are not portable"), f.push(Ks(a[y], `${r}/${y}`, l, s, u));
      return f;
    } finally {
      u.delete(a);
    }
  }
  const d = gn(a, r);
  u.has(d) && Me(r, "cyclic values are not portable"), u.add(d);
  try {
    Object.prototype.hasOwnProperty.call(d, "$gcpSecretRef") && Me(r, "provenance may not contain the reserved '$gcpSecretRef' key");
    const f = /* @__PURE__ */ Object.create(null);
    for (const [y, m] of Object.entries(d)) {
      const h = `${r}/${ol(y)}`;
      Qa(y) ? (f[y] = l.replacement, s.record(h, g1)) : f[y] = Ks(m, h, l, s, u);
    }
    return f;
  } finally {
    u.delete(d);
  }
}
function Qy(a) {
  return a ? new Map(a.params.map((r) => [r.name, r])) : void 0;
}
function Hu(a, r, l, s, u, d, f) {
  const y = gn(a, u), m = r ? d.get(r) : void 0, h = Qy(m), b = /* @__PURE__ */ Object.create(null);
  for (const [g, _] of Object.entries(y)) {
    const N = `${u}/${ol(g)}`, z = h == null ? void 0 : h.get(g);
    let A;
    m ? z ? z.param_type === "secret" ? A = `${r}.${g} is declared as a secret parameter.` : Qa(g) && (A = `Credential-shaped parameter '${g}' was redacted recursively.`) : A = `Parameter '${g}' is absent from the captured '${r}' schema and was redacted fail-closed.` : A = r ? `Node type '${r}' has no captured schema; parameter '${g}' was redacted fail-closed.` : `The node type is unresolved; parameter '${g}' was redacted fail-closed.`, b[g] = A ? f.secrets.ref({
      identity: `${l}:param:${g}`,
      suggestedId: `${s}-${g}`,
      rawValue: _,
      location: N,
      reason: A,
      ...r === void 0 ? {} : { nodeType: r },
      parameter: g
    }) : tl(_, N, f);
  }
  return b;
}
function T1(a, r, l) {
  Ii(a) || Me("baseline", "expected a plain serialized graph"), Array.isArray(a.nodes) || Me("baseline.nodes", "expected an array"), Array.isArray(a.edges) || Me("baseline.edges", "expected an array");
  const s = a.nodes.map((f, y) => {
    const m = `/spec/baseline/nodes/${y}`, h = gn(f, `baseline.nodes[${y}]`), b = l.scrubber.semantic(Ut(h.id, `${m}/id`), `${m}/id`), g = l.scrubber.semantic(Ut(h.type, `${m}/type`), `${m}/type`);
    let _ = { x: 0, y: 0 };
    if (h.position !== void 0) {
      const A = gn(h.position, `${m}/position`);
      _ = {
        x: Bi(A.x, `${m}/position/x`),
        y: Bi(A.y, `${m}/position/y`)
      };
    }
    const N = h.data === void 0 ? {} : gn(h.data, `${m}/data`), z = /* @__PURE__ */ Object.create(null);
    for (const [A, H] of Object.entries(N)) {
      const T = `${m}/data/${ol(A)}`;
      A === "params" ? z.params = Hu(
        H,
        g,
        `node:${b}`,
        b,
        T,
        r,
        l
      ) : Qa(A) ? z[A] = l.secrets.ref({
        identity: `node:${b}:credential:${A}`,
        suggestedId: `${b}-${A}`,
        rawValue: H,
        location: T,
        reason: `Credential-shaped key '${A}' was redacted recursively.`,
        nodeType: g,
        parameter: A
      }) : z[A] = tl(H, T, l);
    }
    return { id: b, type: g, position: _, data: z };
  }), u = a.edges.map((f, y) => {
    const m = `/spec/baseline/edges/${y}`, h = gn(f, `baseline.edges[${y}]`), b = h.type;
    b !== void 0 && b !== "data" && b !== "trigger" && Me(`${m}/type`, "expected 'data' or 'trigger'");
    const g = b === "data" || b === "trigger" ? b : void 0;
    return {
      id: l.scrubber.semantic(Ut(h.id, `${m}/id`), `${m}/id`),
      source: l.scrubber.semantic(Ut(h.source, `${m}/source`), `${m}/source`),
      target: l.scrubber.semantic(Ut(h.target, `${m}/target`), `${m}/target`),
      sourceHandle: l.scrubber.semantic(
        Ut(h.sourceHandle, `${m}/sourceHandle`, !0),
        `${m}/sourceHandle`
      ),
      targetHandle: l.scrubber.semantic(
        Ut(h.targetHandle, `${m}/targetHandle`, !0),
        `${m}/targetHandle`
      ),
      ...g === void 0 ? {} : { type: g }
    };
  });
  return {
    nodes: s,
    edges: u,
    ...a.presets === void 0 ? {} : {
      presets: (Array.isArray(a.presets) || Me("/spec/baseline/presets", "expected an array"), a.presets.map((f, y) => l.secrets.ref({
        identity: `preset:${y}`,
        suggestedId: `preset-${y + 1}`,
        rawValue: f,
        location: `/spec/baseline/presets/${y}`,
        reason: "Preset schema is unavailable; the entire preset was redacted fail-closed."
      })))
    },
    ...a.segmentGroups === void 0 ? {} : { segmentGroups: tl(a.segmentGroups, "/spec/baseline/segmentGroups", l) },
    ...a.name === void 0 ? {} : { name: l.scrubber.text(Ut(a.name, "/spec/baseline/name", !0), "/spec/baseline/name") },
    ...a.description === void 0 ? {} : {
      description: l.scrubber.text(
        Ut(a.description, "/spec/baseline/description", !0),
        "/spec/baseline/description"
      )
    }
  };
}
function tn(a, r, l, s = !1) {
  return l.semantic(Ut(a, r, s), r);
}
function M1(a, r, l, s, u, d) {
  Array.isArray(a) || Me(`request.variants[${l}].operations`, "expected an array");
  const f = new Map(s), y = /* @__PURE__ */ new Map();
  return a.map((m, h) => {
    const b = `/spec/variants/${l}/operations/${h}`, g = gn(m, `request.variants[${l}].operations[${h}]`);
    switch (g.op) {
      case "add_node": {
        const _ = tn(g.node_type, `${b}/node_type`, d.scrubber), N = g.ref === void 0 ? void 0 : tn(g.ref, `${b}/ref`, d.scrubber);
        N !== void 0 && y.set(N, _);
        const z = u.get(_), A = /* @__PURE__ */ Object.create(null);
        for (const I of (z == null ? void 0 : z.params) ?? [])
          I.default !== void 0 && (A[I.name] = I.default);
        if (g.params !== void 0)
          for (const [I, ae] of Object.entries(gn(g.params, `${b}/params`)))
            A[I] = ae;
        const T = Object.keys(A).length > 0 ? Hu(
          A,
          _,
          N === void 0 ? `variant:${r}:operation:${h}` : `variant:${r}:ref:${N}`,
          N ?? `${r}-node-${h + 1}`,
          `${b}/params`,
          u,
          d
        ) : void 0, R = g.position === void 0 ? void 0 : (() => {
          const I = gn(g.position, `${b}/position`);
          return {
            x: Bi(I.x, `${b}/position/x`),
            y: Bi(I.y, `${b}/position/y`)
          };
        })();
        return {
          op: "add_node",
          node_type: _,
          ...N === void 0 ? {} : { ref: N },
          ...T === void 0 ? {} : { params: T },
          ...R === void 0 ? {} : { position: R }
        };
      }
      case "set_params": {
        const _ = tn(g.node_id, `${b}/node_id`, d.scrubber), N = y.get(_) ?? f.get(_), z = y.has(_) ? `variant:${r}:ref:${_}` : `node:${_}`;
        return {
          op: "set_params",
          node_id: _,
          params: Hu(
            g.params,
            N,
            z,
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
          source: tn(g.source, `${b}/source`, d.scrubber),
          source_handle: tn(
            g.source_handle,
            `${b}/source_handle`,
            d.scrubber,
            !0
          ),
          target: tn(g.target, `${b}/target`, d.scrubber),
          target_handle: tn(
            g.target_handle,
            `${b}/target_handle`,
            d.scrubber,
            !0
          )
        };
      case "remove_node": {
        const _ = tn(g.node_id, `${b}/node_id`, d.scrubber);
        return y.delete(_), f.delete(_), { op: "remove_node", node_id: _ };
      }
      case "remove_edge":
        return {
          op: "remove_edge",
          source: tn(g.source, `${b}/source`, d.scrubber),
          target: tn(g.target, `${b}/target`, d.scrubber),
          ...g.source_handle === void 0 ? {} : {
            source_handle: tn(
              g.source_handle,
              `${b}/source_handle`,
              d.scrubber,
              !0
            )
          },
          ...g.target_handle === void 0 ? {} : {
            target_handle: tn(
              g.target_handle,
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
        return Me(`${b}/op`, `unsupported graph operation '${String(g.op)}'`);
    }
  });
}
function D1(a, r) {
  var l;
  return ((l = a.id) == null ? void 0 : l.trim()) || `variant-${r + 1}`;
}
function O1(a) {
  Array.isArray(a.request.variants) || Me("request.variants", "expected an array"), Array.isArray(a.session.variants) || Me("session.variants", "expected an array"), (a.request.repetitions ?? 1) !== a.session.repetitions && Me("request.repetitions", "does not match the completed session"), (a.request.objective.metric !== a.session.objective.metric || a.request.objective.direction !== a.session.objective.direction) && Me("request.objective", "does not match the completed session"), a.request.hypothesis.trim() !== a.session.hypothesis && Me("request.hypothesis", "does not match the completed session"), a.request.variants.length !== a.session.variants.length && Me("request.variants", "does not match the completed session variant count"), a.request.variants.forEach((l, s) => {
    const u = a.session.variants[s];
    D1(l, s) !== (u == null ? void 0 : u.id) && Me(`request.variants[${s}].id`, "does not match the completed session variant id"), l.label.trim() !== u.label && Me(`request.variants[${s}].label`, "does not match the completed session variant label");
  });
}
function C1(a, r, l) {
  return {
    ...a,
    id: l.semantic(a.id, `/derived/variants/${r}/id`),
    label: l.text(a.label, `/derived/variants/${r}/label`),
    ...a.metricKey === void 0 ? {} : { metricKey: l.semantic(a.metricKey, `/derived/variants/${r}/metricKey`) },
    metricValues: [...a.metricValues],
    observedMetrics: Object.fromEntries(Object.entries(a.observedMetrics).map(([s, u]) => [
      l.semantic(s, `/derived/variants/${r}/observedMetrics/${ol(s)}`),
      u
    ])),
    ...a.runs === void 0 ? {} : {
      runs: a.runs.map((s) => ({
        ...s,
        observedMetrics: { ...s.observedMetrics }
      }))
    },
    ...a.operationSummary === void 0 ? {} : {
      operationSummary: a.operationSummary.map((s, u) => l.text(s, `/derived/variants/${r}/operationSummary/${u}`))
    },
    errors: a.errors.map((s, u) => l.text(s, `/derived/variants/${r}/errors/${u}`))
  };
}
function z1(a, r) {
  const l = a.variants.map((u, d) => C1(u, d, r)), s = new Map(l.map((u) => [u.id, u]));
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
        return a.winnerId && s.has(a.winnerId) ? s.get(a.winnerId).label : u;
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
function R1(a, r, l) {
  if (!(a.metricKey === void 0 && a.metricValue === void 0))
    return (typeof a.metricKey != "string" || a.metricKey.length === 0 || typeof a.metricValue != "number" || !Number.isFinite(a.metricValue)) && Me("session.variants[].runs[].metric", "metricKey and finite metricValue must be provided together"), {
      // Older run records retained only the canonical identity. Calling that
      // stored identity the observed key is explicit client-side evidence, not
      // a guessed node/port identity.
      observedKey: r.semantic(a.metricKey, `${l}/observedKey`),
      canonicalKey: r.semantic(a.metricKey, `${l}/canonicalKey`),
      value: a.metricValue,
      source: a.metricSource ?? "client"
    };
}
function U1(a, r) {
  const l = [], s = /* @__PURE__ */ new Set();
  return a.variants.forEach((u, d) => {
    var f;
    (f = u.runs) == null || f.forEach((y, m) => {
      var A, H;
      const h = `${u.id}\0${y.repetition}`;
      s.has(h) && Me(`session.variants[${d}].runs[${m}]`, "duplicate variant/repetition run slot"), s.add(h);
      const b = [], g = /* @__PURE__ */ new Set(), _ = R1(y, r, `/runs/${l.length}/metrics/0`);
      _ && (g.add(_.observedKey), b.push(_));
      for (const [T, R] of Object.entries(y.observedMetrics)) {
        if (!Number.isFinite(R)) continue;
        const I = ((A = y.observedMetricIdentities) == null ? void 0 : A[T]) ?? (T === "system.runtime_ms" ? "system.runtime_ms" : void 0), ae = ((H = y.observedMetricSources) == null ? void 0 : H[T]) ?? (T === "system.runtime_ms" ? "client" : void 0);
        if (!I || !ae) continue;
        const Q = `/runs/${l.length}/metrics/${b.length}`, ne = r.semantic(T, `${Q}/observedKey`), V = r.semantic(I, `${Q}/canonicalKey`);
        g.has(ne) || (g.add(ne), b.push({ observedKey: ne, canonicalKey: V, value: R, source: ae }));
      }
      const N = Number.isFinite(y.observedMetrics["system.runtime_ms"]) ? y.observedMetrics["system.runtime_ms"] : y.durationMs;
      Number.isFinite(N) && !g.has("system.runtime_ms") && b.push({
        observedKey: "system.runtime_ms",
        canonicalKey: "system.runtime_ms",
        value: N,
        source: "client"
      });
      const z = `/runs/${l.length}/error/message`;
      l.push({
        runKey: `${u.id}:rep:${y.repetition}`,
        variantId: u.id,
        repetition: y.repetition,
        status: y.status,
        durationMs: y.durationMs,
        metrics: b,
        ...y.status === "failed" ? {
          error: {
            phase: "execute",
            code: "EXPERIMENT_RUN_FAILED",
            message: r.text(
              y.error ?? "No error message was recorded by the experiment runtime.",
              z
            )
          }
        } : {}
      });
    });
  }), l;
}
function L1(a, r, l) {
  const s = (a.provenanceFacts ?? []).map((u, d) => {
    const f = `/provenance/facts/${d}`;
    return {
      key: r.text(Ut(u.key, `${f}/key`), `${f}/key`),
      status: u.status,
      source: r.text(Ut(u.source, `${f}/source`), `${f}/source`),
      ...u.collectedAt === void 0 ? {} : { collectedAt: u.collectedAt },
      ...u.value === void 0 ? {} : { value: Ks(u.value, `${f}/value`, r, l) }
    };
  });
  return a.request.search !== void 0 && (s.some((u) => u.key === "optimizer.plan") && Me("provenanceFacts", "'optimizer.plan' is reserved for the captured experiment request"), s.push({
    key: "optimizer.plan",
    status: "observed",
    source: "graph-experiment request",
    value: Ks(
      a.request.search,
      `/provenance/facts/${s.length}/value`,
      r,
      l
    )
  })), s.some((u) => u.key === "redaction.arbitrary_string_secret_detection") && Me(
    "provenanceFacts",
    "'redaction.arbitrary_string_secret_detection' is reserved for the capture limitation"
  ), s.push({
    key: "redaction.arbitrary_string_secret_detection",
    status: "unavailable",
    source: "schema-guided capture cannot detect arbitrary secrets embedded in ordinary strings"
  }), s;
}
async function V1(a) {
  O1(a);
  const r = S1(a.definitions), l = E1(a, r), s = new x1(), u = new N1(l, s), d = new $1(), f = { secrets: d, scrubber: u, stack: /* @__PURE__ */ new WeakSet() }, y = T1(a.baseline, r, f), m = ky(a.baseline.nodes), h = z1(a.session, u), b = a.request.variants.map((z, A) => ({
    id: h.variants[A].id,
    label: u.text(a.session.variants[A].label, `/spec/variants/${A}/label`),
    operations: M1(
      z.operations,
      h.variants[A].id,
      A,
      m,
      r,
      f
    )
  }));
  if (h.variants.forEach((z, A) => {
    z.label = b[A].label;
  }), h.winnerId !== void 0) {
    const z = h.variants.find((A) => A.id === h.winnerId);
    z && (h.winnerLabel = z.label);
  }
  const g = U1(a.session, u), _ = L1(a, u, s), N = {
    policy: "explicit-secret-ref-v1",
    secretRequirements: d.report(),
    textRedactions: s.report()
  };
  return p1({
    session: h,
    completedAt: a.completedAt,
    producer: {
      pluginId: a.pluginId ?? m1,
      pluginVersion: a.pluginVersion,
      codefyuiApiVersion: a.codefyuiApiVersion
    },
    provenance: { facts: _ },
    baseline: y,
    variants: b,
    runs: g,
    redactionReport: N,
    concurrency: a.request.concurrency ?? 1,
    applyBestRequested: a.request.apply_best ?? !1
  });
}
const Ys = "graph-copilot.study-index.v1", B1 = "graph-copilot.study.sha256.", od = "codefyui.graph-copilot.study-index", cd = 1, Zy = 10, H1 = 512 * 1024, Jy = 256, G1 = 32 * 1024, Gh = 4, Fy = /^[a-f0-9]{64}$/, q1 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, I1 = "graph-copilot.study-index.v1.lock";
class ut extends Error {
  constructor(l, s, u) {
    super(s);
    en(this, "code");
    en(this, "causeValue");
    this.name = "StudyStorageError", this.code = l, this.causeValue = u;
  }
}
function Wy(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = Object.getPrototypeOf(a);
  return r === Object.prototype || r === null;
}
function Py(a, r) {
  const l = Object.keys(a);
  return l.length === r.length && l.every((s) => r.includes(s));
}
function K1(a) {
  return typeof a == "string" && q1.test(a) && !Number.isNaN(Date.parse(a)) && new Date(a).toISOString() === a;
}
function eg(a) {
  return typeof a == "string" && a.length > 0 && a.length <= Jy && a === a.trim() && !/[\u0000-\u001f\u007f]/.test(a);
}
function Y1(a) {
  if (!eg(a))
    throw new ut(
      "INVALID_ID",
      `Study id must be a non-empty, trimmed string of at most ${Jy} characters`
    );
}
function X1(a) {
  return !Wy(a) || !Py(a, ["id", "digest", "createdAt", "hypothesis", "kind"]) || !eg(a.id) || typeof a.digest != "string" || !Fy.test(a.digest) || !K1(a.createdAt) || typeof a.hypothesis != "string" || !a.hypothesis.trim() || a.hypothesis.length > G1 || a.hypothesis.includes("\0") || a.kind !== "portable" ? null : Object.freeze({
    id: a.id,
    digest: a.digest,
    createdAt: a.createdAt,
    hypothesis: a.hypothesis,
    kind: "portable"
  });
}
function Ps(a, r) {
  return r.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(r.id) || a.digest.localeCompare(r.digest);
}
function k1(a, r) {
  return a.createdAt.localeCompare(r.createdAt) || a.id.localeCompare(r.id) || a.digest.localeCompare(r.digest);
}
function tg(a) {
  return Object.freeze({
    format: od,
    formatVersion: cd,
    entries: Object.freeze([...a].sort(Ps))
  });
}
const Ya = tg([]);
function eo(a) {
  if (!a || a.length > H1) return Ya;
  let r;
  try {
    r = JSON.parse(a);
  } catch {
    return Ya;
  }
  if (!Wy(r) || !Py(r, ["format", "formatVersion", "entries"]) || r.format !== od || r.formatVersion !== cd || !Array.isArray(r.entries)) return Ya;
  const l = r.entries.map(X1).filter((f) => f !== null), s = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (const f of l)
    s.set(f.id, (s.get(f.id) ?? 0) + 1), u.set(f.digest, (u.get(f.digest) ?? 0) + 1);
  const d = l.filter((f) => s.get(f.id) === 1 && u.get(f.digest) === 1);
  return tg(d.sort(Ps).slice(0, Zy));
}
function ud(a) {
  return JSON.stringify({
    format: od,
    formatVersion: cd,
    entries: [...a].sort(Ps)
  });
}
function qh(a) {
  if (a === null) return Ya;
  const r = eo(a);
  if (a !== ud(r.entries))
    throw new ut(
      "INDEX_READ_FAILED",
      "Portable study index is malformed or non-canonical; mutation was aborted without changing storage"
    );
  return r;
}
function Gi(a) {
  try {
    return a.storage.get(Ys);
  } catch (r) {
    throw new ut("INDEX_READ_FAILED", "Could not read the portable study index", r);
  }
}
function ng(a, r) {
  try {
    return a.storage.remove(r), !0;
  } catch {
    return !1;
  }
}
const Ts = /* @__PURE__ */ new Map();
function Q1() {
  if (typeof navigator > "u") return null;
  const a = navigator.locks;
  return !a || typeof a.request != "function" ? null : a;
}
function ag(a, r) {
  const l = Q1();
  if (l === null)
    return Promise.reject(new ut(
      "LOCK_UNAVAILABLE",
      "Cross-tab storage mutations require browser Web Locks; this environment remains read-only"
    ));
  const s = Ts.get(a) ?? Promise.resolve();
  let u;
  const d = new Promise((f) => {
    u = f;
  });
  return Ts.set(a, d), s.catch(() => {
  }).then(() => l.request(a, { mode: "exclusive" }, r)).finally(() => {
    u(), Ts.get(a) === d && Ts.delete(a);
  });
}
function Z1(a) {
  return ag(I1, a);
}
function J1(a, r, l) {
  if (Gi(a) !== r) return !1;
  try {
    a.storage.set(Ys, l);
  } catch (s) {
    let u;
    try {
      u = a.storage.get(Ys);
    } catch {
      u = void 0;
    }
    if (u === l) return !0;
    throw new ut(
      "INDEX_WRITE_FAILED",
      u === r ? "Portable study index write failed before changing the index" : "Portable study index write failed and the resulting index was left untouched to avoid overwriting a concurrent update",
      s
    );
  }
  return Gi(a) === l;
}
function F1(a, r) {
  try {
    const l = Gi(a), s = eo(l);
    return s.entries.some((u) => u.digest === r) ? !0 : l !== null && l !== ud(s.entries);
  } catch {
    return !0;
  }
}
function Ih(a, r) {
  return F1(a, r) ? !0 : ng(a, dd(r));
}
function dd(a) {
  if (!Fy.test(a))
    throw new ut("BUNDLE_TAMPERED", "Study digest is not a lowercase SHA-256 value");
  return `${B1}${a}`;
}
async function W1(a) {
  return sd(a);
}
function P1(a) {
  try {
    return eo(a.storage.get(Ys));
  } catch {
    return Ya;
  }
}
async function ig(a, r) {
  const l = await ld(r), s = await sd(l), u = Object.freeze({
    id: s.payload.id,
    digest: s.integrity.contentSha256,
    createdAt: s.payload.createdAt,
    hypothesis: s.payload.spec.hypothesis,
    kind: "portable"
  });
  return Z1(async () => {
    const d = Gi(a), y = qh(d).entries.find((g) => g.id === u.id);
    if (y && y.digest !== u.digest)
      throw new ut(
        "ID_CONFLICT",
        `Study '${u.id}' already exists with different content; fork it to a new id before saving`
      );
    const m = dd(u.digest);
    let h;
    try {
      h = a.storage.get(m);
    } catch (g) {
      throw new ut("BUNDLE_READ_FAILED", `Could not inspect study blob ${u.digest}`, g);
    }
    if (h !== null && h !== l)
      throw new ut(
        "BUNDLE_KEY_CONFLICT",
        `Content-addressed study blob ${u.digest} already contains different bytes`
      );
    if (y && h === l)
      return Object.freeze({
        status: "unchanged",
        entry: y,
        cleanupFailures: Object.freeze([])
      });
    const b = h === null;
    if (b) {
      try {
        a.storage.set(m, l);
      } catch (g) {
        let _;
        try {
          _ = a.storage.get(m);
        } catch {
          _ = void 0;
        }
        if (_ === l)
          h = _;
        else
          throw _ !== void 0 && ng(a, m), new ut(
            "BUNDLE_WRITE_FAILED",
            `Could not store portable study blob ${u.digest}`,
            g
          );
      }
      if (h !== null && h !== l)
        throw new ut(
          "BUNDLE_KEY_CONFLICT",
          `Content-addressed study blob ${u.digest} changed during the write`
        );
    }
    try {
      for (let g = 0; g < Gh; g += 1) {
        const _ = Gi(a), N = qh(_), z = N.entries.find((Q) => Q.id === u.id);
        if (z) {
          if (z.digest !== u.digest)
            throw new ut(
              "ID_CONFLICT",
              `Study '${u.id}' already exists with different content; fork it to a new id before saving`
            );
          return Object.freeze({
            status: b ? "saved" : "unchanged",
            entry: z,
            cleanupFailures: Object.freeze([])
          });
        }
        const A = [...N.entries, u], H = [...N.entries].sort(k1).slice(0, Math.max(0, A.length - Zy)), T = new Set(H.map((Q) => Q.digest)), R = A.filter((Q) => !T.has(Q.digest)).sort(Ps), I = ud(R);
        if (!J1(a, _, I)) continue;
        const ae = [];
        for (const Q of H)
          Ih(a, Q.digest) || ae.push(Q.digest);
        return Object.freeze({
          status: "saved",
          entry: u,
          cleanupFailures: Object.freeze(ae)
        });
      }
      throw new ut(
        "INDEX_WRITE_FAILED",
        `Portable study index changed during ${Gh} consecutive commit attempts`
      );
    } catch (g) {
      throw b && Ih(a, u.digest), g;
    }
  });
}
async function Kh(a, r) {
  Y1(r);
  const s = eo(Gi(a)).entries.find((f) => f.id === r);
  if (!s)
    throw new ut("STUDY_NOT_FOUND", `Portable study '${r}' is not indexed`);
  const u = dd(s.digest);
  let d;
  try {
    d = a.storage.get(u);
  } catch (f) {
    throw new ut("BUNDLE_READ_FAILED", `Could not read portable study '${r}'`, f);
  }
  if (d === null)
    throw new ut("BUNDLE_MISSING", `Portable study '${r}' is indexed but its blob is missing`);
  try {
    const f = await sd(d), y = await ld(f);
    if (f.payload.id !== s.id || f.integrity.contentSha256 !== s.digest || y !== d)
      throw new ut(
        "BUNDLE_TAMPERED",
        `Portable study '${r}' does not match its content-addressed index entry`
      );
    return f;
  } catch (f) {
    if (f instanceof ut) throw f;
    const y = f instanceof on ? ` (${f.code})` : "";
    throw new ut(
      "BUNDLE_TAMPERED",
      `Portable study '${r}' failed integrity verification${y}`,
      f
    );
  }
}
const fd = "experiment-sessions-v1", Gu = "gcp:experiments-changed", Yh = 8, Xs = 16, eS = 20, tS = 600 * 1e3, nS = "graph-copilot.experiment-sessions-v1.lock";
class Rs extends Error {
  constructor(l, s) {
    super(l.message);
    en(this, "observation");
    this.name = l.name, this.observation = s;
  }
}
function nl(a) {
  return a === void 0 ? a : JSON.parse(JSON.stringify(a));
}
function aS(a) {
  const r = String(a);
  return a instanceof ut && a.causeValue !== void 0 ? `${r}: ${String(a.causeValue)}` : r;
}
function al(a) {
  const r = typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${a}-${r}`;
}
function rg(a) {
  return typeof a == "number" && Number.isFinite(a) ? a : void 0;
}
function ks(a) {
  if (a.length !== 0)
    return a.reduce((r, l) => r + l, 0) / a.length;
}
function iS(a) {
  if (a.length < 2) return;
  const r = ks(a);
  return Math.sqrt(a.reduce((l, s) => l + (s - r) ** 2, 0) / (a.length - 1));
}
function Xh(a) {
  return JSON.stringify({
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets ?? []
  });
}
function lg(a) {
  const r = a.nodes.filter((s) => s.type !== "note"), l = new Set(r.map((s) => s.id));
  return {
    ...a,
    nodes: r,
    edges: a.edges.filter((s) => typeof s.source == "string" && typeof s.target == "string" && l.has(s.source) && l.has(s.target))
  };
}
function rS(a) {
  return Object.fromEntries(a.params.map((r) => [r.name, nl(r.default)]));
}
function lS(a, r) {
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
function kh(a, r) {
  if (!r || typeof r != "object" || Array.isArray(r))
    return "params must be an object";
  const l = new Map(a.params.map((s) => [s.name, s]));
  for (const [s, u] of Object.entries(r)) {
    const d = l.get(s);
    if (!d)
      return `Unknown parameter '${s}' for node type '${a.node_name}'`;
    const f = lS(d, u);
    if (f) return f;
  }
}
function sS(a) {
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
function Qh(a, r, l) {
  const s = nl(a), u = {}, d = [], f = new Map(l.map((h) => [h.node_name, h])), y = (h) => {
    const b = u[h] ?? h;
    return s.nodes.some((g) => g.id === b) ? b : void 0;
  }, m = (h, b) => d.push({ index: h, ok: !1, error: b });
  return r.forEach((h, b) => {
    var g;
    if (!h || typeof h != "object" || typeof h.op != "string") {
      m(b, "Operation must be an object with an op field");
      return;
    }
    switch (h.op) {
      case "add_node": {
        const _ = f.get(h.node_type);
        if (!_) {
          m(b, `Unknown node type '${h.node_type}'`);
          return;
        }
        if (h.params !== void 0) {
          const A = kh(_, h.params);
          if (A) {
            m(b, `add_node: ${A}`);
            return;
          }
        }
        const N = al("candidate-node"), z = {
          id: N,
          type: h.node_type,
          position: h.position ?? {
            x: 160 + s.nodes.length % 4 * 240,
            y: 120 + Math.floor(s.nodes.length / 4) * 160
          },
          data: { params: { ...rS(_), ...h.params ?? {} } }
        };
        s.nodes.push(z), h.ref && (u[h.ref] = N), d.push({ index: b, ok: !0, node_id: N });
        return;
      }
      case "set_params": {
        const _ = y(h.node_id);
        if (!_) {
          m(b, `set_params: unknown node '${h.node_id}'`);
          return;
        }
        const N = s.nodes.find((H) => H.id === _), z = typeof N.type == "string" ? f.get(N.type) : void 0;
        if (!z) {
          m(b, `set_params: node '${h.node_id}' has no known definition`);
          return;
        }
        const A = kh(z, h.params);
        if (A) {
          m(b, `set_params: ${A}`);
          return;
        }
        N.data = {
          ...N.data ?? {},
          params: { ...((g = N.data) == null ? void 0 : g.params) ?? {}, ...nl(h.params) }
        }, d.push({ index: b, ok: !0, node_id: _ });
        return;
      }
      case "connect": {
        const _ = y(h.source), N = y(h.target);
        if (!_ || !N) {
          m(b, `connect: unknown ${_ ? "target" : "source"} node`);
          return;
        }
        const z = h.source_handle === "trigger", A = {
          id: al("candidate-edge"),
          source: _,
          target: N,
          sourceHandle: h.source_handle,
          targetHandle: z ? "__trigger" : h.target_handle,
          ...z ? { type: "trigger" } : {}
        };
        s.edges.push(A), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_node": {
        const _ = y(h.node_id);
        if (!_) {
          m(b, `remove_node: unknown node '${h.node_id}'`);
          return;
        }
        s.nodes = s.nodes.filter((N) => N.id !== _), s.edges = s.edges.filter((N) => N.source !== _ && N.target !== _), d.push({ index: b, ok: !0 });
        return;
      }
      case "remove_edge": {
        const _ = y(h.source), N = y(h.target);
        if (!_ || !N) {
          m(b, "remove_edge: unknown source or target node");
          return;
        }
        const z = s.edges.length;
        s.edges = s.edges.filter((A) => !(A.source === _ && A.target === N && (h.source_handle === void 0 || A.sourceHandle === h.source_handle) && (h.target_handle === void 0 || A.targetHandle === h.target_handle))), z === s.edges.length ? m(b, "remove_edge: no matching edge") : d.push({ index: b, ok: !0 });
        return;
      }
      case "clear_graph":
        s.nodes = [], s.edges = [], Object.keys(u).forEach((_) => delete u[_]), d.push({ index: b, ok: !0 });
        return;
      case "auto_layout":
        s.nodes.forEach((_, N) => {
          _.position = {
            x: 120 + N % 4 * 260,
            y: 100 + Math.floor(N / 4) * 180
          };
        }), d.push({ index: b, ok: !0 });
        return;
      default:
        m(b, `Unknown operation '${h.op ?? ""}'`);
    }
  }), { graph: s, results: d, refs: u };
}
async function oS(a, r, l) {
  try {
    const s = lg(r), u = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: l,
      body: JSON.stringify({
        nodes: s.nodes,
        edges: s.edges,
        presets: s.presets ?? []
      })
    });
    if (!u.ok) return [`Validation request failed: HTTP ${u.status}`];
    const d = await u.json(), f = Array.isArray(d.errors) ? d.errors.map(String) : [];
    return d.valid !== !0 ? f.length > 0 ? f : ["Graph validation returned an invalid or malformed result"] : f.length === 0 ? [] : ["Graph validation returned valid=true together with errors", ...f];
  } catch (s) {
    if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
    return [`Validation request failed: ${String(s)}`];
  }
}
async function cS(a, r) {
  const l = await a.http.fetch("/api/auth/bootstrap", { signal: r });
  if (!l.ok) throw new Error(`Execution auth bootstrap failed: HTTP ${l.status}`);
  const s = await l.json();
  if (typeof s.token != "string" || !s.token)
    throw new Error("Execution auth bootstrap returned no token");
  return s.token;
}
function uS(a) {
  const r = window.location.protocol === "https:" ? "wss:" : "ws:", l = new URL(`${r}//${window.location.host}/ws/execution`);
  return l.searchParams.set("token", a), l.toString();
}
function Zh(a, r) {
  let l = a;
  const s = [.../* @__PURE__ */ new Set([r, encodeURIComponent(r)])].filter((u) => u.length > 0).sort((u, d) => d.length - u.length);
  for (const u of s) l = l.split(u).join("[REDACTED]");
  return l;
}
function dS(a, r, l, s, u, d) {
  if (!l || typeof l != "object") return;
  const f = a.nodes.find((m) => m.id === r), y = f ? a.nodes.filter((m) => m.type === f.type).length : 0;
  for (const [m, h] of Object.entries(l)) {
    if (!h || typeof h != "object") continue;
    const b = rg(h.value);
    if (b === void 0) continue;
    const g = `${r}.${m}`, _ = f != null && f.type && y === 1 ? `${f.type}.${m}` : g;
    s[g] = b, u[g] = _, d[g] = "output_summary", f != null && f.type && y === 1 && (s[_] = b, u[_] = _, d[_] = "output_summary");
  }
}
function fS(a, r, l, s, u, d) {
  if (!l || typeof l != "object") return;
  const f = a.nodes.find((m) => m.id === r), y = f ? a.nodes.filter((m) => m.type === f.type).length : 0;
  for (const [m, h] of Object.entries(l)) {
    const b = rg(h);
    if (b === void 0) continue;
    const g = `${r}.progress.${m}`, _ = f != null && f.type && y === 1 ? `${f.type}.progress.${m}` : g;
    s[g] = b, u[g] = _, d[g] = "progress", f != null && f.type && y === 1 && (s[_] = b, u[_] = _, d[_] = "progress");
  }
}
function pS(a, r, l, s = tS) {
  const u = lg(a), d = Date.now();
  return new Promise((f, y) => {
    const m = new WebSocket(uS(r)), h = {}, b = {}, g = {};
    let _ = !1;
    const N = (H) => {
      if (_) return;
      _ = !0, clearTimeout(A), l == null || l.removeEventListener("abort", z), (m.readyState === WebSocket.OPEN || m.readyState === WebSocket.CONNECTING) && m.close();
      const T = Date.now() - d;
      h["system.runtime_ms"] = T, b["system.runtime_ms"] = "system.runtime_ms", g["system.runtime_ms"] = "client";
      const R = { metrics: h, metricIdentities: b, metricSources: g, durationMs: T };
      H ? H instanceof DOMException && H.name === "AbortError" ? y(H) : y(new Rs(H, R)) : f(R);
    }, z = () => N(new DOMException("Experiment cancelled", "AbortError")), A = setTimeout(
      () => N(new Error(`Experiment run timed out after ${Math.round(s / 1e3)}s`)),
      s
    );
    if (l == null || l.addEventListener("abort", z, { once: !0 }), l != null && l.aborted) {
      z();
      return;
    }
    m.onopen = () => {
      m.send(JSON.stringify({
        action: "execute",
        nodes: u.nodes,
        edges: u.edges,
        presets: u.presets ?? [],
        run_id: al("gcp-experiment-run"),
        // Scalar summaries arrive on node_status regardless. Avoid retaining
        // full tensors for every candidate in CodefyUI's in-memory run store.
        record_outputs: !1,
        graph_id: al("gcp-experiment-graph"),
        weights_persistent: !1
      }));
    }, m.onmessage = (H) => {
      let T;
      try {
        T = JSON.parse(String(H.data));
      } catch {
        return;
      }
      const R = String(T.type ?? "");
      if (R === "node_status") {
        const I = String(T.node_id ?? "");
        dS(u, I, T.output_summary, h, b, g), fS(u, I, T.progress, h, b, g);
      } else R === "execution_complete" ? N() : (R === "execution_error" || R === "execution_stopped" || R === "error") && N(new Error(String(T.error ?? R)));
    }, m.onerror = () => N(new Error("Experiment execution WebSocket failed")), m.onclose = () => {
      _ || N(new Error("Experiment execution WebSocket closed before completion"));
    };
  }).catch((f) => {
    if (f instanceof DOMException && f.name === "AbortError") throw f;
    if (f instanceof Rs) {
      const m = new Error(Zh(f.message, r));
      throw m.name = f.name, new Rs(m, f.observation);
    }
    const y = f instanceof Error ? f.message : String(f);
    throw new Error(Zh(y, r));
  });
}
function qu(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");
}
function Jh(a, r, l = {}) {
  const s = Object.entries(a).filter(([, b]) => Number.isFinite(b));
  if (s.length === 0) return;
  const u = (b) => ({
    key: l[b[0]] ?? b[0],
    value: b[1],
    observedKey: b[0]
  }), d = (b) => new Set(b.map(([_]) => l[_] ?? _)).size === 1 && b.length > 0 ? u(b[0]) : void 0, f = r.metric.trim(), y = s.find(([b]) => b === f) ?? s.find(([b]) => b.toLowerCase() === f.toLowerCase());
  if (y) return u(y);
  if (f && f.toLowerCase() !== "auto") {
    const b = qu(f), g = s.filter(([_]) => {
      const N = qu(_);
      return N === b || N.endsWith(`.${b}`);
    });
    return d(g);
  }
  const m = r.direction === "maximize" ? /(^|\.)(accuracy|f1|f1_score|reward|score|r2|auc|precision|recall)$/i : /(^|\.)(val_loss|loss|error|mae|mse|rmse)$/i, h = s.filter(([b]) => m.test(b));
  return h.length > 0 ? d(h) : r.direction === "minimize" ? d(s.filter(([b]) => /(^|\.)runtime_ms$/i.test(b))) : void 0;
}
async function Fh(a, r, l) {
  const s = new Array(a.length);
  let u = 0;
  const d = Array.from({ length: Math.min(r, a.length) }, async () => {
    for (; u < a.length; ) {
      const f = u++;
      s[f] = await l(a[f], f);
    }
  });
  return await Promise.all(d), s;
}
function mS(a) {
  const r = /* @__PURE__ */ new Map();
  for (const l of a)
    for (const [s, u] of Object.entries(l.metrics))
      r.has(s) || r.set(s, []), r.get(s).push(u);
  return Object.fromEntries(
    [...r.entries()].sort(([l], [s]) => l.localeCompare(s)).slice(0, 40).map(([l, s]) => [l, ks(s)])
  );
}
function hS(a) {
  const r = a.variants.filter((u) => u.operations.length === 0).length, l = a.variants.filter((u) => u.operations.length > 0);
  if (r !== 1 || l.length === 0) return;
  let s;
  for (const u of l) {
    if (u.operations.length !== 1) return;
    const d = u.operations[0];
    if (d.op !== "set_params") return;
    const f = Object.keys(d.params);
    if (f.length !== 1) return;
    const y = `${d.node_id}.${f[0]}`;
    if (s && s !== y) return;
    s = y;
  }
  return s;
}
function yS(a, r, l, s = []) {
  const u = [], d = [], f = [], y = hS(a);
  if (s.length > 1)
    u.push(
      `No unique winner: ${s.map((b) => b.label).join(", ")} tied at ${s[0].mean.toPrecision(6)}.`
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
    y ? f.push({
      title: `Controlled parameter study: ${y}`,
      evidence: `A one-factor pilot found the top observed mean for ${l.label} across ${a.repetitions ?? 1} repeated execution(s).`,
      nextStep: "Add an explicit seed schedule, report confidence intervals, and test on a held-out dataset."
    }) : f.push({
      title: `Replication study for ${a.objective.metric}`,
      evidence: `${l.label} has the top observed mean, but the variants are not proven to be a controlled one-factor ablation.`,
      nextStep: "Create a baseline and one-factor variants, add controlled seeds, then repeat on held-out data."
    });
  } else if (s.length === 0) {
    const b = r.some((g) => g.errors.some((_) => _.includes("cross-candidate ranking was refused")));
    d.push(b ? "Candidates exposed different objective metric identities, so no cross-candidate ranking was valid." : `No candidate exposed the requested numeric metric '${a.objective.metric}'.`);
  }
  (a.repetitions ?? 1) < 3 ? d.push("This is a pilot comparison, not paper-grade evidence; use at least 3-5 controlled independent seeds.") : d.push("Repetitions reused each candidate graph. Treat them as independent seeds only when the graph contains an explicit seed schedule."), r.some((b) => {
    var g;
    return b.confidenceInterval95 || ((g = b.baselineComparison) == null ? void 0 : g.hedgesG) !== void 0;
  }) && d.push(
    "Confidence intervals and Hedges g are descriptive screening statistics here; no hypothesis test, multiple-comparison correction, or causal claim was performed."
  );
  const m = r.filter((b) => b.status !== "completed");
  m.length > 0 && d.push(`${m.length} candidate(s) were invalid or failed during execution.`);
  const h = r.filter((b) => b.mean !== void 0 && b.stddev !== void 0 && Math.abs(b.mean) > 0 && b.stddev / Math.abs(b.mean) > 0.1);
  return h.length > 0 && (d.push(`High run-to-run variation detected for: ${h.map((b) => b.label).join(", ")}.`), f.push({
    title: "Sensitivity and stability analysis",
    evidence: "At least one candidate has a coefficient of variation above 10% in this pilot.",
    nextStep: "Increase repetitions and test whether initialization, data order, or hyperparameters explain the variance."
  })), { summary: u, warnings: d, paperIdeas: f };
}
function gS(a) {
  const { applyResult: r, appliedOperations: l, ...s } = a;
  return s;
}
function sg(a) {
  if (!a || typeof a != "object") return;
  const r = a;
  if (typeof r.id != "string" || typeof r.createdAt != "string" || typeof r.hypothesis != "string" || !r.objective || typeof r.objective.metric != "string" || !["maximize", "minimize"].includes(r.objective.direction) || typeof r.repetitions != "number" || !Number.isInteger(r.repetitions) || !Array.isArray(r.variants))
    return;
  const l = r.variants.filter((u) => !!u && typeof u == "object" && typeof u.id == "string" && typeof u.label == "string" && ["completed", "invalid", "failed"].includes(u.status) && Array.isArray(u.metricValues) && u.metricValues.every((d) => typeof d == "number" && Number.isFinite(d)) && (u.metricKey === void 0 || typeof u.metricKey == "string") && (u.mean === void 0 || typeof u.mean == "number" && Number.isFinite(u.mean)) && (u.stddev === void 0 || typeof u.stddev == "number" && Number.isFinite(u.stddev)) && (u.confidenceInterval95 === void 0 || u.confidenceInterval95.level === 0.95 && typeof u.confidenceInterval95.lower == "number" && Number.isFinite(u.confidenceInterval95.lower) && typeof u.confidenceInterval95.upper == "number" && Number.isFinite(u.confidenceInterval95.upper)) && (u.baselineComparison === void 0 || typeof u.baselineComparison.baselineId == "string" && typeof u.baselineComparison.meanDelta == "number" && Number.isFinite(u.baselineComparison.meanDelta) && typeof u.baselineComparison.objectiveImprovement == "number" && Number.isFinite(u.baselineComparison.objectiveImprovement) && (u.baselineComparison.hedgesG === void 0 || typeof u.baselineComparison.hedgesG == "number" && Number.isFinite(u.baselineComparison.hedgesG))) && typeof u.runtimeMs == "number" && Number.isFinite(u.runtimeMs) && !!u.observedMetrics && typeof u.observedMetrics == "object" && Array.isArray(u.errors) && u.errors.every((d) => typeof d == "string") && (u.runs === void 0 || Array.isArray(u.runs) && u.runs.every((d) => !!d && typeof d == "object" && Number.isInteger(d.repetition) && d.repetition >= 1 && ["completed", "failed"].includes(d.status) && typeof d.durationMs == "number" && Number.isFinite(d.durationMs) && (d.metricKey === void 0 || typeof d.metricKey == "string") && (d.metricValue === void 0 || typeof d.metricValue == "number" && Number.isFinite(d.metricValue)) && (d.metricSource === void 0 || ["output_summary", "progress", "client"].includes(d.metricSource)) && !!d.observedMetrics && typeof d.observedMetrics == "object" && Object.values(d.observedMetrics).every((f) => typeof f == "number" && Number.isFinite(f)) && (d.observedMetricIdentities === void 0 || !!d.observedMetricIdentities && typeof d.observedMetricIdentities == "object" && Object.values(d.observedMetricIdentities).every((f) => typeof f == "string") && Object.keys(d.observedMetricIdentities).every((f) => f in d.observedMetrics)) && (d.observedMetricSources === void 0 || !!d.observedMetricSources && typeof d.observedMetricSources == "object" && Object.values(d.observedMetricSources).every((f) => ["output_summary", "progress", "client"].includes(f)) && Object.keys(d.observedMetricSources).every((f) => f in d.observedMetrics)) && (d.error === void 0 || typeof d.error == "string"))) && (u.operationSummary === void 0 || Array.isArray(u.operationSummary) && u.operationSummary.every((d) => typeof d == "string"))), s = r.insights && typeof r.insights == "object" ? r.insights : { summary: [], warnings: [], paperIdeas: [] };
  return {
    ...r,
    status: ["completed", "partial", "failed"].includes(r.status ?? "") ? r.status : "failed",
    repetitions: r.repetitions,
    objective: r.objective,
    variants: l,
    baselineVariantId: typeof r.baselineVariantId == "string" ? r.baselineVariantId : void 0,
    search: pd(r.search) ? r.search : void 0,
    insights: {
      summary: Array.isArray(s.summary) ? s.summary.filter((u) => typeof u == "string") : [],
      warnings: Array.isArray(s.warnings) ? s.warnings.filter((u) => typeof u == "string") : [],
      paperIdeas: Array.isArray(s.paperIdeas) ? s.paperIdeas.filter((u) => !!u && typeof u == "object" && typeof u.title == "string" && typeof u.evidence == "string" && typeof u.nextStep == "string") : []
    }
  };
}
function og(a) {
  try {
    const r = a.storage.get(fd);
    if (!r) return [];
    const l = JSON.parse(r);
    return Array.isArray(l) ? l.map(sg).filter((s) => !!s) : [];
  } catch {
    return [];
  }
}
function vS(a) {
  let r;
  try {
    r = a.storage.get(fd);
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
  const s = l.map((u, d) => {
    const f = sg(u);
    if (!f)
      throw new Error(`Experiment Lab archive entry ${d} is invalid and cannot be safely rewritten`);
    return f;
  });
  if (new Set(s.map((u) => u.id)).size !== s.length)
    throw new Error("Experiment Lab archive contains duplicate study ids and cannot be safely rewritten");
  if (r !== JSON.stringify(s))
    throw new Error("Experiment Lab archive is non-canonical or contains lossy legacy data and remains read-only");
  return s;
}
async function cg(a, r, l = {}) {
  await ag(nS, async () => {
    const s = vS(a);
    if (l.rejectIfExists && s.some((d) => d.id === r.id))
      throw new Error(
        `A local Experiment Lab report already uses study id '${r.id}'; import was refused to avoid overwriting local evidence.`
      );
    const u = [gS(r), ...s.filter((d) => d.id !== r.id)].slice(0, eS);
    a.storage.set(fd, JSON.stringify(u));
  }), typeof window < "u" && window.dispatchEvent(new Event(Gu));
}
function Wh(a, r, l, s, u) {
  const d = Js(
    {
      id: `experiment-session:${l.id}`,
      name: "run_graph_experiments",
      arguments: r
    },
    JSON.stringify(l),
    a,
    [{ graph: s, definitions: u }]
  );
  return JSON.parse(d);
}
function bS(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return "operation must be an object";
  const r = a, l = (s) => typeof r[s] == "string" && r[s] !== "";
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
function Ms(a, r) {
  const l = new Set(r);
  return Object.keys(a).every((s) => l.has(s));
}
function xu(a) {
  return typeof a == "boolean" || typeof a == "string" || typeof a == "number" && Number.isFinite(a);
}
function pd(a) {
  if (!a || typeof a != "object" || Array.isArray(a)) return !1;
  const r = a;
  if (!Ms(r, [
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
    if (!Ms(d, [
      "nodeId",
      "nodeType",
      "param",
      "paramType",
      "baselineValue",
      "domain"
    ]) || typeof d.nodeId != "string" || typeof d.nodeType != "string" || typeof d.param != "string" || !["int", "float", "bool", "select"].includes(String(d.paramType)) || !xu(d.baselineValue) || !Array.isArray(d.domain) || d.domain.length < 1 || d.domain.length > 32 || !d.domain.every(xu)) return !1;
    l.push(`${d.nodeId}\0${d.param}`);
  }
  if (new Set(l).size !== l.length || !Array.isArray(r.assignments) || r.assignments.length > 8) return !1;
  const s = [];
  for (const u of r.assignments) {
    if (!u || typeof u != "object" || Array.isArray(u)) return !1;
    const d = u;
    if (!Ms(d, ["variantId", "domainIndex", "values"]) || typeof d.variantId != "string" || !Number.isInteger(d.domainIndex) || d.domainIndex < 0 || !Array.isArray(d.values) || d.values.length !== r.bindings.length) return !1;
    s.push(d.variantId);
    for (const f of d.values) {
      if (!f || typeof f != "object" || Array.isArray(f)) return !1;
      const y = f;
      if (!Ms(y, ["nodeId", "param", "value"]) || typeof y.nodeId != "string" || typeof y.param != "string" || !xu(y.value)) return !1;
    }
  }
  return new Set(s).size === s.length && r.generatedCandidateCount === r.assignments.length;
}
function ug(a) {
  if (!a || typeof a != "object") throw new Error("Experiment request must be an object");
  if (typeof a.hypothesis != "string" || !a.hypothesis.trim())
    throw new Error("Experiment requires a hypothesis");
  if (!a.objective || typeof a.objective != "object" || typeof a.objective.metric != "string" || !a.objective.metric.trim())
    throw new Error("Experiment requires an objective metric");
  if (!["maximize", "minimize"].includes(a.objective.direction))
    throw new Error("Experiment objective direction must be maximize or minimize");
  if (!Array.isArray(a.variants) || a.variants.length === 0)
    throw new Error("Experiment requires at least one variant");
  if (a.variants.length > Yh)
    throw new Error(`Experiment supports at most ${Yh} variants`);
  const r = a.repetitions ?? 1;
  if (!Number.isInteger(r) || r < 1 || r > 5)
    throw new Error("Experiment repetitions must be an integer from 1 to 5");
  if (a.variants.length * r > Xs)
    throw new Error(`Experiment budget is capped at ${Xs} total runs`);
  const l = a.concurrency ?? 1;
  if (!Number.isInteger(l) || l < 1 || l > 2)
    throw new Error("Experiment concurrency must be an integer from 1 to 2");
  if (a.apply_best !== void 0 && typeof a.apply_best != "boolean")
    throw new Error("Experiment apply_best must be a boolean");
  if (a.search !== void 0 && !pd(a.search))
    throw new Error("Experiment search metadata is malformed");
  const s = a.variants.map((u, d) => {
    var f;
    if (!u || typeof u != "object") throw new Error("Every experiment variant must be an object");
    if (u.id !== void 0 && typeof u.id != "string")
      throw new Error("Experiment variant ids must be strings");
    return ((f = u.id) == null ? void 0 : f.trim()) || `variant-${d + 1}`;
  });
  if (new Set(s).size !== s.length) throw new Error("Experiment variant ids must be unique");
  for (const u of a.variants) {
    if (typeof u.label != "string" || !u.label.trim())
      throw new Error("Every experiment variant requires a label");
    if (!Array.isArray(u.operations)) throw new Error("Every experiment variant requires an operations array");
    u.operations.forEach((d, f) => {
      const y = bS(d);
      if (y) throw new Error(`Invalid operation ${f} in variant '${u.label}': ${y}`);
    });
  }
  if (a.search && (a.search.totalVariantCount !== a.variants.length || a.search.totalExecutionCount !== a.variants.length * r || a.search.assignments.some((u) => !s.includes(u.variantId))))
    throw new Error("Experiment search metadata does not match the compiled variants or run count");
  return { repetitions: r, concurrency: l };
}
function SS(a) {
  const { repetitions: r } = ug(a);
  return a.variants.length * r;
}
async function _S(a, r, l, s = () => !1, u = () => {
}) {
  const { repetitions: d, concurrency: f } = ug(r), y = (/* @__PURE__ */ new Date()).toISOString(), m = nl(a.graph.getGraph()), h = Xh(m), b = a.graph.getNodeDefinitions(), g = r.variants.map((Y, X) => {
    var re;
    const oe = {
      id: ((re = Y.id) == null ? void 0 : re.trim()) || `variant-${X + 1}`,
      label: Y.label.trim(),
      operations: Y.operations
    }, ye = Qh(m, oe.operations, b);
    return {
      input: oe,
      graph: ye.graph,
      preparationErrors: ye.results.filter((be) => !be.ok).map((be) => be.error ?? "operation failed"),
      validationErrors: []
    };
  });
  await Fh(g, 2, async (Y) => {
    Y.preparationErrors.length === 0 && (Y.validationErrors = await oS(a, Y.graph, l));
  });
  const _ = g.filter((Y) => Y.preparationErrors.length === 0 && Y.validationErrors.length === 0);
  let N = "";
  _.length > 0 && (N = await cS(a, l));
  const z = [];
  for (let Y = 0; Y < d; Y += 1) {
    const X = Y % 2 === 0 ? _ : [..._].reverse(), oe = await Fh(X, f, async (ye) => {
      try {
        return {
          variantId: ye.input.id,
          repetition: Y + 1,
          observation: await pS(ye.graph, N, l)
        };
      } catch (re) {
        if (re instanceof DOMException && re.name === "AbortError") throw re;
        return re instanceof Rs ? {
          variantId: ye.input.id,
          repetition: Y + 1,
          observation: {
            ...re.observation,
            error: String(re)
          }
        } : {
          variantId: ye.input.id,
          repetition: Y + 1,
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
    z.push(...oe);
  }
  const A = g.map((Y) => {
    var te;
    const X = z.filter((Z) => Z.variantId === Y.input.id), oe = X.map((Z) => Z.observation).filter((Z) => !Z.error), ye = oe.map((Z) => Jh(Z.metrics, r.objective, Z.metricIdentities)).filter((Z) => !!Z), re = [
      ...Y.preparationErrors,
      ...Y.validationErrors,
      ...X.flatMap((Z) => Z.observation.error ? [Z.observation.error] : [])
    ], be = new Set(ye.map((Z) => Z.key)), D = oe.length === d && ye.length === d && be.size === 1;
    Y.preparationErrors.length === 0 && Y.validationErrors.length === 0 && oe.length !== d && re.push(`Only ${oe.length}/${d} repetitions completed successfully.`), oe.length > 0 && ye.length !== oe.length && re.push(
      `Objective metric "${r.objective.metric}" was missing in ${oe.length - ye.length}/${oe.length} successful repetitions.`
    ), be.size > 1 && re.push(`Objective metric resolved to inconsistent keys across repetitions: ${[...be].join(", ")}.`);
    const k = ye.map((Z) => Z.value), $ = D ? td(k) : void 0;
    return {
      id: Y.input.id,
      label: Y.input.label,
      status: Y.preparationErrors.length > 0 || Y.validationErrors.length > 0 ? "invalid" : D ? "completed" : "failed",
      metricKey: be.size === 1 ? (te = ye[0]) == null ? void 0 : te.key : void 0,
      metricValues: k,
      mean: D ? ks(k) : void 0,
      stddev: D ? iS(k) : void 0,
      confidenceInterval95: $ ? {
        level: 0.95,
        lower: $.lower,
        upper: $.upper
      } : void 0,
      runtimeMs: ks(X.map((Z) => Z.observation.durationMs)) ?? 0,
      observedMetrics: mS(X.map((Z) => Z.observation)),
      runs: X.map(({ repetition: Z, observation: E }) => {
        const L = Jh(
          E.metrics,
          r.objective,
          E.metricIdentities
        );
        return {
          repetition: Z,
          status: E.error ? "failed" : "completed",
          durationMs: E.durationMs,
          metricKey: L == null ? void 0 : L.key,
          metricValue: L == null ? void 0 : L.value,
          metricSource: L ? E.metricSources[L.observedKey] : void 0,
          observedMetrics: E.metrics,
          observedMetricIdentities: E.metricIdentities,
          observedMetricSources: E.metricSources,
          ...E.error ? { error: E.error } : {}
        };
      }),
      operationSummary: sS(Y.input.operations),
      errors: re
    };
  }), H = g.filter((Y) => Y.input.operations.length === 0);
  if (H.length === 1) {
    const Y = A.find((X) => X.id === H[0].input.id);
    if ((Y == null ? void 0 : Y.status) === "completed")
      for (const X of A) {
        if (X.id === Y.id || X.status !== "completed") continue;
        const oe = Jr(
          X.metricValues,
          Y.metricValues,
          r.objective.direction
        );
        oe && (X.baselineComparison = {
          baselineId: Y.id,
          meanDelta: oe.rawDelta,
          objectiveImprovement: oe.improvement,
          hedgesG: oe.hedgesG
        });
      }
  }
  if (new Set(
    A.filter((Y) => Y.status === "completed" && Y.metricKey).map((Y) => qu(Y.metricKey))
  ).size > 1) {
    const Y = A.filter((X) => X.status === "completed" && X.metricKey).map((X) => `${X.label}: ${X.metricKey}`).join(", ");
    for (const X of A)
      X.status === "completed" && (X.status = "failed", X.metricValues = [], X.mean = void 0, X.stddev = void 0, X.confidenceInterval95 = void 0, X.baselineComparison = void 0, X.errors.push(`Candidates resolved different objective metrics (${Y}); cross-candidate ranking was refused.`));
  }
  const R = A.filter((Y) => Y.status === "completed" && Y.mean !== void 0).sort((Y, X) => (r.objective.direction === "maximize" ? X.mean - Y.mean : Y.mean - X.mean) || Y.id.localeCompare(X.id)), I = R[0], ae = I ? Math.max(1, Math.abs(I.mean)) * Number.EPSILON * 8 : 0, Q = I ? R.filter((Y) => Math.abs(Y.mean - I.mean) <= ae) : [], ne = Q.length === 1 ? I : void 0, V = {
    id: al("experiment"),
    createdAt: y,
    hypothesis: r.hypothesis.trim(),
    objective: r.objective,
    repetitions: d,
    status: R.length === 0 ? "failed" : A.every((Y) => Y.status === "completed") ? "completed" : "partial",
    variants: A,
    baselineVariantId: H.length === 1 ? H[0].input.id : void 0,
    search: r.search ? nl(r.search) : void 0,
    winnerId: ne == null ? void 0 : ne.id,
    winnerLabel: ne == null ? void 0 : ne.label,
    insights: yS({ ...r, repetitions: d }, A, ne, Q)
  };
  if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  if (r.apply_best && ne) {
    const Y = g.find((ye) => ye.input.id === ne.id).input, X = s(), oe = Xh(a.graph.getGraph()) !== h;
    if (u(), X || oe)
      V.applyConflict = "The live graph changed while experiments were running; winner was not applied.";
    else if (Y.operations.some((ye) => ye.op !== "set_params"))
      V.applyConflict = "Automatic promotion supports parameter-only winners; this structural winner remains a proposal for review.";
    else if (Y.operations.length > 0) {
      if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
      const ye = Qh(m, Y.operations, b);
      if (ye.results.some((re) => !re.ok))
        V.applyConflict = `Winner promotion failed parameter preflight: ${ye.results.filter((re) => !re.ok).map((re) => re.error).join("; ")}`;
      else {
        try {
          V.applyResult = a.graph.applyOperations(Y.operations), V.appliedOperations = Y.operations, V.applyResult.results.every((re) => re.ok) ? V.appliedVariantId = ne.id : V.applyConflict = "Winner promotion was only partially applied; the canvas may contain a partial parameter update. Inspect operation errors.";
        } catch (re) {
          V.applyConflict = `Winner promotion threw unexpectedly; the canvas may contain a partial parameter update: ${String(re)}`;
        }
        V.applyConflict && a.ui.toast(V.applyConflict, "error");
      }
    } else
      V.appliedVariantId = ne.id;
  }
  if (l != null && l.aborted) throw new DOMException("Experiment cancelled", "AbortError");
  const se = (/* @__PURE__ */ new Date()).toISOString();
  try {
    const Y = await V1({
      session: V,
      request: r,
      baseline: m,
      definitions: b,
      pluginId: a.pluginId || T0,
      pluginVersion: M0,
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
    }), X = await ig(a, Y);
    if (X.cleanupFailures.length > 0) {
      const oe = `Portable study was saved, but ${X.cleanupFailures.length} unreferenced old blob(s) could not be cleaned up.`;
      V.insights.warnings.push(oe);
      try {
        a.ui.toast(oe, "warning");
      } catch {
      }
    }
  } catch (Y) {
    const X = `Experiment completed, but its portable study bundle could not be captured or saved: ${aS(Y)}`;
    V.insights.warnings.push(X);
    try {
      a.ui.toast(X, "warning");
    } catch {
    }
  }
  let ue = Wh(a, r, V, m, b);
  try {
    await cg(a, ue);
  } catch (Y) {
    const X = `Experiment completed, but its local history could not be saved: ${String(Y)}`;
    V.insights.warnings.push(X);
    try {
      a.ui.toast(X, "warning");
    } catch {
    }
    ue = Wh(a, r, V, m, b);
  }
  return ue;
}
async function ES(a, r, l) {
  let s = !1, u, d = !0;
  const f = () => {
    d && (d = !1, u == null || u());
  };
  try {
    u = a.graph.onGraphChanged(() => {
      d && (s = !0);
    });
  } catch {
    s = !0;
  }
  try {
    return await _S(
      a,
      r,
      l,
      () => s,
      f
    );
  } finally {
    f();
  }
}
const Iu = 1, AS = "mulberry32-v1", Ph = 4, ey = 32, Nu = 8, ty = 16, xS = /* @__PURE__ */ new Set([
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
]), NS = /* @__PURE__ */ new Set(["metric", "direction"]), jS = /* @__PURE__ */ new Set(["node_id", "param", "values"]), wS = /* @__PURE__ */ new Set(["int", "float", "bool", "select"]), $S = "Planner-only seed: it deterministically selects parameter assignments and does not seed graph nodes or make graph executions reproducible.";
function Ku(a, r) {
  if (!a || typeof a != "object" || Array.isArray(a))
    throw new Error(`${r} must be an object`);
  return a;
}
function Yu(a, r, l) {
  const s = Object.keys(a).filter((u) => !r.has(u));
  if (s.length > 0)
    throw new Error(`${l} contains unknown field(s): ${s.join(", ")}`);
}
function Qs(a, r) {
  if (typeof a != "string" || !a.trim())
    throw new Error(`${r} must be a non-empty string`);
  return a.trim();
}
function ny(a, r, l) {
  if (a === void 0) return r;
  if (typeof a != "boolean") throw new Error(`${l} must be a boolean`);
  return a;
}
function Xu(a, r, l, s, u) {
  const d = a === void 0 ? r : a;
  if (!Number.isInteger(d) || d < l || d > s)
    throw new Error(`${u} must be an integer from ${l} to ${s}`);
  return d;
}
function il(a) {
  return typeof a == "number" ? `number:${Object.is(a, -0) ? "0" : String(a)}` : `${typeof a}:${JSON.stringify(a)}`;
}
function ay(a, r, l) {
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
function TS(a, r, l) {
  const s = a.nodes.filter((d) => d.id === r);
  if (s.length === 0) throw new Error(`${l} references missing node '${r}'`);
  if (s.length > 1) throw new Error(`${l} references ambiguous duplicate node id '${r}'`);
  const u = s[0];
  if (!u.type || u.type === "note")
    throw new Error(`${l} node '${r}' has no optimizable node type`);
  return u;
}
function MS(a, r, l) {
  const s = a.filter((u) => u.node_name === r);
  if (s.length === 0) throw new Error(`${l} has no definition for node type '${r}'`);
  if (s.length > 1) throw new Error(`${l} found duplicate definitions for node type '${r}'`);
  return s[0];
}
function DS(a, r, l, s) {
  var R;
  const u = `optimizer.bindings[${r}]`, d = Ku(a, u);
  Yu(d, jS, u);
  const f = Qs(d.node_id, `${u}.node_id`), y = Qs(d.param, `${u}.param`), m = TS(l, f, u), h = MS(s, m.type, u), b = h.params.filter((I) => I.name === y);
  if (b.length === 0)
    throw new Error(`${u} references unknown parameter '${y}' on '${m.type}'`);
  if (b.length > 1)
    throw new Error(`${u} references ambiguous duplicate parameter '${y}' on '${m.type}'`);
  const g = b[0];
  if (!wS.has(g.param_type))
    throw new Error(
      `${u} parameter '${f}.${y}' has unsupported type '${String(g.param_type)}'; only int, float, bool, and select are allowed`
    );
  if (Aa(y))
    throw new Error(
      `${u} parameter '${f}.${y}' has a credential-shaped name and cannot be optimized; this is refused even when the node schema declares an otherwise supported parameter type`
    );
  if (!Array.isArray(d.values) || d.values.length === 0)
    throw new Error(`${u}.values must be a non-empty explicit domain`);
  if (d.values.length > ey)
    throw new Error(`${u}.values supports at most ${ey} values`);
  const _ = d.values.map((I, ae) => ay(g, I, `${u}.values[${ae}]`)), N = _.map(il);
  if (new Set(N).size !== N.length)
    throw new Error(`${u}.values must contain unique scalar values`);
  const z = (R = m.data) == null ? void 0 : R.params, H = !!z && Object.prototype.hasOwnProperty.call(z, y) ? z[y] : g.default, T = ay(g, H, `${u} baseline value`);
  return {
    node: m,
    definition: h,
    parameter: g,
    nodeId: f,
    paramName: y,
    baselineValue: T,
    domain: _
  };
}
function OS(a, r) {
  const l = new Array(a.length);
  let s = r;
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const d = a[u].domain;
    l[u] = d[s % d.length], s = Math.floor(s / d.length);
  }
  return l;
}
function CS(a) {
  let r = 0;
  for (const l of a) {
    const s = il(l.baselineValue), u = l.domain.findIndex((d) => il(d) === s);
    if (u < 0) return;
    r = r * l.domain.length + u;
  }
  return r;
}
function zS(a) {
  let r = a >>> 0;
  return () => {
    r = r + 1831565813 >>> 0;
    let l = r;
    return l = Math.imul(l ^ l >>> 15, l | 1) >>> 0, l ^= l + Math.imul(l ^ l >>> 7, l | 61), (l ^ l >>> 14) >>> 0;
  };
}
function RS(a, r, l) {
  const s = zS(l), u = /* @__PURE__ */ new Map(), d = [];
  for (let f = 0; f < r; f += 1) {
    const y = a - f, m = s() % y, h = u.get(m) ?? m, b = y - 1, g = u.get(b) ?? b;
    m !== b ? u.set(m, g) : u.delete(m), u.delete(b), d.push(h);
  }
  return d;
}
function US(a, r) {
  const l = [], s = /* @__PURE__ */ new Map();
  return a.forEach((u, d) => {
    s.has(u.nodeId) || (s.set(u.nodeId, []), l.push(u.nodeId)), s.get(u.nodeId).push([u.paramName, r[d]]);
  }), l.map((u) => ({
    op: "set_params",
    node_id: u,
    params: Object.fromEntries(s.get(u))
  }));
}
function LS(a, r) {
  return r.every((l, s) => il(l) === il(a[s].baselineValue));
}
function VS(a) {
  const r = Ku(a, "optimizer");
  if (Yu(r, xS, "optimizer"), r.version !== void 0 && r.version !== Iu)
    throw new Error(`optimizer.version must be ${Iu}`);
  if (r.strategy !== "grid" && r.strategy !== "seeded_random")
    throw new Error("optimizer.strategy must be grid or seeded_random");
  const l = Qs(r.hypothesis, "optimizer.hypothesis"), s = Ku(r.objective, "optimizer.objective");
  Yu(s, NS, "optimizer.objective");
  const u = Qs(s.metric, "optimizer.objective.metric");
  if (s.direction !== "maximize" && s.direction !== "minimize")
    throw new Error("optimizer.objective.direction must be maximize or minimize");
  return {
    raw: r,
    strategy: r.strategy,
    hypothesis: l,
    objective: { metric: u, direction: s.direction },
    repetitions: Xu(r.repetitions, 1, 1, 5, "optimizer.repetitions"),
    concurrency: Xu(r.concurrency, 1, 1, 2, "optimizer.concurrency"),
    includeBaseline: ny(r.include_baseline, !0, "optimizer.include_baseline"),
    applyBest: ny(r.apply_best, !1, "optimizer.apply_best")
  };
}
function BS(a, r, l) {
  const s = VS(a);
  if (!Array.isArray(s.raw.bindings) || s.raw.bindings.length < 1 || s.raw.bindings.length > Ph)
    throw new Error(`optimizer.bindings must contain 1 to ${Ph} bindings`);
  if (!r || !Array.isArray(r.nodes) || !Array.isArray(r.edges))
    throw new Error("current graph must contain nodes and edges arrays");
  if (!Array.isArray(l)) throw new Error("node definitions must be an array");
  const u = s.raw.bindings.map((Q, ne) => DS(Q, ne, r, l)), d = u.map((Q) => `${Q.nodeId}\0${Q.paramName}`);
  if (new Set(d).size !== d.length)
    throw new Error("optimizer.bindings must not repeat the same node parameter");
  const f = u.reduce((Q, ne) => Q * ne.domain.length, 1), y = CS(u), m = Nu - (s.includeBaseline ? 1 : 0);
  let h, b;
  const g = f - (y === void 0 ? 0 : 1);
  if (s.strategy === "grid") {
    if (s.raw.candidate_count !== void 0)
      throw new Error("optimizer.candidate_count is only allowed for seeded_random");
    if (s.raw.seed !== void 0)
      throw new Error("optimizer.seed is only allowed for seeded_random");
    if (g > m)
      throw new Error(
        `Grid Cartesian product has ${g} changed assignments but only ${m} candidate slots are available; narrow the domains instead of truncating the grid`
      );
    h = Array.from({ length: f }, (Q, ne) => ne).filter((Q) => Q !== y);
  } else {
    const Q = Xu(
      s.raw.candidate_count,
      Number.NaN,
      1,
      m,
      "optimizer.candidate_count"
    );
    if (!Number.isInteger(s.raw.seed) || s.raw.seed < 0 || s.raw.seed > 4294967295)
      throw new Error("optimizer.seed is required for seeded_random and must be a uint32 integer");
    if (b = s.raw.seed, Q > g)
      throw new Error(
        `seeded_random requested ${Q} unique changed assignments, but only ${g} are available`
      );
    h = RS(g, Q, b).map((V) => y !== void 0 && V >= y ? V + 1 : V);
  }
  const _ = h.map((Q) => ({
    domainIndex: Q,
    assignment: OS(u, Q)
  })).filter(({ assignment: Q }) => !LS(u, Q));
  if (_.length === 0)
    throw new Error("optimizer search space contains no assignment different from the current graph baseline");
  const N = s.includeBaseline ? [{ id: "baseline", label: "Baseline", operations: [] }] : [], z = s.strategy === "grid" ? "grid" : "random", A = _.map(({ assignment: Q }, ne) => ({
    id: `optimizer-${z}-${String(ne + 1).padStart(3, "0")}`,
    label: `${s.strategy === "grid" ? "Grid" : "Random"} ${ne + 1}: ${u.map((V, se) => `${V.nodeId}.${V.paramName}=${JSON.stringify(Q[se])}`).join(", ")}`,
    operations: US(u, Q)
  })), H = [...N, ...A];
  if (H.length > Nu)
    throw new Error(`optimizer compiled ${H.length} variants; maximum is ${Nu}`);
  const T = H.length * s.repetitions;
  if (T > ty)
    throw new Error(
      `optimizer compiled ${H.length} variants x ${s.repetitions} repetitions = ${T} executions; maximum is ${ty}`
    );
  const R = _.map(
    ({ domainIndex: Q, assignment: ne }, V) => ({
      variantId: A[V].id,
      domainIndex: Q,
      values: u.map((se, ue) => ({
        nodeId: se.nodeId,
        param: se.paramName,
        value: ne[ue]
      }))
    })
  ), I = {
    schemaVersion: Iu,
    strategy: s.strategy,
    prngVersion: s.strategy === "seeded_random" ? AS : void 0,
    plannerSeed: b,
    seedDescription: $S,
    includesBaseline: s.includeBaseline,
    totalDomainAssignments: f,
    baselineAssignmentExcluded: y !== void 0,
    generatedCandidateCount: A.length,
    totalVariantCount: H.length,
    totalExecutionCount: T,
    bindings: u.map((Q) => ({
      nodeId: Q.nodeId,
      nodeType: Q.node.type,
      param: Q.paramName,
      paramType: Q.parameter.param_type,
      baselineValue: Q.baselineValue,
      domain: [...Q.domain]
    })),
    assignments: R
  };
  return {
    request: {
      hypothesis: s.hypothesis,
      objective: s.objective,
      variants: H,
      repetitions: s.repetitions,
      concurrency: s.concurrency,
      apply_best: s.applyBest,
      search: I
    },
    metadata: I
  };
}
const iy = 16, ry = 2, HS = [
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
function Zs(a) {
  const r = a.graph.getGraph();
  return JSON.stringify({ nodes: r.nodes, edges: r.edges, presets: r.presets ?? [] });
}
function GS(a) {
  if (typeof a == "string") return JSON.stringify(a);
  const r = JSON.stringify(a);
  return r === void 0 ? String(a) : r.length > 180 ? `${r.slice(0, 177)}...` : r;
}
function ly(a) {
  if (!a) return "";
  const r = Object.entries(a).map(([l, s]) => `${l}=${GS(s)}`);
  return r.length > 0 ? r.join(", ") : "no parameters";
}
function qS(a) {
  switch (a.op) {
    case "add_node": {
      const r = ly(a.params);
      return `add ${a.node_type}${r ? ` with ${r}` : ""}`;
    }
    case "set_params":
      return `set ${a.node_id}: ${ly(a.params)}`;
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
function ju(a, r) {
  const l = a.role === "user" && a.attachments && a.attachments.length > 0 ? $y(a.content, a.attachments, r) : a.content, s = { role: a.role, content: l };
  return a.tool_calls && (s.tool_calls = a.tool_calls), a.tool_call_id && (s.tool_call_id = a.tool_call_id), s;
}
function sy(a, r) {
  const l = /* @__PURE__ */ new Map();
  a.forEach((u, d) => {
    const f = u.op, y = r[d], m = y ? y.ok : !1;
    l.has(f) || l.set(f, { ok: 0, fail: 0 });
    const h = l.get(f);
    m ? h.ok++ : h.fail++;
  });
  const s = [];
  for (const [u, d] of l) {
    const f = d.ok + d.fail;
    d.fail === 0 ? s.push(`${u} x${f} ok`) : d.ok === 0 ? s.push(`${u} x${f} FAILED`) : s.push(`${u} x${f} (${d.ok} ok, ${d.fail} FAILED)`);
  }
  return s.join(", ");
}
function IS(a, r, l, s, u) {
  const f = { role: "system", content: $0(
    a.graph.getNodeDefinitions(),
    a.graph.getGraph()
  ) }, y = r.slice(-20), m = r.flatMap((_) => _.tool_calls ?? []), h = new Map(m.map((_) => [_.id, _])), b = y.map((_) => {
    if (_.role === "user") return ju(_, u);
    if (_.role === "tool") {
      const N = _.tool_call_id ? h.get(_.tool_call_id) : void 0, z = Js(
        N ?? { id: _.tool_call_id ?? "legacy", name: "legacy_tool", arguments: {} },
        _.content,
        a
      );
      return ju({ ..._, content: z }, u);
    }
    return ju({
      ..._,
      content: Uu(_.content, m, a),
      ..._.tool_calls ? { tool_calls: Cy(_.tool_calls, a) } : {}
    }, u);
  }), g = {
    role: "user",
    content: $y(l, s, u)
  };
  return [f, ...b, g];
}
function dg(a, r, l = HS, s = 8192) {
  const u = a.provider, d = a.models[u] ?? "", f = {
    provider: u,
    model: d,
    messages: r,
    tools: l,
    max_tokens: s
  };
  if (u !== "openai-codex") {
    const m = u === "openai" ? a.apiKeys.openai : u === "openrouter" ? a.apiKeys.openrouter : u === "anthropic" ? a.apiKeys.anthropic : u === "custom" ? a.apiKeys.custom : void 0;
    m && (f.api_key = m);
  }
  u === "custom" && a.customBaseUrl && (f.base_url = a.customBaseUrl);
  const y = Ls(a);
  return y && (f.reasoning_effort = y), f;
}
async function fg(a) {
  const r = (f) => {
    const y = Js(
      { name: "validate_graph", arguments: {} },
      JSON.stringify(f),
      a
    );
    try {
      const m = JSON.parse(y);
      let h = m.valid === !0;
      const b = Array.isArray(m.errors) ? m.errors.filter((g) => typeof g == "string") : [];
      return h && b.length > 0 && (h = !1), !h && b.length === 0 && b.push("Graph validation failed without diagnostic details."), { valid: h, errors: b };
    } catch {
      return { valid: !1, errors: ["Graph validation returned an unreadable result."] };
    }
  }, l = a.graph.getGraph(), s = l.nodes.filter((f) => f.type !== "note"), u = new Set(s.map((f) => f.id)), d = l.edges.filter((f) => typeof f.source == "string" && typeof f.target == "string" && u.has(f.source) && u.has(f.target));
  try {
    const f = await a.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: s, edges: d, presets: l.presets ?? [] })
    });
    if (!f.ok)
      return r({ valid: !1, errors: [`validate request failed: HTTP ${f.status}`] });
    const y = await f.json();
    return r({
      valid: y.valid === !0,
      errors: Array.isArray(y.errors) ? y.errors.filter((m) => typeof m == "string") : []
    });
  } catch (f) {
    return r({ valid: !1, errors: [`validate request error: ${String(f)}`] });
  }
}
async function KS(a) {
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
  let s;
  try {
    s = Zs(a);
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
  const u = await fg(a);
  let d;
  try {
    d = Zs(a);
  } catch {
  }
  const f = r || d === void 0 || d !== s;
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
async function YS(a, r, l, s, u) {
  const f = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + s },
    { role: "user", content: l }
  ];
  let y = "";
  try {
    await Ty(
      a,
      dg(r, f, [], 1024),
      {
        onText: (m) => {
          y += m;
        },
        onDone: (m) => {
          !y && m.message.content && (y = m.message.content);
        },
        onError: (m) => {
          y += `
(research error: ${m})`;
        }
      },
      u
    );
  } catch (m) {
    return `(research failed: ${String(m)})`;
  }
  return y.trim() || "(no answer)";
}
async function pg(a, r, l, s, u, d, f, y = !1) {
  const { name: m, arguments: h } = a;
  if (m === "apply_graph_operations") {
    const b = h.operations;
    if (!Array.isArray(b))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let g;
    try {
      g = r.graph.applyOperations(b);
    } catch (N) {
      return JSON.stringify({ error: `applyOperations threw: ${String(N)}` });
    }
    const _ = sy(b, g.results);
    return u.push(_), s.onOpsApplied(_, g), JSON.stringify({
      results: g.results,
      refs: g.refs,
      node_count: g.node_count,
      edge_count: g.edge_count
    });
  }
  if (m === "get_node_schemas") {
    const g = (Array.isArray(h.node_types) ? h.node_types : []).map((T) => String(T)), _ = r.graph.getNodeDefinitions(), N = new Map(_.map((T) => [T.node_name, T])), z = g.map((T) => N.get(T)).filter((T) => !!T), A = g.filter((T) => !N.has(T));
    let H = z.length > 0 ? w0(z) : "(no matching node types)";
    return A.length > 0 && (H += `
(unknown node types, not in catalog: ${A.join(", ")})`), H;
  }
  if (m === "validate_graph")
    return JSON.stringify(await fg(r));
  if (m === "research") {
    const g = (Array.isArray(h.questions) ? h.questions : []).map((z) => String(z)).filter((z) => z.trim()).slice(0, 4);
    if (g.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const _ = zy(r.graph.getNodeDefinitions()), N = await Promise.all(
      g.map((z) => YS(r, l, z, _, f))
    );
    return g.map((z, A) => `[${A + 1}] Q: ${z}
A: ${N[A]}`).join(`

`);
  }
  if (m === "optimize_graph_parameters") {
    let b;
    try {
      b = BS(
        h,
        r.graph.getGraph(),
        r.graph.getNodeDefinitions()
      );
    } catch (_) {
      return JSON.stringify({ error: String(_) });
    }
    const g = await pg(
      {
        id: a.id,
        name: "run_graph_experiments",
        arguments: b.request
      },
      r,
      l,
      s,
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
  if (m === "run_graph_experiments") {
    if (h.search !== void 0 && !y)
      return JSON.stringify({
        error: "search metadata is internal optimizer provenance; call optimize_graph_parameters instead"
      });
    let b;
    try {
      b = SS(h);
    } catch (T) {
      return JSON.stringify({ error: String(T) });
    }
    if (b > d.remaining)
      return JSON.stringify({
        error: `Experiment turn budget exceeded: ${b} requested, ${d.remaining} of ${Xs} executions remain.`
      });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    if (!s.onExperimentApproval)
      return JSON.stringify({
        error: "Experiment execution requires an interactive user confirmation, but this client did not provide one."
      });
    const g = h;
    let _ = !1, N;
    try {
      N = r.graph.onGraphChanged(() => {
        _ = !0;
      });
    } catch (T) {
      return JSON.stringify({ error: `Cannot safely watch the graph during approval: ${String(T)}` });
    }
    let z;
    try {
      z = Zs(r);
    } catch (T) {
      return N(), JSON.stringify({ error: `Cannot capture the graph before approval: ${String(T)}` });
    }
    let A;
    try {
      try {
        const T = y ? {
          ...a,
          arguments: Object.fromEntries(
            Object.entries(a.arguments).filter(([I]) => I !== "search")
          )
        } : a, R = Oy(T, r).arguments;
        A = await s.onExperimentApproval({
          hypothesis: R.hypothesis,
          variantCount: g.variants.length,
          repetitions: g.repetitions ?? 1,
          executionCount: b,
          concurrency: g.concurrency ?? 1,
          applyBest: g.apply_best ?? !1,
          variants: R.variants.map((I) => ({
            label: I.label,
            operations: I.operations.map(qS)
          })),
          nodeTypes: [.../* @__PURE__ */ new Set([
            ...r.graph.getGraph().nodes.map((I) => I.type).filter((I) => !!I && I !== "note"),
            ...g.variants.flatMap((I) => I.operations.filter((ae) => ae.op === "add_node").map((ae) => ae.node_type))
          ])]
        });
      } catch (T) {
        return f != null && f.aborted ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." }) : JSON.stringify({ error: `Experiment approval failed: ${String(T)}` });
      }
    } finally {
      N();
    }
    if (!A)
      return JSON.stringify({ cancelled: !0, error: "Experiment execution was not approved by the user." });
    if (f != null && f.aborted)
      return JSON.stringify({ cancelled: !0, error: "Experiment cancelled before execution." });
    let H;
    try {
      H = Zs(r) !== z;
    } catch (T) {
      return JSON.stringify({ error: `Cannot re-check the graph after approval: ${String(T)}` });
    }
    if (_ || H)
      return JSON.stringify({
        cancelled: !0,
        replan: !0,
        error: "The active graph changed while execution approval was open. Re-read the graph and propose the study again."
      });
    d.remaining -= b;
    try {
      const T = await ES(
        r,
        h,
        f
      );
      if (T.applyResult && T.appliedOperations) {
        const Q = `promote experiment winner: ${sy(
          T.appliedOperations,
          T.applyResult.results
        )}`;
        u.push(Q), s.onOpsApplied(Q, T.applyResult);
      }
      const { applyResult: R, appliedOperations: I, ...ae } = T;
      return JSON.stringify(ae);
    } catch (T) {
      return f != null && f.aborted || T instanceof DOMException && T.name === "AbortError" ? JSON.stringify({ cancelled: !0, error: "Experiment cancelled." }) : JSON.stringify({ error: String(T) });
    }
  }
  return m === "get_current_graph" ? Ry(r.graph.getGraph(), r.graph.getNodeDefinitions()) : JSON.stringify({ error: `Unknown tool: ${m}` });
}
async function XS(a) {
  const { api: r, settings: l, history: s, userText: u, attachments: d, callbacks: f, signal: y } = a, m = [], h = IS(
    r,
    s,
    u,
    d,
    l.provider
  );
  let b = 0, g = 0, _ = !1;
  const N = [], z = { remaining: Xs }, A = (T) => {
    var R;
    m.push(T), (R = f.onTurnAppended) == null || R.call(f, T);
  }, H = (T) => {
    const R = Uu(T, N, r);
    R.trim() && A({ role: "assistant", content: R });
  };
  try {
    for (; ; ) {
      let T = "", R = null, I = null;
      if (await Ty(
        r,
        dg(l, h),
        {
          onText(re) {
            T += re, f.onTextDelta(re);
          },
          onDone(re) {
            R = re;
          },
          onError(re) {
            I = re;
          }
        },
        y
      ), I !== null) {
        H(T), f.onTurnsCommitted(m), f.onError(I), f.onFinished();
        return;
      }
      if (!R) {
        H(T), f.onTurnsCommitted(m), f.onFinished();
        return;
      }
      const ae = R, Q = ae.message.tool_calls ?? [], ne = ae.message.content || T, V = Uu(
        ne,
        [...N, ...Q],
        r
      );
      if (ae.stop_reason === "end" || Q.length === 0) {
        const re = r.graph.getGraph();
        if (_ && Array.isArray(re.nodes) && re.nodes.length > 0) {
          const be = await KS(r);
          if (!be.valid) {
            if (g >= ry) {
              V.trim() && A({ role: "assistant", content: V }), A({
                role: "assistant",
                content: `I could not complete a runnable graph after ${ry} correction attempts. The current graph still fails CodefyUI validation:
` + be.errors.map((D) => `- ${D}`).join(`
`)
              }), f.onTurnsCommitted(m), f.onFinished();
              return;
            }
            g++, V.trim() && A({ role: "assistant", content: V }), h.push({ role: "assistant", content: V }), h.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + be.errors.map((D) => `- ${D}`).join(`
`)
            });
            continue;
          }
        }
        A({ role: "assistant", content: V }), f.onTurnsCommitted(m), f.onFinished();
        return;
      }
      b++;
      const se = Cy(Q, r);
      N.push(...Q);
      const ue = {
        role: "assistant",
        content: V,
        tool_calls: se
      }, Y = m.length;
      A(ue);
      const X = [], oe = [];
      for (const re of Q) {
        const be = X.length, D = await pg(
          re,
          r,
          l,
          f,
          X,
          z,
          y
        );
        X.length > be && (_ = !0);
        const k = Js(re, D, r);
        if (A({
          role: "tool",
          content: k,
          tool_call_id: re.id
        }), oe.push({
          role: "tool",
          content: k,
          tool_call_id: re.id
        }), y != null && y.aborted) {
          f.onTurnsCommitted(m), f.onFinished();
          return;
        }
      }
      X.length > 0 && (m[Y] = { ...ue, opsSummary: X.join("; ") });
      const ye = {
        role: "assistant",
        content: V,
        tool_calls: Q
      };
      if (h.push(ye), h.push(...oe), b >= iy) {
        A({
          role: "assistant",
          content: `(stopped after ${iy} tool rounds)`
        }), f.onTurnsCommitted(m), f.onFinished();
        return;
      }
    }
  } catch (T) {
    f.onTurnsCommitted(m), f.onError(String(T)), f.onFinished();
  }
}
function kS(a) {
  const r = [];
  return a.forEach((l, s) => {
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
      key: s,
      turn: l,
      stages: (l.tool_calls ?? []).map((u) => ({ call: u }))
    });
  }), r;
}
const xa = {
  apply_graph_operations: "Edit graph",
  get_current_graph: "Read graph",
  get_node_schemas: "Node schemas",
  validate_graph: "Validate graph",
  research: "Research",
  run_graph_experiments: "Experiment study",
  optimize_graph_parameters: "Parameter search"
};
function Ki(a) {
  try {
    const r = JSON.parse(a);
    return r && typeof r == "object" && !Array.isArray(r) ? r : null;
  } catch {
    return null;
  }
}
function QS(a) {
  const r = Array.isArray(a.operations) ? a.operations : [], l = /* @__PURE__ */ new Map();
  for (const s of r) {
    const u = s && typeof s == "object" ? String(s.op ?? "?") : "?";
    l.set(u, (l.get(u) ?? 0) + 1);
  }
  return [...l].map(([s, u]) => `${s} ×${u}`).join(", ");
}
function Yn(a, r) {
  return a.length > r ? a.slice(0, r - 1) + "…" : a;
}
function un(a) {
  try {
    return Yn(JSON.stringify(JSON.parse(a), null, 2), 4e3);
  } catch {
    return Yn(a, 4e3);
  }
}
function qi(a, r) {
  return `${a} ${r}${a === 1 ? "" : "s"}`;
}
function ZS(a, r) {
  const l = xa.apply_graph_operations, s = QS(a);
  if (!r)
    return { label: l, summary: s || "applying operations", status: "running" };
  const u = Ki(r.content);
  if (!u)
    return { label: l, summary: s, status: "ok", detail: un(r.content) };
  if (typeof u.error == "string")
    return { label: l, summary: Yn(u.error, 120), status: "error", detail: un(r.content) };
  const f = (Array.isArray(u.results) ? u.results : []).filter((b) => !b.ok).length, y = typeof u.node_count == "number" ? u.node_count : null, m = typeof u.edge_count == "number" ? u.edge_count : null, h = [];
  return s && h.push(s), f > 0 && h.push(`${f} failed`), y !== null && m !== null && h.push(`${qi(y, "node")} · ${qi(m, "edge")}`), {
    label: l,
    summary: h.join(" — ") || "applied",
    status: f > 0 ? "error" : "ok",
    detail: un(r.content)
  };
}
function JS(a) {
  const r = xa.validate_graph;
  if (!a) return { label: r, summary: "checking…", status: "running" };
  const l = Ki(a.content), s = Array.isArray(l == null ? void 0 : l.errors) ? l.errors.map(String) : [];
  return l != null && l.valid ? { label: r, summary: "graph is runnable", status: "ok" } : {
    label: r,
    summary: s.length > 0 ? qi(s.length, "issue") : "not runnable",
    status: "error",
    detail: s.length > 0 ? s.map((u) => `• ${u}`).join(`
`) : un(a.content)
  };
}
function FS(a) {
  const r = xa.get_current_graph;
  if (!a) return { label: r, summary: "reading…", status: "running" };
  const l = Ki(a.content), s = Array.isArray(l == null ? void 0 : l.nodes) ? l.nodes.length : null, u = Array.isArray(l == null ? void 0 : l.edges) ? l.edges.length : null;
  return {
    label: r,
    summary: s !== null && u !== null ? `${qi(s, "node")} · ${qi(u, "edge")}` : "snapshot",
    status: "ok",
    detail: un(a.content)
  };
}
function WS(a, r) {
  const l = xa.get_node_schemas, s = Array.isArray(a.node_types) ? a.node_types.map(String) : [], u = s.length > 0 ? Yn(s.join(", "), 90) : "node types";
  return r ? { label: l, summary: u, status: "ok", detail: Yn(r.content, 4e3) } : { label: l, summary: u, status: "running" };
}
function PS(a, r) {
  const l = xa.research, s = Array.isArray(a.questions) ? a.questions.length : 0, u = s > 0 ? `${qi(s, "question")} in parallel` : "researching";
  return r ? { label: l, summary: u, status: "ok", detail: Yn(r.content, 4e3) } : { label: l, summary: u, status: "running" };
}
function e_(a, r) {
  const l = xa.run_graph_experiments, s = Array.isArray(a.variants) ? a.variants.length : 0, u = typeof a.repetitions == "number" ? a.repetitions : 1, d = s > 0 ? `${s} candidates · ${s * u} runs` : "preparing study";
  if (!r) return { label: l, summary: d, status: "running" };
  const f = Ki(r.content);
  if (!f || typeof f.error == "string")
    return {
      label: l,
      summary: typeof (f == null ? void 0 : f.error) == "string" ? Yn(f.error, 120) : "study failed",
      status: "error",
      detail: un(r.content)
    };
  const y = typeof f.winnerLabel == "string" ? f.winnerLabel : null, m = typeof f.appliedVariantId == "string";
  return {
    label: l,
    summary: y ? `${y} ranked first${m ? " · applied" : ""}` : "no rankable metric",
    status: y ? "ok" : "error",
    detail: un(r.content)
  };
}
function t_(a, r) {
  const l = xa.optimize_graph_parameters, s = Array.isArray(a.bindings) ? a.bindings.length : 0, u = a.strategy === "seeded_random" ? "seeded random" : "grid", d = typeof a.repetitions == "number" ? a.repetitions : 1, f = a.strategy === "seeded_random" && typeof a.candidate_count == "number" ? a.candidate_count + (a.include_baseline === !1 ? 0 : 1) : void 0, y = f ? `${u} · ${s} params · ${f * d} runs` : `${u} · ${s} ${s === 1 ? "parameter" : "parameters"}`;
  if (!r) return { label: l, summary: y, status: "running" };
  const m = Ki(r.content);
  if (!m || typeof m.error == "string")
    return {
      label: l,
      summary: typeof (m == null ? void 0 : m.error) == "string" ? Yn(m.error, 120) : "search failed",
      status: "error",
      detail: un(r.content)
    };
  const h = typeof m.winnerLabel == "string" ? m.winnerLabel : null, b = typeof m.appliedVariantId == "string";
  return {
    label: l,
    summary: h ? `${h} ranked first${b ? " · applied" : ""}` : "no rankable metric",
    status: h ? "ok" : "error",
    detail: un(r.content)
  };
}
function n_(a, r) {
  const l = xa[a.name] ?? a.name;
  if (!r) return { label: l, summary: "running…", status: "running" };
  const s = Ki(r.content);
  return s && typeof s.error == "string" ? { label: l, summary: Yn(s.error, 120), status: "error", detail: un(r.content) } : { label: l, summary: "done", status: "ok", detail: un(r.content) };
}
function a_(a) {
  const { call: r, result: l } = a, s = r.arguments ?? {};
  switch (r.name) {
    case "apply_graph_operations":
      return ZS(s, l);
    case "validate_graph":
      return JS(l);
    case "get_current_graph":
      return FS(l);
    case "get_node_schemas":
      return WS(s, l);
    case "research":
      return PS(s, l);
    case "run_graph_experiments":
      return e_(s, l);
    case "optimize_graph_parameters":
      return t_(s, l);
    default:
      return n_(r, l);
  }
}
const i_ = /`([^`\n]+)`/, r_ = /\[([^\]\n]+)\]\(([^)\s]+)\)/, l_ = /\*\*([^\n]+?)\*\*/, s_ = /(^|[\s(])\*([^\s*](?:[^*\n]*?[^\s*])?)\*(?=[\s).,!?:;]|$)/;
function o_(a) {
  let r = null;
  const l = (y) => {
    y && (r === null || y.index < r.index) && (r = y);
  }, s = i_.exec(a);
  s && l({
    index: s.index,
    length: s[0].length,
    node: (y) => /* @__PURE__ */ v.jsx("code", { children: s[1] }, y)
  });
  const u = r_.exec(a);
  if (u) {
    const y = u[2];
    l({
      index: u.index,
      length: u[0].length,
      node: (m) => /^https?:\/\//i.test(y) ? /* @__PURE__ */ v.jsx("a", { href: y, target: "_blank", rel: "noopener noreferrer", children: u[1] }, m) : u[0]
    });
  }
  const d = l_.exec(a);
  d && l({
    index: d.index,
    length: d[0].length,
    node: (y) => /* @__PURE__ */ v.jsx("strong", { children: Xr(d[1]) }, y)
  });
  const f = s_.exec(a);
  return f && l({
    index: f.index,
    length: f[0].length,
    prefix: f[1],
    node: (y) => /* @__PURE__ */ v.jsx("em", { children: Xr(f[2]) }, y)
  }), r;
}
function Xr(a) {
  const r = [];
  let l = a, s = 0;
  for (; l.length > 0; ) {
    const u = o_(l);
    if (!u) {
      r.push(l);
      break;
    }
    const d = l.slice(0, u.index) + (u.prefix ?? "");
    d && r.push(d), r.push(u.node(s++)), l = l.slice(u.index + u.length);
  }
  return r;
}
const c_ = /^(#{1,3})\s+(.*)$/, u_ = /^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/, d_ = /^\s*[-*]\s+(.*)$/, f_ = /^\s*\d+[.)]\s+(.*)$/;
function oy(a, r) {
  const l = a.split(`
`), s = [];
  let u = [], d = null, f = 0;
  const y = () => {
    u.length !== 0 && (s.push(
      /* @__PURE__ */ v.jsx("p", { className: "gcp-md-p", children: Xr(u.join(`
`)) }, `${r}-p${f++}`)
    ), u = []);
  }, m = () => {
    if (!d) return;
    const h = d.items.map((b, g) => /* @__PURE__ */ v.jsx("li", { children: Xr(b) }, g));
    s.push(
      d.ordered ? /* @__PURE__ */ v.jsx("ol", { className: "gcp-md-list", children: h }, `${r}-l${f++}`) : /* @__PURE__ */ v.jsx("ul", { className: "gcp-md-list", children: h }, `${r}-l${f++}`)
    ), d = null;
  };
  for (const h of l) {
    const b = c_.exec(h);
    if (b) {
      y(), m(), s.push(
        /* @__PURE__ */ v.jsx("div", { className: `gcp-md-h${b[1].length}`, children: Xr(b[2]) }, `${r}-h${f++}`)
      );
      continue;
    }
    if (u_.test(h)) {
      y(), m(), s.push(/* @__PURE__ */ v.jsx("hr", { className: "gcp-md-hr" }, `${r}-r${f++}`));
      continue;
    }
    const g = d_.exec(h), _ = g ? null : f_.exec(h);
    if (g || _) {
      y();
      const N = !!_;
      (!d || d.ordered !== N) && (m(), d = { ordered: N, items: [] }), d.items.push((g ?? _)[1]);
      continue;
    }
    if (h.trim() === "") {
      y(), m();
      continue;
    }
    m(), u.push(h);
  }
  return y(), m(), s;
}
const wu = /```[^\n]*\n?([\s\S]*?)(?:```|$)/g;
function p_({ text: a }) {
  const r = [];
  let l = 0, s = 0;
  wu.lastIndex = 0;
  for (let u = wu.exec(a); u !== null && (u.index > l && r.push(...oy(a.slice(l, u.index), `s${s++}`)), r.push(
    /* @__PURE__ */ v.jsx("pre", { children: /* @__PURE__ */ v.jsx("code", { children: u[1] }) }, `c${s++}`)
  ), l = u.index + u[0].length, u[0].length !== 0); u = wu.exec(a))
    ;
  return l < a.length && r.push(...oy(a.slice(l), `s${s++}`)), /* @__PURE__ */ v.jsx(v.Fragment, { children: r });
}
function m_({ kind: a }) {
  return /* @__PURE__ */ v.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    a === "pdf" ? /* @__PURE__ */ v.jsx("path", { d: "M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ v.jsx("path", { d: "M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function h_() {
  return /* @__PURE__ */ v.jsx("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function y_() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M12 5v9", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "19", r: "1.7", fill: "currentColor" })
  ] });
}
function g_({ open: a }) {
  return /* @__PURE__ */ v.jsx(
    "svg",
    {
      className: `gcp-stage-chevron${a ? " open" : ""}`,
      width: "11",
      height: "11",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ v.jsx("path", { d: "M9 6l6 6-6 6", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}
function v_(a) {
  const r = a.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), l = [];
  return r.forEach((s, u) => {
    if (s.startsWith("```")) {
      const d = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      l.push(/* @__PURE__ */ v.jsx("pre", { children: /* @__PURE__ */ v.jsx("code", { children: d }) }, u));
    } else s && l.push(/* @__PURE__ */ v.jsx("span", { children: s }, u));
  }), l;
}
function b_({ stage: a }) {
  const [r, l] = P.useState(!1), s = a_(a), u = !!s.detail;
  return /* @__PURE__ */ v.jsxs("div", { className: `gcp-stage ${s.status}`, children: [
    /* @__PURE__ */ v.jsxs(
      "button",
      {
        type: "button",
        className: "gcp-stage-head",
        onClick: () => u && l((d) => !d),
        "aria-expanded": u ? r : void 0,
        "aria-label": `${s.label}${s.summary ? `: ${s.summary}` : ""}`,
        disabled: !u,
        children: [
          /* @__PURE__ */ v.jsx("span", { className: "gcp-stage-status", "aria-hidden": "true", children: s.status === "running" ? /* @__PURE__ */ v.jsx("span", { className: "gcp-stage-spinner" }) : s.status === "ok" ? /* @__PURE__ */ v.jsx(h_, {}) : /* @__PURE__ */ v.jsx(y_, {}) }),
          /* @__PURE__ */ v.jsx("span", { className: "gcp-stage-label", children: s.label }),
          s.summary && /* @__PURE__ */ v.jsx("span", { className: "gcp-stage-summary", children: s.summary }),
          u && /* @__PURE__ */ v.jsx(g_, { open: r })
        ]
      }
    ),
    r && s.detail && /* @__PURE__ */ v.jsx("pre", { className: "gcp-stage-detail", children: s.detail })
  ] });
}
function cy({
  turn: a,
  stages: r = [],
  streaming: l = !1,
  streamingText: s
}) {
  if (a.role === "tool") return null;
  const u = a.role === "user", d = l && s !== void 0 ? s : a.content, f = d.trim().length > 0, y = a.attachments ?? [];
  return /* @__PURE__ */ v.jsxs("div", { className: `gcp-msg-row ${u ? "user" : "assistant"}`, children: [
    y.length > 0 && /* @__PURE__ */ v.jsx("div", { className: "gcp-bubble-attachments", children: y.map(
      (m, h) => m.kind === "image" && m.dataUrl ? /* @__PURE__ */ v.jsx("img", { className: "gcp-att-image", src: m.dataUrl, alt: m.name, title: m.name }, h) : /* @__PURE__ */ v.jsxs("span", { className: "gcp-att-file", title: m.name, children: [
        /* @__PURE__ */ v.jsx(m_, { kind: m.kind }),
        /* @__PURE__ */ v.jsx("span", { className: "gcp-att-file-name", children: m.name })
      ] }, h)
    ) }),
    (f || l && r.length === 0) && /* @__PURE__ */ v.jsxs("div", { className: "gcp-bubble", children: [
      u ? v_(d) : /* @__PURE__ */ v.jsx(p_, { text: d }),
      l && /* @__PURE__ */ v.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    r.length > 0 && /* @__PURE__ */ v.jsx("div", { className: "gcp-stages", children: r.map((m, h) => /* @__PURE__ */ v.jsx(b_, { stage: m }, `${m.call.id}-${h}`)) }),
    !u && a.opsSummary && r.length === 0 && /* @__PURE__ */ v.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ v.jsxs("span", { children: [
      "Applied: ",
      a.opsSummary
    ] }) })
  ] });
}
function S_() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M22 2L11 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M22 2L15 22L11 13L2 9L22 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function __() {
  return /* @__PURE__ */ v.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function uy() {
  return /* @__PURE__ */ v.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(
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
function E_({ kind: a }) {
  return a === "pdf" ? /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) : /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M14 2v6h6M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function A_() {
  return /* @__PURE__ */ v.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }) });
}
function x_() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ v.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function N_() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ v.jsx("path", { d: "M12 7.5v5.5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "16.5", r: "1.2", fill: "currentColor" })
  ] });
}
const j_ = [
  "Build a small CNN image classifier",
  "Explain what my current graph does",
  "Improve my current graph"
];
function w_({
  api: a,
  settings: r,
  codexLoggedIn: l,
  conversation: s,
  onConversationChange: u,
  onOpenSettings: d,
  onOpenHistory: f
}) {
  const [y, m] = P.useState(""), [h, b] = P.useState(!1), [g, _] = P.useState(""), [N, z] = P.useState([]), [A, H] = P.useState(0), [T, R] = P.useState(null), [I, ae] = P.useState(""), [Q, ne] = P.useState([]), [V, se] = P.useState([]), [ue, Y] = P.useState(!1), [X, oe] = P.useState(null), ye = P.useRef(null), re = P.useRef(!0), be = P.useRef(null), D = P.useRef(null), k = P.useRef(null), $ = P.useRef(null), te = P.useRef(0), Z = l0(r, l), E = V.some((K) => K.status === "loading"), L = V.filter((K) => K.status === "ready" && K.att).map((K) => K.att), W = Z && !h && !E && (y.trim().length > 0 || L.length > 0);
  P.useEffect(() => () => {
    var K, Ae;
    (K = $.current) == null || K.call($, !1), $.current = null, (Ae = k.current) == null || Ae.abort();
  }, []), P.useEffect(() => {
    if (!h) {
      H(0);
      return;
    }
    const K = Date.now(), Ae = window.setInterval(() => {
      H(Math.floor((Date.now() - K) / 1e3));
    }, 1e3);
    return () => window.clearInterval(Ae);
  }, [h]);
  const ee = P.useCallback(() => {
    const K = ye.current;
    K && (re.current = K.scrollHeight - K.scrollTop - K.clientHeight < 80);
  }, []);
  P.useEffect(() => {
    const K = ye.current;
    K && re.current && (K.scrollTop = K.scrollHeight);
  }, [s.messages, N, g, V.length, h]);
  const me = P.useCallback(() => {
    const K = be.current;
    K && (K.style.height = "auto", K.style.height = Math.min(K.scrollHeight, 110) + "px");
  }, []);
  P.useEffect(() => {
    me();
  }, [y, me]);
  const Se = P.useCallback(
    (K) => {
      if (!(!Z || h))
        for (const Ae of Array.from(K)) {
          const Et = crypto.randomUUID(), ja = wy(Ae);
          se((Be) => [
            ...Be,
            { id: Et, name: Ae.name, kind: ja, size: Ae.size, status: "loading" }
          ]), v0(Ae).then((Be) => {
            se(
              (kn) => kn.map((Nt) => Nt.id === Et ? { ...Nt, status: "ready", att: Be } : Nt)
            );
          }).catch((Be) => {
            const kn = (Be == null ? void 0 : Be.message) ?? String(Be);
            se(
              (Nt) => Nt.map((Pe) => Pe.id === Et ? { ...Pe, status: "error", error: kn } : Pe)
            );
          });
        }
    },
    [Z, h]
  ), Te = (K) => {
    se((Ae) => Ae.filter((Et) => Et.id !== K));
  }, dt = (K) => {
    K.target.files && K.target.files.length > 0 && Se(K.target.files), K.target.value = "";
  }, Xe = (K) => {
    var Et;
    const Ae = (Et = K.clipboardData) == null ? void 0 : Et.files;
    Ae && Ae.length > 0 && (Se(Ae), K.preventDefault());
  }, dn = (K) => {
    !Z || h || Array.from(K.dataTransfer.types).includes("Files") && (K.preventDefault(), te.current += 1, Y(!0));
  }, bn = (K) => {
    !Z || h || Array.from(K.dataTransfer.types).includes("Files") && K.preventDefault();
  }, Xn = () => {
    te.current -= 1, te.current <= 0 && (te.current = 0, Y(!1));
  }, J = (K) => {
    te.current = 0, Y(!1), !(!Z || h) && K.dataTransfer.files && K.dataTransfer.files.length > 0 && (K.preventDefault(), Se(K.dataTransfer.files));
  }, de = P.useCallback(
    async (K, Ae) => {
      var an;
      const Et = K.trim();
      if (!Et && Ae.length === 0 || h || !Z) return;
      R(null), ae(Et), ne(Ae), m(""), se([]), b(!0), _(""), z([]), re.current = !0;
      const ja = { role: "user", content: Et };
      Ae.length > 0 && (ja.attachments = Ae);
      let Be = { ...s };
      Be.title || (Be.title = o0(Et || ((an = Ae[0]) == null ? void 0 : an.name) || "Attachment")), Be.provider = r.provider, Be.model = r.models[r.provider] ?? "";
      const kn = Ls(r);
      kn ? Be.reasoningEffort = kn : delete Be.reasoningEffort, Be.messages = [...Be.messages, ja], Be.updatedAt = Date.now(), u(Be), xh(a, Be);
      const Nt = new AbortController();
      k.current = Nt;
      let Pe = "";
      await XS({
        api: a,
        settings: r,
        history: Be.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: Et,
        attachments: Ae.length > 0 ? Ae : void 0,
        callbacks: {
          onTextDelta(Ke) {
            Pe += Ke, _(Pe);
          },
          onTurnAppended(Ke) {
            Ke.role !== "tool" && (Pe = "", _("")), z((Ja) => [...Ja, Ke]);
          },
          onOpsApplied() {
          },
          onExperimentApproval(Ke) {
            var Ja;
            return Nt.signal.aborted ? Promise.resolve(!1) : ((Ja = $.current) == null || Ja.call($, !1), new Promise((no) => {
              $.current = no, oe(Ke);
            }));
          },
          onTurnsCommitted(Ke) {
            _(""), Pe = "", z([]), Be = { ...Be, messages: [...Be.messages, ...Ke], updatedAt: Date.now() }, u(Be), xh(a, Be);
          },
          onError(Ke) {
            R(Ke), _(""), Pe = "";
          },
          onFinished() {
            var Ke;
            (Ke = $.current) == null || Ke.call($, !1), $.current = null, oe(null), b(!1), k.current = null;
          }
        },
        signal: Nt.signal
      });
    },
    [a, h, s, u, Z, r]
  ), Re = () => de(y, L), Fe = (K) => {
    K.key === "Enter" && !K.shiftKey && (K.preventDefault(), de(y, L));
  }, pt = () => {
    var K, Ae;
    (K = $.current) == null || K.call($, !1), $.current = null, oe(null), (Ae = k.current) == null || Ae.abort();
  }, rt = (K) => {
    const Ae = $.current;
    $.current = null, oe(null), Ae == null || Ae(K);
  }, $t = () => de(I, Q), nn = N.length > 0 ? [...s.messages, ...N] : s.messages, ke = kS(nn), Na = ke.length === 0 && !h, Za = ke[ke.length - 1], xt = !!Za && Za.stages.some((K) => !K.result), to = h && g === "" && !xt && !X, Yi = Na ? Cu(a).filter((K) => K.id !== s.id).length : 0;
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: `gcp-chat${ue ? " gcp-dragging" : ""}`,
      onDragEnter: dn,
      onDragOver: bn,
      onDragLeave: Xn,
      onDrop: J,
      children: [
        /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: "gcp-messages",
            role: "log",
            "aria-live": "polite",
            "aria-label": "Conversation",
            ref: ye,
            onScroll: ee,
            children: [
              Na && /* @__PURE__ */ v.jsxs("div", { className: "gcp-welcome", children: [
                /* @__PURE__ */ v.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ v.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
                /* @__PURE__ */ v.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." }),
                Z && /* @__PURE__ */ v.jsx("div", { className: "gcp-welcome-suggestions", "aria-label": "Suggested prompts", children: j_.map((K) => /* @__PURE__ */ v.jsx("button", { className: "gcp-suggestion", onClick: () => de(K, []), children: K }, K)) }),
                Yi > 0 && /* @__PURE__ */ v.jsxs(
                  "button",
                  {
                    className: "gcp-welcome-history",
                    onClick: f,
                    "aria-label": "View previous conversations",
                    children: [
                      /* @__PURE__ */ v.jsx(x_, {}),
                      "Previous conversations (",
                      Yi,
                      ")"
                    ]
                  }
                )
              ] }),
              ke.map((K) => /* @__PURE__ */ v.jsx(cy, { turn: K.turn, stages: K.stages }, K.key)),
              h && g !== "" && /* @__PURE__ */ v.jsx(
                cy,
                {
                  turn: { role: "assistant", content: "" },
                  streaming: !0,
                  streamingText: g
                }
              ),
              to && /* @__PURE__ */ v.jsxs("div", { className: "gcp-thinking", role: "status", "aria-label": "Waiting for the assistant", children: [
                /* @__PURE__ */ v.jsx("span", { className: "gcp-thinking-orb", "aria-hidden": "true", children: "✦" }),
                /* @__PURE__ */ v.jsx("span", { className: "gcp-thinking-text", children: "Thinking" }),
                A >= 3 && /* @__PURE__ */ v.jsxs("span", { className: "gcp-thinking-time", children: [
                  A,
                  "s"
                ] })
              ] }),
              T && !h && /* @__PURE__ */ v.jsxs("div", { className: "gcp-error-row", role: "alert", children: [
                /* @__PURE__ */ v.jsx("span", { className: "gcp-error-icon", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(N_, {}) }),
                /* @__PURE__ */ v.jsxs("div", { className: "gcp-error-body", children: [
                  /* @__PURE__ */ v.jsx("div", { className: "gcp-error-title", children: "Request failed" }),
                  /* @__PURE__ */ v.jsx("div", { className: "gcp-error-text", children: T })
                ] }),
                /* @__PURE__ */ v.jsx("button", { className: "gcp-retry-btn", onClick: $t, "aria-label": "Retry", children: "Retry" })
              ] })
            ]
          }
        ),
        ue && /* @__PURE__ */ v.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ v.jsx(uy, {}),
          /* @__PURE__ */ v.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        X && /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-backdrop", children: /* @__PURE__ */ v.jsxs(
          "div",
          {
            className: "gcp-experiment-approval",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "gcp-experiment-approval-title",
            children: [
              /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-kicker", children: "Execution approval" }),
              /* @__PURE__ */ v.jsxs("div", { id: "gcp-experiment-approval-title", className: "gcp-experiment-approval-title", children: [
                "Run ",
                X.executionCount,
                " graph execution",
                X.executionCount === 1 ? "" : "s",
                "?"
              ] }),
              /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-hypothesis", children: X.hypothesis }),
              /* @__PURE__ */ v.jsxs("div", { className: "gcp-experiment-approval-facts", children: [
                /* @__PURE__ */ v.jsxs("span", { children: [
                  X.variantCount,
                  " variants"
                ] }),
                /* @__PURE__ */ v.jsxs("span", { children: [
                  X.repetitions,
                  " repetitions"
                ] }),
                /* @__PURE__ */ v.jsxs("span", { children: [
                  "concurrency ",
                  X.concurrency
                ] }),
                X.applyBest && /* @__PURE__ */ v.jsx("span", { children: "parameter winner may be applied" })
              ] }),
              /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-warning", children: "Review the candidate settings below. Credential values are schema-redacted." }),
              /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-candidates", "aria-label": "Candidate changes", children: X.variants.map((K, Ae) => /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("strong", { children: K.label }),
                /* @__PURE__ */ v.jsx("span", { children: K.operations.length > 0 ? K.operations.join(" · ") : "baseline — no changes" })
              ] }, `${Ae}-${K.label}`)) }),
              /* @__PURE__ */ v.jsxs("div", { className: "gcp-experiment-approval-nodes", children: [
                /* @__PURE__ */ v.jsx("strong", { children: "Nodes that may execute" }),
                /* @__PURE__ */ v.jsx("span", { children: X.nodeTypes.length > 0 ? X.nodeTypes.join(", ") : "No typed nodes detected" })
              ] }),
              /* @__PURE__ */ v.jsx("div", { className: "gcp-experiment-approval-warning", children: "Candidate edits stay off-canvas, but nodes may write files, call networks, use GPU time, or incur API costs." }),
              /* @__PURE__ */ v.jsxs("div", { className: "gcp-experiment-approval-actions", children: [
                /* @__PURE__ */ v.jsx("button", { className: "gcp-approval-secondary", onClick: () => rt(!1), autoFocus: !0, children: "Cancel" }),
                /* @__PURE__ */ v.jsx("button", { className: "gcp-approval-primary", onClick: () => rt(!0), children: "Approve and run" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ v.jsxs("div", { className: "gcp-input-area", children: [
          V.length > 0 && /* @__PURE__ */ v.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: V.map((K) => {
            var Ae;
            return /* @__PURE__ */ v.jsxs(
              "div",
              {
                className: `gcp-chip ${K.kind === "image" ? "image" : "file"} ${K.status}`,
                title: K.status === "error" ? K.error : `${K.name} · ${Yr(K.size)}`,
                children: [
                  K.kind === "image" && ((Ae = K.att) != null && Ae.dataUrl) ? /* @__PURE__ */ v.jsx("img", { className: "gcp-chip-thumb", src: K.att.dataUrl, alt: K.name }) : /* @__PURE__ */ v.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ v.jsx(E_, { kind: K.kind }) }),
                  /* @__PURE__ */ v.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ v.jsx("span", { className: "gcp-chip-name", children: K.name }),
                    /* @__PURE__ */ v.jsx("span", { className: "gcp-chip-size", children: K.status === "loading" ? "reading…" : K.status === "error" ? "failed" : Yr(K.size) })
                  ] }),
                  K.status === "loading" && /* @__PURE__ */ v.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ v.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => Te(K.id),
                      "aria-label": `Remove ${K.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ v.jsx(A_, {})
                    }
                  )
                ]
              },
              K.id
            );
          }) }),
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ v.jsx(
              "input",
              {
                ref: D,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: dt,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ v.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var K;
                  return (K = D.current) == null ? void 0 : K.click();
                },
                disabled: !Z || h,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ v.jsx(uy, {})
              }
            ),
            /* @__PURE__ */ v.jsx(
              "textarea",
              {
                ref: be,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: y,
                onChange: (K) => m(K.target.value),
                onKeyDown: Fe,
                onPaste: Xe,
                disabled: h || !Z,
                "aria-label": "Message input",
                "aria-disabled": Z ? void 0 : "true"
              }
            ),
            h ? /* @__PURE__ */ v.jsx("button", { className: "gcp-stop-btn", onClick: pt, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ v.jsx(__, {}) }) : /* @__PURE__ */ v.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: Re,
                disabled: !W,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ v.jsx(S_, {})
              }
            )
          ] }),
          /* @__PURE__ */ v.jsx("div", { className: "gcp-input-hint", "aria-hidden": "true", children: h ? "Generating — use the stop button to interrupt" : "Enter to send · Shift+Enter for a new line" }),
          !Z && !h && /* @__PURE__ */ v.jsxs("div", { className: "gcp-not-ready-overlay", children: [
            /* @__PURE__ */ v.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
            /* @__PURE__ */ v.jsx(
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
const $_ = "Imported portable-study content passed SHA-256 integrity checking, which detects content changes but does not authenticate its author or evidence source. It is read-only and was not executed in this browser session.";
function rl(a, r) {
  return a < r ? -1 : a > r ? 1 : 0;
}
function T_(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.value]).sort(([r], [l]) => rl(r, l))
  );
}
function M_(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.canonicalKey]).sort(([r], [l]) => rl(r, l))
  );
}
function D_(a) {
  return Object.fromEntries(
    a.map((r) => [r.observedKey, r.source]).sort(([r], [l]) => rl(r, l))
  );
}
function O_(a, r) {
  if (r.metricKey !== void 0)
    return a.metrics.find((l) => l.canonicalKey === r.metricKey);
}
function C_(a, r) {
  const l = O_(a, r), s = a.status === "completed" ? void 0 : a.status === "cancelled" ? `Imported run was cancelled [${a.error.phase}/${a.error.code}]: ${a.error.message}` : `Imported run failed [${a.error.phase}/${a.error.code}]: ${a.error.message}`;
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
    observedMetrics: T_(a.metrics),
    ...a.metrics.length === 0 ? {} : {
      observedMetricIdentities: M_(a.metrics),
      observedMetricSources: D_(a.metrics)
    },
    ...s === void 0 ? {} : { error: s }
  };
}
function z_(a, r) {
  const l = r.filter((s) => s.variantId === a.id).sort((s, u) => s.repetition - u.repetition || rl(s.runKey, u.runKey)).map((s) => C_(s, a));
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
      a.observedMetrics.map(({ key: s, value: u }) => [s, u]).sort(([s], [u]) => rl(s, u))
    ),
    // Always supply an array, including an empty one. Omitting it would make
    // legacy export code synthesize attempts from aggregate metricValues.
    runs: l,
    ...a.operationSummary === void 0 ? {} : { operationSummary: [...a.operationSummary] },
    errors: [...a.errors]
  };
}
function R_(a) {
  return {
    title: a.title,
    evidence: a.evidence,
    nextStep: a.nextStep
  };
}
function U_(a) {
  const r = a.payload.provenance.facts.find((l) => l.key === "optimizer.plan" && l.status === "observed");
  if (!(!r || !pd(r.value)))
    return JSON.parse(JSON.stringify(r.value));
}
function L_(a) {
  const { payload: r } = a, { derived: l, spec: s } = r, u = U_(a);
  return {
    id: r.id,
    createdAt: r.createdAt,
    hypothesis: s.hypothesis,
    objective: { ...s.objective },
    repetitions: s.repetitions,
    status: l.status,
    variants: l.variants.map((d) => z_(d, r.runs)),
    ...u === void 0 ? {} : { search: u },
    ...l.baselineVariantId === void 0 ? {} : { baselineVariantId: l.baselineVariantId },
    ...l.winnerId === void 0 ? {} : { winnerId: l.winnerId },
    ...l.winnerLabel === void 0 ? {} : { winnerLabel: l.winnerLabel },
    ...l.appliedVariantId === void 0 ? {} : { appliedVariantId: l.appliedVariantId },
    ...l.applyConflict === void 0 ? {} : { applyConflict: l.applyConflict },
    insights: {
      summary: [...l.insights.summary],
      warnings: [...l.insights.warnings, $_],
      paperIdeas: l.insights.paperIdeas.map(R_)
    }
  };
}
function ba(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function V_(a, r) {
  return Object.prototype.hasOwnProperty.call(a, r);
}
function mg(a) {
  return ba(a) && typeof a.$gcpSecretRef == "string";
}
function ll(a, r) {
  if (mg(a)) {
    const l = a.$gcpSecretRef;
    return V_(r.bindings, l) && typeof r.bindings[l] == "string" ? (r.resolved.add(l), r.bindings[l]) : (r.missing.add(l), "");
  }
  if (Array.isArray(a))
    return a.map((l) => ll(l, r));
  if (ba(a)) {
    const l = /* @__PURE__ */ Object.create(null);
    for (const [s, u] of Object.entries(a))
      l[s] = ll(u, r);
    return l;
  }
  return a;
}
function ku(a, r) {
  return ll(a, r);
}
function B_(a, r) {
  return {
    name: a.name ?? "",
    description: a.description ?? "",
    nodes: a.nodes.map((l) => ({
      id: l.id,
      type: l.type,
      position: { x: l.position.x, y: l.position.y },
      data: ku(l.data, r)
    })),
    edges: a.edges.map((l) => ({
      id: l.id,
      source: l.source,
      target: l.target,
      sourceHandle: l.sourceHandle,
      targetHandle: l.targetHandle,
      ...l.type === void 0 ? {} : { type: l.type }
    })),
    presets: a.presets === void 0 ? [] : ll(a.presets, r),
    segmentGroups: a.segmentGroups === void 0 ? [] : ll(a.segmentGroups, r)
  };
}
function dy(a, r) {
  return a.nodes.some((l) => l.id === r);
}
function Ri(a, r, l) {
  const s = r[l];
  return s !== void 0 && dy(a, s) ? s : dy(a, l) ? l : null;
}
function H_(a) {
  return encodeURIComponent(a);
}
function G_(a, r) {
  let l = a, s = 1;
  for (; r.has(l); )
    l = `${a}~${s}`, s += 1;
  return r.add(l), l;
}
function fy(a, r, l, s) {
  return G_(
    `graph-copilot:${H_(a)}:${r}:${l}`,
    s
  );
}
function Gn(a, r) {
  return { code: "INVALID_OPERATION", operationIndex: a, message: r };
}
function Bn(a, r, l) {
  const s = a[r];
  return typeof s == "string" ? s : Gn(l, `${r} must be a string`);
}
function Hn(a) {
  return typeof a != "string";
}
function q_(a, r, l, s, u, d, f) {
  if (!ba(r) || typeof r.op != "string")
    return Gn(l, "operation must be an object with an op string");
  switch (r.op) {
    case "add_node": {
      const y = Bn(r, "node_type", l);
      if (Hn(y)) return y;
      if (r.ref !== void 0 && typeof r.ref != "string")
        return Gn(l, "ref must be a string when provided");
      if (r.params !== void 0 && !ba(r.params))
        return Gn(l, "params must be an object when provided");
      if (r.position !== void 0 && (!ba(r.position) || typeof r.position.x != "number" || !Number.isFinite(r.position.x) || typeof r.position.y != "number" || !Number.isFinite(r.position.y)))
        return Gn(l, "position must contain finite x and y numbers");
      const m = fy(s, "node", l, d), h = a.nodes.length, b = {
        x: 160 + h % 4 * 240,
        y: 120 + Math.floor(h / 4) * 160
      }, g = r.position;
      return a.nodes.push({
        id: m,
        type: y,
        position: g === void 0 ? b : { x: g.x, y: g.y },
        data: {
          params: r.params === void 0 ? {} : ku(r.params, f)
        }
      }), typeof r.ref == "string" && (u[r.ref] = m), null;
    }
    case "connect": {
      const y = Bn(r, "source", l), m = Bn(r, "target", l), h = Bn(r, "source_handle", l), b = Bn(r, "target_handle", l);
      if (Hn(y)) return y;
      if (Hn(m)) return m;
      if (Hn(h)) return h;
      if (Hn(b)) return b;
      const g = Ri(a, u, y), _ = Ri(a, u, m);
      if (g === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `connect: unknown source node '${y}'`
        };
      if (_ === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `connect: unknown target node '${m}'`
        };
      const N = h === "trigger", z = N ? "__trigger" : b;
      return a.edges.some((A) => A.source === g && A.target === _ && A.sourceHandle === h && A.targetHandle === z) ? {
        code: "DUPLICATE_EDGE",
        operationIndex: l,
        message: "connect: edge already exists"
      } : (a.edges.push({
        id: fy(s, "edge", l, d),
        source: g,
        target: _,
        sourceHandle: h,
        targetHandle: z,
        type: N ? "trigger" : "data"
      }), null);
    }
    case "set_params": {
      const y = Bn(r, "node_id", l);
      if (Hn(y)) return y;
      if (!ba(r.params))
        return Gn(l, "params must be an object");
      const m = Ri(a, u, y);
      if (m === null)
        return {
          code: "UNKNOWN_NODE",
          operationIndex: l,
          message: `set_params: unknown node '${y}'`
        };
      const h = a.nodes.find((g) => g.id === m), b = ba(h.data.params) ? h.data.params : {};
      return h.data = {
        ...h.data,
        params: {
          ...b,
          ...ku(r.params, f)
        }
      }, null;
    }
    case "remove_node": {
      const y = Bn(r, "node_id", l);
      if (Hn(y)) return y;
      const m = Ri(a, u, y);
      return m === null ? {
        code: "UNKNOWN_NODE",
        operationIndex: l,
        message: `remove_node: unknown node '${y}'`
      } : (a.nodes = a.nodes.filter((h) => h.id !== m), a.edges = a.edges.filter((h) => h.source !== m && h.target !== m), null);
    }
    case "remove_edge": {
      const y = Bn(r, "source", l), m = Bn(r, "target", l);
      if (Hn(y)) return y;
      if (Hn(m)) return m;
      if (r.source_handle !== void 0 && typeof r.source_handle != "string")
        return Gn(l, "source_handle must be a string when provided");
      if (r.target_handle !== void 0 && typeof r.target_handle != "string")
        return Gn(l, "target_handle must be a string when provided");
      const h = Ri(a, u, y), b = Ri(a, u, m);
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
      for (const y of Object.keys(u)) delete u[y];
      return null;
    case "auto_layout":
      return a.nodes.forEach((y, m) => {
        y.position = {
          x: 120 + m % 4 * 260,
          y: 100 + Math.floor(m / 4) * 180
        };
      }), null;
    default:
      return Gn(l, `unknown operation '${r.op}'`);
  }
}
function py(a, r, l) {
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
function I_(a, r, l = {}) {
  const s = a.payload.spec.variants.find((g) => g.id === r);
  if (s === void 0)
    return py(r, {
      code: "VARIANT_NOT_FOUND",
      message: `Unknown study variant '${r}'`
    });
  const u = {
    bindings: l,
    missing: /* @__PURE__ */ new Set(),
    resolved: /* @__PURE__ */ new Set()
  }, d = B_(a.payload.spec.baseline, u), f = {}, y = /* @__PURE__ */ new Set([
    ...d.nodes.map((g) => g.id),
    ...d.edges.map((g) => g.id)
  ]);
  for (let g = 0; g < s.operations.length; g += 1) {
    const _ = q_(
      d,
      s.operations[g],
      g,
      s.id,
      f,
      y,
      u
    );
    if (_ !== null) return py(r, _, s.label);
  }
  const m = [...u.missing].sort(), h = s.operations.some((g) => g.op === "add_node"), b = h ? [
    "Portable study v1 does not include node-definition defaults. Added nodes contain only parameters recorded in the operation, so defaults used by the original runtime may be missing.",
    "Generated node and edge ids are deterministic portable ids and may differ from ids used by the original experiment execution."
  ] : [];
  return {
    status: m.length === 0 ? "ready" : "blocked",
    variantId: r,
    variantLabel: s.label,
    graph: d,
    refs: { ...f },
    missingSecretRefs: m,
    errors: [],
    fidelity: h ? "approximate-node-defaults" : "portable-operation-replay",
    fidelityWarnings: b,
    sensitive: u.resolved.size > 0
  };
}
function Qu(a) {
  return mg(a) ? !0 : Array.isArray(a) ? a.some(Qu) : ba(a) && Object.values(a).some(Qu);
}
function K_(a) {
  const r = {
    name: a.name,
    description: a.description,
    nodes: a.nodes,
    edges: a.edges,
    presets: a.presets,
    segmentGroups: a.segmentGroups
  };
  if (Qu(r))
    throw new Error("Candidate graph still contains an unresolved SecretRef");
  return JSON.stringify(r, null, 2);
}
function $u(a) {
  try {
    return og(a);
  } catch {
    return [];
  }
}
function Y_(a) {
  const r = new Date(a);
  return Number.isNaN(r.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat(void 0, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(r);
}
function Ui(a) {
  if (a === void 0 || !Number.isFinite(a)) return "—";
  const r = Math.abs(a);
  return r !== 0 && (r >= 1e5 || r < 1e-4) ? a.toExponential(3) : new Intl.NumberFormat(void 0, { maximumSignificantDigits: 6 }).format(a);
}
function my(a) {
  return a === void 0 || !Number.isFinite(a) ? "—" : `${a > 0 ? "+" : ""}${Ui(a)}`;
}
function X_(a) {
  return !Number.isFinite(a) || a < 0 ? "—" : a < 1e3 ? `${Math.round(a)} ms` : `${(a / 1e3).toFixed(a < 1e4 ? 1 : 0)} s`;
}
function k_(a) {
  return [...a.variants ?? []].sort((r, l) => r.mean === void 0 ? l.mean === void 0 ? 0 : 1 : l.mean === void 0 ? -1 : a.objective.direction === "maximize" ? l.mean - r.mean : r.mean - l.mean);
}
function hy(a) {
  var l, s;
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
    paperLeads: ((s = a.insights) == null ? void 0 : s.paperIdeas) ?? [],
    runs: r
  };
}
function Ds(a, r, l) {
  const s = URL.createObjectURL(new Blob([l], { type: `${r};charset=utf-8` })), u = document.createElement("a");
  u.href = s, u.download = a, u.style.display = "none", document.body.appendChild(u), u.click(), u.remove(), URL.revokeObjectURL(s);
}
function Br(a) {
  return a.replace(/[^a-z0-9._-]+/gi, "-").replace(/^-+|-+$/g, "") || "graph-copilot-study";
}
function Tu({ status: a }) {
  return /* @__PURE__ */ v.jsx("span", { className: `gcp-lab-badge ${a}`, children: a });
}
function Q_() {
  return /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-empty", children: [
    /* @__PURE__ */ v.jsx("div", { className: "gcp-lab-empty-mark", "aria-hidden": "true", children: /* @__PURE__ */ v.jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", children: [
      /* @__PURE__ */ v.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }),
      /* @__PURE__ */ v.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round" })
    ] }) }),
    /* @__PURE__ */ v.jsx("h2", { children: "No experiment studies yet" }),
    /* @__PURE__ */ v.jsx("p", { children: "Ask the agent to compare graph variants against a numeric objective. Completed studies, ranked candidates, and research leads will appear here." }),
    /* @__PURE__ */ v.jsx("div", { className: "gcp-lab-example", children: "“Compare three learning-rate variants, maximize validation accuracy, and run each three times.”" })
  ] });
}
function Z_({ api: a }) {
  var ue, Y, X, oe, ye, re, be, D, k;
  const [r, l] = P.useState(() => $u(a)), [s, u] = P.useState(() => {
    var $;
    return (($ = $u(a)[0]) == null ? void 0 : $.id) ?? null;
  }), [d, f] = P.useState(null), [y, m] = P.useState(!1), [h, b] = P.useState(null), [g, _] = P.useState(null), [N, z] = P.useState(null), [A, H] = P.useState(!1), T = P.useRef(null);
  P.useEffect(() => {
    const $ = () => {
      const te = $u(a);
      l(te), u((Z) => {
        var E;
        return Z && te.some((L) => L.id === Z) ? Z : ((E = te[0]) == null ? void 0 : E.id) ?? null;
      });
    };
    return window.addEventListener(Gu, $), () => window.removeEventListener(Gu, $);
  }, [a]);
  const R = r.find(($) => $.id === s) ?? r[0], I = R && (d == null ? void 0 : d.payload.id) === R.id ? d : null, ae = P.useMemo(() => R ? k_(R) : [], [R]);
  P.useEffect(() => {
    let $ = !0;
    return f(null), m(!1), R ? P1(a).entries.some((Z) => Z.id === R.id) ? (m(!0), Kh(a, R.id).then((Z) => {
      $ && f(Z);
    }).catch((Z) => {
      $ && b(`Portable study could not be verified: ${String(Z)}`);
    }).finally(() => {
      $ && m(!1);
    }), () => {
      $ = !1;
    }) : () => {
      $ = !1;
    } : () => {
      $ = !1;
    };
  }, [a, R == null ? void 0 : R.id]);
  const Q = async ($) => {
    var Z;
    const te = (Z = $.currentTarget.files) == null ? void 0 : Z[0];
    if ($.currentTarget.value = "", !!te) {
      z(null), b(null);
      try {
        if (typeof te.size == "number" && te.size > qs)
          throw new Error(`Portable study exceeds the ${qs} byte import limit`);
        const E = await W1(await te.text());
        _(E);
      } catch (E) {
        _(null), z(`Import rejected before storage: ${String(E)}`);
      }
    }
  }, ne = async () => {
    if (!g) return;
    H(!0), z(null);
    let $ = !1;
    try {
      if (og(a).some((E) => E.id === g.payload.id))
        throw new Error(
          `A local Experiment Lab report already uses study id '${g.payload.id}'; import was refused to avoid overwriting local evidence.`
        );
      const te = L_(g), Z = await ig(a, g);
      $ = !0, await cg(a, te, { rejectIfExists: !0 }), u(te.id), f(g), _(null), b(Z.status === "unchanged" ? "This content-integrity-checked portable study was already stored; its read-only report was added." : "Portable study imported for read-only review. SHA-256 checks content changes only; it does not authenticate authorship. No graph was executed or applied.");
    } catch (te) {
      z($ ? `The content-integrity-checked bundle was stored, but its read-only Lab report could not be saved. Retry the import: ${String(te)}` : `Portable study was not imported: ${String(te)}`);
    } finally {
      H(!1);
    }
  }, V = async () => {
    if (R)
      try {
        const $ = I ?? await Kh(a, R.id);
        f($), Ds(
          `${Br(R.id)}-portable-study.json`,
          "application/json",
          await ld($)
        ), b("Portable study content integrity checked before export; SHA-256 does not authenticate authorship.");
      } catch ($) {
        b(`Portable study export failed: ${String($)}`);
      }
  }, se = ($, te) => {
    var Z;
    if (I)
      try {
        const E = I_(I, $);
        if (E.status === "error" || !E.graph)
          throw new Error(((Z = E.errors[0]) == null ? void 0 : Z.message) ?? "Candidate could not be reconstructed");
        Ds(
          `${Br(I.payload.id)}-${Br(te)}-graph.json`,
          "application/json",
          K_(E.graph)
        );
        const L = E.status === "blocked" ? `Candidate graph downloaded with ${E.missingSecretRefs.length} unresolved secret value(s) left blank.` : "Candidate graph materialized from the content-integrity-checked portable operation record and downloaded.";
        b(E.fidelityWarnings.length === 0 ? L : `${L} Fidelity warning: ${E.fidelityWarnings.join(" ")}`);
      } catch (E) {
        b(`Candidate graph export failed: ${String(E)}`);
      }
  };
  return /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab", "aria-labelledby": "gcp-lab-title", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-heading", children: [
      /* @__PURE__ */ v.jsxs("div", { children: [
        /* @__PURE__ */ v.jsx("span", { className: "gcp-eyebrow", children: "Autonomous evaluation" }),
        /* @__PURE__ */ v.jsx("h1", { id: "gcp-lab-title", children: "Experiment Lab" }),
        /* @__PURE__ */ v.jsx("p", { children: "Compare isolated graph candidates and turn results into defensible research directions." })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-heading-actions", children: [
        /* @__PURE__ */ v.jsxs("span", { className: "gcp-lab-count", "aria-label": `${r.length} experiment studies`, children: [
          r.length,
          " ",
          r.length === 1 ? "study" : "studies"
        ] }),
        /* @__PURE__ */ v.jsx("button", { type: "button", onClick: () => {
          var $;
          return ($ = T.current) == null ? void 0 : $.click();
        }, children: "Import portable study" }),
        /* @__PURE__ */ v.jsx(
          "input",
          {
            ref: T,
            type: "file",
            accept: "application/json,.json",
            "aria-label": "Choose portable study file",
            hidden: !0,
            onChange: ($) => {
              Q($);
            }
          }
        )
      ] })
    ] }),
    N && !g && /* @__PURE__ */ v.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: N }),
    h && /* @__PURE__ */ v.jsx("p", { className: "gcp-lab-portable-message", role: "status", children: h }),
    r.length === 0 || !R ? /* @__PURE__ */ v.jsx(Q_, {}) : /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-layout", children: [
      /* @__PURE__ */ v.jsx("aside", { className: "gcp-lab-studies", "aria-label": "Experiment studies", children: r.map(($) => {
        var te, Z, E;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            className: `gcp-study-card${$.id === R.id ? " active" : ""}`,
            onClick: () => {
              b(null), u($.id);
            },
            "aria-pressed": $.id === R.id,
            children: [
              /* @__PURE__ */ v.jsxs("span", { className: "gcp-study-card-top", children: [
                /* @__PURE__ */ v.jsx(Tu, { status: $.status }),
                /* @__PURE__ */ v.jsx("time", { dateTime: $.createdAt, children: Y_($.createdAt) })
              ] }),
              /* @__PURE__ */ v.jsx("strong", { children: $.hypothesis || "Untitled study" }),
              /* @__PURE__ */ v.jsxs("span", { className: "gcp-study-card-meta", children: [
                ((te = $.objective) == null ? void 0 : te.direction) === "minimize" ? "↓" : "↑",
                " ",
                ((Z = $.objective) == null ? void 0 : Z.metric) || "metric",
                /* @__PURE__ */ v.jsx("span", { "aria-hidden": "true", children: " · " }),
                ((E = $.variants) == null ? void 0 : E.length) ?? 0,
                " candidates"
              ] })
            ]
          },
          $.id
        );
      }) }),
      /* @__PURE__ */ v.jsxs("article", { className: "gcp-lab-report", "aria-label": `Experiment report: ${R.hypothesis}`, children: [
        /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-report-head", children: [
          /* @__PURE__ */ v.jsxs("div", { children: [
            /* @__PURE__ */ v.jsx("span", { className: "gcp-eyebrow", children: "Study hypothesis" }),
            /* @__PURE__ */ v.jsx("h2", { children: R.hypothesis })
          ] }),
          /* @__PURE__ */ v.jsx(Tu, { status: R.status })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-export-actions", "aria-label": "Export study evidence", children: [
          /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              onClick: () => Ds(
                `${Br(R.id)}-runs.csv`,
                "text/csv",
                L0(hy(R))
              ),
              children: "Export runs CSV"
            }
          ),
          /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              onClick: () => Ds(
                `${Br(R.id)}-research.md`,
                "text/markdown",
                B0(hy(R))
              ),
              children: "Export research brief"
            }
          ),
          /* @__PURE__ */ v.jsx(
            "button",
            {
              type: "button",
              disabled: !I || y,
              title: I ? "Export the SHA-256 content-integrity-checked baseline, variants, provenance, and run records" : "No portable bundle is available for this legacy summary",
              onClick: () => {
                V();
              },
              children: y ? "Verifying portable study…" : "Export portable study"
            }
          )
        ] }),
        I && /* @__PURE__ */ v.jsxs("p", { className: "gcp-lab-integrity", children: [
          "Content integrity checked · SHA-256 ",
          I.integrity.contentSha256.slice(0, 12),
          "… · authorship unverified"
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-summary-grid", children: [
          /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-summary-card", "aria-labelledby": "gcp-study-objective", children: [
            /* @__PURE__ */ v.jsx("span", { className: "gcp-lab-card-icon objective", "aria-hidden": "true", children: "◎" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h3", { id: "gcp-study-objective", children: "Study objective" }),
              /* @__PURE__ */ v.jsxs("strong", { children: [
                R.objective.direction === "maximize" ? "Maximize" : "Minimize",
                " ",
                R.objective.metric
              ] }),
              /* @__PURE__ */ v.jsxs("span", { children: [
                R.repetitions,
                " ",
                R.repetitions === 1 ? "run" : "runs",
                " per candidate"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-summary-card winner", "aria-labelledby": "gcp-study-winner", children: [
            /* @__PURE__ */ v.jsx("span", { className: "gcp-lab-card-icon winner", "aria-hidden": "true", children: "★" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h3", { id: "gcp-study-winner", children: "Winning candidate" }),
              /* @__PURE__ */ v.jsx("strong", { children: R.winnerLabel ?? "No winner resolved" }),
              /* @__PURE__ */ v.jsx("span", { children: R.winnerId ? `${Ui((ue = R.variants.find(($) => $.id === R.winnerId)) == null ? void 0 : ue.mean)} mean score` : "Check warnings for missing evidence" })
            ] })
          ] })
        ] }),
        R.search && /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-search-plan", "aria-label": "Deterministic parameter search plan", children: [
          /* @__PURE__ */ v.jsx("span", { className: "gcp-eyebrow", children: "Reproducible planner" }),
          /* @__PURE__ */ v.jsx("strong", { children: R.search.strategy === "grid" ? "Complete grid" : "Seeded random" }),
          /* @__PURE__ */ v.jsxs("span", { children: [
            R.search.generatedCandidateCount,
            " generated candidates · ",
            " ",
            R.search.totalDomainAssignments,
            " domain assignments · ",
            " ",
            R.search.totalExecutionCount,
            " executions",
            R.search.plannerSeed === void 0 ? "" : ` · planner seed ${R.search.plannerSeed} (${R.search.prngVersion})`
          ] }),
          /* @__PURE__ */ v.jsx("small", { children: R.search.seedDescription })
        ] }),
        ((X = (Y = R.insights) == null ? void 0 : Y.summary) == null ? void 0 : X.length) > 0 && /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-findings", children: [
          /* @__PURE__ */ v.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ v.jsx("h3", { id: "gcp-study-findings", children: "Key findings" }) }),
          /* @__PURE__ */ v.jsx("ul", { className: "gcp-lab-findings", children: R.insights.summary.map(($, te) => /* @__PURE__ */ v.jsx("li", { children: $ }, `${te}-${$}`)) })
        ] }),
        /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-candidate-leaderboard", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ v.jsx("h3", { id: "gcp-candidate-leaderboard", children: "Candidate leaderboard" }),
            /* @__PURE__ */ v.jsx("span", { children: R.objective.direction === "maximize" ? "Higher is better" : "Lower is better" })
          ] }),
          /* @__PURE__ */ v.jsx("div", { className: "gcp-leaderboard-wrap", children: /* @__PURE__ */ v.jsxs("table", { className: "gcp-leaderboard", children: [
            /* @__PURE__ */ v.jsx("thead", { children: /* @__PURE__ */ v.jsxs("tr", { children: [
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Rank" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Candidate" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Mean" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Variation" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Runs" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Runtime" }),
              /* @__PURE__ */ v.jsx("th", { scope: "col", children: "Graph" })
            ] }) }),
            /* @__PURE__ */ v.jsx("tbody", { children: ae.map(($, te) => {
              var E, L;
              const Z = $.id === R.winnerId;
              return /* @__PURE__ */ v.jsxs("tr", { className: Z ? "winner" : void 0, children: [
                /* @__PURE__ */ v.jsx("td", { children: /* @__PURE__ */ v.jsx("span", { className: "gcp-rank", children: $.mean === void 0 ? "—" : te + 1 }) }),
                /* @__PURE__ */ v.jsxs("td", { children: [
                  /* @__PURE__ */ v.jsxs("span", { className: "gcp-candidate-name", children: [
                    /* @__PURE__ */ v.jsx("strong", { children: $.label }),
                    Z && /* @__PURE__ */ v.jsx("span", { className: "gcp-winner-tag", children: "Winner" }),
                    $.status !== "completed" && /* @__PURE__ */ v.jsx(Tu, { status: $.status })
                  ] }),
                  $.operationSummary && $.operationSummary.length > 0 && /* @__PURE__ */ v.jsx("span", { className: "gcp-candidate-operations", children: $.operationSummary.join(" · ") }),
                  ((E = $.errors) == null ? void 0 : E.length) > 0 && /* @__PURE__ */ v.jsx("span", { className: "gcp-candidate-error", children: $.errors[0] })
                ] }),
                /* @__PURE__ */ v.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ v.jsx("span", { children: Ui($.mean) }),
                  $.baselineComparison && /* @__PURE__ */ v.jsxs("small", { className: "gcp-metric-detail", children: [
                    "improvement ",
                    my($.baselineComparison.objectiveImprovement),
                    $.baselineComparison.hedgesG === void 0 ? "" : ` · g ${my($.baselineComparison.hedgesG)}`
                  ] })
                ] }),
                /* @__PURE__ */ v.jsxs("td", { className: "gcp-metric-value", children: [
                  /* @__PURE__ */ v.jsx("span", { children: $.stddev === void 0 ? "—" : `± ${Ui($.stddev)}` }),
                  $.confidenceInterval95 && /* @__PURE__ */ v.jsxs("small", { className: "gcp-metric-detail", children: [
                    "95% CI [",
                    Ui($.confidenceInterval95.lower),
                    ", ",
                    Ui($.confidenceInterval95.upper),
                    "]"
                  ] })
                ] }),
                /* @__PURE__ */ v.jsx("td", { children: ((L = $.metricValues) == null ? void 0 : L.length) ?? 0 }),
                /* @__PURE__ */ v.jsx("td", { children: X_($.runtimeMs) }),
                /* @__PURE__ */ v.jsx("td", { children: /* @__PURE__ */ v.jsx(
                  "button",
                  {
                    type: "button",
                    className: "gcp-candidate-download",
                    disabled: !I,
                    title: I ? "Materialize a graph JSON without changing the canvas; recorded fidelity warnings will be shown" : "This legacy summary has no portable candidate specification",
                    onClick: () => se($.id, $.label),
                    children: "Download"
                  }
                ) })
              ] }, $.id);
            }) })
          ] }) })
        ] }),
        (((ye = (oe = R.insights) == null ? void 0 : oe.warnings) == null ? void 0 : ye.length) > 0 || R.applyConflict) && /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-study-warnings", children: [
          /* @__PURE__ */ v.jsx("div", { className: "gcp-lab-section-title", children: /* @__PURE__ */ v.jsx("h3", { id: "gcp-study-warnings", children: "Evidence warnings" }) }),
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-warnings", children: [
            R.applyConflict && /* @__PURE__ */ v.jsx("p", { role: "alert", children: R.applyConflict }),
            (be = (re = R.insights) == null ? void 0 : re.warnings) == null ? void 0 : be.map(($, te) => /* @__PURE__ */ v.jsx("p", { role: "alert", children: $ }, `${te}-${$}`))
          ] })
        ] }),
        ((k = (D = R.insights) == null ? void 0 : D.paperIdeas) == null ? void 0 : k.length) > 0 && /* @__PURE__ */ v.jsxs("section", { className: "gcp-lab-section", "aria-labelledby": "gcp-paper-ideas", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-lab-section-title", children: [
            /* @__PURE__ */ v.jsx("h3", { id: "gcp-paper-ideas", children: "Paper ideas" }),
            /* @__PURE__ */ v.jsx("span", { children: "Research leads, not final claims" })
          ] }),
          /* @__PURE__ */ v.jsx("div", { className: "gcp-paper-grid", children: R.insights.paperIdeas.map(($, te) => /* @__PURE__ */ v.jsxs("article", { className: "gcp-paper-card", children: [
            /* @__PURE__ */ v.jsxs("span", { className: "gcp-paper-index", children: [
              "0",
              te + 1
            ] }),
            /* @__PURE__ */ v.jsx("h4", { children: $.title }),
            /* @__PURE__ */ v.jsxs("dl", { children: [
              /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("dt", { children: "Evidence" }),
                /* @__PURE__ */ v.jsx("dd", { children: $.evidence })
              ] }),
              /* @__PURE__ */ v.jsxs("div", { children: [
                /* @__PURE__ */ v.jsx("dt", { children: "Next step" }),
                /* @__PURE__ */ v.jsx("dd", { children: $.nextStep })
              ] })
            ] })
          ] }, `${te}-${$.title}`)) })
        ] })
      ] })
    ] }),
    g && /* @__PURE__ */ v.jsx("div", { className: "gcp-study-import-backdrop", children: /* @__PURE__ */ v.jsxs(
      "section",
      {
        className: "gcp-study-import-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gcp-study-import-title",
        children: [
          /* @__PURE__ */ v.jsx("span", { className: "gcp-eyebrow", children: "Content-integrity check passed · authorship unverified" }),
          /* @__PURE__ */ v.jsx("h2", { id: "gcp-study-import-title", children: "Import portable study?" }),
          /* @__PURE__ */ v.jsx("p", { children: g.payload.spec.hypothesis }),
          /* @__PURE__ */ v.jsxs("dl", { children: [
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("dt", { children: "Study ID" }),
              /* @__PURE__ */ v.jsx("dd", { children: g.payload.id })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("dt", { children: "Candidates" }),
              /* @__PURE__ */ v.jsx("dd", { children: g.payload.spec.variants.length })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("dt", { children: "Run records" }),
              /* @__PURE__ */ v.jsx("dd", { children: g.payload.runs.length })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("dt", { children: "Secrets required" }),
              /* @__PURE__ */ v.jsx("dd", { children: g.payload.redactionReport.secretRequirements.length })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("dt", { children: "SHA-256" }),
              /* @__PURE__ */ v.jsx("dd", { children: /* @__PURE__ */ v.jsx("code", { children: g.integrity.contentSha256 }) })
            ] })
          ] }),
          /* @__PURE__ */ v.jsx("p", { className: "gcp-study-import-safety", children: "SHA-256 detects content changes only; it does not authenticate the author or evidence source. Import stores the bundle for read-only review and does not execute, replay, apply, or open any graph." }),
          N && /* @__PURE__ */ v.jsx("p", { className: "gcp-lab-portable-message error", role: "alert", children: N }),
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-study-import-actions", children: [
            /* @__PURE__ */ v.jsx("button", { type: "button", onClick: () => _(null), disabled: A, children: "Cancel" }),
            /* @__PURE__ */ v.jsx("button", { type: "button", className: "primary", onClick: () => {
              ne();
            }, disabled: A, children: A ? "Importing…" : "Import read-only" })
          ] })
        ]
      }
    ) })
  ] });
}
function J_(a) {
  const r = Date.now() - a, l = Math.floor(r / 1e3);
  if (l < 60) return "just now";
  const s = Math.floor(l / 60);
  if (s < 60) return `${s}m ago`;
  const u = Math.floor(s / 60);
  if (u < 24) return `${u}h ago`;
  const d = Math.floor(u / 24);
  return d < 7 ? `${d}d ago` : `${Math.floor(d / 7)}w ago`;
}
function F_({ api: a, activeId: r, onResume: l, onNew: s }) {
  const [u, d] = P.useState(
    () => Cu(a)
  ), [f, y] = P.useState(null), m = (b, g) => {
    b.stopPropagation(), f === g ? (s0(a, g), d(Cu(a)), f === g && y(null)) : y(g);
  }, h = () => {
    y(null);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ v.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ v.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: s,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    u.length === 0 ? /* @__PURE__ */ v.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ v.jsx("div", { className: "gcp-history-list", onClick: h, children: u.map((b) => /* @__PURE__ */ v.jsxs(
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
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ v.jsx("div", { className: "gcp-history-title", children: b.title || "(untitled)" }),
            /* @__PURE__ */ v.jsxs("div", { className: "gcp-history-meta", children: [
              J_(b.updatedAt),
              " · ",
              b.provider,
              "/",
              b.model || "—",
              b.reasoningEffort ? ` · ${b.reasoningEffort} effort` : ""
            ] })
          ] }),
          /* @__PURE__ */ v.jsx(
            "button",
            {
              className: `gcp-history-delete${f === b.id ? " confirm" : ""}`,
              onClick: (g) => m(g, b.id),
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
let sl = 0, Zu = 0, Kr = null;
function Hr() {
  return sl += 1, Zu += 1, Kr = null, sl;
}
function Os(a) {
  return a === sl;
}
async function Ju(a) {
  const r = sl;
  let l = Kr;
  (l === null || l.generation !== r) && (l = {
    generation: r,
    sequence: ++Zu,
    promise: Promise.resolve().then(a)
  }, Kr = l);
  try {
    const s = await l.promise;
    return l.generation === sl && l.sequence === Zu ? s : null;
  } finally {
    Kr === l && (Kr = null);
  }
}
const yy = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, W_ = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], P_ = 2e3, eE = 300 * 1e3, Gr = {
  reasoningEffort: !1,
  richModelCatalog: !1
};
function tE({
  value: a,
  onBlur: r,
  placeholder: l,
  "aria-label": s
}) {
  const [u, d] = P.useState(!1), [f, y] = P.useState(a);
  return P.useEffect(() => {
    y(a);
  }, [a]), /* @__PURE__ */ v.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ v.jsx(
      "input",
      {
        type: u ? "text" : "password",
        className: "gcp-input",
        value: f,
        onChange: (m) => y(m.target.value),
        onBlur: () => r(f),
        placeholder: l ?? "API key",
        "aria-label": s,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ v.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => d((m) => !m),
        "aria-label": u ? "Hide key" : "Show key",
        title: u ? "Hide" : "Show",
        children: u ? "Hide" : "Show"
      }
    )
  ] });
}
function nE({
  api: a,
  settings: r,
  codexLoggedIn: l,
  codexEmail: s,
  onCodexStatusChange: u,
  onChange: d
}) {
  var dn, bn, Xn;
  const f = r.provider, y = f === "openai" ? r.apiKeys.openai : f === "openrouter" ? r.apiKeys.openrouter : f === "anthropic" ? r.apiKeys.anthropic : f === "custom" ? r.apiKeys.custom : void 0, m = f === "custom" ? r.customBaseUrl : void 0, h = Cs(
    f,
    f === "openai-codex" ? s ?? (l ? "active-codex-session" : "") : y,
    m
  ), [b, g] = P.useState({ provider: f, identity: h, models: [] }), [_, N] = P.useState(!1), [z, A] = P.useState(null), H = P.useRef(0), T = P.useRef(r), R = P.useRef(d), I = P.useRef(u), ae = P.useRef(l), Q = P.useRef(s), ne = P.useRef(l), [V, se] = P.useState(null), [ue, Y] = P.useState(!1), X = P.useRef(null), oe = P.useRef(0);
  T.current = r, R.current = d, I.current = u, ae.current = l, Q.current = s;
  const ye = r.models[f] ?? "", re = Sy(
    f,
    b.provider === f && b.identity === h ? b.models : [],
    ye
  ), be = Du(f, ye, re), k = ((bn = (dn = r.providerCapabilities) == null ? void 0 : dn[f]) == null ? void 0 : bn.reasoningEffort) === !0 ? (be == null ? void 0 : be.reasoningEfforts) ?? [] : [];
  P.useEffect(() => () => {
    X.current !== null && (clearInterval(X.current), X.current = null);
  }, []), P.useEffect(() => {
    let J = !0;
    return f === "openai-codex" && Ju(() => zu(a)).then((de) => {
      if (J && de !== null) {
        const Re = de.status === "logged_in", Fe = Re ? de.email ?? null : null;
        (Re !== ae.current || Fe !== Q.current) && (qr("openai-codex"), ee("openai-codex", [], Gr)), I.current(Re, Fe);
      }
    }).catch(() => {
    }), () => {
      J = !1;
    };
  }, [a, f]), P.useEffect(() => {
    ne.current && !l && qr("openai-codex"), ne.current = l;
  }, [l]);
  function $(J) {
    const de = { ...T.current, ...J };
    T.current = de, R.current(de);
  }
  function te(J) {
    var ke, Na;
    const de = T.current, Re = { ...de.reasoningEfforts }, Fe = Re[f], pt = Du(f, J, re), rt = !!((ke = pt == null ? void 0 : pt.reasoningEfforts) != null && ke.some(
      (Za) => Za.effort === Fe
    ));
    Fe && (pt != null && pt.reasoningEfforts) && !rt && delete Re[f];
    const $t = (Na = de.providerCapabilities) == null ? void 0 : Na[f], nn = $t ? {
      reasoningEffort: $t.reasoningEffort,
      richModelCatalog: $t.richModelCatalog,
      ...Fe && rt ? { reasoningModel: J } : {}
    } : void 0;
    $({
      models: { ...de.models, [f]: J },
      reasoningEfforts: Re,
      ...nn ? {
        providerCapabilities: {
          ...de.providerCapabilities,
          [f]: nn
        }
      } : {}
    });
  }
  function Z(J) {
    var rt;
    const de = T.current, Re = { ...de.reasoningEfforts };
    J === "" ? delete Re[f] : Re[f] = J;
    const Fe = (rt = de.providerCapabilities) == null ? void 0 : rt[f], pt = Fe ? {
      reasoningEffort: Fe.reasoningEffort,
      richModelCatalog: Fe.richModelCatalog,
      ...J ? { reasoningModel: de.models[f] ?? "" } : {}
    } : void 0;
    $({
      reasoningEfforts: Re,
      ...pt ? {
        providerCapabilities: {
          ...de.providerCapabilities,
          [f]: pt
        }
      } : {}
    });
  }
  function E(J, de) {
    const Re = T.current, Fe = { ...Re.providerCapabilities };
    delete Fe[J], $({
      apiKeys: { ...Re.apiKeys, [J]: de },
      providerCapabilities: Fe
    });
  }
  function L(J) {
    return J === "openai" ? T.current.apiKeys.openai : J === "openrouter" ? T.current.apiKeys.openrouter : J === "anthropic" ? T.current.apiKeys.anthropic : J === "custom" ? T.current.apiKeys.custom : void 0;
  }
  function W(J) {
    return Cs(
      J,
      J === "openai-codex" ? Q.current ?? (ae.current ? "active-codex-session" : "") : L(J),
      J === "custom" ? T.current.customBaseUrl : void 0
    );
  }
  function ee(J, de, Re, Fe) {
    const pt = T.current, rt = Ou(
      pt,
      J,
      de,
      Re,
      Fe
    );
    rt !== pt && (T.current = rt, R.current(rt));
  }
  async function me(J, de = f) {
    const Re = L(de), Fe = de === "custom" ? T.current.customBaseUrl : void 0, pt = de === "openai-codex" ? ae.current : de === "custom" ? !!Fe : !!Re, rt = W(de), $t = ++H.current;
    if (!pt) {
      N(!1), A(null), g({ provider: de, identity: rt, models: [] }), ee(de, [], Gr);
      return;
    }
    const nn = rt;
    if (!J) {
      const ke = _y(nn);
      if (ke) {
        if (H.current !== $t) return;
        g({ provider: de, identity: rt, models: ke.models }), ee(
          de,
          ke.models,
          ke.capabilities,
          ke.source
        ), A(null), N(!1);
        return;
      }
    }
    N(!0), A(null);
    try {
      const ke = await My(
        a,
        de,
        Re,
        Fe
      );
      if (H.current !== $t) return;
      Ey(nn, ke), g({ provider: de, identity: rt, models: ke.models }), ee(
        de,
        ke.models,
        ke.capabilities,
        ke.source
      );
    } catch (ke) {
      if (H.current !== $t) return;
      A(String(ke));
    } finally {
      H.current === $t && N(!1);
    }
  }
  P.useEffect(() => {
    if (++H.current, N(!1), A(null), g(
      (J) => J.provider === f && J.identity === h ? J : { provider: f, identity: h, models: [] }
    ), f === "custom") {
      ee(f, [], Gr);
      return;
    }
    return me(!1, f), () => {
      ++H.current;
    };
  }, [a, f, y, m, l, s]);
  function Se() {
    me(!0);
  }
  async function Te() {
    const J = Hr();
    try {
      const de = await S0(a);
      if (!Os(J)) return;
      window.open(de, "_blank"), Y(!0), oe.current = Date.now(), X.current = setInterval(async () => {
        try {
          const Re = await Ju(() => zu(a));
          Re !== null && Os(J) && Re.status === "logged_in" && (Hr(), qr("openai-codex"), ee("openai-codex", [], Gr), I.current(!0, Re.email ?? null), Y(!1), X.current !== null && (clearInterval(X.current), X.current = null));
        } catch {
        }
        if (Date.now() - oe.current > eE) {
          if (!Os(J)) return;
          Hr(), Y(!1), X.current !== null && (clearInterval(X.current), X.current = null);
        }
      }, P_);
    } catch (de) {
      se(String(de));
    }
  }
  async function dt() {
    const J = Hr();
    Y(!1), X.current !== null && (clearInterval(X.current), X.current = null);
    try {
      if (await _0(a), !Os(J)) return;
      Hr(), qr("openai-codex"), ++H.current, g({
        provider: "openai-codex",
        identity: Cs("openai-codex"),
        models: []
      }), A(null), ee("openai-codex", [], Gr), I.current(!1, null);
    } catch (de) {
      se(String(de));
    }
  }
  const Xe = "gcp-model-datalist";
  return /* @__PURE__ */ v.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ v.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ v.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: f,
          onChange: (J) => $({ provider: J.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(yy).map((J) => /* @__PURE__ */ v.jsx("option", { value: J, children: yy[J] }, J))
        }
      )
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ v.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ v.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ v.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: Xe,
            value: r.models[f] ?? "",
            onChange: (J) => te(J.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ v.jsx("datalist", { id: Xe, children: re.map((J) => /* @__PURE__ */ v.jsx("option", { value: J.id, label: J.label }, J.id)) }),
        /* @__PURE__ */ v.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: Se,
            disabled: _,
            "aria-label": "Load available models from provider",
            title: "Refresh model list",
            children: _ ? "Refreshing..." : "Refresh"
          }
        )
      ] }),
      z && /* @__PURE__ */ v.jsx("span", { className: "gcp-field-hint error", role: "alert", children: z })
    ] }),
    k.length > 0 && /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ v.jsx("label", { className: "gcp-label", htmlFor: "gcp-reasoning-effort", children: "Reasoning effort" }),
      /* @__PURE__ */ v.jsxs(
        "select",
        {
          id: "gcp-reasoning-effort",
          className: "gcp-select",
          value: ((Xn = r.reasoningEfforts) == null ? void 0 : Xn[f]) ?? "",
          onChange: (J) => Z(J.target.value),
          "aria-label": "Reasoning effort",
          children: [
            /* @__PURE__ */ v.jsxs("option", { value: "", children: [
              "Model default",
              be != null && be.defaultReasoningEffort ? ` (${be.defaultReasoningEffort})` : ""
            ] }),
            k.map((J) => /* @__PURE__ */ v.jsx(
              "option",
              {
                value: J.effort,
                title: J.description,
                children: J.effort
              },
              J.effort
            ))
          ]
        }
      )
    ] }),
    f !== "openai-codex" && W_.filter((J) => J === f || f === "custom" && J === "custom").map(
      (J) => J === f ? /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ v.jsx("label", { className: "gcp-label", children: J === "openai" ? "OpenAI API Key" : J === "anthropic" ? "Anthropic API Key" : J === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ v.jsx(
          tE,
          {
            value: r.apiKeys[J] ?? "",
            onBlur: (de) => E(J, de),
            placeholder: J === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": J === "openai" ? "OpenAI API key" : J === "anthropic" ? "Anthropic API key" : J === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, J) : null
    ),
    f === "custom" && /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ v.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ v.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: r.customBaseUrl,
          onChange: (J) => $({ customBaseUrl: J.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    f === "openai-codex" && /* @__PURE__ */ v.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ v.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ v.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ v.jsx(
          "div",
          {
            className: `gcp-codex-status${l ? " signed-in" : ue ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: l ? `Signed in${s ? ` as ${s}` : ""}` : ue ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ v.jsxs("div", { className: "gcp-codex-btns", children: [
          !l && /* @__PURE__ */ v.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: Te,
              disabled: ue,
              "aria-label": "Sign in with ChatGPT Codex",
              children: ue ? "Waiting..." : "Sign in"
            }
          ),
          l && /* @__PURE__ */ v.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: dt,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        V && /* @__PURE__ */ v.jsx("span", { className: "gcp-field-hint error", role: "alert", children: V })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function aE() {
  return /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M20 15a3 3 0 0 1-3 3H8l-4 3V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }) });
}
function iE() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("path", { d: "M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ v.jsx("path", { d: "M7.5 15h9", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function rE() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ v.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function lE() {
  return /* @__PURE__ */ v.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ v.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.8" }),
    /* @__PURE__ */ v.jsx("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function sE({ expanded: a }) {
  return a ? /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M9 3v6H3M15 3v6h6M9 21v-6H3M15 21v-6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }) : /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function oE() {
  return /* @__PURE__ */ v.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx("path", { d: "m6 6 12 12M18 6 6 18", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round" }) });
}
function gy(a) {
  var r, l;
  try {
    const s = (l = (r = a.graph) == null ? void 0 : r.getGraph) == null ? void 0 : l.call(r);
    return s ? {
      nodes: Array.isArray(s.nodes) ? s.nodes.length : 0,
      edges: Array.isArray(s.edges) ? s.edges.length : 0,
      available: !0
    } : { nodes: 0, edges: 0, available: !1 };
  } catch {
    return { nodes: 0, edges: 0, available: !1 };
  }
}
function cE({
  api: a,
  settings: r,
  codexLoggedIn: l,
  codexEmail: s,
  conversation: u,
  onConversationChange: d,
  onSettingsChange: f,
  onCodexStatusChange: y,
  onNewConversation: m,
  onResumeConversation: h,
  onClose: b
}) {
  const [g, _] = P.useState("chat"), [N, z] = P.useState("compact"), [A, H] = P.useState(() => gy(a));
  P.useEffect(() => {
    var se, ue;
    const V = () => H(gy(a));
    V();
    try {
      return (ue = (se = a.graph) == null ? void 0 : se.onGraphChanged) == null ? void 0 : ue.call(se, V);
    } catch {
      return;
    }
  }, [a]);
  const T = (V) => {
    h(V), _("chat");
  }, R = () => {
    m(), _("chat");
  }, I = (V) => {
    _((se) => se === V && V !== "chat" ? "chat" : V);
  }, ae = r.models[r.provider] ?? "", Q = Number.isFinite(a.apiVersion) ? `API v${a.apiVersion}` : "API legacy", ne = [
    { id: "chat", label: "Chat", ariaLabel: "Agent chat", icon: /* @__PURE__ */ v.jsx(aE, {}) },
    { id: "experiments", label: "Lab", ariaLabel: "Experiments lab", icon: /* @__PURE__ */ v.jsx(iE, {}) },
    { id: "history", label: "History", ariaLabel: "Conversation history", icon: /* @__PURE__ */ v.jsx(rE, {}) },
    { id: "settings", label: "Settings", ariaLabel: "Settings", icon: /* @__PURE__ */ v.jsx(lE, {}) }
  ];
  return /* @__PURE__ */ v.jsxs(
    "div",
    {
      className: `gcp-window gcp-window--${N}`,
      role: "dialog",
      "aria-label": "Graph Copilot agent workbench",
      "data-panel-mode": N,
      children: [
        /* @__PURE__ */ v.jsxs("header", { className: "gcp-workbench-header", children: [
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-header-main", children: [
            /* @__PURE__ */ v.jsxs("div", { className: "gcp-brand", children: [
              /* @__PURE__ */ v.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
              /* @__PURE__ */ v.jsxs("span", { className: "gcp-brand-copy", children: [
                /* @__PURE__ */ v.jsx("strong", { children: "Graph Copilot" }),
                /* @__PURE__ */ v.jsx("span", { children: "Agent workbench" })
              ] })
            ] }),
            /* @__PURE__ */ v.jsxs("div", { className: "gcp-header-actions", children: [
              /* @__PURE__ */ v.jsxs(
                "button",
                {
                  className: "gcp-model-chip",
                  onClick: () => _("settings"),
                  "aria-label": "Active model — open settings",
                  title: `Provider: ${r.provider}${ae ? ` · ${ae}` : ""} — click to change`,
                  children: [
                    /* @__PURE__ */ v.jsx("span", { className: "gcp-model-dot", "aria-hidden": "true" }),
                    ae || "Set up model"
                  ]
                }
              ),
              /* @__PURE__ */ v.jsx(
                "button",
                {
                  className: "gcp-icon-btn",
                  onClick: () => z((V) => V === "compact" ? "expanded" : "compact"),
                  "aria-label": N === "compact" ? "Expand panel" : "Use compact panel",
                  title: N === "compact" ? "Expand workspace" : "Compact workspace",
                  children: /* @__PURE__ */ v.jsx(sE, { expanded: N === "expanded" })
                }
              ),
              /* @__PURE__ */ v.jsx("button", { className: "gcp-icon-btn", onClick: b, "aria-label": "Close panel", title: "Close", children: /* @__PURE__ */ v.jsx(oE, {}) })
            ] })
          ] }),
          /* @__PURE__ */ v.jsxs("div", { className: "gcp-context-bar", "aria-label": "Current graph context", children: [
            /* @__PURE__ */ v.jsx("span", { className: `gcp-live-indicator${A.available ? " online" : ""}`, "aria-hidden": "true" }),
            /* @__PURE__ */ v.jsx("span", { className: "gcp-context-name", children: "Current graph" }),
            /* @__PURE__ */ v.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ v.jsx("strong", { children: A.nodes }),
              " nodes"
            ] }),
            /* @__PURE__ */ v.jsxs("span", { className: "gcp-context-stat", children: [
              /* @__PURE__ */ v.jsx("strong", { children: A.edges }),
              " edges"
            ] }),
            /* @__PURE__ */ v.jsx("span", { className: "gcp-context-api", children: Q })
          ] }),
          /* @__PURE__ */ v.jsx("nav", { className: "gcp-workbench-nav", "aria-label": "Agent workbench views", children: ne.map((V) => /* @__PURE__ */ v.jsxs(
            "button",
            {
              className: `gcp-nav-btn${g === V.id ? " active" : ""}`,
              onClick: () => I(V.id),
              "aria-label": V.ariaLabel,
              "aria-current": g === V.id ? "page" : void 0,
              children: [
                V.icon,
                /* @__PURE__ */ v.jsx("span", { children: V.label })
              ]
            },
            V.id
          )) })
        ] }),
        /* @__PURE__ */ v.jsxs("main", { className: "gcp-view", children: [
          g === "chat" && /* @__PURE__ */ v.jsx(
            w_,
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
          g === "experiments" && /* @__PURE__ */ v.jsx(Z_, { api: a }),
          g === "history" && /* @__PURE__ */ v.jsx(F_, { api: a, activeId: u.id, onResume: T, onNew: R }),
          g === "settings" && /* @__PURE__ */ v.jsx(
            nE,
            {
              api: a,
              settings: r,
              codexLoggedIn: l,
              codexEmail: s,
              onCodexStatusChange: y,
              onChange: f
            }
          )
        ] })
      ]
    }
  );
}
function uE({ api: a }) {
  const [r, l] = P.useState(!1), [s, u] = P.useState(() => i0(a)), [d, f] = P.useState(!1), [y, m] = P.useState(null), [h, b] = P.useState(
    () => Nh(
      s.provider,
      s.models[s.provider] ?? "",
      Ls(s)
    )
  );
  P.useEffect(() => {
    r0(a, s);
  }, [a, s]), P.useEffect(() => {
    if (s.provider !== "openai-codex") return;
    let A = !1;
    return Ju(() => zu(a)).then((H) => {
      if (A || H === null) return;
      const T = H.status === "logged_in", R = T ? H.email ?? null : null;
      (T !== d || R !== y) && u((I) => Ou(
        I,
        "openai-codex",
        [],
        { reasoningEffort: !1, richModelCatalog: !1 }
      )), T || qr("openai-codex"), f(T), m(R);
    }).catch(() => {
    }), () => {
      A = !0;
    };
  }, [a, s.provider]), P.useEffect(() => {
    const A = s.provider;
    if (A === "custom") return;
    const H = A === "openai" ? s.apiKeys.openai : A === "openrouter" ? s.apiKeys.openrouter : A === "anthropic" ? s.apiKeys.anthropic : void 0;
    if (!(A === "openai-codex" ? d : !!H)) return;
    const R = Cs(
      A,
      A === "openai-codex" ? y ?? "active-codex-session" : H
    );
    let I = !1;
    const ae = (ne) => {
      I || u((V) => {
        if (V.provider !== A) return V;
        const se = A === "openai" ? V.apiKeys.openai : A === "openrouter" ? V.apiKeys.openrouter : A === "anthropic" ? V.apiKeys.anthropic : void 0;
        return A !== "openai-codex" && se !== H ? V : Ou(
          V,
          A,
          ne.models,
          ne.capabilities,
          ne.source
        );
      });
    }, Q = _y(R);
    return Q ? (ae(Q), () => {
      I = !0;
    }) : (My(a, A, H).then((ne) => {
      I || (Ey(R, ne), ae(ne));
    }).catch(() => {
    }), () => {
      I = !0;
    });
  }, [
    a,
    s.provider,
    s.apiKeys.openai,
    s.apiKeys.openrouter,
    s.apiKeys.anthropic,
    d,
    y
  ]);
  const g = (A) => {
    u(A);
  }, _ = (A, H) => {
    f(A), m(H);
  }, N = () => {
    b(
      Nh(
        s.provider,
        s.models[s.provider] ?? "",
        Ls(s)
      )
    );
  }, z = (A) => {
    b(A);
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ v.jsx(u0, { onClick: () => l((A) => !A) }),
    r && /* @__PURE__ */ v.jsx(
      cE,
      {
        api: a,
        settings: s,
        codexLoggedIn: d,
        codexEmail: y,
        conversation: h,
        onConversationChange: b,
        onSettingsChange: g,
        onCodexStatusChange: _,
        onNewConversation: N,
        onResumeConversation: z,
        onClose: () => l(!1)
      }
    )
  ] });
}
function fE(a) {
  const r = a.ui.addFloatingWidget({ id: "copilot" });
  qb.createRoot(r).render(
    /* @__PURE__ */ v.jsx(Rb.StrictMode, { children: /* @__PURE__ */ v.jsx(uE, { api: a }) })
  );
}
export {
  fE as default
};
