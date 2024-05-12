import { auth } from "../FireBase/FirebaseProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth.currentUser?.email);

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
    </div>
  );
}
