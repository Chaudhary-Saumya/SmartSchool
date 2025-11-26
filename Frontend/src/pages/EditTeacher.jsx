import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Settings, ChevronDown, Loader2 } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function EditTeacher() {
  const [activePage, setActivePage] = useState("edit-teacher"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  // State for teachers list and selection
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  // Form state - initialize all fields as empty strings to avoid controlled/uncontrolled issues
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    mobile_number: '',
    location: '',
    about: '',
    education: '',
    experience: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
  const handleTeacherSelect = (teacherId) => {
    const selectedTeacher = teachers.find(teacher => teacher.id == teacherId);
    if (selectedTeacher) {
      setSelectedTeacherId(teacherId);
      setFormData({
        name: selectedTeacher.name || '',
        email: selectedTeacher.email || '',
        password: '', // Don't populate password for security
        address: selectedTeacher.address || '',
        mobile_number: selectedTeacher.mobile_number || '',
        location: selectedTeacher.location || '',
        about: selectedTeacher.about || '',
        education: selectedTeacher.education || '',
        experience: selectedTeacher.experience || ''
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
    console.log('Selected teacher ID:', selectedTeacherId);
    console.log('Form data:', formData);

    if (!selectedTeacherId) {
      setError('Please select a teacher to edit');
      return;
    }

    setLoadingUpdate(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        setLoadingUpdate(false);
        return;
      }

      // Create FormData for file upload
      const submitData = new FormData();

      // Add basic user data - always send these fields
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

      // Add teacher-specific data - always send these fields
      submitData.append('education', formData.education);
      submitData.append('experience', formData.experience);

      // PUT request to update teacher
      const response = await fetch(`http://localhost:3000/api/teachers/${selectedTeacherId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

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
        console.log('Teacher updated successfully!');
        setSuccess('Teacher updated successfully!');

        // Clear the form and selection after successful update
        setFormData({
          name: '',
          email: '',
          password: '',
          address: '',
          mobile_number: '',
          location: '',
          about: '',
          education: '',
          experience: ''
        });
        setSelectedTeacherId("");
        setProfileImage(null);

        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';

        // Refresh teachers list - fetch updated data from server
        const fetchUpdatedTeachers = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/teachers", {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.ok) {
              const data = await response.json();
              setTeachers(data.data || []);
              console.log('Teachers list refreshed');
            }
          } catch (error) {
            console.error("Error refreshing teachers list:", error);
          }
        };
        fetchUpdatedTeachers();
      } else {
        console.log('API Error:', data);
        setError(data.message || `Failed to update teacher (${response.status})`);
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
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
            <span className="font-semibold text-gray-800">Edit Teacher</span>
            <span>›</span>
            <span>Teacher</span>
            <span>›</span>
            <span className="text-gray-800 font-medium">Edit Teacher</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 relative">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Edit Teacher
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

            {/* Teacher Selection Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Teacher to Edit*
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  disabled={loadingTeachers}
                  className="w-full border rounded-lg px-3 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white"
                >
                  <span className={selectedTeacherId ? 'text-gray-900' : 'text-gray-500'}>
                    {loadingTeachers ? 'Loading teachers...' :
                     selectedTeacherId ?
                       teachers.find(t => t.id == selectedTeacherId)?.name || 'Select a teacher' :
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
                          onClick={() => handleTeacherSelect(teacher.id)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 flex items-center space-x-2"
                        >
                          <img
                            src={teacher.profile_image}
                            alt="avatar"
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-900">{teacher.name}</span>
                          <span className="text-xs text-gray-500">({teacher.email})</span>
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
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
                  disabled={!selectedTeacherId}
                />
              </div>
              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-6 md:col-span-2">
                <button
                  type="button"
                  onClick={() => navigate('/all-teachers')}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  disabled={loadingUpdate}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingUpdate || !selectedTeacherId}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loadingUpdate && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{loadingUpdate ? 'Updating...' : 'Update Teacher'}</span>
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
