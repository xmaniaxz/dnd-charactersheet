"use client"
import InputField from "./Inputfields"
import Image from "next/image"
export default function TopbarInfo()
{
    return(
    <div>
            <div className="topInfoContainer">
                <InputField classname={'topTD'} InputText='Race :'/>
                <InputField classname={'topTD'} InputText='Class :'/>
                <InputField classname={'topTD'} InputText='Sub-class :'/>
                <InputField classname={'topTD'} InputText='Background :'/>
            </div>
            <div className="topInfoContainer">
                <div className="imageContainer">
                <Image src="/ProfilePicture/alexis.png" alt="" width='1500' height='2400' style={{ alignSelf: 'start' }}/>
                </div>                
            </div>
            <div className="topInfoContainer">
            <InputField classname={'topTD'} InputText=': Playername' reversed={true}/>
            <InputField classname={'topTD'} InputText=': Alignment' reversed={true}/>
            <InputField classname={'topTD'} InputText=': Exp' reversed={true}/>
        </div>
    </div>
    )    
}