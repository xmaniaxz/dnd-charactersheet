// BottomContainer.js
import SpellContainer from "./SpellContainer";
import { GetServerSpells, SortSpells } from "./Database";



export default async function BottomContainer() {
  const db = await GetServerSpells();
  console.log(db);
  return (
    <div>
      <SpellContainer  />
    </div>
  );
}
