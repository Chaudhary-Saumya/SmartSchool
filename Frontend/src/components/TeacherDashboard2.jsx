import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeacherDashboard2 = () => {
  // Dummy data
  const weeklySchedule = [
    { day: "Monday", date: "Dec 1", classes: 3 },
    { day: "Tuesday", date: "Dec 2", classes: 2 },
    { day: "Wednesday", date: "Nov 26", classes: 3 },
    { day: "Thursday", date: "Nov 27", classes: 2 },
    { day: "Friday", date: "Nov 28", classes: 3 },
  ];

  const studentProgressData = [
    { month: "Jan", Mathematics: 70, Science: 75, English: 80, History: 78, Art: 85 },
    { month: "Feb", Mathematics: 72, Science: 78, English: 81, History: 80, Art: 83 },
    { month: "Mar", Mathematics: 75, Science: 80, English: 85, History: 82, Art: 88 },
    { month: "Apr", Mathematics: 78, Science: 82, English: 87, History: 84, Art: 90 },
    { month: "May", Mathematics: 80, Science: 85, English: 88, History: 86, Art: 92 },
    { month: "Jun", Mathematics: 82, Science: 87, English: 90, History: 88, Art: 94 },
  ];

  const topStudents = [
    { rank: 1, name: "Emma Thompson", subject: "Mathematics", progress: 98, change: "+5%" },
    { rank: 2, name: "James Wilson", subject: "Science", progress: 96, change: "+3%" },
    { rank: 3, name: "Sophia Garcia", subject: "English", progress: 95, change: "+7%" },
  ];

  const messages = [
    { title: "Staff Meeting Reminder", sender: "Principal Johnson", date: "Yesterday", priority: "HIGH" },
    { title: "New Grading System Update", sender: "IT Department", date: "2 days ago", priority: "MEDIUM" },
    { title: "Parent-Teacher Conference Schedule", sender: "Vice Principal Smith", date: "3 days ago", priority: "MEDIUM" },
    { title: "Fire Drill Scheduled", sender: "Safety Committee", date: "4 days ago", priority: "HIGH" },
    { title: "Professional Development Opportunity", sender: "Academic Affairs", date: "5 days ago", priority: "LOW" },
    { title: "Classroom Supply Requests", sender: "Administrative Office", date: "6 days ago", priority: "MEDIUM" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6">
      {/* =================== Dashboard Layout =================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Class Schedule */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-md">
              Weekly Class Schedule
            </h3>
            <a
              href="#"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              View All
            </a>
          </div>
          {weeklySchedule.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{item.day}</p>
                <p className="text-gray-500 text-sm">{item.date}</p>
              </div>
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {item.classes} Classes
              </span>
            </div>
          ))}
          <div className="flex mt-4 space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
              <span>Print</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Full Schedule
            </button>
          </div>
        </div>

        {/* Student Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-md">
              Student Progress
            </h3>
            <a
              href="#"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              View Details
            </a>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={studentProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Mathematics" stroke="#22c55e" />
              <Line type="monotone" dataKey="Science" stroke="#3b82f6" />
              <Line type="monotone" dataKey="English" stroke="#facc15" />
              <Line type="monotone" dataKey="History" stroke="#ef4444" />
              <Line type="monotone" dataKey="Art" stroke="#a855f7" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performing Students */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-md">
              Top Performing Students
            </h3>
            <a
              href="#"
              className="text-blue-500 text-sm font-medium hover:underline"
            >
              View All
            </a>
          </div>
          {topStudents.map((student) => (
            <div
              key={student.rank}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-lg">{student.rank}</span>
                <img
                  src={`https://randomuser.me/api/portraits/${
                    student.rank % 2 === 0 ? "women" : "men"
                  }/${student.rank * 10}.jpg`}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{student.name}</p>
                  <span className="text-sm text-gray-500">
                    {student.subject}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-green-500">{student.change}</span>
                <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                  {student.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Center */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-md">
              Message Center <span className="text-red-500">4</span>
            </h3>
          </div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div>
                <p className="font-medium">{msg.title}</p>
                <p className="text-gray-500 text-sm">
                  {msg.sender} • {msg.date}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  msg.priority === "HIGH"
                    ? "bg-red-100 text-red-600"
                    : msg.priority === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {msg.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard2;
