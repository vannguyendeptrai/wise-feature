import Link from "next/link";
import prisma from "lib/prisma";
import moment from "moment";
import {
  Progress,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function Saving({ saving, deposits }) {
  let sumDeposit = 0
  if(deposits) {
    deposits.forEach((deposit) => {
      sumDeposit += deposit.value
    })
  }

  return (
    <>
      <div className="flex flex-col mb-4 mx-20 my-10 items-center">
        <Card className="w-1/2">
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
              <div>
                <button
                  type="button"
                  style={{ color: "#00B9FF", backgroundColor: "#F2F5F7" }}
                  className="focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
                >
                  Insufficient Found
                </button>
              </div>
            </div>
            <Typography>{saving.content}</Typography>
            <Typography>
              Frequency: {saving.period} - Unit:{" "}
              {saving.calculateUnit !== 0
                ? saving.calculateUnit
                : "End of Month"}
            </Typography>
            <Typography>
              Frequency: {saving.period} - Unit:{" "}
              {saving.calculateUnit !== 0 ? saving.calculateUnit : "1 Month"}
            </Typography>
            <div className="flex justify-between">
              <span style={{ color: "#37517E" }} variant="small">
                ${sumDeposit} / ${saving.savingGoal}
              </span>
              <span style={{ color: "#37517E" }} variant="small">
                { Math.round(sumDeposit * 100 / saving.savingGoal) }%
              </span>
            </div>
            <Progress color={"#008EC0"} value={sumDeposit * 100 / saving.savingGoal} />
          </CardBody>
          <CardFooter divider className="flex items-center justify-end py-3">
            <Typography variant="small">
              {moment(new Date(saving.deadline)).format("ddd, DD MMM, yyyy")}
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps({saving}){

  console.log(saving.id)
  // let deposits = await getDepositsOnSaving(saving.id, prisma)
  // deposits = JSON.parse(JSON.stringify(deposits))
  // console.log(deposits)
  return {
    props: {
      // deposits
    },
  };
}
