"use strict";const r=require("./webvtt/segments/Cue.cjs.js"),o=require("./webvtt/segments/Comment.cjs.js"),u=require("./utils.cjs.js"),m=require("./webvtt/segments/Header.cjs.js"),a=require("./webvtt/Timings.cjs.js"),h=require("./webvtt/segments/Style.cjs.js"),f=require("./errors/InvalidVttError.cjs.js");class c{_segments=[];_header;constructor(e,t){this._header=new m(e,t),this._segments.push(this._header)}addSegment(e){e instanceof m||this._segments.push(e)}addCue(e,t,s){const n=new r(e,t,s);return this._segments.push(n),n}addComment(e){const t=new o(e);return this._segments.push(t),t}removeTags(){for(const e of this._segments)e instanceof r&&e.removeTags();return this}removeComments(){return this._segments=this._segments.filter(e=>!(e instanceof o)),this}toString(e){if(e==="srt"){let t=1;return this.segments.map(s=>s instanceof r?s.setIdentifier(t++).toString(e):null).filter(s=>s).join(`

`)}return this.segments.map(t=>t.toString()).join(`

`)}get timings(){return new a(this.cues)}get segments(){return this._segments}get header(){return this._header}get cues(){return this._segments.filter(e=>e instanceof r)}get comments(){return this._segments.filter(e=>e instanceof o)}get styles(){return this._segments.filter(e=>e instanceof h)}static fromString(e,t=!0){if(!u.isVtt(e)){if(!t)return!1;throw new f(`Is not a valid WebVTT format.

The structure of a WebVTT consists of the following components, some of them optional, in this order:

- An optional byte order mark (BOM).
- The string "WEBVTT".
`,e)}const s=u.createSegments(e.split(`

`)),n=s.find(g=>g instanceof m),i=new c(n?.description,n?.meta);return s.forEach(i.addSegment.bind(i)),i}}module.exports=c;
