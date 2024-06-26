// https://d3js.org/d3-interpolate/ v3.0.1 Copyright 2010-2021 Mike Bostock
!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? n(exports, require("d3-color"))
    : "function" == typeof define && define.amd
    ? define(["exports", "d3-color"], n)
    : n(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {}),
        t.d3
      );
})(this, function (t, n) {
  "use strict";
  function r(t, n, r, e, a) {
    var o = t * t,
      u = o * t;
    return (
      ((1 - 3 * t + 3 * o - u) * n +
        (4 - 6 * o + 3 * u) * r +
        (1 + 3 * t + 3 * o - 3 * u) * e +
        u * a) /
      6
    );
  }
  function e(t) {
    var n = t.length - 1;
    return function (e) {
      var a = e <= 0 ? (e = 0) : e >= 1 ? ((e = 1), n - 1) : Math.floor(e * n),
        o = t[a],
        u = t[a + 1],
        i = a > 0 ? t[a - 1] : 2 * o - u,
        c = a < n - 1 ? t[a + 2] : 2 * u - o;
      return r((e - a / n) * n, i, o, u, c);
    };
  }
  function a(t) {
    var n = t.length;
    return function (e) {
      var a = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
        o = t[(a + n - 1) % n],
        u = t[a % n],
        i = t[(a + 1) % n],
        c = t[(a + 2) % n];
      return r((e - a / n) * n, o, u, i, c);
    };
  }
  var o = (t) => () => t;
  function u(t, n) {
    return function (r) {
      return t + r * n;
    };
  }
  function i(t, n) {
    var r = n - t;
    return r
      ? u(t, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r)
      : o(isNaN(t) ? n : t);
  }
  function c(t) {
    return 1 == (t = +t)
      ? l
      : function (n, r) {
          return r - n
            ? (function (t, n, r) {
                return (
                  (t = Math.pow(t, r)),
                  (n = Math.pow(n, r) - t),
                  (r = 1 / r),
                  function (e) {
                    return Math.pow(t + e * n, r);
                  }
                );
              })(n, r, t)
            : o(isNaN(n) ? r : n);
        };
  }
  function l(t, n) {
    var r = n - t;
    return r ? u(t, r) : o(isNaN(t) ? n : t);
  }
  var f = (function t(r) {
    var e = c(r);
    function a(t, r) {
      var a = e((t = n.rgb(t)).r, (r = n.rgb(r)).r),
        o = e(t.g, r.g),
        u = e(t.b, r.b),
        i = l(t.opacity, r.opacity);
      return function (n) {
        return (
          (t.r = a(n)), (t.g = o(n)), (t.b = u(n)), (t.opacity = i(n)), t + ""
        );
      };
    }
    return (a.gamma = t), a;
  })(1);
  function s(t) {
    return function (r) {
      var e,
        a,
        o = r.length,
        u = new Array(o),
        i = new Array(o),
        c = new Array(o);
      for (e = 0; e < o; ++e)
        (a = n.rgb(r[e])),
          (u[e] = a.r || 0),
          (i[e] = a.g || 0),
          (c[e] = a.b || 0);
      return (
        (u = t(u)),
        (i = t(i)),
        (c = t(c)),
        (a.opacity = 1),
        function (t) {
          return (a.r = u(t)), (a.g = i(t)), (a.b = c(t)), a + "";
        }
      );
    };
  }
  var h = s(e),
    p = s(a);
  function v(t, n) {
    n || (n = []);
    var r,
      e = t ? Math.min(n.length, t.length) : 0,
      a = n.slice();
    return function (o) {
      for (r = 0; r < e; ++r) a[r] = t[r] * (1 - o) + n[r] * o;
      return a;
    };
  }
  function g(t) {
    return ArrayBuffer.isView(t) && !(t instanceof DataView);
  }
  function M(t, n) {
    var r,
      e = n ? n.length : 0,
      a = t ? Math.min(e, t.length) : 0,
      o = new Array(a),
      u = new Array(e);
    for (r = 0; r < a; ++r) o[r] = X(t[r], n[r]);
    for (; r < e; ++r) u[r] = n[r];
    return function (t) {
      for (r = 0; r < a; ++r) u[r] = o[r](t);
      return u;
    };
  }
  function y(t, n) {
    var r = new Date();
    return (
      (t = +t),
      (n = +n),
      function (e) {
        return r.setTime(t * (1 - e) + n * e), r;
      }
    );
  }
  function b(t, n) {
    return (
      (t = +t),
      (n = +n),
      function (r) {
        return t * (1 - r) + n * r;
      }
    );
  }
  function d(t, n) {
    var r,
      e = {},
      a = {};
    for (r in ((null !== t && "object" == typeof t) || (t = {}),
    (null !== n && "object" == typeof n) || (n = {}),
    n))
      r in t ? (e[r] = X(t[r], n[r])) : (a[r] = n[r]);
    return function (t) {
      for (r in e) a[r] = e[r](t);
      return a;
    };
  }
  var x = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    w = new RegExp(x.source, "g");
  function m(t, n) {
    var r,
      e,
      a,
      o = (x.lastIndex = w.lastIndex = 0),
      u = -1,
      i = [],
      c = [];
    for (t += "", n += ""; (r = x.exec(t)) && (e = w.exec(n)); )
      (a = e.index) > o &&
        ((a = n.slice(o, a)), i[u] ? (i[u] += a) : (i[++u] = a)),
        (r = r[0]) === (e = e[0])
          ? i[u]
            ? (i[u] += e)
            : (i[++u] = e)
          : ((i[++u] = null), c.push({ i: u, x: b(r, e) })),
        (o = w.lastIndex);
    return (
      o < n.length && ((a = n.slice(o)), i[u] ? (i[u] += a) : (i[++u] = a)),
      i.length < 2
        ? c[0]
          ? (function (t) {
              return function (n) {
                return t(n) + "";
              };
            })(c[0].x)
          : (function (t) {
              return function () {
                return t;
              };
            })(n)
        : ((n = c.length),
          function (t) {
            for (var r, e = 0; e < n; ++e) i[(r = c[e]).i] = r.x(t);
            return i.join("");
          })
    );
  }
  function X(t, r) {
    var e,
      a = typeof r;
    return null == r || "boolean" === a
      ? o(r)
      : ("number" === a
          ? b
          : "string" === a
          ? (e = n.color(r))
            ? ((r = e), f)
            : m
          : r instanceof n.color
          ? f
          : r instanceof Date
          ? y
          : g(r)
          ? v
          : Array.isArray(r)
          ? M
          : ("function" != typeof r.valueOf &&
              "function" != typeof r.toString) ||
            isNaN(r)
          ? d
          : b)(t, r);
  }
  var A,
    N = 180 / Math.PI,
    S = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1,
    };
  function Y(t, n, r, e, a, o) {
    var u, i, c;
    return (
      (u = Math.sqrt(t * t + n * n)) && ((t /= u), (n /= u)),
      (c = t * r + n * e) && ((r -= t * c), (e -= n * c)),
      (i = Math.sqrt(r * r + e * e)) && ((r /= i), (e /= i), (c /= i)),
      t * e < n * r && ((t = -t), (n = -n), (c = -c), (u = -u)),
      {
        translateX: a,
        translateY: o,
        rotate: Math.atan2(n, t) * N,
        skewX: Math.atan(c) * N,
        scaleX: u,
        scaleY: i,
      }
    );
  }
  function j(t, n, r, e) {
    function a(t) {
      return t.length ? t.pop() + " " : "";
    }
    return function (o, u) {
      var i = [],
        c = [];
      return (
        (o = t(o)),
        (u = t(u)),
        (function (t, e, a, o, u, i) {
          if (t !== a || e !== o) {
            var c = u.push("translate(", null, n, null, r);
            i.push({ i: c - 4, x: b(t, a) }, { i: c - 2, x: b(e, o) });
          } else (a || o) && u.push("translate(" + a + n + o + r);
        })(o.translateX, o.translateY, u.translateX, u.translateY, i, c),
        (function (t, n, r, o) {
          t !== n
            ? (t - n > 180 ? (n += 360) : n - t > 180 && (t += 360),
              o.push({ i: r.push(a(r) + "rotate(", null, e) - 2, x: b(t, n) }))
            : n && r.push(a(r) + "rotate(" + n + e);
        })(o.rotate, u.rotate, i, c),
        (function (t, n, r, o) {
          t !== n
            ? o.push({ i: r.push(a(r) + "skewX(", null, e) - 2, x: b(t, n) })
            : n && r.push(a(r) + "skewX(" + n + e);
        })(o.skewX, u.skewX, i, c),
        (function (t, n, r, e, o, u) {
          if (t !== r || n !== e) {
            var i = o.push(a(o) + "scale(", null, ",", null, ")");
            u.push({ i: i - 4, x: b(t, r) }, { i: i - 2, x: b(n, e) });
          } else
            (1 === r && 1 === e) || o.push(a(o) + "scale(" + r + "," + e + ")");
        })(o.scaleX, o.scaleY, u.scaleX, u.scaleY, i, c),
        (o = u = null),
        function (t) {
          for (var n, r = -1, e = c.length; ++r < e; ) i[(n = c[r]).i] = n.x(t);
          return i.join("");
        }
      );
    };
  }
  var q = j(
      function (t) {
        const n = new (
          "function" == typeof DOMMatrix ? DOMMatrix : WebKitCSSMatrix
        )(t + "");
        return n.isIdentity ? S : Y(n.a, n.b, n.c, n.d, n.e, n.f);
      },
      "px, ",
      "px)",
      "deg)"
    ),
    D = j(
      function (t) {
        return null == t
          ? S
          : (A ||
              (A = document.createElementNS("http://www.w3.org/2000/svg", "g")),
            A.setAttribute("transform", t),
            (t = A.transform.baseVal.consolidate())
              ? Y((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f)
              : S);
      },
      ", ",
      ")",
      ")"
    );
  function R(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2;
  }
  var T = (function t(n, r, e) {
    function a(t, a) {
      var o,
        u,
        i = t[0],
        c = t[1],
        l = t[2],
        f = a[0],
        s = a[1],
        h = a[2],
        p = f - i,
        v = s - c,
        g = p * p + v * v;
      if (g < 1e-12)
        (u = Math.log(h / l) / n),
          (o = function (t) {
            return [i + t * p, c + t * v, l * Math.exp(n * t * u)];
          });
      else {
        var M = Math.sqrt(g),
          y = (h * h - l * l + e * g) / (2 * l * r * M),
          b = (h * h - l * l - e * g) / (2 * h * r * M),
          d = Math.log(Math.sqrt(y * y + 1) - y),
          x = Math.log(Math.sqrt(b * b + 1) - b);
        (u = (x - d) / n),
          (o = function (t) {
            var e,
              a = t * u,
              o = R(d),
              f =
                (l / (r * M)) *
                (o * ((e = n * a + d), ((e = Math.exp(2 * e)) - 1) / (e + 1)) -
                  (function (t) {
                    return ((t = Math.exp(t)) - 1 / t) / 2;
                  })(d));
            return [i + f * p, c + f * v, (l * o) / R(n * a + d)];
          });
      }
      return (o.duration = (1e3 * u * n) / Math.SQRT2), o;
    }
    return (
      (a.rho = function (n) {
        var r = Math.max(0.001, +n),
          e = r * r;
        return t(r, e, e * e);
      }),
      a
    );
  })(Math.SQRT2, 2, 4);
  function k(t) {
    return function (r, e) {
      var a = t((r = n.hsl(r)).h, (e = n.hsl(e)).h),
        o = l(r.s, e.s),
        u = l(r.l, e.l),
        i = l(r.opacity, e.opacity);
      return function (t) {
        return (
          (r.h = a(t)), (r.s = o(t)), (r.l = u(t)), (r.opacity = i(t)), r + ""
        );
      };
    };
  }
  var C = k(i),
    B = k(l);
  function H(t) {
    return function (r, e) {
      var a = t((r = n.hcl(r)).h, (e = n.hcl(e)).h),
        o = l(r.c, e.c),
        u = l(r.l, e.l),
        i = l(r.opacity, e.opacity);
      return function (t) {
        return (
          (r.h = a(t)), (r.c = o(t)), (r.l = u(t)), (r.opacity = i(t)), r + ""
        );
      };
    };
  }
  var I = H(i),
    O = H(l);
  function L(t) {
    return (function r(e) {
      function a(r, a) {
        var o = t((r = n.cubehelix(r)).h, (a = n.cubehelix(a)).h),
          u = l(r.s, a.s),
          i = l(r.l, a.l),
          c = l(r.opacity, a.opacity);
        return function (t) {
          return (
            (r.h = o(t)),
            (r.s = u(t)),
            (r.l = i(Math.pow(t, e))),
            (r.opacity = c(t)),
            r + ""
          );
        };
      }
      return (e = +e), (a.gamma = r), a;
    })(1);
  }
  var E = L(i),
    V = L(l);
  (t.interpolate = X),
    (t.interpolateArray = function (t, n) {
      return (g(n) ? v : M)(t, n);
    }),
    (t.interpolateBasis = e),
    (t.interpolateBasisClosed = a),
    (t.interpolateCubehelix = E),
    (t.interpolateCubehelixLong = V),
    (t.interpolateDate = y),
    (t.interpolateDiscrete = function (t) {
      var n = t.length;
      return function (r) {
        return t[Math.max(0, Math.min(n - 1, Math.floor(r * n)))];
      };
    }),
    (t.interpolateHcl = I),
    (t.interpolateHclLong = O),
    (t.interpolateHsl = C),
    (t.interpolateHslLong = B),
    (t.interpolateHue = function (t, n) {
      var r = i(+t, +n);
      return function (t) {
        var n = r(t);
        return n - 360 * Math.floor(n / 360);
      };
    }),
    (t.interpolateLab = function (t, r) {
      var e = l((t = n.lab(t)).l, (r = n.lab(r)).l),
        a = l(t.a, r.a),
        o = l(t.b, r.b),
        u = l(t.opacity, r.opacity);
      return function (n) {
        return (
          (t.l = e(n)), (t.a = a(n)), (t.b = o(n)), (t.opacity = u(n)), t + ""
        );
      };
    }),
    (t.interpolateNumber = b),
    (t.interpolateNumberArray = v),
    (t.interpolateObject = d),
    (t.interpolateRgb = f),
    (t.interpolateRgbBasis = h),
    (t.interpolateRgbBasisClosed = p),
    (t.interpolateRound = function (t, n) {
      return (
        (t = +t),
        (n = +n),
        function (r) {
          return Math.round(t * (1 - r) + n * r);
        }
      );
    }),
    (t.interpolateString = m),
    (t.interpolateTransformCss = q),
    (t.interpolateTransformSvg = D),
    (t.interpolateZoom = T),
    (t.piecewise = function (t, n) {
      void 0 === n && ((n = t), (t = X));
      for (
        var r = 0, e = n.length - 1, a = n[0], o = new Array(e < 0 ? 0 : e);
        r < e;

      )
        o[r] = t(a, (a = n[++r]));
      return function (t) {
        var n = Math.max(0, Math.min(e - 1, Math.floor((t *= e))));
        return o[n](t - n);
      };
    }),
    (t.quantize = function (t, n) {
      for (var r = new Array(n), e = 0; e < n; ++e) r[e] = t(e / (n - 1));
      return r;
    }),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
