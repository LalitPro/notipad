import React from "react";

function Footer() {
  return (
    <div className="flex items-center justify-end px-5 py-2 font-medium bg-black border-t-2 text-zinc-200">
      <p>
        Made by{" "}
        <a className="text-white" href="https://lalitweb.netlify.app">
          Lalit Yadav
        </a>
      </p>
    </div>
  );
}

export default Footer;
