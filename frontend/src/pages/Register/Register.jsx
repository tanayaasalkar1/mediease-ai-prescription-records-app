import React, { useState } from "react";
import "./Register.css";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // simple password validation
    if (name === "password") {
      if (value.length < 8) {
        setError("Password must be at least 8 characters.");
      } else if (!/[A-Z]/.test(value)) {
        setError("Password must contain at least 1 uppercase letter.");
      } else if (!/[0-9]/.test(value)) {
        setError("Password must contain at least 1 number.");
      } else {
        setError("");
      }
    }
  };

  // submit registration data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      toast.error("Fix password errors before registering.");
      return;
    }

    try {
      const response = await axiosClient.post(
        "/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Registration successful!", { autoClose: 1500 });

        setTimeout(() => {
          navigate("/login");
        }, 1600);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Backend error! Try again.");
    }
  };

  return (
    <div className="register-container">
      <img src={assets.doc_logo} className="register-logo" alt="MediEase Logo" />

      <div className="register-box">
        <h2>Create Account</h2>
        <p>Join MediEase and manage patients smarter</p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* PASSWORD WITH SHOW/HIDE */}
          <div className="input-group password-group">
            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {/* Eye icon */}
              <span className="password-toggle" onClick={togglePassword}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            {/* Error message */}
            <p className="error-message">{error}</p>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Register;
