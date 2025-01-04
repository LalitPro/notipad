import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-5 my-auto mt-10 text-white">
      <h1>{isNewUser ? "Sign Up" : "Log In"}</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="bg-zinc-900"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        className="bg-zinc-900"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isNewUser ? "Sign Up" : "Log In"}</button>
      <button onClick={() => setIsNewUser(!isNewUser)}>
        Switch to {isNewUser ? "Log In" : "Sign Up"}
      </button>
    </div>
  );
};

export default Auth;
