import React, { useEffect, useState } from "react";
import DragandDrop from "./DragandDrop";
import { User, LogOut, Settings } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Profile from "./Profile";

const UserDashboard = () => {
  const token = localStorage.getItem("token");
  const [isProfileOpen, setIsProfileOpen] = useState(false); // ✅ State to control modal
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/task/task/user`,
          {
            headers: { Authorization: ` Bearer ${token}` },
          }
        );
        setTasks(res.data); 
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  console.log(tasks)

  return (
    <div className="flex h-screen w-full">
      <main className="w-full flex flex-col h-screen ">
        <header className="w-full bg-white shadow p-4 flex justify-end items-center">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none mr-8"
          onClick={() => setIsProfileOpen(true)}>
            <User size={27} />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Tasks</h1>
          <DragandDrop tasks={tasks} />
        </div>

      </main>
      {isProfileOpen && <Profile isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />}

    </div>
  );
};

export default UserDashboard;
