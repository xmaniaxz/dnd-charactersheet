"use client"
import React, { useEffect, useState } from "react";
import { subscribe, unsubscribe } from "@/utils/events";

export default function PopUp() {
  const [variables, setVariables] = useState({
    width: "600px",
    height: "60px",
    position: "fixed",
    backgroundColor: "black",
    text: "",
    textColor: "white",
    top: "",
    left: "",
    right: "",
    bottom: "",
    visibility: false,
    animate: true,
    delay: 2000,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVariables({ ...variables, visibility: false });
    }, variables.delay);

    return () => clearTimeout(timer);
  }, [variables.delay, variables.visibility]);

  useEffect(() => {
    const showEvent = (event) => {
      const customData = event.detail;
      setVariables({ ...variables, ...customData });
    };

    subscribe("ShowPopUp", showEvent);
    return () => {
      unsubscribe("ShowPopUp", showEvent); // Unsubscribe when component unmounts
    };
  }, [variables]);

  return (
    <div
      style={{
        position: variables.position,
        width: variables.width,
        height: variables.height,
        background: variables.backgroundColor,
        top: variables.top,
        left: variables.left,
        right: variables.right,
        bottom: variables.bottom,
        opacity: variables.visibility ? 1 : 0,
        transform: variables.visibility ? "translateY(0%)" : "translateY(-100%)",
      }}
      className="PopUpContainer"
    >
      <p style={{ color: variables.textColor }}>{variables.text}</p>
    </div>
  );
}
