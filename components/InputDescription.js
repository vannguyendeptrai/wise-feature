export default function InputDescription({ onChange }) {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-light text-[#5D7079]">
        Description
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
        <input
          onChange={onChange}
          type="text"
          name="description"
          id="description"
          className="block w-full rounded-md border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Would like to travel with my friends"
        />
      </div>
    </div>
  );
}
