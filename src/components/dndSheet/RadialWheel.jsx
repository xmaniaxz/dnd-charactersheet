import { useState,useEffect } from "react";

export default function RadialColorWheel({ onChange, isActive,SetActive,ActiveColor}) {
  const [markerPosition, setMarkerPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [color,SetColor] = useState("");

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  useEffect(() => {
    SetColor(ActiveColor);
  }, [ActiveColor]);

  const handleColorChange = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const angle = Math.atan2(y - rect.height / 2, x - rect.width / 2);
    let hue = angle * (180 / Math.PI) + 180;
    hue = (hue + 270) % 360;

    const distanceFromCenter = Math.sqrt(
      Math.pow(x - rect.width / 2, 2) + Math.pow(y - rect.height / 2, 2)
    );
    const radius = rect.width / 2;
    let saturation = distanceFromCenter / (radius * 0.3);

    if (saturation > 1) {
      saturation = 1;
    }

    const color = `hsl(${hue}, ${saturation * 100}%, 50%)`;

    onChange(color);
    SetColor(color);
    setMarkerPosition({ x, y });
  };

  return (
    <div className="colorPickerContainer">
      {active ? (
        <button onClick={() => {setActive(false);SetActive()}} className="w-[40px] h-[30px]"
        style={{background:color}}>
        </button>
      ) : (
        <div id="Picker">
          <div className={"colorPicker"} onClick={handleColorChange}>
            <div className={"colorPickerInner"} />
            <div
              className={"marker"}
              style={{
                position: "absolute",
                top: `${markerPosition.y}px`,
                left: `${markerPosition.x}px`,
              }}
            />
           
          </div>
          <i className="gg-close-o ClosePicker" onClick={()=>setActive(true)}></i>
        </div>
      )}
    </div>
  );
}
