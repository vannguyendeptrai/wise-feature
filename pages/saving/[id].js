import Link from 'next/link'
import prisma from 'lib/prisma'
import { getSaving, getDepositsOnSaving } from 'lib/data.js'
import Deposits from 'components/Deposits'
import moment from "moment";
import {
    Progress,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";

import { useRouter } from 'next/router'

export default function Saving({ saving, deposits }) {
    console.log("here", saving);

    const router = useRouter()

    if (!saving) {
        return <p className='text-center p-5'>Saving does not exist 😞</p>
    }

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
                        <div className="flex flex-col mb-4 mx-20 my-10 items-center">
                            <Card className='w-3/4 min-w-[30rem]'>
                                <CardBody>
                                    <div className="flex justify-between">
                                        <div>
                                            <Typography variant="h5" className="mb-2">
                                                <Link href={`/saving/${saving.id}`}>
                                                    <a
                                                        style={{ color: "#253655" }}
                                                        className="flex-shrink text-2xl font-bold width-auto"
                                                    >
                                                        {saving.title}
                                                    </a>
                                                </Link>
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography>{saving.content}</Typography>
                                    <div className="flex justify-between">
                                        <span style={{ color: "#37517E" }} variant="small">
                                            ${saving.currentDeposit} / ${saving.savingGoal}
                                        </span>
                                        <span style={{ color: "#37517E" }} variant="small">
                                            {Math.round(saving.currentDeposit * 100 / saving.savingGoal)}%
                                        </span>
                                    </div>
                                    <Progress color={"#008EC0"} value={saving.currentDeposit * 100 / saving.savingGoal} />
                                </CardBody>
                                <CardFooter divider className="flex items-center justify-between py-3">
                                    <Typography variant="small">Deposit Frequency: {saving.period}</Typography>
                                    <Typography variant="small">{moment(new Date(saving.deadline)).format('ddd, DD MMM, yyyy')}</Typography>
                                </CardFooter>
                            </Card>
                        </div>

                        <div className='flex flex-col mb-4 p-10 mx-20 my-10 items-center'>
                            <ol class="relative border-l-2 border-gray-300 dark:border-gray-700">
                                <Deposits deposits={deposits} />
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
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