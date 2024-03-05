"use client";
import styles from "@/CSS/homepage.module.css";
import { GetUserCharacterSheets,DeleteSheetFromDatabase } from "@/components/Database";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AlertBox from "./AlertBox";

export default function HomePage() {
  const [isLoadingSheetData, setLoadingSheetData] = useState(true);
  const [sheetData, setSheetData] = useState([]);
  const [showAlertBox, setShowAlertBox] = useState(false);
  const [alertBoxActivePage,setAlertBoxActivePage] = useState();
  const router = useRouter();
  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/");
  };

  const HandleSendToSheet = (event, values) => {
    event.stopPropagation();
    document.cookie = `characterInfo=${JSON.stringify(values.SheetID)}; path=/`;
    router.push("./characterpage");
  };

  const HandleAlertBox = (event,Sheet) => {
    event.stopPropagation()
    setAlertBoxActivePage(Sheet.SheetID)
    setShowAlertBox(true)
  };

  const HandleAlertBoxCallback = async (callbackValue) => {
    switch (callbackValue) {
      case 0:
        setLoadingSheetData(true)
        await DeleteSheetFromDatabase(alertBoxActivePage)
        window.location.reload()
        setLoadingSheetData(false)
        break;
    }
    setAlertBoxActivePage(null)
    setShowAlertBox(false)
  };

  useEffect(() => {
    async function GetSpellData() {
      setLoadingSheetData(true);
      setSheetData(await GetUserCharacterSheets());
    }
    // Call GetSpellData only if sheetData is empty
    if (sheetData.length === 0) {
      // Introduce a delay of 2 seconds before calling GetSpellData
      const timeoutId = setTimeout(() => {
        GetSpellData();
      }, 500);

      // Clear the timeout if the component unmounts or if sheetData is updated
      return () => clearTimeout(timeoutId);
    } else {
      setLoadingSheetData(false);
    }
  }, [sheetData]);

  useEffect(() => {
    showAlertBox ? (document.body.classList.add("disable-events")) : (document.body.classList.remove("disable-events"));
  }, [showAlertBox]);

  return (
    <div>
      <div>
        {showAlertBox ? (
          <AlertBox onCallback={(e) => HandleAlertBoxCallback(e)} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-full float-left">
        <Link className={styles.newSheetButton} href={"./characterpage"} onClick={() => document.cookie = 'characterInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'}>
          New Sheet
        </Link>
        <button className={styles.logOutButton} onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="float-left w-full h-[65vh] mt-10">
        <div className={styles.container}>
          <div className={styles.previewContainer}>
            {isLoadingSheetData ? (
              <div className={styles.loader}></div>
            ) : (
              sheetData["documents"].map((values, index) => {
                const SheetInfo = JSON.parse(values.JSONFile);
                return (
                  <div
                    key={index}
                    className={styles.sheetPreview}
                    onClick={(e) => {
                      HandleSendToSheet(e, SheetInfo);
                    }}
                  >
                    {SheetInfo.playerInfo.CharacterName}
                    <div
                      className={styles.deleteButton}
                      onClick={(e) => {
                        HandleAlertBox(e,SheetInfo);
                      }}
                    >
                      {/* trashcan icon */}
                      <span className={`gg-trash`}/>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
