"use client"
import { createContext, useContext, useState } from "react";
import { CharacterInfo } from "@/utils/Variables";

const CharacterInfoContext = createContext();

export const CharacterInfoProvider = ({ children }) => {
  const [characterInfo, setCharacterInfo] = useState(CharacterInfo);

  const updateCharacterInfo = (newCharacterInfo) => {
    setCharacterInfo(newCharacterInfo);

    // Code to save updated characterInfo to your save file
    // For simplicity, we'll just log the updated characterInfo
    console.log("Updated characterInfo:", newCharacterInfo);
  };

  return (
    <CharacterInfoContext.Provider value={{ characterInfo, updateCharacterInfo }}>
      {children}
    </CharacterInfoContext.Provider>
  );
};

export const useCharacterInfo = () => useContext(CharacterInfoContext);