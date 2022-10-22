import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function DatePicker() {
  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-light text-[#5D7079]"
      >
        Date
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <input
          type="date"
          name="price"
          id="price"
          className="block w-full rounded-md border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <FontAwesomeIcon icon={faCalendar} color={"#00B9FF"} />
        </div>
      </div>
    </div>
  );
}
