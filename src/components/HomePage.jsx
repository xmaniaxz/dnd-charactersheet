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
    account.deleteSession("current");
    router.push("/");
  };

  const HandleSendToSheet = (event, values) => {
    event.stopPropagation();
    router.push(`./characterpage/?characterInfo=${JSON.stringify(values)}`)
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
    if (showAlertBox) {
      document.body.classList.add("disable-events");
    } else {
      document.body.classList.remove("disable-events");
    }
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
        <Link className={styles.newSheetButton} href={"./characterpage"}>
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
                      <svg
                        className={styles.trashcan}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {" "}
                        <polyline points="3 6 5 6 21 6" />{" "}
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                        <line x1="10" y1="11" x2="10" y2="17" />{" "}
                        <line x1="14" y1="11" x2="14" y2="17" />
                      </svg>
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
