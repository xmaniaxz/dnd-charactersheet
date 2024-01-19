"use client"
import { useEffect, useState } from "react";
import { GetBasicReply } from "./Database";
export default function GrabSpells(){
    const [Data,setData] = useState("");
    useEffect(()=>{
        const Getspells = async () => {
            const x = await GetBasicReply();
            if(!ignore)
            {
                setData(x); 
            }
               
        };
        let ignore = false;
       Getspells();
       return () =>{
        ignore = true;
       }
    },[])

    console.log(Data);
}