export default props => {
  const { anbefalt, smak, trekk, helhet, holdbarhet } = props
  return (
    <div className='max-w-sm w-full rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>Mine vurderinger</div>
        <div className='flex justify-between bg-pink-100'>
          <span>Smak</span>
          <span className='font-bold'>{smak}</span>
        </div>
        <div className='flex justify-between'>
          <span>Trekk</span>
          <span className='font-bold'>{trekk}</span>
        </div>
        <div className='flex justify-between bg-pink-100'>
          <span>Holdbarhet i varmen</span>
          <span className='font-bold'>{holdbarhet}</span>
        </div>
        <div className='flex justify-between'>
          <span>Helhetsopplevelse</span>
          <span className='font-bold'>{helhet}</span>
        </div>
        <div className='flex justify-between bg-pink-100'>
          <span>Anbefalt til en venn?</span>
          <span className='font-bold'>{anbefalt}</span>
        </div>
        <div className='flex justify-between'>
          <span>Totalt</span>
          <span className='font-bold'>{Math.floor((anbefalt + smak + trekk + helhet + holdbarhet) / 5)}</span>
        </div>
      </div>
    </div>
  )
}
