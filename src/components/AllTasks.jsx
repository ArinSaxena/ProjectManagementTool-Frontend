import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AllTasks = () => {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("list"); // "list" or "board"

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/all-tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const moveToTrash = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/trash/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="bg-white h-screen pt-0">
      <Navbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">All Tasks</h2>
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
                <th className="p-2 font-mono">Task Name</th>
                <th className="p-2 font-mono">Description</th>
                <th className="p-2 font-mono">Created At</th>
                <th className="p-2 font-mono">Due Date</th>
                <th className="p-2 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-200">
                  <td className="p-2">{task.name}</td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </td>
                  <td
                    className="p-2 text-red-500 cursor-pointer"
                    onClick={() => moveToTrash(task._id)}
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
          {tasks.map((task) => (
            <div key={task._id} className="bg-white shadow-md p-4 rounded-lg">
              <h3 className="font-semibold">{task.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{task.description}</p>
              <p className="text-xs text-gray-500">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Due:{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No due date"}
              </p>
              <p
                className="p-2 text-red-500 cursor-pointer"
                onClick={() => moveToTrash(task._id)}
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

export default AllTasks;
