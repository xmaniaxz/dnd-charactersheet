import { Inter } from "next/font/google";
import "@/CSS/globals.css";
import "@/CSS/charactersheet.css";
import "@/CSS/WeaponSys.css";
import "@/CSS/icons.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "D&DCMT | Login",
  description: "D&D Character Management Tool Login page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
