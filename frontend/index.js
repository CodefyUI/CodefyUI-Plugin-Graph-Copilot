(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #14171d;--gcp-bg-deep: #0e1116;--gcp-surface: #1a1f27;--gcp-surface-2: #212732;--gcp-surface-hi: rgba(255, 255, 255, .055);--gcp-border: #2a313d;--gcp-border-soft: rgba(255, 255, 255, .07);--gcp-edge-hi: rgba(255, 255, 255, .06);--gcp-text: #e8eaf0;--gcp-dim: #9aa4b4;--gcp-faint: #6b7484;--gcp-accent: #2dd4d8;--gcp-accent-bright: #5ee7ea;--gcp-accent-deep: #0c98a6;--gcp-accent-ink: #04161a;--gcp-accent-soft: rgba(45, 212, 216, .12);--gcp-accent-line: rgba(45, 212, 216, .28);--gcp-grad: linear-gradient(135deg, #46e0e2 0%, #1ab6bf 55%, #0c98a6 100%);--gcp-danger: #f87171;--gcp-warn: #fbbf24;--gcp-ok: #34d399;--gcp-r-lg: 16px;--gcp-r: 11px;--gcp-r-sm: 8px;--gcp-shadow: 0 24px 56px -16px rgba(0, 0, 0, .7), 0 6px 16px rgba(0, 0, 0, .38);--gcp-shadow-sm: 0 4px 14px rgba(0, 0, 0, .35);--gcp-glow: 0 10px 30px -6px rgba(20, 182, 191, .5);--gcp-mono: "Cascadia Code", "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;--gcp-ease: cubic-bezier(.22, 1, .36, 1);position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box;-webkit-font-smoothing:antialiased}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:8px;height:8px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:8px;border:2px solid transparent;background-clip:padding-box}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-faint);background-clip:padding-box}.gcp-fab{width:52px;height:52px;border-radius:50%;background:var(--gcp-grad);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:var(--gcp-glow),inset 0 1px #ffffff59;transition:transform .18s var(--gcp-ease),box-shadow .18s var(--gcp-ease),filter .18s var(--gcp-ease);outline:none;animation:gcp-fab-glow 4.5s ease-in-out infinite}.gcp-fab:after{content:"";position:absolute;top:-6px;right:-6px;bottom:-6px;left:-6px;border-radius:50%;background:radial-gradient(closest-side,rgba(45,212,216,.35),transparent 70%);opacity:0;transition:opacity .2s ease;pointer-events:none}.gcp-fab:hover{transform:translateY(-2px) scale(1.05);filter:brightness(1.05)}.gcp-fab:hover:after{opacity:1}.gcp-fab:active{transform:scale(.96)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:4px}@keyframes gcp-fab-glow{0%,to{box-shadow:0 10px 30px -6px #14b6bf73,inset 0 1px #ffffff59}50%{box-shadow:0 14px 38px -4px #14b6bf9e,inset 0 1px #ffffff59}}.gcp-window{position:fixed;bottom:16px;right:16px;width:432px;height:min(620px,calc(100vh - 96px));background:radial-gradient(120% 60% at 50% -10%,rgba(45,212,216,.06),transparent 60%),var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-lg);display:flex;flex-direction:column;box-shadow:var(--gcp-shadow);overflow:hidden;animation:gcp-window-in .28s var(--gcp-ease) both}.gcp-window:before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;border-radius:inherit;border-top:1px solid var(--gcp-edge-hi);pointer-events:none}@keyframes gcp-window-in{0%{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}.gcp-header{display:flex;align-items:center;padding:11px 12px;border-bottom:1px solid var(--gcp-border-soft);gap:8px;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent),var(--gcp-bg-deep);flex-shrink:0;position:relative;z-index:1}.gcp-header-title{flex:1;font-weight:600;font-size:13px;letter-spacing:.01em;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px}.gcp-header-mark{width:18px;height:18px;border-radius:6px;background:var(--gcp-grad);box-shadow:0 2px 8px #14b6bf73,inset 0 1px #fff6;display:inline-flex;align-items:center;justify-content:center;color:var(--gcp-accent-ink);font-size:11px;flex-shrink:0}.gcp-icon-btn{width:30px;height:30px;border-radius:var(--gcp-r-sm);border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .14s ease,color .14s ease,transform .14s var(--gcp-ease);outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-icon-btn:active{transform:scale(.92)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent);background:var(--gcp-accent-soft)}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden;position:relative}.gcp-messages{flex:1;overflow-y:auto;padding:14px 14px 8px;display:flex;flex-direction:column;gap:12px}.gcp-welcome{margin:auto;text-align:center;padding:24px 26px;max-width:300px;display:flex;flex-direction:column;align-items:center;gap:10px}.gcp-welcome-mark{width:46px;height:46px;border-radius:14px;background:var(--gcp-grad);color:var(--gcp-accent-ink);display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:var(--gcp-glow),inset 0 1px #fff6;animation:gcp-pop .46s var(--gcp-ease) both}.gcp-welcome-title{font-size:15px;font-weight:650;color:var(--gcp-text);letter-spacing:.01em;animation:gcp-rise .46s var(--gcp-ease) 60ms both}.gcp-welcome-sub{font-size:12.5px;line-height:1.6;color:var(--gcp-dim);animation:gcp-rise .46s var(--gcp-ease) .12s both}@keyframes gcp-pop{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}.gcp-msg-row{display:flex;flex-direction:column;gap:6px;animation:gcp-rise .3s var(--gcp-ease) both}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}@keyframes gcp-rise{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}.gcp-bubble{max-width:86%;padding:9px 12px;border-radius:var(--gcp-r);line-height:1.55;word-break:break-word;white-space:pre-wrap;font-size:13px;box-shadow:var(--gcp-shadow-sm)}.gcp-msg-row.user .gcp-bubble{background:linear-gradient(180deg,#2dd4d829,#2dd4d81a);border:1px solid var(--gcp-accent-line);color:var(--gcp-text);border-bottom-right-radius:4px}.gcp-msg-row.assistant .gcp-bubble{background:var(--gcp-surface);border:1px solid var(--gcp-border-soft);color:var(--gcp-text);border-bottom-left-radius:4px;box-shadow:var(--gcp-shadow-sm),inset 0 1px 0 var(--gcp-edge-hi)}.gcp-bubble.error{background:#f871711a;border:1px solid rgba(248,113,113,.32);color:var(--gcp-text)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);padding:10px 11px;overflow-x:auto;font-size:12px;font-family:var(--gcp-mono);margin:7px 0 2px;white-space:pre;line-height:1.5}.gcp-bubble pre:first-child{margin-top:0}.gcp-bubble code{font-family:var(--gcp-mono);font-size:12px}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;border-radius:1px;animation:gcp-blink 1s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-bubble-attachments{display:flex;flex-wrap:wrap;gap:6px;max-width:86%;justify-content:inherit}.gcp-msg-row.user .gcp-bubble-attachments{justify-content:flex-end}.gcp-att-image{max-width:160px;max-height:160px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);object-fit:cover;display:block;box-shadow:var(--gcp-shadow-sm)}.gcp-att-file{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border-soft);color:var(--gcp-dim);font-size:11.5px;max-width:180px}.gcp-att-file svg{color:var(--gcp-accent);flex-shrink:0}.gcp-att-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gcp-ops-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:999px;background:var(--gcp-accent-soft);border:1px solid var(--gcp-accent-line);color:var(--gcp-accent-bright);font-size:11px;line-height:1.5;font-variant-numeric:tabular-nums}.gcp-retry-btn{padding:4px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;align-self:flex-end}.gcp-retry-btn:hover{background:#f871711f}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-dropzone{position:absolute;top:8px;right:8px;bottom:8px;left:8px;z-index:5;border-radius:var(--gcp-r);background:#0e1116c7;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;pointer-events:none;animation:gcp-fade .12s ease both}.gcp-dropzone-inner{display:flex;flex-direction:column;align-items:center;gap:10px;padding:26px 34px;border:1.5px dashed var(--gcp-accent-line);border-radius:var(--gcp-r);color:var(--gcp-accent-bright);font-size:13px;background:var(--gcp-accent-soft)}.gcp-dropzone-inner svg{width:22px;height:22px}@keyframes gcp-fade{0%{opacity:0}to{opacity:1}}.gcp-input-area{position:relative;padding:10px 12px 12px;border-top:1px solid var(--gcp-border-soft);display:flex;flex-direction:column;gap:8px;flex-shrink:0;background:linear-gradient(180deg,transparent,rgba(0,0,0,.12)),var(--gcp-bg-deep)}.gcp-input-row{display:flex;gap:8px;align-items:flex-end}.gcp-attachments{display:flex;flex-wrap:wrap;gap:7px}.gcp-chip{position:relative;display:inline-flex;align-items:center;gap:8px;padding:5px 7px 5px 6px;border-radius:var(--gcp-r-sm);background:var(--gcp-surface-2);border:1px solid var(--gcp-border);max-width:190px;animation:gcp-pop .22s var(--gcp-ease) both}.gcp-chip.error{border-color:#f8717180;background:#f8717114}.gcp-chip-thumb{width:30px;height:30px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid var(--gcp-border-soft)}.gcp-chip-icon{width:30px;height:30px;border-radius:6px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:var(--gcp-bg-deep);color:var(--gcp-accent)}.gcp-chip.error .gcp-chip-icon{color:var(--gcp-danger)}.gcp-chip-body{display:flex;flex-direction:column;min-width:0;line-height:1.25}.gcp-chip-name{font-size:12px;color:var(--gcp-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:110px}.gcp-chip-size{font-size:10.5px;color:var(--gcp-faint)}.gcp-chip.error .gcp-chip-size{color:var(--gcp-danger)}.gcp-chip-spinner{width:13px;height:13px;border-radius:50%;border:2px solid var(--gcp-border);border-top-color:var(--gcp-accent);flex-shrink:0;animation:gcp-spin .7s linear infinite}@keyframes gcp-spin{to{transform:rotate(360deg)}}.gcp-chip-remove{width:18px;height:18px;border-radius:5px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .13s ease,color .13s ease;outline:none}.gcp-chip-remove:hover{background:var(--gcp-surface-hi);color:var(--gcp-text)}.gcp-chip-remove:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-file-input{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}.gcp-attach-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .14s ease,border-color .14s ease,background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-attach-btn:hover:not(:disabled){color:var(--gcp-accent);border-color:var(--gcp-accent-line);background:var(--gcp-accent-soft)}.gcp-attach-btn:active:not(:disabled){transform:scale(.93)}.gcp-attach-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-attach-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-textarea{flex:1;resize:none;background:var(--gcp-surface);border:1px solid var(--gcp-border);border-radius:var(--gcp-r-sm);color:var(--gcp-text);font-family:inherit;font-size:13px;padding:8px 11px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .14s ease,box-shadow .14s ease}.gcp-textarea::placeholder{color:var(--gcp-faint)}.gcp-textarea:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-textarea:disabled{opacity:.55;cursor:not-allowed}.gcp-send-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:none;background:var(--gcp-grad);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px #14b6bf66,inset 0 1px #ffffff4d;transition:filter .14s ease,transform .14s var(--gcp-ease),box-shadow .14s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.08);box-shadow:0 6px 18px #14b6bf8c,inset 0 1px #ffffff4d}.gcp-send-btn:active:not(:disabled){transform:scale(.93)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed;background:var(--gcp-surface-2);color:var(--gcp-faint);box-shadow:none}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent-bright);outline-offset:2px}.gcp-stop-btn{width:36px;height:36px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-stop-btn:hover{background:#f871711f}.gcp-stop-btn:active{transform:scale(.93)}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#0e1116db;display:flex;align-items:center;justify-content:center;gap:10px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 15px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#2dd4d833}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:12px;border-bottom:1px solid var(--gcp-border-soft);flex-shrink:0}.gcp-new-btn{width:100%;padding:9px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:13px;font-weight:550;font-family:inherit;cursor:pointer;transition:background .14s ease,transform .14s var(--gcp-ease);outline:none}.gcp-new-btn:hover{background:#2dd4d82e}.gcp-new-btn:active{transform:scale(.99)}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:3px}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:var(--gcp-r-sm);cursor:pointer;transition:background .14s ease,box-shadow .14s ease;border:1px solid transparent;position:relative}.gcp-history-item:hover{background:var(--gcp-surface-hi)}.gcp-history-item.active{background:var(--gcp-accent-soft);border-color:var(--gcp-accent-line)}.gcp-history-item.active:before{content:"";position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:3px;background:var(--gcp-grad)}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500}.gcp-history-meta{font-size:11px;color:var(--gcp-faint);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.gcp-history-delete{width:26px;height:26px;border-radius:6px;border:none;background:transparent;color:var(--gcp-faint);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .13s ease,background .13s ease,opacity .13s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711f}.gcp-history-delete.confirm{color:var(--gcp-danger);background:#f8717124;opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:40px 18px;text-align:center;color:var(--gcp-faint);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:16px 14px 20px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:6px}.gcp-label{font-size:11px;font-weight:650;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.06em}.gcp-select,.gcp-input{width:100%;padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .14s ease,box-shadow .14s ease}.gcp-select{cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239aa4b4' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 11px center;padding-right:30px}.gcp-select:focus,.gcp-input:focus{border-color:var(--gcp-accent);box-shadow:0 0 0 3px var(--gcp-accent-soft)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:8px 12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:var(--gcp-mono)}.gcp-show-btn{padding:8px 11px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border);background:var(--gcp-surface);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .14s ease,color .14s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-border-soft);background:var(--gcp-surface)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:var(--gcp-warn)}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:7px 14px;border-radius:var(--gcp-r-sm);border:1px solid var(--gcp-accent-line);background:var(--gcp-accent-soft);color:var(--gcp-accent-bright);font-size:12px;font-family:inherit;cursor:pointer;transition:background .14s ease;outline:none}.gcp-codex-btn:hover{background:#2dd4d82e}.gcp-codex-btn.danger{border-color:#f8717180;background:transparent;color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711f}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-faint);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-faint);line-height:1.6;padding-top:6px;border-top:1px solid var(--gcp-border-soft)}@media(prefers-reduced-motion:reduce){.gcp-root *,.gcp-root *:before,.gcp-root *:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}`)),document.head.appendChild(e)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
function zy(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default") ? f.default : f;
}
var rf = { exports: {} }, Dn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function Oy() {
  if (Td) return Dn;
  Td = 1;
  var f = Symbol.for("react.transitional.element"), m = Symbol.for("react.fragment");
  function g(s, N, x) {
    var z = null;
    if (x !== void 0 && (z = "" + x), N.key !== void 0 && (z = "" + N.key), "key" in N) {
      x = {};
      for (var U in N)
        U !== "key" && (x[U] = N[U]);
    } else x = N;
    return N = x.ref, {
      $$typeof: f,
      type: s,
      key: z,
      ref: N !== void 0 ? N : null,
      props: x
    };
  }
  return Dn.Fragment = m, Dn.jsx = g, Dn.jsxs = g, Dn;
}
var Ed;
function My() {
  return Ed || (Ed = 1, rf.exports = Oy()), rf.exports;
}
var b = My(), df = { exports: {} }, $ = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _d;
function Dy() {
  if (_d) return $;
  _d = 1;
  var f = Symbol.for("react.transitional.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), z = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), E = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), Z = Symbol.iterator;
  function ut(d) {
    return d === null || typeof d != "object" ? null : (d = Z && d[Z] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var dt = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, V = Object.assign, ot = {};
  function lt(d, D, B) {
    this.props = d, this.context = D, this.refs = ot, this.updater = B || dt;
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
  function Ut() {
  }
  Ut.prototype = lt.prototype;
  function ht(d, D, B) {
    this.props = d, this.context = D, this.refs = ot, this.updater = B || dt;
  }
  var Bt = ht.prototype = new Ut();
  Bt.constructor = ht, V(Bt, lt.prototype), Bt.isPureReactComponent = !0;
  var Lt = Array.isArray;
  function Ct() {
  }
  var L = { H: null, A: null, T: null, S: null }, Mt = Object.prototype.hasOwnProperty;
  function Dt(d, D, B) {
    var q = B.ref;
    return {
      $$typeof: f,
      type: d,
      key: D,
      ref: q !== void 0 ? q : null,
      props: B
    };
  }
  function G(d, D) {
    return Dt(d.type, D, d.props);
  }
  function it(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function It(d) {
    var D = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(B) {
      return D[B];
    });
  }
  var jl = /\/+/g;
  function Ul(d, D) {
    return typeof d == "object" && d !== null && d.key != null ? It("" + d.key) : D.toString(36);
  }
  function ll(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(Ct, Ct) : (d.status = "pending", d.then(
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
  function _(d, D, B, q, w) {
    var I = typeof d;
    (I === "undefined" || I === "boolean") && (d = null);
    var ct = !1;
    if (d === null) ct = !0;
    else
      switch (I) {
        case "bigint":
        case "string":
        case "number":
          ct = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case m:
              ct = !0;
              break;
            case R:
              return ct = d._init, _(
                ct(d._payload),
                D,
                B,
                q,
                w
              );
          }
      }
    if (ct)
      return w = w(d), ct = q === "" ? "." + Ul(d, 0) : q, Lt(w) ? (B = "", ct != null && (B = ct.replace(jl, "$&/") + "/"), _(w, D, B, "", function(Ue) {
        return Ue;
      })) : w != null && (it(w) && (w = G(
        w,
        B + (w.key == null || d && d.key === w.key ? "" : ("" + w.key).replace(
          jl,
          "$&/"
        ) + "/") + ct
      )), D.push(w)), 1;
    ct = 0;
    var Jt = q === "" ? "." : q + ":";
    if (Lt(d))
      for (var At = 0; At < d.length; At++)
        q = d[At], I = Jt + Ul(q, At), ct += _(
          q,
          D,
          B,
          I,
          w
        );
    else if (At = ut(d), typeof At == "function")
      for (d = At.call(d), At = 0; !(q = d.next()).done; )
        q = q.value, I = Jt + Ul(q, At++), ct += _(
          q,
          D,
          B,
          I,
          w
        );
    else if (I === "object") {
      if (typeof d.then == "function")
        return _(
          ll(d),
          D,
          B,
          q,
          w
        );
      throw D = String(d), Error(
        "Objects are not valid as a React child (found: " + (D === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : D) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ct;
  }
  function H(d, D, B) {
    if (d == null) return d;
    var q = [], w = 0;
    return _(d, q, "", "", function(I) {
      return D.call(B, I, w++);
    }), q;
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
      if (!it(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return $.Activity = j, $.Children = yt, $.Component = lt, $.Fragment = g, $.Profiler = N, $.PureComponent = ht, $.StrictMode = s, $.Suspense = E, $.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, $.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return L.H.useMemoCache(d);
    }
  }, $.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, $.cacheSignal = function() {
    return null;
  }, $.cloneElement = function(d, D, B) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var q = V({}, d.props), w = d.key;
    if (D != null)
      for (I in D.key !== void 0 && (w = "" + D.key), D)
        !Mt.call(D, I) || I === "key" || I === "__self" || I === "__source" || I === "ref" && D.ref === void 0 || (q[I] = D[I]);
    var I = arguments.length - 2;
    if (I === 1) q.children = B;
    else if (1 < I) {
      for (var ct = Array(I), Jt = 0; Jt < I; Jt++)
        ct[Jt] = arguments[Jt + 2];
      q.children = ct;
    }
    return Dt(d.type, w, q);
  }, $.createContext = function(d) {
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
  }, $.createElement = function(d, D, B) {
    var q, w = {}, I = null;
    if (D != null)
      for (q in D.key !== void 0 && (I = "" + D.key), D)
        Mt.call(D, q) && q !== "key" && q !== "__self" && q !== "__source" && (w[q] = D[q]);
    var ct = arguments.length - 2;
    if (ct === 1) w.children = B;
    else if (1 < ct) {
      for (var Jt = Array(ct), At = 0; At < ct; At++)
        Jt[At] = arguments[At + 2];
      w.children = Jt;
    }
    if (d && d.defaultProps)
      for (q in ct = d.defaultProps, ct)
        w[q] === void 0 && (w[q] = ct[q]);
    return Dt(d, I, w);
  }, $.createRef = function() {
    return { current: null };
  }, $.forwardRef = function(d) {
    return { $$typeof: U, render: d };
  }, $.isValidElement = it, $.lazy = function(d) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: d },
      _init: J
    };
  }, $.memo = function(d, D) {
    return {
      $$typeof: S,
      type: d,
      compare: D === void 0 ? null : D
    };
  }, $.startTransition = function(d) {
    var D = L.T, B = {};
    L.T = B;
    try {
      var q = d(), w = L.S;
      w !== null && w(B, q), typeof q == "object" && q !== null && typeof q.then == "function" && q.then(Ct, mt);
    } catch (I) {
      mt(I);
    } finally {
      D !== null && B.types !== null && (D.types = B.types), L.T = D;
    }
  }, $.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, $.use = function(d) {
    return L.H.use(d);
  }, $.useActionState = function(d, D, B) {
    return L.H.useActionState(d, D, B);
  }, $.useCallback = function(d, D) {
    return L.H.useCallback(d, D);
  }, $.useContext = function(d) {
    return L.H.useContext(d);
  }, $.useDebugValue = function() {
  }, $.useDeferredValue = function(d, D) {
    return L.H.useDeferredValue(d, D);
  }, $.useEffect = function(d, D) {
    return L.H.useEffect(d, D);
  }, $.useEffectEvent = function(d) {
    return L.H.useEffectEvent(d);
  }, $.useId = function() {
    return L.H.useId();
  }, $.useImperativeHandle = function(d, D, B) {
    return L.H.useImperativeHandle(d, D, B);
  }, $.useInsertionEffect = function(d, D) {
    return L.H.useInsertionEffect(d, D);
  }, $.useLayoutEffect = function(d, D) {
    return L.H.useLayoutEffect(d, D);
  }, $.useMemo = function(d, D) {
    return L.H.useMemo(d, D);
  }, $.useOptimistic = function(d, D) {
    return L.H.useOptimistic(d, D);
  }, $.useReducer = function(d, D, B) {
    return L.H.useReducer(d, D, B);
  }, $.useRef = function(d) {
    return L.H.useRef(d);
  }, $.useState = function(d) {
    return L.H.useState(d);
  }, $.useSyncExternalStore = function(d, D, B) {
    return L.H.useSyncExternalStore(
      d,
      D,
      B
    );
  }, $.useTransition = function() {
    return L.H.useTransition();
  }, $.version = "19.2.7", $;
}
var Ad;
function Sf() {
  return Ad || (Ad = 1, df.exports = Dy()), df.exports;
}
var W = Sf();
const Ny = /* @__PURE__ */ zy(W);
var hf = { exports: {} }, Nn = {}, mf = { exports: {} }, yf = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zd;
function xy() {
  return zd || (zd = 1, (function(f) {
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
    function g(_) {
      return _.length === 0 ? null : _[0];
    }
    function s(_) {
      if (_.length === 0) return null;
      var H = _[0], J = _.pop();
      if (J !== H) {
        _[0] = J;
        t: for (var mt = 0, yt = _.length, d = yt >>> 1; mt < d; ) {
          var D = 2 * (mt + 1) - 1, B = _[D], q = D + 1, w = _[q];
          if (0 > N(B, J))
            q < yt && 0 > N(w, B) ? (_[mt] = w, _[q] = J, mt = q) : (_[mt] = B, _[D] = J, mt = D);
          else if (q < yt && 0 > N(w, J))
            _[mt] = w, _[q] = J, mt = q;
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
      var z = Date, U = z.now();
      f.unstable_now = function() {
        return z.now() - U;
      };
    }
    var E = [], S = [], R = 1, j = null, Z = 3, ut = !1, dt = !1, V = !1, ot = !1, lt = typeof setTimeout == "function" ? setTimeout : null, Ut = typeof clearTimeout == "function" ? clearTimeout : null, ht = typeof setImmediate < "u" ? setImmediate : null;
    function Bt(_) {
      for (var H = g(S); H !== null; ) {
        if (H.callback === null) s(S);
        else if (H.startTime <= _)
          s(S), H.sortIndex = H.expirationTime, m(E, H);
        else break;
        H = g(S);
      }
    }
    function Lt(_) {
      if (V = !1, Bt(_), !dt)
        if (g(E) !== null)
          dt = !0, Ct || (Ct = !0, It());
        else {
          var H = g(S);
          H !== null && ll(Lt, H.startTime - _);
        }
    }
    var Ct = !1, L = -1, Mt = 5, Dt = -1;
    function G() {
      return ot ? !0 : !(f.unstable_now() - Dt < Mt);
    }
    function it() {
      if (ot = !1, Ct) {
        var _ = f.unstable_now();
        Dt = _;
        var H = !0;
        try {
          t: {
            dt = !1, V && (V = !1, Ut(L), L = -1), ut = !0;
            var J = Z;
            try {
              l: {
                for (Bt(_), j = g(E); j !== null && !(j.expirationTime > _ && G()); ) {
                  var mt = j.callback;
                  if (typeof mt == "function") {
                    j.callback = null, Z = j.priorityLevel;
                    var yt = mt(
                      j.expirationTime <= _
                    );
                    if (_ = f.unstable_now(), typeof yt == "function") {
                      j.callback = yt, Bt(_), H = !0;
                      break l;
                    }
                    j === g(E) && s(E), Bt(_);
                  } else s(E);
                  j = g(E);
                }
                if (j !== null) H = !0;
                else {
                  var d = g(S);
                  d !== null && ll(
                    Lt,
                    d.startTime - _
                  ), H = !1;
                }
              }
              break t;
            } finally {
              j = null, Z = J, ut = !1;
            }
            H = void 0;
          }
        } finally {
          H ? It() : Ct = !1;
        }
      }
    }
    var It;
    if (typeof ht == "function")
      It = function() {
        ht(it);
      };
    else if (typeof MessageChannel < "u") {
      var jl = new MessageChannel(), Ul = jl.port2;
      jl.port1.onmessage = it, It = function() {
        Ul.postMessage(null);
      };
    } else
      It = function() {
        lt(it, 0);
      };
    function ll(_, H) {
      L = lt(function() {
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
      return Z;
    }, f.unstable_next = function(_) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
          var H = 3;
          break;
        default:
          H = Z;
      }
      var J = Z;
      Z = H;
      try {
        return _();
      } finally {
        Z = J;
      }
    }, f.unstable_requestPaint = function() {
      ot = !0;
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
      var J = Z;
      Z = _;
      try {
        return H();
      } finally {
        Z = J;
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
      }, J > mt ? (_.sortIndex = J, m(S, _), g(E) === null && _ === g(S) && (V ? (Ut(L), L = -1) : V = !0, ll(Lt, J - mt))) : (_.sortIndex = yt, m(E, _), dt || ut || (dt = !0, Ct || (Ct = !0, It()))), _;
    }, f.unstable_shouldYield = G, f.unstable_wrapCallback = function(_) {
      var H = Z;
      return function() {
        var J = Z;
        Z = H;
        try {
          return _.apply(this, arguments);
        } finally {
          Z = J;
        }
      };
    };
  })(yf)), yf;
}
var Od;
function jy() {
  return Od || (Od = 1, mf.exports = xy()), mf.exports;
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
var Md;
function Uy() {
  if (Md) return Pt;
  Md = 1;
  var f = Sf();
  function m(E) {
    var S = "https://react.dev/errors/" + E;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        S += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + E + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function g() {
  }
  var s = {
    d: {
      f: g,
      r: function() {
        throw Error(m(522));
      },
      D: g,
      C: g,
      L: g,
      m: g,
      X: g,
      S: g,
      M: g
    },
    p: 0,
    findDOMNode: null
  }, N = Symbol.for("react.portal");
  function x(E, S, R) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: N,
      key: j == null ? null : "" + j,
      children: E,
      containerInfo: S,
      implementation: R
    };
  }
  var z = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function U(E, S) {
    if (E === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return Pt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Pt.createPortal = function(E, S) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(m(299));
    return x(E, S, null, R);
  }, Pt.flushSync = function(E) {
    var S = z.T, R = s.p;
    try {
      if (z.T = null, s.p = 2, E) return E();
    } finally {
      z.T = S, s.p = R, s.d.f();
    }
  }, Pt.preconnect = function(E, S) {
    typeof E == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, s.d.C(E, S));
  }, Pt.prefetchDNS = function(E) {
    typeof E == "string" && s.d.D(E);
  }, Pt.preinit = function(E, S) {
    if (typeof E == "string" && S && typeof S.as == "string") {
      var R = S.as, j = U(R, S.crossOrigin), Z = typeof S.integrity == "string" ? S.integrity : void 0, ut = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      R === "style" ? s.d.S(
        E,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: j,
          integrity: Z,
          fetchPriority: ut
        }
      ) : R === "script" && s.d.X(E, {
        crossOrigin: j,
        integrity: Z,
        fetchPriority: ut,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, Pt.preinitModule = function(E, S) {
    if (typeof E == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var R = U(
            S.as,
            S.crossOrigin
          );
          s.d.M(E, {
            crossOrigin: R,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0
          });
        }
      } else S == null && s.d.M(E);
  }, Pt.preload = function(E, S) {
    if (typeof E == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var R = S.as, j = U(R, S.crossOrigin);
      s.d.L(E, R, {
        crossOrigin: j,
        integrity: typeof S.integrity == "string" ? S.integrity : void 0,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0,
        type: typeof S.type == "string" ? S.type : void 0,
        fetchPriority: typeof S.fetchPriority == "string" ? S.fetchPriority : void 0,
        referrerPolicy: typeof S.referrerPolicy == "string" ? S.referrerPolicy : void 0,
        imageSrcSet: typeof S.imageSrcSet == "string" ? S.imageSrcSet : void 0,
        imageSizes: typeof S.imageSizes == "string" ? S.imageSizes : void 0,
        media: typeof S.media == "string" ? S.media : void 0
      });
    }
  }, Pt.preloadModule = function(E, S) {
    if (typeof E == "string")
      if (S) {
        var R = U(S.as, S.crossOrigin);
        s.d.m(E, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: R,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0
        });
      } else s.d.m(E);
  }, Pt.requestFormReset = function(E) {
    s.d.r(E);
  }, Pt.unstable_batchedUpdates = function(E, S) {
    return E(S);
  }, Pt.useFormState = function(E, S, R) {
    return z.H.useFormState(E, S, R);
  }, Pt.useFormStatus = function() {
    return z.H.useHostTransitionStatus();
  }, Pt.version = "19.2.7", Pt;
}
var Dd;
function Cy() {
  if (Dd) return vf.exports;
  Dd = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
  }
  return f(), vf.exports = Uy(), vf.exports;
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
var Nd;
function Ry() {
  if (Nd) return Nn;
  Nd = 1;
  var f = jy(), m = Sf(), g = Cy();
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
  function U(t) {
    if (t.tag === 31) {
      var l = t.memoizedState;
      if (l === null && (t = t.alternate, t !== null && (l = t.memoizedState)), l !== null) return l.dehydrated;
    }
    return null;
  }
  function E(t) {
    if (x(t) !== t)
      throw Error(s(188));
  }
  function S(t) {
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
  function R(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t;
    for (t = t.child; t !== null; ) {
      if (l = R(t), l !== null) return l;
      t = t.sibling;
    }
    return null;
  }
  var j = Object.assign, Z = Symbol.for("react.element"), ut = Symbol.for("react.transitional.element"), dt = Symbol.for("react.portal"), V = Symbol.for("react.fragment"), ot = Symbol.for("react.strict_mode"), lt = Symbol.for("react.profiler"), Ut = Symbol.for("react.consumer"), ht = Symbol.for("react.context"), Bt = Symbol.for("react.forward_ref"), Lt = Symbol.for("react.suspense"), Ct = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), Mt = Symbol.for("react.lazy"), Dt = Symbol.for("react.activity"), G = Symbol.for("react.memo_cache_sentinel"), it = Symbol.iterator;
  function It(t) {
    return t === null || typeof t != "object" ? null : (t = it && t[it] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var jl = Symbol.for("react.client.reference");
  function Ul(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === jl ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case V:
        return "Fragment";
      case lt:
        return "Profiler";
      case ot:
        return "StrictMode";
      case Lt:
        return "Suspense";
      case Ct:
        return "SuspenseList";
      case Dt:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case dt:
          return "Portal";
        case ht:
          return t.displayName || "Context";
        case Ut:
          return (t._context.displayName || "Context") + ".Consumer";
        case Bt:
          var l = t.render;
          return t = t.displayName, t || (t = l.displayName || l.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case L:
          return l = t.displayName || null, l !== null ? l : Ul(t.type) || "Memo";
        case Mt:
          l = t._payload, t = t._init;
          try {
            return Ul(t(l));
          } catch {
          }
      }
    return null;
  }
  var ll = Array.isArray, _ = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = g.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
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
  var q = d(null), w = d(null), I = d(null), ct = d(null);
  function Jt(t, l) {
    switch (B(I, l), B(w, t), B(q, null), l.nodeType) {
      case 9:
      case 11:
        t = (t = l.documentElement) && (t = t.namespaceURI) ? Vr(t) : 0;
        break;
      default:
        if (t = l.tagName, l = l.namespaceURI)
          l = Vr(l), t = Kr(l, t);
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
    D(q), B(q, t);
  }
  function At() {
    D(q), D(w), D(I);
  }
  function Ue(t) {
    t.memoizedState !== null && B(ct, t);
    var l = q.current, e = Kr(l, t.type);
    l !== e && (B(w, t), B(q, e));
  }
  function C(t) {
    w.current === t && (D(q), D(w)), ct.current === t && (D(ct), An._currentValue = J);
  }
  var pt, Qt;
  function Sl(t) {
    if (pt === void 0)
      try {
        throw Error();
      } catch (e) {
        var l = e.stack.trim().match(/\n( *(at )?)/);
        pt = l && l[1] || "", Qt = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + pt + t + Qt;
  }
  var St = !1;
  function Bl(t, l) {
    if (!t || St) return "";
    St = !0;
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
                  var p = T;
                }
                Reflect.construct(t, [], M);
              } else {
                try {
                  M.call();
                } catch (T) {
                  p = T;
                }
                t.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (T) {
                p = T;
              }
              (M = t()) && typeof M.catch == "function" && M.catch(function() {
              });
            }
          } catch (T) {
            if (T && p && typeof T.stack == "string")
              return [T.stack, p.stack];
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
`), v = c.split(`
`);
        for (n = a = 0; a < o.length && !o[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; n < v.length && !v[n].includes(
          "DetermineComponentFrameRoot"
        ); )
          n++;
        if (a === o.length || n === v.length)
          for (a = o.length - 1, n = v.length - 1; 1 <= a && 0 <= n && o[a] !== v[n]; )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (o[a] !== v[n]) {
            if (a !== 1 || n !== 1)
              do
                if (a--, n--, 0 > n || o[a] !== v[n]) {
                  var A = `
` + o[a].replace(" at new ", " at ");
                  return t.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", t.displayName)), A;
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      St = !1, Error.prepareStackTrace = e;
    }
    return (e = t ? t.displayName || t.name : "") ? Sl(e) : "";
  }
  function bl(t, l) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Sl(t.type);
      case 16:
        return Sl("Lazy");
      case 13:
        return t.child !== l && l !== null ? Sl("Suspense Fallback") : Sl("Suspense");
      case 19:
        return Sl("SuspenseList");
      case 0:
      case 15:
        return Bl(t.type, !1);
      case 11:
        return Bl(t.type.render, !1);
      case 1:
        return Bl(t.type, !0);
      case 31:
        return Sl("Activity");
      default:
        return "";
    }
  }
  function Ll(t) {
    try {
      var l = "", e = null;
      do
        l += bl(t, e), e = t, t = t.return;
      while (t);
      return l;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Ql = Object.prototype.hasOwnProperty, Wu = f.unstable_scheduleCallback, Fu = f.unstable_cancelCallback, ah = f.unstable_shouldYield, nh = f.unstable_requestPaint, sl = f.unstable_now, uh = f.unstable_getCurrentPriorityLevel, Tf = f.unstable_ImmediatePriority, Ef = f.unstable_UserBlockingPriority, Un = f.unstable_NormalPriority, ih = f.unstable_LowPriority, _f = f.unstable_IdlePriority, ch = f.log, fh = f.unstable_setDisableYieldValue, Ha = null, ol = null;
  function ce(t) {
    if (typeof ch == "function" && fh(t), ol && typeof ol.setStrictMode == "function")
      try {
        ol.setStrictMode(Ha, t);
      } catch {
      }
  }
  var rl = Math.clz32 ? Math.clz32 : rh, sh = Math.log, oh = Math.LN2;
  function rh(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (sh(t) / oh | 0) | 0;
  }
  var Cn = 256, Rn = 262144, Hn = 4194304;
  function Ce(t) {
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
  function Bn(t, l, e) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var n = 0, u = t.suspendedLanes, i = t.pingedLanes;
    t = t.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~u, a !== 0 ? n = Ce(a) : (i &= c, i !== 0 ? n = Ce(i) : e || (e = c & ~t, e !== 0 && (n = Ce(e))))) : (c = a & ~u, c !== 0 ? n = Ce(c) : i !== 0 ? n = Ce(i) : e || (e = a & ~t, e !== 0 && (n = Ce(e)))), n === 0 ? 0 : l !== 0 && l !== n && (l & u) === 0 && (u = n & -n, e = l & -l, u >= e || u === 32 && (e & 4194048) !== 0) ? l : n;
  }
  function Ba(t, l) {
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
  function Af() {
    var t = Hn;
    return Hn <<= 1, (Hn & 62914560) === 0 && (Hn = 4194304), t;
  }
  function Iu(t) {
    for (var l = [], e = 0; 31 > e; e++) l.push(t);
    return l;
  }
  function qa(t, l) {
    t.pendingLanes |= l, l !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function hh(t, l, e, a, n, u) {
    var i = t.pendingLanes;
    t.pendingLanes = e, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= e, t.entangledLanes &= e, t.errorRecoveryDisabledLanes &= e, t.shellSuspendCounter = 0;
    var c = t.entanglements, o = t.expirationTimes, v = t.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var A = 31 - rl(e), M = 1 << A;
      c[A] = 0, o[A] = -1;
      var p = v[A];
      if (p !== null)
        for (v[A] = null, A = 0; A < p.length; A++) {
          var T = p[A];
          T !== null && (T.lane &= -536870913);
        }
      e &= ~M;
    }
    a !== 0 && zf(t, a, 0), u !== 0 && n === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(i & ~l));
  }
  function zf(t, l, e) {
    t.pendingLanes |= l, t.suspendedLanes &= ~l;
    var a = 31 - rl(l);
    t.entangledLanes |= l, t.entanglements[a] = t.entanglements[a] | 1073741824 | e & 261930;
  }
  function Of(t, l) {
    var e = t.entangledLanes |= l;
    for (t = t.entanglements; e; ) {
      var a = 31 - rl(e), n = 1 << a;
      n & l | t[a] & l && (t[a] |= l), e &= ~n;
    }
  }
  function Mf(t, l) {
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
  function Df() {
    var t = H.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : md(t.type));
  }
  function Nf(t, l) {
    var e = H.p;
    try {
      return H.p = t, l();
    } finally {
      H.p = e;
    }
  }
  var fe = Math.random().toString(36).slice(2), wt = "__reactFiber$" + fe, el = "__reactProps$" + fe, Fe = "__reactContainer$" + fe, li = "__reactEvents$" + fe, mh = "__reactListeners$" + fe, yh = "__reactHandles$" + fe, xf = "__reactResources$" + fe, Ya = "__reactMarker$" + fe;
  function ei(t) {
    delete t[wt], delete t[el], delete t[li], delete t[mh], delete t[yh];
  }
  function Ie(t) {
    var l = t[wt];
    if (l) return l;
    for (var e = t.parentNode; e; ) {
      if (l = e[Fe] || e[wt]) {
        if (e = l.alternate, l.child !== null || e !== null && e.child !== null)
          for (t = Ir(t); t !== null; ) {
            if (e = t[wt]) return e;
            t = Ir(t);
          }
        return l;
      }
      t = e, e = t.parentNode;
    }
    return null;
  }
  function Pe(t) {
    if (t = t[wt] || t[Fe]) {
      var l = t.tag;
      if (l === 5 || l === 6 || l === 13 || l === 31 || l === 26 || l === 27 || l === 3)
        return t;
    }
    return null;
  }
  function Ga(t) {
    var l = t.tag;
    if (l === 5 || l === 26 || l === 27 || l === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ta(t) {
    var l = t[xf];
    return l || (l = t[xf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), l;
  }
  function Vt(t) {
    t[Ya] = !0;
  }
  var jf = /* @__PURE__ */ new Set(), Uf = {};
  function Re(t, l) {
    la(t, l), la(t + "Capture", l);
  }
  function la(t, l) {
    for (Uf[t] = l, t = 0; t < l.length; t++)
      jf.add(l[t]);
  }
  var vh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Cf = {}, Rf = {};
  function gh(t) {
    return Ql.call(Rf, t) ? !0 : Ql.call(Cf, t) ? !1 : vh.test(t) ? Rf[t] = !0 : (Cf[t] = !0, !1);
  }
  function qn(t, l, e) {
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
  function Yn(t, l, e) {
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
  function Hf(t) {
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
      var l = Hf(t) ? "checked" : "value";
      t._valueTracker = ph(
        t,
        l,
        "" + t[l]
      );
    }
  }
  function Bf(t) {
    if (!t) return !1;
    var l = t._valueTracker;
    if (!l) return !0;
    var e = l.getValue(), a = "";
    return t && (a = Hf(t) ? t.checked ? "true" : "false" : t.value), t = a, t !== e ? (l.setValue(t), !0) : !1;
  }
  function Gn(t) {
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
  function qf(t, l, e, a, n, u, i, c) {
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
    l === "number" && Gn(t.ownerDocument) === t || t.defaultValue === "" + e || (t.defaultValue = "" + e);
  }
  function ea(t, l, e, a) {
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
  function Yf(t, l, e) {
    if (l != null && (l = "" + Tl(l), l !== t.value && (t.value = l), e == null)) {
      t.defaultValue !== l && (t.defaultValue = l);
      return;
    }
    t.defaultValue = e != null ? "" + Tl(e) : "";
  }
  function Gf(t, l, e, a) {
    if (l == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (ll(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), l = e;
    }
    e = Tl(l), t.defaultValue = e, a = t.textContent, a === e && a !== "" && a !== null && (t.value = a), ai(t);
  }
  function aa(t, l) {
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
  function Xf(t, l, e) {
    var a = l.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "" : a ? t.setProperty(l, e) : typeof e != "number" || e === 0 || bh.has(l) ? l === "float" ? t.cssFloat = e : t[l] = ("" + e).trim() : t[l] = e + "px";
  }
  function Lf(t, l, e) {
    if (l != null && typeof l != "object")
      throw Error(s(62));
    if (t = t.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || l != null && l.hasOwnProperty(a) || (a.indexOf("--") === 0 ? t.setProperty(a, "") : a === "float" ? t.cssFloat = "" : t[a] = "");
      for (var n in l)
        a = l[n], l.hasOwnProperty(n) && e[n] !== a && Xf(t, n, a);
    } else
      for (var u in l)
        l.hasOwnProperty(u) && Xf(t, u, l[u]);
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
  function Xn(t) {
    return Eh.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Vl() {
  }
  var ci = null;
  function fi(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var na = null, ua = null;
  function Qf(t) {
    var l = Pe(t);
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
              a = e[l], a.form === t.form && Bf(a);
          }
          break t;
        case "textarea":
          Yf(t, e.value, e.defaultValue);
          break t;
        case "select":
          l = e.value, l != null && ea(t, !!e.multiple, l, !1);
      }
    }
  }
  var si = !1;
  function Zf(t, l, e) {
    if (si) return t(l, e);
    si = !0;
    try {
      var a = t(l);
      return a;
    } finally {
      if (si = !1, (na !== null || ua !== null) && (Mu(), na && (l = na, t = ua, ua = na = null, Qf(l), t)))
        for (l = 0; l < t.length; l++) Qf(t[l]);
    }
  }
  function Xa(t, l) {
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
      var La = {};
      Object.defineProperty(La, "passive", {
        get: function() {
          oi = !0;
        }
      }), window.addEventListener("test", La, La), window.removeEventListener("test", La, La);
    } catch {
      oi = !1;
    }
  var se = null, ri = null, Ln = null;
  function Vf() {
    if (Ln) return Ln;
    var t, l = ri, e = l.length, a, n = "value" in se ? se.value : se.textContent, u = n.length;
    for (t = 0; t < e && l[t] === n[t]; t++) ;
    var i = e - t;
    for (a = 1; a <= i && l[e - a] === n[u - a]; a++) ;
    return Ln = n.slice(t, 1 < a ? 1 - a : void 0);
  }
  function Qn(t) {
    var l = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && l === 13 && (t = 13)) : t = l, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Zn() {
    return !0;
  }
  function Kf() {
    return !1;
  }
  function al(t) {
    function l(e, a, n, u, i) {
      this._reactName = e, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = i, this.currentTarget = null;
      for (var c in t)
        t.hasOwnProperty(c) && (e = t[c], this[c] = e ? e(u) : u[c]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Zn : Kf, this.isPropagationStopped = Kf, this;
    }
    return j(l.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Zn);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Zn);
      },
      persist: function() {
      },
      isPersistent: Zn
    }), l;
  }
  var He = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Vn = al(He), Qa = j({}, He, { view: 0, detail: 0 }), _h = al(Qa), di, hi, Za, Kn = j({}, Qa, {
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
      return "movementX" in t ? t.movementX : (t !== Za && (Za && t.type === "mousemove" ? (di = t.screenX - Za.screenX, hi = t.screenY - Za.screenY) : hi = di = 0, Za = t), di);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : hi;
    }
  }), Jf = al(Kn), Ah = j({}, Kn, { dataTransfer: 0 }), zh = al(Ah), Oh = j({}, Qa, { relatedTarget: 0 }), mi = al(Oh), Mh = j({}, He, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Dh = al(Mh), Nh = j({}, He, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), xh = al(Nh), jh = j({}, He, { data: 0 }), wf = al(jh), Uh = {
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
  }, Ch = {
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
  var Bh = j({}, Qa, {
    key: function(t) {
      if (t.key) {
        var l = Uh[t.key] || t.key;
        if (l !== "Unidentified") return l;
      }
      return t.type === "keypress" ? (t = Qn(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Ch[t.keyCode] || "Unidentified" : "";
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
      return t.type === "keypress" ? Qn(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Qn(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), qh = al(Bh), Yh = j({}, Kn, {
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
  }), $f = al(Yh), Gh = j({}, Qa, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: yi
  }), Xh = al(Gh), Lh = j({}, He, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qh = al(Lh), Zh = j({}, Kn, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Vh = al(Zh), Kh = j({}, He, {
    newState: 0,
    oldState: 0
  }), Jh = al(Kh), wh = [9, 13, 27, 32], vi = Kl && "CompositionEvent" in window, Va = null;
  Kl && "documentMode" in document && (Va = document.documentMode);
  var $h = Kl && "TextEvent" in window && !Va, kf = Kl && (!vi || Va && 8 < Va && 11 >= Va), Wf = " ", Ff = !1;
  function If(t, l) {
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
  function Pf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ia = !1;
  function kh(t, l) {
    switch (t) {
      case "compositionend":
        return Pf(l);
      case "keypress":
        return l.which !== 32 ? null : (Ff = !0, Wf);
      case "textInput":
        return t = l.data, t === Wf && Ff ? null : t;
      default:
        return null;
    }
  }
  function Wh(t, l) {
    if (ia)
      return t === "compositionend" || !vi && If(t, l) ? (t = Vf(), Ln = ri = se = null, ia = !1, t) : null;
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
        return kf && l.locale !== "ko" ? null : l.data;
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
  function ts(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l === "input" ? !!Fh[t.type] : l === "textarea";
  }
  function ls(t, l, e, a) {
    na ? ua ? ua.push(a) : ua = [a] : na = a, l = Ru(l, "onChange"), 0 < l.length && (e = new Vn(
      "onChange",
      "change",
      null,
      e,
      a
    ), t.push({ event: e, listeners: l }));
  }
  var Ka = null, Ja = null;
  function Ih(t) {
    Yr(t, 0);
  }
  function Jn(t) {
    var l = Ga(t);
    if (Bf(l)) return t;
  }
  function es(t, l) {
    if (t === "change") return l;
  }
  var as = !1;
  if (Kl) {
    var gi;
    if (Kl) {
      var pi = "oninput" in document;
      if (!pi) {
        var ns = document.createElement("div");
        ns.setAttribute("oninput", "return;"), pi = typeof ns.oninput == "function";
      }
      gi = pi;
    } else gi = !1;
    as = gi && (!document.documentMode || 9 < document.documentMode);
  }
  function us() {
    Ka && (Ka.detachEvent("onpropertychange", is), Ja = Ka = null);
  }
  function is(t) {
    if (t.propertyName === "value" && Jn(Ja)) {
      var l = [];
      ls(
        l,
        Ja,
        t,
        fi(t)
      ), Zf(Ih, l);
    }
  }
  function Ph(t, l, e) {
    t === "focusin" ? (us(), Ka = l, Ja = e, Ka.attachEvent("onpropertychange", is)) : t === "focusout" && us();
  }
  function tm(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Jn(Ja);
  }
  function lm(t, l) {
    if (t === "click") return Jn(l);
  }
  function em(t, l) {
    if (t === "input" || t === "change")
      return Jn(l);
  }
  function am(t, l) {
    return t === l && (t !== 0 || 1 / t === 1 / l) || t !== t && l !== l;
  }
  var dl = typeof Object.is == "function" ? Object.is : am;
  function wa(t, l) {
    if (dl(t, l)) return !0;
    if (typeof t != "object" || t === null || typeof l != "object" || l === null)
      return !1;
    var e = Object.keys(t), a = Object.keys(l);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!Ql.call(l, n) || !dl(t[n], l[n]))
        return !1;
    }
    return !0;
  }
  function cs(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function fs(t, l) {
    var e = cs(t);
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
      e = cs(e);
    }
  }
  function ss(t, l) {
    return t && l ? t === l ? !0 : t && t.nodeType === 3 ? !1 : l && l.nodeType === 3 ? ss(t, l.parentNode) : "contains" in t ? t.contains(l) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(l) & 16) : !1 : !1;
  }
  function os(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var l = Gn(t.document); l instanceof t.HTMLIFrameElement; ) {
      try {
        var e = typeof l.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) t = l.contentWindow;
      else break;
      l = Gn(t.document);
    }
    return l;
  }
  function Si(t) {
    var l = t && t.nodeName && t.nodeName.toLowerCase();
    return l && (l === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || l === "textarea" || t.contentEditable === "true");
  }
  var nm = Kl && "documentMode" in document && 11 >= document.documentMode, ca = null, bi = null, $a = null, Ti = !1;
  function rs(t, l, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Ti || ca == null || ca !== Gn(a) || (a = ca, "selectionStart" in a && Si(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), $a && wa($a, a) || ($a = a, a = Ru(bi, "onSelect"), 0 < a.length && (l = new Vn(
      "onSelect",
      "select",
      null,
      l,
      e
    ), t.push({ event: l, listeners: a }), l.target = ca)));
  }
  function Be(t, l) {
    var e = {};
    return e[t.toLowerCase()] = l.toLowerCase(), e["Webkit" + t] = "webkit" + l, e["Moz" + t] = "moz" + l, e;
  }
  var fa = {
    animationend: Be("Animation", "AnimationEnd"),
    animationiteration: Be("Animation", "AnimationIteration"),
    animationstart: Be("Animation", "AnimationStart"),
    transitionrun: Be("Transition", "TransitionRun"),
    transitionstart: Be("Transition", "TransitionStart"),
    transitioncancel: Be("Transition", "TransitionCancel"),
    transitionend: Be("Transition", "TransitionEnd")
  }, Ei = {}, ds = {};
  Kl && (ds = document.createElement("div").style, "AnimationEvent" in window || (delete fa.animationend.animation, delete fa.animationiteration.animation, delete fa.animationstart.animation), "TransitionEvent" in window || delete fa.transitionend.transition);
  function qe(t) {
    if (Ei[t]) return Ei[t];
    if (!fa[t]) return t;
    var l = fa[t], e;
    for (e in l)
      if (l.hasOwnProperty(e) && e in ds)
        return Ei[t] = l[e];
    return t;
  }
  var hs = qe("animationend"), ms = qe("animationiteration"), ys = qe("animationstart"), um = qe("transitionrun"), im = qe("transitionstart"), cm = qe("transitioncancel"), vs = qe("transitionend"), gs = /* @__PURE__ */ new Map(), _i = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  _i.push("scrollEnd");
  function Cl(t, l) {
    gs.set(t, l), Re(l, [t]);
  }
  var wn = typeof reportError == "function" ? reportError : function(t) {
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
  }, _l = [], sa = 0, Ai = 0;
  function $n() {
    for (var t = sa, l = Ai = sa = 0; l < t; ) {
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
      u !== 0 && ps(e, n, u);
    }
  }
  function kn(t, l, e, a) {
    _l[sa++] = t, _l[sa++] = l, _l[sa++] = e, _l[sa++] = a, Ai |= a, t.lanes |= a, t = t.alternate, t !== null && (t.lanes |= a);
  }
  function zi(t, l, e, a) {
    return kn(t, l, e, a), Wn(t);
  }
  function Ye(t, l) {
    return kn(t, null, null, l), Wn(t);
  }
  function ps(t, l, e) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = t.return; u !== null; )
      u.childLanes |= e, a = u.alternate, a !== null && (a.childLanes |= e), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (n = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, n && l !== null && (n = 31 - rl(e), t = u.hiddenUpdates, a = t[n], a === null ? t[n] = [l] : a.push(l), l.lane = e | 536870912), u) : null;
  }
  function Wn(t) {
    if (50 < gn)
      throw gn = 0, Rc = null, Error(s(185));
    for (var l = t.return; l !== null; )
      t = l, l = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var oa = {};
  function fm(t, l, e, a) {
    this.tag = t, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = l, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function hl(t, l, e, a) {
    return new fm(t, l, e, a);
  }
  function Oi(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Jl(t, l) {
    var e = t.alternate;
    return e === null ? (e = hl(
      t.tag,
      l,
      t.key,
      t.mode
    ), e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.alternate = t, t.alternate = e) : (e.pendingProps = l, e.type = t.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = t.flags & 65011712, e.childLanes = t.childLanes, e.lanes = t.lanes, e.child = t.child, e.memoizedProps = t.memoizedProps, e.memoizedState = t.memoizedState, e.updateQueue = t.updateQueue, l = t.dependencies, e.dependencies = l === null ? null : { lanes: l.lanes, firstContext: l.firstContext }, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.refCleanup = t.refCleanup, e;
  }
  function Ss(t, l) {
    t.flags &= 65011714;
    var e = t.alternate;
    return e === null ? (t.childLanes = 0, t.lanes = l, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = e.childLanes, t.lanes = e.lanes, t.child = e.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = e.memoizedProps, t.memoizedState = e.memoizedState, t.updateQueue = e.updateQueue, t.type = e.type, l = e.dependencies, t.dependencies = l === null ? null : {
      lanes: l.lanes,
      firstContext: l.firstContext
    }), t;
  }
  function Fn(t, l, e, a, n, u) {
    var i = 0;
    if (a = t, typeof t == "function") Oi(t) && (i = 1);
    else if (typeof t == "string")
      i = hy(
        t,
        e,
        q.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Dt:
          return t = hl(31, e, l, n), t.elementType = Dt, t.lanes = u, t;
        case V:
          return Ge(e.children, n, u, l);
        case ot:
          i = 8, n |= 24;
          break;
        case lt:
          return t = hl(12, e, l, n | 2), t.elementType = lt, t.lanes = u, t;
        case Lt:
          return t = hl(13, e, l, n), t.elementType = Lt, t.lanes = u, t;
        case Ct:
          return t = hl(19, e, l, n), t.elementType = Ct, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case ht:
                i = 10;
                break t;
              case Ut:
                i = 9;
                break t;
              case Bt:
                i = 11;
                break t;
              case L:
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
    return l = hl(i, e, l, n), l.elementType = t, l.type = a, l.lanes = u, l;
  }
  function Ge(t, l, e, a) {
    return t = hl(7, t, a, l), t.lanes = e, t;
  }
  function Mi(t, l, e) {
    return t = hl(6, t, null, l), t.lanes = e, t;
  }
  function bs(t) {
    var l = hl(18, null, null, 0);
    return l.stateNode = t, l;
  }
  function Di(t, l, e) {
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
  var Ts = /* @__PURE__ */ new WeakMap();
  function Al(t, l) {
    if (typeof t == "object" && t !== null) {
      var e = Ts.get(t);
      return e !== void 0 ? e : (l = {
        value: t,
        source: l,
        stack: Ll(l)
      }, Ts.set(t, l), l);
    }
    return {
      value: t,
      source: l,
      stack: Ll(l)
    };
  }
  var ra = [], da = 0, In = null, ka = 0, zl = [], Ol = 0, oe = null, ql = 1, Yl = "";
  function wl(t, l) {
    ra[da++] = ka, ra[da++] = In, In = t, ka = l;
  }
  function Es(t, l, e) {
    zl[Ol++] = ql, zl[Ol++] = Yl, zl[Ol++] = oe, oe = t;
    var a = ql;
    t = Yl;
    var n = 32 - rl(a) - 1;
    a &= ~(1 << n), e += 1;
    var u = 32 - rl(l) + n;
    if (30 < u) {
      var i = n - n % 5;
      u = (a & (1 << i) - 1).toString(32), a >>= i, n -= i, ql = 1 << 32 - rl(l) + n | e << n | a, Yl = u + t;
    } else
      ql = 1 << u | e << n | a, Yl = t;
  }
  function Ni(t) {
    t.return !== null && (wl(t, 1), Es(t, 1, 0));
  }
  function xi(t) {
    for (; t === In; )
      In = ra[--da], ra[da] = null, ka = ra[--da], ra[da] = null;
    for (; t === oe; )
      oe = zl[--Ol], zl[Ol] = null, Yl = zl[--Ol], zl[Ol] = null, ql = zl[--Ol], zl[Ol] = null;
  }
  function _s(t, l) {
    zl[Ol++] = ql, zl[Ol++] = Yl, zl[Ol++] = oe, ql = l.id, Yl = l.overflow, oe = t;
  }
  var $t = null, zt = null, nt = !1, re = null, Ml = !1, ji = Error(s(519));
  function de(t) {
    var l = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wa(Al(l, t)), ji;
  }
  function As(t) {
    var l = t.stateNode, e = t.type, a = t.memoizedProps;
    switch (l[wt] = t, l[el] = a, e) {
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
        for (e = 0; e < Sn.length; e++)
          tt(Sn[e], l);
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
        tt("invalid", l), qf(
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
        tt("invalid", l), Gf(l, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || l.textContent === "" + e || a.suppressHydrationWarning === !0 || Qr(l.textContent, e) ? (a.popover != null && (tt("beforetoggle", l), tt("toggle", l)), a.onScroll != null && tt("scroll", l), a.onScrollEnd != null && tt("scrollend", l), a.onClick != null && (l.onclick = Vl), l = !0) : l = !1, l || de(t, !0);
  }
  function zs(t) {
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
  function ha(t) {
    if (t !== $t) return !1;
    if (!nt) return zs(t), nt = !0, !1;
    var l = t.tag, e;
    if ((e = l !== 3 && l !== 27) && ((e = l === 5) && (e = t.type, e = !(e !== "form" && e !== "button") || kc(t.type, t.memoizedProps)), e = !e), e && zt && de(t), zs(t), l === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = Fr(t);
    } else if (l === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      zt = Fr(t);
    } else
      l === 27 ? (l = zt, Oe(t.type) ? (t = tf, tf = null, zt = t) : zt = l) : zt = $t ? Nl(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Xe() {
    zt = $t = null, nt = !1;
  }
  function Ui() {
    var t = re;
    return t !== null && (cl === null ? cl = t : cl.push.apply(
      cl,
      t
    ), re = null), t;
  }
  function Wa(t) {
    re === null ? re = [t] : re.push(t);
  }
  var Ci = d(null), Le = null, $l = null;
  function he(t, l, e) {
    B(Ci, l._currentValue), l._currentValue = e;
  }
  function kl(t) {
    t._currentValue = Ci.current, D(Ci);
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
  function ma(t, l, e, a) {
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
      } else if (n === ct.current) {
        if (i = n.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== n.memoizedState.memoizedState && (t !== null ? t.push(An) : t = [An]);
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
  function Pn(t) {
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
  function Qe(t) {
    Le = t, $l = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function kt(t) {
    return Os(Le, t);
  }
  function tu(t, l) {
    return Le === null && Qe(t), Os(t, l);
  }
  function Os(t, l) {
    var e = l._currentValue;
    if (l = { context: l, memoizedValue: e, next: null }, $l === null) {
      if (t === null) throw Error(s(308));
      $l = l, t.dependencies = { lanes: 0, firstContext: l }, t.flags |= 524288;
    } else $l = $l.next = l;
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
  }, om = f.unstable_scheduleCallback, rm = f.unstable_NormalPriority, qt = {
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
  function Fa(t) {
    t.refCount--, t.refCount === 0 && om(rm, function() {
      t.controller.abort();
    });
  }
  var Ia = null, qi = 0, ya = 0, va = null;
  function dm(t, l) {
    if (Ia === null) {
      var e = Ia = [];
      qi = 0, ya = Xc(), va = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return qi++, l.then(Ms, Ms), l;
  }
  function Ms() {
    if (--qi === 0 && Ia !== null) {
      va !== null && (va.status = "fulfilled");
      var t = Ia;
      Ia = null, ya = 0, va = null;
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
  var Ds = _.S;
  _.S = function(t, l) {
    dr = sl(), typeof l == "object" && l !== null && typeof l.then == "function" && dm(t, l), Ds !== null && Ds(t, l);
  };
  var Ze = d(null);
  function Yi() {
    var t = Ze.current;
    return t !== null ? t : _t.pooledCache;
  }
  function lu(t, l) {
    l === null ? B(Ze, Ze.current) : B(Ze, l.pool);
  }
  function Ns() {
    var t = Yi();
    return t === null ? null : { parent: qt._currentValue, pool: t };
  }
  var ga = Error(s(460)), Gi = Error(s(474)), eu = Error(s(542)), au = { then: function() {
  } };
  function xs(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function js(t, l, e) {
    switch (e = t[e], e === void 0 ? t.push(l) : e !== l && (l.then(Vl, Vl), l = e), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw t = l.reason, Cs(t), t;
      default:
        if (typeof l.status == "string") l.then(Vl, Vl);
        else {
          if (t = _t, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = l.reason, Cs(t), t;
        }
        throw Ke = l, ga;
    }
  }
  function Ve(t) {
    try {
      var l = t._init;
      return l(t._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (Ke = e, ga) : e;
    }
  }
  var Ke = null;
  function Us() {
    if (Ke === null) throw Error(s(459));
    var t = Ke;
    return Ke = null, t;
  }
  function Cs(t) {
    if (t === ga || t === eu)
      throw Error(s(483));
  }
  var pa = null, Pa = 0;
  function nu(t) {
    var l = Pa;
    return Pa += 1, pa === null && (pa = []), js(pa, t, l);
  }
  function tn(t, l) {
    l = l.props.ref, t.ref = l !== void 0 ? l : null;
  }
  function uu(t, l) {
    throw l.$$typeof === Z ? Error(s(525)) : (t = Object.prototype.toString.call(l), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(l).join(", ") + "}" : t
      )
    ));
  }
  function Rs(t) {
    function l(h, r) {
      if (t) {
        var y = h.deletions;
        y === null ? (h.deletions = [r], h.flags |= 16) : y.push(r);
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
    function u(h, r, y) {
      return h.index = y, t ? (y = h.alternate, y !== null ? (y = y.index, y < r ? (h.flags |= 67108866, r) : y) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return t && h.alternate === null && (h.flags |= 67108866), h;
    }
    function c(h, r, y, O) {
      return r === null || r.tag !== 6 ? (r = Mi(y, h.mode, O), r.return = h, r) : (r = n(r, y), r.return = h, r);
    }
    function o(h, r, y, O) {
      var Q = y.type;
      return Q === V ? A(
        h,
        r,
        y.props.children,
        O,
        y.key
      ) : r !== null && (r.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Mt && Ve(Q) === r.type) ? (r = n(r, y.props), tn(r, y), r.return = h, r) : (r = Fn(
        y.type,
        y.key,
        y.props,
        null,
        h.mode,
        O
      ), tn(r, y), r.return = h, r);
    }
    function v(h, r, y, O) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== y.containerInfo || r.stateNode.implementation !== y.implementation ? (r = Di(y, h.mode, O), r.return = h, r) : (r = n(r, y.children || []), r.return = h, r);
    }
    function A(h, r, y, O, Q) {
      return r === null || r.tag !== 7 ? (r = Ge(
        y,
        h.mode,
        O,
        Q
      ), r.return = h, r) : (r = n(r, y), r.return = h, r);
    }
    function M(h, r, y) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = Mi(
          "" + r,
          h.mode,
          y
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case ut:
            return y = Fn(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              y
            ), tn(y, r), y.return = h, y;
          case dt:
            return r = Di(
              r,
              h.mode,
              y
            ), r.return = h, r;
          case Mt:
            return r = Ve(r), M(h, r, y);
        }
        if (ll(r) || It(r))
          return r = Ge(
            r,
            h.mode,
            y,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return M(h, nu(r), y);
        if (r.$$typeof === ht)
          return M(
            h,
            tu(h, r),
            y
          );
        uu(h, r);
      }
      return null;
    }
    function p(h, r, y, O) {
      var Q = r !== null ? r.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return Q !== null ? null : c(h, r, "" + y, O);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case ut:
            return y.key === Q ? o(h, r, y, O) : null;
          case dt:
            return y.key === Q ? v(h, r, y, O) : null;
          case Mt:
            return y = Ve(y), p(h, r, y, O);
        }
        if (ll(y) || It(y))
          return Q !== null ? null : A(h, r, y, O, null);
        if (typeof y.then == "function")
          return p(
            h,
            r,
            nu(y),
            O
          );
        if (y.$$typeof === ht)
          return p(
            h,
            r,
            tu(h, y),
            O
          );
        uu(h, y);
      }
      return null;
    }
    function T(h, r, y, O, Q) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return h = h.get(y) || null, c(r, h, "" + O, Q);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ut:
            return h = h.get(
              O.key === null ? y : O.key
            ) || null, o(r, h, O, Q);
          case dt:
            return h = h.get(
              O.key === null ? y : O.key
            ) || null, v(r, h, O, Q);
          case Mt:
            return O = Ve(O), T(
              h,
              r,
              y,
              O,
              Q
            );
        }
        if (ll(O) || It(O))
          return h = h.get(y) || null, A(r, h, O, Q, null);
        if (typeof O.then == "function")
          return T(
            h,
            r,
            y,
            nu(O),
            Q
          );
        if (O.$$typeof === ht)
          return T(
            h,
            r,
            y,
            tu(r, O),
            Q
          );
        uu(r, O);
      }
      return null;
    }
    function Y(h, r, y, O) {
      for (var Q = null, ft = null, X = r, F = r = 0, at = null; X !== null && F < y.length; F++) {
        X.index > F ? (at = X, X = null) : at = X.sibling;
        var st = p(
          h,
          X,
          y[F],
          O
        );
        if (st === null) {
          X === null && (X = at);
          break;
        }
        t && X && st.alternate === null && l(h, X), r = u(st, r, F), ft === null ? Q = st : ft.sibling = st, ft = st, X = at;
      }
      if (F === y.length)
        return e(h, X), nt && wl(h, F), Q;
      if (X === null) {
        for (; F < y.length; F++)
          X = M(h, y[F], O), X !== null && (r = u(
            X,
            r,
            F
          ), ft === null ? Q = X : ft.sibling = X, ft = X);
        return nt && wl(h, F), Q;
      }
      for (X = a(X); F < y.length; F++)
        at = T(
          X,
          h,
          F,
          y[F],
          O
        ), at !== null && (t && at.alternate !== null && X.delete(
          at.key === null ? F : at.key
        ), r = u(
          at,
          r,
          F
        ), ft === null ? Q = at : ft.sibling = at, ft = at);
      return t && X.forEach(function(je) {
        return l(h, je);
      }), nt && wl(h, F), Q;
    }
    function K(h, r, y, O) {
      if (y == null) throw Error(s(151));
      for (var Q = null, ft = null, X = r, F = r = 0, at = null, st = y.next(); X !== null && !st.done; F++, st = y.next()) {
        X.index > F ? (at = X, X = null) : at = X.sibling;
        var je = p(h, X, st.value, O);
        if (je === null) {
          X === null && (X = at);
          break;
        }
        t && X && je.alternate === null && l(h, X), r = u(je, r, F), ft === null ? Q = je : ft.sibling = je, ft = je, X = at;
      }
      if (st.done)
        return e(h, X), nt && wl(h, F), Q;
      if (X === null) {
        for (; !st.done; F++, st = y.next())
          st = M(h, st.value, O), st !== null && (r = u(st, r, F), ft === null ? Q = st : ft.sibling = st, ft = st);
        return nt && wl(h, F), Q;
      }
      for (X = a(X); !st.done; F++, st = y.next())
        st = T(X, h, F, st.value, O), st !== null && (t && st.alternate !== null && X.delete(st.key === null ? F : st.key), r = u(st, r, F), ft === null ? Q = st : ft.sibling = st, ft = st);
      return t && X.forEach(function(Ay) {
        return l(h, Ay);
      }), nt && wl(h, F), Q;
    }
    function Et(h, r, y, O) {
      if (typeof y == "object" && y !== null && y.type === V && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case ut:
            t: {
              for (var Q = y.key; r !== null; ) {
                if (r.key === Q) {
                  if (Q = y.type, Q === V) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), O = n(
                        r,
                        y.props.children
                      ), O.return = h, h = O;
                      break t;
                    }
                  } else if (r.elementType === Q || typeof Q == "object" && Q !== null && Q.$$typeof === Mt && Ve(Q) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), O = n(r, y.props), tn(O, y), O.return = h, h = O;
                    break t;
                  }
                  e(h, r);
                  break;
                } else l(h, r);
                r = r.sibling;
              }
              y.type === V ? (O = Ge(
                y.props.children,
                h.mode,
                O,
                y.key
              ), O.return = h, h = O) : (O = Fn(
                y.type,
                y.key,
                y.props,
                null,
                h.mode,
                O
              ), tn(O, y), O.return = h, h = O);
            }
            return i(h);
          case dt:
            t: {
              for (Q = y.key; r !== null; ) {
                if (r.key === Q)
                  if (r.tag === 4 && r.stateNode.containerInfo === y.containerInfo && r.stateNode.implementation === y.implementation) {
                    e(
                      h,
                      r.sibling
                    ), O = n(r, y.children || []), O.return = h, h = O;
                    break t;
                  } else {
                    e(h, r);
                    break;
                  }
                else l(h, r);
                r = r.sibling;
              }
              O = Di(y, h.mode, O), O.return = h, h = O;
            }
            return i(h);
          case Mt:
            return y = Ve(y), Et(
              h,
              r,
              y,
              O
            );
        }
        if (ll(y))
          return Y(
            h,
            r,
            y,
            O
          );
        if (It(y)) {
          if (Q = It(y), typeof Q != "function") throw Error(s(150));
          return y = Q.call(y), K(
            h,
            r,
            y,
            O
          );
        }
        if (typeof y.then == "function")
          return Et(
            h,
            r,
            nu(y),
            O
          );
        if (y.$$typeof === ht)
          return Et(
            h,
            r,
            tu(h, y),
            O
          );
        uu(h, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, r !== null && r.tag === 6 ? (e(h, r.sibling), O = n(r, y), O.return = h, h = O) : (e(h, r), O = Mi(y, h.mode, O), O.return = h, h = O), i(h)) : e(h, r);
    }
    return function(h, r, y, O) {
      try {
        Pa = 0;
        var Q = Et(
          h,
          r,
          y,
          O
        );
        return pa = null, Q;
      } catch (X) {
        if (X === ga || X === eu) throw X;
        var ft = hl(29, X, null, h.mode);
        return ft.lanes = O, ft.return = h, ft;
      } finally {
      }
    };
  }
  var Je = Rs(!0), Hs = Rs(!1), me = !1;
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
  function ye(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ve(t, l, e) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rt & 2) !== 0) {
      var n = a.pending;
      return n === null ? l.next = l : (l.next = n.next, n.next = l), a.pending = l, l = Wn(t), ps(t, null, e), l;
    }
    return kn(t, a, l, e), Wn(t);
  }
  function ln(t, l, e) {
    if (l = l.updateQueue, l !== null && (l = l.shared, (e & 4194048) !== 0)) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Of(t, e);
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
  function en() {
    if (Zi) {
      var t = va;
      if (t !== null) throw t;
    }
  }
  function an(t, l, e, a) {
    Zi = !1;
    var n = t.updateQueue;
    me = !1;
    var u = n.firstBaseUpdate, i = n.lastBaseUpdate, c = n.shared.pending;
    if (c !== null) {
      n.shared.pending = null;
      var o = c, v = o.next;
      o.next = null, i === null ? u = v : i.next = v, i = o;
      var A = t.alternate;
      A !== null && (A = A.updateQueue, c = A.lastBaseUpdate, c !== i && (c === null ? A.firstBaseUpdate = v : c.next = v, A.lastBaseUpdate = o));
    }
    if (u !== null) {
      var M = n.baseState;
      i = 0, A = v = o = null, c = u;
      do {
        var p = c.lane & -536870913, T = p !== c.lane;
        if (T ? (et & p) === p : (a & p) === p) {
          p !== 0 && p === ya && (Zi = !0), A !== null && (A = A.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          t: {
            var Y = t, K = c;
            p = l;
            var Et = e;
            switch (K.tag) {
              case 1:
                if (Y = K.payload, typeof Y == "function") {
                  M = Y.call(Et, M, p);
                  break t;
                }
                M = Y;
                break t;
              case 3:
                Y.flags = Y.flags & -65537 | 128;
              case 0:
                if (Y = K.payload, p = typeof Y == "function" ? Y.call(Et, M, p) : Y, p == null) break t;
                M = j({}, M, p);
                break t;
              case 2:
                me = !0;
            }
          }
          p = c.callback, p !== null && (t.flags |= 64, T && (t.flags |= 8192), T = n.callbacks, T === null ? n.callbacks = [p] : T.push(p));
        } else
          T = {
            lane: p,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, A === null ? (v = A = T, o = M) : A = A.next = T, i |= p;
        if (c = c.next, c === null) {
          if (c = n.shared.pending, c === null)
            break;
          T = c, c = T.next, T.next = null, n.lastBaseUpdate = T, n.shared.pending = null;
        }
      } while (!0);
      A === null && (o = M), n.baseState = o, n.firstBaseUpdate = v, n.lastBaseUpdate = A, u === null && (n.shared.lanes = 0), Te |= i, t.lanes = i, t.memoizedState = M;
    }
  }
  function Bs(t, l) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(l);
  }
  function qs(t, l) {
    var e = t.callbacks;
    if (e !== null)
      for (t.callbacks = null, t = 0; t < e.length; t++)
        Bs(e[t], l);
  }
  var Sa = d(null), iu = d(0);
  function Ys(t, l) {
    t = ne, B(iu, t), B(Sa, l), ne = t | l.baseLanes;
  }
  function Vi() {
    B(iu, ne), B(Sa, Sa.current);
  }
  function Ki() {
    ne = iu.current, D(Sa), D(iu);
  }
  var ml = d(null), Dl = null;
  function ge(t) {
    var l = t.alternate;
    B(Rt, Rt.current & 1), B(ml, t), Dl === null && (l === null || Sa.current !== null || l.memoizedState !== null) && (Dl = t);
  }
  function Ji(t) {
    B(Rt, Rt.current), B(ml, t), Dl === null && (Dl = t);
  }
  function Gs(t) {
    t.tag === 22 ? (B(Rt, Rt.current), B(ml, t), Dl === null && (Dl = t)) : pe();
  }
  function pe() {
    B(Rt, Rt.current), B(ml, ml.current);
  }
  function yl(t) {
    D(ml), Dl === t && (Dl = null), D(Rt);
  }
  var Rt = d(0);
  function cu(t) {
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
  var Wl = 0, k = null, bt = null, Yt = null, fu = !1, ba = !1, we = !1, su = 0, nn = 0, Ta = null, mm = 0;
  function xt() {
    throw Error(s(321));
  }
  function wi(t, l) {
    if (l === null) return !1;
    for (var e = 0; e < l.length && e < t.length; e++)
      if (!dl(t[e], l[e])) return !1;
    return !0;
  }
  function $i(t, l, e, a, n, u) {
    return Wl = u, k = l, l.memoizedState = null, l.updateQueue = null, l.lanes = 0, _.H = t === null || t.memoizedState === null ? _o : sc, we = !1, u = e(a, n), we = !1, ba && (u = Ls(
      l,
      e,
      a,
      n
    )), Xs(t), u;
  }
  function Xs(t) {
    _.H = fn;
    var l = bt !== null && bt.next !== null;
    if (Wl = 0, Yt = bt = k = null, fu = !1, nn = 0, Ta = null, l) throw Error(s(300));
    t === null || Gt || (t = t.dependencies, t !== null && Pn(t) && (Gt = !0));
  }
  function Ls(t, l, e, a) {
    k = t;
    var n = 0;
    do {
      if (ba && (Ta = null), nn = 0, ba = !1, 25 <= n) throw Error(s(301));
      if (n += 1, Yt = bt = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      _.H = Ao, u = l(e, a);
    } while (ba);
    return u;
  }
  function ym() {
    var t = _.H, l = t.useState()[0];
    return l = typeof l.then == "function" ? un(l) : l, t = t.useState()[0], (bt !== null ? bt.memoizedState : null) !== t && (k.flags |= 1024), l;
  }
  function ki() {
    var t = su !== 0;
    return su = 0, t;
  }
  function Wi(t, l, e) {
    l.updateQueue = t.updateQueue, l.flags &= -2053, t.lanes &= ~e;
  }
  function Fi(t) {
    if (fu) {
      for (t = t.memoizedState; t !== null; ) {
        var l = t.queue;
        l !== null && (l.pending = null), t = t.next;
      }
      fu = !1;
    }
    Wl = 0, Yt = bt = k = null, ba = !1, nn = su = 0, Ta = null;
  }
  function tl() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Yt === null ? k.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
  }
  function Ht() {
    if (bt === null) {
      var t = k.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = bt.next;
    var l = Yt === null ? k.memoizedState : Yt.next;
    if (l !== null)
      Yt = l, bt = t;
    else {
      if (t === null)
        throw k.alternate === null ? Error(s(467)) : Error(s(310));
      bt = t, t = {
        memoizedState: bt.memoizedState,
        baseState: bt.baseState,
        baseQueue: bt.baseQueue,
        queue: bt.queue,
        next: null
      }, Yt === null ? k.memoizedState = Yt = t : Yt = Yt.next = t;
    }
    return Yt;
  }
  function ou() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function un(t) {
    var l = nn;
    return nn += 1, Ta === null && (Ta = []), t = js(Ta, t, l), l = k, (Yt === null ? l.memoizedState : Yt.next) === null && (l = l.alternate, _.H = l === null || l.memoizedState === null ? _o : sc), t;
  }
  function ru(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return un(t);
      if (t.$$typeof === ht) return kt(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ii(t) {
    var l = null, e = k.updateQueue;
    if (e !== null && (l = e.memoCache), l == null) {
      var a = k.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (l = {
        data: a.data.map(function(n) {
          return n.slice();
        }),
        index: 0
      })));
    }
    if (l == null && (l = { data: [], index: 0 }), e === null && (e = ou(), k.updateQueue = e), e.memoCache = l, e = l.data[l.index], e === void 0)
      for (e = l.data[l.index] = Array(t), a = 0; a < t; a++)
        e[a] = G;
    return l.index++, e;
  }
  function Fl(t, l) {
    return typeof l == "function" ? l(t) : l;
  }
  function du(t) {
    var l = Ht();
    return Pi(l, bt, t);
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
      var c = i = null, o = null, v = l, A = !1;
      do {
        var M = v.lane & -536870913;
        if (M !== v.lane ? (et & M) === M : (Wl & M) === M) {
          var p = v.revertLane;
          if (p === 0)
            o !== null && (o = o.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }), M === ya && (A = !0);
          else if ((Wl & p) === p) {
            v = v.next, p === ya && (A = !0);
            continue;
          } else
            M = {
              lane: 0,
              revertLane: v.revertLane,
              gesture: null,
              action: v.action,
              hasEagerState: v.hasEagerState,
              eagerState: v.eagerState,
              next: null
            }, o === null ? (c = o = M, i = u) : o = o.next = M, k.lanes |= p, Te |= p;
          M = v.action, we && e(u, M), u = v.hasEagerState ? v.eagerState : e(u, M);
        } else
          p = {
            lane: M,
            revertLane: v.revertLane,
            gesture: v.gesture,
            action: v.action,
            hasEagerState: v.hasEagerState,
            eagerState: v.eagerState,
            next: null
          }, o === null ? (c = o = p, i = u) : o = o.next = p, k.lanes |= M, Te |= M;
        v = v.next;
      } while (v !== null && v !== l);
      if (o === null ? i = u : o.next = c, !dl(u, t.memoizedState) && (Gt = !0, A && (e = va, e !== null)))
        throw e;
      t.memoizedState = u, t.baseState = i, t.baseQueue = o, a.lastRenderedState = u;
    }
    return n === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function tc(t) {
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
      dl(u, l.memoizedState) || (Gt = !0), l.memoizedState = u, l.baseQueue === null && (l.baseState = u), e.lastRenderedState = u;
    }
    return [u, a];
  }
  function Qs(t, l, e) {
    var a = k, n = Ht(), u = nt;
    if (u) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = l();
    var i = !dl(
      (bt || n).memoizedState,
      e
    );
    if (i && (n.memoizedState = e, Gt = !0), n = n.queue, ac(Ks.bind(null, a, n, t), [
      t
    ]), n.getSnapshot !== l || i || Yt !== null && Yt.memoizedState.tag & 1) {
      if (a.flags |= 2048, Ea(
        9,
        { destroy: void 0 },
        Vs.bind(
          null,
          a,
          n,
          e,
          l
        ),
        null
      ), _t === null) throw Error(s(349));
      u || (Wl & 127) !== 0 || Zs(a, l, e);
    }
    return e;
  }
  function Zs(t, l, e) {
    t.flags |= 16384, t = { getSnapshot: l, value: e }, l = k.updateQueue, l === null ? (l = ou(), k.updateQueue = l, l.stores = [t]) : (e = l.stores, e === null ? l.stores = [t] : e.push(t));
  }
  function Vs(t, l, e, a) {
    l.value = e, l.getSnapshot = a, Js(l) && ws(t);
  }
  function Ks(t, l, e) {
    return e(function() {
      Js(l) && ws(t);
    });
  }
  function Js(t) {
    var l = t.getSnapshot;
    t = t.value;
    try {
      var e = l();
      return !dl(t, e);
    } catch {
      return !0;
    }
  }
  function ws(t) {
    var l = Ye(t, 2);
    l !== null && fl(l, t, 2);
  }
  function lc(t) {
    var l = tl();
    if (typeof t == "function") {
      var e = t;
      if (t = e(), we) {
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
  function $s(t, l, e, a) {
    return t.baseState = e, Pi(
      t,
      bt,
      typeof a == "function" ? a : Fl
    );
  }
  function vm(t, l, e, a, n) {
    if (yu(t)) throw Error(s(485));
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
      _.T !== null ? e(!0) : u.isTransition = !1, a(u), e = l.pending, e === null ? (u.next = l.pending = u, ks(l, u)) : (u.next = e.next, l.pending = e.next = u);
    }
  }
  function ks(t, l) {
    var e = l.action, a = l.payload, n = t.state;
    if (l.isTransition) {
      var u = _.T, i = {};
      _.T = i;
      try {
        var c = e(n, a), o = _.S;
        o !== null && o(i, c), Ws(t, l, c);
      } catch (v) {
        ec(t, l, v);
      } finally {
        u !== null && i.types !== null && (u.types = i.types), _.T = u;
      }
    } else
      try {
        u = e(n, a), Ws(t, l, u);
      } catch (v) {
        ec(t, l, v);
      }
  }
  function Ws(t, l, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        Fs(t, l, a);
      },
      function(a) {
        return ec(t, l, a);
      }
    ) : Fs(t, l, e);
  }
  function Fs(t, l, e) {
    l.status = "fulfilled", l.value = e, Is(l), t.state = e, l = t.pending, l !== null && (e = l.next, e === l ? t.pending = null : (e = e.next, l.next = e, ks(t, e)));
  }
  function ec(t, l, e) {
    var a = t.pending;
    if (t.pending = null, a !== null) {
      a = a.next;
      do
        l.status = "rejected", l.reason = e, Is(l), l = l.next;
      while (l !== a);
    }
    t.action = null;
  }
  function Is(t) {
    t = t.listeners;
    for (var l = 0; l < t.length; l++) (0, t[l])();
  }
  function Ps(t, l) {
    return l;
  }
  function to(t, l) {
    if (nt) {
      var e = _t.formState;
      if (e !== null) {
        t: {
          var a = k;
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
            de(a);
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
      lastRenderedReducer: Ps,
      lastRenderedState: l
    }, e.queue = a, e = bo.bind(
      null,
      k,
      a
    ), a.dispatch = e, a = lc(!1), u = fc.bind(
      null,
      k,
      !1,
      a.queue
    ), a = tl(), n = {
      state: l,
      dispatch: null,
      action: t,
      pending: null
    }, a.queue = n, e = vm.bind(
      null,
      k,
      n,
      u,
      e
    ), n.dispatch = e, a.memoizedState = t, [l, e, !1];
  }
  function lo(t) {
    var l = Ht();
    return eo(l, bt, t);
  }
  function eo(t, l, e) {
    if (l = Pi(
      t,
      l,
      Ps
    )[0], t = du(Fl)[0], typeof l == "object" && l !== null && typeof l.then == "function")
      try {
        var a = un(l);
      } catch (i) {
        throw i === ga ? eu : i;
      }
    else a = l;
    l = Ht();
    var n = l.queue, u = n.dispatch;
    return e !== l.memoizedState && (k.flags |= 2048, Ea(
      9,
      { destroy: void 0 },
      gm.bind(null, n, e),
      null
    )), [a, u, t];
  }
  function gm(t, l) {
    t.action = l;
  }
  function ao(t) {
    var l = Ht(), e = bt;
    if (e !== null)
      return eo(l, e, t);
    Ht(), l = l.memoizedState, e = Ht();
    var a = e.queue.dispatch;
    return e.memoizedState = t, [l, a, !1];
  }
  function Ea(t, l, e, a) {
    return t = { tag: t, create: e, deps: a, inst: l, next: null }, l = k.updateQueue, l === null && (l = ou(), k.updateQueue = l), e = l.lastEffect, e === null ? l.lastEffect = t.next = t : (a = e.next, e.next = t, t.next = a, l.lastEffect = t), t;
  }
  function no() {
    return Ht().memoizedState;
  }
  function hu(t, l, e, a) {
    var n = tl();
    k.flags |= t, n.memoizedState = Ea(
      1 | l,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function mu(t, l, e, a) {
    var n = Ht();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    bt !== null && a !== null && wi(a, bt.memoizedState.deps) ? n.memoizedState = Ea(l, u, e, a) : (k.flags |= t, n.memoizedState = Ea(
      1 | l,
      u,
      e,
      a
    ));
  }
  function uo(t, l) {
    hu(8390656, 8, t, l);
  }
  function ac(t, l) {
    mu(2048, 8, t, l);
  }
  function pm(t) {
    k.flags |= 4;
    var l = k.updateQueue;
    if (l === null)
      l = ou(), k.updateQueue = l, l.events = [t];
    else {
      var e = l.events;
      e === null ? l.events = [t] : e.push(t);
    }
  }
  function io(t) {
    var l = Ht().memoizedState;
    return pm({ ref: l, nextImpl: t }), function() {
      if ((rt & 2) !== 0) throw Error(s(440));
      return l.impl.apply(void 0, arguments);
    };
  }
  function co(t, l) {
    return mu(4, 2, t, l);
  }
  function fo(t, l) {
    return mu(4, 4, t, l);
  }
  function so(t, l) {
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
  function oo(t, l, e) {
    e = e != null ? e.concat([t]) : null, mu(4, 4, so.bind(null, l, t), e);
  }
  function nc() {
  }
  function ro(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    return l !== null && wi(l, a[1]) ? a[0] : (e.memoizedState = [t, l], t);
  }
  function ho(t, l) {
    var e = Ht();
    l = l === void 0 ? null : l;
    var a = e.memoizedState;
    if (l !== null && wi(l, a[1]))
      return a[0];
    if (a = t(), we) {
      ce(!0);
      try {
        t();
      } finally {
        ce(!1);
      }
    }
    return e.memoizedState = [a, l], a;
  }
  function uc(t, l, e) {
    return e === void 0 || (Wl & 1073741824) !== 0 && (et & 261930) === 0 ? t.memoizedState = l : (t.memoizedState = e, t = mr(), k.lanes |= t, Te |= t, e);
  }
  function mo(t, l, e, a) {
    return dl(e, l) ? e : Sa.current !== null ? (t = uc(t, e, a), dl(t, l) || (Gt = !0), t) : (Wl & 42) === 0 || (Wl & 1073741824) !== 0 && (et & 261930) === 0 ? (Gt = !0, t.memoizedState = e) : (t = mr(), k.lanes |= t, Te |= t, l);
  }
  function yo(t, l, e, a, n) {
    var u = H.p;
    H.p = u !== 0 && 8 > u ? u : 8;
    var i = _.T, c = {};
    _.T = c, fc(t, !1, l, e);
    try {
      var o = n(), v = _.S;
      if (v !== null && v(c, o), o !== null && typeof o == "object" && typeof o.then == "function") {
        var A = hm(
          o,
          a
        );
        cn(
          t,
          l,
          A,
          pl(t)
        );
      } else
        cn(
          t,
          l,
          a,
          pl(t)
        );
    } catch (M) {
      cn(
        t,
        l,
        { then: function() {
        }, status: "rejected", reason: M },
        pl()
      );
    } finally {
      H.p = u, i !== null && c.types !== null && (i.types = c.types), _.T = i;
    }
  }
  function Sm() {
  }
  function ic(t, l, e, a) {
    if (t.tag !== 5) throw Error(s(476));
    var n = vo(t).queue;
    yo(
      t,
      n,
      l,
      J,
      e === null ? Sm : function() {
        return go(t), e(a);
      }
    );
  }
  function vo(t) {
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
  function go(t) {
    var l = vo(t);
    l.next === null && (l = t.alternate.memoizedState), cn(
      t,
      l.next.queue,
      {},
      pl()
    );
  }
  function cc() {
    return kt(An);
  }
  function po() {
    return Ht().memoizedState;
  }
  function So() {
    return Ht().memoizedState;
  }
  function bm(t) {
    for (var l = t.return; l !== null; ) {
      switch (l.tag) {
        case 24:
        case 3:
          var e = pl();
          t = ye(e);
          var a = ve(l, t, e);
          a !== null && (fl(a, l, e), ln(a, l, e)), l = { cache: Bi() }, t.payload = l;
          return;
      }
      l = l.return;
    }
  }
  function Tm(t, l, e) {
    var a = pl();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, yu(t) ? To(l, e) : (e = zi(t, l, e, a), e !== null && (fl(e, t, a), Eo(e, l, a)));
  }
  function bo(t, l, e) {
    var a = pl();
    cn(t, l, e, a);
  }
  function cn(t, l, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (yu(t)) To(l, n);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = l.lastRenderedReducer, u !== null))
        try {
          var i = l.lastRenderedState, c = u(i, e);
          if (n.hasEagerState = !0, n.eagerState = c, dl(c, i))
            return kn(t, l, n, 0), _t === null && $n(), !1;
        } catch {
        } finally {
        }
      if (e = zi(t, l, n, a), e !== null)
        return fl(e, t, a), Eo(e, l, a), !0;
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
    }, yu(t)) {
      if (l) throw Error(s(479));
    } else
      l = zi(
        t,
        e,
        a,
        2
      ), l !== null && fl(l, t, 2);
  }
  function yu(t) {
    var l = t.alternate;
    return t === k || l !== null && l === k;
  }
  function To(t, l) {
    ba = fu = !0;
    var e = t.pending;
    e === null ? l.next = l : (l.next = e.next, e.next = l), t.pending = l;
  }
  function Eo(t, l, e) {
    if ((e & 4194048) !== 0) {
      var a = l.lanes;
      a &= t.pendingLanes, e |= a, l.lanes = e, Of(t, e);
    }
  }
  var fn = {
    readContext: kt,
    use: ru,
    useCallback: xt,
    useContext: xt,
    useEffect: xt,
    useImperativeHandle: xt,
    useLayoutEffect: xt,
    useInsertionEffect: xt,
    useMemo: xt,
    useReducer: xt,
    useRef: xt,
    useState: xt,
    useDebugValue: xt,
    useDeferredValue: xt,
    useTransition: xt,
    useSyncExternalStore: xt,
    useId: xt,
    useHostTransitionStatus: xt,
    useFormState: xt,
    useActionState: xt,
    useOptimistic: xt,
    useMemoCache: xt,
    useCacheRefresh: xt
  };
  fn.useEffectEvent = xt;
  var _o = {
    readContext: kt,
    use: ru,
    useCallback: function(t, l) {
      return tl().memoizedState = [
        t,
        l === void 0 ? null : l
      ], t;
    },
    useContext: kt,
    useEffect: uo,
    useImperativeHandle: function(t, l, e) {
      e = e != null ? e.concat([t]) : null, hu(
        4194308,
        4,
        so.bind(null, l, t),
        e
      );
    },
    useLayoutEffect: function(t, l) {
      return hu(4194308, 4, t, l);
    },
    useInsertionEffect: function(t, l) {
      hu(4, 2, t, l);
    },
    useMemo: function(t, l) {
      var e = tl();
      l = l === void 0 ? null : l;
      var a = t();
      if (we) {
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
      var a = tl();
      if (e !== void 0) {
        var n = e(l);
        if (we) {
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
      }, a.queue = t, t = t.dispatch = Tm.bind(
        null,
        k,
        t
      ), [a.memoizedState, t];
    },
    useRef: function(t) {
      var l = tl();
      return t = { current: t }, l.memoizedState = t;
    },
    useState: function(t) {
      t = lc(t);
      var l = t.queue, e = bo.bind(null, k, l);
      return l.dispatch = e, [t.memoizedState, e];
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = tl();
      return uc(e, t, l);
    },
    useTransition: function() {
      var t = lc(!1);
      return t = yo.bind(
        null,
        k,
        t.queue,
        !0,
        !1
      ), tl().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, l, e) {
      var a = k, n = tl();
      if (nt) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = l(), _t === null)
          throw Error(s(349));
        (et & 127) !== 0 || Zs(a, l, e);
      }
      n.memoizedState = e;
      var u = { value: e, getSnapshot: l };
      return n.queue = u, uo(Ks.bind(null, a, u, t), [
        t
      ]), a.flags |= 2048, Ea(
        9,
        { destroy: void 0 },
        Vs.bind(
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
      var t = tl(), l = _t.identifierPrefix;
      if (nt) {
        var e = Yl, a = ql;
        e = (a & ~(1 << 32 - rl(a) - 1)).toString(32) + e, l = "_" + l + "R_" + e, e = su++, 0 < e && (l += "H" + e.toString(32)), l += "_";
      } else
        e = mm++, l = "_" + l + "r_" + e.toString(32) + "_";
      return t.memoizedState = l;
    },
    useHostTransitionStatus: cc,
    useFormState: to,
    useActionState: to,
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
        k,
        !0,
        e
      ), e.dispatch = l, [t, l];
    },
    useMemoCache: Ii,
    useCacheRefresh: function() {
      return tl().memoizedState = bm.bind(
        null,
        k
      );
    },
    useEffectEvent: function(t) {
      var l = tl(), e = { impl: t };
      return l.memoizedState = e, function() {
        if ((rt & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, sc = {
    readContext: kt,
    use: ru,
    useCallback: ro,
    useContext: kt,
    useEffect: ac,
    useImperativeHandle: oo,
    useInsertionEffect: co,
    useLayoutEffect: fo,
    useMemo: ho,
    useReducer: du,
    useRef: no,
    useState: function() {
      return du(Fl);
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return mo(
        e,
        bt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = du(Fl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Qs,
    useId: po,
    useHostTransitionStatus: cc,
    useFormState: lo,
    useActionState: lo,
    useOptimistic: function(t, l) {
      var e = Ht();
      return $s(e, bt, t, l);
    },
    useMemoCache: Ii,
    useCacheRefresh: So
  };
  sc.useEffectEvent = io;
  var Ao = {
    readContext: kt,
    use: ru,
    useCallback: ro,
    useContext: kt,
    useEffect: ac,
    useImperativeHandle: oo,
    useInsertionEffect: co,
    useLayoutEffect: fo,
    useMemo: ho,
    useReducer: tc,
    useRef: no,
    useState: function() {
      return tc(Fl);
    },
    useDebugValue: nc,
    useDeferredValue: function(t, l) {
      var e = Ht();
      return bt === null ? uc(e, t, l) : mo(
        e,
        bt.memoizedState,
        t,
        l
      );
    },
    useTransition: function() {
      var t = tc(Fl)[0], l = Ht().memoizedState;
      return [
        typeof t == "boolean" ? t : un(t),
        l
      ];
    },
    useSyncExternalStore: Qs,
    useId: po,
    useHostTransitionStatus: cc,
    useFormState: ao,
    useActionState: ao,
    useOptimistic: function(t, l) {
      var e = Ht();
      return bt !== null ? $s(e, bt, t, l) : (e.baseState = t, [t, e.queue.dispatch]);
    },
    useMemoCache: Ii,
    useCacheRefresh: So
  };
  Ao.useEffectEvent = io;
  function oc(t, l, e, a) {
    l = t.memoizedState, e = e(a, l), e = e == null ? l : j({}, l, e), t.memoizedState = e, t.lanes === 0 && (t.updateQueue.baseState = e);
  }
  var rc = {
    enqueueSetState: function(t, l, e) {
      t = t._reactInternals;
      var a = pl(), n = ye(a);
      n.payload = l, e != null && (n.callback = e), l = ve(t, n, a), l !== null && (fl(l, t, a), ln(l, t, a));
    },
    enqueueReplaceState: function(t, l, e) {
      t = t._reactInternals;
      var a = pl(), n = ye(a);
      n.tag = 1, n.payload = l, e != null && (n.callback = e), l = ve(t, n, a), l !== null && (fl(l, t, a), ln(l, t, a));
    },
    enqueueForceUpdate: function(t, l) {
      t = t._reactInternals;
      var e = pl(), a = ye(e);
      a.tag = 2, l != null && (a.callback = l), l = ve(t, a, e), l !== null && (fl(l, t, e), ln(l, t, e));
    }
  };
  function zo(t, l, e, a, n, u, i) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(a, u, i) : l.prototype && l.prototype.isPureReactComponent ? !wa(e, a) || !wa(n, u) : !0;
  }
  function Oo(t, l, e, a) {
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
  function Mo(t) {
    wn(t);
  }
  function Do(t) {
    console.error(t);
  }
  function No(t) {
    wn(t);
  }
  function vu(t, l) {
    try {
      var e = t.onUncaughtError;
      e(l.value, { componentStack: l.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function xo(t, l, e) {
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
    return e = ye(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      vu(t, l);
    }, e;
  }
  function jo(t) {
    return t = ye(t), t.tag = 3, t;
  }
  function Uo(t, l, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      t.payload = function() {
        return n(u);
      }, t.callback = function() {
        xo(l, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (t.callback = function() {
      xo(l, e, a), typeof n != "function" && (Ee === null ? Ee = /* @__PURE__ */ new Set([this]) : Ee.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function Em(t, l, e, a, n) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (l = e.alternate, l !== null && ma(
        l,
        e,
        n,
        !0
      ), e = ml.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Dl === null ? Du() : e.alternate === null && jt === 0 && (jt = 3), e.flags &= -257, e.flags |= 65536, e.lanes = n, a === au ? e.flags |= 16384 : (l = e.updateQueue, l === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : l.add(a), qc(t, a, n)), !1;
          case 22:
            return e.flags |= 65536, a === au ? e.flags |= 16384 : (l = e.updateQueue, l === null ? (l = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = l) : (e = l.retryQueue, e === null ? l.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), qc(t, a, n)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return qc(t, a, n), Du(), !1;
    }
    if (nt)
      return l = ml.current, l !== null ? ((l.flags & 65536) === 0 && (l.flags |= 256), l.flags |= 65536, l.lanes = n, a !== ji && (t = Error(s(422), { cause: a }), Wa(Al(t, e)))) : (a !== ji && (l = Error(s(423), {
        cause: a
      }), Wa(
        Al(l, e)
      )), t = t.current.alternate, t.flags |= 65536, n &= -n, t.lanes |= n, a = Al(a, e), n = dc(
        t.stateNode,
        a,
        n
      ), Qi(t, n), jt !== 4 && (jt = 2)), !1;
    var u = Error(s(520), { cause: a });
    if (u = Al(u, e), vn === null ? vn = [u] : vn.push(u), jt !== 4 && (jt = 2), l === null) return !0;
    a = Al(a, e), e = l;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, t = n & -n, e.lanes |= t, t = dc(e.stateNode, a, t), Qi(e, t), !1;
        case 1:
          if (l = e.type, u = e.stateNode, (e.flags & 128) === 0 && (typeof l.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ee === null || !Ee.has(u))))
            return e.flags |= 65536, n &= -n, e.lanes |= n, n = jo(n), Uo(
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
  var hc = Error(s(461)), Gt = !1;
  function Wt(t, l, e, a) {
    l.child = t === null ? Hs(l, null, e, a) : Je(
      l,
      t.child,
      e,
      a
    );
  }
  function Co(t, l, e, a, n) {
    e = e.render;
    var u = l.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return Qe(l), a = $i(
      t,
      l,
      e,
      i,
      u,
      n
    ), c = ki(), t !== null && !Gt ? (Wi(t, l, n), Il(t, l, n)) : (nt && c && Ni(l), l.flags |= 1, Wt(t, l, a, n), l.child);
  }
  function Ro(t, l, e, a, n) {
    if (t === null) {
      var u = e.type;
      return typeof u == "function" && !Oi(u) && u.defaultProps === void 0 && e.compare === null ? (l.tag = 15, l.type = u, Ho(
        t,
        l,
        u,
        a,
        n
      )) : (t = Fn(
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
      if (e = e.compare, e = e !== null ? e : wa, e(i, a) && t.ref === l.ref)
        return Il(t, l, n);
    }
    return l.flags |= 1, t = Jl(u, a), t.ref = l.ref, t.return = l, l.child = t;
  }
  function Ho(t, l, e, a, n) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (wa(u, a) && t.ref === l.ref)
        if (Gt = !1, l.pendingProps = a = u, Tc(t, n))
          (t.flags & 131072) !== 0 && (Gt = !0);
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
  function Bo(t, l, e, a) {
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
        return qo(
          t,
          l,
          u,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        l.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && lu(
          l,
          u !== null ? u.cachePool : null
        ), u !== null ? Ys(l, u) : Vi(), Gs(l);
      else
        return a = l.lanes = 536870912, qo(
          t,
          l,
          u !== null ? u.baseLanes | e : e,
          e,
          a
        );
    } else
      u !== null ? (lu(l, u.cachePool), Ys(l, u), pe(), l.memoizedState = null) : (t !== null && lu(l, null), Vi(), pe());
    return Wt(t, l, n, e), l.child;
  }
  function sn(t, l) {
    return t !== null && t.tag === 22 || l.stateNode !== null || (l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.sibling;
  }
  function qo(t, l, e, a, n) {
    var u = Yi();
    return u = u === null ? null : { parent: qt._currentValue, pool: u }, l.memoizedState = {
      baseLanes: e,
      cachePool: u
    }, t !== null && lu(l, null), Vi(), Gs(l), t !== null && ma(t, l, a, !0), l.childLanes = n, null;
  }
  function gu(t, l) {
    return l = Su(
      { mode: l.mode, children: l.children },
      t.mode
    ), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function Yo(t, l, e) {
    return Je(l, t.child, null, e), t = gu(l, l.pendingProps), t.flags |= 2, yl(l), l.memoizedState = null, t;
  }
  function _m(t, l, e) {
    var a = l.pendingProps, n = (l.flags & 128) !== 0;
    if (l.flags &= -129, t === null) {
      if (nt) {
        if (a.mode === "hidden")
          return t = gu(l, a), l.lanes = 536870912, sn(null, t);
        if (Ji(l), (t = zt) ? (t = Wr(
          t,
          Ml
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: oe !== null ? { id: ql, overflow: Yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bs(t), e.return = l, l.child = e, $t = l, zt = null)) : t = null, t === null) throw de(l);
        return l.lanes = 536870912, null;
      }
      return gu(l, a);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var i = u.dehydrated;
      if (Ji(l), n)
        if (l.flags & 256)
          l.flags &= -257, l = Yo(
            t,
            l,
            e
          );
        else if (l.memoizedState !== null)
          l.child = t.child, l.flags |= 128, l = null;
        else throw Error(s(558));
      else if (Gt || ma(t, l, e, !1), n = (e & t.childLanes) !== 0, Gt || n) {
        if (a = _t, a !== null && (i = Mf(a, e), i !== 0 && i !== u.retryLane))
          throw u.retryLane = i, Ye(t, i), fl(a, t, i), hc;
        Du(), l = Yo(
          t,
          l,
          e
        );
      } else
        t = u.treeContext, zt = Nl(i.nextSibling), $t = l, nt = !0, re = null, Ml = !1, t !== null && _s(l, t), l = gu(l, a), l.flags |= 4096;
      return l;
    }
    return t = Jl(t.child, {
      mode: a.mode,
      children: a.children
    }), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function pu(t, l) {
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
    return Qe(l), e = $i(
      t,
      l,
      e,
      a,
      void 0,
      n
    ), a = ki(), t !== null && !Gt ? (Wi(t, l, n), Il(t, l, n)) : (nt && a && Ni(l), l.flags |= 1, Wt(t, l, e, n), l.child);
  }
  function Go(t, l, e, a, n, u) {
    return Qe(l), l.updateQueue = null, e = Ls(
      l,
      a,
      e,
      n
    ), Xs(t), a = ki(), t !== null && !Gt ? (Wi(t, l, u), Il(t, l, u)) : (nt && a && Ni(l), l.flags |= 1, Wt(t, l, e, u), l.child);
  }
  function Xo(t, l, e, a, n) {
    if (Qe(l), l.stateNode === null) {
      var u = oa, i = e.contextType;
      typeof i == "object" && i !== null && (u = kt(i)), u = new e(a, u), l.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = rc, l.stateNode = u, u._reactInternals = l, u = l.stateNode, u.props = a, u.state = l.memoizedState, u.refs = {}, Xi(l), i = e.contextType, u.context = typeof i == "object" && i !== null ? kt(i) : oa, u.state = l.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (oc(
        l,
        e,
        i,
        a
      ), u.state = l.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (i = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), i !== u.state && rc.enqueueReplaceState(u, u.state, null), an(l, a, u, n), en(), u.state = l.memoizedState), typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !0;
    } else if (t === null) {
      u = l.stateNode;
      var c = l.memoizedProps, o = $e(e, c);
      u.props = o;
      var v = u.context, A = e.contextType;
      i = oa, typeof A == "object" && A !== null && (i = kt(A));
      var M = e.getDerivedStateFromProps;
      A = typeof M == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = l.pendingProps !== c, A || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || v !== i) && Oo(
        l,
        u,
        a,
        i
      ), me = !1;
      var p = l.memoizedState;
      u.state = p, an(l, a, u, n), en(), v = l.memoizedState, c || p !== v || me ? (typeof M == "function" && (oc(
        l,
        e,
        M,
        a
      ), v = l.memoizedState), (o = me || zo(
        l,
        e,
        o,
        a,
        p,
        v,
        i
      )) ? (A || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (l.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), l.memoizedProps = a, l.memoizedState = v), u.props = a, u.state = v, u.context = i, a = o) : (typeof u.componentDidMount == "function" && (l.flags |= 4194308), a = !1);
    } else {
      u = l.stateNode, Li(t, l), i = l.memoizedProps, A = $e(e, i), u.props = A, M = l.pendingProps, p = u.context, v = e.contextType, o = oa, typeof v == "object" && v !== null && (o = kt(v)), c = e.getDerivedStateFromProps, (v = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (i !== M || p !== o) && Oo(
        l,
        u,
        a,
        o
      ), me = !1, p = l.memoizedState, u.state = p, an(l, a, u, n), en();
      var T = l.memoizedState;
      i !== M || p !== T || me || t !== null && t.dependencies !== null && Pn(t.dependencies) ? (typeof c == "function" && (oc(
        l,
        e,
        c,
        a
      ), T = l.memoizedState), (A = me || zo(
        l,
        e,
        A,
        a,
        p,
        T,
        o
      ) || t !== null && t.dependencies !== null && Pn(t.dependencies)) ? (v || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, T, o), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        a,
        T,
        o
      )), typeof u.componentDidUpdate == "function" && (l.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (l.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 1024), l.memoizedProps = a, l.memoizedState = T), u.props = a, u.state = T, u.context = o, a = A) : (typeof u.componentDidUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || i === t.memoizedProps && p === t.memoizedState || (l.flags |= 1024), a = !1);
    }
    return u = a, pu(t, l), a = (l.flags & 128) !== 0, u || a ? (u = l.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : u.render(), l.flags |= 1, t !== null && a ? (l.child = Je(
      l,
      t.child,
      null,
      n
    ), l.child = Je(
      l,
      null,
      e,
      n
    )) : Wt(t, l, e, n), l.memoizedState = u.state, t = l.child) : t = Il(
      t,
      l,
      n
    ), t;
  }
  function Lo(t, l, e, a) {
    return Xe(), l.flags |= 256, Wt(t, l, e, a), l.child;
  }
  var yc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function vc(t) {
    return { baseLanes: t, cachePool: Ns() };
  }
  function gc(t, l, e) {
    return t = t !== null ? t.childLanes & ~e : 0, l && (t |= gl), t;
  }
  function Qo(t, l, e) {
    var a = l.pendingProps, n = !1, u = (l.flags & 128) !== 0, i;
    if ((i = u) || (i = t !== null && t.memoizedState === null ? !1 : (Rt.current & 2) !== 0), i && (n = !0, l.flags &= -129), i = (l.flags & 32) !== 0, l.flags &= -33, t === null) {
      if (nt) {
        if (n ? ge(l) : pe(), (t = zt) ? (t = Wr(
          t,
          Ml
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (l.memoizedState = {
          dehydrated: t,
          treeContext: oe !== null ? { id: ql, overflow: Yl } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = bs(t), e.return = l, l.child = e, $t = l, zt = null)) : t = null, t === null) throw de(l);
        return Pc(t) ? l.lanes = 32 : l.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, n ? (pe(), n = l.mode, c = Su(
        { mode: "hidden", children: c },
        n
      ), a = Ge(
        a,
        n,
        e,
        null
      ), c.return = l, a.return = l, c.sibling = a, l.child = c, a = l.child, a.memoizedState = vc(e), a.childLanes = gc(
        t,
        i,
        e
      ), l.memoizedState = yc, sn(null, a)) : (ge(l), pc(l, c));
    }
    var o = t.memoizedState;
    if (o !== null && (c = o.dehydrated, c !== null)) {
      if (u)
        l.flags & 256 ? (ge(l), l.flags &= -257, l = Sc(
          t,
          l,
          e
        )) : l.memoizedState !== null ? (pe(), l.child = t.child, l.flags |= 128, l = null) : (pe(), c = a.fallback, n = l.mode, a = Su(
          { mode: "visible", children: a.children },
          n
        ), c = Ge(
          c,
          n,
          e,
          null
        ), c.flags |= 2, a.return = l, c.return = l, a.sibling = c, l.child = a, Je(
          l,
          t.child,
          null,
          e
        ), a = l.child, a.memoizedState = vc(e), a.childLanes = gc(
          t,
          i,
          e
        ), l.memoizedState = yc, l = sn(null, a));
      else if (ge(l), Pc(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var v = i.dgst;
        i = v, a = Error(s(419)), a.stack = "", a.digest = i, Wa({ value: a, source: null, stack: null }), l = Sc(
          t,
          l,
          e
        );
      } else if (Gt || ma(t, l, e, !1), i = (e & t.childLanes) !== 0, Gt || i) {
        if (i = _t, i !== null && (a = Mf(i, e), a !== 0 && a !== o.retryLane))
          throw o.retryLane = a, Ye(t, a), fl(i, t, a), hc;
        Ic(c) || Du(), l = Sc(
          t,
          l,
          e
        );
      } else
        Ic(c) ? (l.flags |= 192, l.child = t.child, l = null) : (t = o.treeContext, zt = Nl(
          c.nextSibling
        ), $t = l, nt = !0, re = null, Ml = !1, t !== null && _s(l, t), l = pc(
          l,
          a.children
        ), l.flags |= 4096);
      return l;
    }
    return n ? (pe(), c = a.fallback, n = l.mode, o = t.child, v = o.sibling, a = Jl(o, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = o.subtreeFlags & 65011712, v !== null ? c = Jl(
      v,
      c
    ) : (c = Ge(
      c,
      n,
      e,
      null
    ), c.flags |= 2), c.return = l, a.return = l, a.sibling = c, l.child = a, sn(null, a), a = l.child, c = t.child.memoizedState, c === null ? c = vc(e) : (n = c.cachePool, n !== null ? (o = qt._currentValue, n = n.parent !== o ? { parent: o, pool: o } : n) : n = Ns(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: n
    }), a.memoizedState = c, a.childLanes = gc(
      t,
      i,
      e
    ), l.memoizedState = yc, sn(t.child, a)) : (ge(l), e = t.child, t = e.sibling, e = Jl(e, {
      mode: "visible",
      children: a.children
    }), e.return = l, e.sibling = null, t !== null && (i = l.deletions, i === null ? (l.deletions = [t], l.flags |= 16) : i.push(t)), l.child = e, l.memoizedState = null, e);
  }
  function pc(t, l) {
    return l = Su(
      { mode: "visible", children: l },
      t.mode
    ), l.return = t, t.child = l;
  }
  function Su(t, l) {
    return t = hl(22, t, null, l), t.lanes = 0, t;
  }
  function Sc(t, l, e) {
    return Je(l, t.child, null, e), t = pc(
      l,
      l.pendingProps.children
    ), t.flags |= 2, l.memoizedState = null, t;
  }
  function Zo(t, l, e) {
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
  function Vo(t, l, e) {
    var a = l.pendingProps, n = a.revealOrder, u = a.tail;
    a = a.children;
    var i = Rt.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, l.flags |= 128) : i &= 1, B(Rt, i), Wt(t, l, a, e), a = nt ? ka : 0, !c && t !== null && (t.flags & 128) !== 0)
      t: for (t = l.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Zo(t, e, l);
        else if (t.tag === 19)
          Zo(t, e, l);
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
          t = e.alternate, t !== null && cu(t) === null && (n = e), e = e.sibling;
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
          if (t = n.alternate, t !== null && cu(t) === null) {
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
    if (t !== null && (l.dependencies = t.dependencies), Te |= l.lanes, (e & l.childLanes) === 0)
      if (t !== null) {
        if (ma(
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
    return (t.lanes & l) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Pn(t)));
  }
  function Am(t, l, e) {
    switch (l.tag) {
      case 3:
        Jt(l, l.stateNode.containerInfo), he(l, qt, t.memoizedState.cache), Xe();
        break;
      case 27:
      case 5:
        Ue(l);
        break;
      case 4:
        Jt(l, l.stateNode.containerInfo);
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
          return l.flags |= 128, Ji(l), null;
        break;
      case 13:
        var a = l.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (ge(l), l.flags |= 128, null) : (e & l.child.childLanes) !== 0 ? Qo(t, l, e) : (ge(l), t = Il(
            t,
            l,
            e
          ), t !== null ? t.sibling : null);
        ge(l);
        break;
      case 19:
        var n = (t.flags & 128) !== 0;
        if (a = (e & l.childLanes) !== 0, a || (ma(
          t,
          l,
          e,
          !1
        ), a = (e & l.childLanes) !== 0), n) {
          if (a)
            return Vo(
              t,
              l,
              e
            );
          l.flags |= 128;
        }
        if (n = l.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), B(Rt, Rt.current), a) break;
        return null;
      case 22:
        return l.lanes = 0, Bo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        he(l, qt, t.memoizedState.cache);
    }
    return Il(t, l, e);
  }
  function Ko(t, l, e) {
    if (t !== null)
      if (t.memoizedProps !== l.pendingProps)
        Gt = !0;
      else {
        if (!Tc(t, e) && (l.flags & 128) === 0)
          return Gt = !1, Am(
            t,
            l,
            e
          );
        Gt = (t.flags & 131072) !== 0;
      }
    else
      Gt = !1, nt && (l.flags & 1048576) !== 0 && Es(l, ka, l.index);
    switch (l.lanes = 0, l.tag) {
      case 16:
        t: {
          var a = l.pendingProps;
          if (t = Ve(l.elementType), l.type = t, typeof t == "function")
            Oi(t) ? (a = $e(t, a), l.tag = 1, l = Xo(
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
              if (n === Bt) {
                l.tag = 11, l = Co(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              } else if (n === L) {
                l.tag = 14, l = Ro(
                  null,
                  l,
                  t,
                  a,
                  e
                );
                break t;
              }
            }
            throw l = Ul(t) || t, Error(s(306, l, ""));
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
        ), Xo(
          t,
          l,
          a,
          n,
          e
        );
      case 3:
        t: {
          if (Jt(
            l,
            l.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          a = l.pendingProps;
          var u = l.memoizedState;
          n = u.element, Li(t, l), an(l, a, null, e);
          var i = l.memoizedState;
          if (a = i.cache, he(l, qt, a), a !== u.cache && Hi(
            l,
            [qt],
            e,
            !0
          ), en(), a = i.element, u.isDehydrated)
            if (u = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, l.updateQueue.baseState = u, l.memoizedState = u, l.flags & 256) {
              l = Lo(
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
              ), Wa(n), l = Lo(
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
              for (zt = Nl(t.firstChild), $t = l, nt = !0, re = null, Ml = !0, e = Hs(
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
            Wt(t, l, a, e);
          }
          l = l.child;
        }
        return l;
      case 26:
        return pu(t, l), t === null ? (e = ed(
          l.type,
          null,
          l.pendingProps,
          null
        )) ? l.memoizedState = e : nt || (e = l.type, t = l.pendingProps, a = Hu(
          I.current
        ).createElement(e), a[wt] = l, a[el] = t, Ft(a, e, t), Vt(a), l.stateNode = a) : l.memoizedState = ed(
          l.type,
          t.memoizedProps,
          l.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ue(l), t === null && nt && (a = l.stateNode = Pr(
          l.type,
          l.pendingProps,
          I.current
        ), $t = l, Ml = !0, n = zt, Oe(l.type) ? (tf = n, zt = Nl(a.firstChild)) : zt = n), Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), pu(t, l), t === null && (l.flags |= 4194304), l.child;
      case 5:
        return t === null && nt && ((n = a = zt) && (a = ty(
          a,
          l.type,
          l.pendingProps,
          Ml
        ), a !== null ? (l.stateNode = a, $t = l, zt = Nl(a.firstChild), Ml = !1, n = !0) : n = !1), n || de(l)), Ue(l), n = l.type, u = l.pendingProps, i = t !== null ? t.memoizedProps : null, a = u.children, kc(n, u) ? a = null : i !== null && kc(n, i) && (l.flags |= 32), l.memoizedState !== null && (n = $i(
          t,
          l,
          ym,
          null,
          null,
          e
        ), An._currentValue = n), pu(t, l), Wt(t, l, a, e), l.child;
      case 6:
        return t === null && nt && ((t = e = zt) && (e = ly(
          e,
          l.pendingProps,
          Ml
        ), e !== null ? (l.stateNode = e, $t = l, zt = null, t = !0) : t = !1), t || de(l)), null;
      case 13:
        return Qo(t, l, e);
      case 4:
        return Jt(
          l,
          l.stateNode.containerInfo
        ), a = l.pendingProps, t === null ? l.child = Je(
          l,
          null,
          a,
          e
        ) : Wt(t, l, a, e), l.child;
      case 11:
        return Co(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 7:
        return Wt(
          t,
          l,
          l.pendingProps,
          e
        ), l.child;
      case 8:
        return Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 12:
        return Wt(
          t,
          l,
          l.pendingProps.children,
          e
        ), l.child;
      case 10:
        return a = l.pendingProps, he(l, l.type, a.value), Wt(t, l, a.children, e), l.child;
      case 9:
        return n = l.type._context, a = l.pendingProps.children, Qe(l), n = kt(n), a = a(n), l.flags |= 1, Wt(t, l, a, e), l.child;
      case 14:
        return Ro(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 15:
        return Ho(
          t,
          l,
          l.type,
          l.pendingProps,
          e
        );
      case 19:
        return Vo(t, l, e);
      case 31:
        return _m(t, l, e);
      case 22:
        return Bo(
          t,
          l,
          e,
          l.pendingProps
        );
      case 24:
        return Qe(l), a = kt(qt), t === null ? (n = Yi(), n === null && (n = _t, u = Bi(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= e), n = u), l.memoizedState = { parent: a, cache: n }, Xi(l), he(l, qt, n)) : ((t.lanes & e) !== 0 && (Li(t, l), an(l, null, null, e), en()), n = t.memoizedState, u = l.memoizedState, n.parent !== a ? (n = { parent: a, cache: a }, l.memoizedState = n, l.lanes === 0 && (l.memoizedState = l.updateQueue.baseState = n), he(l, qt, a)) : (a = u.cache, he(l, qt, a), a !== n.cache && Hi(
          l,
          [qt],
          e,
          !0
        ))), Wt(
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
        else if (pr()) t.flags |= 8192;
        else
          throw Ke = au, Gi;
    } else t.flags &= -16777217;
  }
  function Jo(t, l) {
    if (l.type !== "stylesheet" || (l.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !cd(l))
      if (pr()) t.flags |= 8192;
      else
        throw Ke = au, Gi;
  }
  function bu(t, l) {
    l !== null && (t.flags |= 4), t.flags & 16384 && (l = t.tag !== 22 ? Af() : 536870912, t.lanes |= l, Oa |= l);
  }
  function on(t, l) {
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
        return e = l.stateNode, a = null, t !== null && (a = t.memoizedState.cache), l.memoizedState.cache !== a && (l.flags |= 2048), kl(qt), At(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (t === null || t.child === null) && (ha(l) ? Pl(l) : t === null || t.memoizedState.isDehydrated && (l.flags & 256) === 0 || (l.flags |= 1024, Ui())), Ot(l), null;
      case 26:
        var n = l.type, u = l.memoizedState;
        return t === null ? (Pl(l), u !== null ? (Ot(l), Jo(l, u)) : (Ot(l), Ec(
          l,
          n,
          null,
          a,
          e
        ))) : u ? u !== t.memoizedState ? (Pl(l), Ot(l), Jo(l, u)) : (Ot(l), l.flags &= -16777217) : (t = t.memoizedProps, t !== a && Pl(l), Ot(l), Ec(
          l,
          n,
          t,
          a,
          e
        )), null;
      case 27:
        if (C(l), e = I.current, n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), null;
          }
          t = q.current, ha(l) ? As(l) : (t = Pr(n, a, e), l.stateNode = t, Pl(l));
        }
        return Ot(l), null;
      case 5:
        if (C(l), n = l.type, t !== null && l.stateNode != null)
          t.memoizedProps !== a && Pl(l);
        else {
          if (!a) {
            if (l.stateNode === null)
              throw Error(s(166));
            return Ot(l), null;
          }
          if (u = q.current, ha(l))
            As(l);
          else {
            var i = Hu(
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
            t: switch (Ft(u, n, a), n) {
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
          if (t = I.current, ha(l)) {
            if (t = l.stateNode, e = l.memoizedProps, a = null, n = $t, n !== null)
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            t[wt] = l, t = !!(t.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Qr(t.nodeValue, e)), t || de(l, !0);
          } else
            t = Hu(t).createTextNode(
              a
            ), t[wt] = l, l.stateNode = t;
        }
        return Ot(l), null;
      case 31:
        if (e = l.memoizedState, t === null || t.memoizedState !== null) {
          if (a = ha(l), e !== null) {
            if (t === null) {
              if (!a) throw Error(s(318));
              if (t = l.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[wt] = l;
            } else
              Xe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), t = !1;
          } else
            e = Ui(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = e), t = !0;
          if (!t)
            return l.flags & 256 ? (yl(l), l) : (yl(l), null);
          if ((l.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ot(l), null;
      case 13:
        if (a = l.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (n = ha(l), a !== null && a.dehydrated !== null) {
            if (t === null) {
              if (!n) throw Error(s(318));
              if (n = l.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(s(317));
              n[wt] = l;
            } else
              Xe(), (l.flags & 128) === 0 && (l.memoizedState = null), l.flags |= 4;
            Ot(l), n = !1;
          } else
            n = Ui(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), n = !0;
          if (!n)
            return l.flags & 256 ? (yl(l), l) : (yl(l), null);
        }
        return yl(l), (l.flags & 128) !== 0 ? (l.lanes = e, l) : (e = a !== null, t = t !== null && t.memoizedState !== null, e && (a = l.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), e !== t && e && (l.child.flags |= 8192), bu(l, l.updateQueue), Ot(l), null);
      case 4:
        return At(), t === null && Vc(l.stateNode.containerInfo), Ot(l), null;
      case 10:
        return kl(l.type), Ot(l), null;
      case 19:
        if (D(Rt), a = l.memoizedState, a === null) return Ot(l), null;
        if (n = (l.flags & 128) !== 0, u = a.rendering, u === null)
          if (n) on(a, !1);
          else {
            if (jt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = l.child; t !== null; ) {
                if (u = cu(t), u !== null) {
                  for (l.flags |= 128, on(a, !1), t = u.updateQueue, l.updateQueue = t, bu(l, t), l.subtreeFlags = 0, t = e, e = l.child; e !== null; )
                    Ss(e, t), e = e.sibling;
                  return B(
                    Rt,
                    Rt.current & 1 | 2
                  ), nt && wl(l, a.treeForkCount), l.child;
                }
                t = t.sibling;
              }
            a.tail !== null && sl() > zu && (l.flags |= 128, n = !0, on(a, !1), l.lanes = 4194304);
          }
        else {
          if (!n)
            if (t = cu(u), t !== null) {
              if (l.flags |= 128, n = !0, t = t.updateQueue, l.updateQueue = t, bu(l, t), on(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !nt)
                return Ot(l), null;
            } else
              2 * sl() - a.renderingStartTime > zu && e !== 536870912 && (l.flags |= 128, n = !0, on(a, !1), l.lanes = 4194304);
          a.isBackwards ? (u.sibling = l.child, l.child = u) : (t = a.last, t !== null ? t.sibling = u : l.child = u, a.last = u);
        }
        return a.tail !== null ? (t = a.tail, a.rendering = t, a.tail = t.sibling, a.renderingStartTime = sl(), t.sibling = null, e = Rt.current, B(
          Rt,
          n ? e & 1 | 2 : e & 1
        ), nt && wl(l, a.treeForkCount), t) : (Ot(l), null);
      case 22:
      case 23:
        return yl(l), Ki(), a = l.memoizedState !== null, t !== null ? t.memoizedState !== null !== a && (l.flags |= 8192) : a && (l.flags |= 8192), a ? (e & 536870912) !== 0 && (l.flags & 128) === 0 && (Ot(l), l.subtreeFlags & 6 && (l.flags |= 8192)) : Ot(l), e = l.updateQueue, e !== null && bu(l, e.retryQueue), e = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), a = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), a !== e && (l.flags |= 2048), t !== null && D(Ze), null;
      case 24:
        return e = null, t !== null && (e = t.memoizedState.cache), l.memoizedState.cache !== e && (l.flags |= 2048), kl(qt), Ot(l), null;
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
        return kl(qt), At(), t = l.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (l.flags = t & -65537 | 128, l) : null;
      case 26:
      case 27:
      case 5:
        return C(l), null;
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
        return D(Rt), null;
      case 4:
        return At(), null;
      case 10:
        return kl(l.type), null;
      case 22:
      case 23:
        return yl(l), Ki(), t !== null && D(Ze), t = l.flags, t & 65536 ? (l.flags = t & -65537 | 128, l) : null;
      case 24:
        return kl(qt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wo(t, l) {
    switch (xi(l), l.tag) {
      case 3:
        kl(qt), At();
        break;
      case 26:
      case 27:
      case 5:
        C(l);
        break;
      case 4:
        At();
        break;
      case 31:
        l.memoizedState !== null && yl(l);
        break;
      case 13:
        yl(l);
        break;
      case 19:
        D(Rt);
        break;
      case 10:
        kl(l.type);
        break;
      case 22:
      case 23:
        yl(l), Ki(), t !== null && D(Ze);
        break;
      case 24:
        kl(qt);
    }
  }
  function rn(t, l) {
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
              var o = e, v = c;
              try {
                v();
              } catch (A) {
                gt(
                  n,
                  o,
                  A
                );
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (A) {
      gt(l, l.return, A);
    }
  }
  function $o(t) {
    var l = t.updateQueue;
    if (l !== null) {
      var e = t.stateNode;
      try {
        qs(l, e);
      } catch (a) {
        gt(t, t.return, a);
      }
    }
  }
  function ko(t, l, e) {
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
  function dn(t, l) {
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
  function Gl(t, l) {
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
  function Wo(t) {
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
      $m(a, t.type, e, l), a[el] = l;
    } catch (n) {
      gt(t, t.return, n);
    }
  }
  function Fo(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Oe(t.type) || t.tag === 4;
  }
  function Ac(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Fo(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Oe(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function zc(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(t, l) : (l = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.appendChild(t), e = e._reactRootContainer, e != null || l.onclick !== null || (l.onclick = Vl));
    else if (a !== 4 && (a === 27 && Oe(t.type) && (e = t.stateNode, l = null), t = t.child, t !== null))
      for (zc(t, l, e), t = t.sibling; t !== null; )
        zc(t, l, e), t = t.sibling;
  }
  function Tu(t, l, e) {
    var a = t.tag;
    if (a === 5 || a === 6)
      t = t.stateNode, l ? e.insertBefore(t, l) : e.appendChild(t);
    else if (a !== 4 && (a === 27 && Oe(t.type) && (e = t.stateNode), t = t.child, t !== null))
      for (Tu(t, l, e), t = t.sibling; t !== null; )
        Tu(t, l, e), t = t.sibling;
  }
  function Io(t) {
    var l = t.stateNode, e = t.memoizedProps;
    try {
      for (var a = t.type, n = l.attributes; n.length; )
        l.removeAttributeNode(n[0]);
      Ft(l, a, e), l[wt] = t, l[el] = e;
    } catch (u) {
      gt(t, t.return, u);
    }
  }
  var te = !1, Xt = !1, Oc = !1, Po = typeof WeakSet == "function" ? WeakSet : Set, Kt = null;
  function Mm(t, l) {
    if (t = t.containerInfo, wc = Qu, t = os(t), Si(t)) {
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
            var i = 0, c = -1, o = -1, v = 0, A = 0, M = t, p = null;
            l: for (; ; ) {
              for (var T; M !== e || n !== 0 && M.nodeType !== 3 || (c = i + n), M !== u || a !== 0 && M.nodeType !== 3 || (o = i + a), M.nodeType === 3 && (i += M.nodeValue.length), (T = M.firstChild) !== null; )
                p = M, M = T;
              for (; ; ) {
                if (M === t) break l;
                if (p === e && ++v === n && (c = i), p === u && ++A === a && (o = i), (T = M.nextSibling) !== null) break;
                M = p, p = M.parentNode;
              }
              M = T;
            }
            e = c === -1 || o === -1 ? null : { start: c, end: o };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for ($c = { focusedElem: t, selectionRange: e }, Qu = !1, Kt = l; Kt !== null; )
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
                  var Y = $e(
                    e.type,
                    n
                  );
                  t = a.getSnapshotBeforeUpdate(
                    Y,
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
  function tr(t, l, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ee(t, e), a & 4 && rn(5, e);
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
        a & 64 && $o(e), a & 512 && dn(e, e.return);
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
            qs(t, l);
          } catch (i) {
            gt(e, e.return, i);
          }
        }
        break;
      case 27:
        l === null && a & 4 && Io(e);
      case 26:
      case 5:
        ee(t, e), l === null && a & 4 && Wo(e), a & 512 && dn(e, e.return);
        break;
      case 12:
        ee(t, e);
        break;
      case 31:
        ee(t, e), a & 4 && ar(t, e);
        break;
      case 13:
        ee(t, e), a & 4 && nr(t, e), a & 64 && (t = e.memoizedState, t !== null && (t = t.dehydrated, t !== null && (e = Bm.bind(
          null,
          e
        ), ey(t, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || te, !a) {
          l = l !== null && l.memoizedState !== null || Xt, n = te;
          var u = Xt;
          te = a, (Xt = l) && !u ? ae(
            t,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : ee(t, e), te = n, Xt = u;
        }
        break;
      case 30:
        break;
      default:
        ee(t, e);
    }
  }
  function lr(t) {
    var l = t.alternate;
    l !== null && (t.alternate = null, lr(l)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (l = t.stateNode, l !== null && ei(l)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Nt = null, nl = !1;
  function le(t, l, e) {
    for (e = e.child; e !== null; )
      er(t, l, e), e = e.sibling;
  }
  function er(t, l, e) {
    if (ol && typeof ol.onCommitFiberUnmount == "function")
      try {
        ol.onCommitFiberUnmount(Ha, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        Xt || Gl(e, l), le(
          t,
          l,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        Xt || Gl(e, l);
        var a = Nt, n = nl;
        Oe(e.type) && (Nt = e.stateNode, nl = !1), le(
          t,
          l,
          e
        ), Tn(e.stateNode), Nt = a, nl = n;
        break;
      case 5:
        Xt || Gl(e, l);
      case 6:
        if (a = Nt, n = nl, Nt = null, le(
          t,
          l,
          e
        ), Nt = a, nl = n, Nt !== null)
          if (nl)
            try {
              (Nt.nodeType === 9 ? Nt.body : Nt.nodeName === "HTML" ? Nt.ownerDocument.body : Nt).removeChild(e.stateNode);
            } catch (u) {
              gt(
                e,
                l,
                u
              );
            }
          else
            try {
              Nt.removeChild(e.stateNode);
            } catch (u) {
              gt(
                e,
                l,
                u
              );
            }
        break;
      case 18:
        Nt !== null && (nl ? (t = Nt, $r(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          e.stateNode
        ), Ra(t)) : $r(Nt, e.stateNode));
        break;
      case 4:
        a = Nt, n = nl, Nt = e.stateNode.containerInfo, nl = !0, le(
          t,
          l,
          e
        ), Nt = a, nl = n;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Se(2, e, l), Xt || Se(4, e, l), le(
          t,
          l,
          e
        );
        break;
      case 1:
        Xt || (Gl(e, l), a = e.stateNode, typeof a.componentWillUnmount == "function" && ko(
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
        Xt = (a = Xt) || e.memoizedState !== null, le(
          t,
          l,
          e
        ), Xt = a;
        break;
      default:
        le(
          t,
          l,
          e
        );
    }
  }
  function ar(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ra(t);
      } catch (e) {
        gt(l, l.return, e);
      }
    }
  }
  function nr(t, l) {
    if (l.memoizedState === null && (t = l.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ra(t);
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
        return l === null && (l = t.stateNode = new Po()), l;
      case 22:
        return t = t.stateNode, l = t._retryCache, l === null && (l = t._retryCache = new Po()), l;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Eu(t, l) {
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
              if (Oe(c.type)) {
                Nt = c.stateNode, nl = !1;
                break t;
              }
              break;
            case 5:
              Nt = c.stateNode, nl = !1;
              break t;
            case 3:
            case 4:
              Nt = c.stateNode.containerInfo, nl = !0;
              break t;
          }
          c = c.return;
        }
        if (Nt === null) throw Error(s(160));
        er(u, i, n), Nt = null, nl = !1, u = n.alternate, u !== null && (u.return = null), n.return = null;
      }
    if (l.subtreeFlags & 13886)
      for (l = l.child; l !== null; )
        ur(l, t), l = l.sibling;
  }
  var Rl = null;
  function ur(t, l) {
    var e = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ul(l, t), il(t), a & 4 && (Se(3, t, t.return), rn(3, t), Se(5, t, t.return));
        break;
      case 1:
        ul(l, t), il(t), a & 512 && (Xt || e === null || Gl(e, e.return)), a & 64 && te && (t = t.updateQueue, t !== null && (a = t.callbacks, a !== null && (e = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var n = Rl;
        if (ul(l, t), il(t), a & 512 && (Xt || e === null || Gl(e, e.return)), a & 4) {
          var u = e !== null ? e.memoizedState : null;
          if (a = t.memoizedState, e === null)
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  a = t.type, e = t.memoizedProps, n = n.ownerDocument || n;
                  l: switch (a) {
                    case "title":
                      u = n.getElementsByTagName("title")[0], (!u || u[Ya] || u[wt] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(
                        u,
                        n.querySelector("head > title")
                      )), Ft(u, a, e), u[wt] = t, Vt(u), a = u;
                      break t;
                    case "link":
                      var i = ud(
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
                      u = n.createElement(a), Ft(u, a, e), n.head.appendChild(u);
                      break;
                    case "meta":
                      if (i = ud(
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
                      u = n.createElement(a), Ft(u, a, e), n.head.appendChild(u);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  u[wt] = t, Vt(u), a = u;
                }
                t.stateNode = a;
              } else
                id(
                  n,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = nd(
                n,
                a,
                t.memoizedProps
              );
          else
            u !== a ? (u === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : u.count--, a === null ? id(
              n,
              t.type,
              t.stateNode
            ) : nd(
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
        ul(l, t), il(t), a & 512 && (Xt || e === null || Gl(e, e.return)), e !== null && a & 4 && _c(
          t,
          t.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (ul(l, t), il(t), a & 512 && (Xt || e === null || Gl(e, e.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            aa(n, "");
          } catch (Y) {
            gt(t, t.return, Y);
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
          } catch (Y) {
            gt(t, t.return, Y);
          }
        }
        break;
      case 3:
        if (Yu = null, n = Rl, Rl = Bu(l.containerInfo), ul(l, t), Rl = n, il(t), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            Ra(l.containerInfo);
          } catch (Y) {
            gt(t, t.return, Y);
          }
        Oc && (Oc = !1, ir(t));
        break;
      case 4:
        a = Rl, Rl = Bu(
          t.stateNode.containerInfo
        ), ul(l, t), il(t), Rl = a;
        break;
      case 12:
        ul(l, t), il(t);
        break;
      case 31:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Eu(t, a)));
        break;
      case 13:
        ul(l, t), il(t), t.child.flags & 8192 && t.memoizedState !== null != (e !== null && e.memoizedState !== null) && (Au = sl()), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Eu(t, a)));
        break;
      case 22:
        n = t.memoizedState !== null;
        var o = e !== null && e.memoizedState !== null, v = te, A = Xt;
        if (te = v || n, Xt = A || o, ul(l, t), Xt = A, te = v, il(t), a & 8192)
          t: for (l = t.stateNode, l._visibility = n ? l._visibility & -2 : l._visibility | 1, n && (e === null || o || te || Xt || ke(t)), e = null, l = t; ; ) {
            if (l.tag === 5 || l.tag === 26) {
              if (e === null) {
                o = e = l;
                try {
                  if (u = o.stateNode, n)
                    i = u.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = o.stateNode;
                    var M = o.memoizedProps.style, p = M != null && M.hasOwnProperty("display") ? M.display : null;
                    c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
                  }
                } catch (Y) {
                  gt(o, o.return, Y);
                }
              }
            } else if (l.tag === 6) {
              if (e === null) {
                o = l;
                try {
                  o.stateNode.nodeValue = n ? "" : o.memoizedProps;
                } catch (Y) {
                  gt(o, o.return, Y);
                }
              }
            } else if (l.tag === 18) {
              if (e === null) {
                o = l;
                try {
                  var T = o.stateNode;
                  n ? kr(T, !0) : kr(o.stateNode, !1);
                } catch (Y) {
                  gt(o, o.return, Y);
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
        a & 4 && (a = t.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, Eu(t, e))));
        break;
      case 19:
        ul(l, t), il(t), a & 4 && (a = t.updateQueue, a !== null && (t.updateQueue = null, Eu(t, a)));
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
          if (Fo(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var n = e.stateNode, u = Ac(t);
            Tu(t, u, n);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && (aa(i, ""), e.flags &= -33);
            var c = Ac(t);
            Tu(t, c, i);
            break;
          case 3:
          case 4:
            var o = e.stateNode.containerInfo, v = Ac(t);
            zc(
              t,
              v,
              o
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (A) {
        gt(t, t.return, A);
      }
      t.flags &= -3;
    }
    l & 4096 && (t.flags &= -4097);
  }
  function ir(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var l = t;
        ir(l), l.tag === 5 && l.flags & 1024 && l.stateNode.reset(), t = t.sibling;
      }
  }
  function ee(t, l) {
    if (l.subtreeFlags & 8772)
      for (l = l.child; l !== null; )
        tr(t, l.alternate, l), l = l.sibling;
  }
  function ke(t) {
    for (t = t.child; t !== null; ) {
      var l = t;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Se(4, l, l.return), ke(l);
          break;
        case 1:
          Gl(l, l.return);
          var e = l.stateNode;
          typeof e.componentWillUnmount == "function" && ko(
            l,
            l.return,
            e
          ), ke(l);
          break;
        case 27:
          Tn(l.stateNode);
        case 26:
        case 5:
          Gl(l, l.return), ke(l);
          break;
        case 22:
          l.memoizedState === null && ke(l);
          break;
        case 30:
          ke(l);
          break;
        default:
          ke(l);
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
          ), rn(4, u);
          break;
        case 1:
          if (ae(
            n,
            u,
            e
          ), a = u, n = a.stateNode, typeof n.componentDidMount == "function")
            try {
              n.componentDidMount();
            } catch (v) {
              gt(a, a.return, v);
            }
          if (a = u, n = a.updateQueue, n !== null) {
            var c = a.stateNode;
            try {
              var o = n.shared.hiddenCallbacks;
              if (o !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < o.length; n++)
                  Bs(o[n], c);
            } catch (v) {
              gt(a, a.return, v);
            }
          }
          e && i & 64 && $o(u), dn(u, u.return);
          break;
        case 27:
          Io(u);
        case 26:
        case 5:
          ae(
            n,
            u,
            e
          ), e && a === null && i & 4 && Wo(u), dn(u, u.return);
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
          ), e && i & 4 && ar(n, u);
          break;
        case 13:
          ae(
            n,
            u,
            e
          ), e && i & 4 && nr(n, u);
          break;
        case 22:
          u.memoizedState === null && ae(
            n,
            u,
            e
          ), dn(u, u.return);
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
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), t = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), t !== e && (t != null && t.refCount++, e != null && Fa(e));
  }
  function Dc(t, l) {
    t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Fa(t));
  }
  function Hl(t, l, e, a) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        cr(
          t,
          l,
          e,
          a
        ), l = l.sibling;
  }
  function cr(t, l, e, a) {
    var n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Hl(
          t,
          l,
          e,
          a
        ), n & 2048 && rn(9, l);
        break;
      case 1:
        Hl(
          t,
          l,
          e,
          a
        );
        break;
      case 3:
        Hl(
          t,
          l,
          e,
          a
        ), n & 2048 && (t = null, l.alternate !== null && (t = l.alternate.memoizedState.cache), l = l.memoizedState.cache, l !== t && (l.refCount++, t != null && Fa(t)));
        break;
      case 12:
        if (n & 2048) {
          Hl(
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
          Hl(
            t,
            l,
            e,
            a
          );
        break;
      case 31:
        Hl(
          t,
          l,
          e,
          a
        );
        break;
      case 13:
        Hl(
          t,
          l,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        u = l.stateNode, i = l.alternate, l.memoizedState !== null ? u._visibility & 2 ? Hl(
          t,
          l,
          e,
          a
        ) : hn(t, l) : u._visibility & 2 ? Hl(
          t,
          l,
          e,
          a
        ) : (u._visibility |= 2, _a(
          t,
          l,
          e,
          a,
          (l.subtreeFlags & 10256) !== 0 || !1
        )), n & 2048 && Mc(i, l);
        break;
      case 24:
        Hl(
          t,
          l,
          e,
          a
        ), n & 2048 && Dc(l.alternate, l);
        break;
      default:
        Hl(
          t,
          l,
          e,
          a
        );
    }
  }
  function _a(t, l, e, a, n) {
    for (n = n && ((l.subtreeFlags & 10256) !== 0 || !1), l = l.child; l !== null; ) {
      var u = t, i = l, c = e, o = a, v = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          _a(
            u,
            i,
            c,
            o,
            n
          ), rn(8, i);
          break;
        case 23:
          break;
        case 22:
          var A = i.stateNode;
          i.memoizedState !== null ? A._visibility & 2 ? _a(
            u,
            i,
            c,
            o,
            n
          ) : hn(
            u,
            i
          ) : (A._visibility |= 2, _a(
            u,
            i,
            c,
            o,
            n
          )), n && v & 2048 && Mc(
            i.alternate,
            i
          );
          break;
        case 24:
          _a(
            u,
            i,
            c,
            o,
            n
          ), n && v & 2048 && Dc(i.alternate, i);
          break;
        default:
          _a(
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
  function hn(t, l) {
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) {
        var e = t, a = l, n = a.flags;
        switch (a.tag) {
          case 22:
            hn(e, a), n & 2048 && Mc(
              a.alternate,
              a
            );
            break;
          case 24:
            hn(e, a), n & 2048 && Dc(a.alternate, a);
            break;
          default:
            hn(e, a);
        }
        l = l.sibling;
      }
  }
  var mn = 8192;
  function Aa(t, l, e) {
    if (t.subtreeFlags & mn)
      for (t = t.child; t !== null; )
        fr(
          t,
          l,
          e
        ), t = t.sibling;
  }
  function fr(t, l, e) {
    switch (t.tag) {
      case 26:
        Aa(
          t,
          l,
          e
        ), t.flags & mn && t.memoizedState !== null && my(
          e,
          Rl,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Aa(
          t,
          l,
          e
        );
        break;
      case 3:
      case 4:
        var a = Rl;
        Rl = Bu(t.stateNode.containerInfo), Aa(
          t,
          l,
          e
        ), Rl = a;
        break;
      case 22:
        t.memoizedState === null && (a = t.alternate, a !== null && a.memoizedState !== null ? (a = mn, mn = 16777216, Aa(
          t,
          l,
          e
        ), mn = a) : Aa(
          t,
          l,
          e
        ));
        break;
      default:
        Aa(
          t,
          l,
          e
        );
    }
  }
  function sr(t) {
    var l = t.alternate;
    if (l !== null && (t = l.child, t !== null)) {
      l.child = null;
      do
        l = t.sibling, t.sibling = null, t = l;
      while (t !== null);
    }
  }
  function yn(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Kt = a, rr(
            a,
            t
          );
        }
      sr(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        or(t), t = t.sibling;
  }
  function or(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        yn(t), t.flags & 2048 && Se(9, t, t.return);
        break;
      case 3:
        yn(t);
        break;
      case 12:
        yn(t);
        break;
      case 22:
        var l = t.stateNode;
        t.memoizedState !== null && l._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (l._visibility &= -3, _u(t)) : yn(t);
        break;
      default:
        yn(t);
    }
  }
  function _u(t) {
    var l = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (l !== null)
        for (var e = 0; e < l.length; e++) {
          var a = l[e];
          Kt = a, rr(
            a,
            t
          );
        }
      sr(t);
    }
    for (t = t.child; t !== null; ) {
      switch (l = t, l.tag) {
        case 0:
        case 11:
        case 15:
          Se(8, l, l.return), _u(l);
          break;
        case 22:
          e = l.stateNode, e._visibility & 2 && (e._visibility &= -3, _u(l));
          break;
        default:
          _u(l);
      }
      t = t.sibling;
    }
  }
  function rr(t, l) {
    for (; Kt !== null; ) {
      var e = Kt;
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
          Fa(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Kt = a;
      else
        t: for (e = t; Kt !== null; ) {
          a = Kt;
          var n = a.sibling, u = a.return;
          if (lr(a), a === e) {
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
      var l = kt(qt), e = l.data.get(t);
      return e === void 0 && (e = t(), l.data.set(t, e)), e;
    },
    cacheSignal: function() {
      return kt(qt).controller.signal;
    }
  }, xm = typeof WeakMap == "function" ? WeakMap : Map, rt = 0, _t = null, P = null, et = 0, vt = 0, vl = null, be = !1, za = !1, Nc = !1, ne = 0, jt = 0, Te = 0, We = 0, xc = 0, gl = 0, Oa = 0, vn = null, cl = null, jc = !1, Au = 0, dr = 0, zu = 1 / 0, Ou = null, Ee = null, Zt = 0, _e = null, Ma = null, ue = 0, Uc = 0, Cc = null, hr = null, gn = 0, Rc = null;
  function pl() {
    return (rt & 2) !== 0 && et !== 0 ? et & -et : _.T !== null ? Xc() : Df();
  }
  function mr() {
    if (gl === 0)
      if ((et & 536870912) === 0 || nt) {
        var t = Rn;
        Rn <<= 1, (Rn & 3932160) === 0 && (Rn = 262144), gl = t;
      } else gl = 536870912;
    return t = ml.current, t !== null && (t.flags |= 32), gl;
  }
  function fl(t, l, e) {
    (t === _t && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null) && (Da(t, 0), Ae(
      t,
      et,
      gl,
      !1
    )), qa(t, e), ((rt & 2) === 0 || t !== _t) && (t === _t && ((rt & 2) === 0 && (We |= e), jt === 4 && Ae(
      t,
      et,
      gl,
      !1
    )), Xl(t));
  }
  function yr(t, l, e) {
    if ((rt & 6) !== 0) throw Error(s(327));
    var a = !e && (l & 127) === 0 && (l & t.expiredLanes) === 0 || Ba(t, l), n = a ? Cm(t, l) : Bc(t, l, !0), u = a;
    do {
      if (n === 0) {
        za && !a && Ae(t, l, 0, !1);
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
              n = vn;
              var o = c.current.memoizedState.isDehydrated;
              if (o && (Da(c, i).flags |= 256), i = Bc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Nc && !o) {
                  c.errorRecoveryDisabledLanes |= u, We |= u, n = 4;
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
          Da(t, 0), Ae(t, l, 0, !0);
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
                gl,
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
          if ((l & 62914560) === l && (n = Au + 300 - sl(), 10 < n)) {
            if (Ae(
              a,
              l,
              gl,
              !be
            ), Bn(a, 0, !0) !== 0) break t;
            ue = l, a.timeoutHandle = Jr(
              vr.bind(
                null,
                a,
                e,
                cl,
                Ou,
                jc,
                l,
                gl,
                We,
                Oa,
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
          vr(
            a,
            e,
            cl,
            Ou,
            jc,
            l,
            gl,
            We,
            Oa,
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
    Xl(t);
  }
  function vr(t, l, e, a, n, u, i, c, o, v, A, M, p, T) {
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
      }, fr(
        l,
        u,
        M
      );
      var Y = (u & 62914560) === u ? Au - sl() : (u & 4194048) === u ? dr - sl() : 0;
      if (Y = yy(
        M,
        Y
      ), Y !== null) {
        ue = u, t.cancelPendingCommit = Y(
          Ar.bind(
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
            A,
            M,
            null,
            p,
            T
          )
        ), Ae(t, u, i, !v);
        return;
      }
    }
    Ar(
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
    l &= ~xc, l &= ~We, t.suspendedLanes |= l, t.pingedLanes &= ~l, a && (t.warmLanes |= l), a = t.expirationTimes;
    for (var n = l; 0 < n; ) {
      var u = 31 - rl(n), i = 1 << u;
      a[u] = -1, n &= ~i;
    }
    e !== 0 && zf(t, e, l);
  }
  function Mu() {
    return (rt & 6) === 0 ? (pn(0), !1) : !0;
  }
  function Hc() {
    if (P !== null) {
      if (vt === 0)
        var t = P.return;
      else
        t = P, $l = Le = null, Fi(t), pa = null, Pa = 0, t = P;
      for (; t !== null; )
        wo(t.alternate, t), t = t.return;
      P = null;
    }
  }
  function Da(t, l) {
    var e = t.timeoutHandle;
    e !== -1 && (t.timeoutHandle = -1, Fm(e)), e = t.cancelPendingCommit, e !== null && (t.cancelPendingCommit = null, e()), ue = 0, Hc(), _t = t, P = e = Jl(t.current, null), et = l, vt = 0, vl = null, be = !1, za = Ba(t, l), Nc = !1, Oa = gl = xc = We = Te = jt = 0, cl = vn = null, jc = !1, (l & 8) !== 0 && (l |= l & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= l; 0 < a; ) {
        var n = 31 - rl(a), u = 1 << n;
        l |= t[n], a &= ~u;
      }
    return ne = l, $n(), e;
  }
  function gr(t, l) {
    k = null, _.H = fn, l === ga || l === eu ? (l = Us(), vt = 3) : l === Gi ? (l = Us(), vt = 4) : vt = l === hc ? 8 : l !== null && typeof l == "object" && typeof l.then == "function" ? 6 : 1, vl = l, P === null && (jt = 1, vu(
      t,
      Al(l, t.current)
    ));
  }
  function pr() {
    var t = ml.current;
    return t === null ? !0 : (et & 4194048) === et ? Dl === null : (et & 62914560) === et || (et & 536870912) !== 0 ? t === Dl : !1;
  }
  function Sr() {
    var t = _.H;
    return _.H = fn, t === null ? fn : t;
  }
  function br() {
    var t = _.A;
    return _.A = Nm, t;
  }
  function Du() {
    jt = 4, be || (et & 4194048) !== et && ml.current !== null || (za = !0), (Te & 134217727) === 0 && (We & 134217727) === 0 || _t === null || Ae(
      _t,
      et,
      gl,
      !1
    );
  }
  function Bc(t, l, e) {
    var a = rt;
    rt |= 2;
    var n = Sr(), u = br();
    (_t !== t || et !== l) && (Ou = null, Da(t, l)), l = !1;
    var i = jt;
    t: do
      try {
        if (vt !== 0 && P !== null) {
          var c = P, o = vl;
          switch (vt) {
            case 8:
              Hc(), i = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              ml.current === null && (l = !0);
              var v = vt;
              if (vt = 0, vl = null, Na(t, c, o, v), e && za) {
                i = 0;
                break t;
              }
              break;
            default:
              v = vt, vt = 0, vl = null, Na(t, c, o, v);
          }
        }
        Um(), i = jt;
        break;
      } catch (A) {
        gr(t, A);
      }
    while (!0);
    return l && t.shellSuspendCounter++, $l = Le = null, rt = a, _.H = n, _.A = u, P === null && (_t = null, et = 0, $n()), i;
  }
  function Um() {
    for (; P !== null; ) Tr(P);
  }
  function Cm(t, l) {
    var e = rt;
    rt |= 2;
    var a = Sr(), n = br();
    _t !== t || et !== l ? (Ou = null, zu = sl() + 500, Da(t, l)) : za = Ba(
      t,
      l
    );
    t: do
      try {
        if (vt !== 0 && P !== null) {
          l = P;
          var u = vl;
          l: switch (vt) {
            case 1:
              vt = 0, vl = null, Na(t, l, u, 1);
              break;
            case 2:
            case 9:
              if (xs(u)) {
                vt = 0, vl = null, Er(l);
                break;
              }
              l = function() {
                vt !== 2 && vt !== 9 || _t !== t || (vt = 7), Xl(t);
              }, u.then(l, l);
              break t;
            case 3:
              vt = 7;
              break t;
            case 4:
              vt = 5;
              break t;
            case 7:
              xs(u) ? (vt = 0, vl = null, Er(l)) : (vt = 0, vl = null, Na(t, l, u, 7));
              break;
            case 5:
              var i = null;
              switch (P.tag) {
                case 26:
                  i = P.memoizedState;
                case 5:
                case 27:
                  var c = P;
                  if (i ? cd(i) : c.stateNode.complete) {
                    vt = 0, vl = null;
                    var o = c.sibling;
                    if (o !== null) P = o;
                    else {
                      var v = c.return;
                      v !== null ? (P = v, Nu(v)) : P = null;
                    }
                    break l;
                  }
              }
              vt = 0, vl = null, Na(t, l, u, 5);
              break;
            case 6:
              vt = 0, vl = null, Na(t, l, u, 6);
              break;
            case 8:
              Hc(), jt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        Rm();
        break;
      } catch (A) {
        gr(t, A);
      }
    while (!0);
    return $l = Le = null, _.H = a, _.A = n, rt = e, P !== null ? 0 : (_t = null, et = 0, $n(), jt);
  }
  function Rm() {
    for (; P !== null && !ah(); )
      Tr(P);
  }
  function Tr(t) {
    var l = Ko(t.alternate, t, ne);
    t.memoizedProps = t.pendingProps, l === null ? Nu(t) : P = l;
  }
  function Er(t) {
    var l = t, e = l.alternate;
    switch (l.tag) {
      case 15:
      case 0:
        l = Go(
          e,
          l,
          l.pendingProps,
          l.type,
          void 0,
          et
        );
        break;
      case 11:
        l = Go(
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
        wo(e, l), l = P = Ss(l, ne), l = Ko(e, l, ne);
    }
    t.memoizedProps = t.pendingProps, l === null ? Nu(t) : P = l;
  }
  function Na(t, l, e, a) {
    $l = Le = null, Fi(l), pa = null, Pa = 0;
    var n = l.return;
    try {
      if (Em(
        t,
        n,
        l,
        e,
        et
      )) {
        jt = 1, vu(
          t,
          Al(e, t.current)
        ), P = null;
        return;
      }
    } catch (u) {
      if (n !== null) throw P = n, u;
      jt = 1, vu(
        t,
        Al(e, t.current)
      ), P = null;
      return;
    }
    l.flags & 32768 ? (nt || a === 1 ? t = !0 : za || (et & 536870912) !== 0 ? t = !1 : (be = t = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = ml.current, a !== null && a.tag === 13 && (a.flags |= 16384))), _r(l, t)) : Nu(l);
  }
  function Nu(t) {
    var l = t;
    do {
      if ((l.flags & 32768) !== 0) {
        _r(
          l,
          be
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
    jt === 0 && (jt = 5);
  }
  function _r(t, l) {
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
    jt = 6, P = null;
  }
  function Ar(t, l, e, a, n, u, i, c, o) {
    t.cancelPendingCommit = null;
    do
      xu();
    while (Zt !== 0);
    if ((rt & 6) !== 0) throw Error(s(327));
    if (l !== null) {
      if (l === t.current) throw Error(s(177));
      if (u = l.lanes | l.childLanes, u |= Ai, hh(
        t,
        e,
        u,
        i,
        c,
        o
      ), t === _t && (P = _t = null, et = 0), Ma = l, _e = t, ue = e, Uc = u, Cc = n, hr = a, (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Ym(Un, function() {
        return Nr(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), a = (l.flags & 13878) !== 0, (l.subtreeFlags & 13878) !== 0 || a) {
        a = _.T, _.T = null, n = H.p, H.p = 2, i = rt, rt |= 4;
        try {
          Mm(t, l, e);
        } finally {
          rt = i, H.p = n, _.T = a;
        }
      }
      Zt = 1, zr(), Or(), Mr();
    }
  }
  function zr() {
    if (Zt === 1) {
      Zt = 0;
      var t = _e, l = Ma, e = (l.flags & 13878) !== 0;
      if ((l.subtreeFlags & 13878) !== 0 || e) {
        e = _.T, _.T = null;
        var a = H.p;
        H.p = 2;
        var n = rt;
        rt |= 4;
        try {
          ur(l, t);
          var u = $c, i = os(t.containerInfo), c = u.focusedElem, o = u.selectionRange;
          if (i !== c && c && c.ownerDocument && ss(
            c.ownerDocument.documentElement,
            c
          )) {
            if (o !== null && Si(c)) {
              var v = o.start, A = o.end;
              if (A === void 0 && (A = v), "selectionStart" in c)
                c.selectionStart = v, c.selectionEnd = Math.min(
                  A,
                  c.value.length
                );
              else {
                var M = c.ownerDocument || document, p = M && M.defaultView || window;
                if (p.getSelection) {
                  var T = p.getSelection(), Y = c.textContent.length, K = Math.min(o.start, Y), Et = o.end === void 0 ? K : Math.min(o.end, Y);
                  !T.extend && K > Et && (i = Et, Et = K, K = i);
                  var h = fs(
                    c,
                    K
                  ), r = fs(
                    c,
                    Et
                  );
                  if (h && r && (T.rangeCount !== 1 || T.anchorNode !== h.node || T.anchorOffset !== h.offset || T.focusNode !== r.node || T.focusOffset !== r.offset)) {
                    var y = M.createRange();
                    y.setStart(h.node, h.offset), T.removeAllRanges(), K > Et ? (T.addRange(y), T.extend(r.node, r.offset)) : (y.setEnd(r.node, r.offset), T.addRange(y));
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
          Qu = !!wc, $c = wc = null;
        } finally {
          rt = n, H.p = a, _.T = e;
        }
      }
      t.current = l, Zt = 2;
    }
  }
  function Or() {
    if (Zt === 2) {
      Zt = 0;
      var t = _e, l = Ma, e = (l.flags & 8772) !== 0;
      if ((l.subtreeFlags & 8772) !== 0 || e) {
        e = _.T, _.T = null;
        var a = H.p;
        H.p = 2;
        var n = rt;
        rt |= 4;
        try {
          tr(t, l.alternate, l);
        } finally {
          rt = n, H.p = a, _.T = e;
        }
      }
      Zt = 3;
    }
  }
  function Mr() {
    if (Zt === 4 || Zt === 3) {
      Zt = 0, nh();
      var t = _e, l = Ma, e = ue, a = hr;
      (l.subtreeFlags & 10256) !== 0 || (l.flags & 10256) !== 0 ? Zt = 5 : (Zt = 0, Ma = _e = null, Dr(t, t.pendingLanes));
      var n = t.pendingLanes;
      if (n === 0 && (Ee = null), ti(e), l = l.stateNode, ol && typeof ol.onCommitFiberRoot == "function")
        try {
          ol.onCommitFiberRoot(
            Ha,
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
      (ue & 3) !== 0 && xu(), Xl(t), n = t.pendingLanes, (e & 261930) !== 0 && (n & 42) !== 0 ? t === Rc ? gn++ : (gn = 0, Rc = t) : gn = 0, pn(0);
    }
  }
  function Dr(t, l) {
    (t.pooledCacheLanes &= l) === 0 && (l = t.pooledCache, l != null && (t.pooledCache = null, Fa(l)));
  }
  function xu() {
    return zr(), Or(), Mr(), Nr();
  }
  function Nr() {
    if (Zt !== 5) return !1;
    var t = _e, l = Uc;
    Uc = 0;
    var e = ti(ue), a = _.T, n = H.p;
    try {
      H.p = 32 > e ? 32 : e, _.T = null, e = Cc, Cc = null;
      var u = _e, i = ue;
      if (Zt = 0, Ma = _e = null, ue = 0, (rt & 6) !== 0) throw Error(s(331));
      var c = rt;
      if (rt |= 4, or(u.current), cr(
        u,
        u.current,
        i,
        e
      ), rt = c, pn(0, !1), ol && typeof ol.onPostCommitFiberRoot == "function")
        try {
          ol.onPostCommitFiberRoot(Ha, u);
        } catch {
        }
      return !0;
    } finally {
      H.p = n, _.T = a, Dr(t, l);
    }
  }
  function xr(t, l, e) {
    l = Al(e, l), l = dc(t.stateNode, l, 2), t = ve(t, l, 2), t !== null && (qa(t, 2), Xl(t));
  }
  function gt(t, l, e) {
    if (t.tag === 3)
      xr(t, t, e);
    else
      for (; l !== null; ) {
        if (l.tag === 3) {
          xr(
            l,
            t,
            e
          );
          break;
        } else if (l.tag === 1) {
          var a = l.stateNode;
          if (typeof l.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Ee === null || !Ee.has(a))) {
            t = Al(e, t), e = jo(2), a = ve(l, e, 2), a !== null && (Uo(
              e,
              a,
              l,
              t
            ), qa(a, 2), Xl(a));
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
    a !== null && a.delete(l), t.pingedLanes |= t.suspendedLanes & e, t.warmLanes &= ~e, _t === t && (et & e) === e && (jt === 4 || jt === 3 && (et & 62914560) === et && 300 > sl() - Au ? (rt & 2) === 0 && Da(t, 0) : xc |= e, Oa === et && (Oa = 0)), Xl(t);
  }
  function jr(t, l) {
    l === 0 && (l = Af()), t = Ye(t, l), t !== null && (qa(t, l), Xl(t));
  }
  function Bm(t) {
    var l = t.memoizedState, e = 0;
    l !== null && (e = l.retryLane), jr(t, e);
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
    a !== null && a.delete(l), jr(t, e);
  }
  function Ym(t, l) {
    return Wu(t, l);
  }
  var ju = null, xa = null, Yc = !1, Uu = !1, Gc = !1, ze = 0;
  function Xl(t) {
    t !== xa && t.next === null && (xa === null ? ju = xa = t : xa = xa.next = t), Uu = !0, Yc || (Yc = !0, Xm());
  }
  function pn(t, l) {
    if (!Gc && Uu) {
      Gc = !0;
      do
        for (var e = !1, a = ju; a !== null; ) {
          if (t !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              u = (1 << 31 - rl(42 | t) + 1) - 1, u &= n & ~(i & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (e = !0, Hr(a, u));
          } else
            u = et, u = Bn(
              a,
              a === _t ? u : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (u & 3) === 0 || Ba(a, u) || (e = !0, Hr(a, u));
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
    Uu = Yc = !1;
    var t = 0;
    ze !== 0 && Wm() && (t = ze);
    for (var l = sl(), e = null, a = ju; a !== null; ) {
      var n = a.next, u = Cr(a, l);
      u === 0 ? (a.next = null, e === null ? ju = n : e.next = n, n === null && (xa = e)) : (e = a, (t !== 0 || (u & 3) !== 0) && (Uu = !0)), a = n;
    }
    Zt !== 0 && Zt !== 5 || pn(t), ze !== 0 && (ze = 0);
  }
  function Cr(t, l) {
    for (var e = t.suspendedLanes, a = t.pingedLanes, n = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var i = 31 - rl(u), c = 1 << i, o = n[i];
      o === -1 ? ((c & e) === 0 || (c & a) !== 0) && (n[i] = dh(c, l)) : o <= l && (t.expiredLanes |= c), u &= ~c;
    }
    if (l = _t, e = et, e = Bn(
      t,
      t === l ? e : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a = t.callbackNode, e === 0 || t === l && (vt === 2 || vt === 9) || t.cancelPendingCommit !== null)
      return a !== null && a !== null && Fu(a), t.callbackNode = null, t.callbackPriority = 0;
    if ((e & 3) === 0 || Ba(t, e)) {
      if (l = e & -e, l === t.callbackPriority) return l;
      switch (a !== null && Fu(a), ti(e)) {
        case 2:
        case 8:
          e = Ef;
          break;
        case 32:
          e = Un;
          break;
        case 268435456:
          e = _f;
          break;
        default:
          e = Un;
      }
      return a = Rr.bind(null, t), e = Wu(e, a), t.callbackPriority = l, t.callbackNode = e, l;
    }
    return a !== null && a !== null && Fu(a), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Rr(t, l) {
    if (Zt !== 0 && Zt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var e = t.callbackNode;
    if (xu() && t.callbackNode !== e)
      return null;
    var a = et;
    return a = Bn(
      t,
      t === _t ? a : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), a === 0 ? null : (yr(t, a, l), Cr(t, sl()), t.callbackNode != null && t.callbackNode === e ? Rr.bind(null, t) : null);
  }
  function Hr(t, l) {
    if (xu()) return null;
    yr(t, l, !0);
  }
  function Xm() {
    Im(function() {
      (rt & 6) !== 0 ? Wu(
        Tf,
        Gm
      ) : Ur();
    });
  }
  function Xc() {
    if (ze === 0) {
      var t = ya;
      t === 0 && (t = Cn, Cn <<= 1, (Cn & 261888) === 0 && (Cn = 256)), ze = t;
    }
    return ze;
  }
  function Br(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Xn("" + t);
  }
  function qr(t, l) {
    var e = l.ownerDocument.createElement("input");
    return e.name = l.name, e.value = l.value, t.id && e.setAttribute("form", t.id), l.parentNode.insertBefore(e, l), t = new FormData(t), e.parentNode.removeChild(e), t;
  }
  function Lm(t, l, e, a, n) {
    if (l === "submit" && e && e.stateNode === n) {
      var u = Br(
        (n[el] || null).action
      ), i = a.submitter;
      i && (l = (l = i[el] || null) ? Br(l.formAction) : i.getAttribute("formAction"), l !== null && (u = l, i = null));
      var c = new Vn(
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
                  var o = i ? qr(n, i) : new FormData(n);
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
                typeof u == "function" && (c.preventDefault(), o = i ? qr(n, i) : new FormData(n), ic(
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
    Cl(
      Qm,
      "on" + Zm
    );
  }
  Cl(hs, "onAnimationEnd"), Cl(ms, "onAnimationIteration"), Cl(ys, "onAnimationStart"), Cl("dblclick", "onDoubleClick"), Cl("focusin", "onFocus"), Cl("focusout", "onBlur"), Cl(um, "onTransitionRun"), Cl(im, "onTransitionStart"), Cl(cm, "onTransitionCancel"), Cl(vs, "onTransitionEnd"), la("onMouseEnter", ["mouseout", "mouseover"]), la("onMouseLeave", ["mouseout", "mouseover"]), la("onPointerEnter", ["pointerout", "pointerover"]), la("onPointerLeave", ["pointerout", "pointerover"]), Re(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Re(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Re("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Re(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Re(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Re(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Sn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Vm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Sn)
  );
  function Yr(t, l) {
    l = (l & 4) !== 0;
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = a.event;
      a = a.listeners;
      t: {
        var u = void 0;
        if (l)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], o = c.instance, v = c.currentTarget;
            if (c = c.listener, o !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = v;
            try {
              u(n);
            } catch (A) {
              wn(A);
            }
            n.currentTarget = null, u = o;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], o = c.instance, v = c.currentTarget, c = c.listener, o !== u && n.isPropagationStopped())
              break t;
            u = c, n.currentTarget = v;
            try {
              u(n);
            } catch (A) {
              wn(A);
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
    e.has(a) || (Gr(l, t, 2, !1), e.add(a));
  }
  function Zc(t, l, e) {
    var a = 0;
    l && (a |= 4), Gr(
      e,
      t,
      a,
      l
    );
  }
  var Cu = "_reactListening" + Math.random().toString(36).slice(2);
  function Vc(t) {
    if (!t[Cu]) {
      t[Cu] = !0, jf.forEach(function(e) {
        e !== "selectionchange" && (Vm.has(e) || Zc(e, !1, t), Zc(e, !0, t));
      });
      var l = t.nodeType === 9 ? t : t.ownerDocument;
      l === null || l[Cu] || (l[Cu] = !0, Zc("selectionchange", !1, l));
    }
  }
  function Gr(t, l, e, a) {
    switch (md(l)) {
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
            if (i = Ie(c), i === null) return;
            if (o = i.tag, o === 5 || o === 6 || o === 26 || o === 27) {
              a = u = i;
              continue t;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Zf(function() {
      var v = u, A = fi(e), M = [];
      t: {
        var p = gs.get(t);
        if (p !== void 0) {
          var T = Vn, Y = t;
          switch (t) {
            case "keypress":
              if (Qn(e) === 0) break t;
            case "keydown":
            case "keyup":
              T = qh;
              break;
            case "focusin":
              Y = "focus", T = mi;
              break;
            case "focusout":
              Y = "blur", T = mi;
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
              T = Jf;
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
            case hs:
            case ms:
            case ys:
              T = Dh;
              break;
            case vs:
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
          var K = (l & 4) !== 0, Et = !K && (t === "scroll" || t === "scrollend"), h = K ? p !== null ? p + "Capture" : null : p;
          K = [];
          for (var r = v, y; r !== null; ) {
            var O = r;
            if (y = O.stateNode, O = O.tag, O !== 5 && O !== 26 && O !== 27 || y === null || h === null || (O = Xa(r, h), O != null && K.push(
              bn(r, O, y)
            )), Et) break;
            r = r.return;
          }
          0 < K.length && (p = new T(
            p,
            Y,
            null,
            e,
            A
          ), M.push({ event: p, listeners: K }));
        }
      }
      if ((l & 7) === 0) {
        t: {
          if (p = t === "mouseover" || t === "pointerover", T = t === "mouseout" || t === "pointerout", p && e !== ci && (Y = e.relatedTarget || e.fromElement) && (Ie(Y) || Y[Fe]))
            break t;
          if ((T || p) && (p = A.window === A ? A : (p = A.ownerDocument) ? p.defaultView || p.parentWindow : window, T ? (Y = e.relatedTarget || e.toElement, T = v, Y = Y ? Ie(Y) : null, Y !== null && (Et = x(Y), K = Y.tag, Y !== Et || K !== 5 && K !== 27 && K !== 6) && (Y = null)) : (T = null, Y = v), T !== Y)) {
            if (K = Jf, O = "onMouseLeave", h = "onMouseEnter", r = "mouse", (t === "pointerout" || t === "pointerover") && (K = $f, O = "onPointerLeave", h = "onPointerEnter", r = "pointer"), Et = T == null ? p : Ga(T), y = Y == null ? p : Ga(Y), p = new K(
              O,
              r + "leave",
              T,
              e,
              A
            ), p.target = Et, p.relatedTarget = y, O = null, Ie(A) === v && (K = new K(
              h,
              r + "enter",
              Y,
              e,
              A
            ), K.target = y, K.relatedTarget = Et, O = K), Et = O, T && Y)
              l: {
                for (K = Km, h = T, r = Y, y = 0, O = h; O; O = K(O))
                  y++;
                O = 0;
                for (var Q = r; Q; Q = K(Q))
                  O++;
                for (; 0 < y - O; )
                  h = K(h), y--;
                for (; 0 < O - y; )
                  r = K(r), O--;
                for (; y--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    K = h;
                    break l;
                  }
                  h = K(h), r = K(r);
                }
                K = null;
              }
            else K = null;
            T !== null && Xr(
              M,
              p,
              T,
              K,
              !1
            ), Y !== null && Et !== null && Xr(
              M,
              Et,
              Y,
              K,
              !0
            );
          }
        }
        t: {
          if (p = v ? Ga(v) : window, T = p.nodeName && p.nodeName.toLowerCase(), T === "select" || T === "input" && p.type === "file")
            var ft = es;
          else if (ts(p))
            if (as)
              ft = em;
            else {
              ft = tm;
              var X = Ph;
            }
          else
            T = p.nodeName, !T || T.toLowerCase() !== "input" || p.type !== "checkbox" && p.type !== "radio" ? v && ii(v.elementType) && (ft = es) : ft = lm;
          if (ft && (ft = ft(t, v))) {
            ls(
              M,
              ft,
              e,
              A
            );
            break t;
          }
          X && X(t, p, v), t === "focusout" && v && p.type === "number" && v.memoizedProps.value != null && ui(p, "number", p.value);
        }
        switch (X = v ? Ga(v) : window, t) {
          case "focusin":
            (ts(X) || X.contentEditable === "true") && (ca = X, bi = v, $a = null);
            break;
          case "focusout":
            $a = bi = ca = null;
            break;
          case "mousedown":
            Ti = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ti = !1, rs(M, e, A);
            break;
          case "selectionchange":
            if (nm) break;
          case "keydown":
          case "keyup":
            rs(M, e, A);
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
          ia ? If(t, e) && (at = "onCompositionEnd") : t === "keydown" && e.keyCode === 229 && (at = "onCompositionStart");
        at && (kf && e.locale !== "ko" && (ia || at !== "onCompositionStart" ? at === "onCompositionEnd" && ia && (F = Vf()) : (se = A, ri = "value" in se ? se.value : se.textContent, ia = !0)), X = Ru(v, at), 0 < X.length && (at = new wf(
          at,
          t,
          null,
          e,
          A
        ), M.push({ event: at, listeners: X }), F ? at.data = F : (F = Pf(e), F !== null && (at.data = F)))), (F = $h ? kh(t, e) : Wh(t, e)) && (at = Ru(v, "onBeforeInput"), 0 < at.length && (X = new wf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          A
        ), M.push({
          event: X,
          listeners: at
        }), X.data = F)), Lm(
          M,
          t,
          v,
          e,
          A
        );
      }
      Yr(M, l);
    });
  }
  function bn(t, l, e) {
    return {
      instance: t,
      listener: l,
      currentTarget: e
    };
  }
  function Ru(t, l) {
    for (var e = l + "Capture", a = []; t !== null; ) {
      var n = t, u = n.stateNode;
      if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Xa(t, e), n != null && a.unshift(
        bn(t, n, u)
      ), n = Xa(t, l), n != null && a.push(
        bn(t, n, u)
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
  function Xr(t, l, e, a, n) {
    for (var u = l._reactName, i = []; e !== null && e !== a; ) {
      var c = e, o = c.alternate, v = c.stateNode;
      if (c = c.tag, o !== null && o === a) break;
      c !== 5 && c !== 26 && c !== 27 || v === null || (o = v, n ? (v = Xa(e, u), v != null && i.unshift(
        bn(e, v, o)
      )) : n || (v = Xa(e, u), v != null && i.push(
        bn(e, v, o)
      ))), e = e.return;
    }
    i.length !== 0 && t.push({ event: l, listeners: i });
  }
  var Jm = /\r\n?/g, wm = /\u0000|\uFFFD/g;
  function Lr(t) {
    return (typeof t == "string" ? t : "" + t).replace(Jm, `
`).replace(wm, "");
  }
  function Qr(t, l) {
    return l = Lr(l), Lr(t) === l;
  }
  function Tt(t, l, e, a, n, u) {
    switch (e) {
      case "children":
        typeof a == "string" ? l === "body" || l === "textarea" && a === "" || aa(t, a) : (typeof a == "number" || typeof a == "bigint") && l !== "body" && aa(t, "" + a);
        break;
      case "className":
        Yn(t, "class", a);
        break;
      case "tabIndex":
        Yn(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Yn(t, e, a);
        break;
      case "style":
        Lf(t, a, u);
        break;
      case "data":
        if (l !== "object") {
          Yn(t, "data", a);
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
        a = Xn("" + a), t.setAttribute(e, a);
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
          typeof u == "function" && (e === "formAction" ? (l !== "input" && Tt(t, l, "name", n.name, n, null), Tt(
            t,
            l,
            "formEncType",
            n.formEncType,
            n,
            null
          ), Tt(
            t,
            l,
            "formMethod",
            n.formMethod,
            n,
            null
          ), Tt(
            t,
            l,
            "formTarget",
            n.formTarget,
            n,
            null
          )) : (Tt(t, l, "encType", n.encType, n, null), Tt(t, l, "method", n.method, n, null), Tt(t, l, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(e);
          break;
        }
        a = Xn("" + a), t.setAttribute(e, a);
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
        e = Xn("" + a), t.setAttributeNS(
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
        tt("beforetoggle", t), tt("toggle", t), qn(t, "popover", a);
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
        qn(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = Th.get(e) || e, qn(t, e, a));
    }
  }
  function Jc(t, l, e, a, n, u) {
    switch (e) {
      case "style":
        Lf(t, a, u);
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
        typeof a == "string" ? aa(t, a) : (typeof a == "number" || typeof a == "bigint") && aa(t, "" + a);
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
            e in t ? t[e] = a : a === !0 ? t.setAttribute(e, "") : qn(t, e, a);
          }
    }
  }
  function Ft(t, l, e) {
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
                  Tt(t, l, u, i, e, null);
              }
          }
        n && Tt(t, l, "srcSet", e.srcSet, e, null), a && Tt(t, l, "src", e.src, e, null);
        return;
      case "input":
        tt("invalid", t);
        var c = u = i = n = null, o = null, v = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var A = e[a];
            if (A != null)
              switch (a) {
                case "name":
                  n = A;
                  break;
                case "type":
                  i = A;
                  break;
                case "checked":
                  o = A;
                  break;
                case "defaultChecked":
                  v = A;
                  break;
                case "value":
                  u = A;
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
                  Tt(t, l, a, A, e, null);
              }
          }
        qf(
          t,
          u,
          c,
          o,
          v,
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
                Tt(t, l, n, c, e, null);
            }
        l = u, e = i, t.multiple = !!a, l != null ? ea(t, !!a, l, !1) : e != null && ea(t, !!a, e, !0);
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
                Tt(t, l, i, c, e, null);
            }
        Gf(t, a, n, u);
        return;
      case "option":
        for (o in e)
          if (e.hasOwnProperty(o) && (a = e[o], a != null))
            switch (o) {
              case "selected":
                t.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                Tt(t, l, o, a, e, null);
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
        for (a = 0; a < Sn.length; a++)
          tt(Sn[a], t);
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
        for (v in e)
          if (e.hasOwnProperty(v) && (a = e[v], a != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, l));
              default:
                Tt(t, l, v, a, e, null);
            }
        return;
      default:
        if (ii(l)) {
          for (A in e)
            e.hasOwnProperty(A) && (a = e[A], a !== void 0 && Jc(
              t,
              l,
              A,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && Tt(t, l, c, a, e, null));
  }
  function $m(t, l, e, a) {
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
        var n = null, u = null, i = null, c = null, o = null, v = null, A = null;
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
                a.hasOwnProperty(T) || Tt(t, l, T, null, a, M);
            }
        }
        for (var p in a) {
          var T = a[p];
          if (M = e[p], a.hasOwnProperty(p) && (T != null || M != null))
            switch (p) {
              case "type":
                u = T;
                break;
              case "name":
                n = T;
                break;
              case "checked":
                v = T;
                break;
              case "defaultChecked":
                A = T;
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
                T !== M && Tt(
                  t,
                  l,
                  p,
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
          v,
          A,
          u,
          n
        );
        return;
      case "select":
        T = i = c = p = null;
        for (u in e)
          if (o = e[u], e.hasOwnProperty(u) && o != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                T = o;
              default:
                a.hasOwnProperty(u) || Tt(
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
                p = u;
                break;
              case "defaultValue":
                c = u;
                break;
              case "multiple":
                i = u;
              default:
                u !== o && Tt(
                  t,
                  l,
                  n,
                  u,
                  a,
                  o
                );
            }
        l = c, e = i, a = T, p != null ? ea(t, !!e, p, !1) : !!a != !!e && (l != null ? ea(t, !!e, l, !0) : ea(t, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        T = p = null;
        for (c in e)
          if (n = e[c], e.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                Tt(t, l, c, null, a, n);
            }
        for (i in a)
          if (n = a[i], u = e[i], a.hasOwnProperty(i) && (n != null || u != null))
            switch (i) {
              case "value":
                p = n;
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
                n !== u && Tt(t, l, i, n, a, u);
            }
        Yf(t, p, T);
        return;
      case "option":
        for (var Y in e)
          if (p = e[Y], e.hasOwnProperty(Y) && p != null && !a.hasOwnProperty(Y))
            switch (Y) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Tt(
                  t,
                  l,
                  Y,
                  null,
                  a,
                  p
                );
            }
        for (o in a)
          if (p = a[o], T = e[o], a.hasOwnProperty(o) && p !== T && (p != null || T != null))
            switch (o) {
              case "selected":
                t.selected = p && typeof p != "function" && typeof p != "symbol";
                break;
              default:
                Tt(
                  t,
                  l,
                  o,
                  p,
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
          p = e[K], e.hasOwnProperty(K) && p != null && !a.hasOwnProperty(K) && Tt(t, l, K, null, a, p);
        for (v in a)
          if (p = a[v], T = e[v], a.hasOwnProperty(v) && p !== T && (p != null || T != null))
            switch (v) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, l));
                break;
              default:
                Tt(
                  t,
                  l,
                  v,
                  p,
                  a,
                  T
                );
            }
        return;
      default:
        if (ii(l)) {
          for (var Et in e)
            p = e[Et], e.hasOwnProperty(Et) && p !== void 0 && !a.hasOwnProperty(Et) && Jc(
              t,
              l,
              Et,
              void 0,
              a,
              p
            );
          for (A in a)
            p = a[A], T = e[A], !a.hasOwnProperty(A) || p === T || p === void 0 && T === void 0 || Jc(
              t,
              l,
              A,
              p,
              a,
              T
            );
          return;
        }
    }
    for (var h in e)
      p = e[h], e.hasOwnProperty(h) && p != null && !a.hasOwnProperty(h) && Tt(t, l, h, null, a, p);
    for (M in a)
      p = a[M], T = e[M], !a.hasOwnProperty(M) || p === T || p == null && T == null || Tt(t, l, M, p, a, T);
  }
  function Zr(t) {
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
  function km() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, l = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var n = e[a], u = n.transferSize, i = n.initiatorType, c = n.duration;
        if (u && c && Zr(i)) {
          for (i = 0, c = n.responseEnd, a += 1; a < e.length; a++) {
            var o = e[a], v = o.startTime;
            if (v > c) break;
            var A = o.transferSize, M = o.initiatorType;
            A && Zr(M) && (o = o.responseEnd, i += A * (o < c ? 1 : (c - v) / (o - v)));
          }
          if (--a, l += 8 * (u + i) / (n.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return l / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var wc = null, $c = null;
  function Hu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Vr(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kr(t, l) {
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
  function kc(t, l) {
    return t === "textarea" || t === "noscript" || typeof l.children == "string" || typeof l.children == "number" || typeof l.children == "bigint" || typeof l.dangerouslySetInnerHTML == "object" && l.dangerouslySetInnerHTML !== null && l.dangerouslySetInnerHTML.__html != null;
  }
  var Wc = null;
  function Wm() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Wc ? !1 : (Wc = t, !0) : (Wc = null, !1);
  }
  var Jr = typeof setTimeout == "function" ? setTimeout : void 0, Fm = typeof clearTimeout == "function" ? clearTimeout : void 0, wr = typeof Promise == "function" ? Promise : void 0, Im = typeof queueMicrotask == "function" ? queueMicrotask : typeof wr < "u" ? function(t) {
    return wr.resolve(null).then(t).catch(Pm);
  } : Jr;
  function Pm(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Oe(t) {
    return t === "head";
  }
  function $r(t, l) {
    var e = l, a = 0;
    do {
      var n = e.nextSibling;
      if (t.removeChild(e), n && n.nodeType === 8)
        if (e = n.data, e === "/$" || e === "/&") {
          if (a === 0) {
            t.removeChild(n), Ra(l);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          Tn(t.ownerDocument.documentElement);
        else if (e === "head") {
          e = t.ownerDocument.head, Tn(e);
          for (var u = e.firstChild; u; ) {
            var i = u.nextSibling, c = u.nodeName;
            u[Ya] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || e.removeChild(u), u = i;
          }
        } else
          e === "body" && Tn(t.ownerDocument.body);
      e = n;
    } while (e);
    Ra(l);
  }
  function kr(t, l) {
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
        if (!t[Ya])
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
  function Wr(t, l) {
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
  function Fr(t) {
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
  function Ir(t) {
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
  function Pr(t, l, e) {
    switch (l = Hu(e), t) {
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
  function Tn(t) {
    for (var l = t.attributes; l.length; )
      t.removeAttributeNode(l[0]);
    ei(t);
  }
  var xl = /* @__PURE__ */ new Map(), td = /* @__PURE__ */ new Set();
  function Bu(t) {
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
    var t = ie.f(), l = Mu();
    return t || l;
  }
  function ny(t) {
    var l = Pe(t);
    l !== null && l.tag === 5 && l.type === "form" ? go(l) : ie.r(t);
  }
  var ja = typeof document > "u" ? null : document;
  function ld(t, l, e) {
    var a = ja;
    if (a && typeof l == "string" && l) {
      var n = El(l);
      n = 'link[rel="' + t + '"][href="' + n + '"]', typeof e == "string" && (n += '[crossorigin="' + e + '"]'), td.has(n) || (td.add(n), t = { rel: t, crossOrigin: e, href: l }, a.querySelector(n) === null && (l = a.createElement("link"), Ft(l, "link", t), Vt(l), a.head.appendChild(l)));
    }
  }
  function uy(t) {
    ie.D(t), ld("dns-prefetch", t, null);
  }
  function iy(t, l) {
    ie.C(t, l), ld("preconnect", t, l);
  }
  function cy(t, l, e) {
    ie.L(t, l, e);
    var a = ja;
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
          u = Ua(t);
          break;
        case "script":
          u = Ca(t);
      }
      xl.has(u) || (t = j(
        {
          rel: "preload",
          href: l === "image" && e && e.imageSrcSet ? void 0 : t,
          as: l
        },
        e
      ), xl.set(u, t), a.querySelector(n) !== null || l === "style" && a.querySelector(En(u)) || l === "script" && a.querySelector(_n(u)) || (l = a.createElement("link"), Ft(l, "link", t), Vt(l), a.head.appendChild(l)));
    }
  }
  function fy(t, l) {
    ie.m(t, l);
    var e = ja;
    if (e && t) {
      var a = l && typeof l.as == "string" ? l.as : "script", n = 'link[rel="modulepreload"][as="' + El(a) + '"][href="' + El(t) + '"]', u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Ca(t);
      }
      if (!xl.has(u) && (t = j({ rel: "modulepreload", href: t }, l), xl.set(u, t), e.querySelector(n) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(_n(u)))
              return;
        }
        a = e.createElement("link"), Ft(a, "link", t), Vt(a), e.head.appendChild(a);
      }
    }
  }
  function sy(t, l, e) {
    ie.S(t, l, e);
    var a = ja;
    if (a && t) {
      var n = ta(a).hoistableStyles, u = Ua(t);
      l = l || "default";
      var i = n.get(u);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          En(u)
        ))
          c.loading = 5;
        else {
          t = j(
            { rel: "stylesheet", href: t, "data-precedence": l },
            e
          ), (e = xl.get(u)) && lf(t, e);
          var o = i = a.createElement("link");
          Vt(o), Ft(o, "link", t), o._p = new Promise(function(v, A) {
            o.onload = v, o.onerror = A;
          }), o.addEventListener("load", function() {
            c.loading |= 1;
          }), o.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, qu(i, l, a);
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
    var e = ja;
    if (e && t) {
      var a = ta(e).hoistableScripts, n = Ca(t), u = a.get(n);
      u || (u = e.querySelector(_n(n)), u || (t = j({ src: t, async: !0 }, l), (l = xl.get(n)) && ef(t, l), u = e.createElement("script"), Vt(u), Ft(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ry(t, l) {
    ie.M(t, l);
    var e = ja;
    if (e && t) {
      var a = ta(e).hoistableScripts, n = Ca(t), u = a.get(n);
      u || (u = e.querySelector(_n(n)), u || (t = j({ src: t, async: !0, type: "module" }, l), (l = xl.get(n)) && ef(t, l), u = e.createElement("script"), Vt(u), Ft(u, "link", t), e.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, a.set(n, u));
    }
  }
  function ed(t, l, e, a) {
    var n = (n = I.current) ? Bu(n) : null;
    if (!n) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (l = Ua(e.href), e = ta(
          n
        ).hoistableStyles, a = e.get(l), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(l, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          t = Ua(e.href);
          var u = ta(
            n
          ).hoistableStyles, i = u.get(t);
          if (i || (n = n.ownerDocument || n, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, i), (u = n.querySelector(
            En(t)
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
        return l = e.async, e = e.src, typeof e == "string" && l && typeof l != "function" && typeof l != "symbol" ? (l = Ca(e), e = ta(
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
  function Ua(t) {
    return 'href="' + El(t) + '"';
  }
  function En(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function ad(t) {
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
    }), Ft(l, "link", e), Vt(l), t.head.appendChild(l));
  }
  function Ca(t) {
    return '[src="' + El(t) + '"]';
  }
  function _n(t) {
    return "script[async]" + t;
  }
  function nd(t, l, e) {
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
          ), Vt(a), Ft(a, "style", n), qu(a, e.precedence, t), l.instance = a;
        case "stylesheet":
          n = Ua(e.href);
          var u = t.querySelector(
            En(n)
          );
          if (u)
            return l.state.loading |= 4, l.instance = u, Vt(u), u;
          a = ad(e), (n = xl.get(n)) && lf(a, n), u = (t.ownerDocument || t).createElement("link"), Vt(u);
          var i = u;
          return i._p = new Promise(function(c, o) {
            i.onload = c, i.onerror = o;
          }), Ft(u, "link", a), l.state.loading |= 4, qu(u, e.precedence, t), l.instance = u;
        case "script":
          return u = Ca(e.src), (n = t.querySelector(
            _n(u)
          )) ? (l.instance = n, Vt(n), n) : (a = e, (n = xl.get(u)) && (a = j({}, e), ef(a, n)), t = t.ownerDocument || t, n = t.createElement("script"), Vt(n), Ft(n, "link", a), t.head.appendChild(n), l.instance = n);
        case "void":
          return null;
        default:
          throw Error(s(443, l.type));
      }
    else
      l.type === "stylesheet" && (l.state.loading & 4) === 0 && (a = l.instance, l.state.loading |= 4, qu(a, e.precedence, t));
    return l.instance;
  }
  function qu(t, l, e) {
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
  var Yu = null;
  function ud(t, l, e) {
    if (Yu === null) {
      var a = /* @__PURE__ */ new Map(), n = Yu = /* @__PURE__ */ new Map();
      n.set(e, a);
    } else
      n = Yu, a = n.get(e), a || (a = /* @__PURE__ */ new Map(), n.set(e, a));
    if (a.has(t)) return a;
    for (a.set(t, null), e = e.getElementsByTagName(t), n = 0; n < e.length; n++) {
      var u = e[n];
      if (!(u[Ya] || u[wt] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = u.getAttribute(l) || "";
        i = t + i;
        var c = a.get(i);
        c ? c.push(u) : a.set(i, [u]);
      }
    }
    return a;
  }
  function id(t, l, e) {
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
  function cd(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function my(t, l, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var n = Ua(a.href), u = l.querySelector(
          En(n)
        );
        if (u) {
          l = u._p, l !== null && typeof l == "object" && typeof l.then == "function" && (t.count++, t = Gu.bind(t), l.then(t, t)), e.state.loading |= 4, e.instance = u, Vt(u);
          return;
        }
        u = l.ownerDocument || l, a = ad(a), (n = xl.get(n)) && lf(a, n), u = u.createElement("link"), Vt(u);
        var i = u;
        i._p = new Promise(function(c, o) {
          i.onload = c, i.onerror = o;
        }), Ft(u, "link", a), e.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(e, l), (l = e.state.preload) && (e.state.loading & 3) === 0 && (t.count++, e = Gu.bind(t), l.addEventListener("load", e), l.addEventListener("error", e));
    }
  }
  var af = 0;
  function yy(t, l) {
    return t.stylesheets && t.count === 0 && Lu(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (t.stylesheets && Lu(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + l);
      0 < t.imgBytes && af === 0 && (af = 62500 * km());
      var n = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Lu(t, t.stylesheets), t.unsuspend)) {
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
  function Gu() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Lu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Xu = null;
  function Lu(t, l) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Xu = /* @__PURE__ */ new Map(), l.forEach(vy, t), Xu = null, Gu.call(t));
  }
  function vy(t, l) {
    if (!(l.state.loading & 4)) {
      var e = Xu.get(t);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), Xu.set(t, e);
        for (var n = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < n.length; u++) {
          var i = n[u];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      n = l.instance, i = n.getAttribute("data-precedence"), u = e.get(i) || a, u === a && e.set(null, n), e.set(i, n), this.count++, a = Gu.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(n, t.firstChild)), l.state.loading |= 4;
    }
  }
  var An = {
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
  function fd(t, l, e, a, n, u, i, c, o, v, A, M) {
    return t = new gy(
      t,
      l,
      e,
      i,
      o,
      v,
      A,
      M,
      c
    ), l = 1, u === !0 && (l |= 24), u = hl(3, null, null, l), t.current = u, u.stateNode = t, l = Bi(), l.refCount++, t.pooledCache = l, l.refCount++, u.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: l
    }, Xi(u), t;
  }
  function sd(t) {
    return t ? (t = oa, t) : oa;
  }
  function od(t, l, e, a, n, u) {
    n = sd(n), a.context === null ? a.context = n : a.pendingContext = n, a = ye(l), a.payload = { element: e }, u = u === void 0 ? null : u, u !== null && (a.callback = u), e = ve(t, a, l), e !== null && (fl(e, t, l), ln(e, t, l));
  }
  function rd(t, l) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var e = t.retryLane;
      t.retryLane = e !== 0 && e < l ? e : l;
    }
  }
  function nf(t, l) {
    rd(t, l), (t = t.alternate) && rd(t, l);
  }
  function dd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = Ye(t, 67108864);
      l !== null && fl(l, t, 67108864), nf(t, 67108864);
    }
  }
  function hd(t) {
    if (t.tag === 13 || t.tag === 31) {
      var l = pl();
      l = Pu(l);
      var e = Ye(t, l);
      e !== null && fl(e, t, l), nf(t, l);
    }
  }
  var Qu = !0;
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
    if (Qu) {
      var n = cf(a);
      if (n === null)
        Kc(
          t,
          l,
          a,
          Zu,
          e
        ), yd(t, a);
      else if (Ty(
        n,
        t,
        l,
        e,
        a
      ))
        a.stopPropagation();
      else if (yd(t, a), l & 4 && -1 < by.indexOf(t)) {
        for (; n !== null; ) {
          var u = Pe(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var i = Ce(u.pendingLanes);
                  if (i !== 0) {
                    var c = u;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var o = 1 << 31 - rl(i);
                      c.entanglements[1] |= o, i &= ~o;
                    }
                    Xl(u), (rt & 6) === 0 && (zu = sl() + 500, pn(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ye(u, 2), c !== null && fl(c, u, 2), Mu(), nf(u, 2);
            }
          if (u = cf(a), u === null && Kc(
            t,
            l,
            a,
            Zu,
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
  var Zu = null;
  function ff(t) {
    if (Zu = null, t = Ie(t), t !== null) {
      var l = x(t);
      if (l === null) t = null;
      else {
        var e = l.tag;
        if (e === 13) {
          if (t = z(l), t !== null) return t;
          t = null;
        } else if (e === 31) {
          if (t = U(l), t !== null) return t;
          t = null;
        } else if (e === 3) {
          if (l.stateNode.current.memoizedState.isDehydrated)
            return l.tag === 3 ? l.stateNode.containerInfo : null;
          t = null;
        } else l !== t && (t = null);
      }
    }
    return Zu = t, null;
  }
  function md(t) {
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
          case Tf:
            return 2;
          case Ef:
            return 8;
          case Un:
          case ih:
            return 32;
          case _f:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var sf = !1, Me = null, De = null, Ne = null, zn = /* @__PURE__ */ new Map(), On = /* @__PURE__ */ new Map(), xe = [], by = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function yd(t, l) {
    switch (t) {
      case "focusin":
      case "focusout":
        Me = null;
        break;
      case "dragenter":
      case "dragleave":
        De = null;
        break;
      case "mouseover":
      case "mouseout":
        Ne = null;
        break;
      case "pointerover":
      case "pointerout":
        zn.delete(l.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        On.delete(l.pointerId);
    }
  }
  function Mn(t, l, e, a, n, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: l,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: u,
      targetContainers: [n]
    }, l !== null && (l = Pe(l), l !== null && dd(l)), t) : (t.eventSystemFlags |= a, l = t.targetContainers, n !== null && l.indexOf(n) === -1 && l.push(n), t);
  }
  function Ty(t, l, e, a, n) {
    switch (l) {
      case "focusin":
        return Me = Mn(
          Me,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "dragenter":
        return De = Mn(
          De,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "mouseover":
        return Ne = Mn(
          Ne,
          t,
          l,
          e,
          a,
          n
        ), !0;
      case "pointerover":
        var u = n.pointerId;
        return zn.set(
          u,
          Mn(
            zn.get(u) || null,
            t,
            l,
            e,
            a,
            n
          )
        ), !0;
      case "gotpointercapture":
        return u = n.pointerId, On.set(
          u,
          Mn(
            On.get(u) || null,
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
  function vd(t) {
    var l = Ie(t.target);
    if (l !== null) {
      var e = x(l);
      if (e !== null) {
        if (l = e.tag, l === 13) {
          if (l = z(e), l !== null) {
            t.blockedOn = l, Nf(t.priority, function() {
              hd(e);
            });
            return;
          }
        } else if (l === 31) {
          if (l = U(e), l !== null) {
            t.blockedOn = l, Nf(t.priority, function() {
              hd(e);
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
  function Vu(t) {
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
        return l = Pe(e), l !== null && dd(l), t.blockedOn = e, !1;
      l.shift();
    }
    return !0;
  }
  function gd(t, l, e) {
    Vu(t) && e.delete(l);
  }
  function Ey() {
    sf = !1, Me !== null && Vu(Me) && (Me = null), De !== null && Vu(De) && (De = null), Ne !== null && Vu(Ne) && (Ne = null), zn.forEach(gd), On.forEach(gd);
  }
  function Ku(t, l) {
    t.blockedOn === l && (t.blockedOn = null, sf || (sf = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Ey
    )));
  }
  var Ju = null;
  function pd(t) {
    Ju !== t && (Ju = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Ju === t && (Ju = null);
        for (var l = 0; l < t.length; l += 3) {
          var e = t[l], a = t[l + 1], n = t[l + 2];
          if (typeof a != "function") {
            if (ff(a || e) === null)
              continue;
            break;
          }
          var u = Pe(e);
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
  function Ra(t) {
    function l(o) {
      return Ku(o, t);
    }
    Me !== null && Ku(Me, t), De !== null && Ku(De, t), Ne !== null && Ku(Ne, t), zn.forEach(l), On.forEach(l);
    for (var e = 0; e < xe.length; e++) {
      var a = xe[e];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < xe.length && (e = xe[0], e.blockedOn === null); )
      vd(e), e.blockedOn === null && xe.shift();
    if (e = (t.ownerDocument || t).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var n = e[a], u = e[a + 1], i = n[el] || null;
        if (typeof u == "function")
          i || pd(e);
        else if (i) {
          var c = null;
          if (u && u.hasAttribute("formAction")) {
            if (n = u, i = u[el] || null)
              c = i.formAction;
            else if (ff(n) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), pd(e);
        }
      }
  }
  function Sd() {
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
  wu.prototype.render = of.prototype.render = function(t) {
    var l = this._internalRoot;
    if (l === null) throw Error(s(409));
    var e = l.current, a = pl();
    od(e, a, t, l, null, null);
  }, wu.prototype.unmount = of.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var l = t.containerInfo;
      od(t.current, 2, null, t, null, null), Mu(), l[Fe] = null;
    }
  };
  function wu(t) {
    this._internalRoot = t;
  }
  wu.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var l = Df();
      t = { blockedOn: null, target: t, priority: l };
      for (var e = 0; e < xe.length && l !== 0 && l < xe[e].priority; e++) ;
      xe.splice(e, 0, t), e === 0 && vd(t);
    }
  };
  var bd = m.version;
  if (bd !== "19.2.7")
    throw Error(
      s(
        527,
        bd,
        "19.2.7"
      )
    );
  H.findDOMNode = function(t) {
    var l = t._reactInternals;
    if (l === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = S(l), t = t !== null ? R(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var _y = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: _,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $u = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$u.isDisabled && $u.supportsFiber)
      try {
        Ha = $u.inject(
          _y
        ), ol = $u;
      } catch {
      }
  }
  return Nn.createRoot = function(t, l) {
    if (!N(t)) throw Error(s(299));
    var e = !1, a = "", n = Mo, u = Do, i = No;
    return l != null && (l.unstable_strictMode === !0 && (e = !0), l.identifierPrefix !== void 0 && (a = l.identifierPrefix), l.onUncaughtError !== void 0 && (n = l.onUncaughtError), l.onCaughtError !== void 0 && (u = l.onCaughtError), l.onRecoverableError !== void 0 && (i = l.onRecoverableError)), l = fd(
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
      Sd
    ), t[Fe] = l.current, Vc(t), new of(l);
  }, Nn.hydrateRoot = function(t, l, e) {
    if (!N(t)) throw Error(s(299));
    var a = !1, n = "", u = Mo, i = Do, c = No, o = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (n = e.identifierPrefix), e.onUncaughtError !== void 0 && (u = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (o = e.formState)), l = fd(
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
      Sd
    ), l.context = sd(null), e = l.current, a = pl(), a = Pu(a), n = ye(a), n.callback = null, ve(e, n, a), e = a, l.current.lanes = e, qa(l, e), Xl(l), t[Fe] = l.current, Vc(t), new wu(l);
  }, Nn.version = "19.2.7", Nn;
}
var xd;
function Hy() {
  if (xd) return hf.exports;
  xd = 1;
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
const xn = {
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
  if (!m) return { ...xn, models: { ...xn.models }, apiKeys: {} };
  try {
    const g = JSON.parse(m);
    return qy(xn, g);
  } catch {
    return { ...xn, models: { ...xn.models }, apiKeys: {} };
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
const jd = 50, wd = "conversations";
function bf(f) {
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
    var g;
    return (g = m.attachments) == null ? void 0 : g.some((s) => s.dataUrl);
  }) ? {
    ...f,
    messages: f.messages.map(
      (m) => m.attachments ? {
        ...m,
        attachments: m.attachments.map(
          (g) => g.dataUrl ? { ...g, dataUrl: void 0 } : g
        )
      } : m
    )
  } : f;
}
function ku(f, m) {
  try {
    return f.storage.set(wd, JSON.stringify(m)), !0;
  } catch {
    return !1;
  }
}
function $d(f, m) {
  if (ku(f, m)) return;
  const g = [...m];
  for (; g.length > 1; )
    if (g.pop(), ku(f, g)) return;
  ku(f, m.map(Ud)) || ku(f, m.slice(0, 1).map(Ud));
}
function Cd(f) {
  return bf(f).sort((m, g) => g.updatedAt - m.updatedAt);
}
function Rd(f, m) {
  const g = bf(f), s = g.findIndex((N) => N.id === m.id);
  s >= 0 ? g[s] = m : g.push(m), g.sort((N, x) => x.updatedAt - N.updatedAt), g.length > jd && g.splice(jd), $d(f, g);
}
function Ly(f, m) {
  const g = bf(f).filter((s) => s.id !== m);
  $d(f, g);
}
function Hd(f, m) {
  const g = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: g,
    updatedAt: g,
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
function kd(f) {
  const m = f.lastIndexOf(".");
  return m >= 0 ? f.slice(m + 1).toLowerCase() : "";
}
function Wd(f) {
  const m = (f.type || "").toLowerCase();
  if (m.startsWith("image/")) return "image";
  if (m === "application/pdf") return "pdf";
  if (m.startsWith("text/")) return "text";
  const g = kd(f.name);
  return g === "pdf" ? "pdf" : Ky.has(g) ? "image" : "text";
}
function jn(f) {
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
  return Jy[kd(f)] ?? "";
}
function $y(f) {
  return new Promise((m, g) => {
    const s = new FileReader();
    s.onload = () => m(s.result), s.onerror = () => g(s.error ?? new Error("FileReader failed")), s.readAsDataURL(f);
  });
}
const ky = "4.10.38", Gd = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${ky}/build`;
let gf = null;
function Wy() {
  return gf || (gf = import(`${Gd}/pdf.mjs`).then((m) => {
    const g = m.default ?? m;
    return g.GlobalWorkerOptions.workerSrc = `${Gd}/pdf.worker.mjs`, g;
  })), gf;
}
async function Fy(f) {
  const m = await Wy(), g = await f.arrayBuffer(), s = await m.getDocument({ data: g }).promise, N = [];
  for (let x = 1; x <= s.numPages; x++) {
    const E = (await (await s.getPage(x)).getTextContent()).items.map((S) => typeof (S == null ? void 0 : S.str) == "string" ? S.str : "").join(" ").replace(/[ \t]+/g, " ").trim();
    E && N.push(E);
  }
  return N.join(`

`).trim();
}
async function Iy(f, m = {}) {
  const g = Wd(f), s = {
    id: crypto.randomUUID(),
    kind: g,
    name: f.name,
    size: f.size,
    mime: f.type || ""
  };
  if (g === "image") {
    if (f.size > Bd)
      throw new Error(`Image "${f.name}" is too large (max ${jn(Bd)})`);
    const x = await (m.readDataUrl ?? $y)(f);
    return { ...s, dataUrl: x };
  }
  if (g === "pdf") {
    if (f.size > Yd)
      throw new Error(`PDF "${f.name}" is too large (max ${jn(Yd)})`);
    let x;
    try {
      x = await (m.loadPdfText ?? Fy)(f);
    } catch (z) {
      const U = (z == null ? void 0 : z.message) ?? String(z);
      throw new Error(`Could not read PDF "${f.name}": ${U}`);
    }
    return { ...s, text: x };
  }
  if (f.size > qd)
    throw new Error(`Text file "${f.name}" is too large (max ${jn(qd)})`);
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
function Fd(f, m, g) {
  const s = m ?? [], N = [];
  f.trim() && N.push(f);
  for (const U of s)
    if ((U.kind === "text" || U.kind === "pdf") && U.text) {
      const E = U.kind === "pdf" ? "" : wy(U.name);
      N.push(`Attached file "${U.name}":
\`\`\`${E}
${U.text}
\`\`\``);
    }
  const x = N.join(`

`), z = s.filter((U) => U.kind === "image" && U.dataUrl);
  if (z.length > 0 && Py.has(g))
    return [
      { type: "text", text: x || "(see attached image)" },
      ...z.map((E) => ({ type: "image_url", image_url: { url: E.dataUrl } }))
    ];
  if (z.length > 0) {
    const U = z.map((E) => `[image attached (not sent to this provider): ${E.name}]`).join(`
`);
    return [x, U].filter(Boolean).join(`

`);
  }
  return x;
}
function Xd(f, m) {
  const g = f.split(`
`);
  for (const s of g) {
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
      const U = {
        message: x.message,
        stop_reason: x.stop_reason,
        usage: x.usage ?? {}
      };
      m.onDone(U);
    } else if (z === "error")
      return m.onError(x.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function Id(f, m, g, s) {
  let N;
  try {
    N = await f.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(m),
      signal: s
    });
  } catch (E) {
    g.onError(`Network error: ${String(E)}`);
    return;
  }
  if (!N.ok) {
    let E = "";
    try {
      E = await N.text(), E.length > 200 && (E = E.slice(0, 200) + "...");
    } catch {
    }
    g.onError(`HTTP ${N.status}: ${E}`);
    return;
  }
  const x = N.body.getReader(), z = new TextDecoder();
  let U = "";
  try {
    for (; ; ) {
      const { done: E, value: S } = await x.read();
      if (E) break;
      U += z.decode(S, { stream: !0 }).replace(/\r\n/g, `
`);
      const R = U.split(`

`);
      U = R.pop() ?? "";
      for (const j of R) {
        if (!j.trim()) continue;
        if (Xd(j, g)) {
          x.cancel().catch(() => {
          });
          return;
        }
      }
    }
    U.trim() && Xd(U, g);
  } catch (E) {
    (E == null ? void 0 : E.name) !== "AbortError" && g.onError(`Stream read error: ${String(E)}`);
  } finally {
    x.releaseLock();
  }
}
async function t0(f, m, g, s) {
  const N = await f.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: m, api_key: g, base_url: s })
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
async function pf(f) {
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
  const m = f.default === null || f.default === void 0 ? String(f.default) : typeof f.default == "object" ? JSON.stringify(f.default) : String(f.default), g = m.length > 60 ? m.slice(0, 60) + "..." : m;
  let s = "";
  if (f.param_type === "select" && f.options.length > 0)
    s = `{${f.options.join("|")}}`;
  else if (f.param_type === "int" || f.param_type === "float") {
    const N = f.min_value !== null, x = f.max_value !== null;
    if (N || x) {
      const z = N ? String(f.min_value) : "", U = x ? String(f.max_value) : "";
      s = `{${z}..${U}}`;
    }
  }
  return `${f.name}:${f.param_type}=${g}${s}`;
}
function n0(f) {
  return f.map((m) => {
    const g = [];
    if (m.inputs.length > 0) {
      const N = m.inputs.map((x) => `${x.name}:${x.data_type}`).join(", ");
      g.push(`in[${N}]`);
    }
    if (m.outputs.length > 0) {
      const N = m.outputs.map((x) => `${x.name}:${x.data_type}`).join(", ");
      g.push(`out[${N}]`);
    }
    if (m.params.length > 0) {
      const N = m.params.map(a0).join(", ");
      g.push(`params[${N}]`);
    }
    const s = g.length > 0 ? " " + g.join(" ") : "";
    return `${m.node_name}:${s} [category: ${m.category}]`;
  }).join(`
`);
}
function Pd(f) {
  return f.map((m) => {
    const g = (m.description || "").replace(/\s+/g, " ").trim(), s = g.length > 100 ? g.slice(0, 100) + "..." : g;
    return `${m.node_name} [${m.category}]${s ? " - " + s : ""}`;
  }).join(`
`);
}
function th(f) {
  const m = JSON.stringify({ nodes: f.nodes, edges: f.edges });
  if (m.length <= Ld)
    return m;
  const g = Ld, s = m.length;
  return m.slice(0, g) + `
[graph truncated - kept ${g} of ${s} chars]`;
}
function u0(f, m) {
  const g = Pd(f), s = th(m);
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
- Use the exact node-type name from the index - the bare name only (e.g. Dataset), not the "[Category]" tag.
- Always get_node_schemas before connecting, so you use real port names.
- For a COMPLEX graph, you may first call research with a few independent sub-questions (e.g. data pipeline / model / training loop) to plan the parts in parallel.
- Connect every REQUIRED input; validate_graph reports the ones you missed.
- Prefer several small batches over one enormous batch.
- Never use clear_graph unless the user asks to start over.

## Node catalog index (NodeName [Category] - description). Call get_node_schemas for exact ports/params.
${g}

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
  const g = f.role === "user" && f.attachments && f.attachments.length > 0 ? Fd(f.content, f.attachments, m) : f.content, s = { role: f.role, content: g };
  return f.tool_calls && (s.tool_calls = f.tool_calls), f.tool_call_id && (s.tool_call_id = f.tool_call_id), s;
}
function s0(f, m) {
  const g = /* @__PURE__ */ new Map();
  f.forEach((N, x) => {
    const z = N.op, U = m[x], E = U ? U.ok : !1;
    g.has(z) || g.set(z, { ok: 0, fail: 0 });
    const S = g.get(z);
    E ? S.ok++ : S.fail++;
  });
  const s = [];
  for (const [N, x] of g) {
    const z = x.ok + x.fail;
    x.fail === 0 ? s.push(`${N} x${z} ok`) : x.ok === 0 ? s.push(`${N} x${z} FAILED`) : s.push(`${N} x${z} (${x.ok} ok, ${x.fail} FAILED)`);
  }
  return s.join(", ");
}
function o0(f, m, g, s, N) {
  const z = { role: "system", content: u0(
    f.graph.getNodeDefinitions(),
    f.graph.getGraph()
  ) }, U = m.slice(-20).map((S) => f0(S, N)), E = {
    role: "user",
    content: Fd(g, s, N)
  };
  return [z, ...U, E];
}
function lh(f, m, g = c0, s = 8192) {
  const N = f.provider, x = f.models[N] ?? "", z = {
    provider: N,
    model: x,
    messages: m,
    tools: g,
    max_tokens: s
  };
  if (N !== "openai-codex") {
    const U = N === "openai" ? f.apiKeys.openai : N === "openrouter" ? f.apiKeys.openrouter : N === "anthropic" ? f.apiKeys.anthropic : N === "custom" ? f.apiKeys.custom : void 0;
    U && (z.api_key = U);
  }
  return N === "custom" && f.customBaseUrl && (z.base_url = f.customBaseUrl), z;
}
async function eh(f) {
  const m = f.graph.getGraph();
  try {
    const g = await f.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: m.nodes, edges: m.edges })
    });
    if (!g.ok)
      return { valid: !1, errors: [`validate request failed: HTTP ${g.status}`] };
    const s = await g.json();
    return { valid: !!s.valid, errors: Array.isArray(s.errors) ? s.errors : [] };
  } catch (g) {
    return { valid: !1, errors: [`validate request error: ${String(g)}`] };
  }
}
async function r0(f, m, g, s, N) {
  const z = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + s },
    { role: "user", content: g }
  ];
  let U = "";
  try {
    await Id(
      f,
      lh(m, z, [], 1024),
      {
        onText: (E) => {
          U += E;
        },
        onDone: (E) => {
          !U && E.message.content && (U = E.message.content);
        },
        onError: (E) => {
          U += `
(research error: ${E})`;
        }
      },
      N
    );
  } catch (E) {
    return `(research failed: ${String(E)})`;
  }
  return U.trim() || "(no answer)";
}
async function d0(f, m, g, s, N, x) {
  const { name: z, arguments: U } = f;
  if (z === "apply_graph_operations") {
    const E = U.operations;
    if (!Array.isArray(E))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let S;
    try {
      S = m.graph.applyOperations(E);
    } catch (j) {
      return JSON.stringify({ error: `applyOperations threw: ${String(j)}` });
    }
    const R = s0(E, S.results);
    return N.push(R), s.onOpsApplied(R, S), JSON.stringify({
      results: S.results,
      refs: S.refs,
      node_count: S.node_count,
      edge_count: S.edge_count
    });
  }
  if (z === "get_node_schemas") {
    const S = (Array.isArray(U.node_types) ? U.node_types : []).map((V) => String(V)), R = m.graph.getNodeDefinitions(), j = new Map(R.map((V) => [V.node_name, V])), Z = S.map((V) => j.get(V)).filter((V) => !!V), ut = S.filter((V) => !j.has(V));
    let dt = Z.length > 0 ? n0(Z) : "(no matching node types)";
    return ut.length > 0 && (dt += `
(unknown node types, not in catalog: ${ut.join(", ")})`), dt;
  }
  if (z === "validate_graph")
    return JSON.stringify(await eh(m));
  if (z === "research") {
    const S = (Array.isArray(U.questions) ? U.questions : []).map((Z) => String(Z)).filter((Z) => Z.trim()).slice(0, 4);
    if (S.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const R = Pd(m.graph.getNodeDefinitions()), j = await Promise.all(
      S.map((Z) => r0(m, g, Z, R, x))
    );
    return S.map((Z, ut) => `[${ut + 1}] Q: ${Z}
A: ${j[ut]}`).join(`

`);
  }
  return z === "get_current_graph" ? th(m.graph.getGraph()) : JSON.stringify({ error: `Unknown tool: ${z}` });
}
async function h0(f) {
  const { api: m, settings: g, history: s, userText: N, attachments: x, callbacks: z, signal: U } = f, E = [], S = o0(
    m,
    s,
    N,
    x,
    g.provider
  );
  let R = 0, j = 0;
  try {
    for (; ; ) {
      let Z = "", ut = null, dt = null;
      if (await Id(
        m,
        lh(g, S),
        {
          onText(L) {
            Z += L, z.onTextDelta(L);
          },
          onDone(L) {
            ut = L;
          },
          onError(L) {
            dt = L;
          }
        },
        U
      ), dt !== null) {
        z.onTurnsCommitted(E), z.onError(dt), z.onFinished();
        return;
      }
      if (!ut) {
        z.onTurnsCommitted(E), z.onFinished();
        return;
      }
      const V = ut, ot = V.message.tool_calls ?? [], lt = V.message.content || Z;
      if (V.stop_reason === "end" || ot.length === 0) {
        const L = m.graph.getGraph();
        if (j < i0 && Array.isArray(L.nodes) && L.nodes.length > 0) {
          const Dt = await eh(m);
          if (!Dt.valid && Dt.errors.length > 0) {
            j++, S.push({ role: "assistant", content: lt }), S.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + Dt.errors.map((G) => `- ${G}`).join(`
`)
            });
            continue;
          }
        }
        const Mt = { role: "assistant", content: lt };
        E.push(Mt), z.onTurnsCommitted(E), z.onFinished();
        return;
      }
      R++;
      const Ut = [], ht = [], Bt = [];
      for (const L of ot) {
        const Mt = await d0(L, m, g, z, Ut, U), Dt = {
          role: "tool",
          content: Mt,
          tool_call_id: L.id
        };
        ht.push(Dt), Bt.push({
          role: "tool",
          content: Mt,
          tool_call_id: L.id
        });
      }
      const Lt = {
        role: "assistant",
        content: lt,
        tool_calls: ot
      };
      Ut.length > 0 && (Lt.opsSummary = Ut.join("; ")), E.push(Lt), E.push(...ht);
      const Ct = {
        role: "assistant",
        content: lt,
        tool_calls: ot
      };
      if (S.push(Ct), S.push(...Bt), R >= Qd) {
        const L = {
          role: "assistant",
          content: `(stopped after ${Qd} tool rounds)`
        };
        E.push(L), z.onTurnsCommitted(E), z.onFinished();
        return;
      }
    }
  } catch (Z) {
    z.onTurnsCommitted(E), z.onError(String(Z)), z.onFinished();
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
  const m = f.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), g = [];
  return m.forEach((s, N) => {
    if (s.startsWith("```")) {
      const x = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      g.push(/* @__PURE__ */ b.jsx("pre", { children: /* @__PURE__ */ b.jsx("code", { children: x }) }, N));
    } else s && g.push(/* @__PURE__ */ b.jsx("span", { children: s }, N));
  }), g;
}
function Zd({
  turn: f,
  streaming: m = !1,
  streamingText: g,
  error: s = null,
  onRetry: N,
  retryDisabled: x = !1
}) {
  if (f.role === "tool") return null;
  const z = f.role === "user", U = m && g !== void 0 ? g : f.content, E = U.trim().length > 0, S = f.attachments ?? [];
  return /* @__PURE__ */ b.jsxs("div", { className: `gcp-msg-row ${z ? "user" : "assistant"}`, children: [
    S.length > 0 && /* @__PURE__ */ b.jsx("div", { className: "gcp-bubble-attachments", children: S.map(
      (R, j) => R.kind === "image" && R.dataUrl ? /* @__PURE__ */ b.jsx("img", { className: "gcp-att-image", src: R.dataUrl, alt: R.name, title: R.name }, j) : /* @__PURE__ */ b.jsxs("span", { className: "gcp-att-file", title: R.name, children: [
        /* @__PURE__ */ b.jsx(m0, { kind: R.kind }),
        /* @__PURE__ */ b.jsx("span", { className: "gcp-att-file-name", children: R.name })
      ] }, j)
    ) }),
    (E || m) && /* @__PURE__ */ b.jsxs("div", { className: `gcp-bubble${s ? " error" : ""}`, children: [
      y0(U),
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
function b0({
  api: f,
  settings: m,
  codexLoggedIn: g,
  conversation: s,
  onConversationChange: N,
  onOpenSettings: x
}) {
  const [z, U] = W.useState(""), [E, S] = W.useState(!1), [R, j] = W.useState(""), [Z, ut] = W.useState(null), [dt, V] = W.useState(""), [ot, lt] = W.useState([]), [Ut, ht] = W.useState([]), [Bt, Lt] = W.useState(!1), Ct = W.useRef(null), L = W.useRef(null), Mt = W.useRef(null), Dt = W.useRef(null), G = W.useRef(0), it = Xy(m, g), It = Ut.some((C) => C.status === "loading"), jl = Ut.filter((C) => C.status === "ready" && C.att).map((C) => C.att), Ul = it && !E && !It && (z.trim().length > 0 || jl.length > 0);
  W.useEffect(() => () => {
    var C;
    (C = Dt.current) == null || C.abort();
  }, []), W.useEffect(() => {
    var C;
    (C = Ct.current) == null || C.scrollIntoView({ behavior: "smooth" });
  }, [s.messages, R, Ut.length]);
  const ll = W.useCallback(() => {
    const C = L.current;
    C && (C.style.height = "auto", C.style.height = Math.min(C.scrollHeight, 110) + "px");
  }, []);
  W.useEffect(() => {
    ll();
  }, [z, ll]);
  const _ = W.useCallback(
    (C) => {
      if (!(!it || E))
        for (const pt of Array.from(C)) {
          const Qt = crypto.randomUUID(), Sl = Wd(pt);
          ht((St) => [
            ...St,
            { id: Qt, name: pt.name, kind: Sl, size: pt.size, status: "loading" }
          ]), Iy(pt).then((St) => {
            ht(
              (Bl) => Bl.map((bl) => bl.id === Qt ? { ...bl, status: "ready", att: St } : bl)
            );
          }).catch((St) => {
            const Bl = (St == null ? void 0 : St.message) ?? String(St);
            ht(
              (bl) => bl.map((Ll) => Ll.id === Qt ? { ...Ll, status: "error", error: Bl } : Ll)
            );
          });
        }
    },
    [it, E]
  ), H = (C) => {
    ht((pt) => pt.filter((Qt) => Qt.id !== C));
  }, J = (C) => {
    C.target.files && C.target.files.length > 0 && _(C.target.files), C.target.value = "";
  }, mt = (C) => {
    var Qt;
    const pt = (Qt = C.clipboardData) == null ? void 0 : Qt.files;
    pt && pt.length > 0 && (_(pt), C.preventDefault());
  }, yt = (C) => {
    !it || E || Array.from(C.dataTransfer.types).includes("Files") && (C.preventDefault(), G.current += 1, Lt(!0));
  }, d = (C) => {
    !it || E || Array.from(C.dataTransfer.types).includes("Files") && C.preventDefault();
  }, D = () => {
    G.current -= 1, G.current <= 0 && (G.current = 0, Lt(!1));
  }, B = (C) => {
    G.current = 0, Lt(!1), !(!it || E) && C.dataTransfer.files && C.dataTransfer.files.length > 0 && (C.preventDefault(), _(C.dataTransfer.files));
  }, q = W.useCallback(
    async (C, pt) => {
      var Ll;
      const Qt = C.trim();
      if (!Qt && pt.length === 0 || E || !it) return;
      ut(null), V(Qt), lt(pt), U(""), ht([]), S(!0), j("");
      const Sl = { role: "user", content: Qt };
      pt.length > 0 && (Sl.attachments = pt);
      let St = { ...s };
      St.title || (St.title = Qy(Qt || ((Ll = pt[0]) == null ? void 0 : Ll.name) || "Attachment")), St.provider = m.provider, St.model = m.models[m.provider] ?? "", St.messages = [...St.messages, Sl], St.updatedAt = Date.now(), N(St), Rd(f, St);
      const Bl = new AbortController();
      Dt.current = Bl;
      let bl = "";
      await h0({
        api: f,
        settings: m,
        history: St.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: Qt,
        attachments: pt.length > 0 ? pt : void 0,
        callbacks: {
          onTextDelta(Ql) {
            bl += Ql, j(bl);
          },
          onOpsApplied() {
          },
          onTurnsCommitted(Ql) {
            j(""), bl = "", St = { ...St, messages: [...St.messages, ...Ql], updatedAt: Date.now() }, N(St), Rd(f, St);
          },
          onError(Ql) {
            ut(Ql), j(""), bl = "";
          },
          onFinished() {
            S(!1), Dt.current = null;
          }
        },
        signal: Bl.signal
      });
    },
    [f, E, s, N, it, m]
  ), w = () => q(z, jl), I = (C) => {
    C.key === "Enter" && !C.shiftKey && (C.preventDefault(), q(z, jl));
  }, ct = () => {
    var C;
    return (C = Dt.current) == null ? void 0 : C.abort();
  }, Jt = () => q(dt, ot), At = s.messages.filter((C) => C.role !== "tool"), Ue = At.length === 0 && !E;
  return /* @__PURE__ */ b.jsxs(
    "div",
    {
      className: `gcp-chat${Bt ? " gcp-dragging" : ""}`,
      onDragEnter: yt,
      onDragOver: d,
      onDragLeave: D,
      onDrop: B,
      children: [
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-messages", role: "log", "aria-live": "polite", "aria-label": "Conversation", children: [
          Ue && /* @__PURE__ */ b.jsxs("div", { className: "gcp-welcome", children: [
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-mark", "aria-hidden": "true", children: "✦" }),
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-title", children: "Build graphs by conversation" }),
            /* @__PURE__ */ b.jsx("div", { className: "gcp-welcome-sub", children: "Describe the pipeline you want, ask for parameter changes, or attach an image, PDF, or code file for context." })
          ] }),
          At.map((C, pt) => {
            const Qt = !E && pt === At.length - 1 && C.role === "assistant";
            return /* @__PURE__ */ b.jsx(
              Zd,
              {
                turn: C,
                error: Qt && Z ? Z : null,
                onRetry: Jt,
                retryDisabled: E
              },
              pt
            );
          }),
          E && /* @__PURE__ */ b.jsx(Zd, { turn: { role: "assistant", content: "" }, streaming: !0, streamingText: R }),
          /* @__PURE__ */ b.jsx("div", { ref: Ct })
        ] }),
        Bt && /* @__PURE__ */ b.jsx("div", { className: "gcp-dropzone", "aria-hidden": "true", children: /* @__PURE__ */ b.jsxs("div", { className: "gcp-dropzone-inner", children: [
          /* @__PURE__ */ b.jsx(Vd, {}),
          /* @__PURE__ */ b.jsx("span", { children: "Drop files to attach" })
        ] }) }),
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-input-area", children: [
          Ut.length > 0 && /* @__PURE__ */ b.jsx("div", { className: "gcp-attachments", "aria-label": "Attachments", children: Ut.map((C) => {
            var pt;
            return /* @__PURE__ */ b.jsxs(
              "div",
              {
                className: `gcp-chip ${C.kind === "image" ? "image" : "file"} ${C.status}`,
                title: C.status === "error" ? C.error : `${C.name} · ${jn(C.size)}`,
                children: [
                  C.kind === "image" && ((pt = C.att) != null && pt.dataUrl) ? /* @__PURE__ */ b.jsx("img", { className: "gcp-chip-thumb", src: C.att.dataUrl, alt: C.name }) : /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-icon", children: /* @__PURE__ */ b.jsx(p0, { kind: C.kind }) }),
                  /* @__PURE__ */ b.jsxs("span", { className: "gcp-chip-body", children: [
                    /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-name", children: C.name }),
                    /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-size", children: C.status === "loading" ? "reading…" : C.status === "error" ? "failed" : jn(C.size) })
                  ] }),
                  C.status === "loading" && /* @__PURE__ */ b.jsx("span", { className: "gcp-chip-spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ b.jsx(
                    "button",
                    {
                      className: "gcp-chip-remove",
                      onClick: () => H(C.id),
                      "aria-label": `Remove ${C.name}`,
                      title: "Remove",
                      children: /* @__PURE__ */ b.jsx(S0, {})
                    }
                  )
                ]
              },
              C.id
            );
          }) }),
          /* @__PURE__ */ b.jsxs("div", { className: "gcp-input-row", children: [
            /* @__PURE__ */ b.jsx(
              "input",
              {
                ref: Mt,
                type: "file",
                multiple: !0,
                className: "gcp-file-input",
                onChange: J,
                "aria-hidden": "true",
                tabIndex: -1
              }
            ),
            /* @__PURE__ */ b.jsx(
              "button",
              {
                className: "gcp-attach-btn",
                onClick: () => {
                  var C;
                  return (C = Mt.current) == null ? void 0 : C.click();
                },
                disabled: !it || E,
                "aria-label": "Attach files",
                title: "Attach image, PDF, or text/code",
                children: /* @__PURE__ */ b.jsx(Vd, {})
              }
            ),
            /* @__PURE__ */ b.jsx(
              "textarea",
              {
                ref: L,
                className: "gcp-textarea",
                rows: 1,
                placeholder: "Message Graph Copilot…",
                value: z,
                onChange: (C) => U(C.target.value),
                onKeyDown: I,
                onPaste: mt,
                disabled: E || !it,
                "aria-label": "Message input",
                "aria-disabled": it ? void 0 : "true"
              }
            ),
            E ? /* @__PURE__ */ b.jsx("button", { className: "gcp-stop-btn", onClick: ct, "aria-label": "Stop generation", title: "Stop", children: /* @__PURE__ */ b.jsx(g0, {}) }) : /* @__PURE__ */ b.jsx(
              "button",
              {
                className: "gcp-send-btn",
                onClick: w,
                disabled: !Ul,
                "aria-label": "Send message",
                title: "Send",
                children: /* @__PURE__ */ b.jsx(v0, {})
              }
            )
          ] }),
          !it && !E && /* @__PURE__ */ b.jsxs("div", { className: "gcp-not-ready-overlay", children: [
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
function T0(f) {
  const m = Date.now() - f, g = Math.floor(m / 1e3);
  if (g < 60) return "just now";
  const s = Math.floor(g / 60);
  if (s < 60) return `${s}m ago`;
  const N = Math.floor(s / 60);
  if (N < 24) return `${N}h ago`;
  const x = Math.floor(N / 24);
  return x < 7 ? `${x}d ago` : `${Math.floor(x / 7)}w ago`;
}
function E0({ api: f, activeId: m, onResume: g, onNew: s }) {
  const [N, x] = W.useState(
    () => Cd(f)
  ), [z, U] = W.useState(null), E = (R, j) => {
    R.stopPropagation(), z === j ? (Ly(f, j), x(Cd(f)), z === j && U(null)) : U(j);
  }, S = () => {
    U(null);
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
    N.length === 0 ? /* @__PURE__ */ b.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ b.jsx("div", { className: "gcp-history-list", onClick: S, children: N.map((R) => /* @__PURE__ */ b.jsxs(
      "div",
      {
        className: `gcp-history-item${R.id === m ? " active" : ""}`,
        onClick: () => g(R),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${R.title || "(untitled)"}`,
        onKeyDown: (j) => {
          (j.key === "Enter" || j.key === " ") && (j.preventDefault(), g(R));
        },
        children: [
          /* @__PURE__ */ b.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ b.jsx("div", { className: "gcp-history-title", children: R.title || "(untitled)" }),
            /* @__PURE__ */ b.jsxs("div", { className: "gcp-history-meta", children: [
              T0(R.updatedAt),
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
              onClick: (j) => E(j, R.id),
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
}, _0 = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], A0 = 2e3, z0 = 300 * 1e3;
function O0({
  value: f,
  onBlur: m,
  placeholder: g,
  "aria-label": s
}) {
  const [N, x] = W.useState(!1), [z, U] = W.useState(f);
  return W.useEffect(() => {
    U(f);
  }, [f]), /* @__PURE__ */ b.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ b.jsx(
      "input",
      {
        type: N ? "text" : "password",
        className: "gcp-input",
        value: z,
        onChange: (E) => U(E.target.value),
        onBlur: () => m(z),
        placeholder: g ?? "API key",
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
        onClick: () => x((E) => !E),
        "aria-label": N ? "Hide key" : "Show key",
        title: N ? "Hide" : "Show",
        children: N ? "Hide" : "Show"
      }
    )
  ] });
}
function M0({
  api: f,
  settings: m,
  codexLoggedIn: g,
  codexEmail: s,
  onCodexStatusChange: N,
  onChange: x
}) {
  const z = m.provider, [U, E] = W.useState([]), [S, R] = W.useState(!1), [j, Z] = W.useState(null), [ut, dt] = W.useState(null), [V, ot] = W.useState(!1), lt = W.useRef(null), Ut = W.useRef(0);
  W.useEffect(() => () => {
    lt.current !== null && (clearInterval(lt.current), lt.current = null);
  }, []), W.useEffect(() => {
    z === "openai-codex" && pf(f).then((G) => {
      G.status === "logged_in" && N(!0, G.email ?? null);
    }).catch(() => {
    });
  }, []);
  function ht(G) {
    x({ ...m, ...G });
  }
  function Bt(G) {
    ht({ models: { ...m.models, [z]: G } });
  }
  function Lt(G, it) {
    ht({ apiKeys: { ...m.apiKeys, [G]: it } });
  }
  async function Ct() {
    R(!0), Z(null);
    try {
      const G = z === "openai" ? m.apiKeys.openai : z === "openrouter" ? m.apiKeys.openrouter : z === "anthropic" ? m.apiKeys.anthropic : z === "custom" ? m.apiKeys.custom : void 0, it = await t0(
        f,
        z,
        G,
        z === "custom" ? m.customBaseUrl : void 0
      );
      E(it);
    } catch (G) {
      Z(String(G));
    } finally {
      R(!1);
    }
  }
  async function L() {
    try {
      const G = await l0(f);
      window.open(G, "_blank"), ot(!0), Ut.current = Date.now(), lt.current = setInterval(async () => {
        try {
          const it = await pf(f);
          it.status === "logged_in" && (N(!0, it.email ?? null), ot(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null));
        } catch {
        }
        Date.now() - Ut.current > z0 && (ot(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null));
      }, A0);
    } catch (G) {
      dt(String(G));
    }
  }
  async function Mt() {
    try {
      await e0(f), N(!1, null), ot(!1), lt.current !== null && (clearInterval(lt.current), lt.current = null);
    } catch (G) {
      dt(String(G));
    }
  }
  const Dt = "gcp-model-datalist";
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ b.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ b.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: z,
          onChange: (G) => ht({ provider: G.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(Kd).map((G) => /* @__PURE__ */ b.jsx("option", { value: G, children: Kd[G] }, G))
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
            list: Dt,
            value: m.models[z] ?? "",
            onChange: (G) => Bt(G.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ b.jsx("datalist", { id: Dt, children: U.map((G) => /* @__PURE__ */ b.jsx("option", { value: G }, G)) }),
        /* @__PURE__ */ b.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: Ct,
            disabled: S,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: S ? "Loading..." : "Load list"
          }
        )
      ] }),
      j && /* @__PURE__ */ b.jsx("span", { className: "gcp-field-hint error", role: "alert", children: j })
    ] }),
    z !== "openai-codex" && _0.filter((G) => G === z || z === "custom" && G === "custom").map(
      (G) => G === z ? /* @__PURE__ */ b.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ b.jsx("label", { className: "gcp-label", children: G === "openai" ? "OpenAI API Key" : G === "anthropic" ? "Anthropic API Key" : G === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ b.jsx(
          O0,
          {
            value: m.apiKeys[G] ?? "",
            onBlur: (it) => Lt(G, it),
            placeholder: G === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": G === "openai" ? "OpenAI API key" : G === "anthropic" ? "Anthropic API key" : G === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, G) : null
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
          onChange: (G) => ht({ customBaseUrl: G.target.value }),
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
            className: `gcp-codex-status${g ? " signed-in" : V ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: g ? `Signed in${s ? ` as ${s}` : ""}` : V ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ b.jsxs("div", { className: "gcp-codex-btns", children: [
          !g && /* @__PURE__ */ b.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: L,
              disabled: V,
              "aria-label": "Sign in with ChatGPT Codex",
              children: V ? "Waiting..." : "Sign in"
            }
          ),
          g && /* @__PURE__ */ b.jsx(
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
function D0() {
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
function N0() {
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
function x0({
  api: f,
  settings: m,
  codexLoggedIn: g,
  codexEmail: s,
  conversation: N,
  onConversationChange: x,
  onSettingsChange: z,
  onCodexStatusChange: U,
  onNewConversation: E,
  onResumeConversation: S,
  onClose: R
}) {
  const [j, Z] = W.useState("chat"), ut = (ot) => {
    S(ot), Z("chat");
  }, dt = () => {
    E(), Z("chat");
  }, V = (ot) => {
    Z((lt) => lt === ot ? "chat" : ot);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-window", role: "dialog", "aria-label": "Graph Copilot", children: [
    /* @__PURE__ */ b.jsxs("div", { className: "gcp-header", children: [
      /* @__PURE__ */ b.jsxs("span", { className: "gcp-header-title", children: [
        /* @__PURE__ */ b.jsx("span", { className: "gcp-header-mark", "aria-hidden": "true", children: "✦" }),
        "Graph Copilot"
      ] }),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          className: `gcp-icon-btn${j === "history" ? " active" : ""}`,
          onClick: () => V("history"),
          "aria-label": "Conversation history",
          title: "History",
          children: /* @__PURE__ */ b.jsx(D0, {})
        }
      ),
      /* @__PURE__ */ b.jsx(
        "button",
        {
          className: `gcp-icon-btn${j === "settings" ? " active" : ""}`,
          onClick: () => V("settings"),
          "aria-label": "Settings",
          title: "Settings",
          children: /* @__PURE__ */ b.jsx(N0, {})
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
        b0,
        {
          api: f,
          settings: m,
          codexLoggedIn: g,
          conversation: N,
          onConversationChange: x,
          onOpenSettings: () => Z("settings")
        }
      ),
      j === "history" && /* @__PURE__ */ b.jsx(
        E0,
        {
          api: f,
          activeId: N.id,
          onResume: ut,
          onNew: dt
        }
      ),
      j === "settings" && /* @__PURE__ */ b.jsx(
        M0,
        {
          api: f,
          settings: m,
          codexLoggedIn: g,
          codexEmail: s,
          onCodexStatusChange: U,
          onChange: z
        }
      )
    ] })
  ] });
}
function j0({ api: f }) {
  const [m, g] = W.useState(!1), [s, N] = W.useState(() => Yy(f)), [x, z] = W.useState(!1), [U, E] = W.useState(null), [S, R] = W.useState(
    () => Hd(s.provider, s.models[s.provider] ?? "")
  );
  W.useEffect(() => {
    Gy(f, s);
  }, [f, s]), W.useEffect(() => {
    if (s.provider !== "openai-codex") return;
    let V = !1;
    return pf(f).then((ot) => {
      !V && ot.status === "logged_in" && (z(!0), E(ot.email ?? null));
    }).catch(() => {
    }), () => {
      V = !0;
    };
  }, [f, s.provider]);
  const j = (V) => {
    N(V);
  }, Z = (V, ot) => {
    z(V), E(ot);
  }, ut = () => {
    R(
      Hd(
        s.provider,
        s.models[s.provider] ?? ""
      )
    );
  }, dt = (V) => {
    R(V);
  };
  return /* @__PURE__ */ b.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ b.jsx(Vy, { onClick: () => g((V) => !V) }),
    m && /* @__PURE__ */ b.jsx(
      x0,
      {
        api: f,
        settings: s,
        codexLoggedIn: x,
        codexEmail: U,
        conversation: S,
        onConversationChange: R,
        onSettingsChange: j,
        onCodexStatusChange: Z,
        onNewConversation: ut,
        onResumeConversation: dt,
        onClose: () => g(!1)
      }
    )
  ] });
}
function U0(f) {
  const m = f.ui.addFloatingWidget({ id: "copilot" });
  By.createRoot(m).render(
    /* @__PURE__ */ b.jsx(Ny.StrictMode, { children: /* @__PURE__ */ b.jsx(j0, { api: f }) })
  );
}
export {
  U0 as default
};
