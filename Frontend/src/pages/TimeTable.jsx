import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AdminSidebar from "../components/AdminSidebar";
import TeacherSidebar from "../components/TeacherSidebar";
import Topbar from "../components/Topbar";

const Timetable = () => {
  const [activePage, setActivePage] = useState("time-table"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const timetable = [
    {
      time: "08:00",
      monday: "English Studies",
      tuesday: "Lang. Lab / English Studies",
      wednesday: "Physical Education",
      thursday: "French Language",
      friday: "Mathematics",
    },
    {
      time: "08:40",
      monday: "Cultural and Creative Arts",
      tuesday: "Mathematics",
      wednesday: "English Diction",
      thursday: "Mathematics",
      friday: "English Studies",
    },
    {
      time: "09:20",
      monday: "Mathematics",
      tuesday: "English Studies",
      wednesday: "Mathematics",
      thursday: "Social Studies",
      friday: "G.P / Voc. Apt",
    },
    {
      time: "10:00",
      monday: "Break",
      tuesday: "Break",
      wednesday: "Break",
      thursday: "Break",
      friday: "Break",
    },
    {
      time: "10:40",
      monday: "English Studies",
      tuesday: "Mathematics",
      wednesday: "Chinese Language / Creative Writing",
      thursday: "Phonics",
      friday: "Phonetics",
    },
    {
      time: "11:20",
      monday: "Basic Science and Technology",
      tuesday: "Health Education",
      wednesday: "Cultural and Creative Arts",
      thursday: "English Studies",
      friday: "English Studies",
    },
    {
      time: "12:00",
      monday: "Reading Eggs",
      tuesday: "Handwriting / Ind. Reading",
      wednesday: "Mathematics",
      thursday: "Mathematics",
      friday: "Mathematics",
    },
    {
      time: "12:40",
      monday: "ICT",
      tuesday: "News",
      wednesday: "Handwriting / Ind. Reading",
      thursday: "Handwriting / Ind. Reading",
      friday: "Reading Club",
    },
    {
      time: "01:20",
      monday: "Handwriting / Ind. Reading",
      tuesday: "Civic Education",
      wednesday: "English Studies",
      thursday: "Mathematics",
      friday: "Creative Arts",
    },
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
          <div className="mb-4 flex items-center space-x-2 text-gray-600 text-sm">
            <span className="font-semibold text-gray-800 text-lg">Class Timetable</span>
            <span>›</span>
            <span>Class</span>
            <span>›</span>
            <span className="text-gray-500">Class Timetable</span>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200">
          <thead className="bg-[#3f51b5] text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">TIME</th>
              <th className="py-3 px-4 text-left font-semibold">MONDAY</th>
              <th className="py-3 px-4 text-left font-semibold">TUESDAY</th>
              <th className="py-3 px-4 text-left font-semibold">WEDNESDAY</th>
              <th className="py-3 px-4 text-left font-semibold">THURSDAY</th>
              <th className="py-3 px-4 text-left font-semibold">FRIDAY</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 font-medium text-gray-800">{row.time}</td>
                <td className={`py-2 px-4 ${row.monday === "Break" ? "bg-gray-100 font-semibold" : ""}`}>{row.monday}</td>
                <td className={`py-2 px-4 ${row.tuesday === "Break" ? "bg-gray-100 font-semibold" : ""}`}>{row.tuesday}</td>
                <td className={`py-2 px-4 ${row.wednesday === "Break" ? "bg-gray-100 font-semibold" : ""}`}>{row.wednesday}</td>
                <td className={`py-2 px-4 ${row.thursday === "Break" ? "bg-gray-100 font-semibold" : ""}`}>{row.thursday}</td>
                <td className={`py-2 px-4 ${row.friday === "Break" ? "bg-gray-100 font-semibold" : ""}`}>{row.friday}</td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;