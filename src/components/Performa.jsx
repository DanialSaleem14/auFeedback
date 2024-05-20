import React, { useState, useEffect } from 'react';
import '../styles/style.css';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function Performa() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 16;
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subject data from Firebase
    const fetchSubjects = async () => {
      try {
        const subjectSnapshot = await getDocs(collection(db, 'subjects'));
        const subjectsList = subjectSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubjects(subjectsList);
      } catch (error) {
        console.error("Error fetching subjects: ", error);
      }
    };
    fetchSubjects();
  }, []);

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      alert('No previous question');
    }
  };

  const submitForm = () => {
    console.log('Form submitted!');
    document.getElementById('feedbackForm').reset();
    alert('Thank you for your feedback!');
  };

  return (
    <div>
      <div className="header">
        <h1>Air University</h1>
        <p>Welcome to Feedback Management System</p>
      </div>
      <div className="container12">
        <h2>Feedback Management System</h2>
        <h3>Online Learning Performa</h3>
        <hr />

        <form id="dynamicForm">
          <div className="form-group">
            <label htmlFor="subject">Select Subject:</label>
            <select id="subject" name="subject" className="custom-select">
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <input type="text" id="department" name="department" placeholder="Department" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="courseCode">Course Code:</label>
            <input type="text" id="courseCode" name="courseCode" placeholder="Course Code" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="courseTitle">Course Title:</label>
            <input type="text" id="courseTitle" name="courseTitle" placeholder="Course Title" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="yearOfStudy">Year of Study:</label>
            <input type="text" id="yearOfStudy" name="yearOfStudy" placeholder="Year of Study" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="teacherName">Teacher Name:</label>
            <input type="text" id="teacherName" name="teacherName" placeholder="Teacher Name" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester:</label>
            <input type="text" id="semester" name="semester" placeholder="Semester" className="custom-input" />
          </div>
          <div className="form-group">
            <label htmlFor="degree">Degree:</label>
            <input type="text" id="degree" name="degree" placeholder="Degree" className="custom-input" />
          </div>
        </form>

        <p>Select the appropriate option:</p>
        <hr />

        <form id="feedbackForm">
          {[...Array(totalQuestions)].map((_, index) => {
            const questionNum = index + 1;
            return (
              <div
                key={questionNum}
                className={`question ${currentQuestion === questionNum ? 'active' : ''}`}
                id={`question${questionNum}`}
              >
                <label htmlFor={`q${questionNum}`}>
                  {questionNum}. {getQuestionText(questionNum)}
                </label>
                <br />
                <input type="radio" id={`q${questionNum}a`} name={`satisfaction${questionNum}`} value="A" />
                <label htmlFor={`q${questionNum}a`}>A</label>
                <input type="radio" id={`q${questionNum}b`} name={`satisfaction${questionNum}`} value="B" />
                <label htmlFor={`q${questionNum}b`}>B</label>
                <input type="radio" id={`q${questionNum}c`} name={`satisfaction${questionNum}`} value="C" />
                <label htmlFor={`q${questionNum}c`}>C</label>
                <input type="radio" id={`q${questionNum}d`} name={`satisfaction${questionNum}`} value="D" />
                <label htmlFor={`q${questionNum}d`}>D</label>
                <br />
                <button type="button" onClick={previousQuestion}>Previous</button>
                <button type="button" onClick={nextQuestion}>Next</button>
              </div>
            );
          })}
          <div className={`question ${currentQuestion === totalQuestions ? 'active' : ''}`} id={`question${totalQuestions}`}>
            <label htmlFor={`q${totalQuestions}`}>16. Comments about Instructor</label>
            <br />
            <textarea rows="5" cols="20" placeholder="Comments about Instructor" style={{ width: '400px' }} />
            <br />
            <button type="button" onClick={previousQuestion}>Previous</button>
            <button type="button" onClick={submitForm}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );

  function getQuestionText(questionNum) {
    const questions = [
      "The instructor uploaded course material and contents in advance, posted in the right place and linked supplementary materials.",
      "The instructor chooses the best format to deliver online lectures i.e. via presentations or board writing.",
      "The instructor presents the online lecture and material in a manner that allows the student to attain objectives and outcomes.",
      "The instructor provides multiple opportunities to all students to develop and improve their knowledge, skills and competencies throughout the course.",
      "The Instructor is fair in assessments and examination.",
      "Recorded Video lectures were audible and material presented was shown clearly.",
      "The instructor uses the Google classroom, Zoom, MS team and Google Meet for online learning system appropriately.",
      "Instructor uses Google Classroom, MS team or Google Meet for assessment and evaluation.",
      "The instructor plan and take classes as per schedule.",
      "The instructor was available online for question answer sessions in each class.",
      "The instructor set up an adequate work environment and encourage student discussions and interactive sessions.",
      "The instructor innovate and stimulate discussions.",
      "The instructor treats all the students politely and with respect.",
      "The Instructor communicates regularly and covers the student teacher gap in online classes.",
      "The instructor provides timely and quality feedback to students based on their performance.",
    ];
    return questions[questionNum - 1];
  }
}

export default Performa;
