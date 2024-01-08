export default function StatBox({statName}){
    return(
        <div>
            <div className="statContainer">
                <input type="number" defaultValue='10' className=" text-7xl" name="MainStat"/>
                <input type="number" defaultValue='0' className=" text-3xl" name="Modifier"/>
                <label className=" text-2xl" htmlFor="MainStat">{statName}</label>
                <button >Show Stats</button>
            </div>
        </div>
    )
}