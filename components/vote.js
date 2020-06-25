import { useState } from 'react'
import { addVote } from '../lib/firestore-service'

const VoteCard = props => {
  const { id, setVoted, user } = props
  const [smak, setSmak] = useState(50)
  const [trekk, setTrekk] = useState(50)
  const [holdbarhet, setHoldbarhet] = useState(50)
  const [helhet, setHelhet] = useState(50)
  const [anbefalt, setAnbefalt] = useState(50)

  const handleVote = () => {
    const vote = {
      smak,
      trekk,
      holdbarhet,
      helhet,
      anbefalt,
      user: user.email,
      image: user.image
    }
    addVote(vote, id)
    setVoted(true)
  }

  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>Gi din stemme</div>
        <div>
          <label htmlFor='smak'>Smak ({smak})</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' onChange={event => setSmak(event.target.valueAsNumber)} />
        </div>
        <div>
          <label htmlFor='trekk'>Trekk ({trekk})</label>
          <input type='range' min='0' max='100' className='w-full' name='trekk' id='trekk' onChange={event => setTrekk(event.target.valueAsNumber)} />
        </div>
        <div>
          <label htmlFor='holdbarhet'>Holdbarhet i varmen ({holdbarhet})</label>
          <input type='range' min='0' max='100' className='w-full' name='holdbarhet' id='holdbarhet' onChange={event => setHoldbarhet(event.target.valueAsNumber)} />
        </div>
        <div>
          <label htmlFor='helhet'>Helhetsopplevelse ({helhet})</label>
          <input type='range' min='0' max='100' className='w-full' name='helhet' id='helhet' onChange={event => setHelhet(event.target.valueAsNumber)} />
        </div>
        <div>
          <label htmlFor='anbefalt'>Anbefalt til en venn? ({anbefalt})</label>
          <input type='range' min='0' max='100' className='w-full' name='anbefalt' id='anbefalt' onChange={event => setAnbefalt(event.target.valueAsNumber)} />
        </div>
        <div className='flex justify-end'>
          <button onClick={handleVote} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
            Stem
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoteCard
