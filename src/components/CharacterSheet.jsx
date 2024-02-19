"use client";
import TopbarInfo from "@/components/TopbarInfo";
import UnderInfo from "@/components/UnderProfile";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext"; // Import the context

export default function CharacterSheet() {
  const searchParams = useSearchParams();
  const { characterInfo, updateCharacterInfo } = useCharacterInfo(); // Use the context hook
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    setPageIsLoading(true);
    if (searchParams && searchParams.get("characterInfo")) {
      const sheet = JSON.parse(searchParams.get("characterInfo"));
      updateCharacterInfo(sheet); // Update characterInfo using the context
      console.log(`Loaded sheet: ${sheet}`);
      setPageIsLoading(false);
    } else {
      console.error(`Couldnt find Params. Check: ${searchParams}`);
    }
  }, []);


  return (
    <main>
      <div className="topContainer">
        <TopbarInfo />
        <UnderInfo />
        <StatsContainer />
      </div>
      <BottomContainer />
    </main>
  );
}
