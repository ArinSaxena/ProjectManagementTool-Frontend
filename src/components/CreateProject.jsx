import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateProject = ({ isOpen, onClose }) => {
  const token = localStorage.getItem("token");
  const [managers, setManagers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectmanager: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/managers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManagers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchManager();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/project/createProject`,
         formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (err) {
      console.log(err);
    }
    setFormData({
      name: "",
      description: "",
      projectmanager: "",
      deadline: "",
    });
    onClose();
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          {/* <label htmlFor="projectmanager">Select ProjectManager</label> */}
          <select
            id="projectmanager"
            name="projectmanager"
            value={formData.projectmanager}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
