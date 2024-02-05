"use client";

import { CharacterInfo } from "./Variables";

function SaveFile() {
  localStorage.setItem("Storage", JSON.stringify(CharacterInfo));
}

function LoadFile() {
  const doc = JSON.parse(localStorage.getItem("Storage"));
  if (doc) {
    Object.assign(CharacterInfo, doc);
  }
  console.log("Loaded documents: " + JSON.stringify(CharacterInfo))
  document.dispatchEvent(new Event("CharacterFileUpdated"))
}

export { SaveFile, LoadFile};
