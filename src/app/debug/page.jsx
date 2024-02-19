import { AddToDataBase,EmptyDB } from "@/utils/node-appwrite";
import { cookies } from "next/headers";
export default function Home()
{
    //EmptyDB();
    //AddToDataBase()

    return(
        <div className="w-screen h-screen m-0 p-0 flex justify-center items-center">
            <h1 className="text-9xl">Debug</h1>
        </div>
    )
}