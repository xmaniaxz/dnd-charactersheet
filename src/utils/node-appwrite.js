import { Databases, Client, ID, Query } from "node-appwrite";
import api from "../JSON/api.json";
const client = new Client();
const database = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY);
let count = 0;
Object.values(api).map((values) => {
  count += values.length;
});
console.log(`Amount of spells in api: ${count}`);
//////////////////////EVERYTHING HERE IS TO ADD TO DATABASE AND SHOULD NOT BE USED IN PRODUCTION//////////////////////////

export async function AddToDataBase() {
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
        HigherLevel: spells.higherLevel,
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
        console.log(`error on ${spells.spellName} = ${e} . Value given: ${await ConvertClassToString(spells)} `);
      }
    });
  });
}

export async function EmptyDB() {
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
}

function ConvertClassToString(spell) {
  const spellList = spell.spelllists;
  let listString = spellList.map((values) => {
    return ` ${values}`;
  });
  //console.log(`${spell.spellName} | ${listString}`);
  //console.log(listString.length +"|"+ listString)
  return listString.toString();
}
