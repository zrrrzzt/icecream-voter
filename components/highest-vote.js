export default props => {
  const { name, image, total } = props
  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>Best likt av</div>
        <div>
          <img src={image} />
        </div>
        <div className='flex justify-between'>
          <span>{name.split('.')[0]}</span>
          <span className='font-bold'>{Math.floor(total / 5)}/100</span>
        </div>
      </div>
    </div>
  )
}
