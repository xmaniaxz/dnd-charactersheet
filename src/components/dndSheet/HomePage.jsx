"use client";
import styles from "@/CSS/homepage.module.css";
import {
  GetUserCharacterSheets,
  DeleteSheetFromDatabase,
  GetFile,
  GetUserTeams,
} from "@/utils/Database";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HomePageData from "@/components/dndSheet/HomepageData";
import SelectableBar from "@/components/SelectableBar";
import NewTeam from "@/components/dndSheet/NewTeam";

export default function HomePage() {
  const [isLoadingSheetData, setLoadingSheetData] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [sheetData, setSheetData] = useState([]);
  const [createTeam, setCreateTeam] = useState(-1);
  // Not used //
  const [alertBoxActivePage, setAlertBoxActivePage] = useState();
  const [ImageURL, setImageURL] = useState([]);
  const [loadImage, setLoadImage] = useState(false);
  // #Not used //

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } finally {
      router.push("/D&D");
    }
  };

  const HandleSendToSheet = (event, values) => {
    event.stopPropagation();
    document.cookie = `characterInfo=${JSON.stringify(
      values.SheetID
    )}; path=/; sameSite=false;`;
    router.push("./characterpage");
  };

  const HandleAlertBoxCallback = (value) => {
    switch (value) {
      case -1:
        setCreateTeam(-1)
        break;
      case 0:
        setCreateTeam(0);
        break;
        case 1:
        setCreateTeam(1);
        break;
    }
  }
  
  const GetTeamData = () => {
    return accountData.Teams.filter((team) => team.name === selectedTeam)[0];
  }

  useEffect(() => {
    async function GetSpellData() {
      setLoadingSheetData(true);
      const data = await GetUserCharacterSheets();
      setAccountData({
        Account: await account.get(),
        Teams: await GetUserTeams(),
      });
      data["documents"].forEach(async (values) => {
        const SheetInfo = JSON.parse(values.JSONFile);
        const file = await GetFile(SheetInfo.profilePicture);
        ImageURL.push({
          ImageURL: file.href,
          SheetID: SheetInfo.SheetID,
        });
      });
      setSheetData(data);
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
  }, [sheetData, ImageURL]);

  return (
    <div>
      {isLoadingSheetData ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className={styles.navBar}>
            {/* TeamSelect */}
            <div className={styles.teamSelect}>
              <SelectableBar
                Options={[
                  ...accountData.Teams.map((team) => team.name),
                  "None",
                ]}
                placeholder={"Select Team"}
                SelectedOption={selectedTeam}
                CustomButtonClass={styles.selectButton}
                CustomOptionsClass={styles.selectOptions}
                OnSelection={(e) => {
                  e === "None" ? setSelectedTeam(null) : setSelectedTeam(e);
                }}
              />
              <hr className={styles.teamSelectHr} />
            </div>
            <button className={`${styles.newTeam} ${styles.hoverButton}`} onClick={()=>HandleAlertBoxCallback(0)}>New Team</button>
            <button className={`${styles.joinTeam} ${styles.hoverButton}`} onClick={()=>HandleAlertBoxCallback(1)}>Join Team</button>
            <NewTeam content={createTeam} onButtonClicked={(e) =>HandleAlertBoxCallback(e)} />
            {/* User */}
            <div className={styles.userMenu}>
              <p className={styles.userName}>
                Welcome <br /> {accountData.Account.name}
              </p>
              <div className={styles.userLogo}>
                {/* <Image src="/" alt="" width={30} height={30} /> */}
              </div>
            </div>
            <div
              className={`${styles.button} button`}
              onClick={() => handleLogout()}
            >
              Logout
            </div>
          </div>

          {/* content */}
          <div className={`${styles.dataContainer}`}>
            <HomePageData
              Menu={selectedTeam ? 1 : 0}
              TeamData={{ TeamName: selectedTeam, TeamsData: GetTeamData() }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
