"use client";
import { useState, useEffect } from "react";
import Inventory from "./InventoryContainer";
import SpellList from "./SpellList";

export default function SpellContainer() {
  const [activePage, setActivePage] = useState("SpellListContainer");

  const ActiveInfoPage = (PageName) => {
    setActivePage(PageName);
  };
  return (
    <div className="w-full flex">
      <div className="bottomContainer">
        <div className="BottomInfoContainerButtons">
          <button
            className="BottomContainerButton"
            onClick={() => ActiveInfoPage("SpellListContainer")}
          >
            Spell List
          </button>
          <button
            className="BottomContainerButton"
            onClick={() => ActiveInfoPage("InventoryContainer")}
          >
            Inventory
          </button>
        </div>
        <div
          className="inventoryContainer"
          style={{
            display: activePage === "InventoryContainer" ? "block" : "none",
          }}
        >
          <Inventory />
        </div>
        <div
          className="spellListContainer"
          style={{
            display: activePage === "SpellListContainer" ? "block" : "none",
          }}
        >
          <SpellList />
        </div>
        <div
          className="characterInfoContainer"
          style={{
            display: activePage === "characterInfoContainer" ? "block" : "none",
          }}
        ></div>
      </div>
    </div>
  );
}
