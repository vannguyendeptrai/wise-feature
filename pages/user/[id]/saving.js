import Form from "components/Form";
import { Button } from "@material-tailwind/react";

function Input() {
  return (
    <div className="w-full bg-[#f2f5f7] h-28">
      <div
        className="flex flex-col items-center relative
        "
      >
        <div
          className="relative flex-col justify-around bg-[#37517E] w-full h-60
         rounded-b-[3rem] text-center pt-16"
        >
          <h1 className="text-white text-xl">Set a Goal</h1>
        </div>

        <div className="pb-20 pt-14 absolute top-20 drop-shadow-lg">
          <Form />
          <Button
            className="rounded-[2.5rem] w-96 h-16 text-[#00B9FF] border-[#00B9FF] mt-20"
            variant="outlined"
          >
            Create New Goal
          </Button>
        </div>
        <div className="absolute "></div>
      </div>
    </div>
  );
}

export default Input;
