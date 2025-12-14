import express from 'express';
import { addPatient, getPatientData, updatePatient, deletePatient, addPrescription } from '../controllers/patientControllers.js';
import { generateAiSummary } from '../controllers/generateSummary.js';
import userAuth from '../middleware/userAuth.js';

const patientRouter = express.Router();

patientRouter.post('/add-patient', userAuth, addPatient);
patientRouter.get('/get-patients', userAuth, getPatientData);
patientRouter.put('/update-patient/:id', userAuth, updatePatient);
patientRouter.delete('/delete-patient/:id', userAuth, deletePatient);
patientRouter.post("/add-prescription/:patientId", userAuth, addPrescription);
patientRouter.post("/generate-ai-summary", userAuth, generateAiSummary);


export default patientRouter;