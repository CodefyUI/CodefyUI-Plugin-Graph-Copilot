(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #1e1e1e;--gcp-bg-deep: #16191f;--gcp-border: #2a2f3a;--gcp-text: #e5e7eb;--gcp-dim: #9ca3af;--gcp-accent: #06b6d4;--gcp-accent-ink: #0b1220;--gcp-danger: #f87171;position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:5px;height:5px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:3px}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-dim)}.gcp-fab{width:48px;height:48px;border-radius:50%;background:var(--gcp-accent);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px #06b6d44d;transition:filter .12s ease,transform .12s ease;outline:none}.gcp-fab:hover{filter:brightness(1.12);transform:scale(1.04)}.gcp-fab:active{transform:scale(.95)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:3px}.gcp-window{position:fixed;bottom:16px;right:16px;width:420px;height:min(600px,calc(100vh - 96px));background:var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:12px;display:flex;flex-direction:column;box-shadow:0 8px 32px #0006;overflow:hidden}.gcp-header{display:flex;align-items:center;padding:10px 12px;border-bottom:1px solid var(--gcp-border);gap:8px;background:var(--gcp-bg-deep);flex-shrink:0}.gcp-header-title{flex:1;font-weight:600;font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-icon-btn{width:28px;height:28px;border-radius:8px;border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:#ffffff12;color:var(--gcp-text)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent)}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-messages{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}.gcp-msg-row{display:flex;flex-direction:column}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}.gcp-bubble{max-width:85%;padding:8px 11px;border-radius:10px;line-height:1.5;word-break:break-word;white-space:pre-wrap;font-size:13px}.gcp-msg-row.user .gcp-bubble{background:#06b6d426;border:1px solid rgba(6,182,212,.25);color:var(--gcp-text)}.gcp-msg-row.assistant .gcp-bubble{background:#262b36;border:1px solid var(--gcp-border);color:var(--gcp-text)}.gcp-bubble.error{background:#f871711f;border:1px solid rgba(248,113,113,.3);color:var(--gcp-text)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:6px;padding:8px 10px;overflow-x:auto;font-size:12px;font-family:Cascadia Code,JetBrains Mono,Fira Code,monospace;margin:6px 0 0;white-space:pre}.gcp-bubble code{font-family:Cascadia Code,JetBrains Mono,Fira Code,monospace;font-size:12px}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;animation:gcp-blink .9s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-ops-chip{margin-top:5px;display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:6px;background:#06b6d41a;border:1px solid rgba(6,182,212,.2);color:var(--gcp-accent);font-size:11px;line-height:1.4}.gcp-retry-btn{margin-top:6px;padding:4px 10px;border-radius:8px;border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;cursor:pointer;transition:background .12s ease;align-self:flex-end}.gcp-retry-btn:hover{background:#f871711a}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-input-area{position:relative;padding:10px 12px;border-top:1px solid var(--gcp-border);display:flex;gap:8px;align-items:flex-end;flex-shrink:0;background:var(--gcp-bg-deep)}.gcp-textarea{flex:1;resize:none;background:var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:8px;color:var(--gcp-text);font-family:inherit;font-size:13px;padding:7px 10px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .12s ease}.gcp-textarea:focus{border-color:var(--gcp-accent)}.gcp-textarea:disabled{opacity:.5;cursor:not-allowed}.gcp-send-btn{width:34px;height:34px;border-radius:8px;border:none;background:var(--gcp-accent);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:filter .12s ease,transform .12s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.1)}.gcp-send-btn:active:not(:disabled){transform:scale(.95)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-stop-btn{width:34px;height:34px;border-radius:8px;border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .12s ease;outline:none}.gcp-stop-btn:hover{background:#f871711a}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#16191fd9;display:flex;align-items:center;justify-content:center;gap:10px;border-radius:0 0 12px 12px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--gcp-accent);background:transparent;color:var(--gcp-accent);font-size:12px;cursor:pointer;transition:background .12s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#06b6d41a}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:10px 12px;border-bottom:1px solid var(--gcp-border);flex-shrink:0}.gcp-new-btn{width:100%;padding:7px 12px;border-radius:8px;border:1px solid var(--gcp-accent);background:#06b6d414;color:var(--gcp-accent);font-size:13px;font-family:inherit;cursor:pointer;transition:background .12s ease;outline:none}.gcp-new-btn:hover{background:#06b6d426}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:6px 0}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;transition:background .12s ease;border-left:2px solid transparent}.gcp-history-item:hover{background:#ffffff0a}.gcp-history-item.active{border-left-color:var(--gcp-accent);background:#06b6d40f}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-history-meta{font-size:11px;color:var(--gcp-dim);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-history-delete{width:24px;height:24px;border-radius:6px;border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .12s ease,background .12s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711a}.gcp-history-delete.confirm{color:var(--gcp-danger);opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:32px 16px;text-align:center;color:var(--gcp-dim);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:14px 14px 18px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:5px}.gcp-label{font-size:11px;font-weight:600;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.05em}.gcp-select{width:100%;padding:7px 28px 7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;cursor:pointer;transition:border-color .12s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239ca3af' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center}.gcp-select:focus{border-color:var(--gcp-accent)}.gcp-input{width:100%;padding:7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .12s ease}.gcp-input:focus{border-color:var(--gcp-accent)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:7px 12px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:monospace}.gcp-show-btn{padding:7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:10px 12px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg-deep)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:#fbbf24}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--gcp-accent);background:transparent;color:var(--gcp-accent);font-size:12px;font-family:inherit;cursor:pointer;transition:background .12s ease;outline:none}.gcp-codex-btn:hover{background:#06b6d41a}.gcp-codex-btn.danger{border-color:var(--gcp-danger);color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711a}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-dim);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-dim);line-height:1.5;padding-top:4px;border-top:1px solid var(--gcp-border)}`)),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
function hy(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var nf = { exports: {} }, Su = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gd;
function my() {
  if (gd) return Su;
  gd = 1;
  var o = Symbol.for("react.transitional.element"), g = Symbol.for("react.fragment");
  function _(s, M, U) {
    var D = null;
    if (U !== void 0 && (D = "" + U), M.key !== void 0 && (D = "" + M.key), "key" in M) {
      U = {};
      for (var q in M)
        q !== "key" && (U[q] = M[q]);
    } else U = M;
    return M = U.ref, {
      $$typeof: o,
      type: s,
      key: D,
      ref: M !== void 0 ? M : null,
      props: U
    };
  }
  return Su.Fragment = g, Su.jsx = _, Su.jsxs = _, Su;
}
var pd;
function yy() {
  return pd || (pd = 1, nf.exports = my()), nf.exports;
}
var N = yy(), cf = { exports: {} }, J = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sd;
function vy() {
  if (Sd) return J;
  Sd = 1;
  var o = Symbol.for("react.transitional.element"), g = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), U = Symbol.for("react.consumer"), D = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), S = Symbol.for("react.memo"), R = Symbol.for("react.lazy"), C = Symbol.for("react.activity"), Q = Symbol.iterator;
  function nl(d) {
    return d === null || typeof d != "object" ? null : (d = Q && d[Q] || d["@@iterator"], typeof d == "function" ? d : null);
  }
  var dl = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, L = Object.assign, il = {};
  function P(d, O, H) {
    this.props = d, this.context = O, this.refs = il, this.updater = H || dl;
  }
  P.prototype.isReactComponent = {}, P.prototype.setState = function(d, O) {
    if (typeof d != "object" && typeof d != "function" && d != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, d, O, "setState");
  }, P.prototype.forceUpdate = function(d) {
    this.updater.enqueueForceUpdate(this, d, "forceUpdate");
  };
  function Bl() {
  }
  Bl.prototype = P.prototype;
  function ol(d, O, H) {
    this.props = d, this.context = O, this.refs = il, this.updater = H || dl;
  }
  var jl = ol.prototype = new Bl();
  jl.constructor = ol, L(jl, P.prototype), jl.isPureReactComponent = !0;
  var Gl = Array.isArray;
  function ul() {
  }
  var K = { H: null, A: null, T: null, S: null }, zl = Object.prototype.hasOwnProperty;
  function Xl(d, O, H) {
    var Y = H.ref;
    return {
      $$typeof: o,
      type: d,
      key: O,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function j(d, O) {
    return Xl(d.type, O, d.props);
  }
  function _l(d) {
    return typeof d == "object" && d !== null && d.$$typeof === o;
  }
  function cl(d) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + d.replace(/[=:]/g, function(H) {
      return O[H];
    });
  }
  var Nt = /\/+/g;
  function Il(d, O) {
    return typeof d == "object" && d !== null && d.key != null ? cl("" + d.key) : O.toString(36);
  }
  function Ql(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (typeof d.status == "string" ? d.then(ul, ul) : (d.status = "pending", d.then(
          function(O) {
            d.status === "pending" && (d.status = "fulfilled", d.value = O);
          },
          function(O) {
            d.status === "pending" && (d.status = "rejected", d.reason = O);
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
  function T(d, O, H, Y, w) {
    var k = typeof d;
    (k === "undefined" || k === "boolean") && (d = null);
    var hl = !1;
    if (d === null) hl = !0;
    else
      switch (k) {
        case "bigint":
        case "string":
        case "number":
          hl = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case o:
            case g:
              hl = !0;
              break;
            case R:
              return hl = d._init, T(
                hl(d._payload),
                O,
                H,
                Y,
                w
              );
          }
      }
    if (hl)
      return w = w(d), hl = Y === "" ? "." + Il(d, 0) : Y, Gl(w) ? (H = "", hl != null && (H = hl.replace(Nt, "$&/") + "/"), T(w, O, H, "", function(Oa) {
        return Oa;
      })) : w != null && (_l(w) && (w = j(
        w,
        H + (w.key == null || d && d.key === w.key ? "" : ("" + w.key).replace(
          Nt,
          "$&/"
        ) + "/") + hl
      )), O.push(w)), 1;
    hl = 0;
    var kl = Y === "" ? "." : Y + ":";
    if (Gl(d))
      for (var Nl = 0; Nl < d.length; Nl++)
        Y = d[Nl], k = kl + Il(Y, Nl), hl += T(
          Y,
          O,
          H,
          k,
          w
        );
    else if (Nl = nl(d), typeof Nl == "function")
      for (d = Nl.call(d), Nl = 0; !(Y = d.next()).done; )
        Y = Y.value, k = kl + Il(Y, Nl++), hl += T(
          Y,
          O,
          H,
          k,
          w
        );
    else if (k === "object") {
      if (typeof d.then == "function")
        return T(
          Ql(d),
          O,
          H,
          Y,
          w
        );
      throw O = String(d), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return hl;
  }
  function x(d, O, H) {
    if (d == null) return d;
    var Y = [], w = 0;
    return T(d, Y, "", "", function(k) {
      return O.call(H, k, w++);
    }), Y;
  }
  function V(d) {
    if (d._status === -1) {
      var O = d._result;
      O = O(), O.then(
        function(H) {
          (d._status === 0 || d._status === -1) && (d._status = 1, d._result = H);
        },
        function(H) {
          (d._status === 0 || d._status === -1) && (d._status = 2, d._result = H);
        }
      ), d._status === -1 && (d._status = 0, d._result = O);
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var vl = typeof reportError == "function" ? reportError : function(d) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
        error: d
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", d);
      return;
    }
    console.error(d);
  }, bl = {
    map: x,
    forEach: function(d, O, H) {
      x(
        d,
        function() {
          O.apply(this, arguments);
        },
        H
      );
    },
    count: function(d) {
      var O = 0;
      return x(d, function() {
        O++;
      }), O;
    },
    toArray: function(d) {
      return x(d, function(O) {
        return O;
      }) || [];
    },
    only: function(d) {
      if (!_l(d))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return d;
    }
  };
  return J.Activity = C, J.Children = bl, J.Component = P, J.Fragment = _, J.Profiler = M, J.PureComponent = ol, J.StrictMode = s, J.Suspense = z, J.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, J.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(d) {
      return K.H.useMemoCache(d);
    }
  }, J.cache = function(d) {
    return function() {
      return d.apply(null, arguments);
    };
  }, J.cacheSignal = function() {
    return null;
  }, J.cloneElement = function(d, O, H) {
    if (d == null)
      throw Error(
        "The argument must be a React element, but you passed " + d + "."
      );
    var Y = L({}, d.props), w = d.key;
    if (O != null)
      for (k in O.key !== void 0 && (w = "" + O.key), O)
        !zl.call(O, k) || k === "key" || k === "__self" || k === "__source" || k === "ref" && O.ref === void 0 || (Y[k] = O[k]);
    var k = arguments.length - 2;
    if (k === 1) Y.children = H;
    else if (1 < k) {
      for (var hl = Array(k), kl = 0; kl < k; kl++)
        hl[kl] = arguments[kl + 2];
      Y.children = hl;
    }
    return Xl(d.type, w, Y);
  }, J.createContext = function(d) {
    return d = {
      $$typeof: D,
      _currentValue: d,
      _currentValue2: d,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, d.Provider = d, d.Consumer = {
      $$typeof: U,
      _context: d
    }, d;
  }, J.createElement = function(d, O, H) {
    var Y, w = {}, k = null;
    if (O != null)
      for (Y in O.key !== void 0 && (k = "" + O.key), O)
        zl.call(O, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (w[Y] = O[Y]);
    var hl = arguments.length - 2;
    if (hl === 1) w.children = H;
    else if (1 < hl) {
      for (var kl = Array(hl), Nl = 0; Nl < hl; Nl++)
        kl[Nl] = arguments[Nl + 2];
      w.children = kl;
    }
    if (d && d.defaultProps)
      for (Y in hl = d.defaultProps, hl)
        w[Y] === void 0 && (w[Y] = hl[Y]);
    return Xl(d, k, w);
  }, J.createRef = function() {
    return { current: null };
  }, J.forwardRef = function(d) {
    return { $$typeof: q, render: d };
  }, J.isValidElement = _l, J.lazy = function(d) {
    return {
      $$typeof: R,
      _payload: { _status: -1, _result: d },
      _init: V
    };
  }, J.memo = function(d, O) {
    return {
      $$typeof: S,
      type: d,
      compare: O === void 0 ? null : O
    };
  }, J.startTransition = function(d) {
    var O = K.T, H = {};
    K.T = H;
    try {
      var Y = d(), w = K.S;
      w !== null && w(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(ul, vl);
    } catch (k) {
      vl(k);
    } finally {
      O !== null && H.types !== null && (O.types = H.types), K.T = O;
    }
  }, J.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, J.use = function(d) {
    return K.H.use(d);
  }, J.useActionState = function(d, O, H) {
    return K.H.useActionState(d, O, H);
  }, J.useCallback = function(d, O) {
    return K.H.useCallback(d, O);
  }, J.useContext = function(d) {
    return K.H.useContext(d);
  }, J.useDebugValue = function() {
  }, J.useDeferredValue = function(d, O) {
    return K.H.useDeferredValue(d, O);
  }, J.useEffect = function(d, O) {
    return K.H.useEffect(d, O);
  }, J.useEffectEvent = function(d) {
    return K.H.useEffectEvent(d);
  }, J.useId = function() {
    return K.H.useId();
  }, J.useImperativeHandle = function(d, O, H) {
    return K.H.useImperativeHandle(d, O, H);
  }, J.useInsertionEffect = function(d, O) {
    return K.H.useInsertionEffect(d, O);
  }, J.useLayoutEffect = function(d, O) {
    return K.H.useLayoutEffect(d, O);
  }, J.useMemo = function(d, O) {
    return K.H.useMemo(d, O);
  }, J.useOptimistic = function(d, O) {
    return K.H.useOptimistic(d, O);
  }, J.useReducer = function(d, O, H) {
    return K.H.useReducer(d, O, H);
  }, J.useRef = function(d) {
    return K.H.useRef(d);
  }, J.useState = function(d) {
    return K.H.useState(d);
  }, J.useSyncExternalStore = function(d, O, H) {
    return K.H.useSyncExternalStore(
      d,
      O,
      H
    );
  }, J.useTransition = function() {
    return K.H.useTransition();
  }, J.version = "19.2.7", J;
}
var bd;
function hf() {
  return bd || (bd = 1, cf.exports = vy()), cf.exports;
}
var el = hf();
const gy = /* @__PURE__ */ hy(el);
var ff = { exports: {} }, bu = {}, sf = { exports: {} }, of = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Td;
function py() {
  return Td || (Td = 1, (function(o) {
    function g(T, x) {
      var V = T.length;
      T.push(x);
      l: for (; 0 < V; ) {
        var vl = V - 1 >>> 1, bl = T[vl];
        if (0 < M(bl, x))
          T[vl] = x, T[V] = bl, V = vl;
        else break l;
      }
    }
    function _(T) {
      return T.length === 0 ? null : T[0];
    }
    function s(T) {
      if (T.length === 0) return null;
      var x = T[0], V = T.pop();
      if (V !== x) {
        T[0] = V;
        l: for (var vl = 0, bl = T.length, d = bl >>> 1; vl < d; ) {
          var O = 2 * (vl + 1) - 1, H = T[O], Y = O + 1, w = T[Y];
          if (0 > M(H, V))
            Y < bl && 0 > M(w, H) ? (T[vl] = w, T[Y] = V, vl = Y) : (T[vl] = H, T[O] = V, vl = O);
          else if (Y < bl && 0 > M(w, V))
            T[vl] = w, T[Y] = V, vl = Y;
          else break l;
        }
      }
      return x;
    }
    function M(T, x) {
      var V = T.sortIndex - x.sortIndex;
      return V !== 0 ? V : T.id - x.id;
    }
    if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var U = performance;
      o.unstable_now = function() {
        return U.now();
      };
    } else {
      var D = Date, q = D.now();
      o.unstable_now = function() {
        return D.now() - q;
      };
    }
    var z = [], S = [], R = 1, C = null, Q = 3, nl = !1, dl = !1, L = !1, il = !1, P = typeof setTimeout == "function" ? setTimeout : null, Bl = typeof clearTimeout == "function" ? clearTimeout : null, ol = typeof setImmediate < "u" ? setImmediate : null;
    function jl(T) {
      for (var x = _(S); x !== null; ) {
        if (x.callback === null) s(S);
        else if (x.startTime <= T)
          s(S), x.sortIndex = x.expirationTime, g(z, x);
        else break;
        x = _(S);
      }
    }
    function Gl(T) {
      if (L = !1, jl(T), !dl)
        if (_(z) !== null)
          dl = !0, ul || (ul = !0, cl());
        else {
          var x = _(S);
          x !== null && Ql(Gl, x.startTime - T);
        }
    }
    var ul = !1, K = -1, zl = 5, Xl = -1;
    function j() {
      return il ? !0 : !(o.unstable_now() - Xl < zl);
    }
    function _l() {
      if (il = !1, ul) {
        var T = o.unstable_now();
        Xl = T;
        var x = !0;
        try {
          l: {
            dl = !1, L && (L = !1, Bl(K), K = -1), nl = !0;
            var V = Q;
            try {
              t: {
                for (jl(T), C = _(z); C !== null && !(C.expirationTime > T && j()); ) {
                  var vl = C.callback;
                  if (typeof vl == "function") {
                    C.callback = null, Q = C.priorityLevel;
                    var bl = vl(
                      C.expirationTime <= T
                    );
                    if (T = o.unstable_now(), typeof bl == "function") {
                      C.callback = bl, jl(T), x = !0;
                      break t;
                    }
                    C === _(z) && s(z), jl(T);
                  } else s(z);
                  C = _(z);
                }
                if (C !== null) x = !0;
                else {
                  var d = _(S);
                  d !== null && Ql(
                    Gl,
                    d.startTime - T
                  ), x = !1;
                }
              }
              break l;
            } finally {
              C = null, Q = V, nl = !1;
            }
            x = void 0;
          }
        } finally {
          x ? cl() : ul = !1;
        }
      }
    }
    var cl;
    if (typeof ol == "function")
      cl = function() {
        ol(_l);
      };
    else if (typeof MessageChannel < "u") {
      var Nt = new MessageChannel(), Il = Nt.port2;
      Nt.port1.onmessage = _l, cl = function() {
        Il.postMessage(null);
      };
    } else
      cl = function() {
        P(_l, 0);
      };
    function Ql(T, x) {
      K = P(function() {
        T(o.unstable_now());
      }, x);
    }
    o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(T) {
      T.callback = null;
    }, o.unstable_forceFrameRate = function(T) {
      0 > T || 125 < T ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : zl = 0 < T ? Math.floor(1e3 / T) : 5;
    }, o.unstable_getCurrentPriorityLevel = function() {
      return Q;
    }, o.unstable_next = function(T) {
      switch (Q) {
        case 1:
        case 2:
        case 3:
          var x = 3;
          break;
        default:
          x = Q;
      }
      var V = Q;
      Q = x;
      try {
        return T();
      } finally {
        Q = V;
      }
    }, o.unstable_requestPaint = function() {
      il = !0;
    }, o.unstable_runWithPriority = function(T, x) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var V = Q;
      Q = T;
      try {
        return x();
      } finally {
        Q = V;
      }
    }, o.unstable_scheduleCallback = function(T, x, V) {
      var vl = o.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? vl + V : vl) : V = vl, T) {
        case 1:
          var bl = -1;
          break;
        case 2:
          bl = 250;
          break;
        case 5:
          bl = 1073741823;
          break;
        case 4:
          bl = 1e4;
          break;
        default:
          bl = 5e3;
      }
      return bl = V + bl, T = {
        id: R++,
        callback: x,
        priorityLevel: T,
        startTime: V,
        expirationTime: bl,
        sortIndex: -1
      }, V > vl ? (T.sortIndex = V, g(S, T), _(z) === null && T === _(S) && (L ? (Bl(K), K = -1) : L = !0, Ql(Gl, V - vl))) : (T.sortIndex = bl, g(z, T), dl || nl || (dl = !0, ul || (ul = !0, cl()))), T;
    }, o.unstable_shouldYield = j, o.unstable_wrapCallback = function(T) {
      var x = Q;
      return function() {
        var V = Q;
        Q = x;
        try {
          return T.apply(this, arguments);
        } finally {
          Q = V;
        }
      };
    };
  })(of)), of;
}
var _d;
function Sy() {
  return _d || (_d = 1, sf.exports = py()), sf.exports;
}
var rf = { exports: {} }, Wl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ed;
function by() {
  if (Ed) return Wl;
  Ed = 1;
  var o = hf();
  function g(z) {
    var S = "https://react.dev/errors/" + z;
    if (1 < arguments.length) {
      S += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var R = 2; R < arguments.length; R++)
        S += "&args[]=" + encodeURIComponent(arguments[R]);
    }
    return "Minified React error #" + z + "; visit " + S + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function _() {
  }
  var s = {
    d: {
      f: _,
      r: function() {
        throw Error(g(522));
      },
      D: _,
      C: _,
      L: _,
      m: _,
      X: _,
      S: _,
      M: _
    },
    p: 0,
    findDOMNode: null
  }, M = Symbol.for("react.portal");
  function U(z, S, R) {
    var C = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: M,
      key: C == null ? null : "" + C,
      children: z,
      containerInfo: S,
      implementation: R
    };
  }
  var D = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(z, S) {
    if (z === "font") return "";
    if (typeof S == "string")
      return S === "use-credentials" ? S : "";
  }
  return Wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Wl.createPortal = function(z, S) {
    var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!S || S.nodeType !== 1 && S.nodeType !== 9 && S.nodeType !== 11)
      throw Error(g(299));
    return U(z, S, null, R);
  }, Wl.flushSync = function(z) {
    var S = D.T, R = s.p;
    try {
      if (D.T = null, s.p = 2, z) return z();
    } finally {
      D.T = S, s.p = R, s.d.f();
    }
  }, Wl.preconnect = function(z, S) {
    typeof z == "string" && (S ? (S = S.crossOrigin, S = typeof S == "string" ? S === "use-credentials" ? S : "" : void 0) : S = null, s.d.C(z, S));
  }, Wl.prefetchDNS = function(z) {
    typeof z == "string" && s.d.D(z);
  }, Wl.preinit = function(z, S) {
    if (typeof z == "string" && S && typeof S.as == "string") {
      var R = S.as, C = q(R, S.crossOrigin), Q = typeof S.integrity == "string" ? S.integrity : void 0, nl = typeof S.fetchPriority == "string" ? S.fetchPriority : void 0;
      R === "style" ? s.d.S(
        z,
        typeof S.precedence == "string" ? S.precedence : void 0,
        {
          crossOrigin: C,
          integrity: Q,
          fetchPriority: nl
        }
      ) : R === "script" && s.d.X(z, {
        crossOrigin: C,
        integrity: Q,
        fetchPriority: nl,
        nonce: typeof S.nonce == "string" ? S.nonce : void 0
      });
    }
  }, Wl.preinitModule = function(z, S) {
    if (typeof z == "string")
      if (typeof S == "object" && S !== null) {
        if (S.as == null || S.as === "script") {
          var R = q(
            S.as,
            S.crossOrigin
          );
          s.d.M(z, {
            crossOrigin: R,
            integrity: typeof S.integrity == "string" ? S.integrity : void 0,
            nonce: typeof S.nonce == "string" ? S.nonce : void 0
          });
        }
      } else S == null && s.d.M(z);
  }, Wl.preload = function(z, S) {
    if (typeof z == "string" && typeof S == "object" && S !== null && typeof S.as == "string") {
      var R = S.as, C = q(R, S.crossOrigin);
      s.d.L(z, R, {
        crossOrigin: C,
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
  }, Wl.preloadModule = function(z, S) {
    if (typeof z == "string")
      if (S) {
        var R = q(S.as, S.crossOrigin);
        s.d.m(z, {
          as: typeof S.as == "string" && S.as !== "script" ? S.as : void 0,
          crossOrigin: R,
          integrity: typeof S.integrity == "string" ? S.integrity : void 0
        });
      } else s.d.m(z);
  }, Wl.requestFormReset = function(z) {
    s.d.r(z);
  }, Wl.unstable_batchedUpdates = function(z, S) {
    return z(S);
  }, Wl.useFormState = function(z, S, R) {
    return D.H.useFormState(z, S, R);
  }, Wl.useFormStatus = function() {
    return D.H.useHostTransitionStatus();
  }, Wl.version = "19.2.7", Wl;
}
var Ad;
function Ty() {
  if (Ad) return rf.exports;
  Ad = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (g) {
        console.error(g);
      }
  }
  return o(), rf.exports = by(), rf.exports;
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
var zd;
function _y() {
  if (zd) return bu;
  zd = 1;
  var o = Sy(), g = hf(), _ = Ty();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function U(l) {
    var t = l, e = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (e = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? e : null;
  }
  function D(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function q(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (t === null && (l = l.alternate, l !== null && (t = l.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function z(l) {
    if (U(l) !== l)
      throw Error(s(188));
  }
  function S(l) {
    var t = l.alternate;
    if (!t) {
      if (t = U(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var u = e.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (a = u.return, a !== null) {
          e = a;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === e) return z(u), l;
          if (n === a) return z(u), t;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (e.return !== a.return) e = u, a = n;
      else {
        for (var i = !1, c = u.child; c; ) {
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
        if (!i) {
          for (c = n.child; c; ) {
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
          if (!i) throw Error(s(189));
        }
      }
      if (e.alternate !== a) throw Error(s(190));
    }
    if (e.tag !== 3) throw Error(s(188));
    return e.stateNode.current === e ? l : t;
  }
  function R(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = R(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var C = Object.assign, Q = Symbol.for("react.element"), nl = Symbol.for("react.transitional.element"), dl = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), il = Symbol.for("react.strict_mode"), P = Symbol.for("react.profiler"), Bl = Symbol.for("react.consumer"), ol = Symbol.for("react.context"), jl = Symbol.for("react.forward_ref"), Gl = Symbol.for("react.suspense"), ul = Symbol.for("react.suspense_list"), K = Symbol.for("react.memo"), zl = Symbol.for("react.lazy"), Xl = Symbol.for("react.activity"), j = Symbol.for("react.memo_cache_sentinel"), _l = Symbol.iterator;
  function cl(l) {
    return l === null || typeof l != "object" ? null : (l = _l && l[_l] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Nt = Symbol.for("react.client.reference");
  function Il(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Nt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case L:
        return "Fragment";
      case P:
        return "Profiler";
      case il:
        return "StrictMode";
      case Gl:
        return "Suspense";
      case ul:
        return "SuspenseList";
      case Xl:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case dl:
          return "Portal";
        case ol:
          return l.displayName || "Context";
        case Bl:
          return (l._context.displayName || "Context") + ".Consumer";
        case jl:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case K:
          return t = l.displayName || null, t !== null ? t : Il(l.type) || "Memo";
        case zl:
          t = l._payload, l = l._init;
          try {
            return Il(l(t));
          } catch {
          }
      }
    return null;
  }
  var Ql = Array.isArray, T = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, x = _.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, vl = [], bl = -1;
  function d(l) {
    return { current: l };
  }
  function O(l) {
    0 > bl || (l.current = vl[bl], vl[bl] = null, bl--);
  }
  function H(l, t) {
    bl++, vl[bl] = l.current, l.current = t;
  }
  var Y = d(null), w = d(null), k = d(null), hl = d(null);
  function kl(l, t) {
    switch (H(k, t), H(w, l), H(Y, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Xr(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Xr(t), l = Qr(t, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    O(Y), H(Y, l);
  }
  function Nl() {
    O(Y), O(w), O(k);
  }
  function Oa(l) {
    l.memoizedState !== null && H(hl, l);
    var t = Y.current, e = Qr(t, l.type);
    t !== e && (H(w, l), H(Y, e));
  }
  function _u(l) {
    w.current === l && (O(Y), O(w)), hl.current === l && (O(hl), yu._currentValue = V);
  }
  var Qn, yf;
  function Ee(l) {
    if (Qn === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        Qn = t && t[1] || "", yf = -1 < e.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qn + l + yf;
  }
  var Ln = !1;
  function Zn(l, t) {
    if (!l || Ln) return "";
    Ln = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var A = function() {
                throw Error();
              };
              if (Object.defineProperty(A.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(A, []);
                } catch (p) {
                  var v = p;
                }
                Reflect.construct(l, [], A);
              } else {
                try {
                  A.call();
                } catch (p) {
                  v = p;
                }
                l.call(A.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (p) {
                v = p;
              }
              (A = l()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (p) {
            if (p && v && typeof p.stack == "string")
              return [p.stack, v.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = a.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), y = c.split(`
`);
        for (u = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; u < y.length && !y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (a === f.length || u === y.length)
          for (a = f.length - 1, u = y.length - 1; 1 <= a && 0 <= u && f[a] !== y[u]; )
            u--;
        for (; 1 <= a && 0 <= u; a--, u--)
          if (f[a] !== y[u]) {
            if (a !== 1 || u !== 1)
              do
                if (a--, u--, 0 > u || f[a] !== y[u]) {
                  var b = `
` + f[a].replace(" at new ", " at ");
                  return l.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", l.displayName)), b;
                }
              while (1 <= a && 0 <= u);
            break;
          }
      }
    } finally {
      Ln = !1, Error.prepareStackTrace = e;
    }
    return (e = l ? l.displayName || l.name : "") ? Ee(e) : "";
  }
  function Vd(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Ee(l.type);
      case 16:
        return Ee("Lazy");
      case 13:
        return l.child !== t && t !== null ? Ee("Suspense Fallback") : Ee("Suspense");
      case 19:
        return Ee("SuspenseList");
      case 0:
      case 15:
        return Zn(l.type, !1);
      case 11:
        return Zn(l.type.render, !1);
      case 1:
        return Zn(l.type, !0);
      case 31:
        return Ee("Activity");
      default:
        return "";
    }
  }
  function vf(l) {
    try {
      var t = "", e = null;
      do
        t += Vd(l, e), e = l, l = l.return;
      while (l);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  var Vn = Object.prototype.hasOwnProperty, Kn = o.unstable_scheduleCallback, Jn = o.unstable_cancelCallback, Kd = o.unstable_shouldYield, Jd = o.unstable_requestPaint, it = o.unstable_now, wd = o.unstable_getCurrentPriorityLevel, gf = o.unstable_ImmediatePriority, pf = o.unstable_UserBlockingPriority, Eu = o.unstable_NormalPriority, $d = o.unstable_LowPriority, Sf = o.unstable_IdlePriority, Wd = o.log, kd = o.unstable_setDisableYieldValue, Ma = null, ct = null;
  function It(l) {
    if (typeof Wd == "function" && kd(l), ct && typeof ct.setStrictMode == "function")
      try {
        ct.setStrictMode(Ma, l);
      } catch {
      }
  }
  var ft = Math.clz32 ? Math.clz32 : Pd, Fd = Math.log, Id = Math.LN2;
  function Pd(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Fd(l) / Id | 0) | 0;
  }
  var Au = 256, zu = 262144, Ou = 4194304;
  function Ae(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
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
        return l & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
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
        return l;
    }
  }
  function Mu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = a & 134217727;
    return c !== 0 ? (a = c & ~n, a !== 0 ? u = Ae(a) : (i &= c, i !== 0 ? u = Ae(i) : e || (e = c & ~l, e !== 0 && (u = Ae(e))))) : (c = a & ~n, c !== 0 ? u = Ae(c) : i !== 0 ? u = Ae(i) : e || (e = a & ~l, e !== 0 && (u = Ae(e)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, e = t & -t, n >= e || n === 32 && (e & 4194048) !== 0) ? t : u;
  }
  function Da(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function lh(l, t) {
    switch (l) {
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
  function bf() {
    var l = Ou;
    return Ou <<= 1, (Ou & 62914560) === 0 && (Ou = 4194304), l;
  }
  function wn(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Na(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function th(l, t, e, a, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = e, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= e, l.entangledLanes &= e, l.errorRecoveryDisabledLanes &= e, l.shellSuspendCounter = 0;
    var c = l.entanglements, f = l.expirationTimes, y = l.hiddenUpdates;
    for (e = i & ~e; 0 < e; ) {
      var b = 31 - ft(e), A = 1 << b;
      c[b] = 0, f[b] = -1;
      var v = y[b];
      if (v !== null)
        for (y[b] = null, b = 0; b < v.length; b++) {
          var p = v[b];
          p !== null && (p.lane &= -536870913);
        }
      e &= ~A;
    }
    a !== 0 && Tf(l, a, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function Tf(l, t, e) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var a = 31 - ft(t);
    l.entangledLanes |= t, l.entanglements[a] = l.entanglements[a] | 1073741824 | e & 261930;
  }
  function _f(l, t) {
    var e = l.entangledLanes |= t;
    for (l = l.entanglements; e; ) {
      var a = 31 - ft(e), u = 1 << a;
      u & t | l[a] & t && (l[a] |= t), e &= ~u;
    }
  }
  function Ef(l, t) {
    var e = t & -t;
    return e = (e & 42) !== 0 ? 1 : $n(e), (e & (l.suspendedLanes | t)) !== 0 ? 0 : e;
  }
  function $n(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
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
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function Wn(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Af() {
    var l = x.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : od(l.type));
  }
  function zf(l, t) {
    var e = x.p;
    try {
      return x.p = l, t();
    } finally {
      x.p = e;
    }
  }
  var Pt = Math.random().toString(36).slice(2), Vl = "__reactFiber$" + Pt, Pl = "__reactProps$" + Pt, Le = "__reactContainer$" + Pt, kn = "__reactEvents$" + Pt, eh = "__reactListeners$" + Pt, ah = "__reactHandles$" + Pt, Of = "__reactResources$" + Pt, Ua = "__reactMarker$" + Pt;
  function Fn(l) {
    delete l[Vl], delete l[Pl], delete l[kn], delete l[eh], delete l[ah];
  }
  function Ze(l) {
    var t = l[Vl];
    if (t) return t;
    for (var e = l.parentNode; e; ) {
      if (t = e[Le] || e[Vl]) {
        if (e = t.alternate, t.child !== null || e !== null && e.child !== null)
          for (l = $r(l); l !== null; ) {
            if (e = l[Vl]) return e;
            l = $r(l);
          }
        return t;
      }
      l = e, e = l.parentNode;
    }
    return null;
  }
  function Ve(l) {
    if (l = l[Vl] || l[Le]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Ca(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function Ke(l) {
    var t = l[Of];
    return t || (t = l[Of] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ll(l) {
    l[Ua] = !0;
  }
  var Mf = /* @__PURE__ */ new Set(), Df = {};
  function ze(l, t) {
    Je(l, t), Je(l + "Capture", t);
  }
  function Je(l, t) {
    for (Df[l] = t, l = 0; l < t.length; l++)
      Mf.add(t[l]);
  }
  var uh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Nf = {}, Uf = {};
  function nh(l) {
    return Vn.call(Uf, l) ? !0 : Vn.call(Nf, l) ? !1 : uh.test(l) ? Uf[l] = !0 : (Nf[l] = !0, !1);
  }
  function Du(l, t, e) {
    if (nh(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + e);
      }
  }
  function Nu(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + e);
    }
  }
  function Rt(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, "" + a);
    }
  }
  function vt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Cf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function ih(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
      var u = a.get, n = a.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          e = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: a.enumerable
      }), {
        getValue: function() {
          return e;
        },
        setValue: function(i) {
          e = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function In(l) {
    if (!l._valueTracker) {
      var t = Cf(l) ? "checked" : "value";
      l._valueTracker = ih(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function jf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(), a = "";
    return l && (a = Cf(l) ? l.checked ? "true" : "false" : l.value), l = a, l !== e ? (t.setValue(l), !0) : !1;
  }
  function Uu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var ch = /[\n"\\]/g;
  function gt(l) {
    return l.replace(
      ch,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pn(l, t, e, a, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + vt(t)) : l.value !== "" + vt(t) && (l.value = "" + vt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? li(l, i, vt(t)) : e != null ? li(l, i, vt(e)) : a != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + vt(c) : l.removeAttribute("name");
  }
  function xf(l, t, e, a, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || e != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        In(l);
        return;
      }
      e = e != null ? "" + vt(e) : "", t = t != null ? "" + vt(t) : e, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    a = a ?? u, a = typeof a != "function" && typeof a != "symbol" && !!a, l.checked = c ? l.checked : !!a, l.defaultChecked = !!a, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), In(l);
  }
  function li(l, t, e) {
    t === "number" && Uu(l.ownerDocument) === l || l.defaultValue === "" + e || (l.defaultValue = "" + e);
  }
  function we(l, t, e, a) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < e.length; u++)
        t["$" + e[u]] = !0;
      for (e = 0; e < l.length; e++)
        u = t.hasOwnProperty("$" + l[e].value), l[e].selected !== u && (l[e].selected = u), u && a && (l[e].defaultSelected = !0);
    } else {
      for (e = "" + vt(e), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === e) {
          l[u].selected = !0, a && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rf(l, t, e) {
    if (t != null && (t = "" + vt(t), t !== l.value && (l.value = t), e == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + vt(e) : "";
  }
  function Hf(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(s(92));
        if (Ql(a)) {
          if (1 < a.length) throw Error(s(93));
          a = a[0];
        }
        e = a;
      }
      e == null && (e = ""), t = e;
    }
    e = vt(t), l.defaultValue = e, a = l.textContent, a === e && a !== "" && a !== null && (l.value = a), In(l);
  }
  function $e(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var fh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qf(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === "" ? a ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : a ? l.setProperty(t, e) : typeof e != "number" || e === 0 || fh.has(t) ? t === "float" ? l.cssFloat = e : l[t] = ("" + e).trim() : l[t] = e + "px";
  }
  function Bf(l, t, e) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (l = l.style, e != null) {
      for (var a in e)
        !e.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "");
      for (var u in t)
        a = t[u], t.hasOwnProperty(u) && e[u] !== a && qf(l, u, a);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && qf(l, n, t[n]);
  }
  function ti(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
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
  var sh = /* @__PURE__ */ new Map([
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
  ]), oh = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cu(l) {
    return oh.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function Ht() {
  }
  var ei = null;
  function ai(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var We = null, ke = null;
  function Yf(l) {
    var t = Ve(l);
    if (t && (l = t.stateNode)) {
      var e = l[Pl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Pn(
            l,
            e.value,
            e.defaultValue,
            e.defaultValue,
            e.checked,
            e.defaultChecked,
            e.type,
            e.name
          ), t = e.name, e.type === "radio" && t != null) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (e = e.querySelectorAll(
              'input[name="' + gt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < e.length; t++) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var u = a[Pl] || null;
                if (!u) throw Error(s(90));
                Pn(
                  a,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < e.length; t++)
              a = e[t], a.form === l.form && jf(a);
          }
          break l;
        case "textarea":
          Rf(l, e.value, e.defaultValue);
          break l;
        case "select":
          t = e.value, t != null && we(l, !!e.multiple, t, !1);
      }
    }
  }
  var ui = !1;
  function Gf(l, t, e) {
    if (ui) return l(t, e);
    ui = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (ui = !1, (We !== null || ke !== null) && (Sn(), We && (t = We, l = ke, ke = We = null, Yf(t), l)))
        for (t = 0; t < l.length; t++) Yf(l[t]);
    }
  }
  function ja(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[Pl] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
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
        (a = !a.disabled) || (l = l.type, a = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !a;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function")
      throw Error(
        s(231, t, typeof e)
      );
    return e;
  }
  var qt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ni = !1;
  if (qt)
    try {
      var xa = {};
      Object.defineProperty(xa, "passive", {
        get: function() {
          ni = !0;
        }
      }), window.addEventListener("test", xa, xa), window.removeEventListener("test", xa, xa);
    } catch {
      ni = !1;
    }
  var le = null, ii = null, ju = null;
  function Xf() {
    if (ju) return ju;
    var l, t = ii, e = t.length, a, u = "value" in le ? le.value : le.textContent, n = u.length;
    for (l = 0; l < e && t[l] === u[l]; l++) ;
    var i = e - l;
    for (a = 1; a <= i && t[e - a] === u[n - a]; a++) ;
    return ju = u.slice(l, 1 < a ? 1 - a : void 0);
  }
  function xu(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Ru() {
    return !0;
  }
  function Qf() {
    return !1;
  }
  function lt(l) {
    function t(e, a, u, n, i) {
      this._reactName = e, this._targetInst = u, this.type = a, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (e = l[c], this[c] = e ? e(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Ru : Qf, this.isPropagationStopped = Qf, this;
    }
    return C(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = Ru);
      },
      stopPropagation: function() {
        var e = this.nativeEvent;
        e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = Ru);
      },
      persist: function() {
      },
      isPersistent: Ru
    }), t;
  }
  var Oe = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Hu = lt(Oe), Ra = C({}, Oe, { view: 0, detail: 0 }), rh = lt(Ra), ci, fi, Ha, qu = C({}, Ra, {
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
    getModifierState: oi,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== Ha && (Ha && l.type === "mousemove" ? (ci = l.screenX - Ha.screenX, fi = l.screenY - Ha.screenY) : fi = ci = 0, Ha = l), ci);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : fi;
    }
  }), Lf = lt(qu), dh = C({}, qu, { dataTransfer: 0 }), hh = lt(dh), mh = C({}, Ra, { relatedTarget: 0 }), si = lt(mh), yh = C({}, Oe, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vh = lt(yh), gh = C({}, Oe, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), ph = lt(gh), Sh = C({}, Oe, { data: 0 }), Zf = lt(Sh), bh = {
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
  }, Th = {
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
  }, _h = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Eh(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = _h[l]) ? !!t[l] : !1;
  }
  function oi() {
    return Eh;
  }
  var Ah = C({}, Ra, {
    key: function(l) {
      if (l.key) {
        var t = bh[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = xu(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Th[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: oi,
    charCode: function(l) {
      return l.type === "keypress" ? xu(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? xu(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), zh = lt(Ah), Oh = C({}, qu, {
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
  }), Vf = lt(Oh), Mh = C({}, Ra, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: oi
  }), Dh = lt(Mh), Nh = C({}, Oe, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Uh = lt(Nh), Ch = C({}, qu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), jh = lt(Ch), xh = C({}, Oe, {
    newState: 0,
    oldState: 0
  }), Rh = lt(xh), Hh = [9, 13, 27, 32], ri = qt && "CompositionEvent" in window, qa = null;
  qt && "documentMode" in document && (qa = document.documentMode);
  var qh = qt && "TextEvent" in window && !qa, Kf = qt && (!ri || qa && 8 < qa && 11 >= qa), Jf = " ", wf = !1;
  function $f(l, t) {
    switch (l) {
      case "keyup":
        return Hh.indexOf(t.keyCode) !== -1;
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
  function Wf(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Fe = !1;
  function Bh(l, t) {
    switch (l) {
      case "compositionend":
        return Wf(t);
      case "keypress":
        return t.which !== 32 ? null : (wf = !0, Jf);
      case "textInput":
        return l = t.data, l === Jf && wf ? null : l;
      default:
        return null;
    }
  }
  function Yh(l, t) {
    if (Fe)
      return l === "compositionend" || !ri && $f(l, t) ? (l = Xf(), ju = ii = le = null, Fe = !1, l) : null;
    switch (l) {
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
        return Kf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Gh = {
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
  function kf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Gh[l.type] : t === "textarea";
  }
  function Ff(l, t, e, a) {
    We ? ke ? ke.push(a) : ke = [a] : We = a, t = On(t, "onChange"), 0 < t.length && (e = new Hu(
      "onChange",
      "change",
      null,
      e,
      a
    ), l.push({ event: e, listeners: t }));
  }
  var Ba = null, Ya = null;
  function Xh(l) {
    Rr(l, 0);
  }
  function Bu(l) {
    var t = Ca(l);
    if (jf(t)) return l;
  }
  function If(l, t) {
    if (l === "change") return t;
  }
  var Pf = !1;
  if (qt) {
    var di;
    if (qt) {
      var hi = "oninput" in document;
      if (!hi) {
        var ls = document.createElement("div");
        ls.setAttribute("oninput", "return;"), hi = typeof ls.oninput == "function";
      }
      di = hi;
    } else di = !1;
    Pf = di && (!document.documentMode || 9 < document.documentMode);
  }
  function ts() {
    Ba && (Ba.detachEvent("onpropertychange", es), Ya = Ba = null);
  }
  function es(l) {
    if (l.propertyName === "value" && Bu(Ya)) {
      var t = [];
      Ff(
        t,
        Ya,
        l,
        ai(l)
      ), Gf(Xh, t);
    }
  }
  function Qh(l, t, e) {
    l === "focusin" ? (ts(), Ba = t, Ya = e, Ba.attachEvent("onpropertychange", es)) : l === "focusout" && ts();
  }
  function Lh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Bu(Ya);
  }
  function Zh(l, t) {
    if (l === "click") return Bu(t);
  }
  function Vh(l, t) {
    if (l === "input" || l === "change")
      return Bu(t);
  }
  function Kh(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : Kh;
  function Ga(l, t) {
    if (st(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var e = Object.keys(l), a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var u = e[a];
      if (!Vn.call(t, u) || !st(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function as(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function us(l, t) {
    var e = as(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (a = l + e.textContent.length, l <= t && a >= t)
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = as(e);
    }
  }
  function ns(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ns(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function is(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Uu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Uu(l.document);
    }
    return t;
  }
  function mi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Jh = qt && "documentMode" in document && 11 >= document.documentMode, Ie = null, yi = null, Xa = null, vi = !1;
  function cs(l, t, e) {
    var a = e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    vi || Ie == null || Ie !== Uu(a) || (a = Ie, "selectionStart" in a && mi(a) ? a = { start: a.selectionStart, end: a.selectionEnd } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
      anchorNode: a.anchorNode,
      anchorOffset: a.anchorOffset,
      focusNode: a.focusNode,
      focusOffset: a.focusOffset
    }), Xa && Ga(Xa, a) || (Xa = a, a = On(yi, "onSelect"), 0 < a.length && (t = new Hu(
      "onSelect",
      "select",
      null,
      t,
      e
    ), l.push({ event: t, listeners: a }), t.target = Ie)));
  }
  function Me(l, t) {
    var e = {};
    return e[l.toLowerCase()] = t.toLowerCase(), e["Webkit" + l] = "webkit" + t, e["Moz" + l] = "moz" + t, e;
  }
  var Pe = {
    animationend: Me("Animation", "AnimationEnd"),
    animationiteration: Me("Animation", "AnimationIteration"),
    animationstart: Me("Animation", "AnimationStart"),
    transitionrun: Me("Transition", "TransitionRun"),
    transitionstart: Me("Transition", "TransitionStart"),
    transitioncancel: Me("Transition", "TransitionCancel"),
    transitionend: Me("Transition", "TransitionEnd")
  }, gi = {}, fs = {};
  qt && (fs = document.createElement("div").style, "AnimationEvent" in window || (delete Pe.animationend.animation, delete Pe.animationiteration.animation, delete Pe.animationstart.animation), "TransitionEvent" in window || delete Pe.transitionend.transition);
  function De(l) {
    if (gi[l]) return gi[l];
    if (!Pe[l]) return l;
    var t = Pe[l], e;
    for (e in t)
      if (t.hasOwnProperty(e) && e in fs)
        return gi[l] = t[e];
    return l;
  }
  var ss = De("animationend"), os = De("animationiteration"), rs = De("animationstart"), wh = De("transitionrun"), $h = De("transitionstart"), Wh = De("transitioncancel"), ds = De("transitionend"), hs = /* @__PURE__ */ new Map(), pi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pi.push("scrollEnd");
  function Ot(l, t) {
    hs.set(l, t), ze(t, [l]);
  }
  var Yu = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  }, pt = [], la = 0, Si = 0;
  function Gu() {
    for (var l = la, t = Si = la = 0; t < l; ) {
      var e = pt[t];
      pt[t++] = null;
      var a = pt[t];
      pt[t++] = null;
      var u = pt[t];
      pt[t++] = null;
      var n = pt[t];
      if (pt[t++] = null, a !== null && u !== null) {
        var i = a.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), a.pending = u;
      }
      n !== 0 && ms(e, u, n);
    }
  }
  function Xu(l, t, e, a) {
    pt[la++] = l, pt[la++] = t, pt[la++] = e, pt[la++] = a, Si |= a, l.lanes |= a, l = l.alternate, l !== null && (l.lanes |= a);
  }
  function bi(l, t, e, a) {
    return Xu(l, t, e, a), Qu(l);
  }
  function Ne(l, t) {
    return Xu(l, null, null, t), Qu(l);
  }
  function ms(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= e, a = n.alternate, a !== null && (a.childLanes |= e), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - ft(e), l = n.hiddenUpdates, a = l[u], a === null ? l[u] = [t] : a.push(t), t.lane = e | 536870912), n) : null;
  }
  function Qu(l) {
    if (50 < fu)
      throw fu = 0, Nc = null, Error(s(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ta = {};
  function kh(l, t, e, a) {
    this.tag = l, this.key = e, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ot(l, t, e, a) {
    return new kh(l, t, e, a);
  }
  function Ti(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Bt(l, t) {
    var e = l.alternate;
    return e === null ? (e = ot(
      l.tag,
      t,
      l.key,
      l.mode
    ), e.elementType = l.elementType, e.type = l.type, e.stateNode = l.stateNode, e.alternate = l, l.alternate = e) : (e.pendingProps = t, e.type = l.type, e.flags = 0, e.subtreeFlags = 0, e.deletions = null), e.flags = l.flags & 65011712, e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, t = l.dependencies, e.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, e.sibling = l.sibling, e.index = l.index, e.ref = l.ref, e.refCleanup = l.refCleanup, e;
  }
  function ys(l, t) {
    l.flags &= 65011714;
    var e = l.alternate;
    return e === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, l.type = e.type, t = e.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Lu(l, t, e, a, u, n) {
    var i = 0;
    if (a = l, typeof l == "function") Ti(l) && (i = 1);
    else if (typeof l == "string")
      i = ty(
        l,
        e,
        Y.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case Xl:
          return l = ot(31, e, t, u), l.elementType = Xl, l.lanes = n, l;
        case L:
          return Ue(e.children, u, n, t);
        case il:
          i = 8, u |= 24;
          break;
        case P:
          return l = ot(12, e, t, u | 2), l.elementType = P, l.lanes = n, l;
        case Gl:
          return l = ot(13, e, t, u), l.elementType = Gl, l.lanes = n, l;
        case ul:
          return l = ot(19, e, t, u), l.elementType = ul, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case ol:
                i = 10;
                break l;
              case Bl:
                i = 9;
                break l;
              case jl:
                i = 11;
                break l;
              case K:
                i = 14;
                break l;
              case zl:
                i = 16, a = null;
                break l;
            }
          i = 29, e = Error(
            s(130, l === null ? "null" : typeof l, "")
          ), a = null;
      }
    return t = ot(i, e, t, u), t.elementType = l, t.type = a, t.lanes = n, t;
  }
  function Ue(l, t, e, a) {
    return l = ot(7, l, a, t), l.lanes = e, l;
  }
  function _i(l, t, e) {
    return l = ot(6, l, null, t), l.lanes = e, l;
  }
  function vs(l) {
    var t = ot(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function Ei(l, t, e) {
    return t = ot(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = e, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var gs = /* @__PURE__ */ new WeakMap();
  function St(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = gs.get(l);
      return e !== void 0 ? e : (t = {
        value: l,
        source: t,
        stack: vf(t)
      }, gs.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: vf(t)
    };
  }
  var ea = [], aa = 0, Zu = null, Qa = 0, bt = [], Tt = 0, te = null, Ut = 1, Ct = "";
  function Yt(l, t) {
    ea[aa++] = Qa, ea[aa++] = Zu, Zu = l, Qa = t;
  }
  function ps(l, t, e) {
    bt[Tt++] = Ut, bt[Tt++] = Ct, bt[Tt++] = te, te = l;
    var a = Ut;
    l = Ct;
    var u = 32 - ft(a) - 1;
    a &= ~(1 << u), e += 1;
    var n = 32 - ft(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (a & (1 << i) - 1).toString(32), a >>= i, u -= i, Ut = 1 << 32 - ft(t) + u | e << u | a, Ct = n + l;
    } else
      Ut = 1 << n | e << u | a, Ct = l;
  }
  function Ai(l) {
    l.return !== null && (Yt(l, 1), ps(l, 1, 0));
  }
  function zi(l) {
    for (; l === Zu; )
      Zu = ea[--aa], ea[aa] = null, Qa = ea[--aa], ea[aa] = null;
    for (; l === te; )
      te = bt[--Tt], bt[Tt] = null, Ct = bt[--Tt], bt[Tt] = null, Ut = bt[--Tt], bt[Tt] = null;
  }
  function Ss(l, t) {
    bt[Tt++] = Ut, bt[Tt++] = Ct, bt[Tt++] = te, Ut = t.id, Ct = t.overflow, te = l;
  }
  var Kl = null, El = null, al = !1, ee = null, _t = !1, Oi = Error(s(519));
  function ae(l) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw La(St(t, l)), Oi;
  }
  function bs(l) {
    var t = l.stateNode, e = l.type, a = l.memoizedProps;
    switch (t[Vl] = l, t[Pl] = a, e) {
      case "dialog":
        I("cancel", t), I("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        I("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < ou.length; e++)
          I(ou[e], t);
        break;
      case "source":
        I("error", t);
        break;
      case "img":
      case "image":
      case "link":
        I("error", t), I("load", t);
        break;
      case "details":
        I("toggle", t);
        break;
      case "input":
        I("invalid", t), xf(
          t,
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
        I("invalid", t);
        break;
      case "textarea":
        I("invalid", t), Hf(t, a.value, a.defaultValue, a.children);
    }
    e = a.children, typeof e != "string" && typeof e != "number" && typeof e != "bigint" || t.textContent === "" + e || a.suppressHydrationWarning === !0 || Yr(t.textContent, e) ? (a.popover != null && (I("beforetoggle", t), I("toggle", t)), a.onScroll != null && I("scroll", t), a.onScrollEnd != null && I("scrollend", t), a.onClick != null && (t.onclick = Ht), t = !0) : t = !1, t || ae(l, !0);
  }
  function Ts(l) {
    for (Kl = l.return; Kl; )
      switch (Kl.tag) {
        case 5:
        case 31:
        case 13:
          _t = !1;
          return;
        case 27:
        case 3:
          _t = !0;
          return;
        default:
          Kl = Kl.return;
      }
  }
  function ua(l) {
    if (l !== Kl) return !1;
    if (!al) return Ts(l), al = !0, !1;
    var t = l.tag, e;
    if ((e = t !== 3 && t !== 27) && ((e = t === 5) && (e = l.type, e = !(e !== "form" && e !== "button") || Vc(l.type, l.memoizedProps)), e = !e), e && El && ae(l), Ts(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      El = wr(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      El = wr(l);
    } else
      t === 27 ? (t = El, ge(l.type) ? (l = Wc, Wc = null, El = l) : El = t) : El = Kl ? At(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ce() {
    El = Kl = null, al = !1;
  }
  function Mi() {
    var l = ee;
    return l !== null && (ut === null ? ut = l : ut.push.apply(
      ut,
      l
    ), ee = null), l;
  }
  function La(l) {
    ee === null ? ee = [l] : ee.push(l);
  }
  var Di = d(null), je = null, Gt = null;
  function ue(l, t, e) {
    H(Di, t._currentValue), t._currentValue = e;
  }
  function Xt(l) {
    l._currentValue = Di.current, O(Di);
  }
  function Ni(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), l === e) break;
      l = l.return;
    }
  }
  function Ui(l, t, e, a) {
    var u = l.child;
    for (u !== null && (u.return = l); u !== null; ) {
      var n = u.dependencies;
      if (n !== null) {
        var i = u.child;
        n = n.firstContext;
        l: for (; n !== null; ) {
          var c = n;
          n = u;
          for (var f = 0; f < t.length; f++)
            if (c.context === t[f]) {
              n.lanes |= e, c = n.alternate, c !== null && (c.lanes |= e), Ni(
                n.return,
                e,
                l
              ), a || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= e, n = i.alternate, n !== null && (n.lanes |= e), Ni(i, e, l), i = null;
      } else i = u.child;
      if (i !== null) i.return = u;
      else
        for (i = u; i !== null; ) {
          if (i === l) {
            i = null;
            break;
          }
          if (u = i.sibling, u !== null) {
            u.return = i.return, i = u;
            break;
          }
          i = i.return;
        }
      u = i;
    }
  }
  function na(l, t, e, a) {
    l = null;
    for (var u = t, n = !1; u !== null; ) {
      if (!n) {
        if ((u.flags & 524288) !== 0) n = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var i = u.alternate;
        if (i === null) throw Error(s(387));
        if (i = i.memoizedProps, i !== null) {
          var c = u.type;
          st(u.pendingProps.value, i.value) || (l !== null ? l.push(c) : l = [c]);
        }
      } else if (u === hl.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(yu) : l = [yu]);
      }
      u = u.return;
    }
    l !== null && Ui(
      t,
      l,
      e,
      a
    ), t.flags |= 262144;
  }
  function Vu(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!st(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function xe(l) {
    je = l, Gt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Jl(l) {
    return _s(je, l);
  }
  function Ku(l, t) {
    return je === null && xe(l), _s(l, t);
  }
  function _s(l, t) {
    var e = t._currentValue;
    if (t = { context: t, memoizedValue: e, next: null }, Gt === null) {
      if (l === null) throw Error(s(308));
      Gt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Gt = Gt.next = t;
    return e;
  }
  var Fh = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(e, a) {
        l.push(a);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(e) {
        return e();
      });
    };
  }, Ih = o.unstable_scheduleCallback, Ph = o.unstable_NormalPriority, xl = {
    $$typeof: ol,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ci() {
    return {
      controller: new Fh(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Za(l) {
    l.refCount--, l.refCount === 0 && Ih(Ph, function() {
      l.controller.abort();
    });
  }
  var Va = null, ji = 0, ia = 0, ca = null;
  function lm(l, t) {
    if (Va === null) {
      var e = Va = [];
      ji = 0, ia = Hc(), ca = {
        status: "pending",
        value: void 0,
        then: function(a) {
          e.push(a);
        }
      };
    }
    return ji++, t.then(Es, Es), t;
  }
  function Es() {
    if (--ji === 0 && Va !== null) {
      ca !== null && (ca.status = "fulfilled");
      var l = Va;
      Va = null, ia = 0, ca = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function tm(l, t) {
    var e = [], a = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        e.push(u);
      }
    };
    return l.then(
      function() {
        a.status = "fulfilled", a.value = t;
        for (var u = 0; u < e.length; u++) (0, e[u])(t);
      },
      function(u) {
        for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
          (0, e[u])(void 0);
      }
    ), a;
  }
  var As = T.S;
  T.S = function(l, t) {
    fr = it(), typeof t == "object" && t !== null && typeof t.then == "function" && lm(l, t), As !== null && As(l, t);
  };
  var Re = d(null);
  function xi() {
    var l = Re.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function Ju(l, t) {
    t === null ? H(Re, Re.current) : H(Re, t.pool);
  }
  function zs() {
    var l = xi();
    return l === null ? null : { parent: xl._currentValue, pool: l };
  }
  var fa = Error(s(460)), Ri = Error(s(474)), wu = Error(s(542)), $u = { then: function() {
  } };
  function Os(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ms(l, t, e) {
    switch (e = l[e], e === void 0 ? l.push(t) : e !== t && (t.then(Ht, Ht), t = e), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ns(l), l;
      default:
        if (typeof t.status == "string") t.then(Ht, Ht);
        else {
          if (l = Tl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(s(482));
          l = t, l.status = "pending", l.then(
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = a;
              }
            },
            function(a) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = a;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Ns(l), l;
        }
        throw qe = t, fa;
    }
  }
  function He(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function" ? (qe = e, fa) : e;
    }
  }
  var qe = null;
  function Ds() {
    if (qe === null) throw Error(s(459));
    var l = qe;
    return qe = null, l;
  }
  function Ns(l) {
    if (l === fa || l === wu)
      throw Error(s(483));
  }
  var sa = null, Ka = 0;
  function Wu(l) {
    var t = Ka;
    return Ka += 1, sa === null && (sa = []), Ms(sa, l, t);
  }
  function Ja(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function ku(l, t) {
    throw t.$$typeof === Q ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(
      s(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Us(l) {
    function t(h, r) {
      if (l) {
        var m = h.deletions;
        m === null ? (h.deletions = [r], h.flags |= 16) : m.push(r);
      }
    }
    function e(h, r) {
      if (!l) return null;
      for (; r !== null; )
        t(h, r), r = r.sibling;
      return null;
    }
    function a(h) {
      for (var r = /* @__PURE__ */ new Map(); h !== null; )
        h.key !== null ? r.set(h.key, h) : r.set(h.index, h), h = h.sibling;
      return r;
    }
    function u(h, r) {
      return h = Bt(h, r), h.index = 0, h.sibling = null, h;
    }
    function n(h, r, m) {
      return h.index = m, l ? (m = h.alternate, m !== null ? (m = m.index, m < r ? (h.flags |= 67108866, r) : m) : (h.flags |= 67108866, r)) : (h.flags |= 1048576, r);
    }
    function i(h) {
      return l && h.alternate === null && (h.flags |= 67108866), h;
    }
    function c(h, r, m, E) {
      return r === null || r.tag !== 6 ? (r = _i(m, h.mode, E), r.return = h, r) : (r = u(r, m), r.return = h, r);
    }
    function f(h, r, m, E) {
      var X = m.type;
      return X === L ? b(
        h,
        r,
        m.props.children,
        E,
        m.key
      ) : r !== null && (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === zl && He(X) === r.type) ? (r = u(r, m.props), Ja(r, m), r.return = h, r) : (r = Lu(
        m.type,
        m.key,
        m.props,
        null,
        h.mode,
        E
      ), Ja(r, m), r.return = h, r);
    }
    function y(h, r, m, E) {
      return r === null || r.tag !== 4 || r.stateNode.containerInfo !== m.containerInfo || r.stateNode.implementation !== m.implementation ? (r = Ei(m, h.mode, E), r.return = h, r) : (r = u(r, m.children || []), r.return = h, r);
    }
    function b(h, r, m, E, X) {
      return r === null || r.tag !== 7 ? (r = Ue(
        m,
        h.mode,
        E,
        X
      ), r.return = h, r) : (r = u(r, m), r.return = h, r);
    }
    function A(h, r, m) {
      if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint")
        return r = _i(
          "" + r,
          h.mode,
          m
        ), r.return = h, r;
      if (typeof r == "object" && r !== null) {
        switch (r.$$typeof) {
          case nl:
            return m = Lu(
              r.type,
              r.key,
              r.props,
              null,
              h.mode,
              m
            ), Ja(m, r), m.return = h, m;
          case dl:
            return r = Ei(
              r,
              h.mode,
              m
            ), r.return = h, r;
          case zl:
            return r = He(r), A(h, r, m);
        }
        if (Ql(r) || cl(r))
          return r = Ue(
            r,
            h.mode,
            m,
            null
          ), r.return = h, r;
        if (typeof r.then == "function")
          return A(h, Wu(r), m);
        if (r.$$typeof === ol)
          return A(
            h,
            Ku(h, r),
            m
          );
        ku(h, r);
      }
      return null;
    }
    function v(h, r, m, E) {
      var X = r !== null ? r.key : null;
      if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint")
        return X !== null ? null : c(h, r, "" + m, E);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case nl:
            return m.key === X ? f(h, r, m, E) : null;
          case dl:
            return m.key === X ? y(h, r, m, E) : null;
          case zl:
            return m = He(m), v(h, r, m, E);
        }
        if (Ql(m) || cl(m))
          return X !== null ? null : b(h, r, m, E, null);
        if (typeof m.then == "function")
          return v(
            h,
            r,
            Wu(m),
            E
          );
        if (m.$$typeof === ol)
          return v(
            h,
            r,
            Ku(h, m),
            E
          );
        ku(h, m);
      }
      return null;
    }
    function p(h, r, m, E, X) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return h = h.get(m) || null, c(r, h, "" + E, X);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case nl:
            return h = h.get(
              E.key === null ? m : E.key
            ) || null, f(r, h, E, X);
          case dl:
            return h = h.get(
              E.key === null ? m : E.key
            ) || null, y(r, h, E, X);
          case zl:
            return E = He(E), p(
              h,
              r,
              m,
              E,
              X
            );
        }
        if (Ql(E) || cl(E))
          return h = h.get(m) || null, b(r, h, E, X, null);
        if (typeof E.then == "function")
          return p(
            h,
            r,
            m,
            Wu(E),
            X
          );
        if (E.$$typeof === ol)
          return p(
            h,
            r,
            m,
            Ku(r, E),
            X
          );
        ku(r, E);
      }
      return null;
    }
    function B(h, r, m, E) {
      for (var X = null, fl = null, G = r, W = r = 0, tl = null; G !== null && W < m.length; W++) {
        G.index > W ? (tl = G, G = null) : tl = G.sibling;
        var sl = v(
          h,
          G,
          m[W],
          E
        );
        if (sl === null) {
          G === null && (G = tl);
          break;
        }
        l && G && sl.alternate === null && t(h, G), r = n(sl, r, W), fl === null ? X = sl : fl.sibling = sl, fl = sl, G = tl;
      }
      if (W === m.length)
        return e(h, G), al && Yt(h, W), X;
      if (G === null) {
        for (; W < m.length; W++)
          G = A(h, m[W], E), G !== null && (r = n(
            G,
            r,
            W
          ), fl === null ? X = G : fl.sibling = G, fl = G);
        return al && Yt(h, W), X;
      }
      for (G = a(G); W < m.length; W++)
        tl = p(
          G,
          h,
          W,
          m[W],
          E
        ), tl !== null && (l && tl.alternate !== null && G.delete(
          tl.key === null ? W : tl.key
        ), r = n(
          tl,
          r,
          W
        ), fl === null ? X = tl : fl.sibling = tl, fl = tl);
      return l && G.forEach(function(_e) {
        return t(h, _e);
      }), al && Yt(h, W), X;
    }
    function Z(h, r, m, E) {
      if (m == null) throw Error(s(151));
      for (var X = null, fl = null, G = r, W = r = 0, tl = null, sl = m.next(); G !== null && !sl.done; W++, sl = m.next()) {
        G.index > W ? (tl = G, G = null) : tl = G.sibling;
        var _e = v(h, G, sl.value, E);
        if (_e === null) {
          G === null && (G = tl);
          break;
        }
        l && G && _e.alternate === null && t(h, G), r = n(_e, r, W), fl === null ? X = _e : fl.sibling = _e, fl = _e, G = tl;
      }
      if (sl.done)
        return e(h, G), al && Yt(h, W), X;
      if (G === null) {
        for (; !sl.done; W++, sl = m.next())
          sl = A(h, sl.value, E), sl !== null && (r = n(sl, r, W), fl === null ? X = sl : fl.sibling = sl, fl = sl);
        return al && Yt(h, W), X;
      }
      for (G = a(G); !sl.done; W++, sl = m.next())
        sl = p(G, h, W, sl.value, E), sl !== null && (l && sl.alternate !== null && G.delete(sl.key === null ? W : sl.key), r = n(sl, r, W), fl === null ? X = sl : fl.sibling = sl, fl = sl);
      return l && G.forEach(function(dy) {
        return t(h, dy);
      }), al && Yt(h, W), X;
    }
    function Sl(h, r, m, E) {
      if (typeof m == "object" && m !== null && m.type === L && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case nl:
            l: {
              for (var X = m.key; r !== null; ) {
                if (r.key === X) {
                  if (X = m.type, X === L) {
                    if (r.tag === 7) {
                      e(
                        h,
                        r.sibling
                      ), E = u(
                        r,
                        m.props.children
                      ), E.return = h, h = E;
                      break l;
                    }
                  } else if (r.elementType === X || typeof X == "object" && X !== null && X.$$typeof === zl && He(X) === r.type) {
                    e(
                      h,
                      r.sibling
                    ), E = u(r, m.props), Ja(E, m), E.return = h, h = E;
                    break l;
                  }
                  e(h, r);
                  break;
                } else t(h, r);
                r = r.sibling;
              }
              m.type === L ? (E = Ue(
                m.props.children,
                h.mode,
                E,
                m.key
              ), E.return = h, h = E) : (E = Lu(
                m.type,
                m.key,
                m.props,
                null,
                h.mode,
                E
              ), Ja(E, m), E.return = h, h = E);
            }
            return i(h);
          case dl:
            l: {
              for (X = m.key; r !== null; ) {
                if (r.key === X)
                  if (r.tag === 4 && r.stateNode.containerInfo === m.containerInfo && r.stateNode.implementation === m.implementation) {
                    e(
                      h,
                      r.sibling
                    ), E = u(r, m.children || []), E.return = h, h = E;
                    break l;
                  } else {
                    e(h, r);
                    break;
                  }
                else t(h, r);
                r = r.sibling;
              }
              E = Ei(m, h.mode, E), E.return = h, h = E;
            }
            return i(h);
          case zl:
            return m = He(m), Sl(
              h,
              r,
              m,
              E
            );
        }
        if (Ql(m))
          return B(
            h,
            r,
            m,
            E
          );
        if (cl(m)) {
          if (X = cl(m), typeof X != "function") throw Error(s(150));
          return m = X.call(m), Z(
            h,
            r,
            m,
            E
          );
        }
        if (typeof m.then == "function")
          return Sl(
            h,
            r,
            Wu(m),
            E
          );
        if (m.$$typeof === ol)
          return Sl(
            h,
            r,
            Ku(h, m),
            E
          );
        ku(h, m);
      }
      return typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint" ? (m = "" + m, r !== null && r.tag === 6 ? (e(h, r.sibling), E = u(r, m), E.return = h, h = E) : (e(h, r), E = _i(m, h.mode, E), E.return = h, h = E), i(h)) : e(h, r);
    }
    return function(h, r, m, E) {
      try {
        Ka = 0;
        var X = Sl(
          h,
          r,
          m,
          E
        );
        return sa = null, X;
      } catch (G) {
        if (G === fa || G === wu) throw G;
        var fl = ot(29, G, null, h.mode);
        return fl.lanes = E, fl.return = h, fl;
      } finally {
      }
    };
  }
  var Be = Us(!0), Cs = Us(!1), ne = !1;
  function Hi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qi(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ie(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ce(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (a = a.shared, (rl & 2) !== 0) {
      var u = a.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), a.pending = t, t = Qu(l), ms(l, null, e), t;
    }
    return Xu(l, a, t, e), Qu(l);
  }
  function wa(l, t, e) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (e & 4194048) !== 0)) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, _f(l, e);
    }
  }
  function Bi(l, t) {
    var e = l.updateQueue, a = l.alternate;
    if (a !== null && (a = a.updateQueue, e === a)) {
      var u = null, n = null;
      if (e = e.firstBaseUpdate, e !== null) {
        do {
          var i = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, e = e.next;
        } while (e !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      e = {
        baseState: a.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: a.shared,
        callbacks: a.callbacks
      }, l.updateQueue = e;
      return;
    }
    l = e.lastBaseUpdate, l === null ? e.firstBaseUpdate = t : l.next = t, e.lastBaseUpdate = t;
  }
  var Yi = !1;
  function $a() {
    if (Yi) {
      var l = ca;
      if (l !== null) throw l;
    }
  }
  function Wa(l, t, e, a) {
    Yi = !1;
    var u = l.updateQueue;
    ne = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, y = f.next;
      f.next = null, i === null ? n = y : i.next = y, i = f;
      var b = l.alternate;
      b !== null && (b = b.updateQueue, c = b.lastBaseUpdate, c !== i && (c === null ? b.firstBaseUpdate = y : c.next = y, b.lastBaseUpdate = f));
    }
    if (n !== null) {
      var A = u.baseState;
      i = 0, b = y = f = null, c = n;
      do {
        var v = c.lane & -536870913, p = v !== c.lane;
        if (p ? (ll & v) === v : (a & v) === v) {
          v !== 0 && v === ia && (Yi = !0), b !== null && (b = b.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var B = l, Z = c;
            v = t;
            var Sl = e;
            switch (Z.tag) {
              case 1:
                if (B = Z.payload, typeof B == "function") {
                  A = B.call(Sl, A, v);
                  break l;
                }
                A = B;
                break l;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = Z.payload, v = typeof B == "function" ? B.call(Sl, A, v) : B, v == null) break l;
                A = C({}, A, v);
                break l;
              case 2:
                ne = !0;
            }
          }
          v = c.callback, v !== null && (l.flags |= 64, p && (l.flags |= 8192), p = u.callbacks, p === null ? u.callbacks = [v] : p.push(v));
        } else
          p = {
            lane: v,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, b === null ? (y = b = p, f = A) : b = b.next = p, i |= v;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          p = c, c = p.next, p.next = null, u.lastBaseUpdate = p, u.shared.pending = null;
        }
      } while (!0);
      b === null && (f = A), u.baseState = f, u.firstBaseUpdate = y, u.lastBaseUpdate = b, n === null && (u.shared.lanes = 0), de |= i, l.lanes = i, l.memoizedState = A;
    }
  }
  function js(l, t) {
    if (typeof l != "function")
      throw Error(s(191, l));
    l.call(t);
  }
  function xs(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++)
        js(e[l], t);
  }
  var oa = d(null), Fu = d(0);
  function Rs(l, t) {
    l = Wt, H(Fu, l), H(oa, t), Wt = l | t.baseLanes;
  }
  function Gi() {
    H(Fu, Wt), H(oa, oa.current);
  }
  function Xi() {
    Wt = Fu.current, O(oa), O(Fu);
  }
  var rt = d(null), Et = null;
  function fe(l) {
    var t = l.alternate;
    H(Ul, Ul.current & 1), H(rt, l), Et === null && (t === null || oa.current !== null || t.memoizedState !== null) && (Et = l);
  }
  function Qi(l) {
    H(Ul, Ul.current), H(rt, l), Et === null && (Et = l);
  }
  function Hs(l) {
    l.tag === 22 ? (H(Ul, Ul.current), H(rt, l), Et === null && (Et = l)) : se();
  }
  function se() {
    H(Ul, Ul.current), H(rt, rt.current);
  }
  function dt(l) {
    O(rt), Et === l && (Et = null), O(Ul);
  }
  var Ul = d(0);
  function Iu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && (e = e.dehydrated, e === null || wc(e) || $c(e)))
          return t;
      } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Qt = 0, $ = null, gl = null, Rl = null, Pu = !1, ra = !1, Ye = !1, ln = 0, ka = 0, da = null, em = 0;
  function Ml() {
    throw Error(s(321));
  }
  function Li(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!st(l[e], t[e])) return !1;
    return !0;
  }
  function Zi(l, t, e, a, u, n) {
    return Qt = n, $ = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = l === null || l.memoizedState === null ? So : uc, Ye = !1, n = e(a, u), Ye = !1, ra && (n = Bs(
      t,
      e,
      a,
      u
    )), qs(l), n;
  }
  function qs(l) {
    T.H = Pa;
    var t = gl !== null && gl.next !== null;
    if (Qt = 0, Rl = gl = $ = null, Pu = !1, ka = 0, da = null, t) throw Error(s(300));
    l === null || Hl || (l = l.dependencies, l !== null && Vu(l) && (Hl = !0));
  }
  function Bs(l, t, e, a) {
    $ = l;
    var u = 0;
    do {
      if (ra && (da = null), ka = 0, ra = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Rl = gl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      T.H = bo, n = t(e, a);
    } while (ra);
    return n;
  }
  function am() {
    var l = T.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Fa(t) : t, l = l.useState()[0], (gl !== null ? gl.memoizedState : null) !== l && ($.flags |= 1024), t;
  }
  function Vi() {
    var l = ln !== 0;
    return ln = 0, l;
  }
  function Ki(l, t, e) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~e;
  }
  function Ji(l) {
    if (Pu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Pu = !1;
    }
    Qt = 0, Rl = gl = $ = null, ra = !1, ka = ln = 0, da = null;
  }
  function Fl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rl === null ? $.memoizedState = Rl = l : Rl = Rl.next = l, Rl;
  }
  function Cl() {
    if (gl === null) {
      var l = $.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = gl.next;
    var t = Rl === null ? $.memoizedState : Rl.next;
    if (t !== null)
      Rl = t, gl = l;
    else {
      if (l === null)
        throw $.alternate === null ? Error(s(467)) : Error(s(310));
      gl = l, l = {
        memoizedState: gl.memoizedState,
        baseState: gl.baseState,
        baseQueue: gl.baseQueue,
        queue: gl.queue,
        next: null
      }, Rl === null ? $.memoizedState = Rl = l : Rl = Rl.next = l;
    }
    return Rl;
  }
  function tn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fa(l) {
    var t = ka;
    return ka += 1, da === null && (da = []), l = Ms(da, l, t), t = $, (Rl === null ? t.memoizedState : Rl.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? So : uc), l;
  }
  function en(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Fa(l);
      if (l.$$typeof === ol) return Jl(l);
    }
    throw Error(s(438, String(l)));
  }
  function wi(l) {
    var t = null, e = $.updateQueue;
    if (e !== null && (t = e.memoCache), t == null) {
      var a = $.alternate;
      a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
        data: a.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), e === null && (e = tn(), $.updateQueue = e), e.memoCache = t, e = t.data[t.index], e === void 0)
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++)
        e[a] = j;
    return t.index++, e;
  }
  function Lt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function an(l) {
    var t = Cl();
    return $i(t, gl, l);
  }
  function $i(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = e;
    var u = l.baseQueue, n = a.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, a.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, f = null, y = t, b = !1;
      do {
        var A = y.lane & -536870913;
        if (A !== y.lane ? (ll & A) === A : (Qt & A) === A) {
          var v = y.revertLane;
          if (v === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }), A === ia && (b = !0);
          else if ((Qt & v) === v) {
            y = y.next, v === ia && (b = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: y.revertLane,
              gesture: null,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null
            }, f === null ? (c = f = A, i = n) : f = f.next = A, $.lanes |= v, de |= v;
          A = y.action, Ye && e(n, A), n = y.hasEagerState ? y.eagerState : e(n, A);
        } else
          v = {
            lane: A,
            revertLane: y.revertLane,
            gesture: y.gesture,
            action: y.action,
            hasEagerState: y.hasEagerState,
            eagerState: y.eagerState,
            next: null
          }, f === null ? (c = f = v, i = n) : f = f.next = v, $.lanes |= A, de |= A;
        y = y.next;
      } while (y !== null && y !== t);
      if (f === null ? i = n : f.next = c, !st(n, l.memoizedState) && (Hl = !0, b && (e = ca, e !== null)))
        throw e;
      l.memoizedState = n, l.baseState = i, l.baseQueue = f, a.lastRenderedState = n;
    }
    return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
  }
  function Wi(l) {
    var t = Cl(), e = t.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch, u = e.pending, n = t.memoizedState;
    if (u !== null) {
      e.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      st(n, t.memoizedState) || (Hl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), e.lastRenderedState = n;
    }
    return [n, a];
  }
  function Ys(l, t, e) {
    var a = $, u = Cl(), n = al;
    if (n) {
      if (e === void 0) throw Error(s(407));
      e = e();
    } else e = t();
    var i = !st(
      (gl || u).memoizedState,
      e
    );
    if (i && (u.memoizedState = e, Hl = !0), u = u.queue, Ii(Qs.bind(null, a, u, l), [
      l
    ]), u.getSnapshot !== t || i || Rl !== null && Rl.memoizedState.tag & 1) {
      if (a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Xs.bind(
          null,
          a,
          u,
          e,
          t
        ),
        null
      ), Tl === null) throw Error(s(349));
      n || (Qt & 127) !== 0 || Gs(a, t, e);
    }
    return e;
  }
  function Gs(l, t, e) {
    l.flags |= 16384, l = { getSnapshot: t, value: e }, t = $.updateQueue, t === null ? (t = tn(), $.updateQueue = t, t.stores = [l]) : (e = t.stores, e === null ? t.stores = [l] : e.push(l));
  }
  function Xs(l, t, e, a) {
    t.value = e, t.getSnapshot = a, Ls(t) && Zs(l);
  }
  function Qs(l, t, e) {
    return e(function() {
      Ls(t) && Zs(l);
    });
  }
  function Ls(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !st(l, e);
    } catch {
      return !0;
    }
  }
  function Zs(l) {
    var t = Ne(l, 2);
    t !== null && nt(t, l, 2);
  }
  function ki(l) {
    var t = Fl();
    if (typeof l == "function") {
      var e = l;
      if (l = e(), Ye) {
        It(!0);
        try {
          e();
        } finally {
          It(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Lt,
      lastRenderedState: l
    }, t;
  }
  function Vs(l, t, e, a) {
    return l.baseState = e, $i(
      l,
      gl,
      typeof a == "function" ? a : Lt
    );
  }
  function um(l, t, e, a, u) {
    if (cn(l)) throw Error(s(485));
    if (l = t.action, l !== null) {
      var n = {
        payload: u,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(i) {
          n.listeners.push(i);
        }
      };
      T.T !== null ? e(!0) : n.isTransition = !1, a(n), e = t.pending, e === null ? (n.next = t.pending = n, Ks(t, n)) : (n.next = e.next, t.pending = e.next = n);
    }
  }
  function Ks(l, t) {
    var e = t.action, a = t.payload, u = l.state;
    if (t.isTransition) {
      var n = T.T, i = {};
      T.T = i;
      try {
        var c = e(u, a), f = T.S;
        f !== null && f(i, c), Js(l, t, c);
      } catch (y) {
        Fi(l, t, y);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), T.T = n;
      }
    } else
      try {
        n = e(u, a), Js(l, t, n);
      } catch (y) {
        Fi(l, t, y);
      }
  }
  function Js(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function" ? e.then(
      function(a) {
        ws(l, t, a);
      },
      function(a) {
        return Fi(l, t, a);
      }
    ) : ws(l, t, e);
  }
  function ws(l, t, e) {
    t.status = "fulfilled", t.value = e, $s(t), l.state = e, t = l.pending, t !== null && (e = t.next, e === t ? l.pending = null : (e = e.next, t.next = e, Ks(l, e)));
  }
  function Fi(l, t, e) {
    var a = l.pending;
    if (l.pending = null, a !== null) {
      a = a.next;
      do
        t.status = "rejected", t.reason = e, $s(t), t = t.next;
      while (t !== a);
    }
    l.action = null;
  }
  function $s(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Ws(l, t) {
    return t;
  }
  function ks(l, t) {
    if (al) {
      var e = Tl.formState;
      if (e !== null) {
        l: {
          var a = $;
          if (al) {
            if (El) {
              t: {
                for (var u = El, n = _t; u.nodeType !== 8; ) {
                  if (!n) {
                    u = null;
                    break t;
                  }
                  if (u = At(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                n = u.data, u = n === "F!" || n === "F" ? u : null;
              }
              if (u) {
                El = At(
                  u.nextSibling
                ), a = u.data === "F!";
                break l;
              }
            }
            ae(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return e = Fl(), e.memoizedState = e.baseState = t, a = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ws,
      lastRenderedState: t
    }, e.queue = a, e = vo.bind(
      null,
      $,
      a
    ), a.dispatch = e, a = ki(!1), n = ac.bind(
      null,
      $,
      !1,
      a.queue
    ), a = Fl(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, a.queue = u, e = um.bind(
      null,
      $,
      u,
      n,
      e
    ), u.dispatch = e, a.memoizedState = l, [t, e, !1];
  }
  function Fs(l) {
    var t = Cl();
    return Is(t, gl, l);
  }
  function Is(l, t, e) {
    if (t = $i(
      l,
      t,
      Ws
    )[0], l = an(Lt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var a = Fa(t);
      } catch (i) {
        throw i === fa ? wu : i;
      }
    else a = t;
    t = Cl();
    var u = t.queue, n = u.dispatch;
    return e !== t.memoizedState && ($.flags |= 2048, ha(
      9,
      { destroy: void 0 },
      nm.bind(null, u, e),
      null
    )), [a, n, l];
  }
  function nm(l, t) {
    l.action = t;
  }
  function Ps(l) {
    var t = Cl(), e = gl;
    if (e !== null)
      return Is(t, e, l);
    Cl(), t = t.memoizedState, e = Cl();
    var a = e.queue.dispatch;
    return e.memoizedState = l, [t, a, !1];
  }
  function ha(l, t, e, a) {
    return l = { tag: l, create: e, deps: a, inst: t, next: null }, t = $.updateQueue, t === null && (t = tn(), $.updateQueue = t), e = t.lastEffect, e === null ? t.lastEffect = l.next = l : (a = e.next, e.next = l, l.next = a, t.lastEffect = l), l;
  }
  function lo() {
    return Cl().memoizedState;
  }
  function un(l, t, e, a) {
    var u = Fl();
    $.flags |= l, u.memoizedState = ha(
      1 | t,
      { destroy: void 0 },
      e,
      a === void 0 ? null : a
    );
  }
  function nn(l, t, e, a) {
    var u = Cl();
    a = a === void 0 ? null : a;
    var n = u.memoizedState.inst;
    gl !== null && a !== null && Li(a, gl.memoizedState.deps) ? u.memoizedState = ha(t, n, e, a) : ($.flags |= l, u.memoizedState = ha(
      1 | t,
      n,
      e,
      a
    ));
  }
  function to(l, t) {
    un(8390656, 8, l, t);
  }
  function Ii(l, t) {
    nn(2048, 8, l, t);
  }
  function im(l) {
    $.flags |= 4;
    var t = $.updateQueue;
    if (t === null)
      t = tn(), $.updateQueue = t, t.events = [l];
    else {
      var e = t.events;
      e === null ? t.events = [l] : e.push(l);
    }
  }
  function eo(l) {
    var t = Cl().memoizedState;
    return im({ ref: t, nextImpl: l }), function() {
      if ((rl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ao(l, t) {
    return nn(4, 2, l, t);
  }
  function uo(l, t) {
    return nn(4, 4, l, t);
  }
  function no(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function() {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function io(l, t, e) {
    e = e != null ? e.concat([l]) : null, nn(4, 4, no.bind(null, t, l), e);
  }
  function Pi() {
  }
  function co(l, t) {
    var e = Cl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Li(t, a[1]) ? a[0] : (e.memoizedState = [l, t], l);
  }
  function fo(l, t) {
    var e = Cl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Li(t, a[1]))
      return a[0];
    if (a = l(), Ye) {
      It(!0);
      try {
        l();
      } finally {
        It(!1);
      }
    }
    return e.memoizedState = [a, t], a;
  }
  function lc(l, t, e) {
    return e === void 0 || (Qt & 1073741824) !== 0 && (ll & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = e, l = or(), $.lanes |= l, de |= l, e);
  }
  function so(l, t, e, a) {
    return st(e, t) ? e : oa.current !== null ? (l = lc(l, e, a), st(l, t) || (Hl = !0), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (ll & 261930) === 0 ? (Hl = !0, l.memoizedState = e) : (l = or(), $.lanes |= l, de |= l, t);
  }
  function oo(l, t, e, a, u) {
    var n = x.p;
    x.p = n !== 0 && 8 > n ? n : 8;
    var i = T.T, c = {};
    T.T = c, ac(l, !1, t, e);
    try {
      var f = u(), y = T.S;
      if (y !== null && y(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var b = tm(
          f,
          a
        );
        Ia(
          l,
          t,
          b,
          yt(l)
        );
      } else
        Ia(
          l,
          t,
          a,
          yt(l)
        );
    } catch (A) {
      Ia(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: A },
        yt()
      );
    } finally {
      x.p = n, i !== null && c.types !== null && (i.types = c.types), T.T = i;
    }
  }
  function cm() {
  }
  function tc(l, t, e, a) {
    if (l.tag !== 5) throw Error(s(476));
    var u = ro(l).queue;
    oo(
      l,
      u,
      t,
      V,
      e === null ? cm : function() {
        return ho(l), e(a);
      }
    );
  }
  function ro(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: V,
      baseState: V,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: V
      },
      next: null
    };
    var e = {};
    return t.next = {
      memoizedState: e,
      baseState: e,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: e
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function ho(l) {
    var t = ro(l);
    t.next === null && (t = l.alternate.memoizedState), Ia(
      l,
      t.next.queue,
      {},
      yt()
    );
  }
  function ec() {
    return Jl(yu);
  }
  function mo() {
    return Cl().memoizedState;
  }
  function yo() {
    return Cl().memoizedState;
  }
  function fm(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = yt();
          l = ie(e);
          var a = ce(t, l, e);
          a !== null && (nt(a, t, e), wa(a, t, e)), t = { cache: Ci() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function sm(l, t, e) {
    var a = yt();
    e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l) ? go(t, e) : (e = bi(l, t, e, a), e !== null && (nt(e, l, a), po(e, t, a)));
  }
  function vo(l, t, e) {
    var a = yt();
    Ia(l, t, e, a);
  }
  function Ia(l, t, e, a) {
    var u = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cn(l)) go(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, e);
          if (u.hasEagerState = !0, u.eagerState = c, st(c, i))
            return Xu(l, t, u, 0), Tl === null && Gu(), !1;
        } catch {
        } finally {
        }
      if (e = bi(l, t, u, a), e !== null)
        return nt(e, l, a), po(e, t, a), !0;
    }
    return !1;
  }
  function ac(l, t, e, a) {
    if (a = {
      lane: 2,
      revertLane: Hc(),
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l)) {
      if (t) throw Error(s(479));
    } else
      t = bi(
        l,
        e,
        a,
        2
      ), t !== null && nt(t, l, 2);
  }
  function cn(l) {
    var t = l.alternate;
    return l === $ || t !== null && t === $;
  }
  function go(l, t) {
    ra = Pu = !0;
    var e = l.pending;
    e === null ? t.next = t : (t.next = e.next, e.next = t), l.pending = t;
  }
  function po(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      a &= l.pendingLanes, e |= a, t.lanes = e, _f(l, e);
    }
  }
  var Pa = {
    readContext: Jl,
    use: en,
    useCallback: Ml,
    useContext: Ml,
    useEffect: Ml,
    useImperativeHandle: Ml,
    useLayoutEffect: Ml,
    useInsertionEffect: Ml,
    useMemo: Ml,
    useReducer: Ml,
    useRef: Ml,
    useState: Ml,
    useDebugValue: Ml,
    useDeferredValue: Ml,
    useTransition: Ml,
    useSyncExternalStore: Ml,
    useId: Ml,
    useHostTransitionStatus: Ml,
    useFormState: Ml,
    useActionState: Ml,
    useOptimistic: Ml,
    useMemoCache: Ml,
    useCacheRefresh: Ml
  };
  Pa.useEffectEvent = Ml;
  var So = {
    readContext: Jl,
    use: en,
    useCallback: function(l, t) {
      return Fl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Jl,
    useEffect: to,
    useImperativeHandle: function(l, t, e) {
      e = e != null ? e.concat([l]) : null, un(
        4194308,
        4,
        no.bind(null, t, l),
        e
      );
    },
    useLayoutEffect: function(l, t) {
      return un(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      un(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var e = Fl();
      t = t === void 0 ? null : t;
      var a = l();
      if (Ye) {
        It(!0);
        try {
          l();
        } finally {
          It(!1);
        }
      }
      return e.memoizedState = [a, t], a;
    },
    useReducer: function(l, t, e) {
      var a = Fl();
      if (e !== void 0) {
        var u = e(t);
        if (Ye) {
          It(!0);
          try {
            e(t);
          } finally {
            It(!1);
          }
        }
      } else u = t;
      return a.memoizedState = a.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, a.queue = l, l = l.dispatch = sm.bind(
        null,
        $,
        l
      ), [a.memoizedState, l];
    },
    useRef: function(l) {
      var t = Fl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = ki(l);
      var t = l.queue, e = vo.bind(null, $, t);
      return t.dispatch = e, [l.memoizedState, e];
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var e = Fl();
      return lc(e, l, t);
    },
    useTransition: function() {
      var l = ki(!1);
      return l = oo.bind(
        null,
        $,
        l.queue,
        !0,
        !1
      ), Fl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, e) {
      var a = $, u = Fl();
      if (al) {
        if (e === void 0)
          throw Error(s(407));
        e = e();
      } else {
        if (e = t(), Tl === null)
          throw Error(s(349));
        (ll & 127) !== 0 || Gs(a, t, e);
      }
      u.memoizedState = e;
      var n = { value: e, getSnapshot: t };
      return u.queue = n, to(Qs.bind(null, a, n, l), [
        l
      ]), a.flags |= 2048, ha(
        9,
        { destroy: void 0 },
        Xs.bind(
          null,
          a,
          n,
          e,
          t
        ),
        null
      ), e;
    },
    useId: function() {
      var l = Fl(), t = Tl.identifierPrefix;
      if (al) {
        var e = Ct, a = Ut;
        e = (a & ~(1 << 32 - ft(a) - 1)).toString(32) + e, t = "_" + t + "R_" + e, e = ln++, 0 < e && (t += "H" + e.toString(32)), t += "_";
      } else
        e = em++, t = "_" + t + "r_" + e.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: ec,
    useFormState: ks,
    useActionState: ks,
    useOptimistic: function(l) {
      var t = Fl();
      t.memoizedState = t.baseState = l;
      var e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = e, t = ac.bind(
        null,
        $,
        !0,
        e
      ), e.dispatch = t, [l, t];
    },
    useMemoCache: wi,
    useCacheRefresh: function() {
      return Fl().memoizedState = fm.bind(
        null,
        $
      );
    },
    useEffectEvent: function(l) {
      var t = Fl(), e = { impl: l };
      return t.memoizedState = e, function() {
        if ((rl & 2) !== 0)
          throw Error(s(440));
        return e.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: Jl,
    use: en,
    useCallback: co,
    useContext: Jl,
    useEffect: Ii,
    useImperativeHandle: io,
    useInsertionEffect: ao,
    useLayoutEffect: uo,
    useMemo: fo,
    useReducer: an,
    useRef: lo,
    useState: function() {
      return an(Lt);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var e = Cl();
      return so(
        e,
        gl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = an(Lt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Fa(l),
        t
      ];
    },
    useSyncExternalStore: Ys,
    useId: mo,
    useHostTransitionStatus: ec,
    useFormState: Fs,
    useActionState: Fs,
    useOptimistic: function(l, t) {
      var e = Cl();
      return Vs(e, gl, l, t);
    },
    useMemoCache: wi,
    useCacheRefresh: yo
  };
  uc.useEffectEvent = eo;
  var bo = {
    readContext: Jl,
    use: en,
    useCallback: co,
    useContext: Jl,
    useEffect: Ii,
    useImperativeHandle: io,
    useInsertionEffect: ao,
    useLayoutEffect: uo,
    useMemo: fo,
    useReducer: Wi,
    useRef: lo,
    useState: function() {
      return Wi(Lt);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var e = Cl();
      return gl === null ? lc(e, l, t) : so(
        e,
        gl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Wi(Lt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Fa(l),
        t
      ];
    },
    useSyncExternalStore: Ys,
    useId: mo,
    useHostTransitionStatus: ec,
    useFormState: Ps,
    useActionState: Ps,
    useOptimistic: function(l, t) {
      var e = Cl();
      return gl !== null ? Vs(e, gl, l, t) : (e.baseState = l, [l, e.queue.dispatch]);
    },
    useMemoCache: wi,
    useCacheRefresh: yo
  };
  bo.useEffectEvent = eo;
  function nc(l, t, e, a) {
    t = l.memoizedState, e = e(a, t), e = e == null ? t : C({}, t, e), l.memoizedState = e, l.lanes === 0 && (l.updateQueue.baseState = e);
  }
  var ic = {
    enqueueSetState: function(l, t, e) {
      l = l._reactInternals;
      var a = yt(), u = ie(a);
      u.payload = t, e != null && (u.callback = e), t = ce(l, u, a), t !== null && (nt(t, l, a), wa(t, l, a));
    },
    enqueueReplaceState: function(l, t, e) {
      l = l._reactInternals;
      var a = yt(), u = ie(a);
      u.tag = 1, u.payload = t, e != null && (u.callback = e), t = ce(l, u, a), t !== null && (nt(t, l, a), wa(t, l, a));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var e = yt(), a = ie(e);
      a.tag = 2, t != null && (a.callback = t), t = ce(l, a, e), t !== null && (nt(t, l, e), wa(t, l, e));
    }
  };
  function To(l, t, e, a, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(a, n, i) : t.prototype && t.prototype.isPureReactComponent ? !Ga(e, a) || !Ga(u, n) : !0;
  }
  function _o(l, t, e, a) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(e, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(e, a), t.state !== l && ic.enqueueReplaceState(t, t.state, null);
  }
  function Ge(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t)
        a !== "ref" && (e[a] = t[a]);
    }
    if (l = l.defaultProps) {
      e === t && (e = C({}, e));
      for (var u in l)
        e[u] === void 0 && (e[u] = l[u]);
    }
    return e;
  }
  function Eo(l) {
    Yu(l);
  }
  function Ao(l) {
    console.error(l);
  }
  function zo(l) {
    Yu(l);
  }
  function fn(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Oo(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function cc(l, t, e) {
    return e = ie(e), e.tag = 3, e.payload = { element: null }, e.callback = function() {
      fn(l, t);
    }, e;
  }
  function Mo(l) {
    return l = ie(l), l.tag = 3, l;
  }
  function Do(l, t, e, a) {
    var u = e.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = a.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        Oo(t, e, a);
      };
    }
    var i = e.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      Oo(t, e, a), typeof u != "function" && (he === null ? he = /* @__PURE__ */ new Set([this]) : he.add(this));
      var c = a.stack;
      this.componentDidCatch(a.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function om(l, t, e, a, u) {
    if (e.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
      if (t = e.alternate, t !== null && na(
        t,
        e,
        u,
        !0
      ), e = rt.current, e !== null) {
        switch (e.tag) {
          case 31:
          case 13:
            return Et === null ? bn() : e.alternate === null && Dl === 0 && (Dl = 3), e.flags &= -257, e.flags |= 65536, e.lanes = u, a === $u ? e.flags |= 16384 : (t = e.updateQueue, t === null ? e.updateQueue = /* @__PURE__ */ new Set([a]) : t.add(a), jc(l, a, u)), !1;
          case 22:
            return e.flags |= 65536, a === $u ? e.flags |= 16384 : (t = e.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([a])
            }, e.updateQueue = t) : (e = t.retryQueue, e === null ? t.retryQueue = /* @__PURE__ */ new Set([a]) : e.add(a)), jc(l, a, u)), !1;
        }
        throw Error(s(435, e.tag));
      }
      return jc(l, a, u), bn(), !1;
    }
    if (al)
      return t = rt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, a !== Oi && (l = Error(s(422), { cause: a }), La(St(l, e)))) : (a !== Oi && (t = Error(s(423), {
        cause: a
      }), La(
        St(t, e)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, a = St(a, e), u = cc(
        l.stateNode,
        a,
        u
      ), Bi(l, u), Dl !== 4 && (Dl = 2)), !1;
    var n = Error(s(520), { cause: a });
    if (n = St(n, e), cu === null ? cu = [n] : cu.push(n), Dl !== 4 && (Dl = 2), t === null) return !0;
    a = St(a, e), e = t;
    do {
      switch (e.tag) {
        case 3:
          return e.flags |= 65536, l = u & -u, e.lanes |= l, l = cc(e.stateNode, a, l), Bi(e, l), !1;
        case 1:
          if (t = e.type, n = e.stateNode, (e.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (he === null || !he.has(n))))
            return e.flags |= 65536, u &= -u, e.lanes |= u, u = Mo(u), Do(
              u,
              l,
              e,
              a
            ), Bi(e, u), !1;
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var fc = Error(s(461)), Hl = !1;
  function wl(l, t, e, a) {
    t.child = l === null ? Cs(t, null, e, a) : Be(
      t,
      l.child,
      e,
      a
    );
  }
  function No(l, t, e, a, u) {
    e = e.render;
    var n = t.ref;
    if ("ref" in a) {
      var i = {};
      for (var c in a)
        c !== "ref" && (i[c] = a[c]);
    } else i = a;
    return xe(t), a = Zi(
      l,
      t,
      e,
      i,
      n,
      u
    ), c = Vi(), l !== null && !Hl ? (Ki(l, t, u), Zt(l, t, u)) : (al && c && Ai(t), t.flags |= 1, wl(l, t, a, u), t.child);
  }
  function Uo(l, t, e, a, u) {
    if (l === null) {
      var n = e.type;
      return typeof n == "function" && !Ti(n) && n.defaultProps === void 0 && e.compare === null ? (t.tag = 15, t.type = n, Co(
        l,
        t,
        n,
        a,
        u
      )) : (l = Lu(
        e.type,
        null,
        a,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !vc(l, u)) {
      var i = n.memoizedProps;
      if (e = e.compare, e = e !== null ? e : Ga, e(i, a) && l.ref === t.ref)
        return Zt(l, t, u);
    }
    return t.flags |= 1, l = Bt(n, a), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Co(l, t, e, a, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ga(n, a) && l.ref === t.ref)
        if (Hl = !1, t.pendingProps = a = n, vc(l, u))
          (l.flags & 131072) !== 0 && (Hl = !0);
        else
          return t.lanes = l.lanes, Zt(l, t, u);
    }
    return sc(
      l,
      t,
      e,
      a,
      u
    );
  }
  function jo(l, t, e, a) {
    var u = a.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | e : e, l !== null) {
          for (a = t.child = l.child, u = 0; a !== null; )
            u = u | a.lanes | a.childLanes, a = a.sibling;
          a = u & ~n;
        } else a = 0, t.child = null;
        return xo(
          l,
          t,
          n,
          e,
          a
        );
      }
      if ((e & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ju(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Rs(t, n) : Gi(), Hs(t);
      else
        return a = t.lanes = 536870912, xo(
          l,
          t,
          n !== null ? n.baseLanes | e : e,
          e,
          a
        );
    } else
      n !== null ? (Ju(t, n.cachePool), Rs(t, n), se(), t.memoizedState = null) : (l !== null && Ju(t, null), Gi(), se());
    return wl(l, t, u, e), t.child;
  }
  function lu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function xo(l, t, e, a, u) {
    var n = xi();
    return n = n === null ? null : { parent: xl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: e,
      cachePool: n
    }, l !== null && Ju(t, null), Gi(), Hs(t), l !== null && na(l, t, a, !0), t.childLanes = u, null;
  }
  function sn(l, t) {
    return t = rn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Ro(l, t, e) {
    return Be(t, l.child, null, e), l = sn(t, t.pendingProps), l.flags |= 2, dt(t), t.memoizedState = null, l;
  }
  function rm(l, t, e) {
    var a = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (al) {
        if (a.mode === "hidden")
          return l = sn(t, a), t.lanes = 536870912, lu(null, l);
        if (Qi(t), (l = El) ? (l = Jr(
          l,
          _t
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: te !== null ? { id: Ut, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = vs(l), e.return = t, t.child = e, Kl = t, El = null)) : l = null, l === null) throw ae(t);
        return t.lanes = 536870912, null;
      }
      return sn(t, a);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Qi(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Ro(
            l,
            t,
            e
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Hl || na(l, t, e, !1), u = (e & l.childLanes) !== 0, Hl || u) {
        if (a = Tl, a !== null && (i = Ef(a, e), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Ne(l, i), nt(a, l, i), fc;
        bn(), t = Ro(
          l,
          t,
          e
        );
      } else
        l = n.treeContext, El = At(i.nextSibling), Kl = t, al = !0, ee = null, _t = !1, l !== null && Ss(t, l), t = sn(t, a), t.flags |= 4096;
      return t;
    }
    return l = Bt(l.child, {
      mode: a.mode,
      children: a.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function on(l, t) {
    var e = t.ref;
    if (e === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object")
        throw Error(s(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function sc(l, t, e, a, u) {
    return xe(t), e = Zi(
      l,
      t,
      e,
      a,
      void 0,
      u
    ), a = Vi(), l !== null && !Hl ? (Ki(l, t, u), Zt(l, t, u)) : (al && a && Ai(t), t.flags |= 1, wl(l, t, e, u), t.child);
  }
  function Ho(l, t, e, a, u, n) {
    return xe(t), t.updateQueue = null, e = Bs(
      t,
      a,
      e,
      u
    ), qs(l), a = Vi(), l !== null && !Hl ? (Ki(l, t, n), Zt(l, t, n)) : (al && a && Ai(t), t.flags |= 1, wl(l, t, e, n), t.child);
  }
  function qo(l, t, e, a, u) {
    if (xe(t), t.stateNode === null) {
      var n = ta, i = e.contextType;
      typeof i == "object" && i !== null && (n = Jl(i)), n = new e(a, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ic, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = a, n.state = t.memoizedState, n.refs = {}, Hi(t), i = e.contextType, n.context = typeof i == "object" && i !== null ? Jl(i) : ta, n.state = t.memoizedState, i = e.getDerivedStateFromProps, typeof i == "function" && (nc(
        t,
        e,
        i,
        a
      ), n.state = t.memoizedState), typeof e.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && ic.enqueueReplaceState(n, n.state, null), Wa(t, a, n, u), $a(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, f = Ge(e, c);
      n.props = f;
      var y = n.context, b = e.contextType;
      i = ta, typeof b == "object" && b !== null && (i = Jl(b));
      var A = e.getDerivedStateFromProps;
      b = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, b || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || y !== i) && _o(
        t,
        n,
        a,
        i
      ), ne = !1;
      var v = t.memoizedState;
      n.state = v, Wa(t, a, n, u), $a(), y = t.memoizedState, c || v !== y || ne ? (typeof A == "function" && (nc(
        t,
        e,
        A,
        a
      ), y = t.memoizedState), (f = ne || To(
        t,
        e,
        f,
        a,
        v,
        y,
        i
      )) ? (b || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = y), n.props = a, n.state = y, n.context = i, a = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
    } else {
      n = t.stateNode, qi(l, t), i = t.memoizedProps, b = Ge(e, i), n.props = b, A = t.pendingProps, v = n.context, y = e.contextType, f = ta, typeof y == "object" && y !== null && (f = Jl(y)), c = e.getDerivedStateFromProps, (y = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== A || v !== f) && _o(
        t,
        n,
        a,
        f
      ), ne = !1, v = t.memoizedState, n.state = v, Wa(t, a, n, u), $a();
      var p = t.memoizedState;
      i !== A || v !== p || ne || l !== null && l.dependencies !== null && Vu(l.dependencies) ? (typeof c == "function" && (nc(
        t,
        e,
        c,
        a
      ), p = t.memoizedState), (b = ne || To(
        t,
        e,
        b,
        a,
        v,
        p,
        f
      ) || l !== null && l.dependencies !== null && Vu(l.dependencies)) ? (y || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(a, p, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        a,
        p,
        f
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = p), n.props = a, n.state = p, n.context = f, a = b) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), a = !1);
    }
    return n = a, on(l, t), a = (t.flags & 128) !== 0, n || a ? (n = t.stateNode, e = a && typeof e.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && a ? (t.child = Be(
      t,
      l.child,
      null,
      u
    ), t.child = Be(
      t,
      null,
      e,
      u
    )) : wl(l, t, e, u), t.memoizedState = n.state, l = t.child) : l = Zt(
      l,
      t,
      u
    ), l;
  }
  function Bo(l, t, e, a) {
    return Ce(), t.flags |= 256, wl(l, t, e, a), t.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function rc(l) {
    return { baseLanes: l, cachePool: zs() };
  }
  function dc(l, t, e) {
    return l = l !== null ? l.childLanes & ~e : 0, t && (l |= mt), l;
  }
  function Yo(l, t, e) {
    var a = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Ul.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (al) {
        if (u ? fe(t) : se(), (l = El) ? (l = Jr(
          l,
          _t
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: te !== null ? { id: Ut, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, e = vs(l), e.return = t, t.child = e, Kl = t, El = null)) : l = null, l === null) throw ae(t);
        return $c(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = a.children;
      return a = a.fallback, u ? (se(), u = t.mode, c = rn(
        { mode: "hidden", children: c },
        u
      ), a = Ue(
        a,
        u,
        e,
        null
      ), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = rc(e), a.childLanes = dc(
        l,
        i,
        e
      ), t.memoizedState = oc, lu(null, a)) : (fe(t), hc(t, c));
    }
    var f = l.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (fe(t), t.flags &= -257, t = mc(
          l,
          t,
          e
        )) : t.memoizedState !== null ? (se(), t.child = l.child, t.flags |= 128, t = null) : (se(), c = a.fallback, u = t.mode, a = rn(
          { mode: "visible", children: a.children },
          u
        ), c = Ue(
          c,
          u,
          e,
          null
        ), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Be(
          t,
          l.child,
          null,
          e
        ), a = t.child, a.memoizedState = rc(e), a.childLanes = dc(
          l,
          i,
          e
        ), t.memoizedState = oc, t = lu(null, a));
      else if (fe(t), $c(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var y = i.dgst;
        i = y, a = Error(s(419)), a.stack = "", a.digest = i, La({ value: a, source: null, stack: null }), t = mc(
          l,
          t,
          e
        );
      } else if (Hl || na(l, t, e, !1), i = (e & l.childLanes) !== 0, Hl || i) {
        if (i = Tl, i !== null && (a = Ef(i, e), a !== 0 && a !== f.retryLane))
          throw f.retryLane = a, Ne(l, a), nt(i, l, a), fc;
        wc(c) || bn(), t = mc(
          l,
          t,
          e
        );
      } else
        wc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, El = At(
          c.nextSibling
        ), Kl = t, al = !0, ee = null, _t = !1, l !== null && Ss(t, l), t = hc(
          t,
          a.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (se(), c = a.fallback, u = t.mode, f = l.child, y = f.sibling, a = Bt(f, {
      mode: "hidden",
      children: a.children
    }), a.subtreeFlags = f.subtreeFlags & 65011712, y !== null ? c = Bt(
      y,
      c
    ) : (c = Ue(
      c,
      u,
      e,
      null
    ), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, lu(null, a), a = t.child, c = l.child.memoizedState, c === null ? c = rc(e) : (u = c.cachePool, u !== null ? (f = xl._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = zs(), c = {
      baseLanes: c.baseLanes | e,
      cachePool: u
    }), a.memoizedState = c, a.childLanes = dc(
      l,
      i,
      e
    ), t.memoizedState = oc, lu(l.child, a)) : (fe(t), e = l.child, l = e.sibling, e = Bt(e, {
      mode: "visible",
      children: a.children
    }), e.return = t, e.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = e, t.memoizedState = null, e);
  }
  function hc(l, t) {
    return t = rn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function rn(l, t) {
    return l = ot(22, l, null, t), l.lanes = 0, l;
  }
  function mc(l, t, e) {
    return Be(t, l.child, null, e), l = hc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Go(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    a !== null && (a.lanes |= t), Ni(l.return, t, e);
  }
  function yc(l, t, e, a, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: e,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = e, i.tailMode = u, i.treeForkCount = n);
  }
  function Xo(l, t, e) {
    var a = t.pendingProps, u = a.revealOrder, n = a.tail;
    a = a.children;
    var i = Ul.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, H(Ul, i), wl(l, t, a, e), a = al ? Qa : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Go(l, e, t);
        else if (l.tag === 19)
          Go(l, e, t);
        else if (l.child !== null) {
          l.child.return = l, l = l.child;
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            break l;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    switch (u) {
      case "forwards":
        for (e = t.child, u = null; e !== null; )
          l = e.alternate, l !== null && Iu(l) === null && (u = e), e = e.sibling;
        e = u, e === null ? (u = t.child, t.child = null) : (u = e.sibling, e.sibling = null), yc(
          t,
          !1,
          u,
          e,
          n,
          a
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (e = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Iu(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = e, e = u, u = l;
        }
        yc(
          t,
          !0,
          e,
          null,
          n,
          a
        );
        break;
      case "together":
        yc(
          t,
          !1,
          null,
          null,
          void 0,
          a
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Zt(l, t, e) {
    if (l !== null && (t.dependencies = l.dependencies), de |= t.lanes, (e & t.childLanes) === 0)
      if (l !== null) {
        if (na(
          l,
          t,
          e,
          !1
        ), (e & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, e = Bt(l, l.pendingProps), t.child = e, e.return = t; l.sibling !== null; )
        l = l.sibling, e = e.sibling = Bt(l, l.pendingProps), e.return = t;
      e.sibling = null;
    }
    return t.child;
  }
  function vc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Vu(l)));
  }
  function dm(l, t, e) {
    switch (t.tag) {
      case 3:
        kl(t, t.stateNode.containerInfo), ue(t, xl, l.memoizedState.cache), Ce();
        break;
      case 27:
      case 5:
        Oa(t);
        break;
      case 4:
        kl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ue(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Qi(t), null;
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null ? (fe(t), t.flags |= 128, null) : (e & t.child.childLanes) !== 0 ? Yo(l, t, e) : (fe(t), l = Zt(
            l,
            t,
            e
          ), l !== null ? l.sibling : null);
        fe(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (a = (e & t.childLanes) !== 0, a || (na(
          l,
          t,
          e,
          !1
        ), a = (e & t.childLanes) !== 0), u) {
          if (a)
            return Xo(
              l,
              t,
              e
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), H(Ul, Ul.current), a) break;
        return null;
      case 22:
        return t.lanes = 0, jo(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        ue(t, xl, l.memoizedState.cache);
    }
    return Zt(l, t, e);
  }
  function Qo(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Hl = !0;
      else {
        if (!vc(l, e) && (t.flags & 128) === 0)
          return Hl = !1, dm(
            l,
            t,
            e
          );
        Hl = (l.flags & 131072) !== 0;
      }
    else
      Hl = !1, al && (t.flags & 1048576) !== 0 && ps(t, Qa, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (l = He(t.elementType), t.type = l, typeof l == "function")
            Ti(l) ? (a = Ge(l, a), t.tag = 1, t = qo(
              null,
              t,
              l,
              a,
              e
            )) : (t.tag = 0, t = sc(
              null,
              t,
              l,
              a,
              e
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === jl) {
                t.tag = 11, t = No(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              } else if (u === K) {
                t.tag = 14, t = Uo(
                  null,
                  t,
                  l,
                  a,
                  e
                );
                break l;
              }
            }
            throw t = Il(l) || l, Error(s(306, t, ""));
          }
        }
        return t;
      case 0:
        return sc(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 1:
        return a = t.type, u = Ge(
          a,
          t.pendingProps
        ), qo(
          l,
          t,
          a,
          u,
          e
        );
      case 3:
        l: {
          if (kl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(s(387));
          a = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, qi(l, t), Wa(t, a, null, e);
          var i = t.memoizedState;
          if (a = i.cache, ue(t, xl, a), a !== n.cache && Ui(
            t,
            [xl],
            e,
            !0
          ), $a(), a = i.element, n.isDehydrated)
            if (n = {
              element: a,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Bo(
                l,
                t,
                a,
                e
              );
              break l;
            } else if (a !== u) {
              u = St(
                Error(s(424)),
                t
              ), La(u), t = Bo(
                l,
                t,
                a,
                e
              );
              break l;
            } else {
              switch (l = t.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (El = At(l.firstChild), Kl = t, al = !0, ee = null, _t = !0, e = Cs(
                t,
                null,
                a,
                e
              ), t.child = e; e; )
                e.flags = e.flags & -3 | 4096, e = e.sibling;
            }
          else {
            if (Ce(), a === u) {
              t = Zt(
                l,
                t,
                e
              );
              break l;
            }
            wl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return on(l, t), l === null ? (e = Ir(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = e : al || (e = t.type, l = t.pendingProps, a = Mn(
          k.current
        ).createElement(e), a[Vl] = t, a[Pl] = l, $l(a, e, l), Ll(a), t.stateNode = a) : t.memoizedState = Ir(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Oa(t), l === null && al && (a = t.stateNode = Wr(
          t.type,
          t.pendingProps,
          k.current
        ), Kl = t, _t = !0, u = El, ge(t.type) ? (Wc = u, El = At(a.firstChild)) : El = u), wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), on(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && al && ((u = a = El) && (a = Lm(
          a,
          t.type,
          t.pendingProps,
          _t
        ), a !== null ? (t.stateNode = a, Kl = t, El = At(a.firstChild), _t = !1, u = !0) : u = !1), u || ae(t)), Oa(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, a = n.children, Vc(u, n) ? a = null : i !== null && Vc(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Zi(
          l,
          t,
          am,
          null,
          null,
          e
        ), yu._currentValue = u), on(l, t), wl(l, t, a, e), t.child;
      case 6:
        return l === null && al && ((l = e = El) && (e = Zm(
          e,
          t.pendingProps,
          _t
        ), e !== null ? (t.stateNode = e, Kl = t, El = null, l = !0) : l = !1), l || ae(t)), null;
      case 13:
        return Yo(l, t, e);
      case 4:
        return kl(
          t,
          t.stateNode.containerInfo
        ), a = t.pendingProps, l === null ? t.child = Be(
          t,
          null,
          a,
          e
        ) : wl(l, t, a, e), t.child;
      case 11:
        return No(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 7:
        return wl(
          l,
          t,
          t.pendingProps,
          e
        ), t.child;
      case 8:
        return wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 12:
        return wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 10:
        return a = t.pendingProps, ue(t, t.type, a.value), wl(l, t, a.children, e), t.child;
      case 9:
        return u = t.type._context, a = t.pendingProps.children, xe(t), u = Jl(u), a = a(u), t.flags |= 1, wl(l, t, a, e), t.child;
      case 14:
        return Uo(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 15:
        return Co(
          l,
          t,
          t.type,
          t.pendingProps,
          e
        );
      case 19:
        return Xo(l, t, e);
      case 31:
        return rm(l, t, e);
      case 22:
        return jo(
          l,
          t,
          e,
          t.pendingProps
        );
      case 24:
        return xe(t), a = Jl(xl), l === null ? (u = xi(), u === null && (u = Tl, n = Ci(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= e), u = n), t.memoizedState = { parent: a, cache: u }, Hi(t), ue(t, xl, u)) : ((l.lanes & e) !== 0 && (qi(l, t), Wa(t, null, null, e), $a()), u = l.memoizedState, n = t.memoizedState, u.parent !== a ? (u = { parent: a, cache: a }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ue(t, xl, a)) : (a = n.cache, ue(t, xl, a), a !== u.cache && Ui(
          t,
          [xl],
          e,
          !0
        ))), wl(
          l,
          t,
          t.pendingProps.children,
          e
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function gc(l, t, e, a, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (mr()) l.flags |= 8192;
        else
          throw qe = $u, Ri;
    } else l.flags &= -16777217;
  }
  function Lo(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ad(t))
      if (mr()) l.flags |= 8192;
      else
        throw qe = $u, Ri;
  }
  function dn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? bf() : 536870912, l.lanes |= t, ga |= t);
  }
  function tu(l, t) {
    if (!al)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var e = null; t !== null; )
            t.alternate !== null && (e = t), t = t.sibling;
          e === null ? l.tail = null : e.sibling = null;
          break;
        case "collapsed":
          e = l.tail;
          for (var a = null; e !== null; )
            e.alternate !== null && (a = e), e = e.sibling;
          a === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : a.sibling = null;
      }
  }
  function Al(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, e = 0, a = 0;
    if (t)
      for (var u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags & 65011712, a |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        e |= u.lanes | u.childLanes, a |= u.subtreeFlags, a |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= a, l.childLanes = e, t;
  }
  function hm(l, t, e) {
    var a = t.pendingProps;
    switch (zi(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Al(t), null;
      case 1:
        return Al(t), null;
      case 3:
        return e = t.stateNode, a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Xt(xl), Nl(), e.pendingContext && (e.context = e.pendingContext, e.pendingContext = null), (l === null || l.child === null) && (ua(t) ? Vt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Mi())), Al(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Vt(t), n !== null ? (Al(t), Lo(t, n)) : (Al(t), gc(
          t,
          u,
          null,
          a,
          e
        ))) : n ? n !== l.memoizedState ? (Vt(t), Al(t), Lo(t, n)) : (Al(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== a && Vt(t), Al(t), gc(
          t,
          u,
          l,
          a,
          e
        )), null;
      case 27:
        if (_u(t), e = k.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Al(t), null;
          }
          l = Y.current, ua(t) ? bs(t) : (l = Wr(u, a, e), t.stateNode = l, Vt(t));
        }
        return Al(t), null;
      case 5:
        if (_u(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Al(t), null;
          }
          if (n = Y.current, ua(t))
            bs(t);
          else {
            var i = Mn(
              k.current
            );
            switch (n) {
              case 1:
                n = i.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                n = i.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    n = i.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    n = i.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    n = i.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                      n.firstChild
                    );
                    break;
                  case "select":
                    n = typeof a.is == "string" ? i.createElement("select", {
                      is: a.is
                    }) : i.createElement("select"), a.multiple ? n.multiple = !0 : a.size && (n.size = a.size);
                    break;
                  default:
                    n = typeof a.is == "string" ? i.createElement(u, { is: a.is }) : i.createElement(u);
                }
            }
            n[Vl] = t, n[Pl] = a;
            l: for (i = t.child; i !== null; ) {
              if (i.tag === 5 || i.tag === 6)
                n.appendChild(i.stateNode);
              else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                i.child.return = i, i = i.child;
                continue;
              }
              if (i === t) break l;
              for (; i.sibling === null; ) {
                if (i.return === null || i.return === t)
                  break l;
                i = i.return;
              }
              i.sibling.return = i.return, i = i.sibling;
            }
            t.stateNode = n;
            l: switch ($l(n, u, a), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Vt(t);
          }
        }
        return Al(t), gc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          e
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== a && Vt(t);
        else {
          if (typeof a != "string" && t.stateNode === null)
            throw Error(s(166));
          if (l = k.current, ua(t)) {
            if (l = t.stateNode, e = t.memoizedProps, a = null, u = Kl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  a = u.memoizedProps;
              }
            l[Vl] = t, l = !!(l.nodeValue === e || a !== null && a.suppressHydrationWarning === !0 || Yr(l.nodeValue, e)), l || ae(t, !0);
          } else
            l = Mn(l).createTextNode(
              a
            ), l[Vl] = t, t.stateNode = l;
        }
        return Al(t), null;
      case 31:
        if (e = t.memoizedState, l === null || l.memoizedState !== null) {
          if (a = ua(t), e !== null) {
            if (l === null) {
              if (!a) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Vl] = t;
            } else
              Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), l = !1;
          } else
            e = Mi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), l = !0;
          if (!l)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Al(t), null;
      case 13:
        if (a = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ua(t), a !== null && a.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Vl] = t;
            } else
              Ce(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), u = !1;
          } else
            u = Mi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (dt(t), t) : (dt(t), null);
        }
        return dt(t), (t.flags & 128) !== 0 ? (t.lanes = e, t) : (e = a !== null, l = l !== null && l.memoizedState !== null, e && (a = t.child, u = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (u = a.alternate.memoizedState.cachePool.pool), n = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (n = a.memoizedState.cachePool.pool), n !== u && (a.flags |= 2048)), e !== l && e && (t.child.flags |= 8192), dn(t, t.updateQueue), Al(t), null);
      case 4:
        return Nl(), l === null && Gc(t.stateNode.containerInfo), Al(t), null;
      case 10:
        return Xt(t.type), Al(t), null;
      case 19:
        if (O(Ul), a = t.memoizedState, a === null) return Al(t), null;
        if (u = (t.flags & 128) !== 0, n = a.rendering, n === null)
          if (u) tu(a, !1);
          else {
            if (Dl !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Iu(l), n !== null) {
                  for (t.flags |= 128, tu(a, !1), l = n.updateQueue, t.updateQueue = l, dn(t, l), t.subtreeFlags = 0, l = e, e = t.child; e !== null; )
                    ys(e, l), e = e.sibling;
                  return H(
                    Ul,
                    Ul.current & 1 | 2
                  ), al && Yt(t, a.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            a.tail !== null && it() > gn && (t.flags |= 128, u = !0, tu(a, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Iu(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, dn(t, l), tu(a, !0), a.tail === null && a.tailMode === "hidden" && !n.alternate && !al)
                return Al(t), null;
            } else
              2 * it() - a.renderingStartTime > gn && e !== 536870912 && (t.flags |= 128, u = !0, tu(a, !1), t.lanes = 4194304);
          a.isBackwards ? (n.sibling = t.child, t.child = n) : (l = a.last, l !== null ? l.sibling = n : t.child = n, a.last = n);
        }
        return a.tail !== null ? (l = a.tail, a.rendering = l, a.tail = l.sibling, a.renderingStartTime = it(), l.sibling = null, e = Ul.current, H(
          Ul,
          u ? e & 1 | 2 : e & 1
        ), al && Yt(t, a.treeForkCount), l) : (Al(t), null);
      case 22:
      case 23:
        return dt(t), Xi(), a = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (e & 536870912) !== 0 && (t.flags & 128) === 0 && (Al(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Al(t), e = t.updateQueue, e !== null && dn(t, e.retryQueue), e = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== e && (t.flags |= 2048), l !== null && O(Re), null;
      case 24:
        return e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Xt(xl), Al(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function mm(l, t) {
    switch (zi(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Xt(xl), Nl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return _u(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (dt(t), t.alternate === null)
            throw Error(s(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (dt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          Ce();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return O(Ul), null;
      case 4:
        return Nl(), null;
      case 10:
        return Xt(t.type), null;
      case 22:
      case 23:
        return dt(t), Xi(), l !== null && O(Re), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Xt(xl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zo(l, t) {
    switch (zi(t), t.tag) {
      case 3:
        Xt(xl), Nl();
        break;
      case 26:
      case 27:
      case 5:
        _u(t);
        break;
      case 4:
        Nl();
        break;
      case 31:
        t.memoizedState !== null && dt(t);
        break;
      case 13:
        dt(t);
        break;
      case 19:
        O(Ul);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        dt(t), Xi(), l !== null && O(Re);
        break;
      case 24:
        Xt(xl);
    }
  }
  function eu(l, t) {
    try {
      var e = t.updateQueue, a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        e = u;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var n = e.create, i = e.inst;
            a = n(), i.destroy = a;
          }
          e = e.next;
        } while (e !== u);
      }
    } catch (c) {
      yl(t, t.return, c);
    }
  }
  function oe(l, t, e) {
    try {
      var a = t.updateQueue, u = a !== null ? a.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        a = n;
        do {
          if ((a.tag & l) === l) {
            var i = a.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var f = e, y = c;
              try {
                y();
              } catch (b) {
                yl(
                  u,
                  f,
                  b
                );
              }
            }
          }
          a = a.next;
        } while (a !== n);
      }
    } catch (b) {
      yl(t, t.return, b);
    }
  }
  function Vo(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        xs(t, e);
      } catch (a) {
        yl(l, l.return, a);
      }
    }
  }
  function Ko(l, t, e) {
    e.props = Ge(
      l.type,
      l.memoizedProps
    ), e.state = l.memoizedState;
    try {
      e.componentWillUnmount();
    } catch (a) {
      yl(l, t, a);
    }
  }
  function au(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? l.refCleanup = e(a) : e.current = a;
      }
    } catch (u) {
      yl(l, t, u);
    }
  }
  function jt(l, t) {
    var e = l.ref, a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (u) {
          yl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (u) {
          yl(l, t, u);
        }
      else e.current = null;
  }
  function Jo(l) {
    var t = l.type, e = l.memoizedProps, a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? a.src = e.src : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function pc(l, t, e) {
    try {
      var a = l.stateNode;
      qm(a, l.type, e, t), a[Pl] = t;
    } catch (u) {
      yl(l, l.return, u);
    }
  }
  function wo(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ge(l.type) || l.tag === 4;
  }
  function Sc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || wo(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ge(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function bc(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).insertBefore(l, t) : (t = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, t.appendChild(l), e = e._reactRootContainer, e != null || t.onclick !== null || (t.onclick = Ht));
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode, t = null), l = l.child, l !== null))
      for (bc(l, t, e), l = l.sibling; l !== null; )
        bc(l, t, e), l = l.sibling;
  }
  function hn(l, t, e) {
    var a = l.tag;
    if (a === 5 || a === 6)
      l = l.stateNode, t ? e.insertBefore(l, t) : e.appendChild(l);
    else if (a !== 4 && (a === 27 && ge(l.type) && (e = l.stateNode), l = l.child, l !== null))
      for (hn(l, t, e), l = l.sibling; l !== null; )
        hn(l, t, e), l = l.sibling;
  }
  function $o(l) {
    var t = l.stateNode, e = l.memoizedProps;
    try {
      for (var a = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      $l(t, a, e), t[Vl] = l, t[Pl] = e;
    } catch (n) {
      yl(l, l.return, n);
    }
  }
  var Kt = !1, ql = !1, Tc = !1, Wo = typeof WeakSet == "function" ? WeakSet : Set, Zl = null;
  function ym(l, t) {
    if (l = l.containerInfo, Lc = Rn, l = is(l), mi(l)) {
      if ("selectionStart" in l)
        var e = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          e = (e = l.ownerDocument) && e.defaultView || window;
          var a = e.getSelection && e.getSelection();
          if (a && a.rangeCount !== 0) {
            e = a.anchorNode;
            var u = a.anchorOffset, n = a.focusNode;
            a = a.focusOffset;
            try {
              e.nodeType, n.nodeType;
            } catch {
              e = null;
              break l;
            }
            var i = 0, c = -1, f = -1, y = 0, b = 0, A = l, v = null;
            t: for (; ; ) {
              for (var p; A !== e || u !== 0 && A.nodeType !== 3 || (c = i + u), A !== n || a !== 0 && A.nodeType !== 3 || (f = i + a), A.nodeType === 3 && (i += A.nodeValue.length), (p = A.firstChild) !== null; )
                v = A, A = p;
              for (; ; ) {
                if (A === l) break t;
                if (v === e && ++y === u && (c = i), v === n && ++b === a && (f = i), (p = A.nextSibling) !== null) break;
                A = v, v = A.parentNode;
              }
              A = p;
            }
            e = c === -1 || f === -1 ? null : { start: c, end: f };
          } else e = null;
        }
      e = e || { start: 0, end: 0 };
    } else e = null;
    for (Zc = { focusedElem: l, selectionRange: e }, Rn = !1, Zl = t; Zl !== null; )
      if (t = Zl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Zl = l;
      else
        for (; Zl !== null; ) {
          switch (t = Zl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (e = 0; e < l.length; e++)
                  u = l[e], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, e = t, u = n.memoizedProps, n = n.memoizedState, a = e.stateNode;
                try {
                  var B = Ge(
                    e.type,
                    u
                  );
                  l = a.getSnapshotBeforeUpdate(
                    B,
                    n
                  ), a.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Z) {
                  yl(
                    e,
                    e.return,
                    Z
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, e = l.nodeType, e === 9)
                  Jc(l);
                else if (e === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Jc(l);
                      break;
                    default:
                      l.textContent = "";
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
              if ((l & 1024) !== 0) throw Error(s(163));
          }
          if (l = t.sibling, l !== null) {
            l.return = t.return, Zl = l;
            break;
          }
          Zl = t.return;
        }
  }
  function ko(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, e), a & 4 && eu(5, e);
        break;
      case 1:
        if (wt(l, e), a & 4)
          if (l = e.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              yl(e, e.return, i);
            }
          else {
            var u = Ge(
              e.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              l.componentDidUpdate(
                u,
                t,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (i) {
              yl(
                e,
                e.return,
                i
              );
            }
          }
        a & 64 && Vo(e), a & 512 && au(e, e.return);
        break;
      case 3:
        if (wt(l, e), a & 64 && (l = e.updateQueue, l !== null)) {
          if (t = null, e.child !== null)
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            xs(l, t);
          } catch (i) {
            yl(e, e.return, i);
          }
        }
        break;
      case 27:
        t === null && a & 4 && $o(e);
      case 26:
      case 5:
        wt(l, e), t === null && a & 4 && Jo(e), a & 512 && au(e, e.return);
        break;
      case 12:
        wt(l, e);
        break;
      case 31:
        wt(l, e), a & 4 && Po(l, e);
        break;
      case 13:
        wt(l, e), a & 4 && lr(l, e), a & 64 && (l = e.memoizedState, l !== null && (l = l.dehydrated, l !== null && (e = Am.bind(
          null,
          e
        ), Vm(l, e))));
        break;
      case 22:
        if (a = e.memoizedState !== null || Kt, !a) {
          t = t !== null && t.memoizedState !== null || ql, u = Kt;
          var n = ql;
          Kt = a, (ql = t) && !n ? $t(
            l,
            e,
            (e.subtreeFlags & 8772) !== 0
          ) : wt(l, e), Kt = u, ql = n;
        }
        break;
      case 30:
        break;
      default:
        wt(l, e);
    }
  }
  function Fo(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, Fo(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Fn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Ol = null, tt = !1;
  function Jt(l, t, e) {
    for (e = e.child; e !== null; )
      Io(l, t, e), e = e.sibling;
  }
  function Io(l, t, e) {
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(Ma, e);
      } catch {
      }
    switch (e.tag) {
      case 26:
        ql || jt(e, t), Jt(
          l,
          t,
          e
        ), e.memoizedState ? e.memoizedState.count-- : e.stateNode && (e = e.stateNode, e.parentNode.removeChild(e));
        break;
      case 27:
        ql || jt(e, t);
        var a = Ol, u = tt;
        ge(e.type) && (Ol = e.stateNode, tt = !1), Jt(
          l,
          t,
          e
        ), du(e.stateNode), Ol = a, tt = u;
        break;
      case 5:
        ql || jt(e, t);
      case 6:
        if (a = Ol, u = tt, Ol = null, Jt(
          l,
          t,
          e
        ), Ol = a, tt = u, Ol !== null)
          if (tt)
            try {
              (Ol.nodeType === 9 ? Ol.body : Ol.nodeName === "HTML" ? Ol.ownerDocument.body : Ol).removeChild(e.stateNode);
            } catch (n) {
              yl(
                e,
                t,
                n
              );
            }
          else
            try {
              Ol.removeChild(e.stateNode);
            } catch (n) {
              yl(
                e,
                t,
                n
              );
            }
        break;
      case 18:
        Ol !== null && (tt ? (l = Ol, Vr(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          e.stateNode
        ), za(l)) : Vr(Ol, e.stateNode));
        break;
      case 4:
        a = Ol, u = tt, Ol = e.stateNode.containerInfo, tt = !0, Jt(
          l,
          t,
          e
        ), Ol = a, tt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oe(2, e, t), ql || oe(4, e, t), Jt(
          l,
          t,
          e
        );
        break;
      case 1:
        ql || (jt(e, t), a = e.stateNode, typeof a.componentWillUnmount == "function" && Ko(
          e,
          t,
          a
        )), Jt(
          l,
          t,
          e
        );
        break;
      case 21:
        Jt(
          l,
          t,
          e
        );
        break;
      case 22:
        ql = (a = ql) || e.memoizedState !== null, Jt(
          l,
          t,
          e
        ), ql = a;
        break;
      default:
        Jt(
          l,
          t,
          e
        );
    }
  }
  function Po(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        za(l);
      } catch (e) {
        yl(t, t.return, e);
      }
    }
  }
  function lr(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        za(l);
      } catch (e) {
        yl(t, t.return, e);
      }
  }
  function vm(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new Wo()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new Wo()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function mn(l, t) {
    var e = vm(l);
    t.forEach(function(a) {
      if (!e.has(a)) {
        e.add(a);
        var u = zm.bind(null, l, a);
        a.then(u, u);
      }
    });
  }
  function et(l, t) {
    var e = t.deletions;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var u = e[a], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (ge(c.type)) {
                Ol = c.stateNode, tt = !1;
                break l;
              }
              break;
            case 5:
              Ol = c.stateNode, tt = !1;
              break l;
            case 3:
            case 4:
              Ol = c.stateNode.containerInfo, tt = !0;
              break l;
          }
          c = c.return;
        }
        if (Ol === null) throw Error(s(160));
        Io(n, i, u), Ol = null, tt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        tr(t, l), t = t.sibling;
  }
  var Mt = null;
  function tr(l, t) {
    var e = l.alternate, a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        et(t, l), at(l), a & 4 && (oe(3, l, l.return), eu(3, l), oe(5, l, l.return));
        break;
      case 1:
        et(t, l), at(l), a & 512 && (ql || e === null || jt(e, e.return)), a & 64 && Kt && (l = l.updateQueue, l !== null && (a = l.callbacks, a !== null && (e = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = e === null ? a : e.concat(a))));
        break;
      case 26:
        var u = Mt;
        if (et(t, l), at(l), a & 512 && (ql || e === null || jt(e, e.return)), a & 4) {
          var n = e !== null ? e.memoizedState : null;
          if (a = l.memoizedState, e === null)
            if (a === null)
              if (l.stateNode === null) {
                l: {
                  a = l.type, e = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (a) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ua] || n[Vl] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(a), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), $l(n, a, e), n[Vl] = l, Ll(n), a = n;
                      break l;
                    case "link":
                      var i = td(
                        "link",
                        "href",
                        u
                      ).get(a + (e.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (e.href == null || e.href === "" ? null : e.href) && n.getAttribute("rel") === (e.rel == null ? null : e.rel) && n.getAttribute("title") === (e.title == null ? null : e.title) && n.getAttribute("crossorigin") === (e.crossOrigin == null ? null : e.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), $l(n, a, e), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = td(
                        "meta",
                        "content",
                        u
                      ).get(a + (e.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (e.content == null ? null : "" + e.content) && n.getAttribute("name") === (e.name == null ? null : e.name) && n.getAttribute("property") === (e.property == null ? null : e.property) && n.getAttribute("http-equiv") === (e.httpEquiv == null ? null : e.httpEquiv) && n.getAttribute("charset") === (e.charSet == null ? null : e.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(a), $l(n, a, e), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(s(468, a));
                  }
                  n[Vl] = l, Ll(n), a = n;
                }
                l.stateNode = a;
              } else
                ed(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = ld(
                u,
                a,
                l.memoizedProps
              );
          else
            n !== a ? (n === null ? e.stateNode !== null && (e = e.stateNode, e.parentNode.removeChild(e)) : n.count--, a === null ? ed(
              u,
              l.type,
              l.stateNode
            ) : ld(
              u,
              a,
              l.memoizedProps
            )) : a === null && l.stateNode !== null && pc(
              l,
              l.memoizedProps,
              e.memoizedProps
            );
        }
        break;
      case 27:
        et(t, l), at(l), a & 512 && (ql || e === null || jt(e, e.return)), e !== null && a & 4 && pc(
          l,
          l.memoizedProps,
          e.memoizedProps
        );
        break;
      case 5:
        if (et(t, l), at(l), a & 512 && (ql || e === null || jt(e, e.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            $e(u, "");
          } catch (B) {
            yl(l, l.return, B);
          }
        }
        a & 4 && l.stateNode != null && (u = l.memoizedProps, pc(
          l,
          u,
          e !== null ? e.memoizedProps : u
        )), a & 1024 && (Tc = !0);
        break;
      case 6:
        if (et(t, l), at(l), a & 4) {
          if (l.stateNode === null)
            throw Error(s(162));
          a = l.memoizedProps, e = l.stateNode;
          try {
            e.nodeValue = a;
          } catch (B) {
            yl(l, l.return, B);
          }
        }
        break;
      case 3:
        if (Un = null, u = Mt, Mt = Dn(t.containerInfo), et(t, l), Mt = u, at(l), a & 4 && e !== null && e.memoizedState.isDehydrated)
          try {
            za(t.containerInfo);
          } catch (B) {
            yl(l, l.return, B);
          }
        Tc && (Tc = !1, er(l));
        break;
      case 4:
        a = Mt, Mt = Dn(
          l.stateNode.containerInfo
        ), et(t, l), at(l), Mt = a;
        break;
      case 12:
        et(t, l), at(l);
        break;
      case 31:
        et(t, l), at(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mn(l, a)));
        break;
      case 13:
        et(t, l), at(l), l.child.flags & 8192 && l.memoizedState !== null != (e !== null && e.memoizedState !== null) && (vn = it()), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mn(l, a)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = e !== null && e.memoizedState !== null, y = Kt, b = ql;
        if (Kt = y || u, ql = b || f, et(t, l), ql = b, Kt = y, at(l), a & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (e === null || f || Kt || ql || Xe(l)), e = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (e === null) {
                f = e = t;
                try {
                  if (n = f.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = f.stateNode;
                    var A = f.memoizedProps.style, v = A != null && A.hasOwnProperty("display") ? A.display : null;
                    c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (B) {
                  yl(f, f.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (e === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (B) {
                  yl(f, f.return, B);
                }
              }
            } else if (t.tag === 18) {
              if (e === null) {
                f = t;
                try {
                  var p = f.stateNode;
                  u ? Kr(p, !0) : Kr(f.stateNode, !1);
                } catch (B) {
                  yl(f, f.return, B);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              e === t && (e = null), t = t.return;
            }
            e === t && (e = null), t.sibling.return = t.return, t = t.sibling;
          }
        a & 4 && (a = l.updateQueue, a !== null && (e = a.retryQueue, e !== null && (a.retryQueue = null, mn(l, e))));
        break;
      case 19:
        et(t, l), at(l), a & 4 && (a = l.updateQueue, a !== null && (l.updateQueue = null, mn(l, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        et(t, l), at(l);
    }
  }
  function at(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (wo(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        if (e == null) throw Error(s(160));
        switch (e.tag) {
          case 27:
            var u = e.stateNode, n = Sc(l);
            hn(l, n, u);
            break;
          case 5:
            var i = e.stateNode;
            e.flags & 32 && ($e(i, ""), e.flags &= -33);
            var c = Sc(l);
            hn(l, c, i);
            break;
          case 3:
          case 4:
            var f = e.stateNode.containerInfo, y = Sc(l);
            bc(
              l,
              y,
              f
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (b) {
        yl(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function er(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        er(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        ko(l, t.alternate, t), t = t.sibling;
  }
  function Xe(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oe(4, t, t.return), Xe(t);
          break;
        case 1:
          jt(t, t.return);
          var e = t.stateNode;
          typeof e.componentWillUnmount == "function" && Ko(
            t,
            t.return,
            e
          ), Xe(t);
          break;
        case 27:
          du(t.stateNode);
        case 26:
        case 5:
          jt(t, t.return), Xe(t);
          break;
        case 22:
          t.memoizedState === null && Xe(t);
          break;
        case 30:
          Xe(t);
          break;
        default:
          Xe(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, e) {
    for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          $t(
            u,
            n,
            e
          ), eu(4, n);
          break;
        case 1:
          if ($t(
            u,
            n,
            e
          ), a = n, u = a.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (y) {
              yl(a, a.return, y);
            }
          if (a = n, u = a.updateQueue, u !== null) {
            var c = a.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  js(f[u], c);
            } catch (y) {
              yl(a, a.return, y);
            }
          }
          e && i & 64 && Vo(n), au(n, n.return);
          break;
        case 27:
          $o(n);
        case 26:
        case 5:
          $t(
            u,
            n,
            e
          ), e && a === null && i & 4 && Jo(n), au(n, n.return);
          break;
        case 12:
          $t(
            u,
            n,
            e
          );
          break;
        case 31:
          $t(
            u,
            n,
            e
          ), e && i & 4 && Po(u, n);
          break;
        case 13:
          $t(
            u,
            n,
            e
          ), e && i & 4 && lr(u, n);
          break;
        case 22:
          n.memoizedState === null && $t(
            u,
            n,
            e
          ), au(n, n.return);
          break;
        case 30:
          break;
        default:
          $t(
            u,
            n,
            e
          );
      }
      t = t.sibling;
    }
  }
  function _c(l, t) {
    var e = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (e = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== e && (l != null && l.refCount++, e != null && Za(e));
  }
  function Ec(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Za(l));
  }
  function Dt(l, t, e, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ar(
          l,
          t,
          e,
          a
        ), t = t.sibling;
  }
  function ar(l, t, e, a) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(
          l,
          t,
          e,
          a
        ), u & 2048 && eu(9, t);
        break;
      case 1:
        Dt(
          l,
          t,
          e,
          a
        );
        break;
      case 3:
        Dt(
          l,
          t,
          e,
          a
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Za(l)));
        break;
      case 12:
        if (u & 2048) {
          Dt(
            l,
            t,
            e,
            a
          ), l = t.stateNode;
          try {
            var n = t.memoizedProps, i = n.id, c = n.onPostCommit;
            typeof c == "function" && c(
              i,
              t.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (f) {
            yl(t, t.return, f);
          }
        } else
          Dt(
            l,
            t,
            e,
            a
          );
        break;
      case 31:
        Dt(
          l,
          t,
          e,
          a
        );
        break;
      case 13:
        Dt(
          l,
          t,
          e,
          a
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Dt(
          l,
          t,
          e,
          a
        ) : uu(l, t) : n._visibility & 2 ? Dt(
          l,
          t,
          e,
          a
        ) : (n._visibility |= 2, ma(
          l,
          t,
          e,
          a,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && _c(i, t);
        break;
      case 24:
        Dt(
          l,
          t,
          e,
          a
        ), u & 2048 && Ec(t.alternate, t);
        break;
      default:
        Dt(
          l,
          t,
          e,
          a
        );
    }
  }
  function ma(l, t, e, a, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = e, f = a, y = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ma(
            n,
            i,
            c,
            f,
            u
          ), eu(8, i);
          break;
        case 23:
          break;
        case 22:
          var b = i.stateNode;
          i.memoizedState !== null ? b._visibility & 2 ? ma(
            n,
            i,
            c,
            f,
            u
          ) : uu(
            n,
            i
          ) : (b._visibility |= 2, ma(
            n,
            i,
            c,
            f,
            u
          )), u && y & 2048 && _c(
            i.alternate,
            i
          );
          break;
        case 24:
          ma(
            n,
            i,
            c,
            f,
            u
          ), u && y & 2048 && Ec(i.alternate, i);
          break;
        default:
          ma(
            n,
            i,
            c,
            f,
            u
          );
      }
      t = t.sibling;
    }
  }
  function uu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l, a = t, u = a.flags;
        switch (a.tag) {
          case 22:
            uu(e, a), u & 2048 && _c(
              a.alternate,
              a
            );
            break;
          case 24:
            uu(e, a), u & 2048 && Ec(a.alternate, a);
            break;
          default:
            uu(e, a);
        }
        t = t.sibling;
      }
  }
  var nu = 8192;
  function ya(l, t, e) {
    if (l.subtreeFlags & nu)
      for (l = l.child; l !== null; )
        ur(
          l,
          t,
          e
        ), l = l.sibling;
  }
  function ur(l, t, e) {
    switch (l.tag) {
      case 26:
        ya(
          l,
          t,
          e
        ), l.flags & nu && l.memoizedState !== null && ey(
          e,
          Mt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        ya(
          l,
          t,
          e
        );
        break;
      case 3:
      case 4:
        var a = Mt;
        Mt = Dn(l.stateNode.containerInfo), ya(
          l,
          t,
          e
        ), Mt = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = nu, nu = 16777216, ya(
          l,
          t,
          e
        ), nu = a) : ya(
          l,
          t,
          e
        ));
        break;
      default:
        ya(
          l,
          t,
          e
        );
    }
  }
  function nr(l) {
    var t = l.alternate;
    if (t !== null && (l = t.child, l !== null)) {
      t.child = null;
      do
        t = l.sibling, l.sibling = null, l = t;
      while (l !== null);
    }
  }
  function iu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Zl = a, cr(
            a,
            l
          );
        }
      nr(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        ir(l), l = l.sibling;
  }
  function ir(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        iu(l), l.flags & 2048 && oe(9, l, l.return);
        break;
      case 3:
        iu(l);
        break;
      case 12:
        iu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, yn(l)) : iu(l);
        break;
      default:
        iu(l);
    }
  }
  function yn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          Zl = a, cr(
            a,
            l
          );
        }
      nr(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          oe(8, t, t.return), yn(t);
          break;
        case 22:
          e = t.stateNode, e._visibility & 2 && (e._visibility &= -3, yn(t));
          break;
        default:
          yn(t);
      }
      l = l.sibling;
    }
  }
  function cr(l, t) {
    for (; Zl !== null; ) {
      var e = Zl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          oe(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Za(e.memoizedState.cache);
      }
      if (a = e.child, a !== null) a.return = e, Zl = a;
      else
        l: for (e = l; Zl !== null; ) {
          a = Zl;
          var u = a.sibling, n = a.return;
          if (Fo(a), a === e) {
            Zl = null;
            break l;
          }
          if (u !== null) {
            u.return = n, Zl = u;
            break l;
          }
          Zl = n;
        }
    }
  }
  var gm = {
    getCacheForType: function(l) {
      var t = Jl(xl), e = t.data.get(l);
      return e === void 0 && (e = l(), t.data.set(l, e)), e;
    },
    cacheSignal: function() {
      return Jl(xl).controller.signal;
    }
  }, pm = typeof WeakMap == "function" ? WeakMap : Map, rl = 0, Tl = null, F = null, ll = 0, ml = 0, ht = null, re = !1, va = !1, Ac = !1, Wt = 0, Dl = 0, de = 0, Qe = 0, zc = 0, mt = 0, ga = 0, cu = null, ut = null, Oc = !1, vn = 0, fr = 0, gn = 1 / 0, pn = null, he = null, Yl = 0, me = null, pa = null, kt = 0, Mc = 0, Dc = null, sr = null, fu = 0, Nc = null;
  function yt() {
    return (rl & 2) !== 0 && ll !== 0 ? ll & -ll : T.T !== null ? Hc() : Af();
  }
  function or() {
    if (mt === 0)
      if ((ll & 536870912) === 0 || al) {
        var l = zu;
        zu <<= 1, (zu & 3932160) === 0 && (zu = 262144), mt = l;
      } else mt = 536870912;
    return l = rt.current, l !== null && (l.flags |= 32), mt;
  }
  function nt(l, t, e) {
    (l === Tl && (ml === 2 || ml === 9) || l.cancelPendingCommit !== null) && (Sa(l, 0), ye(
      l,
      ll,
      mt,
      !1
    )), Na(l, e), ((rl & 2) === 0 || l !== Tl) && (l === Tl && ((rl & 2) === 0 && (Qe |= e), Dl === 4 && ye(
      l,
      ll,
      mt,
      !1
    )), xt(l));
  }
  function rr(l, t, e) {
    if ((rl & 6) !== 0) throw Error(s(327));
    var a = !e && (t & 127) === 0 && (t & l.expiredLanes) === 0 || Da(l, t), u = a ? Tm(l, t) : Cc(l, t, !0), n = a;
    do {
      if (u === 0) {
        va && !a && ye(l, t, 0, !1);
        break;
      } else {
        if (e = l.current.alternate, n && !Sm(e)) {
          u = Cc(l, t, !1), n = !1;
          continue;
        }
        if (u === 2) {
          if (n = t, l.errorRecoveryDisabledLanes & n)
            var i = 0;
          else
            i = l.pendingLanes & -536870913, i = i !== 0 ? i : i & 536870912 ? 536870912 : 0;
          if (i !== 0) {
            t = i;
            l: {
              var c = l;
              u = cu;
              var f = c.current.memoizedState.isDehydrated;
              if (f && (Sa(c, i).flags |= 256), i = Cc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Ac && !f) {
                  c.errorRecoveryDisabledLanes |= n, Qe |= n, u = 4;
                  break l;
                }
                n = ut, ut = u, n !== null && (ut === null ? ut = n : ut.push.apply(
                  ut,
                  n
                ));
              }
              u = i;
            }
            if (n = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Sa(l, 0), ye(l, t, 0, !0);
          break;
        }
        l: {
          switch (a = l, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ye(
                a,
                t,
                mt,
                !re
              );
              break l;
            case 2:
              ut = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((t & 62914560) === t && (u = vn + 300 - it(), 10 < u)) {
            if (ye(
              a,
              t,
              mt,
              !re
            ), Mu(a, 0, !0) !== 0) break l;
            kt = t, a.timeoutHandle = Lr(
              dr.bind(
                null,
                a,
                e,
                ut,
                pn,
                Oc,
                t,
                mt,
                Qe,
                ga,
                re,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          dr(
            a,
            e,
            ut,
            pn,
            Oc,
            t,
            mt,
            Qe,
            ga,
            re,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    xt(l);
  }
  function dr(l, t, e, a, u, n, i, c, f, y, b, A, v, p) {
    if (l.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Ht
      }, ur(
        t,
        n,
        A
      );
      var B = (n & 62914560) === n ? vn - it() : (n & 4194048) === n ? fr - it() : 0;
      if (B = ay(
        A,
        B
      ), B !== null) {
        kt = n, l.cancelPendingCommit = B(
          br.bind(
            null,
            l,
            t,
            n,
            e,
            a,
            u,
            i,
            c,
            f,
            b,
            A,
            null,
            v,
            p
          )
        ), ye(l, n, i, !y);
        return;
      }
    }
    br(
      l,
      t,
      n,
      e,
      a,
      u,
      i,
      c,
      f
    );
  }
  function Sm(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if ((e === 0 || e === 11 || e === 15) && t.flags & 16384 && (e = t.updateQueue, e !== null && (e = e.stores, e !== null)))
        for (var a = 0; a < e.length; a++) {
          var u = e[a], n = u.getSnapshot;
          u = u.value;
          try {
            if (!st(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (e = t.child, t.subtreeFlags & 16384 && e !== null)
        e.return = t, t = e;
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function ye(l, t, e, a) {
    t &= ~zc, t &= ~Qe, l.suspendedLanes |= t, l.pingedLanes &= ~t, a && (l.warmLanes |= t), a = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - ft(u), i = 1 << n;
      a[n] = -1, u &= ~i;
    }
    e !== 0 && Tf(l, e, t);
  }
  function Sn() {
    return (rl & 6) === 0 ? (su(0), !1) : !0;
  }
  function Uc() {
    if (F !== null) {
      if (ml === 0)
        var l = F.return;
      else
        l = F, Gt = je = null, Ji(l), sa = null, Ka = 0, l = F;
      for (; l !== null; )
        Zo(l.alternate, l), l = l.return;
      F = null;
    }
  }
  function Sa(l, t) {
    var e = l.timeoutHandle;
    e !== -1 && (l.timeoutHandle = -1, Gm(e)), e = l.cancelPendingCommit, e !== null && (l.cancelPendingCommit = null, e()), kt = 0, Uc(), Tl = l, F = e = Bt(l.current, null), ll = t, ml = 0, ht = null, re = !1, va = Da(l, t), Ac = !1, ga = mt = zc = Qe = de = Dl = 0, ut = cu = null, Oc = !1, (t & 8) !== 0 && (t |= t & 32);
    var a = l.entangledLanes;
    if (a !== 0)
      for (l = l.entanglements, a &= t; 0 < a; ) {
        var u = 31 - ft(a), n = 1 << u;
        t |= l[u], a &= ~n;
      }
    return Wt = t, Gu(), e;
  }
  function hr(l, t) {
    $ = null, T.H = Pa, t === fa || t === wu ? (t = Ds(), ml = 3) : t === Ri ? (t = Ds(), ml = 4) : ml = t === fc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, ht = t, F === null && (Dl = 1, fn(
      l,
      St(t, l.current)
    ));
  }
  function mr() {
    var l = rt.current;
    return l === null ? !0 : (ll & 4194048) === ll ? Et === null : (ll & 62914560) === ll || (ll & 536870912) !== 0 ? l === Et : !1;
  }
  function yr() {
    var l = T.H;
    return T.H = Pa, l === null ? Pa : l;
  }
  function vr() {
    var l = T.A;
    return T.A = gm, l;
  }
  function bn() {
    Dl = 4, re || (ll & 4194048) !== ll && rt.current !== null || (va = !0), (de & 134217727) === 0 && (Qe & 134217727) === 0 || Tl === null || ye(
      Tl,
      ll,
      mt,
      !1
    );
  }
  function Cc(l, t, e) {
    var a = rl;
    rl |= 2;
    var u = yr(), n = vr();
    (Tl !== l || ll !== t) && (pn = null, Sa(l, t)), t = !1;
    var i = Dl;
    l: do
      try {
        if (ml !== 0 && F !== null) {
          var c = F, f = ht;
          switch (ml) {
            case 8:
              Uc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              rt.current === null && (t = !0);
              var y = ml;
              if (ml = 0, ht = null, ba(l, c, f, y), e && va) {
                i = 0;
                break l;
              }
              break;
            default:
              y = ml, ml = 0, ht = null, ba(l, c, f, y);
          }
        }
        bm(), i = Dl;
        break;
      } catch (b) {
        hr(l, b);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Gt = je = null, rl = a, T.H = u, T.A = n, F === null && (Tl = null, ll = 0, Gu()), i;
  }
  function bm() {
    for (; F !== null; ) gr(F);
  }
  function Tm(l, t) {
    var e = rl;
    rl |= 2;
    var a = yr(), u = vr();
    Tl !== l || ll !== t ? (pn = null, gn = it() + 500, Sa(l, t)) : va = Da(
      l,
      t
    );
    l: do
      try {
        if (ml !== 0 && F !== null) {
          t = F;
          var n = ht;
          t: switch (ml) {
            case 1:
              ml = 0, ht = null, ba(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (Os(n)) {
                ml = 0, ht = null, pr(t);
                break;
              }
              t = function() {
                ml !== 2 && ml !== 9 || Tl !== l || (ml = 7), xt(l);
              }, n.then(t, t);
              break l;
            case 3:
              ml = 7;
              break l;
            case 4:
              ml = 5;
              break l;
            case 7:
              Os(n) ? (ml = 0, ht = null, pr(t)) : (ml = 0, ht = null, ba(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (F.tag) {
                case 26:
                  i = F.memoizedState;
                case 5:
                case 27:
                  var c = F;
                  if (i ? ad(i) : c.stateNode.complete) {
                    ml = 0, ht = null;
                    var f = c.sibling;
                    if (f !== null) F = f;
                    else {
                      var y = c.return;
                      y !== null ? (F = y, Tn(y)) : F = null;
                    }
                    break t;
                  }
              }
              ml = 0, ht = null, ba(l, t, n, 5);
              break;
            case 6:
              ml = 0, ht = null, ba(l, t, n, 6);
              break;
            case 8:
              Uc(), Dl = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        _m();
        break;
      } catch (b) {
        hr(l, b);
      }
    while (!0);
    return Gt = je = null, T.H = a, T.A = u, rl = e, F !== null ? 0 : (Tl = null, ll = 0, Gu(), Dl);
  }
  function _m() {
    for (; F !== null && !Kd(); )
      gr(F);
  }
  function gr(l) {
    var t = Qo(l.alternate, l, Wt);
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : F = t;
  }
  function pr(l) {
    var t = l, e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ho(
          e,
          t,
          t.pendingProps,
          t.type,
          void 0,
          ll
        );
        break;
      case 11:
        t = Ho(
          e,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          ll
        );
        break;
      case 5:
        Ji(t);
      default:
        Zo(e, t), t = F = ys(t, Wt), t = Qo(e, t, Wt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : F = t;
  }
  function ba(l, t, e, a) {
    Gt = je = null, Ji(t), sa = null, Ka = 0;
    var u = t.return;
    try {
      if (om(
        l,
        u,
        t,
        e,
        ll
      )) {
        Dl = 1, fn(
          l,
          St(e, l.current)
        ), F = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw F = u, n;
      Dl = 1, fn(
        l,
        St(e, l.current)
      ), F = null;
      return;
    }
    t.flags & 32768 ? (al || a === 1 ? l = !0 : va || (ll & 536870912) !== 0 ? l = !1 : (re = l = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = rt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Sr(t, l)) : Tn(t);
  }
  function Tn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Sr(
          t,
          re
        );
        return;
      }
      l = t.return;
      var e = hm(
        t.alternate,
        t,
        Wt
      );
      if (e !== null) {
        F = e;
        return;
      }
      if (t = t.sibling, t !== null) {
        F = t;
        return;
      }
      F = t = l;
    } while (t !== null);
    Dl === 0 && (Dl = 5);
  }
  function Sr(l, t) {
    do {
      var e = mm(l.alternate, l);
      if (e !== null) {
        e.flags &= 32767, F = e;
        return;
      }
      if (e = l.return, e !== null && (e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null), !t && (l = l.sibling, l !== null)) {
        F = l;
        return;
      }
      F = l = e;
    } while (l !== null);
    Dl = 6, F = null;
  }
  function br(l, t, e, a, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do
      _n();
    while (Yl !== 0);
    if ((rl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (n = t.lanes | t.childLanes, n |= Si, th(
        l,
        e,
        n,
        i,
        c,
        f
      ), l === Tl && (F = Tl = null, ll = 0), pa = t, me = l, kt = e, Mc = n, Dc = u, sr = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Om(Eu, function() {
        return zr(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
        a = T.T, T.T = null, u = x.p, x.p = 2, i = rl, rl |= 4;
        try {
          ym(l, t, e);
        } finally {
          rl = i, x.p = u, T.T = a;
        }
      }
      Yl = 1, Tr(), _r(), Er();
    }
  }
  function Tr() {
    if (Yl === 1) {
      Yl = 0;
      var l = me, t = pa, e = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || e) {
        e = T.T, T.T = null;
        var a = x.p;
        x.p = 2;
        var u = rl;
        rl |= 4;
        try {
          tr(t, l);
          var n = Zc, i = is(l.containerInfo), c = n.focusedElem, f = n.selectionRange;
          if (i !== c && c && c.ownerDocument && ns(
            c.ownerDocument.documentElement,
            c
          )) {
            if (f !== null && mi(c)) {
              var y = f.start, b = f.end;
              if (b === void 0 && (b = y), "selectionStart" in c)
                c.selectionStart = y, c.selectionEnd = Math.min(
                  b,
                  c.value.length
                );
              else {
                var A = c.ownerDocument || document, v = A && A.defaultView || window;
                if (v.getSelection) {
                  var p = v.getSelection(), B = c.textContent.length, Z = Math.min(f.start, B), Sl = f.end === void 0 ? Z : Math.min(f.end, B);
                  !p.extend && Z > Sl && (i = Sl, Sl = Z, Z = i);
                  var h = us(
                    c,
                    Z
                  ), r = us(
                    c,
                    Sl
                  );
                  if (h && r && (p.rangeCount !== 1 || p.anchorNode !== h.node || p.anchorOffset !== h.offset || p.focusNode !== r.node || p.focusOffset !== r.offset)) {
                    var m = A.createRange();
                    m.setStart(h.node, h.offset), p.removeAllRanges(), Z > Sl ? (p.addRange(m), p.extend(r.node, r.offset)) : (m.setEnd(r.node, r.offset), p.addRange(m));
                  }
                }
              }
            }
            for (A = [], p = c; p = p.parentNode; )
              p.nodeType === 1 && A.push({
                element: p,
                left: p.scrollLeft,
                top: p.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < A.length; c++) {
              var E = A[c];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Rn = !!Lc, Zc = Lc = null;
        } finally {
          rl = u, x.p = a, T.T = e;
        }
      }
      l.current = t, Yl = 2;
    }
  }
  function _r() {
    if (Yl === 2) {
      Yl = 0;
      var l = me, t = pa, e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        e = T.T, T.T = null;
        var a = x.p;
        x.p = 2;
        var u = rl;
        rl |= 4;
        try {
          ko(l, t.alternate, t);
        } finally {
          rl = u, x.p = a, T.T = e;
        }
      }
      Yl = 3;
    }
  }
  function Er() {
    if (Yl === 4 || Yl === 3) {
      Yl = 0, Jd();
      var l = me, t = pa, e = kt, a = sr;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Yl = 5 : (Yl = 0, pa = me = null, Ar(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (he = null), Wn(e), t = t.stateNode, ct && typeof ct.onCommitFiberRoot == "function")
        try {
          ct.onCommitFiberRoot(
            Ma,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        t = T.T, u = x.p, x.p = 2, T.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
            var c = a[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          T.T = t, x.p = u;
        }
      }
      (kt & 3) !== 0 && _n(), xt(l), u = l.pendingLanes, (e & 261930) !== 0 && (u & 42) !== 0 ? l === Nc ? fu++ : (fu = 0, Nc = l) : fu = 0, su(0);
    }
  }
  function Ar(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Za(t)));
  }
  function _n() {
    return Tr(), _r(), Er(), zr();
  }
  function zr() {
    if (Yl !== 5) return !1;
    var l = me, t = Mc;
    Mc = 0;
    var e = Wn(kt), a = T.T, u = x.p;
    try {
      x.p = 32 > e ? 32 : e, T.T = null, e = Dc, Dc = null;
      var n = me, i = kt;
      if (Yl = 0, pa = me = null, kt = 0, (rl & 6) !== 0) throw Error(s(331));
      var c = rl;
      if (rl |= 4, ir(n.current), ar(
        n,
        n.current,
        i,
        e
      ), rl = c, su(0, !1), ct && typeof ct.onPostCommitFiberRoot == "function")
        try {
          ct.onPostCommitFiberRoot(Ma, n);
        } catch {
        }
      return !0;
    } finally {
      x.p = u, T.T = a, Ar(l, t);
    }
  }
  function Or(l, t, e) {
    t = St(e, t), t = cc(l.stateNode, t, 2), l = ce(l, t, 2), l !== null && (Na(l, 2), xt(l));
  }
  function yl(l, t, e) {
    if (l.tag === 3)
      Or(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Or(
            t,
            l,
            e
          );
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (he === null || !he.has(a))) {
            l = St(e, l), e = Mo(2), a = ce(t, e, 2), a !== null && (Do(
              e,
              a,
              t,
              l
            ), Na(a, 2), xt(a));
            break;
          }
        }
        t = t.return;
      }
  }
  function jc(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new pm();
      var u = /* @__PURE__ */ new Set();
      a.set(t, u);
    } else
      u = a.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), a.set(t, u));
    u.has(e) || (Ac = !0, u.add(e), l = Em.bind(null, l, t, e), t.then(l, l));
  }
  function Em(l, t, e) {
    var a = l.pingCache;
    a !== null && a.delete(t), l.pingedLanes |= l.suspendedLanes & e, l.warmLanes &= ~e, Tl === l && (ll & e) === e && (Dl === 4 || Dl === 3 && (ll & 62914560) === ll && 300 > it() - vn ? (rl & 2) === 0 && Sa(l, 0) : zc |= e, ga === ll && (ga = 0)), xt(l);
  }
  function Mr(l, t) {
    t === 0 && (t = bf()), l = Ne(l, t), l !== null && (Na(l, t), xt(l));
  }
  function Am(l) {
    var t = l.memoizedState, e = 0;
    t !== null && (e = t.retryLane), Mr(l, e);
  }
  function zm(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode, u = l.memoizedState;
        u !== null && (e = u.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    a !== null && a.delete(t), Mr(l, e);
  }
  function Om(l, t) {
    return Kn(l, t);
  }
  var En = null, Ta = null, xc = !1, An = !1, Rc = !1, ve = 0;
  function xt(l) {
    l !== Ta && l.next === null && (Ta === null ? En = Ta = l : Ta = Ta.next = l), An = !0, xc || (xc = !0, Dm());
  }
  function su(l, t) {
    if (!Rc && An) {
      Rc = !0;
      do
        for (var e = !1, a = En; a !== null; ) {
          if (l !== 0) {
            var u = a.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = a.suspendedLanes, c = a.pingedLanes;
              n = (1 << 31 - ft(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (e = !0, Cr(a, n));
          } else
            n = ll, n = Mu(
              a,
              a === Tl ? n : 0,
              a.cancelPendingCommit !== null || a.timeoutHandle !== -1
            ), (n & 3) === 0 || Da(a, n) || (e = !0, Cr(a, n));
          a = a.next;
        }
      while (e);
      Rc = !1;
    }
  }
  function Mm() {
    Dr();
  }
  function Dr() {
    An = xc = !1;
    var l = 0;
    ve !== 0 && Ym() && (l = ve);
    for (var t = it(), e = null, a = En; a !== null; ) {
      var u = a.next, n = Nr(a, t);
      n === 0 ? (a.next = null, e === null ? En = u : e.next = u, u === null && (Ta = e)) : (e = a, (l !== 0 || (n & 3) !== 0) && (An = !0)), a = u;
    }
    Yl !== 0 && Yl !== 5 || su(l), ve !== 0 && (ve = 0);
  }
  function Nr(l, t) {
    for (var e = l.suspendedLanes, a = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - ft(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = lh(c, t)) : f <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, e = ll, e = Mu(
      l,
      l === t ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a = l.callbackNode, e === 0 || l === t && (ml === 2 || ml === 9) || l.cancelPendingCommit !== null)
      return a !== null && a !== null && Jn(a), l.callbackNode = null, l.callbackPriority = 0;
    if ((e & 3) === 0 || Da(l, e)) {
      if (t = e & -e, t === l.callbackPriority) return t;
      switch (a !== null && Jn(a), Wn(e)) {
        case 2:
        case 8:
          e = pf;
          break;
        case 32:
          e = Eu;
          break;
        case 268435456:
          e = Sf;
          break;
        default:
          e = Eu;
      }
      return a = Ur.bind(null, l), e = Kn(e, a), l.callbackPriority = t, l.callbackNode = e, t;
    }
    return a !== null && a !== null && Jn(a), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Ur(l, t) {
    if (Yl !== 0 && Yl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var e = l.callbackNode;
    if (_n() && l.callbackNode !== e)
      return null;
    var a = ll;
    return a = Mu(
      l,
      l === Tl ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), a === 0 ? null : (rr(l, a, t), Nr(l, it()), l.callbackNode != null && l.callbackNode === e ? Ur.bind(null, l) : null);
  }
  function Cr(l, t) {
    if (_n()) return null;
    rr(l, t, !0);
  }
  function Dm() {
    Xm(function() {
      (rl & 6) !== 0 ? Kn(
        gf,
        Mm
      ) : Dr();
    });
  }
  function Hc() {
    if (ve === 0) {
      var l = ia;
      l === 0 && (l = Au, Au <<= 1, (Au & 261888) === 0 && (Au = 256)), ve = l;
    }
    return ve;
  }
  function jr(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Cu("" + l);
  }
  function xr(l, t) {
    var e = t.ownerDocument.createElement("input");
    return e.name = t.name, e.value = t.value, l.id && e.setAttribute("form", l.id), t.parentNode.insertBefore(e, t), l = new FormData(l), e.parentNode.removeChild(e), l;
  }
  function Nm(l, t, e, a, u) {
    if (t === "submit" && e && e.stateNode === u) {
      var n = jr(
        (u[Pl] || null).action
      ), i = a.submitter;
      i && (t = (t = i[Pl] || null) ? jr(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new Hu(
        "action",
        "action",
        null,
        a,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (a.defaultPrevented) {
                if (ve !== 0) {
                  var f = i ? xr(u, i) : new FormData(u);
                  tc(
                    e,
                    {
                      pending: !0,
                      data: f,
                      method: u.method,
                      action: n
                    },
                    null,
                    f
                  );
                }
              } else
                typeof n == "function" && (c.preventDefault(), f = i ? xr(u, i) : new FormData(u), tc(
                  e,
                  {
                    pending: !0,
                    data: f,
                    method: u.method,
                    action: n
                  },
                  n,
                  f
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var qc = 0; qc < pi.length; qc++) {
    var Bc = pi[qc], Um = Bc.toLowerCase(), Cm = Bc[0].toUpperCase() + Bc.slice(1);
    Ot(
      Um,
      "on" + Cm
    );
  }
  Ot(ss, "onAnimationEnd"), Ot(os, "onAnimationIteration"), Ot(rs, "onAnimationStart"), Ot("dblclick", "onDoubleClick"), Ot("focusin", "onFocus"), Ot("focusout", "onBlur"), Ot(wh, "onTransitionRun"), Ot($h, "onTransitionStart"), Ot(Wh, "onTransitionCancel"), Ot(ds, "onTransitionEnd"), Je("onMouseEnter", ["mouseout", "mouseover"]), Je("onMouseLeave", ["mouseout", "mouseover"]), Je("onPointerEnter", ["pointerout", "pointerover"]), Je("onPointerLeave", ["pointerout", "pointerover"]), ze(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ze(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ze("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ze(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ze(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ze(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ou = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), jm = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ou)
  );
  function Rr(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e], u = a.event;
      a = a.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = a.length - 1; 0 <= i; i--) {
            var c = a[i], f = c.instance, y = c.currentTarget;
            if (c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (b) {
              Yu(b);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (i = 0; i < a.length; i++) {
            if (c = a[i], f = c.instance, y = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = y;
            try {
              n(u);
            } catch (b) {
              Yu(b);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function I(l, t) {
    var e = t[kn];
    e === void 0 && (e = t[kn] = /* @__PURE__ */ new Set());
    var a = l + "__bubble";
    e.has(a) || (Hr(t, l, 2, !1), e.add(a));
  }
  function Yc(l, t, e) {
    var a = 0;
    t && (a |= 4), Hr(
      e,
      l,
      a,
      t
    );
  }
  var zn = "_reactListening" + Math.random().toString(36).slice(2);
  function Gc(l) {
    if (!l[zn]) {
      l[zn] = !0, Mf.forEach(function(e) {
        e !== "selectionchange" && (jm.has(e) || Yc(e, !1, l), Yc(e, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[zn] || (t[zn] = !0, Yc("selectionchange", !1, t));
    }
  }
  function Hr(l, t, e, a) {
    switch (od(t)) {
      case 2:
        var u = iy;
        break;
      case 8:
        u = cy;
        break;
      default:
        u = lf;
    }
    e = u.bind(
      null,
      t,
      e,
      l
    ), u = void 0, !ni || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), a ? u !== void 0 ? l.addEventListener(t, e, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, e, !0) : u !== void 0 ? l.addEventListener(t, e, {
      passive: u
    }) : l.addEventListener(t, e, !1);
  }
  function Xc(l, t, e, a, u) {
    var n = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (; ; ) {
        if (a === null) return;
        var i = a.tag;
        if (i === 3 || i === 4) {
          var c = a.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = a.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = Ze(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              a = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        a = a.return;
      }
    Gf(function() {
      var y = n, b = ai(e), A = [];
      l: {
        var v = hs.get(l);
        if (v !== void 0) {
          var p = Hu, B = l;
          switch (l) {
            case "keypress":
              if (xu(e) === 0) break l;
            case "keydown":
            case "keyup":
              p = zh;
              break;
            case "focusin":
              B = "focus", p = si;
              break;
            case "focusout":
              B = "blur", p = si;
              break;
            case "beforeblur":
            case "afterblur":
              p = si;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              p = Lf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              p = hh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              p = Dh;
              break;
            case ss:
            case os:
            case rs:
              p = vh;
              break;
            case ds:
              p = Uh;
              break;
            case "scroll":
            case "scrollend":
              p = rh;
              break;
            case "wheel":
              p = jh;
              break;
            case "copy":
            case "cut":
            case "paste":
              p = ph;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              p = Vf;
              break;
            case "toggle":
            case "beforetoggle":
              p = Rh;
          }
          var Z = (t & 4) !== 0, Sl = !Z && (l === "scroll" || l === "scrollend"), h = Z ? v !== null ? v + "Capture" : null : v;
          Z = [];
          for (var r = y, m; r !== null; ) {
            var E = r;
            if (m = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || m === null || h === null || (E = ja(r, h), E != null && Z.push(
              ru(r, E, m)
            )), Sl) break;
            r = r.return;
          }
          0 < Z.length && (v = new p(
            v,
            B,
            null,
            e,
            b
          ), A.push({ event: v, listeners: Z }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (v = l === "mouseover" || l === "pointerover", p = l === "mouseout" || l === "pointerout", v && e !== ei && (B = e.relatedTarget || e.fromElement) && (Ze(B) || B[Le]))
            break l;
          if ((p || v) && (v = b.window === b ? b : (v = b.ownerDocument) ? v.defaultView || v.parentWindow : window, p ? (B = e.relatedTarget || e.toElement, p = y, B = B ? Ze(B) : null, B !== null && (Sl = U(B), Z = B.tag, B !== Sl || Z !== 5 && Z !== 27 && Z !== 6) && (B = null)) : (p = null, B = y), p !== B)) {
            if (Z = Lf, E = "onMouseLeave", h = "onMouseEnter", r = "mouse", (l === "pointerout" || l === "pointerover") && (Z = Vf, E = "onPointerLeave", h = "onPointerEnter", r = "pointer"), Sl = p == null ? v : Ca(p), m = B == null ? v : Ca(B), v = new Z(
              E,
              r + "leave",
              p,
              e,
              b
            ), v.target = Sl, v.relatedTarget = m, E = null, Ze(b) === y && (Z = new Z(
              h,
              r + "enter",
              B,
              e,
              b
            ), Z.target = m, Z.relatedTarget = Sl, E = Z), Sl = E, p && B)
              t: {
                for (Z = xm, h = p, r = B, m = 0, E = h; E; E = Z(E))
                  m++;
                E = 0;
                for (var X = r; X; X = Z(X))
                  E++;
                for (; 0 < m - E; )
                  h = Z(h), m--;
                for (; 0 < E - m; )
                  r = Z(r), E--;
                for (; m--; ) {
                  if (h === r || r !== null && h === r.alternate) {
                    Z = h;
                    break t;
                  }
                  h = Z(h), r = Z(r);
                }
                Z = null;
              }
            else Z = null;
            p !== null && qr(
              A,
              v,
              p,
              Z,
              !1
            ), B !== null && Sl !== null && qr(
              A,
              Sl,
              B,
              Z,
              !0
            );
          }
        }
        l: {
          if (v = y ? Ca(y) : window, p = v.nodeName && v.nodeName.toLowerCase(), p === "select" || p === "input" && v.type === "file")
            var fl = If;
          else if (kf(v))
            if (Pf)
              fl = Vh;
            else {
              fl = Lh;
              var G = Qh;
            }
          else
            p = v.nodeName, !p || p.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? y && ti(y.elementType) && (fl = If) : fl = Zh;
          if (fl && (fl = fl(l, y))) {
            Ff(
              A,
              fl,
              e,
              b
            );
            break l;
          }
          G && G(l, v, y), l === "focusout" && y && v.type === "number" && y.memoizedProps.value != null && li(v, "number", v.value);
        }
        switch (G = y ? Ca(y) : window, l) {
          case "focusin":
            (kf(G) || G.contentEditable === "true") && (Ie = G, yi = y, Xa = null);
            break;
          case "focusout":
            Xa = yi = Ie = null;
            break;
          case "mousedown":
            vi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vi = !1, cs(A, e, b);
            break;
          case "selectionchange":
            if (Jh) break;
          case "keydown":
          case "keyup":
            cs(A, e, b);
        }
        var W;
        if (ri)
          l: {
            switch (l) {
              case "compositionstart":
                var tl = "onCompositionStart";
                break l;
              case "compositionend":
                tl = "onCompositionEnd";
                break l;
              case "compositionupdate":
                tl = "onCompositionUpdate";
                break l;
            }
            tl = void 0;
          }
        else
          Fe ? $f(l, e) && (tl = "onCompositionEnd") : l === "keydown" && e.keyCode === 229 && (tl = "onCompositionStart");
        tl && (Kf && e.locale !== "ko" && (Fe || tl !== "onCompositionStart" ? tl === "onCompositionEnd" && Fe && (W = Xf()) : (le = b, ii = "value" in le ? le.value : le.textContent, Fe = !0)), G = On(y, tl), 0 < G.length && (tl = new Zf(
          tl,
          l,
          null,
          e,
          b
        ), A.push({ event: tl, listeners: G }), W ? tl.data = W : (W = Wf(e), W !== null && (tl.data = W)))), (W = qh ? Bh(l, e) : Yh(l, e)) && (tl = On(y, "onBeforeInput"), 0 < tl.length && (G = new Zf(
          "onBeforeInput",
          "beforeinput",
          null,
          e,
          b
        ), A.push({
          event: G,
          listeners: tl
        }), G.data = W)), Nm(
          A,
          l,
          y,
          e,
          b
        );
      }
      Rr(A, t);
    });
  }
  function ru(l, t, e) {
    return {
      instance: l,
      listener: t,
      currentTarget: e
    };
  }
  function On(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = ja(l, e), u != null && a.unshift(
        ru(l, u, n)
      ), u = ja(l, t), u != null && a.push(
        ru(l, u, n)
      )), l.tag === 3) return a;
      l = l.return;
    }
    return [];
  }
  function xm(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function qr(l, t, e, a, u) {
    for (var n = t._reactName, i = []; e !== null && e !== a; ) {
      var c = e, f = c.alternate, y = c.stateNode;
      if (c = c.tag, f !== null && f === a) break;
      c !== 5 && c !== 26 && c !== 27 || y === null || (f = y, u ? (y = ja(e, n), y != null && i.unshift(
        ru(e, y, f)
      )) : u || (y = ja(e, n), y != null && i.push(
        ru(e, y, f)
      ))), e = e.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Rm = /\r\n?/g, Hm = /\u0000|\uFFFD/g;
  function Br(l) {
    return (typeof l == "string" ? l : "" + l).replace(Rm, `
`).replace(Hm, "");
  }
  function Yr(l, t) {
    return t = Br(t), Br(l) === t;
  }
  function pl(l, t, e, a, u, n) {
    switch (e) {
      case "children":
        typeof a == "string" ? t === "body" || t === "textarea" && a === "" || $e(l, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && $e(l, "" + a);
        break;
      case "className":
        Nu(l, "class", a);
        break;
      case "tabIndex":
        Nu(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Nu(l, e, a);
        break;
      case "style":
        Bf(l, a, n);
        break;
      case "data":
        if (t !== "object") {
          Nu(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Cu("" + a), l.setAttribute(e, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (e === "formAction" ? (t !== "input" && pl(l, t, "name", u.name, u, null), pl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), pl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), pl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (pl(l, t, "encType", u.encType, u, null), pl(l, t, "method", u.method, u, null), pl(l, t, "target", u.target, u, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        a = Cu("" + a), l.setAttribute(e, a);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
        break;
      case "onScroll":
        a != null && I("scroll", l);
        break;
      case "onScrollEnd":
        a != null && I("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
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
          l.removeAttribute("xlink:href");
          break;
        }
        e = Cu("" + a), l.setAttributeNS(
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
        a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "" + a) : l.removeAttribute(e);
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
        a && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, "") : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0 ? l.setAttribute(e, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? l.setAttribute(e, a) : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? l.removeAttribute(e) : l.setAttribute(e, a);
        break;
      case "popover":
        I("beforetoggle", l), I("toggle", l), Du(l, "popover", a);
        break;
      case "xlinkActuate":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          a
        );
        break;
      case "xlinkArcrole":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          a
        );
        break;
      case "xlinkRole":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          a
        );
        break;
      case "xlinkShow":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          a
        );
        break;
      case "xlinkTitle":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          a
        );
        break;
      case "xlinkType":
        Rt(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          a
        );
        break;
      case "xmlBase":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          a
        );
        break;
      case "xmlLang":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          a
        );
        break;
      case "xmlSpace":
        Rt(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          a
        );
        break;
      case "is":
        Du(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < e.length) || e[0] !== "o" && e[0] !== "O" || e[1] !== "n" && e[1] !== "N") && (e = sh.get(e) || e, Du(l, e, a));
    }
  }
  function Qc(l, t, e, a, u, n) {
    switch (e) {
      case "style":
        Bf(l, a, n);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a))
            throw Error(s(61));
          if (e = a.__html, e != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = e;
          }
        }
        break;
      case "children":
        typeof a == "string" ? $e(l, a) : (typeof a == "number" || typeof a == "bigint") && $e(l, "" + a);
        break;
      case "onScroll":
        a != null && I("scroll", l);
        break;
      case "onScrollEnd":
        a != null && I("scrollend", l);
        break;
      case "onClick":
        a != null && (l.onclick = Ht);
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
        if (!Df.hasOwnProperty(e))
          l: {
            if (e[0] === "o" && e[1] === "n" && (u = e.endsWith("Capture"), t = e.slice(2, u ? e.length - 7 : void 0), n = l[Pl] || null, n = n != null ? n[e] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof a == "function")) {
              typeof n != "function" && n !== null && (e in l ? l[e] = null : l.hasAttribute(e) && l.removeAttribute(e)), l.addEventListener(t, a, u);
              break l;
            }
            e in l ? l[e] = a : a === !0 ? l.setAttribute(e, "") : Du(l, e, a);
          }
    }
  }
  function $l(l, t, e) {
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
        I("error", l), I("load", l);
        var a = !1, u = !1, n;
        for (n in e)
          if (e.hasOwnProperty(n)) {
            var i = e[n];
            if (i != null)
              switch (n) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  pl(l, t, n, i, e, null);
              }
          }
        u && pl(l, t, "srcSet", e.srcSet, e, null), a && pl(l, t, "src", e.src, e, null);
        return;
      case "input":
        I("invalid", l);
        var c = n = i = u = null, f = null, y = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var b = e[a];
            if (b != null)
              switch (a) {
                case "name":
                  u = b;
                  break;
                case "type":
                  i = b;
                  break;
                case "checked":
                  f = b;
                  break;
                case "defaultChecked":
                  y = b;
                  break;
                case "value":
                  n = b;
                  break;
                case "defaultValue":
                  c = b;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (b != null)
                    throw Error(s(137, t));
                  break;
                default:
                  pl(l, t, a, b, e, null);
              }
          }
        xf(
          l,
          n,
          c,
          f,
          y,
          i,
          u,
          !1
        );
        return;
      case "select":
        I("invalid", l), a = i = n = null;
        for (u in e)
          if (e.hasOwnProperty(u) && (c = e[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                a = c;
              default:
                pl(l, t, u, c, e, null);
            }
        t = n, e = i, l.multiple = !!a, t != null ? we(l, !!a, t, !1) : e != null && we(l, !!a, e, !0);
        return;
      case "textarea":
        I("invalid", l), n = u = a = null;
        for (i in e)
          if (e.hasOwnProperty(i) && (c = e[i], c != null))
            switch (i) {
              case "value":
                a = c;
                break;
              case "defaultValue":
                u = c;
                break;
              case "children":
                n = c;
                break;
              case "dangerouslySetInnerHTML":
                if (c != null) throw Error(s(91));
                break;
              default:
                pl(l, t, i, c, e, null);
            }
        Hf(l, a, u, n);
        return;
      case "option":
        for (f in e)
          if (e.hasOwnProperty(f) && (a = e[f], a != null))
            switch (f) {
              case "selected":
                l.selected = a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                pl(l, t, f, a, e, null);
            }
        return;
      case "dialog":
        I("beforetoggle", l), I("toggle", l), I("cancel", l), I("close", l);
        break;
      case "iframe":
      case "object":
        I("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < ou.length; a++)
          I(ou[a], l);
        break;
      case "image":
        I("error", l), I("load", l);
        break;
      case "details":
        I("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        I("error", l), I("load", l);
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
        for (y in e)
          if (e.hasOwnProperty(y) && (a = e[y], a != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                pl(l, t, y, a, e, null);
            }
        return;
      default:
        if (ti(t)) {
          for (b in e)
            e.hasOwnProperty(b) && (a = e[b], a !== void 0 && Qc(
              l,
              t,
              b,
              a,
              e,
              void 0
            ));
          return;
        }
    }
    for (c in e)
      e.hasOwnProperty(c) && (a = e[c], a != null && pl(l, t, c, a, e, null));
  }
  function qm(l, t, e, a) {
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
        var u = null, n = null, i = null, c = null, f = null, y = null, b = null;
        for (p in e) {
          var A = e[p];
          if (e.hasOwnProperty(p) && A != null)
            switch (p) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = A;
              default:
                a.hasOwnProperty(p) || pl(l, t, p, null, a, A);
            }
        }
        for (var v in a) {
          var p = a[v];
          if (A = e[v], a.hasOwnProperty(v) && (p != null || A != null))
            switch (v) {
              case "type":
                n = p;
                break;
              case "name":
                u = p;
                break;
              case "checked":
                y = p;
                break;
              case "defaultChecked":
                b = p;
                break;
              case "value":
                i = p;
                break;
              case "defaultValue":
                c = p;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null)
                  throw Error(s(137, t));
                break;
              default:
                p !== A && pl(
                  l,
                  t,
                  v,
                  p,
                  a,
                  A
                );
            }
        }
        Pn(
          l,
          i,
          c,
          f,
          y,
          b,
          n,
          u
        );
        return;
      case "select":
        p = i = c = v = null;
        for (n in e)
          if (f = e[n], e.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                p = f;
              default:
                a.hasOwnProperty(n) || pl(
                  l,
                  t,
                  n,
                  null,
                  a,
                  f
                );
            }
        for (u in a)
          if (n = a[u], f = e[u], a.hasOwnProperty(u) && (n != null || f != null))
            switch (u) {
              case "value":
                v = n;
                break;
              case "defaultValue":
                c = n;
                break;
              case "multiple":
                i = n;
              default:
                n !== f && pl(
                  l,
                  t,
                  u,
                  n,
                  a,
                  f
                );
            }
        t = c, e = i, a = p, v != null ? we(l, !!e, v, !1) : !!a != !!e && (t != null ? we(l, !!e, t, !0) : we(l, !!e, e ? [] : "", !1));
        return;
      case "textarea":
        p = v = null;
        for (c in e)
          if (u = e[c], e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                pl(l, t, c, null, a, u);
            }
        for (i in a)
          if (u = a[i], n = e[i], a.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                v = u;
                break;
              case "defaultValue":
                p = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && pl(l, t, i, u, a, n);
            }
        Rf(l, v, p);
        return;
      case "option":
        for (var B in e)
          if (v = e[B], e.hasOwnProperty(B) && v != null && !a.hasOwnProperty(B))
            switch (B) {
              case "selected":
                l.selected = !1;
                break;
              default:
                pl(
                  l,
                  t,
                  B,
                  null,
                  a,
                  v
                );
            }
        for (f in a)
          if (v = a[f], p = e[f], a.hasOwnProperty(f) && v !== p && (v != null || p != null))
            switch (f) {
              case "selected":
                l.selected = v && typeof v != "function" && typeof v != "symbol";
                break;
              default:
                pl(
                  l,
                  t,
                  f,
                  v,
                  a,
                  p
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
        for (var Z in e)
          v = e[Z], e.hasOwnProperty(Z) && v != null && !a.hasOwnProperty(Z) && pl(l, t, Z, null, a, v);
        for (y in a)
          if (v = a[y], p = e[y], a.hasOwnProperty(y) && v !== p && (v != null || p != null))
            switch (y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(s(137, t));
                break;
              default:
                pl(
                  l,
                  t,
                  y,
                  v,
                  a,
                  p
                );
            }
        return;
      default:
        if (ti(t)) {
          for (var Sl in e)
            v = e[Sl], e.hasOwnProperty(Sl) && v !== void 0 && !a.hasOwnProperty(Sl) && Qc(
              l,
              t,
              Sl,
              void 0,
              a,
              v
            );
          for (b in a)
            v = a[b], p = e[b], !a.hasOwnProperty(b) || v === p || v === void 0 && p === void 0 || Qc(
              l,
              t,
              b,
              v,
              a,
              p
            );
          return;
        }
    }
    for (var h in e)
      v = e[h], e.hasOwnProperty(h) && v != null && !a.hasOwnProperty(h) && pl(l, t, h, null, a, v);
    for (A in a)
      v = a[A], p = e[A], !a.hasOwnProperty(A) || v === p || v == null && p == null || pl(l, t, A, v, a, p);
  }
  function Gr(l) {
    switch (l) {
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
  function Bm() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0; a < e.length; a++) {
        var u = e[a], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Gr(i)) {
          for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
            var f = e[a], y = f.startTime;
            if (y > c) break;
            var b = f.transferSize, A = f.initiatorType;
            b && Gr(A) && (f = f.responseEnd, i += b * (f < c ? 1 : (c - y) / (f - y)));
          }
          if (--a, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Lc = null, Zc = null;
  function Mn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Xr(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Qr(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function Vc(l, t) {
    return l === "textarea" || l === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Kc = null;
  function Ym() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Kc ? !1 : (Kc = l, !0) : (Kc = null, !1);
  }
  var Lr = typeof setTimeout == "function" ? setTimeout : void 0, Gm = typeof clearTimeout == "function" ? clearTimeout : void 0, Zr = typeof Promise == "function" ? Promise : void 0, Xm = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zr < "u" ? function(l) {
    return Zr.resolve(null).then(l).catch(Qm);
  } : Lr;
  function Qm(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ge(l) {
    return l === "head";
  }
  function Vr(l, t) {
    var e = t, a = 0;
    do {
      var u = e.nextSibling;
      if (l.removeChild(e), u && u.nodeType === 8)
        if (e = u.data, e === "/$" || e === "/&") {
          if (a === 0) {
            l.removeChild(u), za(t);
            return;
          }
          a--;
        } else if (e === "$" || e === "$?" || e === "$~" || e === "$!" || e === "&")
          a++;
        else if (e === "html")
          du(l.ownerDocument.documentElement);
        else if (e === "head") {
          e = l.ownerDocument.head, du(e);
          for (var n = e.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Ua] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || e.removeChild(n), n = i;
          }
        } else
          e === "body" && du(l.ownerDocument.body);
      e = u;
    } while (e);
    za(t);
  }
  function Kr(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (e.nodeType === 1 ? t ? (e._stashedDisplay = e.style.display, e.style.display = "none") : (e.style.display = e._stashedDisplay || "", e.getAttribute("style") === "" && e.removeAttribute("style")) : e.nodeType === 3 && (t ? (e._stashedText = e.nodeValue, e.nodeValue = "") : e.nodeValue = e._stashedText || ""), a && a.nodeType === 8)
        if (e = a.data, e === "/$") {
          if (l === 0) break;
          l--;
        } else
          e !== "$" && e !== "$?" && e !== "$~" && e !== "$!" || l++;
      e = a;
    } while (e);
  }
  function Jc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (t = t.nextSibling, e.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Jc(e), Fn(e);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function Lm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var u = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (a) {
        if (!l[Ua])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (n !== u.rel || l.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || l.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (n = l.getAttribute("src"), (n !== (u.src == null ? null : u.src) || l.getAttribute("type") !== (u.type == null ? null : u.type) || l.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var n = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && l.getAttribute("name") === n)
          return l;
      } else return l;
      if (l = At(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Zm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !e || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function Jr(l, t) {
    for (; l.nodeType !== 8; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function wc(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function $c(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
  }
  function Vm(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading")
      t();
    else {
      var a = function() {
        t(), e.removeEventListener("DOMContentLoaded", a);
      };
      e.addEventListener("DOMContentLoaded", a), l._reactRetry = a;
    }
  }
  function At(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = l.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Wc = null;
  function wr(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0)
            return At(l.nextSibling);
          t--;
        } else
          e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function $r(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else e !== "/$" && e !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Wr(l, t, e) {
    switch (t = Mn(e), l) {
      case "html":
        if (l = t.documentElement, !l) throw Error(s(452));
        return l;
      case "head":
        if (l = t.head, !l) throw Error(s(453));
        return l;
      case "body":
        if (l = t.body, !l) throw Error(s(454));
        return l;
      default:
        throw Error(s(451));
    }
  }
  function du(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Fn(l);
  }
  var zt = /* @__PURE__ */ new Map(), kr = /* @__PURE__ */ new Set();
  function Dn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Ft = x.d;
  x.d = {
    f: Km,
    r: Jm,
    D: wm,
    C: $m,
    L: Wm,
    m: km,
    X: Im,
    S: Fm,
    M: Pm
  };
  function Km() {
    var l = Ft.f(), t = Sn();
    return l || t;
  }
  function Jm(l) {
    var t = Ve(l);
    t !== null && t.tag === 5 && t.type === "form" ? ho(t) : Ft.r(l);
  }
  var _a = typeof document > "u" ? null : document;
  function Fr(l, t, e) {
    var a = _a;
    if (a && typeof t == "string" && t) {
      var u = gt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof e == "string" && (u += '[crossorigin="' + e + '"]'), kr.has(u) || (kr.add(u), l = { rel: l, crossOrigin: e, href: t }, a.querySelector(u) === null && (t = a.createElement("link"), $l(t, "link", l), Ll(t), a.head.appendChild(t)));
    }
  }
  function wm(l) {
    Ft.D(l), Fr("dns-prefetch", l, null);
  }
  function $m(l, t) {
    Ft.C(l, t), Fr("preconnect", l, t);
  }
  function Wm(l, t, e) {
    Ft.L(l, t, e);
    var a = _a;
    if (a && l && t) {
      var u = 'link[rel="preload"][as="' + gt(t) + '"]';
      t === "image" && e && e.imageSrcSet ? (u += '[imagesrcset="' + gt(
        e.imageSrcSet
      ) + '"]', typeof e.imageSizes == "string" && (u += '[imagesizes="' + gt(
        e.imageSizes
      ) + '"]')) : u += '[href="' + gt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = Ea(l);
          break;
        case "script":
          n = Aa(l);
      }
      zt.has(n) || (l = C(
        {
          rel: "preload",
          href: t === "image" && e && e.imageSrcSet ? void 0 : l,
          as: t
        },
        e
      ), zt.set(n, l), a.querySelector(u) !== null || t === "style" && a.querySelector(hu(n)) || t === "script" && a.querySelector(mu(n)) || (t = a.createElement("link"), $l(t, "link", l), Ll(t), a.head.appendChild(t)));
    }
  }
  function km(l, t) {
    Ft.m(l, t);
    var e = _a;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + gt(a) + '"][href="' + gt(l) + '"]', n = u;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Aa(l);
      }
      if (!zt.has(n) && (l = C({ rel: "modulepreload", href: l }, t), zt.set(n, l), e.querySelector(u) === null)) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(mu(n)))
              return;
        }
        a = e.createElement("link"), $l(a, "link", l), Ll(a), e.head.appendChild(a);
      }
    }
  }
  function Fm(l, t, e) {
    Ft.S(l, t, e);
    var a = _a;
    if (a && l) {
      var u = Ke(a).hoistableStyles, n = Ea(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = a.querySelector(
          hu(n)
        ))
          c.loading = 5;
        else {
          l = C(
            { rel: "stylesheet", href: l, "data-precedence": t },
            e
          ), (e = zt.get(n)) && kc(l, e);
          var f = i = a.createElement("link");
          Ll(f), $l(f, "link", l), f._p = new Promise(function(y, b) {
            f.onload = y, f.onerror = b;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Nn(i, t, a);
        }
        i = {
          type: "stylesheet",
          instance: i,
          count: 1,
          state: c
        }, u.set(n, i);
      }
    }
  }
  function Im(l, t) {
    Ft.X(l, t);
    var e = _a;
    if (e && l) {
      var a = Ke(e).hoistableScripts, u = Aa(l), n = a.get(u);
      n || (n = e.querySelector(mu(u)), n || (l = C({ src: l, async: !0 }, t), (t = zt.get(u)) && Fc(l, t), n = e.createElement("script"), Ll(n), $l(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Pm(l, t) {
    Ft.M(l, t);
    var e = _a;
    if (e && l) {
      var a = Ke(e).hoistableScripts, u = Aa(l), n = a.get(u);
      n || (n = e.querySelector(mu(u)), n || (l = C({ src: l, async: !0, type: "module" }, t), (t = zt.get(u)) && Fc(l, t), n = e.createElement("script"), Ll(n), $l(n, "link", l), e.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, a.set(u, n));
    }
  }
  function Ir(l, t, e, a) {
    var u = (u = k.current) ? Dn(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string" ? (t = Ea(e.href), e = Ke(
          u
        ).hoistableStyles, a = e.get(t), a || (a = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (e.rel === "stylesheet" && typeof e.href == "string" && typeof e.precedence == "string") {
          l = Ea(e.href);
          var n = Ke(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            hu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), zt.has(l) || (e = {
            rel: "preload",
            as: "style",
            href: e.href,
            crossOrigin: e.crossOrigin,
            integrity: e.integrity,
            media: e.media,
            hrefLang: e.hrefLang,
            referrerPolicy: e.referrerPolicy
          }, zt.set(l, e), n || ly(
            u,
            l,
            e,
            i.state
          ))), t && a === null)
            throw Error(s(528, ""));
          return i;
        }
        if (t && a !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = e.async, e = e.src, typeof e == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Aa(e), e = Ke(
          u
        ).hoistableScripts, a = e.get(t), a || (a = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(t, a)), a) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, l));
    }
  }
  function Ea(l) {
    return 'href="' + gt(l) + '"';
  }
  function hu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Pr(l) {
    return C({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function ly(l, t, e, a) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = l.createElement("link"), a.preload = t, t.addEventListener("load", function() {
      return a.loading |= 1;
    }), t.addEventListener("error", function() {
      return a.loading |= 2;
    }), $l(t, "link", e), Ll(t), l.head.appendChild(t));
  }
  function Aa(l) {
    return '[src="' + gt(l) + '"]';
  }
  function mu(l) {
    return "script[async]" + l;
  }
  function ld(l, t, e) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var a = l.querySelector(
            'style[data-href~="' + gt(e.href) + '"]'
          );
          if (a)
            return t.instance = a, Ll(a), a;
          var u = C({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null
          });
          return a = (l.ownerDocument || l).createElement(
            "style"
          ), Ll(a), $l(a, "style", u), Nn(a, e.precedence, l), t.instance = a;
        case "stylesheet":
          u = Ea(e.href);
          var n = l.querySelector(
            hu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ll(n), n;
          a = Pr(e), (u = zt.get(u)) && kc(a, u), n = (l.ownerDocument || l).createElement("link"), Ll(n);
          var i = n;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), $l(n, "link", a), t.state.loading |= 4, Nn(n, e.precedence, l), t.instance = n;
        case "script":
          return n = Aa(e.src), (u = l.querySelector(
            mu(n)
          )) ? (t.instance = u, Ll(u), u) : (a = e, (u = zt.get(n)) && (a = C({}, e), Fc(a, u)), l = l.ownerDocument || l, u = l.createElement("script"), Ll(u), $l(u, "link", a), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Nn(a, e.precedence, l));
    return t.instance;
  }
  function Nn(l, t, e) {
    for (var a = e.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = a.length ? a[a.length - 1] : null, n = u, i = 0; i < a.length; i++) {
      var c = a[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = e.nodeType === 9 ? e.head : e, t.insertBefore(l, t.firstChild));
  }
  function kc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Fc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Un = null;
  function td(l, t, e) {
    if (Un === null) {
      var a = /* @__PURE__ */ new Map(), u = Un = /* @__PURE__ */ new Map();
      u.set(e, a);
    } else
      u = Un, a = u.get(e), a || (a = /* @__PURE__ */ new Map(), u.set(e, a));
    if (a.has(l)) return a;
    for (a.set(l, null), e = e.getElementsByTagName(l), u = 0; u < e.length; u++) {
      var n = e[u];
      if (!(n[Ua] || n[Vl] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = a.get(i);
        c ? c.push(n) : a.set(i, [n]);
      }
    }
    return a;
  }
  function ed(l, t, e) {
    l = l.ownerDocument || l, l.head.insertBefore(
      e,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function ty(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
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
            return l = t.disabled, typeof t.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function ad(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function ey(l, t, e, a) {
    if (e.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (e.state.loading & 4) === 0) {
      if (e.instance === null) {
        var u = Ea(a.href), n = t.querySelector(
          hu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Cn.bind(l), t.then(l, l)), e.state.loading |= 4, e.instance = n, Ll(n);
          return;
        }
        n = t.ownerDocument || t, a = Pr(a), (u = zt.get(u)) && kc(a, u), n = n.createElement("link"), Ll(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), $l(n, "link", a), e.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(e, t), (t = e.state.preload) && (e.state.loading & 3) === 0 && (l.count++, e = Cn.bind(l), t.addEventListener("load", e), t.addEventListener("error", e));
    }
  }
  var Ic = 0;
  function ay(l, t) {
    return l.stylesheets && l.count === 0 && xn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(e) {
      var a = setTimeout(function() {
        if (l.stylesheets && xn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Ic === 0 && (Ic = 62500 * Bm());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && xn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Ic ? 50 : 800) + t
      );
      return l.unsuspend = e, function() {
        l.unsuspend = null, clearTimeout(a), clearTimeout(u);
      };
    } : null;
  }
  function Cn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) xn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var jn = null;
  function xn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, jn = /* @__PURE__ */ new Map(), t.forEach(uy, l), jn = null, Cn.call(l));
  }
  function uy(l, t) {
    if (!(t.state.loading & 4)) {
      var e = jn.get(l);
      if (e) var a = e.get(null);
      else {
        e = /* @__PURE__ */ new Map(), jn.set(l, e);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (e.set(i.dataset.precedence, i), a = i);
        }
        a && e.set(null, a);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = e.get(i) || a, n === a && e.set(null, u), e.set(i, u), this.count++, a = Cn.bind(this), u.addEventListener("load", a), u.addEventListener("error", a), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var yu = {
    $$typeof: ol,
    Provider: null,
    Consumer: null,
    _currentValue: V,
    _currentValue2: V,
    _threadCount: 0
  };
  function ny(l, t, e, a, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = a, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function ud(l, t, e, a, u, n, i, c, f, y, b, A) {
    return l = new ny(
      l,
      t,
      e,
      i,
      f,
      y,
      b,
      A,
      c
    ), t = 1, n === !0 && (t |= 24), n = ot(3, null, null, t), l.current = n, n.stateNode = l, t = Ci(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: a,
      isDehydrated: e,
      cache: t
    }, Hi(n), l;
  }
  function nd(l) {
    return l ? (l = ta, l) : ta;
  }
  function id(l, t, e, a, u, n) {
    u = nd(u), a.context === null ? a.context = u : a.pendingContext = u, a = ie(t), a.payload = { element: e }, n = n === void 0 ? null : n, n !== null && (a.callback = n), e = ce(l, a, t), e !== null && (nt(e, l, t), wa(e, l, t));
  }
  function cd(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Pc(l, t) {
    cd(l, t), (l = l.alternate) && cd(l, t);
  }
  function fd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ne(l, 67108864);
      t !== null && nt(t, l, 67108864), Pc(l, 67108864);
    }
  }
  function sd(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = yt();
      t = $n(t);
      var e = Ne(l, t);
      e !== null && nt(e, l, t), Pc(l, t);
    }
  }
  var Rn = !0;
  function iy(l, t, e, a) {
    var u = T.T;
    T.T = null;
    var n = x.p;
    try {
      x.p = 2, lf(l, t, e, a);
    } finally {
      x.p = n, T.T = u;
    }
  }
  function cy(l, t, e, a) {
    var u = T.T;
    T.T = null;
    var n = x.p;
    try {
      x.p = 8, lf(l, t, e, a);
    } finally {
      x.p = n, T.T = u;
    }
  }
  function lf(l, t, e, a) {
    if (Rn) {
      var u = tf(a);
      if (u === null)
        Xc(
          l,
          t,
          a,
          Hn,
          e
        ), rd(l, a);
      else if (sy(
        u,
        l,
        t,
        e,
        a
      ))
        a.stopPropagation();
      else if (rd(l, a), t & 4 && -1 < fy.indexOf(l)) {
        for (; u !== null; ) {
          var n = Ve(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Ae(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - ft(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    xt(n), (rl & 6) === 0 && (gn = it() + 500, su(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Ne(n, 2), c !== null && nt(c, n, 2), Sn(), Pc(n, 2);
            }
          if (n = tf(a), n === null && Xc(
            l,
            t,
            a,
            Hn,
            e
          ), n === u) break;
          u = n;
        }
        u !== null && a.stopPropagation();
      } else
        Xc(
          l,
          t,
          a,
          null,
          e
        );
    }
  }
  function tf(l) {
    return l = ai(l), ef(l);
  }
  var Hn = null;
  function ef(l) {
    if (Hn = null, l = Ze(l), l !== null) {
      var t = U(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (l = D(t), l !== null) return l;
          l = null;
        } else if (e === 31) {
          if (l = q(t), l !== null) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return Hn = l, null;
  }
  function od(l) {
    switch (l) {
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
        switch (wd()) {
          case gf:
            return 2;
          case pf:
            return 8;
          case Eu:
          case $d:
            return 32;
          case Sf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var af = !1, pe = null, Se = null, be = null, vu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map(), Te = [], fy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function rd(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        pe = null;
        break;
      case "dragenter":
      case "dragleave":
        Se = null;
        break;
      case "mouseover":
      case "mouseout":
        be = null;
        break;
      case "pointerover":
      case "pointerout":
        vu.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gu.delete(t.pointerId);
    }
  }
  function pu(l, t, e, a, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: e,
      eventSystemFlags: a,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = Ve(t), t !== null && fd(t)), l) : (l.eventSystemFlags |= a, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function sy(l, t, e, a, u) {
    switch (t) {
      case "focusin":
        return pe = pu(
          pe,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "dragenter":
        return Se = pu(
          Se,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "mouseover":
        return be = pu(
          be,
          l,
          t,
          e,
          a,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return vu.set(
          n,
          pu(
            vu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, gu.set(
          n,
          pu(
            gu.get(n) || null,
            l,
            t,
            e,
            a,
            u
          )
        ), !0;
    }
    return !1;
  }
  function dd(l) {
    var t = Ze(l.target);
    if (t !== null) {
      var e = U(t);
      if (e !== null) {
        if (t = e.tag, t === 13) {
          if (t = D(e), t !== null) {
            l.blockedOn = t, zf(l.priority, function() {
              sd(e);
            });
            return;
          }
        } else if (t === 31) {
          if (t = q(e), t !== null) {
            l.blockedOn = t, zf(l.priority, function() {
              sd(e);
            });
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function qn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = tf(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(
          e.type,
          e
        );
        ei = a, e.target.dispatchEvent(a), ei = null;
      } else
        return t = Ve(e), t !== null && fd(t), l.blockedOn = e, !1;
      t.shift();
    }
    return !0;
  }
  function hd(l, t, e) {
    qn(l) && e.delete(t);
  }
  function oy() {
    af = !1, pe !== null && qn(pe) && (pe = null), Se !== null && qn(Se) && (Se = null), be !== null && qn(be) && (be = null), vu.forEach(hd), gu.forEach(hd);
  }
  function Bn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, af || (af = !0, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      oy
    )));
  }
  var Yn = null;
  function md(l) {
    Yn !== l && (Yn = l, o.unstable_scheduleCallback(
      o.unstable_NormalPriority,
      function() {
        Yn === l && (Yn = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t], a = l[t + 1], u = l[t + 2];
          if (typeof a != "function") {
            if (ef(a || e) === null)
              continue;
            break;
          }
          var n = Ve(e);
          n !== null && (l.splice(t, 3), t -= 3, tc(
            n,
            {
              pending: !0,
              data: u,
              method: e.method,
              action: a
            },
            a,
            u
          ));
        }
      }
    ));
  }
  function za(l) {
    function t(f) {
      return Bn(f, l);
    }
    pe !== null && Bn(pe, l), Se !== null && Bn(Se, l), be !== null && Bn(be, l), vu.forEach(t), gu.forEach(t);
    for (var e = 0; e < Te.length; e++) {
      var a = Te[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < Te.length && (e = Te[0], e.blockedOn === null); )
      dd(e), e.blockedOn === null && Te.shift();
    if (e = (l.ownerDocument || l).$$reactFormReplay, e != null)
      for (a = 0; a < e.length; a += 3) {
        var u = e[a], n = e[a + 1], i = u[Pl] || null;
        if (typeof n == "function")
          i || md(e);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[Pl] || null)
              c = i.formAction;
            else if (ef(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? e[a + 1] = c : (e.splice(a, 3), a -= 3), md(e);
        }
      }
  }
  function yd() {
    function l(n) {
      n.canIntercept && n.info === "react-transition" && n.intercept({
        handler: function() {
          return new Promise(function(i) {
            return u = i;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), a || setTimeout(e, 20);
    }
    function e() {
      if (!a && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var a = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(e, 100), function() {
        a = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function uf(l) {
    this._internalRoot = l;
  }
  Gn.prototype.render = uf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var e = t.current, a = yt();
    id(e, a, l, t, null, null);
  }, Gn.prototype.unmount = uf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      id(l.current, 2, null, l, null, null), Sn(), t[Le] = null;
    }
  };
  function Gn(l) {
    this._internalRoot = l;
  }
  Gn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = Af();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < Te.length && t !== 0 && t < Te[e].priority; e++) ;
      Te.splice(e, 0, l), e === 0 && dd(l);
    }
  };
  var vd = g.version;
  if (vd !== "19.2.7")
    throw Error(
      s(
        527,
        vd,
        "19.2.7"
      )
    );
  x.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = S(t), l = l !== null ? R(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ry = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: T,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        Ma = Xn.inject(
          ry
        ), ct = Xn;
      } catch {
      }
  }
  return bu.createRoot = function(l, t) {
    if (!M(l)) throw Error(s(299));
    var e = !1, a = "", u = Eo, n = Ao, i = zo;
    return t != null && (t.unstable_strictMode === !0 && (e = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = ud(
      l,
      1,
      !1,
      null,
      null,
      e,
      a,
      null,
      u,
      n,
      i,
      yd
    ), l[Le] = t.current, Gc(l), new uf(t);
  }, bu.hydrateRoot = function(l, t, e) {
    if (!M(l)) throw Error(s(299));
    var a = !1, u = "", n = Eo, i = Ao, c = zo, f = null;
    return e != null && (e.unstable_strictMode === !0 && (a = !0), e.identifierPrefix !== void 0 && (u = e.identifierPrefix), e.onUncaughtError !== void 0 && (n = e.onUncaughtError), e.onCaughtError !== void 0 && (i = e.onCaughtError), e.onRecoverableError !== void 0 && (c = e.onRecoverableError), e.formState !== void 0 && (f = e.formState)), t = ud(
      l,
      1,
      !0,
      t,
      e ?? null,
      a,
      u,
      f,
      n,
      i,
      c,
      yd
    ), t.context = nd(null), e = t.current, a = yt(), a = $n(a), u = ie(a), u.callback = null, ce(e, u, a), e = a, t.current.lanes = e, Na(t, e), xt(t), l[Le] = t.current, Gc(l), new Gn(t);
  }, bu.version = "19.2.7", bu;
}
var Od;
function Ey() {
  if (Od) return ff.exports;
  Od = 1;
  function o() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o);
      } catch (g) {
        console.error(g);
      }
  }
  return o(), ff.exports = _y(), ff.exports;
}
var Ay = Ey();
const Tu = {
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
}, qd = "settings";
function zy(o, g) {
  return {
    provider: g.provider ?? o.provider,
    models: { ...o.models, ...g.models },
    apiKeys: { ...o.apiKeys, ...g.apiKeys },
    customBaseUrl: g.customBaseUrl !== void 0 ? g.customBaseUrl : o.customBaseUrl
  };
}
function Oy(o) {
  const g = o.storage.get(qd);
  if (!g) return { ...Tu, models: { ...Tu.models }, apiKeys: {} };
  try {
    const _ = JSON.parse(g);
    return zy(Tu, _);
  } catch {
    return { ...Tu, models: { ...Tu.models }, apiKeys: {} };
  }
}
function My(o, g) {
  o.storage.set(qd, JSON.stringify(g));
}
function Dy(o, g) {
  switch (o.provider) {
    case "openai":
      return !!o.apiKeys.openai;
    case "openrouter":
      return !!o.apiKeys.openrouter;
    case "anthropic":
      return !!o.apiKeys.anthropic;
    case "openai-codex":
      return g;
    case "custom":
      return !!o.customBaseUrl;
    default:
      return !1;
  }
}
const Md = 50, Bd = "conversations";
function mf(o) {
  const g = o.storage.get(Bd);
  if (!g) return [];
  try {
    return JSON.parse(g);
  } catch {
    return [];
  }
}
function Yd(o, g) {
  o.storage.set(Bd, JSON.stringify(g));
}
function Dd(o) {
  return mf(o).sort((g, _) => _.updatedAt - g.updatedAt);
}
function Nd(o, g) {
  const _ = mf(o), s = _.findIndex((M) => M.id === g.id);
  s >= 0 ? _[s] = g : _.push(g), _.sort((M, U) => U.updatedAt - M.updatedAt), _.length > Md && _.splice(Md), Yd(o, _);
}
function Ny(o, g) {
  const _ = mf(o).filter((s) => s.id !== g);
  Yd(o, _);
}
function Ud(o, g) {
  const _ = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: _,
    updatedAt: _,
    provider: o,
    model: g,
    messages: []
  };
}
function Uy(o) {
  return o.slice(0, 40);
}
function Cy() {
  return /* @__PURE__ */ N.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ N.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function jy({ onClick: o }) {
  return /* @__PURE__ */ N.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: o,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ N.jsx(Cy, {})
    }
  );
}
function Cd(o, g) {
  const _ = o.split(`
`);
  for (const s of _) {
    if (!s.startsWith("data: ")) continue;
    const M = s.slice(6).trim();
    if (!M || M === "[DONE]") continue;
    let U;
    try {
      U = JSON.parse(M);
    } catch {
      continue;
    }
    const D = U.type;
    if (D === "text_delta")
      g.onText(U.text ?? "");
    else if (D === "done") {
      const q = {
        message: U.message,
        stop_reason: U.stop_reason,
        usage: U.usage ?? {}
      };
      g.onDone(q);
    } else if (D === "error")
      return g.onError(U.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function Gd(o, g, _, s) {
  let M;
  try {
    M = await o.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(g),
      signal: s
    });
  } catch (z) {
    _.onError(`Network error: ${String(z)}`);
    return;
  }
  if (!M.ok) {
    let z = "";
    try {
      z = await M.text(), z.length > 200 && (z = z.slice(0, 200) + "...");
    } catch {
    }
    _.onError(`HTTP ${M.status}: ${z}`);
    return;
  }
  const U = M.body.getReader(), D = new TextDecoder();
  let q = "";
  try {
    for (; ; ) {
      const { done: z, value: S } = await U.read();
      if (z) break;
      q += D.decode(S, { stream: !0 }).replace(/\r\n/g, `
`);
      const R = q.split(`

`);
      q = R.pop() ?? "";
      for (const C of R) {
        if (!C.trim()) continue;
        if (Cd(C, _)) {
          U.cancel().catch(() => {
          });
          return;
        }
      }
    }
    q.trim() && Cd(q, _);
  } catch (z) {
    (z == null ? void 0 : z.name) !== "AbortError" && _.onError(`Stream read error: ${String(z)}`);
  } finally {
    U.releaseLock();
  }
}
async function xy(o, g, _, s) {
  const M = await o.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: g, api_key: _, base_url: s })
  });
  if (!M.ok) {
    let D = "";
    try {
      D = await M.text(), D.length > 200 && (D = D.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${M.status}: ${D}`);
  }
  return (await M.json()).models.map((D) => D.id);
}
async function Ry(o) {
  return (await (await o.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function df(o) {
  return await (await o.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function Hy(o) {
  await o.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const jd = 3e4;
function qy(o) {
  const g = o.default === null || o.default === void 0 ? String(o.default) : typeof o.default == "object" ? JSON.stringify(o.default) : String(o.default), _ = g.length > 60 ? g.slice(0, 60) + "..." : g;
  let s = "";
  if (o.param_type === "select" && o.options.length > 0)
    s = `{${o.options.join("|")}}`;
  else if (o.param_type === "int" || o.param_type === "float") {
    const M = o.min_value !== null, U = o.max_value !== null;
    if (M || U) {
      const D = M ? String(o.min_value) : "", q = U ? String(o.max_value) : "";
      s = `{${D}..${q}}`;
    }
  }
  return `${o.name}:${o.param_type}=${_}${s}`;
}
function By(o) {
  return o.map((g) => {
    const _ = [];
    if (g.inputs.length > 0) {
      const M = g.inputs.map((U) => `${U.name}:${U.data_type}`).join(", ");
      _.push(`in[${M}]`);
    }
    if (g.outputs.length > 0) {
      const M = g.outputs.map((U) => `${U.name}:${U.data_type}`).join(", ");
      _.push(`out[${M}]`);
    }
    if (g.params.length > 0) {
      const M = g.params.map(qy).join(", ");
      _.push(`params[${M}]`);
    }
    const s = _.length > 0 ? " " + _.join(" ") : "";
    return `${g.node_name}:${s} [category: ${g.category}]`;
  }).join(`
`);
}
function Xd(o) {
  return o.map((g) => {
    const _ = (g.description || "").replace(/\s+/g, " ").trim(), s = _.length > 100 ? _.slice(0, 100) + "..." : _;
    return `${g.node_name} [${g.category}]${s ? " - " + s : ""}`;
  }).join(`
`);
}
function Qd(o) {
  const g = JSON.stringify({ nodes: o.nodes, edges: o.edges });
  if (g.length <= jd)
    return g;
  const _ = jd, s = g.length;
  return g.slice(0, _) + `
[graph truncated - kept ${_} of ${s} chars]`;
}
function Yy(o, g) {
  const _ = Xd(o), s = Qd(g);
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
${_}

## Current graph
${s}`;
}
const xd = 16, Gy = 2, Xy = [
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
function Qy(o) {
  const g = { role: o.role, content: o.content };
  return o.tool_calls && (g.tool_calls = o.tool_calls), o.tool_call_id && (g.tool_call_id = o.tool_call_id), g;
}
function Ly(o, g) {
  const _ = /* @__PURE__ */ new Map();
  o.forEach((M, U) => {
    const D = M.op, q = g[U], z = q ? q.ok : !1;
    _.has(D) || _.set(D, { ok: 0, fail: 0 });
    const S = _.get(D);
    z ? S.ok++ : S.fail++;
  });
  const s = [];
  for (const [M, U] of _) {
    const D = U.ok + U.fail;
    U.fail === 0 ? s.push(`${M} x${D} ok`) : U.ok === 0 ? s.push(`${M} x${D} FAILED`) : s.push(`${M} x${D} (${U.ok} ok, ${U.fail} FAILED)`);
  }
  return s.join(", ");
}
function Zy(o, g, _) {
  const M = { role: "system", content: Yy(
    o.graph.getNodeDefinitions(),
    o.graph.getGraph()
  ) }, U = g.slice(-20).map(Qy), D = { role: "user", content: _ };
  return [M, ...U, D];
}
function Ld(o, g, _ = Xy, s = 8192) {
  const M = o.provider, U = o.models[M] ?? "", D = {
    provider: M,
    model: U,
    messages: g,
    tools: _,
    max_tokens: s
  };
  if (M !== "openai-codex") {
    const q = M === "openai" ? o.apiKeys.openai : M === "openrouter" ? o.apiKeys.openrouter : M === "anthropic" ? o.apiKeys.anthropic : M === "custom" ? o.apiKeys.custom : void 0;
    q && (D.api_key = q);
  }
  return M === "custom" && o.customBaseUrl && (D.base_url = o.customBaseUrl), D;
}
async function Zd(o) {
  const g = o.graph.getGraph();
  try {
    const _ = await o.http.fetch("/api/graph/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes: g.nodes, edges: g.edges })
    });
    if (!_.ok)
      return { valid: !1, errors: [`validate request failed: HTTP ${_.status}`] };
    const s = await _.json();
    return { valid: !!s.valid, errors: Array.isArray(s.errors) ? s.errors : [] };
  } catch (_) {
    return { valid: !1, errors: [`validate request error: ${String(_)}`] };
  }
}
async function Vy(o, g, _, s, M) {
  const D = [
    { role: "system", content: `You are a focused research sub-agent for CodefyUI Graph Copilot. Given a sub-task, answer CONCISELY which node types (exact names from the index) are needed and how to wire them (which output connects to which input). List node names + a one-line wiring plan. No preamble, no code.

## Node index
` + s },
    { role: "user", content: _ }
  ];
  let q = "";
  try {
    await Gd(
      o,
      Ld(g, D, [], 1024),
      {
        onText: (z) => {
          q += z;
        },
        onDone: (z) => {
          !q && z.message.content && (q = z.message.content);
        },
        onError: (z) => {
          q += `
(research error: ${z})`;
        }
      },
      M
    );
  } catch (z) {
    return `(research failed: ${String(z)})`;
  }
  return q.trim() || "(no answer)";
}
async function Ky(o, g, _, s, M, U) {
  const { name: D, arguments: q } = o;
  if (D === "apply_graph_operations") {
    const z = q.operations;
    if (!Array.isArray(z))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let S;
    try {
      S = g.graph.applyOperations(z);
    } catch (C) {
      return JSON.stringify({ error: `applyOperations threw: ${String(C)}` });
    }
    const R = Ly(z, S.results);
    return M.push(R), s.onOpsApplied(R, S), JSON.stringify({
      results: S.results,
      refs: S.refs,
      node_count: S.node_count,
      edge_count: S.edge_count
    });
  }
  if (D === "get_node_schemas") {
    const S = (Array.isArray(q.node_types) ? q.node_types : []).map((L) => String(L)), R = g.graph.getNodeDefinitions(), C = new Map(R.map((L) => [L.node_name, L])), Q = S.map((L) => C.get(L)).filter((L) => !!L), nl = S.filter((L) => !C.has(L));
    let dl = Q.length > 0 ? By(Q) : "(no matching node types)";
    return nl.length > 0 && (dl += `
(unknown node types, not in catalog: ${nl.join(", ")})`), dl;
  }
  if (D === "validate_graph")
    return JSON.stringify(await Zd(g));
  if (D === "research") {
    const S = (Array.isArray(q.questions) ? q.questions : []).map((Q) => String(Q)).filter((Q) => Q.trim()).slice(0, 4);
    if (S.length === 0)
      return JSON.stringify({ error: 'research requires a non-empty "questions" array' });
    const R = Xd(g.graph.getNodeDefinitions()), C = await Promise.all(
      S.map((Q) => Vy(g, _, Q, R, U))
    );
    return S.map((Q, nl) => `[${nl + 1}] Q: ${Q}
A: ${C[nl]}`).join(`

`);
  }
  return D === "get_current_graph" ? Qd(g.graph.getGraph()) : JSON.stringify({ error: `Unknown tool: ${D}` });
}
async function Jy(o) {
  const { api: g, settings: _, history: s, userText: M, callbacks: U, signal: D } = o, q = [], z = Zy(g, s, M);
  let S = 0, R = 0;
  try {
    for (; ; ) {
      let C = "", Q = null, nl = null;
      if (await Gd(
        g,
        Ld(_, z),
        {
          onText(ul) {
            C += ul, U.onTextDelta(ul);
          },
          onDone(ul) {
            Q = ul;
          },
          onError(ul) {
            nl = ul;
          }
        },
        D
      ), nl !== null) {
        U.onTurnsCommitted(q), U.onError(nl), U.onFinished();
        return;
      }
      if (!Q) {
        U.onTurnsCommitted(q), U.onFinished();
        return;
      }
      const dl = Q, L = dl.message.tool_calls ?? [], il = dl.message.content || C;
      if (dl.stop_reason === "end" || L.length === 0) {
        const ul = g.graph.getGraph();
        if (R < Gy && Array.isArray(ul.nodes) && ul.nodes.length > 0) {
          const zl = await Zd(g);
          if (!zl.valid && zl.errors.length > 0) {
            R++, z.push({ role: "assistant", content: il }), z.push({
              role: "user",
              content: `The graph is not runnable yet — validate_graph reported these errors. Fix them with graph operations, then validate again before finishing:
` + zl.errors.map((Xl) => `- ${Xl}`).join(`
`)
            });
            continue;
          }
        }
        const K = { role: "assistant", content: il };
        q.push(K), U.onTurnsCommitted(q), U.onFinished();
        return;
      }
      S++;
      const P = [], Bl = [], ol = [];
      for (const ul of L) {
        const K = await Ky(ul, g, _, U, P, D), zl = {
          role: "tool",
          content: K,
          tool_call_id: ul.id
        };
        Bl.push(zl), ol.push({
          role: "tool",
          content: K,
          tool_call_id: ul.id
        });
      }
      const jl = {
        role: "assistant",
        content: il,
        tool_calls: L
      };
      P.length > 0 && (jl.opsSummary = P.join("; ")), q.push(jl), q.push(...Bl);
      const Gl = {
        role: "assistant",
        content: il,
        tool_calls: L
      };
      if (z.push(Gl), z.push(...ol), S >= xd) {
        const ul = {
          role: "assistant",
          content: `(stopped after ${xd} tool rounds)`
        };
        q.push(ul), U.onTurnsCommitted(q), U.onFinished();
        return;
      }
    }
  } catch (C) {
    U.onTurnsCommitted(q), U.onError(String(C)), U.onFinished();
  }
}
function wy(o) {
  const g = o.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), _ = [];
  return g.forEach((s, M) => {
    if (s.startsWith("```")) {
      const U = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      _.push(/* @__PURE__ */ N.jsx("pre", { children: /* @__PURE__ */ N.jsx("code", { children: U }) }, M));
    } else s && _.push(/* @__PURE__ */ N.jsx("span", { children: s }, M));
  }), _;
}
function Rd({
  turn: o,
  streaming: g = !1,
  streamingText: _,
  error: s = null,
  onRetry: M,
  retryDisabled: U = !1
}) {
  if (o.role === "tool") return null;
  const D = o.role === "user", q = g && _ !== void 0 ? _ : o.content;
  return /* @__PURE__ */ N.jsxs("div", { className: `gcp-msg-row ${D ? "user" : "assistant"}`, children: [
    /* @__PURE__ */ N.jsxs("div", { className: `gcp-bubble${s ? " error" : ""}`, children: [
      wy(q),
      g && /* @__PURE__ */ N.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    !D && o.opsSummary && /* @__PURE__ */ N.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ N.jsxs("span", { children: [
      "Applied: ",
      o.opsSummary
    ] }) }),
    s && /* @__PURE__ */ N.jsx("button", { className: "gcp-retry-btn", onClick: M, disabled: U, "aria-label": "Retry", children: "Retry" })
  ] });
}
function $y() {
  return /* @__PURE__ */ N.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ N.jsx(
      "path",
      {
        d: "M22 2L11 13",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ N.jsx(
      "path",
      {
        d: "M22 2L15 22L11 13L2 9L22 2Z",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  ] });
}
function Wy() {
  return /* @__PURE__ */ N.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ N.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function ky({
  api: o,
  settings: g,
  codexLoggedIn: _,
  conversation: s,
  onConversationChange: M,
  onOpenSettings: U
}) {
  const [D, q] = el.useState(""), [z, S] = el.useState(!1), [R, C] = el.useState(""), [Q, nl] = el.useState(null), [dl, L] = el.useState(""), il = el.useRef(null), P = el.useRef(null), Bl = el.useRef(null), ol = Dy(g, _);
  el.useEffect(() => () => {
    var j;
    (j = Bl.current) == null || j.abort();
  }, []), el.useEffect(() => {
    var j;
    (j = il.current) == null || j.scrollIntoView({ behavior: "smooth" });
  }, [s.messages, R]);
  const jl = el.useCallback(() => {
    const j = P.current;
    if (!j) return;
    j.style.height = "auto";
    const _l = 110;
    j.style.height = Math.min(j.scrollHeight, _l) + "px";
  }, []);
  el.useEffect(() => {
    jl();
  }, [D, jl]);
  const Gl = el.useCallback(
    async (j) => {
      if (!j.trim() || z || !ol) return;
      nl(null), L(j), q(""), S(!0), C("");
      const _l = { role: "user", content: j.trim() };
      let cl = { ...s };
      cl.title || (cl.title = Uy(j.trim())), cl.provider = g.provider, cl.model = g.models[g.provider] ?? "", cl.messages = [...cl.messages, _l], cl.updatedAt = Date.now(), M(cl), Nd(o, cl);
      const Nt = new AbortController();
      Bl.current = Nt;
      let Il = "";
      await Jy({
        api: o,
        settings: g,
        history: cl.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: j.trim(),
        callbacks: {
          onTextDelta(Ql) {
            Il += Ql, C(Il);
          },
          onOpsApplied(Ql, T) {
          },
          onTurnsCommitted(Ql) {
            C(""), Il = "", cl = {
              ...cl,
              messages: [...cl.messages, ...Ql],
              updatedAt: Date.now()
            }, M(cl), Nd(o, cl);
          },
          onError(Ql) {
            nl(Ql), C(""), Il = "";
          },
          onFinished() {
            S(!1), Bl.current = null;
          }
        },
        signal: Nt.signal
      });
    },
    [o, z, s, M, ol, g]
  ), ul = (j) => {
    j.key === "Enter" && !j.shiftKey && (j.preventDefault(), Gl(D));
  }, K = () => {
    var j;
    (j = Bl.current) == null || j.abort();
  }, zl = () => {
    Gl(dl);
  }, Xl = s.messages.filter((j) => j.role !== "tool");
  return /* @__PURE__ */ N.jsxs("div", { className: "gcp-chat", children: [
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-messages", role: "log", "aria-live": "polite", "aria-label": "Conversation", children: [
      Xl.map((j, _l) => {
        const cl = !z && _l === Xl.length - 1 && j.role === "assistant";
        return /* @__PURE__ */ N.jsx(
          Rd,
          {
            turn: j,
            error: cl && Q ? Q : null,
            onRetry: zl,
            retryDisabled: z
          },
          _l
        );
      }),
      z && /* @__PURE__ */ N.jsx(
        Rd,
        {
          turn: { role: "assistant", content: "" },
          streaming: !0,
          streamingText: R
        }
      ),
      /* @__PURE__ */ N.jsx("div", { ref: il })
    ] }),
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-input-area", children: [
      /* @__PURE__ */ N.jsx(
        "textarea",
        {
          ref: P,
          className: "gcp-textarea",
          rows: 1,
          placeholder: "Message Graph Copilot...",
          value: D,
          onChange: (j) => q(j.target.value),
          onKeyDown: ul,
          disabled: z || !ol,
          "aria-label": "Message input",
          "aria-disabled": ol ? void 0 : "true"
        }
      ),
      z ? /* @__PURE__ */ N.jsx(
        "button",
        {
          className: "gcp-stop-btn",
          onClick: K,
          "aria-label": "Stop generation",
          title: "Stop",
          children: /* @__PURE__ */ N.jsx(Wy, {})
        }
      ) : /* @__PURE__ */ N.jsx(
        "button",
        {
          className: "gcp-send-btn",
          onClick: () => Gl(D),
          disabled: !D.trim() || !ol,
          "aria-label": "Send message",
          title: "Send",
          children: /* @__PURE__ */ N.jsx($y, {})
        }
      ),
      !ol && !z && /* @__PURE__ */ N.jsxs("div", { className: "gcp-not-ready-overlay", children: [
        /* @__PURE__ */ N.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
        /* @__PURE__ */ N.jsx(
          "button",
          {
            className: "gcp-cta-btn",
            onClick: U,
            "aria-label": "Open settings to configure a provider",
            children: "Settings"
          }
        )
      ] })
    ] })
  ] });
}
function Fy(o) {
  const g = Date.now() - o, _ = Math.floor(g / 1e3);
  if (_ < 60) return "just now";
  const s = Math.floor(_ / 60);
  if (s < 60) return `${s}m ago`;
  const M = Math.floor(s / 60);
  if (M < 24) return `${M}h ago`;
  const U = Math.floor(M / 24);
  return U < 7 ? `${U}d ago` : `${Math.floor(U / 7)}w ago`;
}
function Iy({ api: o, activeId: g, onResume: _, onNew: s }) {
  const [M, U] = el.useState(
    () => Dd(o)
  ), [D, q] = el.useState(null), z = (R, C) => {
    R.stopPropagation(), D === C ? (Ny(o, C), U(Dd(o)), D === C && q(null)) : q(C);
  }, S = () => {
    q(null);
  };
  return /* @__PURE__ */ N.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ N.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ N.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: s,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    M.length === 0 ? /* @__PURE__ */ N.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ N.jsx("div", { className: "gcp-history-list", onClick: S, children: M.map((R) => /* @__PURE__ */ N.jsxs(
      "div",
      {
        className: `gcp-history-item${R.id === g ? " active" : ""}`,
        onClick: () => _(R),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${R.title || "(untitled)"}`,
        onKeyDown: (C) => {
          (C.key === "Enter" || C.key === " ") && (C.preventDefault(), _(R));
        },
        children: [
          /* @__PURE__ */ N.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ N.jsx("div", { className: "gcp-history-title", children: R.title || "(untitled)" }),
            /* @__PURE__ */ N.jsxs("div", { className: "gcp-history-meta", children: [
              Fy(R.updatedAt),
              " · ",
              R.provider,
              "/",
              R.model || "—"
            ] })
          ] }),
          /* @__PURE__ */ N.jsx(
            "button",
            {
              className: `gcp-history-delete${D === R.id ? " confirm" : ""}`,
              onClick: (C) => z(C, R.id),
              "aria-label": D === R.id ? `Confirm delete "${R.title || "untitled"}"` : `Delete "${R.title || "untitled"}"`,
              title: D === R.id ? "Click again to confirm" : "Delete",
              children: "✕"
            }
          )
        ]
      },
      R.id
    )) })
  ] });
}
const Hd = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, Py = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], l0 = 2e3, t0 = 300 * 1e3;
function e0({
  value: o,
  onBlur: g,
  placeholder: _,
  "aria-label": s
}) {
  const [M, U] = el.useState(!1), [D, q] = el.useState(o);
  return el.useEffect(() => {
    q(o);
  }, [o]), /* @__PURE__ */ N.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ N.jsx(
      "input",
      {
        type: M ? "text" : "password",
        className: "gcp-input",
        value: D,
        onChange: (z) => q(z.target.value),
        onBlur: () => g(D),
        placeholder: _ ?? "API key",
        "aria-label": s,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ N.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => U((z) => !z),
        "aria-label": M ? "Hide key" : "Show key",
        title: M ? "Hide" : "Show",
        children: M ? "Hide" : "Show"
      }
    )
  ] });
}
function a0({
  api: o,
  settings: g,
  codexLoggedIn: _,
  codexEmail: s,
  onCodexStatusChange: M,
  onChange: U
}) {
  const D = g.provider, [q, z] = el.useState([]), [S, R] = el.useState(!1), [C, Q] = el.useState(null), [nl, dl] = el.useState(null), [L, il] = el.useState(!1), P = el.useRef(null), Bl = el.useRef(0);
  el.useEffect(() => () => {
    P.current !== null && (clearInterval(P.current), P.current = null);
  }, []), el.useEffect(() => {
    D === "openai-codex" && df(o).then((j) => {
      j.status === "logged_in" && M(!0, j.email ?? null);
    }).catch(() => {
    });
  }, []);
  function ol(j) {
    U({ ...g, ...j });
  }
  function jl(j) {
    ol({ models: { ...g.models, [D]: j } });
  }
  function Gl(j, _l) {
    ol({ apiKeys: { ...g.apiKeys, [j]: _l } });
  }
  async function ul() {
    R(!0), Q(null);
    try {
      const j = D === "openai" ? g.apiKeys.openai : D === "openrouter" ? g.apiKeys.openrouter : D === "anthropic" ? g.apiKeys.anthropic : D === "custom" ? g.apiKeys.custom : void 0, _l = await xy(
        o,
        D,
        j,
        D === "custom" ? g.customBaseUrl : void 0
      );
      z(_l);
    } catch (j) {
      Q(String(j));
    } finally {
      R(!1);
    }
  }
  async function K() {
    try {
      const j = await Ry(o);
      window.open(j, "_blank"), il(!0), Bl.current = Date.now(), P.current = setInterval(async () => {
        try {
          const _l = await df(o);
          _l.status === "logged_in" && (M(!0, _l.email ?? null), il(!1), P.current !== null && (clearInterval(P.current), P.current = null));
        } catch {
        }
        Date.now() - Bl.current > t0 && (il(!1), P.current !== null && (clearInterval(P.current), P.current = null));
      }, l0);
    } catch (j) {
      dl(String(j));
    }
  }
  async function zl() {
    try {
      await Hy(o), M(!1, null), il(!1), P.current !== null && (clearInterval(P.current), P.current = null);
    } catch (j) {
      dl(String(j));
    }
  }
  const Xl = "gcp-model-datalist";
  return /* @__PURE__ */ N.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ N.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ N.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: D,
          onChange: (j) => ol({ provider: j.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(Hd).map((j) => /* @__PURE__ */ N.jsx("option", { value: j, children: Hd[j] }, j))
        }
      )
    ] }),
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ N.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ N.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ N.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: Xl,
            value: g.models[D] ?? "",
            onChange: (j) => jl(j.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ N.jsx("datalist", { id: Xl, children: q.map((j) => /* @__PURE__ */ N.jsx("option", { value: j }, j)) }),
        /* @__PURE__ */ N.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: ul,
            disabled: S,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: S ? "Loading..." : "Load list"
          }
        )
      ] }),
      C && /* @__PURE__ */ N.jsx("span", { className: "gcp-field-hint error", role: "alert", children: C })
    ] }),
    D !== "openai-codex" && Py.filter((j) => j === D || D === "custom" && j === "custom").map(
      (j) => j === D ? /* @__PURE__ */ N.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ N.jsx("label", { className: "gcp-label", children: j === "openai" ? "OpenAI API Key" : j === "anthropic" ? "Anthropic API Key" : j === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ N.jsx(
          e0,
          {
            value: g.apiKeys[j] ?? "",
            onBlur: (_l) => Gl(j, _l),
            placeholder: j === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": j === "openai" ? "OpenAI API key" : j === "anthropic" ? "Anthropic API key" : j === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, j) : null
    ),
    D === "custom" && /* @__PURE__ */ N.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ N.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ N.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: g.customBaseUrl,
          onChange: (j) => ol({ customBaseUrl: j.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    D === "openai-codex" && /* @__PURE__ */ N.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ N.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ N.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ N.jsx(
          "div",
          {
            className: `gcp-codex-status${_ ? " signed-in" : L ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: _ ? `Signed in${s ? ` as ${s}` : ""}` : L ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ N.jsxs("div", { className: "gcp-codex-btns", children: [
          !_ && /* @__PURE__ */ N.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: K,
              disabled: L,
              "aria-label": "Sign in with ChatGPT Codex",
              children: L ? "Waiting..." : "Sign in"
            }
          ),
          _ && /* @__PURE__ */ N.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: zl,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        nl && /* @__PURE__ */ N.jsx("span", { className: "gcp-field-hint error", role: "alert", children: nl })
      ] })
    ] }),
    /* @__PURE__ */ N.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function u0() {
  return /* @__PURE__ */ N.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ N.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ N.jsx(
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
function n0() {
  return /* @__PURE__ */ N.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ N.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ N.jsx(
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
function i0({
  api: o,
  settings: g,
  codexLoggedIn: _,
  codexEmail: s,
  conversation: M,
  onConversationChange: U,
  onSettingsChange: D,
  onCodexStatusChange: q,
  onNewConversation: z,
  onResumeConversation: S,
  onClose: R
}) {
  const [C, Q] = el.useState("chat"), nl = (il) => {
    S(il), Q("chat");
  }, dl = () => {
    z(), Q("chat");
  }, L = (il) => {
    Q((P) => P === il ? "chat" : il);
  };
  return /* @__PURE__ */ N.jsxs("div", { className: "gcp-window", role: "dialog", "aria-label": "Graph Copilot", children: [
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-header", children: [
      /* @__PURE__ */ N.jsx("span", { className: "gcp-header-title", children: "Graph Copilot" }),
      /* @__PURE__ */ N.jsx(
        "button",
        {
          className: `gcp-icon-btn${C === "history" ? " active" : ""}`,
          onClick: () => L("history"),
          "aria-label": "Conversation history",
          title: "History",
          children: /* @__PURE__ */ N.jsx(u0, {})
        }
      ),
      /* @__PURE__ */ N.jsx(
        "button",
        {
          className: `gcp-icon-btn${C === "settings" ? " active" : ""}`,
          onClick: () => L("settings"),
          "aria-label": "Settings",
          title: "Settings",
          children: /* @__PURE__ */ N.jsx(n0, {})
        }
      ),
      /* @__PURE__ */ N.jsx(
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
    /* @__PURE__ */ N.jsxs("div", { className: "gcp-view", children: [
      C === "chat" && /* @__PURE__ */ N.jsx(
        ky,
        {
          api: o,
          settings: g,
          codexLoggedIn: _,
          conversation: M,
          onConversationChange: U,
          onOpenSettings: () => Q("settings")
        }
      ),
      C === "history" && /* @__PURE__ */ N.jsx(
        Iy,
        {
          api: o,
          activeId: M.id,
          onResume: nl,
          onNew: dl
        }
      ),
      C === "settings" && /* @__PURE__ */ N.jsx(
        a0,
        {
          api: o,
          settings: g,
          codexLoggedIn: _,
          codexEmail: s,
          onCodexStatusChange: q,
          onChange: D
        }
      )
    ] })
  ] });
}
function c0({ api: o }) {
  const [g, _] = el.useState(!1), [s, M] = el.useState(() => Oy(o)), [U, D] = el.useState(!1), [q, z] = el.useState(null), [S, R] = el.useState(
    () => Ud(s.provider, s.models[s.provider] ?? "")
  );
  el.useEffect(() => {
    My(o, s);
  }, [o, s]), el.useEffect(() => {
    if (s.provider !== "openai-codex") return;
    let L = !1;
    return df(o).then((il) => {
      !L && il.status === "logged_in" && (D(!0), z(il.email ?? null));
    }).catch(() => {
    }), () => {
      L = !0;
    };
  }, [o, s.provider]);
  const C = (L) => {
    M(L);
  }, Q = (L, il) => {
    D(L), z(il);
  }, nl = () => {
    R(
      Ud(
        s.provider,
        s.models[s.provider] ?? ""
      )
    );
  }, dl = (L) => {
    R(L);
  };
  return /* @__PURE__ */ N.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ N.jsx(jy, { onClick: () => _((L) => !L) }),
    g && /* @__PURE__ */ N.jsx(
      i0,
      {
        api: o,
        settings: s,
        codexLoggedIn: U,
        codexEmail: q,
        conversation: S,
        onConversationChange: R,
        onSettingsChange: C,
        onCodexStatusChange: Q,
        onNewConversation: nl,
        onResumeConversation: dl,
        onClose: () => _(!1)
      }
    )
  ] });
}
function f0(o) {
  const g = o.ui.addFloatingWidget({ id: "copilot" });
  Ay.createRoot(g).render(
    /* @__PURE__ */ N.jsx(gy.StrictMode, { children: /* @__PURE__ */ N.jsx(c0, { api: o }) })
  );
}
export {
  f0 as default
};
