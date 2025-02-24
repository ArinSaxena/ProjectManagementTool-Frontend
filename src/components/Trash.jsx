// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setTask, restoreTask } from "../utility/taskSlice";
// import { removeTrashTask } from "../utility/trashSlice";
// import Navbar from "./Navbar";

// const Trash = () => {
//   const trashTasks = useSelector((state) => state.trash.trashData);
//   console.log(trashTasks);
//   const dispatch = useDispatch();

//   // Restore Task
//   const restoreTaskHandler = async (id) => {
//     const token = localStorage.getItem("token");
//     await axios.put(`http://localhost:5000/api/task/restore/${id}`, {}, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const restoredTask = trashTasks.find(task => task._id === id);
//     dispatch(removeTrashTask(id));
//     dispatch(restoreTask(restoredTask)); // Move back to active tasks
//   };

//   // Delete Permanently
//   const deletePermanently = async (id) => {
//     const token = localStorage.getItem("token");
//     await axios.delete(`http://localhost:5000/api/task/delete/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     dispatch(removeTrashTask(id)); // Remove from Redux state
//   };

//   return (
//     <div className="">
//       <Navbar/>
//       <h2 className="text-2xl font-bold">Trash</h2>
//       {trashTasks.map((task) => (
//         <div key={task._id} className="flex justify-between bg-gray-200 p-4 shadow-md rounded-md my-2">
//           <span>{task?.name}</span>
//           <div>
//             <button onClick={() => restoreTaskHandler(task._id)} className="text-blue-500 hover:underline mr-3">
//               Restore
//             </button>
//             <button onClick={() => deletePermanently(task._id)} className="text-red-500 hover:underline">
//               Delete Permanently
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Trash;


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTask, restoreTask } from "../utility/taskSlice";
import { removeTrashTask } from "../utility/trashSlice";
import Navbar from "./Navbar";
import { Undo, Trash2 } from "lucide-react";

const Trash = () => {
  const trashTasks = useSelector((state) => state.trash.trashData);
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
    <div className="bg-white h-screen pt-0">
      <Navbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">Trash</h2>
      </div>
      <div className="mt-6 bg-white shadow rounded-lg p-4">
        {trashTasks.length === 0 ? (
          <p className="text-center text-gray-600">No items in trash.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-mono">Task Name</th>
                <th className="p-2 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trashTasks.map((task) => (
                <tr key={task._id} className="border-b border-gray-200">
                  <td className="p-2">{task.name}</td>
                  <td className="p-2 flex space-x-4">
                    <button
                      className="text-blue-500 hover:underline flex items-center"
                      onClick={() => restoreTaskHandler(task._id)}
                    >
                      <Undo className="w-4 h-4 mr-1" /> Restore
                    </button>
                    <button
                      className="text-red-500 hover:underline flex items-center"
                      onClick={() => deletePermanently(task._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Trash;
