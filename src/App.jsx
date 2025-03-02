import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AdminDashboard from "./components/AdminDashboard";
import AllProjects from "./components/AllProjects";
import AllTasks from "./components/AllTasks";
import AllUsers from "./components/AllUsers";
import {
  AuthenticateAdmin,
  AuthenticateManager,
  AuthenticateUser,
  PublicRoute,
} from "./components/AuthenticateUser";
import Completed from "./components/Completed";
import InProgress from "./components/InProgress";
import ManagerDashboard from "./components/ManagerDashboard";
import { SidebarLayout } from "./components/Sidebar";
import Todo from "./components/Todo";
import UserDashboard from "./components/UserDashboard";
import AuthForm from "./pages/AuthForm";
import Trash from "./components/Trash";
import { setCurrentUser } from "./utility/authSlice";
import Teams from "./components/Teams";

const DashboardRedirect = () => {
  const user = useSelector((state) => state?.auth?.userData);

  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (user?.role === "user") {
    return <Navigate to="/dashboard/user" replace />;
  } else if (user?.role === "projectmanager") {
    return <Navigate to="/dashboard/projectmanager" replace />;
  } else {
    return <Navigate to="/" replace />;
  }
};

// export default DashboardRedirect;

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setCurrentUser(res.data));
        // console.log(res.data.role);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthForm type="login" key="login" />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <AuthForm type="register" key="register" />
              </PublicRoute>
            }
          />
          {/* <Route path="/dashboard" element={<PublicRoute />} /> */}

          <Route path="/dashboard" element={<SidebarLayout />}>
            <Route index element={<DashboardRedirect />} />
            <Route
              path="admin"
              element={
                <AuthenticateAdmin>
                  <AdminDashboard />
                </AuthenticateAdmin>
              }
            />

            <Route
              path="user"
              element={
                <AuthenticateUser>
                  <UserDashboard />
                </AuthenticateUser>
              }
            />
            <Route
              path="projectmanager"
              element={
                <AuthenticateManager>
                  <ManagerDashboard />
                </AuthenticateManager>
              }
            />

            <Route
              path="all-users"
              element={
                <AuthenticateAdmin>
                  <AllUsers />
                </AuthenticateAdmin>
              }
            />
            <Route
              path="all-projects"
              element={
                <AuthenticateAdmin>
                  <AllProjects />
                </AuthenticateAdmin>
              }
            />
            <Route
              path="all-tasks"
              element={
                <AuthenticateAdmin>
                  <AllTasks />
                </AuthenticateAdmin>
              }
            />

            {/* <AuthenticateManager> */}
            <Route
              path="completed"
              element={
                <AuthenticateManager>
                  <Completed />
                </AuthenticateManager>
              }
            />
            <Route
              path="in-progress"
              element={
                <AuthenticateManager>
                  {" "}
                  <InProgress />
                </AuthenticateManager>
              }
            />
            <Route
              path="teams"
              element={
                <AuthenticateManager>
                  {" "}
                  <Teams />
                </AuthenticateManager>
              }
            />
            <Route
              path="todo"
              element={
                <AuthenticateManager>
                  <Todo />
                </AuthenticateManager>
              }
            />
            <Route path="trash" element={<Trash />} />
            {/* </AuthenticateManager> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
