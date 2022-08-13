"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const o=require("./constants.cjs.js"),T=require("./webvtt/segments/Cue.cjs.js"),g=require("./webvtt/segments/Comment.cjs.js"),d=require("./webvtt/segments/Header.cjs.js"),c=require("lodash"),_=require("./webvtt/segments/Style.cjs.js");function C(t){const s=[];return t.forEach(e=>{const r=E(e)?d.fromString(e,!1):!1,i=m(e)?T.fromString(e,!1):!1,n=u(e)?g.fromString(e,!1):!1,f=p(e)?_.fromString(e,!1):!1;r&&s.push(r),i&&s.push(i),n&&s.push(n),f&&s.push(f)}),s}function a(t){let s=t.split(":"),e=0,r=1;for(;s.length>0;)e+=r*parseFloat(s.pop()),r*=60;return e}function l(t){return new Date(t*1e3).toISOString().substr(11,12)}const G=t=>o.VTT_VALIDATION_REGEX.test(t),E=t=>o.SEGMENT_HEADER_REGEX.test(t),m=t=>o.SEGMENT_CUE_REGEX.test(t),u=t=>o.SEGMENT_COMMENT_REGEX.test(t),p=t=>o.SEGMENT_STYLE_REGEX.test(t),h=t=>{if(!E(t))return!1;const{description:s,meta:e}=t.match(o.SEGMENT_HEADER_REGEX).groups;let r={};return e&&(r=c.fromPairs(e.split(`
`).map(i=>i.split(":").map(n=>n.replace(/^\s/,""))))),{description:s,meta:c.isEmpty(r)?void 0:r}},j=t=>{if(!m(t))return!1;const{identifier:s,timings:e,text:r}=t.match(o.SEGMENT_CUE_REGEX).groups,i=e.split(" --> ")[0],n=e.split(" --> ")[1];return{identifier:s,startTime:a(i),endTime:a(n),text:r}},y=t=>{if(!u(t))return!1;const{text:s}=t.match(o.SEGMENT_COMMENT_REGEX).groups;return{text:s}},M=t=>{if(!p(t))return!1;const{styles:s,selector:e}=t.match(o.SEGMENT_STYLE_REGEX).groups;return{styles:c.fromPairs(s.replace(/ {2,}/g,"").split(`
`).map(i=>{const n=i.replace(": ",":").replace(";","").split(":");return[c.camelCase(n[0]),n[1]]})),selector:e}},S=(t,s,e)=>l(t)+" --> "+l(s)+(e?" "+c.toPairs(e).map(r=>r.join(":")).join(" "):""),N=(t,s)=>S(t,s).replaceAll(".",","),R=t=>t.replace(/<\/?[^>]+(>|$)/g,"");exports.createSegments=C;exports.getComment=y;exports.getCue=j;exports.getHeader=h;exports.getStyle=M;exports.hmsToSeconds=a;exports.isComment=u;exports.isCue=m;exports.isHeader=E;exports.isStyle=p;exports.isVtt=G;exports.secondsToHms=l;exports.stripTags=R;exports.toSrtTimingString=N;exports.toVttTimingString=S;
