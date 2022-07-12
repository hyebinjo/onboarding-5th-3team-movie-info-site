
import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoIco } from "../images/icons/netflix-svgrepo-com.svg";
import { useNavigate } from "react-router";
import NavigationButtons from "./NavigationButtons";
import NavigationSearch from "./NavigationSearch";

export default function Navigation({movies}) {
  const navigate = useNavigate();

  return (
    <Container>
      <Wrap>
        <LogoWrap onClick={() => navigate("/")}>
          <LogoIco />
          <span>Movie</span>
        </LogoWrap>
        <NavigationSearch movies={movies}/>
        <NavigationButtons />
      </Wrap>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  height: 70px;
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
  width: 70vw;
  margin: 0 auto;
`;
const LogoWrap = styled.div`
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