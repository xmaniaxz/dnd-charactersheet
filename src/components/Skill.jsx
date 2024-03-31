"use client";
import { useState,useEffect} from "react";
import { useCharacterInfo } from "./characterinfocontext";
import { publish, subscribe } from "@/utils/events";

export default function SkillContainer({ skillName, modifier, isproficient,identifier,isPerception}) {
  const [isProficient, setProficiency] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(true);
  const { characterInfo } = useCharacterInfo();

  useEffect(() => {
    setUpdatedValue(false);
    setProficiency(characterInfo.playerStats.Proficiencies[identifier])
    publish("UpdatePassivePerception", { value: calcModifier() });
  }, [characterInfo]);

  const handleCheckBoxChange = () =>{
    setProficiency((prevProficiency) => !prevProficiency);
    isproficient(isProficient)
    // publish("UpdatePassivePerception")
  }

  const calcModifier = () => {
    const number = isProficient && !isNaN(characterInfo.playerStats.Proficiency) ? parseInt(modifier) + parseInt(characterInfo.playerStats.Proficiency) : parseInt(modifier)
    if(isPerception){
      publish("UpdatePassivePerception", { value: number });
    }
    return number;
  };

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
        id={skillName}
        value={calcModifier()}
        readOnly
        type="number"
      />
      <p>{skillName}</p>
    </div>
  );
}
