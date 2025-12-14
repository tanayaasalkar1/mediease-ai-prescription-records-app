import React, { useState } from "react";
import "./NewPatient.css";
import PrescriptionPopup from "../PrescriptionPopup/PrescriptionPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";

const NewPatient = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    Disease: "",
  });

  // Prescription Popup
  const handleWritePrescription = () => {
    setShowPopup(true);
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add patient to backend API
  const handleAddPatient = async () => {
    if (!formData.name || !formData.contact) {
      toast.error("Name and Contact Number are required!");
      return;
    }

    const payload = {
      name: formData.name,
      age: Number(formData.age) || undefined,
      gender: formData.gender,
      contact_no: formData.contact, // backend key
      disease: formData.Disease,    // backend key
    };

    try {
      const res = await axiosClient.post("/api/patients/add-patient", payload);

      if (res.data.success) {
        toast.success("Patient Added Successfully!", { autoClose: 1500 });

        // Clear the form
        setFormData({
          name: "",
          age: "",
          gender: "",
          contact: "",
          Disease: "",
        });

        // Optional redirect after saving
        // setTimeout(() => navigate("/view-patients"), 1600);
      } else {
        toast.error(res.data.message || "Failed to add patient");
      }
    } catch (error) {
      console.error("Add Patient Error:", error);
      toast.error(
        error.response?.data?.message || "Server Error. Please try again."
      );
    }
  };

  const isFormEmpty =
    !formData.name &&
    !formData.contact &&
    !formData.age &&
    !formData.gender &&
    !formData.Disease;

  return (
    <div className="main-content">
      <div className="add-patient-page-left">
        <h2 className="page-title">Add New Patient</h2>

        <form className="patient-form-large">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </div>

          <div className="form-group">
            <label>Disease / Symptoms</label>
            <input
              type="text"
              name="Disease"
              value={formData.Disease}
              onChange={handleChange}
              placeholder="Enter symptoms"
            />
          </div>

          {/* Buttons section */}
          <div className="button-group">
            <button type="button" className="add-btn" onClick={handleAddPatient}>
              Add Patient
            </button>

            <button
              type="button"
              className="write-btn"
              onClick={handleWritePrescription}
              disabled={isFormEmpty}
              style={{
                opacity: isFormEmpty ? 0.6 : 1,
                cursor: isFormEmpty ? "not-allowed" : "pointer",
              }}
            >
              Write Prescription
            </button>
          </div>
        </form>
      </div>

      {/* Prescription Popup */}
      {showPopup && (
        <PrescriptionPopup
          patient={formData}
          onClose={() => setShowPopup(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default NewPatient;
