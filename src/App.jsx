import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setCurrentUser(res.data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  // if (loading) {
  //   return <div className="flex items-center justify-center h-screen">Loading...</div>;
  // }

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <AuthForm type="login" />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <AuthForm type="register" />
              </PublicRoute>
            }
          />
          {/* <Route path="/dashboard" element={<PublicRoute />} /> */}

          <Route path="/dashboard" element={<SidebarLayout />}>
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
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-projects" element={<AllProjects />} />
            <Route path="all-tasks" element={<AllTasks />} />

            <Route path="completed" element={<Completed />} />
            <Route path="in-progress" element={<InProgress />} />
            <Route path="teams" element={<Teams />} />
            <Route path="todo" element={<Todo />} />
            <Route path="trash" element={<Trash />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
