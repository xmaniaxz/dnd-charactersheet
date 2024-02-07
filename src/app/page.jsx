import LoginPage from "@/components/login";

export const metadata = {
    title: 'D&DMCT | Login',
    description: 'D&D Character Management Tool Login page'
  }

export default function Home(){
    return(
        <main>
            <LoginPage/>
        </main>
    )
}