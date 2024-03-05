"use client";
import { useState, useEffect } from "react";
import { GetServerSpells, WriteSheetToDatabase } from "./Database";
import SpellInfoData from "./SpellInfoData";
import Filter from "./Filter";
import SpellButton from "./Spellbutton";
import Inventory from "./InventoryContainer";
import Searchbar from "./SearchBar";
import SpellList from "./SpellList";
import { useCharacterInfo } from "@/components/characterinfocontext";

export default function SpellContainer() {
  const [spellData, setSpellData] = useState([]);
  const [activeSpell, setActiveSpell] = useState();
  const [activeFilters, setActiveFilters] = useState([]);
  const [activePage, setActivePage] = useState("SpellListContainer");
  const [isLoadingSpellData, setLoadingSpellData] = useState(true);
  const { characterInfo, updateCharacterInfo } = useCharacterInfo();

  //#region Filter
  const toggleFilter = (filterType, filter) => {
    if (filterType === "SpellName") {
      // Handle search filter separately
      const index = activeFilters.findIndex((f) => f[0] === "SpellName");
      //If input is empty
      if (typeof filter === undefined || filter === "") {
        setActiveFilters((prevActiveFilters) => [
          ...prevActiveFilters.filter((f) => f[0] !== "SpellName"), // Remove previous search filter if exist
        ]);
      } else if (index === -1) {
        // If search filter doesn't exist, add it
        setActiveFilters((prevActiveFilters) => [
          ...prevActiveFilters.filter((f) => f[0] !== "SpellName"), // Remove previous search filter if exists
          [filterType, filter],
        ]);
      } else {
        // If search filter already exists, update its value
        setActiveFilters((prevActiveFilters) => {
          const newArray = [...prevActiveFilters];
          newArray[index] = [filterType, filter];
          return newArray;
        });
      }
    } else {
      // Handle other filters
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingSpellData(true);
      setSpellData(await GetServerSpells(activeFilters));
      setLoadingSpellData(false);
    };

    fetchData();

    const debouncedGetSpellData = debounce(async () => {
      setLoadingSpellData(true);
      setSpellData(await GetServerSpells(activeFilters));
      setLoadingSpellData(false);
    }, 1500);

    return () => clearTimeout(debouncedGetSpellData);
  }, [activeFilters]);

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }
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
          <button className="BottomContainerButton" onClick={() => ActiveInfoPage("SpellsContainer")}>
            Spells
          </button>
          <button className="BottomContainerButton" onClick={() => ActiveInfoPage("SpellListContainer")}>
            Spell List
          </button>
          <button className="BottomContainerButton" onClick={() => ActiveInfoPage("InventoryContainer")}>
            Inventory
          </button>
          <button className="BottomContainerButton" onClick={() => ActiveInfoPage("Info")}>Character info</button>
          <button className="BottomContainerButton" onClick={() => WriteSheetToDatabase(characterInfo)}>
            Save Document
          </button>
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
              <div className="flex flex-row w-full h-[inherit] justify-evenly">
                <Filter
                  key={"Class"}
                  filterName="Class"
                  Options={ClassOptions}
                  onFilterUpdate={(filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
                <Filter
                  key={"School"}
                  filterName="School"
                  Options={SchoolOptions}
                  onFilterUpdate={(filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
                <Filter
                  key={"SpellLevel"}
                  filterName="SpellLevel"
                  Options={LevelOptions}
                  onFilterUpdate={(filterValue, value) => {
                    toggleFilter(filterValue, value);
                  }}
                />
                <Searchbar
                  onValueChange={(value) => {
                    toggleFilter("SpellName", value);
                  }}
                ></Searchbar>
              </div>
              <hr />
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
                        key={spells.SpellName}
                        SpellText={spells.SpellName}
                        SpellLevel={spells.SpellLevel}
                        onButtonClick={() => {
                          ActiveSpellPage(spells);
                        }}
                        isActiveSpell={
                          activeSpell !== undefined &&
                          activeSpell.SpellName === spells.SpellName
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

        <div className="spellListContainer" style={{display:activePage === "SpellListContainer" ? "block" : "none"}}>
          <SpellList/>
        </div>
      </div>
    </div>
  );
}
