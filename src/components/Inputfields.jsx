"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function InputField({  reversed,  InputText,  classname,  onValueChanged,  defaultValue}) {
  //UseState to update the page with new input
  const [value, setValue] = useState("");

  //Function to handle a callback as well as setting the value on change.
  const handleValueChange = (e) => {
    onValueChanged(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <div
      className={`${classname}  flex ${
        reversed ? "flex-row-reverse" : "flex-row"
      }`}
      style={{ textAlign: reversed ? "right" : "left" }}
    >
      <label className="" htmlFor="Textfield">
        {InputText}
      </label>
      <input
        className=""
        type="text"
        value={value}
        name="Textfield"
        onChange={handleValueChange}
      />
    </div>
  );
}