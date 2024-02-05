import { Inter } from 'next/font/google'
import styles from '@/app/homepage/homepage.module.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'D&DMCT',
  description: 'D&D Character Management Tool'
}

export default function RootLayout({ children }) {
  return (
    <html className={styles.html} lang="en">
      <body className={styles.body+inter}>{children}</body>
    </html>
  )
}
