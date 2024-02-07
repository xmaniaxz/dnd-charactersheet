"use client";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";


export default function WeaponsSys() {
  const [weapons, setWeapons] = useState([]);

  const RemoveWeapon = (id) => {
    const updatedWeapons = weapons.filter((weapon) => weapon.id !== id);
    setWeapons(updatedWeapons);  
  };

  const AddWeapon = () => {
    const updatedWeapons = [
      ...weapons,
      {
        id: Date.now(),
      },
    ];
    setWeapons(updatedWeapons);    
  };


  return (
    <div className="WeaponContainer">
      <button className="WeaponButton" onClick={AddWeapon}>
        +
      </button>
      <br />
      <div>
        {weapons.map((weapon) => (
          <div className="Weapon" key={"Weapon" + weapon.id}>
            <input
              type="text"
              placeholder={"Weapon" + weapon.id}
              className="WeaponName"
            />
            <input type="text" className="WeaponDamage" />
            <Dropdown
              Options={[
                "Piercing",
                "Slashing",
                "Bludgeoning",
              ]}
              className="WeaponType"
            />
            <button className="WeaponButton" onClick={() => RemoveWeapon(weapon.id)}>
              -
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}