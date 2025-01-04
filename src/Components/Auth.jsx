import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
        setUser({ email, password, name });
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setError("Logged in successfully!");
        setUser({ email, password, name });
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg bg-black/40 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-blue-400">
          {isNewUser ? "Create Account" : "Welcome Back"}
        </h1>

        <div className="space-y-4">
          {isNewUser && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              className="w-full px-4 py-3 transition-colors border-2 rounded-lg outline-none bg-black/40 border-blue-400/30 focus:border-blue-400"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            className="w-full px-4 py-3 transition-colors border-2 rounded-lg outline-none bg-black/40 border-blue-400/30 focus:border-blue-400"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-3 transition-colors border-2 rounded-lg outline-none bg-black/40 border-blue-400/30 focus:border-blue-400"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={handleAuth}
            className="w-full py-3 text-lg font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            {isNewUser ? "Sign Up" : "Log In"}
          </button>

          <button
            onClick={() => setIsNewUser(!isNewUser)}
            className="w-full py-2 text-sm transition-colors border-2 rounded-lg border-blue-400/30 hover:border-blue-400"
          >
            {isNewUser
              ? "Already have an account? Log In"
              : "Need an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
