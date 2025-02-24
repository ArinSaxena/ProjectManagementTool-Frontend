import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import TaskStatusBarChart from "./TaskStatusBarChart";

const ManagerDashboard = () => {
  const tasks = useSelector((state) => state.task.taskData);
  const totalTasks = tasks.length;
  
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const tasksInProgress = tasks.filter((task) => task.status === "inProgress").length;
  const todos = tasks.filter((task) => task.status === "todo").length;

  return (
    <div className="flex h-screen bg-white pt-0">
      <div className="flex-1">
        <Navbar/>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Total Tasks</h2>
              <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Completed Tasks</h2>
              <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">Tasks In Progress</h2>
              <p className="text-2xl font-bold text-yellow-600">{tasksInProgress}</p>
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg flex flex-col items-center">
              <h2 className="text-lg font-semibold">To-Dos</h2>
              <p className="text-2xl font-bold text-red-600">{todos}</p>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
            <TaskStatusBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
