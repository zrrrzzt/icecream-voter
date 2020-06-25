import Link from 'next/link'

const ListItem = props => {
  const { id, name, producer, image } = props
  return (
    <Link href={`/${id}`} key={id}>
      <a className='cursor-pointer'>
        <div className='max-w-sm rounded overflow-hidden shadow-lg'>
          <img className='w-full' src={`images/${image}`} alt={name} />
          <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>{name}</div>
            <p className='text-gray-700 text-base'>
              {producer}
            </p>
          </div>
          <div className='flex justify-end px-6 py-4'>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>Vis detaljer</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
