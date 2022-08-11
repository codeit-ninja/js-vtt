"use strict";const o=require("./Segment.cjs.js"),n=require("../../errors/InvalidCommentError.cjs.js"),i=require("../../utils.cjs.js");require("../../../node_modules/lodash/lodash.cjs.js");const c=require("../../../_virtual/lodash.cjs.js");class s extends o{constructor(e){super(),this._comment=e}toString(){return this._comment instanceof Array?`NOTE
`+this._comment.join(`
`):`NOTE
`+c.lodash.exports.escape(this._comment)}static fromString(e,r=!0){const t=i.isComment(e);if(!t){if(!r)return!1;throw new n("Does not appear to be a valid comment.",e)}return new s(t.groups.text)}}module.exports=s;
