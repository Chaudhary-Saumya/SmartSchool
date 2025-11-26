import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function AssignClassTeacher() {
  const [activePage, setActivePage] = useState("assign-class-teacher"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const teachers = [
    {
      teacherId: 'T-101',
      name: 'John Doe',
      classId: 'C-01',
      className: 'Class 10A',
      subject: 'Mathematics',
      assignmentStatus: 'Assigned',
      academicYear: '2024-2025',
      classTiming: '09:00 AM - 10:00 AM',
      roomNo: '101',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      teacherId: 'T-102',
      name: 'Emily Smith',
      classId: 'C-02',
      className: 'Class 9B',
      subject: 'Science',
      assignmentStatus: 'Pending',
      academicYear: '2024-2025',
      classTiming: '10:15 AM - 11:15 AM',
      roomNo: '202',
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      teacherId: 'T-103',
      name: 'David Johnson',
      classId: 'C-03',
      className: 'Class 8C',
      subject: 'English',
      assignmentStatus: 'Completed',
      academicYear: '2024-2025',
      classTiming: '11:30 AM - 12:30 PM',
      roomNo: '303',
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      teacherId: 'T-104',
      name: 'Sophia Brown',
      classId: 'C-04',
      className: 'Class 7A',
      subject: 'History',
      assignmentStatus: 'Assigned',
      academicYear: '2024-2025',
      classTiming: '01:00 PM - 02:00 PM',
      roomNo: '404',
      avatar: 'https://i.pravatar.cc/40?img=4'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Assigned':
        return 'bg-blue-100 text-blue-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Completed':
        return 'bg-green-100 text-green-600';
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
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Front</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Teacher Assignments</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Teacher Assignments</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Filter className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><RefreshCcw className="w-4 h-4 text-gray-600" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                    <th className="p-3 text-left">Teacher ID</th>
                    <th className="p-3 text-left">Teacher Name</th>
                    <th className="p-3 text-left">Class ID</th>
                    <th className="p-3 text-left">Class Name</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Assignment Status</th>
                    <th className="p-3 text-left">Academic Year</th>
                    <th className="p-3 text-left">Class Timing</th>
                    <th className="p-3 text-left">Room No</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.teacherId}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{item.classId}</td>
                      <td className="p-3 text-gray-700">{item.className}</td>
                      <td className="p-3 text-gray-700">{item.subject}</td>
                      <td className="p-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.assignmentStatus)}`}>{item.assignmentStatus}</span></td>
                      <td className="p-3 text-gray-700">{item.academicYear}</td>
                      <td className="p-3 text-gray-700">{item.classTiming}</td>
                      <td className="p-3 text-gray-700">{item.roomNo}</td>
                      <td className="p-3 flex space-x-2">
                        <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="fixed right-6 top-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}