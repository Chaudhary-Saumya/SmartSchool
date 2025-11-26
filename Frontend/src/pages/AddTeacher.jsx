import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddTeacher() {
  const [activePage, setActivePage] = useState("add-teacher"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    mobile_number: '',
    location: '',
    about: '',
    education: '',
    experience: '',
    conferences_courses: []
  });
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Form submitted with data:', formData);
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.mobile_number || !formData.location) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Add basic user data
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('password', formData.password);
      submitData.append('role', 'teacher');
      submitData.append('address', formData.address);
      submitData.append('mobile_number', formData.mobile_number);
      submitData.append('location', formData.location);
      submitData.append('about', formData.about);

      // Add profile image if selected
      if (profileImage) {
        submitData.append('profile_image', profileImage);
      }

      // Add teacher-specific data
      if (formData.education) {
        submitData.append('education', formData.education);
      }
      if (formData.experience) {
        submitData.append('experience', formData.experience);
      }
      if (formData.conferences_courses && formData.conferences_courses.length > 0) {
        submitData.append('conferences_courses', JSON.stringify(formData.conferences_courses));
      }

      console.log('Sending request to API...');
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setSuccess('Teacher account created successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          mobile_number: '',
          location: '',
          about: '',
          education: '',
          experience: '',
          conferences_courses: []
        });
        setProfileImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        } else {
          console.log('API Error:', data);
          setError(data.message || `Failed to create teacher account (${response.status})`);
        }
    } catch (error) {
      console.error('Error creating teacher:', error);
      setError('Network error. Please try again.');
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
            <span className="font-semibold text-gray-800">Add Teacher</span>
            <span>›</span>
            <span>Teacher</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Add Teacher</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add Teacher
            </h2>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Profile Picture */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full border rounded-lg px-3 py-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  placeholder="Enter mobile number"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Education */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Enter education qualification"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Enter years of experience"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* About */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Write about teacher"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6 md:col-span-2">
                <button
                  type="button"
                  onClick={() => navigate('/all-teachers')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={(e) => {
                    console.log('Submit button clicked');
                    if (!loading) handleSubmit(e);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loading ? 'Creating...' : 'Create Teacher'}</span>
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
