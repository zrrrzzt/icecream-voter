const MyVote = props => {
  const { image, anbefalt, smak, trekk, helhet, holdbarhet, total, name } = props
  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='flex justify-between'>
          <div>
            <img src={image} className='w-24' />
          </div>
          <div className='flex flex-col'>
            <span className='text-right'>{name.split('.')[0]}</span>
            <span className='font-bold text-right'>{Math.floor(total / 5)}/100 poeng</span>
          </div>
        </div>
        <div className='flex justify-between bg-pink-100'>
          <span>Smak</span>
          <span className='font-bold'>{smak}</span>
        </div>
        <div className='flex justify-between'>
          <span>Trekk</span>
          <span className='font-bold'>{trekk}</span>
        </div>
        <div className='flex justify-between bg-pink-100'>
          <span>Holdbarhet i varmen</span>
          <span className='font-bold'>{holdbarhet}</span>
        </div>
        <div className='flex justify-between'>
          <span>Helhetsopplevelse</span>
          <span className='font-bold'>{helhet}</span>
        </div>
        <div className='flex justify-between bg-pink-100'>
          <span>Anbefalt til en venn?</span>
          <span className='font-bold'>{anbefalt}</span>
        </div>
      </div>
    </div>
  )
}

const OtherVote = props => {
  const { name, image, total } = props
  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='flex justify-between'>
          <div>
            <img src={image} className='w-24' />
          </div>
          <div className='flex flex-col'>
            <span className='text-right'>{name.split('.')[0]}</span>
            <span className='font-bold text-right'>{Math.floor(total / 5)}/100 poeng</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default props => {
  const { session, user } = props
  return session && session.user.email === user ? <MyVote {...props}/> : <OtherVote {...props} /> 
}
