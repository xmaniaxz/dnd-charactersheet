"use client";
import { useState, useEffect } from "react";
import { GetServerSpells, SortSpells } from "./Database";
import SpellInfoData from "./SpellInfoData";
import Filter from "./Filter";
import SpellButton from "./Spellbutton";
import Inventory from "./InventoryContainer";
import { WriteSheetToDatabase } from "./Database";

export default function SpellContainer() {
  const [spellData, setSpellData] = useState([]);
  const [activeSpell, setActiveSpell] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const [activePage, setActivePage] = useState("InventoryContainer");
  const [isLoadingSpellData, setLoadingSpellData] = useState(true);

  //#region Filter
  const toggleFilter = (filterType, filter) => {
    const index = activeFilters.findIndex(
      (f) => f[0] === filterType && f[1] === filter
    );

    if (index === -1) {
      setActiveFilters((prevActiveFilters) => [
        ...prevActiveFilters,
        [filterType, filter],
      ]);
    } else {
      const newArray = [...activeFilters];
      newArray.splice(index, 1);
      setActiveFilters(newArray);
    }
  };

  useEffect(() => {
    async function GetSpellData() {
      setLoadingSpellData(true);
      setSpellData(await GetServerSpells(activeFilters));
      setLoadingSpellData(false);
    }
    GetSpellData();
  }, [activeFilters]);
  //#endregion
  //#region  FilterOptions
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

  const LevelOptions = [
    "Cantrips",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  //#endregion
  const ActiveSpellPage = (Spell) => {
    Spell === activeSpell ? setActiveSpell() : setActiveSpell(Spell);
  };

  const ActiveInfoPage = (PageName) => {
    if (activePage === PageName) {
      setActivePage("");
      if (spellData.length < 1) debouncedFetchData();
    } else setActivePage(PageName);
  };

  return (
    <div className="w-full flex">
      <div className="bottomContainer">
        <div className="BottomInfoContainerButtons">
          <button onClick={() => ActiveInfoPage("SpellsContainer")}>
            Spells
          </button>
          <button onClick={() => ActiveInfoPage("InventoryContainer")}>
            Inventory
          </button>
          <button onClick={() => ActiveInfoPage("Info")}>Character info</button>
          <button onClick={()=>WriteSheetToDatabase()}>Save Document</button>
          <button onClick={()=>LoadFile()}>Load Document</button>
        </div>

        <div
          id="BottomInfoContainer"
          className="BottomInfoContainer"
          style={{
            display: activePage === "SpellsContainer" ? "block" : "none",
          }}
        >
          {/* show this or not? */}
          <div id="SpellsContainer">
            {/* Show all filters on a bar */}
            <div className="BottomInfoContainerHeader">
              <div className=" flex flex-row">
                <Filter
                  key={"Class"}
                  filterName="Class"
                  Options={ClassOptions}
                  onFilterUpdate={async (filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
                <Filter
                  key={"School"}
                  filterName="School"
                  Options={SchoolOptions}
                  onFilterUpdate={async (filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
                <Filter
                  key={"SpellLevel"}
                  filterName="SpellLevel"
                  Options={LevelOptions}
                  onFilterUpdate={async (filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
              </div>
            </div>
            {/* Show all the spells */}
            <div className="BottomInfoSpellsContainer">
              <div className="SpellsOffsetContainer">
                {isLoadingSpellData ? (
                  <div>Loading...</div>
                ) : (
                  spellData.map((spells) => {
                    return (
                      <SpellButton
                        key={spells.Spell}
                        SpellText={spells.Spell}
                        SpellLevel={spells.SpellLevel}
                        onButtonClick={() => {
                          ActiveSpellPage(spells);
                        }}
                        isActiveSpell={
                          activeSpell !== undefined &&
                          activeSpell.Spell === spells.Spell
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        {/* SpellInfo */}
        <div
          style={{
            display: activePage === "SpellsContainer" ? "block" : "none",
          }}
        >
          {activeSpell === undefined ? (
            <div></div>
          ) : (
            <div className="SpellInfoContainer">
              <SpellInfoData SpellData={activeSpell} />
            </div>
          )}
        </div>
        <div
          id="InventoryContainer"
          style={{
            display: activePage === "InventoryContainer" ? "block" : "none",
          }}
        >
          <Inventory />
        </div>
      </div>
    </div>
  );
}
