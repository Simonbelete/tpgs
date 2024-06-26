// https://d3js.org/d3-zoom/ v3.0.0 Copyright 2010-2021 Mike Bostock
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(
        exports,
        require("d3-dispatch"),
        require("d3-drag"),
        require("d3-interpolate"),
        require("d3-selection"),
        require("d3-transition")
      )
    : "function" == typeof define && define.amd
    ? define(
        [
          "exports",
          "d3-dispatch",
          "d3-drag",
          "d3-interpolate",
          "d3-selection",
          "d3-transition",
        ],
        e
      )
    : e(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {}),
        t.d3,
        t.d3,
        t.d3,
        t.d3,
        t.d3
      );
})(this, function (t, e, n, o, i, r) {
  "use strict";
  var u = (t) => () => t;
  function s(t, { sourceEvent: e, target: n, transform: o, dispatch: i }) {
    Object.defineProperties(this, {
      type: { value: t, enumerable: !0, configurable: !0 },
      sourceEvent: { value: e, enumerable: !0, configurable: !0 },
      target: { value: n, enumerable: !0, configurable: !0 },
      transform: { value: o, enumerable: !0, configurable: !0 },
      _: { value: i },
    });
  }
  function h(t, e, n) {
    (this.k = t), (this.x = e), (this.y = n);
  }
  h.prototype = {
    constructor: h,
    scale: function (t) {
      return 1 === t ? this : new h(this.k * t, this.x, this.y);
    },
    translate: function (t, e) {
      return (0 === t) & (0 === e)
        ? this
        : new h(this.k, this.x + this.k * t, this.y + this.k * e);
    },
    apply: function (t) {
      return [t[0] * this.k + this.x, t[1] * this.k + this.y];
    },
    applyX: function (t) {
      return t * this.k + this.x;
    },
    applyY: function (t) {
      return t * this.k + this.y;
    },
    invert: function (t) {
      return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
    },
    invertX: function (t) {
      return (t - this.x) / this.k;
    },
    invertY: function (t) {
      return (t - this.y) / this.k;
    },
    rescaleX: function (t) {
      return t
        .copy()
        .domain(t.range().map(this.invertX, this).map(t.invert, t));
    },
    rescaleY: function (t) {
      return t
        .copy()
        .domain(t.range().map(this.invertY, this).map(t.invert, t));
    },
    toString: function () {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    },
  };
  var a = new h(1, 0, 0);
  function c(t) {
    for (; !t.__zoom; ) if (!(t = t.parentNode)) return a;
    return t.__zoom;
  }
  function l(t) {
    t.stopImmediatePropagation();
  }
  function f(t) {
    t.preventDefault(), t.stopImmediatePropagation();
  }
  function p(t) {
    return !((t.ctrlKey && "wheel" !== t.type) || t.button);
  }
  function m() {
    var t = this;
    return t instanceof SVGElement
      ? (t = t.ownerSVGElement || t).hasAttribute("viewBox")
        ? [
            [(t = t.viewBox.baseVal).x, t.y],
            [t.x + t.width, t.y + t.height],
          ]
        : [
            [0, 0],
            [t.width.baseVal.value, t.height.baseVal.value],
          ]
      : [
          [0, 0],
          [t.clientWidth, t.clientHeight],
        ];
  }
  function v() {
    return this.__zoom || a;
  }
  function d(t) {
    return (
      -t.deltaY *
      (1 === t.deltaMode ? 0.05 : t.deltaMode ? 1 : 0.002) *
      (t.ctrlKey ? 10 : 1)
    );
  }
  function y() {
    return navigator.maxTouchPoints || "ontouchstart" in this;
  }
  function g(t, e, n) {
    var o = t.invertX(e[0][0]) - n[0][0],
      i = t.invertX(e[1][0]) - n[1][0],
      r = t.invertY(e[0][1]) - n[0][1],
      u = t.invertY(e[1][1]) - n[1][1];
    return t.translate(
      i > o ? (o + i) / 2 : Math.min(0, o) || Math.max(0, i),
      u > r ? (r + u) / 2 : Math.min(0, r) || Math.max(0, u)
    );
  }
  (c.prototype = h.prototype),
    (t.ZoomTransform = h),
    (t.zoom = function () {
      var t,
        c,
        z,
        _ = p,
        x = m,
        k = g,
        w = d,
        b = y,
        T = [0, 1 / 0],
        M = [
          [-1 / 0, -1 / 0],
          [1 / 0, 1 / 0],
        ],
        E = 250,
        Y = o.interpolateZoom,
        X = e.dispatch("start", "zoom", "end"),
        q = 500,
        D = 0,
        P = 10;
      function V(t) {
        t.property("__zoom", v)
          .on("wheel.zoom", O, { passive: !1 })
          .on("mousedown.zoom", Z)
          .on("dblclick.zoom", A)
          .filter(b)
          .on("touchstart.zoom", H)
          .on("touchmove.zoom", N)
          .on("touchend.zoom touchcancel.zoom", W)
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }
      function B(t, e) {
        return (e = Math.max(T[0], Math.min(T[1], e))) === t.k
          ? t
          : new h(e, t.x, t.y);
      }
      function j(t, e, n) {
        var o = e[0] - n[0] * t.k,
          i = e[1] - n[1] * t.k;
        return o === t.x && i === t.y ? t : new h(t.k, o, i);
      }
      function I(t) {
        return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2];
      }
      function K(t, e, n, o) {
        t.on("start.zoom", function () {
          S(this, arguments).event(o).start();
        })
          .on("interrupt.zoom end.zoom", function () {
            S(this, arguments).event(o).end();
          })
          .tween("zoom", function () {
            var t = this,
              i = arguments,
              r = S(t, i).event(o),
              u = x.apply(t, i),
              s = null == n ? I(u) : "function" == typeof n ? n.apply(t, i) : n,
              a = Math.max(u[1][0] - u[0][0], u[1][1] - u[0][1]),
              c = t.__zoom,
              l = "function" == typeof e ? e.apply(t, i) : e,
              f = Y(c.invert(s).concat(a / c.k), l.invert(s).concat(a / l.k));
            return function (t) {
              if (1 === t) t = l;
              else {
                var e = f(t),
                  n = a / e[2];
                t = new h(n, s[0] - e[0] * n, s[1] - e[1] * n);
              }
              r.zoom(null, t);
            };
          });
      }
      function S(t, e, n) {
        return (!n && t.__zooming) || new G(t, e);
      }
      function G(t, e) {
        (this.that = t),
          (this.args = e),
          (this.active = 0),
          (this.sourceEvent = null),
          (this.extent = x.apply(t, e)),
          (this.taps = 0);
      }
      function O(t, ...e) {
        if (_.apply(this, arguments)) {
          var n = S(this, e).event(t),
            o = this.__zoom,
            u = Math.max(
              T[0],
              Math.min(T[1], o.k * Math.pow(2, w.apply(this, arguments)))
            ),
            s = i.pointer(t);
          if (n.wheel)
            (n.mouse[0][0] === s[0] && n.mouse[0][1] === s[1]) ||
              (n.mouse[1] = o.invert((n.mouse[0] = s))),
              clearTimeout(n.wheel);
          else {
            if (o.k === u) return;
            (n.mouse = [s, o.invert(s)]), r.interrupt(this), n.start();
          }
          f(t),
            (n.wheel = setTimeout(h, 150)),
            n.zoom("mouse", k(j(B(o, u), n.mouse[0], n.mouse[1]), n.extent, M));
        }
        function h() {
          (n.wheel = null), n.end();
        }
      }
      function Z(t, ...e) {
        if (!z && _.apply(this, arguments)) {
          var o = t.currentTarget,
            u = S(this, e, !0).event(t),
            s = i
              .select(t.view)
              .on("mousemove.zoom", p, !0)
              .on("mouseup.zoom", m, !0),
            h = i.pointer(t, o),
            a = t.clientX,
            c = t.clientY;
          n.dragDisable(t.view),
            l(t),
            (u.mouse = [h, this.__zoom.invert(h)]),
            r.interrupt(this),
            u.start();
        }
        function p(t) {
          if ((f(t), !u.moved)) {
            var e = t.clientX - a,
              n = t.clientY - c;
            u.moved = e * e + n * n > D;
          }
          u.event(t).zoom(
            "mouse",
            k(
              j(u.that.__zoom, (u.mouse[0] = i.pointer(t, o)), u.mouse[1]),
              u.extent,
              M
            )
          );
        }
        function m(t) {
          s.on("mousemove.zoom mouseup.zoom", null),
            n.dragEnable(t.view, u.moved),
            f(t),
            u.event(t).end();
        }
      }
      function A(t, ...e) {
        if (_.apply(this, arguments)) {
          var n = this.__zoom,
            o = i.pointer(t.changedTouches ? t.changedTouches[0] : t, this),
            r = n.invert(o),
            u = n.k * (t.shiftKey ? 0.5 : 2),
            s = k(j(B(n, u), o, r), x.apply(this, e), M);
          f(t),
            E > 0
              ? i.select(this).transition().duration(E).call(K, s, o, t)
              : i.select(this).call(V.transform, s, o, t);
        }
      }
      function H(e, ...n) {
        if (_.apply(this, arguments)) {
          var o,
            u,
            s,
            h,
            a = e.touches,
            f = a.length,
            p = S(this, n, e.changedTouches.length === f).event(e);
          for (l(e), u = 0; u < f; ++u)
            (s = a[u]),
              (h = [
                (h = i.pointer(s, this)),
                this.__zoom.invert(h),
                s.identifier,
              ]),
              p.touch0
                ? p.touch1 ||
                  p.touch0[2] === h[2] ||
                  ((p.touch1 = h), (p.taps = 0))
                : ((p.touch0 = h), (o = !0), (p.taps = 1 + !!t));
          t && (t = clearTimeout(t)),
            o &&
              (p.taps < 2 &&
                ((c = h[0]),
                (t = setTimeout(function () {
                  t = null;
                }, q))),
              r.interrupt(this),
              p.start());
        }
      }
      function N(t, ...e) {
        if (this.__zooming) {
          var n,
            o,
            r,
            u,
            s = S(this, e).event(t),
            h = t.changedTouches,
            a = h.length;
          for (f(t), n = 0; n < a; ++n)
            (o = h[n]),
              (r = i.pointer(o, this)),
              s.touch0 && s.touch0[2] === o.identifier
                ? (s.touch0[0] = r)
                : s.touch1 && s.touch1[2] === o.identifier && (s.touch1[0] = r);
          if (((o = s.that.__zoom), s.touch1)) {
            var c = s.touch0[0],
              l = s.touch0[1],
              p = s.touch1[0],
              m = s.touch1[1],
              v = (v = p[0] - c[0]) * v + (v = p[1] - c[1]) * v,
              d = (d = m[0] - l[0]) * d + (d = m[1] - l[1]) * d;
            (o = B(o, Math.sqrt(v / d))),
              (r = [(c[0] + p[0]) / 2, (c[1] + p[1]) / 2]),
              (u = [(l[0] + m[0]) / 2, (l[1] + m[1]) / 2]);
          } else {
            if (!s.touch0) return;
            (r = s.touch0[0]), (u = s.touch0[1]);
          }
          s.zoom("touch", k(j(o, r, u), s.extent, M));
        }
      }
      function W(t, ...e) {
        if (this.__zooming) {
          var n,
            o,
            r = S(this, e).event(t),
            u = t.changedTouches,
            s = u.length;
          for (
            l(t),
              z && clearTimeout(z),
              z = setTimeout(function () {
                z = null;
              }, q),
              n = 0;
            n < s;
            ++n
          )
            (o = u[n]),
              r.touch0 && r.touch0[2] === o.identifier
                ? delete r.touch0
                : r.touch1 && r.touch1[2] === o.identifier && delete r.touch1;
          if (
            (r.touch1 && !r.touch0 && ((r.touch0 = r.touch1), delete r.touch1),
            r.touch0)
          )
            r.touch0[1] = this.__zoom.invert(r.touch0[0]);
          else if (
            (r.end(),
            2 === r.taps &&
              ((o = i.pointer(o, this)),
              Math.hypot(c[0] - o[0], c[1] - o[1]) < P))
          ) {
            var h = i.select(this).on("dblclick.zoom");
            h && h.apply(this, arguments);
          }
        }
      }
      return (
        (V.transform = function (t, e, n, o) {
          var i = t.selection ? t.selection() : t;
          i.property("__zoom", v),
            t !== i
              ? K(t, e, n, o)
              : i.interrupt().each(function () {
                  S(this, arguments)
                    .event(o)
                    .start()
                    .zoom(
                      null,
                      "function" == typeof e ? e.apply(this, arguments) : e
                    )
                    .end();
                });
        }),
        (V.scaleBy = function (t, e, n, o) {
          V.scaleTo(
            t,
            function () {
              var t = this.__zoom.k,
                n = "function" == typeof e ? e.apply(this, arguments) : e;
              return t * n;
            },
            n,
            o
          );
        }),
        (V.scaleTo = function (t, e, n, o) {
          V.transform(
            t,
            function () {
              var t = x.apply(this, arguments),
                o = this.__zoom,
                i =
                  null == n
                    ? I(t)
                    : "function" == typeof n
                    ? n.apply(this, arguments)
                    : n,
                r = o.invert(i),
                u = "function" == typeof e ? e.apply(this, arguments) : e;
              return k(j(B(o, u), i, r), t, M);
            },
            n,
            o
          );
        }),
        (V.translateBy = function (t, e, n, o) {
          V.transform(
            t,
            function () {
              return k(
                this.__zoom.translate(
                  "function" == typeof e ? e.apply(this, arguments) : e,
                  "function" == typeof n ? n.apply(this, arguments) : n
                ),
                x.apply(this, arguments),
                M
              );
            },
            null,
            o
          );
        }),
        (V.translateTo = function (t, e, n, o, i) {
          V.transform(
            t,
            function () {
              var t = x.apply(this, arguments),
                i = this.__zoom,
                r =
                  null == o
                    ? I(t)
                    : "function" == typeof o
                    ? o.apply(this, arguments)
                    : o;
              return k(
                a
                  .translate(r[0], r[1])
                  .scale(i.k)
                  .translate(
                    "function" == typeof e ? -e.apply(this, arguments) : -e,
                    "function" == typeof n ? -n.apply(this, arguments) : -n
                  ),
                t,
                M
              );
            },
            o,
            i
          );
        }),
        (G.prototype = {
          event: function (t) {
            return t && (this.sourceEvent = t), this;
          },
          start: function () {
            return (
              1 == ++this.active &&
                ((this.that.__zooming = this), this.emit("start")),
              this
            );
          },
          zoom: function (t, e) {
            return (
              this.mouse &&
                "mouse" !== t &&
                (this.mouse[1] = e.invert(this.mouse[0])),
              this.touch0 &&
                "touch" !== t &&
                (this.touch0[1] = e.invert(this.touch0[0])),
              this.touch1 &&
                "touch" !== t &&
                (this.touch1[1] = e.invert(this.touch1[0])),
              (this.that.__zoom = e),
              this.emit("zoom"),
              this
            );
          },
          end: function () {
            return (
              0 == --this.active &&
                (delete this.that.__zooming, this.emit("end")),
              this
            );
          },
          emit: function (t) {
            var e = i.select(this.that).datum();
            X.call(
              t,
              this.that,
              new s(t, {
                sourceEvent: this.sourceEvent,
                target: V,
                type: t,
                transform: this.that.__zoom,
                dispatch: X,
              }),
              e
            );
          },
        }),
        (V.wheelDelta = function (t) {
          return arguments.length
            ? ((w = "function" == typeof t ? t : u(+t)), V)
            : w;
        }),
        (V.filter = function (t) {
          return arguments.length
            ? ((_ = "function" == typeof t ? t : u(!!t)), V)
            : _;
        }),
        (V.touchable = function (t) {
          return arguments.length
            ? ((b = "function" == typeof t ? t : u(!!t)), V)
            : b;
        }),
        (V.extent = function (t) {
          return arguments.length
            ? ((x =
                "function" == typeof t
                  ? t
                  : u([
                      [+t[0][0], +t[0][1]],
                      [+t[1][0], +t[1][1]],
                    ])),
              V)
            : x;
        }),
        (V.scaleExtent = function (t) {
          return arguments.length
            ? ((T[0] = +t[0]), (T[1] = +t[1]), V)
            : [T[0], T[1]];
        }),
        (V.translateExtent = function (t) {
          return arguments.length
            ? ((M[0][0] = +t[0][0]),
              (M[1][0] = +t[1][0]),
              (M[0][1] = +t[0][1]),
              (M[1][1] = +t[1][1]),
              V)
            : [
                [M[0][0], M[0][1]],
                [M[1][0], M[1][1]],
              ];
        }),
        (V.constrain = function (t) {
          return arguments.length ? ((k = t), V) : k;
        }),
        (V.duration = function (t) {
          return arguments.length ? ((E = +t), V) : E;
        }),
        (V.interpolate = function (t) {
          return arguments.length ? ((Y = t), V) : Y;
        }),
        (V.on = function () {
          var t = X.on.apply(X, arguments);
          return t === X ? V : t;
        }),
        (V.clickDistance = function (t) {
          return arguments.length ? ((D = (t = +t) * t), V) : Math.sqrt(D);
        }),
        (V.tapDistance = function (t) {
          return arguments.length ? ((P = +t), V) : P;
        }),
        V
      );
    }),
    (t.zoomIdentity = a),
    (t.zoomTransform = c),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
