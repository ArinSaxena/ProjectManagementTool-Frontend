import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectStatusBarChart = () => {
  const [projects, setProjects] = useState(() => []);

  // Fetch tasks from backend
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token if auth is required
      const res = await axios.get(
        "http://localhost:5000/api/project/update-project-status",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProjects(res.data)
    //   if (Array.isArray(res.data)) {
    //     setProjects(res.data);
    //   } else {
    //     setProjects([]); // Set an empty array if invalid response
    //     console.error("Unexpected API response:", res.data);
    //   }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setProjects([]); // Fallback to empty array

    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch tasks on mount

    // Polling mechanism (optional: refresh every 5 seconds)
    const interval = setInterval(fetchProjects, 10000);
    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // ✅ Normalize Status Values (Ensure Consistency)
  const normalizeStatus = (status) => {
    switch (status.toLowerCase()) {
      case "on-hold":
        return "On-hold";
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      default:
        return "Other";
    }
  };

  // ✅ Count tasks by status
  const statusCounts = {
    "On-hold": 0,
    Active: 0,
    Completed: 0,
  };

  projects.forEach((project) => {
    const normalizedStatus = normalizeStatus(project.status);
    if (statusCounts[normalizedStatus] !== undefined) {
      statusCounts[normalizedStatus]++;
    }
  });
// if (!Array.isArray(projects)) {
//     console.error("Projects is not an array:", projects);
//     return null; // Prevent further execution if projects is not an array
//   }
  
//   projects.forEach((project) => {
//     const normalizedStatus = normalizeStatus(project.status);
//     if (statusCounts[normalizedStatus] !== undefined) {
//       statusCounts[normalizedStatus]++;
//     }
//   });
  

  const data = {
    labels: Object.keys(statusCounts), // X-axis labels: To-Do, In Progress, Completed
    datasets: [
      {
        label: "Number of Projects",
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

export default ProjectStatusBarChart;
