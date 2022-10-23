export default function InputText({ onChange }) {
  return (
    <div>
      <label htmlFor="name" className="block text-sm font-light text-[#5D7079]">
        Name
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <input
          onChange={onChange}
          type="text"
          name="title"
          id="title"
          className="block w-full rounded-md border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Travel"
        />
      </div>
    </div>
  );
}
