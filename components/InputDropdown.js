import { periods } from "lib/data";
export default function InputDropdown() {
  const frequency = periods.map((each) => {
    return <option key={each}>{each}</option>;
  });
  return (
    <div>
      <label
        htmlFor="Frequency"
        className="block text-sm font-light text-[#5D7079]"
      >
        Deposit Frequency
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <label htmlFor="frequency" className="sr-only">
          Frequency
        </label>
        <select
          id="frequency"
          name="frequency"
          className="block w-full rounded-md  p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          {frequency}
        </select>
      </div>
    </div>
  );
}
