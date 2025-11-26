import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddDepartment() {
  const [activePage, setActivePage] = useState("add-department"); // eslint-disable-line no-unused-vars
  const [formData, setFormData] = useState({
    name: '',
    head_of_department: '',
    phone: '',
    email: '',
    start_date: '',
    student_capacity: '',
    details: '',
    building_name: '',
    number_of_classrooms: '',
    website: ''
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

    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }

    if (!formData.head_of_department.trim()) {
      newErrors.head_of_department = 'Head of department is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
    }

    if (!formData.student_capacity || formData.student_capacity <= 0) {
      newErrors.student_capacity = 'Student capacity must be greater than 0';
    }

    if (!formData.building_name.trim()) {
      newErrors.building_name = 'Building name is required';
    }

    if (!formData.number_of_classrooms || formData.number_of_classrooms <= 0) {
      newErrors.number_of_classrooms = 'Number of classrooms must be greater than 0';
    }

    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
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
      const response = await fetch('http://localhost:3000/api/departments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Department added successfully!');
        // Reset form
        setFormData({
          name: '',
          head_of_department: '',
          phone: '',
          email: '',
          start_date: '',
          student_capacity: '',
          details: '',
          building_name: '',
          number_of_classrooms: '',
          website: ''
        });
        setErrors({});
      } else {
        alert('Error adding department: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Error adding department');
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department*
                </label>
                <select
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Any Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Economics">Economics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Geography">Geography</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Law">Law</option>
                </select>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Head Of Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head Of Department*
                </label>
                <input
                  type="text"
                  name="head_of_department"
                  value={formData.head_of_department}
                  onChange={handleInputChange}
                  placeholder="HOD name required"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.head_of_department ? 'border-red-500' : ''
                  }`}
                />
                {errors.head_of_department && <p className="text-red-500 text-xs mt-1">{errors.head_of_department}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone*
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Department Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Start Date*
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.start_date ? 'border-red-500' : ''
                  }`}
                />
                {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
              </div>

              {/* Student Capacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Capacity*
                </label>
                <input
                  type="number"
                  name="student_capacity"
                  value={formData.student_capacity}
                  onChange={handleInputChange}
                  placeholder="Enter student capacity"
                  min="1"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.student_capacity ? 'border-red-500' : ''
                  }`}
                />
                {errors.student_capacity && <p className="text-red-500 text-xs mt-1">{errors.student_capacity}</p>}
              </div>

              {/* Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
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
                  name="building_name"
                  value={formData.building_name}
                  onChange={handleInputChange}
                  placeholder="Enter building name"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.building_name ? 'border-red-500' : ''
                  }`}
                />
                {errors.building_name && <p className="text-red-500 text-xs mt-1">{errors.building_name}</p>}
              </div>

              {/* Number of Classrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Classrooms*
                </label>
                <input
                  type="number"
                  name="number_of_classrooms"
                  value={formData.number_of_classrooms}
                  onChange={handleInputChange}
                  placeholder="Enter number of classrooms"
                  min="1"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.number_of_classrooms ? 'border-red-500' : ''
                  }`}
                />
                {errors.number_of_classrooms && <p className="text-red-500 text-xs mt-1">{errors.number_of_classrooms}</p>}
              </div>

              {/* Department Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Enter department website"
                  className={`w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.website ? 'border-red-500' : ''
                  }`}
                />
                {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => {
                  setFormData({
                    name: '',
                    head_of_department: '',
                    phone: '',
                    email: '',
                    start_date: '',
                    student_capacity: '',
                    details: '',
                    building_name: '',
                    number_of_classrooms: '',
                    website: ''
                  });
                  setErrors({});
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit'}
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
