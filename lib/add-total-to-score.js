export default docs => {
  return docs
    .map(doc => Object.assign({}, doc, { total: doc.smak + doc.trekk + doc.helhet + doc.holdbarhet + doc.anbefalt }))
}
