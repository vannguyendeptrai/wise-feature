import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUser, getDepositsOnUser } from 'lib/data'
import Deposits from 'components/Deposits'

export default function Progress({deposits}){
    return(
        <>
            <header className='bg-black text-white h-12 flex pt-3 px-5 pb-2'>
                <Link href={`/`}>
                    <a className='underline'>Home</a>
                </Link>
                <p className='grow'></p>
            </header>
            <Deposits deposits={deposits} />
        </>
    )
}

export async function getServerSideProps({ params }) {
    let user = await getUser(params.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let deposits = await getDepositsOnUser(params.id, prisma)
    deposits = JSON.parse(JSON.stringify(deposits))

    return {
        props: {
            user,
            deposits,
        },
    }
}