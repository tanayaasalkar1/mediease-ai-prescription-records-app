import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Patients from './pages/Patients/Patients';
import AddPatients from './pages/AddPatients/AddPatients';
import Login from './pages/Login/Login';
import Welcome from './pages/Welcome/Welcome';
import './App.css'
import Register from './pages/Register/Register';


function App() {
  return (
    <>
    
      <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/patients"
        element={
          <Sidebar>
            <Patients />
          </Sidebar>
        }
      />
      <Route
        path="/add-patient"
        element={
          <Sidebar>
            <AddPatients />
          </Sidebar>
        }
      />
    </Routes>

    </>
  );
}

export default App;
