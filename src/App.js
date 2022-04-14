import React, { Component, useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/authentication/Login";
import Profile from "./components/profile/index";
import { getCookieValue } from "./helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "./constants";
import { Index as Catalog } from "./components/catalog/index";

import { useDispatch, useSelector } from "react-redux";
import {
  setAuthenticated,
  setJwtToken,
  setUsername,
} from "./components/authentication/authenticationSlice";

import { SideCart } from "./components/cart/SideCart";

export default function App() {
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const ref = useRef();

  const isAuthenticated = useSelector((state) => {
    return state.authentication.authenticated;
  });

  const disabled = useSelector((state) => {
    return state.app.disable;
  });

  const PrivateRoute = () => {
    if (isLoading) {
      return null;
    } else {
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }
  };

  function pageClick() {
    ref.current.onPageClick();
  }

  useEffect(() => {
    var email = localStorage.getItem("email");
    var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);

    if (token) {
      dispatch(setAuthenticated(true));
      dispatch(setUsername(email));
      dispatch(setJwtToken(token));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setUsername(""));
      dispatch(setJwtToken(""));
    }
    setLoading(false);
  });

  return (
    <>
      <SideCart ref={ref} />
      <div
        onClick={pageClick}
        className={disabled ? "disable-clicks active" : "disable-clicks"}
      ></div>
      <BrowserRouter>
        <div id="App" className={disabled ? "disable" : ""}>
          <Navbar />
          <div id="main-container" className="">
            <Routes>
              <Route exact path="/home" element={<Catalog />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile" element={<PrivateRoute />}>
                <Route exact path="/profile" element={<Profile />} />
              </Route>
              <Route exact path="/catalog/" element={<Catalog />}>
                <Route
                  exact
                  path=":category/:subcategory"
                  element={<Catalog />}
                />
                <Route path=":category" element={<Catalog />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

//https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
//https://www.nicknish.co/blog/react-router-authenticated-routes
//privateroute - https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
