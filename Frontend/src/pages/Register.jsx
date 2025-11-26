import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, MapPin, Phone, Image, FileText } from "lucide-react";
import registerImage from "../assets/registerImage.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile_number: "",
    location: "",
    about: ""
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", selectedRole);
    data.append("address", formData.address);
    data.append("mobile_number", formData.mobile_number);
    data.append("location", formData.location);
    data.append("about", formData.about);
    if (profileImage) {
      data.append("profile_image", profileImage);
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Failed to register");
        return;
      }

      // On successful registration, redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#f0f3fb]">
        <img
          src={registerImage}
          alt="Register Illustration"
          className="max-w-[80%] h-auto"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="bg-white w-full max-w-[35vw] p-8 rounded-lg">
          {/* Header */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
                alt="School Logo"
                className="w-12 h-12"
              />
            </div>
            <h1 className="text-2xl font-semibold text-[#007BFF]">
              Welcome to Smart School
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Enter details to create your account
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <span className="border-l-4 border-blue-500 mr-2 h-5"></span> Sign Up
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Role Selection */}
              <div>
                <p className="text-sm font-semibold mb-1 text-gray-700">I am a:</p>
                <div className="flex space-x-3">
                  {["student", "teacher", "admin"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`w-1/3 py-2 rounded-md border text-sm font-medium transition ${
                        selectedRole === role
                          ? "bg-[#f0f7ff] border-blue-500 text-blue-600 font-semibold"
                          : "border-gray-400 text-gray-700 hover:border-blue-400"
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>

              {/* Profile Image (File Upload) */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Image className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  placeholder="Address*"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Mobile Number */}
              <div className="relative">
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="Mobile Number*"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Location */}
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="Location*"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* About */}
              <div className="relative">
                <textarea
                  name="about"
                  placeholder="About*"
                  rows="3"
                  value={formData.about}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  required
                ></textarea>
                <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {errorMessage && (
                <p className="text-red-600 text-sm font-semibold">{errorMessage}</p>
              )}

              {/* Already Registered */}
              <p className="text-sm text-gray-600 mt-2">
                Already Registered?{" "}
                <Link to="/" className="text-blue-500 hover:underline font-medium">
                  Login
                </Link>
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-full mt-3 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
