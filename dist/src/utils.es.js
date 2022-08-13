import { VTT_VALIDATION_REGEX as d, SEGMENT_HEADER_REGEX as m, SEGMENT_CUE_REGEX as l, SEGMENT_COMMENT_REGEX as p, SEGMENT_STYLE_REGEX as f } from "./constants.es.js";
import g from "./webvtt/segments/Cue.es.js";
import y from "./webvtt/segments/Comment.es.js";
import _ from "./webvtt/segments/Header.es.js";
import C from "./webvtt/segments/Style.es.js";
import u from "../node_modules/lodash-es/fromPairs.es.js";
import G from "../node_modules/lodash-es/isEmpty.es.js";
import M from "../node_modules/lodash-es/camelCase.es.js";
import N from "../node_modules/lodash-es/toPairs.es.js";
function I(t) {
  const r = [];
  return t.forEach((e) => {
    const s = E(e) ? _.fromString(e, !1) : !1, i = S(e) ? g.fromString(e, !1) : !1, o = T(e) ? y.fromString(e, !1) : !1, n = h(e) ? C.fromString(e, !1) : !1;
    s && r.push(s), i && r.push(i), o && r.push(o), n && r.push(n);
  }), r;
}
function c(t) {
  let r = t.split(":"), e = 0, s = 1;
  for (; r.length > 0; )
    e += s * parseFloat(r.pop()), s *= 60;
  return e;
}
function a(t) {
  return new Date(t * 1e3).toISOString().substr(11, 12);
}
const P = (t) => d.test(t), E = (t) => m.test(t), S = (t) => l.test(t), T = (t) => p.test(t), h = (t) => f.test(t), w = (t) => {
  if (!E(t))
    return !1;
  const { description: r, meta: e } = t.match(m).groups;
  let s = {};
  return e && (s = u(e.split(`
`).map((i) => i.split(":").map((o) => o.replace(/^\s/, ""))))), {
    description: r,
    meta: G(s) ? void 0 : s
  };
}, L = (t) => {
  if (!S(t))
    return !1;
  const { identifier: r, timings: e, text: s } = t.match(l).groups, i = e.split(" --> ")[0], o = e.split(" --> ")[1];
  return {
    identifier: r,
    startTime: c(i),
    endTime: c(o),
    text: s
  };
}, k = (t) => {
  if (!T(t))
    return !1;
  const { text: r } = t.match(p).groups;
  return {
    text: r
  };
}, v = (t) => {
  if (!h(t))
    return !1;
  const { styles: r, selector: e } = t.match(f).groups;
  return {
    styles: u(r.replace(/ {2,}/g, "").split(`
`).map((i) => {
      const o = i.replace(": ", ":").replace(";", "").split(":");
      return [M(o[0]), o[1]];
    })),
    selector: e
  };
}, O = (t, r, e) => a(t) + " --> " + a(r) + (e ? " " + N(e).map((s) => s.join(":")).join(" ") : ""), F = (t, r) => O(t, r).replaceAll(".", ","), U = (t) => t.replace(/<\/?[^>]+(>|$)/g, "");
export {
  I as createSegments,
  k as getComment,
  L as getCue,
  w as getHeader,
  v as getStyle,
  c as hmsToSeconds,
  T as isComment,
  S as isCue,
  E as isHeader,
  h as isStyle,
  P as isVtt,
  a as secondsToHms,
  U as stripTags,
  F as toSrtTimingString,
  O as toVttTimingString
};
