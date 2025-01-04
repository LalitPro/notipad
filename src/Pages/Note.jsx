import React, { useContext, useState } from "react";
import { BiSave } from "react-icons/bi";
import { MdDeleteForever, MdNotes } from "react-icons/md";
import { useParams } from "react-router";
import { NotesContext } from "../Contexts/NotesProvider";
import Toolbar from "../Components/Toolbar";

function Note() {
  const idURL = useParams().id;

  const { notes, handleNoteSave, handleDeleteNote } = useContext(NotesContext);

  const noteIndex = notes.findIndex((note) => note.id === idURL);

  if (noteIndex === -1 || !notes[noteIndex]) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <h1 className="text-xl">Note not found</h1>
      </div>
    );
  }
  const { note, title, id } = notes[noteIndex];
  const [text, setText] = useState(note);

  const addText = (textToAdd) => {
    setText((prevText) => prevText + " " + textToAdd);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white bg-black sm:p-6">
      <div className="flex justify-between">
        <div className="flex gap-4 text-5xl font-semibold">
          <MdNotes />
          <h1>{title}</h1>
        </div>
        <div className="flex gap-4 text-5xl">
          <BiSave
            className="duration-75 hover:scale-110"
            onClick={() => {
              handleNoteSave(id, text);
            }}
          />
          <MdDeleteForever
            className="duration-75 hover:scale-110"
            onClick={() => handleDeleteNote(id)}
          />
        </div>
      </div>
      <Toolbar text={text} addText={addText} />
      <div>
        <textarea
          value={text}
          placeholder="Write your Notes here..."
          onChange={(event) => setText(event.target.value)}
          className="w-full min-h-screen p-3 my-10 bg-black border-2 outline-none rounded-xl"
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
