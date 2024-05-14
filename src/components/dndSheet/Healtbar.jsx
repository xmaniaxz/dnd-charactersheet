import { useState, useEffect } from "react";
import { useCharacterInfo } from "@/components/dndSheet/characterinfocontext";
import style from "@/CSS/TopbarInfo.module.css";
export default function Healthbar() {
  const { characterInfo } = useCharacterInfo();
  const [currentHP, setCurrentHP] = useState("");
  const [maxHP, setMaxHP] = useState("");

  const CalcHealthPercentage = () => {
    if ((currentHP / maxHP) * 100 + 1 > 100) {
      return 100;
    }
    return (currentHP / maxHP) * 100 + 1;
  };

  useEffect(() => {
    if (currentHP && maxHP) {
      characterInfo.playerStats.Health = parseInt(currentHP);
      characterInfo.playerStats.MaxHealth = parseInt(maxHP);
    }
  }, [characterInfo.playerStats, currentHP, maxHP]);

  useEffect(() => {
    setMaxHP(characterInfo.playerStats.MaxHealth);
    setCurrentHP(characterInfo.playerStats.Health);
  }, [characterInfo.playerStats]);

  const getTransitionColor = (percentage) => {
    const hue = (percentage / 100) * 120;
    return `hsl(${hue}, 100%, 50%)`;
  };

  return (
    <div className="mt-[10px]">
      <div className={`${style.healthContainer}`}>
        <div
          className={`${style.healthBar}`}
          style={{
            width: `${CalcHealthPercentage()}%`,
            background: getTransitionColor(CalcHealthPercentage()),
            transition: "width 1s ease, background 1s ease",
          }}
        />
      </div>
      <div className={`${style.healthInput}`}>
        <label htmlFor="HP">HP</label>
        <input
          id="HP"
          className="w-[3ch] text-center m-[3px]"
          type="text"
          value={currentHP}
          placeholder="0"
          onChange={(e) => {
            let newValue = e.target.value.replace(/[^-+0-9]/g, "");
            setCurrentHP(parseInt(newValue));
          }}
        />
        /
        <input
          className="w-[3ch] m-[3px] text-center"
          id="maxHP "
          inputMode="numeric"
          type="text"
          value={maxHP}
          placeholder="0"
          onChange={(e) => {
            let newValue = e.target.value.replace(/[^-+0-9]/g, "");
            setMaxHP(parseInt(newValue));
          }}
        />
        <label htmlFor="MaxH" className="">
          MaxHP
        </label>
      </div>
    </div>
  );
}
