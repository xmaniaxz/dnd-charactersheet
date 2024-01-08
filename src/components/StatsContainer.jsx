import StatBox from "./Stat"

export default function StatsContainer() {
    return (
        <div className="statsContainer">
            <StatBox statName={'Strength'} />
            <StatBox statName={'Constitution'} />
            <StatBox statName={'Dexterity'} />
            <StatBox statName={'Intelligence'} />
            <StatBox statName={'Wisdom'} />
            <StatBox statName={'Charisma'} />
        </div>
    )
}