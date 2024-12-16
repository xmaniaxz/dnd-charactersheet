"use client";
import { GetServerSpells } from "@/utils/node-appwrite";
import { useState } from "react";

export default function SpellList() {
  const [reloadPage, SetReloadPage] = useState(false);
  const [dataRegister, updateDataRegister] = useState({
    cantrip: {
      spells: null,
    },
    1: {
      spells: null,
    },
    2: {
      spells: null,
    },
    3: {
      spells: null,
    },
    4: {
      spells: null,
    },
    5: {
      spells: null,
    },
    6: {
      spells: null,
    },
    7: {
      spells: null,
    },
    8: {
      spells: null,
    },
    9: {
      spells: null,
    },
  });

  const RetrieveSpellData = async () => {
    const spellData = await GetServerSpells();
    const tempRegister = new Object(dataRegister);
    spellData.forEach((spell) => {
      const level = spell.SpellLevel;
      if (dataRegister[level]) {
        if (!dataRegister[level].spells) {
          tempRegister[level].spells = [];
        }
        tempRegister[level].spells.push(spell);
      }
    });
    updateDataRegister(tempRegister);
    SetReloadPage(!reloadPage);
    // console.log(dataRegister);
  };

  return (
    <div className="flex flex-wrap">
      {/* <button onClick={() => RetrieveSpellData()}>RetrieveData</button> */}
      {Object.keys(dataRegister)
        .sort((a, b) => (a === "cantrip" ? -1 : b === "cantrip" ? 1 : a - b))
        .map((level, index) => {
          return (
            <div key={index + reloadPage} className="">
              <header className="flex gap-[10px]">
                <h4 className="underline">{level}</h4>
                <h4>
                  charges: <input type="number" />
                </h4>
              </header>
              <div className="flex flex-wrap gap-[10px]">
               
              </div>
            </div>
          );
        })}
    </div>
  );
}
