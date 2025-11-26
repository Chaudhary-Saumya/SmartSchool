import React from "react";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import TeacherSidebar from "./TeacherSidebar";
import Topbar from "./Topbar";
import TeacherTopbar from "./TeacherTopbar";

const RoleBasedLayout = ({ children }) => {
  const navigate = useNavigate();

  // Simpler role retrieval assuming stored as plain string in localStorage
  const role = localStorage.getItem("role") || "";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      {role === "admin" ? (
        <AdminSidebar logoutHandler={logoutHandler} />
      ) : role === "teacher" ? (
        <TeacherSidebar logoutHandler={logoutHandler} />
      ) : null}

      <div className="flex-1 flex flex-col">
        {role === "admin" ? <Topbar /> : role === "teacher" ? <TeacherTopbar /> : null}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default RoleBasedLayout;
