"use client";

export default function Home() {
  return (
    <div>
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
                <a
                  className="flexCenterAll"
                  href={"https://map2.lostcausenetwork.com"}
                  target={"_blank"}
                >
                  Map
                </a>
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
              <div className="bluemapContainer">
                <a
                  className="flexCenterAll"
                  href={"https://map1.lostcausenetwork.com"}
                  target={"_blank"}
                >
                  Map
                </a>
              </div>
              <img
                className="serverImage serverImageLink button noDrag"
                src="/VH3.jpg"
                alt=""
                onClick={() => {
                  window.open("https://vaulthunters.gg/", "_blank");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
