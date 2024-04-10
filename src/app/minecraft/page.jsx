"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h3 className="homeButton button" onClick={()=>{router.replace("/")}}>LCN</h3>
      <header className="header flexCenterAll">  
        <h1>Welcome to the server page</h1>
      </header>
      <div className="fadeLine" />
      <div className="flexCenterHorizontal w-[100%] p-[20px]">
        <div className="">
          <h2>Server Information</h2>
          <p>
            Here you can find information about the servers that are currently
            running on the Lost Cause Network
          </p>
          <div className="serversContainer">
            <div className="serverDetails">
              <h2>Lost Cause Network SMP</h2>
              <br />
              <p>
                The SMP server is a survival server based on the Hermitcraft 10
                season.
              </p>
              <div className="bluemapContainer flexCenterAll">
                <div
                  className="flexCenterAll button"
                  onClick={() => {router.push("https://map2.lostcausenetwork.com", "_blank")}}
                >
                  Map
                </div>
              </div>
              <img
                className="serverImage noDrag"
                src="/SMP.png"
                alt=""

              />
            </div>

            <div className="serverDetails">
              <h2>Lost Cause Network Vaulthunters 3</h2>
              <br />
              <p>
                The Vaulthunters 3 server is a modded server based on the
                Iskall85's modpack.
              </p>
              <div className="bluemapContainer flexCenterAll button">
                <div
                  onClick={() => {router.push("https://map1.lostcausenetwork.com", "_blank")}}
                >
                  Map
                </div>
              </div>
              <img
                className="serverImage serverImageLink button noDrag"
                src="/VH3.jpg"
                alt=""
                onClick={() => {router.push("https://vaulthunters.gg/", "_blank")}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
