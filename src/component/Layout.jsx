import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import styled from "styled-components";

function Layout() {
  return (
    <Container>
      <Navigation />
      <Outlet />
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  height: 100vh;
`;
