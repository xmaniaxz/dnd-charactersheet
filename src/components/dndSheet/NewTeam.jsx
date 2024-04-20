import styles from "@/CSS/homepage.module.css";
import { useState } from "react";
import { CreateTeam,JoinTeam } from "@/utils/Database";

export default function NewTeam({ content, onButtonClicked }) {
  const [teamData, setTeamData] = useState({ name: "",id:"" });
  return (
    <>
      {content !== -1 && (
        <div className="hazyOverLay">
          <div className={styles.teamOverlayContainer}>
            <i
              className={`Icon ${styles.closeButton} button`}
              onClick={() => {
                onButtonClicked(-1);
              }}
            >
              close
            </i>
            {content === 0 && 
              <>
                <h2>New Team</h2>
                <br />
                <br />
                <div className="flex flex-col gap-[10px] relative">
                  <label htmlFor="teamName">
                    <h5>Team Name:</h5>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    onChange={(e) => {
                      teamData.name = e.target.value;
                    }}
                  />
                  <button
                    className={`${styles.createTeamButton} ${styles.hoverButton}`}
                    onClick={() => {
                      CreateTeam(teamData.name);
                      onButtonClicked(-1);
                    }}
                  >
                    Create Team
                  </button>
                </div>
              </>
            }
            {content === 1 && 
              <>
                <h2>Join Team</h2>
                <br />
                <br />
                <div className="flex flex-col gap-[10px] relative">
                  <label htmlFor="teamName">
                    <h5>Invite Code</h5>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    onChange={(e) => {
                      teamData.id = e.target.value;
                    }}
                  />
                  <button
                    className={`${styles.createTeamButton} ${styles.hoverButton}`}
                    onClick={() => {
                      JoinTeam(teamData.id);
                      onButtonClicked(-1);
                    }}
                  >
                    Join Team
                  </button>
                </div>{" "}
              </>
            }
          </div>
        </div>
      )}
    </>
  );
}
