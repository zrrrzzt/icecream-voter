import { useState, useEffect } from 'react'
import * as FirestoreService from '../lib/firestore-service'
import getIcecream from '../lib/get-icecream'
import VoteCard from '../components/vote'
import VoteReceived from '../components/vote-received'

const Details = ({ icecream }) => {
  const { id, name, producer, image } = icecream
  const [votes, setVotes] = useState()
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    FirestoreService.getVotes(id).then(votes => {
      if (!votes.empty) {
        console.log(votes)
        setVotes(votes)
      } else {
        console.log('no votes')
        setVotes()
      }
    }).catch(console.error)
  }, [id, setVotes])

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
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>68/100</span>
          </div>
          {voted && <VoteReceived />}
        </div>
        {!voted && <VoteCard id={id} setVoted={setVoted} />}
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
