import React from "react";
import { Link } from "react-router-dom";
import { PopupCart } from "../cart/PopupCart";
import { useAuth } from "../authentication/useAuth";
import "./styles.css";

const Navbar = () => {
  const [isAuthenticated, logout] = useAuth();
  return (
    <>
      <nav
        className="fixed w-full top-0 bg-white px-2 px-4 py-2.5 rounded border-b "
        style={{ zIndex: 999 }}
      >
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
                    onClick={() => logout()}
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
