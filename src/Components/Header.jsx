import React, { useContext } from "react";
import { NotesContext } from "../Contexts/NotesProvider";
import { auth } from "../firebase"; // Import Firebase auth
import { signOut } from "firebase/auth"; // Import the signOut method
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router";

function Header({ user }) {
  console.log(user);

  const { setUser } = useContext(NotesContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user from context
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative flex items-center px-5 py-2 font-medium bg-opacity-50 border-b-2 space-between bg-gradient-to-b from-gray-900 to-black text-zinc-100">
      <Link to="/">NotesPad</Link>

      {user && (
        <div className="flex items-center gap-4">
          <Link
            to="/me"
            className="ml-4 text-3xl duration-100 hover:scale-110"
          >
            <MdAccountCircle />
          </Link>
          <button
            onClick={handleSignOut}
            className="absolute right-0 px-3 py-1 mx-4 my-1 duration-100 hover:scale-110 bg-gradient-to-b hover:bg-gradient-to-t from-blue-700 to-blue-900 rounded-xl "
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
