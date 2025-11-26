import React, { useState } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function LeaveRequests() {
  const [activePage, setActivePage] = useState("leave-requests"); // eslint-disable-line no-unused-vars
  const leaveRequests = [
    {
      leaveType: 'Sick Leave',
      startDate: '2024-10-01',
      endDate: '2024-10-05',
      totalDays: 5,
      status: 'Approved',
      dateSubmitted: '2024-09-25',
      reasonForLeave: 'Flu',
      approver: 'Principal Smith',
      comments: 'Get well soon!',
    },
    {
      leaveType: 'Annual Leave',
      startDate: '2024-11-15',
      endDate: '2024-11-20',
      totalDays: 6,
      status: 'Pending',
      dateSubmitted: '2024-11-10',
      reasonForLeave: 'Family vacation',
      approver: 'HOD Johnson',
      comments: 'Approved pending documentation',
    },
    {
      leaveType: 'Maternity Leave',
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      totalDays: 90,
      status: 'Approved',
      dateSubmitted: '2024-11-15',
      reasonForLeave: 'Pregnancy',
      approver: 'Principal Smith',
      comments: 'Congratulations!',
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      <TeacherSidebar setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        <TeacherTopbar />
        <div className="flex-1 overflow-y-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Teacher</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Leave Requests</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Leave Requests</h2>
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
                    <th className="p-3 text-left w-24">Leave Type</th>
                    <th className="p-3 text-left w-24">Start Date</th>
                    <th className="p-3 text-left w-24">End Date</th>
                    <th className="p-3 text-left w-20">Total Days</th>
                    <th className="p-3 text-left w-20">Status</th>
                    <th className="p-3 text-left w-28">Date Submitted</th>
                    <th className="p-3 text-left w-32">Reason for Leave</th>
                    <th className="p-3 text-left w-24">Approver</th>
                    <th className="p-3 text-left w-32">Comments</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.leaveType}</td>
                      <td className="p-3 text-gray-700">{item.startDate}</td>
                      <td className="p-3 text-gray-700">{item.endDate}</td>
                      <td className="p-3 text-gray-700">{item.totalDays}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700">{item.dateSubmitted}</td>
                      <td className="p-3 text-gray-700">{item.reasonForLeave}</td>
                      <td className="p-3 text-gray-700">{item.approver}</td>
                      <td className="p-3 text-gray-700">{item.comments}</td>
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
