import React from "react";
import { GoogleAuthProvider } from "@firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../fireBaseConfig";
import { initializeApp } from "@firebase/app";
import styled from "styled-components";


const Button = styled.button`
    color: white;
    background-color: #363333;
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
initializeApp(firebaseConfig);
export function SignIn() {
    const signInWithGoggle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    };
    return <Button onClick={signInWithGoggle}>Sign in with Goggle</Button>;
  }