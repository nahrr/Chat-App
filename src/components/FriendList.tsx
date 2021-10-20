import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

export const FriendList = () => {
  const [name, setName] = useState<string>("");

  const addFriend = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const photoURL = auth.currentUser?.photoURL;
    const uid = auth.currentUser?.uid;
    //if (formValue.length >= 1) {
    await addDoc(collection(db, "friendList"), {
      text: name,
      uid,
      createdAt: serverTimestamp(),
      
    });
    // }
    // setFormValue("");
  };
  return (
    <form onSubmit={addFriend}>
      <label htmlFor="friend">
        <input
          placeholder="Write your message..."
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          name="friend"
        />
      </label>
    </form>
  );
};
