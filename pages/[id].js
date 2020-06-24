import getIcecream from '../lib/get-icecream'

const Details = ({ icecream }) => {
  const { name, producer, image } = icecream
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-mono'>{name}</h1>
      <div class='max-w-sm rounded overflow-hidden shadow-lg'>
          <img class='w-full' src={`images/${image}`} alt={name} />
          <div class='px-6 py-4'>
            <div class='font-bold text-xl mb-2'>{name}</div>
            <p class='text-gray-700 text-base'>
              {producer}
            </p>
          </div>
        </div>
    </div>
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
