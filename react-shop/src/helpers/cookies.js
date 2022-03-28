export function setCookie(c_name, c_value, exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  document.cookie =
    encodeURIComponent(c_name) +
    "=" +
    encodeURIComponent(c_value) +
    (!exdays ? "" : "; expires=" + exdate.toUTCString());
}

export const getCookieValue = (name) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";
