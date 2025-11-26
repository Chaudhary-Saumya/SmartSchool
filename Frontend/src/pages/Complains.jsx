import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, Clock } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';

export default function Complains() {
  const [activePage, setActivePage] = useState("complaints"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const complaints = [
    {
      id: 'C-101',
      name: 'John Doe',
      type: 'Student',
      date: '11/22/2024',
      time: '10:30 AM',
      description: 'Issue with classroom air conditioning.',
      status: 'Open',
      department: 'Facilities',
      assignedTo: 'Mr. Sharma',
      resolutionDate: '11/25/2024',
      priority: 'High'
    },
    {
      id: 'C-102',
      name: 'Emily Smith',
      type: 'Teacher',
      date: '11/21/2024',
      time: '11:15 AM',
      description: 'Projector not working in classroom.',
      status: 'In Progress',
      department: 'IT Support',
      assignedTo: 'Mr. Patel',
      resolutionDate: '11/23/2024',
      priority: 'Medium'
    },
    {
      id: 'C-103',
      name: 'David Johnson',
      type: 'Parent',
      date: '11/20/2024',
      time: '9:45 AM',
      description: 'Concern regarding transport schedule.',
      status: 'Resolved',
      department: 'Transport',
      assignedTo: 'Ms. Rao',
      resolutionDate: '11/22/2024',
      priority: 'Low'
    },
    {
      id: 'C-104',
      name: 'Sarah Brown',
      type: 'Student',
      date: '11/19/2024',
      time: '2:30 PM',
      description: 'Complaint about cafeteria food quality.',
      status: 'Open',
      department: 'Cafeteria',
      assignedTo: 'Mr. Das',
      resolutionDate: '11/25/2024',
      priority: 'High'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-600';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-600';
      case 'Resolved':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 font-semibold';
      case 'Medium':
        return 'text-yellow-600 font-semibold';
      case 'Low':
        return 'text-green-600 font-semibold';
      default:
        return 'text-gray-600';
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
            <span className="text-gray-900 font-medium">Complaint Register</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Complaint Register</h2>
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
                    <th className="p-3 text-left">Com. ID</th>
                    <th className="p-3 text-left">Complainant Name</th>
                    <th className="p-3 text-left">Complainant Type</th>
                    <th className="p-3 text-left">Complaint Date</th>
                    <th className="p-3 text-left">Complaint Time</th>
                    <th className="p-3 text-left">Complaint Description</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Assigned To</th>
                    <th className="p-3 text-left">Resolution Date</th>
                    <th className="p-3 text-left">Priority Level</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.id}</td>
                      <td className="p-3 text-gray-700">{item.name}</td>
                      <td className="p-3 text-gray-700">{item.type}</td>
                      <td className="p-3 text-gray-700">{item.date}</td>
                      <td className="p-3 text-blue-600 flex items-center space-x-1"><Clock className="w-4 h-4" /><span>{item.time}</span></td>
                      <td className="p-3 text-gray-700">{item.description}</td>
                      <td className="p-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>{item.status}</span></td>
                      <td className="p-3 text-gray-700">{item.department}</td>
                      <td className="p-3 text-gray-700">{item.assignedTo}</td>
                      <td className="p-3 text-gray-700">{item.resolutionDate}</td>
                      <td className={`p-3 ${getPriorityColor(item.priority)}`}>{item.priority}</td>
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
