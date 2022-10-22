import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUser, getSavingsFromUser } from 'lib/data.js'
import { Button } from "@material-tailwind/react";


import Savings from 'components/Savings'
import NewSaving from 'components/NewSaving'

export default function Profile({ user, savings }) {
    if (!user) return <p className='text-center p-5'>User does not exist 😞</p>
    return (
        <>
            <header style={{backgroundColor: '#37517E'}} className='text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                    <a className='font-sans text-3xl'>Home</a>
                </Link>
            </header>
            <header style={{backgroundColor: '#37517E'}} className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <p className='text-center'>User ID: {user.id}</p>
            </header>
            <div className='flex flex-col mb-4 mx-20 my-10 items-center'>
                <div className='w-1/2' >
                    <span>111</span>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.60952 5.03491L0 10.0698H9.53619L10.5314 7.87556H5.7L8.7219 5.03491L6.96667 2.19427H15.1638L7.6 19H10.441L19 0H2.46095L5.60952 5.03491Z" fill="#00B9FF" />
                    </svg>
                </div>
            </div>
            <Savings savings={savings} />
            <div className='flex flex-col mb-4 mx-20 my-10 items-center'>
                <Button className='w-1/2' variant="outlined">Create New Goal</Button>
            </div>
            <div className='border border-3 border-black p-10  mx-20 my-10'>
                <NewSaving user={user} />
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
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