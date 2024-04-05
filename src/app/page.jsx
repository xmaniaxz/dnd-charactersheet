"use client";

export default function Home() {
  return (
    <div>
      <header className="header">
        <div className="navbar">
          <div className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                window.location.href = "/minecraft";
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
                window.location.href = "/D&D";
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
                window.location.href = "/portfodivo";
              }}
            >
              Portfolio
            </button>
            <div className="selector" />
          </div>
        </div>
      </header>
      <div className="fadeLine" />
      <main className="content flexCenterAll">
        <div className="backgroundImage">
          <img src="/AIImage.jpg" alt="" />
        </div>
        <h1 className="title">LostCauseNetwork</h1>

      </main>
      <div className="fadeLine" />
      <footer className="footer">
        <p>©2024 LostCausenetwork</p>
      </footer>
    </div>
  );
}
