import { useState, useEffect } from "react";
import SpellAlertBox from "./SpellAlertBox";
import SpellInfoData from "./SpellInfoData";
import { GetServerSpells } from "@/utils/node-appwrite";
import { useCharacterInfo } from "@/components/dndSheet/characterinfocontext";

export default function SpellList() {
  const { characterInfo } = useCharacterInfo();
  const [overlayActive, setOverlayActive] = useState(false);
  const [spellData, setSpellData] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeSpell, setActiveSpell] = useState(null);
  const [forceUpdate, setForceUpdate] = useState(false);
  const spellArrayKeys = ["cantrip", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [spellArray, setSpellArray] = useState(null);

  const fetchData = async () => {
    setSpellData(await GetServerSpells());
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(characterInfo)
    if (characterInfo.playerSpells) {
      setSpellArray(characterInfo.playerSpells);
    } else {
      setSpellArray(generateEmptySpellArray());
    }
  }, [characterInfo.playerSpells]);

  const generateEmptySpellArray = () => {
    const emptyArray = {};
    spellArrayKeys.forEach((key) => {
      emptyArray[key] = Array(1).fill({ prepared: false, spell: null });
    });
    return emptyArray;
  };

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
      updatedSpellArray[activeLevel].splice(selectedIndex, 1);
      // Filter all empty entries (where spell is null and prepared is false)
      updatedSpellArray[activeLevel] = updatedSpellArray[activeLevel].filter(
        (entry) => entry.spell !== null || entry.prepared !== false
      );
      // Push a new empty entry
      updatedSpellArray[activeLevel].push({ spell: null, prepared: false });
    } else {
      // Update the selected spell with the found spell data
      updatedSpellArray[activeLevel][selectedIndex] = {
        prepared: spellArray[activeLevel][selectedIndex].prepared,
        spell: spellData[_spellIndex],
      };
      setActiveSpell(updatedSpellArray[activeLevel][selectedIndex].spell);

      // Check if a new empty field should be added
      const lastIndex = updatedSpellArray[activeLevel].length - 1;
      if (
        updatedSpellArray[activeLevel][lastIndex].spell !== null ||
        updatedSpellArray[activeLevel][lastIndex].prepared !== false
      ) {
        // Push a new empty entry if the last entry is not empty
        updatedSpellArray[activeLevel].push({ spell: null, prepared: false });
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
    if(spellArray)
    characterInfo.playerSpells = spellArray;
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
          spellArrayKeys.map((level) => (
            <div className="spellLevelContainer" key={level}>
              <span className="levelHeader">{level}</span>
              {spellArray[level].map((spell, index) => (
                <div
                  key={index}
                  className={`w-full h-full ${
                    spell.spell && activeSpell === spell.spell ? "activeSpell" : ""
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
