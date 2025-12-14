import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../utils/axiosClient";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Password show/hide
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Password validation
    if (name === "password") {
      if (value.length < 8) {
        setError("Password must be at least 8 characters long.");
      } else if (!/[A-Z]/.test(value)) {
        setError("Password must contain at least one uppercase letter.");
      } else if (!/[0-9]/.test(value)) {
        setError("Password must contain at least one number.");
      } else {
        setError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      toast.error("Please fix password issues before logging in.");
      return;
    }

    try {
      const response = await axiosClient.post(
        "api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 1500,
        });

        setTimeout(() => {
          navigate("/patients");
        }, 1600);
      } else {
        toast.error(response.data.message || "Invalid Email or Password");
      }
    } catch (err) {
      toast.error("Backend error! Try again.");
    }
  };

  return (
    <div className="login-container">
      <img src={assets.doc_logo} alt="MediEase Logo" className="login-logo" />

      <div className="login-box">
        <h2>Login</h2>
        <p>Access your MediEase dashboard</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
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

          <div className="input-group password-group">
          <label>Password</label>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <span className="password-toggle" onClick={togglePassword}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>


          <button type="submit" className="login-btn">Login</button>
        </form>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          New to MediEase?{" "}
          <span
            style={{ color: "#032c55", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
