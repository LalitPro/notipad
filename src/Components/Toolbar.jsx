import React from "react";
import { IoClipboardOutline, IoCopyOutline, IoReload } from "react-icons/io5";

function Toolbar({ text, addText }) {
  return (
    <div className="flex gap-5 px-20 py-4 text-3xl border-2 mt-7 border-zinc-50">
      <a href="">
        <IoReload className="duration-100 hover:scale-125" />
      </a>
      <IoCopyOutline
        onClick={navigator.clipboard.writeText(text)}
        className="duration-100 hover:scale-125"
      />
      <IoClipboardOutline
        onClick={() => {
          navigator.clipboard.readText().then((response) => {
            addText(response);
          });
        }}
        className="duration-100 hover:scale-125"
      />
    </div>
  );
}

export default Toolbar;
