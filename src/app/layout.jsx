import { Inter } from "next/font/google";
import "@/CSS/globals.css";
import "@/CSS/mainpage.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: 'LostCausenetwork',
  description: 'D&D Character Management Tool Login page'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.ico" sizes="any" />
        <link rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
