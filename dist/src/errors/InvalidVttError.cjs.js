"use strict";class e extends Error{constructor(c,r){r&&(c=`

Received:

${r.length>100?r.slice(0,100)+"...":r}

--------
${c}`),super(c)}}module.exports=e;
