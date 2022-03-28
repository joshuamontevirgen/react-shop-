import { setCookie } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";

export function handleLogout(setAuthenticated, setUsername, setJwtToken) {
  setAuthenticated(false);
  setCookie(COOKIE_JWT_TOKEN_NAME, "", -5);
  localStorage.setItem("email", "");
  setUsername("");
  setJwtToken("");
}
