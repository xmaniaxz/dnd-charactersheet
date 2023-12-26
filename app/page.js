import Image from 'next/image'
import TopbarInfo from './modules/TopbarInfo'
import './globals.css'
export default function Home() {
  return (
    <main className="">
      <div className="topContainer">
        <TopbarInfo/>
      </div>
    </main>
  )
}
