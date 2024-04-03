"use client";
import { useEffect, useState } from "react";
import { account } from "@/utils/appwrite";
import { useRouter } from "next/navigation";
import styles from "@/CSS/loginpage.module.css";
import { AppwriteException, ID } from "appwrite";
import PopUp from "./popup";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const IsLoggedIn = async () => {
    try {
      var res = await account.get();
      if (res) {
        redirectTo("D&D/homepage");
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  async function handleLogin() {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      setPassword("");
      setLoading(false);
      IsLoggedIn();
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
        }}

        else {
          setErrorMessage(e);
      }
    }
  }

  async function handleRegister() {
    try {
      setLoading(true);
      await account.create(ID.unique(), email, password);
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

  useEffect(() => {
    IsLoggedIn();
  }, []);

  return (
    <div className="w-screen h-[100vh]">
      <PopUp/>
      <div className={`${styles.background}`}></div>
      <div className={`${styles.container}`}>
        <div className={`${styles.loginContainer}`}>
        <div className="logo"/>
          <div className={`${styles.inputContainer}`}>
            <input
              className={`${styles.inputField}`}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            >
              Login
            </button>
            <button
              className={`${styles.registerButton}`}
              onClick={() => handleRegister()}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
