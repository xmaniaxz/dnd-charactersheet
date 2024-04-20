import styles from "@/CSS/homepage.module.css";
import { publish } from "@/utils/events";

export default function HomePageData({ Menu, TeamData }) {
  const menu = Menu || 0;
  return (
    <>
      {console.log(TeamData)}
      <div className={`${styles.dataLeftContainer}`}>
        <div id="Header" className={styles.dataHeader}>
          {menu === 0 ? (
            <h2>My Characters</h2>
          ) : (
            <div>
              <h2>{TeamData.TeamName}</h2>
              <div className={styles.inviteCode}>
                <div className={`${styles.PopupContainer} button`}>
                  <div id="popup" className={`${styles.PopUp}`}>
                    <span>copy to clipboard</span>
                  </div>
                  <h5
                    onClick={() => {
                      navigator.clipboard.writeText(TeamData.TeamsData.id);
                      publish("ShowPopUp", {
                        text: "Copied to printboard", 
                        visibility: true,
                        backgroundColor: "rgba(0, 128, 0, 0.8)",
                        top: "10px",
                        right: "20px",
                      });
                    }}
                  >
                    Invite: {TeamData.TeamsData.id}
                  </h5>
                </div>
              </div>
            </div>
          )}
          <hr />
        </div>
        <div id="Logic" className={styles.dataBody}></div>
      </div>
      <div className={`${styles.dataRightContainer}`}></div>
    </>
  );
}
