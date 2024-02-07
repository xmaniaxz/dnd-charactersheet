"use client";
import Image from "next/image";
import { useState } from "react";
import FilterOption from "./FilterButton";

export default function Dropdown({ Options }) {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [damageType, setDamageType] = useState(Options[0]);
  return (
    <div>
      <button
        className="WeaponType hover:cursor-pointer"
        onClick={() => setdropdownOpen(!dropdownOpen)}
      >
        {damageType}
        <Image src="/Arrow.png" alt="" width="15" height="15" />
      </button>
      <div
        className={`${
          dropdownOpen ? ` opacity-100 visible` : " invisible opacity-0"
        } absolute text-center text-black w-1/6 border-light bg-gray-400 shadow-card transition-all`}
      >
        <ul>
          {/*Options go here*/}
          {Options.map((values) => {
            return (
              <div key={"key-"+values}>
                <button                
                style={{backgroundColor: damageType === values ? "blue" : "lightgray" }}
                onClick={()=> {setDamageType(values),setdropdownOpen(false)}}                  
                  className={`hover:bg-gray-300 hover:cursor-pointer`}
                >
                  <li>{values}</li>
                </button>
                <hr />
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
