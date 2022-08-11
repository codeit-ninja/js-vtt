var ep = Object.defineProperty;
var rp = (m, g, f) => g in m ? ep(m, g, { enumerable: !0, configurable: !0, writable: !0, value: f }) : m[g] = f;
var ut = (m, g, f) => (rp(m, typeof g != "symbol" ? g + "" : g, f), f);
const SEGMENT_HEADER_REGEX = /^WEBVTT ?(?<description>(?!\s).+)?\n?(?<meta>(.*\n?)*)?/, SEGMENT_CUE_REGEX = new RegExp("(?<identifier>[^\\n]*(?![\\d+:.,]+ --> [\\d+:.,]))?\\n?(?<timings>[\\d+:.,]+ --> [\\d+:.,]+)\\n(?<text>(?<=.\\d\\n).+)", "s"), SEGMENT_COMMENT_REGEX = /^NOTE\s\n?(?<text>.*)/s, SEGMENT_STYLE_REGEX = /STYLE\s+::cue(\((?<selector>[^\n]+)\))?\s+?{\s+(?<styles>[^]+)\s+}/s;
class Segment {
}
class InvalidCommentError extends Error {
  constructor(g, f) {
    f && (g = `

${f}

--------
${g}`), super(g);
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, lodash = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(m, g) {
  (function() {
    var f, b = "4.17.21", B = 200, J = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", U = "Expected a function", vt = "Invalid `variable` option passed into `_.template`", zn = "__lodash_hash_undefined__", er = 500, se = "__lodash_placeholder__", Zn = 1, Ci = 2, mt = 4, xt = 1, oe = 2, pn = 1, ft = 2, Ri = 4, On = 8, wt = 16, bn = 32, Tt = 64, Fn = 128, Ut = 256, rr = 512, fs = 30, ss = "...", os = 800, ls = 16, yi = 1, as = 2, cs = 3, st = 1 / 0, Jn = 9007199254740991, hs = 17976931348623157e292, le = 0 / 0, Wn = 4294967295, gs = Wn - 1, _s = Wn >>> 1, ps = [
      ["ary", Fn],
      ["bind", pn],
      ["bindKey", ft],
      ["curry", On],
      ["curryRight", wt],
      ["flip", rr],
      ["partial", bn],
      ["partialRight", Tt],
      ["rearg", Ut]
    ], St = "[object Arguments]", ae = "[object Array]", ds = "[object AsyncFunction]", Gt = "[object Boolean]", Nt = "[object Date]", vs = "[object DOMException]", ce = "[object Error]", he = "[object Function]", Ii = "[object GeneratorFunction]", An = "[object Map]", $t = "[object Number]", ms = "[object Null]", Dn = "[object Object]", Li = "[object Promise]", xs = "[object Proxy]", Ht = "[object RegExp]", Cn = "[object Set]", qt = "[object String]", ge = "[object Symbol]", ws = "[object Undefined]", Kt = "[object WeakMap]", Ts = "[object WeakSet]", Xt = "[object ArrayBuffer]", Et = "[object DataView]", ir = "[object Float32Array]", ur = "[object Float64Array]", fr = "[object Int8Array]", sr = "[object Int16Array]", or = "[object Int32Array]", lr = "[object Uint8Array]", ar = "[object Uint8ClampedArray]", cr = "[object Uint16Array]", hr = "[object Uint32Array]", Ss = /\b__p \+= '';/g, Es = /\b(__p \+=) '' \+/g, As = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Oi = /&(?:amp|lt|gt|quot|#39);/g, bi = /[&<>"']/g, Cs = RegExp(Oi.source), Rs = RegExp(bi.source), ys = /<%-([\s\S]+?)%>/g, Is = /<%([\s\S]+?)%>/g, Wi = /<%=([\s\S]+?)%>/g, Ls = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Os = /^\w*$/, bs = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, gr = /[\\^$.*+?()[\]{}|]/g, Ws = RegExp(gr.source), _r = /^\s+/, Ms = /\s/, Ps = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Bs = /\{\n\/\* \[wrapped with (.+)\] \*/, Fs = /,? & /, Ds = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, Us = /[()=,{}\[\]\/\s]/, Gs = /\\(\\)?/g, Ns = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Mi = /\w*$/, $s = /^[-+]0x[0-9a-f]+$/i, Hs = /^0b[01]+$/i, qs = /^\[object .+?Constructor\]$/, Ks = /^0o[0-7]+$/i, Xs = /^(?:0|[1-9]\d*)$/, Ys = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, _e = /($^)/, zs = /['\n\r\u2028\u2029\\]/g, pe = "\\ud800-\\udfff", Zs = "\\u0300-\\u036f", Js = "\\ufe20-\\ufe2f", Vs = "\\u20d0-\\u20ff", Pi = Zs + Js + Vs, Bi = "\\u2700-\\u27bf", Fi = "a-z\\xdf-\\xf6\\xf8-\\xff", Qs = "\\xac\\xb1\\xd7\\xf7", ks = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", js = "\\u2000-\\u206f", no = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Di = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ui = "\\ufe0e\\ufe0f", Gi = Qs + ks + js + no, pr = "['\u2019]", to = "[" + pe + "]", Ni = "[" + Gi + "]", de = "[" + Pi + "]", $i = "\\d+", eo = "[" + Bi + "]", Hi = "[" + Fi + "]", qi = "[^" + pe + Gi + $i + Bi + Fi + Di + "]", dr = "\\ud83c[\\udffb-\\udfff]", ro = "(?:" + de + "|" + dr + ")", Ki = "[^" + pe + "]", vr = "(?:\\ud83c[\\udde6-\\uddff]){2}", mr = "[\\ud800-\\udbff][\\udc00-\\udfff]", At = "[" + Di + "]", Xi = "\\u200d", Yi = "(?:" + Hi + "|" + qi + ")", io = "(?:" + At + "|" + qi + ")", zi = "(?:" + pr + "(?:d|ll|m|re|s|t|ve))?", Zi = "(?:" + pr + "(?:D|LL|M|RE|S|T|VE))?", Ji = ro + "?", Vi = "[" + Ui + "]?", uo = "(?:" + Xi + "(?:" + [Ki, vr, mr].join("|") + ")" + Vi + Ji + ")*", fo = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", so = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Qi = Vi + Ji + uo, oo = "(?:" + [eo, vr, mr].join("|") + ")" + Qi, lo = "(?:" + [Ki + de + "?", de, vr, mr, to].join("|") + ")", ao = RegExp(pr, "g"), co = RegExp(de, "g"), xr = RegExp(dr + "(?=" + dr + ")|" + lo + Qi, "g"), ho = RegExp([
      At + "?" + Hi + "+" + zi + "(?=" + [Ni, At, "$"].join("|") + ")",
      io + "+" + Zi + "(?=" + [Ni, At + Yi, "$"].join("|") + ")",
      At + "?" + Yi + "+" + zi,
      At + "+" + Zi,
      so,
      fo,
      $i,
      oo
    ].join("|"), "g"), go = RegExp("[" + Xi + pe + Pi + Ui + "]"), _o = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, po = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], vo = -1, $ = {};
    $[ir] = $[ur] = $[fr] = $[sr] = $[or] = $[lr] = $[ar] = $[cr] = $[hr] = !0, $[St] = $[ae] = $[Xt] = $[Gt] = $[Et] = $[Nt] = $[ce] = $[he] = $[An] = $[$t] = $[Dn] = $[Ht] = $[Cn] = $[qt] = $[Kt] = !1;
    var N = {};
    N[St] = N[ae] = N[Xt] = N[Et] = N[Gt] = N[Nt] = N[ir] = N[ur] = N[fr] = N[sr] = N[or] = N[An] = N[$t] = N[Dn] = N[Ht] = N[Cn] = N[qt] = N[ge] = N[lr] = N[ar] = N[cr] = N[hr] = !0, N[ce] = N[he] = N[Kt] = !1;
    var mo = {
      \u00C0: "A",
      \u00C1: "A",
      \u00C2: "A",
      \u00C3: "A",
      \u00C4: "A",
      \u00C5: "A",
      \u00E0: "a",
      \u00E1: "a",
      \u00E2: "a",
      \u00E3: "a",
      \u00E4: "a",
      \u00E5: "a",
      \u00C7: "C",
      \u00E7: "c",
      \u00D0: "D",
      \u00F0: "d",
      \u00C8: "E",
      \u00C9: "E",
      \u00CA: "E",
      \u00CB: "E",
      \u00E8: "e",
      \u00E9: "e",
      \u00EA: "e",
      \u00EB: "e",
      \u00CC: "I",
      \u00CD: "I",
      \u00CE: "I",
      \u00CF: "I",
      \u00EC: "i",
      \u00ED: "i",
      \u00EE: "i",
      \u00EF: "i",
      \u00D1: "N",
      \u00F1: "n",
      \u00D2: "O",
      \u00D3: "O",
      \u00D4: "O",
      \u00D5: "O",
      \u00D6: "O",
      \u00D8: "O",
      \u00F2: "o",
      \u00F3: "o",
      \u00F4: "o",
      \u00F5: "o",
      \u00F6: "o",
      \u00F8: "o",
      \u00D9: "U",
      \u00DA: "U",
      \u00DB: "U",
      \u00DC: "U",
      \u00F9: "u",
      \u00FA: "u",
      \u00FB: "u",
      \u00FC: "u",
      \u00DD: "Y",
      \u00FD: "y",
      \u00FF: "y",
      \u00C6: "Ae",
      \u00E6: "ae",
      \u00DE: "Th",
      \u00FE: "th",
      \u00DF: "ss",
      \u0100: "A",
      \u0102: "A",
      \u0104: "A",
      \u0101: "a",
      \u0103: "a",
      \u0105: "a",
      \u0106: "C",
      \u0108: "C",
      \u010A: "C",
      \u010C: "C",
      \u0107: "c",
      \u0109: "c",
      \u010B: "c",
      \u010D: "c",
      \u010E: "D",
      \u0110: "D",
      \u010F: "d",
      \u0111: "d",
      \u0112: "E",
      \u0114: "E",
      \u0116: "E",
      \u0118: "E",
      \u011A: "E",
      \u0113: "e",
      \u0115: "e",
      \u0117: "e",
      \u0119: "e",
      \u011B: "e",
      \u011C: "G",
      \u011E: "G",
      \u0120: "G",
      \u0122: "G",
      \u011D: "g",
      \u011F: "g",
      \u0121: "g",
      \u0123: "g",
      \u0124: "H",
      \u0126: "H",
      \u0125: "h",
      \u0127: "h",
      \u0128: "I",
      \u012A: "I",
      \u012C: "I",
      \u012E: "I",
      \u0130: "I",
      \u0129: "i",
      \u012B: "i",
      \u012D: "i",
      \u012F: "i",
      \u0131: "i",
      \u0134: "J",
      \u0135: "j",
      \u0136: "K",
      \u0137: "k",
      \u0138: "k",
      \u0139: "L",
      \u013B: "L",
      \u013D: "L",
      \u013F: "L",
      \u0141: "L",
      \u013A: "l",
      \u013C: "l",
      \u013E: "l",
      \u0140: "l",
      \u0142: "l",
      \u0143: "N",
      \u0145: "N",
      \u0147: "N",
      \u014A: "N",
      \u0144: "n",
      \u0146: "n",
      \u0148: "n",
      \u014B: "n",
      \u014C: "O",
      \u014E: "O",
      \u0150: "O",
      \u014D: "o",
      \u014F: "o",
      \u0151: "o",
      \u0154: "R",
      \u0156: "R",
      \u0158: "R",
      \u0155: "r",
      \u0157: "r",
      \u0159: "r",
      \u015A: "S",
      \u015C: "S",
      \u015E: "S",
      \u0160: "S",
      \u015B: "s",
      \u015D: "s",
      \u015F: "s",
      \u0161: "s",
      \u0162: "T",
      \u0164: "T",
      \u0166: "T",
      \u0163: "t",
      \u0165: "t",
      \u0167: "t",
      \u0168: "U",
      \u016A: "U",
      \u016C: "U",
      \u016E: "U",
      \u0170: "U",
      \u0172: "U",
      \u0169: "u",
      \u016B: "u",
      \u016D: "u",
      \u016F: "u",
      \u0171: "u",
      \u0173: "u",
      \u0174: "W",
      \u0175: "w",
      \u0176: "Y",
      \u0177: "y",
      \u0178: "Y",
      \u0179: "Z",
      \u017B: "Z",
      \u017D: "Z",
      \u017A: "z",
      \u017C: "z",
      \u017E: "z",
      \u0132: "IJ",
      \u0133: "ij",
      \u0152: "Oe",
      \u0153: "oe",
      \u0149: "'n",
      \u017F: "s"
    }, xo = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, wo = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, To = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, So = parseFloat, Eo = parseInt, ki = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal, Ao = typeof self == "object" && self && self.Object === Object && self, Q = ki || Ao || Function("return this")(), wr = g && !g.nodeType && g, ot = wr && !0 && m && !m.nodeType && m, ji = ot && ot.exports === wr, Tr = ji && ki.process, dn = function() {
      try {
        var a = ot && ot.require && ot.require("util").types;
        return a || Tr && Tr.binding && Tr.binding("util");
      } catch {
      }
    }(), nu = dn && dn.isArrayBuffer, tu = dn && dn.isDate, eu = dn && dn.isMap, ru = dn && dn.isRegExp, iu = dn && dn.isSet, uu = dn && dn.isTypedArray;
    function ln(a, _, h) {
      switch (h.length) {
        case 0:
          return a.call(_);
        case 1:
          return a.call(_, h[0]);
        case 2:
          return a.call(_, h[0], h[1]);
        case 3:
          return a.call(_, h[0], h[1], h[2]);
      }
      return a.apply(_, h);
    }
    function Co(a, _, h, w) {
      for (var C = -1, P = a == null ? 0 : a.length; ++C < P; ) {
        var z = a[C];
        _(w, z, h(z), a);
      }
      return w;
    }
    function vn(a, _) {
      for (var h = -1, w = a == null ? 0 : a.length; ++h < w && _(a[h], h, a) !== !1; )
        ;
      return a;
    }
    function Ro(a, _) {
      for (var h = a == null ? 0 : a.length; h-- && _(a[h], h, a) !== !1; )
        ;
      return a;
    }
    function fu(a, _) {
      for (var h = -1, w = a == null ? 0 : a.length; ++h < w; )
        if (!_(a[h], h, a))
          return !1;
      return !0;
    }
    function Vn(a, _) {
      for (var h = -1, w = a == null ? 0 : a.length, C = 0, P = []; ++h < w; ) {
        var z = a[h];
        _(z, h, a) && (P[C++] = z);
      }
      return P;
    }
    function ve(a, _) {
      var h = a == null ? 0 : a.length;
      return !!h && Ct(a, _, 0) > -1;
    }
    function Sr(a, _, h) {
      for (var w = -1, C = a == null ? 0 : a.length; ++w < C; )
        if (h(_, a[w]))
          return !0;
      return !1;
    }
    function H(a, _) {
      for (var h = -1, w = a == null ? 0 : a.length, C = Array(w); ++h < w; )
        C[h] = _(a[h], h, a);
      return C;
    }
    function Qn(a, _) {
      for (var h = -1, w = _.length, C = a.length; ++h < w; )
        a[C + h] = _[h];
      return a;
    }
    function Er(a, _, h, w) {
      var C = -1, P = a == null ? 0 : a.length;
      for (w && P && (h = a[++C]); ++C < P; )
        h = _(h, a[C], C, a);
      return h;
    }
    function yo(a, _, h, w) {
      var C = a == null ? 0 : a.length;
      for (w && C && (h = a[--C]); C--; )
        h = _(h, a[C], C, a);
      return h;
    }
    function Ar(a, _) {
      for (var h = -1, w = a == null ? 0 : a.length; ++h < w; )
        if (_(a[h], h, a))
          return !0;
      return !1;
    }
    var Io = Cr("length");
    function Lo(a) {
      return a.split("");
    }
    function Oo(a) {
      return a.match(Ds) || [];
    }
    function su(a, _, h) {
      var w;
      return h(a, function(C, P, z) {
        if (_(C, P, z))
          return w = P, !1;
      }), w;
    }
    function me(a, _, h, w) {
      for (var C = a.length, P = h + (w ? 1 : -1); w ? P-- : ++P < C; )
        if (_(a[P], P, a))
          return P;
      return -1;
    }
    function Ct(a, _, h) {
      return _ === _ ? Ho(a, _, h) : me(a, ou, h);
    }
    function bo(a, _, h, w) {
      for (var C = h - 1, P = a.length; ++C < P; )
        if (w(a[C], _))
          return C;
      return -1;
    }
    function ou(a) {
      return a !== a;
    }
    function lu(a, _) {
      var h = a == null ? 0 : a.length;
      return h ? yr(a, _) / h : le;
    }
    function Cr(a) {
      return function(_) {
        return _ == null ? f : _[a];
      };
    }
    function Rr(a) {
      return function(_) {
        return a == null ? f : a[_];
      };
    }
    function au(a, _, h, w, C) {
      return C(a, function(P, z, G) {
        h = w ? (w = !1, P) : _(h, P, z, G);
      }), h;
    }
    function Wo(a, _) {
      var h = a.length;
      for (a.sort(_); h--; )
        a[h] = a[h].value;
      return a;
    }
    function yr(a, _) {
      for (var h, w = -1, C = a.length; ++w < C; ) {
        var P = _(a[w]);
        P !== f && (h = h === f ? P : h + P);
      }
      return h;
    }
    function Ir(a, _) {
      for (var h = -1, w = Array(a); ++h < a; )
        w[h] = _(h);
      return w;
    }
    function Mo(a, _) {
      return H(_, function(h) {
        return [h, a[h]];
      });
    }
    function cu(a) {
      return a && a.slice(0, pu(a) + 1).replace(_r, "");
    }
    function an(a) {
      return function(_) {
        return a(_);
      };
    }
    function Lr(a, _) {
      return H(_, function(h) {
        return a[h];
      });
    }
    function Yt(a, _) {
      return a.has(_);
    }
    function hu(a, _) {
      for (var h = -1, w = a.length; ++h < w && Ct(_, a[h], 0) > -1; )
        ;
      return h;
    }
    function gu(a, _) {
      for (var h = a.length; h-- && Ct(_, a[h], 0) > -1; )
        ;
      return h;
    }
    function Po(a, _) {
      for (var h = a.length, w = 0; h--; )
        a[h] === _ && ++w;
      return w;
    }
    var Bo = Rr(mo), Fo = Rr(xo);
    function Do(a) {
      return "\\" + To[a];
    }
    function Uo(a, _) {
      return a == null ? f : a[_];
    }
    function Rt(a) {
      return go.test(a);
    }
    function Go(a) {
      return _o.test(a);
    }
    function No(a) {
      for (var _, h = []; !(_ = a.next()).done; )
        h.push(_.value);
      return h;
    }
    function Or(a) {
      var _ = -1, h = Array(a.size);
      return a.forEach(function(w, C) {
        h[++_] = [C, w];
      }), h;
    }
    function _u(a, _) {
      return function(h) {
        return a(_(h));
      };
    }
    function kn(a, _) {
      for (var h = -1, w = a.length, C = 0, P = []; ++h < w; ) {
        var z = a[h];
        (z === _ || z === se) && (a[h] = se, P[C++] = h);
      }
      return P;
    }
    function xe(a) {
      var _ = -1, h = Array(a.size);
      return a.forEach(function(w) {
        h[++_] = w;
      }), h;
    }
    function $o(a) {
      var _ = -1, h = Array(a.size);
      return a.forEach(function(w) {
        h[++_] = [w, w];
      }), h;
    }
    function Ho(a, _, h) {
      for (var w = h - 1, C = a.length; ++w < C; )
        if (a[w] === _)
          return w;
      return -1;
    }
    function qo(a, _, h) {
      for (var w = h + 1; w--; )
        if (a[w] === _)
          return w;
      return w;
    }
    function yt(a) {
      return Rt(a) ? Xo(a) : Io(a);
    }
    function Rn(a) {
      return Rt(a) ? Yo(a) : Lo(a);
    }
    function pu(a) {
      for (var _ = a.length; _-- && Ms.test(a.charAt(_)); )
        ;
      return _;
    }
    var Ko = Rr(wo);
    function Xo(a) {
      for (var _ = xr.lastIndex = 0; xr.test(a); )
        ++_;
      return _;
    }
    function Yo(a) {
      return a.match(xr) || [];
    }
    function zo(a) {
      return a.match(ho) || [];
    }
    var Zo = function a(_) {
      _ = _ == null ? Q : It.defaults(Q.Object(), _, It.pick(Q, po));
      var h = _.Array, w = _.Date, C = _.Error, P = _.Function, z = _.Math, G = _.Object, br = _.RegExp, Jo = _.String, mn = _.TypeError, we = h.prototype, Vo = P.prototype, Lt = G.prototype, Te = _["__core-js_shared__"], Se = Vo.toString, D = Lt.hasOwnProperty, Qo = 0, du = function() {
        var n = /[^.]+$/.exec(Te && Te.keys && Te.keys.IE_PROTO || "");
        return n ? "Symbol(src)_1." + n : "";
      }(), Ee = Lt.toString, ko = Se.call(G), jo = Q._, nl = br(
        "^" + Se.call(D).replace(gr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), Ae = ji ? _.Buffer : f, jn = _.Symbol, Ce = _.Uint8Array, vu = Ae ? Ae.allocUnsafe : f, Re = _u(G.getPrototypeOf, G), mu = G.create, xu = Lt.propertyIsEnumerable, ye = we.splice, wu = jn ? jn.isConcatSpreadable : f, zt = jn ? jn.iterator : f, lt = jn ? jn.toStringTag : f, Ie = function() {
        try {
          var n = _t(G, "defineProperty");
          return n({}, "", {}), n;
        } catch {
        }
      }(), tl = _.clearTimeout !== Q.clearTimeout && _.clearTimeout, el = w && w.now !== Q.Date.now && w.now, rl = _.setTimeout !== Q.setTimeout && _.setTimeout, Le = z.ceil, Oe = z.floor, Wr = G.getOwnPropertySymbols, il = Ae ? Ae.isBuffer : f, Tu = _.isFinite, ul = we.join, fl = _u(G.keys, G), Z = z.max, j = z.min, sl = w.now, ol = _.parseInt, Su = z.random, ll = we.reverse, Mr = _t(_, "DataView"), Zt = _t(_, "Map"), Pr = _t(_, "Promise"), Ot = _t(_, "Set"), Jt = _t(_, "WeakMap"), Vt = _t(G, "create"), be = Jt && new Jt(), bt = {}, al = pt(Mr), cl = pt(Zt), hl = pt(Pr), gl = pt(Ot), _l = pt(Jt), We = jn ? jn.prototype : f, Qt = We ? We.valueOf : f, Eu = We ? We.toString : f;
      function u(n) {
        if (K(n) && !R(n) && !(n instanceof W)) {
          if (n instanceof xn)
            return n;
          if (D.call(n, "__wrapped__"))
            return Cf(n);
        }
        return new xn(n);
      }
      var Wt = function() {
        function n() {
        }
        return function(t) {
          if (!q(t))
            return {};
          if (mu)
            return mu(t);
          n.prototype = t;
          var e = new n();
          return n.prototype = f, e;
        };
      }();
      function Me() {
      }
      function xn(n, t) {
        this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = f;
      }
      u.templateSettings = {
        escape: ys,
        evaluate: Is,
        interpolate: Wi,
        variable: "",
        imports: {
          _: u
        }
      }, u.prototype = Me.prototype, u.prototype.constructor = u, xn.prototype = Wt(Me.prototype), xn.prototype.constructor = xn;
      function W(n) {
        this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Wn, this.__views__ = [];
      }
      function pl() {
        var n = new W(this.__wrapped__);
        return n.__actions__ = un(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = un(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = un(this.__views__), n;
      }
      function dl() {
        if (this.__filtered__) {
          var n = new W(this);
          n.__dir__ = -1, n.__filtered__ = !0;
        } else
          n = this.clone(), n.__dir__ *= -1;
        return n;
      }
      function vl() {
        var n = this.__wrapped__.value(), t = this.__dir__, e = R(n), r = t < 0, i = e ? n.length : 0, s = La(0, i, this.__views__), o = s.start, l = s.end, c = l - o, p = r ? l : o - 1, d = this.__iteratees__, v = d.length, x = 0, T = j(c, this.__takeCount__);
        if (!e || !r && i == c && T == c)
          return zu(n, this.__actions__);
        var E = [];
        n:
          for (; c-- && x < T; ) {
            p += t;
            for (var I = -1, A = n[p]; ++I < v; ) {
              var O = d[I], M = O.iteratee, gn = O.type, rn = M(A);
              if (gn == as)
                A = rn;
              else if (!rn) {
                if (gn == yi)
                  continue n;
                break n;
              }
            }
            E[x++] = A;
          }
        return E;
      }
      W.prototype = Wt(Me.prototype), W.prototype.constructor = W;
      function at(n) {
        var t = -1, e = n == null ? 0 : n.length;
        for (this.clear(); ++t < e; ) {
          var r = n[t];
          this.set(r[0], r[1]);
        }
      }
      function ml() {
        this.__data__ = Vt ? Vt(null) : {}, this.size = 0;
      }
      function xl(n) {
        var t = this.has(n) && delete this.__data__[n];
        return this.size -= t ? 1 : 0, t;
      }
      function wl(n) {
        var t = this.__data__;
        if (Vt) {
          var e = t[n];
          return e === zn ? f : e;
        }
        return D.call(t, n) ? t[n] : f;
      }
      function Tl(n) {
        var t = this.__data__;
        return Vt ? t[n] !== f : D.call(t, n);
      }
      function Sl(n, t) {
        var e = this.__data__;
        return this.size += this.has(n) ? 0 : 1, e[n] = Vt && t === f ? zn : t, this;
      }
      at.prototype.clear = ml, at.prototype.delete = xl, at.prototype.get = wl, at.prototype.has = Tl, at.prototype.set = Sl;
      function Un(n) {
        var t = -1, e = n == null ? 0 : n.length;
        for (this.clear(); ++t < e; ) {
          var r = n[t];
          this.set(r[0], r[1]);
        }
      }
      function El() {
        this.__data__ = [], this.size = 0;
      }
      function Al(n) {
        var t = this.__data__, e = Pe(t, n);
        if (e < 0)
          return !1;
        var r = t.length - 1;
        return e == r ? t.pop() : ye.call(t, e, 1), --this.size, !0;
      }
      function Cl(n) {
        var t = this.__data__, e = Pe(t, n);
        return e < 0 ? f : t[e][1];
      }
      function Rl(n) {
        return Pe(this.__data__, n) > -1;
      }
      function yl(n, t) {
        var e = this.__data__, r = Pe(e, n);
        return r < 0 ? (++this.size, e.push([n, t])) : e[r][1] = t, this;
      }
      Un.prototype.clear = El, Un.prototype.delete = Al, Un.prototype.get = Cl, Un.prototype.has = Rl, Un.prototype.set = yl;
      function Gn(n) {
        var t = -1, e = n == null ? 0 : n.length;
        for (this.clear(); ++t < e; ) {
          var r = n[t];
          this.set(r[0], r[1]);
        }
      }
      function Il() {
        this.size = 0, this.__data__ = {
          hash: new at(),
          map: new (Zt || Un)(),
          string: new at()
        };
      }
      function Ll(n) {
        var t = Ye(this, n).delete(n);
        return this.size -= t ? 1 : 0, t;
      }
      function Ol(n) {
        return Ye(this, n).get(n);
      }
      function bl(n) {
        return Ye(this, n).has(n);
      }
      function Wl(n, t) {
        var e = Ye(this, n), r = e.size;
        return e.set(n, t), this.size += e.size == r ? 0 : 1, this;
      }
      Gn.prototype.clear = Il, Gn.prototype.delete = Ll, Gn.prototype.get = Ol, Gn.prototype.has = bl, Gn.prototype.set = Wl;
      function ct(n) {
        var t = -1, e = n == null ? 0 : n.length;
        for (this.__data__ = new Gn(); ++t < e; )
          this.add(n[t]);
      }
      function Ml(n) {
        return this.__data__.set(n, zn), this;
      }
      function Pl(n) {
        return this.__data__.has(n);
      }
      ct.prototype.add = ct.prototype.push = Ml, ct.prototype.has = Pl;
      function yn(n) {
        var t = this.__data__ = new Un(n);
        this.size = t.size;
      }
      function Bl() {
        this.__data__ = new Un(), this.size = 0;
      }
      function Fl(n) {
        var t = this.__data__, e = t.delete(n);
        return this.size = t.size, e;
      }
      function Dl(n) {
        return this.__data__.get(n);
      }
      function Ul(n) {
        return this.__data__.has(n);
      }
      function Gl(n, t) {
        var e = this.__data__;
        if (e instanceof Un) {
          var r = e.__data__;
          if (!Zt || r.length < B - 1)
            return r.push([n, t]), this.size = ++e.size, this;
          e = this.__data__ = new Gn(r);
        }
        return e.set(n, t), this.size = e.size, this;
      }
      yn.prototype.clear = Bl, yn.prototype.delete = Fl, yn.prototype.get = Dl, yn.prototype.has = Ul, yn.prototype.set = Gl;
      function Au(n, t) {
        var e = R(n), r = !e && dt(n), i = !e && !r && it(n), s = !e && !r && !i && Ft(n), o = e || r || i || s, l = o ? Ir(n.length, Jo) : [], c = l.length;
        for (var p in n)
          (t || D.call(n, p)) && !(o && (p == "length" || i && (p == "offset" || p == "parent") || s && (p == "buffer" || p == "byteLength" || p == "byteOffset") || qn(p, c))) && l.push(p);
        return l;
      }
      function Cu(n) {
        var t = n.length;
        return t ? n[Xr(0, t - 1)] : f;
      }
      function Nl(n, t) {
        return ze(un(n), ht(t, 0, n.length));
      }
      function $l(n) {
        return ze(un(n));
      }
      function Br(n, t, e) {
        (e !== f && !In(n[t], e) || e === f && !(t in n)) && Nn(n, t, e);
      }
      function kt(n, t, e) {
        var r = n[t];
        (!(D.call(n, t) && In(r, e)) || e === f && !(t in n)) && Nn(n, t, e);
      }
      function Pe(n, t) {
        for (var e = n.length; e--; )
          if (In(n[e][0], t))
            return e;
        return -1;
      }
      function Hl(n, t, e, r) {
        return nt(n, function(i, s, o) {
          t(r, i, e(i), o);
        }), r;
      }
      function Ru(n, t) {
        return n && Pn(t, V(t), n);
      }
      function ql(n, t) {
        return n && Pn(t, sn(t), n);
      }
      function Nn(n, t, e) {
        t == "__proto__" && Ie ? Ie(n, t, {
          configurable: !0,
          enumerable: !0,
          value: e,
          writable: !0
        }) : n[t] = e;
      }
      function Fr(n, t) {
        for (var e = -1, r = t.length, i = h(r), s = n == null; ++e < r; )
          i[e] = s ? f : di(n, t[e]);
        return i;
      }
      function ht(n, t, e) {
        return n === n && (e !== f && (n = n <= e ? n : e), t !== f && (n = n >= t ? n : t)), n;
      }
      function wn(n, t, e, r, i, s) {
        var o, l = t & Zn, c = t & Ci, p = t & mt;
        if (e && (o = i ? e(n, r, i, s) : e(n)), o !== f)
          return o;
        if (!q(n))
          return n;
        var d = R(n);
        if (d) {
          if (o = ba(n), !l)
            return un(n, o);
        } else {
          var v = nn(n), x = v == he || v == Ii;
          if (it(n))
            return Vu(n, l);
          if (v == Dn || v == St || x && !i) {
            if (o = c || x ? {} : df(n), !l)
              return c ? wa(n, ql(o, n)) : xa(n, Ru(o, n));
          } else {
            if (!N[v])
              return i ? n : {};
            o = Wa(n, v, l);
          }
        }
        s || (s = new yn());
        var T = s.get(n);
        if (T)
          return T;
        s.set(n, o), Xf(n) ? n.forEach(function(A) {
          o.add(wn(A, t, e, A, n, s));
        }) : qf(n) && n.forEach(function(A, O) {
          o.set(O, wn(A, t, e, O, n, s));
        });
        var E = p ? c ? ei : ti : c ? sn : V, I = d ? f : E(n);
        return vn(I || n, function(A, O) {
          I && (O = A, A = n[O]), kt(o, O, wn(A, t, e, O, n, s));
        }), o;
      }
      function Kl(n) {
        var t = V(n);
        return function(e) {
          return yu(e, n, t);
        };
      }
      function yu(n, t, e) {
        var r = e.length;
        if (n == null)
          return !r;
        for (n = G(n); r--; ) {
          var i = e[r], s = t[i], o = n[i];
          if (o === f && !(i in n) || !s(o))
            return !1;
        }
        return !0;
      }
      function Iu(n, t, e) {
        if (typeof n != "function")
          throw new mn(U);
        return ue(function() {
          n.apply(f, e);
        }, t);
      }
      function jt(n, t, e, r) {
        var i = -1, s = ve, o = !0, l = n.length, c = [], p = t.length;
        if (!l)
          return c;
        e && (t = H(t, an(e))), r ? (s = Sr, o = !1) : t.length >= B && (s = Yt, o = !1, t = new ct(t));
        n:
          for (; ++i < l; ) {
            var d = n[i], v = e == null ? d : e(d);
            if (d = r || d !== 0 ? d : 0, o && v === v) {
              for (var x = p; x--; )
                if (t[x] === v)
                  continue n;
              c.push(d);
            } else
              s(t, v, r) || c.push(d);
          }
        return c;
      }
      var nt = tf(Mn), Lu = tf(Ur, !0);
      function Xl(n, t) {
        var e = !0;
        return nt(n, function(r, i, s) {
          return e = !!t(r, i, s), e;
        }), e;
      }
      function Be(n, t, e) {
        for (var r = -1, i = n.length; ++r < i; ) {
          var s = n[r], o = t(s);
          if (o != null && (l === f ? o === o && !hn(o) : e(o, l)))
            var l = o, c = s;
        }
        return c;
      }
      function Yl(n, t, e, r) {
        var i = n.length;
        for (e = y(e), e < 0 && (e = -e > i ? 0 : i + e), r = r === f || r > i ? i : y(r), r < 0 && (r += i), r = e > r ? 0 : zf(r); e < r; )
          n[e++] = t;
        return n;
      }
      function Ou(n, t) {
        var e = [];
        return nt(n, function(r, i, s) {
          t(r, i, s) && e.push(r);
        }), e;
      }
      function k(n, t, e, r, i) {
        var s = -1, o = n.length;
        for (e || (e = Pa), i || (i = []); ++s < o; ) {
          var l = n[s];
          t > 0 && e(l) ? t > 1 ? k(l, t - 1, e, r, i) : Qn(i, l) : r || (i[i.length] = l);
        }
        return i;
      }
      var Dr = ef(), bu = ef(!0);
      function Mn(n, t) {
        return n && Dr(n, t, V);
      }
      function Ur(n, t) {
        return n && bu(n, t, V);
      }
      function Fe(n, t) {
        return Vn(t, function(e) {
          return Kn(n[e]);
        });
      }
      function gt(n, t) {
        t = et(t, n);
        for (var e = 0, r = t.length; n != null && e < r; )
          n = n[Bn(t[e++])];
        return e && e == r ? n : f;
      }
      function Wu(n, t, e) {
        var r = t(n);
        return R(n) ? r : Qn(r, e(n));
      }
      function tn(n) {
        return n == null ? n === f ? ws : ms : lt && lt in G(n) ? Ia(n) : $a(n);
      }
      function Gr(n, t) {
        return n > t;
      }
      function zl(n, t) {
        return n != null && D.call(n, t);
      }
      function Zl(n, t) {
        return n != null && t in G(n);
      }
      function Jl(n, t, e) {
        return n >= j(t, e) && n < Z(t, e);
      }
      function Nr(n, t, e) {
        for (var r = e ? Sr : ve, i = n[0].length, s = n.length, o = s, l = h(s), c = 1 / 0, p = []; o--; ) {
          var d = n[o];
          o && t && (d = H(d, an(t))), c = j(d.length, c), l[o] = !e && (t || i >= 120 && d.length >= 120) ? new ct(o && d) : f;
        }
        d = n[0];
        var v = -1, x = l[0];
        n:
          for (; ++v < i && p.length < c; ) {
            var T = d[v], E = t ? t(T) : T;
            if (T = e || T !== 0 ? T : 0, !(x ? Yt(x, E) : r(p, E, e))) {
              for (o = s; --o; ) {
                var I = l[o];
                if (!(I ? Yt(I, E) : r(n[o], E, e)))
                  continue n;
              }
              x && x.push(E), p.push(T);
            }
          }
        return p;
      }
      function Vl(n, t, e, r) {
        return Mn(n, function(i, s, o) {
          t(r, e(i), s, o);
        }), r;
      }
      function ne(n, t, e) {
        t = et(t, n), n = wf(n, t);
        var r = n == null ? n : n[Bn(Sn(t))];
        return r == null ? f : ln(r, n, e);
      }
      function Mu(n) {
        return K(n) && tn(n) == St;
      }
      function Ql(n) {
        return K(n) && tn(n) == Xt;
      }
      function kl(n) {
        return K(n) && tn(n) == Nt;
      }
      function te(n, t, e, r, i) {
        return n === t ? !0 : n == null || t == null || !K(n) && !K(t) ? n !== n && t !== t : jl(n, t, e, r, te, i);
      }
      function jl(n, t, e, r, i, s) {
        var o = R(n), l = R(t), c = o ? ae : nn(n), p = l ? ae : nn(t);
        c = c == St ? Dn : c, p = p == St ? Dn : p;
        var d = c == Dn, v = p == Dn, x = c == p;
        if (x && it(n)) {
          if (!it(t))
            return !1;
          o = !0, d = !1;
        }
        if (x && !d)
          return s || (s = new yn()), o || Ft(n) ? gf(n, t, e, r, i, s) : Ra(n, t, c, e, r, i, s);
        if (!(e & xt)) {
          var T = d && D.call(n, "__wrapped__"), E = v && D.call(t, "__wrapped__");
          if (T || E) {
            var I = T ? n.value() : n, A = E ? t.value() : t;
            return s || (s = new yn()), i(I, A, e, r, s);
          }
        }
        return x ? (s || (s = new yn()), ya(n, t, e, r, i, s)) : !1;
      }
      function na(n) {
        return K(n) && nn(n) == An;
      }
      function $r(n, t, e, r) {
        var i = e.length, s = i, o = !r;
        if (n == null)
          return !s;
        for (n = G(n); i--; ) {
          var l = e[i];
          if (o && l[2] ? l[1] !== n[l[0]] : !(l[0] in n))
            return !1;
        }
        for (; ++i < s; ) {
          l = e[i];
          var c = l[0], p = n[c], d = l[1];
          if (o && l[2]) {
            if (p === f && !(c in n))
              return !1;
          } else {
            var v = new yn();
            if (r)
              var x = r(p, d, c, n, t, v);
            if (!(x === f ? te(d, p, xt | oe, r, v) : x))
              return !1;
          }
        }
        return !0;
      }
      function Pu(n) {
        if (!q(n) || Fa(n))
          return !1;
        var t = Kn(n) ? nl : qs;
        return t.test(pt(n));
      }
      function ta(n) {
        return K(n) && tn(n) == Ht;
      }
      function ea(n) {
        return K(n) && nn(n) == Cn;
      }
      function ra(n) {
        return K(n) && je(n.length) && !!$[tn(n)];
      }
      function Bu(n) {
        return typeof n == "function" ? n : n == null ? on : typeof n == "object" ? R(n) ? Uu(n[0], n[1]) : Du(n) : is(n);
      }
      function Hr(n) {
        if (!ie(n))
          return fl(n);
        var t = [];
        for (var e in G(n))
          D.call(n, e) && e != "constructor" && t.push(e);
        return t;
      }
      function ia(n) {
        if (!q(n))
          return Na(n);
        var t = ie(n), e = [];
        for (var r in n)
          r == "constructor" && (t || !D.call(n, r)) || e.push(r);
        return e;
      }
      function qr(n, t) {
        return n < t;
      }
      function Fu(n, t) {
        var e = -1, r = fn(n) ? h(n.length) : [];
        return nt(n, function(i, s, o) {
          r[++e] = t(i, s, o);
        }), r;
      }
      function Du(n) {
        var t = ii(n);
        return t.length == 1 && t[0][2] ? mf(t[0][0], t[0][1]) : function(e) {
          return e === n || $r(e, n, t);
        };
      }
      function Uu(n, t) {
        return fi(n) && vf(t) ? mf(Bn(n), t) : function(e) {
          var r = di(e, n);
          return r === f && r === t ? vi(e, n) : te(t, r, xt | oe);
        };
      }
      function De(n, t, e, r, i) {
        n !== t && Dr(t, function(s, o) {
          if (i || (i = new yn()), q(s))
            ua(n, t, o, e, De, r, i);
          else {
            var l = r ? r(oi(n, o), s, o + "", n, t, i) : f;
            l === f && (l = s), Br(n, o, l);
          }
        }, sn);
      }
      function ua(n, t, e, r, i, s, o) {
        var l = oi(n, e), c = oi(t, e), p = o.get(c);
        if (p) {
          Br(n, e, p);
          return;
        }
        var d = s ? s(l, c, e + "", n, t, o) : f, v = d === f;
        if (v) {
          var x = R(c), T = !x && it(c), E = !x && !T && Ft(c);
          d = c, x || T || E ? R(l) ? d = l : X(l) ? d = un(l) : T ? (v = !1, d = Vu(c, !0)) : E ? (v = !1, d = Qu(c, !0)) : d = [] : fe(c) || dt(c) ? (d = l, dt(l) ? d = Zf(l) : (!q(l) || Kn(l)) && (d = df(c))) : v = !1;
        }
        v && (o.set(c, d), i(d, c, r, s, o), o.delete(c)), Br(n, e, d);
      }
      function Gu(n, t) {
        var e = n.length;
        if (!!e)
          return t += t < 0 ? e : 0, qn(t, e) ? n[t] : f;
      }
      function Nu(n, t, e) {
        t.length ? t = H(t, function(s) {
          return R(s) ? function(o) {
            return gt(o, s.length === 1 ? s[0] : s);
          } : s;
        }) : t = [on];
        var r = -1;
        t = H(t, an(S()));
        var i = Fu(n, function(s, o, l) {
          var c = H(t, function(p) {
            return p(s);
          });
          return { criteria: c, index: ++r, value: s };
        });
        return Wo(i, function(s, o) {
          return ma(s, o, e);
        });
      }
      function fa(n, t) {
        return $u(n, t, function(e, r) {
          return vi(n, r);
        });
      }
      function $u(n, t, e) {
        for (var r = -1, i = t.length, s = {}; ++r < i; ) {
          var o = t[r], l = gt(n, o);
          e(l, o) && ee(s, et(o, n), l);
        }
        return s;
      }
      function sa(n) {
        return function(t) {
          return gt(t, n);
        };
      }
      function Kr(n, t, e, r) {
        var i = r ? bo : Ct, s = -1, o = t.length, l = n;
        for (n === t && (t = un(t)), e && (l = H(n, an(e))); ++s < o; )
          for (var c = 0, p = t[s], d = e ? e(p) : p; (c = i(l, d, c, r)) > -1; )
            l !== n && ye.call(l, c, 1), ye.call(n, c, 1);
        return n;
      }
      function Hu(n, t) {
        for (var e = n ? t.length : 0, r = e - 1; e--; ) {
          var i = t[e];
          if (e == r || i !== s) {
            var s = i;
            qn(i) ? ye.call(n, i, 1) : Zr(n, i);
          }
        }
        return n;
      }
      function Xr(n, t) {
        return n + Oe(Su() * (t - n + 1));
      }
      function oa(n, t, e, r) {
        for (var i = -1, s = Z(Le((t - n) / (e || 1)), 0), o = h(s); s--; )
          o[r ? s : ++i] = n, n += e;
        return o;
      }
      function Yr(n, t) {
        var e = "";
        if (!n || t < 1 || t > Jn)
          return e;
        do
          t % 2 && (e += n), t = Oe(t / 2), t && (n += n);
        while (t);
        return e;
      }
      function L(n, t) {
        return li(xf(n, t, on), n + "");
      }
      function la(n) {
        return Cu(Dt(n));
      }
      function aa(n, t) {
        var e = Dt(n);
        return ze(e, ht(t, 0, e.length));
      }
      function ee(n, t, e, r) {
        if (!q(n))
          return n;
        t = et(t, n);
        for (var i = -1, s = t.length, o = s - 1, l = n; l != null && ++i < s; ) {
          var c = Bn(t[i]), p = e;
          if (c === "__proto__" || c === "constructor" || c === "prototype")
            return n;
          if (i != o) {
            var d = l[c];
            p = r ? r(d, c, l) : f, p === f && (p = q(d) ? d : qn(t[i + 1]) ? [] : {});
          }
          kt(l, c, p), l = l[c];
        }
        return n;
      }
      var qu = be ? function(n, t) {
        return be.set(n, t), n;
      } : on, ca = Ie ? function(n, t) {
        return Ie(n, "toString", {
          configurable: !0,
          enumerable: !1,
          value: xi(t),
          writable: !0
        });
      } : on;
      function ha(n) {
        return ze(Dt(n));
      }
      function Tn(n, t, e) {
        var r = -1, i = n.length;
        t < 0 && (t = -t > i ? 0 : i + t), e = e > i ? i : e, e < 0 && (e += i), i = t > e ? 0 : e - t >>> 0, t >>>= 0;
        for (var s = h(i); ++r < i; )
          s[r] = n[r + t];
        return s;
      }
      function ga(n, t) {
        var e;
        return nt(n, function(r, i, s) {
          return e = t(r, i, s), !e;
        }), !!e;
      }
      function Ue(n, t, e) {
        var r = 0, i = n == null ? r : n.length;
        if (typeof t == "number" && t === t && i <= _s) {
          for (; r < i; ) {
            var s = r + i >>> 1, o = n[s];
            o !== null && !hn(o) && (e ? o <= t : o < t) ? r = s + 1 : i = s;
          }
          return i;
        }
        return zr(n, t, on, e);
      }
      function zr(n, t, e, r) {
        var i = 0, s = n == null ? 0 : n.length;
        if (s === 0)
          return 0;
        t = e(t);
        for (var o = t !== t, l = t === null, c = hn(t), p = t === f; i < s; ) {
          var d = Oe((i + s) / 2), v = e(n[d]), x = v !== f, T = v === null, E = v === v, I = hn(v);
          if (o)
            var A = r || E;
          else
            p ? A = E && (r || x) : l ? A = E && x && (r || !T) : c ? A = E && x && !T && (r || !I) : T || I ? A = !1 : A = r ? v <= t : v < t;
          A ? i = d + 1 : s = d;
        }
        return j(s, gs);
      }
      function Ku(n, t) {
        for (var e = -1, r = n.length, i = 0, s = []; ++e < r; ) {
          var o = n[e], l = t ? t(o) : o;
          if (!e || !In(l, c)) {
            var c = l;
            s[i++] = o === 0 ? 0 : o;
          }
        }
        return s;
      }
      function Xu(n) {
        return typeof n == "number" ? n : hn(n) ? le : +n;
      }
      function cn(n) {
        if (typeof n == "string")
          return n;
        if (R(n))
          return H(n, cn) + "";
        if (hn(n))
          return Eu ? Eu.call(n) : "";
        var t = n + "";
        return t == "0" && 1 / n == -st ? "-0" : t;
      }
      function tt(n, t, e) {
        var r = -1, i = ve, s = n.length, o = !0, l = [], c = l;
        if (e)
          o = !1, i = Sr;
        else if (s >= B) {
          var p = t ? null : Aa(n);
          if (p)
            return xe(p);
          o = !1, i = Yt, c = new ct();
        } else
          c = t ? [] : l;
        n:
          for (; ++r < s; ) {
            var d = n[r], v = t ? t(d) : d;
            if (d = e || d !== 0 ? d : 0, o && v === v) {
              for (var x = c.length; x--; )
                if (c[x] === v)
                  continue n;
              t && c.push(v), l.push(d);
            } else
              i(c, v, e) || (c !== l && c.push(v), l.push(d));
          }
        return l;
      }
      function Zr(n, t) {
        return t = et(t, n), n = wf(n, t), n == null || delete n[Bn(Sn(t))];
      }
      function Yu(n, t, e, r) {
        return ee(n, t, e(gt(n, t)), r);
      }
      function Ge(n, t, e, r) {
        for (var i = n.length, s = r ? i : -1; (r ? s-- : ++s < i) && t(n[s], s, n); )
          ;
        return e ? Tn(n, r ? 0 : s, r ? s + 1 : i) : Tn(n, r ? s + 1 : 0, r ? i : s);
      }
      function zu(n, t) {
        var e = n;
        return e instanceof W && (e = e.value()), Er(t, function(r, i) {
          return i.func.apply(i.thisArg, Qn([r], i.args));
        }, e);
      }
      function Jr(n, t, e) {
        var r = n.length;
        if (r < 2)
          return r ? tt(n[0]) : [];
        for (var i = -1, s = h(r); ++i < r; )
          for (var o = n[i], l = -1; ++l < r; )
            l != i && (s[i] = jt(s[i] || o, n[l], t, e));
        return tt(k(s, 1), t, e);
      }
      function Zu(n, t, e) {
        for (var r = -1, i = n.length, s = t.length, o = {}; ++r < i; ) {
          var l = r < s ? t[r] : f;
          e(o, n[r], l);
        }
        return o;
      }
      function Vr(n) {
        return X(n) ? n : [];
      }
      function Qr(n) {
        return typeof n == "function" ? n : on;
      }
      function et(n, t) {
        return R(n) ? n : fi(n, t) ? [n] : Af(F(n));
      }
      var _a = L;
      function rt(n, t, e) {
        var r = n.length;
        return e = e === f ? r : e, !t && e >= r ? n : Tn(n, t, e);
      }
      var Ju = tl || function(n) {
        return Q.clearTimeout(n);
      };
      function Vu(n, t) {
        if (t)
          return n.slice();
        var e = n.length, r = vu ? vu(e) : new n.constructor(e);
        return n.copy(r), r;
      }
      function kr(n) {
        var t = new n.constructor(n.byteLength);
        return new Ce(t).set(new Ce(n)), t;
      }
      function pa(n, t) {
        var e = t ? kr(n.buffer) : n.buffer;
        return new n.constructor(e, n.byteOffset, n.byteLength);
      }
      function da(n) {
        var t = new n.constructor(n.source, Mi.exec(n));
        return t.lastIndex = n.lastIndex, t;
      }
      function va(n) {
        return Qt ? G(Qt.call(n)) : {};
      }
      function Qu(n, t) {
        var e = t ? kr(n.buffer) : n.buffer;
        return new n.constructor(e, n.byteOffset, n.length);
      }
      function ku(n, t) {
        if (n !== t) {
          var e = n !== f, r = n === null, i = n === n, s = hn(n), o = t !== f, l = t === null, c = t === t, p = hn(t);
          if (!l && !p && !s && n > t || s && o && c && !l && !p || r && o && c || !e && c || !i)
            return 1;
          if (!r && !s && !p && n < t || p && e && i && !r && !s || l && e && i || !o && i || !c)
            return -1;
        }
        return 0;
      }
      function ma(n, t, e) {
        for (var r = -1, i = n.criteria, s = t.criteria, o = i.length, l = e.length; ++r < o; ) {
          var c = ku(i[r], s[r]);
          if (c) {
            if (r >= l)
              return c;
            var p = e[r];
            return c * (p == "desc" ? -1 : 1);
          }
        }
        return n.index - t.index;
      }
      function ju(n, t, e, r) {
        for (var i = -1, s = n.length, o = e.length, l = -1, c = t.length, p = Z(s - o, 0), d = h(c + p), v = !r; ++l < c; )
          d[l] = t[l];
        for (; ++i < o; )
          (v || i < s) && (d[e[i]] = n[i]);
        for (; p--; )
          d[l++] = n[i++];
        return d;
      }
      function nf(n, t, e, r) {
        for (var i = -1, s = n.length, o = -1, l = e.length, c = -1, p = t.length, d = Z(s - l, 0), v = h(d + p), x = !r; ++i < d; )
          v[i] = n[i];
        for (var T = i; ++c < p; )
          v[T + c] = t[c];
        for (; ++o < l; )
          (x || i < s) && (v[T + e[o]] = n[i++]);
        return v;
      }
      function un(n, t) {
        var e = -1, r = n.length;
        for (t || (t = h(r)); ++e < r; )
          t[e] = n[e];
        return t;
      }
      function Pn(n, t, e, r) {
        var i = !e;
        e || (e = {});
        for (var s = -1, o = t.length; ++s < o; ) {
          var l = t[s], c = r ? r(e[l], n[l], l, e, n) : f;
          c === f && (c = n[l]), i ? Nn(e, l, c) : kt(e, l, c);
        }
        return e;
      }
      function xa(n, t) {
        return Pn(n, ui(n), t);
      }
      function wa(n, t) {
        return Pn(n, _f(n), t);
      }
      function Ne(n, t) {
        return function(e, r) {
          var i = R(e) ? Co : Hl, s = t ? t() : {};
          return i(e, n, S(r, 2), s);
        };
      }
      function Mt(n) {
        return L(function(t, e) {
          var r = -1, i = e.length, s = i > 1 ? e[i - 1] : f, o = i > 2 ? e[2] : f;
          for (s = n.length > 3 && typeof s == "function" ? (i--, s) : f, o && en(e[0], e[1], o) && (s = i < 3 ? f : s, i = 1), t = G(t); ++r < i; ) {
            var l = e[r];
            l && n(t, l, r, s);
          }
          return t;
        });
      }
      function tf(n, t) {
        return function(e, r) {
          if (e == null)
            return e;
          if (!fn(e))
            return n(e, r);
          for (var i = e.length, s = t ? i : -1, o = G(e); (t ? s-- : ++s < i) && r(o[s], s, o) !== !1; )
            ;
          return e;
        };
      }
      function ef(n) {
        return function(t, e, r) {
          for (var i = -1, s = G(t), o = r(t), l = o.length; l--; ) {
            var c = o[n ? l : ++i];
            if (e(s[c], c, s) === !1)
              break;
          }
          return t;
        };
      }
      function Ta(n, t, e) {
        var r = t & pn, i = re(n);
        function s() {
          var o = this && this !== Q && this instanceof s ? i : n;
          return o.apply(r ? e : this, arguments);
        }
        return s;
      }
      function rf(n) {
        return function(t) {
          t = F(t);
          var e = Rt(t) ? Rn(t) : f, r = e ? e[0] : t.charAt(0), i = e ? rt(e, 1).join("") : t.slice(1);
          return r[n]() + i;
        };
      }
      function Pt(n) {
        return function(t) {
          return Er(es(ts(t).replace(ao, "")), n, "");
        };
      }
      function re(n) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new n();
            case 1:
              return new n(t[0]);
            case 2:
              return new n(t[0], t[1]);
            case 3:
              return new n(t[0], t[1], t[2]);
            case 4:
              return new n(t[0], t[1], t[2], t[3]);
            case 5:
              return new n(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new n(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var e = Wt(n.prototype), r = n.apply(e, t);
          return q(r) ? r : e;
        };
      }
      function Sa(n, t, e) {
        var r = re(n);
        function i() {
          for (var s = arguments.length, o = h(s), l = s, c = Bt(i); l--; )
            o[l] = arguments[l];
          var p = s < 3 && o[0] !== c && o[s - 1] !== c ? [] : kn(o, c);
          if (s -= p.length, s < e)
            return lf(
              n,
              t,
              $e,
              i.placeholder,
              f,
              o,
              p,
              f,
              f,
              e - s
            );
          var d = this && this !== Q && this instanceof i ? r : n;
          return ln(d, this, o);
        }
        return i;
      }
      function uf(n) {
        return function(t, e, r) {
          var i = G(t);
          if (!fn(t)) {
            var s = S(e, 3);
            t = V(t), e = function(l) {
              return s(i[l], l, i);
            };
          }
          var o = n(t, e, r);
          return o > -1 ? i[s ? t[o] : o] : f;
        };
      }
      function ff(n) {
        return Hn(function(t) {
          var e = t.length, r = e, i = xn.prototype.thru;
          for (n && t.reverse(); r--; ) {
            var s = t[r];
            if (typeof s != "function")
              throw new mn(U);
            if (i && !o && Xe(s) == "wrapper")
              var o = new xn([], !0);
          }
          for (r = o ? r : e; ++r < e; ) {
            s = t[r];
            var l = Xe(s), c = l == "wrapper" ? ri(s) : f;
            c && si(c[0]) && c[1] == (Fn | On | bn | Ut) && !c[4].length && c[9] == 1 ? o = o[Xe(c[0])].apply(o, c[3]) : o = s.length == 1 && si(s) ? o[l]() : o.thru(s);
          }
          return function() {
            var p = arguments, d = p[0];
            if (o && p.length == 1 && R(d))
              return o.plant(d).value();
            for (var v = 0, x = e ? t[v].apply(this, p) : d; ++v < e; )
              x = t[v].call(this, x);
            return x;
          };
        });
      }
      function $e(n, t, e, r, i, s, o, l, c, p) {
        var d = t & Fn, v = t & pn, x = t & ft, T = t & (On | wt), E = t & rr, I = x ? f : re(n);
        function A() {
          for (var O = arguments.length, M = h(O), gn = O; gn--; )
            M[gn] = arguments[gn];
          if (T)
            var rn = Bt(A), _n = Po(M, rn);
          if (r && (M = ju(M, r, i, T)), s && (M = nf(M, s, o, T)), O -= _n, T && O < p) {
            var Y = kn(M, rn);
            return lf(
              n,
              t,
              $e,
              A.placeholder,
              e,
              M,
              Y,
              l,
              c,
              p - O
            );
          }
          var Ln = v ? e : this, Yn = x ? Ln[n] : n;
          return O = M.length, l ? M = Ha(M, l) : E && O > 1 && M.reverse(), d && c < O && (M.length = c), this && this !== Q && this instanceof A && (Yn = I || re(Yn)), Yn.apply(Ln, M);
        }
        return A;
      }
      function sf(n, t) {
        return function(e, r) {
          return Vl(e, n, t(r), {});
        };
      }
      function He(n, t) {
        return function(e, r) {
          var i;
          if (e === f && r === f)
            return t;
          if (e !== f && (i = e), r !== f) {
            if (i === f)
              return r;
            typeof e == "string" || typeof r == "string" ? (e = cn(e), r = cn(r)) : (e = Xu(e), r = Xu(r)), i = n(e, r);
          }
          return i;
        };
      }
      function jr(n) {
        return Hn(function(t) {
          return t = H(t, an(S())), L(function(e) {
            var r = this;
            return n(t, function(i) {
              return ln(i, r, e);
            });
          });
        });
      }
      function qe(n, t) {
        t = t === f ? " " : cn(t);
        var e = t.length;
        if (e < 2)
          return e ? Yr(t, n) : t;
        var r = Yr(t, Le(n / yt(t)));
        return Rt(t) ? rt(Rn(r), 0, n).join("") : r.slice(0, n);
      }
      function Ea(n, t, e, r) {
        var i = t & pn, s = re(n);
        function o() {
          for (var l = -1, c = arguments.length, p = -1, d = r.length, v = h(d + c), x = this && this !== Q && this instanceof o ? s : n; ++p < d; )
            v[p] = r[p];
          for (; c--; )
            v[p++] = arguments[++l];
          return ln(x, i ? e : this, v);
        }
        return o;
      }
      function of(n) {
        return function(t, e, r) {
          return r && typeof r != "number" && en(t, e, r) && (e = r = f), t = Xn(t), e === f ? (e = t, t = 0) : e = Xn(e), r = r === f ? t < e ? 1 : -1 : Xn(r), oa(t, e, r, n);
        };
      }
      function Ke(n) {
        return function(t, e) {
          return typeof t == "string" && typeof e == "string" || (t = En(t), e = En(e)), n(t, e);
        };
      }
      function lf(n, t, e, r, i, s, o, l, c, p) {
        var d = t & On, v = d ? o : f, x = d ? f : o, T = d ? s : f, E = d ? f : s;
        t |= d ? bn : Tt, t &= ~(d ? Tt : bn), t & Ri || (t &= ~(pn | ft));
        var I = [
          n,
          t,
          i,
          T,
          v,
          E,
          x,
          l,
          c,
          p
        ], A = e.apply(f, I);
        return si(n) && Tf(A, I), A.placeholder = r, Sf(A, n, t);
      }
      function ni(n) {
        var t = z[n];
        return function(e, r) {
          if (e = En(e), r = r == null ? 0 : j(y(r), 292), r && Tu(e)) {
            var i = (F(e) + "e").split("e"), s = t(i[0] + "e" + (+i[1] + r));
            return i = (F(s) + "e").split("e"), +(i[0] + "e" + (+i[1] - r));
          }
          return t(e);
        };
      }
      var Aa = Ot && 1 / xe(new Ot([, -0]))[1] == st ? function(n) {
        return new Ot(n);
      } : Si;
      function af(n) {
        return function(t) {
          var e = nn(t);
          return e == An ? Or(t) : e == Cn ? $o(t) : Mo(t, n(t));
        };
      }
      function $n(n, t, e, r, i, s, o, l) {
        var c = t & ft;
        if (!c && typeof n != "function")
          throw new mn(U);
        var p = r ? r.length : 0;
        if (p || (t &= ~(bn | Tt), r = i = f), o = o === f ? o : Z(y(o), 0), l = l === f ? l : y(l), p -= i ? i.length : 0, t & Tt) {
          var d = r, v = i;
          r = i = f;
        }
        var x = c ? f : ri(n), T = [
          n,
          t,
          e,
          r,
          i,
          d,
          v,
          s,
          o,
          l
        ];
        if (x && Ga(T, x), n = T[0], t = T[1], e = T[2], r = T[3], i = T[4], l = T[9] = T[9] === f ? c ? 0 : n.length : Z(T[9] - p, 0), !l && t & (On | wt) && (t &= ~(On | wt)), !t || t == pn)
          var E = Ta(n, t, e);
        else
          t == On || t == wt ? E = Sa(n, t, l) : (t == bn || t == (pn | bn)) && !i.length ? E = Ea(n, t, e, r) : E = $e.apply(f, T);
        var I = x ? qu : Tf;
        return Sf(I(E, T), n, t);
      }
      function cf(n, t, e, r) {
        return n === f || In(n, Lt[e]) && !D.call(r, e) ? t : n;
      }
      function hf(n, t, e, r, i, s) {
        return q(n) && q(t) && (s.set(t, n), De(n, t, f, hf, s), s.delete(t)), n;
      }
      function Ca(n) {
        return fe(n) ? f : n;
      }
      function gf(n, t, e, r, i, s) {
        var o = e & xt, l = n.length, c = t.length;
        if (l != c && !(o && c > l))
          return !1;
        var p = s.get(n), d = s.get(t);
        if (p && d)
          return p == t && d == n;
        var v = -1, x = !0, T = e & oe ? new ct() : f;
        for (s.set(n, t), s.set(t, n); ++v < l; ) {
          var E = n[v], I = t[v];
          if (r)
            var A = o ? r(I, E, v, t, n, s) : r(E, I, v, n, t, s);
          if (A !== f) {
            if (A)
              continue;
            x = !1;
            break;
          }
          if (T) {
            if (!Ar(t, function(O, M) {
              if (!Yt(T, M) && (E === O || i(E, O, e, r, s)))
                return T.push(M);
            })) {
              x = !1;
              break;
            }
          } else if (!(E === I || i(E, I, e, r, s))) {
            x = !1;
            break;
          }
        }
        return s.delete(n), s.delete(t), x;
      }
      function Ra(n, t, e, r, i, s, o) {
        switch (e) {
          case Et:
            if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset)
              return !1;
            n = n.buffer, t = t.buffer;
          case Xt:
            return !(n.byteLength != t.byteLength || !s(new Ce(n), new Ce(t)));
          case Gt:
          case Nt:
          case $t:
            return In(+n, +t);
          case ce:
            return n.name == t.name && n.message == t.message;
          case Ht:
          case qt:
            return n == t + "";
          case An:
            var l = Or;
          case Cn:
            var c = r & xt;
            if (l || (l = xe), n.size != t.size && !c)
              return !1;
            var p = o.get(n);
            if (p)
              return p == t;
            r |= oe, o.set(n, t);
            var d = gf(l(n), l(t), r, i, s, o);
            return o.delete(n), d;
          case ge:
            if (Qt)
              return Qt.call(n) == Qt.call(t);
        }
        return !1;
      }
      function ya(n, t, e, r, i, s) {
        var o = e & xt, l = ti(n), c = l.length, p = ti(t), d = p.length;
        if (c != d && !o)
          return !1;
        for (var v = c; v--; ) {
          var x = l[v];
          if (!(o ? x in t : D.call(t, x)))
            return !1;
        }
        var T = s.get(n), E = s.get(t);
        if (T && E)
          return T == t && E == n;
        var I = !0;
        s.set(n, t), s.set(t, n);
        for (var A = o; ++v < c; ) {
          x = l[v];
          var O = n[x], M = t[x];
          if (r)
            var gn = o ? r(M, O, x, t, n, s) : r(O, M, x, n, t, s);
          if (!(gn === f ? O === M || i(O, M, e, r, s) : gn)) {
            I = !1;
            break;
          }
          A || (A = x == "constructor");
        }
        if (I && !A) {
          var rn = n.constructor, _n = t.constructor;
          rn != _n && "constructor" in n && "constructor" in t && !(typeof rn == "function" && rn instanceof rn && typeof _n == "function" && _n instanceof _n) && (I = !1);
        }
        return s.delete(n), s.delete(t), I;
      }
      function Hn(n) {
        return li(xf(n, f, If), n + "");
      }
      function ti(n) {
        return Wu(n, V, ui);
      }
      function ei(n) {
        return Wu(n, sn, _f);
      }
      var ri = be ? function(n) {
        return be.get(n);
      } : Si;
      function Xe(n) {
        for (var t = n.name + "", e = bt[t], r = D.call(bt, t) ? e.length : 0; r--; ) {
          var i = e[r], s = i.func;
          if (s == null || s == n)
            return i.name;
        }
        return t;
      }
      function Bt(n) {
        var t = D.call(u, "placeholder") ? u : n;
        return t.placeholder;
      }
      function S() {
        var n = u.iteratee || wi;
        return n = n === wi ? Bu : n, arguments.length ? n(arguments[0], arguments[1]) : n;
      }
      function Ye(n, t) {
        var e = n.__data__;
        return Ba(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
      }
      function ii(n) {
        for (var t = V(n), e = t.length; e--; ) {
          var r = t[e], i = n[r];
          t[e] = [r, i, vf(i)];
        }
        return t;
      }
      function _t(n, t) {
        var e = Uo(n, t);
        return Pu(e) ? e : f;
      }
      function Ia(n) {
        var t = D.call(n, lt), e = n[lt];
        try {
          n[lt] = f;
          var r = !0;
        } catch {
        }
        var i = Ee.call(n);
        return r && (t ? n[lt] = e : delete n[lt]), i;
      }
      var ui = Wr ? function(n) {
        return n == null ? [] : (n = G(n), Vn(Wr(n), function(t) {
          return xu.call(n, t);
        }));
      } : Ei, _f = Wr ? function(n) {
        for (var t = []; n; )
          Qn(t, ui(n)), n = Re(n);
        return t;
      } : Ei, nn = tn;
      (Mr && nn(new Mr(new ArrayBuffer(1))) != Et || Zt && nn(new Zt()) != An || Pr && nn(Pr.resolve()) != Li || Ot && nn(new Ot()) != Cn || Jt && nn(new Jt()) != Kt) && (nn = function(n) {
        var t = tn(n), e = t == Dn ? n.constructor : f, r = e ? pt(e) : "";
        if (r)
          switch (r) {
            case al:
              return Et;
            case cl:
              return An;
            case hl:
              return Li;
            case gl:
              return Cn;
            case _l:
              return Kt;
          }
        return t;
      });
      function La(n, t, e) {
        for (var r = -1, i = e.length; ++r < i; ) {
          var s = e[r], o = s.size;
          switch (s.type) {
            case "drop":
              n += o;
              break;
            case "dropRight":
              t -= o;
              break;
            case "take":
              t = j(t, n + o);
              break;
            case "takeRight":
              n = Z(n, t - o);
              break;
          }
        }
        return { start: n, end: t };
      }
      function Oa(n) {
        var t = n.match(Bs);
        return t ? t[1].split(Fs) : [];
      }
      function pf(n, t, e) {
        t = et(t, n);
        for (var r = -1, i = t.length, s = !1; ++r < i; ) {
          var o = Bn(t[r]);
          if (!(s = n != null && e(n, o)))
            break;
          n = n[o];
        }
        return s || ++r != i ? s : (i = n == null ? 0 : n.length, !!i && je(i) && qn(o, i) && (R(n) || dt(n)));
      }
      function ba(n) {
        var t = n.length, e = new n.constructor(t);
        return t && typeof n[0] == "string" && D.call(n, "index") && (e.index = n.index, e.input = n.input), e;
      }
      function df(n) {
        return typeof n.constructor == "function" && !ie(n) ? Wt(Re(n)) : {};
      }
      function Wa(n, t, e) {
        var r = n.constructor;
        switch (t) {
          case Xt:
            return kr(n);
          case Gt:
          case Nt:
            return new r(+n);
          case Et:
            return pa(n, e);
          case ir:
          case ur:
          case fr:
          case sr:
          case or:
          case lr:
          case ar:
          case cr:
          case hr:
            return Qu(n, e);
          case An:
            return new r();
          case $t:
          case qt:
            return new r(n);
          case Ht:
            return da(n);
          case Cn:
            return new r();
          case ge:
            return va(n);
        }
      }
      function Ma(n, t) {
        var e = t.length;
        if (!e)
          return n;
        var r = e - 1;
        return t[r] = (e > 1 ? "& " : "") + t[r], t = t.join(e > 2 ? ", " : " "), n.replace(Ps, `{
/* [wrapped with ` + t + `] */
`);
      }
      function Pa(n) {
        return R(n) || dt(n) || !!(wu && n && n[wu]);
      }
      function qn(n, t) {
        var e = typeof n;
        return t = t == null ? Jn : t, !!t && (e == "number" || e != "symbol" && Xs.test(n)) && n > -1 && n % 1 == 0 && n < t;
      }
      function en(n, t, e) {
        if (!q(e))
          return !1;
        var r = typeof t;
        return (r == "number" ? fn(e) && qn(t, e.length) : r == "string" && t in e) ? In(e[t], n) : !1;
      }
      function fi(n, t) {
        if (R(n))
          return !1;
        var e = typeof n;
        return e == "number" || e == "symbol" || e == "boolean" || n == null || hn(n) ? !0 : Os.test(n) || !Ls.test(n) || t != null && n in G(t);
      }
      function Ba(n) {
        var t = typeof n;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? n !== "__proto__" : n === null;
      }
      function si(n) {
        var t = Xe(n), e = u[t];
        if (typeof e != "function" || !(t in W.prototype))
          return !1;
        if (n === e)
          return !0;
        var r = ri(e);
        return !!r && n === r[0];
      }
      function Fa(n) {
        return !!du && du in n;
      }
      var Da = Te ? Kn : Ai;
      function ie(n) {
        var t = n && n.constructor, e = typeof t == "function" && t.prototype || Lt;
        return n === e;
      }
      function vf(n) {
        return n === n && !q(n);
      }
      function mf(n, t) {
        return function(e) {
          return e == null ? !1 : e[n] === t && (t !== f || n in G(e));
        };
      }
      function Ua(n) {
        var t = Qe(n, function(r) {
          return e.size === er && e.clear(), r;
        }), e = t.cache;
        return t;
      }
      function Ga(n, t) {
        var e = n[1], r = t[1], i = e | r, s = i < (pn | ft | Fn), o = r == Fn && e == On || r == Fn && e == Ut && n[7].length <= t[8] || r == (Fn | Ut) && t[7].length <= t[8] && e == On;
        if (!(s || o))
          return n;
        r & pn && (n[2] = t[2], i |= e & pn ? 0 : Ri);
        var l = t[3];
        if (l) {
          var c = n[3];
          n[3] = c ? ju(c, l, t[4]) : l, n[4] = c ? kn(n[3], se) : t[4];
        }
        return l = t[5], l && (c = n[5], n[5] = c ? nf(c, l, t[6]) : l, n[6] = c ? kn(n[5], se) : t[6]), l = t[7], l && (n[7] = l), r & Fn && (n[8] = n[8] == null ? t[8] : j(n[8], t[8])), n[9] == null && (n[9] = t[9]), n[0] = t[0], n[1] = i, n;
      }
      function Na(n) {
        var t = [];
        if (n != null)
          for (var e in G(n))
            t.push(e);
        return t;
      }
      function $a(n) {
        return Ee.call(n);
      }
      function xf(n, t, e) {
        return t = Z(t === f ? n.length - 1 : t, 0), function() {
          for (var r = arguments, i = -1, s = Z(r.length - t, 0), o = h(s); ++i < s; )
            o[i] = r[t + i];
          i = -1;
          for (var l = h(t + 1); ++i < t; )
            l[i] = r[i];
          return l[t] = e(o), ln(n, this, l);
        };
      }
      function wf(n, t) {
        return t.length < 2 ? n : gt(n, Tn(t, 0, -1));
      }
      function Ha(n, t) {
        for (var e = n.length, r = j(t.length, e), i = un(n); r--; ) {
          var s = t[r];
          n[r] = qn(s, e) ? i[s] : f;
        }
        return n;
      }
      function oi(n, t) {
        if (!(t === "constructor" && typeof n[t] == "function") && t != "__proto__")
          return n[t];
      }
      var Tf = Ef(qu), ue = rl || function(n, t) {
        return Q.setTimeout(n, t);
      }, li = Ef(ca);
      function Sf(n, t, e) {
        var r = t + "";
        return li(n, Ma(r, qa(Oa(r), e)));
      }
      function Ef(n) {
        var t = 0, e = 0;
        return function() {
          var r = sl(), i = ls - (r - e);
          if (e = r, i > 0) {
            if (++t >= os)
              return arguments[0];
          } else
            t = 0;
          return n.apply(f, arguments);
        };
      }
      function ze(n, t) {
        var e = -1, r = n.length, i = r - 1;
        for (t = t === f ? r : t; ++e < t; ) {
          var s = Xr(e, i), o = n[s];
          n[s] = n[e], n[e] = o;
        }
        return n.length = t, n;
      }
      var Af = Ua(function(n) {
        var t = [];
        return n.charCodeAt(0) === 46 && t.push(""), n.replace(bs, function(e, r, i, s) {
          t.push(i ? s.replace(Gs, "$1") : r || e);
        }), t;
      });
      function Bn(n) {
        if (typeof n == "string" || hn(n))
          return n;
        var t = n + "";
        return t == "0" && 1 / n == -st ? "-0" : t;
      }
      function pt(n) {
        if (n != null) {
          try {
            return Se.call(n);
          } catch {
          }
          try {
            return n + "";
          } catch {
          }
        }
        return "";
      }
      function qa(n, t) {
        return vn(ps, function(e) {
          var r = "_." + e[0];
          t & e[1] && !ve(n, r) && n.push(r);
        }), n.sort();
      }
      function Cf(n) {
        if (n instanceof W)
          return n.clone();
        var t = new xn(n.__wrapped__, n.__chain__);
        return t.__actions__ = un(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t;
      }
      function Ka(n, t, e) {
        (e ? en(n, t, e) : t === f) ? t = 1 : t = Z(y(t), 0);
        var r = n == null ? 0 : n.length;
        if (!r || t < 1)
          return [];
        for (var i = 0, s = 0, o = h(Le(r / t)); i < r; )
          o[s++] = Tn(n, i, i += t);
        return o;
      }
      function Xa(n) {
        for (var t = -1, e = n == null ? 0 : n.length, r = 0, i = []; ++t < e; ) {
          var s = n[t];
          s && (i[r++] = s);
        }
        return i;
      }
      function Ya() {
        var n = arguments.length;
        if (!n)
          return [];
        for (var t = h(n - 1), e = arguments[0], r = n; r--; )
          t[r - 1] = arguments[r];
        return Qn(R(e) ? un(e) : [e], k(t, 1));
      }
      var za = L(function(n, t) {
        return X(n) ? jt(n, k(t, 1, X, !0)) : [];
      }), Za = L(function(n, t) {
        var e = Sn(t);
        return X(e) && (e = f), X(n) ? jt(n, k(t, 1, X, !0), S(e, 2)) : [];
      }), Ja = L(function(n, t) {
        var e = Sn(t);
        return X(e) && (e = f), X(n) ? jt(n, k(t, 1, X, !0), f, e) : [];
      });
      function Va(n, t, e) {
        var r = n == null ? 0 : n.length;
        return r ? (t = e || t === f ? 1 : y(t), Tn(n, t < 0 ? 0 : t, r)) : [];
      }
      function Qa(n, t, e) {
        var r = n == null ? 0 : n.length;
        return r ? (t = e || t === f ? 1 : y(t), t = r - t, Tn(n, 0, t < 0 ? 0 : t)) : [];
      }
      function ka(n, t) {
        return n && n.length ? Ge(n, S(t, 3), !0, !0) : [];
      }
      function ja(n, t) {
        return n && n.length ? Ge(n, S(t, 3), !0) : [];
      }
      function nc(n, t, e, r) {
        var i = n == null ? 0 : n.length;
        return i ? (e && typeof e != "number" && en(n, t, e) && (e = 0, r = i), Yl(n, t, e, r)) : [];
      }
      function Rf(n, t, e) {
        var r = n == null ? 0 : n.length;
        if (!r)
          return -1;
        var i = e == null ? 0 : y(e);
        return i < 0 && (i = Z(r + i, 0)), me(n, S(t, 3), i);
      }
      function yf(n, t, e) {
        var r = n == null ? 0 : n.length;
        if (!r)
          return -1;
        var i = r - 1;
        return e !== f && (i = y(e), i = e < 0 ? Z(r + i, 0) : j(i, r - 1)), me(n, S(t, 3), i, !0);
      }
      function If(n) {
        var t = n == null ? 0 : n.length;
        return t ? k(n, 1) : [];
      }
      function tc(n) {
        var t = n == null ? 0 : n.length;
        return t ? k(n, st) : [];
      }
      function ec(n, t) {
        var e = n == null ? 0 : n.length;
        return e ? (t = t === f ? 1 : y(t), k(n, t)) : [];
      }
      function rc(n) {
        for (var t = -1, e = n == null ? 0 : n.length, r = {}; ++t < e; ) {
          var i = n[t];
          r[i[0]] = i[1];
        }
        return r;
      }
      function Lf(n) {
        return n && n.length ? n[0] : f;
      }
      function ic(n, t, e) {
        var r = n == null ? 0 : n.length;
        if (!r)
          return -1;
        var i = e == null ? 0 : y(e);
        return i < 0 && (i = Z(r + i, 0)), Ct(n, t, i);
      }
      function uc(n) {
        var t = n == null ? 0 : n.length;
        return t ? Tn(n, 0, -1) : [];
      }
      var fc = L(function(n) {
        var t = H(n, Vr);
        return t.length && t[0] === n[0] ? Nr(t) : [];
      }), sc = L(function(n) {
        var t = Sn(n), e = H(n, Vr);
        return t === Sn(e) ? t = f : e.pop(), e.length && e[0] === n[0] ? Nr(e, S(t, 2)) : [];
      }), oc = L(function(n) {
        var t = Sn(n), e = H(n, Vr);
        return t = typeof t == "function" ? t : f, t && e.pop(), e.length && e[0] === n[0] ? Nr(e, f, t) : [];
      });
      function lc(n, t) {
        return n == null ? "" : ul.call(n, t);
      }
      function Sn(n) {
        var t = n == null ? 0 : n.length;
        return t ? n[t - 1] : f;
      }
      function ac(n, t, e) {
        var r = n == null ? 0 : n.length;
        if (!r)
          return -1;
        var i = r;
        return e !== f && (i = y(e), i = i < 0 ? Z(r + i, 0) : j(i, r - 1)), t === t ? qo(n, t, i) : me(n, ou, i, !0);
      }
      function cc(n, t) {
        return n && n.length ? Gu(n, y(t)) : f;
      }
      var hc = L(Of);
      function Of(n, t) {
        return n && n.length && t && t.length ? Kr(n, t) : n;
      }
      function gc(n, t, e) {
        return n && n.length && t && t.length ? Kr(n, t, S(e, 2)) : n;
      }
      function _c(n, t, e) {
        return n && n.length && t && t.length ? Kr(n, t, f, e) : n;
      }
      var pc = Hn(function(n, t) {
        var e = n == null ? 0 : n.length, r = Fr(n, t);
        return Hu(n, H(t, function(i) {
          return qn(i, e) ? +i : i;
        }).sort(ku)), r;
      });
      function dc(n, t) {
        var e = [];
        if (!(n && n.length))
          return e;
        var r = -1, i = [], s = n.length;
        for (t = S(t, 3); ++r < s; ) {
          var o = n[r];
          t(o, r, n) && (e.push(o), i.push(r));
        }
        return Hu(n, i), e;
      }
      function ai(n) {
        return n == null ? n : ll.call(n);
      }
      function vc(n, t, e) {
        var r = n == null ? 0 : n.length;
        return r ? (e && typeof e != "number" && en(n, t, e) ? (t = 0, e = r) : (t = t == null ? 0 : y(t), e = e === f ? r : y(e)), Tn(n, t, e)) : [];
      }
      function mc(n, t) {
        return Ue(n, t);
      }
      function xc(n, t, e) {
        return zr(n, t, S(e, 2));
      }
      function wc(n, t) {
        var e = n == null ? 0 : n.length;
        if (e) {
          var r = Ue(n, t);
          if (r < e && In(n[r], t))
            return r;
        }
        return -1;
      }
      function Tc(n, t) {
        return Ue(n, t, !0);
      }
      function Sc(n, t, e) {
        return zr(n, t, S(e, 2), !0);
      }
      function Ec(n, t) {
        var e = n == null ? 0 : n.length;
        if (e) {
          var r = Ue(n, t, !0) - 1;
          if (In(n[r], t))
            return r;
        }
        return -1;
      }
      function Ac(n) {
        return n && n.length ? Ku(n) : [];
      }
      function Cc(n, t) {
        return n && n.length ? Ku(n, S(t, 2)) : [];
      }
      function Rc(n) {
        var t = n == null ? 0 : n.length;
        return t ? Tn(n, 1, t) : [];
      }
      function yc(n, t, e) {
        return n && n.length ? (t = e || t === f ? 1 : y(t), Tn(n, 0, t < 0 ? 0 : t)) : [];
      }
      function Ic(n, t, e) {
        var r = n == null ? 0 : n.length;
        return r ? (t = e || t === f ? 1 : y(t), t = r - t, Tn(n, t < 0 ? 0 : t, r)) : [];
      }
      function Lc(n, t) {
        return n && n.length ? Ge(n, S(t, 3), !1, !0) : [];
      }
      function Oc(n, t) {
        return n && n.length ? Ge(n, S(t, 3)) : [];
      }
      var bc = L(function(n) {
        return tt(k(n, 1, X, !0));
      }), Wc = L(function(n) {
        var t = Sn(n);
        return X(t) && (t = f), tt(k(n, 1, X, !0), S(t, 2));
      }), Mc = L(function(n) {
        var t = Sn(n);
        return t = typeof t == "function" ? t : f, tt(k(n, 1, X, !0), f, t);
      });
      function Pc(n) {
        return n && n.length ? tt(n) : [];
      }
      function Bc(n, t) {
        return n && n.length ? tt(n, S(t, 2)) : [];
      }
      function Fc(n, t) {
        return t = typeof t == "function" ? t : f, n && n.length ? tt(n, f, t) : [];
      }
      function ci(n) {
        if (!(n && n.length))
          return [];
        var t = 0;
        return n = Vn(n, function(e) {
          if (X(e))
            return t = Z(e.length, t), !0;
        }), Ir(t, function(e) {
          return H(n, Cr(e));
        });
      }
      function bf(n, t) {
        if (!(n && n.length))
          return [];
        var e = ci(n);
        return t == null ? e : H(e, function(r) {
          return ln(t, f, r);
        });
      }
      var Dc = L(function(n, t) {
        return X(n) ? jt(n, t) : [];
      }), Uc = L(function(n) {
        return Jr(Vn(n, X));
      }), Gc = L(function(n) {
        var t = Sn(n);
        return X(t) && (t = f), Jr(Vn(n, X), S(t, 2));
      }), Nc = L(function(n) {
        var t = Sn(n);
        return t = typeof t == "function" ? t : f, Jr(Vn(n, X), f, t);
      }), $c = L(ci);
      function Hc(n, t) {
        return Zu(n || [], t || [], kt);
      }
      function qc(n, t) {
        return Zu(n || [], t || [], ee);
      }
      var Kc = L(function(n) {
        var t = n.length, e = t > 1 ? n[t - 1] : f;
        return e = typeof e == "function" ? (n.pop(), e) : f, bf(n, e);
      });
      function Wf(n) {
        var t = u(n);
        return t.__chain__ = !0, t;
      }
      function Xc(n, t) {
        return t(n), n;
      }
      function Ze(n, t) {
        return t(n);
      }
      var Yc = Hn(function(n) {
        var t = n.length, e = t ? n[0] : 0, r = this.__wrapped__, i = function(s) {
          return Fr(s, n);
        };
        return t > 1 || this.__actions__.length || !(r instanceof W) || !qn(e) ? this.thru(i) : (r = r.slice(e, +e + (t ? 1 : 0)), r.__actions__.push({
          func: Ze,
          args: [i],
          thisArg: f
        }), new xn(r, this.__chain__).thru(function(s) {
          return t && !s.length && s.push(f), s;
        }));
      });
      function zc() {
        return Wf(this);
      }
      function Zc() {
        return new xn(this.value(), this.__chain__);
      }
      function Jc() {
        this.__values__ === f && (this.__values__ = Yf(this.value()));
        var n = this.__index__ >= this.__values__.length, t = n ? f : this.__values__[this.__index__++];
        return { done: n, value: t };
      }
      function Vc() {
        return this;
      }
      function Qc(n) {
        for (var t, e = this; e instanceof Me; ) {
          var r = Cf(e);
          r.__index__ = 0, r.__values__ = f, t ? i.__wrapped__ = r : t = r;
          var i = r;
          e = e.__wrapped__;
        }
        return i.__wrapped__ = n, t;
      }
      function kc() {
        var n = this.__wrapped__;
        if (n instanceof W) {
          var t = n;
          return this.__actions__.length && (t = new W(this)), t = t.reverse(), t.__actions__.push({
            func: Ze,
            args: [ai],
            thisArg: f
          }), new xn(t, this.__chain__);
        }
        return this.thru(ai);
      }
      function jc() {
        return zu(this.__wrapped__, this.__actions__);
      }
      var nh = Ne(function(n, t, e) {
        D.call(n, e) ? ++n[e] : Nn(n, e, 1);
      });
      function th(n, t, e) {
        var r = R(n) ? fu : Xl;
        return e && en(n, t, e) && (t = f), r(n, S(t, 3));
      }
      function eh(n, t) {
        var e = R(n) ? Vn : Ou;
        return e(n, S(t, 3));
      }
      var rh = uf(Rf), ih = uf(yf);
      function uh(n, t) {
        return k(Je(n, t), 1);
      }
      function fh(n, t) {
        return k(Je(n, t), st);
      }
      function sh(n, t, e) {
        return e = e === f ? 1 : y(e), k(Je(n, t), e);
      }
      function Mf(n, t) {
        var e = R(n) ? vn : nt;
        return e(n, S(t, 3));
      }
      function Pf(n, t) {
        var e = R(n) ? Ro : Lu;
        return e(n, S(t, 3));
      }
      var oh = Ne(function(n, t, e) {
        D.call(n, e) ? n[e].push(t) : Nn(n, e, [t]);
      });
      function lh(n, t, e, r) {
        n = fn(n) ? n : Dt(n), e = e && !r ? y(e) : 0;
        var i = n.length;
        return e < 0 && (e = Z(i + e, 0)), nr(n) ? e <= i && n.indexOf(t, e) > -1 : !!i && Ct(n, t, e) > -1;
      }
      var ah = L(function(n, t, e) {
        var r = -1, i = typeof t == "function", s = fn(n) ? h(n.length) : [];
        return nt(n, function(o) {
          s[++r] = i ? ln(t, o, e) : ne(o, t, e);
        }), s;
      }), ch = Ne(function(n, t, e) {
        Nn(n, e, t);
      });
      function Je(n, t) {
        var e = R(n) ? H : Fu;
        return e(n, S(t, 3));
      }
      function hh(n, t, e, r) {
        return n == null ? [] : (R(t) || (t = t == null ? [] : [t]), e = r ? f : e, R(e) || (e = e == null ? [] : [e]), Nu(n, t, e));
      }
      var gh = Ne(function(n, t, e) {
        n[e ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function _h(n, t, e) {
        var r = R(n) ? Er : au, i = arguments.length < 3;
        return r(n, S(t, 4), e, i, nt);
      }
      function ph(n, t, e) {
        var r = R(n) ? yo : au, i = arguments.length < 3;
        return r(n, S(t, 4), e, i, Lu);
      }
      function dh(n, t) {
        var e = R(n) ? Vn : Ou;
        return e(n, ke(S(t, 3)));
      }
      function vh(n) {
        var t = R(n) ? Cu : la;
        return t(n);
      }
      function mh(n, t, e) {
        (e ? en(n, t, e) : t === f) ? t = 1 : t = y(t);
        var r = R(n) ? Nl : aa;
        return r(n, t);
      }
      function xh(n) {
        var t = R(n) ? $l : ha;
        return t(n);
      }
      function wh(n) {
        if (n == null)
          return 0;
        if (fn(n))
          return nr(n) ? yt(n) : n.length;
        var t = nn(n);
        return t == An || t == Cn ? n.size : Hr(n).length;
      }
      function Th(n, t, e) {
        var r = R(n) ? Ar : ga;
        return e && en(n, t, e) && (t = f), r(n, S(t, 3));
      }
      var Sh = L(function(n, t) {
        if (n == null)
          return [];
        var e = t.length;
        return e > 1 && en(n, t[0], t[1]) ? t = [] : e > 2 && en(t[0], t[1], t[2]) && (t = [t[0]]), Nu(n, k(t, 1), []);
      }), Ve = el || function() {
        return Q.Date.now();
      };
      function Eh(n, t) {
        if (typeof t != "function")
          throw new mn(U);
        return n = y(n), function() {
          if (--n < 1)
            return t.apply(this, arguments);
        };
      }
      function Bf(n, t, e) {
        return t = e ? f : t, t = n && t == null ? n.length : t, $n(n, Fn, f, f, f, f, t);
      }
      function Ff(n, t) {
        var e;
        if (typeof t != "function")
          throw new mn(U);
        return n = y(n), function() {
          return --n > 0 && (e = t.apply(this, arguments)), n <= 1 && (t = f), e;
        };
      }
      var hi = L(function(n, t, e) {
        var r = pn;
        if (e.length) {
          var i = kn(e, Bt(hi));
          r |= bn;
        }
        return $n(n, r, t, e, i);
      }), Df = L(function(n, t, e) {
        var r = pn | ft;
        if (e.length) {
          var i = kn(e, Bt(Df));
          r |= bn;
        }
        return $n(t, r, n, e, i);
      });
      function Uf(n, t, e) {
        t = e ? f : t;
        var r = $n(n, On, f, f, f, f, f, t);
        return r.placeholder = Uf.placeholder, r;
      }
      function Gf(n, t, e) {
        t = e ? f : t;
        var r = $n(n, wt, f, f, f, f, f, t);
        return r.placeholder = Gf.placeholder, r;
      }
      function Nf(n, t, e) {
        var r, i, s, o, l, c, p = 0, d = !1, v = !1, x = !0;
        if (typeof n != "function")
          throw new mn(U);
        t = En(t) || 0, q(e) && (d = !!e.leading, v = "maxWait" in e, s = v ? Z(En(e.maxWait) || 0, t) : s, x = "trailing" in e ? !!e.trailing : x);
        function T(Y) {
          var Ln = r, Yn = i;
          return r = i = f, p = Y, o = n.apply(Yn, Ln), o;
        }
        function E(Y) {
          return p = Y, l = ue(O, t), d ? T(Y) : o;
        }
        function I(Y) {
          var Ln = Y - c, Yn = Y - p, us = t - Ln;
          return v ? j(us, s - Yn) : us;
        }
        function A(Y) {
          var Ln = Y - c, Yn = Y - p;
          return c === f || Ln >= t || Ln < 0 || v && Yn >= s;
        }
        function O() {
          var Y = Ve();
          if (A(Y))
            return M(Y);
          l = ue(O, I(Y));
        }
        function M(Y) {
          return l = f, x && r ? T(Y) : (r = i = f, o);
        }
        function gn() {
          l !== f && Ju(l), p = 0, r = c = i = l = f;
        }
        function rn() {
          return l === f ? o : M(Ve());
        }
        function _n() {
          var Y = Ve(), Ln = A(Y);
          if (r = arguments, i = this, c = Y, Ln) {
            if (l === f)
              return E(c);
            if (v)
              return Ju(l), l = ue(O, t), T(c);
          }
          return l === f && (l = ue(O, t)), o;
        }
        return _n.cancel = gn, _n.flush = rn, _n;
      }
      var Ah = L(function(n, t) {
        return Iu(n, 1, t);
      }), Ch = L(function(n, t, e) {
        return Iu(n, En(t) || 0, e);
      });
      function Rh(n) {
        return $n(n, rr);
      }
      function Qe(n, t) {
        if (typeof n != "function" || t != null && typeof t != "function")
          throw new mn(U);
        var e = function() {
          var r = arguments, i = t ? t.apply(this, r) : r[0], s = e.cache;
          if (s.has(i))
            return s.get(i);
          var o = n.apply(this, r);
          return e.cache = s.set(i, o) || s, o;
        };
        return e.cache = new (Qe.Cache || Gn)(), e;
      }
      Qe.Cache = Gn;
      function ke(n) {
        if (typeof n != "function")
          throw new mn(U);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !n.call(this);
            case 1:
              return !n.call(this, t[0]);
            case 2:
              return !n.call(this, t[0], t[1]);
            case 3:
              return !n.call(this, t[0], t[1], t[2]);
          }
          return !n.apply(this, t);
        };
      }
      function yh(n) {
        return Ff(2, n);
      }
      var Ih = _a(function(n, t) {
        t = t.length == 1 && R(t[0]) ? H(t[0], an(S())) : H(k(t, 1), an(S()));
        var e = t.length;
        return L(function(r) {
          for (var i = -1, s = j(r.length, e); ++i < s; )
            r[i] = t[i].call(this, r[i]);
          return ln(n, this, r);
        });
      }), gi = L(function(n, t) {
        var e = kn(t, Bt(gi));
        return $n(n, bn, f, t, e);
      }), $f = L(function(n, t) {
        var e = kn(t, Bt($f));
        return $n(n, Tt, f, t, e);
      }), Lh = Hn(function(n, t) {
        return $n(n, Ut, f, f, f, t);
      });
      function Oh(n, t) {
        if (typeof n != "function")
          throw new mn(U);
        return t = t === f ? t : y(t), L(n, t);
      }
      function bh(n, t) {
        if (typeof n != "function")
          throw new mn(U);
        return t = t == null ? 0 : Z(y(t), 0), L(function(e) {
          var r = e[t], i = rt(e, 0, t);
          return r && Qn(i, r), ln(n, this, i);
        });
      }
      function Wh(n, t, e) {
        var r = !0, i = !0;
        if (typeof n != "function")
          throw new mn(U);
        return q(e) && (r = "leading" in e ? !!e.leading : r, i = "trailing" in e ? !!e.trailing : i), Nf(n, t, {
          leading: r,
          maxWait: t,
          trailing: i
        });
      }
      function Mh(n) {
        return Bf(n, 1);
      }
      function Ph(n, t) {
        return gi(Qr(t), n);
      }
      function Bh() {
        if (!arguments.length)
          return [];
        var n = arguments[0];
        return R(n) ? n : [n];
      }
      function Fh(n) {
        return wn(n, mt);
      }
      function Dh(n, t) {
        return t = typeof t == "function" ? t : f, wn(n, mt, t);
      }
      function Uh(n) {
        return wn(n, Zn | mt);
      }
      function Gh(n, t) {
        return t = typeof t == "function" ? t : f, wn(n, Zn | mt, t);
      }
      function Nh(n, t) {
        return t == null || yu(n, t, V(t));
      }
      function In(n, t) {
        return n === t || n !== n && t !== t;
      }
      var $h = Ke(Gr), Hh = Ke(function(n, t) {
        return n >= t;
      }), dt = Mu(function() {
        return arguments;
      }()) ? Mu : function(n) {
        return K(n) && D.call(n, "callee") && !xu.call(n, "callee");
      }, R = h.isArray, qh = nu ? an(nu) : Ql;
      function fn(n) {
        return n != null && je(n.length) && !Kn(n);
      }
      function X(n) {
        return K(n) && fn(n);
      }
      function Kh(n) {
        return n === !0 || n === !1 || K(n) && tn(n) == Gt;
      }
      var it = il || Ai, Xh = tu ? an(tu) : kl;
      function Yh(n) {
        return K(n) && n.nodeType === 1 && !fe(n);
      }
      function zh(n) {
        if (n == null)
          return !0;
        if (fn(n) && (R(n) || typeof n == "string" || typeof n.splice == "function" || it(n) || Ft(n) || dt(n)))
          return !n.length;
        var t = nn(n);
        if (t == An || t == Cn)
          return !n.size;
        if (ie(n))
          return !Hr(n).length;
        for (var e in n)
          if (D.call(n, e))
            return !1;
        return !0;
      }
      function Zh(n, t) {
        return te(n, t);
      }
      function Jh(n, t, e) {
        e = typeof e == "function" ? e : f;
        var r = e ? e(n, t) : f;
        return r === f ? te(n, t, f, e) : !!r;
      }
      function _i(n) {
        if (!K(n))
          return !1;
        var t = tn(n);
        return t == ce || t == vs || typeof n.message == "string" && typeof n.name == "string" && !fe(n);
      }
      function Vh(n) {
        return typeof n == "number" && Tu(n);
      }
      function Kn(n) {
        if (!q(n))
          return !1;
        var t = tn(n);
        return t == he || t == Ii || t == ds || t == xs;
      }
      function Hf(n) {
        return typeof n == "number" && n == y(n);
      }
      function je(n) {
        return typeof n == "number" && n > -1 && n % 1 == 0 && n <= Jn;
      }
      function q(n) {
        var t = typeof n;
        return n != null && (t == "object" || t == "function");
      }
      function K(n) {
        return n != null && typeof n == "object";
      }
      var qf = eu ? an(eu) : na;
      function Qh(n, t) {
        return n === t || $r(n, t, ii(t));
      }
      function kh(n, t, e) {
        return e = typeof e == "function" ? e : f, $r(n, t, ii(t), e);
      }
      function jh(n) {
        return Kf(n) && n != +n;
      }
      function ng(n) {
        if (Da(n))
          throw new C(J);
        return Pu(n);
      }
      function tg(n) {
        return n === null;
      }
      function eg(n) {
        return n == null;
      }
      function Kf(n) {
        return typeof n == "number" || K(n) && tn(n) == $t;
      }
      function fe(n) {
        if (!K(n) || tn(n) != Dn)
          return !1;
        var t = Re(n);
        if (t === null)
          return !0;
        var e = D.call(t, "constructor") && t.constructor;
        return typeof e == "function" && e instanceof e && Se.call(e) == ko;
      }
      var pi = ru ? an(ru) : ta;
      function rg(n) {
        return Hf(n) && n >= -Jn && n <= Jn;
      }
      var Xf = iu ? an(iu) : ea;
      function nr(n) {
        return typeof n == "string" || !R(n) && K(n) && tn(n) == qt;
      }
      function hn(n) {
        return typeof n == "symbol" || K(n) && tn(n) == ge;
      }
      var Ft = uu ? an(uu) : ra;
      function ig(n) {
        return n === f;
      }
      function ug(n) {
        return K(n) && nn(n) == Kt;
      }
      function fg(n) {
        return K(n) && tn(n) == Ts;
      }
      var sg = Ke(qr), og = Ke(function(n, t) {
        return n <= t;
      });
      function Yf(n) {
        if (!n)
          return [];
        if (fn(n))
          return nr(n) ? Rn(n) : un(n);
        if (zt && n[zt])
          return No(n[zt]());
        var t = nn(n), e = t == An ? Or : t == Cn ? xe : Dt;
        return e(n);
      }
      function Xn(n) {
        if (!n)
          return n === 0 ? n : 0;
        if (n = En(n), n === st || n === -st) {
          var t = n < 0 ? -1 : 1;
          return t * hs;
        }
        return n === n ? n : 0;
      }
      function y(n) {
        var t = Xn(n), e = t % 1;
        return t === t ? e ? t - e : t : 0;
      }
      function zf(n) {
        return n ? ht(y(n), 0, Wn) : 0;
      }
      function En(n) {
        if (typeof n == "number")
          return n;
        if (hn(n))
          return le;
        if (q(n)) {
          var t = typeof n.valueOf == "function" ? n.valueOf() : n;
          n = q(t) ? t + "" : t;
        }
        if (typeof n != "string")
          return n === 0 ? n : +n;
        n = cu(n);
        var e = Hs.test(n);
        return e || Ks.test(n) ? Eo(n.slice(2), e ? 2 : 8) : $s.test(n) ? le : +n;
      }
      function Zf(n) {
        return Pn(n, sn(n));
      }
      function lg(n) {
        return n ? ht(y(n), -Jn, Jn) : n === 0 ? n : 0;
      }
      function F(n) {
        return n == null ? "" : cn(n);
      }
      var ag = Mt(function(n, t) {
        if (ie(t) || fn(t)) {
          Pn(t, V(t), n);
          return;
        }
        for (var e in t)
          D.call(t, e) && kt(n, e, t[e]);
      }), Jf = Mt(function(n, t) {
        Pn(t, sn(t), n);
      }), tr = Mt(function(n, t, e, r) {
        Pn(t, sn(t), n, r);
      }), cg = Mt(function(n, t, e, r) {
        Pn(t, V(t), n, r);
      }), hg = Hn(Fr);
      function gg(n, t) {
        var e = Wt(n);
        return t == null ? e : Ru(e, t);
      }
      var _g = L(function(n, t) {
        n = G(n);
        var e = -1, r = t.length, i = r > 2 ? t[2] : f;
        for (i && en(t[0], t[1], i) && (r = 1); ++e < r; )
          for (var s = t[e], o = sn(s), l = -1, c = o.length; ++l < c; ) {
            var p = o[l], d = n[p];
            (d === f || In(d, Lt[p]) && !D.call(n, p)) && (n[p] = s[p]);
          }
        return n;
      }), pg = L(function(n) {
        return n.push(f, hf), ln(Vf, f, n);
      });
      function dg(n, t) {
        return su(n, S(t, 3), Mn);
      }
      function vg(n, t) {
        return su(n, S(t, 3), Ur);
      }
      function mg(n, t) {
        return n == null ? n : Dr(n, S(t, 3), sn);
      }
      function xg(n, t) {
        return n == null ? n : bu(n, S(t, 3), sn);
      }
      function wg(n, t) {
        return n && Mn(n, S(t, 3));
      }
      function Tg(n, t) {
        return n && Ur(n, S(t, 3));
      }
      function Sg(n) {
        return n == null ? [] : Fe(n, V(n));
      }
      function Eg(n) {
        return n == null ? [] : Fe(n, sn(n));
      }
      function di(n, t, e) {
        var r = n == null ? f : gt(n, t);
        return r === f ? e : r;
      }
      function Ag(n, t) {
        return n != null && pf(n, t, zl);
      }
      function vi(n, t) {
        return n != null && pf(n, t, Zl);
      }
      var Cg = sf(function(n, t, e) {
        t != null && typeof t.toString != "function" && (t = Ee.call(t)), n[t] = e;
      }, xi(on)), Rg = sf(function(n, t, e) {
        t != null && typeof t.toString != "function" && (t = Ee.call(t)), D.call(n, t) ? n[t].push(e) : n[t] = [e];
      }, S), yg = L(ne);
      function V(n) {
        return fn(n) ? Au(n) : Hr(n);
      }
      function sn(n) {
        return fn(n) ? Au(n, !0) : ia(n);
      }
      function Ig(n, t) {
        var e = {};
        return t = S(t, 3), Mn(n, function(r, i, s) {
          Nn(e, t(r, i, s), r);
        }), e;
      }
      function Lg(n, t) {
        var e = {};
        return t = S(t, 3), Mn(n, function(r, i, s) {
          Nn(e, i, t(r, i, s));
        }), e;
      }
      var Og = Mt(function(n, t, e) {
        De(n, t, e);
      }), Vf = Mt(function(n, t, e, r) {
        De(n, t, e, r);
      }), bg = Hn(function(n, t) {
        var e = {};
        if (n == null)
          return e;
        var r = !1;
        t = H(t, function(s) {
          return s = et(s, n), r || (r = s.length > 1), s;
        }), Pn(n, ei(n), e), r && (e = wn(e, Zn | Ci | mt, Ca));
        for (var i = t.length; i--; )
          Zr(e, t[i]);
        return e;
      });
      function Wg(n, t) {
        return Qf(n, ke(S(t)));
      }
      var Mg = Hn(function(n, t) {
        return n == null ? {} : fa(n, t);
      });
      function Qf(n, t) {
        if (n == null)
          return {};
        var e = H(ei(n), function(r) {
          return [r];
        });
        return t = S(t), $u(n, e, function(r, i) {
          return t(r, i[0]);
        });
      }
      function Pg(n, t, e) {
        t = et(t, n);
        var r = -1, i = t.length;
        for (i || (i = 1, n = f); ++r < i; ) {
          var s = n == null ? f : n[Bn(t[r])];
          s === f && (r = i, s = e), n = Kn(s) ? s.call(n) : s;
        }
        return n;
      }
      function Bg(n, t, e) {
        return n == null ? n : ee(n, t, e);
      }
      function Fg(n, t, e, r) {
        return r = typeof r == "function" ? r : f, n == null ? n : ee(n, t, e, r);
      }
      var kf = af(V), jf = af(sn);
      function Dg(n, t, e) {
        var r = R(n), i = r || it(n) || Ft(n);
        if (t = S(t, 4), e == null) {
          var s = n && n.constructor;
          i ? e = r ? new s() : [] : q(n) ? e = Kn(s) ? Wt(Re(n)) : {} : e = {};
        }
        return (i ? vn : Mn)(n, function(o, l, c) {
          return t(e, o, l, c);
        }), e;
      }
      function Ug(n, t) {
        return n == null ? !0 : Zr(n, t);
      }
      function Gg(n, t, e) {
        return n == null ? n : Yu(n, t, Qr(e));
      }
      function Ng(n, t, e, r) {
        return r = typeof r == "function" ? r : f, n == null ? n : Yu(n, t, Qr(e), r);
      }
      function Dt(n) {
        return n == null ? [] : Lr(n, V(n));
      }
      function $g(n) {
        return n == null ? [] : Lr(n, sn(n));
      }
      function Hg(n, t, e) {
        return e === f && (e = t, t = f), e !== f && (e = En(e), e = e === e ? e : 0), t !== f && (t = En(t), t = t === t ? t : 0), ht(En(n), t, e);
      }
      function qg(n, t, e) {
        return t = Xn(t), e === f ? (e = t, t = 0) : e = Xn(e), n = En(n), Jl(n, t, e);
      }
      function Kg(n, t, e) {
        if (e && typeof e != "boolean" && en(n, t, e) && (t = e = f), e === f && (typeof t == "boolean" ? (e = t, t = f) : typeof n == "boolean" && (e = n, n = f)), n === f && t === f ? (n = 0, t = 1) : (n = Xn(n), t === f ? (t = n, n = 0) : t = Xn(t)), n > t) {
          var r = n;
          n = t, t = r;
        }
        if (e || n % 1 || t % 1) {
          var i = Su();
          return j(n + i * (t - n + So("1e-" + ((i + "").length - 1))), t);
        }
        return Xr(n, t);
      }
      var Xg = Pt(function(n, t, e) {
        return t = t.toLowerCase(), n + (e ? ns(t) : t);
      });
      function ns(n) {
        return mi(F(n).toLowerCase());
      }
      function ts(n) {
        return n = F(n), n && n.replace(Ys, Bo).replace(co, "");
      }
      function Yg(n, t, e) {
        n = F(n), t = cn(t);
        var r = n.length;
        e = e === f ? r : ht(y(e), 0, r);
        var i = e;
        return e -= t.length, e >= 0 && n.slice(e, i) == t;
      }
      function zg(n) {
        return n = F(n), n && Rs.test(n) ? n.replace(bi, Fo) : n;
      }
      function Zg(n) {
        return n = F(n), n && Ws.test(n) ? n.replace(gr, "\\$&") : n;
      }
      var Jg = Pt(function(n, t, e) {
        return n + (e ? "-" : "") + t.toLowerCase();
      }), Vg = Pt(function(n, t, e) {
        return n + (e ? " " : "") + t.toLowerCase();
      }), Qg = rf("toLowerCase");
      function kg(n, t, e) {
        n = F(n), t = y(t);
        var r = t ? yt(n) : 0;
        if (!t || r >= t)
          return n;
        var i = (t - r) / 2;
        return qe(Oe(i), e) + n + qe(Le(i), e);
      }
      function jg(n, t, e) {
        n = F(n), t = y(t);
        var r = t ? yt(n) : 0;
        return t && r < t ? n + qe(t - r, e) : n;
      }
      function n_(n, t, e) {
        n = F(n), t = y(t);
        var r = t ? yt(n) : 0;
        return t && r < t ? qe(t - r, e) + n : n;
      }
      function t_(n, t, e) {
        return e || t == null ? t = 0 : t && (t = +t), ol(F(n).replace(_r, ""), t || 0);
      }
      function e_(n, t, e) {
        return (e ? en(n, t, e) : t === f) ? t = 1 : t = y(t), Yr(F(n), t);
      }
      function r_() {
        var n = arguments, t = F(n[0]);
        return n.length < 3 ? t : t.replace(n[1], n[2]);
      }
      var i_ = Pt(function(n, t, e) {
        return n + (e ? "_" : "") + t.toLowerCase();
      });
      function u_(n, t, e) {
        return e && typeof e != "number" && en(n, t, e) && (t = e = f), e = e === f ? Wn : e >>> 0, e ? (n = F(n), n && (typeof t == "string" || t != null && !pi(t)) && (t = cn(t), !t && Rt(n)) ? rt(Rn(n), 0, e) : n.split(t, e)) : [];
      }
      var f_ = Pt(function(n, t, e) {
        return n + (e ? " " : "") + mi(t);
      });
      function s_(n, t, e) {
        return n = F(n), e = e == null ? 0 : ht(y(e), 0, n.length), t = cn(t), n.slice(e, e + t.length) == t;
      }
      function o_(n, t, e) {
        var r = u.templateSettings;
        e && en(n, t, e) && (t = f), n = F(n), t = tr({}, t, r, cf);
        var i = tr({}, t.imports, r.imports, cf), s = V(i), o = Lr(i, s), l, c, p = 0, d = t.interpolate || _e, v = "__p += '", x = br(
          (t.escape || _e).source + "|" + d.source + "|" + (d === Wi ? Ns : _e).source + "|" + (t.evaluate || _e).source + "|$",
          "g"
        ), T = "//# sourceURL=" + (D.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++vo + "]") + `
`;
        n.replace(x, function(A, O, M, gn, rn, _n) {
          return M || (M = gn), v += n.slice(p, _n).replace(zs, Do), O && (l = !0, v += `' +
__e(` + O + `) +
'`), rn && (c = !0, v += `';
` + rn + `;
__p += '`), M && (v += `' +
((__t = (` + M + `)) == null ? '' : __t) +
'`), p = _n + A.length, A;
        }), v += `';
`;
        var E = D.call(t, "variable") && t.variable;
        if (!E)
          v = `with (obj) {
` + v + `
}
`;
        else if (Us.test(E))
          throw new C(vt);
        v = (c ? v.replace(Ss, "") : v).replace(Es, "$1").replace(As, "$1;"), v = "function(" + (E || "obj") + `) {
` + (E ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (l ? ", __e = _.escape" : "") + (c ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + v + `return __p
}`;
        var I = rs(function() {
          return P(s, T + "return " + v).apply(f, o);
        });
        if (I.source = v, _i(I))
          throw I;
        return I;
      }
      function l_(n) {
        return F(n).toLowerCase();
      }
      function a_(n) {
        return F(n).toUpperCase();
      }
      function c_(n, t, e) {
        if (n = F(n), n && (e || t === f))
          return cu(n);
        if (!n || !(t = cn(t)))
          return n;
        var r = Rn(n), i = Rn(t), s = hu(r, i), o = gu(r, i) + 1;
        return rt(r, s, o).join("");
      }
      function h_(n, t, e) {
        if (n = F(n), n && (e || t === f))
          return n.slice(0, pu(n) + 1);
        if (!n || !(t = cn(t)))
          return n;
        var r = Rn(n), i = gu(r, Rn(t)) + 1;
        return rt(r, 0, i).join("");
      }
      function g_(n, t, e) {
        if (n = F(n), n && (e || t === f))
          return n.replace(_r, "");
        if (!n || !(t = cn(t)))
          return n;
        var r = Rn(n), i = hu(r, Rn(t));
        return rt(r, i).join("");
      }
      function __(n, t) {
        var e = fs, r = ss;
        if (q(t)) {
          var i = "separator" in t ? t.separator : i;
          e = "length" in t ? y(t.length) : e, r = "omission" in t ? cn(t.omission) : r;
        }
        n = F(n);
        var s = n.length;
        if (Rt(n)) {
          var o = Rn(n);
          s = o.length;
        }
        if (e >= s)
          return n;
        var l = e - yt(r);
        if (l < 1)
          return r;
        var c = o ? rt(o, 0, l).join("") : n.slice(0, l);
        if (i === f)
          return c + r;
        if (o && (l += c.length - l), pi(i)) {
          if (n.slice(l).search(i)) {
            var p, d = c;
            for (i.global || (i = br(i.source, F(Mi.exec(i)) + "g")), i.lastIndex = 0; p = i.exec(d); )
              var v = p.index;
            c = c.slice(0, v === f ? l : v);
          }
        } else if (n.indexOf(cn(i), l) != l) {
          var x = c.lastIndexOf(i);
          x > -1 && (c = c.slice(0, x));
        }
        return c + r;
      }
      function p_(n) {
        return n = F(n), n && Cs.test(n) ? n.replace(Oi, Ko) : n;
      }
      var d_ = Pt(function(n, t, e) {
        return n + (e ? " " : "") + t.toUpperCase();
      }), mi = rf("toUpperCase");
      function es(n, t, e) {
        return n = F(n), t = e ? f : t, t === f ? Go(n) ? zo(n) : Oo(n) : n.match(t) || [];
      }
      var rs = L(function(n, t) {
        try {
          return ln(n, f, t);
        } catch (e) {
          return _i(e) ? e : new C(e);
        }
      }), v_ = Hn(function(n, t) {
        return vn(t, function(e) {
          e = Bn(e), Nn(n, e, hi(n[e], n));
        }), n;
      });
      function m_(n) {
        var t = n == null ? 0 : n.length, e = S();
        return n = t ? H(n, function(r) {
          if (typeof r[1] != "function")
            throw new mn(U);
          return [e(r[0]), r[1]];
        }) : [], L(function(r) {
          for (var i = -1; ++i < t; ) {
            var s = n[i];
            if (ln(s[0], this, r))
              return ln(s[1], this, r);
          }
        });
      }
      function x_(n) {
        return Kl(wn(n, Zn));
      }
      function xi(n) {
        return function() {
          return n;
        };
      }
      function w_(n, t) {
        return n == null || n !== n ? t : n;
      }
      var T_ = ff(), S_ = ff(!0);
      function on(n) {
        return n;
      }
      function wi(n) {
        return Bu(typeof n == "function" ? n : wn(n, Zn));
      }
      function E_(n) {
        return Du(wn(n, Zn));
      }
      function A_(n, t) {
        return Uu(n, wn(t, Zn));
      }
      var C_ = L(function(n, t) {
        return function(e) {
          return ne(e, n, t);
        };
      }), R_ = L(function(n, t) {
        return function(e) {
          return ne(n, e, t);
        };
      });
      function Ti(n, t, e) {
        var r = V(t), i = Fe(t, r);
        e == null && !(q(t) && (i.length || !r.length)) && (e = t, t = n, n = this, i = Fe(t, V(t)));
        var s = !(q(e) && "chain" in e) || !!e.chain, o = Kn(n);
        return vn(i, function(l) {
          var c = t[l];
          n[l] = c, o && (n.prototype[l] = function() {
            var p = this.__chain__;
            if (s || p) {
              var d = n(this.__wrapped__), v = d.__actions__ = un(this.__actions__);
              return v.push({ func: c, args: arguments, thisArg: n }), d.__chain__ = p, d;
            }
            return c.apply(n, Qn([this.value()], arguments));
          });
        }), n;
      }
      function y_() {
        return Q._ === this && (Q._ = jo), this;
      }
      function Si() {
      }
      function I_(n) {
        return n = y(n), L(function(t) {
          return Gu(t, n);
        });
      }
      var L_ = jr(H), O_ = jr(fu), b_ = jr(Ar);
      function is(n) {
        return fi(n) ? Cr(Bn(n)) : sa(n);
      }
      function W_(n) {
        return function(t) {
          return n == null ? f : gt(n, t);
        };
      }
      var M_ = of(), P_ = of(!0);
      function Ei() {
        return [];
      }
      function Ai() {
        return !1;
      }
      function B_() {
        return {};
      }
      function F_() {
        return "";
      }
      function D_() {
        return !0;
      }
      function U_(n, t) {
        if (n = y(n), n < 1 || n > Jn)
          return [];
        var e = Wn, r = j(n, Wn);
        t = S(t), n -= Wn;
        for (var i = Ir(r, t); ++e < n; )
          t(e);
        return i;
      }
      function G_(n) {
        return R(n) ? H(n, Bn) : hn(n) ? [n] : un(Af(F(n)));
      }
      function N_(n) {
        var t = ++Qo;
        return F(n) + t;
      }
      var $_ = He(function(n, t) {
        return n + t;
      }, 0), H_ = ni("ceil"), q_ = He(function(n, t) {
        return n / t;
      }, 1), K_ = ni("floor");
      function X_(n) {
        return n && n.length ? Be(n, on, Gr) : f;
      }
      function Y_(n, t) {
        return n && n.length ? Be(n, S(t, 2), Gr) : f;
      }
      function z_(n) {
        return lu(n, on);
      }
      function Z_(n, t) {
        return lu(n, S(t, 2));
      }
      function J_(n) {
        return n && n.length ? Be(n, on, qr) : f;
      }
      function V_(n, t) {
        return n && n.length ? Be(n, S(t, 2), qr) : f;
      }
      var Q_ = He(function(n, t) {
        return n * t;
      }, 1), k_ = ni("round"), j_ = He(function(n, t) {
        return n - t;
      }, 0);
      function np(n) {
        return n && n.length ? yr(n, on) : 0;
      }
      function tp(n, t) {
        return n && n.length ? yr(n, S(t, 2)) : 0;
      }
      return u.after = Eh, u.ary = Bf, u.assign = ag, u.assignIn = Jf, u.assignInWith = tr, u.assignWith = cg, u.at = hg, u.before = Ff, u.bind = hi, u.bindAll = v_, u.bindKey = Df, u.castArray = Bh, u.chain = Wf, u.chunk = Ka, u.compact = Xa, u.concat = Ya, u.cond = m_, u.conforms = x_, u.constant = xi, u.countBy = nh, u.create = gg, u.curry = Uf, u.curryRight = Gf, u.debounce = Nf, u.defaults = _g, u.defaultsDeep = pg, u.defer = Ah, u.delay = Ch, u.difference = za, u.differenceBy = Za, u.differenceWith = Ja, u.drop = Va, u.dropRight = Qa, u.dropRightWhile = ka, u.dropWhile = ja, u.fill = nc, u.filter = eh, u.flatMap = uh, u.flatMapDeep = fh, u.flatMapDepth = sh, u.flatten = If, u.flattenDeep = tc, u.flattenDepth = ec, u.flip = Rh, u.flow = T_, u.flowRight = S_, u.fromPairs = rc, u.functions = Sg, u.functionsIn = Eg, u.groupBy = oh, u.initial = uc, u.intersection = fc, u.intersectionBy = sc, u.intersectionWith = oc, u.invert = Cg, u.invertBy = Rg, u.invokeMap = ah, u.iteratee = wi, u.keyBy = ch, u.keys = V, u.keysIn = sn, u.map = Je, u.mapKeys = Ig, u.mapValues = Lg, u.matches = E_, u.matchesProperty = A_, u.memoize = Qe, u.merge = Og, u.mergeWith = Vf, u.method = C_, u.methodOf = R_, u.mixin = Ti, u.negate = ke, u.nthArg = I_, u.omit = bg, u.omitBy = Wg, u.once = yh, u.orderBy = hh, u.over = L_, u.overArgs = Ih, u.overEvery = O_, u.overSome = b_, u.partial = gi, u.partialRight = $f, u.partition = gh, u.pick = Mg, u.pickBy = Qf, u.property = is, u.propertyOf = W_, u.pull = hc, u.pullAll = Of, u.pullAllBy = gc, u.pullAllWith = _c, u.pullAt = pc, u.range = M_, u.rangeRight = P_, u.rearg = Lh, u.reject = dh, u.remove = dc, u.rest = Oh, u.reverse = ai, u.sampleSize = mh, u.set = Bg, u.setWith = Fg, u.shuffle = xh, u.slice = vc, u.sortBy = Sh, u.sortedUniq = Ac, u.sortedUniqBy = Cc, u.split = u_, u.spread = bh, u.tail = Rc, u.take = yc, u.takeRight = Ic, u.takeRightWhile = Lc, u.takeWhile = Oc, u.tap = Xc, u.throttle = Wh, u.thru = Ze, u.toArray = Yf, u.toPairs = kf, u.toPairsIn = jf, u.toPath = G_, u.toPlainObject = Zf, u.transform = Dg, u.unary = Mh, u.union = bc, u.unionBy = Wc, u.unionWith = Mc, u.uniq = Pc, u.uniqBy = Bc, u.uniqWith = Fc, u.unset = Ug, u.unzip = ci, u.unzipWith = bf, u.update = Gg, u.updateWith = Ng, u.values = Dt, u.valuesIn = $g, u.without = Dc, u.words = es, u.wrap = Ph, u.xor = Uc, u.xorBy = Gc, u.xorWith = Nc, u.zip = $c, u.zipObject = Hc, u.zipObjectDeep = qc, u.zipWith = Kc, u.entries = kf, u.entriesIn = jf, u.extend = Jf, u.extendWith = tr, Ti(u, u), u.add = $_, u.attempt = rs, u.camelCase = Xg, u.capitalize = ns, u.ceil = H_, u.clamp = Hg, u.clone = Fh, u.cloneDeep = Uh, u.cloneDeepWith = Gh, u.cloneWith = Dh, u.conformsTo = Nh, u.deburr = ts, u.defaultTo = w_, u.divide = q_, u.endsWith = Yg, u.eq = In, u.escape = zg, u.escapeRegExp = Zg, u.every = th, u.find = rh, u.findIndex = Rf, u.findKey = dg, u.findLast = ih, u.findLastIndex = yf, u.findLastKey = vg, u.floor = K_, u.forEach = Mf, u.forEachRight = Pf, u.forIn = mg, u.forInRight = xg, u.forOwn = wg, u.forOwnRight = Tg, u.get = di, u.gt = $h, u.gte = Hh, u.has = Ag, u.hasIn = vi, u.head = Lf, u.identity = on, u.includes = lh, u.indexOf = ic, u.inRange = qg, u.invoke = yg, u.isArguments = dt, u.isArray = R, u.isArrayBuffer = qh, u.isArrayLike = fn, u.isArrayLikeObject = X, u.isBoolean = Kh, u.isBuffer = it, u.isDate = Xh, u.isElement = Yh, u.isEmpty = zh, u.isEqual = Zh, u.isEqualWith = Jh, u.isError = _i, u.isFinite = Vh, u.isFunction = Kn, u.isInteger = Hf, u.isLength = je, u.isMap = qf, u.isMatch = Qh, u.isMatchWith = kh, u.isNaN = jh, u.isNative = ng, u.isNil = eg, u.isNull = tg, u.isNumber = Kf, u.isObject = q, u.isObjectLike = K, u.isPlainObject = fe, u.isRegExp = pi, u.isSafeInteger = rg, u.isSet = Xf, u.isString = nr, u.isSymbol = hn, u.isTypedArray = Ft, u.isUndefined = ig, u.isWeakMap = ug, u.isWeakSet = fg, u.join = lc, u.kebabCase = Jg, u.last = Sn, u.lastIndexOf = ac, u.lowerCase = Vg, u.lowerFirst = Qg, u.lt = sg, u.lte = og, u.max = X_, u.maxBy = Y_, u.mean = z_, u.meanBy = Z_, u.min = J_, u.minBy = V_, u.stubArray = Ei, u.stubFalse = Ai, u.stubObject = B_, u.stubString = F_, u.stubTrue = D_, u.multiply = Q_, u.nth = cc, u.noConflict = y_, u.noop = Si, u.now = Ve, u.pad = kg, u.padEnd = jg, u.padStart = n_, u.parseInt = t_, u.random = Kg, u.reduce = _h, u.reduceRight = ph, u.repeat = e_, u.replace = r_, u.result = Pg, u.round = k_, u.runInContext = a, u.sample = vh, u.size = wh, u.snakeCase = i_, u.some = Th, u.sortedIndex = mc, u.sortedIndexBy = xc, u.sortedIndexOf = wc, u.sortedLastIndex = Tc, u.sortedLastIndexBy = Sc, u.sortedLastIndexOf = Ec, u.startCase = f_, u.startsWith = s_, u.subtract = j_, u.sum = np, u.sumBy = tp, u.template = o_, u.times = U_, u.toFinite = Xn, u.toInteger = y, u.toLength = zf, u.toLower = l_, u.toNumber = En, u.toSafeInteger = lg, u.toString = F, u.toUpper = a_, u.trim = c_, u.trimEnd = h_, u.trimStart = g_, u.truncate = __, u.unescape = p_, u.uniqueId = N_, u.upperCase = d_, u.upperFirst = mi, u.each = Mf, u.eachRight = Pf, u.first = Lf, Ti(u, function() {
        var n = {};
        return Mn(u, function(t, e) {
          D.call(u.prototype, e) || (n[e] = t);
        }), n;
      }(), { chain: !1 }), u.VERSION = b, vn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
        u[n].placeholder = u;
      }), vn(["drop", "take"], function(n, t) {
        W.prototype[n] = function(e) {
          e = e === f ? 1 : Z(y(e), 0);
          var r = this.__filtered__ && !t ? new W(this) : this.clone();
          return r.__filtered__ ? r.__takeCount__ = j(e, r.__takeCount__) : r.__views__.push({
            size: j(e, Wn),
            type: n + (r.__dir__ < 0 ? "Right" : "")
          }), r;
        }, W.prototype[n + "Right"] = function(e) {
          return this.reverse()[n](e).reverse();
        };
      }), vn(["filter", "map", "takeWhile"], function(n, t) {
        var e = t + 1, r = e == yi || e == cs;
        W.prototype[n] = function(i) {
          var s = this.clone();
          return s.__iteratees__.push({
            iteratee: S(i, 3),
            type: e
          }), s.__filtered__ = s.__filtered__ || r, s;
        };
      }), vn(["head", "last"], function(n, t) {
        var e = "take" + (t ? "Right" : "");
        W.prototype[n] = function() {
          return this[e](1).value()[0];
        };
      }), vn(["initial", "tail"], function(n, t) {
        var e = "drop" + (t ? "" : "Right");
        W.prototype[n] = function() {
          return this.__filtered__ ? new W(this) : this[e](1);
        };
      }), W.prototype.compact = function() {
        return this.filter(on);
      }, W.prototype.find = function(n) {
        return this.filter(n).head();
      }, W.prototype.findLast = function(n) {
        return this.reverse().find(n);
      }, W.prototype.invokeMap = L(function(n, t) {
        return typeof n == "function" ? new W(this) : this.map(function(e) {
          return ne(e, n, t);
        });
      }), W.prototype.reject = function(n) {
        return this.filter(ke(S(n)));
      }, W.prototype.slice = function(n, t) {
        n = y(n);
        var e = this;
        return e.__filtered__ && (n > 0 || t < 0) ? new W(e) : (n < 0 ? e = e.takeRight(-n) : n && (e = e.drop(n)), t !== f && (t = y(t), e = t < 0 ? e.dropRight(-t) : e.take(t - n)), e);
      }, W.prototype.takeRightWhile = function(n) {
        return this.reverse().takeWhile(n).reverse();
      }, W.prototype.toArray = function() {
        return this.take(Wn);
      }, Mn(W.prototype, function(n, t) {
        var e = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), i = u[r ? "take" + (t == "last" ? "Right" : "") : t], s = r || /^find/.test(t);
        !i || (u.prototype[t] = function() {
          var o = this.__wrapped__, l = r ? [1] : arguments, c = o instanceof W, p = l[0], d = c || R(o), v = function(O) {
            var M = i.apply(u, Qn([O], l));
            return r && x ? M[0] : M;
          };
          d && e && typeof p == "function" && p.length != 1 && (c = d = !1);
          var x = this.__chain__, T = !!this.__actions__.length, E = s && !x, I = c && !T;
          if (!s && d) {
            o = I ? o : new W(this);
            var A = n.apply(o, l);
            return A.__actions__.push({ func: Ze, args: [v], thisArg: f }), new xn(A, x);
          }
          return E && I ? n.apply(this, l) : (A = this.thru(v), E ? r ? A.value()[0] : A.value() : A);
        });
      }), vn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
        var t = we[n], e = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
        u.prototype[n] = function() {
          var i = arguments;
          if (r && !this.__chain__) {
            var s = this.value();
            return t.apply(R(s) ? s : [], i);
          }
          return this[e](function(o) {
            return t.apply(R(o) ? o : [], i);
          });
        };
      }), Mn(W.prototype, function(n, t) {
        var e = u[t];
        if (e) {
          var r = e.name + "";
          D.call(bt, r) || (bt[r] = []), bt[r].push({ name: t, func: e });
        }
      }), bt[$e(f, ft).name] = [{
        name: "wrapper",
        func: f
      }], W.prototype.clone = pl, W.prototype.reverse = dl, W.prototype.value = vl, u.prototype.at = Yc, u.prototype.chain = zc, u.prototype.commit = Zc, u.prototype.next = Jc, u.prototype.plant = Qc, u.prototype.reverse = kc, u.prototype.toJSON = u.prototype.valueOf = u.prototype.value = jc, u.prototype.first = u.prototype.head, zt && (u.prototype[zt] = Vc), u;
    }, It = Zo();
    ot ? ((ot.exports = It)._ = It, wr._ = It) : Q._ = It;
  }).call(commonjsGlobal);
})(lodash, lodash.exports);
class Comment extends Segment {
  constructor(g) {
    super(), this._comment = g;
  }
  toString() {
    return this._comment instanceof Array ? `NOTE
` + this._comment.join(`
`) : `NOTE
` + lodash.exports.escape(this._comment);
  }
  static fromString(g, f = !0) {
    const b = isComment(g);
    if (!b) {
      if (!f)
        return !1;
      throw new InvalidCommentError("Does not appear to be a valid comment.", g);
    }
    return new Comment(b.groups.text);
  }
}
class InvalidHeaderError extends Error {
  constructor(g, f) {
    f && (g = `

${f}

--------
${g}`), super(g);
  }
}
class Header extends Segment {
  constructor(g, f) {
    super(), this._description = g, this._meta = f;
  }
  get description() {
    return this._description;
  }
  get meta() {
    return this._meta;
  }
  setDescription(g) {
    this._description = g;
  }
  setMeta(g) {
    return this._meta = g, g;
  }
  toString() {
    return "WEBVTT" + (this._description ? " " + this._description : "") + (this._meta && Object.keys(this._meta).length ? `
` + lodash.exports.toPairs(this._meta).map((g) => g.join(": ")).join(`
`) : "");
  }
  static fromString(g, f = !0) {
    var J, U, vt;
    const b = isHeader(g);
    let B = {};
    if (!b) {
      if (!f)
        return !1;
      throw new InvalidHeaderError("Appears to be invalid, could not determine timing payload.", g);
    }
    return (J = b.groups) != null && J.meta && (B = lodash.exports.fromPairs((U = b.groups) == null ? void 0 : U.meta.split(`
`).map((zn) => zn.split(":").map((er) => er.replace(/^\s/, ""))))), new Header((vt = b.groups) == null ? void 0 : vt.description, B);
  }
}
class InvalidStyleError extends Error {
  constructor(g, f) {
    f && (g = `

${f}

--------
${g}`), super(g);
  }
}
class Style extends Segment {
  constructor(g, f) {
    super(), this._styles = g, this._selector = f;
  }
  get styles() {
    return this._styles;
  }
  get selector() {
    return this._selector;
  }
  toString() {
    return `STYLE
::cue${this.selector ? `(${this.selector})` : ""} {
${lodash.exports.toPairs(this.styles).map((g) => ["	" + lodash.exports.kebabCase(g[0]), g[1]].join(": ")).join(`;
`)};
}`;
  }
  static fromString(g, f = !0) {
    var J, U;
    const b = isStyle(g);
    let B = {};
    if (!b) {
      if (!f)
        return !1;
      throw new InvalidStyleError("STYLE segment seems malformed, make sure its in a valid format.", g);
    }
    return (J = b.groups) != null && J.styles && (B = lodash.exports.fromPairs(b.groups.styles.replace(/ {2,}/g, "").split(`
`).map((vt) => {
      const zn = vt.replace(": ", ":").replace(";", "").split(":");
      return [lodash.exports.camelCase(zn[0]), zn[1]];
    }))), new Style(B, (U = b.groups) == null ? void 0 : U.selector);
  }
}
function createSegments(m) {
  const g = [];
  return m.forEach((f) => {
    const b = isHeader(f) ? Header.fromString(f, !1) : !1, B = isCue(f) ? Cue.fromString(f, !1) : !1, J = isComment(f) ? Comment.fromString(f, !1) : !1, U = isStyle(f) ? Style.fromString(f, !1) : !1;
    b && g.push(b), B && g.push(B), J && g.push(J), U && g.push(U);
  }), g;
}
function hmsToSeconds(m) {
  let g = m.split(":"), f = 0, b = 1;
  for (; g.length > 0; )
    f += b * parseFloat(g.pop()), b *= 60;
  return f;
}
function secondsToHms(m) {
  return new Date(m * 1e3).toISOString().substr(11, 12);
}
function vtt2srt(m) {
  return VTT.fromString(m).removeComments().removeTags().toString("srt");
}
function srt2vtt(m) {
  return fromSrt(m).toString();
}
function fromSrt(m) {
  return VTT.fromString(m);
}
const isVtt = (m) => /^WEBVTT|^\uFEFFWEBVTT/.test(m), isHeader = (m) => m.match(SEGMENT_HEADER_REGEX), isCue = (m) => m.match(SEGMENT_CUE_REGEX), isComment = (m) => m.match(SEGMENT_COMMENT_REGEX), isStyle = (m) => m.match(SEGMENT_STYLE_REGEX), toVttTimingString = (m, g, f) => secondsToHms(m) + " --> " + secondsToHms(g) + (f ? " " + lodash.exports.toPairs(f).map((b) => b.join(":")).join(" ") : ""), toSrtTimingString = (m, g) => toVttTimingString(m, g).replaceAll(".", ","), stripTags = (m) => m.replace(/<\/?[^>]+(>|$)/g, "");
class Text {
  constructor(g) {
    this._text = g;
  }
  class(...g) {
    return `<c${g.join(".")}>${this._text}</c>`;
  }
  italics(g) {
    return new RegExp(`<i>${g}</i>`).test(this._text) && (this._text = this._text.replace(`<i>${g}</i>`, g)), this._text = this._text.replace(g, `<i>${g}</i>`), this;
  }
  bold(g) {
    return new RegExp(`<b>${g}</b>`).test(this._text) && (this._text = this._text.replace(`<b>${g}</b>`, g)), this._text = this._text.replace(g, `<b>${g}</b>`), this;
  }
  underline(g) {
    return new RegExp(`<u>${g}</u>`).test(this._text) && (this._text = this._text.replace(`<u>${g}</u>`, g)), this._text = this._text.replace(g, `<u>${g}</u>`), this;
  }
  voice(g, f) {
    return new RegExp(`<v ${f}>${g}</v>`).test(this._text) && (this._text = this._text.replace(`<v ${f}>${g}</v>`, g)), this._text = this._text.replace(g, `<v ${f}>${g}</v>`), this;
  }
  removeTags() {
    return this._text = stripTags(this._text), this;
  }
  get text() {
    return this._text;
  }
  toString(g) {
    return g === "srt" ? this.removeTags().text : this.text;
  }
}
class InvalidCueError extends Error {
  constructor(g, f) {
    f && (g = `

${f}

--------
${g}`), super(g);
  }
}
class Timings {
  constructor(m) {
    this.segment = m;
  }
  shift(m) {
    return m < 0 ? this.run({ startTime: (m / 1e3).toString(), endTime: (m / 1e3).toString() }) : this.run({ startTime: "+" + (m / 1e3).toString(), endTime: "+" + (m / 1e3).toString() });
  }
  shiftStart(m) {
    return m < 0 ? this.run({ startTime: (m / 1e3).toString() }) : this.run({ startTime: "+" + (m / 1e3).toString() });
  }
  shiftEnd(m) {
    return m < 0 ? this.run({ endTime: (m / 1e3).toString() }) : this.run({ endTime: "+" + (m / 1e3).toString() });
  }
  resync(m, g) {
    this.run({
      startTime: "*" + (m / g).toString(),
      endTime: "*" + (m / g).toString()
    });
  }
  toString(m) {
    return lodash.exports.isArray(this.segment) ? this.segment.map(
      (g) => (m == null ? void 0 : m.toLowerCase()) === "srt" ? toSrtTimingString(g.startTime, g.endTime) : toVttTimingString(g.startTime, g.endTime)
    ) : (m == null ? void 0 : m.toLowerCase()) === "srt" ? toSrtTimingString(this.segment.startTime, this.segment.endTime) : toVttTimingString(this.segment.startTime, this.segment.endTime);
  }
  update(timings, segment) {
    return !timings.startTime && !timings.endTime ? this.segment : (timings.startTime && segment.setStartTime(eval(segment.startTime + timings.startTime)), timings.endTime && segment.setEndTime(eval(segment.endTime + timings.endTime)), segment);
  }
  updateAll(m, g) {
    return g.forEach((f) => this.update.call(null, m, f)), g;
  }
  run(m) {
    return lodash.exports.isArray(this.segment) ? this.updateAll(m, this.segment) : this.update(m, this.segment);
  }
}
class Cue extends Segment {
  constructor(f, b, B, J, U) {
    super();
    ut(this, "_startTime");
    ut(this, "_endTime");
    ut(this, "_text");
    ut(this, "_identifier");
    ut(this, "_settings");
    this._startTime = f, this._endTime = b, this._text = new Text(B), this._identifier = J, this._settings = U || {};
  }
  vertical(f) {
    return this._settings.vertical = f, this;
  }
  line(f) {
    return this._settings.line = f, this;
  }
  position(f) {
    return this._settings.position = f, this;
  }
  size(f) {
    return this._settings.size = f, this;
  }
  align(f) {
    return this._settings.align = f, this;
  }
  removeTags() {
    return this._text = new Text(stripTags(this.text.toString())), this;
  }
  toString(f) {
    if (f === "srt") {
      if (!this._identifier || lodash.exports.isString(this._identifier))
        throw new InvalidCueError("SRT files must have an identifier, the identifier should represent a numeric counter", `${this._identifier}
${this.timings.toString(f)}
${this._text.toString(f)}`);
      return `${this._identifier}
${this.timings.toString(f)}
${this._text.toString(f)}`;
    }
    return `${this._identifier !== void 0 ? this._identifier + `
` : ""}${this.timings.toString()}
${this._text.toString()}`;
  }
  clone() {
    return new Cue(this._startTime, this._endTime, this._text.toString(), this._identifier);
  }
  setStartTime(f) {
    return this._startTime = f, this;
  }
  setEndTime(f) {
    return this._endTime = f, this;
  }
  setText(f) {
    return this._text = new Text(f), this;
  }
  setIdentifier(f) {
    return this._identifier = f, this;
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  get text() {
    return this._text;
  }
  get identifier() {
    return this._identifier;
  }
  get settings() {
    return this._settings;
  }
  get timings() {
    return new Timings(this);
  }
  static fromString(f, b = !0) {
    const B = isCue(f);
    if (!B) {
      if (!b)
        return !1;
      throw new InvalidCueError(`Cue seems malformed, make sure the cue is in a valid format.

Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload

`, f);
    }
    const J = B.groups.timings.split(" --> ")[0], U = B.groups.timings.split(" --> ")[1];
    return new Cue(hmsToSeconds(J), hmsToSeconds(U), B.groups.text, B.groups.identifier);
  }
}
class InvalidVttError extends Error {
  constructor(g, f) {
    f && (g = `

Received:

${f.length > 100 ? f.slice(0, 100) + "..." : f}

--------
${g}`), super(g);
  }
}
class VTT {
  constructor(g, f) {
    ut(this, "_segments", []);
    ut(this, "_header");
    this._header = new Header(g, f), this._segments.push(this._header);
  }
  addSegment(g) {
    g instanceof Header || this._segments.push(g);
  }
  addCue(g, f, b) {
    const B = new Cue(g, f, b);
    return this._segments.push(B), B;
  }
  addComment(g) {
    const f = new Comment(g);
    return this._segments.push(f), f;
  }
  removeTags() {
    for (const g of this._segments)
      g instanceof Cue && g.removeTags();
    return this;
  }
  removeComments() {
    return this._segments = this._segments.filter((g) => !(g instanceof Comment)), this;
  }
  toString(g) {
    if (g === "srt") {
      let f = 1;
      return this.segments.map((b) => b instanceof Cue ? b.setIdentifier(f++).toString(g) : null).filter((b) => b).join(`

`);
    }
    return this.segments.map((f) => f.toString()).join(`

`);
  }
  get timings() {
    return new Timings(this.cues);
  }
  get segments() {
    return this._segments;
  }
  get header() {
    return this._header;
  }
  get cues() {
    return this._segments.filter((g) => g instanceof Cue);
  }
  get comments() {
    return this._segments.filter((g) => g instanceof Comment);
  }
  get styles() {
    return this._segments.filter((g) => g instanceof Style);
  }
  static fromString(g, f = !0) {
    if (!isVtt(g)) {
      if (!f)
        return !1;
      throw new InvalidVttError(`Is not a valid WebVTT format.

The structure of a WebVTT consists of the following components, some of them optional, in this order:

- An optional byte order mark (BOM).
- The string "WEBVTT".
`, g);
    }
    const b = createSegments(g.split(`

`)), B = b.find((U) => U instanceof Header), J = new VTT(B == null ? void 0 : B.description, B == null ? void 0 : B.meta);
    return b.forEach(J.addSegment.bind(J)), J;
  }
}
export {
  SEGMENT_COMMENT_REGEX,
  SEGMENT_CUE_REGEX,
  SEGMENT_HEADER_REGEX,
  SEGMENT_STYLE_REGEX,
  createSegments,
  fromSrt,
  hmsToSeconds,
  isComment,
  isCue,
  isHeader,
  isStyle,
  isVtt,
  secondsToHms,
  srt2vtt,
  stripTags,
  toSrtTimingString,
  toVttTimingString,
  vtt2srt
};
