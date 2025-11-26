import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  RefreshCcw,
  Settings,
  Edit,
  Trash2,
  Home,
  CalendarDays,
  Building2,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

export default function RoomList() {
  // eslint-disable-next-line no-unused-vars
  const [activePage, setActivePage] = useState("room-list");
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const rooms = [
    {
      roomNumber: "101",
      roomType: "Single",
      floor: "1",
      capacity: 1,
      status: "Occupied",
      occupants: 1,
      price: "1000",
      condition: "Good",
      assignedDate: "08/01/2024",
      checkIn: "08/01/2024",
      block: "A Block",
    },
    {
      roomNumber: "202",
      roomType: "Double",
      floor: "2",
      capacity: 2,
      status: "Available",
      occupants: 0,
      price: "1800",
      condition: "Excellent",
      assignedDate: "—",
      checkIn: "—",
      block: "B Block",
    },
    {
      roomNumber: "303",
      roomType: "Dormitory",
      floor: "3",
      capacity: 6,
      status: "Maintenance",
      occupants: 0,
      price: "2500",
      condition: "Under Repair",
      assignedDate: "—",
      checkIn: "—",
      block: "C Block",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Occupied":
        return "bg-yellow-100 text-yellow-700";
      case "Available":
        return "bg-green-100 text-green-600";
      case "Maintenance":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
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
            <span className="text-gray-900 font-medium">Room Management</span>
          </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Room Management
          </h2>
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
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 text-left w-10">
                  <input type="checkbox" />
                </th>
                <th className="p-3 text-left">Room Number</th>
                <th className="p-3 text-left">Room Type</th>
                <th className="p-3 text-left">Floor</th>
                <th className="p-3 text-left">Capacity</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Occupants</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Condition</th>
                <th className="p-3 text-left">Assigned Date</th>
                <th className="p-3 text-left">Check In</th>
                <th className="p-3 text-left">Block</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 flex items-center space-x-1 text-gray-800 font-medium">
                    <Home className="w-4 h-4 text-blue-500" />
                    <span>{room.roomNumber}</span>
                  </td>
                  <td className="p-3 text-gray-700">{room.roomType}</td>
                  <td className="p-3 text-gray-700">{room.floor}</td>
                  <td className="p-3 text-gray-700">{room.capacity}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        room.status
                      )}`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{room.occupants}</td>
                  <td className="p-3 text-gray-700 font-medium">
                    ₹{room.price}
                  </td>
                  <td className="p-3 text-gray-700">{room.condition}</td>
                  <td className="p-3 flex items-center space-x-1 text-blue-600">
                    <CalendarDays className="w-4 h-4" />
                    <span>{room.assignedDate}</span>
                  </td>
                  <td className="p-3 flex items-center space-x-1 text-blue-600">
                    <CalendarDays className="w-4 h-4" />
                    <span>{room.checkIn}</span>
                  </td>
                  <td className="p-3 flex items-center space-x-1 text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span>{room.block}</span>
                  </td>
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
