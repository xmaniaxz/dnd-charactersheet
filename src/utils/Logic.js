import * as Server from "@/utils/node-appwrite";
export async function LoginUser(request) {
    try {
      const account = await Server.createSessionServerClient();
      const session = await account.createEmailPasswordSession(request.email, request.password);
       cookies().set(userCookie, session.secret, {
         path: "/",
         httpOnly: true,
         sameSite: "strict",
         secure: true,
         expires: SetExpiryDate(7),
       });
  
      await createSessionClient();
    } catch (error) {
       return { error: error };
    }
  }
  export async function Registeruser(email, password, name) {
    const { account } = await Server.createSessionServerClient();
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    cookies().set(userCookie, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: SetExpiryDate(7),
    });
  }
  export async function LogoutUser() {
    try {
      const { account } = await Server.createSessionClient();
      await account.deleteSession("current");
      cookies().set(userCookie, "", {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: new Date(0),
      });
    } catch (error) {
       return { error: error.message };  //Return the error message as a plain object
    }
  }
  
  export async function GetLoggedInUser() {
    try {
      const { account } = await Server.createSessionClient();
      return await account.get();
    } catch (error) {
      return { error: "No Session" };
    }
  }
  
  export async function GetUserLogo() {
    const client = await createUserClient();
    const avatars = new Avatars(client);
    const user = await GetLoggedInUser();
    try {
      const arrayBuffer = await avatars.getInitials(user.name);
      const base64Logo = Buffer.from(arrayBuffer).toString("base64");
      return base64Logo;
    } catch (error) {
      return { error: error };
    }
  }


 //#region CharacterSheets

 export async function GetCharacterSheet(sheetID) {
   try {
     const database = await CreateDataBaseSession();

     const SheetList = await database.listDocuments(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
       [Query.equal("SheetID", sheetID)]
     );
     return SheetList.documents;
   } catch (error) {
     return { error: error };
   }
 }
 export async function RemoveCharacterSheet(sheetID) {
   try{
   const database = await CreateDataBaseSession();
   await database.deleteDocument(
     process.env.NEXT_PUBLIC_DATABASE_ID,
     process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
     sheetID
   );}
   catch (error) {
     return { error: error };
   }
 }

 export async function WriteSheetToDatabase(sheet) {
   const database = await CreateDataBaseSession();
   const user = await GetLoggedInUser();
   const userID = user ? user.$id : null;
   const newCharacter = sheet.SheetID ? false : true;
   const sheetID = sheet.SheetID ? sheet.SheetID : GenerateRandomID();
   !sheet.SheetID && (sheet.SheetID = sheetID);
   const Sheet = {
     UserID: userID,
     LinkedTeam: null,
     SheetID: sheetID,
     JSONFile: JSON.stringify(sheet),
   };
   if (newCharacter) {
     await database.createDocument(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
       Sheet.SheetID,
       Sheet
     );
   } else {
     await database.updateDocument(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
       sheetID,
       Sheet
     );
   }
   //Set cookie correctly:
   cookies().set("characterInfo", Sheet.SheetID, {
     path: "/D&D",
     httpOnly: false,
     sameSite: "None",
     secure: false,
     expiryDate: SetExpiryDate(14),
   });
 }

 export async function GetUserCharacterSheets(filters) {
   const user = await GetLoggedInUser();
   const userID = user ? user.$id : null;
   const database = await CreateDataBaseSession();
   if (!filters) {
     const SheetList = await database.listDocuments(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
       [Query.equal("UserID", userID)]
     );
     return SheetList.documents;
   } else {
     const queryOptions = [Query.equal("SheetID", filters)];
     const SheetList = await database.listDocuments(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
       queryOptions
     );
     return SheetList.documents;
   }
 }

 export async function GetLinkedSheets(teamID) {
   const client = await createAdminClient();
   const team = new Teams(client);
   const preferences = await team.getPrefs(teamID);
   return preferences.sheets;
 }

 export async function LinkSheetToTeam(sheet, teamID) {
   const client = await createAdminClient();
   const team = new Teams(client);
   const preferences = await team.getPrefs(teamID);
   let sheets = preferences.sheets;
   if (sheets && sheets.length > 0) {
     if (!sheets.includes(sheet)) sheets.push(sheet);
   } else {
     await UpdateLinkState(sheet, teamID);
     sheets = [sheet];
   }
   await team.updatePrefs(teamID, { sheets: sheets });
 }

 export async function UnLinkSheetToTeam(sheet, teamID) {
   const client = await createAdminClient();
   const team = new Teams(client);
   const preferences = await team.getPrefs(teamID);
   let sheets = preferences.sheets;
   if (sheets && sheets.length > 0) {
     if (sheets.includes(sheet))
       sheets = sheets.filter((value) => value !== sheet);
     await UpdateLinkState(sheet, null);
     if (sheets.length > 0) {
       await team.updatePrefs(teamID, { sheets: sheets });
     } else await team.updatePrefs(teamID, {});
   }
 }

 async function UpdateLinkState(SheetID, teamID) {
   const client = await createAdminClient();
   const database = new Databases(client);
   const res = await GetCharacterSheet(SheetID);
   const sheet = {
     UserID: res[0].UserID,
     SheetID: res[0].SheetID,
     LinkedTeam: teamID ? teamID : null,
     JSONFile: res[0].JSONFile,
   };
   await database.updateDocument(
     process.env.NEXT_PUBLIC_DATABASE_ID,
     process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
     sheet.SheetID,
     sheet
   );
 }

 function GenerateRandomID() {
   const randomDigits = Math.floor(Math.random() * 900000) + 100000;
   const timeDigits = new Date().getTime().toString();
   const ID = randomDigits.toString() + timeDigits;
   return ID;
 }

 //#endregion

 //#region Teams

 export async function GetTeamUsers(teamID) {
   const client = await createUserClient();
   const team = new Teams(client);
   const teamMembers = await team.listMemberships(teamID);
   return teamMembers.memberships;
 }

 export async function GetTeams() {
   const client = await createUserClient();
   const teams = new Teams(client);
   const teamList = await teams.list();
   return teamList.teams;
 }

 export async function CreateNewTeam(teamName) {
   const client = await createUserClient();
   const team = new Teams(client);
   await team.create(CreateTeamID(), teamName, ["DM"]);
 }

 export async function DeleteTeam(teamID) {
   const client = await createAdminClient();
   const team = new Teams(client);
   await team.delete(teamID);
 }
 export async function EditTeam(teamID, teamName) {
   const client = await createAdminClient();
   const team = new Teams(client);
   await team.updateName(teamID, teamName);
 }

 export async function JoinTeam(teamID) {
   const client = await createAdminClient();
   const user = await GetLoggedInUser();
   const team = new Teams(client);
   const Membership = await team.listMemberships(teamID);
   let role = "";
   Membership.total > 0 ? (role = ["Player"]) : (role = ["owner", "DM"]);
   await team.createMembership(teamID, role, user.email);
 }

 export async function LeaveTeam(teamID) {
   const client = await createAdminClient();
   const team = new Teams(client);
   const Membership = await GetUserMemberShip(teamID);
   await team.deleteMembership(teamID, Membership);
   const members = await team.listMemberships(teamID);
   if (members.total === 0) {
     await DeleteTeam(teamID);
   }
 }

 async function GetUserMemberShip(teamID) {
   const user = await GetLoggedInUser();
   const client = await createUserClient();
   const team = new Teams(client);
   const membership = await team.listMemberships(teamID, [], user.$id);
   return membership.memberships[0].$id;
 }

 function CreateTeamID() {
   const randomDigits = Math.floor(Math.random() * 9000) + 1000;
   const timeDigits = new Date().getTime().toString().slice(-4);
   const teamID = randomDigits.toString() + timeDigits;
   return teamID;
 }

 //#endregion

 //#region Database

 export async function GetServerSpells(IncomingFilters) {
   const client = await createAdminClient();
   const database = new Databases(client);
   const activeFilters = IncomingFilters || [];
   const queryOptions = [Query.limit(850)];
   if (activeFilters.length > 0) {
     //Include active filters in the query
     activeFilters.forEach((filter) => {
       switch (filter[0]) {
         case "SpellName":
           console.log(
             `Database.jsx: Got: SpellName with filters ${filter[0]} | ${filter[1]}}`
           );
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
    console.log(`trying to find spells with filters: ${queryOptions}`);
   const x = await database.listDocuments(
     process.env.NEXT_PUBLIC_DATABASE_ID,
     process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
     queryOptions
   );
   const list = await SortSpells(x["documents"]);
    console.log(`Database.jsx: Found list: ${JSON.stringify(list)}`);
   return list;
 }

 async function SortSpells(spellList) {
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

 export async function AddToDataBase() {
   const client = await createAdminClient();
   const database = new Databases(client);
   const SpellLevel = Object.keys(api);
   SpellLevel.forEach((Level) => {
     api[Level].map(async (spells) => {
       //Set Data
       const spell = {
         SpellName: spells.spellName,
         School: spells.school,
         CastingTime: spells.castingTime,
         Range: spells.range,
         Duration: spells.duration,
         Components: spells.components,
         Description: spells.description,
         HigherLevel: Array.isArray(spells.higherLevel)
           ? ""
           : spells.higherLevel,
         Class: await ConvertClassToString(spells),
         SpellLevel: Level,
       };

       //Try adding to doc.
       try {
         const Doc = await database.createDocument(
           process.env.NEXT_PUBLIC_DATABASE_ID,
           process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
           ID.unique(),
           spell
         );
       } catch (e) {
         console.log(
           `error on ${
             spells.spellName
           } = ${e} . Value given: ${await ConvertClassToString(spells)} `
         );
       }
     });
   });
 }

 export async function EmptyDB() {
   const { client } = await createAdminClient();
   const database = new Databases(client);
   const list = await database.listDocuments(
     process.env.NEXT_PUBLIC_DATABASE_ID,
     process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
     [Query.limit(2000)]
   );
   list["documents"].map(async (values) => {
     await database.deleteDocument(
       process.env.NEXT_PUBLIC_DATABASE_ID,
       process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
       values.$id
     );
   });
   console.log("trying to empty DB");
 }

 function ConvertClassToString(spell) {
   const spellList = spell.spelllists;
   let listString = spellList.map((values) => {
     return ` ${values}`;
   });
   return listString.toString();
 }
 //#endregion Database

 //#region Storage

 export async function UploadFile(file) {
   const File = file.get("file");
   const client = await createUserClient();
   const storage = new Storage(client);
   const fileExists = await CheckIfFileExists(File.name);
   if (!fileExists) {
     const uploadResponse = await storage.createFile(
       process.env.NEXT_PUBLIC_BUCKET_ID,
       ID.unique(),
       File
     );
     return uploadResponse.$id;
   } else {
     const files = await storage.listFiles(process.env.NEXT_PUBLIC_BUCKET_ID);
     const existingFile = files.files.find((files) => files.name === File.name);
     return existingFile.$id;
   }
 }

 async function CheckIfFileExists(fileName) {
   const client = await createAdminClient();
   const storage = new Storage(client);
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

 //#endregion Storage