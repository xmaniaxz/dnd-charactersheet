"use server"

import { DB } from "@/utils/appwrite.server";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

export async function GetServerSpells(IncomingFilters) {
  const activeFilters = IncomingFilters || [];
  console.log("Got filters:", activeFilters);
  const queryOptions = [Query.limit(850)];
  if (activeFilters.length > 0) {
    //Include active filters in the query
    activeFilters.forEach((filter) => {
      queryOptions.push(Query.equal(filter[0], filter[1]));
    });
  }

  console.log("Got a fetch request");
  const x = await DB.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
    queryOptions
  );

  revalidatePath("/characterpage");
  return x;
}

export async function GetHello(){
  return ["Hello"];
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
