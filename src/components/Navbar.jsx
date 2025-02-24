import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentUser } from "../utility/authSlice";
import CreateTask from "./CreateTask";
import CreateProject from "./CreateProject";


const Navbar = () => {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete("http://localhost:5000/api/auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(removeCurrentUser());
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    window.location.href = "/";
  };

  // Extract initials for profile icon
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const nameParts = user.name.split(" ");
    return nameParts
      .map((part) => part[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };
  return (
    user?.role === "projectmanager" ? (
      <div>
        <div className="w-full p-4 bg-white shadow-md flex justify-between items-center rounded-lg">
          <h1 className="text-lg font-bold">Project Manager Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-all"
            >
              Create Task +
            </button>
            {/* Profile Section */}
            <div className="relative">
              <div
                className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold cursor-pointer select-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {getUserInitials()}
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white border shadow-lg rounded-lg z-50">
                  <ul className="text-gray-800">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <CreateTask
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    ) : (
      <>
        <div className="w-full p-4 bg-white shadow-md flex justify-between items-center">
          <h1 className="text-lg font-bold">Dashboard</h1>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-all"
            >
              Create Project +
            </button>
            <div className="relative">
              <div
                className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold cursor-pointer select-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {getUserInitials()}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white border shadow-lg rounded-lg z-50">
                  <ul className="text-gray-800">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                      onClick={() => console.log("Profile clicked")}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {
          <CreateProject
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        }
      </>
    )
  );
  
};

export default Navbar;
