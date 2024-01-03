import TopbarInfo from '../../modules/TopbarInfo'
import UnderInfo from '../../modules/UnderProfile'
import StatsContainer from '../../modules/StatsContainer'
import BottomContainer from '../../modules/BottomBarContainer'
import '../../globals.css'

export default function Home() {
  return (
    <main >
      <div className="topContainer">
        <TopbarInfo />
        <UnderInfo />   
        <StatsContainer /> 
                
      </div>
      <BottomContainer/>
    </main>
  )
}
