// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const token = localStorage.getItem("token");
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
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);
//   console.log(users);

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : users.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="py-3 px-4 border border-gray-300 text-left">
//                   Name
//                 </th>
//                 <th className="py-3 px-4 border border-gray-300 text-left">
//                   Email
//                 </th>
//                 <th className="py-3 px-4 border border-gray-300 text-left">
//                   Role
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr
//                   key={user._id}
//                   className={`border border-gray-300 ${
//                     index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                   }`}
//                 >
//                   <td className="py-3 px-4">{user.name}</td>
//                   <td className="py-3 px-4">{user.email}</td>
//                   <td className="py-3 px-4">
//                     <span
//                       className={`px-2 py-1 rounded text-sm font-semibold ${
//                         user.role === "admin"
//                           ? "bg-red-500 text-white"
//                           : user.role === "projectmanager"
//                           ? "bg-blue-500 text-white"
//                           : "bg-green-500 text-white"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No users found</p>
//       )}
//     </div>
//   );
// };

// export default AllUsers;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AllUsers = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );setUsers((prevUsers) => prevUsers.filter((user) =>user._id !==id))
    } catch (err) {
      console.log(err);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  p-6">
      <AdminNavbar/>
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 border border-gray-300 text-left">
                  Full Name
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left">
                  Email
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left">
                  Role
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left">
                  Active
                </th>
                <th className="py-3 px-4 border border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border border-gray-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-gray-800">{user.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-200 text-gray-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        user.active
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {user.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-4">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No users found</p>
      )}
    </div>
    </div>
  );
};

export default AllUsers;
