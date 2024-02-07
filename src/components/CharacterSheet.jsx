"use client";
import TopbarInfo from "@/components/TopbarInfo";
import UnderInfo from "@/components/UnderProfile";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { useEffect, useState } from "react";
import { useCharacterInfo } from "@/components/characterinfocontext" // Import the context

export default function CharacterSheet({ searchParams }) {
  const { updateCharacterInfo } = useCharacterInfo(); // Use the context hook
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    setPageIsLoading(true);
    if (searchParams && searchParams.CharacterInfo) {
      const sheet = JSON.parse(searchParams.CharacterInfo);
      updateCharacterInfo(sheet); // Update characterInfo using the context
      setPageIsLoading(false);
    }
  }, [searchParams]); 

  return (
    <main>
        <div className="topContainer">
          <TopbarInfo/>
          <UnderInfo />
          <StatsContainer />
        </div>
        <BottomContainer />
    </main>
  );
}
