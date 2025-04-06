// Import the functions you need from the SDKs you need
import { initializeApp , getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKSMGzwIVu4q2DY6IPU1dt-r0FtFVUE3M",
  authDomain: "prepwise-72cc1.firebaseapp.com",
  projectId: "prepwise-72cc1",
  storageBucket: "prepwise-72cc1.firebasestorage.app",
  messagingSenderId: "721527188767",
  appId: "1:721527188767:web:b854a5059b59909140542a",
  measurementId: "G-3ENRNXJHHM"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig) : getApp() ;
const analytics = getAnalytics(app); 
export const auth = getAuth(app)
export const db = getFirestore(app)