import React, { useContext, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  MdAdd,
  MdClose,
  MdDeleteForever,
  MdDeleteOutline,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import NotePreview from "../Components/NotePreview";
import { NotesContext } from "../Contexts/NotesProvider";
import { Link } from "react-router";

function HomePage({ user }) {
  const { notes, setNotes, handleAddNote, handleDeleteNote } =
    useContext(NotesContext);

  const [addNewNotePopUp, setAddNewNotePopUp] = useState(false);

  const createNewInput = useRef();

  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen p-6 text-white sm:p-8">
      <h1 className="mb-8 text-5xl font-bold tracking-wider text-transparent transition-transform bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:text-6xl sm:mb-10 hover:scale-105">
        NOTIPAD
      </h1>

      {user && (
        <h2 className="mb-6 text-2xl font-light">
          Welcome back,{" "}
          <span className="font-semibold text-purple-400">{user.name}</span>
        </h2>
      )}

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md mb-8 overflow-hidden duration-200 bg-opacity-50 border-2 border-purple-500 bg-gradient-to-b from-gray-900 to-black rounded-xl hover:scale-105 focus-within:border-pink-500 sm:mb-10">
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Search your notes..."
          className="flex-1 px-4 py-3 text-lg text-white placeholder-gray-400 bg-transparent sm:px-5 focus:outline-none"
        />
        <button className="px-4 py-3 text-2xl text-purple-400 transition-colors hover:text-pink-500 sm:px-5">
          <CiSearch />
        </button>
      </div>

      <div className="w-full max-w-md mb-8 space-y-4 sm:space-y-5 sm:mb-10">
        {notes
          .filter((note) =>
            note.title.toLowerCase().includes(query.toLowerCase())
          )
          .map((note, index) => (
            <NotePreview
              note={note}
              handleDeleteNote={handleDeleteNote}
              key={index}
            />
          ))}
        {notes.length < 1 && (
          <p className="text-lg italic text-center text-gray-400 sm:text-xl">
            No notes found
          </p>
        )}
      </div>

      <div className="w-full max-w-md space-y-4 sm:space-y-5">
        <button
          onClick={() => {
            setAddNewNotePopUp(true);
          }}
          className="flex items-center justify-between w-full gap-5 px-6 py-3 text-lg font-medium text-white transition-all bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 sm:text-xl"
        >
          Create New Note
          <MdOutlineCreateNewFolder className="text-2xl" />
        </button>

        <div className="my-10">
          {addNewNotePopUp && (
            <div className="flex items-center w-full gap-3 p-2 overflow-hidden duration-200 bg-gray-800 bg-opacity-50 border-2 border-purple-500 bg-gradient-to-b from-gray-900 to-black rounded-xl hover:scale-105">
              <MdClose
                className="text-2xl text-gray-400 cursor-pointer hover:text-white"
                onClick={() => setAddNewNotePopUp(false)}
              />
              <input
                ref={createNewInput}
                type="text"
                placeholder="Enter note title..."
                className="flex-1 px-4 py-2 text-lg text-white placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => {
                  handleAddNote(createNewInput.current.value, "");
                  setAddNewNotePopUp(false);
                }}
                className="p-2 text-2xl text-purple-400 transition-colors rounded-lg hover:text-pink-500 hover:bg-gray-700"
              >
                <MdAdd />
              </button>
            </div>
          )}
        </div>
        {/* <Link className="flex items-center justify-center w-full gap-3 px-6 py-3 text-lg font-medium text-white transition-all bg-opacity-75 border-2 border-purple-500 bg-gradient-to-b from-gray-900 to-black rounded-xl hover:scale-105 hover:border-pink-500 sm:text-xl">
          About Notipad
        </Link> */}
      </div>
    </div>
  );
}

export default HomePage;
