import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Teams = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/user/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  // Get user initials
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="">
        <Navbar/>
      <div className="flex justify-between items-center mt-9 pl-2">
        <h2 className="text-xl font-bold">Team Members</h2>
       
      </div>

      {/* User Table */}
      <div className="mt-6 p-6 bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-300 ">
                <td className="p-3 flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
                    {getUserInitials(user.name)}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="p-3">{user.title || "N/A"}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 space-x-3">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
