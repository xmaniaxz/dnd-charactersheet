"use client";
import { useState,useEffect} from "react";
import { useCharacterInfo } from "./characterinfocontext";
import { subscribe } from "@/utils/events";

export default function SkillContainer({ skillName, modifier, isproficient,identifier}) {
  const [isProficient, setProficiency] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(true);
  const { characterInfo } = useCharacterInfo();

  useEffect(() => {
    setUpdatedValue(false);
    setProficiency(characterInfo.playerStats.Proficiencies[identifier])
  }, [characterInfo]);

  const handleCheckBoxChange = () =>{
    setProficiency((prevProficiency) => !prevProficiency);
    isproficient(isProficient)
  }

  subscribe("UpdateProficiency",function(){setUpdatedValue(!updatedValue)});

  return (
    <div className="flex flex-row  truncate mb-1">
      <input
        className="ml-2"
        type="checkbox"
        id="proficiency"
        checked={characterInfo.playerStats.Proficiencies[identifier]}
        onChange={() => handleCheckBoxChange()}
      />
      <input
        className="w-6 text-center"
        value={isProficient && !isNaN(characterInfo.playerStats.Proficiency) ? parseInt(modifier) + parseInt(characterInfo.playerStats.Proficiency) : parseInt(modifier)}
        readOnly
        type="number"
      />
      <p>{skillName}</p>
    </div>
  );
}
