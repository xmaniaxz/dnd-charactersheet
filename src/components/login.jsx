"use client";
import { useEffect, useState } from "react";
import { account } from "@/utils/appwrite";
import {useRouter } from "next/navigation";
import { ID } from "appwrite";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const IsLoggedIn = async () => {
    try {
      var res = await account.get();
      if(res)
      {
        console.log(res)
        redirectTo("./homepage");
      }
      
    } catch (e) {
      console.log("IsLogged In: " + e);
    }
  };

  async function handleLogin() {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      setPassword("");
      setLoading(false);
      IsLoggedIn();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function handleRegister() {
    try {
      setLoading(true);
      await account.create(ID.unique(), email, password);
      setPassword("");
      setLoading(false);
      IsLoggedIn();
      // Redirect to the desired page after successful login
      redirectTo("./characterpage");
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
    <div className="flex h-screen justify-center items-center">
      <div className="text-black bg-white p-8 rounded shadow-md h-82 w-96">
        <h1 className="text-3xl font-semibold mb-4">Login</h1>
        <form>
          {/* email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center items-center">
            {/* Login Button with Spinner */}
            <button
              type="button"
              onClick={handleLogin}
              className={`relative bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading && (
                <div className="spinner absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-300 border-r-0 border-b-0 border-l-0"></div>
                </div>
              )}
              {loading ? "Loading..." : "Login"}
            </button>
            {/* Register button */}
            <button
              type="button"
              onClick={handleRegister}
              className={`relative ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading && (
                <div className="spinner absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-300 border-r-0 border-b-0 border-l-0"></div>
                </div>
              )}
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
