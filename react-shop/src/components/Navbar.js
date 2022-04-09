import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";
import { handleLogout as hl } from "./authentication/Logout";
import { Cart } from "../cart/Cart";
const Navbar = () => {
  const { isAuthenticated, setAuthenticated, setUsername, setJwtToken } =
    useAppContext();

  const handleLogout = () => {
    hl(setAuthenticated, setUsername, setJwtToken);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <a className="navbar-brand" href="#">
        shop
      </a>

      <ul className="navbar-nav ">
        <li className="nav-item ">
          <Link className="nav-item nav-link" to="/">
            Home <span className="sr-only">(current)</span>
          </Link>
        </li>

        {isAuthenticated && (
          <li className="nav-item ">
            <Link className="nav-item nav-link" to="/profile">
              Profile <span className="sr-only">(current)</span>
            </Link>
          </li>
        )}

        <li className="nav-item">
          {isAuthenticated ? (
            <Link
              className="nav-item nav-link"
              onClick={handleLogout}
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <Link className="nav-item nav-link" to="/login">
              Login
            </Link>
          )}
        </li>
      </ul>

      <ul className="navbar-nav  ml-auto ">
        <li>
          {" "}
          <Cart className="" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
