import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { useToasts } from 'react-toast-notifications'
import * as FirestoreService from '../lib/firestore-service'
import getIcecream from '../lib/get-icecream'
import calculateScore from '../lib/calculate-score'
import userHasVoted from '../lib/has-voted'
import addTotalToScore from '../lib/add-total-to-score'
import Error from '../components/error'
import VoteCard from '../components/vote'
import Voter from '../components/voter'

function totalSort (b, a) {
  return a.total - b.total
}

const Voters = props => {
  const { voters } = props
  return (
    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700'>
      {voters} stemmer
    </span>
  )
}

const Score = props => {
  const { votes } = props
  const score = votes.length > 0 ? calculateScore(votes) : 0
  return (
    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
      {score}/100 poeng
    </span>
  )
}

const Details = ({ icecream }) => {
  const { id, name, producer, image } = icecream
  const [session] = useSession()
  const [votes, setVotes] = useState([])
  const [error, setError] = useState()
  const [voted, setVoted] = useState(false)
  const { addToast } = useToasts()

  useEffect(() => {
    const unsubscribe = FirestoreService.streamVotes(id, {
      next: querySnapshot => {
        const updatedVotes =
                querySnapshot.docs.map(docSnapshot => docSnapshot.data())
        const votesWithTotals = addTotalToScore(updatedVotes)
        const lastVote = votesWithTotals[votesWithTotals.length - 1]
        votesWithTotals.sort(totalSort)
        if (lastVote) {
          addToast(`${lastVote.name.split('.')[0]} ga ${Math.floor(lastVote.total / 5)} poeng`, { appearance: 'info' })
        }
        setVotes(votesWithTotals)
        if (session) {
          const hasVoted = userHasVoted(session.user.email, updatedVotes)
          setVoted(hasVoted)
        }
      },
      error: () => setError('icecream-list-item-fail')
    })
    return unsubscribe
  }, [id, setVotes, session])

  return (
    <>
      <div className='flex flex-col items-center mb-4'>
        <h1 className='text-4xl font-mono'>{name}</h1>
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
          <img className='w-full' src={`images/${image}`} alt={name} />
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {producer}
            </p>
          </div>
          <div className='flex justify-end px-6 py-4'>
            <Voters voters={votes ? votes.length : 0} />
            <Score votes={votes} />
          </div>
        </div>
        {!voted && session ? <VoteCard id={id} setVoted={setVoted} user={session.user} /> : null}
        {votes.map((vote, index) => <Voter {...vote} key={index} session={session} />)}
        {error && <Error error={error} />}
      </div>
    </>
  )
}

Details.getInitialProps = async ({ req }) => {
  const path = req ? req.url : window.location.pathname
  const list = path.split('/')
  const id = list.length > 0 ? list.pop() : '5ac0f9e3-e94b-48b8-93d9-1d932fc6d3d9'
  const icecream = getIcecream(id)
  return { icecream }
}

export default Details
