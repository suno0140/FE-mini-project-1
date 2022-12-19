import axios from "axios";

export const DB = process.env.REACT_APP_SERVER;

export const axiosDB = axios.create({
  baseURL: DB,
  headers: {},
});