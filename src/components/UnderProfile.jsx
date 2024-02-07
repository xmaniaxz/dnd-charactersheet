"use client";
import InputField from "./Inputfields";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/utils/characterinfocontext";
export default function UnderInfo() {
  const { characterInfo } = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(true);
  const handleProficiencyChange = (value) => {

    value = parseInt(value);
    if (isNaN(value)) {
      value = 0;
    }
    characterInfo.playerStats.Proficiency = value;
    
  };
  const handleCharacterNameChange = (value) => {
    characterInfo.playerInfo.CharacterName = value;
  };
  const HandleHPChange = (hp, maxhp, value) => {
    if (!isNaN(parseInt(value))) {
      if (hp) characterInfo.playerStats.Health = value;
      if (maxhp) characterInfo.playerStats.MaxHealth = value;
    }
  };

  useEffect(() => {
    setUpdatedValue(false)
  }, [characterInfo])
  return (
    <div className="underHPContainer">
      <div className="w-1/1">
        <InputField
          key={1+updatedValue}
          classname="underHP"
          InputText="Max HP :"
          onValueChanged={(e) => HandleHPChange(false, true, e)}
          defaultValue={characterInfo.playerStats.MaxHealth}      
        />
        <InputField
          key={2+updatedValue}
          classname="underHP"
          InputText="HP :"
          onValueChanged={(e) => HandleHPChange(true, false, e)}
          defaultValue={characterInfo.playerStats.Health}
        />
      </div>
      <div className="w-1/1">
        <InputField
          key={3+updatedValue}
          classname="underHP"
          InputText=": Character name"
          reversed
          onValueChanged={(e) => handleCharacterNameChange(e)}
          defaultValue={characterInfo.playerInfo.CharacterName}
        />
        <InputField
          key={4+updatedValue}
          classname="underHP"
          InputText=": Proficiency"
          reversed
          onValueChanged={(e) => handleProficiencyChange(e)}
          defaultValue={characterInfo.playerStats.Proficiency}
        />
      </div>
    </div>
  );
}
