import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { setTask} from "../utility/taskSlice";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskStatusBarChart = () => {
  const dispatch =useDispatch();

  const tasks =  useSelector((state) => state.task.taskData);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {

      const token = localStorage.getItem("token"); // Get token if auth is required
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/manager`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setTask(res.data)); // Update state with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks on mount

    // Polling mechanism (optional: refresh every 5 seconds)
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // ✅ Normalize Status Values (Ensure Consistency)
  const normalizeStatus = (status) => {
    switch (status.toLowerCase()) {
      case "todo":
      case "to-do":
        return "To-Do";
      case "inprogress":
      case "in_progress":
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Other";
    }
  };

  // ✅ Count tasks by status
  const statusCounts = {
    "To-Do": 0,
    "In Progress": 0,
    "Completed": 0,
  };

  tasks.forEach((task) => {
    const normalizedStatus = normalizeStatus(task.status);
    if (statusCounts[normalizedStatus] !== undefined) {
      statusCounts[normalizedStatus]++;
    }
  });

  const data = {
    labels: Object.keys(statusCounts), // X-axis labels: To-Do, In Progress, Completed
    datasets: [
      {
        label: "Number of Tasks",
        data: Object.values(statusCounts), // Y-axis values
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        borderColor: ["#FF4F6F", "#FFD700", "#2A85D9"],
        borderWidth: 2,
        barThickness: 200, // ✅ Increase bar size
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ Allow full-size rendering
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <div className="w-full h-[410px] bg-white p-6 shadow-md rounded-xl flex justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskStatusBarChart;
