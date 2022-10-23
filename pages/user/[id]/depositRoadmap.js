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
                    <div className="relative items-center flex-col justify-around bg-[#37517E] w-full h-60 rounded-b-3xl pt-16">
                    </div>
                    <div className='absolute top-20'>
                        <div className='flex flex-col mb-4 mx-20 my-10'>
                            <Link href={`/`}>
                                <a className='text-white text-xl'>Home</a>
                            </Link>
                        </div>
                        <Card className='w-3/4 min-w-[30rem] flex items-end'>
                            <div className='pr-10 pt-4'>
                                <span>
                                    <svg
                                        width="19"
                                        height="19"
                                        viewBox="0 0 19 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.60952 5.03491L0 10.0698H9.53619L10.5314 7.87556H5.7L8.7219 5.03491L6.96667 2.19427H15.1638L7.6 19H10.441L19 0H2.46095L5.60952 5.03491Z"
                                            fill="#00B9FF"
                                        />
                                    </svg>{' '}{deposits[0].owner.currentPoint}
                                </span>
                            </div>
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