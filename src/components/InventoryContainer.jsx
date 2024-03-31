import WeaponsSys from "@/components/Weapons";
import { useCharacterInfo } from "./characterinfocontext";
import { useState, useEffect } from "react";
export default function Inventory() {
  const { characterInfo } = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(false);
  const [inventoryData, setInventoryData] = useState("");

  useEffect(() => {
    setInventoryData(characterInfo.playerInventory.Inventory);
    setUpdatedValue(true);
  }, [characterInfo]);

  const HandleInputChange = (input) => {
    setInventoryData(input.target.value);
    characterInfo.playerInventory.Inventory = input.target.value;
  };
  const HandleMoneyChange = (e, Cointype) => {
    characterInfo.playerInventory.Coins[Cointype] = e;
    setUpdatedValue(!updatedValue);
  };

  return (
    <div>
      <div>
        <div className="w-1/2 h-full float-left">
          <div id="Money" className="MoneyContainer">
            <label htmlFor="Copper">Copper</label>
            <input
              id="Copper"
              type="number"
              value={characterInfo.playerInventory.Coins.Copper}
              onChange={(e) => HandleMoneyChange(e.target.value, "Copper")}
            />
            <label htmlFor="Silver">Silver</label>
            <input
              id="Silver"
              type="number"
              value={characterInfo.playerInventory.Coins.Silver}
              onChange={(e) => HandleMoneyChange(e.target.value, "Silver")}
            />
            <label htmlFor="Gold">Gold</label>
            <input
            id="Gold"
              type="number"
              value={characterInfo.playerInventory.Coins.Gold}
              onChange={(e) => HandleMoneyChange(e.target.value, "Gold")}
            />
            <label htmlFor="Platinum">Platinum</label>
            <input
              id="Platinum"
              type="number"
              value={characterInfo.playerInventory.Coins.Platinum}
              onChange={(e) => HandleMoneyChange(e.target.value, "Platinum")}
            />
          </div>

          <div id="Weapons">
            <WeaponsSys />
          </div>
        </div>
        <div id="Inventory" className="h-full float-left w-1/2">
          <div className="BackgroundImageTextArea">
            <div className="InventoryAreaHeader">Inventory</div>
            <textarea
              className="InventoryArea"
              name="Inventory"
              id=""
              cols="20"
              rows="10"
              value={characterInfo.playerInventory.Inventory}
              onChange={(e) => HandleInputChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
