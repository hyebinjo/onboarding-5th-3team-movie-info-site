import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";
import { getLoggedInUser, removeToken } from "../utils/useAccount";

export default function NavigationButtons() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const loginLocal = localStorage.getItem("wanted_movie_info_service");
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    setLoggedInUser(false);
  };

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
    if(!!loginLocal){
      setLoggedInUser(true)
    }
  }, []);
  return (
    <Container>
      {loggedInUser && (
        <>
          <Button hasShow onClick={()=>{navigate("/favorites")}}>
            <div>
              즐겨찾기
            </div>
          </Button>
          <Button hasShow onClick={logout}>
            <div>로그아웃</div>
          </Button>
        </>
      )}
      {!loggedInUser && (
        <Button hasShow>
          <Link to="/login">
            <div>
              로그인
            </div>
          </Link>
        </Button>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;
const Button = styled.button`
  display: ${(props) => (props.hasShow ? "block" : "none")};
  background-color: ${theme.backColor};
  /* border: 1px solid white; */
  border: none;
  border-radius: 6px;
  padding: 0.3rem 1rem;
  color: ${theme.fontColor};
  :hover {
    cursor: pointer;
  }
  div{
    font-size: 14px;
    font-weight: 600;
    :hover{
      color: #299da5;
    }
  }
`;
