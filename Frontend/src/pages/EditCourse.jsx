import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function EditCourse() {
  const [activePage, setActivePage] = useState("edit-course"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
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
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Fetch courses
        const coursesRes = await fetch('http://localhost:3000/api/courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData.data || []);
        }

        // Fetch teachers
        const teachersRes = await fetch('http://localhost:3000/api/courses/helpers/teachers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (teachersRes.ok) {
          const teachersData = await teachersRes.json();
          setTeachers(teachersData.data || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      const fetchCourse = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:3000/api/courses/${selectedCourseId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setFormData({
                course_name: data.data.course_name || '',
                course_code: data.data.course_code || '',
                course_details: data.data.course_details || '',
                start_date: data.data.start_date ? data.data.start_date.split('T')[0] : '',
                course_time_length: data.data.course_time_length || '',
                course_price: data.data.course_price || '',
                teacher_id: data.data.teacher_id || '',
                max_students: data.data.max_students || '',
                contact_number: data.data.contact_number || '',
                course_category: data.data.course_category || '',
                course_duration: data.data.course_duration || '',
                course_level: data.data.course_level || ''
              });
            }
          }
        } catch (error) {
          console.error('Error fetching course:', error);
        }
      };

      fetchCourse();
    } else {
      // Reset form when no course selected
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
      setImageFile(null);
    }
  }, [selectedCourseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Selected course ID:', selectedCourseId);

    if (!selectedCourseId) {
      alert('Please select a course to edit');
      return;
    }

    setUpdating(true);
    console.log('Updating state set to true');

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token ? 'Present' : 'Missing');

      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
          console.log(`Appending ${key}:`, formData[key]);
        }
      });

      // Append image if selected
      if (imageFile) {
        formDataToSend.append('course_image', imageFile);
        console.log('Appending image file:', imageFile.name);
      }

      console.log('Making API call to:', `http://localhost:3000/api/courses/${selectedCourseId}`);

      const response = await fetch(`http://localhost:3000/api/courses/${selectedCourseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const result = await response.json();
        console.log('Success response:', result);
        alert('Course updated successfully');
        navigate('/all-courses');
      } else {
        const errorData = await response.json();
        console.error('Update error:', errorData);
        alert('Error updating course: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Error updating course: ' + error.message);
    } finally {
      setUpdating(false);
      console.log('Updating state set to false');
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
            <span className="font-semibold text-gray-800">Edit Course</span>
            <span>›</span>
            <span>Course</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Edit Course</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edit Course
            </h2>

            {/* Course Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Course to Edit*
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name} ({course.course_code})
                  </option>
                ))}
              </select>
            </div>

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

              {/* Teacher Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teacher Name*
                </label>
                <select
                  name="teacher_id"
                  value={formData.teacher_id}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((teacher) => (
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
                <select
                  name="course_level"
                  value={formData.course_level}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded-lg px-3 py-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={() => navigate('/all-courses')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
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
