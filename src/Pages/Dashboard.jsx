import React, { useState, useEffect } from "react";
import { MdEdit, MdSave } from "react-icons/md";
import { auth, db } from "../firebase"; // Make sure to configure Firebase properly
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

function Dashboard() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  useEffect(() => {
    // Load user data from Firebase
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSaveName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      console.log("Display name updated successfully");
      setEditingName(false);
    } catch (error) {
      console.error("Error updating display name:", error);
    }
  };

  const handleSaveEmail = async () => {
    try {
      await updateEmail(auth.currentUser, email);
      console.log("Email updated successfully");
      setEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleSavePassword = async () => {
    try {
      await updatePassword(auth.currentUser, newPassword);
      console.log("Password updated successfully");
      setEditingPassword(false);
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white bg-gradient-to-br from-gray-900 to-black sm:p-6">
      <div className="p-6 rounded-lg bg-black/40 backdrop-blur-sm">
        <h1 className="mb-6 text-3xl font-bold">User Dashboard</h1>
        {/* Display Name Section */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Name</label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 outline-none border-blue-400/30 focus:border-blue-400"
              readOnly={!editingName}
            />
            {editingName ? (
              <MdSave
                className="text-3xl text-green-500 cursor-pointer"
                onClick={handleSaveName}
              />
            ) : (
              <MdEdit
                className="text-3xl text-blue-500 cursor-pointer"
                onClick={() => setEditingName(true)}
              />
            )}
          </div>
        </div>
        {/* Email Section */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <div className="flex items-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 outline-none border-blue-400/30 focus:border-blue-400"
              readOnly={!editingEmail}
            />
            {editingEmail ? (
              <MdSave
                className="text-3xl text-green-500 cursor-pointer"
                onClick={handleSaveEmail}
              />
            ) : (
              <MdEdit
                className="text-3xl text-blue-500 cursor-pointer"
                onClick={() => setEditingEmail(true)}
              />
            )}
          </div>
        </div>
        {/* Password Section */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">
            New Password
          </label>
          <div className="flex items-center gap-4">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 bg-transparent border-b-2 outline-none border-blue-400/30 focus:border-blue-400"
              readOnly={!editingPassword}
              placeholder="Enter new password"
            />
            {editingPassword ? (
              <MdSave
                className="text-3xl text-green-500 cursor-pointer"
                onClick={handleSavePassword}
              />
            ) : (
              <MdEdit
                className="text-3xl text-blue-500 cursor-pointer"
                onClick={() => setEditingPassword(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
