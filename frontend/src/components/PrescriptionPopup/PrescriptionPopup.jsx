import React, { useState } from "react";
import "./PrescriptionPopup.css";
import axiosClient from "../../utils/axiosClient";

const PrescriptionPopup = ({ patient, onClose }) => {
  const [prescription, setPrescription] = useState("");
  const [phone, setPhone] = useState(String(patient.contact_no || ""));
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);

  
  //GENERATE AI SUMMARY (REAL API VERSION)
  const handleGenerateSummary = async () => {
    if (!prescription.trim()) {
      alert("Please write prescription details first!");
      return;
    }

    setLoadingAI(true);

    try {
      const response = await axiosClient.post("/api/patients/generate-ai-summary", {
        prescription,
        patientName: patient.name,
        disease: patient.disease,
      });

      if (response.data.success) {
        setAiSummary(response.data.summary);
      } else {
        alert(response.data.message || "AI summary generation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while generating AI summary.");
    }

    setLoadingAI(false);
  };

 
  //SAVE PRESCRIPTION TO DB
  // SAVE PRESCRIPTION TO DB
const handleSavePrescription = async () => {
  if (!prescription.trim()) {
    alert("Write a prescription first!");
    return;
  }

  setSaving(true);

  try {
    const response = await axiosClient.post(
      `/api/patients/add-prescription/${patient._id}`,
      { content: prescription }
    );

    if (response.data.success) {
      alert("Prescription saved successfully!");
      setPrescription("");
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    alert("Could not save prescription.");
  }

  setSaving(false);
};


  //SEND VIA WHATSAPP
 const handleSendWhatsApp = () => {
  const phoneNumber = String(phone || "").trim();

  if (!phoneNumber) {
    alert("Please enter phone number!");
    return;
  }

  const message = encodeURIComponent(
    `Hello ${patient.name},\n\nYour Prescription:\n${prescription}\n\nAI Summary:\n${aiSummary || "Not generated"}`
  );

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
};

  
    // UI
 
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Write Prescription</h3>
        <hr />

        <p><b>Patient:</b> {patient.name}</p>
        <p><b>Disease:</b> {patient.disease}</p>

        <textarea
          className="prescription-box"
          placeholder="Write prescription here..."
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
        />

        <label><b>Patient Phone Number:</b></label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {aiSummary && (
          <div className="summary-box">
            <h4>AI Summary:</h4>
            <p>{aiSummary}</p>
          </div>
        )}

        <div className="btn-container">
          <button onClick={handleGenerateSummary} disabled={loadingAI}>
            {loadingAI ? "Generating..." : "Generate AI Summary"}
          </button>

          <button onClick={handleSavePrescription} disabled={saving}>
            {saving ? "Saving..." : "Save" }
          </button>

          <button onClick={handleSendWhatsApp}>
            Send on WhatsApp
          </button>

          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPopup;
