import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCookie, getCookieValue } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";
import {
  setAuthenticated,
  setJwtToken,
  setUsername,
} from "./authenticationSlice";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

export function useToken() {
  const isAuthenticated = useSelector((state) => {
    return state.authentication.authenticated;
  });

  const [token, setToken] = useState();

  useEffect(() => {
    var token = getCookieValue(COOKIE_JWT_TOKEN_NAME);
    setToken(token);
  }, [isAuthenticated]);

  return [token];
}
