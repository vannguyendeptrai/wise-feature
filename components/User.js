import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

export default function User({ user }) {
  return (
    <>
      {/* <div className='flex flex-col mb-4 border border-3 border-black p-10 bg-gray-200 mx-20 my-10'>
      <div className='flex flex-shrink-0 pb-0 '>
        <div className='flex-shrink-0 block group '>
          <div className='flex items-center text-gray-800'>
            User name:
            <Link href={`/user/${user.id}`}>
              <a className='ml-1 underline'>{user.name}</a>
            </Link>{' '}
          </div>
        </div>
      </div>
      </div> */}

      <div className="mb-4 mx-12 my-10 flex justify-center">
        <Card className="max-w-[25rem]">
          <CardHeader floated={false} className="">
            <img
              src="https://images7.alphacoders.com/123/1237440.jpg"
              alt="profile-picture"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              <Link href={`/user/${user.id}`}>
                <a className="ml-1">Log in as {user.name}</a>
              </Link>
            </Typography>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
