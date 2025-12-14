import React, { useState, useEffect } from "react";
import "./PatientLists.css";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import axiosClient from "../../utils/axiosClient";
import PatientPopup from "../PatientPopup/PatientPopup";
import PrescriptionPopup from "../PrescriptionPopup/PrescriptionPopup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientLists = () => {
  const [patients, setPatients] = useState([]);
  const [viewPatient, setViewPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPrescription, setShowPrescription] = useState(false);

  /* ------------------------------
        FETCH PATIENTS
  ------------------------------- */
  const fetchPatients = async () => {
    try {
      const res = await axiosClient.get("/api/patients/get-patients");

      console.log("Backend Response:", res.data);

      if (!res.data.success) {
        toast.error(res.data.message);
        return setPatients([]); // FIXED
      }

      setPatients(res.data.data || []); // FIXED
    } catch (error) {
      console.error("Axios Error:", error);
      toast.error("Failed to load patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  /* ------------------------------
        VIEW POPUP
  ------------------------------- */
  const handleView = (patient) => setViewPatient(patient);
  const closeView = () => setViewPatient(null);

  /* ------------------------------
        UPDATE PATIENT
  ------------------------------- */
  const handleUpdate = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((p) => (p._id === updatedPatient._id ? updatedPatient : p))
    );
  };

  /* ------------------------------
        PRESCRIPTION POPUP
  ------------------------------- */
  const openPrescription = (patient) => {
    setSelectedPatient(patient);
    setShowPrescription(true);
  };
  const closePrescription = () => setShowPrescription(false);

  /* ------------------------------
        DELETE PATIENT
  ------------------------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axiosClient.delete(`/api/patients/delete-patient/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
      toast.success("Patient deleted successfully");
    } catch (error) {
      toast.error("Failed to delete patient");
    }
  };

  return (
    <div className="main-content">
      <div className="all-patients-container">
        <div className="heading">
          <p>All Patients</p>
        </div>

        <div className="patients-container">
          {patients.length === 0 ? (
            <p style={{ textAlign: "center", width: "100%" }}>
              No patients found.
            </p>
          ) : (
            patients.map((patient) => (
              <div key={patient._id} className="patients">
                <p>{patient.name}</p>

                <p className="view" onClick={() => handleView(patient)}>
                  <FiEye className="menu-icon" /> View
                </p>

                <p className="edit" onClick={() => openPrescription(patient)}>
                  <FiEdit className="menu-icon" /> Prescription
                </p>

                <p className="delete" onClick={() => handleDelete(patient._id)}>
                  <FiTrash className="menu-icon" /> Delete
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {viewPatient && (
        <PatientPopup
          patient={viewPatient}
          onClose={closeView}
          onUpdate={handleUpdate}
        />
      )}

      {showPrescription && (
        <PrescriptionPopup
          patient={selectedPatient}
          onClose={closePrescription}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default PatientLists;
