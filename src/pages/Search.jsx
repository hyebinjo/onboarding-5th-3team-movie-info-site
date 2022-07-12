import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieModel } from '../models/useMovieModel';

import Contents from '../component/Container';

export default function Search() {
  const { movies, searchMovies } = useMovieModel();
  const { movieTitle } = useParams();

  useEffect(() => {
    if (movieTitle) {
      searchMovies(movieTitle);
    }
  }, [movieTitle]);

  return <Contents movies={movies} />;
}
