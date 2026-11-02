export function getJWT() {
  let token = "";
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    let splittedCookie = cookie.split("=");
    if (splittedCookie[0] === "token") {
      token = splittedCookie[1];
    }
  });
  return token;
}