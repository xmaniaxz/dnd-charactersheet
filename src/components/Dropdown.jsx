"use client";
import { useState, useEffect } from "react";

export default function Dropdown({
  Options,
  placeholder,
  OnSelection,
  SelectedOption,
}) {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(SelectedOption);
  }, [SelectedOption]);

  return (
    <div>
      <button
        className="placeHolder hover:cursor-pointer"
        onClick={() => setdropdownOpen(!dropdownOpen)}
      >
        <div className="m-[0px auto]">
          {selectedOption ? selectedOption : placeholder}
        </div>
      </button>

      <div className={`${dropdownOpen ? ` visible` : " invisible"} dropdown `}>
        <ul className="optionsContainer">
          {Options.map((values) => {
            return (
              <div key={"key-" + values}>
                <button
                  className={`${
                    selectedOption === values ? "selected" : ""
                  } options`}
                  onClick={() => {
                    OnSelection(values);
                    setSelectedOption(values);
                    setdropdownOpen(false);
                  }}
                >
                  <li>{values}</li>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
