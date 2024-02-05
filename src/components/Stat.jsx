"use client";
import { useState, useEffect, useRef } from "react";
import SkillContainer from "./Skill";
export default function StatBox({ statName, Skills, onValueChanged,defaultValue,forceUpdate}) {
  if(isNaN(defaultValue)) defaultValue = 10;
  const [inputValue, setInputValue] = useState(defaultValue);
  const [modifier, setModifier] = useState(0);
  const [isSkillContainerVisible, setSkillContainerVisible] = useState(true);
  const [skillsContainerHeight, setSkillsContainerHeight] = useState("auto");

  const skillsContainerRef = useRef(null);

  const calcModifier = (input) => {
    const number = parseInt(input);
    return Math.floor((number - 10) / 2);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    onValueChanged(event.target.value,statName);
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
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          className="text-7xl"
          name="MainStat"
        />
        <input
          type="number"
          value={modifier}
          readOnly
          className="text-3xl"
          name="Modifier"
        />
        <label className="text-2xl" htmlFor="MainStat">
          {statName}
        </label>
        <button
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
              return(          
              <SkillContainer key={values+"-"+forceUpdate} skillName={values} modifier={modifier} />
              
              )})}
        </div>
      </div>
    </div>
  );
}
