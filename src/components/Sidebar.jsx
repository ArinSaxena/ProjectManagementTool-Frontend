import {
  BarChart,
  CheckCircle,
  ClipboardList,
  Home,
  List,
  Trash2,
  Users,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Sidebar = ({ role }) => {
  const menuItems = {
    user: [{ name: "My Tasks", icon: ClipboardList }],
    projectmanager: [
      { name: "Dashboard", icon: Home, path: "/dashboard/projectmanager" },
      { name: "Completed", icon: CheckCircle, path: "/dashboard/completed" },
      { name: "In Progress", icon: BarChart, path: "/dashboard/in-progress" },
      { name: "Todo", icon: List, path: "/dashboard/todo" },
      { name: "Team", icon: UsersRound, path: "/dashboard/teams" },
      { name: "Trash", icon: Trash2, path: "/dashboard/trash" },
    ],
    admin: [
      { name: "Dashboard", icon: Home, path: "/dashboard/admin" },
      { name: "All Users", icon: Users, path: "/dashboard/all-users" },
      { name: "All Projects", icon: BarChart, path: "/dashboard/all-projects" },
      { name: "All Tasks", icon: ClipboardList, path: "/dashboard/all-tasks" },
      { name: "Trash", icon: Trash2, path: "/dashboard/trash" },
    ],
  };

  return (
    <div>
      {role !== "user" && (
        <div className="w-64 h-screen bg-gray-100 p-5 shadow-lg sticky">
          <h2 className="text-xl font-bold mb-6">
            {role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard
          </h2>
          <ul>
            {menuItems[role]?.map((item, index) => (
              <li
                key={index}
                className="flex items-center p-2 hover:bg-blue-500 rounded-md cursor-pointer mb-2"
              >
                <Link to={item.path} className="flex items-center w-full">
                  <item.icon className="w-5 h-5 mr-2" /> {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

export const SidebarLayout = ({ children }) => {
  const user = useSelector((state) => state?.auth?.userData);

  // if (!user) {
  //   return <h1>loading...</h1>;
  // }

  return (
    <div className="flex h-screen">
      <div>
        <Sidebar role={user?.role} />
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};
