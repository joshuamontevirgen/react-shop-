import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCookie, getCookieValue } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";
import {
  setAuthenticated,
  setJwtToken,
  setUsername,
} from "./authenticationSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => {
    return state.authentication.authenticated;
  });

  const logout = () => {
    dispatch(setAuthenticated(false));
  };

  useEffect(() => {
    var email = localStorage.getItem("email");
    var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);

    if (token) {
      dispatch(setAuthenticated(true));
      dispatch(setUsername(email));
      dispatch(setJwtToken(token));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setCookie(COOKIE_JWT_TOKEN_NAME, "", -5);
      localStorage.setItem("email", "");
      dispatch(setUsername(""));
      dispatch(setJwtToken(""));
    }
  }, [isAuthenticated]);
  return [isAuthenticated, logout];
}
