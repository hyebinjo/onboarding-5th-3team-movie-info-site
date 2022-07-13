import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { ReactComponent as FavoriteIco } from "../images/icons/favorite-svgrepo-com.svg";
export default function Thumbnail({ movie, updateFavorite, isFavorite }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const [card, setCard] = useState(false);
  const [favorited, setFavorited] = useState();
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  const handleThumbnailClick = (movieId) => {
    setCard(movieId);
  };
  useEffect(() => {
    setFavorited(isFavorite);
  }, []);
  return (
    <>
      <ThumbnailContainer onClick={() => handleThumbnailClick(movie.id)}>
        <DarkVeil movieTitle={movie.title} />
        {imageLoadFailed ? <div> {movie.title}</div> : <Poster alt="poster" src={`${IMAGE_BASE_URL}${movie.poster_path}`} onError={() => setImageLoadFailed(true)} />}
        {favorited && <FavoriteIco />}
      </ThumbnailContainer>
      {card && <Card movieId={card} closeAction={() => setCard(false)} favorite={isFavorite} setFavorite={setFavorited} toggleFavorite={updateFavorite} />}
    </>
  );
}

const ThumbnailContainer = styled.li`
  position: relative;
  width: 200px;
  height: 400px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: all 0.25s ease-out;

  &:hover {
    transform: scale(1.05);
  }
  svg {
    position: absolute;
    width: 50px;
    height: 50px;
    fill: yellow;
    stroke: gray;
    right: 0.4rem;
  }
`;

const DarkVeil = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  z-index: 1;
  &:hover {
    background-color: rgb(0, 0, 0, 0.7);
  }
  transition: all 0.25s;
  &:hover {
    &:before {
      content: "${(props) => props.movieTitle}";
      width: 100%;
      text-align: center;
      position: absolute;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0);
      color: rgba(255, 255, 255, 1);
      word-wrap: break-word;
      font-size: 1.5rem;
      font-weight: bold;

      transition: all 0.25s;
    }
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
