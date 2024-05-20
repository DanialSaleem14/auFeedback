// src/components/Homepage_Login.js
import React from 'react';
import '../styles/style.css';
import { Link } from 'react-router-dom';

function Homepage_Login() { 
  return (
    <div>
      <div className="header">
        <h1>Air University</h1>
        <p>Welcome to Feedback Management System</p>
      </div>
      <div className="main-container">
        <div className="form-links">
          <p>Fill these forms one by one.</p>
          <Link to="/course-evaluation">Course Evaluation</Link>
          <Link to="/teacher-evaluation">Teacher Evaluation</Link>
          <Link to="/performa">Performa</Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage_Login;
