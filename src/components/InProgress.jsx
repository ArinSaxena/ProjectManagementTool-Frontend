import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setTask } from "../utility/taskSlice";
import { setTrashTask } from "../utility/trashSlice";
import Navbar from "./Navbar";

const InProgress = () => {
  // const token = localStorage.getItem("token");
  // console.log(token)
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskData)
  const [view, setView] = useState("list"); // "list" or "board"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchInProgress = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/task/task?status=inProgress`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setTask(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchInProgress();
  }, []);
  const moveToTrash = async (id) => {
    const token = localStorage.getItem("token");
  console.log(token)
    axios.put(`http://localhost:5000/api/task/task/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deletedTask = tasks.find((task) => task.id === id);
    dispatch(removeTask(id)); // Remove from active tasks
    dispatch(setTrashTask(deletedTask)); // Move to trash
  };

  const getInitials = (name) => {
    return name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-0">
      {/* Navbar */}
      <Navbar/>


      {/* View Toggle Buttons */}
      <div className="flex justify-between mt-6">
        <h2 className="text-xl font-bold">Tasks</h2>
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

      {/* Tasks Display */}
      {view === "list" ? (
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-mono">Task Title</th>
                <th className="p-2 font-mono">Assigned To</th>
                <th className="p-2 font-mono">Created At</th>
                <th className="p-2 font-mono">Description</th>
                {/* <th className="p-2">Status</th> */}
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr key={task._id} className="border-b border-gray-300">
                  <td className="p-2">{task.name}</td>
                  <td className="p-2">
                    {task.assignedTo.map((user) => (
                      <div
                        key={user._id}
                        className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold mr-1 cursor-pointer"
                        onMouseEnter={() => setHoveredUser(user)}
                        onMouseLeave={() => setHoveredUser(null)}
                      >
                        {getInitials(user.name)}
                      </div>
                    ))}
                  </td>
                  <td className="p-2">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2 text-red-500 cursor-pointer" onClick={() => moveToTrash(task._id)}>Delete</td>
                  {/* <td className="p-2">{task.status}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="font-semibold">{task.name}</h3>
              <div className="flex space-x-2 mt-2">
                {task.assignedTo.map((user) => (
                  <div
                    key={user._id}
                    className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold cursor-pointer"
                    onMouseEnter={() => setHoveredUser(user)}
                    onMouseLeave={() => setHoveredUser(null)}
                  >
                    {getInitials(user.name)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{task.description}</p>
              <p className="text-xs text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs font-semibold">Status: {task.status}</p>
            </div>
          ))}
        </div>
      )}

      {hoveredUser && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-lg rounded-lg">
          <h3 className="font-bold">{hoveredUser.name}</h3>
          <p className="text-sm text-gray-600">Email: {hoveredUser.email}</p>
        </div>
      )}
    </div>
  );
};

export default InProgress;
