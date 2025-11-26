import React, { useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  Library,
  User,
  Settings,
  Power,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const TeacherSidebar = ({ setActivePage }) => {
  const [openMenu, setOpenMenu] = useState(null);

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
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <h3 className="mt-2 text-gray-800 font-semibold">Ashton Cox</h3>
        <p className="text-sm text-gray-500">Teacher</p>
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
          to="/leave-request"
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
          to="/subject-taught"
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-blue-50 transition"
        >
          <Library className="w-4 h-4 mr-3" /> Subject Taught
        </Link>

        <Link
          to="/teacher-profile"
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
          onClick={() => setActivePage("logout")}
          className="flex items-center w-full py-2 px-3 mb-1 rounded-md hover:bg-red-50 transition text-red-600"
        >
          <Power className="w-4 h-4 mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;
