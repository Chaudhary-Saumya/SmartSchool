import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherTopbar from "../components/TeacherTopbar";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [activePage, setActivePage] = useState("teacher-dashboard"); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [user, setUser] = useState({
    name: "Loading...",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.user.name || "Teacher",
            profileImage: data.user.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"
          });
        } else {
          // If profile fetch fails, use default values
          setUser({
            name: "Teacher",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          name: "Teacher",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const lectureData = [
    { month: "Feb", lectures: 72 },
    { month: "March", lectures: 62 },
    { month: "April", lectures: 71 },
    { month: "May", lectures: 65 },
  ];

  const subjectData = [
    { name: "Music", value: 23, color: "#0ea5e9", change: "+32%" },
    { name: "Science", value: 32, color: "#3b82f6", change: "+12%" },
    { name: "Economics", value: 12, color: "#f97316", change: "-12%" },
    { name: "Mathes", value: 32, color: "#22c55e", change: "+3%" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      <TeacherSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      <div className="flex-1 flex flex-col">
        <TeacherTopbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center space-x-2 text-gray-600 text-sm">
            <span className="font-semibold text-gray-800 text-lg">Dashboard</span>
            <span>›</span>
            <span>Teacher</span>
            <span>›</span>
            <span className="text-gray-500">Dashboard</span>
          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Welcome back</h2>
              <h1 className="text-2xl font-bold text-blue-600 mb-2">
                {loading ? "Loading..." : `${user.name}!`}
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                We would like to take this opportunity to welcome you to our practice
                and to thank you for choosing our physicians to participate in your
                healthcare. We look forward to providing you with personalized,
                comprehensive health care focusing on wellness and prevention.
              </p>
            </div>
            <div className="flex flex-col items-center">
            <img
                src={user.profileImage}
                alt="teacher profile"
                className="w-30 h-30 rounded-full mb-4 border-4 border-blue-100"
            />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Average Lecture Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-gray-800">
                  Average Lecture Per Month
                </h3>
                <a
                  href="#"
                  className="text-blue-500 text-sm font-medium hover:underline"
                >
                  View All
                </a>
              </div>
              <p className="text-gray-500 text-sm mb-2">
                <span className="text-lg font-semibold text-gray-700">65</span> (Average)
              </p>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lectureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="lectures"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Subject Chart */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="text-md font-semibold text-gray-800 mb-4">
                Subject Chart
              </h3>
              <div className="flex items-center justify-between">
                <ResponsiveContainer width="50%" height={250}>
                  <PieChart>
                    <Pie
                      data={subjectData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3 w-1/2">
                  {subjectData.map((subject, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-sm text-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        ></span>
                        <span>{subject.name}</span>
                      </div>
                      <span>{subject.value}</span>
                      <span
                        className={`${
                          subject.change.startsWith("-")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {subject.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
