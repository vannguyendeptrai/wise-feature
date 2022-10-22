export default function InputDropdown() {
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
          className="block w-full rounded-md border-gray-300  p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option>Quarterly</option>
          <option>Monthly</option>
          <option>Bi-Weekly</option>
          <option>Weekly</option>
          <option>Daily</option>
        </select>
      </div>
    </div>
  );
}
