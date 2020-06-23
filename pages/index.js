import ListItem from '../components/list'
const icecreams = require('../lib/data/icescreams.json')

const HomePage = () => {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-mono'>PAWs istest 2020</h1>
      { icecreams.map(ListItem) }
    </div>
  )
}

export default HomePage
