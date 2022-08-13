import n from "./Segment.es.js";
import { getHeader as s } from "../../utils.es.js";
import o from "../../errors/InvalidHeaderError.es.js";
import a from "../../../node_modules/lodash-es/toPairs.es.js";
class r extends n {
  constructor(t, e) {
    super(), this._description = t, this._meta = e;
  }
  get description() {
    return this._description;
  }
  get meta() {
    return this._meta;
  }
  setDescription(t) {
    this._description = t;
  }
  setMeta(t) {
    return this._meta = t, t;
  }
  toString() {
    return "WEBVTT" + (this._description ? " " + this._description : "") + (this._meta && Object.keys(this._meta).length ? `
` + a(this._meta).map((t) => t.join(": ")).join(`
`) : "");
  }
  static fromString(t, e = !0) {
    const i = s(t);
    if (!i) {
      if (!e)
        return !1;
      throw new o("Appears to be invalid, could not determine timing payload.", t);
    }
    return new r(i.description, i.meta);
  }
}
export {
  r as default
};
