import getIcecream from '../lib/get-icecream'

const Details = ({ icecream }) => {
  const { id, name, producer, image } = icecream
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-mono'>{ name }</h1>
      <img src={`/images/${image}`} />
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