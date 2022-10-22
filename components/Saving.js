import Link from 'next/link'

export default function Saving({ saving }) {
  return (
    <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            Created by 
            <Link href={`/user/${saving.owner.id}`}>
              <a className='ml-1 underline'>{saving.owner.name}</a>
            </Link>{' '}
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Link href={`/saving/${saving.id}`}>
          <a className='flex-shrink text-2xl font-bold color-primary width-auto'>
            {saving.title}
          </a>
        </Link>
            <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                {saving.content}
            </p>
            <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                Goal: {saving.savingGoal}
            </p>
            <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                Deadline: {saving.deadline}
            </p>
            <p className='flex-shrink text-base font-normal color-primary width-auto mt-2'>
                Period: {saving.period}
            </p>
      </div>
    </div>
  )
}