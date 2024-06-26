// https://d3js.org/d3-hierarchy/ v3.1.2 Copyright 2010-2021 Mike Bostock
!(function (n, r) {
  "object" == typeof exports && "undefined" != typeof module
    ? r(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], r)
    : r(
        ((n = "undefined" != typeof globalThis ? globalThis : n || self).d3 =
          n.d3 || {})
      );
})(this, function (n) {
  "use strict";
  function r(n, r) {
    return n.parent === r.parent ? 1 : 2;
  }
  function t(n, r) {
    return n + r.x;
  }
  function e(n, r) {
    return Math.max(n, r.y);
  }
  function i(n) {
    var r = 0,
      t = n.children,
      e = t && t.length;
    if (e) for (; --e >= 0; ) r += t[e].value;
    else r = 1;
    n.value = r;
  }
  function u(n, r) {
    n instanceof Map
      ? ((n = [void 0, n]), void 0 === r && (r = f))
      : void 0 === r && (r = o);
    for (var t, e, i, u, a, l = new h(n), p = [l]; (t = p.pop()); )
      if ((i = r(t.data)) && (a = (i = Array.from(i)).length))
        for (t.children = i, u = a - 1; u >= 0; --u)
          p.push((e = i[u] = new h(i[u]))),
            (e.parent = t),
            (e.depth = t.depth + 1);
    return l.eachBefore(c);
  }
  function o(n) {
    return n.children;
  }
  function f(n) {
    return Array.isArray(n) ? n[1] : null;
  }
  function a(n) {
    void 0 !== n.data.value && (n.value = n.data.value), (n.data = n.data.data);
  }
  function c(n) {
    var r = 0;
    do {
      n.height = r;
    } while ((n = n.parent) && n.height < ++r);
  }
  function h(n) {
    (this.data = n), (this.depth = this.height = 0), (this.parent = null);
  }
  function l(n) {
    return null == n ? null : p(n);
  }
  function p(n) {
    if ("function" != typeof n) throw new Error();
    return n;
  }
  function d() {
    return 0;
  }
  function s(n) {
    return function () {
      return n;
    };
  }
  h.prototype = u.prototype = {
    constructor: h,
    count: function () {
      return this.eachAfter(i);
    },
    each: function (n, r) {
      let t = -1;
      for (const e of this) n.call(r, e, ++t, this);
      return this;
    },
    eachAfter: function (n, r) {
      for (var t, e, i, u = this, o = [u], f = [], a = -1; (u = o.pop()); )
        if ((f.push(u), (t = u.children)))
          for (e = 0, i = t.length; e < i; ++e) o.push(t[e]);
      for (; (u = f.pop()); ) n.call(r, u, ++a, this);
      return this;
    },
    eachBefore: function (n, r) {
      for (var t, e, i = this, u = [i], o = -1; (i = u.pop()); )
        if ((n.call(r, i, ++o, this), (t = i.children)))
          for (e = t.length - 1; e >= 0; --e) u.push(t[e]);
      return this;
    },
    find: function (n, r) {
      let t = -1;
      for (const e of this) if (n.call(r, e, ++t, this)) return e;
    },
    sum: function (n) {
      return this.eachAfter(function (r) {
        for (
          var t = +n(r.data) || 0, e = r.children, i = e && e.length;
          --i >= 0;

        )
          t += e[i].value;
        r.value = t;
      });
    },
    sort: function (n) {
      return this.eachBefore(function (r) {
        r.children && r.children.sort(n);
      });
    },
    path: function (n) {
      for (
        var r = this,
          t = (function (n, r) {
            if (n === r) return n;
            var t = n.ancestors(),
              e = r.ancestors(),
              i = null;
            (n = t.pop()), (r = e.pop());
            for (; n === r; ) (i = n), (n = t.pop()), (r = e.pop());
            return i;
          })(r, n),
          e = [r];
        r !== t;

      )
        (r = r.parent), e.push(r);
      for (var i = e.length; n !== t; ) e.splice(i, 0, n), (n = n.parent);
      return e;
    },
    ancestors: function () {
      for (var n = this, r = [n]; (n = n.parent); ) r.push(n);
      return r;
    },
    descendants: function () {
      return Array.from(this);
    },
    leaves: function () {
      var n = [];
      return (
        this.eachBefore(function (r) {
          r.children || n.push(r);
        }),
        n
      );
    },
    links: function () {
      var n = this,
        r = [];
      return (
        n.each(function (t) {
          t !== n && r.push({ source: t.parent, target: t });
        }),
        r
      );
    },
    copy: function () {
      return u(this).eachBefore(a);
    },
    [Symbol.iterator]: function* () {
      var n,
        r,
        t,
        e,
        i = this,
        u = [i];
      do {
        for (n = u.reverse(), u = []; (i = n.pop()); )
          if ((yield i, (r = i.children)))
            for (t = 0, e = r.length; t < e; ++t) u.push(r[t]);
      } while (u.length);
    },
  };
  const v = 4294967296;
  function x() {
    let n = 1;
    return () => (n = (1664525 * n + 1013904223) % v) / v;
  }
  function y(n, r) {
    for (
      var t,
        e,
        i = 0,
        u = (n = (function (n, r) {
          let t,
            e,
            i = n.length;
          for (; i; )
            (e = (r() * i--) | 0), (t = n[i]), (n[i] = n[e]), (n[e] = t);
          return n;
        })(Array.from(n), r)).length,
        o = [];
      i < u;

    )
      (t = n[i]), e && w(e, t) ? ++i : ((e = M((o = g(o, t)))), (i = 0));
    return e;
  }
  function g(n, r) {
    var t, e;
    if (_(r, n)) return [r];
    for (t = 0; t < n.length; ++t)
      if (m(r, n[t]) && _(z(n[t], r), n)) return [n[t], r];
    for (t = 0; t < n.length - 1; ++t)
      for (e = t + 1; e < n.length; ++e)
        if (
          m(z(n[t], n[e]), r) &&
          m(z(n[t], r), n[e]) &&
          m(z(n[e], r), n[t]) &&
          _(B(n[t], n[e], r), n)
        )
          return [n[t], n[e], r];
    throw new Error();
  }
  function m(n, r) {
    var t = n.r - r.r,
      e = r.x - n.x,
      i = r.y - n.y;
    return t < 0 || t * t < e * e + i * i;
  }
  function w(n, r) {
    var t = n.r - r.r + 1e-9 * Math.max(n.r, r.r, 1),
      e = r.x - n.x,
      i = r.y - n.y;
    return t > 0 && t * t > e * e + i * i;
  }
  function _(n, r) {
    for (var t = 0; t < r.length; ++t) if (!w(n, r[t])) return !1;
    return !0;
  }
  function M(n) {
    switch (n.length) {
      case 1:
        return (function (n) {
          return { x: n.x, y: n.y, r: n.r };
        })(n[0]);
      case 2:
        return z(n[0], n[1]);
      case 3:
        return B(n[0], n[1], n[2]);
    }
  }
  function z(n, r) {
    var t = n.x,
      e = n.y,
      i = n.r,
      u = r.x,
      o = r.y,
      f = r.r,
      a = u - t,
      c = o - e,
      h = f - i,
      l = Math.sqrt(a * a + c * c);
    return {
      x: (t + u + (a / l) * h) / 2,
      y: (e + o + (c / l) * h) / 2,
      r: (l + i + f) / 2,
    };
  }
  function B(n, r, t) {
    var e = n.x,
      i = n.y,
      u = n.r,
      o = r.x,
      f = r.y,
      a = r.r,
      c = t.x,
      h = t.y,
      l = t.r,
      p = e - o,
      d = e - c,
      s = i - f,
      v = i - h,
      x = a - u,
      y = l - u,
      g = e * e + i * i - u * u,
      m = g - o * o - f * f + a * a,
      w = g - c * c - h * h + l * l,
      _ = d * s - p * v,
      M = (s * w - v * m) / (2 * _) - e,
      z = (v * x - s * y) / _,
      B = (d * m - p * w) / (2 * _) - i,
      A = (p * y - d * x) / _,
      b = z * z + A * A - 1,
      q = 2 * (u + M * z + B * A),
      E = M * M + B * B - u * u,
      S = -(Math.abs(b) > 1e-6
        ? (q + Math.sqrt(q * q - 4 * b * E)) / (2 * b)
        : E / q);
    return { x: e + M + z * S, y: i + B + A * S, r: S };
  }
  function A(n, r, t) {
    var e,
      i,
      u,
      o,
      f = n.x - r.x,
      a = n.y - r.y,
      c = f * f + a * a;
    c
      ? ((i = r.r + t.r),
        (i *= i),
        (o = n.r + t.r),
        i > (o *= o)
          ? ((e = (c + o - i) / (2 * c)),
            (u = Math.sqrt(Math.max(0, o / c - e * e))),
            (t.x = n.x - e * f - u * a),
            (t.y = n.y - e * a + u * f))
          : ((e = (c + i - o) / (2 * c)),
            (u = Math.sqrt(Math.max(0, i / c - e * e))),
            (t.x = r.x + e * f - u * a),
            (t.y = r.y + e * a + u * f)))
      : ((t.x = r.x + t.r), (t.y = r.y));
  }
  function b(n, r) {
    var t = n.r + r.r - 1e-6,
      e = r.x - n.x,
      i = r.y - n.y;
    return t > 0 && t * t > e * e + i * i;
  }
  function q(n) {
    var r = n._,
      t = n.next._,
      e = r.r + t.r,
      i = (r.x * t.r + t.x * r.r) / e,
      u = (r.y * t.r + t.y * r.r) / e;
    return i * i + u * u;
  }
  function Node(n) {
    (this._ = n), (this.next = null), (this.previous = null);
  }
  function E(n, r) {
    if (
      !(o = ((t = n),
      (n = "object" == typeof t && "length" in t ? t : Array.from(t))).length)
    )
      return 0;
    var t, e, i, u, o, f, a, c, h, l, p, d;
    if ((((e = n[0]).x = 0), (e.y = 0), !(o > 1))) return e.r;
    if (((i = n[1]), (e.x = -i.r), (i.x = e.r), (i.y = 0), !(o > 2)))
      return e.r + i.r;
    A(i, e, (u = n[2])),
      (e = new Node(e)),
      (i = new Node(i)),
      (u = new Node(u)),
      (e.next = u.previous = i),
      (i.next = e.previous = u),
      (u.next = i.previous = e);
    n: for (c = 3; c < o; ++c) {
      A(e._, i._, (u = n[c])),
        (u = new Node(u)),
        (h = i.next),
        (l = e.previous),
        (p = i._.r),
        (d = e._.r);
      do {
        if (p <= d) {
          if (b(h._, u._)) {
            (i = h), (e.next = i), (i.previous = e), --c;
            continue n;
          }
          (p += h._.r), (h = h.next);
        } else {
          if (b(l._, u._)) {
            ((e = l).next = i), (i.previous = e), --c;
            continue n;
          }
          (d += l._.r), (l = l.previous);
        }
      } while (h !== l.next);
      for (
        u.previous = e, u.next = i, e.next = i.previous = i = u, f = q(e);
        (u = u.next) !== i;

      )
        (a = q(u)) < f && ((e = u), (f = a));
      i = e.next;
    }
    for (e = [i._], u = i; (u = u.next) !== i; ) e.push(u._);
    for (u = y(e, r), c = 0; c < o; ++c) ((e = n[c]).x -= u.x), (e.y -= u.y);
    return u.r;
  }
  function S(n) {
    return Math.sqrt(n.value);
  }
  function k(n) {
    return function (r) {
      r.children || (r.r = Math.max(0, +n(r) || 0));
    };
  }
  function I(n, r, t) {
    return function (e) {
      if ((i = e.children)) {
        var i,
          u,
          o,
          f = i.length,
          a = n(e) * r || 0;
        if (a) for (u = 0; u < f; ++u) i[u].r += a;
        if (((o = E(i, t)), a)) for (u = 0; u < f; ++u) i[u].r -= a;
        e.r = o + a;
      }
    };
  }
  function T(n) {
    return function (r) {
      var t = r.parent;
      (r.r *= n), t && ((r.x = t.x + n * r.x), (r.y = t.y + n * r.y));
    };
  }
  function j(n) {
    (n.x0 = Math.round(n.x0)),
      (n.y0 = Math.round(n.y0)),
      (n.x1 = Math.round(n.x1)),
      (n.y1 = Math.round(n.y1));
  }
  function O(n, r, t, e, i) {
    for (
      var u,
        o = n.children,
        f = -1,
        a = o.length,
        c = n.value && (e - r) / n.value;
      ++f < a;

    )
      ((u = o[f]).y0 = t), (u.y1 = i), (u.x0 = r), (u.x1 = r += u.value * c);
  }
  var R = { depth: -1 },
    D = {},
    L = {};
  function $(n) {
    return n.id;
  }
  function N(n) {
    return n.parentId;
  }
  function P(n) {
    let r = n.length;
    if (r < 2) return "";
    for (; --r > 1 && !C(n, r); );
    return n.slice(0, r);
  }
  function C(n, r) {
    if ("/" === n[r]) {
      let t = 0;
      for (; r > 0 && "\\" === n[--r]; ) ++t;
      if (0 == (1 & t)) return !0;
    }
    return !1;
  }
  function F(n, r) {
    return n.parent === r.parent ? 1 : 2;
  }
  function G(n) {
    var r = n.children;
    return r ? r[0] : n.t;
  }
  function H(n) {
    var r = n.children;
    return r ? r[r.length - 1] : n.t;
  }
  function J(n, r, t) {
    var e = t / (r.i - n.i);
    (r.c -= e), (r.s += t), (n.c += e), (r.z += t), (r.m += t);
  }
  function K(n, r, t) {
    return n.a.parent === r.parent ? n.a : t;
  }
  function Q(n, r) {
    (this._ = n),
      (this.parent = null),
      (this.children = null),
      (this.A = null),
      (this.a = this),
      (this.z = 0),
      (this.m = 0),
      (this.c = 0),
      (this.s = 0),
      (this.t = null),
      (this.i = r);
  }
  function U(n, r, t, e, i) {
    for (
      var u,
        o = n.children,
        f = -1,
        a = o.length,
        c = n.value && (i - t) / n.value;
      ++f < a;

    )
      ((u = o[f]).x0 = r), (u.x1 = e), (u.y0 = t), (u.y1 = t += u.value * c);
  }
  Q.prototype = Object.create(h.prototype);
  var V = (1 + Math.sqrt(5)) / 2;
  function W(n, r, t, e, i, u) {
    for (
      var o,
        f,
        a,
        c,
        h,
        l,
        p,
        d,
        s,
        v,
        x,
        y = [],
        g = r.children,
        m = 0,
        w = 0,
        _ = g.length,
        M = r.value;
      m < _;

    ) {
      (a = i - t), (c = u - e);
      do {
        h = g[w++].value;
      } while (!h && w < _);
      for (
        l = p = h,
          x = h * h * (v = Math.max(c / a, a / c) / (M * n)),
          s = Math.max(p / x, x / l);
        w < _;
        ++w
      ) {
        if (
          ((h += f = g[w].value),
          f < l && (l = f),
          f > p && (p = f),
          (x = h * h * v),
          (d = Math.max(p / x, x / l)) > s)
        ) {
          h -= f;
          break;
        }
        s = d;
      }
      y.push((o = { value: h, dice: a < c, children: g.slice(m, w) })),
        o.dice
          ? O(o, t, e, i, M ? (e += (c * h) / M) : u)
          : U(o, t, e, M ? (t += (a * h) / M) : i, u),
        (M -= h),
        (m = w);
    }
    return y;
  }
  var X = (function n(r) {
    function t(n, t, e, i, u) {
      W(r, n, t, e, i, u);
    }
    return (
      (t.ratio = function (r) {
        return n((r = +r) > 1 ? r : 1);
      }),
      t
    );
  })(V);
  var Y = (function n(r) {
    function t(n, t, e, i, u) {
      if ((o = n._squarify) && o.ratio === r)
        for (var o, f, a, c, h, l = -1, p = o.length, d = n.value; ++l < p; ) {
          for (
            a = (f = o[l]).children, c = f.value = 0, h = a.length;
            c < h;
            ++c
          )
            f.value += a[c].value;
          f.dice
            ? O(f, t, e, i, d ? (e += ((u - e) * f.value) / d) : u)
            : U(f, t, e, d ? (t += ((i - t) * f.value) / d) : i, u),
            (d -= f.value);
        }
      else (n._squarify = o = W(r, n, t, e, i, u)), (o.ratio = r);
    }
    return (
      (t.ratio = function (r) {
        return n((r = +r) > 1 ? r : 1);
      }),
      t
    );
  })(V);
  (n.Node = h),
    (n.cluster = function () {
      var n = r,
        i = 1,
        u = 1,
        o = !1;
      function f(r) {
        var f,
          a = 0;
        r.eachAfter(function (r) {
          var i = r.children;
          i
            ? ((r.x = (function (n) {
                return n.reduce(t, 0) / n.length;
              })(i)),
              (r.y = (function (n) {
                return 1 + n.reduce(e, 0);
              })(i)))
            : ((r.x = f ? (a += n(r, f)) : 0), (r.y = 0), (f = r));
        });
        var c = (function (n) {
            for (var r; (r = n.children); ) n = r[0];
            return n;
          })(r),
          h = (function (n) {
            for (var r; (r = n.children); ) n = r[r.length - 1];
            return n;
          })(r),
          l = c.x - n(c, h) / 2,
          p = h.x + n(h, c) / 2;
        return r.eachAfter(
          o
            ? function (n) {
                (n.x = (n.x - r.x) * i), (n.y = (r.y - n.y) * u);
              }
            : function (n) {
                (n.x = ((n.x - l) / (p - l)) * i),
                  (n.y = (1 - (r.y ? n.y / r.y : 1)) * u);
              }
        );
      }
      return (
        (f.separation = function (r) {
          return arguments.length ? ((n = r), f) : n;
        }),
        (f.size = function (n) {
          return arguments.length
            ? ((o = !1), (i = +n[0]), (u = +n[1]), f)
            : o
            ? null
            : [i, u];
        }),
        (f.nodeSize = function (n) {
          return arguments.length
            ? ((o = !0), (i = +n[0]), (u = +n[1]), f)
            : o
            ? [i, u]
            : null;
        }),
        f
      );
    }),
    (n.hierarchy = u),
    (n.pack = function () {
      var n = null,
        r = 1,
        t = 1,
        e = d;
      function i(i) {
        const u = x();
        return (
          (i.x = r / 2),
          (i.y = t / 2),
          n
            ? i.eachBefore(k(n)).eachAfter(I(e, 0.5, u)).eachBefore(T(1))
            : i
                .eachBefore(k(S))
                .eachAfter(I(d, 1, u))
                .eachAfter(I(e, i.r / Math.min(r, t), u))
                .eachBefore(T(Math.min(r, t) / (2 * i.r))),
          i
        );
      }
      return (
        (i.radius = function (r) {
          return arguments.length ? ((n = l(r)), i) : n;
        }),
        (i.size = function (n) {
          return arguments.length ? ((r = +n[0]), (t = +n[1]), i) : [r, t];
        }),
        (i.padding = function (n) {
          return arguments.length
            ? ((e = "function" == typeof n ? n : s(+n)), i)
            : e;
        }),
        i
      );
    }),
    (n.packEnclose = function (n) {
      return y(n, x());
    }),
    (n.packSiblings = function (n) {
      return E(n, x()), n;
    }),
    (n.partition = function () {
      var n = 1,
        r = 1,
        t = 0,
        e = !1;
      function i(i) {
        var u = i.height + 1;
        return (
          (i.x0 = i.y0 = t),
          (i.x1 = n),
          (i.y1 = r / u),
          i.eachBefore(
            (function (n, r) {
              return function (e) {
                e.children &&
                  O(
                    e,
                    e.x0,
                    (n * (e.depth + 1)) / r,
                    e.x1,
                    (n * (e.depth + 2)) / r
                  );
                var i = e.x0,
                  u = e.y0,
                  o = e.x1 - t,
                  f = e.y1 - t;
                o < i && (i = o = (i + o) / 2),
                  f < u && (u = f = (u + f) / 2),
                  (e.x0 = i),
                  (e.y0 = u),
                  (e.x1 = o),
                  (e.y1 = f);
              };
            })(r, u)
          ),
          e && i.eachBefore(j),
          i
        );
      }
      return (
        (i.round = function (n) {
          return arguments.length ? ((e = !!n), i) : e;
        }),
        (i.size = function (t) {
          return arguments.length ? ((n = +t[0]), (r = +t[1]), i) : [n, r];
        }),
        (i.padding = function (n) {
          return arguments.length ? ((t = +n), i) : t;
        }),
        i
      );
    }),
    (n.stratify = function () {
      var n,
        r = $,
        t = N;
      function e(e) {
        var i,
          u,
          o,
          f,
          a,
          l,
          p,
          d,
          s = Array.from(e),
          v = r,
          x = t,
          y = new Map();
        if (null != n) {
          const r = s.map((r, t) =>
              (function (n) {
                let r = (n = `${n}`).length;
                C(n, r - 1) && !C(n, r - 2) && (n = n.slice(0, -1));
                return "/" === n[0] ? n : `/${n}`;
              })(n(r, t, e))
            ),
            t = r.map(P),
            i = new Set(r).add("");
          for (const n of t)
            i.has(n) || (i.add(n), r.push(n), t.push(P(n)), s.push(L));
          (v = (n, t) => r[t]), (x = (n, r) => t[r]);
        }
        for (o = 0, i = s.length; o < i; ++o)
          (u = s[o]),
            (l = s[o] = new h(u)),
            null != (p = v(u, o, e)) &&
              (p += "") &&
              ((d = l.id = p), y.set(d, y.has(d) ? D : l)),
            null != (p = x(u, o, e)) && (p += "") && (l.parent = p);
        for (o = 0; o < i; ++o)
          if ((p = (l = s[o]).parent)) {
            if (!(a = y.get(p))) throw new Error("missing: " + p);
            if (a === D) throw new Error("ambiguous: " + p);
            a.children ? a.children.push(l) : (a.children = [l]),
              (l.parent = a);
          } else {
            if (f) throw new Error("multiple roots");
            f = l;
          }
        if (!f) throw new Error("no root");
        if (null != n) {
          for (; f.data === L && 1 === f.children.length; )
            (f = f.children[0]), --i;
          for (let n = s.length - 1; n >= 0 && ((l = s[n]), l.data === L); --n)
            l.data = null;
        }
        if (
          ((f.parent = R),
          f
            .eachBefore(function (n) {
              (n.depth = n.parent.depth + 1), --i;
            })
            .eachBefore(c),
          (f.parent = null),
          i > 0)
        )
          throw new Error("cycle");
        return f;
      }
      return (
        (e.id = function (n) {
          return arguments.length ? ((r = l(n)), e) : r;
        }),
        (e.parentId = function (n) {
          return arguments.length ? ((t = l(n)), e) : t;
        }),
        (e.path = function (r) {
          return arguments.length ? ((n = l(r)), e) : n;
        }),
        e
      );
    }),
    (n.tree = function () {
      var n = F,
        r = 1,
        t = 1,
        e = null;
      function i(i) {
        var a = (function (n) {
          for (var r, t, e, i, u, o = new Q(n, 0), f = [o]; (r = f.pop()); )
            if ((e = r._.children))
              for (
                r.children = new Array((u = e.length)), i = u - 1;
                i >= 0;
                --i
              )
                f.push((t = r.children[i] = new Q(e[i], i))), (t.parent = r);
          return ((o.parent = new Q(null, 0)).children = [o]), o;
        })(i);
        if ((a.eachAfter(u), (a.parent.m = -a.z), a.eachBefore(o), e))
          i.eachBefore(f);
        else {
          var c = i,
            h = i,
            l = i;
          i.eachBefore(function (n) {
            n.x < c.x && (c = n),
              n.x > h.x && (h = n),
              n.depth > l.depth && (l = n);
          });
          var p = c === h ? 1 : n(c, h) / 2,
            d = p - c.x,
            s = r / (h.x + p + d),
            v = t / (l.depth || 1);
          i.eachBefore(function (n) {
            (n.x = (n.x + d) * s), (n.y = n.depth * v);
          });
        }
        return i;
      }
      function u(r) {
        var t = r.children,
          e = r.parent.children,
          i = r.i ? e[r.i - 1] : null;
        if (t) {
          !(function (n) {
            for (var r, t = 0, e = 0, i = n.children, u = i.length; --u >= 0; )
              ((r = i[u]).z += t), (r.m += t), (t += r.s + (e += r.c));
          })(r);
          var u = (t[0].z + t[t.length - 1].z) / 2;
          i ? ((r.z = i.z + n(r._, i._)), (r.m = r.z - u)) : (r.z = u);
        } else i && (r.z = i.z + n(r._, i._));
        r.parent.A = (function (r, t, e) {
          if (t) {
            for (
              var i,
                u = r,
                o = r,
                f = t,
                a = u.parent.children[0],
                c = u.m,
                h = o.m,
                l = f.m,
                p = a.m;
              (f = H(f)), (u = G(u)), f && u;

            )
              (a = G(a)),
                ((o = H(o)).a = r),
                (i = f.z + l - u.z - c + n(f._, u._)) > 0 &&
                  (J(K(f, r, e), r, i), (c += i), (h += i)),
                (l += f.m),
                (c += u.m),
                (p += a.m),
                (h += o.m);
            f && !H(o) && ((o.t = f), (o.m += l - h)),
              u && !G(a) && ((a.t = u), (a.m += c - p), (e = r));
          }
          return e;
        })(r, i, r.parent.A || e[0]);
      }
      function o(n) {
        (n._.x = n.z + n.parent.m), (n.m += n.parent.m);
      }
      function f(n) {
        (n.x *= r), (n.y = n.depth * t);
      }
      return (
        (i.separation = function (r) {
          return arguments.length ? ((n = r), i) : n;
        }),
        (i.size = function (n) {
          return arguments.length
            ? ((e = !1), (r = +n[0]), (t = +n[1]), i)
            : e
            ? null
            : [r, t];
        }),
        (i.nodeSize = function (n) {
          return arguments.length
            ? ((e = !0), (r = +n[0]), (t = +n[1]), i)
            : e
            ? [r, t]
            : null;
        }),
        i
      );
    }),
    (n.treemap = function () {
      var n = X,
        r = !1,
        t = 1,
        e = 1,
        i = [0],
        u = d,
        o = d,
        f = d,
        a = d,
        c = d;
      function h(n) {
        return (
          (n.x0 = n.y0 = 0),
          (n.x1 = t),
          (n.y1 = e),
          n.eachBefore(l),
          (i = [0]),
          r && n.eachBefore(j),
          n
        );
      }
      function l(r) {
        var t = i[r.depth],
          e = r.x0 + t,
          h = r.y0 + t,
          l = r.x1 - t,
          p = r.y1 - t;
        l < e && (e = l = (e + l) / 2),
          p < h && (h = p = (h + p) / 2),
          (r.x0 = e),
          (r.y0 = h),
          (r.x1 = l),
          (r.y1 = p),
          r.children &&
            ((t = i[r.depth + 1] = u(r) / 2),
            (e += c(r) - t),
            (h += o(r) - t),
            (l -= f(r) - t) < e && (e = l = (e + l) / 2),
            (p -= a(r) - t) < h && (h = p = (h + p) / 2),
            n(r, e, h, l, p));
      }
      return (
        (h.round = function (n) {
          return arguments.length ? ((r = !!n), h) : r;
        }),
        (h.size = function (n) {
          return arguments.length ? ((t = +n[0]), (e = +n[1]), h) : [t, e];
        }),
        (h.tile = function (r) {
          return arguments.length ? ((n = p(r)), h) : n;
        }),
        (h.padding = function (n) {
          return arguments.length
            ? h.paddingInner(n).paddingOuter(n)
            : h.paddingInner();
        }),
        (h.paddingInner = function (n) {
          return arguments.length
            ? ((u = "function" == typeof n ? n : s(+n)), h)
            : u;
        }),
        (h.paddingOuter = function (n) {
          return arguments.length
            ? h.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n)
            : h.paddingTop();
        }),
        (h.paddingTop = function (n) {
          return arguments.length
            ? ((o = "function" == typeof n ? n : s(+n)), h)
            : o;
        }),
        (h.paddingRight = function (n) {
          return arguments.length
            ? ((f = "function" == typeof n ? n : s(+n)), h)
            : f;
        }),
        (h.paddingBottom = function (n) {
          return arguments.length
            ? ((a = "function" == typeof n ? n : s(+n)), h)
            : a;
        }),
        (h.paddingLeft = function (n) {
          return arguments.length
            ? ((c = "function" == typeof n ? n : s(+n)), h)
            : c;
        }),
        h
      );
    }),
    (n.treemapBinary = function (n, r, t, e, i) {
      var u,
        o,
        f = n.children,
        a = f.length,
        c = new Array(a + 1);
      for (c[0] = o = u = 0; u < a; ++u) c[u + 1] = o += f[u].value;
      !(function n(r, t, e, i, u, o, a) {
        if (r >= t - 1) {
          var h = f[r];
          return (h.x0 = i), (h.y0 = u), (h.x1 = o), void (h.y1 = a);
        }
        var l = c[r],
          p = e / 2 + l,
          d = r + 1,
          s = t - 1;
        for (; d < s; ) {
          var v = (d + s) >>> 1;
          c[v] < p ? (d = v + 1) : (s = v);
        }
        p - c[d - 1] < c[d] - p && r + 1 < d && --d;
        var x = c[d] - l,
          y = e - x;
        if (o - i > a - u) {
          var g = e ? (i * y + o * x) / e : o;
          n(r, d, x, i, u, g, a), n(d, t, y, g, u, o, a);
        } else {
          var m = e ? (u * y + a * x) / e : a;
          n(r, d, x, i, u, o, m), n(d, t, y, i, m, o, a);
        }
      })(0, a, n.value, r, t, e, i);
    }),
    (n.treemapDice = O),
    (n.treemapResquarify = Y),
    (n.treemapSlice = U),
    (n.treemapSliceDice = function (n, r, t, e, i) {
      (1 & n.depth ? U : O)(n, r, t, e, i);
    }),
    (n.treemapSquarify = X),
    Object.defineProperty(n, "__esModule", { value: !0 });
});
