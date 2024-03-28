import { Inter } from 'next/font/google';
import styles from '@/CSS/homepage.module.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'D&DCMT | Home',
  description: 'D&D Character Management Tool Login page'
};

export default function RootLayout({ children }) {
  return (
    <div className={styles.html} lang="en">
      <div className={`${styles.body} ${inter}`}>
        {children}
      </div>
    </div>
  );
}
