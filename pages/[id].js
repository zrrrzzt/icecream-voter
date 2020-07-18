import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import cogoToast from 'cogo-toast'
import * as FirestoreService from '../lib/firestore-service'
import getIcecream from '../lib/get-icecream'
import calculateScore from '../lib/calculate-score'
import userHasVoted from '../lib/has-voted'
import extractDocument from '../lib/extract-document'
import Error from '../components/error'
import VoteCard from '../components/vote'
import Voter from '../components/voter'

const icecreams = require('../lib/data/icescreams.json')

function totalSort (b, a) {
  return a.total - b.total
}

function timeSort (a, b) {
  return a.timeStamp - b.timeStamp
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

  useEffect(() => {
    const unsubscribe = FirestoreService.streamVotes(id, {
      next: querySnapshot => {
        const updatedVotes = querySnapshot.docs.map(extractDocument)
        if (updatedVotes.length > 0) {
          const lastVote = updatedVotes.sort(timeSort)[updatedVotes.length - 1]
          const msg = `${lastVote.name.split('.')[0]} ga ${(lastVote.total)} poeng`
          cogoToast.info(msg)
        }
        updatedVotes.sort(totalSort)
        setVotes(updatedVotes)
        if (session) {
          const hasVoted = userHasVoted(session.user.email, updatedVotes)
          setVoted(hasVoted)
        }
      },
      error: () => setError('icecream-list-item-fail')
    })
    return unsubscribe
  }, [cogoToast, id, session, setVotes, setVoted, extractDocument])

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

export async function getStaticPaths() {
  const paths = icecreams.map(icecream => ({
    params: { id: icecream.id },
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const icecream = getIcecream(params.id)

  return { props: { icecream } }
}

export default Details
