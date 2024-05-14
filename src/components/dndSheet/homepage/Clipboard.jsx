import { publish } from "@/utils/events";
export default function Clipboard({TextToCopy,PlaceHolderText}) {
    const Text = TextToCopy || "";
    const PlaceHolder = PlaceHolderText || ""
  return (
    <div className="clipBoardContainer">
      <div className="iconContainer button">
        <div id="popup" className="logoPopup up">
          <span className="shadow noDrag">Copy to clipboard</span>
        </div>
        <p className="text-center" onClick={()=>{
            navigator.clipboard.writeText(Text);  
            publish("ShowPopUp", {
                      text: "Copied to clipboard.",
                      visibility: true,
                      backgroundColor: "rgba(0, 255, 0, 0.8)",
                      top: "10px",
                      right: "20px",
                    });
        }}>{PlaceHolder}</p>
      </div>
    </div>
  );
}
