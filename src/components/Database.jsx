'use server'
import { Client, Databases,Query} from "node-appwrite";

const client = new Client();


client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY)
  let DB = new Databases(client);

export async function GetServerSpells(activeFilters) {
  const queryOptions = [
    Query.limit(850)
  ];

  // Include active filters in the query
  activeFilters.forEach((filter) => {
    // Modify this part based on your filter structure and database schema
    queryOptions.push(Query.filters(["fieldName", "in", [filter]]));
  });

  // const x = await DB.listDocuments(
  //   process.env.NEXT_PUBLIC_DATABASE_ID,
  //   process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
  //   queryOptions
  // );
  return [];
}

// async function SortSpells(spellList){
//     Object.values(spellList).map((spells)=>{
    
//       if(spells.SpellLevel === 'cantrips')
//       {
//         spells.SpellLevel = '0';
//       }
//     })
//     spellList.sort((a, b) => parseInt(a.SpellLevel) - parseInt(b.SpellLevel))
//     Object.values(spellList).map((spells)=>{
    
//       if(spells.SpellLevel === '0')
//       {
//         spells.SpellLevel = 'cantrip';
//       }
//     })
//     return spellList
//   }