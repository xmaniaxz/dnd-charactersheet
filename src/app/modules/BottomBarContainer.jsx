import { Query, Databases, Client } from "node-appwrite";
import SpellButton from "./Spellbutton";
import Filter from "./Filter";
const client = new Client();
let DB = new Databases(client);

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
  .setKey(process.env.NEXT_PUBLIC_API_KEY);




export default async function BottomContainer() {
    
    let docs = await GetServerSpells();
    let api = docs.documents || [];
    api = await SortSpells(api)
    
  return (
    <div className="float-left w-screen m-0 p-0">
      <div className="bottomContainer">
        <div className="bottominfoContainerButtons">
          <button>Spells</button>
          <button>Inventory</button>
          <button>Character info</button>
        </div>
        <div className="bottominfoContainerHeader">
          <div className="ml-2">
          <Filter key={'Class'} filterName='Class' Options={['Artificer','Bard','Cleric','Druid','Paladin','Ranger','Sorcerer','Warlock','Wizard']}/>
          </div>
            
        </div>
        <div className="bottomInfoContainerBody">
          <div className="bottomSpellsContainer">
            {Object.values(api).map((spells) => {
              return <SpellButton key={spells.spellName} SpellText={spells.spellName} SpellLevel={spells.SpellLevel} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

async function GetServerSpells() {
    const x = await DB.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_COLLECTION_SPELL_ID,
        [Query.limit(850)]
      );
  return x;
}

async function SortSpells(spellList){
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

async function Getspells(){
  
}
