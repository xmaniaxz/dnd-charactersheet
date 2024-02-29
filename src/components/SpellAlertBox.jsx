import styles from "@/CSS/homepage.module.css";
import SpellInfoData from "./SpellInfoData";
export default function SpellAlertBox({
  spellInfo,
  activeLevel,
  onSelection,
  onReturn,
}) {
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
            }}>
            {/* Show current spells  */}
          </div>
          {spellInfo &&
            spellInfo.map((values, index) => {
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
                    <SpellInfoData SpellData={values}/>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
