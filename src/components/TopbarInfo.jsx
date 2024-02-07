"use client";
import InputField from "@/components/Inputfields";
import Image from "next/image";
import { useCharacterInfo } from "@/components/characterinfocontext";
import { useEffect,useState } from "react";
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

  useEffect(()=>{
    setUpdatedValue(false);
    console.log(characterInfo.playerInfo.Class)
  },[characterInfo])
  return (
    <div>
      <div className="topInfoContainer">
        <InputField
          key={1+updatedValue}
          classname={"topTD"}   
          InputText="Race :"
          onValueChanged={(value) => HandleValueChanged(value, "Race")}
          defaultValue={characterInfo.playerInfo.Race}
        />
        <InputField
          key={2+updatedValue}
          classname={"topTD"}
          defaultValue={characterInfo.playerInfo.Class}
          InputText="Class :"
          onValueChanged={(value) => HandleValueChanged(value, "Class")}
        />
        <InputField
          key={3+updatedValue}
          classname={"topTD"}
          defaultValue={characterInfo.playerInfo.SubClass}
          InputText="Sub-class :"
          onValueChanged={(value) => HandleValueChanged(value, "SubClass")}
        />
        <InputField
        key={4+updatedValue}
          classname={"topTD"}
          defaultValue={characterInfo.playerInfo.Background}
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
          defaultValue={characterInfo.playerInfo.PlayerName}
          InputText=": Playername"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "PlayerName")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={characterInfo.playerInfo.Alignment}
          InputText=": Alignment"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "Alignment")}
        />
        <InputField
          classname={"topTD"}
          defaultValue={characterInfo.playerInfo.Experience}
          InputText=": Exp"
          reversed={true}
          onValueChanged={(value) => HandleValueChanged(value, "Experience")}
        />
      </div>
    </div>
  );
}
