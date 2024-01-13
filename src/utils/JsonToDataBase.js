import { Client,ID, Databases,Query} from "node-appwrite";

const client = new Client();

var api = require('@/JSON/api.json')
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY)
  let DB = new Databases(client);


export  function GetListCount(){
    let SpellLevels = Object.keys(api);
    let count= 0;
    SpellLevels.forEach((key) => {
    count += api[key].length;
    })
    console.log(count);
  }

export async function SendToDB(){

    let Promises = [];
let SpellLevels = Object.keys(api);

SpellLevels.forEach((key) => {
    api[key].forEach((Spells) => {
        const document = {
            "Spell": Spells.spellName,
            "School": Spells.school,
            "Casting-time": Spells.castingTime,
            "Range": Spells.range,
            "Duration": Spells.duration,
            "Components": Spells.components,
            "Description": Spells.description,
            "HigherLevel": Spells.higherLevel,
            "SpellLists": Spells.spelllists,
            "SpellLevel": key,
        };
        console.log(document.HigherLevel);
        console.log(key);
        console.log(Spells.spellName)
        try {
            const promise = DB.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID, process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID, ID.unique(), document);
            Promises.push(promise);
        } catch (e) {
            console.log("Error trying to find " + Spells.spellName);
        }
    });
});

Promise.all(Promises)
    .then(() => {
        console.log("All promises resolved successfully");
    })
    .catch((error) => {
        
        console.error("Error in Promise.all: ", error);
        debugger
    });

    // Object.values(api).map((values,index)=>{
    //     Object.values(values).map((Spells)=>{
    //         console.log(Spells.spellName);
    //     })
        
    // })
}

export async function ClearDB(){
    const Promises = [];
   const list =  await DB.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,[Query.limit(10000)]);
   list.documents.map(doc =>{
    let promise = DB.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,doc.$id)
    Promises.push(promise);
    console.log(doc.$id);
   })
    Promise.all(Promises);
   

}