import CurrencyInput from "components/InputCurrency";
import DatePicker from "./InputDate";
import InputDropdown from "./InputDropdown";
import InputName from "./InputName";
import InputDescription from "./InputDescription";
import { Button } from "@material-tailwind/react";

export default function Form({ onSubmit, onChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="pb-20 pt-14 px-5 drop-shadow-lg flex flex-col gap-6 w-96 rounded-3xl bg-white  text-[#5D7079]">
        <InputName onChange={onChange} />
        <InputDescription onChange={onChange} />
        <CurrencyInput onChange={onChange} />
        <DatePicker onChange={onChange} />
        <InputDropdown onChange={onChange} />
      </div>
      <Button
        className="rounded-[2.5rem] w-96 h-16 text-[#00B9FF] border-[#00B9FF] mt-20"
        variant="outlined"
        type="submit"
      >
        Create New Goal
      </Button>
    </form>
  );
}
