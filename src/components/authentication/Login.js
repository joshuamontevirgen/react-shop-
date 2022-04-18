import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME, API_URL } from "../../constants";
import { Link } from "react-router-dom";
import {
  setAuthenticated,
  setUsername,
  setJwtToken,
} from "./authenticationSlice";

//todo -  refresh, access token
//https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf?rq=1
//https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await loginUser({ Email: email, Password: password });
    if (user.token) {
      dispatch(setAuthenticated(true));
      dispatch(setUsername(email));
      dispatch(setJwtToken(user.token));
      localStorage.setItem("email", email);
      document.cookie = setCookie(COOKIE_JWT_TOKEN_NAME, user.token, 5);
      navigate("/home");
    } else {
      alert("wrong username/password");
    }
  };

  async function loginUser(credentials) {
    return fetch(API_URL + "/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  }

  return (
    <div className="items-stretch justify-center flex item-center ">
      <div className="w-full max-w-xs ">
        <form
          className="bg-white shadow1 rounded px-8 pt-6 pb-8 mt-20"
          onSubmit={handleLogin}
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className=" font-light shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700  mb-2" htmlFor="password">
              Password
            </label>
            <input
              className=" font-light shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="px-3 py-1 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline text-light text-sm text-blue-500 hover:text-blue-800"
              to="/register"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
