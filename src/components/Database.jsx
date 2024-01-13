'use server'
import { Client, Databases,Query} from "node-appwrite";
import { revalidatePath } from "next/cache";
const client = new Client();


client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY)
  .setSelfSigned(process.env.NEXT_PUBLIC_PROJECT_ID)
  let DB = new Databases(client);

export async function GetServerSpells(activeFilters) {
  // console.log('Got filters:', activeFilters);
  const queryOptions = [
    Query.limit(850)
  ];

  // Include active filters in the query
  activeFilters.forEach((filter) => {
    // Modify this part based on your filter structure and database schema

      queryOptions.push(Query.equal(filter[0],filter[1]));
      // console.log(typeof filter[0],typeof filter[1]);
    
    
  });
  // console.log(queryOptions);
  const x = await DB.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID,
    process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
    queryOptions
  );
  revalidatePath("/characterpage");
  return x;
  // return [];
}

export async function SortSpells(spellList){
    Object.values(spellList).map((spells)=>{
    
      if(spells.SpellLevel === 'cantrips')
      {
        spells.SpellLevel = '0';
      }
    })
    spellList.sort((a, b) => parseInt(a.SpellLevel) - parseInt(b.SpellLevel))
    Object.values(spellList).map((spells)=>{
    
      if(spells.SpellLevel === '0')
      {
        spells.SpellLevel = 'cantrip';
      }
    })
    return spellList
  }