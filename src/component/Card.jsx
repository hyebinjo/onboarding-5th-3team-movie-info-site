import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMovieModel } from "../models/useMovieModel";
import { ReactComponent as Plus } from "../images/icons/plus-svgrepo-com.svg";
import { ReactComponent as Close } from "../images/icons/x-svgrepo-com.svg";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Card({ movieId, closeAction, favorite, toggleFavorite }) {
  const { movie, getMovieById } = useMovieModel();
  const [marked, setMarked] = useState(favorite);

  useEffect(() => {
    getMovieById(movieId);
  }, []);

  const closeCard = () => closeAction();

  return (
    <Modal>
      <Image src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`} alt="movie image" />
      <MovieInfo>
        <PlusButtonWrapper
          onClick={() => {
            toggleFavorite(movieId);
            setMarked((prev) => !prev);
          }}
          marked={marked}
        >
          <Plus />
        </PlusButtonWrapper>
        <H1>{movie?.original_title}</H1>
        <H2>{movie?.tagline}</H2>
        <Tag>{movie?.status === "Released" ? new Date(movie?.release_date).getFullYear() : "unreleased"}</Tag>
        <Tag>{movie?.runtime}min</Tag>
        {movie?.genres.map((gnere) => (
          <Tag>{gnere.name}</Tag>
        ))}
        <Description>{movie?.overview}</Description>
        <p>Production Countries : {movie?.production_countries.map((country) => country.name).join(", ")}</p>
        <p>Production Company : {movie?.production_companies.map((company) => company.name).join(", ")}</p>
      </MovieInfo>
      <CloseButtonWrapper onClick={closeCard}>
        <Close />
      </CloseButtonWrapper>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 95vh;
  overflow-y: auto;
  max-width: 700px;
  background-color: black;
  color: white;
  z-index: 10;
`;

const Image = styled.img`
  width: 100%;
`;

const PlusButtonWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: -60px;
  background: transparent;
  svg {
    fill: ${(props) => (props.marked ? "white" : "#262633")};
    width: 50px;
    height: 50px;
  }
  cursor: pointer;
`;

const MovieInfo = styled.div`
  position: relative;
  padding: 10px;
`;

const H1 = styled.h1`
  font-size: 50px;
`;

const H2 = styled.h2`
  font-size: 25px;
  padding-left: 20px;
  margin-bottom: 8px;
`;

const Tag = styled.strong`
  margin: 5px;
  padding: 4px;
`;

const Description = styled.p`
  margin: 16px 0;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  background: transparent;
  svg {
    fill: white;
    width: 50px;
    height: 50px;
  }
  cursor: pointer;
`;
