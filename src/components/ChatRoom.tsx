import React, {
  Fragment,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { ChatMessage } from "./ChatMessage";
import { ConfirmModal } from "./ConfirmModal";
import { Menu } from "./Menu";
import { ClipboardCopy } from "./CopyToClipboard";
import { AnswerInput } from "./AnswerInput";
import { HangUp } from "./HangUp";
const auth = getAuth();
const db = getFirestore();

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5rem auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 728px) {
    flex-direction: column;
    width: 100%;
  }
`;

const CallContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 80vh;
  margin: 0 auto;
  @media (max-width: 728px) {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 30%;
  background: #333740;
  height: 90vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: #1e1e24;
  }
 ::-webkit-scrollbar-thumb {
    background: #0f2e6b;
  }

  @media (max-width: 728px) {
    width: 100%;
  }
`;
const Form = styled.form`
  height: 8vh;
  max-height: 8vh;
  font-size: 1.5rem;
  width: 100%;
  margin-top: auto;
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  width: 20%;
  background: rgb(58, 58, 58);
  font-size: 1.25rem;
  border: none;
  text-decoration: none;
  border-top: 1px solid black;
  border-left: 1px solid black;
`;
const Input = styled.input`
  line-height: 1.5;
  width: 100%;
  font-size: 1.5rem;
  background: rgb(58, 58, 58);
  color: white;
  outline: none;
  border: none;
  padding: 0 10px;
  border-top: 1px solid black;
`;
const ClipBoardContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 10vh;
`;
const VideoArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 728px) {
    flex-direction: column;
  }
`;

const Video = styled.video`
  border-radius: 8px;
  object-fit: cover;
  margin: 1rem auto;
  @media (max-width: 728px) {
    max-width: 25rem;
  }
`;

const VideoLocal = styled(Video)`
  width: 35rem;
  @media (max-width: 728px) {
    max-width: 20rem;
  }
`;

const VideoRemote = styled(Video)`
  width: 50rem;
  @media (max-width: 728px) {
    max-width: 25rem;
  }
`;

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export function ChatRoom() {
  const pc = new RTCPeerConnection(servers);
  let callT = "";
  const [messages, setMessages] = useState<any>();
  const [formValue, setFormValue] = useState<string>("");
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const dummy = useRef<HTMLSpanElement>(null);
  const [callId, setCallId] = useState<string>("");
  const localRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const remoteRef = useRef() as MutableRefObject<HTMLVideoElement>;

  const setHardwareAccess = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();
    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track: MediaStreamTrack) => {
      pc.addTrack(track, localStream);
    });
    // Pull tracks form remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
        remoteStream.addTrack(track);
        setMode("est");
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;
  };

  const createOffer = async () => {
    // TODO
    await setHardwareAccess();

    const callDoc = collection(db, "calls");
    /*This is my stupid workaround to get the id */
    const getIdWorkAround = "dummy";
    await addDoc(collection(db, "calls"), {
      getIdWorkAround,
    }).then(function (docRef) {
      setCallId(docRef.id);
      callT = docRef.id;
    });
    console.log(callT);
    pc.onicecandidate = (event) => {
      event.candidate &&
        addDoc(collection(db, "calls", callT, "offerCandidates"), {
          event: event.candidate.toJSON(),
        });
    };

    //Create offer
    const offerDesc = await pc.createOffer();
    await pc.setLocalDescription(offerDesc);

    const offer = {
      sdp: offerDesc.sdp,
      type: offerDesc.type,
    };
    await setDoc(doc(db, "calls", callT), {
      offer,
    });

    onSnapshot(callDoc, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let data = change.doc.data();
        let id = change.doc.id;
        if (!pc.currentRemoteDescription && data.answer && id === callT) {
          const answerDescription = new RTCSessionDescription(
            data.answer as unknown as RTCSessionDescription
          );
          pc.setRemoteDescription(answerDescription);
        }
      });
    });

    if (callT !== "") {
      // When answered, add candidate to peer connection
      onSnapshot(
        collection(db, "calls", callT, "answerCandidates"),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              let data = change.doc.data();
              const candidate = new RTCIceCandidate(data.event);
              pc.addIceCandidate(candidate);
            }
          });
        }
      );
    }
  };

  const answerOffer = async (): Promise<void> => {
    await setHardwareAccess();

    pc.onicecandidate = (event) => {
      event.candidate &&
        addDoc(collection(db, "calls", callId, "answerCandidates"), {
          event: event.candidate.toJSON(),
        });
    };

    const ref = doc(db, "calls", callId);
    const callData = await getDoc(ref);

    const offerDescription = callData.data();
    await pc.setRemoteDescription(
      new RTCSessionDescription(
        offerDescription?.offer as RTCSessionDescription
      )
    );

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    const testRef = doc(db, "calls", callId);
    updateDoc(testRef, {
      answer,
    });

    onSnapshot(
      collection(db, "calls", callId, "offerCandidates"),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data.event));
            setMode("est");
          }
        });
      }
    );
  };

  const hangUp = async () => {
    pc.close();
    window.location.reload();
  };
  const q = query(collection(db, "messages"), orderBy("createdAt"));

  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(() => {
          setMessages(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        });
      }),
    []
  );

  const sendMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    if (formValue.length >= 1) {
      await addDoc(collection(db, "messages"), {
        text: formValue,
        uid,
        createdAt: serverTimestamp(),
        photoURL,
      });
    }
    setFormValue("");
  };

  dummy.current?.scrollIntoView({ behavior: "smooth" });
  return (
    <Fragment>
      <MainContent>
        <CallContent>
          <Menu setMode={setMode} setShowModal={setShowModal} mode={mode} />

          {showModal && (
            <ConfirmModal
              setHardwareAccess={setHardwareAccess}
              showModal={setShowModal}
              setIsApproved={setIsApproved}
              createOffer={createOffer}
            />
          )}
          {mode === "call" && (
            <ClipBoardContainer>
              <ClipboardCopy copyText={callId} />
            </ClipBoardContainer>
          )}

          {mode === "answer" && (
            <AnswerInput
              setCallId={setCallId}
              isApproved={isApproved}
              answerOffer={answerOffer}
              setShowModal={setShowModal}
            />
          )}
          {mode !== "" && (
            <VideoArea>
              <VideoLocal ref={localRef} autoPlay playsInline muted />
              <VideoRemote ref={remoteRef} autoPlay playsInline />
            </VideoArea>
          )}
          {mode !== "" && <HangUp hangUp={hangUp} />}
        </CallContent>
      </MainContent>
      <Aside>
        {messages &&
          messages.map(
            (msg: {
              id: string;
              text: string;
              uid: string;
              photoURL: string;
            }) => <ChatMessage key={msg.id} message={msg} />
          )}

        <Form onSubmit={sendMessage}>
          <Input
            placeholder="Write your message..."
            value={formValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormValue(e.target.value)
            }
          />
          <Button type="submit">
            <SendIcon />
            <span ref={dummy}></span>
          </Button>
        </Form>
      </Aside>
    </Fragment>
  );
}
