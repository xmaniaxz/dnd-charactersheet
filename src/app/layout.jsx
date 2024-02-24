import { Inter } from 'next/font/google'
import '@/CSS/globals.css'
import "@/CSS/WeaponSys.css";
import "@/CSS/icons.css"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
