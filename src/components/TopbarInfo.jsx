"use client";
import InputField from "./Inputfields";
import Image from "next/image";
import { CharacterInfo } from "@/utils/Variables";
import { useEffect } from "react";
import { LoadFile } from "@/utils/SaveSystem";

export default function TopbarInfo() {
  const HandleValueChanged = (value, type) => {
    switch (type) {
      case "Race":
        CharacterInfo.playerInfo.Race = value;
        break;
      case "Class":
        CharacterInfo.playerInfo.Class = value;
        break;
      case "SubClass":
        CharacterInfo.playerInfo.SubClass = value;
        break;
      case "Background":
        CharacterInfo.playerInfo.Background = value;
        break;
      case "PlayerName":
        CharacterInfo.playerInfo.PlayerName = value;
        break;
      case "Alignment":
        CharacterInfo.playerInfo.Alignment = value;
        break;
      case "Experience":
        CharacterInfo.playerInfo.Experience = value;
        break;
    }
  };

  return (
    <div>
      <div className="topInfoContainer">
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.Race}
          InputText="Race :"
          onValueChanged={(value) => HandleValueChanged(value, "Race")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.Class}
          InputText="Class :"
          onValueChanged={(value) => HandleValueChanged(value, "Class")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.SubClass}
          InputText="Sub-class :"
          onValueChanged={(value) => HandleValueChanged(value, "SubClass")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.Background}
          InputText="Background :"
          onValueChanged={(value) => HandleValueChanged(value, "Background")}
        />
      </div>
      <div className="topInfoContainer">
        <div className="imageContainer">
          <Image
            src="/ProfilePicture/alexis.png"
            alt=""
            width="1500"
            height="2400"
            style={{ alignSelf: "start" }}
          />
        </div>
      </div>
      <div className="topInfoContainer">
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.PlayerName}
          InputText=": Playername"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "PlayerName")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.Alignment}
          InputText=": Alignment"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "Alignment")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={CharacterInfo.playerInfo.Experience}
          InputText=": Exp"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "Experience")}
        />
      </div>
    </div>
  );
}
