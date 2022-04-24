import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";
import { useForm } from "../utility/useForm";

export default function Registration() {
  const navigate = useNavigate();
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isValid, setValid] = useState(false);
  const [formData, submitting, handleSubmit, handleChange] = useForm();

  useEffect(() => {
    var valid = true;
    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Password does not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
      valid = valid && true;
    }
    setValid(valid);
  }, [formData]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!confirmPasswordError) {
      const response = await registerUser({
        Email: formData.email,
        Password: formData.password,
      });
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
    <>
      <div className="items-stretch justify-center flex item-center ">
        <div className="w-full max-w-xs ">
          <form
            className="bg-white shadow1 rounded px-8 pt-6 pb-8 mt-20"
            onSubmit={(e) => {
              e.preventDefault();
              isValid && handleSubmit(e, handleRegister);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className=" font-light shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
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
                name="password"
                onChange={handleChange}
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
                name="confirmPassword"
                onChange={handleChange}
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
              <button className="px-3 py-1 text-white bg-slate-500 hover:bg-slate-700 text-sm font-light">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
