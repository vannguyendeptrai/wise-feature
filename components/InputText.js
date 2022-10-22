export default function InputText() {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-light text-[#5D7079]">
        Name
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">Icon</span>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-gray-300 pl-14 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Travel"
        />
      </div>
    </div>
  );
}
