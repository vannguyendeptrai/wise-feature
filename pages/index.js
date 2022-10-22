
import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUsers } from 'lib/data.js'
import Users from 'components/Users'

export default function Home({users}) {  
    if (!users) return <p className='text-center p-5'>Users does not exist 😞</p>
    return (
        <>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                <a className='underline'>Home</a>
                </Link>
                <p className='grow'></p>
            </header>
            <Users users={users}></Users>
            <div className='border border-3 border-black p-10  mx-20 my-10'>
            </div>
        </>
    )
  
}

export async function getServerSideProps(){
  let users = await getUsers(prisma)
  users = JSON.parse(JSON.stringify(users))
  return {
      props: {
          users,
      },
  }
}