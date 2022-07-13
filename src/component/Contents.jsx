import React from "react";
import styled from "styled-components";
import { getLoggedInUser } from "../utils/useAccount";
import Thumbnail from "./Thumbnail";

const Contents = ({ movies }) => {
  const loggedInUser = getLoggedInUser();
  const favorites = loggedInUser?.favorites;
  const checkFavorites = (movieId) => {
    return !!favorites?.find((favorite) => favorite === movieId);
  };

  return (
    <Container>
      {movies?.length ? (
        movies.map((movie) => {
          return <Thumbnail key={movie.id} movie={movie} isFavorite={checkFavorites(movie.id)} />;
        })
      ) : (
        <p>영화 목록이 없습니다</p>
      )}
    </Container>
  );
};

export default Contents;

const Container = styled.div`
  min-height: 78%;
  padding: 0 2rem;
  gap: 2rem;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
