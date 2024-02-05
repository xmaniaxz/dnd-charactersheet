"use client";
import StatBox from "./Stat";
import { CharacterInfo } from "@/utils/Variables";
import { useEffect, useState } from "react";

export default function StatsContainer() {
  const HandleValueChange = (value, type) => {
    if (!isNaN(parseInt(value))) value = parseInt(value);
    else value = 10;
    switch (type) {
      case "Strength":
        CharacterInfo.playerStats.Strength = value;
        break;
      case "Constitution":
        CharacterInfo.playerStats.Constitution = value;
        break;
      case "Dexterity":
        CharacterInfo.playerStats.Dexterity = value;
        break;
      case "Intelligence":
        CharacterInfo.playerStats.Intelligence = value;
        break;
      case "Wisdom":
        CharacterInfo.playerStats.Wisdom = value;
        break;
      case "Charisma":
        CharacterInfo.playerStats.Charisma = value;
        break;
    }
  };

  //Reload Current page
  const [forceUpdate, setForceUpdate] = useState(false);
  const HandleEvent = () => {
    setForceUpdate((prev) => !prev);
  };
  useEffect(() => {
    document.addEventListener("CharacterFileUpdated", HandleEvent);
    return () => {
      document.removeEventListener("CharacterFileUpdated", HandleEvent);
    };
  }, []);

  return (
    <div className="statsContainer">
      <StatBox
        key={`Strength-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Strength"}
        defaultValue={CharacterInfo.playerStats.Strength}
        Skills={["Saving throw", "Athletics"]}
        onValueChanged={(value) => HandleValueChange(value, "Strength")}
      />
      <StatBox
        key={`Constitution-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Constitution"}
        defaultValue={CharacterInfo.playerStats.Constitution}
        Skills={["Saving throw"]}
        onValueChanged={(value) => HandleValueChange(value, "Constitution")}
      />
      <StatBox
        key={`Dexterity-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Dexterity"}
        defaultValue={CharacterInfo.playerStats.Dexterity}
        Skills={["Saving throw", "Acrobatics", "Sleight of hand", "Stealth"]}
        onValueChanged={(value) => HandleValueChange(value, "Dexterity")}
      />
      <StatBox
        key={`Intelligence-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Intelligence"}
        defaultValue={CharacterInfo.playerStats.Intelligence}
        Skills={[
          "Saving throw",
          "Arcana",
          "History",
          "Investigation",
          "Nature",
          "Religion",
        ]}
        onValueChanged={(value) => HandleValueChange(value, "Intelligence")}
      />
      <StatBox
        key={`Wisdom-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Wisdom"}
        defaultValue={CharacterInfo.playerStats.Wisdom}
        Skills={[
          "Saving throw",
          "Animal handling",
          "Insight",
          "Medicine",
          "Perception",
          "Survival",
        ]}
        onValueChanged={(value) => HandleValueChange(value, "Wisdom")}
      />
      <StatBox
        key={`Charisma-${forceUpdate}`}
        forceUpdate={forceUpdate}
        statName={"Charisma"}
        defaultValue={CharacterInfo.playerStats.Charisma}
        Skills={[
          "Saving throw",
          "Deception",
          "Intimidation",
          "Performance",
          "Persuasion",
        ]}
        onValueChanged={(value) => HandleValueChange(value, "Charisma")}
      />
    </div>
  );
}
