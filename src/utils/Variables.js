 let playerInfo = {
  "PlayerName": "",
  "CharacterName": "",
  "Race": "",
  "Class": "",
  "SubClass": "",
  "Background":"",
  "Alignment": "",
  "Experience": "",
};
 let playerStats = {
    "Health": 0,
    "MaxHealth": 0,
    "Proficiency": 0,
    "Strength": 10,
    "Constitution":10,
    "Dexterity":10,
    "Intelligence":10,
    "Wisdom":10,
    "Charisma":10,
  };
 let playerInventory = {
    Weapons: [],
    Coins: {
      "Copper": 0,
      "Silver":0,
      "Gold":0,
      "Platinum":0
    },
    Inventory: ""

 };

export let CharacterInfo = {
  SheetID: null,
  playerInfo,
  playerStats,
  playerInventory,
}