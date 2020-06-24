import Link from 'next/link'

const ListItem = props => {
  const { id, name, producer, image } = props
  return (
    <Link href={`/${id}`} key={id}>
      <a className='cursor-pointer'>
        <div class='max-w-sm rounded overflow-hidden shadow-lg'>
          <img class='w-full' src={`images/${image}`} alt={name} />
          <div class='px-6 py-4'>
            <div class='font-bold text-xl mb-2'>{name}</div>
            <p class='text-gray-700 text-base'>
              {producer}
            </p>
          </div>
          <div class='flex justify-end px-6 py-4'>
            <span class='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>68/100</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
