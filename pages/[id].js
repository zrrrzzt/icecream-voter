import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import * as FirestoreService from '../lib/firestore-service'
import getIcecream from '../lib/get-icecream'
import getHighestVote from '../lib/get-highest-vote'
import calculateScore from '../lib/calculate-score'
import userHasVoted from '../lib/has-voted'
import getMyVote from '../lib/get-my-vote'
import HighestVote from '../components/highest-vote'
import LoginButton from '../components/login-button'
import LoggedInCard from '../components/logged-in-card'
import ShowMyVote from '../components/show-my-vote'
import VoteCard from '../components/vote'

const Details = ({ icecream }) => {
  const { id, name, producer, image } = icecream
  const [session] = useSession()
  const [votes, setVotes] = useState([])
  const [error, setError] = useState()
  const [score, setScore] = useState(0)
  const [voted, setVoted] = useState(false)
  const [myVote, setMyVote] = useState(false)
  const [highestVote, setHighestVote] = useState()
  const [voters, setVoters] = useState(0)

  useEffect(() => {
    const unsubscribe = FirestoreService.streamVotes(id, {
        next: querySnapshot => {
            const updatedVotes = 
                querySnapshot.docs.map(docSnapshot => docSnapshot.data())
            setVotes(updatedVotes)
            setScore(calculateScore(updatedVotes))
            setVoters(updatedVotes.length)
            setHighestVote(getHighestVote(updatedVotes))
            if (session) {
              const hasVoted = userHasVoted(session.user.email, updatedVotes)
              const myVote = getMyVote(session.user.email, updatedVotes)
              setVoted(hasVoted)
              if (myVote) {
                setMyVote(myVote)
              }
            }
        },
        error: () => setError('icecream-list-item-fail')
    });
    return unsubscribe;
  }, [id, setVotes]);

  return (
    <>
      <div className='flex flex-col items-center'>
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
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700'>{voters} stemmer</span>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>{score}/100 poeng</span>
          </div>
        </div>
        {!voted && session ? <VoteCard id={id} setVoted={setVoted} user={session.user} /> : null}
        {highestVote && <HighestVote {...highestVote} />}
        {myVote && <ShowMyVote {...myVote} />}
        {!session && <LoginButton />}
        {session && <LoggedInCard user={session.user} />}
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
