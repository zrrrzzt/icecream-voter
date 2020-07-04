export default props => {
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
