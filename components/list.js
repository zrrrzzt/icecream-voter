import Link from 'next/link'

const ListItem = props => {
  const { id, name, producer, image } = props
  return (
    <Link href={`/${id}`} key={id}>
      <a className='cursor-pointer'>
        <div className='flex h-48'>
          <div>
            <img src={`images/${image}`} className='h-48' />
          </div>
          <div className='flex flex-col justify-center h-full'>
            <h2 className='text-3xl'>{name}</h2>
            <div>{producer}</div>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ListItem
