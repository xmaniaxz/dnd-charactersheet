import {Client, Account, Databases} from "appwrite"

export const client = new Client();
export const database = new Databases(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
export let account = new Account(client);
export let userId = GetUserID();
export {ID} from 'appwrite'


async function GetUserID(){
    try{
        const res = await account.get();
    return res.$id
    }
    catch
    {
        return null
    }
    
}

