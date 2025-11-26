import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Users,
  Library,
  User,
  Settings,
  Power,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

const TeacherSidebar = ({ logoutHandler }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState({
    name: "Loading...",
    role: "Teacher",
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
            name: data.user.name || "Teacher User",
            role: data.user.role || "Teacher",
            profileImage: data.user.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"
          });
        } else {
          // If profile fetch fails, use default values
          setUser({
            name: "Teacher User",
            role: "Teacher",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          name: "Teacher User",
          role: "Teacher",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const _toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-64 bg-white shadow-sm h-screen p-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="logo"
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-xl font-bold text-gray-700">Smart</h1>
      </div>

      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profileImage}
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <h3 className="mt-2 text-gray-800 font-semibold">
          {loading ? "Loading..." : user.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto text-gray-700">
        <p className="text-xs text-gray-500 mb-2 font-semibold tracking-widest">
          TEACHER
        </p>

        <Link
          to="/teacherDashboard"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
        </Link>

        <Link
          to="/lectures"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <BookOpen className="w-4 h-4 mr-3" /> Lectures
        </Link>

        <Link
          to="/leaveRequest"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <ClipboardList className="w-4 h-4 mr-3" /> Leave Request
        </Link>

        <Link
          to="/exam-schedule"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <GraduationCap className="w-4 h-4 mr-3" /> Exam Schedule
        </Link>

        <Link
          to="/my-classes"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <Users className="w-4 h-4 mr-3" /> My Classes
        </Link>

        <Link
          to="/subjectsTaught"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <Library className="w-4 h-4 mr-3" /> Subject Taught
        </Link>

        <Link
          to="/about-teacher"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <User className="w-4 h-4 mr-3" /> Profile
        </Link>

        <Link
          to="/teacher-settings"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <Settings className="w-4 h-4 mr-3" /> Settings
        </Link>

        <button
          onClick={logoutHandler}
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-red-50 transition text-red-600"
        >
          <Power className="w-4 h-4 mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;
