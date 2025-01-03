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

function HomePage() {
  const { notes, setNotes, handleDeleteNote } = useContext(NotesContext);

  const [addNewNotePopUp, setAddNewNotePopUp] = useState(false);

  const createNewInput = useRef();

  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen p-4 text-white bg-black sm:p-6">
      <h1 className="mb-6 text-4xl font-bold sm:text-5xl sm:mb-8">NOTIPAD</h1>

      {/* Search Bar */}
      <div className="flex items-center w-full max-w-sm mb-6 overflow-hidden duration-100 border-2 border-white rounded-lg hover:scale-110 sm:mb-8">
        <input
          type="text"
          value={query}
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-3 py-2 text-white bg-black sm:px-4 sm:py-2 focus:outline-none"
        />
        <button className="px-3 py-2 text-2xl sm:px-4">
          <CiSearch />
        </button>
      </div>

      <div className="w-full max-w-sm mb-6 space-y-3 sm:space-y-4 sm:mb-8">
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
        {}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {!addNewNotePopUp && (
          <button
            onClick={() => {
              setAddNewNotePopUp(true);
            }}
            className="flex items-center justify-between w-full gap-5 px-4 py-2 text-base text-white duration-100 bg-black border-2 border-white rounded-lg hover:scale-110 sm:px-6 sm:text-lg"
          >
            Create New
            <MdOutlineCreateNewFolder className="text-2xl" />
          </button>
        )}
        <div className="my-10">
          {addNewNotePopUp && (
            <div className="flex items-center w-full max-w-sm mb-6 overflow-hidden duration-100 border-2 border-white rounded-lg hover:scale-110 sm:mb-8">
              <MdClose
                className="text-2xl"
                onClick={() => setAddNewNotePopUp(false)}
              />
              <input
                ref={createNewInput}
                type="text"
                placeholder="Write Note Title Here..."
                className="flex-1 px-3 py-2 text-white bg-black sm:px-4 sm:py-2 focus:outline-none"
              />
              <button
                onClick={() => {
                  setNotes([
                    ...notes,
                    {
                      title: createNewInput.current.value,
                      note: "",
                      id: notes.length + 1,
                    },
                  ]);
                  setAddNewNotePopUp(false);
                }}
                className="px-3 py-2 text-2xl sm:px-4"
              >
                <MdAdd />
              </button>
            </div>
          )}
        </div>
        <Link className="flex items-center w-full gap-5 px-4 py-2 text-base text-white duration-100 bg-black border-2 border-white rounded-lg hover:scale-110 sm:px-6 sm:text-lg">
          About
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
