import Link from 'next/link'

const ListItem = props => {
  const { id, name, producer, image, score, votes, voted, isLoggedIn } = props
  return (
    <Link href={`/${id}`}>
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
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700'>{votes} stemmer</span>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 mr-2 text-sm font-semibold text-gray-700'>{score}/100</span>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>{!isLoggedIn ? 'Vis detaljer' : voted ? 'Vis resultat' : 'Gi din stemme'}</span>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
