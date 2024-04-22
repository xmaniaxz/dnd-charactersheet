import { account, client, database, storage,teams } from "@/utils/appwrite";
import { Query } from "appwrite";
import { ID } from "appwrite";
import { userId } from "@/utils/appwrite";
import { publish } from "./events";

export async function GetServerSpells(IncomingFilters) {
  const activeFilters = IncomingFilters || [];
  const queryOptions = [Query.limit(850)];
  if (activeFilters.length > 0) {
    //Include active filters in the query
    activeFilters.forEach((filter) => {
      switch (filter[0]) {
        case "SpellName":
          //console.log(`Database.jsx: Got: SpellName with filters ${filter[0]} | ${filter[1]}}`)
          queryOptions.push(Query.search(filter[0], `./${filter[1]}/`));
          break;
        case "Class":
          queryOptions.push(Query.search(filter[0], filter[1]));
          break;
        default:
          queryOptions.push(Query.equal(filter[0], filter[1]));
          break;
      }
    });
  }
  //console.log(`trying to find spells with filters: ${queryOptions}`);
  const x = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
    queryOptions
  );
  const list = await SortSpells(x["documents"]);
  //console.log(`Database.jsx: Found list: ${JSON.stringify(list)}`);
  return list;
}

export async function SortSpells(spellList) {
  Object.values(spellList).map((spells) => {
    if (spells.SpellLevel === "cantrips") {
      spells.SpellLevel = "0";
    }
  });
  spellList.sort((a, b) => parseInt(a.SpellLevel) - parseInt(b.SpellLevel));
  Object.values(spellList).map((spells) => {
    if (spells.SpellLevel === "0") {
      spells.SpellLevel = "cantrip";
    }
  });
  return spellList;
}

export async function GetUserCharacterSheets() {
  const userID = await userId;
  const SheetList = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
    [Query.equal("UserID", userID)]
  );
  return SheetList;
}

export async function GetCharacterSheet(sheetID) {
  const SheetList = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
    [Query.equal("SheetID", sheetID)]
  );
  return SheetList.documents;
}
export async function WriteSheetToDatabase(FileToSend) {
  //Make JSON string
  const JsonData = JSON.stringify(FileToSend);
  let SheetID = FileToSend.SheetID;
  const userID = await userId;
  if (!userID) {
    publish("ShowPopUp", {
      text: "Could not find active Session!",
      visibility: true,
      backgroundColor: "rgba(255, 0, 0, 0.8)",
      top: "10px",
      right: "20px",
    });
    return;
  }
  const fileObject = {
    UserID: userID,
    JSONFile: JsonData,
    SheetID: SheetID,
  };
  //If there is already an existing version, overwrite new saveData
  if (!SheetID) {
    //make document with unique ID.
    const Doc = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
      ID.unique(),
      fileObject
    );

    fileObject.SheetID = Doc.$id;
    FileToSend.SheetID = fileObject.SheetID;
    fileObject.JSONFile = JSON.stringify(FileToSend);
    //Grab doc and grab the $id which is uniqueID. add said ID to to FileToSend.SheetID;
    if (fileObject.SheetID !== null) {
      await database.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
        fileObject.SheetID,
        fileObject
      );
      //Set cookie correctly: 
      document.cookie = `characterInfo=${JSON.stringify(fileObject.SheetID)}; path=/; sameSite=false;`;
      publish("ShowPopUp", {
        text: "Created new character!",
        visibility: true,
        backgroundColor: "rgba(0, 128, 0, 0.8)",
        top: "10px",
        right: "20px",
      });
    }
  }

  //If there is a existing version update to the database
  else {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID,
      process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
      SheetID,
      fileObject
    );
    publish("ShowPopUp", {
      text: "saved character sheet",
      visibility: true,
      backgroundColor: "rgba(0, 128, 0, 0.8)",
      top: "10px",
      right: "20px",
    });
  }
}

export async function DeleteSheetFromDatabase(SheetID) {
  await database.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
    SheetID
  );
  publish("ShowPopUp", {
    text: "Deleted character",
    visibility: true,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    top: "10px",
    right: "20px",
  });
}

export async function UploadFile(file) {
  const fileExists = await CheckIfFileExists(file.name);
  if (!fileExists) {
    console.log("returned false, uploading file...");
    const uploadResponse = await storage.createFile(
      process.env.NEXT_PUBLIC_BUCKET_ID,
      ID.unique(),
      file
    );

    publish("ShowPopUp", {
      text: "Image uploaded successfully.",
      visibility: true,
      backgroundColor: "rgba(0, 128, 0, 0.8)",
      top: "10px",
      right: "20px",
    });
    return uploadResponse.$id;
  } else {
    const files = await storage.listFiles(process.env.NEXT_PUBLIC_BUCKET_ID);
    const existingFile = files.files.find((files) => files.name === file.name);
    publish("ShowPopUp", {
      text: "Image already exists. Using existing image.",
      visibility: true,
      backgroundColor: "rgba(0, 128, 0, 0.8)",
      top: "10px",
      right: "20px",
    });
    return existingFile.$id;
  }
}

export async function GetFile(fileID) {
  const file = storage.getFileView(
    process.env.NEXT_PUBLIC_BUCKET_ID,
    fileID
  );
  return file;
}

export async function GetFileID(fileName){

}

async function CheckIfFileExists(fileName) {
  try {
    const files = await storage.listFiles(process.env.NEXT_PUBLIC_BUCKET_ID);
    if (files.total === 0) {
      return false;
    }
    const existingFile = files.files.find((file) => file.name === fileName);
    if (existingFile) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
}


export async function GetUserTeams(){
  const listPromise = await teams.list();
  const customTeams = await Promise.all(listPromise.teams.map(async (team) => ({
    name: team.name,
    id: team.$id,
    teamMembers: await GetTeamMembers(team.$id),
  })));


  return customTeams;

}

async function GetTeamMembers(teamID){
  const members = await teams.listMemberships(teamID);
  const memberData =  
  members.memberships.map(member => ({
    name: member.userName,
    id: member.$id,
    role: member.roles,
  }));
  return memberData;
}

export async function CreateTeam(teamName){
}