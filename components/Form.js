import CurrencyInput from "components/InputCurrency";
import DatePicker from "./InputDate";
import InputDropdown from "./InputDropdown";
import InputText from "./InputText";

export default function Form() {
  return (
    <div className="flex flex-col gap-6 w-96 rounded-3xl bg-white pb-20 pt-8 px-5 text-[#5D7079]">
      <InputText />
      <CurrencyInput />
      <DatePicker />
      <InputDropdown />
    </div>
  );
}
