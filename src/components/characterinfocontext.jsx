"use client";
import { Suspense, createContext, useContext, useState } from "react";
import { CharacterInfo } from "@/utils/Variables";

const CharacterInfoContext = createContext();

export const CharacterInfoProvider = ({ children }) => {
  const [characterInfo, setCharacterInfo] = useState(CharacterInfo);

  const updateCharacterInfo = (newCharacterInfo) => {
    setCharacterInfo(newCharacterInfo);
    console.log("Updated characterInfo:", newCharacterInfo);
  };

  return (
    <Suspense>
      <CharacterInfoContext.Provider
        value={{ characterInfo, updateCharacterInfo }}
      >
        {children}
      </CharacterInfoContext.Provider>
    </Suspense>
  );
};

export const useCharacterInfo = () => useContext(CharacterInfoContext);
