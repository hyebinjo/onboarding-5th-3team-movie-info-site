import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../component/LoginForm";
import { getLoggedInUser } from "../utils/useAccount";

function Login() {
  const navigate = useNavigate();

  const token = getLoggedInUser();
  useEffect(() => {
    if (token) navigate("/");
  }, []);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
