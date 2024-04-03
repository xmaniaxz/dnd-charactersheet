"use client";
import { useState } from "react";

export default function Searchbar({ onValueChange }) {
  const [inputValue,setInputValue] = useState("");  
  const handleInputChange = (e) => {
    setInputValue(e);
    onValueChange(e);
  };

  return (
    <div className="SearchBarContainer">
      <input
        className="SearchBar"
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInputChange(e.target.value)}
        value={inputValue}
      />
      <button onClick={()=>{setInputValue("");onValueChange("")}}className="gg-remove"></button>
    </div>
  );
}
