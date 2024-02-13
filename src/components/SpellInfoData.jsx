export default function SpellInfoData({SpellData}){
    return(
        <div className="SpellInfoOffset">
            <p className="text-2xl"><b>{SpellData.SpellName}</b></p>
            <p><b>School:</b> {SpellData.School}</p>
            <p><b>Casting Time:</b> {SpellData.Castingtime}</p>
            <p><b>Range:</b> {SpellData.Range}</p>
            <p><b>Duration:</b> {SpellData.Duration}</p>
            <p><b>Components:</b> {SpellData.Components}</p>
            <p><b>Description:</b> {SpellData.Description}</p>
            <p><b>At higher levels:</b> {SpellData.HigherLevel}</p>
          </div>
    )
}