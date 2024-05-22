"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Client, Storage } from "appwrite";

export default function Home() {
  const router = useRouter();

  const downloadFile = async (fileId) => {
    const client = new Client();
    const storage = new Storage(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
      .setProject(process.env.NEXT_PUBLIC_PROJECT_ID); // Your project ID

    const result = storage.getFileDownload(
      process.env.NEXT_PUBLIC_WORLD_STORAGE,
      fileId
    );
    // console.log(result.href);
    window.open(result.href); // Resource URL
  };

  return (
    <div>
      <h3
        className="homeButton button"
        onClick={() => {
          router.replace("/");
        }}
      >
        LCN
      </h3>
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
                  onClick={() => {
                    router.push("https://map2.lostcausenetwork.com", "_blank");
                  }}
                >
                  Map
                </div>
              </div>
              <Image
                className="serverImage noDrag"
                src="/SMP.png"
                alt=""
                width={100}
                height={100}
              />
            </div>

            <div className="serverDetails">
              <h2>
                <s>Lost Cause Network Vaulthunters 3</s>{" "}
                <b className="text-[red]">Closed</b>
              </h2>
              <br />
              <p>
                The Vaulthunters 3 server is a modded server based on the
                Iskall85's modpack.
              </p>
              <div className="worldDownload flexCenterAll">
                <div
                  className="flexCenterAll button"
                  onClick={() => downloadFile("664dfbbf6b74a086ac89")}
                >
                  <p>Download World (1.68GB)</p>
                </div>
              </div>
              <div className="bluemapContainer flexCenterAll button">
                <div
                  onClick={() => {
                    router.push("https://map1.lostcausenetwork.com", "_blank");
                  }}
                >
                  Map
                </div>
              </div>
              <Image
                className="serverImage serverImageLink button noDrag"
                src="/VH3.jpg"
                alt=""
                onClick={() => {
                  router.push("https://vaulthunters.gg/", "_blank");
                }}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
