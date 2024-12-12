import { useState } from "react";
import styles from "@/CSS/homepage.module.css";
import Dropdown from "@/components/dndSheet/Dropdown";
export default function TeamsMenu({
  TeamOption,
  boxClass,
  ButtonClass,
  OptionalData,
  onCallback,
}) {
  const userTeams = OptionalData.Teams || "";
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [selectedTeam, setSelectedTeam] = useState({
    name: "Select team",
    data: null,
  });

  return (
    <div className="hazyOverLay">
      <div className={boxClass}>
        <i
          className="Icon HomePageCloseButton button"
          onClick={() => {
            onCallback({ state: -1, data: null });
          }}
        >
          close
        </i>
        {TeamOption === -3 && (
          <>
            <h2>Delete charactersheet?</h2>
            <br />
            <hr />
            <br />
            <div className="w-full h-1/2 flex flex-col justify-center items-center gap-[30px]">
              <h1>Are you sure you want to delete this character?</h1>
              <br />
              <p>Sheet UUID: {OptionalData.Sheet.$id}</p>
              <h5>doing so will delete this forever.</h5>
              <div className="flex flex-row gap-[30px] w-1/2 absolute bottom-[100px]">
                <button
                  className="transition button bg green border-solid border"
                  onClick={() => onCallback({ state: -3, data: null })}
                >
                  Yes
                </button>
                <button
                  className="transition button bg red border border-solid"
                  onClick={() => onCallback({ state: -1, data: null })}
                >
                  No
                </button>
              </div>
            </div>
          </>
        )}
        {TeamOption === -2 && (
          <>
            <h1 className="text-center">Are you sure you want to leave?</h1>
            <br />
            <br />
            <br />
            <br />
            <div className="w-full flex flex-row items-center justify-center gap-[20px]">
              <button
                className={`transition button bg green`}
                onClick={() => {
                  onCallback({ state: -2, data: null });
                }}
              >
                Yes
              </button>
              <button
                className={`transition button bg red`}
                onClick={() => {
                  onCallback({ state: -1, data: null });
                }}
              >
                No
              </button>
            </div>
          </>
        )}
        {TeamOption === 1 && (
          <>
            <h2>New team</h2>
            <br />
            <hr />
            <br />
            <label htmlFor="teamName">
              <h4>Team name:</h4>
            </label>
            <br />
            <input
              className="w-[400px] h-[40px] p-[10px] border-[1px] border-gray-300 rounded-md"
              type="text"
              id="teamName"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              value={teamName}
              placeholder="Enter team name"
            />
            <button
              className={`${ButtonClass ? ButtonClass : ""}`}
              onClick={() => {
                onCallback({ state: 1, data: teamName });
              }}
            >
              Create team
            </button>
          </>
        )}
        {TeamOption === 2 && (
          <>
            <h2>Join team</h2>
            <br />
            <hr />
            <br />
            <label htmlFor="inviteCode">
              <h4>Invite Code:</h4>
            </label>
            <br />
            <input
              className="w-[400px] h-[40px] p-[10px] border-[1px] border-gray-300 rounded-md"
              type="text"
              id="inviteCode"
              onChange={(e) => {
                setInviteCode(e.target.value);
              }}
              value={inviteCode}
              placeholder="Enter invite code"
            />
            <button
              className={`${ButtonClass ? ButtonClass : ""}`}
              onClick={() => {
                onCallback({ state: 2, data: inviteCode });
              }}
            >
              Join team
            </button>
          </>
        )}
        {TeamOption === 3 && (
          <>
            <h2>Edit team</h2>
            <br />
            <hr />
            <br />
            <label htmlFor="teamName">
              <h4>New team name</h4>
            </label>
            <br />
            <input
              className="w-[400px] h-[40px] p-[10px] border-[1px] border-gray-300 rounded-md"
              type="text"
              id="teamName"
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              value={teamName}
              placeholder="Enter invite code"
            />
            <button
              className={`${ButtonClass ? ButtonClass : ""}`}
              onClick={() => {
                onCallback({ state: 3, data: teamName });
              }}
            >
              Change
            </button>
          </>
        )}
        {TeamOption === 4 && (
          <>
            <h2>Link character to team</h2>
            <br />
            <hr />
            <br />
            <Dropdown
              Options={["none", ...userTeams.map((team) => team.name)]}
              placeholder={"Select team"}
              OnSelection={async (selected) => {
                selected === "none"
                  ? setSelectedTeam({ name: "Select team", data: null })
                  : setSelectedTeam({
                      name: selected,
                      data: userTeams.find((team) => team.name === selected),
                    });
              }}
              CustomButtonClass={styles.teamSelectDropDownButton}
              CustomOptionsClass={styles.teamSelectDropDownOptions}
              SelectedOption={selectedTeam.name}
            />
            <button
              className={`${ButtonClass ? ButtonClass : ""}`}
              onClick={() => {
                selectedTeam.data &&
                  onCallback({ state: 4, data: selectedTeam });
              }}
            >
              Link
            </button>
          </>
        )}

        {TeamOption === 6 && (
          <>
            <h2>Settings</h2>
            <br />
            Players:
            <div className={`${styles.optionList}`}>
              <div>
                <input id="SeeOthers" type="checkbox" />
                <label htmlFor="SeeOthers">
                  See other characters
                </label>
              </div>
              <div>
                <input id="CanChange" type="checkbox" />
                <label htmlFor="CanChange">
                  Change team name
                </label>
              </div>
              <div>
                <input id="CanUnlinkOther" type="checkbox" />
                <label htmlFor="CanUnlinkOther">
                  Unlink other characters
                </label>
              </div>
              <div>
                <input id="CanLink" type="checkbox" />
                <label htmlFor="CanLink">
                  Link characters
                </label>
              </div>
            </div>
            <br />
            Team:
            <div className={`${styles.optionList}`}>
              <div>
                <input id="canJoin" type="checkbox" />
                <label htmlFor="canJoin">
                  Players can join
                </label>
              </div>
              <div>
                <input id="CanChange" type="checkbox" />
                <label htmlFor="CanChange">
                  Invite code visible
                </label>
              </div>
            </div>
            <button
              className={`${ButtonClass ? ButtonClass : ""}`}
              onClick={() => {
                selectedTeam.data &&
                  onCallback({ state: 4, data: selectedTeam });
              }}
            >
              Link
            </button>
          </>
        )}
      </div>
    </div>
  );
}
