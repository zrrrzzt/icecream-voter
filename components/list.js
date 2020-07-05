import Link from 'next/link'
import { useEffect, useState } from 'react'
import * as FirestoreService from '../lib/firestore-service'
import calculateScore from '../lib/calculate-score'

const Score = props => {
  const { score }   = props
  return (
    <span className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700'>
      {score}/100
    </span>
  )
}

const ListItem = props => {
  const { id, name, producer, image } = props
  const [score, setScore] = useState(false)

  useEffect(() => {
    FirestoreService.getVotes(id).then(vote => {
      const docs = vote.docs.map(doc => doc.data())
      if (docs.length > 0) {
        setScore(calculateScore(docs))
      }
    })
  }, [id, setScore])

  return (
    <Link href={`/${id}`} key={id}>
      <a className='cursor-pointer'>
        <div className='max-w-sm rounded overflow-hidden shadow-lg mb-2'>
          <img className='w-full' src={`images/${image}`} alt={name} />
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {producer}
            </p>
          </div>
          <div className='flex justify-end px-6 py-4'>
            { score && <Score score={score} />}
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>Vis detaljer</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
