const VoteCard = () => {
  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>Gi din stemme</div>
        <div>
          <label for='smak'>Smak</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' />
        </div>
        <div>
          <label for='smak'>Smak</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' />
        </div>
        <div>
          <label for='smak'>Smak</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' />
        </div>
        <div>
          <label for='smak'>Smak</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' />
        </div>
        <div>
          <label for='smak'>Smak</label>
          <input type='range' min='0' max='100' className='w-full' name='smak' id='smak' />
        </div>
        <div className='flex justify-end'>
          <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
            Registrer
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoteCard
