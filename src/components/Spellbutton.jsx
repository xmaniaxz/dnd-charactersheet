'use client'
import { useState } from "react";

export default function SpellButton({ SpellText,SpellLevel }) {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(!isClicked);
    };
  
    return (
      <div>
        <button
        className="spellButton"
          
          style={{ backgroundColor: isClicked ? 'lime' : 'lightgray' }}
          onClick={handleClick}
        >
          {SpellText} lvl {SpellLevel}
        </button>
      </div>
    );
  }