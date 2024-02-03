import InputField from "./Inputfields";
import WeaponsSys from "./Weapons";
export default function Inventory() {
  return (
    <div>
      <div className="InventoryContainer">
        <div className="w-1/2 h-full float-left">
          <div id="Money" className="MoneyContainer">
            <InputField
              classname={"InventoryMoneyInputFields"}
              InputText={"Copper Coins"}
            />
            <InputField
              classname={"InventoryMoneyInputFields"}
              InputText={"Silver Coins"}
            />
            <InputField
              classname={"InventoryMoneyInputFields"}
              InputText={"Gold Coins"}
            />
            <InputField
              classname={"InventoryMoneyInputFields"}
              InputText={"Platinum Coins"}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
