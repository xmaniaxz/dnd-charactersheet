import InputField from "@/components/Inputfields";
import WeaponsSys from "@/components/Weapons";
import { useCharacterInfo } from "./characterinfocontext";
import { useState,useEffect } from "react";
export default function Inventory() {
  const {characterInfo} = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(false);
  const [inventoryData,setInventoryData] = useState("");

  useEffect(()=>{setInventoryData(characterInfo.playerInventory.Inventory);setUpdatedValue(true);},[characterInfo])

  const HandleInputChange = (input) =>{
    //console.log(`got ${input.target.value} in Storage`)
    setInventoryData(input.target.value);
    characterInfo.playerInventory.Inventory = input.target.value
    console.log(characterInfo.playerInventory.Inventory);
  }
  const HandleMoneyChange = (e,Cointype) =>{
    if (!isNaN(parseInt(e))) e = parseInt(e);
    else e = 0
    //console.log(`got ${e} in ${Cointype}`)
    characterInfo.playerInventory.Coins[Cointype] = e
  }

  return (
    <div>
      <div className="InventoryContainer">
        <div className="w-1/2 h-full float-left">
          <div id="Money" className="MoneyContainer">
            <InputField
            key={"Copper"+updatedValue}            
              classname={"InventoryMoneyInputFields"}
              InputText={"Copper Coins"}
              onValueChanged={(e)=>HandleMoneyChange(e,"Copper")}
              defaultValue={characterInfo.playerInventory.Coins.Copper}
            />
            <InputField
            key={"Silver"+updatedValue}
              classname={"InventoryMoneyInputFields"}
              InputText={"Silver Coins"}
              onValueChanged={(e)=>HandleMoneyChange(e,"Silver")}
              defaultValue={characterInfo.playerInventory.Coins.Silver}
            />
            <InputField
            key={"Gold"+updatedValue}
              classname={"InventoryMoneyInputFields"}
              InputText={"Gold Coins"}
              onValueChanged={(e)=>HandleMoneyChange(e,"Gold")}
              defaultValue={characterInfo.playerInventory.Coins.Gold}
            />
            <InputField
            key={"Platinum"+updatedValue}
              classname={"InventoryMoneyInputFields"}
              InputText={"Platinum Coins"}
              onValueChanged={(e)=>HandleMoneyChange(e,"Platinum")}
              defaultValue={characterInfo.playerInventory.Coins.Platinum}
            />
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
