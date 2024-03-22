import { useState, useEffect } from "react";
export default function InputField({
  labelName,
  onValueChange,
  setValue,
  centered,
  reversed,
}) {
  const HandleOnChange = (e) => {
    e.target.value ? onValueChange(e.target.value) : onValueChange("");
  };

  return (
    <div
      className={`flex ${
        reversed ? "flex-row-reverse" : "flex-row"
      } w-full items-center`}
    >
      <label htmlFor="InputField" className="w-1/5">
        {labelName}
      </label>
      <input
        className={`w-4/5 m-[3px] ${centered ? "text-center" : ""} ${reversed && !centered ? "text-right": ""} underline`}
        id="InputField"
        value={setValue}
        placeholder={labelName}
        onChange={HandleOnChange}
      />
    </div>
  );
}
