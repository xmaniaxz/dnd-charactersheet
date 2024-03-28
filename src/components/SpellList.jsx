import { useState, useEffect } from "react";
import SpellAlertBox from "./SpellAlertBox";
import SpellInfoData from "./SpellInfoData";
import { GetServerSpells } from "../utils/Database";
import { useCharacterInfo } from "./characterinfocontext";

export default function SpellList() {
  const { characterInfo } = useCharacterInfo();
  const [overlayActive, setOverlayActive] = useState(false); // boolean to show or hide the overlay (default: false)
  const [spellData, setSpellData] = useState(null); // Sets the spell data from the server (DO NOT ADJUST THIS STATE)
  const [activeLevel, setActiveLevel] = useState(null); // The active spell level (DO NOT ADJUST THIS STATE)
  const [selectedIndex, setSelectedIndex] = useState(null); // Index of the selected spell (DO NOT ADJUST THIS STATE)
  const [activeSpell, setActiveSpell] = useState(null); // The active spell (DO NOT ADJUST THIS STATE)
  const spellArrayKeys = ["cantrip", 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Array of spell levels (DO NOT ADJUST THIS STATE)
  const [spellArray, setSpellArray] = useState({
    cantrip: Array(1).fill({ prepared: false, spell: null }),
    1: Array(1).fill({ prepared: false, spell: null }),
    2: Array(1).fill({ prepared: false, spell: null }),
    3: Array(1).fill({ prepared: false, spell: null }),
    4: Array(1).fill({ prepared: false, spell: null }),
    5: Array(1).fill({ prepared: false, spell: null }),
    6: Array(1).fill({ prepared: false, spell: null }),
    7: Array(1).fill({ prepared: false, spell: null }),
    8: Array(1).fill({ prepared: false, spell: null }),
    9: Array(1).fill({ prepared: false, spell: null }),
  }); // Array of spell objects (DO NOT ADJUST THIS STATE MANUALLY)

  //#region GetSpells

  const data = async () => {
    setSpellData(await GetServerSpells());
  };
  useEffect(() => {
    data();
  }, []);

  useEffect(() => {
    // if (characterInfo.playerSpells) 
    // setSpellArray(characterInfo.playerSpells);
  }, [characterInfo]);
  //#endregion

  // const HandleClick = (index, level, spell) => {
  //   if (spell !== null) {
  //     if (activeSpell !== spell) {
  //       setActiveSpell(spell);
  //     } else {
  //       setOverlayActive(!overlayActive);
  //       setSelectedIndex(index);
  //       setActiveLevel(level);
  //     }
  //   }
  //   else {
  //     setOverlayActive(!overlayActive);
  //     setSelectedIndex(index);
  //     setActiveLevel(level);
  //   }
  // };

  // const HandleOnReturn = () => {
  //   setOverlayActive(false);
  //   setActiveLevel(null);
  //   setActiveSpell(null);
  // };

  const HandleOnSelection = (spellIndex) => {
    setOverlayActive(false);
    const _spellIndex = spellData.findIndex(
      (spell) => spell.SpellName === spellIndex
    );
    if (spellIndex === -1) {
      // Create a copy of spellArray
      const updatedSpellArray = { ...spellArray };

      updatedSpellArray[activeLevel].splice(selectedIndex, 1); // Remove the selected spell (if it exists
      console.log(_spellIndex);
      // Filter all empty entries (where spell is null and prepared is false)
      updatedSpellArray[activeLevel] = spellArray[activeLevel].filter(
        (entry) => entry.spell !== null || entry.prepared !== false
      );
      updatedSpellArray[activeLevel].push({ spell: null, prepared: false });
      setSpellArray(updatedSpellArray);
      // setSpellArray(updatedSpellArray); // Uncomment this line if you want to update the state with the modified array
    } else {
      const updatedSpellArray = { ...spellArray };
      const selectedSpell = updatedSpellArray[activeLevel][selectedIndex];
      if (selectedSpell.spell === null && selectedSpell.prepared === false) {
        updatedSpellArray[activeLevel].push({ spell: null, prepared: false });
      }
      updatedSpellArray[activeLevel][selectedIndex] = {
        prepared: spellArray[activeLevel][selectedIndex].prepared,
        spell: spellData[_spellIndex],
      };
      setActiveSpell(selectedSpell.spell);
      setSpellArray(updatedSpellArray);
    }
  };

  const HandleCheckBox = (levels, index) => {
    setSpellArray((prevSpellArray) => {
      const updatedSpellArray = { ...prevSpellArray }; // Make a shallow copy of the object
      updatedSpellArray[levels] = [...prevSpellArray[levels]]; // Make a shallow copy of the inner array
      updatedSpellArray[levels][index] = {
        ...prevSpellArray[levels][index],
        prepared: !prevSpellArray[levels][index].prepared, // Toggle the prepared value
      };
      return updatedSpellArray;
    });
  };

  useEffect(() => {
    characterInfo.playerSpells = spellArray;
  }, [spellArray]);

  return (
    <div id="outerContainer" className="h-[100%] w-[100%]">
      <div style={{ display: overlayActive ? "block" : "none" }}>
        <SpellAlertBox
          spellInfo={spellData}
          activeLevel={activeLevel}
          onReturn={() => {
            HandleOnReturn();
          }}
          onSelection={(e) => HandleOnSelection(e)}
        />
      </div>
      <div className="spellList">
        {spellArray &&
          spellArrayKeys.map((Levels) => {
            return (
              <div className="spellLevelContainer" key={Levels}>
                <span className="levelHeader">{Levels}</span>
                {spellArray[Levels].map((spell, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-full h-full ${
                        activeSpell == spell.spell ? "activeSpell" : ""
                      }`}
                    >
                      <div className="spellDetails">
                        <input
                          type="checkbox"
                          checked={spellArray[Levels][index].prepared}
                          onChange={() => HandleCheckBox(Levels, index)}
                        />
                        <div
                          className="w-full spellName button"
                          onClick={() => HandleClick(index, Levels, spell.spell)}
                        >
                          {spell.spell ? spell.spell.SpellName : ""}
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div className="spellInfoListContainer">
        {activeSpell && <SpellInfoData SpellData={activeSpell} />}
      </div>
    </div>
  );
}
