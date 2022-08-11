import n from "./Segment.es.js";
import { isStyle as m } from "../../utils.es.js";
import p from "../../errors/InvalidStyleError.es.js";
import "../../../node_modules/lodash/lodash.es.js";
import { l as s } from "../../../_virtual/lodash.es.js";
class l extends n {
  constructor(e, r) {
    super(), this._styles = e, this._selector = r;
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
${s.exports.toPairs(this.styles).map((e) => ["	" + s.exports.kebabCase(e[0]), e[1]].join(": ")).join(`;
`)};
}`;
  }
  static fromString(e, r = !0) {
    const t = m(e);
    let o = {};
    if (!t) {
      if (!r)
        return !1;
      throw new p("STYLE segment seems malformed, make sure its in a valid format.", e);
    }
    return t.groups?.styles && (o = s.exports.fromPairs(t.groups.styles.replace(/ {2,}/g, "").split(`
`).map((a) => {
      const i = a.replace(": ", ":").replace(";", "").split(":");
      return [s.exports.camelCase(i[0]), i[1]];
    }))), new l(o, t.groups?.selector);
  }
}
export {
  l as default
};
