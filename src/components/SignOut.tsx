import React from "react";
import { getAuth } from "firebase/auth";
import styled from "styled-components";

const Button = styled.button`
  color: white;
  background-color: #fb0948;
  cursor: pointer;
  border-radius: 1rem;
  margin-right: 2rem;
  padding: 1rem;
  text-align: center;
  display: inline-block;
  font-size: 1.25rem;
  border: none;
  text-decoration: none;
  font-family: "Montserrat";
`;

const auth = getAuth();

export function SignOut() {
  return (
    auth.currentUser && <Button onClick={() => auth.signOut()}>Sign out</Button>
  );
}
