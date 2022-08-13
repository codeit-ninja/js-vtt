class c extends Error {
  constructor(r, o) {
    o && (r = `

${o}

--------
${r}`), super(r);
  }
}
export {
  c as default
};
