import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 30px;
  background-color: #333740;
  z-index: 1000;
  
`;

const Title = styled.h3`
  margin: 0;
  font-weight: bold;
  font-size: 1.25rem;
  color: #d4af37;
`;

const Modal = styled.div`
  display: flex;
  margin-top: 40px;
`;

const SharedButton = styled.button`
  margin: auto auto;
  cursor: pointer;
  font-size: 0.75rem;
  text-decoration: none;
  display: flex;
  justify-items: center;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 1rem;
  border: 0;
  text-transform: uppercase;
  font-family: "Montserrat";
`;
const OkButton = styled(SharedButton)`
background-color: #00A300;
font-weight: bold;
color: #FFFFFF;
`;
const CancelButton = styled(SharedButton)`
background-color: #fb0948;
font-weight: bold;
color: #FFFFFF;
`;

type props = {
  setHardwareAccess: Function;
  showModal: Function;
  setIsApproved: Function;
  createOffer: Function;
};
export const ConfirmModal = ({ setHardwareAccess, showModal, setIsApproved, createOffer }: props) => {
  return (
    <ModalContainer>
        <Title>Do you agree to start your camera and microphone?</Title>
        <Modal>
          <CancelButton
            onClick={() => {
              showModal(false);
              setIsApproved(false);
            }}
          >
            Cancel
          </CancelButton>
          <OkButton
            onClick={() => {
              showModal(false);
              setIsApproved(true);
              createOffer();
            }}
          >
            OK
          </OkButton>
        </Modal>
    </ModalContainer>
  );
};
