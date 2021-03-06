export default docs => {
  const votesTotal = docs
    .reduce((accumulator, current) => {
      const { anbefalt, smak, trekk, helhet, holdbarhet } = current
      const itemTotalScore = anbefalt + smak + trekk + helhet + holdbarhet
      return accumulator + itemTotalScore
    }, 0)
  return votesTotal > 0 ? Math.floor((votesTotal / docs.length) / 5) : 0
}
