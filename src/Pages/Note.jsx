import React, { useContext, useState, useEffect } from "react";
import { BiSave } from "react-icons/bi";
import { MdDeleteForever, MdNotes } from "react-icons/md";
import { useParams } from "react-router";
import { NotesContext } from "../Contexts/NotesProvider";
import Toolbar from "../Components/Toolbar";

function Note() {
  const { id: idURL } = useParams();
  const {
    notes,
    handleNoteSave,
    handleTitleSave,
    toggleNotePublic,
    handleDeleteNote,
    fetchPublicNote,
    userId,
  } = useContext(NotesContext);

  const noteIndex = notes.findIndex((note) => note.id === idURL);
  const [noteData, setNoteData] = useState(
    noteIndex !== -1 ? notes[noteIndex] : null
  );
  const [title, setTitle] = useState(noteData?.title || "");
  const [text, setText] = useState(noteData?.note || "");
  const [isPublicNote, setIsPublicNote] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(noteIndex === -1);

  useEffect(() => {
    const fetchNote = async () => {
      if (noteIndex === -1) {
        setLoading(true);
        const publicNote = await fetchPublicNote(idURL);
        if (publicNote) {
          setNoteData(publicNote);
          setTitle(publicNote.title);
          setText(publicNote.note);
          setIsPublicNote(true);
          setIsOwner(publicNote.userId === userId);
        }
        setLoading(false);
      } else {
        setIsOwner(notes[noteIndex].userId === userId);
      }
    };
    fetchNote();
  }, [idURL, noteIndex, fetchPublicNote, userId, notes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
        <div className="p-8 rounded-lg bg-black/50 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold animate-pulse">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!noteData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
        <div className="p-8 rounded-lg bg-black/50 backdrop-blur-sm">
          <h1 className="text-2xl font-semibold">Note not found</h1>
        </div>
      </div>
    );
  }

  const { id } = noteData;

  const addText = (textToAdd) => {
    setText((prevText) => prevText + " " + textToAdd);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white bg-gradient-to-br from-gray-900 to-black sm:p-6">
      <div className="flex items-center justify-between p-4 rounded-lg bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <MdNotes className="text-5xl font-semibold text-blue-400" />
          <input
            type="text"
            value={title}
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl font-semibold transition-colors bg-transparent border-b-2 outline-none max-w-60 border-blue-400/30 focus:border-blue-400"
            readOnly={!isOwner}
          />
        </div>
        {isOwner && (
          <div className="flex gap-4 text-4xl">
            <BiSave
              className="p-2 duration-200 rounded-full hover:bg-blue-500/20 hover:text-blue-400 hover:scale-110"
              onClick={() => {
                handleNoteSave(id, text);
                handleTitleSave(id, title);
              }}
            />
            <MdDeleteForever
              className="p-2 duration-200 rounded-full hover:bg-red-500/20 hover:text-red-400 hover:scale-110"
              onClick={() => handleDeleteNote(id)}
            />
          </div>
        )}
      </div>
      {isOwner && (
        <Toolbar
          text={text}
          noteId={id}
          toggleNotePublic={toggleNotePublic}
          addText={addText}
        />
      )}
      <div className="flex-1 mt-6">
        <textarea
          value={text}
          placeholder="Write your Notes here..."
          onChange={(event) => setText(event.target.value)}
          className="w-full h-full p-6 transition-colors border-2 outline-none resize-none bg-black/40 backdrop-blur-sm border-blue-400/30 rounded-xl focus:border-blue-400"
          readOnly={!isOwner}
          style={{ minHeight: "calc(100vh - 300px)" }}
        ></textarea>
      </div>
    </div>
  );
}

export default Note;
