import React, { useContext, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { MdDeleteForever, MdNotes } from "react-icons/md";
import { useParams } from "react-router";
import { NotesContext } from "../Contexts/NotesProvider";
import Toolbar from "../Components/Toolbar";

function Note() {
  const idURL = +useParams().id;

  let noteIndex;
  const { notes, setNotes, handleDeleteNote, handleNoteSave } =
    useContext(NotesContext);

  notes.map((note, index) => {
    if (note.id == idURL) {
      noteIndex = index;
    } else {
      return;
    }
  });

  const { note, title, id } = notes[noteIndex];
  const [text, setText] = useState(note);

  const addText = (textToAdd) => {
    setText(text + " " + textToAdd);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white bg-black sm:p-6">
      <div className="flex justify-between">
        <div className="flex gap-4 text-5xl font-semibold ">
          <MdNotes />
          <h1>{title}</h1>
        </div>
        <div className="flex gap-4 text-5xl">
          <BiSave
            className="duration-75 hover:scale-110"
            onClick={() => {
              console.log("text is ", text);
              const textStr = text.toString();
              console.log("textStr is ", textStr);
              handleNoteSave(id, textStr);
            }}
          />
          <MdDeleteForever className="duration-75 hover:scale-110" />
        </div>
      </div>
      <Toolbar text={text} addText={addText} />
      <div>
        <textarea
          value={text}
          placeholder="Write your Notes here........"
          onInput={(event) => setText(event.target.value)}
          className="w-full min-h-screen p-3 my-10 bg-black border-2 outline-none rounded-xl md:p:7 lg:p-14"
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
