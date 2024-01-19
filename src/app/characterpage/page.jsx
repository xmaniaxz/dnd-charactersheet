import TopbarInfo from '@/components/TopbarInfo'
import UnderInfo from '@/components/UnderProfile'
import StatsContainer from '@/components/StatsContainer'
import BottomContainer from '@/components/BottomContainer'

export const metadata = {
  title: 'D&DMCT | Sheet',
  description: 'D&D Character Management Tool'
}

export default function Home() {
  return (
    <main >
      <div className="topContainer">
        <TopbarInfo />
        <UnderInfo />   
        <StatsContainer />        
      </div>
      <BottomContainer />
    </main>
  )
}