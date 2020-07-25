import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import * as FirestoreService from '../lib/firestore-service'
import ListItem from '../components/list'
import userHasVoted from '../lib/has-voted'
import calculateScore from '../lib/calculate-score'
const icecreams = require('../lib/data/icescreams.json')

function scoreSort (b, a) {
  return a.score - b.score
}

function checkUserVote (session, votes) {
  return session ? userHasVoted(session.user.email, votes) : false
}

const HomePage = () => {
  const [session] = useSession()
  const [data, setData] = useState(icecreams)

  useEffect(() => {
    (async () => {
      const jobs = icecreams.map(icecream => FirestoreService.getVotes(icecream.id))
      const results = await Promise.all(jobs)
      const allVotes = results.map(result => result.docs.map(doc => doc.data()))
      const scores = allVotes.map(vote => calculateScore(vote))
      const icecreamData = icecreams.map((icecream, index) => Object.assign({}, icecream, { score: scores[index], votes: allVotes[index].length, voted: checkUserVote(session, allVotes[index]), isLoggedIn: !!session }))
      icecreamData.sort(scoreSort)
      setData(icecreamData)
    })()
  }, [session])
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
