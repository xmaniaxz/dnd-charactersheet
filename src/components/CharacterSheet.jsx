"use client";
import TopbarInfo from "@/components/TopbarInfo";
import UnderInfo from "@/components/UnderProfile";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext"; // Import the context

export default function CharacterSheet() {
  const searchParams = useSearchParams();
  const { characterInfo, updateCharacterInfo } = useCharacterInfo(); // Use the context hook
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    console.log("CharacterSheet.jsx: Hook Firing");
    setPageIsLoading(true);
    if (searchParams && searchParams.get("characterInfo")) {
      console.log(characterInfo);
      const sheet = JSON.parse(searchParams.get("characterInfo"));
      updateCharacterInfo(sheet); // Update characterInfo using the context
      console.log(`CharacterSheet.jsx: Loaded sheet: ${JSON.stringify(sheet)}`);
      setPageIsLoading(false);
    } else {
      console.error(
        `CharacterSheet.jsx: Couldn't find Params. Check: ${searchParams}`
      );
    }
  }, []);

  return (
    <div>
        <div className="topContainer">
          <TopbarInfo />
          <UnderInfo />
          <StatsContainer />
        </div>
        <BottomContainer />
    </div>
  );
}
