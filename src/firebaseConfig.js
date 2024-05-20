
// import { initializeApp } from "firebase/app";
// import {getFirestore} from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDNCaumQSAMhFXj8yzoMNjUDcX-Y5NBKkU",
//   authDomain: "feedback-form-7f8db.firebaseapp.com",
//   projectId: "feedback-form-7f8db",
//   storageBucket: "feedback-form-7f8db.appspot.com",
//   messagingSenderId: "1051931802329",
//   appId: "1:1051931802329:web:508448ba90e6d21d56dcc8"
// };

// const app = initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
// firebase.js
// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDNCaumQSAMhFXj8yzoMNjUDcX-Y5NBKkU",
  authDomain: "feedback-form-7f8db.firebaseapp.com",
  projectId: "feedback-form-7f8db",
  storageBucket: "feedback-form-7f8db.appspot.com",
  messagingSenderId: "1051931802329",
  appId: "1:1051931802329:web:508448ba90e6d21d56dcc8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();


export { auth, db };
