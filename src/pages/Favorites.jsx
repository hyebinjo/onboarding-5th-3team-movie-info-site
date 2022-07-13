import React, { useEffect } from "react";
import { useMovieModel } from "../models/useMovieModel";
import { getLoggedInUser } from "../utils/useAccount";
import Contents from "../component/Contents";
import Footer from "../component/Footer";

export default function Favorites() {
  const loggedInUser = getLoggedInUser();
  const { getMoviesByIds, movies } = useMovieModel();
  const { favorites } = loggedInUser;

  useEffect(() => {
    getMoviesByIds(favorites);
  }, []);

  return (
    <>
      <Contents movies={movies} />
      <Footer />
    </>
  );
}
