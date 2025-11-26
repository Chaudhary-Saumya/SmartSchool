import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddHoliday() {
  const [activePage, setActivePage] = useState("add-holiday"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    holiday_type: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/holidays/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Holiday added successfully');
        navigate('/all-holidays');
      } else {
        const errorData = await response.json();
        alert('Error adding holiday: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error adding holiday:', error);
      alert('Error adding holiday');
    } finally {
      setLoading(false);
    }
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
            <span className="font-semibold text-gray-800">Add Holiday</span>
            <span>›</span>
            <span>Holiday</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Add Holiday</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add Holiday
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter holiday title"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write holiday description"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Holiday Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Type*
                </label>
                <select
                  name="holiday_type"
                  value={formData.holiday_type}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select holiday type</option>
                  <option value="Public">Public</option>
                  <option value="By School">By School</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select location</option>
                  <option value="Global">Global</option>
                  <option value="School">School</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => navigate('/all-holidays')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Holiday'}
                </button>
              </div>
            </form>

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
