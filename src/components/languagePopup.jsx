import Image from "next/image";

export default function LanguagePopup({ icon, iconName,height = 40,width =40,key }) {
  return (
    <div key={key} className="iconContainer">
      <div id="popup" className="logoPopup up">
        <span className="popuptext shadow noDrag">{iconName}</span>
      </div>
      <Image
        src={`/icons/${icon}`}
        height={height}
        width={width}
        alt={iconName}
        className="svgIcon invertColor noDrag"
      />
    </div>
  );
}
