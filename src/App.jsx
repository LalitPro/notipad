import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import Note from "./Pages/Note";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NotesProvider from "./Contexts/NotesProvider";
import ProtectedRoute from "./Components/ProtectedRoute";
import Auth from "./Components/Auth";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Auth />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
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
          </Routes>
        </BrowserRouter>
      </NotesProvider>
      <Footer />
    </div>
  );
}

export default App;
