function totalSort (b, a) {
  return a.total - b.total
}

export default docs => {
  const docsWithTotals = docs
    .map(doc => doc.data())
    .map(doc => Object.assign({}, doc, { total: doc.smak + doc.trekk + doc.helhet + doc.holdbarhet + doc.anbefalt }))
  docsWithTotals.sort(totalSort)
  return docsWithTotals[0]
}
