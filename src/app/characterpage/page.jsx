"use client";
import TopbarInfo from "@/components/TopbarInfo";
import UnderInfo from "@/components/UnderProfile";
import StatsContainer from "@/components/StatsContainer";
import BottomContainer from "@/components/BottomContainer";
import { CharacterInfo } from "@/utils/Variables";
import {useEffect, useState } from "react";

export default function Home({ searchParams }) {
  searchParams: {
    CharacterInfo: Object;
  }
  const [pageIsLoading, setPageIsLoading] = useState(true);

  useEffect(() => {
    setPageIsLoading(true);
    function SetData() {
      const Sheet = JSON.parse(searchParams.CharacterInfo);
      CharacterInfo.SheetID = Sheet.SheetID;
      CharacterInfo.playerInfo = Sheet.playerInfo;
      CharacterInfo.playerStats = Sheet.playerStats;
      CharacterInfo.playerInventory = Sheet.playerInventory;
    }
    SetData();
    setPageIsLoading(false);
  });

  return (
    <main>
        <div className="topContainer">
          <TopbarInfo CharacterInfo={CharacterInfo} />
          <UnderInfo />
          <StatsContainer />
        </div>
        <BottomContainer />
    </main>
  );
}
