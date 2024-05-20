// src/components/CourseEvaluation.js
import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import { db } from '../firebaseConfig.js';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const CourseEvaluation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 11;
  const [formData, setFormData] = useState({
    teacher: '',
    courseCode: '',
    semester: '',
    department: '',
    degree: '',
    course: '',
    satisfaction: {},
    courseComments: ''
  });
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseSnapshot = await getDocs(collection(db, 'courses'));
      setCourses(courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const teacherSnapshot = await getDocs(collection(db, 'teachers'));
      setTeachers(teacherSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSatisfactionChange = (questionNumber, value) => {
    setFormData({
      ...formData,
      satisfaction: {
        ...formData.satisfaction,
        [questionNumber]: value
      }
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      alert('No previous question');
    }
  };

  const submitForm = async () => {
    try {
      await addDoc(collection(db, 'courseEvaluations'), formData);
      alert('Thank you for your feedback!');
      setFormData({
        teacher: '',
        courseCode: '',
        semester: '',
        department: '',
        degree: '',
        course: '',
        satisfaction: {},
        courseComments: ''
      });
      setCurrentQuestion(1);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const questions = [
    "The course objectives and learning outcomes were clear.",
    "The course content was relevant and covered the key topics.",
    "The teaching methods were effective and facilitated learning.",
    "The course materials (textbooks, readings, etc.) were useful and well-organized.",
    "The assignments and exams were fair and reflective of the course content.",
    "The feedback on assignments and exams was timely and constructive.",
    "The course workload was manageable and appropriate for the credit hours.",
    "The course encouraged critical thinking and problem-solving.",
    "The course fostered a sense of collaboration and teamwork.",
    "The course improved my knowledge and skills in the subject area."
  ];

  return (
    <div>
      <div className="header">
        <h1>Air University</h1>
        <p>Welcome to Feedback Management System</p>
      </div>
      <div className="container12">
        <h2>Feedback Management System</h2>
        <h3>Course Evaluation Form</h3>
        <hr />
        <form id="dynamicForm">
          <div className="form-group">
            <label htmlFor="teacher">Select Teacher:</label>
            <select id="teacher" name="teacher" value={formData.teacher} onChange={handleInputChange} className="custom-select">
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="courseCode">Course Code:</label>
            <input type="text" id="courseCode" name="courseCode" value={formData.courseCode} onChange={handleInputChange} placeholder="Course Code" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <input type="text" id="semester" name="semester" value={formData.semester} onChange={handleInputChange} placeholder="Semester" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} placeholder="Department" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="degree">Degree:</label>
            <input type="text" id="degree" name="degree" value={formData.degree} onChange={handleInputChange} placeholder="Degree" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="course">Select Course:</label>
            <select id="course" name="course" value={formData.course} onChange={handleInputChange} className="custom-select">
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </form>
        <p>Select the appropriate option:</p>
        <hr />
        <form id="feedbackForm">
          {questions.map((question, index) => (
            <div key={index} className={`question ${currentQuestion === index + 1 ? 'active' : ''}`} id={`question${index + 1}`}>
              <label htmlFor={`q${index + 1}`}>{index + 1}. {question}</label><br />
              <input type="radio" id={`q${index + 1}a`} name={`satisfaction${index + 1}`} value="A" onChange={() => handleSatisfactionChange(index + 1, 'A')} />
              <label htmlFor={`q${index + 1}a`}>A</label>
              <input type="radio" id={`q${index + 1}b`} name={`satisfaction${index + 1}`} value="B" onChange={() => handleSatisfactionChange(index + 1, 'B')} />
              <label htmlFor={`q${index + 1}b`}>B</label>
              <input type="radio" id={`q${index + 1}c`} name={`satisfaction${index + 1}`} value="C" onChange={() => handleSatisfactionChange(index + 1, 'C')} />
              <label htmlFor={`q${index + 1}c`}>C</label>
              <input type="radio" id={`q${index + 1}d`} name={`satisfaction${index + 1}`} value="D" onChange={() => handleSatisfactionChange(index + 1, 'D')} />
              <label htmlFor={`q${index + 1}d`}>D</label>
              <br />
              <button type="button" onClick={previousQuestion}>Previous</button>
              <button type="button" onClick={nextQuestion}>Next</button>
            </div>
          ))}
          <div className={`question ${currentQuestion === 11 ? 'active' : ''}`} id="question11">
            <label htmlFor="q11">11. Comments about the course</label><br />
            <textarea rows="5" cols="20" name="courseComments" value={formData.courseComments} onChange={handleInputChange} placeholder="Course Comments" className="custom-textarea"></textarea><br />
            <button type="button" onClick={previousQuestion}>Previous</button>
            <button type="button" onClick={submitForm}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseEvaluation;
