import React, { useState } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2, CreditCard } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';

export default function AllFees() {
  const [activePage, setActivePage] = useState("all-fees"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const feesData = [
    {
      rollNo: 1,
      studentName: 'Jenish Shah',
      className: '10th Grade',
      feesType: 'Library',
      invoiceNo: 'IN-5645644',
      paymentDueDate: '03/01/2019',
      paymentDate: '-',
      paymentType: '-',
      status: 'Pending',
      amount: '170$',
      notes: 'N/A',
      avatar: 'https://i.pravatar.cc/40?img=14'
    },
    {
      rollNo: 2,
      studentName: 'Aarav Patel',
      className: '9th Grade',
      feesType: 'Tuition',
      invoiceNo: 'IN-7845211',
      paymentDueDate: '05/15/2024',
      paymentDate: '05/10/2024',
      paymentType: 'Online',
      status: 'Paid',
      amount: '350$',
      notes: 'Full payment done',
      avatar: 'https://i.pravatar.cc/40?img=15'
    },
    {
      rollNo: 3,
      studentName: 'Kavya Mehta',
      className: '11th Grade',
      feesType: 'Exam',
      invoiceNo: 'IN-9988776',
      paymentDueDate: '06/01/2024',
      paymentDate: '—',
      paymentType: '—',
      status: 'Overdue',
      amount: '200$',
      notes: 'Late fee applicable',
      avatar: 'https://i.pravatar.cc/40?img=16'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Overdue':
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
            <span className="text-gray-900 font-medium">Student Fees Management</span>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Student Fees Management</h2>
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
                    <th className="p-3 text-left w-16">Roll No</th>
                    <th className="p-3 text-left w-32">Student Name</th>
                    <th className="p-3 text-left w-20">Class</th>
                    <th className="p-3 text-left w-20">Fees Type</th>
                    <th className="p-3 text-left w-24">Invoice No</th>
                    <th className="p-3 text-left w-24">Payment Due Date</th>
                    <th className="p-3 text-left w-20">Payment Date</th>
                    <th className="p-3 text-left w-20">Payment Type</th>
                    <th className="p-3 text-left w-16">Status</th>
                    <th className="p-3 text-left w-16">Amount</th>
                    <th className="p-3 text-left w-24">Notes</th>
                    <th className="p-3 text-left w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {feesData.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 text-gray-800 font-medium">{item.rollNo}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="student" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.studentName}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">{item.className}</td>
                      <td className="p-3 text-gray-700">{item.feesType}</td>
                      <td className="p-3 text-gray-700">{item.invoiceNo}</td>
                      <td className="p-3 text-gray-700">{item.paymentDueDate}</td>
                      <td className="p-3 text-gray-700">{item.paymentDate}</td>
                      <td className="p-3 flex items-center text-blue-600 space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>{item.paymentType}</span>
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-700 font-medium">{item.amount}</td>
                      <td className="p-3 text-gray-700">{item.notes}</td>
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
