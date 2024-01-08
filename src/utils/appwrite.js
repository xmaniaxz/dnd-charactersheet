import {Client, Account} from "appwrite"

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
export let account = new Account(client);
export {ID} from 'appwrite'
