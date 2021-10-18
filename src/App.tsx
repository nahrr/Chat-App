import React, { Fragment } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { SignIn } from "./components/SignIn";
import { ChatRoom } from "./components/ChatRoom";
import GlobalStyle from "./styles/global";
import { NavBar } from "./components/NavBar";
import { SignOut } from "./components/SignOut";
import { Empty } from "./components/Empty";
import GlobalFonts from './fonts/fonts';

const auth = getAuth();

const Section = styled.section`
  display: flex;
  @media (max-width: 728px) {
    flex-direction: column;
  }
`;

function App() {
  const [user] = useAuthState(auth);
  return (
    <Fragment>
      <GlobalFonts />
      <GlobalStyle />
      <NavBar>{user ? <SignOut /> : <SignIn />}</NavBar>
      <Section>{user ? <ChatRoom /> : <Empty />}</Section>
    </Fragment>
  );
}

export default App;
