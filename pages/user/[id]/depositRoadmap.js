import Link from 'next/link'
import prisma from 'lib/prisma'
import { getUser, getDepositsOnUser } from 'lib/data'
import Deposits from 'components/Deposits'
import {
    Progress,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

export default function DepositRoadmap({ deposits }) {
    console.log("depo: ", deposits);
    return (
        <>
            <div className="w-full bg-[#f2f5f7] h-28">
                <div className="flex flex-col items-center relative">
                    <div className="relative items-center flex-col justify-around bg-[#37517E] w-full h-60 rounded-b-3xl pt-16"></div>
                    {/* <div className='border border-3 border-black p-10  mx-20 my-10'>
                    <p className='ml-4 text-left grow'>{saving.title}</p>
                    <p className='ml-4 text-left grow'>{saving.content}</p>
                    <p className='ml-4 text-left grow'>{saving.savingGoal}</p>
                    <p className='ml-4 text-left grow'>{saving.deadline}</p>
                    <p className='ml-4 text-left grow'>{saving.period}</p>
                    <p className='ml-4 text-left grow'>{saving.unit}</p>
                    </div> */}

                    <div className='absolute top-20'>      
                        <div className='flex flex-col mb-4 mx-20 my-10'>
                                <Link href={`/`}>
                                    <a className='text-white text-xl'>Home</a>
                                </Link>
                        </div>
                        <Card className='w-3/4 min-w-[30rem]'>
                            <div className='flex flex-col mb-4 p-10 mx-20 my-10 items-center'>
                                <ol class="relative border-l-2 border-gray-300 dark:border-gray-700">
                                    <Deposits deposits={deposits} />
                                </ol>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
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