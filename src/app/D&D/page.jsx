import LoginPage from "@/components/dndSheet/login";

export const metadata = {
    title: 'D&DCMT | Login',
    description: 'D&D Character Management Tool Login page'
  }

export default function Home(){
    return(
        <div>
            <LoginPage/>
        </div>
    )
}