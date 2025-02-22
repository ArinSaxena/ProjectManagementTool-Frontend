import axios from "axios";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react"; // Import delete icon

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/project/all-projects",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Project List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li
              key={project._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-gray-600">{project.description}</p>
                <p className="text-sm text-gray-500">
                  <strong>Created:</strong>{" "}
                  {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Deadline:</strong>{" "}
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllProjects;
