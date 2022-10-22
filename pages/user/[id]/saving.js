import React, { useReducer, useState } from "react";
import Form from "components/Form";
import { calculateUnits } from "lib/data";
import { useRouter } from "next/router";

const formReducer = (state, event) => {
  // console.log("state:", state);
  // console.log("event name & value:", [event.name], event.value);
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
    // console.log("name:", event.target.name);
    // console.log("value:", event.target.value);
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    // console.log("formData:", formData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    // console.log("submiting:", formData);
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
      deadline: new Date(),
      userId: userID,
    };

    // console.log("req:", reqBodyObj);

    const res = await fetch("/api/saving", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBodyObj),
      method: "POST",
    });

    router.push(`/user/${userID}`);
  };
  return (
    <div className="w-full bg-[#f2f5f7] h-28">
      <div
        className="flex flex-col items-center relative
        "
      >
        <div
          className="flex-col justify-around bg-[#37517E] w-full h-60
         rounded-b-3xl text-center pt-16"
        >
          <h1 className="text-white text-xl">Set a Goal</h1>
        </div>

        <div className="absolute top-40 pb-10">
          <Form onSubmit={handleSubmit} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

export default Input;
