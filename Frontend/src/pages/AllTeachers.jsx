import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, RefreshCcw, Settings, Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../components/AdminSidebar';
import TeacherSidebar from '../components/TeacherSidebar';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';

export default function AllTeachers() {
  const [activePage, setActivePage] = useState("all-teachers"); // eslint-disable-line no-unused-vars
  const role = localStorage.getItem("role") || "";
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/teachers", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Transform API data to match the expected format for the table
          const formattedTeachers = data.data.map(teacher => ({
            id: teacher.id,
            name: teacher.name,
            department: teacher.education || 'Not specified',
            email: teacher.email,
            gender: 'Not specified', // Database doesn't have gender field
            mobile: teacher.mobile_number || 'Not specified',
            degree: teacher.education || 'Not specified',
            address: teacher.address || 'Not specified',
            hireDate: teacher.created_at ? new Date(teacher.created_at).toLocaleDateString() : 'Not specified',
            salary: 'Not specified', // Database doesn't have salary field
            avatar: teacher.profile_image
          }));
          setStaff(formattedTeachers);
        } else {
          setError("Failed to fetch teachers data");
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError("Error loading teachers data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Keep the hardcoded data as fallback if API fails
  const fallbackStaff = [
    {
      name: 'John Doe',
      department: 'Computer Science',
      email: 'john.doe@email.com',
      gender: 'Male',
      mobile: '+1234567890',
      degree: 'MCA',
      address: '123 Main Street, Ahmedabad',
      hireDate: '01/12/2021',
      salary: '₹60,000',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    {
      name: 'Emily Smith',
      department: 'Mathematics',
      email: 'emily.smith@email.com',
      gender: 'Female',
      mobile: '+1234567890',
      degree: 'M.Sc. Mathematics',
      address: '456 Green Avenue, Surat',
      hireDate: '05/03/2022',
      salary: '₹55,000',
      avatar: 'https://i.pravatar.cc/40?img=2'
    },
    {
      name: 'David Johnson',
      department: 'Physics',
      email: 'david.johnson@email.com',
      gender: 'Male',
      mobile: '+1234567890',
      degree: 'Ph.D. Physics',
      address: '789 Hill Road, Vadodara',
      hireDate: '09/20/2020',
      salary: '₹70,000',
      avatar: 'https://i.pravatar.cc/40?img=3'
    },
    {
      name: 'Sophia Brown',
      department: 'Chemistry',
      email: 'sophia.brown@email.com',
      gender: 'Female',
      mobile: '+1234567890',
      degree: 'M.Sc. Chemistry',
      address: '987 Oak Street, Rajkot',
      hireDate: '07/11/2023',
      salary: '₹50,000',
      avatar: 'https://i.pravatar.cc/40?img=4'
    }
  ];

  // Use fallback data if API data is empty and not loading
  const displayStaff = staff.length > 0 ? staff : (!loading ? fallbackStaff : []);

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
            <span className="text-gray-900 font-medium">Staff List</span>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 w-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Staff List
                {loading && <span className="ml-2 text-sm text-gray-500">(Loading...)</span>}
                {error && <span className="ml-2 text-sm text-red-500">({error})</span>}
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
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Filter className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><RefreshCcw className="w-4 h-4 text-gray-600" /></button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm whitespace-nowrap">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="p-3 text-left w-10"><input type="checkbox" /></th>
                    <th className="p-3 text-left" style={{ width: '200px' }}>Name</th>
                    <th className="p-3 text-left" style={{ width: '150px' }}>Department</th>
                    <th className="p-3 text-left" style={{ width: '200px' }}>Email</th>
                    <th className="p-3 text-left" style={{ width: '80px' }}>Gender</th>
                    <th className="p-3 text-left" style={{ width: '120px' }}>Mobile</th>
                    <th className="p-3 text-left" style={{ width: '150px' }}>Degree</th>
                    <th className="p-3 text-left" style={{ width: '250px' }}>Address</th>
                    <th className="p-3 text-left" style={{ width: '100px' }}>Hire Date</th>
                    <th className="p-3 text-left" style={{ width: '100px' }}>Salary</th>
                    <th className="p-3 text-left" style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="11" className="p-8 text-center text-gray-500">
                        Loading teachers data...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="11" className="p-8 text-center text-red-500">
                        {error}
                      </td>
                    </tr>
                  ) : displayStaff.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="p-8 text-center text-gray-500">
                        No teachers found
                      </td>
                    </tr>
                  ) : (
                    displayStaff.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3" style={{ width: '40px' }}><input type="checkbox" /></td>
                      <td className="p-3" style={{ width: '200px' }}>
                        <div className="flex items-center space-x-2">
                          <img src={item.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                          <span className="text-gray-800 font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700" style={{ width: '150px' }}>{item.department}</td>
                      <td className="p-3 text-gray-700" style={{ width: '200px' }}>{item.email}</td>
                      <td className="p-3 text-gray-700" style={{ width: '80px' }}>{item.gender}</td>
                      <td className="p-3 text-gray-700" style={{ width: '120px' }}>{item.mobile}</td>
                      <td className="p-3 text-gray-700" style={{ width: '150px' }}>{item.degree}</td>
                      <td className="p-3 text-gray-700" style={{ width: '250px' }}>{item.address}</td>
                      <td className="p-3 text-gray-700" style={{ width: '100px' }}>{item.hireDate}</td>
                      <td className="p-3 text-gray-700" style={{ width: '100px' }}>{item.salary}</td>
                      <td className="p-3 flex space-x-2" style={{ width: '100px' }}>
                        <button className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><Edit className="w-4 h-4" /></button>
                        <button className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                    ))
                  )}
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
