import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMovieModel } from "../models/useMovieModel";
import { ReactComponent as Plus } from "../images/icons/plus-svgrepo-com.svg";
import { ReactComponent as Close } from "../images/icons/x-svgrepo-com.svg";
import { getLoggedInUser, saveToken } from "../utils/useAccount";
import AccessUserDB from "../models/AccessUserDB";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Card({ movieId, closeAction, favorite, setFavorite }) {
  const { movie, getMovieById } = useMovieModel();
  const [marked, setMarked] = useState(favorite);
  const loggedInUser = getLoggedInUser();
  const id = loggedInUser?.id;
  const favorites = loggedInUser?.favorites;
  const [isImageReady, setIsImageReady] = useState(false);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    getMovieById(movieId);
  }, [id]);

  const closeCard = () => closeAction();

  const toggleFavorite = (movieId) => {
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

  return (
    <Container onClick={(e) => e.target === e.currentTarget && closeCard()}>
      <Modal isImageReady={isImageReady}>
        {imageLoadFailed ? (
          ""
        ) : (
          <Image
            src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`}
            alt="movie image"
            onError={() => {
              setImageLoadFailed(true);
              setIsImageReady(true);
            }}
            onLoad={() => setIsImageReady(true)}
          />
        )}
        <MovieInfo>
          {id && (
            <PlusButtonWrapper
              onClick={() => {
                toggleFavorite(movieId);
                setMarked((prev) => !prev);
                setFavorite((prev) => !prev);
              }}
              marked={marked}
            >
              <Plus />
            </PlusButtonWrapper>
          )}
          <H1>{movie?.original_title}</H1>
          <H2>{movie?.tagline}</H2>
          <Tag>{movie?.status === "Released" ? new Date(movie?.release_date).getFullYear() : "unreleased"}</Tag>
          <Tag>{movie?.runtime}분</Tag>
          {movie?.genres.map((gnere) => (
            <Tag>{gnere.name}</Tag>
          ))}
          <Description>{movie?.overview}</Description>
          <p>국가 : {movie?.production_countries.map((country) => country.name).join(", ")}</p>
          <p>제작 : {movie?.production_companies.map((company) => company.name).join(", ")}</p>
        </MovieInfo>
        <CloseButtonWrapper onClick={closeCard}>
          <Close />
        </CloseButtonWrapper>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const Modal = styled.div`
  display: ${({ isImageReady }) => (isImageReady ? "block" : "none")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  max-width: 700px;
  background-color: #262633;
  color: white;
  &::-webkit-scrollbar {
    float: right;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
  }
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
  z-index: 100;
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
