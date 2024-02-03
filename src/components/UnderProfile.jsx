"use client";
import InputField from "./Inputfields";
import { CharacterInfo } from "@/utils/Variables"
import { useEffect } from "react";
import { LoadFile } from "@/utils/SaveSystem";;
export default function UnderInfo() {
  const handleProficiencyChange = (value) => {
    value = parseInt(value);
    if (isNaN(value)) {
      value = 0;
    }
    CharacterInfo.playerStats.Proficiency = value;
  };
  const handleCharacterNameChange = (value) => {
    CharacterInfo.playerInfo.CharacterName = value;
  };
  const HandleHPChange = (hp, maxhp, value) => {
    if (!isNaN(parseInt(value))) {
      if (hp) CharacterInfo.playerStats.Health = value;
      if (maxhp) CharacterInfo.playerStats.MaxHealth = value;
    }
  };
 
  return (
    <div className="underHPContainer">
      <div className="w-1/1">
        <InputField
          classname="underHP"
          InputText="Max HP :"
          onValueChanged={(e) => HandleHPChange(false, true, e)}
          value={CharacterInfo.playerStats.MaxHealth}
        />
        <InputField
          classname="underHP"
          InputText="HP :"
          onValueChanged={(e) => HandleHPChange(true, false, e)}
          value={CharacterInfo.playerStats.Health}
        />
      </div>
      <div className="w-1/1">
        <InputField
          classname="underHP"
          InputText=": Character name"
          reversed
          onValueChanged={(e) => handleCharacterNameChange(e)}
          value={CharacterInfo.playerInfo.CharacterName}
        />
        <InputField
          classname="underHP"
          InputText=": Proficiency"
          reversed
          onValueChanged={(e) => handleProficiencyChange(e)}
          value={CharacterInfo.playerStats.Proficiency}
        />
      </div>
    </div>
  );
}
