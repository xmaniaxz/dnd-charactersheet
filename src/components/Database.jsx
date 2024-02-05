import { database } from "@/utils/appwrite";
import { Query } from "appwrite";
import { CharacterInfo } from "@/utils/Variables";
import { ID } from "appwrite";
import { userId } from "@/utils/appwrite";

export async function GetServerSpells(IncomingFilters) {
  const activeFilters = IncomingFilters || [];
  const queryOptions = [Query.limit(850)];
  if (activeFilters.length > 0) {
    //Include active filters in the query
    activeFilters.forEach((filter) => {
      queryOptions.push(Query.equal(filter[0], filter[1]));
    });
  }
  const x = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
    queryOptions
  );
  const list = await SortSpells(x["documents"]);
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

  const SheetList = await database.listDocuments(
    process.env.NEXT_PUBLIC_SHEET_DATABASE_ID,
    process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
    [Query.equal("UserID",await userId)]
  );
  return SheetList

}
export async function WriteSheetToDatabase() {
  //Make JSON string
  const JsonData = JSON.stringify(CharacterInfo);
  const fileObject = {
    UserID: await userId,
    JSONFile: JsonData,
  };
  //If there is already an existing version, overwrite new saveData
  if (CharacterInfo.SheetID) {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_SHEET_DATABASE_ID,
      process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
      CharacterInfo.SheetID,
      fileObject
    );
  }
  //If there is no existing version. Add it to the database 
  else {
    const Doc = await database.createDocument(
      process.env.NEXT_PUBLIC_SHEET_DATABASE_ID,
      process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
      ID.unique(),
      fileObject
    );
    CharacterInfo.SheetID = Doc.$id;
    await database.updateDocument(
      process.env.NEXT_PUBLIC_SHEET_DATABASE_ID,
      process.env.NEXT_PUBLIC_SHEET_COLLECTION_ID,
      CharacterInfo.SheetID,
      fileObject
    );
  }
}
