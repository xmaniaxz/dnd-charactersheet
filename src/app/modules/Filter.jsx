"use client";
import { useState } from "react";
import Image from "next/image";
import FilterOption from "./FilterButton";
import DropdownImage from "../../Images/Arrow.png";

let ActiveFilters = [];

async function AddFilter(filtertype) {
  let foundValue = false;
  if (ActiveFilters.length > 0) {
    ActiveFilters.map((values,index) => {
      if (values === filtertype) {
        console.log("found " + ActiveFilters[index] + "in array");
        ActiveFilters.splice(index,1);
        foundValue = true;
      } 
    });
  }
  if(!foundValue) {
    console.log("adding " + filtertype);
    ActiveFilters.push(filtertype);
  }
  
  console.log(ActiveFilters);
}

function handeClick(filtertype){
  AddFilter(filtertype)
}

export default function Filter({ filterName, Options }) {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  return (
    <div className="">
      <button
        className="overflow-hidden flex flex-row justify-evenly items-center w-20 h-8 rounded-10 hover:cursor-pointer"
        onClick={() => setdropdownOpen(!dropdownOpen)}
      >
        {filterName}
        <Image src={DropdownImage} alt="" width="15" height="15" />
      </button>
      <div
        className={`${ dropdownOpen ? ` opacity-100 visible` : " invisible opacity-0" } absolute text-center text-black w-1/6 rounded border-[1px] border-light bg-gray-400 shadow-card transition-all`}
      >
        <ul>
          {/*Options go here*/}
          {Options.map((values) => {
            return <FilterOption key={values} onClick={()=>handeClick(values)} filterName={values}/>           
          })}
          
        </ul>
      </div>
    </div>
  );
}
