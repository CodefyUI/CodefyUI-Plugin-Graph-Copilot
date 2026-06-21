(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #14171d;--gcp-bg-deep: #0e1116;--gcp-surface: #1a1f27;--gcp-surface-2: #212732;--gcp-surface-hi: rgba(255, 255, 255, .055);--gcp-border: #2a313d;--gcp-border-soft: rgba(255, 255, 255, .07);--gcp-edge-hi: rgba(255, 255, 255, .06);--gcp-text: #e8eaf0;--gcp-dim: #9aa4b4;--gcp-faint: #6b7484;--gcp-accent: #2dd4d8;--gcp-accent-bright: #5ee7ea;--gcp-accent-deep: #0c98a6;--gcp-accent-ink: #04161a;--gcp-accent-soft: rgba(45, 212, 216, .12);--gcp-accent-line: rgba(45, 212, 216, .28);--gcp-grad: linear-gradient(135deg, #46e0e2 0%, #1ab6bf 55%, #0c98a6 100%);--gcp-danger: #f87171;--gcp-warn: #fbbf24;--gcp-ok: #34d399;--gcp-r-lg: 16px;--gcp-r: 11px;--gcp-r-sm: 8px;--gcp-shadow: 0 24px 56px -16px rgba(0, 0, 0, .7), 0 6px 16px rgba(0, 0, 0, .38);--gcp-shadow-sm: 0 4px 14px rgba(0, 0, 0, .35);--gcp-glow: 0 10px 30px -6px rgba(20, 182, 191, .5);--gcp-mono: "Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;--gcp-ease: cubic-bezier(.22, 1, .36, 1);position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:8px;height:8px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:8px;border:2px solid transparent;background-clip:padding-box}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-faint);background-clip:padding-box}.gcp-fab{width:52px;height:52px;border-radius:50%;background:var(--gcp-grad);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--gcp-glow),inset 0 1px #ffffff59;transition:transform .18s var(--gcp-ease),box-shadow .18s var(--gcp-ease),filter .18s var(--gcp-ease);outline:none;animation:gcp-fab-glow 4.5s ease-in-out infinite}.gcp-fab:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50%;background:radial-gradient(closest-side,rgba(45,212,216,.35),transparent 70%);opacity:0;transition:opacity .2s ease;pointer-events:none}.gcp-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.05)}.gcp-fab:hover:after{opacity:1}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:4px}@keyframes gcp-fab-glow{0%,to{box-shadow:0 10px 30px -6px #14b6bf73,inset 0 1px #ffffff59}50%{box-shadow:0 14px 38px -4px #14b6bf9e,inset 0 1px #ffffff59}}.gcp-window{position:fixed;bottom:16px;right:16px;width:432px;height:min(620px,calc(100vh - 96px));background:radial-gradient(120% 60% at 50% -10%,rgba(45,212,216,.06),transparent 60%),var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow);overflow:hidden;animation:gcp-window-in .28s var(--gcp-ease) both}.gcp-window:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;border-top:1px solid var(--gcp-edge-hi);pointer-events:none}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}.gcp-header{display:flex;align-items:center;padding:11px 12px;border-bottom:1px solid var(--gcp-border-soft);gap:8px;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent),var(--gcp-bg-deep);flex-shrink:0;position:relative;z-index:1}.gcp-header-title{flex:1;font-weight:600;font-size:13px;letter-spacing:.01em;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.gcp-header-mark{width:18px;height:18px;border-radius:6px;background:var(--gcp-grad);box-shadow:0 2px 8px #14b6bf73,inset 0 1px #fff6;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:11px;flex-shrink:0}.gcp-icon-btn{width:30px;height:30px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s ease,color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.92)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft)}.gcp-label-btn{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px 0 9px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-weight:550;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-label-btn:hover{color:var(--gcp-text);background:var(--gcp-surface-2);border-color:var(--gcp-border)}.gcp-label-btn:active{transform:scale(.96)}.gcp-label-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-label-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:46px;height:46px;border-radius:14px;background:var(--gcp-grad);color:var(--gcp-accent-ink);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--gcp-glow),inset 0 1px #fff6;animation:gcp-pop .46s var(--gcp-ease) both}.gcp-welcome-title{font-size:15px;font-weight:650;color:var(--gcp-text);letter-spacing:.01em;animation:gcp-rise .46s var(--gcp-ease) 60ms both}.gcp-welcome-sub{font-size:12.5px;line-height:1.6;color:var(--gcp-dim);animation:gcp-rise .46s var(--gcp-ease) .12s both}.gcp-welcome-history{margin-top:6px;display:inline-flex;align-items:center;gap:7px;padding:7px 14px;border-radius:999px;border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12.5px;font-family:inherit;cursor:pointer;transition:color .14s ease,background .14s ease,border-color .14s ease;outline:none;animation:gcp-rise .46s var(--gcp-ease) .18s both}.gcp-welcome-history:hover{color:var(--gcp-accent-bright);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-welcome-history:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}@keyframes gcp-pop{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .3s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}@keyframes gcp-rise{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.gcp-bubble{max-width:86%;padding:9px 12px;border-radius:var(--gcp-r);line-height:1.55;word-break:break-word;white-space:pre-wrap;font-size:13px;box-shadow:var(--gcp-shadow-sm)}.gcp-msg-row.user .gcp-bubble{background:linear-gradient(180deg,#2dd4d829,#2dd4d81a);border:1px solid var(--gcp-accent-line);color:var(--gcp-text);border-bottom-right-radius:4px}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-text);border-bottom-left-radius:4px;box-shadow:var(--gcp-shadow-sm),inset 0 1px 0 var(--gcp-edge-hi)}.gcp-bubble.error{background:#f871711a;border:1px solid rgba(248,113,113,.32);color:var(--gcp-text)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);padding:10px 11px;overflow-x:auto;font-size:12px;font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:12px}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:86%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block;box-shadow:var(--gcp-shadow-sm)}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);font-size:11.5px;max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:var(--gcp-accent-soft);border:1px solid var(--gcp-accent-line);color:var(--gcp-accent-bright);font-size:11px;line-height:1.5;font-variant-numeric:tabular-nums}.gcp-retry-btn{padding:4px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;align-self:flex-end}.gcp-retry-btn:hover{background:#f871711f}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:#0e1116c7;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:26px 34px;border:1.5px dashed var(--gcp-accent-line);border-radius:var(--gcp-r);color:var(--gcp-accent-bright);font-size:13px;background:var(--gcp-accent-soft)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 12px;border-top:1px solid var(--gcp-border-soft);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.12)),var(--gcp-bg-deep)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .22s var(--gcp-ease) both}.gcp-chip.error{border-color:#f8717180;background:#f8717114}.gcp-chip-thumb{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-bg-deep);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:12px;color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:10.5px;color:var(--gcp-faint)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:13px;height:13px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-chip-remove{width:18px;height:18px;border-radius:5px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s ease,color .13s ease;outline:none}.gcp-chip-remove:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .14s ease,border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-accent);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-attach-btn:active:not(:disabled){transform:scale(.93)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:13px;padding:8px 11px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .14s ease,box-shadow .14s ease}.gcp-textarea::placeholder{color:var(--gcp-faint)}.gcp-textarea:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-textarea:disabled{opacity:.55;cursor:not-allowed}.gcp-send-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-grad);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px #14b6bf66,inset 0 1px #ffffff4d;transition:filter .14s ease,transform .14s var(--gcp-ease),box-shadow .14s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.08);box-shadow:0 6px 18px #14b6bf8c,inset 0 1px #ffffff4d}.gcp-send-btn:active:not(:disabled){transform:scale(.93)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-surface-2);color:var(--gcp-faint);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:2px}.gcp-stop-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-stop-btn:hover{background:#f871711f}.gcp-stop-btn:active{transform:scale(.93)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#0e1116db;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 15px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#2dd4d833}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:9px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:13px;font-weight:550;font-family:inherit;cursor:pointer;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-new-btn:hover{background:#2dd4d82e}.gcp-new-btn:active{transform:scale(.99)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:3px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background .14s ease,box-shadow .14s ease;border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-surface-hi)}.gcp-history-item.active{background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--gcp-grad)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:11px;color:var(--gcp-faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:26px;height:26px;border-radius:6px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .13s ease,background .13s ease,opacity .13s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711f}.gcp-history-delete.confirm{color:var(--gcp-danger);background:#f8717124;opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-faint);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:11px;font-weight:650;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.06em}.gcp-select,.gcp-input{width:100%;padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .14s ease,box-shadow .14s ease}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa4b4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:8px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:7px 14px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none}.gcp-codex-btn:hover{background:#2dd4d82e}.gcp-codex-btn.danger{border-color:#f8717180;background:transparent;color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711f}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-faint);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-faint);line-height:1.6;padding-top:6px;border-top:1px solid var(--gcp-border-soft)}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function zy(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var rf = { exports: {} }, xn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ed;
function Oy() {
  if (Ed) return xn;
  Ed = 1;
  var f = Symbol.for("react.transitional.element"), m = Symbol.for("react.fragment");
  function p(s, N, x) {
    var z = null;
    if (x !== void 0 && (z = "" + x), N.key !== void 0 && (z = "" + N.key), "key" in N) {
      x = {};
      for (var C in N)
        C !== "key" && (x[C] = N[C]);
    } else x = N;
    return N = x.ref, {
      $$typeof: f,
      type: s,
      key: z,
      ref: N !== void 0 ? N : null,
      props: x
    };
  }
  return xn.Fragment = m, xn.jsx = p, xn.jsxs = p, xn;
}
var _d;
function My() {
  return _d || (_d = 1, rf.exports = Oy()), rf.exports;
}
var b = My(), df = { exports: {} }, k = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ad;
function Dy() {
  if (Ad) return k;
  Ad = 1;
  var f = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), z = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), A = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), L = Symbol.iterator;
  function ut(d) {
    return d === null || typeof d != "object" ? null : (d = L && d[L] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var ot = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, rt = {};
  function lt(d, D, B) {
    this.props = d, this.context = D, this.refs = rt, this.updater = B || ot;
  }
  lt.prototype.isReactComponent = {}, lt.prototype.setState = function(d, D) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, D, "setState");
  }, lt.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Jt() {
  }
  Jt.prototype = lt.prototype;
  function ht(d, D, B) {
    this.props = d, this.context = D, this.refs = rt, this.updater = B || ot;
  }
  var Nt = ht.prototype = new Jt();
  Nt.constructor = ht, V(Nt, lt.prototype), Nt.isPureReactComponent = !0;
  var Zt = Array.isArray;
  function jt() {
  }
  var Q = { H: null, A: null, T: null, S: null }, Mt = Object.prototype.hasOwnProperty;
  function Ct(d, D, B) {
    var Y = B.ref;
    return {
      $$typeof: f,
      type: d,
      key: D,
      ref: Y !== void 0 ? Y : null,
      props: B
    };
  }
  function X(d, D) {
    return Ct(d.type, D, d.props);
  }
  function At(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Tt(d) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(B) {
      return D[B];
    });
  }
  var Gl = /\/+/g;
  function sl(d, D) {
    return typeof d == "object" && d !== null && d.key != null ? Tt("" + d.key) : D.toString(36);
  }
  function ol(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(jt, jt) : (d.status = "pending", d.then(
          function(D) {
            d.status === "pending" && (d.status = "fulfilled", d.value = D);
          },
          function(D) {
            d.status === "pending" && (d.status = "rejected", d.reason = D);
          }
        )), d.status) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function _(d, D, B, Y, w) {
    var I = typeof d;
    (I === "undefined" || I === "boolean") && (d = null);
    var it = !1;
    if (d === null) it = !0;
    else
      switch (I) {
        case "bigint":
        case "string":
        case "number":
          it = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case m:
              it = !0;
              break;
            case R:
              return it = d._init, _(
                it(d._payload),
                D,
                B,
                Y,
                w
              );
          }
      }
    if (it)
      return w = w(d), it = Y === "" ? "." + sl(d, 0) : Y, Zt(w) ? (B = "", it != null && (B = it.replace(Gl, "$&/") + "/"), _(w, D, B, "", function(Xl) {
        return Xl;
      })) : w != null && (At(w) && (w = X(
        w,
        B + (w.key == null || d && d.key === w.key ? "" : ("" + w.key).replace(
          Gl,
          "$&/"
        ) + "/") + it
      )), D.push(w)), 1;
    it = 0;
    var wt = Y === "" ? "." : Y + ":";
    if (Zt(d))
      for (var xt = 0; xt < d.length; xt++)
        Y = d[xt], I = wt + sl(Y, xt), it += _(
          Y,
          D,
          B,
          I,
          w
        );
    else if (xt = ut(d), typeof xt == "function")
      for (d = xt.call(d), xt = 0; !(Y = d.next()).done; )
        Y = Y.value, I = wt + sl(Y, xt++), it += _(
          Y,
          D,
          B,
          I,
          w
        );
    else if (I === "object") {
      if (typeof d.then == "function")
        return _(
          ol(d),
          D,
          B,
          Y,
          w
        );
      throw D = String(d), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return it;
  }
  function H(d, D, B) {
    if (d == null) return d;
    var Y = [], w = 0;
    return _(d, Y, "", "", function(I) {
      return D.call(B, I, w++);
    }), Y;
  }
  function J(d) {
    if (d._status === -1) {
      var D = d._result;
      D = D(), D.then(
        function(B) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = B);
        },
        function(B) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = B);
        }
      ), d._status === -1 && (d._status = 0, d._result = D);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var mt = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var D = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(D)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, yt = {
    map: H,
    forEach: function(d, D, B) {
      H(
        d,
        function() {
          D.apply(this, arguments);
        },
        B
      );
    },
    count: function(d) {
      var D = 0;
      return H(d, function() {
        D++;
      }), D;
    },
    toArray: function(d) {
      return H(d, function(D) {
        return D;
      }) || [];
    },
    only: function(d) {
      if (!At(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return k.Activity = j, k.Children = yt, k.Component = lt, k.Fragment = p, k.Profiler = N, k.PureComponent = ht, k.StrictMode = s, k.Suspense = A, k.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, k.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return Q.H.useMemoCache(d);
    }
  }, k.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, k.cacheSignal = function() {
    return null;
  }, k.cloneElement = function(d, D, B) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Y = V({}, d.props), w = d.key;
    if (D != null)
      for (I in D.key !== void 0 && (w = "" + D.key), D)
        !Mt.call(D, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && D.ref === void 0 || (Y[I] = D[I]);
    var I = arguments.length - 2;
    if (I === 1) Y.children = B;
    else if (1 < I) {
      for (var it = Array(I), wt = 0; wt < I; wt++)
        it[wt] = arguments[wt + 2];
      Y.children = it;
    }
    return Ct(d.type, w, Y);
  }, k.createContext = function(d) {
    return d = {
      $$typeof: z,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: x,
      _context: d
    }, d;
  }, k.createElement = function(d, D, B) {
    var Y, w = {}, I = null;
    if (D != null)
      for (Y in D.key !== void 0 && (I = "" + D.key), D)
        Mt.call(D, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (w[Y] = D[Y]);
    var it = arguments.length - 2;
    if (it === 1) w.children = B;
    else if (1 < it) {
      for (var wt = Array(it), xt = 0; xt < it; xt++)
        wt[xt] = arguments[xt + 2];
      w.children = wt;
    }
    if (d && d.defaultProps)
      for (Y in it = d.defaultProps, it)
        w[Y] === void 0 && (w[Y] = it[Y]);
    return Ct(d, I, w);
  }, k.createRef = function() {
    return { current: null };
  }, k.forwardRef = function(d) {
    return { $$typeof: C, render: d };
  }, k.isValidElement = At, k.lazy = function(d) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: d },
      _init: J
    };
  }, k.memo = function(d, D) {
    return {
      $$typeof: y,
      type: d,
      compare: D === void 0 ? null : D
    };
  }, k.startTransition = function(d) {
    var D = Q.T, B = {};
    Q.T = B;
    try {
      var Y = d(), w = Q.S;
      w !== null && w(B, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(jt, mt);
    } catch (I) {
      mt(I);
    } finally {
      D !== null && B.types !== null && (D.types = B.types), Q.T = D;
    }
  }, k.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, k.use = function(d) {
    return Q.H.use(d);
  }, k.useActionState = function(d, D, B) {
    return Q.H.useActionState(d, D, B);
  }, k.useCallback = function(d, D) {
    return Q.H.useCallback(d, D);
  }, k.useContext = function(d) {
    return Q.H.useContext(d);
  }, k.useDebugValue = function() {
  }, k.useDeferredValue = function(d, D) {
    return Q.H.useDeferredValue(d, D);
  }, k.useEffect = function(d, D) {
    return Q.H.useEffect(d, D);
  }, k.useEffectEvent = function(d) {
    return Q.H.useEffectEvent(d);
  }, k.useId = function() {
    return Q.H.useId();
  }, k.useImperativeHandle = function(d, D, B) {
    return Q.H.useImperativeHandle(d, D, B);
  }, k.useInsertionEffect = function(d, D) {
    return Q.H.useInsertionEffect(d, D);
  }, k.useLayoutEffect = function(d, D) {
    return Q.H.useLayoutEffect(d, D);
  }, k.useMemo = function(d, D) {
    return Q.H.useMemo(d, D);
  }, k.useOptimistic = function(d, D) {
    return Q.H.useOptimistic(d, D);
  }, k.useReducer = function(d, D, B) {
    return Q.H.useReducer(d, D, B);
  }, k.useRef = function(d) {
    return Q.H.useRef(d);
  }, k.useState = function(d) {
    return Q.H.useState(d);
  }, k.useSyncExternalStore = function(d, D, B) {
    return Q.H.useSyncExternalStore(
      d,
      D,
      B
    );
  }, k.useTransition = function() {
    return Q.H.useTransition();
  }, k.version = "19.2.7", k;
}
var zd;
function bf() {
  return zd || (zd = 1, df.exports = Dy()), df.exports;
}
var W = bf();
const Ny = /* @__PURE__ */ zy(W);
var hf = { exports: {} }, jn = {}, mf = { exports: {} }, yf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Od;
function xy() {
  return Od || (Od = 1, (function(f) {
    function m(_, H) {
      var J = _.length;
      _.push(H);
      t: for (; 0 < J; ) {
        var mt = J - 1 >>> 1, yt = _[mt];
        if (0 < N(yt, H))
          _[mt] = H, _[J] = yt, J = mt;
        else break t;
      }
    }
    function p(_) {
      return _.length === 0 ? null : _[0];
    }
    function s(_) {
      if (_.length === 0) return null;
      var H = _[0], J = _.pop();
      if (J !== H) {
        _[0] = J;
        t: for (var mt = 0, yt = _.length, d = yt >>> 1; mt < d; ) {
          var D = 2 * (mt + 1) - 1, B = _[D], Y = D + 1, w = _[Y];
          if (0 > N(B, J))
            Y < yt && 0 > N(w, B) ? (_[mt] = w, _[Y] = J, mt = Y) : (_[mt] = B, _[D] = J, mt = D);
          else if (Y < yt && 0 > N(w, J))
            _[mt] = w, _[Y] = J, mt = Y;
          else break t;
        }
      }
      return H;
    }
    function N(_, H) {
      var J = _.sortIndex - H.sortIndex;
      return J !== 0 ? J : _.id - H.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var x = performance;
      f.unstable_now = function() {
        return x.now();
      };
    } else {
      var z = Date, C = z.now();
      f.unstable_now = function() {
        return z.now() - C;
      };
    }
    var A = [], y = [], R = 1, j = null, L = 3, ut = !1, ot = !1, V = !1, rt = !1, lt = typeof setTimeout == "function" ? setTimeout : null, Jt = typeof clearTimeout == "function" ? clearTimeout : null, ht = typeof setImmediate < "u" ? setImmediate : null;
    function Nt(_) {
      for (var H = p(y); H !== null; ) {
        if (H.callback === null) s(y);
        else if (H.startTime <= _)
          s(y), H.sortIndex = H.expirationTime, m(A, H);
        else break;
        H = p(y);
      }
    }
    function Zt(_) {
      if (V = !1, Nt(_), !ot)
        if (p(A) !== null)
          ot = !0, jt || (jt = !0, Tt());
        else {
          var H = p(y);
          H !== null && ol(Zt, H.startTime - _);
        }
    }
    var jt = !1, Q = -1, Mt = 5, Ct = -1;
    function X() {
      return rt ? !0 : !(f.unstable_now() - Ct < Mt);
    }
    function At() {
      if (rt = !1, jt) {
        var _ = f.unstable_now();
        Ct = _;
        var H = !0;
        try {
          t: {
            ot = !1, V && (V = !1, Jt(Q), Q = -1), ut = !0;
            var J = L;
            try {
              l: {
                for (Nt(_), j = p(A); j !== null && !(j.expirationTime > _ && X()); ) {
                  var mt = j.callback;
                  if (typeof mt == "function") {
                    j.callback = null, L = j.priorityLevel;
                    var yt = mt(
                      j.expirationTime <= _
                    );
                    if (_ = f.unstable_now(), typeof yt == "function") {
                      j.callback = yt, Nt(_), H = !0;
                      break l;
                    }
                    j === p(A) && s(A), Nt(_);
                  } else s(A);
                  j = p(A);
                }
                if (j !== null) H = !0;
                else {
                  var d = p(y);
                  d !== null && ol(
                    Zt,
                    d.startTime - _
                  ), H = !1;
                }
              }
              break t;
            } finally {
              j = null, L = J, ut = !1;
            }
            H = void 0;
          }
        } finally {
          H ? Tt() : jt = !1;
        }
      }
    }
    var Tt;
    if (typeof ht == "function")
      Tt = function() {
        ht(At);
      };
    else if (typeof MessageChannel < "u") {
      var Gl = new MessageChannel(), sl = Gl.port2;
      Gl.port1.onmessage = At, Tt = function() {
        sl.postMessage(null);
      };
    } else
      Tt = function() {
        lt(At, 0);
      };
    function ol(_, H) {
      Q = lt(function() {
        _(f.unstable_now());
      }, H);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(_) {
      _.callback = null;
    }, f.unstable_forceFrameRate = function(_) {
      0 > _ || 125 < _ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Mt = 0 < _ ? Math.floor(1e3 / _) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return L;
    }, f.unstable_next = function(_) {
      switch (L) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = L;
      }
      var J = L;
      L = H;
      try {
        return _();
      } finally {
        L = J;
      }
    }, f.unstable_requestPaint = function() {
      rt = !0;
    }, f.unstable_runWithPriority = function(_, H) {
      switch (_) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          _ = 3;
      }
      var J = L;
      L = _;
      try {
        return H();
      } finally {
        L = J;
      }
    }, f.unstable_scheduleCallback = function(_, H, J) {
      var mt = f.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? mt + J : mt) : J = mt, _) {
        case 1:
          var yt = -1;
          break;
        case 2:
          yt = 250;
          break;
        case 5:
          yt = 1073741823;
          break;
        case 4:
          yt = 1e4;
          break;
        default:
          yt = 5e3;
      }
      return yt = J + yt, _ = {
        id: R++,
        callback: H,
        priorityLevel: _,
        startTime: J,
        expirationTime: yt,
        sortIndex: -1
      }, J > mt ? (_.sortIndex = J, m(y, _), p(A) === null && _ === p(y) && (V ? (Jt(Q), Q = -1) : V = !0, ol(Zt, J - mt))) : (_.sortIndex = yt, m(A, _), ot || ut || (ot = !0, jt || (jt = !0, Tt()))), _;
    }, f.unstable_shouldYield = X, f.unstable_wrapCallback = function(_) {
      var H = L;
      return function() {
        var J = L;
        L = H;
        try {
          return _.apply(this, arguments);
        } finally {
          L = J;
        }
      };
    };
  })(yf)), yf;
}
var Md;
function jy() {
  return Md || (Md = 1, mf.exports = xy()), mf.exports;
}
var vf = { exports: {} }, Pt = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dd;
function Cy() {
  if (Dd) return Pt;
  Dd = 1;
  var f = bf();
  function m(A) {
    var y = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        y += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + A + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function p() {
  }
  var s = {
    d: {
      f: p,
      r: function() {
        throw Error(m(522));
      },
      D: p,
      C: p,
      L: p,
      m: p,
      X: p,
      S: p,
      M: p
    },
    p: 0,
    findDOMNode: null
  }, N = Symbol.for("react.portal");
  function x(A, y, R) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: N,
      key: j == null ? null : "" + j,
      children: A,
      containerInfo: y,
      implementation: R
    };
  }
  var z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function C(A, y) {
    if (A === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Pt.createPortal = function(A, y) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(m(299));
    return x(A, y, null, R);
  }, Pt.flushSync = function(A) {
    var y = z.T, R = s.p;
    try {
      if (z.T = null, s.p = 2, A) return A();
    } finally {
      z.T = y, s.p = R, s.d.f();
    }
  }, Pt.preconnect = function(A, y) {
    typeof A == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, s.d.C(A, y));
  }, Pt.prefetchDNS = function(A) {
    typeof A == "string" && s.d.D(A);
  }, Pt.preinit = function(A, y) {
    if (typeof A == "string" && y && typeof y.as == "string") {
      var R = y.as, j = C(R, y.crossOrigin), L = typeof y.integrity == "string" ? y.integrity : void 0, ut = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      R === "style" ? s.d.S(
        A,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: j,
          integrity: L,
          fetchPriority: ut
        }
      ) : R === "script" && s.d.X(A, {
        crossOrigin: j,
        integrity: L,
        fetchPriority: ut,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, Pt.preinitModule = function(A, y) {
    if (typeof A == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var R = C(
            y.as,
            y.crossOrigin
          );
          s.d.M(A, {
            crossOrigin: R,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && s.d.M(A);
  }, Pt.preload = function(A, y) {
    if (typeof A == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var R = y.as, j = C(R, y.crossOrigin);
      s.d.L(A, R, {
        crossOrigin: j,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, Pt.preloadModule = function(A, y) {
    if (typeof A == "string")
      if (y) {
        var R = C(y.as, y.crossOrigin);
        s.d.m(A, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: R,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else s.d.m(A);
  }, Pt.requestFormReset = function(A) {
    s.d.r(A);
  }, Pt.unstable_batchedUpdates = function(A, y) {
    return A(y);
  }, Pt.useFormState = function(A, y, R) {
    return z.H.useFormState(A, y, R);
  }, Pt.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, Pt.version = "19.2.7", Pt;
}
var Nd;
function Uy() {
  if (Nd) return vf.exports;
  Nd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
  }
  return f(), vf.exports = Cy(), vf.exports;
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
var xd;
function Ry() {
  if (xd) return jn;
  xd = 1;
  var f = jy(), m = bf(), p = Uy();
  function s(t) {
    var l = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        l += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + t + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function N(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function x(t) {
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
  function z(t) {
    if (t.tag === 13) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function A(t) {
    if (x(t) !== t)
      throw Error(s(188));
  }
  function y(t) {
    var l = t.alternate;
    if (!l) {
      if (l = x(t), l === null) throw Error(s(188));
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
          if (u === e) return A(n), t;
          if (u === a) return A(n), l;
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
  function R(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = R(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var j = Object.assign, L = Symbol.for("react.element"), ut = Symbol.for("react.transitional.element"), ot = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), rt = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), Jt = Symbol.for("react.consumer"), ht = Symbol.for("react.context"), Nt = Symbol.for("react.forward_ref"), Zt = Symbol.for("react.suspense"), jt = Symbol.for("react.suspense_list"), Q = Symbol.for("react.memo"), Mt = Symbol.for("react.lazy"), Ct = Symbol.for("react.activity"), X = Symbol.for("react.memo_cache_sentinel"), At = Symbol.iterator;
  function Tt(t) {
    return t === null || typeof t != "object" ? null : (t = At && t[At] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Gl = Symbol.for("react.client.reference");
  function sl(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Gl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case V:
        return "Fragment";
      case lt:
        return "Profiler";
      case rt:
        return "StrictMode";
      case Zt:
        return "Suspense";
      case jt:
        return "SuspenseList";
      case Ct:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ot:
          return "Portal";
        case ht:
          return t.displayName || "Context";
        case Jt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Nt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case Q:
          return l = t.displayName || null, l !== null ? l : sl(t.type) || "Memo";
        case Mt:
          l = t._payload, t = t._init;
          try {
            return sl(t(l));
          } catch {
          }
      }
    return null;
  }
  var ol = Array.isArray, _ = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = p.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, mt = [], yt = -1;
  function d(t) {
    return { current: t };
  }
  function D(t) {
    0 > yt || (t.current = mt[yt], mt[yt] = null, yt--);
  }
  function B(t, l) {
    yt++, mt[yt] = t.current, t.current = l;
  }
  var Y = d(null), w = d(null), I = d(null), it = d(null);
  function wt(t, l) {
    switch (B(I, l), B(w, t), B(Y, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Kr(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Kr(l), t = Jr(l, t);
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
    D(Y), B(Y, t);
  }
  function xt() {
    D(Y), D(w), D(I);
  }
  function Xl(t) {
    t.memoizedState !== null && B(it, t);
    var l = Y.current, e = Jr(l, t.type);
    l !== e && (B(w, t), B(Y, e));
  }
  function Ue(t) {
    w.current === t && (D(Y), D(w)), it.current === t && (D(it), On._currentValue = J);
  }
  var Ie, U;
  function ct(t) {
    if (Ie === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        Ie = l && l[1] || "", U = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ie + t + U;
  }
  var qt = !1;
  function ce(t, l) {
    if (!t || qt) return "";
    qt = !0;
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
                } catch (T) {
                  var S = T;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (T) {
                  S = T;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (T) {
                S = T;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (T) {
            if (T && S && typeof T.stack == "string")
              return [T.stack, S.stack];
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
        var o = i.split(`
`), g = c.split(`
`);
        for (n = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < g.length && !g[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === o.length || n === g.length)
          for (a = o.length - 1, n = g.length - 1; 1 <= a && 0 <= n && o[a] !== g[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (o[a] !== g[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || o[a] !== g[n]) {
                  var E = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && E.includes("<anonymous>") && (E = E.replace("<anonymous>", t.displayName)), E;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      qt = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? ct(e) : "";
  }
  function _t(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ct(t.type);
      case 16:
        return ct("Lazy");
      case 13:
        return t.child !== l && l !== null ? ct("Suspense Fallback") : ct("Suspense");
      case 19:
        return ct("SuspenseList");
      case 0:
      case 15:
        return ce(t.type, !1);
      case 11:
        return ce(t.type.render, !1);
      case 1:
        return ce(t.type, !0);
      case 31:
        return ct("Activity");
      default:
        return "";
    }
  }
  function Ll(t) {
    try {
      var l = "", e = null;
      do
        l += _t(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var ll = Object.prototype.hasOwnProperty, Rl = f.unstable_scheduleCallback, Ql = f.unstable_cancelCallback, ah = f.unstable_shouldYield, nh = f.unstable_requestPaint, rl = f.unstable_now, uh = f.unstable_getCurrentPriorityLevel, Ef = f.unstable_ImmediatePriority, _f = f.unstable_UserBlockingPriority, Rn = f.unstable_NormalPriority, ih = f.unstable_LowPriority, Af = f.unstable_IdlePriority, ch = f.log, fh = f.unstable_setDisableYieldValue, qa = null, dl = null;
  function fe(t) {
    if (typeof ch == "function" && fh(t), dl && typeof dl.setStrictMode == "function")
      try {
        dl.setStrictMode(qa, t);
      } catch {
      }
  }
  var hl = Math.clz32 ? Math.clz32 : rh, sh = Math.log, oh = Math.LN2;
  function rh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (sh(t) / oh | 0) | 0;
  }
  var Hn = 256, Bn = 262144, qn = 4194304;
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
  function Yn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~u, a !== 0 ? n = Re(a) : (i &= c, i !== 0 ? n = Re(i) : e || (e = c & ~t, e !== 0 && (n = Re(e))))) : (c = a & ~u, c !== 0 ? n = Re(c) : i !== 0 ? n = Re(i) : e || (e = a & ~t, e !== 0 && (n = Re(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function Ya(t, l) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & l) === 0;
  }
  function dh(t, l) {
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
  function zf() {
    var t = qn;
    return qn <<= 1, (qn & 62914560) === 0 && (qn = 4194304), t;
  }
  function Iu(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function Ga(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function hh(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, o = t.expirationTimes, g = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var E = 31 - hl(e), M = 1 << E;
      c[E] = 0, o[E] = -1;
      var S = g[E];
      if (S !== null)
        for (g[E] = null, E = 0; E < S.length; E++) {
          var T = S[E];
          T !== null && (T.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && Of(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function Of(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - hl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Mf(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - hl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Df(t, l) {
    var e = l & -l;
    return e = (e & 42) !== 0 ? 1 : Pu(e), (e & (t.suspendedLanes | l)) !== 0 ? 0 : e;
  }
  function Pu(t) {
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
  function ti(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Nf() {
    var t = H.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : yd(t.type));
  }
  function xf(t, l) {
    var e = H.p;
    try {
      return H.p = t, l();
    } finally {
      H.p = e;
    }
  }
  var se = Math.random().toString(36).slice(2), kt = "__reactFiber$" + se, el = "__reactProps$" + se, Pe = "__reactContainer$" + se, li = "__reactEvents$" + se, mh = "__reactListeners$" + se, yh = "__reactHandles$" + se, jf = "__reactResources$" + se, Xa = "__reactMarker$" + se;
  function ei(t) {
    delete t[kt], delete t[el], delete t[li], delete t[mh], delete t[yh];
  }
  function ta(t) {
    var l = t[kt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Pe] || e[kt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Pr(t); t !== null; ) {
            if (e = t[kt]) return e;
            t = Pr(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function la(t) {
    if (t = t[kt] || t[Pe]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function La(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ea(t) {
    var l = t[jf];
    return l || (l = t[jf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Vt(t) {
    t[Xa] = !0;
  }
  var Cf = /* @__PURE__ */ new Set(), Uf = {};
  function He(t, l) {
    aa(t, l), aa(t + "Capture", l);
  }
  function aa(t, l) {
    for (Uf[t] = l, t = 0; t < l.length; t++)
      Cf.add(l[t]);
  }
  var vh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Rf = {}, Hf = {};
  function gh(t) {
    return ll.call(Hf, t) ? !0 : ll.call(Rf, t) ? !1 : vh.test(t) ? Hf[t] = !0 : (Rf[t] = !0, !1);
  }
  function Gn(t, l, e) {
    if (gh(l))
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
  function Xn(t, l, e) {
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
  function Tl(t) {
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
  function Bf(t) {
    var l = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (l === "checkbox" || l === "radio");
  }
  function ph(t, l, e) {
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
  function ai(t) {
    if (!t._valueTracker) {
      var l = Bf(t) ? "checked" : "value";
      t._valueTracker = ph(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function qf(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Bf(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Ln(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Sh = /[\n"\\]/g;
  function El(t) {
    return t.replace(
      Sh,
      function(l) {
        return "\\" + l.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function ni(t, l, e, a, n, u, i, c) {
    t.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? t.type = i : t.removeAttribute("type"), l != null ? i === "number" ? (l === 0 && t.value === "" || t.value != l) && (t.value = "" + Tl(l)) : t.value !== "" + Tl(l) && (t.value = "" + Tl(l)) : i !== "submit" && i !== "reset" || t.removeAttribute("value"), l != null ? ui(t, i, Tl(l)) : e != null ? ui(t, i, Tl(e)) : a != null && t.removeAttribute("value"), n == null && u != null && (t.defaultChecked = !!u), n != null && (t.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? t.name = "" + Tl(c) : t.removeAttribute("name");
  }
  function Yf(t, l, e, a, n, u, i, c) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), l != null || e != null) {
      if (!(u !== "submit" && u !== "reset" || l != null)) {
        ai(t);
        return;
      }
      e = e != null ? "" + Tl(e) : "", l = l != null ? "" + Tl(l) : e, c || l === t.value || (t.value = l), t.defaultValue = l;
    }
    a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, t.checked = c ? t.checked : !!a, t.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (t.name = i), ai(t);
  }
  function ui(t, l, e) {
    l === "number" && Ln(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function na(t, l, e, a) {
    if (t = t.options, l) {
      l = {};
      for (var n = 0; n < e.length; n++)
        l["$" + e[n]] = !0;
      for (e = 0; e < t.length; e++)
        n = l.hasOwnProperty("$" + t[e].value), t[e].selected !== n && (t[e].selected = n), n && a && (t[e].defaultSelected = !0);
    } else {
      for (e = "" + Tl(e), l = null, n = 0; n < t.length; n++) {
        if (t[n].value === e) {
          t[n].selected = !0, a && (t[n].defaultSelected = !0);
          return;
        }
        l !== null || t[n].disabled || (l = t[n]);
      }
      l !== null && (l.selected = !0);
    }
  }
  function Gf(t, l, e) {
    if (l != null && (l = "" + Tl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Tl(e) : "";
  }
  function Xf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (ol(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Tl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), ai(t);
  }
  function ua(t, l) {
    if (l) {
      var e = t.firstChild;
      if (e && e === t.lastChild && e.nodeType === 3) {
        e.nodeValue = l;
        return;
      }
    }
    t.textContent = l;
  }
  var bh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Lf(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || bh.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Qf(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Lf(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Lf(t, u, l[u]);
  }
  function ii(t) {
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
  var Th = /* @__PURE__ */ new Map([
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
  ]), Eh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Qn(t) {
    return Eh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Vl() {
  }
  var ci = null;
  function fi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var ia = null, ca = null;
  function Zf(t) {
    var l = la(t);
    if (l && (t = l.stateNode)) {
      var e = t[el] || null;
      t: switch (t = l.stateNode, l.type) {
        case "input":
          if (ni(
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
              'input[name="' + El(
                "" + l
              ) + '"][type="radio"]'
            ), l = 0; l < e.length; l++) {
              var a = e[l];
              if (a !== t && a.form === t.form) {
                var n = a[el] || null;
                if (!n) throw Error(s(90));
                ni(
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
              a = e[l], a.form === t.form && qf(a);
          }
          break t;
        case "textarea":
          Gf(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && na(t, !!e.multiple, l, !1);
      }
    }
  }
  var si = !1;
  function Vf(t, l, e) {
    if (si) return t(l, e);
    si = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (si = !1, (ia !== null || ca !== null) && (Nu(), ia && (l = ia, t = ca, ca = ia = null, Zf(l), t)))
        for (l = 0; l < t.length; l++) Zf(t[l]);
    }
  }
  function Qa(t, l) {
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
  var Kl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), oi = !1;
  if (Kl)
    try {
      var Za = {};
      Object.defineProperty(Za, "passive", {
        get: function() {
          oi = !0;
        }
      }), window.addEventListener("test", Za, Za), window.removeEventListener("test", Za, Za);
    } catch {
      oi = !1;
    }
  var oe = null, ri = null, Zn = null;
  function Kf() {
    if (Zn) return Zn;
    var t, l = ri, e = l.length, a, n = "value" in oe ? oe.value : oe.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return Zn = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Vn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Kn() {
    return !0;
  }
  function Jf() {
    return !1;
  }
  function al(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(u) : u[c]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Kn : Jf, this.isPropagationStopped = Jf, this;
    }
    return j(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Kn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Kn);
      },
      persist: function() {
      },
      isPersistent: Kn
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
  }, Jn = al(Be), Va = j({}, Be, { view: 0, detail: 0 }), _h = al(Va), di, hi, Ka, wn = j({}, Va, {
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
    getModifierState: yi,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Ka && (Ka && t.type === "mousemove" ? (di = t.screenX - Ka.screenX, hi = t.screenY - Ka.screenY) : hi = di = 0, Ka = t), di);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : hi;
    }
  }), wf = al(wn), Ah = j({}, wn, { dataTransfer: 0 }), zh = al(Ah), Oh = j({}, Va, { relatedTarget: 0 }), mi = al(Oh), Mh = j({}, Be, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Dh = al(Mh), Nh = j({}, Be, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), xh = al(Nh), jh = j({}, Be, { data: 0 }), kf = al(jh), Ch = {
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
  }, Uh = {
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
  }, Rh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Hh(t) {
    var l = this.nativeEvent;
    return l.getModifierState ? l.getModifierState(t) : (t = Rh[t]) ? !!l[t] : !1;
  }
  function yi() {
    return Hh;
  }
  var Bh = j({}, Va, {
    key: function(t) {
      if (t.key) {
        var l = Ch[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Vn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Uh[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: yi,
    charCode: function(t) {
      return t.type === "keypress" ? Vn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Vn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), qh = al(Bh), Yh = j({}, wn, {
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
  }), $f = al(Yh), Gh = j({}, Va, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: yi
  }), Xh = al(Gh), Lh = j({}, Be, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qh = al(Lh), Zh = j({}, wn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Vh = al(Zh), Kh = j({}, Be, {
    newState: 0,
    oldState: 0
  }), Jh = al(Kh), wh = [9, 13, 27, 32], vi = Kl && "CompositionEvent" in window, Ja = null;
  Kl && "documentMode" in document && (Ja = document.documentMode);
  var kh = Kl && "TextEvent" in window && !Ja, Wf = Kl && (!vi || Ja && 8 < Ja && 11 >= Ja), Ff = " ", If = !1;
  function Pf(t, l) {
    switch (t) {
      case "keyup":
        return wh.indexOf(l.keyCode) !== -1;
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
  function ts(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var fa = !1;
  function $h(t, l) {
    switch (t) {
      case "compositionend":
        return ts(l);
      case "keypress":
        return l.which !== 32 ? null : (If = !0, Ff);
      case "textInput":
        return t = l.data, t === Ff && If ? null : t;
      default:
        return null;
    }
  }
  function Wh(t, l) {
    if (fa)
      return t === "compositionend" || !vi && Pf(t, l) ? (t = Kf(), Zn = ri = oe = null, fa = !1, t) : null;
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
        return Wf && l.locale !== "ko" ? null : l.data;
      default:
        return null;
    }
  }
  var Fh = {
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
  function ls(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Fh[t.type] : l === "textarea";
  }
  function es(t, l, e, a) {
    ia ? ca ? ca.push(a) : ca = [a] : ia = a, l = Bu(l, "onChange"), 0 < l.length && (e = new Jn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var wa = null, ka = null;
  function Ih(t) {
    Gr(t, 0);
  }
  function kn(t) {
    var l = La(t);
    if (qf(l)) return t;
  }
  function as(t, l) {
    if (t === "change") return l;
  }
  var ns = !1;
  if (Kl) {
    var gi;
    if (Kl) {
      var pi = "oninput" in document;
      if (!pi) {
        var us = document.createElement("div");
        us.setAttribute("oninput", "return;"), pi = typeof us.oninput == "function";
      }
      gi = pi;
    } else gi = !1;
    ns = gi && (!document.documentMode || 9 < document.documentMode);
  }
  function is() {
    wa && (wa.detachEvent("onpropertychange", cs), ka = wa = null);
  }
  function cs(t) {
    if (t.propertyName === "value" && kn(ka)) {
      var l = [];
      es(
        l,
        ka,
        t,
        fi(t)
      ), Vf(Ih, l);
    }
  }
  function Ph(t, l, e) {
    t === "focusin" ? (is(), wa = l, ka = e, wa.attachEvent("onpropertychange", cs)) : t === "focusout" && is();
  }
  function tm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return kn(ka);
  }
  function lm(t, l) {
    if (t === "click") return kn(l);
  }
  function em(t, l) {
    if (t === "input" || t === "change")
      return kn(l);
  }
  function am(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var ml = typeof Object.is == "function" ? Object.is : am;
  function $a(t, l) {
    if (ml(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!ll.call(l, n) || !ml(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function fs(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ss(t, l) {
    var e = fs(t);
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
      e = fs(e);
    }
  }
  function os(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? os(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function rs(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Ln(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Ln(t.document);
    }
    return l;
  }
  function Si(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var nm = Kl && "documentMode" in document && 11 >= document.documentMode, sa = null, bi = null, Wa = null, Ti = !1;
  function ds(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ti || sa == null || sa !== Ln(a) || (a = sa, "selectionStart" in a && Si(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Wa && $a(Wa, a) || (Wa = a, a = Bu(bi, "onSelect"), 0 < a.length && (l = new Jn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = sa)));
  }
  function qe(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var oa = {
    animationend: qe("Animation", "AnimationEnd"),
    animationiteration: qe("Animation", "AnimationIteration"),
    animationstart: qe("Animation", "AnimationStart"),
    transitionrun: qe("Transition", "TransitionRun"),
    transitionstart: qe("Transition", "TransitionStart"),
    transitioncancel: qe("Transition", "TransitionCancel"),
    transitionend: qe("Transition", "TransitionEnd")
  }, Ei = {}, hs = {};
  Kl && (hs = document.createElement("div").style, "AnimationEvent" in window || (delete oa.animationend.animation, delete oa.animationiteration.animation, delete oa.animationstart.animation), "TransitionEvent" in window || delete oa.transitionend.transition);
  function Ye(t) {
    if (Ei[t]) return Ei[t];
    if (!oa[t]) return t;
    var l = oa[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in hs)
        return Ei[t] = l[e];
    return t;
  }
  var ms = Ye("animationend"), ys = Ye("animationiteration"), vs = Ye("animationstart"), um = Ye("transitionrun"), im = Ye("transitionstart"), cm = Ye("transitioncancel"), gs = Ye("transitionend"), ps = /* @__PURE__ */ new Map(), _i = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  _i.push("scrollEnd");
  function jl(t, l) {
    ps.set(t, l), He(l, [t]);
  }
  var $n = typeof reportError == "function" ? reportError : function(t) {
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
  }, _l = [], ra = 0, Ai = 0;
  function Wn() {
    for (var t = ra, l = Ai = ra = 0; l < t; ) {
      var e = _l[l];
      _l[l++] = null;
      var a = _l[l];
      _l[l++] = null;
      var n = _l[l];
      _l[l++] = null;
      var u = _l[l];
      if (_l[l++] = null, a !== null && n !== null) {
        var i = a.pending;
        i === null ? n.next = n : (n.next = i.next, i.next = n), a.pending = n;
      }
      u !== 0 && Ss(e, n, u);
    }
  }
  function Fn(t, l, e, a) {
    _l[ra++] = t, _l[ra++] = l, _l[ra++] = e, _l[ra++] = a, Ai |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function zi(t, l, e, a) {
    return Fn(t, l, e, a), In(t);
  }
  function Ge(t, l) {
    return Fn(t, null, null, l), In(t);
  }
  function Ss(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - hl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function In(t) {
    if (50 < Sn)
      throw Sn = 0, Rc = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var da = {};
  function fm(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function yl(t, l, e, a) {
    return new fm(t, l, e, a);
  }
  function Oi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Jl(t, l) {
    var e = t.alternate;
    return e === null ? (e = yl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function bs(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Pn(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") Oi(t) && (i = 1);
    else if (typeof t == "string")
      i = hy(
        t,
        e,
        Y.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Ct:
          return t = yl(31, e, l, n), t.elementType = Ct, t.lanes = u, t;
        case V:
          return Xe(e.children, n, u, l);
        case rt:
          i = 8, n |= 24;
          break;
        case lt:
          return t = yl(12, e, l, n | 2), t.elementType = lt, t.lanes = u, t;
        case Zt:
          return t = yl(13, e, l, n), t.elementType = Zt, t.lanes = u, t;
        case jt:
          return t = yl(19, e, l, n), t.elementType = jt, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case ht:
                i = 10;
                break t;
              case Jt:
                i = 9;
                break t;
              case Nt:
                i = 11;
                break t;
              case Q:
                i = 14;
                break t;
              case Mt:
                i = 16, a = null;
                break t;
            }
          i = 29, e = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), a = null;
      }
    return l = yl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Xe(t, l, e, a) {
    return t = yl(7, t, a, l), t.lanes = e, t;
  }
  function Mi(t, l, e) {
    return t = yl(6, t, null, l), t.lanes = e, t;
  }
  function Ts(t) {
    var l = yl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Di(t, l, e) {
    return l = yl(
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
  var Es = /* @__PURE__ */ new WeakMap();
  function Al(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = Es.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ll(l)
      }, Es.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ll(l)
    };
  }
  var ha = [], ma = 0, tu = null, Fa = 0, zl = [], Ol = 0, re = null, Hl = 1, Bl = "";
  function wl(t, l) {
    ha[ma++] = Fa, ha[ma++] = tu, tu = t, Fa = l;
  }
  function _s(t, l, e) {
    zl[Ol++] = Hl, zl[Ol++] = Bl, zl[Ol++] = re, re = t;
    var a = Hl;
    t = Bl;
    var n = 32 - hl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - hl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, Hl = 1 << 32 - hl(l) + n | e << n | a, Bl = u + t;
    } else
      Hl = 1 << u | e << n | a, Bl = t;
  }
  function Ni(t) {
    t.return !== null && (wl(t, 1), _s(t, 1, 0));
  }
  function xi(t) {
    for (; t === tu; )
      tu = ha[--ma], ha[ma] = null, Fa = ha[--ma], ha[ma] = null;
    for (; t === re; )
      re = zl[--Ol], zl[Ol] = null, Bl = zl[--Ol], zl[Ol] = null, Hl = zl[--Ol], zl[Ol] = null;
  }
  function As(t, l) {
    zl[Ol++] = Hl, zl[Ol++] = Bl, zl[Ol++] = re, Hl = l.id, Bl = l.overflow, re = t;
  }
  var $t = null, zt = null, nt = !1, de = null, Ml = !1, ji = Error(s(519));
  function he(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ia(Al(l, t)), ji;
  }
  function zs(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[kt] = t, l[el] = a, e) {
      case "dialog":
        tt("cancel", l), tt("close", l);
        break;
      case "iframe":
      case "object":
      case "embed":
        tt("load", l);
        break;
      case "video":
      case "audio":
        for (e = 0; e < Tn.length; e++)
          tt(Tn[e], l);
        break;
      case "source":
        tt("error", l);
        break;
      case "img":
      case "image":
      case "link":
        tt("error", l), tt("load", l);
        break;
      case "details":
        tt("toggle", l);
        break;
      case "input":
        tt("invalid", l), Yf(
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
        tt("invalid", l);
        break;
      case "textarea":
        tt("invalid", l), Xf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Zr(l.textContent, e) ? (a.popover != null && (tt("beforetoggle", l), tt("toggle", l)), a.onScroll != null && tt("scroll", l), a.onScrollEnd != null && tt("scrollend", l), a.onClick != null && (l.onclick = Vl), l = !0) : l = !1, l || he(t, !0);
  }
  function Os(t) {
    for ($t = t.return; $t; )
      switch ($t.tag) {
        case 5:
        case 31:
        case 13:
          Ml = !1;
          return;
        case 27:
        case 3:
          Ml = !0;
          return;
        default:
          $t = $t.return;
      }
  }
  function ya(t) {
    if (t !== $t) return !1;
    if (!nt) return Os(t), nt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || $c(t.type, t.memoizedProps)), e = !e), e && zt && he(t), Os(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = Ir(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = Ir(t);
    } else
      l === 27 ? (l = zt, Me(t.type) ? (t = tf, tf = null, zt = t) : zt = l) : zt = $t ? Nl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Le() {
    zt = $t = null, nt = !1;
  }
  function Ci() {
    var t = de;
    return t !== null && (cl === null ? cl = t : cl.push.apply(
      cl,
      t
    ), de = null), t;
  }
  function Ia(t) {
    de === null ? de = [t] : de.push(t);
  }
  var Ui = d(null), Qe = null, kl = null;
  function me(t, l, e) {
    B(Ui, l._currentValue), l._currentValue = e;
  }
  function $l(t) {
    t._currentValue = Ui.current, D(Ui);
  }
  function Ri(t, l, e) {
    for (; t !== null; ) {
      var a = t.alternate;
      if ((t.childLanes & l) !== l ? (t.childLanes |= l, a !== null && (a.childLanes |= l)) : a !== null && (a.childLanes & l) !== l && (a.childLanes |= l), t === e) break;
      t = t.return;
    }
  }
  function Hi(t, l, e, a) {
    var n = t.child;
    for (n !== null && (n.return = t); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var i = n.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var c = u;
          u = n;
          for (var o = 0; o < l.length; o++)
            if (c.context === l[o]) {
              u.lanes |= e, c = u.alternate, c !== null && (c.lanes |= e), Ri(
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
        i.lanes |= e, u = i.alternate, u !== null && (u.lanes |= e), Ri(i, e, t), i = null;
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
  function va(t, l, e, a) {
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
          ml(n.pendingProps.value, i.value) || (t !== null ? t.push(c) : t = [c]);
        }
      } else if (n === it.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(On) : t = [On]);
      }
      n = n.return;
    }
    t !== null && Hi(
      l,
      t,
      e,
      a
    ), l.flags |= 262144;
  }
  function lu(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ml(
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
  function Wt(t) {
    return Ms(Qe, t);
  }
  function eu(t, l) {
    return Qe === null && Ze(t), Ms(t, l);
  }
  function Ms(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, kl === null) {
      if (t === null) throw Error(s(308));
      kl = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else kl = kl.next = l;
    return e;
  }
  var sm = typeof AbortController < "u" ? AbortController : function() {
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
  }, om = f.unstable_scheduleCallback, rm = f.unstable_NormalPriority, Yt = {
    $$typeof: ht,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Bi() {
    return {
      controller: new sm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pa(t) {
    t.refCount--, t.refCount === 0 && om(rm, function() {
      t.controller.abort();
    });
  }
  var tn = null, qi = 0, ga = 0, pa = null;
  function dm(t, l) {
    if (tn === null) {
      var e = tn = [];
      qi = 0, ga = Xc(), pa = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return qi++, l.then(Ds, Ds), l;
  }
  function Ds() {
    if (--qi === 0 && tn !== null) {
      pa !== null && (pa.status = "fulfilled");
      var t = tn;
      tn = null, ga = 0, pa = null;
      for (var l = 0; l < t.length; l++) (0, t[l])();
    }
  }
  function hm(t, l) {
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
  var Ns = _.S;
  _.S = function(t, l) {
    hr = rl(), typeof l == "object" && l !== null && typeof l.then == "function" && dm(t, l), Ns !== null && Ns(t, l);
  };
  var Ve = d(null);
  function Yi() {
    var t = Ve.current;
    return t !== null ? t : Et.pooledCache;
  }
  function au(t, l) {
    l === null ? B(Ve, Ve.current) : B(Ve, l.pool);
  }
  function xs() {
    var t = Yi();
    return t === null ? null : { parent: Yt._currentValue, pool: t };
  }
  var Sa = Error(s(460)), Gi = Error(s(474)), nu = Error(s(542)), uu = { then: function() {
  } };
  function js(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Cs(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Vl, Vl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Rs(t), t;
      default:
        if (typeof l.status == "string") l.then(Vl, Vl);
        else {
          if (t = Et, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = l.reason, Rs(t), t;
        }
        throw Je = l, Sa;
    }
  }
  function Ke(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Je = e, Sa) : e;
    }
  }
  var Je = null;
  function Us() {
    if (Je === null) throw Error(s(459));
    var t = Je;
    return Je = null, t;
  }
  function Rs(t) {
    if (t === Sa || t === nu)
      throw Error(s(483));
  }
  var ba = null, ln = 0;
  function iu(t) {
    var l = ln;
    return ln += 1, ba === null && (ba = []), Cs(ba, t, l);
  }
  function en(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function cu(t, l) {
    throw l.$$typeof === L ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Hs(t) {
    function l(h, r) {
      if (t) {
        var v = h.deletions;
        v === null ? (h.deletions = [r], h.flags |= 16) : v.push(r);
      }
    }
    function e(h, r) {
      if (!t) return null;
      for (; r !== null; )
        l(h, r), r = r.sibling;
      return null;
    }
    function a(h) {
      for (var r = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? r.set(h.key, h) : r.set(h.index, h), h = h.sibling;
      return r;
    }
    function n(h, r) {
      return h = Jl(h, r), h.index = 0, h.sibling = null, h;
    }
    function u(h, r, v) {
      return h.index = v, t ? (v = h.alternate, v !== null ? (v = v.index, v < r ? (h.flags |= 67108866, r) : v) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return t && h.alternate === null && (h.flags |= 67108866), h;
    }
    function c(h, r, v, O) {
      return r === null || r.tag !== 6 ? (r = Mi(v, h.mode, O), r.return = h, r) : (r = n(r, v), r.return = h, r);
    }
    function o(h, r, v, O) {
      var Z = v.type;
      return Z === V ? E(
        h,
        r,
        v.props.children,
        O,
        v.key
      ) : r !== null && (r.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Mt && Ke(Z) === r.type) ? (r = n(r, v.props), en(r, v), r.return = h, r) : (r = Pn(
        v.type,
        v.key,
        v.props,
        null,
        h.mode,
        O
      ), en(r, v), r.return = h, r);
    }
    function g(h, r, v, O) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== v.containerInfo || r.stateNode.implementation !== v.implementation ? (r = Di(v, h.mode, O), r.return = h, r) : (r = n(r, v.children || []), r.return = h, r);
    }
    function E(h, r, v, O, Z) {
      return r === null || r.tag !== 7 ? (r = Xe(
        v,
        h.mode,
        O,
        Z
      ), r.return = h, r) : (r = n(r, v), r.return = h, r);
    }
    function M(h, r, v) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = Mi(
          "" + r,
          h.mode,
          v
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case ut:
            return v = Pn(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              v
            ), en(v, r), v.return = h, v;
          case ot:
            return r = Di(
              r,
              h.mode,
              v
            ), r.return = h, r;
          case Mt:
            return r = Ke(r), M(h, r, v);
        }
        if (ol(r) || Tt(r))
          return r = Xe(
            r,
            h.mode,
            v,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return M(h, iu(r), v);
        if (r.$$typeof === ht)
          return M(
            h,
            eu(h, r),
            v
          );
        cu(h, r);
      }
      return null;
    }
    function S(h, r, v, O) {
      var Z = r !== null ? r.key : null;
      if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
        return Z !== null ? null : c(h, r, "" + v, O);
      if (typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case ut:
            return v.key === Z ? o(h, r, v, O) : null;
          case ot:
            return v.key === Z ? g(h, r, v, O) : null;
          case Mt:
            return v = Ke(v), S(h, r, v, O);
        }
        if (ol(v) || Tt(v))
          return Z !== null ? null : E(h, r, v, O, null);
        if (typeof v.then == "function")
          return S(
            h,
            r,
            iu(v),
            O
          );
        if (v.$$typeof === ht)
          return S(
            h,
            r,
            eu(h, v),
            O
          );
        cu(h, v);
      }
      return null;
    }
    function T(h, r, v, O, Z) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return h = h.get(v) || null, c(r, h, "" + O, Z);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ut:
            return h = h.get(
              O.key === null ? v : O.key
            ) || null, o(r, h, O, Z);
          case ot:
            return h = h.get(
              O.key === null ? v : O.key
            ) || null, g(r, h, O, Z);
          case Mt:
            return O = Ke(O), T(
              h,
              r,
              v,
              O,
              Z
            );
        }
        if (ol(O) || Tt(O))
          return h = h.get(v) || null, E(r, h, O, Z, null);
        if (typeof O.then == "function")
          return T(
            h,
            r,
            v,
            iu(O),
            Z
          );
        if (O.$$typeof === ht)
          return T(
            h,
            r,
            v,
            eu(r, O),
            Z
          );
        cu(r, O);
      }
      return null;
    }
    function q(h, r, v, O) {
      for (var Z = null, ft = null, G = r, F = r = 0, at = null; G !== null && F < v.length; F++) {
        G.index > F ? (at = G, G = null) : at = G.sibling;
        var st = S(
          h,
          G,
          v[F],
          O
        );
        if (st === null) {
          G === null && (G = at);
          break;
        }
        t && G && st.alternate === null && l(h, G), r = u(st, r, F), ft === null ? Z = st : ft.sibling = st, ft = st, G = at;
      }
      if (F === v.length)
        return e(h, G), nt && wl(h, F), Z;
      if (G === null) {
        for (; F < v.length; F++)
          G = M(h, v[F], O), G !== null && (r = u(
            G,
            r,
            F
          ), ft === null ? Z = G : ft.sibling = G, ft = G);
        return nt && wl(h, F), Z;
      }
      for (G = a(G); F < v.length; F++)
        at = T(
          G,
          h,
          F,
          v[F],
          O
        ), at !== null && (t && at.alternate !== null && G.delete(
          at.key === null ? F : at.key
        ), r = u(
          at,
          r,
          F
        ), ft === null ? Z = at : ft.sibling = at, ft = at);
      return t && G.forEach(function(Ce) {
        return l(h, Ce);
      }), nt && wl(h, F), Z;
    }
    function K(h, r, v, O) {
      if (v == null) throw Error(s(151));
      for (var Z = null, ft = null, G = r, F = r = 0, at = null, st = v.next(); G !== null && !st.done; F++, st = v.next()) {
        G.index > F ? (at = G, G = null) : at = G.sibling;
        var Ce = S(h, G, st.value, O);
        if (Ce === null) {
          G === null && (G = at);
          break;
        }
        t && G && Ce.alternate === null && l(h, G), r = u(Ce, r, F), ft === null ? Z = Ce : ft.sibling = Ce, ft = Ce, G = at;
      }
      if (st.done)
        return e(h, G), nt && wl(h, F), Z;
      if (G === null) {
        for (; !st.done; F++, st = v.next())
          st = M(h, st.value, O), st !== null && (r = u(st, r, F), ft === null ? Z = st : ft.sibling = st, ft = st);
        return nt && wl(h, F), Z;
      }
      for (G = a(G); !st.done; F++, st = v.next())
        st = T(G, h, F, st.value, O), st !== null && (t && st.alternate !== null && G.delete(st.key === null ? F : st.key), r = u(st, r, F), ft === null ? Z = st : ft.sibling = st, ft = st);
      return t && G.forEach(function(Ay) {
        return l(h, Ay);
      }), nt && wl(h, F), Z;
    }
    function bt(h, r, v, O) {
      if (typeof v == "object" && v !== null && v.type === V && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
        switch (v.$$typeof) {
          case ut:
            t: {
              for (var Z = v.key; r !== null; ) {
                if (r.key === Z) {
                  if (Z = v.type, Z === V) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), O = n(
                        r,
                        v.props.children
                      ), O.return = h, h = O;
                      break t;
                    }
                  } else if (r.elementType === Z || typeof Z == "object" && Z !== null && Z.$$typeof === Mt && Ke(Z) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), O = n(r, v.props), en(O, v), O.return = h, h = O;
                    break t;
                  }
                  e(h, r);
                  break;
                } else l(h, r);
                r = r.sibling;
              }
              v.type === V ? (O = Xe(
                v.props.children,
                h.mode,
                O,
                v.key
              ), O.return = h, h = O) : (O = Pn(
                v.type,
                v.key,
                v.props,
                null,
                h.mode,
                O
              ), en(O, v), O.return = h, h = O);
            }
            return i(h);
          case ot:
            t: {
              for (Z = v.key; r !== null; ) {
                if (r.key === Z)
                  if (r.tag === 4 && r.stateNode.containerInfo === v.containerInfo && r.stateNode.implementation === v.implementation) {
                    e(
                      h,
                      r.sibling
                    ), O = n(r, v.children || []), O.return = h, h = O;
                    break t;
                  } else {
                    e(h, r);
                    break;
                  }
                else l(h, r);
                r = r.sibling;
              }
              O = Di(v, h.mode, O), O.return = h, h = O;
            }
            return i(h);
          case Mt:
            return v = Ke(v), bt(
              h,
              r,
              v,
              O
            );
        }
        if (ol(v))
          return q(
            h,
            r,
            v,
            O
          );
        if (Tt(v)) {
          if (Z = Tt(v), typeof Z != "function") throw Error(s(150));
          return v = Z.call(v), K(
            h,
            r,
            v,
            O
          );
        }
        if (typeof v.then == "function")
          return bt(
            h,
            r,
            iu(v),
            O
          );
        if (v.$$typeof === ht)
          return bt(
            h,
            r,
            eu(h, v),
            O
          );
        cu(h, v);
      }
      return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, r !== null && r.tag === 6 ? (e(h, r.sibling), O = n(r, v), O.return = h, h = O) : (e(h, r), O = Mi(v, h.mode, O), O.return = h, h = O), i(h)) : e(h, r);
    }
    return function(h, r, v, O) {
      try {
        ln = 0;
        var Z = bt(
          h,
          r,
          v,
          O
        );
        return ba = null, Z;
      } catch (G) {
        if (G === Sa || G === nu) throw G;
        var ft = yl(29, G, null, h.mode);
        return ft.lanes = O, ft.return = h, ft;
      } finally {
      }
    };
  }
  var we = Hs(!0), Bs = Hs(!1), ye = !1;
  function Xi(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Li(t, l) {
    t = t.updateQueue, l.updateQueue === t && (l.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ve(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ge(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (dt & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = In(t), Ss(t, null, e), l;
    }
    return Fn(t, a, l, e), In(t);
  }
  function an(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Mf(t, e);
    }
  }
  function Qi(t, l) {
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
  var Zi = !1;
  function nn() {
    if (Zi) {
      var t = pa;
      if (t !== null) throw t;
    }
  }
  function un(t, l, e, a) {
    Zi = !1;
    var n = t.updateQueue;
    ye = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var o = c, g = o.next;
      o.next = null, i === null ? u = g : i.next = g, i = o;
      var E = t.alternate;
      E !== null && (E = E.updateQueue, c = E.lastBaseUpdate, c !== i && (c === null ? E.firstBaseUpdate = g : c.next = g, E.lastBaseUpdate = o));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, E = g = o = null, c = u;
      do {
        var S = c.lane & -536870913, T = S !== c.lane;
        if (T ? (et & S) === S : (a & S) === S) {
          S !== 0 && S === ga && (Zi = !0), E !== null && (E = E.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var q = t, K = c;
            S = l;
            var bt = e;
            switch (K.tag) {
              case 1:
                if (q = K.payload, typeof q == "function") {
                  M = q.call(bt, M, S);
                  break t;
                }
                M = q;
                break t;
              case 3:
                q.flags = q.flags & -65537 | 128;
              case 0:
                if (q = K.payload, S = typeof q == "function" ? q.call(bt, M, S) : q, S == null) break t;
                M = j({}, M, S);
                break t;
              case 2:
                ye = !0;
            }
          }
          S = c.callback, S !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [S] : T.push(S));
        } else
          T = {
            lane: S,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, E === null ? (g = E = T, o = M) : E = E.next = T, i |= S;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null)
            break;
          T = c, c = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      E === null && (o = M), n.baseState = o, n.firstBaseUpdate = g, n.lastBaseUpdate = E, u === null && (n.shared.lanes = 0), Ee |= i, t.lanes = i, t.memoizedState = M;
    }
  }
  function qs(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function Ys(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        qs(e[t], l);
  }
  var Ta = d(null), fu = d(0);
  function Gs(t, l) {
    t = ne, B(fu, t), B(Ta, l), ne = t | l.baseLanes;
  }
  function Vi() {
    B(fu, ne), B(Ta, Ta.current);
  }
  function Ki() {
    ne = fu.current, D(Ta), D(fu);
  }
  var vl = d(null), Dl = null;
  function pe(t) {
    var l = t.alternate;
    B(Ht, Ht.current & 1), B(vl, t), Dl === null && (l === null || Ta.current !== null || l.memoizedState !== null) && (Dl = t);
  }
  function Ji(t) {
    B(Ht, Ht.current), B(vl, t), Dl === null && (Dl = t);
  }
  function Xs(t) {
    t.tag === 22 ? (B(Ht, Ht.current), B(vl, t), Dl === null && (Dl = t)) : Se();
  }
  function Se() {
    B(Ht, Ht.current), B(vl, vl.current);
  }
  function gl(t) {
    D(vl), Dl === t && (Dl = null), D(Ht);
  }
  var Ht = d(0);
  function su(t) {
    for (var l = t; l !== null; ) {
      if (l.tag === 13) {
        var e = l.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || Ic(e) || Pc(e)))
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
  var Wl = 0, $ = null, pt = null, Gt = null, ou = !1, Ea = !1, ke = !1, ru = 0, cn = 0, _a = null, mm = 0;
  function Ut() {
    throw Error(s(321));
  }
  function wi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!ml(t[e], l[e])) return !1;
    return !0;
  }
  function ki(t, l, e, a, n, u) {
    return Wl = u, $ = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, _.H = t === null || t.memoizedState === null ? Ao : sc, ke = !1, u = e(a, n), ke = !1, Ea && (u = Qs(
      l,
      e,
      a,
      n
    )), Ls(t), u;
  }
  function Ls(t) {
    _.H = on;
    var l = pt !== null && pt.next !== null;
    if (Wl = 0, Gt = pt = $ = null, ou = !1, cn = 0, _a = null, l) throw Error(s(300));
    t === null || Xt || (t = t.dependencies, t !== null && lu(t) && (Xt = !0));
  }
  function Qs(t, l, e, a) {
    $ = t;
    var n = 0;
    do {
      if (Ea && (_a = null), cn = 0, Ea = !1, 25 <= n) throw Error(s(301));
      if (n += 1, Gt = pt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      _.H = zo, u = l(e, a);
    } while (Ea);
    return u;
  }
  function ym() {
    var t = _.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? fn(l) : l, t = t.useState()[0], (pt !== null ? pt.memoizedState : null) !== t && ($.flags |= 1024), l;
  }
  function $i() {
    var t = ru !== 0;
    return ru = 0, t;
  }
  function Wi(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Fi(t) {
    if (ou) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      ou = !1;
    }
    Wl = 0, Gt = pt = $ = null, Ea = !1, cn = ru = 0, _a = null;
  }
  function tl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Gt === null ? $.memoizedState = Gt = t : Gt = Gt.next = t, Gt;
  }
  function Bt() {
    if (pt === null) {
      var t = $.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = pt.next;
    var l = Gt === null ? $.memoizedState : Gt.next;
    if (l !== null)
      Gt = l, pt = t;
    else {
      if (t === null)
        throw $.alternate === null ? Error(s(467)) : Error(s(310));
      pt = t, t = {
        memoizedState: pt.memoizedState,
        baseState: pt.baseState,
        baseQueue: pt.baseQueue,
        queue: pt.queue,
        next: null
      }, Gt === null ? $.memoizedState = Gt = t : Gt = Gt.next = t;
    }
    return Gt;
  }
  function du() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function fn(t) {
    var l = cn;
    return cn += 1, _a === null && (_a = []), t = Cs(_a, t, l), l = $, (Gt === null ? l.memoizedState : Gt.next) === null && (l = l.alternate, _.H = l === null || l.memoizedState === null ? Ao : sc), t;
  }
  function hu(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return fn(t);
      if (t.$$typeof === ht) return Wt(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ii(t) {
    var l = null, e = $.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = $.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = du(), $.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = X;
    return l.index++, e;
  }
  function Fl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function mu(t) {
    var l = Bt();
    return Pi(l, pt, t);
  }
  function Pi(t, l, e) {
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
      var c = i = null, o = null, g = l, E = !1;
      do {
        var M = g.lane & -536870913;
        if (M !== g.lane ? (et & M) === M : (Wl & M) === M) {
          var S = g.revertLane;
          if (S === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }), M === ga && (E = !0);
          else if ((Wl & S) === S) {
            g = g.next, S === ga && (E = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: g.revertLane,
              gesture: null,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, o === null ? (c = o = M, i = u) : o = o.next = M, $.lanes |= S, Ee |= S;
          M = g.action, ke && e(u, M), u = g.hasEagerState ? g.eagerState : e(u, M);
        } else
          S = {
            lane: M,
            revertLane: g.revertLane,
            gesture: g.gesture,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null
          }, o === null ? (c = o = S, i = u) : o = o.next = S, $.lanes |= M, Ee |= M;
        g = g.next;
      } while (g !== null && g !== l);
      if (o === null ? i = u : o.next = c, !ml(u, t.memoizedState) && (Xt = !0, E && (e = pa, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function tc(t) {
    var l = Bt(), e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = t;
    var a = e.dispatch, n = e.pending, u = l.memoizedState;
    if (n !== null) {
      e.pending = null;
      var i = n = n.next;
      do
        u = t(u, i.action), i = i.next;
      while (i !== n);
      ml(u, l.memoizedState) || (Xt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Zs(t, l, e) {
    var a = $, n = Bt(), u = nt;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !ml(
      (pt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Xt = !0), n = n.queue, ac(Js.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || Gt !== null && Gt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Aa(
        9,
        { destroy: void 0 },
        Ks.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), Et === null) throw Error(s(349));
      u || (Wl & 127) !== 0 || Vs(a, l, e);
    }
    return e;
  }
  function Vs(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = $.updateQueue, l === null ? (l = du(), $.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Ks(t, l, e, a) {
    l.value = e, l.getSnapshot = a, ws(l) && ks(t);
  }
  function Js(t, l, e) {
    return e(function() {
      ws(l) && ks(t);
    });
  }
  function ws(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !ml(t, e);
    } catch {
      return !0;
    }
  }
  function ks(t) {
    var l = Ge(t, 2);
    l !== null && fl(l, t, 2);
  }
  function lc(t) {
    var l = tl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), ke) {
        fe(!0);
        try {
          e();
        } finally {
          fe(!1);
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
  function $s(t, l, e, a) {
    return t.baseState = e, Pi(
      t,
      pt,
      typeof a == "function" ? a : Fl
    );
  }
  function vm(t, l, e, a, n) {
    if (gu(t)) throw Error(s(485));
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
      _.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, Ws(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function Ws(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = _.T, i = {};
      _.T = i;
      try {
        var c = e(n, a), o = _.S;
        o !== null && o(i, c), Fs(t, l, c);
      } catch (g) {
        ec(t, l, g);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), _.T = u;
      }
    } else
      try {
        u = e(n, a), Fs(t, l, u);
      } catch (g) {
        ec(t, l, g);
      }
  }
  function Fs(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Is(t, l, a);
      },
      function(a) {
        return ec(t, l, a);
      }
    ) : Is(t, l, e);
  }
  function Is(t, l, e) {
    l.status = "fulfilled", l.value = e, Ps(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, Ws(t, e)));
  }
  function ec(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Ps(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Ps(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function to(t, l) {
    return l;
  }
  function lo(t, l) {
    if (nt) {
      var e = Et.formState;
      if (e !== null) {
        t: {
          var a = $;
          if (nt) {
            if (zt) {
              l: {
                for (var n = zt, u = Ml; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break l;
                  }
                  if (n = Nl(
                    n.nextSibling
                  ), n === null) {
                    n = null;
                    break l;
                  }
                }
                u = n.data, n = u === "F!" || u === "F" ? n : null;
              }
              if (n) {
                zt = Nl(
                  n.nextSibling
                ), a = n.data === "F!";
                break t;
              }
            }
            he(a);
          }
          a = !1;
        }
        a && (l = e[0]);
      }
    }
    return e = tl(), e.memoizedState = e.baseState = l, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: to,
      lastRenderedState: l
    }, e.queue = a, e = To.bind(
      null,
      $,
      a
    ), a.dispatch = e, a = lc(!1), u = fc.bind(
      null,
      $,
      !1,
      a.queue
    ), a = tl(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = vm.bind(
      null,
      $,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function eo(t) {
    var l = Bt();
    return ao(l, pt, t);
  }
  function ao(t, l, e) {
    if (l = Pi(
      t,
      l,
      to
    )[0], t = mu(Fl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = fn(l);
      } catch (i) {
        throw i === Sa ? nu : i;
      }
    else a = l;
    l = Bt();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && ($.flags |= 2048, Aa(
      9,
      { destroy: void 0 },
      gm.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function gm(t, l) {
    t.action = l;
  }
  function no(t) {
    var l = Bt(), e = pt;
    if (e !== null)
      return ao(l, e, t);
    Bt(), l = l.memoizedState, e = Bt();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Aa(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = $.updateQueue, l === null && (l = du(), $.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function uo() {
    return Bt().memoizedState;
  }
  function yu(t, l, e, a) {
    var n = tl();
    $.flags |= t, n.memoizedState = Aa(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function vu(t, l, e, a) {
    var n = Bt();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    pt !== null && a !== null && wi(a, pt.memoizedState.deps) ? n.memoizedState = Aa(l, u, e, a) : ($.flags |= t, n.memoizedState = Aa(
      1 | l,
      u,
      e,
      a
    ));
  }
  function io(t, l) {
    yu(8390656, 8, t, l);
  }
  function ac(t, l) {
    vu(2048, 8, t, l);
  }
  function pm(t) {
    $.flags |= 4;
    var l = $.updateQueue;
    if (l === null)
      l = du(), $.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function co(t) {
    var l = Bt().memoizedState;
    return pm({ ref: l, nextImpl: t }), function() {
      if ((dt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function fo(t, l) {
    return vu(4, 2, t, l);
  }
  function so(t, l) {
    return vu(4, 4, t, l);
  }
  function oo(t, l) {
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
  function ro(t, l, e) {
    e = e != null ? e.concat([t]) : null, vu(4, 4, oo.bind(null, l, t), e);
  }
  function nc() {
  }
  function ho(t, l) {
    var e = Bt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && wi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function mo(t, l) {
    var e = Bt();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && wi(l, a[1]))
      return a[0];
    if (a = t(), ke) {
      fe(!0);
      try {
        t();
      } finally {
        fe(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function uc(t, l, e) {
    return e === void 0 || (Wl & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = yr(), $.lanes |= t, Ee |= t, e);
  }
  function yo(t, l, e, a) {
    return ml(e, l) ? e : Ta.current !== null ? (t = uc(t, e, a), ml(t, l) || (Xt = !0), t) : (Wl & 42) === 0 || (Wl & 1073741824) !== 0 && (et & 261930) === 0 ? (Xt = !0, t.memoizedState = e) : (t = yr(), $.lanes |= t, Ee |= t, l);
  }
  function vo(t, l, e, a, n) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var i = _.T, c = {};
    _.T = c, fc(t, !1, l, e);
    try {
      var o = n(), g = _.S;
      if (g !== null && g(c, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var E = hm(
          o,
          a
        );
        sn(
          t,
          l,
          E,
          bl(t)
        );
      } else
        sn(
          t,
          l,
          a,
          bl(t)
        );
    } catch (M) {
      sn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: M },
        bl()
      );
    } finally {
      H.p = u, i !== null && c.types !== null && (i.types = c.types), _.T = i;
    }
  }
  function Sm() {
  }
  function ic(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = go(t).queue;
    vo(
      t,
      n,
      l,
      J,
      e === null ? Sm : function() {
        return po(t), e(a);
      }
    );
  }
  function go(t) {
    var l = t.memoizedState;
    if (l !== null) return l;
    l = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Fl,
        lastRenderedState: J
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
  function po(t) {
    var l = go(t);
    l.next === null && (l = t.alternate.memoizedState), sn(
      t,
      l.next.queue,
      {},
      bl()
    );
  }
  function cc() {
    return Wt(On);
  }
  function So() {
    return Bt().memoizedState;
  }
  function bo() {
    return Bt().memoizedState;
  }
  function bm(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = bl();
          t = ve(e);
          var a = ge(l, t, e);
          a !== null && (fl(a, l, e), an(a, l, e)), l = { cache: Bi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Tm(t, l, e) {
    var a = bl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, gu(t) ? Eo(l, e) : (e = zi(t, l, e, a), e !== null && (fl(e, t, a), _o(e, l, a)));
  }
  function To(t, l, e) {
    var a = bl();
    sn(t, l, e, a);
  }
  function sn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (gu(t)) Eo(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, c = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = c, ml(c, i))
            return Fn(t, l, n, 0), Et === null && Wn(), !1;
        } catch {
        } finally {
        }
      if (e = zi(t, l, n, a), e !== null)
        return fl(e, t, a), _o(e, l, a), !0;
    }
    return !1;
  }
  function fc(t, l, e, a) {
    if (a = {
      lane: 2,
      revertLane: Xc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, gu(t)) {
      if (l) throw Error(s(479));
    } else
      l = zi(
        t,
        e,
        a,
        2
      ), l !== null && fl(l, t, 2);
  }
  function gu(t) {
    var l = t.alternate;
    return t === $ || l !== null && l === $;
  }
  function Eo(t, l) {
    Ea = ou = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function _o(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Mf(t, e);
    }
  }
  var on = {
    readContext: Wt,
    use: hu,
    useCallback: Ut,
    useContext: Ut,
    useEffect: Ut,
    useImperativeHandle: Ut,
    useLayoutEffect: Ut,
    useInsertionEffect: Ut,
    useMemo: Ut,
    useReducer: Ut,
    useRef: Ut,
    useState: Ut,
    useDebugValue: Ut,
    useDeferredValue: Ut,
    useTransition: Ut,
    useSyncExternalStore: Ut,
    useId: Ut,
    useHostTransitionStatus: Ut,
    useFormState: Ut,
    useActionState: Ut,
    useOptimistic: Ut,
    useMemoCache: Ut,
    useCacheRefresh: Ut
  };
  on.useEffectEvent = Ut;
  var Ao = {
    readContext: Wt,
    use: hu,
    useCallback: function(t, l) {
      return tl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: Wt,
    useEffect: io,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, yu(
        4194308,
        4,
        oo.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return yu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      yu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = tl();
      l = l === void 0 ? null : l;
      var a = t();
      if (ke) {
        fe(!0);
        try {
          t();
        } finally {
          fe(!1);
        }
      }
      return e.memoizedState = [a, l], a;
    },
    useReducer: function(t, l, e) {
      var a = tl();
      if (e !== void 0) {
        var n = e(l);
        if (ke) {
          fe(!0);
          try {
            e(l);
          } finally {
            fe(!1);
          }
        }
      } else n = l;
      return a.memoizedState = a.baseState = n, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: n
      }, a.queue = t, t = t.dispatch = Tm.bind(
        null,
        $,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = tl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = lc(t);
      var l = t.queue, e = To.bind(null, $, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = tl();
      return uc(e, t, l);
    },
    useTransition: function() {
      var t = lc(!1);
      return t = vo.bind(
        null,
        $,
        t.queue,
        !0,
        !1
      ), tl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = $, n = tl();
      if (nt) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), Et === null)
          throw Error(s(349));
        (et & 127) !== 0 || Vs(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, io(Js.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Aa(
        9,
        { destroy: void 0 },
        Ks.bind(
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
      var t = tl(), l = Et.identifierPrefix;
      if (nt) {
        var e = Bl, a = Hl;
        e = (a & ~(1 << 32 - hl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = ru++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = mm++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: cc,
    useFormState: lo,
    useActionState: lo,
    useOptimistic: function(t) {
      var l = tl();
      l.memoizedState = l.baseState = t;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return l.queue = e, l = fc.bind(
        null,
        $,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Ii,
    useCacheRefresh: function() {
      return tl().memoizedState = bm.bind(
        null,
        $
      );
    },
    useEffectEvent: function(t) {
      var l = tl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((dt & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, sc = {
    readContext: Wt,
    use: hu,
    useCallback: ho,
    useContext: Wt,
    useEffect: ac,
    useImperativeHandle: ro,
    useInsertionEffect: fo,
    useLayoutEffect: so,
    useMemo: mo,
    useReducer: mu,
    useRef: uo,
    useState: function() {
      return mu(Fl);
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = Bt();
      return yo(
        e,
        pt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = mu(Fl)[0], l = Bt().memoizedState;
      return [
        typeof t == "boolean" ? t : fn(t),
        l
      ];
    },
    useSyncExternalStore: Zs,
    useId: So,
    useHostTransitionStatus: cc,
    useFormState: eo,
    useActionState: eo,
    useOptimistic: function(t, l) {
      var e = Bt();
      return $s(e, pt, t, l);
    },
    useMemoCache: Ii,
    useCacheRefresh: bo
  };
  sc.useEffectEvent = co;
  var zo = {
    readContext: Wt,
    use: hu,
    useCallback: ho,
    useContext: Wt,
    useEffect: ac,
    useImperativeHandle: ro,
    useInsertionEffect: fo,
    useLayoutEffect: so,
    useMemo: mo,
    useReducer: tc,
    useRef: uo,
    useState: function() {
      return tc(Fl);
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = Bt();
      return pt === null ? uc(e, t, l) : yo(
        e,
        pt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = tc(Fl)[0], l = Bt().memoizedState;
      return [
        typeof t == "boolean" ? t : fn(t),
        l
      ];
    },
    useSyncExternalStore: Zs,
    useId: So,
    useHostTransitionStatus: cc,
    useFormState: no,
    useActionState: no,
    useOptimistic: function(t, l) {
      var e = Bt();
      return pt !== null ? $s(e, pt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Ii,
    useCacheRefresh: bo
  };
  zo.useEffectEvent = co;
  function oc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : j({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var rc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = bl(), n = ve(a);
      n.payload = l, e != null && (n.callback = e), l = ge(t, n, a), l !== null && (fl(l, t, a), an(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = bl(), n = ve(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = ge(t, n, a), l !== null && (fl(l, t, a), an(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = bl(), a = ve(e);
      a.tag = 2, l != null && (a.callback = l), l = ge(t, a, e), l !== null && (fl(l, t, e), an(l, t, e));
    }
  };
  function Oo(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !$a(e, a) || !$a(n, u) : !0;
  }
  function Mo(t, l, e, a) {
    t = l.state, typeof l.componentWillReceiveProps == "function" && l.componentWillReceiveProps(e, a), typeof l.UNSAFE_componentWillReceiveProps == "function" && l.UNSAFE_componentWillReceiveProps(e, a), l.state !== t && rc.enqueueReplaceState(l, l.state, null);
  }
  function $e(t, l) {
    var e = l;
    if ("ref" in l) {
      e = {};
      for (var a in l)
        a !== "ref" && (e[a] = l[a]);
    }
    if (t = t.defaultProps) {
      e === l && (e = j({}, e));
      for (var n in t)
        e[n] === void 0 && (e[n] = t[n]);
    }
    return e;
  }
  function Do(t) {
    $n(t);
  }
  function No(t) {
    console.error(t);
  }
  function xo(t) {
    $n(t);
  }
  function pu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function jo(t, l, e) {
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
  function dc(t, l, e) {
    return e = ve(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      pu(t, l);
    }, e;
  }
  function Co(t) {
    return t = ve(t), t.tag = 3, t;
  }
  function Uo(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        jo(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      jo(l, e, a), typeof n != "function" && (_e === null ? _e = /* @__PURE__ */ new Set([this]) : _e.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Em(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && va(
        l,
        e,
        n,
        !0
      ), e = vl.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Dl === null ? xu() : e.alternate === null && Rt === 0 && (Rt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), qc(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === uu ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), qc(t, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return qc(t, a, n), xu(), !1;
    }
    if (nt)
      return l = vl.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== ji && (t = Error(s(422), { cause: a }), Ia(Al(t, e)))) : (a !== ji && (l = Error(s(423), {
        cause: a
      }), Ia(
        Al(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Al(a, e), n = dc(
        t.stateNode,
        a,
        n
      ), Qi(t, n), Rt !== 4 && (Rt = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Al(u, e), pn === null ? pn = [u] : pn.push(u), Rt !== 4 && (Rt = 2), l === null) return !0;
    a = Al(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = dc(e.stateNode, a, t), Qi(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (_e === null || !_e.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = Co(n), Uo(
              n,
              t,
              e,
              a
            ), Qi(e, n), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var hc = Error(s(461)), Xt = !1;
  function Ft(t, l, e, a) {
    l.child = t === null ? Bs(l, null, e, a) : we(
      l,
      t.child,
      e,
      a
    );
  }
  function Ro(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Ze(l), a = ki(
      t,
      l,
      e,
      i,
      u,
      n
    ), c = $i(), t !== null && !Xt ? (Wi(t, l, n), Il(t, l, n)) : (nt && c && Ni(l), l.flags |= 1, Ft(t, l, a, n), l.child);
  }
  function Ho(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Oi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Bo(
        t,
        l,
        u,
        a,
        n
      )) : (t = Pn(
        e.type,
        null,
        a,
        l,
        l.mode,
        n
      ), t.ref = l.ref, t.return = l, l.child = t);
    }
    if (u = t.child, !Tc(t, n)) {
      var i = u.memoizedProps;
      if (e = e.compare, e = e !== null ? e : $a, e(i, a) && t.ref === l.ref)
        return Il(t, l, n);
    }
    return l.flags |= 1, t = Jl(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Bo(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if ($a(u, a) && t.ref === l.ref)
        if (Xt = !1, l.pendingProps = a = u, Tc(t, n))
          (t.flags & 131072) !== 0 && (Xt = !0);
        else
          return l.lanes = t.lanes, Il(t, l, n);
    }
    return mc(
      t,
      l,
      e,
      a,
      n
    );
  }
  function qo(t, l, e, a) {
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
        return Yo(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && au(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Gs(l, u) : Vi(), Xs(l);
      else
        return a = l.lanes = 536870912, Yo(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (au(l, u.cachePool), Gs(l, u), Se(), l.memoizedState = null) : (t !== null && au(l, null), Vi(), Se());
    return Ft(t, l, n, e), l.child;
  }
  function rn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function Yo(t, l, e, a, n) {
    var u = Yi();
    return u = u === null ? null : { parent: Yt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && au(l, null), Vi(), Xs(l), t !== null && va(t, l, a, !0), l.childLanes = n, null;
  }
  function Su(t, l) {
    return l = Tu(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Go(t, l, e) {
    return we(l, t.child, null, e), t = Su(l, l.pendingProps), t.flags |= 2, gl(l), l.memoizedState = null, t;
  }
  function _m(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (nt) {
        if (a.mode === "hidden")
          return t = Su(l, a), l.lanes = 536870912, rn(null, t);
        if (Ji(l), (t = zt) ? (t = Fr(
          t,
          Ml
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: re !== null ? { id: Hl, overflow: Bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Ts(t), e.return = l, l.child = e, $t = l, zt = null)) : t = null, t === null) throw he(l);
        return l.lanes = 536870912, null;
      }
      return Su(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Ji(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Go(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Xt || va(t, l, e, !1), n = (e & t.childLanes) !== 0, Xt || n) {
        if (a = Et, a !== null && (i = Df(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Ge(t, i), fl(a, t, i), hc;
        xu(), l = Go(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, zt = Nl(i.nextSibling), $t = l, nt = !0, de = null, Ml = !1, t !== null && As(l, t), l = Su(l, a), l.flags |= 4096;
      return l;
    }
    return t = Jl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function bu(t, l) {
    var e = l.ref;
    if (e === null)
      t !== null && t.ref !== null && (l.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (t === null || t.ref !== e) && (l.flags |= 4194816);
    }
  }
  function mc(t, l, e, a, n) {
    return Ze(l), e = ki(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = $i(), t !== null && !Xt ? (Wi(t, l, n), Il(t, l, n)) : (nt && a && Ni(l), l.flags |= 1, Ft(t, l, e, n), l.child);
  }
  function Xo(t, l, e, a, n, u) {
    return Ze(l), l.updateQueue = null, e = Qs(
      l,
      a,
      e,
      n
    ), Ls(t), a = $i(), t !== null && !Xt ? (Wi(t, l, u), Il(t, l, u)) : (nt && a && Ni(l), l.flags |= 1, Ft(t, l, e, u), l.child);
  }
  function Lo(t, l, e, a, n) {
    if (Ze(l), l.stateNode === null) {
      var u = da, i = e.contextType;
      typeof i == "object" && i !== null && (u = Wt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = rc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Xi(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? Wt(i) : da, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (oc(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && rc.enqueueReplaceState(u, u.state, null), un(l, a, u, n), nn(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var c = l.memoizedProps, o = $e(e, c);
      u.props = o;
      var g = u.context, E = e.contextType;
      i = da, typeof E == "object" && E !== null && (i = Wt(E));
      var M = e.getDerivedStateFromProps;
      E = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, E || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || g !== i) && Mo(
        l,
        u,
        a,
        i
      ), ye = !1;
      var S = l.memoizedState;
      u.state = S, un(l, a, u, n), nn(), g = l.memoizedState, c || S !== g || ye ? (typeof M == "function" && (oc(
        l,
        e,
        M,
        a
      ), g = l.memoizedState), (o = ye || Oo(
        l,
        e,
        o,
        a,
        S,
        g,
        i
      )) ? (E || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = g), u.props = a, u.state = g, u.context = i, a = o) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, Li(t, l), i = l.memoizedProps, E = $e(e, i), u.props = E, M = l.pendingProps, S = u.context, g = e.contextType, o = da, typeof g == "object" && g !== null && (o = Wt(g)), c = e.getDerivedStateFromProps, (g = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || S !== o) && Mo(
        l,
        u,
        a,
        o
      ), ye = !1, S = l.memoizedState, u.state = S, un(l, a, u, n), nn();
      var T = l.memoizedState;
      i !== M || S !== T || ye || t !== null && t.dependencies !== null && lu(t.dependencies) ? (typeof c == "function" && (oc(
        l,
        e,
        c,
        a
      ), T = l.memoizedState), (E = ye || Oo(
        l,
        e,
        E,
        a,
        S,
        T,
        o
      ) || t !== null && t.dependencies !== null && lu(t.dependencies)) ? (g || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        o
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = T), u.props = a, u.state = T, u.context = o, a = E) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && S === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, bu(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = we(
      l,
      t.child,
      null,
      n
    ), l.child = we(
      l,
      null,
      e,
      n
    )) : Ft(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Il(
      t,
      l,
      n
    ), t;
  }
  function Qo(t, l, e, a) {
    return Le(), l.flags |= 256, Ft(t, l, e, a), l.child;
  }
  var yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function vc(t) {
    return { baseLanes: t, cachePool: xs() };
  }
  function gc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= Sl), t;
  }
  function Zo(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Ht.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (nt) {
        if (n ? pe(l) : Se(), (t = zt) ? (t = Fr(
          t,
          Ml
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: re !== null ? { id: Hl, overflow: Bl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = Ts(t), e.return = l, l.child = e, $t = l, zt = null)) : t = null, t === null) throw he(l);
        return Pc(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, n ? (Se(), n = l.mode, c = Tu(
        { mode: "hidden", children: c },
        n
      ), a = Xe(
        a,
        n,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = vc(e), a.childLanes = gc(
        t,
        i,
        e
      ), l.memoizedState = yc, rn(null, a)) : (pe(l), pc(l, c));
    }
    var o = t.memoizedState;
    if (o !== null && (c = o.dehydrated, c !== null)) {
      if (u)
        l.flags & 256 ? (pe(l), l.flags &= -257, l = Sc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (Se(), l.child = t.child, l.flags |= 128, l = null) : (Se(), c = a.fallback, n = l.mode, a = Tu(
          { mode: "visible", children: a.children },
          n
        ), c = Xe(
          c,
          n,
          e,
          null
        ), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, we(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = vc(e), a.childLanes = gc(
          t,
          i,
          e
        ), l.memoizedState = yc, l = rn(null, a));
      else if (pe(l), Pc(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var g = i.dgst;
        i = g, a = Error(s(419)), a.stack = "", a.digest = i, Ia({ value: a, source: null, stack: null }), l = Sc(
          t,
          l,
          e
        );
      } else if (Xt || va(t, l, e, !1), i = (e & t.childLanes) !== 0, Xt || i) {
        if (i = Et, i !== null && (a = Df(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, Ge(t, a), fl(i, t, a), hc;
        Ic(c) || xu(), l = Sc(
          t,
          l,
          e
        );
      } else
        Ic(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, zt = Nl(
          c.nextSibling
        ), $t = l, nt = !0, de = null, Ml = !1, t !== null && As(l, t), l = pc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (Se(), c = a.fallback, n = l.mode, o = t.child, g = o.sibling, a = Jl(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, g !== null ? c = Jl(
      g,
      c
    ) : (c = Xe(
      c,
      n,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, rn(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = vc(e) : (n = c.cachePool, n !== null ? (o = Yt._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = xs(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: n
    }), a.memoizedState = c, a.childLanes = gc(
      t,
      i,
      e
    ), l.memoizedState = yc, rn(t.child, a)) : (pe(l), e = t.child, t = e.sibling, e = Jl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function pc(t, l) {
    return l = Tu(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Tu(t, l) {
    return t = yl(22, t, null, l), t.lanes = 0, t;
  }
  function Sc(t, l, e) {
    return we(l, t.child, null, e), t = pc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Vo(t, l, e) {
    t.lanes |= l;
    var a = t.alternate;
    a !== null && (a.lanes |= l), Ri(t.return, l, e);
  }
  function bc(t, l, e, a, n, u) {
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
  function Ko(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Ht.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, B(Ht, i), Ft(t, l, a, e), a = nt ? Fa : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Vo(t, e, l);
        else if (t.tag === 19)
          Vo(t, e, l);
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
          t = e.alternate, t !== null && su(t) === null && (n = e), e = e.sibling;
        e = n, e === null ? (n = l.child, l.child = null) : (n = e.sibling, e.sibling = null), bc(
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
          if (t = n.alternate, t !== null && su(t) === null) {
            l.child = n;
            break;
          }
          t = n.sibling, n.sibling = e, e = n, n = t;
        }
        bc(
          l,
          !0,
          e,
          null,
          u,
          a
        );
        break;
      case "together":
        bc(
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
    if (t !== null && (l.dependencies = t.dependencies), Ee |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (va(
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
      for (t = l.child, e = Jl(t, t.pendingProps), l.child = e, e.return = l; t.sibling !== null; )
        t = t.sibling, e = e.sibling = Jl(t, t.pendingProps), e.return = l;
      e.sibling = null;
    }
    return l.child;
  }
  function Tc(t, l) {
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && lu(t)));
  }
  function Am(t, l, e) {
    switch (l.tag) {
      case 3:
        wt(l, l.stateNode.containerInfo), me(l, Yt, t.memoizedState.cache), Le();
        break;
      case 27:
      case 5:
        Xl(l);
        break;
      case 4:
        wt(l, l.stateNode.containerInfo);
        break;
      case 10:
        me(
          l,
          l.type,
          l.memoizedProps.value
        );
        break;
      case 31:
        if (l.memoizedState !== null)
          return l.flags |= 128, Ji(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (pe(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Zo(t, l, e) : (pe(l), t = Il(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        pe(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (va(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Ko(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), B(Ht, Ht.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, qo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        me(l, Yt, t.memoizedState.cache);
    }
    return Il(t, l, e);
  }
  function Jo(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Xt = !0;
      else {
        if (!Tc(t, e) && (l.flags & 128) === 0)
          return Xt = !1, Am(
            t,
            l,
            e
          );
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = !1, nt && (l.flags & 1048576) !== 0 && _s(l, Fa, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ke(l.elementType), l.type = t, typeof t == "function")
            Oi(t) ? (a = $e(t, a), l.tag = 1, l = Lo(
              null,
              l,
              t,
              a,
              e
            )) : (l.tag = 0, l = mc(
              null,
              l,
              t,
              a,
              e
            ));
          else {
            if (t != null) {
              var n = t.$$typeof;
              if (n === Nt) {
                l.tag = 11, l = Ro(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === Q) {
                l.tag = 14, l = Ho(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = sl(t) || t, Error(s(306, l, ""));
          }
        }
        return l;
      case 0:
        return mc(
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
        ), Lo(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (wt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, Li(t, l), un(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, me(l, Yt, a), a !== u.cache && Hi(
            l,
            [Yt],
            e,
            !0
          ), nn(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = Qo(
                t,
                l,
                a,
                e
              );
              break t;
            } else if (a !== n) {
              n = Al(
                Error(s(424)),
                l
              ), Ia(n), l = Qo(
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
              for (zt = Nl(t.firstChild), $t = l, nt = !0, de = null, Ml = !0, e = Bs(
                l,
                null,
                a,
                e
              ), l.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Le(), a === n) {
              l = Il(
                t,
                l,
                e
              );
              break t;
            }
            Ft(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return bu(t, l), t === null ? (e = ad(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : nt || (e = l.type, t = l.pendingProps, a = qu(
          I.current
        ).createElement(e), a[kt] = l, a[el] = t, It(a, e, t), Vt(a), l.stateNode = a) : l.memoizedState = ad(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Xl(l), t === null && nt && (a = l.stateNode = td(
          l.type,
          l.pendingProps,
          I.current
        ), $t = l, Ml = !0, n = zt, Me(l.type) ? (tf = n, zt = Nl(a.firstChild)) : zt = n), Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), bu(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && nt && ((n = a = zt) && (a = ty(
          a,
          l.type,
          l.pendingProps,
          Ml
        ), a !== null ? (l.stateNode = a, $t = l, zt = Nl(a.firstChild), Ml = !1, n = !0) : n = !1), n || he(l)), Xl(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, $c(n, u) ? a = null : i !== null && $c(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = ki(
          t,
          l,
          ym,
          null,
          null,
          e
        ), On._currentValue = n), bu(t, l), Ft(t, l, a, e), l.child;
      case 6:
        return t === null && nt && ((t = e = zt) && (e = ly(
          e,
          l.pendingProps,
          Ml
        ), e !== null ? (l.stateNode = e, $t = l, zt = null, t = !0) : t = !1), t || he(l)), null;
      case 13:
        return Zo(t, l, e);
      case 4:
        return wt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = we(
          l,
          null,
          a,
          e
        ) : Ft(t, l, a, e), l.child;
      case 11:
        return Ro(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return Ft(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Ft(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, me(l, l.type, a.value), Ft(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Ze(l), n = Wt(n), a = a(n), l.flags |= 1, Ft(t, l, a, e), l.child;
      case 14:
        return Ho(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Bo(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Ko(t, l, e);
      case 31:
        return _m(t, l, e);
      case 22:
        return qo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Ze(l), a = Wt(Yt), t === null ? (n = Yi(), n === null && (n = Et, u = Bi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Xi(l), me(l, Yt, n)) : ((t.lanes & e) !== 0 && (Li(t, l), un(l, null, null, e), nn()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), me(l, Yt, a)) : (a = u.cache, me(l, Yt, a), a !== n.cache && Hi(
          l,
          [Yt],
          e,
          !0
        ))), Ft(
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
  function Ec(t, l, e, a, n) {
    if ((l = (t.mode & 32) !== 0) && (l = !1), l) {
      if (t.flags |= 16777216, (n & 335544128) === n)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (Sr()) t.flags |= 8192;
        else
          throw Je = uu, Gi;
    } else t.flags &= -16777217;
  }
  function wo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !fd(l))
      if (Sr()) t.flags |= 8192;
      else
        throw Je = uu, Gi;
  }
  function Eu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? zf() : 536870912, t.lanes |= l, Da |= l);
  }
  function dn(t, l) {
    if (!nt)
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
  function Ot(t) {
    var l = t.alternate !== null && t.alternate.child === t.child, e = 0, a = 0;
    if (l)
      for (var n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = t, n = n.sibling;
    else
      for (n = t.child; n !== null; )
        e |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = t, n = n.sibling;
    return t.subtreeFlags |= a, t.childLanes = e, l;
  }
  function zm(t, l, e) {
    var a = l.pendingProps;
    switch (xi(l), l.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ot(l), null;
      case 1:
        return Ot(l), null;
      case 3:
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), $l(Yt), xt(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ya(l) ? Pl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Ci())), Ot(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Pl(l), u !== null ? (Ot(l), wo(l, u)) : (Ot(l), Ec(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Pl(l), Ot(l), wo(l, u)) : (Ot(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Pl(l), Ot(l), Ec(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (Ue(l), e = I.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), null;
          }
          t = Y.current, ya(l) ? zs(l) : (t = td(n, a, e), l.stateNode = t, Pl(l));
        }
        return Ot(l), null;
      case 5:
        if (Ue(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), null;
          }
          if (u = Y.current, ya(l))
            zs(l);
          else {
            var i = qu(
              I.current
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
            u[kt] = l, u[el] = a;
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
            t: switch (It(u, n, a), n) {
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
        return Ot(l), Ec(
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
          if (t = I.current, ya(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = $t, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[kt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Zr(t.nodeValue, e)), t || he(l, !0);
          } else
            t = qu(t).createTextNode(
              a
            ), t[kt] = l, l.stateNode = t;
        }
        return Ot(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ya(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[kt] = l;
            } else
              Le(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), t = !1;
          } else
            e = Ci(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (gl(l), l) : (gl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ot(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = ya(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[kt] = l;
            } else
              Le(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), n = !1;
          } else
            n = Ci(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (gl(l), l) : (gl(l), null);
        }
        return gl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), Eu(l, l.updateQueue), Ot(l), null);
      case 4:
        return xt(), t === null && Vc(l.stateNode.containerInfo), Ot(l), null;
      case 10:
        return $l(l.type), Ot(l), null;
      case 19:
        if (D(Ht), a = l.memoizedState, a === null) return Ot(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) dn(a, !1);
          else {
            if (Rt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = su(t), u !== null) {
                  for (l.flags |= 128, dn(a, !1), t = u.updateQueue, l.updateQueue = t, Eu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    bs(e, t), e = e.sibling;
                  return B(
                    Ht,
                    Ht.current & 1 | 2
                  ), nt && wl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && rl() > Mu && (l.flags |= 128, n = !0, dn(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = su(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, Eu(l, t), dn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !nt)
                return Ot(l), null;
            } else
              2 * rl() - a.renderingStartTime > Mu && e !== 536870912 && (l.flags |= 128, n = !0, dn(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = rl(), t.sibling = null, e = Ht.current, B(
          Ht,
          n ? e & 1 | 2 : e & 1
        ), nt && wl(l, a.treeForkCount), t) : (Ot(l), null);
      case 22:
      case 23:
        return gl(l), Ki(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ot(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ot(l), e = l.updateQueue, e !== null && Eu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && D(Ve), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), $l(Yt), Ot(l), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, l.tag));
  }
  function Om(t, l) {
    switch (xi(l), l.tag) {
      case 1:
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 3:
        return $l(Yt), xt(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return Ue(l), null;
      case 31:
        if (l.memoizedState !== null) {
          if (gl(l), l.alternate === null)
            throw Error(s(340));
          Le();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 13:
        if (gl(l), t = l.memoizedState, t !== null && t.dehydrated !== null) {
          if (l.alternate === null)
            throw Error(s(340));
          Le();
        }
        return t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 19:
        return D(Ht), null;
      case 4:
        return xt(), null;
      case 10:
        return $l(l.type), null;
      case 22:
      case 23:
        return gl(l), Ki(), t !== null && D(Ve), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return $l(Yt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function ko(t, l) {
    switch (xi(l), l.tag) {
      case 3:
        $l(Yt), xt();
        break;
      case 26:
      case 27:
      case 5:
        Ue(l);
        break;
      case 4:
        xt();
        break;
      case 31:
        l.memoizedState !== null && gl(l);
        break;
      case 13:
        gl(l);
        break;
      case 19:
        D(Ht);
        break;
      case 10:
        $l(l.type);
        break;
      case 22:
      case 23:
        gl(l), Ki(), t !== null && D(Ve);
        break;
      case 24:
        $l(Yt);
    }
  }
  function hn(t, l) {
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
      gt(l, l.return, c);
    }
  }
  function be(t, l, e) {
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
              var o = e, g = c;
              try {
                g();
              } catch (E) {
                gt(
                  n,
                  o,
                  E
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (E) {
      gt(l, l.return, E);
    }
  }
  function $o(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        Ys(l, e);
      } catch (a) {
        gt(t, t.return, a);
      }
    }
  }
  function Wo(t, l, e) {
    e.props = $e(
      t.type,
      t.memoizedProps
    ), e.state = t.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      gt(t, l, a);
    }
  }
  function mn(t, l) {
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
      gt(t, l, n);
    }
  }
  function ql(t, l) {
    var e = t.ref, a = t.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          gt(t, l, n);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          gt(t, l, n);
        }
      else e.current = null;
  }
  function Fo(t) {
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
      gt(t, t.return, n);
    }
  }
  function _c(t, l, e) {
    try {
      var a = t.stateNode;
      km(a, t.type, e, l), a[el] = l;
    } catch (n) {
      gt(t, t.return, n);
    }
  }
  function Io(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Me(t.type) || t.tag === 4;
  }
  function Ac(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Io(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Me(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function zc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Vl));
    else if (a !== 4 && (a === 27 && Me(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (zc(t, l, e), t = t.sibling; t !== null; )
        zc(t, l, e), t = t.sibling;
  }
  function _u(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Me(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (_u(t, l, e), t = t.sibling; t !== null; )
        _u(t, l, e), t = t.sibling;
  }
  function Po(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      It(l, a, e), l[kt] = t, l[el] = e;
    } catch (u) {
      gt(t, t.return, u);
    }
  }
  var te = !1, Lt = !1, Oc = !1, tr = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function Mm(t, l) {
    if (t = t.containerInfo, wc = Vu, t = rs(t), Si(t)) {
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
            var i = 0, c = -1, o = -1, g = 0, E = 0, M = t, S = null;
            l: for (; ; ) {
              for (var T; M !== e || n !== 0 && M.nodeType !== 3 || (c = i + n), M !== u || a !== 0 && M.nodeType !== 3 || (o = i + a), M.nodeType === 3 && (i += M.nodeValue.length), (T = M.firstChild) !== null; )
                S = M, M = T;
              for (; ; ) {
                if (M === t) break l;
                if (S === e && ++g === n && (c = i), S === u && ++E === a && (o = i), (T = M.nextSibling) !== null) break;
                M = S, S = M.parentNode;
              }
              M = T;
            }
            e = c === -1 || o === -1 ? null : { start: c, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (kc = { focusedElem: t, selectionRange: e }, Vu = !1, Kt = l; Kt !== null; )
      if (l = Kt, t = l.child, (l.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = l, Kt = t;
      else
        for (; Kt !== null; ) {
          switch (l = Kt, u = l.alternate, t = l.flags, l.tag) {
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
                  var q = $e(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    q,
                    u
                  ), a.__reactInternalSnapshotBeforeUpdate = t;
                } catch (K) {
                  gt(
                    e,
                    e.return,
                    K
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = l.stateNode.containerInfo, e = t.nodeType, e === 9)
                  Fc(t);
                else if (e === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Fc(t);
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
            t.return = l.return, Kt = t;
            break;
          }
          Kt = l.return;
        }
  }
  function lr(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ee(t, e), a & 4 && hn(5, e);
        break;
      case 1:
        if (ee(t, e), a & 4)
          if (t = e.stateNode, l === null)
            try {
              t.componentDidMount();
            } catch (i) {
              gt(e, e.return, i);
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
              gt(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && $o(e), a & 512 && mn(e, e.return);
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
            Ys(t, l);
          } catch (i) {
            gt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Po(e);
      case 26:
      case 5:
        ee(t, e), l === null && a & 4 && Fo(e), a & 512 && mn(e, e.return);
        break;
      case 12:
        ee(t, e);
        break;
      case 31:
        ee(t, e), a & 4 && nr(t, e);
        break;
      case 13:
        ee(t, e), a & 4 && ur(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Bm.bind(
          null,
          e
        ), ey(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || te, !a) {
          l = l !== null && l.memoizedState !== null || Lt, n = te;
          var u = Lt;
          te = a, (Lt = l) && !u ? ae(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : ee(t, e), te = n, Lt = u;
        }
        break;
      case 30:
        break;
      default:
        ee(t, e);
    }
  }
  function er(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, er(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && ei(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Dt = null, nl = !1;
  function le(t, l, e) {
    for (e = e.child; e !== null; )
      ar(t, l, e), e = e.sibling;
  }
  function ar(t, l, e) {
    if (dl && typeof dl.onCommitFiberUnmount == "function")
      try {
        dl.onCommitFiberUnmount(qa, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Lt || ql(e, l), le(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Lt || ql(e, l);
        var a = Dt, n = nl;
        Me(e.type) && (Dt = e.stateNode, nl = !1), le(
          t,
          l,
          e
        ), _n(e.stateNode), Dt = a, nl = n;
        break;
      case 5:
        Lt || ql(e, l);
      case 6:
        if (a = Dt, n = nl, Dt = null, le(
          t,
          l,
          e
        ), Dt = a, nl = n, Dt !== null)
          if (nl)
            try {
              (Dt.nodeType === 9 ? Dt.body : Dt.nodeName === "HTML" ? Dt.ownerDocument.body : Dt).removeChild(e.stateNode);
            } catch (u) {
              gt(
                e,
                l,
                u
              );
            }
          else
            try {
              Dt.removeChild(e.stateNode);
            } catch (u) {
              gt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        Dt !== null && (nl ? (t = Dt, $r(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ba(t)) : $r(Dt, e.stateNode));
        break;
      case 4:
        a = Dt, n = nl, Dt = e.stateNode.containerInfo, nl = !0, le(
          t,
          l,
          e
        ), Dt = a, nl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        be(2, e, l), Lt || be(4, e, l), le(
          t,
          l,
          e
        );
        break;
      case 1:
        Lt || (ql(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && Wo(
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
        Lt = (a = Lt) || e.memoizedState !== null, le(
          t,
          l,
          e
        ), Lt = a;
        break;
      default:
        le(
          t,
          l,
          e
        );
    }
  }
  function nr(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ba(t);
      } catch (e) {
        gt(l, l.return, e);
      }
    }
  }
  function ur(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ba(t);
      } catch (e) {
        gt(l, l.return, e);
      }
  }
  function Dm(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var l = t.stateNode;
        return l === null && (l = t.stateNode = new tr()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new tr()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Au(t, l) {
    var e = Dm(t);
    l.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var n = qm.bind(null, t, a);
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
              if (Me(c.type)) {
                Dt = c.stateNode, nl = !1;
                break t;
              }
              break;
            case 5:
              Dt = c.stateNode, nl = !1;
              break t;
            case 3:
            case 4:
              Dt = c.stateNode.containerInfo, nl = !0;
              break t;
          }
          c = c.return;
        }
        if (Dt === null) throw Error(s(160));
        ar(u, i, n), Dt = null, nl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        ir(l, t), l = l.sibling;
  }
  var Cl = null;
  function ir(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(l, t), il(t), a & 4 && (be(3, t, t.return), hn(3, t), be(5, t, t.return));
        break;
      case 1:
        ul(l, t), il(t), a & 512 && (Lt || e === null || ql(e, e.return)), a & 64 && te && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Cl;
        if (ul(l, t), il(t), a & 512 && (Lt || e === null || ql(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Xa] || u[kt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), It(u, a, e), u[kt] = t, Vt(u), a = u;
                      break t;
                    case "link":
                      var i = id(
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
                      u = n.createElement(a), It(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = id(
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
                      u = n.createElement(a), It(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[kt] = t, Vt(u), a = u;
                }
                t.stateNode = a;
              } else
                cd(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = ud(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? cd(
              n,
              t.type,
              t.stateNode
            ) : ud(
              n,
              a,
              t.memoizedProps
            )) : a === null && t.stateNode !== null && _c(
              t,
              t.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        ul(l, t), il(t), a & 512 && (Lt || e === null || ql(e, e.return)), e !== null && a & 4 && _c(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ul(l, t), il(t), a & 512 && (Lt || e === null || ql(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            ua(n, "");
          } catch (q) {
            gt(t, t.return, q);
          }
        }
        a & 4 && t.stateNode != null && (n = t.memoizedProps, _c(
          t,
          n,
          e !== null ? e.memoizedProps : n
        )), a & 1024 && (Oc = !0);
        break;
      case 6:
        if (ul(l, t), il(t), a & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          a = t.memoizedProps, e = t.stateNode;
          try {
            e.nodeValue = a;
          } catch (q) {
            gt(t, t.return, q);
          }
        }
        break;
      case 3:
        if (Xu = null, n = Cl, Cl = Yu(l.containerInfo), ul(l, t), Cl = n, il(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ba(l.containerInfo);
          } catch (q) {
            gt(t, t.return, q);
          }
        Oc && (Oc = !1, cr(t));
        break;
      case 4:
        a = Cl, Cl = Yu(
          t.stateNode.containerInfo
        ), ul(l, t), il(t), Cl = a;
        break;
      case 12:
        ul(l, t), il(t);
        break;
      case 31:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Au(t, a)));
        break;
      case 13:
        ul(l, t), il(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Ou = rl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Au(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, g = te, E = Lt;
        if (te = g || n, Lt = E || o, ul(l, t), Lt = E, te = g, il(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || o || te || Lt || We(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (u = o.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = o.stateNode;
                    var M = o.memoizedProps.style, S = M != null && M.hasOwnProperty("display") ? M.display : null;
                    c.style.display = S == null || typeof S == "boolean" ? "" : ("" + S).trim();
                  }
                } catch (q) {
                  gt(o, o.return, q);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (q) {
                  gt(o, o.return, q);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var T = o.stateNode;
                  n ? Wr(T, !0) : Wr(o.stateNode, !1);
                } catch (q) {
                  gt(o, o.return, q);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Au(t, e))));
        break;
      case 19:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Au(t, a)));
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
          if (Io(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Ac(t);
            _u(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (ua(i, ""), e.flags &= -33);
            var c = Ac(t);
            _u(t, c, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, g = Ac(t);
            zc(
              t,
              g,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (E) {
        gt(t, t.return, E);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function cr(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        cr(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function ee(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        lr(t, l.alternate, l), l = l.sibling;
  }
  function We(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          be(4, l, l.return), We(l);
          break;
        case 1:
          ql(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && Wo(
            l,
            l.return,
            e
          ), We(l);
          break;
        case 27:
          _n(l.stateNode);
        case 26:
        case 5:
          ql(l, l.return), We(l);
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
          ), hn(4, u);
          break;
        case 1:
          if (ae(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (g) {
              gt(a, a.return, g);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  qs(o[n], c);
            } catch (g) {
              gt(a, a.return, g);
            }
          }
          e && i & 64 && $o(u), mn(u, u.return);
          break;
        case 27:
          Po(u);
        case 26:
        case 5:
          ae(
            n,
            u,
            e
          ), e && a === null && i & 4 && Fo(u), mn(u, u.return);
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
          ), e && i & 4 && nr(n, u);
          break;
        case 13:
          ae(
            n,
            u,
            e
          ), e && i & 4 && ur(n, u);
          break;
        case 22:
          u.memoizedState === null && ae(
            n,
            u,
            e
          ), mn(u, u.return);
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
  function Mc(t, l) {
    var e = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Pa(e));
  }
  function Dc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t));
  }
  function Ul(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        fr(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function fr(t, l, e, a) {
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
        ), n & 2048 && hn(9, l);
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
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Pa(t)));
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
          } catch (o) {
            gt(l, l.return, o);
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
        ) : yn(t, l) : u._visibility & 2 ? Ul(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, za(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Mc(i, l);
        break;
      case 24:
        Ul(
          t,
          l,
          e,
          a
        ), n & 2048 && Dc(l.alternate, l);
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
  function za(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, c = e, o = a, g = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          za(
            u,
            i,
            c,
            o,
            n
          ), hn(8, i);
          break;
        case 23:
          break;
        case 22:
          var E = i.stateNode;
          i.memoizedState !== null ? E._visibility & 2 ? za(
            u,
            i,
            c,
            o,
            n
          ) : yn(
            u,
            i
          ) : (E._visibility |= 2, za(
            u,
            i,
            c,
            o,
            n
          )), n && g & 2048 && Mc(
            i.alternate,
            i
          );
          break;
        case 24:
          za(
            u,
            i,
            c,
            o,
            n
          ), n && g & 2048 && Dc(i.alternate, i);
          break;
        default:
          za(
            u,
            i,
            c,
            o,
            n
          );
      }
      l = l.sibling;
    }
  }
  function yn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            yn(e, a), n & 2048 && Mc(
              a.alternate,
              a
            );
            break;
          case 24:
            yn(e, a), n & 2048 && Dc(a.alternate, a);
            break;
          default:
            yn(e, a);
        }
        l = l.sibling;
      }
  }
  var vn = 8192;
  function Oa(t, l, e) {
    if (t.subtreeFlags & vn)
      for (t = t.child; t !== null; )
        sr(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function sr(t, l, e) {
    switch (t.tag) {
      case 26:
        Oa(
          t,
          l,
          e
        ), t.flags & vn && t.memoizedState !== null && my(
          e,
          Cl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Oa(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Cl;
        Cl = Yu(t.stateNode.containerInfo), Oa(
          t,
          l,
          e
        ), Cl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = vn, vn = 16777216, Oa(
          t,
          l,
          e
        ), vn = a) : Oa(
          t,
          l,
          e
        ));
        break;
      default:
        Oa(
          t,
          l,
          e
        );
    }
  }
  function or(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function gn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Kt = a, dr(
            a,
            t
          );
        }
      or(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        rr(t), t = t.sibling;
  }
  function rr(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        gn(t), t.flags & 2048 && be(9, t, t.return);
        break;
      case 3:
        gn(t);
        break;
      case 12:
        gn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, zu(t)) : gn(t);
        break;
      default:
        gn(t);
    }
  }
  function zu(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Kt = a, dr(
            a,
            t
          );
        }
      or(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          be(8, l, l.return), zu(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, zu(l));
          break;
        default:
          zu(l);
      }
      t = t.sibling;
    }
  }
  function dr(t, l) {
    for (; Kt !== null; ) {
      var e = Kt;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          be(8, e, l);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Pa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Kt = a;
      else
        t: for (e = t; Kt !== null; ) {
          a = Kt;
          var n = a.sibling, u = a.return;
          if (er(a), a === e) {
            Kt = null;
            break t;
          }
          if (n !== null) {
            n.return = u, Kt = n;
            break t;
          }
          Kt = u;
        }
    }
  }
  var Nm = {
    getCacheForType: function(t) {
      var l = Wt(Yt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return Wt(Yt).controller.signal;
    }
  }, xm = typeof WeakMap == "function" ? WeakMap : Map, dt = 0, Et = null, P = null, et = 0, vt = 0, pl = null, Te = !1, Ma = !1, Nc = !1, ne = 0, Rt = 0, Ee = 0, Fe = 0, xc = 0, Sl = 0, Da = 0, pn = null, cl = null, jc = !1, Ou = 0, hr = 0, Mu = 1 / 0, Du = null, _e = null, Qt = 0, Ae = null, Na = null, ue = 0, Cc = 0, Uc = null, mr = null, Sn = 0, Rc = null;
  function bl() {
    return (dt & 2) !== 0 && et !== 0 ? et & -et : _.T !== null ? Xc() : Nf();
  }
  function yr() {
    if (Sl === 0)
      if ((et & 536870912) === 0 || nt) {
        var t = Bn;
        Bn <<= 1, (Bn & 3932160) === 0 && (Bn = 262144), Sl = t;
      } else Sl = 536870912;
    return t = vl.current, t !== null && (t.flags |= 32), Sl;
  }
  function fl(t, l, e) {
    (t === Et && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null) && (xa(t, 0), ze(
      t,
      et,
      Sl,
      !1
    )), Ga(t, e), ((dt & 2) === 0 || t !== Et) && (t === Et && ((dt & 2) === 0 && (Fe |= e), Rt === 4 && ze(
      t,
      et,
      Sl,
      !1
    )), Yl(t));
  }
  function vr(t, l, e) {
    if ((dt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ya(t, l), n = a ? Um(t, l) : Bc(t, l, !0), u = a;
    do {
      if (n === 0) {
        Ma && !a && ze(t, l, 0, !1);
        break;
      } else {
        if (e = t.current.alternate, u && !jm(e)) {
          n = Bc(t, l, !1), u = !1;
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
              n = pn;
              var o = c.current.memoizedState.isDehydrated;
              if (o && (xa(c, i).flags |= 256), i = Bc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Nc && !o) {
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
          xa(t, 0), ze(t, l, 0, !0);
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
              ze(
                a,
                l,
                Sl,
                !Te
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
          if ((l & 62914560) === l && (n = Ou + 300 - rl(), 10 < n)) {
            if (ze(
              a,
              l,
              Sl,
              !Te
            ), Yn(a, 0, !0) !== 0) break t;
            ue = l, a.timeoutHandle = wr(
              gr.bind(
                null,
                a,
                e,
                cl,
                Du,
                jc,
                l,
                Sl,
                Fe,
                Da,
                Te,
                u,
                "Throttled",
                -0,
                0
              ),
              n
            );
            break t;
          }
          gr(
            a,
            e,
            cl,
            Du,
            jc,
            l,
            Sl,
            Fe,
            Da,
            Te,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Yl(t);
  }
  function gr(t, l, e, a, n, u, i, c, o, g, E, M, S, T) {
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
      }, sr(
        l,
        u,
        M
      );
      var q = (u & 62914560) === u ? Ou - rl() : (u & 4194048) === u ? hr - rl() : 0;
      if (q = yy(
        M,
        q
      ), q !== null) {
        ue = u, t.cancelPendingCommit = q(
          zr.bind(
            null,
            t,
            l,
            u,
            e,
            a,
            n,
            i,
            c,
            o,
            E,
            M,
            null,
            S,
            T
          )
        ), ze(t, u, i, !g);
        return;
      }
    }
    zr(
      t,
      l,
      u,
      e,
      a,
      n,
      i,
      c,
      o
    );
  }
  function jm(t) {
    for (var l = t; ; ) {
      var e = l.tag;
      if ((e === 0 || e === 11 || e === 15) && l.flags & 16384 && (e = l.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var n = e[a], u = n.getSnapshot;
          n = n.value;
          try {
            if (!ml(u(), n)) return !1;
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
  function ze(t, l, e, a) {
    l &= ~xc, l &= ~Fe, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - hl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && Of(t, e, l);
  }
  function Nu() {
    return (dt & 6) === 0 ? (bn(0), !1) : !0;
  }
  function Hc() {
    if (P !== null) {
      if (vt === 0)
        var t = P.return;
      else
        t = P, kl = Qe = null, Fi(t), ba = null, ln = 0, t = P;
      for (; t !== null; )
        ko(t.alternate, t), t = t.return;
      P = null;
    }
  }
  function xa(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Fm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ue = 0, Hc(), Et = t, P = e = Jl(t.current, null), et = l, vt = 0, pl = null, Te = !1, Ma = Ya(t, l), Nc = !1, Da = Sl = xc = Fe = Ee = Rt = 0, cl = pn = null, jc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - hl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return ne = l, Wn(), e;
  }
  function pr(t, l) {
    $ = null, _.H = on, l === Sa || l === nu ? (l = Us(), vt = 3) : l === Gi ? (l = Us(), vt = 4) : vt = l === hc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, pl = l, P === null && (Rt = 1, pu(
      t,
      Al(l, t.current)
    ));
  }
  function Sr() {
    var t = vl.current;
    return t === null ? !0 : (et & 4194048) === et ? Dl === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === Dl : !1;
  }
  function br() {
    var t = _.H;
    return _.H = on, t === null ? on : t;
  }
  function Tr() {
    var t = _.A;
    return _.A = Nm, t;
  }
  function xu() {
    Rt = 4, Te || (et & 4194048) !== et && vl.current !== null || (Ma = !0), (Ee & 134217727) === 0 && (Fe & 134217727) === 0 || Et === null || ze(
      Et,
      et,
      Sl,
      !1
    );
  }
  function Bc(t, l, e) {
    var a = dt;
    dt |= 2;
    var n = br(), u = Tr();
    (Et !== t || et !== l) && (Du = null, xa(t, l)), l = !1;
    var i = Rt;
    t: do
      try {
        if (vt !== 0 && P !== null) {
          var c = P, o = pl;
          switch (vt) {
            case 8:
              Hc(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              vl.current === null && (l = !0);
              var g = vt;
              if (vt = 0, pl = null, ja(t, c, o, g), e && Ma) {
                i = 0;
                break t;
              }
              break;
            default:
              g = vt, vt = 0, pl = null, ja(t, c, o, g);
          }
        }
        Cm(), i = Rt;
        break;
      } catch (E) {
        pr(t, E);
      }
    while (!0);
    return l && t.shellSuspendCounter++, kl = Qe = null, dt = a, _.H = n, _.A = u, P === null && (Et = null, et = 0, Wn()), i;
  }
  function Cm() {
    for (; P !== null; ) Er(P);
  }
  function Um(t, l) {
    var e = dt;
    dt |= 2;
    var a = br(), n = Tr();
    Et !== t || et !== l ? (Du = null, Mu = rl() + 500, xa(t, l)) : Ma = Ya(
      t,
      l
    );
    t: do
      try {
        if (vt !== 0 && P !== null) {
          l = P;
          var u = pl;
          l: switch (vt) {
            case 1:
              vt = 0, pl = null, ja(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (js(u)) {
                vt = 0, pl = null, _r(l);
                break;
              }
              l = function() {
                vt !== 2 && vt !== 9 || Et !== t || (vt = 7), Yl(t);
              }, u.then(l, l);
              break t;
            case 3:
              vt = 7;
              break t;
            case 4:
              vt = 5;
              break t;
            case 7:
              js(u) ? (vt = 0, pl = null, _r(l)) : (vt = 0, pl = null, ja(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (P.tag) {
                case 26:
                  i = P.memoizedState;
                case 5:
                case 27:
                  var c = P;
                  if (i ? fd(i) : c.stateNode.complete) {
                    vt = 0, pl = null;
                    var o = c.sibling;
                    if (o !== null) P = o;
                    else {
                      var g = c.return;
                      g !== null ? (P = g, ju(g)) : P = null;
                    }
                    break l;
                  }
              }
              vt = 0, pl = null, ja(t, l, u, 5);
              break;
            case 6:
              vt = 0, pl = null, ja(t, l, u, 6);
              break;
            case 8:
              Hc(), Rt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Rm();
        break;
      } catch (E) {
        pr(t, E);
      }
    while (!0);
    return kl = Qe = null, _.H = a, _.A = n, dt = e, P !== null ? 0 : (Et = null, et = 0, Wn(), Rt);
  }
  function Rm() {
    for (; P !== null && !ah(); )
      Er(P);
  }
  function Er(t) {
    var l = Jo(t.alternate, t, ne);
    t.memoizedProps = t.pendingProps, l === null ? ju(t) : P = l;
  }
  function _r(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Xo(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          et
        );
        break;
      case 11:
        l = Xo(
          e,
          l,
          l.pendingProps,
          l.type.render,
          l.ref,
          et
        );
        break;
      case 5:
        Fi(l);
      default:
        ko(e, l), l = P = bs(l, ne), l = Jo(e, l, ne);
    }
    t.memoizedProps = t.pendingProps, l === null ? ju(t) : P = l;
  }
  function ja(t, l, e, a) {
    kl = Qe = null, Fi(l), ba = null, ln = 0;
    var n = l.return;
    try {
      if (Em(
        t,
        n,
        l,
        e,
        et
      )) {
        Rt = 1, pu(
          t,
          Al(e, t.current)
        ), P = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw P = n, u;
      Rt = 1, pu(
        t,
        Al(e, t.current)
      ), P = null;
      return;
    }
    l.flags & 32768 ? (nt || a === 1 ? t = !0 : Ma || (et & 536870912) !== 0 ? t = !1 : (Te = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = vl.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Ar(l, t)) : ju(l);
  }
  function ju(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        Ar(
          l,
          Te
        );
        return;
      }
      t = l.return;
      var e = zm(
        l.alternate,
        l,
        ne
      );
      if (e !== null) {
        P = e;
        return;
      }
      if (l = l.sibling, l !== null) {
        P = l;
        return;
      }
      P = l = t;
    } while (l !== null);
    Rt === 0 && (Rt = 5);
  }
  function Ar(t, l) {
    do {
      var e = Om(t.alternate, t);
      if (e !== null) {
        e.flags &= 32767, P = e;
        return;
      }
      if (e = t.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !l && (t = t.sibling, t !== null)) {
        P = t;
        return;
      }
      P = t = e;
    } while (t !== null);
    Rt = 6, P = null;
  }
  function zr(t, l, e, a, n, u, i, c, o) {
    t.cancelPendingCommit = null;
    do
      Cu();
    while (Qt !== 0);
    if ((dt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (u = l.lanes | l.childLanes, u |= Ai, hh(
        t,
        e,
        u,
        i,
        c,
        o
      ), t === Et && (P = Et = null, et = 0), Na = l, Ae = t, ue = e, Cc = u, Uc = n, mr = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Ym(Rn, function() {
        return xr(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = H.p, H.p = 2, i = dt, dt |= 4;
        try {
          Mm(t, l, e);
        } finally {
          dt = i, H.p = n, _.T = a;
        }
      }
      Qt = 1, Or(), Mr(), Dr();
    }
  }
  function Or() {
    if (Qt === 1) {
      Qt = 0;
      var t = Ae, l = Na, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = _.T, _.T = null;
        var a = H.p;
        H.p = 2;
        var n = dt;
        dt |= 4;
        try {
          ir(l, t);
          var u = kc, i = rs(t.containerInfo), c = u.focusedElem, o = u.selectionRange;
          if (i !== c && c && c.ownerDocument && os(
            c.ownerDocument.documentElement,
            c
          )) {
            if (o !== null && Si(c)) {
              var g = o.start, E = o.end;
              if (E === void 0 && (E = g), "selectionStart" in c)
                c.selectionStart = g, c.selectionEnd = Math.min(
                  E,
                  c.value.length
                );
              else {
                var M = c.ownerDocument || document, S = M && M.defaultView || window;
                if (S.getSelection) {
                  var T = S.getSelection(), q = c.textContent.length, K = Math.min(o.start, q), bt = o.end === void 0 ? K : Math.min(o.end, q);
                  !T.extend && K > bt && (i = bt, bt = K, K = i);
                  var h = ss(
                    c,
                    K
                  ), r = ss(
                    c,
                    bt
                  );
                  if (h && r && (T.rangeCount !== 1 || T.anchorNode !== h.node || T.anchorOffset !== h.offset || T.focusNode !== r.node || T.focusOffset !== r.offset)) {
                    var v = M.createRange();
                    v.setStart(h.node, h.offset), T.removeAllRanges(), K > bt ? (T.addRange(v), T.extend(r.node, r.offset)) : (v.setEnd(r.node, r.offset), T.addRange(v));
                  }
                }
              }
            }
            for (M = [], T = c; T = T.parentNode; )
              T.nodeType === 1 && M.push({
                element: T,
                left: T.scrollLeft,
                top: T.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < M.length; c++) {
              var O = M[c];
              O.element.scrollLeft = O.left, O.element.scrollTop = O.top;
            }
          }
          Vu = !!wc, kc = wc = null;
        } finally {
          dt = n, H.p = a, _.T = e;
        }
      }
      t.current = l, Qt = 2;
    }
  }
  function Mr() {
    if (Qt === 2) {
      Qt = 0;
      var t = Ae, l = Na, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = _.T, _.T = null;
        var a = H.p;
        H.p = 2;
        var n = dt;
        dt |= 4;
        try {
          lr(t, l.alternate, l);
        } finally {
          dt = n, H.p = a, _.T = e;
        }
      }
      Qt = 3;
    }
  }
  function Dr() {
    if (Qt === 4 || Qt === 3) {
      Qt = 0, nh();
      var t = Ae, l = Na, e = ue, a = mr;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Qt = 5 : (Qt = 0, Na = Ae = null, Nr(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (_e = null), ti(e), l = l.stateNode, dl && typeof dl.onCommitFiberRoot == "function")
        try {
          dl.onCommitFiberRoot(
            qa,
            l,
            void 0,
            (l.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        l = _.T, n = H.p, H.p = 2, _.T = null;
        try {
          for (var u = t.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            u(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          _.T = l, H.p = n;
        }
      }
      (ue & 3) !== 0 && Cu(), Yl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === Rc ? Sn++ : (Sn = 0, Rc = t) : Sn = 0, bn(0);
    }
  }
  function Nr(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Pa(l)));
  }
  function Cu() {
    return Or(), Mr(), Dr(), xr();
  }
  function xr() {
    if (Qt !== 5) return !1;
    var t = Ae, l = Cc;
    Cc = 0;
    var e = ti(ue), a = _.T, n = H.p;
    try {
      H.p = 32 > e ? 32 : e, _.T = null, e = Uc, Uc = null;
      var u = Ae, i = ue;
      if (Qt = 0, Na = Ae = null, ue = 0, (dt & 6) !== 0) throw Error(s(331));
      var c = dt;
      if (dt |= 4, rr(u.current), fr(
        u,
        u.current,
        i,
        e
      ), dt = c, bn(0, !1), dl && typeof dl.onPostCommitFiberRoot == "function")
        try {
          dl.onPostCommitFiberRoot(qa, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = n, _.T = a, Nr(t, l);
    }
  }
  function jr(t, l, e) {
    l = Al(e, l), l = dc(t.stateNode, l, 2), t = ge(t, l, 2), t !== null && (Ga(t, 2), Yl(t));
  }
  function gt(t, l, e) {
    if (t.tag === 3)
      jr(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          jr(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (_e === null || !_e.has(a))) {
            t = Al(e, t), e = Co(2), a = ge(l, e, 2), a !== null && (Uo(
              e,
              a,
              l,
              t
            ), Ga(a, 2), Yl(a));
            break;
          }
        }
        l = l.return;
      }
  }
  function qc(t, l, e) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new xm();
      var n = /* @__PURE__ */ new Set();
      a.set(l, n);
    } else
      n = a.get(l), n === void 0 && (n = /* @__PURE__ */ new Set(), a.set(l, n));
    n.has(e) || (Nc = !0, n.add(e), t = Hm.bind(null, t, l, e), l.then(t, t));
  }
  function Hm(t, l, e) {
    var a = t.pingCache;
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, Et === t && (et & e) === e && (Rt === 4 || Rt === 3 && (et & 62914560) === et && 300 > rl() - Ou ? (dt & 2) === 0 && xa(t, 0) : xc |= e, Da === et && (Da = 0)), Yl(t);
  }
  function Cr(t, l) {
    l === 0 && (l = zf()), t = Ge(t, l), t !== null && (Ga(t, l), Yl(t));
  }
  function Bm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), Cr(t, e);
  }
  function qm(t, l) {
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
    a !== null && a.delete(l), Cr(t, e);
  }
  function Ym(t, l) {
    return Rl(t, l);
  }
  var Uu = null, Ca = null, Yc = !1, Ru = !1, Gc = !1, Oe = 0;
  function Yl(t) {
    t !== Ca && t.next === null && (Ca === null ? Uu = Ca = t : Ca = Ca.next = t), Ru = !0, Yc || (Yc = !0, Xm());
  }
  function bn(t, l) {
    if (!Gc && Ru) {
      Gc = !0;
      do
        for (var e = !1, a = Uu; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              u = (1 << 31 - hl(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Br(a, u));
          } else
            u = et, u = Yn(
              a,
              a === Et ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Ya(a, u) || (e = !0, Br(a, u));
          a = a.next;
        }
      while (e);
      Gc = !1;
    }
  }
  function Gm() {
    Ur();
  }
  function Ur() {
    Ru = Yc = !1;
    var t = 0;
    Oe !== 0 && Wm() && (t = Oe);
    for (var l = rl(), e = null, a = Uu; a !== null; ) {
      var n = a.next, u = Rr(a, l);
      u === 0 ? (a.next = null, e === null ? Uu = n : e.next = n, n === null && (Ca = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Ru = !0)), a = n;
    }
    Qt !== 0 && Qt !== 5 || bn(t), Oe !== 0 && (Oe = 0);
  }
  function Rr(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - hl(u), c = 1 << i, o = n[i];
      o === -1 ? ((c & e) === 0 || (c & a) !== 0) && (n[i] = dh(c, l)) : o <= l && (t.expiredLanes |= c), u &= ~c;
    }
    if (l = Et, e = et, e = Yn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Ql(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ya(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Ql(a), ti(e)) {
        case 2:
        case 8:
          e = _f;
          break;
        case 32:
          e = Rn;
          break;
        case 268435456:
          e = Af;
          break;
        default:
          e = Rn;
      }
      return a = Hr.bind(null, t), e = Rl(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Ql(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Hr(t, l) {
    if (Qt !== 0 && Qt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (Cu() && t.callbackNode !== e)
      return null;
    var a = et;
    return a = Yn(
      t,
      t === Et ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (vr(t, a, l), Rr(t, rl()), t.callbackNode != null && t.callbackNode === e ? Hr.bind(null, t) : null);
  }
  function Br(t, l) {
    if (Cu()) return null;
    vr(t, l, !0);
  }
  function Xm() {
    Im(function() {
      (dt & 6) !== 0 ? Rl(
        Ef,
        Gm
      ) : Ur();
    });
  }
  function Xc() {
    if (Oe === 0) {
      var t = ga;
      t === 0 && (t = Hn, Hn <<= 1, (Hn & 261888) === 0 && (Hn = 256)), Oe = t;
    }
    return Oe;
  }
  function qr(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Qn("" + t);
  }
  function Yr(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Lm(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = qr(
        (n[el] || null).action
      ), i = a.submitter;
      i && (l = (l = i[el] || null) ? qr(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var c = new Jn(
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
                if (Oe !== 0) {
                  var o = i ? Yr(n, i) : new FormData(n);
                  ic(
                    e,
                    {
                      pending: !0,
                      data: o,
                      method: n.method,
                      action: u
                    },
                    null,
                    o
                  );
                }
              } else
                typeof u == "function" && (c.preventDefault(), o = i ? Yr(n, i) : new FormData(n), ic(
                  e,
                  {
                    pending: !0,
                    data: o,
                    method: n.method,
                    action: u
                  },
                  u,
                  o
                ));
            },
            currentTarget: n
          }
        ]
      });
    }
  }
  for (var Lc = 0; Lc < _i.length; Lc++) {
    var Qc = _i[Lc], Qm = Qc.toLowerCase(), Zm = Qc[0].toUpperCase() + Qc.slice(1);
    jl(
      Qm,
      "on" + Zm
    );
  }
  jl(ms, "onAnimationEnd"), jl(ys, "onAnimationIteration"), jl(vs, "onAnimationStart"), jl("dblclick", "onDoubleClick"), jl("focusin", "onFocus"), jl("focusout", "onBlur"), jl(um, "onTransitionRun"), jl(im, "onTransitionStart"), jl(cm, "onTransitionCancel"), jl(gs, "onTransitionEnd"), aa("onMouseEnter", ["mouseout", "mouseover"]), aa("onMouseLeave", ["mouseout", "mouseover"]), aa("onPointerEnter", ["pointerout", "pointerover"]), aa("onPointerLeave", ["pointerout", "pointerover"]), He(
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
  var Tn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Vm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Tn)
  );
  function Gr(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], o = c.instance, g = c.currentTarget;
            if (c = c.listener, o !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = g;
            try {
              u(n);
            } catch (E) {
              $n(E);
            }
            n.currentTarget = null, u = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], o = c.instance, g = c.currentTarget, c = c.listener, o !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = g;
            try {
              u(n);
            } catch (E) {
              $n(E);
            }
            n.currentTarget = null, u = o;
          }
      }
    }
  }
  function tt(t, l) {
    var e = l[li];
    e === void 0 && (e = l[li] = /* @__PURE__ */ new Set());
    var a = t + "__bubble";
    e.has(a) || (Xr(l, t, 2, !1), e.add(a));
  }
  function Zc(t, l, e) {
    var a = 0;
    l && (a |= 4), Xr(
      e,
      t,
      a,
      l
    );
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function Vc(t) {
    if (!t[Hu]) {
      t[Hu] = !0, Cf.forEach(function(e) {
        e !== "selectionchange" && (Vm.has(e) || Zc(e, !1, t), Zc(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Hu] || (l[Hu] = !0, Zc("selectionchange", !1, l));
    }
  }
  function Xr(t, l, e, a) {
    switch (yd(l)) {
      case 2:
        var n = py;
        break;
      case 8:
        n = Sy;
        break;
      default:
        n = uf;
    }
    e = n.bind(
      null,
      l,
      e,
      t
    ), n = void 0, !oi || l !== "touchstart" && l !== "touchmove" && l !== "wheel" || (n = !0), a ? n !== void 0 ? t.addEventListener(l, e, {
      capture: !0,
      passive: n
    }) : t.addEventListener(l, e, !0) : n !== void 0 ? t.addEventListener(l, e, {
      passive: n
    }) : t.addEventListener(l, e, !1);
  }
  function Kc(t, l, e, a, n) {
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
              var o = i.tag;
              if ((o === 3 || o === 4) && i.stateNode.containerInfo === n)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = ta(c), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Vf(function() {
      var g = u, E = fi(e), M = [];
      t: {
        var S = ps.get(t);
        if (S !== void 0) {
          var T = Jn, q = t;
          switch (t) {
            case "keypress":
              if (Vn(e) === 0) break t;
            case "keydown":
            case "keyup":
              T = qh;
              break;
            case "focusin":
              q = "focus", T = mi;
              break;
            case "focusout":
              q = "blur", T = mi;
              break;
            case "beforeblur":
            case "afterblur":
              T = mi;
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
              T = wf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              T = zh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              T = Xh;
              break;
            case ms:
            case ys:
            case vs:
              T = Dh;
              break;
            case gs:
              T = Qh;
              break;
            case "scroll":
            case "scrollend":
              T = _h;
              break;
            case "wheel":
              T = Vh;
              break;
            case "copy":
            case "cut":
            case "paste":
              T = xh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              T = $f;
              break;
            case "toggle":
            case "beforetoggle":
              T = Jh;
          }
          var K = (l & 4) !== 0, bt = !K && (t === "scroll" || t === "scrollend"), h = K ? S !== null ? S + "Capture" : null : S;
          K = [];
          for (var r = g, v; r !== null; ) {
            var O = r;
            if (v = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || v === null || h === null || (O = Qa(r, h), O != null && K.push(
              En(r, O, v)
            )), bt) break;
            r = r.return;
          }
          0 < K.length && (S = new T(
            S,
            q,
            null,
            e,
            E
          ), M.push({ event: S, listeners: K }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (S = t === "mouseover" || t === "pointerover", T = t === "mouseout" || t === "pointerout", S && e !== ci && (q = e.relatedTarget || e.fromElement) && (ta(q) || q[Pe]))
            break t;
          if ((T || S) && (S = E.window === E ? E : (S = E.ownerDocument) ? S.defaultView || S.parentWindow : window, T ? (q = e.relatedTarget || e.toElement, T = g, q = q ? ta(q) : null, q !== null && (bt = x(q), K = q.tag, q !== bt || K !== 5 && K !== 27 && K !== 6) && (q = null)) : (T = null, q = g), T !== q)) {
            if (K = wf, O = "onMouseLeave", h = "onMouseEnter", r = "mouse", (t === "pointerout" || t === "pointerover") && (K = $f, O = "onPointerLeave", h = "onPointerEnter", r = "pointer"), bt = T == null ? S : La(T), v = q == null ? S : La(q), S = new K(
              O,
              r + "leave",
              T,
              e,
              E
            ), S.target = bt, S.relatedTarget = v, O = null, ta(E) === g && (K = new K(
              h,
              r + "enter",
              q,
              e,
              E
            ), K.target = v, K.relatedTarget = bt, O = K), bt = O, T && q)
              l: {
                for (K = Km, h = T, r = q, v = 0, O = h; O; O = K(O))
                  v++;
                O = 0;
                for (var Z = r; Z; Z = K(Z))
                  O++;
                for (; 0 < v - O; )
                  h = K(h), v--;
                for (; 0 < O - v; )
                  r = K(r), O--;
                for (; v--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    K = h;
                    break l;
                  }
                  h = K(h), r = K(r);
                }
                K = null;
              }
            else K = null;
            T !== null && Lr(
              M,
              S,
              T,
              K,
              !1
            ), q !== null && bt !== null && Lr(
              M,
              bt,
              q,
              K,
              !0
            );
          }
        }
        t: {
          if (S = g ? La(g) : window, T = S.nodeName && S.nodeName.toLowerCase(), T === "select" || T === "input" && S.type === "file")
            var ft = as;
          else if (ls(S))
            if (ns)
              ft = em;
            else {
              ft = tm;
              var G = Ph;
            }
          else
            T = S.nodeName, !T || T.toLowerCase() !== "input" || S.type !== "checkbox" && S.type !== "radio" ? g && ii(g.elementType) && (ft = as) : ft = lm;
          if (ft && (ft = ft(t, g))) {
            es(
              M,
              ft,
              e,
              E
            );
            break t;
          }
          G && G(t, S, g), t === "focusout" && g && S.type === "number" && g.memoizedProps.value != null && ui(S, "number", S.value);
        }
        switch (G = g ? La(g) : window, t) {
          case "focusin":
            (ls(G) || G.contentEditable === "true") && (sa = G, bi = g, Wa = null);
            break;
          case "focusout":
            Wa = bi = sa = null;
            break;
          case "mousedown":
            Ti = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ti = !1, ds(M, e, E);
            break;
          case "selectionchange":
            if (nm) break;
          case "keydown":
          case "keyup":
            ds(M, e, E);
        }
        var F;
        if (vi)
          t: {
            switch (t) {
              case "compositionstart":
                var at = "onCompositionStart";
                break t;
              case "compositionend":
                at = "onCompositionEnd";
                break t;
              case "compositionupdate":
                at = "onCompositionUpdate";
                break t;
            }
            at = void 0;
          }
        else
          fa ? Pf(t, e) && (at = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (at = "onCompositionStart");
        at && (Wf && e.locale !== "ko" && (fa || at !== "onCompositionStart" ? at === "onCompositionEnd" && fa && (F = Kf()) : (oe = E, ri = "value" in oe ? oe.value : oe.textContent, fa = !0)), G = Bu(g, at), 0 < G.length && (at = new kf(
          at,
          t,
          null,
          e,
          E
        ), M.push({ event: at, listeners: G }), F ? at.data = F : (F = ts(e), F !== null && (at.data = F)))), (F = kh ? $h(t, e) : Wh(t, e)) && (at = Bu(g, "onBeforeInput"), 0 < at.length && (G = new kf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          E
        ), M.push({
          event: G,
          listeners: at
        }), G.data = F)), Lm(
          M,
          t,
          g,
          e,
          E
        );
      }
      Gr(M, l);
    });
  }
  function En(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Bu(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Qa(t, e), n != null && a.unshift(
        En(t, n, u)
      ), n = Qa(t, l), n != null && a.push(
        En(t, n, u)
      )), t.tag === 3) return a;
      t = t.return;
    }
    return [];
  }
  function Km(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Lr(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, o = c.alternate, g = c.stateNode;
      if (c = c.tag, o !== null && o === a) break;
      c !== 5 && c !== 26 && c !== 27 || g === null || (o = g, n ? (g = Qa(e, u), g != null && i.unshift(
        En(e, g, o)
      )) : n || (g = Qa(e, u), g != null && i.push(
        En(e, g, o)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Jm = /\r\n?/g, wm = /\u0000|\uFFFD/g;
  function Qr(t) {
    return (typeof t == "string" ? t : "" + t).replace(Jm, `
`).replace(wm, "");
  }
  function Zr(t, l) {
    return l = Qr(l), Qr(t) === l;
  }
  function St(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || ua(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && ua(t, "" + a);
        break;
      case "className":
        Xn(t, "class", a);
        break;
      case "tabIndex":
        Xn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Xn(t, e, a);
        break;
      case "style":
        Qf(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Xn(t, "data", a);
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
        a = Qn("" + a), t.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (l !== "input" && St(t, l, "name", n.name, n, null), St(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), St(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), St(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (St(t, l, "encType", n.encType, n, null), St(t, l, "method", n.method, n, null), St(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Qn("" + a), t.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (t.onclick = Vl);
        break;
      case "onScroll":
        a != null && tt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && tt("scrollend", t);
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
        e = Qn("" + a), t.setAttributeNS(
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
        tt("beforetoggle", t), tt("toggle", t), Gn(t, "popover", a);
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
        Gn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Th.get(e) || e, Gn(t, e, a));
    }
  }
  function Jc(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Qf(t, a, u);
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
        typeof a == "string" ? ua(t, a) : (typeof a == "number" || typeof a == "bigint") && ua(t, "" + a);
        break;
      case "onScroll":
        a != null && tt("scroll", t);
        break;
      case "onScrollEnd":
        a != null && tt("scrollend", t);
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
        if (!Uf.hasOwnProperty(e))
          t: {
            if (e[0] === "o" && e[1] === "n" && (n = e.endsWith("Capture"), l = e.slice(2, n ? e.length - 7 : void 0), u = t[el] || null, u = u != null ? u[e] : null, typeof u == "function" && t.removeEventListener(l, u, n), typeof a == "function")) {
              typeof u != "function" && u !== null && (e in t ? t[e] = null : t.hasAttribute(e) && t.removeAttribute(e)), t.addEventListener(l, a, n);
              break t;
            }
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : Gn(t, e, a);
          }
    }
  }
  function It(t, l, e) {
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
        tt("error", t), tt("load", t);
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
                  St(t, l, u, i, e, null);
              }
          }
        n && St(t, l, "srcSet", e.srcSet, e, null), a && St(t, l, "src", e.src, e, null);
        return;
      case "input":
        tt("invalid", t);
        var c = u = i = n = null, o = null, g = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var E = e[a];
            if (E != null)
              switch (a) {
                case "name":
                  n = E;
                  break;
                case "type":
                  i = E;
                  break;
                case "checked":
                  o = E;
                  break;
                case "defaultChecked":
                  g = E;
                  break;
                case "value":
                  u = E;
                  break;
                case "defaultValue":
                  c = E;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (E != null)
                    throw Error(s(137, l));
                  break;
                default:
                  St(t, l, a, E, e, null);
              }
          }
        Yf(
          t,
          u,
          c,
          o,
          g,
          i,
          n,
          !1
        );
        return;
      case "select":
        tt("invalid", t), a = i = u = null;
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
                St(t, l, n, c, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? na(t, !!a, l, !1) : e != null && na(t, !!a, e, !0);
        return;
      case "textarea":
        tt("invalid", t), u = n = a = null;
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
                St(t, l, i, c, e, null);
            }
        Xf(t, a, n, u);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                St(t, l, o, a, e, null);
            }
        return;
      case "dialog":
        tt("beforetoggle", t), tt("toggle", t), tt("cancel", t), tt("close", t);
        break;
      case "iframe":
      case "object":
        tt("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < Tn.length; a++)
          tt(Tn[a], t);
        break;
      case "image":
        tt("error", t), tt("load", t);
        break;
      case "details":
        tt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        tt("error", t), tt("load", t);
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
        for (g in e)
          if (e.hasOwnProperty(g) && (a = e[g], a != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                St(t, l, g, a, e, null);
            }
        return;
      default:
        if (ii(l)) {
          for (E in e)
            e.hasOwnProperty(E) && (a = e[E], a !== void 0 && Jc(
              t,
              l,
              E,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && St(t, l, c, a, e, null));
  }
  function km(t, l, e, a) {
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
        var n = null, u = null, i = null, c = null, o = null, g = null, E = null;
        for (T in e) {
          var M = e[T];
          if (e.hasOwnProperty(T) && M != null)
            switch (T) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                o = M;
              default:
                a.hasOwnProperty(T) || St(t, l, T, null, a, M);
            }
        }
        for (var S in a) {
          var T = a[S];
          if (M = e[S], a.hasOwnProperty(S) && (T != null || M != null))
            switch (S) {
              case "type":
                u = T;
                break;
              case "name":
                n = T;
                break;
              case "checked":
                g = T;
                break;
              case "defaultChecked":
                E = T;
                break;
              case "value":
                i = T;
                break;
              case "defaultValue":
                c = T;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (T != null)
                  throw Error(s(137, l));
                break;
              default:
                T !== M && St(
                  t,
                  l,
                  S,
                  T,
                  a,
                  M
                );
            }
        }
        ni(
          t,
          i,
          c,
          o,
          g,
          E,
          u,
          n
        );
        return;
      case "select":
        T = i = c = S = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = o;
              default:
                a.hasOwnProperty(u) || St(
                  t,
                  l,
                  u,
                  null,
                  a,
                  o
                );
            }
        for (n in a)
          if (u = a[n], o = e[n], a.hasOwnProperty(n) && (u != null || o != null))
            switch (n) {
              case "value":
                S = u;
                break;
              case "defaultValue":
                c = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== o && St(
                  t,
                  l,
                  n,
                  u,
                  a,
                  o
                );
            }
        l = c, e = i, a = T, S != null ? na(t, !!e, S, !1) : !!a != !!e && (l != null ? na(t, !!e, l, !0) : na(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        T = S = null;
        for (c in e)
          if (n = e[c], e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                St(t, l, c, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                S = n;
                break;
              case "defaultValue":
                T = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(s(91));
                break;
              default:
                n !== u && St(t, l, i, n, a, u);
            }
        Gf(t, S, T);
        return;
      case "option":
        for (var q in e)
          if (S = e[q], e.hasOwnProperty(q) && S != null && !a.hasOwnProperty(q))
            switch (q) {
              case "selected":
                t.selected = !1;
                break;
              default:
                St(
                  t,
                  l,
                  q,
                  null,
                  a,
                  S
                );
            }
        for (o in a)
          if (S = a[o], T = e[o], a.hasOwnProperty(o) && S !== T && (S != null || T != null))
            switch (o) {
              case "selected":
                t.selected = S && typeof S != "function" && typeof S != "symbol";
                break;
              default:
                St(
                  t,
                  l,
                  o,
                  S,
                  a,
                  T
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
        for (var K in e)
          S = e[K], e.hasOwnProperty(K) && S != null && !a.hasOwnProperty(K) && St(t, l, K, null, a, S);
        for (g in a)
          if (S = a[g], T = e[g], a.hasOwnProperty(g) && S !== T && (S != null || T != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (S != null)
                  throw Error(s(137, l));
                break;
              default:
                St(
                  t,
                  l,
                  g,
                  S,
                  a,
                  T
                );
            }
        return;
      default:
        if (ii(l)) {
          for (var bt in e)
            S = e[bt], e.hasOwnProperty(bt) && S !== void 0 && !a.hasOwnProperty(bt) && Jc(
              t,
              l,
              bt,
              void 0,
              a,
              S
            );
          for (E in a)
            S = a[E], T = e[E], !a.hasOwnProperty(E) || S === T || S === void 0 && T === void 0 || Jc(
              t,
              l,
              E,
              S,
              a,
              T
            );
          return;
        }
    }
    for (var h in e)
      S = e[h], e.hasOwnProperty(h) && S != null && !a.hasOwnProperty(h) && St(t, l, h, null, a, S);
    for (M in a)
      S = a[M], T = e[M], !a.hasOwnProperty(M) || S === T || S == null && T == null || St(t, l, M, S, a, T);
  }
  function Vr(t) {
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
  function $m() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
        if (u && c && Vr(i)) {
          for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], g = o.startTime;
            if (g > c) break;
            var E = o.transferSize, M = o.initiatorType;
            E && Vr(M) && (o = o.responseEnd, i += E * (o < c ? 1 : (c - g) / (o - g)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var wc = null, kc = null;
  function qu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Kr(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Jr(t, l) {
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
  function $c(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Wc = null;
  function Wm() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Wc ? !1 : (Wc = t, !0) : (Wc = null, !1);
  }
  var wr = typeof setTimeout == "function" ? setTimeout : void 0, Fm = typeof clearTimeout == "function" ? clearTimeout : void 0, kr = typeof Promise == "function" ? Promise : void 0, Im = typeof queueMicrotask == "function" ? queueMicrotask : typeof kr < "u" ? function(t) {
    return kr.resolve(null).then(t).catch(Pm);
  } : wr;
  function Pm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Me(t) {
    return t === "head";
  }
  function $r(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Ba(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          _n(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, _n(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, c = u.nodeName;
            u[Xa] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && _n(t.ownerDocument.body);
      e = n;
    } while (e);
    Ba(l);
  }
  function Wr(t, l) {
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
  function Fc(t) {
    var l = t.firstChild;
    for (l && l.nodeType === 10 && (l = l.nextSibling); l; ) {
      var e = l;
      switch (l = l.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Fc(e), ei(e);
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
  function ty(t, l, e, a) {
    for (; t.nodeType === 1; ) {
      var n = e;
      if (t.nodeName.toLowerCase() !== l.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (a) {
        if (!t[Xa])
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
      if (t = Nl(t.nextSibling), t === null) break;
    }
    return null;
  }
  function ly(t, l, e) {
    if (l === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Nl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Fr(t, l) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = Nl(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ic(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Pc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function ey(t, l) {
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
  function Nl(t) {
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
  var tf = null;
  function Ir(t) {
    t = t.nextSibling;
    for (var l = 0; t; ) {
      if (t.nodeType === 8) {
        var e = t.data;
        if (e === "/$" || e === "/&") {
          if (l === 0)
            return Nl(t.nextSibling);
          l--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || l++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Pr(t) {
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
  function td(t, l, e) {
    switch (l = qu(e), t) {
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
  function _n(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    ei(t);
  }
  var xl = /* @__PURE__ */ new Map(), ld = /* @__PURE__ */ new Set();
  function Yu(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ie = H.d;
  H.d = {
    f: ay,
    r: ny,
    D: uy,
    C: iy,
    L: cy,
    m: fy,
    X: oy,
    S: sy,
    M: ry
  };
  function ay() {
    var t = ie.f(), l = Nu();
    return t || l;
  }
  function ny(t) {
    var l = la(t);
    l !== null && l.tag === 5 && l.type === "form" ? po(l) : ie.r(t);
  }
  var Ua = typeof document > "u" ? null : document;
  function ed(t, l, e) {
    var a = Ua;
    if (a && typeof l == "string" && l) {
      var n = El(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), ld.has(n) || (ld.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), It(l, "link", t), Vt(l), a.head.appendChild(l)));
    }
  }
  function uy(t) {
    ie.D(t), ed("dns-prefetch", t, null);
  }
  function iy(t, l) {
    ie.C(t, l), ed("preconnect", t, l);
  }
  function cy(t, l, e) {
    ie.L(t, l, e);
    var a = Ua;
    if (a && t && l) {
      var n = 'link[rel="preload"][as="' + El(l) + '"]';
      l === "image" && e && e.imageSrcSet ? (n += '[imagesrcset="' + El(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (n += '[imagesizes="' + El(
        e.imageSizes
      ) + '"]')) : n += '[href="' + El(t) + '"]';
      var u = n;
      switch (l) {
        case "style":
          u = Ra(t);
          break;
        case "script":
          u = Ha(t);
      }
      xl.has(u) || (t = j(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), xl.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(An(u)) || l === "script" && a.querySelector(zn(u)) || (l = a.createElement("link"), It(l, "link", t), Vt(l), a.head.appendChild(l)));
    }
  }
  function fy(t, l) {
    ie.m(t, l);
    var e = Ua;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + El(a) + '"][href="' + El(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ha(t);
      }
      if (!xl.has(u) && (t = j({ rel: "modulepreload", href: t }, l), xl.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(zn(u)))
              return;
        }
        a = e.createElement("link"), It(a, "link", t), Vt(a), e.head.appendChild(a);
      }
    }
  }
  function sy(t, l, e) {
    ie.S(t, l, e);
    var a = Ua;
    if (a && t) {
      var n = ea(a).hoistableStyles, u = Ra(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          An(u)
        ))
          c.loading = 5;
        else {
          t = j(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = xl.get(u)) && lf(t, e);
          var o = i = a.createElement("link");
          Vt(o), It(o, "link", t), o._p = new Promise(function(g, E) {
            o.onload = g, o.onerror = E;
          }), o.addEventListener("load", function() {
            c.loading |= 1;
          }), o.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Gu(i, l, a);
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
  function oy(t, l) {
    ie.X(t, l);
    var e = Ua;
    if (e && t) {
      var a = ea(e).hoistableScripts, n = Ha(t), u = a.get(n);
      u || (u = e.querySelector(zn(n)), u || (t = j({ src: t, async: !0 }, l), (l = xl.get(n)) && ef(t, l), u = e.createElement("script"), Vt(u), It(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ry(t, l) {
    ie.M(t, l);
    var e = Ua;
    if (e && t) {
      var a = ea(e).hoistableScripts, n = Ha(t), u = a.get(n);
      u || (u = e.querySelector(zn(n)), u || (t = j({ src: t, async: !0, type: "module" }, l), (l = xl.get(n)) && ef(t, l), u = e.createElement("script"), Vt(u), It(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ad(t, l, e, a) {
    var n = (n = I.current) ? Yu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Ra(e.href), e = ea(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Ra(e.href);
          var u = ea(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            An(t)
          )) && !u._p && (i.instance = u, i.state.loading = 5), xl.has(t) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, xl.set(t, e), u || dy(
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Ha(e), e = ea(
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
  function Ra(t) {
    return 'href="' + El(t) + '"';
  }
  function An(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function nd(t) {
    return j({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function dy(t, l, e, a) {
    t.querySelector('link[rel="preload"][as="style"][' + l + "]") ? a.loading = 1 : (l = t.createElement("link"), a.preload = l, l.addEventListener("load", function() {
      return a.loading |= 1;
    }), l.addEventListener("error", function() {
      return a.loading |= 2;
    }), It(l, "link", e), Vt(l), t.head.appendChild(l));
  }
  function Ha(t) {
    return '[src="' + El(t) + '"]';
  }
  function zn(t) {
    return "script[async]" + t;
  }
  function ud(t, l, e) {
    if (l.count++, l.instance === null)
      switch (l.type) {
        case "style":
          var a = t.querySelector(
            'style[data-href~="' + El(e.href) + '"]'
          );
          if (a)
            return l.instance = a, Vt(a), a;
          var n = j({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (t.ownerDocument || t).createElement(
            "style"
          ), Vt(a), It(a, "style", n), Gu(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = Ra(e.href);
          var u = t.querySelector(
            An(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Vt(u), u;
          a = nd(e), (n = xl.get(n)) && lf(a, n), u = (t.ownerDocument || t).createElement("link"), Vt(u);
          var i = u;
          return i._p = new Promise(function(c, o) {
            i.onload = c, i.onerror = o;
          }), It(u, "link", a), l.state.loading |= 4, Gu(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Ha(e.src), (n = t.querySelector(
            zn(u)
          )) ? (l.instance = n, Vt(n), n) : (a = e, (n = xl.get(u)) && (a = j({}, e), ef(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Vt(n), It(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, Gu(a, e.precedence, t));
    return l.instance;
  }
  function Gu(t, l, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), n = a.length ? a[a.length - 1] : null, u = n, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === l) u = c;
      else if (u !== n) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (l = e.nodeType === 9 ? e.head : e, l.insertBefore(t, l.firstChild));
  }
  function lf(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.title == null && (t.title = l.title);
  }
  function ef(t, l) {
    t.crossOrigin == null && (t.crossOrigin = l.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = l.referrerPolicy), t.integrity == null && (t.integrity = l.integrity);
  }
  var Xu = null;
  function id(t, l, e) {
    if (Xu === null) {
      var a = /* @__PURE__ */ new Map(), n = Xu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Xu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Xa] || u[kt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function cd(t, l, e) {
    t = t.ownerDocument || t, t.head.insertBefore(
      e,
      l === "title" ? t.querySelector("head > title") : null
    );
  }
  function hy(t, l, e) {
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
  function fd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function my(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Ra(a.href), u = l.querySelector(
          An(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Lu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Vt(u);
          return;
        }
        u = l.ownerDocument || l, a = nd(a), (n = xl.get(n)) && lf(a, n), u = u.createElement("link"), Vt(u);
        var i = u;
        i._p = new Promise(function(c, o) {
          i.onload = c, i.onerror = o;
        }), It(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Lu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var af = 0;
  function yy(t, l) {
    return t.stylesheets && t.count === 0 && Zu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Zu(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && af === 0 && (af = 62500 * $m());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Zu(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > af ? 50 : 800) + l
      );
      return t.unsuspend = e, function() {
        t.unsuspend = null, clearTimeout(a), clearTimeout(n);
      };
    } : null;
  }
  function Lu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Zu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Qu = null;
  function Zu(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Qu = /* @__PURE__ */ new Map(), l.forEach(vy, t), Qu = null, Lu.call(t));
  }
  function vy(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Qu.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Qu.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Lu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var On = {
    $$typeof: ht,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function gy(t, l, e, a, n, u, i, c, o) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Iu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Iu(0), this.hiddenUpdates = Iu(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = o, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function sd(t, l, e, a, n, u, i, c, o, g, E, M) {
    return t = new gy(
      t,
      l,
      e,
      i,
      o,
      g,
      E,
      M,
      c
    ), l = 1, u === !0 && (l |= 24), u = yl(3, null, null, l), t.current = u, u.stateNode = t, l = Bi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Xi(u), t;
  }
  function od(t) {
    return t ? (t = da, t) : da;
  }
  function rd(t, l, e, a, n, u) {
    n = od(n), a.context === null ? a.context = n : a.pendingContext = n, a = ve(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = ge(t, a, l), e !== null && (fl(e, t, l), an(e, t, l));
  }
  function dd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function nf(t, l) {
    dd(t, l), (t = t.alternate) && dd(t, l);
  }
  function hd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ge(t, 67108864);
      l !== null && fl(l, t, 67108864), nf(t, 67108864);
    }
  }
  function md(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = bl();
      l = Pu(l);
      var e = Ge(t, l);
      e !== null && fl(e, t, l), nf(t, l);
    }
  }
  var Vu = !0;
  function py(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = H.p;
    try {
      H.p = 2, uf(t, l, e, a);
    } finally {
      H.p = u, _.T = n;
    }
  }
  function Sy(t, l, e, a) {
    var n = _.T;
    _.T = null;
    var u = H.p;
    try {
      H.p = 8, uf(t, l, e, a);
    } finally {
      H.p = u, _.T = n;
    }
  }
  function uf(t, l, e, a) {
    if (Vu) {
      var n = cf(a);
      if (n === null)
        Kc(
          t,
          l,
          a,
          Ku,
          e
        ), vd(t, a);
      else if (Ty(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (vd(t, a), l & 4 && -1 < by.indexOf(t)) {
        for (; n !== null; ) {
          var u = la(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Re(u.pendingLanes);
                  if (i !== 0) {
                    var c = u;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var o = 1 << 31 - hl(i);
                      c.entanglements[1] |= o, i &= ~o;
                    }
                    Yl(u), (dt & 6) === 0 && (Mu = rl() + 500, bn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ge(u, 2), c !== null && fl(c, u, 2), Nu(), nf(u, 2);
            }
          if (u = cf(a), u === null && Kc(
            t,
            l,
            a,
            Ku,
            e
          ), u === n) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else
        Kc(
          t,
          l,
          a,
          null,
          e
        );
    }
  }
  function cf(t) {
    return t = fi(t), ff(t);
  }
  var Ku = null;
  function ff(t) {
    if (Ku = null, t = ta(t), t !== null) {
      var l = x(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = z(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = C(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Ku = t, null;
  }
  function yd(t) {
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
        switch (uh()) {
          case Ef:
            return 2;
          case _f:
            return 8;
          case Rn:
          case ih:
            return 32;
          case Af:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var sf = !1, De = null, Ne = null, xe = null, Mn = /* @__PURE__ */ new Map(), Dn = /* @__PURE__ */ new Map(), je = [], by = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function vd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        De = null;
        break;
      case "dragenter":
      case "dragleave":
        Ne = null;
        break;
      case "mouseover":
      case "mouseout":
        xe = null;
        break;
      case "pointerover":
      case "pointerout":
        Mn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Dn.delete(l.pointerId);
    }
  }
  function Nn(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = la(l), l !== null && hd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function Ty(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return De = Nn(
          De,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return Ne = Nn(
          Ne,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return xe = Nn(
          xe,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return Mn.set(
          u,
          Nn(
            Mn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, Dn.set(
          u,
          Nn(
            Dn.get(u) || null,
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
  function gd(t) {
    var l = ta(t.target);
    if (l !== null) {
      var e = x(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = z(e), l !== null) {
            t.blockedOn = l, xf(t.priority, function() {
              md(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = C(e), l !== null) {
            t.blockedOn = l, xf(t.priority, function() {
              md(e);
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
  function Ju(t) {
    if (t.blockedOn !== null) return !1;
    for (var l = t.targetContainers; 0 < l.length; ) {
      var e = cf(t.nativeEvent);
      if (e === null) {
        e = t.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ci = a, e.target.dispatchEvent(a), ci = null;
      } else
        return l = la(e), l !== null && hd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function pd(t, l, e) {
    Ju(t) && e.delete(l);
  }
  function Ey() {
    sf = !1, De !== null && Ju(De) && (De = null), Ne !== null && Ju(Ne) && (Ne = null), xe !== null && Ju(xe) && (xe = null), Mn.forEach(pd), Dn.forEach(pd);
  }
  function wu(t, l) {
    t.blockedOn === l && (t.blockedOn = null, sf || (sf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Ey
    )));
  }
  var ku = null;
  function Sd(t) {
    ku !== t && (ku = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        ku === t && (ku = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (ff(a || e) === null)
              continue;
            break;
          }
          var u = la(e);
          u !== null && (t.splice(l, 3), l -= 3, ic(
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
  function Ba(t) {
    function l(o) {
      return wu(o, t);
    }
    De !== null && wu(De, t), Ne !== null && wu(Ne, t), xe !== null && wu(xe, t), Mn.forEach(l), Dn.forEach(l);
    for (var e = 0; e < je.length; e++) {
      var a = je[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < je.length && (e = je[0], e.blockedOn === null); )
      gd(e), e.blockedOn === null && je.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[el] || null;
        if (typeof u == "function")
          i || Sd(e);
        else if (i) {
          var c = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[el] || null)
              c = i.formAction;
            else if (ff(n) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), Sd(e);
        }
      }
  }
  function bd() {
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
  function of(t) {
    this._internalRoot = t;
  }
  $u.prototype.render = of.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = bl();
    rd(e, a, t, l, null, null);
  }, $u.prototype.unmount = of.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      rd(t.current, 2, null, t, null, null), Nu(), l[Pe] = null;
    }
  };
  function $u(t) {
    this._internalRoot = t;
  }
  $u.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Nf();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < je.length && l !== 0 && l < je[e].priority; e++) ;
      je.splice(e, 0, t), e === 0 && gd(t);
    }
  };
  var Td = m.version;
  if (Td !== "19.2.7")
    throw Error(
      s(
        527,
        Td,
        "19.2.7"
      )
    );
  H.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = y(l), t = t !== null ? R(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var _y = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wu.isDisabled && Wu.supportsFiber)
      try {
        qa = Wu.inject(
          _y
        ), dl = Wu;
      } catch {
      }
  }
  return jn.createRoot = function(t, l) {
    if (!N(t)) throw Error(s(299));
    var e = !1, a = "", n = Do, u = No, i = xo;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = sd(
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
      bd
    ), t[Pe] = l.current, Vc(t), new of(l);
  }, jn.hydrateRoot = function(t, l, e) {
    if (!N(t)) throw Error(s(299));
    var a = !1, n = "", u = Do, i = No, c = xo, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = sd(
      t,
      1,
      !0,
      l,
      e ?? null,
      a,
      n,
      o,
      u,
      i,
      c,
      bd
    ), l.context = od(null), e = l.current, a = bl(), a = Pu(a), n = ve(a), n.callback = null, ge(e, n, a), e = a, l.current.lanes = e, Ga(l, e), Yl(l), t[Pe] = l.current, Vc(t), new $u(l);
  }, jn.version = "19.2.7", jn;
}
var jd;
function Hy() {
  if (jd) return hf.exports;
  jd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
  }
  return f(), hf.exports = Ry(), hf.exports;
}
var By = Hy();
const Cn = {
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
}, Jd = "settings";
function qy(f, m) {
  return {
    provider: m.provider ?? f.provider,
    models: { ...f.models, ...m.models },
    apiKeys: { ...f.apiKeys, ...m.apiKeys },
    customBaseUrl: m.customBaseUrl !== void 0 ? m.customBaseUrl : f.customBaseUrl
  };
}
function Yy(f) {
  const m = f.storage.get(Jd);
  if (!m) return { ...Cn, models: { ...Cn.models }, apiKeys: {} };
  try {
    const p = JSON.parse(m);
    return qy(Cn, p);
  } catch {
    return { ...Cn, models: { ...Cn.models }, apiKeys: {} };
  }
}
function Gy(f, m) {
  f.storage.set(Jd, JSON.stringify(m));
}
function Xy(f, m) {
  switch (f.provider) {
    case "openai":
      return !!f.apiKeys.openai;
    case "openrouter":
      return !!f.apiKeys.openrouter;
    case "anthropic":
      return !!f.apiKeys.anthropic;
    case "openai-codex":
      return m;
    case "custom":
      return !!f.customBaseUrl;
    default:
      return !1;
  }
}
const Cd = 50, wd = "conversations";
function Tf(f) {
  const m = f.storage.get(wd);
  if (!m) return [];
  try {
    return JSON.parse(m);
  } catch {
    return [];
  }
}
function Ud(f) {
  return f.messages.some((m) => {
    var p;
    return (p = m.attachments) == null ? void 0 : p.some((s) => s.dataUrl);
  }) ? {
    ...f,
    messages: f.messages.map(
      (m) => m.attachments ? {
        ...m,
        attachments: m.attachments.map(
          (p) => p.dataUrl ? { ...p, dataUrl: void 0 } : p
        )
      } : m
    )
  } : f;
}
function Fu(f, m) {
  try {
    return f.storage.set(wd, JSON.stringify(m)), !0;
  } catch {
    return !1;
  }
}
function kd(f, m) {
  if (Fu(f, m)) return;
  const p = [...m];
  for (; p.length > 1; )
    if (p.pop(), Fu(f, p)) return;
  Fu(f, m.map(Ud)) || Fu(f, m.slice(0, 1).map(Ud));
}
function pf(f) {
  return Tf(f).sort((m, p) => p.updatedAt - m.updatedAt);
}
function Rd(f, m) {
  const p = Tf(f), s = p.findIndex((N) => N.id === m.id);
  s >= 0 ? p[s] = m : p.push(m), p.sort((N, x) => x.updatedAt - N.updatedAt), p.length > Cd && p.splice(Cd), kd(f, p);
}
function Ly(f, m) {
  const p = Tf(f).filter((s) => s.id !== m);
  kd(f, p);
}
function Hd(f, m) {
  const p = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: p,
    updatedAt: p,
    provider: f,
    model: m,
    messages: []
  };
}
function Qy(f) {
  return f.slice(0, 40);
}
function Zy() {
  return /* @__PURE__ */ b.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ b.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function Vy({ onClick: f }) {
  return /* @__PURE__ */ b.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: f,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ b.jsx(Zy, {})
    }
  );
}
const Bd = 8 * 1024 * 1024, qd = 2 * 1024 * 1024, Yd = 20 * 1024 * 1024, Ky = /* @__PURE__ */ new Set([
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
function $d(f) {
  const m = f.lastIndexOf(".");
  return m >= 0 ? f.slice(m + 1).toLowerCase() : "";
}
function Wd(f) {
  const m = (f.type || "").toLowerCase();
  if (m.startsWith("image/")) return "image";
  if (m === "application/pdf") return "pdf";
  if (m.startsWith("text/")) return "text";
  const p = $d(f.name);
  return p === "pdf" ? "pdf" : Ky.has(p) ? "image" : "text";
}
function Un(f) {
  return f < 1024 ? `${f} B` : f < 1024 * 1024 ? `${(f / 1024).toFixed(1)} KB` : `${(f / (1024 * 1024)).toFixed(1)} MB`;
}
const Jy = {
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
function wy(f) {
  return Jy[$d(f)] ?? "";
}
function ky(f) {
  return new Promise((m, p) => {
    const s = new FileReader();
    s.onload = () => m(s.result), s.onerror = () => p(s.error ?? new Error("FileReader failed")), s.readAsDataURL(f);
  });
}
const $y = "4.10.38", Gd = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${$y}/build`;
let gf = null;
function Wy() {
  return gf || (gf = import(`${Gd}/pdf.mjs`).then((m) => {
    const p = m.default ?? m;
    return p.GlobalWorkerOptions.workerSrc = `${Gd}/pdf.worker.mjs`, p;
  })), gf;
}
async function Fy(f) {
  const m = await Wy(), p = await f.arrayBuffer(), s = await m.getDocument({ data: p }).promise, N = [];
  for (let x = 1; x <= s.numPages; x++) {
    const A = (await (await s.getPage(x)).getTextContent()).items.map((y) => typeof (y == null ? void 0 : y.str) == "string" ? y.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    A && N.push(A);
  }
  return N.join(`

`).trim();
}
async function Iy(f, m = {}) {
  const p = Wd(f), s = {
    id: crypto.randomUUID(),
    kind: p,
    name: f.name,
    size: f.size,
    mime: f.type || ""
  };
  if (p === "image") {
    if (f.size > Bd)
      throw new Error(`Image "${f.name}" is too large (max ${Un(Bd)})`);
    const x = await (m.readDataUrl ?? ky)(f);
    return { ...s, dataUrl: x };
  }
  if (p === "pdf") {
    if (f.size > Yd)
      throw new Error(`PDF "${f.name}" is too large (max ${Un(Yd)})`);
    let x;
    try {
      x = await (m.loadPdfText ?? Fy)(f);
    } catch (z) {
      const C = (z == null ? void 0 : z.message) ?? String(z);
      throw new Error(`Could not read PDF "${f.name}": ${C}`);
    }
    return { ...s, text: x };
  }
  if (f.size > qd)
    throw new Error(`Text file "${f.name}" is too large (max ${Un(qd)})`);
  const N = await (m.readText ?? ((x) => x.text()))(f);
  return { ...s, text: N };
}
const Py = /* @__PURE__ */ new Set([
  "openai",
  "openai-codex",
  "openrouter",
  "anthropic",
  "custom"
]);
function Fd(f, m, p) {
  const s = m ?? [], N = [];
  f.trim() && N.push(f);
  for (const C of s)
    if ((C.kind === "text" || C.kind === "pdf") && C.text) {
      const A = C.kind === "pdf" ? "" : wy(C.name);
      N.push(`Attached file "${C.name}":
\`\`\`${A}
${C.text}
\`\`\``);
    }
  const x = N.join(`

`), z = s.filter((C) => C.kind === "image" && C.dataUrl);
  if (z.length > 0 && Py.has(p))
    return [
      { type: "text", text: x || "(see attached image)" },
      ...z.map((A) => ({ type: "image_url", image_url: { url: A.dataUrl } }))
    ];
  if (z.length > 0) {
    const C = z.map((A) => `[image attached (not sent to this provider): ${A.name}]`).join(`
`);
    return [x, C].filter(Boolean).join(`

`);
  }
  return x;
}
function Xd(f, m) {
  const p = f.split(`
`);
  for (const s of p) {
    if (!s.startsWith("data: ")) continue;
    const N = s.slice(6).trim();
    if (!N || N === "[DONE]") continue;
    let x;
    try {
      x = JSON.parse(N);
    } catch {
      continue;
    }
    const z = x.type;
    if (z === "text_delta")
      m.onText(x.text ?? "");
    else if (z === "done") {
      const C = {
        message: x.message,
        stop_reason: x.stop_reason,
        usage: x.usage ?? {}
      };
      m.onDone(C);
    } else if (z === "error")
      return m.onError(x.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function Id(f, m, p, s) {
  let N;
  try {
    N = await f.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(m),
      signal: s
    });
  } catch (A) {
    p.onError(`Network error: ${String(A)}`);
    return;
  }
  if (!N.ok) {
    let A = "";
    try {
      A = await N.text(), A.length > 200 && (A = A.slice(0, 200) + "...");
    } catch {
    }
    p.onError(`HTTP ${N.status}: ${A}`);
    return;
  }
  const x = N.body.getReader(), z = new TextDecoder();
  let C = "";
  try {
    for (; ; ) {
      const { done: A, value: y } = await x.read();
      if (A) break;
      C += z.decode(y, { stream: !0 }).replace(/\r\n/g, `
`);
      const R = C.split(`

`);
      C = R.pop() ?? "";
      for (const j of R) {
        if (!j.trim()) continue;
        if (Xd(j, p)) {
          x.cancel().catch(() => {
          });
          return;
        }
      }
    }
    C.trim() && Xd(C, p);
  } catch (A) {
    (A == null ? void 0 : A.name) !== "AbortError" && p.onError(`Stream read error: ${String(A)}`);
  } finally {
    x.releaseLock();
  }
}
async function t0(f, m, p, s) {
  const N = await f.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: m, api_key: p, base_url: s })
  });
  if (!N.ok) {
    let z = "";
    try {
      z = await N.text(), z.length > 200 && (z = z.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${N.status}: ${z}`);
  }
  return (await N.json()).models.map((z) => z.id);
}
async function l0(f) {
  return (await (await f.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function Sf(f) {
  return await (await f.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function e0(f) {
  await f.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const Ld = 3e4;
function a0(f) {
  const m = f.default === null || f.default === void 0 ? String(f.default) : typeof f.default == "object" ? JSON.stringify(f.default) : String(f.default), p = m.length > 60 ? m.slice(0, 60) + "..." : m;
  let s = "";
  if (f.param_type === "select" && f.options.length > 0)
    s = `{${f.options.join("|")}}`;
  else if (f.param_type === "int" || f.param_type === "float") {
    const N = f.min_value !== null, x = f.max_value !== null;
    if (N || x) {
      const z = N ? String(f.min_value) : "", C = x ? String(f.max_value) : "";
      s = `{${z}..${C}}`;
    }
  }
  return `${f.name}:${f.param_type}=${p}${s}`;
}
function n0(f) {
  return f.map((m) => {
    const p = [];
    if (m.inputs.length > 0) {
      const N = m.inputs.map((x) => `${x.name}:${x.data_type}`).join(", ");
      p.push(`in[${N}]`);
    }
    if (m.outputs.length > 0) {
      const N = m.outputs.map((x) => `${x.name}:${x.data_type}`).join(", ");
      p.push(`out[${N}]`);
    }
    if (m.params.length > 0) {
      const N = m.params.map(a0).join(", ");
      p.push(`params[${N}]`);
    }
    const s = p.length > 0 ? " " + p.join(" ") : "";
    return `${m.node_name}:${s} [category: ${m.category}]`;
  }).join(`
`);
}
function Pd(f) {
  return f.map((m) => {
    const p = (m.description || "").replace(/\s+/g, " ").trim(), s = p.length > 100 ? p.slice(0, 100) + "..." : p;
    return `${m.node_name} [${m.category}]${s ? " - " + s : ""}`;
  }).join(`
`);
}
function th(f) {
  const m = JSON.stringify({ nodes: f.nodes, edges: f.edges });
  if (m.length <= Ld)
    return m;
  const p = Ld, s = m.length;
  return m.slice(0, p) + `
[graph truncated - kept ${p} of ${s} chars]`;
}
function u0(f, m) {
  const p = Pd(f), s = th(m);
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
${p}

## Current graph
${s}`;
}
const Qd = 16, i0 = 2, c0 = [
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
function f0(f, m) {
  const p = f.role === "user" && f.attachments && f.attachments.length > 0 ? Fd(f.content, f.attachments, m) : f.content, s = { role: f.role, content: p };
  return f.tool_calls && (s.tool_calls = f.tool_calls), f.tool_call_id && (s.tool_call_id = f.tool_call_id), s;
}
function s0(f, m) {
  const p = /* @__PURE__ */ new Map();
  f.forEach((N, x) => {
    const z = N.op, C = m[x], A = C ? C.ok : !1;
    p.has(z) || p.set(z, { ok: 0, fail: 0 });
    const y = p.get(z);
    A ? y.ok++ : y.fail++;
  });
  const s = [];
  for (const [N, x] of p) {
    const z = x.ok + x.fail;
    x.fail === 0 ? s.push(`${N} x${z} ok`) : x.ok === 0 ? s.push(`${N} x${z} FAILED`) : s.push(`${N} x${z} (${x.ok} ok, ${x.fail} FAILED)`);
  }
  return s.join(", ");
}
function o0(f, m, p, s, N) {
  const z = { role: "system", content: u0(
    f.graph.getNodeDefinitions(),
    f.graph.getGraph()
  ) }, C = m.slice(-20).map((y) => f0(y, N)), A = {
    role: "user",
    content: Fd(p, s, N)
  };
  return [z, ...C, A];
}
function lh(f, m, p = c0, s = 8192) {
  const N = f.provider, x = f.models[N] ?? "", z = {
    provider: N,
    model: x,
    messages: m,
    tools: p,
    max_tokens: s
  };
  if (N !== "openai-codex") {
    const C = N === "openai" ? f.apiKeys.openai : N === "openrouter" ? f.apiKeys.openrouter : N === "anthropic" ? f.apiKeys.anthropic : N === "custom" ? f.apiKeys.custom : void 0;
    C && (z.api_key = C);
  }
  return N === "custom" && f.customBaseUrl && (z.base_url = f.customBaseUrl), z;
}
async function eh(f) {
  const m = f.graph.getGraph();
  try {
    const p = await f.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: m.nodes, edges: m.edges })
    });
    if (!p.ok)
      return { valid: !1, errors: [`validate request failed: HTTP ${p.status}`] };
    const s = await p.json();
    return { valid: !!s.valid, errors: Array.isArray(s.errors) ? s.errors : [] };
  } catch (p) {
    return { valid: !1, errors: [`validate request error: ${String(p)}`] };
  }
}
async function r0(f, m, p, s, N) {
  const z = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + s },
    { role: "user", content: p }
  ];
  let C = "";
  try {
    await Id(
      f,
      lh(m, z, [], 1024),
      {
        onText: (A) => {
          C += A;
        },
        onDone: (A) => {
          !C && A.message.content && (C = A.message.content);
        },
        onError: (A) => {
          C += `
(research error: ${A})`;
        }
      },
      N
    );
  } catch (A) {
    return `(research failed: ${String(A)})`;
  }
  return C.trim() || "(no answer)";
}
async function d0(f, m, p, s, N, x) {
  const { name: z, arguments: C } = f;
  if (z === "apply_graph_operations") {
    const A = C.operations;
    if (!Array.isArray(A))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let y;
    try {
      y = m.graph.applyOperations(A);
    } catch (j) {
      return JSON.stringify({ error: `applyOperations threw: ${String(j)}` });
    }
    const R = s0(A, y.results);
    return N.push(R), s.onOpsApplied(R, y), JSON.stringify({
      results: y.results,
      refs: y.refs,
      node_count: y.node_count,
      edge_count: y.edge_count
    });
  }
  if (z === "get_node_schemas") {
    const y = (Array.isArray(C.node_types) ? C.node_types : []).map((V) => String(V)), R = m.graph.getNodeDefinitions(), j = new Map(R.map((V) => [V.node_name, V])), L = y.map((V) => j.get(V)).filter((V) => !!V), ut = y.filter((V) => !j.has(V));
    let ot = L.length > 0 ? n0(L) : "(no matching node types)";
    return ut.length > 0 && (ot += `
(unknown node types, not in catalog: ${ut.join(", ")})`), ot;
  }
  if (z === "validate_graph")
    return JSON.stringify(await eh(m));
  if (z === "research") {
    const y = (Array.isArray(C.questions) ? C.questions : []).map((L) => String(L)).filter((L) => L.trim()).slice(0, 4);
    if (y.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const R = Pd(m.graph.getNodeDefinitions()), j = await Promise.all(
      y.map((L) => r0(m, p, L, R, x))
    );
    return y.map((L, ut) => `[${ut + 1}] Q: ${L}
A: ${j[ut]}`).join(`

`);
  }
  return z === "get_current_graph" ? th(m.graph.getGraph()) : JSON.stringify({ error: `Unknown tool: ${z}` });
}
async function h0(f) {
  const { api: m, settings: p, history: s, userText: N, attachments: x, callbacks: z, signal: C } = f, A = [], y = o0(
    m,
    s,
    N,
    x,
    p.provider
  );
  let R = 0, j = 0;
  try {
    for (; ; ) {
      let L = "", ut = null, ot = null;
      if (await Id(
        m,
        lh(p, y),
        {
          onText(Q) {
            L += Q, z.onTextDelta(Q);
          },
          onDone(Q) {
            ut = Q;
          },
          onError(Q) {
            ot = Q;
          }
        },
        C
      ), ot !== null) {
        z.onTurnsCommitted(A), z.onError(ot), z.onFinished();
        return;
      }
      if (!ut) {
        z.onTurnsCommitted(A), z.onFinished();
        return;
      }
      const V = ut, rt = V.message.tool_calls ?? [], lt = V.message.content || L;
      if (V.stop_reason === "end" || rt.length === 0) {
        const Q = m.graph.getGraph();
        if (j < i0 && Array.isArray(Q.nodes) && Q.nodes.length > 0) {
          const Ct = await eh(m);
          if (!Ct.valid && Ct.errors.length > 0) {
            j++, y.push({ role: "assistant", content: lt }), y.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + Ct.errors.map((X) => `- ${X}`).join(`
`)
            });
            continue;
          }
        }
        const Mt = { role: "assistant", content: lt };
        A.push(Mt), z.onTurnsCommitted(A), z.onFinished();
        return;
      }
      R++;
      const Jt = [], ht = [], Nt = [];
      for (const Q of rt) {
        const Mt = await d0(Q, m, p, z, Jt, C), Ct = {
          role: "tool",
          content: Mt,
          tool_call_id: Q.id
        };
        ht.push(Ct), Nt.push({
          role: "tool",
          content: Mt,
          tool_call_id: Q.id
        });
      }
      const Zt = {
        role: "assistant",
        content: lt,
        tool_calls: rt
      };
      Jt.length > 0 && (Zt.opsSummary = Jt.join("; ")), A.push(Zt), A.push(...ht);
      const jt = {
        role: "assistant",
        content: lt,
        tool_calls: rt
      };
      if (y.push(jt), y.push(...Nt), R >= Qd) {
        const Q = {
          role: "assistant",
          content: `(stopped after ${Qd} tool rounds)`
        };
        A.push(Q), z.onTurnsCommitted(A), z.onFinished();
        return;
      }
    }
  } catch (L) {
    z.onTurnsCommitted(A), z.onError(String(L)), z.onFinished();
  }
}
function m0({ kind: f }) {
  return /* @__PURE__ */ b.jsxs("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    /* @__PURE__ */ b.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
    f === "pdf" ? /* @__PURE__ */ b.jsx("path", { d: "M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }) : /* @__PURE__ */ b.jsx("path", { d: "M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
  ] });
}
function y0(f) {
  const m = f.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), p = [];
  return m.forEach((s, N) => {
    if (s.startsWith("```")) {
      const x = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      p.push(/* @__PURE__ */ b.jsx("pre", { children: /* @__PURE__ */ b.jsx("code", { children: x }) }, N));
    } else s && p.push(/* @__PURE__ */ b.jsx("span", { children: s }, N));
  }), p;
}
function Zd({
  turn: f,
  streaming: m = !1,
  streamingText: p,
  error: s = null,
  onRetry: N,
  retryDisabled: x = !1
}) {
  if (f.role === "tool") return null;
  const z = f.role === "user", C = m && p !== void 0 ? p : f.content, A = C.trim().length > 0, y = f.attachments ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: `gcp-msg-row ${z ? "user" : "assistant"}`, children: [
    y.length > 0 && /* @__PURE__ */ b.jsx("div", { className: "gcp-bubble-attachments", children: y.map(
      (R, j) => R.kind === "image" && R.dataUrl ? /* @__PURE__ */ b.jsx("img", { className: "gcp-att-image", src: R.dataUrl, alt: R.name, title: R.name }, j) : /* @__PURE__ */ b.jsxs("span", { className: "gcp-att-file", title: R.name, children: [
        /* @__PURE__ */ b.jsx(m0, { kind: R.kind }),
        /* @__PURE__ */ b.jsx("span", { className: "gcp-att-file-name", children: R.name })
      ] }, j)
    ) }),
    (A || m) && /* @__PURE__ */ b.jsxs("div", { className: `gcp-bubble${s ? " error" : ""}`, children: [
      y0(C),
      m && /* @__PURE__ */ b.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    !z && f.opsSummary && /* @__PURE__ */ b.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ b.jsxs("span", { children: [
      "Applied: ",
      f.opsSummary
    ] }) }),
    s && /* @__PURE__ */ b.jsx("button", { className: "gcp-retry-btn", onClick: N, disabled: x, "aria-label": "Retry", children: "Retry" })
  ] });
}
function v0() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M22 2L11 13", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ b.jsx("path", { d: "M22 2L15 22L11 13L2 9L22 2Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function g0() {
  return /* @__PURE__ */ b.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ b.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function Vd() {
  return /* @__PURE__ */ b.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ b.jsx(
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
function p0({ kind: f }) {
  return f === "pdf" ? /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ b.jsx("path", { d: "M14 2v6h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ b.jsx("path", { d: "M8.5 13.5h1a1.2 1.2 0 0 1 0 2.4h-1zm0 0v4M14 13.5v4m0-4h1.6m-1.6 2h1.2", stroke: "currentColor", strokeWidth: "1.3", strokeLinecap: "round", strokeLinejoin: "round" })
  ] }) : /* @__PURE__ */ b.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }),
    /* @__PURE__ */ b.jsx("path", { d: "M14 2v6h6M8 13h8M8 17h6", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function S0() {
  return /* @__PURE__ */ b.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ b.jsx("path", { d: "M18 6L6 18M6 6l12 12", stroke: "currentColor", strokeWidth: "2.4", strokeLinecap: "round" }) });
}
function b0() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ b.jsx("path", { d: "M12 7v5l3 3", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function T0({
  api: f,
  settings: m,
  codexLoggedIn: p,
  conversation: s,
  onConversationChange: N,
  onOpenSettings: x,
  onOpenHistory: z
}) {
  const [C, A] = W.useState(""), [y, R] = W.useState(!1), [j, L] = W.useState(""), [ut, ot] = W.useState(null), [V, rt] = W.useState(""), [lt, Jt] = W.useState([]), [ht, Nt] = W.useState([]), [Zt, jt] = W.useState(!1), Q = W.useRef(null), Mt = W.useRef(null), Ct = W.useRef(null), X = W.useRef(null), At = W.useRef(0), Tt = Xy(m, p), Gl = ht.some((U) => U.status === "loading"), sl = ht.filter((U) => U.status === "ready" && U.att).map((U) => U.att), ol = Tt && !y && !Gl && (C.trim().length > 0 || sl.length > 0);
  W.useEffect(() => () => {
    var U;
    (U = X.current) == null || U.abort();
  }, []), W.useEffect(() => {
    var U;
    (U = Q.current) == null || U.scrollIntoView({ behavior: "smooth" });
  }, [s.messages, j, ht.length]);
  const _ = W.useCallback(() => {
    const U = Mt.current;
    U && (U.style.height = "auto", U.style.height = Math.min(U.scrollHeight, 110) + "px");
  }, []);
  W.useEffect(() => {
    _();
  }, [C, _]);
  const H = W.useCallback(
    (U) => {
      if (!(!Tt || y))
        for (const ct of Array.from(U)) {
          const qt = crypto.randomUUID(), ce = Wd(ct);
          Nt((_t) => [
            ..._t,
            { id: qt, name: ct.name, kind: ce, size: ct.size, status: "loading" }
          ]), Iy(ct).then((_t) => {
            Nt(
              (Ll) => Ll.map((ll) => ll.id === qt ? { ...ll, status: "ready", att: _t } : ll)
            );
          }).catch((_t) => {
            const Ll = (_t == null ? void 0 : _t.message) ?? String(_t);
            Nt(
              (ll) => ll.map((Rl) => Rl.id === qt ? { ...Rl, status: "error", error: Ll } : Rl)
            );
          });
        }
    },
    [Tt, y]
  ), J = (U) => {
    Nt((ct) => ct.filter((qt) => qt.id !== U));
  }, mt = (U) => {
    U.target.files && U.target.files.length > 0 && H(U.target.files), U.target.value = "";
  }, yt = (U) => {
    var qt;
    const ct = (qt = U.clipboardData) == null ? void 0 : qt.files;
    ct && ct.length > 0 && (H(ct), U.preventDefault());
  }, d = (U) => {
    !Tt || y || Array.from(U.dataTransfer.types).includes("Files") && (U.preventDefault(), At.current += 1, jt(!0));
  }, D = (U) => {
    !Tt || y || Array.from(U.dataTransfer.types).includes("Files") && U.preventDefault();
  }, B = () => {
    At.current -= 1, At.current <= 0 && (At.current = 0, jt(!1));
  }, Y = (U) => {
    At.current = 0, jt(!1), !(!Tt || y) && U.dataTransfer.files && U.dataTransfer.files.length > 0 && (U.preventDefault(), H(U.dataTransfer.files));
  }, w = W.useCallback(
    async (U, ct) => {
      var Rl;
      const qt = U.trim();
      if (!qt && ct.length === 0 || y || !Tt) return;
      ot(null), rt(qt), Jt(ct), A(""), Nt([]), R(!0), L("");
      const ce = { role: "user", content: qt };
      ct.length > 0 && (ce.attachments = ct);
      let _t = { ...s };
      _t.title || (_t.title = Qy(qt || ((Rl = ct[0]) == null ? void 0 : Rl.name) || "Attachment")), _t.provider = m.provider, _t.model = m.models[m.provider] ?? "", _t.messages = [..._t.messages, ce], _t.updatedAt = Date.now(), N(_t), Rd(f, _t);
      const Ll = new AbortController();
      X.current = Ll;
      let ll = "";
      await h0({
        api: f,
        settings: m,
        history: _t.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: qt,
        attachments: ct.length > 0 ? ct : void 0,
        callbacks: {
          onTextDelta(Ql) {
            ll += Ql, L(ll);
          },
          onOpsApplied() {
          },
          onTurnsCommitted(Ql) {
            L(""), ll = "", _t = { ..._t, messages: [..._t.messages, ...Ql], updatedAt: Date.now() }, N(_t), Rd(f, _t);
          },
          onError(Ql) {
            ot(Ql), L(""), ll = "";
          },
          onFinished() {
            R(!1), X.current = null;
          }
        },
        signal: Ll.signal
      });
    },
    [f, y, s, N, Tt, m]
  ), I = () => w(C, sl), it = (U) => {
    U.key === "Enter" && !U.shiftKey && (U.preventDefault(), w(C, sl));
  }, wt = () => {
    var U;
    return (U = X.current) == null ? void 0 : U.abort();
  }, xt = () => w(V, lt), Xl = s.messages.filter((U) => U.role !== "tool"), Ue = Xl.length === 0 && !y, Ie = Ue ? pf(f).filter((U) => U.id !== s.id).length : 0;
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `gcp-chat${Zt ? " gcp-dragging" : ""}`,
      onDragEnter: d,
      onDragOver: D,
      onDragLeave: B,
      onDrop: Y,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-messages", role: "log", "aria-live": "polite", "aria-label": "Conversation", children: [
          Ue && /* @__PURE__ */ b.jsxs("div", { className: "gcp-welcome", children: [
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." }),
            Ie > 0 && /* @__PURE__ */ b.jsxs(
              "button",
              {
                className: "gcp-welcome-history",
                onClick: z,
                "aria-label": "View previous conversations",
                children: [
                  /* @__PURE__ */ b.jsx(b0, {}),
                  "Previous conversations (",
                  Ie,
                  ")"
                ]
              }
            )
          ] }),
          Xl.map((U, ct) => {
            const qt = !y && ct === Xl.length - 1 && U.role === "assistant";
            return /* @__PURE__ */ b.jsx(
              Zd,
              {
                turn: U,
                error: qt && ut ? ut : null,
                onRetry: xt,
                retryDisabled: y
              },
              ct
            );
          }),
          y && /* @__PURE__ */ b.jsx(Zd, { turn: { role: "assistant", content: "" }, streaming: !0, streamingText: j }),
          /* @__PURE__ */ b.jsx("div", { ref: Q })
        ] }),
        Zt && /* @__PURE__ */ b.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ b.jsx(Vd, {}),
          /* @__PURE__ */ b.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-input-area", children: [
          ht.length > 0 && /* @__PURE__ */ b.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: ht.map((U) => {
            var ct;
            return /* @__PURE__ */ b.jsxs(
              "div",
              {
                className: `gcp-chip ${U.kind === "image" ? "image" : "file"} ${U.status}`,
                title: U.status === "error" ? U.error : `${U.name} · ${Un(U.size)}`,
                children: [
                  U.kind === "image" && ((ct = U.att) != null && ct.dataUrl) ? /* @__PURE__ */ b.jsx("img", { className: "gcp-chip-thumb", src: U.att.dataUrl, alt: U.name }) : /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ b.jsx(p0, { kind: U.kind }) }),
                  /* @__PURE__ */ b.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-name", children: U.name }),
                    /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-size", children: U.status === "loading" ? "reading…" : U.status === "error" ? "failed" : Un(U.size) })
                  ] }),
                  U.status === "loading" && /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ b.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => J(U.id),
                      "aria-label": `Remove ${U.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ b.jsx(S0, {})
                    }
                  )
                ]
              },
              U.id
            );
          }) }),
          /* @__PURE__ */ b.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ b.jsx(
              "input",
              {
                ref: Ct,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: mt,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var U;
                  return (U = Ct.current) == null ? void 0 : U.click();
                },
                disabled: !Tt || y,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ b.jsx(Vd, {})
              }
            ),
            /* @__PURE__ */ b.jsx(
              "textarea",
              {
                ref: Mt,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: C,
                onChange: (U) => A(U.target.value),
                onKeyDown: it,
                onPaste: yt,
                disabled: y || !Tt,
                "aria-label": "Message input",
                "aria-disabled": Tt ? void 0 : "true"
              }
            ),
            y ? /* @__PURE__ */ b.jsx("button", { className: "gcp-stop-btn", onClick: wt, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ b.jsx(g0, {}) }) : /* @__PURE__ */ b.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: I,
                disabled: !ol,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ b.jsx(v0, {})
              }
            )
          ] }),
          !Tt && !y && /* @__PURE__ */ b.jsxs("div", { className: "gcp-not-ready-overlay", children: [
            /* @__PURE__ */ b.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                className: "gcp-cta-btn",
                onClick: x,
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
function E0(f) {
  const m = Date.now() - f, p = Math.floor(m / 1e3);
  if (p < 60) return "just now";
  const s = Math.floor(p / 60);
  if (s < 60) return `${s}m ago`;
  const N = Math.floor(s / 60);
  if (N < 24) return `${N}h ago`;
  const x = Math.floor(N / 24);
  return x < 7 ? `${x}d ago` : `${Math.floor(x / 7)}w ago`;
}
function _0({ api: f, activeId: m, onResume: p, onNew: s }) {
  const [N, x] = W.useState(
    () => pf(f)
  ), [z, C] = W.useState(null), A = (R, j) => {
    R.stopPropagation(), z === j ? (Ly(f, j), x(pf(f)), z === j && C(null)) : C(j);
  }, y = () => {
    C(null);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ b.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ b.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: s,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    N.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ b.jsx("div", { className: "gcp-history-list", onClick: y, children: N.map((R) => /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: `gcp-history-item${R.id === m ? " active" : ""}`,
        onClick: () => p(R),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${R.title || "(untitled)"}`,
        onKeyDown: (j) => {
          (j.key === "Enter" || j.key === " ") && (j.preventDefault(), p(R));
        },
        children: [
          /* @__PURE__ */ b.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ b.jsx("div", { className: "gcp-history-title", children: R.title || "(untitled)" }),
            /* @__PURE__ */ b.jsxs("div", { className: "gcp-history-meta", children: [
              E0(R.updatedAt),
              " · ",
              R.provider,
              "/",
              R.model || "—"
            ] })
          ] }),
          /* @__PURE__ */ b.jsx(
            "button",
            {
              className: `gcp-history-delete${z === R.id ? " confirm" : ""}`,
              onClick: (j) => A(j, R.id),
              "aria-label": z === R.id ? `Confirm delete "${R.title || "untitled"}"` : `Delete "${R.title || "untitled"}"`,
              title: z === R.id ? "Click again to confirm" : "Delete",
              children: "✕"
            }
          )
        ]
      },
      R.id
    )) })
  ] });
}
const Kd = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, A0 = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], z0 = 2e3, O0 = 300 * 1e3;
function M0({
  value: f,
  onBlur: m,
  placeholder: p,
  "aria-label": s
}) {
  const [N, x] = W.useState(!1), [z, C] = W.useState(f);
  return W.useEffect(() => {
    C(f);
  }, [f]), /* @__PURE__ */ b.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ b.jsx(
      "input",
      {
        type: N ? "text" : "password",
        className: "gcp-input",
        value: z,
        onChange: (A) => C(A.target.value),
        onBlur: () => m(z),
        placeholder: p ?? "API key",
        "aria-label": s,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ b.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => x((A) => !A),
        "aria-label": N ? "Hide key" : "Show key",
        title: N ? "Hide" : "Show",
        children: N ? "Hide" : "Show"
      }
    )
  ] });
}
function D0({
  api: f,
  settings: m,
  codexLoggedIn: p,
  codexEmail: s,
  onCodexStatusChange: N,
  onChange: x
}) {
  const z = m.provider, [C, A] = W.useState([]), [y, R] = W.useState(!1), [j, L] = W.useState(null), [ut, ot] = W.useState(null), [V, rt] = W.useState(!1), lt = W.useRef(null), Jt = W.useRef(0);
  W.useEffect(() => () => {
    lt.current !== null && (clearInterval(lt.current), lt.current = null);
  }, []), W.useEffect(() => {
    z === "openai-codex" && Sf(f).then((X) => {
      X.status === "logged_in" && N(!0, X.email ?? null);
    }).catch(() => {
    });
  }, []);
  function ht(X) {
    x({ ...m, ...X });
  }
  function Nt(X) {
    ht({ models: { ...m.models, [z]: X } });
  }
  function Zt(X, At) {
    ht({ apiKeys: { ...m.apiKeys, [X]: At } });
  }
  async function jt() {
    R(!0), L(null);
    try {
      const X = z === "openai" ? m.apiKeys.openai : z === "openrouter" ? m.apiKeys.openrouter : z === "anthropic" ? m.apiKeys.anthropic : z === "custom" ? m.apiKeys.custom : void 0, At = await t0(
        f,
        z,
        X,
        z === "custom" ? m.customBaseUrl : void 0
      );
      A(At);
    } catch (X) {
      L(String(X));
    } finally {
      R(!1);
    }
  }
  async function Q() {
    try {
      const X = await l0(f);
      window.open(X, "_blank"), rt(!0), Jt.current = Date.now(), lt.current = setInterval(async () => {
        try {
          const At = await Sf(f);
          At.status === "logged_in" && (N(!0, At.email ?? null), rt(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null));
        } catch {
        }
        Date.now() - Jt.current > O0 && (rt(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null));
      }, z0);
    } catch (X) {
      ot(String(X));
    }
  }
  async function Mt() {
    try {
      await e0(f), N(!1, null), rt(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null);
    } catch (X) {
      ot(String(X));
    }
  }
  const Ct = "gcp-model-datalist";
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ b.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ b.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: z,
          onChange: (X) => ht({ provider: X.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(Kd).map((X) => /* @__PURE__ */ b.jsx("option", { value: X, children: Kd[X] }, X))
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ b.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ b.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ b.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: Ct,
            value: m.models[z] ?? "",
            onChange: (X) => Nt(X.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ b.jsx("datalist", { id: Ct, children: C.map((X) => /* @__PURE__ */ b.jsx("option", { value: X }, X)) }),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: jt,
            disabled: y,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: y ? "Loading..." : "Load list"
          }
        )
      ] }),
      j && /* @__PURE__ */ b.jsx("span", { className: "gcp-field-hint error", role: "alert", children: j })
    ] }),
    z !== "openai-codex" && A0.filter((X) => X === z || z === "custom" && X === "custom").map(
      (X) => X === z ? /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ b.jsx("label", { className: "gcp-label", children: X === "openai" ? "OpenAI API Key" : X === "anthropic" ? "Anthropic API Key" : X === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ b.jsx(
          M0,
          {
            value: m.apiKeys[X] ?? "",
            onBlur: (At) => Zt(X, At),
            placeholder: X === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": X === "openai" ? "OpenAI API key" : X === "anthropic" ? "Anthropic API key" : X === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, X) : null
    ),
    z === "custom" && /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ b.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ b.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: m.customBaseUrl,
          onChange: (X) => ht({ customBaseUrl: X.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    z === "openai-codex" && /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ b.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ b.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ b.jsx(
          "div",
          {
            className: `gcp-codex-status${p ? " signed-in" : V ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: p ? `Signed in${s ? ` as ${s}` : ""}` : V ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-codex-btns", children: [
          !p && /* @__PURE__ */ b.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: Q,
              disabled: V,
              "aria-label": "Sign in with ChatGPT Codex",
              children: V ? "Waiting..." : "Sign in"
            }
          ),
          p && /* @__PURE__ */ b.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: Mt,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        ut && /* @__PURE__ */ b.jsx("span", { className: "gcp-field-hint error", role: "alert", children: ut })
      ] })
    ] }),
    /* @__PURE__ */ b.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function N0() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ b.jsx(
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
function x0() {
  return /* @__PURE__ */ b.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ b.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ b.jsx(
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
function j0({
  api: f,
  settings: m,
  codexLoggedIn: p,
  codexEmail: s,
  conversation: N,
  onConversationChange: x,
  onSettingsChange: z,
  onCodexStatusChange: C,
  onNewConversation: A,
  onResumeConversation: y,
  onClose: R
}) {
  const [j, L] = W.useState("chat"), ut = (rt) => {
    y(rt), L("chat");
  }, ot = () => {
    A(), L("chat");
  }, V = (rt) => {
    L((lt) => lt === rt ? "chat" : rt);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-window", role: "dialog", "aria-label": "Graph Copilot", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-header", children: [
      /* @__PURE__ */ b.jsxs("span", { className: "gcp-header-title", children: [
        /* @__PURE__ */ b.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
        "Graph Copilot"
      ] }),
      /* @__PURE__ */ b.jsxs(
        "button",
        {
          className: `gcp-label-btn${j === "history" ? " active" : ""}`,
          onClick: () => V("history"),
          "aria-label": "Conversation history",
          title: "Previous conversations",
          children: [
            /* @__PURE__ */ b.jsx(N0, {}),
            /* @__PURE__ */ b.jsx("span", { children: "History" })
          ]
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          className: `gcp-icon-btn${j === "settings" ? " active" : ""}`,
          onClick: () => V("settings"),
          "aria-label": "Settings",
          title: "Settings",
          children: /* @__PURE__ */ b.jsx(x0, {})
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          className: "gcp-icon-btn",
          onClick: R,
          "aria-label": "Close panel",
          title: "Close",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-view", children: [
      j === "chat" && /* @__PURE__ */ b.jsx(
        T0,
        {
          api: f,
          settings: m,
          codexLoggedIn: p,
          conversation: N,
          onConversationChange: x,
          onOpenSettings: () => L("settings"),
          onOpenHistory: () => L("history")
        }
      ),
      j === "history" && /* @__PURE__ */ b.jsx(
        _0,
        {
          api: f,
          activeId: N.id,
          onResume: ut,
          onNew: ot
        }
      ),
      j === "settings" && /* @__PURE__ */ b.jsx(
        D0,
        {
          api: f,
          settings: m,
          codexLoggedIn: p,
          codexEmail: s,
          onCodexStatusChange: C,
          onChange: z
        }
      )
    ] })
  ] });
}
function C0({ api: f }) {
  const [m, p] = W.useState(!1), [s, N] = W.useState(() => Yy(f)), [x, z] = W.useState(!1), [C, A] = W.useState(null), [y, R] = W.useState(
    () => Hd(s.provider, s.models[s.provider] ?? "")
  );
  W.useEffect(() => {
    Gy(f, s);
  }, [f, s]), W.useEffect(() => {
    if (s.provider !== "openai-codex") return;
    let V = !1;
    return Sf(f).then((rt) => {
      !V && rt.status === "logged_in" && (z(!0), A(rt.email ?? null));
    }).catch(() => {
    }), () => {
      V = !0;
    };
  }, [f, s.provider]);
  const j = (V) => {
    N(V);
  }, L = (V, rt) => {
    z(V), A(rt);
  }, ut = () => {
    R(
      Hd(
        s.provider,
        s.models[s.provider] ?? ""
      )
    );
  }, ot = (V) => {
    R(V);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ b.jsx(Vy, { onClick: () => p((V) => !V) }),
    m && /* @__PURE__ */ b.jsx(
      j0,
      {
        api: f,
        settings: s,
        codexLoggedIn: x,
        codexEmail: C,
        conversation: y,
        onConversationChange: R,
        onSettingsChange: j,
        onCodexStatusChange: L,
        onNewConversation: ut,
        onResumeConversation: ot,
        onClose: () => p(!1)
      }
    )
  ] });
}
function U0(f) {
  const m = f.ui.addFloatingWidget({ id: "copilot" });
  By.createRoot(m).render(
    /* @__PURE__ */ b.jsx(Ny.StrictMode, { children: /* @__PURE__ */ b.jsx(C0, { api: f }) })
  );
}
export {
  U0 as default
};
