import o from "./Segment.es.js";
import { getStyle as i } from "../../utils.es.js";
import l from "../../errors/InvalidStyleError.es.js";
import m from "../../../node_modules/lodash-es/toPairs.es.js";
import n from "../../../node_modules/lodash-es/kebabCase.es.js";
class s extends o {
  constructor(t, e) {
    super(), this._styles = t, this._selector = e;
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
${m(this.styles).map((t) => ["	" + n(t[0]), t[1]].join(": ")).join(`;
`)};
}`;
  }
  static fromString(t, e = !0) {
    const r = i(t);
    if (!r) {
      if (!e)
        return !1;
      throw new l("STYLE segment seems malformed, make sure its in a valid format.", t);
    }
    return new s(r.styles, r.selector);
  }
}
export {
  s as default
};
