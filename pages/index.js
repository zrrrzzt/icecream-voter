import { useEffect, useState } from 'react'
import * as FirestoreService from '../lib/firestore-service'
import ListItem from '../components/list'
import calculateScore from '../lib/calculate-score'
const icecreams = require('../lib/data/icescreams.json')

function scoreSort (b, a) {
  return a.score - b.score
}

const HomePage = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const jobs = icecreams.map(icecream => FirestoreService.getVotes(icecream.id))
      const results = await Promise.all(jobs)
      const allVotes = results.map(result => result.docs.map(doc => doc.data()))
      const scores = allVotes.map(vote => calculateScore(vote))
      const icecreamData = icecreams.map((icecream, index) => Object.assign({}, icecream, { score: scores[index] }))
      icecreamData.sort(scoreSort)
      setData(icecreamData)
    })()
  }, [icecreams, setData])
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-mono'>PAWs istest 2020</h1>
        {data.map(icecream => <ListItem {...icecream} key={icecream.id} />)}
      </div>
    </>
  )
}

export default HomePage
