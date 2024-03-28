import { useState, useEffect } from "react";
import style from "@/CSS/TopbarInfo.module.css";
import { useCharacterInfo } from "./characterinfocontext";
import Link from "next/link";

export default function NavBar() {
  // const [activeTab, setActiveTab] = useState(0);
  // const [feats, SetFeats] = useState([]);
  // const { characterInfo } = useCharacterInfo();

  // const handleTransition = (identifier) => {
  //   setActiveTab(identifier);
  //   const selector = document.getElementById("Selector");

  //   switch (identifier) {
  //     case 0:
  //       selector.style.left = "0%";
  //       break;
  //     case 1:
  //       selector.style.left = "25%";
  //       break;
  //     case 2:
  //       selector.style.left = "50%";
  //       break;
  //     case 3:
  //       selector.style.left = "75%";
  //       break;
  //     default:
  //       selector.style.left = "0%";
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   SetFeats(characterInfo.playerInfo.PlayerFeats);
  // }, [characterInfo]);

  // const addFeat = () => {
  //   if (feats.length === 0) {
  //     SetFeats([{ name: "", description: "", id: Date.now().toString(30) }]);
  //   } else {
  //     SetFeats([
  //       ...feats,
  //       { name: "", description: "", id: Date.now().toString(30) },
  //     ]);
  //   }
  // };

  // return (
  //   <div className={`${style.navbarContainer}`}>
  //     <div id="header" className={`${style.navBar}`}>
  //       <div
  //         id="option1"
  //         className={`button`}
  //         onClick={() => handleTransition(0)}
  //       >
  //         Feats
  //       </div>
  //       <div
  //         id="option2"
  //         className={`button`}
  //         onClick={() => handleTransition(1)}
  //       >
  //         Languages
  //       </div>
  //       <div
  //         id="option3"
  //         className={`button`}
  //         onClick={() => handleTransition(2)}
  //       >
  //         Side Info
  //       </div>
  //       <div
  //         id="option4"
  //         className={`button`}
  //         onClick={() => handleTransition(3)}
  //       >
  //         Notes
  //       </div>
  //       <div id="Selector" className={`${style.selector}`}>
  //         <div id="bar" className={`${style.underline}`} />
  //       </div>
  //     </div>
  //     <div id="data" className={`${style.navBarDataContainer}`}>
  //       <div className={`${style.navBarData}`}>
  //         {activeTab === 0 && (
  //           <div>
  //             <div className="flex flex-row w-full items-center gap-[20px]">
  //               <h3>Feats</h3>
  //               <button
  //                 className="gg-add scale-[0.25] bg-[gray]"
  //                 onClick={() => addFeat()}
  //               />
  //               <Link
  //                 href={"http://dnd5e.wikidot.com/#toc70"}
  //                 target={"_blank"}
  //                 className="gg-browse"
  //               />
  //             </div>

  //             <div className={`${style.dataContainer}`}>
  //               <div className={`${style.data}`}>
  //                 {feats.map((feat) => {
  //                   return (
  //                     <div key={feat.id} className="flex flex-col gap-[2px]">
  //                       <input
  //                         className="text-[20px] underline"
  //                         type="text"
  //                         placeholder="Feat Name"
  //                         value={feat.name}
  //                         onChange={(e) => {
  //                           feat.name = e.target.value;
  //                           SetFeats([...feats]);
  //                           characterInfo.playerInfo.PlayerFeats = feats;
  //                         }}
  //                       />
  //                       <textarea
  //                         className="h-[200px] bg-transparent"
  //                         type="text"
  //                         placeholder="Feat Description"
  //                         value={feat.description}
  //                         onChange={(e) => {
  //                           feat.description = e.target.value;
  //                           SetFeats([...feats]);
  //                           characterInfo.playerInfo.PlayerFeats = feats;
  //                         }}
  //                       />
  //                     </div>
  //                   );
  //                 })}
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //         {activeTab === 1 && (
  //           <div>
  //             <h3>Languages</h3>
  //             <p>Languages go here</p>
  //           </div>
  //         )}
  //         {activeTab === 2 && (
  //           <div>
  //             <h3>Side Info</h3>
  //             <p>Side Info goes here</p>
  //           </div>
  //         )}
  //         {activeTab === 3 && (
  //           <div>
  //             <h3>Notes</h3>
  //             <p>Notes go here</p>
  //           </div>
  //         )}
  //         {activeTab > 3 && (
  //           <div>
  //             <h3>Feats</h3>
  //             <p>Feats go here</p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}
