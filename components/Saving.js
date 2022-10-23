import Link from "next/link";
import moment from "moment";
import {
  Progress,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function Saving({ saving }) {
  console.log("saving", saving);
  return (
    <>
      <div className="flex flex-col mb-4 mx-5 my-10 items-center">
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
              {saving.insufficient ? (
                <div>
                  <button
                    type="button"
                    style={{ color: "#00B9FF", backgroundColor: "#F2F5F7" }}
                    className="focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    Insufficient Found
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
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
                  </svg>
                  <span style={{ color: "#253655" }}>
                    +{saving.currentPoint}
                  </span>
                </div>
              )}
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
    </>
  );
}

export async function getServerSideProps({ saving }) {
  console.log(saving.id);
  // let deposits = await getDepositsOnSaving(saving.id, prisma)
  // deposits = JSON.parse(JSON.stringify(deposits))
  // console.log(deposits)
  return {
    props: {
      // deposits
    },
  };
}
