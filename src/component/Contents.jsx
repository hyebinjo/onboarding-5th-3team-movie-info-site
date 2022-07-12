import React from "react";
import styled from "styled-components";
import Card from "../component/Card";

export default function Contents({ moviesToShow }) {
  return <Container className="Contents">{moviesToShow ? moviesToShow.map((movie) => <Card key={movie.id} movie={movie} />) : <p>영화 목록이 없습니다</p>}</Container>;
}

const Container = styled.body`
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
