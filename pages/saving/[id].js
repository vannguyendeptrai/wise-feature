import Link from 'next/link'
import prisma from 'lib/prisma'
import { getSaving, getDepositsOnSaving } from 'lib/data.js'
import Deposits from 'components/Deposits'

import { useRouter } from 'next/router'

export default function Saving({saving, deposits}){
    const router  = useRouter()

    if(!saving){
        return <p className='text-center p-5'>Saving does not exist 😞</p>
    }

    return(
        <>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                    <a className='underline'>Home</a>
                </Link>
                <p className='grow'></p>
                </header>
                <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <p className='text-center'>/saving/{saving.id}</p>
            </header>
            <div className='border border-3 border-black p-10  mx-20 my-10'>
                <p className='ml-4 text-left grow'>{saving.title}</p>
                <p className='ml-4 text-left grow'>{saving.content}</p>
                <p className='ml-4 text-left grow'>{saving.savingGoal}</p>
                <p className='ml-4 text-left grow'>{saving.deadline}</p>
                <p className='ml-4 text-left grow'>{saving.period}</p>
            </div>
            <div className='border border-3 border-black p-10  mx-20 my-10'>
                <button
                className='border-gray-800 border-2 p-4 w-full'
                onClick={() => {
                    router.push(`/saving/deposit/submit`)
                }}
                >Create New Deposit</button>
            </div>
            <Deposits deposits={deposits} />
        </>
    )
}

export async function getServerSideProps({params}){
    let saving = await getSaving(params.id, prisma)
	saving = JSON.parse(JSON.stringify(saving))

    let deposits = await getDepositsOnSaving(params.id, prisma)
    deposits = JSON.parse(JSON.stringify(deposits))

    return {
        props: {
            saving,
            deposits,
        },
    }
}