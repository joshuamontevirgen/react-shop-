import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout as hl } from "../authentication/Logout";
import { PopupCart } from "../cart/PopupCart";
import "./styles.css";

import {
  setAuthenticated,
  setUsername,
  setJwtToken,
} from "../authentication/authenticationSlice";
const Navbar = () => {
  const isAuthenticated = useSelector((state) => {
    return state.authentication.authenticated;
  });
  const dispatch = useDispatch();
  const handleLogout = () => {
    hl(dispatch, setAuthenticated, setUsername, setJwtToken);
  };

  return (
    <>
      <nav className="fixed w-full top-0 bg-white px-2 px-4 py-2.5 rounded border-b ">
        <div className="container flex flex-nowrap justify-between items-center mx-auto">
          <a className="" href="#">
            shop
          </a>

          <div className="font-light ">
            <ul className="flex items-center justify-end">
              <li className="">
                <Link className="block py-1 px-3 hover:font-normal" to="/home">
                  Home
                </Link>
              </li>

              {isAuthenticated && (
                <li className="">
                  <Link
                    className="block py-1 px-3 hover:font-normal"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
              )}

              <li className="">
                {isAuthenticated ? (
                  <Link
                    className="block py-1 px-3 hover:font-normal"
                    onClick={handleLogout}
                    to="/login"
                  >
                    Logout
                  </Link>
                ) : (
                  <Link
                    className="block py-1 px-3 hover:font-normal"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
              <li className="block py-1 px-3 ">
                <PopupCart />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
