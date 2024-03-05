"use client"
import TopbarInfo from "@/components/TopbarInfo";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { GetCharacterSheet } from "./Database";
import { Suspense } from "react";

export default function CharacterSheet() {
  const { characterInfo,updateCharacterInfo } = useCharacterInfo();
  const [pageIsLoading, setPageIsLoading] = useState(true);


  useEffect(() => {
    console.log("CharacterSheet.jsx: Hook Firing");
    setPageIsLoading(true);
    const characterInfoCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)characterInfo\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (characterInfoCookie) {
      const ID = JSON.parse(characterInfoCookie); //This is the SheetID String

      const fetchSheet = async () => {
        try {
          let sheet = await GetCharacterSheet(ID);
          updateCharacterInfo(JSON.parse(sheet[0].JSONFile))
        } catch (error) {
          console.error("Error fetching character sheet:", error);
        }
      };

      fetchSheet();
      setPageIsLoading(false);
    } else {
      console.error(`CharacterSheet.jsx: Couldn't find characterInfo cookie.`);
    }
  }, []); // Empty dependency array

  return (
    <div>
      {pageIsLoading ? <div className="w-screen h-screen">Loading...</div> : 
          <div>
          <TopbarInfo />
          <StatsContainer />
          <BottomContainer />
          </div>
      }
        
    </div>
  );
}
