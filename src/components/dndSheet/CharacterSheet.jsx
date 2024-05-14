"use client";
import TopbarInfo from "@/components/dndSheet/TopbarInfo";
import StatsContainer from "@/components/dndSheet/StatsContainer";
import BottomContainer from "@/components/dndSheet/BottomContainer";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/dndSheet/characterinfocontext";
import { GetCharacterSheet, WriteSheetToDatabase } from "@/utils/node-appwrite";
import PopUp from "@/components/dndSheet/popup";
import { publish } from "@/utils/events";

export default function CharacterSheet() {
  const { characterInfo, updateCharacterInfo } = useCharacterInfo();
  const [pageIsLoading, setPageIsLoading] = useState(true);

  const GetCharacter = () => {
    const characterInfoCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)characterInfo\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (characterInfoCookie) {
      if (characterInfoCookie === "new character") {
        console.log("CharacterSheet.jsx: New Character Detected");
        setPageIsLoading(false);
        return;
      }
      const ID = characterInfoCookie;

      const fetchSheet = async () => {
        try {
          let sheet = await GetCharacterSheet(ID);
          updateCharacterInfo(JSON.parse(sheet[0].JSONFile));
        } catch (error) {
          publish("ShowPopUp", {
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
      publish("ShowPopUp", {
        text: "CharacterSheet.jsx: Couldn't find characterInfo cookie.",
        visibility: true,
        backgroundColor: "red",
        top: "10px",
        right: "20px",
      });
    }
  };

  useEffect(() => {
    setPageIsLoading(true);

    GetCharacter();
  }, []);

  useEffect(() => {
    const saveCharacterInfo = () => {
      console.log("trying to save sheet");
      WriteSheetToDatabase(characterInfo);
      GetCharacter();
    };

    const interval = setInterval(saveCharacterInfo, 300000);

    // const handleBeforeUnload = async (event) => {
    //   event.preventDefault();
    //   saveCharacterInfo();
    // };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveCharacterInfo();
      }
    };

    const handlePopState = async (event) => {
      event.preventDefault();
      saveCharacterInfo();
    };
    //window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearInterval(interval);
      //window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [characterInfo]);

  return (
    <div>
      {pageIsLoading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          Loading...
        </div>
      ) : (
        <div className="bigContainer">
          <PopUp />
          <TopbarInfo />
          <StatsContainer />
          <BottomContainer />
        </div>
      )}
    </div>
  );
}
