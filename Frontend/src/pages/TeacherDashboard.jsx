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
import { Book, Edit, Trash2, FileText } from "lucide-react";
import TeacherDashboard2 from "../components/TeacherDashboard2";

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
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
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
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.user.name || "Teacher",
            profileImage:
              data.user.profileImage ||
              "https://randomuser.me/api/portraits/men/32.jpg",
          });
        } else {
          setUser({
            name: "Teacher",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          name: "Teacher",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
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

  // Dummy Data
  const classSchedule = [
    {
      time: "08:00 - 09:30",
      subject: "Mathematics",
      room: "Room 101",
      color: "bg-gray-300",
    },
    {
      time: "10:00 - 11:30",
      subject: "Science",
      room: "Lab 3",
      color: "bg-gray-300",
    },
    {
      time: "13:00 - 14:30",
      subject: "English Literature",
      room: "Room 203",
      color: "bg-gray-300",
    },
    {
      time: "15:00 - 16:30",
      subject: "History",
      room: "Room 105",
      color: "bg-blue-400",
    },
    {
      time: "07:30 - 09:00",
      subject: "Mathematics - Algebra",
      room: "Room 201",
      color: "bg-gray-300",
    },
    {
      time: "09:15 - 10:45",
      subject: "Physics - Mechanics",
      room: "Lab 4",
      color: "bg-green-400",
    },
  ];

  const lectures = [
    {
      subject: "Biology",
      standard: "Standard 12",
      time: "12:00 AM",
      duration: "35 Min",
    },
    {
      subject: "Physics",
      standard: "Standard 11",
      time: "12:45 AM",
      duration: "30 Min",
    },
    {
      subject: "Music",
      standard: "Standard 8",
      time: "02:00 AM",
      duration: "45 Min",
    },
    {
      subject: "Computer studies",
      standard: "Standard 10",
      time: "03:30 AM",
      duration: "35 Min",
    },
    {
      subject: "Mathematics",
      standard: "Standard 9",
      time: "09:00 AM",
      duration: "40 Min",
    },
    {
      subject: "History",
      standard: "Standard 10",
      time: "01:00 PM",
      duration: "50 Min",
    },
    {
      subject: "Geography",
      standard: "Standard 11",
      time: "02:00 PM",
      duration: "30 Min",
    },
    {
      subject: "Physical Education",
      standard: "Standard 12",
      time: "03:00 PM",
      duration: "45 Min",
    },
  ];

  const studentProgress = [
    { name: "John Smith", subject: "Mathematics", grade: "A", progress: 85 },
    { name: "Emily Johnson", subject: "Science", grade: "A+", progress: 92 },
    { name: "Michael Brown", subject: "English", grade: "B+", progress: 78 },
    { name: "Sarah Davis", subject: "History", grade: "C+", progress: 65 },
    { name: "David Wilson", subject: "Physics", grade: "A-", progress: 88 },
    { name: "Laura Martinez", subject: "Chemistry", grade: "B", progress: 75 },
  ];

  const notes = [
    { color: "bg-yellow-200", text: "Welcome to Quick Notes! 📝" },
    {
      color: "bg-orange-200",
      text: "Click the palette icon to change note color 🎨",
    },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];
  const attendance = [
    { name: "Present", value: 85 },
    { name: "Absent", value: 10 },
    { name: "Late", value: 5 },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      <TeacherSidebar
        setActivePage={setActivePage}
        logoutHandler={logoutHandler}
      />
      <div className="flex-1 flex flex-col">
        <TeacherTopbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* existing dashboard top area */}
          <div className="mb-4 flex items-center space-x-2 text-gray-600 text-sm">
            <span className="font-semibold text-gray-800 text-lg">
              Dashboard
            </span>
            <span>›</span>
            <span>Teacher</span>
            <span>›</span>
            <span className="text-gray-500">Dashboard</span>
          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Welcome back
              </h2>
              <h1 className="text-2xl font-bold text-blue-600 mb-2">
                {loading ? "Loading..." : `${user.name}!`}
              </h1>
              <p className="text-gray-600 text-sm max-w-xl">
                We would like to take this opportunity to welcome you to our
                practice and to thank you for choosing our physicians to
                participate in your healthcare. We look forward to providing you
                with personalized, comprehensive health care focusing on
                wellness and prevention.
              </p>
            </div>
            <img
              src={user.profileImage}
              alt="teacher profile"
              className="w-28 h-28 rounded-full border-4 border-blue-100"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                <span className="text-lg font-semibold text-gray-700">65</span>{" "}
                (Average)
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

          {/* ========================= NEW TEACHER DASHBOARD SECTION ========================= */}
          <div className="space-y-6">
            {/* ===== Row 1: Two Components ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Class Schedule */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700 text-md">
                    Today's Class Schedule
                  </h3>
                  <a
                    href="#"
                    className="text-blue-500 text-sm font-medium hover:underline"
                  >
                    View All
                  </a>
                </div>
                <div className="space-y-3">
                  {classSchedule.map((cls, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center border-b pb-2 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {cls.time}
                        </p>
                        <p className="text-gray-600">{cls.subject}</p>
                        <p className="text-xs text-gray-400">{cls.room}</p>
                      </div>
                      <span
                        className={`w-3 h-3 rounded-full ${cls.color}`}
                      ></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Lecture */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700 text-md">
                    Today's Lecture
                  </h3>
                  <a
                    href="#"
                    className="text-blue-500 text-sm font-medium hover:underline"
                  >
                    View All
                  </a>
                </div>
                <table className="w-full text-sm text-gray-700">
                  <tbody>
                    {lectures.map((lec, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-2">{lec.subject}</td>
                        <td>{lec.standard}</td>
                        <td>{lec.time}</td>
                        <td>{lec.duration}</td>
                        <td className="flex space-x-2">
                          <FileText className="text-blue-500 w-4 h-4 cursor-pointer" />
                          <Edit className="text-orange-500 w-4 h-4 cursor-pointer" />
                          <Trash2 className="text-red-500 w-4 h-4 cursor-pointer" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== Row 2: Three Components ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Student Progress */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Student Progress
                </h3>
                <div className="space-y-2">
                  {studentProgress.map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-gray-700">
                        <span>{s.name}</span>
                        <span>{s.subject}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: `${s.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{s.progress}%</span>
                        <span>Grade: {s.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Overview */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Attendance Overview
                </h3>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={attendance}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {attendance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-green-600 font-semibold">
                    85% Present
                  </span>
                  <span className="text-red-500 font-semibold">10% Absent</span>
                  <span className="text-yellow-500 font-semibold">5% Late</span>
                </div>
                <p className="text-center text-xs text-gray-500 mt-2">
                  Total Students: 100
                </p>
              </div>

              {/* Quick Notes */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Quick Notes
                </h3>
                <textarea
                  placeholder="Add a new note"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
                <button className="w-full bg-gray-100 text-gray-600 text-sm rounded-full py-1.5 mb-3 hover:bg-gray-200 transition">
                  + Add Note
                </button>
                <div className="space-y-2">
                  {notes.map((note, i) => (
                    <div
                      key={i}
                      className={`${note.color} p-3 rounded-md text-gray-700 text-sm shadow-sm`}
                    >
                      {note.text}
                      <p className="text-[10px] text-gray-500 mt-1">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <TeacherDashboard2/>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
