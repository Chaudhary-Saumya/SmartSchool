import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddDepartment() {
  const [activePage, setActivePage] = useState("add-department"); // eslint-disable-line no-unused-vars
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
            <span className="font-semibold text-gray-800">Add Department</span>
            <span>›</span>
            <span>Department</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Add Department</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add Department
            </h2>

            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department*
                </label>
                <select className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Any Department</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                </select>
              </div>

              {/* Head Of Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head Of Department*
                </label>
                <input
                  type="text"
                  placeholder="HOD name required"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone*
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Start Date*
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Student Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Capacity*
                </label>
                <input
                  type="number"
                  placeholder="Enter student capacity"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  placeholder="Write department details"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Building Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building Name*
                </label>
                <input
                  type="text"
                  placeholder="Enter building name"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Number of Classrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Classrooms*
                </label>
                <input
                  type="number"
                  placeholder="Enter number of classrooms"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Website*
                </label>
                <input
                  type="url"
                  placeholder="Enter department website"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit
              </button>
            </div>

            {/* Floating Settings Button */}
            <button className="absolute right-[-18px] top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
