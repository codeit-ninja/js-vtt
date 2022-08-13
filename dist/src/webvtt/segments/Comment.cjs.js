"use strict";const s=require("./Segment.cjs.js"),o=require("../../errors/InvalidCommentError.cjs.js"),c=require("../../utils.cjs.js"),i=require("../../../node_modules/lodash-es/escape.cjs.js");class t extends s{constructor(e){super(),this._comment=e}toString(){return this._comment instanceof Array?`NOTE
`+this._comment.join(`
`):`NOTE
`+i(this._comment)}static fromString(e,n=!0){const r=c.getComment(e);if(!r){if(!n)return!1;throw new o("Does not appear to be a valid comment.",e)}return new t(r.text)}}module.exports=t;
