// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar"

// const AllTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/task/all-tasks",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setTasks(res.data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/task/task/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTasks((prevTasks) =>  prevTasks.filter((task) => task._id !== id));
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br  p-6">
//       <Navbar/>
//       <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
//           Task List
//         </h2>

//         {loading ? (
//           <p className="text-center text-gray-600 font-semibold">
//             Loading tasks...
//           </p>
//         ) : tasks.length === 0 ? (
//           <p className="text-center text-gray-600 font-semibold">
//             No tasks found.
//           </p>
//         ) : (
//           <ul className="space-y-4">
//             {tasks.map((task) => (
//               <li
//                 key={task._id}
//                 className="p-5 border rounded-lg shadow-md bg-white hover:bg-blue-50 transition-all"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold text-blue-800">
//                     {task.name}
//                   </h3>
//                   <button
//                     onClick={() => handleDelete(task._id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//                 <p className="text-gray-700 mt-1">{task.description}</p>
//                 <div className="flex justify-between text-sm text-gray-500 mt-3">
//                   <p>
//                     <strong>Created:</strong>{" "}
//                     {new Date(task.createdAt).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <strong>Due:</strong>{" "}
//                     {task.dueDate
//                       ? new Date(task.dueDate).toLocaleDateString()
//                       : "No due date"}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllTasks;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrashTask } from "../utility/trashSlice";
import { removeTask, setTask } from "../utility/taskSlice";
import Navbar from "./Navbar";

const AllTasks = () => {
  const token = localStorage.getItem("token");
  console.log(token)
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.taskData);
  const [view, setView] = useState("list"); // "list" or "board"

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/task/all-tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setTask(res.data));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  const moveToTrash = async (id) => {
    axios.put(`http://localhost:5000/api/task/task/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const deletedTask = tasks.find((task) => task._id === id);
    dispatch(removeTask(id)); // Remove from active tasks
    dispatch(setTrashTask(deletedTask)); // Move to trash
  };

  return (
    <div className="bg-white h-screen pt-0">
      <Navbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">All Tasks</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${view === "board" ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 rounded-md ${view === "list" ? "bg-gray-300" : "bg-blue-500 text-white"}`}
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
                  <td className="p-2">{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</td>
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
              <p className="text-xs text-gray-500">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</p>
              <p className="p-2 text-red-500 cursor-pointer" onClick={() => moveToTrash(task._id)}>
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
