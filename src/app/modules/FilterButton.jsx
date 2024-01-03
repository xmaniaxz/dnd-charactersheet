'use client'
import { useState } from "react";

export default function FilterOption({filterName}) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div className="filterButton">
      <button
        onClick={handleClick}
        style= {{ backgroundColor: isClicked ? 'lime' : 'lightgray' }}
        className={`hover:bg-gray-300 hover:cursor-pointer`}
      >
        <li>{filterName}</li>

      </button>
      <hr />
    </div>
  )
}