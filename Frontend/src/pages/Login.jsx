import React, { useState } from "react";
import { Eye, EyeOff, User as UserIcon } from "lucide-react";
import loginImage from "../assets/loginImage.png"; // 👈 Replace with your uploaded image path
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin");
  const [email, setEmail] = useState("admin"); // Controlled for email input
  const [password, setPassword] = useState("********"); // Controlled for password input
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", { // updated URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  // added credentials option
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed");
        return;
      }

      const data = await response.json();
      // Save token for authenticated requests
      localStorage.setItem("token", data.token);
      // Save role for role-based UI components
      localStorage.setItem("role", data.user.role);

      // Redirect based on role from backend response user object
      const userRole = data.user.role;
      if (userRole === "admin") {
        navigate("/adminDashboard");
      } else if (userRole === "teacher") {
        navigate("/teacherDashboard");
      } else if (userRole === "student") {
        navigate("/studentDashboard");
      } else {
        // fallback route or error
        setError("Unknown role");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#f4f5fa]">
        <img
          src={loginImage}
          alt="Illustration"
          className="max-w-[80%] h-auto"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-sm">
          {/* Logo & Title */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="School"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-2xl font-semibold text-[#007BFF]">
              Welcome to Smart School
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Need an account?{" "}
              <Link to="/register" className="text-[#007BFF] cursor-pointer hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Role Selection */}
          <div className="mt-6 flex flex-col items-center">
            <p className="text-gray-500 text-sm mb-2">Select your role</p>
            <div className="flex space-x-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium flex items-center space-x-2 shadow-sm transition ${
                  selectedRole === "admin"
                    ? "bg-green-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedRole("admin")}
              >
                <span className="text-sm">🧑‍💼 Admin</span>
              </button>

              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium flex items-center space-x-2 shadow-sm transition ${
                  selectedRole === "teacher"
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedRole("teacher")}
              >
                <span className="text-sm">👩‍🏫 Teacher</span>
              </button>

              <button
                type="button"
                className={`px-4 py-2 rounded-md font-medium flex items-center space-x-2 shadow-sm transition ${
                  selectedRole === "student"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedRole("student")}
              >
                <span className="text-sm">🎓 Student</span>
              </button>
            </div>
          </div>

          {/* Sign In Form */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="border-l-4 border-blue-500 mr-2 h-5"></span> Sign in
            </h2>

            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Username */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username*"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <UserIcon
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <Link to="/register" className="text-blue-500 hover:underline font-medium">
                  Register
                </Link>
              </div>

              {/* Display error */}
              {error && (
                <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-full mt-5 font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
