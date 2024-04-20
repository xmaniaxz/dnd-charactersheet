"use client";
import { useState, useEffect } from "react";

export default function SelectableBar({
  Options,
  placeholder,
  OnSelection,
  SelectedOption,
  CustomClass,
  CustomButtonClass,
  CustomOptionsClass,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(SelectedOption);
  }, [SelectedOption]);

  return (
    <>
      <button
        className={`${dropdownOpen ? `${CustomButtonClass} opened` :  ""} ${
          CustomButtonClass ? CustomButtonClass : "placeHolder"
        } button`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="m-[0px auto]">
          {selectedOption ? selectedOption : placeholder}
        </div>
      </button>

      <div
        className={`${dropdownOpen ? `visible` : "invisible"} ${
          CustomOptionsClass ? CustomOptionsClass : "dropdown"
        }`}
      >
        <ul className="optionsContainer">
          {Options.map((value) => {
            return (
              <div key={"key-" + value}>
                <button
                  className={`${
                    selectedOption === value ? "selected" : ""
                  } options ${CustomClass ? CustomClass : ""}`}
                  onClick={() => {
                    OnSelection(value);
                    setSelectedOption(value);
                    setDropdownOpen(false);
                  }}
                >
                  <li>{value}</li>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
