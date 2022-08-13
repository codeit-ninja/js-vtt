import n from "./Segment.es.js";
import m from "../../errors/InvalidCommentError.es.js";
import { getComment as i } from "../../utils.es.js";
import { escape as s } from "lodash";
class r extends n {
  constructor(t) {
    super(), this._comment = t;
  }
  toString() {
    return this._comment instanceof Array ? `NOTE
` + this._comment.join(`
`) : `NOTE
` + s(this._comment);
  }
  static fromString(t, o = !0) {
    const e = i(t);
    if (!e) {
      if (!o)
        return !1;
      throw new m("Does not appear to be a valid comment.", t);
    }
    return new r(e.text);
  }
}
export {
  r as default
};
