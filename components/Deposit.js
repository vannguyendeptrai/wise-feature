import { faL } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import moment from "moment";

export default function Deposit({ deposit }) {
  return (
    <>
      <div>
        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <svg
            aria-hidden="true"
            className="w-3 h-3 text-blue-600 dark:text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Added to deposit: ${deposit.value}
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            +{deposit.point}
          </span>
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {moment(new Date(deposit.targetDate)).format(
            "ddd, DD MMM, yyyy"
          )}
        </time>
        {deposit.stage === "In Progress" ? (
          <div
            className="p-1 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Stage:</span> {deposit.stage}
          </div>
        ) : (
          <></>
        )}
        {deposit.stage === "Completed" ? (
          <div
            className="p-1 mb-4 text-sm text-green-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Stage:</span> {deposit.stage}
          </div>
        ) : (
          <></>
        )}
        {deposit.stage === "Overdue" ? (
          <div
            className="p-1 mb-4 text-sm text-red-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Stage:</span> {deposit.stage}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

{
  /* {deposit.point} Adding point for deposit in database first*/
}
{
  /* {deposit.createAt} Adding point for deposit in database first*/
}
