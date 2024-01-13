"use client";
import { useState,useEffect } from "react";

export default function StatBox({ statName, onValueChanged }) {
  const [InputValue, setInputValue] = useState("");
  const [modifier,setModifier] = useState();
  const GetOnChangeValue = (event) => {
    setInputValue(event.target.value) 
    
  };

  useEffect(()=>{ 
    setModifier(CalcModifier(InputValue));
    onValueChanged = modifier
  },[InputValue])

  return (
    <div>
      <div className="statContainer">
        <input
          type="number"
          defaultValue="10"
          onChange={GetOnChangeValue}
          className=" text-7xl"
          name="MainStat"
        />
        <input
          type="number"
          defaultValue="0"
          value={modifier}
          className=" text-3xl"
          name="Modifier"
        />
        <label className=" text-2xl" htmlFor="MainStat">
          {statName}
        </label>
        <button>Show Stats</button>
      </div>
    </div>
  );
}

function CalcModifier(input){
    if(typeof input === "string" && input !== "")
    {
        let number = parseInt(input);
        let modifier = 0;
        for (let i = 0; i < number; i++) {
            modifier = -5 + Math.floor(number / 2);
        }
         return modifier;
    }
}