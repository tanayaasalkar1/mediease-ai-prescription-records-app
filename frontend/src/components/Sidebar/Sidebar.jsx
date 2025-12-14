import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { FiUsers, FiPlusSquare, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../utils/axiosClient";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768); // default open for desktop, closed for mobile

  useEffect(() => {
    const handleResize = () => {
      // On resize, open sidebar for large screens, close for small
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
  try {
    const response = await axiosClient.post("/auth/logout");

    if (response.data.success) {
      toast.info("You have logged out successfully!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        style: {
          backgroundColor: "#1e3a8a",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "500",
        },
        icon: "👋",
      });

      setTimeout(() => {
        navigate("/");
      }, 1600);
    } else {
      toast.error("Logout failed!");
    }
  } catch (error) {
    toast.error("Server error during logout!");
  }
};

  return (
    <div className="sidebar-layout">
      {/* ====== HAMBURGER MENU (Visible on Mobile) ====== */}
      <div className="mobile-menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* ====== SIDEBAR ====== */}
      <div className={`sidebar-div-main ${isOpen ? "open" : "closed"}`}>
        <div className="doc-logo">
          <img className="doc-img" src={assets.doc_logo} alt="MediEase Logo" />
        </div>

        <ul>
          <li>
            <FiUsers className="menu-icon" />
            <NavLink to="/patients">View All Patients</NavLink>
          </li>

          <li>
            <FiPlusSquare className="menu-icon" />
            <NavLink to="/add-patient">Add New Patient</NavLink>
          </li>

          <li onClick={handleLogout}>
            <FiLogOut className="menu-icon" style={{ color: "red" }} />
            <span style={{ color: "red", cursor: "pointer" }}>Log Out</span>
          </li>
        </ul>
      </div>

      {/* ====== MAIN CONTENT ====== */}
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Sidebar;
