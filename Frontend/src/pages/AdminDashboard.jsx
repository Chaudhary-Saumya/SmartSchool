import React, { useState } from "react";
import {
  TrendingUp,
  GraduationCap,
  Users,
  DollarSign,
  BookOpen,
  Coffee,
  Clock,
  CalendarDays,
  Edit,
  Trash2,
  Settings,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard"); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const attendanceData = [
    { day: "Mon", students: 113 },
    { day: "Tue", students: 120 },
    { day: "Wed", students: 130 },
    { day: "Thu", students: 120 },
    { day: "Fri", students: 125 },
    { day: "Sat", students: 119 },
  ];

  const sportAchievements = [
    {
      name: "John Doe",
      coach: "Jacob Ryan",
      date: "12/05/2016",
      sport: "Cricket",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Smith",
      coach: "Rajesh",
      date: "12/05/2016",
      sport: "Boxing",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Airi Satou",
      coach: "Jay Soni",
      date: "12/05/2016",
      sport: "Tennis",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      name: "Angelica Ramos",
      coach: "John Deo",
      date: "12/05/2016",
      sport: "Hockey",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      name: "Ashton Cox",
      coach: "Megha Trivedi",
      date: "12/05/2016",
      sport: "Yoga",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      name: "Cara Stevens",
      coach: "Sarah Smith",
      date: "12/05/2016",
      sport: "Gymnastics",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];


  const admissionData = [
    { year: "2017", students: 30 },
    { year: "2018", students: 50 },
    { year: "2019", students: 80 },
    { year: "2020", students: 120 },
    { year: "2021", students: 60 },
  ];

  const pieData = [
    { name: "Paid", value: 65, color: "#22c55e" },
    { name: "Pending", value: 20, color: "#3b82f6" },
    { name: "Overdue", value: 10, color: "#ef4444" },
    { name: "Partial", value: 5, color: "#f97316" },
  ];

  const teacherActivities = [
    {
      title: "Algebra I",
      time: "08:00 - 09:30",
      location: "Room 101",
      color: "bg-green-500",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      title: "Department Meeting",
      time: "10:00 - 11:00",
      location: "Conference Room",
      color: "bg-blue-500",
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      title: "Lunch Break",
      time: "12:00 - 13:00",
      location: "Cafeteria",
      color: "bg-orange-500",
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      title: "Calculus II",
      time: "13:30 - 15:00",
      location: "Room 105",
      color: "bg-green-500",
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      title: "Office Hours",
      time: "15:30 - 17:00",
      location: "Office 203",
      color: "bg-purple-500",
      icon: <Clock className="w-4 h-4" />,
    },
  ];

  const examSchedule = [
    { standard: "Standard 1", color: "bg-red-100 text-red-500", dates: "23-03-2022 | 28-03-2022" },
    { standard: "Standard 2", color: "bg-blue-100 text-blue-500", dates: "10-03-2022 | 15-03-2022" },
    { standard: "Standard 3", color: "bg-yellow-100 text-yellow-500", dates: "03-04-2022 | 10-04-2022" },
    { standard: "Standard 4", color: "bg-green-100 text-green-500", dates: "11-05-2022 | 15-05-2022" },
    { standard: "Standard 5", color: "bg-pink-100 text-pink-500", dates: "17-05-2022 | 21-05-2022" },
    { standard: "Standard 6", color: "bg-blue-100 text-blue-500", dates: "23-05-2022 | 28-05-2022" },
  ];

  const teacherList = [
    { name: "Mr. Jay Soni", degree: "(M.Ed, PhD)", status: "Available", img: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Ms. Sarah Smith", degree: "(B.Ed, M.A.)", status: "Absent", img: "https://randomuser.me/api/portraits/women/12.jpg" },
    { name: "Ms. Megha Trivedi", degree: "(B.A, B.Ed)", status: "Available", img: "https://randomuser.me/api/portraits/women/13.jpg" },
    { name: "Mr. John Deo", degree: "(M.Sc, B.Ed)", status: "Available", img: "https://randomuser.me/api/portraits/men/14.jpg" },
    { name: "Mr. Jacob Ryan", degree: "(M.A, M.Ed)", status: "Absent", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
     <AdminSidebar logoutHandler={logoutHandler}/>
      <div className="flex-1 flex flex-col">
        <Topbar/>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Existing dashboard content remains unchanged */}
           <div className="flex-1 overflow-y-auto p-6">
          {/* Top Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-10 h-10" />
                <div>
                  <p className="text-sm text-gray-500">Total Sales</p>
                  <h3 className="text-2xl font-semibold text-green-600">1500</h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Total sales this month</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <GraduationCap className="text-green-600 w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <h3 className="text-2xl font-semibold text-green-600">125</h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Total course this month</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <Users className="text-green-600 w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-500">Total Teachers</p>
                  <h3 className="text-2xl font-semibold text-green-600">89</h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                12% Higher than last month
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <DollarSign className="text-green-600 w-8 h-8" />
                <div>
                  <p className="text-sm text-gray-500">Fees Collection</p>
                  <h3 className="text-2xl font-semibold text-green-600">$48,697</h3>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                22% Less than last month
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-3 gap-6">
            {/* Attendance */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Attendance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Present" fill="#22c55e" />
                  <Bar dataKey="Absent" fill="#a3e635" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Admission Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Admission Chart</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={admissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Fee Payment Status */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Fee Payment Status</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= Teacher Activity Tracker Section ================= */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            {/* Left Main Tracker */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">Teacher Activity Tracker</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>John Smith</span>
                  <span>Monday</span>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="teacher"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-gray-700">John Smith</h3>
                  <p className="text-sm text-gray-500">Mathematics</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex justify-between items-center mb-4 overflow-x-auto">
                {teacherActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className={`${act.color} text-white rounded-md p-3 w-40 mr-3`}
                  >
                    <div className="flex items-center mb-1 space-x-2">
                      {act.icon}
                      <p className="font-medium text-sm truncate">{act.title}</p>
                    </div>
                    <p className="text-xs">{act.time}</p>
                    <p className="text-xs">{act.location}</p>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 mb-4 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-green-500 rounded"></span>
                  <span>Class</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  <span>Meeting</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-orange-500 rounded"></span>
                  <span>Break</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-3 h-3 bg-purple-500 rounded"></span>
                  <span>Office Hours</span>
                </div>
              </div>

              {/* Activity List */}
              <div>
                <h3 className="text-md font-semibold mb-3">Activities for Monday</h3>
                <div className="space-y-2">
                  {teacherActivities.map((act, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 rounded-md px-4 py-2"
                    >
                      <p className="text-sm font-medium text-gray-700 w-32">
                        {act.time}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`p-2 rounded-full text-white ${act.color}`}
                        >
                          {act.icon}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{act.title}</p>
                          <p className="text-xs text-gray-500">{act.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side Panels */}
            <div className="space-y-6">
              {/* Exam Schedule */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h3 className="text-md font-semibold mb-4">Exam Schedule</h3>
                <div className="space-y-2">
                  {examSchedule.map((exam, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b last:border-0 pb-2"
                    >
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${exam.color}`}
                      >
                        {exam.standard}
                      </span>
                      <p className="text-sm text-gray-600">{exam.dates}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Appointments */}
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <h3 className="text-md font-semibold mb-2">Total Appointments</h3>
                <h1 className="text-3xl font-bold text-gray-700 mb-4">128</h1>
                <div className="flex justify-center space-x-6">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    <h4 className="text-xl font-semibold">73</h4>
                    <p className="text-xs">Completed</p>
                  </div>
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                    <h4 className="text-xl font-semibold">55</h4>
                    <p className="text-xs">Upcoming</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= End Teacher Activity Tracker Section ================= */}
        </div>

          {/* ===== New Section: Sports Achievements Dashboard ===== */}
          <div className="grid grid-cols-3 gap-6">
            {/* Sports Achievements */}
            <div className="col-span-2 bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Sport Achievements</h3>
                <a href="#" className="text-blue-500 text-sm font-medium hover:underline">View All</a>
              </div>

              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Patient Name</th>
                    <th className="py-2 text-left">Assigned Coach</th>
                    <th className="py-2 text-left">Date</th>
                    <th className="py-2 text-left">Sport Name</th>
                    <th className="py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sportAchievements.map((s, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-2 flex items-center space-x-3">
                        <img src={s.image} alt={s.name} className="w-8 h-8 rounded-full" />
                        <span>{s.name}</span>
                      </td>
                      <td>{s.coach}</td>
                      <td className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-gray-500" /> <span>{s.date}</span></td>
                      <td>{s.sport}</td>
                      <td className="flex space-x-2">
                        <Edit className="w-4 h-4 text-blue-500 cursor-pointer" />
                        <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Teacher List */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Teacher List</h3>
                <a href="#" className="text-blue-500 text-sm font-medium hover:underline">View All</a>
              </div>
              <div className="space-y-3">
                {teacherList.map((t, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={t.img} alt={t.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium text-gray-700 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.degree}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        t.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section with Students, Events, and Attendance */}
          <div className="grid grid-cols-3 gap-6">
            {/* Students Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Students</h3>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={[{ value: 2078, name: 'Male Students', fill: '#facc15' }, { value: 1825, name: 'Female Students', fill: '#3b82f6' }]} dataKey="value" innerRadius={50} outerRadius={70} labelLine={false} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-around w-full mt-2 text-sm">
                  <p className="text-blue-600 font-semibold">2,078 Male Students</p>
                  <p className="text-yellow-500 font-semibold">1,825 Female Students</p>
                </div>
              </div>
            </div>

            {/* Events Section */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-3 text-sm">
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Science Fair</p>
                    <p className="text-gray-500 text-xs">11:00 AM - 12:30 PM</p>
                  </div>
                  <span className="text-pink-500 text-xs font-medium">Today</span>
                </div>
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Guest Speaker</p>
                    <p className="text-gray-500 text-xs">11:00 AM - 12:30 PM</p>
                  </div>
                  <span className="text-pink-500 text-xs font-medium">In 8 days</span>
                </div>
                <div className="border rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Art Exhibition Opening</p>
                    <p className="text-gray-500 text-xs">04:00 PM - 05:30 PM</p>
                  </div>
                  <span className="text-pink-500 text-xs font-medium">In 11 days</span>
                </div>
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Average Class Attendance</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="students" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Floating Settings Icon */}
          <button className="fixed right-6 bottom-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
            <Settings className="w-5 h-5" />
          </button>

                <div className="grid gap-6">
  {/* Student Admission Info */}
  <div className="col-span-2 bg-white rounded-xl shadow-sm p-4 overflow-x-auto">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold text-gray-800">Student Admission</h3>
      <a href="#" className="text-blue-500 text-sm font-medium hover:underline">
        View All
      </a>
    </div>

    <table className="w-full text-sm text-gray-700 min-w-[1000px]">
      <thead>
        <tr className="border-b bg-gray-50 text-gray-700">
          <th className="py-2 text-left">Student Name</th>
          <th className="py-2 text-left">Phone</th>
          <th className="py-2 text-left">Address</th>
          <th className="py-2 text-left">Branch</th>
          <th className="py-2 text-left">Date Of Admission</th>
          <th className="py-2 text-left">Fees Receipt</th>
          <th className="py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {[
          {
            name: "John Deo",
            phone: "(123)123456",
            address: "9946 Baker Rd. Marysville",
            branch: "Mechanical",
            date: "12/08/2019",
            img: "https://randomuser.me/api/portraits/men/5.jpg",
          },
          {
            name: "Sarah Smith",
            phone: "(321)654987",
            address: "21 Lake View Street, Boston",
            branch: "Civil",
            date: "11/15/2020",
            img: "https://randomuser.me/api/portraits/women/10.jpg",
          },
          {
            name: "Michael Brown",
            phone: "(555)786342",
            address: "98 West Park Ave, Chicago",
            branch: "Electrical",
            date: "02/05/2021",
            img: "https://randomuser.me/api/portraits/men/7.jpg",
          },
          {
            name: "Ava Johnson",
            phone: "(111)236589",
            address: "45 River Street, Dallas",
            branch: "Computer",
            date: "09/11/2021",
            img: "https://randomuser.me/api/portraits/women/22.jpg",
          },
          {
            name: "Robert Lee",
            phone: "(555)963852",
            address: "201 King Avenue, Seattle",
            branch: "IT",
            date: "01/19/2022",
            img: "https://randomuser.me/api/portraits/men/12.jpg",
          },
          {
            name: "Emma Wilson",
            phone: "(333)741852",
            address: "77 Garden Rd, Los Angeles",
            branch: "Mechanical",
            date: "03/07/2022",
            img: "https://randomuser.me/api/portraits/women/30.jpg",
          },
          {
            name: "James Anderson",
            phone: "(444)123987",
            address: "88 Westway Street, Miami",
            branch: "Civil",
            date: "06/23/2023",
            img: "https://randomuser.me/api/portraits/men/15.jpg",
          },
          {
            name: "Sophia Martinez",
            phone: "(777)999000",
            address: "52 Elm St, San Francisco",
            branch: "Electrical",
            date: "08/13/2023",
            img: "https://randomuser.me/api/portraits/women/35.jpg",
          },
          {
            name: "Liam Walker",
            phone: "(555)222333",
            address: "62 Hill Road, Denver",
            branch: "Computer",
            date: "04/21/2024",
            img: "https://randomuser.me/api/portraits/men/33.jpg",
          },
          {
            name: "Olivia Taylor",
            phone: "(222)888777",
            address: "14 Maple Lane, New York",
            branch: "IT",
            date: "09/01/2024",
            img: "https://randomuser.me/api/portraits/women/45.jpg",
          },
        ].map((s, i) => (
          <tr key={i} className="border-b hover:bg-gray-50 whitespace-nowrap">
            <td className="py-2 flex items-center space-x-3">
              <img src={s.img} alt={s.name} className="w-8 h-8 rounded-full" />
              <span>{s.name}</span>
            </td>
            <td>{s.phone}</td>
            <td>{s.address}</td>
            <td>{s.branch}</td>
            <td className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" /> <span>{s.date}</span>
            </td>
            <td>
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                View
              </button>
            </td>
            <td className="flex space-x-2">
              <Edit className="w-4 h-4 text-blue-500 cursor-pointer" />
              <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



        </div>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
