import Link from 'next/link'

export default function User({ user }) {
  return (
    <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            User name: 
            <Link href={`/user/${user.id}`}>
              <a className='ml-1 underline'>{user.name}</a>
            </Link>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}