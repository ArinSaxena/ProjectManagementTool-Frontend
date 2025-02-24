import { useSelector } from "react-redux";
import Navbar from "./Navbar"
import ProjectStatusBarChart from "./ProjectStatusBarChart";
const AdminDashboard = () => {
  const role = useSelector((state) => state.auth.userData.role);
  const projects = useSelector((state) => state.project.projectData);
  
const totalProjects = projects.length;
 
const completed = projects.filter((project) => project.status === "completed").length;
const onHold = projects.filter((project) => project.status === "on-hold").length;
const active = projects.filter((project) => project.status === "active").length;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold ">Total Projects</h2>
              <p className="text-2xl font-bold text-blue-600 ">{totalProjects}</p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold ">Completed Projects</h2>
              <p className="text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold ">Active Projects</h2>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <div className="flex flex-col items-center p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-lg font-semibold ">On-hold Projects</h2>
              <p className="text-2xl font-bold text-red-600">{onHold}</p>
            </div>
          </div>
          <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
            <ProjectStatusBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
