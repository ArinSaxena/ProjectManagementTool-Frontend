import axios from "axios";
import { Trash2, Undo } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Trash = () => {
  const [trashedItems, setTrashedItems] = useState([]);
  // const trashTasks = useSelector((state) => state.trash.trashData);

  const userData = useSelector((state) => state?.auth?.userData);

  // console.log(userData);
  //fetching trashed data (Project, task, user) all together
  
  async function fetchTrashData() {
    try {
      const token = localStorage.getItem("token");
      const endpoints =
        userData.role === "projectmanager"
          ? ["/api/task/trash", "/api/user/trash"]
          : ["/api/project/trash", "/api/task/trash", "/api/user/trash"];

      const responses = await Promise.all(
        endpoints.map((url) =>
          axios.get(`http://localhost:5000${url}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      const trashedItems = responses.flatMap((res, i) =>
        res.data.map((item) => ({
          ...item,
          type: ["project", "task", "user"][endpoints.length === 2 ? i + 1 : i],
        }))
      );

      setTrashedItems(trashedItems);
    } catch (err) {
      console.error("Error fetching trashed data", err);
    }
  }
  useEffect(() => {
    fetchTrashData();
  }, []);

  const restoreItemHandler = async (id, type) => {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:5000/api/${type}/restore/${id}`;
    try {
      await axios.put(
        endpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrashedItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Error restoring item:", err);
    }
  };

  const deletePermanently = async (id, type) => {
    const token = localStorage.getItem("token");
    const endpoint = `http://localhost:5000/api/${type}/delete/${id}`;
    try {
      await axios.delete(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTrashData();
    } catch (err) {
      console.log("Error deleting item permanently", err);
    }
  };
  return (
    <div className="bg-white h-screen pt-0">
      <Navbar />
      <div className="flex shadow-lg justify-between mt-6 p-6">
        <h2 className="text-xl font-bold">Trash</h2>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg p-4">
        {trashedItems.length === 0 ? (
          <p className="text-center text-gray-600">No items in trash.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 font-mono">Name</th>
                <th className="p-2 font-mono">Type</th>
                <th className="p-2 font-mono">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trashedItems.map((item) => (
                <tr key={item._id} className="border-b border-gray-200">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2 capitalize">{item.type}</td>
                  <td className="p-2 flex space-x-4">
                    <button
                      className="text-blue-500 hover:underline flex items-center"
                      onClick={() => restoreItemHandler(item._id, item.type)}
                    >
                      {console.log(item.type)}
                      <Undo className="w-4 h-4 mr-1" /> Restore
                    </button>
                    <button
                      className="text-red-500 hover:underline flex items-center"
                      onClick={() => deletePermanently(item._id, item.type)}
                    >
                      <Trash2 className="w-4 h-4 mr-1 ml-20" /> Delete
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
