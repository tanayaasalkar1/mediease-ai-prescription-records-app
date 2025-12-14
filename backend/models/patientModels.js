import mongoose from "mongoose";

//creating patient schema
const patientSchema = new mongoose.Schema({
    name: {type: String, required:true},
    age: {type: Number, required:true},
    gender: {type: String, required:true},
    contact_no: {type: Number, required:true},
    disease: {type: String, required:true}, 
    prescriptions: [
        {
            date: { type: Date, default: Date.now },
            content: { type: String, required: true }
        }
    ]
})

//creating model from patient schema 
const patientModel = mongoose.models.patients || mongoose.model('patients', patientSchema);

export default patientModel