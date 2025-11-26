import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddLibrary() {
  const [activePage, setActivePage] = useState("add-library-asset"); // eslint-disable-line no-unused-vars
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
            <span className="font-semibold text-gray-800">Add Library</span>
            <span>›</span>
            <span>Library</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Add Library</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add Library Asset
            </h2>

            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject ID*
                </label>
                <input
                  type="text"
                  placeholder="Enter subject ID"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date*
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Asset Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Type*
                </label>
                <input
                  type="text"
                  placeholder="Enter asset type"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date*
                </label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Shelf Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shelf Location*
                </label>
                <input
                  type="text"
                  placeholder="Enter shelf location"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status*
                </label>
                <select className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select status</option>
                  <option value="available">Available</option>
                  <option value="borrowed">Borrowed</option>
                  <option value="lost">Lost</option>
                  <option value="damaged">Damaged</option>
                </select>
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
