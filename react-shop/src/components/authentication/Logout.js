import { setCookie } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";

export function handleLogout(
  dispatch,
  setAuthenticated,
  setUsername,
  setJwtToken
) {
  dispatch(setAuthenticated(false));
  setCookie(COOKIE_JWT_TOKEN_NAME, "", -5);
  localStorage.setItem("email", "");
  dispatch(setUsername(""));
  dispatch(setJwtToken(""));
}
