import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import { assets } from '../../assets/assets'

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <img src={assets.doc_logo} alt="MediEase Logo" className="welcome-logo" />
      <h1>Welcome to MediEase</h1>
      <p>Your intelligent health management system is here...</p>
      <button onClick={() => navigate('/login')}>Login</button>
      <p>To get started</p>
    </div>
  );
}

export default Welcome;
