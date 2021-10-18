import React from "react";
import styled from "styled-components";

const Input = styled.input`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #333740;
  color: #d4af37;
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
color: #d4af37;
`;
const Container = styled.div`
display: flex;
margin: 0 auto;
margin-top: 10vh;`;
type props = {
  setCallId: Function;
  isApproved: Boolean;
  answerOffer: Function;
  setShowModal: Function;
};
export const AnswerInput = ({
  setCallId,
  isApproved,
  answerOffer,
  setShowModal,
}: props) => {
  return (
    <Container >
      <Input
        placeholder="Join call with code"
        onChange={(e) => {
          setCallId(e.target.value);
        }}
      />
      <Button onClick={() => (isApproved ? answerOffer() : setShowModal(true))}>
        Answer
      </Button>
    </Container >
  );
};
