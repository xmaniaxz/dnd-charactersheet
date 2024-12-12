"use client";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/dndSheet/characterinfocontext";
import { CharacterInfo } from "@/utils/Variables";
import { GetCharacterSheet, WriteSheetToDatabase } from "@/utils/node-appwrite";
import PopUp from "@/components/dndSheet/popup";
import { publish } from "@/utils/events";
import TopbarInfo from "@/components/dndSheet/TopbarInfo";
import StatsContainer from "@/components/dndSheet/StatsContainer";
import BottomContainer from "@/components/dndSheet/BottomContainer";

export default function CharacterSheet() {
  const { characterInfo, updateCharacterInfo } = useCharacterInfo();
  const [prevCharacterInfo, updatePrevCharacterInfo] = useState(() => structuredClone(CharacterInfo));
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // Flag to track saving status

  const GetCharacter = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const characterInfoCookie = urlParams.get("uuid");

    if (characterInfoCookie) {
      if (characterInfoCookie === "new%character") {
        console.log("CharacterSheet.jsx: New Character Detected");
        setPageIsLoading(false);
        return;
      }
      const ID = characterInfoCookie;

      const fetchSheet = async () => {
        try {
          let sheet = await GetCharacterSheet(ID);
          updateCharacterInfo(JSON.parse(sheet[0].JSONFile));
          updatePrevCharacterInfo(JSON.parse(sheet[0].JSONFile));
          console.log("changingPrevInfo");
        } catch (error) {
          console.log(error);
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
    setPageIsLoading(false);
    GetCharacter();
  }, []);

  const saveCharacterInfo = async () => {
    if (isSaving) return; // Prevent simultaneous saves
    setIsSaving(true);

    try {
      console.log("Trying to save sheet...");
      const stringCharInfo = JSON.stringify(characterInfo);
      const stringPrevCharInfo = JSON.stringify(prevCharacterInfo);

      if (stringCharInfo !== stringPrevCharInfo) {
        console.log("Saving sheet...");
        const sheetID = await WriteSheetToDatabase(characterInfo);

        // Update the URL without reloading
        window.history.replaceState({}, "", `?uuid=${sheetID}`);

        // Update previous character info to reflect saved state
        updatePrevCharacterInfo(structuredClone(characterInfo));
      } else {
        console.log("No changes detected, skipping save.");
      }
    } catch (error) {
      console.error("Error saving character info:", error);
    } finally {
      setIsSaving(false); // Reset the flag after saving
    }
  };

  useEffect(() => {
    const interval = setInterval(saveCharacterInfo, 300000);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      saveCharacterInfo();
      event.returnValue = ""; // Optional: Triggers browser confirmation dialog
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveCharacterInfo();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [characterInfo, prevCharacterInfo]);

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
