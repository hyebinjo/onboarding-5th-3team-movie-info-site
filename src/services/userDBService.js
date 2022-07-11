import axios from "axios";
import { HttpRequest } from "../http/httpRequest";
import { USER_DB_BASE_URL } from "../const/consts.js";

export const userService = axios.create({
  baseURL: USER_DB_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const userDBService = new HttpRequest(userService);
