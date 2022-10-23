import React, { useReducer, useState } from "react";
import Form from "components/Form";
import { calculateUnits } from "lib/data";
import { useRouter } from "next/router";
import Link from "next/link";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

function Input() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const userID = router.query.id;

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    if (
      Object.keys(formData).length < 6 &&
      !Object.values(formData).includes("Select")
    ) {
      alert("Please fill all the fields");
      return;
    }
    var unit = calculateUnits[0];
    switch (formData.frequency) {
      case "Daily":
        unit = calculateUnits[0];
      case "Weekly":
        unit = calculateUnits[1];
      case "Monthly":
        unit = calculateUnits[2];
    }

    const reqBodyObj = {
      title: formData.title,
      content: formData.description,
      savingGoal: formData.target,
      period: formData.frequency,
      currency: formData.currency,
      deadline: new Date(formData.date),
      userId: userID,
    };

    const res = await fetch("/api/saving", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBodyObj),
      method: "POST",
    });

    router.push(`/user/${userID}`);
  };
  return (
    <>
      <div className="w-full bg-[#f2f5f7] h-28">
        <div className="flex flex-col items-center relative">
          <div className="px-5 flex justify-between lg:px-[35%] relative bg-[#37517E] w-full h-60 rounded-b-3xl pt-24">
            <div className="cursor-pointer" onClick={() => router.back()}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.79 7.41005C18.3367 7.95678 18.3367 8.84322 17.79 9.38995L13.1799 14L17.79 18.6101C18.3367 19.1568 18.3367 20.0432 17.79 20.5899C17.2433 21.1367 16.3568 21.1367 15.8101 20.5899L10.2101 14.9899C9.66337 14.4432 9.66337 13.5568 10.2101 13.0101L15.8101 7.41005C16.3568 6.86332 17.2433 6.86332 17.79 7.41005Z"
                  fill="#00B9FF"
                />
              </svg>
            </div>
            <div className="text-center">
              <h1 className="text-xl text-white">Set a Goal</h1>
            </div>
            <Link href={`/`}>
              <a className="text-white text-xl">Home</a>
            </Link>
          </div>
          <div className="absolute top-40 pb-10">
            <Form onSubmit={handleSubmit} onChange={handleChange} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Input;
