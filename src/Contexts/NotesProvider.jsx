import React, { createContext, useEffect, useState } from "react";

export const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes.filter((value) => value != null))
    );
  }, [notes]);

  const handleNoteSave = (id, text) => {
    notes.map((note, index) => {
      if (note.id == id) {
        notes[index].note = text;
        const newNotes = notes;
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(notes[index]);
      }
    });
  };

  const handleDeleteNote = (id) => {
    notes.map((note, index) => {
      if (note.id == id) {
        delete notes[index];
        const newNotes = notes.filter((value) => value != null);
        setNotes(newNotes);
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    });
  };

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, handleDeleteNote, handleNoteSave }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
