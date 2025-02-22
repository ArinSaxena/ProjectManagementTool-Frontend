import React, { useRef, useState, useEffect } from "react";
import useClickOutSide from "../hooks/use-click-outside";
import axios from "axios";
import { Trophy } from "lucide-react";
const DragandDrop = ({ tasks }) => {
  // Convert tasks array into an object grouped by status
  const token = localStorage.getItem("token");
  const groupTasksByStatus = (tasksArray) => {
    console.log(tasksArray)
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
      inProgress: grouped.inprogress || [],
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
    console.log("Updated Data:", data); // ✅ Logs AFTER state updates
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

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    console.log(item._id);
    const sourceContainer = dragContainer.current;

    try {
      axios.put(`http://localhost:5000/api/task/status/${item._id}`, {
        status: targetContainer,
      },{
        headers:{
          Authorization: `Bearer ${token}`
        }
      });
    } catch (err) {
      console.log("error updating task!", err);
    }

    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i.name !== item.name
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      console.log(targetContainer)
      return newData;
    });
  };
console.log(data);
  return (
    
    <div className="flex flex-col">
      {console.log("Rendering with data:", data)}

      <div className="flex justify-between min-h bg-gray-100 p-6">
        {Object.keys(data).map((container, index) => (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            className="flex flex-col w-1/3 bg-white rounded-lg shadow-md p-4 m-3 min-h-[400px] border-2 border-gray-200"
          >
            <h2 className="text-center mb-4 text-xl font-bold uppercase text-gray-700">
              {container}
            </h2>
            <div className="space-y-3">
              {data[container].map((task, idx) => (
                <div
                  key={idx}
                  onDragStart={(e) => handleDragStart(e, task, container)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setSelectedTask(task)}
                  draggable
                  className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg shadow-sm cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-blue-200"
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
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px] p-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl w-[400px]"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {task.name}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Description:</strong>{" "}
            {task.description || "No description provided"}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date set"}
          </p>
          <p>
            <strong>Assigned On:</strong>{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DragandDrop;
