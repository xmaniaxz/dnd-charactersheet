"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState([{}]);

  const HandleClick = (name) => {
    setActive((prevActive) => ({
      ...prevActive,
      [name]: !prevActive[name]
    }));
  };
  return (
    <div className="background h-full">
      <h3
        className="homeButton button"
        onClick={() => {
          router.replace("/");
        }}
      >
        LCN
      </h3>
      <header className="header flexCenterAll">
        <h1>Portfolio</h1>
      </header>
      <div className="">
        <div className="works">
          <h1 className="underline text-center">things i've worked on</h1>
          <div
            className={`workContainer ${
              active.VodafoneZiggo ? "" : "collapsed"
            }`}
          >
            <div
              className="flex flex-row button"
              onClick={() => HandleClick("VodafoneZiggo")}
            >
              <h2>VodafoneZiggo (Project 404)</h2>
              <span
                className={`Icon transition ${
                  active.VodafoneZiggo ? "rotated" : ""
                }`}
              >
                expand_more
              </span>
            </div>
            <br />
            <p>
              I created a virtual museum for VodafoneZiggo, Intern, where
              colleagues could retrieve information or listen to radio or
              podcasts.
              <br />
              <br />
              This project exists mainly out of Unity's WebGL pipeline and C#
              scripts.
              <br />
              It also uses Unity's version control system and has a backend
              system that uses PHP.
              <br />
              <br />
              I mainly dealt with making the museum interactive and
              user-friendly, while also making sure the connection to the
              backend was working properly. The project uses JSON to send over
              the data from the frontend to the backend and vice versa. The
              project itself was basically my first experience where I had to
              both make the 3D assets as well and the logic behind it.
              <br />I spent 8 months on this project and learned a lot from it,
              for instance, the need to load in audio files after initializing
              the scene and the limitations of WebGL.
            </p>
            <br />
            <button
              className="worksGoToButton button"
              onClick={() => {
                window.open("/portfolio/vodafoneziggo", "_blank");
              }}
            >
              Take a look around
            </button>
            <br />
            <br />
            <h6 className="text-[red]">
              warning: this is a big project and might take a while to load the first time.
            </h6>
            <br />
            <img
                  src="/github-white.svg"
                  alt="github logo"
                  width={50}
                  className="shadow noDrag hoverImage button"
                  onClick={() => {
                    window.open(
                      "https://github.com/xmaniaxz/Project404",
                      "_blank"
                    );
                  }}
                />
          </div>
          <div
            className={`workContainer ${
              active.LostCauseNetwork ? "" : "collapsed"
            }`}
          >
            <div
              className="flex flex-row button"
              onClick={() => HandleClick("LostCauseNetwork")}
            >
              <h2>Lost Cause Network (LCN)</h2>
              <span
                className={`Icon transition ${
                  active.LostCauseNetwork ? "rotated" : ""
                }`}
              >
                expand_more
              </span>
            </div>
            <br />
            <div>
              <p>
                This is the project I am currently working on. It consists of
                multiple pages created for my community as well as for my
                personal use.
                <br />
                <br />
                The pages that are currently available are the home page, the
                portfolio page,
                <br />
                the Dungeons and dragons character management tool and a
                minecraft page that is used for my minecraft servers.
                <br />
                <br />
                Right now this page is still in development and will be updated
                regularly.
                <br />
                <br />
                <img
                  src="/github-white.svg"
                  alt="github logo"
                  width={50}
                  className="shadow noDrag hoverImage button"
                  onClick={() => {
                    window.open(
                      "https://github.com/xmaniaxz/dnd-charactersheet",
                      "_blank"
                    );
                  }}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="profileContainer">
          <img className="ProfilePic" src="/Foto.jpg" alt="" />
          <div className="p-[15px]">
            <h3>About me:</h3>
            <br />
            <p>
              Wesley (22) is a broad-minded man who is always busy providing the
              right solution for your problems. He is a great lover of music.
              <br />
              <br />
              He also speaks Dutch and English fluently and has interesting
              hobbies such as bowling, coding, and gaming. He has experience in
              Game development, Software development, and Backoffice & customer
              service. For example, he created a virtual museum for
              VodafoneZiggo, Intern, where colleagues could retrieve information
              or listen to radio or podcasts. Currently, Wesley is looking for a
              fun challenge in the IT world. A position as a developer
              (front-end, back-end & full-stack) appeals to him a lot. In
              addition, he is also open to other challenges.
              <br />
              <br />
              Wesley absorbs knowledge that he lacks like a sponge. Are you
              interested? Lets get in touch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
