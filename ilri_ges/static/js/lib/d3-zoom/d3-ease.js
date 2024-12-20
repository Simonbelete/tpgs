!(function (n, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((n = "undefined" != typeof globalThis ? globalThis : n || self).d3 =
          n.d3 || {})
      );
})(this, function (n) {
  "use strict";
  function e(n) {
    return ((n *= 2) <= 1 ? n * n : --n * (2 - n) + 1) / 2;
  }
  function t(n) {
    return ((n *= 2) <= 1 ? n * n * n : (n -= 2) * n * n + 2) / 2;
  }
  var u = (function n(e) {
      function t(n) {
        return Math.pow(n, e);
      }
      return (e = +e), (t.exponent = n), t;
    })(3),
    r = (function n(e) {
      function t(n) {
        return 1 - Math.pow(1 - n, e);
      }
      return (e = +e), (t.exponent = n), t;
    })(3),
    a = (function n(e) {
      function t(n) {
        return ((n *= 2) <= 1 ? Math.pow(n, e) : 2 - Math.pow(2 - n, e)) / 2;
      }
      return (e = +e), (t.exponent = n), t;
    })(3),
    o = Math.PI,
    i = o / 2;
  function c(n) {
    return (1 - Math.cos(o * n)) / 2;
  }
  function s(n) {
    return 1.0009775171065494 * (Math.pow(2, -10 * n) - 0.0009765625);
  }
  function f(n) {
    return ((n *= 2) <= 1 ? s(1 - n) : 2 - s(n - 1)) / 2;
  }
  function h(n) {
    return (
      ((n *= 2) <= 1
        ? 1 - Math.sqrt(1 - n * n)
        : Math.sqrt(1 - (n -= 2) * n) + 1) / 2
    );
  }
  var p = 4 / 11,
    M = 7.5625;
  function d(n) {
    return (n = +n) < p
      ? M * n * n
      : n < 0.7272727272727273
      ? M * (n -= 0.5454545454545454) * n + 0.75
      : n < 0.9090909090909091
      ? M * (n -= 0.8181818181818182) * n + 0.9375
      : M * (n -= 0.9545454545454546) * n + 0.984375;
  }
  var l = 1.70158,
    I = (function n(e) {
      function t(n) {
        return (n = +n) * n * (e * (n - 1) + n);
      }
      return (e = +e), (t.overshoot = n), t;
    })(l),
    O = (function n(e) {
      function t(n) {
        return --n * n * ((n + 1) * e + n) + 1;
      }
      return (e = +e), (t.overshoot = n), t;
    })(l),
    x = (function n(e) {
      function t(n) {
        return (
          ((n *= 2) < 1
            ? n * n * ((e + 1) * n - e)
            : (n -= 2) * n * ((e + 1) * n + e) + 2) / 2
        );
      }
      return (e = +e), (t.overshoot = n), t;
    })(l),
    v = 2 * Math.PI,
    y = (function n(e, t) {
      var u = Math.asin(1 / (e = Math.max(1, e))) * (t /= v);
      function r(n) {
        return e * s(-(--n)) * Math.sin((u - n) / t);
      }
      return (
        (r.amplitude = function (e) {
          return n(e, t * v);
        }),
        (r.period = function (t) {
          return n(e, t);
        }),
        r
      );
    })(1, 0.3),
    b = (function n(e, t) {
      var u = Math.asin(1 / (e = Math.max(1, e))) * (t /= v);
      function r(n) {
        return 1 - e * s((n = +n)) * Math.sin((n + u) / t);
      }
      return (
        (r.amplitude = function (e) {
          return n(e, t * v);
        }),
        (r.period = function (t) {
          return n(e, t);
        }),
        r
      );
    })(1, 0.3),
    m = (function n(e, t) {
      var u = Math.asin(1 / (e = Math.max(1, e))) * (t /= v);
      function r(n) {
        return (
          ((n = 2 * n - 1) < 0
            ? e * s(-n) * Math.sin((u - n) / t)
            : 2 - e * s(n) * Math.sin((u + n) / t)) / 2
        );
      }
      return (
        (r.amplitude = function (e) {
          return n(e, t * v);
        }),
        (r.period = function (t) {
          return n(e, t);
        }),
        r
      );
    })(1, 0.3);
  (n.easeBack = x),
    (n.easeBackIn = I),
    (n.easeBackInOut = x),
    (n.easeBackOut = O),
    (n.easeBounce = d),
    (n.easeBounceIn = function (n) {
      return 1 - d(1 - n);
    }),
    (n.easeBounceInOut = function (n) {
      return ((n *= 2) <= 1 ? 1 - d(1 - n) : d(n - 1) + 1) / 2;
    }),
    (n.easeBounceOut = d),
    (n.easeCircle = h),
    (n.easeCircleIn = function (n) {
      return 1 - Math.sqrt(1 - n * n);
    }),
    (n.easeCircleInOut = h),
    (n.easeCircleOut = function (n) {
      return Math.sqrt(1 - --n * n);
    }),
    (n.easeCubic = t),
    (n.easeCubicIn = function (n) {
      return n * n * n;
    }),
    (n.easeCubicInOut = t),
    (n.easeCubicOut = function (n) {
      return --n * n * n + 1;
    }),
    (n.easeElastic = b),
    (n.easeElasticIn = y),
    (n.easeElasticInOut = m),
    (n.easeElasticOut = b),
    (n.easeExp = f),
    (n.easeExpIn = function (n) {
      return s(1 - +n);
    }),
    (n.easeExpInOut = f),
    (n.easeExpOut = function (n) {
      return 1 - s(n);
    }),
    (n.easeLinear = (n) => +n),
    (n.easePoly = a),
    (n.easePolyIn = u),
    (n.easePolyInOut = a),
    (n.easePolyOut = r),
    (n.easeQuad = e),
    (n.easeQuadIn = function (n) {
      return n * n;
    }),
    (n.easeQuadInOut = e),
    (n.easeQuadOut = function (n) {
      return n * (2 - n);
    }),
    (n.easeSin = c),
    (n.easeSinIn = function (n) {
      return 1 == +n ? 1 : 1 - Math.cos(n * i);
    }),
    (n.easeSinInOut = c),
    (n.easeSinOut = function (n) {
      return Math.sin(n * i);
    }),
    Object.defineProperty(n, "__esModule", { value: !0 });
});
