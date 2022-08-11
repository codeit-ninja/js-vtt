class l extends Error {
  constructor(e, r) {
    r && (e = `

Received:

${r.length > 100 ? r.slice(0, 100) + "..." : r}

--------
${e}`), super(e);
  }
}
export {
  l as default
};
