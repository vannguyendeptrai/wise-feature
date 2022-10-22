import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUser, getSavingsFromUser } from 'lib/data.js'
import { Button } from "@material-tailwind/react";


import Savings from 'components/Savings'
import NewSaving from 'components/NewSaving'

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
            <Button variant="outlined">outlined</Button>
            <div className='border border-3 border-black p-10  mx-20 my-10'>
                <NewSaving user={user}/>
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