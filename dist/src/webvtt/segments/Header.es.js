import p from "./Segment.es.js";
import { isHeader as m } from "../../utils.es.js";
import d from "../../errors/InvalidHeaderError.es.js";
import "../../../node_modules/lodash/lodash.es.js";
import { l as s } from "../../../_virtual/lodash.es.js";
class o extends p {
  constructor(t, r) {
    super(), this._description = t, this._meta = r;
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
` + s.exports.toPairs(this._meta).map((t) => t.join(": ")).join(`
`) : "");
  }
  static fromString(t, r = !0) {
    const e = m(t);
    let i = {};
    if (!e) {
      if (!r)
        return !1;
      throw new d("Appears to be invalid, could not determine timing payload.", t);
    }
    return e.groups?.meta && (i = s.exports.fromPairs(e.groups?.meta.split(`
`).map((n) => n.split(":").map((a) => a.replace(/^\s/, ""))))), new o(e.groups?.description, i);
  }
}
export {
  o as default
};
