import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import Note from "./Pages/Note";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { NotesContext } from "./Contexts/NotesProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./Components/Auth";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { user, setUser } = useContext(NotesContext);
  return (
    <div className="flex flex-col min-h-screen bg-cover bg-gradient-to-b from-gray-900 to-black">
      <BrowserRouter>
        {" "}
        <Header user={user} />
        <Routes>
          <Route path="/login" element={<Auth setUser={setUser} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage user={user} />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/me"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/notes/:id"
            element={
              <ProtectedRoute>
                <Note />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>{" "}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
