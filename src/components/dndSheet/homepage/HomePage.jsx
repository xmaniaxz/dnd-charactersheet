"use client";
import * as Server from "@/utils/node-appwrite";
import styles from "@/CSS/homepage.module.css";
import Dropdown from "../Dropdown";
import { useState, useEffect, act } from "react";
import { useRouter } from "next/navigation";
import TeamsMenu from "@/components/dndSheet/homepage/Teams";
import Image from "next/image";
import Clipboard from "./Clipboard";
import CharacterPortrait from "@/components/dndSheet/homepage/CharacterPortrait";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [characterSheets, setCharacterSheets] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    name: "Select team",
    users: null,
    data: null,
  });
  const [userTeams, setUserTeams] = useState([]);
  const [menuActive, setMenuActive] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);
  const [userLogo, setUserLogo] = useState(null);
  const [optionalData, setOptionalData] = useState("");
  const IsLoggedIn = async () => {
    const user = await Server.GetLoggedInUser();
    if (!user) {
      router.push("/D&D");
    } else {
      setUser(user);
      console.log("IsLoggedIn: User is logged in.");
    }
  };

  const GetSheetData = async (_filter = null) => {
    const sheets = await Server.GetUserCharacterSheets(_filter);
    setCharacterSheets(sheets);
  };

  const GetUserTeams = async () => {
    const teams = await Server.GetTeams();
    setUserTeams(teams);
    // const activeTeamInfo = document.cookie.replace(
    //   /(?:(?:^|.*;\s*)activeTeam\s*\=\s*([^;]*).*$)|^.*$/,
    //   "$1"
    // );
    // if (activeTeamInfo) {
    //   setSelectedTeam(JSON.parse(activeTeamInfo));
    // }
  };

  useEffect(() => {
    IsLoggedIn();
    GetUserTeams();
    GetSheetData();
    if (!userLogo) getUserLogo().then((url) => setUserLogo(url));
  }, []);

  const SetTeamData = async (team) => {
    document.cookie =
      "activeTeam=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/D&D;SameSite=Strict;Secure=false;";
    if (team === "none") {
      setSelectedTeam({ name: "Select team", users: null, data: null });
      setOptionalData((data) => ({ ...data, Teams: selectedTeam }));
      await GetSheetData();
      setForceUpdate(!forceUpdate);
      // Set cookie after updating state
    } else {
      const teamData = userTeams.find((x) => x.name === team);
      const teamUsers = await Server.GetTeamUsers(teamData.$id);
      setSelectedTeam({ name: team, users: teamUsers, data: teamData });
      setOptionalData((data) => ({ ...data, Teams: selectedTeam }));
      setForceUpdate(!forceUpdate);
      const res = await Server.GetLinkedSheets(teamData.$id);
      const sheets = typeof res === Array ? sheets.split(",") : res;
      sheets && (await GetSheetData(sheets));
      // Set cookie after updating state

      document.cookie = `activeTeam=${JSON.stringify({
        name: team,
        users: teamUsers,
        data: teamData,
      })}; path=/; sameSite=strict; secure=false;`;
    }
  };

  const handleMenuCallback = async (x) => {
    const state = x.state;
    const data = x.data;
    let reload = true;
    switch (state) {
      case -3:
        document.cookie =
          "activeTeam=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure=true";
        await Server.RemoveCharacterSheet(optionalData.Sheet.SheetID);
        break;
      case -2:
        await Server.LeaveTeam(selectedTeam.data.$id);
        break;
      case -1:
        setMenuActive(null);
        return;
      case 1:
        await Server.CreateNewTeam(data);

        break;
      case 2:
        await Server.JoinTeam(data);
        break;
      case 3:
        await Server.EditTeam(selectedTeam.data.$id, data);
        break;
      case 4:
        await Server.LinkSheetToTeam(optionalData.SheetData.$id, data.data.$id);
        await GetSheetData();
        break;
      case 5:
        console.log(data);
        await Server.UnLinkSheetToTeam(
          data.SheetID,
          data.LinkedTeam
        );
        break;
    }
    location.reload();
    setMenuActive(null);
  };

  const getUserLogo = async () => {
    const output = await Server.GetUserLogo();
    const byteCharacters = atob(output);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  const hasAdminPrivileges = () => {
    if (selectedTeam.users) {
      const currentUser = selectedTeam.users.find(
        (_user) => _user.userName === user.name
      );
      return currentUser.roles.includes("DM");
    }
    return false;
  };

  return (
    <div>
      {menuActive && (
        <TeamsMenu
          TeamOption={menuActive}
          boxClass={styles.boxContainer}
          ButtonClass={`${styles.teamsButton} ${styles.submitButton}`}
          onCallback={(x) => {
            handleMenuCallback(x);
          }}
          OptionalData={optionalData}
        />
      )}
      <div className={`${styles.navbar}`}>
        <div className={`${styles.teamsContainer}`}>
          <div className={styles.teamSelect}>
            {    console.log(userTeams)}
            <Dropdown
              Options={["none", ...userTeams.map((team) => team.name)]}
              placeholder={"Select team"}
              OnSelection={(selected) => {
                SetTeamData(selected);
              }}
              CustomButtonClass={styles.teamSelectDropDownButton}
              CustomOptionsClass={styles.teamSelectDropDownOptions}
              SelectedOption={selectedTeam.name}
            />
            <hr />
          </div>
          <button
            className={`${styles.teamsButton}`}
            onClick={() => {
              setMenuActive(1);
            }}
          >
            New team
          </button>
          <button
            className={`${styles.teamsButton}`}
            onClick={() => {
              setMenuActive(2);
            }}
          >
            Join team
          </button>
          <button
            className={`${styles.teamsButton}`}
            href={"./characterpage"}
            onClick={() => {
              document.cookie = "characterInfo=new character; path=/D&D";
              router.push("/D&D/characterpage");
            }}
          >
            New Sheet
          </button>
        </div>
        <div className="iconContainer ">
          <div id="popup" className="logoPopup down">
            logout
          </div>
          <i
            className={`Icon scale-[0.7] transition button red`}
            onClick={async () => {
              await Server.LogoutUser();
              IsLoggedIn();
            }}
          >
            logout
          </i>
        </div>

        <div className={styles.userProfile}>
          <div className={`${styles.userWelcome}`}>
            <p>
              Welcome <br />
              {user ? user.name : ""}
            </p>
          </div>
          <div className={`${styles.userImageContainer}`}>
            <div className={`${styles.userImage}`}>
              {userLogo && (
                <Image
                  src={userLogo}
                  alt="user image"
                  width={100}
                  height={100}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.dataBody}>
        <div className={styles.bodyContainer1}>
          <div className={styles.dataHeader}>
            {selectedTeam.name === "Select team" ? (
              <h1>Character Sheets</h1>
            ) : (
              <>
                {selectedTeam.data && (
                  <Clipboard
                    TextToCopy={selectedTeam.data.$id}
                    PlaceHolderText={"Invite Code: " + selectedTeam.data.$id}
                  />
                )}

                <h1>{selectedTeam.name}</h1>
              </>
            )}
            <hr />
          </div>
          <div className={styles.sheetDataContainer}>
            {characterSheets &&
              characterSheets.map((data, index) => {
                return (
                  <CharacterPortrait
                    key={index}
                    data={data}
                    onDeletion={() => {
                      setMenuActive(-3);
                      setOptionalData((prev) => ({ ...prev, Sheet: data }));
                    }}
                    onLink={(e) => {
                      e ? setMenuActive(4) : handleMenuCallback({state:5,data:data});
                      setOptionalData({Teams: userTeams, SheetData: data});
                      
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div className={styles.bodyContainer2}>
          {selectedTeam.data && (
            <>
              <header>
                <div className="w-full flex items-center relative mb-[10px]">
                  <h3>Dungeon Master:</h3>
                  <div className="absolute right-0 w-[20%] flex items-center justify-end">
                    {hasAdminPrivileges() && (
                      <div className="iconContainer">
                        <div id="popup" className="logoPopup up">
                          Settings
                        </div>
                        <i
                          className={`Icon teamMenuButtons button`}
                          onClick={() => setMenuActive(6)}
                        >
                          settings
                        </i>
                      </div>
                    )}

                    <div className="iconContainer ">
                      <div id="popup" className="logoPopup up">
                        Edit
                      </div>
                      <i
                        className={`Icon teamMenuButtons button`}
                        onClick={() => setMenuActive(3)}
                      >
                        edit
                      </i>
                    </div>

                    <div className="iconContainer">
                      <div id="popup" className="logoPopup up">
                        Leave team
                      </div>
                      <i
                        className={`Icon teamMenuButtons button red`}
                        onClick={() => setMenuActive(-2)}
                      >
                        do_not_disturb_on
                      </i>
                    </div>
                  </div>
                </div>
                <hr />
              </header>
              <section className={`${styles.customList}`}>
                {selectedTeam.users &&
                  selectedTeam.users.map((user, index) => {
                    return user.roles.includes("DM") && (
                      <li
                        className={` ${styles.hoverAble} ${styles.Opacity}`}
                        key={index + forceUpdate}
                      >
                        {user.userName}
                      </li>
                    );
                  })}
              </section>
              <header>
                <h3>Players:</h3>
                <hr />
              </header>
              <section className={`${styles.customList}`}>
                {selectedTeam.users &&
                  selectedTeam.users.map((user, index) => {
                    return user.roles.includes("Player") ? (
                      <li
                        className={` ${styles.hoverAble} ${styles.Opacity}`}
                        key={index + forceUpdate}
                      >
                        {user.userName}
                      </li>
                    ) : null;
                  })}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
