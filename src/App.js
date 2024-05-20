import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CourseEvaluation from './components/CourseEvaluation.jsx';
import Performa from './components/Performa.jsx';
import TeacherEvaluation from './components/TeacherEvaluation.jsx';
import Homepage_Login from './components/Homepage_Login.jsx';
import SignInForm from './components/SignInForm.jsx';
import SignUpForm from './components/SignupForm.jsx';
import {firebase} from './firebaseConfig.js';
import{ addDoc, collection} from "@firebase/firestore";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
  

        <Routes> {}
          <Route path="/Homepage_Login" element={<Homepage_Login />} />   
          <Route path="/" element={<SignInForm />} />
          <Route path="/Signup-form" element={<SignUpForm />} />
          <Route path="/course-evaluation" element={<CourseEvaluation />} /> 
          <Route path="/performa" element={<Performa />} />
          <Route path="/teacher-evaluation" element={<TeacherEvaluation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
