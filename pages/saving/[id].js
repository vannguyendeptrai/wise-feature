import Link from "next/link";
import prisma from "lib/prisma";
import { getSaving, getDepositsOnSaving } from "lib/data.js";
import Deposits from "components/Deposits";
import moment from "moment";
import {
  Progress,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import { useRouter } from "next/router";

export default function Saving({ saving, deposits }) {
  console.log("here", saving);

  const router = useRouter();

  if (!saving) {
    return <p className="text-center p-5">Saving does not exist 😞</p>;
  }

  return (
    <>
      <div className="w-full bg-[#f2f5f7] h-28">
        <div className="flex flex-col items-center relative">
          <div className="px-5 flex justify-between relative bg-[#37517E] w-full h-60 rounded-b-3xl pt-24">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.79 7.41005C18.3367 7.95678 18.3367 8.84322 17.79 9.38995L13.1799 14L17.79 18.6101C18.3367 19.1568 18.3367 20.0432 17.79 20.5899C17.2433 21.1367 16.3568 21.1367 15.8101 20.5899L10.2101 14.9899C9.66337 14.4432 9.66337 13.5568 10.2101 13.0101L15.8101 7.41005C16.3568 6.86332 17.2433 6.86332 17.79 7.41005Z"
                  fill="#00B9FF"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-xl text-white">Progress Detail</h1>
            </div>
            <Link href={`/`}>
              <a className="text-white text-xl">Home</a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col mb-4 mx-20 my-10 items-center">
        <Card className="min-w-[25rem]">
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
                {Math.round((saving.currentDeposit * 100) / saving.savingGoal)}%
              </span>
            </div>
            <Progress
              color={"#008EC0"}
              value={(saving.currentDeposit * 100) / saving.savingGoal}
            />
          </CardBody>
          <CardFooter
            divider
            className="flex items-center justify-between py-3"
          >
            <Typography variant="small">
              Deposit Frequency: {saving.period}
            </Typography>
            <Typography variant="small">
              {moment(new Date(saving.deadline)).format("ddd, DD MMM, yyyy")}
            </Typography>
          </CardFooter>
        </Card>
      </div>

      <div className="flex flex-col mb-4 mx-20 my-10 items-center">
        <ol class="relative border-l-2 border-gray-300 dark:border-gray-700">
          <Deposits deposits={deposits} />
        </ol>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let saving = await getSaving(params.id, prisma);
  saving = JSON.parse(JSON.stringify(saving));

  let deposits = await getDepositsOnSaving(params.id, prisma);
  deposits = JSON.parse(JSON.stringify(deposits));

  return {
    props: {
      saving,
      deposits,
    },
  };
}
