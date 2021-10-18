import React from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";

const Nav = styled.header`
  width: 100%;
  height: 10vh;
  min-height: 50px;
  background-color: #333740;
  top: 0;
  left: 0;
  height: 10vh;
  color: white;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DisplayName = styled.h3`
  margin-left: 2rem;
  padding: 1rem;
  font-size: 2rem;
  color: #d4af37;
`;
type Props = {
  children: JSX.Element;
};

export const NavBar = ({ children }: Props) => {
  const auth = getAuth();
  const name = auth.currentUser?.displayName;
  return (
    <Nav>
      <DisplayName> {name}</DisplayName>
      {children}
    </Nav>
  );
};
