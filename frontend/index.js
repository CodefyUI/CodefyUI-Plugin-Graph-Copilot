(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(`.gcp-root{--gcp-bg: #1e1e1e;--gcp-bg-deep: #16191f;--gcp-border: #2a2f3a;--gcp-text: #e5e7eb;--gcp-dim: #9ca3af;--gcp-accent: #06b6d4;--gcp-accent-ink: #0b1220;--gcp-danger: #f87171;position:relative;font-family:inherit;font-size:13px;color:var(--gcp-text);box-sizing:border-box}.gcp-root *,.gcp-root *:before,.gcp-root *:after{box-sizing:inherit}.gcp-root ::-webkit-scrollbar{width:5px;height:5px}.gcp-root ::-webkit-scrollbar-track{background:transparent}.gcp-root ::-webkit-scrollbar-thumb{background:var(--gcp-border);border-radius:3px}.gcp-root ::-webkit-scrollbar-thumb:hover{background:var(--gcp-dim)}.gcp-fab{width:48px;height:48px;border-radius:50%;background:var(--gcp-accent);color:var(--gcp-accent-ink);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px #06b6d44d;transition:filter .12s ease,transform .12s ease;outline:none}.gcp-fab:hover{filter:brightness(1.12);transform:scale(1.04)}.gcp-fab:active{transform:scale(.95)}.gcp-fab:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:3px}.gcp-window{position:fixed;bottom:16px;right:16px;width:420px;height:min(600px,calc(100vh - 96px));background:var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:12px;display:flex;flex-direction:column;box-shadow:0 8px 32px #0006;overflow:hidden}.gcp-header{display:flex;align-items:center;padding:10px 12px;border-bottom:1px solid var(--gcp-border);gap:8px;background:var(--gcp-bg-deep);flex-shrink:0}.gcp-header-title{flex:1;font-weight:600;font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-icon-btn{width:28px;height:28px;border-radius:8px;border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-icon-btn:hover{background:#ffffff12;color:var(--gcp-text)}.gcp-icon-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:1px}.gcp-icon-btn.active{color:var(--gcp-accent)}.gcp-view{flex:1;overflow:hidden;display:flex;flex-direction:column}.gcp-chat{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-messages{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px}.gcp-msg-row{display:flex;flex-direction:column}.gcp-msg-row.user{align-items:flex-end}.gcp-msg-row.assistant{align-items:flex-start}.gcp-bubble{max-width:85%;padding:8px 11px;border-radius:10px;line-height:1.5;word-break:break-word;white-space:pre-wrap;font-size:13px}.gcp-msg-row.user .gcp-bubble{background:#06b6d426;border:1px solid rgba(6,182,212,.25);color:var(--gcp-text)}.gcp-msg-row.assistant .gcp-bubble{background:#262b36;border:1px solid var(--gcp-border);color:var(--gcp-text)}.gcp-bubble.error{background:#f871711f;border:1px solid rgba(248,113,113,.3);color:var(--gcp-text)}.gcp-bubble pre{background:var(--gcp-bg-deep);border:1px solid var(--gcp-border);border-radius:6px;padding:8px 10px;overflow-x:auto;font-size:12px;font-family:Cascadia Code,JetBrains Mono,Fira Code,monospace;margin:6px 0 0;white-space:pre}.gcp-bubble code{font-family:Cascadia Code,JetBrains Mono,Fira Code,monospace;font-size:12px}.gcp-caret{display:inline-block;width:2px;height:1em;background:var(--gcp-accent);margin-left:2px;vertical-align:text-bottom;animation:gcp-blink .9s step-end infinite}@keyframes gcp-blink{0%,to{opacity:1}50%{opacity:0}}.gcp-ops-chip{margin-top:5px;display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:6px;background:#06b6d41a;border:1px solid rgba(6,182,212,.2);color:var(--gcp-accent);font-size:11px;line-height:1.4}.gcp-retry-btn{margin-top:6px;padding:4px 10px;border-radius:8px;border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);font-size:12px;cursor:pointer;transition:background .12s ease;align-self:flex-end}.gcp-retry-btn:hover{background:#f871711a}.gcp-retry-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px}.gcp-input-area{position:relative;padding:10px 12px;border-top:1px solid var(--gcp-border);display:flex;gap:8px;align-items:flex-end;flex-shrink:0;background:var(--gcp-bg-deep)}.gcp-textarea{flex:1;resize:none;background:var(--gcp-bg);border:1px solid var(--gcp-border);border-radius:8px;color:var(--gcp-text);font-family:inherit;font-size:13px;padding:7px 10px;outline:none;line-height:1.5;min-height:36px;max-height:110px;overflow-y:auto;transition:border-color .12s ease}.gcp-textarea:focus{border-color:var(--gcp-accent)}.gcp-textarea:disabled{opacity:.5;cursor:not-allowed}.gcp-send-btn{width:34px;height:34px;border-radius:8px;border:none;background:var(--gcp-accent);color:var(--gcp-accent-ink);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:filter .12s ease,transform .12s ease;outline:none}.gcp-send-btn:hover:not(:disabled){filter:brightness(1.1)}.gcp-send-btn:active:not(:disabled){transform:scale(.95)}.gcp-send-btn:disabled{opacity:.4;cursor:not-allowed}.gcp-send-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-stop-btn{width:34px;height:34px;border-radius:8px;border:1px solid var(--gcp-danger);background:transparent;color:var(--gcp-danger);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .12s ease;outline:none}.gcp-stop-btn:hover{background:#f871711a}.gcp-stop-btn:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:2px}.gcp-not-ready-overlay{position:absolute;top:0;right:0;bottom:0;left:0;background:#16191fd9;display:flex;align-items:center;justify-content:center;gap:10px;border-radius:0 0 12px 12px;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.gcp-not-ready-label{font-size:12px;color:var(--gcp-dim)}.gcp-cta-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--gcp-accent);background:transparent;color:var(--gcp-accent);font-size:12px;cursor:pointer;transition:background .12s ease;outline:none;white-space:nowrap}.gcp-cta-btn:hover{background:#06b6d41a}.gcp-cta-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history{flex:1;display:flex;flex-direction:column;overflow:hidden}.gcp-history-top{padding:10px 12px;border-bottom:1px solid var(--gcp-border);flex-shrink:0}.gcp-new-btn{width:100%;padding:7px 12px;border-radius:8px;border:1px solid var(--gcp-accent);background:#06b6d414;color:var(--gcp-accent);font-size:13px;font-family:inherit;cursor:pointer;transition:background .12s ease;outline:none}.gcp-new-btn:hover{background:#06b6d426}.gcp-new-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-history-list{flex:1;overflow-y:auto;padding:6px 0}.gcp-history-item{display:flex;align-items:center;gap:8px;padding:8px 12px;cursor:pointer;transition:background .12s ease;border-left:2px solid transparent}.gcp-history-item:hover{background:#ffffff0a}.gcp-history-item.active{border-left-color:var(--gcp-accent);background:#06b6d40f}.gcp-history-info{flex:1;min-width:0}.gcp-history-title{font-size:13px;color:var(--gcp-text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-history-meta{font-size:11px;color:var(--gcp-dim);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.gcp-history-delete{width:24px;height:24px;border-radius:6px;border:none;background:transparent;color:var(--gcp-dim);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;transition:color .12s ease,background .12s ease;outline:none;opacity:0}.gcp-history-item:hover .gcp-history-delete{opacity:1}.gcp-history-delete:hover{color:var(--gcp-danger);background:#f871711a}.gcp-history-delete.confirm{color:var(--gcp-danger);opacity:1}.gcp-history-delete:focus-visible{outline:2px solid var(--gcp-danger);outline-offset:1px;opacity:1}.gcp-history-empty{padding:32px 16px;text-align:center;color:var(--gcp-dim);font-size:13px}.gcp-settings{flex:1;overflow-y:auto;padding:14px 14px 18px;display:flex;flex-direction:column;gap:16px}.gcp-field{display:flex;flex-direction:column;gap:5px}.gcp-label{font-size:11px;font-weight:600;color:var(--gcp-dim);text-transform:uppercase;letter-spacing:.05em}.gcp-select{width:100%;padding:7px 28px 7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;cursor:pointer;transition:border-color .12s ease;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%239ca3af' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center}.gcp-select:focus{border-color:var(--gcp-accent)}.gcp-input{width:100%;padding:7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-text);font-size:13px;font-family:inherit;outline:none;transition:border-color .12s ease}.gcp-input:focus{border-color:var(--gcp-accent)}.gcp-model-row{display:flex;gap:6px}.gcp-model-row .gcp-input{flex:1}.gcp-load-btn{padding:7px 12px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-dim);font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:border-color .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-load-btn:hover:not(:disabled){border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-load-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-load-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-key-row{display:flex;gap:6px}.gcp-key-row .gcp-input{flex:1;font-family:monospace}.gcp-show-btn{padding:7px 10px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg);color:var(--gcp-dim);font-size:11px;font-family:inherit;cursor:pointer;transition:border-color .12s ease,color .12s ease;outline:none;flex-shrink:0}.gcp-show-btn:hover{border-color:var(--gcp-accent);color:var(--gcp-accent)}.gcp-show-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-section{display:flex;flex-direction:column;gap:8px;padding:10px 12px;border-radius:8px;border:1px solid var(--gcp-border);background:var(--gcp-bg-deep)}.gcp-codex-status{font-size:12px;color:var(--gcp-dim)}.gcp-codex-status.signed-in{color:var(--gcp-accent)}.gcp-codex-status.pending{color:#fbbf24}.gcp-codex-btns{display:flex;gap:8px}.gcp-codex-btn{padding:6px 14px;border-radius:8px;border:1px solid var(--gcp-accent);background:transparent;color:var(--gcp-accent);font-size:12px;font-family:inherit;cursor:pointer;transition:background .12s ease;outline:none}.gcp-codex-btn:hover{background:#06b6d41a}.gcp-codex-btn.danger{border-color:var(--gcp-danger);color:var(--gcp-danger)}.gcp-codex-btn.danger:hover{background:#f871711a}.gcp-codex-btn:focus-visible{outline:2px solid var(--gcp-accent);outline-offset:2px}.gcp-codex-btn:disabled{opacity:.5;cursor:not-allowed}.gcp-field-hint{font-size:11px;color:var(--gcp-dim);margin-top:2px}.gcp-field-hint.error{color:var(--gcp-danger)}.gcp-footnote{font-size:11px;color:var(--gcp-dim);line-height:1.5;padding-top:4px;border-top:1px solid var(--gcp-border)}`)),document.head.appendChild(e)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
function sh(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var nf = { exports: {} }, pu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vr;
function oh() {
  if (vr) return pu;
  vr = 1;
  var d = Symbol.for("react.transitional.element"), S = Symbol.for("react.fragment");
  function z(s, M, N) {
    var U = null;
    if (N !== void 0 && (U = "" + N), M.key !== void 0 && (U = "" + M.key), "key" in M) {
      N = {};
      for (var q in M)
        q !== "key" && (N[q] = M[q]);
    } else N = M;
    return M = N.ref, {
      $$typeof: d,
      type: s,
      key: U,
      ref: M !== void 0 ? M : null,
      props: N
    };
  }
  return pu.Fragment = S, pu.jsx = z, pu.jsxs = z, pu;
}
var gr;
function dh() {
  return gr || (gr = 1, nf.exports = oh()), nf.exports;
}
var D = dh(), cf = { exports: {} }, L = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sr;
function rh() {
  if (Sr) return L;
  Sr = 1;
  var d = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), N = Symbol.for("react.consumer"), U = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), T = Symbol.for("react.memo"), x = Symbol.for("react.lazy"), j = Symbol.for("react.activity"), V = Symbol.iterator;
  function pl(r) {
    return r === null || typeof r != "object" ? null : (r = V && r[V] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ml = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, W = Object.assign, yl = {};
  function tl(r, _, H) {
    this.props = r, this.context = _, this.refs = yl, this.updater = H || ml;
  }
  tl.prototype.isReactComponent = {}, tl.prototype.setState = function(r, _) {
    if (typeof r != "object" && typeof r != "function" && r != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, r, _, "setState");
  }, tl.prototype.forceUpdate = function(r) {
    this.updater.enqueueForceUpdate(this, r, "forceUpdate");
  };
  function Bl() {
  }
  Bl.prototype = tl.prototype;
  function cl(r, _, H) {
    this.props = r, this.context = _, this.refs = yl, this.updater = H || ml;
  }
  var ql = cl.prototype = new Bl();
  ql.constructor = cl, W(ql, tl.prototype), ql.isPureReactComponent = !0;
  var fl = Array.isArray;
  function Dl() {
  }
  var w = { H: null, A: null, T: null, S: null }, Gl = Object.prototype.hasOwnProperty;
  function $l(r, _, H) {
    var Y = H.ref;
    return {
      $$typeof: d,
      type: r,
      key: _,
      ref: Y !== void 0 ? Y : null,
      props: H
    };
  }
  function C(r, _) {
    return $l(r.type, _, r.props);
  }
  function El(r) {
    return typeof r == "object" && r !== null && r.$$typeof === d;
  }
  function ul(r) {
    var _ = { "=": "=0", ":": "=2" };
    return "$" + r.replace(/[=:]/g, function(H) {
      return _[H];
    });
  }
  var Nt = /\/+/g;
  function Il(r, _) {
    return typeof r == "object" && r !== null && r.key != null ? ul("" + r.key) : _.toString(36);
  }
  function Xl(r) {
    switch (r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw r.reason;
      default:
        switch (typeof r.status == "string" ? r.then(Dl, Dl) : (r.status = "pending", r.then(
          function(_) {
            r.status === "pending" && (r.status = "fulfilled", r.value = _);
          },
          function(_) {
            r.status === "pending" && (r.status = "rejected", r.reason = _);
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
    }
    throw r;
  }
  function b(r, _, H, Y, K) {
    var k = typeof r;
    (k === "undefined" || k === "boolean") && (r = null);
    var ol = !1;
    if (r === null) ol = !0;
    else
      switch (k) {
        case "bigint":
        case "string":
        case "number":
          ol = !0;
          break;
        case "object":
          switch (r.$$typeof) {
            case d:
            case S:
              ol = !0;
              break;
            case x:
              return ol = r._init, b(
                ol(r._payload),
                _,
                H,
                Y,
                K
              );
          }
      }
    if (ol)
      return K = K(r), ol = Y === "" ? "." + Il(r, 0) : Y, fl(K) ? (H = "", ol != null && (H = ol.replace(Nt, "$&/") + "/"), b(K, _, H, "", function(Oe) {
        return Oe;
      })) : K != null && (El(K) && (K = C(
        K,
        H + (K.key == null || r && r.key === K.key ? "" : ("" + K.key).replace(
          Nt,
          "$&/"
        ) + "/") + ol
      )), _.push(K)), 1;
    ol = 0;
    var kl = Y === "" ? "." : Y + ":";
    if (fl(r))
      for (var Nl = 0; Nl < r.length; Nl++)
        Y = r[Nl], k = kl + Il(Y, Nl), ol += b(
          Y,
          _,
          H,
          k,
          K
        );
    else if (Nl = pl(r), typeof Nl == "function")
      for (r = Nl.call(r), Nl = 0; !(Y = r.next()).done; )
        Y = Y.value, k = kl + Il(Y, Nl++), ol += b(
          Y,
          _,
          H,
          k,
          K
        );
    else if (k === "object") {
      if (typeof r.then == "function")
        return b(
          Xl(r),
          _,
          H,
          Y,
          K
        );
      throw _ = String(r), Error(
        "Objects are not valid as a React child (found: " + (_ === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : _) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ol;
  }
  function R(r, _, H) {
    if (r == null) return r;
    var Y = [], K = 0;
    return b(r, Y, "", "", function(k) {
      return _.call(H, k, K++);
    }), Y;
  }
  function Z(r) {
    if (r._status === -1) {
      var _ = r._result;
      _ = _(), _.then(
        function(H) {
          (r._status === 0 || r._status === -1) && (r._status = 1, r._result = H);
        },
        function(H) {
          (r._status === 0 || r._status === -1) && (r._status = 2, r._result = H);
        }
      ), r._status === -1 && (r._status = 0, r._result = _);
    }
    if (r._status === 1) return r._result.default;
    throw r._result;
  }
  var hl = typeof reportError == "function" ? reportError : function(r) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var _ = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof r == "object" && r !== null && typeof r.message == "string" ? String(r.message) : String(r),
        error: r
      });
      if (!window.dispatchEvent(_)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", r);
      return;
    }
    console.error(r);
  }, bl = {
    map: R,
    forEach: function(r, _, H) {
      R(
        r,
        function() {
          _.apply(this, arguments);
        },
        H
      );
    },
    count: function(r) {
      var _ = 0;
      return R(r, function() {
        _++;
      }), _;
    },
    toArray: function(r) {
      return R(r, function(_) {
        return _;
      }) || [];
    },
    only: function(r) {
      if (!El(r))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return r;
    }
  };
  return L.Activity = j, L.Children = bl, L.Component = tl, L.Fragment = z, L.Profiler = M, L.PureComponent = cl, L.StrictMode = s, L.Suspense = O, L.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, L.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(r) {
      return w.H.useMemoCache(r);
    }
  }, L.cache = function(r) {
    return function() {
      return r.apply(null, arguments);
    };
  }, L.cacheSignal = function() {
    return null;
  }, L.cloneElement = function(r, _, H) {
    if (r == null)
      throw Error(
        "The argument must be a React element, but you passed " + r + "."
      );
    var Y = W({}, r.props), K = r.key;
    if (_ != null)
      for (k in _.key !== void 0 && (K = "" + _.key), _)
        !Gl.call(_, k) || k === "key" || k === "__self" || k === "__source" || k === "ref" && _.ref === void 0 || (Y[k] = _[k]);
    var k = arguments.length - 2;
    if (k === 1) Y.children = H;
    else if (1 < k) {
      for (var ol = Array(k), kl = 0; kl < k; kl++)
        ol[kl] = arguments[kl + 2];
      Y.children = ol;
    }
    return $l(r.type, K, Y);
  }, L.createContext = function(r) {
    return r = {
      $$typeof: U,
      _currentValue: r,
      _currentValue2: r,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, r.Provider = r, r.Consumer = {
      $$typeof: N,
      _context: r
    }, r;
  }, L.createElement = function(r, _, H) {
    var Y, K = {}, k = null;
    if (_ != null)
      for (Y in _.key !== void 0 && (k = "" + _.key), _)
        Gl.call(_, Y) && Y !== "key" && Y !== "__self" && Y !== "__source" && (K[Y] = _[Y]);
    var ol = arguments.length - 2;
    if (ol === 1) K.children = H;
    else if (1 < ol) {
      for (var kl = Array(ol), Nl = 0; Nl < ol; Nl++)
        kl[Nl] = arguments[Nl + 2];
      K.children = kl;
    }
    if (r && r.defaultProps)
      for (Y in ol = r.defaultProps, ol)
        K[Y] === void 0 && (K[Y] = ol[Y]);
    return $l(r, k, K);
  }, L.createRef = function() {
    return { current: null };
  }, L.forwardRef = function(r) {
    return { $$typeof: q, render: r };
  }, L.isValidElement = El, L.lazy = function(r) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: r },
      _init: Z
    };
  }, L.memo = function(r, _) {
    return {
      $$typeof: T,
      type: r,
      compare: _ === void 0 ? null : _
    };
  }, L.startTransition = function(r) {
    var _ = w.T, H = {};
    w.T = H;
    try {
      var Y = r(), K = w.S;
      K !== null && K(H, Y), typeof Y == "object" && Y !== null && typeof Y.then == "function" && Y.then(Dl, hl);
    } catch (k) {
      hl(k);
    } finally {
      _ !== null && H.types !== null && (_.types = H.types), w.T = _;
    }
  }, L.unstable_useCacheRefresh = function() {
    return w.H.useCacheRefresh();
  }, L.use = function(r) {
    return w.H.use(r);
  }, L.useActionState = function(r, _, H) {
    return w.H.useActionState(r, _, H);
  }, L.useCallback = function(r, _) {
    return w.H.useCallback(r, _);
  }, L.useContext = function(r) {
    return w.H.useContext(r);
  }, L.useDebugValue = function() {
  }, L.useDeferredValue = function(r, _) {
    return w.H.useDeferredValue(r, _);
  }, L.useEffect = function(r, _) {
    return w.H.useEffect(r, _);
  }, L.useEffectEvent = function(r) {
    return w.H.useEffectEvent(r);
  }, L.useId = function() {
    return w.H.useId();
  }, L.useImperativeHandle = function(r, _, H) {
    return w.H.useImperativeHandle(r, _, H);
  }, L.useInsertionEffect = function(r, _) {
    return w.H.useInsertionEffect(r, _);
  }, L.useLayoutEffect = function(r, _) {
    return w.H.useLayoutEffect(r, _);
  }, L.useMemo = function(r, _) {
    return w.H.useMemo(r, _);
  }, L.useOptimistic = function(r, _) {
    return w.H.useOptimistic(r, _);
  }, L.useReducer = function(r, _, H) {
    return w.H.useReducer(r, _, H);
  }, L.useRef = function(r) {
    return w.H.useRef(r);
  }, L.useState = function(r) {
    return w.H.useState(r);
  }, L.useSyncExternalStore = function(r, _, H) {
    return w.H.useSyncExternalStore(
      r,
      _,
      H
    );
  }, L.useTransition = function() {
    return w.H.useTransition();
  }, L.version = "19.2.7", L;
}
var pr;
function rf() {
  return pr || (pr = 1, cf.exports = rh()), cf.exports;
}
var el = rf();
const mh = /* @__PURE__ */ sh(el);
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
var br;
function yh() {
  return br || (br = 1, (function(d) {
    function S(b, R) {
      var Z = b.length;
      b.push(R);
      l: for (; 0 < Z; ) {
        var hl = Z - 1 >>> 1, bl = b[hl];
        if (0 < M(bl, R))
          b[hl] = R, b[Z] = bl, Z = hl;
        else break l;
      }
    }
    function z(b) {
      return b.length === 0 ? null : b[0];
    }
    function s(b) {
      if (b.length === 0) return null;
      var R = b[0], Z = b.pop();
      if (Z !== R) {
        b[0] = Z;
        l: for (var hl = 0, bl = b.length, r = bl >>> 1; hl < r; ) {
          var _ = 2 * (hl + 1) - 1, H = b[_], Y = _ + 1, K = b[Y];
          if (0 > M(H, Z))
            Y < bl && 0 > M(K, H) ? (b[hl] = K, b[Y] = Z, hl = Y) : (b[hl] = H, b[_] = Z, hl = _);
          else if (Y < bl && 0 > M(K, Z))
            b[hl] = K, b[Y] = Z, hl = Y;
          else break l;
        }
      }
      return R;
    }
    function M(b, R) {
      var Z = b.sortIndex - R.sortIndex;
      return Z !== 0 ? Z : b.id - R.id;
    }
    if (d.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var N = performance;
      d.unstable_now = function() {
        return N.now();
      };
    } else {
      var U = Date, q = U.now();
      d.unstable_now = function() {
        return U.now() - q;
      };
    }
    var O = [], T = [], x = 1, j = null, V = 3, pl = !1, ml = !1, W = !1, yl = !1, tl = typeof setTimeout == "function" ? setTimeout : null, Bl = typeof clearTimeout == "function" ? clearTimeout : null, cl = typeof setImmediate < "u" ? setImmediate : null;
    function ql(b) {
      for (var R = z(T); R !== null; ) {
        if (R.callback === null) s(T);
        else if (R.startTime <= b)
          s(T), R.sortIndex = R.expirationTime, S(O, R);
        else break;
        R = z(T);
      }
    }
    function fl(b) {
      if (W = !1, ql(b), !ml)
        if (z(O) !== null)
          ml = !0, Dl || (Dl = !0, ul());
        else {
          var R = z(T);
          R !== null && Xl(fl, R.startTime - b);
        }
    }
    var Dl = !1, w = -1, Gl = 5, $l = -1;
    function C() {
      return yl ? !0 : !(d.unstable_now() - $l < Gl);
    }
    function El() {
      if (yl = !1, Dl) {
        var b = d.unstable_now();
        $l = b;
        var R = !0;
        try {
          l: {
            ml = !1, W && (W = !1, Bl(w), w = -1), pl = !0;
            var Z = V;
            try {
              t: {
                for (ql(b), j = z(O); j !== null && !(j.expirationTime > b && C()); ) {
                  var hl = j.callback;
                  if (typeof hl == "function") {
                    j.callback = null, V = j.priorityLevel;
                    var bl = hl(
                      j.expirationTime <= b
                    );
                    if (b = d.unstable_now(), typeof bl == "function") {
                      j.callback = bl, ql(b), R = !0;
                      break t;
                    }
                    j === z(O) && s(O), ql(b);
                  } else s(O);
                  j = z(O);
                }
                if (j !== null) R = !0;
                else {
                  var r = z(T);
                  r !== null && Xl(
                    fl,
                    r.startTime - b
                  ), R = !1;
                }
              }
              break l;
            } finally {
              j = null, V = Z, pl = !1;
            }
            R = void 0;
          }
        } finally {
          R ? ul() : Dl = !1;
        }
      }
    }
    var ul;
    if (typeof cl == "function")
      ul = function() {
        cl(El);
      };
    else if (typeof MessageChannel < "u") {
      var Nt = new MessageChannel(), Il = Nt.port2;
      Nt.port1.onmessage = El, ul = function() {
        Il.postMessage(null);
      };
    } else
      ul = function() {
        tl(El, 0);
      };
    function Xl(b, R) {
      w = tl(function() {
        b(d.unstable_now());
      }, R);
    }
    d.unstable_IdlePriority = 5, d.unstable_ImmediatePriority = 1, d.unstable_LowPriority = 4, d.unstable_NormalPriority = 3, d.unstable_Profiling = null, d.unstable_UserBlockingPriority = 2, d.unstable_cancelCallback = function(b) {
      b.callback = null;
    }, d.unstable_forceFrameRate = function(b) {
      0 > b || 125 < b ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Gl = 0 < b ? Math.floor(1e3 / b) : 5;
    }, d.unstable_getCurrentPriorityLevel = function() {
      return V;
    }, d.unstable_next = function(b) {
      switch (V) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = V;
      }
      var Z = V;
      V = R;
      try {
        return b();
      } finally {
        V = Z;
      }
    }, d.unstable_requestPaint = function() {
      yl = !0;
    }, d.unstable_runWithPriority = function(b, R) {
      switch (b) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          b = 3;
      }
      var Z = V;
      V = b;
      try {
        return R();
      } finally {
        V = Z;
      }
    }, d.unstable_scheduleCallback = function(b, R, Z) {
      var hl = d.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? hl + Z : hl) : Z = hl, b) {
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
      return bl = Z + bl, b = {
        id: x++,
        callback: R,
        priorityLevel: b,
        startTime: Z,
        expirationTime: bl,
        sortIndex: -1
      }, Z > hl ? (b.sortIndex = Z, S(T, b), z(O) === null && b === z(T) && (W ? (Bl(w), w = -1) : W = !0, Xl(fl, Z - hl))) : (b.sortIndex = bl, S(O, b), ml || pl || (ml = !0, Dl || (Dl = !0, ul()))), b;
    }, d.unstable_shouldYield = C, d.unstable_wrapCallback = function(b) {
      var R = V;
      return function() {
        var Z = V;
        V = R;
        try {
          return b.apply(this, arguments);
        } finally {
          V = Z;
        }
      };
    };
  })(of)), of;
}
var Tr;
function hh() {
  return Tr || (Tr = 1, sf.exports = yh()), sf.exports;
}
var df = { exports: {} }, Wl = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Er;
function vh() {
  if (Er) return Wl;
  Er = 1;
  var d = rf();
  function S(O) {
    var T = "https://react.dev/errors/" + O;
    if (1 < arguments.length) {
      T += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        T += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + O + "; visit " + T + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function z() {
  }
  var s = {
    d: {
      f: z,
      r: function() {
        throw Error(S(522));
      },
      D: z,
      C: z,
      L: z,
      m: z,
      X: z,
      S: z,
      M: z
    },
    p: 0,
    findDOMNode: null
  }, M = Symbol.for("react.portal");
  function N(O, T, x) {
    var j = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: M,
      key: j == null ? null : "" + j,
      children: O,
      containerInfo: T,
      implementation: x
    };
  }
  var U = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function q(O, T) {
    if (O === "font") return "";
    if (typeof T == "string")
      return T === "use-credentials" ? T : "";
  }
  return Wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Wl.createPortal = function(O, T) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!T || T.nodeType !== 1 && T.nodeType !== 9 && T.nodeType !== 11)
      throw Error(S(299));
    return N(O, T, null, x);
  }, Wl.flushSync = function(O) {
    var T = U.T, x = s.p;
    try {
      if (U.T = null, s.p = 2, O) return O();
    } finally {
      U.T = T, s.p = x, s.d.f();
    }
  }, Wl.preconnect = function(O, T) {
    typeof O == "string" && (T ? (T = T.crossOrigin, T = typeof T == "string" ? T === "use-credentials" ? T : "" : void 0) : T = null, s.d.C(O, T));
  }, Wl.prefetchDNS = function(O) {
    typeof O == "string" && s.d.D(O);
  }, Wl.preinit = function(O, T) {
    if (typeof O == "string" && T && typeof T.as == "string") {
      var x = T.as, j = q(x, T.crossOrigin), V = typeof T.integrity == "string" ? T.integrity : void 0, pl = typeof T.fetchPriority == "string" ? T.fetchPriority : void 0;
      x === "style" ? s.d.S(
        O,
        typeof T.precedence == "string" ? T.precedence : void 0,
        {
          crossOrigin: j,
          integrity: V,
          fetchPriority: pl
        }
      ) : x === "script" && s.d.X(O, {
        crossOrigin: j,
        integrity: V,
        fetchPriority: pl,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0
      });
    }
  }, Wl.preinitModule = function(O, T) {
    if (typeof O == "string")
      if (typeof T == "object" && T !== null) {
        if (T.as == null || T.as === "script") {
          var x = q(
            T.as,
            T.crossOrigin
          );
          s.d.M(O, {
            crossOrigin: x,
            integrity: typeof T.integrity == "string" ? T.integrity : void 0,
            nonce: typeof T.nonce == "string" ? T.nonce : void 0
          });
        }
      } else T == null && s.d.M(O);
  }, Wl.preload = function(O, T) {
    if (typeof O == "string" && typeof T == "object" && T !== null && typeof T.as == "string") {
      var x = T.as, j = q(x, T.crossOrigin);
      s.d.L(O, x, {
        crossOrigin: j,
        integrity: typeof T.integrity == "string" ? T.integrity : void 0,
        nonce: typeof T.nonce == "string" ? T.nonce : void 0,
        type: typeof T.type == "string" ? T.type : void 0,
        fetchPriority: typeof T.fetchPriority == "string" ? T.fetchPriority : void 0,
        referrerPolicy: typeof T.referrerPolicy == "string" ? T.referrerPolicy : void 0,
        imageSrcSet: typeof T.imageSrcSet == "string" ? T.imageSrcSet : void 0,
        imageSizes: typeof T.imageSizes == "string" ? T.imageSizes : void 0,
        media: typeof T.media == "string" ? T.media : void 0
      });
    }
  }, Wl.preloadModule = function(O, T) {
    if (typeof O == "string")
      if (T) {
        var x = q(T.as, T.crossOrigin);
        s.d.m(O, {
          as: typeof T.as == "string" && T.as !== "script" ? T.as : void 0,
          crossOrigin: x,
          integrity: typeof T.integrity == "string" ? T.integrity : void 0
        });
      } else s.d.m(O);
  }, Wl.requestFormReset = function(O) {
    s.d.r(O);
  }, Wl.unstable_batchedUpdates = function(O, T) {
    return O(T);
  }, Wl.useFormState = function(O, T, x) {
    return U.H.useFormState(O, T, x);
  }, Wl.useFormStatus = function() {
    return U.H.useHostTransitionStatus();
  }, Wl.version = "19.2.7", Wl;
}
var zr;
function gh() {
  if (zr) return df.exports;
  zr = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (S) {
        console.error(S);
      }
  }
  return d(), df.exports = vh(), df.exports;
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
var Ar;
function Sh() {
  if (Ar) return bu;
  Ar = 1;
  var d = hh(), S = rf(), z = gh();
  function s(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var a = 2; a < arguments.length; a++)
        t += "&args[]=" + encodeURIComponent(arguments[a]);
    }
    return "Minified React error #" + l + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function M(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function N(l) {
    var t = l, a = l;
    if (l.alternate) for (; t.return; ) t = t.return;
    else {
      l = t;
      do
        t = l, (t.flags & 4098) !== 0 && (a = t.return), l = t.return;
      while (l);
    }
    return t.tag === 3 ? a : null;
  }
  function U(l) {
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
  function O(l) {
    if (N(l) !== l)
      throw Error(s(188));
  }
  function T(l) {
    var t = l.alternate;
    if (!t) {
      if (t = N(l), t === null) throw Error(s(188));
      return t !== l ? null : l;
    }
    for (var a = l, e = t; ; ) {
      var u = a.return;
      if (u === null) break;
      var n = u.alternate;
      if (n === null) {
        if (e = u.return, e !== null) {
          a = e;
          continue;
        }
        break;
      }
      if (u.child === n.child) {
        for (n = u.child; n; ) {
          if (n === a) return O(u), l;
          if (n === e) return O(u), t;
          n = n.sibling;
        }
        throw Error(s(188));
      }
      if (a.return !== e.return) a = u, e = n;
      else {
        for (var i = !1, c = u.child; c; ) {
          if (c === a) {
            i = !0, a = u, e = n;
            break;
          }
          if (c === e) {
            i = !0, e = u, a = n;
            break;
          }
          c = c.sibling;
        }
        if (!i) {
          for (c = n.child; c; ) {
            if (c === a) {
              i = !0, a = n, e = u;
              break;
            }
            if (c === e) {
              i = !0, e = n, a = u;
              break;
            }
            c = c.sibling;
          }
          if (!i) throw Error(s(189));
        }
      }
      if (a.alternate !== e) throw Error(s(190));
    }
    if (a.tag !== 3) throw Error(s(188));
    return a.stateNode.current === a ? l : t;
  }
  function x(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (t = x(l), t !== null) return t;
      l = l.sibling;
    }
    return null;
  }
  var j = Object.assign, V = Symbol.for("react.element"), pl = Symbol.for("react.transitional.element"), ml = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), yl = Symbol.for("react.strict_mode"), tl = Symbol.for("react.profiler"), Bl = Symbol.for("react.consumer"), cl = Symbol.for("react.context"), ql = Symbol.for("react.forward_ref"), fl = Symbol.for("react.suspense"), Dl = Symbol.for("react.suspense_list"), w = Symbol.for("react.memo"), Gl = Symbol.for("react.lazy"), $l = Symbol.for("react.activity"), C = Symbol.for("react.memo_cache_sentinel"), El = Symbol.iterator;
  function ul(l) {
    return l === null || typeof l != "object" ? null : (l = El && l[El] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Nt = Symbol.for("react.client.reference");
  function Il(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Nt ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case W:
        return "Fragment";
      case tl:
        return "Profiler";
      case yl:
        return "StrictMode";
      case fl:
        return "Suspense";
      case Dl:
        return "SuspenseList";
      case $l:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case ml:
          return "Portal";
        case cl:
          return l.displayName || "Context";
        case Bl:
          return (l._context.displayName || "Context") + ".Consumer";
        case ql:
          var t = l.render;
          return l = l.displayName, l || (l = t.displayName || t.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case w:
          return t = l.displayName || null, t !== null ? t : Il(l.type) || "Memo";
        case Gl:
          t = l._payload, l = l._init;
          try {
            return Il(l(t));
          } catch {
          }
      }
    return null;
  }
  var Xl = Array.isArray, b = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = z.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, hl = [], bl = -1;
  function r(l) {
    return { current: l };
  }
  function _(l) {
    0 > bl || (l.current = hl[bl], hl[bl] = null, bl--);
  }
  function H(l, t) {
    bl++, hl[bl] = l.current, l.current = t;
  }
  var Y = r(null), K = r(null), k = r(null), ol = r(null);
  function kl(l, t) {
    switch (H(k, t), H(K, l), H(Y, null), t.nodeType) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? Gd(l) : 0;
        break;
      default:
        if (l = t.tagName, t = t.namespaceURI)
          t = Gd(t), l = Xd(t, l);
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
    _(Y), H(Y, l);
  }
  function Nl() {
    _(Y), _(K), _(k);
  }
  function Oe(l) {
    l.memoizedState !== null && H(ol, l);
    var t = Y.current, a = Xd(t, l.type);
    t !== a && (H(K, l), H(Y, a));
  }
  function Eu(l) {
    K.current === l && (_(Y), _(K)), ol.current === l && (_(ol), hu._currentValue = Z);
  }
  var Qn, yf;
  function za(l) {
    if (Qn === void 0)
      try {
        throw Error();
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Qn = t && t[1] || "", yf = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Qn + l + yf;
  }
  var Zn = !1;
  function Ln(l, t) {
    if (!l || Zn) return "";
    Zn = !0;
    var a = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var e = {
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
                } catch (g) {
                  var v = g;
                }
                Reflect.construct(l, [], A);
              } else {
                try {
                  A.call();
                } catch (g) {
                  v = g;
                }
                l.call(A.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (g) {
                v = g;
              }
              (A = l()) && typeof A.catch == "function" && A.catch(function() {
              });
            }
          } catch (g) {
            if (g && v && typeof g.stack == "string")
              return [g.stack, v.stack];
          }
          return [null, null];
        }
      };
      e.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        e.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        e.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var n = e.DetermineComponentFrameRoot(), i = n[0], c = n[1];
      if (i && c) {
        var f = i.split(`
`), h = c.split(`
`);
        for (u = e = 0; e < f.length && !f[e].includes("DetermineComponentFrameRoot"); )
          e++;
        for (; u < h.length && !h[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (e === f.length || u === h.length)
          for (e = f.length - 1, u = h.length - 1; 1 <= e && 0 <= u && f[e] !== h[u]; )
            u--;
        for (; 1 <= e && 0 <= u; e--, u--)
          if (f[e] !== h[u]) {
            if (e !== 1 || u !== 1)
              do
                if (e--, u--, 0 > u || f[e] !== h[u]) {
                  var p = `
` + f[e].replace(" at new ", " at ");
                  return l.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", l.displayName)), p;
                }
              while (1 <= e && 0 <= u);
            break;
          }
      }
    } finally {
      Zn = !1, Error.prepareStackTrace = a;
    }
    return (a = l ? l.displayName || l.name : "") ? za(a) : "";
  }
  function Xr(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return za(l.type);
      case 16:
        return za("Lazy");
      case 13:
        return l.child !== t && t !== null ? za("Suspense Fallback") : za("Suspense");
      case 19:
        return za("SuspenseList");
      case 0:
      case 15:
        return Ln(l.type, !1);
      case 11:
        return Ln(l.type.render, !1);
      case 1:
        return Ln(l.type, !0);
      case 31:
        return za("Activity");
      default:
        return "";
    }
  }
  function hf(l) {
    try {
      var t = "", a = null;
      do
        t += Xr(l, a), a = l, l = l.return;
      while (l);
      return t;
    } catch (e) {
      return `
Error generating stack: ` + e.message + `
` + e.stack;
    }
  }
  var Vn = Object.prototype.hasOwnProperty, Kn = d.unstable_scheduleCallback, Jn = d.unstable_cancelCallback, Qr = d.unstable_shouldYield, Zr = d.unstable_requestPaint, it = d.unstable_now, Lr = d.unstable_getCurrentPriorityLevel, vf = d.unstable_ImmediatePriority, gf = d.unstable_UserBlockingPriority, zu = d.unstable_NormalPriority, Vr = d.unstable_LowPriority, Sf = d.unstable_IdlePriority, Kr = d.log, Jr = d.unstable_setDisableYieldValue, Me = null, ct = null;
  function It(l) {
    if (typeof Kr == "function" && Jr(l), ct && typeof ct.setStrictMode == "function")
      try {
        ct.setStrictMode(Me, l);
      } catch {
      }
  }
  var ft = Math.clz32 ? Math.clz32 : Wr, wr = Math.log, $r = Math.LN2;
  function Wr(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (wr(l) / $r | 0) | 0;
  }
  var Au = 256, _u = 262144, Ou = 4194304;
  function Aa(l) {
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
  function Mu(l, t, a) {
    var e = l.pendingLanes;
    if (e === 0) return 0;
    var u = 0, n = l.suspendedLanes, i = l.pingedLanes;
    l = l.warmLanes;
    var c = e & 134217727;
    return c !== 0 ? (e = c & ~n, e !== 0 ? u = Aa(e) : (i &= c, i !== 0 ? u = Aa(i) : a || (a = c & ~l, a !== 0 && (u = Aa(a))))) : (c = e & ~n, c !== 0 ? u = Aa(c) : i !== 0 ? u = Aa(i) : a || (a = e & ~l, a !== 0 && (u = Aa(a)))), u === 0 ? 0 : t !== 0 && t !== u && (t & n) === 0 && (n = u & -u, a = t & -t, n >= a || n === 32 && (a & 4194048) !== 0) ? t : u;
  }
  function De(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function kr(l, t) {
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
  function pf() {
    var l = Ou;
    return Ou <<= 1, (Ou & 62914560) === 0 && (Ou = 4194304), l;
  }
  function wn(l) {
    for (var t = [], a = 0; 31 > a; a++) t.push(l);
    return t;
  }
  function Ne(l, t) {
    l.pendingLanes |= t, t !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Fr(l, t, a, e, u, n) {
    var i = l.pendingLanes;
    l.pendingLanes = a, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= a, l.entangledLanes &= a, l.errorRecoveryDisabledLanes &= a, l.shellSuspendCounter = 0;
    var c = l.entanglements, f = l.expirationTimes, h = l.hiddenUpdates;
    for (a = i & ~a; 0 < a; ) {
      var p = 31 - ft(a), A = 1 << p;
      c[p] = 0, f[p] = -1;
      var v = h[p];
      if (v !== null)
        for (h[p] = null, p = 0; p < v.length; p++) {
          var g = v[p];
          g !== null && (g.lane &= -536870913);
        }
      a &= ~A;
    }
    e !== 0 && bf(l, e, 0), n !== 0 && u === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(i & ~t));
  }
  function bf(l, t, a) {
    l.pendingLanes |= t, l.suspendedLanes &= ~t;
    var e = 31 - ft(t);
    l.entangledLanes |= t, l.entanglements[e] = l.entanglements[e] | 1073741824 | a & 261930;
  }
  function Tf(l, t) {
    var a = l.entangledLanes |= t;
    for (l = l.entanglements; a; ) {
      var e = 31 - ft(a), u = 1 << e;
      u & t | l[e] & t && (l[e] |= t), a &= ~u;
    }
  }
  function Ef(l, t) {
    var a = t & -t;
    return a = (a & 42) !== 0 ? 1 : $n(a), (a & (l.suspendedLanes | t)) !== 0 ? 0 : a;
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
  function zf() {
    var l = R.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : sr(l.type));
  }
  function Af(l, t) {
    var a = R.p;
    try {
      return R.p = l, t();
    } finally {
      R.p = a;
    }
  }
  var Pt = Math.random().toString(36).slice(2), Ll = "__reactFiber$" + Pt, Pl = "__reactProps$" + Pt, Za = "__reactContainer$" + Pt, kn = "__reactEvents$" + Pt, Ir = "__reactListeners$" + Pt, Pr = "__reactHandles$" + Pt, _f = "__reactResources$" + Pt, Ue = "__reactMarker$" + Pt;
  function Fn(l) {
    delete l[Ll], delete l[Pl], delete l[kn], delete l[Ir], delete l[Pr];
  }
  function La(l) {
    var t = l[Ll];
    if (t) return t;
    for (var a = l.parentNode; a; ) {
      if (t = a[Za] || a[Ll]) {
        if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
          for (l = wd(l); l !== null; ) {
            if (a = l[Ll]) return a;
            l = wd(l);
          }
        return t;
      }
      l = a, a = l.parentNode;
    }
    return null;
  }
  function Va(l) {
    if (l = l[Ll] || l[Za]) {
      var t = l.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return l;
    }
    return null;
  }
  function Ce(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(s(33));
  }
  function Ka(l) {
    var t = l[_f];
    return t || (t = l[_f] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Ql(l) {
    l[Ue] = !0;
  }
  var Of = /* @__PURE__ */ new Set(), Mf = {};
  function _a(l, t) {
    Ja(l, t), Ja(l + "Capture", t);
  }
  function Ja(l, t) {
    for (Mf[l] = t, l = 0; l < t.length; l++)
      Of.add(t[l]);
  }
  var lm = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Df = {}, Nf = {};
  function tm(l) {
    return Vn.call(Nf, l) ? !0 : Vn.call(Df, l) ? !1 : lm.test(l) ? Nf[l] = !0 : (Df[l] = !0, !1);
  }
  function Du(l, t, a) {
    if (tm(t))
      if (a === null) l.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var e = t.toLowerCase().slice(0, 5);
            if (e !== "data-" && e !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, "" + a);
      }
  }
  function Nu(l, t, a) {
    if (a === null) l.removeAttribute(t);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, "" + a);
    }
  }
  function Ht(l, t, a, e) {
    if (e === null) l.removeAttribute(a);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttributeNS(t, a, "" + e);
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
  function Uf(l) {
    var t = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function am(l, t, a) {
    var e = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      t
    );
    if (!l.hasOwnProperty(t) && typeof e < "u" && typeof e.get == "function" && typeof e.set == "function") {
      var u = e.get, n = e.set;
      return Object.defineProperty(l, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(i) {
          a = "" + i, n.call(this, i);
        }
      }), Object.defineProperty(l, t, {
        enumerable: e.enumerable
      }), {
        getValue: function() {
          return a;
        },
        setValue: function(i) {
          a = "" + i;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[t];
        }
      };
    }
  }
  function In(l) {
    if (!l._valueTracker) {
      var t = Uf(l) ? "checked" : "value";
      l._valueTracker = am(
        l,
        t,
        "" + l[t]
      );
    }
  }
  function Cf(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var a = t.getValue(), e = "";
    return l && (e = Uf(l) ? l.checked ? "true" : "false" : l.value), l = e, l !== a ? (t.setValue(l), !0) : !1;
  }
  function Uu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var em = /[\n"\\]/g;
  function gt(l) {
    return l.replace(
      em,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Pn(l, t, a, e, u, n, i, c) {
    l.name = "", i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" ? l.type = i : l.removeAttribute("type"), t != null ? i === "number" ? (t === 0 && l.value === "" || l.value != t) && (l.value = "" + vt(t)) : l.value !== "" + vt(t) && (l.value = "" + vt(t)) : i !== "submit" && i !== "reset" || l.removeAttribute("value"), t != null ? li(l, i, vt(t)) : a != null ? li(l, i, vt(a)) : e != null && l.removeAttribute("value"), u == null && n != null && (l.defaultChecked = !!n), u != null && (l.checked = u && typeof u != "function" && typeof u != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + vt(c) : l.removeAttribute("name");
  }
  function jf(l, t, a, e, u, n, i, c) {
    if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), t != null || a != null) {
      if (!(n !== "submit" && n !== "reset" || t != null)) {
        In(l);
        return;
      }
      a = a != null ? "" + vt(a) : "", t = t != null ? "" + vt(t) : a, c || t === l.value || (l.value = t), l.defaultValue = t;
    }
    e = e ?? u, e = typeof e != "function" && typeof e != "symbol" && !!e, l.checked = c ? l.checked : !!e, l.defaultChecked = !!e, i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (l.name = i), In(l);
  }
  function li(l, t, a) {
    t === "number" && Uu(l.ownerDocument) === l || l.defaultValue === "" + a || (l.defaultValue = "" + a);
  }
  function wa(l, t, a, e) {
    if (l = l.options, t) {
      t = {};
      for (var u = 0; u < a.length; u++)
        t["$" + a[u]] = !0;
      for (a = 0; a < l.length; a++)
        u = t.hasOwnProperty("$" + l[a].value), l[a].selected !== u && (l[a].selected = u), u && e && (l[a].defaultSelected = !0);
    } else {
      for (a = "" + vt(a), t = null, u = 0; u < l.length; u++) {
        if (l[u].value === a) {
          l[u].selected = !0, e && (l[u].defaultSelected = !0);
          return;
        }
        t !== null || l[u].disabled || (t = l[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Rf(l, t, a) {
    if (t != null && (t = "" + vt(t), t !== l.value && (l.value = t), a == null)) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = a != null ? "" + vt(a) : "";
  }
  function Hf(l, t, a, e) {
    if (t == null) {
      if (e != null) {
        if (a != null) throw Error(s(92));
        if (Xl(e)) {
          if (1 < e.length) throw Error(s(93));
          e = e[0];
        }
        a = e;
      }
      a == null && (a = ""), t = a;
    }
    a = vt(t), l.defaultValue = a, e = l.textContent, e === a && e !== "" && e !== null && (l.value = e), In(l);
  }
  function $a(l, t) {
    if (t) {
      var a = l.firstChild;
      if (a && a === l.lastChild && a.nodeType === 3) {
        a.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var um = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function xf(l, t, a) {
    var e = t.indexOf("--") === 0;
    a == null || typeof a == "boolean" || a === "" ? e ? l.setProperty(t, "") : t === "float" ? l.cssFloat = "" : l[t] = "" : e ? l.setProperty(t, a) : typeof a != "number" || a === 0 || um.has(t) ? t === "float" ? l.cssFloat = a : l[t] = ("" + a).trim() : l[t] = a + "px";
  }
  function Bf(l, t, a) {
    if (t != null && typeof t != "object")
      throw Error(s(62));
    if (l = l.style, a != null) {
      for (var e in a)
        !a.hasOwnProperty(e) || t != null && t.hasOwnProperty(e) || (e.indexOf("--") === 0 ? l.setProperty(e, "") : e === "float" ? l.cssFloat = "" : l[e] = "");
      for (var u in t)
        e = t[u], t.hasOwnProperty(u) && a[u] !== e && xf(l, u, e);
    } else
      for (var n in t)
        t.hasOwnProperty(n) && xf(l, n, t[n]);
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
  var nm = /* @__PURE__ */ new Map([
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
  ]), im = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Cu(l) {
    return im.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  function xt() {
  }
  var ai = null;
  function ei(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var Wa = null, ka = null;
  function qf(l) {
    var t = Va(l);
    if (t && (l = t.stateNode)) {
      var a = l[Pl] || null;
      l: switch (l = t.stateNode, t.type) {
        case "input":
          if (Pn(
            l,
            a.value,
            a.defaultValue,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name
          ), t = a.name, a.type === "radio" && t != null) {
            for (a = l; a.parentNode; ) a = a.parentNode;
            for (a = a.querySelectorAll(
              'input[name="' + gt(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < a.length; t++) {
              var e = a[t];
              if (e !== l && e.form === l.form) {
                var u = e[Pl] || null;
                if (!u) throw Error(s(90));
                Pn(
                  e,
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
            for (t = 0; t < a.length; t++)
              e = a[t], e.form === l.form && Cf(e);
          }
          break l;
        case "textarea":
          Rf(l, a.value, a.defaultValue);
          break l;
        case "select":
          t = a.value, t != null && wa(l, !!a.multiple, t, !1);
      }
    }
  }
  var ui = !1;
  function Yf(l, t, a) {
    if (ui) return l(t, a);
    ui = !0;
    try {
      var e = l(t);
      return e;
    } finally {
      if (ui = !1, (Wa !== null || ka !== null) && (pn(), Wa && (t = Wa, l = ka, ka = Wa = null, qf(t), l)))
        for (t = 0; t < l.length; t++) qf(l[t]);
    }
  }
  function je(l, t) {
    var a = l.stateNode;
    if (a === null) return null;
    var e = a[Pl] || null;
    if (e === null) return null;
    a = e[t];
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
        (e = !e.disabled) || (l = l.type, e = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !e;
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (a && typeof a != "function")
      throw Error(
        s(231, t, typeof a)
      );
    return a;
  }
  var Bt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ni = !1;
  if (Bt)
    try {
      var Re = {};
      Object.defineProperty(Re, "passive", {
        get: function() {
          ni = !0;
        }
      }), window.addEventListener("test", Re, Re), window.removeEventListener("test", Re, Re);
    } catch {
      ni = !1;
    }
  var la = null, ii = null, ju = null;
  function Gf() {
    if (ju) return ju;
    var l, t = ii, a = t.length, e, u = "value" in la ? la.value : la.textContent, n = u.length;
    for (l = 0; l < a && t[l] === u[l]; l++) ;
    var i = a - l;
    for (e = 1; e <= i && t[a - e] === u[n - e]; e++) ;
    return ju = u.slice(l, 1 < e ? 1 - e : void 0);
  }
  function Ru(l) {
    var t = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && t === 13 && (l = 13)) : l = t, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Hu() {
    return !0;
  }
  function Xf() {
    return !1;
  }
  function lt(l) {
    function t(a, e, u, n, i) {
      this._reactName = a, this._targetInst = u, this.type = e, this.nativeEvent = n, this.target = i, this.currentTarget = null;
      for (var c in l)
        l.hasOwnProperty(c) && (a = l[c], this[c] = a ? a(n) : n[c]);
      return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? Hu : Xf, this.isPropagationStopped = Xf, this;
    }
    return j(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var a = this.nativeEvent;
        a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Hu);
      },
      stopPropagation: function() {
        var a = this.nativeEvent;
        a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Hu);
      },
      persist: function() {
      },
      isPersistent: Hu
    }), t;
  }
  var Oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, xu = lt(Oa), He = j({}, Oa, { view: 0, detail: 0 }), cm = lt(He), ci, fi, xe, Bu = j({}, He, {
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
      return "movementX" in l ? l.movementX : (l !== xe && (xe && l.type === "mousemove" ? (ci = l.screenX - xe.screenX, fi = l.screenY - xe.screenY) : fi = ci = 0, xe = l), ci);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : fi;
    }
  }), Qf = lt(Bu), fm = j({}, Bu, { dataTransfer: 0 }), sm = lt(fm), om = j({}, He, { relatedTarget: 0 }), si = lt(om), dm = j({}, Oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), rm = lt(dm), mm = j({}, Oa, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), ym = lt(mm), hm = j({}, Oa, { data: 0 }), Zf = lt(hm), vm = {
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
  }, gm = {
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
  }, Sm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function pm(l) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(l) : (l = Sm[l]) ? !!t[l] : !1;
  }
  function oi() {
    return pm;
  }
  var bm = j({}, He, {
    key: function(l) {
      if (l.key) {
        var t = vm[l.key] || l.key;
        if (t !== "Unidentified") return t;
      }
      return l.type === "keypress" ? (l = Ru(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? gm[l.keyCode] || "Unidentified" : "";
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
      return l.type === "keypress" ? Ru(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Ru(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Tm = lt(bm), Em = j({}, Bu, {
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
  }), Lf = lt(Em), zm = j({}, He, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: oi
  }), Am = lt(zm), _m = j({}, Oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Om = lt(_m), Mm = j({}, Bu, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Dm = lt(Mm), Nm = j({}, Oa, {
    newState: 0,
    oldState: 0
  }), Um = lt(Nm), Cm = [9, 13, 27, 32], di = Bt && "CompositionEvent" in window, Be = null;
  Bt && "documentMode" in document && (Be = document.documentMode);
  var jm = Bt && "TextEvent" in window && !Be, Vf = Bt && (!di || Be && 8 < Be && 11 >= Be), Kf = " ", Jf = !1;
  function wf(l, t) {
    switch (l) {
      case "keyup":
        return Cm.indexOf(t.keyCode) !== -1;
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
  function $f(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Fa = !1;
  function Rm(l, t) {
    switch (l) {
      case "compositionend":
        return $f(t);
      case "keypress":
        return t.which !== 32 ? null : (Jf = !0, Kf);
      case "textInput":
        return l = t.data, l === Kf && Jf ? null : l;
      default:
        return null;
    }
  }
  function Hm(l, t) {
    if (Fa)
      return l === "compositionend" || !di && wf(l, t) ? (l = Gf(), ju = ii = la = null, Fa = !1, l) : null;
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
        return Vf && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var xm = {
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
  function Wf(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!xm[l.type] : t === "textarea";
  }
  function kf(l, t, a, e) {
    Wa ? ka ? ka.push(e) : ka = [e] : Wa = e, t = On(t, "onChange"), 0 < t.length && (a = new xu(
      "onChange",
      "change",
      null,
      a,
      e
    ), l.push({ event: a, listeners: t }));
  }
  var qe = null, Ye = null;
  function Bm(l) {
    Rd(l, 0);
  }
  function qu(l) {
    var t = Ce(l);
    if (Cf(t)) return l;
  }
  function Ff(l, t) {
    if (l === "change") return t;
  }
  var If = !1;
  if (Bt) {
    var ri;
    if (Bt) {
      var mi = "oninput" in document;
      if (!mi) {
        var Pf = document.createElement("div");
        Pf.setAttribute("oninput", "return;"), mi = typeof Pf.oninput == "function";
      }
      ri = mi;
    } else ri = !1;
    If = ri && (!document.documentMode || 9 < document.documentMode);
  }
  function ls() {
    qe && (qe.detachEvent("onpropertychange", ts), Ye = qe = null);
  }
  function ts(l) {
    if (l.propertyName === "value" && qu(Ye)) {
      var t = [];
      kf(
        t,
        Ye,
        l,
        ei(l)
      ), Yf(Bm, t);
    }
  }
  function qm(l, t, a) {
    l === "focusin" ? (ls(), qe = t, Ye = a, qe.attachEvent("onpropertychange", ts)) : l === "focusout" && ls();
  }
  function Ym(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return qu(Ye);
  }
  function Gm(l, t) {
    if (l === "click") return qu(t);
  }
  function Xm(l, t) {
    if (l === "input" || l === "change")
      return qu(t);
  }
  function Qm(l, t) {
    return l === t && (l !== 0 || 1 / l === 1 / t) || l !== l && t !== t;
  }
  var st = typeof Object.is == "function" ? Object.is : Qm;
  function Ge(l, t) {
    if (st(l, t)) return !0;
    if (typeof l != "object" || l === null || typeof t != "object" || t === null)
      return !1;
    var a = Object.keys(l), e = Object.keys(t);
    if (a.length !== e.length) return !1;
    for (e = 0; e < a.length; e++) {
      var u = a[e];
      if (!Vn.call(t, u) || !st(l[u], t[u]))
        return !1;
    }
    return !0;
  }
  function as(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function es(l, t) {
    var a = as(l);
    l = 0;
    for (var e; a; ) {
      if (a.nodeType === 3) {
        if (e = l + a.textContent.length, l <= t && e >= t)
          return { node: a, offset: t - l };
        l = e;
      }
      l: {
        for (; a; ) {
          if (a.nextSibling) {
            a = a.nextSibling;
            break l;
          }
          a = a.parentNode;
        }
        a = void 0;
      }
      a = as(a);
    }
  }
  function us(l, t) {
    return l && t ? l === t ? !0 : l && l.nodeType === 3 ? !1 : t && t.nodeType === 3 ? us(l, t.parentNode) : "contains" in l ? l.contains(t) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function ns(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var t = Uu(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var a = typeof t.contentWindow.location.href == "string";
      } catch {
        a = !1;
      }
      if (a) l = t.contentWindow;
      else break;
      t = Uu(l.document);
    }
    return t;
  }
  function yi(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t && (t === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || t === "textarea" || l.contentEditable === "true");
  }
  var Zm = Bt && "documentMode" in document && 11 >= document.documentMode, Ia = null, hi = null, Xe = null, vi = !1;
  function is(l, t, a) {
    var e = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
    vi || Ia == null || Ia !== Uu(e) || (e = Ia, "selectionStart" in e && yi(e) ? e = { start: e.selectionStart, end: e.selectionEnd } : (e = (e.ownerDocument && e.ownerDocument.defaultView || window).getSelection(), e = {
      anchorNode: e.anchorNode,
      anchorOffset: e.anchorOffset,
      focusNode: e.focusNode,
      focusOffset: e.focusOffset
    }), Xe && Ge(Xe, e) || (Xe = e, e = On(hi, "onSelect"), 0 < e.length && (t = new xu(
      "onSelect",
      "select",
      null,
      t,
      a
    ), l.push({ event: t, listeners: e }), t.target = Ia)));
  }
  function Ma(l, t) {
    var a = {};
    return a[l.toLowerCase()] = t.toLowerCase(), a["Webkit" + l] = "webkit" + t, a["Moz" + l] = "moz" + t, a;
  }
  var Pa = {
    animationend: Ma("Animation", "AnimationEnd"),
    animationiteration: Ma("Animation", "AnimationIteration"),
    animationstart: Ma("Animation", "AnimationStart"),
    transitionrun: Ma("Transition", "TransitionRun"),
    transitionstart: Ma("Transition", "TransitionStart"),
    transitioncancel: Ma("Transition", "TransitionCancel"),
    transitionend: Ma("Transition", "TransitionEnd")
  }, gi = {}, cs = {};
  Bt && (cs = document.createElement("div").style, "AnimationEvent" in window || (delete Pa.animationend.animation, delete Pa.animationiteration.animation, delete Pa.animationstart.animation), "TransitionEvent" in window || delete Pa.transitionend.transition);
  function Da(l) {
    if (gi[l]) return gi[l];
    if (!Pa[l]) return l;
    var t = Pa[l], a;
    for (a in t)
      if (t.hasOwnProperty(a) && a in cs)
        return gi[l] = t[a];
    return l;
  }
  var fs = Da("animationend"), ss = Da("animationiteration"), os = Da("animationstart"), Lm = Da("transitionrun"), Vm = Da("transitionstart"), Km = Da("transitioncancel"), ds = Da("transitionend"), rs = /* @__PURE__ */ new Map(), Si = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Si.push("scrollEnd");
  function Ot(l, t) {
    rs.set(l, t), _a(t, [l]);
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
  }, St = [], le = 0, pi = 0;
  function Gu() {
    for (var l = le, t = pi = le = 0; t < l; ) {
      var a = St[t];
      St[t++] = null;
      var e = St[t];
      St[t++] = null;
      var u = St[t];
      St[t++] = null;
      var n = St[t];
      if (St[t++] = null, e !== null && u !== null) {
        var i = e.pending;
        i === null ? u.next = u : (u.next = i.next, i.next = u), e.pending = u;
      }
      n !== 0 && ms(a, u, n);
    }
  }
  function Xu(l, t, a, e) {
    St[le++] = l, St[le++] = t, St[le++] = a, St[le++] = e, pi |= e, l.lanes |= e, l = l.alternate, l !== null && (l.lanes |= e);
  }
  function bi(l, t, a, e) {
    return Xu(l, t, a, e), Qu(l);
  }
  function Na(l, t) {
    return Xu(l, null, null, t), Qu(l);
  }
  function ms(l, t, a) {
    l.lanes |= a;
    var e = l.alternate;
    e !== null && (e.lanes |= a);
    for (var u = !1, n = l.return; n !== null; )
      n.childLanes |= a, e = n.alternate, e !== null && (e.childLanes |= a), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (u = !0)), l = n, n = n.return;
    return l.tag === 3 ? (n = l.stateNode, u && t !== null && (u = 31 - ft(a), l = n.hiddenUpdates, e = l[u], e === null ? l[u] = [t] : e.push(t), t.lane = a | 536870912), n) : null;
  }
  function Qu(l) {
    if (50 < fu)
      throw fu = 0, Nc = null, Error(s(185));
    for (var t = l.return; t !== null; )
      l = t, t = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var te = {};
  function Jm(l, t, a, e) {
    this.tag = l, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = e, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ot(l, t, a, e) {
    return new Jm(l, t, a, e);
  }
  function Ti(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function qt(l, t) {
    var a = l.alternate;
    return a === null ? (a = ot(
      l.tag,
      t,
      l.key,
      l.mode
    ), a.elementType = l.elementType, a.type = l.type, a.stateNode = l.stateNode, a.alternate = l, l.alternate = a) : (a.pendingProps = t, a.type = l.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null), a.flags = l.flags & 65011712, a.childLanes = l.childLanes, a.lanes = l.lanes, a.child = l.child, a.memoizedProps = l.memoizedProps, a.memoizedState = l.memoizedState, a.updateQueue = l.updateQueue, t = l.dependencies, a.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, a.sibling = l.sibling, a.index = l.index, a.ref = l.ref, a.refCleanup = l.refCleanup, a;
  }
  function ys(l, t) {
    l.flags &= 65011714;
    var a = l.alternate;
    return a === null ? (l.childLanes = 0, l.lanes = t, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = a.childLanes, l.lanes = a.lanes, l.child = a.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = a.memoizedProps, l.memoizedState = a.memoizedState, l.updateQueue = a.updateQueue, l.type = a.type, t = a.dependencies, l.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), l;
  }
  function Zu(l, t, a, e, u, n) {
    var i = 0;
    if (e = l, typeof l == "function") Ti(l) && (i = 1);
    else if (typeof l == "string")
      i = Fy(
        l,
        a,
        Y.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      l: switch (l) {
        case $l:
          return l = ot(31, a, t, u), l.elementType = $l, l.lanes = n, l;
        case W:
          return Ua(a.children, u, n, t);
        case yl:
          i = 8, u |= 24;
          break;
        case tl:
          return l = ot(12, a, t, u | 2), l.elementType = tl, l.lanes = n, l;
        case fl:
          return l = ot(13, a, t, u), l.elementType = fl, l.lanes = n, l;
        case Dl:
          return l = ot(19, a, t, u), l.elementType = Dl, l.lanes = n, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case cl:
                i = 10;
                break l;
              case Bl:
                i = 9;
                break l;
              case ql:
                i = 11;
                break l;
              case w:
                i = 14;
                break l;
              case Gl:
                i = 16, e = null;
                break l;
            }
          i = 29, a = Error(
            s(130, l === null ? "null" : typeof l, "")
          ), e = null;
      }
    return t = ot(i, a, t, u), t.elementType = l, t.type = e, t.lanes = n, t;
  }
  function Ua(l, t, a, e) {
    return l = ot(7, l, e, t), l.lanes = a, l;
  }
  function Ei(l, t, a) {
    return l = ot(6, l, null, t), l.lanes = a, l;
  }
  function hs(l) {
    var t = ot(18, null, null, 0);
    return t.stateNode = l, t;
  }
  function zi(l, t, a) {
    return t = ot(
      4,
      l.children !== null ? l.children : [],
      l.key,
      t
    ), t.lanes = a, t.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, t;
  }
  var vs = /* @__PURE__ */ new WeakMap();
  function pt(l, t) {
    if (typeof l == "object" && l !== null) {
      var a = vs.get(l);
      return a !== void 0 ? a : (t = {
        value: l,
        source: t,
        stack: hf(t)
      }, vs.set(l, t), t);
    }
    return {
      value: l,
      source: t,
      stack: hf(t)
    };
  }
  var ae = [], ee = 0, Lu = null, Qe = 0, bt = [], Tt = 0, ta = null, Ut = 1, Ct = "";
  function Yt(l, t) {
    ae[ee++] = Qe, ae[ee++] = Lu, Lu = l, Qe = t;
  }
  function gs(l, t, a) {
    bt[Tt++] = Ut, bt[Tt++] = Ct, bt[Tt++] = ta, ta = l;
    var e = Ut;
    l = Ct;
    var u = 32 - ft(e) - 1;
    e &= ~(1 << u), a += 1;
    var n = 32 - ft(t) + u;
    if (30 < n) {
      var i = u - u % 5;
      n = (e & (1 << i) - 1).toString(32), e >>= i, u -= i, Ut = 1 << 32 - ft(t) + u | a << u | e, Ct = n + l;
    } else
      Ut = 1 << n | a << u | e, Ct = l;
  }
  function Ai(l) {
    l.return !== null && (Yt(l, 1), gs(l, 1, 0));
  }
  function _i(l) {
    for (; l === Lu; )
      Lu = ae[--ee], ae[ee] = null, Qe = ae[--ee], ae[ee] = null;
    for (; l === ta; )
      ta = bt[--Tt], bt[Tt] = null, Ct = bt[--Tt], bt[Tt] = null, Ut = bt[--Tt], bt[Tt] = null;
  }
  function Ss(l, t) {
    bt[Tt++] = Ut, bt[Tt++] = Ct, bt[Tt++] = ta, Ut = t.id, Ct = t.overflow, ta = l;
  }
  var Vl = null, zl = null, al = !1, aa = null, Et = !1, Oi = Error(s(519));
  function ea(l) {
    var t = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ze(pt(t, l)), Oi;
  }
  function ps(l) {
    var t = l.stateNode, a = l.type, e = l.memoizedProps;
    switch (t[Ll] = l, t[Pl] = e, a) {
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
        for (a = 0; a < ou.length; a++)
          I(ou[a], t);
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
        I("invalid", t), jf(
          t,
          e.value,
          e.defaultValue,
          e.checked,
          e.defaultChecked,
          e.type,
          e.name,
          !0
        );
        break;
      case "select":
        I("invalid", t);
        break;
      case "textarea":
        I("invalid", t), Hf(t, e.value, e.defaultValue, e.children);
    }
    a = e.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || e.suppressHydrationWarning === !0 || qd(t.textContent, a) ? (e.popover != null && (I("beforetoggle", t), I("toggle", t)), e.onScroll != null && I("scroll", t), e.onScrollEnd != null && I("scrollend", t), e.onClick != null && (t.onclick = xt), t = !0) : t = !1, t || ea(l, !0);
  }
  function bs(l) {
    for (Vl = l.return; Vl; )
      switch (Vl.tag) {
        case 5:
        case 31:
        case 13:
          Et = !1;
          return;
        case 27:
        case 3:
          Et = !0;
          return;
        default:
          Vl = Vl.return;
      }
  }
  function ue(l) {
    if (l !== Vl) return !1;
    if (!al) return bs(l), al = !0, !1;
    var t = l.tag, a;
    if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = l.type, a = !(a !== "form" && a !== "button") || Vc(l.type, l.memoizedProps)), a = !a), a && zl && ea(l), bs(l), t === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      zl = Jd(l);
    } else if (t === 31) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
      zl = Jd(l);
    } else
      t === 27 ? (t = zl, ga(l.type) ? (l = Wc, Wc = null, zl = l) : zl = t) : zl = Vl ? At(l.stateNode.nextSibling) : null;
    return !0;
  }
  function Ca() {
    zl = Vl = null, al = !1;
  }
  function Mi() {
    var l = aa;
    return l !== null && (ut === null ? ut = l : ut.push.apply(
      ut,
      l
    ), aa = null), l;
  }
  function Ze(l) {
    aa === null ? aa = [l] : aa.push(l);
  }
  var Di = r(null), ja = null, Gt = null;
  function ua(l, t, a) {
    H(Di, t._currentValue), t._currentValue = a;
  }
  function Xt(l) {
    l._currentValue = Di.current, _(Di);
  }
  function Ni(l, t, a) {
    for (; l !== null; ) {
      var e = l.alternate;
      if ((l.childLanes & t) !== t ? (l.childLanes |= t, e !== null && (e.childLanes |= t)) : e !== null && (e.childLanes & t) !== t && (e.childLanes |= t), l === a) break;
      l = l.return;
    }
  }
  function Ui(l, t, a, e) {
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
              n.lanes |= a, c = n.alternate, c !== null && (c.lanes |= a), Ni(
                n.return,
                a,
                l
              ), e || (i = null);
              break l;
            }
          n = c.next;
        }
      } else if (u.tag === 18) {
        if (i = u.return, i === null) throw Error(s(341));
        i.lanes |= a, n = i.alternate, n !== null && (n.lanes |= a), Ni(i, a, l), i = null;
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
  function ne(l, t, a, e) {
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
      } else if (u === ol.current) {
        if (i = u.alternate, i === null) throw Error(s(387));
        i.memoizedState.memoizedState !== u.memoizedState.memoizedState && (l !== null ? l.push(hu) : l = [hu]);
      }
      u = u.return;
    }
    l !== null && Ui(
      t,
      l,
      a,
      e
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
  function Ra(l) {
    ja = l, Gt = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Kl(l) {
    return Ts(ja, l);
  }
  function Ku(l, t) {
    return ja === null && Ra(l), Ts(l, t);
  }
  function Ts(l, t) {
    var a = t._currentValue;
    if (t = { context: t, memoizedValue: a, next: null }, Gt === null) {
      if (l === null) throw Error(s(308));
      Gt = t, l.dependencies = { lanes: 0, firstContext: t }, l.flags |= 524288;
    } else Gt = Gt.next = t;
    return a;
  }
  var wm = typeof AbortController < "u" ? AbortController : function() {
    var l = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(a, e) {
        l.push(e);
      }
    };
    this.abort = function() {
      t.aborted = !0, l.forEach(function(a) {
        return a();
      });
    };
  }, $m = d.unstable_scheduleCallback, Wm = d.unstable_NormalPriority, jl = {
    $$typeof: cl,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ci() {
    return {
      controller: new wm(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Le(l) {
    l.refCount--, l.refCount === 0 && $m(Wm, function() {
      l.controller.abort();
    });
  }
  var Ve = null, ji = 0, ie = 0, ce = null;
  function km(l, t) {
    if (Ve === null) {
      var a = Ve = [];
      ji = 0, ie = xc(), ce = {
        status: "pending",
        value: void 0,
        then: function(e) {
          a.push(e);
        }
      };
    }
    return ji++, t.then(Es, Es), t;
  }
  function Es() {
    if (--ji === 0 && Ve !== null) {
      ce !== null && (ce.status = "fulfilled");
      var l = Ve;
      Ve = null, ie = 0, ce = null;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Fm(l, t) {
    var a = [], e = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        a.push(u);
      }
    };
    return l.then(
      function() {
        e.status = "fulfilled", e.value = t;
        for (var u = 0; u < a.length; u++) (0, a[u])(t);
      },
      function(u) {
        for (e.status = "rejected", e.reason = u, u = 0; u < a.length; u++)
          (0, a[u])(void 0);
      }
    ), e;
  }
  var zs = b.S;
  b.S = function(l, t) {
    cd = it(), typeof t == "object" && t !== null && typeof t.then == "function" && km(l, t), zs !== null && zs(l, t);
  };
  var Ha = r(null);
  function Ri() {
    var l = Ha.current;
    return l !== null ? l : Tl.pooledCache;
  }
  function Ju(l, t) {
    t === null ? H(Ha, Ha.current) : H(Ha, t.pool);
  }
  function As() {
    var l = Ri();
    return l === null ? null : { parent: jl._currentValue, pool: l };
  }
  var fe = Error(s(460)), Hi = Error(s(474)), wu = Error(s(542)), $u = { then: function() {
  } };
  function _s(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Os(l, t, a) {
    switch (a = l[a], a === void 0 ? l.push(t) : a !== t && (t.then(xt, xt), t = a), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw l = t.reason, Ds(l), l;
      default:
        if (typeof t.status == "string") t.then(xt, xt);
        else {
          if (l = Tl, l !== null && 100 < l.shellSuspendCounter)
            throw Error(s(482));
          l = t, l.status = "pending", l.then(
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = e;
              }
            },
            function(e) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = e;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw l = t.reason, Ds(l), l;
        }
        throw Ba = t, fe;
    }
  }
  function xa(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (a) {
      throw a !== null && typeof a == "object" && typeof a.then == "function" ? (Ba = a, fe) : a;
    }
  }
  var Ba = null;
  function Ms() {
    if (Ba === null) throw Error(s(459));
    var l = Ba;
    return Ba = null, l;
  }
  function Ds(l) {
    if (l === fe || l === wu)
      throw Error(s(483));
  }
  var se = null, Ke = 0;
  function Wu(l) {
    var t = Ke;
    return Ke += 1, se === null && (se = []), Os(se, l, t);
  }
  function Je(l, t) {
    t = t.props.ref, l.ref = t !== void 0 ? t : null;
  }
  function ku(l, t) {
    throw t.$$typeof === V ? Error(s(525)) : (l = Object.prototype.toString.call(t), Error(
      s(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : l
      )
    ));
  }
  function Ns(l) {
    function t(m, o) {
      if (l) {
        var y = m.deletions;
        y === null ? (m.deletions = [o], m.flags |= 16) : y.push(o);
      }
    }
    function a(m, o) {
      if (!l) return null;
      for (; o !== null; )
        t(m, o), o = o.sibling;
      return null;
    }
    function e(m) {
      for (var o = /* @__PURE__ */ new Map(); m !== null; )
        m.key !== null ? o.set(m.key, m) : o.set(m.index, m), m = m.sibling;
      return o;
    }
    function u(m, o) {
      return m = qt(m, o), m.index = 0, m.sibling = null, m;
    }
    function n(m, o, y) {
      return m.index = y, l ? (y = m.alternate, y !== null ? (y = y.index, y < o ? (m.flags |= 67108866, o) : y) : (m.flags |= 67108866, o)) : (m.flags |= 1048576, o);
    }
    function i(m) {
      return l && m.alternate === null && (m.flags |= 67108866), m;
    }
    function c(m, o, y, E) {
      return o === null || o.tag !== 6 ? (o = Ei(y, m.mode, E), o.return = m, o) : (o = u(o, y), o.return = m, o);
    }
    function f(m, o, y, E) {
      var X = y.type;
      return X === W ? p(
        m,
        o,
        y.props.children,
        E,
        y.key
      ) : o !== null && (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Gl && xa(X) === o.type) ? (o = u(o, y.props), Je(o, y), o.return = m, o) : (o = Zu(
        y.type,
        y.key,
        y.props,
        null,
        m.mode,
        E
      ), Je(o, y), o.return = m, o);
    }
    function h(m, o, y, E) {
      return o === null || o.tag !== 4 || o.stateNode.containerInfo !== y.containerInfo || o.stateNode.implementation !== y.implementation ? (o = zi(y, m.mode, E), o.return = m, o) : (o = u(o, y.children || []), o.return = m, o);
    }
    function p(m, o, y, E, X) {
      return o === null || o.tag !== 7 ? (o = Ua(
        y,
        m.mode,
        E,
        X
      ), o.return = m, o) : (o = u(o, y), o.return = m, o);
    }
    function A(m, o, y) {
      if (typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint")
        return o = Ei(
          "" + o,
          m.mode,
          y
        ), o.return = m, o;
      if (typeof o == "object" && o !== null) {
        switch (o.$$typeof) {
          case pl:
            return y = Zu(
              o.type,
              o.key,
              o.props,
              null,
              m.mode,
              y
            ), Je(y, o), y.return = m, y;
          case ml:
            return o = zi(
              o,
              m.mode,
              y
            ), o.return = m, o;
          case Gl:
            return o = xa(o), A(m, o, y);
        }
        if (Xl(o) || ul(o))
          return o = Ua(
            o,
            m.mode,
            y,
            null
          ), o.return = m, o;
        if (typeof o.then == "function")
          return A(m, Wu(o), y);
        if (o.$$typeof === cl)
          return A(
            m,
            Ku(m, o),
            y
          );
        ku(m, o);
      }
      return null;
    }
    function v(m, o, y, E) {
      var X = o !== null ? o.key : null;
      if (typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint")
        return X !== null ? null : c(m, o, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case pl:
            return y.key === X ? f(m, o, y, E) : null;
          case ml:
            return y.key === X ? h(m, o, y, E) : null;
          case Gl:
            return y = xa(y), v(m, o, y, E);
        }
        if (Xl(y) || ul(y))
          return X !== null ? null : p(m, o, y, E, null);
        if (typeof y.then == "function")
          return v(
            m,
            o,
            Wu(y),
            E
          );
        if (y.$$typeof === cl)
          return v(
            m,
            o,
            Ku(m, y),
            E
          );
        ku(m, y);
      }
      return null;
    }
    function g(m, o, y, E, X) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return m = m.get(y) || null, c(o, m, "" + E, X);
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case pl:
            return m = m.get(
              E.key === null ? y : E.key
            ) || null, f(o, m, E, X);
          case ml:
            return m = m.get(
              E.key === null ? y : E.key
            ) || null, h(o, m, E, X);
          case Gl:
            return E = xa(E), g(
              m,
              o,
              y,
              E,
              X
            );
        }
        if (Xl(E) || ul(E))
          return m = m.get(y) || null, p(o, m, E, X, null);
        if (typeof E.then == "function")
          return g(
            m,
            o,
            y,
            Wu(E),
            X
          );
        if (E.$$typeof === cl)
          return g(
            m,
            o,
            y,
            Ku(o, E),
            X
          );
        ku(o, E);
      }
      return null;
    }
    function B(m, o, y, E) {
      for (var X = null, nl = null, G = o, $ = o = 0, ll = null; G !== null && $ < y.length; $++) {
        G.index > $ ? (ll = G, G = null) : ll = G.sibling;
        var il = v(
          m,
          G,
          y[$],
          E
        );
        if (il === null) {
          G === null && (G = ll);
          break;
        }
        l && G && il.alternate === null && t(m, G), o = n(il, o, $), nl === null ? X = il : nl.sibling = il, nl = il, G = ll;
      }
      if ($ === y.length)
        return a(m, G), al && Yt(m, $), X;
      if (G === null) {
        for (; $ < y.length; $++)
          G = A(m, y[$], E), G !== null && (o = n(
            G,
            o,
            $
          ), nl === null ? X = G : nl.sibling = G, nl = G);
        return al && Yt(m, $), X;
      }
      for (G = e(G); $ < y.length; $++)
        ll = g(
          G,
          m,
          $,
          y[$],
          E
        ), ll !== null && (l && ll.alternate !== null && G.delete(
          ll.key === null ? $ : ll.key
        ), o = n(
          ll,
          o,
          $
        ), nl === null ? X = ll : nl.sibling = ll, nl = ll);
      return l && G.forEach(function(Ea) {
        return t(m, Ea);
      }), al && Yt(m, $), X;
    }
    function Q(m, o, y, E) {
      if (y == null) throw Error(s(151));
      for (var X = null, nl = null, G = o, $ = o = 0, ll = null, il = y.next(); G !== null && !il.done; $++, il = y.next()) {
        G.index > $ ? (ll = G, G = null) : ll = G.sibling;
        var Ea = v(m, G, il.value, E);
        if (Ea === null) {
          G === null && (G = ll);
          break;
        }
        l && G && Ea.alternate === null && t(m, G), o = n(Ea, o, $), nl === null ? X = Ea : nl.sibling = Ea, nl = Ea, G = ll;
      }
      if (il.done)
        return a(m, G), al && Yt(m, $), X;
      if (G === null) {
        for (; !il.done; $++, il = y.next())
          il = A(m, il.value, E), il !== null && (o = n(il, o, $), nl === null ? X = il : nl.sibling = il, nl = il);
        return al && Yt(m, $), X;
      }
      for (G = e(G); !il.done; $++, il = y.next())
        il = g(G, m, $, il.value, E), il !== null && (l && il.alternate !== null && G.delete(il.key === null ? $ : il.key), o = n(il, o, $), nl === null ? X = il : nl.sibling = il, nl = il);
      return l && G.forEach(function(fh) {
        return t(m, fh);
      }), al && Yt(m, $), X;
    }
    function Sl(m, o, y, E) {
      if (typeof y == "object" && y !== null && y.type === W && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case pl:
            l: {
              for (var X = y.key; o !== null; ) {
                if (o.key === X) {
                  if (X = y.type, X === W) {
                    if (o.tag === 7) {
                      a(
                        m,
                        o.sibling
                      ), E = u(
                        o,
                        y.props.children
                      ), E.return = m, m = E;
                      break l;
                    }
                  } else if (o.elementType === X || typeof X == "object" && X !== null && X.$$typeof === Gl && xa(X) === o.type) {
                    a(
                      m,
                      o.sibling
                    ), E = u(o, y.props), Je(E, y), E.return = m, m = E;
                    break l;
                  }
                  a(m, o);
                  break;
                } else t(m, o);
                o = o.sibling;
              }
              y.type === W ? (E = Ua(
                y.props.children,
                m.mode,
                E,
                y.key
              ), E.return = m, m = E) : (E = Zu(
                y.type,
                y.key,
                y.props,
                null,
                m.mode,
                E
              ), Je(E, y), E.return = m, m = E);
            }
            return i(m);
          case ml:
            l: {
              for (X = y.key; o !== null; ) {
                if (o.key === X)
                  if (o.tag === 4 && o.stateNode.containerInfo === y.containerInfo && o.stateNode.implementation === y.implementation) {
                    a(
                      m,
                      o.sibling
                    ), E = u(o, y.children || []), E.return = m, m = E;
                    break l;
                  } else {
                    a(m, o);
                    break;
                  }
                else t(m, o);
                o = o.sibling;
              }
              E = zi(y, m.mode, E), E.return = m, m = E;
            }
            return i(m);
          case Gl:
            return y = xa(y), Sl(
              m,
              o,
              y,
              E
            );
        }
        if (Xl(y))
          return B(
            m,
            o,
            y,
            E
          );
        if (ul(y)) {
          if (X = ul(y), typeof X != "function") throw Error(s(150));
          return y = X.call(y), Q(
            m,
            o,
            y,
            E
          );
        }
        if (typeof y.then == "function")
          return Sl(
            m,
            o,
            Wu(y),
            E
          );
        if (y.$$typeof === cl)
          return Sl(
            m,
            o,
            Ku(m, y),
            E
          );
        ku(m, y);
      }
      return typeof y == "string" && y !== "" || typeof y == "number" || typeof y == "bigint" ? (y = "" + y, o !== null && o.tag === 6 ? (a(m, o.sibling), E = u(o, y), E.return = m, m = E) : (a(m, o), E = Ei(y, m.mode, E), E.return = m, m = E), i(m)) : a(m, o);
    }
    return function(m, o, y, E) {
      try {
        Ke = 0;
        var X = Sl(
          m,
          o,
          y,
          E
        );
        return se = null, X;
      } catch (G) {
        if (G === fe || G === wu) throw G;
        var nl = ot(29, G, null, m.mode);
        return nl.lanes = E, nl.return = m, nl;
      } finally {
      }
    };
  }
  var qa = Ns(!0), Us = Ns(!1), na = !1;
  function xi(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bi(l, t) {
    l = l.updateQueue, t.updateQueue === l && (t.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function ia(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function ca(l, t, a) {
    var e = l.updateQueue;
    if (e === null) return null;
    if (e = e.shared, (sl & 2) !== 0) {
      var u = e.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), e.pending = t, t = Qu(l), ms(l, null, a), t;
    }
    return Xu(l, e, t, a), Qu(l);
  }
  function we(l, t, a) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, Tf(l, a);
    }
  }
  function qi(l, t) {
    var a = l.updateQueue, e = l.alternate;
    if (e !== null && (e = e.updateQueue, a === e)) {
      var u = null, n = null;
      if (a = a.firstBaseUpdate, a !== null) {
        do {
          var i = {
            lane: a.lane,
            tag: a.tag,
            payload: a.payload,
            callback: null,
            next: null
          };
          n === null ? u = n = i : n = n.next = i, a = a.next;
        } while (a !== null);
        n === null ? u = n = t : n = n.next = t;
      } else u = n = t;
      a = {
        baseState: e.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: n,
        shared: e.shared,
        callbacks: e.callbacks
      }, l.updateQueue = a;
      return;
    }
    l = a.lastBaseUpdate, l === null ? a.firstBaseUpdate = t : l.next = t, a.lastBaseUpdate = t;
  }
  var Yi = !1;
  function $e() {
    if (Yi) {
      var l = ce;
      if (l !== null) throw l;
    }
  }
  function We(l, t, a, e) {
    Yi = !1;
    var u = l.updateQueue;
    na = !1;
    var n = u.firstBaseUpdate, i = u.lastBaseUpdate, c = u.shared.pending;
    if (c !== null) {
      u.shared.pending = null;
      var f = c, h = f.next;
      f.next = null, i === null ? n = h : i.next = h, i = f;
      var p = l.alternate;
      p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== i && (c === null ? p.firstBaseUpdate = h : c.next = h, p.lastBaseUpdate = f));
    }
    if (n !== null) {
      var A = u.baseState;
      i = 0, p = h = f = null, c = n;
      do {
        var v = c.lane & -536870913, g = v !== c.lane;
        if (g ? (P & v) === v : (e & v) === v) {
          v !== 0 && v === ie && (Yi = !0), p !== null && (p = p.next = {
            lane: 0,
            tag: c.tag,
            payload: c.payload,
            callback: null,
            next: null
          });
          l: {
            var B = l, Q = c;
            v = t;
            var Sl = a;
            switch (Q.tag) {
              case 1:
                if (B = Q.payload, typeof B == "function") {
                  A = B.call(Sl, A, v);
                  break l;
                }
                A = B;
                break l;
              case 3:
                B.flags = B.flags & -65537 | 128;
              case 0:
                if (B = Q.payload, v = typeof B == "function" ? B.call(Sl, A, v) : B, v == null) break l;
                A = j({}, A, v);
                break l;
              case 2:
                na = !0;
            }
          }
          v = c.callback, v !== null && (l.flags |= 64, g && (l.flags |= 8192), g = u.callbacks, g === null ? u.callbacks = [v] : g.push(v));
        } else
          g = {
            lane: v,
            tag: c.tag,
            payload: c.payload,
            callback: c.callback,
            next: null
          }, p === null ? (h = p = g, f = A) : p = p.next = g, i |= v;
        if (c = c.next, c === null) {
          if (c = u.shared.pending, c === null)
            break;
          g = c, c = g.next, g.next = null, u.lastBaseUpdate = g, u.shared.pending = null;
        }
      } while (!0);
      p === null && (f = A), u.baseState = f, u.firstBaseUpdate = h, u.lastBaseUpdate = p, n === null && (u.shared.lanes = 0), ra |= i, l.lanes = i, l.memoizedState = A;
    }
  }
  function Cs(l, t) {
    if (typeof l != "function")
      throw Error(s(191, l));
    l.call(t);
  }
  function js(l, t) {
    var a = l.callbacks;
    if (a !== null)
      for (l.callbacks = null, l = 0; l < a.length; l++)
        Cs(a[l], t);
  }
  var oe = r(null), Fu = r(0);
  function Rs(l, t) {
    l = Wt, H(Fu, l), H(oe, t), Wt = l | t.baseLanes;
  }
  function Gi() {
    H(Fu, Wt), H(oe, oe.current);
  }
  function Xi() {
    Wt = Fu.current, _(oe), _(Fu);
  }
  var dt = r(null), zt = null;
  function fa(l) {
    var t = l.alternate;
    H(Ul, Ul.current & 1), H(dt, l), zt === null && (t === null || oe.current !== null || t.memoizedState !== null) && (zt = l);
  }
  function Qi(l) {
    H(Ul, Ul.current), H(dt, l), zt === null && (zt = l);
  }
  function Hs(l) {
    l.tag === 22 ? (H(Ul, Ul.current), H(dt, l), zt === null && (zt = l)) : sa();
  }
  function sa() {
    H(Ul, Ul.current), H(dt, dt.current);
  }
  function rt(l) {
    _(dt), zt === l && (zt = null), _(Ul);
  }
  var Ul = r(0);
  function Iu(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var a = t.memoizedState;
        if (a !== null && (a = a.dehydrated, a === null || wc(a) || $c(a)))
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
  var Qt = 0, J = null, vl = null, Rl = null, Pu = !1, de = !1, Ya = !1, ln = 0, ke = 0, re = null, Im = 0;
  function Ol() {
    throw Error(s(321));
  }
  function Zi(l, t) {
    if (t === null) return !1;
    for (var a = 0; a < t.length && a < l.length; a++)
      if (!st(l[a], t[a])) return !1;
    return !0;
  }
  function Li(l, t, a, e, u, n) {
    return Qt = n, J = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, b.H = l === null || l.memoizedState === null ? So : uc, Ya = !1, n = a(e, u), Ya = !1, de && (n = Bs(
      t,
      a,
      e,
      u
    )), xs(l), n;
  }
  function xs(l) {
    b.H = Pe;
    var t = vl !== null && vl.next !== null;
    if (Qt = 0, Rl = vl = J = null, Pu = !1, ke = 0, re = null, t) throw Error(s(300));
    l === null || Hl || (l = l.dependencies, l !== null && Vu(l) && (Hl = !0));
  }
  function Bs(l, t, a, e) {
    J = l;
    var u = 0;
    do {
      if (de && (re = null), ke = 0, de = !1, 25 <= u) throw Error(s(301));
      if (u += 1, Rl = vl = null, l.updateQueue != null) {
        var n = l.updateQueue;
        n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
      }
      b.H = po, n = t(a, e);
    } while (de);
    return n;
  }
  function Pm() {
    var l = b.H, t = l.useState()[0];
    return t = typeof t.then == "function" ? Fe(t) : t, l = l.useState()[0], (vl !== null ? vl.memoizedState : null) !== l && (J.flags |= 1024), t;
  }
  function Vi() {
    var l = ln !== 0;
    return ln = 0, l;
  }
  function Ki(l, t, a) {
    t.updateQueue = l.updateQueue, t.flags &= -2053, l.lanes &= ~a;
  }
  function Ji(l) {
    if (Pu) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        t !== null && (t.pending = null), l = l.next;
      }
      Pu = !1;
    }
    Qt = 0, Rl = vl = J = null, de = !1, ke = ln = 0, re = null;
  }
  function Fl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Rl === null ? J.memoizedState = Rl = l : Rl = Rl.next = l, Rl;
  }
  function Cl() {
    if (vl === null) {
      var l = J.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = vl.next;
    var t = Rl === null ? J.memoizedState : Rl.next;
    if (t !== null)
      Rl = t, vl = l;
    else {
      if (l === null)
        throw J.alternate === null ? Error(s(467)) : Error(s(310));
      vl = l, l = {
        memoizedState: vl.memoizedState,
        baseState: vl.baseState,
        baseQueue: vl.baseQueue,
        queue: vl.queue,
        next: null
      }, Rl === null ? J.memoizedState = Rl = l : Rl = Rl.next = l;
    }
    return Rl;
  }
  function tn() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Fe(l) {
    var t = ke;
    return ke += 1, re === null && (re = []), l = Os(re, l, t), t = J, (Rl === null ? t.memoizedState : Rl.next) === null && (t = t.alternate, b.H = t === null || t.memoizedState === null ? So : uc), l;
  }
  function an(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Fe(l);
      if (l.$$typeof === cl) return Kl(l);
    }
    throw Error(s(438, String(l)));
  }
  function wi(l) {
    var t = null, a = J.updateQueue;
    if (a !== null && (t = a.memoCache), t == null) {
      var e = J.alternate;
      e !== null && (e = e.updateQueue, e !== null && (e = e.memoCache, e != null && (t = {
        data: e.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), a === null && (a = tn(), J.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0)
      for (a = t.data[t.index] = Array(l), e = 0; e < l; e++)
        a[e] = C;
    return t.index++, a;
  }
  function Zt(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function en(l) {
    var t = Cl();
    return $i(t, vl, l);
  }
  function $i(l, t, a) {
    var e = l.queue;
    if (e === null) throw Error(s(311));
    e.lastRenderedReducer = a;
    var u = l.baseQueue, n = e.pending;
    if (n !== null) {
      if (u !== null) {
        var i = u.next;
        u.next = n.next, n.next = i;
      }
      t.baseQueue = u = n, e.pending = null;
    }
    if (n = l.baseState, u === null) l.memoizedState = n;
    else {
      t = u.next;
      var c = i = null, f = null, h = t, p = !1;
      do {
        var A = h.lane & -536870913;
        if (A !== h.lane ? (P & A) === A : (Qt & A) === A) {
          var v = h.revertLane;
          if (v === 0)
            f !== null && (f = f.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }), A === ie && (p = !0);
          else if ((Qt & v) === v) {
            h = h.next, v === ie && (p = !0);
            continue;
          } else
            A = {
              lane: 0,
              revertLane: h.revertLane,
              gesture: null,
              action: h.action,
              hasEagerState: h.hasEagerState,
              eagerState: h.eagerState,
              next: null
            }, f === null ? (c = f = A, i = n) : f = f.next = A, J.lanes |= v, ra |= v;
          A = h.action, Ya && a(n, A), n = h.hasEagerState ? h.eagerState : a(n, A);
        } else
          v = {
            lane: A,
            revertLane: h.revertLane,
            gesture: h.gesture,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, f === null ? (c = f = v, i = n) : f = f.next = v, J.lanes |= A, ra |= A;
        h = h.next;
      } while (h !== null && h !== t);
      if (f === null ? i = n : f.next = c, !st(n, l.memoizedState) && (Hl = !0, p && (a = ce, a !== null)))
        throw a;
      l.memoizedState = n, l.baseState = i, l.baseQueue = f, e.lastRenderedState = n;
    }
    return u === null && (e.lanes = 0), [l.memoizedState, e.dispatch];
  }
  function Wi(l) {
    var t = Cl(), a = t.queue;
    if (a === null) throw Error(s(311));
    a.lastRenderedReducer = l;
    var e = a.dispatch, u = a.pending, n = t.memoizedState;
    if (u !== null) {
      a.pending = null;
      var i = u = u.next;
      do
        n = l(n, i.action), i = i.next;
      while (i !== u);
      st(n, t.memoizedState) || (Hl = !0), t.memoizedState = n, t.baseQueue === null && (t.baseState = n), a.lastRenderedState = n;
    }
    return [n, e];
  }
  function qs(l, t, a) {
    var e = J, u = Cl(), n = al;
    if (n) {
      if (a === void 0) throw Error(s(407));
      a = a();
    } else a = t();
    var i = !st(
      (vl || u).memoizedState,
      a
    );
    if (i && (u.memoizedState = a, Hl = !0), u = u.queue, Ii(Xs.bind(null, e, u, l), [
      l
    ]), u.getSnapshot !== t || i || Rl !== null && Rl.memoizedState.tag & 1) {
      if (e.flags |= 2048, me(
        9,
        { destroy: void 0 },
        Gs.bind(
          null,
          e,
          u,
          a,
          t
        ),
        null
      ), Tl === null) throw Error(s(349));
      n || (Qt & 127) !== 0 || Ys(e, t, a);
    }
    return a;
  }
  function Ys(l, t, a) {
    l.flags |= 16384, l = { getSnapshot: t, value: a }, t = J.updateQueue, t === null ? (t = tn(), J.updateQueue = t, t.stores = [l]) : (a = t.stores, a === null ? t.stores = [l] : a.push(l));
  }
  function Gs(l, t, a, e) {
    t.value = a, t.getSnapshot = e, Qs(t) && Zs(l);
  }
  function Xs(l, t, a) {
    return a(function() {
      Qs(t) && Zs(l);
    });
  }
  function Qs(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var a = t();
      return !st(l, a);
    } catch {
      return !0;
    }
  }
  function Zs(l) {
    var t = Na(l, 2);
    t !== null && nt(t, l, 2);
  }
  function ki(l) {
    var t = Fl();
    if (typeof l == "function") {
      var a = l;
      if (l = a(), Ya) {
        It(!0);
        try {
          a();
        } finally {
          It(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = l, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zt,
      lastRenderedState: l
    }, t;
  }
  function Ls(l, t, a, e) {
    return l.baseState = a, $i(
      l,
      vl,
      typeof e == "function" ? e : Zt
    );
  }
  function ly(l, t, a, e, u) {
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
      b.T !== null ? a(!0) : n.isTransition = !1, e(n), a = t.pending, a === null ? (n.next = t.pending = n, Vs(t, n)) : (n.next = a.next, t.pending = a.next = n);
    }
  }
  function Vs(l, t) {
    var a = t.action, e = t.payload, u = l.state;
    if (t.isTransition) {
      var n = b.T, i = {};
      b.T = i;
      try {
        var c = a(u, e), f = b.S;
        f !== null && f(i, c), Ks(l, t, c);
      } catch (h) {
        Fi(l, t, h);
      } finally {
        n !== null && i.types !== null && (n.types = i.types), b.T = n;
      }
    } else
      try {
        n = a(u, e), Ks(l, t, n);
      } catch (h) {
        Fi(l, t, h);
      }
  }
  function Ks(l, t, a) {
    a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(
      function(e) {
        Js(l, t, e);
      },
      function(e) {
        return Fi(l, t, e);
      }
    ) : Js(l, t, a);
  }
  function Js(l, t, a) {
    t.status = "fulfilled", t.value = a, ws(t), l.state = a, t = l.pending, t !== null && (a = t.next, a === t ? l.pending = null : (a = a.next, t.next = a, Vs(l, a)));
  }
  function Fi(l, t, a) {
    var e = l.pending;
    if (l.pending = null, e !== null) {
      e = e.next;
      do
        t.status = "rejected", t.reason = a, ws(t), t = t.next;
      while (t !== e);
    }
    l.action = null;
  }
  function ws(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function $s(l, t) {
    return t;
  }
  function Ws(l, t) {
    if (al) {
      var a = Tl.formState;
      if (a !== null) {
        l: {
          var e = J;
          if (al) {
            if (zl) {
              t: {
                for (var u = zl, n = Et; u.nodeType !== 8; ) {
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
                zl = At(
                  u.nextSibling
                ), e = u.data === "F!";
                break l;
              }
            }
            ea(e);
          }
          e = !1;
        }
        e && (t = a[0]);
      }
    }
    return a = Fl(), a.memoizedState = a.baseState = t, e = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: $s,
      lastRenderedState: t
    }, a.queue = e, a = ho.bind(
      null,
      J,
      e
    ), e.dispatch = a, e = ki(!1), n = ec.bind(
      null,
      J,
      !1,
      e.queue
    ), e = Fl(), u = {
      state: t,
      dispatch: null,
      action: l,
      pending: null
    }, e.queue = u, a = ly.bind(
      null,
      J,
      u,
      n,
      a
    ), u.dispatch = a, e.memoizedState = l, [t, a, !1];
  }
  function ks(l) {
    var t = Cl();
    return Fs(t, vl, l);
  }
  function Fs(l, t, a) {
    if (t = $i(
      l,
      t,
      $s
    )[0], l = en(Zt)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var e = Fe(t);
      } catch (i) {
        throw i === fe ? wu : i;
      }
    else e = t;
    t = Cl();
    var u = t.queue, n = u.dispatch;
    return a !== t.memoizedState && (J.flags |= 2048, me(
      9,
      { destroy: void 0 },
      ty.bind(null, u, a),
      null
    )), [e, n, l];
  }
  function ty(l, t) {
    l.action = t;
  }
  function Is(l) {
    var t = Cl(), a = vl;
    if (a !== null)
      return Fs(t, a, l);
    Cl(), t = t.memoizedState, a = Cl();
    var e = a.queue.dispatch;
    return a.memoizedState = l, [t, e, !1];
  }
  function me(l, t, a, e) {
    return l = { tag: l, create: a, deps: e, inst: t, next: null }, t = J.updateQueue, t === null && (t = tn(), J.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = l.next = l : (e = a.next, a.next = l, l.next = e, t.lastEffect = l), l;
  }
  function Ps() {
    return Cl().memoizedState;
  }
  function un(l, t, a, e) {
    var u = Fl();
    J.flags |= l, u.memoizedState = me(
      1 | t,
      { destroy: void 0 },
      a,
      e === void 0 ? null : e
    );
  }
  function nn(l, t, a, e) {
    var u = Cl();
    e = e === void 0 ? null : e;
    var n = u.memoizedState.inst;
    vl !== null && e !== null && Zi(e, vl.memoizedState.deps) ? u.memoizedState = me(t, n, a, e) : (J.flags |= l, u.memoizedState = me(
      1 | t,
      n,
      a,
      e
    ));
  }
  function lo(l, t) {
    un(8390656, 8, l, t);
  }
  function Ii(l, t) {
    nn(2048, 8, l, t);
  }
  function ay(l) {
    J.flags |= 4;
    var t = J.updateQueue;
    if (t === null)
      t = tn(), J.updateQueue = t, t.events = [l];
    else {
      var a = t.events;
      a === null ? t.events = [l] : a.push(l);
    }
  }
  function to(l) {
    var t = Cl().memoizedState;
    return ay({ ref: t, nextImpl: l }), function() {
      if ((sl & 2) !== 0) throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function ao(l, t) {
    return nn(4, 2, l, t);
  }
  function eo(l, t) {
    return nn(4, 4, l, t);
  }
  function uo(l, t) {
    if (typeof t == "function") {
      l = l();
      var a = t(l);
      return function() {
        typeof a == "function" ? a() : t(null);
      };
    }
    if (t != null)
      return l = l(), t.current = l, function() {
        t.current = null;
      };
  }
  function no(l, t, a) {
    a = a != null ? a.concat([l]) : null, nn(4, 4, uo.bind(null, t, l), a);
  }
  function Pi() {
  }
  function io(l, t) {
    var a = Cl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    return t !== null && Zi(t, e[1]) ? e[0] : (a.memoizedState = [l, t], l);
  }
  function co(l, t) {
    var a = Cl();
    t = t === void 0 ? null : t;
    var e = a.memoizedState;
    if (t !== null && Zi(t, e[1]))
      return e[0];
    if (e = l(), Ya) {
      It(!0);
      try {
        l();
      } finally {
        It(!1);
      }
    }
    return a.memoizedState = [e, t], e;
  }
  function lc(l, t, a) {
    return a === void 0 || (Qt & 1073741824) !== 0 && (P & 261930) === 0 ? l.memoizedState = t : (l.memoizedState = a, l = sd(), J.lanes |= l, ra |= l, a);
  }
  function fo(l, t, a, e) {
    return st(a, t) ? a : oe.current !== null ? (l = lc(l, a, e), st(l, t) || (Hl = !0), l) : (Qt & 42) === 0 || (Qt & 1073741824) !== 0 && (P & 261930) === 0 ? (Hl = !0, l.memoizedState = a) : (l = sd(), J.lanes |= l, ra |= l, t);
  }
  function so(l, t, a, e, u) {
    var n = R.p;
    R.p = n !== 0 && 8 > n ? n : 8;
    var i = b.T, c = {};
    b.T = c, ec(l, !1, t, a);
    try {
      var f = u(), h = b.S;
      if (h !== null && h(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
        var p = Fm(
          f,
          e
        );
        Ie(
          l,
          t,
          p,
          ht(l)
        );
      } else
        Ie(
          l,
          t,
          e,
          ht(l)
        );
    } catch (A) {
      Ie(
        l,
        t,
        { then: function() {
        }, status: "rejected", reason: A },
        ht()
      );
    } finally {
      R.p = n, i !== null && c.types !== null && (i.types = c.types), b.T = i;
    }
  }
  function ey() {
  }
  function tc(l, t, a, e) {
    if (l.tag !== 5) throw Error(s(476));
    var u = oo(l).queue;
    so(
      l,
      u,
      t,
      Z,
      a === null ? ey : function() {
        return ro(l), a(e);
      }
    );
  }
  function oo(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: Z
      },
      next: null
    };
    var a = {};
    return t.next = {
      memoizedState: a,
      baseState: a,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Zt,
        lastRenderedState: a
      },
      next: null
    }, l.memoizedState = t, l = l.alternate, l !== null && (l.memoizedState = t), t;
  }
  function ro(l) {
    var t = oo(l);
    t.next === null && (t = l.alternate.memoizedState), Ie(
      l,
      t.next.queue,
      {},
      ht()
    );
  }
  function ac() {
    return Kl(hu);
  }
  function mo() {
    return Cl().memoizedState;
  }
  function yo() {
    return Cl().memoizedState;
  }
  function uy(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var a = ht();
          l = ia(a);
          var e = ca(t, l, a);
          e !== null && (nt(e, t, a), we(e, t, a)), t = { cache: Ci() }, l.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function ny(l, t, a) {
    var e = ht();
    a = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l) ? vo(t, a) : (a = bi(l, t, a, e), a !== null && (nt(a, l, e), go(a, t, e)));
  }
  function ho(l, t, a) {
    var e = ht();
    Ie(l, t, a, e);
  }
  function Ie(l, t, a, e) {
    var u = {
      lane: e,
      revertLane: 0,
      gesture: null,
      action: a,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (cn(l)) vo(t, u);
    else {
      var n = l.alternate;
      if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = t.lastRenderedReducer, n !== null))
        try {
          var i = t.lastRenderedState, c = n(i, a);
          if (u.hasEagerState = !0, u.eagerState = c, st(c, i))
            return Xu(l, t, u, 0), Tl === null && Gu(), !1;
        } catch {
        } finally {
        }
      if (a = bi(l, t, u, e), a !== null)
        return nt(a, l, e), go(a, t, e), !0;
    }
    return !1;
  }
  function ec(l, t, a, e) {
    if (e = {
      lane: 2,
      revertLane: xc(),
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, cn(l)) {
      if (t) throw Error(s(479));
    } else
      t = bi(
        l,
        a,
        e,
        2
      ), t !== null && nt(t, l, 2);
  }
  function cn(l) {
    var t = l.alternate;
    return l === J || t !== null && t === J;
  }
  function vo(l, t) {
    de = Pu = !0;
    var a = l.pending;
    a === null ? t.next = t : (t.next = a.next, a.next = t), l.pending = t;
  }
  function go(l, t, a) {
    if ((a & 4194048) !== 0) {
      var e = t.lanes;
      e &= l.pendingLanes, a |= e, t.lanes = a, Tf(l, a);
    }
  }
  var Pe = {
    readContext: Kl,
    use: an,
    useCallback: Ol,
    useContext: Ol,
    useEffect: Ol,
    useImperativeHandle: Ol,
    useLayoutEffect: Ol,
    useInsertionEffect: Ol,
    useMemo: Ol,
    useReducer: Ol,
    useRef: Ol,
    useState: Ol,
    useDebugValue: Ol,
    useDeferredValue: Ol,
    useTransition: Ol,
    useSyncExternalStore: Ol,
    useId: Ol,
    useHostTransitionStatus: Ol,
    useFormState: Ol,
    useActionState: Ol,
    useOptimistic: Ol,
    useMemoCache: Ol,
    useCacheRefresh: Ol
  };
  Pe.useEffectEvent = Ol;
  var So = {
    readContext: Kl,
    use: an,
    useCallback: function(l, t) {
      return Fl().memoizedState = [
        l,
        t === void 0 ? null : t
      ], l;
    },
    useContext: Kl,
    useEffect: lo,
    useImperativeHandle: function(l, t, a) {
      a = a != null ? a.concat([l]) : null, un(
        4194308,
        4,
        uo.bind(null, t, l),
        a
      );
    },
    useLayoutEffect: function(l, t) {
      return un(4194308, 4, l, t);
    },
    useInsertionEffect: function(l, t) {
      un(4, 2, l, t);
    },
    useMemo: function(l, t) {
      var a = Fl();
      t = t === void 0 ? null : t;
      var e = l();
      if (Ya) {
        It(!0);
        try {
          l();
        } finally {
          It(!1);
        }
      }
      return a.memoizedState = [e, t], e;
    },
    useReducer: function(l, t, a) {
      var e = Fl();
      if (a !== void 0) {
        var u = a(t);
        if (Ya) {
          It(!0);
          try {
            a(t);
          } finally {
            It(!1);
          }
        }
      } else u = t;
      return e.memoizedState = e.baseState = u, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: u
      }, e.queue = l, l = l.dispatch = ny.bind(
        null,
        J,
        l
      ), [e.memoizedState, l];
    },
    useRef: function(l) {
      var t = Fl();
      return l = { current: l }, t.memoizedState = l;
    },
    useState: function(l) {
      l = ki(l);
      var t = l.queue, a = ho.bind(null, J, t);
      return t.dispatch = a, [l.memoizedState, a];
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var a = Fl();
      return lc(a, l, t);
    },
    useTransition: function() {
      var l = ki(!1);
      return l = so.bind(
        null,
        J,
        l.queue,
        !0,
        !1
      ), Fl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, t, a) {
      var e = J, u = Fl();
      if (al) {
        if (a === void 0)
          throw Error(s(407));
        a = a();
      } else {
        if (a = t(), Tl === null)
          throw Error(s(349));
        (P & 127) !== 0 || Ys(e, t, a);
      }
      u.memoizedState = a;
      var n = { value: a, getSnapshot: t };
      return u.queue = n, lo(Xs.bind(null, e, n, l), [
        l
      ]), e.flags |= 2048, me(
        9,
        { destroy: void 0 },
        Gs.bind(
          null,
          e,
          n,
          a,
          t
        ),
        null
      ), a;
    },
    useId: function() {
      var l = Fl(), t = Tl.identifierPrefix;
      if (al) {
        var a = Ct, e = Ut;
        a = (e & ~(1 << 32 - ft(e) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a = ln++, 0 < a && (t += "H" + a.toString(32)), t += "_";
      } else
        a = Im++, t = "_" + t + "r_" + a.toString(32) + "_";
      return l.memoizedState = t;
    },
    useHostTransitionStatus: ac,
    useFormState: Ws,
    useActionState: Ws,
    useOptimistic: function(l) {
      var t = Fl();
      t.memoizedState = t.baseState = l;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = ec.bind(
        null,
        J,
        !0,
        a
      ), a.dispatch = t, [l, t];
    },
    useMemoCache: wi,
    useCacheRefresh: function() {
      return Fl().memoizedState = uy.bind(
        null,
        J
      );
    },
    useEffectEvent: function(l) {
      var t = Fl(), a = { impl: l };
      return t.memoizedState = a, function() {
        if ((sl & 2) !== 0)
          throw Error(s(440));
        return a.impl.apply(void 0, arguments);
      };
    }
  }, uc = {
    readContext: Kl,
    use: an,
    useCallback: io,
    useContext: Kl,
    useEffect: Ii,
    useImperativeHandle: no,
    useInsertionEffect: ao,
    useLayoutEffect: eo,
    useMemo: co,
    useReducer: en,
    useRef: Ps,
    useState: function() {
      return en(Zt);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var a = Cl();
      return fo(
        a,
        vl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = en(Zt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Fe(l),
        t
      ];
    },
    useSyncExternalStore: qs,
    useId: mo,
    useHostTransitionStatus: ac,
    useFormState: ks,
    useActionState: ks,
    useOptimistic: function(l, t) {
      var a = Cl();
      return Ls(a, vl, l, t);
    },
    useMemoCache: wi,
    useCacheRefresh: yo
  };
  uc.useEffectEvent = to;
  var po = {
    readContext: Kl,
    use: an,
    useCallback: io,
    useContext: Kl,
    useEffect: Ii,
    useImperativeHandle: no,
    useInsertionEffect: ao,
    useLayoutEffect: eo,
    useMemo: co,
    useReducer: Wi,
    useRef: Ps,
    useState: function() {
      return Wi(Zt);
    },
    useDebugValue: Pi,
    useDeferredValue: function(l, t) {
      var a = Cl();
      return vl === null ? lc(a, l, t) : fo(
        a,
        vl.memoizedState,
        l,
        t
      );
    },
    useTransition: function() {
      var l = Wi(Zt)[0], t = Cl().memoizedState;
      return [
        typeof l == "boolean" ? l : Fe(l),
        t
      ];
    },
    useSyncExternalStore: qs,
    useId: mo,
    useHostTransitionStatus: ac,
    useFormState: Is,
    useActionState: Is,
    useOptimistic: function(l, t) {
      var a = Cl();
      return vl !== null ? Ls(a, vl, l, t) : (a.baseState = l, [l, a.queue.dispatch]);
    },
    useMemoCache: wi,
    useCacheRefresh: yo
  };
  po.useEffectEvent = to;
  function nc(l, t, a, e) {
    t = l.memoizedState, a = a(e, t), a = a == null ? t : j({}, t, a), l.memoizedState = a, l.lanes === 0 && (l.updateQueue.baseState = a);
  }
  var ic = {
    enqueueSetState: function(l, t, a) {
      l = l._reactInternals;
      var e = ht(), u = ia(e);
      u.payload = t, a != null && (u.callback = a), t = ca(l, u, e), t !== null && (nt(t, l, e), we(t, l, e));
    },
    enqueueReplaceState: function(l, t, a) {
      l = l._reactInternals;
      var e = ht(), u = ia(e);
      u.tag = 1, u.payload = t, a != null && (u.callback = a), t = ca(l, u, e), t !== null && (nt(t, l, e), we(t, l, e));
    },
    enqueueForceUpdate: function(l, t) {
      l = l._reactInternals;
      var a = ht(), e = ia(a);
      e.tag = 2, t != null && (e.callback = t), t = ca(l, e, a), t !== null && (nt(t, l, a), we(t, l, a));
    }
  };
  function bo(l, t, a, e, u, n, i) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(e, n, i) : t.prototype && t.prototype.isPureReactComponent ? !Ge(a, e) || !Ge(u, n) : !0;
  }
  function To(l, t, a, e) {
    l = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, e), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, e), t.state !== l && ic.enqueueReplaceState(t, t.state, null);
  }
  function Ga(l, t) {
    var a = t;
    if ("ref" in t) {
      a = {};
      for (var e in t)
        e !== "ref" && (a[e] = t[e]);
    }
    if (l = l.defaultProps) {
      a === t && (a = j({}, a));
      for (var u in l)
        a[u] === void 0 && (a[u] = l[u]);
    }
    return a;
  }
  function Eo(l) {
    Yu(l);
  }
  function zo(l) {
    console.error(l);
  }
  function Ao(l) {
    Yu(l);
  }
  function fn(l, t) {
    try {
      var a = l.onUncaughtError;
      a(t.value, { componentStack: t.stack });
    } catch (e) {
      setTimeout(function() {
        throw e;
      });
    }
  }
  function _o(l, t, a) {
    try {
      var e = l.onCaughtError;
      e(a.value, {
        componentStack: a.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function cc(l, t, a) {
    return a = ia(a), a.tag = 3, a.payload = { element: null }, a.callback = function() {
      fn(l, t);
    }, a;
  }
  function Oo(l) {
    return l = ia(l), l.tag = 3, l;
  }
  function Mo(l, t, a, e) {
    var u = a.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var n = e.value;
      l.payload = function() {
        return u(n);
      }, l.callback = function() {
        _o(t, a, e);
      };
    }
    var i = a.stateNode;
    i !== null && typeof i.componentDidCatch == "function" && (l.callback = function() {
      _o(t, a, e), typeof u != "function" && (ma === null ? ma = /* @__PURE__ */ new Set([this]) : ma.add(this));
      var c = e.stack;
      this.componentDidCatch(e.value, {
        componentStack: c !== null ? c : ""
      });
    });
  }
  function iy(l, t, a, e, u) {
    if (a.flags |= 32768, e !== null && typeof e == "object" && typeof e.then == "function") {
      if (t = a.alternate, t !== null && ne(
        t,
        a,
        u,
        !0
      ), a = dt.current, a !== null) {
        switch (a.tag) {
          case 31:
          case 13:
            return zt === null ? bn() : a.alternate === null && Ml === 0 && (Ml = 3), a.flags &= -257, a.flags |= 65536, a.lanes = u, e === $u ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([e]) : t.add(e), jc(l, e, u)), !1;
          case 22:
            return a.flags |= 65536, e === $u ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([e])
            }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([e]) : a.add(e)), jc(l, e, u)), !1;
        }
        throw Error(s(435, a.tag));
      }
      return jc(l, e, u), bn(), !1;
    }
    if (al)
      return t = dt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, e !== Oi && (l = Error(s(422), { cause: e }), Ze(pt(l, a)))) : (e !== Oi && (t = Error(s(423), {
        cause: e
      }), Ze(
        pt(t, a)
      )), l = l.current.alternate, l.flags |= 65536, u &= -u, l.lanes |= u, e = pt(e, a), u = cc(
        l.stateNode,
        e,
        u
      ), qi(l, u), Ml !== 4 && (Ml = 2)), !1;
    var n = Error(s(520), { cause: e });
    if (n = pt(n, a), cu === null ? cu = [n] : cu.push(n), Ml !== 4 && (Ml = 2), t === null) return !0;
    e = pt(e, a), a = t;
    do {
      switch (a.tag) {
        case 3:
          return a.flags |= 65536, l = u & -u, a.lanes |= l, l = cc(a.stateNode, e, l), qi(a, l), !1;
        case 1:
          if (t = a.type, n = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (ma === null || !ma.has(n))))
            return a.flags |= 65536, u &= -u, a.lanes |= u, u = Oo(u), Mo(
              u,
              l,
              a,
              e
            ), qi(a, u), !1;
      }
      a = a.return;
    } while (a !== null);
    return !1;
  }
  var fc = Error(s(461)), Hl = !1;
  function Jl(l, t, a, e) {
    t.child = l === null ? Us(t, null, a, e) : qa(
      t,
      l.child,
      a,
      e
    );
  }
  function Do(l, t, a, e, u) {
    a = a.render;
    var n = t.ref;
    if ("ref" in e) {
      var i = {};
      for (var c in e)
        c !== "ref" && (i[c] = e[c]);
    } else i = e;
    return Ra(t), e = Li(
      l,
      t,
      a,
      i,
      n,
      u
    ), c = Vi(), l !== null && !Hl ? (Ki(l, t, u), Lt(l, t, u)) : (al && c && Ai(t), t.flags |= 1, Jl(l, t, e, u), t.child);
  }
  function No(l, t, a, e, u) {
    if (l === null) {
      var n = a.type;
      return typeof n == "function" && !Ti(n) && n.defaultProps === void 0 && a.compare === null ? (t.tag = 15, t.type = n, Uo(
        l,
        t,
        n,
        e,
        u
      )) : (l = Zu(
        a.type,
        null,
        e,
        t,
        t.mode,
        u
      ), l.ref = t.ref, l.return = t, t.child = l);
    }
    if (n = l.child, !vc(l, u)) {
      var i = n.memoizedProps;
      if (a = a.compare, a = a !== null ? a : Ge, a(i, e) && l.ref === t.ref)
        return Lt(l, t, u);
    }
    return t.flags |= 1, l = qt(n, e), l.ref = t.ref, l.return = t, t.child = l;
  }
  function Uo(l, t, a, e, u) {
    if (l !== null) {
      var n = l.memoizedProps;
      if (Ge(n, e) && l.ref === t.ref)
        if (Hl = !1, t.pendingProps = e = n, vc(l, u))
          (l.flags & 131072) !== 0 && (Hl = !0);
        else
          return t.lanes = l.lanes, Lt(l, t, u);
    }
    return sc(
      l,
      t,
      a,
      e,
      u
    );
  }
  function Co(l, t, a, e) {
    var u = e.children, n = l !== null ? l.memoizedState : null;
    if (l === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (n = n !== null ? n.baseLanes | a : a, l !== null) {
          for (e = t.child = l.child, u = 0; e !== null; )
            u = u | e.lanes | e.childLanes, e = e.sibling;
          e = u & ~n;
        } else e = 0, t.child = null;
        return jo(
          l,
          t,
          n,
          a,
          e
        );
      }
      if ((a & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ju(
          t,
          n !== null ? n.cachePool : null
        ), n !== null ? Rs(t, n) : Gi(), Hs(t);
      else
        return e = t.lanes = 536870912, jo(
          l,
          t,
          n !== null ? n.baseLanes | a : a,
          a,
          e
        );
    } else
      n !== null ? (Ju(t, n.cachePool), Rs(t, n), sa(), t.memoizedState = null) : (l !== null && Ju(t, null), Gi(), sa());
    return Jl(l, t, u, a), t.child;
  }
  function lu(l, t) {
    return l !== null && l.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function jo(l, t, a, e, u) {
    var n = Ri();
    return n = n === null ? null : { parent: jl._currentValue, pool: n }, t.memoizedState = {
      baseLanes: a,
      cachePool: n
    }, l !== null && Ju(t, null), Gi(), Hs(t), l !== null && ne(l, t, e, !0), t.childLanes = u, null;
  }
  function sn(l, t) {
    return t = dn(
      { mode: t.mode, children: t.children },
      l.mode
    ), t.ref = l.ref, l.child = t, t.return = l, t;
  }
  function Ro(l, t, a) {
    return qa(t, l.child, null, a), l = sn(t, t.pendingProps), l.flags |= 2, rt(t), t.memoizedState = null, l;
  }
  function cy(l, t, a) {
    var e = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, l === null) {
      if (al) {
        if (e.mode === "hidden")
          return l = sn(t, e), t.lanes = 536870912, lu(null, l);
        if (Qi(t), (l = zl) ? (l = Kd(
          l,
          Et
        ), l = l !== null && l.data === "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ta !== null ? { id: Ut, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = hs(l), a.return = t, t.child = a, Vl = t, zl = null)) : l = null, l === null) throw ea(t);
        return t.lanes = 536870912, null;
      }
      return sn(t, e);
    }
    var n = l.memoizedState;
    if (n !== null) {
      var i = n.dehydrated;
      if (Qi(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = Ro(
            l,
            t,
            a
          );
        else if (t.memoizedState !== null)
          t.child = l.child, t.flags |= 128, t = null;
        else throw Error(s(558));
      else if (Hl || ne(l, t, a, !1), u = (a & l.childLanes) !== 0, Hl || u) {
        if (e = Tl, e !== null && (i = Ef(e, a), i !== 0 && i !== n.retryLane))
          throw n.retryLane = i, Na(l, i), nt(e, l, i), fc;
        bn(), t = Ro(
          l,
          t,
          a
        );
      } else
        l = n.treeContext, zl = At(i.nextSibling), Vl = t, al = !0, aa = null, Et = !1, l !== null && Ss(t, l), t = sn(t, e), t.flags |= 4096;
      return t;
    }
    return l = qt(l.child, {
      mode: e.mode,
      children: e.children
    }), l.ref = t.ref, t.child = l, l.return = t, l;
  }
  function on(l, t) {
    var a = t.ref;
    if (a === null)
      l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof a != "function" && typeof a != "object")
        throw Error(s(284));
      (l === null || l.ref !== a) && (t.flags |= 4194816);
    }
  }
  function sc(l, t, a, e, u) {
    return Ra(t), a = Li(
      l,
      t,
      a,
      e,
      void 0,
      u
    ), e = Vi(), l !== null && !Hl ? (Ki(l, t, u), Lt(l, t, u)) : (al && e && Ai(t), t.flags |= 1, Jl(l, t, a, u), t.child);
  }
  function Ho(l, t, a, e, u, n) {
    return Ra(t), t.updateQueue = null, a = Bs(
      t,
      e,
      a,
      u
    ), xs(l), e = Vi(), l !== null && !Hl ? (Ki(l, t, n), Lt(l, t, n)) : (al && e && Ai(t), t.flags |= 1, Jl(l, t, a, n), t.child);
  }
  function xo(l, t, a, e, u) {
    if (Ra(t), t.stateNode === null) {
      var n = te, i = a.contextType;
      typeof i == "object" && i !== null && (n = Kl(i)), n = new a(e, n), t.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = ic, t.stateNode = n, n._reactInternals = t, n = t.stateNode, n.props = e, n.state = t.memoizedState, n.refs = {}, xi(t), i = a.contextType, n.context = typeof i == "object" && i !== null ? Kl(i) : te, n.state = t.memoizedState, i = a.getDerivedStateFromProps, typeof i == "function" && (nc(
        t,
        a,
        i,
        e
      ), n.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (i = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), i !== n.state && ic.enqueueReplaceState(n, n.state, null), We(t, e, n, u), $e(), n.state = t.memoizedState), typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !0;
    } else if (l === null) {
      n = t.stateNode;
      var c = t.memoizedProps, f = Ga(a, c);
      n.props = f;
      var h = n.context, p = a.contextType;
      i = te, typeof p == "object" && p !== null && (i = Kl(p));
      var A = a.getDerivedStateFromProps;
      p = typeof A == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, p || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== i) && To(
        t,
        n,
        e,
        i
      ), na = !1;
      var v = t.memoizedState;
      n.state = v, We(t, e, n, u), $e(), h = t.memoizedState, c || v !== h || na ? (typeof A == "function" && (nc(
        t,
        a,
        A,
        e
      ), h = t.memoizedState), (f = na || bo(
        t,
        a,
        f,
        e,
        v,
        h,
        i
      )) ? (p || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = e, t.memoizedState = h), n.props = e, n.state = h, n.context = i, e = f) : (typeof n.componentDidMount == "function" && (t.flags |= 4194308), e = !1);
    } else {
      n = t.stateNode, Bi(l, t), i = t.memoizedProps, p = Ga(a, i), n.props = p, A = t.pendingProps, v = n.context, h = a.contextType, f = te, typeof h == "object" && h !== null && (f = Kl(h)), c = a.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (i !== A || v !== f) && To(
        t,
        n,
        e,
        f
      ), na = !1, v = t.memoizedState, n.state = v, We(t, e, n, u), $e();
      var g = t.memoizedState;
      i !== A || v !== g || na || l !== null && l.dependencies !== null && Vu(l.dependencies) ? (typeof c == "function" && (nc(
        t,
        a,
        c,
        e
      ), g = t.memoizedState), (p = na || bo(
        t,
        a,
        p,
        e,
        v,
        g,
        f
      ) || l !== null && l.dependencies !== null && Vu(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(e, g, f), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
        e,
        g,
        f
      )), typeof n.componentDidUpdate == "function" && (t.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), t.memoizedProps = e, t.memoizedState = g), n.props = e, n.state = g, n.context = f, e = p) : (typeof n.componentDidUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || i === l.memoizedProps && v === l.memoizedState || (t.flags |= 1024), e = !1);
    }
    return n = e, on(l, t), e = (t.flags & 128) !== 0, n || e ? (n = t.stateNode, a = e && typeof a.getDerivedStateFromError != "function" ? null : n.render(), t.flags |= 1, l !== null && e ? (t.child = qa(
      t,
      l.child,
      null,
      u
    ), t.child = qa(
      t,
      null,
      a,
      u
    )) : Jl(l, t, a, u), t.memoizedState = n.state, l = t.child) : l = Lt(
      l,
      t,
      u
    ), l;
  }
  function Bo(l, t, a, e) {
    return Ca(), t.flags |= 256, Jl(l, t, a, e), t.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(l) {
    return { baseLanes: l, cachePool: As() };
  }
  function rc(l, t, a) {
    return l = l !== null ? l.childLanes & ~a : 0, t && (l |= yt), l;
  }
  function qo(l, t, a) {
    var e = t.pendingProps, u = !1, n = (t.flags & 128) !== 0, i;
    if ((i = n) || (i = l !== null && l.memoizedState === null ? !1 : (Ul.current & 2) !== 0), i && (u = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, l === null) {
      if (al) {
        if (u ? fa(t) : sa(), (l = zl) ? (l = Kd(
          l,
          Et
        ), l = l !== null && l.data !== "&" ? l : null, l !== null && (t.memoizedState = {
          dehydrated: l,
          treeContext: ta !== null ? { id: Ut, overflow: Ct } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, a = hs(l), a.return = t, t.child = a, Vl = t, zl = null)) : l = null, l === null) throw ea(t);
        return $c(l) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      var c = e.children;
      return e = e.fallback, u ? (sa(), u = t.mode, c = dn(
        { mode: "hidden", children: c },
        u
      ), e = Ua(
        e,
        u,
        a,
        null
      ), c.return = t, e.return = t, c.sibling = e, t.child = c, e = t.child, e.memoizedState = dc(a), e.childLanes = rc(
        l,
        i,
        a
      ), t.memoizedState = oc, lu(null, e)) : (fa(t), mc(t, c));
    }
    var f = l.memoizedState;
    if (f !== null && (c = f.dehydrated, c !== null)) {
      if (n)
        t.flags & 256 ? (fa(t), t.flags &= -257, t = yc(
          l,
          t,
          a
        )) : t.memoizedState !== null ? (sa(), t.child = l.child, t.flags |= 128, t = null) : (sa(), c = e.fallback, u = t.mode, e = dn(
          { mode: "visible", children: e.children },
          u
        ), c = Ua(
          c,
          u,
          a,
          null
        ), c.flags |= 2, e.return = t, c.return = t, e.sibling = c, t.child = e, qa(
          t,
          l.child,
          null,
          a
        ), e = t.child, e.memoizedState = dc(a), e.childLanes = rc(
          l,
          i,
          a
        ), t.memoizedState = oc, t = lu(null, e));
      else if (fa(t), $c(c)) {
        if (i = c.nextSibling && c.nextSibling.dataset, i) var h = i.dgst;
        i = h, e = Error(s(419)), e.stack = "", e.digest = i, Ze({ value: e, source: null, stack: null }), t = yc(
          l,
          t,
          a
        );
      } else if (Hl || ne(l, t, a, !1), i = (a & l.childLanes) !== 0, Hl || i) {
        if (i = Tl, i !== null && (e = Ef(i, a), e !== 0 && e !== f.retryLane))
          throw f.retryLane = e, Na(l, e), nt(i, l, e), fc;
        wc(c) || bn(), t = yc(
          l,
          t,
          a
        );
      } else
        wc(c) ? (t.flags |= 192, t.child = l.child, t = null) : (l = f.treeContext, zl = At(
          c.nextSibling
        ), Vl = t, al = !0, aa = null, Et = !1, l !== null && Ss(t, l), t = mc(
          t,
          e.children
        ), t.flags |= 4096);
      return t;
    }
    return u ? (sa(), c = e.fallback, u = t.mode, f = l.child, h = f.sibling, e = qt(f, {
      mode: "hidden",
      children: e.children
    }), e.subtreeFlags = f.subtreeFlags & 65011712, h !== null ? c = qt(
      h,
      c
    ) : (c = Ua(
      c,
      u,
      a,
      null
    ), c.flags |= 2), c.return = t, e.return = t, e.sibling = c, t.child = e, lu(null, e), e = t.child, c = l.child.memoizedState, c === null ? c = dc(a) : (u = c.cachePool, u !== null ? (f = jl._currentValue, u = u.parent !== f ? { parent: f, pool: f } : u) : u = As(), c = {
      baseLanes: c.baseLanes | a,
      cachePool: u
    }), e.memoizedState = c, e.childLanes = rc(
      l,
      i,
      a
    ), t.memoizedState = oc, lu(l.child, e)) : (fa(t), a = l.child, l = a.sibling, a = qt(a, {
      mode: "visible",
      children: e.children
    }), a.return = t, a.sibling = null, l !== null && (i = t.deletions, i === null ? (t.deletions = [l], t.flags |= 16) : i.push(l)), t.child = a, t.memoizedState = null, a);
  }
  function mc(l, t) {
    return t = dn(
      { mode: "visible", children: t },
      l.mode
    ), t.return = l, l.child = t;
  }
  function dn(l, t) {
    return l = ot(22, l, null, t), l.lanes = 0, l;
  }
  function yc(l, t, a) {
    return qa(t, l.child, null, a), l = mc(
      t,
      t.pendingProps.children
    ), l.flags |= 2, t.memoizedState = null, l;
  }
  function Yo(l, t, a) {
    l.lanes |= t;
    var e = l.alternate;
    e !== null && (e.lanes |= t), Ni(l.return, t, a);
  }
  function hc(l, t, a, e, u, n) {
    var i = l.memoizedState;
    i === null ? l.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: e,
      tail: a,
      tailMode: u,
      treeForkCount: n
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = e, i.tail = a, i.tailMode = u, i.treeForkCount = n);
  }
  function Go(l, t, a) {
    var e = t.pendingProps, u = e.revealOrder, n = e.tail;
    e = e.children;
    var i = Ul.current, c = (i & 2) !== 0;
    if (c ? (i = i & 1 | 2, t.flags |= 128) : i &= 1, H(Ul, i), Jl(l, t, e, a), e = al ? Qe : 0, !c && l !== null && (l.flags & 128) !== 0)
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13)
          l.memoizedState !== null && Yo(l, a, t);
        else if (l.tag === 19)
          Yo(l, a, t);
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
        for (a = t.child, u = null; a !== null; )
          l = a.alternate, l !== null && Iu(l) === null && (u = a), a = a.sibling;
        a = u, a === null ? (u = t.child, t.child = null) : (u = a.sibling, a.sibling = null), hc(
          t,
          !1,
          u,
          a,
          n,
          e
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (a = null, u = t.child, t.child = null; u !== null; ) {
          if (l = u.alternate, l !== null && Iu(l) === null) {
            t.child = u;
            break;
          }
          l = u.sibling, u.sibling = a, a = u, u = l;
        }
        hc(
          t,
          !0,
          a,
          null,
          n,
          e
        );
        break;
      case "together":
        hc(
          t,
          !1,
          null,
          null,
          void 0,
          e
        );
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Lt(l, t, a) {
    if (l !== null && (t.dependencies = l.dependencies), ra |= t.lanes, (a & t.childLanes) === 0)
      if (l !== null) {
        if (ne(
          l,
          t,
          a,
          !1
        ), (a & t.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && t.child !== l.child)
      throw Error(s(153));
    if (t.child !== null) {
      for (l = t.child, a = qt(l, l.pendingProps), t.child = a, a.return = t; l.sibling !== null; )
        l = l.sibling, a = a.sibling = qt(l, l.pendingProps), a.return = t;
      a.sibling = null;
    }
    return t.child;
  }
  function vc(l, t) {
    return (l.lanes & t) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Vu(l)));
  }
  function fy(l, t, a) {
    switch (t.tag) {
      case 3:
        kl(t, t.stateNode.containerInfo), ua(t, jl, l.memoizedState.cache), Ca();
        break;
      case 27:
      case 5:
        Oe(t);
        break;
      case 4:
        kl(t, t.stateNode.containerInfo);
        break;
      case 10:
        ua(
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
        var e = t.memoizedState;
        if (e !== null)
          return e.dehydrated !== null ? (fa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? qo(l, t, a) : (fa(t), l = Lt(
            l,
            t,
            a
          ), l !== null ? l.sibling : null);
        fa(t);
        break;
      case 19:
        var u = (l.flags & 128) !== 0;
        if (e = (a & t.childLanes) !== 0, e || (ne(
          l,
          t,
          a,
          !1
        ), e = (a & t.childLanes) !== 0), u) {
          if (e)
            return Go(
              l,
              t,
              a
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), H(Ul, Ul.current), e) break;
        return null;
      case 22:
        return t.lanes = 0, Co(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        ua(t, jl, l.memoizedState.cache);
    }
    return Lt(l, t, a);
  }
  function Xo(l, t, a) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps)
        Hl = !0;
      else {
        if (!vc(l, a) && (t.flags & 128) === 0)
          return Hl = !1, fy(
            l,
            t,
            a
          );
        Hl = (l.flags & 131072) !== 0;
      }
    else
      Hl = !1, al && (t.flags & 1048576) !== 0 && gs(t, Qe, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        l: {
          var e = t.pendingProps;
          if (l = xa(t.elementType), t.type = l, typeof l == "function")
            Ti(l) ? (e = Ga(l, e), t.tag = 1, t = xo(
              null,
              t,
              l,
              e,
              a
            )) : (t.tag = 0, t = sc(
              null,
              t,
              l,
              e,
              a
            ));
          else {
            if (l != null) {
              var u = l.$$typeof;
              if (u === ql) {
                t.tag = 11, t = Do(
                  null,
                  t,
                  l,
                  e,
                  a
                );
                break l;
              } else if (u === w) {
                t.tag = 14, t = No(
                  null,
                  t,
                  l,
                  e,
                  a
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
          a
        );
      case 1:
        return e = t.type, u = Ga(
          e,
          t.pendingProps
        ), xo(
          l,
          t,
          e,
          u,
          a
        );
      case 3:
        l: {
          if (kl(
            t,
            t.stateNode.containerInfo
          ), l === null) throw Error(s(387));
          e = t.pendingProps;
          var n = t.memoizedState;
          u = n.element, Bi(l, t), We(t, e, null, a);
          var i = t.memoizedState;
          if (e = i.cache, ua(t, jl, e), e !== n.cache && Ui(
            t,
            [jl],
            a,
            !0
          ), $e(), e = i.element, n.isDehydrated)
            if (n = {
              element: e,
              isDehydrated: !1,
              cache: i.cache
            }, t.updateQueue.baseState = n, t.memoizedState = n, t.flags & 256) {
              t = Bo(
                l,
                t,
                e,
                a
              );
              break l;
            } else if (e !== u) {
              u = pt(
                Error(s(424)),
                t
              ), Ze(u), t = Bo(
                l,
                t,
                e,
                a
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
              for (zl = At(l.firstChild), Vl = t, al = !0, aa = null, Et = !0, a = Us(
                t,
                null,
                e,
                a
              ), t.child = a; a; )
                a.flags = a.flags & -3 | 4096, a = a.sibling;
            }
          else {
            if (Ca(), e === u) {
              t = Lt(
                l,
                t,
                a
              );
              break l;
            }
            Jl(l, t, e, a);
          }
          t = t.child;
        }
        return t;
      case 26:
        return on(l, t), l === null ? (a = Fd(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = a : al || (a = t.type, l = t.pendingProps, e = Mn(
          k.current
        ).createElement(a), e[Ll] = t, e[Pl] = l, wl(e, a, l), Ql(e), t.stateNode = e) : t.memoizedState = Fd(
          t.type,
          l.memoizedProps,
          t.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Oe(t), l === null && al && (e = t.stateNode = $d(
          t.type,
          t.pendingProps,
          k.current
        ), Vl = t, Et = !0, u = zl, ga(t.type) ? (Wc = u, zl = At(e.firstChild)) : zl = u), Jl(
          l,
          t,
          t.pendingProps.children,
          a
        ), on(l, t), l === null && (t.flags |= 4194304), t.child;
      case 5:
        return l === null && al && ((u = e = zl) && (e = Yy(
          e,
          t.type,
          t.pendingProps,
          Et
        ), e !== null ? (t.stateNode = e, Vl = t, zl = At(e.firstChild), Et = !1, u = !0) : u = !1), u || ea(t)), Oe(t), u = t.type, n = t.pendingProps, i = l !== null ? l.memoizedProps : null, e = n.children, Vc(u, n) ? e = null : i !== null && Vc(u, i) && (t.flags |= 32), t.memoizedState !== null && (u = Li(
          l,
          t,
          Pm,
          null,
          null,
          a
        ), hu._currentValue = u), on(l, t), Jl(l, t, e, a), t.child;
      case 6:
        return l === null && al && ((l = a = zl) && (a = Gy(
          a,
          t.pendingProps,
          Et
        ), a !== null ? (t.stateNode = a, Vl = t, zl = null, l = !0) : l = !1), l || ea(t)), null;
      case 13:
        return qo(l, t, a);
      case 4:
        return kl(
          t,
          t.stateNode.containerInfo
        ), e = t.pendingProps, l === null ? t.child = qa(
          t,
          null,
          e,
          a
        ) : Jl(l, t, e, a), t.child;
      case 11:
        return Do(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 7:
        return Jl(
          l,
          t,
          t.pendingProps,
          a
        ), t.child;
      case 8:
        return Jl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 12:
        return Jl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 10:
        return e = t.pendingProps, ua(t, t.type, e.value), Jl(l, t, e.children, a), t.child;
      case 9:
        return u = t.type._context, e = t.pendingProps.children, Ra(t), u = Kl(u), e = e(u), t.flags |= 1, Jl(l, t, e, a), t.child;
      case 14:
        return No(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 15:
        return Uo(
          l,
          t,
          t.type,
          t.pendingProps,
          a
        );
      case 19:
        return Go(l, t, a);
      case 31:
        return cy(l, t, a);
      case 22:
        return Co(
          l,
          t,
          a,
          t.pendingProps
        );
      case 24:
        return Ra(t), e = Kl(jl), l === null ? (u = Ri(), u === null && (u = Tl, n = Ci(), u.pooledCache = n, n.refCount++, n !== null && (u.pooledCacheLanes |= a), u = n), t.memoizedState = { parent: e, cache: u }, xi(t), ua(t, jl, u)) : ((l.lanes & a) !== 0 && (Bi(l, t), We(t, null, null, a), $e()), u = l.memoizedState, n = t.memoizedState, u.parent !== e ? (u = { parent: e, cache: e }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ua(t, jl, e)) : (e = n.cache, ua(t, jl, e), e !== u.cache && Ui(
          t,
          [jl],
          a,
          !0
        ))), Jl(
          l,
          t,
          t.pendingProps.children,
          a
        ), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(s(156, t.tag));
  }
  function Vt(l) {
    l.flags |= 4;
  }
  function gc(l, t, a, e, u) {
    if ((t = (l.mode & 32) !== 0) && (t = !1), t) {
      if (l.flags |= 16777216, (u & 335544128) === u)
        if (l.stateNode.complete) l.flags |= 8192;
        else if (md()) l.flags |= 8192;
        else
          throw Ba = $u, Hi;
    } else l.flags &= -16777217;
  }
  function Qo(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !ar(t))
      if (md()) l.flags |= 8192;
      else
        throw Ba = $u, Hi;
  }
  function rn(l, t) {
    t !== null && (l.flags |= 4), l.flags & 16384 && (t = l.tag !== 22 ? pf() : 536870912, l.lanes |= t, ge |= t);
  }
  function tu(l, t) {
    if (!al)
      switch (l.tailMode) {
        case "hidden":
          t = l.tail;
          for (var a = null; t !== null; )
            t.alternate !== null && (a = t), t = t.sibling;
          a === null ? l.tail = null : a.sibling = null;
          break;
        case "collapsed":
          a = l.tail;
          for (var e = null; a !== null; )
            a.alternate !== null && (e = a), a = a.sibling;
          e === null ? t || l.tail === null ? l.tail = null : l.tail.sibling = null : e.sibling = null;
      }
  }
  function Al(l) {
    var t = l.alternate !== null && l.alternate.child === l.child, a = 0, e = 0;
    if (t)
      for (var u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags & 65011712, e |= u.flags & 65011712, u.return = l, u = u.sibling;
    else
      for (u = l.child; u !== null; )
        a |= u.lanes | u.childLanes, e |= u.subtreeFlags, e |= u.flags, u.return = l, u = u.sibling;
    return l.subtreeFlags |= e, l.childLanes = a, t;
  }
  function sy(l, t, a) {
    var e = t.pendingProps;
    switch (_i(t), t.tag) {
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
        return a = t.stateNode, e = null, l !== null && (e = l.memoizedState.cache), t.memoizedState.cache !== e && (t.flags |= 2048), Xt(jl), Nl(), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (l === null || l.child === null) && (ue(t) ? Vt(t) : l === null || l.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Mi())), Al(t), null;
      case 26:
        var u = t.type, n = t.memoizedState;
        return l === null ? (Vt(t), n !== null ? (Al(t), Qo(t, n)) : (Al(t), gc(
          t,
          u,
          null,
          e,
          a
        ))) : n ? n !== l.memoizedState ? (Vt(t), Al(t), Qo(t, n)) : (Al(t), t.flags &= -16777217) : (l = l.memoizedProps, l !== e && Vt(t), Al(t), gc(
          t,
          u,
          l,
          e,
          a
        )), null;
      case 27:
        if (Eu(t), a = k.current, u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Al(t), null;
          }
          l = Y.current, ue(t) ? ps(t) : (l = $d(u, e, a), t.stateNode = l, Vt(t));
        }
        return Al(t), null;
      case 5:
        if (Eu(t), u = t.type, l !== null && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (!e) {
            if (t.stateNode === null)
              throw Error(s(166));
            return Al(t), null;
          }
          if (n = Y.current, ue(t))
            ps(t);
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
                    n = typeof e.is == "string" ? i.createElement("select", {
                      is: e.is
                    }) : i.createElement("select"), e.multiple ? n.multiple = !0 : e.size && (n.size = e.size);
                    break;
                  default:
                    n = typeof e.is == "string" ? i.createElement(u, { is: e.is }) : i.createElement(u);
                }
            }
            n[Ll] = t, n[Pl] = e;
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
            l: switch (wl(n, u, e), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!e.autoFocus;
                break l;
              case "img":
                e = !0;
                break l;
              default:
                e = !1;
            }
            e && Vt(t);
          }
        }
        return Al(t), gc(
          t,
          t.type,
          l === null ? null : l.memoizedProps,
          t.pendingProps,
          a
        ), null;
      case 6:
        if (l && t.stateNode != null)
          l.memoizedProps !== e && Vt(t);
        else {
          if (typeof e != "string" && t.stateNode === null)
            throw Error(s(166));
          if (l = k.current, ue(t)) {
            if (l = t.stateNode, a = t.memoizedProps, e = null, u = Vl, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  e = u.memoizedProps;
              }
            l[Ll] = t, l = !!(l.nodeValue === a || e !== null && e.suppressHydrationWarning === !0 || qd(l.nodeValue, a)), l || ea(t, !0);
          } else
            l = Mn(l).createTextNode(
              e
            ), l[Ll] = t, t.stateNode = l;
        }
        return Al(t), null;
      case 31:
        if (a = t.memoizedState, l === null || l.memoizedState !== null) {
          if (e = ue(t), a !== null) {
            if (l === null) {
              if (!e) throw Error(s(318));
              if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
              l[Ll] = t;
            } else
              Ca(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), l = !1;
          } else
            a = Mi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = a), l = !0;
          if (!l)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Al(t), null;
      case 13:
        if (e = t.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (u = ue(t), e !== null && e.dehydrated !== null) {
            if (l === null) {
              if (!u) throw Error(s(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[Ll] = t;
            } else
              Ca(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Al(t), u = !1;
          } else
            u = Mi(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (rt(t), t) : (rt(t), null);
        }
        return rt(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = e !== null, l = l !== null && l.memoizedState !== null, a && (e = t.child, u = null, e.alternate !== null && e.alternate.memoizedState !== null && e.alternate.memoizedState.cachePool !== null && (u = e.alternate.memoizedState.cachePool.pool), n = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), n !== u && (e.flags |= 2048)), a !== l && a && (t.child.flags |= 8192), rn(t, t.updateQueue), Al(t), null);
      case 4:
        return Nl(), l === null && Gc(t.stateNode.containerInfo), Al(t), null;
      case 10:
        return Xt(t.type), Al(t), null;
      case 19:
        if (_(Ul), e = t.memoizedState, e === null) return Al(t), null;
        if (u = (t.flags & 128) !== 0, n = e.rendering, n === null)
          if (u) tu(e, !1);
          else {
            if (Ml !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = t.child; l !== null; ) {
                if (n = Iu(l), n !== null) {
                  for (t.flags |= 128, tu(e, !1), l = n.updateQueue, t.updateQueue = l, rn(t, l), t.subtreeFlags = 0, l = a, a = t.child; a !== null; )
                    ys(a, l), a = a.sibling;
                  return H(
                    Ul,
                    Ul.current & 1 | 2
                  ), al && Yt(t, e.treeForkCount), t.child;
                }
                l = l.sibling;
              }
            e.tail !== null && it() > gn && (t.flags |= 128, u = !0, tu(e, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (l = Iu(n), l !== null) {
              if (t.flags |= 128, u = !0, l = l.updateQueue, t.updateQueue = l, rn(t, l), tu(e, !0), e.tail === null && e.tailMode === "hidden" && !n.alternate && !al)
                return Al(t), null;
            } else
              2 * it() - e.renderingStartTime > gn && a !== 536870912 && (t.flags |= 128, u = !0, tu(e, !1), t.lanes = 4194304);
          e.isBackwards ? (n.sibling = t.child, t.child = n) : (l = e.last, l !== null ? l.sibling = n : t.child = n, e.last = n);
        }
        return e.tail !== null ? (l = e.tail, e.rendering = l, e.tail = l.sibling, e.renderingStartTime = it(), l.sibling = null, a = Ul.current, H(
          Ul,
          u ? a & 1 | 2 : a & 1
        ), al && Yt(t, e.treeForkCount), l) : (Al(t), null);
      case 22:
      case 23:
        return rt(t), Xi(), e = t.memoizedState !== null, l !== null ? l.memoizedState !== null !== e && (t.flags |= 8192) : e && (t.flags |= 8192), e ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Al(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Al(t), a = t.updateQueue, a !== null && rn(t, a.retryQueue), a = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (t.flags |= 2048), l !== null && _(Ha), null;
      case 24:
        return a = null, l !== null && (a = l.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Xt(jl), Al(t), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, t.tag));
  }
  function oy(l, t) {
    switch (_i(t), t.tag) {
      case 1:
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 3:
        return Xt(jl), Nl(), l = t.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (t.flags = l & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Eu(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (rt(t), t.alternate === null)
            throw Error(s(340));
          Ca();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 13:
        if (rt(t), l = t.memoizedState, l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(s(340));
          Ca();
        }
        return l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 19:
        return _(Ul), null;
      case 4:
        return Nl(), null;
      case 10:
        return Xt(t.type), null;
      case 22:
      case 23:
        return rt(t), Xi(), l !== null && _(Ha), l = t.flags, l & 65536 ? (t.flags = l & -65537 | 128, t) : null;
      case 24:
        return Xt(jl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zo(l, t) {
    switch (_i(t), t.tag) {
      case 3:
        Xt(jl), Nl();
        break;
      case 26:
      case 27:
      case 5:
        Eu(t);
        break;
      case 4:
        Nl();
        break;
      case 31:
        t.memoizedState !== null && rt(t);
        break;
      case 13:
        rt(t);
        break;
      case 19:
        _(Ul);
        break;
      case 10:
        Xt(t.type);
        break;
      case 22:
      case 23:
        rt(t), Xi(), l !== null && _(Ha);
        break;
      case 24:
        Xt(jl);
    }
  }
  function au(l, t) {
    try {
      var a = t.updateQueue, e = a !== null ? a.lastEffect : null;
      if (e !== null) {
        var u = e.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            e = void 0;
            var n = a.create, i = a.inst;
            e = n(), i.destroy = e;
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (c) {
      rl(t, t.return, c);
    }
  }
  function oa(l, t, a) {
    try {
      var e = t.updateQueue, u = e !== null ? e.lastEffect : null;
      if (u !== null) {
        var n = u.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            var i = e.inst, c = i.destroy;
            if (c !== void 0) {
              i.destroy = void 0, u = t;
              var f = a, h = c;
              try {
                h();
              } catch (p) {
                rl(
                  u,
                  f,
                  p
                );
              }
            }
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (p) {
      rl(t, t.return, p);
    }
  }
  function Lo(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var a = l.stateNode;
      try {
        js(t, a);
      } catch (e) {
        rl(l, l.return, e);
      }
    }
  }
  function Vo(l, t, a) {
    a.props = Ga(
      l.type,
      l.memoizedProps
    ), a.state = l.memoizedState;
    try {
      a.componentWillUnmount();
    } catch (e) {
      rl(l, t, e);
    }
  }
  function eu(l, t) {
    try {
      var a = l.ref;
      if (a !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var e = l.stateNode;
            break;
          case 30:
            e = l.stateNode;
            break;
          default:
            e = l.stateNode;
        }
        typeof a == "function" ? l.refCleanup = a(e) : a.current = e;
      }
    } catch (u) {
      rl(l, t, u);
    }
  }
  function jt(l, t) {
    var a = l.ref, e = l.refCleanup;
    if (a !== null)
      if (typeof e == "function")
        try {
          e();
        } catch (u) {
          rl(l, t, u);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof a == "function")
        try {
          a(null);
        } catch (u) {
          rl(l, t, u);
        }
      else a.current = null;
  }
  function Ko(l) {
    var t = l.type, a = l.memoizedProps, e = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break l;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function Sc(l, t, a) {
    try {
      var e = l.stateNode;
      jy(e, l.type, a, t), e[Pl] = t;
    } catch (u) {
      rl(l, l.return, u);
    }
  }
  function Jo(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && ga(l.type) || l.tag === 4;
  }
  function pc(l) {
    l: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || Jo(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && ga(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function bc(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(l, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(l), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = xt));
    else if (e !== 4 && (e === 27 && ga(l.type) && (a = l.stateNode, t = null), l = l.child, l !== null))
      for (bc(l, t, a), l = l.sibling; l !== null; )
        bc(l, t, a), l = l.sibling;
  }
  function mn(l, t, a) {
    var e = l.tag;
    if (e === 5 || e === 6)
      l = l.stateNode, t ? a.insertBefore(l, t) : a.appendChild(l);
    else if (e !== 4 && (e === 27 && ga(l.type) && (a = l.stateNode), l = l.child, l !== null))
      for (mn(l, t, a), l = l.sibling; l !== null; )
        mn(l, t, a), l = l.sibling;
  }
  function wo(l) {
    var t = l.stateNode, a = l.memoizedProps;
    try {
      for (var e = l.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      wl(t, e, a), t[Ll] = l, t[Pl] = a;
    } catch (n) {
      rl(l, l.return, n);
    }
  }
  var Kt = !1, xl = !1, Tc = !1, $o = typeof WeakSet == "function" ? WeakSet : Set, Zl = null;
  function dy(l, t) {
    if (l = l.containerInfo, Zc = Hn, l = ns(l), yi(l)) {
      if ("selectionStart" in l)
        var a = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        l: {
          a = (a = l.ownerDocument) && a.defaultView || window;
          var e = a.getSelection && a.getSelection();
          if (e && e.rangeCount !== 0) {
            a = e.anchorNode;
            var u = e.anchorOffset, n = e.focusNode;
            e = e.focusOffset;
            try {
              a.nodeType, n.nodeType;
            } catch {
              a = null;
              break l;
            }
            var i = 0, c = -1, f = -1, h = 0, p = 0, A = l, v = null;
            t: for (; ; ) {
              for (var g; A !== a || u !== 0 && A.nodeType !== 3 || (c = i + u), A !== n || e !== 0 && A.nodeType !== 3 || (f = i + e), A.nodeType === 3 && (i += A.nodeValue.length), (g = A.firstChild) !== null; )
                v = A, A = g;
              for (; ; ) {
                if (A === l) break t;
                if (v === a && ++h === u && (c = i), v === n && ++p === e && (f = i), (g = A.nextSibling) !== null) break;
                A = v, v = A.parentNode;
              }
              A = g;
            }
            a = c === -1 || f === -1 ? null : { start: c, end: f };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (Lc = { focusedElem: l, selectionRange: a }, Hn = !1, Zl = t; Zl !== null; )
      if (t = Zl, l = t.child, (t.subtreeFlags & 1028) !== 0 && l !== null)
        l.return = t, Zl = l;
      else
        for (; Zl !== null; ) {
          switch (t = Zl, n = t.alternate, l = t.flags, t.tag) {
            case 0:
              if ((l & 4) !== 0 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
                for (a = 0; a < l.length; a++)
                  u = l[a], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && n !== null) {
                l = void 0, a = t, u = n.memoizedProps, n = n.memoizedState, e = a.stateNode;
                try {
                  var B = Ga(
                    a.type,
                    u
                  );
                  l = e.getSnapshotBeforeUpdate(
                    B,
                    n
                  ), e.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Q) {
                  rl(
                    a,
                    a.return,
                    Q
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = t.stateNode.containerInfo, a = l.nodeType, a === 9)
                  Jc(l);
                else if (a === 1)
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
  function Wo(l, t, a) {
    var e = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        wt(l, a), e & 4 && au(5, a);
        break;
      case 1:
        if (wt(l, a), e & 4)
          if (l = a.stateNode, t === null)
            try {
              l.componentDidMount();
            } catch (i) {
              rl(a, a.return, i);
            }
          else {
            var u = Ga(
              a.type,
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
              rl(
                a,
                a.return,
                i
              );
            }
          }
        e & 64 && Lo(a), e & 512 && eu(a, a.return);
        break;
      case 3:
        if (wt(l, a), e & 64 && (l = a.updateQueue, l !== null)) {
          if (t = null, a.child !== null)
            switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode;
            }
          try {
            js(l, t);
          } catch (i) {
            rl(a, a.return, i);
          }
        }
        break;
      case 27:
        t === null && e & 4 && wo(a);
      case 26:
      case 5:
        wt(l, a), t === null && e & 4 && Ko(a), e & 512 && eu(a, a.return);
        break;
      case 12:
        wt(l, a);
        break;
      case 31:
        wt(l, a), e & 4 && Io(l, a);
        break;
      case 13:
        wt(l, a), e & 4 && Po(l, a), e & 64 && (l = a.memoizedState, l !== null && (l = l.dehydrated, l !== null && (a = by.bind(
          null,
          a
        ), Xy(l, a))));
        break;
      case 22:
        if (e = a.memoizedState !== null || Kt, !e) {
          t = t !== null && t.memoizedState !== null || xl, u = Kt;
          var n = xl;
          Kt = e, (xl = t) && !n ? $t(
            l,
            a,
            (a.subtreeFlags & 8772) !== 0
          ) : wt(l, a), Kt = u, xl = n;
        }
        break;
      case 30:
        break;
      default:
        wt(l, a);
    }
  }
  function ko(l) {
    var t = l.alternate;
    t !== null && (l.alternate = null, ko(t)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (t = l.stateNode, t !== null && Fn(t)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var _l = null, tt = !1;
  function Jt(l, t, a) {
    for (a = a.child; a !== null; )
      Fo(l, t, a), a = a.sibling;
  }
  function Fo(l, t, a) {
    if (ct && typeof ct.onCommitFiberUnmount == "function")
      try {
        ct.onCommitFiberUnmount(Me, a);
      } catch {
      }
    switch (a.tag) {
      case 26:
        xl || jt(a, t), Jt(
          l,
          t,
          a
        ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
        break;
      case 27:
        xl || jt(a, t);
        var e = _l, u = tt;
        ga(a.type) && (_l = a.stateNode, tt = !1), Jt(
          l,
          t,
          a
        ), ru(a.stateNode), _l = e, tt = u;
        break;
      case 5:
        xl || jt(a, t);
      case 6:
        if (e = _l, u = tt, _l = null, Jt(
          l,
          t,
          a
        ), _l = e, tt = u, _l !== null)
          if (tt)
            try {
              (_l.nodeType === 9 ? _l.body : _l.nodeName === "HTML" ? _l.ownerDocument.body : _l).removeChild(a.stateNode);
            } catch (n) {
              rl(
                a,
                t,
                n
              );
            }
          else
            try {
              _l.removeChild(a.stateNode);
            } catch (n) {
              rl(
                a,
                t,
                n
              );
            }
        break;
      case 18:
        _l !== null && (tt ? (l = _l, Ld(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          a.stateNode
        ), _e(l)) : Ld(_l, a.stateNode));
        break;
      case 4:
        e = _l, u = tt, _l = a.stateNode.containerInfo, tt = !0, Jt(
          l,
          t,
          a
        ), _l = e, tt = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oa(2, a, t), xl || oa(4, a, t), Jt(
          l,
          t,
          a
        );
        break;
      case 1:
        xl || (jt(a, t), e = a.stateNode, typeof e.componentWillUnmount == "function" && Vo(
          a,
          t,
          e
        )), Jt(
          l,
          t,
          a
        );
        break;
      case 21:
        Jt(
          l,
          t,
          a
        );
        break;
      case 22:
        xl = (e = xl) || a.memoizedState !== null, Jt(
          l,
          t,
          a
        ), xl = e;
        break;
      default:
        Jt(
          l,
          t,
          a
        );
    }
  }
  function Io(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null))) {
      l = l.dehydrated;
      try {
        _e(l);
      } catch (a) {
        rl(t, t.return, a);
      }
    }
  }
  function Po(l, t) {
    if (t.memoizedState === null && (l = t.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        _e(l);
      } catch (a) {
        rl(t, t.return, a);
      }
  }
  function ry(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return t === null && (t = l.stateNode = new $o()), t;
      case 22:
        return l = l.stateNode, t = l._retryCache, t === null && (t = l._retryCache = new $o()), t;
      default:
        throw Error(s(435, l.tag));
    }
  }
  function yn(l, t) {
    var a = ry(l);
    t.forEach(function(e) {
      if (!a.has(e)) {
        a.add(e);
        var u = Ty.bind(null, l, e);
        e.then(u, u);
      }
    });
  }
  function at(l, t) {
    var a = t.deletions;
    if (a !== null)
      for (var e = 0; e < a.length; e++) {
        var u = a[e], n = l, i = t, c = i;
        l: for (; c !== null; ) {
          switch (c.tag) {
            case 27:
              if (ga(c.type)) {
                _l = c.stateNode, tt = !1;
                break l;
              }
              break;
            case 5:
              _l = c.stateNode, tt = !1;
              break l;
            case 3:
            case 4:
              _l = c.stateNode.containerInfo, tt = !0;
              break l;
          }
          c = c.return;
        }
        if (_l === null) throw Error(s(160));
        Fo(n, i, u), _l = null, tt = !1, n = u.alternate, n !== null && (n.return = null), u.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        ld(t, l), t = t.sibling;
  }
  var Mt = null;
  function ld(l, t) {
    var a = l.alternate, e = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        at(t, l), et(l), e & 4 && (oa(3, l, l.return), au(3, l), oa(5, l, l.return));
        break;
      case 1:
        at(t, l), et(l), e & 512 && (xl || a === null || jt(a, a.return)), e & 64 && Kt && (l = l.updateQueue, l !== null && (e = l.callbacks, e !== null && (a = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = a === null ? e : a.concat(e))));
        break;
      case 26:
        var u = Mt;
        if (at(t, l), et(l), e & 512 && (xl || a === null || jt(a, a.return)), e & 4) {
          var n = a !== null ? a.memoizedState : null;
          if (e = l.memoizedState, a === null)
            if (e === null)
              if (l.stateNode === null) {
                l: {
                  e = l.type, a = l.memoizedProps, u = u.ownerDocument || u;
                  t: switch (e) {
                    case "title":
                      n = u.getElementsByTagName("title")[0], (!n || n[Ue] || n[Ll] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = u.createElement(e), u.head.insertBefore(
                        n,
                        u.querySelector("head > title")
                      )), wl(n, e, a), n[Ll] = l, Ql(n), e = n;
                      break l;
                    case "link":
                      var i = lr(
                        "link",
                        "href",
                        u
                      ).get(e + (a.href || ""));
                      if (i) {
                        for (var c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && n.getAttribute("rel") === (a.rel == null ? null : a.rel) && n.getAttribute("title") === (a.title == null ? null : a.title) && n.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), wl(n, e, a), u.head.appendChild(n);
                      break;
                    case "meta":
                      if (i = lr(
                        "meta",
                        "content",
                        u
                      ).get(e + (a.content || ""))) {
                        for (c = 0; c < i.length; c++)
                          if (n = i[c], n.getAttribute("content") === (a.content == null ? null : "" + a.content) && n.getAttribute("name") === (a.name == null ? null : a.name) && n.getAttribute("property") === (a.property == null ? null : a.property) && n.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && n.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                            i.splice(c, 1);
                            break t;
                          }
                      }
                      n = u.createElement(e), wl(n, e, a), u.head.appendChild(n);
                      break;
                    default:
                      throw Error(s(468, e));
                  }
                  n[Ll] = l, Ql(n), e = n;
                }
                l.stateNode = e;
              } else
                tr(
                  u,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Pd(
                u,
                e,
                l.memoizedProps
              );
          else
            n !== e ? (n === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : n.count--, e === null ? tr(
              u,
              l.type,
              l.stateNode
            ) : Pd(
              u,
              e,
              l.memoizedProps
            )) : e === null && l.stateNode !== null && Sc(
              l,
              l.memoizedProps,
              a.memoizedProps
            );
        }
        break;
      case 27:
        at(t, l), et(l), e & 512 && (xl || a === null || jt(a, a.return)), a !== null && e & 4 && Sc(
          l,
          l.memoizedProps,
          a.memoizedProps
        );
        break;
      case 5:
        if (at(t, l), et(l), e & 512 && (xl || a === null || jt(a, a.return)), l.flags & 32) {
          u = l.stateNode;
          try {
            $a(u, "");
          } catch (B) {
            rl(l, l.return, B);
          }
        }
        e & 4 && l.stateNode != null && (u = l.memoizedProps, Sc(
          l,
          u,
          a !== null ? a.memoizedProps : u
        )), e & 1024 && (Tc = !0);
        break;
      case 6:
        if (at(t, l), et(l), e & 4) {
          if (l.stateNode === null)
            throw Error(s(162));
          e = l.memoizedProps, a = l.stateNode;
          try {
            a.nodeValue = e;
          } catch (B) {
            rl(l, l.return, B);
          }
        }
        break;
      case 3:
        if (Un = null, u = Mt, Mt = Dn(t.containerInfo), at(t, l), Mt = u, et(l), e & 4 && a !== null && a.memoizedState.isDehydrated)
          try {
            _e(t.containerInfo);
          } catch (B) {
            rl(l, l.return, B);
          }
        Tc && (Tc = !1, td(l));
        break;
      case 4:
        e = Mt, Mt = Dn(
          l.stateNode.containerInfo
        ), at(t, l), et(l), Mt = e;
        break;
      case 12:
        at(t, l), et(l);
        break;
      case 31:
        at(t, l), et(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 13:
        at(t, l), et(l), l.child.flags & 8192 && l.memoizedState !== null != (a !== null && a.memoizedState !== null) && (vn = it()), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 22:
        u = l.memoizedState !== null;
        var f = a !== null && a.memoizedState !== null, h = Kt, p = xl;
        if (Kt = h || u, xl = p || f, at(t, l), xl = p, Kt = h, et(l), e & 8192)
          l: for (t = l.stateNode, t._visibility = u ? t._visibility & -2 : t._visibility | 1, u && (a === null || f || Kt || xl || Xa(l)), a = null, t = l; ; ) {
            if (t.tag === 5 || t.tag === 26) {
              if (a === null) {
                f = a = t;
                try {
                  if (n = f.stateNode, u)
                    i = n.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
                  else {
                    c = f.stateNode;
                    var A = f.memoizedProps.style, v = A != null && A.hasOwnProperty("display") ? A.display : null;
                    c.style.display = v == null || typeof v == "boolean" ? "" : ("" + v).trim();
                  }
                } catch (B) {
                  rl(f, f.return, B);
                }
              }
            } else if (t.tag === 6) {
              if (a === null) {
                f = t;
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (B) {
                  rl(f, f.return, B);
                }
              }
            } else if (t.tag === 18) {
              if (a === null) {
                f = t;
                try {
                  var g = f.stateNode;
                  u ? Vd(g, !0) : Vd(f.stateNode, !1);
                } catch (B) {
                  rl(f, f.return, B);
                }
              }
            } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === l) && t.child !== null) {
              t.child.return = t, t = t.child;
              continue;
            }
            if (t === l) break l;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === l) break l;
              a === t && (a = null), t = t.return;
            }
            a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
          }
        e & 4 && (e = l.updateQueue, e !== null && (a = e.retryQueue, a !== null && (e.retryQueue = null, yn(l, a))));
        break;
      case 19:
        at(t, l), et(l), e & 4 && (e = l.updateQueue, e !== null && (l.updateQueue = null, yn(l, e)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        at(t, l), et(l);
    }
  }
  function et(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var a, e = l.return; e !== null; ) {
          if (Jo(e)) {
            a = e;
            break;
          }
          e = e.return;
        }
        if (a == null) throw Error(s(160));
        switch (a.tag) {
          case 27:
            var u = a.stateNode, n = pc(l);
            mn(l, n, u);
            break;
          case 5:
            var i = a.stateNode;
            a.flags & 32 && ($a(i, ""), a.flags &= -33);
            var c = pc(l);
            mn(l, c, i);
            break;
          case 3:
          case 4:
            var f = a.stateNode.containerInfo, h = pc(l);
            bc(
              l,
              h,
              f
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (p) {
        rl(l, l.return, p);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function td(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        td(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), l = l.sibling;
      }
  }
  function wt(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Wo(l, t.alternate, t), t = t.sibling;
  }
  function Xa(l) {
    for (l = l.child; l !== null; ) {
      var t = l;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oa(4, t, t.return), Xa(t);
          break;
        case 1:
          jt(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Vo(
            t,
            t.return,
            a
          ), Xa(t);
          break;
        case 27:
          ru(t.stateNode);
        case 26:
        case 5:
          jt(t, t.return), Xa(t);
          break;
        case 22:
          t.memoizedState === null && Xa(t);
          break;
        case 30:
          Xa(t);
          break;
        default:
          Xa(t);
      }
      l = l.sibling;
    }
  }
  function $t(l, t, a) {
    for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var e = t.alternate, u = l, n = t, i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          $t(
            u,
            n,
            a
          ), au(4, n);
          break;
        case 1:
          if ($t(
            u,
            n,
            a
          ), e = n, u = e.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (h) {
              rl(e, e.return, h);
            }
          if (e = n, u = e.updateQueue, u !== null) {
            var c = e.stateNode;
            try {
              var f = u.shared.hiddenCallbacks;
              if (f !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < f.length; u++)
                  Cs(f[u], c);
            } catch (h) {
              rl(e, e.return, h);
            }
          }
          a && i & 64 && Lo(n), eu(n, n.return);
          break;
        case 27:
          wo(n);
        case 26:
        case 5:
          $t(
            u,
            n,
            a
          ), a && e === null && i & 4 && Ko(n), eu(n, n.return);
          break;
        case 12:
          $t(
            u,
            n,
            a
          );
          break;
        case 31:
          $t(
            u,
            n,
            a
          ), a && i & 4 && Io(u, n);
          break;
        case 13:
          $t(
            u,
            n,
            a
          ), a && i & 4 && Po(u, n);
          break;
        case 22:
          n.memoizedState === null && $t(
            u,
            n,
            a
          ), eu(n, n.return);
          break;
        case 30:
          break;
        default:
          $t(
            u,
            n,
            a
          );
      }
      t = t.sibling;
    }
  }
  function Ec(l, t) {
    var a = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (a = l.memoizedState.cachePool.pool), l = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool), l !== a && (l != null && l.refCount++, a != null && Le(a));
  }
  function zc(l, t) {
    l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Le(l));
  }
  function Dt(l, t, a, e) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ad(
          l,
          t,
          a,
          e
        ), t = t.sibling;
  }
  function ad(l, t, a, e) {
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && au(9, t);
        break;
      case 1:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 3:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && (l = null, t.alternate !== null && (l = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== l && (t.refCount++, l != null && Le(l)));
        break;
      case 12:
        if (u & 2048) {
          Dt(
            l,
            t,
            a,
            e
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
            rl(t, t.return, f);
          }
        } else
          Dt(
            l,
            t,
            a,
            e
          );
        break;
      case 31:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 13:
        Dt(
          l,
          t,
          a,
          e
        );
        break;
      case 23:
        break;
      case 22:
        n = t.stateNode, i = t.alternate, t.memoizedState !== null ? n._visibility & 2 ? Dt(
          l,
          t,
          a,
          e
        ) : uu(l, t) : n._visibility & 2 ? Dt(
          l,
          t,
          a,
          e
        ) : (n._visibility |= 2, ye(
          l,
          t,
          a,
          e,
          (t.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Ec(i, t);
        break;
      case 24:
        Dt(
          l,
          t,
          a,
          e
        ), u & 2048 && zc(t.alternate, t);
        break;
      default:
        Dt(
          l,
          t,
          a,
          e
        );
    }
  }
  function ye(l, t, a, e, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var n = l, i = t, c = a, f = e, h = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ye(
            n,
            i,
            c,
            f,
            u
          ), au(8, i);
          break;
        case 23:
          break;
        case 22:
          var p = i.stateNode;
          i.memoizedState !== null ? p._visibility & 2 ? ye(
            n,
            i,
            c,
            f,
            u
          ) : uu(
            n,
            i
          ) : (p._visibility |= 2, ye(
            n,
            i,
            c,
            f,
            u
          )), u && h & 2048 && Ec(
            i.alternate,
            i
          );
          break;
        case 24:
          ye(
            n,
            i,
            c,
            f,
            u
          ), u && h & 2048 && zc(i.alternate, i);
          break;
        default:
          ye(
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
        var a = l, e = t, u = e.flags;
        switch (e.tag) {
          case 22:
            uu(a, e), u & 2048 && Ec(
              e.alternate,
              e
            );
            break;
          case 24:
            uu(a, e), u & 2048 && zc(e.alternate, e);
            break;
          default:
            uu(a, e);
        }
        t = t.sibling;
      }
  }
  var nu = 8192;
  function he(l, t, a) {
    if (l.subtreeFlags & nu)
      for (l = l.child; l !== null; )
        ed(
          l,
          t,
          a
        ), l = l.sibling;
  }
  function ed(l, t, a) {
    switch (l.tag) {
      case 26:
        he(
          l,
          t,
          a
        ), l.flags & nu && l.memoizedState !== null && Iy(
          a,
          Mt,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        he(
          l,
          t,
          a
        );
        break;
      case 3:
      case 4:
        var e = Mt;
        Mt = Dn(l.stateNode.containerInfo), he(
          l,
          t,
          a
        ), Mt = e;
        break;
      case 22:
        l.memoizedState === null && (e = l.alternate, e !== null && e.memoizedState !== null ? (e = nu, nu = 16777216, he(
          l,
          t,
          a
        ), nu = e) : he(
          l,
          t,
          a
        ));
        break;
      default:
        he(
          l,
          t,
          a
        );
    }
  }
  function ud(l) {
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
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Zl = e, id(
            e,
            l
          );
        }
      ud(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        nd(l), l = l.sibling;
  }
  function nd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        iu(l), l.flags & 2048 && oa(9, l, l.return);
        break;
      case 3:
        iu(l);
        break;
      case 12:
        iu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null && t._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (t._visibility &= -3, hn(l)) : iu(l);
        break;
      default:
        iu(l);
    }
  }
  function hn(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var a = 0; a < t.length; a++) {
          var e = t[a];
          Zl = e, id(
            e,
            l
          );
        }
      ud(l);
    }
    for (l = l.child; l !== null; ) {
      switch (t = l, t.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, t, t.return), hn(t);
          break;
        case 22:
          a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, hn(t));
          break;
        default:
          hn(t);
      }
      l = l.sibling;
    }
  }
  function id(l, t) {
    for (; Zl !== null; ) {
      var a = Zl;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          oa(8, a, t);
          break;
        case 23:
        case 22:
          if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
            var e = a.memoizedState.cachePool.pool;
            e != null && e.refCount++;
          }
          break;
        case 24:
          Le(a.memoizedState.cache);
      }
      if (e = a.child, e !== null) e.return = a, Zl = e;
      else
        l: for (a = l; Zl !== null; ) {
          e = Zl;
          var u = e.sibling, n = e.return;
          if (ko(e), e === a) {
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
  var my = {
    getCacheForType: function(l) {
      var t = Kl(jl), a = t.data.get(l);
      return a === void 0 && (a = l(), t.data.set(l, a)), a;
    },
    cacheSignal: function() {
      return Kl(jl).controller.signal;
    }
  }, yy = typeof WeakMap == "function" ? WeakMap : Map, sl = 0, Tl = null, F = null, P = 0, dl = 0, mt = null, da = !1, ve = !1, Ac = !1, Wt = 0, Ml = 0, ra = 0, Qa = 0, _c = 0, yt = 0, ge = 0, cu = null, ut = null, Oc = !1, vn = 0, cd = 0, gn = 1 / 0, Sn = null, ma = null, Yl = 0, ya = null, Se = null, kt = 0, Mc = 0, Dc = null, fd = null, fu = 0, Nc = null;
  function ht() {
    return (sl & 2) !== 0 && P !== 0 ? P & -P : b.T !== null ? xc() : zf();
  }
  function sd() {
    if (yt === 0)
      if ((P & 536870912) === 0 || al) {
        var l = _u;
        _u <<= 1, (_u & 3932160) === 0 && (_u = 262144), yt = l;
      } else yt = 536870912;
    return l = dt.current, l !== null && (l.flags |= 32), yt;
  }
  function nt(l, t, a) {
    (l === Tl && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null) && (pe(l, 0), ha(
      l,
      P,
      yt,
      !1
    )), Ne(l, a), ((sl & 2) === 0 || l !== Tl) && (l === Tl && ((sl & 2) === 0 && (Qa |= a), Ml === 4 && ha(
      l,
      P,
      yt,
      !1
    )), Rt(l));
  }
  function od(l, t, a) {
    if ((sl & 6) !== 0) throw Error(s(327));
    var e = !a && (t & 127) === 0 && (t & l.expiredLanes) === 0 || De(l, t), u = e ? gy(l, t) : Cc(l, t, !0), n = e;
    do {
      if (u === 0) {
        ve && !e && ha(l, t, 0, !1);
        break;
      } else {
        if (a = l.current.alternate, n && !hy(a)) {
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
              if (f && (pe(c, i).flags |= 256), i = Cc(
                c,
                i,
                !1
              ), i !== 2) {
                if (Ac && !f) {
                  c.errorRecoveryDisabledLanes |= n, Qa |= n, u = 4;
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
          pe(l, 0), ha(l, t, 0, !0);
          break;
        }
        l: {
          switch (e = l, n = u, n) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              ha(
                e,
                t,
                yt,
                !da
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
            if (ha(
              e,
              t,
              yt,
              !da
            ), Mu(e, 0, !0) !== 0) break l;
            kt = t, e.timeoutHandle = Qd(
              dd.bind(
                null,
                e,
                a,
                ut,
                Sn,
                Oc,
                t,
                yt,
                Qa,
                ge,
                da,
                n,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break l;
          }
          dd(
            e,
            a,
            ut,
            Sn,
            Oc,
            t,
            yt,
            Qa,
            ge,
            da,
            n,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Rt(l);
  }
  function dd(l, t, a, e, u, n, i, c, f, h, p, A, v, g) {
    if (l.timeoutHandle = -1, A = t.subtreeFlags, A & 8192 || (A & 16785408) === 16785408) {
      A = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: xt
      }, ed(
        t,
        n,
        A
      );
      var B = (n & 62914560) === n ? vn - it() : (n & 4194048) === n ? cd - it() : 0;
      if (B = Py(
        A,
        B
      ), B !== null) {
        kt = n, l.cancelPendingCommit = B(
          pd.bind(
            null,
            l,
            t,
            n,
            a,
            e,
            u,
            i,
            c,
            f,
            p,
            A,
            null,
            v,
            g
          )
        ), ha(l, n, i, !h);
        return;
      }
    }
    pd(
      l,
      t,
      n,
      a,
      e,
      u,
      i,
      c,
      f
    );
  }
  function hy(l) {
    for (var t = l; ; ) {
      var a = t.tag;
      if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
        for (var e = 0; e < a.length; e++) {
          var u = a[e], n = u.getSnapshot;
          u = u.value;
          try {
            if (!st(n(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (a = t.child, t.subtreeFlags & 16384 && a !== null)
        a.return = t, t = a;
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
  function ha(l, t, a, e) {
    t &= ~_c, t &= ~Qa, l.suspendedLanes |= t, l.pingedLanes &= ~t, e && (l.warmLanes |= t), e = l.expirationTimes;
    for (var u = t; 0 < u; ) {
      var n = 31 - ft(u), i = 1 << n;
      e[n] = -1, u &= ~i;
    }
    a !== 0 && bf(l, a, t);
  }
  function pn() {
    return (sl & 6) === 0 ? (su(0), !1) : !0;
  }
  function Uc() {
    if (F !== null) {
      if (dl === 0)
        var l = F.return;
      else
        l = F, Gt = ja = null, Ji(l), se = null, Ke = 0, l = F;
      for (; l !== null; )
        Zo(l.alternate, l), l = l.return;
      F = null;
    }
  }
  function pe(l, t) {
    var a = l.timeoutHandle;
    a !== -1 && (l.timeoutHandle = -1, xy(a)), a = l.cancelPendingCommit, a !== null && (l.cancelPendingCommit = null, a()), kt = 0, Uc(), Tl = l, F = a = qt(l.current, null), P = t, dl = 0, mt = null, da = !1, ve = De(l, t), Ac = !1, ge = yt = _c = Qa = ra = Ml = 0, ut = cu = null, Oc = !1, (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var u = 31 - ft(e), n = 1 << u;
        t |= l[u], e &= ~n;
      }
    return Wt = t, Gu(), a;
  }
  function rd(l, t) {
    J = null, b.H = Pe, t === fe || t === wu ? (t = Ms(), dl = 3) : t === Hi ? (t = Ms(), dl = 4) : dl = t === fc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, mt = t, F === null && (Ml = 1, fn(
      l,
      pt(t, l.current)
    ));
  }
  function md() {
    var l = dt.current;
    return l === null ? !0 : (P & 4194048) === P ? zt === null : (P & 62914560) === P || (P & 536870912) !== 0 ? l === zt : !1;
  }
  function yd() {
    var l = b.H;
    return b.H = Pe, l === null ? Pe : l;
  }
  function hd() {
    var l = b.A;
    return b.A = my, l;
  }
  function bn() {
    Ml = 4, da || (P & 4194048) !== P && dt.current !== null || (ve = !0), (ra & 134217727) === 0 && (Qa & 134217727) === 0 || Tl === null || ha(
      Tl,
      P,
      yt,
      !1
    );
  }
  function Cc(l, t, a) {
    var e = sl;
    sl |= 2;
    var u = yd(), n = hd();
    (Tl !== l || P !== t) && (Sn = null, pe(l, t)), t = !1;
    var i = Ml;
    l: do
      try {
        if (dl !== 0 && F !== null) {
          var c = F, f = mt;
          switch (dl) {
            case 8:
              Uc(), i = 6;
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              dt.current === null && (t = !0);
              var h = dl;
              if (dl = 0, mt = null, be(l, c, f, h), a && ve) {
                i = 0;
                break l;
              }
              break;
            default:
              h = dl, dl = 0, mt = null, be(l, c, f, h);
          }
        }
        vy(), i = Ml;
        break;
      } catch (p) {
        rd(l, p);
      }
    while (!0);
    return t && l.shellSuspendCounter++, Gt = ja = null, sl = e, b.H = u, b.A = n, F === null && (Tl = null, P = 0, Gu()), i;
  }
  function vy() {
    for (; F !== null; ) vd(F);
  }
  function gy(l, t) {
    var a = sl;
    sl |= 2;
    var e = yd(), u = hd();
    Tl !== l || P !== t ? (Sn = null, gn = it() + 500, pe(l, t)) : ve = De(
      l,
      t
    );
    l: do
      try {
        if (dl !== 0 && F !== null) {
          t = F;
          var n = mt;
          t: switch (dl) {
            case 1:
              dl = 0, mt = null, be(l, t, n, 1);
              break;
            case 2:
            case 9:
              if (_s(n)) {
                dl = 0, mt = null, gd(t);
                break;
              }
              t = function() {
                dl !== 2 && dl !== 9 || Tl !== l || (dl = 7), Rt(l);
              }, n.then(t, t);
              break l;
            case 3:
              dl = 7;
              break l;
            case 4:
              dl = 5;
              break l;
            case 7:
              _s(n) ? (dl = 0, mt = null, gd(t)) : (dl = 0, mt = null, be(l, t, n, 7));
              break;
            case 5:
              var i = null;
              switch (F.tag) {
                case 26:
                  i = F.memoizedState;
                case 5:
                case 27:
                  var c = F;
                  if (i ? ar(i) : c.stateNode.complete) {
                    dl = 0, mt = null;
                    var f = c.sibling;
                    if (f !== null) F = f;
                    else {
                      var h = c.return;
                      h !== null ? (F = h, Tn(h)) : F = null;
                    }
                    break t;
                  }
              }
              dl = 0, mt = null, be(l, t, n, 5);
              break;
            case 6:
              dl = 0, mt = null, be(l, t, n, 6);
              break;
            case 8:
              Uc(), Ml = 6;
              break l;
            default:
              throw Error(s(462));
          }
        }
        Sy();
        break;
      } catch (p) {
        rd(l, p);
      }
    while (!0);
    return Gt = ja = null, b.H = e, b.A = u, sl = a, F !== null ? 0 : (Tl = null, P = 0, Gu(), Ml);
  }
  function Sy() {
    for (; F !== null && !Qr(); )
      vd(F);
  }
  function vd(l) {
    var t = Xo(l.alternate, l, Wt);
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : F = t;
  }
  function gd(l) {
    var t = l, a = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Ho(
          a,
          t,
          t.pendingProps,
          t.type,
          void 0,
          P
        );
        break;
      case 11:
        t = Ho(
          a,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          P
        );
        break;
      case 5:
        Ji(t);
      default:
        Zo(a, t), t = F = ys(t, Wt), t = Xo(a, t, Wt);
    }
    l.memoizedProps = l.pendingProps, t === null ? Tn(l) : F = t;
  }
  function be(l, t, a, e) {
    Gt = ja = null, Ji(t), se = null, Ke = 0;
    var u = t.return;
    try {
      if (iy(
        l,
        u,
        t,
        a,
        P
      )) {
        Ml = 1, fn(
          l,
          pt(a, l.current)
        ), F = null;
        return;
      }
    } catch (n) {
      if (u !== null) throw F = u, n;
      Ml = 1, fn(
        l,
        pt(a, l.current)
      ), F = null;
      return;
    }
    t.flags & 32768 ? (al || e === 1 ? l = !0 : ve || (P & 536870912) !== 0 ? l = !1 : (da = l = !0, (e === 2 || e === 9 || e === 3 || e === 6) && (e = dt.current, e !== null && e.tag === 13 && (e.flags |= 16384))), Sd(t, l)) : Tn(t);
  }
  function Tn(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        Sd(
          t,
          da
        );
        return;
      }
      l = t.return;
      var a = sy(
        t.alternate,
        t,
        Wt
      );
      if (a !== null) {
        F = a;
        return;
      }
      if (t = t.sibling, t !== null) {
        F = t;
        return;
      }
      F = t = l;
    } while (t !== null);
    Ml === 0 && (Ml = 5);
  }
  function Sd(l, t) {
    do {
      var a = oy(l.alternate, l);
      if (a !== null) {
        a.flags &= 32767, F = a;
        return;
      }
      if (a = l.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (l = l.sibling, l !== null)) {
        F = l;
        return;
      }
      F = l = a;
    } while (l !== null);
    Ml = 6, F = null;
  }
  function pd(l, t, a, e, u, n, i, c, f) {
    l.cancelPendingCommit = null;
    do
      En();
    while (Yl !== 0);
    if ((sl & 6) !== 0) throw Error(s(327));
    if (t !== null) {
      if (t === l.current) throw Error(s(177));
      if (n = t.lanes | t.childLanes, n |= pi, Fr(
        l,
        a,
        n,
        i,
        c,
        f
      ), l === Tl && (F = Tl = null, P = 0), Se = t, ya = l, kt = a, Mc = n, Dc = u, fd = e, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Ey(zu, function() {
        return Ad(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), e = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || e) {
        e = b.T, b.T = null, u = R.p, R.p = 2, i = sl, sl |= 4;
        try {
          dy(l, t, a);
        } finally {
          sl = i, R.p = u, b.T = e;
        }
      }
      Yl = 1, bd(), Td(), Ed();
    }
  }
  function bd() {
    if (Yl === 1) {
      Yl = 0;
      var l = ya, t = Se, a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        a = b.T, b.T = null;
        var e = R.p;
        R.p = 2;
        var u = sl;
        sl |= 4;
        try {
          ld(t, l);
          var n = Lc, i = ns(l.containerInfo), c = n.focusedElem, f = n.selectionRange;
          if (i !== c && c && c.ownerDocument && us(
            c.ownerDocument.documentElement,
            c
          )) {
            if (f !== null && yi(c)) {
              var h = f.start, p = f.end;
              if (p === void 0 && (p = h), "selectionStart" in c)
                c.selectionStart = h, c.selectionEnd = Math.min(
                  p,
                  c.value.length
                );
              else {
                var A = c.ownerDocument || document, v = A && A.defaultView || window;
                if (v.getSelection) {
                  var g = v.getSelection(), B = c.textContent.length, Q = Math.min(f.start, B), Sl = f.end === void 0 ? Q : Math.min(f.end, B);
                  !g.extend && Q > Sl && (i = Sl, Sl = Q, Q = i);
                  var m = es(
                    c,
                    Q
                  ), o = es(
                    c,
                    Sl
                  );
                  if (m && o && (g.rangeCount !== 1 || g.anchorNode !== m.node || g.anchorOffset !== m.offset || g.focusNode !== o.node || g.focusOffset !== o.offset)) {
                    var y = A.createRange();
                    y.setStart(m.node, m.offset), g.removeAllRanges(), Q > Sl ? (g.addRange(y), g.extend(o.node, o.offset)) : (y.setEnd(o.node, o.offset), g.addRange(y));
                  }
                }
              }
            }
            for (A = [], g = c; g = g.parentNode; )
              g.nodeType === 1 && A.push({
                element: g,
                left: g.scrollLeft,
                top: g.scrollTop
              });
            for (typeof c.focus == "function" && c.focus(), c = 0; c < A.length; c++) {
              var E = A[c];
              E.element.scrollLeft = E.left, E.element.scrollTop = E.top;
            }
          }
          Hn = !!Zc, Lc = Zc = null;
        } finally {
          sl = u, R.p = e, b.T = a;
        }
      }
      l.current = t, Yl = 2;
    }
  }
  function Td() {
    if (Yl === 2) {
      Yl = 0;
      var l = ya, t = Se, a = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || a) {
        a = b.T, b.T = null;
        var e = R.p;
        R.p = 2;
        var u = sl;
        sl |= 4;
        try {
          Wo(l, t.alternate, t);
        } finally {
          sl = u, R.p = e, b.T = a;
        }
      }
      Yl = 3;
    }
  }
  function Ed() {
    if (Yl === 4 || Yl === 3) {
      Yl = 0, Zr();
      var l = ya, t = Se, a = kt, e = fd;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Yl = 5 : (Yl = 0, Se = ya = null, zd(l, l.pendingLanes));
      var u = l.pendingLanes;
      if (u === 0 && (ma = null), Wn(a), t = t.stateNode, ct && typeof ct.onCommitFiberRoot == "function")
        try {
          ct.onCommitFiberRoot(
            Me,
            t,
            void 0,
            (t.current.flags & 128) === 128
          );
        } catch {
        }
      if (e !== null) {
        t = b.T, u = R.p, R.p = 2, b.T = null;
        try {
          for (var n = l.onRecoverableError, i = 0; i < e.length; i++) {
            var c = e[i];
            n(c.value, {
              componentStack: c.stack
            });
          }
        } finally {
          b.T = t, R.p = u;
        }
      }
      (kt & 3) !== 0 && En(), Rt(l), u = l.pendingLanes, (a & 261930) !== 0 && (u & 42) !== 0 ? l === Nc ? fu++ : (fu = 0, Nc = l) : fu = 0, su(0);
    }
  }
  function zd(l, t) {
    (l.pooledCacheLanes &= t) === 0 && (t = l.pooledCache, t != null && (l.pooledCache = null, Le(t)));
  }
  function En() {
    return bd(), Td(), Ed(), Ad();
  }
  function Ad() {
    if (Yl !== 5) return !1;
    var l = ya, t = Mc;
    Mc = 0;
    var a = Wn(kt), e = b.T, u = R.p;
    try {
      R.p = 32 > a ? 32 : a, b.T = null, a = Dc, Dc = null;
      var n = ya, i = kt;
      if (Yl = 0, Se = ya = null, kt = 0, (sl & 6) !== 0) throw Error(s(331));
      var c = sl;
      if (sl |= 4, nd(n.current), ad(
        n,
        n.current,
        i,
        a
      ), sl = c, su(0, !1), ct && typeof ct.onPostCommitFiberRoot == "function")
        try {
          ct.onPostCommitFiberRoot(Me, n);
        } catch {
        }
      return !0;
    } finally {
      R.p = u, b.T = e, zd(l, t);
    }
  }
  function _d(l, t, a) {
    t = pt(a, t), t = cc(l.stateNode, t, 2), l = ca(l, t, 2), l !== null && (Ne(l, 2), Rt(l));
  }
  function rl(l, t, a) {
    if (l.tag === 3)
      _d(l, l, a);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          _d(
            t,
            l,
            a
          );
          break;
        } else if (t.tag === 1) {
          var e = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof e.componentDidCatch == "function" && (ma === null || !ma.has(e))) {
            l = pt(a, l), a = Oo(2), e = ca(t, a, 2), e !== null && (Mo(
              a,
              e,
              t,
              l
            ), Ne(e, 2), Rt(e));
            break;
          }
        }
        t = t.return;
      }
  }
  function jc(l, t, a) {
    var e = l.pingCache;
    if (e === null) {
      e = l.pingCache = new yy();
      var u = /* @__PURE__ */ new Set();
      e.set(t, u);
    } else
      u = e.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), e.set(t, u));
    u.has(a) || (Ac = !0, u.add(a), l = py.bind(null, l, t, a), t.then(l, l));
  }
  function py(l, t, a) {
    var e = l.pingCache;
    e !== null && e.delete(t), l.pingedLanes |= l.suspendedLanes & a, l.warmLanes &= ~a, Tl === l && (P & a) === a && (Ml === 4 || Ml === 3 && (P & 62914560) === P && 300 > it() - vn ? (sl & 2) === 0 && pe(l, 0) : _c |= a, ge === P && (ge = 0)), Rt(l);
  }
  function Od(l, t) {
    t === 0 && (t = pf()), l = Na(l, t), l !== null && (Ne(l, t), Rt(l));
  }
  function by(l) {
    var t = l.memoizedState, a = 0;
    t !== null && (a = t.retryLane), Od(l, a);
  }
  function Ty(l, t) {
    var a = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var e = l.stateNode, u = l.memoizedState;
        u !== null && (a = u.retryLane);
        break;
      case 19:
        e = l.stateNode;
        break;
      case 22:
        e = l.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    e !== null && e.delete(t), Od(l, a);
  }
  function Ey(l, t) {
    return Kn(l, t);
  }
  var zn = null, Te = null, Rc = !1, An = !1, Hc = !1, va = 0;
  function Rt(l) {
    l !== Te && l.next === null && (Te === null ? zn = Te = l : Te = Te.next = l), An = !0, Rc || (Rc = !0, Ay());
  }
  function su(l, t) {
    if (!Hc && An) {
      Hc = !0;
      do
        for (var a = !1, e = zn; e !== null; ) {
          if (l !== 0) {
            var u = e.pendingLanes;
            if (u === 0) var n = 0;
            else {
              var i = e.suspendedLanes, c = e.pingedLanes;
              n = (1 << 31 - ft(42 | l) + 1) - 1, n &= u & ~(i & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
            }
            n !== 0 && (a = !0, Ud(e, n));
          } else
            n = P, n = Mu(
              e,
              e === Tl ? n : 0,
              e.cancelPendingCommit !== null || e.timeoutHandle !== -1
            ), (n & 3) === 0 || De(e, n) || (a = !0, Ud(e, n));
          e = e.next;
        }
      while (a);
      Hc = !1;
    }
  }
  function zy() {
    Md();
  }
  function Md() {
    An = Rc = !1;
    var l = 0;
    va !== 0 && Hy() && (l = va);
    for (var t = it(), a = null, e = zn; e !== null; ) {
      var u = e.next, n = Dd(e, t);
      n === 0 ? (e.next = null, a === null ? zn = u : a.next = u, u === null && (Te = a)) : (a = e, (l !== 0 || (n & 3) !== 0) && (An = !0)), e = u;
    }
    Yl !== 0 && Yl !== 5 || su(l), va !== 0 && (va = 0);
  }
  function Dd(l, t) {
    for (var a = l.suspendedLanes, e = l.pingedLanes, u = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
      var i = 31 - ft(n), c = 1 << i, f = u[i];
      f === -1 ? ((c & a) === 0 || (c & e) !== 0) && (u[i] = kr(c, t)) : f <= t && (l.expiredLanes |= c), n &= ~c;
    }
    if (t = Tl, a = P, a = Mu(
      l,
      l === t ? a : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e = l.callbackNode, a === 0 || l === t && (dl === 2 || dl === 9) || l.cancelPendingCommit !== null)
      return e !== null && e !== null && Jn(e), l.callbackNode = null, l.callbackPriority = 0;
    if ((a & 3) === 0 || De(l, a)) {
      if (t = a & -a, t === l.callbackPriority) return t;
      switch (e !== null && Jn(e), Wn(a)) {
        case 2:
        case 8:
          a = gf;
          break;
        case 32:
          a = zu;
          break;
        case 268435456:
          a = Sf;
          break;
        default:
          a = zu;
      }
      return e = Nd.bind(null, l), a = Kn(a, e), l.callbackPriority = t, l.callbackNode = a, t;
    }
    return e !== null && e !== null && Jn(e), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function Nd(l, t) {
    if (Yl !== 0 && Yl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var a = l.callbackNode;
    if (En() && l.callbackNode !== a)
      return null;
    var e = P;
    return e = Mu(
      l,
      l === Tl ? e : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), e === 0 ? null : (od(l, e, t), Dd(l, it()), l.callbackNode != null && l.callbackNode === a ? Nd.bind(null, l) : null);
  }
  function Ud(l, t) {
    if (En()) return null;
    od(l, t, !0);
  }
  function Ay() {
    By(function() {
      (sl & 6) !== 0 ? Kn(
        vf,
        zy
      ) : Md();
    });
  }
  function xc() {
    if (va === 0) {
      var l = ie;
      l === 0 && (l = Au, Au <<= 1, (Au & 261888) === 0 && (Au = 256)), va = l;
    }
    return va;
  }
  function Cd(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Cu("" + l);
  }
  function jd(l, t) {
    var a = t.ownerDocument.createElement("input");
    return a.name = t.name, a.value = t.value, l.id && a.setAttribute("form", l.id), t.parentNode.insertBefore(a, t), l = new FormData(l), a.parentNode.removeChild(a), l;
  }
  function _y(l, t, a, e, u) {
    if (t === "submit" && a && a.stateNode === u) {
      var n = Cd(
        (u[Pl] || null).action
      ), i = e.submitter;
      i && (t = (t = i[Pl] || null) ? Cd(t.formAction) : i.getAttribute("formAction"), t !== null && (n = t, i = null));
      var c = new xu(
        "action",
        "action",
        null,
        e,
        u
      );
      l.push({
        event: c,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (e.defaultPrevented) {
                if (va !== 0) {
                  var f = i ? jd(u, i) : new FormData(u);
                  tc(
                    a,
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
                typeof n == "function" && (c.preventDefault(), f = i ? jd(u, i) : new FormData(u), tc(
                  a,
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
  for (var Bc = 0; Bc < Si.length; Bc++) {
    var qc = Si[Bc], Oy = qc.toLowerCase(), My = qc[0].toUpperCase() + qc.slice(1);
    Ot(
      Oy,
      "on" + My
    );
  }
  Ot(fs, "onAnimationEnd"), Ot(ss, "onAnimationIteration"), Ot(os, "onAnimationStart"), Ot("dblclick", "onDoubleClick"), Ot("focusin", "onFocus"), Ot("focusout", "onBlur"), Ot(Lm, "onTransitionRun"), Ot(Vm, "onTransitionStart"), Ot(Km, "onTransitionCancel"), Ot(ds, "onTransitionEnd"), Ja("onMouseEnter", ["mouseout", "mouseover"]), Ja("onMouseLeave", ["mouseout", "mouseover"]), Ja("onPointerEnter", ["pointerout", "pointerover"]), Ja("onPointerLeave", ["pointerout", "pointerover"]), _a(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _a(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _a("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _a(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _a(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _a(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ou = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Dy = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ou)
  );
  function Rd(l, t) {
    t = (t & 4) !== 0;
    for (var a = 0; a < l.length; a++) {
      var e = l[a], u = e.event;
      e = e.listeners;
      l: {
        var n = void 0;
        if (t)
          for (var i = e.length - 1; 0 <= i; i--) {
            var c = e[i], f = c.instance, h = c.currentTarget;
            if (c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (p) {
              Yu(p);
            }
            u.currentTarget = null, n = f;
          }
        else
          for (i = 0; i < e.length; i++) {
            if (c = e[i], f = c.instance, h = c.currentTarget, c = c.listener, f !== n && u.isPropagationStopped())
              break l;
            n = c, u.currentTarget = h;
            try {
              n(u);
            } catch (p) {
              Yu(p);
            }
            u.currentTarget = null, n = f;
          }
      }
    }
  }
  function I(l, t) {
    var a = t[kn];
    a === void 0 && (a = t[kn] = /* @__PURE__ */ new Set());
    var e = l + "__bubble";
    a.has(e) || (Hd(t, l, 2, !1), a.add(e));
  }
  function Yc(l, t, a) {
    var e = 0;
    t && (e |= 4), Hd(
      a,
      l,
      e,
      t
    );
  }
  var _n = "_reactListening" + Math.random().toString(36).slice(2);
  function Gc(l) {
    if (!l[_n]) {
      l[_n] = !0, Of.forEach(function(a) {
        a !== "selectionchange" && (Dy.has(a) || Yc(a, !1, l), Yc(a, !0, l));
      });
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[_n] || (t[_n] = !0, Yc("selectionchange", !1, t));
    }
  }
  function Hd(l, t, a, e) {
    switch (sr(t)) {
      case 2:
        var u = ah;
        break;
      case 8:
        u = eh;
        break;
      default:
        u = lf;
    }
    a = u.bind(
      null,
      t,
      a,
      l
    ), u = void 0, !ni || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), e ? u !== void 0 ? l.addEventListener(t, a, {
      capture: !0,
      passive: u
    }) : l.addEventListener(t, a, !0) : u !== void 0 ? l.addEventListener(t, a, {
      passive: u
    }) : l.addEventListener(t, a, !1);
  }
  function Xc(l, t, a, e, u) {
    var n = e;
    if ((t & 1) === 0 && (t & 2) === 0 && e !== null)
      l: for (; ; ) {
        if (e === null) return;
        var i = e.tag;
        if (i === 3 || i === 4) {
          var c = e.stateNode.containerInfo;
          if (c === u) break;
          if (i === 4)
            for (i = e.return; i !== null; ) {
              var f = i.tag;
              if ((f === 3 || f === 4) && i.stateNode.containerInfo === u)
                return;
              i = i.return;
            }
          for (; c !== null; ) {
            if (i = La(c), i === null) return;
            if (f = i.tag, f === 5 || f === 6 || f === 26 || f === 27) {
              e = n = i;
              continue l;
            }
            c = c.parentNode;
          }
        }
        e = e.return;
      }
    Yf(function() {
      var h = n, p = ei(a), A = [];
      l: {
        var v = rs.get(l);
        if (v !== void 0) {
          var g = xu, B = l;
          switch (l) {
            case "keypress":
              if (Ru(a) === 0) break l;
            case "keydown":
            case "keyup":
              g = Tm;
              break;
            case "focusin":
              B = "focus", g = si;
              break;
            case "focusout":
              B = "blur", g = si;
              break;
            case "beforeblur":
            case "afterblur":
              g = si;
              break;
            case "click":
              if (a.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              g = Qf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              g = sm;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              g = Am;
              break;
            case fs:
            case ss:
            case os:
              g = rm;
              break;
            case ds:
              g = Om;
              break;
            case "scroll":
            case "scrollend":
              g = cm;
              break;
            case "wheel":
              g = Dm;
              break;
            case "copy":
            case "cut":
            case "paste":
              g = ym;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              g = Lf;
              break;
            case "toggle":
            case "beforetoggle":
              g = Um;
          }
          var Q = (t & 4) !== 0, Sl = !Q && (l === "scroll" || l === "scrollend"), m = Q ? v !== null ? v + "Capture" : null : v;
          Q = [];
          for (var o = h, y; o !== null; ) {
            var E = o;
            if (y = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || y === null || m === null || (E = je(o, m), E != null && Q.push(
              du(o, E, y)
            )), Sl) break;
            o = o.return;
          }
          0 < Q.length && (v = new g(
            v,
            B,
            null,
            a,
            p
          ), A.push({ event: v, listeners: Q }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (v = l === "mouseover" || l === "pointerover", g = l === "mouseout" || l === "pointerout", v && a !== ai && (B = a.relatedTarget || a.fromElement) && (La(B) || B[Za]))
            break l;
          if ((g || v) && (v = p.window === p ? p : (v = p.ownerDocument) ? v.defaultView || v.parentWindow : window, g ? (B = a.relatedTarget || a.toElement, g = h, B = B ? La(B) : null, B !== null && (Sl = N(B), Q = B.tag, B !== Sl || Q !== 5 && Q !== 27 && Q !== 6) && (B = null)) : (g = null, B = h), g !== B)) {
            if (Q = Qf, E = "onMouseLeave", m = "onMouseEnter", o = "mouse", (l === "pointerout" || l === "pointerover") && (Q = Lf, E = "onPointerLeave", m = "onPointerEnter", o = "pointer"), Sl = g == null ? v : Ce(g), y = B == null ? v : Ce(B), v = new Q(
              E,
              o + "leave",
              g,
              a,
              p
            ), v.target = Sl, v.relatedTarget = y, E = null, La(p) === h && (Q = new Q(
              m,
              o + "enter",
              B,
              a,
              p
            ), Q.target = y, Q.relatedTarget = Sl, E = Q), Sl = E, g && B)
              t: {
                for (Q = Ny, m = g, o = B, y = 0, E = m; E; E = Q(E))
                  y++;
                E = 0;
                for (var X = o; X; X = Q(X))
                  E++;
                for (; 0 < y - E; )
                  m = Q(m), y--;
                for (; 0 < E - y; )
                  o = Q(o), E--;
                for (; y--; ) {
                  if (m === o || o !== null && m === o.alternate) {
                    Q = m;
                    break t;
                  }
                  m = Q(m), o = Q(o);
                }
                Q = null;
              }
            else Q = null;
            g !== null && xd(
              A,
              v,
              g,
              Q,
              !1
            ), B !== null && Sl !== null && xd(
              A,
              Sl,
              B,
              Q,
              !0
            );
          }
        }
        l: {
          if (v = h ? Ce(h) : window, g = v.nodeName && v.nodeName.toLowerCase(), g === "select" || g === "input" && v.type === "file")
            var nl = Ff;
          else if (Wf(v))
            if (If)
              nl = Xm;
            else {
              nl = Ym;
              var G = qm;
            }
          else
            g = v.nodeName, !g || g.toLowerCase() !== "input" || v.type !== "checkbox" && v.type !== "radio" ? h && ti(h.elementType) && (nl = Ff) : nl = Gm;
          if (nl && (nl = nl(l, h))) {
            kf(
              A,
              nl,
              a,
              p
            );
            break l;
          }
          G && G(l, v, h), l === "focusout" && h && v.type === "number" && h.memoizedProps.value != null && li(v, "number", v.value);
        }
        switch (G = h ? Ce(h) : window, l) {
          case "focusin":
            (Wf(G) || G.contentEditable === "true") && (Ia = G, hi = h, Xe = null);
            break;
          case "focusout":
            Xe = hi = Ia = null;
            break;
          case "mousedown":
            vi = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            vi = !1, is(A, a, p);
            break;
          case "selectionchange":
            if (Zm) break;
          case "keydown":
          case "keyup":
            is(A, a, p);
        }
        var $;
        if (di)
          l: {
            switch (l) {
              case "compositionstart":
                var ll = "onCompositionStart";
                break l;
              case "compositionend":
                ll = "onCompositionEnd";
                break l;
              case "compositionupdate":
                ll = "onCompositionUpdate";
                break l;
            }
            ll = void 0;
          }
        else
          Fa ? wf(l, a) && (ll = "onCompositionEnd") : l === "keydown" && a.keyCode === 229 && (ll = "onCompositionStart");
        ll && (Vf && a.locale !== "ko" && (Fa || ll !== "onCompositionStart" ? ll === "onCompositionEnd" && Fa && ($ = Gf()) : (la = p, ii = "value" in la ? la.value : la.textContent, Fa = !0)), G = On(h, ll), 0 < G.length && (ll = new Zf(
          ll,
          l,
          null,
          a,
          p
        ), A.push({ event: ll, listeners: G }), $ ? ll.data = $ : ($ = $f(a), $ !== null && (ll.data = $)))), ($ = jm ? Rm(l, a) : Hm(l, a)) && (ll = On(h, "onBeforeInput"), 0 < ll.length && (G = new Zf(
          "onBeforeInput",
          "beforeinput",
          null,
          a,
          p
        ), A.push({
          event: G,
          listeners: ll
        }), G.data = $)), _y(
          A,
          l,
          h,
          a,
          p
        );
      }
      Rd(A, t);
    });
  }
  function du(l, t, a) {
    return {
      instance: l,
      listener: t,
      currentTarget: a
    };
  }
  function On(l, t) {
    for (var a = t + "Capture", e = []; l !== null; ) {
      var u = l, n = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || n === null || (u = je(l, a), u != null && e.unshift(
        du(l, u, n)
      ), u = je(l, t), u != null && e.push(
        du(l, u, n)
      )), l.tag === 3) return e;
      l = l.return;
    }
    return [];
  }
  function Ny(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function xd(l, t, a, e, u) {
    for (var n = t._reactName, i = []; a !== null && a !== e; ) {
      var c = a, f = c.alternate, h = c.stateNode;
      if (c = c.tag, f !== null && f === e) break;
      c !== 5 && c !== 26 && c !== 27 || h === null || (f = h, u ? (h = je(a, n), h != null && i.unshift(
        du(a, h, f)
      )) : u || (h = je(a, n), h != null && i.push(
        du(a, h, f)
      ))), a = a.return;
    }
    i.length !== 0 && l.push({ event: t, listeners: i });
  }
  var Uy = /\r\n?/g, Cy = /\u0000|\uFFFD/g;
  function Bd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Uy, `
`).replace(Cy, "");
  }
  function qd(l, t) {
    return t = Bd(t), Bd(l) === t;
  }
  function gl(l, t, a, e, u, n) {
    switch (a) {
      case "children":
        typeof e == "string" ? t === "body" || t === "textarea" && e === "" || $a(l, e) : (typeof e == "number" || typeof e == "bigint") && t !== "body" && $a(l, "" + e);
        break;
      case "className":
        Nu(l, "class", e);
        break;
      case "tabIndex":
        Nu(l, "tabindex", e);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Nu(l, a, e);
        break;
      case "style":
        Bf(l, e, n);
        break;
      case "data":
        if (t !== "object") {
          Nu(l, "data", e);
          break;
        }
      case "src":
      case "href":
        if (e === "" && (t !== "a" || a !== "href")) {
          l.removeAttribute(a);
          break;
        }
        if (e == null || typeof e == "function" || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Cu("" + e), l.setAttribute(a, e);
        break;
      case "action":
      case "formAction":
        if (typeof e == "function") {
          l.setAttribute(
            a,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof n == "function" && (a === "formAction" ? (t !== "input" && gl(l, t, "name", u.name, u, null), gl(
            l,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), gl(
            l,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), gl(
            l,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (gl(l, t, "encType", u.encType, u, null), gl(l, t, "method", u.method, u, null), gl(l, t, "target", u.target, u, null)));
        if (e == null || typeof e == "symbol" || typeof e == "boolean") {
          l.removeAttribute(a);
          break;
        }
        e = Cu("" + e), l.setAttribute(a, e);
        break;
      case "onClick":
        e != null && (l.onclick = xt);
        break;
      case "onScroll":
        e != null && I("scroll", l);
        break;
      case "onScrollEnd":
        e != null && I("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(s(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = a;
          }
        }
        break;
      case "multiple":
        l.multiple = e && typeof e != "function" && typeof e != "symbol";
        break;
      case "muted":
        l.muted = e && typeof e != "function" && typeof e != "symbol";
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
        if (e == null || typeof e == "function" || typeof e == "boolean" || typeof e == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        a = Cu("" + e), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          a
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
        e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "" + e) : l.removeAttribute(a);
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
        e && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, "") : l.removeAttribute(a);
        break;
      case "capture":
      case "download":
        e === !0 ? l.setAttribute(a, "") : e !== !1 && e != null && typeof e != "function" && typeof e != "symbol" ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        e != null && typeof e != "function" && typeof e != "symbol" && !isNaN(e) && 1 <= e ? l.setAttribute(a, e) : l.removeAttribute(a);
        break;
      case "rowSpan":
      case "start":
        e == null || typeof e == "function" || typeof e == "symbol" || isNaN(e) ? l.removeAttribute(a) : l.setAttribute(a, e);
        break;
      case "popover":
        I("beforetoggle", l), I("toggle", l), Du(l, "popover", e);
        break;
      case "xlinkActuate":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          e
        );
        break;
      case "xlinkArcrole":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          e
        );
        break;
      case "xlinkRole":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          e
        );
        break;
      case "xlinkShow":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          e
        );
        break;
      case "xlinkTitle":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          e
        );
        break;
      case "xlinkType":
        Ht(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          e
        );
        break;
      case "xmlBase":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          e
        );
        break;
      case "xmlLang":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          e
        );
        break;
      case "xmlSpace":
        Ht(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          e
        );
        break;
      case "is":
        Du(l, "is", e);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (a = nm.get(a) || a, Du(l, a, e));
    }
  }
  function Qc(l, t, a, e, u, n) {
    switch (a) {
      case "style":
        Bf(l, e, n);
        break;
      case "dangerouslySetInnerHTML":
        if (e != null) {
          if (typeof e != "object" || !("__html" in e))
            throw Error(s(61));
          if (a = e.__html, a != null) {
            if (u.children != null) throw Error(s(60));
            l.innerHTML = a;
          }
        }
        break;
      case "children":
        typeof e == "string" ? $a(l, e) : (typeof e == "number" || typeof e == "bigint") && $a(l, "" + e);
        break;
      case "onScroll":
        e != null && I("scroll", l);
        break;
      case "onScrollEnd":
        e != null && I("scrollend", l);
        break;
      case "onClick":
        e != null && (l.onclick = xt);
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
        if (!Mf.hasOwnProperty(a))
          l: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), t = a.slice(2, u ? a.length - 7 : void 0), n = l[Pl] || null, n = n != null ? n[a] : null, typeof n == "function" && l.removeEventListener(t, n, u), typeof e == "function")) {
              typeof n != "function" && n !== null && (a in l ? l[a] = null : l.hasAttribute(a) && l.removeAttribute(a)), l.addEventListener(t, e, u);
              break l;
            }
            a in l ? l[a] = e : e === !0 ? l.setAttribute(a, "") : Du(l, a, e);
          }
    }
  }
  function wl(l, t, a) {
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
        var e = !1, u = !1, n;
        for (n in a)
          if (a.hasOwnProperty(n)) {
            var i = a[n];
            if (i != null)
              switch (n) {
                case "src":
                  e = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, t));
                default:
                  gl(l, t, n, i, a, null);
              }
          }
        u && gl(l, t, "srcSet", a.srcSet, a, null), e && gl(l, t, "src", a.src, a, null);
        return;
      case "input":
        I("invalid", l);
        var c = n = i = u = null, f = null, h = null;
        for (e in a)
          if (a.hasOwnProperty(e)) {
            var p = a[e];
            if (p != null)
              switch (e) {
                case "name":
                  u = p;
                  break;
                case "type":
                  i = p;
                  break;
                case "checked":
                  f = p;
                  break;
                case "defaultChecked":
                  h = p;
                  break;
                case "value":
                  n = p;
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
                  gl(l, t, e, p, a, null);
              }
          }
        jf(
          l,
          n,
          c,
          f,
          h,
          i,
          u,
          !1
        );
        return;
      case "select":
        I("invalid", l), e = i = n = null;
        for (u in a)
          if (a.hasOwnProperty(u) && (c = a[u], c != null))
            switch (u) {
              case "value":
                n = c;
                break;
              case "defaultValue":
                i = c;
                break;
              case "multiple":
                e = c;
              default:
                gl(l, t, u, c, a, null);
            }
        t = n, a = i, l.multiple = !!e, t != null ? wa(l, !!e, t, !1) : a != null && wa(l, !!e, a, !0);
        return;
      case "textarea":
        I("invalid", l), n = u = e = null;
        for (i in a)
          if (a.hasOwnProperty(i) && (c = a[i], c != null))
            switch (i) {
              case "value":
                e = c;
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
                gl(l, t, i, c, a, null);
            }
        Hf(l, e, u, n);
        return;
      case "option":
        for (f in a)
          if (a.hasOwnProperty(f) && (e = a[f], e != null))
            switch (f) {
              case "selected":
                l.selected = e && typeof e != "function" && typeof e != "symbol";
                break;
              default:
                gl(l, t, f, e, a, null);
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
        for (e = 0; e < ou.length; e++)
          I(ou[e], l);
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
        for (h in a)
          if (a.hasOwnProperty(h) && (e = a[h], e != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, t));
              default:
                gl(l, t, h, e, a, null);
            }
        return;
      default:
        if (ti(t)) {
          for (p in a)
            a.hasOwnProperty(p) && (e = a[p], e !== void 0 && Qc(
              l,
              t,
              p,
              e,
              a,
              void 0
            ));
          return;
        }
    }
    for (c in a)
      a.hasOwnProperty(c) && (e = a[c], e != null && gl(l, t, c, e, a, null));
  }
  function jy(l, t, a, e) {
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
        var u = null, n = null, i = null, c = null, f = null, h = null, p = null;
        for (g in a) {
          var A = a[g];
          if (a.hasOwnProperty(g) && A != null)
            switch (g) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                f = A;
              default:
                e.hasOwnProperty(g) || gl(l, t, g, null, e, A);
            }
        }
        for (var v in e) {
          var g = e[v];
          if (A = a[v], e.hasOwnProperty(v) && (g != null || A != null))
            switch (v) {
              case "type":
                n = g;
                break;
              case "name":
                u = g;
                break;
              case "checked":
                h = g;
                break;
              case "defaultChecked":
                p = g;
                break;
              case "value":
                i = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(s(137, t));
                break;
              default:
                g !== A && gl(
                  l,
                  t,
                  v,
                  g,
                  e,
                  A
                );
            }
        }
        Pn(
          l,
          i,
          c,
          f,
          h,
          p,
          n,
          u
        );
        return;
      case "select":
        g = i = c = v = null;
        for (n in a)
          if (f = a[n], a.hasOwnProperty(n) && f != null)
            switch (n) {
              case "value":
                break;
              case "multiple":
                g = f;
              default:
                e.hasOwnProperty(n) || gl(
                  l,
                  t,
                  n,
                  null,
                  e,
                  f
                );
            }
        for (u in e)
          if (n = e[u], f = a[u], e.hasOwnProperty(u) && (n != null || f != null))
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
                n !== f && gl(
                  l,
                  t,
                  u,
                  n,
                  e,
                  f
                );
            }
        t = c, a = i, e = g, v != null ? wa(l, !!a, v, !1) : !!e != !!a && (t != null ? wa(l, !!a, t, !0) : wa(l, !!a, a ? [] : "", !1));
        return;
      case "textarea":
        g = v = null;
        for (c in a)
          if (u = a[c], a.hasOwnProperty(c) && u != null && !e.hasOwnProperty(c))
            switch (c) {
              case "value":
                break;
              case "children":
                break;
              default:
                gl(l, t, c, null, e, u);
            }
        for (i in e)
          if (u = e[i], n = a[i], e.hasOwnProperty(i) && (u != null || n != null))
            switch (i) {
              case "value":
                v = u;
                break;
              case "defaultValue":
                g = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== n && gl(l, t, i, u, e, n);
            }
        Rf(l, v, g);
        return;
      case "option":
        for (var B in a)
          if (v = a[B], a.hasOwnProperty(B) && v != null && !e.hasOwnProperty(B))
            switch (B) {
              case "selected":
                l.selected = !1;
                break;
              default:
                gl(
                  l,
                  t,
                  B,
                  null,
                  e,
                  v
                );
            }
        for (f in e)
          if (v = e[f], g = a[f], e.hasOwnProperty(f) && v !== g && (v != null || g != null))
            switch (f) {
              case "selected":
                l.selected = v && typeof v != "function" && typeof v != "symbol";
                break;
              default:
                gl(
                  l,
                  t,
                  f,
                  v,
                  e,
                  g
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
        for (var Q in a)
          v = a[Q], a.hasOwnProperty(Q) && v != null && !e.hasOwnProperty(Q) && gl(l, t, Q, null, e, v);
        for (h in e)
          if (v = e[h], g = a[h], e.hasOwnProperty(h) && v !== g && (v != null || g != null))
            switch (h) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null)
                  throw Error(s(137, t));
                break;
              default:
                gl(
                  l,
                  t,
                  h,
                  v,
                  e,
                  g
                );
            }
        return;
      default:
        if (ti(t)) {
          for (var Sl in a)
            v = a[Sl], a.hasOwnProperty(Sl) && v !== void 0 && !e.hasOwnProperty(Sl) && Qc(
              l,
              t,
              Sl,
              void 0,
              e,
              v
            );
          for (p in e)
            v = e[p], g = a[p], !e.hasOwnProperty(p) || v === g || v === void 0 && g === void 0 || Qc(
              l,
              t,
              p,
              v,
              e,
              g
            );
          return;
        }
    }
    for (var m in a)
      v = a[m], a.hasOwnProperty(m) && v != null && !e.hasOwnProperty(m) && gl(l, t, m, null, e, v);
    for (A in e)
      v = e[A], g = a[A], !e.hasOwnProperty(A) || v === g || v == null && g == null || gl(l, t, A, v, e, g);
  }
  function Yd(l) {
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
  function Ry() {
    if (typeof performance.getEntriesByType == "function") {
      for (var l = 0, t = 0, a = performance.getEntriesByType("resource"), e = 0; e < a.length; e++) {
        var u = a[e], n = u.transferSize, i = u.initiatorType, c = u.duration;
        if (n && c && Yd(i)) {
          for (i = 0, c = u.responseEnd, e += 1; e < a.length; e++) {
            var f = a[e], h = f.startTime;
            if (h > c) break;
            var p = f.transferSize, A = f.initiatorType;
            p && Yd(A) && (f = f.responseEnd, i += p * (f < c ? 1 : (c - h) / (f - h)));
          }
          if (--e, t += 8 * (n + i) / (u.duration / 1e3), l++, 10 < l) break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
  }
  var Zc = null, Lc = null;
  function Mn(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Gd(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Xd(l, t) {
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
  function Hy() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Kc ? !1 : (Kc = l, !0) : (Kc = null, !1);
  }
  var Qd = typeof setTimeout == "function" ? setTimeout : void 0, xy = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = typeof Promise == "function" ? Promise : void 0, By = typeof queueMicrotask == "function" ? queueMicrotask : typeof Zd < "u" ? function(l) {
    return Zd.resolve(null).then(l).catch(qy);
  } : Qd;
  function qy(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function ga(l) {
    return l === "head";
  }
  function Ld(l, t) {
    var a = t, e = 0;
    do {
      var u = a.nextSibling;
      if (l.removeChild(a), u && u.nodeType === 8)
        if (a = u.data, a === "/$" || a === "/&") {
          if (e === 0) {
            l.removeChild(u), _e(t);
            return;
          }
          e--;
        } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&")
          e++;
        else if (a === "html")
          ru(l.ownerDocument.documentElement);
        else if (a === "head") {
          a = l.ownerDocument.head, ru(a);
          for (var n = a.firstChild; n; ) {
            var i = n.nextSibling, c = n.nodeName;
            n[Ue] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || a.removeChild(n), n = i;
          }
        } else
          a === "body" && ru(l.ownerDocument.body);
      a = u;
    } while (a);
    _e(t);
  }
  function Vd(l, t) {
    var a = l;
    l = 0;
    do {
      var e = a.nextSibling;
      if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display = "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") === "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a.nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), e && e.nodeType === 8)
        if (a = e.data, a === "/$") {
          if (l === 0) break;
          l--;
        } else
          a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || l++;
      a = e;
    } while (a);
  }
  function Jc(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var a = t;
      switch (t = t.nextSibling, a.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Jc(a), Fn(a);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (a.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(a);
    }
  }
  function Yy(l, t, a, e) {
    for (; l.nodeType === 1; ) {
      var u = a;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!e && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (e) {
        if (!l[Ue])
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
  function Gy(l, t, a) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = At(l.nextSibling), l === null)) return null;
    return l;
  }
  function Kd(l, t) {
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
  function Xy(l, t) {
    var a = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || a.readyState !== "loading")
      t();
    else {
      var e = function() {
        t(), a.removeEventListener("DOMContentLoaded", e);
      };
      a.addEventListener("DOMContentLoaded", e), l._reactRetry = e;
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
  function Jd(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "/$" || a === "/&") {
          if (t === 0)
            return At(l.nextSibling);
          t--;
        } else
          a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function wd(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var a = l.data;
        if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
          if (t === 0) return l;
          t--;
        } else a !== "/$" && a !== "/&" || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function $d(l, t, a) {
    switch (t = Mn(a), l) {
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
  function ru(l) {
    for (var t = l.attributes; t.length; )
      l.removeAttributeNode(t[0]);
    Fn(l);
  }
  var _t = /* @__PURE__ */ new Map(), Wd = /* @__PURE__ */ new Set();
  function Dn(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Ft = R.d;
  R.d = {
    f: Qy,
    r: Zy,
    D: Ly,
    C: Vy,
    L: Ky,
    m: Jy,
    X: $y,
    S: wy,
    M: Wy
  };
  function Qy() {
    var l = Ft.f(), t = pn();
    return l || t;
  }
  function Zy(l) {
    var t = Va(l);
    t !== null && t.tag === 5 && t.type === "form" ? ro(t) : Ft.r(l);
  }
  var Ee = typeof document > "u" ? null : document;
  function kd(l, t, a) {
    var e = Ee;
    if (e && typeof t == "string" && t) {
      var u = gt(t);
      u = 'link[rel="' + l + '"][href="' + u + '"]', typeof a == "string" && (u += '[crossorigin="' + a + '"]'), Wd.has(u) || (Wd.add(u), l = { rel: l, crossOrigin: a, href: t }, e.querySelector(u) === null && (t = e.createElement("link"), wl(t, "link", l), Ql(t), e.head.appendChild(t)));
    }
  }
  function Ly(l) {
    Ft.D(l), kd("dns-prefetch", l, null);
  }
  function Vy(l, t) {
    Ft.C(l, t), kd("preconnect", l, t);
  }
  function Ky(l, t, a) {
    Ft.L(l, t, a);
    var e = Ee;
    if (e && l && t) {
      var u = 'link[rel="preload"][as="' + gt(t) + '"]';
      t === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + gt(
        a.imageSrcSet
      ) + '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + gt(
        a.imageSizes
      ) + '"]')) : u += '[href="' + gt(l) + '"]';
      var n = u;
      switch (t) {
        case "style":
          n = ze(l);
          break;
        case "script":
          n = Ae(l);
      }
      _t.has(n) || (l = j(
        {
          rel: "preload",
          href: t === "image" && a && a.imageSrcSet ? void 0 : l,
          as: t
        },
        a
      ), _t.set(n, l), e.querySelector(u) !== null || t === "style" && e.querySelector(mu(n)) || t === "script" && e.querySelector(yu(n)) || (t = e.createElement("link"), wl(t, "link", l), Ql(t), e.head.appendChild(t)));
    }
  }
  function Jy(l, t) {
    Ft.m(l, t);
    var a = Ee;
    if (a && l) {
      var e = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + gt(e) + '"][href="' + gt(l) + '"]', n = u;
      switch (e) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          n = Ae(l);
      }
      if (!_t.has(n) && (l = j({ rel: "modulepreload", href: l }, t), _t.set(n, l), a.querySelector(u) === null)) {
        switch (e) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (a.querySelector(yu(n)))
              return;
        }
        e = a.createElement("link"), wl(e, "link", l), Ql(e), a.head.appendChild(e);
      }
    }
  }
  function wy(l, t, a) {
    Ft.S(l, t, a);
    var e = Ee;
    if (e && l) {
      var u = Ka(e).hoistableStyles, n = ze(l);
      t = t || "default";
      var i = u.get(n);
      if (!i) {
        var c = { loading: 0, preload: null };
        if (i = e.querySelector(
          mu(n)
        ))
          c.loading = 5;
        else {
          l = j(
            { rel: "stylesheet", href: l, "data-precedence": t },
            a
          ), (a = _t.get(n)) && kc(l, a);
          var f = i = e.createElement("link");
          Ql(f), wl(f, "link", l), f._p = new Promise(function(h, p) {
            f.onload = h, f.onerror = p;
          }), f.addEventListener("load", function() {
            c.loading |= 1;
          }), f.addEventListener("error", function() {
            c.loading |= 2;
          }), c.loading |= 4, Nn(i, t, e);
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
  function $y(l, t) {
    Ft.X(l, t);
    var a = Ee;
    if (a && l) {
      var e = Ka(a).hoistableScripts, u = Ae(l), n = e.get(u);
      n || (n = a.querySelector(yu(u)), n || (l = j({ src: l, async: !0 }, t), (t = _t.get(u)) && Fc(l, t), n = a.createElement("script"), Ql(n), wl(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function Wy(l, t) {
    Ft.M(l, t);
    var a = Ee;
    if (a && l) {
      var e = Ka(a).hoistableScripts, u = Ae(l), n = e.get(u);
      n || (n = a.querySelector(yu(u)), n || (l = j({ src: l, async: !0, type: "module" }, t), (t = _t.get(u)) && Fc(l, t), n = a.createElement("script"), Ql(n), wl(n, "link", l), a.head.appendChild(n)), n = {
        type: "script",
        instance: n,
        count: 1,
        state: null
      }, e.set(u, n));
    }
  }
  function Fd(l, t, a, e) {
    var u = (u = k.current) ? Dn(u) : null;
    if (!u) throw Error(s(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof a.precedence == "string" && typeof a.href == "string" ? (t = ze(a.href), a = Ka(
          u
        ).hoistableStyles, e = a.get(t), e || (e = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
          l = ze(a.href);
          var n = Ka(
            u
          ).hoistableStyles, i = n.get(l);
          if (i || (u = u.ownerDocument || u, i = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, n.set(l, i), (n = u.querySelector(
            mu(l)
          )) && !n._p && (i.instance = n, i.state.loading = 5), _t.has(l) || (a = {
            rel: "preload",
            as: "style",
            href: a.href,
            crossOrigin: a.crossOrigin,
            integrity: a.integrity,
            media: a.media,
            hrefLang: a.hrefLang,
            referrerPolicy: a.referrerPolicy
          }, _t.set(l, a), n || ky(
            u,
            l,
            a,
            i.state
          ))), t && e === null)
            throw Error(s(528, ""));
          return i;
        }
        if (t && e !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ae(a), a = Ka(
          u
        ).hoistableScripts, e = a.get(t), e || (e = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, a.set(t, e)), e) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, l));
    }
  }
  function ze(l) {
    return 'href="' + gt(l) + '"';
  }
  function mu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Id(l) {
    return j({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function ky(l, t, a, e) {
    l.querySelector('link[rel="preload"][as="style"][' + t + "]") ? e.loading = 1 : (t = l.createElement("link"), e.preload = t, t.addEventListener("load", function() {
      return e.loading |= 1;
    }), t.addEventListener("error", function() {
      return e.loading |= 2;
    }), wl(t, "link", a), Ql(t), l.head.appendChild(t));
  }
  function Ae(l) {
    return '[src="' + gt(l) + '"]';
  }
  function yu(l) {
    return "script[async]" + l;
  }
  function Pd(l, t, a) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var e = l.querySelector(
            'style[data-href~="' + gt(a.href) + '"]'
          );
          if (e)
            return t.instance = e, Ql(e), e;
          var u = j({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return e = (l.ownerDocument || l).createElement(
            "style"
          ), Ql(e), wl(e, "style", u), Nn(e, a.precedence, l), t.instance = e;
        case "stylesheet":
          u = ze(a.href);
          var n = l.querySelector(
            mu(u)
          );
          if (n)
            return t.state.loading |= 4, t.instance = n, Ql(n), n;
          e = Id(a), (u = _t.get(u)) && kc(e, u), n = (l.ownerDocument || l).createElement("link"), Ql(n);
          var i = n;
          return i._p = new Promise(function(c, f) {
            i.onload = c, i.onerror = f;
          }), wl(n, "link", e), t.state.loading |= 4, Nn(n, a.precedence, l), t.instance = n;
        case "script":
          return n = Ae(a.src), (u = l.querySelector(
            yu(n)
          )) ? (t.instance = u, Ql(u), u) : (e = a, (u = _t.get(n)) && (e = j({}, a), Fc(e, u)), l = l.ownerDocument || l, u = l.createElement("script"), Ql(u), wl(u, "link", e), l.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (e = t.instance, t.state.loading |= 4, Nn(e, a.precedence, l));
    return t.instance;
  }
  function Nn(l, t, a) {
    for (var e = a.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = e.length ? e[e.length - 1] : null, n = u, i = 0; i < e.length; i++) {
      var c = e[i];
      if (c.dataset.precedence === t) n = c;
      else if (n !== u) break;
    }
    n ? n.parentNode.insertBefore(l, n.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(l, t.firstChild));
  }
  function kc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.title == null && (l.title = t.title);
  }
  function Fc(l, t) {
    l.crossOrigin == null && (l.crossOrigin = t.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy), l.integrity == null && (l.integrity = t.integrity);
  }
  var Un = null;
  function lr(l, t, a) {
    if (Un === null) {
      var e = /* @__PURE__ */ new Map(), u = Un = /* @__PURE__ */ new Map();
      u.set(a, e);
    } else
      u = Un, e = u.get(a), e || (e = /* @__PURE__ */ new Map(), u.set(a, e));
    if (e.has(l)) return e;
    for (e.set(l, null), a = a.getElementsByTagName(l), u = 0; u < a.length; u++) {
      var n = a[u];
      if (!(n[Ue] || n[Ll] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
        var i = n.getAttribute(t) || "";
        i = l + i;
        var c = e.get(i);
        c ? c.push(n) : e.set(i, [n]);
      }
    }
    return e;
  }
  function tr(l, t, a) {
    l = l.ownerDocument || l, l.head.insertBefore(
      a,
      t === "title" ? l.querySelector("head > title") : null
    );
  }
  function Fy(l, t, a) {
    if (a === 1 || t.itemProp != null) return !1;
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
  function ar(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function Iy(l, t, a, e) {
    if (a.type === "stylesheet" && (typeof e.media != "string" || matchMedia(e.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var u = ze(e.href), n = t.querySelector(
          mu(u)
        );
        if (n) {
          t = n._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Cn.bind(l), t.then(l, l)), a.state.loading |= 4, a.instance = n, Ql(n);
          return;
        }
        n = t.ownerDocument || t, e = Id(e), (u = _t.get(u)) && kc(e, u), n = n.createElement("link"), Ql(n);
        var i = n;
        i._p = new Promise(function(c, f) {
          i.onload = c, i.onerror = f;
        }), wl(n, "link", e), a.instance = n;
      }
      l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(a, t), (t = a.state.preload) && (a.state.loading & 3) === 0 && (l.count++, a = Cn.bind(l), t.addEventListener("load", a), t.addEventListener("error", a));
    }
  }
  var Ic = 0;
  function Py(l, t) {
    return l.stylesheets && l.count === 0 && Rn(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(a) {
      var e = setTimeout(function() {
        if (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      }, 6e4 + t);
      0 < l.imgBytes && Ic === 0 && (Ic = 62500 * Ry());
      var u = setTimeout(
        function() {
          if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && Rn(l, l.stylesheets), l.unsuspend)) {
            var n = l.unsuspend;
            l.unsuspend = null, n();
          }
        },
        (l.imgBytes > Ic ? 50 : 800) + t
      );
      return l.unsuspend = a, function() {
        l.unsuspend = null, clearTimeout(e), clearTimeout(u);
      };
    } : null;
  }
  function Cn() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Rn(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var jn = null;
  function Rn(l, t) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, jn = /* @__PURE__ */ new Map(), t.forEach(lh, l), jn = null, Cn.call(l));
  }
  function lh(l, t) {
    if (!(t.state.loading & 4)) {
      var a = jn.get(l);
      if (a) var e = a.get(null);
      else {
        a = /* @__PURE__ */ new Map(), jn.set(l, a);
        for (var u = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), n = 0; n < u.length; n++) {
          var i = u[n];
          (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") && (a.set(i.dataset.precedence, i), e = i);
        }
        e && a.set(null, e);
      }
      u = t.instance, i = u.getAttribute("data-precedence"), n = a.get(i) || e, n === e && a.set(null, u), a.set(i, u), this.count++, e = Cn.bind(this), u.addEventListener("load", e), u.addEventListener("error", e), n ? n.parentNode.insertBefore(u, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(u, l.firstChild)), t.state.loading |= 4;
    }
  }
  var hu = {
    $$typeof: cl,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function th(l, t, a, e, u, n, i, c, f) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = wn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = wn(0), this.hiddenUpdates = wn(null), this.identifierPrefix = e, this.onUncaughtError = u, this.onCaughtError = n, this.onRecoverableError = i, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function er(l, t, a, e, u, n, i, c, f, h, p, A) {
    return l = new th(
      l,
      t,
      a,
      i,
      f,
      h,
      p,
      A,
      c
    ), t = 1, n === !0 && (t |= 24), n = ot(3, null, null, t), l.current = n, n.stateNode = l, t = Ci(), t.refCount++, l.pooledCache = t, t.refCount++, n.memoizedState = {
      element: e,
      isDehydrated: a,
      cache: t
    }, xi(n), l;
  }
  function ur(l) {
    return l ? (l = te, l) : te;
  }
  function nr(l, t, a, e, u, n) {
    u = ur(u), e.context === null ? e.context = u : e.pendingContext = u, e = ia(t), e.payload = { element: a }, n = n === void 0 ? null : n, n !== null && (e.callback = n), a = ca(l, e, t), a !== null && (nt(a, l, t), we(a, l, t));
  }
  function ir(l, t) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var a = l.retryLane;
      l.retryLane = a !== 0 && a < t ? a : t;
    }
  }
  function Pc(l, t) {
    ir(l, t), (l = l.alternate) && ir(l, t);
  }
  function cr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Na(l, 67108864);
      t !== null && nt(t, l, 67108864), Pc(l, 67108864);
    }
  }
  function fr(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = ht();
      t = $n(t);
      var a = Na(l, t);
      a !== null && nt(a, l, t), Pc(l, t);
    }
  }
  var Hn = !0;
  function ah(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = R.p;
    try {
      R.p = 2, lf(l, t, a, e);
    } finally {
      R.p = n, b.T = u;
    }
  }
  function eh(l, t, a, e) {
    var u = b.T;
    b.T = null;
    var n = R.p;
    try {
      R.p = 8, lf(l, t, a, e);
    } finally {
      R.p = n, b.T = u;
    }
  }
  function lf(l, t, a, e) {
    if (Hn) {
      var u = tf(e);
      if (u === null)
        Xc(
          l,
          t,
          e,
          xn,
          a
        ), or(l, e);
      else if (nh(
        u,
        l,
        t,
        a,
        e
      ))
        e.stopPropagation();
      else if (or(l, e), t & 4 && -1 < uh.indexOf(l)) {
        for (; u !== null; ) {
          var n = Va(u);
          if (n !== null)
            switch (n.tag) {
              case 3:
                if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                  var i = Aa(n.pendingLanes);
                  if (i !== 0) {
                    var c = n;
                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                      var f = 1 << 31 - ft(i);
                      c.entanglements[1] |= f, i &= ~f;
                    }
                    Rt(n), (sl & 6) === 0 && (gn = it() + 500, su(0));
                  }
                }
                break;
              case 31:
              case 13:
                c = Na(n, 2), c !== null && nt(c, n, 2), pn(), Pc(n, 2);
            }
          if (n = tf(e), n === null && Xc(
            l,
            t,
            e,
            xn,
            a
          ), n === u) break;
          u = n;
        }
        u !== null && e.stopPropagation();
      } else
        Xc(
          l,
          t,
          e,
          null,
          a
        );
    }
  }
  function tf(l) {
    return l = ei(l), af(l);
  }
  var xn = null;
  function af(l) {
    if (xn = null, l = La(l), l !== null) {
      var t = N(l);
      if (t === null) l = null;
      else {
        var a = t.tag;
        if (a === 13) {
          if (l = U(t), l !== null) return l;
          l = null;
        } else if (a === 31) {
          if (l = q(t), l !== null) return l;
          l = null;
        } else if (a === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return xn = l, null;
  }
  function sr(l) {
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
        switch (Lr()) {
          case vf:
            return 2;
          case gf:
            return 8;
          case zu:
          case Vr:
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
  var ef = !1, Sa = null, pa = null, ba = null, vu = /* @__PURE__ */ new Map(), gu = /* @__PURE__ */ new Map(), Ta = [], uh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function or(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        Sa = null;
        break;
      case "dragenter":
      case "dragleave":
        pa = null;
        break;
      case "mouseover":
      case "mouseout":
        ba = null;
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
  function Su(l, t, a, e, u, n) {
    return l === null || l.nativeEvent !== n ? (l = {
      blockedOn: t,
      domEventName: a,
      eventSystemFlags: e,
      nativeEvent: n,
      targetContainers: [u]
    }, t !== null && (t = Va(t), t !== null && cr(t)), l) : (l.eventSystemFlags |= e, t = l.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), l);
  }
  function nh(l, t, a, e, u) {
    switch (t) {
      case "focusin":
        return Sa = Su(
          Sa,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "dragenter":
        return pa = Su(
          pa,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "mouseover":
        return ba = Su(
          ba,
          l,
          t,
          a,
          e,
          u
        ), !0;
      case "pointerover":
        var n = u.pointerId;
        return vu.set(
          n,
          Su(
            vu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
      case "gotpointercapture":
        return n = u.pointerId, gu.set(
          n,
          Su(
            gu.get(n) || null,
            l,
            t,
            a,
            e,
            u
          )
        ), !0;
    }
    return !1;
  }
  function dr(l) {
    var t = La(l.target);
    if (t !== null) {
      var a = N(t);
      if (a !== null) {
        if (t = a.tag, t === 13) {
          if (t = U(a), t !== null) {
            l.blockedOn = t, Af(l.priority, function() {
              fr(a);
            });
            return;
          }
        } else if (t === 31) {
          if (t = q(a), t !== null) {
            l.blockedOn = t, Af(l.priority, function() {
              fr(a);
            });
            return;
          }
        } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Bn(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var a = tf(l.nativeEvent);
      if (a === null) {
        a = l.nativeEvent;
        var e = new a.constructor(
          a.type,
          a
        );
        ai = e, a.target.dispatchEvent(e), ai = null;
      } else
        return t = Va(a), t !== null && cr(t), l.blockedOn = a, !1;
      t.shift();
    }
    return !0;
  }
  function rr(l, t, a) {
    Bn(l) && a.delete(t);
  }
  function ih() {
    ef = !1, Sa !== null && Bn(Sa) && (Sa = null), pa !== null && Bn(pa) && (pa = null), ba !== null && Bn(ba) && (ba = null), vu.forEach(rr), gu.forEach(rr);
  }
  function qn(l, t) {
    l.blockedOn === t && (l.blockedOn = null, ef || (ef = !0, d.unstable_scheduleCallback(
      d.unstable_NormalPriority,
      ih
    )));
  }
  var Yn = null;
  function mr(l) {
    Yn !== l && (Yn = l, d.unstable_scheduleCallback(
      d.unstable_NormalPriority,
      function() {
        Yn === l && (Yn = null);
        for (var t = 0; t < l.length; t += 3) {
          var a = l[t], e = l[t + 1], u = l[t + 2];
          if (typeof e != "function") {
            if (af(e || a) === null)
              continue;
            break;
          }
          var n = Va(a);
          n !== null && (l.splice(t, 3), t -= 3, tc(
            n,
            {
              pending: !0,
              data: u,
              method: a.method,
              action: e
            },
            e,
            u
          ));
        }
      }
    ));
  }
  function _e(l) {
    function t(f) {
      return qn(f, l);
    }
    Sa !== null && qn(Sa, l), pa !== null && qn(pa, l), ba !== null && qn(ba, l), vu.forEach(t), gu.forEach(t);
    for (var a = 0; a < Ta.length; a++) {
      var e = Ta[a];
      e.blockedOn === l && (e.blockedOn = null);
    }
    for (; 0 < Ta.length && (a = Ta[0], a.blockedOn === null); )
      dr(a), a.blockedOn === null && Ta.shift();
    if (a = (l.ownerDocument || l).$$reactFormReplay, a != null)
      for (e = 0; e < a.length; e += 3) {
        var u = a[e], n = a[e + 1], i = u[Pl] || null;
        if (typeof n == "function")
          i || mr(a);
        else if (i) {
          var c = null;
          if (n && n.hasAttribute("formAction")) {
            if (u = n, i = n[Pl] || null)
              c = i.formAction;
            else if (af(u) !== null) continue;
          } else c = i.action;
          typeof c == "function" ? a[e + 1] = c : (a.splice(e, 3), e -= 3), mr(a);
        }
      }
  }
  function yr() {
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
      u !== null && (u(), u = null), e || setTimeout(a, 20);
    }
    function a() {
      if (!e && !navigation.transition) {
        var n = navigation.currentEntry;
        n && n.url != null && navigation.navigate(n.url, {
          state: n.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var e = !1, u = null;
      return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(a, 100), function() {
        e = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function uf(l) {
    this._internalRoot = l;
  }
  Gn.prototype.render = uf.prototype.render = function(l) {
    var t = this._internalRoot;
    if (t === null) throw Error(s(409));
    var a = t.current, e = ht();
    nr(a, e, l, t, null, null);
  }, Gn.prototype.unmount = uf.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var t = l.containerInfo;
      nr(l.current, 2, null, l, null, null), pn(), t[Za] = null;
    }
  };
  function Gn(l) {
    this._internalRoot = l;
  }
  Gn.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var t = zf();
      l = { blockedOn: null, target: l, priority: t };
      for (var a = 0; a < Ta.length && t !== 0 && t < Ta[a].priority; a++) ;
      Ta.splice(a, 0, l), a === 0 && dr(l);
    }
  };
  var hr = S.version;
  if (hr !== "19.2.7")
    throw Error(
      s(
        527,
        hr,
        "19.2.7"
      )
    );
  R.findDOMNode = function(l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
    return l = T(t), l = l !== null ? x(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var ch = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: b,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Xn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Xn.isDisabled && Xn.supportsFiber)
      try {
        Me = Xn.inject(
          ch
        ), ct = Xn;
      } catch {
      }
  }
  return bu.createRoot = function(l, t) {
    if (!M(l)) throw Error(s(299));
    var a = !1, e = "", u = Eo, n = zo, i = Ao;
    return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (e = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (n = t.onCaughtError), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = er(
      l,
      1,
      !1,
      null,
      null,
      a,
      e,
      null,
      u,
      n,
      i,
      yr
    ), l[Za] = t.current, Gc(l), new uf(t);
  }, bu.hydrateRoot = function(l, t, a) {
    if (!M(l)) throw Error(s(299));
    var e = !1, u = "", n = Eo, i = zo, c = Ao, f = null;
    return a != null && (a.unstable_strictMode === !0 && (e = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (n = a.onUncaughtError), a.onCaughtError !== void 0 && (i = a.onCaughtError), a.onRecoverableError !== void 0 && (c = a.onRecoverableError), a.formState !== void 0 && (f = a.formState)), t = er(
      l,
      1,
      !0,
      t,
      a ?? null,
      e,
      u,
      f,
      n,
      i,
      c,
      yr
    ), t.context = ur(null), a = t.current, e = ht(), e = $n(e), u = ia(e), u.callback = null, ca(a, u, e), a = e, t.current.lanes = a, Ne(t, a), Rt(t), l[Za] = t.current, Gc(l), new Gn(t);
  }, bu.version = "19.2.7", bu;
}
var _r;
function ph() {
  if (_r) return ff.exports;
  _r = 1;
  function d() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d);
      } catch (S) {
        console.error(S);
      }
  }
  return d(), ff.exports = Sh(), ff.exports;
}
var bh = ph();
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
}, Br = "settings";
function Th(d, S) {
  return {
    provider: S.provider ?? d.provider,
    models: { ...d.models, ...S.models },
    apiKeys: { ...d.apiKeys, ...S.apiKeys },
    customBaseUrl: S.customBaseUrl !== void 0 ? S.customBaseUrl : d.customBaseUrl
  };
}
function Eh(d) {
  const S = d.storage.get(Br);
  if (!S) return { ...Tu, models: { ...Tu.models }, apiKeys: {} };
  try {
    const z = JSON.parse(S);
    return Th(Tu, z);
  } catch {
    return { ...Tu, models: { ...Tu.models }, apiKeys: {} };
  }
}
function zh(d, S) {
  d.storage.set(Br, JSON.stringify(S));
}
function Ah(d, S) {
  switch (d.provider) {
    case "openai":
      return !!d.apiKeys.openai;
    case "openrouter":
      return !!d.apiKeys.openrouter;
    case "anthropic":
      return !!d.apiKeys.anthropic;
    case "openai-codex":
      return S;
    case "custom":
      return !!d.customBaseUrl;
    default:
      return !1;
  }
}
const Or = 50, qr = "conversations";
function mf(d) {
  const S = d.storage.get(qr);
  if (!S) return [];
  try {
    return JSON.parse(S);
  } catch {
    return [];
  }
}
function Yr(d, S) {
  d.storage.set(qr, JSON.stringify(S));
}
function Mr(d) {
  return mf(d).sort((S, z) => z.updatedAt - S.updatedAt);
}
function Dr(d, S) {
  const z = mf(d), s = z.findIndex((M) => M.id === S.id);
  s >= 0 ? z[s] = S : z.push(S), z.sort((M, N) => N.updatedAt - M.updatedAt), z.length > Or && z.splice(Or), Yr(d, z);
}
function _h(d, S) {
  const z = mf(d).filter((s) => s.id !== S);
  Yr(d, z);
}
function Nr(d, S) {
  const z = Date.now();
  return {
    id: crypto.randomUUID(),
    title: "",
    createdAt: z,
    updatedAt: z,
    provider: d,
    model: S,
    messages: []
  };
}
function Oh(d) {
  return d.slice(0, 40);
}
function Mh() {
  return /* @__PURE__ */ D.jsx(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      children: /* @__PURE__ */ D.jsx(
        "path",
        {
          d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
          fill: "currentColor"
        }
      )
    }
  );
}
function Dh({ onClick: d }) {
  return /* @__PURE__ */ D.jsx(
    "button",
    {
      className: "gcp-fab",
      onClick: d,
      "aria-label": "Graph Copilot",
      title: "Graph Copilot",
      children: /* @__PURE__ */ D.jsx(Mh, {})
    }
  );
}
function Ur(d, S) {
  const z = d.split(`
`);
  for (const s of z) {
    if (!s.startsWith("data: ")) continue;
    const M = s.slice(6).trim();
    if (!M || M === "[DONE]") continue;
    let N;
    try {
      N = JSON.parse(M);
    } catch {
      continue;
    }
    const U = N.type;
    if (U === "text_delta")
      S.onText(N.text ?? "");
    else if (U === "done") {
      const q = {
        message: N.message,
        stop_reason: N.stop_reason,
        usage: N.usage ?? {}
      };
      S.onDone(q);
    } else if (U === "error")
      return S.onError(N.message ?? "Unknown error from LLM proxy"), !0;
  }
  return !1;
}
async function Nh(d, S, z, s) {
  let M;
  try {
    M = await d.http.fetch("/api/llm/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(S),
      signal: s
    });
  } catch (O) {
    z.onError(`Network error: ${String(O)}`);
    return;
  }
  if (!M.ok) {
    let O = "";
    try {
      O = await M.text(), O.length > 200 && (O = O.slice(0, 200) + "...");
    } catch {
    }
    z.onError(`HTTP ${M.status}: ${O}`);
    return;
  }
  const N = M.body.getReader(), U = new TextDecoder();
  let q = "";
  try {
    for (; ; ) {
      const { done: O, value: T } = await N.read();
      if (O) break;
      q += U.decode(T, { stream: !0 }).replace(/\r\n/g, `
`);
      const x = q.split(`

`);
      q = x.pop() ?? "";
      for (const j of x) {
        if (!j.trim()) continue;
        if (Ur(j, z)) {
          N.cancel().catch(() => {
          });
          return;
        }
      }
    }
    q.trim() && Ur(q, z);
  } catch (O) {
    (O == null ? void 0 : O.name) !== "AbortError" && z.onError(`Stream read error: ${String(O)}`);
  } finally {
    N.releaseLock();
  }
}
async function Uh(d, S, z, s) {
  const M = await d.http.fetch("/api/llm/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider: S, api_key: z, base_url: s })
  });
  if (!M.ok) {
    let U = "";
    try {
      U = await M.text(), U.length > 200 && (U = U.slice(0, 200) + "...");
    } catch {
    }
    throw new Error(`HTTP ${M.status}: ${U}`);
  }
  return (await M.json()).models.map((U) => U.id);
}
async function Ch(d) {
  return (await (await d.http.fetch("/api/llm/codex/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  })).json()).auth_url;
}
async function Cr(d) {
  return await (await d.http.fetch("/api/llm/codex/status", void 0)).json();
}
async function jh(d) {
  await d.http.fetch("/api/llm/codex/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
}
const jr = 3e4;
function Rh(d) {
  const S = d.default === null || d.default === void 0 ? String(d.default) : typeof d.default == "object" ? JSON.stringify(d.default) : String(d.default), z = S.length > 60 ? S.slice(0, 60) + "..." : S;
  let s = "";
  if (d.param_type === "select" && d.options.length > 0)
    s = `{${d.options.join("|")}}`;
  else if (d.param_type === "int" || d.param_type === "float") {
    const M = d.min_value !== null, N = d.max_value !== null;
    if (M || N) {
      const U = M ? String(d.min_value) : "", q = N ? String(d.max_value) : "";
      s = `{${U}..${q}}`;
    }
  }
  return `${d.name}:${d.param_type}=${z}${s}`;
}
function Hh(d) {
  return d.map((S) => {
    const z = [];
    if (S.inputs.length > 0) {
      const M = S.inputs.map((N) => `${N.name}:${N.data_type}`).join(", ");
      z.push(`in[${M}]`);
    }
    if (S.outputs.length > 0) {
      const M = S.outputs.map((N) => `${N.name}:${N.data_type}`).join(", ");
      z.push(`out[${M}]`);
    }
    if (S.params.length > 0) {
      const M = S.params.map(Rh).join(", ");
      z.push(`params[${M}]`);
    }
    const s = z.length > 0 ? " " + z.join(" ") : "";
    return `${S.node_name} (${S.category}):${s}`;
  }).join(`
`);
}
function Gr(d) {
  const S = JSON.stringify({ nodes: d.nodes, edges: d.edges });
  if (S.length <= jr)
    return S;
  const z = jr, s = S.length;
  return S.slice(0, z) + `
[graph truncated - kept ${z} of ${s} chars]`;
}
function xh(d, S) {
  const z = Hh(d), s = Gr(S);
  return `You are Graph Copilot inside CodefyUI, a visual node-graph editor for machine-learning pipelines. You build and edit the user's graph by calling tools.

## Graph model
Nodes have a type from the catalog below, typed input/output ports, and configurable params. Edges connect an output handle to an input handle; the connected types must be compatible.

## Rules
- Use exact node-type names from the catalog.
- Connect every required input of nodes you add.
- Set params via set_params or add_node.params, respecting the declared types and ranges.
- Finish structural batches with one auto_layout op.
- Never use clear_graph unless the user explicitly asked to start over.
- If an op fails, read the error message and correct yourself before retrying.
- Prefer small batches over one enormous batch.
- Reply in the user's language.
- After applying changes, summarize what changed in one or two sentences.

## Available node types
${z}

## Current graph
${s}`;
}
const Rr = 8, Bh = [
  {
    name: "apply_graph_operations",
    description: `Apply a batch of graph edits to the canvas as ONE undo step. Failing operations are skipped and reported per-index (with an error message) so you can self-correct and retry.
Each entry in "operations" is one GraphOp object; use these EXACT field names:
- {"op":"add_node","node_type":"<exact catalog name>","ref":"<alias>","params":{...},"position":{"x":<num>,"y":<num>}} — ref/params/position optional. "ref" is a temporary alias you may use as source/target/node_id later in the SAME batch, before the real node id exists.
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
  }
];
function qh(d) {
  const S = { role: d.role, content: d.content };
  return d.tool_calls && (S.tool_calls = d.tool_calls), d.tool_call_id && (S.tool_call_id = d.tool_call_id), S;
}
function Yh(d, S) {
  const z = /* @__PURE__ */ new Map();
  d.forEach((M, N) => {
    const U = M.op, q = S[N], O = q ? q.ok : !1;
    z.has(U) || z.set(U, { ok: 0, fail: 0 });
    const T = z.get(U);
    O ? T.ok++ : T.fail++;
  });
  const s = [];
  for (const [M, N] of z) {
    const U = N.ok + N.fail;
    N.fail === 0 ? s.push(`${M} x${U} ok`) : N.ok === 0 ? s.push(`${M} x${U} FAILED`) : s.push(`${M} x${U} (${N.ok} ok, ${N.fail} FAILED)`);
  }
  return s.join(", ");
}
function Gh(d, S, z) {
  const M = { role: "system", content: xh(
    d.graph.getNodeDefinitions(),
    d.graph.getGraph()
  ) }, N = S.slice(-20).map(qh), U = { role: "user", content: z };
  return [M, ...N, U];
}
function Xh(d, S) {
  const z = d.provider, s = d.models[z] ?? "", M = {
    provider: z,
    model: s,
    messages: S,
    tools: Bh,
    max_tokens: 8192
  };
  if (z !== "openai-codex") {
    const N = z === "openai" ? d.apiKeys.openai : z === "openrouter" ? d.apiKeys.openrouter : z === "anthropic" ? d.apiKeys.anthropic : z === "custom" ? d.apiKeys.custom : void 0;
    N && (M.api_key = N);
  }
  return z === "custom" && d.customBaseUrl && (M.base_url = d.customBaseUrl), M;
}
function Qh(d, S, z, s) {
  const { name: M, arguments: N } = d;
  if (M === "apply_graph_operations") {
    const U = N.operations;
    if (!Array.isArray(U))
      return JSON.stringify({ error: "operations must be an array of GraphOp objects" });
    let q;
    try {
      q = S.graph.applyOperations(U);
    } catch (T) {
      return JSON.stringify({ error: `applyOperations threw: ${String(T)}` });
    }
    const O = Yh(U, q.results);
    return s.push(O), z.onOpsApplied(O, q), JSON.stringify({
      results: q.results,
      refs: q.refs,
      node_count: q.node_count,
      edge_count: q.edge_count
    });
  }
  return M === "get_current_graph" ? Gr(S.graph.getGraph()) : JSON.stringify({ error: `Unknown tool: ${M}` });
}
async function Zh(d) {
  const { api: S, settings: z, history: s, userText: M, callbacks: N, signal: U } = d, q = [], O = Gh(S, s, M);
  let T = 0;
  try {
    for (; ; ) {
      let x = "", j = null, V = null;
      if (await Nh(
        S,
        Xh(z, O),
        {
          onText(fl) {
            x += fl, N.onTextDelta(fl);
          },
          onDone(fl) {
            j = fl;
          },
          onError(fl) {
            V = fl;
          }
        },
        U
      ), V !== null) {
        N.onTurnsCommitted(q), N.onError(V), N.onFinished();
        return;
      }
      if (!j) {
        N.onTurnsCommitted(q), N.onFinished();
        return;
      }
      const pl = j, ml = pl.message.tool_calls ?? [], W = pl.message.content || x;
      if (pl.stop_reason === "end" || ml.length === 0) {
        const fl = { role: "assistant", content: W };
        q.push(fl), N.onTurnsCommitted(q), N.onFinished();
        return;
      }
      T++;
      const yl = [], tl = [], Bl = [];
      for (const fl of ml) {
        const Dl = Qh(fl, S, N, yl), w = {
          role: "tool",
          content: Dl,
          tool_call_id: fl.id
        };
        tl.push(w), Bl.push({
          role: "tool",
          content: Dl,
          tool_call_id: fl.id
        });
      }
      const cl = {
        role: "assistant",
        content: W,
        tool_calls: ml
      };
      yl.length > 0 && (cl.opsSummary = yl.join("; ")), q.push(cl), q.push(...tl);
      const ql = {
        role: "assistant",
        content: W,
        tool_calls: ml
      };
      if (O.push(ql), O.push(...Bl), T >= Rr) {
        const fl = {
          role: "assistant",
          content: `(stopped after ${Rr} tool rounds)`
        };
        q.push(fl), N.onTurnsCommitted(q), N.onFinished();
        return;
      }
    }
  } catch (x) {
    N.onTurnsCommitted(q), N.onError(String(x)), N.onFinished();
  }
}
function Lh(d) {
  const S = d.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g), z = [];
  return S.forEach((s, M) => {
    if (s.startsWith("```")) {
      const N = s.replace(/^```[^\n]*\n?/, "").replace(/```$/, "");
      z.push(/* @__PURE__ */ D.jsx("pre", { children: /* @__PURE__ */ D.jsx("code", { children: N }) }, M));
    } else s && z.push(/* @__PURE__ */ D.jsx("span", { children: s }, M));
  }), z;
}
function Hr({
  turn: d,
  streaming: S = !1,
  streamingText: z,
  error: s = null,
  onRetry: M,
  retryDisabled: N = !1
}) {
  if (d.role === "tool") return null;
  const U = d.role === "user", q = S && z !== void 0 ? z : d.content;
  return /* @__PURE__ */ D.jsxs("div", { className: `gcp-msg-row ${U ? "user" : "assistant"}`, children: [
    /* @__PURE__ */ D.jsxs("div", { className: `gcp-bubble${s ? " error" : ""}`, children: [
      Lh(q),
      S && /* @__PURE__ */ D.jsx("span", { className: "gcp-caret", "aria-hidden": "true" })
    ] }),
    !U && d.opsSummary && /* @__PURE__ */ D.jsx("div", { className: "gcp-ops-chip", children: /* @__PURE__ */ D.jsxs("span", { children: [
      "Applied: ",
      d.opsSummary
    ] }) }),
    s && /* @__PURE__ */ D.jsx("button", { className: "gcp-retry-btn", onClick: M, disabled: N, "aria-label": "Retry", children: "Retry" })
  ] });
}
function Vh() {
  return /* @__PURE__ */ D.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ D.jsx(
      "path",
      {
        d: "M22 2L11 13",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    ),
    /* @__PURE__ */ D.jsx(
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
function Kh() {
  return /* @__PURE__ */ D.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ D.jsx("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2" }) });
}
function Jh({
  api: d,
  settings: S,
  codexLoggedIn: z,
  conversation: s,
  onConversationChange: M,
  onOpenSettings: N
}) {
  const [U, q] = el.useState(""), [O, T] = el.useState(!1), [x, j] = el.useState(""), [V, pl] = el.useState(null), [ml, W] = el.useState(""), yl = el.useRef(null), tl = el.useRef(null), Bl = el.useRef(null), cl = Ah(S, z);
  el.useEffect(() => () => {
    var C;
    (C = Bl.current) == null || C.abort();
  }, []), el.useEffect(() => {
    var C;
    (C = yl.current) == null || C.scrollIntoView({ behavior: "smooth" });
  }, [s.messages, x]);
  const ql = el.useCallback(() => {
    const C = tl.current;
    if (!C) return;
    C.style.height = "auto";
    const El = 110;
    C.style.height = Math.min(C.scrollHeight, El) + "px";
  }, []);
  el.useEffect(() => {
    ql();
  }, [U, ql]);
  const fl = el.useCallback(
    async (C) => {
      if (!C.trim() || O || !cl) return;
      pl(null), W(C), q(""), T(!0), j("");
      const El = { role: "user", content: C.trim() };
      let ul = { ...s };
      ul.title || (ul.title = Oh(C.trim())), ul.provider = S.provider, ul.model = S.models[S.provider] ?? "", ul.messages = [...ul.messages, El], ul.updatedAt = Date.now(), M(ul), Dr(d, ul);
      const Nt = new AbortController();
      Bl.current = Nt;
      let Il = "";
      await Zh({
        api: d,
        settings: S,
        history: ul.messages.slice(0, -1),
        // exclude the user turn we just added
        userText: C.trim(),
        callbacks: {
          onTextDelta(Xl) {
            Il += Xl, j(Il);
          },
          onOpsApplied(Xl, b) {
          },
          onTurnsCommitted(Xl) {
            j(""), Il = "", ul = {
              ...ul,
              messages: [...ul.messages, ...Xl],
              updatedAt: Date.now()
            }, M(ul), Dr(d, ul);
          },
          onError(Xl) {
            pl(Xl), j(""), Il = "";
          },
          onFinished() {
            T(!1), Bl.current = null;
          }
        },
        signal: Nt.signal
      });
    },
    [d, O, s, M, cl, S]
  ), Dl = (C) => {
    C.key === "Enter" && !C.shiftKey && (C.preventDefault(), fl(U));
  }, w = () => {
    var C;
    (C = Bl.current) == null || C.abort();
  }, Gl = () => {
    fl(ml);
  }, $l = s.messages.filter((C) => C.role !== "tool");
  return /* @__PURE__ */ D.jsxs("div", { className: "gcp-chat", children: [
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-messages", role: "log", "aria-live": "polite", "aria-label": "Conversation", children: [
      $l.map((C, El) => {
        const ul = !O && El === $l.length - 1 && C.role === "assistant";
        return /* @__PURE__ */ D.jsx(
          Hr,
          {
            turn: C,
            error: ul && V ? V : null,
            onRetry: Gl,
            retryDisabled: O
          },
          El
        );
      }),
      O && /* @__PURE__ */ D.jsx(
        Hr,
        {
          turn: { role: "assistant", content: "" },
          streaming: !0,
          streamingText: x
        }
      ),
      /* @__PURE__ */ D.jsx("div", { ref: yl })
    ] }),
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-input-area", children: [
      /* @__PURE__ */ D.jsx(
        "textarea",
        {
          ref: tl,
          className: "gcp-textarea",
          rows: 1,
          placeholder: "Message Graph Copilot...",
          value: U,
          onChange: (C) => q(C.target.value),
          onKeyDown: Dl,
          disabled: O || !cl,
          "aria-label": "Message input",
          "aria-disabled": cl ? void 0 : "true"
        }
      ),
      O ? /* @__PURE__ */ D.jsx(
        "button",
        {
          className: "gcp-stop-btn",
          onClick: w,
          "aria-label": "Stop generation",
          title: "Stop",
          children: /* @__PURE__ */ D.jsx(Kh, {})
        }
      ) : /* @__PURE__ */ D.jsx(
        "button",
        {
          className: "gcp-send-btn",
          onClick: () => fl(U),
          disabled: !U.trim() || !cl,
          "aria-label": "Send message",
          title: "Send",
          children: /* @__PURE__ */ D.jsx(Vh, {})
        }
      ),
      !cl && !O && /* @__PURE__ */ D.jsxs("div", { className: "gcp-not-ready-overlay", children: [
        /* @__PURE__ */ D.jsx("span", { className: "gcp-not-ready-label", children: "Configure a provider in Settings" }),
        /* @__PURE__ */ D.jsx(
          "button",
          {
            className: "gcp-cta-btn",
            onClick: N,
            "aria-label": "Open settings to configure a provider",
            children: "Settings"
          }
        )
      ] })
    ] })
  ] });
}
function wh(d) {
  const S = Date.now() - d, z = Math.floor(S / 1e3);
  if (z < 60) return "just now";
  const s = Math.floor(z / 60);
  if (s < 60) return `${s}m ago`;
  const M = Math.floor(s / 60);
  if (M < 24) return `${M}h ago`;
  const N = Math.floor(M / 24);
  return N < 7 ? `${N}d ago` : `${Math.floor(N / 7)}w ago`;
}
function $h({ api: d, activeId: S, onResume: z, onNew: s }) {
  const [M, N] = el.useState(
    () => Mr(d)
  ), [U, q] = el.useState(null), O = (x, j) => {
    x.stopPropagation(), U === j ? (_h(d, j), N(Mr(d)), U === j && q(null)) : q(j);
  }, T = () => {
    q(null);
  };
  return /* @__PURE__ */ D.jsxs("div", { className: "gcp-history", children: [
    /* @__PURE__ */ D.jsx("div", { className: "gcp-history-top", children: /* @__PURE__ */ D.jsx(
      "button",
      {
        className: "gcp-new-btn",
        onClick: s,
        "aria-label": "Start new conversation",
        children: "+ New chat"
      }
    ) }),
    M.length === 0 ? /* @__PURE__ */ D.jsx("div", { className: "gcp-history-empty", children: "No conversations yet" }) : /* @__PURE__ */ D.jsx("div", { className: "gcp-history-list", onClick: T, children: M.map((x) => /* @__PURE__ */ D.jsxs(
      "div",
      {
        className: `gcp-history-item${x.id === S ? " active" : ""}`,
        onClick: () => z(x),
        role: "button",
        tabIndex: 0,
        "aria-label": `Resume conversation: ${x.title || "(untitled)"}`,
        onKeyDown: (j) => {
          (j.key === "Enter" || j.key === " ") && (j.preventDefault(), z(x));
        },
        children: [
          /* @__PURE__ */ D.jsxs("div", { className: "gcp-history-info", children: [
            /* @__PURE__ */ D.jsx("div", { className: "gcp-history-title", children: x.title || "(untitled)" }),
            /* @__PURE__ */ D.jsxs("div", { className: "gcp-history-meta", children: [
              wh(x.updatedAt),
              " · ",
              x.provider,
              "/",
              x.model || "—"
            ] })
          ] }),
          /* @__PURE__ */ D.jsx(
            "button",
            {
              className: `gcp-history-delete${U === x.id ? " confirm" : ""}`,
              onClick: (j) => O(j, x.id),
              "aria-label": U === x.id ? `Confirm delete "${x.title || "untitled"}"` : `Delete "${x.title || "untitled"}"`,
              title: U === x.id ? "Click again to confirm" : "Delete",
              children: "✕"
            }
          )
        ]
      },
      x.id
    )) })
  ] });
}
const xr = {
  openai: "OpenAI API",
  "openai-codex": "OpenAI Codex (ChatGPT)",
  openrouter: "OpenRouter",
  anthropic: "Claude API",
  custom: "Custom (OpenAI-compatible)"
}, Wh = [
  "openai",
  "openrouter",
  "anthropic",
  "custom"
], kh = 2e3, Fh = 300 * 1e3;
function Ih({
  value: d,
  onBlur: S,
  placeholder: z,
  "aria-label": s
}) {
  const [M, N] = el.useState(!1), [U, q] = el.useState(d);
  return el.useEffect(() => {
    q(d);
  }, [d]), /* @__PURE__ */ D.jsxs("div", { className: "gcp-key-row", children: [
    /* @__PURE__ */ D.jsx(
      "input",
      {
        type: M ? "text" : "password",
        className: "gcp-input",
        value: U,
        onChange: (O) => q(O.target.value),
        onBlur: () => S(U),
        placeholder: z ?? "API key",
        "aria-label": s,
        autoComplete: "off",
        spellCheck: !1
      }
    ),
    /* @__PURE__ */ D.jsx(
      "button",
      {
        type: "button",
        className: "gcp-show-btn",
        onClick: () => N((O) => !O),
        "aria-label": M ? "Hide key" : "Show key",
        title: M ? "Hide" : "Show",
        children: M ? "Hide" : "Show"
      }
    )
  ] });
}
function Ph({
  api: d,
  settings: S,
  codexLoggedIn: z,
  codexEmail: s,
  onCodexStatusChange: M,
  onChange: N
}) {
  const U = S.provider, [q, O] = el.useState([]), [T, x] = el.useState(!1), [j, V] = el.useState(null), [pl, ml] = el.useState(null), [W, yl] = el.useState(!1), tl = el.useRef(null), Bl = el.useRef(0);
  el.useEffect(() => () => {
    tl.current !== null && (clearInterval(tl.current), tl.current = null);
  }, []), el.useEffect(() => {
    U === "openai-codex" && Cr(d).then((C) => {
      C.status === "logged_in" && M(!0, C.email ?? null);
    }).catch(() => {
    });
  }, []);
  function cl(C) {
    N({ ...S, ...C });
  }
  function ql(C) {
    cl({ models: { ...S.models, [U]: C } });
  }
  function fl(C, El) {
    cl({ apiKeys: { ...S.apiKeys, [C]: El } });
  }
  async function Dl() {
    x(!0), V(null);
    try {
      const C = U === "openai" ? S.apiKeys.openai : U === "openrouter" ? S.apiKeys.openrouter : U === "anthropic" ? S.apiKeys.anthropic : U === "custom" ? S.apiKeys.custom : void 0, El = await Uh(
        d,
        U,
        C,
        U === "custom" ? S.customBaseUrl : void 0
      );
      O(El);
    } catch (C) {
      V(String(C));
    } finally {
      x(!1);
    }
  }
  async function w() {
    try {
      const C = await Ch(d);
      window.open(C, "_blank"), yl(!0), Bl.current = Date.now(), tl.current = setInterval(async () => {
        try {
          const El = await Cr(d);
          El.status === "logged_in" && (M(!0, El.email ?? null), yl(!1), tl.current !== null && (clearInterval(tl.current), tl.current = null));
        } catch {
        }
        Date.now() - Bl.current > Fh && (yl(!1), tl.current !== null && (clearInterval(tl.current), tl.current = null));
      }, kh);
    } catch (C) {
      ml(String(C));
    }
  }
  async function Gl() {
    try {
      await jh(d), M(!1, null), yl(!1), tl.current !== null && (clearInterval(tl.current), tl.current = null);
    } catch (C) {
      ml(String(C));
    }
  }
  const $l = "gcp-model-datalist";
  return /* @__PURE__ */ D.jsxs("div", { className: "gcp-settings", children: [
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ D.jsx("label", { className: "gcp-label", htmlFor: "gcp-provider-select", children: "Provider" }),
      /* @__PURE__ */ D.jsx(
        "select",
        {
          id: "gcp-provider-select",
          className: "gcp-select",
          value: U,
          onChange: (C) => cl({ provider: C.target.value }),
          "aria-label": "Select LLM provider",
          children: Object.keys(xr).map((C) => /* @__PURE__ */ D.jsx("option", { value: C, children: xr[C] }, C))
        }
      )
    ] }),
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ D.jsx("label", { className: "gcp-label", htmlFor: "gcp-model-input", children: "Model" }),
      /* @__PURE__ */ D.jsxs("div", { className: "gcp-model-row", children: [
        /* @__PURE__ */ D.jsx(
          "input",
          {
            id: "gcp-model-input",
            className: "gcp-input",
            list: $l,
            value: S.models[U] ?? "",
            onChange: (C) => ql(C.target.value),
            placeholder: "model id",
            "aria-label": "Model ID",
            autoComplete: "off",
            spellCheck: !1
          }
        ),
        /* @__PURE__ */ D.jsx("datalist", { id: $l, children: q.map((C) => /* @__PURE__ */ D.jsx("option", { value: C }, C)) }),
        /* @__PURE__ */ D.jsx(
          "button",
          {
            className: "gcp-load-btn",
            onClick: Dl,
            disabled: T,
            "aria-label": "Load available models from provider",
            title: "Load model list",
            children: T ? "Loading..." : "Load list"
          }
        )
      ] }),
      j && /* @__PURE__ */ D.jsx("span", { className: "gcp-field-hint error", role: "alert", children: j })
    ] }),
    U !== "openai-codex" && Wh.filter((C) => C === U || U === "custom" && C === "custom").map(
      (C) => C === U ? /* @__PURE__ */ D.jsxs("div", { className: "gcp-field", children: [
        /* @__PURE__ */ D.jsx("label", { className: "gcp-label", children: C === "openai" ? "OpenAI API Key" : C === "anthropic" ? "Anthropic API Key" : C === "openrouter" ? "OpenRouter API Key" : "Custom API Key" }),
        /* @__PURE__ */ D.jsx(
          Ih,
          {
            value: S.apiKeys[C] ?? "",
            onBlur: (El) => fl(C, El),
            placeholder: C === "custom" ? "API key (optional)" : "sk-...",
            "aria-label": C === "openai" ? "OpenAI API key" : C === "anthropic" ? "Anthropic API key" : C === "openrouter" ? "OpenRouter API key" : "Custom API key"
          }
        )
      ] }, C) : null
    ),
    U === "custom" && /* @__PURE__ */ D.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ D.jsx("label", { className: "gcp-label", htmlFor: "gcp-base-url", children: "Base URL" }),
      /* @__PURE__ */ D.jsx(
        "input",
        {
          id: "gcp-base-url",
          className: "gcp-input",
          type: "url",
          value: S.customBaseUrl,
          onChange: (C) => cl({ customBaseUrl: C.target.value }),
          placeholder: "http://127.0.0.1:11434/v1",
          "aria-label": "Custom API base URL",
          spellCheck: !1
        }
      )
    ] }),
    U === "openai-codex" && /* @__PURE__ */ D.jsxs("div", { className: "gcp-field", children: [
      /* @__PURE__ */ D.jsx("label", { className: "gcp-label", children: "ChatGPT Codex Auth" }),
      /* @__PURE__ */ D.jsxs("div", { className: "gcp-codex-section", children: [
        /* @__PURE__ */ D.jsx(
          "div",
          {
            className: `gcp-codex-status${z ? " signed-in" : W ? " pending" : ""}`,
            role: "status",
            "aria-live": "polite",
            children: z ? `Signed in${s ? ` as ${s}` : ""}` : W ? "Sign-in pending... (waiting for browser auth)" : "Not signed in"
          }
        ),
        /* @__PURE__ */ D.jsxs("div", { className: "gcp-codex-btns", children: [
          !z && /* @__PURE__ */ D.jsx(
            "button",
            {
              className: "gcp-codex-btn",
              onClick: w,
              disabled: W,
              "aria-label": "Sign in with ChatGPT Codex",
              children: W ? "Waiting..." : "Sign in"
            }
          ),
          z && /* @__PURE__ */ D.jsx(
            "button",
            {
              className: "gcp-codex-btn danger",
              onClick: Gl,
              "aria-label": "Sign out from ChatGPT Codex",
              children: "Sign out"
            }
          )
        ] }),
        pl && /* @__PURE__ */ D.jsx("span", { className: "gcp-field-hint error", role: "alert", children: pl })
      ] })
    ] }),
    /* @__PURE__ */ D.jsx("p", { className: "gcp-footnote", children: "Keys are stored in this browser's localStorage and sent only to your local CodefyUI backend, which forwards them to the selected provider." })
  ] });
}
function l0() {
  return /* @__PURE__ */ D.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ D.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ D.jsx(
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
function t0() {
  return /* @__PURE__ */ D.jsxs("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
    /* @__PURE__ */ D.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "2" }),
    /* @__PURE__ */ D.jsx(
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
function a0({
  api: d,
  settings: S,
  codexLoggedIn: z,
  codexEmail: s,
  conversation: M,
  onConversationChange: N,
  onSettingsChange: U,
  onCodexStatusChange: q,
  onNewConversation: O,
  onResumeConversation: T,
  onClose: x
}) {
  const [j, V] = el.useState("chat"), pl = (yl) => {
    T(yl), V("chat");
  }, ml = () => {
    O(), V("chat");
  }, W = (yl) => {
    V((tl) => tl === yl ? "chat" : yl);
  };
  return /* @__PURE__ */ D.jsxs("div", { className: "gcp-window", role: "dialog", "aria-label": "Graph Copilot", children: [
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-header", children: [
      /* @__PURE__ */ D.jsx("span", { className: "gcp-header-title", children: "Graph Copilot" }),
      /* @__PURE__ */ D.jsx(
        "button",
        {
          className: `gcp-icon-btn${j === "history" ? " active" : ""}`,
          onClick: () => W("history"),
          "aria-label": "Conversation history",
          title: "History",
          children: /* @__PURE__ */ D.jsx(l0, {})
        }
      ),
      /* @__PURE__ */ D.jsx(
        "button",
        {
          className: `gcp-icon-btn${j === "settings" ? " active" : ""}`,
          onClick: () => W("settings"),
          "aria-label": "Settings",
          title: "Settings",
          children: /* @__PURE__ */ D.jsx(t0, {})
        }
      ),
      /* @__PURE__ */ D.jsx(
        "button",
        {
          className: "gcp-icon-btn",
          onClick: x,
          "aria-label": "Close panel",
          title: "Close",
          children: "✕"
        }
      )
    ] }),
    /* @__PURE__ */ D.jsxs("div", { className: "gcp-view", children: [
      j === "chat" && /* @__PURE__ */ D.jsx(
        Jh,
        {
          api: d,
          settings: S,
          codexLoggedIn: z,
          conversation: M,
          onConversationChange: N,
          onOpenSettings: () => V("settings")
        }
      ),
      j === "history" && /* @__PURE__ */ D.jsx(
        $h,
        {
          api: d,
          activeId: M.id,
          onResume: pl,
          onNew: ml
        }
      ),
      j === "settings" && /* @__PURE__ */ D.jsx(
        Ph,
        {
          api: d,
          settings: S,
          codexLoggedIn: z,
          codexEmail: s,
          onCodexStatusChange: q,
          onChange: U
        }
      )
    ] })
  ] });
}
function e0({ api: d }) {
  const [S, z] = el.useState(!1), [s, M] = el.useState(() => Eh(d)), [N, U] = el.useState(!1), [q, O] = el.useState(null), [T, x] = el.useState(
    () => Nr(s.provider, s.models[s.provider] ?? "")
  );
  el.useEffect(() => {
    zh(d, s);
  }, [d, s]);
  const j = (W) => {
    M(W);
  }, V = (W, yl) => {
    U(W), O(yl);
  }, pl = () => {
    x(
      Nr(
        s.provider,
        s.models[s.provider] ?? ""
      )
    );
  }, ml = (W) => {
    x(W);
  };
  return /* @__PURE__ */ D.jsxs("div", { className: "gcp-root", children: [
    /* @__PURE__ */ D.jsx(Dh, { onClick: () => z((W) => !W) }),
    S && /* @__PURE__ */ D.jsx(
      a0,
      {
        api: d,
        settings: s,
        codexLoggedIn: N,
        codexEmail: q,
        conversation: T,
        onConversationChange: x,
        onSettingsChange: j,
        onCodexStatusChange: V,
        onNewConversation: pl,
        onResumeConversation: ml,
        onClose: () => z(!1)
      }
    )
  ] });
}
function u0(d) {
  const S = d.ui.addFloatingWidget({ id: "copilot" });
  bh.createRoot(S).render(
    /* @__PURE__ */ D.jsx(mh.StrictMode, { children: /* @__PURE__ */ D.jsx(e0, { api: d }) })
  );
}
export {
  u0 as default
};
