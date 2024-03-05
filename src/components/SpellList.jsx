import { useState, useEffect } from "react";
import SpellAlertBox from "./SpellAlertBox";
import SpellInfoData from "./SpellInfoData";
import { GetServerSpells } from "./Database";
import { useCharacterInfo } from "./characterinfocontext";

export default function SpellList() {
  const {characterInfo} = useCharacterInfo();
  const [overlayActive, setOverlayActive] = useState(false); // boolean to show or hide the overlay (default: false)
  const [spellData, setSpellData] = useState(null); // Sets the spell data from the server (DO NOT ADJUST THIS STATE)
  const [activeLevel, setActiveLevel] = useState(null); // The active spell level (DO NOT ADJUST THIS STATE)
  const [selectedIndex, setSelectedIndex] = useState(null); // Index of the selected spell (DO NOT ADJUST THIS STATE)
  const [activeSpell, setActiveSpell] = useState(null); // The active spell (DO NOT ADJUST THIS STATE)
  const spellArrayKeys = ["cantrip", 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Array of spell levels (DO NOT ADJUST THIS STATE)
  const [spellArray, setSpellArray] = useState({
    cantrip: Array(10).fill({ prepared: false, spell: null }),
    1: Array(10).fill({ prepared: false, spell: null }),
    2: Array(10).fill({ prepared: false, spell: null }),
    3: Array(10).fill({ prepared: false, spell: null }),
    4: Array(10).fill({ prepared: false, spell: null }),
    5: Array(10).fill({ prepared: false, spell: null }),
    6: Array(10).fill({ prepared: false, spell: null }),
    7: Array(10).fill({ prepared: false, spell: null }),
    8: Array(10).fill({ prepared: false, spell: null }),
    9: Array(10).fill({ prepared: false, spell: null }),
  }); // Array of spell objects (DO NOT ADJUST THIS STATE MANUALLY)

  //#region GetSpells

  const data = async () => {
    setSpellData(await GetServerSpells());
  };
  useEffect(() => {
    data();
  }, []);
  useEffect(() => {
    if (spellData){}
  }, [spellData]);
  //#endregion

  const HandleClick = (index, level) => {
    setOverlayActive(!overlayActive);
    setSelectedIndex(index);
    setActiveLevel(level);
  };

  const HandleOnReturn = () => {
    setOverlayActive(false);
    setActiveLevel(null);
  };
  const HandleOnSelection = (spellIndex) => {
    setOverlayActive(false);
    if (spellIndex === -1) {
      let newArray = [...spellArray[activeLevel]];
      newArray.splice(selectedIndex, 1, { prepared: false, spell: null });
      setSpellArray({ ...spellArray, [activeLevel]: newArray });
    } else {
      let newArray = [...spellArray[activeLevel]];
      newArray.splice(selectedIndex, 1, {
        prepared: false,
        spell: spellData[spellIndex],
      });
      setSpellArray({ ...spellArray, [activeLevel]: newArray });
    }
  };

  const onMouseEnter = (spell) => {
    setActiveSpell(spell);
  }
  const HandleCheckBox = (levels,index) =>{
    let newArray = [...spellArray[levels]];
  newArray[index] = {...newArray[index], prepared: !newArray[index].prepared};
  setSpellArray({...spellArray, [levels]: newArray});
  }

  //#region SaveFile
  useEffect(() => {
    if(spellArray){
      console.log("Got an update to SpellArray");
      console.log(characterInfo.playerSpells);
      characterInfo.playerSpells = spellArray;
    }
  }, [spellArray]);

  useEffect(() => {setSpellArray(characterInfo.playerSpells)}, [characterInfo]);
  //#endregion

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
                      <div key={index} className="w-full h-full">
                        <div className="spellDetails">
                          <input type="checkbox" checked={characterInfo.playerSpells[Levels][index].prepared} onClick={()=>HandleCheckBox(Levels,index)}/>
                          <div
                            className="w-full spellName"
                            onClick={() => {
                              HandleClick(index, Levels);
                            }}
                            onMouseEnter={() => onMouseEnter(spell.spell)}
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
          {activeSpell ? <SpellInfoData SpellData={activeSpell} /> : null}
        </div>
      </div>
    );
  };
