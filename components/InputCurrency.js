export default function CurrencyInput({ onChange }) {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-light text-[#5D7079]"
      >
        Target Amount
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-[#00B9FF] sm:text-sm">$</span>
        </div>
        <input
          onChange={onChange}
          type="text"
          name="target"
          id="target"
          className="block w-full rounded-md border-gray-300 pl-7 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            onChange={onChange}
            defaultValue="Select"
            id="currency"
            name="currency"
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-[#00B9FF] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option hidden disabled>
              Select
            </option>
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
    </div>
  );
}
