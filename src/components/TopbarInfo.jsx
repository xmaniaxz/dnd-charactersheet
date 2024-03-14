"use client";
import InputField from "@/components/Inputfields";
import ProfileImage from "./ProfileImage";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { useEffect, useState } from "react";
import UnderInfo from "@/components/UnderProfile";
export default function TopbarInfo() {
  const { characterInfo, updateCharacterInfo } = useCharacterInfo();
  const [updatedValue, setUpdatedValue] = useState(true);
  const HandleValueChanged = (value, type) => {
    switch (type) {
      case "Race":
        characterInfo.playerInfo.Race = value;
        break;
      case "Class":
        characterInfo.playerInfo.Class = value;
        break;
      case "SubClass":
        characterInfo.playerInfo.SubClass = value;
        break;
      case "Background":
        characterInfo.playerInfo.Background = value;
        break;
      case "PlayerName":
        characterInfo.playerInfo.PlayerName = value;
        break;
      case "Alignment":
        characterInfo.playerInfo.Alignment = value;
        break;
      case "Experience":
        characterInfo.playerInfo.Experience = value;
        break;
    }
  };

  useEffect(() => {
    setUpdatedValue(false);
  }, [characterInfo]);
  return (
    <div>
      <div className="topInfoContainer">
        <div className="imageContainer">
          <ProfileImage />
        </div>
        <div>
          <UnderInfo />
        </div>
      </div>
      <div className="topInfoContainer">
        <div className="profileDetails">
          <InputField
            classname={"profileDetailsClass"}
            InputText="Race :"
            onValueChanged={(value) => HandleValueChanged(value, "Race")}
            defaultValue={characterInfo.playerInfo.Race}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.Class}
            InputText="Class :"
            onValueChanged={(value) => HandleValueChanged(value, "Class")}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.SubClass}
            InputText="Sub-class :"
            onValueChanged={(value) => HandleValueChanged(value, "SubClass")}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.Background}
            InputText="Background :"
            onValueChanged={(value) => HandleValueChanged(value, "Background")}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.PlayerName}
            InputText="Playername :"
            onValueChanged={(value) => HandleValueChanged(value, "PlayerName")}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.Alignment}
            InputText="Alignment :"
            onValueChanged={(value) => HandleValueChanged(value, "Alignment")}
          />
          <InputField
            classname={"profileDetailsClass"}
            defaultValue={characterInfo.playerInfo.Experience}
            InputText="Exp :"
            onValueChanged={(value) => HandleValueChanged(value, "Experience")}
          />
        </div>
      </div>

      <div className="topInfoContainer"></div>
    </div>
  );
}
