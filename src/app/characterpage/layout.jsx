import { CharacterInfoProvider } from '@/components/characterinfocontext'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'D&DMCT | Sheet',
  description: 'D&D Character Management Tool'
}

export default function RootLayout({ children }) {
  return (
    <html  lang="en">
      <CharacterInfoProvider>
      <body className={inter}>{children}</body>
      </CharacterInfoProvider>
    </html>
  )
}
