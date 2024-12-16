import { useState, useEffect } from "react";
import SpellAlertBox from "./SpellAlertBox";
import SpellInfoData from "./SpellInfoData";
import { GetServerSpells } from "@/utils/node-appwrite";
import { useCharacterInfo } from "@/components/dndSheet/characterinfocontext";

export default function SpellList() {
  const [runInit, setRunInit] = useState(0);
  const { characterInfo } = useCharacterInfo();
  const [overlayActive, setOverlayActive] = useState(false);
  const [spellData, setSpellData] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeSpell, setActiveSpell] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [spellArray, setSpellArray] = useState({
    cantrip: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    1: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    2: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    3: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    4: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    5: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    6: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    7: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    8: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
    9: { spellSlots: 0, spells: [{ prepared: false, spell: null }] },
  });

  const fetchData = async () => {
    setSpellData(await GetServerSpells());
  };

  useEffect(() => {
    fetchData();
    if (characterInfo) {
      setRunInit(1);
      // console.log("setting runInit to 1");
    }
  }, []);

  useEffect(() => {
    setSpellArray(characterInfo.playerSpells);
  }, [characterInfo]);

  const handleClick = (index, level, spell) => {
    if (spell !== null) {
      if (activeSpell !== spell) {
        setActiveSpell(spell);
      } else {
        setOverlayActive(!overlayActive);
        setSelectedIndex(index);
        setActiveLevel(level);
      }
    } else {
      setOverlayActive(!overlayActive);
      setSelectedIndex(index);
      setActiveLevel(level);
    }
  };

  const handleOnReturn = () => {
    setOverlayActive(false);
    setActiveLevel(null);
    setActiveSpell(null);
  };

  const handleOnSelection = (spellIndex) => {
    setOverlayActive(false);
    const updatedSpellArray = { ...spellArray };
    const _spellIndex = spellData.findIndex(
      (spell) => spell.SpellName === spellIndex
    );

    if (_spellIndex === -1) {
      // Spell not found, remove selected spell if it exists
      updatedSpellArray[activeLevel].spells.splice(selectedIndex, 1);
      // Filter all empty entries (where spell is null and prepared is false)
      updatedSpellArray[activeLevel].spells = updatedSpellArray[
        activeLevel
      ].spells.filter(
        (entry) => entry.spell !== null || entry.prepared !== false
      );
      // Push a new empty entry
      updatedSpellArray[activeLevel].spells.push({
        spell: null,
        prepared: false,
      });
    } else {
      // Update the selected spell with the found spell data
      updatedSpellArray[activeLevel].spells[selectedIndex] = {
        prepared: spellArray[activeLevel].spells[selectedIndex].prepared,
        spell: spellData[_spellIndex],
      };
      setActiveSpell(
        updatedSpellArray[activeLevel].spells[selectedIndex].spell
      );

      // Check if a new empty field should be added
      const lastIndex = updatedSpellArray[activeLevel].spells.length - 1;
      if (
        updatedSpellArray[activeLevel].spells[lastIndex].spell !== null ||
        updatedSpellArray[activeLevel].spells[lastIndex].prepared !== false
      ) {
        // Push a new empty entry if the last entry is not empty
        updatedSpellArray[activeLevel].spells.push({
          spell: null,
          prepared: false,
        });
      }
    }

    setSpellArray(updatedSpellArray);
    setForceUpdate(!forceUpdate);
  };

  const handleCheckBox = (levels, index) => {
    setSpellArray((prevSpellArray) => {
      const updatedSpellArray = { ...prevSpellArray };
      updatedSpellArray[levels] = [...prevSpellArray[levels]];
      updatedSpellArray[levels][index] = {
        ...prevSpellArray[levels][index],
        prepared: !prevSpellArray[levels][index].prepared,
      };
      return updatedSpellArray;
    });
  };

  useEffect(() => {
    if (runInit !== 0) {
      characterInfo.playerSpells = spellArray;
      // console.log(spellArray);
    }
  }, [forceUpdate]);

  return (
    <div id="outerContainer" className="h-[100%] w-[100%]">
      {overlayActive && (
        <SpellAlertBox
          spellInfo={spellData}
          activeLevel={activeLevel}
          onReturn={handleOnReturn}
          onSelection={handleOnSelection}
        />
      )}
      <div className="spellList">
        {spellArray &&
          Object.keys(spellArray)
            .sort((a, b) =>
              a === "cantrip" ? -1 : b === "cantrip" ? 1 : a - b
            )
            .map((level) => (
              <div className="spellLevelContainer" key={level}>
                <span className="levelHeader">
                  {level}
                  <br />
                  <div className="flex gap-[1ch] text-[1.2ch]">
                    <label htmlFor={`spellslots${level}`}>slots:</label>
                    <input
                      className="w-[100%]"
                      id={`spellslots${level}`}
                      type="text"
                      placeholder="0"
                      value={
                        spellArray[level].spellSlots === 0
                          ? ""
                          : spellArray[level].spellSlots
                      }
                      onChange={(e) => {
                        spellArray[level].spellSlots = e.target.value;
                        setForceUpdate(!forceUpdate);
                        // console.log(forceUpdate);
                      }}
                    />
                  </div>
                </span>
                {/* {spellArray[level].spells && console.log(spellArray[level].spells)} */}
                {spellArray[level].spells.map((spell, index) => (
                  <div
                    key={index}
                    className={`w-full h-full ${
                      spell.spell && activeSpell === spell.spell
                        ? "activeSpell"
                        : ""
                    }`}
                  >
                    <div className="spellDetails">
                      <input
                        type="checkbox"
                        checked={spell.prepared}
                        onChange={() => handleCheckBox(level, index)}
                      />
                      <div
                        className="w-full spellName button"
                        onClick={() => handleClick(index, level, spell.spell)}
                      >
                        {spell.spell ? spell.spell.SpellName : ""}
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            ))}
      </div>
      <div className="spellInfoListContainer">
        {activeSpell && <SpellInfoData SpellData={activeSpell} />}
      </div>
    </div>
  );
}
