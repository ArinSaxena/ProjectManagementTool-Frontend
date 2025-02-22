import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import handleClickOutside from "../hooks/use-click-outside";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../utility/authSlice";

const Profile = ({ isProfileOpen, setIsProfileOpen }) => {
  const user = useSelector((state) => state.auth.userData);
  const modalRef = useRef();
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const refresh_token = localStorage.getItem("refresh_token");

  const handleLogout = (e) => {
    axios.delete(`http://localhost:5000/api/auth/logout`, {
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    });
    localStorage.removeItem("token")
    localStorage.removeItem("refresh_token")
    navigate("/")
    dispatch(removeCurrentUser());
  };

  handleClickOutside(modalRef, setIsProfileOpen);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-[400px] text-center"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
          {user?.name ? user.name[0].toUpperCase() : "U"}
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          {user?.name}
        </h2>
        <p className="text-gray-600 text-lg">
          {user?.email}
        </p>

        <div className="mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600 transition-all"
          >
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setIsProfileOpen(false)}
            className="text-gray-500 hover:text-gray-800 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
