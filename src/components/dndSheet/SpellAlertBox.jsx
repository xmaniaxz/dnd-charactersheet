import styles from "@/CSS/homepage.module.css";
import SpellInfoData from "./SpellInfoData";
import { useEffect, useState } from "react";
import Dropdown from "@/components/dndSheet/Dropdown";
export default function SpellAlertBox({
  spellInfo,
  activeLevel,
  onSelection,
  onReturn,
}) {
  const [spellData, setSpellData] = useState(spellInfo);
  const [Filter, setFilter] = useState("None");
  const [activeSpell, setActiveSpell] = useState(null);
  const options = [
    "None",
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

  useEffect(() => {
    if (spellInfo && activeLevel) {
      let filteredlist = spellInfo
        .filter((spell) => spell.SpellLevel === activeLevel.toString())
        .sort((a, b) => a.SpellName.localeCompare(b.SpellName));
      if (Filter !== "None") {
        filteredlist = filteredlist.filter((spell) =>
          spell.Class.includes(Filter)
        );
      }
      setSpellData(filteredlist);
    }
  }, [spellInfo, activeLevel, Filter]);

  const handleClick = (spellname, values) => {
    if (values === activeSpell) {
      onSelection(spellname);
      // console.log(spellname);
    } else {
      setActiveSpell(values);
    }
  };

  return (
    <div className={`hazyOverLay`}>
      <div className="spellAlertBox">
        <span onClick={() => onReturn()} className="closeButton"></span>
        <div className="mt-[10px] text-2xl text-center">{activeLevel}</div>
        <div className="w-[150px] h-[30px]">
          <Dropdown
            Options={options}
            filterName={"Class"}
            OnSelection={(e) => {
              setFilter(e);
            }}
            SelectedOption={Filter ? Filter : "Class"}
            placeholder={"Class"}
          />
        </div>
        <div id="SpellList" className="listContainer">
          <div
            className={`gg-remove-r text-[red] mb-[10px]`}
            onClick={() => {
              onSelection(-1);
            }}
          >
            {/* Show current spells  */}
          </div>
          {spellData &&
            spellData.map((values, index) => {
              //Show list of spellnames
              return (
                <div
                  className={`w-[30%] button ${activeSpell === values ? "activeSpell" : ""}`}
                  key={index}
                  onClick={() => {
                    handleClick(values.SpellName, values);
                  }}
                >
                  <div className="spellName button">{values.SpellName}</div>
                </div>
              );
            })}
          {activeSpell && (
            <div
              className={`${activeSpell ? "block" : "none"} spellInfoContainer`}
            >
              <SpellInfoData SpellData={activeSpell} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
