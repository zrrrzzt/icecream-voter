import { signIn, signOut, useSession } from 'next-auth/client'

const Menu = () => {
  const [session] = useSession()

  const handleFrontPage = () => {
    window.location = '/'
  }

  const LoginButton = () => {
    return (
      <button onClick={signIn} className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease'>
        Logg inn
      </button>
    )
  }

  const LogoutButton = () => {
    return (
      <button onClick={signOut} className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease'>
        Logg ut
      </button>
    )
  }

  const HomeButton = () => {
    return (
      <button onClick={handleFrontPage} className='bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease'>
        Forsiden
      </button>
    )
  }

  return (
    <nav className='flex justify-center p-4'>
      <div>
        <HomeButton />
      </div>
      <div>
        {session ? <LogoutButton /> : <LoginButton />}
      </div>
    </nav>
  )
}

export default Menu
