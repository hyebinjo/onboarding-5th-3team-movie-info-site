import axios from "axios";
import { HttpRequest } from "../http/httpRequest";
import { TMDB_BASE_URL, API_KEY } from "../const/consts.js";

export const movieService = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
});

export const movieDataService = new HttpRequest(movieService);
