"use strict";const o=require("../Text.cjs.js"),d=require("./Segment.cjs.js"),u=require("../../errors/InvalidCueError.cjs.js"),e=require("../../utils.cjs.js"),g=require("../Timings.cjs.js");require("../../../node_modules/lodash/lodash.cjs.js");const m=require("../../../_virtual/lodash.cjs.js");class s extends d{_startTime;_endTime;_text;_identifier;_settings;constructor(t,r,i,n,h){super(),this._startTime=t,this._endTime=r,this._text=new o(i),this._identifier=n,this._settings=h||{}}vertical(t){return this._settings.vertical=t,this}line(t){return this._settings.line=t,this}position(t){return this._settings.position=t,this}size(t){return this._settings.size=t,this}align(t){return this._settings.align=t,this}removeTags(){return this._text=new o(e.stripTags(this.text.toString())),this}toString(t){if(t==="srt"){if(!this._identifier||m.lodash.exports.isString(this._identifier))throw new u("SRT files must have an identifier, the identifier should represent a numeric counter",`${this._identifier}
${this.timings.toString(t)}
${this._text.toString(t)}`);return`${this._identifier}
${this.timings.toString(t)}
${this._text.toString(t)}`}return`${this._identifier!==void 0?this._identifier+`
`:""}${this.timings.toString()}
${this._text.toString()}`}clone(){return new s(this._startTime,this._endTime,this._text.toString(),this._identifier)}setStartTime(t){return this._startTime=t,this}setEndTime(t){return this._endTime=t,this}setText(t){return this._text=new o(t),this}setIdentifier(t){return this._identifier=t,this}get startTime(){return this._startTime}get endTime(){return this._endTime}get text(){return this._text}get identifier(){return this._identifier}get settings(){return this._settings}get timings(){return new g(this)}static fromString(t,r=!0){const i=e.isCue(t);if(!i){if(!r)return!1;throw new u(`Cue seems malformed, make sure the cue is in a valid format.

Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload

`,t)}const n=i.groups.timings.split(" --> ")[0],h=i.groups.timings.split(" --> ")[1];return new s(e.hmsToSeconds(n),e.hmsToSeconds(h),i.groups.text,i.groups.identifier)}}module.exports=s;
