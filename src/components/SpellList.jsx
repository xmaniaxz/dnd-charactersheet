import { useState, useEffect } from "react";
import SpellAlertBox from "./SpellAlertBox";
import SpellInfoData from "./SpellInfoData";

export default function SpellList({ spellData }) {
  const [spellInfo, setSpellInfo] = useState([]);
  const [overlayActive, setOverlayActive] = useState(false);
  const [activeLevel, setActiveLevel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [spells, setSpells] = useState(Array(10).fill(null)); // Initialize with 10 null values
  const [activeSpell,setActiveSpell] = useState();

  const handleClick = (index, Level) => {
    setOverlayActive(true);
    setActiveLevel(Level);
    setSelectedIndex(index);
  };

  const handleReturn = () => {
    setOverlayActive(false);
    setActiveLevel("");
    setSelectedIndex(null);
  };

  const handleMouseEnter = (SpellObject) => {
    if(SpellObject !== activeSpell)
    {
        setActiveSpell(SpellObject);
    }
  };

  const handleMouseLeave = () => {
    setActiveSpell(null);
  };

  const handleSpellSelection = (selectedSpellIndex) => {
    if (selectedIndex !== null) {
      let selectedSpell;
      selectedSpellIndex === -1
        ? (selectedSpell = null)
        : (selectedSpell = spellInfo[selectedSpellIndex]);
      setSpells((prevSpells) => {
        const newSpells = [...prevSpells];
        newSpells[selectedIndex] = selectedSpell;
        return newSpells;
      });
    }
    handleReturn();
  };

  useEffect(() => {
    function SortSpells(activeLevel) {
      const matchingSpells = spellData.filter(
        (values) => values.SpellLevel === activeLevel
      );
      setSpellInfo(matchingSpells);
    }

    SortSpells(activeLevel);
  }, [activeLevel]);

  return (
    <div className="spellListContainer">
      {/* Overlay. */}
      {overlayActive && (
        <SpellAlertBox
          spellInfo={spellInfo}
          activeLevel={activeLevel}
          onSelection={(selectedSpellIndex) =>
            handleSpellSelection(selectedSpellIndex)
          }
          onReturn={() => handleReturn()}
        />
      )}
      {/* Cantrips List */}
      <div id="Cantrips" className="spellLevelListContainer">
        Cantrips
        {spells.map((spell, index) => (
          <div key={index}>
            <div className="flex h-[25px] ">
              <input type="checkbox" />
              <div
                className="hover:cursor-pointer w-full ml-[15px]"
                onClick={() => handleClick(index, "cantrip")}
              >
                {spell ? <div 
                className="spellName"
                onMouseEnter={handleMouseEnter(spell)}
                onMouseLeave={handleMouseLeave}
                >{spell.SpellName}</div> : ""}
              </div>
            </div>
            <hr />
            <div className="spellInfoContainer">
            </div>    
          </div>
        ))}
      </div>
    <div className="spellInfo">

    </div>


    </div>
  );
}
