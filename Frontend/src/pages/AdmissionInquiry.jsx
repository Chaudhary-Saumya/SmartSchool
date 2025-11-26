import React, { useState } from 'react';
import { Search, Phone, Mail, Filter, Plus, RefreshCcw, Settings } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';
import TeacherTopbar from '../components/TeacherTopbar';
import { useNavigate } from 'react-router-dom';

export default function AdmissionInquiry() {
  const [activePage, setActivePage] = useState("admission"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const inquiries = [
    {
      student: 'Alice Johnson',
      guardian: 'Michael Johnson',
      contact: '+1234567890',
      email: 'alice.johnson@email.com',
      date: '11/22/2024',
      source: 'Website',
      status: 'Closed',
      followUp: '11/29/2024',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      student: 'David Smith',
      guardian: 'Laura Smith',
      contact: '+1234567890',
      email: 'david.smith@email.com',
      date: '11/21/2024',
      source: 'Referral',
      status: 'In Process',
      followUp: '11/30/2024',
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      student: 'Sophia Brown',
      guardian: 'David Brown',
      contact: '+1234567890',
      email: 'sophia.brown@email.com',
      date: '11/20/2024',
      source: 'Social Media',
      status: 'Closed',
      followUp: '12/01/2024',
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      student: 'Liam Wilson',
      guardian: 'Rebecca Wilson',
      contact: '+1234567890',
      email: 'liam.wilson@email.com',
      date: '11/19/2024',
      source: 'Website',
      status: 'New',
      followUp: '11/28/2024',
      avatar: 'https://i.pravatar.cc/40?img=4'
    },
    {
      student: 'Emma Martinez',
      guardian: 'Carlos Martinez',
      contact: '+1234567890',
      email: 'emma.martinez@email.com',
      date: '11/18/2024',
      source: 'Email',
      status: 'New',
      followUp: '11/27/2024',
      avatar: 'https://i.pravatar.cc/40?img=5'
    },
    {
      student: 'Olivia Garcia',
      guardian: 'Thomas Garcia',
      contact: '+1234567890',
      email: 'olivia.garcia@email.com',
      date: '11/17/2024',
      source: 'Website',
      status: 'New',
      followUp: '11/26/2024',
      avatar: 'https://i.pravatar.cc/40?img=6'
    },
    {
      student: 'Noah Taylor',
      guardian: 'Linda Taylor',
      contact: '+1234567890',
      email: 'noah.taylor@email.com',
      date: '11/16/2024',
      source: 'Social Media',
      status: 'In Process',
      followUp: '11/25/2024',
      avatar: 'https://i.pravatar.cc/40?img=7'
    },
    {
      student: 'Ava Anderson',
      guardian: 'James Anderson',
      contact: '+1234567890',
      email: 'ava.anderson@email.com',
      date: '11/15/2024',
      source: 'Website',
      status: 'Closed',
      followUp: '11/24/2024',
      avatar: 'https://i.pravatar.cc/40?img=8'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Closed':
        return 'bg-orange-100 text-orange-600';
      case 'In Process':
        return 'bg-purple-100 text-purple-600';
      case 'New':
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
        {role === "admin" ? (
          <Topbar />
        ) : role === "teacher" ? (
          <TeacherTopbar />
        ) : null}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center space-x-2 text-gray-500 mb-6 text-sm">
            <span>🏠 Front</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Admission Inquiry</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Admission Inquiry</h2>
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
                    <th className="p-3 text-left">Student Name</th>
                    <th className="p-3 text-left">Guardian Name</th>
                    <th className="p-3 text-left">Contact Number</th>
                    <th className="p-3 text-left">Email Address</th>
                    <th className="p-3 text-left">Date of Inquiry</th>
                    <th className="p-3 text-left">Inquiry Source</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Follow Up Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3"><input type="checkbox" /></td>
                      <td className="p-3 flex items-center space-x-2">
                        <img src={item.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                        <span className="text-gray-800 font-medium">{item.student}</span>
                      </td>
                      <td className="p-3 text-gray-700">{item.guardian}</td>
                      <td className="p-3 text-green-600 flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <input
                          type="tel"
                          value={item.contact}
                          className="border-none bg-transparent text-green-600 outline-none"
                          readOnly
                        />
                      </td>
                      <td className="p-3 text-red-500 flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <input
                          type="email"
                          value={item.email}
                          className="border-none bg-transparent text-red-500 outline-none"
                          readOnly
                        />
                      </td>
                      <td className="p-3 text-gray-700">{item.date}</td>
                      <td className="p-3 text-gray-700">{item.source}</td>
                      <td className="p-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>{item.status}</span></td>
                      <td className="p-3 text-gray-700">{item.followUp}</td>
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
