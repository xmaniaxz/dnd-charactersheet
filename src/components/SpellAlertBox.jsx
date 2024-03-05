import styles from "@/CSS/homepage.module.css";
import SpellInfoData from "./SpellInfoData";
import { useEffect, useState } from "react";
export default function SpellAlertBox({
  spellInfo,
  activeLevel,
  onSelection,
  onReturn,
}) {
  const [spellData, setSpellData] = useState(spellInfo);

    useEffect(() => {
      if (spellInfo && activeLevel) {
        const filteredlist = spellInfo.filter((spell) => {
          return spell.SpellLevel === activeLevel.toString();
        });
        setSpellData(filteredlist);
      }
    }, [spellInfo, activeLevel]); // Filter spells based on level provided. 


  return (
    <div className={`${styles.alertBGContainer}`}>
      <div className="spellAlertBox">
        <span onClick={() => onReturn()} className="closeButton"></span>
        <div className="mt-[10px] text-2xl text-center">{activeLevel}</div>
        <div id="SpellList" className="listContainer">
          <div
            className="gg-remove-r text-[red] mb-[10px] hover:text-white hover:cursor-pointer"
            onClick={() => {
              onSelection(-1);
            }}
          >
            {/* Show current spells  */}
          </div>
          {spellData &&
            spellData.map((values, index) => {
              //Show list of spellnames
              return (
                <div
                  className="w-[30%] hover:cursor-pointer"
                  key={index}
                  onClick={() => {
                    onSelection(index);
                  }}
                >
                  <div className="spellName">{values.SpellName}</div>
                  <div className="spellInfoContainer">
                    <SpellInfoData SpellData={values} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
