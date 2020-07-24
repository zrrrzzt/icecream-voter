/*
  Extracts data from document snapshot
  Adds timeStamp and total score
 */

export default documentSnapshot => {
  const data = documentSnapshot.data()
  const { anbefalt, smak, trekk, helhet, holdbarhet } = data
  const total = Math.floor((anbefalt + smak + trekk + helhet + holdbarhet) / 5)
  const timeStamp = documentSnapshot.Vd.version.timestamp.seconds
  return { ...data, total, timeStamp }
}
