import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUser, getSavingsFromUser } from 'lib/data.js'

import Savings from 'components/Savings'

export default function Profile({user, savings}){
    if (!user) return <p className='text-center p-5'>User does not exist 😞</p>
    return (
        <>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                <a className='underline'>Home</a>
                </Link>
                <p className='grow'></p>
            </header>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <p className='text-center'>/user/{user.id}</p>
            </header>
            <Savings savings={savings} />
            <div className='border border-3 border-black p-10  mx-20 my-10'>
                Await for create new sving coponent to be created
                {/* <Link href={`/saving/submit${user.id}`}>
                    <button
                        className='border-gray-800 border-2 p-4 w-full'
                        >Create New Saving
                    </button>
                </Link> */}
            </div>
        </>
    )
}

export async function getServerSideProps({params}){
    let user = await getUser(params.id, prisma)
	user = JSON.parse(JSON.stringify(user))

    let savings = await getSavingsFromUser(params.id, prisma)
    savings = JSON.parse(JSON.stringify(savings))

    return {
        props: {
            user,
            savings,
        },
    }
}