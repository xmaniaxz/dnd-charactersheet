import { CharacterInfoProvider } from "@/components/dndSheet/characterinfocontext";;
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "D&DCMT | Sheet",
  description: "D&D Character Management Tool",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <div className={`${inter}`}>
        <CharacterInfoProvider>
          {children}
        </CharacterInfoProvider>
      </div>
    </div>
  );
}
