import { CharacterInfoProvider } from '@/components/characterinfocontext'
import { Inter } from 'next/font/google'
import Script from 'next/script'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'D&DCMT | Debug',
  description: 'D&D Character Management Tool'
}

export default function RootLayout({ children }) {
  return (
    <div  lang="en">
      <div className={`m-0 latin`}>{children}</div>  
    </div>
  )
}
