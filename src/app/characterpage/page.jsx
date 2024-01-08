import TopbarInfo from '@/components/TopbarInfo'
import UnderInfo from '@/components/UnderProfile'
import StatsContainer from '@/components/StatsContainer'
import BottomContainer from '@/components/BottomBarContainer'
import { GetServerSpells } from '@/components/Database'

export default function Home() {
  // ServerSpells();
  return (
    <main >
      <div className="topContainer">
        <TopbarInfo />
        <UnderInfo />   
        <StatsContainer />        
      </div>
      <BottomContainer action={GetServerSpells} />
    </main>
  )
}