import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, Calendar } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function ClassList() {
  const [activePage, setActivePage] = useState("class-list"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const classes = [
    {
      className: 'Grade 10',
      classCode: '10A',
      classType: 'Lecture',
      roomNumber: 'Room 101',
      schedule: 'Monday, Wednesday, Friday, 8:00 AM - 9:30 AM',
      semester: 'Fall 2024',
      capacity: 30,
      status: 'Active',
      startDate: '09/01/2024',
      endDate: '12/20/2024'
    },
    {
      className: 'Grade 12',
      classCode: '12B',
      classType: 'Lab',
      roomNumber: 'Lab 204',
      schedule: 'Tuesday, Thursday, 10:00 AM - 12:00 PM',
      semester: 'Spring 2025',
      capacity: 25,
      status: 'Inactive',
      startDate: '02/10/2025',
      endDate: '06/15/2025'
    },
    {
      className: 'Grade 9',
      classCode: '9C',
      classType: 'Workshop',
      roomNumber: 'Room 305',
      schedule: 'Monday - Friday, 1:00 PM - 2:30 PM',
      semester: 'Winter 2024',
      capacity: 40,
      status: 'Active',
      startDate: '11/01/2024',
      endDate: '03/10/2025'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-600';
      case 'Inactive':
        return 'bg-red-100 text-red-600';
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
            <span className="text-gray-900 font-medium">Class Management</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Class Management</h2>
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
                    <th className="p-3 text-left w-24">Class Name</th>
                    <th className="p-3 text-left w-20">Class Code</th>
                    <th className="p-3 text-left w-20">Class Type</th>
                    <th className="p-3 text-left w-24">Room Number</th>
                    <th className="p-3 text-left w-48">Schedule</th>
                    <th className="p-3 text-left w-20">Semester</th>
                    <th className="p-3 text-left w-16">Capacity</th>
                    <th className="p-3 text-left w-16">Status</th>
                    <th className="p-3 text-left w-24">Start Date</th>
                    <th className="p-3 text-left w-24">End Date</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 w-10"><input type="checkbox" /></td>
                      <td className="p-3 w-24 text-gray-800 font-medium">{item.className}</td>
                      <td className="p-3 w-20 text-gray-700">{item.classCode}</td>
                      <td className="p-3 w-20 text-gray-700">{item.classType}</td>
                      <td className="p-3 w-24 text-gray-700">{item.roomNumber}</td>
                      <td className="p-3 w-48 text-gray-700 max-w-xs truncate" title={item.schedule}>
                        {item.schedule}
                      </td>
                      <td className="p-3 w-20 text-gray-700">{item.semester}</td>
                      <td className="p-3 w-16 text-gray-700">{item.capacity}</td>
                      <td className="p-3 w-16">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 w-24 flex items-center space-x-1 text-blue-600">
                        <Calendar className="w-4 h-4" />
                        <span>{item.startDate}</span>
                      </td>
                      <td className="p-3 w-24 flex items-center space-x-1 text-blue-600">
                        <Calendar className="w-4 h-4" />
                        <span>{item.endDate}</span>
                      </td>
                      <td className="p-3 w-20 flex space-x-2">
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
