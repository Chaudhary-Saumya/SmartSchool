import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Settings,
  User,
  BookOpen,
  Briefcase,
  Code,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AboutStaffs() {
  const [activePage, setActivePage] = useState("about-staffs"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      {role === "admin" ? (
        <AdminSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      ) : role === "teacher" ? (
        <TeacherSidebar setActivePage={setActivePage} logoutHandler={logoutHandler} />
      ) : null}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-2">
        <span className="font-semibold text-gray-800">Profile</span>
        <span>›</span>
        <span>Staff</span>
        <span>›</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-400 text-white text-center py-8">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Staff"
              className="w-28 h-28 mx-auto rounded-full border-4 border-white mb-4"
            />
            <h2 className="text-xl font-semibold">Michael Johnson</h2>
            <p className="text-sm opacity-90">Administrative Assistant</p>
          </div>

          <div className="p-5 text-center border-b border-gray-200">
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>789, Oak Street, Business District, New York</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>(555) 123 4567</span>
            </div>
          </div>

          <div className="flex justify-around text-center py-4">
            <div>
              <h4 className="font-semibold text-gray-800">200</h4>
              <p className="text-xs text-gray-500">FOLLOWING</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">2k</h4>
              <p className="text-xs text-gray-500">FOLLOWERS</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">150</h4>
              <p className="text-xs text-gray-500">POSTS</p>
            </div>
          </div>

          {/* About / Skills Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b text-gray-700 text-sm">
              <button className="w-1/2 py-2 flex items-center justify-center gap-2 border-b-2 border-blue-600 font-medium text-blue-600">
                <User className="w-4 h-4" /> About
              </button>
              <button className="w-1/2 py-2 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600">
                <Code className="w-4 h-4" /> Skills
              </button>
            </div>

            <div className="p-4 text-sm text-gray-700">
              <p className="mb-3">
                Hello, I am Michael Johnson, an Administrative Assistant at XYZ College. I handle
                administrative tasks and support the staff and students.
              </p>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Gender</span>
                  <span>Male</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">
                    Years of Service
                  </span>
                  <span>5</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Department</span>
                  <span>Administration</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Role</span>
                  <span>Assistant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm relative">
          {/* Tabs */}
          <div className="flex justify-between border-b border-gray-200 text-sm text-gray-600">
            <div className="flex">
              <button className="px-6 py-3 flex items-center gap-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                <User className="w-4 h-4" /> About Me
              </button>
              <button className="px-6 py-3 flex items-center gap-2 hover:text-blue-600">
                <BookOpen className="w-4 h-4" /> Responsibilities & Achievements
              </button>
            </div>
            <button className="px-6 py-3 flex items-center gap-2 hover:text-blue-600">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>

          {/* About Me Content */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> About Me
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
              <p>
                <span className="font-medium text-gray-700">Full Name: </span>
                Michael Johnson
              </p>
              <p>
                <span className="font-medium text-gray-700">Mobile: </span>
                (555) 123 4567
              </p>
              <p>
                <span className="font-medium text-gray-700">Email: </span>
                michael.johnson@example.com
              </p>
              <p>
                <span className="font-medium text-gray-700">Location: </span>
                New York, USA
              </p>
            </div>

            <p className="text-gray-700 text-sm mb-4">
              I have been working as an administrative assistant for 5 years, handling various office tasks,
              managing schedules, and supporting the college administration.
            </p>

            <p className="text-gray-700 text-sm mb-6">
              My role involves coordinating events, maintaining records, and ensuring smooth operations.
              I am dedicated to providing excellent support to the college community.
            </p>

            {/* Education */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Education
            </h3>
            <div className="text-sm text-gray-700 space-y-3 mb-6">
              <div>
                <p className="font-medium">
                  B.A. in Business Administration, New York University
                </p>
                <p className="text-xs text-gray-500">
                  2010-2014 • Business Studies
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Certificate in Office Management, Local College
                </p>
                <p className="text-xs text-gray-500">
                  2015 • Professional Development
                </p>
              </div>
            </div>

            {/* Experience */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Experience
            </h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <p className="font-medium">
                  Administrative Assistant at XYZ College
                </p>
                <p className="text-xs text-gray-500">2019-Present</p>
              </div>
              <div>
                <p className="font-medium">
                  Office Assistant at ABC Corporation
                </p>
                <p className="text-xs text-gray-500">2014-2019</p>
              </div>
              <div>
                <p className="font-medium">Intern at DEF Company</p>
              </div>
            </div>
          </div>

          {/* Floating Settings Button */}
          <button className="absolute right-[-18px] top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
