import { publish } from "@/utils/events";
import React, { useEffect, useState } from "react";
import { useCharacterInfo } from "./characterinfocontext";
import { UploadFile, GetFile } from "@/utils/Database";

export default function ProfileImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { characterInfo } = useCharacterInfo();
  const handleImageUpload = async (event) => {
    if (event.target.files[0].size > 5242880) {
      publish("ShowPopUp", {
        text: "File is too large. Please upload a file less than 5MB.",
        visibility: true,
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        top: "10px",
        right: "20px",
      });
      return;
    }
    if (event.target.files.length > 1) {
      publish("ShowPopUp", {
        text: "Please only upload one image at a time.",
        visibility: true,
        backgroundColor: "rgba(255, 0, 0, 0.8)",
        top: "10px",
        right: "20px",
      });
      return;
    } else {
      const file = event.target.files[0];
      const fileID = await UploadFile(file);
      characterInfo.profilePicture = fileID;
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageClick = () => {
    // Trigger file input click
    document.getElementById("file-upload").click();
  };

  useEffect(() => {
    async function getProfilePictureFromServer() {
      console.log(characterInfo.profilePicture);
      const file = await GetFile(characterInfo.profilePicture);
      setSelectedImage(file.href);
    }
    if (characterInfo.profilePicture) getProfilePictureFromServer();
  }, [characterInfo.profilePicture]);

  return (
    <div>
      <div className="imageContainer">
        <label htmlFor="file-upload">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              onClick={handleImageClick}
              className="profileImage"
            />
          ) : (
            <i
              className="gg-add absolute mt-[47.5%] ml-[-2.5%]"
              onClick={handleImageClick}
            ></i>
          )}
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
}
