"use client";
import style from "@/CSS/TopbarInfo.module.css";
import ProfileImage from "./ProfileImage";
import Dropdown from "./Dropdown";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { useState, useEffect } from "react";
import Healthbar from "./Healtbar";
import NavBar from "./NavBar";
import { subscribe, unsubscribe } from "@/utils/events";

export default function TopbarInfo() {
  const { characterInfo } = useCharacterInfo();
  const [passivePerception, setPassivePerception] = useState(0);
  const [reloadPage, setReloadPage] = useState(false);
  const options = [
    "Artificer",
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];

  const convertVisualNumber = (number) => {
    if (number) {
      number = number.toString().replace(/[+]/g, "");
      if (number > 0) {
        return "+" + number;
      } else return number.toString();
    }
  };

  const CalculatePassivePerception = (value) => {
    let perception = 10 + value;
    setPassivePerception(convertVisualNumber(perception));
  };
  
  useEffect(() => {
    subscribe("UpdatePassivePerception", (event) => CalculatePassivePerception(event.detail.value));
    
    return () => {
      unsubscribe("UpdatePassivePerception", (event) => CalculatePassivePerception(event.detail.value));
    };
  }, []);

  return (
    <div className="topContainer">
      <div className={`${style.profileContainer}`}>
        <div className={`${style.innerContainer}`}>
          <div className={`${style.leftSide}`}>
            <div className={`${style.characterInfo}`}>
              <input
                className={`text-2xl`}
                type="text"
                placeholder="Character Name"
                value={characterInfo.playerInfo.CharacterName}
                onChange={(e) => {
                  characterInfo.playerInfo.CharacterName = e.target.value;
                  setReloadPage(!reloadPage);
                }}
              />
              <div className={`${style.characterDetails}`}>
                <input
                  id="RaceInput"
                  type="text"
                  style={{
                    width:
                      characterInfo.playerInfo.Race.length > 3
                        ? characterInfo.playerInfo.Race.length - 1 + "ch"
                        : "4ch",
                    margin: "10px,0px",
                  }}
                  value={
                    characterInfo.playerInfo.Race
                      ? characterInfo.playerInfo.Race
                      : ""
                  }
                  placeholder="Race"
                  onChange={(e) => {
                    characterInfo.playerInfo.Race = e.target.value;
                    setReloadPage(!reloadPage);
                  }}
                />
                <span>||</span>
                <Dropdown
                  id="ClassInput"
                  Options={options}
                  placeholder={"Class"}
                  SelectedOption={characterInfo.playerInfo.Class}
                  OnSelection={(e) => {
                    characterInfo.playerInfo.Class = e;
                  }}
                />
                <span>||</span>
                <input
                  id="SubClassInput"
                  type="text"
                  style={{
                    width:
                      characterInfo.playerInfo.SubClass.length > 7
                        ? characterInfo.playerInfo.SubClass.length - 1 + "ch"
                        : "8ch",
                    textAlign: "center",
                  }}
                  value={
                    characterInfo.playerInfo.SubClass
                      ? characterInfo.playerInfo.SubClass
                      : ""
                  }
                  placeholder="Sub-class"
                  onChange={(e) => {
                    characterInfo.playerInfo.SubClass = e.target.value;
                    setReloadPage(!reloadPage);
                  }}
                />
                <span>||</span>
                <div id="LevelContainer" className="ml-[4px] text-center">
                  <span>lvl:</span>
                  <input
                    type="text"
                    style={{
                      width:
                        characterInfo.playerInfo.PlayerLevel.toString().length >
                        3
                          ? characterInfo.playerInfo.PlayerLevel.toString()
                              .length +
                            1 +
                            "ch"
                          : "2ch",
                      textAlign: "center",
                    }}
                    value={
                      characterInfo.playerInfo.PlayerLevel
                        ? characterInfo.playerInfo.PlayerLevel
                        : ""
                    }
                    placeholder="Lvl"
                    onChange={(e) => {
                      characterInfo.playerInfo.PlayerLevel = e.target.value;
                      setReloadPage(!reloadPage);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`${style.HPBar}`}>
              <Healthbar />
            </div>
            <div className={`${style.characterData1}`}>
              <div
                id="IconContainer"
                className="h-full w-full flex items-center flex-row gap-[20px]"
              >
                <i className="Icon shieldIcon">
                  shield
                  <label className={style.armorClassLabel}>Armor Class</label>
                  <input
                    className={`${style.armorClassInput}`}
                    type="text"
                    value={convertVisualNumber(
                      characterInfo.playerStats.ArmorClass
                    )}
                    placeholder="AC"
                    onChange={(e) => {
                      characterInfo.playerStats.ArmorClass = e.target.value;
                      setReloadPage(!reloadPage);
                    }}
                  />
                </i>
                <div className="proficiencyContainer">
                  <input
                    id="proficiency"
                    type="text"
                    className="w-full h-full text-center text-[40px]"
                    value={convertVisualNumber(
                      characterInfo.playerStats.Proficiency
                    )}
                    onChange={(e) => {
                      characterInfo.playerStats.Proficiency = e.target.value;
                      setReloadPage(!reloadPage);
                      publish("UpdateProficiency");
                    }}
                  />
                  <label htmlFor="proficiency" className="text-[15px]">Proficiency</label>
                </div>
                <div id="Passive perception" className="proficiencyContainer">
                  <span
                    id="PassiveP"
                    type="text"
                    className="w-full h-full text-center text-[40px]"
                    readOnly
                  >
                    {passivePerception}
                  </span>

                  <label htmlFor="PassiveP" className="text-[15px] text-center">
                    Passive perception
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.rightSide}`}>
            <div className={`${style.characterData2}`}>
              <NavBar />
            </div>
          </div>
        </div>
        <div id="backgroundCover" className={`${style.backgroundCircle}`}>
          <ProfileImage />
        </div>
      </div>
    </div>
  );
}
