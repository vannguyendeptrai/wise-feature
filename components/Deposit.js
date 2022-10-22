import Link from 'next/link'

export default function Deposit({ deposit }) {
    console.log(deposit);
  return (
    <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            Link to
            <Link href={`/saving/${deposit.savingId}`}>
              <a className='ml-1 underline'>{deposit.savingId}</a>
            </Link>{' '}
          </div>
        </div>
      </div>
      <div className='mt-5'>
          <p className='flex-shrink text-2xl font-bold color-primary width-auto'>
            Deposit to Goal: {deposit.value}
          </p>
        {/* {deposit.point} Adding point for deposit in database first*/}
        {/* {deposit.createAt} Adding point for deposit in database first*/}
      </div>
    </div>
  )
}