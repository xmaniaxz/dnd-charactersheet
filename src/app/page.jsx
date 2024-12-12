"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <header className="header">
        <h3 className="homeButton button">LCN</h3>
        <div className="navbar">
          <div className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                router.push("/minecraft")
              }}
            >
              Minecraft
            </button>
            <div className="selector" />
          </div>
          <div className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                router.push("/D&D")
              }}
            >
              D&D character tool
            </button>
            <div className="selector" />
          </div>
          <div className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                router.push("/portfolio")
              }}
            >
              Portfolio
            </button>
            <div className="selector" />
          </div>
        </div>
      </header>
      <div className="fadeLine" />
      <main className="contentBody flexCenterAll">
        <div className="backgroundImage">
          <img src="/AIImage.jpg" alt="" />
        </div>
        <h1 className="title">LostCauseNetwork</h1>

      </main>
      <div className="fadeLine" />
      <footer className="footer">
        <h6>©2024 - Lost Cause Network - @Made by Wesley Bosman</h6>
      </footer>
    </div>
  );
}
