import React, { useState, useEffect } from "react";
import { Settings, Clock, Star, Heart, MessageSquare, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";
import { useNavigate, useParams } from 'react-router-dom';

export default function AboutCourse() {
  const [activePage, setActivePage] = useState("about-course"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();
  const { id } = useParams();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/courses/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCourse(data.data);
          } else {
            setError('Course not found');
          }
        } else {
          setError('Failed to fetch course');
        }
      } catch (err) {
        setError('Error fetching course');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#f8f9fc] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex h-screen bg-[#f8f9fc] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'Course not found'}</p>
        </div>
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
            <span className="font-semibold text-gray-800">About Course</span>
            <span>›</span>
            <span>Course</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">About Course</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Course Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Image and Basic Info */}
              <div className="lg:col-span-1">
                <img
                  src={course.course_image ? `http://localhost:3000${course.course_image}` : "https://cdn-icons-png.flaticon.com/512/2920/2920277.png"}
                  alt={course.course_name}
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Category:</span>
                    <span className="text-sm text-gray-600">{course.course_category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <span className="text-sm text-gray-600">{course.course_duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-600">4.5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Price:</span>
                    <span className="text-sm text-gray-600">{course.course_price ? `$${course.course_price}` : 'Free'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Level:</span>
                    <span className="text-sm text-gray-600">{course.course_level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Language:</span>
                    <span className="text-sm text-gray-600">English</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Enrolled:</span>
                    <span className="text-sm text-gray-600">{course.max_students || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Start Date:</span>
                    <span className="text-sm text-gray-600">{course.start_date}</span>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.course_name}
                  </h3>
                  <p className="text-gray-600 mb-4">{course.course_details}</p>
                </div>

                {/* Instructor */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Instructor</h4>
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://randomuser.me/api/portraits/${course.id % 2 === 0 ? "men" : "women"}/${course.id + 10}.jpg`}
                      alt={course.teacher_name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{course.teacher_name}</p>
                      <p className="text-sm text-gray-600">Course Instructor</p>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Course Code:</span>
                      <span className="text-sm text-gray-600">{course.course_code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Contact Number:</span>
                      <span className="text-sm text-gray-600">{course.contact_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Time Length:</span>
                      <span className="text-sm text-gray-600">{course.course_time_length}</span>
                    </div>
                  </div>
                </div>

                {/* Engagement */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-700">0</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">0</span>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>
              </div>
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
