import LoginPage from "@/components/login";
import PopUp from "@/components/popup";

export const metadata = {
    title: 'D&DCMT | Login',
    description: 'D&D Character Management Tool Login page'
  }

export default function Home(){
    return(
        <main>
            <PopUp/>
            <LoginPage/>
        </main>
    )
}