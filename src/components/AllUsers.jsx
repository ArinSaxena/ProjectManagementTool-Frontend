import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./Navbar";

const AllUsers = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list"); // "list" or "board"

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const moveToTrash = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/user/trash/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="bg-white h-screen pt-0">
      <AdminNavbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">All Users</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              view === "board" ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              view === "list" ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
            onClick={() => setView("board")}
          >
            Board View
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-mono">Full Name</th>
                <th className="p-2 font-mono">Email</th>
                <th className="p-2 font-mono">Role</th>
                <th className="p-2 font-mono">Active</th>
                <th className="p-2 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.role}</td>
                  <td className="p-2">{user.active ? "Active" : "Disabled"}</td>
                  <td
                    className="p-2 text-red-500 cursor-pointer"
                    onClick={() => moveToTrash(user._id)}
                  >
                    Delete
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{user.email}</p>
              <p className="text-xs text-gray-500">Role: {user.role}</p>
              <p className="text-xs text-gray-500">
                Status: {user.active ? "Active" : "Disabled"}
              </p>
              <p
                className="p-2 text-red-500 cursor-pointer"
                onClick={() => moveToTrash(user._id)}
              >
                Delete
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
