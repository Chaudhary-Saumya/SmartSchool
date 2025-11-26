import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function EditHoliday() {
  const [activePage, setActivePage] = useState("edit-holiday"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [holidays, setHolidays] = useState([]);
  const [selectedHolidayId, setSelectedHolidayId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    description: '',
    holiday_type: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/holidays', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setHolidays(data);
        } else {
          console.error('Failed to fetch holidays');
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  useEffect(() => {
    if (selectedHolidayId) {
      const selectedHoliday = holidays.find(h => h.id === parseInt(selectedHolidayId));
      if (selectedHoliday) {
        setFormData({
          title: selectedHoliday.title || '',
          start_date: selectedHoliday.start_date ? selectedHoliday.start_date.split('T')[0] : '',
          end_date: selectedHoliday.end_date ? selectedHoliday.end_date.split('T')[0] : '',
          description: selectedHoliday.description || '',
          holiday_type: selectedHoliday.holiday_type || '',
          location: selectedHoliday.location || ''
        });
      }
    } else {
      setFormData({
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        holiday_type: '',
        location: ''
      });
    }
  }, [selectedHolidayId, holidays]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedHolidayId) {
      alert('Please select a holiday to edit');
      return;
    }

    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/holidays/update/${selectedHolidayId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Holiday updated successfully');
        navigate('/all-holidays');
      } else {
        const errorData = await response.json();
        alert('Error updating holiday: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error updating holiday:', error);
      alert('Error updating holiday');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f8f9fc] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
            <span className="font-semibold text-gray-800">Edit Holiday</span>
            <span>›</span>
            <span>Holiday</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Edit Holiday</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edit Holiday
            </h2>

            {/* Holiday Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Holiday to Edit*
              </label>
              <select
                value={selectedHolidayId}
                onChange={(e) => setSelectedHolidayId(e.target.value)}
                className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a holiday</option>
                {holidays.map((holiday) => (
                  <option key={holiday.id} value={holiday.id}>
                    {holiday.title} ({holiday.start_date} - {holiday.end_date})
                  </option>
                ))}
              </select>
            </div>

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
            </form>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate('/all-holidays')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update'}
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
