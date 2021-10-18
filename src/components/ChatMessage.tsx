import React, { useState } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
interface Dynamic {
  sent: boolean;
}
const Message = styled.div<Dynamic>`
  display: flex;
  align-items: center;
  justify-content: normal;
`;

const ChatText = styled.p<Dynamic>`
  width: 100%;
  max-width: 500px;
  margin-bottom: 12px;
  line-height: 24px;
  padding: 10px 20px;
  border-radius: 25px;
  position: relative;
  color: white;
  background: #282c34;
  align-self: ${(props) => (props.sent ? "flex-end" : "")};
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 2px 5px;
`;
const PopUp = styled.div`
  justify-content: flex-end;
`;

const auth = getAuth();
const db = getFirestore();
const removeMessage = async (id: string) => {
  await deleteDoc(doc(db, "messages", id));
};


export function ChatMessage(props: {
  message: { text: string; uid: string; photoURL: string; id: string };
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { text, uid, photoURL, id } = props.message;
  const ownMessage = uid === auth.currentUser?.uid ? true : false;

  return (
    <Message
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sent={ownMessage}
    >
      <Img src={photoURL} />
      <ChatText sent={ownMessage}>{text}</ChatText>
      {open && ownMessage && (
        <PopUp>
          <DeleteForeverIcon
            style={{ fill: "#cf5d61", cursor: "pointer" }}
            onClick={() => removeMessage(id)}
          ></DeleteForeverIcon>
        </PopUp>
      )}
    </Message>
  );
}
