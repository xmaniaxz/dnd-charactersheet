
import WeaponsSys from "@/components/Weapons";
import { useCharacterInfo } from "./characterinfocontext";
import { useState,useEffect } from "react";
export default function Inventory() {
  const {characterInfo} = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(false);
  const [inventoryData,setInventoryData] = useState("");

  useEffect(()=>{setInventoryData(characterInfo.playerInventory.Inventory);setUpdatedValue(true);},[characterInfo])

  const HandleInputChange = (input) =>{
    setInventoryData(input.target.value);
    characterInfo.playerInventory.Inventory = input.target.value
    console.log(characterInfo.playerInventory.Inventory);
  }
  const HandleMoneyChange = (e,Cointype) =>{
    if (!isNaN(parseInt(e))) e = parseInt(e);
    else e = 0
    characterInfo.playerInventory.Coins[Cointype] = e
  }

  return (
    <div>
      <div>
        <div className="w-1/2 h-full float-left">
          <div id="Money" className="MoneyContainer">
            
          </div>

          <div id="Weapons">
            <WeaponsSys/>
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
