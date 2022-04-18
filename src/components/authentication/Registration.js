import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME, API_URL } from "../../constants";
import {
  setAuthenticated,
  setUsername,
  setJwtToken,
} from "./authenticationSlice";

//todo -  refresh, access token
//https://stackoverflow.com/questions/27067251/where-to-store-jwt-in-browser-how-to-protect-against-csrf?rq=1
//https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id

export default function Registration() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useDispatch();

  function validateForm() {
    var isValid = true;
    if (!(email.length > 0 && password.length > 0)) {
      isValid = false;
    }

    return isValid;
  }

  useEffect(() => {
    if (password && confirmPassword) {
      password !== confirmPassword
        ? setConfirmPasswordError("Password does not match")
        : setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!confirmPasswordError) {
      const response = await registerUser({ Email: email, Password: password });
      alert(response.message);
      if (response.success) {
        navigate("/login");
      } else {
      }
    }
  };

  async function registerUser(credentials) {
    return fetch(API_URL + "/api/register", {
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
          onSubmit={handleRegister}
        >
          <div className="mb-4">
            <label className="block text-gray-700  mb-2" htmlFor="email">
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
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none font-light border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                confirmPasswordError && "border-red-700"
              }`}
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******************"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700  mb-2"
              htmlFor="ConfirmPassword"
            >
              Confirm Password
            </label>
            <input
              className={`shadow appearance-none font-light border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline ${
                confirmPasswordError && "border-red-700"
              }`}
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="******************"
              required
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-xs italic">
                Password does not match.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="px-3 py-1 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
