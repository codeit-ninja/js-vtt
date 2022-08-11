import n from "./Segment.es.js";
import m from "../../errors/InvalidCommentError.es.js";
import { isComment as i } from "../../utils.es.js";
import "../../../node_modules/lodash/lodash.es.js";
import { l as s } from "../../../_virtual/lodash.es.js";
class o extends n {
  constructor(t) {
    super(), this._comment = t;
  }
  toString() {
    return this._comment instanceof Array ? `NOTE
` + this._comment.join(`
`) : `NOTE
` + s.exports.escape(this._comment);
  }
  static fromString(t, e = !0) {
    const r = i(t);
    if (!r) {
      if (!e)
        return !1;
      throw new m("Does not appear to be a valid comment.", t);
    }
    return new o(r.groups.text);
  }
}
export {
  o as default
};
