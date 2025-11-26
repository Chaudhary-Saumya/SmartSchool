import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Clock, Star, Heart, MessageSquare, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import TeacherTopbar from "../components/TeacherTopbar";
import Topbar from "../components/Topbar";

const AllCourse = () => {
  const [activePage, setActivePage] = useState("all-courses"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/api/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCourses(data.data);
          }
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);


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
          <div className="mb-4 flex items-center space-x-2 text-gray-600 text-sm">
            <span className="font-semibold text-gray-800 text-lg">All Course</span>
            <span>›</span>
            <span>Course</span>
            <span>›</span>
            <span className="text-gray-500">All Course</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition relative"
          >
            <div className="relative">
              <img
                src={course.course_image ? `http://localhost:3000${course.course_image}` : "https://cdn-icons-png.flaticon.com/512/2920/2920277.png"}
                alt={course.course_name}
                className="w-full h-40 object-contain"
              />
              <span className="absolute top-2 right-2 bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
                {course.course_category}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.course_duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.5</span>
              </div>
            </div>

            <h3 className="text-base font-semibold text-gray-800 mt-2">
              {course.course_name}
            </h3>
            <p className="text-gray-500 text-sm mt-1 mb-3">
              {course.course_details}
            </p>

            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center space-x-2">
                <img
                  src={`https://randomuser.me/api/portraits/${course.id % 2 === 0 ? "men" : "women"}/${course.id + 10}.jpg`}
                  alt={course.teacher_name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
                  {course.teacher_name}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 text-sm">
              <a onClick={() => navigate(`/about-course/${course.id}`)} className="text-blue-500 font-medium cursor-pointer">
                View Details
              </a>
              <div className="flex items-center space-x-3 text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>0</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>0</span>
                </div>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourse;
