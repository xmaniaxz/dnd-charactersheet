"use client";
import { useState, useEffect } from "react";
import { GetServerSpells, SortSpells } from "./Database";
import Filter from "./Filter";
import SpellButton from "./Spellbutton";

export default function BottomContainer() {
  const [data, setData] = useState();
  const [spellData, setSpellData] = useState([]);
  const [isLoadingSpellData, setLoadingSpellData] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    FetchData().then(setData);
    console.log(data);
  }, [activeFilters]);

  const FetchData = async () => {
    var promise = await GetServerSpells(activeFilters);
    return promise;
  };

  // // Define a debounce function
  // const debounce = (func, delay) => {
  //   let timeoutId;
  //   return function (...args) {
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(() => func.apply(this, args), delay);
  //   };
  // };

  // const debouncedFetchData = debounce(FetchData, 1000);

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

  const ActiveInfoPage = (PageName) => {
    if (activePage === PageName) {
      setActivePage("");
      if (spellData.length < 1) debouncedFetchData();
    } else setActivePage(PageName);
  };

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
          <button onClick={() => ActiveInfoPage("SpellsContainer")}>
            Spells
          </button>
          <button onClick={() => ActiveInfoPage("InventoryContainer")}>
            Inventory
          </button>
          <button onClick={() => ActiveInfoPage("Info")}>Character info</button>
        </div>
        <div
          id="SpellsContainer"
          style={{
            display: activePage === "SpellsContainer" ? "block" : "none",
          }}
        >
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
            {/* <div className="bottomSpellsContainer">
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
            </div> */}
          </div>
        </div>
        <div id="InventoryContainer"></div>
      </div>
    </div>
  );
}
