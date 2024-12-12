import Image from "next/image";
import styles from "@/CSS/homepage.module.css";
import { useRouter } from "next/navigation";

export default function CharacterPortrait({ data, onDeletion, onLink }) {
  const sheet = JSON.parse(data.JSONFile);
  const router = useRouter();
  const GetImage = (imageID) => {
    const image = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${imageID}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`;
    return image;
  };
  const image = sheet.profilePicture && GetImage(sheet.profilePicture);

  const SetExpiryDate = (_Days) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + _Days);
    return expiryDate;
  }

  const sendToSheet = async () => {
    // document.cookie = `characterInfo=${sheet.SheetID}; path=/; SameSite=Strict; Secure; expires=${SetExpiryDate(14).toUTCString()}`;
    const url = (`/D&D/characterpage?uuid=${sheet.SheetID}`);
    window.open(url, "_blank");
  };


  const deleteSheet = (event) => {
    event.stopPropagation();
    onDeletion();
  };

  const LinkSheet = (event,state) => {
    event.stopPropagation();
    onLink(state);
  };

  return (
    <div
      className={`relative transition ${styles.characterCard} button`}
      onClick={() => sendToSheet()}
    >
      <i
        className={`Icon transition button deleteButton red `}
        onClick={(e) => {
          deleteSheet(e,sheet.SheetID);
        }}
      >
        Delete
      </i>
      <i
        style={{display: data.LinkedTeam ? "none" : "block"}}
        className={`Icon transition button linkButton green`}
        onClick={(e) => LinkSheet(e,true)}
      >
        link
      </i>
      <i
      style={{display: data.LinkedTeam ? "block" : "none"}}
        className={`Icon transition button linkButton red`}
        onClick={(e) => LinkSheet(e,false)}
      >
        link_off
      </i>
      <Image
        src={image ? image : "/default_character.jpg"}
        alt=""
        width={200}
        height={200}
        className={`${styles.characterCardImageContainer} transition`}
      />
      <hr />
      {/* <p>{sheet.SheetID ? sheet.SheetID : "null"}</p> */}
      <p>{sheet.playerInfo.CharacterName}</p>
    </div>
  );
}
