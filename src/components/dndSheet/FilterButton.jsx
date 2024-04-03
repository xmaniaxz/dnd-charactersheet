'use client'
import { useState } from "react";
import style from "@/CSS/filter.module.css"

export default function FilterOption({filterName, onChange}) {
  const [isClicked, setIsClicked] = useState(false);


  const handleClick = () => {
    setIsClicked(!isClicked);
    onChange(filterName)
  };

  
  return (
    <div className={`${style.filterButtonContainer}`}>
      <button
        onClick={handleClick}
        className={`${isClicked ? style.filterButtonActive :  style.filterButton}`}
      >
        <li>{filterName}</li>

      </button>
    </div>
  )
}