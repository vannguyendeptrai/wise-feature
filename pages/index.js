import Link from "next/link";
import prisma from "lib/prisma";
import { getUsers } from "lib/data.js";
import Users from "components/Users";

export default function Home({ users }) {
  if (!users) return <p className="text-center p-5">Users does not exist 😞</p>;
  return (
    <>
      <div className="w-full bg-[#f2f5f7] h-28">
        <div className="flex flex-col items-center relative">
          <div className="relative bg-[#37517E] w-full h-60 rounded-b-3xl pt-24">
            <div className="text-center">
              <h1 className="text-white text-xl">Welcome!</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-col items-center">
        <Users users={users}></Users>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let users = await getUsers(prisma);
  users = JSON.parse(JSON.stringify(users));
  return {
    props: {
      users,
    },
  };
}
