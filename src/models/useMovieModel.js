import { useState } from "react";
import { movieDataService } from "../services/movieDataService";

export const useMovieModel = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  const getMoviesCallback = (response) => {
    response.data.page === 1 ? setMovies(response.data?.results) : setMovies([...movies, ...response.data?.results]);
    return response;
  };
  const getMovieByIdCallback = (response) => {
    setMovie(response.data);
    return response;
  };

  const getMovies = (pageNo = 1) => {
    return movieDataService.get(`/movie/popular?page=${pageNo}`, (response) => {
      getMoviesCallback(response);
    });
  };

  const getMovieById = async (id) => {
    return movieDataService.get(`/movie/${id}`, getMovieByIdCallback);
  };

  const getMoviesByIds = async (ids) => {
    const promises = ids.map(
      (id) =>
        new Promise(async (resolve, reject) => {
          const results = await movieDataService.get(`/movie/${id}`);
          resolve(results.data);
        })
    );
    Promise.all(promises).then((results) => {
      setMovies(results);
      return this;
    });
  };

  const searchMovies = (keyword = null, pageNo = 1) => {
    if (keyword === null) return;
    return movieDataService.get(`/search/movie?query=${keyword}&page=${pageNo}`, (response) => {
      getMoviesCallback(response);
    });
  };

  return {
    movie,
    movies,
    getMovies,
    getMovieById,
    getMoviesByIds,
    searchMovies,
  };
};
