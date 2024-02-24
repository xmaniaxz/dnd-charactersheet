"use client";
import { useState,useEffect} from "react";
import { useCharacterInfo } from "./characterinfocontext";
import { useFileSystemPublicRoutes } from "../../next.config";

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

  return (
    <div className="flex flex-row text-black truncate mb-1">
      <input
        className="ml-2"
        type="checkbox"
        id="proficiency"
        checked={characterInfo.playerStats.Proficiencies[identifier]}
        onChange={() => handleCheckBoxChange()}
      />
      <input
        className="w-6 text-center"
        Value={isProficient ? modifier + characterInfo.playerStats.Proficiency : modifier}
        type="number"
      />
      <p>{skillName}</p>
    </div>
  );
}
