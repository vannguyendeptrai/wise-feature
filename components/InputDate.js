import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function DatePicker({ onChange }) {
  return (
    <div>
      <label htmlFor="date" className="block text-sm font-light text-[#5D7079]">
        Target Date
      </label>
      <div className="relative mt-3 rounded-md shadow-sm">
        <input
          onChange={onChange}
          type="date"
          name="date"
          id="date"
          className="block w-full rounded-md border-gray-300 p-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-[0.875rem] flex items-center pointer-events-none">
          <FontAwesomeIcon
            className="pointer-events-none"
            icon={faCalendar}
            color={"#00B9FF"}
          />
        </div>
      </div>
    </div>
  );
}
