"use client";
import { useState, useEffect } from "react";
import { GetServerSpells } from "./Database";
import Filter from "./Filter";
import SpellButton from "./Spellbutton";

export default function BottomContainer() {
  const [spellData, setSpellData] = useState([]);
  const [isLoadingSpellData, setLoadingSpellData] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    const index = activeFilters.indexOf(filter);

    if (index === -1) {
      // If the string is not in the array, add it
      setActiveFilters([...activeFilters, filter]);
    } else {
      // If the string is already in the array, remove it
      const newArray = [...activeFilters];
      newArray.splice(index, 1);
      setActiveFilters(newArray);
    }

  };

  useEffect(() => {
    console.log(activeFilters);
  }, [activeFilters]);

  const ClassOptions = [
    "Artificer",
    "Bard",
    "Cleric",
    "Druid",
    "Paladin",
    "Ranger",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];
  const SchoolOptions = ["Abjuration", "Conjuration"];

  useEffect(() => {
    async function FetchData() {
      let value = await GetServerSpells(activeFilters)
      console.log(value);
      console.log(typeof value);
      setSpellData(value);
      setLoadingSpellData(false);
    }
    FetchData()
  }, []);

  return (
    <div className="float-left w-screen m-0 p-0">
      <div className="bottomContainer">
        <div className="bottominfoContainerButtons">
          <button>Spells</button>
          <button>Inventory</button>
          <button>Character info</button>
        </div>
        <div className="bottominfoContainerHeader">
          <div className=" flex">
            {/* onButtonPressed is callback */}
            <Filter
              key={"Class"}
              filterName="Class"
              Options={ClassOptions}
              onFilterUpdate={(value) => {
                toggleFilter(value);
              }}
            />
            <Filter
              key={"School"}
              filterName="School"
              Options={SchoolOptions}
              onFilterUpdate={(value) => toggleFilter(value)}
            />
          </div>
        </div>
        <div className="bottomInfoContainerBody">
          <div className="bottomSpellsContainer">
            {spellData.length > 0 &&
              spellData.map((spells) => {
                return (
                  <SpellButton
                    key={spells.spellName}
                    SpellText={spells.spellName}
                    SpellLevel={spells.SpellLevel}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
