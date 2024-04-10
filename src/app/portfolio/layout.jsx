import { Inter } from "next/font/google";
import "@/CSS/globals.css";
import "@/CSS/mainpage.css";
import "@/CSS/icons.css";
import "@/CSS/portfolio.css";

export const metadata = {
  title: "LCN | Minecraft",
  description: "Lost Cause Network Minecraft servers",
};

const inter = Inter({ subsets: ["latin"] });

export default function Home({ children }) {
  return (
    <div lang="en">
      <div className={`${inter}`}>
        {children}
      </div>
    </div>
  );
}
