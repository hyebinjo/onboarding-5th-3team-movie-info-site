import React from "react";
import { getLoggedInUser } from "../utils/library";
import { useMovieModel } from "../models/useMovieModel";
import { useEffect } from "react";
<<<<<<< HEAD
import { useState } from "react";
import { Contents } from "../pages/Main";
import Thumbnail from "./Thumbnail";
=======
import { Contents } from "../pages/Main";
import Thumbnail from "./Thumbnail";
import styled from "styled-components";
>>>>>>> master

export default function Favorites() {
  const loggedInUser = getLoggedInUser();
  const { movies, getMoviesByIds } = useMovieModel();
  // const { favorites } = loggedInUser();

  useEffect(() => {
    getMoviesByIds(loggedInUser.favorites);
  }, []);

  // 할일: 컴포넌트 메인에서 재사용하기
  return (
    <Container className="favorites">
      {movies?.length > 0 &&
        movies?.map((movie) => (
          <>
            <Thumbnail key={movie.id} movie={movie} />
          </>
        ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;
