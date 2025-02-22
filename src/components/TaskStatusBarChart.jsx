// import React, { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import axios from "axios";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TaskStatusBarChart = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(`http://localhost:5000/api/task/task`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     fetchTasks(); // Fetch tasks on component mount

//     // Polling mechanism (optional: refresh every 5 seconds)
//     const interval = setInterval(fetchTasks, 5000);

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);
//   // Count tasks by status
//   const statusCounts = {
//     "To-Do": tasks.filter((task) => task.status === "To-Do").length,
//     "In Progress": tasks.filter((task) => task.status === "In Progress").length,
//     Completed: tasks.filter((task) => task.status === "Completed").length,
//   };
//   const data = {
//     labels: ["To-Do", "In Progress", "Completed"],
//     datasets: [
//       {
//         label: "Number of Tasks",
//         data: Object.values(statusCounts),
//         backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
//         borderColor: ["#FF4F6F", "#FFD700", "#2A85D9"],
//         borderWidth: 1,
//       },
//     ],
//   };
//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: "top" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//       },
//     },
//   };
  
//   return (
//     <div className="w-full md:w-96 h-64 p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-xl font-semibold text-center mb-4">Task Status Overview</h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default TaskStatusBarChart;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskStatusBarChart = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token if auth is required
      const res = await axios.get("http://localhost:5000/api/task/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data); // Update state with fetched tasks
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
