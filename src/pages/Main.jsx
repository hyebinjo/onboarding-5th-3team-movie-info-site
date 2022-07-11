import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useMovieModel } from "../models/useMovieModel";
import Thumbnail from "../component/Thumbnail";
import { useState } from "react";
import Card from "../component/Card";
import AccessUserDB from "../models/AccessUserDB";
import { getLoggedInUser, saveToken } from "../utils/useAccount";

export default function Main() {
  const { movies, getMovies, searchMovies } = useMovieModel();
  const { movieTitle } = useParams();
  const [card, setCard] = useState(false);
  const loggedInUser = getLoggedInUser();
  const favorites = loggedInUser?.favorites;

  useEffect(() => {
    if (movieTitle) {
      searchMovies(movieTitle);
    }
  }, [movieTitle]);

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
    AccessUserDB.updateUser(`users/${loggedInUser.id}`, {
      favorites: favorites,
    });
    saveToken({ ...loggedInUser, favorites: favorites });
  };

  return (
    <Container className="Container">
      <Contents className="Contents">
        {movies ? movies.results?.map((movie) => <Thumbnail key={movie.id} movie={movie} setCard={setCard} />) : <p>영화 목록이 없습니다</p>}
        {card && <Card movieId={card} closeAction={() => setCard(false)} toggleFavorite={updateFavorite} />}
      </Contents>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: red;
`;
export const Contents = styled.div`
  overflow-y: scroll;
  padding: 0 2rem;
  gap: 2rem;
  height: 100%;
  padding-top: 80px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
