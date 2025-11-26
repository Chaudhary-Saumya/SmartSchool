import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function AllStudents() {
  const [activePage, setActivePage] = useState("all-students"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
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
          setError("Failed to fetch students data");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error loading students data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Keep the hardcoded data as fallback if API fails
  const fallbackStudents = [
    {
      rollNo: 'S-101',
      name: 'Aarav Patel',
      email: 'aarav.patel@email.com',
      gender: 'Male',
      mobile: '+91 9876543210',
      department: 'Computer Science',
      dob: '2003-05-14',
      address: 'Ahmedabad, Gujarat',
      guardianMobile: '+91 9876501234',
      profileCompletion: 90,
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      rollNo: 'S-102',
      name: 'Isha Sharma',
      email: 'isha.sharma@email.com',
      gender: 'Female',
      mobile: '+91 9998877766',
      department: 'Information Technology',
      dob: '2002-11-20',
      address: 'Surat, Gujarat',
      guardianMobile: '+91 9998800022',
      profileCompletion: 75,
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      rollNo: 'S-103',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@email.com',
      gender: 'Male',
      mobile: '+91 9988776655',
      department: 'Mechanical Engineering',
      dob: '2001-07-09',
      address: 'Vadodara, Gujarat',
      guardianMobile: '+91 9123456789',
      profileCompletion: 60,
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      rollNo: 'S-104',
      name: 'Kavya Singh',
      email: 'kavya.singh@email.com',
      gender: 'Female',
      mobile: '+91 9876001122',
      department: 'Civil Engineering',
      dob: '2002-01-25',
      address: 'Rajkot, Gujarat',
      guardianMobile: '+91 9988997766',
      profileCompletion: 100,
      avatar: 'https://i.pravatar.cc/40?img=4'
    }
  ];

  const getProgressColor = (percent) => {
    if (percent >= 90) return 'bg-green-500';
    if (percent >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Front</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Student List</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Student List
                {loading && <span className="ml-2 text-sm text-gray-500">(Loading...)</span>}
                {error && <span className="ml-2 text-sm text-red-500">({error})</span>}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <RefreshCcw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-290">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10">
                      <input type="checkbox" />
                    </th>
                    <th className="p-3 text-left">Roll No</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Gender</th>
                    <th className="p-3 text-left">Mobile</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Date of Birth</th>
                    <th className="p-3 text-left">Address</th>
                    <th className="p-3 text-left">Parent/Guardian Mobile</th>
                    <th className="p-3 text-left">Profile Completion</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-500">
                        Loading students data...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="p-8 text-center text-gray-500">
                        No students found
                      </td>
                    </tr>
                  ) : (
                    students.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 text-gray-800 font-medium">{item.rollNo}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-gray-800 font-medium">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{item.email}</td>
                      <td className="p-3 text-gray-700">{item.gender}</td>
                      <td className="p-3 text-gray-700">{item.mobile}</td>
                      <td className="p-3 text-gray-700">{item.department}</td>
                      <td className="p-3 text-gray-700">{item.dob}</td>
                      <td className="p-3 text-gray-700">{item.address}</td>
                      <td className="p-3 text-gray-700">{item.guardianMobile}</td>
                      <td className="p-3 text-gray-700">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(item.profileCompletion)}`}
                            style={{ width: `${item.profileCompletion}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {item.profileCompletion}%
                        </p>
                      </td>
                      <td className="p-3 flex space-x-2">
                        <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Floating Settings Button */}
            <button className="fixed right-6 top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
