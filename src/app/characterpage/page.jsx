import TopbarInfo from '@/components/TopbarInfo'
import UnderInfo from '@/components/UnderProfile'
import StatsContainer from '@/components/StatsContainer'
import BottomContainer from '@/components/BottomBarContainer'
import { SendToDB,ClearDB,GetListCount } from '@/utils/JsonToDataBase'

export const metadata = {
  title: 'D&DMCT | Sheet',
  description: 'D&D Character Management Tool'
}

export default function Home() {
  // SendToDB();
  // ClearDB()
  // GetListCount()
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