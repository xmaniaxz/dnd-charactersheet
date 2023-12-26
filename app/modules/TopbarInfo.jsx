"use client"
import InputField from "./Inputfields"
import Image from "next/image"
import ProfilePicture from '/app/Images/ProfilePicture/alexis.png'
export default function TopbarInfo()
{
    return(
    <div>
            <div className="topInfoContainer">
                <InputField InputText='Race :'/>
                <InputField InputText='Class :'/>
                <InputField InputText='Sub-class :'/>
                <InputField InputText='Background :'/>
            </div>
            <div className="topInfoContainer">
                <div className="imageContainer">
                <Image src={ProfilePicture} alt="" width='1500' height='2400' style={{ alignSelf: 'start' }}/>
                </div>                
            </div>
            <div className="topInfoContainer">
            <InputField InputText=': Playername' reversed={true}/>
            <InputField InputText=': Alignment' reversed={true}/>
            <InputField InputText=': Exp' reversed={true}/>
        </div>
    </div>
    )    
}