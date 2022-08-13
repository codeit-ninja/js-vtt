"use strict";const m=require("./Segment.cjs.js"),r=require("../../errors/InvalidCueError.cjs.js"),n=require("../../utils.cjs.js"),g=require("../Timings.cjs.js"),_=require("../../../node_modules/lodash-es/isString.cjs.js");class e extends m{_startTime;_endTime;_text;_identifier;_settings;constructor(t,s,i,h,u){super(),this._startTime=t,this._endTime=s,this._text=i,this._identifier=h,this._settings=u||{}}vertical(t){return this._settings.vertical=t,this}line(t){return this._settings.line=t,this}position(t){return this._settings.position=t,this}size(t){return this._settings.size=t,this}align(t){return this._settings.align=t,this}removeTags(){return this._text=n.stripTags(this.text),this}toString(t){if(t==="srt"){if(!this._identifier||_(this._identifier))throw new r("SRT files must have an identifier, the identifier should represent a numeric counter",`${this._identifier}
${this.timings.toString(t)}
${this._text}`);return this.removeTags(),`${this._identifier}
${this.timings.toString(t)}
${this.text}`}return`${this._identifier!==void 0?this._identifier+`
`:""}${this.timings.toString()}
${this._text}`}clone(){return new e(this._startTime,this._endTime,this._text.toString(),this._identifier)}setStartTime(t){return this._startTime=t,this}setEndTime(t){return this._endTime=t,this}setText(t){return this._text=t,this}setMeta(t){return this._text=JSON.stringify(t,null,4),this}setIdentifier(t){return this._identifier=t,this}get startTime(){return this._startTime}get endTime(){return this._endTime}get text(){return this._text}get identifier(){return this._identifier}get settings(){return this._settings}get timings(){return new g(this)}static fromString(t,s=!0){const i=n.getCue(t);if(!i){if(!s)return!1;throw new r(`
Cue seems malformed, make sure the cue is in a valid format.
            
Expected:
id?
hh:mm:ss.ms --> hh:mm:ss.ms
text_payload
            
            `,t)}return new e(i.startTime,i.endTime,i.text,i.identifier)}}module.exports=e;
