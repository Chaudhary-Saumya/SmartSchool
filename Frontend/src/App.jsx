import React from 'react'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdmissionInquiry from './pages/AdmissionInquiry';
import VisitorsBook from './pages/VisitorsBook';
import Complains from './pages/Complains';
import AllTeachers from './pages/AllTeachers';
import AssignClassTeacher from './pages/AssignClassTeacher';
import AllStudents from './pages/AllStudents';
import StudentsAttendance from './pages/StudentsAttendance';
import AllAssets from './pages/AllAssets';
import BookManagement from './pages/BookManagement';
import AllDepartments from './pages/AllDepartments';
import AllStaffs from './pages/AllStaffs';
import StaffAttendance from './pages/StaffAttendance';
import AllHolidays from './pages/AllHolidays';
import AllFees from './pages/AllFees';
import FeesType from './pages/FeesType';
import FeesDiscount from './pages/FeesDiscount';
import ClassList from './pages/ClassList';
import RoomList from './pages/RoomList';
import RoomType from './pages/RoomType';
import AddTeacher from './pages/AddTeacher';
import EditTeacher from './pages/EditTeacher';
import AddStudent from './pages/AddStudent';
import AddCourse from './pages/AddCourse';
import AddStaff from './pages/AddStaff';
import EditStaff from './pages/EditStaff';
import AboutTeacher from './pages/AboutTeacher';
import AboutStudent from './pages/AboutStudent';
import AboutStaffs from './pages/AboutStaffs';
import EditStudent from './pages/EditStudents';
import AllCourse from './pages/AllCourse';
import AddLibrary from './pages/AddLibrary';
import EditLibrary from './pages/EditLibrary';
import AddDepartment from './pages/AddDepartment';
import EditDepartment from './pages/EditDepartment';
import EditCourse from './pages/EditCourse';
import AboutCourse from './pages/AboutCourse';
import AddHoliday from './pages/AddHoliday';
import EditHoliday from './pages/EditHoliday';
import AddFees from './pages/AddFees';
import EditFees from './pages/EditFees';
import Timetable from './pages/TimeTable';
import TeacherDashboard from './pages/TeacherDashboard';
import Lectures from './pages/Lectures';
import LeaveRequests from './pages/LeaveRequests';
import AdminLeaveRequests from './pages/AdminLeaveRequests';
import ExamSchedule from './pages/ExamSchedule';
import MyClasses from './pages/MyClasses';
import SubjectsTaught from './pages/SubjectsTaught';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admission-inquiry"
          element={
            <ProtectedRoute>
              <AdmissionInquiry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visitors-book"
          element={
            <ProtectedRoute>
              <VisitorsBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complains"
          element={
            <ProtectedRoute>
              <Complains />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-teachers"
          element={
            <ProtectedRoute>
              <AllTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assignTeacher"
          element={
            <ProtectedRoute>
              <AssignClassTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-students"
          element={
            <ProtectedRoute>
              <AllStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students-attendance"
          element={
            <ProtectedRoute>
              <StudentsAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-Assets"
          element={
            <ProtectedRoute>
              <AllAssets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-management"
          element={
            <ProtectedRoute>
              <BookManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lectures"
          element={
            <ProtectedRoute>
              <Lectures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leave-requests"
          element={
            <ProtectedRoute>
              <LeaveRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam-schedule"
          element={
            <ProtectedRoute>
              <ExamSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-classes"
          element={
            <ProtectedRoute>
              <MyClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects-taught"
          element={
            <ProtectedRoute>
              <SubjectsTaught />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-departments"
          element={
            <ProtectedRoute>
              <AllDepartments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-staffs"
          element={
            <ProtectedRoute>
              <AllStaffs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff-attendance"
          element={
            <ProtectedRoute>
              <StaffAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="all-holidays"
          element={
            <ProtectedRoute>
              <AllHolidays />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-fees"
          element={
            <ProtectedRoute>
              <AllFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees-type"
          element={
            <ProtectedRoute>
              <FeesType />
            </ProtectedRoute>
          }
        />
        <Route
          path="fees-discount"
          element={
            <ProtectedRoute>
              <FeesDiscount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Class-list"
          element={
            <ProtectedRoute>
              <ClassList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room-list"
          element={
            <ProtectedRoute>
              <RoomList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room-type"
          element={
            <ProtectedRoute>
              <RoomType />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-teacher"
          element={
            <ProtectedRoute>
              <AddTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-teacher"
          element={
            <ProtectedRoute>
              <EditTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-student"
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-course"
          element={
            <ProtectedRoute>
              <AddCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-course"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-course/:id"
          element={
            <ProtectedRoute>
              <AboutCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-teacher"
          element={
            <ProtectedRoute>
              <AboutTeacher />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-student"
          element={
            <ProtectedRoute>
              <AboutStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about-staff"
          element={
            <ProtectedRoute>
              <AboutStaffs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-leave-requests"
          element={
            <ProtectedRoute>
              <AdminLeaveRequests/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-student"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-courses"
          element={
            <ProtectedRoute>
              <AllCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-asset"
          element={
            <ProtectedRoute>
              <AddLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-asset"
          element={
            <ProtectedRoute>
              <EditLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="add-department"
          element={
            <ProtectedRoute>
              <AddDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit-department"
          element={
            <ProtectedRoute>
              <EditDepartment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-staff"
          element={
            <ProtectedRoute>
              <AddStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-staff"
          element={
            <ProtectedRoute>
              <EditStaff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-holiday"
          element={
            <ProtectedRoute>
              <AddHoliday />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-holiday"
          element={
            <ProtectedRoute>
              <EditHoliday />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-fee"
          element={
            <ProtectedRoute>
              <AddFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-fee"
          element={
            <ProtectedRoute>
              <EditFees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/class-list"
          element={
            <ProtectedRoute>
              <ClassList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacherDashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lectures"
          element={
            <ProtectedRoute>
              <Lectures />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaveRequest"
          element={
            <ProtectedRoute>
              <LeaveRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/examSchedule"
          element={
            <ProtectedRoute>
              <ExamSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myClasses"
          element={
            <ProtectedRoute>
              <MyClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjectsTaught"
          element={
            <ProtectedRoute>
              <SubjectsTaught />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App