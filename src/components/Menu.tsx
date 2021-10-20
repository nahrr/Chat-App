import React, { Fragment } from "react";
import styled from "styled-components";
import CallIcon from "@material-ui/icons/Call";
import PhoneCallBackIcon from "@material-ui/icons/PhoneCallback";

const Container = styled.div``;

const SharedButton = styled.button`
  width: 25%;
  cursor: pointer;
  font-size: 1.25rem;
  text-decoration: none;
  padding: 1rem;
  border-radius: 1rem;
  border: 0;
  text-transform: uppercase;
  margin: 50px auto 50px auto;
  font-family: "Montserrat";
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const CallButton = styled(SharedButton)`
  background: #333740;
  color: #aa8c2c;
`;

const EndCallButton = styled(SharedButton)`
  background: #333740;
  color: #7f6921;
`;

// const Content = styled.span`
//   margin-right: 50px;
//   padding: 0.5rem;
//   font-size: 1.25rem;
//   font-weight: bold;

// `;

type props = {
  setMode: Function;
  setShowModal: Function;
  mode: string;
};
export const Menu = ({ setMode, setShowModal, mode }: props) => {
  return (
    <Fragment>
      {mode === "" && (
        <Container>
          <CallButton
            onClick={() => {
              setMode("call");
              setShowModal(true);
            }}
          >
            <CallIcon
              style={{
                color: "#00A300",
              }}
            />
            <span>Call</span>
          </CallButton>
          <EndCallButton
            onClick={() => {
              setMode("answer");
              setShowModal(true);
            }}
          >
            <PhoneCallBackIcon
              style={{
                color: "#00A300",
              }}
            />
            <span>Answer</span>
          </EndCallButton>
        </Container>
      )}
    </Fragment>
  );
};
