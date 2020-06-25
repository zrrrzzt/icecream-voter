export default props => {
  const handleLogout = () => {
    window.location = '/api/auth/signout'
  }

  return (
    <button onClick={handleLogout} className='mt-4 bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease'>
      Logg ut
    </button>
  )
}
