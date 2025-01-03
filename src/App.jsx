import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import Note from "./Pages/Note";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import NotesProvider from "./Contexts/NotesProvider";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NotesProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>

          <Route path="/notes/:id" element={<Note />}></Route>
        </Routes>
      </NotesProvider>
      <Footer />
    </div>
  );
}

export default App;
