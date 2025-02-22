import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../utility/authSlice";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type === "register") {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email");
        setLoading(false);
        return;
      }
      if (!passwordRegex.test(formData.password)) {
        toast.error(
          "Password must be at least 8 characters long and contain at least one number, one uppercase, and one lowercase letter"
        );
        setLoading(false);
        return;
      }
    }

    if (type === "login") {
      if (!formData.email || !formData.password) {
        toast.error("Email and password are required");
        setLoading(false);
        return;
      }
      if (!emailRegex.test(formData.email)) {
        toast.error("Invalid email");
        setLoading(false);
        return;
      }
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/${type}`,
        formData
      );
      toast.success(res.data.message);
      setFormData({
        name: "",
        email: "",
        tile: "",
        password: "",
        role: "",
      });
      if (type === "register") {
        navigate("/");
      } else if (res.data?.user?.role?.includes("admin")) {
        const token = res.data.token;
        const refresh_token = res.data.refresh_token;

        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        dispatch(setCurrentUser(res.data.user));
        navigate("/dashboard/admin");
      } else if (res.data?.user?.role?.includes("projectmanager")) {
        const refresh_token = res.data.refresh_token;
        const token = res.data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        dispatch(setCurrentUser(res.data.user));
        navigate("/dashboard/projectmanager");
      } else {
        dispatch(setCurrentUser(res.data.user));
        const token = res.data.token;
        const refresh_token = res.data.refresh_token;
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refresh_token);
        navigate("/dashboard/user");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Marketing / Icon */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center p-8">
        <div className="text-center">
          {/* Replace this SVG with a project management icon/image as needed */}
          <svg
            className="w-24 h-24 text-white mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h3m3 0h3m-9 0v3m0-3v-3m0-4h.01M12 7h.01M12 11h.01M12 15h.01M12 19h.01M9 19h.01M15 19h.01M9 7h.01M15 7h.01"
            />
          </svg>
          <h2 className="text-white text-3xl font-bold">Project Manager</h2>
          <p className="text-white mt-2">
            Streamline your workflow and manage projects effectively.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {type === "login" ? "Login" : "Register"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "register" && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {type === "register" && (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="projectmanager">Project Manager</option>
                <option value="user">User</option>
              </select>
            )}
            {type === "register" && (
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Title</option>
                <option value="data analyst">Data Analyst</option>
                <option value="developer">Developer</option>
                <option value="designer">UX/UI Designer</option>
                <option value="tester">Tester</option>
              </select>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition duration-300"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : type === "login"
                ? "Login"
                : "Register"}
            </button>
          </form>
          <hr className="my-6 border-gray-300" />
          <p className="text-center">
            {type === "login" ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-500 hover:underline"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/" className="text-indigo-500 hover:underline">
                  Login
                </Link>
              </>
            )}
          </p>
        </div>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default AuthForm;
