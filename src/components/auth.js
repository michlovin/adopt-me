import { auth, googleProvider } from "../FireBase/FirebaseProvider";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(auth?.currentUser?.email);

  return (
    <div>
      <input
        placeholder="email@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={signIn}>Sign in</button>

      <button onClick={googleSignIn}>Sign in with Google</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
