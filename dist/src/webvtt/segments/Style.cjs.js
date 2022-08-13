"use strict";const o=require("./Segment.cjs.js"),i=require("../../utils.cjs.js"),n=require("../../errors/InvalidStyleError.cjs.js"),l=require("../../../node_modules/lodash-es/toPairs.cjs.js"),c=require("../../../node_modules/lodash-es/kebabCase.cjs.js");class r extends o{constructor(e,s){super(),this._styles=e,this._selector=s}get styles(){return this._styles}get selector(){return this._selector}toString(){return`STYLE
::cue${this.selector?`(${this.selector})`:""} {
${l(this.styles).map(e=>["	"+c(e[0]),e[1]].join(": ")).join(`;
`)};
}`}static fromString(e,s=!0){const t=i.getStyle(e);if(!t){if(!s)return!1;throw new n("STYLE segment seems malformed, make sure its in a valid format.",e)}return new r(t.styles,t.selector)}}module.exports=r;
