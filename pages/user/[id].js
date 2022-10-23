import Link from "next/link";
import prisma from "lib/prisma";
import { getUser, calculateSavingsOfUser } from "lib/data.js";
import { Button } from "@material-tailwind/react";

import Savings from "components/Savings";
import NewSaving from "components/NewSaving";

export default function Profile({ user, savings }) {
  if (!user) return <p className="text-center p-5">User does not exist 😞</p>;
  return (
    <>
      <div className="w-full bg-[#f2f5f7] h-28">
        <div className="flex flex-col items-center relative">
          <div className="px-5 flex justify-between lg:px-[35%]  relative bg-[#37517E] w-full h-60 rounded-b-3xl pt-24">
            <div className="cursor-pointer">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.79 7.41005C18.3367 7.95678 18.3367 8.84322 17.79 9.38995L13.1799 14L17.79 18.6101C18.3367 19.1568 18.3367 20.0432 17.79 20.5899C17.2433 21.1367 16.3568 21.1367 15.8101 20.5899L10.2101 14.9899C9.66337 14.4432 9.66337 13.5568 10.2101 13.0101L15.8101 7.41005C16.3568 6.86332 17.2433 6.86332 17.79 7.41005Z"
                  fill="#00B9FF"
                />
              </svg>
            </div>
            <div className="text-center">
              <Link href={`/`}>
                <a className="font-sans text-xl text-white">My Progress</a>
              </Link>{" "}
            </div>

            <div className="flex gap-1 text-white">
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
                </svg>{" "}
              </span>
              {user.currentPoint}
            </div>
          </div>
        </div>
      </div>

      <Savings savings={savings} />
      <div className="flex flex-col gap-3 mb-4 my-10 items-center">
        <Link href={`${user.id}/saving`}>
          <Button className="w-[25rem]" variant="outlined">
            Create New Goal
          </Button>
        </Link>
        <Link href={`${user.id}/depositRoadmap`}>
          <Button className="w-[25rem]" variant="outlined">
            Deposit Roadmap
          </Button>
        </Link>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  let savings = await calculateSavingsOfUser(params.id, prisma);
  savings = JSON.parse(JSON.stringify(savings));

  let user = await getUser(params.id, prisma);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      user,
      savings,
    },
  };
}
