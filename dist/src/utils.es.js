import { SEGMENT_HEADER_REGEX as c, SEGMENT_CUE_REGEX as m, SEGMENT_COMMENT_REGEX as f, SEGMENT_STYLE_REGEX as E } from "./constants.es.js";
import l from "./webvtt/segments/Cue.es.js";
import p from "./webvtt/segments/Comment.es.js";
import S from "./webvtt/segments/Header.es.js";
import "../node_modules/lodash/lodash.es.js";
import T from "./webvtt/segments/Style.es.js";
import { l as h } from "../_virtual/lodash.es.js";
function X(t) {
  const r = [];
  return t.forEach((o) => {
    const s = u(o) ? S.fromString(o, !1) : !1, i = G(o) ? l.fromString(o, !1) : !1, n = _(o) ? p.fromString(o, !1) : !1, e = d(o) ? T.fromString(o, !1) : !1;
    s && r.push(s), i && r.push(i), n && r.push(n), e && r.push(e);
  }), r;
}
function y(t) {
  let r = t.split(":"), o = 0, s = 1;
  for (; r.length > 0; )
    o += s * parseFloat(r.pop()), s *= 60;
  return o;
}
function a(t) {
  return new Date(t * 1e3).toISOString().substr(11, 12);
}
const j = (t) => /^WEBVTT|^\uFEFFWEBVTT/.test(t), u = (t) => t.match(c), G = (t) => t.match(m), _ = (t) => t.match(f), d = (t) => t.match(E), C = (t, r, o) => a(t) + " --> " + a(r) + (o ? " " + h.exports.toPairs(o).map((s) => s.join(":")).join(" ") : ""), w = (t, r) => C(t, r).replaceAll(".", ","), x = (t) => t.replace(/<\/?[^>]+(>|$)/g, "");
export {
  X as createSegments,
  y as hmsToSeconds,
  _ as isComment,
  G as isCue,
  u as isHeader,
  d as isStyle,
  j as isVtt,
  a as secondsToHms,
  x as stripTags,
  w as toSrtTimingString,
  C as toVttTimingString
};
