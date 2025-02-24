// // import axios from "axios";
// // import { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { removeCurrentUser } from "../utility/authSlice";

// // const ManagerDashboard = () => {
// //   const user = useSelector((state) => state.auth.userData);
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const dispatch = useDispatch();
// //   const [isMOdalOpen,setIsModalOpen] = useState()

// //   // Sample task data (Replace with API data)
// //   const totalTasks = 10;
// //   const completedTasks = 3;
// //   const tasksInProgress = 5;
// //   const todos = 2;
// //   const handleLogout = async () => {
// //     const token = localStorage.getItem("token");
// //     try {
// //       const res = await axios.delete("http://localhost:5000/api/auth/logout", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       dispatch(removeCurrentUser());
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("refresh_token");
// //       console.log(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //     window.location.href = "/";
// //   };

// //   // Extract initials for profile icon
// //   const getUserInitials = () => {
// //     if (!user || !user.name) return "U";
// //     const nameParts = user.name.split(" ");
// //     return nameParts
// //       .map((part) => part[0].toUpperCase())
// //       .join("")
// //       .slice(0, 2);
// //   };

// //   return (
// //     <div className="bg-gray-100 min-h-screen p-6">
// //       {/* Navbar */}
// //       <div className="w-full p-4 bg-white shadow-md flex justify-between items-center rounded-lg">
// //         <h1 className="text-lg font-bold">Project Manager Dashboard</h1>

// //         <div className="flex items-center space-x-4">
// //           <input
// //             type="text"
// //             placeholder="Search..."
// //             className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //           <button
// //             onClick={() => setIsModalOpen(true)}
// //             className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-all"
// //           >
// //             Create Task +
// //           </button>{" "}
// //           {/* Profile Section */}
// //           <div className="relative">
// //             <div
// //               className="h-10 w-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold cursor-pointer select-none"
// //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //             >
// //               {getUserInitials()}
// //             </div>

// //             {/* Dropdown Menu */}
// //             {isDropdownOpen && (
// //               <div className="absolute right-0 mt-4 w-40 bg-white border shadow-lg rounded-lg z-50">
// //                 <ul className="text-gray-800">
// //                   <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
// //                     Profile
// //                   </li>
// //                   {/* <hr className="bg-gray-400"/> */}
// //                   <li
// //                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg"
// //                     onClick={() => handleLogout()}
// //                   >
// //                     Logout
// //                   </li>
// //                 </ul>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Task Summary Cards */}
// //       <div className="grid grid-cols-4 gap-6 mt-6">
// //         {/* Total Tasks */}
// //         <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
// //           <h3 className="text-xl font-bold text-gray-700">Total Tasks</h3>
// //           <p className="text-2xl font-semibold text-blue-600">{totalTasks}</p>
// //         </div>

// //         {/* Completed Tasks */}
// //         <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
// //           <h3 className="text-xl font-bold text-gray-700">Completed Tasks</h3>
// //           <p className="text-2xl font-semibold text-green-600">
// //             {completedTasks}
// //           </p>
// //         </div>

// //         {/* Tasks In Progress */}
// //         <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
// //           <h3 className="text-xl font-bold text-gray-700">Tasks In Progress</h3>
// //           <p className="text-2xl font-semibold text-yellow-600">
// //             {tasksInProgress}
// //           </p>
// //         </div>

// //         {/* To-Dos */}
// //         <div className="bg-white p-4 shadow rounded-lg flex flex-col items-center">
// //           <h3 className="text-xl font-bold text-gray-700">To-Dos</h3>
// //           <p className="text-2xl font-semibold text-red-600">{todos}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ManagerDashboard;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import CreateTask from "./CreateTask";
import TaskStatusBarChart from "./TaskStatusBarChart"; // Importing TaskStatusBarChart

const ManagerDashboard = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample task data (Replace with API data)
  const totalTasks = 10;
  const completedTasks = 3;
  const tasksInProgress = 5;
  const todos = 2;

  return (
    <div className="flex h-screen bg-gray-100 pt-0">
      <div className="flex-1">
        <Navbar/>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Total Tasks</h2>
              <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Completed Tasks</h2>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Tasks In Progress</h2>
              <p className="text-2xl font-bold text-yellow-600">{tasksInProgress}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">To-Dos</h2>
              <p className="text-2xl font-bold text-red-600">{todos}</p>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
            <TaskStatusBarChart />
          </div>
        </div>
      </div>
      {/* {isModalOpen && <CreateTask isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
};

export default ManagerDashboard;
