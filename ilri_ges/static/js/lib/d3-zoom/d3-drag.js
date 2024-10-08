// https://d3js.org/d3-drag/ v3.0.0 Copyright 2010-2021 Mike Bostock
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports, require("d3-dispatch"), require("d3-selection"))
    : "function" == typeof define && define.amd
    ? define(["exports", "d3-dispatch", "d3-selection"], t)
    : t(
        ((e = "undefined" != typeof globalThis ? globalThis : e || self).d3 =
          e.d3 || {}),
        e.d3,
        e.d3
      );
})(this, function (e, t, n) {
  "use strict";
  const o = { passive: !1 },
    r = { capture: !0, passive: !1 };
  function i(e) {
    e.stopImmediatePropagation();
  }
  function a(e) {
    e.preventDefault(), e.stopImmediatePropagation();
  }
  function u(e) {
    var t = e.document.documentElement,
      o = n.select(e).on("dragstart.drag", a, r);
    "onselectstart" in t
      ? o.on("selectstart.drag", a, r)
      : ((t.__noselect = t.style.MozUserSelect),
        (t.style.MozUserSelect = "none"));
  }
  function c(e, t) {
    var o = e.document.documentElement,
      i = n.select(e).on("dragstart.drag", null);
    t &&
      (i.on("click.drag", a, r),
      setTimeout(function () {
        i.on("click.drag", null);
      }, 0)),
      "onselectstart" in o
        ? i.on("selectstart.drag", null)
        : ((o.style.MozUserSelect = o.__noselect), delete o.__noselect);
  }
  var l = (e) => () => e;
  function s(
    e,
    {
      sourceEvent: t,
      subject: n,
      target: o,
      identifier: r,
      active: i,
      x: a,
      y: u,
      dx: c,
      dy: l,
      dispatch: s,
    }
  ) {
    Object.defineProperties(this, {
      type: { value: e, enumerable: !0, configurable: !0 },
      sourceEvent: { value: t, enumerable: !0, configurable: !0 },
      subject: { value: n, enumerable: !0, configurable: !0 },
      target: { value: o, enumerable: !0, configurable: !0 },
      identifier: { value: r, enumerable: !0, configurable: !0 },
      active: { value: i, enumerable: !0, configurable: !0 },
      x: { value: a, enumerable: !0, configurable: !0 },
      y: { value: u, enumerable: !0, configurable: !0 },
      dx: { value: c, enumerable: !0, configurable: !0 },
      dy: { value: l, enumerable: !0, configurable: !0 },
      _: { value: s },
    });
  }
  function d(e) {
    return !e.ctrlKey && !e.button;
  }
  function f() {
    return this.parentNode;
  }
  function g(e, t) {
    return null == t ? { x: e.x, y: e.y } : t;
  }
  function h() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  (s.prototype.on = function () {
    var e = this._.on.apply(this._, arguments);
    return e === this._ ? this : e;
  }),
    (e.drag = function () {
      var e,
        v,
        p,
        b,
        m = d,
        y = f,
        x = g,
        _ = h,
        w = {},
        T = t.dispatch("start", "drag", "end"),
        j = 0,
        E = 0;
      function k(e) {
        e.on("mousedown.drag", M)
          .filter(_)
          .on("touchstart.drag", z)
          .on("touchmove.drag", D, o)
          .on("touchend.drag touchcancel.drag", S)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }
      function M(t, o) {
        if (!b && m.call(this, t, o)) {
          var a = U(this, y.call(this, t, o), t, o, "mouse");
          a &&
            (n
              .select(t.view)
              .on("mousemove.drag", P, r)
              .on("mouseup.drag", q, r),
            u(t.view),
            i(t),
            (p = !1),
            (e = t.clientX),
            (v = t.clientY),
            a("start", t));
        }
      }
      function P(t) {
        if ((a(t), !p)) {
          var n = t.clientX - e,
            o = t.clientY - v;
          p = n * n + o * o > E;
        }
        w.mouse("drag", t);
      }
      function q(e) {
        n.select(e.view).on("mousemove.drag mouseup.drag", null),
          c(e.view, p),
          a(e),
          w.mouse("end", e);
      }
      function z(e, t) {
        if (m.call(this, e, t)) {
          var n,
            o,
            r = e.changedTouches,
            a = y.call(this, e, t),
            u = r.length;
          for (n = 0; n < u; ++n)
            (o = U(this, a, e, t, r[n].identifier, r[n])) &&
              (i(e), o("start", e, r[n]));
        }
      }
      function D(e) {
        var t,
          n,
          o = e.changedTouches,
          r = o.length;
        for (t = 0; t < r; ++t)
          (n = w[o[t].identifier]) && (a(e), n("drag", e, o[t]));
      }
      function S(e) {
        var t,
          n,
          o = e.changedTouches,
          r = o.length;
        for (
          b && clearTimeout(b),
            b = setTimeout(function () {
              b = null;
            }, 500),
            t = 0;
          t < r;
          ++t
        )
          (n = w[o[t].identifier]) && (i(e), n("end", e, o[t]));
      }
      function U(e, t, o, r, i, a) {
        var u,
          c,
          l,
          d = T.copy(),
          f = n.pointer(a || o, t);
        if (
          null !=
          (l = x.call(
            e,
            new s("beforestart", {
              sourceEvent: o,
              target: k,
              identifier: i,
              active: j,
              x: f[0],
              y: f[1],
              dx: 0,
              dy: 0,
              dispatch: d,
            }),
            r
          ))
        )
          return (
            (u = l.x - f[0] || 0),
            (c = l.y - f[1] || 0),
            function o(a, g, h) {
              var v,
                p = f;
              switch (a) {
                case "start":
                  (w[i] = o), (v = j++);
                  break;
                case "end":
                  delete w[i], --j;
                case "drag":
                  (f = n.pointer(h || g, t)), (v = j);
              }
              d.call(
                a,
                e,
                new s(a, {
                  sourceEvent: g,
                  subject: l,
                  target: k,
                  identifier: i,
                  active: v,
                  x: f[0] + u,
                  y: f[1] + c,
                  dx: f[0] - p[0],
                  dy: f[1] - p[1],
                  dispatch: d,
                }),
                r
              );
            }
          );
      }
      return (
        (k.filter = function (e) {
          return arguments.length
            ? ((m = "function" == typeof e ? e : l(!!e)), k)
            : m;
        }),
        (k.container = function (e) {
          return arguments.length
            ? ((y = "function" == typeof e ? e : l(e)), k)
            : y;
        }),
        (k.subject = function (e) {
          return arguments.length
            ? ((x = "function" == typeof e ? e : l(e)), k)
            : x;
        }),
        (k.touchable = function (e) {
          return arguments.length
            ? ((_ = "function" == typeof e ? e : l(!!e)), k)
            : _;
        }),
        (k.on = function () {
          var e = T.on.apply(T, arguments);
          return e === T ? k : e;
        }),
        (k.clickDistance = function (e) {
          return arguments.length ? ((E = (e = +e) * e), k) : Math.sqrt(E);
        }),
        k
      );
    }),
    (e.dragDisable = u),
    (e.dragEnable = c),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
