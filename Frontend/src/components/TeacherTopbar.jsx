import React, { useState, useEffect } from "react";
import { Bell, Menu } from "lucide-react";

const TeacherTopbar = () => {
  const [user, setUser] = useState({
    name: "Loading...",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
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
            name: data.user.name || "Teacher",
            profileImage: data.user.profileImage || "https://randomuser.me/api/portraits/men/32.jpg"
          });
        } else {
          // If profile fetch fails, use default values
          setUser({
            name: "Teacher",
            profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser({
          name: "Teacher",
          profileImage: "https://randomuser.me/api/portraits/men/32.jpg"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <Menu className="w-5 h-5 text-gray-600 cursor-pointer" />
        <h2 className="text-lg font-semibold text-gray-700">Teacher Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Bell className="text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <img
            src="https://flagcdn.com/us.svg"
            alt="flag"
            className="w-5 h-5 rounded-full"
          />
          <span className="text-gray-600 text-sm font-medium">
            {loading ? "Loading..." : user.name}
          </span>
          <img
            src={user.profileImage}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherTopbar;
