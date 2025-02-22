import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateTask = ({ isOpen, isClose }) => {
  const [users, setUsers] = useState();
  const [formData, setFormData] = useState({
    // cosnt user
    name: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
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
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const submitForm = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/task/task",
        formData ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    isClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create New Task
        </h2>

        <form onSubmit={submitForm} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Task Name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select User</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select status</option>
            <option value="todo">Todo</option>
            <option value="inProgress">In-progress</option>
            <option value="completed">completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-all"
              onClick={isClose}
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

export default CreateTask;
