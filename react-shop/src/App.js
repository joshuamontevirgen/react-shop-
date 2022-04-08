import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import Profile from "./components/profile/index";
import { AppContext } from "./lib/contextLib";
import { getCookieValue } from "./helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "./constants";
import { Index as Catalog } from "./components/catalog/index";

import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const PrivateRoute = () => {
    if (isLoading) {
      return null;
    } else {
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    }
  };

  useEffect(() => {
    var email = localStorage.getItem("email");
    var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);

    if (token) {
      setAuthenticated(true);
      setUsername(email);
      setJwtToken(token);
    } else {
      setAuthenticated(false);
      setUsername("");
      setJwtToken("");
    }
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <AppContext.Provider
        value={{
          isAuthenticated,
          setAuthenticated,
          username,
          setUsername,
          jwtToken,
          setJwtToken,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <div id="main-container">
              <Routes>
                <Route exact path="/" element={<Catalog />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<PrivateRoute />}>
                  <Route exact path="/profile" element={<Profile />} />
                </Route>
                <Route exact path="/catalog" element={<Catalog />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AppContext.Provider>
    </Provider>
  );
}

//https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
//https://www.nicknish.co/blog/react-router-authenticated-routes
//privateroute - https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
//https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
