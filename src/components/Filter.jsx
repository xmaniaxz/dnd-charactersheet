"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FilterOption from "./FilterButton";

export default function Filter({ filterName, Options, onFilterUpdate }) {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <div className="mx-2">
      <button
        className="overflow-hidden flex flex-row justify-evenly items-center w-28 h-8 rounded-10 hover:cursor-pointer"
        onClick={() => setdropdownOpen(!dropdownOpen)}
      >
        {filterName}
        <Image src="/Arrow.png" alt="" width="15" height="15" />
      </button>
      <div
        className={`${
          dropdownOpen ? ` opacity-100 visible` : " invisible opacity-0"
        } absolute text-center text-black w-1/6 rounded border-[1px] border-light bg-gray-400 shadow-card transition-all`}
      >
        <ul>
          {/*Options go here*/}
          {Options.map((values) => {
            return (
              <FilterOption
                key={values}
                onChange={() => onFilterUpdate(filterName,values)}
                filterName={values}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
