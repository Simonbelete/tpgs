// https://d3js.org/d3-selection/ v3.0.0 Copyright 2010-2021 Mike Bostock
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], n)
    : n(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {})
      );
})(this, function (t) {
  "use strict";
  var n = "http://www.w3.org/1999/xhtml",
    e = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: n,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/",
    };
  function r(t) {
    var n = (t += ""),
      r = n.indexOf(":");
    return (
      r >= 0 && "xmlns" !== (n = t.slice(0, r)) && (t = t.slice(r + 1)),
      e.hasOwnProperty(n) ? { space: e[n], local: t } : t
    );
  }
  function i(t) {
    return function () {
      var e = this.ownerDocument,
        r = this.namespaceURI;
      return r === n && e.documentElement.namespaceURI === n
        ? e.createElement(t)
        : e.createElementNS(r, t);
    };
  }
  function o(t) {
    return function () {
      return this.ownerDocument.createElementNS(t.space, t.local);
    };
  }
  function u(t) {
    var n = r(t);
    return (n.local ? o : i)(n);
  }
  function s() {}
  function c(t) {
    return null == t
      ? s
      : function () {
          return this.querySelector(t);
        };
  }
  function l(t) {
    return null == t ? [] : Array.isArray(t) ? t : Array.from(t);
  }
  function a() {
    return [];
  }
  function f(t) {
    return null == t
      ? a
      : function () {
          return this.querySelectorAll(t);
        };
  }
  function h(t) {
    return function () {
      return this.matches(t);
    };
  }
  function p(t) {
    return function (n) {
      return n.matches(t);
    };
  }
  var _ = Array.prototype.find;
  function d() {
    return this.firstElementChild;
  }
  var y = Array.prototype.filter;
  function m() {
    return Array.from(this.children);
  }
  function v(t) {
    return new Array(t.length);
  }
  function g(t, n) {
    (this.ownerDocument = t.ownerDocument),
      (this.namespaceURI = t.namespaceURI),
      (this._next = null),
      (this._parent = t),
      (this.__data__ = n);
  }
  function w(t) {
    return function () {
      return t;
    };
  }
  function A(t, n, e, r, i, o) {
    for (var u, s = 0, c = n.length, l = o.length; s < l; ++s)
      (u = n[s]) ? ((u.__data__ = o[s]), (r[s] = u)) : (e[s] = new g(t, o[s]));
    for (; s < c; ++s) (u = n[s]) && (i[s] = u);
  }
  function x(t, n, e, r, i, o, u) {
    var s,
      c,
      l,
      a = new Map(),
      f = n.length,
      h = o.length,
      p = new Array(f);
    for (s = 0; s < f; ++s)
      (c = n[s]) &&
        ((p[s] = l = u.call(c, c.__data__, s, n) + ""),
        a.has(l) ? (i[s] = c) : a.set(l, c));
    for (s = 0; s < h; ++s)
      (l = u.call(t, o[s], s, o) + ""),
        (c = a.get(l))
          ? ((r[s] = c), (c.__data__ = o[s]), a.delete(l))
          : (e[s] = new g(t, o[s]));
    for (s = 0; s < f; ++s) (c = n[s]) && a.get(p[s]) === c && (i[s] = c);
  }
  function b(t) {
    return t.__data__;
  }
  function S(t) {
    return "object" == typeof t && "length" in t ? t : Array.from(t);
  }
  function E(t, n) {
    return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }
  function N(t) {
    return function () {
      this.removeAttribute(t);
    };
  }
  function C(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function L(t, n) {
    return function () {
      this.setAttribute(t, n);
    };
  }
  function P(t, n) {
    return function () {
      this.setAttributeNS(t.space, t.local, n);
    };
  }
  function T(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? this.removeAttribute(t) : this.setAttribute(t, e);
    };
  }
  function B(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e
        ? this.removeAttributeNS(t.space, t.local)
        : this.setAttributeNS(t.space, t.local, e);
    };
  }
  function M(t) {
    return (
      (t.ownerDocument && t.ownerDocument.defaultView) ||
      (t.document && t) ||
      t.defaultView
    );
  }
  function q(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }
  function D(t, n, e) {
    return function () {
      this.style.setProperty(t, n, e);
    };
  }
  function O(t, n, e) {
    return function () {
      var r = n.apply(this, arguments);
      null == r
        ? this.style.removeProperty(t)
        : this.style.setProperty(t, r, e);
    };
  }
  function V(t, n) {
    return (
      t.style.getPropertyValue(n) ||
      M(t).getComputedStyle(t, null).getPropertyValue(n)
    );
  }
  function j(t) {
    return function () {
      delete this[t];
    };
  }
  function R(t, n) {
    return function () {
      this[t] = n;
    };
  }
  function H(t, n) {
    return function () {
      var e = n.apply(this, arguments);
      null == e ? delete this[t] : (this[t] = e);
    };
  }
  function I(t) {
    return t.trim().split(/^|\s+/);
  }
  function U(t) {
    return t.classList || new X(t);
  }
  function X(t) {
    (this._node = t), (this._names = I(t.getAttribute("class") || ""));
  }
  function G(t, n) {
    for (var e = U(t), r = -1, i = n.length; ++r < i; ) e.add(n[r]);
  }
  function Y(t, n) {
    for (var e = U(t), r = -1, i = n.length; ++r < i; ) e.remove(n[r]);
  }
  function k(t) {
    return function () {
      G(this, t);
    };
  }
  function z(t) {
    return function () {
      Y(this, t);
    };
  }
  function F(t, n) {
    return function () {
      (n.apply(this, arguments) ? G : Y)(this, t);
    };
  }
  function J() {
    this.textContent = "";
  }
  function K(t) {
    return function () {
      this.textContent = t;
    };
  }
  function Q(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.textContent = null == n ? "" : n;
    };
  }
  function W() {
    this.innerHTML = "";
  }
  function Z(t) {
    return function () {
      this.innerHTML = t;
    };
  }
  function $(t) {
    return function () {
      var n = t.apply(this, arguments);
      this.innerHTML = null == n ? "" : n;
    };
  }
  function tt() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function nt() {
    this.previousSibling &&
      this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function et() {
    return null;
  }
  function rt() {
    var t = this.parentNode;
    t && t.removeChild(this);
  }
  function it() {
    var t = this.cloneNode(!1),
      n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }
  function ot() {
    var t = this.cloneNode(!0),
      n = this.parentNode;
    return n ? n.insertBefore(t, this.nextSibling) : t;
  }
  function ut(t) {
    return t
      .trim()
      .split(/^|\s+/)
      .map(function (t) {
        var n = "",
          e = t.indexOf(".");
        return (
          e >= 0 && ((n = t.slice(e + 1)), (t = t.slice(0, e))),
          { type: t, name: n }
        );
      });
  }
  function st(t) {
    return function () {
      var n = this.__on;
      if (n) {
        for (var e, r = 0, i = -1, o = n.length; r < o; ++r)
          (e = n[r]),
            (t.type && e.type !== t.type) || e.name !== t.name
              ? (n[++i] = e)
              : this.removeEventListener(e.type, e.listener, e.options);
        ++i ? (n.length = i) : delete this.__on;
      }
    };
  }
  function ct(t, n, e) {
    return function () {
      var r,
        i = this.__on,
        o = (function (t) {
          return function (n) {
            t.call(this, n, this.__data__);
          };
        })(n);
      if (i)
        for (var u = 0, s = i.length; u < s; ++u)
          if ((r = i[u]).type === t.type && r.name === t.name)
            return (
              this.removeEventListener(r.type, r.listener, r.options),
              this.addEventListener(r.type, (r.listener = o), (r.options = e)),
              void (r.value = n)
            );
      this.addEventListener(t.type, o, e),
        (r = { type: t.type, name: t.name, value: n, listener: o, options: e }),
        i ? i.push(r) : (this.__on = [r]);
    };
  }
  function lt(t, n, e) {
    var r = M(t),
      i = r.CustomEvent;
    "function" == typeof i
      ? (i = new i(n, e))
      : ((i = r.document.createEvent("Event")),
        e
          ? (i.initEvent(n, e.bubbles, e.cancelable), (i.detail = e.detail))
          : i.initEvent(n, !1, !1)),
      t.dispatchEvent(i);
  }
  function at(t, n) {
    return function () {
      return lt(this, t, n);
    };
  }
  function ft(t, n) {
    return function () {
      return lt(this, t, n.apply(this, arguments));
    };
  }
  (g.prototype = {
    constructor: g,
    appendChild: function (t) {
      return this._parent.insertBefore(t, this._next);
    },
    insertBefore: function (t, n) {
      return this._parent.insertBefore(t, n);
    },
    querySelector: function (t) {
      return this._parent.querySelector(t);
    },
    querySelectorAll: function (t) {
      return this._parent.querySelectorAll(t);
    },
  }),
    (X.prototype = {
      add: function (t) {
        this._names.indexOf(t) < 0 &&
          (this._names.push(t),
          this._node.setAttribute("class", this._names.join(" ")));
      },
      remove: function (t) {
        var n = this._names.indexOf(t);
        n >= 0 &&
          (this._names.splice(n, 1),
          this._node.setAttribute("class", this._names.join(" ")));
      },
      contains: function (t) {
        return this._names.indexOf(t) >= 0;
      },
    });
  var ht = [null];
  function pt(t, n) {
    (this._groups = t), (this._parents = n);
  }
  function _t() {
    return new pt([[document.documentElement]], ht);
  }
  function dt(t) {
    return "string" == typeof t
      ? new pt([[document.querySelector(t)]], [document.documentElement])
      : new pt([[t]], ht);
  }
  pt.prototype = _t.prototype = {
    constructor: pt,
    select: function (t) {
      "function" != typeof t && (t = c(t));
      for (
        var n = this._groups, e = n.length, r = new Array(e), i = 0;
        i < e;
        ++i
      )
        for (
          var o, u, s = n[i], l = s.length, a = (r[i] = new Array(l)), f = 0;
          f < l;
          ++f
        )
          (o = s[f]) &&
            (u = t.call(o, o.__data__, f, s)) &&
            ("__data__" in o && (u.__data__ = o.__data__), (a[f] = u));
      return new pt(r, this._parents);
    },
    selectAll: function (t) {
      t =
        "function" == typeof t
          ? (function (t) {
              return function () {
                return l(t.apply(this, arguments));
              };
            })(t)
          : f(t);
      for (
        var n = this._groups, e = n.length, r = [], i = [], o = 0;
        o < e;
        ++o
      )
        for (var u, s = n[o], c = s.length, a = 0; a < c; ++a)
          (u = s[a]) && (r.push(t.call(u, u.__data__, a, s)), i.push(u));
      return new pt(r, i);
    },
    selectChild: function (t) {
      return this.select(
        null == t
          ? d
          : (function (t) {
              return function () {
                return _.call(this.children, t);
              };
            })("function" == typeof t ? t : p(t))
      );
    },
    selectChildren: function (t) {
      return this.selectAll(
        null == t
          ? m
          : (function (t) {
              return function () {
                return y.call(this.children, t);
              };
            })("function" == typeof t ? t : p(t))
      );
    },
    filter: function (t) {
      "function" != typeof t && (t = h(t));
      for (
        var n = this._groups, e = n.length, r = new Array(e), i = 0;
        i < e;
        ++i
      )
        for (var o, u = n[i], s = u.length, c = (r[i] = []), l = 0; l < s; ++l)
          (o = u[l]) && t.call(o, o.__data__, l, u) && c.push(o);
      return new pt(r, this._parents);
    },
    data: function (t, n) {
      if (!arguments.length) return Array.from(this, b);
      var e = n ? x : A,
        r = this._parents,
        i = this._groups;
      "function" != typeof t && (t = w(t));
      for (
        var o = i.length,
          u = new Array(o),
          s = new Array(o),
          c = new Array(o),
          l = 0;
        l < o;
        ++l
      ) {
        var a = r[l],
          f = i[l],
          h = f.length,
          p = S(t.call(a, a && a.__data__, l, r)),
          _ = p.length,
          d = (s[l] = new Array(_)),
          y = (u[l] = new Array(_)),
          m = (c[l] = new Array(h));
        e(a, f, d, y, m, p, n);
        for (var v, g, E = 0, N = 0; E < _; ++E)
          if ((v = d[E])) {
            for (E >= N && (N = E + 1); !(g = y[N]) && ++N < _; );
            v._next = g || null;
          }
      }
      return ((u = new pt(u, r))._enter = s), (u._exit = c), u;
    },
    enter: function () {
      return new pt(this._enter || this._groups.map(v), this._parents);
    },
    exit: function () {
      return new pt(this._exit || this._groups.map(v), this._parents);
    },
    join: function (t, n, e) {
      var r = this.enter(),
        i = this,
        o = this.exit();
      return (
        "function" == typeof t
          ? (r = t(r)) && (r = r.selection())
          : (r = r.append(t + "")),
        null != n && (i = n(i)) && (i = i.selection()),
        null == e ? o.remove() : e(o),
        r && i ? r.merge(i).order() : i
      );
    },
    merge: function (t) {
      for (
        var n = t.selection ? t.selection() : t,
          e = this._groups,
          r = n._groups,
          i = e.length,
          o = r.length,
          u = Math.min(i, o),
          s = new Array(i),
          c = 0;
        c < u;
        ++c
      )
        for (
          var l,
            a = e[c],
            f = r[c],
            h = a.length,
            p = (s[c] = new Array(h)),
            _ = 0;
          _ < h;
          ++_
        )
          (l = a[_] || f[_]) && (p[_] = l);
      for (; c < i; ++c) s[c] = e[c];
      return new pt(s, this._parents);
    },
    selection: function () {
      return this;
    },
    order: function () {
      for (var t = this._groups, n = -1, e = t.length; ++n < e; )
        for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0; )
          (r = i[o]) &&
            (u &&
              4 ^ r.compareDocumentPosition(u) &&
              u.parentNode.insertBefore(r, u),
            (u = r));
      return this;
    },
    sort: function (t) {
      function n(n, e) {
        return n && e ? t(n.__data__, e.__data__) : !n - !e;
      }
      t || (t = E);
      for (
        var e = this._groups, r = e.length, i = new Array(r), o = 0;
        o < r;
        ++o
      ) {
        for (
          var u, s = e[o], c = s.length, l = (i[o] = new Array(c)), a = 0;
          a < c;
          ++a
        )
          (u = s[a]) && (l[a] = u);
        l.sort(n);
      }
      return new pt(i, this._parents).order();
    },
    call: function () {
      var t = arguments[0];
      return (arguments[0] = this), t.apply(null, arguments), this;
    },
    nodes: function () {
      return Array.from(this);
    },
    node: function () {
      for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
          var u = r[i];
          if (u) return u;
        }
      return null;
    },
    size: function () {
      let t = 0;
      for (const n of this) ++t;
      return t;
    },
    empty: function () {
      return !this.node();
    },
    each: function (t) {
      for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
        for (var i, o = n[e], u = 0, s = o.length; u < s; ++u)
          (i = o[u]) && t.call(i, i.__data__, u, o);
      return this;
    },
    attr: function (t, n) {
      var e = r(t);
      if (arguments.length < 2) {
        var i = this.node();
        return e.local ? i.getAttributeNS(e.space, e.local) : i.getAttribute(e);
      }
      return this.each(
        (null == n
          ? e.local
            ? C
            : N
          : "function" == typeof n
          ? e.local
            ? B
            : T
          : e.local
          ? P
          : L)(e, n)
      );
    },
    style: function (t, n, e) {
      return arguments.length > 1
        ? this.each(
            (null == n ? q : "function" == typeof n ? O : D)(
              t,
              n,
              null == e ? "" : e
            )
          )
        : V(this.node(), t);
    },
    property: function (t, n) {
      return arguments.length > 1
        ? this.each((null == n ? j : "function" == typeof n ? H : R)(t, n))
        : this.node()[t];
    },
    classed: function (t, n) {
      var e = I(t + "");
      if (arguments.length < 2) {
        for (var r = U(this.node()), i = -1, o = e.length; ++i < o; )
          if (!r.contains(e[i])) return !1;
        return !0;
      }
      return this.each(("function" == typeof n ? F : n ? k : z)(e, n));
    },
    text: function (t) {
      return arguments.length
        ? this.each(null == t ? J : ("function" == typeof t ? Q : K)(t))
        : this.node().textContent;
    },
    html: function (t) {
      return arguments.length
        ? this.each(null == t ? W : ("function" == typeof t ? $ : Z)(t))
        : this.node().innerHTML;
    },
    raise: function () {
      return this.each(tt);
    },
    lower: function () {
      return this.each(nt);
    },
    append: function (t) {
      var n = "function" == typeof t ? t : u(t);
      return this.select(function () {
        return this.appendChild(n.apply(this, arguments));
      });
    },
    insert: function (t, n) {
      var e = "function" == typeof t ? t : u(t),
        r = null == n ? et : "function" == typeof n ? n : c(n);
      return this.select(function () {
        return this.insertBefore(
          e.apply(this, arguments),
          r.apply(this, arguments) || null
        );
      });
    },
    remove: function () {
      return this.each(rt);
    },
    clone: function (t) {
      return this.select(t ? ot : it);
    },
    datum: function (t) {
      return arguments.length
        ? this.property("__data__", t)
        : this.node().__data__;
    },
    on: function (t, n, e) {
      var r,
        i,
        o = ut(t + ""),
        u = o.length;
      if (!(arguments.length < 2)) {
        for (s = n ? ct : st, r = 0; r < u; ++r) this.each(s(o[r], n, e));
        return this;
      }
      var s = this.node().__on;
      if (s)
        for (var c, l = 0, a = s.length; l < a; ++l)
          for (r = 0, c = s[l]; r < u; ++r)
            if ((i = o[r]).type === c.type && i.name === c.name) return c.value;
    },
    dispatch: function (t, n) {
      return this.each(("function" == typeof n ? ft : at)(t, n));
    },
    [Symbol.iterator]: function* () {
      for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
        for (var r, i = t[n], o = 0, u = i.length; o < u; ++o)
          (r = i[o]) && (yield r);
    },
  };
  var yt = 0;
  function mt() {
    return new vt();
  }
  function vt() {
    this._ = "@" + (++yt).toString(36);
  }
  function gt(t) {
    let n;
    for (; (n = t.sourceEvent); ) t = n;
    return t;
  }
  function wt(t, n) {
    if (((t = gt(t)), void 0 === n && (n = t.currentTarget), n)) {
      var e = n.ownerSVGElement || n;
      if (e.createSVGPoint) {
        var r = e.createSVGPoint();
        return (
          (r.x = t.clientX),
          (r.y = t.clientY),
          [(r = r.matrixTransform(n.getScreenCTM().inverse())).x, r.y]
        );
      }
      if (n.getBoundingClientRect) {
        var i = n.getBoundingClientRect();
        return [
          t.clientX - i.left - n.clientLeft,
          t.clientY - i.top - n.clientTop,
        ];
      }
    }
    return [t.pageX, t.pageY];
  }
  (vt.prototype = mt.prototype =
    {
      constructor: vt,
      get: function (t) {
        for (var n = this._; !(n in t); ) if (!(t = t.parentNode)) return;
        return t[n];
      },
      set: function (t, n) {
        return (t[this._] = n);
      },
      remove: function (t) {
        return this._ in t && delete t[this._];
      },
      toString: function () {
        return this._;
      },
    }),
    (t.create = function (t) {
      return dt(u(t).call(document.documentElement));
    }),
    (t.creator = u),
    (t.local = mt),
    (t.matcher = h),
    (t.namespace = r),
    (t.namespaces = e),
    (t.pointer = wt),
    (t.pointers = function (t, n) {
      return (
        t.target &&
          ((t = gt(t)),
          void 0 === n && (n = t.currentTarget),
          (t = t.touches || [t])),
        Array.from(t, (t) => wt(t, n))
      );
    }),
    (t.select = dt),
    (t.selectAll = function (t) {
      return "string" == typeof t
        ? new pt([document.querySelectorAll(t)], [document.documentElement])
        : new pt([l(t)], ht);
    }),
    (t.selection = _t),
    (t.selector = c),
    (t.selectorAll = f),
    (t.style = V),
    (t.window = M),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
