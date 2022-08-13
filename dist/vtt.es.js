import r from "./webvtt/segments/Cue.es.js";
import o from "./webvtt/segments/Comment.es.js";
import { isVtt as h, createSegments as g } from "./utils.es.js";
import m from "./webvtt/segments/Header.es.js";
import u from "./webvtt/Timings.es.js";
import c from "./webvtt/segments/Style.es.js";
import d from "./errors/InvalidVttError.es.js";
class a {
  _segments = [];
  _header;
  constructor(e, t) {
    this._header = new m(e, t), this._segments.push(this._header);
  }
  addSegment(e) {
    e instanceof m || this._segments.push(e);
  }
  addCue(e, t, n) {
    const s = new r(e, t, n);
    return this._segments.push(s), s;
  }
  addComment(e) {
    const t = new o(e);
    return this._segments.push(t), t;
  }
  removeTags() {
    for (const e of this._segments)
      e instanceof r && e.removeTags();
    return this;
  }
  removeComments() {
    return this._segments = this._segments.filter((e) => !(e instanceof o)), this;
  }
  toString(e) {
    if (e === "srt") {
      let t = 1;
      return this.segments.map((n) => n instanceof r ? n.setIdentifier(t++).toString(e) : null).filter((n) => n).join(`

`);
    }
    return this.segments.map((t) => t.toString()).join(`

`);
  }
  get timings() {
    return new u(this.cues);
  }
  get segments() {
    return this._segments;
  }
  get header() {
    return this._header;
  }
  get cues() {
    return this._segments.filter((e) => e instanceof r);
  }
  get comments() {
    return this._segments.filter((e) => e instanceof o);
  }
  get styles() {
    return this._segments.filter((e) => e instanceof c);
  }
  static fromString(e, t = !0) {
    if (!h(e)) {
      if (!t)
        return !1;
      throw new d(`Is not a valid WebVTT format.

The structure of a WebVTT consists of the following components, some of them optional, in this order:

- An optional byte order mark (BOM).
- The string "WEBVTT".
`, e);
    }
    const n = g(e.split(`

`)), s = n.find((f) => f instanceof m), i = new a(s?.description, s?.meta);
    return n.forEach(i.addSegment.bind(i)), i;
  }
}
export {
  a as default
};
