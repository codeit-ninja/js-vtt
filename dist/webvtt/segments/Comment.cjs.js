"use strict";const s=require("./Segment.cjs.js"),o=require("../../errors/InvalidCommentError.cjs.js"),i=require("../../utils.cjs.js"),c=require("lodash");class e extends s{constructor(t){super(),this._comment=t}toString(){return this._comment instanceof Array?`NOTE
`+this._comment.join(`
`):`NOTE
`+c.escape(this._comment)}static fromString(t,n=!0){const r=i.getComment(t);if(!r){if(!n)return!1;throw new o("Does not appear to be a valid comment.",t)}return new e(r.text)}}module.exports=e;
