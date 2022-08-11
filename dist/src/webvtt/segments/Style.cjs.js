"use strict";const n=require("./Segment.cjs.js"),c=require("../../utils.cjs.js"),u=require("../../errors/InvalidStyleError.cjs.js");require("../../../node_modules/lodash/lodash.cjs.js");const t=require("../../../_virtual/lodash.cjs.js");class o extends n{constructor(s,r){super(),this._styles=s,this._selector=r}get styles(){return this._styles}get selector(){return this._selector}toString(){return`STYLE
::cue${this.selector?`(${this.selector})`:""} {
${t.lodash.exports.toPairs(this.styles).map(s=>["	"+t.lodash.exports.kebabCase(s[0]),s[1]].join(": ")).join(`;
`)};
}`}static fromString(s,r=!0){const e=c.isStyle(s);let l={};if(!e){if(!r)return!1;throw new u("STYLE segment seems malformed, make sure its in a valid format.",s)}return e.groups?.styles&&(l=t.lodash.exports.fromPairs(e.groups.styles.replace(/ {2,}/g,"").split(`
`).map(a=>{const i=a.replace(": ",":").replace(";","").split(":");return[t.lodash.exports.camelCase(i[0]),i[1]]}))),new o(l,e.groups?.selector)}}module.exports=o;
