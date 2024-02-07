"use client";
import { useState} from "react";
import { CharacterInfo } from "@/utils/Variables";

export default function SkillContainer({ skillName, modifier}) {
  const [isProficient, setProficiency] = useState(false);


  return (
    <div className="flex flex-row text-black truncate mb-1">
      <input
        className="ml-2"
        type="checkbox"
        id="proficiency"
        checked={isProficient}
        onChange={() => setProficiency((prevProficiency) => !prevProficiency)}
      />
      <input
        className="w-6 text-center"
        defaultValue={isProficient ? modifier + CharacterInfo.playerStats.Proficiency : modifier}
        type="number"
      />
      <p>{skillName}</p>
    </div>
  );
}
