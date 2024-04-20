import styles from "@/CSS/homepage.module.css";
import { useState,useEffect } from "react";

export default function AlertBox({ onCallback }) {

    const HandleButtonClick = (value) =>{
        onCallback(value)
    }
  return (
    <div className={styles.alertBGContainer}>
      <div className={styles.alertBoxContainer}>
        <div className={`${styles.closeButton}`} onClick={()=>HandleButtonClick(-1)}/>
        <div>Are you sure you want to delete this character sheet?<br/>You wont be able to restore this in the future</div>
        <div className="absolute w-full bottom-[20px] flex justify-evenly">
          <button
            className={`${styles.Button} 
            border-[5px] 
            border-[#00c900] 
            text-[#00c900] 
            bg-[#32CD3220]
            hover:text-[Lime] 
            hover:border-[Lime]
            hover:font-bold`}
            onClick={()=>{HandleButtonClick(0)}}
          >
            Yes
          </button>
          <button
            className={`${styles.Button} 
            border-[5px] 
            border-[#ff3f3f] 
            text-[#ff3f3f] 
            bg-[#ff3f3f20] 
            hover:text-[Red] 
            hover:border-[Red]
            hover:font-bold`}
            onClick={()=>{HandleButtonClick(1)}}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
