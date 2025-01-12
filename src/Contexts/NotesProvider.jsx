import React, { createContext, useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null) {
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

  // Fetch a public note by its ID
  const fetchPublicNote = async (id) => {
    try {
      const noteDoc = doc(db, "notes", id);
      const noteSnap = await getDoc(noteDoc);
      if (noteSnap.exists()) {
        return { id: noteSnap.id, ...noteSnap.data() }; // Include userId in data
      }
    } catch (error) {
      console.error("Error fetching public note:", error);
    }
    return null;
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
      const newNote = { title, note: text, uid: user.uid, isPublic: false }; // Default: not public
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

  // Toggle public visibility of a note
  const toggleNotePublic = async (id, isPublic) => {
    try {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, { isPublic });
      console.log(
        `Note visibility updated to ${isPublic ? "Public" : "Private"}`
      );
      if (user) fetchNotes(user.uid); // Refresh notes
    } catch (error) {
      console.error("Error updating note visibility:", error);
    }
  };

  const handleTitleSave = async (id, newTitle) => {
    if (!id || typeof id !== "string") {
      console.error("Invalid note ID:", id);
      return;
    }
    try {
      const noteDoc = doc(db, "notes", id);
      await updateDoc(noteDoc, { title: newTitle });
      console.log("Note title updated successfully");
      fetchNotes(); // Refresh notes to reflect changes
    } catch (error) {
      console.error("Error updating note title:", error);
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
        toggleNotePublic,
        handleTitleSave,
        fetchPublicNote,
        user,
        setUser,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
