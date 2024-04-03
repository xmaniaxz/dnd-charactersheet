"use client";

export default function Home() {
  return (
    <div>
      <header className="header">
        <ul className="navbar">
          <li className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                window.location.href = "/minecraft";
              }}
            >
              Minecraft
            </button>
          </li>
          <li className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                window.location.href = "/D&D";
              }}
            >
              D&D character tool

            </button>
          </li>
          <li className="navbarOption">
            <button
              className="navbarButton"
              onClick={() => {
                window.location.href = "/portfolio";
              }}
            >
              Portfolio
            </button>
          </li>
        </ul>
      </header>
      <main></main>
      <footer>
        <p>©2024 LostCausenetwork</p>
      </footer>
    </div>
  );
}
