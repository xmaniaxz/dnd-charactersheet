"use client"
import TopbarInfo from "@/components/TopbarInfo";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { GetCharacterSheet,WriteSheetToDatabase } from "@/utils/Database";
import PopUp from "@/components/popup";
import { publish,subscribe,unsubscribe } from "@/utils/events";


export default function CharacterSheet() {
  const {characterInfo,updateCharacterInfo } = useCharacterInfo();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    setPageIsLoading(true);
    const characterInfoCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)characterInfo\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (characterInfoCookie) {
      if(characterInfoCookie === "new character"){
        console.log("CharacterSheet.jsx: New Character Detected");
        setPageIsLoading(false);
        return;
      }
      const ID = JSON.parse(characterInfoCookie); //This is the SheetID String

      const fetchSheet = async () => {
        try {
          let sheet = await GetCharacterSheet(ID);
          updateCharacterInfo(JSON.parse(sheet[0].JSONFile))
        } catch (error) {
          publish("ShowPopUp",{
            text: error,
            visibility: true,
            backgroundColor: "red",
            top: "10px",
            right: "20px",
          });
        }
      };

      fetchSheet();
      setPageIsLoading(false);
    } else {
      publish("ShowPopUp",{
        text: "CharacterSheet.jsx: Couldn't find characterInfo cookie.",
        visibility: true,
        backgroundColor: "red",
        top: "10px",
        right: "20px",
      });
    }
  }, []);

  useEffect(() => {
    const saveCharacterInfo = () => {
        WriteSheetToDatabase(characterInfo);
    };

    const interval = setInterval(saveCharacterInfo, 300000);

const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = '';
        saveCharacterInfo();
    };

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            saveCharacterInfo();
        }
    };

    const handlePopState = () => {
        saveCharacterInfo();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
        clearInterval(interval);
        window.removeEventListener("beforeunload", handleBeforeUnload);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("popstate", handlePopState);
    };
}, [characterInfo]);



  return (
    <div>
      {pageIsLoading ? <div className="w-screen h-screen flex items-center justify-center">Loading...</div> : 
          <div className="bigContainer">
          <PopUp/>
          <TopbarInfo />
          <StatsContainer />
          <BottomContainer />
          </div>
      }
    </div>
  );
}
