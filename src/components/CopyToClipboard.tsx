import React from "react";
import { useState } from "react";
import styled from "styled-components";
type props = {
  copyText: string;
};

const Input = styled.input`
font-size: 1rem;
font-weight: bold;
padding: 0.5rem;
border-radius: 0.5rem;
background: #333740;
color: #d4af37;
`;
const Container = styled.div`
display: flex;
flex-direction: row;
width: 100%;
height: 100%

`;

const Button = styled.button`
cursor: pointer;
font-size: 1rem;
font-weight: bold;
text-decoration: none;
padding: 0.5rem;
margin-left: 5px;
border: 0;
text-transform: uppercase;
border-radius: 0.5rem;
background: #333740;
font-family: "Montserrat";
`;

const Span = styled.span`
color: #FFFFFF;`;

const OkSpan = styled.span`
color: #00A300;
`;

export const ClipboardCopy = ({ copyText }: props) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
      return await navigator.clipboard.writeText(text);
  }

  const handleCopyClick = () => {
   
    copyTextToClipboard(copyText)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Input type="text" value={copyText} readOnly />
      <Button onClick={handleCopyClick}>
        <Span>{isCopied ? <OkSpan>Copied!</OkSpan> : "Copy"}</Span>
      </Button>
    </Container>
  );
};
