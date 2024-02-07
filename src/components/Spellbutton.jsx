'use client'

export default function SpellButton({ SpellText,SpellLevel, onButtonClick,isActiveSpell}) {
  
    const handleClick = () => {
      onButtonClick();
    };
    return (
      <div style={{width: "80%",margin:"3.5px auto"}}>
        <button
        className="spellButton"
          
          style={{backgroundColor: isActiveSpell ? 'lightgray' : 'gray'}}
          onClick={handleClick}
        >
          {SpellText} lvl {SpellLevel}
        </button>
      </div>
    );
  }