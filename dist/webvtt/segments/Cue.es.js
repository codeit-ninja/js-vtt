import m from "./Segment.es.js";
import r from "../../errors/InvalidCueError.es.js";
import { stripTags as _, getCue as u } from "../../utils.es.js";
import g from "../Timings.es.js";
import { isString as d } from "lodash";
class s extends m {
  _startTime;
  _endTime;
  _text;
  _identifier;
  _settings;
  constructor(t, e, i, n, h) {
    super(), this._startTime = t, this._endTime = e, this._text = i, this._identifier = n, this._settings = h || {};
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
    return this._text = _(this.text), this;
  }
  toString(t) {
    if (t === "srt") {
      if (!this._identifier || d(this._identifier))
        throw new r("SRT files must have an identifier, the identifier should represent a numeric counter", `${this._identifier}
${this.timings.toString(t)}
${this._text}`);
      return this.removeTags(), `${this._identifier}
${this.timings.toString(t)}
${this.text}`;
    }
    return `${this._identifier !== void 0 ? this._identifier + `
` : ""}${this.timings.toString()}
${this._text}`;
  }
  clone() {
    return new s(this._startTime, this._endTime, this._text.toString(), this._identifier);
  }
  setStartTime(t) {
    return this._startTime = t, this;
  }
  setEndTime(t) {
    return this._endTime = t, this;
  }
  setText(t) {
    return this._text = t, this;
  }
  setMeta(t) {
    return this._text = JSON.stringify(t, null, 4), this;
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
    return new g(this);
  }
  static fromString(t, e = !0) {
    const i = u(t);
    if (!i) {
      if (!e)
        return !1;
      throw new r(`
Cue seems malformed, make sure the cue is in a valid format.
            
Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload
            
            `, t);
    }
    return new s(i.startTime, i.endTime, i.text, i.identifier);
  }
}
export {
  s as default
};
