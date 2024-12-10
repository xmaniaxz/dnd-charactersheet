"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import LanguagePopup from "@/components/languagePopup";
export default function Home() {
  const router = useRouter();
  const [active, setActive] = useState([{}]);
  const logoHeight = 40;

  const HandleClick = (name) => {
    setActive((prevActive) => ({
      ...prevActive,
      [name]: !prevActive[name],
    }));
  };

  const icons = [
    ["Html5.svg", "Html5"],
    ["Css3.svg", "Css3"],
    ["Javascript.svg", "JavaScript"],
    ["React.svg", "React"],
    ["NextJS.svg", "Next.js"],
    ["Blender.svg", "Blender"],
    ["ObjectOrientedProgramming.svg", "OOP (Object Oriented Programming)"],
    ["Unity.svg", "Unity"],
    ["C-sharp.svg", "C#"],
    ["Php.svg", "PHP"],
    ["Github.svg", "GitHub"],
    ["Python.svg", "Python"],
  ];

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
          <h1 className="underline text-center">Things I've worked on</h1>
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
              <div className="w-[40%] flex no-wrap gap-[20px] items-center">
                <LanguagePopup icon={icons[7][0]} iconName={icons[7][1]} />
                <LanguagePopup icon={icons[8][0]} iconName={icons[8][1]} />
                <LanguagePopup icon={icons[5][0]} iconName={icons[5][1]} />
                <LanguagePopup icon={icons[6][0]} iconName={icons[6][1]} />
              </div>
            </div>

            <br />
            <div className="content">
              <p>
                I created a virtual museum for VodafoneZiggo, internally, where
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
                <br />I spent 8 months on this project and learned a lot from
                it, for instance, the need to load in audio files after
                initializing the scene and the limitations of WebGL.
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
                warning: this is a big project and might take a while to load
                the first time.
              </h6>
              <br />
              <Image
                src="/icons/Github.svg"
                alt="github logo"
                height={logoHeight}
                width={logoHeight}
                className="noDrag hoverImage button invertColor"
                onClick={() => {
                  window.open(
                    "https://github.com/xmaniaxz/Project404",
                    "_blank"
                  );
                }}
              />
            </div>
          </div>

          {/* LOSTCAUSENETWORK */}

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
              <div className="w-[50%] flex no-wrap gap-[20px] items-center">
                <LanguagePopup icon={icons[0][0]} iconName={icons[0][1]} />
                <LanguagePopup icon={icons[1][0]} iconName={icons[1][1]} />
                <LanguagePopup icon={icons[2][0]} iconName={icons[2][1]} />
                <LanguagePopup icon={icons[3][0]} iconName={icons[3][1]} />
                <LanguagePopup icon={icons[4][0]} iconName={icons[4][1]} />
              </div>
            </div>
            <br />
            <div className="content">
              <p>
                This is the project I am currently working on. It consists of
                multiple pages created for my community as well as for my
                personal use.
                <br />
                <br />
                The pages that are currently available are the homepage, the
                portfolio page,
                <br />
                The Dungeons and Dragons Character Management Tool and a
                minecraft page that is used for my minecraft servers.
                <br />
                <br />
                Right now this page is still in development and will be updated
                regularly.
                <br />
                <br />
                <Image
                  src="/icons/Github.svg"
                  alt="github logo"
                  height={logoHeight}
                  width={logoHeight}
                  className="noDrag hoverImage button invertColor"
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

          {/* DND */}
          <div className={`workContainer ${active.DNDMT ? "" : "collapsed"}`}>
            <div
              className="flex flex-row button"
              onClick={() => HandleClick("DNDMT")}
            >
              <h2>D&D character tool</h2>
              <span
                className={`Icon transition ${active.DNDMT ? "rotated" : ""}`}
              >
                expand_more
              </span>
              <div className="w-[50%] flex no-wrap gap-[20px] items-center">
                <LanguagePopup icon={icons[0][0]} iconName={icons[0][1]} />
                <LanguagePopup icon={icons[1][0]} iconName={icons[1][1]} />
                <LanguagePopup icon={icons[2][0]} iconName={icons[2][1]} />
                <LanguagePopup icon={icons[3][0]} iconName={icons[3][1]} />
                <LanguagePopup icon={icons[4][0]} iconName={icons[4][1]} />
                <LanguagePopup icon={icons[6][0]} iconName={icons[6][1]} />
              </div>
            </div>
            <br />
            <div className="content">
              <p>
                This project is made within the same workspace as the LCN
                project. The reason why i am mentioning this project is because
                it is a project that took a lot of time and effort. Reason for
                this is because it is a project that makes use of a lot of
                different systems and techniques.
                <br />
                <br />
                Currently the tool consists of these features:
              </p>
              <ul className="list-circle">
                <li>User authentication</li>
                <li>Character management</li>
                <li>Character creation</li>
                <li>API for all 580 spells</li>
                <li>SaveSystem for charactersheet</li>
                <li>Automatic skill calculation</li>
                <li>A modern looking character sheet</li>
                <li>Responsive design</li>
                <li>Ability for users to upload their own character logo's</li>
              </ul>
              <br />
              <p>
                The tool itself was made over the course of 8 months on and off
                where the last 5 months I have spent almost full-time on this
                project, while also learning how to use Next.js and Appwrite
                <br />
                <br />
                The characterpage has all basic features but there are plans to
                add more to it in the future. There are also plans to make a
                Dungeon Master Portal where players and DM can join a team and
                share information about the game.
                <br />
                <br />
                <Image
                  src="/icons/Github.svg"
                  alt="github logo"
                  height={logoHeight}
                  width={logoHeight}
                  className="noDrag hoverImage button invertColor"
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

          {/* WoonFriesland Discord bot */}
          <div className={`workContainer ${active.WFBot ? "" : "collapsed"}`}>
            <div
              className="flex flex-row button"
              onClick={() => HandleClick("WFBot")}
            >
              <h2>WoonFriesland Discord bot</h2>
              <span
                className={`Icon transition ${active.WFBot ? "rotated" : ""}`}
              >
                expand_more
              </span>
              <div className="w-[50%] flex no-wrap gap-[20px] items-center">
                <LanguagePopup icon={icons[8][0]} iconName={icons[8][1]} />
                <LanguagePopup icon={icons[6][0]} iconName={icons[6][1]} />
              </div>
            </div>
            <br />
            <div className="content">
              <p>
                This project is a discord bot that was made to check every
                couple of minutes to check if there were any new houses
                available on the WoonFriesland website.
                <br />
                <br />
                Once it found a new house, it would post it to a discord channel
                where it would put a link to the website. This way it would be
                easier to find a house.
              </p>
              <div>
                <p>
                  <br />
                  <Image
                    src="/icons/Github.svg"
                    alt="github logo"
                    height={logoHeight}
                    width={logoHeight}
                    className="noDrag hoverImage button invertColor"
                    onClick={() => {
                      window.open(
                        "https://github.com/xmaniaxz/WoonFrieslandUpdate",
                        "_blank"
                      );
                    }}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* <h1 className="underline text-center">Things I'm working on</h1> */}
        </div>
        <div className="rightInfoContainer">
          <div className="profileContainer">
            <Image
              className="ProfilePic"
              src="/Foto.jpg"
              height={500}
              width={500}
              alt=""
            />
            <div className="content"></div>
            <div className="p-[15px]">
              <h3>About me:</h3>
              <br />
              <p>
                Wesley (23) is a broad-minded man who is always busy providing
                the right solution for your problems. He is a great lover of
                music.
                <br />
                <br />
                He also speaks Dutch and English fluently and has interesting
                hobbies such as bowling, coding, and gaming. He has experience
                in Game development, Software development, and Backoffice &
                customer service. For example, he created a virtual museum for
                VodafoneZiggo, Intern, where colleagues could retrieve
                information or listen to radio or podcasts. Currently, Wesley is
                looking for a fun challenge in the IT world. A position as a
                developer (front-end, back-end & full-stack) appeals to him a
                lot. In addition, he is also open to other challenges.
                <br />
                <br />
                Wesley absorbs knowledge that he lacks like a sponge. Are you
                interested? Let's get in touch!
              </p>
            </div>
          </div>
          <div className="logoContainer">
            <h3 className="text-center">Proficiencies</h3>
            <br />
            <div className="insetContainer">
              {icons.map((icons, index) => {
                return (
                  <LanguagePopup
                    icon={icons[0]}
                    iconName={icons[1]}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
