"use client";
import { publish } from "@/utils/events";

export async function ErrorHandler(request) {
  if(!request)
    return;
  if (request.error) {
    if (request.function === "LoginUser" || request.function === "Registeruser") {
      return request;
     
    }
    publish("ShowPopUp", {
              text: request.error,
              visibility: true,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              top: "10px",
              right: "20px",
            });
    return;
  } else {
    return request;
  }
}
