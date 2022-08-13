class d extends Error {
  constructor(r, o) {
    o && (r = `

${o}

--------
${r}`), super(r);
  }
}
export {
  d as default
};
