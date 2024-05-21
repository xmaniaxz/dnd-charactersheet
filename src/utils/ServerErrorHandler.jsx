"use client";
import { publish } from "@/utils/events";

export async function ErrorHandler(request) {
  if (request.error) {
    if (request.function === "LoginUser" || request.function === "Registeruser") {
      return request;
    }
    publish("ShowPopUp", {
              text: JSON.stringify(request.error),
              visibility: true,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              top: "10px",
              right: "20px",
            });
    return null;
  } else {
    return request;
  }
}