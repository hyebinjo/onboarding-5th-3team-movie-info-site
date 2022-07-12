import React, { useEffect } from 'react';
import { useMovieModel } from '../models/useMovieModel';  
import Contents from '../component/Container';
import AccessUserDB from "../models/AccessUserDB";
import { getLoggedInUser, saveToken } from "../utils/useAccount";



export default function Main() {
  const { movies, getMovies } = useMovieModel();
const favorites = loggedInUser?.favorites;

  useEffect(() => {
    getMovies();
  }, []);
  
  const updateFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
      const index = favorites.indexOf(movieId);
      favorites.splice(index, 1);
    } else {
      favorites.push(movieId);
    }
    AccessUserDB.updateUser(`${id}`, {
      favorites: favorites,
    });
    saveToken({ ...loggedInUser, favorites: favorites });
  };


  return <Contents movies={movies} />;
}
