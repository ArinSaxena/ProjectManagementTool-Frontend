import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTask, restoreTask } from "../utility/taskSlice";
import { removeTrashTask } from "../utility/trashSlice";

const Trash = () => {
  const trashTasks = useSelector((state) => state.trash.trashData);
  console.log(trashTasks);
  const dispatch = useDispatch();

  // Restore Task
  const restoreTaskHandler = async (id) => {
    const token = localStorage.getItem("token");
    await axios.put(`http://localhost:5000/api/task/restore/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const restoredTask = trashTasks.find(task => task._id === id);
    dispatch(removeTrashTask(id));
    dispatch(restoreTask(restoredTask)); // Move back to active tasks
  };

  // Delete Permanently
  const deletePermanently = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/task/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(removeTrashTask(id)); // Remove from Redux state
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Trash</h2>
      {trashTasks.map((task) => (
        <div key={task._id} className="flex justify-between bg-gray-200 p-4 shadow-md rounded-md my-2">
          <span>{task?.name}</span>
          <div>
            <button onClick={() => restoreTaskHandler(task._id)} className="text-blue-500 hover:underline mr-3">
              Restore
            </button>
            <button onClick={() => deletePermanently(task._id)} className="text-red-500 hover:underline">
              Delete Permanently
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trash;
