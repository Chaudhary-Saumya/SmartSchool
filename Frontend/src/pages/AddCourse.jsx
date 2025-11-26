import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AddCourse() {
  const [activePage, setActivePage] = useState("add-course"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    course_name: '',
    course_code: '',
    course_details: '',
    start_date: '',
    course_time_length: '',
    course_price: '',
    teacher_id: '',
    max_students: '',
    contact_number: '',
    course_category: '',
    course_duration: '',
    course_level: ''
  });
  const [courseImage, setCourseImage] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch teachers on component mount
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await fetch('http://localhost:3000/api/courses/helpers/teachers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setTeachers(data.data);
          }
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

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
    setCourseImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validate required fields
    if (!formData.course_name || !formData.course_code || !formData.teacher_id || !formData.course_category) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Add form data
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Add course image if selected
      if (courseImage) {
        submitData.append('course_image', courseImage);
      }

      const response = await fetch('http://localhost:3000/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Course added successfully!');
        // Reset form
        setFormData({
          course_name: '',
          course_code: '',
          course_details: '',
          start_date: '',
          course_time_length: '',
          course_price: '',
          teacher_id: '',
          max_students: '',
          contact_number: '',
          course_category: '',
          course_duration: '',
          course_level: ''
        });
        setCourseImage(null);
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      } else {
        setError(data.message || `Failed to add course (${response.status})`);
      }
    } catch (error) {
      console.error('Error adding course:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
            <span className="font-semibold text-gray-800">Add Course</span>
            <span>›</span>
            <span>Course</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Add Course</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Add Course
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
              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name*
                </label>
                <input
                  type="text"
                  name="course_name"
                  value={formData.course_name}
                  onChange={handleInputChange}
                  placeholder="Enter course name"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code*
                </label>
                <input
                  type="text"
                  name="course_code"
                  value={formData.course_code}
                  onChange={handleInputChange}
                  placeholder="Enter course code"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Details */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Details
                </label>
                <textarea
                  name="course_details"
                  value={formData.course_details}
                  onChange={handleInputChange}
                  placeholder="Write course details"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              {/* Course Time Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Time Length*
                </label>
                <input
                  type="text"
                  name="course_time_length"
                  value={formData.course_time_length}
                  onChange={handleInputChange}
                  placeholder="Enter time length (e.g., 3 months)"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Price*
                </label>
                <input
                  type="number"
                  name="course_price"
                  value={formData.course_price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Teacher */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher*
                </label>
                <select
                  name="teacher_id"
                  value={formData.teacher_id}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Max Students */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Students*
                </label>
                <input
                  type="number"
                  name="max_students"
                  value={formData.max_students}
                  onChange={handleInputChange}
                  placeholder="Enter max students"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number*
                </label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="Enter contact number"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Category*
                </label>
                <select
                  name="course_category"
                  value={formData.course_category}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  <option value="arts">Arts</option>
                  <option value="commerce">Commerce</option>
                  <option value="science">Science</option>
                </select>
              </div>

              {/* Course Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Duration*
                </label>
                <input
                  type="text"
                  name="course_duration"
                  value={formData.course_duration}
                  onChange={handleInputChange}
                  placeholder="Enter course duration"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Level*
                </label>
                <input
                  type="text"
                  name="course_level"
                  value={formData.course_level}
                  onChange={handleInputChange}
                  placeholder="Enter course level"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full border rounded-lg px-3 py-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6 md:col-span-2">
              <button
                type="button"
                onClick={() => navigate('/all-courses')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? 'Adding...' : 'Submit'}</span>
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
