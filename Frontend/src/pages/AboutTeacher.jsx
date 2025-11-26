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

export default function AboutTeacher() {
  const [activePage, setActivePage] = useState("about-teacher"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  // State for teachers list and selection
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [error, setError] = useState('');

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  // Fetch all teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoadingTeachers(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/teachers", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeachers(data.data || []);
          // Auto-select first teacher if available
          if (data.data && data.data.length > 0) {
            handleTeacherSelect(data.data[0]);
          }
        } else {
          setError("Failed to fetch teachers list");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Error loading teachers list");
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  // Handle teacher selection from dropdown
  const handleTeacherSelect = async (teacher) => {
    setSelectedTeacher(teacher);
    setDropdownOpen(false);
    setLoadingProfile(true);
    setError('');

    try {
      // For detailed profile, we could fetch individual teacher data
      // For now, we'll use the data we already have from the list
      setLoadingProfile(false);
    } catch (error) {
      console.error("Error loading teacher profile:", error);
      setError("Error loading teacher profile");
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
        <span>Teacher</span>
        <span>›</span>
        <span className="text-gray-800 font-medium">Profile</span>
      </div>

      {/* Teacher Selection Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Teacher to View Profile*
        </label>
        <div className="relative max-w-md">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            disabled={loadingTeachers}
            className="w-full border rounded-lg px-3 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white"
          >
            <span className={selectedTeacher ? 'text-gray-900' : 'text-gray-500'}>
              {loadingTeachers ? 'Loading teachers...' :
               selectedTeacher ?
                 selectedTeacher.name :
                 'Select a teacher'}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {teachers.length === 0 ? (
                <div className="px-4 py-2 text-gray-500 text-sm">No teachers found</div>
              ) : (
                teachers.map((teacher) => (
                  <button
                    key={teacher.id}
                    type="button"
                    onClick={() => handleTeacherSelect(teacher)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center space-x-2"
                  >
                    <img
                      src={teacher.profile_image}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="text-sm text-gray-900 font-medium">{teacher.name}</div>
                      <div className="text-xs text-gray-500">{teacher.email}</div>
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
          Loading teacher profile...
        </div>
      )}

      {/* Show content only when teacher is selected */}
      {selectedTeacher && !loadingProfile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white text-center py-8">
            <img
              src={selectedTeacher.profile_image}
              alt="Teacher"
              className="w-28 h-28 mx-auto rounded-full border-4 border-white mb-4"
            />
            <h2 className="text-xl font-semibold">{selectedTeacher.name}</h2>
            <p className="text-sm opacity-90">Teacher</p>
          </div>

          <div className="p-5 text-center border-b border-gray-200">
            <div className="flex items-center justify-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{selectedTeacher.address || 'Address not provided'}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              <span>{selectedTeacher.mobile_number || 'Phone not provided'}</span>
            </div>
          </div>

          <div className="flex justify-around text-center py-4">
            <div>
              <h4 className="font-semibold text-gray-800">564</h4>
              <p className="text-xs text-gray-500">FOLLOWING</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">18k</h4>
              <p className="text-xs text-gray-500">FOLLOWERS</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">565</h4>
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
                {selectedTeacher.about || `Hello, I am ${selectedTeacher.name}, a dedicated teacher committed to providing quality education.`}
              </p>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Email</span>
                  <span>{selectedTeacher.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Location</span>
                  <span>{selectedTeacher.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Education</span>
                  <span>{selectedTeacher.education || 'Not specified'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-medium text-gray-600">Experience</span>
                  <span>{selectedTeacher.experience || 'Not specified'}</span>
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
                <BookOpen className="w-4 h-4" /> Courses & Publications
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
                {selectedTeacher.name}
              </p>
              <p>
                <span className="font-medium text-gray-700">Mobile: </span>
                {selectedTeacher.mobile_number || 'Not provided'}
              </p>
              <p>
                <span className="font-medium text-gray-700">Email: </span>
                {selectedTeacher.email}
              </p>
              <p>
                <span className="font-medium text-gray-700">Location: </span>
                {selectedTeacher.location || 'Not specified'}
              </p>
            </div>

            <p className="text-gray-700 text-sm mb-4">
              {selectedTeacher.about || `${selectedTeacher.name} is a dedicated teacher committed to providing quality education and fostering student development.`}
            </p>

            <p className="text-gray-700 text-sm mb-6">
              Education: {selectedTeacher.education || 'Education details not provided'}
              <br />
              Experience: {selectedTeacher.experience || 'Experience details not provided'}
              <br />
              {selectedTeacher.about && selectedTeacher.about.length > 100 ?
                'This teacher brings passion and dedication to their role in education.' :
                'Committed to excellence in teaching and student success.'}
            </p>

            {/* Education */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Education
            </h3>
            <div className="text-sm text-gray-700 space-y-3 mb-6">
              {selectedTeacher.education ? (
                <div>
                  <p className="font-medium">
                    {selectedTeacher.education}
                  </p>
                  <p className="text-xs text-gray-500">
                    Education qualification
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-gray-500">
                    Education details not provided
                  </p>
                  <p className="text-xs text-gray-400">
                    Please update profile to add education information
                  </p>
                </div>
              )}
            </div>

            {/* Experience */}
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Experience
            </h3>
            <div className="text-sm text-gray-700 space-y-3">
              {selectedTeacher.experience ? (
                <div>
                  <p className="font-medium">
                    Teacher at Smart School
                  </p>
                  <p className="text-xs text-gray-500">
                    Experience: {selectedTeacher.experience}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-medium text-gray-500">
                    Experience details not provided
                  </p>
                  <p className="text-xs text-gray-400">
                    Please update profile to add experience information
                  </p>
                </div>
              )}
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
