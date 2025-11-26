import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Settings,
  User,
  BookOpen,
  Briefcase,
  Code,
  ChevronDown,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function AboutStudent() {
  const [activePage, setActivePage] = useState("about-student"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  // State for students list and selection
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoadingStudents(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/students", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudents(data.data || []);
          // Auto-select first student if available
          if (data.data && data.data.length > 0) {
            handleStudentSelect(data.data[0]);
          }
        } else {
          setError("Failed to fetch students list");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error loading students list");
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle student selection from dropdown
  const handleStudentSelect = async (student) => {
    setSelectedStudent(student);
    setDropdownOpen(false);
    setLoadingProfile(true);
    setError('');

    try {
      // For detailed profile, we could fetch individual student data
      // For now, we'll use the data we already have from the list
      setLoadingProfile(false);
    } catch (error) {
      console.error("Error loading student profile:", error);
      setError("Error loading student profile");
      setLoadingProfile(false);
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
        <span className="font-semibold text-gray-800">Profile</span>
        <span>›</span>
        <span>Student</span>
        <span>›</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </div>

      {/* Student Selection Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Student to View Profile*
        </label>
        <div className="relative max-w-md">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disabled={loadingStudents}
            className="w-full border rounded-lg px-3 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white"
          >
            <span className={selectedStudent ? 'text-gray-900' : 'text-gray-500'}>
              {loadingStudents ? 'Loading students...' :
               selectedStudent ?
                 selectedStudent.name :
                 'Select a student'}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {students.length === 0 ? (
                <div className="px-4 py-2 text-gray-500 text-sm">No students found</div>
              ) : (
                students.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => handleStudentSelect(student)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center space-x-2"
                  >
                    <img
                      src={student.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-sm text-gray-900 font-medium">{student.name}</div>
                      <div className="text-xs text-gray-500">{student.email}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loadingProfile && (
        <div className="mb-6 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          Loading student profile...
        </div>
      )}

      {/* Show content only when student is selected */}
      {selectedStudent && !loadingProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white text-center py-8">
            <img
              src={selectedStudent.avatar}
              alt="Student"
              className="w-28 h-28 mx-auto rounded-full border-4 border-white mb-4"
            />
            <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
            <p className="text-sm opacity-90">{selectedStudent.department || 'Student'}</p>
          </div>

          <div className="p-5 text-center border-b border-gray-200">
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{selectedStudent.address || 'Address not provided'}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{selectedStudent.mobile || 'Phone not provided'}</span>
            </div>
          </div>

          <div className="flex justify-around text-center py-4">
            <div>
              <h4 className="font-semibold text-gray-800">150</h4>
              <p className="text-xs text-gray-500">FRIENDS</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">5k</h4>
              <p className="text-xs text-gray-500">FOLLOWERS</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">120</h4>
              <p className="text-xs text-gray-500">POSTS</p>
            </div>
          </div>

          {/* About / Skills Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b text-gray-700 text-sm">
              <button className="w-1/2 py-2 flex items-center justify-center gap-2 border-b-2 border-blue-600 font-medium text-blue-600">
                <User className="w-4 h-4" /> About
              </button>
              <button className="w-1/2 py-2 flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600">
                <Code className="w-4 h-4" /> Skills
              </button>
            </div>

            <div className="p-4 text-sm text-gray-700">
              <p className="mb-3">
                {selectedStudent.about || `Hello, I am ${selectedStudent.name}, a dedicated student committed to academic excellence and personal growth.`}
              </p>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Roll No</span>
                  <span>{selectedStudent.rollNo}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Department</span>
                  <span>{selectedStudent.department || 'Not assigned'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Email</span>
                  <span>{selectedStudent.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Profile Completion</span>
                  <span>{selectedStudent.profileCompletion || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm relative">
          {/* Tabs */}
          <div className="flex justify-between border-b border-gray-200 text-sm text-gray-600">
            <div className="flex">
              <button className="px-6 py-3 flex items-center gap-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                <User className="w-4 h-4" /> About Me
              </button>
              <button className="px-6 py-3 flex items-center gap-2 hover:text-blue-600">
                <BookOpen className="w-4 h-4" /> Grades & Activities
              </button>
            </div>
            <button className="px-6 py-3 flex items-center gap-2 hover:text-blue-600">
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>

          {/* About Me Content */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <User className="w-4 h-4" /> About Me
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
              <p>
                <span className="font-medium text-gray-700">Full Name: </span>
                {selectedStudent.name}
              </p>
              <p>
                <span className="font-medium text-gray-700">Mobile: </span>
                {selectedStudent.mobile || 'Not provided'}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email: </span>
                {selectedStudent.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Location: </span>
                {selectedStudent.location || 'Not specified'}
              </p>
            </div>

            <p className="text-gray-700 text-sm mb-4">
              {selectedStudent.name} is a dedicated student enrolled in {selectedStudent.department || 'our institution'}.
              {selectedStudent.about ? ` ${selectedStudent.about.substring(0, 100)}...` : ' Committed to academic excellence and personal development.'}
            </p>

            <p className="text-gray-700 text-sm mb-6">
              Student ID: {selectedStudent.rollNo} | Department: {selectedStudent.department || 'Not assigned'}
              {selectedStudent.about && selectedStudent.about.length > 100 ?
                ` | Additional info: ${selectedStudent.about.substring(100)}` :
                ' | Focused on achieving academic goals and contributing to school activities.'}
            </p>

            {/* Education */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Academic Information
            </h3>
            <div className="text-sm text-gray-700 space-y-3 mb-6">
              <div>
                <p className="font-medium">
                  Student at Smart School
                </p>
                <p className="text-xs text-gray-500">
                  Department: {selectedStudent.department || 'Not assigned'} • Roll No: {selectedStudent.rollNo}
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Profile Completion: {selectedStudent.profileCompletion || 0}%
                </p>
                <p className="text-xs text-gray-500">
                  Address: {selectedStudent.address || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Activities */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Student Information
            </h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <p className="font-medium">
                  Student Status: Active
                </p>
                <p className="text-xs text-gray-500">Enrolled in {selectedStudent.department || 'institution'}</p>
              </div>
              <div>
                <p className="font-medium">
                  Contact Information Available
                </p>
                <p className="text-xs text-gray-500">Mobile: {selectedStudent.mobile || 'Not provided'}</p>
              </div>
              <div>
                <p className="font-medium">Academic Performance Tracking</p>
                <p className="text-xs text-gray-500">Profile completion: {selectedStudent.profileCompletion || 0}%</p>
              </div>
            </div>
          </div>

          {/* Floating Settings Button */}
          <button className="absolute right-[-18px] top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      )}
        </div>
      </div>
    </div>
  );
}
