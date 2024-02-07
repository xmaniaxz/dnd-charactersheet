"use client";
import styles from "@/app/homepage/homepage.module.css";
import { GetUserCharacterSheets } from "@/components/Database";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isLoadingSheetData, setLoadingSheetData] = useState(true);
  const [sheetData, setSheetData] = useState([]);
  const router = useRouter();

  const handleLogout = async () => {
    account.deleteSession("current");
    router.push("/");
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
      }, 2000);

      // Clear the timeout if the component unmounts or if sheetData is updated
      return () => clearTimeout(timeoutId);
    } else {
      setLoadingSheetData(false);
    }
  }, [sheetData]);

  return (
    <main>
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
                console.log(SheetInfo);
                return (
                  <Link
                    key={index}
                    className={styles.sheetPreview}
                    href={{ pathname: "./characterpage",
                    query: {CharacterInfo: values.JSONFile}
                   }}
                  >
                    {SheetInfo.playerInfo.CharacterName}
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <div className="sheetPreview">

</div> */
}
