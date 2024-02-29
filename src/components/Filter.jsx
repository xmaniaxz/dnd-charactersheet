"use client";
import { useState } from "react";
import Image from "next/image";
import FilterOption from "./FilterButton";
import FilterStyle from "@/CSS/filter.module.css";

export default function Filter({ filterName, Options, onFilterUpdate }) {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex ">
        <button
          className={`${FilterStyle.filterOptions}`}
          onClick={() => setdropdownOpen(!dropdownOpen)}
        >
          <span>{filterName}</span>
          <span className={`${dropdownOpen ? `gg-push-chevron-down rotated` : "gg-push-chevron-down"}`}></span>
        </button>
      </div>

      <div
        className={`${
          dropdownOpen ? ` opacity-100 visible` : " invisible opacity-0"
        } ${FilterStyle.filterOpen}`}
      >
        <ul>
          {/*Options go here*/}
          {Options.map((values) => {
            return (
              <FilterOption
                key={values}
                onChange={() => onFilterUpdate(filterName, values)}
                filterName={values}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
