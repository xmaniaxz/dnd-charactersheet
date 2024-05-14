"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/CSS/loginpage.module.css";
import { AppwriteException } from "node-appwrite";
import {
  LoginUser,
  Registeruser,
  GetLoggedInUser,
} from "@/utils/node-appwrite";
import PopUp from "@/components/dndSheet/popup";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isTryingtoRegister, setIsTryingtoRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const IsLoggedIn = async () => {
    try {
      const res = await GetLoggedInUser();
      if (res) {
        redirectTo("D&D/homepage");
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    IsLoggedIn();
  }, []);

  async function handleLogin() {
    try {
      setLoading(true);
      await LoginUser(email, password);
      setPassword("");
      IsLoggedIn();
      setLoading(false);
    } catch (e) {
      if (e instanceof AppwriteException) {
        console.log(e.type);
        switch (e.type) {
          case "user_invalid_credentials":
            setErrorMessage("Invalid username or password");
            break;
          case "general_argument_invalid":
            setErrorMessage("Invalid Email adress");
            break;
          default:
            setErrorMessage("Something went wrong, Try again");
            break;
        }
      } else {
        setErrorMessage(e);
      }
    }
  }

  async function handleRegister() {
    try {
      if (!isTryingtoRegister) {
        setIsTryingtoRegister(true);
        return;
      }
      setLoading(true);
      await Registeruser(email, password, username);
      setPassword("");
      setLoading(false);
      IsLoggedIn();
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  }

  const redirectTo = (path) => {
    router.replace(path);
  };

  return (
    <div className="w-screen h-[100vh]">
      <h3
        className="homeButton button shadow"
        onClick={() => {
          router.replace("/");
        }}
      >
        LCN
      </h3>
      <PopUp />
      <div className={`${styles.background}`}></div>
      <div className={`${styles.container}`}>
        <div className={`${styles.loginContainer}`}>
          <div className="logo" />
          <div className={`${styles.inputContainer}`}>
            <input
              className={`${styles.inputField} ${styles.visibility} ${
                isTryingtoRegister ? styles.visible : ""
              }`}
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <input
              className={`${styles.inputField}`}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              className={`${styles.inputField}`}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={`text-[red]`}>{errorMessage}</p>
          <div className={`${styles.buttonContainer}`}>
            <button
              className={`${styles.loginButton}`}
              onClick={() => handleLogin()}
              type="submit"
            >
              Login
            </button>
            <button
              className={`${styles.registerButton}`}
              onClick={() => handleRegister()}
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
