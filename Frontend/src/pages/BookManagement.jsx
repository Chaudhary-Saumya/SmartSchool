import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function BookManagement() {
  const [activePage, setActivePage] = useState("book-management"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const books = [
    {
      id: '101',
      name: 'Introduction to Programming',
      status: 'Available',
      dateUpdated: '11/20/2024',
      lastCheckedOut: '-',
      dueDate: '-',
      checkedOutBy: '-',
      reservedBy: '-',
      condition: 'Good',
      returnDate: '-',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      id: '102',
      name: 'Data Structures and Algorithms',
      status: 'Checked Out',
      dateUpdated: '11/18/2024',
      lastCheckedOut: '11/17/2024',
      dueDate: '11/24/2024',
      checkedOutBy: 'Student-001',
      reservedBy: '-',
      condition: 'Good',
      returnDate: '-',
      avatar: 'https://i.pravatar.cc/40?img=2'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-600';
      case 'Checked Out':
        return 'bg-yellow-100 text-yellow-600';
      case 'Lost':
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
            <span className="text-gray-900 font-medium">Book Management</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Book Management</h2>
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
                    <th className="p-3 text-left w-16">Book ID</th>
                    <th className="p-3 text-left w-40">Book Name</th>
                    <th className="p-3 text-left w-20">Status</th>
                    <th className="p-3 text-left w-24">Date Updated</th>
                    <th className="p-3 text-left w-28">Last Checked Out</th>
                    <th className="p-3 text-left w-20">Due Date</th>
                    <th className="p-3 text-left w-28">Checked Out By</th>
                    <th className="p-3 text-left w-24">Reserved By</th>
                    <th className="p-3 text-left w-20">Condition</th>
                    <th className="p-3 text-left w-24">Return Date</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.id}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="book" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">{item.dateUpdated}</td>
                      <td className="p-3 text-gray-700">{item.lastCheckedOut}</td>
                      <td className="p-3 text-gray-700">{item.dueDate}</td>
                      <td className="p-3 text-gray-700">{item.checkedOutBy}</td>
                      <td className="p-3 text-gray-700">{item.reservedBy}</td>
                      <td className="p-3 text-gray-700">{item.condition}</td>
                      <td className="p-3 text-gray-700">{item.returnDate}</td>
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
