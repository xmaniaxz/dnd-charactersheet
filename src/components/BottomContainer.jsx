"use client";
import { useState } from "react";
import { WriteSheetToDatabase } from "../utils/Database";
import Inventory from "./InventoryContainer";
import SpellList from "./SpellList";
import { useCharacterInfo } from "@/components/characterinfocontext";

export default function SpellContainer() {
  const [activeFilters, setActiveFilters] = useState([]);
  const [activePage, setActivePage] = useState("SpellListContainer");
  const { characterInfo } = useCharacterInfo();

  //#region Filter
  // const toggleFilter = (filterType, filter) => {
  //   if (filterType === "SpellName") {
  //     // Handle search filter separately
  //     const index = activeFilters.findIndex((f) => f[0] === "SpellName");
  //     //If input is empty
  //     if (typeof filter === undefined || filter === "") {
  //       setActiveFilters((prevActiveFilters) => [
  //         ...prevActiveFilters.filter((f) => f[0] !== "SpellName"), // Remove previous search filter if exist
  //       ]);
  //     } else if (index === -1) {
  //       // If search filter doesn't exist, add it
  //       setActiveFilters((prevActiveFilters) => [
  //         ...prevActiveFilters.filter((f) => f[0] !== "SpellName"), // Remove previous search filter if exists
  //         [filterType, filter],
  //       ]);
  //     } else {
  //       // If search filter already exists, update its value
  //       setActiveFilters((prevActiveFilters) => {
  //         const newArray = [...prevActiveFilters];
  //         newArray[index] = [filterType, filter];
  //         return newArray;
  //       });
  //     }
  //   } else {
  //     // Handle other filters
  //     const index = activeFilters.findIndex(
  //       (f) => f[0] === filterType && f[1] === filter
  //     );
  //     if (index === -1) {
  //       setActiveFilters((prevActiveFilters) => [
  //         ...prevActiveFilters,
  //         [filterType, filter],
  //       ]);
  //     } else {
  //       const newArray = [...activeFilters];
  //       newArray.splice(index, 1);
  //       setActiveFilters(newArray);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoadingSpellData(true);
  //     setSpellData(await GetServerSpells(activeFilters));
  //     setLoadingSpellData(false);
  //   };

  //   fetchData();

  //   const debouncedGetSpellData = debounce(async () => {
  //     setLoadingSpellData(true);
  //     setSpellData(await GetServerSpells(activeFilters));
  //     setLoadingSpellData(false);
  //   }, 1500);

  //   return () => clearTimeout(debouncedGetSpellData);
  // }, [activeFilters]);

  // function debounce(func, delay) {
  //   let timeoutId;
  //   return function () {
  //     const context = this;
  //     const args = arguments;
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(context, args), delay);
  //   };
  // }
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

  const ActiveInfoPage = (PageName) => {
    setActivePage(PageName);
  };
  return (
    <div className="w-full flex">
      <div className="bottomContainer">
        <div className="BottomInfoContainerButtons">
          <button
            className="BottomContainerButton"
            onClick={() => ActiveInfoPage("SpellListContainer")}
          >
            Spell List
          </button>
          <button
            className="BottomContainerButton"
            onClick={() => ActiveInfoPage("InventoryContainer")}
          >
            Inventory
          </button>
          <button
            className="BottomContainerButton"
            onClick={() => ActiveInfoPage("characterInfoContainer")}
          >
            Character info
          </button>
          <button
            className="BottomContainerButton"
            onClick={(e) => {
              WriteSheetToDatabase(characterInfo);
            }}
          >
            Save Document
          </button>
        </div>
        <div
          className="inventoryContainer"
          style={{
            display: activePage === "InventoryContainer" ? "block" : "none",
          }}
        >
          <Inventory />
        </div>
        <div
          className="spellListContainer"
          style={{
            display: activePage === "SpellListContainer" ? "block" : "none",
          }}
        >
          <SpellList />
        </div>
        <div className="characterInfoContainer"
         style={{
          display: activePage === "characterInfoContainer" ? "block" : "none",
        }}>

        </div>
      </div>
    </div>
  );
}
