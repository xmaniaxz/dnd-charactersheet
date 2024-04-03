"use client";
import { useState, useEffect, useRef } from "react";
import SkillContainer from "@/components/dndSheet/Skill";
import { useCharacterInfo } from "./characterinfocontext";
export default function StatBox({
  statName,
  Skills,
  onValueChanged,
  defaultValue,
}) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [modifier, setModifier] = useState(0);
  const [isSkillContainerVisible, setSkillContainerVisible] = useState(false);
  const [skillsContainerHeight, setSkillsContainerHeight] = useState("auto");
  const { characterInfo } = useCharacterInfo();
  const skillsContainerRef = useRef(null);

  const calcModifier = (input) => {
    const number = parseInt(input);
    return Math.floor((number - 10) / 2);
  };

  const handleInputChange = (event) => {
    let newValue = parseInt(event.target.value.replace(/[^-+0-9]/g, ""));
    setInputValue(newValue);
    onValueChanged(newValue, statName);
  };

  const handleProficiency = (type, isProficient) => {
    type = type.replace(" ", "");
    //For some reason isProficient is being sent as an inversed variable
    try {
      characterInfo.playerStats.Proficiencies[type] = !isProficient;
    } catch (e) {
      console.error(`Stat.jsx: ` + e);
    }
  };

  useEffect(() => {
    setModifier(calcModifier(inputValue));
  }, [inputValue]);

  useEffect(() => {
    if (skillsContainerRef.current) {
      setSkillsContainerHeight(
        isSkillContainerVisible
          ? `${skillsContainerRef.current.scrollHeight}px`
          : "0"
      );
    }
  }, [Skills, isSkillContainerVisible]);

  return (
    <div>
      <div className="statContainer">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-7xl"
          name="MainStat"
        />
        <div className="text-3xl">{modifier}</div>
        <label className="text-2xl" htmlFor="MainStat">
          {statName}
        </label>
        <button
          className="statsButton"
          onClick={() => setSkillContainerVisible(!isSkillContainerVisible)}
        >
          Show Stats
        </button>
      </div>
      <div
        id="Skills"
        ref={skillsContainerRef}
        className={`SkillContainer ${isSkillContainerVisible ? "visible" : ""}`}
        style={{ height: skillsContainerHeight }}
      >
        <div className="mt-5">
          {Skills &&
            Skills.map((values) => {
              return (
                <SkillContainer
                  key={`${statName} ${values}-${modifier}`}
                  skillName={values}
                  modifier={modifier}
                  isproficient={(e) => handleProficiency(statName + values, e)}
                  identifier={statName + values}
                  isPerception={values === "Perception" ? true : false}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
