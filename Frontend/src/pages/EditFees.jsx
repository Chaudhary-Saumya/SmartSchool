import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function EditFees() {
  const [activePage, setActivePage] = useState("edit-fees"); // eslint-disable-line no-unused-vars
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
            <span className="font-semibold text-gray-800">Edit Fees</span>
            <span>›</span>
            <span>Fees</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Edit Fees</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edit Fees
            </h2>

            {/* Form */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Name*
                </label>
                <select className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Student</option>
                  <option value="john-doe">John Doe</option>
                  <option value="jane-smith">Jane Smith</option>
                  <option value="alex-johnson">Alex Johnson</option>
                  <option value="emily-davis">Emily Davis</option>
                </select>
              </div>

              {/* Money */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount*
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
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
                Update
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
