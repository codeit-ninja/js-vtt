import { VTT_VALIDATION_REGEX as d, SEGMENT_HEADER_REGEX as l, SEGMENT_CUE_REGEX as p, SEGMENT_COMMENT_REGEX as m, SEGMENT_STYLE_REGEX as f } from "./constants.es.js";
import g from "./webvtt/segments/Cue.es.js";
import y from "./webvtt/segments/Comment.es.js";
import _ from "./webvtt/segments/Header.es.js";
import { fromPairs as u, isEmpty as C, camelCase as G, toPairs as M } from "lodash";
import N from "./webvtt/segments/Style.es.js";
function A(t) {
  const s = [];
  return t.forEach((e) => {
    const r = E(e) ? _.fromString(e, !1) : !1, i = S(e) ? g.fromString(e, !1) : !1, o = T(e) ? y.fromString(e, !1) : !1, n = h(e) ? N.fromString(e, !1) : !1;
    r && s.push(r), i && s.push(i), o && s.push(o), n && s.push(n);
  }), s;
}
function c(t) {
  let s = t.split(":"), e = 0, r = 1;
  for (; s.length > 0; )
    e += r * parseFloat(s.pop()), r *= 60;
  return e;
}
function a(t) {
  return new Date(t * 1e3).toISOString().substr(11, 12);
}
const x = (t) => d.test(t), E = (t) => l.test(t), S = (t) => p.test(t), T = (t) => m.test(t), h = (t) => f.test(t), D = (t) => {
  if (!E(t))
    return !1;
  const { description: s, meta: e } = t.match(l).groups;
  let r = {};
  return e && (r = u(e.split(`
`).map((i) => i.split(":").map((o) => o.replace(/^\s/, ""))))), {
    description: s,
    meta: C(r) ? void 0 : r
  };
}, I = (t) => {
  if (!S(t))
    return !1;
  const { identifier: s, timings: e, text: r } = t.match(p).groups, i = e.split(" --> ")[0], o = e.split(" --> ")[1];
  return {
    identifier: s,
    startTime: c(i),
    endTime: c(o),
    text: r
  };
}, P = (t) => {
  if (!T(t))
    return !1;
  const { text: s } = t.match(m).groups;
  return {
    text: s
  };
}, w = (t) => {
  if (!h(t))
    return !1;
  const { styles: s, selector: e } = t.match(f).groups;
  return {
    styles: u(s.replace(/ {2,}/g, "").split(`
`).map((i) => {
      const o = i.replace(": ", ":").replace(";", "").split(":");
      return [G(o[0]), o[1]];
    })),
    selector: e
  };
}, O = (t, s, e) => a(t) + " --> " + a(s) + (e ? " " + M(e).map((r) => r.join(":")).join(" ") : ""), L = (t, s) => O(t, s).replaceAll(".", ","), k = (t) => t.replace(/<\/?[^>]+(>|$)/g, "");
export {
  A as createSegments,
  P as getComment,
  I as getCue,
  D as getHeader,
  w as getStyle,
  c as hmsToSeconds,
  T as isComment,
  S as isCue,
  E as isHeader,
  h as isStyle,
  x as isVtt,
  a as secondsToHms,
  k as stripTags,
  L as toSrtTimingString,
  O as toVttTimingString
};
