import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function AllAssets() {
  const [activePage, setActivePage] = useState("all-assets"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const books = [
    {
      bookNumber: 'B123451',
      title: 'Web Programming',
      subject: 'Mathematics',
      purchaseDate: '02/25/2019',
      department: 'Civil',
      type: 'Newspaper',
      status: 'Out of Stock',
      lastBorrowed: '01/15/2022',
      borrowerName: 'Jane Doe',
      shelfLocation: 'C3',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      bookNumber: 'B123452',
      title: 'Computer Networks',
      subject: 'Computer Science',
      purchaseDate: '03/10/2021',
      department: 'IT',
      type: 'Book',
      status: 'Available',
      lastBorrowed: '08/11/2023',
      borrowerName: 'N/A',
      shelfLocation: 'A2',
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      bookNumber: 'B123453',
      title: 'Physics for Engineers',
      subject: 'Physics',
      purchaseDate: '07/19/2020',
      department: 'Mechanical',
      type: 'Book',
      status: 'Borrowed',
      lastBorrowed: '11/01/2024',
      borrowerName: 'Rahul Mehta',
      shelfLocation: 'B5',
      avatar: 'https://i.pravatar.cc/40?img=3'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-600';
      case 'Borrowed':
        return 'bg-yellow-100 text-yellow-600';
      case 'Out of Stock':
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
            <span className="text-gray-900 font-medium">Library Books</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Library Books</h2>
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
                    <th className="p-3 text-left w-20">Book Number</th>
                    <th className="p-3 text-left w-32">Title</th>
                    <th className="p-3 text-left w-24">Subject</th>
                    <th className="p-3 text-left w-24">Purchase Date</th>
                    <th className="p-3 text-left w-24">Department</th>
                    <th className="p-3 text-left w-20">Type</th>
                    <th className="p-3 text-left w-20">Status</th>
                    <th className="p-3 text-left w-24">Last Borrowed</th>
                    <th className="p-3 text-left w-28">Borrower Name</th>
                    <th className="p-3 text-left w-20">Shelf Location</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.bookNumber}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="book" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.title}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{item.subject}</td>
                      <td className="p-3 text-gray-700">{item.purchaseDate}</td>
                      <td className="p-3 text-gray-700">{item.department}</td>
                      <td className="p-3 text-gray-700 capitalize">{item.type}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">{item.lastBorrowed}</td>
                      <td className="p-3 text-gray-700">{item.borrowerName}</td>
                      <td className="p-3 text-gray-700">{item.shelfLocation}</td>
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
