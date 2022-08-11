import n from "../Text.es.js";
import g from "./Segment.es.js";
import m from "../../errors/InvalidCueError.es.js";
import { stripTags as d, isCue as u, hmsToSeconds as o } from "../../utils.es.js";
import _ from "../Timings.es.js";
import "../../../node_modules/lodash/lodash.es.js";
import { l as a } from "../../../_virtual/lodash.es.js";
class h extends g {
  _startTime;
  _endTime;
  _text;
  _identifier;
  _settings;
  constructor(t, e, i, s, r) {
    super(), this._startTime = t, this._endTime = e, this._text = new n(i), this._identifier = s, this._settings = r || {};
  }
  vertical(t) {
    return this._settings.vertical = t, this;
  }
  line(t) {
    return this._settings.line = t, this;
  }
  position(t) {
    return this._settings.position = t, this;
  }
  size(t) {
    return this._settings.size = t, this;
  }
  align(t) {
    return this._settings.align = t, this;
  }
  removeTags() {
    return this._text = new n(d(this.text.toString())), this;
  }
  toString(t) {
    if (t === "srt") {
      if (!this._identifier || a.exports.isString(this._identifier))
        throw new m("SRT files must have an identifier, the identifier should represent a numeric counter", `${this._identifier}
${this.timings.toString(t)}
${this._text.toString(t)}`);
      return `${this._identifier}
${this.timings.toString(t)}
${this._text.toString(t)}`;
    }
    return `${this._identifier !== void 0 ? this._identifier + `
` : ""}${this.timings.toString()}
${this._text.toString()}`;
  }
  clone() {
    return new h(this._startTime, this._endTime, this._text.toString(), this._identifier);
  }
  setStartTime(t) {
    return this._startTime = t, this;
  }
  setEndTime(t) {
    return this._endTime = t, this;
  }
  setText(t) {
    return this._text = new n(t), this;
  }
  setIdentifier(t) {
    return this._identifier = t, this;
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
    return new _(this);
  }
  static fromString(t, e = !0) {
    const i = u(t);
    if (!i) {
      if (!e)
        return !1;
      throw new m(`Cue seems malformed, make sure the cue is in a valid format.

Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload

`, t);
    }
    const s = i.groups.timings.split(" --> ")[0], r = i.groups.timings.split(" --> ")[1];
    return new h(o(s), o(r), i.groups.text, i.groups.identifier);
  }
}
export {
  h as default
};
