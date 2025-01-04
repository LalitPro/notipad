import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

function NotePreview({ note, handleDeleteNote }) {
  return (
    <div className="flex items-center justify-between p-3 duration-100 bg-black bg-opacity-50 border-2 border-white rounded-lg bg-gradient-to-b from-gray-900 to-black hover:scale-110 sm:p-4">
      <Link to={"/notes/" + note.id} className="text-base italic sm:text-lg">
        {note.title}
      </Link>
      <button className="text-2xl text-red-500">
        <MdDeleteForever
          onClick={() => {
            handleDeleteNote(note.id);
          }}
        />
      </button>
    </div>
  );
}

export default NotePreview;
