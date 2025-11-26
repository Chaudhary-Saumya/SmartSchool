import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function VisitorsBook() {
  const [activePage, setActivePage] = useState("visitors-book"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const visitors = [
    {
      name: 'John Doe',
      date: '11/22/2024',
      time: '10:30 AM',
      purpose: 'Meeting',
      contact: '+1234567890',
      type: 'Parent',
      department: 'Administration',
    },
    {
      name: 'Emily Smith',
      date: '11/21/2024',
      time: '2:00 PM',
      purpose: 'Delivery',
      contact: '+1234567890',
      type: 'Vendor',
      department: 'Accounts',
    },
    {
      name: 'David Johnson',
      date: '11/20/2024',
      time: '11:00 AM',
      purpose: 'Student Pickup',
      contact: '+1234567890',
      type: 'Guardian',
      department: 'Reception',
    },
    {
      name: 'Sarah Brown',
      date: '11/19/2024',
      time: '3:15 PM',
      purpose: 'Interview',
      contact: '+1234567890',
      type: 'Candidate',
      department: 'HR',
    },
    {
      name: 'Michael Wilson',
      date: '11/18/2024',
      time: '9:45 AM',
      purpose: 'Maintenance Work',
      contact: '+1234567890',
      type: 'Contractor',
      department: 'Facilities',
    }
  ];

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
            <span className="text-gray-900 font-medium">Visitor Log</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Visitor Log</h2>
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
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                    <th className="p-3 text-left">Visitor Name</th>
                    <th className="p-3 text-left">Visit Date</th>
                    <th className="p-3 text-left">Visit Time</th>
                    <th className="p-3 text-left">Purpose of Visit</th>
                    <th className="p-3 text-left">Contact Number</th>
                    <th className="p-3 text-left">Visitor Type</th>
                    <th className="p-3 text-left">Department / Person Visited</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visitors.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.name}</td>
                      <td className="p-3 text-gray-700">{item.date}</td>
                      <td className="p-3 text-gray-700">{item.time}</td>
                      <td className="p-3 text-gray-700">{item.purpose}</td>
                      <td className="p-3 text-green-600 flex items-center space-x-1"><Phone className="w-4 h-4" /><span>{item.contact}</span></td>
                      <td className="p-3 text-gray-700">{item.type}</td>
                      <td className="p-3 text-gray-700">{item.department}</td>
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
