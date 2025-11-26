import React, { useState } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar';
import TeacherTopbar from '../components/TeacherTopbar';

export default function ExamSchedule() {
  const [activePage, setActivePage] = useState("exam-schedule"); // eslint-disable-line no-unused-vars
  const examSchedules = [
    {
      subject: 'Mathematics',
      class: 'Class 1',
      date: '2018-02-10T14:22:18Z',
      time: '10:30 AM',
      duration: '3 hours',
      roomNo: '101',
      totalMarks: 100,
      requiredMarks: 35,
    },
    {
      subject: 'Physics',
      class: 'Class 2',
      date: '2018-02-12T14:22:18Z',
      time: '11:30 AM',
      duration: '2.5 hours',
      roomNo: '102',
      totalMarks: 80,
      requiredMarks: 28,
    },
    {
      subject: 'Chemistry',
      class: 'Class 3',
      date: '2018-02-14T14:22:18Z',
      time: '9:00 AM',
      duration: '3 hours',
      roomNo: '103',
      totalMarks: 100,
      requiredMarks: 40,
    }
  ];

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
            <span className="text-gray-900 font-medium">Exam Schedule</span>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Exam Schedule</h2>
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
                    <th className="p-3 text-left w-24">Subject</th>
                    <th className="p-3 text-left w-20">Class</th>
                    <th className="p-3 text-left w-24">Date</th>
                    <th className="p-3 text-left w-20">Time</th>
                    <th className="p-3 text-left w-24">Duration</th>
                    <th className="p-3 text-left w-20">Room No</th>
                    <th className="p-3 text-left w-24">Total Marks</th>
                    <th className="p-3 text-left w-28">Required Marks</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {examSchedules.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.subject}</td>
                      <td className="p-3 text-gray-700">{item.class}</td>
                      <td className="p-3 text-gray-700">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="p-3 text-gray-700">{item.time}</td>
                      <td className="p-3 text-gray-700">{item.duration}</td>
                      <td className="p-3 text-gray-700">{item.roomNo}</td>
                      <td className="p-3 text-gray-700">{item.totalMarks}</td>
                      <td className="p-3 text-gray-700">{item.requiredMarks}</td>
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
