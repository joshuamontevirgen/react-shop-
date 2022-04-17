import { setCookie, getCookieValue } from "../../helpers/cookies";
import { COOKIE_JWT_TOKEN_NAME } from "../../constants";

export function getToken() {
  return getCookieValue(COOKIE_JWT_TOKEN_NAME);
}
