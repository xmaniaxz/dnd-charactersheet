import {Client, Account} from "appwrite"

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
    // .setKey(process.env.NEXT_PUBLIC_API_KEY);

export let account = new Account(client);
export {ID} from 'appwrite'
//const database = new Databases(client)


// const file = await fs.readFile(process.cwd() + "/api.json", "utf8");
// const spells = JSON.parse(file);


// const promises = [];

// Object.keys(spells).forEach((key) => {
//   spells[key].forEach((cantrip, index) => {
//     const document = {
//       ...cantrip,
//       SpellLevel: key
      
//     };


    
//     const promise = database.createDocument("658c4342e47a09befc22", "658c439921330c24c448", ID.unique(), document);
//     promises.push(promise);
//   });
// });

// // Use Promise.all to wait for all promises to resolve
// Promise.all(promises)
//   .then((results) => {
//     // Handle results if needed
//     console.log('All documents created successfully:', results);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error('Error creating documents:', error);
//   });






// async function test(){
//   const x = await database.listDocuments("", "" , [
//     Query.equal("spellName", "Flame Arrows"),
//     Query.limit(1)
//   ])
// }

// test()