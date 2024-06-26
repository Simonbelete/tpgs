// https://d3js.org/d3-transition/ v3.0.1 Copyright 2010-2021 Mike Bostock
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(
        exports,
        require("d3-selection"),
        require("d3-dispatch"),
        require("d3-timer"),
        require("d3-interpolate"),
        require("d3-color"),
        require("d3-ease")
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "exports",
          "d3-selection",
          "d3-dispatch",
          "d3-timer",
          "d3-interpolate",
          "d3-color",
          "d3-ease",
        ],
        n
      )
    : n(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {}),
        t.d3,
        t.d3,
        t.d3,
        t.d3,
        t.d3,
        t.d3
      );
})(this, function (t, n, e, r, i, o, u) {
  "use strict";
  var a = e.dispatch("start", "end", "cancel", "interrupt"),
    s = [];
  function l(t, n, e, i, o, u) {
    var l = t.__transition;
    if (l) {
      if (e in l) return;
    } else t.__transition = {};
    !(function (t, n, e) {
      var i,
        o = t.__transition;
      function u(t) {
        (e.state = 1),
          e.timer.restart(a, e.delay, e.time),
          e.delay <= t && a(t - e.delay);
      }
      function a(u) {
        var f, c, h, d;
        if (1 !== e.state) return l();
        for (f in o)
          if ((d = o[f]).name === e.name) {
            if (3 === d.state) return r.timeout(a);
            4 === d.state
              ? ((d.state = 6),
                d.timer.stop(),
                d.on.call("interrupt", t, t.__data__, d.index, d.group),
                delete o[f])
              : +f < n &&
                ((d.state = 6),
                d.timer.stop(),
                d.on.call("cancel", t, t.__data__, d.index, d.group),
                delete o[f]);
          }
        if (
          (r.timeout(function () {
            3 === e.state &&
              ((e.state = 4), e.timer.restart(s, e.delay, e.time), s(u));
          }),
          (e.state = 2),
          e.on.call("start", t, t.__data__, e.index, e.group),
          2 === e.state)
        ) {
          for (
            e.state = 3, i = new Array((h = e.tween.length)), f = 0, c = -1;
            f < h;
            ++f
          )
            (d = e.tween[f].value.call(t, t.__data__, e.index, e.group)) &&
              (i[++c] = d);
          i.length = c + 1;
        }
      }
      function s(n) {
        for (
          var r =
              n < e.duration
                ? e.ease.call(null, n / e.duration)
                : (e.timer.restart(l), (e.state = 5), 1),
            o = -1,
            u = i.length;
          ++o < u;

        )
          i[o].call(t, r);
        5 === e.state &&
          (e.on.call("end", t, t.__data__, e.index, e.group), l());
      }
      function l() {
        for (var r in ((e.state = 6), e.timer.stop(), delete o[n], o)) return;
        delete t.__transition;
      }
      (o[n] = e), (e.timer = r.timer(u, 0, e.time));
    })(t, e, {
      name: n,
      index: i,
      group: o,
      on: a,
      tween: s,
      time: u.time,
      delay: u.delay,
      duration: u.duration,
      ease: u.ease,
      timer: null,
      state: 0,
    });
  }
  function f(t, n) {
    var e = h(t, n);
    if (e.state > 0) throw new Error("too late; already scheduled");
    return e;
  }
  function c(t, n) {
    var e = h(t, n);
    if (e.state > 3) throw new Error("too late; already running");
    return e;
  }
  function h(t, n) {
    var e = t.__transition;
    if (!e || !(e = e[n])) throw new Error("transition not found");
    return e;
  }
  function d(t, n) {
    var e,
      r,
      i,
      o = t.__transition,
      u = !0;
    if (o) {
      for (i in ((n = null == n ? null : n + ""), o))
        (e = o[i]).name === n
          ? ((r = e.state > 2 && e.state < 5),
            (e.state = 6),
            e.timer.stop(),
            e.on.call(
              r ? "interrupt" : "cancel",
              t,
              t.__data__,
              e.index,
              e.group
            ),
            delete o[i])
          : (u = !1);
      u && delete t.__transition;
    }
  }
  function p(t, n) {
    var e, r;
    return function () {
      var i = c(this, t),
        o = i.tween;
      if (o !== e)
        for (var u = 0, a = (r = e = o).length; u < a; ++u)
          if (r[u].name === n) {
            (r = r.slice()).splice(u, 1);
            break;
          }
      i.tween = r;
    };
  }
  function _(t, n, e) {
    var r, i;
    if ("function" != typeof e) throw new Error();
    return function () {
      var o = c(this, t),
        u = o.tween;
      if (u !== r) {
        i = (r = u).slice();
        for (var a = { name: n, value: e }, s = 0, l = i.length; s < l; ++s)
          if (i[s].name === n) {
            i[s] = a;
            break;
          }
        s === l && i.push(a);
      }
      o.tween = i;
    };
  }
  function v(t, n, e) {
    var r = t._id;
    return (
      t.each(function () {
        var t = c(this, r);
        (t.value || (t.value = {}))[n] = e.apply(this, arguments);
      }),
      function (t) {
        return h(t, r).value[n];
      }
    );
  }
  function y(t, n) {
    var e;
    return (
      "number" == typeof n
        ? i.interpolateNumber
        : n instanceof o.color
        ? i.interpolateRgb
        : (e = o.color(n))
        ? ((n = e), i.interpolateRgb)
        : i.interpolateString
    )(t, n);
  }
  function m(t) {
    return function () {
      this.removeAttribute(t);
    };
  }
  function w(t) {
    return function () {
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function g(t, n, e) {
    var r,
      i,
      o = e + "";
    return function () {
      var u = this.getAttribute(t);
      return u === o ? null : u === r ? i : (i = n((r = u), e));
    };
  }
  function b(t, n, e) {
    var r,
      i,
      o = e + "";
    return function () {
      var u = this.getAttributeNS(t.space, t.local);
      return u === o ? null : u === r ? i : (i = n((r = u), e));
    };
  }
  function x(t, n, e) {
    var r, i, o;
    return function () {
      var u,
        a,
        s = e(this);
      if (null != s)
        return (u = this.getAttribute(t)) === (a = s + "")
          ? null
          : u === r && a === i
          ? o
          : ((i = a), (o = n((r = u), s)));
      this.removeAttribute(t);
    };
  }
  function A(t, n, e) {
    var r, i, o;
    return function () {
      var u,
        a,
        s = e(this);
      if (null != s)
        return (u = this.getAttributeNS(t.space, t.local)) === (a = s + "")
          ? null
          : u === r && a === i
          ? o
          : ((i = a), (o = n((r = u), s)));
      this.removeAttributeNS(t.space, t.local);
    };
  }
  function E(t, n) {
    return function (e) {
      this.setAttribute(t, n.call(this, e));
    };
  }
  function T(t, n) {
    return function (e) {
      this.setAttributeNS(t.space, t.local, n.call(this, e));
    };
  }
  function C(t, n) {
    var e, r;
    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && T(t, i)), e;
    }
    return (i._value = n), i;
  }
  function S(t, n) {
    var e, r;
    function i() {
      var i = n.apply(this, arguments);
      return i !== r && (e = (r = i) && E(t, i)), e;
    }
    return (i._value = n), i;
  }
  function N(t, n) {
    return function () {
      f(this, t).delay = +n.apply(this, arguments);
    };
  }
  function q(t, n) {
    return (
      (n = +n),
      function () {
        f(this, t).delay = n;
      }
    );
  }
  function P(t, n) {
    return function () {
      c(this, t).duration = +n.apply(this, arguments);
    };
  }
  function z(t, n) {
    return (
      (n = +n),
      function () {
        c(this, t).duration = n;
      }
    );
  }
  function O(t, n) {
    if ("function" != typeof n) throw new Error();
    return function () {
      c(this, t).ease = n;
    };
  }
  function j(t, n, e) {
    var r,
      i,
      o = (function (t) {
        return (t + "")
          .trim()
          .split(/^|\s+/)
          .every(function (t) {
            var n = t.indexOf(".");
            return n >= 0 && (t = t.slice(0, n)), !t || "start" === t;
          });
      })(n)
        ? f
        : c;
    return function () {
      var u = o(this, t),
        a = u.on;
      a !== r && (i = (r = a).copy()).on(n, e), (u.on = i);
    };
  }
  var k = n.selection.prototype.constructor;
  function M(t) {
    return function () {
      this.style.removeProperty(t);
    };
  }
  function R(t, n, e) {
    return function (r) {
      this.style.setProperty(t, n.call(this, r), e);
    };
  }
  function I(t, n, e) {
    var r, i;
    function o() {
      var o = n.apply(this, arguments);
      return o !== i && (r = (i = o) && R(t, o, e)), r;
    }
    return (o._value = n), o;
  }
  function V(t) {
    return function (n) {
      this.textContent = t.call(this, n);
    };
  }
  function $(t) {
    var n, e;
    function r() {
      var r = t.apply(this, arguments);
      return r !== e && (n = (e = r) && V(r)), n;
    }
    return (r._value = t), r;
  }
  var B = 0;
  function D(t, n, e, r) {
    (this._groups = t), (this._parents = n), (this._name = e), (this._id = r);
  }
  function F(t) {
    return n.selection().transition(t);
  }
  function G() {
    return ++B;
  }
  var H = n.selection.prototype;
  D.prototype = F.prototype = {
    constructor: D,
    select: function (t) {
      var e = this._name,
        r = this._id;
      "function" != typeof t && (t = n.selector(t));
      for (
        var i = this._groups, o = i.length, u = new Array(o), a = 0;
        a < o;
        ++a
      )
        for (
          var s, f, c = i[a], d = c.length, p = (u[a] = new Array(d)), _ = 0;
          _ < d;
          ++_
        )
          (s = c[_]) &&
            (f = t.call(s, s.__data__, _, c)) &&
            ("__data__" in s && (f.__data__ = s.__data__),
            (p[_] = f),
            l(p[_], e, r, _, p, h(s, r)));
      return new D(u, this._parents, e, r);
    },
    selectAll: function (t) {
      var e = this._name,
        r = this._id;
      "function" != typeof t && (t = n.selectorAll(t));
      for (
        var i = this._groups, o = i.length, u = [], a = [], s = 0;
        s < o;
        ++s
      )
        for (var f, c = i[s], d = c.length, p = 0; p < d; ++p)
          if ((f = c[p])) {
            for (
              var _,
                v = t.call(f, f.__data__, p, c),
                y = h(f, r),
                m = 0,
                w = v.length;
              m < w;
              ++m
            )
              (_ = v[m]) && l(_, e, r, m, v, y);
            u.push(v), a.push(f);
          }
      return new D(u, a, e, r);
    },
    selectChild: H.selectChild,
    selectChildren: H.selectChildren,
    filter: function (t) {
      "function" != typeof t && (t = n.matcher(t));
      for (
        var e = this._groups, r = e.length, i = new Array(r), o = 0;
        o < r;
        ++o
      )
        for (var u, a = e[o], s = a.length, l = (i[o] = []), f = 0; f < s; ++f)
          (u = a[f]) && t.call(u, u.__data__, f, a) && l.push(u);
      return new D(i, this._parents, this._name, this._id);
    },
    merge: function (t) {
      if (t._id !== this._id) throw new Error();
      for (
        var n = this._groups,
          e = t._groups,
          r = n.length,
          i = e.length,
          o = Math.min(r, i),
          u = new Array(r),
          a = 0;
        a < o;
        ++a
      )
        for (
          var s,
            l = n[a],
            f = e[a],
            c = l.length,
            h = (u[a] = new Array(c)),
            d = 0;
          d < c;
          ++d
        )
          (s = l[d] || f[d]) && (h[d] = s);
      for (; a < r; ++a) u[a] = n[a];
      return new D(u, this._parents, this._name, this._id);
    },
    selection: function () {
      return new k(this._groups, this._parents);
    },
    transition: function () {
      for (
        var t = this._name,
          n = this._id,
          e = G(),
          r = this._groups,
          i = r.length,
          o = 0;
        o < i;
        ++o
      )
        for (var u, a = r[o], s = a.length, f = 0; f < s; ++f)
          if ((u = a[f])) {
            var c = h(u, n);
            l(u, t, e, f, a, {
              time: c.time + c.delay + c.duration,
              delay: 0,
              duration: c.duration,
              ease: c.ease,
            });
          }
      return new D(r, this._parents, t, e);
    },
    call: H.call,
    nodes: H.nodes,
    node: H.node,
    size: H.size,
    empty: H.empty,
    each: H.each,
    on: function (t, n) {
      var e = this._id;
      return arguments.length < 2
        ? h(this.node(), e).on.on(t)
        : this.each(j(e, t, n));
    },
    attr: function (t, e) {
      var r = n.namespace(t),
        o = "transform" === r ? i.interpolateTransformSvg : y;
      return this.attrTween(
        t,
        "function" == typeof e
          ? (r.local ? A : x)(r, o, v(this, "attr." + t, e))
          : null == e
          ? (r.local ? w : m)(r)
          : (r.local ? b : g)(r, o, e)
      );
    },
    attrTween: function (t, e) {
      var r = "attr." + t;
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == e) return this.tween(r, null);
      if ("function" != typeof e) throw new Error();
      var i = n.namespace(t);
      return this.tween(r, (i.local ? C : S)(i, e));
    },
    style: function (t, e, r) {
      var o = "transform" == (t += "") ? i.interpolateTransformCss : y;
      return null == e
        ? this.styleTween(
            t,
            (function (t, e) {
              var r, i, o;
              return function () {
                var u = n.style(this, t),
                  a = (this.style.removeProperty(t), n.style(this, t));
                return u === a
                  ? null
                  : u === r && a === i
                  ? o
                  : (o = e((r = u), (i = a)));
              };
            })(t, o)
          ).on("end.style." + t, M(t))
        : "function" == typeof e
        ? this.styleTween(
            t,
            (function (t, e, r) {
              var i, o, u;
              return function () {
                var a = n.style(this, t),
                  s = r(this),
                  l = s + "";
                return (
                  null == s &&
                    (this.style.removeProperty(t), (l = s = n.style(this, t))),
                  a === l
                    ? null
                    : a === i && l === o
                    ? u
                    : ((o = l), (u = e((i = a), s)))
                );
              };
            })(t, o, v(this, "style." + t, e))
          ).each(
            (function (t, n) {
              var e,
                r,
                i,
                o,
                u = "style." + n,
                a = "end." + u;
              return function () {
                var s = c(this, t),
                  l = s.on,
                  f = null == s.value[u] ? o || (o = M(n)) : void 0;
                (l === e && i === f) || (r = (e = l).copy()).on(a, (i = f)),
                  (s.on = r);
              };
            })(this._id, t)
          )
        : this.styleTween(
            t,
            (function (t, e, r) {
              var i,
                o,
                u = r + "";
              return function () {
                var a = n.style(this, t);
                return a === u ? null : a === i ? o : (o = e((i = a), r));
              };
            })(t, o, e),
            r
          ).on("end.style." + t, null);
    },
    styleTween: function (t, n, e) {
      var r = "style." + (t += "");
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == n) return this.tween(r, null);
      if ("function" != typeof n) throw new Error();
      return this.tween(r, I(t, n, null == e ? "" : e));
    },
    text: function (t) {
      return this.tween(
        "text",
        "function" == typeof t
          ? (function (t) {
              return function () {
                var n = t(this);
                this.textContent = null == n ? "" : n;
              };
            })(v(this, "text", t))
          : (function (t) {
              return function () {
                this.textContent = t;
              };
            })(null == t ? "" : t + "")
      );
    },
    textTween: function (t) {
      var n = "text";
      if (arguments.length < 1) return (n = this.tween(n)) && n._value;
      if (null == t) return this.tween(n, null);
      if ("function" != typeof t) throw new Error();
      return this.tween(n, $(t));
    },
    remove: function () {
      return this.on(
        "end.remove",
        (function (t) {
          return function () {
            var n = this.parentNode;
            for (var e in this.__transition) if (+e !== t) return;
            n && n.removeChild(this);
          };
        })(this._id)
      );
    },
    tween: function (t, n) {
      var e = this._id;
      if (((t += ""), arguments.length < 2)) {
        for (
          var r, i = h(this.node(), e).tween, o = 0, u = i.length;
          o < u;
          ++o
        )
          if ((r = i[o]).name === t) return r.value;
        return null;
      }
      return this.each((null == n ? p : _)(e, t, n));
    },
    delay: function (t) {
      var n = this._id;
      return arguments.length
        ? this.each(("function" == typeof t ? N : q)(n, t))
        : h(this.node(), n).delay;
    },
    duration: function (t) {
      var n = this._id;
      return arguments.length
        ? this.each(("function" == typeof t ? P : z)(n, t))
        : h(this.node(), n).duration;
    },
    ease: function (t) {
      var n = this._id;
      return arguments.length ? this.each(O(n, t)) : h(this.node(), n).ease;
    },
    easeVarying: function (t) {
      if ("function" != typeof t) throw new Error();
      return this.each(
        (function (t, n) {
          return function () {
            var e = n.apply(this, arguments);
            if ("function" != typeof e) throw new Error();
            c(this, t).ease = e;
          };
        })(this._id, t)
      );
    },
    end: function () {
      var t,
        n,
        e = this,
        r = e._id,
        i = e.size();
      return new Promise(function (o, u) {
        var a = { value: u },
          s = {
            value: function () {
              0 == --i && o();
            },
          };
        e.each(function () {
          var e = c(this, r),
            i = e.on;
          i !== t &&
            ((n = (t = i).copy())._.cancel.push(a),
            n._.interrupt.push(a),
            n._.end.push(s)),
            (e.on = n);
        }),
          0 === i && o();
      });
    },
    [Symbol.iterator]: H[Symbol.iterator],
  };
  var J = { time: null, delay: 0, duration: 250, ease: u.easeCubicInOut };
  function K(t, n) {
    for (var e; !(e = t.__transition) || !(e = e[n]); )
      if (!(t = t.parentNode)) throw new Error(`transition ${n} not found`);
    return e;
  }
  (n.selection.prototype.interrupt = function (t) {
    return this.each(function () {
      d(this, t);
    });
  }),
    (n.selection.prototype.transition = function (t) {
      var n, e;
      t instanceof D
        ? ((n = t._id), (t = t._name))
        : ((n = G()),
          ((e = J).time = r.now()),
          (t = null == t ? null : t + ""));
      for (var i = this._groups, o = i.length, u = 0; u < o; ++u)
        for (var a, s = i[u], f = s.length, c = 0; c < f; ++c)
          (a = s[c]) && l(a, t, n, c, s, e || K(a, n));
      return new D(i, this._parents, t, n);
    });
  var L = [null];
  (t.active = function (t, n) {
    var e,
      r,
      i = t.__transition;
    if (i)
      for (r in ((n = null == n ? null : n + ""), i))
        if ((e = i[r]).state > 1 && e.name === n) return new D([[t]], L, n, +r);
    return null;
  }),
    (t.interrupt = d),
    (t.transition = F),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
