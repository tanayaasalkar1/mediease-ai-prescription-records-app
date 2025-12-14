import React, { useState, useEffect } from 'react';
import './PatientPopup.css';
import axiosClient from "../../utils/axiosClient";
import { toast } from "react-toastify";

const PatientPopup = ({ patient, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(patient);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormData({ ...patient });
    setIsEditing(false);
  }, [patient]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //to handle edit and save
  const handleEdit = async () => {
  if (isEditing) {
    try {
      const res = await axiosClient.put(
        `/api/patients/update-patient/${formData._id}`,
        formData
      );

      if (res.data.success) {
        onUpdate(res.data.data);   // update UI
        toast.success("Updated successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    }

    onClose();
  }

  setIsEditing(!isEditing);
};

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Patient Details</h3>
        <hr />

        {isEditing ? (
          <>
            <label><b>Name:</b></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />

            <label><b>Age:</b></label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />

            <label><b>Gender:</b></label>
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />

            <label><b>Contact No.:</b></label>
            <input
              type="text"
              name="contact_no"        
              value={formData.contact_no}
              onChange={handleChange}
            />

            <label><b>Disease:</b></label>
            <input
              type="text"
              name="disease"            
              value={formData.disease}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <p><b>Name:</b> {formData.name}</p>
            <p><b>Age:</b> {formData.age}</p>
            <p><b>Gender:</b> {formData.gender}</p>
            <p><b>Contact No.:</b> {formData.contact_no}</p>   
            <p><b>Disease:</b> {formData.disease}</p>        
          </>
        )}

        <div className="btn-container">
          <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PatientPopup;
