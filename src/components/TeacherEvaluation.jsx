// src/components/TeacherEvaluation.js
import React, { useState, useEffect } from "react";
import "../styles/style.css";
import { db } from "../firebaseConfig.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const TeacherEvaluation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 18;
  const [formData, setFormData] = useState({
    teacher: "",
    courseCode: "",
    semester: "",
    department: "",
    degree: "",
    course: "",
    satisfaction: "",
    instructorComments: "",
    courseComments: "",
  });
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseSnapshot = await getDocs(collection(db, "courses"));
      setCourses(
        courseSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      const teacherSnapshot = await getDocs(collection(db, "teachers"));
      setTeachers(
        teacherSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSatisfactionChange = (questionNumber, value) => {
    setFormData({
      ...formData,
      satisfaction: {
        ...formData.satisfaction,
        [questionNumber]: value,
      },
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
      alert("No previous question");
    }
  };

  const submitForm = async () => {
    try {
      await addDoc(collection(db, "teacherEvaluations"), formData);
      alert("Thank you for your feedback!");
      setFormData({
        teacher: "",
        courseCode: "",
        semester: "",
        department: "",
        degree: "",
        course: "",
        satisfaction: {},
        instructorComments: "",
        courseComments: "",
      });
      setCurrentQuestion(1);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const questions = [
    "The teacher is prepared for each class and covers complete course material to achieve course objectives.",
    "The teacher responds quickly and positively to student needs and provides additional material regarding the course.",
    "The teacher links theoretical course material with real world applications.",
    "The teacher maintains an environment that is encouraging and favorable to learning.",
    "The teacher shows respect towards students and encourages class participation.",
    "The teacher is fair in examinations.",
    "The teacher was available for discussion regarding subject material during the specified office hours.",
    "The teacher had been regular throughout the course and takes classes as per Schedule.",
    "The teacher arrives on time and leaves class on time.",
    "The teacher makes effective use of time in class.",
    "The teacher demonstrates clear knowledge of the subject.",
    "The course material was well planned and organized to achieve learning outcomes.",
    "The teacher communicates course matter effectively.",
    "Course outline /contents are provided timely by the teacher.",
    "The teacher encourages activity-based learning and supervises group discussions.",
    "The teacher gave timely feedback on quizzes, assignments, and tests.",
  ];

  return (
    <div>
      <div className="header">
        <h1>Air University</h1>
        <p>Welcome to Feedback Management System</p>
      </div>
      <div className="container12">
        <h2>Feedback Management System</h2>
        <h3>Teacher Evaluation Form</h3>
        <hr />
        <form id="dynamicForm">
          <div className="form-group">
            <label htmlFor="teacher">Select Teacher:</label>
            <select
              id="teacher"
              name="teacher"
              value={formData.teacher}
              onChange={handleInputChange}
              className="custom-select"
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="courseCode">Course Code:</label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleInputChange}
              placeholder="Course Code"
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <input
              type="text"
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleInputChange}
              placeholder="Semester"
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Department"
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="degree">Degree:</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="Degree"
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">Select Course:</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="custom-select"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <p>Select the appropriate option:</p>
        <hr />
        <form id="feedbackForm">
          {questions.map((question, index) => (
            <div
              key={index}
              className={`question ${
                currentQuestion === index + 1 ? "active" : ""
              }`}
              id={`question${index + 1}`}
            >
              <label htmlFor={`q${index + 1}`}>
                {index + 1}. {question}
              </label>
              <br />
              <input
                type="radio"
                id={`q${index + 1}a`}
                name={`satisfaction${index + 1}`}
                value="A"
                onChange={() => handleSatisfactionChange(index + 1, "A")}
              />
              <label htmlFor={`q${index + 1}a`}>A</label>
              <input
                type="radio"
                id={`q${index + 1}b`}
                name={`satisfaction${index + 1}`}
                value="B"
                onChange={() => handleSatisfactionChange(index + 1, "B")}
              />
              <label htmlFor={`q${index + 1}b`}>B</label>
              <input
                type="radio"
                id={`q${index + 1}c`}
                name={`satisfaction${index + 1}`}
                value="C"
                onChange={() => handleSatisfactionChange(index + 1, "C")}
              />
              <label htmlFor={`q${index + 1}c`}>C</label>
              <input
                type="radio"
                id={`q${index + 1}d`}
                name={`satisfaction${index + 1}`}
                value="D"
                onChange={() => handleSatisfactionChange(index + 1, "D")}
              />
              <label htmlFor={`q${index + 1}d`}>D</label>
              <br />
              <button type="button" onClick={previousQuestion}>
                Previous
              </button>
              <button type="button" onClick={nextQuestion}>
                Next
              </button>
            </div>
          ))}
          <div
            className={`question ${currentQuestion === 17 ? "active" : ""}`}
            id="question17"
          >
            <label htmlFor="q17">17. Comments about Instructor</label>
            <br />
            <textarea
              rows="5"
              cols="20"
              name="instructorComments"
              value={formData.instructorComments}
              onChange={handleInputChange}
              placeholder="Instructor Comments"
              className="custom-textarea"
            ></textarea>
            <br />
            <button type="button" onClick={previousQuestion}>
              Previous
            </button>
            <button type="button" onClick={nextQuestion}>
              Next
            </button>
          </div>
          <div
            className={`question ${currentQuestion === 18 ? "active" : ""}`}
            id="question18"
          >
            <label htmlFor="q18">18. Comments about the course</label>
            <br />
            <textarea
              rows="5"
              cols="20"
              name="courseComments"
              value={formData.courseComments}
              onChange={handleInputChange}
              placeholder="Course Comments"
              className="custom-textarea"
            ></textarea>
            <br />
            <button type="button" onClick={previousQuestion}>
              Previous
            </button>
            <button type="button" onClick={submitForm}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEvaluation;
