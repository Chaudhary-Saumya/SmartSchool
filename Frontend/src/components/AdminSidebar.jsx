import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Users,
  GraduationCap,
  Library,
  Building,
  Briefcase,
  Bed,
  CalendarDays,
  DollarSign,
  Layers,
  Power,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ logoutHandler }) => {
  const [openMenus, setOpenMenus] = useState({
    dashboard: false,
    frontOffice: false,
    teachers: false,
    students: false,
    courses: false,
    library: false,
    departments: false,
    staff: false,
    holiday: false,
    fees: false,
    class: false,
    hostel: false,
    hr: false,
  });

  const [user, setUser] = useState({
    name: "Loading...",
    role: "Admin",
    profileImage: "https://randomuser.me/api/portraits/men/45.jpg"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.user.name || "Admin User",
            role: data.user.role || "Admin",
            profileImage: data.user.profileImage || "https://randomuser.me/api/portraits/men/45.jpg"
          });
        } else {
          // If profile fetch fails, use default values
          setUser({
            name: "Admin User",
            role: "Admin",
            profileImage: "https://randomuser.me/api/portraits/men/45.jpg"
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          name: "Admin User",
          role: "Admin",
          profileImage: "https://randomuser.me/api/portraits/men/45.jpg"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenus({ ...openMenus, [menu]: !openMenus[menu] });
  };

  return (
    <div className="w-72 bg-white shadow-sm h-screen p-4 flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profileImage}
          alt="profile"
          className="w-20 h-20 rounded-full shadow"
        />
        <h3 className="mt-3 text-gray-800 font-semibold text-lg">
          {loading ? "Loading..." : user.name}
        </h3>
        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
      </div>

      <p className="text-xs text-gray-500 mb-2 font-semibold tracking-widest">
        MAIN
      </p>

      <div className="flex-1 overflow-y-auto text-gray-700">
        {/* Dashboard */}
        <button
          onClick={() => toggleMenu("dashboard")}
          className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
            openMenus.dashboard ? "bg-gray-100" : ""
          }`}
        >
          <div className="flex items-center">
            <LayoutDashboard className="w-4 h-4 mr-3" /> Dashboard
          </div>
          {openMenus.dashboard ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Front Office */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("frontOffice")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.frontOffice ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <ClipboardList className="w-4 h-4 mr-3" /> Front Office
            </div>
            {openMenus.frontOffice ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.frontOffice && (
            <div className="ml-8 mt-1 text-[15px] space-y-1">
              <Link to="/admission-inquiry" className="block hover:text-blue-600 mb-2">
                Admission Inquiry
              </Link>
              <Link to="/visitors-book" className="block hover:text-blue-600 mb-2">
                Visitors Book
              </Link>
              <Link to="/complains" className="block hover:text-blue-600 mb-2">
                Complaints
              </Link>
            </div>
          )}
        </div>

        {/* Teachers */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("teachers")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.teachers ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <User className="w-4 h-4 mr-3" /> Teachers
            </div>
            {openMenus.teachers ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.teachers && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-teachers" className="block hover:text-blue-600 mb-2">
                All Teachers
              </Link>
              <Link to="/add-teacher" className="block hover:text-blue-600 mb-2">
                Add Teacher
              </Link>
              <Link to="/edit-teacher" className="block hover:text-blue-600 mb-2">
                Edit Teacher
              </Link>
              <Link to="/about-teacher" className="block hover:text-blue-600 mb-2">
                About Teacher
              </Link>
              <Link to="/teacher-timetable" className="block hover:text-blue-600 mb-2">
                Teacher Timetable
              </Link>
              <Link to="/assignTeacher" className="block hover:text-blue-600 mb-2">
                Assign Class Teacher
              </Link>
            </div>
          )}
        </div>

        {/* Students */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("students")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.students ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-3" /> Students
            </div>
            {openMenus.students ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.students && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-students" className="block hover:text-blue-600 mb-2">
                All Students
              </Link>
              <Link to="/add-student" className="block hover:text-blue-600 mb-2">
                Add Student
              </Link>
              <Link to="/edit-student" className="block hover:text-blue-600 mb-2">
                Edit Student
              </Link>
              <Link to="/about-student" className="block hover:text-blue-600 mb-2">
                About Student
              </Link>
              <Link to="/students-attendance" className="block hover:text-blue-600 mb-2">
                Student Attendance
              </Link>
            </div>
          )}
        </div>

        {/* Courses */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("courses")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.courses ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-3" /> Courses
            </div>
            {openMenus.courses ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.courses && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-courses" className="block hover:text-blue-600 mb-2">
                All Courses
              </Link>
              <Link to="/add-course" className="block hover:text-blue-600 mb-2">
                Add Course
              </Link>
              <Link to="/edit-course" className="block hover:text-blue-600 mb-2">
                Edit Course
              </Link>
              <Link to="/about-course" className="block hover:text-blue-600 mb-2">
                About Course
              </Link>
            </div>
          )}
        </div>

        {/* Library */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("library")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.library ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Library className="w-4 h-4 mr-3" /> Library
            </div>
            {openMenus.library ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.library && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-Assets" className="block hover:text-blue-600 mb-2">
                All Library Assets
              </Link>
              <Link to="/add-asset" className="block hover:text-blue-600 mb-2">
                Add Library Asset
              </Link>
              <Link to="/edit-asset" className="block hover:text-blue-600 mb-2">
                Edit Library Asset
              </Link>
              <Link to="/book-management" className="block hover:text-blue-600 mb-2">
                Book Status
              </Link>
            </div>
          )}
        </div>

        {/* Departments */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("departments")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.departments ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Building className="w-4 h-4 mr-3" /> Departments
            </div>
            {openMenus.departments ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.departments && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-departments" className="block hover:text-blue-600 mb-2">
                All Departments
              </Link>
              <Link to="/add-department" className="block hover:text-blue-600 mb-2">
                Add Department
              </Link>
              <Link to="/edit-department" className="block hover:text-blue-600 mb-2">
                Edit Department
              </Link>
            </div>
          )}
        </div>

        {/* Staff */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("staff")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.staff ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-3" /> Staff
            </div>
            {openMenus.staff ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.staff && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-staffs" className="block hover:text-blue-600 mb-2">
                All Staff
              </Link>
              <Link to="/add-staff" className="block hover:text-blue-600 mb-2">
                Add Staff
              </Link>
              <Link to="/edit-staff" className="block hover:text-blue-600 mb-2">
                Edit Staff
              </Link>
              <Link to="/about-staff" className="block hover:text-blue-600 mb-2">
                About Staff
              </Link>
              <Link to="/staff-attendance" className="block hover:text-blue-600 mb-2">
                Staff Attendance
              </Link>
            </div>
          )}
        </div>

        {/* Holiday */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("holiday")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.holiday ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-3" /> Holiday
            </div>
            {openMenus.holiday ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.holiday && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-holidays" className="block hover:text-blue-600 mb-2">
                All Holidays
              </Link>
              <Link to="/add-holiday" className="block hover:text-blue-600 mb-2">
                Add Holiday
              </Link>
              <Link to="/edit-holiday" className="block hover:text-blue-600 mb-2">
                Edit Holiday
              </Link>
            </div>
          )}
        </div>

        {/* Fees */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("fees")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.fees ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-3" /> Fees
            </div>
            {openMenus.fees ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.fees && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/all-fees" className="block hover:text-blue-600 mb-2">
                All Fees
              </Link>
              <Link to="/add-fee" className="block hover:text-blue-600 mb-2">
                Add Fees
              </Link>
              <Link to="/edit-fee" className="block hover:text-blue-600 mb-2">
                Edit Fees
              </Link>
              <Link to="/fees-type" className="block hover:text-blue-600 mb-2">
                Fees Type
              </Link>
              <Link to="/fees-discount" className="block hover:text-blue-600 mb-2">
                Fees Discount
              </Link>
              <Link to="/fee-receipt" className="block hover:text-blue-600 mb-2">
                Fee Receipt
              </Link>
            </div>
          )}
        </div>

        {/* Class */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("class")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.class ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-3" /> Class
            </div>
            {openMenus.class ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.class && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/class-list" className="block hover:text-blue-600 mb-2">
                Class List
              </Link>
              <Link to="/timetable" className="block hover:text-blue-600 mb-2">
                Class Timetable
              </Link>
            </div>
          )}
        </div>

        {/* Hostel */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("hostel")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.hostel ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-3" /> Hostel
            </div>
            {openMenus.hostel ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.hostel && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/room-list" className="block hover:text-blue-600 mb-2">
                Room List
              </Link>
              <Link to="/room-type" className="block hover:text-blue-600 mb-2">
                Room Type
              </Link>
            </div>
          )}
        </div>

        {/* Human Resources */}
        <div className="mt-1">
          <button
            onClick={() => toggleMenu("hr")}
            className={`flex items-center justify-between w-full py-2 px-3 rounded-md hover:bg-gray-100 ${
              openMenus.hr ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-3" /> Human Resources
            </div>
            {openMenus.hr ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          {openMenus.hr && (
            <div className="ml-8 mt-1 text-sm space-y-1">
              <Link to="/admin-leave-requests" className="block hover:text-blue-600 mb-2">
                Leave Requests
              </Link>
              <Link to="/employee-leave-balance" className="block hover:text-blue-600 mb-2">
                Employee Leave Balance
              </Link>
              <Link to="/leave-types" className="block hover:text-blue-600 mb-2">
                Leave Types
              </Link>
              <Link to="/holidays" className="block hover:text-blue-600 mb-2">
                Holidays
              </Link>
              <Link to="/todays-attendance" className="block hover:text-blue-600 mb-2">
                Today's Attendance
              </Link>
              <Link to="/attendance-detail" className="block hover:text-blue-600 mb-2">
                Attendance Detail
              </Link>
              <Link to="/attendance-sheet" className="block hover:text-blue-600 mb-2">
                Attendance Sheet
              </Link>
              <Link to="/employee-salary" className="block hover:text-blue-600 mb-2">
                Employee Salary
              </Link>
              <Link to="/payslip" className="block hover:text-blue-600 mb-2">
                Payslip
              </Link>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logoutHandler}
          className="flex items-center w-full py-2 px-3 mt-4 rounded-md hover:bg-red-50 transition text-red-600"
        >
          <Power className="w-4 h-4 mr-3" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
