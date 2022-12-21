import axios from "axios";
// import { getCookies } from "../components/LoginFrame/LoginForm";
import { getCookies } from "./cookieControler";

export const DB = process.env.REACT_APP_SERVER;


export const axiosDB = axios.create({
  baseURL: DB,
  headers: { "Access-Control-Allow-Origin": "*" },
});

// axiosDB.interceptors.request.use((config) => {
//   if (config.headers === undefined) return;
//   const token = localStorage.getItem("id");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });

axiosDB.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getCookies("id");
  config.headers["Authorization"] = `${token}`;
  return config;
});
