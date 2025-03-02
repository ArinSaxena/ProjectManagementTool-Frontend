import React, { useRef } from "react";
import { useSelector } from "react-redux";
import handleClickOutside from "../hooks/use-click-outside";

const Profile = ({ isProfileOpen, setIsProfileOpen }) => {
  const user = useSelector((state) => state.auth.userData);
  const modalRef = useRef();

  handleClickOutside(modalRef, setIsProfileOpen);

  // Get initials (First letter of first name & last name)
  const getInitials = (name) => {
    if (!name) return "U";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : `${nameParts[0][0]}`.toUpperCase();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-lg shadow-2xl w-[420px] text-center border-t-4 border-blue-500"
      >
        {/* Avatar with initials */}
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          {getInitials(user?.name)}
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{user?.name}</h2>
        <p className="text-gray-600 text-lg">{user?.email}</p>

        <div className="mt-4 border-t pt-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Role:</span> {user?.role?.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Title:</span> {user?.title}  N/A
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-4">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="text-gray-500 hover:text-gray-800 transition-all text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
