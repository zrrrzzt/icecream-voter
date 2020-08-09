/*
  Extracts data from document snapshot
  Adds timeStamp and total score
 */

const getTimeStamp = snapshot => {
  const key = Object.values(snapshot)
    .filter(value => value ? Object.keys(value).includes('version') : false)
  return key[0].version.timestamp.seconds
}

const extractDocument = documentSnapshot => {
  console.log(documentSnapshot)
  const data = documentSnapshot.data()
  const { anbefalt, smak, trekk, helhet, holdbarhet } = data
  const total = Math.floor((anbefalt + smak + trekk + helhet + holdbarhet) / 5)
  const timeStamp = getTimeStamp(documentSnapshot)
  return { ...data, total, timeStamp }
}

export default extractDocument
