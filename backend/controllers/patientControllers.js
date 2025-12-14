import patientModel from "../models/patientModels.js";

// GET all patients
export const getPatientData = async (req, res) => {
  try {
    const patients = await patientModel.find();

    return res.json({
      success: true,
      message: "patients fetched successfully",
      data: patients,  // <-- SEND THE DATA
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ADD a patient
export const addPatient = async (req, res) => {
  try {
    const { name, age, gender, contact_no, disease } = req.body;

    const newPatient = new patientModel({
      name,
      age,
      gender,
      contact_no,
      disease,
    });

    await newPatient.save();

    return res.json({
      success: true,
      message: "Patient added successfully",
    });

  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE a patient
export const updatePatient = async (req, res) => {
  try {
    const updated = await patientModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Patient updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ADD Prescription
export const addPrescription = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { content } = req.body; // prescription text

    if (!content) {
      return res.json({ success: false, message: "Prescription content required" });
    }

    const updatedPatient = await patientModel.findByIdAndUpdate(
      patientId,
      { 
        $push: { prescriptions: { content } } 
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Prescription saved successfully",
      data: updatedPatient
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Delete patient record
export const deletePatient = async (req, res) => {
  try {
    await patientModel.findByIdAndDelete(req.params.id);    
    return res.json({
      success: true,
      message: "Patient deleted successfully",
    });
  }
    catch (error) {
        return res.json({
            success: false,
            message: error.message,
        }); 
    }
};

