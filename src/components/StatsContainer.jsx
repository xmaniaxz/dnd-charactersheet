"use client";
import StatBox from "@/components/Stat";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCharacterInfo } from "@/components/characterinfocontext";

export default function StatsContainer() {
  const router = useRouter();
  const { characterInfo } = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(true);

  const HandleValueChange = (value, type) => {
    if (!isNaN(parseInt(value))) value = parseInt(value);
    else value = 10;
    switch (type) {
      case "Strength":
        characterInfo.playerStats.Strength = value;
        break;
      case "Constitution":
        characterInfo.playerStats.Constitution = value;
        break;
      case "Dexterity":
        characterInfo.playerStats.Dexterity = value;
        break;
      case "Intelligence":
        characterInfo.playerStats.Intelligence = value;
        break;
      case "Wisdom":
        characterInfo.playerStats.Wisdom = value;
        break;
      case "Charisma":
        characterInfo.playerStats.Charisma = value;
        break;
    }
  };


  useEffect(() => {
    setUpdatedValue(!updatedValue);
  }, [characterInfo]);

  return (
    <div className="statsContainer">
      <StatBox
        key={`Strength-${updatedValue}`}
        statName={"Strength"}
        defaultValue={characterInfo.playerStats.Strength}
        Skills={["Saving throw", "Athletics"]}
        onValueChanged={(value) => HandleValueChange(value, "Strength")}
      />
      <StatBox
        key={`Constitution-${updatedValue}`}
        statName={"Constitution"}
        defaultValue={characterInfo.playerStats.Constitution}
        Skills={["Saving throw"]}
        onValueChanged={(value) => HandleValueChange(value, "Constitution")}
      />
      <StatBox
        key={`Dexterity-${updatedValue}`}
        statName={"Dexterity"}
        defaultValue={characterInfo.playerStats.Dexterity}
        Skills={["Saving throw", "Acrobatics", "Sleight of hand", "Stealth"]}
        onValueChanged={(value) => HandleValueChange(value, "Dexterity")}
      />
      <StatBox
        key={`Intelligence-${updatedValue}`}
        statName={"Intelligence"}
        defaultValue={characterInfo.playerStats.Intelligence}
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
        key={`Wisdom-${updatedValue}`}
        statName={"Wisdom"}
        defaultValue={characterInfo.playerStats.Wisdom}
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
        key={`Charisma-${updatedValue}`}
        statName={"Charisma"}
        defaultValue={characterInfo.playerStats.Charisma}
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
