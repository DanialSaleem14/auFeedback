import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore functions
import './App2.css';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
   
      // If email exists, proceed with sign in
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Homepage_Login');
    } catch (error) {
      console.error('Sign-in error:', error.message); // Log the error message
      alert('Failed to sign in. Please check your credentials.');
    }
  }; // Close handleSubmit function here

  return (
    <div className="auth-page">
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/JJAJyEnfAWQ?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="container">
        <div className="form-container">
          <img src="/aulogo.png" alt="University Logo" className="logo" />
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Sign In</button>
          </form>
          <p>
            Don't have an account? <Link to="/Signup-form">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
