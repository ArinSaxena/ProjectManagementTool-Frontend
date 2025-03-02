import axios from "axios";
import React, { useEffect, useState } from "react";
import DragandDrop from "./DragAndDrop";
import Navbar from "./Navbar";
import Profile from "./Profile";

const UserDashboard = () => {
  const token = localStorage.getItem("token");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/task/user`,
          {
            headers: { Authorization: ` Bearer ${token}` },
          }
        );
        setTasks(res.data);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <main className="w-full flex flex-col h-screen ">
        <div className="p-6 overflow-y-auto flex-grow">
          <h1 className="text-3xl font-semibold mb-4">Tasks</h1>
          <DragandDrop tasks={tasks} />
        </div>
      </main>
      {isProfileOpen && (
        <Profile
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}
    </div>
  );
};

export default UserDashboard;
