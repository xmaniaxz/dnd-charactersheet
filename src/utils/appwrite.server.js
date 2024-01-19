import sdk, { Databases } from "node-appwrite";

export const client = new sdk.Client();

client
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`)
  .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`)
  .setKey(`${process.env.NEXT_PUBLIC_API_KEY}`) // Your secret API key
  .setSelfSigned(); // Replace with your project ID

export const DB = new Databases(client);
