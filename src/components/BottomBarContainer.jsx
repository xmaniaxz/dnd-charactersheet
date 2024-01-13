"use client";
import { useState, useEffect } from "react";
import { GetServerSpells, SortSpells } from "./Database";
import Filter from "./Filter";
import SpellButton from "./Spellbutton";

export default function BottomContainer() {
  const [spellData, setSpellData] = useState([]);
  const [isLoadingSpellData, setLoadingSpellData] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  // Define a debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const FetchData = async () => {
    try {
      setLoadingSpellData(true);
      let value = await GetServerSpells(activeFilters);
      let sortedValue = await SortSpells(value["documents"]);
      setSpellData(sortedValue);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingSpellData(false);
    }
  };

  // Wrap FetchData with debounce
  const debouncedFetchData = debounce(FetchData, 1000); // Set the desired delay (in milliseconds)

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
    console.log(activeFilters)
    debouncedFetchData();
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

  return (
    <div className="w-full float-left m-0 p-0">
      <div className="bottomContainer">
        <div className="bottominfoContainerButtons">
          <button>Spells</button>
          <button>Inventory</button>
          <button>Character info</button>
        </div>
        <div className="bottominfoContainerHeader">
          <div className="flex">
            <Filter
              key={"Class"}
              filterName="Class"
              Options={ClassOptions}
              onFilterUpdate={(filterValue, value) =>
                toggleFilter(filterValue, value)
              }
            />
            <Filter
              key={"School"}
              filterName="School"
              Options={SchoolOptions}
              onFilterUpdate={(filterValue, value) =>
                toggleFilter(filterValue, value)
              }
            />
            <Filter
              key={"SpellLevel"}
              filterName="SpellLevel"
              Options={LevelOptions}
              onFilterUpdate={(filterValue, value) =>
                toggleFilter(filterValue, value)
              }
            />
          </div>
        </div>
        <div className="bottomInfoContainerBody">
          <div className="bottomSpellsContainer">
            {isLoadingSpellData ? (
              <div>Loading...</div>
            ) : (
              // <div>loaded</div>
              spellData.map((spells) => {
                return (
                  <SpellButton
                    key={spells.Spell}
                    SpellText={spells.Spell}
                    SpellLevel={spells.SpellLevel}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
