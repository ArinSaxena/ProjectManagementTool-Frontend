import React, { useRef, useState, useEffect } from "react";
import useClickOutSide from "../hooks/use-click-outside";
import axios from "axios";
import { Trophy } from "lucide-react";
const DragandDrop = ({ tasks }) => {
  // Convert tasks array into an object grouped by status
  const token = localStorage.getItem("token");

  const groupTasksByStatus = (tasksArray) => {
    // console.log(tasksArray);
    const grouped = tasksArray?.reduce((acc, task) => {
      const status = task?.status || "todo"; // Default to 'todo' if status is missing
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task); // Store full task object instead of just name
      return acc;
    }, {});
    return {
      todo: grouped.todo || [],
      inProgress: grouped.inProgress || [],
      completed: grouped.completed || [],
    };
  };

  // State to manage tasks and modal
  const [data, setData] = useState(groupTasksByStatus(tasks));
  const [selectedTask, setSelectedTask] = useState(null); // Store selected task

  useEffect(() => {
    setData(groupTasksByStatus(tasks));
  }, [tasks]);

  useEffect(() => {
    // ✅ Logs AFTER state updates
  }, [data]);
  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/status/${item._id}`,
        {
          status: targetContainer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log("error updating task!", err);
    }

    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i._id !== item._id
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      // console.log(targetContainer);
      return newData;
    });
  };
  return (
    <div className="flex flex-col">

      <div className="flex justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-6">
        {Object.keys(data).map((container, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            className="flex flex-col w-1/3 bg-white rounded-lg shadow-lg p-6 m-3 min-h-[400px] border-2 border-gray-300 transition-all duration-300 hover:shadow-2xl"
          >
            <h2
              className={`text-center mb-4 text-xl font-bold uppercase ${
                container === "todo"
                  ? "text-red-600"
                  : container === "inProgress"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              {container}
            </h2>
            <div className="space-y-3">
              {data[container].map((task, index) => (
                <div
                  key={index}
                  onDragStart={(e) => handleDragStart(e, task, container)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedTask(task)}
                  draggable
                  className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-md cursor-grab active:cursor-grabbing transition-all duration-300 hover:bg-gray-100 hover:scale-105 border-l-4
              border-gray-400"
                >
                  {task.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <Modal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

const Modal = ({ task, onClose }) => {
  const modalRef = useRef();
  useClickOutSide(modalRef, onClose);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "inProgress":
        return "bg-yellow-500 text-white";
      case "todo":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl shadow-2xl w-[450px] border-t-4 border-blue-500 transform transition-all duration-300 scale-105"
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-3 text-center tracking-wide">
          {task.name}
        </h2>

        <div className="flex justify-center mb-4">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              task.status
            )}`}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>

        <div className="space-y-4 text-gray-700">
          <p className="bg-gray-100 p-3 rounded-lg shadow-sm">
            <strong className="text-gray-900">Description:</strong>{" "}
            {task.description || "No description provided"}
          </p>
          <p className="bg-gray-100 p-3 rounded-lg shadow-sm">
            <strong className="text-gray-900">Due Date:</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date set"}
          </p>
          <p className="bg-gray-100 p-3 rounded-lg shadow-sm">
            <strong className="text-gray-900">Assigned On:</strong>{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DragandDrop;
