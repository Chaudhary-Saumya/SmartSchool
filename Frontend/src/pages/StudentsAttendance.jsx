import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function StudentsAttendance() {
  const [activePage, setActivePage] = useState("students-attendance"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const attendanceData = [
    {
      rollNo: 'S-101',
      name: 'Aarav Patel',
      class: 'Class 10A',
      date: '2025-11-20',
      status: 'Present',
      semester: 'Semester 1',
      time: '09:05 AM',
      reason: '-',
      notes: 'On time',
      approved: true,
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      rollNo: 'S-102',
      name: 'Isha Sharma',
      class: 'Class 10A',
      date: '2025-11-20',
      status: 'Absent',
      semester: 'Semester 1',
      time: '-',
      reason: 'Medical Leave',
      notes: 'Sick leave applied',
      approved: true,
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      rollNo: 'S-103',
      name: 'Rohan Mehta',
      class: 'Class 9B',
      date: '2025-11-20',
      status: 'Late',
      semester: 'Semester 2',
      time: '09:45 AM',
      reason: 'Traffic delay',
      notes: 'Came 40 mins late',
      approved: false,
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      rollNo: 'S-104',
      name: 'Kavya Singh',
      class: 'Class 8C',
      date: '2025-11-20',
      status: 'Present',
      semester: 'Semester 2',
      time: '08:59 AM',
      reason: '-',
      notes: 'Excellent punctuality',
      approved: true,
      avatar: 'https://i.pravatar.cc/40?img=4'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-600';
      case 'Absent':
        return 'bg-red-100 text-red-600';
      case 'Late':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
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
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Front</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Student Attendance</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Student Attendance</h2>
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
            <div className="overflow-x-auto w-280">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                    <th className="p-3 text-left">Roll No</th>
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-left">Class</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Semester</th>
                    <th className="p-3 text-left">Attendance Time</th>
                    <th className="p-3 text-left">Reason for Absence</th>
                    <th className="p-3 text-left">Notes</th>
                    <th className="p-3 text-left">Approved</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.rollNo}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{item.class}</td>
                      <td className="p-3 text-gray-700">{item.date}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">{item.semester}</td>
                      <td className="p-3 text-blue-600 flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </td>
                      <td className="p-3 text-gray-700">{item.reason}</td>
                      <td className="p-3 text-gray-700">{item.notes}</td>
                      <td className="p-3">
                        {item.approved ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
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
                  ))}
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
