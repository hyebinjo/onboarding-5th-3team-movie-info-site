import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import NavigationButtons from "./NavigationButtons";
import NavigationSearch from "./NavigationSearch";
export default function Navigation({ movies }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrap>
        <LogoWrap onClick={() => navigate("/")}>
          <span>3ChaFlix</span>
        </LogoWrap>
        <NavigationSearch movies={movies} />
        <NavigationButtons />
      </Wrap>
    </Container>
  );
}

const Container = styled.header`
  position: sticky;
  min-height: 70px;
  height: 7%;
  width: 100%;
  background-color: #262633;
  border-bottom: 2px solid black;
  top: 0;
  z-index: 10;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 93vw;
  margin: 0 auto;
`;
const LogoWrap = styled.div`
  font-family: "Oswald", sans-serif;
  src: url("https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap");
  transition: all 400ms ease;
  cursor: pointer;
  height: 30px;
  svg {
    fill: white;
    width: 30px;
    height: 30px;
  }
  span {
    margin-left: 5px;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 4px;
  }
  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
  :hover {
    color: yellow;
    animation: blink-effect 2s ease infinite;
  }
`;
