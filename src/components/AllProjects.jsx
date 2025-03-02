import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./Navbar";

const AllProjects = () => {
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);
  const [view, setView] = useState("list"); // "list" or "board"

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/project/all-projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const moveToTrash = async (id) => {
    try {
       await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/project/trash/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProjects();
    } catch (err) {
      console.error("Error moving project to trash:", err);
    }
  };

  return (
    <div className="bg-white h-screen pt-0">
      <AdminNavbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">All Projects</h2>
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
                <th className="p-2 font-mono">Project Name</th>
                <th className="p-2 font-mono">Description</th>
                <th className="p-2 font-mono">Created At</th>
                <th className="p-2 font-mono">Deadline</th>
                <th className="p-2 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-gray-200">
                  <td className="p-2">{project.name}</td>
                  <td className="p-2">{project.description}</td>
                  <td className="p-2">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td
                    className="p-2 text-red-500 cursor-pointer"
                    onClick={() => moveToTrash(project._id)}
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
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                {project.description}
              </p>
              <p className="text-xs text-gray-500">
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500">
                Deadline: {new Date(project.deadline).toLocaleDateString()}
              </p>
              <p
                className="p-2 text-red-500 cursor-pointer"
                onClick={() => moveToTrash(project._id)}
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

export default AllProjects;
