import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./AdminNavbar"

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/task/all-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) =>  prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br  p-6">
      <Navbar/>
      <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Task List
        </h2>

        {loading ? (
          <p className="text-center text-gray-600 font-semibold">
            Loading tasks...
          </p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600 font-semibold">
            No tasks found.
          </p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-5 border rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-800">
                    {task.name}
                  </h3>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-700 mt-1">{task.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Due:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "No due date"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
