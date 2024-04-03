import { useState, useEffect } from "react";
import style from "@/CSS/TopbarInfo.module.css";
import { useCharacterInfo } from "./characterinfocontext";
import Link from "next/link";
import InputField from "./Inputfield";

export default function NavBar() {
  const [activeTab, setActiveTab] = useState(0);
  const [feats, SetFeats] = useState([]);
  const { characterInfo } = useCharacterInfo();
  const [updateValue, setUpdateValue] = useState(false);

  const handleTransition = (identifier) => {
    setActiveTab(identifier);
    const selector = document.getElementById("Selector");

    switch (identifier) {
      case 0:
        selector.style.left = "0%";
        break;
      case 1:
        selector.style.left = "25%";
        break;
      case 2:
        selector.style.left = "50%";
        break;
      case 3:
        selector.style.left = "75%";
        break;
    }
  };

  useEffect(() => {
    SetFeats(characterInfo.playerStats.PlayerFeats);
  }, [characterInfo]);

  const addFeat = () => {
    if (feats.length === 0) {
      SetFeats([{ name: "", description: "", id: Date.now().toString(30) }]);
    } else {
      SetFeats([
        ...feats,
        { name: "", description: "", id: Date.now().toString(30) },
      ]);
    }
  };

  return (
    <div className={`${style.navbarContainer}`}>
      <div id="header" className={`${style.navBar}`}>
        <div
          id="option1"
          className={`button ${style.navBarOption}`}
          onClick={() => handleTransition(0)}
        >
          Feats
        </div>
        <div
          id="option2"
          className={`button ${style.navBarOption}`}
          onClick={() => handleTransition(1)}
        >
          Languages
        </div>
        <div
          id="option4"
          className={`button ${style.navBarOption}`}
          onClick={() => handleTransition(2)}
        >
          Notes
        </div>
        <div
          id="option4"
          className={`button ${style.navBarOption}`}
          onClick={() => handleTransition(3)}
        >
          Character Info
        </div>
        <div id="Selector" className={`${style.selector}`}>
          <div id="bar" className={`${style.underline}`} />
        </div>
      </div>
      <div id="data" className={`${style.navBarDataContainer}`}>
        <div className={`${style.navBarData}`}>
          {activeTab === 0 && (
            <div>
              <div className="flex flex-row w-full items-center gap-[20px]">
                <h3>Feats</h3>
                <button
                  className="gg-add"
                  onClick={() => addFeat()}
                />
                <Link
                  href={"http://dnd5e.wikidot.com/#toc70"}
                  target={"_blank"}
                  className="gg-browse"
                />
              </div>

              <div className={`${style.dataContainer}`}>
                <div className={`${style.data}`}>
                  {feats.map((feat) => {
                    return (
                      <div key={feat.id} className="flex flex-col gap-[2px]">
                        <input
                          className="text-[20px] underline"
                          type="text"
                          placeholder="Feat Name"
                          value={feat.name}
                          onChange={(e) => {
                            feat.name = e.target.value;
                            SetFeats([...feats]);
                            characterInfo.playerStats.PlayerFeats = feats;
                          }}
                        />
                        <textarea
                          className="h-[100px] p-[5px]"
                          placeholder="Feat Description"
                          value={feat.description}
                          onChange={(e) => {
                            feat.description = e.target.value;
                            SetFeats([...feats]);
                            characterInfo.playerStats.PlayerFeats = feats;
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div>
              <h3>Languages</h3>
              <div className={`${style.dataContainer}`}>
                <div className={`${style.data}`}>
                  <textarea
                    name="Languages"
                    className="h-[200px] p-[5px] w-full"
                    placeholder="languages"
                    value={characterInfo.playerStats.Languages}
                    onChange={(e) => {
                      characterInfo.playerStats.Languages = e.target.value;
                      setUpdateValue(!updateValue);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
              <h3>Notes</h3>
              <textarea
                name="Notes"
                className="h-[200px] p-[5px] w-full"
                placeholder="Notes"
                value={characterInfo.playerInfo.Notes}
                onChange={(e) => {
                  characterInfo.playerInfo.Notes = e.target.value;
                  setUpdateValue(!updateValue);
                }}
              />
            </div>
          )}
          {activeTab === 3 && (
            <div>
              <h3>Character info</h3>
              <InputField
                labelName={"Background"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Background = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Background}
              />
              <InputField
                labelName={"Alignment"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Alignment = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Alignment}
              />
              <InputField
                labelName={"Player name"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.PlayerName = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.PlayerName}
              />
              <InputField
                labelName={"Experience"}
                onValueChange={(e) => {
                  characterInfo.playerInfo.Experience = e;
                  setReloadPage(!reloadPage);
                }}
                setValue={characterInfo.playerInfo.Experience}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
