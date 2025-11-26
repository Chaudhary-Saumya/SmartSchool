import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddLibrary() {
  const [activePage, setActivePage] = useState("add-library-asset"); // eslint-disable-line no-unused-vars
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subject_id: '',
    purchase_date: '',
    asset_type: '',
    due_date: '',
    shelf_location: '',
    status: 'available'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Fetch subjects on component mount
  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        console.error('Failed to fetch subjects');
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.subject_id) {
      newErrors.subject_id = 'Subject is required';
    }

    if (!formData.purchase_date) {
      newErrors.purchase_date = 'Purchase date is required';
    }

    if (!formData.asset_type) {
      newErrors.asset_type = 'Asset type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/library/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Library asset added successfully!');
        // Reset form
        setFormData({
          title: '',
          subject_id: '',
          purchase_date: '',
          asset_type: '',
          due_date: '',
          shelf_location: '',
          status: 'available'
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        alert('Error adding library asset: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding library asset:', error);
      alert('Error adding library asset');
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
                  placeholder="Enter title"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject*
                </label>
                <select
                  name="subject_id"
                  value={formData.subject_id}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.subject_id ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select subject</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {errors.subject_id && <p className="text-red-500 text-xs mt-1">{errors.subject_id}</p>}
              </div>

              {/* Purchase Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Purchase Date*
                </label>
                <input
                  type="date"
                  name="purchase_date"
                  value={formData.purchase_date}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.purchase_date ? 'border-red-500' : ''
                  }`}
                />
                {errors.purchase_date && <p className="text-red-500 text-xs mt-1">{errors.purchase_date}</p>}
              </div>

              {/* Asset Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asset Type*
                </label>
                <select
                  name="asset_type"
                  value={formData.asset_type}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.asset_type ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select asset type</option>
                  <option value="Book">Book</option>
                  <option value="CD">CD</option>
                  <option value="DVD">DVD</option>
                  <option value="Newspaper">Newspaper</option>
                </select>
                {errors.asset_type && <p className="text-red-500 text-xs mt-1">{errors.asset_type}</p>}
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Shelf Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shelf Location
                </label>
                <input
                  type="text"
                  name="shelf_location"
                  value={formData.shelf_location}
                  onChange={handleInputChange}
                  placeholder="Enter shelf location"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="borrowed">Borrowed</option>
                  <option value="lost">Lost</option>
                  <option value="damaged">Damaged</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Adding...' : 'Submit'}
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
