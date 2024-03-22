import { useState, useEffect } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext";
import style from "@/CSS/TopbarInfo.module.css";
export default function Healthbar() {
  const { characterInfo } = useCharacterInfo();
  const [currentHP, setCurrentHP] = useState(
    characterInfo.playerInfo.currentHP
  );
  const [maxHP, setMaxHP] = useState(characterInfo.playerInfo.maxHP);

  const CalcHealthPercentage = () => {
    if ((currentHP / maxHP) * 100 + 1 > 100) {
      return 100;
    }
    return (currentHP / maxHP) * 100 + 1;
  };

  useEffect(() => {
    characterInfo.playerStats.Health = currentHP;
    characterInfo.playerStats.MaxHealth = maxHP;
  }, [currentHP, maxHP]);

  useEffect(() => {
    setMaxHP(characterInfo.playerStats.MaxHealth);
    setCurrentHP(characterInfo.playerStats.Health);
  }, [characterInfo]);

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
            transition: "width 0.5s ease, background 0.5s ease",
          }}
        />             
      </div>
      <div className={`${style.healthInput}`}>
        <label htmlFor="MaxH" className="">
          MaxHP
        </label>
        <input
          className="w-[3ch] m-[3px] text-center"
          id="maxHP "
          type="number"
          value={maxHP}
          placeholder="0"
          onChange={(e) => setMaxHP(parseInt(e.target.value))}
        />
        /
        <input
          id="HP"
          className="w-[3ch] text-center m-[3px]"
          type="number"
          value={currentHP}
          placeholder="0"
          onChange={(e) => setCurrentHP(parseInt(e.target.value))}
        />
        <label htmlFor="HP">HP</label>
      </div>
    </div>
  );
}
