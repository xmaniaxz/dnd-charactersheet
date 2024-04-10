import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'D&DCMT | Home',
  description: 'D&D Character Management Tool Login page'
};

export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <div className={`${inter.className}`}>
        {children}
      </div>
    </div>
  );
}
