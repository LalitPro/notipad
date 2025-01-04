import React, { createContext, useEffect, useState } from "react";
import { db, auth } from "../firebase"; // Ensure Firebase Auth is configured
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchNotes(currentUser.uid);
      } else {
        setUser(null);
        setNotes([]); // Clear notes if no user is logged in
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch notes for the authenticated user
  const fetchNotes = async (uid) => {
    if (!uid) return;

    try {
      const notesQuery = query(
        collection(db, "notes"),
        where("uid", "==", uid)
      );
      const notesSnapshot = await getDocs(notesQuery);
      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesList);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Save a note (update)
  const handleNoteSave = async (id, text) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, { note: text });
      console.log("Note updated successfully");
      if (user) fetchNotes(user.uid); // Refresh user-specific notes
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Add a new note
  const handleAddNote = async (title, text) => {
    if (!user) return;

    try {
      const newNote = { title, note: text, uid: user.uid }; // Associate note with user ID
      const docRef = await addDoc(collection(db, "notes"), newNote);
      console.log("Note added with ID:", docRef.id);
      fetchNotes(user.uid);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await deleteDoc(noteDoc);
      console.log("Note deleted successfully");
      if (user) fetchNotes(user.uid); // Refresh user-specific notes
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        handleNoteSave,
        handleAddNote,
        handleDeleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
