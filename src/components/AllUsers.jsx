// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setTrashTask } from "../utility/trashSlice";
// import { restoreTask, setTask } from "../utility/taskSlice";
// import AdminNavbar from "./Navbar";

// const AllUsers = () => {
//   const token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   const [users, setUsers] = useState([]);
//   const [view,setView] = useState("list");
//  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [hoveredUser, setHoveredUser] = useState(null);
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/user/all-users",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setUsers(res.data);
//       } catch (err) {
//         setError("Failed to fetch users");
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/user/delete/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((word) => word[0].toUpperCase())
//       .join("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br  p-6">
//       <AdminNavbar />
//       <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h2>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading...</p>
//         ) : error ? (
//           <p className="text-center text-red-500">{error}</p>
//         ) : users.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-300 rounded-lg">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="py-3 px-4 border border-gray-300 text-left">
//                     Full Name
//                   </th>
//                   <th className="py-3 px-4 border border-gray-300 text-left">
//                     Email
//                   </th>
//                   <th className="py-3 px-4 border border-gray-300 text-left">
//                     Role
//                   </th>
//                   <th className="py-3 px-4 border border-gray-300 text-left">
//                     Active
//                   </th>
//                   <th className="py-3 px-4 border border-gray-300 text-left">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user, index) => (
//                   <tr
//                     key={user._id}
//                     className={`border border-gray-300 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                   >
//                     <td className="py-3 px-4 flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
//                         {getInitials(user.name)}
//                       </div>
//                       <span className="text-gray-800">{user.name}</span>
//                     </td>
//                     <td className="py-3 px-4 text-gray-600">{user.email}</td>
//                     <td className="py-3 px-4">
//                       <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                           user.active
//                             ? "bg-blue-100 text-blue-600"
//                             : "bg-yellow-100 text-yellow-600"
//                         }`}
//                       >
//                         {user.active ? "Active" : "Disabled"}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 space-x-4">
//                       <button className="text-blue-500 hover:underline">
//                         Edit
//                       </button>
//                       <button
//                         className="text-red-500 hover:underline"
//                         onClick={() => handleDelete(user._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600">No users found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllUsers;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrashUser } from "../utility/trashSlice";
import { removeUser, setUser } from "../utility/userSlice";
import AdminNavbar from "./Navbar";

const AllUsers = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.userData);
  const [view, setView] = useState("list"); // "list" or "board"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const moveToTrash = async (id) => {
    axios.put(`http://localhost:5000/api/user/user/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deletedUser = users.find((user) => user._id === id);
    dispatch(removeUser(id)); // Remove from active users
    dispatch(setTrashUser(deletedUser)); // Move to trash
  };

  return (
    <div className="bg-white h-screen pt-0">
      <AdminNavbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">All Users</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${view === "board" ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${view === "list" ? "bg-gray-300" : "bg-blue-500 text-white"}`}
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
              <p className="text-xs text-gray-500">Status: {user.active ? "Active" : "Disabled"}</p>
              <p className="p-2 text-red-500 cursor-pointer" onClick={() => moveToTrash(user._id)}>
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
