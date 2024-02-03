import {Client, Account, Databases} from "appwrite"

export const client = new Client();
export const database = new Databases(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
export let account = new Account(client);
export {ID} from 'appwrite'
