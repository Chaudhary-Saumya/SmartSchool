import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronDown, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function EditStudent() {
  const [activePage, setActivePage] = useState("edit-student"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  // State for students list and selection
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // Form state - initialize all fields as empty strings to avoid controlled/uncontrolled issues
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    mobile_number: '',
    location: '',
    about: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
  const handleStudentSelect = (studentId) => {
    const selectedStudent = students.find(student => student.id == studentId);
    if (selectedStudent) {
      setSelectedStudentId(studentId);
      setFormData({
        name: selectedStudent.name || '',
        email: selectedStudent.email || '',
        password: '', // Don't populate password for security
        address: selectedStudent.address || '',
        mobile_number: selectedStudent.mobile || '',
        location: selectedStudent.location || '',
        about: selectedStudent.about || ''
      });
      setProfileImage(null); // Reset file input
      // Reset file input element
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      setDropdownOpen(false);
      setError('');
      setSuccess('');
    }
  };

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
    console.log('Selected student ID:', selectedStudentId);
    console.log('Form data:', formData);

    if (!selectedStudentId) {
      setError('Please select a student to edit');
      return;
    }

    setLoadingUpdate(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      if (!token) {
        setError('Authentication required');
        setLoadingUpdate(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Add basic user data - always send these fields (even empty)
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('address', formData.address);
      submitData.append('mobile_number', formData.mobile_number);
      submitData.append('location', formData.location);
      submitData.append('about', formData.about);

      // Add password only if provided
      if (formData.password && formData.password.trim() !== '') {
        submitData.append('password', formData.password);
      }

      // Add profile image if selected
      if (profileImage) {
        submitData.append('profile_image', profileImage);
      }

      console.log('Sending update request to API...');
      const response = await fetch(`http://localhost:3000/api/students/${selectedStudentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      console.log('Response status:', response.status);
      let data;
      try {
        const responseText = await response.text();
        console.log('Raw response:', responseText);
        data = JSON.parse(responseText);
        console.log('Parsed response data:', data);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        setError(`Server error (${response.status}). Please try again.`);
        setLoadingUpdate(false);
        return;
      }

      if (response.ok) {
        console.log('Student updated successfully!');
        setSuccess('Student updated successfully!');

        // Clear form and selection after successful update
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          mobile_number: '',
          location: '',
          about: ''
        });
        setSelectedStudentId("");
        setProfileImage(null);

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        // Refresh students list - fetch updated data from server
        const fetchUpdatedStudents = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/students", {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              setStudents(data.data || []);
              console.log('Students list refreshed');
            }
          } catch (error) {
            console.error("Error refreshing students list:", error);
          }
        };
        fetchUpdatedStudents();
      } else {
        console.log('API Error:', data);
        setError(data.message || `Failed to update student (${response.status})`);
      }
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoadingUpdate(false);
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
            <span className="font-semibold text-gray-800">Edit Student</span>
            <span>›</span>
            <span>Teacher</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Edit Student</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edit Student
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

            {/* Student Selection Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student to Edit*
              </label>
              <div className="relative max-w-md">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  disabled={loadingStudents}
                  className="w-full border rounded-lg px-3 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white"
                >
                  <span className={selectedStudentId ? 'text-gray-900' : 'text-gray-500'}>
                    {loadingStudents ? 'Loading students...' :
                     selectedStudentId ?
                       students.find(s => s.id == selectedStudentId)?.name || 'Select a student' :
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
                          onClick={() => handleStudentSelect(student.id)}
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
                  disabled={!selectedStudentId}
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
                  disabled={!selectedStudentId}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password (Leave empty to keep current)
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password (optional)"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedStudentId}
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
                  disabled={!selectedStudentId}
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
                  disabled={!selectedStudentId}
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
                  disabled={!selectedStudentId}
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
                  disabled={!selectedStudentId}
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
                  placeholder="Write about student"
                  rows="3"
                  className="w-full border rounded-lg px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!selectedStudentId}
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6 md:col-span-2">
                <button
                  type="button"
                  onClick={() => navigate('/all-students')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  disabled={loadingUpdate}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingUpdate || !selectedStudentId}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loadingUpdate && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loadingUpdate ? 'Updating...' : 'Update Student'}</span>
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
