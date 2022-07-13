import React from "react";
import styled from "styled-components";

export default function Footer() {
  return <Container>2022 © Wanted Pre-onboarding Frontend Team #3. All Rights Reserved.</Container>;
}

const Container = styled.footer`
  margin-top: 50px;
  width: 100%;
  height: 15%;
  border-top: 2px #ffffff solid;
  padding: 15px;
  color: #ffffff;
  box-sizing: border-box;
`;
