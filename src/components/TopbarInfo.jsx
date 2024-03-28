"use client";
import style from "@/CSS/TopbarInfo.module.css";
import ProfileImage from "./ProfileImage";
import Dropdown from "./Dropdown";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { useState } from "react";
import Healthbar from "./Healtbar";
import InputField from "./Inputfield";
import NavBar from "./NavBar";

export default function TopbarInfo() {
  const { characterInfo } = useCharacterInfo();
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
              <InputField
                labelName={"Background"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Background = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Background}
              />
              <InputField
                labelName={"Alignment"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Alignment = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Alignment}
              />
              <InputField
                labelName={"Player name"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.PlayerName = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.PlayerName}
              />
              <InputField
                labelName={"Experience"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Experience = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Experience}
              />
            </div>
          </div>
          <div className={`${style.rightSide}`}>
            <div className={`${style.characterData2}`}>
              <NavBar/>
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
