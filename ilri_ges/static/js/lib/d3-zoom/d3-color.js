// https://d3js.org/d3-color/ v3.1.0 Copyright 2010-2022 Mike Bostock
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t = "undefined" != typeof globalThis ? globalThis : t || self).d3 =
          t.d3 || {})
      );
})(this, function (t) {
  "use strict";
  function e(t, e, i) {
    (t.prototype = e.prototype = i), (i.constructor = t);
  }
  function i(t, e) {
    var i = Object.create(t.prototype);
    for (var n in e) i[n] = e[n];
    return i;
  }
  function n() {}
  var r = 0.7,
    a = 1 / r,
    s = "\\s*([+-]?\\d+)\\s*",
    h = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    o = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    l = /^#([0-9a-f]{3,8})$/,
    u = new RegExp(`^rgb\\(${s},${s},${s}\\)$`),
    c = new RegExp(`^rgb\\(${o},${o},${o}\\)$`),
    g = new RegExp(`^rgba\\(${s},${s},${s},${h}\\)$`),
    p = new RegExp(`^rgba\\(${o},${o},${o},${h}\\)$`),
    f = new RegExp(`^hsl\\(${h},${o},${o}\\)$`),
    d = new RegExp(`^hsla\\(${h},${o},${o},${h}\\)$`),
    b = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    };
  function y() {
    return this.rgb().formatHex();
  }
  function w() {
    return this.rgb().formatRgb();
  }
  function m(t) {
    var e, i;
    return (
      (t = (t + "").trim().toLowerCase()),
      (e = l.exec(t))
        ? ((i = e[1].length),
          (e = parseInt(e[1], 16)),
          6 === i
            ? $(e)
            : 3 === i
            ? new M(
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (240 & e),
                ((15 & e) << 4) | (15 & e),
                1
              )
            : 8 === i
            ? N(
                (e >> 24) & 255,
                (e >> 16) & 255,
                (e >> 8) & 255,
                (255 & e) / 255
              )
            : 4 === i
            ? N(
                ((e >> 12) & 15) | ((e >> 8) & 240),
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (240 & e),
                (((15 & e) << 4) | (15 & e)) / 255
              )
            : null)
        : (e = u.exec(t))
        ? new M(e[1], e[2], e[3], 1)
        : (e = c.exec(t))
        ? new M((255 * e[1]) / 100, (255 * e[2]) / 100, (255 * e[3]) / 100, 1)
        : (e = g.exec(t))
        ? N(e[1], e[2], e[3], e[4])
        : (e = p.exec(t))
        ? N((255 * e[1]) / 100, (255 * e[2]) / 100, (255 * e[3]) / 100, e[4])
        : (e = f.exec(t))
        ? j(e[1], e[2] / 100, e[3] / 100, 1)
        : (e = d.exec(t))
        ? j(e[1], e[2] / 100, e[3] / 100, e[4])
        : b.hasOwnProperty(t)
        ? $(b[t])
        : "transparent" === t
        ? new M(NaN, NaN, NaN, 0)
        : null
    );
  }
  function $(t) {
    return new M((t >> 16) & 255, (t >> 8) & 255, 255 & t, 1);
  }
  function N(t, e, i, n) {
    return n <= 0 && (t = e = i = NaN), new M(t, e, i, n);
  }
  function k(t) {
    return (
      t instanceof n || (t = m(t)),
      t ? new M((t = t.rgb()).r, t.g, t.b, t.opacity) : new M()
    );
  }
  function x(t, e, i, n) {
    return 1 === arguments.length ? k(t) : new M(t, e, i, null == n ? 1 : n);
  }
  function M(t, e, i, n) {
    (this.r = +t), (this.g = +e), (this.b = +i), (this.opacity = +n);
  }
  function v() {
    return `#${E(this.r)}${E(this.g)}${E(this.b)}`;
  }
  function q() {
    const t = H(this.opacity);
    return `${
      1 === t ? "rgb(" : "rgba("
    }${R(this.r)}, ${R(this.g)}, ${R(this.b)}${1 === t ? ")" : `, ${t})`}`;
  }
  function H(t) {
    return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
  }
  function R(t) {
    return Math.max(0, Math.min(255, Math.round(t) || 0));
  }
  function E(t) {
    return ((t = R(t)) < 16 ? "0" : "") + t.toString(16);
  }
  function j(t, e, i, n) {
    return (
      n <= 0
        ? (t = e = i = NaN)
        : i <= 0 || i >= 1
        ? (t = e = NaN)
        : e <= 0 && (t = NaN),
      new I(t, e, i, n)
    );
  }
  function O(t) {
    if (t instanceof I) return new I(t.h, t.s, t.l, t.opacity);
    if ((t instanceof n || (t = m(t)), !t)) return new I();
    if (t instanceof I) return t;
    var e = (t = t.rgb()).r / 255,
      i = t.g / 255,
      r = t.b / 255,
      a = Math.min(e, i, r),
      s = Math.max(e, i, r),
      h = NaN,
      o = s - a,
      l = (s + a) / 2;
    return (
      o
        ? ((h =
            e === s
              ? (i - r) / o + 6 * (i < r)
              : i === s
              ? (r - e) / o + 2
              : (e - i) / o + 4),
          (o /= l < 0.5 ? s + a : 2 - s - a),
          (h *= 60))
        : (o = l > 0 && l < 1 ? 0 : h),
      new I(h, o, l, t.opacity)
    );
  }
  function P(t, e, i, n) {
    return 1 === arguments.length ? O(t) : new I(t, e, i, null == n ? 1 : n);
  }
  function I(t, e, i, n) {
    (this.h = +t), (this.s = +e), (this.l = +i), (this.opacity = +n);
  }
  function S(t) {
    return (t = (t || 0) % 360) < 0 ? t + 360 : t;
  }
  function T(t) {
    return Math.max(0, Math.min(1, t || 0));
  }
  function _(t, e, i) {
    return (
      255 *
      (t < 60
        ? e + ((i - e) * t) / 60
        : t < 180
        ? i
        : t < 240
        ? e + ((i - e) * (240 - t)) / 60
        : e)
    );
  }
  e(n, m, {
    copy(t) {
      return Object.assign(new this.constructor(), this, t);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: y,
    formatHex: y,
    formatHex8: function () {
      return this.rgb().formatHex8();
    },
    formatHsl: function () {
      return O(this).formatHsl();
    },
    formatRgb: w,
    toString: w,
  }),
    e(
      M,
      x,
      i(n, {
        brighter(t) {
          return (
            (t = null == t ? a : Math.pow(a, t)),
            new M(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        darker(t) {
          return (
            (t = null == t ? r : Math.pow(r, t)),
            new M(this.r * t, this.g * t, this.b * t, this.opacity)
          );
        },
        rgb() {
          return this;
        },
        clamp() {
          return new M(R(this.r), R(this.g), R(this.b), H(this.opacity));
        },
        displayable() {
          return (
            -0.5 <= this.r &&
            this.r < 255.5 &&
            -0.5 <= this.g &&
            this.g < 255.5 &&
            -0.5 <= this.b &&
            this.b < 255.5 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        hex: v,
        formatHex: v,
        formatHex8: function () {
          return `#${E(this.r)}${E(this.g)}${E(this.b)}${E(
            255 * (isNaN(this.opacity) ? 1 : this.opacity)
          )}`;
        },
        formatRgb: q,
        toString: q,
      })
    ),
    e(
      I,
      P,
      i(n, {
        brighter(t) {
          return (
            (t = null == t ? a : Math.pow(a, t)),
            new I(this.h, this.s, this.l * t, this.opacity)
          );
        },
        darker(t) {
          return (
            (t = null == t ? r : Math.pow(r, t)),
            new I(this.h, this.s, this.l * t, this.opacity)
          );
        },
        rgb() {
          var t = (this.h % 360) + 360 * (this.h < 0),
            e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
            i = this.l,
            n = i + (i < 0.5 ? i : 1 - i) * e,
            r = 2 * i - n;
          return new M(
            _(t >= 240 ? t - 240 : t + 120, r, n),
            _(t, r, n),
            _(t < 120 ? t + 240 : t - 120, r, n),
            this.opacity
          );
        },
        clamp() {
          return new I(S(this.h), T(this.s), T(this.l), H(this.opacity));
        },
        displayable() {
          return (
            ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
            0 <= this.l &&
            this.l <= 1 &&
            0 <= this.opacity &&
            this.opacity <= 1
          );
        },
        formatHsl() {
          const t = H(this.opacity);
          return `${1 === t ? "hsl(" : "hsla("}${S(this.h)}, ${
            100 * T(this.s)
          }%, ${100 * T(this.l)}%${1 === t ? ")" : `, ${t})`}`;
        },
      })
    );
  const z = Math.PI / 180,
    C = 180 / Math.PI,
    L = 0.96422,
    A = 0.82521,
    B = 4 / 29,
    D = 6 / 29,
    F = 3 * D * D;
  function G(t) {
    if (t instanceof K) return new K(t.l, t.a, t.b, t.opacity);
    if (t instanceof Z) return tt(t);
    t instanceof M || (t = k(t));
    var e,
      i,
      n = W(t.r),
      r = W(t.g),
      a = W(t.b),
      s = Q((0.2225045 * n + 0.7168786 * r + 0.0606169 * a) / 1);
    return (
      n === r && r === a
        ? (e = i = s)
        : ((e = Q((0.4360747 * n + 0.3850649 * r + 0.1430804 * a) / L)),
          (i = Q((0.0139322 * n + 0.0971045 * r + 0.7141733 * a) / A))),
      new K(116 * s - 16, 500 * (e - s), 200 * (s - i), t.opacity)
    );
  }
  function J(t, e, i, n) {
    return 1 === arguments.length ? G(t) : new K(t, e, i, null == n ? 1 : n);
  }
  function K(t, e, i, n) {
    (this.l = +t), (this.a = +e), (this.b = +i), (this.opacity = +n);
  }
  function Q(t) {
    return t > 0.008856451679035631 ? Math.pow(t, 1 / 3) : t / F + B;
  }
  function U(t) {
    return t > D ? t * t * t : F * (t - B);
  }
  function V(t) {
    return (
      255 * (t <= 0.0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - 0.055)
    );
  }
  function W(t) {
    return (t /= 255) <= 0.04045
      ? t / 12.92
      : Math.pow((t + 0.055) / 1.055, 2.4);
  }
  function X(t) {
    if (t instanceof Z) return new Z(t.h, t.c, t.l, t.opacity);
    if ((t instanceof K || (t = G(t)), 0 === t.a && 0 === t.b))
      return new Z(NaN, 0 < t.l && t.l < 100 ? 0 : NaN, t.l, t.opacity);
    var e = Math.atan2(t.b, t.a) * C;
    return new Z(
      e < 0 ? e + 360 : e,
      Math.sqrt(t.a * t.a + t.b * t.b),
      t.l,
      t.opacity
    );
  }
  function Y(t, e, i, n) {
    return 1 === arguments.length ? X(t) : new Z(t, e, i, null == n ? 1 : n);
  }
  function Z(t, e, i, n) {
    (this.h = +t), (this.c = +e), (this.l = +i), (this.opacity = +n);
  }
  function tt(t) {
    if (isNaN(t.h)) return new K(t.l, 0, 0, t.opacity);
    var e = t.h * z;
    return new K(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity);
  }
  e(
    K,
    J,
    i(n, {
      brighter(t) {
        return new K(
          this.l + 18 * (null == t ? 1 : t),
          this.a,
          this.b,
          this.opacity
        );
      },
      darker(t) {
        return new K(
          this.l - 18 * (null == t ? 1 : t),
          this.a,
          this.b,
          this.opacity
        );
      },
      rgb() {
        var t = (this.l + 16) / 116,
          e = isNaN(this.a) ? t : t + this.a / 500,
          i = isNaN(this.b) ? t : t - this.b / 200;
        return new M(
          V(
            3.1338561 * (e = L * U(e)) -
              1.6168667 * (t = 1 * U(t)) -
              0.4906146 * (i = A * U(i))
          ),
          V(-0.9787684 * e + 1.9161415 * t + 0.033454 * i),
          V(0.0719453 * e - 0.2289914 * t + 1.4052427 * i),
          this.opacity
        );
      },
    })
  ),
    e(
      Z,
      Y,
      i(n, {
        brighter(t) {
          return new Z(
            this.h,
            this.c,
            this.l + 18 * (null == t ? 1 : t),
            this.opacity
          );
        },
        darker(t) {
          return new Z(
            this.h,
            this.c,
            this.l - 18 * (null == t ? 1 : t),
            this.opacity
          );
        },
        rgb() {
          return tt(this).rgb();
        },
      })
    );
  var et = -0.14861,
    it = 1.78277,
    nt = -0.29227,
    rt = -0.90649,
    at = 1.97294,
    st = at * rt,
    ht = at * it,
    ot = it * nt - rt * et;
  function lt(t) {
    if (t instanceof ct) return new ct(t.h, t.s, t.l, t.opacity);
    t instanceof M || (t = k(t));
    var e = t.r / 255,
      i = t.g / 255,
      n = t.b / 255,
      r = (ot * n + st * e - ht * i) / (ot + st - ht),
      a = n - r,
      s = (at * (i - r) - nt * a) / rt,
      h = Math.sqrt(s * s + a * a) / (at * r * (1 - r)),
      o = h ? Math.atan2(s, a) * C - 120 : NaN;
    return new ct(o < 0 ? o + 360 : o, h, r, t.opacity);
  }
  function ut(t, e, i, n) {
    return 1 === arguments.length ? lt(t) : new ct(t, e, i, null == n ? 1 : n);
  }
  function ct(t, e, i, n) {
    (this.h = +t), (this.s = +e), (this.l = +i), (this.opacity = +n);
  }
  e(
    ct,
    ut,
    i(n, {
      brighter(t) {
        return (
          (t = null == t ? a : Math.pow(a, t)),
          new ct(this.h, this.s, this.l * t, this.opacity)
        );
      },
      darker(t) {
        return (
          (t = null == t ? r : Math.pow(r, t)),
          new ct(this.h, this.s, this.l * t, this.opacity)
        );
      },
      rgb() {
        var t = isNaN(this.h) ? 0 : (this.h + 120) * z,
          e = +this.l,
          i = isNaN(this.s) ? 0 : this.s * e * (1 - e),
          n = Math.cos(t),
          r = Math.sin(t);
        return new M(
          255 * (e + i * (et * n + it * r)),
          255 * (e + i * (nt * n + rt * r)),
          255 * (e + i * (at * n)),
          this.opacity
        );
      },
    })
  ),
    (t.color = m),
    (t.cubehelix = ut),
    (t.gray = function (t, e) {
      return new K(t, 0, 0, null == e ? 1 : e);
    }),
    (t.hcl = Y),
    (t.hsl = P),
    (t.lab = J),
    (t.lch = function (t, e, i, n) {
      return 1 === arguments.length ? X(t) : new Z(i, e, t, null == n ? 1 : n);
    }),
    (t.rgb = x),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
