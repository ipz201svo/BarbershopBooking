import Cookies from "js-cookie";

const setAuth = (token: string) => {
  Cookies.set("token", token);
}

const getAuth = () => Cookies.get("token") || null;

export {setAuth, getAuth};