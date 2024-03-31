import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext";
import RadialColorWheel from "@/components/RadialWheel";

export default function WeaponsSys() {
  const [weapons, setWeapons] = useState([]);
  const [forceReload, setForceReload] = useState(false);
  const { characterInfo } = useCharacterInfo();
  const [activeColorWheel, setActiveColorWheel] = useState(0);

  const updateWeapon = (updatedWeapon) => {
    const updatedWeapons = weapons.map((weapon) =>
      weapon.id === updatedWeapon.id ? updatedWeapon : weapon
    );
    setWeapons(updatedWeapons);
  };

  const removeWeapon = (id) => {
    const updatedWeapons = weapons.filter((weapon) => weapon.id !== id);
    setWeapons(updatedWeapons);
  };

  const addWeapon = () => {
    const newWeapon = {
      id: Date.now(),
      name: "",
      damage: "",
      type: "Piercing",
      color: "",
    };
    setWeapons([...weapons, newWeapon]);
  };

  const saveWeapons = () => {
    characterInfo.playerInventory.Weapons = weapons;
  };

  useEffect(() => {
    setWeapons(characterInfo.playerInventory.Weapons);
  }, [characterInfo]);

  return (
    <div className="WeaponContainer">
      <div className="flex flex-row gap-[50px] items-center">
        <button
          id="WeaponAdd"
          className="button gg-add addWeapon"
          onClick={addWeapon}
        ></button>
        <label htmlFor="WeaponAdd" className="WeaponText">
          Add Weapon
        </label>
      </div>
      <div className="p-[10px] flex flex-col gap-[10px] ">
        {weapons.map((weapon) => (
          <div className="Weapon" key={"Weapon" + weapon.id}>
            <input
              type="text"
              placeholder={"Weapon" + weapon.id}
              className="WeaponName"
              style={{ color: weapon.color,transition:"color 0.5s"}}
              value={weapon.name}
              onChange={(e) => {
                const updatedWeapon = { ...weapon, name: e.target.value };
                updateWeapon(updatedWeapon);
                saveWeapons();
              }}
            />
            <input
              type="text"
              placeholder={"1d4"}
              className="WeaponDamage"
              value={weapon.damage}
              onChange={(e) => {
                const updatedWeapon = { ...weapon, damage: e.target.value };
                updateWeapon(updatedWeapon);
                saveWeapons();
              }}
            />
            <Dropdown
              Options={["Piercing", "Slashing", "Bludgeoning"]}
              placeholder="Piercing"
              CustomClass="WeaponType"
              OnSelection={(e) => {
                const updatedWeapon = { ...weapon, type: e };
                updateWeapon(updatedWeapon);
                saveWeapons();
              }}
              SelectedOption={weapon.type}
            />
            <i
              className="button gg-remove removeWeapon"
              onClick={() => {
                removeWeapon(weapon.id);
                saveWeapons();
              }}
            />
            <div>
              <RadialColorWheel
                onChange={(e) => {
                  weapon.color = e;
                  setForceReload(!forceReload);
                }
              }
              isActive={weapon.id === activeColorWheel ? false: true}
              SetActive={() => setActiveColorWheel(weapon.id)}
              ActiveColor={weapon.color}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
