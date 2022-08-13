"use strict";const o=require("./Segment.cjs.js"),l=require("../../utils.cjs.js"),n=require("../../errors/InvalidStyleError.cjs.js"),i=require("lodash");class r extends o{constructor(e,s){super(),this._styles=e,this._selector=s}get styles(){return this._styles}get selector(){return this._selector}toString(){return`STYLE
::cue${this.selector?`(${this.selector})`:""} {
${i.toPairs(this.styles).map(e=>["	"+i.kebabCase(e[0]),e[1]].join(": ")).join(`;
`)};
}`}static fromString(e,s=!0){const t=l.getStyle(e);if(!t){if(!s)return!1;throw new n("STYLE segment seems malformed, make sure its in a valid format.",e)}return new r(t.styles,t.selector)}}module.exports=r;
