import { useSession } from 'next-auth/client'
import ListItem from '../components/list'
import LoginButton from '../components/login-button'
import LoggedInCard from '../components/logged-in-card'
const icecreams = require('../lib/data/icescreams.json')

const HomePage = () => {
  const [session] = useSession()
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-4xl font-mono'>PAWs istest 2020</h1>
      {icecreams.map(ListItem)}
      {!session && <LoginButton />}
      {session && <LoggedInCard user={session.user} />}
    </div>
  )
}

export default HomePage
