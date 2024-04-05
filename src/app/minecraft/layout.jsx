import { Inter } from "next/font/google";
import "@/CSS/globals.css";
import "@/CSS/mainpage.css";
import "@/CSS/icons.css";
import "@/CSS/minecraftpage.css";

export const metadata = {
  title: 'LCN | Minecraft',
  description: 'Lost Cause Network Minecraft servers'
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
